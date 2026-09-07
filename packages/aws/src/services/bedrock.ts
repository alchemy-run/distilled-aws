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
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "Bedrock",
  serviceShapeName: "AmazonBedrockControlPlaneService",
});
const auth = T.AwsAuthSigv4({ name: "bedrock" });
const ver = T.ServiceVersion("2023-04-20");
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
              `https://bedrock-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://bedrock-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://bedrock.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://bedrock.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceName: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type AdvancedPromptOptimizationJobIdentifier = string;
export type AdvancedPromptOptimizationJobIdentifiers = string[];
export const AdvancedPromptOptimizationJobIdentifiers = /*@__PURE__*/ S.Array(
  S.String,
);
export interface BatchDeleteAdvancedPromptOptimizationJobRequest {
  jobIdentifiers: string[];
}
export const BatchDeleteAdvancedPromptOptimizationJobRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ jobIdentifiers: AdvancedPromptOptimizationJobIdentifiers }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/advanced-prompt-optimization-job/batch-delete",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "BatchDeleteAdvancedPromptOptimizationJobRequest",
  }) as any as S.Schema<BatchDeleteAdvancedPromptOptimizationJobRequest>;
export interface BatchDeleteAdvancedPromptOptimizationJobError_ {
  jobIdentifier: string;
  code: string;
  message?: string;
}
export const BatchDeleteAdvancedPromptOptimizationJobError_ =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      jobIdentifier: S.String,
      code: S.String,
      message: S.optional(S.String),
    }),
  ).annotate({
    identifier: "BatchDeleteAdvancedPromptOptimizationJobError",
  }) as any as S.Schema<BatchDeleteAdvancedPromptOptimizationJobError_>;
export type BatchDeleteAdvancedPromptOptimizationJobErrors =
  BatchDeleteAdvancedPromptOptimizationJobError_[];
export const BatchDeleteAdvancedPromptOptimizationJobErrors =
  /*@__PURE__*/ S.Array(BatchDeleteAdvancedPromptOptimizationJobError_);
export type AdvancedPromptOptimizationJobStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | "PartiallyCompleted"
  | "Stopping"
  | "Stopped"
  | "Deleting"
  | (string & {});
export const AdvancedPromptOptimizationJobStatus = /*@__PURE__*/ S.String;

export interface BatchDeleteAdvancedPromptOptimizationJobItem {
  jobIdentifier: string;
  jobStatus: AdvancedPromptOptimizationJobStatus;
}
export const BatchDeleteAdvancedPromptOptimizationJobItem =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      jobIdentifier: S.String,
      jobStatus: AdvancedPromptOptimizationJobStatus,
    }),
  ).annotate({
    identifier: "BatchDeleteAdvancedPromptOptimizationJobItem",
  }) as any as S.Schema<BatchDeleteAdvancedPromptOptimizationJobItem>;
export type BatchDeleteAdvancedPromptOptimizationJobItems =
  BatchDeleteAdvancedPromptOptimizationJobItem[];
export const BatchDeleteAdvancedPromptOptimizationJobItems =
  /*@__PURE__*/ S.Array(BatchDeleteAdvancedPromptOptimizationJobItem);
export interface BatchDeleteAdvancedPromptOptimizationJobResponse {
  errors: BatchDeleteAdvancedPromptOptimizationJobError_[];
  advancedPromptOptimizationJobs: BatchDeleteAdvancedPromptOptimizationJobItem[];
}
export const BatchDeleteAdvancedPromptOptimizationJobResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      errors: BatchDeleteAdvancedPromptOptimizationJobErrors,
      advancedPromptOptimizationJobs:
        BatchDeleteAdvancedPromptOptimizationJobItems,
    }),
  ).annotate({
    identifier: "BatchDeleteAdvancedPromptOptimizationJobResponse",
  }) as any as S.Schema<BatchDeleteAdvancedPromptOptimizationJobResponse>;
export type EvaluationJobIdentifier = string | redacted.Redacted<string>;
export type EvaluationJobIdentifiers = (string | redacted.Redacted<string>)[];
export const EvaluationJobIdentifiers = /*@__PURE__*/ S.Array(SensitiveString);
export interface BatchDeleteEvaluationJobRequest {
  jobIdentifiers: (string | redacted.Redacted<string>)[];
}
export const BatchDeleteEvaluationJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobIdentifiers: EvaluationJobIdentifiers }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/evaluation-jobs/batch-delete" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchDeleteEvaluationJobRequest",
}) as any as S.Schema<BatchDeleteEvaluationJobRequest>;
export interface BatchDeleteEvaluationJobError_ {
  jobIdentifier: string | redacted.Redacted<string>;
  code: string;
  message?: string;
}
export const BatchDeleteEvaluationJobError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobIdentifier: SensitiveString,
    code: S.String,
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchDeleteEvaluationJobError",
}) as any as S.Schema<BatchDeleteEvaluationJobError_>;
export type BatchDeleteEvaluationJobErrors = BatchDeleteEvaluationJobError_[];
export const BatchDeleteEvaluationJobErrors = /*@__PURE__*/ S.Array(
  BatchDeleteEvaluationJobError_,
);
export type EvaluationJobStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | "Deleting"
  | (string & {});
export const EvaluationJobStatus = /*@__PURE__*/ S.String;

export interface BatchDeleteEvaluationJobItem {
  jobIdentifier: string | redacted.Redacted<string>;
  jobStatus: EvaluationJobStatus;
}
export const BatchDeleteEvaluationJobItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobIdentifier: SensitiveString, jobStatus: EvaluationJobStatus }),
).annotate({
  identifier: "BatchDeleteEvaluationJobItem",
}) as any as S.Schema<BatchDeleteEvaluationJobItem>;
export type BatchDeleteEvaluationJobItems = BatchDeleteEvaluationJobItem[];
export const BatchDeleteEvaluationJobItems = /*@__PURE__*/ S.Array(
  BatchDeleteEvaluationJobItem,
);
export interface BatchDeleteEvaluationJobResponse {
  errors: BatchDeleteEvaluationJobError_[];
  evaluationJobs: BatchDeleteEvaluationJobItem[];
}
export const BatchDeleteEvaluationJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    errors: BatchDeleteEvaluationJobErrors,
    evaluationJobs: BatchDeleteEvaluationJobItems,
  }),
).annotate({
  identifier: "BatchDeleteEvaluationJobResponse",
}) as any as S.Schema<BatchDeleteEvaluationJobResponse>;
export type AutomatedReasoningPolicyArn = string;
export type AutomatedReasoningPolicyBuildWorkflowId = string;
export interface CancelAutomatedReasoningPolicyBuildWorkflowRequest {
  policyArn: string;
  buildWorkflowId: string;
}
export const CancelAutomatedReasoningPolicyBuildWorkflowRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyArn: S.String.pipe(T.HttpLabel("policyArn")),
      buildWorkflowId: S.String.pipe(T.HttpLabel("buildWorkflowId")),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}/cancel",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CancelAutomatedReasoningPolicyBuildWorkflowRequest",
  }) as any as S.Schema<CancelAutomatedReasoningPolicyBuildWorkflowRequest>;
export interface CancelAutomatedReasoningPolicyBuildWorkflowResponse {}
export const CancelAutomatedReasoningPolicyBuildWorkflowResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "CancelAutomatedReasoningPolicyBuildWorkflowResponse",
  }) as any as S.Schema<CancelAutomatedReasoningPolicyBuildWorkflowResponse>;
export type AdvancedPromptOptimizationJobName = string;
export type AdvancedPromptOptimizationJobDescription = string;
export type IdempotencyToken = string;
export type S3Uri = string;
export interface AdvancedPromptOptimizationInputConfig {
  s3Uri: string;
}
export const AdvancedPromptOptimizationInputConfig = /*@__PURE__*/ S.suspend(
  () => S.Struct({ s3Uri: S.String }),
).annotate({
  identifier: "AdvancedPromptOptimizationInputConfig",
}) as any as S.Schema<AdvancedPromptOptimizationInputConfig>;
export type S3UriFolder = string;
export interface AdvancedPromptOptimizationOutputConfig {
  s3Uri: string;
}
export const AdvancedPromptOptimizationOutputConfig = /*@__PURE__*/ S.suspend(
  () => S.Struct({ s3Uri: S.String }),
).annotate({
  identifier: "AdvancedPromptOptimizationOutputConfig",
}) as any as S.Schema<AdvancedPromptOptimizationOutputConfig>;
export type KmsKeyArn = string;
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
export type BedrockModelId = string;
export type NonEmptyStringList = string[];
export const NonEmptyStringList = /*@__PURE__*/ S.Array(S.String);
export interface InferenceConfiguration {
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  stopSequences?: string[];
}
export const InferenceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxTokens: S.optional(S.Number),
    temperature: S.optional(S.Number),
    topP: S.optional(S.Number),
    stopSequences: S.optional(NonEmptyStringList),
  }),
).annotate({
  identifier: "InferenceConfiguration",
}) as any as S.Schema<InferenceConfiguration>;
export type AdditionalModelRequestFieldsKey = string;
export type AdditionalModelRequestFieldsValue = unknown;
export type AdditionalModelRequestFields = { [key: string]: any | undefined };
export const AdditionalModelRequestFields = /*@__PURE__*/ S.Record(
  S.String,
  S.Any.pipe(S.optional),
);
export interface ModelConfiguration {
  modelId: string;
  inferenceConfig?: InferenceConfiguration;
  additionalModelRequestFields?: { [key: string]: any | undefined };
}
export const ModelConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.String,
    inferenceConfig: S.optional(InferenceConfiguration),
    additionalModelRequestFields: S.optional(AdditionalModelRequestFields),
  }),
).annotate({
  identifier: "ModelConfiguration",
}) as any as S.Schema<ModelConfiguration>;
export type ModelConfigurations = ModelConfiguration[];
export const ModelConfigurations = /*@__PURE__*/ S.Array(ModelConfiguration);
export interface CreateAdvancedPromptOptimizationJobRequest {
  jobName: string;
  jobDescription?: string;
  clientToken?: string;
  inputConfig: AdvancedPromptOptimizationInputConfig;
  outputConfig: AdvancedPromptOptimizationOutputConfig;
  encryptionKeyArn?: string;
  tags?: Tag[];
  modelConfigurations: ModelConfiguration[];
}
export const CreateAdvancedPromptOptimizationJobRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      jobName: S.String,
      jobDescription: S.optional(S.String),
      clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      inputConfig: AdvancedPromptOptimizationInputConfig,
      outputConfig: AdvancedPromptOptimizationOutputConfig,
      encryptionKeyArn: S.optional(S.String),
      tags: S.optional(TagList),
      modelConfigurations: ModelConfigurations,
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/advanced-prompt-optimization-jobs" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateAdvancedPromptOptimizationJobRequest",
  }) as any as S.Schema<CreateAdvancedPromptOptimizationJobRequest>;
export type AdvancedPromptOptimizationJobArn = string;
export interface CreateAdvancedPromptOptimizationJobResponse {
  jobArn: string;
}
export const CreateAdvancedPromptOptimizationJobResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({ jobArn: S.String })).annotate({
    identifier: "CreateAdvancedPromptOptimizationJobResponse",
  }) as any as S.Schema<CreateAdvancedPromptOptimizationJobResponse>;
export type AutomatedReasoningPolicyName = string | redacted.Redacted<string>;
export type AutomatedReasoningPolicyDescription =
  | string
  | redacted.Redacted<string>;
export type AutomatedReasoningPolicyFormatVersion = string;
export type AutomatedReasoningPolicyDefinitionTypeName =
  | string
  | redacted.Redacted<string>;
export type AutomatedReasoningPolicyDefinitionTypeDescription =
  | string
  | redacted.Redacted<string>;
export type AutomatedReasoningPolicyDefinitionTypeValueName = string;
export type AutomatedReasoningPolicyDefinitionTypeValueDescription =
  | string
  | redacted.Redacted<string>;
export interface AutomatedReasoningPolicyDefinitionTypeValue {
  value: string;
  description?: string | redacted.Redacted<string>;
}
export const AutomatedReasoningPolicyDefinitionTypeValue =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ value: S.String, description: S.optional(SensitiveString) }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyDefinitionTypeValue",
  }) as any as S.Schema<AutomatedReasoningPolicyDefinitionTypeValue>;
export type AutomatedReasoningPolicyDefinitionTypeValueList =
  AutomatedReasoningPolicyDefinitionTypeValue[];
export const AutomatedReasoningPolicyDefinitionTypeValueList =
  /*@__PURE__*/ S.Array(AutomatedReasoningPolicyDefinitionTypeValue);
export interface AutomatedReasoningPolicyDefinitionType {
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  values: AutomatedReasoningPolicyDefinitionTypeValue[];
}
export const AutomatedReasoningPolicyDefinitionType = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      name: SensitiveString,
      description: S.optional(SensitiveString),
      values: AutomatedReasoningPolicyDefinitionTypeValueList,
    }),
).annotate({
  identifier: "AutomatedReasoningPolicyDefinitionType",
}) as any as S.Schema<AutomatedReasoningPolicyDefinitionType>;
export type AutomatedReasoningPolicyDefinitionTypeList =
  AutomatedReasoningPolicyDefinitionType[];
export const AutomatedReasoningPolicyDefinitionTypeList = /*@__PURE__*/ S.Array(
  AutomatedReasoningPolicyDefinitionType,
);
export type AutomatedReasoningPolicyDefinitionRuleId = string;
export type AutomatedReasoningPolicyDefinitionRuleExpression =
  | string
  | redacted.Redacted<string>;
export type AutomatedReasoningPolicyDefinitionRuleAlternateExpression =
  | string
  | redacted.Redacted<string>;
export interface AutomatedReasoningPolicyDefinitionRule {
  id: string;
  expression: string | redacted.Redacted<string>;
  alternateExpression?: string | redacted.Redacted<string>;
}
export const AutomatedReasoningPolicyDefinitionRule = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      id: S.String,
      expression: SensitiveString,
      alternateExpression: S.optional(SensitiveString),
    }),
).annotate({
  identifier: "AutomatedReasoningPolicyDefinitionRule",
}) as any as S.Schema<AutomatedReasoningPolicyDefinitionRule>;
export type AutomatedReasoningPolicyDefinitionRuleList =
  AutomatedReasoningPolicyDefinitionRule[];
export const AutomatedReasoningPolicyDefinitionRuleList = /*@__PURE__*/ S.Array(
  AutomatedReasoningPolicyDefinitionRule,
);
export type AutomatedReasoningPolicyDefinitionVariableName =
  | string
  | redacted.Redacted<string>;
export type AutomatedReasoningPolicyDefinitionVariableDescription =
  | string
  | redacted.Redacted<string>;
export interface AutomatedReasoningPolicyDefinitionVariable {
  name: string | redacted.Redacted<string>;
  type: string | redacted.Redacted<string>;
  description: string | redacted.Redacted<string>;
}
export const AutomatedReasoningPolicyDefinitionVariable =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      name: SensitiveString,
      type: SensitiveString,
      description: SensitiveString,
    }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyDefinitionVariable",
  }) as any as S.Schema<AutomatedReasoningPolicyDefinitionVariable>;
export type AutomatedReasoningPolicyDefinitionVariableList =
  AutomatedReasoningPolicyDefinitionVariable[];
export const AutomatedReasoningPolicyDefinitionVariableList =
  /*@__PURE__*/ S.Array(AutomatedReasoningPolicyDefinitionVariable);
export interface AutomatedReasoningPolicyDefinition {
  version?: string;
  types?: AutomatedReasoningPolicyDefinitionType[];
  rules?: AutomatedReasoningPolicyDefinitionRule[];
  variables?: AutomatedReasoningPolicyDefinitionVariable[];
}
export const AutomatedReasoningPolicyDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    version: S.optional(S.String),
    types: S.optional(AutomatedReasoningPolicyDefinitionTypeList),
    rules: S.optional(AutomatedReasoningPolicyDefinitionRuleList),
    variables: S.optional(AutomatedReasoningPolicyDefinitionVariableList),
  }),
).annotate({
  identifier: "AutomatedReasoningPolicyDefinition",
}) as any as S.Schema<AutomatedReasoningPolicyDefinition>;
export type KmsKeyId = string;
export interface CreateAutomatedReasoningPolicyRequest {
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  clientRequestToken?: string;
  policyDefinition?: AutomatedReasoningPolicyDefinition;
  kmsKeyId?: string;
  tags?: Tag[];
}
export const CreateAutomatedReasoningPolicyRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      name: SensitiveString,
      description: S.optional(SensitiveString),
      clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      policyDefinition: S.optional(AutomatedReasoningPolicyDefinition),
      kmsKeyId: S.optional(S.String),
      tags: S.optional(TagList),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/automated-reasoning-policies" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateAutomatedReasoningPolicyRequest",
}) as any as S.Schema<CreateAutomatedReasoningPolicyRequest>;
export type AutomatedReasoningPolicyVersion = string;
export type AutomatedReasoningPolicyHash = string;
export interface CreateAutomatedReasoningPolicyResponse {
  policyArn: string;
  version: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  definitionHash?: string;
  createdAt: Date;
  updatedAt: Date;
}
export const CreateAutomatedReasoningPolicyResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      policyArn: S.String,
      version: S.String,
      name: SensitiveString,
      description: S.optional(SensitiveString),
      definitionHash: S.optional(S.String),
      createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    }),
).annotate({
  identifier: "CreateAutomatedReasoningPolicyResponse",
}) as any as S.Schema<CreateAutomatedReasoningPolicyResponse>;
export type AutomatedReasoningPolicyTestGuardContent =
  | string
  | redacted.Redacted<string>;
export type AutomatedReasoningPolicyTestQueryContent =
  | string
  | redacted.Redacted<string>;
export type AutomatedReasoningCheckResult =
  | "VALID"
  | "INVALID"
  | "SATISFIABLE"
  | "IMPOSSIBLE"
  | "TRANSLATION_AMBIGUOUS"
  | "TOO_COMPLEX"
  | "NO_TRANSLATION"
  | (string & {});
export const AutomatedReasoningCheckResult = /*@__PURE__*/ S.String;

export type AutomatedReasoningCheckTranslationConfidence = number;
export interface CreateAutomatedReasoningPolicyTestCaseRequest {
  policyArn: string;
  guardContent: string | redacted.Redacted<string>;
  queryContent?: string | redacted.Redacted<string>;
  expectedAggregatedFindingsResult: AutomatedReasoningCheckResult;
  clientRequestToken?: string;
  confidenceThreshold?: number;
}
export const CreateAutomatedReasoningPolicyTestCaseRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyArn: S.String.pipe(T.HttpLabel("policyArn")),
      guardContent: SensitiveString,
      queryContent: S.optional(SensitiveString),
      expectedAggregatedFindingsResult: AutomatedReasoningCheckResult,
      clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      confidenceThreshold: S.optional(S.Number),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/automated-reasoning-policies/{policyArn}/test-cases",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateAutomatedReasoningPolicyTestCaseRequest",
  }) as any as S.Schema<CreateAutomatedReasoningPolicyTestCaseRequest>;
export type AutomatedReasoningPolicyTestCaseId = string;
export interface CreateAutomatedReasoningPolicyTestCaseResponse {
  policyArn: string;
  testCaseId: string;
}
export const CreateAutomatedReasoningPolicyTestCaseResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ policyArn: S.String, testCaseId: S.String }),
  ).annotate({
    identifier: "CreateAutomatedReasoningPolicyTestCaseResponse",
  }) as any as S.Schema<CreateAutomatedReasoningPolicyTestCaseResponse>;
export interface CreateAutomatedReasoningPolicyVersionRequest {
  policyArn: string;
  clientRequestToken?: string;
  lastUpdatedDefinitionHash: string;
  tags?: Tag[];
}
export const CreateAutomatedReasoningPolicyVersionRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyArn: S.String.pipe(T.HttpLabel("policyArn")),
      clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      lastUpdatedDefinitionHash: S.String,
      tags: S.optional(TagList),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/automated-reasoning-policies/{policyArn}/versions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateAutomatedReasoningPolicyVersionRequest",
  }) as any as S.Schema<CreateAutomatedReasoningPolicyVersionRequest>;
export interface CreateAutomatedReasoningPolicyVersionResponse {
  policyArn: string;
  version: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  definitionHash: string;
  createdAt: Date;
}
export const CreateAutomatedReasoningPolicyVersionResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyArn: S.String,
      version: S.String,
      name: SensitiveString,
      description: S.optional(SensitiveString),
      definitionHash: S.String,
      createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    }),
  ).annotate({
    identifier: "CreateAutomatedReasoningPolicyVersionResponse",
  }) as any as S.Schema<CreateAutomatedReasoningPolicyVersionResponse>;
export type CustomModelName = string;
export interface S3DataSource {
  s3Uri: string;
}
export const S3DataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Uri: S.String }),
).annotate({ identifier: "S3DataSource" }) as any as S.Schema<S3DataSource>;
export type ModelDataSource = { s3DataSource: S3DataSource };
export const ModelDataSource = /*@__PURE__*/ S.Union([
  S.Struct({ s3DataSource: S3DataSource }),
]);
export type ModelPackageArn = string;
export interface ModelPackageArnDataSource {
  modelPackageArn: string;
}
export const ModelPackageArnDataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ modelPackageArn: S.String }),
).annotate({
  identifier: "ModelPackageArnDataSource",
}) as any as S.Schema<ModelPackageArnDataSource>;
export type CustomModelDataSource = {
  modelPackageArnDataSource: ModelPackageArnDataSource;
};
export const CustomModelDataSource = /*@__PURE__*/ S.Union([
  S.Struct({ modelPackageArnDataSource: ModelPackageArnDataSource }),
]);
export type RoleArn = string;
export interface CreateCustomModelRequest {
  modelName: string;
  modelSourceConfig?: ModelDataSource;
  customModelDataSource?: CustomModelDataSource;
  modelKmsKeyArn?: string;
  roleArn?: string;
  modelTags?: Tag[];
  clientRequestToken?: string;
}
export const CreateCustomModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelName: S.String,
    modelSourceConfig: S.optional(ModelDataSource),
    customModelDataSource: S.optional(CustomModelDataSource),
    modelKmsKeyArn: S.optional(S.String),
    roleArn: S.optional(S.String),
    modelTags: S.optional(TagList),
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/custom-models/create-custom-model" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCustomModelRequest",
}) as any as S.Schema<CreateCustomModelRequest>;
export type ModelArn = string;
export interface CreateCustomModelResponse {
  modelArn: string;
}
export const CreateCustomModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ modelArn: S.String }),
).annotate({
  identifier: "CreateCustomModelResponse",
}) as any as S.Schema<CreateCustomModelResponse>;
export type ModelDeploymentName = string;
export type CustomModelArn = string;
export type CustomModelDeploymentDescription = string;
export interface CreateCustomModelDeploymentRequest {
  modelDeploymentName: string;
  modelArn: string;
  description?: string;
  tags?: Tag[];
  clientRequestToken?: string;
}
export const CreateCustomModelDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelDeploymentName: S.String,
    modelArn: S.String,
    description: S.optional(S.String),
    tags: S.optional(TagList),
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/model-customization/custom-model-deployments",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCustomModelDeploymentRequest",
}) as any as S.Schema<CreateCustomModelDeploymentRequest>;
export type CustomModelDeploymentArn = string;
export interface CreateCustomModelDeploymentResponse {
  customModelDeploymentArn: string;
}
export const CreateCustomModelDeploymentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ customModelDeploymentArn: S.String }),
).annotate({
  identifier: "CreateCustomModelDeploymentResponse",
}) as any as S.Schema<CreateCustomModelDeploymentResponse>;
export type EvaluationJobName = string;
export type EvaluationJobDescription = string | redacted.Redacted<string>;
export type ApplicationType =
  | "ModelEvaluation"
  | "RagEvaluation"
  | (string & {});
export const ApplicationType = /*@__PURE__*/ S.String;

export type EvaluationTaskType =
  | "Summarization"
  | "Classification"
  | "QuestionAndAnswer"
  | "Generation"
  | "Custom"
  | (string & {});
export const EvaluationTaskType = /*@__PURE__*/ S.String;

export type EvaluationDatasetName = string | redacted.Redacted<string>;
export type EvaluationDatasetLocation = { s3Uri: string };
export const EvaluationDatasetLocation = /*@__PURE__*/ S.Union([
  S.Struct({ s3Uri: S.String }),
]);
export interface EvaluationDataset {
  name: string | redacted.Redacted<string>;
  datasetLocation?: EvaluationDatasetLocation;
}
export const EvaluationDataset = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: SensitiveString,
    datasetLocation: S.optional(EvaluationDatasetLocation),
  }),
).annotate({
  identifier: "EvaluationDataset",
}) as any as S.Schema<EvaluationDataset>;
export type EvaluationMetricName = string | redacted.Redacted<string>;
export type EvaluationMetricNames = (string | redacted.Redacted<string>)[];
export const EvaluationMetricNames = /*@__PURE__*/ S.Array(SensitiveString);
export interface EvaluationDatasetMetricConfig {
  taskType: EvaluationTaskType;
  dataset: EvaluationDataset;
  metricNames: (string | redacted.Redacted<string>)[];
}
export const EvaluationDatasetMetricConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskType: EvaluationTaskType,
    dataset: EvaluationDataset,
    metricNames: EvaluationMetricNames,
  }),
).annotate({
  identifier: "EvaluationDatasetMetricConfig",
}) as any as S.Schema<EvaluationDatasetMetricConfig>;
export type EvaluationDatasetMetricConfigs = EvaluationDatasetMetricConfig[];
export const EvaluationDatasetMetricConfigs = /*@__PURE__*/ S.Array(
  EvaluationDatasetMetricConfig,
);
export type EvaluatorModelIdentifier = string;
export interface BedrockEvaluatorModel {
  modelIdentifier: string;
}
export const BedrockEvaluatorModel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ modelIdentifier: S.String }),
).annotate({
  identifier: "BedrockEvaluatorModel",
}) as any as S.Schema<BedrockEvaluatorModel>;
export type BedrockEvaluatorModels = BedrockEvaluatorModel[];
export const BedrockEvaluatorModels = /*@__PURE__*/ S.Array(
  BedrockEvaluatorModel,
);
export type EvaluatorModelConfig = {
  bedrockEvaluatorModels: BedrockEvaluatorModel[];
};
export const EvaluatorModelConfig = /*@__PURE__*/ S.Union([
  S.Struct({ bedrockEvaluatorModels: BedrockEvaluatorModels }),
]);
export type MetricName = string | redacted.Redacted<string>;
export type CustomMetricInstructions = string;
export type RatingScaleItemDefinition = string;
export type RatingScaleItemValue =
  | { stringValue: string; floatValue?: never }
  | { stringValue?: never; floatValue: number };
export const RatingScaleItemValue = /*@__PURE__*/ S.Union([
  S.Struct({ stringValue: S.String }),
  S.Struct({ floatValue: S.Number }),
]);
export interface RatingScaleItem {
  definition: string;
  value: RatingScaleItemValue;
}
export const RatingScaleItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ definition: S.String, value: RatingScaleItemValue }),
).annotate({
  identifier: "RatingScaleItem",
}) as any as S.Schema<RatingScaleItem>;
export type RatingScale = RatingScaleItem[];
export const RatingScale = /*@__PURE__*/ S.Array(RatingScaleItem);
export interface CustomMetricDefinition {
  name: string | redacted.Redacted<string>;
  instructions: string;
  ratingScale?: RatingScaleItem[];
}
export const CustomMetricDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: SensitiveString,
    instructions: S.String,
    ratingScale: S.optional(RatingScale),
  }),
).annotate({
  identifier: "CustomMetricDefinition",
}) as any as S.Schema<CustomMetricDefinition>;
export type AutomatedEvaluationCustomMetricSource = {
  customMetricDefinition: CustomMetricDefinition;
};
export const AutomatedEvaluationCustomMetricSource = /*@__PURE__*/ S.Union([
  S.Struct({ customMetricDefinition: CustomMetricDefinition }),
]);
export type AutomatedEvaluationCustomMetrics =
  AutomatedEvaluationCustomMetricSource[];
export const AutomatedEvaluationCustomMetrics = /*@__PURE__*/ S.Array(
  AutomatedEvaluationCustomMetricSource,
);
export interface CustomMetricBedrockEvaluatorModel {
  modelIdentifier: string;
}
export const CustomMetricBedrockEvaluatorModel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ modelIdentifier: S.String }),
).annotate({
  identifier: "CustomMetricBedrockEvaluatorModel",
}) as any as S.Schema<CustomMetricBedrockEvaluatorModel>;
export type CustomMetricBedrockEvaluatorModels =
  CustomMetricBedrockEvaluatorModel[];
export const CustomMetricBedrockEvaluatorModels = /*@__PURE__*/ S.Array(
  CustomMetricBedrockEvaluatorModel,
);
export interface CustomMetricEvaluatorModelConfig {
  bedrockEvaluatorModels: CustomMetricBedrockEvaluatorModel[];
}
export const CustomMetricEvaluatorModelConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bedrockEvaluatorModels: CustomMetricBedrockEvaluatorModels }),
).annotate({
  identifier: "CustomMetricEvaluatorModelConfig",
}) as any as S.Schema<CustomMetricEvaluatorModelConfig>;
export interface AutomatedEvaluationCustomMetricConfig {
  customMetrics: AutomatedEvaluationCustomMetricSource[];
  evaluatorModelConfig: CustomMetricEvaluatorModelConfig;
}
export const AutomatedEvaluationCustomMetricConfig = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      customMetrics: AutomatedEvaluationCustomMetrics,
      evaluatorModelConfig: CustomMetricEvaluatorModelConfig,
    }),
).annotate({
  identifier: "AutomatedEvaluationCustomMetricConfig",
}) as any as S.Schema<AutomatedEvaluationCustomMetricConfig>;
export interface AutomatedEvaluationConfig {
  datasetMetricConfigs: EvaluationDatasetMetricConfig[];
  evaluatorModelConfig?: EvaluatorModelConfig;
  customMetricConfig?: AutomatedEvaluationCustomMetricConfig;
}
export const AutomatedEvaluationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetMetricConfigs: EvaluationDatasetMetricConfigs,
    evaluatorModelConfig: S.optional(EvaluatorModelConfig),
    customMetricConfig: S.optional(AutomatedEvaluationCustomMetricConfig),
  }),
).annotate({
  identifier: "AutomatedEvaluationConfig",
}) as any as S.Schema<AutomatedEvaluationConfig>;
export type SageMakerFlowDefinitionArn = string;
export type HumanTaskInstructions = string | redacted.Redacted<string>;
export interface HumanWorkflowConfig {
  flowDefinitionArn: string;
  instructions?: string | redacted.Redacted<string>;
}
export const HumanWorkflowConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    flowDefinitionArn: S.String,
    instructions: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "HumanWorkflowConfig",
}) as any as S.Schema<HumanWorkflowConfig>;
export type EvaluationMetricDescription = string | redacted.Redacted<string>;
export type EvaluationRatingMethod = string;
export interface HumanEvaluationCustomMetric {
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  ratingMethod: string;
}
export const HumanEvaluationCustomMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: SensitiveString,
    description: S.optional(SensitiveString),
    ratingMethod: S.String,
  }),
).annotate({
  identifier: "HumanEvaluationCustomMetric",
}) as any as S.Schema<HumanEvaluationCustomMetric>;
export type HumanEvaluationCustomMetrics = HumanEvaluationCustomMetric[];
export const HumanEvaluationCustomMetrics = /*@__PURE__*/ S.Array(
  HumanEvaluationCustomMetric,
);
export interface HumanEvaluationConfig {
  humanWorkflowConfig?: HumanWorkflowConfig;
  customMetrics?: HumanEvaluationCustomMetric[];
  datasetMetricConfigs: EvaluationDatasetMetricConfig[];
}
export const HumanEvaluationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    humanWorkflowConfig: S.optional(HumanWorkflowConfig),
    customMetrics: S.optional(HumanEvaluationCustomMetrics),
    datasetMetricConfigs: EvaluationDatasetMetricConfigs,
  }),
).annotate({
  identifier: "HumanEvaluationConfig",
}) as any as S.Schema<HumanEvaluationConfig>;
export type EvaluationConfig =
  | { automated: AutomatedEvaluationConfig; human?: never }
  | { automated?: never; human: HumanEvaluationConfig };
export const EvaluationConfig = /*@__PURE__*/ S.Union([
  S.Struct({ automated: AutomatedEvaluationConfig }),
  S.Struct({ human: HumanEvaluationConfig }),
]);
export type EvaluationBedrockModelIdentifier = string;
export type EvaluationModelInferenceParams = string | redacted.Redacted<string>;
export type PerformanceConfigLatency = "standard" | "optimized" | (string & {});
export const PerformanceConfigLatency = /*@__PURE__*/ S.String;

export interface PerformanceConfiguration {
  latency?: PerformanceConfigLatency;
}
export const PerformanceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ latency: S.optional(PerformanceConfigLatency) }),
).annotate({
  identifier: "PerformanceConfiguration",
}) as any as S.Schema<PerformanceConfiguration>;
export interface EvaluationBedrockModel {
  modelIdentifier: string;
  inferenceParams?: string | redacted.Redacted<string>;
  performanceConfig?: PerformanceConfiguration;
}
export const EvaluationBedrockModel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelIdentifier: S.String,
    inferenceParams: S.optional(SensitiveString),
    performanceConfig: S.optional(PerformanceConfiguration),
  }),
).annotate({
  identifier: "EvaluationBedrockModel",
}) as any as S.Schema<EvaluationBedrockModel>;
export type EvaluationPrecomputedInferenceSourceIdentifier = string;
export interface EvaluationPrecomputedInferenceSource {
  inferenceSourceIdentifier: string;
}
export const EvaluationPrecomputedInferenceSource = /*@__PURE__*/ S.suspend(
  () => S.Struct({ inferenceSourceIdentifier: S.String }),
).annotate({
  identifier: "EvaluationPrecomputedInferenceSource",
}) as any as S.Schema<EvaluationPrecomputedInferenceSource>;
export type EvaluationModelConfig =
  | { bedrockModel: EvaluationBedrockModel; precomputedInferenceSource?: never }
  | {
      bedrockModel?: never;
      precomputedInferenceSource: EvaluationPrecomputedInferenceSource;
    };
export const EvaluationModelConfig = /*@__PURE__*/ S.Union([
  S.Struct({ bedrockModel: EvaluationBedrockModel }),
  S.Struct({
    precomputedInferenceSource: EvaluationPrecomputedInferenceSource,
  }),
]);
export type EvaluationModelConfigs = EvaluationModelConfig[];
export const EvaluationModelConfigs = /*@__PURE__*/ S.Array(
  EvaluationModelConfig,
);
export type KnowledgeBaseId = string;
export type SearchType = "HYBRID" | "SEMANTIC" | (string & {});
export const SearchType = /*@__PURE__*/ S.String;

export type FilterKey = string;
export type FilterValue = unknown;
export interface FilterAttribute {
  key: string;
  value: any;
}
export const FilterAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.Any }),
).annotate({
  identifier: "FilterAttribute",
}) as any as S.Schema<FilterAttribute>;
export type RetrievalFilterList = RetrievalFilter[];
export const RetrievalFilterList = /*@__PURE__*/ S.Array(
  S.suspend(() => RetrievalFilter).annotate({ identifier: "RetrievalFilter" }),
) as any as S.Schema<RetrievalFilterList>;
export type RetrievalFilter =
  | {
      equals: FilterAttribute;
      notEquals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      in?: never;
      notIn?: never;
      startsWith?: never;
      listContains?: never;
      stringContains?: never;
      andAll?: never;
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals: FilterAttribute;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      in?: never;
      notIn?: never;
      startsWith?: never;
      listContains?: never;
      stringContains?: never;
      andAll?: never;
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals?: never;
      greaterThan: FilterAttribute;
      greaterThanOrEquals?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      in?: never;
      notIn?: never;
      startsWith?: never;
      listContains?: never;
      stringContains?: never;
      andAll?: never;
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals?: never;
      greaterThan?: never;
      greaterThanOrEquals: FilterAttribute;
      lessThan?: never;
      lessThanOrEquals?: never;
      in?: never;
      notIn?: never;
      startsWith?: never;
      listContains?: never;
      stringContains?: never;
      andAll?: never;
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      lessThan: FilterAttribute;
      lessThanOrEquals?: never;
      in?: never;
      notIn?: never;
      startsWith?: never;
      listContains?: never;
      stringContains?: never;
      andAll?: never;
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      lessThan?: never;
      lessThanOrEquals: FilterAttribute;
      in?: never;
      notIn?: never;
      startsWith?: never;
      listContains?: never;
      stringContains?: never;
      andAll?: never;
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      in: FilterAttribute;
      notIn?: never;
      startsWith?: never;
      listContains?: never;
      stringContains?: never;
      andAll?: never;
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      in?: never;
      notIn: FilterAttribute;
      startsWith?: never;
      listContains?: never;
      stringContains?: never;
      andAll?: never;
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      in?: never;
      notIn?: never;
      startsWith: FilterAttribute;
      listContains?: never;
      stringContains?: never;
      andAll?: never;
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      in?: never;
      notIn?: never;
      startsWith?: never;
      listContains: FilterAttribute;
      stringContains?: never;
      andAll?: never;
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      in?: never;
      notIn?: never;
      startsWith?: never;
      listContains?: never;
      stringContains: FilterAttribute;
      andAll?: never;
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      in?: never;
      notIn?: never;
      startsWith?: never;
      listContains?: never;
      stringContains?: never;
      andAll: RetrievalFilter[];
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      in?: never;
      notIn?: never;
      startsWith?: never;
      listContains?: never;
      stringContains?: never;
      andAll?: never;
      orAll: RetrievalFilter[];
    };
export const RetrievalFilter = /*@__PURE__*/ S.Union([
  S.Struct({ equals: FilterAttribute }),
  S.Struct({ notEquals: FilterAttribute }),
  S.Struct({ greaterThan: FilterAttribute }),
  S.Struct({ greaterThanOrEquals: FilterAttribute }),
  S.Struct({ lessThan: FilterAttribute }),
  S.Struct({ lessThanOrEquals: FilterAttribute }),
  S.Struct({ in: FilterAttribute }),
  S.Struct({ notIn: FilterAttribute }),
  S.Struct({ startsWith: FilterAttribute }),
  S.Struct({ listContains: FilterAttribute }),
  S.Struct({ stringContains: FilterAttribute }),
  S.Struct({
    andAll: S.suspend(() => RetrievalFilterList).annotate({
      identifier: "RetrievalFilterList",
    }),
  }),
  S.Struct({
    orAll: S.suspend(() => RetrievalFilterList).annotate({
      identifier: "RetrievalFilterList",
    }),
  }),
]) as any as S.Schema<RetrievalFilter>;
export type AttributeType =
  | "STRING"
  | "NUMBER"
  | "BOOLEAN"
  | "STRING_LIST"
  | (string & {});
export const AttributeType = /*@__PURE__*/ S.String;

export interface MetadataAttributeSchema {
  key: string;
  type: AttributeType;
  description: string;
}
export const MetadataAttributeSchema = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, type: AttributeType, description: S.String }),
).annotate({
  identifier: "MetadataAttributeSchema",
}) as any as S.Schema<MetadataAttributeSchema>;
export type MetadataAttributeSchemaList = MetadataAttributeSchema[];
export const MetadataAttributeSchemaList = /*@__PURE__*/ S.Array(
  MetadataAttributeSchema,
);
export type BedrockModelArn = string;
export interface ImplicitFilterConfiguration {
  metadataAttributes: MetadataAttributeSchema[];
  modelArn: string;
}
export const ImplicitFilterConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metadataAttributes: MetadataAttributeSchemaList,
    modelArn: S.String,
  }),
).annotate({
  identifier: "ImplicitFilterConfiguration",
}) as any as S.Schema<ImplicitFilterConfiguration>;
export type VectorSearchRerankingConfigurationType =
  | "BEDROCK_RERANKING_MODEL"
  | (string & {});
export const VectorSearchRerankingConfigurationType = /*@__PURE__*/ S.String;

export type BedrockRerankingModelArn = string;
export interface VectorSearchBedrockRerankingModelConfiguration {
  modelArn: string;
  additionalModelRequestFields?: { [key: string]: any | undefined };
}
export const VectorSearchBedrockRerankingModelConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      modelArn: S.String,
      additionalModelRequestFields: S.optional(AdditionalModelRequestFields),
    }),
  ).annotate({
    identifier: "VectorSearchBedrockRerankingModelConfiguration",
  }) as any as S.Schema<VectorSearchBedrockRerankingModelConfiguration>;
export type RerankingMetadataSelectionMode =
  | "SELECTIVE"
  | "ALL"
  | (string & {});
export const RerankingMetadataSelectionMode = /*@__PURE__*/ S.String;

export interface FieldForReranking {
  fieldName: string;
}
export const FieldForReranking = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fieldName: S.String }),
).annotate({
  identifier: "FieldForReranking",
}) as any as S.Schema<FieldForReranking>;
export type FieldsForReranking = FieldForReranking[];
export const FieldsForReranking = /*@__PURE__*/ S.Array(FieldForReranking);
export type RerankingMetadataSelectiveModeConfiguration =
  | { fieldsToInclude: FieldForReranking[]; fieldsToExclude?: never }
  | { fieldsToInclude?: never; fieldsToExclude: FieldForReranking[] };
export const RerankingMetadataSelectiveModeConfiguration =
  /*@__PURE__*/ S.Union([
    S.Struct({ fieldsToInclude: FieldsForReranking }),
    S.Struct({ fieldsToExclude: FieldsForReranking }),
  ]);
export interface MetadataConfigurationForReranking {
  selectionMode: RerankingMetadataSelectionMode;
  selectiveModeConfiguration?: RerankingMetadataSelectiveModeConfiguration;
}
export const MetadataConfigurationForReranking = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    selectionMode: RerankingMetadataSelectionMode,
    selectiveModeConfiguration: S.optional(
      RerankingMetadataSelectiveModeConfiguration,
    ),
  }),
).annotate({
  identifier: "MetadataConfigurationForReranking",
}) as any as S.Schema<MetadataConfigurationForReranking>;
export interface VectorSearchBedrockRerankingConfiguration {
  modelConfiguration: VectorSearchBedrockRerankingModelConfiguration;
  numberOfRerankedResults?: number;
  metadataConfiguration?: MetadataConfigurationForReranking;
}
export const VectorSearchBedrockRerankingConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      modelConfiguration: VectorSearchBedrockRerankingModelConfiguration,
      numberOfRerankedResults: S.optional(S.Number),
      metadataConfiguration: S.optional(MetadataConfigurationForReranking),
    }),
  ).annotate({
    identifier: "VectorSearchBedrockRerankingConfiguration",
  }) as any as S.Schema<VectorSearchBedrockRerankingConfiguration>;
export interface VectorSearchRerankingConfiguration {
  type: VectorSearchRerankingConfigurationType;
  bedrockRerankingConfiguration?: VectorSearchBedrockRerankingConfiguration;
}
export const VectorSearchRerankingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: VectorSearchRerankingConfigurationType,
    bedrockRerankingConfiguration: S.optional(
      VectorSearchBedrockRerankingConfiguration,
    ),
  }),
).annotate({
  identifier: "VectorSearchRerankingConfiguration",
}) as any as S.Schema<VectorSearchRerankingConfiguration>;
export interface KnowledgeBaseVectorSearchConfiguration {
  numberOfResults?: number;
  overrideSearchType?: SearchType;
  filter?: RetrievalFilter;
  implicitFilterConfiguration?: ImplicitFilterConfiguration;
  rerankingConfiguration?: VectorSearchRerankingConfiguration;
}
export const KnowledgeBaseVectorSearchConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      numberOfResults: S.optional(S.Number),
      overrideSearchType: S.optional(SearchType),
      filter: S.optional(RetrievalFilter),
      implicitFilterConfiguration: S.optional(ImplicitFilterConfiguration),
      rerankingConfiguration: S.optional(VectorSearchRerankingConfiguration),
    }),
).annotate({
  identifier: "KnowledgeBaseVectorSearchConfiguration",
}) as any as S.Schema<KnowledgeBaseVectorSearchConfiguration>;
export interface KnowledgeBaseRetrievalConfiguration {
  vectorSearchConfiguration: KnowledgeBaseVectorSearchConfiguration;
}
export const KnowledgeBaseRetrievalConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vectorSearchConfiguration: KnowledgeBaseVectorSearchConfiguration,
  }),
).annotate({
  identifier: "KnowledgeBaseRetrievalConfiguration",
}) as any as S.Schema<KnowledgeBaseRetrievalConfiguration>;
export interface RetrieveConfig {
  knowledgeBaseId: string;
  knowledgeBaseRetrievalConfiguration: KnowledgeBaseRetrievalConfiguration;
}
export const RetrieveConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    knowledgeBaseId: S.String,
    knowledgeBaseRetrievalConfiguration: KnowledgeBaseRetrievalConfiguration,
  }),
).annotate({ identifier: "RetrieveConfig" }) as any as S.Schema<RetrieveConfig>;
export type RetrieveAndGenerateType =
  | "KNOWLEDGE_BASE"
  | "EXTERNAL_SOURCES"
  | (string & {});
export const RetrieveAndGenerateType = /*@__PURE__*/ S.String;

export type TextPromptTemplate = string | redacted.Redacted<string>;
export interface PromptTemplate {
  textPromptTemplate?: string | redacted.Redacted<string>;
}
export const PromptTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ textPromptTemplate: S.optional(SensitiveString) }),
).annotate({ identifier: "PromptTemplate" }) as any as S.Schema<PromptTemplate>;
export interface GuardrailConfiguration {
  guardrailId: string;
  guardrailVersion: string;
}
export const GuardrailConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ guardrailId: S.String, guardrailVersion: S.String }),
).annotate({
  identifier: "GuardrailConfiguration",
}) as any as S.Schema<GuardrailConfiguration>;
export type Temperature = number;
export type TopP = number;
export type MaxTokens = number;
export type RAGStopSequences = string[];
export const RAGStopSequences = /*@__PURE__*/ S.Array(S.String);
export interface TextInferenceConfig {
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  stopSequences?: string[];
}
export const TextInferenceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    temperature: S.optional(S.Number),
    topP: S.optional(S.Number),
    maxTokens: S.optional(S.Number),
    stopSequences: S.optional(RAGStopSequences),
  }),
).annotate({
  identifier: "TextInferenceConfig",
}) as any as S.Schema<TextInferenceConfig>;
export interface KbInferenceConfig {
  textInferenceConfig?: TextInferenceConfig;
}
export const KbInferenceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ textInferenceConfig: S.optional(TextInferenceConfig) }),
).annotate({
  identifier: "KbInferenceConfig",
}) as any as S.Schema<KbInferenceConfig>;
export interface GenerationConfiguration {
  promptTemplate?: PromptTemplate;
  guardrailConfiguration?: GuardrailConfiguration;
  kbInferenceConfig?: KbInferenceConfig;
  additionalModelRequestFields?: { [key: string]: any | undefined };
}
export const GenerationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    promptTemplate: S.optional(PromptTemplate),
    guardrailConfiguration: S.optional(GuardrailConfiguration),
    kbInferenceConfig: S.optional(KbInferenceConfig),
    additionalModelRequestFields: S.optional(AdditionalModelRequestFields),
  }),
).annotate({
  identifier: "GenerationConfiguration",
}) as any as S.Schema<GenerationConfiguration>;
export type QueryTransformationType = "QUERY_DECOMPOSITION" | (string & {});
export const QueryTransformationType = /*@__PURE__*/ S.String;

export interface QueryTransformationConfiguration {
  type: QueryTransformationType;
}
export const QueryTransformationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: QueryTransformationType }),
).annotate({
  identifier: "QueryTransformationConfiguration",
}) as any as S.Schema<QueryTransformationConfiguration>;
export interface OrchestrationConfiguration {
  queryTransformationConfiguration: QueryTransformationConfiguration;
}
export const OrchestrationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queryTransformationConfiguration: QueryTransformationConfiguration,
  }),
).annotate({
  identifier: "OrchestrationConfiguration",
}) as any as S.Schema<OrchestrationConfiguration>;
export interface KnowledgeBaseRetrieveAndGenerateConfiguration {
  knowledgeBaseId: string;
  modelArn: string;
  retrievalConfiguration?: KnowledgeBaseRetrievalConfiguration;
  generationConfiguration?: GenerationConfiguration;
  orchestrationConfiguration?: OrchestrationConfiguration;
}
export const KnowledgeBaseRetrieveAndGenerateConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      knowledgeBaseId: S.String,
      modelArn: S.String,
      retrievalConfiguration: S.optional(KnowledgeBaseRetrievalConfiguration),
      generationConfiguration: S.optional(GenerationConfiguration),
      orchestrationConfiguration: S.optional(OrchestrationConfiguration),
    }),
  ).annotate({
    identifier: "KnowledgeBaseRetrieveAndGenerateConfiguration",
  }) as any as S.Schema<KnowledgeBaseRetrieveAndGenerateConfiguration>;
export type ExternalSourceType = "S3" | "BYTE_CONTENT" | (string & {});
export const ExternalSourceType = /*@__PURE__*/ S.String;

export type KBS3Uri = string;
export interface S3ObjectDoc {
  uri: string;
}
export const S3ObjectDoc = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ uri: S.String }),
).annotate({ identifier: "S3ObjectDoc" }) as any as S.Schema<S3ObjectDoc>;
export type Identifier = string | redacted.Redacted<string>;
export type ContentType = string;
export type ByteContentBlob = Uint8Array | redacted.Redacted<Uint8Array>;
export interface ByteContentDoc {
  identifier: string | redacted.Redacted<string>;
  contentType: string;
  data: Uint8Array | redacted.Redacted<Uint8Array>;
}
export const ByteContentDoc = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: SensitiveString,
    contentType: S.String,
    data: SensitiveBlob,
  }),
).annotate({ identifier: "ByteContentDoc" }) as any as S.Schema<ByteContentDoc>;
export interface ExternalSource {
  sourceType: ExternalSourceType;
  s3Location?: S3ObjectDoc;
  byteContent?: ByteContentDoc;
}
export const ExternalSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceType: ExternalSourceType,
    s3Location: S.optional(S3ObjectDoc),
    byteContent: S.optional(ByteContentDoc),
  }),
).annotate({ identifier: "ExternalSource" }) as any as S.Schema<ExternalSource>;
export type ExternalSources = ExternalSource[];
export const ExternalSources = /*@__PURE__*/ S.Array(ExternalSource);
export interface ExternalSourcesGenerationConfiguration {
  promptTemplate?: PromptTemplate;
  guardrailConfiguration?: GuardrailConfiguration;
  kbInferenceConfig?: KbInferenceConfig;
  additionalModelRequestFields?: { [key: string]: any | undefined };
}
export const ExternalSourcesGenerationConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      promptTemplate: S.optional(PromptTemplate),
      guardrailConfiguration: S.optional(GuardrailConfiguration),
      kbInferenceConfig: S.optional(KbInferenceConfig),
      additionalModelRequestFields: S.optional(AdditionalModelRequestFields),
    }),
).annotate({
  identifier: "ExternalSourcesGenerationConfiguration",
}) as any as S.Schema<ExternalSourcesGenerationConfiguration>;
export interface ExternalSourcesRetrieveAndGenerateConfiguration {
  modelArn: string;
  sources: ExternalSource[];
  generationConfiguration?: ExternalSourcesGenerationConfiguration;
}
export const ExternalSourcesRetrieveAndGenerateConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      modelArn: S.String,
      sources: ExternalSources,
      generationConfiguration: S.optional(
        ExternalSourcesGenerationConfiguration,
      ),
    }),
  ).annotate({
    identifier: "ExternalSourcesRetrieveAndGenerateConfiguration",
  }) as any as S.Schema<ExternalSourcesRetrieveAndGenerateConfiguration>;
export interface RetrieveAndGenerateConfiguration {
  type: RetrieveAndGenerateType;
  knowledgeBaseConfiguration?: KnowledgeBaseRetrieveAndGenerateConfiguration;
  externalSourcesConfiguration?: ExternalSourcesRetrieveAndGenerateConfiguration;
}
export const RetrieveAndGenerateConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: RetrieveAndGenerateType,
    knowledgeBaseConfiguration: S.optional(
      KnowledgeBaseRetrieveAndGenerateConfiguration,
    ),
    externalSourcesConfiguration: S.optional(
      ExternalSourcesRetrieveAndGenerateConfiguration,
    ),
  }),
).annotate({
  identifier: "RetrieveAndGenerateConfiguration",
}) as any as S.Schema<RetrieveAndGenerateConfiguration>;
export type KnowledgeBaseConfig =
  | { retrieveConfig: RetrieveConfig; retrieveAndGenerateConfig?: never }
  | {
      retrieveConfig?: never;
      retrieveAndGenerateConfig: RetrieveAndGenerateConfiguration;
    };
export const KnowledgeBaseConfig = /*@__PURE__*/ S.Union([
  S.Struct({ retrieveConfig: RetrieveConfig }),
  S.Struct({ retrieveAndGenerateConfig: RetrieveAndGenerateConfiguration }),
]);
export type EvaluationPrecomputedRagSourceIdentifier = string;
export interface EvaluationPrecomputedRetrieveSourceConfig {
  ragSourceIdentifier: string;
}
export const EvaluationPrecomputedRetrieveSourceConfig =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ragSourceIdentifier: S.String }),
  ).annotate({
    identifier: "EvaluationPrecomputedRetrieveSourceConfig",
  }) as any as S.Schema<EvaluationPrecomputedRetrieveSourceConfig>;
export interface EvaluationPrecomputedRetrieveAndGenerateSourceConfig {
  ragSourceIdentifier: string;
}
export const EvaluationPrecomputedRetrieveAndGenerateSourceConfig =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ragSourceIdentifier: S.String }),
  ).annotate({
    identifier: "EvaluationPrecomputedRetrieveAndGenerateSourceConfig",
  }) as any as S.Schema<EvaluationPrecomputedRetrieveAndGenerateSourceConfig>;
export type EvaluationPrecomputedRagSourceConfig =
  | {
      retrieveSourceConfig: EvaluationPrecomputedRetrieveSourceConfig;
      retrieveAndGenerateSourceConfig?: never;
    }
  | {
      retrieveSourceConfig?: never;
      retrieveAndGenerateSourceConfig: EvaluationPrecomputedRetrieveAndGenerateSourceConfig;
    };
export const EvaluationPrecomputedRagSourceConfig = /*@__PURE__*/ S.Union([
  S.Struct({ retrieveSourceConfig: EvaluationPrecomputedRetrieveSourceConfig }),
  S.Struct({
    retrieveAndGenerateSourceConfig:
      EvaluationPrecomputedRetrieveAndGenerateSourceConfig,
  }),
]);
export type RAGConfig =
  | {
      knowledgeBaseConfig: KnowledgeBaseConfig;
      precomputedRagSourceConfig?: never;
    }
  | {
      knowledgeBaseConfig?: never;
      precomputedRagSourceConfig: EvaluationPrecomputedRagSourceConfig;
    };
export const RAGConfig = /*@__PURE__*/ S.Union([
  S.Struct({ knowledgeBaseConfig: KnowledgeBaseConfig }),
  S.Struct({
    precomputedRagSourceConfig: EvaluationPrecomputedRagSourceConfig,
  }),
]);
export type RagConfigs = RAGConfig[];
export const RagConfigs = /*@__PURE__*/ S.Array(RAGConfig);
export type EvaluationInferenceConfig =
  | { models: EvaluationModelConfig[]; ragConfigs?: never }
  | { models?: never; ragConfigs: RAGConfig[] };
export const EvaluationInferenceConfig = /*@__PURE__*/ S.Union([
  S.Struct({ models: EvaluationModelConfigs }),
  S.Struct({ ragConfigs: RagConfigs }),
]);
export interface EvaluationOutputDataConfig {
  s3Uri: string;
}
export const EvaluationOutputDataConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Uri: S.String }),
).annotate({
  identifier: "EvaluationOutputDataConfig",
}) as any as S.Schema<EvaluationOutputDataConfig>;
export interface CreateEvaluationJobRequest {
  jobName: string;
  jobDescription?: string | redacted.Redacted<string>;
  clientRequestToken?: string;
  roleArn: string;
  customerEncryptionKeyId?: string;
  jobTags?: Tag[];
  applicationType?: ApplicationType;
  evaluationConfig: EvaluationConfig;
  inferenceConfig: EvaluationInferenceConfig;
  outputDataConfig: EvaluationOutputDataConfig;
}
export const CreateEvaluationJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobName: S.String,
    jobDescription: S.optional(SensitiveString),
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    roleArn: S.String,
    customerEncryptionKeyId: S.optional(S.String),
    jobTags: S.optional(TagList),
    applicationType: S.optional(ApplicationType),
    evaluationConfig: EvaluationConfig,
    inferenceConfig: EvaluationInferenceConfig,
    outputDataConfig: EvaluationOutputDataConfig,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/evaluation-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEvaluationJobRequest",
}) as any as S.Schema<CreateEvaluationJobRequest>;
export type EvaluationJobArn = string;
export interface CreateEvaluationJobResponse {
  jobArn: string;
}
export const CreateEvaluationJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobArn: S.String }),
).annotate({
  identifier: "CreateEvaluationJobResponse",
}) as any as S.Schema<CreateEvaluationJobResponse>;
export type OfferToken = string;
export interface CreateFoundationModelAgreementRequest {
  offerToken: string;
  modelId: string;
}
export const CreateFoundationModelAgreementRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ offerToken: S.String, modelId: S.String }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/create-foundation-model-agreement" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateFoundationModelAgreementRequest",
}) as any as S.Schema<CreateFoundationModelAgreementRequest>;
export interface CreateFoundationModelAgreementResponse {
  modelId: string;
}
export const CreateFoundationModelAgreementResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ modelId: S.String }),
).annotate({
  identifier: "CreateFoundationModelAgreementResponse",
}) as any as S.Schema<CreateFoundationModelAgreementResponse>;
export type GuardrailName = string | redacted.Redacted<string>;
export type GuardrailDescription = string | redacted.Redacted<string>;
export type GuardrailTopicName = string | redacted.Redacted<string>;
export type GuardrailTopicDefinition = string | redacted.Redacted<string>;
export type GuardrailTopicExample = string | redacted.Redacted<string>;
export type GuardrailTopicExamples = (string | redacted.Redacted<string>)[];
export const GuardrailTopicExamples = /*@__PURE__*/ S.Array(SensitiveString);
export type GuardrailTopicType = "DENY" | (string & {});
export const GuardrailTopicType = /*@__PURE__*/ S.String;

export type GuardrailTopicAction = "BLOCK" | "NONE" | (string & {});
export const GuardrailTopicAction = /*@__PURE__*/ S.String;

export interface GuardrailTopicConfig {
  name: string | redacted.Redacted<string>;
  definition: string | redacted.Redacted<string>;
  examples?: (string | redacted.Redacted<string>)[];
  type: GuardrailTopicType;
  inputAction?: GuardrailTopicAction;
  outputAction?: GuardrailTopicAction;
  inputEnabled?: boolean;
  outputEnabled?: boolean;
}
export const GuardrailTopicConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: SensitiveString,
    definition: SensitiveString,
    examples: S.optional(GuardrailTopicExamples),
    type: GuardrailTopicType,
    inputAction: S.optional(GuardrailTopicAction),
    outputAction: S.optional(GuardrailTopicAction),
    inputEnabled: S.optional(S.Boolean),
    outputEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GuardrailTopicConfig",
}) as any as S.Schema<GuardrailTopicConfig>;
export type GuardrailTopicsConfig = GuardrailTopicConfig[];
export const GuardrailTopicsConfig =
  /*@__PURE__*/ S.Array(GuardrailTopicConfig);
export type GuardrailTopicsTierName = "CLASSIC" | "STANDARD" | (string & {});
export const GuardrailTopicsTierName = /*@__PURE__*/ S.String;

export interface GuardrailTopicsTierConfig {
  tierName: GuardrailTopicsTierName;
}
export const GuardrailTopicsTierConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tierName: GuardrailTopicsTierName }),
).annotate({
  identifier: "GuardrailTopicsTierConfig",
}) as any as S.Schema<GuardrailTopicsTierConfig>;
export interface GuardrailTopicPolicyConfig {
  topicsConfig: GuardrailTopicConfig[];
  tierConfig?: GuardrailTopicsTierConfig;
}
export const GuardrailTopicPolicyConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    topicsConfig: GuardrailTopicsConfig,
    tierConfig: S.optional(GuardrailTopicsTierConfig),
  }),
).annotate({
  identifier: "GuardrailTopicPolicyConfig",
}) as any as S.Schema<GuardrailTopicPolicyConfig>;
export type GuardrailContentFilterType =
  | "SEXUAL"
  | "VIOLENCE"
  | "HATE"
  | "INSULTS"
  | "MISCONDUCT"
  | "PROMPT_ATTACK"
  | (string & {});
export const GuardrailContentFilterType = /*@__PURE__*/ S.String;

export type GuardrailFilterStrength =
  | "NONE"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | (string & {});
export const GuardrailFilterStrength = /*@__PURE__*/ S.String;

export type GuardrailModality = "TEXT" | "IMAGE" | (string & {});
export const GuardrailModality = /*@__PURE__*/ S.String;

export type GuardrailModalities = GuardrailModality[];
export const GuardrailModalities = /*@__PURE__*/ S.Array(GuardrailModality);
export type GuardrailContentFilterAction = "BLOCK" | "NONE" | (string & {});
export const GuardrailContentFilterAction = /*@__PURE__*/ S.String;

export interface GuardrailContentFilterConfig {
  type: GuardrailContentFilterType;
  inputStrength: GuardrailFilterStrength;
  outputStrength: GuardrailFilterStrength;
  inputModalities?: GuardrailModality[];
  outputModalities?: GuardrailModality[];
  inputAction?: GuardrailContentFilterAction;
  outputAction?: GuardrailContentFilterAction;
  inputEnabled?: boolean;
  outputEnabled?: boolean;
}
export const GuardrailContentFilterConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: GuardrailContentFilterType,
    inputStrength: GuardrailFilterStrength,
    outputStrength: GuardrailFilterStrength,
    inputModalities: S.optional(GuardrailModalities),
    outputModalities: S.optional(GuardrailModalities),
    inputAction: S.optional(GuardrailContentFilterAction),
    outputAction: S.optional(GuardrailContentFilterAction),
    inputEnabled: S.optional(S.Boolean),
    outputEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GuardrailContentFilterConfig",
}) as any as S.Schema<GuardrailContentFilterConfig>;
export type GuardrailContentFiltersConfig = GuardrailContentFilterConfig[];
export const GuardrailContentFiltersConfig = /*@__PURE__*/ S.Array(
  GuardrailContentFilterConfig,
);
export type GuardrailContentFiltersTierName =
  | "CLASSIC"
  | "STANDARD"
  | (string & {});
export const GuardrailContentFiltersTierName = /*@__PURE__*/ S.String;

export interface GuardrailContentFiltersTierConfig {
  tierName: GuardrailContentFiltersTierName;
}
export const GuardrailContentFiltersTierConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tierName: GuardrailContentFiltersTierName }),
).annotate({
  identifier: "GuardrailContentFiltersTierConfig",
}) as any as S.Schema<GuardrailContentFiltersTierConfig>;
export interface GuardrailContentPolicyConfig {
  filtersConfig: GuardrailContentFilterConfig[];
  tierConfig?: GuardrailContentFiltersTierConfig;
}
export const GuardrailContentPolicyConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filtersConfig: GuardrailContentFiltersConfig,
    tierConfig: S.optional(GuardrailContentFiltersTierConfig),
  }),
).annotate({
  identifier: "GuardrailContentPolicyConfig",
}) as any as S.Schema<GuardrailContentPolicyConfig>;
export type GuardrailWordAction = "BLOCK" | "NONE" | (string & {});
export const GuardrailWordAction = /*@__PURE__*/ S.String;

export interface GuardrailWordConfig {
  text: string;
  inputAction?: GuardrailWordAction;
  outputAction?: GuardrailWordAction;
  inputEnabled?: boolean;
  outputEnabled?: boolean;
}
export const GuardrailWordConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    text: S.String,
    inputAction: S.optional(GuardrailWordAction),
    outputAction: S.optional(GuardrailWordAction),
    inputEnabled: S.optional(S.Boolean),
    outputEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GuardrailWordConfig",
}) as any as S.Schema<GuardrailWordConfig>;
export type GuardrailWordsConfig = GuardrailWordConfig[];
export const GuardrailWordsConfig = /*@__PURE__*/ S.Array(GuardrailWordConfig);
export type GuardrailManagedWordsType = "PROFANITY" | (string & {});
export const GuardrailManagedWordsType = /*@__PURE__*/ S.String;

export interface GuardrailManagedWordsConfig {
  type: GuardrailManagedWordsType;
  inputAction?: GuardrailWordAction;
  outputAction?: GuardrailWordAction;
  inputEnabled?: boolean;
  outputEnabled?: boolean;
}
export const GuardrailManagedWordsConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: GuardrailManagedWordsType,
    inputAction: S.optional(GuardrailWordAction),
    outputAction: S.optional(GuardrailWordAction),
    inputEnabled: S.optional(S.Boolean),
    outputEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GuardrailManagedWordsConfig",
}) as any as S.Schema<GuardrailManagedWordsConfig>;
export type GuardrailManagedWordListsConfig = GuardrailManagedWordsConfig[];
export const GuardrailManagedWordListsConfig = /*@__PURE__*/ S.Array(
  GuardrailManagedWordsConfig,
);
export interface GuardrailWordPolicyConfig {
  wordsConfig?: GuardrailWordConfig[];
  managedWordListsConfig?: GuardrailManagedWordsConfig[];
}
export const GuardrailWordPolicyConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    wordsConfig: S.optional(GuardrailWordsConfig),
    managedWordListsConfig: S.optional(GuardrailManagedWordListsConfig),
  }),
).annotate({
  identifier: "GuardrailWordPolicyConfig",
}) as any as S.Schema<GuardrailWordPolicyConfig>;
export type GuardrailPiiEntityType =
  | "ADDRESS"
  | "AGE"
  | "AWS_ACCESS_KEY"
  | "AWS_SECRET_KEY"
  | "CA_HEALTH_NUMBER"
  | "CA_SOCIAL_INSURANCE_NUMBER"
  | "CREDIT_DEBIT_CARD_CVV"
  | "CREDIT_DEBIT_CARD_EXPIRY"
  | "CREDIT_DEBIT_CARD_NUMBER"
  | "DRIVER_ID"
  | "EMAIL"
  | "INTERNATIONAL_BANK_ACCOUNT_NUMBER"
  | "IP_ADDRESS"
  | "LICENSE_PLATE"
  | "MAC_ADDRESS"
  | "NAME"
  | "PASSWORD"
  | "PHONE"
  | "PIN"
  | "SWIFT_CODE"
  | "UK_NATIONAL_HEALTH_SERVICE_NUMBER"
  | "UK_NATIONAL_INSURANCE_NUMBER"
  | "UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER"
  | "URL"
  | "USERNAME"
  | "US_BANK_ACCOUNT_NUMBER"
  | "US_BANK_ROUTING_NUMBER"
  | "US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER"
  | "US_PASSPORT_NUMBER"
  | "US_SOCIAL_SECURITY_NUMBER"
  | "VEHICLE_IDENTIFICATION_NUMBER"
  | (string & {});
export const GuardrailPiiEntityType = /*@__PURE__*/ S.String;

export type GuardrailSensitiveInformationAction =
  | "BLOCK"
  | "ANONYMIZE"
  | "NONE"
  | (string & {});
export const GuardrailSensitiveInformationAction = /*@__PURE__*/ S.String;

export interface GuardrailPiiEntityConfig {
  type: GuardrailPiiEntityType;
  action: GuardrailSensitiveInformationAction;
  inputAction?: GuardrailSensitiveInformationAction;
  outputAction?: GuardrailSensitiveInformationAction;
  inputEnabled?: boolean;
  outputEnabled?: boolean;
}
export const GuardrailPiiEntityConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: GuardrailPiiEntityType,
    action: GuardrailSensitiveInformationAction,
    inputAction: S.optional(GuardrailSensitiveInformationAction),
    outputAction: S.optional(GuardrailSensitiveInformationAction),
    inputEnabled: S.optional(S.Boolean),
    outputEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GuardrailPiiEntityConfig",
}) as any as S.Schema<GuardrailPiiEntityConfig>;
export type GuardrailPiiEntitiesConfig = GuardrailPiiEntityConfig[];
export const GuardrailPiiEntitiesConfig = /*@__PURE__*/ S.Array(
  GuardrailPiiEntityConfig,
);
export interface GuardrailRegexConfig {
  name: string;
  description?: string;
  pattern: string;
  action: GuardrailSensitiveInformationAction;
  inputAction?: GuardrailSensitiveInformationAction;
  outputAction?: GuardrailSensitiveInformationAction;
  inputEnabled?: boolean;
  outputEnabled?: boolean;
}
export const GuardrailRegexConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    pattern: S.String,
    action: GuardrailSensitiveInformationAction,
    inputAction: S.optional(GuardrailSensitiveInformationAction),
    outputAction: S.optional(GuardrailSensitiveInformationAction),
    inputEnabled: S.optional(S.Boolean),
    outputEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GuardrailRegexConfig",
}) as any as S.Schema<GuardrailRegexConfig>;
export type GuardrailRegexesConfig = GuardrailRegexConfig[];
export const GuardrailRegexesConfig =
  /*@__PURE__*/ S.Array(GuardrailRegexConfig);
export interface GuardrailSensitiveInformationPolicyConfig {
  piiEntitiesConfig?: GuardrailPiiEntityConfig[];
  regexesConfig?: GuardrailRegexConfig[];
}
export const GuardrailSensitiveInformationPolicyConfig =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      piiEntitiesConfig: S.optional(GuardrailPiiEntitiesConfig),
      regexesConfig: S.optional(GuardrailRegexesConfig),
    }),
  ).annotate({
    identifier: "GuardrailSensitiveInformationPolicyConfig",
  }) as any as S.Schema<GuardrailSensitiveInformationPolicyConfig>;
export type GuardrailContextualGroundingFilterType =
  | "GROUNDING"
  | "RELEVANCE"
  | (string & {});
export const GuardrailContextualGroundingFilterType = /*@__PURE__*/ S.String;

export type GuardrailContextualGroundingAction =
  | "BLOCK"
  | "NONE"
  | (string & {});
export const GuardrailContextualGroundingAction = /*@__PURE__*/ S.String;

export interface GuardrailContextualGroundingFilterConfig {
  type: GuardrailContextualGroundingFilterType;
  threshold: number;
  action?: GuardrailContextualGroundingAction;
  enabled?: boolean;
}
export const GuardrailContextualGroundingFilterConfig = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      type: GuardrailContextualGroundingFilterType,
      threshold: S.Number,
      action: S.optional(GuardrailContextualGroundingAction),
      enabled: S.optional(S.Boolean),
    }),
).annotate({
  identifier: "GuardrailContextualGroundingFilterConfig",
}) as any as S.Schema<GuardrailContextualGroundingFilterConfig>;
export type GuardrailContextualGroundingFiltersConfig =
  GuardrailContextualGroundingFilterConfig[];
export const GuardrailContextualGroundingFiltersConfig = /*@__PURE__*/ S.Array(
  GuardrailContextualGroundingFilterConfig,
);
export interface GuardrailContextualGroundingPolicyConfig {
  filtersConfig: GuardrailContextualGroundingFilterConfig[];
}
export const GuardrailContextualGroundingPolicyConfig = /*@__PURE__*/ S.suspend(
  () => S.Struct({ filtersConfig: GuardrailContextualGroundingFiltersConfig }),
).annotate({
  identifier: "GuardrailContextualGroundingPolicyConfig",
}) as any as S.Schema<GuardrailContextualGroundingPolicyConfig>;
export type AutomatedReasoningPolicyArnList = string[];
export const AutomatedReasoningPolicyArnList = /*@__PURE__*/ S.Array(S.String);
export type AutomatedReasoningConfidenceFilterThreshold = number;
export interface GuardrailAutomatedReasoningPolicyConfig {
  policies: string[];
  confidenceThreshold?: number;
}
export const GuardrailAutomatedReasoningPolicyConfig = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      policies: AutomatedReasoningPolicyArnList,
      confidenceThreshold: S.optional(S.Number),
    }),
).annotate({
  identifier: "GuardrailAutomatedReasoningPolicyConfig",
}) as any as S.Schema<GuardrailAutomatedReasoningPolicyConfig>;
export type GuardrailCrossRegionGuardrailProfileIdentifier = string;
export interface GuardrailCrossRegionConfig {
  guardrailProfileIdentifier: string;
}
export const GuardrailCrossRegionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ guardrailProfileIdentifier: S.String }),
).annotate({
  identifier: "GuardrailCrossRegionConfig",
}) as any as S.Schema<GuardrailCrossRegionConfig>;
export type GuardrailBlockedMessaging = string | redacted.Redacted<string>;
export interface CreateGuardrailRequest {
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  topicPolicyConfig?: GuardrailTopicPolicyConfig;
  contentPolicyConfig?: GuardrailContentPolicyConfig;
  wordPolicyConfig?: GuardrailWordPolicyConfig;
  sensitiveInformationPolicyConfig?: GuardrailSensitiveInformationPolicyConfig;
  contextualGroundingPolicyConfig?: GuardrailContextualGroundingPolicyConfig;
  automatedReasoningPolicyConfig?: GuardrailAutomatedReasoningPolicyConfig;
  crossRegionConfig?: GuardrailCrossRegionConfig;
  blockedInputMessaging: string | redacted.Redacted<string>;
  blockedOutputsMessaging: string | redacted.Redacted<string>;
  kmsKeyId?: string;
  tags?: Tag[];
  clientRequestToken?: string;
}
export const CreateGuardrailRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: SensitiveString,
    description: S.optional(SensitiveString),
    topicPolicyConfig: S.optional(GuardrailTopicPolicyConfig),
    contentPolicyConfig: S.optional(GuardrailContentPolicyConfig),
    wordPolicyConfig: S.optional(GuardrailWordPolicyConfig),
    sensitiveInformationPolicyConfig: S.optional(
      GuardrailSensitiveInformationPolicyConfig,
    ),
    contextualGroundingPolicyConfig: S.optional(
      GuardrailContextualGroundingPolicyConfig,
    ),
    automatedReasoningPolicyConfig: S.optional(
      GuardrailAutomatedReasoningPolicyConfig,
    ),
    crossRegionConfig: S.optional(GuardrailCrossRegionConfig),
    blockedInputMessaging: SensitiveString,
    blockedOutputsMessaging: SensitiveString,
    kmsKeyId: S.optional(S.String),
    tags: S.optional(TagList),
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/guardrails" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGuardrailRequest",
}) as any as S.Schema<CreateGuardrailRequest>;
export type GuardrailId = string;
export type GuardrailArn = string;
export type GuardrailDraftVersion = string;
export interface CreateGuardrailResponse {
  guardrailId: string;
  guardrailArn: string;
  version: string;
  createdAt: Date;
}
export const CreateGuardrailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    guardrailId: S.String,
    guardrailArn: S.String,
    version: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreateGuardrailResponse",
}) as any as S.Schema<CreateGuardrailResponse>;
export type GuardrailIdentifier = string;
export interface CreateGuardrailVersionRequest {
  guardrailIdentifier: string;
  description?: string | redacted.Redacted<string>;
  clientRequestToken?: string;
}
export const CreateGuardrailVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    guardrailIdentifier: S.String.pipe(T.HttpLabel("guardrailIdentifier")),
    description: S.optional(SensitiveString),
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/guardrails/{guardrailIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGuardrailVersionRequest",
}) as any as S.Schema<CreateGuardrailVersionRequest>;
export type GuardrailNumericalVersion = string;
export interface CreateGuardrailVersionResponse {
  guardrailId: string;
  version: string;
}
export const CreateGuardrailVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ guardrailId: S.String, version: S.String }),
).annotate({
  identifier: "CreateGuardrailVersionResponse",
}) as any as S.Schema<CreateGuardrailVersionResponse>;
export type InferenceProfileName = string;
export type InferenceProfileDescription = string | redacted.Redacted<string>;
export type InferenceProfileModelSourceArn = string;
export type InferenceProfileModelSource = { copyFrom: string };
export const InferenceProfileModelSource = /*@__PURE__*/ S.Union([
  S.Struct({ copyFrom: S.String }),
]);
export interface CreateInferenceProfileRequest {
  inferenceProfileName: string;
  description?: string | redacted.Redacted<string>;
  clientRequestToken?: string;
  modelSource: InferenceProfileModelSource;
  tags?: Tag[];
}
export const CreateInferenceProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inferenceProfileName: S.String,
    description: S.optional(SensitiveString),
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    modelSource: InferenceProfileModelSource,
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/inference-profiles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateInferenceProfileRequest",
}) as any as S.Schema<CreateInferenceProfileRequest>;
export type InferenceProfileArn = string;
export type InferenceProfileStatus = "ACTIVE" | (string & {});
export const InferenceProfileStatus = /*@__PURE__*/ S.String;

export interface CreateInferenceProfileResponse {
  inferenceProfileArn: string;
  status?: InferenceProfileStatus;
}
export const CreateInferenceProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inferenceProfileArn: S.String,
    status: S.optional(InferenceProfileStatus),
  }),
).annotate({
  identifier: "CreateInferenceProfileResponse",
}) as any as S.Schema<CreateInferenceProfileResponse>;
export type ModelSourceIdentifier = string;
export type InstanceCount = number;
export type InstanceType = string;
export type SubnetId = string;
export type SubnetIds = string[];
export const SubnetIds = /*@__PURE__*/ S.Array(S.String);
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export const SecurityGroupIds = /*@__PURE__*/ S.Array(S.String);
export interface VpcConfig {
  subnetIds: string[];
  securityGroupIds: string[];
}
export const VpcConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ subnetIds: SubnetIds, securityGroupIds: SecurityGroupIds }),
).annotate({ identifier: "VpcConfig" }) as any as S.Schema<VpcConfig>;
export interface SageMakerEndpoint {
  initialInstanceCount: number;
  instanceType: string;
  executionRole: string;
  kmsEncryptionKey?: string;
  vpc?: VpcConfig;
}
export const SageMakerEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    initialInstanceCount: S.Number,
    instanceType: S.String,
    executionRole: S.String,
    kmsEncryptionKey: S.optional(S.String),
    vpc: S.optional(VpcConfig),
  }),
).annotate({
  identifier: "SageMakerEndpoint",
}) as any as S.Schema<SageMakerEndpoint>;
export type EndpointConfig = { sageMaker: SageMakerEndpoint };
export const EndpointConfig = /*@__PURE__*/ S.Union([
  S.Struct({ sageMaker: SageMakerEndpoint }),
]);
export type AcceptEula = boolean;
export type EndpointName = string;
export interface CreateMarketplaceModelEndpointRequest {
  modelSourceIdentifier: string;
  endpointConfig: EndpointConfig;
  acceptEula?: boolean;
  endpointName: string;
  clientRequestToken?: string;
  tags?: Tag[];
}
export const CreateMarketplaceModelEndpointRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      modelSourceIdentifier: S.String,
      endpointConfig: EndpointConfig,
      acceptEula: S.optional(S.Boolean),
      endpointName: S.String,
      clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      tags: S.optional(TagList),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/marketplace-model/endpoints" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateMarketplaceModelEndpointRequest",
}) as any as S.Schema<CreateMarketplaceModelEndpointRequest>;
export type Arn = string;
export type Status = "REGISTERED" | "INCOMPATIBLE_ENDPOINT" | (string & {});
export const Status = /*@__PURE__*/ S.String;

export interface MarketplaceModelEndpoint {
  endpointArn: string;
  modelSourceIdentifier: string;
  status?: Status;
  statusMessage?: string;
  createdAt: Date;
  updatedAt: Date;
  endpointConfig: EndpointConfig;
  endpointStatus: string;
  endpointStatusMessage?: string;
}
export const MarketplaceModelEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    endpointArn: S.String,
    modelSourceIdentifier: S.String,
    status: S.optional(Status),
    statusMessage: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    endpointConfig: EndpointConfig,
    endpointStatus: S.String,
    endpointStatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "MarketplaceModelEndpoint",
}) as any as S.Schema<MarketplaceModelEndpoint>;
export interface CreateMarketplaceModelEndpointResponse {
  marketplaceModelEndpoint: MarketplaceModelEndpoint;
}
export const CreateMarketplaceModelEndpointResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ marketplaceModelEndpoint: MarketplaceModelEndpoint }),
).annotate({
  identifier: "CreateMarketplaceModelEndpointResponse",
}) as any as S.Schema<CreateMarketplaceModelEndpointResponse>;
export interface CreateModelCopyJobRequest {
  sourceModelArn: string;
  targetModelName: string;
  modelKmsKeyId?: string;
  targetModelTags?: Tag[];
  clientRequestToken?: string;
}
export const CreateModelCopyJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceModelArn: S.String,
    targetModelName: S.String,
    modelKmsKeyId: S.optional(S.String),
    targetModelTags: S.optional(TagList),
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/model-copy-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateModelCopyJobRequest",
}) as any as S.Schema<CreateModelCopyJobRequest>;
export type ModelCopyJobArn = string;
export interface CreateModelCopyJobResponse {
  jobArn: string;
}
export const CreateModelCopyJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobArn: S.String }),
).annotate({
  identifier: "CreateModelCopyJobResponse",
}) as any as S.Schema<CreateModelCopyJobResponse>;
export type JobName = string;
export type BaseModelIdentifier = string;
export type CustomizationType =
  | "FINE_TUNING"
  | "CONTINUED_PRE_TRAINING"
  | "DISTILLATION"
  | "REINFORCEMENT_FINE_TUNING"
  | "IMPORTED"
  | (string & {});
export const CustomizationType = /*@__PURE__*/ S.String;

export type UsePromptResponse = boolean;
export type InvocationLogSource = { s3Uri: string };
export const InvocationLogSource = /*@__PURE__*/ S.Union([
  S.Struct({ s3Uri: S.String }),
]);
export type RequestMetadataMap = { [key: string]: string | undefined };
export const RequestMetadataMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface RequestMetadataBaseFilters {
  equals?: { [key: string]: string | undefined };
  notEquals?: { [key: string]: string | undefined };
}
export const RequestMetadataBaseFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    equals: S.optional(RequestMetadataMap),
    notEquals: S.optional(RequestMetadataMap),
  }),
).annotate({
  identifier: "RequestMetadataBaseFilters",
}) as any as S.Schema<RequestMetadataBaseFilters>;
export type RequestMetadataFiltersList = RequestMetadataBaseFilters[];
export const RequestMetadataFiltersList = /*@__PURE__*/ S.Array(
  RequestMetadataBaseFilters,
);
export type RequestMetadataFilters =
  | {
      equals: { [key: string]: string | undefined };
      notEquals?: never;
      andAll?: never;
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals: { [key: string]: string | undefined };
      andAll?: never;
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals?: never;
      andAll: RequestMetadataBaseFilters[];
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals?: never;
      andAll?: never;
      orAll: RequestMetadataBaseFilters[];
    };
export const RequestMetadataFilters = /*@__PURE__*/ S.Union([
  S.Struct({ equals: RequestMetadataMap }),
  S.Struct({ notEquals: RequestMetadataMap }),
  S.Struct({ andAll: RequestMetadataFiltersList }),
  S.Struct({ orAll: RequestMetadataFiltersList }),
]);
export interface InvocationLogsConfig {
  usePromptResponse?: boolean;
  invocationLogSource: InvocationLogSource;
  requestMetadataFilters?: RequestMetadataFilters;
}
export const InvocationLogsConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    usePromptResponse: S.optional(S.Boolean),
    invocationLogSource: InvocationLogSource,
    requestMetadataFilters: S.optional(RequestMetadataFilters),
  }),
).annotate({
  identifier: "InvocationLogsConfig",
}) as any as S.Schema<InvocationLogsConfig>;
export interface TrainingDataConfig {
  s3Uri?: string;
  invocationLogsConfig?: InvocationLogsConfig;
}
export const TrainingDataConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3Uri: S.optional(S.String),
    invocationLogsConfig: S.optional(InvocationLogsConfig),
  }),
).annotate({
  identifier: "TrainingDataConfig",
}) as any as S.Schema<TrainingDataConfig>;
export interface Validator {
  s3Uri: string;
}
export const Validator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Uri: S.String }),
).annotate({ identifier: "Validator" }) as any as S.Schema<Validator>;
export type Validators = Validator[];
export const Validators = /*@__PURE__*/ S.Array(Validator);
export interface ValidationDataConfig {
  validators: Validator[];
}
export const ValidationDataConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ validators: Validators }),
).annotate({
  identifier: "ValidationDataConfig",
}) as any as S.Schema<ValidationDataConfig>;
export interface OutputDataConfig {
  s3Uri: string;
}
export const OutputDataConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Uri: S.String }),
).annotate({
  identifier: "OutputDataConfig",
}) as any as S.Schema<OutputDataConfig>;
export type ModelCustomizationHyperParameters = {
  [key: string]: string | undefined;
};
export const ModelCustomizationHyperParameters = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type TeacherModelIdentifier = string;
export interface TeacherModelConfig {
  teacherModelIdentifier: string;
  maxResponseLengthForInference?: number;
}
export const TeacherModelConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    teacherModelIdentifier: S.String,
    maxResponseLengthForInference: S.optional(S.Number),
  }),
).annotate({
  identifier: "TeacherModelConfig",
}) as any as S.Schema<TeacherModelConfig>;
export interface DistillationConfig {
  teacherModelConfig: TeacherModelConfig;
}
export const DistillationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ teacherModelConfig: TeacherModelConfig }),
).annotate({
  identifier: "DistillationConfig",
}) as any as S.Schema<DistillationConfig>;
export type LambdaArn = string;
export interface LambdaGraderConfig {
  lambdaArn: string;
}
export const LambdaGraderConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ lambdaArn: S.String }),
).annotate({
  identifier: "LambdaGraderConfig",
}) as any as S.Schema<LambdaGraderConfig>;
export type GraderConfig = { lambdaGrader: LambdaGraderConfig };
export const GraderConfig = /*@__PURE__*/ S.Union([
  S.Struct({ lambdaGrader: LambdaGraderConfig }),
]);
export type EpochCount = number;
export type RFTBatchSize = number;
export type RFTLearningRate = number;
export type RFTMaxPromptLength = number;
export type RFTTrainingSamplePerPrompt = number;
export type RFTInferenceMaxTokens = number;
export type ReasoningEffort = "low" | "medium" | "high" | (string & {});
export const ReasoningEffort = /*@__PURE__*/ S.String;

export type RFTEvalInterval = number;
export interface RFTHyperParameters {
  epochCount?: number;
  batchSize?: number;
  learningRate?: number;
  maxPromptLength?: number;
  trainingSamplePerPrompt?: number;
  inferenceMaxTokens?: number;
  reasoningEffort?: ReasoningEffort;
  evalInterval?: number;
}
export const RFTHyperParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    epochCount: S.optional(S.Number),
    batchSize: S.optional(S.Number),
    learningRate: S.optional(S.Number),
    maxPromptLength: S.optional(S.Number),
    trainingSamplePerPrompt: S.optional(S.Number),
    inferenceMaxTokens: S.optional(S.Number),
    reasoningEffort: S.optional(ReasoningEffort),
    evalInterval: S.optional(S.Number),
  }),
).annotate({
  identifier: "RFTHyperParameters",
}) as any as S.Schema<RFTHyperParameters>;
export interface RFTConfig {
  graderConfig?: GraderConfig;
  hyperParameters?: RFTHyperParameters;
}
export const RFTConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graderConfig: S.optional(GraderConfig),
    hyperParameters: S.optional(RFTHyperParameters),
  }),
).annotate({ identifier: "RFTConfig" }) as any as S.Schema<RFTConfig>;
export type CustomizationConfig =
  | { distillationConfig: DistillationConfig; rftConfig?: never }
  | { distillationConfig?: never; rftConfig: RFTConfig };
export const CustomizationConfig = /*@__PURE__*/ S.Union([
  S.Struct({ distillationConfig: DistillationConfig }),
  S.Struct({ rftConfig: RFTConfig }),
]);
export interface CreateModelCustomizationJobRequest {
  jobName: string;
  customModelName: string;
  roleArn: string;
  clientRequestToken?: string;
  baseModelIdentifier: string;
  customizationType?: CustomizationType;
  customModelKmsKeyId?: string;
  jobTags?: Tag[];
  customModelTags?: Tag[];
  trainingDataConfig: TrainingDataConfig;
  validationDataConfig?: ValidationDataConfig;
  outputDataConfig: OutputDataConfig;
  hyperParameters?: { [key: string]: string | undefined };
  vpcConfig?: VpcConfig;
  customizationConfig?: CustomizationConfig;
}
export const CreateModelCustomizationJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobName: S.String,
    customModelName: S.String,
    roleArn: S.String,
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    baseModelIdentifier: S.String,
    customizationType: S.optional(CustomizationType),
    customModelKmsKeyId: S.optional(S.String),
    jobTags: S.optional(TagList),
    customModelTags: S.optional(TagList),
    trainingDataConfig: TrainingDataConfig,
    validationDataConfig: S.optional(ValidationDataConfig),
    outputDataConfig: OutputDataConfig,
    hyperParameters: S.optional(ModelCustomizationHyperParameters),
    vpcConfig: S.optional(VpcConfig),
    customizationConfig: S.optional(CustomizationConfig),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/model-customization-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateModelCustomizationJobRequest",
}) as any as S.Schema<CreateModelCustomizationJobRequest>;
export type ModelCustomizationJobArn = string;
export interface CreateModelCustomizationJobResponse {
  jobArn: string;
}
export const CreateModelCustomizationJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobArn: S.String }),
).annotate({
  identifier: "CreateModelCustomizationJobResponse",
}) as any as S.Schema<CreateModelCustomizationJobResponse>;
export type ImportedModelName = string;
export interface CreateModelImportJobRequest {
  jobName: string;
  importedModelName: string;
  roleArn: string;
  modelDataSource: ModelDataSource;
  jobTags?: Tag[];
  importedModelTags?: Tag[];
  clientRequestToken?: string;
  vpcConfig?: VpcConfig;
  importedModelKmsKeyId?: string;
}
export const CreateModelImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobName: S.String,
    importedModelName: S.String,
    roleArn: S.String,
    modelDataSource: ModelDataSource,
    jobTags: S.optional(TagList),
    importedModelTags: S.optional(TagList),
    clientRequestToken: S.optional(S.String),
    vpcConfig: S.optional(VpcConfig),
    importedModelKmsKeyId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/model-import-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateModelImportJobRequest",
}) as any as S.Schema<CreateModelImportJobRequest>;
export type ModelImportJobArn = string;
export interface CreateModelImportJobResponse {
  jobArn: string;
}
export const CreateModelImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobArn: S.String }),
).annotate({
  identifier: "CreateModelImportJobResponse",
}) as any as S.Schema<CreateModelImportJobResponse>;
export type ModelInvocationJobName = string;
export type ModelInvocationIdempotencyToken = string;
export type ModelId = string;
export type S3InputFormat = "JSONL" | (string & {});
export const S3InputFormat = /*@__PURE__*/ S.String;

export type AccountId = string;
export interface ModelInvocationJobS3InputDataConfig {
  s3InputFormat?: S3InputFormat;
  s3Uri: string;
  s3BucketOwner?: string;
}
export const ModelInvocationJobS3InputDataConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3InputFormat: S.optional(S3InputFormat),
    s3Uri: S.String,
    s3BucketOwner: S.optional(S.String),
  }),
).annotate({
  identifier: "ModelInvocationJobS3InputDataConfig",
}) as any as S.Schema<ModelInvocationJobS3InputDataConfig>;
export type ModelInvocationJobInputDataConfig = {
  s3InputDataConfig: ModelInvocationJobS3InputDataConfig;
};
export const ModelInvocationJobInputDataConfig = /*@__PURE__*/ S.Union([
  S.Struct({ s3InputDataConfig: ModelInvocationJobS3InputDataConfig }),
]);
export interface ModelInvocationJobS3OutputDataConfig {
  s3Uri: string;
  s3EncryptionKeyId?: string;
  s3BucketOwner?: string;
}
export const ModelInvocationJobS3OutputDataConfig = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      s3Uri: S.String,
      s3EncryptionKeyId: S.optional(S.String),
      s3BucketOwner: S.optional(S.String),
    }),
).annotate({
  identifier: "ModelInvocationJobS3OutputDataConfig",
}) as any as S.Schema<ModelInvocationJobS3OutputDataConfig>;
export type ModelInvocationJobOutputDataConfig = {
  s3OutputDataConfig: ModelInvocationJobS3OutputDataConfig;
};
export const ModelInvocationJobOutputDataConfig = /*@__PURE__*/ S.Union([
  S.Struct({ s3OutputDataConfig: ModelInvocationJobS3OutputDataConfig }),
]);
export type ModelInvocationJobTimeoutDurationInHours = number;
export type ModelInvocationType = "InvokeModel" | "Converse" | (string & {});
export const ModelInvocationType = /*@__PURE__*/ S.String;

export interface CreateModelInvocationJobRequest {
  jobName: string;
  roleArn: string;
  clientRequestToken?: string;
  modelId: string;
  inputDataConfig: ModelInvocationJobInputDataConfig;
  outputDataConfig: ModelInvocationJobOutputDataConfig;
  vpcConfig?: VpcConfig;
  timeoutDurationInHours?: number;
  tags?: Tag[];
  modelInvocationType?: ModelInvocationType;
}
export const CreateModelInvocationJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobName: S.String,
    roleArn: S.String,
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    modelId: S.String,
    inputDataConfig: ModelInvocationJobInputDataConfig,
    outputDataConfig: ModelInvocationJobOutputDataConfig,
    vpcConfig: S.optional(VpcConfig),
    timeoutDurationInHours: S.optional(S.Number),
    tags: S.optional(TagList),
    modelInvocationType: S.optional(ModelInvocationType),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/model-invocation-job" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateModelInvocationJobRequest",
}) as any as S.Schema<CreateModelInvocationJobRequest>;
export type ModelInvocationJobArn = string;
export interface CreateModelInvocationJobResponse {
  jobArn: string;
}
export const CreateModelInvocationJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobArn: S.String }),
).annotate({
  identifier: "CreateModelInvocationJobResponse",
}) as any as S.Schema<CreateModelInvocationJobResponse>;
export type PromptRouterName = string;
export type PromptRouterTargetModelArn = string;
export interface PromptRouterTargetModel {
  modelArn?: string;
}
export const PromptRouterTargetModel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ modelArn: S.optional(S.String) }),
).annotate({
  identifier: "PromptRouterTargetModel",
}) as any as S.Schema<PromptRouterTargetModel>;
export type PromptRouterTargetModels = PromptRouterTargetModel[];
export const PromptRouterTargetModels = /*@__PURE__*/ S.Array(
  PromptRouterTargetModel,
);
export type PromptRouterDescription = string | redacted.Redacted<string>;
export interface RoutingCriteria {
  responseQualityDifference: number;
}
export const RoutingCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ responseQualityDifference: S.Number }),
).annotate({
  identifier: "RoutingCriteria",
}) as any as S.Schema<RoutingCriteria>;
export interface CreatePromptRouterRequest {
  clientRequestToken?: string;
  promptRouterName: string;
  models: PromptRouterTargetModel[];
  description?: string | redacted.Redacted<string>;
  routingCriteria: RoutingCriteria;
  fallbackModel: PromptRouterTargetModel;
  tags?: Tag[];
}
export const CreatePromptRouterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    promptRouterName: S.String,
    models: PromptRouterTargetModels,
    description: S.optional(SensitiveString),
    routingCriteria: RoutingCriteria,
    fallbackModel: PromptRouterTargetModel,
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/prompt-routers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePromptRouterRequest",
}) as any as S.Schema<CreatePromptRouterRequest>;
export type PromptRouterArn = string;
export interface CreatePromptRouterResponse {
  promptRouterArn?: string;
}
export const CreatePromptRouterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ promptRouterArn: S.optional(S.String) }),
).annotate({
  identifier: "CreatePromptRouterResponse",
}) as any as S.Schema<CreatePromptRouterResponse>;
export type PositiveInteger = number;
export type ProvisionedModelName = string;
export type ModelIdentifier = string;
export type CommitmentDuration = "OneMonth" | "SixMonths" | (string & {});
export const CommitmentDuration = /*@__PURE__*/ S.String;

export interface CreateProvisionedModelThroughputRequest {
  clientRequestToken?: string;
  modelUnits: number;
  provisionedModelName: string;
  modelId: string;
  commitmentDuration?: CommitmentDuration;
  tags?: Tag[];
}
export const CreateProvisionedModelThroughputRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      modelUnits: S.Number,
      provisionedModelName: S.String,
      modelId: S.String,
      commitmentDuration: S.optional(CommitmentDuration),
      tags: S.optional(TagList),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/provisioned-model-throughput" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateProvisionedModelThroughputRequest",
}) as any as S.Schema<CreateProvisionedModelThroughputRequest>;
export type ProvisionedModelArn = string;
export interface CreateProvisionedModelThroughputResponse {
  provisionedModelArn: string;
}
export const CreateProvisionedModelThroughputResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ provisionedModelArn: S.String }),
).annotate({
  identifier: "CreateProvisionedModelThroughputResponse",
}) as any as S.Schema<CreateProvisionedModelThroughputResponse>;
export interface DeleteAutomatedReasoningPolicyRequest {
  policyArn: string;
  force?: boolean;
}
export const DeleteAutomatedReasoningPolicyRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      policyArn: S.String.pipe(T.HttpLabel("policyArn")),
      force: S.optional(S.Boolean).pipe(T.HttpQuery("force")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/automated-reasoning-policies/{policyArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteAutomatedReasoningPolicyRequest",
}) as any as S.Schema<DeleteAutomatedReasoningPolicyRequest>;
export interface DeleteAutomatedReasoningPolicyResponse {}
export const DeleteAutomatedReasoningPolicyResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteAutomatedReasoningPolicyResponse",
}) as any as S.Schema<DeleteAutomatedReasoningPolicyResponse>;
export interface DeleteAutomatedReasoningPolicyBuildWorkflowRequest {
  policyArn: string;
  buildWorkflowId: string;
  lastUpdatedAt: Date;
}
export const DeleteAutomatedReasoningPolicyBuildWorkflowRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyArn: S.String.pipe(T.HttpLabel("policyArn")),
      buildWorkflowId: S.String.pipe(T.HttpLabel("buildWorkflowId")),
      lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")).pipe(
        T.HttpQuery("updatedAt"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteAutomatedReasoningPolicyBuildWorkflowRequest",
  }) as any as S.Schema<DeleteAutomatedReasoningPolicyBuildWorkflowRequest>;
export interface DeleteAutomatedReasoningPolicyBuildWorkflowResponse {}
export const DeleteAutomatedReasoningPolicyBuildWorkflowResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteAutomatedReasoningPolicyBuildWorkflowResponse",
  }) as any as S.Schema<DeleteAutomatedReasoningPolicyBuildWorkflowResponse>;
export interface DeleteAutomatedReasoningPolicyTestCaseRequest {
  policyArn: string;
  testCaseId: string;
  lastUpdatedAt: Date;
}
export const DeleteAutomatedReasoningPolicyTestCaseRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyArn: S.String.pipe(T.HttpLabel("policyArn")),
      testCaseId: S.String.pipe(T.HttpLabel("testCaseId")),
      lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")).pipe(
        T.HttpQuery("updatedAt"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/automated-reasoning-policies/{policyArn}/test-cases/{testCaseId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteAutomatedReasoningPolicyTestCaseRequest",
  }) as any as S.Schema<DeleteAutomatedReasoningPolicyTestCaseRequest>;
export interface DeleteAutomatedReasoningPolicyTestCaseResponse {}
export const DeleteAutomatedReasoningPolicyTestCaseResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteAutomatedReasoningPolicyTestCaseResponse",
  }) as any as S.Schema<DeleteAutomatedReasoningPolicyTestCaseResponse>;
export interface DeleteCustomModelRequest {
  modelIdentifier: string;
}
export const DeleteCustomModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelIdentifier: S.String.pipe(T.HttpLabel("modelIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/custom-models/{modelIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCustomModelRequest",
}) as any as S.Schema<DeleteCustomModelRequest>;
export interface DeleteCustomModelResponse {}
export const DeleteCustomModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCustomModelResponse",
}) as any as S.Schema<DeleteCustomModelResponse>;
export type CustomModelDeploymentIdentifier = string;
export interface DeleteCustomModelDeploymentRequest {
  customModelDeploymentIdentifier: string;
}
export const DeleteCustomModelDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    customModelDeploymentIdentifier: S.String.pipe(
      T.HttpLabel("customModelDeploymentIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/model-customization/custom-model-deployments/{customModelDeploymentIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCustomModelDeploymentRequest",
}) as any as S.Schema<DeleteCustomModelDeploymentRequest>;
export interface DeleteCustomModelDeploymentResponse {}
export const DeleteCustomModelDeploymentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCustomModelDeploymentResponse",
}) as any as S.Schema<DeleteCustomModelDeploymentResponse>;
export type AccountEnforcedGuardrailConfigurationId = string;
export interface DeleteEnforcedGuardrailConfigurationRequest {
  configId: string;
}
export const DeleteEnforcedGuardrailConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ configId: S.String.pipe(T.HttpLabel("configId")) }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/enforcedGuardrailsConfiguration/{configId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteEnforcedGuardrailConfigurationRequest",
  }) as any as S.Schema<DeleteEnforcedGuardrailConfigurationRequest>;
export interface DeleteEnforcedGuardrailConfigurationResponse {}
export const DeleteEnforcedGuardrailConfigurationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteEnforcedGuardrailConfigurationResponse",
  }) as any as S.Schema<DeleteEnforcedGuardrailConfigurationResponse>;
export interface DeleteFoundationModelAgreementRequest {
  modelId: string;
}
export const DeleteFoundationModelAgreementRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ modelId: S.String }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/delete-foundation-model-agreement" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteFoundationModelAgreementRequest",
}) as any as S.Schema<DeleteFoundationModelAgreementRequest>;
export interface DeleteFoundationModelAgreementResponse {}
export const DeleteFoundationModelAgreementResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteFoundationModelAgreementResponse",
}) as any as S.Schema<DeleteFoundationModelAgreementResponse>;
export interface DeleteGuardrailRequest {
  guardrailIdentifier: string;
  guardrailVersion?: string;
}
export const DeleteGuardrailRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    guardrailIdentifier: S.String.pipe(T.HttpLabel("guardrailIdentifier")),
    guardrailVersion: S.optional(S.String).pipe(
      T.HttpQuery("guardrailVersion"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/guardrails/{guardrailIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGuardrailRequest",
}) as any as S.Schema<DeleteGuardrailRequest>;
export interface DeleteGuardrailResponse {}
export const DeleteGuardrailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteGuardrailResponse",
}) as any as S.Schema<DeleteGuardrailResponse>;
export type ImportedModelIdentifier = string;
export interface DeleteImportedModelRequest {
  modelIdentifier: string;
}
export const DeleteImportedModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelIdentifier: S.String.pipe(T.HttpLabel("modelIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/imported-models/{modelIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteImportedModelRequest",
}) as any as S.Schema<DeleteImportedModelRequest>;
export interface DeleteImportedModelResponse {}
export const DeleteImportedModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteImportedModelResponse",
}) as any as S.Schema<DeleteImportedModelResponse>;
export type InferenceProfileIdentifier = string;
export interface DeleteInferenceProfileRequest {
  inferenceProfileIdentifier: string;
}
export const DeleteInferenceProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inferenceProfileIdentifier: S.String.pipe(
      T.HttpLabel("inferenceProfileIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/inference-profiles/{inferenceProfileIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteInferenceProfileRequest",
}) as any as S.Schema<DeleteInferenceProfileRequest>;
export interface DeleteInferenceProfileResponse {}
export const DeleteInferenceProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteInferenceProfileResponse",
}) as any as S.Schema<DeleteInferenceProfileResponse>;
export interface DeleteMarketplaceModelEndpointRequest {
  endpointArn: string;
}
export const DeleteMarketplaceModelEndpointRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ endpointArn: S.String.pipe(T.HttpLabel("endpointArn")) }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/marketplace-model/endpoints/{endpointArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteMarketplaceModelEndpointRequest",
}) as any as S.Schema<DeleteMarketplaceModelEndpointRequest>;
export interface DeleteMarketplaceModelEndpointResponse {}
export const DeleteMarketplaceModelEndpointResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteMarketplaceModelEndpointResponse",
}) as any as S.Schema<DeleteMarketplaceModelEndpointResponse>;
export interface DeleteModelInvocationLoggingConfigurationRequest {}
export const DeleteModelInvocationLoggingConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({}).pipe(
      T.all(
        T.Http({ method: "DELETE", uri: "/logging/modelinvocations" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteModelInvocationLoggingConfigurationRequest",
  }) as any as S.Schema<DeleteModelInvocationLoggingConfigurationRequest>;
export interface DeleteModelInvocationLoggingConfigurationResponse {}
export const DeleteModelInvocationLoggingConfigurationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteModelInvocationLoggingConfigurationResponse",
  }) as any as S.Schema<DeleteModelInvocationLoggingConfigurationResponse>;
export interface DeletePromptRouterRequest {
  promptRouterArn: string;
}
export const DeletePromptRouterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    promptRouterArn: S.String.pipe(T.HttpLabel("promptRouterArn")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/prompt-routers/{promptRouterArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePromptRouterRequest",
}) as any as S.Schema<DeletePromptRouterRequest>;
export interface DeletePromptRouterResponse {}
export const DeletePromptRouterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePromptRouterResponse",
}) as any as S.Schema<DeletePromptRouterResponse>;
export type ProvisionedModelId = string;
export interface DeleteProvisionedModelThroughputRequest {
  provisionedModelId: string;
}
export const DeleteProvisionedModelThroughputRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      provisionedModelId: S.String.pipe(T.HttpLabel("provisionedModelId")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/provisioned-model-throughput/{provisionedModelId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteProvisionedModelThroughputRequest",
}) as any as S.Schema<DeleteProvisionedModelThroughputRequest>;
export interface DeleteProvisionedModelThroughputResponse {}
export const DeleteProvisionedModelThroughputResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteProvisionedModelThroughputResponse",
}) as any as S.Schema<DeleteProvisionedModelThroughputResponse>;
export type ResourcePolicyResourceArn = string;
export interface DeleteResourcePolicyRequest {
  resourceArn: string;
}
export const DeleteResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/resource-policy/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
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
export interface DeregisterMarketplaceModelEndpointRequest {
  endpointArn: string;
}
export const DeregisterMarketplaceModelEndpointRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ endpointArn: S.String.pipe(T.HttpLabel("endpointArn")) }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/marketplace-model/endpoints/{endpointArn}/registration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeregisterMarketplaceModelEndpointRequest",
  }) as any as S.Schema<DeregisterMarketplaceModelEndpointRequest>;
export interface DeregisterMarketplaceModelEndpointResponse {}
export const DeregisterMarketplaceModelEndpointResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeregisterMarketplaceModelEndpointResponse",
  }) as any as S.Schema<DeregisterMarketplaceModelEndpointResponse>;
export interface ExportAutomatedReasoningPolicyVersionRequest {
  policyArn: string;
}
export const ExportAutomatedReasoningPolicyVersionRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ policyArn: S.String.pipe(T.HttpLabel("policyArn")) }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/automated-reasoning-policies/{policyArn}/export",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ExportAutomatedReasoningPolicyVersionRequest",
  }) as any as S.Schema<ExportAutomatedReasoningPolicyVersionRequest>;
export interface ExportAutomatedReasoningPolicyVersionResponse {
  policyDefinition: AutomatedReasoningPolicyDefinition;
}
export const ExportAutomatedReasoningPolicyVersionResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyDefinition: AutomatedReasoningPolicyDefinition.pipe(
        T.HttpPayload(),
      ).annotate({ identifier: "AutomatedReasoningPolicyDefinition" }),
    }),
  ).annotate({
    identifier: "ExportAutomatedReasoningPolicyVersionResponse",
  }) as any as S.Schema<ExportAutomatedReasoningPolicyVersionResponse>;
export interface GetAccountDataRetentionRequest {}
export const GetAccountDataRetentionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/data-retention" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAccountDataRetentionRequest",
}) as any as S.Schema<GetAccountDataRetentionRequest>;
export type DataRetentionMode =
  | "default"
  | "none"
  | "provider_data_share"
  | "inherit"
  | (string & {});
export const DataRetentionMode = /*@__PURE__*/ S.String;

export interface GetAccountDataRetentionResponse {
  mode: DataRetentionMode;
  updatedAt?: Date;
}
export const GetAccountDataRetentionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mode: DataRetentionMode,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetAccountDataRetentionResponse",
}) as any as S.Schema<GetAccountDataRetentionResponse>;
export interface GetAdvancedPromptOptimizationJobRequest {
  jobIdentifier: string;
}
export const GetAdvancedPromptOptimizationJobRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      jobIdentifier: S.String.pipe(T.HttpLabel("jobIdentifier")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/advanced-prompt-optimization-jobs/{jobIdentifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetAdvancedPromptOptimizationJobRequest",
}) as any as S.Schema<GetAdvancedPromptOptimizationJobRequest>;
export type ErrorMessage = string;
export interface GetAdvancedPromptOptimizationJobResponse {
  jobArn: string;
  jobName: string;
  jobDescription?: string;
  jobStatus: AdvancedPromptOptimizationJobStatus;
  inputConfig: AdvancedPromptOptimizationInputConfig;
  outputConfig: AdvancedPromptOptimizationOutputConfig;
  encryptionKeyArn?: string;
  creationTime: Date;
  lastModifiedTime?: Date;
  failureMessage?: string;
  modelConfigurations: ModelConfiguration[];
}
export const GetAdvancedPromptOptimizationJobResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      jobArn: S.String,
      jobName: S.String,
      jobDescription: S.optional(S.String),
      jobStatus: AdvancedPromptOptimizationJobStatus,
      inputConfig: AdvancedPromptOptimizationInputConfig,
      outputConfig: AdvancedPromptOptimizationOutputConfig,
      encryptionKeyArn: S.optional(S.String),
      creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      lastModifiedTime: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      failureMessage: S.optional(S.String),
      modelConfigurations: ModelConfigurations,
    }),
).annotate({
  identifier: "GetAdvancedPromptOptimizationJobResponse",
}) as any as S.Schema<GetAdvancedPromptOptimizationJobResponse>;
export interface GetAutomatedReasoningPolicyRequest {
  policyArn: string;
}
export const GetAutomatedReasoningPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyArn: S.String.pipe(T.HttpLabel("policyArn")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/automated-reasoning-policies/{policyArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAutomatedReasoningPolicyRequest",
}) as any as S.Schema<GetAutomatedReasoningPolicyRequest>;
export type AutomatedReasoningPolicyId = string;
export interface GetAutomatedReasoningPolicyResponse {
  policyArn: string;
  name: string | redacted.Redacted<string>;
  version: string;
  policyId: string;
  description?: string | redacted.Redacted<string>;
  definitionHash: string;
  kmsKeyArn?: string;
  createdAt?: Date;
  updatedAt: Date;
}
export const GetAutomatedReasoningPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyArn: S.String,
    name: SensitiveString,
    version: S.String,
    policyId: S.String,
    description: S.optional(SensitiveString),
    definitionHash: S.String,
    kmsKeyArn: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "GetAutomatedReasoningPolicyResponse",
}) as any as S.Schema<GetAutomatedReasoningPolicyResponse>;
export interface GetAutomatedReasoningPolicyAnnotationsRequest {
  policyArn: string;
  buildWorkflowId: string;
}
export const GetAutomatedReasoningPolicyAnnotationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyArn: S.String.pipe(T.HttpLabel("policyArn")),
      buildWorkflowId: S.String.pipe(T.HttpLabel("buildWorkflowId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}/annotations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetAutomatedReasoningPolicyAnnotationsRequest",
  }) as any as S.Schema<GetAutomatedReasoningPolicyAnnotationsRequest>;
export interface AutomatedReasoningPolicyAddTypeAnnotation {
  name: string | redacted.Redacted<string>;
  description: string | redacted.Redacted<string>;
  values: AutomatedReasoningPolicyDefinitionTypeValue[];
}
export const AutomatedReasoningPolicyAddTypeAnnotation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      name: SensitiveString,
      description: SensitiveString,
      values: AutomatedReasoningPolicyDefinitionTypeValueList,
    }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyAddTypeAnnotation",
  }) as any as S.Schema<AutomatedReasoningPolicyAddTypeAnnotation>;
export interface AutomatedReasoningPolicyAddTypeValue {
  value: string;
  description?: string | redacted.Redacted<string>;
}
export const AutomatedReasoningPolicyAddTypeValue = /*@__PURE__*/ S.suspend(
  () => S.Struct({ value: S.String, description: S.optional(SensitiveString) }),
).annotate({
  identifier: "AutomatedReasoningPolicyAddTypeValue",
}) as any as S.Schema<AutomatedReasoningPolicyAddTypeValue>;
export interface AutomatedReasoningPolicyUpdateTypeValue {
  value: string;
  newValue?: string;
  description?: string | redacted.Redacted<string>;
}
export const AutomatedReasoningPolicyUpdateTypeValue = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      value: S.String,
      newValue: S.optional(S.String),
      description: S.optional(SensitiveString),
    }),
).annotate({
  identifier: "AutomatedReasoningPolicyUpdateTypeValue",
}) as any as S.Schema<AutomatedReasoningPolicyUpdateTypeValue>;
export interface AutomatedReasoningPolicyDeleteTypeValue {
  value: string;
}
export const AutomatedReasoningPolicyDeleteTypeValue = /*@__PURE__*/ S.suspend(
  () => S.Struct({ value: S.String }),
).annotate({
  identifier: "AutomatedReasoningPolicyDeleteTypeValue",
}) as any as S.Schema<AutomatedReasoningPolicyDeleteTypeValue>;
export type AutomatedReasoningPolicyTypeValueAnnotation =
  | {
      addTypeValue: AutomatedReasoningPolicyAddTypeValue;
      updateTypeValue?: never;
      deleteTypeValue?: never;
    }
  | {
      addTypeValue?: never;
      updateTypeValue: AutomatedReasoningPolicyUpdateTypeValue;
      deleteTypeValue?: never;
    }
  | {
      addTypeValue?: never;
      updateTypeValue?: never;
      deleteTypeValue: AutomatedReasoningPolicyDeleteTypeValue;
    };
export const AutomatedReasoningPolicyTypeValueAnnotation =
  /*@__PURE__*/ S.Union([
    S.Struct({ addTypeValue: AutomatedReasoningPolicyAddTypeValue }),
    S.Struct({ updateTypeValue: AutomatedReasoningPolicyUpdateTypeValue }),
    S.Struct({ deleteTypeValue: AutomatedReasoningPolicyDeleteTypeValue }),
  ]);
export type AutomatedReasoningPolicyTypeValueAnnotationList =
  AutomatedReasoningPolicyTypeValueAnnotation[];
export const AutomatedReasoningPolicyTypeValueAnnotationList =
  /*@__PURE__*/ S.Array(AutomatedReasoningPolicyTypeValueAnnotation);
export interface AutomatedReasoningPolicyUpdateTypeAnnotation {
  name: string | redacted.Redacted<string>;
  newName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  values: AutomatedReasoningPolicyTypeValueAnnotation[];
}
export const AutomatedReasoningPolicyUpdateTypeAnnotation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      name: SensitiveString,
      newName: S.optional(SensitiveString),
      description: S.optional(SensitiveString),
      values: AutomatedReasoningPolicyTypeValueAnnotationList,
    }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyUpdateTypeAnnotation",
  }) as any as S.Schema<AutomatedReasoningPolicyUpdateTypeAnnotation>;
export interface AutomatedReasoningPolicyDeleteTypeAnnotation {
  name: string | redacted.Redacted<string>;
}
export const AutomatedReasoningPolicyDeleteTypeAnnotation =
  /*@__PURE__*/ S.suspend(() => S.Struct({ name: SensitiveString })).annotate({
    identifier: "AutomatedReasoningPolicyDeleteTypeAnnotation",
  }) as any as S.Schema<AutomatedReasoningPolicyDeleteTypeAnnotation>;
export interface AutomatedReasoningPolicyAddVariableAnnotation {
  name: string | redacted.Redacted<string>;
  type: string | redacted.Redacted<string>;
  description: string | redacted.Redacted<string>;
}
export const AutomatedReasoningPolicyAddVariableAnnotation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      name: SensitiveString,
      type: SensitiveString,
      description: SensitiveString,
    }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyAddVariableAnnotation",
  }) as any as S.Schema<AutomatedReasoningPolicyAddVariableAnnotation>;
export interface AutomatedReasoningPolicyUpdateVariableAnnotation {
  name: string | redacted.Redacted<string>;
  newName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
}
export const AutomatedReasoningPolicyUpdateVariableAnnotation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      name: SensitiveString,
      newName: S.optional(SensitiveString),
      description: S.optional(SensitiveString),
    }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyUpdateVariableAnnotation",
  }) as any as S.Schema<AutomatedReasoningPolicyUpdateVariableAnnotation>;
export interface AutomatedReasoningPolicyDeleteVariableAnnotation {
  name: string | redacted.Redacted<string>;
}
export const AutomatedReasoningPolicyDeleteVariableAnnotation =
  /*@__PURE__*/ S.suspend(() => S.Struct({ name: SensitiveString })).annotate({
    identifier: "AutomatedReasoningPolicyDeleteVariableAnnotation",
  }) as any as S.Schema<AutomatedReasoningPolicyDeleteVariableAnnotation>;
export interface AutomatedReasoningPolicyAddRuleAnnotation {
  expression: string | redacted.Redacted<string>;
}
export const AutomatedReasoningPolicyAddRuleAnnotation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ expression: SensitiveString }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyAddRuleAnnotation",
  }) as any as S.Schema<AutomatedReasoningPolicyAddRuleAnnotation>;
export interface AutomatedReasoningPolicyUpdateRuleAnnotation {
  ruleId: string;
  expression: string | redacted.Redacted<string>;
}
export const AutomatedReasoningPolicyUpdateRuleAnnotation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ruleId: S.String, expression: SensitiveString }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyUpdateRuleAnnotation",
  }) as any as S.Schema<AutomatedReasoningPolicyUpdateRuleAnnotation>;
export interface AutomatedReasoningPolicyDeleteRuleAnnotation {
  ruleId: string;
}
export const AutomatedReasoningPolicyDeleteRuleAnnotation =
  /*@__PURE__*/ S.suspend(() => S.Struct({ ruleId: S.String })).annotate({
    identifier: "AutomatedReasoningPolicyDeleteRuleAnnotation",
  }) as any as S.Schema<AutomatedReasoningPolicyDeleteRuleAnnotation>;
export type AutomatedReasoningPolicyAnnotationRuleNaturalLanguage =
  | string
  | redacted.Redacted<string>;
export interface AutomatedReasoningPolicyAddRuleFromNaturalLanguageAnnotation {
  naturalLanguage: string | redacted.Redacted<string>;
}
export const AutomatedReasoningPolicyAddRuleFromNaturalLanguageAnnotation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ naturalLanguage: SensitiveString }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyAddRuleFromNaturalLanguageAnnotation",
  }) as any as S.Schema<AutomatedReasoningPolicyAddRuleFromNaturalLanguageAnnotation>;
export type AutomatedReasoningPolicyDefinitionRuleIdList = string[];
export const AutomatedReasoningPolicyDefinitionRuleIdList =
  /*@__PURE__*/ S.Array(S.String);
export type AutomatedReasoningPolicyAnnotationFeedbackNaturalLanguage =
  | string
  | redacted.Redacted<string>;
export interface AutomatedReasoningPolicyUpdateFromRuleFeedbackAnnotation {
  ruleIds?: string[];
  feedback: string | redacted.Redacted<string>;
}
export const AutomatedReasoningPolicyUpdateFromRuleFeedbackAnnotation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ruleIds: S.optional(AutomatedReasoningPolicyDefinitionRuleIdList),
      feedback: SensitiveString,
    }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyUpdateFromRuleFeedbackAnnotation",
  }) as any as S.Schema<AutomatedReasoningPolicyUpdateFromRuleFeedbackAnnotation>;
export type AutomatedReasoningPolicyScenarioExpression =
  | string
  | redacted.Redacted<string>;
export interface AutomatedReasoningPolicyUpdateFromScenarioFeedbackAnnotation {
  ruleIds?: string[];
  scenarioExpression: string | redacted.Redacted<string>;
  feedback?: string | redacted.Redacted<string>;
}
export const AutomatedReasoningPolicyUpdateFromScenarioFeedbackAnnotation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ruleIds: S.optional(AutomatedReasoningPolicyDefinitionRuleIdList),
      scenarioExpression: SensitiveString,
      feedback: S.optional(SensitiveString),
    }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyUpdateFromScenarioFeedbackAnnotation",
  }) as any as S.Schema<AutomatedReasoningPolicyUpdateFromScenarioFeedbackAnnotation>;
export type AutomatedReasoningPolicyAnnotationIngestContent =
  | string
  | redacted.Redacted<string>;
export interface AutomatedReasoningPolicyIngestContentAnnotation {
  content: string | redacted.Redacted<string>;
}
export const AutomatedReasoningPolicyIngestContentAnnotation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ content: SensitiveString }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyIngestContentAnnotation",
  }) as any as S.Schema<AutomatedReasoningPolicyIngestContentAnnotation>;
export type AutomatedReasoningPolicyAnnotation =
  | {
      addType: AutomatedReasoningPolicyAddTypeAnnotation;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
      addRuleFromNaturalLanguage?: never;
      updateFromRulesFeedback?: never;
      updateFromScenarioFeedback?: never;
      ingestContent?: never;
    }
  | {
      addType?: never;
      updateType: AutomatedReasoningPolicyUpdateTypeAnnotation;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
      addRuleFromNaturalLanguage?: never;
      updateFromRulesFeedback?: never;
      updateFromScenarioFeedback?: never;
      ingestContent?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType: AutomatedReasoningPolicyDeleteTypeAnnotation;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
      addRuleFromNaturalLanguage?: never;
      updateFromRulesFeedback?: never;
      updateFromScenarioFeedback?: never;
      ingestContent?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable: AutomatedReasoningPolicyAddVariableAnnotation;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
      addRuleFromNaturalLanguage?: never;
      updateFromRulesFeedback?: never;
      updateFromScenarioFeedback?: never;
      ingestContent?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable: AutomatedReasoningPolicyUpdateVariableAnnotation;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
      addRuleFromNaturalLanguage?: never;
      updateFromRulesFeedback?: never;
      updateFromScenarioFeedback?: never;
      ingestContent?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable: AutomatedReasoningPolicyDeleteVariableAnnotation;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
      addRuleFromNaturalLanguage?: never;
      updateFromRulesFeedback?: never;
      updateFromScenarioFeedback?: never;
      ingestContent?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule: AutomatedReasoningPolicyAddRuleAnnotation;
      updateRule?: never;
      deleteRule?: never;
      addRuleFromNaturalLanguage?: never;
      updateFromRulesFeedback?: never;
      updateFromScenarioFeedback?: never;
      ingestContent?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule: AutomatedReasoningPolicyUpdateRuleAnnotation;
      deleteRule?: never;
      addRuleFromNaturalLanguage?: never;
      updateFromRulesFeedback?: never;
      updateFromScenarioFeedback?: never;
      ingestContent?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule: AutomatedReasoningPolicyDeleteRuleAnnotation;
      addRuleFromNaturalLanguage?: never;
      updateFromRulesFeedback?: never;
      updateFromScenarioFeedback?: never;
      ingestContent?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
      addRuleFromNaturalLanguage: AutomatedReasoningPolicyAddRuleFromNaturalLanguageAnnotation;
      updateFromRulesFeedback?: never;
      updateFromScenarioFeedback?: never;
      ingestContent?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
      addRuleFromNaturalLanguage?: never;
      updateFromRulesFeedback: AutomatedReasoningPolicyUpdateFromRuleFeedbackAnnotation;
      updateFromScenarioFeedback?: never;
      ingestContent?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
      addRuleFromNaturalLanguage?: never;
      updateFromRulesFeedback?: never;
      updateFromScenarioFeedback: AutomatedReasoningPolicyUpdateFromScenarioFeedbackAnnotation;
      ingestContent?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
      addRuleFromNaturalLanguage?: never;
      updateFromRulesFeedback?: never;
      updateFromScenarioFeedback?: never;
      ingestContent: AutomatedReasoningPolicyIngestContentAnnotation;
    };
export const AutomatedReasoningPolicyAnnotation = /*@__PURE__*/ S.Union([
  S.Struct({ addType: AutomatedReasoningPolicyAddTypeAnnotation }),
  S.Struct({ updateType: AutomatedReasoningPolicyUpdateTypeAnnotation }),
  S.Struct({ deleteType: AutomatedReasoningPolicyDeleteTypeAnnotation }),
  S.Struct({ addVariable: AutomatedReasoningPolicyAddVariableAnnotation }),
  S.Struct({
    updateVariable: AutomatedReasoningPolicyUpdateVariableAnnotation,
  }),
  S.Struct({
    deleteVariable: AutomatedReasoningPolicyDeleteVariableAnnotation,
  }),
  S.Struct({ addRule: AutomatedReasoningPolicyAddRuleAnnotation }),
  S.Struct({ updateRule: AutomatedReasoningPolicyUpdateRuleAnnotation }),
  S.Struct({ deleteRule: AutomatedReasoningPolicyDeleteRuleAnnotation }),
  S.Struct({
    addRuleFromNaturalLanguage:
      AutomatedReasoningPolicyAddRuleFromNaturalLanguageAnnotation,
  }),
  S.Struct({
    updateFromRulesFeedback:
      AutomatedReasoningPolicyUpdateFromRuleFeedbackAnnotation,
  }),
  S.Struct({
    updateFromScenarioFeedback:
      AutomatedReasoningPolicyUpdateFromScenarioFeedbackAnnotation,
  }),
  S.Struct({ ingestContent: AutomatedReasoningPolicyIngestContentAnnotation }),
]);
export type AutomatedReasoningPolicyAnnotationList =
  AutomatedReasoningPolicyAnnotation[];
export const AutomatedReasoningPolicyAnnotationList = /*@__PURE__*/ S.Array(
  AutomatedReasoningPolicyAnnotation,
);
export interface GetAutomatedReasoningPolicyAnnotationsResponse {
  policyArn: string;
  name: string | redacted.Redacted<string>;
  buildWorkflowId: string;
  annotations: AutomatedReasoningPolicyAnnotation[];
  annotationSetHash: string;
  updatedAt: Date;
}
export const GetAutomatedReasoningPolicyAnnotationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyArn: S.String,
      name: SensitiveString,
      buildWorkflowId: S.String,
      annotations: AutomatedReasoningPolicyAnnotationList,
      annotationSetHash: S.String,
      updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    }),
  ).annotate({
    identifier: "GetAutomatedReasoningPolicyAnnotationsResponse",
  }) as any as S.Schema<GetAutomatedReasoningPolicyAnnotationsResponse>;
export interface GetAutomatedReasoningPolicyBuildWorkflowRequest {
  policyArn: string;
  buildWorkflowId: string;
}
export const GetAutomatedReasoningPolicyBuildWorkflowRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyArn: S.String.pipe(T.HttpLabel("policyArn")),
      buildWorkflowId: S.String.pipe(T.HttpLabel("buildWorkflowId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetAutomatedReasoningPolicyBuildWorkflowRequest",
  }) as any as S.Schema<GetAutomatedReasoningPolicyBuildWorkflowRequest>;
export type AutomatedReasoningPolicyBuildWorkflowStatus =
  | "SCHEDULED"
  | "CANCEL_REQUESTED"
  | "PREPROCESSING"
  | "BUILDING"
  | "TESTING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED"
  | (string & {});
export const AutomatedReasoningPolicyBuildWorkflowStatus =
  /*@__PURE__*/ S.String;

export type AutomatedReasoningPolicyBuildWorkflowType =
  | "INGEST_CONTENT"
  | "REFINE_POLICY"
  | "IMPORT_POLICY"
  | "GENERATE_FIDELITY_REPORT"
  | "GENERATE_POLICY_SCENARIOS"
  | "RESOLVE_POLICY_AMBIGUITIES"
  | "ITERATIVELY_REFINE_POLICY"
  | (string & {});
export const AutomatedReasoningPolicyBuildWorkflowType = /*@__PURE__*/ S.String;

export type AutomatedReasoningPolicyBuildDocumentName =
  | string
  | redacted.Redacted<string>;
export type AutomatedReasoningPolicyBuildDocumentContentType =
  | "pdf"
  | "txt"
  | (string & {});
export const AutomatedReasoningPolicyBuildDocumentContentType =
  /*@__PURE__*/ S.String;

export type AutomatedReasoningPolicyBuildDocumentDescription =
  | string
  | redacted.Redacted<string>;
export interface GetAutomatedReasoningPolicyBuildWorkflowResponse {
  policyArn: string;
  buildWorkflowId: string;
  status: AutomatedReasoningPolicyBuildWorkflowStatus;
  buildWorkflowType: AutomatedReasoningPolicyBuildWorkflowType;
  documentName?: string | redacted.Redacted<string>;
  documentContentType?: AutomatedReasoningPolicyBuildDocumentContentType;
  documentDescription?: string | redacted.Redacted<string>;
  createdAt: Date;
  updatedAt: Date;
}
export const GetAutomatedReasoningPolicyBuildWorkflowResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyArn: S.String,
      buildWorkflowId: S.String,
      status: AutomatedReasoningPolicyBuildWorkflowStatus,
      buildWorkflowType: AutomatedReasoningPolicyBuildWorkflowType,
      documentName: S.optional(SensitiveString),
      documentContentType: S.optional(
        AutomatedReasoningPolicyBuildDocumentContentType,
      ),
      documentDescription: S.optional(SensitiveString),
      createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    }),
  ).annotate({
    identifier: "GetAutomatedReasoningPolicyBuildWorkflowResponse",
  }) as any as S.Schema<GetAutomatedReasoningPolicyBuildWorkflowResponse>;
export type AutomatedReasoningPolicyBuildResultAssetType =
  | "BUILD_LOG"
  | "QUALITY_REPORT"
  | "POLICY_DEFINITION"
  | "GENERATED_TEST_CASES"
  | "POLICY_SCENARIOS"
  | "FIDELITY_REPORT"
  | "ASSET_MANIFEST"
  | "SOURCE_DOCUMENT"
  | (string & {});
export const AutomatedReasoningPolicyBuildResultAssetType =
  /*@__PURE__*/ S.String;

export type AutomatedReasoningPolicyBuildResultAssetId = string;
export interface GetAutomatedReasoningPolicyBuildWorkflowResultAssetsRequest {
  policyArn: string;
  buildWorkflowId: string;
  assetType: AutomatedReasoningPolicyBuildResultAssetType;
  assetId?: string;
}
export const GetAutomatedReasoningPolicyBuildWorkflowResultAssetsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyArn: S.String.pipe(T.HttpLabel("policyArn")),
      buildWorkflowId: S.String.pipe(T.HttpLabel("buildWorkflowId")),
      assetType: AutomatedReasoningPolicyBuildResultAssetType.pipe(
        T.HttpQuery("assetType"),
      ),
      assetId: S.optional(S.String).pipe(T.HttpQuery("assetId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}/result-assets",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetAutomatedReasoningPolicyBuildWorkflowResultAssetsRequest",
  }) as any as S.Schema<GetAutomatedReasoningPolicyBuildWorkflowResultAssetsRequest>;
export type AutomatedReasoningPolicyDefinitionTypeNameList = (
  | string
  | redacted.Redacted<string>
)[];
export const AutomatedReasoningPolicyDefinitionTypeNameList =
  /*@__PURE__*/ S.Array(SensitiveString);
export interface AutomatedReasoningPolicyDefinitionTypeValuePair {
  typeName: string | redacted.Redacted<string>;
  valueName: string;
}
export const AutomatedReasoningPolicyDefinitionTypeValuePair =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ typeName: SensitiveString, valueName: S.String }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyDefinitionTypeValuePair",
  }) as any as S.Schema<AutomatedReasoningPolicyDefinitionTypeValuePair>;
export type AutomatedReasoningPolicyDefinitionTypeValuePairList =
  AutomatedReasoningPolicyDefinitionTypeValuePair[];
export const AutomatedReasoningPolicyDefinitionTypeValuePairList =
  /*@__PURE__*/ S.Array(AutomatedReasoningPolicyDefinitionTypeValuePair);
export type AutomatedReasoningPolicyDefinitionVariableNameList = (
  | string
  | redacted.Redacted<string>
)[];
export const AutomatedReasoningPolicyDefinitionVariableNameList =
  /*@__PURE__*/ S.Array(SensitiveString);
export type AutomatedReasoningPolicyConflictedRuleIdList = string[];
export const AutomatedReasoningPolicyConflictedRuleIdList =
  /*@__PURE__*/ S.Array(S.String);
export type AutomatedReasoningPolicyDisjointedRuleIdList = string[];
export const AutomatedReasoningPolicyDisjointedRuleIdList =
  /*@__PURE__*/ S.Array(S.String);
export interface AutomatedReasoningPolicyDisjointRuleSet {
  variables: (string | redacted.Redacted<string>)[];
  rules: string[];
}
export const AutomatedReasoningPolicyDisjointRuleSet = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      variables: AutomatedReasoningPolicyDefinitionVariableNameList,
      rules: AutomatedReasoningPolicyDisjointedRuleIdList,
    }),
).annotate({
  identifier: "AutomatedReasoningPolicyDisjointRuleSet",
}) as any as S.Schema<AutomatedReasoningPolicyDisjointRuleSet>;
export type AutomatedReasoningPolicyDisjointRuleSetList =
  AutomatedReasoningPolicyDisjointRuleSet[];
export const AutomatedReasoningPolicyDisjointRuleSetList =
  /*@__PURE__*/ S.Array(AutomatedReasoningPolicyDisjointRuleSet);
export interface AutomatedReasoningPolicyDefinitionQualityReport {
  typeCount: number;
  variableCount: number;
  ruleCount: number;
  unusedTypes: (string | redacted.Redacted<string>)[];
  unusedTypeValues: AutomatedReasoningPolicyDefinitionTypeValuePair[];
  unusedVariables: (string | redacted.Redacted<string>)[];
  conflictingRules: string[];
  disjointRuleSets: AutomatedReasoningPolicyDisjointRuleSet[];
}
export const AutomatedReasoningPolicyDefinitionQualityReport =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      typeCount: S.Number,
      variableCount: S.Number,
      ruleCount: S.Number,
      unusedTypes: AutomatedReasoningPolicyDefinitionTypeNameList,
      unusedTypeValues: AutomatedReasoningPolicyDefinitionTypeValuePairList,
      unusedVariables: AutomatedReasoningPolicyDefinitionVariableNameList,
      conflictingRules: AutomatedReasoningPolicyConflictedRuleIdList,
      disjointRuleSets: AutomatedReasoningPolicyDisjointRuleSetList,
    }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyDefinitionQualityReport",
  }) as any as S.Schema<AutomatedReasoningPolicyDefinitionQualityReport>;
export type AutomatedReasoningPolicyAnnotationStatus =
  | "APPLIED"
  | "FAILED"
  | (string & {});
export const AutomatedReasoningPolicyAnnotationStatus = /*@__PURE__*/ S.String;

export interface AutomatedReasoningPolicyPlanning {}
export const AutomatedReasoningPolicyPlanning = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AutomatedReasoningPolicyPlanning",
}) as any as S.Schema<AutomatedReasoningPolicyPlanning>;
export interface AutomatedReasoningPolicyAddTypeMutation {
  type: AutomatedReasoningPolicyDefinitionType;
}
export const AutomatedReasoningPolicyAddTypeMutation = /*@__PURE__*/ S.suspend(
  () => S.Struct({ type: AutomatedReasoningPolicyDefinitionType }),
).annotate({
  identifier: "AutomatedReasoningPolicyAddTypeMutation",
}) as any as S.Schema<AutomatedReasoningPolicyAddTypeMutation>;
export interface AutomatedReasoningPolicyUpdateTypeMutation {
  type: AutomatedReasoningPolicyDefinitionType;
}
export const AutomatedReasoningPolicyUpdateTypeMutation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ type: AutomatedReasoningPolicyDefinitionType }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyUpdateTypeMutation",
  }) as any as S.Schema<AutomatedReasoningPolicyUpdateTypeMutation>;
export interface AutomatedReasoningPolicyDeleteTypeMutation {
  name: string | redacted.Redacted<string>;
}
export const AutomatedReasoningPolicyDeleteTypeMutation =
  /*@__PURE__*/ S.suspend(() => S.Struct({ name: SensitiveString })).annotate({
    identifier: "AutomatedReasoningPolicyDeleteTypeMutation",
  }) as any as S.Schema<AutomatedReasoningPolicyDeleteTypeMutation>;
export interface AutomatedReasoningPolicyAddVariableMutation {
  variable: AutomatedReasoningPolicyDefinitionVariable;
}
export const AutomatedReasoningPolicyAddVariableMutation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ variable: AutomatedReasoningPolicyDefinitionVariable }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyAddVariableMutation",
  }) as any as S.Schema<AutomatedReasoningPolicyAddVariableMutation>;
export interface AutomatedReasoningPolicyUpdateVariableMutation {
  variable: AutomatedReasoningPolicyDefinitionVariable;
}
export const AutomatedReasoningPolicyUpdateVariableMutation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ variable: AutomatedReasoningPolicyDefinitionVariable }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyUpdateVariableMutation",
  }) as any as S.Schema<AutomatedReasoningPolicyUpdateVariableMutation>;
export interface AutomatedReasoningPolicyDeleteVariableMutation {
  name: string | redacted.Redacted<string>;
}
export const AutomatedReasoningPolicyDeleteVariableMutation =
  /*@__PURE__*/ S.suspend(() => S.Struct({ name: SensitiveString })).annotate({
    identifier: "AutomatedReasoningPolicyDeleteVariableMutation",
  }) as any as S.Schema<AutomatedReasoningPolicyDeleteVariableMutation>;
export interface AutomatedReasoningPolicyAddRuleMutation {
  rule: AutomatedReasoningPolicyDefinitionRule;
}
export const AutomatedReasoningPolicyAddRuleMutation = /*@__PURE__*/ S.suspend(
  () => S.Struct({ rule: AutomatedReasoningPolicyDefinitionRule }),
).annotate({
  identifier: "AutomatedReasoningPolicyAddRuleMutation",
}) as any as S.Schema<AutomatedReasoningPolicyAddRuleMutation>;
export interface AutomatedReasoningPolicyUpdateRuleMutation {
  rule: AutomatedReasoningPolicyDefinitionRule;
}
export const AutomatedReasoningPolicyUpdateRuleMutation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ rule: AutomatedReasoningPolicyDefinitionRule }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyUpdateRuleMutation",
  }) as any as S.Schema<AutomatedReasoningPolicyUpdateRuleMutation>;
export interface AutomatedReasoningPolicyDeleteRuleMutation {
  id: string;
}
export const AutomatedReasoningPolicyDeleteRuleMutation =
  /*@__PURE__*/ S.suspend(() => S.Struct({ id: S.String })).annotate({
    identifier: "AutomatedReasoningPolicyDeleteRuleMutation",
  }) as any as S.Schema<AutomatedReasoningPolicyDeleteRuleMutation>;
export type AutomatedReasoningPolicyMutation =
  | {
      addType: AutomatedReasoningPolicyAddTypeMutation;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
    }
  | {
      addType?: never;
      updateType: AutomatedReasoningPolicyUpdateTypeMutation;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType: AutomatedReasoningPolicyDeleteTypeMutation;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable: AutomatedReasoningPolicyAddVariableMutation;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable: AutomatedReasoningPolicyUpdateVariableMutation;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable: AutomatedReasoningPolicyDeleteVariableMutation;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule: AutomatedReasoningPolicyAddRuleMutation;
      updateRule?: never;
      deleteRule?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule: AutomatedReasoningPolicyUpdateRuleMutation;
      deleteRule?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule: AutomatedReasoningPolicyDeleteRuleMutation;
    };
export const AutomatedReasoningPolicyMutation = /*@__PURE__*/ S.Union([
  S.Struct({ addType: AutomatedReasoningPolicyAddTypeMutation }),
  S.Struct({ updateType: AutomatedReasoningPolicyUpdateTypeMutation }),
  S.Struct({ deleteType: AutomatedReasoningPolicyDeleteTypeMutation }),
  S.Struct({ addVariable: AutomatedReasoningPolicyAddVariableMutation }),
  S.Struct({ updateVariable: AutomatedReasoningPolicyUpdateVariableMutation }),
  S.Struct({ deleteVariable: AutomatedReasoningPolicyDeleteVariableMutation }),
  S.Struct({ addRule: AutomatedReasoningPolicyAddRuleMutation }),
  S.Struct({ updateRule: AutomatedReasoningPolicyUpdateRuleMutation }),
  S.Struct({ deleteRule: AutomatedReasoningPolicyDeleteRuleMutation }),
]);
export type AutomatedReasoningPolicyBuildStepContext =
  | { planning: AutomatedReasoningPolicyPlanning; mutation?: never }
  | { planning?: never; mutation: AutomatedReasoningPolicyMutation };
export const AutomatedReasoningPolicyBuildStepContext = /*@__PURE__*/ S.Union([
  S.Struct({ planning: AutomatedReasoningPolicyPlanning }),
  S.Struct({ mutation: AutomatedReasoningPolicyMutation }),
]);
export type AutomatedReasoningPolicyDefinitionElement =
  | {
      policyDefinitionVariable: AutomatedReasoningPolicyDefinitionVariable;
      policyDefinitionType?: never;
      policyDefinitionRule?: never;
    }
  | {
      policyDefinitionVariable?: never;
      policyDefinitionType: AutomatedReasoningPolicyDefinitionType;
      policyDefinitionRule?: never;
    }
  | {
      policyDefinitionVariable?: never;
      policyDefinitionType?: never;
      policyDefinitionRule: AutomatedReasoningPolicyDefinitionRule;
    };
export const AutomatedReasoningPolicyDefinitionElement = /*@__PURE__*/ S.Union([
  S.Struct({
    policyDefinitionVariable: AutomatedReasoningPolicyDefinitionVariable,
  }),
  S.Struct({ policyDefinitionType: AutomatedReasoningPolicyDefinitionType }),
  S.Struct({ policyDefinitionRule: AutomatedReasoningPolicyDefinitionRule }),
]);
export type AutomatedReasoningPolicyBuildMessageType =
  | "INFO"
  | "WARNING"
  | "ERROR"
  | (string & {});
export const AutomatedReasoningPolicyBuildMessageType = /*@__PURE__*/ S.String;

export interface AutomatedReasoningPolicyBuildStepMessage {
  message: string;
  messageType: AutomatedReasoningPolicyBuildMessageType;
}
export const AutomatedReasoningPolicyBuildStepMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      message: S.String,
      messageType: AutomatedReasoningPolicyBuildMessageType,
    }),
).annotate({
  identifier: "AutomatedReasoningPolicyBuildStepMessage",
}) as any as S.Schema<AutomatedReasoningPolicyBuildStepMessage>;
export type AutomatedReasoningPolicyBuildStepMessageList =
  AutomatedReasoningPolicyBuildStepMessage[];
export const AutomatedReasoningPolicyBuildStepMessageList =
  /*@__PURE__*/ S.Array(AutomatedReasoningPolicyBuildStepMessage);
export interface AutomatedReasoningPolicyBuildStep {
  context: AutomatedReasoningPolicyBuildStepContext;
  priorElement?: AutomatedReasoningPolicyDefinitionElement;
  messages: AutomatedReasoningPolicyBuildStepMessage[];
}
export const AutomatedReasoningPolicyBuildStep = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    context: AutomatedReasoningPolicyBuildStepContext,
    priorElement: S.optional(AutomatedReasoningPolicyDefinitionElement),
    messages: AutomatedReasoningPolicyBuildStepMessageList,
  }),
).annotate({
  identifier: "AutomatedReasoningPolicyBuildStep",
}) as any as S.Schema<AutomatedReasoningPolicyBuildStep>;
export type AutomatedReasoningPolicyBuildStepList =
  AutomatedReasoningPolicyBuildStep[];
export const AutomatedReasoningPolicyBuildStepList = /*@__PURE__*/ S.Array(
  AutomatedReasoningPolicyBuildStep,
);
export interface AutomatedReasoningPolicyBuildLogEntry {
  annotation: AutomatedReasoningPolicyAnnotation;
  status: AutomatedReasoningPolicyAnnotationStatus;
  buildSteps: AutomatedReasoningPolicyBuildStep[];
}
export const AutomatedReasoningPolicyBuildLogEntry = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      annotation: AutomatedReasoningPolicyAnnotation,
      status: AutomatedReasoningPolicyAnnotationStatus,
      buildSteps: AutomatedReasoningPolicyBuildStepList,
    }),
).annotate({
  identifier: "AutomatedReasoningPolicyBuildLogEntry",
}) as any as S.Schema<AutomatedReasoningPolicyBuildLogEntry>;
export type AutomatedReasoningPolicyBuildLogEntryList =
  AutomatedReasoningPolicyBuildLogEntry[];
export const AutomatedReasoningPolicyBuildLogEntryList = /*@__PURE__*/ S.Array(
  AutomatedReasoningPolicyBuildLogEntry,
);
export interface AutomatedReasoningPolicyBuildLog {
  entries: AutomatedReasoningPolicyBuildLogEntry[];
}
export const AutomatedReasoningPolicyBuildLog = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ entries: AutomatedReasoningPolicyBuildLogEntryList }),
).annotate({
  identifier: "AutomatedReasoningPolicyBuildLog",
}) as any as S.Schema<AutomatedReasoningPolicyBuildLog>;
export interface AutomatedReasoningPolicyGeneratedTestCase {
  queryContent: string | redacted.Redacted<string>;
  guardContent: string | redacted.Redacted<string>;
  expectedAggregatedFindingsResult: AutomatedReasoningCheckResult;
}
export const AutomatedReasoningPolicyGeneratedTestCase =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      queryContent: SensitiveString,
      guardContent: SensitiveString,
      expectedAggregatedFindingsResult: AutomatedReasoningCheckResult,
    }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyGeneratedTestCase",
  }) as any as S.Schema<AutomatedReasoningPolicyGeneratedTestCase>;
export type AutomatedReasoningPolicyGeneratedTestCaseList =
  AutomatedReasoningPolicyGeneratedTestCase[];
export const AutomatedReasoningPolicyGeneratedTestCaseList =
  /*@__PURE__*/ S.Array(AutomatedReasoningPolicyGeneratedTestCase);
export interface AutomatedReasoningPolicyGeneratedTestCases {
  generatedTestCases: AutomatedReasoningPolicyGeneratedTestCase[];
}
export const AutomatedReasoningPolicyGeneratedTestCases =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      generatedTestCases: AutomatedReasoningPolicyGeneratedTestCaseList,
    }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyGeneratedTestCases",
  }) as any as S.Schema<AutomatedReasoningPolicyGeneratedTestCases>;
export type AutomatedReasoningPolicyScenarioAlternateExpression =
  | string
  | redacted.Redacted<string>;
export interface AutomatedReasoningPolicyScenario {
  expression: string | redacted.Redacted<string>;
  alternateExpression: string | redacted.Redacted<string>;
  expectedResult: AutomatedReasoningCheckResult;
  ruleIds: string[];
}
export const AutomatedReasoningPolicyScenario = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    expression: SensitiveString,
    alternateExpression: SensitiveString,
    expectedResult: AutomatedReasoningCheckResult,
    ruleIds: AutomatedReasoningPolicyDefinitionRuleIdList,
  }),
).annotate({
  identifier: "AutomatedReasoningPolicyScenario",
}) as any as S.Schema<AutomatedReasoningPolicyScenario>;
export type AutomatedReasoningPolicyScenarioList =
  AutomatedReasoningPolicyScenario[];
export const AutomatedReasoningPolicyScenarioList = /*@__PURE__*/ S.Array(
  AutomatedReasoningPolicyScenario,
);
export interface AutomatedReasoningPolicyScenarios {
  policyScenarios: AutomatedReasoningPolicyScenario[];
}
export const AutomatedReasoningPolicyScenarios = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyScenarios: AutomatedReasoningPolicyScenarioList }),
).annotate({
  identifier: "AutomatedReasoningPolicyScenarios",
}) as any as S.Schema<AutomatedReasoningPolicyScenarios>;
export type AutomatedReasoningPolicyBuildResultAssetName =
  | string
  | redacted.Redacted<string>;
export interface AutomatedReasoningPolicyBuildResultAssetManifestEntry {
  assetType: AutomatedReasoningPolicyBuildResultAssetType;
  assetName?: string | redacted.Redacted<string>;
  assetId?: string;
}
export const AutomatedReasoningPolicyBuildResultAssetManifestEntry =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      assetType: AutomatedReasoningPolicyBuildResultAssetType,
      assetName: S.optional(SensitiveString),
      assetId: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyBuildResultAssetManifestEntry",
  }) as any as S.Schema<AutomatedReasoningPolicyBuildResultAssetManifestEntry>;
export type AutomatedReasoningPolicyBuildResultAssetManifestList =
  AutomatedReasoningPolicyBuildResultAssetManifestEntry[];
export const AutomatedReasoningPolicyBuildResultAssetManifestList =
  /*@__PURE__*/ S.Array(AutomatedReasoningPolicyBuildResultAssetManifestEntry);
export interface AutomatedReasoningPolicyBuildResultAssetManifest {
  entries: AutomatedReasoningPolicyBuildResultAssetManifestEntry[];
}
export const AutomatedReasoningPolicyBuildResultAssetManifest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ entries: AutomatedReasoningPolicyBuildResultAssetManifestList }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyBuildResultAssetManifest",
  }) as any as S.Schema<AutomatedReasoningPolicyBuildResultAssetManifest>;
export type AutomatedReasoningPolicyBuildDocumentBlob =
  | Uint8Array
  | redacted.Redacted<Uint8Array>;
export type AutomatedReasoningPolicyDocumentSha256 = string;
export interface AutomatedReasoningPolicySourceDocument {
  document: Uint8Array | redacted.Redacted<Uint8Array>;
  documentContentType: AutomatedReasoningPolicyBuildDocumentContentType;
  documentName: string | redacted.Redacted<string>;
  documentDescription?: string | redacted.Redacted<string>;
  documentHash: string;
}
export const AutomatedReasoningPolicySourceDocument = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      document: SensitiveBlob,
      documentContentType: AutomatedReasoningPolicyBuildDocumentContentType,
      documentName: SensitiveString,
      documentDescription: S.optional(SensitiveString),
      documentHash: S.String,
    }),
).annotate({
  identifier: "AutomatedReasoningPolicySourceDocument",
}) as any as S.Schema<AutomatedReasoningPolicySourceDocument>;
export type AutomatedReasoningPolicyCoverageScore = number;
export type AutomatedReasoningPolicyAccuracyScore = number;
export type AutomatedReasoningPolicyDocumentId = string;
export type AutomatedReasoningPolicyStatementId = string;
export interface AutomatedReasoningPolicyStatementReference {
  documentId: string;
  statementId: string;
}
export const AutomatedReasoningPolicyStatementReference =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ documentId: S.String, statementId: S.String }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyStatementReference",
  }) as any as S.Schema<AutomatedReasoningPolicyStatementReference>;
export type AutomatedReasoningPolicyStatementReferenceList =
  AutomatedReasoningPolicyStatementReference[];
export const AutomatedReasoningPolicyStatementReferenceList =
  /*@__PURE__*/ S.Array(AutomatedReasoningPolicyStatementReference);
export type AutomatedReasoningPolicyJustificationText =
  | string
  | redacted.Redacted<string>;
export type AutomatedReasoningPolicyJustificationList = (
  | string
  | redacted.Redacted<string>
)[];
export const AutomatedReasoningPolicyJustificationList =
  /*@__PURE__*/ S.Array(SensitiveString);
export interface AutomatedReasoningPolicyRuleReport {
  rule: string;
  groundingStatements?: AutomatedReasoningPolicyStatementReference[];
  groundingJustifications?: (string | redacted.Redacted<string>)[];
  accuracyScore?: number;
  accuracyJustification?: string | redacted.Redacted<string>;
}
export const AutomatedReasoningPolicyRuleReport = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    rule: S.String,
    groundingStatements: S.optional(
      AutomatedReasoningPolicyStatementReferenceList,
    ),
    groundingJustifications: S.optional(
      AutomatedReasoningPolicyJustificationList,
    ),
    accuracyScore: S.optional(S.Number),
    accuracyJustification: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "AutomatedReasoningPolicyRuleReport",
}) as any as S.Schema<AutomatedReasoningPolicyRuleReport>;
export type AutomatedReasoningPolicyRuleReportMap = {
  [key: string]: AutomatedReasoningPolicyRuleReport | undefined;
};
export const AutomatedReasoningPolicyRuleReportMap = /*@__PURE__*/ S.Record(
  S.String,
  AutomatedReasoningPolicyRuleReport.pipe(S.optional),
);
export interface AutomatedReasoningPolicyVariableReport {
  policyVariable: string | redacted.Redacted<string>;
  groundingStatements?: AutomatedReasoningPolicyStatementReference[];
  groundingJustifications?: (string | redacted.Redacted<string>)[];
  accuracyScore?: number;
  accuracyJustification?: string | redacted.Redacted<string>;
}
export const AutomatedReasoningPolicyVariableReport = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      policyVariable: SensitiveString,
      groundingStatements: S.optional(
        AutomatedReasoningPolicyStatementReferenceList,
      ),
      groundingJustifications: S.optional(
        AutomatedReasoningPolicyJustificationList,
      ),
      accuracyScore: S.optional(S.Number),
      accuracyJustification: S.optional(SensitiveString),
    }),
).annotate({
  identifier: "AutomatedReasoningPolicyVariableReport",
}) as any as S.Schema<AutomatedReasoningPolicyVariableReport>;
export type AutomatedReasoningPolicyVariableReportMap = {
  [key: string]: AutomatedReasoningPolicyVariableReport | undefined;
};
export const AutomatedReasoningPolicyVariableReportMap = /*@__PURE__*/ S.Record(
  S.String,
  AutomatedReasoningPolicyVariableReport.pipe(S.optional),
);
export type AutomatedReasoningPolicyStatementText =
  | string
  | redacted.Redacted<string>;
export type AutomatedReasoningPolicyLineNumberList = number[];
export const AutomatedReasoningPolicyLineNumberList = /*@__PURE__*/ S.Array(
  S.Number,
);
export interface AutomatedReasoningPolicyStatementLocation {
  lines: number[];
}
export const AutomatedReasoningPolicyStatementLocation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ lines: AutomatedReasoningPolicyLineNumberList }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyStatementLocation",
  }) as any as S.Schema<AutomatedReasoningPolicyStatementLocation>;
export interface AutomatedReasoningPolicyAtomicStatement {
  id: string;
  text: string | redacted.Redacted<string>;
  location: AutomatedReasoningPolicyStatementLocation;
}
export const AutomatedReasoningPolicyAtomicStatement = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      id: S.String,
      text: SensitiveString,
      location: AutomatedReasoningPolicyStatementLocation,
    }),
).annotate({
  identifier: "AutomatedReasoningPolicyAtomicStatement",
}) as any as S.Schema<AutomatedReasoningPolicyAtomicStatement>;
export type AutomatedReasoningPolicyAtomicStatementList =
  AutomatedReasoningPolicyAtomicStatement[];
export const AutomatedReasoningPolicyAtomicStatementList =
  /*@__PURE__*/ S.Array(AutomatedReasoningPolicyAtomicStatement);
export type AutomatedReasoningPolicyLineText =
  | string
  | redacted.Redacted<string>;
export interface AutomatedReasoningPolicyAnnotatedLine {
  lineNumber?: number;
  lineText?: string | redacted.Redacted<string>;
}
export const AutomatedReasoningPolicyAnnotatedLine = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      lineNumber: S.optional(S.Number),
      lineText: S.optional(SensitiveString),
    }),
).annotate({
  identifier: "AutomatedReasoningPolicyAnnotatedLine",
}) as any as S.Schema<AutomatedReasoningPolicyAnnotatedLine>;
export type AutomatedReasoningPolicyAnnotatedContent = {
  line: AutomatedReasoningPolicyAnnotatedLine;
};
export const AutomatedReasoningPolicyAnnotatedContent = /*@__PURE__*/ S.Union([
  S.Struct({ line: AutomatedReasoningPolicyAnnotatedLine }),
]);
export type AutomatedReasoningPolicyAnnotatedContentList =
  AutomatedReasoningPolicyAnnotatedContent[];
export const AutomatedReasoningPolicyAnnotatedContentList =
  /*@__PURE__*/ S.Array(AutomatedReasoningPolicyAnnotatedContent);
export interface AutomatedReasoningPolicyAnnotatedChunk {
  pageNumber?: number;
  content: AutomatedReasoningPolicyAnnotatedContent[];
}
export const AutomatedReasoningPolicyAnnotatedChunk = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      pageNumber: S.optional(S.Number),
      content: AutomatedReasoningPolicyAnnotatedContentList,
    }),
).annotate({
  identifier: "AutomatedReasoningPolicyAnnotatedChunk",
}) as any as S.Schema<AutomatedReasoningPolicyAnnotatedChunk>;
export type AutomatedReasoningPolicyAnnotatedChunkList =
  AutomatedReasoningPolicyAnnotatedChunk[];
export const AutomatedReasoningPolicyAnnotatedChunkList = /*@__PURE__*/ S.Array(
  AutomatedReasoningPolicyAnnotatedChunk,
);
export interface AutomatedReasoningPolicyReportSourceDocument {
  documentName: string | redacted.Redacted<string>;
  documentHash: string;
  documentId: string;
  atomicStatements: AutomatedReasoningPolicyAtomicStatement[];
  documentContent: AutomatedReasoningPolicyAnnotatedChunk[];
}
export const AutomatedReasoningPolicyReportSourceDocument =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      documentName: SensitiveString,
      documentHash: S.String,
      documentId: S.String,
      atomicStatements: AutomatedReasoningPolicyAtomicStatementList,
      documentContent: AutomatedReasoningPolicyAnnotatedChunkList,
    }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyReportSourceDocument",
  }) as any as S.Schema<AutomatedReasoningPolicyReportSourceDocument>;
export type AutomatedReasoningPolicyReportSourceDocumentList =
  AutomatedReasoningPolicyReportSourceDocument[];
export const AutomatedReasoningPolicyReportSourceDocumentList =
  /*@__PURE__*/ S.Array(AutomatedReasoningPolicyReportSourceDocument);
export interface AutomatedReasoningPolicyFidelityReport {
  coverageScore: number;
  accuracyScore: number;
  ruleReports: {
    [key: string]: AutomatedReasoningPolicyRuleReport | undefined;
  };
  variableReports: {
    [key: string]: AutomatedReasoningPolicyVariableReport | undefined;
  };
  documentSources: AutomatedReasoningPolicyReportSourceDocument[];
}
export const AutomatedReasoningPolicyFidelityReport = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      coverageScore: S.Number,
      accuracyScore: S.Number,
      ruleReports: AutomatedReasoningPolicyRuleReportMap,
      variableReports: AutomatedReasoningPolicyVariableReportMap,
      documentSources: AutomatedReasoningPolicyReportSourceDocumentList,
    }),
).annotate({
  identifier: "AutomatedReasoningPolicyFidelityReport",
}) as any as S.Schema<AutomatedReasoningPolicyFidelityReport>;
export type AutomatedReasoningPolicyBuildResultAssets =
  | {
      policyDefinition: AutomatedReasoningPolicyDefinition;
      qualityReport?: never;
      buildLog?: never;
      generatedTestCases?: never;
      policyScenarios?: never;
      assetManifest?: never;
      document?: never;
      fidelityReport?: never;
    }
  | {
      policyDefinition?: never;
      qualityReport: AutomatedReasoningPolicyDefinitionQualityReport;
      buildLog?: never;
      generatedTestCases?: never;
      policyScenarios?: never;
      assetManifest?: never;
      document?: never;
      fidelityReport?: never;
    }
  | {
      policyDefinition?: never;
      qualityReport?: never;
      buildLog: AutomatedReasoningPolicyBuildLog;
      generatedTestCases?: never;
      policyScenarios?: never;
      assetManifest?: never;
      document?: never;
      fidelityReport?: never;
    }
  | {
      policyDefinition?: never;
      qualityReport?: never;
      buildLog?: never;
      generatedTestCases: AutomatedReasoningPolicyGeneratedTestCases;
      policyScenarios?: never;
      assetManifest?: never;
      document?: never;
      fidelityReport?: never;
    }
  | {
      policyDefinition?: never;
      qualityReport?: never;
      buildLog?: never;
      generatedTestCases?: never;
      policyScenarios: AutomatedReasoningPolicyScenarios;
      assetManifest?: never;
      document?: never;
      fidelityReport?: never;
    }
  | {
      policyDefinition?: never;
      qualityReport?: never;
      buildLog?: never;
      generatedTestCases?: never;
      policyScenarios?: never;
      assetManifest: AutomatedReasoningPolicyBuildResultAssetManifest;
      document?: never;
      fidelityReport?: never;
    }
  | {
      policyDefinition?: never;
      qualityReport?: never;
      buildLog?: never;
      generatedTestCases?: never;
      policyScenarios?: never;
      assetManifest?: never;
      document: AutomatedReasoningPolicySourceDocument;
      fidelityReport?: never;
    }
  | {
      policyDefinition?: never;
      qualityReport?: never;
      buildLog?: never;
      generatedTestCases?: never;
      policyScenarios?: never;
      assetManifest?: never;
      document?: never;
      fidelityReport: AutomatedReasoningPolicyFidelityReport;
    };
export const AutomatedReasoningPolicyBuildResultAssets = /*@__PURE__*/ S.Union([
  S.Struct({ policyDefinition: AutomatedReasoningPolicyDefinition }),
  S.Struct({ qualityReport: AutomatedReasoningPolicyDefinitionQualityReport }),
  S.Struct({ buildLog: AutomatedReasoningPolicyBuildLog }),
  S.Struct({ generatedTestCases: AutomatedReasoningPolicyGeneratedTestCases }),
  S.Struct({ policyScenarios: AutomatedReasoningPolicyScenarios }),
  S.Struct({ assetManifest: AutomatedReasoningPolicyBuildResultAssetManifest }),
  S.Struct({ document: AutomatedReasoningPolicySourceDocument }),
  S.Struct({ fidelityReport: AutomatedReasoningPolicyFidelityReport }),
]);
export interface GetAutomatedReasoningPolicyBuildWorkflowResultAssetsResponse {
  policyArn: string;
  buildWorkflowId: string;
  buildWorkflowAssets?: AutomatedReasoningPolicyBuildResultAssets;
}
export const GetAutomatedReasoningPolicyBuildWorkflowResultAssetsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyArn: S.String,
      buildWorkflowId: S.String,
      buildWorkflowAssets: S.optional(
        AutomatedReasoningPolicyBuildResultAssets,
      ),
    }),
  ).annotate({
    identifier: "GetAutomatedReasoningPolicyBuildWorkflowResultAssetsResponse",
  }) as any as S.Schema<GetAutomatedReasoningPolicyBuildWorkflowResultAssetsResponse>;
export interface GetAutomatedReasoningPolicyNextScenarioRequest {
  policyArn: string;
  buildWorkflowId: string;
}
export const GetAutomatedReasoningPolicyNextScenarioRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyArn: S.String.pipe(T.HttpLabel("policyArn")),
      buildWorkflowId: S.String.pipe(T.HttpLabel("buildWorkflowId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}/scenarios",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetAutomatedReasoningPolicyNextScenarioRequest",
  }) as any as S.Schema<GetAutomatedReasoningPolicyNextScenarioRequest>;
export interface GetAutomatedReasoningPolicyNextScenarioResponse {
  policyArn: string;
  scenario?: AutomatedReasoningPolicyScenario;
}
export const GetAutomatedReasoningPolicyNextScenarioResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyArn: S.String,
      scenario: S.optional(AutomatedReasoningPolicyScenario),
    }),
  ).annotate({
    identifier: "GetAutomatedReasoningPolicyNextScenarioResponse",
  }) as any as S.Schema<GetAutomatedReasoningPolicyNextScenarioResponse>;
export interface GetAutomatedReasoningPolicyTestCaseRequest {
  policyArn: string;
  testCaseId: string;
}
export const GetAutomatedReasoningPolicyTestCaseRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyArn: S.String.pipe(T.HttpLabel("policyArn")),
      testCaseId: S.String.pipe(T.HttpLabel("testCaseId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/automated-reasoning-policies/{policyArn}/test-cases/{testCaseId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetAutomatedReasoningPolicyTestCaseRequest",
  }) as any as S.Schema<GetAutomatedReasoningPolicyTestCaseRequest>;
export interface AutomatedReasoningPolicyTestCase {
  testCaseId: string;
  guardContent: string | redacted.Redacted<string>;
  queryContent?: string | redacted.Redacted<string>;
  expectedAggregatedFindingsResult?: AutomatedReasoningCheckResult;
  createdAt: Date;
  updatedAt: Date;
  confidenceThreshold?: number;
}
export const AutomatedReasoningPolicyTestCase = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testCaseId: S.String,
    guardContent: SensitiveString,
    queryContent: S.optional(SensitiveString),
    expectedAggregatedFindingsResult: S.optional(AutomatedReasoningCheckResult),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    confidenceThreshold: S.optional(S.Number),
  }),
).annotate({
  identifier: "AutomatedReasoningPolicyTestCase",
}) as any as S.Schema<AutomatedReasoningPolicyTestCase>;
export interface GetAutomatedReasoningPolicyTestCaseResponse {
  policyArn: string;
  testCase: AutomatedReasoningPolicyTestCase;
}
export const GetAutomatedReasoningPolicyTestCaseResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyArn: S.String,
      testCase: AutomatedReasoningPolicyTestCase,
    }),
  ).annotate({
    identifier: "GetAutomatedReasoningPolicyTestCaseResponse",
  }) as any as S.Schema<GetAutomatedReasoningPolicyTestCaseResponse>;
export interface GetAutomatedReasoningPolicyTestResultRequest {
  policyArn: string;
  buildWorkflowId: string;
  testCaseId: string;
}
export const GetAutomatedReasoningPolicyTestResultRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyArn: S.String.pipe(T.HttpLabel("policyArn")),
      buildWorkflowId: S.String.pipe(T.HttpLabel("buildWorkflowId")),
      testCaseId: S.String.pipe(T.HttpLabel("testCaseId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}/test-cases/{testCaseId}/test-results",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetAutomatedReasoningPolicyTestResultRequest",
  }) as any as S.Schema<GetAutomatedReasoningPolicyTestResultRequest>;
export type AutomatedReasoningPolicyTestRunStatus =
  | "NOT_STARTED"
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export const AutomatedReasoningPolicyTestRunStatus = /*@__PURE__*/ S.String;

export type AutomatedReasoningLogicStatementContent =
  | string
  | redacted.Redacted<string>;
export type AutomatedReasoningNaturalLanguageStatementContent =
  | string
  | redacted.Redacted<string>;
export interface AutomatedReasoningLogicStatement {
  logic: string | redacted.Redacted<string>;
  naturalLanguage?: string | redacted.Redacted<string>;
}
export const AutomatedReasoningLogicStatement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    logic: SensitiveString,
    naturalLanguage: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "AutomatedReasoningLogicStatement",
}) as any as S.Schema<AutomatedReasoningLogicStatement>;
export type AutomatedReasoningLogicStatementList =
  AutomatedReasoningLogicStatement[];
export const AutomatedReasoningLogicStatementList = /*@__PURE__*/ S.Array(
  AutomatedReasoningLogicStatement,
);
export interface AutomatedReasoningCheckInputTextReference {
  text?: string | redacted.Redacted<string>;
}
export const AutomatedReasoningCheckInputTextReference =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ text: S.optional(SensitiveString) }),
  ).annotate({
    identifier: "AutomatedReasoningCheckInputTextReference",
  }) as any as S.Schema<AutomatedReasoningCheckInputTextReference>;
export type AutomatedReasoningCheckInputTextReferenceList =
  AutomatedReasoningCheckInputTextReference[];
export const AutomatedReasoningCheckInputTextReferenceList =
  /*@__PURE__*/ S.Array(AutomatedReasoningCheckInputTextReference);
export interface AutomatedReasoningCheckTranslation {
  premises?: AutomatedReasoningLogicStatement[];
  claims: AutomatedReasoningLogicStatement[];
  untranslatedPremises?: AutomatedReasoningCheckInputTextReference[];
  untranslatedClaims?: AutomatedReasoningCheckInputTextReference[];
  confidence: number;
}
export const AutomatedReasoningCheckTranslation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    premises: S.optional(AutomatedReasoningLogicStatementList),
    claims: AutomatedReasoningLogicStatementList,
    untranslatedPremises: S.optional(
      AutomatedReasoningCheckInputTextReferenceList,
    ),
    untranslatedClaims: S.optional(
      AutomatedReasoningCheckInputTextReferenceList,
    ),
    confidence: S.Number,
  }),
).annotate({
  identifier: "AutomatedReasoningCheckTranslation",
}) as any as S.Schema<AutomatedReasoningCheckTranslation>;
export interface AutomatedReasoningCheckScenario {
  statements?: AutomatedReasoningLogicStatement[];
}
export const AutomatedReasoningCheckScenario = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ statements: S.optional(AutomatedReasoningLogicStatementList) }),
).annotate({
  identifier: "AutomatedReasoningCheckScenario",
}) as any as S.Schema<AutomatedReasoningCheckScenario>;
export interface AutomatedReasoningCheckRule {
  id?: string;
  policyVersionArn?: string;
}
export const AutomatedReasoningCheckRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    policyVersionArn: S.optional(S.String),
  }),
).annotate({
  identifier: "AutomatedReasoningCheckRule",
}) as any as S.Schema<AutomatedReasoningCheckRule>;
export type AutomatedReasoningCheckRuleList = AutomatedReasoningCheckRule[];
export const AutomatedReasoningCheckRuleList = /*@__PURE__*/ S.Array(
  AutomatedReasoningCheckRule,
);
export type AutomatedReasoningCheckLogicWarningType =
  | "ALWAYS_TRUE"
  | "ALWAYS_FALSE"
  | (string & {});
export const AutomatedReasoningCheckLogicWarningType = /*@__PURE__*/ S.String;

export interface AutomatedReasoningCheckLogicWarning {
  type?: AutomatedReasoningCheckLogicWarningType;
  premises?: AutomatedReasoningLogicStatement[];
  claims?: AutomatedReasoningLogicStatement[];
}
export const AutomatedReasoningCheckLogicWarning = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(AutomatedReasoningCheckLogicWarningType),
    premises: S.optional(AutomatedReasoningLogicStatementList),
    claims: S.optional(AutomatedReasoningLogicStatementList),
  }),
).annotate({
  identifier: "AutomatedReasoningCheckLogicWarning",
}) as any as S.Schema<AutomatedReasoningCheckLogicWarning>;
export interface AutomatedReasoningCheckValidFinding {
  translation?: AutomatedReasoningCheckTranslation;
  claimsTrueScenario?: AutomatedReasoningCheckScenario;
  supportingRules?: AutomatedReasoningCheckRule[];
  logicWarning?: AutomatedReasoningCheckLogicWarning;
}
export const AutomatedReasoningCheckValidFinding = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    translation: S.optional(AutomatedReasoningCheckTranslation),
    claimsTrueScenario: S.optional(AutomatedReasoningCheckScenario),
    supportingRules: S.optional(AutomatedReasoningCheckRuleList),
    logicWarning: S.optional(AutomatedReasoningCheckLogicWarning),
  }),
).annotate({
  identifier: "AutomatedReasoningCheckValidFinding",
}) as any as S.Schema<AutomatedReasoningCheckValidFinding>;
export interface AutomatedReasoningCheckInvalidFinding {
  translation?: AutomatedReasoningCheckTranslation;
  contradictingRules?: AutomatedReasoningCheckRule[];
  logicWarning?: AutomatedReasoningCheckLogicWarning;
}
export const AutomatedReasoningCheckInvalidFinding = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      translation: S.optional(AutomatedReasoningCheckTranslation),
      contradictingRules: S.optional(AutomatedReasoningCheckRuleList),
      logicWarning: S.optional(AutomatedReasoningCheckLogicWarning),
    }),
).annotate({
  identifier: "AutomatedReasoningCheckInvalidFinding",
}) as any as S.Schema<AutomatedReasoningCheckInvalidFinding>;
export interface AutomatedReasoningCheckSatisfiableFinding {
  translation?: AutomatedReasoningCheckTranslation;
  claimsTrueScenario?: AutomatedReasoningCheckScenario;
  claimsFalseScenario?: AutomatedReasoningCheckScenario;
  logicWarning?: AutomatedReasoningCheckLogicWarning;
}
export const AutomatedReasoningCheckSatisfiableFinding =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      translation: S.optional(AutomatedReasoningCheckTranslation),
      claimsTrueScenario: S.optional(AutomatedReasoningCheckScenario),
      claimsFalseScenario: S.optional(AutomatedReasoningCheckScenario),
      logicWarning: S.optional(AutomatedReasoningCheckLogicWarning),
    }),
  ).annotate({
    identifier: "AutomatedReasoningCheckSatisfiableFinding",
  }) as any as S.Schema<AutomatedReasoningCheckSatisfiableFinding>;
export interface AutomatedReasoningCheckImpossibleFinding {
  translation?: AutomatedReasoningCheckTranslation;
  contradictingRules?: AutomatedReasoningCheckRule[];
  logicWarning?: AutomatedReasoningCheckLogicWarning;
}
export const AutomatedReasoningCheckImpossibleFinding = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      translation: S.optional(AutomatedReasoningCheckTranslation),
      contradictingRules: S.optional(AutomatedReasoningCheckRuleList),
      logicWarning: S.optional(AutomatedReasoningCheckLogicWarning),
    }),
).annotate({
  identifier: "AutomatedReasoningCheckImpossibleFinding",
}) as any as S.Schema<AutomatedReasoningCheckImpossibleFinding>;
export type AutomatedReasoningCheckTranslationList =
  AutomatedReasoningCheckTranslation[];
export const AutomatedReasoningCheckTranslationList = /*@__PURE__*/ S.Array(
  AutomatedReasoningCheckTranslation,
);
export interface AutomatedReasoningCheckTranslationOption {
  translations?: AutomatedReasoningCheckTranslation[];
}
export const AutomatedReasoningCheckTranslationOption = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      translations: S.optional(AutomatedReasoningCheckTranslationList),
    }),
).annotate({
  identifier: "AutomatedReasoningCheckTranslationOption",
}) as any as S.Schema<AutomatedReasoningCheckTranslationOption>;
export type AutomatedReasoningCheckTranslationOptionList =
  AutomatedReasoningCheckTranslationOption[];
export const AutomatedReasoningCheckTranslationOptionList =
  /*@__PURE__*/ S.Array(AutomatedReasoningCheckTranslationOption);
export type AutomatedReasoningCheckDifferenceScenarioList =
  AutomatedReasoningCheckScenario[];
export const AutomatedReasoningCheckDifferenceScenarioList =
  /*@__PURE__*/ S.Array(AutomatedReasoningCheckScenario);
export interface AutomatedReasoningCheckTranslationAmbiguousFinding {
  options?: AutomatedReasoningCheckTranslationOption[];
  differenceScenarios?: AutomatedReasoningCheckScenario[];
}
export const AutomatedReasoningCheckTranslationAmbiguousFinding =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      options: S.optional(AutomatedReasoningCheckTranslationOptionList),
      differenceScenarios: S.optional(
        AutomatedReasoningCheckDifferenceScenarioList,
      ),
    }),
  ).annotate({
    identifier: "AutomatedReasoningCheckTranslationAmbiguousFinding",
  }) as any as S.Schema<AutomatedReasoningCheckTranslationAmbiguousFinding>;
export interface AutomatedReasoningCheckTooComplexFinding {}
export const AutomatedReasoningCheckTooComplexFinding = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "AutomatedReasoningCheckTooComplexFinding",
}) as any as S.Schema<AutomatedReasoningCheckTooComplexFinding>;
export interface AutomatedReasoningCheckNoTranslationsFinding {}
export const AutomatedReasoningCheckNoTranslationsFinding =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "AutomatedReasoningCheckNoTranslationsFinding",
  }) as any as S.Schema<AutomatedReasoningCheckNoTranslationsFinding>;
export type AutomatedReasoningCheckFinding =
  | {
      valid: AutomatedReasoningCheckValidFinding;
      invalid?: never;
      satisfiable?: never;
      impossible?: never;
      translationAmbiguous?: never;
      tooComplex?: never;
      noTranslations?: never;
    }
  | {
      valid?: never;
      invalid: AutomatedReasoningCheckInvalidFinding;
      satisfiable?: never;
      impossible?: never;
      translationAmbiguous?: never;
      tooComplex?: never;
      noTranslations?: never;
    }
  | {
      valid?: never;
      invalid?: never;
      satisfiable: AutomatedReasoningCheckSatisfiableFinding;
      impossible?: never;
      translationAmbiguous?: never;
      tooComplex?: never;
      noTranslations?: never;
    }
  | {
      valid?: never;
      invalid?: never;
      satisfiable?: never;
      impossible: AutomatedReasoningCheckImpossibleFinding;
      translationAmbiguous?: never;
      tooComplex?: never;
      noTranslations?: never;
    }
  | {
      valid?: never;
      invalid?: never;
      satisfiable?: never;
      impossible?: never;
      translationAmbiguous: AutomatedReasoningCheckTranslationAmbiguousFinding;
      tooComplex?: never;
      noTranslations?: never;
    }
  | {
      valid?: never;
      invalid?: never;
      satisfiable?: never;
      impossible?: never;
      translationAmbiguous?: never;
      tooComplex: AutomatedReasoningCheckTooComplexFinding;
      noTranslations?: never;
    }
  | {
      valid?: never;
      invalid?: never;
      satisfiable?: never;
      impossible?: never;
      translationAmbiguous?: never;
      tooComplex?: never;
      noTranslations: AutomatedReasoningCheckNoTranslationsFinding;
    };
export const AutomatedReasoningCheckFinding = /*@__PURE__*/ S.Union([
  S.Struct({ valid: AutomatedReasoningCheckValidFinding }),
  S.Struct({ invalid: AutomatedReasoningCheckInvalidFinding }),
  S.Struct({ satisfiable: AutomatedReasoningCheckSatisfiableFinding }),
  S.Struct({ impossible: AutomatedReasoningCheckImpossibleFinding }),
  S.Struct({
    translationAmbiguous: AutomatedReasoningCheckTranslationAmbiguousFinding,
  }),
  S.Struct({ tooComplex: AutomatedReasoningCheckTooComplexFinding }),
  S.Struct({ noTranslations: AutomatedReasoningCheckNoTranslationsFinding }),
]);
export type AutomatedReasoningCheckFindingList =
  AutomatedReasoningCheckFinding[];
export const AutomatedReasoningCheckFindingList = /*@__PURE__*/ S.Array(
  AutomatedReasoningCheckFinding,
);
export type AutomatedReasoningPolicyTestRunResult =
  | "PASSED"
  | "FAILED"
  | (string & {});
export const AutomatedReasoningPolicyTestRunResult = /*@__PURE__*/ S.String;

export interface AutomatedReasoningPolicyTestResult {
  testCase: AutomatedReasoningPolicyTestCase;
  policyArn: string;
  testRunStatus: AutomatedReasoningPolicyTestRunStatus;
  testFindings?: AutomatedReasoningCheckFinding[];
  testRunResult?: AutomatedReasoningPolicyTestRunResult;
  aggregatedTestFindingsResult?: AutomatedReasoningCheckResult;
  updatedAt: Date;
}
export const AutomatedReasoningPolicyTestResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testCase: AutomatedReasoningPolicyTestCase,
    policyArn: S.String,
    testRunStatus: AutomatedReasoningPolicyTestRunStatus,
    testFindings: S.optional(AutomatedReasoningCheckFindingList),
    testRunResult: S.optional(AutomatedReasoningPolicyTestRunResult),
    aggregatedTestFindingsResult: S.optional(AutomatedReasoningCheckResult),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "AutomatedReasoningPolicyTestResult",
}) as any as S.Schema<AutomatedReasoningPolicyTestResult>;
export interface GetAutomatedReasoningPolicyTestResultResponse {
  testResult: AutomatedReasoningPolicyTestResult;
}
export const GetAutomatedReasoningPolicyTestResultResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ testResult: AutomatedReasoningPolicyTestResult }),
  ).annotate({
    identifier: "GetAutomatedReasoningPolicyTestResultResponse",
  }) as any as S.Schema<GetAutomatedReasoningPolicyTestResultResponse>;
export interface GetCustomModelRequest {
  modelIdentifier: string;
}
export const GetCustomModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelIdentifier: S.String.pipe(T.HttpLabel("modelIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/custom-models/{modelIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCustomModelRequest",
}) as any as S.Schema<GetCustomModelRequest>;
export type MetricFloat = number;
export interface TrainingMetrics {
  trainingLoss?: number;
}
export const TrainingMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ trainingLoss: S.optional(S.Number) }),
).annotate({
  identifier: "TrainingMetrics",
}) as any as S.Schema<TrainingMetrics>;
export interface ValidatorMetric {
  validationLoss?: number;
}
export const ValidatorMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ validationLoss: S.optional(S.Number) }),
).annotate({
  identifier: "ValidatorMetric",
}) as any as S.Schema<ValidatorMetric>;
export type ValidationMetrics = ValidatorMetric[];
export const ValidationMetrics = /*@__PURE__*/ S.Array(ValidatorMetric);
export type ModelStatus = "Active" | "Creating" | "Failed" | (string & {});
export const ModelStatus = /*@__PURE__*/ S.String;

export interface GetCustomModelResponse {
  modelArn: string;
  modelName: string;
  jobName?: string;
  jobArn?: string;
  baseModelArn?: string;
  customizationType?: CustomizationType;
  modelKmsKeyArn?: string;
  hyperParameters?: { [key: string]: string | undefined };
  trainingDataConfig?: TrainingDataConfig;
  validationDataConfig?: ValidationDataConfig;
  outputDataConfig?: OutputDataConfig;
  trainingMetrics?: TrainingMetrics;
  validationMetrics?: ValidatorMetric[];
  creationTime: Date;
  customizationConfig?: CustomizationConfig;
  modelStatus?: ModelStatus;
  failureMessage?: string;
}
export const GetCustomModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelArn: S.String,
    modelName: S.String,
    jobName: S.optional(S.String),
    jobArn: S.optional(S.String),
    baseModelArn: S.optional(S.String),
    customizationType: S.optional(CustomizationType),
    modelKmsKeyArn: S.optional(S.String),
    hyperParameters: S.optional(ModelCustomizationHyperParameters),
    trainingDataConfig: S.optional(TrainingDataConfig),
    validationDataConfig: S.optional(ValidationDataConfig),
    outputDataConfig: S.optional(OutputDataConfig),
    trainingMetrics: S.optional(TrainingMetrics),
    validationMetrics: S.optional(ValidationMetrics),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    customizationConfig: S.optional(CustomizationConfig),
    modelStatus: S.optional(ModelStatus),
    failureMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "GetCustomModelResponse",
}) as any as S.Schema<GetCustomModelResponse>;
export interface GetCustomModelDeploymentRequest {
  customModelDeploymentIdentifier: string;
}
export const GetCustomModelDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    customModelDeploymentIdentifier: S.String.pipe(
      T.HttpLabel("customModelDeploymentIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/model-customization/custom-model-deployments/{customModelDeploymentIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCustomModelDeploymentRequest",
}) as any as S.Schema<GetCustomModelDeploymentRequest>;
export type CustomModelDeploymentStatus =
  | "Creating"
  | "Active"
  | "Failed"
  | (string & {});
export const CustomModelDeploymentStatus = /*@__PURE__*/ S.String;

export type CustomModelDeploymentUpdateStatus =
  | "Updating"
  | "UpdateCompleted"
  | "UpdateFailed"
  | (string & {});
export const CustomModelDeploymentUpdateStatus = /*@__PURE__*/ S.String;

export interface CustomModelDeploymentUpdateDetails {
  modelArn: string;
  updateStatus: CustomModelDeploymentUpdateStatus;
}
export const CustomModelDeploymentUpdateDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelArn: S.String,
    updateStatus: CustomModelDeploymentUpdateStatus,
  }),
).annotate({
  identifier: "CustomModelDeploymentUpdateDetails",
}) as any as S.Schema<CustomModelDeploymentUpdateDetails>;
export interface GetCustomModelDeploymentResponse {
  customModelDeploymentArn: string;
  modelDeploymentName: string;
  modelArn: string;
  createdAt: Date;
  status: CustomModelDeploymentStatus;
  description?: string;
  updateDetails?: CustomModelDeploymentUpdateDetails;
  failureMessage?: string;
  lastUpdatedAt?: Date;
}
export const GetCustomModelDeploymentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    customModelDeploymentArn: S.String,
    modelDeploymentName: S.String,
    modelArn: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: CustomModelDeploymentStatus,
    description: S.optional(S.String),
    updateDetails: S.optional(CustomModelDeploymentUpdateDetails),
    failureMessage: S.optional(S.String),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetCustomModelDeploymentResponse",
}) as any as S.Schema<GetCustomModelDeploymentResponse>;
export interface GetEvaluationJobRequest {
  jobIdentifier: string | redacted.Redacted<string>;
}
export const GetEvaluationJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobIdentifier: SensitiveString.pipe(T.HttpLabel("jobIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/evaluation-jobs/{jobIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEvaluationJobRequest",
}) as any as S.Schema<GetEvaluationJobRequest>;
export type EvaluationJobType = "Human" | "Automated" | (string & {});
export const EvaluationJobType = /*@__PURE__*/ S.String;

export type ErrorMessages = string[];
export const ErrorMessages = /*@__PURE__*/ S.Array(S.String);
export interface GetEvaluationJobResponse {
  jobName: string;
  status: EvaluationJobStatus;
  jobArn: string;
  jobDescription?: string | redacted.Redacted<string>;
  roleArn: string;
  customerEncryptionKeyId?: string;
  jobType: EvaluationJobType;
  applicationType?: ApplicationType;
  evaluationConfig: EvaluationConfig;
  inferenceConfig: EvaluationInferenceConfig;
  outputDataConfig: EvaluationOutputDataConfig;
  creationTime: Date;
  lastModifiedTime?: Date;
  failureMessages?: string[];
}
export const GetEvaluationJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobName: S.String,
    status: EvaluationJobStatus,
    jobArn: S.String,
    jobDescription: S.optional(SensitiveString),
    roleArn: S.String,
    customerEncryptionKeyId: S.optional(S.String),
    jobType: EvaluationJobType,
    applicationType: S.optional(ApplicationType),
    evaluationConfig: EvaluationConfig,
    inferenceConfig: EvaluationInferenceConfig,
    outputDataConfig: EvaluationOutputDataConfig,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModifiedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    failureMessages: S.optional(ErrorMessages),
  }),
).annotate({
  identifier: "GetEvaluationJobResponse",
}) as any as S.Schema<GetEvaluationJobResponse>;
export type GetFoundationModelIdentifier = string;
export interface GetFoundationModelRequest {
  modelIdentifier: string;
}
export const GetFoundationModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelIdentifier: S.String.pipe(T.HttpLabel("modelIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/foundation-models/{modelIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFoundationModelRequest",
}) as any as S.Schema<GetFoundationModelRequest>;
export type FoundationModelArn = string;
export type BrandedName = string;
export type ModelModality = "TEXT" | "IMAGE" | "EMBEDDING" | (string & {});
export const ModelModality = /*@__PURE__*/ S.String;

export type ModelModalityList = ModelModality[];
export const ModelModalityList = /*@__PURE__*/ S.Array(ModelModality);
export type ModelCustomization =
  | "FINE_TUNING"
  | "CONTINUED_PRE_TRAINING"
  | "DISTILLATION"
  | (string & {});
export const ModelCustomization = /*@__PURE__*/ S.String;

export type ModelCustomizationList = ModelCustomization[];
export const ModelCustomizationList = /*@__PURE__*/ S.Array(ModelCustomization);
export type InferenceType = "ON_DEMAND" | "PROVISIONED" | (string & {});
export const InferenceType = /*@__PURE__*/ S.String;

export type InferenceTypeList = InferenceType[];
export const InferenceTypeList = /*@__PURE__*/ S.Array(InferenceType);
export type FoundationModelLifecycleStatus =
  | "ACTIVE"
  | "LEGACY"
  | (string & {});
export const FoundationModelLifecycleStatus = /*@__PURE__*/ S.String;

export interface FoundationModelLifecycle {
  status: FoundationModelLifecycleStatus;
  startOfLifeTime?: Date;
  endOfLifeTime?: Date;
  legacyTime?: Date;
  publicExtendedAccessTime?: Date;
}
export const FoundationModelLifecycle = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: FoundationModelLifecycleStatus,
    startOfLifeTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endOfLifeTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    legacyTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    publicExtendedAccessTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "FoundationModelLifecycle",
}) as any as S.Schema<FoundationModelLifecycle>;
export interface FoundationModelDetails {
  modelArn: string;
  modelId: string;
  modelName?: string;
  providerName?: string;
  inputModalities?: ModelModality[];
  outputModalities?: ModelModality[];
  responseStreamingSupported?: boolean;
  customizationsSupported?: ModelCustomization[];
  inferenceTypesSupported?: InferenceType[];
  modelLifecycle?: FoundationModelLifecycle;
}
export const FoundationModelDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelArn: S.String,
    modelId: S.String,
    modelName: S.optional(S.String),
    providerName: S.optional(S.String),
    inputModalities: S.optional(ModelModalityList),
    outputModalities: S.optional(ModelModalityList),
    responseStreamingSupported: S.optional(S.Boolean),
    customizationsSupported: S.optional(ModelCustomizationList),
    inferenceTypesSupported: S.optional(InferenceTypeList),
    modelLifecycle: S.optional(FoundationModelLifecycle),
  }),
).annotate({
  identifier: "FoundationModelDetails",
}) as any as S.Schema<FoundationModelDetails>;
export interface GetFoundationModelResponse {
  modelDetails?: FoundationModelDetails;
}
export const GetFoundationModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ modelDetails: S.optional(FoundationModelDetails) }),
).annotate({
  identifier: "GetFoundationModelResponse",
}) as any as S.Schema<GetFoundationModelResponse>;
export interface GetFoundationModelAvailabilityRequest {
  modelId: string;
}
export const GetFoundationModelAvailabilityRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ modelId: S.String.pipe(T.HttpLabel("modelId")) }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/foundation-model-availability/{modelId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetFoundationModelAvailabilityRequest",
}) as any as S.Schema<GetFoundationModelAvailabilityRequest>;
export type AgreementStatus =
  | "AVAILABLE"
  | "PENDING"
  | "NOT_AVAILABLE"
  | "ERROR"
  | (string & {});
export const AgreementStatus = /*@__PURE__*/ S.String;

export interface AgreementAvailability {
  status: AgreementStatus;
  errorMessage?: string;
}
export const AgreementAvailability = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: AgreementStatus, errorMessage: S.optional(S.String) }),
).annotate({
  identifier: "AgreementAvailability",
}) as any as S.Schema<AgreementAvailability>;
export type AuthorizationStatus =
  | "AUTHORIZED"
  | "NOT_AUTHORIZED"
  | (string & {});
export const AuthorizationStatus = /*@__PURE__*/ S.String;

export type EntitlementAvailability =
  | "AVAILABLE"
  | "NOT_AVAILABLE"
  | (string & {});
export const EntitlementAvailability = /*@__PURE__*/ S.String;

export type RegionAvailability = "AVAILABLE" | "NOT_AVAILABLE" | (string & {});
export const RegionAvailability = /*@__PURE__*/ S.String;

export interface GetFoundationModelAvailabilityResponse {
  modelId: string;
  agreementAvailability: AgreementAvailability;
  authorizationStatus: AuthorizationStatus;
  entitlementAvailability: EntitlementAvailability;
  regionAvailability: RegionAvailability;
}
export const GetFoundationModelAvailabilityResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      modelId: S.String,
      agreementAvailability: AgreementAvailability,
      authorizationStatus: AuthorizationStatus,
      entitlementAvailability: EntitlementAvailability,
      regionAvailability: RegionAvailability,
    }),
).annotate({
  identifier: "GetFoundationModelAvailabilityResponse",
}) as any as S.Schema<GetFoundationModelAvailabilityResponse>;
export type GuardrailVersion = string;
export interface GetGuardrailRequest {
  guardrailIdentifier: string;
  guardrailVersion?: string;
}
export const GetGuardrailRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    guardrailIdentifier: S.String.pipe(T.HttpLabel("guardrailIdentifier")),
    guardrailVersion: S.optional(S.String).pipe(
      T.HttpQuery("guardrailVersion"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/guardrails/{guardrailIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGuardrailRequest",
}) as any as S.Schema<GetGuardrailRequest>;
export type GuardrailStatus =
  | "CREATING"
  | "UPDATING"
  | "VERSIONING"
  | "READY"
  | "FAILED"
  | "DELETING"
  | (string & {});
export const GuardrailStatus = /*@__PURE__*/ S.String;

export interface GuardrailTopic {
  name: string | redacted.Redacted<string>;
  definition: string | redacted.Redacted<string>;
  examples?: (string | redacted.Redacted<string>)[];
  type?: GuardrailTopicType;
  inputAction?: GuardrailTopicAction;
  outputAction?: GuardrailTopicAction;
  inputEnabled?: boolean;
  outputEnabled?: boolean;
}
export const GuardrailTopic = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: SensitiveString,
    definition: SensitiveString,
    examples: S.optional(GuardrailTopicExamples),
    type: S.optional(GuardrailTopicType),
    inputAction: S.optional(GuardrailTopicAction),
    outputAction: S.optional(GuardrailTopicAction),
    inputEnabled: S.optional(S.Boolean),
    outputEnabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "GuardrailTopic" }) as any as S.Schema<GuardrailTopic>;
export type GuardrailTopics = GuardrailTopic[];
export const GuardrailTopics = /*@__PURE__*/ S.Array(GuardrailTopic);
export interface GuardrailTopicsTier {
  tierName: GuardrailTopicsTierName;
}
export const GuardrailTopicsTier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tierName: GuardrailTopicsTierName }),
).annotate({
  identifier: "GuardrailTopicsTier",
}) as any as S.Schema<GuardrailTopicsTier>;
export interface GuardrailTopicPolicy {
  topics: GuardrailTopic[];
  tier?: GuardrailTopicsTier;
}
export const GuardrailTopicPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ topics: GuardrailTopics, tier: S.optional(GuardrailTopicsTier) }),
).annotate({
  identifier: "GuardrailTopicPolicy",
}) as any as S.Schema<GuardrailTopicPolicy>;
export interface GuardrailContentFilter {
  type: GuardrailContentFilterType;
  inputStrength: GuardrailFilterStrength;
  outputStrength: GuardrailFilterStrength;
  inputModalities?: GuardrailModality[];
  outputModalities?: GuardrailModality[];
  inputAction?: GuardrailContentFilterAction;
  outputAction?: GuardrailContentFilterAction;
  inputEnabled?: boolean;
  outputEnabled?: boolean;
}
export const GuardrailContentFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: GuardrailContentFilterType,
    inputStrength: GuardrailFilterStrength,
    outputStrength: GuardrailFilterStrength,
    inputModalities: S.optional(GuardrailModalities),
    outputModalities: S.optional(GuardrailModalities),
    inputAction: S.optional(GuardrailContentFilterAction),
    outputAction: S.optional(GuardrailContentFilterAction),
    inputEnabled: S.optional(S.Boolean),
    outputEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GuardrailContentFilter",
}) as any as S.Schema<GuardrailContentFilter>;
export type GuardrailContentFilters = GuardrailContentFilter[];
export const GuardrailContentFilters = /*@__PURE__*/ S.Array(
  GuardrailContentFilter,
);
export interface GuardrailContentFiltersTier {
  tierName: GuardrailContentFiltersTierName;
}
export const GuardrailContentFiltersTier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tierName: GuardrailContentFiltersTierName }),
).annotate({
  identifier: "GuardrailContentFiltersTier",
}) as any as S.Schema<GuardrailContentFiltersTier>;
export interface GuardrailContentPolicy {
  filters?: GuardrailContentFilter[];
  tier?: GuardrailContentFiltersTier;
}
export const GuardrailContentPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.optional(GuardrailContentFilters),
    tier: S.optional(GuardrailContentFiltersTier),
  }),
).annotate({
  identifier: "GuardrailContentPolicy",
}) as any as S.Schema<GuardrailContentPolicy>;
export interface GuardrailWord {
  text: string;
  inputAction?: GuardrailWordAction;
  outputAction?: GuardrailWordAction;
  inputEnabled?: boolean;
  outputEnabled?: boolean;
}
export const GuardrailWord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    text: S.String,
    inputAction: S.optional(GuardrailWordAction),
    outputAction: S.optional(GuardrailWordAction),
    inputEnabled: S.optional(S.Boolean),
    outputEnabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "GuardrailWord" }) as any as S.Schema<GuardrailWord>;
export type GuardrailWords = GuardrailWord[];
export const GuardrailWords = /*@__PURE__*/ S.Array(GuardrailWord);
export interface GuardrailManagedWords {
  type: GuardrailManagedWordsType;
  inputAction?: GuardrailWordAction;
  outputAction?: GuardrailWordAction;
  inputEnabled?: boolean;
  outputEnabled?: boolean;
}
export const GuardrailManagedWords = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: GuardrailManagedWordsType,
    inputAction: S.optional(GuardrailWordAction),
    outputAction: S.optional(GuardrailWordAction),
    inputEnabled: S.optional(S.Boolean),
    outputEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GuardrailManagedWords",
}) as any as S.Schema<GuardrailManagedWords>;
export type GuardrailManagedWordLists = GuardrailManagedWords[];
export const GuardrailManagedWordLists = /*@__PURE__*/ S.Array(
  GuardrailManagedWords,
);
export interface GuardrailWordPolicy {
  words?: GuardrailWord[];
  managedWordLists?: GuardrailManagedWords[];
}
export const GuardrailWordPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    words: S.optional(GuardrailWords),
    managedWordLists: S.optional(GuardrailManagedWordLists),
  }),
).annotate({
  identifier: "GuardrailWordPolicy",
}) as any as S.Schema<GuardrailWordPolicy>;
export interface GuardrailPiiEntity {
  type: GuardrailPiiEntityType;
  action: GuardrailSensitiveInformationAction;
  inputAction?: GuardrailSensitiveInformationAction;
  outputAction?: GuardrailSensitiveInformationAction;
  inputEnabled?: boolean;
  outputEnabled?: boolean;
}
export const GuardrailPiiEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: GuardrailPiiEntityType,
    action: GuardrailSensitiveInformationAction,
    inputAction: S.optional(GuardrailSensitiveInformationAction),
    outputAction: S.optional(GuardrailSensitiveInformationAction),
    inputEnabled: S.optional(S.Boolean),
    outputEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GuardrailPiiEntity",
}) as any as S.Schema<GuardrailPiiEntity>;
export type GuardrailPiiEntities = GuardrailPiiEntity[];
export const GuardrailPiiEntities = /*@__PURE__*/ S.Array(GuardrailPiiEntity);
export interface GuardrailRegex {
  name: string;
  description?: string;
  pattern: string;
  action: GuardrailSensitiveInformationAction;
  inputAction?: GuardrailSensitiveInformationAction;
  outputAction?: GuardrailSensitiveInformationAction;
  inputEnabled?: boolean;
  outputEnabled?: boolean;
}
export const GuardrailRegex = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    pattern: S.String,
    action: GuardrailSensitiveInformationAction,
    inputAction: S.optional(GuardrailSensitiveInformationAction),
    outputAction: S.optional(GuardrailSensitiveInformationAction),
    inputEnabled: S.optional(S.Boolean),
    outputEnabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "GuardrailRegex" }) as any as S.Schema<GuardrailRegex>;
export type GuardrailRegexes = GuardrailRegex[];
export const GuardrailRegexes = /*@__PURE__*/ S.Array(GuardrailRegex);
export interface GuardrailSensitiveInformationPolicy {
  piiEntities?: GuardrailPiiEntity[];
  regexes?: GuardrailRegex[];
}
export const GuardrailSensitiveInformationPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    piiEntities: S.optional(GuardrailPiiEntities),
    regexes: S.optional(GuardrailRegexes),
  }),
).annotate({
  identifier: "GuardrailSensitiveInformationPolicy",
}) as any as S.Schema<GuardrailSensitiveInformationPolicy>;
export interface GuardrailContextualGroundingFilter {
  type: GuardrailContextualGroundingFilterType;
  threshold: number;
  action?: GuardrailContextualGroundingAction;
  enabled?: boolean;
}
export const GuardrailContextualGroundingFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: GuardrailContextualGroundingFilterType,
    threshold: S.Number,
    action: S.optional(GuardrailContextualGroundingAction),
    enabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GuardrailContextualGroundingFilter",
}) as any as S.Schema<GuardrailContextualGroundingFilter>;
export type GuardrailContextualGroundingFilters =
  GuardrailContextualGroundingFilter[];
export const GuardrailContextualGroundingFilters = /*@__PURE__*/ S.Array(
  GuardrailContextualGroundingFilter,
);
export interface GuardrailContextualGroundingPolicy {
  filters: GuardrailContextualGroundingFilter[];
}
export const GuardrailContextualGroundingPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ filters: GuardrailContextualGroundingFilters }),
).annotate({
  identifier: "GuardrailContextualGroundingPolicy",
}) as any as S.Schema<GuardrailContextualGroundingPolicy>;
export interface GuardrailAutomatedReasoningPolicy {
  policies: string[];
  confidenceThreshold?: number;
}
export const GuardrailAutomatedReasoningPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policies: AutomatedReasoningPolicyArnList,
    confidenceThreshold: S.optional(S.Number),
  }),
).annotate({
  identifier: "GuardrailAutomatedReasoningPolicy",
}) as any as S.Schema<GuardrailAutomatedReasoningPolicy>;
export type GuardrailCrossRegionGuardrailProfileId = string;
export type GuardrailCrossRegionGuardrailProfileArn = string;
export interface GuardrailCrossRegionDetails {
  guardrailProfileId?: string;
  guardrailProfileArn?: string;
}
export const GuardrailCrossRegionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    guardrailProfileId: S.optional(S.String),
    guardrailProfileArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GuardrailCrossRegionDetails",
}) as any as S.Schema<GuardrailCrossRegionDetails>;
export type GuardrailStatusReason = string | redacted.Redacted<string>;
export type GuardrailStatusReasons = (string | redacted.Redacted<string>)[];
export const GuardrailStatusReasons = /*@__PURE__*/ S.Array(SensitiveString);
export type GuardrailFailureRecommendation = string | redacted.Redacted<string>;
export type GuardrailFailureRecommendations = (
  | string
  | redacted.Redacted<string>
)[];
export const GuardrailFailureRecommendations =
  /*@__PURE__*/ S.Array(SensitiveString);
export interface GetGuardrailResponse {
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  guardrailId: string;
  guardrailArn: string;
  version: string;
  status: GuardrailStatus;
  topicPolicy?: GuardrailTopicPolicy;
  contentPolicy?: GuardrailContentPolicy;
  wordPolicy?: GuardrailWordPolicy;
  sensitiveInformationPolicy?: GuardrailSensitiveInformationPolicy;
  contextualGroundingPolicy?: GuardrailContextualGroundingPolicy;
  automatedReasoningPolicy?: GuardrailAutomatedReasoningPolicy;
  crossRegionDetails?: GuardrailCrossRegionDetails;
  createdAt: Date;
  updatedAt: Date;
  statusReasons?: (string | redacted.Redacted<string>)[];
  failureRecommendations?: (string | redacted.Redacted<string>)[];
  blockedInputMessaging: string | redacted.Redacted<string>;
  blockedOutputsMessaging: string | redacted.Redacted<string>;
  kmsKeyArn?: string;
}
export const GetGuardrailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: SensitiveString,
    description: S.optional(SensitiveString),
    guardrailId: S.String,
    guardrailArn: S.String,
    version: S.String,
    status: GuardrailStatus,
    topicPolicy: S.optional(GuardrailTopicPolicy),
    contentPolicy: S.optional(GuardrailContentPolicy),
    wordPolicy: S.optional(GuardrailWordPolicy),
    sensitiveInformationPolicy: S.optional(GuardrailSensitiveInformationPolicy),
    contextualGroundingPolicy: S.optional(GuardrailContextualGroundingPolicy),
    automatedReasoningPolicy: S.optional(GuardrailAutomatedReasoningPolicy),
    crossRegionDetails: S.optional(GuardrailCrossRegionDetails),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    statusReasons: S.optional(GuardrailStatusReasons),
    failureRecommendations: S.optional(GuardrailFailureRecommendations),
    blockedInputMessaging: SensitiveString,
    blockedOutputsMessaging: SensitiveString,
    kmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetGuardrailResponse",
}) as any as S.Schema<GetGuardrailResponse>;
export interface GetImportedModelRequest {
  modelIdentifier: string;
}
export const GetImportedModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelIdentifier: S.String.pipe(T.HttpLabel("modelIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/imported-models/{modelIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetImportedModelRequest",
}) as any as S.Schema<GetImportedModelRequest>;
export type ImportedModelArn = string;
export type InstructSupported = boolean;
export type CustomModelUnitsVersion = string;
export interface CustomModelUnits {
  customModelUnitsPerModelCopy?: number;
  customModelUnitsVersion?: string;
}
export const CustomModelUnits = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    customModelUnitsPerModelCopy: S.optional(S.Number),
    customModelUnitsVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "CustomModelUnits",
}) as any as S.Schema<CustomModelUnits>;
export interface GetImportedModelResponse {
  modelArn?: string;
  modelName?: string;
  jobName?: string;
  jobArn?: string;
  modelDataSource?: ModelDataSource;
  creationTime?: Date;
  modelArchitecture?: string;
  modelKmsKeyArn?: string;
  instructSupported?: boolean;
  customModelUnits?: CustomModelUnits;
}
export const GetImportedModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelArn: S.optional(S.String),
    modelName: S.optional(S.String),
    jobName: S.optional(S.String),
    jobArn: S.optional(S.String),
    modelDataSource: S.optional(ModelDataSource),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    modelArchitecture: S.optional(S.String),
    modelKmsKeyArn: S.optional(S.String),
    instructSupported: S.optional(S.Boolean),
    customModelUnits: S.optional(CustomModelUnits),
  }),
).annotate({
  identifier: "GetImportedModelResponse",
}) as any as S.Schema<GetImportedModelResponse>;
export interface GetInferenceProfileRequest {
  inferenceProfileIdentifier: string;
}
export const GetInferenceProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inferenceProfileIdentifier: S.String.pipe(
      T.HttpLabel("inferenceProfileIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/inference-profiles/{inferenceProfileIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetInferenceProfileRequest",
}) as any as S.Schema<GetInferenceProfileRequest>;
export interface InferenceProfileModel {
  modelArn?: string;
}
export const InferenceProfileModel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ modelArn: S.optional(S.String) }),
).annotate({
  identifier: "InferenceProfileModel",
}) as any as S.Schema<InferenceProfileModel>;
export type InferenceProfileModels = InferenceProfileModel[];
export const InferenceProfileModels = /*@__PURE__*/ S.Array(
  InferenceProfileModel,
);
export type InferenceProfileId = string;
export type InferenceProfileType =
  | "SYSTEM_DEFINED"
  | "APPLICATION"
  | (string & {});
export const InferenceProfileType = /*@__PURE__*/ S.String;

export interface GetInferenceProfileResponse {
  inferenceProfileName: string;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  updatedAt?: Date;
  inferenceProfileArn: string;
  models: InferenceProfileModel[];
  inferenceProfileId: string;
  status: InferenceProfileStatus;
  type: InferenceProfileType;
}
export const GetInferenceProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inferenceProfileName: S.String,
    description: S.optional(SensitiveString),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    inferenceProfileArn: S.String,
    models: InferenceProfileModels,
    inferenceProfileId: S.String,
    status: InferenceProfileStatus,
    type: InferenceProfileType,
  }),
).annotate({
  identifier: "GetInferenceProfileResponse",
}) as any as S.Schema<GetInferenceProfileResponse>;
export interface GetMarketplaceModelEndpointRequest {
  endpointArn: string;
}
export const GetMarketplaceModelEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ endpointArn: S.String.pipe(T.HttpLabel("endpointArn")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/marketplace-model/endpoints/{endpointArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMarketplaceModelEndpointRequest",
}) as any as S.Schema<GetMarketplaceModelEndpointRequest>;
export interface GetMarketplaceModelEndpointResponse {
  marketplaceModelEndpoint?: MarketplaceModelEndpoint;
}
export const GetMarketplaceModelEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ marketplaceModelEndpoint: S.optional(MarketplaceModelEndpoint) }),
).annotate({
  identifier: "GetMarketplaceModelEndpointResponse",
}) as any as S.Schema<GetMarketplaceModelEndpointResponse>;
export interface GetModelCopyJobRequest {
  jobArn: string;
}
export const GetModelCopyJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobArn: S.String.pipe(T.HttpLabel("jobArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/model-copy-jobs/{jobArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetModelCopyJobRequest",
}) as any as S.Schema<GetModelCopyJobRequest>;
export type ModelCopyJobStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | (string & {});
export const ModelCopyJobStatus = /*@__PURE__*/ S.String;

export interface GetModelCopyJobResponse {
  jobArn: string;
  status: ModelCopyJobStatus;
  creationTime: Date;
  targetModelArn: string;
  targetModelName?: string;
  sourceAccountId: string;
  sourceModelArn: string;
  targetModelKmsKeyArn?: string;
  targetModelTags?: Tag[];
  failureMessage?: string;
  sourceModelName?: string;
}
export const GetModelCopyJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobArn: S.String,
    status: ModelCopyJobStatus,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    targetModelArn: S.String,
    targetModelName: S.optional(S.String),
    sourceAccountId: S.String,
    sourceModelArn: S.String,
    targetModelKmsKeyArn: S.optional(S.String),
    targetModelTags: S.optional(TagList),
    failureMessage: S.optional(S.String),
    sourceModelName: S.optional(S.String),
  }),
).annotate({
  identifier: "GetModelCopyJobResponse",
}) as any as S.Schema<GetModelCopyJobResponse>;
export type ModelCustomizationJobIdentifier = string;
export interface GetModelCustomizationJobRequest {
  jobIdentifier: string;
}
export const GetModelCustomizationJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobIdentifier: S.String.pipe(T.HttpLabel("jobIdentifier")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/model-customization-jobs/{jobIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetModelCustomizationJobRequest",
}) as any as S.Schema<GetModelCustomizationJobRequest>;
export type ModelCustomizationJobStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | (string & {});
export const ModelCustomizationJobStatus = /*@__PURE__*/ S.String;

export type JobStatusDetails =
  | "InProgress"
  | "Completed"
  | "Stopping"
  | "Stopped"
  | "Failed"
  | "NotStarted"
  | (string & {});
export const JobStatusDetails = /*@__PURE__*/ S.String;

export interface ValidationDetails {
  status?: JobStatusDetails;
  creationTime?: Date;
  lastModifiedTime?: Date;
}
export const ValidationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(JobStatusDetails),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastModifiedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ValidationDetails",
}) as any as S.Schema<ValidationDetails>;
export interface DataProcessingDetails {
  status?: JobStatusDetails;
  creationTime?: Date;
  lastModifiedTime?: Date;
}
export const DataProcessingDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(JobStatusDetails),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastModifiedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "DataProcessingDetails",
}) as any as S.Schema<DataProcessingDetails>;
export interface TrainingDetails {
  status?: JobStatusDetails;
  creationTime?: Date;
  lastModifiedTime?: Date;
}
export const TrainingDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(JobStatusDetails),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastModifiedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "TrainingDetails",
}) as any as S.Schema<TrainingDetails>;
export interface StatusDetails {
  validationDetails?: ValidationDetails;
  dataProcessingDetails?: DataProcessingDetails;
  trainingDetails?: TrainingDetails;
}
export const StatusDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    validationDetails: S.optional(ValidationDetails),
    dataProcessingDetails: S.optional(DataProcessingDetails),
    trainingDetails: S.optional(TrainingDetails),
  }),
).annotate({ identifier: "StatusDetails" }) as any as S.Schema<StatusDetails>;
export interface GetModelCustomizationJobResponse {
  jobArn: string;
  jobName: string;
  outputModelName: string;
  outputModelArn?: string;
  clientRequestToken?: string;
  roleArn: string;
  status?: ModelCustomizationJobStatus;
  statusDetails?: StatusDetails;
  failureMessage?: string;
  creationTime: Date;
  lastModifiedTime?: Date;
  endTime?: Date;
  baseModelArn: string;
  hyperParameters?: { [key: string]: string | undefined };
  trainingDataConfig: TrainingDataConfig;
  validationDataConfig: ValidationDataConfig;
  outputDataConfig: OutputDataConfig;
  customizationType?: CustomizationType;
  outputModelKmsKeyArn?: string;
  trainingMetrics?: TrainingMetrics;
  validationMetrics?: ValidatorMetric[];
  vpcConfig?: VpcConfig;
  customizationConfig?: CustomizationConfig;
}
export const GetModelCustomizationJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobArn: S.String,
    jobName: S.String,
    outputModelName: S.String,
    outputModelArn: S.optional(S.String),
    clientRequestToken: S.optional(S.String),
    roleArn: S.String,
    status: S.optional(ModelCustomizationJobStatus),
    statusDetails: S.optional(StatusDetails),
    failureMessage: S.optional(S.String),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModifiedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    baseModelArn: S.String,
    hyperParameters: S.optional(ModelCustomizationHyperParameters),
    trainingDataConfig: TrainingDataConfig,
    validationDataConfig: ValidationDataConfig,
    outputDataConfig: OutputDataConfig,
    customizationType: S.optional(CustomizationType),
    outputModelKmsKeyArn: S.optional(S.String),
    trainingMetrics: S.optional(TrainingMetrics),
    validationMetrics: S.optional(ValidationMetrics),
    vpcConfig: S.optional(VpcConfig),
    customizationConfig: S.optional(CustomizationConfig),
  }),
).annotate({
  identifier: "GetModelCustomizationJobResponse",
}) as any as S.Schema<GetModelCustomizationJobResponse>;
export type ModelImportJobIdentifier = string;
export interface GetModelImportJobRequest {
  jobIdentifier: string;
}
export const GetModelImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobIdentifier: S.String.pipe(T.HttpLabel("jobIdentifier")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/model-import-jobs/{jobIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetModelImportJobRequest",
}) as any as S.Schema<GetModelImportJobRequest>;
export type ModelImportJobStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | (string & {});
export const ModelImportJobStatus = /*@__PURE__*/ S.String;

export interface GetModelImportJobResponse {
  jobArn?: string;
  jobName?: string;
  importedModelName?: string;
  importedModelArn?: string;
  roleArn?: string;
  modelDataSource?: ModelDataSource;
  status?: ModelImportJobStatus;
  failureMessage?: string;
  creationTime?: Date;
  lastModifiedTime?: Date;
  endTime?: Date;
  vpcConfig?: VpcConfig;
  importedModelKmsKeyArn?: string;
}
export const GetModelImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobArn: S.optional(S.String),
    jobName: S.optional(S.String),
    importedModelName: S.optional(S.String),
    importedModelArn: S.optional(S.String),
    roleArn: S.optional(S.String),
    modelDataSource: S.optional(ModelDataSource),
    status: S.optional(ModelImportJobStatus),
    failureMessage: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastModifiedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    vpcConfig: S.optional(VpcConfig),
    importedModelKmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetModelImportJobResponse",
}) as any as S.Schema<GetModelImportJobResponse>;
export type ModelInvocationJobIdentifier = string;
export interface GetModelInvocationJobRequest {
  jobIdentifier: string;
}
export const GetModelInvocationJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobIdentifier: S.String.pipe(T.HttpLabel("jobIdentifier")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/model-invocation-job/{jobIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetModelInvocationJobRequest",
}) as any as S.Schema<GetModelInvocationJobRequest>;
export type ModelInvocationJobStatus =
  | "Submitted"
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | "PartiallyCompleted"
  | "Expired"
  | "Validating"
  | "Scheduled"
  | (string & {});
export const ModelInvocationJobStatus = /*@__PURE__*/ S.String;

export type Message = string | redacted.Redacted<string>;
export type NonNegativeLong = number;
export interface GetModelInvocationJobResponse {
  jobArn: string;
  jobName?: string;
  modelId: string;
  clientRequestToken?: string;
  roleArn: string;
  status?: ModelInvocationJobStatus;
  message?: string | redacted.Redacted<string>;
  submitTime: Date;
  lastModifiedTime?: Date;
  endTime?: Date;
  inputDataConfig: ModelInvocationJobInputDataConfig;
  outputDataConfig: ModelInvocationJobOutputDataConfig;
  vpcConfig?: VpcConfig;
  timeoutDurationInHours?: number;
  jobExpirationTime?: Date;
  modelInvocationType?: ModelInvocationType;
  totalRecordCount?: number;
  processedRecordCount?: number;
  successRecordCount?: number;
  errorRecordCount?: number;
}
export const GetModelInvocationJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobArn: S.String,
    jobName: S.optional(S.String),
    modelId: S.String,
    clientRequestToken: S.optional(S.String),
    roleArn: S.String,
    status: S.optional(ModelInvocationJobStatus),
    message: S.optional(SensitiveString),
    submitTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModifiedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    inputDataConfig: ModelInvocationJobInputDataConfig,
    outputDataConfig: ModelInvocationJobOutputDataConfig,
    vpcConfig: S.optional(VpcConfig),
    timeoutDurationInHours: S.optional(S.Number),
    jobExpirationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    modelInvocationType: S.optional(ModelInvocationType),
    totalRecordCount: S.optional(S.Number),
    processedRecordCount: S.optional(S.Number),
    successRecordCount: S.optional(S.Number),
    errorRecordCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "GetModelInvocationJobResponse",
}) as any as S.Schema<GetModelInvocationJobResponse>;
export interface GetModelInvocationLoggingConfigurationRequest {}
export const GetModelInvocationLoggingConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({}).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/logging/modelinvocations" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetModelInvocationLoggingConfigurationRequest",
  }) as any as S.Schema<GetModelInvocationLoggingConfigurationRequest>;
export type LogGroupName = string;
export type BucketName = string;
export type KeyPrefix = string;
export interface S3Config {
  bucketName: string;
  keyPrefix?: string;
}
export const S3Config = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucketName: S.String, keyPrefix: S.optional(S.String) }),
).annotate({ identifier: "S3Config" }) as any as S.Schema<S3Config>;
export interface CloudWatchConfig {
  logGroupName: string;
  roleArn: string;
  largeDataDeliveryS3Config?: S3Config;
}
export const CloudWatchConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    logGroupName: S.String,
    roleArn: S.String,
    largeDataDeliveryS3Config: S.optional(S3Config),
  }),
).annotate({
  identifier: "CloudWatchConfig",
}) as any as S.Schema<CloudWatchConfig>;
export interface LoggingConfig {
  cloudWatchConfig?: CloudWatchConfig;
  s3Config?: S3Config;
  textDataDeliveryEnabled?: boolean;
  imageDataDeliveryEnabled?: boolean;
  embeddingDataDeliveryEnabled?: boolean;
  videoDataDeliveryEnabled?: boolean;
  audioDataDeliveryEnabled?: boolean;
}
export const LoggingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cloudWatchConfig: S.optional(CloudWatchConfig),
    s3Config: S.optional(S3Config),
    textDataDeliveryEnabled: S.optional(S.Boolean),
    imageDataDeliveryEnabled: S.optional(S.Boolean),
    embeddingDataDeliveryEnabled: S.optional(S.Boolean),
    videoDataDeliveryEnabled: S.optional(S.Boolean),
    audioDataDeliveryEnabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "LoggingConfig" }) as any as S.Schema<LoggingConfig>;
export interface GetModelInvocationLoggingConfigurationResponse {
  loggingConfig?: LoggingConfig;
}
export const GetModelInvocationLoggingConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ loggingConfig: S.optional(LoggingConfig) }),
  ).annotate({
    identifier: "GetModelInvocationLoggingConfigurationResponse",
  }) as any as S.Schema<GetModelInvocationLoggingConfigurationResponse>;
export interface GetPromptRouterRequest {
  promptRouterArn: string;
}
export const GetPromptRouterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    promptRouterArn: S.String.pipe(T.HttpLabel("promptRouterArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prompt-routers/{promptRouterArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPromptRouterRequest",
}) as any as S.Schema<GetPromptRouterRequest>;
export type PromptRouterStatus = "AVAILABLE" | (string & {});
export const PromptRouterStatus = /*@__PURE__*/ S.String;

export type PromptRouterType = "custom" | "default" | (string & {});
export const PromptRouterType = /*@__PURE__*/ S.String;

export interface GetPromptRouterResponse {
  promptRouterName: string;
  routingCriteria: RoutingCriteria;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  updatedAt?: Date;
  promptRouterArn: string;
  models: (PromptRouterTargetModel & {
    modelArn: PromptRouterTargetModelArn;
  })[];
  fallbackModel: PromptRouterTargetModel & {
    modelArn: PromptRouterTargetModelArn;
  };
  status: PromptRouterStatus;
  type: PromptRouterType;
}
export const GetPromptRouterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    promptRouterName: S.String,
    routingCriteria: RoutingCriteria,
    description: S.optional(SensitiveString),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    promptRouterArn: S.String,
    models: PromptRouterTargetModels,
    fallbackModel: PromptRouterTargetModel,
    status: PromptRouterStatus,
    type: PromptRouterType,
  }),
).annotate({
  identifier: "GetPromptRouterResponse",
}) as any as S.Schema<GetPromptRouterResponse>;
export interface GetProvisionedModelThroughputRequest {
  provisionedModelId: string;
}
export const GetProvisionedModelThroughputRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      provisionedModelId: S.String.pipe(T.HttpLabel("provisionedModelId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/provisioned-model-throughput/{provisionedModelId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetProvisionedModelThroughputRequest",
}) as any as S.Schema<GetProvisionedModelThroughputRequest>;
export type ProvisionedModelStatus =
  | "Creating"
  | "InService"
  | "Updating"
  | "Failed"
  | (string & {});
export const ProvisionedModelStatus = /*@__PURE__*/ S.String;

export interface GetProvisionedModelThroughputResponse {
  modelUnits: number;
  desiredModelUnits: number;
  provisionedModelName: string;
  provisionedModelArn: string;
  modelArn: string;
  desiredModelArn: string;
  foundationModelArn: string;
  status: ProvisionedModelStatus;
  creationTime: Date;
  lastModifiedTime: Date;
  failureMessage?: string;
  commitmentDuration?: CommitmentDuration;
  commitmentExpirationTime?: Date;
}
export const GetProvisionedModelThroughputResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      modelUnits: S.Number,
      desiredModelUnits: S.Number,
      provisionedModelName: S.String,
      provisionedModelArn: S.String,
      modelArn: S.String,
      desiredModelArn: S.String,
      foundationModelArn: S.String,
      status: ProvisionedModelStatus,
      creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      lastModifiedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      failureMessage: S.optional(S.String),
      commitmentDuration: S.optional(CommitmentDuration),
      commitmentExpirationTime: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
    }),
).annotate({
  identifier: "GetProvisionedModelThroughputResponse",
}) as any as S.Schema<GetProvisionedModelThroughputResponse>;
export interface GetResourcePolicyRequest {
  resourceArn: string;
}
export const GetResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/resource-policy/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourcePolicyRequest",
}) as any as S.Schema<GetResourcePolicyRequest>;
export type ResourcePolicyDocument = string;
export interface GetResourcePolicyResponse {
  resourcePolicy?: string;
}
export const GetResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourcePolicy: S.optional(S.String) }),
).annotate({
  identifier: "GetResourcePolicyResponse",
}) as any as S.Schema<GetResourcePolicyResponse>;
export interface GetUseCaseForModelAccessRequest {}
export const GetUseCaseForModelAccessRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/use-case-for-model-access" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetUseCaseForModelAccessRequest",
}) as any as S.Schema<GetUseCaseForModelAccessRequest>;
export type AcknowledgementFormDataBody = Uint8Array;
export interface GetUseCaseForModelAccessResponse {
  formData: Uint8Array;
}
export const GetUseCaseForModelAccessResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ formData: T.Blob }),
).annotate({
  identifier: "GetUseCaseForModelAccessResponse",
}) as any as S.Schema<GetUseCaseForModelAccessResponse>;
export type MaxResults = number;
export type PaginationToken = string;
export type SortJobsBy = "CreationTime" | (string & {});
export const SortJobsBy = /*@__PURE__*/ S.String;

export type SortOrder = "Ascending" | "Descending" | (string & {});
export const SortOrder = /*@__PURE__*/ S.String;

export interface ListAdvancedPromptOptimizationJobsRequest {
  maxResults?: number;
  nextToken?: string;
  sortBy?: SortJobsBy;
  sortOrder?: SortOrder;
}
export const ListAdvancedPromptOptimizationJobsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      sortBy: S.optional(SortJobsBy).pipe(T.HttpQuery("sortBy")),
      sortOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortOrder")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/advanced-prompt-optimization-jobs" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListAdvancedPromptOptimizationJobsRequest",
  }) as any as S.Schema<ListAdvancedPromptOptimizationJobsRequest>;
export interface AdvancedPromptOptimizationJobSummary {
  jobArn: string;
  jobName: string;
  jobStatus: AdvancedPromptOptimizationJobStatus;
  creationTime: Date;
  lastModifiedTime?: Date;
}
export const AdvancedPromptOptimizationJobSummary = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      jobArn: S.String,
      jobName: S.String,
      jobStatus: AdvancedPromptOptimizationJobStatus,
      creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      lastModifiedTime: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
    }),
).annotate({
  identifier: "AdvancedPromptOptimizationJobSummary",
}) as any as S.Schema<AdvancedPromptOptimizationJobSummary>;
export type AdvancedPromptOptimizationJobSummaries =
  AdvancedPromptOptimizationJobSummary[];
export const AdvancedPromptOptimizationJobSummaries = /*@__PURE__*/ S.Array(
  AdvancedPromptOptimizationJobSummary,
);
export interface ListAdvancedPromptOptimizationJobsResponse {
  jobSummaries?: AdvancedPromptOptimizationJobSummary[];
  nextToken?: string;
}
export const ListAdvancedPromptOptimizationJobsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      jobSummaries: S.optional(AdvancedPromptOptimizationJobSummaries),
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListAdvancedPromptOptimizationJobsResponse",
  }) as any as S.Schema<ListAdvancedPromptOptimizationJobsResponse>;
export interface ListAutomatedReasoningPoliciesRequest {
  policyArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListAutomatedReasoningPoliciesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      policyArn: S.optional(S.String).pipe(T.HttpQuery("policyArn")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/automated-reasoning-policies" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListAutomatedReasoningPoliciesRequest",
}) as any as S.Schema<ListAutomatedReasoningPoliciesRequest>;
export interface AutomatedReasoningPolicySummary {
  policyArn: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  version: string;
  policyId: string;
  createdAt: Date;
  updatedAt: Date;
}
export const AutomatedReasoningPolicySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyArn: S.String,
    name: SensitiveString,
    description: S.optional(SensitiveString),
    version: S.String,
    policyId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "AutomatedReasoningPolicySummary",
}) as any as S.Schema<AutomatedReasoningPolicySummary>;
export type AutomatedReasoningPolicySummaries =
  AutomatedReasoningPolicySummary[];
export const AutomatedReasoningPolicySummaries = /*@__PURE__*/ S.Array(
  AutomatedReasoningPolicySummary,
);
export interface ListAutomatedReasoningPoliciesResponse {
  automatedReasoningPolicySummaries: AutomatedReasoningPolicySummary[];
  nextToken?: string;
}
export const ListAutomatedReasoningPoliciesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      automatedReasoningPolicySummaries: AutomatedReasoningPolicySummaries,
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListAutomatedReasoningPoliciesResponse",
}) as any as S.Schema<ListAutomatedReasoningPoliciesResponse>;
export interface ListAutomatedReasoningPolicyBuildWorkflowsRequest {
  policyArn: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListAutomatedReasoningPolicyBuildWorkflowsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyArn: S.String.pipe(T.HttpLabel("policyArn")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/automated-reasoning-policies/{policyArn}/build-workflows",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListAutomatedReasoningPolicyBuildWorkflowsRequest",
  }) as any as S.Schema<ListAutomatedReasoningPolicyBuildWorkflowsRequest>;
export interface AutomatedReasoningPolicyBuildWorkflowSummary {
  policyArn: string;
  buildWorkflowId: string;
  status: AutomatedReasoningPolicyBuildWorkflowStatus;
  buildWorkflowType: AutomatedReasoningPolicyBuildWorkflowType;
  createdAt: Date;
  updatedAt: Date;
}
export const AutomatedReasoningPolicyBuildWorkflowSummary =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyArn: S.String,
      buildWorkflowId: S.String,
      status: AutomatedReasoningPolicyBuildWorkflowStatus,
      buildWorkflowType: AutomatedReasoningPolicyBuildWorkflowType,
      createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyBuildWorkflowSummary",
  }) as any as S.Schema<AutomatedReasoningPolicyBuildWorkflowSummary>;
export type AutomatedReasoningPolicyBuildWorkflowSummaries =
  AutomatedReasoningPolicyBuildWorkflowSummary[];
export const AutomatedReasoningPolicyBuildWorkflowSummaries =
  /*@__PURE__*/ S.Array(AutomatedReasoningPolicyBuildWorkflowSummary);
export interface ListAutomatedReasoningPolicyBuildWorkflowsResponse {
  automatedReasoningPolicyBuildWorkflowSummaries: AutomatedReasoningPolicyBuildWorkflowSummary[];
  nextToken?: string;
}
export const ListAutomatedReasoningPolicyBuildWorkflowsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      automatedReasoningPolicyBuildWorkflowSummaries:
        AutomatedReasoningPolicyBuildWorkflowSummaries,
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListAutomatedReasoningPolicyBuildWorkflowsResponse",
  }) as any as S.Schema<ListAutomatedReasoningPolicyBuildWorkflowsResponse>;
export interface ListAutomatedReasoningPolicyTestCasesRequest {
  policyArn: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListAutomatedReasoningPolicyTestCasesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyArn: S.String.pipe(T.HttpLabel("policyArn")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/automated-reasoning-policies/{policyArn}/test-cases",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListAutomatedReasoningPolicyTestCasesRequest",
  }) as any as S.Schema<ListAutomatedReasoningPolicyTestCasesRequest>;
export type AutomatedReasoningPolicyTestCaseList =
  AutomatedReasoningPolicyTestCase[];
export const AutomatedReasoningPolicyTestCaseList = /*@__PURE__*/ S.Array(
  AutomatedReasoningPolicyTestCase,
);
export interface ListAutomatedReasoningPolicyTestCasesResponse {
  testCases: AutomatedReasoningPolicyTestCase[];
  nextToken?: string;
}
export const ListAutomatedReasoningPolicyTestCasesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      testCases: AutomatedReasoningPolicyTestCaseList,
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListAutomatedReasoningPolicyTestCasesResponse",
  }) as any as S.Schema<ListAutomatedReasoningPolicyTestCasesResponse>;
export interface ListAutomatedReasoningPolicyTestResultsRequest {
  policyArn: string;
  buildWorkflowId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListAutomatedReasoningPolicyTestResultsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyArn: S.String.pipe(T.HttpLabel("policyArn")),
      buildWorkflowId: S.String.pipe(T.HttpLabel("buildWorkflowId")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}/test-results",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListAutomatedReasoningPolicyTestResultsRequest",
  }) as any as S.Schema<ListAutomatedReasoningPolicyTestResultsRequest>;
export type AutomatedReasoningPolicyTestList =
  AutomatedReasoningPolicyTestResult[];
export const AutomatedReasoningPolicyTestList = /*@__PURE__*/ S.Array(
  AutomatedReasoningPolicyTestResult,
);
export interface ListAutomatedReasoningPolicyTestResultsResponse {
  testResults: AutomatedReasoningPolicyTestResult[];
  nextToken?: string;
}
export const ListAutomatedReasoningPolicyTestResultsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      testResults: AutomatedReasoningPolicyTestList,
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListAutomatedReasoningPolicyTestResultsResponse",
  }) as any as S.Schema<ListAutomatedReasoningPolicyTestResultsResponse>;
export type SortModelsBy = "CreationTime" | (string & {});
export const SortModelsBy = /*@__PURE__*/ S.String;

export interface ListCustomModelDeploymentsRequest {
  createdBefore?: Date;
  createdAfter?: Date;
  nameContains?: string;
  maxResults?: number;
  nextToken?: string;
  sortBy?: SortModelsBy;
  sortOrder?: SortOrder;
  statusEquals?: CustomModelDeploymentStatus;
  modelArnEquals?: string;
}
export const ListCustomModelDeploymentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createdBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("createdBefore")),
    createdAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("createdAfter")),
    nameContains: S.optional(S.String).pipe(T.HttpQuery("nameContains")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    sortBy: S.optional(SortModelsBy).pipe(T.HttpQuery("sortBy")),
    sortOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortOrder")),
    statusEquals: S.optional(CustomModelDeploymentStatus).pipe(
      T.HttpQuery("statusEquals"),
    ),
    modelArnEquals: S.optional(S.String).pipe(T.HttpQuery("modelArnEquals")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/model-customization/custom-model-deployments",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCustomModelDeploymentsRequest",
}) as any as S.Schema<ListCustomModelDeploymentsRequest>;
export interface CustomModelDeploymentSummary {
  customModelDeploymentArn: string;
  customModelDeploymentName: string;
  modelArn: string;
  createdAt: Date;
  status: CustomModelDeploymentStatus;
  lastUpdatedAt?: Date;
  failureMessage?: string;
}
export const CustomModelDeploymentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    customModelDeploymentArn: S.String,
    customModelDeploymentName: S.String,
    modelArn: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: CustomModelDeploymentStatus,
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    failureMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "CustomModelDeploymentSummary",
}) as any as S.Schema<CustomModelDeploymentSummary>;
export type CustomModelDeploymentSummaryList = CustomModelDeploymentSummary[];
export const CustomModelDeploymentSummaryList = /*@__PURE__*/ S.Array(
  CustomModelDeploymentSummary,
);
export interface ListCustomModelDeploymentsResponse {
  nextToken?: string;
  modelDeploymentSummaries?: CustomModelDeploymentSummary[];
}
export const ListCustomModelDeploymentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    modelDeploymentSummaries: S.optional(CustomModelDeploymentSummaryList),
  }),
).annotate({
  identifier: "ListCustomModelDeploymentsResponse",
}) as any as S.Schema<ListCustomModelDeploymentsResponse>;
export interface ListCustomModelsRequest {
  creationTimeBefore?: Date;
  creationTimeAfter?: Date;
  nameContains?: string;
  baseModelArnEquals?: string;
  foundationModelArnEquals?: string;
  maxResults?: number;
  nextToken?: string;
  sortBy?: SortModelsBy;
  sortOrder?: SortOrder;
  isOwned?: boolean;
  modelStatus?: ModelStatus;
}
export const ListCustomModelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    creationTimeBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("creationTimeBefore")),
    creationTimeAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("creationTimeAfter")),
    nameContains: S.optional(S.String).pipe(T.HttpQuery("nameContains")),
    baseModelArnEquals: S.optional(S.String).pipe(
      T.HttpQuery("baseModelArnEquals"),
    ),
    foundationModelArnEquals: S.optional(S.String).pipe(
      T.HttpQuery("foundationModelArnEquals"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    sortBy: S.optional(SortModelsBy).pipe(T.HttpQuery("sortBy")),
    sortOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortOrder")),
    isOwned: S.optional(S.Boolean).pipe(T.HttpQuery("isOwned")),
    modelStatus: S.optional(ModelStatus).pipe(T.HttpQuery("modelStatus")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/custom-models" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCustomModelsRequest",
}) as any as S.Schema<ListCustomModelsRequest>;
export type ModelName = string;
export interface CustomModelSummary {
  modelArn: string;
  modelName: string;
  creationTime: Date;
  baseModelArn: string;
  baseModelName: string;
  customizationType?: CustomizationType;
  ownerAccountId?: string;
  modelStatus?: ModelStatus;
}
export const CustomModelSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelArn: S.String,
    modelName: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    baseModelArn: S.String,
    baseModelName: S.String,
    customizationType: S.optional(CustomizationType),
    ownerAccountId: S.optional(S.String),
    modelStatus: S.optional(ModelStatus),
  }),
).annotate({
  identifier: "CustomModelSummary",
}) as any as S.Schema<CustomModelSummary>;
export type CustomModelSummaryList = CustomModelSummary[];
export const CustomModelSummaryList = /*@__PURE__*/ S.Array(CustomModelSummary);
export interface ListCustomModelsResponse {
  nextToken?: string;
  modelSummaries?: CustomModelSummary[];
}
export const ListCustomModelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    modelSummaries: S.optional(CustomModelSummaryList),
  }),
).annotate({
  identifier: "ListCustomModelsResponse",
}) as any as S.Schema<ListCustomModelsResponse>;
export interface ListEnforcedGuardrailsConfigurationRequest {
  nextToken?: string;
}
export const ListEnforcedGuardrailsConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/enforcedGuardrailsConfiguration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListEnforcedGuardrailsConfigurationRequest",
  }) as any as S.Schema<ListEnforcedGuardrailsConfigurationRequest>;
export type InputTags = "HONOR" | "IGNORE" | (string & {});
export const InputTags = /*@__PURE__*/ S.String;

export type SelectiveGuardingMode =
  | "SELECTIVE"
  | "COMPREHENSIVE"
  | (string & {});
export const SelectiveGuardingMode = /*@__PURE__*/ S.String;

export interface SelectiveContentGuarding {
  system?: SelectiveGuardingMode;
  messages?: SelectiveGuardingMode;
}
export const SelectiveContentGuarding = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    system: S.optional(SelectiveGuardingMode),
    messages: S.optional(SelectiveGuardingMode),
  }),
).annotate({
  identifier: "SelectiveContentGuarding",
}) as any as S.Schema<SelectiveContentGuarding>;
export type ConfigurationOwner = string;
export type IncludedModelId = string;
export type IncludedModelsList = string[];
export const IncludedModelsList = /*@__PURE__*/ S.Array(S.String);
export type ExcludedModelId = string;
export type ExcludedModelsList = string[];
export const ExcludedModelsList = /*@__PURE__*/ S.Array(S.String);
export interface ModelEnforcement {
  includedModels: string[];
  excludedModels: string[];
}
export const ModelEnforcement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    includedModels: IncludedModelsList,
    excludedModels: ExcludedModelsList,
  }),
).annotate({
  identifier: "ModelEnforcement",
}) as any as S.Schema<ModelEnforcement>;
export interface AccountEnforcedGuardrailOutputConfiguration {
  configId?: string;
  guardrailArn?: string;
  guardrailId?: string;
  inputTags?: InputTags;
  selectiveContentGuarding?: SelectiveContentGuarding;
  guardrailVersion?: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  owner?: string;
  modelEnforcement?: ModelEnforcement;
}
export const AccountEnforcedGuardrailOutputConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      configId: S.optional(S.String),
      guardrailArn: S.optional(S.String),
      guardrailId: S.optional(S.String),
      inputTags: S.optional(InputTags),
      selectiveContentGuarding: S.optional(SelectiveContentGuarding),
      guardrailVersion: S.optional(S.String),
      createdAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      createdBy: S.optional(S.String),
      updatedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      updatedBy: S.optional(S.String),
      owner: S.optional(S.String),
      modelEnforcement: S.optional(ModelEnforcement),
    }),
  ).annotate({
    identifier: "AccountEnforcedGuardrailOutputConfiguration",
  }) as any as S.Schema<AccountEnforcedGuardrailOutputConfiguration>;
export type AccountEnforcedGuardrailsOutputConfiguration =
  AccountEnforcedGuardrailOutputConfiguration[];
export const AccountEnforcedGuardrailsOutputConfiguration =
  /*@__PURE__*/ S.Array(AccountEnforcedGuardrailOutputConfiguration);
export interface ListEnforcedGuardrailsConfigurationResponse {
  guardrailsConfig: AccountEnforcedGuardrailOutputConfiguration[];
  nextToken?: string;
}
export const ListEnforcedGuardrailsConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      guardrailsConfig: AccountEnforcedGuardrailsOutputConfiguration,
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListEnforcedGuardrailsConfigurationResponse",
  }) as any as S.Schema<ListEnforcedGuardrailsConfigurationResponse>;
export interface ListEvaluationJobsRequest {
  creationTimeAfter?: Date;
  creationTimeBefore?: Date;
  statusEquals?: EvaluationJobStatus;
  applicationTypeEquals?: ApplicationType;
  nameContains?: string;
  maxResults?: number;
  nextToken?: string;
  sortBy?: SortJobsBy;
  sortOrder?: SortOrder;
}
export const ListEvaluationJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    creationTimeAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("creationTimeAfter")),
    creationTimeBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("creationTimeBefore")),
    statusEquals: S.optional(EvaluationJobStatus).pipe(
      T.HttpQuery("statusEquals"),
    ),
    applicationTypeEquals: S.optional(ApplicationType).pipe(
      T.HttpQuery("applicationTypeEquals"),
    ),
    nameContains: S.optional(S.String).pipe(T.HttpQuery("nameContains")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    sortBy: S.optional(SortJobsBy).pipe(T.HttpQuery("sortBy")),
    sortOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortOrder")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/evaluation-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEvaluationJobsRequest",
}) as any as S.Schema<ListEvaluationJobsRequest>;
export type EvaluationTaskTypes = EvaluationTaskType[];
export const EvaluationTaskTypes = /*@__PURE__*/ S.Array(EvaluationTaskType);
export type EvaluationBedrockModelIdentifiers = string[];
export const EvaluationBedrockModelIdentifiers = /*@__PURE__*/ S.Array(
  S.String,
);
export type EvaluationBedrockKnowledgeBaseIdentifiers = string[];
export const EvaluationBedrockKnowledgeBaseIdentifiers = /*@__PURE__*/ S.Array(
  S.String,
);
export type EvaluatorModelIdentifiers = string[];
export const EvaluatorModelIdentifiers = /*@__PURE__*/ S.Array(S.String);
export type EvaluationPrecomputedInferenceSourceIdentifiers = string[];
export const EvaluationPrecomputedInferenceSourceIdentifiers =
  /*@__PURE__*/ S.Array(S.String);
export interface EvaluationModelConfigSummary {
  bedrockModelIdentifiers?: string[];
  precomputedInferenceSourceIdentifiers?: string[];
}
export const EvaluationModelConfigSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bedrockModelIdentifiers: S.optional(EvaluationBedrockModelIdentifiers),
    precomputedInferenceSourceIdentifiers: S.optional(
      EvaluationPrecomputedInferenceSourceIdentifiers,
    ),
  }),
).annotate({
  identifier: "EvaluationModelConfigSummary",
}) as any as S.Schema<EvaluationModelConfigSummary>;
export type EvaluationPrecomputedRagSourceIdentifiers = string[];
export const EvaluationPrecomputedRagSourceIdentifiers = /*@__PURE__*/ S.Array(
  S.String,
);
export interface EvaluationRagConfigSummary {
  bedrockKnowledgeBaseIdentifiers?: string[];
  precomputedRagSourceIdentifiers?: string[];
}
export const EvaluationRagConfigSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bedrockKnowledgeBaseIdentifiers: S.optional(
      EvaluationBedrockKnowledgeBaseIdentifiers,
    ),
    precomputedRagSourceIdentifiers: S.optional(
      EvaluationPrecomputedRagSourceIdentifiers,
    ),
  }),
).annotate({
  identifier: "EvaluationRagConfigSummary",
}) as any as S.Schema<EvaluationRagConfigSummary>;
export interface EvaluationInferenceConfigSummary {
  modelConfigSummary?: EvaluationModelConfigSummary;
  ragConfigSummary?: EvaluationRagConfigSummary;
}
export const EvaluationInferenceConfigSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelConfigSummary: S.optional(EvaluationModelConfigSummary),
    ragConfigSummary: S.optional(EvaluationRagConfigSummary),
  }),
).annotate({
  identifier: "EvaluationInferenceConfigSummary",
}) as any as S.Schema<EvaluationInferenceConfigSummary>;
export interface EvaluationSummary {
  jobArn: string;
  jobName: string;
  status: EvaluationJobStatus;
  creationTime: Date;
  jobType: EvaluationJobType;
  evaluationTaskTypes: EvaluationTaskType[];
  modelIdentifiers?: string[];
  ragIdentifiers?: string[];
  evaluatorModelIdentifiers?: string[];
  customMetricsEvaluatorModelIdentifiers?: string[];
  inferenceConfigSummary?: EvaluationInferenceConfigSummary;
  applicationType?: ApplicationType;
}
export const EvaluationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobArn: S.String,
    jobName: S.String,
    status: EvaluationJobStatus,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    jobType: EvaluationJobType,
    evaluationTaskTypes: EvaluationTaskTypes,
    modelIdentifiers: S.optional(EvaluationBedrockModelIdentifiers),
    ragIdentifiers: S.optional(EvaluationBedrockKnowledgeBaseIdentifiers),
    evaluatorModelIdentifiers: S.optional(EvaluatorModelIdentifiers),
    customMetricsEvaluatorModelIdentifiers: S.optional(
      EvaluatorModelIdentifiers,
    ),
    inferenceConfigSummary: S.optional(EvaluationInferenceConfigSummary),
    applicationType: S.optional(ApplicationType),
  }),
).annotate({
  identifier: "EvaluationSummary",
}) as any as S.Schema<EvaluationSummary>;
export type EvaluationSummaries = EvaluationSummary[];
export const EvaluationSummaries = /*@__PURE__*/ S.Array(EvaluationSummary);
export interface ListEvaluationJobsResponse {
  nextToken?: string;
  jobSummaries?: EvaluationSummary[];
}
export const ListEvaluationJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    jobSummaries: S.optional(EvaluationSummaries),
  }),
).annotate({
  identifier: "ListEvaluationJobsResponse",
}) as any as S.Schema<ListEvaluationJobsResponse>;
export type OfferType = "ALL" | "PUBLIC" | (string & {});
export const OfferType = /*@__PURE__*/ S.String;

export interface ListFoundationModelAgreementOffersRequest {
  modelId: string;
  offerType?: OfferType;
}
export const ListFoundationModelAgreementOffersRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      modelId: S.String.pipe(T.HttpLabel("modelId")),
      offerType: S.optional(OfferType).pipe(T.HttpQuery("offerType")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/list-foundation-model-agreement-offers/{modelId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListFoundationModelAgreementOffersRequest",
  }) as any as S.Schema<ListFoundationModelAgreementOffersRequest>;
export type OfferId = string;
export interface DimensionalPriceRate {
  dimension?: string;
  price?: string;
  description?: string;
  unit?: string;
}
export const DimensionalPriceRate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dimension: S.optional(S.String),
    price: S.optional(S.String),
    description: S.optional(S.String),
    unit: S.optional(S.String),
  }),
).annotate({
  identifier: "DimensionalPriceRate",
}) as any as S.Schema<DimensionalPriceRate>;
export type RateCard = DimensionalPriceRate[];
export const RateCard = /*@__PURE__*/ S.Array(DimensionalPriceRate);
export interface PricingTerm {
  rateCard: DimensionalPriceRate[];
}
export const PricingTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ rateCard: RateCard }),
).annotate({ identifier: "PricingTerm" }) as any as S.Schema<PricingTerm>;
export interface LegalTerm {
  url?: string;
}
export const LegalTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ url: S.optional(S.String) }),
).annotate({ identifier: "LegalTerm" }) as any as S.Schema<LegalTerm>;
export interface SupportTerm {
  refundPolicyDescription?: string;
}
export const SupportTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ refundPolicyDescription: S.optional(S.String) }),
).annotate({ identifier: "SupportTerm" }) as any as S.Schema<SupportTerm>;
export interface ValidityTerm {
  agreementDuration?: string;
}
export const ValidityTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agreementDuration: S.optional(S.String) }),
).annotate({ identifier: "ValidityTerm" }) as any as S.Schema<ValidityTerm>;
export interface TermDetails {
  usageBasedPricingTerm: PricingTerm;
  legalTerm: LegalTerm;
  supportTerm: SupportTerm;
  validityTerm?: ValidityTerm;
}
export const TermDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    usageBasedPricingTerm: PricingTerm,
    legalTerm: LegalTerm,
    supportTerm: SupportTerm,
    validityTerm: S.optional(ValidityTerm),
  }),
).annotate({ identifier: "TermDetails" }) as any as S.Schema<TermDetails>;
export interface Offer {
  offerId?: string;
  offerToken: string;
  termDetails: TermDetails;
}
export const Offer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    offerId: S.optional(S.String),
    offerToken: S.String,
    termDetails: TermDetails,
  }),
).annotate({ identifier: "Offer" }) as any as S.Schema<Offer>;
export type Offers = Offer[];
export const Offers = /*@__PURE__*/ S.Array(Offer);
export interface ListFoundationModelAgreementOffersResponse {
  modelId: string;
  offers: Offer[];
}
export const ListFoundationModelAgreementOffersResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ modelId: S.String, offers: Offers }),
  ).annotate({
    identifier: "ListFoundationModelAgreementOffersResponse",
  }) as any as S.Schema<ListFoundationModelAgreementOffersResponse>;
export type Provider = string;
export interface ListFoundationModelsRequest {
  byProvider?: string;
  byCustomizationType?: ModelCustomization;
  byOutputModality?: ModelModality;
  byInferenceType?: InferenceType;
}
export const ListFoundationModelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    byProvider: S.optional(S.String).pipe(T.HttpQuery("byProvider")),
    byCustomizationType: S.optional(ModelCustomization).pipe(
      T.HttpQuery("byCustomizationType"),
    ),
    byOutputModality: S.optional(ModelModality).pipe(
      T.HttpQuery("byOutputModality"),
    ),
    byInferenceType: S.optional(InferenceType).pipe(
      T.HttpQuery("byInferenceType"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/foundation-models" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFoundationModelsRequest",
}) as any as S.Schema<ListFoundationModelsRequest>;
export interface FoundationModelSummary {
  modelArn: string;
  modelId: string;
  modelName?: string;
  providerName?: string;
  inputModalities?: ModelModality[];
  outputModalities?: ModelModality[];
  responseStreamingSupported?: boolean;
  customizationsSupported?: ModelCustomization[];
  inferenceTypesSupported?: InferenceType[];
  modelLifecycle?: FoundationModelLifecycle;
}
export const FoundationModelSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelArn: S.String,
    modelId: S.String,
    modelName: S.optional(S.String),
    providerName: S.optional(S.String),
    inputModalities: S.optional(ModelModalityList),
    outputModalities: S.optional(ModelModalityList),
    responseStreamingSupported: S.optional(S.Boolean),
    customizationsSupported: S.optional(ModelCustomizationList),
    inferenceTypesSupported: S.optional(InferenceTypeList),
    modelLifecycle: S.optional(FoundationModelLifecycle),
  }),
).annotate({
  identifier: "FoundationModelSummary",
}) as any as S.Schema<FoundationModelSummary>;
export type FoundationModelSummaryList = FoundationModelSummary[];
export const FoundationModelSummaryList = /*@__PURE__*/ S.Array(
  FoundationModelSummary,
);
export interface ListFoundationModelsResponse {
  modelSummaries?: FoundationModelSummary[];
}
export const ListFoundationModelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ modelSummaries: S.optional(FoundationModelSummaryList) }),
).annotate({
  identifier: "ListFoundationModelsResponse",
}) as any as S.Schema<ListFoundationModelsResponse>;
export interface ListGuardrailsRequest {
  guardrailIdentifier?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListGuardrailsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    guardrailIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("guardrailIdentifier"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/guardrails" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGuardrailsRequest",
}) as any as S.Schema<ListGuardrailsRequest>;
export interface GuardrailSummary {
  id: string;
  arn: string;
  status: GuardrailStatus;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  version: string;
  createdAt: Date;
  updatedAt: Date;
  crossRegionDetails?: GuardrailCrossRegionDetails;
}
export const GuardrailSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    status: GuardrailStatus,
    name: SensitiveString,
    description: S.optional(SensitiveString),
    version: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    crossRegionDetails: S.optional(GuardrailCrossRegionDetails),
  }),
).annotate({
  identifier: "GuardrailSummary",
}) as any as S.Schema<GuardrailSummary>;
export type GuardrailSummaries = GuardrailSummary[];
export const GuardrailSummaries = /*@__PURE__*/ S.Array(GuardrailSummary);
export interface ListGuardrailsResponse {
  guardrails: GuardrailSummary[];
  nextToken?: string;
}
export const ListGuardrailsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ guardrails: GuardrailSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListGuardrailsResponse",
}) as any as S.Schema<ListGuardrailsResponse>;
export interface ListImportedModelsRequest {
  creationTimeBefore?: Date;
  creationTimeAfter?: Date;
  nameContains?: string;
  maxResults?: number;
  nextToken?: string;
  sortBy?: SortModelsBy;
  sortOrder?: SortOrder;
}
export const ListImportedModelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    creationTimeBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("creationTimeBefore")),
    creationTimeAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("creationTimeAfter")),
    nameContains: S.optional(S.String).pipe(T.HttpQuery("nameContains")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    sortBy: S.optional(SortModelsBy).pipe(T.HttpQuery("sortBy")),
    sortOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortOrder")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/imported-models" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListImportedModelsRequest",
}) as any as S.Schema<ListImportedModelsRequest>;
export type ModelArchitecture = string;
export interface ImportedModelSummary {
  modelArn: string;
  modelName: string;
  creationTime: Date;
  instructSupported?: boolean;
  modelArchitecture?: string;
}
export const ImportedModelSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelArn: S.String,
    modelName: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    instructSupported: S.optional(S.Boolean),
    modelArchitecture: S.optional(S.String),
  }),
).annotate({
  identifier: "ImportedModelSummary",
}) as any as S.Schema<ImportedModelSummary>;
export type ImportedModelSummaryList = ImportedModelSummary[];
export const ImportedModelSummaryList =
  /*@__PURE__*/ S.Array(ImportedModelSummary);
export interface ListImportedModelsResponse {
  nextToken?: string;
  modelSummaries?: ImportedModelSummary[];
}
export const ListImportedModelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    modelSummaries: S.optional(ImportedModelSummaryList),
  }),
).annotate({
  identifier: "ListImportedModelsResponse",
}) as any as S.Schema<ListImportedModelsResponse>;
export interface ListInferenceProfilesRequest {
  maxResults?: number;
  nextToken?: string;
  typeEquals?: InferenceProfileType;
}
export const ListInferenceProfilesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    typeEquals: S.optional(InferenceProfileType).pipe(T.HttpQuery("type")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/inference-profiles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListInferenceProfilesRequest",
}) as any as S.Schema<ListInferenceProfilesRequest>;
export interface InferenceProfileSummary {
  inferenceProfileName: string;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  updatedAt?: Date;
  inferenceProfileArn: string;
  models: InferenceProfileModel[];
  inferenceProfileId: string;
  status: InferenceProfileStatus;
  type: InferenceProfileType;
}
export const InferenceProfileSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inferenceProfileName: S.String,
    description: S.optional(SensitiveString),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    inferenceProfileArn: S.String,
    models: InferenceProfileModels,
    inferenceProfileId: S.String,
    status: InferenceProfileStatus,
    type: InferenceProfileType,
  }),
).annotate({
  identifier: "InferenceProfileSummary",
}) as any as S.Schema<InferenceProfileSummary>;
export type InferenceProfileSummaries = InferenceProfileSummary[];
export const InferenceProfileSummaries = /*@__PURE__*/ S.Array(
  InferenceProfileSummary,
);
export interface ListInferenceProfilesResponse {
  inferenceProfileSummaries?: InferenceProfileSummary[];
  nextToken?: string;
}
export const ListInferenceProfilesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inferenceProfileSummaries: S.optional(InferenceProfileSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListInferenceProfilesResponse",
}) as any as S.Schema<ListInferenceProfilesResponse>;
export interface ListMarketplaceModelEndpointsRequest {
  maxResults?: number;
  nextToken?: string;
  modelSourceEquals?: string;
}
export const ListMarketplaceModelEndpointsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      modelSourceEquals: S.optional(S.String).pipe(
        T.HttpQuery("modelSourceIdentifier"),
      ),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/marketplace-model/endpoints" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListMarketplaceModelEndpointsRequest",
}) as any as S.Schema<ListMarketplaceModelEndpointsRequest>;
export interface MarketplaceModelEndpointSummary {
  endpointArn: string;
  modelSourceIdentifier: string;
  status?: Status;
  statusMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}
export const MarketplaceModelEndpointSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    endpointArn: S.String,
    modelSourceIdentifier: S.String,
    status: S.optional(Status),
    statusMessage: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "MarketplaceModelEndpointSummary",
}) as any as S.Schema<MarketplaceModelEndpointSummary>;
export type MarketplaceModelEndpointSummaries =
  MarketplaceModelEndpointSummary[];
export const MarketplaceModelEndpointSummaries = /*@__PURE__*/ S.Array(
  MarketplaceModelEndpointSummary,
);
export interface ListMarketplaceModelEndpointsResponse {
  marketplaceModelEndpoints?: MarketplaceModelEndpointSummary[];
  nextToken?: string;
}
export const ListMarketplaceModelEndpointsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      marketplaceModelEndpoints: S.optional(MarketplaceModelEndpointSummaries),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListMarketplaceModelEndpointsResponse",
}) as any as S.Schema<ListMarketplaceModelEndpointsResponse>;
export interface ListModelCopyJobsRequest {
  creationTimeAfter?: Date;
  creationTimeBefore?: Date;
  statusEquals?: ModelCopyJobStatus;
  sourceAccountEquals?: string;
  sourceModelArnEquals?: string;
  targetModelNameContains?: string;
  maxResults?: number;
  nextToken?: string;
  sortBy?: SortJobsBy;
  sortOrder?: SortOrder;
}
export const ListModelCopyJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    creationTimeAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("creationTimeAfter")),
    creationTimeBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("creationTimeBefore")),
    statusEquals: S.optional(ModelCopyJobStatus).pipe(
      T.HttpQuery("statusEquals"),
    ),
    sourceAccountEquals: S.optional(S.String).pipe(
      T.HttpQuery("sourceAccountEquals"),
    ),
    sourceModelArnEquals: S.optional(S.String).pipe(
      T.HttpQuery("sourceModelArnEquals"),
    ),
    targetModelNameContains: S.optional(S.String).pipe(
      T.HttpQuery("outputModelNameContains"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    sortBy: S.optional(SortJobsBy).pipe(T.HttpQuery("sortBy")),
    sortOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortOrder")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/model-copy-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListModelCopyJobsRequest",
}) as any as S.Schema<ListModelCopyJobsRequest>;
export interface ModelCopyJobSummary {
  jobArn: string;
  status: ModelCopyJobStatus;
  creationTime: Date;
  targetModelArn: string;
  targetModelName?: string;
  sourceAccountId: string;
  sourceModelArn: string;
  targetModelKmsKeyArn?: string;
  targetModelTags?: Tag[];
  failureMessage?: string;
  sourceModelName?: string;
}
export const ModelCopyJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobArn: S.String,
    status: ModelCopyJobStatus,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    targetModelArn: S.String,
    targetModelName: S.optional(S.String),
    sourceAccountId: S.String,
    sourceModelArn: S.String,
    targetModelKmsKeyArn: S.optional(S.String),
    targetModelTags: S.optional(TagList),
    failureMessage: S.optional(S.String),
    sourceModelName: S.optional(S.String),
  }),
).annotate({
  identifier: "ModelCopyJobSummary",
}) as any as S.Schema<ModelCopyJobSummary>;
export type ModelCopyJobSummaries = ModelCopyJobSummary[];
export const ModelCopyJobSummaries = /*@__PURE__*/ S.Array(ModelCopyJobSummary);
export interface ListModelCopyJobsResponse {
  nextToken?: string;
  modelCopyJobSummaries?: ModelCopyJobSummary[];
}
export const ListModelCopyJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    modelCopyJobSummaries: S.optional(ModelCopyJobSummaries),
  }),
).annotate({
  identifier: "ListModelCopyJobsResponse",
}) as any as S.Schema<ListModelCopyJobsResponse>;
export type FineTuningJobStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | (string & {});
export const FineTuningJobStatus = /*@__PURE__*/ S.String;

export interface ListModelCustomizationJobsRequest {
  creationTimeAfter?: Date;
  creationTimeBefore?: Date;
  statusEquals?: FineTuningJobStatus;
  nameContains?: string;
  maxResults?: number;
  nextToken?: string;
  sortBy?: SortJobsBy;
  sortOrder?: SortOrder;
}
export const ListModelCustomizationJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    creationTimeAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("creationTimeAfter")),
    creationTimeBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("creationTimeBefore")),
    statusEquals: S.optional(FineTuningJobStatus).pipe(
      T.HttpQuery("statusEquals"),
    ),
    nameContains: S.optional(S.String).pipe(T.HttpQuery("nameContains")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    sortBy: S.optional(SortJobsBy).pipe(T.HttpQuery("sortBy")),
    sortOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortOrder")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/model-customization-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListModelCustomizationJobsRequest",
}) as any as S.Schema<ListModelCustomizationJobsRequest>;
export interface ModelCustomizationJobSummary {
  jobArn: string;
  baseModelArn: string;
  jobName: string;
  status: ModelCustomizationJobStatus;
  statusDetails?: StatusDetails;
  lastModifiedTime?: Date;
  creationTime: Date;
  endTime?: Date;
  customModelArn?: string;
  customModelName?: string;
  customizationType?: CustomizationType;
}
export const ModelCustomizationJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobArn: S.String,
    baseModelArn: S.String,
    jobName: S.String,
    status: ModelCustomizationJobStatus,
    statusDetails: S.optional(StatusDetails),
    lastModifiedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    customModelArn: S.optional(S.String),
    customModelName: S.optional(S.String),
    customizationType: S.optional(CustomizationType),
  }),
).annotate({
  identifier: "ModelCustomizationJobSummary",
}) as any as S.Schema<ModelCustomizationJobSummary>;
export type ModelCustomizationJobSummaries = ModelCustomizationJobSummary[];
export const ModelCustomizationJobSummaries = /*@__PURE__*/ S.Array(
  ModelCustomizationJobSummary,
);
export interface ListModelCustomizationJobsResponse {
  nextToken?: string;
  modelCustomizationJobSummaries?: ModelCustomizationJobSummary[];
}
export const ListModelCustomizationJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    modelCustomizationJobSummaries: S.optional(ModelCustomizationJobSummaries),
  }),
).annotate({
  identifier: "ListModelCustomizationJobsResponse",
}) as any as S.Schema<ListModelCustomizationJobsResponse>;
export interface ListModelImportJobsRequest {
  creationTimeAfter?: Date;
  creationTimeBefore?: Date;
  statusEquals?: ModelImportJobStatus;
  nameContains?: string;
  maxResults?: number;
  nextToken?: string;
  sortBy?: SortJobsBy;
  sortOrder?: SortOrder;
}
export const ListModelImportJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    creationTimeAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("creationTimeAfter")),
    creationTimeBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("creationTimeBefore")),
    statusEquals: S.optional(ModelImportJobStatus).pipe(
      T.HttpQuery("statusEquals"),
    ),
    nameContains: S.optional(S.String).pipe(T.HttpQuery("nameContains")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    sortBy: S.optional(SortJobsBy).pipe(T.HttpQuery("sortBy")),
    sortOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortOrder")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/model-import-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListModelImportJobsRequest",
}) as any as S.Schema<ListModelImportJobsRequest>;
export interface ModelImportJobSummary {
  jobArn: string;
  jobName: string;
  status: ModelImportJobStatus;
  lastModifiedTime?: Date;
  creationTime: Date;
  endTime?: Date;
  importedModelArn?: string;
  importedModelName?: string;
}
export const ModelImportJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobArn: S.String,
    jobName: S.String,
    status: ModelImportJobStatus,
    lastModifiedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    importedModelArn: S.optional(S.String),
    importedModelName: S.optional(S.String),
  }),
).annotate({
  identifier: "ModelImportJobSummary",
}) as any as S.Schema<ModelImportJobSummary>;
export type ModelImportJobSummaries = ModelImportJobSummary[];
export const ModelImportJobSummaries = /*@__PURE__*/ S.Array(
  ModelImportJobSummary,
);
export interface ListModelImportJobsResponse {
  nextToken?: string;
  modelImportJobSummaries?: ModelImportJobSummary[];
}
export const ListModelImportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    modelImportJobSummaries: S.optional(ModelImportJobSummaries),
  }),
).annotate({
  identifier: "ListModelImportJobsResponse",
}) as any as S.Schema<ListModelImportJobsResponse>;
export interface ListModelInvocationJobsRequest {
  submitTimeAfter?: Date;
  submitTimeBefore?: Date;
  statusEquals?: ModelInvocationJobStatus;
  nameContains?: string;
  maxResults?: number;
  nextToken?: string;
  sortBy?: SortJobsBy;
  sortOrder?: SortOrder;
}
export const ListModelInvocationJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    submitTimeAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("submitTimeAfter")),
    submitTimeBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("submitTimeBefore")),
    statusEquals: S.optional(ModelInvocationJobStatus).pipe(
      T.HttpQuery("statusEquals"),
    ),
    nameContains: S.optional(S.String).pipe(T.HttpQuery("nameContains")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    sortBy: S.optional(SortJobsBy).pipe(T.HttpQuery("sortBy")),
    sortOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortOrder")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/model-invocation-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListModelInvocationJobsRequest",
}) as any as S.Schema<ListModelInvocationJobsRequest>;
export interface ModelInvocationJobSummary {
  jobArn: string;
  jobName: string;
  modelId: string;
  clientRequestToken?: string;
  roleArn: string;
  status?: ModelInvocationJobStatus;
  message?: string | redacted.Redacted<string>;
  submitTime: Date;
  lastModifiedTime?: Date;
  endTime?: Date;
  inputDataConfig: ModelInvocationJobInputDataConfig;
  outputDataConfig: ModelInvocationJobOutputDataConfig;
  vpcConfig?: VpcConfig;
  timeoutDurationInHours?: number;
  jobExpirationTime?: Date;
  modelInvocationType?: ModelInvocationType;
  totalRecordCount?: number;
  processedRecordCount?: number;
  successRecordCount?: number;
  errorRecordCount?: number;
}
export const ModelInvocationJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobArn: S.String,
    jobName: S.String,
    modelId: S.String,
    clientRequestToken: S.optional(S.String),
    roleArn: S.String,
    status: S.optional(ModelInvocationJobStatus),
    message: S.optional(SensitiveString),
    submitTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModifiedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    inputDataConfig: ModelInvocationJobInputDataConfig,
    outputDataConfig: ModelInvocationJobOutputDataConfig,
    vpcConfig: S.optional(VpcConfig),
    timeoutDurationInHours: S.optional(S.Number),
    jobExpirationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    modelInvocationType: S.optional(ModelInvocationType),
    totalRecordCount: S.optional(S.Number),
    processedRecordCount: S.optional(S.Number),
    successRecordCount: S.optional(S.Number),
    errorRecordCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "ModelInvocationJobSummary",
}) as any as S.Schema<ModelInvocationJobSummary>;
export type ModelInvocationJobSummaries = ModelInvocationJobSummary[];
export const ModelInvocationJobSummaries = /*@__PURE__*/ S.Array(
  ModelInvocationJobSummary,
);
export interface ListModelInvocationJobsResponse {
  nextToken?: string;
  invocationJobSummaries?: ModelInvocationJobSummary[];
}
export const ListModelInvocationJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    invocationJobSummaries: S.optional(ModelInvocationJobSummaries),
  }),
).annotate({
  identifier: "ListModelInvocationJobsResponse",
}) as any as S.Schema<ListModelInvocationJobsResponse>;
export interface ListPromptRoutersRequest {
  maxResults?: number;
  nextToken?: string;
  type?: PromptRouterType;
}
export const ListPromptRoutersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    type: S.optional(PromptRouterType).pipe(T.HttpQuery("type")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prompt-routers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPromptRoutersRequest",
}) as any as S.Schema<ListPromptRoutersRequest>;
export interface PromptRouterSummary {
  promptRouterName: string;
  routingCriteria: RoutingCriteria;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  updatedAt?: Date;
  promptRouterArn: string;
  models: PromptRouterTargetModel[];
  fallbackModel: PromptRouterTargetModel;
  status: PromptRouterStatus;
  type: PromptRouterType;
}
export const PromptRouterSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    promptRouterName: S.String,
    routingCriteria: RoutingCriteria,
    description: S.optional(SensitiveString),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    promptRouterArn: S.String,
    models: PromptRouterTargetModels,
    fallbackModel: PromptRouterTargetModel,
    status: PromptRouterStatus,
    type: PromptRouterType,
  }),
).annotate({
  identifier: "PromptRouterSummary",
}) as any as S.Schema<PromptRouterSummary>;
export type PromptRouterSummaries = PromptRouterSummary[];
export const PromptRouterSummaries = /*@__PURE__*/ S.Array(PromptRouterSummary);
export interface ListPromptRoutersResponse {
  promptRouterSummaries?: (PromptRouterSummary & {
    models: (PromptRouterTargetModel & {
      modelArn: PromptRouterTargetModelArn;
    })[];
    fallbackModel: PromptRouterTargetModel & {
      modelArn: PromptRouterTargetModelArn;
    };
  })[];
  nextToken?: string;
}
export const ListPromptRoutersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    promptRouterSummaries: S.optional(PromptRouterSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPromptRoutersResponse",
}) as any as S.Schema<ListPromptRoutersResponse>;
export type SortByProvisionedModels = "CreationTime" | (string & {});
export const SortByProvisionedModels = /*@__PURE__*/ S.String;

export interface ListProvisionedModelThroughputsRequest {
  creationTimeAfter?: Date;
  creationTimeBefore?: Date;
  statusEquals?: ProvisionedModelStatus;
  modelArnEquals?: string;
  nameContains?: string;
  maxResults?: number;
  nextToken?: string;
  sortBy?: SortByProvisionedModels;
  sortOrder?: SortOrder;
}
export const ListProvisionedModelThroughputsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      creationTimeAfter: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ).pipe(T.HttpQuery("creationTimeAfter")),
      creationTimeBefore: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ).pipe(T.HttpQuery("creationTimeBefore")),
      statusEquals: S.optional(ProvisionedModelStatus).pipe(
        T.HttpQuery("statusEquals"),
      ),
      modelArnEquals: S.optional(S.String).pipe(T.HttpQuery("modelArnEquals")),
      nameContains: S.optional(S.String).pipe(T.HttpQuery("nameContains")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      sortBy: S.optional(SortByProvisionedModels).pipe(T.HttpQuery("sortBy")),
      sortOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortOrder")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/provisioned-model-throughputs" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListProvisionedModelThroughputsRequest",
}) as any as S.Schema<ListProvisionedModelThroughputsRequest>;
export interface ProvisionedModelSummary {
  provisionedModelName: string;
  provisionedModelArn: string;
  modelArn: string;
  desiredModelArn: string;
  foundationModelArn: string;
  modelUnits: number;
  desiredModelUnits: number;
  status: ProvisionedModelStatus;
  commitmentDuration?: CommitmentDuration;
  commitmentExpirationTime?: Date;
  creationTime: Date;
  lastModifiedTime: Date;
}
export const ProvisionedModelSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    provisionedModelName: S.String,
    provisionedModelArn: S.String,
    modelArn: S.String,
    desiredModelArn: S.String,
    foundationModelArn: S.String,
    modelUnits: S.Number,
    desiredModelUnits: S.Number,
    status: ProvisionedModelStatus,
    commitmentDuration: S.optional(CommitmentDuration),
    commitmentExpirationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModifiedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "ProvisionedModelSummary",
}) as any as S.Schema<ProvisionedModelSummary>;
export type ProvisionedModelSummaries = ProvisionedModelSummary[];
export const ProvisionedModelSummaries = /*@__PURE__*/ S.Array(
  ProvisionedModelSummary,
);
export interface ListProvisionedModelThroughputsResponse {
  nextToken?: string;
  provisionedModelSummaries?: ProvisionedModelSummary[];
}
export const ListProvisionedModelThroughputsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      provisionedModelSummaries: S.optional(ProvisionedModelSummaries),
    }),
).annotate({
  identifier: "ListProvisionedModelThroughputsResponse",
}) as any as S.Schema<ListProvisionedModelThroughputsResponse>;
export type TaggableResourcesArn = string;
export interface ListTagsForResourceRequest {
  resourceARN: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceARN: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/listTagsForResource" }),
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
  tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PutAccountDataRetentionRequest {
  mode: DataRetentionMode;
}
export const PutAccountDataRetentionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ mode: DataRetentionMode }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/data-retention" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutAccountDataRetentionRequest",
}) as any as S.Schema<PutAccountDataRetentionRequest>;
export interface PutAccountDataRetentionResponse {
  mode: DataRetentionMode;
  updatedAt?: Date;
}
export const PutAccountDataRetentionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mode: DataRetentionMode,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "PutAccountDataRetentionResponse",
}) as any as S.Schema<PutAccountDataRetentionResponse>;
export interface AccountEnforcedGuardrailInferenceInputConfiguration {
  guardrailIdentifier: string;
  guardrailVersion: string;
  selectiveContentGuarding?: SelectiveContentGuarding;
  modelEnforcement?: ModelEnforcement;
}
export const AccountEnforcedGuardrailInferenceInputConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      guardrailIdentifier: S.String,
      guardrailVersion: S.String,
      selectiveContentGuarding: S.optional(SelectiveContentGuarding),
      modelEnforcement: S.optional(ModelEnforcement),
    }),
  ).annotate({
    identifier: "AccountEnforcedGuardrailInferenceInputConfiguration",
  }) as any as S.Schema<AccountEnforcedGuardrailInferenceInputConfiguration>;
export interface PutEnforcedGuardrailConfigurationRequest {
  configId?: string;
  guardrailInferenceConfig: AccountEnforcedGuardrailInferenceInputConfiguration;
}
export const PutEnforcedGuardrailConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      configId: S.optional(S.String),
      guardrailInferenceConfig:
        AccountEnforcedGuardrailInferenceInputConfiguration,
    }).pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/enforcedGuardrailsConfiguration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutEnforcedGuardrailConfigurationRequest",
}) as any as S.Schema<PutEnforcedGuardrailConfigurationRequest>;
export interface PutEnforcedGuardrailConfigurationResponse {
  configId?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export const PutEnforcedGuardrailConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      configId: S.optional(S.String),
      updatedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      updatedBy: S.optional(S.String),
    }),
  ).annotate({
    identifier: "PutEnforcedGuardrailConfigurationResponse",
  }) as any as S.Schema<PutEnforcedGuardrailConfigurationResponse>;
export interface PutModelInvocationLoggingConfigurationRequest {
  loggingConfig: LoggingConfig;
}
export const PutModelInvocationLoggingConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ loggingConfig: LoggingConfig }).pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/logging/modelinvocations" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "PutModelInvocationLoggingConfigurationRequest",
  }) as any as S.Schema<PutModelInvocationLoggingConfigurationRequest>;
export interface PutModelInvocationLoggingConfigurationResponse {}
export const PutModelInvocationLoggingConfigurationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "PutModelInvocationLoggingConfigurationResponse",
  }) as any as S.Schema<PutModelInvocationLoggingConfigurationResponse>;
export interface PutResourcePolicyRequest {
  resourceArn: string;
  resourcePolicy: string;
}
export const PutResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, resourcePolicy: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/resource-policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutResourcePolicyRequest",
}) as any as S.Schema<PutResourcePolicyRequest>;
export interface PutResourcePolicyResponse {
  resourceArn?: string;
}
export const PutResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.optional(S.String) }),
).annotate({
  identifier: "PutResourcePolicyResponse",
}) as any as S.Schema<PutResourcePolicyResponse>;
export interface PutUseCaseForModelAccessRequest {
  formData: Uint8Array;
}
export const PutUseCaseForModelAccessRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ formData: T.Blob }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/use-case-for-model-access" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutUseCaseForModelAccessRequest",
}) as any as S.Schema<PutUseCaseForModelAccessRequest>;
export interface PutUseCaseForModelAccessResponse {}
export const PutUseCaseForModelAccessResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutUseCaseForModelAccessResponse",
}) as any as S.Schema<PutUseCaseForModelAccessResponse>;
export interface RegisterMarketplaceModelEndpointRequest {
  endpointIdentifier: string;
  modelSourceIdentifier: string;
}
export const RegisterMarketplaceModelEndpointRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      endpointIdentifier: S.String.pipe(T.HttpLabel("endpointIdentifier")),
      modelSourceIdentifier: S.String,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/marketplace-model/endpoints/{endpointIdentifier}/registration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "RegisterMarketplaceModelEndpointRequest",
}) as any as S.Schema<RegisterMarketplaceModelEndpointRequest>;
export interface RegisterMarketplaceModelEndpointResponse {
  marketplaceModelEndpoint: MarketplaceModelEndpoint;
}
export const RegisterMarketplaceModelEndpointResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ marketplaceModelEndpoint: MarketplaceModelEndpoint }),
).annotate({
  identifier: "RegisterMarketplaceModelEndpointResponse",
}) as any as S.Schema<RegisterMarketplaceModelEndpointResponse>;
export interface AutomatedReasoningPolicyBuildWorkflowDocument {
  document: Uint8Array | redacted.Redacted<Uint8Array>;
  documentContentType: AutomatedReasoningPolicyBuildDocumentContentType;
  documentName: string | redacted.Redacted<string>;
  documentDescription?: string | redacted.Redacted<string>;
}
export const AutomatedReasoningPolicyBuildWorkflowDocument =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      document: SensitiveBlob,
      documentContentType: AutomatedReasoningPolicyBuildDocumentContentType,
      documentName: SensitiveString,
      documentDescription: S.optional(SensitiveString),
    }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyBuildWorkflowDocument",
  }) as any as S.Schema<AutomatedReasoningPolicyBuildWorkflowDocument>;
export type AutomatedReasoningPolicyBuildWorkflowDocumentList =
  AutomatedReasoningPolicyBuildWorkflowDocument[];
export const AutomatedReasoningPolicyBuildWorkflowDocumentList =
  /*@__PURE__*/ S.Array(AutomatedReasoningPolicyBuildWorkflowDocument);
export interface AutomatedReasoningPolicyBuildWorkflowRepairContent {
  annotations: AutomatedReasoningPolicyAnnotation[];
}
export const AutomatedReasoningPolicyBuildWorkflowRepairContent =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ annotations: AutomatedReasoningPolicyAnnotationList }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyBuildWorkflowRepairContent",
  }) as any as S.Schema<AutomatedReasoningPolicyBuildWorkflowRepairContent>;
export type AutomatedReasoningPolicyGenerateFidelityReportDocumentList =
  AutomatedReasoningPolicyBuildWorkflowDocument[];
export const AutomatedReasoningPolicyGenerateFidelityReportDocumentList =
  /*@__PURE__*/ S.Array(AutomatedReasoningPolicyBuildWorkflowDocument);
export type AutomatedReasoningPolicyGenerateFidelityReportContent = {
  documents: AutomatedReasoningPolicyBuildWorkflowDocument[];
};
export const AutomatedReasoningPolicyGenerateFidelityReportContent =
  /*@__PURE__*/ S.Union([
    S.Struct({
      documents: AutomatedReasoningPolicyGenerateFidelityReportDocumentList,
    }),
  ]);
export type AutomatedReasoningPolicyIterativeRefinementDocumentList =
  AutomatedReasoningPolicyBuildWorkflowDocument[];
export const AutomatedReasoningPolicyIterativeRefinementDocumentList =
  /*@__PURE__*/ S.Array(AutomatedReasoningPolicyBuildWorkflowDocument);
export type AutomatedReasoningPolicyBuildFeedback =
  | string
  | redacted.Redacted<string>;
export interface AutomatedReasoningPolicyIterativeRefinementContent {
  documents: AutomatedReasoningPolicyBuildWorkflowDocument[];
  feedback?: string | redacted.Redacted<string>;
}
export const AutomatedReasoningPolicyIterativeRefinementContent =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      documents: AutomatedReasoningPolicyIterativeRefinementDocumentList,
      feedback: S.optional(SensitiveString),
    }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyIterativeRefinementContent",
  }) as any as S.Schema<AutomatedReasoningPolicyIterativeRefinementContent>;
export type AutomatedReasoningPolicyWorkflowTypeContent =
  | {
      documents: AutomatedReasoningPolicyBuildWorkflowDocument[];
      policyRepairAssets?: never;
      generateFidelityReportContent?: never;
      iterativeRefinementContent?: never;
    }
  | {
      documents?: never;
      policyRepairAssets: AutomatedReasoningPolicyBuildWorkflowRepairContent;
      generateFidelityReportContent?: never;
      iterativeRefinementContent?: never;
    }
  | {
      documents?: never;
      policyRepairAssets?: never;
      generateFidelityReportContent: AutomatedReasoningPolicyGenerateFidelityReportContent;
      iterativeRefinementContent?: never;
    }
  | {
      documents?: never;
      policyRepairAssets?: never;
      generateFidelityReportContent?: never;
      iterativeRefinementContent: AutomatedReasoningPolicyIterativeRefinementContent;
    };
export const AutomatedReasoningPolicyWorkflowTypeContent =
  /*@__PURE__*/ S.Union([
    S.Struct({ documents: AutomatedReasoningPolicyBuildWorkflowDocumentList }),
    S.Struct({
      policyRepairAssets: AutomatedReasoningPolicyBuildWorkflowRepairContent,
    }),
    S.Struct({
      generateFidelityReportContent:
        AutomatedReasoningPolicyGenerateFidelityReportContent,
    }),
    S.Struct({
      iterativeRefinementContent:
        AutomatedReasoningPolicyIterativeRefinementContent,
    }),
  ]);
export interface AutomatedReasoningPolicyBuildWorkflowSource {
  policyDefinition?: AutomatedReasoningPolicyDefinition;
  workflowContent?: AutomatedReasoningPolicyWorkflowTypeContent;
}
export const AutomatedReasoningPolicyBuildWorkflowSource =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyDefinition: S.optional(AutomatedReasoningPolicyDefinition),
      workflowContent: S.optional(AutomatedReasoningPolicyWorkflowTypeContent),
    }),
  ).annotate({
    identifier: "AutomatedReasoningPolicyBuildWorkflowSource",
  }) as any as S.Schema<AutomatedReasoningPolicyBuildWorkflowSource>;
export interface StartAutomatedReasoningPolicyBuildWorkflowRequest {
  policyArn: string;
  buildWorkflowType: AutomatedReasoningPolicyBuildWorkflowType;
  clientRequestToken?: string;
  sourceContent: AutomatedReasoningPolicyBuildWorkflowSource;
}
export const StartAutomatedReasoningPolicyBuildWorkflowRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyArn: S.String.pipe(T.HttpLabel("policyArn")),
      buildWorkflowType: AutomatedReasoningPolicyBuildWorkflowType.pipe(
        T.HttpLabel("buildWorkflowType"),
      ),
      clientRequestToken: S.optional(S.String).pipe(
        T.HttpHeader("x-amz-client-token"),
        T.IdempotencyToken(),
      ),
      sourceContent: AutomatedReasoningPolicyBuildWorkflowSource.pipe(
        T.HttpPayload(),
      ).annotate({ identifier: "AutomatedReasoningPolicyBuildWorkflowSource" }),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowType}/start",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "StartAutomatedReasoningPolicyBuildWorkflowRequest",
  }) as any as S.Schema<StartAutomatedReasoningPolicyBuildWorkflowRequest>;
export interface StartAutomatedReasoningPolicyBuildWorkflowResponse {
  policyArn: string;
  buildWorkflowId: string;
}
export const StartAutomatedReasoningPolicyBuildWorkflowResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ policyArn: S.String, buildWorkflowId: S.String }),
  ).annotate({
    identifier: "StartAutomatedReasoningPolicyBuildWorkflowResponse",
  }) as any as S.Schema<StartAutomatedReasoningPolicyBuildWorkflowResponse>;
export type AutomatedReasoningPolicyTestCaseIdList = string[];
export const AutomatedReasoningPolicyTestCaseIdList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface StartAutomatedReasoningPolicyTestWorkflowRequest {
  policyArn: string;
  buildWorkflowId: string;
  testCaseIds?: string[];
  clientRequestToken?: string;
}
export const StartAutomatedReasoningPolicyTestWorkflowRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyArn: S.String.pipe(T.HttpLabel("policyArn")),
      buildWorkflowId: S.String.pipe(T.HttpLabel("buildWorkflowId")),
      testCaseIds: S.optional(AutomatedReasoningPolicyTestCaseIdList),
      clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}/test-workflows",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "StartAutomatedReasoningPolicyTestWorkflowRequest",
  }) as any as S.Schema<StartAutomatedReasoningPolicyTestWorkflowRequest>;
export interface StartAutomatedReasoningPolicyTestWorkflowResponse {
  policyArn: string;
}
export const StartAutomatedReasoningPolicyTestWorkflowResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({ policyArn: S.String })).annotate({
    identifier: "StartAutomatedReasoningPolicyTestWorkflowResponse",
  }) as any as S.Schema<StartAutomatedReasoningPolicyTestWorkflowResponse>;
export interface StopAdvancedPromptOptimizationJobRequest {
  jobIdentifier: string;
}
export const StopAdvancedPromptOptimizationJobRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      jobIdentifier: S.String.pipe(T.HttpLabel("jobIdentifier")),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/advanced-prompt-optimization-jobs/{jobIdentifier}/stop",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "StopAdvancedPromptOptimizationJobRequest",
}) as any as S.Schema<StopAdvancedPromptOptimizationJobRequest>;
export interface StopAdvancedPromptOptimizationJobResponse {}
export const StopAdvancedPromptOptimizationJobResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "StopAdvancedPromptOptimizationJobResponse",
  }) as any as S.Schema<StopAdvancedPromptOptimizationJobResponse>;
export interface StopEvaluationJobRequest {
  jobIdentifier: string | redacted.Redacted<string>;
}
export const StopEvaluationJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobIdentifier: SensitiveString.pipe(T.HttpLabel("jobIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/evaluation-job/{jobIdentifier}/stop" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopEvaluationJobRequest",
}) as any as S.Schema<StopEvaluationJobRequest>;
export interface StopEvaluationJobResponse {}
export const StopEvaluationJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopEvaluationJobResponse",
}) as any as S.Schema<StopEvaluationJobResponse>;
export interface StopModelCustomizationJobRequest {
  jobIdentifier: string;
}
export const StopModelCustomizationJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobIdentifier: S.String.pipe(T.HttpLabel("jobIdentifier")) }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/model-customization-jobs/{jobIdentifier}/stop",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopModelCustomizationJobRequest",
}) as any as S.Schema<StopModelCustomizationJobRequest>;
export interface StopModelCustomizationJobResponse {}
export const StopModelCustomizationJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopModelCustomizationJobResponse",
}) as any as S.Schema<StopModelCustomizationJobResponse>;
export interface StopModelInvocationJobRequest {
  jobIdentifier: string;
}
export const StopModelInvocationJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobIdentifier: S.String.pipe(T.HttpLabel("jobIdentifier")) }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/model-invocation-job/{jobIdentifier}/stop",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopModelInvocationJobRequest",
}) as any as S.Schema<StopModelInvocationJobRequest>;
export interface StopModelInvocationJobResponse {}
export const StopModelInvocationJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopModelInvocationJobResponse",
}) as any as S.Schema<StopModelInvocationJobResponse>;
export interface TagResourceRequest {
  resourceARN: string;
  tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceARN: S.String, tags: TagList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tagResource" }),
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
  resourceARN: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceARN: S.String, tagKeys: TagKeyList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/untagResource" }),
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
export interface UpdateAutomatedReasoningPolicyRequest {
  policyArn: string;
  policyDefinition: AutomatedReasoningPolicyDefinition;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
}
export const UpdateAutomatedReasoningPolicyRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      policyArn: S.String.pipe(T.HttpLabel("policyArn")),
      policyDefinition: AutomatedReasoningPolicyDefinition,
      name: S.optional(SensitiveString),
      description: S.optional(SensitiveString),
    }).pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/automated-reasoning-policies/{policyArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateAutomatedReasoningPolicyRequest",
}) as any as S.Schema<UpdateAutomatedReasoningPolicyRequest>;
export interface UpdateAutomatedReasoningPolicyResponse {
  policyArn: string;
  name: string | redacted.Redacted<string>;
  definitionHash: string;
  updatedAt: Date;
}
export const UpdateAutomatedReasoningPolicyResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      policyArn: S.String,
      name: SensitiveString,
      definitionHash: S.String,
      updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    }),
).annotate({
  identifier: "UpdateAutomatedReasoningPolicyResponse",
}) as any as S.Schema<UpdateAutomatedReasoningPolicyResponse>;
export interface UpdateAutomatedReasoningPolicyAnnotationsRequest {
  policyArn: string;
  buildWorkflowId: string;
  annotations: AutomatedReasoningPolicyAnnotation[];
  lastUpdatedAnnotationSetHash: string;
}
export const UpdateAutomatedReasoningPolicyAnnotationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyArn: S.String.pipe(T.HttpLabel("policyArn")),
      buildWorkflowId: S.String.pipe(T.HttpLabel("buildWorkflowId")),
      annotations: AutomatedReasoningPolicyAnnotationList,
      lastUpdatedAnnotationSetHash: S.String,
    }).pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}/annotations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateAutomatedReasoningPolicyAnnotationsRequest",
  }) as any as S.Schema<UpdateAutomatedReasoningPolicyAnnotationsRequest>;
export interface UpdateAutomatedReasoningPolicyAnnotationsResponse {
  policyArn: string;
  buildWorkflowId: string;
  annotationSetHash: string;
  updatedAt: Date;
}
export const UpdateAutomatedReasoningPolicyAnnotationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyArn: S.String,
      buildWorkflowId: S.String,
      annotationSetHash: S.String,
      updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    }),
  ).annotate({
    identifier: "UpdateAutomatedReasoningPolicyAnnotationsResponse",
  }) as any as S.Schema<UpdateAutomatedReasoningPolicyAnnotationsResponse>;
export interface UpdateAutomatedReasoningPolicyTestCaseRequest {
  policyArn: string;
  testCaseId: string;
  guardContent: string | redacted.Redacted<string>;
  queryContent?: string | redacted.Redacted<string>;
  lastUpdatedAt: Date;
  expectedAggregatedFindingsResult: AutomatedReasoningCheckResult;
  confidenceThreshold?: number;
  clientRequestToken?: string;
}
export const UpdateAutomatedReasoningPolicyTestCaseRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      policyArn: S.String.pipe(T.HttpLabel("policyArn")),
      testCaseId: S.String.pipe(T.HttpLabel("testCaseId")),
      guardContent: SensitiveString,
      queryContent: S.optional(SensitiveString),
      lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      expectedAggregatedFindingsResult: AutomatedReasoningCheckResult,
      confidenceThreshold: S.optional(S.Number),
      clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/automated-reasoning-policies/{policyArn}/test-cases/{testCaseId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateAutomatedReasoningPolicyTestCaseRequest",
  }) as any as S.Schema<UpdateAutomatedReasoningPolicyTestCaseRequest>;
export interface UpdateAutomatedReasoningPolicyTestCaseResponse {
  policyArn: string;
  testCaseId: string;
}
export const UpdateAutomatedReasoningPolicyTestCaseResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ policyArn: S.String, testCaseId: S.String }),
  ).annotate({
    identifier: "UpdateAutomatedReasoningPolicyTestCaseResponse",
  }) as any as S.Schema<UpdateAutomatedReasoningPolicyTestCaseResponse>;
export interface UpdateCustomModelDeploymentRequest {
  modelArn: string;
  customModelDeploymentIdentifier: string;
}
export const UpdateCustomModelDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelArn: S.String,
    customModelDeploymentIdentifier: S.String.pipe(
      T.HttpLabel("customModelDeploymentIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/model-customization/custom-model-deployments/{customModelDeploymentIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCustomModelDeploymentRequest",
}) as any as S.Schema<UpdateCustomModelDeploymentRequest>;
export interface UpdateCustomModelDeploymentResponse {
  customModelDeploymentArn: string;
}
export const UpdateCustomModelDeploymentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ customModelDeploymentArn: S.String }),
).annotate({
  identifier: "UpdateCustomModelDeploymentResponse",
}) as any as S.Schema<UpdateCustomModelDeploymentResponse>;
export interface UpdateGuardrailRequest {
  guardrailIdentifier: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  topicPolicyConfig?: GuardrailTopicPolicyConfig;
  contentPolicyConfig?: GuardrailContentPolicyConfig;
  wordPolicyConfig?: GuardrailWordPolicyConfig;
  sensitiveInformationPolicyConfig?: GuardrailSensitiveInformationPolicyConfig;
  contextualGroundingPolicyConfig?: GuardrailContextualGroundingPolicyConfig;
  automatedReasoningPolicyConfig?: GuardrailAutomatedReasoningPolicyConfig;
  crossRegionConfig?: GuardrailCrossRegionConfig;
  blockedInputMessaging: string | redacted.Redacted<string>;
  blockedOutputsMessaging: string | redacted.Redacted<string>;
  kmsKeyId?: string;
}
export const UpdateGuardrailRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    guardrailIdentifier: S.String.pipe(T.HttpLabel("guardrailIdentifier")),
    name: SensitiveString,
    description: S.optional(SensitiveString),
    topicPolicyConfig: S.optional(GuardrailTopicPolicyConfig),
    contentPolicyConfig: S.optional(GuardrailContentPolicyConfig),
    wordPolicyConfig: S.optional(GuardrailWordPolicyConfig),
    sensitiveInformationPolicyConfig: S.optional(
      GuardrailSensitiveInformationPolicyConfig,
    ),
    contextualGroundingPolicyConfig: S.optional(
      GuardrailContextualGroundingPolicyConfig,
    ),
    automatedReasoningPolicyConfig: S.optional(
      GuardrailAutomatedReasoningPolicyConfig,
    ),
    crossRegionConfig: S.optional(GuardrailCrossRegionConfig),
    blockedInputMessaging: SensitiveString,
    blockedOutputsMessaging: SensitiveString,
    kmsKeyId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/guardrails/{guardrailIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGuardrailRequest",
}) as any as S.Schema<UpdateGuardrailRequest>;
export interface UpdateGuardrailResponse {
  guardrailId: string;
  guardrailArn: string;
  version: string;
  updatedAt: Date;
}
export const UpdateGuardrailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    guardrailId: S.String,
    guardrailArn: S.String,
    version: S.String,
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "UpdateGuardrailResponse",
}) as any as S.Schema<UpdateGuardrailResponse>;
export interface UpdateMarketplaceModelEndpointRequest {
  endpointArn: string;
  endpointConfig: EndpointConfig;
  clientRequestToken?: string;
}
export const UpdateMarketplaceModelEndpointRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      endpointArn: S.String.pipe(T.HttpLabel("endpointArn")),
      endpointConfig: EndpointConfig,
      clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/marketplace-model/endpoints/{endpointArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateMarketplaceModelEndpointRequest",
}) as any as S.Schema<UpdateMarketplaceModelEndpointRequest>;
export interface UpdateMarketplaceModelEndpointResponse {
  marketplaceModelEndpoint: MarketplaceModelEndpoint;
}
export const UpdateMarketplaceModelEndpointResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ marketplaceModelEndpoint: MarketplaceModelEndpoint }),
).annotate({
  identifier: "UpdateMarketplaceModelEndpointResponse",
}) as any as S.Schema<UpdateMarketplaceModelEndpointResponse>;
export interface UpdateProvisionedModelThroughputRequest {
  provisionedModelId: string;
  desiredProvisionedModelName?: string;
  desiredModelId?: string;
}
export const UpdateProvisionedModelThroughputRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      provisionedModelId: S.String.pipe(T.HttpLabel("provisionedModelId")),
      desiredProvisionedModelName: S.optional(S.String),
      desiredModelId: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/provisioned-model-throughput/{provisionedModelId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateProvisionedModelThroughputRequest",
}) as any as S.Schema<UpdateProvisionedModelThroughputRequest>;
export interface UpdateProvisionedModelThroughputResponse {}
export const UpdateProvisionedModelThroughputResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateProvisionedModelThroughputResponse",
}) as any as S.Schema<UpdateProvisionedModelThroughputResponse>;
export type NonBlankString = string;
export type BatchDeleteAdvancedPromptOptimizationJobError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes one or more advanced prompt optimization jobs.
 */
export const batchDeleteAdvancedPromptOptimizationJob: API.OperationMethod<
  BatchDeleteAdvancedPromptOptimizationJobRequest,
  BatchDeleteAdvancedPromptOptimizationJobResponse,
  BatchDeleteAdvancedPromptOptimizationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteAdvancedPromptOptimizationJobRequest,
  output: BatchDeleteAdvancedPromptOptimizationJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteAdvancedPromptOptimizationJob",
}));

export type BatchDeleteEvaluationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a batch of evaluation jobs. An evaluation job can only be deleted if it has following status `FAILED`, `COMPLETED`, and `STOPPED`. You can request up to 25 model evaluation jobs be deleted in a single request.
 */
export const batchDeleteEvaluationJob: API.OperationMethod<
  BatchDeleteEvaluationJobRequest,
  BatchDeleteEvaluationJobResponse,
  BatchDeleteEvaluationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteEvaluationJobRequest,
  output: BatchDeleteEvaluationJobResponse,
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
  operationName: "BatchDeleteEvaluationJob",
}));

export type CancelAutomatedReasoningPolicyBuildWorkflowError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a running Automated Reasoning policy build workflow. This stops the policy generation process and prevents further processing of the source documents.
 */
export const cancelAutomatedReasoningPolicyBuildWorkflow: API.OperationMethod<
  CancelAutomatedReasoningPolicyBuildWorkflowRequest,
  CancelAutomatedReasoningPolicyBuildWorkflowResponse,
  CancelAutomatedReasoningPolicyBuildWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelAutomatedReasoningPolicyBuildWorkflowRequest,
  output: CancelAutomatedReasoningPolicyBuildWorkflowResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelAutomatedReasoningPolicyBuildWorkflow",
}));

export type CreateAdvancedPromptOptimizationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates an advanced prompt optimization job. The job optimizes your prompt templates for specific models using your evaluation dataset and criteria.
 */
export const createAdvancedPromptOptimizationJob: API.OperationMethod<
  CreateAdvancedPromptOptimizationJobRequest,
  CreateAdvancedPromptOptimizationJobResponse,
  CreateAdvancedPromptOptimizationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAdvancedPromptOptimizationJobRequest,
  output: CreateAdvancedPromptOptimizationJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAdvancedPromptOptimizationJob",
}));

export type CreateAutomatedReasoningPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Automated Reasoning policy for Amazon Bedrock Guardrails. Automated Reasoning policies use mathematical techniques to detect hallucinations, suggest corrections, and highlight unstated assumptions in the responses of your GenAI application.
 *
 * To create a policy, you upload a source document that describes the rules that you're encoding. Automated Reasoning extracts important concepts from the source document that will become variables in the policy and infers policy rules.
 */
export const createAutomatedReasoningPolicy: API.OperationMethod<
  CreateAutomatedReasoningPolicyRequest,
  CreateAutomatedReasoningPolicyResponse,
  CreateAutomatedReasoningPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAutomatedReasoningPolicyRequest,
  output: CreateAutomatedReasoningPolicyResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAutomatedReasoningPolicy",
}));

export type CreateAutomatedReasoningPolicyTestCaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a test for an Automated Reasoning policy. Tests validate that your policy works as expected by providing sample inputs and expected outcomes. Use tests to verify policy behavior before deploying to production.
 */
export const createAutomatedReasoningPolicyTestCase: API.OperationMethod<
  CreateAutomatedReasoningPolicyTestCaseRequest,
  CreateAutomatedReasoningPolicyTestCaseResponse,
  CreateAutomatedReasoningPolicyTestCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAutomatedReasoningPolicyTestCaseRequest,
  output: CreateAutomatedReasoningPolicyTestCaseResponse,
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
  operationName: "CreateAutomatedReasoningPolicyTestCase",
}));

export type CreateAutomatedReasoningPolicyVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new version of an existing Automated Reasoning policy. This allows you to iterate on your policy rules while maintaining previous versions for rollback or comparison purposes.
 */
export const createAutomatedReasoningPolicyVersion: API.OperationMethod<
  CreateAutomatedReasoningPolicyVersionRequest,
  CreateAutomatedReasoningPolicyVersionResponse,
  CreateAutomatedReasoningPolicyVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAutomatedReasoningPolicyVersionRequest,
  output: CreateAutomatedReasoningPolicyVersionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAutomatedReasoningPolicyVersion",
}));

export type CreateCustomModelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new custom model in Amazon Bedrock. After the model is active, you can use it for inference.
 *
 * You can provide the model data source in one of the following ways:
 *
 * - `customModelDataSource` — Specify a SageMaker AI model package ARN. Amazon Bedrock resolves the model package to retrieve the model artifacts. This is the preferred method for new SageMaker AI training outputs.
 *
 * - `modelSourceConfig` — Specify an Amazon S3 URI pointing to the Amazon-managed Amazon S3 bucket containing your model artifacts.
 *
 * To use the model for inference, you must purchase Provisioned Throughput for it. You can't use On-demand inference with these custom models. For more information about Provisioned Throughput, see Provisioned Throughput.
 *
 * The model appears in `ListCustomModels` with a `customizationType` of `imported`. To track the status of the new model, you use the `GetCustomModel` API operation. The model can be in the following states:
 *
 * - `Creating` - Initial state during validation and registration
 *
 * - `Active` - Model is ready for use in inference
 *
 * - `Failed` - Creation process encountered an error
 *
 * **Related APIs**
 *
 * - GetCustomModel
 *
 * - ListCustomModels
 *
 * - DeleteCustomModel
 */
export const createCustomModel: API.OperationMethod<
  CreateCustomModelRequest,
  CreateCustomModelResponse,
  CreateCustomModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCustomModelRequest,
  output: CreateCustomModelResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomModel",
}));

export type CreateCustomModelDeploymentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Deploys a custom model for on-demand inference in Amazon Bedrock. After you deploy your custom model, you use the deployment's Amazon Resource Name (ARN) as the `modelId` parameter when you submit prompts and generate responses with model inference.
 *
 * For more information about setting up on-demand inference for custom models, see Set up inference for a custom model.
 *
 * The following actions are related to the `CreateCustomModelDeployment` operation:
 *
 * - GetCustomModelDeployment
 *
 * - ListCustomModelDeployments
 *
 * - DeleteCustomModelDeployment
 */
export const createCustomModelDeployment: API.OperationMethod<
  CreateCustomModelDeploymentRequest,
  CreateCustomModelDeploymentResponse,
  CreateCustomModelDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCustomModelDeploymentRequest,
  output: CreateCustomModelDeploymentResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomModelDeployment",
}));

export type CreateEvaluationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an evaluation job.
 */
export const createEvaluationJob: API.OperationMethod<
  CreateEvaluationJobRequest,
  CreateEvaluationJobResponse,
  CreateEvaluationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEvaluationJobRequest,
  output: CreateEvaluationJobResponse,
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
  operationName: "CreateEvaluationJob",
}));

export type CreateFoundationModelAgreementError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Request a model access agreement for the specified model.
 */
export const createFoundationModelAgreement: API.OperationMethod<
  CreateFoundationModelAgreementRequest,
  CreateFoundationModelAgreementResponse,
  CreateFoundationModelAgreementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFoundationModelAgreementRequest,
  output: CreateFoundationModelAgreementResponse,
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
  operationName: "CreateFoundationModelAgreement",
}));

export type CreateGuardrailError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a guardrail to block topics and to implement safeguards for your generative AI applications.
 *
 * You can configure the following policies in a guardrail to avoid undesirable and harmful content, filter out denied topics and words, and remove sensitive information for privacy protection.
 *
 * - **Content filters** - Adjust filter strengths to block input prompts or model responses containing harmful content.
 *
 * - **Denied topics** - Define a set of topics that are undesirable in the context of your application. These topics will be blocked if detected in user queries or model responses.
 *
 * - **Word filters** - Configure filters to block undesirable words, phrases, and profanity. Such words can include offensive terms, competitor names etc.
 *
 * - **Sensitive information filters** - Block or mask sensitive information such as personally identifiable information (PII) or custom regex in user inputs and model responses.
 *
 * In addition to the above policies, you can also configure the messages to be returned to the user if a user input or model response is in violation of the policies defined in the guardrail.
 *
 * For more information, see Amazon Bedrock Guardrails in the *Amazon Bedrock User Guide*.
 */
export const createGuardrail: API.OperationMethod<
  CreateGuardrailRequest,
  CreateGuardrailResponse,
  CreateGuardrailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGuardrailRequest,
  output: CreateGuardrailResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGuardrail",
}));

export type CreateGuardrailVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a version of the guardrail. Use this API to create a snapshot of the guardrail when you are satisfied with a configuration, or to compare the configuration with another version.
 */
export const createGuardrailVersion: API.OperationMethod<
  CreateGuardrailVersionRequest,
  CreateGuardrailVersionResponse,
  CreateGuardrailVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGuardrailVersionRequest,
  output: CreateGuardrailVersionResponse,
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
  operationName: "CreateGuardrailVersion",
}));

export type CreateInferenceProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates an application inference profile to track metrics and costs when invoking a model. To create an application inference profile for a foundation model in one region, specify the ARN of the model in that region. To create an application inference profile for a foundation model across multiple regions, specify the ARN of the system-defined inference profile that contains the regions that you want to route requests to. For more information, see Increase throughput and resilience with cross-region inference in Amazon Bedrock. in the Amazon Bedrock User Guide.
 */
export const createInferenceProfile: API.OperationMethod<
  CreateInferenceProfileRequest,
  CreateInferenceProfileResponse,
  CreateInferenceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateInferenceProfileRequest,
  output: CreateInferenceProfileResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInferenceProfile",
}));

export type CreateMarketplaceModelEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an endpoint for a model from Amazon Bedrock Marketplace. The endpoint is hosted by Amazon SageMaker.
 */
export const createMarketplaceModelEndpoint: API.OperationMethod<
  CreateMarketplaceModelEndpointRequest,
  CreateMarketplaceModelEndpointResponse,
  CreateMarketplaceModelEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMarketplaceModelEndpointRequest,
  output: CreateMarketplaceModelEndpointResponse,
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
  operationName: "CreateMarketplaceModelEndpoint",
}));

export type CreateModelCopyJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Copies a model to another region so that it can be used there. For more information, see Copy models to be used in other regions in the Amazon Bedrock User Guide.
 */
export const createModelCopyJob: API.OperationMethod<
  CreateModelCopyJobRequest,
  CreateModelCopyJobResponse,
  CreateModelCopyJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateModelCopyJobRequest,
  output: CreateModelCopyJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModelCopyJob",
}));

export type CreateModelCustomizationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a fine-tuning job to customize a base model.
 *
 * You specify the base foundation model and the location of the training data. After the model-customization job completes successfully, your custom model resource will be ready to use. Amazon Bedrock returns validation loss metrics and output generations after the job completes.
 *
 * For information on the format of training and validation data, see Prepare the datasets.
 *
 * Model-customization jobs are asynchronous and the completion time depends on the base model and the training/validation data size. To monitor a job, use the `GetModelCustomizationJob` operation to retrieve the job status.
 *
 * For more information, see Custom models in the Amazon Bedrock User Guide.
 */
export const createModelCustomizationJob: API.OperationMethod<
  CreateModelCustomizationJobRequest,
  CreateModelCustomizationJobResponse,
  CreateModelCustomizationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateModelCustomizationJobRequest,
  output: CreateModelCustomizationJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModelCustomizationJob",
}));

export type CreateModelImportJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a model import job to import model that you have customized in other environments, such as Amazon SageMaker. For more information, see Import a customized model
 */
export const createModelImportJob: API.OperationMethod<
  CreateModelImportJobRequest,
  CreateModelImportJobResponse,
  CreateModelImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateModelImportJobRequest,
  output: CreateModelImportJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModelImportJob",
}));

export type CreateModelInvocationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a batch inference job to invoke a model on multiple prompts. Format your data according to Format your inference data and upload it to an Amazon S3 bucket. For more information, see Process multiple prompts with batch inference.
 *
 * The response returns a `jobArn` that you can use to stop or get details about the job.
 */
export const createModelInvocationJob: API.OperationMethod<
  CreateModelInvocationJobRequest,
  CreateModelInvocationJobResponse,
  CreateModelInvocationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateModelInvocationJobRequest,
  output: CreateModelInvocationJobResponse,
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
  operationName: "CreateModelInvocationJob",
}));

export type CreatePromptRouterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a prompt router that manages the routing of requests between multiple foundation models based on the routing criteria.
 */
export const createPromptRouter: API.OperationMethod<
  CreatePromptRouterRequest,
  CreatePromptRouterResponse,
  CreatePromptRouterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePromptRouterRequest,
  output: CreatePromptRouterResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePromptRouter",
}));

export type CreateProvisionedModelThroughputError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates dedicated throughput for a base or custom model with the model units and for the duration that you specify. For pricing details, see Amazon Bedrock Pricing. For more information, see Provisioned Throughput in the Amazon Bedrock User Guide.
 */
export const createProvisionedModelThroughput: API.OperationMethod<
  CreateProvisionedModelThroughputRequest,
  CreateProvisionedModelThroughputResponse,
  CreateProvisionedModelThroughputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProvisionedModelThroughputRequest,
  output: CreateProvisionedModelThroughputResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProvisionedModelThroughput",
}));

export type DeleteAutomatedReasoningPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Automated Reasoning policy or policy version. This operation is idempotent. If you delete a policy more than once, each call succeeds. Deleting a policy removes it permanently and cannot be undone.
 */
export const deleteAutomatedReasoningPolicy: API.OperationMethod<
  DeleteAutomatedReasoningPolicyRequest,
  DeleteAutomatedReasoningPolicyResponse,
  DeleteAutomatedReasoningPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAutomatedReasoningPolicyRequest,
  output: DeleteAutomatedReasoningPolicyResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAutomatedReasoningPolicy",
}));

export type DeleteAutomatedReasoningPolicyBuildWorkflowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Automated Reasoning policy build workflow and its associated artifacts. This permanently removes the workflow history and any generated assets.
 */
export const deleteAutomatedReasoningPolicyBuildWorkflow: API.OperationMethod<
  DeleteAutomatedReasoningPolicyBuildWorkflowRequest,
  DeleteAutomatedReasoningPolicyBuildWorkflowResponse,
  DeleteAutomatedReasoningPolicyBuildWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAutomatedReasoningPolicyBuildWorkflowRequest,
  output: DeleteAutomatedReasoningPolicyBuildWorkflowResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAutomatedReasoningPolicyBuildWorkflow",
}));

export type DeleteAutomatedReasoningPolicyTestCaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Automated Reasoning policy test. This operation is idempotent; if you delete a test more than once, each call succeeds.
 */
export const deleteAutomatedReasoningPolicyTestCase: API.OperationMethod<
  DeleteAutomatedReasoningPolicyTestCaseRequest,
  DeleteAutomatedReasoningPolicyTestCaseResponse,
  DeleteAutomatedReasoningPolicyTestCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAutomatedReasoningPolicyTestCaseRequest,
  output: DeleteAutomatedReasoningPolicyTestCaseResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAutomatedReasoningPolicyTestCase",
}));

export type DeleteCustomModelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a custom model that you created earlier. For more information, see Custom models in the Amazon Bedrock User Guide.
 */
export const deleteCustomModel: API.OperationMethod<
  DeleteCustomModelRequest,
  DeleteCustomModelResponse,
  DeleteCustomModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCustomModelRequest,
  output: DeleteCustomModelResponse,
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
  operationName: "DeleteCustomModel",
}));

export type DeleteCustomModelDeploymentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a custom model deployment. This operation stops the deployment and removes it from your account. After deletion, the deployment ARN can no longer be used for inference requests.
 *
 * The following actions are related to the `DeleteCustomModelDeployment` operation:
 *
 * - CreateCustomModelDeployment
 *
 * - GetCustomModelDeployment
 *
 * - ListCustomModelDeployments
 */
export const deleteCustomModelDeployment: API.OperationMethod<
  DeleteCustomModelDeploymentRequest,
  DeleteCustomModelDeploymentResponse,
  DeleteCustomModelDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCustomModelDeploymentRequest,
  output: DeleteCustomModelDeploymentResponse,
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
  operationName: "DeleteCustomModelDeployment",
}));

export type DeleteEnforcedGuardrailConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the account-level enforced guardrail configuration.
 */
export const deleteEnforcedGuardrailConfiguration: API.OperationMethod<
  DeleteEnforcedGuardrailConfigurationRequest,
  DeleteEnforcedGuardrailConfigurationResponse,
  DeleteEnforcedGuardrailConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEnforcedGuardrailConfigurationRequest,
  output: DeleteEnforcedGuardrailConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnforcedGuardrailConfiguration",
}));

export type DeleteFoundationModelAgreementError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete the model access agreement for the specified model.
 */
export const deleteFoundationModelAgreement: API.OperationMethod<
  DeleteFoundationModelAgreementRequest,
  DeleteFoundationModelAgreementResponse,
  DeleteFoundationModelAgreementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFoundationModelAgreementRequest,
  output: DeleteFoundationModelAgreementResponse,
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
  operationName: "DeleteFoundationModelAgreement",
}));

export type DeleteGuardrailError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a guardrail.
 *
 * - To delete a guardrail, only specify the ARN of the guardrail in the `guardrailIdentifier` field. If you delete a guardrail, all of its versions will be deleted.
 *
 * - To delete a version of a guardrail, specify the ARN of the guardrail in the `guardrailIdentifier` field and the version in the `guardrailVersion` field.
 */
export const deleteGuardrail: API.OperationMethod<
  DeleteGuardrailRequest,
  DeleteGuardrailResponse,
  DeleteGuardrailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGuardrailRequest,
  output: DeleteGuardrailResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGuardrail",
}));

export type DeleteImportedModelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a custom model that you imported earlier. For more information, see Import a customized model in the Amazon Bedrock User Guide.
 */
export const deleteImportedModel: API.OperationMethod<
  DeleteImportedModelRequest,
  DeleteImportedModelResponse,
  DeleteImportedModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteImportedModelRequest,
  output: DeleteImportedModelResponse,
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
  operationName: "DeleteImportedModel",
}));

export type DeleteInferenceProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an application inference profile. For more information, see Increase throughput and resilience with cross-region inference in Amazon Bedrock. in the Amazon Bedrock User Guide.
 */
export const deleteInferenceProfile: API.OperationMethod<
  DeleteInferenceProfileRequest,
  DeleteInferenceProfileResponse,
  DeleteInferenceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteInferenceProfileRequest,
  output: DeleteInferenceProfileResponse,
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
  operationName: "DeleteInferenceProfile",
}));

export type DeleteMarketplaceModelEndpointError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an endpoint for a model from Amazon Bedrock Marketplace.
 */
export const deleteMarketplaceModelEndpoint: API.OperationMethod<
  DeleteMarketplaceModelEndpointRequest,
  DeleteMarketplaceModelEndpointResponse,
  DeleteMarketplaceModelEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMarketplaceModelEndpointRequest,
  output: DeleteMarketplaceModelEndpointResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMarketplaceModelEndpoint",
}));

export type DeleteModelInvocationLoggingConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Delete the invocation logging.
 */
export const deleteModelInvocationLoggingConfiguration: API.OperationMethod<
  DeleteModelInvocationLoggingConfigurationRequest,
  DeleteModelInvocationLoggingConfigurationResponse,
  DeleteModelInvocationLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteModelInvocationLoggingConfigurationRequest,
  output: DeleteModelInvocationLoggingConfigurationResponse,
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteModelInvocationLoggingConfiguration",
}));

export type DeletePromptRouterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specified prompt router. This action cannot be undone.
 */
export const deletePromptRouter: API.OperationMethod<
  DeletePromptRouterRequest,
  DeletePromptRouterResponse,
  DeletePromptRouterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePromptRouterRequest,
  output: DeletePromptRouterResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePromptRouter",
}));

export type DeleteProvisionedModelThroughputError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Provisioned Throughput. You can't delete a Provisioned Throughput before the commitment term is over. For more information, see Provisioned Throughput in the Amazon Bedrock User Guide.
 */
export const deleteProvisionedModelThroughput: API.OperationMethod<
  DeleteProvisionedModelThroughputRequest,
  DeleteProvisionedModelThroughputResponse,
  DeleteProvisionedModelThroughputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProvisionedModelThroughputRequest,
  output: DeleteProvisionedModelThroughputResponse,
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
  operationName: "DeleteProvisionedModelThroughput",
}));

export type DeleteResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a previously created Bedrock resource policy.
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
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type DeregisterMarketplaceModelEndpointError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deregisters an endpoint for a model from Amazon Bedrock Marketplace. This operation removes the endpoint's association with Amazon Bedrock but does not delete the underlying Amazon SageMaker endpoint.
 */
export const deregisterMarketplaceModelEndpoint: API.OperationMethod<
  DeregisterMarketplaceModelEndpointRequest,
  DeregisterMarketplaceModelEndpointResponse,
  DeregisterMarketplaceModelEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterMarketplaceModelEndpointRequest,
  output: DeregisterMarketplaceModelEndpointResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterMarketplaceModelEndpoint",
}));

export type ExportAutomatedReasoningPolicyVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Exports the policy definition for an Automated Reasoning policy version. Returns the complete policy definition including rules, variables, and custom variable types in a structured format.
 */
export const exportAutomatedReasoningPolicyVersion: API.OperationMethod<
  ExportAutomatedReasoningPolicyVersionRequest,
  ExportAutomatedReasoningPolicyVersionResponse,
  ExportAutomatedReasoningPolicyVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExportAutomatedReasoningPolicyVersionRequest,
  output: ExportAutomatedReasoningPolicyVersionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportAutomatedReasoningPolicyVersion",
}));

export type GetAccountDataRetentionError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the account-wide data retention mode for Amazon Bedrock.
 */
export const getAccountDataRetention: API.OperationMethod<
  GetAccountDataRetentionRequest,
  GetAccountDataRetentionResponse,
  GetAccountDataRetentionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccountDataRetentionRequest,
  output: GetAccountDataRetentionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountDataRetention",
}));

export type GetAdvancedPromptOptimizationJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an advanced prompt optimization job.
 */
export const getAdvancedPromptOptimizationJob: API.OperationMethod<
  GetAdvancedPromptOptimizationJobRequest,
  GetAdvancedPromptOptimizationJobResponse,
  GetAdvancedPromptOptimizationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAdvancedPromptOptimizationJobRequest,
  output: GetAdvancedPromptOptimizationJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAdvancedPromptOptimizationJob",
}));

export type GetAutomatedReasoningPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about an Automated Reasoning policy or policy version. Returns information including the policy definition, metadata, and timestamps.
 */
export const getAutomatedReasoningPolicy: API.OperationMethod<
  GetAutomatedReasoningPolicyRequest,
  GetAutomatedReasoningPolicyResponse,
  GetAutomatedReasoningPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAutomatedReasoningPolicyRequest,
  output: GetAutomatedReasoningPolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutomatedReasoningPolicy",
}));

export type GetAutomatedReasoningPolicyAnnotationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the current annotations for an Automated Reasoning policy build workflow. Annotations contain corrections to the rules, variables and types to be applied to the policy.
 */
export const getAutomatedReasoningPolicyAnnotations: API.OperationMethod<
  GetAutomatedReasoningPolicyAnnotationsRequest,
  GetAutomatedReasoningPolicyAnnotationsResponse,
  GetAutomatedReasoningPolicyAnnotationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAutomatedReasoningPolicyAnnotationsRequest,
  output: GetAutomatedReasoningPolicyAnnotationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutomatedReasoningPolicyAnnotations",
}));

export type GetAutomatedReasoningPolicyBuildWorkflowError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about an Automated Reasoning policy build workflow, including its status, configuration, and metadata.
 */
export const getAutomatedReasoningPolicyBuildWorkflow: API.OperationMethod<
  GetAutomatedReasoningPolicyBuildWorkflowRequest,
  GetAutomatedReasoningPolicyBuildWorkflowResponse,
  GetAutomatedReasoningPolicyBuildWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAutomatedReasoningPolicyBuildWorkflowRequest,
  output: GetAutomatedReasoningPolicyBuildWorkflowResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutomatedReasoningPolicyBuildWorkflow",
}));

export type GetAutomatedReasoningPolicyBuildWorkflowResultAssetsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the resulting assets from a completed Automated Reasoning policy build workflow, including build logs, quality reports, and generated policy artifacts.
 */
export const getAutomatedReasoningPolicyBuildWorkflowResultAssets: API.OperationMethod<
  GetAutomatedReasoningPolicyBuildWorkflowResultAssetsRequest,
  GetAutomatedReasoningPolicyBuildWorkflowResultAssetsResponse,
  GetAutomatedReasoningPolicyBuildWorkflowResultAssetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAutomatedReasoningPolicyBuildWorkflowResultAssetsRequest,
  output: GetAutomatedReasoningPolicyBuildWorkflowResultAssetsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutomatedReasoningPolicyBuildWorkflowResultAssets",
}));

export type GetAutomatedReasoningPolicyNextScenarioError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the next test scenario for validating an Automated Reasoning policy. This is used during the interactive policy refinement process to test policy behavior.
 */
export const getAutomatedReasoningPolicyNextScenario: API.OperationMethod<
  GetAutomatedReasoningPolicyNextScenarioRequest,
  GetAutomatedReasoningPolicyNextScenarioResponse,
  GetAutomatedReasoningPolicyNextScenarioError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAutomatedReasoningPolicyNextScenarioRequest,
  output: GetAutomatedReasoningPolicyNextScenarioResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutomatedReasoningPolicyNextScenario",
}));

export type GetAutomatedReasoningPolicyTestCaseError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a specific Automated Reasoning policy test.
 */
export const getAutomatedReasoningPolicyTestCase: API.OperationMethod<
  GetAutomatedReasoningPolicyTestCaseRequest,
  GetAutomatedReasoningPolicyTestCaseResponse,
  GetAutomatedReasoningPolicyTestCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAutomatedReasoningPolicyTestCaseRequest,
  output: GetAutomatedReasoningPolicyTestCaseResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutomatedReasoningPolicyTestCase",
}));

export type GetAutomatedReasoningPolicyTestResultError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the test result for a specific Automated Reasoning policy test. Returns detailed validation findings and execution status.
 */
export const getAutomatedReasoningPolicyTestResult: API.OperationMethod<
  GetAutomatedReasoningPolicyTestResultRequest,
  GetAutomatedReasoningPolicyTestResultResponse,
  GetAutomatedReasoningPolicyTestResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAutomatedReasoningPolicyTestResultRequest,
  output: GetAutomatedReasoningPolicyTestResultResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutomatedReasoningPolicyTestResult",
}));

export type GetCustomModelError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the properties associated with a Amazon Bedrock custom model that you have created. For more information, see Custom models in the Amazon Bedrock User Guide.
 */
export const getCustomModel: API.OperationMethod<
  GetCustomModelRequest,
  GetCustomModelResponse,
  GetCustomModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCustomModelRequest,
  output: GetCustomModelResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomModel",
}));

export type GetCustomModelDeploymentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a custom model deployment, including its status, configuration, and metadata. Use this operation to monitor the deployment status and retrieve details needed for inference requests.
 *
 * The following actions are related to the `GetCustomModelDeployment` operation:
 *
 * - CreateCustomModelDeployment
 *
 * - ListCustomModelDeployments
 *
 * - DeleteCustomModelDeployment
 */
export const getCustomModelDeployment: API.OperationMethod<
  GetCustomModelDeploymentRequest,
  GetCustomModelDeploymentResponse,
  GetCustomModelDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCustomModelDeploymentRequest,
  output: GetCustomModelDeploymentResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomModelDeployment",
}));

export type GetEvaluationJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an evaluation job, such as the status of the job.
 */
export const getEvaluationJob: API.OperationMethod<
  GetEvaluationJobRequest,
  GetEvaluationJobResponse,
  GetEvaluationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEvaluationJobRequest,
  output: GetEvaluationJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEvaluationJob",
}));

export type GetFoundationModelError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get details about a Amazon Bedrock foundation model.
 */
export const getFoundationModel: API.OperationMethod<
  GetFoundationModelRequest,
  GetFoundationModelResponse,
  GetFoundationModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFoundationModelRequest,
  output: GetFoundationModelResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFoundationModel",
}));

export type GetFoundationModelAvailabilityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get information about the Foundation model availability.
 */
export const getFoundationModelAvailability: API.OperationMethod<
  GetFoundationModelAvailabilityRequest,
  GetFoundationModelAvailabilityResponse,
  GetFoundationModelAvailabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFoundationModelAvailabilityRequest,
  output: GetFoundationModelAvailabilityResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFoundationModelAvailability",
}));

export type GetGuardrailError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets details about a guardrail. If you don't specify a version, the response returns details for the `DRAFT` version.
 */
export const getGuardrail: API.OperationMethod<
  GetGuardrailRequest,
  GetGuardrailResponse,
  GetGuardrailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGuardrailRequest,
  output: GetGuardrailResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGuardrail",
}));

export type GetImportedModelError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets properties associated with a customized model you imported.
 */
export const getImportedModel: API.OperationMethod<
  GetImportedModelRequest,
  GetImportedModelResponse,
  GetImportedModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetImportedModelRequest,
  output: GetImportedModelResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImportedModel",
}));

export type GetInferenceProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an inference profile. For more information, see Increase throughput and resilience with cross-region inference in Amazon Bedrock. in the Amazon Bedrock User Guide.
 */
export const getInferenceProfile: API.OperationMethod<
  GetInferenceProfileRequest,
  GetInferenceProfileResponse,
  GetInferenceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInferenceProfileRequest,
  output: GetInferenceProfileResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInferenceProfile",
}));

export type GetMarketplaceModelEndpointError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a specific endpoint for a model from Amazon Bedrock Marketplace.
 */
export const getMarketplaceModelEndpoint: API.OperationMethod<
  GetMarketplaceModelEndpointRequest,
  GetMarketplaceModelEndpointResponse,
  GetMarketplaceModelEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMarketplaceModelEndpointRequest,
  output: GetMarketplaceModelEndpointResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMarketplaceModelEndpoint",
}));

export type GetModelCopyJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a model copy job. For more information, see Copy models to be used in other regions in the Amazon Bedrock User Guide.
 */
export const getModelCopyJob: API.OperationMethod<
  GetModelCopyJobRequest,
  GetModelCopyJobResponse,
  GetModelCopyJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetModelCopyJobRequest,
  output: GetModelCopyJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModelCopyJob",
}));

export type GetModelCustomizationJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the properties associated with a model-customization job, including the status of the job. For more information, see Custom models in the Amazon Bedrock User Guide.
 */
export const getModelCustomizationJob: API.OperationMethod<
  GetModelCustomizationJobRequest,
  GetModelCustomizationJobResponse,
  GetModelCustomizationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetModelCustomizationJobRequest,
  output: GetModelCustomizationJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModelCustomizationJob",
}));

export type GetModelImportJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the properties associated with import model job, including the status of the job. For more information, see Import a customized model in the Amazon Bedrock User Guide.
 */
export const getModelImportJob: API.OperationMethod<
  GetModelImportJobRequest,
  GetModelImportJobResponse,
  GetModelImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetModelImportJobRequest,
  output: GetModelImportJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModelImportJob",
}));

export type GetModelInvocationJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets details about a batch inference job. For more information, see Monitor batch inference jobs
 */
export const getModelInvocationJob: API.OperationMethod<
  GetModelInvocationJobRequest,
  GetModelInvocationJobResponse,
  GetModelInvocationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetModelInvocationJobRequest,
  output: GetModelInvocationJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModelInvocationJob",
}));

export type GetModelInvocationLoggingConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Get the current configuration values for model invocation logging.
 */
export const getModelInvocationLoggingConfiguration: API.OperationMethod<
  GetModelInvocationLoggingConfigurationRequest,
  GetModelInvocationLoggingConfigurationResponse,
  GetModelInvocationLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetModelInvocationLoggingConfigurationRequest,
  output: GetModelInvocationLoggingConfigurationResponse,
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModelInvocationLoggingConfiguration",
}));

export type GetPromptRouterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a prompt router.
 */
export const getPromptRouter: API.OperationMethod<
  GetPromptRouterRequest,
  GetPromptRouterResponse,
  GetPromptRouterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPromptRouterRequest,
  output: GetPromptRouterResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPromptRouter",
}));

export type GetProvisionedModelThroughputError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details for a Provisioned Throughput. For more information, see Provisioned Throughput in the Amazon Bedrock User Guide.
 */
export const getProvisionedModelThroughput: API.OperationMethod<
  GetProvisionedModelThroughputRequest,
  GetProvisionedModelThroughputResponse,
  GetProvisionedModelThroughputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProvisionedModelThroughputRequest,
  output: GetProvisionedModelThroughputResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProvisionedModelThroughput",
}));

export type GetResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the resource policy document for a Bedrock resource
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourcePolicyRequest,
  output: GetResourcePolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

export type GetUseCaseForModelAccessError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get usecase for model access.
 */
export const getUseCaseForModelAccess: API.OperationMethod<
  GetUseCaseForModelAccessRequest,
  GetUseCaseForModelAccessResponse,
  GetUseCaseForModelAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUseCaseForModelAccessRequest,
  output: GetUseCaseForModelAccessResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUseCaseForModelAccess",
}));

export type ListAdvancedPromptOptimizationJobsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the advanced prompt optimization jobs in your account.
 */
export const listAdvancedPromptOptimizationJobs: API.PaginatedOperationMethod<
  ListAdvancedPromptOptimizationJobsRequest,
  ListAdvancedPromptOptimizationJobsResponse,
  ListAdvancedPromptOptimizationJobsError,
  Credentials | HttpClient.HttpClient,
  AdvancedPromptOptimizationJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAdvancedPromptOptimizationJobsRequest,
  output: ListAdvancedPromptOptimizationJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAdvancedPromptOptimizationJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutomatedReasoningPoliciesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Automated Reasoning policies in your account, with optional filtering by policy ARN. This helps you manage and discover existing policies.
 */
export const listAutomatedReasoningPolicies: API.PaginatedOperationMethod<
  ListAutomatedReasoningPoliciesRequest,
  ListAutomatedReasoningPoliciesResponse,
  ListAutomatedReasoningPoliciesError,
  Credentials | HttpClient.HttpClient,
  AutomatedReasoningPolicySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAutomatedReasoningPoliciesRequest,
  output: ListAutomatedReasoningPoliciesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutomatedReasoningPolicies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "automatedReasoningPolicySummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutomatedReasoningPolicyBuildWorkflowsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all build workflows for an Automated Reasoning policy, showing the history of policy creation and modification attempts.
 */
export const listAutomatedReasoningPolicyBuildWorkflows: API.PaginatedOperationMethod<
  ListAutomatedReasoningPolicyBuildWorkflowsRequest,
  ListAutomatedReasoningPolicyBuildWorkflowsResponse,
  ListAutomatedReasoningPolicyBuildWorkflowsError,
  Credentials | HttpClient.HttpClient,
  AutomatedReasoningPolicyBuildWorkflowSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAutomatedReasoningPolicyBuildWorkflowsRequest,
  output: ListAutomatedReasoningPolicyBuildWorkflowsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutomatedReasoningPolicyBuildWorkflows",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "automatedReasoningPolicyBuildWorkflowSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutomatedReasoningPolicyTestCasesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists tests for an Automated Reasoning policy. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const listAutomatedReasoningPolicyTestCases: API.PaginatedOperationMethod<
  ListAutomatedReasoningPolicyTestCasesRequest,
  ListAutomatedReasoningPolicyTestCasesResponse,
  ListAutomatedReasoningPolicyTestCasesError,
  Credentials | HttpClient.HttpClient,
  AutomatedReasoningPolicyTestCase
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAutomatedReasoningPolicyTestCasesRequest,
  output: ListAutomatedReasoningPolicyTestCasesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutomatedReasoningPolicyTestCases",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "testCases",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutomatedReasoningPolicyTestResultsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists test results for an Automated Reasoning policy, showing how the policy performed against various test scenarios and validation checks.
 */
export const listAutomatedReasoningPolicyTestResults: API.PaginatedOperationMethod<
  ListAutomatedReasoningPolicyTestResultsRequest,
  ListAutomatedReasoningPolicyTestResultsResponse,
  ListAutomatedReasoningPolicyTestResultsError,
  Credentials | HttpClient.HttpClient,
  AutomatedReasoningPolicyTestResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAutomatedReasoningPolicyTestResultsRequest,
  output: ListAutomatedReasoningPolicyTestResultsResponse,
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
  operationName: "ListAutomatedReasoningPolicyTestResults",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "testResults",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCustomModelDeploymentsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists custom model deployments in your account. You can filter the results by creation time, name, status, and associated model. Use this operation to manage and monitor your custom model deployments.
 *
 * We recommend using pagination to ensure that the operation returns quickly and successfully.
 *
 * The following actions are related to the `ListCustomModelDeployments` operation:
 *
 * - CreateCustomModelDeployment
 *
 * - GetCustomModelDeployment
 *
 * - DeleteCustomModelDeployment
 */
export const listCustomModelDeployments: API.PaginatedOperationMethod<
  ListCustomModelDeploymentsRequest,
  ListCustomModelDeploymentsResponse,
  ListCustomModelDeploymentsError,
  Credentials | HttpClient.HttpClient,
  CustomModelDeploymentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCustomModelDeploymentsRequest,
  output: ListCustomModelDeploymentsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomModelDeployments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "modelDeploymentSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCustomModelsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the custom models that you have created with the `CreateModelCustomizationJob` operation.
 *
 * For more information, see Custom models in the Amazon Bedrock User Guide.
 */
export const listCustomModels: API.PaginatedOperationMethod<
  ListCustomModelsRequest,
  ListCustomModelsResponse,
  ListCustomModelsError,
  Credentials | HttpClient.HttpClient,
  CustomModelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCustomModelsRequest,
  output: ListCustomModelsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomModels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "modelSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnforcedGuardrailsConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the account-level enforced guardrail configurations.
 */
export const listEnforcedGuardrailsConfiguration: API.PaginatedOperationMethod<
  ListEnforcedGuardrailsConfigurationRequest,
  ListEnforcedGuardrailsConfigurationResponse,
  ListEnforcedGuardrailsConfigurationError,
  Credentials | HttpClient.HttpClient,
  AccountEnforcedGuardrailOutputConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEnforcedGuardrailsConfigurationRequest,
  output: ListEnforcedGuardrailsConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnforcedGuardrailsConfiguration",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "guardrailsConfig",
  } as const,
})) as any;

export type ListEvaluationJobsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all existing evaluation jobs.
 */
export const listEvaluationJobs: API.PaginatedOperationMethod<
  ListEvaluationJobsRequest,
  ListEvaluationJobsResponse,
  ListEvaluationJobsError,
  Credentials | HttpClient.HttpClient,
  EvaluationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEvaluationJobsRequest,
  output: ListEvaluationJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEvaluationJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFoundationModelAgreementOffersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the offers associated with the specified model.
 */
export const listFoundationModelAgreementOffers: API.OperationMethod<
  ListFoundationModelAgreementOffersRequest,
  ListFoundationModelAgreementOffersResponse,
  ListFoundationModelAgreementOffersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListFoundationModelAgreementOffersRequest,
  output: ListFoundationModelAgreementOffersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFoundationModelAgreementOffers",
}));

export type ListFoundationModelsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists Amazon Bedrock foundation models that you can use. You can filter the results with the request parameters. For more information, see Foundation models in the Amazon Bedrock User Guide.
 */
export const listFoundationModels: API.OperationMethod<
  ListFoundationModelsRequest,
  ListFoundationModelsResponse,
  ListFoundationModelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListFoundationModelsRequest,
  output: ListFoundationModelsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFoundationModels",
}));

export type ListGuardrailsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists details about all the guardrails in an account. To list the `DRAFT` version of all your guardrails, don't specify the `guardrailIdentifier` field. To list all versions of a guardrail, specify the ARN of the guardrail in the `guardrailIdentifier` field.
 *
 * You can set the maximum number of results to return in a response in the `maxResults` field. If there are more results than the number you set, the response returns a `nextToken` that you can send in another `ListGuardrails` request to see the next batch of results.
 */
export const listGuardrails: API.PaginatedOperationMethod<
  ListGuardrailsRequest,
  ListGuardrailsResponse,
  ListGuardrailsError,
  Credentials | HttpClient.HttpClient,
  GuardrailSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGuardrailsRequest,
  output: ListGuardrailsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGuardrails",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "guardrails",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListImportedModelsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of models you've imported. You can filter the results to return based on one or more criteria. For more information, see Import a customized model in the Amazon Bedrock User Guide.
 */
export const listImportedModels: API.PaginatedOperationMethod<
  ListImportedModelsRequest,
  ListImportedModelsResponse,
  ListImportedModelsError,
  Credentials | HttpClient.HttpClient,
  ImportedModelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListImportedModelsRequest,
  output: ListImportedModelsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImportedModels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "modelSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListInferenceProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of inference profiles that you can use. For more information, see Increase throughput and resilience with cross-region inference in Amazon Bedrock. in the Amazon Bedrock User Guide.
 */
export const listInferenceProfiles: API.PaginatedOperationMethod<
  ListInferenceProfilesRequest,
  ListInferenceProfilesResponse,
  ListInferenceProfilesError,
  Credentials | HttpClient.HttpClient,
  InferenceProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInferenceProfilesRequest,
  output: ListInferenceProfilesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInferenceProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "inferenceProfileSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMarketplaceModelEndpointsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the endpoints for models from Amazon Bedrock Marketplace in your Amazon Web Services account.
 */
export const listMarketplaceModelEndpoints: API.PaginatedOperationMethod<
  ListMarketplaceModelEndpointsRequest,
  ListMarketplaceModelEndpointsResponse,
  ListMarketplaceModelEndpointsError,
  Credentials | HttpClient.HttpClient,
  MarketplaceModelEndpointSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMarketplaceModelEndpointsRequest,
  output: ListMarketplaceModelEndpointsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMarketplaceModelEndpoints",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "marketplaceModelEndpoints",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListModelCopyJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of model copy jobs that you have submitted. You can filter the jobs to return based on one or more criteria. For more information, see Copy models to be used in other regions in the Amazon Bedrock User Guide.
 */
export const listModelCopyJobs: API.PaginatedOperationMethod<
  ListModelCopyJobsRequest,
  ListModelCopyJobsResponse,
  ListModelCopyJobsError,
  Credentials | HttpClient.HttpClient,
  ModelCopyJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListModelCopyJobsRequest,
  output: ListModelCopyJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModelCopyJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "modelCopyJobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListModelCustomizationJobsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of model customization jobs that you have submitted. You can filter the jobs to return based on one or more criteria.
 *
 * For more information, see Custom models in the Amazon Bedrock User Guide.
 */
export const listModelCustomizationJobs: API.PaginatedOperationMethod<
  ListModelCustomizationJobsRequest,
  ListModelCustomizationJobsResponse,
  ListModelCustomizationJobsError,
  Credentials | HttpClient.HttpClient,
  ModelCustomizationJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListModelCustomizationJobsRequest,
  output: ListModelCustomizationJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModelCustomizationJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "modelCustomizationJobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListModelImportJobsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of import jobs you've submitted. You can filter the results to return based on one or more criteria. For more information, see Import a customized model in the Amazon Bedrock User Guide.
 */
export const listModelImportJobs: API.PaginatedOperationMethod<
  ListModelImportJobsRequest,
  ListModelImportJobsResponse,
  ListModelImportJobsError,
  Credentials | HttpClient.HttpClient,
  ModelImportJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListModelImportJobsRequest,
  output: ListModelImportJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModelImportJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "modelImportJobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListModelInvocationJobsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all batch inference jobs in the account. For more information, see View details about a batch inference job.
 */
export const listModelInvocationJobs: API.PaginatedOperationMethod<
  ListModelInvocationJobsRequest,
  ListModelInvocationJobsResponse,
  ListModelInvocationJobsError,
  Credentials | HttpClient.HttpClient,
  ModelInvocationJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListModelInvocationJobsRequest,
  output: ListModelInvocationJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModelInvocationJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "invocationJobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPromptRoutersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of prompt routers.
 */
export const listPromptRouters: API.PaginatedOperationMethod<
  ListPromptRoutersRequest,
  ListPromptRoutersResponse,
  ListPromptRoutersError,
  Credentials | HttpClient.HttpClient,
  PromptRouterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPromptRoutersRequest,
  output: ListPromptRoutersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPromptRouters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "promptRouterSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProvisionedModelThroughputsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Provisioned Throughputs in the account. For more information, see Provisioned Throughput in the Amazon Bedrock User Guide.
 */
export const listProvisionedModelThroughputs: API.PaginatedOperationMethod<
  ListProvisionedModelThroughputsRequest,
  ListProvisionedModelThroughputsResponse,
  ListProvisionedModelThroughputsError,
  Credentials | HttpClient.HttpClient,
  ProvisionedModelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProvisionedModelThroughputsRequest,
  output: ListProvisionedModelThroughputsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProvisionedModelThroughputs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "provisionedModelSummaries",
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
 * List the tags associated with the specified resource.
 *
 * For more information, see Tagging resources in the Amazon Bedrock User Guide.
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

export type PutAccountDataRetentionError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets the account-wide data retention mode for Amazon Bedrock.
 */
export const putAccountDataRetention: API.OperationMethod<
  PutAccountDataRetentionRequest,
  PutAccountDataRetentionResponse,
  PutAccountDataRetentionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAccountDataRetentionRequest,
  output: PutAccountDataRetentionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountDataRetention",
}));

export type PutEnforcedGuardrailConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets the account-level enforced guardrail configuration.
 */
export const putEnforcedGuardrailConfiguration: API.OperationMethod<
  PutEnforcedGuardrailConfigurationRequest,
  PutEnforcedGuardrailConfigurationResponse,
  PutEnforcedGuardrailConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutEnforcedGuardrailConfigurationRequest,
  output: PutEnforcedGuardrailConfigurationResponse,
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
  operationName: "PutEnforcedGuardrailConfiguration",
}));

export type PutModelInvocationLoggingConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Set the configuration values for model invocation logging.
 */
export const putModelInvocationLoggingConfiguration: API.OperationMethod<
  PutModelInvocationLoggingConfigurationRequest,
  PutModelInvocationLoggingConfigurationResponse,
  PutModelInvocationLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutModelInvocationLoggingConfigurationRequest,
  output: PutModelInvocationLoggingConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutModelInvocationLoggingConfiguration",
}));

export type PutResourcePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a resource policy for a Bedrock resource.
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
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type PutUseCaseForModelAccessError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Put usecase for model access.
 */
export const putUseCaseForModelAccess: API.OperationMethod<
  PutUseCaseForModelAccessRequest,
  PutUseCaseForModelAccessResponse,
  PutUseCaseForModelAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutUseCaseForModelAccessRequest,
  output: PutUseCaseForModelAccessResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutUseCaseForModelAccess",
}));

export type RegisterMarketplaceModelEndpointError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Registers an existing Amazon SageMaker endpoint with Amazon Bedrock Marketplace, allowing it to be used with Amazon Bedrock APIs.
 */
export const registerMarketplaceModelEndpoint: API.OperationMethod<
  RegisterMarketplaceModelEndpointRequest,
  RegisterMarketplaceModelEndpointResponse,
  RegisterMarketplaceModelEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterMarketplaceModelEndpointRequest,
  output: RegisterMarketplaceModelEndpointResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterMarketplaceModelEndpoint",
}));

export type StartAutomatedReasoningPolicyBuildWorkflowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a new build workflow for an Automated Reasoning policy. This initiates the process of analyzing source documents and generating policy rules, variables, and types.
 */
export const startAutomatedReasoningPolicyBuildWorkflow: API.OperationMethod<
  StartAutomatedReasoningPolicyBuildWorkflowRequest,
  StartAutomatedReasoningPolicyBuildWorkflowResponse,
  StartAutomatedReasoningPolicyBuildWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartAutomatedReasoningPolicyBuildWorkflowRequest,
  output: StartAutomatedReasoningPolicyBuildWorkflowResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAutomatedReasoningPolicyBuildWorkflow",
}));

export type StartAutomatedReasoningPolicyTestWorkflowError =
  | AccessDeniedException
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates a test workflow to validate Automated Reasoning policy tests. The workflow executes the specified tests against the policy and generates validation results.
 */
export const startAutomatedReasoningPolicyTestWorkflow: API.OperationMethod<
  StartAutomatedReasoningPolicyTestWorkflowRequest,
  StartAutomatedReasoningPolicyTestWorkflowResponse,
  StartAutomatedReasoningPolicyTestWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartAutomatedReasoningPolicyTestWorkflowRequest,
  output: StartAutomatedReasoningPolicyTestWorkflowResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAutomatedReasoningPolicyTestWorkflow",
}));

export type StopAdvancedPromptOptimizationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops an advanced prompt optimization job that is in progress.
 */
export const stopAdvancedPromptOptimizationJob: API.OperationMethod<
  StopAdvancedPromptOptimizationJobRequest,
  StopAdvancedPromptOptimizationJobResponse,
  StopAdvancedPromptOptimizationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopAdvancedPromptOptimizationJobRequest,
  output: StopAdvancedPromptOptimizationJobResponse,
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
  operationName: "StopAdvancedPromptOptimizationJob",
}));

export type StopEvaluationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops an evaluation job that is current being created or running.
 */
export const stopEvaluationJob: API.OperationMethod<
  StopEvaluationJobRequest,
  StopEvaluationJobResponse,
  StopEvaluationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopEvaluationJobRequest,
  output: StopEvaluationJobResponse,
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
  operationName: "StopEvaluationJob",
}));

export type StopModelCustomizationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops an active model customization job. For more information, see Custom models in the Amazon Bedrock User Guide.
 */
export const stopModelCustomizationJob: API.OperationMethod<
  StopModelCustomizationJobRequest,
  StopModelCustomizationJobResponse,
  StopModelCustomizationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopModelCustomizationJobRequest,
  output: StopModelCustomizationJobResponse,
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
  operationName: "StopModelCustomizationJob",
}));

export type StopModelInvocationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a batch inference job. You're only charged for tokens that were already processed. For more information, see Stop a batch inference job.
 */
export const stopModelInvocationJob: API.OperationMethod<
  StopModelInvocationJobRequest,
  StopModelInvocationJobResponse,
  StopModelInvocationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopModelInvocationJobRequest,
  output: StopModelInvocationJobResponse,
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
  operationName: "StopModelInvocationJob",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Associate tags with a resource. For more information, see Tagging resources in the Amazon Bedrock User Guide.
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
    ThrottlingException,
    TooManyTagsException,
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
 * Remove one or more tags from a resource. For more information, see Tagging resources in the Amazon Bedrock User Guide.
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

export type UpdateAutomatedReasoningPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing Automated Reasoning policy with new rules, variables, or configuration. This creates a new version of the policy while preserving the previous version.
 */
export const updateAutomatedReasoningPolicy: API.OperationMethod<
  UpdateAutomatedReasoningPolicyRequest,
  UpdateAutomatedReasoningPolicyResponse,
  UpdateAutomatedReasoningPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAutomatedReasoningPolicyRequest,
  output: UpdateAutomatedReasoningPolicyResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAutomatedReasoningPolicy",
}));

export type UpdateAutomatedReasoningPolicyAnnotationsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the annotations for an Automated Reasoning policy build workflow. This allows you to modify extracted rules, variables, and types before finalizing the policy.
 */
export const updateAutomatedReasoningPolicyAnnotations: API.OperationMethod<
  UpdateAutomatedReasoningPolicyAnnotationsRequest,
  UpdateAutomatedReasoningPolicyAnnotationsResponse,
  UpdateAutomatedReasoningPolicyAnnotationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAutomatedReasoningPolicyAnnotationsRequest,
  output: UpdateAutomatedReasoningPolicyAnnotationsResponse,
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
  operationName: "UpdateAutomatedReasoningPolicyAnnotations",
}));

export type UpdateAutomatedReasoningPolicyTestCaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing Automated Reasoning policy test. You can modify the content, query, expected result, and confidence threshold.
 */
export const updateAutomatedReasoningPolicyTestCase: API.OperationMethod<
  UpdateAutomatedReasoningPolicyTestCaseRequest,
  UpdateAutomatedReasoningPolicyTestCaseResponse,
  UpdateAutomatedReasoningPolicyTestCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAutomatedReasoningPolicyTestCaseRequest,
  output: UpdateAutomatedReasoningPolicyTestCaseResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAutomatedReasoningPolicyTestCase",
}));

export type UpdateCustomModelDeploymentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a custom model deployment with a new custom model. This allows you to deploy updated models without creating new deployment endpoints.
 */
export const updateCustomModelDeployment: API.OperationMethod<
  UpdateCustomModelDeploymentRequest,
  UpdateCustomModelDeploymentResponse,
  UpdateCustomModelDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCustomModelDeploymentRequest,
  output: UpdateCustomModelDeploymentResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCustomModelDeployment",
}));

export type UpdateGuardrailError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a guardrail with the values you specify.
 *
 * - Specify a `name` and optional `description`.
 *
 * - Specify messages for when the guardrail successfully blocks a prompt or a model response in the `blockedInputMessaging` and `blockedOutputsMessaging` fields.
 *
 * - Specify topics for the guardrail to deny in the `topicPolicyConfig` object. Each GuardrailTopicConfig object in the `topicsConfig` list pertains to one topic.
 *
 * - Give a `name` and `description` so that the guardrail can properly identify the topic.
 *
 * - Specify `DENY` in the `type` field.
 *
 * - (Optional) Provide up to five prompts that you would categorize as belonging to the topic in the `examples` list.
 *
 * - Specify filter strengths for the harmful categories defined in Amazon Bedrock in the `contentPolicyConfig` object. Each GuardrailContentFilterConfig object in the `filtersConfig` list pertains to a harmful category. For more information, see Content filters. For more information about the fields in a content filter, see GuardrailContentFilterConfig.
 *
 * - Specify the category in the `type` field.
 *
 * - Specify the strength of the filter for prompts in the `inputStrength` field and for model responses in the `strength` field of the GuardrailContentFilterConfig.
 *
 * - (Optional) For security, include the ARN of a KMS key in the `kmsKeyId` field.
 */
export const updateGuardrail: API.OperationMethod<
  UpdateGuardrailRequest,
  UpdateGuardrailResponse,
  UpdateGuardrailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGuardrailRequest,
  output: UpdateGuardrailResponse,
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
  operationName: "UpdateGuardrail",
}));

export type UpdateMarketplaceModelEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an existing endpoint for a model from Amazon Bedrock Marketplace.
 */
export const updateMarketplaceModelEndpoint: API.OperationMethod<
  UpdateMarketplaceModelEndpointRequest,
  UpdateMarketplaceModelEndpointResponse,
  UpdateMarketplaceModelEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMarketplaceModelEndpointRequest,
  output: UpdateMarketplaceModelEndpointResponse,
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
  operationName: "UpdateMarketplaceModelEndpoint",
}));

export type UpdateProvisionedModelThroughputError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the name or associated model for a Provisioned Throughput. For more information, see Provisioned Throughput in the Amazon Bedrock User Guide.
 */
export const updateProvisionedModelThroughput: API.OperationMethod<
  UpdateProvisionedModelThroughputRequest,
  UpdateProvisionedModelThroughputResponse,
  UpdateProvisionedModelThroughputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProvisionedModelThroughputRequest,
  output: UpdateProvisionedModelThroughputResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProvisionedModelThroughput",
}));
