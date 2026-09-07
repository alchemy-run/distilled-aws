import * as HttpClient from "effect/unstable/http/HttpClient";
import * as redacted from "effect/Redacted";
import * as S from "@distilled.cloud/core/schema";
import * as stream from "effect/Stream";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "Bedrock Agent Runtime",
  serviceShapeName: "AmazonBedrockAgentRunTimeService",
});
const auth = T.AwsAuthSigv4({ name: "bedrock" });
const ver = T.ServiceVersion("2023-07-26");
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
              `https://bedrock-agent-runtime-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://bedrock-agent-runtime-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://bedrock-agent-runtime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://bedrock-agent-runtime.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class BadGatewayException
  extends /*@__PURE__*/ S.TaggedError<BadGatewayException>()(
    "BadGatewayException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceName: S.optional(S.String),
    },
    T.HttpError(502),
  ).pipe(C.withServerError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DependencyFailedException
  extends /*@__PURE__*/ S.TaggedError<DependencyFailedException>()(
    "DependencyFailedException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceName: S.optional(S.String),
    },
    T.HttpError(424),
  ) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      reason: S.optional(S.String),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ModelNotReadyException
  extends /*@__PURE__*/ S.TaggedError<ModelNotReadyException>()(
    "ModelNotReadyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(424),
  ) {}
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
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export interface AgenticRetrieveMessageContent {
  text?: string;
}
export const AgenticRetrieveMessageContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ text: S.optional(S.String) }),
).annotate({
  identifier: "AgenticRetrieveMessageContent",
}) as any as S.Schema<AgenticRetrieveMessageContent>;
export type ConversationRole = "user" | "assistant" | (string & {});
export const ConversationRole = S.String;

export interface AgenticRetrieveMessage {
  content: AgenticRetrieveMessageContent;
  role: ConversationRole;
}
export const AgenticRetrieveMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ content: AgenticRetrieveMessageContent, role: ConversationRole }),
).annotate({
  identifier: "AgenticRetrieveMessage",
}) as any as S.Schema<AgenticRetrieveMessage>;
export type AgenticRetrieveMessages = AgenticRetrieveMessage[];
export const AgenticRetrieveMessages = /*@__PURE__*/ S.Array(
  AgenticRetrieveMessage,
);
export type KnowledgeBaseId = string;
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
export interface RetrievalOverrides {
  filter?: RetrievalFilter;
  maxNumberOfResults?: number;
}
export const RetrievalOverrides = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filter: S.optional(RetrievalFilter),
    maxNumberOfResults: S.optional(S.Number),
  }),
).annotate({
  identifier: "RetrievalOverrides",
}) as any as S.Schema<RetrievalOverrides>;
export interface KnowledgeBaseRetrieverConfiguration {
  knowledgeBaseId: string;
  retrievalOverrides?: RetrievalOverrides;
}
export const KnowledgeBaseRetrieverConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    knowledgeBaseId: S.String,
    retrievalOverrides: S.optional(RetrievalOverrides),
  }),
).annotate({
  identifier: "KnowledgeBaseRetrieverConfiguration",
}) as any as S.Schema<KnowledgeBaseRetrieverConfiguration>;
export type RetrieverConfiguration = {
  knowledgeBase: KnowledgeBaseRetrieverConfiguration;
};
export const RetrieverConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ knowledgeBase: KnowledgeBaseRetrieverConfiguration }),
]);
export interface AgenticRetriever {
  description?: string;
  configuration: RetrieverConfiguration;
}
export const AgenticRetriever = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    configuration: RetrieverConfiguration,
  }),
).annotate({
  identifier: "AgenticRetriever",
}) as any as S.Schema<AgenticRetriever>;
export type AgenticRetrievers = AgenticRetriever[];
export const AgenticRetrievers = /*@__PURE__*/ S.Array(AgenticRetriever);
export type FoundationModelType = "CUSTOM" | "MANAGED" | (string & {});
export const FoundationModelType = S.String;

export type FoundationModelConfigurationType =
  | "BEDROCK_FOUNDATION_MODEL"
  | (string & {});
export const FoundationModelConfigurationType = S.String;

export type BedrockModelArn = string;
export interface BedrockFoundationModelModelConfiguration {
  modelArn: string;
}
export const BedrockFoundationModelModelConfiguration = /*@__PURE__*/ S.suspend(
  () => S.Struct({ modelArn: S.String }),
).annotate({
  identifier: "BedrockFoundationModelModelConfiguration",
}) as any as S.Schema<BedrockFoundationModelModelConfiguration>;
export interface BedrockFoundationModelConfiguration {
  modelConfiguration: BedrockFoundationModelModelConfiguration;
}
export const BedrockFoundationModelConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ modelConfiguration: BedrockFoundationModelModelConfiguration }),
).annotate({
  identifier: "BedrockFoundationModelConfiguration",
}) as any as S.Schema<BedrockFoundationModelConfiguration>;
export interface FoundationModelConfiguration {
  type: FoundationModelConfigurationType;
  bedrockFoundationModelConfiguration?: BedrockFoundationModelConfiguration;
}
export const FoundationModelConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: FoundationModelConfigurationType,
    bedrockFoundationModelConfiguration: S.optional(
      BedrockFoundationModelConfiguration,
    ),
  }),
).annotate({
  identifier: "FoundationModelConfiguration",
}) as any as S.Schema<FoundationModelConfiguration>;
export type AgenticRetrieveRerankingModelType =
  | "CUSTOM"
  | "MANAGED"
  | "NONE"
  | (string & {});
export const AgenticRetrieveRerankingModelType = S.String;

export type AgenticRetrieveRerankingConfigurationType =
  | "BEDROCK_RERANKING_MODEL"
  | (string & {});
export const AgenticRetrieveRerankingConfigurationType = S.String;

export interface AgenticRetrieveBedrockRerankingModelConfiguration {
  modelArn: string;
}
export const AgenticRetrieveBedrockRerankingModelConfiguration =
  /*@__PURE__*/ S.suspend(() => S.Struct({ modelArn: S.String })).annotate({
    identifier: "AgenticRetrieveBedrockRerankingModelConfiguration",
  }) as any as S.Schema<AgenticRetrieveBedrockRerankingModelConfiguration>;
export interface AgenticRetrieveBedrockRerankingConfiguration {
  modelConfiguration: AgenticRetrieveBedrockRerankingModelConfiguration;
}
export const AgenticRetrieveBedrockRerankingConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      modelConfiguration: AgenticRetrieveBedrockRerankingModelConfiguration,
    }),
  ).annotate({
    identifier: "AgenticRetrieveBedrockRerankingConfiguration",
  }) as any as S.Schema<AgenticRetrieveBedrockRerankingConfiguration>;
export interface AgenticRetrieveRerankingConfiguration {
  type: AgenticRetrieveRerankingConfigurationType;
  bedrockRerankingConfiguration?: AgenticRetrieveBedrockRerankingConfiguration;
}
export const AgenticRetrieveRerankingConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      type: AgenticRetrieveRerankingConfigurationType,
      bedrockRerankingConfiguration: S.optional(
        AgenticRetrieveBedrockRerankingConfiguration,
      ),
    }),
).annotate({
  identifier: "AgenticRetrieveRerankingConfiguration",
}) as any as S.Schema<AgenticRetrieveRerankingConfiguration>;
export interface AgenticRetrieveConfiguration {
  foundationModelType?: FoundationModelType;
  foundationModelConfiguration?: FoundationModelConfiguration;
  rerankingModelType?: AgenticRetrieveRerankingModelType;
  rerankingConfiguration?: AgenticRetrieveRerankingConfiguration;
  maxAgentIteration?: number;
}
export const AgenticRetrieveConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    foundationModelType: S.optional(FoundationModelType),
    foundationModelConfiguration: S.optional(FoundationModelConfiguration),
    rerankingModelType: S.optional(AgenticRetrieveRerankingModelType),
    rerankingConfiguration: S.optional(AgenticRetrieveRerankingConfiguration),
    maxAgentIteration: S.optional(S.Number),
  }),
).annotate({
  identifier: "AgenticRetrieveConfiguration",
}) as any as S.Schema<AgenticRetrieveConfiguration>;
export interface AgenticRetrieveBedrockGuardrailConfiguration {
  guardrailId: string;
  guardrailVersion: string;
}
export const AgenticRetrieveBedrockGuardrailConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ guardrailId: S.String, guardrailVersion: S.String }),
  ).annotate({
    identifier: "AgenticRetrieveBedrockGuardrailConfiguration",
  }) as any as S.Schema<AgenticRetrieveBedrockGuardrailConfiguration>;
export interface AgenticRetrievePolicyConfiguration {
  bedrockGuardrailConfiguration?: AgenticRetrieveBedrockGuardrailConfiguration;
}
export const AgenticRetrievePolicyConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bedrockGuardrailConfiguration: S.optional(
      AgenticRetrieveBedrockGuardrailConfiguration,
    ),
  }),
).annotate({
  identifier: "AgenticRetrievePolicyConfiguration",
}) as any as S.Schema<AgenticRetrievePolicyConfiguration>;
export type NextToken = string;
export interface UserContext {
  userId: string;
}
export const UserContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userId: S.String }),
).annotate({ identifier: "UserContext" }) as any as S.Schema<UserContext>;
export type AgentCoreMemoryId = string;
export type AgentCoreMemoryActorId = string;
export type AgentCoreMemorySessionId = string;
export interface AgenticRetrieveMemorySessionBinding {
  actorId: string;
  sessionId: string;
}
export const AgenticRetrieveMemorySessionBinding = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ actorId: S.String, sessionId: S.String }),
).annotate({
  identifier: "AgenticRetrieveMemorySessionBinding",
}) as any as S.Schema<AgenticRetrieveMemorySessionBinding>;
export type MemoryNamespace = string;
export type MemoryStrategyId = string;
export type AgenticRetrieveMemoryMetadataKey = string;
export type AgenticRetrieveMemoryMetadataFilterLeft = { metadataKey: string };
export const AgenticRetrieveMemoryMetadataFilterLeft = /*@__PURE__*/ S.Union([
  S.Struct({ metadataKey: S.String }),
]);
export type AgenticRetrieveMemoryMetadataFilterOperator =
  | "EQUALS_TO"
  | "EXISTS"
  | "NOT_EXISTS"
  | "BEFORE"
  | "AFTER"
  | "CONTAINS"
  | "GREATER_THAN"
  | "GREATER_THAN_OR_EQUALS"
  | "LESS_THAN"
  | "LESS_THAN_OR_EQUALS"
  | (string & {});
export const AgenticRetrieveMemoryMetadataFilterOperator = S.String;

export type AgenticRetrieveMemoryMetadataStringValue = string;
export type AgenticRetrieveMemoryMetadataStringListItem = string;
export type AgenticRetrieveMemoryMetadataStringList = string[];
export const AgenticRetrieveMemoryMetadataStringList = /*@__PURE__*/ S.Array(
  S.String,
);
export type AgenticRetrieveMemoryMetadataValue =
  | {
      stringValue: string;
      numberValue?: never;
      stringListValue?: never;
      dateTimeValue?: never;
    }
  | {
      stringValue?: never;
      numberValue: number;
      stringListValue?: never;
      dateTimeValue?: never;
    }
  | {
      stringValue?: never;
      numberValue?: never;
      stringListValue: string[];
      dateTimeValue?: never;
    }
  | {
      stringValue?: never;
      numberValue?: never;
      stringListValue?: never;
      dateTimeValue: Date;
    };
export const AgenticRetrieveMemoryMetadataValue = /*@__PURE__*/ S.Union([
  S.Struct({ stringValue: S.String }),
  S.Struct({ numberValue: S.Number }),
  S.Struct({ stringListValue: AgenticRetrieveMemoryMetadataStringList }),
  S.Struct({ dateTimeValue: S.Date.pipe(T.TimestampFormat("epoch-seconds")) }),
]);
export type AgenticRetrieveMemoryMetadataFilterRight = {
  metadataValue: AgenticRetrieveMemoryMetadataValue;
};
export const AgenticRetrieveMemoryMetadataFilterRight = /*@__PURE__*/ S.Union([
  S.Struct({ metadataValue: AgenticRetrieveMemoryMetadataValue }),
]);
export interface AgenticRetrieveMemoryMetadataFilter {
  left: AgenticRetrieveMemoryMetadataFilterLeft;
  operator: AgenticRetrieveMemoryMetadataFilterOperator;
  right?: AgenticRetrieveMemoryMetadataFilterRight;
}
export const AgenticRetrieveMemoryMetadataFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    left: AgenticRetrieveMemoryMetadataFilterLeft,
    operator: AgenticRetrieveMemoryMetadataFilterOperator,
    right: S.optional(AgenticRetrieveMemoryMetadataFilterRight),
  }),
).annotate({
  identifier: "AgenticRetrieveMemoryMetadataFilter",
}) as any as S.Schema<AgenticRetrieveMemoryMetadataFilter>;
export type AgenticRetrieveMemoryMetadataFilterList =
  AgenticRetrieveMemoryMetadataFilter[];
export const AgenticRetrieveMemoryMetadataFilterList = /*@__PURE__*/ S.Array(
  AgenticRetrieveMemoryMetadataFilter,
);
export interface AgenticRetrieveMemoryRetrievalConfig {
  namespace?: string;
  namespacePath?: string;
  strategyId?: string;
  metadataFilters?: AgenticRetrieveMemoryMetadataFilter[];
}
export const AgenticRetrieveMemoryRetrievalConfig = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      namespace: S.optional(S.String),
      namespacePath: S.optional(S.String),
      strategyId: S.optional(S.String),
      metadataFilters: S.optional(AgenticRetrieveMemoryMetadataFilterList),
    }),
).annotate({
  identifier: "AgenticRetrieveMemoryRetrievalConfig",
}) as any as S.Schema<AgenticRetrieveMemoryRetrievalConfig>;
export type AgenticRetrieveMemoryRetrievalConfigList =
  AgenticRetrieveMemoryRetrievalConfig[];
export const AgenticRetrieveMemoryRetrievalConfigList = /*@__PURE__*/ S.Array(
  AgenticRetrieveMemoryRetrievalConfig,
);
export type AgenticRetrieveMemoryPersistenceMode =
  | "DEFAULT"
  | "NONE"
  | (string & {});
export const AgenticRetrieveMemoryPersistenceMode = S.String;

export interface AgenticRetrieveMemoryConfiguration {
  memoryId: string;
  sessionBinding?: AgenticRetrieveMemorySessionBinding;
  retrievalConfigs?: AgenticRetrieveMemoryRetrievalConfig[];
  persistenceMode?: AgenticRetrieveMemoryPersistenceMode;
}
export const AgenticRetrieveMemoryConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memoryId: S.String,
    sessionBinding: S.optional(AgenticRetrieveMemorySessionBinding),
    retrievalConfigs: S.optional(AgenticRetrieveMemoryRetrievalConfigList),
    persistenceMode: S.optional(AgenticRetrieveMemoryPersistenceMode),
  }),
).annotate({
  identifier: "AgenticRetrieveMemoryConfiguration",
}) as any as S.Schema<AgenticRetrieveMemoryConfiguration>;
export interface AgenticRetrieveStreamRequest {
  messages: AgenticRetrieveMessage[];
  retrievers: AgenticRetriever[];
  agenticRetrieveConfiguration: AgenticRetrieveConfiguration;
  policyConfiguration?: AgenticRetrievePolicyConfiguration;
  nextToken?: string;
  userContext?: UserContext;
  memoryConfiguration?: AgenticRetrieveMemoryConfiguration;
  generateResponse?: boolean;
}
export const AgenticRetrieveStreamRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    messages: AgenticRetrieveMessages,
    retrievers: AgenticRetrievers,
    agenticRetrieveConfiguration: AgenticRetrieveConfiguration,
    policyConfiguration: S.optional(AgenticRetrievePolicyConfiguration),
    nextToken: S.optional(S.String),
    userContext: S.optional(UserContext),
    memoryConfiguration: S.optional(AgenticRetrieveMemoryConfiguration),
    generateResponse: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/agenticRetrieveStream" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AgenticRetrieveStreamRequest",
}) as any as S.Schema<AgenticRetrieveStreamRequest>;
export type MimeType = string;
export interface RetrievalContent {
  byteContent?: Uint8Array;
  text?: string;
  mimeType: string;
}
export const RetrievalContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    byteContent: S.optional(T.Blob),
    text: S.optional(S.String),
    mimeType: S.String,
  }),
).annotate({
  identifier: "RetrievalContent",
}) as any as S.Schema<RetrievalContent>;
export type AgenticRetrieveMetadata = { [key: string]: any | undefined };
export const AgenticRetrieveMetadata = /*@__PURE__*/ S.Record(
  S.String,
  S.Any.pipe(S.optional),
);
export interface AgenticRetrieveSourceRetriever {
  identifier: string;
}
export const AgenticRetrieveSourceRetriever = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifier: S.String }),
).annotate({
  identifier: "AgenticRetrieveSourceRetriever",
}) as any as S.Schema<AgenticRetrieveSourceRetriever>;
export interface AgenticRetrieveResultItem {
  content: RetrievalContent;
  metadata?: { [key: string]: any | undefined };
  sourceRetriever: AgenticRetrieveSourceRetriever;
}
export const AgenticRetrieveResultItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    content: RetrievalContent,
    metadata: S.optional(AgenticRetrieveMetadata),
    sourceRetriever: AgenticRetrieveSourceRetriever,
  }),
).annotate({
  identifier: "AgenticRetrieveResultItem",
}) as any as S.Schema<AgenticRetrieveResultItem>;
export type AgenticRetrieveResults = AgenticRetrieveResultItem[];
export const AgenticRetrieveResults = /*@__PURE__*/ S.Array(
  AgenticRetrieveResultItem,
);
export interface AgenticRetrieveCitationReference {
  resultIndex: number;
}
export const AgenticRetrieveCitationReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resultIndex: S.Number }),
).annotate({
  identifier: "AgenticRetrieveCitationReference",
}) as any as S.Schema<AgenticRetrieveCitationReference>;
export type AgenticRetrieveCitationReferenceList =
  AgenticRetrieveCitationReference[];
export const AgenticRetrieveCitationReferenceList = /*@__PURE__*/ S.Array(
  AgenticRetrieveCitationReference,
);
export interface AgenticRetrieveCitation {
  startIndex: number;
  endIndex: number;
  references: AgenticRetrieveCitationReference[];
}
export const AgenticRetrieveCitation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startIndex: S.Number,
    endIndex: S.Number,
    references: AgenticRetrieveCitationReferenceList,
  }),
).annotate({
  identifier: "AgenticRetrieveCitation",
}) as any as S.Schema<AgenticRetrieveCitation>;
export type AgenticRetrieveCitationList = AgenticRetrieveCitation[];
export const AgenticRetrieveCitationList = /*@__PURE__*/ S.Array(
  AgenticRetrieveCitation,
);
export interface AgenticRetrieveGeneratedResponse {
  answer: string;
  citations?: AgenticRetrieveCitation[];
}
export const AgenticRetrieveGeneratedResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    answer: S.String,
    citations: S.optional(AgenticRetrieveCitationList),
  }),
).annotate({
  identifier: "AgenticRetrieveGeneratedResponse",
}) as any as S.Schema<AgenticRetrieveGeneratedResponse>;
export interface AgenticRetrieveResultEvent {
  results: AgenticRetrieveResultItem[];
  generatedResponse?: AgenticRetrieveGeneratedResponse;
  nextToken?: string;
}
export const AgenticRetrieveResultEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    results: AgenticRetrieveResults,
    generatedResponse: S.optional(AgenticRetrieveGeneratedResponse),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "AgenticRetrieveResultEvent",
}) as any as S.Schema<AgenticRetrieveResultEvent>;
export type AgenticRetrieveStep =
  | "Planning"
  | "Retrieval"
  | "SpeculativeRetrieval"
  | "FullDocumentExpansion"
  | "SessionHistoryLoad"
  | (string & {});
export const AgenticRetrieveStep = S.String;

export type AgenticRetrieveStatus =
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export const AgenticRetrieveStatus = S.String;

export type AgenticRetrieveSourceRetrieverList =
  AgenticRetrieveSourceRetriever[];
export const AgenticRetrieveSourceRetrieverList = /*@__PURE__*/ S.Array(
  AgenticRetrieveSourceRetriever,
);
export interface AgenticRetrieveActionDetails {
  inputQuery: AgenticRetrieveMessageContent;
  sourceRetrievers: AgenticRetrieveSourceRetriever[];
}
export const AgenticRetrieveActionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inputQuery: AgenticRetrieveMessageContent,
    sourceRetrievers: AgenticRetrieveSourceRetrieverList,
  }),
).annotate({
  identifier: "AgenticRetrieveActionDetails",
}) as any as S.Schema<AgenticRetrieveActionDetails>;
export interface AgenticRetrieveFullDocExpansionDetails {
  documentId?: string;
  sourceRetriever?: AgenticRetrieveSourceRetriever;
}
export const AgenticRetrieveFullDocExpansionDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      documentId: S.optional(S.String),
      sourceRetriever: S.optional(AgenticRetrieveSourceRetriever),
    }),
).annotate({
  identifier: "AgenticRetrieveFullDocExpansionDetails",
}) as any as S.Schema<AgenticRetrieveFullDocExpansionDetails>;
export interface AgenticRetrieveMemoryRetrieveDetails {
  inputQuery: AgenticRetrieveMessageContent;
  memoryId: string;
  namespace?: string;
  namespacePath?: string;
  strategyId?: string;
}
export const AgenticRetrieveMemoryRetrieveDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      inputQuery: AgenticRetrieveMessageContent,
      memoryId: S.String,
      namespace: S.optional(S.String),
      namespacePath: S.optional(S.String),
      strategyId: S.optional(S.String),
    }),
).annotate({
  identifier: "AgenticRetrieveMemoryRetrieveDetails",
}) as any as S.Schema<AgenticRetrieveMemoryRetrieveDetails>;
export interface AgenticRetrieveAction {
  retrieve?: AgenticRetrieveActionDetails;
  fullDocumentExpansion?: AgenticRetrieveFullDocExpansionDetails;
  memoryRetrieve?: AgenticRetrieveMemoryRetrieveDetails;
}
export const AgenticRetrieveAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    retrieve: S.optional(AgenticRetrieveActionDetails),
    fullDocumentExpansion: S.optional(AgenticRetrieveFullDocExpansionDetails),
    memoryRetrieve: S.optional(AgenticRetrieveMemoryRetrieveDetails),
  }),
).annotate({
  identifier: "AgenticRetrieveAction",
}) as any as S.Schema<AgenticRetrieveAction>;
export type AgenticRetrieveActions = AgenticRetrieveAction[];
export const AgenticRetrieveActions = /*@__PURE__*/ S.Array(
  AgenticRetrieveAction,
);
export interface AgenticRetrieveWarningMessage {
  message: string;
}
export const AgenticRetrieveWarningMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.String }),
).annotate({
  identifier: "AgenticRetrieveWarningMessage",
}) as any as S.Schema<AgenticRetrieveWarningMessage>;
export type GuardrailAction = "INTERVENED" | "NONE" | (string & {});
export const GuardrailAction = S.String;

export interface AgenticRetrieveGuardrailWarning {
  id: string;
  version: string;
  action: GuardrailAction;
  message?: string;
}
export const AgenticRetrieveGuardrailWarning = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    version: S.String,
    action: GuardrailAction,
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "AgenticRetrieveGuardrailWarning",
}) as any as S.Schema<AgenticRetrieveGuardrailWarning>;
export type AgenticRetrieveWarning =
  | { message: AgenticRetrieveWarningMessage; guardrail?: never }
  | { message?: never; guardrail: AgenticRetrieveGuardrailWarning };
export const AgenticRetrieveWarning = /*@__PURE__*/ S.Union([
  S.Struct({ message: AgenticRetrieveWarningMessage }),
  S.Struct({ guardrail: AgenticRetrieveGuardrailWarning }),
]);
export type AgenticRetrieveWarnings = AgenticRetrieveWarning[];
export const AgenticRetrieveWarnings = /*@__PURE__*/ S.Array(
  AgenticRetrieveWarning,
);
export interface AgenticRetrieveFailure {
  message: string;
}
export const AgenticRetrieveFailure = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.String }),
).annotate({
  identifier: "AgenticRetrieveFailure",
}) as any as S.Schema<AgenticRetrieveFailure>;
export type AgenticRetrieveFailures = AgenticRetrieveFailure[];
export const AgenticRetrieveFailures = /*@__PURE__*/ S.Array(
  AgenticRetrieveFailure,
);
export type AgenticRetrieveType =
  | "BedrockKnowledgeBase"
  | "BedrockAgentCoreMemory"
  | (string & {});
export const AgenticRetrieveType = S.String;

export interface AgenticRetrieveSourceMetadata {
  identifier?: string;
  retrievalType?: AgenticRetrieveType;
}
export const AgenticRetrieveSourceMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.optional(S.String),
    retrievalType: S.optional(AgenticRetrieveType),
  }),
).annotate({
  identifier: "AgenticRetrieveSourceMetadata",
}) as any as S.Schema<AgenticRetrieveSourceMetadata>;
export type AgenticRetrieveSourceMetadataList = AgenticRetrieveSourceMetadata[];
export const AgenticRetrieveSourceMetadataList = /*@__PURE__*/ S.Array(
  AgenticRetrieveSourceMetadata,
);
export interface AgenticRetrieveTraceResultItem {
  content?: RetrievalContent;
  metadata?: { [key: string]: any | undefined };
  sourceRetriever?: AgenticRetrieveSourceRetriever;
}
export const AgenticRetrieveTraceResultItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    content: S.optional(RetrievalContent),
    metadata: S.optional(AgenticRetrieveMetadata),
    sourceRetriever: S.optional(AgenticRetrieveSourceRetriever),
  }),
).annotate({
  identifier: "AgenticRetrieveTraceResultItem",
}) as any as S.Schema<AgenticRetrieveTraceResultItem>;
export type AgenticRetrieveTraceResults = AgenticRetrieveTraceResultItem[];
export const AgenticRetrieveTraceResults = /*@__PURE__*/ S.Array(
  AgenticRetrieveTraceResultItem,
);
export interface AgenticRetrieveTraceEventAttributes {
  step: AgenticRetrieveStep;
  status: AgenticRetrieveStatus;
  message: string;
  actions?: AgenticRetrieveAction[];
  warnings?: AgenticRetrieveWarning[];
  failures?: AgenticRetrieveFailure[];
  retrievalMetadata?: AgenticRetrieveSourceMetadata[];
  retrievalResponse?: AgenticRetrieveTraceResultItem[];
}
export const AgenticRetrieveTraceEventAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    step: AgenticRetrieveStep,
    status: AgenticRetrieveStatus,
    message: S.String,
    actions: S.optional(AgenticRetrieveActions),
    warnings: S.optional(AgenticRetrieveWarnings),
    failures: S.optional(AgenticRetrieveFailures),
    retrievalMetadata: S.optional(AgenticRetrieveSourceMetadataList),
    retrievalResponse: S.optional(AgenticRetrieveTraceResults),
  }),
).annotate({
  identifier: "AgenticRetrieveTraceEventAttributes",
}) as any as S.Schema<AgenticRetrieveTraceEventAttributes>;
export interface AgenticRetrieveTraceEvent {
  id: string;
  timestamp: number;
  attributes: AgenticRetrieveTraceEventAttributes;
}
export const AgenticRetrieveTraceEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    timestamp: S.Number,
    attributes: AgenticRetrieveTraceEventAttributes,
  }),
).annotate({
  identifier: "AgenticRetrieveTraceEvent",
}) as any as S.Schema<AgenticRetrieveTraceEvent>;
export interface AgenticRetrieveResponseEvent {
  text: string;
}
export const AgenticRetrieveResponseEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ text: S.String }),
).annotate({
  identifier: "AgenticRetrieveResponseEvent",
}) as any as S.Schema<AgenticRetrieveResponseEvent>;
export type NonBlankString = string;
export type AgenticRetrieveStreamResponseOutput =
  | {
      result: AgenticRetrieveResultEvent;
      traceEvent?: never;
      responseEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      result?: never;
      traceEvent: AgenticRetrieveTraceEvent;
      responseEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      result?: never;
      traceEvent?: never;
      responseEvent: AgenticRetrieveResponseEvent;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      result?: never;
      traceEvent?: never;
      responseEvent?: never;
      internalServerException: InternalServerException;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      result?: never;
      traceEvent?: never;
      responseEvent?: never;
      internalServerException?: never;
      validationException: ValidationException;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      result?: never;
      traceEvent?: never;
      responseEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException: ResourceNotFoundException;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      result?: never;
      traceEvent?: never;
      responseEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException: ServiceQuotaExceededException;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      result?: never;
      traceEvent?: never;
      responseEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException: ThrottlingException;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      result?: never;
      traceEvent?: never;
      responseEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException: AccessDeniedException;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      result?: never;
      traceEvent?: never;
      responseEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException: ConflictException;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      result?: never;
      traceEvent?: never;
      responseEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException: DependencyFailedException;
      badGatewayException?: never;
    }
  | {
      result?: never;
      traceEvent?: never;
      responseEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException: BadGatewayException;
    };
export const AgenticRetrieveStreamResponseOutput = /*@__PURE__*/ T.EventStream(
  S.Union([
    S.Struct({ result: AgenticRetrieveResultEvent }),
    S.Struct({ traceEvent: AgenticRetrieveTraceEvent }),
    S.Struct({ responseEvent: AgenticRetrieveResponseEvent }),
    S.Struct({
      internalServerException: S.suspend(
        () => InternalServerException,
      ).annotate({ identifier: "InternalServerException" }),
    }),
    S.Struct({
      validationException: S.suspend(() => ValidationException).annotate({
        identifier: "ValidationException",
      }),
    }),
    S.Struct({
      resourceNotFoundException: S.suspend(
        () => ResourceNotFoundException,
      ).annotate({ identifier: "ResourceNotFoundException" }),
    }),
    S.Struct({
      serviceQuotaExceededException: S.suspend(
        () => ServiceQuotaExceededException,
      ).annotate({ identifier: "ServiceQuotaExceededException" }),
    }),
    S.Struct({
      throttlingException: S.suspend(() => ThrottlingException).annotate({
        identifier: "ThrottlingException",
      }),
    }),
    S.Struct({
      accessDeniedException: S.suspend(() => AccessDeniedException).annotate({
        identifier: "AccessDeniedException",
      }),
    }),
    S.Struct({
      conflictException: S.suspend(() => ConflictException).annotate({
        identifier: "ConflictException",
      }),
    }),
    S.Struct({
      dependencyFailedException: S.suspend(
        () => DependencyFailedException,
      ).annotate({ identifier: "DependencyFailedException" }),
    }),
    S.Struct({
      badGatewayException: S.suspend(() => BadGatewayException).annotate({
        identifier: "BadGatewayException",
      }),
    }),
  ]),
) as any as S.Schema<
  stream.Stream<AgenticRetrieveStreamResponseOutput, Error, never>
>;
export interface AgenticRetrieveStreamResponse {
  stream: stream.Stream<AgenticRetrieveStreamResponseOutput, Error, never>;
}
export const AgenticRetrieveStreamResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stream: AgenticRetrieveStreamResponseOutput.pipe(T.HttpPayload()),
  }),
).annotate({
  identifier: "AgenticRetrieveStreamResponse",
}) as any as S.Schema<AgenticRetrieveStreamResponse>;
export type KnowledgeBaseIdentifier = string;
export type DataSourceId = string;
export type DocumentId = string;
export interface CheckIngestedDocumentAclRequest {
  knowledgeBaseId: string;
  dataSourceId: string;
  documentId: string;
  userContext: UserContext;
}
export const CheckIngestedDocumentAclRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
    dataSourceId: S.String.pipe(T.HttpLabel("dataSourceId")),
    documentId: S.String,
    userContext: UserContext,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}/check-ingested-document-acl",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CheckIngestedDocumentAclRequest",
}) as any as S.Schema<CheckIngestedDocumentAclRequest>;
export interface CheckIngestedDocumentAclResponse {
  hasAccess: boolean;
}
export const CheckIngestedDocumentAclResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ hasAccess: S.Boolean }),
).annotate({
  identifier: "CheckIngestedDocumentAclResponse",
}) as any as S.Schema<CheckIngestedDocumentAclResponse>;
export type Uuid = string;
export type InvocationDescription = string;
export type SessionIdentifier = string;
export interface CreateInvocationRequest {
  invocationId?: string;
  description?: string;
  sessionIdentifier: string;
}
export const CreateInvocationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    invocationId: S.optional(S.String),
    description: S.optional(S.String),
    sessionIdentifier: S.String.pipe(T.HttpLabel("sessionIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/sessions/{sessionIdentifier}/invocations/",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateInvocationRequest",
}) as any as S.Schema<CreateInvocationRequest>;
export interface CreateInvocationResponse {
  sessionId: string;
  invocationId: string;
  createdAt: Date;
}
export const CreateInvocationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.String,
    invocationId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreateInvocationResponse",
}) as any as S.Schema<CreateInvocationResponse>;
export type SessionMetadataKey = string;
export type SessionMetadataValue = string;
export type SessionMetadataMap = { [key: string]: string | undefined };
export const SessionMetadataMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type KmsKeyArn = string;
export type TagKey = string;
export type TagValue = string;
export type TagsMap = { [key: string]: string | undefined };
export const TagsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateSessionRequest {
  sessionMetadata?: { [key: string]: string | undefined };
  encryptionKeyArn?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionMetadata: S.optional(SessionMetadataMap),
    encryptionKeyArn: S.optional(S.String),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/sessions/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSessionRequest",
}) as any as S.Schema<CreateSessionRequest>;
export type SessionArn = string;
export type SessionStatus = "ACTIVE" | "EXPIRED" | "ENDED" | (string & {});
export const SessionStatus = S.String;

export interface CreateSessionResponse {
  sessionId: string;
  sessionArn: string;
  sessionStatus: SessionStatus;
  createdAt: Date;
}
export const CreateSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.String,
    sessionArn: S.String,
    sessionStatus: SessionStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreateSessionResponse",
}) as any as S.Schema<CreateSessionResponse>;
export type AgentId = string;
export type AgentAliasId = string;
export type MemoryId = string;
export type SessionId = string;
export interface DeleteAgentMemoryRequest {
  agentId: string;
  agentAliasId: string;
  memoryId?: string;
  sessionId?: string;
}
export const DeleteAgentMemoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentId: S.String.pipe(T.HttpLabel("agentId")),
    agentAliasId: S.String.pipe(T.HttpLabel("agentAliasId")),
    memoryId: S.optional(S.String).pipe(T.HttpQuery("memoryId")),
    sessionId: S.optional(S.String).pipe(T.HttpQuery("sessionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/agents/{agentId}/agentAliases/{agentAliasId}/memories",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAgentMemoryRequest",
}) as any as S.Schema<DeleteAgentMemoryRequest>;
export interface DeleteAgentMemoryResponse {}
export const DeleteAgentMemoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAgentMemoryResponse",
}) as any as S.Schema<DeleteAgentMemoryResponse>;
export interface DeleteSessionRequest {
  sessionIdentifier: string;
}
export const DeleteSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionIdentifier: S.String.pipe(T.HttpLabel("sessionIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/sessions/{sessionIdentifier}/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSessionRequest",
}) as any as S.Schema<DeleteSessionRequest>;
export interface DeleteSessionResponse {}
export const DeleteSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSessionResponse",
}) as any as S.Schema<DeleteSessionResponse>;
export interface EndSessionRequest {
  sessionIdentifier: string;
}
export const EndSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionIdentifier: S.String.pipe(T.HttpLabel("sessionIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/sessions/{sessionIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "EndSessionRequest",
}) as any as S.Schema<EndSessionRequest>;
export interface EndSessionResponse {
  sessionId: string;
  sessionArn: string;
  sessionStatus: SessionStatus;
}
export const EndSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.String,
    sessionArn: S.String,
    sessionStatus: SessionStatus,
  }),
).annotate({
  identifier: "EndSessionResponse",
}) as any as S.Schema<EndSessionResponse>;
export type InputQueryType = "TEXT" | (string & {});
export const InputQueryType = S.String;

export interface QueryGenerationInput {
  type: InputQueryType;
  text: string;
}
export const QueryGenerationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: InputQueryType, text: S.String }),
).annotate({
  identifier: "QueryGenerationInput",
}) as any as S.Schema<QueryGenerationInput>;
export type QueryTransformationMode = "TEXT_TO_SQL" | (string & {});
export const QueryTransformationMode = S.String;

export type TextToSqlConfigurationType = "KNOWLEDGE_BASE" | (string & {});
export const TextToSqlConfigurationType = S.String;

export type KnowledgeBaseArn = string;
export interface TextToSqlKnowledgeBaseConfiguration {
  knowledgeBaseArn: string;
}
export const TextToSqlKnowledgeBaseConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ knowledgeBaseArn: S.String }),
).annotate({
  identifier: "TextToSqlKnowledgeBaseConfiguration",
}) as any as S.Schema<TextToSqlKnowledgeBaseConfiguration>;
export interface TextToSqlConfiguration {
  type: TextToSqlConfigurationType;
  knowledgeBaseConfiguration?: TextToSqlKnowledgeBaseConfiguration;
}
export const TextToSqlConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: TextToSqlConfigurationType,
    knowledgeBaseConfiguration: S.optional(TextToSqlKnowledgeBaseConfiguration),
  }),
).annotate({
  identifier: "TextToSqlConfiguration",
}) as any as S.Schema<TextToSqlConfiguration>;
export interface TransformationConfiguration {
  mode: QueryTransformationMode;
  textToSqlConfiguration?: TextToSqlConfiguration;
}
export const TransformationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mode: QueryTransformationMode,
    textToSqlConfiguration: S.optional(TextToSqlConfiguration),
  }),
).annotate({
  identifier: "TransformationConfiguration",
}) as any as S.Schema<TransformationConfiguration>;
export interface GenerateQueryRequest {
  queryGenerationInput: QueryGenerationInput;
  transformationConfiguration: TransformationConfiguration;
}
export const GenerateQueryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queryGenerationInput: QueryGenerationInput,
    transformationConfiguration: TransformationConfiguration,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/generateQuery" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GenerateQueryRequest",
}) as any as S.Schema<GenerateQueryRequest>;
export type GeneratedQueryType = "REDSHIFT_SQL" | (string & {});
export const GeneratedQueryType = S.String;

export interface GeneratedQuery {
  type?: GeneratedQueryType;
  sql?: string;
}
export const GeneratedQuery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: S.optional(GeneratedQueryType), sql: S.optional(S.String) }),
).annotate({ identifier: "GeneratedQuery" }) as any as S.Schema<GeneratedQuery>;
export type GeneratedQueries = GeneratedQuery[];
export const GeneratedQueries = /*@__PURE__*/ S.Array(GeneratedQuery);
export interface GenerateQueryResponse {
  queries?: GeneratedQuery[];
}
export const GenerateQueryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ queries: S.optional(GeneratedQueries) }),
).annotate({
  identifier: "GenerateQueryResponse",
}) as any as S.Schema<GenerateQueryResponse>;
export type MaxResults = number;
export type MemoryType = "SESSION_SUMMARY" | (string & {});
export const MemoryType = S.String;

export interface GetAgentMemoryRequest {
  nextToken?: string;
  maxItems?: number;
  agentId: string;
  agentAliasId: string;
  memoryType: MemoryType;
  memoryId: string;
}
export const GetAgentMemoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxItems: S.optional(S.Number).pipe(T.HttpQuery("maxItems")),
    agentId: S.String.pipe(T.HttpLabel("agentId")),
    agentAliasId: S.String.pipe(T.HttpLabel("agentAliasId")),
    memoryType: MemoryType.pipe(T.HttpQuery("memoryType")),
    memoryId: S.String.pipe(T.HttpQuery("memoryId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/agents/{agentId}/agentAliases/{agentAliasId}/memories",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAgentMemoryRequest",
}) as any as S.Schema<GetAgentMemoryRequest>;
export type SummaryText = string;
export interface MemorySessionSummary {
  memoryId?: string;
  sessionId?: string;
  sessionStartTime?: Date;
  sessionExpiryTime?: Date;
  summaryText?: string;
}
export const MemorySessionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memoryId: S.optional(S.String),
    sessionId: S.optional(S.String),
    sessionStartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    sessionExpiryTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    summaryText: S.optional(S.String),
  }),
).annotate({
  identifier: "MemorySessionSummary",
}) as any as S.Schema<MemorySessionSummary>;
export type Memory = { sessionSummary: MemorySessionSummary };
export const Memory = /*@__PURE__*/ S.Union([
  S.Struct({ sessionSummary: MemorySessionSummary }),
]);
export type Memories = Memory[];
export const Memories = /*@__PURE__*/ S.Array(Memory);
export interface GetAgentMemoryResponse {
  nextToken?: string;
  memoryContents?: Memory[];
}
export const GetAgentMemoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    memoryContents: S.optional(Memories),
  }),
).annotate({
  identifier: "GetAgentMemoryResponse",
}) as any as S.Schema<GetAgentMemoryResponse>;
export type DocumentOutputFormat = "RAW" | "EXTRACTED" | (string & {});
export const DocumentOutputFormat = S.String;

export interface GetDocumentContentRequest {
  knowledgeBaseId: string;
  dataSourceId: string;
  documentId: string;
  outputFormat?: DocumentOutputFormat;
  userContext?: UserContext;
}
export const GetDocumentContentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
    dataSourceId: S.String.pipe(T.HttpLabel("dataSourceId")),
    documentId: S.String.pipe(T.HttpLabel("documentId")),
    outputFormat: S.optional(DocumentOutputFormat),
    userContext: S.optional(UserContext),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}/documents/{documentId}/content",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDocumentContentRequest",
}) as any as S.Schema<GetDocumentContentRequest>;
export type PresignedUrl = string | redacted.Redacted<string>;
export interface GetDocumentContentResponse {
  mimeType: string;
  presignedUrl: string | redacted.Redacted<string>;
  documentContentLength?: number;
}
export const GetDocumentContentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mimeType: S.String,
    presignedUrl: SensitiveString,
    documentContentLength: S.optional(S.Number),
  }),
).annotate({
  identifier: "GetDocumentContentResponse",
}) as any as S.Schema<GetDocumentContentResponse>;
export type FlowIdentifier = string;
export type FlowAliasIdentifier = string;
export type FlowExecutionIdentifier = string;
export interface GetExecutionFlowSnapshotRequest {
  flowIdentifier: string;
  flowAliasIdentifier: string;
  executionIdentifier: string;
}
export const GetExecutionFlowSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    flowIdentifier: S.String.pipe(T.HttpLabel("flowIdentifier")),
    flowAliasIdentifier: S.String.pipe(T.HttpLabel("flowAliasIdentifier")),
    executionIdentifier: S.String.pipe(T.HttpLabel("executionIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/flows/{flowIdentifier}/aliases/{flowAliasIdentifier}/executions/{executionIdentifier}/flowsnapshot",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetExecutionFlowSnapshotRequest",
}) as any as S.Schema<GetExecutionFlowSnapshotRequest>;
export type Version = string;
export type FlowExecutionRoleArn = string;
export interface GetExecutionFlowSnapshotResponse {
  flowIdentifier: string;
  flowAliasIdentifier: string;
  flowVersion: string;
  executionRoleArn: string;
  definition: string;
  customerEncryptionKeyArn?: string;
}
export const GetExecutionFlowSnapshotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    flowIdentifier: S.String,
    flowAliasIdentifier: S.String,
    flowVersion: S.String,
    executionRoleArn: S.String,
    definition: S.String,
    customerEncryptionKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetExecutionFlowSnapshotResponse",
}) as any as S.Schema<GetExecutionFlowSnapshotResponse>;
export interface GetFlowExecutionRequest {
  flowIdentifier: string;
  flowAliasIdentifier: string;
  executionIdentifier: string;
}
export const GetFlowExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    flowIdentifier: S.String.pipe(T.HttpLabel("flowIdentifier")),
    flowAliasIdentifier: S.String.pipe(T.HttpLabel("flowAliasIdentifier")),
    executionIdentifier: S.String.pipe(T.HttpLabel("executionIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/flows/{flowIdentifier}/aliases/{flowAliasIdentifier}/executions/{executionIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFlowExecutionRequest",
}) as any as S.Schema<GetFlowExecutionRequest>;
export type FlowExecutionStatus =
  | "Running"
  | "Succeeded"
  | "Failed"
  | "TimedOut"
  | "Aborted"
  | (string & {});
export const FlowExecutionStatus = S.String;

export type NodeName = string;
export type FlowExecutionErrorType = "ExecutionTimedOut" | (string & {});
export const FlowExecutionErrorType = S.String;

export interface FlowExecutionError {
  nodeName?: string;
  error?: FlowExecutionErrorType;
  message?: string;
}
export const FlowExecutionError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodeName: S.optional(S.String),
    error: S.optional(FlowExecutionErrorType),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "FlowExecutionError",
}) as any as S.Schema<FlowExecutionError>;
export type FlowExecutionErrors = FlowExecutionError[];
export const FlowExecutionErrors = /*@__PURE__*/ S.Array(FlowExecutionError);
export interface GetFlowExecutionResponse {
  executionArn: string;
  status: FlowExecutionStatus;
  startedAt: Date;
  endedAt?: Date;
  errors?: FlowExecutionError[];
  flowAliasIdentifier: string;
  flowIdentifier: string;
  flowVersion: string;
}
export const GetFlowExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionArn: S.String,
    status: FlowExecutionStatus,
    startedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    errors: S.optional(FlowExecutionErrors),
    flowAliasIdentifier: S.String,
    flowIdentifier: S.String,
    flowVersion: S.String,
  }),
).annotate({
  identifier: "GetFlowExecutionResponse",
}) as any as S.Schema<GetFlowExecutionResponse>;
export interface GetIngestedDocumentAclRequest {
  knowledgeBaseId: string;
  dataSourceId: string;
  documentId: string;
}
export const GetIngestedDocumentAclRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
    dataSourceId: S.String.pipe(T.HttpLabel("dataSourceId")),
    documentId: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}/get-ingested-document-acl",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIngestedDocumentAclRequest",
}) as any as S.Schema<GetIngestedDocumentAclRequest>;
export type DocumentAclMemberRelation = "AND" | "OR" | (string & {});
export const DocumentAclMemberRelation = S.String;

export type DocumentAclMembershipType =
  | "KNOWLEDGE_BASE"
  | "DATA_SOURCE"
  | (string & {});
export const DocumentAclMembershipType = S.String;

export interface DocumentAclUser {
  id: string;
  type: DocumentAclMembershipType;
}
export const DocumentAclUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String, type: DocumentAclMembershipType }),
).annotate({
  identifier: "DocumentAclUser",
}) as any as S.Schema<DocumentAclUser>;
export type DocumentAclUserList = DocumentAclUser[];
export const DocumentAclUserList = /*@__PURE__*/ S.Array(DocumentAclUser);
export interface DocumentAclGroup {
  id: string;
  type: DocumentAclMembershipType;
}
export const DocumentAclGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String, type: DocumentAclMembershipType }),
).annotate({
  identifier: "DocumentAclGroup",
}) as any as S.Schema<DocumentAclGroup>;
export type DocumentAclGroupList = DocumentAclGroup[];
export const DocumentAclGroupList = /*@__PURE__*/ S.Array(DocumentAclGroup);
export interface DocumentAclCondition {
  conditionOperator?: DocumentAclMemberRelation;
  users?: DocumentAclUser[];
  groups?: DocumentAclGroup[];
}
export const DocumentAclCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    conditionOperator: S.optional(DocumentAclMemberRelation),
    users: S.optional(DocumentAclUserList),
    groups: S.optional(DocumentAclGroupList),
  }),
).annotate({
  identifier: "DocumentAclCondition",
}) as any as S.Schema<DocumentAclCondition>;
export type DocumentAclConditionList = DocumentAclCondition[];
export const DocumentAclConditionList =
  /*@__PURE__*/ S.Array(DocumentAclCondition);
export interface DocumentAclMembership {
  memberRelation?: DocumentAclMemberRelation;
  conditions?: DocumentAclCondition[];
}
export const DocumentAclMembership = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memberRelation: S.optional(DocumentAclMemberRelation),
    conditions: S.optional(DocumentAclConditionList),
  }),
).annotate({
  identifier: "DocumentAclMembership",
}) as any as S.Schema<DocumentAclMembership>;
export interface DocumentAcl {
  allowList?: DocumentAclMembership;
  denyList?: DocumentAclMembership;
}
export const DocumentAcl = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    allowList: S.optional(DocumentAclMembership),
    denyList: S.optional(DocumentAclMembership),
  }),
).annotate({ identifier: "DocumentAcl" }) as any as S.Schema<DocumentAcl>;
export interface GetIngestedDocumentAclResponse {
  documentAcl: DocumentAcl;
}
export const GetIngestedDocumentAclResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ documentAcl: DocumentAcl }),
).annotate({
  identifier: "GetIngestedDocumentAclResponse",
}) as any as S.Schema<GetIngestedDocumentAclResponse>;
export type InvocationIdentifier = string;
export interface GetInvocationStepRequest {
  invocationIdentifier: string;
  invocationStepId: string;
  sessionIdentifier: string;
}
export const GetInvocationStepRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    invocationIdentifier: S.String,
    invocationStepId: S.String.pipe(T.HttpLabel("invocationStepId")),
    sessionIdentifier: S.String.pipe(T.HttpLabel("sessionIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sessions/{sessionIdentifier}/invocationSteps/{invocationStepId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetInvocationStepRequest",
}) as any as S.Schema<GetInvocationStepRequest>;
export type ImageFormat = "png" | "jpeg" | "gif" | "webp" | (string & {});
export const ImageFormat = S.String;

export type S3Uri = string;
export interface S3Location {
  uri: string;
}
export const S3Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ uri: S.String }),
).annotate({ identifier: "S3Location" }) as any as S.Schema<S3Location>;
export type ImageSource =
  | { bytes: Uint8Array; s3Location?: never }
  | { bytes?: never; s3Location: S3Location };
export const ImageSource = /*@__PURE__*/ S.Union([
  S.Struct({ bytes: T.Blob }),
  S.Struct({ s3Location: S3Location }),
]);
export interface ImageBlock {
  format: ImageFormat;
  source: ImageSource;
}
export const ImageBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ format: ImageFormat, source: ImageSource }),
).annotate({ identifier: "ImageBlock" }) as any as S.Schema<ImageBlock>;
export type BedrockSessionContentBlock =
  | { text: string; image?: never }
  | { text?: never; image: ImageBlock };
export const BedrockSessionContentBlock = /*@__PURE__*/ S.Union([
  S.Struct({ text: S.String }),
  S.Struct({ image: ImageBlock }),
]);
export type BedrockSessionContentBlocks = BedrockSessionContentBlock[];
export const BedrockSessionContentBlocks = /*@__PURE__*/ S.Array(
  BedrockSessionContentBlock,
);
export type InvocationStepPayload = {
  contentBlocks: BedrockSessionContentBlock[];
};
export const InvocationStepPayload = /*@__PURE__*/ S.Union([
  S.Struct({ contentBlocks: BedrockSessionContentBlocks }),
]);
export interface InvocationStep {
  sessionId: string;
  invocationId: string;
  invocationStepId: string;
  invocationStepTime: Date;
  payload: InvocationStepPayload;
}
export const InvocationStep = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.String,
    invocationId: S.String,
    invocationStepId: S.String,
    invocationStepTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    payload: InvocationStepPayload,
  }),
).annotate({ identifier: "InvocationStep" }) as any as S.Schema<InvocationStep>;
export interface GetInvocationStepResponse {
  invocationStep: InvocationStep;
}
export const GetInvocationStepResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ invocationStep: InvocationStep }),
).annotate({
  identifier: "GetInvocationStepResponse",
}) as any as S.Schema<GetInvocationStepResponse>;
export interface GetSessionRequest {
  sessionIdentifier: string;
}
export const GetSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionIdentifier: S.String.pipe(T.HttpLabel("sessionIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sessions/{sessionIdentifier}/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSessionRequest",
}) as any as S.Schema<GetSessionRequest>;
export interface GetSessionResponse {
  sessionId: string;
  sessionArn: string;
  sessionStatus: SessionStatus;
  createdAt: Date;
  lastUpdatedAt: Date;
  sessionMetadata?: { [key: string]: string | undefined };
  encryptionKeyArn?: string;
}
export const GetSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.String,
    sessionArn: S.String,
    sessionStatus: SessionStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    sessionMetadata: S.optional(SessionMetadataMap),
    encryptionKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetSessionResponse",
}) as any as S.Schema<GetSessionResponse>;
export type SessionAttributesMap = { [key: string]: string | undefined };
export const SessionAttributesMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type PromptSessionAttributesMap = { [key: string]: string | undefined };
export const PromptSessionAttributesMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ApiPath = string | redacted.Redacted<string>;
export type ConfirmationState = "CONFIRM" | "DENY" | (string & {});
export const ConfirmationState = S.String;

export type ResponseState = "FAILURE" | "REPROMPT" | (string & {});
export const ResponseState = S.String;

export type ImageInputFormat = "png" | "jpeg" | "gif" | "webp" | (string & {});
export const ImageInputFormat = S.String;

export type ImageInputSource = { bytes: Uint8Array };
export const ImageInputSource = /*@__PURE__*/ S.Union([
  S.Struct({ bytes: T.Blob }),
]);
export interface ImageInput {
  format: ImageInputFormat;
  source: ImageInputSource;
}
export const ImageInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ format: ImageInputFormat, source: ImageInputSource }),
).annotate({ identifier: "ImageInput" }) as any as S.Schema<ImageInput>;
export type ImageInputs = ImageInput[];
export const ImageInputs = /*@__PURE__*/ S.Array(ImageInput);
export interface ContentBody {
  body?: string;
  images?: ImageInput[];
}
export const ContentBody = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ body: S.optional(S.String), images: S.optional(ImageInputs) }),
).annotate({ identifier: "ContentBody" }) as any as S.Schema<ContentBody>;
export type ResponseBody = { [key: string]: ContentBody | undefined };
export const ResponseBody = /*@__PURE__*/ S.Record(
  S.String,
  ContentBody.pipe(S.optional),
);
export interface ApiResult {
  actionGroup: string;
  httpMethod?: string;
  apiPath?: string | redacted.Redacted<string>;
  confirmationState?: ConfirmationState;
  responseState?: ResponseState;
  httpStatusCode?: number;
  responseBody?: { [key: string]: ContentBody | undefined };
  agentId?: string;
}
export const ApiResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionGroup: S.String,
    httpMethod: S.optional(S.String),
    apiPath: S.optional(SensitiveString),
    confirmationState: S.optional(ConfirmationState),
    responseState: S.optional(ResponseState),
    httpStatusCode: S.optional(S.Number),
    responseBody: S.optional(ResponseBody),
    agentId: S.optional(S.String),
  }),
).annotate({ identifier: "ApiResult" }) as any as S.Schema<ApiResult>;
export interface FunctionResult {
  actionGroup: string;
  confirmationState?: ConfirmationState;
  function?: string;
  responseBody?: { [key: string]: ContentBody | undefined };
  responseState?: ResponseState;
  agentId?: string;
}
export const FunctionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionGroup: S.String,
    confirmationState: S.optional(ConfirmationState),
    function: S.optional(S.String),
    responseBody: S.optional(ResponseBody),
    responseState: S.optional(ResponseState),
    agentId: S.optional(S.String),
  }),
).annotate({ identifier: "FunctionResult" }) as any as S.Schema<FunctionResult>;
export type InvocationResultMember =
  | { apiResult: ApiResult; functionResult?: never }
  | { apiResult?: never; functionResult: FunctionResult };
export const InvocationResultMember = /*@__PURE__*/ S.Union([
  S.Struct({ apiResult: ApiResult }),
  S.Struct({ functionResult: FunctionResult }),
]);
export type ReturnControlInvocationResults = InvocationResultMember[];
export const ReturnControlInvocationResults = /*@__PURE__*/ S.Array(
  InvocationResultMember,
);
export type FileSourceType = "S3" | "BYTE_CONTENT" | (string & {});
export const FileSourceType = S.String;

export interface S3ObjectFile {
  uri: string;
}
export const S3ObjectFile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ uri: S.String }),
).annotate({ identifier: "S3ObjectFile" }) as any as S.Schema<S3ObjectFile>;
export type ByteContentBlob = Uint8Array | redacted.Redacted<Uint8Array>;
export interface ByteContentFile {
  mediaType: string;
  data: Uint8Array | redacted.Redacted<Uint8Array>;
}
export const ByteContentFile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ mediaType: S.String, data: SensitiveBlob }),
).annotate({
  identifier: "ByteContentFile",
}) as any as S.Schema<ByteContentFile>;
export interface FileSource {
  sourceType: FileSourceType;
  s3Location?: S3ObjectFile;
  byteContent?: ByteContentFile;
}
export const FileSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceType: FileSourceType,
    s3Location: S.optional(S3ObjectFile),
    byteContent: S.optional(ByteContentFile),
  }),
).annotate({ identifier: "FileSource" }) as any as S.Schema<FileSource>;
export type FileUseCase = "CODE_INTERPRETER" | "CHAT" | (string & {});
export const FileUseCase = S.String;

export interface InputFile {
  name: string;
  source: FileSource;
  useCase: FileUseCase;
}
export const InputFile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, source: FileSource, useCase: FileUseCase }),
).annotate({ identifier: "InputFile" }) as any as S.Schema<InputFile>;
export type InputFiles = InputFile[];
export const InputFiles = /*@__PURE__*/ S.Array(InputFile);
export type SearchType = "HYBRID" | "SEMANTIC" | (string & {});
export const SearchType = S.String;

export type VectorSearchRerankingConfigurationType =
  | "BEDROCK_RERANKING_MODEL"
  | (string & {});
export const VectorSearchRerankingConfigurationType = S.String;

export type BedrockRerankingModelArn = string;
export type AdditionalModelRequestFieldsKey = string;
export type AdditionalModelRequestFieldsValue = unknown;
export type AdditionalModelRequestFields = { [key: string]: any | undefined };
export const AdditionalModelRequestFields = /*@__PURE__*/ S.Record(
  S.String,
  S.Any.pipe(S.optional),
);
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
export const RerankingMetadataSelectionMode = S.String;

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
export type AttributeType =
  | "STRING"
  | "NUMBER"
  | "BOOLEAN"
  | "STRING_LIST"
  | (string & {});
export const AttributeType = S.String;

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
export interface KnowledgeBaseVectorSearchConfiguration {
  numberOfResults?: number;
  overrideSearchType?: SearchType;
  filter?: RetrievalFilter;
  rerankingConfiguration?: VectorSearchRerankingConfiguration;
  implicitFilterConfiguration?: ImplicitFilterConfiguration;
}
export const KnowledgeBaseVectorSearchConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      numberOfResults: S.optional(S.Number),
      overrideSearchType: S.optional(SearchType),
      filter: S.optional(RetrievalFilter),
      rerankingConfiguration: S.optional(VectorSearchRerankingConfiguration),
      implicitFilterConfiguration: S.optional(ImplicitFilterConfiguration),
    }),
).annotate({
  identifier: "KnowledgeBaseVectorSearchConfiguration",
}) as any as S.Schema<KnowledgeBaseVectorSearchConfiguration>;
export type RerankingModelType = "CUSTOM" | "MANAGED" | "NONE" | (string & {});
export const RerankingModelType = S.String;

export type ManagedSearchRerankingConfigurationType =
  | "BEDROCK_RERANKING_MODEL"
  | (string & {});
export const ManagedSearchRerankingConfigurationType = S.String;

export interface ManagedSearchBedrockRerankingModelConfiguration {
  modelArn: string;
  additionalModelRequestFields?: { [key: string]: any | undefined };
}
export const ManagedSearchBedrockRerankingModelConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      modelArn: S.String,
      additionalModelRequestFields: S.optional(AdditionalModelRequestFields),
    }),
  ).annotate({
    identifier: "ManagedSearchBedrockRerankingModelConfiguration",
  }) as any as S.Schema<ManagedSearchBedrockRerankingModelConfiguration>;
export interface ManagedSearchBedrockRerankingConfiguration {
  modelConfiguration: ManagedSearchBedrockRerankingModelConfiguration;
  numberOfRerankedResults?: number;
  metadataConfiguration?: MetadataConfigurationForReranking;
}
export const ManagedSearchBedrockRerankingConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      modelConfiguration: ManagedSearchBedrockRerankingModelConfiguration,
      numberOfRerankedResults: S.optional(S.Number),
      metadataConfiguration: S.optional(MetadataConfigurationForReranking),
    }),
  ).annotate({
    identifier: "ManagedSearchBedrockRerankingConfiguration",
  }) as any as S.Schema<ManagedSearchBedrockRerankingConfiguration>;
export interface ManagedSearchRerankingConfiguration {
  type: ManagedSearchRerankingConfigurationType;
  bedrockRerankingConfiguration?: ManagedSearchBedrockRerankingConfiguration;
}
export const ManagedSearchRerankingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: ManagedSearchRerankingConfigurationType,
    bedrockRerankingConfiguration: S.optional(
      ManagedSearchBedrockRerankingConfiguration,
    ),
  }),
).annotate({
  identifier: "ManagedSearchRerankingConfiguration",
}) as any as S.Schema<ManagedSearchRerankingConfiguration>;
export interface ManagedSearchConfiguration {
  numberOfResults?: number;
  filter?: RetrievalFilter;
  rerankingModelType?: RerankingModelType;
  rerankingConfiguration?: ManagedSearchRerankingConfiguration;
}
export const ManagedSearchConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    numberOfResults: S.optional(S.Number),
    filter: S.optional(RetrievalFilter),
    rerankingModelType: S.optional(RerankingModelType),
    rerankingConfiguration: S.optional(ManagedSearchRerankingConfiguration),
  }),
).annotate({
  identifier: "ManagedSearchConfiguration",
}) as any as S.Schema<ManagedSearchConfiguration>;
export interface KnowledgeBaseRetrievalConfiguration {
  vectorSearchConfiguration?: KnowledgeBaseVectorSearchConfiguration;
  managedSearchConfiguration?: ManagedSearchConfiguration;
}
export const KnowledgeBaseRetrievalConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vectorSearchConfiguration: S.optional(
      KnowledgeBaseVectorSearchConfiguration,
    ),
    managedSearchConfiguration: S.optional(ManagedSearchConfiguration),
  }),
).annotate({
  identifier: "KnowledgeBaseRetrievalConfiguration",
}) as any as S.Schema<KnowledgeBaseRetrievalConfiguration>;
export interface KnowledgeBaseConfiguration {
  knowledgeBaseId: string;
  retrievalConfiguration: KnowledgeBaseRetrievalConfiguration;
}
export const KnowledgeBaseConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    knowledgeBaseId: S.String,
    retrievalConfiguration: KnowledgeBaseRetrievalConfiguration,
  }),
).annotate({
  identifier: "KnowledgeBaseConfiguration",
}) as any as S.Schema<KnowledgeBaseConfiguration>;
export type KnowledgeBaseConfigurations = KnowledgeBaseConfiguration[];
export const KnowledgeBaseConfigurations = /*@__PURE__*/ S.Array(
  KnowledgeBaseConfiguration,
);
export type ContentBlock = { text: string };
export const ContentBlock = /*@__PURE__*/ S.Union([
  S.Struct({ text: S.String }),
]);
export type ContentBlocks = ContentBlock[];
export const ContentBlocks = /*@__PURE__*/ S.Array(ContentBlock);
export interface Message {
  role: ConversationRole;
  content: ContentBlock[];
}
export const Message = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ role: ConversationRole, content: ContentBlocks }),
).annotate({ identifier: "Message" }) as any as S.Schema<Message>;
export type Messages = Message[];
export const Messages = /*@__PURE__*/ S.Array(Message);
export interface ConversationHistory {
  messages?: Message[];
}
export const ConversationHistory = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ messages: S.optional(Messages) }),
).annotate({
  identifier: "ConversationHistory",
}) as any as S.Schema<ConversationHistory>;
export interface SessionState {
  sessionAttributes?: { [key: string]: string | undefined };
  promptSessionAttributes?: { [key: string]: string | undefined };
  returnControlInvocationResults?: InvocationResultMember[];
  invocationId?: string;
  files?: InputFile[];
  knowledgeBaseConfigurations?: KnowledgeBaseConfiguration[];
  conversationHistory?: ConversationHistory;
}
export const SessionState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionAttributes: S.optional(SessionAttributesMap),
    promptSessionAttributes: S.optional(PromptSessionAttributesMap),
    returnControlInvocationResults: S.optional(ReturnControlInvocationResults),
    invocationId: S.optional(S.String),
    files: S.optional(InputFiles),
    knowledgeBaseConfigurations: S.optional(KnowledgeBaseConfigurations),
    conversationHistory: S.optional(ConversationHistory),
  }),
).annotate({ identifier: "SessionState" }) as any as S.Schema<SessionState>;
export type InputText = string | redacted.Redacted<string>;
export type PerformanceConfigLatency = "standard" | "optimized" | (string & {});
export const PerformanceConfigLatency = S.String;

export interface PerformanceConfiguration {
  latency?: PerformanceConfigLatency;
}
export const PerformanceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ latency: S.optional(PerformanceConfigLatency) }),
).annotate({
  identifier: "PerformanceConfiguration",
}) as any as S.Schema<PerformanceConfiguration>;
export interface BedrockModelConfigurations {
  performanceConfig?: PerformanceConfiguration;
}
export const BedrockModelConfigurations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ performanceConfig: S.optional(PerformanceConfiguration) }),
).annotate({
  identifier: "BedrockModelConfigurations",
}) as any as S.Schema<BedrockModelConfigurations>;
export interface StreamingConfigurations {
  streamFinalResponse?: boolean;
  applyGuardrailInterval?: number;
}
export const StreamingConfigurations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    streamFinalResponse: S.optional(S.Boolean),
    applyGuardrailInterval: S.optional(S.Number),
  }),
).annotate({
  identifier: "StreamingConfigurations",
}) as any as S.Schema<StreamingConfigurations>;
export interface PromptCreationConfigurations {
  previousConversationTurnsToInclude?: number;
  excludePreviousThinkingSteps?: boolean;
}
export const PromptCreationConfigurations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    previousConversationTurnsToInclude: S.optional(S.Number),
    excludePreviousThinkingSteps: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "PromptCreationConfigurations",
}) as any as S.Schema<PromptCreationConfigurations>;
export type AWSResourceARN = string;
export interface InvokeAgentRequest {
  sessionState?: SessionState;
  agentId: string;
  agentAliasId: string;
  sessionId: string;
  endSession?: boolean;
  enableTrace?: boolean;
  inputText?: string | redacted.Redacted<string>;
  memoryId?: string;
  bedrockModelConfigurations?: BedrockModelConfigurations;
  streamingConfigurations?: StreamingConfigurations;
  promptCreationConfigurations?: PromptCreationConfigurations;
  sourceArn?: string;
}
export const InvokeAgentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionState: S.optional(SessionState),
    agentId: S.String.pipe(T.HttpLabel("agentId")),
    agentAliasId: S.String.pipe(T.HttpLabel("agentAliasId")),
    sessionId: S.String.pipe(T.HttpLabel("sessionId")),
    endSession: S.optional(S.Boolean),
    enableTrace: S.optional(S.Boolean),
    inputText: S.optional(SensitiveString),
    memoryId: S.optional(S.String),
    bedrockModelConfigurations: S.optional(BedrockModelConfigurations),
    streamingConfigurations: S.optional(StreamingConfigurations),
    promptCreationConfigurations: S.optional(PromptCreationConfigurations),
    sourceArn: S.optional(S.String).pipe(T.HttpHeader("x-amz-source-arn")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/agents/{agentId}/agentAliases/{agentAliasId}/sessions/{sessionId}/text",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "InvokeAgentRequest",
}) as any as S.Schema<InvokeAgentRequest>;
export type PartBody = Uint8Array | redacted.Redacted<Uint8Array>;
export interface Span {
  start?: number;
  end?: number;
}
export const Span = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ start: S.optional(S.Number), end: S.optional(S.Number) }),
).annotate({ identifier: "Span" }) as any as S.Schema<Span>;
export interface TextResponsePart {
  text?: string;
  span?: Span;
}
export const TextResponsePart = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ text: S.optional(S.String), span: S.optional(Span) }),
).annotate({
  identifier: "TextResponsePart",
}) as any as S.Schema<TextResponsePart>;
export interface GeneratedResponsePart {
  textResponsePart?: TextResponsePart;
}
export const GeneratedResponsePart = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ textResponsePart: S.optional(TextResponsePart) }),
).annotate({
  identifier: "GeneratedResponsePart",
}) as any as S.Schema<GeneratedResponsePart>;
export type RetrievalResultContentType =
  | "TEXT"
  | "IMAGE"
  | "ROW"
  | "AUDIO"
  | "VIDEO"
  | (string & {});
export const RetrievalResultContentType = S.String;

export interface VideoSegment {
  s3Uri: string;
  summary?: string;
}
export const VideoSegment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Uri: S.String, summary: S.optional(S.String) }),
).annotate({ identifier: "VideoSegment" }) as any as S.Schema<VideoSegment>;
export interface AudioSegment {
  s3Uri: string;
  transcription?: string;
}
export const AudioSegment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Uri: S.String, transcription: S.optional(S.String) }),
).annotate({ identifier: "AudioSegment" }) as any as S.Schema<AudioSegment>;
export type RetrievalResultContentColumnType =
  | "BLOB"
  | "BOOLEAN"
  | "DOUBLE"
  | "NULL"
  | "LONG"
  | "STRING"
  | (string & {});
export const RetrievalResultContentColumnType = S.String;

export interface RetrievalResultContentColumn {
  columnName?: string;
  columnValue?: string;
  type?: RetrievalResultContentColumnType;
}
export const RetrievalResultContentColumn = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    columnName: S.optional(S.String),
    columnValue: S.optional(S.String),
    type: S.optional(RetrievalResultContentColumnType),
  }),
).annotate({
  identifier: "RetrievalResultContentColumn",
}) as any as S.Schema<RetrievalResultContentColumn>;
export type RetrievalResultContentRow = RetrievalResultContentColumn[];
export const RetrievalResultContentRow = /*@__PURE__*/ S.Array(
  RetrievalResultContentColumn,
);
export interface RetrievalResultContent {
  type?: RetrievalResultContentType;
  text?: string;
  byteContent?: string;
  video?: VideoSegment;
  audio?: AudioSegment;
  row?: RetrievalResultContentColumn[];
}
export const RetrievalResultContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(RetrievalResultContentType),
    text: S.optional(S.String),
    byteContent: S.optional(S.String),
    video: S.optional(VideoSegment),
    audio: S.optional(AudioSegment),
    row: S.optional(RetrievalResultContentRow),
  }),
).annotate({
  identifier: "RetrievalResultContent",
}) as any as S.Schema<RetrievalResultContent>;
export type RetrievalResultLocationType =
  | "S3"
  | "WEB"
  | "CONFLUENCE"
  | "SALESFORCE"
  | "SHAREPOINT"
  | "CUSTOM"
  | "KENDRA"
  | "SQL"
  | "ONEDRIVE"
  | "GOOGLEDRIVE"
  | (string & {});
export const RetrievalResultLocationType = S.String;

export interface RetrievalResultS3Location {
  uri?: string;
}
export const RetrievalResultS3Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ uri: S.optional(S.String) }),
).annotate({
  identifier: "RetrievalResultS3Location",
}) as any as S.Schema<RetrievalResultS3Location>;
export interface RetrievalResultWebLocation {
  url?: string;
}
export const RetrievalResultWebLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ url: S.optional(S.String) }),
).annotate({
  identifier: "RetrievalResultWebLocation",
}) as any as S.Schema<RetrievalResultWebLocation>;
export interface RetrievalResultConfluenceLocation {
  url?: string;
}
export const RetrievalResultConfluenceLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ url: S.optional(S.String) }),
).annotate({
  identifier: "RetrievalResultConfluenceLocation",
}) as any as S.Schema<RetrievalResultConfluenceLocation>;
export interface RetrievalResultSalesforceLocation {
  url?: string;
}
export const RetrievalResultSalesforceLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ url: S.optional(S.String) }),
).annotate({
  identifier: "RetrievalResultSalesforceLocation",
}) as any as S.Schema<RetrievalResultSalesforceLocation>;
export interface RetrievalResultSharePointLocation {
  url?: string;
}
export const RetrievalResultSharePointLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ url: S.optional(S.String) }),
).annotate({
  identifier: "RetrievalResultSharePointLocation",
}) as any as S.Schema<RetrievalResultSharePointLocation>;
export interface RetrievalResultCustomDocumentLocation {
  id?: string;
}
export const RetrievalResultCustomDocumentLocation = /*@__PURE__*/ S.suspend(
  () => S.Struct({ id: S.optional(S.String) }),
).annotate({
  identifier: "RetrievalResultCustomDocumentLocation",
}) as any as S.Schema<RetrievalResultCustomDocumentLocation>;
export interface RetrievalResultKendraDocumentLocation {
  uri?: string;
}
export const RetrievalResultKendraDocumentLocation = /*@__PURE__*/ S.suspend(
  () => S.Struct({ uri: S.optional(S.String) }),
).annotate({
  identifier: "RetrievalResultKendraDocumentLocation",
}) as any as S.Schema<RetrievalResultKendraDocumentLocation>;
export interface RetrievalResultSqlLocation {
  query?: string;
}
export const RetrievalResultSqlLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ query: S.optional(S.String) }),
).annotate({
  identifier: "RetrievalResultSqlLocation",
}) as any as S.Schema<RetrievalResultSqlLocation>;
export interface RetrievalResultOneDriveLocation {
  url?: string;
}
export const RetrievalResultOneDriveLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ url: S.optional(S.String) }),
).annotate({
  identifier: "RetrievalResultOneDriveLocation",
}) as any as S.Schema<RetrievalResultOneDriveLocation>;
export interface RetrievalResultGoogleDriveLocation {
  url?: string;
}
export const RetrievalResultGoogleDriveLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ url: S.optional(S.String) }),
).annotate({
  identifier: "RetrievalResultGoogleDriveLocation",
}) as any as S.Schema<RetrievalResultGoogleDriveLocation>;
export interface RetrievalResultLocation {
  type: RetrievalResultLocationType;
  s3Location?: RetrievalResultS3Location;
  webLocation?: RetrievalResultWebLocation;
  confluenceLocation?: RetrievalResultConfluenceLocation;
  salesforceLocation?: RetrievalResultSalesforceLocation;
  sharePointLocation?: RetrievalResultSharePointLocation;
  customDocumentLocation?: RetrievalResultCustomDocumentLocation;
  kendraDocumentLocation?: RetrievalResultKendraDocumentLocation;
  sqlLocation?: RetrievalResultSqlLocation;
  oneDriveLocation?: RetrievalResultOneDriveLocation;
  googleDriveLocation?: RetrievalResultGoogleDriveLocation;
}
export const RetrievalResultLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: RetrievalResultLocationType,
    s3Location: S.optional(RetrievalResultS3Location),
    webLocation: S.optional(RetrievalResultWebLocation),
    confluenceLocation: S.optional(RetrievalResultConfluenceLocation),
    salesforceLocation: S.optional(RetrievalResultSalesforceLocation),
    sharePointLocation: S.optional(RetrievalResultSharePointLocation),
    customDocumentLocation: S.optional(RetrievalResultCustomDocumentLocation),
    kendraDocumentLocation: S.optional(RetrievalResultKendraDocumentLocation),
    sqlLocation: S.optional(RetrievalResultSqlLocation),
    oneDriveLocation: S.optional(RetrievalResultOneDriveLocation),
    googleDriveLocation: S.optional(RetrievalResultGoogleDriveLocation),
  }),
).annotate({
  identifier: "RetrievalResultLocation",
}) as any as S.Schema<RetrievalResultLocation>;
export type RetrievalResultMetadataKey = string;
export type RetrievalResultMetadataValue = unknown;
export type RetrievalResultMetadata = { [key: string]: any | undefined };
export const RetrievalResultMetadata = /*@__PURE__*/ S.Record(
  S.String,
  S.Any.pipe(S.optional),
);
export interface RetrievedReference {
  content?: RetrievalResultContent;
  location?: RetrievalResultLocation;
  metadata?: { [key: string]: any | undefined };
}
export const RetrievedReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    content: S.optional(RetrievalResultContent),
    location: S.optional(RetrievalResultLocation),
    metadata: S.optional(RetrievalResultMetadata),
  }),
).annotate({
  identifier: "RetrievedReference",
}) as any as S.Schema<RetrievedReference>;
export type RetrievedReferences = RetrievedReference[];
export const RetrievedReferences = /*@__PURE__*/ S.Array(RetrievedReference);
export interface Citation {
  generatedResponsePart?: GeneratedResponsePart;
  retrievedReferences?: RetrievedReference[];
}
export const Citation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    generatedResponsePart: S.optional(GeneratedResponsePart),
    retrievedReferences: S.optional(RetrievedReferences),
  }),
).annotate({ identifier: "Citation" }) as any as S.Schema<Citation>;
export type Citations = Citation[];
export const Citations = /*@__PURE__*/ S.Array(Citation);
export interface Attribution {
  citations?: Citation[];
}
export const Attribution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ citations: S.optional(Citations) }),
).annotate({ identifier: "Attribution" }) as any as S.Schema<Attribution>;
export interface PayloadPart {
  bytes?: Uint8Array | redacted.Redacted<Uint8Array>;
  attribution?: Attribution;
}
export const PayloadPart = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bytes: S.optional(SensitiveBlob),
    attribution: S.optional(Attribution),
  }),
).annotate({ identifier: "PayloadPart" }) as any as S.Schema<PayloadPart>;
export type TraceId = string;
export type GuardrailTopicType = "DENY" | (string & {});
export const GuardrailTopicType = S.String;

export type GuardrailTopicPolicyAction = "BLOCKED" | (string & {});
export const GuardrailTopicPolicyAction = S.String;

export interface GuardrailTopic {
  name?: string;
  type?: GuardrailTopicType;
  action?: GuardrailTopicPolicyAction;
}
export const GuardrailTopic = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    type: S.optional(GuardrailTopicType),
    action: S.optional(GuardrailTopicPolicyAction),
  }),
).annotate({ identifier: "GuardrailTopic" }) as any as S.Schema<GuardrailTopic>;
export type GuardrailTopicList = GuardrailTopic[];
export const GuardrailTopicList = /*@__PURE__*/ S.Array(GuardrailTopic);
export interface GuardrailTopicPolicyAssessment {
  topics?: GuardrailTopic[];
}
export const GuardrailTopicPolicyAssessment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ topics: S.optional(GuardrailTopicList) }),
).annotate({
  identifier: "GuardrailTopicPolicyAssessment",
}) as any as S.Schema<GuardrailTopicPolicyAssessment>;
export type GuardrailContentFilterType =
  | "INSULTS"
  | "HATE"
  | "SEXUAL"
  | "VIOLENCE"
  | "MISCONDUCT"
  | "PROMPT_ATTACK"
  | (string & {});
export const GuardrailContentFilterType = S.String;

export type GuardrailContentFilterConfidence =
  | "NONE"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | (string & {});
export const GuardrailContentFilterConfidence = S.String;

export type GuardrailContentPolicyAction = "BLOCKED" | (string & {});
export const GuardrailContentPolicyAction = S.String;

export interface GuardrailContentFilter {
  type?: GuardrailContentFilterType;
  confidence?: GuardrailContentFilterConfidence;
  action?: GuardrailContentPolicyAction;
}
export const GuardrailContentFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(GuardrailContentFilterType),
    confidence: S.optional(GuardrailContentFilterConfidence),
    action: S.optional(GuardrailContentPolicyAction),
  }),
).annotate({
  identifier: "GuardrailContentFilter",
}) as any as S.Schema<GuardrailContentFilter>;
export type GuardrailContentFilterList = GuardrailContentFilter[];
export const GuardrailContentFilterList = /*@__PURE__*/ S.Array(
  GuardrailContentFilter,
);
export interface GuardrailContentPolicyAssessment {
  filters?: GuardrailContentFilter[];
}
export const GuardrailContentPolicyAssessment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ filters: S.optional(GuardrailContentFilterList) }),
).annotate({
  identifier: "GuardrailContentPolicyAssessment",
}) as any as S.Schema<GuardrailContentPolicyAssessment>;
export type GuardrailWordPolicyAction = "BLOCKED" | (string & {});
export const GuardrailWordPolicyAction = S.String;

export interface GuardrailCustomWord {
  match?: string;
  action?: GuardrailWordPolicyAction;
}
export const GuardrailCustomWord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    match: S.optional(S.String),
    action: S.optional(GuardrailWordPolicyAction),
  }),
).annotate({
  identifier: "GuardrailCustomWord",
}) as any as S.Schema<GuardrailCustomWord>;
export type GuardrailCustomWordList = GuardrailCustomWord[];
export const GuardrailCustomWordList =
  /*@__PURE__*/ S.Array(GuardrailCustomWord);
export type GuardrailManagedWordType = "PROFANITY" | (string & {});
export const GuardrailManagedWordType = S.String;

export interface GuardrailManagedWord {
  match?: string;
  type?: GuardrailManagedWordType;
  action?: GuardrailWordPolicyAction;
}
export const GuardrailManagedWord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    match: S.optional(S.String),
    type: S.optional(GuardrailManagedWordType),
    action: S.optional(GuardrailWordPolicyAction),
  }),
).annotate({
  identifier: "GuardrailManagedWord",
}) as any as S.Schema<GuardrailManagedWord>;
export type GuardrailManagedWordList = GuardrailManagedWord[];
export const GuardrailManagedWordList =
  /*@__PURE__*/ S.Array(GuardrailManagedWord);
export interface GuardrailWordPolicyAssessment {
  customWords?: GuardrailCustomWord[];
  managedWordLists?: GuardrailManagedWord[];
}
export const GuardrailWordPolicyAssessment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    customWords: S.optional(GuardrailCustomWordList),
    managedWordLists: S.optional(GuardrailManagedWordList),
  }),
).annotate({
  identifier: "GuardrailWordPolicyAssessment",
}) as any as S.Schema<GuardrailWordPolicyAssessment>;
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
export const GuardrailPiiEntityType = S.String;

export type GuardrailSensitiveInformationPolicyAction =
  | "BLOCKED"
  | "ANONYMIZED"
  | (string & {});
export const GuardrailSensitiveInformationPolicyAction = S.String;

export interface GuardrailPiiEntityFilter {
  type?: GuardrailPiiEntityType;
  match?: string;
  action?: GuardrailSensitiveInformationPolicyAction;
}
export const GuardrailPiiEntityFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(GuardrailPiiEntityType),
    match: S.optional(S.String),
    action: S.optional(GuardrailSensitiveInformationPolicyAction),
  }),
).annotate({
  identifier: "GuardrailPiiEntityFilter",
}) as any as S.Schema<GuardrailPiiEntityFilter>;
export type GuardrailPiiEntityFilterList = GuardrailPiiEntityFilter[];
export const GuardrailPiiEntityFilterList = /*@__PURE__*/ S.Array(
  GuardrailPiiEntityFilter,
);
export interface GuardrailRegexFilter {
  name?: string;
  regex?: string;
  match?: string;
  action?: GuardrailSensitiveInformationPolicyAction;
}
export const GuardrailRegexFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    regex: S.optional(S.String),
    match: S.optional(S.String),
    action: S.optional(GuardrailSensitiveInformationPolicyAction),
  }),
).annotate({
  identifier: "GuardrailRegexFilter",
}) as any as S.Schema<GuardrailRegexFilter>;
export type GuardrailRegexFilterList = GuardrailRegexFilter[];
export const GuardrailRegexFilterList =
  /*@__PURE__*/ S.Array(GuardrailRegexFilter);
export interface GuardrailSensitiveInformationPolicyAssessment {
  piiEntities?: GuardrailPiiEntityFilter[];
  regexes?: GuardrailRegexFilter[];
}
export const GuardrailSensitiveInformationPolicyAssessment =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      piiEntities: S.optional(GuardrailPiiEntityFilterList),
      regexes: S.optional(GuardrailRegexFilterList),
    }),
  ).annotate({
    identifier: "GuardrailSensitiveInformationPolicyAssessment",
  }) as any as S.Schema<GuardrailSensitiveInformationPolicyAssessment>;
export interface GuardrailAssessment {
  topicPolicy?: GuardrailTopicPolicyAssessment;
  contentPolicy?: GuardrailContentPolicyAssessment;
  wordPolicy?: GuardrailWordPolicyAssessment;
  sensitiveInformationPolicy?: GuardrailSensitiveInformationPolicyAssessment;
}
export const GuardrailAssessment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    topicPolicy: S.optional(GuardrailTopicPolicyAssessment),
    contentPolicy: S.optional(GuardrailContentPolicyAssessment),
    wordPolicy: S.optional(GuardrailWordPolicyAssessment),
    sensitiveInformationPolicy: S.optional(
      GuardrailSensitiveInformationPolicyAssessment,
    ),
  }),
).annotate({
  identifier: "GuardrailAssessment",
}) as any as S.Schema<GuardrailAssessment>;
export type GuardrailAssessmentList = GuardrailAssessment[];
export const GuardrailAssessmentList =
  /*@__PURE__*/ S.Array(GuardrailAssessment);
export interface Usage {
  inputTokens?: number;
  outputTokens?: number;
}
export const Usage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inputTokens: S.optional(S.Number),
    outputTokens: S.optional(S.Number),
  }),
).annotate({ identifier: "Usage" }) as any as S.Schema<Usage>;
export interface Metadata {
  startTime?: Date;
  endTime?: Date;
  totalTimeMs?: number;
  operationTotalTimeMs?: number;
  clientRequestId?: string;
  usage?: Usage;
}
export const Metadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    totalTimeMs: S.optional(S.Number),
    operationTotalTimeMs: S.optional(S.Number),
    clientRequestId: S.optional(S.String),
    usage: S.optional(Usage),
  }),
).annotate({ identifier: "Metadata" }) as any as S.Schema<Metadata>;
export interface GuardrailTrace {
  action?: GuardrailAction;
  traceId?: string;
  inputAssessments?: GuardrailAssessment[];
  outputAssessments?: GuardrailAssessment[];
  metadata?: Metadata;
}
export const GuardrailTrace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: S.optional(GuardrailAction),
    traceId: S.optional(S.String),
    inputAssessments: S.optional(GuardrailAssessmentList),
    outputAssessments: S.optional(GuardrailAssessmentList),
    metadata: S.optional(Metadata),
  }),
).annotate({ identifier: "GuardrailTrace" }) as any as S.Schema<GuardrailTrace>;
export type PromptText = string | redacted.Redacted<string>;
export type PromptType =
  | "PRE_PROCESSING"
  | "ORCHESTRATION"
  | "KNOWLEDGE_BASE_RESPONSE_GENERATION"
  | "POST_PROCESSING"
  | "ROUTING_CLASSIFIER"
  | (string & {});
export const PromptType = S.String;

export type LambdaArn = string;
export type CreationMode = "DEFAULT" | "OVERRIDDEN" | (string & {});
export const CreationMode = S.String;

export type Temperature = number;
export type TopP = number;
export type TopK = number;
export type MaximumLength = number;
export type StopSequences = string[];
export const StopSequences = /*@__PURE__*/ S.Array(S.String);
export interface InferenceConfiguration {
  temperature?: number;
  topP?: number;
  topK?: number;
  maximumLength?: number;
  stopSequences?: string[];
}
export const InferenceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    temperature: S.optional(S.Number),
    topP: S.optional(S.Number),
    topK: S.optional(S.Number),
    maximumLength: S.optional(S.Number),
    stopSequences: S.optional(StopSequences),
  }),
).annotate({
  identifier: "InferenceConfiguration",
}) as any as S.Schema<InferenceConfiguration>;
export type ModelIdentifier = string;
export interface ModelInvocationInput {
  traceId?: string;
  text?: string | redacted.Redacted<string>;
  type?: PromptType;
  overrideLambda?: string;
  promptCreationMode?: CreationMode;
  inferenceConfiguration?: InferenceConfiguration;
  parserMode?: CreationMode;
  foundationModel?: string;
}
export const ModelInvocationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    traceId: S.optional(S.String),
    text: S.optional(SensitiveString),
    type: S.optional(PromptType),
    overrideLambda: S.optional(S.String),
    promptCreationMode: S.optional(CreationMode),
    inferenceConfiguration: S.optional(InferenceConfiguration),
    parserMode: S.optional(CreationMode),
    foundationModel: S.optional(S.String),
  }),
).annotate({
  identifier: "ModelInvocationInput",
}) as any as S.Schema<ModelInvocationInput>;
export type RationaleString = string | redacted.Redacted<string>;
export interface PreProcessingParsedResponse {
  rationale?: string | redacted.Redacted<string>;
  isValid?: boolean;
}
export const PreProcessingParsedResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    rationale: S.optional(SensitiveString),
    isValid: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "PreProcessingParsedResponse",
}) as any as S.Schema<PreProcessingParsedResponse>;
export interface RawResponse {
  content?: string;
}
export const RawResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ content: S.optional(S.String) }),
).annotate({ identifier: "RawResponse" }) as any as S.Schema<RawResponse>;
export interface ReasoningTextBlock {
  text: string;
  signature?: string;
}
export const ReasoningTextBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ text: S.String, signature: S.optional(S.String) }),
).annotate({
  identifier: "ReasoningTextBlock",
}) as any as S.Schema<ReasoningTextBlock>;
export type ReasoningContentBlock =
  | { reasoningText: ReasoningTextBlock; redactedContent?: never }
  | { reasoningText?: never; redactedContent: Uint8Array };
export const ReasoningContentBlock = /*@__PURE__*/ S.Union([
  S.Struct({ reasoningText: ReasoningTextBlock }),
  S.Struct({ redactedContent: T.Blob }),
]);
export interface PreProcessingModelInvocationOutput {
  traceId?: string;
  parsedResponse?: PreProcessingParsedResponse;
  rawResponse?: RawResponse;
  metadata?: Metadata;
  reasoningContent?: ReasoningContentBlock;
}
export const PreProcessingModelInvocationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    traceId: S.optional(S.String),
    parsedResponse: S.optional(PreProcessingParsedResponse),
    rawResponse: S.optional(RawResponse),
    metadata: S.optional(Metadata),
    reasoningContent: S.optional(ReasoningContentBlock),
  }),
).annotate({
  identifier: "PreProcessingModelInvocationOutput",
}) as any as S.Schema<PreProcessingModelInvocationOutput>;
export type PreProcessingTrace =
  | {
      modelInvocationInput: ModelInvocationInput;
      modelInvocationOutput?: never;
    }
  | {
      modelInvocationInput?: never;
      modelInvocationOutput: PreProcessingModelInvocationOutput;
    };
export const PreProcessingTrace = /*@__PURE__*/ S.Union([
  S.Struct({ modelInvocationInput: ModelInvocationInput }),
  S.Struct({ modelInvocationOutput: PreProcessingModelInvocationOutput }),
]);
export interface Rationale {
  traceId?: string;
  text?: string | redacted.Redacted<string>;
}
export const Rationale = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    traceId: S.optional(S.String),
    text: S.optional(SensitiveString),
  }),
).annotate({ identifier: "Rationale" }) as any as S.Schema<Rationale>;
export type InvocationType =
  | "ACTION_GROUP"
  | "KNOWLEDGE_BASE"
  | "FINISH"
  | "ACTION_GROUP_CODE_INTERPRETER"
  | "AGENT_COLLABORATOR"
  | (string & {});
export const InvocationType = S.String;

export type ActionGroupName = string | redacted.Redacted<string>;
export type Verb = string | redacted.Redacted<string>;
export interface Parameter {
  name?: string;
  type?: string;
  value?: string;
}
export const Parameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    type: S.optional(S.String),
    value: S.optional(S.String),
  }),
).annotate({ identifier: "Parameter" }) as any as S.Schema<Parameter>;
export type Parameters = Parameter[];
export const Parameters = /*@__PURE__*/ S.Array(Parameter);
export type ContentMap = { [key: string]: Parameter[] | undefined };
export const ContentMap = /*@__PURE__*/ S.Record(
  S.String,
  Parameters.pipe(S.optional),
);
export interface RequestBody {
  content?: { [key: string]: Parameter[] | undefined };
}
export const RequestBody = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ content: S.optional(ContentMap) }),
).annotate({ identifier: "RequestBody" }) as any as S.Schema<RequestBody>;
export type ExecutionType = "LAMBDA" | "RETURN_CONTROL" | (string & {});
export const ExecutionType = S.String;

export interface ActionGroupInvocationInput {
  actionGroupName?: string | redacted.Redacted<string>;
  verb?: string | redacted.Redacted<string>;
  apiPath?: string | redacted.Redacted<string>;
  parameters?: Parameter[];
  requestBody?: RequestBody;
  function?: string | redacted.Redacted<string>;
  executionType?: ExecutionType;
  invocationId?: string;
}
export const ActionGroupInvocationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionGroupName: S.optional(SensitiveString),
    verb: S.optional(SensitiveString),
    apiPath: S.optional(SensitiveString),
    parameters: S.optional(Parameters),
    requestBody: S.optional(RequestBody),
    function: S.optional(SensitiveString),
    executionType: S.optional(ExecutionType),
    invocationId: S.optional(S.String),
  }),
).annotate({
  identifier: "ActionGroupInvocationInput",
}) as any as S.Schema<ActionGroupInvocationInput>;
export type KnowledgeBaseLookupInputString = string | redacted.Redacted<string>;
export type TraceKnowledgeBaseId = string | redacted.Redacted<string>;
export interface KnowledgeBaseLookupInput {
  text?: string | redacted.Redacted<string>;
  knowledgeBaseId?: string | redacted.Redacted<string>;
}
export const KnowledgeBaseLookupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    text: S.optional(SensitiveString),
    knowledgeBaseId: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "KnowledgeBaseLookupInput",
}) as any as S.Schema<KnowledgeBaseLookupInput>;
export type Files = string[];
export const Files = /*@__PURE__*/ S.Array(S.String);
export interface CodeInterpreterInvocationInput {
  code?: string;
  files?: string[];
}
export const CodeInterpreterInvocationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ code: S.optional(S.String), files: S.optional(Files) }),
).annotate({
  identifier: "CodeInterpreterInvocationInput",
}) as any as S.Schema<CodeInterpreterInvocationInput>;
export type AgentAliasArn = string;
export type PayloadType = "TEXT" | "RETURN_CONTROL" | (string & {});
export const PayloadType = S.String;

export type AgentCollaboratorPayloadString = string | redacted.Redacted<string>;
export interface ReturnControlResults {
  invocationId?: string;
  returnControlInvocationResults?: InvocationResultMember[];
}
export const ReturnControlResults = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    invocationId: S.optional(S.String),
    returnControlInvocationResults: S.optional(ReturnControlInvocationResults),
  }),
).annotate({
  identifier: "ReturnControlResults",
}) as any as S.Schema<ReturnControlResults>;
export interface AgentCollaboratorInputPayload {
  type?: PayloadType;
  text?: string | redacted.Redacted<string>;
  returnControlResults?: ReturnControlResults;
}
export const AgentCollaboratorInputPayload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(PayloadType),
    text: S.optional(SensitiveString),
    returnControlResults: S.optional(ReturnControlResults),
  }),
).annotate({
  identifier: "AgentCollaboratorInputPayload",
}) as any as S.Schema<AgentCollaboratorInputPayload>;
export interface AgentCollaboratorInvocationInput {
  agentCollaboratorName?: string;
  agentCollaboratorAliasArn?: string;
  input?: AgentCollaboratorInputPayload;
}
export const AgentCollaboratorInvocationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentCollaboratorName: S.optional(S.String),
    agentCollaboratorAliasArn: S.optional(S.String),
    input: S.optional(AgentCollaboratorInputPayload),
  }),
).annotate({
  identifier: "AgentCollaboratorInvocationInput",
}) as any as S.Schema<AgentCollaboratorInvocationInput>;
export interface InvocationInput {
  traceId?: string;
  invocationType?: InvocationType;
  actionGroupInvocationInput?: ActionGroupInvocationInput;
  knowledgeBaseLookupInput?: KnowledgeBaseLookupInput;
  codeInterpreterInvocationInput?: CodeInterpreterInvocationInput;
  agentCollaboratorInvocationInput?: AgentCollaboratorInvocationInput;
}
export const InvocationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    traceId: S.optional(S.String),
    invocationType: S.optional(InvocationType),
    actionGroupInvocationInput: S.optional(ActionGroupInvocationInput),
    knowledgeBaseLookupInput: S.optional(KnowledgeBaseLookupInput),
    codeInterpreterInvocationInput: S.optional(CodeInterpreterInvocationInput),
    agentCollaboratorInvocationInput: S.optional(
      AgentCollaboratorInvocationInput,
    ),
  }),
).annotate({
  identifier: "InvocationInput",
}) as any as S.Schema<InvocationInput>;
export type Type =
  | "ACTION_GROUP"
  | "AGENT_COLLABORATOR"
  | "KNOWLEDGE_BASE"
  | "FINISH"
  | "ASK_USER"
  | "REPROMPT"
  | (string & {});
export const Type = S.String;

export type ActionGroupOutputString = string | redacted.Redacted<string>;
export interface ActionGroupInvocationOutput {
  text?: string | redacted.Redacted<string>;
  metadata?: Metadata;
}
export const ActionGroupInvocationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    text: S.optional(SensitiveString),
    metadata: S.optional(Metadata),
  }),
).annotate({
  identifier: "ActionGroupInvocationOutput",
}) as any as S.Schema<ActionGroupInvocationOutput>;
export interface ApiParameter {
  name?: string;
  type?: string;
  value?: string;
}
export const ApiParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    type: S.optional(S.String),
    value: S.optional(S.String),
  }),
).annotate({ identifier: "ApiParameter" }) as any as S.Schema<ApiParameter>;
export type ApiParameters = ApiParameter[];
export const ApiParameters = /*@__PURE__*/ S.Array(ApiParameter);
export type ParameterList = Parameter[];
export const ParameterList = /*@__PURE__*/ S.Array(Parameter);
export interface PropertyParameters {
  properties?: Parameter[];
}
export const PropertyParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ properties: S.optional(ParameterList) }),
).annotate({
  identifier: "PropertyParameters",
}) as any as S.Schema<PropertyParameters>;
export type ApiContentMap = { [key: string]: PropertyParameters | undefined };
export const ApiContentMap = /*@__PURE__*/ S.Record(
  S.String,
  PropertyParameters.pipe(S.optional),
);
export interface ApiRequestBody {
  content?: { [key: string]: PropertyParameters | undefined };
}
export const ApiRequestBody = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ content: S.optional(ApiContentMap) }),
).annotate({ identifier: "ApiRequestBody" }) as any as S.Schema<ApiRequestBody>;
export type ActionInvocationType =
  | "RESULT"
  | "USER_CONFIRMATION"
  | "USER_CONFIRMATION_AND_RESULT"
  | (string & {});
export const ActionInvocationType = S.String;

export type Name = string | redacted.Redacted<string>;
export interface ApiInvocationInput {
  actionGroup: string;
  httpMethod?: string;
  apiPath?: string | redacted.Redacted<string>;
  parameters?: ApiParameter[];
  requestBody?: ApiRequestBody;
  actionInvocationType?: ActionInvocationType;
  agentId?: string;
  collaboratorName?: string | redacted.Redacted<string>;
}
export const ApiInvocationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionGroup: S.String,
    httpMethod: S.optional(S.String),
    apiPath: S.optional(SensitiveString),
    parameters: S.optional(ApiParameters),
    requestBody: S.optional(ApiRequestBody),
    actionInvocationType: S.optional(ActionInvocationType),
    agentId: S.optional(S.String),
    collaboratorName: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ApiInvocationInput",
}) as any as S.Schema<ApiInvocationInput>;
export interface FunctionParameter {
  name?: string;
  type?: string;
  value?: string;
}
export const FunctionParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    type: S.optional(S.String),
    value: S.optional(S.String),
  }),
).annotate({
  identifier: "FunctionParameter",
}) as any as S.Schema<FunctionParameter>;
export type FunctionParameters = FunctionParameter[];
export const FunctionParameters = /*@__PURE__*/ S.Array(FunctionParameter);
export interface FunctionInvocationInput {
  actionGroup: string;
  parameters?: FunctionParameter[];
  function?: string;
  actionInvocationType?: ActionInvocationType;
  agentId?: string;
  collaboratorName?: string | redacted.Redacted<string>;
}
export const FunctionInvocationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionGroup: S.String,
    parameters: S.optional(FunctionParameters),
    function: S.optional(S.String),
    actionInvocationType: S.optional(ActionInvocationType),
    agentId: S.optional(S.String),
    collaboratorName: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "FunctionInvocationInput",
}) as any as S.Schema<FunctionInvocationInput>;
export type InvocationInputMember =
  | { apiInvocationInput: ApiInvocationInput; functionInvocationInput?: never }
  | {
      apiInvocationInput?: never;
      functionInvocationInput: FunctionInvocationInput;
    };
export const InvocationInputMember = /*@__PURE__*/ S.Union([
  S.Struct({ apiInvocationInput: ApiInvocationInput }),
  S.Struct({ functionInvocationInput: FunctionInvocationInput }),
]);
export type InvocationInputs = InvocationInputMember[];
export const InvocationInputs = /*@__PURE__*/ S.Array(InvocationInputMember);
export interface ReturnControlPayload {
  invocationInputs?: InvocationInputMember[];
  invocationId?: string;
}
export const ReturnControlPayload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    invocationInputs: S.optional(InvocationInputs),
    invocationId: S.optional(S.String),
  }),
).annotate({
  identifier: "ReturnControlPayload",
}) as any as S.Schema<ReturnControlPayload>;
export interface AgentCollaboratorOutputPayload {
  type?: PayloadType;
  text?: string | redacted.Redacted<string>;
  returnControlPayload?: ReturnControlPayload;
}
export const AgentCollaboratorOutputPayload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(PayloadType),
    text: S.optional(SensitiveString),
    returnControlPayload: S.optional(ReturnControlPayload),
  }),
).annotate({
  identifier: "AgentCollaboratorOutputPayload",
}) as any as S.Schema<AgentCollaboratorOutputPayload>;
export interface AgentCollaboratorInvocationOutput {
  agentCollaboratorName?: string;
  agentCollaboratorAliasArn?: string;
  output?: AgentCollaboratorOutputPayload;
  metadata?: Metadata;
}
export const AgentCollaboratorInvocationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentCollaboratorName: S.optional(S.String),
    agentCollaboratorAliasArn: S.optional(S.String),
    output: S.optional(AgentCollaboratorOutputPayload),
    metadata: S.optional(Metadata),
  }),
).annotate({
  identifier: "AgentCollaboratorInvocationOutput",
}) as any as S.Schema<AgentCollaboratorInvocationOutput>;
export interface KnowledgeBaseLookupOutput {
  retrievedReferences?: RetrievedReference[];
  metadata?: Metadata;
}
export const KnowledgeBaseLookupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    retrievedReferences: S.optional(RetrievedReferences),
    metadata: S.optional(Metadata),
  }),
).annotate({
  identifier: "KnowledgeBaseLookupOutput",
}) as any as S.Schema<KnowledgeBaseLookupOutput>;
export type FinalResponseString = string | redacted.Redacted<string>;
export interface FinalResponse {
  text?: string | redacted.Redacted<string>;
  metadata?: Metadata;
}
export const FinalResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    text: S.optional(SensitiveString),
    metadata: S.optional(Metadata),
  }),
).annotate({ identifier: "FinalResponse" }) as any as S.Schema<FinalResponse>;
export type Source =
  | "ACTION_GROUP"
  | "KNOWLEDGE_BASE"
  | "PARSER"
  | (string & {});
export const Source = S.String;

export interface RepromptResponse {
  text?: string;
  source?: Source;
}
export const RepromptResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ text: S.optional(S.String), source: S.optional(Source) }),
).annotate({
  identifier: "RepromptResponse",
}) as any as S.Schema<RepromptResponse>;
export interface CodeInterpreterInvocationOutput {
  executionOutput?: string;
  executionError?: string;
  files?: string[];
  executionTimeout?: boolean;
  metadata?: Metadata;
}
export const CodeInterpreterInvocationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionOutput: S.optional(S.String),
    executionError: S.optional(S.String),
    files: S.optional(Files),
    executionTimeout: S.optional(S.Boolean),
    metadata: S.optional(Metadata),
  }),
).annotate({
  identifier: "CodeInterpreterInvocationOutput",
}) as any as S.Schema<CodeInterpreterInvocationOutput>;
export interface Observation {
  traceId?: string;
  type?: Type;
  actionGroupInvocationOutput?: ActionGroupInvocationOutput;
  agentCollaboratorInvocationOutput?: AgentCollaboratorInvocationOutput;
  knowledgeBaseLookupOutput?: KnowledgeBaseLookupOutput;
  finalResponse?: FinalResponse;
  repromptResponse?: RepromptResponse;
  codeInterpreterInvocationOutput?: CodeInterpreterInvocationOutput;
}
export const Observation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    traceId: S.optional(S.String),
    type: S.optional(Type),
    actionGroupInvocationOutput: S.optional(ActionGroupInvocationOutput),
    agentCollaboratorInvocationOutput: S.optional(
      AgentCollaboratorInvocationOutput,
    ),
    knowledgeBaseLookupOutput: S.optional(KnowledgeBaseLookupOutput),
    finalResponse: S.optional(FinalResponse),
    repromptResponse: S.optional(RepromptResponse),
    codeInterpreterInvocationOutput: S.optional(
      CodeInterpreterInvocationOutput,
    ),
  }),
).annotate({ identifier: "Observation" }) as any as S.Schema<Observation>;
export interface OrchestrationModelInvocationOutput {
  traceId?: string;
  rawResponse?: RawResponse;
  metadata?: Metadata;
  reasoningContent?: ReasoningContentBlock;
}
export const OrchestrationModelInvocationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    traceId: S.optional(S.String),
    rawResponse: S.optional(RawResponse),
    metadata: S.optional(Metadata),
    reasoningContent: S.optional(ReasoningContentBlock),
  }),
).annotate({
  identifier: "OrchestrationModelInvocationOutput",
}) as any as S.Schema<OrchestrationModelInvocationOutput>;
export type OrchestrationTrace =
  | {
      rationale: Rationale;
      invocationInput?: never;
      observation?: never;
      modelInvocationInput?: never;
      modelInvocationOutput?: never;
    }
  | {
      rationale?: never;
      invocationInput: InvocationInput;
      observation?: never;
      modelInvocationInput?: never;
      modelInvocationOutput?: never;
    }
  | {
      rationale?: never;
      invocationInput?: never;
      observation: Observation;
      modelInvocationInput?: never;
      modelInvocationOutput?: never;
    }
  | {
      rationale?: never;
      invocationInput?: never;
      observation?: never;
      modelInvocationInput: ModelInvocationInput;
      modelInvocationOutput?: never;
    }
  | {
      rationale?: never;
      invocationInput?: never;
      observation?: never;
      modelInvocationInput?: never;
      modelInvocationOutput: OrchestrationModelInvocationOutput;
    };
export const OrchestrationTrace = /*@__PURE__*/ S.Union([
  S.Struct({ rationale: Rationale }),
  S.Struct({ invocationInput: InvocationInput }),
  S.Struct({ observation: Observation }),
  S.Struct({ modelInvocationInput: ModelInvocationInput }),
  S.Struct({ modelInvocationOutput: OrchestrationModelInvocationOutput }),
]);
export type OutputString = string | redacted.Redacted<string>;
export interface PostProcessingParsedResponse {
  text?: string | redacted.Redacted<string>;
}
export const PostProcessingParsedResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ text: S.optional(SensitiveString) }),
).annotate({
  identifier: "PostProcessingParsedResponse",
}) as any as S.Schema<PostProcessingParsedResponse>;
export interface PostProcessingModelInvocationOutput {
  traceId?: string;
  parsedResponse?: PostProcessingParsedResponse;
  rawResponse?: RawResponse;
  metadata?: Metadata;
  reasoningContent?: ReasoningContentBlock;
}
export const PostProcessingModelInvocationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    traceId: S.optional(S.String),
    parsedResponse: S.optional(PostProcessingParsedResponse),
    rawResponse: S.optional(RawResponse),
    metadata: S.optional(Metadata),
    reasoningContent: S.optional(ReasoningContentBlock),
  }),
).annotate({
  identifier: "PostProcessingModelInvocationOutput",
}) as any as S.Schema<PostProcessingModelInvocationOutput>;
export type PostProcessingTrace =
  | {
      modelInvocationInput: ModelInvocationInput;
      modelInvocationOutput?: never;
    }
  | {
      modelInvocationInput?: never;
      modelInvocationOutput: PostProcessingModelInvocationOutput;
    };
export const PostProcessingTrace = /*@__PURE__*/ S.Union([
  S.Struct({ modelInvocationInput: ModelInvocationInput }),
  S.Struct({ modelInvocationOutput: PostProcessingModelInvocationOutput }),
]);
export interface RoutingClassifierModelInvocationOutput {
  traceId?: string;
  rawResponse?: RawResponse;
  metadata?: Metadata;
}
export const RoutingClassifierModelInvocationOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      traceId: S.optional(S.String),
      rawResponse: S.optional(RawResponse),
      metadata: S.optional(Metadata),
    }),
).annotate({
  identifier: "RoutingClassifierModelInvocationOutput",
}) as any as S.Schema<RoutingClassifierModelInvocationOutput>;
export type RoutingClassifierTrace =
  | {
      invocationInput: InvocationInput;
      observation?: never;
      modelInvocationInput?: never;
      modelInvocationOutput?: never;
    }
  | {
      invocationInput?: never;
      observation: Observation;
      modelInvocationInput?: never;
      modelInvocationOutput?: never;
    }
  | {
      invocationInput?: never;
      observation?: never;
      modelInvocationInput: ModelInvocationInput;
      modelInvocationOutput?: never;
    }
  | {
      invocationInput?: never;
      observation?: never;
      modelInvocationInput?: never;
      modelInvocationOutput: RoutingClassifierModelInvocationOutput;
    };
export const RoutingClassifierTrace = /*@__PURE__*/ S.Union([
  S.Struct({ invocationInput: InvocationInput }),
  S.Struct({ observation: Observation }),
  S.Struct({ modelInvocationInput: ModelInvocationInput }),
  S.Struct({ modelInvocationOutput: RoutingClassifierModelInvocationOutput }),
]);
export type FailureReasonString = string | redacted.Redacted<string>;
export interface FailureTrace {
  traceId?: string;
  failureReason?: string | redacted.Redacted<string>;
  failureCode?: number;
  metadata?: Metadata;
}
export const FailureTrace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    traceId: S.optional(S.String),
    failureReason: S.optional(SensitiveString),
    failureCode: S.optional(S.Number),
    metadata: S.optional(Metadata),
  }),
).annotate({ identifier: "FailureTrace" }) as any as S.Schema<FailureTrace>;
export interface CustomOrchestrationTraceEvent {
  text?: string;
}
export const CustomOrchestrationTraceEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ text: S.optional(S.String) }),
).annotate({
  identifier: "CustomOrchestrationTraceEvent",
}) as any as S.Schema<CustomOrchestrationTraceEvent>;
export interface CustomOrchestrationTrace {
  traceId?: string;
  event?: CustomOrchestrationTraceEvent;
}
export const CustomOrchestrationTrace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    traceId: S.optional(S.String),
    event: S.optional(CustomOrchestrationTraceEvent),
  }),
).annotate({
  identifier: "CustomOrchestrationTrace",
}) as any as S.Schema<CustomOrchestrationTrace>;
export type Trace =
  | {
      guardrailTrace: GuardrailTrace;
      preProcessingTrace?: never;
      orchestrationTrace?: never;
      postProcessingTrace?: never;
      routingClassifierTrace?: never;
      failureTrace?: never;
      customOrchestrationTrace?: never;
    }
  | {
      guardrailTrace?: never;
      preProcessingTrace: PreProcessingTrace;
      orchestrationTrace?: never;
      postProcessingTrace?: never;
      routingClassifierTrace?: never;
      failureTrace?: never;
      customOrchestrationTrace?: never;
    }
  | {
      guardrailTrace?: never;
      preProcessingTrace?: never;
      orchestrationTrace: OrchestrationTrace;
      postProcessingTrace?: never;
      routingClassifierTrace?: never;
      failureTrace?: never;
      customOrchestrationTrace?: never;
    }
  | {
      guardrailTrace?: never;
      preProcessingTrace?: never;
      orchestrationTrace?: never;
      postProcessingTrace: PostProcessingTrace;
      routingClassifierTrace?: never;
      failureTrace?: never;
      customOrchestrationTrace?: never;
    }
  | {
      guardrailTrace?: never;
      preProcessingTrace?: never;
      orchestrationTrace?: never;
      postProcessingTrace?: never;
      routingClassifierTrace: RoutingClassifierTrace;
      failureTrace?: never;
      customOrchestrationTrace?: never;
    }
  | {
      guardrailTrace?: never;
      preProcessingTrace?: never;
      orchestrationTrace?: never;
      postProcessingTrace?: never;
      routingClassifierTrace?: never;
      failureTrace: FailureTrace;
      customOrchestrationTrace?: never;
    }
  | {
      guardrailTrace?: never;
      preProcessingTrace?: never;
      orchestrationTrace?: never;
      postProcessingTrace?: never;
      routingClassifierTrace?: never;
      failureTrace?: never;
      customOrchestrationTrace: CustomOrchestrationTrace;
    };
export const Trace = /*@__PURE__*/ S.Union([
  S.Struct({ guardrailTrace: GuardrailTrace }),
  S.Struct({ preProcessingTrace: PreProcessingTrace }),
  S.Struct({ orchestrationTrace: OrchestrationTrace }),
  S.Struct({ postProcessingTrace: PostProcessingTrace }),
  S.Struct({ routingClassifierTrace: RoutingClassifierTrace }),
  S.Struct({ failureTrace: FailureTrace }),
  S.Struct({ customOrchestrationTrace: CustomOrchestrationTrace }),
]);
export type Caller = { agentAliasArn: string };
export const Caller = /*@__PURE__*/ S.Union([
  S.Struct({ agentAliasArn: S.String }),
]);
export type CallerChain = Caller[];
export const CallerChain = /*@__PURE__*/ S.Array(Caller);
export type AgentVersion = string;
export interface TracePart {
  sessionId?: string;
  trace?: Trace;
  callerChain?: Caller[];
  eventTime?: Date;
  collaboratorName?: string | redacted.Redacted<string>;
  agentId?: string;
  agentAliasId?: string;
  agentVersion?: string;
}
export const TracePart = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.optional(S.String),
    trace: S.optional(Trace),
    callerChain: S.optional(CallerChain),
    eventTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    collaboratorName: S.optional(SensitiveString),
    agentId: S.optional(S.String),
    agentAliasId: S.optional(S.String),
    agentVersion: S.optional(S.String),
  }),
).annotate({ identifier: "TracePart" }) as any as S.Schema<TracePart>;
export type FileBody = Uint8Array | redacted.Redacted<Uint8Array>;
export interface OutputFile {
  name?: string;
  type?: string;
  bytes?: Uint8Array | redacted.Redacted<Uint8Array>;
}
export const OutputFile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    type: S.optional(S.String),
    bytes: S.optional(SensitiveBlob),
  }),
).annotate({ identifier: "OutputFile" }) as any as S.Schema<OutputFile>;
export type OutputFiles = OutputFile[];
export const OutputFiles = /*@__PURE__*/ S.Array(OutputFile);
export interface FilePart {
  files?: OutputFile[];
}
export const FilePart = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ files: S.optional(OutputFiles) }),
).annotate({ identifier: "FilePart" }) as any as S.Schema<FilePart>;
export type ResponseStream =
  | {
      chunk: PayloadPart;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      modelNotReadyException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace: TracePart;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      modelNotReadyException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl: ReturnControlPayload;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      modelNotReadyException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException: InternalServerException;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      modelNotReadyException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException: ValidationException;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      modelNotReadyException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException: ResourceNotFoundException;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      modelNotReadyException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException: ServiceQuotaExceededException;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      modelNotReadyException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException: ThrottlingException;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      modelNotReadyException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException: AccessDeniedException;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      modelNotReadyException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException: ConflictException;
      dependencyFailedException?: never;
      badGatewayException?: never;
      modelNotReadyException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException: DependencyFailedException;
      badGatewayException?: never;
      modelNotReadyException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException: BadGatewayException;
      modelNotReadyException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      modelNotReadyException: ModelNotReadyException;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      modelNotReadyException?: never;
      files: FilePart;
    };
export const ResponseStream = /*@__PURE__*/ T.EventStream(
  S.Union([
    S.Struct({ chunk: PayloadPart }),
    S.Struct({ trace: TracePart }),
    S.Struct({ returnControl: ReturnControlPayload }),
    S.Struct({
      internalServerException: S.suspend(
        () => InternalServerException,
      ).annotate({ identifier: "InternalServerException" }),
    }),
    S.Struct({
      validationException: S.suspend(() => ValidationException).annotate({
        identifier: "ValidationException",
      }),
    }),
    S.Struct({
      resourceNotFoundException: S.suspend(
        () => ResourceNotFoundException,
      ).annotate({ identifier: "ResourceNotFoundException" }),
    }),
    S.Struct({
      serviceQuotaExceededException: S.suspend(
        () => ServiceQuotaExceededException,
      ).annotate({ identifier: "ServiceQuotaExceededException" }),
    }),
    S.Struct({
      throttlingException: S.suspend(() => ThrottlingException).annotate({
        identifier: "ThrottlingException",
      }),
    }),
    S.Struct({
      accessDeniedException: S.suspend(() => AccessDeniedException).annotate({
        identifier: "AccessDeniedException",
      }),
    }),
    S.Struct({
      conflictException: S.suspend(() => ConflictException).annotate({
        identifier: "ConflictException",
      }),
    }),
    S.Struct({
      dependencyFailedException: S.suspend(
        () => DependencyFailedException,
      ).annotate({ identifier: "DependencyFailedException" }),
    }),
    S.Struct({
      badGatewayException: S.suspend(() => BadGatewayException).annotate({
        identifier: "BadGatewayException",
      }),
    }),
    S.Struct({
      modelNotReadyException: S.suspend(() => ModelNotReadyException).annotate({
        identifier: "ModelNotReadyException",
      }),
    }),
    S.Struct({ files: FilePart }),
  ]),
) as any as S.Schema<stream.Stream<ResponseStream, Error, never>>;
export interface InvokeAgentResponse {
  completion: stream.Stream<ResponseStream, Error, never>;
  contentType: string;
  sessionId: string;
  memoryId?: string;
}
export const InvokeAgentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    completion: ResponseStream.pipe(T.HttpPayload()),
    contentType: S.String.pipe(
      T.HttpHeader("x-amzn-bedrock-agent-content-type"),
    ),
    sessionId: S.String.pipe(T.HttpHeader("x-amz-bedrock-agent-session-id")),
    memoryId: S.optional(S.String).pipe(
      T.HttpHeader("x-amz-bedrock-agent-memory-id"),
    ),
  }),
).annotate({
  identifier: "InvokeAgentResponse",
}) as any as S.Schema<InvokeAgentResponse>;
export type NodeOutputName = string;
export type FlowInputContent = { document: any };
export const FlowInputContent = /*@__PURE__*/ S.Union([
  S.Struct({ document: S.Any }),
]);
export type NodeInputName = string;
export interface FlowInput {
  nodeName: string;
  nodeOutputName?: string;
  content: FlowInputContent;
  nodeInputName?: string;
}
export const FlowInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodeName: S.String,
    nodeOutputName: S.optional(S.String),
    content: FlowInputContent,
    nodeInputName: S.optional(S.String),
  }),
).annotate({ identifier: "FlowInput" }) as any as S.Schema<FlowInput>;
export type FlowInputs = FlowInput[];
export const FlowInputs = /*@__PURE__*/ S.Array(FlowInput);
export interface ModelPerformanceConfiguration {
  performanceConfig?: PerformanceConfiguration;
}
export const ModelPerformanceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ performanceConfig: S.optional(PerformanceConfiguration) }),
).annotate({
  identifier: "ModelPerformanceConfiguration",
}) as any as S.Schema<ModelPerformanceConfiguration>;
export type FlowExecutionId = string;
export interface InvokeFlowRequest {
  flowIdentifier: string;
  flowAliasIdentifier: string;
  inputs: FlowInput[];
  enableTrace?: boolean;
  modelPerformanceConfiguration?: ModelPerformanceConfiguration;
  executionId?: string;
}
export const InvokeFlowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    flowIdentifier: S.String.pipe(T.HttpLabel("flowIdentifier")),
    flowAliasIdentifier: S.String.pipe(T.HttpLabel("flowAliasIdentifier")),
    inputs: FlowInputs,
    enableTrace: S.optional(S.Boolean),
    modelPerformanceConfiguration: S.optional(ModelPerformanceConfiguration),
    executionId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/flows/{flowIdentifier}/aliases/{flowAliasIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "InvokeFlowRequest",
}) as any as S.Schema<InvokeFlowRequest>;
export type NodeType =
  | "FlowInputNode"
  | "FlowOutputNode"
  | "LambdaFunctionNode"
  | "KnowledgeBaseNode"
  | "PromptNode"
  | "ConditionNode"
  | "LexNode"
  | (string & {});
export const NodeType = S.String;

export type FlowOutputContent = { document: any };
export const FlowOutputContent = /*@__PURE__*/ S.Union([
  S.Struct({ document: S.Any }),
]);
export interface FlowOutputEvent {
  nodeName: string;
  nodeType: NodeType;
  content: FlowOutputContent;
}
export const FlowOutputEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodeName: S.String,
    nodeType: NodeType,
    content: FlowOutputContent,
  }),
).annotate({
  identifier: "FlowOutputEvent",
}) as any as S.Schema<FlowOutputEvent>;
export type FlowCompletionReason = "SUCCESS" | "INPUT_REQUIRED" | (string & {});
export const FlowCompletionReason = S.String;

export interface FlowCompletionEvent {
  completionReason: FlowCompletionReason;
}
export const FlowCompletionEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ completionReason: FlowCompletionReason }),
).annotate({
  identifier: "FlowCompletionEvent",
}) as any as S.Schema<FlowCompletionEvent>;
export type FlowTraceNodeInputContent = { document: any };
export const FlowTraceNodeInputContent = /*@__PURE__*/ S.Union([
  S.Struct({ document: S.Any }),
]);
export type FlowNodeOutputName = string;
export type FlowNodeInputExpression = string | redacted.Redacted<string>;
export interface FlowTraceNodeInputSource {
  nodeName: string;
  outputFieldName: string;
  expression: string | redacted.Redacted<string>;
}
export const FlowTraceNodeInputSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodeName: S.String,
    outputFieldName: S.String,
    expression: SensitiveString,
  }),
).annotate({
  identifier: "FlowTraceNodeInputSource",
}) as any as S.Schema<FlowTraceNodeInputSource>;
export type FlowNodeIODataType =
  | "String"
  | "Number"
  | "Boolean"
  | "Object"
  | "Array"
  | (string & {});
export const FlowNodeIODataType = S.String;

export type FlowNodeInputCategory =
  | "LoopCondition"
  | "ReturnValueToLoopStart"
  | "ExitLoop"
  | (string & {});
export const FlowNodeInputCategory = S.String;

export type FlowControlNodeType = "Iterator" | "Loop" | (string & {});
export const FlowControlNodeType = S.String;

export interface FlowTraceNodeInputExecutionChainItem {
  nodeName: string;
  index?: number;
  type: FlowControlNodeType;
}
export const FlowTraceNodeInputExecutionChainItem = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nodeName: S.String,
      index: S.optional(S.Number),
      type: FlowControlNodeType,
    }),
).annotate({
  identifier: "FlowTraceNodeInputExecutionChainItem",
}) as any as S.Schema<FlowTraceNodeInputExecutionChainItem>;
export type FlowTraceNodeInputExecutionChain =
  FlowTraceNodeInputExecutionChainItem[];
export const FlowTraceNodeInputExecutionChain = /*@__PURE__*/ S.Array(
  FlowTraceNodeInputExecutionChainItem,
);
export interface FlowTraceNodeInputField {
  nodeInputName: string;
  content: FlowTraceNodeInputContent;
  source?: FlowTraceNodeInputSource;
  type?: FlowNodeIODataType;
  category?: FlowNodeInputCategory;
  executionChain?: FlowTraceNodeInputExecutionChainItem[];
}
export const FlowTraceNodeInputField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodeInputName: S.String,
    content: FlowTraceNodeInputContent,
    source: S.optional(FlowTraceNodeInputSource),
    type: S.optional(FlowNodeIODataType),
    category: S.optional(FlowNodeInputCategory),
    executionChain: S.optional(FlowTraceNodeInputExecutionChain),
  }),
).annotate({
  identifier: "FlowTraceNodeInputField",
}) as any as S.Schema<FlowTraceNodeInputField>;
export type FlowTraceNodeInputFields = FlowTraceNodeInputField[];
export const FlowTraceNodeInputFields = /*@__PURE__*/ S.Array(
  FlowTraceNodeInputField,
);
export interface FlowTraceNodeInputEvent {
  nodeName: string;
  timestamp: Date;
  fields: FlowTraceNodeInputField[];
}
export const FlowTraceNodeInputEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodeName: S.String,
    timestamp: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    fields: FlowTraceNodeInputFields,
  }),
).annotate({
  identifier: "FlowTraceNodeInputEvent",
}) as any as S.Schema<FlowTraceNodeInputEvent>;
export type FlowTraceNodeOutputContent = { document: any };
export const FlowTraceNodeOutputContent = /*@__PURE__*/ S.Union([
  S.Struct({ document: S.Any }),
]);
export type FlowNodeInputName = string;
export interface FlowTraceNodeOutputNext {
  nodeName: string;
  inputFieldName: string;
}
export const FlowTraceNodeOutputNext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nodeName: S.String, inputFieldName: S.String }),
).annotate({
  identifier: "FlowTraceNodeOutputNext",
}) as any as S.Schema<FlowTraceNodeOutputNext>;
export type FlowTraceNodeOutputNextList = FlowTraceNodeOutputNext[];
export const FlowTraceNodeOutputNextList = /*@__PURE__*/ S.Array(
  FlowTraceNodeOutputNext,
);
export interface FlowTraceNodeOutputField {
  nodeOutputName: string;
  content: FlowTraceNodeOutputContent;
  next?: FlowTraceNodeOutputNext[];
  type?: FlowNodeIODataType;
}
export const FlowTraceNodeOutputField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodeOutputName: S.String,
    content: FlowTraceNodeOutputContent,
    next: S.optional(FlowTraceNodeOutputNextList),
    type: S.optional(FlowNodeIODataType),
  }),
).annotate({
  identifier: "FlowTraceNodeOutputField",
}) as any as S.Schema<FlowTraceNodeOutputField>;
export type FlowTraceNodeOutputFields = FlowTraceNodeOutputField[];
export const FlowTraceNodeOutputFields = /*@__PURE__*/ S.Array(
  FlowTraceNodeOutputField,
);
export interface FlowTraceNodeOutputEvent {
  nodeName: string;
  timestamp: Date;
  fields: FlowTraceNodeOutputField[];
}
export const FlowTraceNodeOutputEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodeName: S.String,
    timestamp: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    fields: FlowTraceNodeOutputFields,
  }),
).annotate({
  identifier: "FlowTraceNodeOutputEvent",
}) as any as S.Schema<FlowTraceNodeOutputEvent>;
export interface FlowTraceCondition {
  conditionName: string;
}
export const FlowTraceCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ conditionName: S.String }),
).annotate({
  identifier: "FlowTraceCondition",
}) as any as S.Schema<FlowTraceCondition>;
export type FlowTraceConditions = FlowTraceCondition[];
export const FlowTraceConditions = /*@__PURE__*/ S.Array(FlowTraceCondition);
export interface FlowTraceConditionNodeResultEvent {
  nodeName: string;
  timestamp: Date;
  satisfiedConditions: FlowTraceCondition[];
}
export const FlowTraceConditionNodeResultEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodeName: S.String,
    timestamp: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    satisfiedConditions: FlowTraceConditions,
  }),
).annotate({
  identifier: "FlowTraceConditionNodeResultEvent",
}) as any as S.Schema<FlowTraceConditionNodeResultEvent>;
export interface FlowTraceNodeActionEvent {
  nodeName: string;
  timestamp: Date;
  requestId: string;
  serviceName: string;
  operationName: string;
  operationRequest?: any;
  operationResponse?: any;
}
export const FlowTraceNodeActionEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodeName: S.String,
    timestamp: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    requestId: S.String,
    serviceName: S.String,
    operationName: S.String,
    operationRequest: S.optional(S.Any),
    operationResponse: S.optional(S.Any),
  }),
).annotate({
  identifier: "FlowTraceNodeActionEvent",
}) as any as S.Schema<FlowTraceNodeActionEvent>;
export type AgentTraces = TracePart[];
export const AgentTraces = /*@__PURE__*/ S.Array(TracePart);
export type TraceElements = { agentTraces: TracePart[] };
export const TraceElements = /*@__PURE__*/ S.Union([
  S.Struct({ agentTraces: AgentTraces }),
]);
export interface FlowTraceDependencyEvent {
  nodeName: string;
  timestamp: Date;
  traceElements: TraceElements;
}
export const FlowTraceDependencyEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodeName: S.String,
    timestamp: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    traceElements: TraceElements,
  }),
).annotate({
  identifier: "FlowTraceDependencyEvent",
}) as any as S.Schema<FlowTraceDependencyEvent>;
export type FlowTrace =
  | {
      nodeInputTrace: FlowTraceNodeInputEvent;
      nodeOutputTrace?: never;
      conditionNodeResultTrace?: never;
      nodeActionTrace?: never;
      nodeDependencyTrace?: never;
    }
  | {
      nodeInputTrace?: never;
      nodeOutputTrace: FlowTraceNodeOutputEvent;
      conditionNodeResultTrace?: never;
      nodeActionTrace?: never;
      nodeDependencyTrace?: never;
    }
  | {
      nodeInputTrace?: never;
      nodeOutputTrace?: never;
      conditionNodeResultTrace: FlowTraceConditionNodeResultEvent;
      nodeActionTrace?: never;
      nodeDependencyTrace?: never;
    }
  | {
      nodeInputTrace?: never;
      nodeOutputTrace?: never;
      conditionNodeResultTrace?: never;
      nodeActionTrace: FlowTraceNodeActionEvent;
      nodeDependencyTrace?: never;
    }
  | {
      nodeInputTrace?: never;
      nodeOutputTrace?: never;
      conditionNodeResultTrace?: never;
      nodeActionTrace?: never;
      nodeDependencyTrace: FlowTraceDependencyEvent;
    };
export const FlowTrace = /*@__PURE__*/ S.Union([
  S.Struct({ nodeInputTrace: FlowTraceNodeInputEvent }),
  S.Struct({ nodeOutputTrace: FlowTraceNodeOutputEvent }),
  S.Struct({ conditionNodeResultTrace: FlowTraceConditionNodeResultEvent }),
  S.Struct({ nodeActionTrace: FlowTraceNodeActionEvent }),
  S.Struct({ nodeDependencyTrace: FlowTraceDependencyEvent }),
]);
export interface FlowTraceEvent {
  trace: FlowTrace;
}
export const FlowTraceEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ trace: FlowTrace }),
).annotate({ identifier: "FlowTraceEvent" }) as any as S.Schema<FlowTraceEvent>;
export type FlowMultiTurnInputContent = { document: any };
export const FlowMultiTurnInputContent = /*@__PURE__*/ S.Union([
  S.Struct({ document: S.Any }),
]);
export interface FlowMultiTurnInputRequestEvent {
  nodeName: string;
  nodeType: NodeType;
  content: FlowMultiTurnInputContent;
}
export const FlowMultiTurnInputRequestEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodeName: S.String,
    nodeType: NodeType,
    content: FlowMultiTurnInputContent,
  }),
).annotate({
  identifier: "FlowMultiTurnInputRequestEvent",
}) as any as S.Schema<FlowMultiTurnInputRequestEvent>;
export type FlowResponseStream =
  | {
      flowOutputEvent: FlowOutputEvent;
      flowCompletionEvent?: never;
      flowTraceEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      flowMultiTurnInputRequestEvent?: never;
    }
  | {
      flowOutputEvent?: never;
      flowCompletionEvent: FlowCompletionEvent;
      flowTraceEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      flowMultiTurnInputRequestEvent?: never;
    }
  | {
      flowOutputEvent?: never;
      flowCompletionEvent?: never;
      flowTraceEvent: FlowTraceEvent;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      flowMultiTurnInputRequestEvent?: never;
    }
  | {
      flowOutputEvent?: never;
      flowCompletionEvent?: never;
      flowTraceEvent?: never;
      internalServerException: InternalServerException;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      flowMultiTurnInputRequestEvent?: never;
    }
  | {
      flowOutputEvent?: never;
      flowCompletionEvent?: never;
      flowTraceEvent?: never;
      internalServerException?: never;
      validationException: ValidationException;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      flowMultiTurnInputRequestEvent?: never;
    }
  | {
      flowOutputEvent?: never;
      flowCompletionEvent?: never;
      flowTraceEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException: ResourceNotFoundException;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      flowMultiTurnInputRequestEvent?: never;
    }
  | {
      flowOutputEvent?: never;
      flowCompletionEvent?: never;
      flowTraceEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException: ServiceQuotaExceededException;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      flowMultiTurnInputRequestEvent?: never;
    }
  | {
      flowOutputEvent?: never;
      flowCompletionEvent?: never;
      flowTraceEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException: ThrottlingException;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      flowMultiTurnInputRequestEvent?: never;
    }
  | {
      flowOutputEvent?: never;
      flowCompletionEvent?: never;
      flowTraceEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException: AccessDeniedException;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      flowMultiTurnInputRequestEvent?: never;
    }
  | {
      flowOutputEvent?: never;
      flowCompletionEvent?: never;
      flowTraceEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException: ConflictException;
      dependencyFailedException?: never;
      badGatewayException?: never;
      flowMultiTurnInputRequestEvent?: never;
    }
  | {
      flowOutputEvent?: never;
      flowCompletionEvent?: never;
      flowTraceEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException: DependencyFailedException;
      badGatewayException?: never;
      flowMultiTurnInputRequestEvent?: never;
    }
  | {
      flowOutputEvent?: never;
      flowCompletionEvent?: never;
      flowTraceEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException: BadGatewayException;
      flowMultiTurnInputRequestEvent?: never;
    }
  | {
      flowOutputEvent?: never;
      flowCompletionEvent?: never;
      flowTraceEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      flowMultiTurnInputRequestEvent: FlowMultiTurnInputRequestEvent;
    };
export const FlowResponseStream = /*@__PURE__*/ T.EventStream(
  S.Union([
    S.Struct({ flowOutputEvent: FlowOutputEvent }),
    S.Struct({ flowCompletionEvent: FlowCompletionEvent }),
    S.Struct({ flowTraceEvent: FlowTraceEvent }),
    S.Struct({
      internalServerException: S.suspend(
        () => InternalServerException,
      ).annotate({ identifier: "InternalServerException" }),
    }),
    S.Struct({
      validationException: S.suspend(() => ValidationException).annotate({
        identifier: "ValidationException",
      }),
    }),
    S.Struct({
      resourceNotFoundException: S.suspend(
        () => ResourceNotFoundException,
      ).annotate({ identifier: "ResourceNotFoundException" }),
    }),
    S.Struct({
      serviceQuotaExceededException: S.suspend(
        () => ServiceQuotaExceededException,
      ).annotate({ identifier: "ServiceQuotaExceededException" }),
    }),
    S.Struct({
      throttlingException: S.suspend(() => ThrottlingException).annotate({
        identifier: "ThrottlingException",
      }),
    }),
    S.Struct({
      accessDeniedException: S.suspend(() => AccessDeniedException).annotate({
        identifier: "AccessDeniedException",
      }),
    }),
    S.Struct({
      conflictException: S.suspend(() => ConflictException).annotate({
        identifier: "ConflictException",
      }),
    }),
    S.Struct({
      dependencyFailedException: S.suspend(
        () => DependencyFailedException,
      ).annotate({ identifier: "DependencyFailedException" }),
    }),
    S.Struct({
      badGatewayException: S.suspend(() => BadGatewayException).annotate({
        identifier: "BadGatewayException",
      }),
    }),
    S.Struct({
      flowMultiTurnInputRequestEvent: FlowMultiTurnInputRequestEvent,
    }),
  ]),
) as any as S.Schema<stream.Stream<FlowResponseStream, Error, never>>;
export interface InvokeFlowResponse {
  responseStream: stream.Stream<FlowResponseStream, Error, never>;
  executionId?: string;
}
export const InvokeFlowResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    responseStream: FlowResponseStream.pipe(T.HttpPayload()),
    executionId: S.optional(S.String).pipe(
      T.HttpHeader("x-amz-bedrock-flow-execution-id"),
    ),
  }),
).annotate({
  identifier: "InvokeFlowResponse",
}) as any as S.Schema<InvokeFlowResponse>;
export type Instruction = string | redacted.Redacted<string>;
export type SessionTTL = number;
export type ResourceName = string | redacted.Redacted<string>;
export type ResourceDescription = string | redacted.Redacted<string>;
export type ActionGroupSignature =
  | "AMAZON.UserInput"
  | "AMAZON.CodeInterpreter"
  | "ANTHROPIC.Computer"
  | "ANTHROPIC.Bash"
  | "ANTHROPIC.TextEditor"
  | (string & {});
export const ActionGroupSignature = S.String;

export type LambdaResourceArn = string;
export type CustomControlMethod = "RETURN_CONTROL" | (string & {});
export const CustomControlMethod = S.String;

export type ActionGroupExecutor =
  | { lambda: string; customControl?: never }
  | { lambda?: never; customControl: CustomControlMethod };
export const ActionGroupExecutor = /*@__PURE__*/ S.Union([
  S.Struct({ lambda: S.String }),
  S.Struct({ customControl: CustomControlMethod }),
]);
export type S3BucketName = string;
export type S3ObjectKey = string;
export interface S3Identifier {
  s3BucketName?: string;
  s3ObjectKey?: string;
}
export const S3Identifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3BucketName: S.optional(S.String),
    s3ObjectKey: S.optional(S.String),
  }),
).annotate({ identifier: "S3Identifier" }) as any as S.Schema<S3Identifier>;
export type Payload = string | redacted.Redacted<string>;
export type APISchema =
  | { s3: S3Identifier; payload?: never }
  | { s3?: never; payload: string | redacted.Redacted<string> };
export const APISchema = /*@__PURE__*/ S.Union([
  S.Struct({ s3: S3Identifier }),
  S.Struct({ payload: SensitiveString }),
]);
export type FunctionDescription = string;
export type ParameterName = string;
export type ParameterDescription = string;
export type ParameterType =
  | "string"
  | "number"
  | "integer"
  | "boolean"
  | "array"
  | (string & {});
export const ParameterType = S.String;

export interface ParameterDetail {
  description?: string;
  type: ParameterType;
  required?: boolean;
}
export const ParameterDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    type: ParameterType,
    required: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ParameterDetail",
}) as any as S.Schema<ParameterDetail>;
export type ParameterMap = { [key: string]: ParameterDetail | undefined };
export const ParameterMap = /*@__PURE__*/ S.Record(
  S.String,
  ParameterDetail.pipe(S.optional),
);
export type RequireConfirmation = "ENABLED" | "DISABLED" | (string & {});
export const RequireConfirmation = S.String;

export interface FunctionDefinition {
  name: string | redacted.Redacted<string>;
  description?: string;
  parameters?: { [key: string]: ParameterDetail | undefined };
  requireConfirmation?: RequireConfirmation;
}
export const FunctionDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: SensitiveString,
    description: S.optional(S.String),
    parameters: S.optional(ParameterMap),
    requireConfirmation: S.optional(RequireConfirmation),
  }),
).annotate({
  identifier: "FunctionDefinition",
}) as any as S.Schema<FunctionDefinition>;
export type Functions = FunctionDefinition[];
export const Functions = /*@__PURE__*/ S.Array(FunctionDefinition);
export type FunctionSchema = { functions: FunctionDefinition[] };
export const FunctionSchema = /*@__PURE__*/ S.Union([
  S.Struct({ functions: Functions }),
]);
export type ActionGroupSignatureParams = { [key: string]: string | undefined };
export const ActionGroupSignatureParams = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface AgentActionGroup {
  actionGroupName: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  parentActionGroupSignature?: ActionGroupSignature;
  actionGroupExecutor?: ActionGroupExecutor;
  apiSchema?: APISchema;
  functionSchema?: FunctionSchema;
  parentActionGroupSignatureParams?: { [key: string]: string | undefined };
}
export const AgentActionGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionGroupName: SensitiveString,
    description: S.optional(SensitiveString),
    parentActionGroupSignature: S.optional(ActionGroupSignature),
    actionGroupExecutor: S.optional(ActionGroupExecutor),
    apiSchema: S.optional(APISchema),
    functionSchema: S.optional(FunctionSchema),
    parentActionGroupSignatureParams: S.optional(ActionGroupSignatureParams),
  }),
).annotate({
  identifier: "AgentActionGroup",
}) as any as S.Schema<AgentActionGroup>;
export type AgentActionGroups = AgentActionGroup[];
export const AgentActionGroups = /*@__PURE__*/ S.Array(AgentActionGroup);
export interface KnowledgeBase {
  knowledgeBaseId: string;
  description: string | redacted.Redacted<string>;
  retrievalConfiguration?: KnowledgeBaseRetrievalConfiguration;
}
export const KnowledgeBase = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    knowledgeBaseId: S.String,
    description: SensitiveString,
    retrievalConfiguration: S.optional(KnowledgeBaseRetrievalConfiguration),
  }),
).annotate({ identifier: "KnowledgeBase" }) as any as S.Schema<KnowledgeBase>;
export type KnowledgeBases = KnowledgeBase[];
export const KnowledgeBases = /*@__PURE__*/ S.Array(KnowledgeBase);
export type GuardrailIdentifierWithArn = string;
export type GuardrailVersion = string;
export interface GuardrailConfigurationWithArn {
  guardrailIdentifier: string;
  guardrailVersion: string;
}
export const GuardrailConfigurationWithArn = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ guardrailIdentifier: S.String, guardrailVersion: S.String }),
).annotate({
  identifier: "GuardrailConfigurationWithArn",
}) as any as S.Schema<GuardrailConfigurationWithArn>;
export type PromptState = "ENABLED" | "DISABLED" | (string & {});
export const PromptState = S.String;

export type BasePromptTemplate = string | redacted.Redacted<string>;
export interface PromptConfiguration {
  promptType?: PromptType;
  promptCreationMode?: CreationMode;
  promptState?: PromptState;
  basePromptTemplate?: string | redacted.Redacted<string>;
  inferenceConfiguration?: InferenceConfiguration;
  parserMode?: CreationMode;
  foundationModel?: string;
  additionalModelRequestFields?: any;
}
export const PromptConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    promptType: S.optional(PromptType),
    promptCreationMode: S.optional(CreationMode),
    promptState: S.optional(PromptState),
    basePromptTemplate: S.optional(SensitiveString),
    inferenceConfiguration: S.optional(InferenceConfiguration),
    parserMode: S.optional(CreationMode),
    foundationModel: S.optional(S.String),
    additionalModelRequestFields: S.optional(S.Any),
  }),
).annotate({
  identifier: "PromptConfiguration",
}) as any as S.Schema<PromptConfiguration>;
export type PromptConfigurations = PromptConfiguration[];
export const PromptConfigurations = /*@__PURE__*/ S.Array(PromptConfiguration);
export interface PromptOverrideConfiguration {
  promptConfigurations: PromptConfiguration[];
  overrideLambda?: string;
}
export const PromptOverrideConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    promptConfigurations: PromptConfigurations,
    overrideLambda: S.optional(S.String),
  }),
).annotate({
  identifier: "PromptOverrideConfiguration",
}) as any as S.Schema<PromptOverrideConfiguration>;
export type AgentCollaboration =
  | "SUPERVISOR"
  | "SUPERVISOR_ROUTER"
  | "DISABLED"
  | (string & {});
export const AgentCollaboration = S.String;

export type CollaborationInstruction = string | redacted.Redacted<string>;
export type RelayConversationHistory =
  | "TO_COLLABORATOR"
  | "DISABLED"
  | (string & {});
export const RelayConversationHistory = S.String;

export interface CollaboratorConfiguration {
  collaboratorName: string | redacted.Redacted<string>;
  collaboratorInstruction: string | redacted.Redacted<string>;
  agentAliasArn?: string;
  relayConversationHistory?: RelayConversationHistory;
}
export const CollaboratorConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    collaboratorName: SensitiveString,
    collaboratorInstruction: SensitiveString,
    agentAliasArn: S.optional(S.String),
    relayConversationHistory: S.optional(RelayConversationHistory),
  }),
).annotate({
  identifier: "CollaboratorConfiguration",
}) as any as S.Schema<CollaboratorConfiguration>;
export type CollaboratorConfigurations = CollaboratorConfiguration[];
export const CollaboratorConfigurations = /*@__PURE__*/ S.Array(
  CollaboratorConfiguration,
);
export interface InlineSessionState {
  sessionAttributes?: { [key: string]: string | undefined };
  promptSessionAttributes?: { [key: string]: string | undefined };
  returnControlInvocationResults?: InvocationResultMember[];
  invocationId?: string;
  files?: InputFile[];
  conversationHistory?: ConversationHistory;
}
export const InlineSessionState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionAttributes: S.optional(SessionAttributesMap),
    promptSessionAttributes: S.optional(PromptSessionAttributesMap),
    returnControlInvocationResults: S.optional(ReturnControlInvocationResults),
    invocationId: S.optional(S.String),
    files: S.optional(InputFiles),
    conversationHistory: S.optional(ConversationHistory),
  }),
).annotate({
  identifier: "InlineSessionState",
}) as any as S.Schema<InlineSessionState>;
export interface Collaborator {
  customerEncryptionKeyArn?: string;
  foundationModel: string;
  instruction: string | redacted.Redacted<string>;
  idleSessionTTLInSeconds?: number;
  actionGroups?: AgentActionGroup[];
  knowledgeBases?: KnowledgeBase[];
  guardrailConfiguration?: GuardrailConfigurationWithArn;
  promptOverrideConfiguration?: PromptOverrideConfiguration;
  agentCollaboration?: AgentCollaboration;
  collaboratorConfigurations?: CollaboratorConfiguration[];
  agentName?: string | redacted.Redacted<string>;
}
export const Collaborator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    customerEncryptionKeyArn: S.optional(S.String),
    foundationModel: S.String,
    instruction: SensitiveString,
    idleSessionTTLInSeconds: S.optional(S.Number),
    actionGroups: S.optional(AgentActionGroups),
    knowledgeBases: S.optional(KnowledgeBases),
    guardrailConfiguration: S.optional(GuardrailConfigurationWithArn),
    promptOverrideConfiguration: S.optional(PromptOverrideConfiguration),
    agentCollaboration: S.optional(AgentCollaboration),
    collaboratorConfigurations: S.optional(CollaboratorConfigurations),
    agentName: S.optional(SensitiveString),
  }),
).annotate({ identifier: "Collaborator" }) as any as S.Schema<Collaborator>;
export type Collaborators = Collaborator[];
export const Collaborators = /*@__PURE__*/ S.Array(Collaborator);
export interface InlineBedrockModelConfigurations {
  performanceConfig?: PerformanceConfiguration;
}
export const InlineBedrockModelConfigurations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ performanceConfig: S.optional(PerformanceConfiguration) }),
).annotate({
  identifier: "InlineBedrockModelConfigurations",
}) as any as S.Schema<InlineBedrockModelConfigurations>;
export type OrchestrationType =
  | "DEFAULT"
  | "CUSTOM_ORCHESTRATION"
  | (string & {});
export const OrchestrationType = S.String;

export type OrchestrationExecutor = { lambda: string };
export const OrchestrationExecutor = /*@__PURE__*/ S.Union([
  S.Struct({ lambda: S.String }),
]);
export interface CustomOrchestration {
  executor?: OrchestrationExecutor;
}
export const CustomOrchestration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ executor: S.optional(OrchestrationExecutor) }),
).annotate({
  identifier: "CustomOrchestration",
}) as any as S.Schema<CustomOrchestration>;
export interface InvokeInlineAgentRequest {
  customerEncryptionKeyArn?: string;
  foundationModel: string;
  instruction: string | redacted.Redacted<string>;
  idleSessionTTLInSeconds?: number;
  actionGroups?: AgentActionGroup[];
  knowledgeBases?: KnowledgeBase[];
  guardrailConfiguration?: GuardrailConfigurationWithArn;
  promptOverrideConfiguration?: PromptOverrideConfiguration;
  agentCollaboration?: AgentCollaboration;
  collaboratorConfigurations?: CollaboratorConfiguration[];
  agentName?: string | redacted.Redacted<string>;
  sessionId: string;
  endSession?: boolean;
  enableTrace?: boolean;
  inputText?: string | redacted.Redacted<string>;
  streamingConfigurations?: StreamingConfigurations;
  promptCreationConfigurations?: PromptCreationConfigurations;
  inlineSessionState?: InlineSessionState;
  collaborators?: Collaborator[];
  bedrockModelConfigurations?: InlineBedrockModelConfigurations;
  orchestrationType?: OrchestrationType;
  customOrchestration?: CustomOrchestration;
}
export const InvokeInlineAgentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    customerEncryptionKeyArn: S.optional(S.String),
    foundationModel: S.String,
    instruction: SensitiveString,
    idleSessionTTLInSeconds: S.optional(S.Number),
    actionGroups: S.optional(AgentActionGroups),
    knowledgeBases: S.optional(KnowledgeBases),
    guardrailConfiguration: S.optional(GuardrailConfigurationWithArn),
    promptOverrideConfiguration: S.optional(PromptOverrideConfiguration),
    agentCollaboration: S.optional(AgentCollaboration),
    collaboratorConfigurations: S.optional(CollaboratorConfigurations),
    agentName: S.optional(SensitiveString),
    sessionId: S.String.pipe(T.HttpLabel("sessionId")),
    endSession: S.optional(S.Boolean),
    enableTrace: S.optional(S.Boolean),
    inputText: S.optional(SensitiveString),
    streamingConfigurations: S.optional(StreamingConfigurations),
    promptCreationConfigurations: S.optional(PromptCreationConfigurations),
    inlineSessionState: S.optional(InlineSessionState),
    collaborators: S.optional(Collaborators),
    bedrockModelConfigurations: S.optional(InlineBedrockModelConfigurations),
    orchestrationType: S.optional(OrchestrationType),
    customOrchestration: S.optional(CustomOrchestration),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/agents/{sessionId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "InvokeInlineAgentRequest",
}) as any as S.Schema<InvokeInlineAgentRequest>;
export interface InlineAgentPayloadPart {
  bytes?: Uint8Array | redacted.Redacted<Uint8Array>;
  attribution?: Attribution;
}
export const InlineAgentPayloadPart = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bytes: S.optional(SensitiveBlob),
    attribution: S.optional(Attribution),
  }),
).annotate({
  identifier: "InlineAgentPayloadPart",
}) as any as S.Schema<InlineAgentPayloadPart>;
export interface InlineAgentTracePart {
  sessionId?: string;
  trace?: Trace;
  callerChain?: Caller[];
  eventTime?: Date;
  collaboratorName?: string | redacted.Redacted<string>;
}
export const InlineAgentTracePart = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.optional(S.String),
    trace: S.optional(Trace),
    callerChain: S.optional(CallerChain),
    eventTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    collaboratorName: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "InlineAgentTracePart",
}) as any as S.Schema<InlineAgentTracePart>;
export interface InlineAgentReturnControlPayload {
  invocationInputs?: InvocationInputMember[];
  invocationId?: string;
}
export const InlineAgentReturnControlPayload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    invocationInputs: S.optional(InvocationInputs),
    invocationId: S.optional(S.String),
  }),
).annotate({
  identifier: "InlineAgentReturnControlPayload",
}) as any as S.Schema<InlineAgentReturnControlPayload>;
export interface InlineAgentFilePart {
  files?: OutputFile[];
}
export const InlineAgentFilePart = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ files: S.optional(OutputFiles) }),
).annotate({
  identifier: "InlineAgentFilePart",
}) as any as S.Schema<InlineAgentFilePart>;
export type InlineAgentResponseStream =
  | {
      chunk: InlineAgentPayloadPart;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace: InlineAgentTracePart;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl: InlineAgentReturnControlPayload;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException: InternalServerException;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException: ValidationException;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException: ResourceNotFoundException;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException: ServiceQuotaExceededException;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException: ThrottlingException;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException: AccessDeniedException;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException: ConflictException;
      dependencyFailedException?: never;
      badGatewayException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException: DependencyFailedException;
      badGatewayException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException: BadGatewayException;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      files: InlineAgentFilePart;
    };
export const InlineAgentResponseStream = /*@__PURE__*/ T.EventStream(
  S.Union([
    S.Struct({ chunk: InlineAgentPayloadPart }),
    S.Struct({ trace: InlineAgentTracePart }),
    S.Struct({ returnControl: InlineAgentReturnControlPayload }),
    S.Struct({
      internalServerException: S.suspend(
        () => InternalServerException,
      ).annotate({ identifier: "InternalServerException" }),
    }),
    S.Struct({
      validationException: S.suspend(() => ValidationException).annotate({
        identifier: "ValidationException",
      }),
    }),
    S.Struct({
      resourceNotFoundException: S.suspend(
        () => ResourceNotFoundException,
      ).annotate({ identifier: "ResourceNotFoundException" }),
    }),
    S.Struct({
      serviceQuotaExceededException: S.suspend(
        () => ServiceQuotaExceededException,
      ).annotate({ identifier: "ServiceQuotaExceededException" }),
    }),
    S.Struct({
      throttlingException: S.suspend(() => ThrottlingException).annotate({
        identifier: "ThrottlingException",
      }),
    }),
    S.Struct({
      accessDeniedException: S.suspend(() => AccessDeniedException).annotate({
        identifier: "AccessDeniedException",
      }),
    }),
    S.Struct({
      conflictException: S.suspend(() => ConflictException).annotate({
        identifier: "ConflictException",
      }),
    }),
    S.Struct({
      dependencyFailedException: S.suspend(
        () => DependencyFailedException,
      ).annotate({ identifier: "DependencyFailedException" }),
    }),
    S.Struct({
      badGatewayException: S.suspend(() => BadGatewayException).annotate({
        identifier: "BadGatewayException",
      }),
    }),
    S.Struct({ files: InlineAgentFilePart }),
  ]),
) as any as S.Schema<stream.Stream<InlineAgentResponseStream, Error, never>>;
export interface InvokeInlineAgentResponse {
  completion: stream.Stream<InlineAgentResponseStream, Error, never>;
  contentType: string;
  sessionId: string;
}
export const InvokeInlineAgentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    completion: InlineAgentResponseStream.pipe(T.HttpPayload()),
    contentType: S.String.pipe(
      T.HttpHeader("x-amzn-bedrock-agent-content-type"),
    ),
    sessionId: S.String.pipe(T.HttpHeader("x-amz-bedrock-agent-session-id")),
  }),
).annotate({
  identifier: "InvokeInlineAgentResponse",
}) as any as S.Schema<InvokeInlineAgentResponse>;
export type FlowExecutionEventType = "Node" | "Flow" | (string & {});
export const FlowExecutionEventType = S.String;

export interface ListFlowExecutionEventsRequest {
  flowIdentifier: string;
  flowAliasIdentifier: string;
  executionIdentifier: string;
  maxResults?: number;
  nextToken?: string;
  eventType: FlowExecutionEventType;
}
export const ListFlowExecutionEventsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    flowIdentifier: S.String.pipe(T.HttpLabel("flowIdentifier")),
    flowAliasIdentifier: S.String.pipe(T.HttpLabel("flowAliasIdentifier")),
    executionIdentifier: S.String.pipe(T.HttpLabel("executionIdentifier")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    eventType: FlowExecutionEventType.pipe(T.HttpQuery("eventType")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/flows/{flowIdentifier}/aliases/{flowAliasIdentifier}/executions/{executionIdentifier}/events",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFlowExecutionEventsRequest",
}) as any as S.Schema<ListFlowExecutionEventsRequest>;
export type FlowExecutionContent = { document: any };
export const FlowExecutionContent = /*@__PURE__*/ S.Union([
  S.Struct({ document: S.Any }),
]);
export interface FlowInputField {
  name: string;
  content: FlowExecutionContent;
}
export const FlowInputField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, content: FlowExecutionContent }),
).annotate({ identifier: "FlowInputField" }) as any as S.Schema<FlowInputField>;
export type FlowInputFields = FlowInputField[];
export const FlowInputFields = /*@__PURE__*/ S.Array(FlowInputField);
export interface FlowExecutionInputEvent {
  nodeName: string;
  timestamp: Date;
  fields: FlowInputField[];
}
export const FlowExecutionInputEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodeName: S.String,
    timestamp: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    fields: FlowInputFields,
  }),
).annotate({
  identifier: "FlowExecutionInputEvent",
}) as any as S.Schema<FlowExecutionInputEvent>;
export interface FlowOutputField {
  name: string;
  content: FlowExecutionContent;
}
export const FlowOutputField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, content: FlowExecutionContent }),
).annotate({
  identifier: "FlowOutputField",
}) as any as S.Schema<FlowOutputField>;
export type FlowOutputFields = FlowOutputField[];
export const FlowOutputFields = /*@__PURE__*/ S.Array(FlowOutputField);
export interface FlowExecutionOutputEvent {
  nodeName: string;
  timestamp: Date;
  fields: FlowOutputField[];
}
export const FlowExecutionOutputEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodeName: S.String,
    timestamp: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    fields: FlowOutputFields,
  }),
).annotate({
  identifier: "FlowExecutionOutputEvent",
}) as any as S.Schema<FlowExecutionOutputEvent>;
export type NodeExecutionContent = { document: any };
export const NodeExecutionContent = /*@__PURE__*/ S.Union([
  S.Struct({ document: S.Any }),
]);
export interface NodeInputSource {
  nodeName: string;
  outputFieldName: string;
  expression: string | redacted.Redacted<string>;
}
export const NodeInputSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodeName: S.String,
    outputFieldName: S.String,
    expression: SensitiveString,
  }),
).annotate({
  identifier: "NodeInputSource",
}) as any as S.Schema<NodeInputSource>;
export interface NodeInputExecutionChainItem {
  nodeName: string;
  index?: number;
  type: FlowControlNodeType;
}
export const NodeInputExecutionChainItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodeName: S.String,
    index: S.optional(S.Number),
    type: FlowControlNodeType,
  }),
).annotate({
  identifier: "NodeInputExecutionChainItem",
}) as any as S.Schema<NodeInputExecutionChainItem>;
export type NodeInputExecutionChain = NodeInputExecutionChainItem[];
export const NodeInputExecutionChain = /*@__PURE__*/ S.Array(
  NodeInputExecutionChainItem,
);
export interface NodeInputField {
  name: string;
  content: NodeExecutionContent;
  source?: NodeInputSource;
  type?: FlowNodeIODataType;
  category?: FlowNodeInputCategory;
  executionChain?: NodeInputExecutionChainItem[];
}
export const NodeInputField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    content: NodeExecutionContent,
    source: S.optional(NodeInputSource),
    type: S.optional(FlowNodeIODataType),
    category: S.optional(FlowNodeInputCategory),
    executionChain: S.optional(NodeInputExecutionChain),
  }),
).annotate({ identifier: "NodeInputField" }) as any as S.Schema<NodeInputField>;
export type NodeInputFields = NodeInputField[];
export const NodeInputFields = /*@__PURE__*/ S.Array(NodeInputField);
export interface NodeInputEvent {
  nodeName: string;
  timestamp: Date;
  fields: NodeInputField[];
}
export const NodeInputEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodeName: S.String,
    timestamp: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    fields: NodeInputFields,
  }),
).annotate({ identifier: "NodeInputEvent" }) as any as S.Schema<NodeInputEvent>;
export interface NodeOutputNext {
  nodeName: string;
  inputFieldName: string;
}
export const NodeOutputNext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nodeName: S.String, inputFieldName: S.String }),
).annotate({ identifier: "NodeOutputNext" }) as any as S.Schema<NodeOutputNext>;
export type NodeOutputNextList = NodeOutputNext[];
export const NodeOutputNextList = /*@__PURE__*/ S.Array(NodeOutputNext);
export interface NodeOutputField {
  name: string;
  content: NodeExecutionContent;
  next?: NodeOutputNext[];
  type?: FlowNodeIODataType;
}
export const NodeOutputField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    content: NodeExecutionContent,
    next: S.optional(NodeOutputNextList),
    type: S.optional(FlowNodeIODataType),
  }),
).annotate({
  identifier: "NodeOutputField",
}) as any as S.Schema<NodeOutputField>;
export type NodeOutputFields = NodeOutputField[];
export const NodeOutputFields = /*@__PURE__*/ S.Array(NodeOutputField);
export interface NodeOutputEvent {
  nodeName: string;
  timestamp: Date;
  fields: NodeOutputField[];
}
export const NodeOutputEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodeName: S.String,
    timestamp: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    fields: NodeOutputFields,
  }),
).annotate({
  identifier: "NodeOutputEvent",
}) as any as S.Schema<NodeOutputEvent>;
export interface SatisfiedCondition {
  conditionName: string;
}
export const SatisfiedCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ conditionName: S.String }),
).annotate({
  identifier: "SatisfiedCondition",
}) as any as S.Schema<SatisfiedCondition>;
export type SatisfiedConditions = SatisfiedCondition[];
export const SatisfiedConditions = /*@__PURE__*/ S.Array(SatisfiedCondition);
export interface ConditionResultEvent {
  nodeName: string;
  timestamp: Date;
  satisfiedConditions: SatisfiedCondition[];
}
export const ConditionResultEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodeName: S.String,
    timestamp: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    satisfiedConditions: SatisfiedConditions,
  }),
).annotate({
  identifier: "ConditionResultEvent",
}) as any as S.Schema<ConditionResultEvent>;
export type NodeErrorCode =
  | "VALIDATION"
  | "DEPENDENCY_FAILED"
  | "BAD_GATEWAY"
  | "INTERNAL_SERVER"
  | (string & {});
export const NodeErrorCode = S.String;

export interface NodeFailureEvent {
  nodeName: string;
  timestamp: Date;
  errorCode: NodeErrorCode;
  errorMessage: string;
}
export const NodeFailureEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodeName: S.String,
    timestamp: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    errorCode: NodeErrorCode,
    errorMessage: S.String,
  }),
).annotate({
  identifier: "NodeFailureEvent",
}) as any as S.Schema<NodeFailureEvent>;
export type FlowErrorCode =
  | "VALIDATION"
  | "INTERNAL_SERVER"
  | "NODE_EXECUTION_FAILED"
  | (string & {});
export const FlowErrorCode = S.String;

export interface FlowFailureEvent {
  timestamp: Date;
  errorCode: FlowErrorCode;
  errorMessage: string;
}
export const FlowFailureEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timestamp: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    errorCode: FlowErrorCode,
    errorMessage: S.String,
  }),
).annotate({
  identifier: "FlowFailureEvent",
}) as any as S.Schema<FlowFailureEvent>;
export interface NodeActionEvent {
  nodeName: string;
  timestamp: Date;
  requestId: string;
  serviceName: string;
  operationName: string;
  operationRequest?: any;
  operationResponse?: any;
}
export const NodeActionEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodeName: S.String,
    timestamp: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    requestId: S.String,
    serviceName: S.String,
    operationName: S.String,
    operationRequest: S.optional(S.Any),
    operationResponse: S.optional(S.Any),
  }),
).annotate({
  identifier: "NodeActionEvent",
}) as any as S.Schema<NodeActionEvent>;
export type NodeTraceElements = { agentTraces: TracePart[] };
export const NodeTraceElements = /*@__PURE__*/ S.Union([
  S.Struct({ agentTraces: AgentTraces }),
]);
export interface NodeDependencyEvent {
  nodeName: string;
  timestamp: Date;
  traceElements: NodeTraceElements;
}
export const NodeDependencyEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodeName: S.String,
    timestamp: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    traceElements: NodeTraceElements,
  }),
).annotate({
  identifier: "NodeDependencyEvent",
}) as any as S.Schema<NodeDependencyEvent>;
export type FlowExecutionEvent =
  | {
      flowInputEvent: FlowExecutionInputEvent;
      flowOutputEvent?: never;
      nodeInputEvent?: never;
      nodeOutputEvent?: never;
      conditionResultEvent?: never;
      nodeFailureEvent?: never;
      flowFailureEvent?: never;
      nodeActionEvent?: never;
      nodeDependencyEvent?: never;
    }
  | {
      flowInputEvent?: never;
      flowOutputEvent: FlowExecutionOutputEvent;
      nodeInputEvent?: never;
      nodeOutputEvent?: never;
      conditionResultEvent?: never;
      nodeFailureEvent?: never;
      flowFailureEvent?: never;
      nodeActionEvent?: never;
      nodeDependencyEvent?: never;
    }
  | {
      flowInputEvent?: never;
      flowOutputEvent?: never;
      nodeInputEvent: NodeInputEvent;
      nodeOutputEvent?: never;
      conditionResultEvent?: never;
      nodeFailureEvent?: never;
      flowFailureEvent?: never;
      nodeActionEvent?: never;
      nodeDependencyEvent?: never;
    }
  | {
      flowInputEvent?: never;
      flowOutputEvent?: never;
      nodeInputEvent?: never;
      nodeOutputEvent: NodeOutputEvent;
      conditionResultEvent?: never;
      nodeFailureEvent?: never;
      flowFailureEvent?: never;
      nodeActionEvent?: never;
      nodeDependencyEvent?: never;
    }
  | {
      flowInputEvent?: never;
      flowOutputEvent?: never;
      nodeInputEvent?: never;
      nodeOutputEvent?: never;
      conditionResultEvent: ConditionResultEvent;
      nodeFailureEvent?: never;
      flowFailureEvent?: never;
      nodeActionEvent?: never;
      nodeDependencyEvent?: never;
    }
  | {
      flowInputEvent?: never;
      flowOutputEvent?: never;
      nodeInputEvent?: never;
      nodeOutputEvent?: never;
      conditionResultEvent?: never;
      nodeFailureEvent: NodeFailureEvent;
      flowFailureEvent?: never;
      nodeActionEvent?: never;
      nodeDependencyEvent?: never;
    }
  | {
      flowInputEvent?: never;
      flowOutputEvent?: never;
      nodeInputEvent?: never;
      nodeOutputEvent?: never;
      conditionResultEvent?: never;
      nodeFailureEvent?: never;
      flowFailureEvent: FlowFailureEvent;
      nodeActionEvent?: never;
      nodeDependencyEvent?: never;
    }
  | {
      flowInputEvent?: never;
      flowOutputEvent?: never;
      nodeInputEvent?: never;
      nodeOutputEvent?: never;
      conditionResultEvent?: never;
      nodeFailureEvent?: never;
      flowFailureEvent?: never;
      nodeActionEvent: NodeActionEvent;
      nodeDependencyEvent?: never;
    }
  | {
      flowInputEvent?: never;
      flowOutputEvent?: never;
      nodeInputEvent?: never;
      nodeOutputEvent?: never;
      conditionResultEvent?: never;
      nodeFailureEvent?: never;
      flowFailureEvent?: never;
      nodeActionEvent?: never;
      nodeDependencyEvent: NodeDependencyEvent;
    };
export const FlowExecutionEvent = /*@__PURE__*/ S.Union([
  S.Struct({ flowInputEvent: FlowExecutionInputEvent }),
  S.Struct({ flowOutputEvent: FlowExecutionOutputEvent }),
  S.Struct({ nodeInputEvent: NodeInputEvent }),
  S.Struct({ nodeOutputEvent: NodeOutputEvent }),
  S.Struct({ conditionResultEvent: ConditionResultEvent }),
  S.Struct({ nodeFailureEvent: NodeFailureEvent }),
  S.Struct({ flowFailureEvent: FlowFailureEvent }),
  S.Struct({ nodeActionEvent: NodeActionEvent }),
  S.Struct({ nodeDependencyEvent: NodeDependencyEvent }),
]);
export type FlowExecutionEvents = FlowExecutionEvent[];
export const FlowExecutionEvents = /*@__PURE__*/ S.Array(FlowExecutionEvent);
export interface ListFlowExecutionEventsResponse {
  flowExecutionEvents: FlowExecutionEvent[];
  nextToken?: string;
}
export const ListFlowExecutionEventsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    flowExecutionEvents: FlowExecutionEvents,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFlowExecutionEventsResponse",
}) as any as S.Schema<ListFlowExecutionEventsResponse>;
export interface ListFlowExecutionsRequest {
  flowIdentifier: string;
  flowAliasIdentifier?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListFlowExecutionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    flowIdentifier: S.String.pipe(T.HttpLabel("flowIdentifier")),
    flowAliasIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("flowAliasIdentifier"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/flows/{flowIdentifier}/executions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFlowExecutionsRequest",
}) as any as S.Schema<ListFlowExecutionsRequest>;
export interface FlowExecutionSummary {
  executionArn: string;
  flowAliasIdentifier: string;
  flowIdentifier: string;
  flowVersion: string;
  status: FlowExecutionStatus;
  createdAt: Date;
  endedAt?: Date;
}
export const FlowExecutionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionArn: S.String,
    flowAliasIdentifier: S.String,
    flowIdentifier: S.String,
    flowVersion: S.String,
    status: FlowExecutionStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({
  identifier: "FlowExecutionSummary",
}) as any as S.Schema<FlowExecutionSummary>;
export type FlowExecutionSummaries = FlowExecutionSummary[];
export const FlowExecutionSummaries =
  /*@__PURE__*/ S.Array(FlowExecutionSummary);
export interface ListFlowExecutionsResponse {
  flowExecutionSummaries: FlowExecutionSummary[];
  nextToken?: string;
}
export const ListFlowExecutionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    flowExecutionSummaries: FlowExecutionSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFlowExecutionsResponse",
}) as any as S.Schema<ListFlowExecutionsResponse>;
export interface ListInvocationsRequest {
  nextToken?: string;
  maxResults?: number;
  sessionIdentifier: string;
}
export const ListInvocationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    sessionIdentifier: S.String.pipe(T.HttpLabel("sessionIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sessions/{sessionIdentifier}/invocations/",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListInvocationsRequest",
}) as any as S.Schema<ListInvocationsRequest>;
export interface InvocationSummary {
  sessionId: string;
  invocationId: string;
  createdAt: Date;
}
export const InvocationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.String,
    invocationId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "InvocationSummary",
}) as any as S.Schema<InvocationSummary>;
export type InvocationSummaries = InvocationSummary[];
export const InvocationSummaries = /*@__PURE__*/ S.Array(InvocationSummary);
export interface ListInvocationsResponse {
  invocationSummaries: InvocationSummary[];
  nextToken?: string;
}
export const ListInvocationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    invocationSummaries: InvocationSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListInvocationsResponse",
}) as any as S.Schema<ListInvocationsResponse>;
export interface ListInvocationStepsRequest {
  invocationIdentifier?: string;
  nextToken?: string;
  maxResults?: number;
  sessionIdentifier: string;
}
export const ListInvocationStepsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    invocationIdentifier: S.optional(S.String),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    sessionIdentifier: S.String.pipe(T.HttpLabel("sessionIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sessions/{sessionIdentifier}/invocationSteps/",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListInvocationStepsRequest",
}) as any as S.Schema<ListInvocationStepsRequest>;
export interface InvocationStepSummary {
  sessionId: string;
  invocationId: string;
  invocationStepId: string;
  invocationStepTime: Date;
}
export const InvocationStepSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.String,
    invocationId: S.String,
    invocationStepId: S.String,
    invocationStepTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "InvocationStepSummary",
}) as any as S.Schema<InvocationStepSummary>;
export type InvocationStepSummaries = InvocationStepSummary[];
export const InvocationStepSummaries = /*@__PURE__*/ S.Array(
  InvocationStepSummary,
);
export interface ListInvocationStepsResponse {
  invocationStepSummaries: InvocationStepSummary[];
  nextToken?: string;
}
export const ListInvocationStepsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    invocationStepSummaries: InvocationStepSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListInvocationStepsResponse",
}) as any as S.Schema<ListInvocationStepsResponse>;
export interface ListSessionsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListSessionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/sessions/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSessionsRequest",
}) as any as S.Schema<ListSessionsRequest>;
export interface SessionSummary {
  sessionId: string;
  sessionArn: string;
  sessionStatus: SessionStatus;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export const SessionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.String,
    sessionArn: S.String,
    sessionStatus: SessionStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({ identifier: "SessionSummary" }) as any as S.Schema<SessionSummary>;
export type SessionSummaries = SessionSummary[];
export const SessionSummaries = /*@__PURE__*/ S.Array(SessionSummary);
export interface ListSessionsResponse {
  sessionSummaries: SessionSummary[];
  nextToken?: string;
}
export const ListSessionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionSummaries: SessionSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSessionsResponse",
}) as any as S.Schema<ListSessionsResponse>;
export type TaggableResourcesArn = string;
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
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagsMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TextPrompt {
  text: string;
}
export const TextPrompt = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ text: S.String }),
).annotate({ identifier: "TextPrompt" }) as any as S.Schema<TextPrompt>;
export type InputPrompt = { textPrompt: TextPrompt };
export const InputPrompt = /*@__PURE__*/ S.Union([
  S.Struct({ textPrompt: TextPrompt }),
]);
export interface OptimizePromptRequest {
  input: InputPrompt;
  targetModelId: string;
}
export const OptimizePromptRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ input: InputPrompt, targetModelId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/optimize-prompt" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "OptimizePromptRequest",
}) as any as S.Schema<OptimizePromptRequest>;
export type OptimizedPrompt = { textPrompt: TextPrompt };
export const OptimizedPrompt = /*@__PURE__*/ S.Union([
  S.Struct({ textPrompt: TextPrompt }),
]);
export interface OptimizedPromptEvent {
  optimizedPrompt?: OptimizedPrompt;
}
export const OptimizedPromptEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optimizedPrompt: S.optional(OptimizedPrompt) }),
).annotate({
  identifier: "OptimizedPromptEvent",
}) as any as S.Schema<OptimizedPromptEvent>;
export interface AnalyzePromptEvent {
  message?: string;
}
export const AnalyzePromptEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.optional(S.String) }),
).annotate({
  identifier: "AnalyzePromptEvent",
}) as any as S.Schema<AnalyzePromptEvent>;
export type OptimizedPromptStream =
  | {
      optimizedPromptEvent: OptimizedPromptEvent;
      analyzePromptEvent?: never;
      internalServerException?: never;
      throttlingException?: never;
      validationException?: never;
      dependencyFailedException?: never;
      accessDeniedException?: never;
      badGatewayException?: never;
    }
  | {
      optimizedPromptEvent?: never;
      analyzePromptEvent: AnalyzePromptEvent;
      internalServerException?: never;
      throttlingException?: never;
      validationException?: never;
      dependencyFailedException?: never;
      accessDeniedException?: never;
      badGatewayException?: never;
    }
  | {
      optimizedPromptEvent?: never;
      analyzePromptEvent?: never;
      internalServerException: InternalServerException;
      throttlingException?: never;
      validationException?: never;
      dependencyFailedException?: never;
      accessDeniedException?: never;
      badGatewayException?: never;
    }
  | {
      optimizedPromptEvent?: never;
      analyzePromptEvent?: never;
      internalServerException?: never;
      throttlingException: ThrottlingException;
      validationException?: never;
      dependencyFailedException?: never;
      accessDeniedException?: never;
      badGatewayException?: never;
    }
  | {
      optimizedPromptEvent?: never;
      analyzePromptEvent?: never;
      internalServerException?: never;
      throttlingException?: never;
      validationException: ValidationException;
      dependencyFailedException?: never;
      accessDeniedException?: never;
      badGatewayException?: never;
    }
  | {
      optimizedPromptEvent?: never;
      analyzePromptEvent?: never;
      internalServerException?: never;
      throttlingException?: never;
      validationException?: never;
      dependencyFailedException: DependencyFailedException;
      accessDeniedException?: never;
      badGatewayException?: never;
    }
  | {
      optimizedPromptEvent?: never;
      analyzePromptEvent?: never;
      internalServerException?: never;
      throttlingException?: never;
      validationException?: never;
      dependencyFailedException?: never;
      accessDeniedException: AccessDeniedException;
      badGatewayException?: never;
    }
  | {
      optimizedPromptEvent?: never;
      analyzePromptEvent?: never;
      internalServerException?: never;
      throttlingException?: never;
      validationException?: never;
      dependencyFailedException?: never;
      accessDeniedException?: never;
      badGatewayException: BadGatewayException;
    };
export const OptimizedPromptStream = /*@__PURE__*/ T.EventStream(
  S.Union([
    S.Struct({ optimizedPromptEvent: OptimizedPromptEvent }),
    S.Struct({ analyzePromptEvent: AnalyzePromptEvent }),
    S.Struct({
      internalServerException: S.suspend(
        () => InternalServerException,
      ).annotate({ identifier: "InternalServerException" }),
    }),
    S.Struct({
      throttlingException: S.suspend(() => ThrottlingException).annotate({
        identifier: "ThrottlingException",
      }),
    }),
    S.Struct({
      validationException: S.suspend(() => ValidationException).annotate({
        identifier: "ValidationException",
      }),
    }),
    S.Struct({
      dependencyFailedException: S.suspend(
        () => DependencyFailedException,
      ).annotate({ identifier: "DependencyFailedException" }),
    }),
    S.Struct({
      accessDeniedException: S.suspend(() => AccessDeniedException).annotate({
        identifier: "AccessDeniedException",
      }),
    }),
    S.Struct({
      badGatewayException: S.suspend(() => BadGatewayException).annotate({
        identifier: "BadGatewayException",
      }),
    }),
  ]),
) as any as S.Schema<stream.Stream<OptimizedPromptStream, Error, never>>;
export interface OptimizePromptResponse {
  optimizedPrompt: stream.Stream<OptimizedPromptStream, Error, never>;
}
export const OptimizePromptResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optimizedPrompt: OptimizedPromptStream.pipe(T.HttpPayload()) }),
).annotate({
  identifier: "OptimizePromptResponse",
}) as any as S.Schema<OptimizePromptResponse>;
export interface PutInvocationStepRequest {
  sessionIdentifier: string;
  invocationIdentifier: string;
  invocationStepTime: Date;
  payload: InvocationStepPayload;
  invocationStepId?: string;
}
export const PutInvocationStepRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionIdentifier: S.String.pipe(T.HttpLabel("sessionIdentifier")),
    invocationIdentifier: S.String,
    invocationStepTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    payload: InvocationStepPayload,
    invocationStepId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/sessions/{sessionIdentifier}/invocationSteps/",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutInvocationStepRequest",
}) as any as S.Schema<PutInvocationStepRequest>;
export interface PutInvocationStepResponse {
  invocationStepId: string;
}
export const PutInvocationStepResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ invocationStepId: S.String }),
).annotate({
  identifier: "PutInvocationStepResponse",
}) as any as S.Schema<PutInvocationStepResponse>;
export type RerankQueryContentType = "TEXT" | (string & {});
export const RerankQueryContentType = S.String;

export interface RerankTextDocument {
  text?: string;
}
export const RerankTextDocument = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ text: S.optional(S.String) }),
).annotate({
  identifier: "RerankTextDocument",
}) as any as S.Schema<RerankTextDocument>;
export interface RerankQuery {
  type: RerankQueryContentType;
  textQuery: RerankTextDocument;
}
export const RerankQuery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: RerankQueryContentType, textQuery: RerankTextDocument }),
).annotate({ identifier: "RerankQuery" }) as any as S.Schema<RerankQuery>;
export type RerankQueriesList = RerankQuery[];
export const RerankQueriesList = /*@__PURE__*/ S.Array(RerankQuery);
export type RerankSourceType = "INLINE" | (string & {});
export const RerankSourceType = S.String;

export type RerankDocumentType = "TEXT" | "JSON" | (string & {});
export const RerankDocumentType = S.String;

export interface RerankDocument {
  type: RerankDocumentType;
  textDocument?: RerankTextDocument;
  jsonDocument?: any;
}
export const RerankDocument = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: RerankDocumentType,
    textDocument: S.optional(RerankTextDocument),
    jsonDocument: S.optional(S.Any),
  }),
).annotate({ identifier: "RerankDocument" }) as any as S.Schema<RerankDocument>;
export interface RerankSource {
  type: RerankSourceType;
  inlineDocumentSource: RerankDocument;
}
export const RerankSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: RerankSourceType, inlineDocumentSource: RerankDocument }),
).annotate({ identifier: "RerankSource" }) as any as S.Schema<RerankSource>;
export type RerankSourcesList = RerankSource[];
export const RerankSourcesList = /*@__PURE__*/ S.Array(RerankSource);
export type RerankingConfigurationType =
  | "BEDROCK_RERANKING_MODEL"
  | (string & {});
export const RerankingConfigurationType = S.String;

export interface BedrockRerankingModelConfiguration {
  modelArn: string;
  additionalModelRequestFields?: { [key: string]: any | undefined };
}
export const BedrockRerankingModelConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelArn: S.String,
    additionalModelRequestFields: S.optional(AdditionalModelRequestFields),
  }),
).annotate({
  identifier: "BedrockRerankingModelConfiguration",
}) as any as S.Schema<BedrockRerankingModelConfiguration>;
export interface BedrockRerankingConfiguration {
  numberOfResults?: number;
  modelConfiguration: BedrockRerankingModelConfiguration;
}
export const BedrockRerankingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    numberOfResults: S.optional(S.Number),
    modelConfiguration: BedrockRerankingModelConfiguration,
  }),
).annotate({
  identifier: "BedrockRerankingConfiguration",
}) as any as S.Schema<BedrockRerankingConfiguration>;
export interface RerankingConfiguration {
  type: RerankingConfigurationType;
  bedrockRerankingConfiguration: BedrockRerankingConfiguration;
}
export const RerankingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: RerankingConfigurationType,
    bedrockRerankingConfiguration: BedrockRerankingConfiguration,
  }),
).annotate({
  identifier: "RerankingConfiguration",
}) as any as S.Schema<RerankingConfiguration>;
export interface RerankRequest {
  queries: RerankQuery[];
  sources: RerankSource[];
  rerankingConfiguration: RerankingConfiguration;
  nextToken?: string;
}
export const RerankRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queries: RerankQueriesList,
    sources: RerankSourcesList,
    rerankingConfiguration: RerankingConfiguration,
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/rerank" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "RerankRequest" }) as any as S.Schema<RerankRequest>;
export interface RerankResult {
  index: number;
  relevanceScore: number;
  document?: RerankDocument;
}
export const RerankResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    index: S.Number,
    relevanceScore: S.Number,
    document: S.optional(RerankDocument),
  }),
).annotate({ identifier: "RerankResult" }) as any as S.Schema<RerankResult>;
export type RerankResultsList = RerankResult[];
export const RerankResultsList = /*@__PURE__*/ S.Array(RerankResult);
export interface RerankResponse {
  results: RerankResult[];
  nextToken?: string;
}
export const RerankResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ results: RerankResultsList, nextToken: S.optional(S.String) }),
).annotate({ identifier: "RerankResponse" }) as any as S.Schema<RerankResponse>;
export type KnowledgeBaseQueryType = "TEXT" | "IMAGE" | (string & {});
export const KnowledgeBaseQueryType = S.String;

export type InputImageFormat = "png" | "jpeg" | "gif" | "webp" | (string & {});
export const InputImageFormat = S.String;

export interface InputImage {
  format: InputImageFormat;
  inlineContent: Uint8Array | redacted.Redacted<Uint8Array>;
}
export const InputImage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ format: InputImageFormat, inlineContent: SensitiveBlob }),
).annotate({ identifier: "InputImage" }) as any as S.Schema<InputImage>;
export interface KnowledgeBaseQuery {
  type?: KnowledgeBaseQueryType;
  text?: string;
  image?: InputImage;
}
export const KnowledgeBaseQuery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(KnowledgeBaseQueryType),
    text: S.optional(S.String),
    image: S.optional(InputImage),
  }),
).annotate({
  identifier: "KnowledgeBaseQuery",
}) as any as S.Schema<KnowledgeBaseQuery>;
export interface GuardrailConfiguration {
  guardrailId: string;
  guardrailVersion: string;
}
export const GuardrailConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ guardrailId: S.String, guardrailVersion: S.String }),
).annotate({
  identifier: "GuardrailConfiguration",
}) as any as S.Schema<GuardrailConfiguration>;
export interface RetrieveRequest {
  knowledgeBaseId: string;
  retrievalQuery: KnowledgeBaseQuery;
  retrievalConfiguration?: KnowledgeBaseRetrievalConfiguration;
  guardrailConfiguration?: GuardrailConfiguration;
  nextToken?: string;
  userContext?: UserContext;
}
export const RetrieveRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
    retrievalQuery: KnowledgeBaseQuery,
    retrievalConfiguration: S.optional(KnowledgeBaseRetrievalConfiguration),
    guardrailConfiguration: S.optional(GuardrailConfiguration),
    nextToken: S.optional(S.String),
    userContext: S.optional(UserContext),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/knowledgebases/{knowledgeBaseId}/retrieve",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RetrieveRequest",
}) as any as S.Schema<RetrieveRequest>;
export interface KnowledgeBaseRetrievalResult {
  content: RetrievalResultContent;
  location?: RetrievalResultLocation;
  score?: number;
  metadata?: { [key: string]: any | undefined };
  documentId?: string;
}
export const KnowledgeBaseRetrievalResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    content: RetrievalResultContent,
    location: S.optional(RetrievalResultLocation),
    score: S.optional(S.Number),
    metadata: S.optional(RetrievalResultMetadata),
    documentId: S.optional(S.String),
  }),
).annotate({
  identifier: "KnowledgeBaseRetrievalResult",
}) as any as S.Schema<KnowledgeBaseRetrievalResult>;
export type KnowledgeBaseRetrievalResults = KnowledgeBaseRetrievalResult[];
export const KnowledgeBaseRetrievalResults = /*@__PURE__*/ S.Array(
  KnowledgeBaseRetrievalResult,
);
export type GuadrailAction = "INTERVENED" | "NONE" | (string & {});
export const GuadrailAction = S.String;

export interface RetrieveResponse {
  retrievalResults: KnowledgeBaseRetrievalResult[];
  guardrailAction?: GuadrailAction;
  nextToken?: string;
}
export const RetrieveResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    retrievalResults: KnowledgeBaseRetrievalResults,
    guardrailAction: S.optional(GuadrailAction),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "RetrieveResponse",
}) as any as S.Schema<RetrieveResponse>;
export interface RetrieveAndGenerateInput {
  text: string;
}
export const RetrieveAndGenerateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ text: S.String }),
).annotate({
  identifier: "RetrieveAndGenerateInput",
}) as any as S.Schema<RetrieveAndGenerateInput>;
export type RetrieveAndGenerateType =
  | "KNOWLEDGE_BASE"
  | "EXTERNAL_SOURCES"
  | (string & {});
export const RetrieveAndGenerateType = S.String;

export type TextPromptTemplate = string | redacted.Redacted<string>;
export interface PromptTemplate {
  textPromptTemplate?: string | redacted.Redacted<string>;
}
export const PromptTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ textPromptTemplate: S.optional(SensitiveString) }),
).annotate({ identifier: "PromptTemplate" }) as any as S.Schema<PromptTemplate>;
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
export interface InferenceConfig {
  textInferenceConfig?: TextInferenceConfig;
}
export const InferenceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ textInferenceConfig: S.optional(TextInferenceConfig) }),
).annotate({
  identifier: "InferenceConfig",
}) as any as S.Schema<InferenceConfig>;
export interface GenerationConfiguration {
  promptTemplate?: PromptTemplate;
  guardrailConfiguration?: GuardrailConfiguration;
  inferenceConfig?: InferenceConfig;
  additionalModelRequestFields?: { [key: string]: any | undefined };
  performanceConfig?: PerformanceConfiguration;
}
export const GenerationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    promptTemplate: S.optional(PromptTemplate),
    guardrailConfiguration: S.optional(GuardrailConfiguration),
    inferenceConfig: S.optional(InferenceConfig),
    additionalModelRequestFields: S.optional(AdditionalModelRequestFields),
    performanceConfig: S.optional(PerformanceConfiguration),
  }),
).annotate({
  identifier: "GenerationConfiguration",
}) as any as S.Schema<GenerationConfiguration>;
export type QueryTransformationType = "QUERY_DECOMPOSITION" | (string & {});
export const QueryTransformationType = S.String;

export interface QueryTransformationConfiguration {
  type: QueryTransformationType;
}
export const QueryTransformationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: QueryTransformationType }),
).annotate({
  identifier: "QueryTransformationConfiguration",
}) as any as S.Schema<QueryTransformationConfiguration>;
export interface OrchestrationConfiguration {
  promptTemplate?: PromptTemplate;
  inferenceConfig?: InferenceConfig;
  additionalModelRequestFields?: { [key: string]: any | undefined };
  queryTransformationConfiguration?: QueryTransformationConfiguration;
  performanceConfig?: PerformanceConfiguration;
}
export const OrchestrationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    promptTemplate: S.optional(PromptTemplate),
    inferenceConfig: S.optional(InferenceConfig),
    additionalModelRequestFields: S.optional(AdditionalModelRequestFields),
    queryTransformationConfiguration: S.optional(
      QueryTransformationConfiguration,
    ),
    performanceConfig: S.optional(PerformanceConfiguration),
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
export const ExternalSourceType = S.String;

export interface S3ObjectDoc {
  uri: string;
}
export const S3ObjectDoc = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ uri: S.String }),
).annotate({ identifier: "S3ObjectDoc" }) as any as S.Schema<S3ObjectDoc>;
export type Identifier = string | redacted.Redacted<string>;
export type ContentType = string;
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
  inferenceConfig?: InferenceConfig;
  additionalModelRequestFields?: { [key: string]: any | undefined };
  performanceConfig?: PerformanceConfiguration;
}
export const ExternalSourcesGenerationConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      promptTemplate: S.optional(PromptTemplate),
      guardrailConfiguration: S.optional(GuardrailConfiguration),
      inferenceConfig: S.optional(InferenceConfig),
      additionalModelRequestFields: S.optional(AdditionalModelRequestFields),
      performanceConfig: S.optional(PerformanceConfiguration),
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
export interface RetrieveAndGenerateSessionConfiguration {
  kmsKeyArn: string;
}
export const RetrieveAndGenerateSessionConfiguration = /*@__PURE__*/ S.suspend(
  () => S.Struct({ kmsKeyArn: S.String }),
).annotate({
  identifier: "RetrieveAndGenerateSessionConfiguration",
}) as any as S.Schema<RetrieveAndGenerateSessionConfiguration>;
export interface RetrieveAndGenerateRequest {
  sessionId?: string;
  input: RetrieveAndGenerateInput;
  retrieveAndGenerateConfiguration?: RetrieveAndGenerateConfiguration;
  sessionConfiguration?: RetrieveAndGenerateSessionConfiguration;
  userContext?: UserContext;
}
export const RetrieveAndGenerateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.optional(S.String),
    input: RetrieveAndGenerateInput,
    retrieveAndGenerateConfiguration: S.optional(
      RetrieveAndGenerateConfiguration,
    ),
    sessionConfiguration: S.optional(RetrieveAndGenerateSessionConfiguration),
    userContext: S.optional(UserContext),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/retrieveAndGenerate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RetrieveAndGenerateRequest",
}) as any as S.Schema<RetrieveAndGenerateRequest>;
export interface RetrieveAndGenerateOutput {
  text: string;
}
export const RetrieveAndGenerateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ text: S.String }),
).annotate({
  identifier: "RetrieveAndGenerateOutput",
}) as any as S.Schema<RetrieveAndGenerateOutput>;
export interface RetrieveAndGenerateResponse {
  sessionId: string;
  output: RetrieveAndGenerateOutput;
  citations?: Citation[];
  guardrailAction?: GuadrailAction;
}
export const RetrieveAndGenerateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.String,
    output: RetrieveAndGenerateOutput,
    citations: S.optional(Citations),
    guardrailAction: S.optional(GuadrailAction),
  }),
).annotate({
  identifier: "RetrieveAndGenerateResponse",
}) as any as S.Schema<RetrieveAndGenerateResponse>;
export interface RetrieveAndGenerateStreamRequest {
  sessionId?: string;
  input: RetrieveAndGenerateInput;
  retrieveAndGenerateConfiguration?: RetrieveAndGenerateConfiguration;
  sessionConfiguration?: RetrieveAndGenerateSessionConfiguration;
  userContext?: UserContext;
}
export const RetrieveAndGenerateStreamRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.optional(S.String),
    input: RetrieveAndGenerateInput,
    retrieveAndGenerateConfiguration: S.optional(
      RetrieveAndGenerateConfiguration,
    ),
    sessionConfiguration: S.optional(RetrieveAndGenerateSessionConfiguration),
    userContext: S.optional(UserContext),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/retrieveAndGenerateStream" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RetrieveAndGenerateStreamRequest",
}) as any as S.Schema<RetrieveAndGenerateStreamRequest>;
export interface RetrieveAndGenerateOutputEvent {
  text: string;
}
export const RetrieveAndGenerateOutputEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ text: S.String }),
).annotate({
  identifier: "RetrieveAndGenerateOutputEvent",
}) as any as S.Schema<RetrieveAndGenerateOutputEvent>;
export interface CitationEvent {
  citation?: Citation;
  generatedResponsePart?: GeneratedResponsePart;
  retrievedReferences?: RetrievedReference[];
}
export const CitationEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    citation: S.optional(Citation),
    generatedResponsePart: S.optional(GeneratedResponsePart),
    retrievedReferences: S.optional(RetrievedReferences),
  }),
).annotate({ identifier: "CitationEvent" }) as any as S.Schema<CitationEvent>;
export interface GuardrailEvent {
  action?: GuadrailAction;
}
export const GuardrailEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ action: S.optional(GuadrailAction) }),
).annotate({ identifier: "GuardrailEvent" }) as any as S.Schema<GuardrailEvent>;
export type RetrieveAndGenerateStreamResponseOutput =
  | {
      output: RetrieveAndGenerateOutputEvent;
      citation?: never;
      guardrail?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      output?: never;
      citation: CitationEvent;
      guardrail?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      output?: never;
      citation?: never;
      guardrail: GuardrailEvent;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      output?: never;
      citation?: never;
      guardrail?: never;
      internalServerException: InternalServerException;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      output?: never;
      citation?: never;
      guardrail?: never;
      internalServerException?: never;
      validationException: ValidationException;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      output?: never;
      citation?: never;
      guardrail?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException: ResourceNotFoundException;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      output?: never;
      citation?: never;
      guardrail?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException: ServiceQuotaExceededException;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      output?: never;
      citation?: never;
      guardrail?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException: ThrottlingException;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      output?: never;
      citation?: never;
      guardrail?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException: AccessDeniedException;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      output?: never;
      citation?: never;
      guardrail?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException: ConflictException;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      output?: never;
      citation?: never;
      guardrail?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException: DependencyFailedException;
      badGatewayException?: never;
    }
  | {
      output?: never;
      citation?: never;
      guardrail?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException: BadGatewayException;
    };
export const RetrieveAndGenerateStreamResponseOutput =
  /*@__PURE__*/ T.EventStream(
    S.Union([
      S.Struct({ output: RetrieveAndGenerateOutputEvent }),
      S.Struct({ citation: CitationEvent }),
      S.Struct({ guardrail: GuardrailEvent }),
      S.Struct({
        internalServerException: S.suspend(
          () => InternalServerException,
        ).annotate({ identifier: "InternalServerException" }),
      }),
      S.Struct({
        validationException: S.suspend(() => ValidationException).annotate({
          identifier: "ValidationException",
        }),
      }),
      S.Struct({
        resourceNotFoundException: S.suspend(
          () => ResourceNotFoundException,
        ).annotate({ identifier: "ResourceNotFoundException" }),
      }),
      S.Struct({
        serviceQuotaExceededException: S.suspend(
          () => ServiceQuotaExceededException,
        ).annotate({ identifier: "ServiceQuotaExceededException" }),
      }),
      S.Struct({
        throttlingException: S.suspend(() => ThrottlingException).annotate({
          identifier: "ThrottlingException",
        }),
      }),
      S.Struct({
        accessDeniedException: S.suspend(() => AccessDeniedException).annotate({
          identifier: "AccessDeniedException",
        }),
      }),
      S.Struct({
        conflictException: S.suspend(() => ConflictException).annotate({
          identifier: "ConflictException",
        }),
      }),
      S.Struct({
        dependencyFailedException: S.suspend(
          () => DependencyFailedException,
        ).annotate({ identifier: "DependencyFailedException" }),
      }),
      S.Struct({
        badGatewayException: S.suspend(() => BadGatewayException).annotate({
          identifier: "BadGatewayException",
        }),
      }),
    ]),
  ) as any as S.Schema<
    stream.Stream<RetrieveAndGenerateStreamResponseOutput, Error, never>
  >;
export interface RetrieveAndGenerateStreamResponse {
  stream: stream.Stream<RetrieveAndGenerateStreamResponseOutput, Error, never>;
  sessionId: string;
}
export const RetrieveAndGenerateStreamResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stream: RetrieveAndGenerateStreamResponseOutput.pipe(T.HttpPayload()),
    sessionId: S.String.pipe(
      T.HttpHeader("x-amzn-bedrock-knowledge-base-session-id"),
    ),
  }),
).annotate({
  identifier: "RetrieveAndGenerateStreamResponse",
}) as any as S.Schema<RetrieveAndGenerateStreamResponse>;
export type FlowExecutionName = string;
export interface StartFlowExecutionRequest {
  flowIdentifier: string;
  flowAliasIdentifier: string;
  flowExecutionName?: string;
  inputs: FlowInput[];
  modelPerformanceConfiguration?: ModelPerformanceConfiguration;
}
export const StartFlowExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    flowIdentifier: S.String.pipe(T.HttpLabel("flowIdentifier")),
    flowAliasIdentifier: S.String.pipe(T.HttpLabel("flowAliasIdentifier")),
    flowExecutionName: S.optional(S.String),
    inputs: FlowInputs,
    modelPerformanceConfiguration: S.optional(ModelPerformanceConfiguration),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/flows/{flowIdentifier}/aliases/{flowAliasIdentifier}/executions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartFlowExecutionRequest",
}) as any as S.Schema<StartFlowExecutionRequest>;
export interface StartFlowExecutionResponse {
  executionArn?: string;
}
export const StartFlowExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ executionArn: S.optional(S.String) }),
).annotate({
  identifier: "StartFlowExecutionResponse",
}) as any as S.Schema<StartFlowExecutionResponse>;
export interface StopFlowExecutionRequest {
  flowIdentifier: string;
  flowAliasIdentifier: string;
  executionIdentifier: string;
}
export const StopFlowExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    flowIdentifier: S.String.pipe(T.HttpLabel("flowIdentifier")),
    flowAliasIdentifier: S.String.pipe(T.HttpLabel("flowAliasIdentifier")),
    executionIdentifier: S.String.pipe(T.HttpLabel("executionIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/flows/{flowIdentifier}/aliases/{flowAliasIdentifier}/executions/{executionIdentifier}/stop",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopFlowExecutionRequest",
}) as any as S.Schema<StopFlowExecutionRequest>;
export interface StopFlowExecutionResponse {
  executionArn?: string;
  status: FlowExecutionStatus;
}
export const StopFlowExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ executionArn: S.optional(S.String), status: FlowExecutionStatus }),
).annotate({
  identifier: "StopFlowExecutionResponse",
}) as any as S.Schema<StopFlowExecutionResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagsMap,
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
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateSessionRequest {
  sessionMetadata?: { [key: string]: string | undefined };
  sessionIdentifier: string;
}
export const UpdateSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionMetadata: S.optional(SessionMetadataMap),
    sessionIdentifier: S.String.pipe(T.HttpLabel("sessionIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/sessions/{sessionIdentifier}/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSessionRequest",
}) as any as S.Schema<UpdateSessionRequest>;
export interface UpdateSessionResponse {
  sessionId: string;
  sessionArn: string;
  sessionStatus: SessionStatus;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export const UpdateSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.String,
    sessionArn: S.String,
    sessionStatus: SessionStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "UpdateSessionResponse",
}) as any as S.Schema<UpdateSessionResponse>;
export type AgenticRetrieveStreamError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information from one or more knowledge bases using an agentic approach. Agentic retrieval uses a foundation model to intelligently decompose complex queries into sub-queries and iteratively retrieve relevant information from your knowledge bases. This approach improves retrieval accuracy for complex, multi-step questions that a single retrieval pass might not fully address.
 *
 * The operation returns results through a stream that includes retrieval results, trace events for visibility into the process, and a generated response synthesized from the results by default, which can be turned off.
 */
export const agenticRetrieveStream: API.OperationMethod<
  AgenticRetrieveStreamRequest,
  AgenticRetrieveStreamResponse,
  AgenticRetrieveStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AgenticRetrieveStreamRequest,
  output: AgenticRetrieveStreamResponse,
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AgenticRetrieveStream",
}));

export type CheckIngestedDocumentAclError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Checks whether a user has access to a specific document by verifying against the ingested access control list (ACL) in a knowledge base. Use this operation to validate that document-level access control is working as expected after ingestion. To use this operation, you must have the `bedrock:CheckIngestedDocumentAcl` permission.
 */
export const checkIngestedDocumentAcl: API.OperationMethod<
  CheckIngestedDocumentAclRequest,
  CheckIngestedDocumentAclResponse,
  CheckIngestedDocumentAclError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CheckIngestedDocumentAclRequest,
  output: CheckIngestedDocumentAclResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CheckIngestedDocumentAcl",
}));

export type CreateInvocationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new invocation within a session. An invocation groups the related invocation steps that store the content from a conversation. For more information about sessions, see Store and retrieve conversation history and context with Amazon Bedrock sessions.
 *
 * Related APIs
 *
 * - ListInvocations
 *
 * - ListSessions
 *
 * - GetSession
 */
export const createInvocation: API.OperationMethod<
  CreateInvocationRequest,
  CreateInvocationResponse,
  CreateInvocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateInvocationRequest,
  output: CreateInvocationResponse,
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
  operationName: "CreateInvocation",
}));

export type CreateSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a session to temporarily store conversations for generative AI (GenAI) applications built with open-source frameworks such as LangGraph and LlamaIndex. Sessions enable you to save the state of conversations at checkpoints, with the added security and infrastructure of Amazon Web Services. For more information, see Store and retrieve conversation history and context with Amazon Bedrock sessions.
 *
 * By default, Amazon Bedrock uses Amazon Web Services-managed keys for session encryption, including session metadata, or you can use your own KMS key. For more information, see Amazon Bedrock session encryption.
 *
 * You use a session to store state and conversation history for generative AI applications built with open-source frameworks. For Amazon Bedrock Agents, the service automatically manages conversation context and associates them with the agent-specific sessionId you specify in the InvokeAgent API operation.
 *
 * Related APIs:
 *
 * - ListSessions
 *
 * - GetSession
 *
 * - EndSession
 *
 * - DeleteSession
 */
export const createSession: API.OperationMethod<
  CreateSessionRequest,
  CreateSessionResponse,
  CreateSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSessionRequest,
  output: CreateSessionResponse,
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
  operationName: "CreateSession",
}));

export type DeleteAgentMemoryError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes memory from the specified memory identifier.
 */
export const deleteAgentMemory: API.OperationMethod<
  DeleteAgentMemoryRequest,
  DeleteAgentMemoryResponse,
  DeleteAgentMemoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAgentMemoryRequest,
  output: DeleteAgentMemoryResponse,
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAgentMemory",
}));

export type DeleteSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a session that you ended. You can't delete a session with an `ACTIVE` status. To delete an active session, you must first end it with the EndSession API operation. For more information about sessions, see Store and retrieve conversation history and context with Amazon Bedrock sessions.
 */
export const deleteSession: API.OperationMethod<
  DeleteSessionRequest,
  DeleteSessionResponse,
  DeleteSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSessionRequest,
  output: DeleteSessionResponse,
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
  operationName: "DeleteSession",
}));

export type EndSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Ends the session. After you end a session, you can still access its content but you can’t add to it. To delete the session and it's content, you use the DeleteSession API operation. For more information about sessions, see Store and retrieve conversation history and context with Amazon Bedrock sessions.
 */
export const endSession: API.OperationMethod<
  EndSessionRequest,
  EndSessionResponse,
  EndSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EndSessionRequest,
  output: EndSessionResponse,
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
  operationName: "EndSession",
}));

export type GenerateQueryError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Generates an SQL query from a natural language query. For more information, see Generate a query for structured data in the Amazon Bedrock User Guide.
 */
export const generateQuery: API.OperationMethod<
  GenerateQueryRequest,
  GenerateQueryResponse,
  GenerateQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GenerateQueryRequest,
  output: GenerateQueryResponse,
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateQuery",
}));

export type GetAgentMemoryError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the sessions stored in the memory of the agent.
 */
export const getAgentMemory: API.PaginatedOperationMethod<
  GetAgentMemoryRequest,
  GetAgentMemoryResponse,
  GetAgentMemoryError,
  Credentials | HttpClient.HttpClient,
  Memory
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetAgentMemoryRequest,
  output: GetAgentMemoryResponse,
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgentMemory",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "memoryContents",
    pageSize: "maxItems",
  } as const,
})) as any;

export type GetDocumentContentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the content of an ingested document from a knowledge base. Returns a pre-signed URL for secure document access.
 */
export const getDocumentContent: API.OperationMethod<
  GetDocumentContentRequest,
  GetDocumentContentResponse,
  GetDocumentContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDocumentContentRequest,
  output: GetDocumentContentResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocumentContent",
}));

export type GetExecutionFlowSnapshotError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the flow definition snapshot used for a flow execution. The snapshot represents the flow metadata and definition as it existed at the time the execution was started. Note that even if the flow is edited after an execution starts, the snapshot connected to the execution remains unchanged.
 *
 * Flow executions is in preview release for Amazon Bedrock and is subject to change.
 */
export const getExecutionFlowSnapshot: API.OperationMethod<
  GetExecutionFlowSnapshotRequest,
  GetExecutionFlowSnapshotResponse,
  GetExecutionFlowSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetExecutionFlowSnapshotRequest,
  output: GetExecutionFlowSnapshotResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExecutionFlowSnapshot",
}));

export type GetFlowExecutionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a specific flow execution, including its status, start and end times, and any errors that occurred during execution.
 */
export const getFlowExecution: API.OperationMethod<
  GetFlowExecutionRequest,
  GetFlowExecutionResponse,
  GetFlowExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFlowExecutionRequest,
  output: GetFlowExecutionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFlowExecution",
}));

export type GetIngestedDocumentAclError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the ingested access control list (ACL) for a specific document in a knowledge base. Use this operation to inspect the allow and deny lists that were ingested for a document to troubleshoot access control issues. To use this operation, you must have the `bedrock:GetIngestedDocumentAcl` permission.
 */
export const getIngestedDocumentAcl: API.OperationMethod<
  GetIngestedDocumentAclRequest,
  GetIngestedDocumentAclResponse,
  GetIngestedDocumentAclError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIngestedDocumentAclRequest,
  output: GetIngestedDocumentAclResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIngestedDocumentAcl",
}));

export type GetInvocationStepError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a specific invocation step within an invocation in a session. For more information about sessions, see Store and retrieve conversation history and context with Amazon Bedrock sessions.
 */
export const getInvocationStep: API.OperationMethod<
  GetInvocationStepRequest,
  GetInvocationStepResponse,
  GetInvocationStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInvocationStepRequest,
  output: GetInvocationStepResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInvocationStep",
}));

export type GetSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a specific session. For more information about sessions, see Store and retrieve conversation history and context with Amazon Bedrock sessions.
 */
export const getSession: API.OperationMethod<
  GetSessionRequest,
  GetSessionResponse,
  GetSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSessionRequest,
  output: GetSessionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSession",
}));

export type InvokeAgentError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ModelNotReadyException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Bedrock Agents (now Amazon Bedrock Agents Classic) is no longer open to new customers. For capabilities similar to Bedrock Agents Classic, explore Amazon Bedrock AgentCore. Existing customers can continue to use the service as normal. For more information, see Amazon Bedrock Agents Classic availability change.
 *
 * Sends a prompt for the agent to process and respond to. Note the following fields for the request:
 *
 * - To continue the same conversation with an agent, use the same `sessionId` value in the request.
 *
 * - To activate trace enablement, turn `enableTrace` to `true`. Trace enablement helps you follow the agent's reasoning process that led it to the information it processed, the actions it took, and the final result it yielded. For more information, see Trace enablement.
 *
 * - End a conversation by setting `endSession` to `true`.
 *
 * - In the `sessionState` object, you can include attributes for the session or prompt or, if you configured an action group to return control, results from invocation of the action group.
 *
 * The response contains both **chunk** and **trace** attributes.
 *
 * The final response is returned in the `bytes` field of the `chunk` object. The `InvokeAgent` returns one chunk for the entire interaction.
 *
 * - The `attribution` object contains citations for parts of the response.
 *
 * - If you set `enableTrace` to `true` in the request, you can trace the agent's steps and reasoning process that led it to the response.
 *
 * - If the action predicted was configured to return control, the response returns parameters for the action, elicited from the user, in the `returnControl` field.
 *
 * - Errors are also surfaced in the response.
 */
export const invokeAgent: API.OperationMethod<
  InvokeAgentRequest,
  InvokeAgentResponse,
  InvokeAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InvokeAgentRequest,
  output: InvokeAgentResponse,
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ModelNotReadyException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeAgent",
}));

export type InvokeFlowError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Invokes an alias of a flow to run the inputs that you specify and return the output of each node as a stream. If there's an error, the error is returned. For more information, see Test a flow in Amazon Bedrock in the Amazon Bedrock User Guide.
 *
 * The CLI doesn't support streaming operations in Amazon Bedrock, including `InvokeFlow`.
 */
export const invokeFlow: API.OperationMethod<
  InvokeFlowRequest,
  InvokeFlowResponse,
  InvokeFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InvokeFlowRequest,
  output: InvokeFlowResponse,
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeFlow",
}));

export type InvokeInlineAgentError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Invokes an inline Amazon Bedrock agent using the configurations you provide with the request.
 *
 * - Specify the following fields for security purposes.
 *
 * - (Optional) `customerEncryptionKeyArn` – The Amazon Resource Name (ARN) of a KMS key to encrypt the creation of the agent.
 *
 * - (Optional) `idleSessionTTLinSeconds` – Specify the number of seconds for which the agent should maintain session information. After this time expires, the subsequent `InvokeInlineAgent` request begins a new session.
 *
 * - To override the default prompt behavior for agent orchestration and to use advanced prompts, include a `promptOverrideConfiguration` object. For more information, see Advanced prompts.
 *
 * - The agent instructions will not be honored if your agent has only one knowledge base, uses default prompts, has no action group, and user input is disabled.
 */
export const invokeInlineAgent: API.OperationMethod<
  InvokeInlineAgentRequest,
  InvokeInlineAgentResponse,
  InvokeInlineAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InvokeInlineAgentRequest,
  output: InvokeInlineAgentResponse,
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeInlineAgent",
}));

export type ListFlowExecutionEventsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists events that occurred during a flow execution. Events provide detailed information about the execution progress, including node inputs and outputs, flow inputs and outputs, condition results, and failure events.
 *
 * Flow executions is in preview release for Amazon Bedrock and is subject to change.
 */
export const listFlowExecutionEvents: API.PaginatedOperationMethod<
  ListFlowExecutionEventsRequest,
  ListFlowExecutionEventsResponse,
  ListFlowExecutionEventsError,
  Credentials | HttpClient.HttpClient,
  FlowExecutionEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFlowExecutionEventsRequest,
  output: ListFlowExecutionEventsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFlowExecutionEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "flowExecutionEvents",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFlowExecutionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all executions of a flow. Results can be paginated and include summary information about each execution, such as status, start and end times, and the execution's Amazon Resource Name (ARN).
 *
 * Flow executions is in preview release for Amazon Bedrock and is subject to change.
 */
export const listFlowExecutions: API.PaginatedOperationMethod<
  ListFlowExecutionsRequest,
  ListFlowExecutionsResponse,
  ListFlowExecutionsError,
  Credentials | HttpClient.HttpClient,
  FlowExecutionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFlowExecutionsRequest,
  output: ListFlowExecutionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFlowExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "flowExecutionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListInvocationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all invocations associated with a specific session. For more information about sessions, see Store and retrieve conversation history and context with Amazon Bedrock sessions.
 */
export const listInvocations: API.PaginatedOperationMethod<
  ListInvocationsRequest,
  ListInvocationsResponse,
  ListInvocationsError,
  Credentials | HttpClient.HttpClient,
  InvocationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInvocationsRequest,
  output: ListInvocationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInvocations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "invocationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListInvocationStepsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all invocation steps associated with a session and optionally, an invocation within the session. For more information about sessions, see Store and retrieve conversation history and context with Amazon Bedrock sessions.
 */
export const listInvocationSteps: API.PaginatedOperationMethod<
  ListInvocationStepsRequest,
  ListInvocationStepsResponse,
  ListInvocationStepsError,
  Credentials | HttpClient.HttpClient,
  InvocationStepSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInvocationStepsRequest,
  output: ListInvocationStepsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInvocationSteps",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "invocationStepSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSessionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all sessions in your Amazon Web Services account. For more information about sessions, see Store and retrieve conversation history and context with Amazon Bedrock sessions.
 */
export const listSessions: API.PaginatedOperationMethod<
  ListSessionsRequest,
  ListSessionsResponse,
  ListSessionsError,
  Credentials | HttpClient.HttpClient,
  SessionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSessionsRequest,
  output: ListSessionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSessions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sessionSummaries",
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
 * List all the tags for the resource you specify.
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

export type OptimizePromptError =
  | AccessDeniedException
  | BadGatewayException
  | DependencyFailedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Optimizes a prompt for the task that you specify. For more information, see Optimize a prompt in the Amazon Bedrock User Guide.
 */
export const optimizePrompt: API.OperationMethod<
  OptimizePromptRequest,
  OptimizePromptResponse,
  OptimizePromptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: OptimizePromptRequest,
  output: OptimizePromptResponse,
  errors: [
    AccessDeniedException,
    BadGatewayException,
    DependencyFailedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "OptimizePrompt",
}));

export type PutInvocationStepError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Add an invocation step to an invocation in a session. An invocation step stores fine-grained state checkpoints, including text and images, for each interaction. For more information about sessions, see Store and retrieve conversation history and context with Amazon Bedrock sessions.
 *
 * Related APIs:
 *
 * - GetInvocationStep
 *
 * - ListInvocationSteps
 *
 * - ListInvocations
 *
 * - ListSessions
 */
export const putInvocationStep: API.OperationMethod<
  PutInvocationStepRequest,
  PutInvocationStepResponse,
  PutInvocationStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutInvocationStepRequest,
  output: PutInvocationStepResponse,
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
  operationName: "PutInvocationStep",
}));

export type RerankError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Reranks the relevance of sources based on queries. For more information, see Improve the relevance of query responses with a reranker model.
 */
export const rerank: API.PaginatedOperationMethod<
  RerankRequest,
  RerankResponse,
  RerankError,
  Credentials | HttpClient.HttpClient,
  RerankResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: RerankRequest,
  output: RerankResponse,
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Rerank",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "results",
  } as const,
})) as any;

export type RetrieveError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Queries a knowledge base and retrieves information from it.
 */
export const retrieve: API.PaginatedOperationMethod<
  RetrieveRequest,
  RetrieveResponse,
  RetrieveError,
  Credentials | HttpClient.HttpClient,
  KnowledgeBaseRetrievalResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: RetrieveRequest,
  output: RetrieveResponse,
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Retrieve",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "retrievalResults",
  } as const,
})) as any;

export type RetrieveAndGenerateError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Queries a knowledge base and generates responses based on the retrieved results and using the specified foundation model or inference profile. The response only cites sources that are relevant to the query.
 *
 * This API cannot be used with managed knowledge bases. Use AgenticRetrieveStream or Retrieve with managed knowledge bases.
 */
export const retrieveAndGenerate: API.OperationMethod<
  RetrieveAndGenerateRequest,
  RetrieveAndGenerateResponse,
  RetrieveAndGenerateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RetrieveAndGenerateRequest,
  output: RetrieveAndGenerateResponse,
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetrieveAndGenerate",
}));

export type RetrieveAndGenerateStreamError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Queries a knowledge base and generates responses based on the retrieved results, with output in streaming format.
 *
 * This API cannot be used with managed knowledge bases. Use AgenticRetrieveStream or Retrieve with managed knowledge bases.
 *
 * The CLI doesn't support streaming operations in Amazon Bedrock, including `InvokeModelWithResponseStream`.
 *
 * This operation requires permission for the ` bedrock:RetrieveAndGenerate` action.
 */
export const retrieveAndGenerateStream: API.OperationMethod<
  RetrieveAndGenerateStreamRequest,
  RetrieveAndGenerateStreamResponse,
  RetrieveAndGenerateStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RetrieveAndGenerateStreamRequest,
  output: RetrieveAndGenerateStreamResponse,
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetrieveAndGenerateStream",
}));

export type StartFlowExecutionError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts an execution of an Amazon Bedrock flow. Unlike flows that run until completion or time out after five minutes, flow executions let you run flows asynchronously for longer durations. Flow executions also yield control so that your application can perform other tasks.
 *
 * This operation returns an Amazon Resource Name (ARN) that you can use to track and manage your flow execution.
 *
 * Flow executions is in preview release for Amazon Bedrock and is subject to change.
 */
export const startFlowExecution: API.OperationMethod<
  StartFlowExecutionRequest,
  StartFlowExecutionResponse,
  StartFlowExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartFlowExecutionRequest,
  output: StartFlowExecutionResponse,
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFlowExecution",
}));

export type StopFlowExecutionError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops an Amazon Bedrock flow's execution. This operation prevents further processing of the flow and changes the execution status to `Aborted`.
 */
export const stopFlowExecution: API.OperationMethod<
  StopFlowExecutionRequest,
  StopFlowExecutionResponse,
  StopFlowExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopFlowExecutionRequest,
  output: StopFlowExecutionResponse,
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopFlowExecution",
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
 * Remove tags from a resource.
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

export type UpdateSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the metadata or encryption settings of a session. For more information about sessions, see Store and retrieve conversation history and context with Amazon Bedrock sessions.
 */
export const updateSession: API.OperationMethod<
  UpdateSessionRequest,
  UpdateSessionResponse,
  UpdateSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSessionRequest,
  output: UpdateSessionResponse,
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
  operationName: "UpdateSession",
}));
