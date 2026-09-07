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
  sdkId: "EntityResolution",
  serviceShapeName: "AWSVeniceService",
});
const auth = T.AwsAuthSigv4({ name: "entityresolution" });
const ver = T.ServiceVersion("2018-05-10");
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
              `https://entityresolution-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://entityresolution-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://entityresolution.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://entityresolution.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ExceedsLimitException
  extends /*@__PURE__*/ S.TaggedError<ExceedsLimitException>()(
    "ExceedsLimitException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      quotaName: S.optional(S.String),
      quotaValue: S.optional(S.Number),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type VeniceGlobalArn = string;
export type StatementId = string;
export type StatementEffect = "Allow" | "Deny" | (string & {});
export const StatementEffect = S.String;

export type StatementAction = string;
export type StatementActionList = string[];
export const StatementActionList = /*@__PURE__*/ S.Array(S.String);
export type StatementPrincipal = string;
export type StatementPrincipalList = string[];
export const StatementPrincipalList = /*@__PURE__*/ S.Array(S.String);
export type StatementCondition = string;
export interface AddPolicyStatementInput {
  arn: string;
  statementId: string;
  effect: StatementEffect;
  action: string[];
  principal: string[];
  condition?: string;
}
export const AddPolicyStatementInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String.pipe(T.HttpLabel("arn")),
    statementId: S.String.pipe(T.HttpLabel("statementId")),
    effect: StatementEffect,
    action: StatementActionList,
    principal: StatementPrincipalList,
    condition: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/policies/{arn}/{statementId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AddPolicyStatementInput",
}) as any as S.Schema<AddPolicyStatementInput>;
export type PolicyToken = string;
export type PolicyDocument = string;
export interface AddPolicyStatementOutput {
  arn: string;
  token: string;
  policy?: string;
}
export const AddPolicyStatementOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, token: S.String, policy: S.optional(S.String) }),
).annotate({
  identifier: "AddPolicyStatementOutput",
}) as any as S.Schema<AddPolicyStatementOutput>;
export type EntityName = string;
export type HeaderSafeUniqueId = string;
export type UniqueIdList = string[];
export const UniqueIdList = /*@__PURE__*/ S.Array(S.String);
export interface BatchDeleteUniqueIdInput {
  workflowName: string;
  inputSource?: string;
  uniqueIds: string[];
}
export const BatchDeleteUniqueIdInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowName: S.String.pipe(T.HttpLabel("workflowName")),
    inputSource: S.optional(S.String).pipe(T.HttpHeader("inputSource")),
    uniqueIds: UniqueIdList.pipe(T.HttpHeader("uniqueIds")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/matchingworkflows/{workflowName}/uniqueids",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchDeleteUniqueIdInput",
}) as any as S.Schema<BatchDeleteUniqueIdInput>;
export type DeleteUniqueIdStatus = "COMPLETED" | "ACCEPTED" | (string & {});
export const DeleteUniqueIdStatus = S.String;

export type DeleteUniqueIdErrorType =
  | "SERVICE_ERROR"
  | "VALIDATION_ERROR"
  | (string & {});
export const DeleteUniqueIdErrorType = S.String;

export interface DeleteUniqueIdError {
  uniqueId: string;
  errorType: DeleteUniqueIdErrorType;
}
export const DeleteUniqueIdError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ uniqueId: S.String, errorType: DeleteUniqueIdErrorType }),
).annotate({
  identifier: "DeleteUniqueIdError",
}) as any as S.Schema<DeleteUniqueIdError>;
export type DeleteUniqueIdErrorsList = DeleteUniqueIdError[];
export const DeleteUniqueIdErrorsList =
  /*@__PURE__*/ S.Array(DeleteUniqueIdError);
export interface DeletedUniqueId {
  uniqueId: string;
}
export const DeletedUniqueId = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ uniqueId: S.String }),
).annotate({
  identifier: "DeletedUniqueId",
}) as any as S.Schema<DeletedUniqueId>;
export type DeletedUniqueIdList = DeletedUniqueId[];
export const DeletedUniqueIdList = /*@__PURE__*/ S.Array(DeletedUniqueId);
export type DisconnectedUniqueIdsList = string[];
export const DisconnectedUniqueIdsList = /*@__PURE__*/ S.Array(S.String);
export interface BatchDeleteUniqueIdOutput {
  status: DeleteUniqueIdStatus;
  errors?: DeleteUniqueIdError[];
  deleted?: DeletedUniqueId[];
  disconnectedUniqueIds?: string[];
}
export const BatchDeleteUniqueIdOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: DeleteUniqueIdStatus,
    errors: S.optional(DeleteUniqueIdErrorsList),
    deleted: S.optional(DeletedUniqueIdList),
    disconnectedUniqueIds: S.optional(DisconnectedUniqueIdsList),
  }),
).annotate({
  identifier: "BatchDeleteUniqueIdOutput",
}) as any as S.Schema<BatchDeleteUniqueIdOutput>;
export type Description = string;
export type InputSourceARN = string;
export type IdNamespaceType = "SOURCE" | "TARGET" | (string & {});
export const IdNamespaceType = S.String;

export interface IdMappingWorkflowInputSource {
  inputSourceARN: string;
  schemaName?: string;
  type?: IdNamespaceType;
}
export const IdMappingWorkflowInputSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inputSourceARN: S.String,
    schemaName: S.optional(S.String),
    type: S.optional(IdNamespaceType),
  }),
).annotate({
  identifier: "IdMappingWorkflowInputSource",
}) as any as S.Schema<IdMappingWorkflowInputSource>;
export type IdMappingWorkflowInputSourceConfig = IdMappingWorkflowInputSource[];
export const IdMappingWorkflowInputSourceConfig = /*@__PURE__*/ S.Array(
  IdMappingWorkflowInputSource,
);
export type KMSArn = string;
export type S3Path = string;
export interface IdMappingWorkflowOutputSource {
  KMSArn?: string;
  outputS3Path: string;
}
export const IdMappingWorkflowOutputSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ KMSArn: S.optional(S.String), outputS3Path: S.String }),
).annotate({
  identifier: "IdMappingWorkflowOutputSource",
}) as any as S.Schema<IdMappingWorkflowOutputSource>;
export type IdMappingWorkflowOutputSourceConfig =
  IdMappingWorkflowOutputSource[];
export const IdMappingWorkflowOutputSourceConfig = /*@__PURE__*/ S.Array(
  IdMappingWorkflowOutputSource,
);
export type IdMappingType = "PROVIDER" | "RULE_BASED" | (string & {});
export const IdMappingType = S.String;

export type AttributeName = string;
export type MatchingKeys = string[];
export const MatchingKeys = /*@__PURE__*/ S.Array(S.String);
export interface Rule {
  ruleName: string;
  matchingKeys: string[];
}
export const Rule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ruleName: S.String, matchingKeys: MatchingKeys }),
).annotate({ identifier: "Rule" }) as any as S.Schema<Rule>;
export type RuleList = Rule[];
export const RuleList = /*@__PURE__*/ S.Array(Rule);
export type IdMappingWorkflowRuleDefinitionType =
  | "SOURCE"
  | "TARGET"
  | (string & {});
export const IdMappingWorkflowRuleDefinitionType = S.String;

export type AttributeMatchingModel =
  | "ONE_TO_ONE"
  | "MANY_TO_MANY"
  | (string & {});
export const AttributeMatchingModel = S.String;

export type RecordMatchingModel =
  | "ONE_SOURCE_TO_ONE_TARGET"
  | "MANY_SOURCE_TO_ONE_TARGET"
  | (string & {});
export const RecordMatchingModel = S.String;

export interface IdMappingRuleBasedProperties {
  rules?: Rule[];
  ruleDefinitionType: IdMappingWorkflowRuleDefinitionType;
  attributeMatchingModel: AttributeMatchingModel;
  recordMatchingModel: RecordMatchingModel;
}
export const IdMappingRuleBasedProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    rules: S.optional(RuleList),
    ruleDefinitionType: IdMappingWorkflowRuleDefinitionType,
    attributeMatchingModel: AttributeMatchingModel,
    recordMatchingModel: RecordMatchingModel,
  }),
).annotate({
  identifier: "IdMappingRuleBasedProperties",
}) as any as S.Schema<IdMappingRuleBasedProperties>;
export type ProviderServiceArn = string;
export interface IntermediateSourceConfiguration {
  intermediateS3Path: string;
}
export const IntermediateSourceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ intermediateS3Path: S.String }),
).annotate({
  identifier: "IntermediateSourceConfiguration",
}) as any as S.Schema<IntermediateSourceConfiguration>;
export interface ProviderProperties {
  providerServiceArn: string;
  providerConfiguration?: any;
  intermediateSourceConfiguration?: IntermediateSourceConfiguration;
}
export const ProviderProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    providerServiceArn: S.String,
    providerConfiguration: S.optional(S.Any),
    intermediateSourceConfiguration: S.optional(
      IntermediateSourceConfiguration,
    ),
  }),
).annotate({
  identifier: "ProviderProperties",
}) as any as S.Schema<ProviderProperties>;
export interface IdMappingTechniques {
  idMappingType: IdMappingType;
  ruleBasedProperties?: IdMappingRuleBasedProperties;
  providerProperties?: ProviderProperties;
}
export const IdMappingTechniques = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    idMappingType: IdMappingType,
    ruleBasedProperties: S.optional(IdMappingRuleBasedProperties),
    providerProperties: S.optional(ProviderProperties),
  }),
).annotate({
  identifier: "IdMappingTechniques",
}) as any as S.Schema<IdMappingTechniques>;
export type IdMappingIncrementalRunType = "ON_DEMAND" | (string & {});
export const IdMappingIncrementalRunType = S.String;

export interface IdMappingIncrementalRunConfig {
  incrementalRunType?: IdMappingIncrementalRunType;
}
export const IdMappingIncrementalRunConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ incrementalRunType: S.optional(IdMappingIncrementalRunType) }),
).annotate({
  identifier: "IdMappingIncrementalRunConfig",
}) as any as S.Schema<IdMappingIncrementalRunConfig>;
export type IdMappingRoleArn = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateIdMappingWorkflowInput {
  workflowName: string;
  description?: string;
  inputSourceConfig: IdMappingWorkflowInputSource[];
  outputSourceConfig?: IdMappingWorkflowOutputSource[];
  idMappingTechniques: IdMappingTechniques;
  incrementalRunConfig?: IdMappingIncrementalRunConfig;
  roleArn?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateIdMappingWorkflowInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowName: S.String,
    description: S.optional(S.String),
    inputSourceConfig: IdMappingWorkflowInputSourceConfig,
    outputSourceConfig: S.optional(IdMappingWorkflowOutputSourceConfig),
    idMappingTechniques: IdMappingTechniques,
    incrementalRunConfig: S.optional(IdMappingIncrementalRunConfig),
    roleArn: S.optional(S.String),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/idmappingworkflows" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateIdMappingWorkflowInput",
}) as any as S.Schema<CreateIdMappingWorkflowInput>;
export type IdMappingWorkflowArn = string;
export interface CreateIdMappingWorkflowOutput {
  workflowName: string;
  workflowArn: string;
  description?: string;
  inputSourceConfig: IdMappingWorkflowInputSource[];
  outputSourceConfig?: IdMappingWorkflowOutputSource[];
  idMappingTechniques: IdMappingTechniques;
  incrementalRunConfig?: IdMappingIncrementalRunConfig;
  roleArn?: string;
}
export const CreateIdMappingWorkflowOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowName: S.String,
    workflowArn: S.String,
    description: S.optional(S.String),
    inputSourceConfig: IdMappingWorkflowInputSourceConfig,
    outputSourceConfig: S.optional(IdMappingWorkflowOutputSourceConfig),
    idMappingTechniques: IdMappingTechniques,
    incrementalRunConfig: S.optional(IdMappingIncrementalRunConfig),
    roleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateIdMappingWorkflowOutput",
}) as any as S.Schema<CreateIdMappingWorkflowOutput>;
export interface IdNamespaceInputSource {
  inputSourceARN: string;
  schemaName?: string;
}
export const IdNamespaceInputSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ inputSourceARN: S.String, schemaName: S.optional(S.String) }),
).annotate({
  identifier: "IdNamespaceInputSource",
}) as any as S.Schema<IdNamespaceInputSource>;
export type IdNamespaceInputSourceConfig = IdNamespaceInputSource[];
export const IdNamespaceInputSourceConfig = /*@__PURE__*/ S.Array(
  IdNamespaceInputSource,
);
export type IdMappingWorkflowRuleDefinitionTypeList =
  IdMappingWorkflowRuleDefinitionType[];
export const IdMappingWorkflowRuleDefinitionTypeList = /*@__PURE__*/ S.Array(
  IdMappingWorkflowRuleDefinitionType,
);
export type RecordMatchingModelList = RecordMatchingModel[];
export const RecordMatchingModelList =
  /*@__PURE__*/ S.Array(RecordMatchingModel);
export interface NamespaceRuleBasedProperties {
  rules?: Rule[];
  ruleDefinitionTypes?: IdMappingWorkflowRuleDefinitionType[];
  attributeMatchingModel?: AttributeMatchingModel;
  recordMatchingModels?: RecordMatchingModel[];
}
export const NamespaceRuleBasedProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    rules: S.optional(RuleList),
    ruleDefinitionTypes: S.optional(IdMappingWorkflowRuleDefinitionTypeList),
    attributeMatchingModel: S.optional(AttributeMatchingModel),
    recordMatchingModels: S.optional(RecordMatchingModelList),
  }),
).annotate({
  identifier: "NamespaceRuleBasedProperties",
}) as any as S.Schema<NamespaceRuleBasedProperties>;
export interface NamespaceProviderProperties {
  providerServiceArn: string;
  providerConfiguration?: any;
}
export const NamespaceProviderProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    providerServiceArn: S.String,
    providerConfiguration: S.optional(S.Any),
  }),
).annotate({
  identifier: "NamespaceProviderProperties",
}) as any as S.Schema<NamespaceProviderProperties>;
export interface IdNamespaceIdMappingWorkflowProperties {
  idMappingType: IdMappingType;
  ruleBasedProperties?: NamespaceRuleBasedProperties;
  providerProperties?: NamespaceProviderProperties;
}
export const IdNamespaceIdMappingWorkflowProperties = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      idMappingType: IdMappingType,
      ruleBasedProperties: S.optional(NamespaceRuleBasedProperties),
      providerProperties: S.optional(NamespaceProviderProperties),
    }),
).annotate({
  identifier: "IdNamespaceIdMappingWorkflowProperties",
}) as any as S.Schema<IdNamespaceIdMappingWorkflowProperties>;
export type IdNamespaceIdMappingWorkflowPropertiesList =
  IdNamespaceIdMappingWorkflowProperties[];
export const IdNamespaceIdMappingWorkflowPropertiesList = /*@__PURE__*/ S.Array(
  IdNamespaceIdMappingWorkflowProperties,
);
export type RoleArn = string;
export interface CreateIdNamespaceInput {
  idNamespaceName: string;
  description?: string;
  inputSourceConfig?: IdNamespaceInputSource[];
  idMappingWorkflowProperties?: IdNamespaceIdMappingWorkflowProperties[];
  type: IdNamespaceType;
  roleArn?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateIdNamespaceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    idNamespaceName: S.String,
    description: S.optional(S.String),
    inputSourceConfig: S.optional(IdNamespaceInputSourceConfig),
    idMappingWorkflowProperties: S.optional(
      IdNamespaceIdMappingWorkflowPropertiesList,
    ),
    type: IdNamespaceType,
    roleArn: S.optional(S.String),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/idnamespaces" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateIdNamespaceInput",
}) as any as S.Schema<CreateIdNamespaceInput>;
export type IdNamespaceArn = string;
export interface CreateIdNamespaceOutput {
  idNamespaceName: string;
  idNamespaceArn: string;
  description?: string;
  inputSourceConfig?: IdNamespaceInputSource[];
  idMappingWorkflowProperties?: IdNamespaceIdMappingWorkflowProperties[];
  type: IdNamespaceType;
  roleArn?: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: { [key: string]: string | undefined };
}
export const CreateIdNamespaceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    idNamespaceName: S.String,
    idNamespaceArn: S.String,
    description: S.optional(S.String),
    inputSourceConfig: S.optional(IdNamespaceInputSourceConfig),
    idMappingWorkflowProperties: S.optional(
      IdNamespaceIdMappingWorkflowPropertiesList,
    ),
    type: IdNamespaceType,
    roleArn: S.optional(S.String),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreateIdNamespaceOutput",
}) as any as S.Schema<CreateIdNamespaceOutput>;
export interface InputSource {
  inputSourceARN: string;
  schemaName: string;
  applyNormalization?: boolean;
}
export const InputSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inputSourceARN: S.String,
    schemaName: S.String,
    applyNormalization: S.optional(S.Boolean),
  }),
).annotate({ identifier: "InputSource" }) as any as S.Schema<InputSource>;
export type InputSourceConfig = InputSource[];
export const InputSourceConfig = /*@__PURE__*/ S.Array(InputSource);
export type OptionalS3Path = string;
export interface OutputAttribute {
  name: string;
  hashed?: boolean;
}
export const OutputAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, hashed: S.optional(S.Boolean) }),
).annotate({
  identifier: "OutputAttribute",
}) as any as S.Schema<OutputAttribute>;
export type OutputAttributes = OutputAttribute[];
export const OutputAttributes = /*@__PURE__*/ S.Array(OutputAttribute);
export type CustomerProfilesDomainArn = string;
export type CustomerProfilesObjectTypeArn = string;
export interface CustomerProfilesIntegrationConfig {
  domainArn: string;
  objectTypeArn: string;
}
export const CustomerProfilesIntegrationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainArn: S.String, objectTypeArn: S.String }),
).annotate({
  identifier: "CustomerProfilesIntegrationConfig",
}) as any as S.Schema<CustomerProfilesIntegrationConfig>;
export interface OutputSource {
  KMSArn?: string;
  outputS3Path?: string;
  output: OutputAttribute[];
  applyNormalization?: boolean;
  customerProfilesIntegrationConfig?: CustomerProfilesIntegrationConfig;
}
export const OutputSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KMSArn: S.optional(S.String),
    outputS3Path: S.optional(S.String),
    output: OutputAttributes,
    applyNormalization: S.optional(S.Boolean),
    customerProfilesIntegrationConfig: S.optional(
      CustomerProfilesIntegrationConfig,
    ),
  }),
).annotate({ identifier: "OutputSource" }) as any as S.Schema<OutputSource>;
export type OutputSourceConfig = OutputSource[];
export const OutputSourceConfig = /*@__PURE__*/ S.Array(OutputSource);
export type ResolutionType =
  | "RULE_MATCHING"
  | "ML_MATCHING"
  | "PROVIDER"
  | (string & {});
export const ResolutionType = S.String;

export type MatchPurpose = "IDENTIFIER_GENERATION" | "INDEXING" | (string & {});
export const MatchPurpose = S.String;

export interface RuleBasedProperties {
  rules: Rule[];
  attributeMatchingModel: AttributeMatchingModel;
  matchPurpose?: MatchPurpose;
}
export const RuleBasedProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    rules: RuleList,
    attributeMatchingModel: AttributeMatchingModel,
    matchPurpose: S.optional(MatchPurpose),
  }),
).annotate({
  identifier: "RuleBasedProperties",
}) as any as S.Schema<RuleBasedProperties>;
export interface RuleCondition {
  ruleName: string;
  condition: string;
}
export const RuleCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ruleName: S.String, condition: S.String }),
).annotate({ identifier: "RuleCondition" }) as any as S.Schema<RuleCondition>;
export type RuleConditionList = RuleCondition[];
export const RuleConditionList = /*@__PURE__*/ S.Array(RuleCondition);
export interface MatchingConfig {
  enableTransitiveMatching?: boolean;
}
export const MatchingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enableTransitiveMatching: S.optional(S.Boolean) }),
).annotate({ identifier: "MatchingConfig" }) as any as S.Schema<MatchingConfig>;
export interface RuleConditionProperties {
  rules: RuleCondition[];
  matchingConfig?: MatchingConfig;
}
export const RuleConditionProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    rules: RuleConditionList,
    matchingConfig: S.optional(MatchingConfig),
  }),
).annotate({
  identifier: "RuleConditionProperties",
}) as any as S.Schema<RuleConditionProperties>;
export interface ResolutionTechniques {
  resolutionType: ResolutionType;
  ruleBasedProperties?: RuleBasedProperties;
  ruleConditionProperties?: RuleConditionProperties;
  enableRealTimeMatching?: boolean;
  providerProperties?: ProviderProperties;
}
export const ResolutionTechniques = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resolutionType: ResolutionType,
    ruleBasedProperties: S.optional(RuleBasedProperties),
    ruleConditionProperties: S.optional(RuleConditionProperties),
    enableRealTimeMatching: S.optional(S.Boolean),
    providerProperties: S.optional(ProviderProperties),
  }),
).annotate({
  identifier: "ResolutionTechniques",
}) as any as S.Schema<ResolutionTechniques>;
export type IncrementalRunType = "IMMEDIATE" | (string & {});
export const IncrementalRunType = S.String;

export interface IncrementalRunConfig {
  incrementalRunType?: IncrementalRunType;
}
export const IncrementalRunConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ incrementalRunType: S.optional(IncrementalRunType) }),
).annotate({
  identifier: "IncrementalRunConfig",
}) as any as S.Schema<IncrementalRunConfig>;
export interface CreateMatchingWorkflowInput {
  workflowName: string;
  description?: string;
  inputSourceConfig: InputSource[];
  outputSourceConfig: OutputSource[];
  resolutionTechniques: ResolutionTechniques;
  incrementalRunConfig?: IncrementalRunConfig;
  roleArn: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateMatchingWorkflowInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowName: S.String,
    description: S.optional(S.String),
    inputSourceConfig: InputSourceConfig,
    outputSourceConfig: OutputSourceConfig,
    resolutionTechniques: ResolutionTechniques,
    incrementalRunConfig: S.optional(IncrementalRunConfig),
    roleArn: S.String,
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/matchingworkflows" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMatchingWorkflowInput",
}) as any as S.Schema<CreateMatchingWorkflowInput>;
export type MatchingWorkflowArn = string;
export interface CreateMatchingWorkflowOutput {
  workflowName: string;
  workflowArn: string;
  description?: string;
  inputSourceConfig: InputSource[];
  outputSourceConfig: OutputSource[];
  resolutionTechniques: ResolutionTechniques;
  incrementalRunConfig?: IncrementalRunConfig;
  roleArn: string;
}
export const CreateMatchingWorkflowOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowName: S.String,
    workflowArn: S.String,
    description: S.optional(S.String),
    inputSourceConfig: InputSourceConfig,
    outputSourceConfig: OutputSourceConfig,
    resolutionTechniques: ResolutionTechniques,
    incrementalRunConfig: S.optional(IncrementalRunConfig),
    roleArn: S.String,
  }),
).annotate({
  identifier: "CreateMatchingWorkflowOutput",
}) as any as S.Schema<CreateMatchingWorkflowOutput>;
export type SchemaAttributeType =
  | "NAME"
  | "NAME_FIRST"
  | "NAME_MIDDLE"
  | "NAME_LAST"
  | "ADDRESS"
  | "ADDRESS_STREET1"
  | "ADDRESS_STREET2"
  | "ADDRESS_STREET3"
  | "ADDRESS_CITY"
  | "ADDRESS_STATE"
  | "ADDRESS_COUNTRY"
  | "ADDRESS_POSTALCODE"
  | "PHONE"
  | "PHONE_NUMBER"
  | "PHONE_COUNTRYCODE"
  | "EMAIL_ADDRESS"
  | "UNIQUE_ID"
  | "DATE"
  | "STRING"
  | "PROVIDER_ID"
  | "IPV4"
  | "IPV6"
  | "MAID"
  | (string & {});
export const SchemaAttributeType = S.String;

export interface SchemaInputAttribute {
  fieldName: string;
  type: SchemaAttributeType;
  groupName?: string;
  matchKey?: string;
  subType?: string;
  hashed?: boolean;
}
export const SchemaInputAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fieldName: S.String,
    type: SchemaAttributeType,
    groupName: S.optional(S.String),
    matchKey: S.optional(S.String),
    subType: S.optional(S.String),
    hashed: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "SchemaInputAttribute",
}) as any as S.Schema<SchemaInputAttribute>;
export type SchemaInputAttributes = SchemaInputAttribute[];
export const SchemaInputAttributes =
  /*@__PURE__*/ S.Array(SchemaInputAttribute);
export interface CreateSchemaMappingInput {
  schemaName: string;
  description?: string;
  mappedInputFields: SchemaInputAttribute[];
  tags?: { [key: string]: string | undefined };
}
export const CreateSchemaMappingInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    schemaName: S.String,
    description: S.optional(S.String),
    mappedInputFields: SchemaInputAttributes,
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/schemas" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSchemaMappingInput",
}) as any as S.Schema<CreateSchemaMappingInput>;
export type SchemaMappingArn = string;
export interface CreateSchemaMappingOutput {
  schemaName: string;
  schemaArn: string;
  description?: string;
  mappedInputFields: SchemaInputAttribute[];
}
export const CreateSchemaMappingOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    schemaName: S.String,
    schemaArn: S.String,
    description: S.optional(S.String),
    mappedInputFields: SchemaInputAttributes,
  }),
).annotate({
  identifier: "CreateSchemaMappingOutput",
}) as any as S.Schema<CreateSchemaMappingOutput>;
export interface DeleteIdMappingWorkflowInput {
  workflowName: string;
}
export const DeleteIdMappingWorkflowInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workflowName: S.String.pipe(T.HttpLabel("workflowName")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/idmappingworkflows/{workflowName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIdMappingWorkflowInput",
}) as any as S.Schema<DeleteIdMappingWorkflowInput>;
export interface DeleteIdMappingWorkflowOutput {
  message: string;
}
export const DeleteIdMappingWorkflowOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.String }),
).annotate({
  identifier: "DeleteIdMappingWorkflowOutput",
}) as any as S.Schema<DeleteIdMappingWorkflowOutput>;
export interface DeleteIdNamespaceInput {
  idNamespaceName: string;
}
export const DeleteIdNamespaceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    idNamespaceName: S.String.pipe(T.HttpLabel("idNamespaceName")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/idnamespaces/{idNamespaceName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIdNamespaceInput",
}) as any as S.Schema<DeleteIdNamespaceInput>;
export interface DeleteIdNamespaceOutput {
  message: string;
}
export const DeleteIdNamespaceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.String }),
).annotate({
  identifier: "DeleteIdNamespaceOutput",
}) as any as S.Schema<DeleteIdNamespaceOutput>;
export interface DeleteMatchingWorkflowInput {
  workflowName: string;
}
export const DeleteMatchingWorkflowInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workflowName: S.String.pipe(T.HttpLabel("workflowName")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/matchingworkflows/{workflowName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMatchingWorkflowInput",
}) as any as S.Schema<DeleteMatchingWorkflowInput>;
export interface DeleteMatchingWorkflowOutput {
  message: string;
}
export const DeleteMatchingWorkflowOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.String }),
).annotate({
  identifier: "DeleteMatchingWorkflowOutput",
}) as any as S.Schema<DeleteMatchingWorkflowOutput>;
export interface DeletePolicyStatementInput {
  arn: string;
  statementId: string;
}
export const DeletePolicyStatementInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String.pipe(T.HttpLabel("arn")),
    statementId: S.String.pipe(T.HttpLabel("statementId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/policies/{arn}/{statementId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePolicyStatementInput",
}) as any as S.Schema<DeletePolicyStatementInput>;
export interface DeletePolicyStatementOutput {
  arn: string;
  token: string;
  policy?: string;
}
export const DeletePolicyStatementOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, token: S.String, policy: S.optional(S.String) }),
).annotate({
  identifier: "DeletePolicyStatementOutput",
}) as any as S.Schema<DeletePolicyStatementOutput>;
export interface DeleteSchemaMappingInput {
  schemaName: string;
}
export const DeleteSchemaMappingInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ schemaName: S.String.pipe(T.HttpLabel("schemaName")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/schemas/{schemaName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSchemaMappingInput",
}) as any as S.Schema<DeleteSchemaMappingInput>;
export interface DeleteSchemaMappingOutput {
  message: string;
}
export const DeleteSchemaMappingOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.String }),
).annotate({
  identifier: "DeleteSchemaMappingOutput",
}) as any as S.Schema<DeleteSchemaMappingOutput>;
export type UniqueId = string;
export type RecordAttributeMapString255 = { [key: string]: string | undefined };
export const RecordAttributeMapString255 = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface Record {
  inputSourceARN: string;
  uniqueId: string;
  recordAttributeMap: { [key: string]: string | undefined };
}
export const Record = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inputSourceARN: S.String,
    uniqueId: S.String,
    recordAttributeMap: RecordAttributeMapString255,
  }),
).annotate({ identifier: "Record" }) as any as S.Schema<Record>;
export type RecordList = Record[];
export const RecordList = /*@__PURE__*/ S.Array(Record);
export type ProcessingType =
  | "CONSISTENT"
  | "EVENTUAL"
  | "EVENTUAL_NO_LOOKUP"
  | (string & {});
export const ProcessingType = S.String;

export interface GenerateMatchIdInput {
  workflowName: string;
  records: Record[];
  processingType?: ProcessingType;
}
export const GenerateMatchIdInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowName: S.String.pipe(T.HttpLabel("workflowName")),
    records: RecordList,
    processingType: S.optional(ProcessingType),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/matchingworkflows/{workflowName}/generateMatches",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GenerateMatchIdInput",
}) as any as S.Schema<GenerateMatchIdInput>;
export interface MatchedRecord {
  inputSourceARN: string;
  recordId: string;
}
export const MatchedRecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ inputSourceARN: S.String, recordId: S.String }),
).annotate({ identifier: "MatchedRecord" }) as any as S.Schema<MatchedRecord>;
export type MatchedRecordsList = MatchedRecord[];
export const MatchedRecordsList = /*@__PURE__*/ S.Array(MatchedRecord);
export interface MatchGroup {
  records: MatchedRecord[];
  matchId: string;
  matchRule: string;
}
export const MatchGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    records: MatchedRecordsList,
    matchId: S.String,
    matchRule: S.String,
  }),
).annotate({ identifier: "MatchGroup" }) as any as S.Schema<MatchGroup>;
export type MatchGroupsList = MatchGroup[];
export const MatchGroupsList = /*@__PURE__*/ S.Array(MatchGroup);
export type ErrorMessage = string;
export interface FailedRecord {
  inputSourceARN: string;
  uniqueId: string;
  errorMessage: string;
}
export const FailedRecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inputSourceARN: S.String,
    uniqueId: S.String,
    errorMessage: S.String,
  }),
).annotate({ identifier: "FailedRecord" }) as any as S.Schema<FailedRecord>;
export type FailedRecordsList = FailedRecord[];
export const FailedRecordsList = /*@__PURE__*/ S.Array(FailedRecord);
export interface GenerateMatchIdOutput {
  matchGroups: MatchGroup[];
  failedRecords: FailedRecord[];
}
export const GenerateMatchIdOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ matchGroups: MatchGroupsList, failedRecords: FailedRecordsList }),
).annotate({
  identifier: "GenerateMatchIdOutput",
}) as any as S.Schema<GenerateMatchIdOutput>;
export type EntityNameOrIdMappingWorkflowArn = string;
export type JobId = string;
export interface GetIdMappingJobInput {
  workflowName: string;
  jobId: string;
}
export const GetIdMappingJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowName: S.String.pipe(T.HttpLabel("workflowName")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/idmappingworkflows/{workflowName}/jobs/{jobId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIdMappingJobInput",
}) as any as S.Schema<GetIdMappingJobInput>;
export type JobStatus =
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "QUEUED"
  | (string & {});
export const JobStatus = S.String;

export interface IdMappingJobMetrics {
  inputRecords?: number;
  totalRecordsProcessed?: number;
  recordsNotProcessed?: number;
  deleteRecordsProcessed?: number;
  totalMappedRecords?: number;
  totalMappedSourceRecords?: number;
  totalMappedTargetRecords?: number;
  uniqueRecordsLoaded?: number;
  newMappedRecords?: number;
  newMappedSourceRecords?: number;
  newMappedTargetRecords?: number;
  newUniqueRecordsLoaded?: number;
  mappedRecordsRemoved?: number;
  mappedSourceRecordsRemoved?: number;
  mappedTargetRecordsRemoved?: number;
}
export const IdMappingJobMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inputRecords: S.optional(S.Number),
    totalRecordsProcessed: S.optional(S.Number),
    recordsNotProcessed: S.optional(S.Number),
    deleteRecordsProcessed: S.optional(S.Number),
    totalMappedRecords: S.optional(S.Number),
    totalMappedSourceRecords: S.optional(S.Number),
    totalMappedTargetRecords: S.optional(S.Number),
    uniqueRecordsLoaded: S.optional(S.Number),
    newMappedRecords: S.optional(S.Number),
    newMappedSourceRecords: S.optional(S.Number),
    newMappedTargetRecords: S.optional(S.Number),
    newUniqueRecordsLoaded: S.optional(S.Number),
    mappedRecordsRemoved: S.optional(S.Number),
    mappedSourceRecordsRemoved: S.optional(S.Number),
    mappedTargetRecordsRemoved: S.optional(S.Number),
  }),
).annotate({
  identifier: "IdMappingJobMetrics",
}) as any as S.Schema<IdMappingJobMetrics>;
export interface ErrorDetails {
  errorMessage?: string;
}
export const ErrorDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ errorMessage: S.optional(S.String) }),
).annotate({ identifier: "ErrorDetails" }) as any as S.Schema<ErrorDetails>;
export interface IdMappingJobOutputSource {
  roleArn: string;
  outputS3Path: string;
  KMSArn?: string;
}
export const IdMappingJobOutputSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleArn: S.String,
    outputS3Path: S.String,
    KMSArn: S.optional(S.String),
  }),
).annotate({
  identifier: "IdMappingJobOutputSource",
}) as any as S.Schema<IdMappingJobOutputSource>;
export type IdMappingJobOutputSourceConfig = IdMappingJobOutputSource[];
export const IdMappingJobOutputSourceConfig = /*@__PURE__*/ S.Array(
  IdMappingJobOutputSource,
);
export type JobType = "BATCH" | "INCREMENTAL" | "DELETE_ONLY" | (string & {});
export const JobType = S.String;

export interface GetIdMappingJobOutput {
  jobId: string;
  status: JobStatus;
  startTime: Date;
  endTime?: Date;
  metrics?: IdMappingJobMetrics;
  errorDetails?: ErrorDetails;
  outputSourceConfig?: IdMappingJobOutputSource[];
  jobType?: JobType;
}
export const GetIdMappingJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String,
    status: JobStatus,
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    metrics: S.optional(IdMappingJobMetrics),
    errorDetails: S.optional(ErrorDetails),
    outputSourceConfig: S.optional(IdMappingJobOutputSourceConfig),
    jobType: S.optional(JobType),
  }),
).annotate({
  identifier: "GetIdMappingJobOutput",
}) as any as S.Schema<GetIdMappingJobOutput>;
export interface GetIdMappingWorkflowInput {
  workflowName: string;
}
export const GetIdMappingWorkflowInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workflowName: S.String.pipe(T.HttpLabel("workflowName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/idmappingworkflows/{workflowName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIdMappingWorkflowInput",
}) as any as S.Schema<GetIdMappingWorkflowInput>;
export interface GetIdMappingWorkflowOutput {
  workflowName: string;
  workflowArn: string;
  description?: string;
  inputSourceConfig: IdMappingWorkflowInputSource[];
  outputSourceConfig?: IdMappingWorkflowOutputSource[];
  idMappingTechniques: IdMappingTechniques;
  createdAt: Date;
  updatedAt: Date;
  incrementalRunConfig?: IdMappingIncrementalRunConfig;
  roleArn?: string;
  tags?: { [key: string]: string | undefined };
}
export const GetIdMappingWorkflowOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowName: S.String,
    workflowArn: S.String,
    description: S.optional(S.String),
    inputSourceConfig: IdMappingWorkflowInputSourceConfig,
    outputSourceConfig: S.optional(IdMappingWorkflowOutputSourceConfig),
    idMappingTechniques: IdMappingTechniques,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    incrementalRunConfig: S.optional(IdMappingIncrementalRunConfig),
    roleArn: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetIdMappingWorkflowOutput",
}) as any as S.Schema<GetIdMappingWorkflowOutput>;
export type EntityNameOrIdNamespaceArn = string;
export interface GetIdNamespaceInput {
  idNamespaceName: string;
}
export const GetIdNamespaceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    idNamespaceName: S.String.pipe(T.HttpLabel("idNamespaceName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/idnamespaces/{idNamespaceName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIdNamespaceInput",
}) as any as S.Schema<GetIdNamespaceInput>;
export interface GetIdNamespaceOutput {
  idNamespaceName: string;
  idNamespaceArn: string;
  description?: string;
  inputSourceConfig?: IdNamespaceInputSource[];
  idMappingWorkflowProperties?: IdNamespaceIdMappingWorkflowProperties[];
  type: IdNamespaceType;
  roleArn?: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: { [key: string]: string | undefined };
}
export const GetIdNamespaceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    idNamespaceName: S.String,
    idNamespaceArn: S.String,
    description: S.optional(S.String),
    inputSourceConfig: S.optional(IdNamespaceInputSourceConfig),
    idMappingWorkflowProperties: S.optional(
      IdNamespaceIdMappingWorkflowPropertiesList,
    ),
    type: IdNamespaceType,
    roleArn: S.optional(S.String),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetIdNamespaceOutput",
}) as any as S.Schema<GetIdNamespaceOutput>;
export type RecordAttributeMap = { [key: string]: string | undefined };
export const RecordAttributeMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface GetMatchIdInput {
  workflowName: string;
  record: { [key: string]: string | undefined };
  applyNormalization?: boolean;
}
export const GetMatchIdInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowName: S.String.pipe(T.HttpLabel("workflowName")),
    record: RecordAttributeMap,
    applyNormalization: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/matchingworkflows/{workflowName}/matches",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMatchIdInput",
}) as any as S.Schema<GetMatchIdInput>;
export interface GetMatchIdOutput {
  matchId?: string;
  matchRule?: string;
}
export const GetMatchIdOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ matchId: S.optional(S.String), matchRule: S.optional(S.String) }),
).annotate({
  identifier: "GetMatchIdOutput",
}) as any as S.Schema<GetMatchIdOutput>;
export interface GetMatchingJobInput {
  workflowName: string;
  jobId: string;
}
export const GetMatchingJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowName: S.String.pipe(T.HttpLabel("workflowName")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/matchingworkflows/{workflowName}/jobs/{jobId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMatchingJobInput",
}) as any as S.Schema<GetMatchingJobInput>;
export interface JobMetrics {
  inputRecords?: number;
  totalRecordsProcessed?: number;
  recordsNotProcessed?: number;
  deleteRecordsProcessed?: number;
  matchIDs?: number;
}
export const JobMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inputRecords: S.optional(S.Number),
    totalRecordsProcessed: S.optional(S.Number),
    recordsNotProcessed: S.optional(S.Number),
    deleteRecordsProcessed: S.optional(S.Number),
    matchIDs: S.optional(S.Number),
  }),
).annotate({ identifier: "JobMetrics" }) as any as S.Schema<JobMetrics>;
export interface JobOutputSource {
  roleArn: string;
  outputS3Path: string;
  KMSArn?: string;
}
export const JobOutputSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleArn: S.String,
    outputS3Path: S.String,
    KMSArn: S.optional(S.String),
  }),
).annotate({
  identifier: "JobOutputSource",
}) as any as S.Schema<JobOutputSource>;
export type JobOutputSourceConfig = JobOutputSource[];
export const JobOutputSourceConfig = /*@__PURE__*/ S.Array(JobOutputSource);
export interface GetMatchingJobOutput {
  jobId: string;
  status: JobStatus;
  startTime: Date;
  endTime?: Date;
  metrics?: JobMetrics;
  errorDetails?: ErrorDetails;
  outputSourceConfig?: JobOutputSource[];
}
export const GetMatchingJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String,
    status: JobStatus,
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    metrics: S.optional(JobMetrics),
    errorDetails: S.optional(ErrorDetails),
    outputSourceConfig: S.optional(JobOutputSourceConfig),
  }),
).annotate({
  identifier: "GetMatchingJobOutput",
}) as any as S.Schema<GetMatchingJobOutput>;
export interface GetMatchingWorkflowInput {
  workflowName: string;
}
export const GetMatchingWorkflowInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workflowName: S.String.pipe(T.HttpLabel("workflowName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/matchingworkflows/{workflowName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMatchingWorkflowInput",
}) as any as S.Schema<GetMatchingWorkflowInput>;
export interface GetMatchingWorkflowOutput {
  workflowName: string;
  workflowArn: string;
  description?: string;
  inputSourceConfig: InputSource[];
  outputSourceConfig: OutputSource[];
  resolutionTechniques: ResolutionTechniques;
  createdAt: Date;
  updatedAt: Date;
  incrementalRunConfig?: IncrementalRunConfig;
  roleArn: string;
  tags?: { [key: string]: string | undefined };
}
export const GetMatchingWorkflowOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowName: S.String,
    workflowArn: S.String,
    description: S.optional(S.String),
    inputSourceConfig: InputSourceConfig,
    outputSourceConfig: OutputSourceConfig,
    resolutionTechniques: ResolutionTechniques,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    incrementalRunConfig: S.optional(IncrementalRunConfig),
    roleArn: S.String,
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetMatchingWorkflowOutput",
}) as any as S.Schema<GetMatchingWorkflowOutput>;
export interface GetPolicyInput {
  arn: string;
}
export const GetPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/policies/{arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetPolicyInput" }) as any as S.Schema<GetPolicyInput>;
export interface GetPolicyOutput {
  arn: string;
  token: string;
  policy?: string;
}
export const GetPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, token: S.String, policy: S.optional(S.String) }),
).annotate({
  identifier: "GetPolicyOutput",
}) as any as S.Schema<GetPolicyOutput>;
export interface GetProviderServiceInput {
  providerName: string;
  providerServiceName: string;
}
export const GetProviderServiceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    providerName: S.String.pipe(T.HttpLabel("providerName")),
    providerServiceName: S.String.pipe(T.HttpLabel("providerServiceName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/providerservices/{providerName}/{providerServiceName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetProviderServiceInput",
}) as any as S.Schema<GetProviderServiceInput>;
export type ProviderServiceDisplayName = string;
export type ServiceType = "ASSIGNMENT" | "ID_MAPPING" | (string & {});
export const ServiceType = S.String;

export interface ProviderIdNameSpaceConfiguration {
  description?: string;
  providerTargetConfigurationDefinition?: any;
  providerSourceConfigurationDefinition?: any;
}
export const ProviderIdNameSpaceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    providerTargetConfigurationDefinition: S.optional(S.Any),
    providerSourceConfigurationDefinition: S.optional(S.Any),
  }),
).annotate({
  identifier: "ProviderIdNameSpaceConfiguration",
}) as any as S.Schema<ProviderIdNameSpaceConfiguration>;
export interface ProviderMarketplaceConfiguration {
  dataSetId: string;
  revisionId: string;
  assetId: string;
  listingId: string;
}
export const ProviderMarketplaceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataSetId: S.String,
    revisionId: S.String,
    assetId: S.String,
    listingId: S.String,
  }),
).annotate({
  identifier: "ProviderMarketplaceConfiguration",
}) as any as S.Schema<ProviderMarketplaceConfiguration>;
export type ProviderEndpointConfiguration = {
  marketplaceConfiguration: ProviderMarketplaceConfiguration;
};
export const ProviderEndpointConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ marketplaceConfiguration: ProviderMarketplaceConfiguration }),
]);
export type AwsAccountId = string;
export type AwsAccountIdList = string[];
export const AwsAccountIdList = /*@__PURE__*/ S.Array(S.String);
export type RequiredBucketActionsList = string[];
export const RequiredBucketActionsList = /*@__PURE__*/ S.Array(S.String);
export interface ProviderIntermediateDataAccessConfiguration {
  awsAccountIds?: string[];
  requiredBucketActions?: string[];
}
export const ProviderIntermediateDataAccessConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      awsAccountIds: S.optional(AwsAccountIdList),
      requiredBucketActions: S.optional(RequiredBucketActionsList),
    }),
  ).annotate({
    identifier: "ProviderIntermediateDataAccessConfiguration",
  }) as any as S.Schema<ProviderIntermediateDataAccessConfiguration>;
export type SchemaList = string[];
export const SchemaList = /*@__PURE__*/ S.Array(S.String);
export type Schemas = string[][];
export const Schemas = /*@__PURE__*/ S.Array(SchemaList);
export interface ProviderSchemaAttribute {
  fieldName: string;
  type: SchemaAttributeType;
  subType?: string;
  hashing?: boolean;
}
export const ProviderSchemaAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fieldName: S.String,
    type: SchemaAttributeType,
    subType: S.optional(S.String),
    hashing: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ProviderSchemaAttribute",
}) as any as S.Schema<ProviderSchemaAttribute>;
export type ProviderSchemaAttributes = ProviderSchemaAttribute[];
export const ProviderSchemaAttributes = /*@__PURE__*/ S.Array(
  ProviderSchemaAttribute,
);
export interface ProviderComponentSchema {
  schemas?: string[][];
  providerSchemaAttributes?: ProviderSchemaAttribute[];
}
export const ProviderComponentSchema = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    schemas: S.optional(Schemas),
    providerSchemaAttributes: S.optional(ProviderSchemaAttributes),
  }),
).annotate({
  identifier: "ProviderComponentSchema",
}) as any as S.Schema<ProviderComponentSchema>;
export interface GetProviderServiceOutput {
  providerName: string;
  providerServiceName: string;
  providerServiceDisplayName: string;
  providerServiceType: ServiceType;
  providerServiceArn: string;
  providerConfigurationDefinition?: any;
  providerIdNameSpaceConfiguration?: ProviderIdNameSpaceConfiguration;
  providerJobConfiguration?: any;
  providerEndpointConfiguration: ProviderEndpointConfiguration;
  anonymizedOutput: boolean;
  providerEntityOutputDefinition: any;
  providerIntermediateDataAccessConfiguration?: ProviderIntermediateDataAccessConfiguration;
  providerComponentSchema?: ProviderComponentSchema;
}
export const GetProviderServiceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    providerName: S.String,
    providerServiceName: S.String,
    providerServiceDisplayName: S.String,
    providerServiceType: ServiceType,
    providerServiceArn: S.String,
    providerConfigurationDefinition: S.optional(S.Any),
    providerIdNameSpaceConfiguration: S.optional(
      ProviderIdNameSpaceConfiguration,
    ),
    providerJobConfiguration: S.optional(S.Any),
    providerEndpointConfiguration: ProviderEndpointConfiguration,
    anonymizedOutput: S.Boolean,
    providerEntityOutputDefinition: S.Any,
    providerIntermediateDataAccessConfiguration: S.optional(
      ProviderIntermediateDataAccessConfiguration,
    ),
    providerComponentSchema: S.optional(ProviderComponentSchema),
  }),
).annotate({
  identifier: "GetProviderServiceOutput",
}) as any as S.Schema<GetProviderServiceOutput>;
export interface GetSchemaMappingInput {
  schemaName: string;
}
export const GetSchemaMappingInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ schemaName: S.String.pipe(T.HttpLabel("schemaName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/schemas/{schemaName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSchemaMappingInput",
}) as any as S.Schema<GetSchemaMappingInput>;
export interface GetSchemaMappingOutput {
  schemaName: string;
  schemaArn: string;
  description?: string;
  mappedInputFields: SchemaInputAttribute[];
  createdAt: Date;
  updatedAt: Date;
  tags?: { [key: string]: string | undefined };
  hasWorkflows: boolean;
}
export const GetSchemaMappingOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    schemaName: S.String,
    schemaArn: S.String,
    description: S.optional(S.String),
    mappedInputFields: SchemaInputAttributes,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    tags: S.optional(TagMap),
    hasWorkflows: S.Boolean,
  }),
).annotate({
  identifier: "GetSchemaMappingOutput",
}) as any as S.Schema<GetSchemaMappingOutput>;
export type NextToken = string;
export interface ListIdMappingJobsInput {
  workflowName: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListIdMappingJobsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowName: S.String.pipe(T.HttpLabel("workflowName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/idmappingworkflows/{workflowName}/jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIdMappingJobsInput",
}) as any as S.Schema<ListIdMappingJobsInput>;
export interface JobSummary {
  jobId: string;
  status: JobStatus;
  startTime: Date;
  endTime?: Date;
}
export const JobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String,
    status: JobStatus,
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "JobSummary" }) as any as S.Schema<JobSummary>;
export type JobList = JobSummary[];
export const JobList = /*@__PURE__*/ S.Array(JobSummary);
export interface ListIdMappingJobsOutput {
  jobs?: JobSummary[];
  nextToken?: string;
}
export const ListIdMappingJobsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobs: S.optional(JobList), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListIdMappingJobsOutput",
}) as any as S.Schema<ListIdMappingJobsOutput>;
export interface ListIdMappingWorkflowsInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListIdMappingWorkflowsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/idmappingworkflows" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIdMappingWorkflowsInput",
}) as any as S.Schema<ListIdMappingWorkflowsInput>;
export interface IdMappingWorkflowSummary {
  workflowName: string;
  workflowArn: string;
  createdAt: Date;
  updatedAt: Date;
}
export const IdMappingWorkflowSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowName: S.String,
    workflowArn: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "IdMappingWorkflowSummary",
}) as any as S.Schema<IdMappingWorkflowSummary>;
export type IdMappingWorkflowList = IdMappingWorkflowSummary[];
export const IdMappingWorkflowList = /*@__PURE__*/ S.Array(
  IdMappingWorkflowSummary,
);
export interface ListIdMappingWorkflowsOutput {
  workflowSummaries?: IdMappingWorkflowSummary[];
  nextToken?: string;
}
export const ListIdMappingWorkflowsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowSummaries: S.optional(IdMappingWorkflowList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListIdMappingWorkflowsOutput",
}) as any as S.Schema<ListIdMappingWorkflowsOutput>;
export interface ListIdNamespacesInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListIdNamespacesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/idnamespaces" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIdNamespacesInput",
}) as any as S.Schema<ListIdNamespacesInput>;
export interface IdNamespaceIdMappingWorkflowMetadata {
  idMappingType: IdMappingType;
}
export const IdNamespaceIdMappingWorkflowMetadata = /*@__PURE__*/ S.suspend(
  () => S.Struct({ idMappingType: IdMappingType }),
).annotate({
  identifier: "IdNamespaceIdMappingWorkflowMetadata",
}) as any as S.Schema<IdNamespaceIdMappingWorkflowMetadata>;
export type IdNamespaceIdMappingWorkflowMetadataList =
  IdNamespaceIdMappingWorkflowMetadata[];
export const IdNamespaceIdMappingWorkflowMetadataList = /*@__PURE__*/ S.Array(
  IdNamespaceIdMappingWorkflowMetadata,
);
export interface IdNamespaceSummary {
  idNamespaceName: string;
  idNamespaceArn: string;
  description?: string;
  idMappingWorkflowProperties?: IdNamespaceIdMappingWorkflowMetadata[];
  type: IdNamespaceType;
  createdAt: Date;
  updatedAt: Date;
}
export const IdNamespaceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    idNamespaceName: S.String,
    idNamespaceArn: S.String,
    description: S.optional(S.String),
    idMappingWorkflowProperties: S.optional(
      IdNamespaceIdMappingWorkflowMetadataList,
    ),
    type: IdNamespaceType,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "IdNamespaceSummary",
}) as any as S.Schema<IdNamespaceSummary>;
export type IdNamespaceList = IdNamespaceSummary[];
export const IdNamespaceList = /*@__PURE__*/ S.Array(IdNamespaceSummary);
export interface ListIdNamespacesOutput {
  idNamespaceSummaries?: IdNamespaceSummary[];
  nextToken?: string;
}
export const ListIdNamespacesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    idNamespaceSummaries: S.optional(IdNamespaceList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListIdNamespacesOutput",
}) as any as S.Schema<ListIdNamespacesOutput>;
export interface ListMatchingJobsInput {
  workflowName: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListMatchingJobsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowName: S.String.pipe(T.HttpLabel("workflowName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/matchingworkflows/{workflowName}/jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMatchingJobsInput",
}) as any as S.Schema<ListMatchingJobsInput>;
export interface ListMatchingJobsOutput {
  jobs?: JobSummary[];
  nextToken?: string;
}
export const ListMatchingJobsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobs: S.optional(JobList), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListMatchingJobsOutput",
}) as any as S.Schema<ListMatchingJobsOutput>;
export interface ListMatchingWorkflowsInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListMatchingWorkflowsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/matchingworkflows" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMatchingWorkflowsInput",
}) as any as S.Schema<ListMatchingWorkflowsInput>;
export interface MatchingWorkflowSummary {
  workflowName: string;
  workflowArn: string;
  createdAt: Date;
  updatedAt: Date;
  resolutionType: ResolutionType;
}
export const MatchingWorkflowSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowName: S.String,
    workflowArn: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    resolutionType: ResolutionType,
  }),
).annotate({
  identifier: "MatchingWorkflowSummary",
}) as any as S.Schema<MatchingWorkflowSummary>;
export type MatchingWorkflowList = MatchingWorkflowSummary[];
export const MatchingWorkflowList = /*@__PURE__*/ S.Array(
  MatchingWorkflowSummary,
);
export interface ListMatchingWorkflowsOutput {
  workflowSummaries?: MatchingWorkflowSummary[];
  nextToken?: string;
}
export const ListMatchingWorkflowsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowSummaries: S.optional(MatchingWorkflowList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMatchingWorkflowsOutput",
}) as any as S.Schema<ListMatchingWorkflowsOutput>;
export interface ListProviderServicesInput {
  nextToken?: string;
  maxResults?: number;
  providerName?: string;
}
export const ListProviderServicesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    providerName: S.optional(S.String).pipe(T.HttpQuery("providerName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/providerservices" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProviderServicesInput",
}) as any as S.Schema<ListProviderServicesInput>;
export interface ProviderServiceSummary {
  providerServiceArn: string;
  providerName: string;
  providerServiceDisplayName: string;
  providerServiceName: string;
  providerServiceType: ServiceType;
}
export const ProviderServiceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    providerServiceArn: S.String,
    providerName: S.String,
    providerServiceDisplayName: S.String,
    providerServiceName: S.String,
    providerServiceType: ServiceType,
  }),
).annotate({
  identifier: "ProviderServiceSummary",
}) as any as S.Schema<ProviderServiceSummary>;
export type ProviderServiceList = ProviderServiceSummary[];
export const ProviderServiceList = /*@__PURE__*/ S.Array(
  ProviderServiceSummary,
);
export interface ListProviderServicesOutput {
  providerServiceSummaries?: ProviderServiceSummary[];
  nextToken?: string;
}
export const ListProviderServicesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    providerServiceSummaries: S.optional(ProviderServiceList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProviderServicesOutput",
}) as any as S.Schema<ListProviderServicesOutput>;
export interface ListSchemaMappingsInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListSchemaMappingsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/schemas" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSchemaMappingsInput",
}) as any as S.Schema<ListSchemaMappingsInput>;
export interface SchemaMappingSummary {
  schemaName: string;
  schemaArn: string;
  createdAt: Date;
  updatedAt: Date;
  hasWorkflows: boolean;
}
export const SchemaMappingSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    schemaName: S.String,
    schemaArn: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    hasWorkflows: S.Boolean,
  }),
).annotate({
  identifier: "SchemaMappingSummary",
}) as any as S.Schema<SchemaMappingSummary>;
export type SchemaMappingList = SchemaMappingSummary[];
export const SchemaMappingList = /*@__PURE__*/ S.Array(SchemaMappingSummary);
export interface ListSchemaMappingsOutput {
  schemaList?: SchemaMappingSummary[];
  nextToken?: string;
}
export const ListSchemaMappingsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    schemaList: S.optional(SchemaMappingList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSchemaMappingsOutput",
}) as any as S.Schema<ListSchemaMappingsOutput>;
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
export interface PutPolicyInput {
  arn: string;
  token?: string;
  policy: string;
}
export const PutPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String.pipe(T.HttpLabel("arn")),
    token: S.optional(S.String),
    policy: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/policies/{arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "PutPolicyInput" }) as any as S.Schema<PutPolicyInput>;
export interface PutPolicyOutput {
  arn: string;
  token: string;
  policy?: string;
}
export const PutPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, token: S.String, policy: S.optional(S.String) }),
).annotate({
  identifier: "PutPolicyOutput",
}) as any as S.Schema<PutPolicyOutput>;
export interface StartIdMappingJobInput {
  workflowName: string;
  outputSourceConfig?: IdMappingJobOutputSource[];
  jobType?: JobType;
}
export const StartIdMappingJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowName: S.String.pipe(T.HttpLabel("workflowName")),
    outputSourceConfig: S.optional(IdMappingJobOutputSourceConfig),
    jobType: S.optional(JobType),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/idmappingworkflows/{workflowName}/jobs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartIdMappingJobInput",
}) as any as S.Schema<StartIdMappingJobInput>;
export interface StartIdMappingJobOutput {
  jobId: string;
  outputSourceConfig?: IdMappingJobOutputSource[];
  jobType?: JobType;
}
export const StartIdMappingJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String,
    outputSourceConfig: S.optional(IdMappingJobOutputSourceConfig),
    jobType: S.optional(JobType),
  }),
).annotate({
  identifier: "StartIdMappingJobOutput",
}) as any as S.Schema<StartIdMappingJobOutput>;
export interface StartMatchingJobInput {
  workflowName: string;
}
export const StartMatchingJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workflowName: S.String.pipe(T.HttpLabel("workflowName")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/matchingworkflows/{workflowName}/jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartMatchingJobInput",
}) as any as S.Schema<StartMatchingJobInput>;
export interface StartMatchingJobOutput {
  jobId: string;
}
export const StartMatchingJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String }),
).annotate({
  identifier: "StartMatchingJobOutput",
}) as any as S.Schema<StartMatchingJobOutput>;
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
export interface UpdateIdMappingWorkflowInput {
  workflowName: string;
  description?: string;
  inputSourceConfig: IdMappingWorkflowInputSource[];
  outputSourceConfig?: IdMappingWorkflowOutputSource[];
  idMappingTechniques: IdMappingTechniques;
  incrementalRunConfig?: IdMappingIncrementalRunConfig;
  roleArn?: string;
}
export const UpdateIdMappingWorkflowInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowName: S.String.pipe(T.HttpLabel("workflowName")),
    description: S.optional(S.String),
    inputSourceConfig: IdMappingWorkflowInputSourceConfig,
    outputSourceConfig: S.optional(IdMappingWorkflowOutputSourceConfig),
    idMappingTechniques: IdMappingTechniques,
    incrementalRunConfig: S.optional(IdMappingIncrementalRunConfig),
    roleArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/idmappingworkflows/{workflowName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateIdMappingWorkflowInput",
}) as any as S.Schema<UpdateIdMappingWorkflowInput>;
export interface UpdateIdMappingWorkflowOutput {
  workflowName: string;
  workflowArn: string;
  description?: string;
  inputSourceConfig: IdMappingWorkflowInputSource[];
  outputSourceConfig?: IdMappingWorkflowOutputSource[];
  idMappingTechniques: IdMappingTechniques;
  incrementalRunConfig?: IdMappingIncrementalRunConfig;
  roleArn?: string;
}
export const UpdateIdMappingWorkflowOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowName: S.String,
    workflowArn: S.String,
    description: S.optional(S.String),
    inputSourceConfig: IdMappingWorkflowInputSourceConfig,
    outputSourceConfig: S.optional(IdMappingWorkflowOutputSourceConfig),
    idMappingTechniques: IdMappingTechniques,
    incrementalRunConfig: S.optional(IdMappingIncrementalRunConfig),
    roleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateIdMappingWorkflowOutput",
}) as any as S.Schema<UpdateIdMappingWorkflowOutput>;
export interface UpdateIdNamespaceInput {
  idNamespaceName: string;
  description?: string;
  inputSourceConfig?: IdNamespaceInputSource[];
  idMappingWorkflowProperties?: IdNamespaceIdMappingWorkflowProperties[];
  roleArn?: string;
}
export const UpdateIdNamespaceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    idNamespaceName: S.String.pipe(T.HttpLabel("idNamespaceName")),
    description: S.optional(S.String),
    inputSourceConfig: S.optional(IdNamespaceInputSourceConfig),
    idMappingWorkflowProperties: S.optional(
      IdNamespaceIdMappingWorkflowPropertiesList,
    ),
    roleArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/idnamespaces/{idNamespaceName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateIdNamespaceInput",
}) as any as S.Schema<UpdateIdNamespaceInput>;
export interface UpdateIdNamespaceOutput {
  idNamespaceName: string;
  idNamespaceArn: string;
  description?: string;
  inputSourceConfig?: IdNamespaceInputSource[];
  idMappingWorkflowProperties?: IdNamespaceIdMappingWorkflowProperties[];
  type: IdNamespaceType;
  roleArn?: string;
  createdAt: Date;
  updatedAt: Date;
}
export const UpdateIdNamespaceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    idNamespaceName: S.String,
    idNamespaceArn: S.String,
    description: S.optional(S.String),
    inputSourceConfig: S.optional(IdNamespaceInputSourceConfig),
    idMappingWorkflowProperties: S.optional(
      IdNamespaceIdMappingWorkflowPropertiesList,
    ),
    type: IdNamespaceType,
    roleArn: S.optional(S.String),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "UpdateIdNamespaceOutput",
}) as any as S.Schema<UpdateIdNamespaceOutput>;
export interface UpdateMatchingWorkflowInput {
  workflowName: string;
  description?: string;
  inputSourceConfig: InputSource[];
  outputSourceConfig: OutputSource[];
  resolutionTechniques: ResolutionTechniques;
  incrementalRunConfig?: IncrementalRunConfig;
  roleArn: string;
}
export const UpdateMatchingWorkflowInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowName: S.String.pipe(T.HttpLabel("workflowName")),
    description: S.optional(S.String),
    inputSourceConfig: InputSourceConfig,
    outputSourceConfig: OutputSourceConfig,
    resolutionTechniques: ResolutionTechniques,
    incrementalRunConfig: S.optional(IncrementalRunConfig),
    roleArn: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/matchingworkflows/{workflowName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMatchingWorkflowInput",
}) as any as S.Schema<UpdateMatchingWorkflowInput>;
export interface UpdateMatchingWorkflowOutput {
  workflowName: string;
  description?: string;
  inputSourceConfig: InputSource[];
  outputSourceConfig: OutputSource[];
  resolutionTechniques: ResolutionTechniques;
  incrementalRunConfig?: IncrementalRunConfig;
  roleArn: string;
}
export const UpdateMatchingWorkflowOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowName: S.String,
    description: S.optional(S.String),
    inputSourceConfig: InputSourceConfig,
    outputSourceConfig: OutputSourceConfig,
    resolutionTechniques: ResolutionTechniques,
    incrementalRunConfig: S.optional(IncrementalRunConfig),
    roleArn: S.String,
  }),
).annotate({
  identifier: "UpdateMatchingWorkflowOutput",
}) as any as S.Schema<UpdateMatchingWorkflowOutput>;
export interface UpdateSchemaMappingInput {
  schemaName: string;
  description?: string;
  mappedInputFields: SchemaInputAttribute[];
}
export const UpdateSchemaMappingInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    schemaName: S.String.pipe(T.HttpLabel("schemaName")),
    description: S.optional(S.String),
    mappedInputFields: SchemaInputAttributes,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/schemas/{schemaName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSchemaMappingInput",
}) as any as S.Schema<UpdateSchemaMappingInput>;
export interface UpdateSchemaMappingOutput {
  schemaName: string;
  schemaArn: string;
  description?: string;
  mappedInputFields: SchemaInputAttribute[];
}
export const UpdateSchemaMappingOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    schemaName: S.String,
    schemaArn: S.String,
    description: S.optional(S.String),
    mappedInputFields: SchemaInputAttributes,
  }),
).annotate({
  identifier: "UpdateSchemaMappingOutput",
}) as any as S.Schema<UpdateSchemaMappingOutput>;
export type AddPolicyStatementError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a policy statement object. To retrieve a list of existing policy statements, use the `GetPolicy` API.
 */
export const addPolicyStatement: API.OperationMethod<
  AddPolicyStatementInput,
  AddPolicyStatementOutput,
  AddPolicyStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddPolicyStatementInput,
  output: AddPolicyStatementOutput,
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
  operationName: "AddPolicyStatement",
}));

export type BatchDeleteUniqueIdError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes multiple unique IDs in a matching workflow.
 */
export const batchDeleteUniqueId: API.OperationMethod<
  BatchDeleteUniqueIdInput,
  BatchDeleteUniqueIdOutput,
  BatchDeleteUniqueIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteUniqueIdInput,
  output: BatchDeleteUniqueIdOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteUniqueId",
}));

export type CreateIdMappingWorkflowError =
  | AccessDeniedException
  | ConflictException
  | ExceedsLimitException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an `IdMappingWorkflow` object which stores the configuration of the data processing job to be run. Each `IdMappingWorkflow` must have a unique workflow name. To modify an existing workflow, use the UpdateIdMappingWorkflow API.
 *
 * Incremental processing is not supported for ID mapping workflows.
 */
export const createIdMappingWorkflow: API.OperationMethod<
  CreateIdMappingWorkflowInput,
  CreateIdMappingWorkflowOutput,
  CreateIdMappingWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIdMappingWorkflowInput,
  output: CreateIdMappingWorkflowOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    ExceedsLimitException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIdMappingWorkflow",
}));

export type CreateIdNamespaceError =
  | AccessDeniedException
  | ConflictException
  | ExceedsLimitException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an ID namespace object which will help customers provide metadata explaining their dataset and how to use it. Each ID namespace must have a unique name. To modify an existing ID namespace, use the UpdateIdNamespace API.
 */
export const createIdNamespace: API.OperationMethod<
  CreateIdNamespaceInput,
  CreateIdNamespaceOutput,
  CreateIdNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIdNamespaceInput,
  output: CreateIdNamespaceOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    ExceedsLimitException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIdNamespace",
}));

export type CreateMatchingWorkflowError =
  | AccessDeniedException
  | ConflictException
  | ExceedsLimitException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a matching workflow that defines the configuration for a data processing job. The workflow name must be unique. To modify an existing workflow, use `UpdateMatchingWorkflow`.
 *
 * For workflows where `resolutionType` is `PROVIDER`, incremental processing is not supported.
 */
export const createMatchingWorkflow: API.OperationMethod<
  CreateMatchingWorkflowInput,
  CreateMatchingWorkflowOutput,
  CreateMatchingWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMatchingWorkflowInput,
  output: CreateMatchingWorkflowOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    ExceedsLimitException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMatchingWorkflow",
}));

export type CreateSchemaMappingError =
  | AccessDeniedException
  | ConflictException
  | ExceedsLimitException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a schema mapping, which defines the schema of the input customer records table. The `SchemaMapping` also provides Entity Resolution with some metadata about the table, such as the attribute types of the columns and which columns to match on.
 */
export const createSchemaMapping: API.OperationMethod<
  CreateSchemaMappingInput,
  CreateSchemaMappingOutput,
  CreateSchemaMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSchemaMappingInput,
  output: CreateSchemaMappingOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    ExceedsLimitException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSchemaMapping",
}));

export type DeleteIdMappingWorkflowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the `IdMappingWorkflow` with a given name. This operation returns a `ResourceNotFoundException` if a workflow with the given name does not exist.
 */
export const deleteIdMappingWorkflow: API.OperationMethod<
  DeleteIdMappingWorkflowInput,
  DeleteIdMappingWorkflowOutput,
  DeleteIdMappingWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIdMappingWorkflowInput,
  output: DeleteIdMappingWorkflowOutput,
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
  operationName: "DeleteIdMappingWorkflow",
}));

export type DeleteIdNamespaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | CommonErrors;
/**
 * Deletes the `IdNamespace` with a given name. This operation returns a `ResourceNotFoundException` if an ID namespace with the given name does not exist.
 */
export const deleteIdNamespace: API.OperationMethod<
  DeleteIdNamespaceInput,
  DeleteIdNamespaceOutput,
  DeleteIdNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIdNamespaceInput,
  output: DeleteIdNamespaceOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdNamespace",
}));

export type DeleteMatchingWorkflowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the `MatchingWorkflow` with a given name. This operation returns a `ResourceNotFoundException` if a workflow with the given name does not exist.
 */
export const deleteMatchingWorkflow: API.OperationMethod<
  DeleteMatchingWorkflowInput,
  DeleteMatchingWorkflowOutput,
  DeleteMatchingWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMatchingWorkflowInput,
  output: DeleteMatchingWorkflowOutput,
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
  operationName: "DeleteMatchingWorkflow",
}));

export type DeletePolicyStatementError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the policy statement.
 */
export const deletePolicyStatement: API.OperationMethod<
  DeletePolicyStatementInput,
  DeletePolicyStatementOutput,
  DeletePolicyStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePolicyStatementInput,
  output: DeletePolicyStatementOutput,
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
  operationName: "DeletePolicyStatement",
}));

export type DeleteSchemaMappingError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the `SchemaMapping` with a given name. This operation returns a `ResourceNotFoundException` if a schema with the given name does not exist. This operation will fail if there is a `MatchingWorkflow` object that references the `SchemaMapping` in the workflow's `InputSourceConfig`.
 */
export const deleteSchemaMapping: API.OperationMethod<
  DeleteSchemaMappingInput,
  DeleteSchemaMappingOutput,
  DeleteSchemaMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSchemaMappingInput,
  output: DeleteSchemaMappingOutput,
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
  operationName: "DeleteSchemaMapping",
}));

export type GenerateMatchIdError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Generates or retrieves Match IDs for records using a rule-based matching workflow. When you call this operation, it processes your records against the workflow's matching rules to identify potential matches. For existing records, it retrieves their Match IDs and associated rules. For records without matches, it generates new Match IDs. The operation saves results to Amazon S3.
 *
 * The processing type (`processingType`) you choose affects both the accuracy and response time of the operation. Additional charges apply for each API call, whether made through the Entity Resolution console or directly via the API. The rule-based matching workflow must exist and be active before calling this operation.
 */
export const generateMatchId: API.OperationMethod<
  GenerateMatchIdInput,
  GenerateMatchIdOutput,
  GenerateMatchIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GenerateMatchIdInput,
  output: GenerateMatchIdOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateMatchId",
}));

export type GetIdMappingJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the status, metrics, and errors (if there are any) that are associated with a job.
 */
export const getIdMappingJob: API.OperationMethod<
  GetIdMappingJobInput,
  GetIdMappingJobOutput,
  GetIdMappingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIdMappingJobInput,
  output: GetIdMappingJobOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdMappingJob",
}));

export type GetIdMappingWorkflowError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the `IdMappingWorkflow` with a given name, if it exists.
 */
export const getIdMappingWorkflow: API.OperationMethod<
  GetIdMappingWorkflowInput,
  GetIdMappingWorkflowOutput,
  GetIdMappingWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIdMappingWorkflowInput,
  output: GetIdMappingWorkflowOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdMappingWorkflow",
}));

export type GetIdNamespaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the `IdNamespace` with a given name, if it exists.
 */
export const getIdNamespace: API.OperationMethod<
  GetIdNamespaceInput,
  GetIdNamespaceOutput,
  GetIdNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIdNamespaceInput,
  output: GetIdNamespaceOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdNamespace",
}));

export type GetMatchIdError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the corresponding Match ID of a customer record if the record has been processed in a rule-based matching workflow.
 *
 * You can call this API as a dry run of an incremental load on the rule-based matching workflow.
 */
export const getMatchId: API.OperationMethod<
  GetMatchIdInput,
  GetMatchIdOutput,
  GetMatchIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMatchIdInput,
  output: GetMatchIdOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMatchId",
}));

export type GetMatchingJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the status, metrics, and errors (if there are any) that are associated with a job.
 */
export const getMatchingJob: API.OperationMethod<
  GetMatchingJobInput,
  GetMatchingJobOutput,
  GetMatchingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMatchingJobInput,
  output: GetMatchingJobOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMatchingJob",
}));

export type GetMatchingWorkflowError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the `MatchingWorkflow` with a given name, if it exists.
 */
export const getMatchingWorkflow: API.OperationMethod<
  GetMatchingWorkflowInput,
  GetMatchingWorkflowOutput,
  GetMatchingWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMatchingWorkflowInput,
  output: GetMatchingWorkflowOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMatchingWorkflow",
}));

export type GetPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the resource-based policy.
 */
export const getPolicy: API.OperationMethod<
  GetPolicyInput,
  GetPolicyOutput,
  GetPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPolicyInput,
  output: GetPolicyOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicy",
}));

export type GetProviderServiceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the `ProviderService` of a given name.
 */
export const getProviderService: API.OperationMethod<
  GetProviderServiceInput,
  GetProviderServiceOutput,
  GetProviderServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProviderServiceInput,
  output: GetProviderServiceOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProviderService",
}));

export type GetSchemaMappingError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the SchemaMapping of a given name.
 */
export const getSchemaMapping: API.OperationMethod<
  GetSchemaMappingInput,
  GetSchemaMappingOutput,
  GetSchemaMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSchemaMappingInput,
  output: GetSchemaMappingOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSchemaMapping",
}));

export type ListIdMappingJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all ID mapping jobs for a given workflow.
 */
export const listIdMappingJobs: API.PaginatedOperationMethod<
  ListIdMappingJobsInput,
  ListIdMappingJobsOutput,
  ListIdMappingJobsError,
  Credentials | HttpClient.HttpClient,
  JobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIdMappingJobsInput,
  output: ListIdMappingJobsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdMappingJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIdMappingWorkflowsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all the `IdMappingWorkflows` that have been created for an Amazon Web Services account.
 */
export const listIdMappingWorkflows: API.PaginatedOperationMethod<
  ListIdMappingWorkflowsInput,
  ListIdMappingWorkflowsOutput,
  ListIdMappingWorkflowsError,
  Credentials | HttpClient.HttpClient,
  IdMappingWorkflowSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIdMappingWorkflowsInput,
  output: ListIdMappingWorkflowsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdMappingWorkflows",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workflowSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIdNamespacesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all ID namespaces.
 */
export const listIdNamespaces: API.PaginatedOperationMethod<
  ListIdNamespacesInput,
  ListIdNamespacesOutput,
  ListIdNamespacesError,
  Credentials | HttpClient.HttpClient,
  IdNamespaceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIdNamespacesInput,
  output: ListIdNamespacesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdNamespaces",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "idNamespaceSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMatchingJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all jobs for a given workflow.
 */
export const listMatchingJobs: API.PaginatedOperationMethod<
  ListMatchingJobsInput,
  ListMatchingJobsOutput,
  ListMatchingJobsError,
  Credentials | HttpClient.HttpClient,
  JobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMatchingJobsInput,
  output: ListMatchingJobsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMatchingJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMatchingWorkflowsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all the `MatchingWorkflows` that have been created for an Amazon Web Services account.
 */
export const listMatchingWorkflows: API.PaginatedOperationMethod<
  ListMatchingWorkflowsInput,
  ListMatchingWorkflowsOutput,
  ListMatchingWorkflowsError,
  Credentials | HttpClient.HttpClient,
  MatchingWorkflowSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMatchingWorkflowsInput,
  output: ListMatchingWorkflowsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMatchingWorkflows",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workflowSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProviderServicesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all the `ProviderServices` that are available in this Amazon Web Services Region.
 */
export const listProviderServices: API.PaginatedOperationMethod<
  ListProviderServicesInput,
  ListProviderServicesOutput,
  ListProviderServicesError,
  Credentials | HttpClient.HttpClient,
  ProviderServiceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProviderServicesInput,
  output: ListProviderServicesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProviderServices",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "providerServiceSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSchemaMappingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all the `SchemaMappings` that have been created for an Amazon Web Services account.
 */
export const listSchemaMappings: API.PaginatedOperationMethod<
  ListSchemaMappingsInput,
  ListSchemaMappingsOutput,
  ListSchemaMappingsError,
  Credentials | HttpClient.HttpClient,
  SchemaMappingSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSchemaMappingsInput,
  output: ListSchemaMappingsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSchemaMappings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "schemaList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Displays the tags associated with an Entity Resolution resource. In Entity Resolution, `SchemaMapping`, and `MatchingWorkflow` can be tagged.
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
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the resource-based policy.
 */
export const putPolicy: API.OperationMethod<
  PutPolicyInput,
  PutPolicyOutput,
  PutPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutPolicyInput,
  output: PutPolicyOutput,
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
  operationName: "PutPolicy",
}));

export type StartIdMappingJobError =
  | AccessDeniedException
  | ConflictException
  | ExceedsLimitException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts the `IdMappingJob` of a workflow. The workflow must have previously been created using the `CreateIdMappingWorkflow` endpoint.
 */
export const startIdMappingJob: API.OperationMethod<
  StartIdMappingJobInput,
  StartIdMappingJobOutput,
  StartIdMappingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartIdMappingJobInput,
  output: StartIdMappingJobOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    ExceedsLimitException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartIdMappingJob",
}));

export type StartMatchingJobError =
  | AccessDeniedException
  | ConflictException
  | ExceedsLimitException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts the `MatchingJob` of a workflow. The workflow must have previously been created using the `CreateMatchingWorkflow` endpoint.
 */
export const startMatchingJob: API.OperationMethod<
  StartMatchingJobInput,
  StartMatchingJobOutput,
  StartMatchingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMatchingJobInput,
  output: StartMatchingJobOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    ExceedsLimitException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMatchingJob",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified Entity Resolution resource. Tags can help you organize and categorize your resources. You can also use them to scope user permissions by granting a user permission to access or change only resources with certain tag values. In Entity Resolution, `SchemaMapping` and `MatchingWorkflow` can be tagged. Tags don't have any semantic meaning to Amazon Web Services and are interpreted strictly as strings of characters. You can use the `TagResource` action with a resource that already has tags. If you specify a new tag key, this tag is appended to the list of tags associated with the resource. If you specify a tag key that is already associated with the resource, the new tag value that you specify replaces the previous value for that tag.
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
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes one or more tags from the specified Entity Resolution resource. In Entity Resolution, `SchemaMapping`, and `MatchingWorkflow` can be tagged.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceOutput,
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateIdMappingWorkflowError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing `IdMappingWorkflow`. This method is identical to CreateIdMappingWorkflow, except it uses an HTTP `PUT` request instead of a `POST` request, and the `IdMappingWorkflow` must already exist for the method to succeed.
 *
 * Incremental processing is not supported for ID mapping workflows.
 */
export const updateIdMappingWorkflow: API.OperationMethod<
  UpdateIdMappingWorkflowInput,
  UpdateIdMappingWorkflowOutput,
  UpdateIdMappingWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIdMappingWorkflowInput,
  output: UpdateIdMappingWorkflowOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIdMappingWorkflow",
}));

export type UpdateIdNamespaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing ID namespace.
 */
export const updateIdNamespace: API.OperationMethod<
  UpdateIdNamespaceInput,
  UpdateIdNamespaceOutput,
  UpdateIdNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIdNamespaceInput,
  output: UpdateIdNamespaceOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIdNamespace",
}));

export type UpdateMatchingWorkflowError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing matching workflow. The workflow must already exist for this operation to succeed.
 *
 * For workflows where `resolutionType` is `PROVIDER`, incremental processing is not supported.
 */
export const updateMatchingWorkflow: API.OperationMethod<
  UpdateMatchingWorkflowInput,
  UpdateMatchingWorkflowOutput,
  UpdateMatchingWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMatchingWorkflowInput,
  output: UpdateMatchingWorkflowOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMatchingWorkflow",
}));

export type UpdateSchemaMappingError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a schema mapping.
 *
 * A schema is immutable if it is being used by a workflow. Therefore, you can't update a schema mapping if it's associated with a workflow.
 */
export const updateSchemaMapping: API.OperationMethod<
  UpdateSchemaMappingInput,
  UpdateSchemaMappingOutput,
  UpdateSchemaMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSchemaMappingInput,
  output: UpdateSchemaMappingOutput,
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
  operationName: "UpdateSchemaMapping",
}));
