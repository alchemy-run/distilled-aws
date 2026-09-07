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
const ns = T.XmlNamespace("http://codepipeline.amazonaws.com/doc/2015-07-09/");
const svc = T.AwsApiService({
  sdkId: "CodePipeline",
  serviceShapeName: "CodePipeline_20150709",
});
const auth = T.AwsAuthSigv4({ name: "codepipeline" });
const ver = T.ServiceVersion("2015-07-09");
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
              `https://codepipeline-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://codepipeline-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://codepipeline.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://codepipeline.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ActionExecutionNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ActionExecutionNotFoundException>()(
    "ActionExecutionNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ActionNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ActionNotFoundException>()(
    "ActionNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ActionTypeNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ActionTypeNotFoundException>()(
    "ActionTypeNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ApprovalAlreadyCompletedException
  extends /*@__PURE__*/ S.TaggedError<ApprovalAlreadyCompletedException>()(
    "ApprovalAlreadyCompletedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ConcurrentPipelineExecutionsLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentPipelineExecutionsLimitExceededException>()(
    "ConcurrentPipelineExecutionsLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ConditionNotOverridableException
  extends /*@__PURE__*/ S.TaggedError<ConditionNotOverridableException>()(
    "ConditionNotOverridableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DuplicatedStopRequestException
  extends /*@__PURE__*/ S.TaggedError<DuplicatedStopRequestException>()(
    "DuplicatedStopRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidActionDeclarationException
  extends /*@__PURE__*/ S.TaggedError<InvalidActionDeclarationException>()(
    "InvalidActionDeclarationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidApprovalTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidApprovalTokenException>()(
    "InvalidApprovalTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidArnException>()(
    "InvalidArnException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidBlockerDeclarationException
  extends /*@__PURE__*/ S.TaggedError<InvalidBlockerDeclarationException>()(
    "InvalidBlockerDeclarationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidClientTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidClientTokenException>()(
    "InvalidClientTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidJobException
  extends /*@__PURE__*/ S.TaggedError<InvalidJobException>()(
    "InvalidJobException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidJobStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidJobStateException>()(
    "InvalidJobStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidNonceException
  extends /*@__PURE__*/ S.TaggedError<InvalidNonceException>()(
    "InvalidNonceException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidStageDeclarationException
  extends /*@__PURE__*/ S.TaggedError<InvalidStageDeclarationException>()(
    "InvalidStageDeclarationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidStructureException
  extends /*@__PURE__*/ S.TaggedError<InvalidStructureException>()(
    "InvalidStructureException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidTagsException
  extends /*@__PURE__*/ S.TaggedError<InvalidTagsException>()(
    "InvalidTagsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidWebhookAuthenticationParametersException
  extends /*@__PURE__*/ S.TaggedError<InvalidWebhookAuthenticationParametersException>()(
    "InvalidWebhookAuthenticationParametersException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidWebhookFilterPatternException
  extends /*@__PURE__*/ S.TaggedError<InvalidWebhookFilterPatternException>()(
    "InvalidWebhookFilterPatternException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class JobNotFoundException
  extends /*@__PURE__*/ S.TaggedError<JobNotFoundException>()(
    "JobNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class NotLatestPipelineExecutionException
  extends /*@__PURE__*/ S.TaggedError<NotLatestPipelineExecutionException>()(
    "NotLatestPipelineExecutionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class OutputVariablesSizeExceededException
  extends /*@__PURE__*/ S.TaggedError<OutputVariablesSizeExceededException>()(
    "OutputVariablesSizeExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class PipelineExecutionNotFoundException
  extends /*@__PURE__*/ S.TaggedError<PipelineExecutionNotFoundException>()(
    "PipelineExecutionNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class PipelineExecutionNotStoppableException
  extends /*@__PURE__*/ S.TaggedError<PipelineExecutionNotStoppableException>()(
    "PipelineExecutionNotStoppableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class PipelineExecutionOutdatedException
  extends /*@__PURE__*/ S.TaggedError<PipelineExecutionOutdatedException>()(
    "PipelineExecutionOutdatedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class PipelineNameInUseException
  extends /*@__PURE__*/ S.TaggedError<PipelineNameInUseException>()(
    "PipelineNameInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class PipelineNotFoundException
  extends /*@__PURE__*/ S.TaggedError<PipelineNotFoundException>()(
    "PipelineNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class PipelineVersionNotFoundException
  extends /*@__PURE__*/ S.TaggedError<PipelineVersionNotFoundException>()(
    "PipelineVersionNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class RequestFailedException
  extends /*@__PURE__*/ S.TaggedError<RequestFailedException>()(
    "RequestFailedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class StageNotFoundException
  extends /*@__PURE__*/ S.TaggedError<StageNotFoundException>()(
    "StageNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class StageNotRetryableException
  extends /*@__PURE__*/ S.TaggedError<StageNotRetryableException>()(
    "StageNotRetryableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class UnableToRollbackStageException
  extends /*@__PURE__*/ S.TaggedError<UnableToRollbackStageException>()(
    "UnableToRollbackStageException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class WebhookNotFoundException
  extends /*@__PURE__*/ S.TaggedError<WebhookNotFoundException>()(
    "WebhookNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type JobId = string;
export type Nonce = string;
export interface AcknowledgeJobInput {
  jobId: string;
  nonce: string;
}
export const AcknowledgeJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String, nonce: S.String }).pipe(
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
  identifier: "AcknowledgeJobInput",
}) as any as S.Schema<AcknowledgeJobInput>;
export type JobStatus =
  | "Created"
  | "Queued"
  | "Dispatched"
  | "InProgress"
  | "TimedOut"
  | "Succeeded"
  | "Failed"
  | (string & {});
export const JobStatus = S.String;

export interface AcknowledgeJobOutput {
  status?: JobStatus;
}
export const AcknowledgeJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(JobStatus) }).pipe(ns),
).annotate({
  identifier: "AcknowledgeJobOutput",
}) as any as S.Schema<AcknowledgeJobOutput>;
export type ThirdPartyJobId = string;
export type ClientToken = string;
export interface AcknowledgeThirdPartyJobInput {
  jobId: string;
  nonce: string;
  clientToken: string;
}
export const AcknowledgeThirdPartyJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String, nonce: S.String, clientToken: S.String }).pipe(
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
  identifier: "AcknowledgeThirdPartyJobInput",
}) as any as S.Schema<AcknowledgeThirdPartyJobInput>;
export interface AcknowledgeThirdPartyJobOutput {
  status?: JobStatus;
}
export const AcknowledgeThirdPartyJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(JobStatus) }).pipe(ns),
).annotate({
  identifier: "AcknowledgeThirdPartyJobOutput",
}) as any as S.Schema<AcknowledgeThirdPartyJobOutput>;
export type ActionCategory =
  | "Source"
  | "Build"
  | "Deploy"
  | "Test"
  | "Invoke"
  | "Approval"
  | "Compute"
  | (string & {});
export const ActionCategory = S.String;

export type ActionProvider = string;
export type Version = string;
export type Url = string;
export type UrlTemplate = string;
export interface ActionTypeSettings {
  thirdPartyConfigurationUrl?: string;
  entityUrlTemplate?: string;
  executionUrlTemplate?: string;
  revisionUrlTemplate?: string;
}
export const ActionTypeSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thirdPartyConfigurationUrl: S.optional(S.String),
    entityUrlTemplate: S.optional(S.String),
    executionUrlTemplate: S.optional(S.String),
    revisionUrlTemplate: S.optional(S.String),
  }),
).annotate({
  identifier: "ActionTypeSettings",
}) as any as S.Schema<ActionTypeSettings>;
export type ActionConfigurationKey = string;
export type Description = string;
export type ActionConfigurationPropertyType =
  | "String"
  | "Number"
  | "Boolean"
  | (string & {});
export const ActionConfigurationPropertyType = S.String;

export interface ActionConfigurationProperty {
  name: string;
  required: boolean;
  key: boolean;
  secret: boolean;
  queryable?: boolean;
  description?: string;
  type?: ActionConfigurationPropertyType;
}
export const ActionConfigurationProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    required: S.Boolean,
    key: S.Boolean,
    secret: S.Boolean,
    queryable: S.optional(S.Boolean),
    description: S.optional(S.String),
    type: S.optional(ActionConfigurationPropertyType),
  }),
).annotate({
  identifier: "ActionConfigurationProperty",
}) as any as S.Schema<ActionConfigurationProperty>;
export type ActionConfigurationPropertyList = ActionConfigurationProperty[];
export const ActionConfigurationPropertyList = /*@__PURE__*/ S.Array(
  ActionConfigurationProperty,
);
export type MinimumArtifactCount = number;
export type MaximumArtifactCount = number;
export interface ArtifactDetails {
  minimumCount: number;
  maximumCount: number;
}
export const ArtifactDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ minimumCount: S.Number, maximumCount: S.Number }),
).annotate({
  identifier: "ArtifactDetails",
}) as any as S.Schema<ArtifactDetails>;
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
export interface CreateCustomActionTypeInput {
  category: ActionCategory;
  provider: string;
  version: string;
  settings?: ActionTypeSettings;
  configurationProperties?: ActionConfigurationProperty[];
  inputArtifactDetails: ArtifactDetails;
  outputArtifactDetails: ArtifactDetails;
  tags?: Tag[];
}
export const CreateCustomActionTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    category: ActionCategory,
    provider: S.String,
    version: S.String,
    settings: S.optional(ActionTypeSettings),
    configurationProperties: S.optional(ActionConfigurationPropertyList),
    inputArtifactDetails: ArtifactDetails,
    outputArtifactDetails: ArtifactDetails,
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
  identifier: "CreateCustomActionTypeInput",
}) as any as S.Schema<CreateCustomActionTypeInput>;
export type ActionOwner = "AWS" | "ThirdParty" | "Custom" | (string & {});
export const ActionOwner = S.String;

export interface ActionTypeId {
  category: ActionCategory;
  owner: ActionOwner;
  provider: string;
  version: string;
}
export const ActionTypeId = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    category: ActionCategory,
    owner: ActionOwner,
    provider: S.String,
    version: S.String,
  }),
).annotate({ identifier: "ActionTypeId" }) as any as S.Schema<ActionTypeId>;
export interface ActionType {
  id: ActionTypeId;
  settings?: ActionTypeSettings;
  actionConfigurationProperties?: ActionConfigurationProperty[];
  inputArtifactDetails: ArtifactDetails;
  outputArtifactDetails: ArtifactDetails;
}
export const ActionType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: ActionTypeId,
    settings: S.optional(ActionTypeSettings),
    actionConfigurationProperties: S.optional(ActionConfigurationPropertyList),
    inputArtifactDetails: ArtifactDetails,
    outputArtifactDetails: ArtifactDetails,
  }),
).annotate({ identifier: "ActionType" }) as any as S.Schema<ActionType>;
export interface CreateCustomActionTypeOutput {
  actionType: ActionType;
  tags?: Tag[];
}
export const CreateCustomActionTypeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ actionType: ActionType, tags: S.optional(TagList) }).pipe(ns),
).annotate({
  identifier: "CreateCustomActionTypeOutput",
}) as any as S.Schema<CreateCustomActionTypeOutput>;
export type PipelineName = string;
export type RoleArn = string;
export type ArtifactStoreType = "S3" | (string & {});
export const ArtifactStoreType = S.String;

export type ArtifactStoreLocation = string;
export type EncryptionKeyId = string;
export type EncryptionKeyType = "KMS" | (string & {});
export const EncryptionKeyType = S.String;

export interface EncryptionKey {
  id: string;
  type: EncryptionKeyType;
}
export const EncryptionKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String, type: EncryptionKeyType }),
).annotate({ identifier: "EncryptionKey" }) as any as S.Schema<EncryptionKey>;
export interface ArtifactStore {
  type: ArtifactStoreType;
  location: string;
  encryptionKey?: EncryptionKey;
}
export const ArtifactStore = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: ArtifactStoreType,
    location: S.String,
    encryptionKey: S.optional(EncryptionKey),
  }),
).annotate({ identifier: "ArtifactStore" }) as any as S.Schema<ArtifactStore>;
export type AWSRegionName = string;
export type ArtifactStoreMap = { [key: string]: ArtifactStore | undefined };
export const ArtifactStoreMap = /*@__PURE__*/ S.Record(
  S.String,
  ArtifactStore.pipe(S.optional),
);
export type StageName = string;
export type BlockerName = string;
export type BlockerType = "Schedule" | (string & {});
export const BlockerType = S.String;

export interface BlockerDeclaration {
  name: string;
  type: BlockerType;
}
export const BlockerDeclaration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, type: BlockerType }),
).annotate({
  identifier: "BlockerDeclaration",
}) as any as S.Schema<BlockerDeclaration>;
export type StageBlockerDeclarationList = BlockerDeclaration[];
export const StageBlockerDeclarationList =
  /*@__PURE__*/ S.Array(BlockerDeclaration);
export type ActionName = string;
export type ActionRunOrder = number;
export type ActionConfigurationValue = string;
export type ActionConfigurationMap = { [key: string]: string | undefined };
export const ActionConfigurationMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type Command = string;
export type CommandList = string[];
export const CommandList = /*@__PURE__*/ S.Array(S.String);
export type ArtifactName = string;
export type FilePath = string;
export type FilePathList = string[];
export const FilePathList = /*@__PURE__*/ S.Array(S.String);
export interface OutputArtifact {
  name: string;
  files?: string[];
}
export const OutputArtifact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, files: S.optional(FilePathList) }),
).annotate({ identifier: "OutputArtifact" }) as any as S.Schema<OutputArtifact>;
export type OutputArtifactList = OutputArtifact[];
export const OutputArtifactList = /*@__PURE__*/ S.Array(OutputArtifact);
export interface InputArtifact {
  name: string;
}
export const InputArtifact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }),
).annotate({ identifier: "InputArtifact" }) as any as S.Schema<InputArtifact>;
export type InputArtifactList = InputArtifact[];
export const InputArtifactList = /*@__PURE__*/ S.Array(InputArtifact);
export type OutputVariable = string;
export type OutputVariableList = string[];
export const OutputVariableList = /*@__PURE__*/ S.Array(S.String);
export type ActionNamespace = string;
export type ActionTimeout = number;
export type EnvironmentVariableName = string;
export type EnvironmentVariableValue = string;
export type EnvironmentVariableType =
  | "PLAINTEXT"
  | "SECRETS_MANAGER"
  | (string & {});
export const EnvironmentVariableType = S.String;

export interface EnvironmentVariable {
  name: string;
  value: string;
  type?: EnvironmentVariableType;
}
export const EnvironmentVariable = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    value: S.String,
    type: S.optional(EnvironmentVariableType),
  }),
).annotate({
  identifier: "EnvironmentVariable",
}) as any as S.Schema<EnvironmentVariable>;
export type EnvironmentVariableList = EnvironmentVariable[];
export const EnvironmentVariableList =
  /*@__PURE__*/ S.Array(EnvironmentVariable);
export interface ActionDeclaration {
  name: string;
  actionTypeId: ActionTypeId;
  runOrder?: number;
  configuration?: { [key: string]: string | undefined };
  commands?: string[];
  outputArtifacts?: OutputArtifact[];
  inputArtifacts?: InputArtifact[];
  outputVariables?: string[];
  roleArn?: string;
  region?: string;
  namespace?: string;
  timeoutInMinutes?: number;
  environmentVariables?: EnvironmentVariable[];
}
export const ActionDeclaration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    actionTypeId: ActionTypeId,
    runOrder: S.optional(S.Number),
    configuration: S.optional(ActionConfigurationMap),
    commands: S.optional(CommandList),
    outputArtifacts: S.optional(OutputArtifactList),
    inputArtifacts: S.optional(InputArtifactList),
    outputVariables: S.optional(OutputVariableList),
    roleArn: S.optional(S.String),
    region: S.optional(S.String),
    namespace: S.optional(S.String),
    timeoutInMinutes: S.optional(S.Number),
    environmentVariables: S.optional(EnvironmentVariableList),
  }),
).annotate({
  identifier: "ActionDeclaration",
}) as any as S.Schema<ActionDeclaration>;
export type StageActionDeclarationList = ActionDeclaration[];
export const StageActionDeclarationList =
  /*@__PURE__*/ S.Array(ActionDeclaration);
export type Result = "ROLLBACK" | "FAIL" | "RETRY" | "SKIP" | (string & {});
export const Result = S.String;

export type StageRetryMode = "FAILED_ACTIONS" | "ALL_ACTIONS" | (string & {});
export const StageRetryMode = S.String;

export interface RetryConfiguration {
  retryMode?: StageRetryMode;
}
export const RetryConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ retryMode: S.optional(StageRetryMode) }),
).annotate({
  identifier: "RetryConfiguration",
}) as any as S.Schema<RetryConfiguration>;
export type RuleName = string;
export type RuleCategory = "Rule" | (string & {});
export const RuleCategory = S.String;

export type RuleOwner = "AWS" | (string & {});
export const RuleOwner = S.String;

export type RuleProvider = string;
export interface RuleTypeId {
  category: RuleCategory;
  owner?: RuleOwner;
  provider: string;
  version?: string;
}
export const RuleTypeId = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    category: RuleCategory,
    owner: S.optional(RuleOwner),
    provider: S.String,
    version: S.optional(S.String),
  }),
).annotate({ identifier: "RuleTypeId" }) as any as S.Schema<RuleTypeId>;
export type RuleConfigurationKey = string;
export type RuleConfigurationValue = string;
export type RuleConfigurationMap = { [key: string]: string | undefined };
export const RuleConfigurationMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type RuleTimeout = number;
export interface RuleDeclaration {
  name: string;
  ruleTypeId: RuleTypeId;
  configuration?: { [key: string]: string | undefined };
  commands?: string[];
  inputArtifacts?: InputArtifact[];
  roleArn?: string;
  region?: string;
  timeoutInMinutes?: number;
}
export const RuleDeclaration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    ruleTypeId: RuleTypeId,
    configuration: S.optional(RuleConfigurationMap),
    commands: S.optional(CommandList),
    inputArtifacts: S.optional(InputArtifactList),
    roleArn: S.optional(S.String),
    region: S.optional(S.String),
    timeoutInMinutes: S.optional(S.Number),
  }),
).annotate({
  identifier: "RuleDeclaration",
}) as any as S.Schema<RuleDeclaration>;
export type RuleDeclarationList = RuleDeclaration[];
export const RuleDeclarationList = /*@__PURE__*/ S.Array(RuleDeclaration);
export interface Condition {
  result?: Result;
  rules?: RuleDeclaration[];
}
export const Condition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    result: S.optional(Result),
    rules: S.optional(RuleDeclarationList),
  }),
).annotate({ identifier: "Condition" }) as any as S.Schema<Condition>;
export type ConditionList = Condition[];
export const ConditionList = /*@__PURE__*/ S.Array(Condition);
export interface FailureConditions {
  result?: Result;
  retryConfiguration?: RetryConfiguration;
  conditions?: Condition[];
}
export const FailureConditions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    result: S.optional(Result),
    retryConfiguration: S.optional(RetryConfiguration),
    conditions: S.optional(ConditionList),
  }),
).annotate({
  identifier: "FailureConditions",
}) as any as S.Schema<FailureConditions>;
export interface SuccessConditions {
  conditions: Condition[];
}
export const SuccessConditions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ conditions: ConditionList }),
).annotate({
  identifier: "SuccessConditions",
}) as any as S.Schema<SuccessConditions>;
export interface BeforeEntryConditions {
  conditions: Condition[];
}
export const BeforeEntryConditions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ conditions: ConditionList }),
).annotate({
  identifier: "BeforeEntryConditions",
}) as any as S.Schema<BeforeEntryConditions>;
export interface StageDeclaration {
  name: string;
  blockers?: BlockerDeclaration[];
  actions: ActionDeclaration[];
  onFailure?: FailureConditions;
  onSuccess?: SuccessConditions;
  beforeEntry?: BeforeEntryConditions;
}
export const StageDeclaration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    blockers: S.optional(StageBlockerDeclarationList),
    actions: StageActionDeclarationList,
    onFailure: S.optional(FailureConditions),
    onSuccess: S.optional(SuccessConditions),
    beforeEntry: S.optional(BeforeEntryConditions),
  }),
).annotate({
  identifier: "StageDeclaration",
}) as any as S.Schema<StageDeclaration>;
export type PipelineStageDeclarationList = StageDeclaration[];
export const PipelineStageDeclarationList =
  /*@__PURE__*/ S.Array(StageDeclaration);
export type PipelineVersion = number;
export type ExecutionMode =
  | "QUEUED"
  | "SUPERSEDED"
  | "PARALLEL"
  | (string & {});
export const ExecutionMode = S.String;

export type PipelineType = "V1" | "V2" | (string & {});
export const PipelineType = S.String;

export type PipelineVariableName = string;
export type PipelineVariableValue = string;
export type PipelineVariableDescription = string;
export interface PipelineVariableDeclaration {
  name: string;
  defaultValue?: string;
  description?: string;
}
export const PipelineVariableDeclaration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    defaultValue: S.optional(S.String),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "PipelineVariableDeclaration",
}) as any as S.Schema<PipelineVariableDeclaration>;
export type PipelineVariableDeclarationList = PipelineVariableDeclaration[];
export const PipelineVariableDeclarationList = /*@__PURE__*/ S.Array(
  PipelineVariableDeclaration,
);
export type PipelineTriggerProviderType =
  | "CodeStarSourceConnection"
  | (string & {});
export const PipelineTriggerProviderType = S.String;

export type GitTagNamePattern = string;
export type GitTagPatternList = string[];
export const GitTagPatternList = /*@__PURE__*/ S.Array(S.String);
export interface GitTagFilterCriteria {
  includes?: string[];
  excludes?: string[];
}
export const GitTagFilterCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    includes: S.optional(GitTagPatternList),
    excludes: S.optional(GitTagPatternList),
  }),
).annotate({
  identifier: "GitTagFilterCriteria",
}) as any as S.Schema<GitTagFilterCriteria>;
export type GitBranchNamePattern = string;
export type GitBranchPatternList = string[];
export const GitBranchPatternList = /*@__PURE__*/ S.Array(S.String);
export interface GitBranchFilterCriteria {
  includes?: string[];
  excludes?: string[];
}
export const GitBranchFilterCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    includes: S.optional(GitBranchPatternList),
    excludes: S.optional(GitBranchPatternList),
  }),
).annotate({
  identifier: "GitBranchFilterCriteria",
}) as any as S.Schema<GitBranchFilterCriteria>;
export type GitFilePathPattern = string;
export type GitFilePathPatternList = string[];
export const GitFilePathPatternList = /*@__PURE__*/ S.Array(S.String);
export interface GitFilePathFilterCriteria {
  includes?: string[];
  excludes?: string[];
}
export const GitFilePathFilterCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    includes: S.optional(GitFilePathPatternList),
    excludes: S.optional(GitFilePathPatternList),
  }),
).annotate({
  identifier: "GitFilePathFilterCriteria",
}) as any as S.Schema<GitFilePathFilterCriteria>;
export interface GitPushFilter {
  tags?: GitTagFilterCriteria;
  branches?: GitBranchFilterCriteria;
  filePaths?: GitFilePathFilterCriteria;
}
export const GitPushFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tags: S.optional(GitTagFilterCriteria),
    branches: S.optional(GitBranchFilterCriteria),
    filePaths: S.optional(GitFilePathFilterCriteria),
  }),
).annotate({ identifier: "GitPushFilter" }) as any as S.Schema<GitPushFilter>;
export type GitPushFilterList = GitPushFilter[];
export const GitPushFilterList = /*@__PURE__*/ S.Array(GitPushFilter);
export type GitPullRequestEventType =
  | "OPEN"
  | "UPDATED"
  | "CLOSED"
  | (string & {});
export const GitPullRequestEventType = S.String;

export type GitPullRequestEventTypeList = GitPullRequestEventType[];
export const GitPullRequestEventTypeList = /*@__PURE__*/ S.Array(
  GitPullRequestEventType,
);
export interface GitPullRequestFilter {
  events?: GitPullRequestEventType[];
  branches?: GitBranchFilterCriteria;
  filePaths?: GitFilePathFilterCriteria;
}
export const GitPullRequestFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    events: S.optional(GitPullRequestEventTypeList),
    branches: S.optional(GitBranchFilterCriteria),
    filePaths: S.optional(GitFilePathFilterCriteria),
  }),
).annotate({
  identifier: "GitPullRequestFilter",
}) as any as S.Schema<GitPullRequestFilter>;
export type GitPullRequestFilterList = GitPullRequestFilter[];
export const GitPullRequestFilterList =
  /*@__PURE__*/ S.Array(GitPullRequestFilter);
export interface GitConfiguration {
  sourceActionName: string;
  push?: GitPushFilter[];
  pullRequest?: GitPullRequestFilter[];
}
export const GitConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceActionName: S.String,
    push: S.optional(GitPushFilterList),
    pullRequest: S.optional(GitPullRequestFilterList),
  }),
).annotate({
  identifier: "GitConfiguration",
}) as any as S.Schema<GitConfiguration>;
export interface PipelineTriggerDeclaration {
  providerType: PipelineTriggerProviderType;
  gitConfiguration: GitConfiguration;
}
export const PipelineTriggerDeclaration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    providerType: PipelineTriggerProviderType,
    gitConfiguration: GitConfiguration,
  }),
).annotate({
  identifier: "PipelineTriggerDeclaration",
}) as any as S.Schema<PipelineTriggerDeclaration>;
export type PipelineTriggerDeclarationList = PipelineTriggerDeclaration[];
export const PipelineTriggerDeclarationList = /*@__PURE__*/ S.Array(
  PipelineTriggerDeclaration,
);
export interface PipelineDeclaration {
  name: string;
  roleArn: string;
  artifactStore?: ArtifactStore;
  artifactStores?: { [key: string]: ArtifactStore | undefined };
  stages: StageDeclaration[];
  version?: number;
  executionMode?: ExecutionMode;
  pipelineType?: PipelineType;
  variables?: PipelineVariableDeclaration[];
  triggers?: PipelineTriggerDeclaration[];
}
export const PipelineDeclaration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    roleArn: S.String,
    artifactStore: S.optional(ArtifactStore),
    artifactStores: S.optional(ArtifactStoreMap),
    stages: PipelineStageDeclarationList,
    version: S.optional(S.Number),
    executionMode: S.optional(ExecutionMode),
    pipelineType: S.optional(PipelineType),
    variables: S.optional(PipelineVariableDeclarationList),
    triggers: S.optional(PipelineTriggerDeclarationList),
  }),
).annotate({
  identifier: "PipelineDeclaration",
}) as any as S.Schema<PipelineDeclaration>;
export interface CreatePipelineInput {
  pipeline: PipelineDeclaration;
  tags?: Tag[];
}
export const CreatePipelineInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pipeline: PipelineDeclaration, tags: S.optional(TagList) }).pipe(
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
  identifier: "CreatePipelineInput",
}) as any as S.Schema<CreatePipelineInput>;
export interface CreatePipelineOutput {
  pipeline?: PipelineDeclaration;
  tags?: Tag[];
}
export const CreatePipelineOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipeline: S.optional(PipelineDeclaration),
    tags: S.optional(TagList),
  }).pipe(ns),
).annotate({
  identifier: "CreatePipelineOutput",
}) as any as S.Schema<CreatePipelineOutput>;
export interface DeleteCustomActionTypeInput {
  category: ActionCategory;
  provider: string;
  version: string;
}
export const DeleteCustomActionTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    category: ActionCategory,
    provider: S.String,
    version: S.String,
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
  identifier: "DeleteCustomActionTypeInput",
}) as any as S.Schema<DeleteCustomActionTypeInput>;
export interface DeleteCustomActionTypeResponse {}
export const DeleteCustomActionTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteCustomActionTypeResponse",
}) as any as S.Schema<DeleteCustomActionTypeResponse>;
export interface DeletePipelineInput {
  name: string;
}
export const DeletePipelineInput = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "DeletePipelineInput",
}) as any as S.Schema<DeletePipelineInput>;
export interface DeletePipelineResponse {}
export const DeletePipelineResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeletePipelineResponse",
}) as any as S.Schema<DeletePipelineResponse>;
export type WebhookName = string;
export interface DeleteWebhookInput {
  name: string;
}
export const DeleteWebhookInput = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "DeleteWebhookInput",
}) as any as S.Schema<DeleteWebhookInput>;
export interface DeleteWebhookOutput {}
export const DeleteWebhookOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteWebhookOutput",
}) as any as S.Schema<DeleteWebhookOutput>;
export interface DeregisterWebhookWithThirdPartyInput {
  webhookName?: string;
}
export const DeregisterWebhookWithThirdPartyInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ webhookName: S.optional(S.String) }).pipe(
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
  identifier: "DeregisterWebhookWithThirdPartyInput",
}) as any as S.Schema<DeregisterWebhookWithThirdPartyInput>;
export interface DeregisterWebhookWithThirdPartyOutput {}
export const DeregisterWebhookWithThirdPartyOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeregisterWebhookWithThirdPartyOutput",
}) as any as S.Schema<DeregisterWebhookWithThirdPartyOutput>;
export type StageTransitionType = "Inbound" | "Outbound" | (string & {});
export const StageTransitionType = S.String;

export type DisabledReason = string;
export interface DisableStageTransitionInput {
  pipelineName: string;
  stageName: string;
  transitionType: StageTransitionType;
  reason: string;
}
export const DisableStageTransitionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipelineName: S.String,
    stageName: S.String,
    transitionType: StageTransitionType,
    reason: S.String,
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
  identifier: "DisableStageTransitionInput",
}) as any as S.Schema<DisableStageTransitionInput>;
export interface DisableStageTransitionResponse {}
export const DisableStageTransitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DisableStageTransitionResponse",
}) as any as S.Schema<DisableStageTransitionResponse>;
export interface EnableStageTransitionInput {
  pipelineName: string;
  stageName: string;
  transitionType: StageTransitionType;
}
export const EnableStageTransitionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipelineName: S.String,
    stageName: S.String,
    transitionType: StageTransitionType,
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
  identifier: "EnableStageTransitionInput",
}) as any as S.Schema<EnableStageTransitionInput>;
export interface EnableStageTransitionResponse {}
export const EnableStageTransitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "EnableStageTransitionResponse",
}) as any as S.Schema<EnableStageTransitionResponse>;
export type ActionTypeOwner = string;
export interface GetActionTypeInput {
  category: ActionCategory;
  owner: string;
  provider: string;
  version: string;
}
export const GetActionTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    category: ActionCategory,
    owner: S.String,
    provider: S.String,
    version: S.String,
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
  identifier: "GetActionTypeInput",
}) as any as S.Schema<GetActionTypeInput>;
export type ActionTypeDescription = string;
export type LambdaFunctionArn = string;
export interface LambdaExecutorConfiguration {
  lambdaFunctionArn: string;
}
export const LambdaExecutorConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ lambdaFunctionArn: S.String }),
).annotate({
  identifier: "LambdaExecutorConfiguration",
}) as any as S.Schema<LambdaExecutorConfiguration>;
export type AccountId = string;
export type PollingAccountList = string[];
export const PollingAccountList = /*@__PURE__*/ S.Array(S.String);
export type ServicePrincipal = string;
export type PollingServicePrincipalList = string[];
export const PollingServicePrincipalList = /*@__PURE__*/ S.Array(S.String);
export interface JobWorkerExecutorConfiguration {
  pollingAccounts?: string[];
  pollingServicePrincipals?: string[];
}
export const JobWorkerExecutorConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pollingAccounts: S.optional(PollingAccountList),
    pollingServicePrincipals: S.optional(PollingServicePrincipalList),
  }),
).annotate({
  identifier: "JobWorkerExecutorConfiguration",
}) as any as S.Schema<JobWorkerExecutorConfiguration>;
export interface ExecutorConfiguration {
  lambdaExecutorConfiguration?: LambdaExecutorConfiguration;
  jobWorkerExecutorConfiguration?: JobWorkerExecutorConfiguration;
}
export const ExecutorConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    lambdaExecutorConfiguration: S.optional(LambdaExecutorConfiguration),
    jobWorkerExecutorConfiguration: S.optional(JobWorkerExecutorConfiguration),
  }),
).annotate({
  identifier: "ExecutorConfiguration",
}) as any as S.Schema<ExecutorConfiguration>;
export type ExecutorType = "JobWorker" | "Lambda" | (string & {});
export const ExecutorType = S.String;

export type PolicyStatementsTemplate = string;
export type JobTimeout = number;
export interface ActionTypeExecutor {
  configuration: ExecutorConfiguration;
  type: ExecutorType;
  policyStatementsTemplate?: string;
  jobTimeout?: number;
}
export const ActionTypeExecutor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuration: ExecutorConfiguration,
    type: ExecutorType,
    policyStatementsTemplate: S.optional(S.String),
    jobTimeout: S.optional(S.Number),
  }),
).annotate({
  identifier: "ActionTypeExecutor",
}) as any as S.Schema<ActionTypeExecutor>;
export interface ActionTypeIdentifier {
  category: ActionCategory;
  owner: string;
  provider: string;
  version: string;
}
export const ActionTypeIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    category: ActionCategory,
    owner: S.String,
    provider: S.String,
    version: S.String,
  }),
).annotate({
  identifier: "ActionTypeIdentifier",
}) as any as S.Schema<ActionTypeIdentifier>;
export type MinimumActionTypeArtifactCount = number;
export type MaximumActionTypeArtifactCount = number;
export interface ActionTypeArtifactDetails {
  minimumCount: number;
  maximumCount: number;
}
export const ActionTypeArtifactDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ minimumCount: S.Number, maximumCount: S.Number }),
).annotate({
  identifier: "ActionTypeArtifactDetails",
}) as any as S.Schema<ActionTypeArtifactDetails>;
export type AllowedAccount = string;
export type AllowedAccounts = string[];
export const AllowedAccounts = /*@__PURE__*/ S.Array(S.String);
export interface ActionTypePermissions {
  allowedAccounts: string[];
}
export const ActionTypePermissions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ allowedAccounts: AllowedAccounts }),
).annotate({
  identifier: "ActionTypePermissions",
}) as any as S.Schema<ActionTypePermissions>;
export type PropertyDescription = string;
export interface ActionTypeProperty {
  name: string;
  optional: boolean;
  key: boolean;
  noEcho: boolean;
  queryable?: boolean;
  description?: string;
}
export const ActionTypeProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    optional: S.Boolean,
    key: S.Boolean,
    noEcho: S.Boolean,
    queryable: S.optional(S.Boolean),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "ActionTypeProperty",
}) as any as S.Schema<ActionTypeProperty>;
export type ActionTypeProperties = ActionTypeProperty[];
export const ActionTypeProperties = /*@__PURE__*/ S.Array(ActionTypeProperty);
export interface ActionTypeUrls {
  configurationUrl?: string;
  entityUrlTemplate?: string;
  executionUrlTemplate?: string;
  revisionUrlTemplate?: string;
}
export const ActionTypeUrls = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configurationUrl: S.optional(S.String),
    entityUrlTemplate: S.optional(S.String),
    executionUrlTemplate: S.optional(S.String),
    revisionUrlTemplate: S.optional(S.String),
  }),
).annotate({ identifier: "ActionTypeUrls" }) as any as S.Schema<ActionTypeUrls>;
export interface ActionTypeDeclaration {
  description?: string;
  executor: ActionTypeExecutor;
  id: ActionTypeIdentifier;
  inputArtifactDetails: ActionTypeArtifactDetails;
  outputArtifactDetails: ActionTypeArtifactDetails;
  permissions?: ActionTypePermissions;
  properties?: ActionTypeProperty[];
  urls?: ActionTypeUrls;
}
export const ActionTypeDeclaration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    executor: ActionTypeExecutor,
    id: ActionTypeIdentifier,
    inputArtifactDetails: ActionTypeArtifactDetails,
    outputArtifactDetails: ActionTypeArtifactDetails,
    permissions: S.optional(ActionTypePermissions),
    properties: S.optional(ActionTypeProperties),
    urls: S.optional(ActionTypeUrls),
  }),
).annotate({
  identifier: "ActionTypeDeclaration",
}) as any as S.Schema<ActionTypeDeclaration>;
export interface GetActionTypeOutput {
  actionType?: ActionTypeDeclaration;
}
export const GetActionTypeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ actionType: S.optional(ActionTypeDeclaration) }).pipe(ns),
).annotate({
  identifier: "GetActionTypeOutput",
}) as any as S.Schema<GetActionTypeOutput>;
export interface GetJobDetailsInput {
  jobId: string;
}
export const GetJobDetailsInput = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "GetJobDetailsInput",
}) as any as S.Schema<GetJobDetailsInput>;
export interface ActionConfiguration {
  configuration?: { [key: string]: string | undefined };
}
export const ActionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ configuration: S.optional(ActionConfigurationMap) }),
).annotate({
  identifier: "ActionConfiguration",
}) as any as S.Schema<ActionConfiguration>;
export interface StageContext {
  name?: string;
}
export const StageContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String) }),
).annotate({ identifier: "StageContext" }) as any as S.Schema<StageContext>;
export type ActionExecutionId = string;
export interface ActionContext {
  name?: string;
  actionExecutionId?: string;
}
export const ActionContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    actionExecutionId: S.optional(S.String),
  }),
).annotate({ identifier: "ActionContext" }) as any as S.Schema<ActionContext>;
export type PipelineArn = string;
export type PipelineExecutionId = string;
export interface PipelineContext {
  pipelineName?: string;
  stage?: StageContext;
  action?: ActionContext;
  pipelineArn?: string;
  pipelineExecutionId?: string;
}
export const PipelineContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipelineName: S.optional(S.String),
    stage: S.optional(StageContext),
    action: S.optional(ActionContext),
    pipelineArn: S.optional(S.String),
    pipelineExecutionId: S.optional(S.String),
  }),
).annotate({
  identifier: "PipelineContext",
}) as any as S.Schema<PipelineContext>;
export type Revision = string;
export type ArtifactLocationType = "S3" | (string & {});
export const ArtifactLocationType = S.String;

export type S3BucketName = string;
export type S3ObjectKey = string;
export interface S3ArtifactLocation {
  bucketName: string;
  objectKey: string;
}
export const S3ArtifactLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucketName: S.String, objectKey: S.String }),
).annotate({
  identifier: "S3ArtifactLocation",
}) as any as S.Schema<S3ArtifactLocation>;
export interface ArtifactLocation {
  type?: ArtifactLocationType;
  s3Location?: S3ArtifactLocation;
}
export const ArtifactLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(ArtifactLocationType),
    s3Location: S.optional(S3ArtifactLocation),
  }),
).annotate({
  identifier: "ArtifactLocation",
}) as any as S.Schema<ArtifactLocation>;
export interface Artifact {
  name?: string;
  revision?: string;
  location?: ArtifactLocation;
}
export const Artifact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    revision: S.optional(S.String),
    location: S.optional(ArtifactLocation),
  }),
).annotate({ identifier: "Artifact" }) as any as S.Schema<Artifact>;
export type ArtifactList = Artifact[];
export const ArtifactList = /*@__PURE__*/ S.Array(Artifact);
export type AccessKeyId = string | redacted.Redacted<string>;
export type SecretAccessKey = string | redacted.Redacted<string>;
export type SessionToken = string | redacted.Redacted<string>;
export interface AWSSessionCredentials {
  accessKeyId: string | redacted.Redacted<string>;
  secretAccessKey: string | redacted.Redacted<string>;
  sessionToken: string | redacted.Redacted<string>;
}
export const AWSSessionCredentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessKeyId: SensitiveString,
    secretAccessKey: SensitiveString,
    sessionToken: SensitiveString,
  }),
).annotate({
  identifier: "AWSSessionCredentials",
}) as any as S.Schema<AWSSessionCredentials>;
export type ContinuationToken = string;
export interface JobData {
  actionTypeId?: ActionTypeId;
  actionConfiguration?: ActionConfiguration;
  pipelineContext?: PipelineContext;
  inputArtifacts?: Artifact[];
  outputArtifacts?: Artifact[];
  artifactCredentials?: AWSSessionCredentials;
  continuationToken?: string;
  encryptionKey?: EncryptionKey;
}
export const JobData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionTypeId: S.optional(ActionTypeId),
    actionConfiguration: S.optional(ActionConfiguration),
    pipelineContext: S.optional(PipelineContext),
    inputArtifacts: S.optional(ArtifactList),
    outputArtifacts: S.optional(ArtifactList),
    artifactCredentials: S.optional(AWSSessionCredentials),
    continuationToken: S.optional(S.String),
    encryptionKey: S.optional(EncryptionKey),
  }),
).annotate({ identifier: "JobData" }) as any as S.Schema<JobData>;
export interface JobDetails {
  id?: string;
  data?: JobData;
  accountId?: string;
}
export const JobDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    data: S.optional(JobData),
    accountId: S.optional(S.String),
  }),
).annotate({ identifier: "JobDetails" }) as any as S.Schema<JobDetails>;
export interface GetJobDetailsOutput {
  jobDetails?: JobDetails;
}
export const GetJobDetailsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobDetails: S.optional(JobDetails) }).pipe(ns),
).annotate({
  identifier: "GetJobDetailsOutput",
}) as any as S.Schema<GetJobDetailsOutput>;
export interface GetPipelineInput {
  name: string;
  version?: number;
}
export const GetPipelineInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, version: S.optional(S.Number) }).pipe(
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
  identifier: "GetPipelineInput",
}) as any as S.Schema<GetPipelineInput>;
export interface PipelineMetadata {
  pipelineArn?: string;
  created?: Date;
  updated?: Date;
  pollingDisabledAt?: Date;
}
export const PipelineMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipelineArn: S.optional(S.String),
    created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    pollingDisabledAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "PipelineMetadata",
}) as any as S.Schema<PipelineMetadata>;
export interface GetPipelineOutput {
  pipeline?: PipelineDeclaration;
  metadata?: PipelineMetadata;
}
export const GetPipelineOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipeline: S.optional(PipelineDeclaration),
    metadata: S.optional(PipelineMetadata),
  }).pipe(ns),
).annotate({
  identifier: "GetPipelineOutput",
}) as any as S.Schema<GetPipelineOutput>;
export interface GetPipelineExecutionInput {
  pipelineName: string;
  pipelineExecutionId: string;
}
export const GetPipelineExecutionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pipelineName: S.String, pipelineExecutionId: S.String }).pipe(
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
  identifier: "GetPipelineExecutionInput",
}) as any as S.Schema<GetPipelineExecutionInput>;
export type PipelineExecutionStatus =
  | "Cancelled"
  | "InProgress"
  | "Stopped"
  | "Stopping"
  | "Succeeded"
  | "Superseded"
  | "Failed"
  | (string & {});
export const PipelineExecutionStatus = S.String;

export type PipelineExecutionStatusSummary = string;
export type RevisionChangeIdentifier = string;
export type RevisionSummary = string;
export interface ArtifactRevision {
  name?: string;
  revisionId?: string;
  revisionChangeIdentifier?: string;
  revisionSummary?: string;
  created?: Date;
  revisionUrl?: string;
}
export const ArtifactRevision = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    revisionId: S.optional(S.String),
    revisionChangeIdentifier: S.optional(S.String),
    revisionSummary: S.optional(S.String),
    created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    revisionUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "ArtifactRevision",
}) as any as S.Schema<ArtifactRevision>;
export type ArtifactRevisionList = ArtifactRevision[];
export const ArtifactRevisionList = /*@__PURE__*/ S.Array(ArtifactRevision);
export interface ResolvedPipelineVariable {
  name?: string;
  resolvedValue?: string;
}
export const ResolvedPipelineVariable = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), resolvedValue: S.optional(S.String) }),
).annotate({
  identifier: "ResolvedPipelineVariable",
}) as any as S.Schema<ResolvedPipelineVariable>;
export type ResolvedPipelineVariableList = ResolvedPipelineVariable[];
export const ResolvedPipelineVariableList = /*@__PURE__*/ S.Array(
  ResolvedPipelineVariable,
);
export type TriggerType =
  | "CreatePipeline"
  | "StartPipelineExecution"
  | "PollForSourceChanges"
  | "Webhook"
  | "CloudWatchEvent"
  | "PutActionRevision"
  | "WebhookV2"
  | "ManualRollback"
  | "AutomatedRollback"
  | (string & {});
export const TriggerType = S.String;

export type TriggerDetail = string;
export interface ExecutionTrigger {
  triggerType?: TriggerType;
  triggerDetail?: string;
}
export const ExecutionTrigger = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    triggerType: S.optional(TriggerType),
    triggerDetail: S.optional(S.String),
  }),
).annotate({
  identifier: "ExecutionTrigger",
}) as any as S.Schema<ExecutionTrigger>;
export type ExecutionType = "STANDARD" | "ROLLBACK" | (string & {});
export const ExecutionType = S.String;

export interface PipelineRollbackMetadata {
  rollbackTargetPipelineExecutionId?: string;
}
export const PipelineRollbackMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ rollbackTargetPipelineExecutionId: S.optional(S.String) }),
).annotate({
  identifier: "PipelineRollbackMetadata",
}) as any as S.Schema<PipelineRollbackMetadata>;
export interface PipelineExecution {
  pipelineName?: string;
  pipelineVersion?: number;
  pipelineExecutionId?: string;
  status?: PipelineExecutionStatus;
  statusSummary?: string;
  artifactRevisions?: ArtifactRevision[];
  variables?: ResolvedPipelineVariable[];
  trigger?: ExecutionTrigger;
  executionMode?: ExecutionMode;
  executionType?: ExecutionType;
  rollbackMetadata?: PipelineRollbackMetadata;
}
export const PipelineExecution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipelineName: S.optional(S.String),
    pipelineVersion: S.optional(S.Number),
    pipelineExecutionId: S.optional(S.String),
    status: S.optional(PipelineExecutionStatus),
    statusSummary: S.optional(S.String),
    artifactRevisions: S.optional(ArtifactRevisionList),
    variables: S.optional(ResolvedPipelineVariableList),
    trigger: S.optional(ExecutionTrigger),
    executionMode: S.optional(ExecutionMode),
    executionType: S.optional(ExecutionType),
    rollbackMetadata: S.optional(PipelineRollbackMetadata),
  }),
).annotate({
  identifier: "PipelineExecution",
}) as any as S.Schema<PipelineExecution>;
export interface GetPipelineExecutionOutput {
  pipelineExecution?: PipelineExecution;
}
export const GetPipelineExecutionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pipelineExecution: S.optional(PipelineExecution) }).pipe(ns),
).annotate({
  identifier: "GetPipelineExecutionOutput",
}) as any as S.Schema<GetPipelineExecutionOutput>;
export interface GetPipelineStateInput {
  name: string;
}
export const GetPipelineStateInput = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "GetPipelineStateInput",
}) as any as S.Schema<GetPipelineStateInput>;
export type StageExecutionStatus =
  | "Cancelled"
  | "InProgress"
  | "Failed"
  | "Stopped"
  | "Stopping"
  | "Succeeded"
  | "Skipped"
  | (string & {});
export const StageExecutionStatus = S.String;

export interface StageExecution {
  pipelineExecutionId: string;
  status: StageExecutionStatus;
  type?: ExecutionType;
}
export const StageExecution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipelineExecutionId: S.String,
    status: StageExecutionStatus,
    type: S.optional(ExecutionType),
  }),
).annotate({ identifier: "StageExecution" }) as any as S.Schema<StageExecution>;
export type StageExecutionList = StageExecution[];
export const StageExecutionList = /*@__PURE__*/ S.Array(StageExecution);
export type Enabled = boolean;
export type LastChangedBy = string;
export type LastChangedAt = Date;
export interface TransitionState {
  enabled?: boolean;
  lastChangedBy?: string;
  lastChangedAt?: Date;
  disabledReason?: string;
}
export const TransitionState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.optional(S.Boolean),
    lastChangedBy: S.optional(S.String),
    lastChangedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    disabledReason: S.optional(S.String),
  }),
).annotate({
  identifier: "TransitionState",
}) as any as S.Schema<TransitionState>;
export interface ActionRevision {
  revisionId: string;
  revisionChangeId?: string;
  created?: Date;
}
export const ActionRevision = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    revisionId: S.String,
    revisionChangeId: S.optional(S.String),
    created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "ActionRevision" }) as any as S.Schema<ActionRevision>;
export type ActionExecutionStatus =
  | "InProgress"
  | "Abandoned"
  | "Succeeded"
  | "Failed"
  | (string & {});
export const ActionExecutionStatus = S.String;

export type ExecutionSummary = string;
export type ActionExecutionToken = string;
export type LastUpdatedBy = string;
export type ExecutionId = string;
export type Percentage = number;
export type Code = string;
export type Message = string;
export interface ErrorDetails {
  code?: string;
  message?: string;
}
export const ErrorDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ code: S.optional(S.String), message: S.optional(S.String) }),
).annotate({ identifier: "ErrorDetails" }) as any as S.Schema<ErrorDetails>;
export type LogStreamARN = string;
export interface ActionExecution {
  actionExecutionId?: string;
  status?: ActionExecutionStatus;
  summary?: string;
  lastStatusChange?: Date;
  token?: string;
  lastUpdatedBy?: string;
  externalExecutionId?: string;
  externalExecutionUrl?: string;
  percentComplete?: number;
  errorDetails?: ErrorDetails;
  logStreamARN?: string;
}
export const ActionExecution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionExecutionId: S.optional(S.String),
    status: S.optional(ActionExecutionStatus),
    summary: S.optional(S.String),
    lastStatusChange: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    token: S.optional(S.String),
    lastUpdatedBy: S.optional(S.String),
    externalExecutionId: S.optional(S.String),
    externalExecutionUrl: S.optional(S.String),
    percentComplete: S.optional(S.Number),
    errorDetails: S.optional(ErrorDetails),
    logStreamARN: S.optional(S.String),
  }),
).annotate({
  identifier: "ActionExecution",
}) as any as S.Schema<ActionExecution>;
export interface ActionState {
  actionName?: string;
  currentRevision?: ActionRevision;
  latestExecution?: ActionExecution;
  entityUrl?: string;
  revisionUrl?: string;
}
export const ActionState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionName: S.optional(S.String),
    currentRevision: S.optional(ActionRevision),
    latestExecution: S.optional(ActionExecution),
    entityUrl: S.optional(S.String),
    revisionUrl: S.optional(S.String),
  }),
).annotate({ identifier: "ActionState" }) as any as S.Schema<ActionState>;
export type ActionStateList = ActionState[];
export const ActionStateList = /*@__PURE__*/ S.Array(ActionState);
export type ConditionExecutionStatus =
  | "InProgress"
  | "Failed"
  | "Errored"
  | "Succeeded"
  | "Cancelled"
  | "Abandoned"
  | "Overridden"
  | (string & {});
export const ConditionExecutionStatus = S.String;

export interface StageConditionsExecution {
  status?: ConditionExecutionStatus;
  summary?: string;
}
export const StageConditionsExecution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(ConditionExecutionStatus),
    summary: S.optional(S.String),
  }),
).annotate({
  identifier: "StageConditionsExecution",
}) as any as S.Schema<StageConditionsExecution>;
export interface ConditionExecution {
  status?: ConditionExecutionStatus;
  summary?: string;
  lastStatusChange?: Date;
}
export const ConditionExecution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(ConditionExecutionStatus),
    summary: S.optional(S.String),
    lastStatusChange: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "ConditionExecution",
}) as any as S.Schema<ConditionExecution>;
export interface RuleRevision {
  revisionId: string;
  revisionChangeId?: string;
  created?: Date;
}
export const RuleRevision = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    revisionId: S.String,
    revisionChangeId: S.optional(S.String),
    created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "RuleRevision" }) as any as S.Schema<RuleRevision>;
export type RuleExecutionId = string;
export type RuleExecutionStatus =
  | "InProgress"
  | "Abandoned"
  | "Succeeded"
  | "Failed"
  | (string & {});
export const RuleExecutionStatus = S.String;

export type RuleExecutionToken = string;
export interface RuleExecution {
  ruleExecutionId?: string;
  status?: RuleExecutionStatus;
  summary?: string;
  lastStatusChange?: Date;
  token?: string;
  lastUpdatedBy?: string;
  externalExecutionId?: string;
  externalExecutionUrl?: string;
  errorDetails?: ErrorDetails;
}
export const RuleExecution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleExecutionId: S.optional(S.String),
    status: S.optional(RuleExecutionStatus),
    summary: S.optional(S.String),
    lastStatusChange: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    token: S.optional(S.String),
    lastUpdatedBy: S.optional(S.String),
    externalExecutionId: S.optional(S.String),
    externalExecutionUrl: S.optional(S.String),
    errorDetails: S.optional(ErrorDetails),
  }),
).annotate({ identifier: "RuleExecution" }) as any as S.Schema<RuleExecution>;
export interface RuleState {
  ruleName?: string;
  currentRevision?: RuleRevision;
  latestExecution?: RuleExecution;
  entityUrl?: string;
  revisionUrl?: string;
}
export const RuleState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleName: S.optional(S.String),
    currentRevision: S.optional(RuleRevision),
    latestExecution: S.optional(RuleExecution),
    entityUrl: S.optional(S.String),
    revisionUrl: S.optional(S.String),
  }),
).annotate({ identifier: "RuleState" }) as any as S.Schema<RuleState>;
export type RuleStateList = RuleState[];
export const RuleStateList = /*@__PURE__*/ S.Array(RuleState);
export interface ConditionState {
  latestExecution?: ConditionExecution;
  ruleStates?: RuleState[];
}
export const ConditionState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    latestExecution: S.optional(ConditionExecution),
    ruleStates: S.optional(RuleStateList),
  }),
).annotate({ identifier: "ConditionState" }) as any as S.Schema<ConditionState>;
export type ConditionStateList = ConditionState[];
export const ConditionStateList = /*@__PURE__*/ S.Array(ConditionState);
export interface StageConditionState {
  latestExecution?: StageConditionsExecution;
  conditionStates?: ConditionState[];
}
export const StageConditionState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    latestExecution: S.optional(StageConditionsExecution),
    conditionStates: S.optional(ConditionStateList),
  }),
).annotate({
  identifier: "StageConditionState",
}) as any as S.Schema<StageConditionState>;
export type RetryAttempt = number;
export type RetryTrigger =
  | "AutomatedStageRetry"
  | "ManualStageRetry"
  | (string & {});
export const RetryTrigger = S.String;

export interface RetryStageMetadata {
  autoStageRetryAttempt?: number;
  manualStageRetryAttempt?: number;
  latestRetryTrigger?: RetryTrigger;
}
export const RetryStageMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autoStageRetryAttempt: S.optional(S.Number),
    manualStageRetryAttempt: S.optional(S.Number),
    latestRetryTrigger: S.optional(RetryTrigger),
  }),
).annotate({
  identifier: "RetryStageMetadata",
}) as any as S.Schema<RetryStageMetadata>;
export interface StageState {
  stageName?: string;
  inboundExecution?: StageExecution;
  inboundExecutions?: StageExecution[];
  inboundTransitionState?: TransitionState;
  actionStates?: ActionState[];
  latestExecution?: StageExecution;
  beforeEntryConditionState?: StageConditionState;
  onSuccessConditionState?: StageConditionState;
  onFailureConditionState?: StageConditionState;
  retryStageMetadata?: RetryStageMetadata;
}
export const StageState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stageName: S.optional(S.String),
    inboundExecution: S.optional(StageExecution),
    inboundExecutions: S.optional(StageExecutionList),
    inboundTransitionState: S.optional(TransitionState),
    actionStates: S.optional(ActionStateList),
    latestExecution: S.optional(StageExecution),
    beforeEntryConditionState: S.optional(StageConditionState),
    onSuccessConditionState: S.optional(StageConditionState),
    onFailureConditionState: S.optional(StageConditionState),
    retryStageMetadata: S.optional(RetryStageMetadata),
  }),
).annotate({ identifier: "StageState" }) as any as S.Schema<StageState>;
export type StageStateList = StageState[];
export const StageStateList = /*@__PURE__*/ S.Array(StageState);
export interface GetPipelineStateOutput {
  pipelineName?: string;
  pipelineVersion?: number;
  stageStates?: StageState[];
  created?: Date;
  updated?: Date;
}
export const GetPipelineStateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipelineName: S.optional(S.String),
    pipelineVersion: S.optional(S.Number),
    stageStates: S.optional(StageStateList),
    created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(ns),
).annotate({
  identifier: "GetPipelineStateOutput",
}) as any as S.Schema<GetPipelineStateOutput>;
export interface GetThirdPartyJobDetailsInput {
  jobId: string;
  clientToken: string;
}
export const GetThirdPartyJobDetailsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String, clientToken: S.String }).pipe(
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
  identifier: "GetThirdPartyJobDetailsInput",
}) as any as S.Schema<GetThirdPartyJobDetailsInput>;
export interface ThirdPartyJobData {
  actionTypeId?: ActionTypeId;
  actionConfiguration?: ActionConfiguration;
  pipelineContext?: PipelineContext;
  inputArtifacts?: Artifact[];
  outputArtifacts?: Artifact[];
  artifactCredentials?: AWSSessionCredentials;
  continuationToken?: string;
  encryptionKey?: EncryptionKey;
}
export const ThirdPartyJobData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionTypeId: S.optional(ActionTypeId),
    actionConfiguration: S.optional(ActionConfiguration),
    pipelineContext: S.optional(PipelineContext),
    inputArtifacts: S.optional(ArtifactList),
    outputArtifacts: S.optional(ArtifactList),
    artifactCredentials: S.optional(AWSSessionCredentials),
    continuationToken: S.optional(S.String),
    encryptionKey: S.optional(EncryptionKey),
  }),
).annotate({
  identifier: "ThirdPartyJobData",
}) as any as S.Schema<ThirdPartyJobData>;
export interface ThirdPartyJobDetails {
  id?: string;
  data?: ThirdPartyJobData;
  nonce?: string;
}
export const ThirdPartyJobDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    data: S.optional(ThirdPartyJobData),
    nonce: S.optional(S.String),
  }),
).annotate({
  identifier: "ThirdPartyJobDetails",
}) as any as S.Schema<ThirdPartyJobDetails>;
export interface GetThirdPartyJobDetailsOutput {
  jobDetails?: ThirdPartyJobDetails;
}
export const GetThirdPartyJobDetailsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobDetails: S.optional(ThirdPartyJobDetails) }).pipe(ns),
).annotate({
  identifier: "GetThirdPartyJobDetailsOutput",
}) as any as S.Schema<GetThirdPartyJobDetailsOutput>;
export type StartTimeRange = "Latest" | "All" | (string & {});
export const StartTimeRange = S.String;

export interface LatestInPipelineExecutionFilter {
  pipelineExecutionId: string;
  startTimeRange: StartTimeRange;
}
export const LatestInPipelineExecutionFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pipelineExecutionId: S.String, startTimeRange: StartTimeRange }),
).annotate({
  identifier: "LatestInPipelineExecutionFilter",
}) as any as S.Schema<LatestInPipelineExecutionFilter>;
export interface ActionExecutionFilter {
  pipelineExecutionId?: string;
  latestInPipelineExecution?: LatestInPipelineExecutionFilter;
}
export const ActionExecutionFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipelineExecutionId: S.optional(S.String),
    latestInPipelineExecution: S.optional(LatestInPipelineExecutionFilter),
  }),
).annotate({
  identifier: "ActionExecutionFilter",
}) as any as S.Schema<ActionExecutionFilter>;
export type MaxResults = number;
export type NextToken = string;
export interface ListActionExecutionsInput {
  pipelineName: string;
  filter?: ActionExecutionFilter;
  maxResults?: number;
  nextToken?: string;
}
export const ListActionExecutionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipelineName: S.String,
    filter: S.optional(ActionExecutionFilter),
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
  identifier: "ListActionExecutionsInput",
}) as any as S.Schema<ListActionExecutionsInput>;
export type ResolvedActionConfigurationMap = {
  [key: string]: string | undefined;
};
export const ResolvedActionConfigurationMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type S3Bucket = string;
export type S3Key = string;
export interface S3Location {
  bucket?: string;
  key?: string;
}
export const S3Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucket: S.optional(S.String), key: S.optional(S.String) }),
).annotate({ identifier: "S3Location" }) as any as S.Schema<S3Location>;
export interface ArtifactDetail {
  name?: string;
  s3location?: S3Location;
}
export const ArtifactDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), s3location: S.optional(S3Location) }),
).annotate({ identifier: "ArtifactDetail" }) as any as S.Schema<ArtifactDetail>;
export type ArtifactDetailList = ArtifactDetail[];
export const ArtifactDetailList = /*@__PURE__*/ S.Array(ArtifactDetail);
export interface ActionExecutionInput {
  actionTypeId?: ActionTypeId;
  configuration?: { [key: string]: string | undefined };
  resolvedConfiguration?: { [key: string]: string | undefined };
  roleArn?: string;
  region?: string;
  inputArtifacts?: ArtifactDetail[];
  namespace?: string;
}
export const ActionExecutionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionTypeId: S.optional(ActionTypeId),
    configuration: S.optional(ActionConfigurationMap),
    resolvedConfiguration: S.optional(ResolvedActionConfigurationMap),
    roleArn: S.optional(S.String),
    region: S.optional(S.String),
    inputArtifacts: S.optional(ArtifactDetailList),
    namespace: S.optional(S.String),
  }),
).annotate({
  identifier: "ActionExecutionInput",
}) as any as S.Schema<ActionExecutionInput>;
export type ExternalExecutionId = string;
export type ExternalExecutionSummary = string;
export interface ActionExecutionResult {
  externalExecutionId?: string;
  externalExecutionSummary?: string;
  externalExecutionUrl?: string;
  errorDetails?: ErrorDetails;
  logStreamARN?: string;
}
export const ActionExecutionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    externalExecutionId: S.optional(S.String),
    externalExecutionSummary: S.optional(S.String),
    externalExecutionUrl: S.optional(S.String),
    errorDetails: S.optional(ErrorDetails),
    logStreamARN: S.optional(S.String),
  }),
).annotate({
  identifier: "ActionExecutionResult",
}) as any as S.Schema<ActionExecutionResult>;
export type OutputVariablesKey = string;
export type OutputVariablesValue = string;
export type OutputVariablesMap = { [key: string]: string | undefined };
export const OutputVariablesMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ActionExecutionOutput {
  outputArtifacts?: ArtifactDetail[];
  executionResult?: ActionExecutionResult;
  outputVariables?: { [key: string]: string | undefined };
}
export const ActionExecutionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    outputArtifacts: S.optional(ArtifactDetailList),
    executionResult: S.optional(ActionExecutionResult),
    outputVariables: S.optional(OutputVariablesMap),
  }),
).annotate({
  identifier: "ActionExecutionOutput",
}) as any as S.Schema<ActionExecutionOutput>;
export interface ActionExecutionDetail {
  pipelineExecutionId?: string;
  actionExecutionId?: string;
  pipelineVersion?: number;
  stageName?: string;
  actionName?: string;
  startTime?: Date;
  lastUpdateTime?: Date;
  updatedBy?: string;
  status?: ActionExecutionStatus;
  input?: ActionExecutionInput;
  output?: ActionExecutionOutput;
}
export const ActionExecutionDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipelineExecutionId: S.optional(S.String),
    actionExecutionId: S.optional(S.String),
    pipelineVersion: S.optional(S.Number),
    stageName: S.optional(S.String),
    actionName: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedBy: S.optional(S.String),
    status: S.optional(ActionExecutionStatus),
    input: S.optional(ActionExecutionInput),
    output: S.optional(ActionExecutionOutput),
  }),
).annotate({
  identifier: "ActionExecutionDetail",
}) as any as S.Schema<ActionExecutionDetail>;
export type ActionExecutionDetailList = ActionExecutionDetail[];
export const ActionExecutionDetailList = /*@__PURE__*/ S.Array(
  ActionExecutionDetail,
);
export interface ListActionExecutionsOutput {
  actionExecutionDetails?: ActionExecutionDetail[];
  nextToken?: string;
}
export const ListActionExecutionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionExecutionDetails: S.optional(ActionExecutionDetailList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListActionExecutionsOutput",
}) as any as S.Schema<ListActionExecutionsOutput>;
export interface ListActionTypesInput {
  actionOwnerFilter?: ActionOwner;
  nextToken?: string;
  regionFilter?: string;
}
export const ListActionTypesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionOwnerFilter: S.optional(ActionOwner),
    nextToken: S.optional(S.String),
    regionFilter: S.optional(S.String),
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
  identifier: "ListActionTypesInput",
}) as any as S.Schema<ListActionTypesInput>;
export type ActionTypeList = ActionType[];
export const ActionTypeList = /*@__PURE__*/ S.Array(ActionType);
export interface ListActionTypesOutput {
  actionTypes: ActionType[];
  nextToken?: string;
}
export const ListActionTypesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionTypes: ActionTypeList,
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListActionTypesOutput",
}) as any as S.Schema<ListActionTypesOutput>;
export type TargetFilterName = "TARGET_STATUS" | (string & {});
export const TargetFilterName = S.String;

export type TargetFilterValue = string;
export type TargetFilterValueList = string[];
export const TargetFilterValueList = /*@__PURE__*/ S.Array(S.String);
export interface TargetFilter {
  name?: TargetFilterName;
  values?: string[];
}
export const TargetFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(TargetFilterName),
    values: S.optional(TargetFilterValueList),
  }),
).annotate({ identifier: "TargetFilter" }) as any as S.Schema<TargetFilter>;
export type TargetFilterList = TargetFilter[];
export const TargetFilterList = /*@__PURE__*/ S.Array(TargetFilter);
export interface ListDeployActionExecutionTargetsInput {
  pipelineName?: string;
  actionExecutionId: string;
  filters?: TargetFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListDeployActionExecutionTargetsInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      pipelineName: S.optional(S.String),
      actionExecutionId: S.String,
      filters: S.optional(TargetFilterList),
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
  identifier: "ListDeployActionExecutionTargetsInput",
}) as any as S.Schema<ListDeployActionExecutionTargetsInput>;
export interface DeployTargetEventContext {
  ssmCommandId?: string;
  message?: string;
}
export const DeployTargetEventContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ssmCommandId: S.optional(S.String),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "DeployTargetEventContext",
}) as any as S.Schema<DeployTargetEventContext>;
export interface DeployTargetEvent {
  name?: string;
  status?: string;
  startTime?: Date;
  endTime?: Date;
  context?: DeployTargetEventContext;
}
export const DeployTargetEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    status: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    context: S.optional(DeployTargetEventContext),
  }),
).annotate({
  identifier: "DeployTargetEvent",
}) as any as S.Schema<DeployTargetEvent>;
export type DeployTargetEventList = DeployTargetEvent[];
export const DeployTargetEventList = /*@__PURE__*/ S.Array(DeployTargetEvent);
export interface DeployActionExecutionTarget {
  targetId?: string;
  targetType?: string;
  status?: string;
  startTime?: Date;
  endTime?: Date;
  events?: DeployTargetEvent[];
}
export const DeployActionExecutionTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetId: S.optional(S.String),
    targetType: S.optional(S.String),
    status: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    events: S.optional(DeployTargetEventList),
  }),
).annotate({
  identifier: "DeployActionExecutionTarget",
}) as any as S.Schema<DeployActionExecutionTarget>;
export type DeployActionExecutionTargetList = DeployActionExecutionTarget[];
export const DeployActionExecutionTargetList = /*@__PURE__*/ S.Array(
  DeployActionExecutionTarget,
);
export interface ListDeployActionExecutionTargetsOutput {
  targets?: DeployActionExecutionTarget[];
  nextToken?: string;
}
export const ListDeployActionExecutionTargetsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      targets: S.optional(DeployActionExecutionTargetList),
      nextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "ListDeployActionExecutionTargetsOutput",
}) as any as S.Schema<ListDeployActionExecutionTargetsOutput>;
export interface SucceededInStageFilter {
  stageName?: string;
}
export const SucceededInStageFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ stageName: S.optional(S.String) }),
).annotate({
  identifier: "SucceededInStageFilter",
}) as any as S.Schema<SucceededInStageFilter>;
export interface PipelineExecutionFilter {
  succeededInStage?: SucceededInStageFilter;
}
export const PipelineExecutionFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ succeededInStage: S.optional(SucceededInStageFilter) }),
).annotate({
  identifier: "PipelineExecutionFilter",
}) as any as S.Schema<PipelineExecutionFilter>;
export interface ListPipelineExecutionsInput {
  pipelineName: string;
  maxResults?: number;
  filter?: PipelineExecutionFilter;
  nextToken?: string;
}
export const ListPipelineExecutionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipelineName: S.String,
    maxResults: S.optional(S.Number),
    filter: S.optional(PipelineExecutionFilter),
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
  identifier: "ListPipelineExecutionsInput",
}) as any as S.Schema<ListPipelineExecutionsInput>;
export interface SourceRevision {
  actionName: string;
  revisionId?: string;
  revisionSummary?: string;
  revisionUrl?: string;
}
export const SourceRevision = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionName: S.String,
    revisionId: S.optional(S.String),
    revisionSummary: S.optional(S.String),
    revisionUrl: S.optional(S.String),
  }),
).annotate({ identifier: "SourceRevision" }) as any as S.Schema<SourceRevision>;
export type SourceRevisionList = SourceRevision[];
export const SourceRevisionList = /*@__PURE__*/ S.Array(SourceRevision);
export type StopPipelineExecutionReason = string;
export interface StopExecutionTrigger {
  reason?: string;
}
export const StopExecutionTrigger = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ reason: S.optional(S.String) }),
).annotate({
  identifier: "StopExecutionTrigger",
}) as any as S.Schema<StopExecutionTrigger>;
export interface PipelineExecutionSummary {
  pipelineExecutionId?: string;
  status?: PipelineExecutionStatus;
  statusSummary?: string;
  startTime?: Date;
  lastUpdateTime?: Date;
  sourceRevisions?: SourceRevision[];
  trigger?: ExecutionTrigger;
  stopTrigger?: StopExecutionTrigger;
  executionMode?: ExecutionMode;
  executionType?: ExecutionType;
  rollbackMetadata?: PipelineRollbackMetadata;
}
export const PipelineExecutionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipelineExecutionId: S.optional(S.String),
    status: S.optional(PipelineExecutionStatus),
    statusSummary: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    sourceRevisions: S.optional(SourceRevisionList),
    trigger: S.optional(ExecutionTrigger),
    stopTrigger: S.optional(StopExecutionTrigger),
    executionMode: S.optional(ExecutionMode),
    executionType: S.optional(ExecutionType),
    rollbackMetadata: S.optional(PipelineRollbackMetadata),
  }),
).annotate({
  identifier: "PipelineExecutionSummary",
}) as any as S.Schema<PipelineExecutionSummary>;
export type PipelineExecutionSummaryList = PipelineExecutionSummary[];
export const PipelineExecutionSummaryList = /*@__PURE__*/ S.Array(
  PipelineExecutionSummary,
);
export interface ListPipelineExecutionsOutput {
  pipelineExecutionSummaries?: PipelineExecutionSummary[];
  nextToken?: string;
}
export const ListPipelineExecutionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipelineExecutionSummaries: S.optional(PipelineExecutionSummaryList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListPipelineExecutionsOutput",
}) as any as S.Schema<ListPipelineExecutionsOutput>;
export type MaxPipelines = number;
export interface ListPipelinesInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListPipelinesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
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
  identifier: "ListPipelinesInput",
}) as any as S.Schema<ListPipelinesInput>;
export interface PipelineSummary {
  name?: string;
  version?: number;
  pipelineType?: PipelineType;
  executionMode?: ExecutionMode;
  created?: Date;
  updated?: Date;
}
export const PipelineSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    version: S.optional(S.Number),
    pipelineType: S.optional(PipelineType),
    executionMode: S.optional(ExecutionMode),
    created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "PipelineSummary",
}) as any as S.Schema<PipelineSummary>;
export type PipelineList = PipelineSummary[];
export const PipelineList = /*@__PURE__*/ S.Array(PipelineSummary);
export interface ListPipelinesOutput {
  pipelines?: PipelineSummary[];
  nextToken?: string;
}
export const ListPipelinesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipelines: S.optional(PipelineList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListPipelinesOutput",
}) as any as S.Schema<ListPipelinesOutput>;
export interface RuleExecutionFilter {
  pipelineExecutionId?: string;
  latestInPipelineExecution?: LatestInPipelineExecutionFilter;
}
export const RuleExecutionFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipelineExecutionId: S.optional(S.String),
    latestInPipelineExecution: S.optional(LatestInPipelineExecutionFilter),
  }),
).annotate({
  identifier: "RuleExecutionFilter",
}) as any as S.Schema<RuleExecutionFilter>;
export interface ListRuleExecutionsInput {
  pipelineName: string;
  filter?: RuleExecutionFilter;
  maxResults?: number;
  nextToken?: string;
}
export const ListRuleExecutionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipelineName: S.String,
    filter: S.optional(RuleExecutionFilter),
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
  identifier: "ListRuleExecutionsInput",
}) as any as S.Schema<ListRuleExecutionsInput>;
export type ResolvedRuleConfigurationMap = {
  [key: string]: string | undefined;
};
export const ResolvedRuleConfigurationMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface RuleExecutionInput {
  ruleTypeId?: RuleTypeId;
  configuration?: { [key: string]: string | undefined };
  resolvedConfiguration?: { [key: string]: string | undefined };
  roleArn?: string;
  region?: string;
  inputArtifacts?: ArtifactDetail[];
}
export const RuleExecutionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleTypeId: S.optional(RuleTypeId),
    configuration: S.optional(RuleConfigurationMap),
    resolvedConfiguration: S.optional(ResolvedRuleConfigurationMap),
    roleArn: S.optional(S.String),
    region: S.optional(S.String),
    inputArtifacts: S.optional(ArtifactDetailList),
  }),
).annotate({
  identifier: "RuleExecutionInput",
}) as any as S.Schema<RuleExecutionInput>;
export interface RuleExecutionResult {
  externalExecutionId?: string;
  externalExecutionSummary?: string;
  externalExecutionUrl?: string;
  errorDetails?: ErrorDetails;
}
export const RuleExecutionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    externalExecutionId: S.optional(S.String),
    externalExecutionSummary: S.optional(S.String),
    externalExecutionUrl: S.optional(S.String),
    errorDetails: S.optional(ErrorDetails),
  }),
).annotate({
  identifier: "RuleExecutionResult",
}) as any as S.Schema<RuleExecutionResult>;
export interface RuleExecutionOutput {
  executionResult?: RuleExecutionResult;
}
export const RuleExecutionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ executionResult: S.optional(RuleExecutionResult) }),
).annotate({
  identifier: "RuleExecutionOutput",
}) as any as S.Schema<RuleExecutionOutput>;
export interface RuleExecutionDetail {
  pipelineExecutionId?: string;
  ruleExecutionId?: string;
  pipelineVersion?: number;
  stageName?: string;
  ruleName?: string;
  startTime?: Date;
  lastUpdateTime?: Date;
  updatedBy?: string;
  status?: RuleExecutionStatus;
  input?: RuleExecutionInput;
  output?: RuleExecutionOutput;
}
export const RuleExecutionDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipelineExecutionId: S.optional(S.String),
    ruleExecutionId: S.optional(S.String),
    pipelineVersion: S.optional(S.Number),
    stageName: S.optional(S.String),
    ruleName: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedBy: S.optional(S.String),
    status: S.optional(RuleExecutionStatus),
    input: S.optional(RuleExecutionInput),
    output: S.optional(RuleExecutionOutput),
  }),
).annotate({
  identifier: "RuleExecutionDetail",
}) as any as S.Schema<RuleExecutionDetail>;
export type RuleExecutionDetailList = RuleExecutionDetail[];
export const RuleExecutionDetailList =
  /*@__PURE__*/ S.Array(RuleExecutionDetail);
export interface ListRuleExecutionsOutput {
  ruleExecutionDetails?: RuleExecutionDetail[];
  nextToken?: string;
}
export const ListRuleExecutionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleExecutionDetails: S.optional(RuleExecutionDetailList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListRuleExecutionsOutput",
}) as any as S.Schema<ListRuleExecutionsOutput>;
export interface ListRuleTypesInput {
  ruleOwnerFilter?: RuleOwner;
  regionFilter?: string;
}
export const ListRuleTypesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleOwnerFilter: S.optional(RuleOwner),
    regionFilter: S.optional(S.String),
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
  identifier: "ListRuleTypesInput",
}) as any as S.Schema<ListRuleTypesInput>;
export interface RuleTypeSettings {
  thirdPartyConfigurationUrl?: string;
  entityUrlTemplate?: string;
  executionUrlTemplate?: string;
  revisionUrlTemplate?: string;
}
export const RuleTypeSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thirdPartyConfigurationUrl: S.optional(S.String),
    entityUrlTemplate: S.optional(S.String),
    executionUrlTemplate: S.optional(S.String),
    revisionUrlTemplate: S.optional(S.String),
  }),
).annotate({
  identifier: "RuleTypeSettings",
}) as any as S.Schema<RuleTypeSettings>;
export type RuleConfigurationPropertyType =
  | "String"
  | "Number"
  | "Boolean"
  | (string & {});
export const RuleConfigurationPropertyType = S.String;

export interface RuleConfigurationProperty {
  name: string;
  required: boolean;
  key: boolean;
  secret: boolean;
  queryable?: boolean;
  description?: string;
  type?: RuleConfigurationPropertyType;
}
export const RuleConfigurationProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    required: S.Boolean,
    key: S.Boolean,
    secret: S.Boolean,
    queryable: S.optional(S.Boolean),
    description: S.optional(S.String),
    type: S.optional(RuleConfigurationPropertyType),
  }),
).annotate({
  identifier: "RuleConfigurationProperty",
}) as any as S.Schema<RuleConfigurationProperty>;
export type RuleConfigurationPropertyList = RuleConfigurationProperty[];
export const RuleConfigurationPropertyList = /*@__PURE__*/ S.Array(
  RuleConfigurationProperty,
);
export interface RuleType {
  id: RuleTypeId;
  settings?: RuleTypeSettings;
  ruleConfigurationProperties?: RuleConfigurationProperty[];
  inputArtifactDetails: ArtifactDetails;
}
export const RuleType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: RuleTypeId,
    settings: S.optional(RuleTypeSettings),
    ruleConfigurationProperties: S.optional(RuleConfigurationPropertyList),
    inputArtifactDetails: ArtifactDetails,
  }),
).annotate({ identifier: "RuleType" }) as any as S.Schema<RuleType>;
export type RuleTypeList = RuleType[];
export const RuleTypeList = /*@__PURE__*/ S.Array(RuleType);
export interface ListRuleTypesOutput {
  ruleTypes: RuleType[];
}
export const ListRuleTypesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ruleTypes: RuleTypeList }).pipe(ns),
).annotate({
  identifier: "ListRuleTypesOutput",
}) as any as S.Schema<ListRuleTypesOutput>;
export type ResourceArn = string;
export interface ListTagsForResourceInput {
  resourceArn: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String,
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
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  tags?: Tag[];
  nextToken?: string;
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagList), nextToken: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export interface ListWebhooksInput {
  NextToken?: string;
  MaxResults?: number;
}
export const ListWebhooksInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
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
  identifier: "ListWebhooksInput",
}) as any as S.Schema<ListWebhooksInput>;
export type JsonPath = string;
export type MatchEquals = string;
export interface WebhookFilterRule {
  jsonPath: string;
  matchEquals?: string;
}
export const WebhookFilterRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jsonPath: S.String, matchEquals: S.optional(S.String) }),
).annotate({
  identifier: "WebhookFilterRule",
}) as any as S.Schema<WebhookFilterRule>;
export type WebhookFilters = WebhookFilterRule[];
export const WebhookFilters = /*@__PURE__*/ S.Array(WebhookFilterRule);
export type WebhookAuthenticationType =
  | "GITHUB_HMAC"
  | "IP"
  | "UNAUTHENTICATED"
  | (string & {});
export const WebhookAuthenticationType = S.String;

export type WebhookAuthConfigurationAllowedIPRange = string;
export type WebhookAuthConfigurationSecretToken = string;
export interface WebhookAuthConfiguration {
  AllowedIPRange?: string;
  SecretToken?: string | redacted.Redacted<string>;
}
export const WebhookAuthConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AllowedIPRange: S.optional(S.String),
    SecretToken: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "WebhookAuthConfiguration",
}) as any as S.Schema<WebhookAuthConfiguration>;
export interface WebhookDefinition {
  name: string;
  targetPipeline: string;
  targetAction: string;
  filters: WebhookFilterRule[];
  authentication: WebhookAuthenticationType;
  authenticationConfiguration: WebhookAuthConfiguration;
}
export const WebhookDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    targetPipeline: S.String,
    targetAction: S.String,
    filters: WebhookFilters,
    authentication: WebhookAuthenticationType,
    authenticationConfiguration: WebhookAuthConfiguration,
  }),
).annotate({
  identifier: "WebhookDefinition",
}) as any as S.Schema<WebhookDefinition>;
export type WebhookUrl = string;
export type WebhookErrorMessage = string;
export type WebhookErrorCode = string;
export type WebhookLastTriggered = Date;
export type WebhookArn = string;
export interface ListWebhookItem {
  definition: WebhookDefinition;
  url: string;
  errorMessage?: string;
  errorCode?: string;
  lastTriggered?: Date;
  arn?: string;
  tags?: Tag[];
}
export const ListWebhookItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    definition: WebhookDefinition,
    url: S.String,
    errorMessage: S.optional(S.String),
    errorCode: S.optional(S.String),
    lastTriggered: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    arn: S.optional(S.String),
    tags: S.optional(TagList),
  }),
).annotate({
  identifier: "ListWebhookItem",
}) as any as S.Schema<ListWebhookItem>;
export type WebhookList = ListWebhookItem[];
export const WebhookList = /*@__PURE__*/ S.Array(ListWebhookItem);
export interface ListWebhooksOutput {
  webhooks?: ListWebhookItem[];
  NextToken?: string;
}
export const ListWebhooksOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    webhooks: S.optional(WebhookList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListWebhooksOutput",
}) as any as S.Schema<ListWebhooksOutput>;
export type ConditionType = "BEFORE_ENTRY" | "ON_SUCCESS" | (string & {});
export const ConditionType = S.String;

export interface OverrideStageConditionInput {
  pipelineName: string;
  stageName: string;
  pipelineExecutionId: string;
  conditionType: ConditionType;
}
export const OverrideStageConditionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipelineName: S.String,
    stageName: S.String,
    pipelineExecutionId: S.String,
    conditionType: ConditionType,
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
  identifier: "OverrideStageConditionInput",
}) as any as S.Schema<OverrideStageConditionInput>;
export interface OverrideStageConditionResponse {}
export const OverrideStageConditionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "OverrideStageConditionResponse",
}) as any as S.Schema<OverrideStageConditionResponse>;
export type MaxBatchSize = number;
export type ActionConfigurationQueryableValue = string;
export type QueryParamMap = { [key: string]: string | undefined };
export const QueryParamMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface PollForJobsInput {
  actionTypeId: ActionTypeId;
  maxBatchSize?: number;
  queryParam?: { [key: string]: string | undefined };
}
export const PollForJobsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionTypeId: ActionTypeId,
    maxBatchSize: S.optional(S.Number),
    queryParam: S.optional(QueryParamMap),
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
  identifier: "PollForJobsInput",
}) as any as S.Schema<PollForJobsInput>;
export interface Job {
  id?: string;
  data?: JobData;
  nonce?: string;
  accountId?: string;
}
export const Job = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    data: S.optional(JobData),
    nonce: S.optional(S.String),
    accountId: S.optional(S.String),
  }),
).annotate({ identifier: "Job" }) as any as S.Schema<Job>;
export type JobList = Job[];
export const JobList = /*@__PURE__*/ S.Array(Job);
export interface PollForJobsOutput {
  jobs?: Job[];
}
export const PollForJobsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobs: S.optional(JobList) }).pipe(ns),
).annotate({
  identifier: "PollForJobsOutput",
}) as any as S.Schema<PollForJobsOutput>;
export interface PollForThirdPartyJobsInput {
  actionTypeId: ActionTypeId;
  maxBatchSize?: number;
}
export const PollForThirdPartyJobsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionTypeId: ActionTypeId,
    maxBatchSize: S.optional(S.Number),
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
  identifier: "PollForThirdPartyJobsInput",
}) as any as S.Schema<PollForThirdPartyJobsInput>;
export type ClientId = string;
export interface ThirdPartyJob {
  clientId?: string;
  jobId?: string;
}
export const ThirdPartyJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ clientId: S.optional(S.String), jobId: S.optional(S.String) }),
).annotate({ identifier: "ThirdPartyJob" }) as any as S.Schema<ThirdPartyJob>;
export type ThirdPartyJobList = ThirdPartyJob[];
export const ThirdPartyJobList = /*@__PURE__*/ S.Array(ThirdPartyJob);
export interface PollForThirdPartyJobsOutput {
  jobs?: ThirdPartyJob[];
}
export const PollForThirdPartyJobsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobs: S.optional(ThirdPartyJobList) }).pipe(ns),
).annotate({
  identifier: "PollForThirdPartyJobsOutput",
}) as any as S.Schema<PollForThirdPartyJobsOutput>;
export interface PutActionRevisionInput {
  pipelineName: string;
  stageName: string;
  actionName: string;
  actionRevision: ActionRevision;
}
export const PutActionRevisionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipelineName: S.String,
    stageName: S.String,
    actionName: S.String,
    actionRevision: ActionRevision,
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
  identifier: "PutActionRevisionInput",
}) as any as S.Schema<PutActionRevisionInput>;
export interface PutActionRevisionOutput {
  newRevision?: boolean;
  pipelineExecutionId?: string;
}
export const PutActionRevisionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    newRevision: S.optional(S.Boolean),
    pipelineExecutionId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "PutActionRevisionOutput",
}) as any as S.Schema<PutActionRevisionOutput>;
export type ApprovalSummary = string;
export type ApprovalStatus = "Approved" | "Rejected" | (string & {});
export const ApprovalStatus = S.String;

export interface ApprovalResult {
  summary: string;
  status: ApprovalStatus;
}
export const ApprovalResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ summary: S.String, status: ApprovalStatus }),
).annotate({ identifier: "ApprovalResult" }) as any as S.Schema<ApprovalResult>;
export type ApprovalToken = string;
export interface PutApprovalResultInput {
  pipelineName: string;
  stageName: string;
  actionName: string;
  result: ApprovalResult;
  token: string;
}
export const PutApprovalResultInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipelineName: S.String,
    stageName: S.String,
    actionName: S.String,
    result: ApprovalResult,
    token: S.String,
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
  identifier: "PutApprovalResultInput",
}) as any as S.Schema<PutApprovalResultInput>;
export interface PutApprovalResultOutput {
  approvedAt?: Date;
}
export const PutApprovalResultOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    approvedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(ns),
).annotate({
  identifier: "PutApprovalResultOutput",
}) as any as S.Schema<PutApprovalResultOutput>;
export type FailureType =
  | "JobFailed"
  | "ConfigurationError"
  | "PermissionError"
  | "RevisionOutOfSync"
  | "RevisionUnavailable"
  | "SystemUnavailable"
  | (string & {});
export const FailureType = S.String;

export interface FailureDetails {
  type: FailureType;
  message: string;
  externalExecutionId?: string;
}
export const FailureDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: FailureType,
    message: S.String,
    externalExecutionId: S.optional(S.String),
  }),
).annotate({ identifier: "FailureDetails" }) as any as S.Schema<FailureDetails>;
export interface PutJobFailureResultInput {
  jobId: string;
  failureDetails: FailureDetails;
}
export const PutJobFailureResultInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String, failureDetails: FailureDetails }).pipe(
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
  identifier: "PutJobFailureResultInput",
}) as any as S.Schema<PutJobFailureResultInput>;
export interface PutJobFailureResultResponse {}
export const PutJobFailureResultResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutJobFailureResultResponse",
}) as any as S.Schema<PutJobFailureResultResponse>;
export interface CurrentRevision {
  revision: string;
  changeIdentifier: string;
  created?: Date;
  revisionSummary?: string;
}
export const CurrentRevision = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    revision: S.String,
    changeIdentifier: S.String,
    created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    revisionSummary: S.optional(S.String),
  }),
).annotate({
  identifier: "CurrentRevision",
}) as any as S.Schema<CurrentRevision>;
export interface ExecutionDetails {
  summary?: string;
  externalExecutionId?: string;
  percentComplete?: number;
}
export const ExecutionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    summary: S.optional(S.String),
    externalExecutionId: S.optional(S.String),
    percentComplete: S.optional(S.Number),
  }),
).annotate({
  identifier: "ExecutionDetails",
}) as any as S.Schema<ExecutionDetails>;
export interface PutJobSuccessResultInput {
  jobId: string;
  currentRevision?: CurrentRevision;
  continuationToken?: string;
  executionDetails?: ExecutionDetails;
  outputVariables?: { [key: string]: string | undefined };
}
export const PutJobSuccessResultInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String,
    currentRevision: S.optional(CurrentRevision),
    continuationToken: S.optional(S.String),
    executionDetails: S.optional(ExecutionDetails),
    outputVariables: S.optional(OutputVariablesMap),
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
  identifier: "PutJobSuccessResultInput",
}) as any as S.Schema<PutJobSuccessResultInput>;
export interface PutJobSuccessResultResponse {}
export const PutJobSuccessResultResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutJobSuccessResultResponse",
}) as any as S.Schema<PutJobSuccessResultResponse>;
export interface PutThirdPartyJobFailureResultInput {
  jobId: string;
  clientToken: string;
  failureDetails: FailureDetails;
}
export const PutThirdPartyJobFailureResultInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String,
    clientToken: S.String,
    failureDetails: FailureDetails,
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
  identifier: "PutThirdPartyJobFailureResultInput",
}) as any as S.Schema<PutThirdPartyJobFailureResultInput>;
export interface PutThirdPartyJobFailureResultResponse {}
export const PutThirdPartyJobFailureResultResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutThirdPartyJobFailureResultResponse",
}) as any as S.Schema<PutThirdPartyJobFailureResultResponse>;
export interface PutThirdPartyJobSuccessResultInput {
  jobId: string;
  clientToken: string;
  currentRevision?: CurrentRevision;
  continuationToken?: string;
  executionDetails?: ExecutionDetails;
}
export const PutThirdPartyJobSuccessResultInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String,
    clientToken: S.String,
    currentRevision: S.optional(CurrentRevision),
    continuationToken: S.optional(S.String),
    executionDetails: S.optional(ExecutionDetails),
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
  identifier: "PutThirdPartyJobSuccessResultInput",
}) as any as S.Schema<PutThirdPartyJobSuccessResultInput>;
export interface PutThirdPartyJobSuccessResultResponse {}
export const PutThirdPartyJobSuccessResultResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutThirdPartyJobSuccessResultResponse",
}) as any as S.Schema<PutThirdPartyJobSuccessResultResponse>;
export interface PutWebhookInput {
  webhook: WebhookDefinition;
  tags?: Tag[];
}
export const PutWebhookInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ webhook: WebhookDefinition, tags: S.optional(TagList) }).pipe(
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
  identifier: "PutWebhookInput",
}) as any as S.Schema<PutWebhookInput>;
export interface PutWebhookOutput {
  webhook?: ListWebhookItem;
}
export const PutWebhookOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ webhook: S.optional(ListWebhookItem) }).pipe(ns),
).annotate({
  identifier: "PutWebhookOutput",
}) as any as S.Schema<PutWebhookOutput>;
export interface RegisterWebhookWithThirdPartyInput {
  webhookName?: string;
}
export const RegisterWebhookWithThirdPartyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ webhookName: S.optional(S.String) }).pipe(
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
  identifier: "RegisterWebhookWithThirdPartyInput",
}) as any as S.Schema<RegisterWebhookWithThirdPartyInput>;
export interface RegisterWebhookWithThirdPartyOutput {}
export const RegisterWebhookWithThirdPartyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RegisterWebhookWithThirdPartyOutput",
}) as any as S.Schema<RegisterWebhookWithThirdPartyOutput>;
export interface RetryStageExecutionInput {
  pipelineName: string;
  stageName: string;
  pipelineExecutionId: string;
  retryMode: StageRetryMode;
}
export const RetryStageExecutionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipelineName: S.String,
    stageName: S.String,
    pipelineExecutionId: S.String,
    retryMode: StageRetryMode,
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
  identifier: "RetryStageExecutionInput",
}) as any as S.Schema<RetryStageExecutionInput>;
export interface RetryStageExecutionOutput {
  pipelineExecutionId?: string;
}
export const RetryStageExecutionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pipelineExecutionId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "RetryStageExecutionOutput",
}) as any as S.Schema<RetryStageExecutionOutput>;
export interface RollbackStageInput {
  pipelineName: string;
  stageName: string;
  targetPipelineExecutionId: string;
}
export const RollbackStageInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipelineName: S.String,
    stageName: S.String,
    targetPipelineExecutionId: S.String,
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
  identifier: "RollbackStageInput",
}) as any as S.Schema<RollbackStageInput>;
export interface RollbackStageOutput {
  pipelineExecutionId: string;
}
export const RollbackStageOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pipelineExecutionId: S.String }).pipe(ns),
).annotate({
  identifier: "RollbackStageOutput",
}) as any as S.Schema<RollbackStageOutput>;
export interface PipelineVariable {
  name: string;
  value: string;
}
export const PipelineVariable = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, value: S.String }),
).annotate({
  identifier: "PipelineVariable",
}) as any as S.Schema<PipelineVariable>;
export type PipelineVariableList = PipelineVariable[];
export const PipelineVariableList = /*@__PURE__*/ S.Array(PipelineVariable);
export type ClientRequestToken = string;
export type SourceRevisionType =
  | "COMMIT_ID"
  | "IMAGE_DIGEST"
  | "S3_OBJECT_VERSION_ID"
  | "S3_OBJECT_KEY"
  | (string & {});
export const SourceRevisionType = S.String;

export interface SourceRevisionOverride {
  actionName: string;
  revisionType: SourceRevisionType;
  revisionValue: string;
}
export const SourceRevisionOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionName: S.String,
    revisionType: SourceRevisionType,
    revisionValue: S.String,
  }),
).annotate({
  identifier: "SourceRevisionOverride",
}) as any as S.Schema<SourceRevisionOverride>;
export type SourceRevisionOverrideList = SourceRevisionOverride[];
export const SourceRevisionOverrideList = /*@__PURE__*/ S.Array(
  SourceRevisionOverride,
);
export interface StartPipelineExecutionInput {
  name: string;
  variables?: PipelineVariable[];
  clientRequestToken?: string;
  sourceRevisions?: SourceRevisionOverride[];
}
export const StartPipelineExecutionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    variables: S.optional(PipelineVariableList),
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    sourceRevisions: S.optional(SourceRevisionOverrideList),
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
  identifier: "StartPipelineExecutionInput",
}) as any as S.Schema<StartPipelineExecutionInput>;
export interface StartPipelineExecutionOutput {
  pipelineExecutionId?: string;
}
export const StartPipelineExecutionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pipelineExecutionId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "StartPipelineExecutionOutput",
}) as any as S.Schema<StartPipelineExecutionOutput>;
export interface StopPipelineExecutionInput {
  pipelineName: string;
  pipelineExecutionId: string;
  abandon?: boolean;
  reason?: string;
}
export const StopPipelineExecutionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipelineName: S.String,
    pipelineExecutionId: S.String,
    abandon: S.optional(S.Boolean),
    reason: S.optional(S.String),
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
  identifier: "StopPipelineExecutionInput",
}) as any as S.Schema<StopPipelineExecutionInput>;
export interface StopPipelineExecutionOutput {
  pipelineExecutionId?: string;
}
export const StopPipelineExecutionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pipelineExecutionId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "StopPipelineExecutionOutput",
}) as any as S.Schema<StopPipelineExecutionOutput>;
export interface TagResourceInput {
  resourceArn: string;
  tags: Tag[];
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tags: TagList }).pipe(
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
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceOutput {}
export const TagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
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
  S.Struct({ resourceArn: S.String, tagKeys: TagKeyList }).pipe(
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
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceOutput {}
export const UntagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export interface UpdateActionTypeInput {
  actionType: ActionTypeDeclaration;
}
export const UpdateActionTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ actionType: ActionTypeDeclaration }).pipe(
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
  identifier: "UpdateActionTypeInput",
}) as any as S.Schema<UpdateActionTypeInput>;
export interface UpdateActionTypeResponse {}
export const UpdateActionTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateActionTypeResponse",
}) as any as S.Schema<UpdateActionTypeResponse>;
export interface UpdatePipelineInput {
  pipeline: PipelineDeclaration;
}
export const UpdatePipelineInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pipeline: PipelineDeclaration }).pipe(
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
  identifier: "UpdatePipelineInput",
}) as any as S.Schema<UpdatePipelineInput>;
export interface UpdatePipelineOutput {
  pipeline?: PipelineDeclaration;
}
export const UpdatePipelineOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pipeline: S.optional(PipelineDeclaration) }).pipe(ns),
).annotate({
  identifier: "UpdatePipelineOutput",
}) as any as S.Schema<UpdatePipelineOutput>;
export type AcknowledgeJobError =
  | InvalidNonceException
  | JobNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specified job and whether that job has been received by
 * the job worker. Used for custom actions only.
 */
export const acknowledgeJob: API.OperationMethod<
  AcknowledgeJobInput,
  AcknowledgeJobOutput,
  AcknowledgeJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcknowledgeJobInput,
  output: AcknowledgeJobOutput,
  errors: [InvalidNonceException, JobNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcknowledgeJob",
}));

export type AcknowledgeThirdPartyJobError =
  | InvalidClientTokenException
  | InvalidNonceException
  | JobNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Confirms a job worker has received the specified job. Used for partner actions
 * only.
 */
export const acknowledgeThirdPartyJob: API.OperationMethod<
  AcknowledgeThirdPartyJobInput,
  AcknowledgeThirdPartyJobOutput,
  AcknowledgeThirdPartyJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcknowledgeThirdPartyJobInput,
  output: AcknowledgeThirdPartyJobOutput,
  errors: [
    InvalidClientTokenException,
    InvalidNonceException,
    JobNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcknowledgeThirdPartyJob",
}));

export type CreateCustomActionTypeError =
  | ConcurrentModificationException
  | InvalidTagsException
  | LimitExceededException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new custom action that can be used in all pipelines associated with the
 * Amazon Web Services account. Only used for custom actions.
 */
export const createCustomActionType: API.OperationMethod<
  CreateCustomActionTypeInput,
  CreateCustomActionTypeOutput,
  CreateCustomActionTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCustomActionTypeInput,
  output: CreateCustomActionTypeOutput,
  errors: [
    ConcurrentModificationException,
    InvalidTagsException,
    LimitExceededException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomActionType",
}));

export type CreatePipelineError =
  | ConcurrentModificationException
  | InvalidActionDeclarationException
  | InvalidBlockerDeclarationException
  | InvalidStageDeclarationException
  | InvalidStructureException
  | InvalidTagsException
  | LimitExceededException
  | PipelineNameInUseException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a pipeline.
 *
 * In the pipeline structure, you must include either `artifactStore`
 * or `artifactStores` in your pipeline, but you cannot use both. If you
 * create a cross-region action in your pipeline, you must use
 * `artifactStores`.
 */
export const createPipeline: API.OperationMethod<
  CreatePipelineInput,
  CreatePipelineOutput,
  CreatePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePipelineInput,
  output: CreatePipelineOutput,
  errors: [
    ConcurrentModificationException,
    InvalidActionDeclarationException,
    InvalidBlockerDeclarationException,
    InvalidStageDeclarationException,
    InvalidStructureException,
    InvalidTagsException,
    LimitExceededException,
    PipelineNameInUseException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePipeline",
}));

export type DeleteCustomActionTypeError =
  | ConcurrentModificationException
  | ValidationException
  | CommonErrors;
/**
 * Marks a custom action as deleted. `PollForJobs` for the custom action
 * fails after the action is marked for deletion. Used for custom actions only.
 *
 * To re-create a custom action after it has been deleted you must use a string in
 * the version field that has never been used before. This string can be an incremented
 * version number, for example. To restore a deleted custom action, use a JSON file
 * that is identical to the deleted action, including the original string in the
 * version field.
 */
export const deleteCustomActionType: API.OperationMethod<
  DeleteCustomActionTypeInput,
  DeleteCustomActionTypeResponse,
  DeleteCustomActionTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCustomActionTypeInput,
  output: DeleteCustomActionTypeResponse,
  errors: [ConcurrentModificationException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomActionType",
}));

export type DeletePipelineError =
  | ConcurrentModificationException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified pipeline.
 */
export const deletePipeline: API.OperationMethod<
  DeletePipelineInput,
  DeletePipelineResponse,
  DeletePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePipelineInput,
  output: DeletePipelineResponse,
  errors: [ConcurrentModificationException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePipeline",
}));

export type DeleteWebhookError =
  | ConcurrentModificationException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a previously created webhook by name. Deleting the webhook stops CodePipeline from starting a pipeline every time an external event occurs. The API
 * returns successfully when trying to delete a webhook that is already deleted. If a
 * deleted webhook is re-created by calling PutWebhook with the same name, it will have a
 * different URL.
 */
export const deleteWebhook: API.OperationMethod<
  DeleteWebhookInput,
  DeleteWebhookOutput,
  DeleteWebhookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWebhookInput,
  output: DeleteWebhookOutput,
  errors: [ConcurrentModificationException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWebhook",
}));

export type DeregisterWebhookWithThirdPartyError =
  | ValidationException
  | WebhookNotFoundException
  | CommonErrors;
/**
 * Removes the connection between the webhook that was created by CodePipeline
 * and the external tool with events to be detected. Currently supported only for webhooks
 * that target an action type of GitHub.
 */
export const deregisterWebhookWithThirdParty: API.OperationMethod<
  DeregisterWebhookWithThirdPartyInput,
  DeregisterWebhookWithThirdPartyOutput,
  DeregisterWebhookWithThirdPartyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterWebhookWithThirdPartyInput,
  output: DeregisterWebhookWithThirdPartyOutput,
  errors: [ValidationException, WebhookNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterWebhookWithThirdParty",
}));

export type DisableStageTransitionError =
  | PipelineNotFoundException
  | StageNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Prevents artifacts in a pipeline from transitioning to the next stage in the
 * pipeline.
 */
export const disableStageTransition: API.OperationMethod<
  DisableStageTransitionInput,
  DisableStageTransitionResponse,
  DisableStageTransitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisableStageTransitionInput,
  output: DisableStageTransitionResponse,
  errors: [
    PipelineNotFoundException,
    StageNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableStageTransition",
}));

export type EnableStageTransitionError =
  | PipelineNotFoundException
  | StageNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Enables artifacts in a pipeline to transition to a stage in a pipeline.
 */
export const enableStageTransition: API.OperationMethod<
  EnableStageTransitionInput,
  EnableStageTransitionResponse,
  EnableStageTransitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableStageTransitionInput,
  output: EnableStageTransitionResponse,
  errors: [
    PipelineNotFoundException,
    StageNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableStageTransition",
}));

export type GetActionTypeError =
  | ActionTypeNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an action type created for an external provider, where the
 * action is to be used by customers of the external provider. The action can be created
 * with any supported integration model.
 */
export const getActionType: API.OperationMethod<
  GetActionTypeInput,
  GetActionTypeOutput,
  GetActionTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetActionTypeInput,
  output: GetActionTypeOutput,
  errors: [ActionTypeNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetActionType",
}));

export type GetJobDetailsError =
  | JobNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a job. Used for custom actions only.
 *
 * When this API is called, CodePipeline returns temporary credentials for
 * the S3 bucket used to store artifacts for the pipeline, if the action requires
 * access to that S3 bucket for input or output artifacts. This API also returns any
 * secret values defined for the action.
 */
export const getJobDetails: API.OperationMethod<
  GetJobDetailsInput,
  GetJobDetailsOutput,
  GetJobDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJobDetailsInput,
  output: GetJobDetailsOutput,
  errors: [JobNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobDetails",
}));

export type GetPipelineError =
  | PipelineNotFoundException
  | PipelineVersionNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the metadata, structure, stages, and actions of a pipeline. Can be used to
 * return the entire structure of a pipeline in JSON format, which can then be modified and
 * used to update the pipeline structure with UpdatePipeline.
 */
export const getPipeline: API.OperationMethod<
  GetPipelineInput,
  GetPipelineOutput,
  GetPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPipelineInput,
  output: GetPipelineOutput,
  errors: [
    PipelineNotFoundException,
    PipelineVersionNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPipeline",
}));

export type GetPipelineExecutionError =
  | PipelineExecutionNotFoundException
  | PipelineNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an execution of a pipeline, including details about
 * artifacts, the pipeline execution ID, and the name, version, and status of the
 * pipeline.
 */
export const getPipelineExecution: API.OperationMethod<
  GetPipelineExecutionInput,
  GetPipelineExecutionOutput,
  GetPipelineExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPipelineExecutionInput,
  output: GetPipelineExecutionOutput,
  errors: [
    PipelineExecutionNotFoundException,
    PipelineNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPipelineExecution",
}));

export type GetPipelineStateError =
  | PipelineNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the state of a pipeline, including the stages and
 * actions.
 *
 * Values returned in the `revisionId` and `revisionUrl`
 * fields indicate the source revision information, such as the commit ID, for the
 * current state.
 */
export const getPipelineState: API.OperationMethod<
  GetPipelineStateInput,
  GetPipelineStateOutput,
  GetPipelineStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPipelineStateInput,
  output: GetPipelineStateOutput,
  errors: [PipelineNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPipelineState",
}));

export type GetThirdPartyJobDetailsError =
  | InvalidClientTokenException
  | InvalidJobException
  | JobNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Requests the details of a job for a third party action. Used for partner actions
 * only.
 *
 * When this API is called, CodePipeline returns temporary credentials for
 * the S3 bucket used to store artifacts for the pipeline, if the action requires
 * access to that S3 bucket for input or output artifacts. This API also returns any
 * secret values defined for the action.
 */
export const getThirdPartyJobDetails: API.OperationMethod<
  GetThirdPartyJobDetailsInput,
  GetThirdPartyJobDetailsOutput,
  GetThirdPartyJobDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetThirdPartyJobDetailsInput,
  output: GetThirdPartyJobDetailsOutput,
  errors: [
    InvalidClientTokenException,
    InvalidJobException,
    JobNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetThirdPartyJobDetails",
}));

export type ListActionExecutionsError =
  | InvalidNextTokenException
  | PipelineExecutionNotFoundException
  | PipelineNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the action executions that have occurred in a pipeline.
 */
export const listActionExecutions: API.PaginatedOperationMethod<
  ListActionExecutionsInput,
  ListActionExecutionsOutput,
  ListActionExecutionsError,
  Credentials | HttpClient.HttpClient,
  ActionExecutionDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListActionExecutionsInput,
  output: ListActionExecutionsOutput,
  errors: [
    InvalidNextTokenException,
    PipelineExecutionNotFoundException,
    PipelineNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListActionExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "actionExecutionDetails",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListActionTypesError =
  | InvalidNextTokenException
  | ValidationException
  | CommonErrors;
/**
 * Gets a summary of all CodePipeline action types associated with your
 * account.
 */
export const listActionTypes: API.PaginatedOperationMethod<
  ListActionTypesInput,
  ListActionTypesOutput,
  ListActionTypesError,
  Credentials | HttpClient.HttpClient,
  ActionType
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListActionTypesInput,
  output: ListActionTypesOutput,
  errors: [InvalidNextTokenException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListActionTypes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "actionTypes",
  } as const,
})) as any;

export type ListDeployActionExecutionTargetsError =
  | ActionExecutionNotFoundException
  | InvalidNextTokenException
  | PipelineNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the targets for the deploy action.
 */
export const listDeployActionExecutionTargets: API.PaginatedOperationMethod<
  ListDeployActionExecutionTargetsInput,
  ListDeployActionExecutionTargetsOutput,
  ListDeployActionExecutionTargetsError,
  Credentials | HttpClient.HttpClient,
  DeployActionExecutionTarget
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDeployActionExecutionTargetsInput,
  output: ListDeployActionExecutionTargetsOutput,
  errors: [
    ActionExecutionNotFoundException,
    InvalidNextTokenException,
    PipelineNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeployActionExecutionTargets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "targets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPipelineExecutionsError =
  | InvalidNextTokenException
  | PipelineNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets a summary of the most recent executions for a pipeline.
 *
 * When applying the filter for pipeline executions that have succeeded in the stage,
 * the operation returns all executions in the current pipeline version beginning on
 * February 1, 2024.
 */
export const listPipelineExecutions: API.PaginatedOperationMethod<
  ListPipelineExecutionsInput,
  ListPipelineExecutionsOutput,
  ListPipelineExecutionsError,
  Credentials | HttpClient.HttpClient,
  PipelineExecutionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPipelineExecutionsInput,
  output: ListPipelineExecutionsOutput,
  errors: [
    InvalidNextTokenException,
    PipelineNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPipelineExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "pipelineExecutionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPipelinesError =
  | InvalidNextTokenException
  | ValidationException
  | CommonErrors;
/**
 * Gets a summary of all of the pipelines associated with your account.
 */
export const listPipelines: API.PaginatedOperationMethod<
  ListPipelinesInput,
  ListPipelinesOutput,
  ListPipelinesError,
  Credentials | HttpClient.HttpClient,
  PipelineSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPipelinesInput,
  output: ListPipelinesOutput,
  errors: [InvalidNextTokenException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPipelines",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "pipelines",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRuleExecutionsError =
  | InvalidNextTokenException
  | PipelineExecutionNotFoundException
  | PipelineNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the rule executions that have occurred in a pipeline configured for conditions
 * with rules.
 */
export const listRuleExecutions: API.PaginatedOperationMethod<
  ListRuleExecutionsInput,
  ListRuleExecutionsOutput,
  ListRuleExecutionsError,
  Credentials | HttpClient.HttpClient,
  RuleExecutionDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRuleExecutionsInput,
  output: ListRuleExecutionsOutput,
  errors: [
    InvalidNextTokenException,
    PipelineExecutionNotFoundException,
    PipelineNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRuleExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "ruleExecutionDetails",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRuleTypesError =
  | InvalidNextTokenException
  | ValidationException
  | CommonErrors;
/**
 * Lists the rules for the condition. For more information about conditions, see Stage
 * conditions and How do
 * stage conditions work?.For more information about rules, see the CodePipeline rule reference.
 */
export const listRuleTypes: API.OperationMethod<
  ListRuleTypesInput,
  ListRuleTypesOutput,
  ListRuleTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListRuleTypesInput,
  output: ListRuleTypesOutput,
  errors: [InvalidNextTokenException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRuleTypes",
}));

export type ListTagsForResourceError =
  | InvalidArnException
  | InvalidNextTokenException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets the set of key-value pairs (metadata) that are used to manage the
 * resource.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [
    InvalidArnException,
    InvalidNextTokenException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tags",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWebhooksError =
  | InvalidNextTokenException
  | ValidationException
  | CommonErrors;
/**
 * Gets a listing of all the webhooks in this Amazon Web Services Region for this
 * account. The output lists all webhooks and includes the webhook URL and ARN and the
 * configuration for each webhook.
 *
 * If a secret token was provided, it will be redacted in the response.
 */
export const listWebhooks: API.PaginatedOperationMethod<
  ListWebhooksInput,
  ListWebhooksOutput,
  ListWebhooksError,
  Credentials | HttpClient.HttpClient,
  ListWebhookItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWebhooksInput,
  output: ListWebhooksOutput,
  errors: [InvalidNextTokenException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWebhooks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "webhooks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type OverrideStageConditionError =
  | ConcurrentPipelineExecutionsLimitExceededException
  | ConditionNotOverridableException
  | ConflictException
  | NotLatestPipelineExecutionException
  | PipelineNotFoundException
  | StageNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Used to override a stage condition. For more information about conditions, see Stage
 * conditions and How do
 * stage conditions work?.
 */
export const overrideStageCondition: API.OperationMethod<
  OverrideStageConditionInput,
  OverrideStageConditionResponse,
  OverrideStageConditionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: OverrideStageConditionInput,
  output: OverrideStageConditionResponse,
  errors: [
    ConcurrentPipelineExecutionsLimitExceededException,
    ConditionNotOverridableException,
    ConflictException,
    NotLatestPipelineExecutionException,
    PipelineNotFoundException,
    StageNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "OverrideStageCondition",
}));

export type PollForJobsError =
  | ActionTypeNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about any jobs for CodePipeline to act on.
 * `PollForJobs` is valid only for action types with "Custom" in the owner
 * field. If the action type contains `AWS` or `ThirdParty` in the
 * owner field, the `PollForJobs` action returns an error.
 *
 * When this API is called, CodePipeline returns temporary credentials for
 * the S3 bucket used to store artifacts for the pipeline, if the action requires
 * access to that S3 bucket for input or output artifacts. This API also returns any
 * secret values defined for the action.
 */
export const pollForJobs: API.OperationMethod<
  PollForJobsInput,
  PollForJobsOutput,
  PollForJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PollForJobsInput,
  output: PollForJobsOutput,
  errors: [ActionTypeNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PollForJobs",
}));

export type PollForThirdPartyJobsError =
  | ActionTypeNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Determines whether there are any third party jobs for a job worker to act on. Used
 * for partner actions only.
 *
 * When this API is called, CodePipeline returns temporary credentials for
 * the S3 bucket used to store artifacts for the pipeline, if the action requires
 * access to that S3 bucket for input or output artifacts.
 */
export const pollForThirdPartyJobs: API.OperationMethod<
  PollForThirdPartyJobsInput,
  PollForThirdPartyJobsOutput,
  PollForThirdPartyJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PollForThirdPartyJobsInput,
  output: PollForThirdPartyJobsOutput,
  errors: [ActionTypeNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PollForThirdPartyJobs",
}));

export type PutActionRevisionError =
  | ActionNotFoundException
  | ConcurrentPipelineExecutionsLimitExceededException
  | PipelineNotFoundException
  | StageNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Provides information to CodePipeline about new revisions to a
 * source.
 */
export const putActionRevision: API.OperationMethod<
  PutActionRevisionInput,
  PutActionRevisionOutput,
  PutActionRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutActionRevisionInput,
  output: PutActionRevisionOutput,
  errors: [
    ActionNotFoundException,
    ConcurrentPipelineExecutionsLimitExceededException,
    PipelineNotFoundException,
    StageNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutActionRevision",
}));

export type PutApprovalResultError =
  | ActionNotFoundException
  | ApprovalAlreadyCompletedException
  | InvalidApprovalTokenException
  | PipelineNotFoundException
  | StageNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Provides the response to a manual approval request to CodePipeline. Valid
 * responses include Approved and Rejected.
 */
export const putApprovalResult: API.OperationMethod<
  PutApprovalResultInput,
  PutApprovalResultOutput,
  PutApprovalResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutApprovalResultInput,
  output: PutApprovalResultOutput,
  errors: [
    ActionNotFoundException,
    ApprovalAlreadyCompletedException,
    InvalidApprovalTokenException,
    PipelineNotFoundException,
    StageNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutApprovalResult",
}));

export type PutJobFailureResultError =
  | InvalidJobStateException
  | JobNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Represents the failure of a job as returned to the pipeline by a job worker. Used
 * for custom actions only.
 */
export const putJobFailureResult: API.OperationMethod<
  PutJobFailureResultInput,
  PutJobFailureResultResponse,
  PutJobFailureResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutJobFailureResultInput,
  output: PutJobFailureResultResponse,
  errors: [InvalidJobStateException, JobNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutJobFailureResult",
}));

export type PutJobSuccessResultError =
  | InvalidJobStateException
  | JobNotFoundException
  | OutputVariablesSizeExceededException
  | ValidationException
  | CommonErrors;
/**
 * Represents the success of a job as returned to the pipeline by a job worker. Used
 * for custom actions only.
 */
export const putJobSuccessResult: API.OperationMethod<
  PutJobSuccessResultInput,
  PutJobSuccessResultResponse,
  PutJobSuccessResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutJobSuccessResultInput,
  output: PutJobSuccessResultResponse,
  errors: [
    InvalidJobStateException,
    JobNotFoundException,
    OutputVariablesSizeExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutJobSuccessResult",
}));

export type PutThirdPartyJobFailureResultError =
  | InvalidClientTokenException
  | InvalidJobStateException
  | JobNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Represents the failure of a third party job as returned to the pipeline by a job
 * worker. Used for partner actions only.
 */
export const putThirdPartyJobFailureResult: API.OperationMethod<
  PutThirdPartyJobFailureResultInput,
  PutThirdPartyJobFailureResultResponse,
  PutThirdPartyJobFailureResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutThirdPartyJobFailureResultInput,
  output: PutThirdPartyJobFailureResultResponse,
  errors: [
    InvalidClientTokenException,
    InvalidJobStateException,
    JobNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutThirdPartyJobFailureResult",
}));

export type PutThirdPartyJobSuccessResultError =
  | InvalidClientTokenException
  | InvalidJobStateException
  | JobNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Represents the success of a third party job as returned to the pipeline by a job
 * worker. Used for partner actions only.
 */
export const putThirdPartyJobSuccessResult: API.OperationMethod<
  PutThirdPartyJobSuccessResultInput,
  PutThirdPartyJobSuccessResultResponse,
  PutThirdPartyJobSuccessResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutThirdPartyJobSuccessResultInput,
  output: PutThirdPartyJobSuccessResultResponse,
  errors: [
    InvalidClientTokenException,
    InvalidJobStateException,
    JobNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutThirdPartyJobSuccessResult",
}));

export type PutWebhookError =
  | ConcurrentModificationException
  | InvalidTagsException
  | InvalidWebhookAuthenticationParametersException
  | InvalidWebhookFilterPatternException
  | LimitExceededException
  | PipelineNotFoundException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Defines a webhook and returns a unique webhook URL generated by CodePipeline.
 * This URL can be supplied to third party source hosting providers to call every time
 * there's a code change. When CodePipeline receives a POST request on this URL, the
 * pipeline defined in the webhook is started as long as the POST request satisfied the
 * authentication and filtering requirements supplied when defining the webhook.
 * RegisterWebhookWithThirdParty and DeregisterWebhookWithThirdParty APIs can be used to
 * automatically configure supported third parties to call the generated webhook
 * URL.
 *
 * When creating CodePipeline webhooks, do not use your own credentials or
 * reuse the same secret token across multiple webhooks. For optimal security, generate
 * a unique secret token for each webhook you create. The secret token is an arbitrary
 * string that you provide, which GitHub uses to compute and sign the webhook payloads
 * sent to CodePipeline, for protecting the integrity and authenticity of the
 * webhook payloads. Using your own credentials or reusing the same token across
 * multiple webhooks can lead to security vulnerabilities.
 *
 * If a secret token was provided, it will be redacted in the response.
 */
export const putWebhook: API.OperationMethod<
  PutWebhookInput,
  PutWebhookOutput,
  PutWebhookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutWebhookInput,
  output: PutWebhookOutput,
  errors: [
    ConcurrentModificationException,
    InvalidTagsException,
    InvalidWebhookAuthenticationParametersException,
    InvalidWebhookFilterPatternException,
    LimitExceededException,
    PipelineNotFoundException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutWebhook",
}));

export type RegisterWebhookWithThirdPartyError =
  | ValidationException
  | WebhookNotFoundException
  | CommonErrors;
/**
 * Configures a connection between the webhook that was created and the external tool
 * with events to be detected.
 */
export const registerWebhookWithThirdParty: API.OperationMethod<
  RegisterWebhookWithThirdPartyInput,
  RegisterWebhookWithThirdPartyOutput,
  RegisterWebhookWithThirdPartyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterWebhookWithThirdPartyInput,
  output: RegisterWebhookWithThirdPartyOutput,
  errors: [ValidationException, WebhookNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterWebhookWithThirdParty",
}));

export type RetryStageExecutionError =
  | ConcurrentPipelineExecutionsLimitExceededException
  | ConflictException
  | NotLatestPipelineExecutionException
  | PipelineNotFoundException
  | StageNotFoundException
  | StageNotRetryableException
  | ValidationException
  | CommonErrors;
/**
 * You can retry a stage that has failed without having to run a pipeline again from
 * the beginning. You do this by either retrying the failed actions in a stage or by
 * retrying all actions in the stage starting from the first action in the stage. When you
 * retry the failed actions in a stage, all actions that are still in progress continue
 * working, and failed actions are triggered again. When you retry a failed stage from the
 * first action in the stage, the stage cannot have any actions in progress. Before a stage
 * can be retried, it must either have all actions failed or some actions failed and some
 * succeeded.
 */
export const retryStageExecution: API.OperationMethod<
  RetryStageExecutionInput,
  RetryStageExecutionOutput,
  RetryStageExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RetryStageExecutionInput,
  output: RetryStageExecutionOutput,
  errors: [
    ConcurrentPipelineExecutionsLimitExceededException,
    ConflictException,
    NotLatestPipelineExecutionException,
    PipelineNotFoundException,
    StageNotFoundException,
    StageNotRetryableException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetryStageExecution",
}));

export type RollbackStageError =
  | ConflictException
  | PipelineExecutionNotFoundException
  | PipelineExecutionOutdatedException
  | PipelineNotFoundException
  | StageNotFoundException
  | UnableToRollbackStageException
  | ValidationException
  | CommonErrors;
/**
 * Rolls back a stage execution.
 */
export const rollbackStage: API.OperationMethod<
  RollbackStageInput,
  RollbackStageOutput,
  RollbackStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RollbackStageInput,
  output: RollbackStageOutput,
  errors: [
    ConflictException,
    PipelineExecutionNotFoundException,
    PipelineExecutionOutdatedException,
    PipelineNotFoundException,
    StageNotFoundException,
    UnableToRollbackStageException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RollbackStage",
}));

export type StartPipelineExecutionError =
  | ConcurrentPipelineExecutionsLimitExceededException
  | ConflictException
  | PipelineNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Starts the specified pipeline. Specifically, it begins processing the latest commit
 * to the source location specified as part of the pipeline.
 */
export const startPipelineExecution: API.OperationMethod<
  StartPipelineExecutionInput,
  StartPipelineExecutionOutput,
  StartPipelineExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartPipelineExecutionInput,
  output: StartPipelineExecutionOutput,
  errors: [
    ConcurrentPipelineExecutionsLimitExceededException,
    ConflictException,
    PipelineNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartPipelineExecution",
}));

export type StopPipelineExecutionError =
  | ConflictException
  | DuplicatedStopRequestException
  | PipelineExecutionNotStoppableException
  | PipelineNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Stops the specified pipeline execution. You choose to either stop the pipeline
 * execution by completing in-progress actions without starting subsequent actions, or by
 * abandoning in-progress actions. While completing or abandoning in-progress actions, the
 * pipeline execution is in a `Stopping` state. After all in-progress actions
 * are completed or abandoned, the pipeline execution is in a `Stopped`
 * state.
 */
export const stopPipelineExecution: API.OperationMethod<
  StopPipelineExecutionInput,
  StopPipelineExecutionOutput,
  StopPipelineExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopPipelineExecutionInput,
  output: StopPipelineExecutionOutput,
  errors: [
    ConflictException,
    DuplicatedStopRequestException,
    PipelineExecutionNotStoppableException,
    PipelineNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopPipelineExecution",
}));

export type TagResourceError =
  | ConcurrentModificationException
  | InvalidArnException
  | InvalidTagsException
  | ResourceNotFoundException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Adds to or modifies the tags of the given resource. Tags are metadata that can be used
 * to manage a resource.
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
    ConcurrentModificationException,
    InvalidArnException,
    InvalidTagsException,
    ResourceNotFoundException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | ConcurrentModificationException
  | InvalidArnException
  | InvalidTagsException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from an Amazon Web Services resource.
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
    ConcurrentModificationException,
    InvalidArnException,
    InvalidTagsException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateActionTypeError =
  | ActionTypeNotFoundException
  | RequestFailedException
  | ValidationException
  | CommonErrors;
/**
 * Updates an action type that was created with any supported integration model, where
 * the action type is to be used by customers of the action type provider. Use a JSON file
 * with the action definition and `UpdateActionType` to provide the full
 * structure.
 */
export const updateActionType: API.OperationMethod<
  UpdateActionTypeInput,
  UpdateActionTypeResponse,
  UpdateActionTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateActionTypeInput,
  output: UpdateActionTypeResponse,
  errors: [
    ActionTypeNotFoundException,
    RequestFailedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateActionType",
}));

export type UpdatePipelineError =
  | InvalidActionDeclarationException
  | InvalidBlockerDeclarationException
  | InvalidStageDeclarationException
  | InvalidStructureException
  | LimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Updates a specified pipeline with edits or changes to its structure. Use a JSON
 * file with the pipeline structure and `UpdatePipeline` to provide the full
 * structure of the pipeline. Updating the pipeline increases the version number of the
 * pipeline by 1.
 */
export const updatePipeline: API.OperationMethod<
  UpdatePipelineInput,
  UpdatePipelineOutput,
  UpdatePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePipelineInput,
  output: UpdatePipelineOutput,
  errors: [
    InvalidActionDeclarationException,
    InvalidBlockerDeclarationException,
    InvalidStageDeclarationException,
    InvalidStructureException,
    LimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePipeline",
}));
