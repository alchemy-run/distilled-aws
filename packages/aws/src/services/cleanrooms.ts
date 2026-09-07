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
  sdkId: "CleanRooms",
  serviceShapeName: "AWSBastionControlPlaneServiceLambda",
});
const auth = T.AwsAuthSigv4({ name: "cleanrooms" });
const ver = T.ServiceVersion("2022-02-17");
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
              `https://cleanrooms-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://cleanrooms-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://cleanrooms.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://cleanrooms.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      reason: S.optional(S.String),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
      reason: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      quotaName: S.String,
      quotaValue: S.Number,
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      reason: S.optional(S.String),
      fieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type CollaborationIdentifier = string;
export type AnalysisTemplateArn = string;
export type AnalysisTemplateArnList = string[];
export const AnalysisTemplateArnList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetCollaborationAnalysisTemplateInput {
  collaborationIdentifier: string;
  analysisTemplateArns: string[];
}
export const BatchGetCollaborationAnalysisTemplateInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      collaborationIdentifier: S.String.pipe(
        T.HttpLabel("collaborationIdentifier"),
      ),
      analysisTemplateArns: AnalysisTemplateArnList,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/collaborations/{collaborationIdentifier}/batch-analysistemplates",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "BatchGetCollaborationAnalysisTemplateInput",
  }) as any as S.Schema<BatchGetCollaborationAnalysisTemplateInput>;
export type AnalysisTemplateIdentifier = string;
export type UUID = string;
export type CollaborationArn = string;
export type ResourceDescription = string;
export type AccountId = string;
export type ResourceAlias = string;
export type TableAlias = string;
export type QueryTables = string[];
export const QueryTables = /*@__PURE__*/ S.Array(S.String);
export interface AnalysisSchema {
  referencedTables?: string[];
}
export const AnalysisSchema = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ referencedTables: S.optional(QueryTables) }),
).annotate({ identifier: "AnalysisSchema" }) as any as S.Schema<AnalysisSchema>;
export type AnalysisFormat = "SQL" | "PYSPARK_1_0" | (string & {});
export const AnalysisFormat = /*@__PURE__*/ S.String;

export type AnalysisTemplateText = string | redacted.Redacted<string>;
export interface S3Location {
  bucket: string;
  key: string;
}
export const S3Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucket: S.String, key: S.String }),
).annotate({ identifier: "S3Location" }) as any as S.Schema<S3Location>;
export interface AnalysisTemplateArtifact {
  location: S3Location;
}
export const AnalysisTemplateArtifact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ location: S3Location }),
).annotate({
  identifier: "AnalysisTemplateArtifact",
}) as any as S.Schema<AnalysisTemplateArtifact>;
export type AnalysisTemplateArtifactList = AnalysisTemplateArtifact[];
export const AnalysisTemplateArtifactList = /*@__PURE__*/ S.Array(
  AnalysisTemplateArtifact,
);
export type RoleArn = string;
export interface AnalysisTemplateArtifacts {
  entryPoint: AnalysisTemplateArtifact;
  additionalArtifacts?: AnalysisTemplateArtifact[];
  roleArn: string;
}
export const AnalysisTemplateArtifacts = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entryPoint: AnalysisTemplateArtifact,
    additionalArtifacts: S.optional(AnalysisTemplateArtifactList),
    roleArn: S.String,
  }),
).annotate({
  identifier: "AnalysisTemplateArtifacts",
}) as any as S.Schema<AnalysisTemplateArtifacts>;
export type AnalysisSource =
  | { text: string | redacted.Redacted<string>; artifacts?: never }
  | { text?: never; artifacts: AnalysisTemplateArtifacts };
export const AnalysisSource = /*@__PURE__*/ S.Union([
  S.Struct({ text: SensitiveString }),
  S.Struct({ artifacts: AnalysisTemplateArtifacts }),
]);
export interface Hash {
  sha256?: string;
}
export const Hash = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sha256: S.optional(S.String) }),
).annotate({ identifier: "Hash" }) as any as S.Schema<Hash>;
export type HashList = Hash[];
export const HashList = /*@__PURE__*/ S.Array(Hash);
export interface AnalysisTemplateArtifactMetadata {
  entryPointHash: Hash;
  additionalArtifactHashes?: Hash[];
}
export const AnalysisTemplateArtifactMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entryPointHash: Hash,
    additionalArtifactHashes: S.optional(HashList),
  }),
).annotate({
  identifier: "AnalysisTemplateArtifactMetadata",
}) as any as S.Schema<AnalysisTemplateArtifactMetadata>;
export type AnalysisSourceMetadata = {
  artifacts: AnalysisTemplateArtifactMetadata;
};
export const AnalysisSourceMetadata = /*@__PURE__*/ S.Union([
  S.Struct({ artifacts: AnalysisTemplateArtifactMetadata }),
]);
export type ParameterName = string;
export type ParameterType =
  | "SMALLINT"
  | "INTEGER"
  | "BIGINT"
  | "DECIMAL"
  | "REAL"
  | "DOUBLE_PRECISION"
  | "BOOLEAN"
  | "CHAR"
  | "VARCHAR"
  | "DATE"
  | "TIMESTAMP"
  | "TIMESTAMPTZ"
  | "TIME"
  | "TIMETZ"
  | "VARBYTE"
  | "BINARY"
  | "BYTE"
  | "CHARACTER"
  | "DOUBLE"
  | "FLOAT"
  | "INT"
  | "LONG"
  | "NUMERIC"
  | "SHORT"
  | "STRING"
  | "TIMESTAMP_LTZ"
  | "TIMESTAMP_NTZ"
  | "TINYINT"
  | (string & {});
export const ParameterType = /*@__PURE__*/ S.String;

export type ParameterValue = string;
export interface AnalysisParameter {
  name: string;
  type: ParameterType;
  defaultValue?: string;
}
export const AnalysisParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    type: ParameterType,
    defaultValue: S.optional(S.String),
  }),
).annotate({
  identifier: "AnalysisParameter",
}) as any as S.Schema<AnalysisParameter>;
export type AnalysisParameterList = AnalysisParameter[];
export const AnalysisParameterList = /*@__PURE__*/ S.Array(AnalysisParameter);
export type AnalysisTemplateValidationType =
  | "DIFFERENTIAL_PRIVACY"
  | (string & {});
export const AnalysisTemplateValidationType = /*@__PURE__*/ S.String;

export type AnalysisTemplateValidationStatus =
  | "VALID"
  | "INVALID"
  | "UNABLE_TO_VALIDATE"
  | (string & {});
export const AnalysisTemplateValidationStatus = /*@__PURE__*/ S.String;

export interface AnalysisTemplateValidationStatusReason {
  message: string;
}
export const AnalysisTemplateValidationStatusReason = /*@__PURE__*/ S.suspend(
  () => S.Struct({ message: S.String }),
).annotate({
  identifier: "AnalysisTemplateValidationStatusReason",
}) as any as S.Schema<AnalysisTemplateValidationStatusReason>;
export type AnalysisTemplateValidationStatusReasonList =
  AnalysisTemplateValidationStatusReason[];
export const AnalysisTemplateValidationStatusReasonList = /*@__PURE__*/ S.Array(
  AnalysisTemplateValidationStatusReason,
);
export interface AnalysisTemplateValidationStatusDetail {
  type: AnalysisTemplateValidationType;
  status: AnalysisTemplateValidationStatus;
  reasons?: AnalysisTemplateValidationStatusReason[];
}
export const AnalysisTemplateValidationStatusDetail = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      type: AnalysisTemplateValidationType,
      status: AnalysisTemplateValidationStatus,
      reasons: S.optional(AnalysisTemplateValidationStatusReasonList),
    }),
).annotate({
  identifier: "AnalysisTemplateValidationStatusDetail",
}) as any as S.Schema<AnalysisTemplateValidationStatusDetail>;
export type AnalysisTemplateValidationStatusDetailList =
  AnalysisTemplateValidationStatusDetail[];
export const AnalysisTemplateValidationStatusDetailList = /*@__PURE__*/ S.Array(
  AnalysisTemplateValidationStatusDetail,
);
export type ErrorMessageType = "DETAILED" | (string & {});
export const ErrorMessageType = /*@__PURE__*/ S.String;

export interface ErrorMessageConfiguration {
  type: ErrorMessageType;
}
export const ErrorMessageConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: ErrorMessageType }),
).annotate({
  identifier: "ErrorMessageConfiguration",
}) as any as S.Schema<ErrorMessageConfiguration>;
export type MaxMembershipInferenceAttackScore = number;
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
  columnClassification: ColumnClassificationDetails;
}
export const MLSyntheticDataParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    epsilon: S.Number,
    maxMembershipInferenceAttackScore: S.Number,
    columnClassification: ColumnClassificationDetails,
  }),
).annotate({
  identifier: "MLSyntheticDataParameters",
}) as any as S.Schema<MLSyntheticDataParameters>;
export type SyntheticDataParameters = {
  mlSyntheticDataParameters: MLSyntheticDataParameters;
};
export const SyntheticDataParameters = /*@__PURE__*/ S.Union([
  S.Struct({ mlSyntheticDataParameters: MLSyntheticDataParameters }),
]);
export interface CollaborationAnalysisTemplate {
  id: string;
  arn: string;
  collaborationId: string;
  collaborationArn: string;
  description?: string;
  creatorAccountId: string;
  name: string;
  createTime: Date;
  updateTime: Date;
  schema: AnalysisSchema;
  format: AnalysisFormat;
  source?: AnalysisSource;
  sourceMetadata?: AnalysisSourceMetadata;
  analysisParameters?: AnalysisParameter[];
  validations?: AnalysisTemplateValidationStatusDetail[];
  errorMessageConfiguration?: ErrorMessageConfiguration;
  syntheticDataParameters?: SyntheticDataParameters;
}
export const CollaborationAnalysisTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    collaborationId: S.String,
    collaborationArn: S.String,
    description: S.optional(S.String),
    creatorAccountId: S.String,
    name: S.String,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    schema: AnalysisSchema,
    format: AnalysisFormat,
    source: S.optional(AnalysisSource),
    sourceMetadata: S.optional(AnalysisSourceMetadata),
    analysisParameters: S.optional(AnalysisParameterList),
    validations: S.optional(AnalysisTemplateValidationStatusDetailList),
    errorMessageConfiguration: S.optional(ErrorMessageConfiguration),
    syntheticDataParameters: S.optional(SyntheticDataParameters),
  }),
).annotate({
  identifier: "CollaborationAnalysisTemplate",
}) as any as S.Schema<CollaborationAnalysisTemplate>;
export type CollaborationAnalysisTemplateList = CollaborationAnalysisTemplate[];
export const CollaborationAnalysisTemplateList = /*@__PURE__*/ S.Array(
  CollaborationAnalysisTemplate,
);
export interface BatchGetCollaborationAnalysisTemplateError_ {
  arn: string;
  code: string;
  message: string;
}
export const BatchGetCollaborationAnalysisTemplateError_ =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ arn: S.String, code: S.String, message: S.String }),
  ).annotate({
    identifier: "BatchGetCollaborationAnalysisTemplateError",
  }) as any as S.Schema<BatchGetCollaborationAnalysisTemplateError_>;
export type BatchGetCollaborationAnalysisTemplateErrorList =
  BatchGetCollaborationAnalysisTemplateError_[];
export const BatchGetCollaborationAnalysisTemplateErrorList =
  /*@__PURE__*/ S.Array(BatchGetCollaborationAnalysisTemplateError_);
export interface BatchGetCollaborationAnalysisTemplateOutput {
  collaborationAnalysisTemplates: CollaborationAnalysisTemplate[];
  errors: BatchGetCollaborationAnalysisTemplateError_[];
}
export const BatchGetCollaborationAnalysisTemplateOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      collaborationAnalysisTemplates: CollaborationAnalysisTemplateList,
      errors: BatchGetCollaborationAnalysisTemplateErrorList,
    }),
  ).annotate({
    identifier: "BatchGetCollaborationAnalysisTemplateOutput",
  }) as any as S.Schema<BatchGetCollaborationAnalysisTemplateOutput>;
export type TableAliasList = string[];
export const TableAliasList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetSchemaInput {
  collaborationIdentifier: string;
  names: string[];
}
export const BatchGetSchemaInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    collaborationIdentifier: S.String.pipe(
      T.HttpLabel("collaborationIdentifier"),
    ),
    names: TableAliasList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/collaborations/{collaborationIdentifier}/batch-schema",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetSchemaInput",
}) as any as S.Schema<BatchGetSchemaInput>;
export type ColumnName = string;
export type ColumnTypeString = string;
export interface Column {
  name: string;
  type: string;
}
export const Column = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, type: S.String }),
).annotate({ identifier: "Column" }) as any as S.Schema<Column>;
export type ColumnList = Column[];
export const ColumnList = /*@__PURE__*/ S.Array(Column);
export type AnalysisRuleType =
  | "AGGREGATION"
  | "LIST"
  | "CUSTOM"
  | "ID_MAPPING_TABLE"
  | (string & {});
export const AnalysisRuleType = /*@__PURE__*/ S.String;

export type AnalysisRuleTypeList = AnalysisRuleType[];
export const AnalysisRuleTypeList = /*@__PURE__*/ S.Array(AnalysisRuleType);
export type AnalysisMethod =
  | "DIRECT_QUERY"
  | "DIRECT_JOB"
  | "MULTIPLE"
  | (string & {});
export const AnalysisMethod = /*@__PURE__*/ S.String;

export type SelectedAnalysisMethod =
  | "DIRECT_QUERY"
  | "DIRECT_JOB"
  | (string & {});
export const SelectedAnalysisMethod = /*@__PURE__*/ S.String;

export type SelectedAnalysisMethods = SelectedAnalysisMethod[];
export const SelectedAnalysisMethods = /*@__PURE__*/ S.Array(
  SelectedAnalysisMethod,
);
export type TableDescription = string;
export type SchemaType = "TABLE" | "ID_MAPPING_TABLE" | (string & {});
export const SchemaType = /*@__PURE__*/ S.String;

export type SchemaStatus = "READY" | "NOT_READY" | (string & {});
export const SchemaStatus = /*@__PURE__*/ S.String;

export type SchemaStatusReasonCode =
  | "ANALYSIS_RULE_MISSING"
  | "ANALYSIS_TEMPLATES_NOT_CONFIGURED"
  | "ANALYSIS_PROVIDERS_NOT_CONFIGURED"
  | "DIFFERENTIAL_PRIVACY_POLICY_NOT_CONFIGURED"
  | "ID_MAPPING_TABLE_NOT_POPULATED"
  | "COLLABORATION_ANALYSIS_RULE_NOT_CONFIGURED"
  | "ADDITIONAL_ANALYSES_NOT_CONFIGURED"
  | "RESULT_RECEIVERS_NOT_CONFIGURED"
  | "ADDITIONAL_ANALYSES_NOT_ALLOWED"
  | "RESULT_RECEIVERS_NOT_ALLOWED"
  | "ANALYSIS_RULE_TYPES_NOT_COMPATIBLE"
  | (string & {});
export const SchemaStatusReasonCode = /*@__PURE__*/ S.String;

export interface SchemaStatusReason {
  code: SchemaStatusReasonCode;
  message: string;
}
export const SchemaStatusReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ code: SchemaStatusReasonCode, message: S.String }),
).annotate({
  identifier: "SchemaStatusReason",
}) as any as S.Schema<SchemaStatusReason>;
export type SchemaStatusReasonList = SchemaStatusReason[];
export const SchemaStatusReasonList = /*@__PURE__*/ S.Array(SchemaStatusReason);
export type SchemaConfiguration = "DIFFERENTIAL_PRIVACY" | (string & {});
export const SchemaConfiguration = /*@__PURE__*/ S.String;

export type SchemaConfigurationList = SchemaConfiguration[];
export const SchemaConfigurationList =
  /*@__PURE__*/ S.Array(SchemaConfiguration);
export type AnalysisType =
  | "DIRECT_ANALYSIS"
  | "ADDITIONAL_ANALYSIS"
  | (string & {});
export const AnalysisType = /*@__PURE__*/ S.String;

export interface SchemaStatusDetail {
  status: SchemaStatus;
  reasons?: SchemaStatusReason[];
  analysisRuleType?: AnalysisRuleType;
  configurations?: SchemaConfiguration[];
  analysisType: AnalysisType;
}
export const SchemaStatusDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: SchemaStatus,
    reasons: S.optional(SchemaStatusReasonList),
    analysisRuleType: S.optional(AnalysisRuleType),
    configurations: S.optional(SchemaConfigurationList),
    analysisType: AnalysisType,
  }),
).annotate({
  identifier: "SchemaStatusDetail",
}) as any as S.Schema<SchemaStatusDetail>;
export type SchemaStatusDetailList = SchemaStatusDetail[];
export const SchemaStatusDetailList = /*@__PURE__*/ S.Array(SchemaStatusDetail);
export type SchemaResourceArn = string;
export type IdNamespaceType = "SOURCE" | "TARGET" | (string & {});
export const IdNamespaceType = /*@__PURE__*/ S.String;

export interface IdMappingTableInputSource {
  idNamespaceAssociationId: string;
  type: IdNamespaceType;
}
export const IdMappingTableInputSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ idNamespaceAssociationId: S.String, type: IdNamespaceType }),
).annotate({
  identifier: "IdMappingTableInputSource",
}) as any as S.Schema<IdMappingTableInputSource>;
export type IdMappingTableInputSourceList = IdMappingTableInputSource[];
export const IdMappingTableInputSourceList = /*@__PURE__*/ S.Array(
  IdMappingTableInputSource,
);
export interface IdMappingTableSchemaTypeProperties {
  idMappingTableInputSource: IdMappingTableInputSource[];
}
export const IdMappingTableSchemaTypeProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ idMappingTableInputSource: IdMappingTableInputSourceList }),
).annotate({
  identifier: "IdMappingTableSchemaTypeProperties",
}) as any as S.Schema<IdMappingTableSchemaTypeProperties>;
export type SchemaTypeProperties = {
  idMappingTable: IdMappingTableSchemaTypeProperties;
};
export const SchemaTypeProperties = /*@__PURE__*/ S.Union([
  S.Struct({ idMappingTable: IdMappingTableSchemaTypeProperties }),
]);
export interface Schema {
  columns: Column[];
  partitionKeys: Column[];
  analysisRuleTypes: AnalysisRuleType[];
  analysisMethod?: AnalysisMethod;
  selectedAnalysisMethods?: SelectedAnalysisMethod[];
  creatorAccountId: string;
  name: string;
  collaborationId: string;
  collaborationArn: string;
  description: string;
  createTime: Date;
  updateTime: Date;
  type: SchemaType;
  schemaStatusDetails: SchemaStatusDetail[];
  resourceArn?: string;
  schemaTypeProperties?: SchemaTypeProperties;
}
export const Schema = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    columns: ColumnList,
    partitionKeys: ColumnList,
    analysisRuleTypes: AnalysisRuleTypeList,
    analysisMethod: S.optional(AnalysisMethod),
    selectedAnalysisMethods: S.optional(SelectedAnalysisMethods),
    creatorAccountId: S.String,
    name: S.String,
    collaborationId: S.String,
    collaborationArn: S.String,
    description: S.String,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    type: SchemaType,
    schemaStatusDetails: SchemaStatusDetailList,
    resourceArn: S.optional(S.String),
    schemaTypeProperties: S.optional(SchemaTypeProperties),
  }),
).annotate({ identifier: "Schema" }) as any as S.Schema<Schema>;
export type SchemaList = Schema[];
export const SchemaList = /*@__PURE__*/ S.Array(Schema);
export interface BatchGetSchemaError_ {
  name: string;
  code: string;
  message: string;
}
export const BatchGetSchemaError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, code: S.String, message: S.String }),
).annotate({
  identifier: "BatchGetSchemaError",
}) as any as S.Schema<BatchGetSchemaError_>;
export type BatchGetSchemaErrorList = BatchGetSchemaError_[];
export const BatchGetSchemaErrorList =
  /*@__PURE__*/ S.Array(BatchGetSchemaError_);
export interface BatchGetSchemaOutput {
  schemas: Schema[];
  errors: BatchGetSchemaError_[];
}
export const BatchGetSchemaOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ schemas: SchemaList, errors: BatchGetSchemaErrorList }),
).annotate({
  identifier: "BatchGetSchemaOutput",
}) as any as S.Schema<BatchGetSchemaOutput>;
export interface SchemaAnalysisRuleRequest {
  name: string;
  type: AnalysisRuleType;
}
export const SchemaAnalysisRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, type: AnalysisRuleType }),
).annotate({
  identifier: "SchemaAnalysisRuleRequest",
}) as any as S.Schema<SchemaAnalysisRuleRequest>;
export type SchemaAnalysisRuleRequestList = SchemaAnalysisRuleRequest[];
export const SchemaAnalysisRuleRequestList = /*@__PURE__*/ S.Array(
  SchemaAnalysisRuleRequest,
);
export interface BatchGetSchemaAnalysisRuleInput {
  collaborationIdentifier: string;
  schemaAnalysisRuleRequests: SchemaAnalysisRuleRequest[];
}
export const BatchGetSchemaAnalysisRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    collaborationIdentifier: S.String.pipe(
      T.HttpLabel("collaborationIdentifier"),
    ),
    schemaAnalysisRuleRequests: SchemaAnalysisRuleRequestList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/collaborations/{collaborationIdentifier}/batch-schema-analysis-rule",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetSchemaAnalysisRuleInput",
}) as any as S.Schema<BatchGetSchemaAnalysisRuleInput>;
export type AnalysisRuleColumnName = string;
export type AnalysisRuleColumnList = string[];
export const AnalysisRuleColumnList = /*@__PURE__*/ S.Array(S.String);
export type JoinOperator = string;
export type JoinOperatorsList = string[];
export const JoinOperatorsList = /*@__PURE__*/ S.Array(S.String);
export type AdditionalAnalyses =
  | "ALLOWED"
  | "REQUIRED"
  | "NOT_ALLOWED"
  | (string & {});
export const AdditionalAnalyses = /*@__PURE__*/ S.String;

export interface AnalysisRuleList {
  joinColumns: string[];
  allowedJoinOperators?: string[];
  listColumns: string[];
  additionalAnalyses?: AdditionalAnalyses;
}
export const AnalysisRuleList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    joinColumns: AnalysisRuleColumnList,
    allowedJoinOperators: S.optional(JoinOperatorsList),
    listColumns: AnalysisRuleColumnList,
    additionalAnalyses: S.optional(AdditionalAnalyses),
  }),
).annotate({
  identifier: "AnalysisRuleList",
}) as any as S.Schema<AnalysisRuleList>;
export type AnalysisRuleColumnNameList = string[];
export const AnalysisRuleColumnNameList = /*@__PURE__*/ S.Array(S.String);
export type AggregateFunctionName = string;
export interface AggregateColumn {
  columnNames: string[];
  function: string;
}
export const AggregateColumn = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ columnNames: AnalysisRuleColumnNameList, function: S.String }),
).annotate({
  identifier: "AggregateColumn",
}) as any as S.Schema<AggregateColumn>;
export type AggregateColumnList = AggregateColumn[];
export const AggregateColumnList = /*@__PURE__*/ S.Array(AggregateColumn);
export type JoinRequiredOption = string;
export type ScalarFunctions = string;
export type ScalarFunctionsList = string[];
export const ScalarFunctionsList = /*@__PURE__*/ S.Array(S.String);
export type AggregationType = string;
export interface AggregationConstraint {
  columnName: string;
  minimum: number;
  type: string;
}
export const AggregationConstraint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ columnName: S.String, minimum: S.Number, type: S.String }),
).annotate({
  identifier: "AggregationConstraint",
}) as any as S.Schema<AggregationConstraint>;
export type AggregationConstraints = AggregationConstraint[];
export const AggregationConstraints = /*@__PURE__*/ S.Array(
  AggregationConstraint,
);
export interface AnalysisRuleAggregation {
  aggregateColumns: AggregateColumn[];
  joinColumns: string[];
  joinRequired?: string;
  allowedJoinOperators?: string[];
  dimensionColumns: string[];
  scalarFunctions: string[];
  outputConstraints: AggregationConstraint[];
  additionalAnalyses?: AdditionalAnalyses;
}
export const AnalysisRuleAggregation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    aggregateColumns: AggregateColumnList,
    joinColumns: AnalysisRuleColumnList,
    joinRequired: S.optional(S.String),
    allowedJoinOperators: S.optional(JoinOperatorsList),
    dimensionColumns: AnalysisRuleColumnList,
    scalarFunctions: ScalarFunctionsList,
    outputConstraints: AggregationConstraints,
    additionalAnalyses: S.optional(AdditionalAnalyses),
  }),
).annotate({
  identifier: "AnalysisRuleAggregation",
}) as any as S.Schema<AnalysisRuleAggregation>;
export type AnalysisTemplateArnOrQueryWildcard = string;
export type AllowedAnalysesList = string[];
export const AllowedAnalysesList = /*@__PURE__*/ S.Array(S.String);
export type AllowedAnalysisProviderList = string[];
export const AllowedAnalysisProviderList = /*@__PURE__*/ S.Array(S.String);
export interface DifferentialPrivacyColumn {
  name: string;
}
export const DifferentialPrivacyColumn = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }),
).annotate({
  identifier: "DifferentialPrivacyColumn",
}) as any as S.Schema<DifferentialPrivacyColumn>;
export type DifferentialPrivacyColumnList = DifferentialPrivacyColumn[];
export const DifferentialPrivacyColumnList = /*@__PURE__*/ S.Array(
  DifferentialPrivacyColumn,
);
export interface DifferentialPrivacyConfiguration {
  columns: DifferentialPrivacyColumn[];
}
export const DifferentialPrivacyConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ columns: DifferentialPrivacyColumnList }),
).annotate({
  identifier: "DifferentialPrivacyConfiguration",
}) as any as S.Schema<DifferentialPrivacyConfiguration>;
export interface AnalysisRuleCustom {
  allowedAnalyses: string[];
  allowedAnalysisProviders?: string[];
  additionalAnalyses?: AdditionalAnalyses;
  disallowedOutputColumns?: string[];
  differentialPrivacy?: DifferentialPrivacyConfiguration;
}
export const AnalysisRuleCustom = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    allowedAnalyses: AllowedAnalysesList,
    allowedAnalysisProviders: S.optional(AllowedAnalysisProviderList),
    additionalAnalyses: S.optional(AdditionalAnalyses),
    disallowedOutputColumns: S.optional(AnalysisRuleColumnList),
    differentialPrivacy: S.optional(DifferentialPrivacyConfiguration),
  }),
).annotate({
  identifier: "AnalysisRuleCustom",
}) as any as S.Schema<AnalysisRuleCustom>;
export interface QueryConstraintRequireOverlap {
  columns?: string[];
}
export const QueryConstraintRequireOverlap = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ columns: S.optional(AnalysisRuleColumnList) }),
).annotate({
  identifier: "QueryConstraintRequireOverlap",
}) as any as S.Schema<QueryConstraintRequireOverlap>;
export type QueryConstraint = { requireOverlap: QueryConstraintRequireOverlap };
export const QueryConstraint = /*@__PURE__*/ S.Union([
  S.Struct({ requireOverlap: QueryConstraintRequireOverlap }),
]);
export type QueryConstraintList = QueryConstraint[];
export const QueryConstraintList = /*@__PURE__*/ S.Array(QueryConstraint);
export interface AnalysisRuleIdMappingTable {
  joinColumns: string[];
  queryConstraints: QueryConstraint[];
  dimensionColumns?: string[];
}
export const AnalysisRuleIdMappingTable = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    joinColumns: AnalysisRuleColumnList,
    queryConstraints: QueryConstraintList,
    dimensionColumns: S.optional(AnalysisRuleColumnList),
  }),
).annotate({
  identifier: "AnalysisRuleIdMappingTable",
}) as any as S.Schema<AnalysisRuleIdMappingTable>;
export type AnalysisRulePolicyV1 =
  | {
      list: AnalysisRuleList;
      aggregation?: never;
      custom?: never;
      idMappingTable?: never;
    }
  | {
      list?: never;
      aggregation: AnalysisRuleAggregation;
      custom?: never;
      idMappingTable?: never;
    }
  | {
      list?: never;
      aggregation?: never;
      custom: AnalysisRuleCustom;
      idMappingTable?: never;
    }
  | {
      list?: never;
      aggregation?: never;
      custom?: never;
      idMappingTable: AnalysisRuleIdMappingTable;
    };
export const AnalysisRulePolicyV1 = /*@__PURE__*/ S.Union([
  S.Struct({ list: AnalysisRuleList }),
  S.Struct({ aggregation: AnalysisRuleAggregation }),
  S.Struct({ custom: AnalysisRuleCustom }),
  S.Struct({ idMappingTable: AnalysisRuleIdMappingTable }),
]);
export type AnalysisRulePolicy = { v1: AnalysisRulePolicyV1 };
export const AnalysisRulePolicy = /*@__PURE__*/ S.Union([
  S.Struct({ v1: AnalysisRulePolicyV1 }),
]);
export type AllowedResultReceivers = string[];
export const AllowedResultReceivers = /*@__PURE__*/ S.Array(S.String);
export type AdditionalAnalysesResourceArn = string;
export type AllowedAdditionalAnalyses = string[];
export const AllowedAdditionalAnalyses = /*@__PURE__*/ S.Array(S.String);
export interface ConfiguredTableAssociationAnalysisRuleList {
  allowedResultReceivers?: string[];
  allowedAdditionalAnalyses?: string[];
}
export const ConfiguredTableAssociationAnalysisRuleList =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      allowedResultReceivers: S.optional(AllowedResultReceivers),
      allowedAdditionalAnalyses: S.optional(AllowedAdditionalAnalyses),
    }),
  ).annotate({
    identifier: "ConfiguredTableAssociationAnalysisRuleList",
  }) as any as S.Schema<ConfiguredTableAssociationAnalysisRuleList>;
export interface ConfiguredTableAssociationAnalysisRuleAggregation {
  allowedResultReceivers?: string[];
  allowedAdditionalAnalyses?: string[];
}
export const ConfiguredTableAssociationAnalysisRuleAggregation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      allowedResultReceivers: S.optional(AllowedResultReceivers),
      allowedAdditionalAnalyses: S.optional(AllowedAdditionalAnalyses),
    }),
  ).annotate({
    identifier: "ConfiguredTableAssociationAnalysisRuleAggregation",
  }) as any as S.Schema<ConfiguredTableAssociationAnalysisRuleAggregation>;
export interface ConfiguredTableAssociationAnalysisRuleCustom {
  allowedResultReceivers?: string[];
  allowedAdditionalAnalyses?: string[];
}
export const ConfiguredTableAssociationAnalysisRuleCustom =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      allowedResultReceivers: S.optional(AllowedResultReceivers),
      allowedAdditionalAnalyses: S.optional(AllowedAdditionalAnalyses),
    }),
  ).annotate({
    identifier: "ConfiguredTableAssociationAnalysisRuleCustom",
  }) as any as S.Schema<ConfiguredTableAssociationAnalysisRuleCustom>;
export type ConfiguredTableAssociationAnalysisRulePolicyV1 =
  | {
      list: ConfiguredTableAssociationAnalysisRuleList;
      aggregation?: never;
      custom?: never;
    }
  | {
      list?: never;
      aggregation: ConfiguredTableAssociationAnalysisRuleAggregation;
      custom?: never;
    }
  | {
      list?: never;
      aggregation?: never;
      custom: ConfiguredTableAssociationAnalysisRuleCustom;
    };
export const ConfiguredTableAssociationAnalysisRulePolicyV1 =
  /*@__PURE__*/ S.Union([
    S.Struct({ list: ConfiguredTableAssociationAnalysisRuleList }),
    S.Struct({
      aggregation: ConfiguredTableAssociationAnalysisRuleAggregation,
    }),
    S.Struct({ custom: ConfiguredTableAssociationAnalysisRuleCustom }),
  ]);
export type ConfiguredTableAssociationAnalysisRulePolicy = {
  v1: ConfiguredTableAssociationAnalysisRulePolicyV1;
};
export const ConfiguredTableAssociationAnalysisRulePolicy =
  /*@__PURE__*/ S.Union([
    S.Struct({ v1: ConfiguredTableAssociationAnalysisRulePolicyV1 }),
  ]);
export interface ConsolidatedPolicyList {
  joinColumns: string[];
  allowedJoinOperators?: string[];
  listColumns: string[];
  additionalAnalyses?: AdditionalAnalyses;
  allowedResultReceivers?: string[];
  allowedAdditionalAnalyses?: string[];
}
export const ConsolidatedPolicyList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    joinColumns: AnalysisRuleColumnList,
    allowedJoinOperators: S.optional(JoinOperatorsList),
    listColumns: AnalysisRuleColumnList,
    additionalAnalyses: S.optional(AdditionalAnalyses),
    allowedResultReceivers: S.optional(AllowedResultReceivers),
    allowedAdditionalAnalyses: S.optional(AllowedAdditionalAnalyses),
  }),
).annotate({
  identifier: "ConsolidatedPolicyList",
}) as any as S.Schema<ConsolidatedPolicyList>;
export interface ConsolidatedPolicyAggregation {
  aggregateColumns: AggregateColumn[];
  joinColumns: string[];
  joinRequired?: string;
  allowedJoinOperators?: string[];
  dimensionColumns: string[];
  scalarFunctions: string[];
  outputConstraints: AggregationConstraint[];
  additionalAnalyses?: AdditionalAnalyses;
  allowedResultReceivers?: string[];
  allowedAdditionalAnalyses?: string[];
}
export const ConsolidatedPolicyAggregation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    aggregateColumns: AggregateColumnList,
    joinColumns: AnalysisRuleColumnList,
    joinRequired: S.optional(S.String),
    allowedJoinOperators: S.optional(JoinOperatorsList),
    dimensionColumns: AnalysisRuleColumnList,
    scalarFunctions: ScalarFunctionsList,
    outputConstraints: AggregationConstraints,
    additionalAnalyses: S.optional(AdditionalAnalyses),
    allowedResultReceivers: S.optional(AllowedResultReceivers),
    allowedAdditionalAnalyses: S.optional(AllowedAdditionalAnalyses),
  }),
).annotate({
  identifier: "ConsolidatedPolicyAggregation",
}) as any as S.Schema<ConsolidatedPolicyAggregation>;
export interface ConsolidatedPolicyCustom {
  allowedAnalyses: string[];
  allowedAnalysisProviders?: string[];
  additionalAnalyses?: AdditionalAnalyses;
  disallowedOutputColumns?: string[];
  differentialPrivacy?: DifferentialPrivacyConfiguration;
  allowedResultReceivers?: string[];
  allowedAdditionalAnalyses?: string[];
}
export const ConsolidatedPolicyCustom = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    allowedAnalyses: AllowedAnalysesList,
    allowedAnalysisProviders: S.optional(AllowedAnalysisProviderList),
    additionalAnalyses: S.optional(AdditionalAnalyses),
    disallowedOutputColumns: S.optional(AnalysisRuleColumnList),
    differentialPrivacy: S.optional(DifferentialPrivacyConfiguration),
    allowedResultReceivers: S.optional(AllowedResultReceivers),
    allowedAdditionalAnalyses: S.optional(AllowedAdditionalAnalyses),
  }),
).annotate({
  identifier: "ConsolidatedPolicyCustom",
}) as any as S.Schema<ConsolidatedPolicyCustom>;
export type ConsolidatedPolicyV1 =
  | { list: ConsolidatedPolicyList; aggregation?: never; custom?: never }
  | { list?: never; aggregation: ConsolidatedPolicyAggregation; custom?: never }
  | { list?: never; aggregation?: never; custom: ConsolidatedPolicyCustom };
export const ConsolidatedPolicyV1 = /*@__PURE__*/ S.Union([
  S.Struct({ list: ConsolidatedPolicyList }),
  S.Struct({ aggregation: ConsolidatedPolicyAggregation }),
  S.Struct({ custom: ConsolidatedPolicyCustom }),
]);
export type ConsolidatedPolicy = { v1: ConsolidatedPolicyV1 };
export const ConsolidatedPolicy = /*@__PURE__*/ S.Union([
  S.Struct({ v1: ConsolidatedPolicyV1 }),
]);
export interface AnalysisRule {
  collaborationId: string;
  type: AnalysisRuleType;
  name: string;
  createTime: Date;
  updateTime: Date;
  policy: AnalysisRulePolicy;
  collaborationPolicy?: ConfiguredTableAssociationAnalysisRulePolicy;
  consolidatedPolicy?: ConsolidatedPolicy;
}
export const AnalysisRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    collaborationId: S.String,
    type: AnalysisRuleType,
    name: S.String,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    policy: AnalysisRulePolicy,
    collaborationPolicy: S.optional(
      ConfiguredTableAssociationAnalysisRulePolicy,
    ),
    consolidatedPolicy: S.optional(ConsolidatedPolicy),
  }),
).annotate({ identifier: "AnalysisRule" }) as any as S.Schema<AnalysisRule>;
export type SchemaAnalysisRuleList = AnalysisRule[];
export const SchemaAnalysisRuleList = /*@__PURE__*/ S.Array(AnalysisRule);
export interface BatchGetSchemaAnalysisRuleError_ {
  name: string;
  type: AnalysisRuleType;
  code: string;
  message: string;
}
export const BatchGetSchemaAnalysisRuleError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    type: AnalysisRuleType,
    code: S.String,
    message: S.String,
  }),
).annotate({
  identifier: "BatchGetSchemaAnalysisRuleError",
}) as any as S.Schema<BatchGetSchemaAnalysisRuleError_>;
export type BatchGetSchemaAnalysisRuleErrorList =
  BatchGetSchemaAnalysisRuleError_[];
export const BatchGetSchemaAnalysisRuleErrorList = /*@__PURE__*/ S.Array(
  BatchGetSchemaAnalysisRuleError_,
);
export interface BatchGetSchemaAnalysisRuleOutput {
  analysisRules: AnalysisRule[];
  errors: BatchGetSchemaAnalysisRuleError_[];
}
export const BatchGetSchemaAnalysisRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    analysisRules: SchemaAnalysisRuleList,
    errors: BatchGetSchemaAnalysisRuleErrorList,
  }),
).annotate({
  identifier: "BatchGetSchemaAnalysisRuleOutput",
}) as any as S.Schema<BatchGetSchemaAnalysisRuleOutput>;
export type MembershipIdentifier = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateAnalysisTemplateInput {
  description?: string;
  membershipIdentifier: string;
  name: string;
  format: AnalysisFormat;
  source: AnalysisSource;
  tags?: { [key: string]: string | undefined };
  analysisParameters?: AnalysisParameter[];
  schema?: AnalysisSchema;
  errorMessageConfiguration?: ErrorMessageConfiguration;
  syntheticDataParameters?: SyntheticDataParameters;
}
export const CreateAnalysisTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    name: S.String,
    format: AnalysisFormat,
    source: AnalysisSource,
    tags: S.optional(TagMap),
    analysisParameters: S.optional(AnalysisParameterList),
    schema: S.optional(AnalysisSchema),
    errorMessageConfiguration: S.optional(ErrorMessageConfiguration),
    syntheticDataParameters: S.optional(SyntheticDataParameters),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/memberships/{membershipIdentifier}/analysistemplates",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAnalysisTemplateInput",
}) as any as S.Schema<CreateAnalysisTemplateInput>;
export type MembershipArn = string;
export interface AnalysisTemplate {
  id: string;
  arn: string;
  collaborationId: string;
  collaborationArn: string;
  membershipId: string;
  membershipArn: string;
  description?: string;
  name: string;
  createTime: Date;
  updateTime: Date;
  schema: AnalysisSchema;
  format: AnalysisFormat;
  source: AnalysisSource;
  sourceMetadata?: AnalysisSourceMetadata;
  analysisParameters?: AnalysisParameter[];
  validations?: AnalysisTemplateValidationStatusDetail[];
  errorMessageConfiguration?: ErrorMessageConfiguration;
  syntheticDataParameters?: SyntheticDataParameters;
}
export const AnalysisTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    collaborationId: S.String,
    collaborationArn: S.String,
    membershipId: S.String,
    membershipArn: S.String,
    description: S.optional(S.String),
    name: S.String,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    schema: AnalysisSchema,
    format: AnalysisFormat,
    source: AnalysisSource,
    sourceMetadata: S.optional(AnalysisSourceMetadata),
    analysisParameters: S.optional(AnalysisParameterList),
    validations: S.optional(AnalysisTemplateValidationStatusDetailList),
    errorMessageConfiguration: S.optional(ErrorMessageConfiguration),
    syntheticDataParameters: S.optional(SyntheticDataParameters),
  }),
).annotate({
  identifier: "AnalysisTemplate",
}) as any as S.Schema<AnalysisTemplate>;
export interface CreateAnalysisTemplateOutput {
  analysisTemplate: AnalysisTemplate;
}
export const CreateAnalysisTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ analysisTemplate: AnalysisTemplate }),
).annotate({
  identifier: "CreateAnalysisTemplateOutput",
}) as any as S.Schema<CreateAnalysisTemplateOutput>;
export type MemberAbility =
  | "CAN_QUERY"
  | "CAN_RECEIVE_RESULTS"
  | "CAN_RUN_JOB"
  | (string & {});
export const MemberAbility = /*@__PURE__*/ S.String;

export type MemberAbilities = MemberAbility[];
export const MemberAbilities = /*@__PURE__*/ S.Array(MemberAbility);
export type CustomMLMemberAbility =
  | "CAN_RECEIVE_MODEL_OUTPUT"
  | "CAN_RECEIVE_INFERENCE_OUTPUT"
  | (string & {});
export const CustomMLMemberAbility = /*@__PURE__*/ S.String;

export type CustomMLMemberAbilities = CustomMLMemberAbility[];
export const CustomMLMemberAbilities = /*@__PURE__*/ S.Array(
  CustomMLMemberAbility,
);
export interface MLMemberAbilities {
  customMLMemberAbilities: CustomMLMemberAbility[];
}
export const MLMemberAbilities = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ customMLMemberAbilities: CustomMLMemberAbilities }),
).annotate({
  identifier: "MLMemberAbilities",
}) as any as S.Schema<MLMemberAbilities>;
export type DisplayName = string;
export interface QueryComputePaymentConfig {
  isResponsible: boolean;
}
export const QueryComputePaymentConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ isResponsible: S.Boolean }),
).annotate({
  identifier: "QueryComputePaymentConfig",
}) as any as S.Schema<QueryComputePaymentConfig>;
export interface ModelTrainingPaymentConfig {
  isResponsible: boolean;
}
export const ModelTrainingPaymentConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ isResponsible: S.Boolean }),
).annotate({
  identifier: "ModelTrainingPaymentConfig",
}) as any as S.Schema<ModelTrainingPaymentConfig>;
export interface ModelInferencePaymentConfig {
  isResponsible: boolean;
}
export const ModelInferencePaymentConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ isResponsible: S.Boolean }),
).annotate({
  identifier: "ModelInferencePaymentConfig",
}) as any as S.Schema<ModelInferencePaymentConfig>;
export interface SyntheticDataGenerationPaymentConfig {
  isResponsible: boolean;
}
export const SyntheticDataGenerationPaymentConfig = /*@__PURE__*/ S.suspend(
  () => S.Struct({ isResponsible: S.Boolean }),
).annotate({
  identifier: "SyntheticDataGenerationPaymentConfig",
}) as any as S.Schema<SyntheticDataGenerationPaymentConfig>;
export interface MLPaymentConfig {
  modelTraining?: ModelTrainingPaymentConfig;
  modelInference?: ModelInferencePaymentConfig;
  syntheticDataGeneration?: SyntheticDataGenerationPaymentConfig;
}
export const MLPaymentConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelTraining: S.optional(ModelTrainingPaymentConfig),
    modelInference: S.optional(ModelInferencePaymentConfig),
    syntheticDataGeneration: S.optional(SyntheticDataGenerationPaymentConfig),
  }),
).annotate({
  identifier: "MLPaymentConfig",
}) as any as S.Schema<MLPaymentConfig>;
export interface JobComputePaymentConfig {
  isResponsible: boolean;
}
export const JobComputePaymentConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ isResponsible: S.Boolean }),
).annotate({
  identifier: "JobComputePaymentConfig",
}) as any as S.Schema<JobComputePaymentConfig>;
export interface PaymentConfiguration {
  queryCompute: QueryComputePaymentConfig;
  machineLearning?: MLPaymentConfig;
  jobCompute?: JobComputePaymentConfig;
}
export const PaymentConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queryCompute: QueryComputePaymentConfig,
    machineLearning: S.optional(MLPaymentConfig),
    jobCompute: S.optional(JobComputePaymentConfig),
  }),
).annotate({
  identifier: "PaymentConfiguration",
}) as any as S.Schema<PaymentConfiguration>;
export interface MemberSpecification {
  accountId: string;
  memberAbilities: MemberAbility[];
  mlMemberAbilities?: MLMemberAbilities;
  displayName: string;
  paymentConfiguration?: PaymentConfiguration;
}
export const MemberSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.String,
    memberAbilities: MemberAbilities,
    mlMemberAbilities: S.optional(MLMemberAbilities),
    displayName: S.String,
    paymentConfiguration: S.optional(PaymentConfiguration),
  }),
).annotate({
  identifier: "MemberSpecification",
}) as any as S.Schema<MemberSpecification>;
export type MemberList = MemberSpecification[];
export const MemberList = /*@__PURE__*/ S.Array(MemberSpecification);
export type CollaborationName = string;
export type CollaborationDescription = string;
export interface DataEncryptionMetadata {
  allowCleartext: boolean;
  allowDuplicates: boolean;
  allowJoinsOnColumnsWithDifferentNames: boolean;
  preserveNulls: boolean;
}
export const DataEncryptionMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    allowCleartext: S.Boolean,
    allowDuplicates: S.Boolean,
    allowJoinsOnColumnsWithDifferentNames: S.Boolean,
    preserveNulls: S.Boolean,
  }),
).annotate({
  identifier: "DataEncryptionMetadata",
}) as any as S.Schema<DataEncryptionMetadata>;
export type CollaborationQueryLogStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const CollaborationQueryLogStatus = /*@__PURE__*/ S.String;

export type CollaborationJobLogStatus = "ENABLED" | "DISABLED" | (string & {});
export const CollaborationJobLogStatus = /*@__PURE__*/ S.String;

export type AnalyticsEngine = "SPARK" | "CLEAN_ROOMS_SQL" | (string & {});
export const AnalyticsEngine = /*@__PURE__*/ S.String;

export type AutoApprovedChangeType =
  | "ADD_MEMBER"
  | "GRANT_RECEIVE_RESULTS_ABILITY"
  | "REVOKE_RECEIVE_RESULTS_ABILITY"
  | (string & {});
export const AutoApprovedChangeType = /*@__PURE__*/ S.String;

export type AutoApprovedChangeTypeList = AutoApprovedChangeType[];
export const AutoApprovedChangeTypeList = /*@__PURE__*/ S.Array(
  AutoApprovedChangeType,
);
export type SupportedS3Region =
  | "us-west-1"
  | "us-west-2"
  | "us-east-1"
  | "us-east-2"
  | "af-south-1"
  | "ap-east-1"
  | "ap-east-2"
  | "ap-south-2"
  | "ap-southeast-1"
  | "ap-southeast-2"
  | "ap-southeast-3"
  | "ap-southeast-5"
  | "ap-southeast-4"
  | "ap-southeast-7"
  | "ap-south-1"
  | "ap-northeast-3"
  | "ap-northeast-1"
  | "ap-northeast-2"
  | "ca-central-1"
  | "ca-west-1"
  | "eu-south-1"
  | "eu-west-3"
  | "eu-south-2"
  | "eu-central-2"
  | "eu-central-1"
  | "eu-north-1"
  | "eu-west-1"
  | "eu-west-2"
  | "me-south-1"
  | "me-central-1"
  | "il-central-1"
  | "sa-east-1"
  | "mx-central-1"
  | (string & {});
export const SupportedS3Region = /*@__PURE__*/ S.String;

export type AllowedResultRegions = SupportedS3Region[];
export const AllowedResultRegions = /*@__PURE__*/ S.Array(SupportedS3Region);
export interface CreateCollaborationInput {
  members: MemberSpecification[];
  name: string;
  description: string;
  creatorMemberAbilities: MemberAbility[];
  creatorMLMemberAbilities?: MLMemberAbilities;
  creatorDisplayName: string;
  dataEncryptionMetadata?: DataEncryptionMetadata;
  queryLogStatus: CollaborationQueryLogStatus;
  jobLogStatus?: CollaborationJobLogStatus;
  tags?: { [key: string]: string | undefined };
  creatorPaymentConfiguration?: PaymentConfiguration;
  analyticsEngine?: AnalyticsEngine;
  autoApprovedChangeRequestTypes?: AutoApprovedChangeType[];
  allowedResultRegions?: SupportedS3Region[];
  isMetricsEnabled?: boolean;
}
export const CreateCollaborationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    members: MemberList,
    name: S.String,
    description: S.String,
    creatorMemberAbilities: MemberAbilities,
    creatorMLMemberAbilities: S.optional(MLMemberAbilities),
    creatorDisplayName: S.String,
    dataEncryptionMetadata: S.optional(DataEncryptionMetadata),
    queryLogStatus: CollaborationQueryLogStatus,
    jobLogStatus: S.optional(CollaborationJobLogStatus),
    tags: S.optional(TagMap),
    creatorPaymentConfiguration: S.optional(PaymentConfiguration),
    analyticsEngine: S.optional(AnalyticsEngine),
    autoApprovedChangeRequestTypes: S.optional(AutoApprovedChangeTypeList),
    allowedResultRegions: S.optional(AllowedResultRegions),
    isMetricsEnabled: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/collaborations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCollaborationInput",
}) as any as S.Schema<CreateCollaborationInput>;
export type MemberStatus = string;
export interface Collaboration {
  id: string;
  arn: string;
  name: string;
  description?: string;
  creatorAccountId: string;
  creatorDisplayName: string;
  createTime: Date;
  updateTime: Date;
  memberStatus: string;
  membershipId?: string;
  membershipArn?: string;
  dataEncryptionMetadata?: DataEncryptionMetadata;
  queryLogStatus: CollaborationQueryLogStatus;
  jobLogStatus?: CollaborationJobLogStatus;
  analyticsEngine?: AnalyticsEngine;
  autoApprovedChangeTypes?: AutoApprovedChangeType[];
  allowedResultRegions?: SupportedS3Region[];
  isMetricsEnabled?: boolean;
}
export const Collaboration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    name: S.String,
    description: S.optional(S.String),
    creatorAccountId: S.String,
    creatorDisplayName: S.String,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    memberStatus: S.String,
    membershipId: S.optional(S.String),
    membershipArn: S.optional(S.String),
    dataEncryptionMetadata: S.optional(DataEncryptionMetadata),
    queryLogStatus: CollaborationQueryLogStatus,
    jobLogStatus: S.optional(CollaborationJobLogStatus),
    analyticsEngine: S.optional(AnalyticsEngine),
    autoApprovedChangeTypes: S.optional(AutoApprovedChangeTypeList),
    allowedResultRegions: S.optional(AllowedResultRegions),
    isMetricsEnabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Collaboration" }) as any as S.Schema<Collaboration>;
export interface CreateCollaborationOutput {
  collaboration: Collaboration;
}
export const CreateCollaborationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ collaboration: Collaboration }),
).annotate({
  identifier: "CreateCollaborationOutput",
}) as any as S.Schema<CreateCollaborationOutput>;
export type ChangeSpecificationType =
  | "MEMBER"
  | "COLLABORATION"
  | (string & {});
export const ChangeSpecificationType = /*@__PURE__*/ S.String;

export interface MemberChangeSpecification {
  accountId: string;
  memberAbilities: MemberAbility[];
  mlMemberAbilities?: MLMemberAbilities;
  paymentConfiguration?: PaymentConfiguration;
  displayName?: string;
}
export const MemberChangeSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.String,
    memberAbilities: MemberAbilities,
    mlMemberAbilities: S.optional(MLMemberAbilities),
    paymentConfiguration: S.optional(PaymentConfiguration),
    displayName: S.optional(S.String),
  }),
).annotate({
  identifier: "MemberChangeSpecification",
}) as any as S.Schema<MemberChangeSpecification>;
export interface CollaborationChangeSpecification {
  autoApprovedChangeTypes?: AutoApprovedChangeType[];
}
export const CollaborationChangeSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ autoApprovedChangeTypes: S.optional(AutoApprovedChangeTypeList) }),
).annotate({
  identifier: "CollaborationChangeSpecification",
}) as any as S.Schema<CollaborationChangeSpecification>;
export type ChangeSpecification =
  | { member: MemberChangeSpecification; collaboration?: never }
  | { member?: never; collaboration: CollaborationChangeSpecification };
export const ChangeSpecification = /*@__PURE__*/ S.Union([
  S.Struct({ member: MemberChangeSpecification }),
  S.Struct({ collaboration: CollaborationChangeSpecification }),
]);
export interface ChangeInput {
  specificationType: ChangeSpecificationType;
  specification: ChangeSpecification;
}
export const ChangeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    specificationType: ChangeSpecificationType,
    specification: ChangeSpecification,
  }),
).annotate({ identifier: "ChangeInput" }) as any as S.Schema<ChangeInput>;
export type ChangeInputList = ChangeInput[];
export const ChangeInputList = /*@__PURE__*/ S.Array(ChangeInput);
export interface CreateCollaborationChangeRequestInput {
  collaborationIdentifier: string;
  changes: ChangeInput[];
}
export const CreateCollaborationChangeRequestInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      collaborationIdentifier: S.String.pipe(
        T.HttpLabel("collaborationIdentifier"),
      ),
      changes: ChangeInputList,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/collaborations/{collaborationIdentifier}/changeRequests",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateCollaborationChangeRequestInput",
}) as any as S.Schema<CreateCollaborationChangeRequestInput>;
export type ChangeRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "CANCELLED"
  | "DENIED"
  | "COMMITTED"
  | (string & {});
export const ChangeRequestStatus = /*@__PURE__*/ S.String;

export type ChangeType =
  | "ADD_MEMBER"
  | "GRANT_RECEIVE_RESULTS_ABILITY"
  | "REVOKE_RECEIVE_RESULTS_ABILITY"
  | "EDIT_AUTO_APPROVED_CHANGE_TYPES"
  | "ADD_PAYER_CANDIDATE"
  | "REMOVE_PAYER_CANDIDATE"
  | "GRANT_CAN_RECEIVE_MODEL_OUTPUT"
  | "GRANT_CAN_RECEIVE_INFERENCE_OUTPUT"
  | "REVOKE_CAN_RECEIVE_MODEL_OUTPUT"
  | "REVOKE_CAN_RECEIVE_INFERENCE_OUTPUT"
  | (string & {});
export const ChangeType = /*@__PURE__*/ S.String;

export type ChangeTypeList = ChangeType[];
export const ChangeTypeList = /*@__PURE__*/ S.Array(ChangeType);
export interface Change {
  specificationType: ChangeSpecificationType;
  specification: ChangeSpecification;
  types: ChangeType[];
}
export const Change = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    specificationType: ChangeSpecificationType,
    specification: ChangeSpecification,
    types: ChangeTypeList,
  }),
).annotate({ identifier: "Change" }) as any as S.Schema<Change>;
export type ChangeList = Change[];
export const ChangeList = /*@__PURE__*/ S.Array(Change);
export type ApprovalStatus = "APPROVED" | "DENIED" | "PENDING" | (string & {});
export const ApprovalStatus = /*@__PURE__*/ S.String;

export interface ApprovalStatusDetails {
  status: ApprovalStatus;
}
export const ApprovalStatusDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: ApprovalStatus }),
).annotate({
  identifier: "ApprovalStatusDetails",
}) as any as S.Schema<ApprovalStatusDetails>;
export type ApprovalStatuses = {
  [key: string]: ApprovalStatusDetails | undefined;
};
export const ApprovalStatuses = /*@__PURE__*/ S.Record(
  S.String,
  ApprovalStatusDetails.pipe(S.optional),
);
export interface CollaborationChangeRequest {
  id: string;
  collaborationId: string;
  createTime: Date;
  updateTime: Date;
  status: ChangeRequestStatus;
  isAutoApproved: boolean;
  changes: Change[];
  approvals?: { [key: string]: ApprovalStatusDetails | undefined };
}
export const CollaborationChangeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    collaborationId: S.String,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: ChangeRequestStatus,
    isAutoApproved: S.Boolean,
    changes: ChangeList,
    approvals: S.optional(ApprovalStatuses),
  }),
).annotate({
  identifier: "CollaborationChangeRequest",
}) as any as S.Schema<CollaborationChangeRequest>;
export interface CreateCollaborationChangeRequestOutput {
  collaborationChangeRequest: CollaborationChangeRequest;
}
export const CreateCollaborationChangeRequestOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ collaborationChangeRequest: CollaborationChangeRequest }),
).annotate({
  identifier: "CreateCollaborationChangeRequestOutput",
}) as any as S.Schema<CreateCollaborationChangeRequestOutput>;
export type ConfiguredAudienceModelArn = string;
export type ConfiguredAudienceModelAssociationName = string;
export interface CreateConfiguredAudienceModelAssociationInput {
  membershipIdentifier: string;
  configuredAudienceModelArn: string;
  configuredAudienceModelAssociationName: string;
  manageResourcePolicies: boolean;
  tags?: { [key: string]: string | undefined };
  description?: string;
}
export const CreateConfiguredAudienceModelAssociationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
      configuredAudienceModelArn: S.String,
      configuredAudienceModelAssociationName: S.String,
      manageResourcePolicies: S.Boolean,
      tags: S.optional(TagMap),
      description: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/memberships/{membershipIdentifier}/configuredaudiencemodelassociations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateConfiguredAudienceModelAssociationInput",
  }) as any as S.Schema<CreateConfiguredAudienceModelAssociationInput>;
export type ConfiguredAudienceModelAssociationIdentifier = string;
export type ConfiguredAudienceModelAssociationArn = string;
export interface ConfiguredAudienceModelAssociation {
  id: string;
  arn: string;
  configuredAudienceModelArn: string;
  membershipId: string;
  membershipArn: string;
  collaborationId: string;
  collaborationArn: string;
  name: string;
  manageResourcePolicies: boolean;
  description?: string;
  createTime: Date;
  updateTime: Date;
}
export const ConfiguredAudienceModelAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    configuredAudienceModelArn: S.String,
    membershipId: S.String,
    membershipArn: S.String,
    collaborationId: S.String,
    collaborationArn: S.String,
    name: S.String,
    manageResourcePolicies: S.Boolean,
    description: S.optional(S.String),
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "ConfiguredAudienceModelAssociation",
}) as any as S.Schema<ConfiguredAudienceModelAssociation>;
export interface CreateConfiguredAudienceModelAssociationOutput {
  configuredAudienceModelAssociation: ConfiguredAudienceModelAssociation;
}
export const CreateConfiguredAudienceModelAssociationOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      configuredAudienceModelAssociation: ConfiguredAudienceModelAssociation,
    }),
  ).annotate({
    identifier: "CreateConfiguredAudienceModelAssociationOutput",
  }) as any as S.Schema<CreateConfiguredAudienceModelAssociationOutput>;
export type CommercialRegion =
  | "us-west-1"
  | "us-west-2"
  | "us-east-1"
  | "us-east-2"
  | "af-south-1"
  | "ap-east-1"
  | "ap-south-2"
  | "ap-southeast-1"
  | "ap-southeast-2"
  | "ap-southeast-3"
  | "ap-southeast-5"
  | "ap-southeast-4"
  | "ap-southeast-7"
  | "ap-south-1"
  | "ap-northeast-3"
  | "ap-northeast-1"
  | "ap-northeast-2"
  | "ca-central-1"
  | "ca-west-1"
  | "eu-south-1"
  | "eu-west-3"
  | "eu-south-2"
  | "eu-central-2"
  | "eu-central-1"
  | "eu-north-1"
  | "eu-west-1"
  | "eu-west-2"
  | "me-south-1"
  | "me-central-1"
  | "il-central-1"
  | "sa-east-1"
  | "mx-central-1"
  | "ap-east-2"
  | (string & {});
export const CommercialRegion = /*@__PURE__*/ S.String;

export type GlueTableName = string;
export type GlueDatabaseName = string;
export interface GlueTableReference {
  region?: CommercialRegion;
  tableName: string;
  databaseName: string;
}
export const GlueTableReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    region: S.optional(CommercialRegion),
    tableName: S.String,
    databaseName: S.String,
  }),
).annotate({
  identifier: "GlueTableReference",
}) as any as S.Schema<GlueTableReference>;
export type SecretsManagerArn = string;
export type SnowflakeAccountIdentifier = string;
export type SnowflakeDatabaseName = string;
export type SnowflakeTableName = string;
export type SnowflakeSchemaName = string;
export interface SnowflakeTableSchemaV1 {
  columnName: string;
  columnType: string;
}
export const SnowflakeTableSchemaV1 = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ columnName: S.String, columnType: S.String }),
).annotate({
  identifier: "SnowflakeTableSchemaV1",
}) as any as S.Schema<SnowflakeTableSchemaV1>;
export type SnowflakeTableSchemaList = SnowflakeTableSchemaV1[];
export const SnowflakeTableSchemaList = /*@__PURE__*/ S.Array(
  SnowflakeTableSchemaV1,
);
export type SnowflakeTableSchema = { v1: SnowflakeTableSchemaV1[] };
export const SnowflakeTableSchema = /*@__PURE__*/ S.Union([
  S.Struct({ v1: SnowflakeTableSchemaList }),
]);
export interface SnowflakeTableReference {
  secretArn: string;
  accountIdentifier: string;
  databaseName: string;
  tableName: string;
  schemaName: string;
  tableSchema: SnowflakeTableSchema;
}
export const SnowflakeTableReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    secretArn: S.String,
    accountIdentifier: S.String,
    databaseName: S.String,
    tableName: S.String,
    schemaName: S.String,
    tableSchema: SnowflakeTableSchema,
  }),
).annotate({
  identifier: "SnowflakeTableReference",
}) as any as S.Schema<SnowflakeTableReference>;
export type AthenaWorkGroup = string;
export type AthenaOutputLocation = string;
export type AthenaDatabaseName = string;
export type AthenaTableName = string;
export type AthenaCatalogName = string;
export interface AthenaTableReference {
  region?: CommercialRegion;
  workGroup: string;
  outputLocation?: string;
  databaseName: string;
  tableName: string;
  catalogName?: string;
}
export const AthenaTableReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    region: S.optional(CommercialRegion),
    workGroup: S.String,
    outputLocation: S.optional(S.String),
    databaseName: S.String,
    tableName: S.String,
    catalogName: S.optional(S.String),
  }),
).annotate({
  identifier: "AthenaTableReference",
}) as any as S.Schema<AthenaTableReference>;
export type TableReference =
  | { glue: GlueTableReference; snowflake?: never; athena?: never }
  | { glue?: never; snowflake: SnowflakeTableReference; athena?: never }
  | { glue?: never; snowflake?: never; athena: AthenaTableReference };
export const TableReference = /*@__PURE__*/ S.Union([
  S.Struct({ glue: GlueTableReference }),
  S.Struct({ snowflake: SnowflakeTableReference }),
  S.Struct({ athena: AthenaTableReference }),
]);
export type AllowedColumnList = string[];
export const AllowedColumnList = /*@__PURE__*/ S.Array(S.String);
export interface CreateConfiguredTableInput {
  name: string;
  description?: string;
  tableReference: TableReference;
  allowedColumns: string[];
  analysisMethod: AnalysisMethod;
  selectedAnalysisMethods?: SelectedAnalysisMethod[];
  tags?: { [key: string]: string | undefined };
}
export const CreateConfiguredTableInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    tableReference: TableReference,
    allowedColumns: AllowedColumnList,
    analysisMethod: AnalysisMethod,
    selectedAnalysisMethods: S.optional(SelectedAnalysisMethods),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/configuredTables" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateConfiguredTableInput",
}) as any as S.Schema<CreateConfiguredTableInput>;
export type ConfiguredTableArn = string;
export type ConfiguredTableAnalysisRuleType =
  | "AGGREGATION"
  | "LIST"
  | "CUSTOM"
  | (string & {});
export const ConfiguredTableAnalysisRuleType = /*@__PURE__*/ S.String;

export type ConfiguredTableAnalysisRuleTypeList =
  ConfiguredTableAnalysisRuleType[];
export const ConfiguredTableAnalysisRuleTypeList = /*@__PURE__*/ S.Array(
  ConfiguredTableAnalysisRuleType,
);
export interface ConfiguredTable {
  id: string;
  arn: string;
  name: string;
  description?: string;
  tableReference: TableReference;
  createTime: Date;
  updateTime: Date;
  analysisRuleTypes: ConfiguredTableAnalysisRuleType[];
  analysisMethod: AnalysisMethod;
  allowedColumns: string[];
  selectedAnalysisMethods?: SelectedAnalysisMethod[];
}
export const ConfiguredTable = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    name: S.String,
    description: S.optional(S.String),
    tableReference: TableReference,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    analysisRuleTypes: ConfiguredTableAnalysisRuleTypeList,
    analysisMethod: AnalysisMethod,
    allowedColumns: AllowedColumnList,
    selectedAnalysisMethods: S.optional(SelectedAnalysisMethods),
  }),
).annotate({
  identifier: "ConfiguredTable",
}) as any as S.Schema<ConfiguredTable>;
export interface CreateConfiguredTableOutput {
  configuredTable: ConfiguredTable;
}
export const CreateConfiguredTableOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ configuredTable: ConfiguredTable }),
).annotate({
  identifier: "CreateConfiguredTableOutput",
}) as any as S.Schema<CreateConfiguredTableOutput>;
export type ConfiguredTableIdentifier = string;
export type ConfiguredTableAnalysisRulePolicyV1 =
  | { list: AnalysisRuleList; aggregation?: never; custom?: never }
  | { list?: never; aggregation: AnalysisRuleAggregation; custom?: never }
  | { list?: never; aggregation?: never; custom: AnalysisRuleCustom };
export const ConfiguredTableAnalysisRulePolicyV1 = /*@__PURE__*/ S.Union([
  S.Struct({ list: AnalysisRuleList }),
  S.Struct({ aggregation: AnalysisRuleAggregation }),
  S.Struct({ custom: AnalysisRuleCustom }),
]);
export type ConfiguredTableAnalysisRulePolicy = {
  v1: ConfiguredTableAnalysisRulePolicyV1;
};
export const ConfiguredTableAnalysisRulePolicy = /*@__PURE__*/ S.Union([
  S.Struct({ v1: ConfiguredTableAnalysisRulePolicyV1 }),
]);
export interface CreateConfiguredTableAnalysisRuleInput {
  configuredTableIdentifier: string;
  analysisRuleType: ConfiguredTableAnalysisRuleType;
  analysisRulePolicy: ConfiguredTableAnalysisRulePolicy;
}
export const CreateConfiguredTableAnalysisRuleInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      configuredTableIdentifier: S.String.pipe(
        T.HttpLabel("configuredTableIdentifier"),
      ),
      analysisRuleType: ConfiguredTableAnalysisRuleType,
      analysisRulePolicy: ConfiguredTableAnalysisRulePolicy,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/configuredTables/{configuredTableIdentifier}/analysisRule",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateConfiguredTableAnalysisRuleInput",
}) as any as S.Schema<CreateConfiguredTableAnalysisRuleInput>;
export interface ConfiguredTableAnalysisRule {
  configuredTableId: string;
  configuredTableArn: string;
  policy: ConfiguredTableAnalysisRulePolicy;
  type: ConfiguredTableAnalysisRuleType;
  createTime: Date;
  updateTime: Date;
}
export const ConfiguredTableAnalysisRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuredTableId: S.String,
    configuredTableArn: S.String,
    policy: ConfiguredTableAnalysisRulePolicy,
    type: ConfiguredTableAnalysisRuleType,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "ConfiguredTableAnalysisRule",
}) as any as S.Schema<ConfiguredTableAnalysisRule>;
export interface CreateConfiguredTableAnalysisRuleOutput {
  analysisRule: ConfiguredTableAnalysisRule;
}
export const CreateConfiguredTableAnalysisRuleOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ analysisRule: ConfiguredTableAnalysisRule }),
).annotate({
  identifier: "CreateConfiguredTableAnalysisRuleOutput",
}) as any as S.Schema<CreateConfiguredTableAnalysisRuleOutput>;
export interface CreateConfiguredTableAssociationInput {
  name: string;
  description?: string;
  membershipIdentifier: string;
  configuredTableIdentifier: string;
  roleArn: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateConfiguredTableAssociationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      name: S.String,
      description: S.optional(S.String),
      membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
      configuredTableIdentifier: S.String,
      roleArn: S.String,
      tags: S.optional(TagMap),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/memberships/{membershipIdentifier}/configuredTableAssociations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateConfiguredTableAssociationInput",
}) as any as S.Schema<CreateConfiguredTableAssociationInput>;
export type ConfiguredTableAssociationArn = string;
export type ConfiguredTableAssociationAnalysisRuleType =
  | "AGGREGATION"
  | "LIST"
  | "CUSTOM"
  | (string & {});
export const ConfiguredTableAssociationAnalysisRuleType =
  /*@__PURE__*/ S.String;

export type ConfiguredTableAssociationAnalysisRuleTypeList =
  ConfiguredTableAssociationAnalysisRuleType[];
export const ConfiguredTableAssociationAnalysisRuleTypeList =
  /*@__PURE__*/ S.Array(ConfiguredTableAssociationAnalysisRuleType);
export interface ConfiguredTableAssociation {
  arn: string;
  id: string;
  configuredTableId: string;
  configuredTableArn: string;
  membershipId: string;
  membershipArn: string;
  roleArn: string;
  name: string;
  description?: string;
  analysisRuleTypes?: ConfiguredTableAssociationAnalysisRuleType[];
  createTime: Date;
  updateTime: Date;
}
export const ConfiguredTableAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    id: S.String,
    configuredTableId: S.String,
    configuredTableArn: S.String,
    membershipId: S.String,
    membershipArn: S.String,
    roleArn: S.String,
    name: S.String,
    description: S.optional(S.String),
    analysisRuleTypes: S.optional(
      ConfiguredTableAssociationAnalysisRuleTypeList,
    ),
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "ConfiguredTableAssociation",
}) as any as S.Schema<ConfiguredTableAssociation>;
export interface CreateConfiguredTableAssociationOutput {
  configuredTableAssociation: ConfiguredTableAssociation;
}
export const CreateConfiguredTableAssociationOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ configuredTableAssociation: ConfiguredTableAssociation }),
).annotate({
  identifier: "CreateConfiguredTableAssociationOutput",
}) as any as S.Schema<CreateConfiguredTableAssociationOutput>;
export type ConfiguredTableAssociationIdentifier = string;
export interface CreateConfiguredTableAssociationAnalysisRuleInput {
  membershipIdentifier: string;
  configuredTableAssociationIdentifier: string;
  analysisRuleType: ConfiguredTableAssociationAnalysisRuleType;
  analysisRulePolicy: ConfiguredTableAssociationAnalysisRulePolicy;
}
export const CreateConfiguredTableAssociationAnalysisRuleInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
      configuredTableAssociationIdentifier: S.String.pipe(
        T.HttpLabel("configuredTableAssociationIdentifier"),
      ),
      analysisRuleType: ConfiguredTableAssociationAnalysisRuleType,
      analysisRulePolicy: ConfiguredTableAssociationAnalysisRulePolicy,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/memberships/{membershipIdentifier}/configuredTableAssociations/{configuredTableAssociationIdentifier}/analysisRule",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateConfiguredTableAssociationAnalysisRuleInput",
  }) as any as S.Schema<CreateConfiguredTableAssociationAnalysisRuleInput>;
export interface ConfiguredTableAssociationAnalysisRule {
  membershipIdentifier: string;
  configuredTableAssociationId: string;
  configuredTableAssociationArn: string;
  policy: ConfiguredTableAssociationAnalysisRulePolicy;
  type: ConfiguredTableAssociationAnalysisRuleType;
  createTime: Date;
  updateTime: Date;
}
export const ConfiguredTableAssociationAnalysisRule = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      membershipIdentifier: S.String,
      configuredTableAssociationId: S.String,
      configuredTableAssociationArn: S.String,
      policy: ConfiguredTableAssociationAnalysisRulePolicy,
      type: ConfiguredTableAssociationAnalysisRuleType,
      createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    }),
).annotate({
  identifier: "ConfiguredTableAssociationAnalysisRule",
}) as any as S.Schema<ConfiguredTableAssociationAnalysisRule>;
export interface CreateConfiguredTableAssociationAnalysisRuleOutput {
  analysisRule: ConfiguredTableAssociationAnalysisRule;
}
export const CreateConfiguredTableAssociationAnalysisRuleOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ analysisRule: ConfiguredTableAssociationAnalysisRule }),
  ).annotate({
    identifier: "CreateConfiguredTableAssociationAnalysisRuleOutput",
  }) as any as S.Schema<CreateConfiguredTableAssociationAnalysisRuleOutput>;
export type IdMappingTableInputReferenceArn = string;
export interface IdMappingTableInputReferenceConfig {
  inputReferenceArn: string;
  manageResourcePolicies: boolean;
}
export const IdMappingTableInputReferenceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ inputReferenceArn: S.String, manageResourcePolicies: S.Boolean }),
).annotate({
  identifier: "IdMappingTableInputReferenceConfig",
}) as any as S.Schema<IdMappingTableInputReferenceConfig>;
export type KMSKeyArn = string;
export interface CreateIdMappingTableInput {
  membershipIdentifier: string;
  name: string;
  description?: string;
  inputReferenceConfig: IdMappingTableInputReferenceConfig;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
}
export const CreateIdMappingTableInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    name: S.String,
    description: S.optional(S.String),
    inputReferenceConfig: IdMappingTableInputReferenceConfig,
    tags: S.optional(TagMap),
    kmsKeyArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/memberships/{membershipIdentifier}/idmappingtables",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateIdMappingTableInput",
}) as any as S.Schema<CreateIdMappingTableInput>;
export type IdMappingTableArn = string;
export interface IdMappingTableInputReferenceProperties {
  idMappingTableInputSource: IdMappingTableInputSource[];
}
export const IdMappingTableInputReferenceProperties = /*@__PURE__*/ S.suspend(
  () => S.Struct({ idMappingTableInputSource: IdMappingTableInputSourceList }),
).annotate({
  identifier: "IdMappingTableInputReferenceProperties",
}) as any as S.Schema<IdMappingTableInputReferenceProperties>;
export interface IdMappingTable {
  id: string;
  arn: string;
  inputReferenceConfig: IdMappingTableInputReferenceConfig;
  membershipId: string;
  membershipArn: string;
  collaborationId: string;
  collaborationArn: string;
  description?: string;
  name: string;
  createTime: Date;
  updateTime: Date;
  inputReferenceProperties: IdMappingTableInputReferenceProperties;
  kmsKeyArn?: string;
}
export const IdMappingTable = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    inputReferenceConfig: IdMappingTableInputReferenceConfig,
    membershipId: S.String,
    membershipArn: S.String,
    collaborationId: S.String,
    collaborationArn: S.String,
    description: S.optional(S.String),
    name: S.String,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    inputReferenceProperties: IdMappingTableInputReferenceProperties,
    kmsKeyArn: S.optional(S.String),
  }),
).annotate({ identifier: "IdMappingTable" }) as any as S.Schema<IdMappingTable>;
export interface CreateIdMappingTableOutput {
  idMappingTable: IdMappingTable;
}
export const CreateIdMappingTableOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ idMappingTable: IdMappingTable }),
).annotate({
  identifier: "CreateIdMappingTableOutput",
}) as any as S.Schema<CreateIdMappingTableOutput>;
export type IdNamespaceAssociationInputReferenceArn = string;
export interface IdNamespaceAssociationInputReferenceConfig {
  inputReferenceArn: string;
  manageResourcePolicies: boolean;
}
export const IdNamespaceAssociationInputReferenceConfig =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      inputReferenceArn: S.String,
      manageResourcePolicies: S.Boolean,
    }),
  ).annotate({
    identifier: "IdNamespaceAssociationInputReferenceConfig",
  }) as any as S.Schema<IdNamespaceAssociationInputReferenceConfig>;
export type GenericResourceName = string;
export interface IdMappingConfig {
  allowUseAsDimensionColumn: boolean;
}
export const IdMappingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ allowUseAsDimensionColumn: S.Boolean }),
).annotate({
  identifier: "IdMappingConfig",
}) as any as S.Schema<IdMappingConfig>;
export interface CreateIdNamespaceAssociationInput {
  membershipIdentifier: string;
  inputReferenceConfig: IdNamespaceAssociationInputReferenceConfig;
  tags?: { [key: string]: string | undefined };
  name: string;
  description?: string;
  idMappingConfig?: IdMappingConfig;
}
export const CreateIdNamespaceAssociationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    inputReferenceConfig: IdNamespaceAssociationInputReferenceConfig,
    tags: S.optional(TagMap),
    name: S.String,
    description: S.optional(S.String),
    idMappingConfig: S.optional(IdMappingConfig),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/memberships/{membershipIdentifier}/idnamespaceassociations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateIdNamespaceAssociationInput",
}) as any as S.Schema<CreateIdNamespaceAssociationInput>;
export type IdNamespaceAssociationIdentifier = string;
export type IdNamespaceAssociationArn = string;
export type IdMappingWorkflowsSupported = any[];
export const IdMappingWorkflowsSupported = /*@__PURE__*/ S.Array(S.Any);
export interface IdNamespaceAssociationInputReferenceProperties {
  idNamespaceType: IdNamespaceType;
  idMappingWorkflowsSupported: any[];
}
export const IdNamespaceAssociationInputReferenceProperties =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      idNamespaceType: IdNamespaceType,
      idMappingWorkflowsSupported: IdMappingWorkflowsSupported,
    }),
  ).annotate({
    identifier: "IdNamespaceAssociationInputReferenceProperties",
  }) as any as S.Schema<IdNamespaceAssociationInputReferenceProperties>;
export interface IdNamespaceAssociation {
  id: string;
  arn: string;
  membershipId: string;
  membershipArn: string;
  collaborationId: string;
  collaborationArn: string;
  name: string;
  description?: string;
  createTime: Date;
  updateTime: Date;
  inputReferenceConfig: IdNamespaceAssociationInputReferenceConfig;
  inputReferenceProperties: IdNamespaceAssociationInputReferenceProperties;
  idMappingConfig?: IdMappingConfig;
}
export const IdNamespaceAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    membershipId: S.String,
    membershipArn: S.String,
    collaborationId: S.String,
    collaborationArn: S.String,
    name: S.String,
    description: S.optional(S.String),
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    inputReferenceConfig: IdNamespaceAssociationInputReferenceConfig,
    inputReferenceProperties: IdNamespaceAssociationInputReferenceProperties,
    idMappingConfig: S.optional(IdMappingConfig),
  }),
).annotate({
  identifier: "IdNamespaceAssociation",
}) as any as S.Schema<IdNamespaceAssociation>;
export interface CreateIdNamespaceAssociationOutput {
  idNamespaceAssociation: IdNamespaceAssociation;
}
export const CreateIdNamespaceAssociationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ idNamespaceAssociation: IdNamespaceAssociation }),
).annotate({
  identifier: "CreateIdNamespaceAssociationOutput",
}) as any as S.Schema<CreateIdNamespaceAssociationOutput>;
export type MembershipQueryLogStatus = "ENABLED" | "DISABLED" | (string & {});
export const MembershipQueryLogStatus = /*@__PURE__*/ S.String;

export type MembershipJobLogStatus = "ENABLED" | "DISABLED" | (string & {});
export const MembershipJobLogStatus = /*@__PURE__*/ S.String;

export type ResultFormat = "CSV" | "PARQUET" | (string & {});
export const ResultFormat = /*@__PURE__*/ S.String;

export type KeyPrefix = string;
export interface ProtectedQueryS3OutputConfiguration {
  resultFormat: ResultFormat;
  bucket: string;
  keyPrefix?: string;
  singleFileOutput?: boolean;
}
export const ProtectedQueryS3OutputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resultFormat: ResultFormat,
    bucket: S.String,
    keyPrefix: S.optional(S.String),
    singleFileOutput: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ProtectedQueryS3OutputConfiguration",
}) as any as S.Schema<ProtectedQueryS3OutputConfiguration>;
export type MembershipProtectedQueryOutputConfiguration = {
  s3: ProtectedQueryS3OutputConfiguration;
};
export const MembershipProtectedQueryOutputConfiguration =
  /*@__PURE__*/ S.Union([
    S.Struct({ s3: ProtectedQueryS3OutputConfiguration }),
  ]);
export interface MembershipProtectedQueryResultConfiguration {
  outputConfiguration: MembershipProtectedQueryOutputConfiguration;
  roleArn?: string;
}
export const MembershipProtectedQueryResultConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      outputConfiguration: MembershipProtectedQueryOutputConfiguration,
      roleArn: S.optional(S.String),
    }),
  ).annotate({
    identifier: "MembershipProtectedQueryResultConfiguration",
  }) as any as S.Schema<MembershipProtectedQueryResultConfiguration>;
export interface ProtectedJobS3OutputConfigurationInput {
  bucket: string;
  keyPrefix?: string;
}
export const ProtectedJobS3OutputConfigurationInput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ bucket: S.String, keyPrefix: S.optional(S.String) }),
).annotate({
  identifier: "ProtectedJobS3OutputConfigurationInput",
}) as any as S.Schema<ProtectedJobS3OutputConfigurationInput>;
export type MembershipProtectedJobOutputConfiguration = {
  s3: ProtectedJobS3OutputConfigurationInput;
};
export const MembershipProtectedJobOutputConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ s3: ProtectedJobS3OutputConfigurationInput }),
]);
export interface MembershipProtectedJobResultConfiguration {
  outputConfiguration: MembershipProtectedJobOutputConfiguration;
  roleArn: string;
}
export const MembershipProtectedJobResultConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      outputConfiguration: MembershipProtectedJobOutputConfiguration,
      roleArn: S.String,
    }),
  ).annotate({
    identifier: "MembershipProtectedJobResultConfiguration",
  }) as any as S.Schema<MembershipProtectedJobResultConfiguration>;
export interface MembershipQueryComputePaymentConfig {
  isResponsible: boolean;
}
export const MembershipQueryComputePaymentConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ isResponsible: S.Boolean }),
).annotate({
  identifier: "MembershipQueryComputePaymentConfig",
}) as any as S.Schema<MembershipQueryComputePaymentConfig>;
export interface MembershipModelTrainingPaymentConfig {
  isResponsible: boolean;
}
export const MembershipModelTrainingPaymentConfig = /*@__PURE__*/ S.suspend(
  () => S.Struct({ isResponsible: S.Boolean }),
).annotate({
  identifier: "MembershipModelTrainingPaymentConfig",
}) as any as S.Schema<MembershipModelTrainingPaymentConfig>;
export interface MembershipModelInferencePaymentConfig {
  isResponsible: boolean;
}
export const MembershipModelInferencePaymentConfig = /*@__PURE__*/ S.suspend(
  () => S.Struct({ isResponsible: S.Boolean }),
).annotate({
  identifier: "MembershipModelInferencePaymentConfig",
}) as any as S.Schema<MembershipModelInferencePaymentConfig>;
export interface MembershipSyntheticDataGenerationPaymentConfig {
  isResponsible: boolean;
}
export const MembershipSyntheticDataGenerationPaymentConfig =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ isResponsible: S.Boolean }),
  ).annotate({
    identifier: "MembershipSyntheticDataGenerationPaymentConfig",
  }) as any as S.Schema<MembershipSyntheticDataGenerationPaymentConfig>;
export interface MembershipMLPaymentConfig {
  modelTraining?: MembershipModelTrainingPaymentConfig;
  modelInference?: MembershipModelInferencePaymentConfig;
  syntheticDataGeneration?: MembershipSyntheticDataGenerationPaymentConfig;
}
export const MembershipMLPaymentConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelTraining: S.optional(MembershipModelTrainingPaymentConfig),
    modelInference: S.optional(MembershipModelInferencePaymentConfig),
    syntheticDataGeneration: S.optional(
      MembershipSyntheticDataGenerationPaymentConfig,
    ),
  }),
).annotate({
  identifier: "MembershipMLPaymentConfig",
}) as any as S.Schema<MembershipMLPaymentConfig>;
export interface MembershipJobComputePaymentConfig {
  isResponsible: boolean;
}
export const MembershipJobComputePaymentConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ isResponsible: S.Boolean }),
).annotate({
  identifier: "MembershipJobComputePaymentConfig",
}) as any as S.Schema<MembershipJobComputePaymentConfig>;
export interface MembershipPaymentConfiguration {
  queryCompute: MembershipQueryComputePaymentConfig;
  machineLearning?: MembershipMLPaymentConfig;
  jobCompute?: MembershipJobComputePaymentConfig;
}
export const MembershipPaymentConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queryCompute: MembershipQueryComputePaymentConfig,
    machineLearning: S.optional(MembershipMLPaymentConfig),
    jobCompute: S.optional(MembershipJobComputePaymentConfig),
  }),
).annotate({
  identifier: "MembershipPaymentConfiguration",
}) as any as S.Schema<MembershipPaymentConfiguration>;
export interface CreateMembershipInput {
  collaborationIdentifier: string;
  queryLogStatus: MembershipQueryLogStatus;
  jobLogStatus?: MembershipJobLogStatus;
  tags?: { [key: string]: string | undefined };
  defaultResultConfiguration?: MembershipProtectedQueryResultConfiguration;
  defaultJobResultConfiguration?: MembershipProtectedJobResultConfiguration;
  paymentConfiguration?: MembershipPaymentConfiguration;
  isMetricsEnabled?: boolean;
}
export const CreateMembershipInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    collaborationIdentifier: S.String,
    queryLogStatus: MembershipQueryLogStatus,
    jobLogStatus: S.optional(MembershipJobLogStatus),
    tags: S.optional(TagMap),
    defaultResultConfiguration: S.optional(
      MembershipProtectedQueryResultConfiguration,
    ),
    defaultJobResultConfiguration: S.optional(
      MembershipProtectedJobResultConfiguration,
    ),
    paymentConfiguration: S.optional(MembershipPaymentConfiguration),
    isMetricsEnabled: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/memberships" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMembershipInput",
}) as any as S.Schema<CreateMembershipInput>;
export type MembershipStatus = string;
export interface Membership {
  id: string;
  arn: string;
  collaborationArn: string;
  collaborationId: string;
  collaborationCreatorAccountId: string;
  collaborationCreatorDisplayName: string;
  collaborationName: string;
  createTime: Date;
  updateTime: Date;
  status: string;
  memberAbilities: MemberAbility[];
  mlMemberAbilities?: MLMemberAbilities;
  queryLogStatus: MembershipQueryLogStatus;
  jobLogStatus?: MembershipJobLogStatus;
  defaultResultConfiguration?: MembershipProtectedQueryResultConfiguration;
  defaultJobResultConfiguration?: MembershipProtectedJobResultConfiguration;
  paymentConfiguration: MembershipPaymentConfiguration;
  isMetricsEnabled?: boolean;
}
export const Membership = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    collaborationArn: S.String,
    collaborationId: S.String,
    collaborationCreatorAccountId: S.String,
    collaborationCreatorDisplayName: S.String,
    collaborationName: S.String,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: S.String,
    memberAbilities: MemberAbilities,
    mlMemberAbilities: S.optional(MLMemberAbilities),
    queryLogStatus: MembershipQueryLogStatus,
    jobLogStatus: S.optional(MembershipJobLogStatus),
    defaultResultConfiguration: S.optional(
      MembershipProtectedQueryResultConfiguration,
    ),
    defaultJobResultConfiguration: S.optional(
      MembershipProtectedJobResultConfiguration,
    ),
    paymentConfiguration: MembershipPaymentConfiguration,
    isMetricsEnabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Membership" }) as any as S.Schema<Membership>;
export interface CreateMembershipOutput {
  membership: Membership;
}
export const CreateMembershipOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ membership: Membership }),
).annotate({
  identifier: "CreateMembershipOutput",
}) as any as S.Schema<CreateMembershipOutput>;
export type PrivacyBudgetTemplateAutoRefresh =
  | "CALENDAR_MONTH"
  | "NONE"
  | (string & {});
export const PrivacyBudgetTemplateAutoRefresh = /*@__PURE__*/ S.String;

export type PrivacyBudgetType =
  | "DIFFERENTIAL_PRIVACY"
  | "ACCESS_BUDGET"
  | (string & {});
export const PrivacyBudgetType = /*@__PURE__*/ S.String;

export type Epsilon = number;
export type UsersNoisePerQuery = number;
export interface DifferentialPrivacyTemplateParametersInput {
  epsilon: number;
  usersNoisePerQuery: number;
}
export const DifferentialPrivacyTemplateParametersInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ epsilon: S.Number, usersNoisePerQuery: S.Number }),
  ).annotate({
    identifier: "DifferentialPrivacyTemplateParametersInput",
  }) as any as S.Schema<DifferentialPrivacyTemplateParametersInput>;
export type AccessBudgetType =
  | "CALENDAR_DAY"
  | "CALENDAR_MONTH"
  | "CALENDAR_WEEK"
  | "LIFETIME"
  | (string & {});
export const AccessBudgetType = /*@__PURE__*/ S.String;

export type Budget = number;
export type AutoRefreshMode = "ENABLED" | "DISABLED" | (string & {});
export const AutoRefreshMode = /*@__PURE__*/ S.String;

export interface BudgetParameter {
  type: AccessBudgetType;
  budget: number;
  autoRefresh?: AutoRefreshMode;
}
export const BudgetParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: AccessBudgetType,
    budget: S.Number,
    autoRefresh: S.optional(AutoRefreshMode),
  }),
).annotate({
  identifier: "BudgetParameter",
}) as any as S.Schema<BudgetParameter>;
export type BudgetParameters = BudgetParameter[];
export const BudgetParameters = /*@__PURE__*/ S.Array(BudgetParameter);
export type BudgetedResourceArn = string;
export interface AccessBudgetsPrivacyTemplateParametersInput {
  budgetParameters: BudgetParameter[];
  resourceArn: string;
}
export const AccessBudgetsPrivacyTemplateParametersInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ budgetParameters: BudgetParameters, resourceArn: S.String }),
  ).annotate({
    identifier: "AccessBudgetsPrivacyTemplateParametersInput",
  }) as any as S.Schema<AccessBudgetsPrivacyTemplateParametersInput>;
export type PrivacyBudgetTemplateParametersInput =
  | {
      differentialPrivacy: DifferentialPrivacyTemplateParametersInput;
      accessBudget?: never;
    }
  | {
      differentialPrivacy?: never;
      accessBudget: AccessBudgetsPrivacyTemplateParametersInput;
    };
export const PrivacyBudgetTemplateParametersInput = /*@__PURE__*/ S.Union([
  S.Struct({ differentialPrivacy: DifferentialPrivacyTemplateParametersInput }),
  S.Struct({ accessBudget: AccessBudgetsPrivacyTemplateParametersInput }),
]);
export interface CreatePrivacyBudgetTemplateInput {
  membershipIdentifier: string;
  autoRefresh?: PrivacyBudgetTemplateAutoRefresh;
  privacyBudgetType: PrivacyBudgetType;
  parameters: PrivacyBudgetTemplateParametersInput;
  tags?: { [key: string]: string | undefined };
}
export const CreatePrivacyBudgetTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    autoRefresh: S.optional(PrivacyBudgetTemplateAutoRefresh),
    privacyBudgetType: PrivacyBudgetType,
    parameters: PrivacyBudgetTemplateParametersInput,
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/memberships/{membershipIdentifier}/privacybudgettemplates",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePrivacyBudgetTemplateInput",
}) as any as S.Schema<CreatePrivacyBudgetTemplateInput>;
export type PrivacyBudgetTemplateIdentifier = string;
export type PrivacyBudgetTemplateArn = string;
export interface DifferentialPrivacyTemplateParametersOutput {
  epsilon: number;
  usersNoisePerQuery: number;
}
export const DifferentialPrivacyTemplateParametersOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ epsilon: S.Number, usersNoisePerQuery: S.Number }),
  ).annotate({
    identifier: "DifferentialPrivacyTemplateParametersOutput",
  }) as any as S.Schema<DifferentialPrivacyTemplateParametersOutput>;
export interface AccessBudgetsPrivacyTemplateParametersOutput {
  budgetParameters: BudgetParameter[];
  resourceArn: string;
}
export const AccessBudgetsPrivacyTemplateParametersOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ budgetParameters: BudgetParameters, resourceArn: S.String }),
  ).annotate({
    identifier: "AccessBudgetsPrivacyTemplateParametersOutput",
  }) as any as S.Schema<AccessBudgetsPrivacyTemplateParametersOutput>;
export type PrivacyBudgetTemplateParametersOutput =
  | {
      differentialPrivacy: DifferentialPrivacyTemplateParametersOutput;
      accessBudget?: never;
    }
  | {
      differentialPrivacy?: never;
      accessBudget: AccessBudgetsPrivacyTemplateParametersOutput;
    };
export const PrivacyBudgetTemplateParametersOutput = /*@__PURE__*/ S.Union([
  S.Struct({
    differentialPrivacy: DifferentialPrivacyTemplateParametersOutput,
  }),
  S.Struct({ accessBudget: AccessBudgetsPrivacyTemplateParametersOutput }),
]);
export interface PrivacyBudgetTemplate {
  id: string;
  arn: string;
  membershipId: string;
  membershipArn: string;
  collaborationId: string;
  collaborationArn: string;
  createTime: Date;
  updateTime: Date;
  privacyBudgetType: PrivacyBudgetType;
  autoRefresh: PrivacyBudgetTemplateAutoRefresh;
  parameters: PrivacyBudgetTemplateParametersOutput;
}
export const PrivacyBudgetTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    membershipId: S.String,
    membershipArn: S.String,
    collaborationId: S.String,
    collaborationArn: S.String,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    privacyBudgetType: PrivacyBudgetType,
    autoRefresh: PrivacyBudgetTemplateAutoRefresh,
    parameters: PrivacyBudgetTemplateParametersOutput,
  }),
).annotate({
  identifier: "PrivacyBudgetTemplate",
}) as any as S.Schema<PrivacyBudgetTemplate>;
export interface CreatePrivacyBudgetTemplateOutput {
  privacyBudgetTemplate: PrivacyBudgetTemplate;
}
export const CreatePrivacyBudgetTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ privacyBudgetTemplate: PrivacyBudgetTemplate }),
).annotate({
  identifier: "CreatePrivacyBudgetTemplateOutput",
}) as any as S.Schema<CreatePrivacyBudgetTemplateOutput>;
export interface DeleteAnalysisTemplateInput {
  membershipIdentifier: string;
  analysisTemplateIdentifier: string;
}
export const DeleteAnalysisTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    analysisTemplateIdentifier: S.String.pipe(
      T.HttpLabel("analysisTemplateIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/memberships/{membershipIdentifier}/analysistemplates/{analysisTemplateIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAnalysisTemplateInput",
}) as any as S.Schema<DeleteAnalysisTemplateInput>;
export interface DeleteAnalysisTemplateOutput {}
export const DeleteAnalysisTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAnalysisTemplateOutput",
}) as any as S.Schema<DeleteAnalysisTemplateOutput>;
export interface DeleteCollaborationInput {
  collaborationIdentifier: string;
}
export const DeleteCollaborationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    collaborationIdentifier: S.String.pipe(
      T.HttpLabel("collaborationIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/collaborations/{collaborationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCollaborationInput",
}) as any as S.Schema<DeleteCollaborationInput>;
export interface DeleteCollaborationOutput {}
export const DeleteCollaborationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCollaborationOutput",
}) as any as S.Schema<DeleteCollaborationOutput>;
export interface DeleteConfiguredAudienceModelAssociationInput {
  configuredAudienceModelAssociationIdentifier: string;
  membershipIdentifier: string;
}
export const DeleteConfiguredAudienceModelAssociationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      configuredAudienceModelAssociationIdentifier: S.String.pipe(
        T.HttpLabel("configuredAudienceModelAssociationIdentifier"),
      ),
      membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/memberships/{membershipIdentifier}/configuredaudiencemodelassociations/{configuredAudienceModelAssociationIdentifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteConfiguredAudienceModelAssociationInput",
  }) as any as S.Schema<DeleteConfiguredAudienceModelAssociationInput>;
export interface DeleteConfiguredAudienceModelAssociationOutput {}
export const DeleteConfiguredAudienceModelAssociationOutput =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteConfiguredAudienceModelAssociationOutput",
  }) as any as S.Schema<DeleteConfiguredAudienceModelAssociationOutput>;
export interface DeleteConfiguredTableInput {
  configuredTableIdentifier: string;
}
export const DeleteConfiguredTableInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuredTableIdentifier: S.String.pipe(
      T.HttpLabel("configuredTableIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/configuredTables/{configuredTableIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConfiguredTableInput",
}) as any as S.Schema<DeleteConfiguredTableInput>;
export interface DeleteConfiguredTableOutput {}
export const DeleteConfiguredTableOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteConfiguredTableOutput",
}) as any as S.Schema<DeleteConfiguredTableOutput>;
export interface DeleteConfiguredTableAnalysisRuleInput {
  configuredTableIdentifier: string;
  analysisRuleType: ConfiguredTableAnalysisRuleType;
}
export const DeleteConfiguredTableAnalysisRuleInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      configuredTableIdentifier: S.String.pipe(
        T.HttpLabel("configuredTableIdentifier"),
      ),
      analysisRuleType: ConfiguredTableAnalysisRuleType.pipe(
        T.HttpLabel("analysisRuleType"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/configuredTables/{configuredTableIdentifier}/analysisRule/{analysisRuleType}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteConfiguredTableAnalysisRuleInput",
}) as any as S.Schema<DeleteConfiguredTableAnalysisRuleInput>;
export interface DeleteConfiguredTableAnalysisRuleOutput {}
export const DeleteConfiguredTableAnalysisRuleOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteConfiguredTableAnalysisRuleOutput",
}) as any as S.Schema<DeleteConfiguredTableAnalysisRuleOutput>;
export interface DeleteConfiguredTableAssociationInput {
  configuredTableAssociationIdentifier: string;
  membershipIdentifier: string;
}
export const DeleteConfiguredTableAssociationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      configuredTableAssociationIdentifier: S.String.pipe(
        T.HttpLabel("configuredTableAssociationIdentifier"),
      ),
      membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/memberships/{membershipIdentifier}/configuredTableAssociations/{configuredTableAssociationIdentifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteConfiguredTableAssociationInput",
}) as any as S.Schema<DeleteConfiguredTableAssociationInput>;
export interface DeleteConfiguredTableAssociationOutput {}
export const DeleteConfiguredTableAssociationOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteConfiguredTableAssociationOutput",
}) as any as S.Schema<DeleteConfiguredTableAssociationOutput>;
export interface DeleteConfiguredTableAssociationAnalysisRuleInput {
  membershipIdentifier: string;
  configuredTableAssociationIdentifier: string;
  analysisRuleType: ConfiguredTableAssociationAnalysisRuleType;
}
export const DeleteConfiguredTableAssociationAnalysisRuleInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
      configuredTableAssociationIdentifier: S.String.pipe(
        T.HttpLabel("configuredTableAssociationIdentifier"),
      ),
      analysisRuleType: ConfiguredTableAssociationAnalysisRuleType.pipe(
        T.HttpLabel("analysisRuleType"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/memberships/{membershipIdentifier}/configuredTableAssociations/{configuredTableAssociationIdentifier}/analysisRule/{analysisRuleType}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteConfiguredTableAssociationAnalysisRuleInput",
  }) as any as S.Schema<DeleteConfiguredTableAssociationAnalysisRuleInput>;
export interface DeleteConfiguredTableAssociationAnalysisRuleOutput {}
export const DeleteConfiguredTableAssociationAnalysisRuleOutput =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteConfiguredTableAssociationAnalysisRuleOutput",
  }) as any as S.Schema<DeleteConfiguredTableAssociationAnalysisRuleOutput>;
export interface DeleteIdMappingTableInput {
  idMappingTableIdentifier: string;
  membershipIdentifier: string;
}
export const DeleteIdMappingTableInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    idMappingTableIdentifier: S.String.pipe(
      T.HttpLabel("idMappingTableIdentifier"),
    ),
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/memberships/{membershipIdentifier}/idmappingtables/{idMappingTableIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIdMappingTableInput",
}) as any as S.Schema<DeleteIdMappingTableInput>;
export interface DeleteIdMappingTableOutput {}
export const DeleteIdMappingTableOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteIdMappingTableOutput",
}) as any as S.Schema<DeleteIdMappingTableOutput>;
export interface DeleteIdNamespaceAssociationInput {
  idNamespaceAssociationIdentifier: string;
  membershipIdentifier: string;
}
export const DeleteIdNamespaceAssociationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    idNamespaceAssociationIdentifier: S.String.pipe(
      T.HttpLabel("idNamespaceAssociationIdentifier"),
    ),
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/memberships/{membershipIdentifier}/idnamespaceassociations/{idNamespaceAssociationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIdNamespaceAssociationInput",
}) as any as S.Schema<DeleteIdNamespaceAssociationInput>;
export interface DeleteIdNamespaceAssociationOutput {}
export const DeleteIdNamespaceAssociationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteIdNamespaceAssociationOutput",
}) as any as S.Schema<DeleteIdNamespaceAssociationOutput>;
export interface DeleteMemberInput {
  collaborationIdentifier: string;
  accountId: string;
}
export const DeleteMemberInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    collaborationIdentifier: S.String.pipe(
      T.HttpLabel("collaborationIdentifier"),
    ),
    accountId: S.String.pipe(T.HttpLabel("accountId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/collaborations/{collaborationIdentifier}/member/{accountId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMemberInput",
}) as any as S.Schema<DeleteMemberInput>;
export interface DeleteMemberOutput {}
export const DeleteMemberOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMemberOutput",
}) as any as S.Schema<DeleteMemberOutput>;
export interface DeleteMembershipInput {
  membershipIdentifier: string;
}
export const DeleteMembershipInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/memberships/{membershipIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMembershipInput",
}) as any as S.Schema<DeleteMembershipInput>;
export interface DeleteMembershipOutput {}
export const DeleteMembershipOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMembershipOutput",
}) as any as S.Schema<DeleteMembershipOutput>;
export interface DeletePrivacyBudgetTemplateInput {
  membershipIdentifier: string;
  privacyBudgetTemplateIdentifier: string;
}
export const DeletePrivacyBudgetTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    privacyBudgetTemplateIdentifier: S.String.pipe(
      T.HttpLabel("privacyBudgetTemplateIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/memberships/{membershipIdentifier}/privacybudgettemplates/{privacyBudgetTemplateIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePrivacyBudgetTemplateInput",
}) as any as S.Schema<DeletePrivacyBudgetTemplateInput>;
export interface DeletePrivacyBudgetTemplateOutput {}
export const DeletePrivacyBudgetTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePrivacyBudgetTemplateOutput",
}) as any as S.Schema<DeletePrivacyBudgetTemplateOutput>;
export interface GetAnalysisTemplateInput {
  membershipIdentifier: string;
  analysisTemplateIdentifier: string;
}
export const GetAnalysisTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    analysisTemplateIdentifier: S.String.pipe(
      T.HttpLabel("analysisTemplateIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/memberships/{membershipIdentifier}/analysistemplates/{analysisTemplateIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAnalysisTemplateInput",
}) as any as S.Schema<GetAnalysisTemplateInput>;
export interface GetAnalysisTemplateOutput {
  analysisTemplate: AnalysisTemplate;
}
export const GetAnalysisTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ analysisTemplate: AnalysisTemplate }),
).annotate({
  identifier: "GetAnalysisTemplateOutput",
}) as any as S.Schema<GetAnalysisTemplateOutput>;
export interface GetCollaborationInput {
  collaborationIdentifier: string;
}
export const GetCollaborationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    collaborationIdentifier: S.String.pipe(
      T.HttpLabel("collaborationIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/collaborations/{collaborationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCollaborationInput",
}) as any as S.Schema<GetCollaborationInput>;
export interface GetCollaborationOutput {
  collaboration: Collaboration;
}
export const GetCollaborationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ collaboration: Collaboration }),
).annotate({
  identifier: "GetCollaborationOutput",
}) as any as S.Schema<GetCollaborationOutput>;
export interface GetCollaborationAnalysisTemplateInput {
  collaborationIdentifier: string;
  analysisTemplateArn: string;
}
export const GetCollaborationAnalysisTemplateInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      collaborationIdentifier: S.String.pipe(
        T.HttpLabel("collaborationIdentifier"),
      ),
      analysisTemplateArn: S.String.pipe(T.HttpLabel("analysisTemplateArn")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/collaborations/{collaborationIdentifier}/analysistemplates/{analysisTemplateArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetCollaborationAnalysisTemplateInput",
}) as any as S.Schema<GetCollaborationAnalysisTemplateInput>;
export interface GetCollaborationAnalysisTemplateOutput {
  collaborationAnalysisTemplate: CollaborationAnalysisTemplate;
}
export const GetCollaborationAnalysisTemplateOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ collaborationAnalysisTemplate: CollaborationAnalysisTemplate }),
).annotate({
  identifier: "GetCollaborationAnalysisTemplateOutput",
}) as any as S.Schema<GetCollaborationAnalysisTemplateOutput>;
export type CollaborationChangeRequestIdentifier = string;
export interface GetCollaborationChangeRequestInput {
  collaborationIdentifier: string;
  changeRequestIdentifier: string;
}
export const GetCollaborationChangeRequestInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    collaborationIdentifier: S.String.pipe(
      T.HttpLabel("collaborationIdentifier"),
    ),
    changeRequestIdentifier: S.String.pipe(
      T.HttpLabel("changeRequestIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/collaborations/{collaborationIdentifier}/changeRequests/{changeRequestIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCollaborationChangeRequestInput",
}) as any as S.Schema<GetCollaborationChangeRequestInput>;
export interface GetCollaborationChangeRequestOutput {
  collaborationChangeRequest: CollaborationChangeRequest;
}
export const GetCollaborationChangeRequestOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ collaborationChangeRequest: CollaborationChangeRequest }),
).annotate({
  identifier: "GetCollaborationChangeRequestOutput",
}) as any as S.Schema<GetCollaborationChangeRequestOutput>;
export interface GetCollaborationConfiguredAudienceModelAssociationInput {
  collaborationIdentifier: string;
  configuredAudienceModelAssociationIdentifier: string;
}
export const GetCollaborationConfiguredAudienceModelAssociationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      collaborationIdentifier: S.String.pipe(
        T.HttpLabel("collaborationIdentifier"),
      ),
      configuredAudienceModelAssociationIdentifier: S.String.pipe(
        T.HttpLabel("configuredAudienceModelAssociationIdentifier"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/collaborations/{collaborationIdentifier}/configuredaudiencemodelassociations/{configuredAudienceModelAssociationIdentifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetCollaborationConfiguredAudienceModelAssociationInput",
  }) as any as S.Schema<GetCollaborationConfiguredAudienceModelAssociationInput>;
export interface CollaborationConfiguredAudienceModelAssociation {
  id: string;
  arn: string;
  collaborationId: string;
  collaborationArn: string;
  configuredAudienceModelArn: string;
  name: string;
  description?: string;
  creatorAccountId: string;
  createTime: Date;
  updateTime: Date;
}
export const CollaborationConfiguredAudienceModelAssociation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      id: S.String,
      arn: S.String,
      collaborationId: S.String,
      collaborationArn: S.String,
      configuredAudienceModelArn: S.String,
      name: S.String,
      description: S.optional(S.String),
      creatorAccountId: S.String,
      createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    }),
  ).annotate({
    identifier: "CollaborationConfiguredAudienceModelAssociation",
  }) as any as S.Schema<CollaborationConfiguredAudienceModelAssociation>;
export interface GetCollaborationConfiguredAudienceModelAssociationOutput {
  collaborationConfiguredAudienceModelAssociation: CollaborationConfiguredAudienceModelAssociation;
}
export const GetCollaborationConfiguredAudienceModelAssociationOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      collaborationConfiguredAudienceModelAssociation:
        CollaborationConfiguredAudienceModelAssociation,
    }),
  ).annotate({
    identifier: "GetCollaborationConfiguredAudienceModelAssociationOutput",
  }) as any as S.Schema<GetCollaborationConfiguredAudienceModelAssociationOutput>;
export interface GetCollaborationIdNamespaceAssociationInput {
  collaborationIdentifier: string;
  idNamespaceAssociationIdentifier: string;
}
export const GetCollaborationIdNamespaceAssociationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      collaborationIdentifier: S.String.pipe(
        T.HttpLabel("collaborationIdentifier"),
      ),
      idNamespaceAssociationIdentifier: S.String.pipe(
        T.HttpLabel("idNamespaceAssociationIdentifier"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/collaborations/{collaborationIdentifier}/idnamespaceassociations/{idNamespaceAssociationIdentifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetCollaborationIdNamespaceAssociationInput",
  }) as any as S.Schema<GetCollaborationIdNamespaceAssociationInput>;
export interface CollaborationIdNamespaceAssociation {
  id: string;
  arn: string;
  collaborationId: string;
  collaborationArn: string;
  name: string;
  description?: string;
  creatorAccountId: string;
  createTime: Date;
  updateTime: Date;
  inputReferenceConfig: IdNamespaceAssociationInputReferenceConfig;
  inputReferenceProperties: IdNamespaceAssociationInputReferenceProperties;
  idMappingConfig?: IdMappingConfig;
}
export const CollaborationIdNamespaceAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    collaborationId: S.String,
    collaborationArn: S.String,
    name: S.String,
    description: S.optional(S.String),
    creatorAccountId: S.String,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    inputReferenceConfig: IdNamespaceAssociationInputReferenceConfig,
    inputReferenceProperties: IdNamespaceAssociationInputReferenceProperties,
    idMappingConfig: S.optional(IdMappingConfig),
  }),
).annotate({
  identifier: "CollaborationIdNamespaceAssociation",
}) as any as S.Schema<CollaborationIdNamespaceAssociation>;
export interface GetCollaborationIdNamespaceAssociationOutput {
  collaborationIdNamespaceAssociation: CollaborationIdNamespaceAssociation;
}
export const GetCollaborationIdNamespaceAssociationOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      collaborationIdNamespaceAssociation: CollaborationIdNamespaceAssociation,
    }),
  ).annotate({
    identifier: "GetCollaborationIdNamespaceAssociationOutput",
  }) as any as S.Schema<GetCollaborationIdNamespaceAssociationOutput>;
export interface GetCollaborationPrivacyBudgetTemplateInput {
  collaborationIdentifier: string;
  privacyBudgetTemplateIdentifier: string;
}
export const GetCollaborationPrivacyBudgetTemplateInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      collaborationIdentifier: S.String.pipe(
        T.HttpLabel("collaborationIdentifier"),
      ),
      privacyBudgetTemplateIdentifier: S.String.pipe(
        T.HttpLabel("privacyBudgetTemplateIdentifier"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/collaborations/{collaborationIdentifier}/privacybudgettemplates/{privacyBudgetTemplateIdentifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetCollaborationPrivacyBudgetTemplateInput",
  }) as any as S.Schema<GetCollaborationPrivacyBudgetTemplateInput>;
export interface CollaborationPrivacyBudgetTemplate {
  id: string;
  arn: string;
  collaborationId: string;
  collaborationArn: string;
  creatorAccountId: string;
  createTime: Date;
  updateTime: Date;
  privacyBudgetType: PrivacyBudgetType;
  autoRefresh: PrivacyBudgetTemplateAutoRefresh;
  parameters: PrivacyBudgetTemplateParametersOutput;
}
export const CollaborationPrivacyBudgetTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    collaborationId: S.String,
    collaborationArn: S.String,
    creatorAccountId: S.String,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    privacyBudgetType: PrivacyBudgetType,
    autoRefresh: PrivacyBudgetTemplateAutoRefresh,
    parameters: PrivacyBudgetTemplateParametersOutput,
  }),
).annotate({
  identifier: "CollaborationPrivacyBudgetTemplate",
}) as any as S.Schema<CollaborationPrivacyBudgetTemplate>;
export interface GetCollaborationPrivacyBudgetTemplateOutput {
  collaborationPrivacyBudgetTemplate: CollaborationPrivacyBudgetTemplate;
}
export const GetCollaborationPrivacyBudgetTemplateOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      collaborationPrivacyBudgetTemplate: CollaborationPrivacyBudgetTemplate,
    }),
  ).annotate({
    identifier: "GetCollaborationPrivacyBudgetTemplateOutput",
  }) as any as S.Schema<GetCollaborationPrivacyBudgetTemplateOutput>;
export interface GetConfiguredAudienceModelAssociationInput {
  configuredAudienceModelAssociationIdentifier: string;
  membershipIdentifier: string;
}
export const GetConfiguredAudienceModelAssociationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      configuredAudienceModelAssociationIdentifier: S.String.pipe(
        T.HttpLabel("configuredAudienceModelAssociationIdentifier"),
      ),
      membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/memberships/{membershipIdentifier}/configuredaudiencemodelassociations/{configuredAudienceModelAssociationIdentifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetConfiguredAudienceModelAssociationInput",
  }) as any as S.Schema<GetConfiguredAudienceModelAssociationInput>;
export interface GetConfiguredAudienceModelAssociationOutput {
  configuredAudienceModelAssociation: ConfiguredAudienceModelAssociation;
}
export const GetConfiguredAudienceModelAssociationOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      configuredAudienceModelAssociation: ConfiguredAudienceModelAssociation,
    }),
  ).annotate({
    identifier: "GetConfiguredAudienceModelAssociationOutput",
  }) as any as S.Schema<GetConfiguredAudienceModelAssociationOutput>;
export interface GetConfiguredTableInput {
  configuredTableIdentifier: string;
}
export const GetConfiguredTableInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuredTableIdentifier: S.String.pipe(
      T.HttpLabel("configuredTableIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/configuredTables/{configuredTableIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConfiguredTableInput",
}) as any as S.Schema<GetConfiguredTableInput>;
export interface GetConfiguredTableOutput {
  configuredTable: ConfiguredTable;
}
export const GetConfiguredTableOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ configuredTable: ConfiguredTable }),
).annotate({
  identifier: "GetConfiguredTableOutput",
}) as any as S.Schema<GetConfiguredTableOutput>;
export interface GetConfiguredTableAnalysisRuleInput {
  configuredTableIdentifier: string;
  analysisRuleType: ConfiguredTableAnalysisRuleType;
}
export const GetConfiguredTableAnalysisRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuredTableIdentifier: S.String.pipe(
      T.HttpLabel("configuredTableIdentifier"),
    ),
    analysisRuleType: ConfiguredTableAnalysisRuleType.pipe(
      T.HttpLabel("analysisRuleType"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/configuredTables/{configuredTableIdentifier}/analysisRule/{analysisRuleType}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConfiguredTableAnalysisRuleInput",
}) as any as S.Schema<GetConfiguredTableAnalysisRuleInput>;
export interface GetConfiguredTableAnalysisRuleOutput {
  analysisRule: ConfiguredTableAnalysisRule;
}
export const GetConfiguredTableAnalysisRuleOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ analysisRule: ConfiguredTableAnalysisRule }),
).annotate({
  identifier: "GetConfiguredTableAnalysisRuleOutput",
}) as any as S.Schema<GetConfiguredTableAnalysisRuleOutput>;
export interface GetConfiguredTableAssociationInput {
  configuredTableAssociationIdentifier: string;
  membershipIdentifier: string;
}
export const GetConfiguredTableAssociationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuredTableAssociationIdentifier: S.String.pipe(
      T.HttpLabel("configuredTableAssociationIdentifier"),
    ),
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/memberships/{membershipIdentifier}/configuredTableAssociations/{configuredTableAssociationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConfiguredTableAssociationInput",
}) as any as S.Schema<GetConfiguredTableAssociationInput>;
export interface GetConfiguredTableAssociationOutput {
  configuredTableAssociation: ConfiguredTableAssociation;
}
export const GetConfiguredTableAssociationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ configuredTableAssociation: ConfiguredTableAssociation }),
).annotate({
  identifier: "GetConfiguredTableAssociationOutput",
}) as any as S.Schema<GetConfiguredTableAssociationOutput>;
export interface GetConfiguredTableAssociationAnalysisRuleInput {
  membershipIdentifier: string;
  configuredTableAssociationIdentifier: string;
  analysisRuleType: ConfiguredTableAssociationAnalysisRuleType;
}
export const GetConfiguredTableAssociationAnalysisRuleInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
      configuredTableAssociationIdentifier: S.String.pipe(
        T.HttpLabel("configuredTableAssociationIdentifier"),
      ),
      analysisRuleType: ConfiguredTableAssociationAnalysisRuleType.pipe(
        T.HttpLabel("analysisRuleType"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/memberships/{membershipIdentifier}/configuredTableAssociations/{configuredTableAssociationIdentifier}/analysisRule/{analysisRuleType}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetConfiguredTableAssociationAnalysisRuleInput",
  }) as any as S.Schema<GetConfiguredTableAssociationAnalysisRuleInput>;
export interface GetConfiguredTableAssociationAnalysisRuleOutput {
  analysisRule: ConfiguredTableAssociationAnalysisRule;
}
export const GetConfiguredTableAssociationAnalysisRuleOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ analysisRule: ConfiguredTableAssociationAnalysisRule }),
  ).annotate({
    identifier: "GetConfiguredTableAssociationAnalysisRuleOutput",
  }) as any as S.Schema<GetConfiguredTableAssociationAnalysisRuleOutput>;
export interface GetIdMappingTableInput {
  idMappingTableIdentifier: string;
  membershipIdentifier: string;
}
export const GetIdMappingTableInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    idMappingTableIdentifier: S.String.pipe(
      T.HttpLabel("idMappingTableIdentifier"),
    ),
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/memberships/{membershipIdentifier}/idmappingtables/{idMappingTableIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIdMappingTableInput",
}) as any as S.Schema<GetIdMappingTableInput>;
export interface GetIdMappingTableOutput {
  idMappingTable: IdMappingTable;
}
export const GetIdMappingTableOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ idMappingTable: IdMappingTable }),
).annotate({
  identifier: "GetIdMappingTableOutput",
}) as any as S.Schema<GetIdMappingTableOutput>;
export interface GetIdNamespaceAssociationInput {
  idNamespaceAssociationIdentifier: string;
  membershipIdentifier: string;
}
export const GetIdNamespaceAssociationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    idNamespaceAssociationIdentifier: S.String.pipe(
      T.HttpLabel("idNamespaceAssociationIdentifier"),
    ),
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/memberships/{membershipIdentifier}/idnamespaceassociations/{idNamespaceAssociationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIdNamespaceAssociationInput",
}) as any as S.Schema<GetIdNamespaceAssociationInput>;
export interface GetIdNamespaceAssociationOutput {
  idNamespaceAssociation: IdNamespaceAssociation;
}
export const GetIdNamespaceAssociationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ idNamespaceAssociation: IdNamespaceAssociation }),
).annotate({
  identifier: "GetIdNamespaceAssociationOutput",
}) as any as S.Schema<GetIdNamespaceAssociationOutput>;
export interface GetMembershipInput {
  membershipIdentifier: string;
}
export const GetMembershipInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/memberships/{membershipIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMembershipInput",
}) as any as S.Schema<GetMembershipInput>;
export interface GetMembershipOutput {
  membership: Membership;
}
export const GetMembershipOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ membership: Membership }),
).annotate({
  identifier: "GetMembershipOutput",
}) as any as S.Schema<GetMembershipOutput>;
export interface GetPrivacyBudgetTemplateInput {
  membershipIdentifier: string;
  privacyBudgetTemplateIdentifier: string;
}
export const GetPrivacyBudgetTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    privacyBudgetTemplateIdentifier: S.String.pipe(
      T.HttpLabel("privacyBudgetTemplateIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/memberships/{membershipIdentifier}/privacybudgettemplates/{privacyBudgetTemplateIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPrivacyBudgetTemplateInput",
}) as any as S.Schema<GetPrivacyBudgetTemplateInput>;
export interface GetPrivacyBudgetTemplateOutput {
  privacyBudgetTemplate: PrivacyBudgetTemplate;
}
export const GetPrivacyBudgetTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ privacyBudgetTemplate: PrivacyBudgetTemplate }),
).annotate({
  identifier: "GetPrivacyBudgetTemplateOutput",
}) as any as S.Schema<GetPrivacyBudgetTemplateOutput>;
export type ProtectedJobIdentifier = string;
export interface GetProtectedJobInput {
  membershipIdentifier: string;
  protectedJobIdentifier: string;
}
export const GetProtectedJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    protectedJobIdentifier: S.String.pipe(
      T.HttpLabel("protectedJobIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/memberships/{membershipIdentifier}/protectedJobs/{protectedJobIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetProtectedJobInput",
}) as any as S.Schema<GetProtectedJobInput>;
export type JobParameterName = string;
export type JobParameterValue = string;
export type JobParameterMap = { [key: string]: string | undefined };
export const JobParameterMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ProtectedJobParameters {
  analysisTemplateArn: string;
  parameters?: { [key: string]: string | undefined };
}
export const ProtectedJobParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    analysisTemplateArn: S.String,
    parameters: S.optional(JobParameterMap),
  }),
).annotate({
  identifier: "ProtectedJobParameters",
}) as any as S.Schema<ProtectedJobParameters>;
export type ProtectedJobStatus =
  | "SUBMITTED"
  | "STARTED"
  | "CANCELLED"
  | "CANCELLING"
  | "FAILED"
  | "SUCCESS"
  | (string & {});
export const ProtectedJobStatus = /*@__PURE__*/ S.String;

export interface ProtectedJobS3OutputConfigurationOutput {
  bucket: string;
  keyPrefix?: string;
}
export const ProtectedJobS3OutputConfigurationOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ bucket: S.String, keyPrefix: S.optional(S.String) }),
).annotate({
  identifier: "ProtectedJobS3OutputConfigurationOutput",
}) as any as S.Schema<ProtectedJobS3OutputConfigurationOutput>;
export interface ProtectedJobMemberOutputConfigurationOutput {
  accountId: string;
}
export const ProtectedJobMemberOutputConfigurationOutput =
  /*@__PURE__*/ S.suspend(() => S.Struct({ accountId: S.String })).annotate({
    identifier: "ProtectedJobMemberOutputConfigurationOutput",
  }) as any as S.Schema<ProtectedJobMemberOutputConfigurationOutput>;
export type ProtectedJobOutputConfigurationOutput =
  | { s3: ProtectedJobS3OutputConfigurationOutput; member?: never }
  | { s3?: never; member: ProtectedJobMemberOutputConfigurationOutput };
export const ProtectedJobOutputConfigurationOutput = /*@__PURE__*/ S.Union([
  S.Struct({ s3: ProtectedJobS3OutputConfigurationOutput }),
  S.Struct({ member: ProtectedJobMemberOutputConfigurationOutput }),
]);
export interface ProtectedJobResultConfigurationOutput {
  outputConfiguration: ProtectedJobOutputConfigurationOutput;
}
export const ProtectedJobResultConfigurationOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ outputConfiguration: ProtectedJobOutputConfigurationOutput }),
).annotate({
  identifier: "ProtectedJobResultConfigurationOutput",
}) as any as S.Schema<ProtectedJobResultConfigurationOutput>;
export interface BilledJobResourceUtilization {
  units: number;
}
export const BilledJobResourceUtilization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ units: S.Number }),
).annotate({
  identifier: "BilledJobResourceUtilization",
}) as any as S.Schema<BilledJobResourceUtilization>;
export interface ProtectedJobStatistics {
  totalDurationInMillis?: number;
  billedResourceUtilization?: BilledJobResourceUtilization;
}
export const ProtectedJobStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    totalDurationInMillis: S.optional(S.Number),
    billedResourceUtilization: S.optional(BilledJobResourceUtilization),
  }),
).annotate({
  identifier: "ProtectedJobStatistics",
}) as any as S.Schema<ProtectedJobStatistics>;
export interface ProtectedJobS3Output {
  location: string;
}
export const ProtectedJobS3Output = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ location: S.String }),
).annotate({
  identifier: "ProtectedJobS3Output",
}) as any as S.Schema<ProtectedJobS3Output>;
export interface ProtectedJobSingleMemberOutput {
  accountId: string;
}
export const ProtectedJobSingleMemberOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountId: S.String }),
).annotate({
  identifier: "ProtectedJobSingleMemberOutput",
}) as any as S.Schema<ProtectedJobSingleMemberOutput>;
export type ProtectedJobMemberOutputList = ProtectedJobSingleMemberOutput[];
export const ProtectedJobMemberOutputList = /*@__PURE__*/ S.Array(
  ProtectedJobSingleMemberOutput,
);
export type ProtectedJobOutput =
  | { s3: ProtectedJobS3Output; memberList?: never }
  | { s3?: never; memberList: ProtectedJobSingleMemberOutput[] };
export const ProtectedJobOutput = /*@__PURE__*/ S.Union([
  S.Struct({ s3: ProtectedJobS3Output }),
  S.Struct({ memberList: ProtectedJobMemberOutputList }),
]);
export interface ProtectedJobResult {
  output: ProtectedJobOutput;
}
export const ProtectedJobResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ output: ProtectedJobOutput }),
).annotate({
  identifier: "ProtectedJobResult",
}) as any as S.Schema<ProtectedJobResult>;
export interface ProtectedJobError {
  message: string;
  code: string;
}
export const ProtectedJobError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.String, code: S.String }),
).annotate({
  identifier: "ProtectedJobError",
}) as any as S.Schema<ProtectedJobError>;
export type ProtectedJobWorkerComputeType = "CR.1X" | "CR.4X" | (string & {});
export const ProtectedJobWorkerComputeType = /*@__PURE__*/ S.String;

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
export interface ProtectedJobWorkerComputeConfiguration {
  type: ProtectedJobWorkerComputeType;
  number: number;
  properties?: WorkerComputeConfigurationProperties;
}
export const ProtectedJobWorkerComputeConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      type: ProtectedJobWorkerComputeType,
      number: S.Number,
      properties: S.optional(WorkerComputeConfigurationProperties),
    }),
).annotate({
  identifier: "ProtectedJobWorkerComputeConfiguration",
}) as any as S.Schema<ProtectedJobWorkerComputeConfiguration>;
export type ProtectedJobComputeConfiguration = {
  worker: ProtectedJobWorkerComputeConfiguration;
};
export const ProtectedJobComputeConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ worker: ProtectedJobWorkerComputeConfiguration }),
]);
export interface ProtectedJob {
  id: string;
  membershipId: string;
  membershipArn: string;
  createTime: Date;
  jobParameters?: ProtectedJobParameters;
  status: ProtectedJobStatus;
  resultConfiguration?: ProtectedJobResultConfigurationOutput;
  statistics?: ProtectedJobStatistics;
  result?: ProtectedJobResult;
  error?: ProtectedJobError;
  computeConfiguration?: ProtectedJobComputeConfiguration;
  jobComputePayerAccountId?: string;
}
export const ProtectedJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    membershipId: S.String,
    membershipArn: S.String,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    jobParameters: S.optional(ProtectedJobParameters),
    status: ProtectedJobStatus,
    resultConfiguration: S.optional(ProtectedJobResultConfigurationOutput),
    statistics: S.optional(ProtectedJobStatistics),
    result: S.optional(ProtectedJobResult),
    error: S.optional(ProtectedJobError),
    computeConfiguration: S.optional(ProtectedJobComputeConfiguration),
    jobComputePayerAccountId: S.optional(S.String),
  }),
).annotate({ identifier: "ProtectedJob" }) as any as S.Schema<ProtectedJob>;
export interface GetProtectedJobOutput {
  protectedJob: ProtectedJob;
}
export const GetProtectedJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ protectedJob: ProtectedJob }),
).annotate({
  identifier: "GetProtectedJobOutput",
}) as any as S.Schema<GetProtectedJobOutput>;
export type ProtectedQueryIdentifier = string;
export interface GetProtectedQueryInput {
  membershipIdentifier: string;
  protectedQueryIdentifier: string;
}
export const GetProtectedQueryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    protectedQueryIdentifier: S.String.pipe(
      T.HttpLabel("protectedQueryIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/memberships/{membershipIdentifier}/protectedQueries/{protectedQueryIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetProtectedQueryInput",
}) as any as S.Schema<GetProtectedQueryInput>;
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
export type ProtectedQueryStatus = string;
export interface ProtectedQueryMemberOutputConfiguration {
  accountId: string;
}
export const ProtectedQueryMemberOutputConfiguration = /*@__PURE__*/ S.suspend(
  () => S.Struct({ accountId: S.String }),
).annotate({
  identifier: "ProtectedQueryMemberOutputConfiguration",
}) as any as S.Schema<ProtectedQueryMemberOutputConfiguration>;
export type ProtectedQueryDistributeOutputConfigurationLocation =
  | { s3: ProtectedQueryS3OutputConfiguration; member?: never }
  | { s3?: never; member: ProtectedQueryMemberOutputConfiguration };
export const ProtectedQueryDistributeOutputConfigurationLocation =
  /*@__PURE__*/ S.Union([
    S.Struct({ s3: ProtectedQueryS3OutputConfiguration }),
    S.Struct({ member: ProtectedQueryMemberOutputConfiguration }),
  ]);
export type ProtectedQueryDistributeOutputConfigurationLocations =
  ProtectedQueryDistributeOutputConfigurationLocation[];
export const ProtectedQueryDistributeOutputConfigurationLocations =
  /*@__PURE__*/ S.Array(ProtectedQueryDistributeOutputConfigurationLocation);
export interface ProtectedQueryDistributeOutputConfiguration {
  locations: ProtectedQueryDistributeOutputConfigurationLocation[];
}
export const ProtectedQueryDistributeOutputConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      locations: ProtectedQueryDistributeOutputConfigurationLocations,
    }),
  ).annotate({
    identifier: "ProtectedQueryDistributeOutputConfiguration",
  }) as any as S.Schema<ProtectedQueryDistributeOutputConfiguration>;
export type ProtectedQueryOutputConfiguration =
  | {
      s3: ProtectedQueryS3OutputConfiguration;
      member?: never;
      distribute?: never;
    }
  | {
      s3?: never;
      member: ProtectedQueryMemberOutputConfiguration;
      distribute?: never;
    }
  | {
      s3?: never;
      member?: never;
      distribute: ProtectedQueryDistributeOutputConfiguration;
    };
export const ProtectedQueryOutputConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ s3: ProtectedQueryS3OutputConfiguration }),
  S.Struct({ member: ProtectedQueryMemberOutputConfiguration }),
  S.Struct({ distribute: ProtectedQueryDistributeOutputConfiguration }),
]);
export interface ProtectedQueryResultConfiguration {
  outputConfiguration: ProtectedQueryOutputConfiguration;
}
export const ProtectedQueryResultConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ outputConfiguration: ProtectedQueryOutputConfiguration }),
).annotate({
  identifier: "ProtectedQueryResultConfiguration",
}) as any as S.Schema<ProtectedQueryResultConfiguration>;
export interface BilledResourceUtilization {
  units: number;
}
export const BilledResourceUtilization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ units: S.Number }),
).annotate({
  identifier: "BilledResourceUtilization",
}) as any as S.Schema<BilledResourceUtilization>;
export interface ProtectedQueryStatistics {
  totalDurationInMillis?: number;
  billedResourceUtilization?: BilledResourceUtilization;
}
export const ProtectedQueryStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    totalDurationInMillis: S.optional(S.Number),
    billedResourceUtilization: S.optional(BilledResourceUtilization),
  }),
).annotate({
  identifier: "ProtectedQueryStatistics",
}) as any as S.Schema<ProtectedQueryStatistics>;
export interface ProtectedQueryS3Output {
  location: string;
}
export const ProtectedQueryS3Output = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ location: S.String }),
).annotate({
  identifier: "ProtectedQueryS3Output",
}) as any as S.Schema<ProtectedQueryS3Output>;
export interface ProtectedQuerySingleMemberOutput {
  accountId: string;
}
export const ProtectedQuerySingleMemberOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountId: S.String }),
).annotate({
  identifier: "ProtectedQuerySingleMemberOutput",
}) as any as S.Schema<ProtectedQuerySingleMemberOutput>;
export type ProtectedQueryMemberOutputList = ProtectedQuerySingleMemberOutput[];
export const ProtectedQueryMemberOutputList = /*@__PURE__*/ S.Array(
  ProtectedQuerySingleMemberOutput,
);
export interface ProtectedQueryDistributeOutput {
  s3?: ProtectedQueryS3Output;
  memberList?: ProtectedQuerySingleMemberOutput[];
}
export const ProtectedQueryDistributeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3: S.optional(ProtectedQueryS3Output),
    memberList: S.optional(ProtectedQueryMemberOutputList),
  }),
).annotate({
  identifier: "ProtectedQueryDistributeOutput",
}) as any as S.Schema<ProtectedQueryDistributeOutput>;
export type ProtectedQueryOutput =
  | { s3: ProtectedQueryS3Output; memberList?: never; distribute?: never }
  | {
      s3?: never;
      memberList: ProtectedQuerySingleMemberOutput[];
      distribute?: never;
    }
  | {
      s3?: never;
      memberList?: never;
      distribute: ProtectedQueryDistributeOutput;
    };
export const ProtectedQueryOutput = /*@__PURE__*/ S.Union([
  S.Struct({ s3: ProtectedQueryS3Output }),
  S.Struct({ memberList: ProtectedQueryMemberOutputList }),
  S.Struct({ distribute: ProtectedQueryDistributeOutput }),
]);
export interface ProtectedQueryResult {
  output: ProtectedQueryOutput;
}
export const ProtectedQueryResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ output: ProtectedQueryOutput }),
).annotate({
  identifier: "ProtectedQueryResult",
}) as any as S.Schema<ProtectedQueryResult>;
export interface ProtectedQueryError {
  message: string;
  code: string;
}
export const ProtectedQueryError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.String, code: S.String }),
).annotate({
  identifier: "ProtectedQueryError",
}) as any as S.Schema<ProtectedQueryError>;
export type DifferentialPrivacyAggregationType =
  | "AVG"
  | "COUNT"
  | "COUNT_DISTINCT"
  | "SUM"
  | "STDDEV"
  | (string & {});
export const DifferentialPrivacyAggregationType = /*@__PURE__*/ S.String;

export type DifferentialPrivacyAggregationExpression = string;
export interface DifferentialPrivacySensitivityParameters {
  aggregationType: DifferentialPrivacyAggregationType;
  aggregationExpression: string;
  userContributionLimit: number;
  minColumnValue?: number;
  maxColumnValue?: number;
}
export const DifferentialPrivacySensitivityParameters = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      aggregationType: DifferentialPrivacyAggregationType,
      aggregationExpression: S.String,
      userContributionLimit: S.Number,
      minColumnValue: S.optional(S.Number),
      maxColumnValue: S.optional(S.Number),
    }),
).annotate({
  identifier: "DifferentialPrivacySensitivityParameters",
}) as any as S.Schema<DifferentialPrivacySensitivityParameters>;
export type DifferentialPrivacySensitivityParametersList =
  DifferentialPrivacySensitivityParameters[];
export const DifferentialPrivacySensitivityParametersList =
  /*@__PURE__*/ S.Array(DifferentialPrivacySensitivityParameters);
export interface DifferentialPrivacyParameters {
  sensitivityParameters: DifferentialPrivacySensitivityParameters[];
}
export const DifferentialPrivacyParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sensitivityParameters: DifferentialPrivacySensitivityParametersList,
  }),
).annotate({
  identifier: "DifferentialPrivacyParameters",
}) as any as S.Schema<DifferentialPrivacyParameters>;
export type WorkerComputeType = "CR.1X" | "CR.4X" | (string & {});
export const WorkerComputeType = /*@__PURE__*/ S.String;

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
export interface ProtectedQuery {
  id: string;
  membershipId: string;
  membershipArn: string;
  createTime: Date;
  sqlParameters?: ProtectedQuerySQLParameters;
  status: string;
  resultConfiguration?: ProtectedQueryResultConfiguration;
  statistics?: ProtectedQueryStatistics;
  result?: ProtectedQueryResult;
  error?: ProtectedQueryError;
  differentialPrivacy?: DifferentialPrivacyParameters;
  computeConfiguration?: ComputeConfiguration;
  queryComputePayerAccountId?: string;
}
export const ProtectedQuery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    membershipId: S.String,
    membershipArn: S.String,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    sqlParameters: S.optional(ProtectedQuerySQLParameters),
    status: S.String,
    resultConfiguration: S.optional(ProtectedQueryResultConfiguration),
    statistics: S.optional(ProtectedQueryStatistics),
    result: S.optional(ProtectedQueryResult),
    error: S.optional(ProtectedQueryError),
    differentialPrivacy: S.optional(DifferentialPrivacyParameters),
    computeConfiguration: S.optional(ComputeConfiguration),
    queryComputePayerAccountId: S.optional(S.String),
  }),
).annotate({ identifier: "ProtectedQuery" }) as any as S.Schema<ProtectedQuery>;
export interface GetProtectedQueryOutput {
  protectedQuery: ProtectedQuery;
}
export const GetProtectedQueryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ protectedQuery: ProtectedQuery }),
).annotate({
  identifier: "GetProtectedQueryOutput",
}) as any as S.Schema<GetProtectedQueryOutput>;
export interface GetSchemaInput {
  collaborationIdentifier: string;
  name: string;
}
export const GetSchemaInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    collaborationIdentifier: S.String.pipe(
      T.HttpLabel("collaborationIdentifier"),
    ),
    name: S.String.pipe(T.HttpLabel("name")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/collaborations/{collaborationIdentifier}/schemas/{name}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetSchemaInput" }) as any as S.Schema<GetSchemaInput>;
export interface GetSchemaOutput {
  schema: Schema;
}
export const GetSchemaOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ schema: Schema }),
).annotate({
  identifier: "GetSchemaOutput",
}) as any as S.Schema<GetSchemaOutput>;
export interface GetSchemaAnalysisRuleInput {
  collaborationIdentifier: string;
  name: string;
  type: AnalysisRuleType;
}
export const GetSchemaAnalysisRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    collaborationIdentifier: S.String.pipe(
      T.HttpLabel("collaborationIdentifier"),
    ),
    name: S.String.pipe(T.HttpLabel("name")),
    type: AnalysisRuleType.pipe(T.HttpLabel("type")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/collaborations/{collaborationIdentifier}/schemas/{name}/analysisRule/{type}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSchemaAnalysisRuleInput",
}) as any as S.Schema<GetSchemaAnalysisRuleInput>;
export interface GetSchemaAnalysisRuleOutput {
  analysisRule: AnalysisRule;
}
export const GetSchemaAnalysisRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ analysisRule: AnalysisRule }),
).annotate({
  identifier: "GetSchemaAnalysisRuleOutput",
}) as any as S.Schema<GetSchemaAnalysisRuleOutput>;
export type PaginationToken = string;
export type MaxResults = number;
export interface ListAnalysisTemplatesInput {
  membershipIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListAnalysisTemplatesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/memberships/{membershipIdentifier}/analysistemplates",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAnalysisTemplatesInput",
}) as any as S.Schema<ListAnalysisTemplatesInput>;
export interface AnalysisTemplateSummary {
  arn: string;
  createTime: Date;
  id: string;
  name: string;
  updateTime: Date;
  membershipArn: string;
  membershipId: string;
  collaborationArn: string;
  collaborationId: string;
  description?: string;
  isSyntheticData?: boolean;
}
export const AnalysisTemplateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    id: S.String,
    name: S.String,
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    membershipArn: S.String,
    membershipId: S.String,
    collaborationArn: S.String,
    collaborationId: S.String,
    description: S.optional(S.String),
    isSyntheticData: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AnalysisTemplateSummary",
}) as any as S.Schema<AnalysisTemplateSummary>;
export type AnalysisTemplateSummaryList = AnalysisTemplateSummary[];
export const AnalysisTemplateSummaryList = /*@__PURE__*/ S.Array(
  AnalysisTemplateSummary,
);
export interface ListAnalysisTemplatesOutput {
  nextToken?: string;
  analysisTemplateSummaries: AnalysisTemplateSummary[];
}
export const ListAnalysisTemplatesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    analysisTemplateSummaries: AnalysisTemplateSummaryList,
  }),
).annotate({
  identifier: "ListAnalysisTemplatesOutput",
}) as any as S.Schema<ListAnalysisTemplatesOutput>;
export interface ListCollaborationAnalysisTemplatesInput {
  collaborationIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListCollaborationAnalysisTemplatesInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      collaborationIdentifier: S.String.pipe(
        T.HttpLabel("collaborationIdentifier"),
      ),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/collaborations/{collaborationIdentifier}/analysistemplates",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListCollaborationAnalysisTemplatesInput",
}) as any as S.Schema<ListCollaborationAnalysisTemplatesInput>;
export interface CollaborationAnalysisTemplateSummary {
  arn: string;
  createTime: Date;
  id: string;
  name: string;
  updateTime: Date;
  collaborationArn: string;
  collaborationId: string;
  creatorAccountId: string;
  description?: string;
  isSyntheticData?: boolean;
}
export const CollaborationAnalysisTemplateSummary = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      arn: S.String,
      createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      id: S.String,
      name: S.String,
      updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      collaborationArn: S.String,
      collaborationId: S.String,
      creatorAccountId: S.String,
      description: S.optional(S.String),
      isSyntheticData: S.optional(S.Boolean),
    }),
).annotate({
  identifier: "CollaborationAnalysisTemplateSummary",
}) as any as S.Schema<CollaborationAnalysisTemplateSummary>;
export type CollaborationAnalysisTemplateSummaryList =
  CollaborationAnalysisTemplateSummary[];
export const CollaborationAnalysisTemplateSummaryList = /*@__PURE__*/ S.Array(
  CollaborationAnalysisTemplateSummary,
);
export interface ListCollaborationAnalysisTemplatesOutput {
  nextToken?: string;
  collaborationAnalysisTemplateSummaries: CollaborationAnalysisTemplateSummary[];
}
export const ListCollaborationAnalysisTemplatesOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      collaborationAnalysisTemplateSummaries:
        CollaborationAnalysisTemplateSummaryList,
    }),
).annotate({
  identifier: "ListCollaborationAnalysisTemplatesOutput",
}) as any as S.Schema<ListCollaborationAnalysisTemplatesOutput>;
export interface ListCollaborationChangeRequestsInput {
  collaborationIdentifier: string;
  status?: ChangeRequestStatus;
  nextToken?: string;
  maxResults?: number;
}
export const ListCollaborationChangeRequestsInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      collaborationIdentifier: S.String.pipe(
        T.HttpLabel("collaborationIdentifier"),
      ),
      status: S.optional(ChangeRequestStatus).pipe(T.HttpQuery("status")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/collaborations/{collaborationIdentifier}/changeRequests",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListCollaborationChangeRequestsInput",
}) as any as S.Schema<ListCollaborationChangeRequestsInput>;
export interface CollaborationChangeRequestSummary {
  id: string;
  collaborationId: string;
  createTime: Date;
  updateTime: Date;
  status: ChangeRequestStatus;
  isAutoApproved: boolean;
  changes: Change[];
  approvals?: { [key: string]: ApprovalStatusDetails | undefined };
}
export const CollaborationChangeRequestSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    collaborationId: S.String,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: ChangeRequestStatus,
    isAutoApproved: S.Boolean,
    changes: ChangeList,
    approvals: S.optional(ApprovalStatuses),
  }),
).annotate({
  identifier: "CollaborationChangeRequestSummary",
}) as any as S.Schema<CollaborationChangeRequestSummary>;
export type CollaborationChangeRequestSummaryList =
  CollaborationChangeRequestSummary[];
export const CollaborationChangeRequestSummaryList = /*@__PURE__*/ S.Array(
  CollaborationChangeRequestSummary,
);
export interface ListCollaborationChangeRequestsOutput {
  collaborationChangeRequestSummaries: CollaborationChangeRequestSummary[];
  nextToken?: string;
}
export const ListCollaborationChangeRequestsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      collaborationChangeRequestSummaries:
        CollaborationChangeRequestSummaryList,
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListCollaborationChangeRequestsOutput",
}) as any as S.Schema<ListCollaborationChangeRequestsOutput>;
export interface ListCollaborationConfiguredAudienceModelAssociationsInput {
  collaborationIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListCollaborationConfiguredAudienceModelAssociationsInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      collaborationIdentifier: S.String.pipe(
        T.HttpLabel("collaborationIdentifier"),
      ),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/collaborations/{collaborationIdentifier}/configuredaudiencemodelassociations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListCollaborationConfiguredAudienceModelAssociationsInput",
  }) as any as S.Schema<ListCollaborationConfiguredAudienceModelAssociationsInput>;
export interface CollaborationConfiguredAudienceModelAssociationSummary {
  arn: string;
  createTime: Date;
  id: string;
  name: string;
  updateTime: Date;
  collaborationArn: string;
  collaborationId: string;
  creatorAccountId: string;
  description?: string;
}
export const CollaborationConfiguredAudienceModelAssociationSummary =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      arn: S.String,
      createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      id: S.String,
      name: S.String,
      updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      collaborationArn: S.String,
      collaborationId: S.String,
      creatorAccountId: S.String,
      description: S.optional(S.String),
    }),
  ).annotate({
    identifier: "CollaborationConfiguredAudienceModelAssociationSummary",
  }) as any as S.Schema<CollaborationConfiguredAudienceModelAssociationSummary>;
export type CollaborationConfiguredAudienceModelAssociationSummaryList =
  CollaborationConfiguredAudienceModelAssociationSummary[];
export const CollaborationConfiguredAudienceModelAssociationSummaryList =
  /*@__PURE__*/ S.Array(CollaborationConfiguredAudienceModelAssociationSummary);
export interface ListCollaborationConfiguredAudienceModelAssociationsOutput {
  collaborationConfiguredAudienceModelAssociationSummaries: CollaborationConfiguredAudienceModelAssociationSummary[];
  nextToken?: string;
}
export const ListCollaborationConfiguredAudienceModelAssociationsOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      collaborationConfiguredAudienceModelAssociationSummaries:
        CollaborationConfiguredAudienceModelAssociationSummaryList,
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListCollaborationConfiguredAudienceModelAssociationsOutput",
  }) as any as S.Schema<ListCollaborationConfiguredAudienceModelAssociationsOutput>;
export interface ListCollaborationIdNamespaceAssociationsInput {
  collaborationIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListCollaborationIdNamespaceAssociationsInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      collaborationIdentifier: S.String.pipe(
        T.HttpLabel("collaborationIdentifier"),
      ),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/collaborations/{collaborationIdentifier}/idnamespaceassociations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListCollaborationIdNamespaceAssociationsInput",
  }) as any as S.Schema<ListCollaborationIdNamespaceAssociationsInput>;
export interface IdNamespaceAssociationInputReferencePropertiesSummary {
  idNamespaceType: IdNamespaceType;
}
export const IdNamespaceAssociationInputReferencePropertiesSummary =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ idNamespaceType: IdNamespaceType }),
  ).annotate({
    identifier: "IdNamespaceAssociationInputReferencePropertiesSummary",
  }) as any as S.Schema<IdNamespaceAssociationInputReferencePropertiesSummary>;
export interface CollaborationIdNamespaceAssociationSummary {
  arn: string;
  createTime: Date;
  id: string;
  updateTime: Date;
  collaborationArn: string;
  collaborationId: string;
  creatorAccountId: string;
  inputReferenceConfig: IdNamespaceAssociationInputReferenceConfig;
  name: string;
  description?: string;
  inputReferenceProperties: IdNamespaceAssociationInputReferencePropertiesSummary;
}
export const CollaborationIdNamespaceAssociationSummary =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      arn: S.String,
      createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      id: S.String,
      updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      collaborationArn: S.String,
      collaborationId: S.String,
      creatorAccountId: S.String,
      inputReferenceConfig: IdNamespaceAssociationInputReferenceConfig,
      name: S.String,
      description: S.optional(S.String),
      inputReferenceProperties:
        IdNamespaceAssociationInputReferencePropertiesSummary,
    }),
  ).annotate({
    identifier: "CollaborationIdNamespaceAssociationSummary",
  }) as any as S.Schema<CollaborationIdNamespaceAssociationSummary>;
export type CollaborationIdNamespaceAssociationSummaryList =
  CollaborationIdNamespaceAssociationSummary[];
export const CollaborationIdNamespaceAssociationSummaryList =
  /*@__PURE__*/ S.Array(CollaborationIdNamespaceAssociationSummary);
export interface ListCollaborationIdNamespaceAssociationsOutput {
  nextToken?: string;
  collaborationIdNamespaceAssociationSummaries: CollaborationIdNamespaceAssociationSummary[];
}
export const ListCollaborationIdNamespaceAssociationsOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      nextToken: S.optional(S.String),
      collaborationIdNamespaceAssociationSummaries:
        CollaborationIdNamespaceAssociationSummaryList,
    }),
  ).annotate({
    identifier: "ListCollaborationIdNamespaceAssociationsOutput",
  }) as any as S.Schema<ListCollaborationIdNamespaceAssociationsOutput>;
export interface ListCollaborationPrivacyBudgetsInput {
  collaborationIdentifier: string;
  privacyBudgetType: PrivacyBudgetType;
  maxResults?: number;
  nextToken?: string;
  accessBudgetResourceArn?: string;
}
export const ListCollaborationPrivacyBudgetsInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      collaborationIdentifier: S.String.pipe(
        T.HttpLabel("collaborationIdentifier"),
      ),
      privacyBudgetType: PrivacyBudgetType.pipe(
        T.HttpQuery("privacyBudgetType"),
      ),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      accessBudgetResourceArn: S.optional(S.String).pipe(
        T.HttpQuery("accessBudgetResourceArn"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/collaborations/{collaborationIdentifier}/privacybudgets",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListCollaborationPrivacyBudgetsInput",
}) as any as S.Schema<ListCollaborationPrivacyBudgetsInput>;
export interface DifferentialPrivacyPrivacyBudgetAggregation {
  type: DifferentialPrivacyAggregationType;
  maxCount: number;
  remainingCount: number;
}
export const DifferentialPrivacyPrivacyBudgetAggregation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      type: DifferentialPrivacyAggregationType,
      maxCount: S.Number,
      remainingCount: S.Number,
    }),
  ).annotate({
    identifier: "DifferentialPrivacyPrivacyBudgetAggregation",
  }) as any as S.Schema<DifferentialPrivacyPrivacyBudgetAggregation>;
export type DifferentialPrivacyPrivacyBudgetAggregationList =
  DifferentialPrivacyPrivacyBudgetAggregation[];
export const DifferentialPrivacyPrivacyBudgetAggregationList =
  /*@__PURE__*/ S.Array(DifferentialPrivacyPrivacyBudgetAggregation);
export interface DifferentialPrivacyPrivacyBudget {
  aggregations: DifferentialPrivacyPrivacyBudgetAggregation[];
  epsilon: number;
}
export const DifferentialPrivacyPrivacyBudget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    aggregations: DifferentialPrivacyPrivacyBudgetAggregationList,
    epsilon: S.Number,
  }),
).annotate({
  identifier: "DifferentialPrivacyPrivacyBudget",
}) as any as S.Schema<DifferentialPrivacyPrivacyBudget>;
export type RemainingBudget = number;
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
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
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
export type PrivacyBudget =
  | {
      differentialPrivacy: DifferentialPrivacyPrivacyBudget;
      accessBudget?: never;
    }
  | { differentialPrivacy?: never; accessBudget: AccessBudget };
export const PrivacyBudget = /*@__PURE__*/ S.Union([
  S.Struct({ differentialPrivacy: DifferentialPrivacyPrivacyBudget }),
  S.Struct({ accessBudget: AccessBudget }),
]);
export interface CollaborationPrivacyBudgetSummary {
  id: string;
  privacyBudgetTemplateId: string;
  privacyBudgetTemplateArn: string;
  collaborationId: string;
  collaborationArn: string;
  creatorAccountId: string;
  type: PrivacyBudgetType;
  createTime: Date;
  updateTime: Date;
  budget: PrivacyBudget;
}
export const CollaborationPrivacyBudgetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    privacyBudgetTemplateId: S.String,
    privacyBudgetTemplateArn: S.String,
    collaborationId: S.String,
    collaborationArn: S.String,
    creatorAccountId: S.String,
    type: PrivacyBudgetType,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    budget: PrivacyBudget,
  }),
).annotate({
  identifier: "CollaborationPrivacyBudgetSummary",
}) as any as S.Schema<CollaborationPrivacyBudgetSummary>;
export type CollaborationPrivacyBudgetSummaryList =
  CollaborationPrivacyBudgetSummary[];
export const CollaborationPrivacyBudgetSummaryList = /*@__PURE__*/ S.Array(
  CollaborationPrivacyBudgetSummary,
);
export interface ListCollaborationPrivacyBudgetsOutput {
  collaborationPrivacyBudgetSummaries: CollaborationPrivacyBudgetSummary[];
  nextToken?: string;
}
export const ListCollaborationPrivacyBudgetsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      collaborationPrivacyBudgetSummaries:
        CollaborationPrivacyBudgetSummaryList,
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListCollaborationPrivacyBudgetsOutput",
}) as any as S.Schema<ListCollaborationPrivacyBudgetsOutput>;
export interface ListCollaborationPrivacyBudgetTemplatesInput {
  collaborationIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListCollaborationPrivacyBudgetTemplatesInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      collaborationIdentifier: S.String.pipe(
        T.HttpLabel("collaborationIdentifier"),
      ),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/collaborations/{collaborationIdentifier}/privacybudgettemplates",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListCollaborationPrivacyBudgetTemplatesInput",
  }) as any as S.Schema<ListCollaborationPrivacyBudgetTemplatesInput>;
export interface CollaborationPrivacyBudgetTemplateSummary {
  id: string;
  arn: string;
  collaborationId: string;
  collaborationArn: string;
  creatorAccountId: string;
  privacyBudgetType: PrivacyBudgetType;
  createTime: Date;
  updateTime: Date;
}
export const CollaborationPrivacyBudgetTemplateSummary =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      id: S.String,
      arn: S.String,
      collaborationId: S.String,
      collaborationArn: S.String,
      creatorAccountId: S.String,
      privacyBudgetType: PrivacyBudgetType,
      createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    }),
  ).annotate({
    identifier: "CollaborationPrivacyBudgetTemplateSummary",
  }) as any as S.Schema<CollaborationPrivacyBudgetTemplateSummary>;
export type CollaborationPrivacyBudgetTemplateSummaryList =
  CollaborationPrivacyBudgetTemplateSummary[];
export const CollaborationPrivacyBudgetTemplateSummaryList =
  /*@__PURE__*/ S.Array(CollaborationPrivacyBudgetTemplateSummary);
export interface ListCollaborationPrivacyBudgetTemplatesOutput {
  nextToken?: string;
  collaborationPrivacyBudgetTemplateSummaries: CollaborationPrivacyBudgetTemplateSummary[];
}
export const ListCollaborationPrivacyBudgetTemplatesOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      nextToken: S.optional(S.String),
      collaborationPrivacyBudgetTemplateSummaries:
        CollaborationPrivacyBudgetTemplateSummaryList,
    }),
  ).annotate({
    identifier: "ListCollaborationPrivacyBudgetTemplatesOutput",
  }) as any as S.Schema<ListCollaborationPrivacyBudgetTemplatesOutput>;
export type FilterableMemberStatus = string;
export interface ListCollaborationsInput {
  nextToken?: string;
  maxResults?: number;
  memberStatus?: string;
}
export const ListCollaborationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    memberStatus: S.optional(S.String).pipe(T.HttpQuery("memberStatus")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/collaborations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCollaborationsInput",
}) as any as S.Schema<ListCollaborationsInput>;
export interface CollaborationSummary {
  id: string;
  arn: string;
  name: string;
  creatorAccountId: string;
  creatorDisplayName: string;
  createTime: Date;
  updateTime: Date;
  memberStatus: string;
  membershipId?: string;
  membershipArn?: string;
  analyticsEngine?: AnalyticsEngine;
}
export const CollaborationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    name: S.String,
    creatorAccountId: S.String,
    creatorDisplayName: S.String,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    memberStatus: S.String,
    membershipId: S.optional(S.String),
    membershipArn: S.optional(S.String),
    analyticsEngine: S.optional(AnalyticsEngine),
  }),
).annotate({
  identifier: "CollaborationSummary",
}) as any as S.Schema<CollaborationSummary>;
export type CollaborationSummaryList = CollaborationSummary[];
export const CollaborationSummaryList =
  /*@__PURE__*/ S.Array(CollaborationSummary);
export interface ListCollaborationsOutput {
  nextToken?: string;
  collaborationList: CollaborationSummary[];
}
export const ListCollaborationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    collaborationList: CollaborationSummaryList,
  }),
).annotate({
  identifier: "ListCollaborationsOutput",
}) as any as S.Schema<ListCollaborationsOutput>;
export interface ListConfiguredAudienceModelAssociationsInput {
  membershipIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListConfiguredAudienceModelAssociationsInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/memberships/{membershipIdentifier}/configuredaudiencemodelassociations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListConfiguredAudienceModelAssociationsInput",
  }) as any as S.Schema<ListConfiguredAudienceModelAssociationsInput>;
export interface ConfiguredAudienceModelAssociationSummary {
  membershipId: string;
  membershipArn: string;
  collaborationArn: string;
  collaborationId: string;
  createTime: Date;
  updateTime: Date;
  id: string;
  arn: string;
  name: string;
  configuredAudienceModelArn: string;
  description?: string;
}
export const ConfiguredAudienceModelAssociationSummary =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      membershipId: S.String,
      membershipArn: S.String,
      collaborationArn: S.String,
      collaborationId: S.String,
      createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      id: S.String,
      arn: S.String,
      name: S.String,
      configuredAudienceModelArn: S.String,
      description: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ConfiguredAudienceModelAssociationSummary",
  }) as any as S.Schema<ConfiguredAudienceModelAssociationSummary>;
export type ConfiguredAudienceModelAssociationSummaryList =
  ConfiguredAudienceModelAssociationSummary[];
export const ConfiguredAudienceModelAssociationSummaryList =
  /*@__PURE__*/ S.Array(ConfiguredAudienceModelAssociationSummary);
export interface ListConfiguredAudienceModelAssociationsOutput {
  configuredAudienceModelAssociationSummaries: ConfiguredAudienceModelAssociationSummary[];
  nextToken?: string;
}
export const ListConfiguredAudienceModelAssociationsOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      configuredAudienceModelAssociationSummaries:
        ConfiguredAudienceModelAssociationSummaryList,
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListConfiguredAudienceModelAssociationsOutput",
  }) as any as S.Schema<ListConfiguredAudienceModelAssociationsOutput>;
export interface ListConfiguredTableAssociationsInput {
  membershipIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListConfiguredTableAssociationsInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/memberships/{membershipIdentifier}/configuredTableAssociations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListConfiguredTableAssociationsInput",
}) as any as S.Schema<ListConfiguredTableAssociationsInput>;
export interface ConfiguredTableAssociationSummary {
  configuredTableId: string;
  membershipId: string;
  membershipArn: string;
  name: string;
  createTime: Date;
  updateTime: Date;
  id: string;
  arn: string;
  analysisRuleTypes?: ConfiguredTableAssociationAnalysisRuleType[];
}
export const ConfiguredTableAssociationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuredTableId: S.String,
    membershipId: S.String,
    membershipArn: S.String,
    name: S.String,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    id: S.String,
    arn: S.String,
    analysisRuleTypes: S.optional(
      ConfiguredTableAssociationAnalysisRuleTypeList,
    ),
  }),
).annotate({
  identifier: "ConfiguredTableAssociationSummary",
}) as any as S.Schema<ConfiguredTableAssociationSummary>;
export type ConfiguredTableAssociationSummaryList =
  ConfiguredTableAssociationSummary[];
export const ConfiguredTableAssociationSummaryList = /*@__PURE__*/ S.Array(
  ConfiguredTableAssociationSummary,
);
export interface ListConfiguredTableAssociationsOutput {
  configuredTableAssociationSummaries: ConfiguredTableAssociationSummary[];
  nextToken?: string;
}
export const ListConfiguredTableAssociationsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      configuredTableAssociationSummaries:
        ConfiguredTableAssociationSummaryList,
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListConfiguredTableAssociationsOutput",
}) as any as S.Schema<ListConfiguredTableAssociationsOutput>;
export interface ListConfiguredTablesInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListConfiguredTablesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/configuredTables" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConfiguredTablesInput",
}) as any as S.Schema<ListConfiguredTablesInput>;
export interface ConfiguredTableSummary {
  id: string;
  arn: string;
  name: string;
  createTime: Date;
  updateTime: Date;
  analysisRuleTypes: ConfiguredTableAnalysisRuleType[];
  analysisMethod: AnalysisMethod;
  selectedAnalysisMethods?: SelectedAnalysisMethod[];
}
export const ConfiguredTableSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    name: S.String,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    analysisRuleTypes: ConfiguredTableAnalysisRuleTypeList,
    analysisMethod: AnalysisMethod,
    selectedAnalysisMethods: S.optional(SelectedAnalysisMethods),
  }),
).annotate({
  identifier: "ConfiguredTableSummary",
}) as any as S.Schema<ConfiguredTableSummary>;
export type ConfiguredTableSummaryList = ConfiguredTableSummary[];
export const ConfiguredTableSummaryList = /*@__PURE__*/ S.Array(
  ConfiguredTableSummary,
);
export interface ListConfiguredTablesOutput {
  configuredTableSummaries: ConfiguredTableSummary[];
  nextToken?: string;
}
export const ListConfiguredTablesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuredTableSummaries: ConfiguredTableSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListConfiguredTablesOutput",
}) as any as S.Schema<ListConfiguredTablesOutput>;
export interface ListIdMappingTablesInput {
  membershipIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListIdMappingTablesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/memberships/{membershipIdentifier}/idmappingtables",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIdMappingTablesInput",
}) as any as S.Schema<ListIdMappingTablesInput>;
export interface IdMappingTableSummary {
  collaborationArn: string;
  collaborationId: string;
  membershipId: string;
  membershipArn: string;
  createTime: Date;
  updateTime: Date;
  id: string;
  arn: string;
  description?: string;
  inputReferenceConfig: IdMappingTableInputReferenceConfig;
  name: string;
}
export const IdMappingTableSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    collaborationArn: S.String,
    collaborationId: S.String,
    membershipId: S.String,
    membershipArn: S.String,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    id: S.String,
    arn: S.String,
    description: S.optional(S.String),
    inputReferenceConfig: IdMappingTableInputReferenceConfig,
    name: S.String,
  }),
).annotate({
  identifier: "IdMappingTableSummary",
}) as any as S.Schema<IdMappingTableSummary>;
export type IdMappingTableSummaryList = IdMappingTableSummary[];
export const IdMappingTableSummaryList = /*@__PURE__*/ S.Array(
  IdMappingTableSummary,
);
export interface ListIdMappingTablesOutput {
  idMappingTableSummaries: IdMappingTableSummary[];
  nextToken?: string;
}
export const ListIdMappingTablesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    idMappingTableSummaries: IdMappingTableSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListIdMappingTablesOutput",
}) as any as S.Schema<ListIdMappingTablesOutput>;
export interface ListIdNamespaceAssociationsInput {
  membershipIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListIdNamespaceAssociationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/memberships/{membershipIdentifier}/idnamespaceassociations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIdNamespaceAssociationsInput",
}) as any as S.Schema<ListIdNamespaceAssociationsInput>;
export interface IdNamespaceAssociationSummary {
  membershipId: string;
  membershipArn: string;
  collaborationArn: string;
  collaborationId: string;
  createTime: Date;
  updateTime: Date;
  id: string;
  arn: string;
  inputReferenceConfig: IdNamespaceAssociationInputReferenceConfig;
  name: string;
  description?: string;
  inputReferenceProperties: IdNamespaceAssociationInputReferencePropertiesSummary;
}
export const IdNamespaceAssociationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipId: S.String,
    membershipArn: S.String,
    collaborationArn: S.String,
    collaborationId: S.String,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    id: S.String,
    arn: S.String,
    inputReferenceConfig: IdNamespaceAssociationInputReferenceConfig,
    name: S.String,
    description: S.optional(S.String),
    inputReferenceProperties:
      IdNamespaceAssociationInputReferencePropertiesSummary,
  }),
).annotate({
  identifier: "IdNamespaceAssociationSummary",
}) as any as S.Schema<IdNamespaceAssociationSummary>;
export type IdNamespaceAssociationSummaryList = IdNamespaceAssociationSummary[];
export const IdNamespaceAssociationSummaryList = /*@__PURE__*/ S.Array(
  IdNamespaceAssociationSummary,
);
export interface ListIdNamespaceAssociationsOutput {
  nextToken?: string;
  idNamespaceAssociationSummaries: IdNamespaceAssociationSummary[];
}
export const ListIdNamespaceAssociationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    idNamespaceAssociationSummaries: IdNamespaceAssociationSummaryList,
  }),
).annotate({
  identifier: "ListIdNamespaceAssociationsOutput",
}) as any as S.Schema<ListIdNamespaceAssociationsOutput>;
export interface ListMembersInput {
  collaborationIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListMembersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    collaborationIdentifier: S.String.pipe(
      T.HttpLabel("collaborationIdentifier"),
    ),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/collaborations/{collaborationIdentifier}/members",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMembersInput",
}) as any as S.Schema<ListMembersInput>;
export interface MemberSummary {
  accountId: string;
  status: string;
  displayName: string;
  abilities: MemberAbility[];
  mlAbilities?: MLMemberAbilities;
  createTime: Date;
  updateTime: Date;
  membershipId?: string;
  membershipArn?: string;
  paymentConfiguration: PaymentConfiguration;
}
export const MemberSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.String,
    status: S.String,
    displayName: S.String,
    abilities: MemberAbilities,
    mlAbilities: S.optional(MLMemberAbilities),
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    membershipId: S.optional(S.String),
    membershipArn: S.optional(S.String),
    paymentConfiguration: PaymentConfiguration,
  }),
).annotate({ identifier: "MemberSummary" }) as any as S.Schema<MemberSummary>;
export type MemberSummaryList = MemberSummary[];
export const MemberSummaryList = /*@__PURE__*/ S.Array(MemberSummary);
export interface ListMembersOutput {
  nextToken?: string;
  memberSummaries: MemberSummary[];
}
export const ListMembersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    memberSummaries: MemberSummaryList,
  }),
).annotate({
  identifier: "ListMembersOutput",
}) as any as S.Schema<ListMembersOutput>;
export interface ListMembershipsInput {
  nextToken?: string;
  maxResults?: number;
  status?: string;
}
export const ListMembershipsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    status: S.optional(S.String).pipe(T.HttpQuery("status")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/memberships" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMembershipsInput",
}) as any as S.Schema<ListMembershipsInput>;
export interface MembershipSummary {
  id: string;
  arn: string;
  collaborationArn: string;
  collaborationId: string;
  collaborationCreatorAccountId: string;
  collaborationCreatorDisplayName: string;
  collaborationName: string;
  createTime: Date;
  updateTime: Date;
  status: string;
  memberAbilities: MemberAbility[];
  mlMemberAbilities?: MLMemberAbilities;
  paymentConfiguration: MembershipPaymentConfiguration;
}
export const MembershipSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    collaborationArn: S.String,
    collaborationId: S.String,
    collaborationCreatorAccountId: S.String,
    collaborationCreatorDisplayName: S.String,
    collaborationName: S.String,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: S.String,
    memberAbilities: MemberAbilities,
    mlMemberAbilities: S.optional(MLMemberAbilities),
    paymentConfiguration: MembershipPaymentConfiguration,
  }),
).annotate({
  identifier: "MembershipSummary",
}) as any as S.Schema<MembershipSummary>;
export type MembershipSummaryList = MembershipSummary[];
export const MembershipSummaryList = /*@__PURE__*/ S.Array(MembershipSummary);
export interface ListMembershipsOutput {
  nextToken?: string;
  membershipSummaries: MembershipSummary[];
}
export const ListMembershipsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    membershipSummaries: MembershipSummaryList,
  }),
).annotate({
  identifier: "ListMembershipsOutput",
}) as any as S.Schema<ListMembershipsOutput>;
export interface ListPrivacyBudgetsInput {
  membershipIdentifier: string;
  privacyBudgetType: PrivacyBudgetType;
  nextToken?: string;
  maxResults?: number;
  accessBudgetResourceArn?: string;
}
export const ListPrivacyBudgetsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    privacyBudgetType: PrivacyBudgetType.pipe(T.HttpQuery("privacyBudgetType")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    accessBudgetResourceArn: S.optional(S.String).pipe(
      T.HttpQuery("accessBudgetResourceArn"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/memberships/{membershipIdentifier}/privacybudgets",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPrivacyBudgetsInput",
}) as any as S.Schema<ListPrivacyBudgetsInput>;
export interface PrivacyBudgetSummary {
  id: string;
  privacyBudgetTemplateId: string;
  privacyBudgetTemplateArn: string;
  membershipId: string;
  membershipArn: string;
  collaborationId: string;
  collaborationArn: string;
  type: PrivacyBudgetType;
  createTime: Date;
  updateTime: Date;
  budget: PrivacyBudget;
}
export const PrivacyBudgetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    privacyBudgetTemplateId: S.String,
    privacyBudgetTemplateArn: S.String,
    membershipId: S.String,
    membershipArn: S.String,
    collaborationId: S.String,
    collaborationArn: S.String,
    type: PrivacyBudgetType,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    budget: PrivacyBudget,
  }),
).annotate({
  identifier: "PrivacyBudgetSummary",
}) as any as S.Schema<PrivacyBudgetSummary>;
export type PrivacyBudgetSummaryList = PrivacyBudgetSummary[];
export const PrivacyBudgetSummaryList =
  /*@__PURE__*/ S.Array(PrivacyBudgetSummary);
export interface ListPrivacyBudgetsOutput {
  privacyBudgetSummaries: PrivacyBudgetSummary[];
  nextToken?: string;
}
export const ListPrivacyBudgetsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    privacyBudgetSummaries: PrivacyBudgetSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPrivacyBudgetsOutput",
}) as any as S.Schema<ListPrivacyBudgetsOutput>;
export interface ListPrivacyBudgetTemplatesInput {
  membershipIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListPrivacyBudgetTemplatesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/memberships/{membershipIdentifier}/privacybudgettemplates",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPrivacyBudgetTemplatesInput",
}) as any as S.Schema<ListPrivacyBudgetTemplatesInput>;
export interface PrivacyBudgetTemplateSummary {
  id: string;
  arn: string;
  membershipId: string;
  membershipArn: string;
  collaborationId: string;
  collaborationArn: string;
  privacyBudgetType: PrivacyBudgetType;
  createTime: Date;
  updateTime: Date;
}
export const PrivacyBudgetTemplateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    membershipId: S.String,
    membershipArn: S.String,
    collaborationId: S.String,
    collaborationArn: S.String,
    privacyBudgetType: PrivacyBudgetType,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "PrivacyBudgetTemplateSummary",
}) as any as S.Schema<PrivacyBudgetTemplateSummary>;
export type PrivacyBudgetTemplateSummaryList = PrivacyBudgetTemplateSummary[];
export const PrivacyBudgetTemplateSummaryList = /*@__PURE__*/ S.Array(
  PrivacyBudgetTemplateSummary,
);
export interface ListPrivacyBudgetTemplatesOutput {
  nextToken?: string;
  privacyBudgetTemplateSummaries: PrivacyBudgetTemplateSummary[];
}
export const ListPrivacyBudgetTemplatesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    privacyBudgetTemplateSummaries: PrivacyBudgetTemplateSummaryList,
  }),
).annotate({
  identifier: "ListPrivacyBudgetTemplatesOutput",
}) as any as S.Schema<ListPrivacyBudgetTemplatesOutput>;
export interface ListProtectedJobsInput {
  membershipIdentifier: string;
  status?: ProtectedJobStatus;
  nextToken?: string;
  maxResults?: number;
}
export const ListProtectedJobsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    status: S.optional(ProtectedJobStatus).pipe(T.HttpQuery("status")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/memberships/{membershipIdentifier}/protectedJobs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProtectedJobsInput",
}) as any as S.Schema<ListProtectedJobsInput>;
export type ProtectedJobAnalysisType = "DIRECT_ANALYSIS" | (string & {});
export const ProtectedJobAnalysisType = /*@__PURE__*/ S.String;

export type ProtectedJobReceiverAccountIds = string[];
export const ProtectedJobReceiverAccountIds = /*@__PURE__*/ S.Array(S.String);
export interface ProtectedJobDirectAnalysisConfigurationDetails {
  receiverAccountIds?: string[];
}
export const ProtectedJobDirectAnalysisConfigurationDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      receiverAccountIds: S.optional(ProtectedJobReceiverAccountIds),
    }),
  ).annotate({
    identifier: "ProtectedJobDirectAnalysisConfigurationDetails",
  }) as any as S.Schema<ProtectedJobDirectAnalysisConfigurationDetails>;
export type ProtectedJobConfigurationDetails = {
  directAnalysisConfigurationDetails: ProtectedJobDirectAnalysisConfigurationDetails;
};
export const ProtectedJobConfigurationDetails = /*@__PURE__*/ S.Union([
  S.Struct({
    directAnalysisConfigurationDetails:
      ProtectedJobDirectAnalysisConfigurationDetails,
  }),
]);
export interface ProtectedJobReceiverConfiguration {
  analysisType: ProtectedJobAnalysisType;
  configurationDetails?: ProtectedJobConfigurationDetails;
}
export const ProtectedJobReceiverConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    analysisType: ProtectedJobAnalysisType,
    configurationDetails: S.optional(ProtectedJobConfigurationDetails),
  }),
).annotate({
  identifier: "ProtectedJobReceiverConfiguration",
}) as any as S.Schema<ProtectedJobReceiverConfiguration>;
export type ProtectedJobReceiverConfigurations =
  ProtectedJobReceiverConfiguration[];
export const ProtectedJobReceiverConfigurations = /*@__PURE__*/ S.Array(
  ProtectedJobReceiverConfiguration,
);
export interface ProtectedJobSummary {
  id: string;
  membershipId: string;
  membershipArn: string;
  createTime: Date;
  status: ProtectedJobStatus;
  receiverConfigurations: ProtectedJobReceiverConfiguration[];
  jobComputePayerAccountId?: string;
}
export const ProtectedJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    membershipId: S.String,
    membershipArn: S.String,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: ProtectedJobStatus,
    receiverConfigurations: ProtectedJobReceiverConfigurations,
    jobComputePayerAccountId: S.optional(S.String),
  }),
).annotate({
  identifier: "ProtectedJobSummary",
}) as any as S.Schema<ProtectedJobSummary>;
export type ProtectedJobSummaryList = ProtectedJobSummary[];
export const ProtectedJobSummaryList =
  /*@__PURE__*/ S.Array(ProtectedJobSummary);
export interface ListProtectedJobsOutput {
  nextToken?: string;
  protectedJobs: ProtectedJobSummary[];
}
export const ListProtectedJobsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    protectedJobs: ProtectedJobSummaryList,
  }),
).annotate({
  identifier: "ListProtectedJobsOutput",
}) as any as S.Schema<ListProtectedJobsOutput>;
export interface ListProtectedQueriesInput {
  membershipIdentifier: string;
  status?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListProtectedQueriesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    status: S.optional(S.String).pipe(T.HttpQuery("status")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/memberships/{membershipIdentifier}/protectedQueries",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProtectedQueriesInput",
}) as any as S.Schema<ListProtectedQueriesInput>;
export type ReceiverAccountIds = string[];
export const ReceiverAccountIds = /*@__PURE__*/ S.Array(S.String);
export interface DirectAnalysisConfigurationDetails {
  receiverAccountIds?: string[];
}
export const DirectAnalysisConfigurationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ receiverAccountIds: S.optional(ReceiverAccountIds) }),
).annotate({
  identifier: "DirectAnalysisConfigurationDetails",
}) as any as S.Schema<DirectAnalysisConfigurationDetails>;
export type ConfigurationDetails = {
  directAnalysisConfigurationDetails: DirectAnalysisConfigurationDetails;
};
export const ConfigurationDetails = /*@__PURE__*/ S.Union([
  S.Struct({
    directAnalysisConfigurationDetails: DirectAnalysisConfigurationDetails,
  }),
]);
export interface ReceiverConfiguration {
  analysisType: AnalysisType;
  configurationDetails?: ConfigurationDetails;
}
export const ReceiverConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    analysisType: AnalysisType,
    configurationDetails: S.optional(ConfigurationDetails),
  }),
).annotate({
  identifier: "ReceiverConfiguration",
}) as any as S.Schema<ReceiverConfiguration>;
export type ReceiverConfigurationsList = ReceiverConfiguration[];
export const ReceiverConfigurationsList = /*@__PURE__*/ S.Array(
  ReceiverConfiguration,
);
export interface ProtectedQuerySummary {
  id: string;
  membershipId: string;
  membershipArn: string;
  createTime: Date;
  status: string;
  receiverConfigurations: ReceiverConfiguration[];
  queryComputePayerAccountId?: string;
}
export const ProtectedQuerySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    membershipId: S.String,
    membershipArn: S.String,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: S.String,
    receiverConfigurations: ReceiverConfigurationsList,
    queryComputePayerAccountId: S.optional(S.String),
  }),
).annotate({
  identifier: "ProtectedQuerySummary",
}) as any as S.Schema<ProtectedQuerySummary>;
export type ProtectedQuerySummaryList = ProtectedQuerySummary[];
export const ProtectedQuerySummaryList = /*@__PURE__*/ S.Array(
  ProtectedQuerySummary,
);
export interface ListProtectedQueriesOutput {
  nextToken?: string;
  protectedQueries: ProtectedQuerySummary[];
}
export const ListProtectedQueriesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    protectedQueries: ProtectedQuerySummaryList,
  }),
).annotate({
  identifier: "ListProtectedQueriesOutput",
}) as any as S.Schema<ListProtectedQueriesOutput>;
export interface ListSchemasInput {
  collaborationIdentifier: string;
  schemaType?: SchemaType;
  nextToken?: string;
  maxResults?: number;
}
export const ListSchemasInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    collaborationIdentifier: S.String.pipe(
      T.HttpLabel("collaborationIdentifier"),
    ),
    schemaType: S.optional(SchemaType).pipe(T.HttpQuery("schemaType")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/collaborations/{collaborationIdentifier}/schemas",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSchemasInput",
}) as any as S.Schema<ListSchemasInput>;
export interface SchemaSummary {
  name: string;
  type: SchemaType;
  creatorAccountId: string;
  createTime: Date;
  updateTime: Date;
  collaborationId: string;
  collaborationArn: string;
  analysisRuleTypes: AnalysisRuleType[];
  analysisMethod?: AnalysisMethod;
  resourceArn?: string;
  selectedAnalysisMethods?: SelectedAnalysisMethod[];
}
export const SchemaSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    type: SchemaType,
    creatorAccountId: S.String,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    collaborationId: S.String,
    collaborationArn: S.String,
    analysisRuleTypes: AnalysisRuleTypeList,
    analysisMethod: S.optional(AnalysisMethod),
    resourceArn: S.optional(S.String),
    selectedAnalysisMethods: S.optional(SelectedAnalysisMethods),
  }),
).annotate({ identifier: "SchemaSummary" }) as any as S.Schema<SchemaSummary>;
export type SchemaSummaryList = SchemaSummary[];
export const SchemaSummaryList = /*@__PURE__*/ S.Array(SchemaSummary);
export interface ListSchemasOutput {
  schemaSummaries: SchemaSummary[];
  nextToken?: string;
}
export const ListSchemasOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    schemaSummaries: SchemaSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSchemasOutput",
}) as any as S.Schema<ListSchemasOutput>;
export type CleanroomsArn = string;
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
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  tags: { [key: string]: string | undefined };
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: TagMap }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export type JobType = "BATCH" | "INCREMENTAL" | "DELETE_ONLY" | (string & {});
export const JobType = /*@__PURE__*/ S.String;

export interface PopulateIdMappingTableInput {
  idMappingTableIdentifier: string;
  membershipIdentifier: string;
  jobType?: JobType;
}
export const PopulateIdMappingTableInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    idMappingTableIdentifier: S.String.pipe(
      T.HttpLabel("idMappingTableIdentifier"),
    ),
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    jobType: S.optional(JobType),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/memberships/{membershipIdentifier}/idmappingtables/{idMappingTableIdentifier}/populate",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PopulateIdMappingTableInput",
}) as any as S.Schema<PopulateIdMappingTableInput>;
export interface PopulateIdMappingTableOutput {
  idMappingJobId: string;
}
export const PopulateIdMappingTableOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ idMappingJobId: S.String }),
).annotate({
  identifier: "PopulateIdMappingTableOutput",
}) as any as S.Schema<PopulateIdMappingTableOutput>;
export interface DifferentialPrivacyPreviewParametersInput {
  epsilon: number;
  usersNoisePerQuery: number;
}
export const DifferentialPrivacyPreviewParametersInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ epsilon: S.Number, usersNoisePerQuery: S.Number }),
  ).annotate({
    identifier: "DifferentialPrivacyPreviewParametersInput",
  }) as any as S.Schema<DifferentialPrivacyPreviewParametersInput>;
export type PreviewPrivacyImpactParametersInput = {
  differentialPrivacy: DifferentialPrivacyPreviewParametersInput;
};
export const PreviewPrivacyImpactParametersInput = /*@__PURE__*/ S.Union([
  S.Struct({ differentialPrivacy: DifferentialPrivacyPreviewParametersInput }),
]);
export interface PreviewPrivacyImpactInput {
  membershipIdentifier: string;
  parameters: PreviewPrivacyImpactParametersInput;
}
export const PreviewPrivacyImpactInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    parameters: PreviewPrivacyImpactParametersInput,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/memberships/{membershipIdentifier}/previewprivacyimpact",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PreviewPrivacyImpactInput",
}) as any as S.Schema<PreviewPrivacyImpactInput>;
export interface DifferentialPrivacyPreviewAggregation {
  type: DifferentialPrivacyAggregationType;
  maxCount: number;
}
export const DifferentialPrivacyPreviewAggregation = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ type: DifferentialPrivacyAggregationType, maxCount: S.Number }),
).annotate({
  identifier: "DifferentialPrivacyPreviewAggregation",
}) as any as S.Schema<DifferentialPrivacyPreviewAggregation>;
export type DifferentialPrivacyPreviewAggregationList =
  DifferentialPrivacyPreviewAggregation[];
export const DifferentialPrivacyPreviewAggregationList = /*@__PURE__*/ S.Array(
  DifferentialPrivacyPreviewAggregation,
);
export interface DifferentialPrivacyPrivacyImpact {
  aggregations: DifferentialPrivacyPreviewAggregation[];
}
export const DifferentialPrivacyPrivacyImpact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ aggregations: DifferentialPrivacyPreviewAggregationList }),
).annotate({
  identifier: "DifferentialPrivacyPrivacyImpact",
}) as any as S.Schema<DifferentialPrivacyPrivacyImpact>;
export type PrivacyImpact = {
  differentialPrivacy: DifferentialPrivacyPrivacyImpact;
};
export const PrivacyImpact = /*@__PURE__*/ S.Union([
  S.Struct({ differentialPrivacy: DifferentialPrivacyPrivacyImpact }),
]);
export interface PreviewPrivacyImpactOutput {
  privacyImpact: PrivacyImpact;
}
export const PreviewPrivacyImpactOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ privacyImpact: PrivacyImpact }),
).annotate({
  identifier: "PreviewPrivacyImpactOutput",
}) as any as S.Schema<PreviewPrivacyImpactOutput>;
export type ProtectedJobType = "PYSPARK" | (string & {});
export const ProtectedJobType = /*@__PURE__*/ S.String;

export interface ProtectedJobMemberOutputConfigurationInput {
  accountId: string;
}
export const ProtectedJobMemberOutputConfigurationInput =
  /*@__PURE__*/ S.suspend(() => S.Struct({ accountId: S.String })).annotate({
    identifier: "ProtectedJobMemberOutputConfigurationInput",
  }) as any as S.Schema<ProtectedJobMemberOutputConfigurationInput>;
export type ProtectedJobOutputConfigurationInput = {
  member: ProtectedJobMemberOutputConfigurationInput;
};
export const ProtectedJobOutputConfigurationInput = /*@__PURE__*/ S.Union([
  S.Struct({ member: ProtectedJobMemberOutputConfigurationInput }),
]);
export interface ProtectedJobResultConfigurationInput {
  outputConfiguration: ProtectedJobOutputConfigurationInput;
}
export const ProtectedJobResultConfigurationInput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ outputConfiguration: ProtectedJobOutputConfigurationInput }),
).annotate({
  identifier: "ProtectedJobResultConfigurationInput",
}) as any as S.Schema<ProtectedJobResultConfigurationInput>;
export interface StartProtectedJobInput {
  type: ProtectedJobType;
  membershipIdentifier: string;
  jobParameters: ProtectedJobParameters;
  resultConfiguration?: ProtectedJobResultConfigurationInput;
  computeConfiguration?: ProtectedJobComputeConfiguration;
  jobComputePayerAccountId?: string;
}
export const StartProtectedJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: ProtectedJobType,
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    jobParameters: ProtectedJobParameters,
    resultConfiguration: S.optional(ProtectedJobResultConfigurationInput),
    computeConfiguration: S.optional(ProtectedJobComputeConfiguration),
    jobComputePayerAccountId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/memberships/{membershipIdentifier}/protectedJobs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartProtectedJobInput",
}) as any as S.Schema<StartProtectedJobInput>;
export interface StartProtectedJobOutput {
  protectedJob: ProtectedJob;
}
export const StartProtectedJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ protectedJob: ProtectedJob }),
).annotate({
  identifier: "StartProtectedJobOutput",
}) as any as S.Schema<StartProtectedJobOutput>;
export type ProtectedQueryType = string;
export interface StartProtectedQueryInput {
  type: string;
  membershipIdentifier: string;
  sqlParameters: ProtectedQuerySQLParameters;
  resultConfiguration?: ProtectedQueryResultConfiguration;
  computeConfiguration?: ComputeConfiguration;
  queryComputePayerAccountId?: string;
}
export const StartProtectedQueryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.String,
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    sqlParameters: ProtectedQuerySQLParameters,
    resultConfiguration: S.optional(ProtectedQueryResultConfiguration),
    computeConfiguration: S.optional(ComputeConfiguration),
    queryComputePayerAccountId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/memberships/{membershipIdentifier}/protectedQueries",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartProtectedQueryInput",
}) as any as S.Schema<StartProtectedQueryInput>;
export interface StartProtectedQueryOutput {
  protectedQuery: ProtectedQuery;
}
export const StartProtectedQueryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ protectedQuery: ProtectedQuery }),
).annotate({
  identifier: "StartProtectedQueryOutput",
}) as any as S.Schema<StartProtectedQueryOutput>;
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
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceOutput {}
export const UntagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export interface UpdateAnalysisTemplateInput {
  membershipIdentifier: string;
  analysisTemplateIdentifier: string;
  description?: string;
}
export const UpdateAnalysisTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    analysisTemplateIdentifier: S.String.pipe(
      T.HttpLabel("analysisTemplateIdentifier"),
    ),
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/memberships/{membershipIdentifier}/analysistemplates/{analysisTemplateIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAnalysisTemplateInput",
}) as any as S.Schema<UpdateAnalysisTemplateInput>;
export interface UpdateAnalysisTemplateOutput {
  analysisTemplate: AnalysisTemplate;
}
export const UpdateAnalysisTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ analysisTemplate: AnalysisTemplate }),
).annotate({
  identifier: "UpdateAnalysisTemplateOutput",
}) as any as S.Schema<UpdateAnalysisTemplateOutput>;
export interface UpdateCollaborationInput {
  collaborationIdentifier: string;
  name?: string;
  description?: string;
  analyticsEngine?: AnalyticsEngine;
}
export const UpdateCollaborationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    collaborationIdentifier: S.String.pipe(
      T.HttpLabel("collaborationIdentifier"),
    ),
    name: S.optional(S.String),
    description: S.optional(S.String),
    analyticsEngine: S.optional(AnalyticsEngine),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/collaborations/{collaborationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCollaborationInput",
}) as any as S.Schema<UpdateCollaborationInput>;
export interface UpdateCollaborationOutput {
  collaboration: Collaboration;
}
export const UpdateCollaborationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ collaboration: Collaboration }),
).annotate({
  identifier: "UpdateCollaborationOutput",
}) as any as S.Schema<UpdateCollaborationOutput>;
export type ChangeRequestAction =
  | "APPROVE"
  | "DENY"
  | "CANCEL"
  | "COMMIT"
  | (string & {});
export const ChangeRequestAction = /*@__PURE__*/ S.String;

export interface UpdateCollaborationChangeRequestInput {
  collaborationIdentifier: string;
  changeRequestIdentifier: string;
  action: ChangeRequestAction;
}
export const UpdateCollaborationChangeRequestInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      collaborationIdentifier: S.String.pipe(
        T.HttpLabel("collaborationIdentifier"),
      ),
      changeRequestIdentifier: S.String.pipe(
        T.HttpLabel("changeRequestIdentifier"),
      ),
      action: ChangeRequestAction,
    }).pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/collaborations/{collaborationIdentifier}/changeRequests/{changeRequestIdentifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateCollaborationChangeRequestInput",
}) as any as S.Schema<UpdateCollaborationChangeRequestInput>;
export interface UpdateCollaborationChangeRequestOutput {
  collaborationChangeRequest: CollaborationChangeRequest;
}
export const UpdateCollaborationChangeRequestOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ collaborationChangeRequest: CollaborationChangeRequest }),
).annotate({
  identifier: "UpdateCollaborationChangeRequestOutput",
}) as any as S.Schema<UpdateCollaborationChangeRequestOutput>;
export interface UpdateConfiguredAudienceModelAssociationInput {
  configuredAudienceModelAssociationIdentifier: string;
  membershipIdentifier: string;
  description?: string;
  name?: string;
}
export const UpdateConfiguredAudienceModelAssociationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      configuredAudienceModelAssociationIdentifier: S.String.pipe(
        T.HttpLabel("configuredAudienceModelAssociationIdentifier"),
      ),
      membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
      description: S.optional(S.String),
      name: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/memberships/{membershipIdentifier}/configuredaudiencemodelassociations/{configuredAudienceModelAssociationIdentifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateConfiguredAudienceModelAssociationInput",
  }) as any as S.Schema<UpdateConfiguredAudienceModelAssociationInput>;
export interface UpdateConfiguredAudienceModelAssociationOutput {
  configuredAudienceModelAssociation: ConfiguredAudienceModelAssociation;
}
export const UpdateConfiguredAudienceModelAssociationOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      configuredAudienceModelAssociation: ConfiguredAudienceModelAssociation,
    }),
  ).annotate({
    identifier: "UpdateConfiguredAudienceModelAssociationOutput",
  }) as any as S.Schema<UpdateConfiguredAudienceModelAssociationOutput>;
export interface UpdateConfiguredTableInput {
  configuredTableIdentifier: string;
  name?: string;
  description?: string;
  tableReference?: TableReference;
  allowedColumns?: string[];
  analysisMethod?: AnalysisMethod;
  selectedAnalysisMethods?: SelectedAnalysisMethod[];
}
export const UpdateConfiguredTableInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuredTableIdentifier: S.String.pipe(
      T.HttpLabel("configuredTableIdentifier"),
    ),
    name: S.optional(S.String),
    description: S.optional(S.String),
    tableReference: S.optional(TableReference),
    allowedColumns: S.optional(AllowedColumnList),
    analysisMethod: S.optional(AnalysisMethod),
    selectedAnalysisMethods: S.optional(SelectedAnalysisMethods),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/configuredTables/{configuredTableIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateConfiguredTableInput",
}) as any as S.Schema<UpdateConfiguredTableInput>;
export interface UpdateConfiguredTableOutput {
  configuredTable: ConfiguredTable;
}
export const UpdateConfiguredTableOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ configuredTable: ConfiguredTable }),
).annotate({
  identifier: "UpdateConfiguredTableOutput",
}) as any as S.Schema<UpdateConfiguredTableOutput>;
export interface UpdateConfiguredTableAnalysisRuleInput {
  configuredTableIdentifier: string;
  analysisRuleType: ConfiguredTableAnalysisRuleType;
  analysisRulePolicy: ConfiguredTableAnalysisRulePolicy;
}
export const UpdateConfiguredTableAnalysisRuleInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      configuredTableIdentifier: S.String.pipe(
        T.HttpLabel("configuredTableIdentifier"),
      ),
      analysisRuleType: ConfiguredTableAnalysisRuleType.pipe(
        T.HttpLabel("analysisRuleType"),
      ),
      analysisRulePolicy: ConfiguredTableAnalysisRulePolicy,
    }).pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/configuredTables/{configuredTableIdentifier}/analysisRule/{analysisRuleType}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateConfiguredTableAnalysisRuleInput",
}) as any as S.Schema<UpdateConfiguredTableAnalysisRuleInput>;
export interface UpdateConfiguredTableAnalysisRuleOutput {
  analysisRule: ConfiguredTableAnalysisRule;
}
export const UpdateConfiguredTableAnalysisRuleOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ analysisRule: ConfiguredTableAnalysisRule }),
).annotate({
  identifier: "UpdateConfiguredTableAnalysisRuleOutput",
}) as any as S.Schema<UpdateConfiguredTableAnalysisRuleOutput>;
export interface UpdateConfiguredTableAssociationInput {
  configuredTableAssociationIdentifier: string;
  membershipIdentifier: string;
  description?: string;
  roleArn?: string;
}
export const UpdateConfiguredTableAssociationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      configuredTableAssociationIdentifier: S.String.pipe(
        T.HttpLabel("configuredTableAssociationIdentifier"),
      ),
      membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
      description: S.optional(S.String),
      roleArn: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/memberships/{membershipIdentifier}/configuredTableAssociations/{configuredTableAssociationIdentifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateConfiguredTableAssociationInput",
}) as any as S.Schema<UpdateConfiguredTableAssociationInput>;
export interface UpdateConfiguredTableAssociationOutput {
  configuredTableAssociation: ConfiguredTableAssociation;
}
export const UpdateConfiguredTableAssociationOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ configuredTableAssociation: ConfiguredTableAssociation }),
).annotate({
  identifier: "UpdateConfiguredTableAssociationOutput",
}) as any as S.Schema<UpdateConfiguredTableAssociationOutput>;
export interface UpdateConfiguredTableAssociationAnalysisRuleInput {
  membershipIdentifier: string;
  configuredTableAssociationIdentifier: string;
  analysisRuleType: ConfiguredTableAssociationAnalysisRuleType;
  analysisRulePolicy: ConfiguredTableAssociationAnalysisRulePolicy;
}
export const UpdateConfiguredTableAssociationAnalysisRuleInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
      configuredTableAssociationIdentifier: S.String.pipe(
        T.HttpLabel("configuredTableAssociationIdentifier"),
      ),
      analysisRuleType: ConfiguredTableAssociationAnalysisRuleType.pipe(
        T.HttpLabel("analysisRuleType"),
      ),
      analysisRulePolicy: ConfiguredTableAssociationAnalysisRulePolicy,
    }).pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/memberships/{membershipIdentifier}/configuredTableAssociations/{configuredTableAssociationIdentifier}/analysisRule/{analysisRuleType}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateConfiguredTableAssociationAnalysisRuleInput",
  }) as any as S.Schema<UpdateConfiguredTableAssociationAnalysisRuleInput>;
export interface UpdateConfiguredTableAssociationAnalysisRuleOutput {
  analysisRule: ConfiguredTableAssociationAnalysisRule;
}
export const UpdateConfiguredTableAssociationAnalysisRuleOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ analysisRule: ConfiguredTableAssociationAnalysisRule }),
  ).annotate({
    identifier: "UpdateConfiguredTableAssociationAnalysisRuleOutput",
  }) as any as S.Schema<UpdateConfiguredTableAssociationAnalysisRuleOutput>;
export interface UpdateIdMappingTableInput {
  idMappingTableIdentifier: string;
  membershipIdentifier: string;
  description?: string;
  kmsKeyArn?: string;
}
export const UpdateIdMappingTableInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    idMappingTableIdentifier: S.String.pipe(
      T.HttpLabel("idMappingTableIdentifier"),
    ),
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    description: S.optional(S.String),
    kmsKeyArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/memberships/{membershipIdentifier}/idmappingtables/{idMappingTableIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateIdMappingTableInput",
}) as any as S.Schema<UpdateIdMappingTableInput>;
export interface UpdateIdMappingTableOutput {
  idMappingTable: IdMappingTable;
}
export const UpdateIdMappingTableOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ idMappingTable: IdMappingTable }),
).annotate({
  identifier: "UpdateIdMappingTableOutput",
}) as any as S.Schema<UpdateIdMappingTableOutput>;
export interface UpdateIdNamespaceAssociationInput {
  idNamespaceAssociationIdentifier: string;
  membershipIdentifier: string;
  name?: string;
  description?: string;
  idMappingConfig?: IdMappingConfig;
}
export const UpdateIdNamespaceAssociationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    idNamespaceAssociationIdentifier: S.String.pipe(
      T.HttpLabel("idNamespaceAssociationIdentifier"),
    ),
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    name: S.optional(S.String),
    description: S.optional(S.String),
    idMappingConfig: S.optional(IdMappingConfig),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/memberships/{membershipIdentifier}/idnamespaceassociations/{idNamespaceAssociationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateIdNamespaceAssociationInput",
}) as any as S.Schema<UpdateIdNamespaceAssociationInput>;
export interface UpdateIdNamespaceAssociationOutput {
  idNamespaceAssociation: IdNamespaceAssociation;
}
export const UpdateIdNamespaceAssociationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ idNamespaceAssociation: IdNamespaceAssociation }),
).annotate({
  identifier: "UpdateIdNamespaceAssociationOutput",
}) as any as S.Schema<UpdateIdNamespaceAssociationOutput>;
export interface UpdateMembershipPaymentConfiguration {
  queryCompute?: MembershipQueryComputePaymentConfig;
  machineLearning?: MembershipMLPaymentConfig;
  jobCompute?: MembershipJobComputePaymentConfig;
}
export const UpdateMembershipPaymentConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      queryCompute: S.optional(MembershipQueryComputePaymentConfig),
      machineLearning: S.optional(MembershipMLPaymentConfig),
      jobCompute: S.optional(MembershipJobComputePaymentConfig),
    }),
).annotate({
  identifier: "UpdateMembershipPaymentConfiguration",
}) as any as S.Schema<UpdateMembershipPaymentConfiguration>;
export interface UpdateMembershipInput {
  membershipIdentifier: string;
  queryLogStatus?: MembershipQueryLogStatus;
  jobLogStatus?: MembershipJobLogStatus;
  defaultResultConfiguration?: MembershipProtectedQueryResultConfiguration;
  defaultJobResultConfiguration?: MembershipProtectedJobResultConfiguration;
  membershipPaymentConfiguration?: UpdateMembershipPaymentConfiguration;
}
export const UpdateMembershipInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    queryLogStatus: S.optional(MembershipQueryLogStatus),
    jobLogStatus: S.optional(MembershipJobLogStatus),
    defaultResultConfiguration: S.optional(
      MembershipProtectedQueryResultConfiguration,
    ),
    defaultJobResultConfiguration: S.optional(
      MembershipProtectedJobResultConfiguration,
    ),
    membershipPaymentConfiguration: S.optional(
      UpdateMembershipPaymentConfiguration,
    ),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/memberships/{membershipIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMembershipInput",
}) as any as S.Schema<UpdateMembershipInput>;
export interface UpdateMembershipOutput {
  membership: Membership;
}
export const UpdateMembershipOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ membership: Membership }),
).annotate({
  identifier: "UpdateMembershipOutput",
}) as any as S.Schema<UpdateMembershipOutput>;
export interface DifferentialPrivacyTemplateUpdateParameters {
  epsilon?: number;
  usersNoisePerQuery?: number;
}
export const DifferentialPrivacyTemplateUpdateParameters =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      epsilon: S.optional(S.Number),
      usersNoisePerQuery: S.optional(S.Number),
    }),
  ).annotate({
    identifier: "DifferentialPrivacyTemplateUpdateParameters",
  }) as any as S.Schema<DifferentialPrivacyTemplateUpdateParameters>;
export interface AccessBudgetsPrivacyTemplateUpdateParameters {
  budgetParameters: BudgetParameter[];
}
export const AccessBudgetsPrivacyTemplateUpdateParameters =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ budgetParameters: BudgetParameters }),
  ).annotate({
    identifier: "AccessBudgetsPrivacyTemplateUpdateParameters",
  }) as any as S.Schema<AccessBudgetsPrivacyTemplateUpdateParameters>;
export type PrivacyBudgetTemplateUpdateParameters =
  | {
      differentialPrivacy: DifferentialPrivacyTemplateUpdateParameters;
      accessBudget?: never;
    }
  | {
      differentialPrivacy?: never;
      accessBudget: AccessBudgetsPrivacyTemplateUpdateParameters;
    };
export const PrivacyBudgetTemplateUpdateParameters = /*@__PURE__*/ S.Union([
  S.Struct({
    differentialPrivacy: DifferentialPrivacyTemplateUpdateParameters,
  }),
  S.Struct({ accessBudget: AccessBudgetsPrivacyTemplateUpdateParameters }),
]);
export interface UpdatePrivacyBudgetTemplateInput {
  membershipIdentifier: string;
  privacyBudgetTemplateIdentifier: string;
  privacyBudgetType: PrivacyBudgetType;
  parameters?: PrivacyBudgetTemplateUpdateParameters;
}
export const UpdatePrivacyBudgetTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    privacyBudgetTemplateIdentifier: S.String.pipe(
      T.HttpLabel("privacyBudgetTemplateIdentifier"),
    ),
    privacyBudgetType: PrivacyBudgetType,
    parameters: S.optional(PrivacyBudgetTemplateUpdateParameters),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/memberships/{membershipIdentifier}/privacybudgettemplates/{privacyBudgetTemplateIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePrivacyBudgetTemplateInput",
}) as any as S.Schema<UpdatePrivacyBudgetTemplateInput>;
export interface UpdatePrivacyBudgetTemplateOutput {
  privacyBudgetTemplate: PrivacyBudgetTemplate;
}
export const UpdatePrivacyBudgetTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ privacyBudgetTemplate: PrivacyBudgetTemplate }),
).annotate({
  identifier: "UpdatePrivacyBudgetTemplateOutput",
}) as any as S.Schema<UpdatePrivacyBudgetTemplateOutput>;
export type TargetProtectedJobStatus = "CANCELLED" | (string & {});
export const TargetProtectedJobStatus = /*@__PURE__*/ S.String;

export interface UpdateProtectedJobInput {
  membershipIdentifier: string;
  protectedJobIdentifier: string;
  targetStatus: TargetProtectedJobStatus;
}
export const UpdateProtectedJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    protectedJobIdentifier: S.String.pipe(
      T.HttpLabel("protectedJobIdentifier"),
    ),
    targetStatus: TargetProtectedJobStatus,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/memberships/{membershipIdentifier}/protectedJobs/{protectedJobIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateProtectedJobInput",
}) as any as S.Schema<UpdateProtectedJobInput>;
export interface UpdateProtectedJobOutput {
  protectedJob: ProtectedJob;
}
export const UpdateProtectedJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ protectedJob: ProtectedJob }),
).annotate({
  identifier: "UpdateProtectedJobOutput",
}) as any as S.Schema<UpdateProtectedJobOutput>;
export type TargetProtectedQueryStatus = string;
export interface UpdateProtectedQueryInput {
  membershipIdentifier: string;
  protectedQueryIdentifier: string;
  targetStatus: string;
}
export const UpdateProtectedQueryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    protectedQueryIdentifier: S.String.pipe(
      T.HttpLabel("protectedQueryIdentifier"),
    ),
    targetStatus: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/memberships/{membershipIdentifier}/protectedQueries/{protectedQueryIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateProtectedQueryInput",
}) as any as S.Schema<UpdateProtectedQueryInput>;
export interface UpdateProtectedQueryOutput {
  protectedQuery: ProtectedQuery;
}
export const UpdateProtectedQueryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ protectedQuery: ProtectedQuery }),
).annotate({
  identifier: "UpdateProtectedQueryOutput",
}) as any as S.Schema<UpdateProtectedQueryOutput>;
export type AccessDeniedExceptionReason = string;
export type ResourceType = string;
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
export type ConflictExceptionReason = string;
export type BatchGetCollaborationAnalysisTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves multiple analysis templates within a collaboration by their Amazon Resource Names (ARNs).
 */
export const batchGetCollaborationAnalysisTemplate: API.OperationMethod<
  BatchGetCollaborationAnalysisTemplateInput,
  BatchGetCollaborationAnalysisTemplateOutput,
  BatchGetCollaborationAnalysisTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetCollaborationAnalysisTemplateInput,
  output: BatchGetCollaborationAnalysisTemplateOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetCollaborationAnalysisTemplate",
}));

export type BatchGetSchemaError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves multiple schemas by their identifiers.
 */
export const batchGetSchema: API.OperationMethod<
  BatchGetSchemaInput,
  BatchGetSchemaOutput,
  BatchGetSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetSchemaInput,
  output: BatchGetSchemaOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetSchema",
}));

export type BatchGetSchemaAnalysisRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves multiple analysis rule schemas.
 */
export const batchGetSchemaAnalysisRule: API.OperationMethod<
  BatchGetSchemaAnalysisRuleInput,
  BatchGetSchemaAnalysisRuleOutput,
  BatchGetSchemaAnalysisRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetSchemaAnalysisRuleInput,
  output: BatchGetSchemaAnalysisRuleOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetSchemaAnalysisRule",
}));

export type CreateAnalysisTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new analysis template.
 */
export const createAnalysisTemplate: API.OperationMethod<
  CreateAnalysisTemplateInput,
  CreateAnalysisTemplateOutput,
  CreateAnalysisTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAnalysisTemplateInput,
  output: CreateAnalysisTemplateOutput,
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
  operationName: "CreateAnalysisTemplate",
}));

export type CreateCollaborationError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new collaboration.
 */
export const createCollaboration: API.OperationMethod<
  CreateCollaborationInput,
  CreateCollaborationOutput,
  CreateCollaborationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCollaborationInput,
  output: CreateCollaborationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCollaboration",
}));

export type CreateCollaborationChangeRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new change request to modify an existing collaboration. This enables post-creation modifications to collaborations through a structured API-driven approach.
 */
export const createCollaborationChangeRequest: API.OperationMethod<
  CreateCollaborationChangeRequestInput,
  CreateCollaborationChangeRequestOutput,
  CreateCollaborationChangeRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCollaborationChangeRequestInput,
  output: CreateCollaborationChangeRequestOutput,
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
  operationName: "CreateCollaborationChangeRequest",
}));

export type CreateConfiguredAudienceModelAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides the details necessary to create a configured audience model association.
 */
export const createConfiguredAudienceModelAssociation: API.OperationMethod<
  CreateConfiguredAudienceModelAssociationInput,
  CreateConfiguredAudienceModelAssociationOutput,
  CreateConfiguredAudienceModelAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConfiguredAudienceModelAssociationInput,
  output: CreateConfiguredAudienceModelAssociationOutput,
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
  operationName: "CreateConfiguredAudienceModelAssociation",
}));

export type CreateConfiguredTableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new configured table resource.
 */
export const createConfiguredTable: API.OperationMethod<
  CreateConfiguredTableInput,
  CreateConfiguredTableOutput,
  CreateConfiguredTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConfiguredTableInput,
  output: CreateConfiguredTableOutput,
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
  operationName: "CreateConfiguredTable",
}));

export type CreateConfiguredTableAnalysisRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new analysis rule for a configured table. Currently, only one analysis rule can be created for a given configured table.
 */
export const createConfiguredTableAnalysisRule: API.OperationMethod<
  CreateConfiguredTableAnalysisRuleInput,
  CreateConfiguredTableAnalysisRuleOutput,
  CreateConfiguredTableAnalysisRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConfiguredTableAnalysisRuleInput,
  output: CreateConfiguredTableAnalysisRuleOutput,
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
  operationName: "CreateConfiguredTableAnalysisRule",
}));

export type CreateConfiguredTableAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a configured table association. A configured table association links a configured table with a collaboration.
 */
export const createConfiguredTableAssociation: API.OperationMethod<
  CreateConfiguredTableAssociationInput,
  CreateConfiguredTableAssociationOutput,
  CreateConfiguredTableAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConfiguredTableAssociationInput,
  output: CreateConfiguredTableAssociationOutput,
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
  operationName: "CreateConfiguredTableAssociation",
}));

export type CreateConfiguredTableAssociationAnalysisRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new analysis rule for an associated configured table.
 */
export const createConfiguredTableAssociationAnalysisRule: API.OperationMethod<
  CreateConfiguredTableAssociationAnalysisRuleInput,
  CreateConfiguredTableAssociationAnalysisRuleOutput,
  CreateConfiguredTableAssociationAnalysisRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConfiguredTableAssociationAnalysisRuleInput,
  output: CreateConfiguredTableAssociationAnalysisRuleOutput,
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
  operationName: "CreateConfiguredTableAssociationAnalysisRule",
}));

export type CreateIdMappingTableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an ID mapping table.
 */
export const createIdMappingTable: API.OperationMethod<
  CreateIdMappingTableInput,
  CreateIdMappingTableOutput,
  CreateIdMappingTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIdMappingTableInput,
  output: CreateIdMappingTableOutput,
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
  operationName: "CreateIdMappingTable",
}));

export type CreateIdNamespaceAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an ID namespace association.
 */
export const createIdNamespaceAssociation: API.OperationMethod<
  CreateIdNamespaceAssociationInput,
  CreateIdNamespaceAssociationOutput,
  CreateIdNamespaceAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIdNamespaceAssociationInput,
  output: CreateIdNamespaceAssociationOutput,
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
  operationName: "CreateIdNamespaceAssociation",
}));

export type CreateMembershipError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a membership for a specific collaboration identifier and joins the collaboration.
 */
export const createMembership: API.OperationMethod<
  CreateMembershipInput,
  CreateMembershipOutput,
  CreateMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMembershipInput,
  output: CreateMembershipOutput,
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
  operationName: "CreateMembership",
}));

export type CreatePrivacyBudgetTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a privacy budget template for a specified collaboration. Each collaboration can have only one privacy budget template. If you need to change the privacy budget template, use the UpdatePrivacyBudgetTemplate operation.
 */
export const createPrivacyBudgetTemplate: API.OperationMethod<
  CreatePrivacyBudgetTemplateInput,
  CreatePrivacyBudgetTemplateOutput,
  CreatePrivacyBudgetTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePrivacyBudgetTemplateInput,
  output: CreatePrivacyBudgetTemplateOutput,
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
  operationName: "CreatePrivacyBudgetTemplate",
}));

export type DeleteAnalysisTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an analysis template.
 */
export const deleteAnalysisTemplate: API.OperationMethod<
  DeleteAnalysisTemplateInput,
  DeleteAnalysisTemplateOutput,
  DeleteAnalysisTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAnalysisTemplateInput,
  output: DeleteAnalysisTemplateOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAnalysisTemplate",
}));

export type DeleteCollaborationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a collaboration. It can only be called by the collaboration owner.
 */
export const deleteCollaboration: API.OperationMethod<
  DeleteCollaborationInput,
  DeleteCollaborationOutput,
  DeleteCollaborationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCollaborationInput,
  output: DeleteCollaborationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCollaboration",
}));

export type DeleteConfiguredAudienceModelAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides the information necessary to delete a configured audience model association.
 */
export const deleteConfiguredAudienceModelAssociation: API.OperationMethod<
  DeleteConfiguredAudienceModelAssociationInput,
  DeleteConfiguredAudienceModelAssociationOutput,
  DeleteConfiguredAudienceModelAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfiguredAudienceModelAssociationInput,
  output: DeleteConfiguredAudienceModelAssociationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfiguredAudienceModelAssociation",
}));

export type DeleteConfiguredTableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a configured table.
 */
export const deleteConfiguredTable: API.OperationMethod<
  DeleteConfiguredTableInput,
  DeleteConfiguredTableOutput,
  DeleteConfiguredTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfiguredTableInput,
  output: DeleteConfiguredTableOutput,
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
  operationName: "DeleteConfiguredTable",
}));

export type DeleteConfiguredTableAnalysisRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a configured table analysis rule.
 */
export const deleteConfiguredTableAnalysisRule: API.OperationMethod<
  DeleteConfiguredTableAnalysisRuleInput,
  DeleteConfiguredTableAnalysisRuleOutput,
  DeleteConfiguredTableAnalysisRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfiguredTableAnalysisRuleInput,
  output: DeleteConfiguredTableAnalysisRuleOutput,
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
  operationName: "DeleteConfiguredTableAnalysisRule",
}));

export type DeleteConfiguredTableAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a configured table association.
 */
export const deleteConfiguredTableAssociation: API.OperationMethod<
  DeleteConfiguredTableAssociationInput,
  DeleteConfiguredTableAssociationOutput,
  DeleteConfiguredTableAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfiguredTableAssociationInput,
  output: DeleteConfiguredTableAssociationOutput,
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
  operationName: "DeleteConfiguredTableAssociation",
}));

export type DeleteConfiguredTableAssociationAnalysisRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an analysis rule for a configured table association.
 */
export const deleteConfiguredTableAssociationAnalysisRule: API.OperationMethod<
  DeleteConfiguredTableAssociationAnalysisRuleInput,
  DeleteConfiguredTableAssociationAnalysisRuleOutput,
  DeleteConfiguredTableAssociationAnalysisRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfiguredTableAssociationAnalysisRuleInput,
  output: DeleteConfiguredTableAssociationAnalysisRuleOutput,
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
  operationName: "DeleteConfiguredTableAssociationAnalysisRule",
}));

export type DeleteIdMappingTableError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an ID mapping table.
 */
export const deleteIdMappingTable: API.OperationMethod<
  DeleteIdMappingTableInput,
  DeleteIdMappingTableOutput,
  DeleteIdMappingTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIdMappingTableInput,
  output: DeleteIdMappingTableOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdMappingTable",
}));

export type DeleteIdNamespaceAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an ID namespace association.
 */
export const deleteIdNamespaceAssociation: API.OperationMethod<
  DeleteIdNamespaceAssociationInput,
  DeleteIdNamespaceAssociationOutput,
  DeleteIdNamespaceAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIdNamespaceAssociationInput,
  output: DeleteIdNamespaceAssociationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdNamespaceAssociation",
}));

export type DeleteMemberError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified member from a collaboration. The removed member is placed in the Removed status and can't interact with the collaboration. The removed member's data is inaccessible to active members of the collaboration.
 */
export const deleteMember: API.OperationMethod<
  DeleteMemberInput,
  DeleteMemberOutput,
  DeleteMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMemberInput,
  output: DeleteMemberOutput,
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
  operationName: "DeleteMember",
}));

export type DeleteMembershipError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specified membership. All resources under a membership must be deleted.
 */
export const deleteMembership: API.OperationMethod<
  DeleteMembershipInput,
  DeleteMembershipOutput,
  DeleteMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMembershipInput,
  output: DeleteMembershipOutput,
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
  operationName: "DeleteMembership",
}));

export type DeletePrivacyBudgetTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a privacy budget template for a specified collaboration.
 */
export const deletePrivacyBudgetTemplate: API.OperationMethod<
  DeletePrivacyBudgetTemplateInput,
  DeletePrivacyBudgetTemplateOutput,
  DeletePrivacyBudgetTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePrivacyBudgetTemplateInput,
  output: DeletePrivacyBudgetTemplateOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePrivacyBudgetTemplate",
}));

export type GetAnalysisTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves an analysis template.
 */
export const getAnalysisTemplate: API.OperationMethod<
  GetAnalysisTemplateInput,
  GetAnalysisTemplateOutput,
  GetAnalysisTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAnalysisTemplateInput,
  output: GetAnalysisTemplateOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAnalysisTemplate",
}));

export type GetCollaborationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns metadata about a collaboration.
 */
export const getCollaboration: API.OperationMethod<
  GetCollaborationInput,
  GetCollaborationOutput,
  GetCollaborationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCollaborationInput,
  output: GetCollaborationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCollaboration",
}));

export type GetCollaborationAnalysisTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves an analysis template within a collaboration.
 */
export const getCollaborationAnalysisTemplate: API.OperationMethod<
  GetCollaborationAnalysisTemplateInput,
  GetCollaborationAnalysisTemplateOutput,
  GetCollaborationAnalysisTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCollaborationAnalysisTemplateInput,
  output: GetCollaborationAnalysisTemplateOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCollaborationAnalysisTemplate",
}));

export type GetCollaborationChangeRequestError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific collaboration change request.
 */
export const getCollaborationChangeRequest: API.OperationMethod<
  GetCollaborationChangeRequestInput,
  GetCollaborationChangeRequestOutput,
  GetCollaborationChangeRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCollaborationChangeRequestInput,
  output: GetCollaborationChangeRequestOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCollaborationChangeRequest",
}));

export type GetCollaborationConfiguredAudienceModelAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a configured audience model association within a collaboration.
 */
export const getCollaborationConfiguredAudienceModelAssociation: API.OperationMethod<
  GetCollaborationConfiguredAudienceModelAssociationInput,
  GetCollaborationConfiguredAudienceModelAssociationOutput,
  GetCollaborationConfiguredAudienceModelAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCollaborationConfiguredAudienceModelAssociationInput,
  output: GetCollaborationConfiguredAudienceModelAssociationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCollaborationConfiguredAudienceModelAssociation",
}));

export type GetCollaborationIdNamespaceAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves an ID namespace association from a specific collaboration.
 */
export const getCollaborationIdNamespaceAssociation: API.OperationMethod<
  GetCollaborationIdNamespaceAssociationInput,
  GetCollaborationIdNamespaceAssociationOutput,
  GetCollaborationIdNamespaceAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCollaborationIdNamespaceAssociationInput,
  output: GetCollaborationIdNamespaceAssociationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCollaborationIdNamespaceAssociation",
}));

export type GetCollaborationPrivacyBudgetTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details about a specified privacy budget template.
 */
export const getCollaborationPrivacyBudgetTemplate: API.OperationMethod<
  GetCollaborationPrivacyBudgetTemplateInput,
  GetCollaborationPrivacyBudgetTemplateOutput,
  GetCollaborationPrivacyBudgetTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCollaborationPrivacyBudgetTemplateInput,
  output: GetCollaborationPrivacyBudgetTemplateOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCollaborationPrivacyBudgetTemplate",
}));

export type GetConfiguredAudienceModelAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a configured audience model association.
 */
export const getConfiguredAudienceModelAssociation: API.OperationMethod<
  GetConfiguredAudienceModelAssociationInput,
  GetConfiguredAudienceModelAssociationOutput,
  GetConfiguredAudienceModelAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConfiguredAudienceModelAssociationInput,
  output: GetConfiguredAudienceModelAssociationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfiguredAudienceModelAssociation",
}));

export type GetConfiguredTableError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a configured table.
 */
export const getConfiguredTable: API.OperationMethod<
  GetConfiguredTableInput,
  GetConfiguredTableOutput,
  GetConfiguredTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConfiguredTableInput,
  output: GetConfiguredTableOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfiguredTable",
}));

export type GetConfiguredTableAnalysisRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a configured table analysis rule.
 */
export const getConfiguredTableAnalysisRule: API.OperationMethod<
  GetConfiguredTableAnalysisRuleInput,
  GetConfiguredTableAnalysisRuleOutput,
  GetConfiguredTableAnalysisRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConfiguredTableAnalysisRuleInput,
  output: GetConfiguredTableAnalysisRuleOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfiguredTableAnalysisRule",
}));

export type GetConfiguredTableAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a configured table association.
 */
export const getConfiguredTableAssociation: API.OperationMethod<
  GetConfiguredTableAssociationInput,
  GetConfiguredTableAssociationOutput,
  GetConfiguredTableAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConfiguredTableAssociationInput,
  output: GetConfiguredTableAssociationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfiguredTableAssociation",
}));

export type GetConfiguredTableAssociationAnalysisRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the analysis rule for a configured table association.
 */
export const getConfiguredTableAssociationAnalysisRule: API.OperationMethod<
  GetConfiguredTableAssociationAnalysisRuleInput,
  GetConfiguredTableAssociationAnalysisRuleOutput,
  GetConfiguredTableAssociationAnalysisRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConfiguredTableAssociationAnalysisRuleInput,
  output: GetConfiguredTableAssociationAnalysisRuleOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfiguredTableAssociationAnalysisRule",
}));

export type GetIdMappingTableError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves an ID mapping table.
 */
export const getIdMappingTable: API.OperationMethod<
  GetIdMappingTableInput,
  GetIdMappingTableOutput,
  GetIdMappingTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIdMappingTableInput,
  output: GetIdMappingTableOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdMappingTable",
}));

export type GetIdNamespaceAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves an ID namespace association.
 */
export const getIdNamespaceAssociation: API.OperationMethod<
  GetIdNamespaceAssociationInput,
  GetIdNamespaceAssociationOutput,
  GetIdNamespaceAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIdNamespaceAssociationInput,
  output: GetIdNamespaceAssociationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdNamespaceAssociation",
}));

export type GetMembershipError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a specified membership for an identifier.
 */
export const getMembership: API.OperationMethod<
  GetMembershipInput,
  GetMembershipOutput,
  GetMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMembershipInput,
  output: GetMembershipOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMembership",
}));

export type GetPrivacyBudgetTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details for a specified privacy budget template.
 */
export const getPrivacyBudgetTemplate: API.OperationMethod<
  GetPrivacyBudgetTemplateInput,
  GetPrivacyBudgetTemplateOutput,
  GetPrivacyBudgetTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPrivacyBudgetTemplateInput,
  output: GetPrivacyBudgetTemplateOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPrivacyBudgetTemplate",
}));

export type GetProtectedJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns job processing metadata.
 */
export const getProtectedJob: API.OperationMethod<
  GetProtectedJobInput,
  GetProtectedJobOutput,
  GetProtectedJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProtectedJobInput,
  output: GetProtectedJobOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProtectedJob",
}));

export type GetProtectedQueryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns query processing metadata.
 */
export const getProtectedQuery: API.OperationMethod<
  GetProtectedQueryInput,
  GetProtectedQueryOutput,
  GetProtectedQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProtectedQueryInput,
  output: GetProtectedQueryOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProtectedQuery",
}));

export type GetSchemaError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the schema for a relation within a collaboration.
 */
export const getSchema: API.OperationMethod<
  GetSchemaInput,
  GetSchemaOutput,
  GetSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSchemaInput,
  output: GetSchemaOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSchema",
}));

export type GetSchemaAnalysisRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a schema analysis rule.
 */
export const getSchemaAnalysisRule: API.OperationMethod<
  GetSchemaAnalysisRuleInput,
  GetSchemaAnalysisRuleOutput,
  GetSchemaAnalysisRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSchemaAnalysisRuleInput,
  output: GetSchemaAnalysisRuleOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSchemaAnalysisRule",
}));

export type ListAnalysisTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists analysis templates that the caller owns.
 */
export const listAnalysisTemplates: API.PaginatedOperationMethod<
  ListAnalysisTemplatesInput,
  ListAnalysisTemplatesOutput,
  ListAnalysisTemplatesError,
  Credentials | HttpClient.HttpClient,
  AnalysisTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAnalysisTemplatesInput,
  output: ListAnalysisTemplatesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAnalysisTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "analysisTemplateSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCollaborationAnalysisTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists analysis templates within a collaboration.
 */
export const listCollaborationAnalysisTemplates: API.PaginatedOperationMethod<
  ListCollaborationAnalysisTemplatesInput,
  ListCollaborationAnalysisTemplatesOutput,
  ListCollaborationAnalysisTemplatesError,
  Credentials | HttpClient.HttpClient,
  CollaborationAnalysisTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCollaborationAnalysisTemplatesInput,
  output: ListCollaborationAnalysisTemplatesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCollaborationAnalysisTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "collaborationAnalysisTemplateSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCollaborationChangeRequestsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all change requests for a collaboration with pagination support. Returns change requests sorted by creation time.
 */
export const listCollaborationChangeRequests: API.PaginatedOperationMethod<
  ListCollaborationChangeRequestsInput,
  ListCollaborationChangeRequestsOutput,
  ListCollaborationChangeRequestsError,
  Credentials | HttpClient.HttpClient,
  CollaborationChangeRequestSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCollaborationChangeRequestsInput,
  output: ListCollaborationChangeRequestsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCollaborationChangeRequests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "collaborationChangeRequestSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCollaborationConfiguredAudienceModelAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists configured audience model associations within a collaboration.
 */
export const listCollaborationConfiguredAudienceModelAssociations: API.PaginatedOperationMethod<
  ListCollaborationConfiguredAudienceModelAssociationsInput,
  ListCollaborationConfiguredAudienceModelAssociationsOutput,
  ListCollaborationConfiguredAudienceModelAssociationsError,
  Credentials | HttpClient.HttpClient,
  CollaborationConfiguredAudienceModelAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCollaborationConfiguredAudienceModelAssociationsInput,
  output: ListCollaborationConfiguredAudienceModelAssociationsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCollaborationConfiguredAudienceModelAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "collaborationConfiguredAudienceModelAssociationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCollaborationIdNamespaceAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the ID namespace associations in a collaboration.
 */
export const listCollaborationIdNamespaceAssociations: API.PaginatedOperationMethod<
  ListCollaborationIdNamespaceAssociationsInput,
  ListCollaborationIdNamespaceAssociationsOutput,
  ListCollaborationIdNamespaceAssociationsError,
  Credentials | HttpClient.HttpClient,
  CollaborationIdNamespaceAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCollaborationIdNamespaceAssociationsInput,
  output: ListCollaborationIdNamespaceAssociationsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCollaborationIdNamespaceAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "collaborationIdNamespaceAssociationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCollaborationPrivacyBudgetsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns an array that summarizes each privacy budget in a specified collaboration. The summary includes the collaboration ARN, creation time, creating account, and privacy budget details.
 */
export const listCollaborationPrivacyBudgets: API.PaginatedOperationMethod<
  ListCollaborationPrivacyBudgetsInput,
  ListCollaborationPrivacyBudgetsOutput,
  ListCollaborationPrivacyBudgetsError,
  Credentials | HttpClient.HttpClient,
  CollaborationPrivacyBudgetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCollaborationPrivacyBudgetsInput,
  output: ListCollaborationPrivacyBudgetsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCollaborationPrivacyBudgets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "collaborationPrivacyBudgetSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCollaborationPrivacyBudgetTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns an array that summarizes each privacy budget template in a specified collaboration.
 */
export const listCollaborationPrivacyBudgetTemplates: API.PaginatedOperationMethod<
  ListCollaborationPrivacyBudgetTemplatesInput,
  ListCollaborationPrivacyBudgetTemplatesOutput,
  ListCollaborationPrivacyBudgetTemplatesError,
  Credentials | HttpClient.HttpClient,
  CollaborationPrivacyBudgetTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCollaborationPrivacyBudgetTemplatesInput,
  output: ListCollaborationPrivacyBudgetTemplatesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCollaborationPrivacyBudgetTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "collaborationPrivacyBudgetTemplateSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCollaborationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists collaborations the caller owns, is active in, or has been invited to.
 */
export const listCollaborations: API.PaginatedOperationMethod<
  ListCollaborationsInput,
  ListCollaborationsOutput,
  ListCollaborationsError,
  Credentials | HttpClient.HttpClient,
  CollaborationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCollaborationsInput,
  output: ListCollaborationsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCollaborations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "collaborationList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConfiguredAudienceModelAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists information about requested configured audience model associations.
 */
export const listConfiguredAudienceModelAssociations: API.PaginatedOperationMethod<
  ListConfiguredAudienceModelAssociationsInput,
  ListConfiguredAudienceModelAssociationsOutput,
  ListConfiguredAudienceModelAssociationsError,
  Credentials | HttpClient.HttpClient,
  ConfiguredAudienceModelAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConfiguredAudienceModelAssociationsInput,
  output: ListConfiguredAudienceModelAssociationsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfiguredAudienceModelAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "configuredAudienceModelAssociationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConfiguredTableAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists configured table associations for a membership.
 */
export const listConfiguredTableAssociations: API.PaginatedOperationMethod<
  ListConfiguredTableAssociationsInput,
  ListConfiguredTableAssociationsOutput,
  ListConfiguredTableAssociationsError,
  Credentials | HttpClient.HttpClient,
  ConfiguredTableAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConfiguredTableAssociationsInput,
  output: ListConfiguredTableAssociationsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfiguredTableAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "configuredTableAssociationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConfiguredTablesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists configured tables.
 */
export const listConfiguredTables: API.PaginatedOperationMethod<
  ListConfiguredTablesInput,
  ListConfiguredTablesOutput,
  ListConfiguredTablesError,
  Credentials | HttpClient.HttpClient,
  ConfiguredTableSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConfiguredTablesInput,
  output: ListConfiguredTablesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfiguredTables",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "configuredTableSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIdMappingTablesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of ID mapping tables.
 */
export const listIdMappingTables: API.PaginatedOperationMethod<
  ListIdMappingTablesInput,
  ListIdMappingTablesOutput,
  ListIdMappingTablesError,
  Credentials | HttpClient.HttpClient,
  IdMappingTableSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIdMappingTablesInput,
  output: ListIdMappingTablesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdMappingTables",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "idMappingTableSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIdNamespaceAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of ID namespace associations.
 */
export const listIdNamespaceAssociations: API.PaginatedOperationMethod<
  ListIdNamespaceAssociationsInput,
  ListIdNamespaceAssociationsOutput,
  ListIdNamespaceAssociationsError,
  Credentials | HttpClient.HttpClient,
  IdNamespaceAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIdNamespaceAssociationsInput,
  output: ListIdNamespaceAssociationsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdNamespaceAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "idNamespaceAssociationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMembersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all members within a collaboration.
 */
export const listMembers: API.PaginatedOperationMethod<
  ListMembersInput,
  ListMembersOutput,
  ListMembersError,
  Credentials | HttpClient.HttpClient,
  MemberSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMembersInput,
  output: ListMembersOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMembers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "memberSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMembershipsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all memberships resources within the caller's account.
 */
export const listMemberships: API.PaginatedOperationMethod<
  ListMembershipsInput,
  ListMembershipsOutput,
  ListMembershipsError,
  Credentials | HttpClient.HttpClient,
  MembershipSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMembershipsInput,
  output: ListMembershipsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMemberships",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "membershipSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPrivacyBudgetsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns detailed information about the privacy budgets in a specified membership.
 */
export const listPrivacyBudgets: API.PaginatedOperationMethod<
  ListPrivacyBudgetsInput,
  ListPrivacyBudgetsOutput,
  ListPrivacyBudgetsError,
  Credentials | HttpClient.HttpClient,
  PrivacyBudgetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPrivacyBudgetsInput,
  output: ListPrivacyBudgetsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPrivacyBudgets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "privacyBudgetSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPrivacyBudgetTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns detailed information about the privacy budget templates in a specified membership.
 */
export const listPrivacyBudgetTemplates: API.PaginatedOperationMethod<
  ListPrivacyBudgetTemplatesInput,
  ListPrivacyBudgetTemplatesOutput,
  ListPrivacyBudgetTemplatesError,
  Credentials | HttpClient.HttpClient,
  PrivacyBudgetTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPrivacyBudgetTemplatesInput,
  output: ListPrivacyBudgetTemplatesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPrivacyBudgetTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "privacyBudgetTemplateSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProtectedJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists protected jobs, sorted by most recent job.
 */
export const listProtectedJobs: API.PaginatedOperationMethod<
  ListProtectedJobsInput,
  ListProtectedJobsOutput,
  ListProtectedJobsError,
  Credentials | HttpClient.HttpClient,
  ProtectedJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProtectedJobsInput,
  output: ListProtectedJobsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProtectedJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "protectedJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProtectedQueriesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists protected queries, sorted by the most recent query.
 */
export const listProtectedQueries: API.PaginatedOperationMethod<
  ListProtectedQueriesInput,
  ListProtectedQueriesOutput,
  ListProtectedQueriesError,
  Credentials | HttpClient.HttpClient,
  ProtectedQuerySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProtectedQueriesInput,
  output: ListProtectedQueriesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProtectedQueries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "protectedQueries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSchemasError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the schemas for relations within a collaboration.
 */
export const listSchemas: API.PaginatedOperationMethod<
  ListSchemasInput,
  ListSchemasOutput,
  ListSchemasError,
  Credentials | HttpClient.HttpClient,
  SchemaSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSchemasInput,
  output: ListSchemasOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSchemas",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "schemaSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all of the tags that have been added to a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PopulateIdMappingTableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Defines the information that's necessary to populate an ID mapping table.
 */
export const populateIdMappingTable: API.OperationMethod<
  PopulateIdMappingTableInput,
  PopulateIdMappingTableOutput,
  PopulateIdMappingTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PopulateIdMappingTableInput,
  output: PopulateIdMappingTableOutput,
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
  operationName: "PopulateIdMappingTable",
}));

export type PreviewPrivacyImpactError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * An estimate of the number of aggregation functions that the member who can query can run given epsilon and noise parameters.
 */
export const previewPrivacyImpact: API.OperationMethod<
  PreviewPrivacyImpactInput,
  PreviewPrivacyImpactOutput,
  PreviewPrivacyImpactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PreviewPrivacyImpactInput,
  output: PreviewPrivacyImpactOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PreviewPrivacyImpact",
}));

export type StartProtectedJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a protected job that is started by Clean Rooms.
 */
export const startProtectedJob: API.OperationMethod<
  StartProtectedJobInput,
  StartProtectedJobOutput,
  StartProtectedJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartProtectedJobInput,
  output: StartProtectedJobOutput,
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
  operationName: "StartProtectedJob",
}));

export type StartProtectedQueryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a protected query that is started by Clean Rooms.
 */
export const startProtectedQuery: API.OperationMethod<
  StartProtectedQueryInput,
  StartProtectedQueryOutput,
  StartProtectedQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartProtectedQueryInput,
  output: StartProtectedQueryOutput,
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
  operationName: "StartProtectedQuery",
}));

export type TagResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Tags a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceOutput,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag or list of tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceOutput,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAnalysisTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the analysis template metadata.
 */
export const updateAnalysisTemplate: API.OperationMethod<
  UpdateAnalysisTemplateInput,
  UpdateAnalysisTemplateOutput,
  UpdateAnalysisTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAnalysisTemplateInput,
  output: UpdateAnalysisTemplateOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAnalysisTemplate",
}));

export type UpdateCollaborationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates collaboration metadata and can only be called by the collaboration owner.
 */
export const updateCollaboration: API.OperationMethod<
  UpdateCollaborationInput,
  UpdateCollaborationOutput,
  UpdateCollaborationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCollaborationInput,
  output: UpdateCollaborationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCollaboration",
}));

export type UpdateCollaborationChangeRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing collaboration change request. This operation allows approval actions for pending change requests in collaborations (APPROVE, DENY, CANCEL, COMMIT).
 *
 * For change requests without automatic approval, a member in the collaboration can manually APPROVE or DENY a change request. The collaboration owner can manually CANCEL or COMMIT a change request.
 */
export const updateCollaborationChangeRequest: API.OperationMethod<
  UpdateCollaborationChangeRequestInput,
  UpdateCollaborationChangeRequestOutput,
  UpdateCollaborationChangeRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCollaborationChangeRequestInput,
  output: UpdateCollaborationChangeRequestOutput,
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
  operationName: "UpdateCollaborationChangeRequest",
}));

export type UpdateConfiguredAudienceModelAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides the details necessary to update a configured audience model association.
 */
export const updateConfiguredAudienceModelAssociation: API.OperationMethod<
  UpdateConfiguredAudienceModelAssociationInput,
  UpdateConfiguredAudienceModelAssociationOutput,
  UpdateConfiguredAudienceModelAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConfiguredAudienceModelAssociationInput,
  output: UpdateConfiguredAudienceModelAssociationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfiguredAudienceModelAssociation",
}));

export type UpdateConfiguredTableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a configured table.
 */
export const updateConfiguredTable: API.OperationMethod<
  UpdateConfiguredTableInput,
  UpdateConfiguredTableOutput,
  UpdateConfiguredTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConfiguredTableInput,
  output: UpdateConfiguredTableOutput,
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
  operationName: "UpdateConfiguredTable",
}));

export type UpdateConfiguredTableAnalysisRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a configured table analysis rule.
 */
export const updateConfiguredTableAnalysisRule: API.OperationMethod<
  UpdateConfiguredTableAnalysisRuleInput,
  UpdateConfiguredTableAnalysisRuleOutput,
  UpdateConfiguredTableAnalysisRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConfiguredTableAnalysisRuleInput,
  output: UpdateConfiguredTableAnalysisRuleOutput,
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
  operationName: "UpdateConfiguredTableAnalysisRule",
}));

export type UpdateConfiguredTableAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a configured table association.
 */
export const updateConfiguredTableAssociation: API.OperationMethod<
  UpdateConfiguredTableAssociationInput,
  UpdateConfiguredTableAssociationOutput,
  UpdateConfiguredTableAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConfiguredTableAssociationInput,
  output: UpdateConfiguredTableAssociationOutput,
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
  operationName: "UpdateConfiguredTableAssociation",
}));

export type UpdateConfiguredTableAssociationAnalysisRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the analysis rule for a configured table association.
 */
export const updateConfiguredTableAssociationAnalysisRule: API.OperationMethod<
  UpdateConfiguredTableAssociationAnalysisRuleInput,
  UpdateConfiguredTableAssociationAnalysisRuleOutput,
  UpdateConfiguredTableAssociationAnalysisRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConfiguredTableAssociationAnalysisRuleInput,
  output: UpdateConfiguredTableAssociationAnalysisRuleOutput,
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
  operationName: "UpdateConfiguredTableAssociationAnalysisRule",
}));

export type UpdateIdMappingTableError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides the details that are necessary to update an ID mapping table.
 */
export const updateIdMappingTable: API.OperationMethod<
  UpdateIdMappingTableInput,
  UpdateIdMappingTableOutput,
  UpdateIdMappingTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIdMappingTableInput,
  output: UpdateIdMappingTableOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIdMappingTable",
}));

export type UpdateIdNamespaceAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides the details that are necessary to update an ID namespace association.
 */
export const updateIdNamespaceAssociation: API.OperationMethod<
  UpdateIdNamespaceAssociationInput,
  UpdateIdNamespaceAssociationOutput,
  UpdateIdNamespaceAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIdNamespaceAssociationInput,
  output: UpdateIdNamespaceAssociationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIdNamespaceAssociation",
}));

export type UpdateMembershipError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a membership.
 */
export const updateMembership: API.OperationMethod<
  UpdateMembershipInput,
  UpdateMembershipOutput,
  UpdateMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMembershipInput,
  output: UpdateMembershipOutput,
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
  operationName: "UpdateMembership",
}));

export type UpdatePrivacyBudgetTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the privacy budget template for the specified collaboration.
 */
export const updatePrivacyBudgetTemplate: API.OperationMethod<
  UpdatePrivacyBudgetTemplateInput,
  UpdatePrivacyBudgetTemplateOutput,
  UpdatePrivacyBudgetTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePrivacyBudgetTemplateInput,
  output: UpdatePrivacyBudgetTemplateOutput,
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
  operationName: "UpdatePrivacyBudgetTemplate",
}));

export type UpdateProtectedJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the processing of a currently running job.
 */
export const updateProtectedJob: API.OperationMethod<
  UpdateProtectedJobInput,
  UpdateProtectedJobOutput,
  UpdateProtectedJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProtectedJobInput,
  output: UpdateProtectedJobOutput,
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
  operationName: "UpdateProtectedJob",
}));

export type UpdateProtectedQueryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the processing of a currently running query.
 */
export const updateProtectedQuery: API.OperationMethod<
  UpdateProtectedQueryInput,
  UpdateProtectedQueryOutput,
  UpdateProtectedQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProtectedQueryInput,
  output: UpdateProtectedQueryOutput,
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
  operationName: "UpdateProtectedQuery",
}));
