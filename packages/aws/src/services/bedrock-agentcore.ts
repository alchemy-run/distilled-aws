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
  sdkId: "Bedrock AgentCore",
  serviceShapeName: "AmazonBedrockAgentCore",
});
const auth = T.AwsAuthSigv4({ name: "bedrock-agentcore" });
const ver = T.ServiceVersion("2024-02-28");
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
              `https://bedrock-agentcore-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://bedrock-agentcore-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://bedrock-agentcore.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://bedrock-agentcore.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class DuplicateIdException
  extends /*@__PURE__*/ S.TaggedError<DuplicateIdException>()(
    "DuplicateIdException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()(
    "InvalidInputException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class RetryableConflictException
  extends /*@__PURE__*/ S.TaggedError<RetryableConflictException>()(
    "RetryableConflictException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(409), T.Retryable()),
  ).pipe(C.withConflictError, C.withRetryableError) {}
export class RuntimeClientError
  extends /*@__PURE__*/ S.TaggedError<RuntimeClientError>()(
    "RuntimeClientError",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(424),
  ) {}
export class ServiceException
  extends /*@__PURE__*/ S.TaggedError<ServiceException>()(
    "ServiceException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottledException
  extends /*@__PURE__*/ S.TaggedError<ThrottledException>()(
    "ThrottledException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.suspend(() => ValidationExceptionReason).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type MemoryId = string;
export type RequestIdentifier = string;
export type Namespace = string;
export type NamespacesList = string[];
export const NamespacesList = /*@__PURE__*/ S.Array(S.String);
export type SensitiveString = string | redacted.Redacted<string>;
export type MemoryContent = { text: string | redacted.Redacted<string> };
export const MemoryContent = /*@__PURE__*/ S.Union([
  S.Struct({ text: SensitiveString }),
]);
export type MemoryStrategyId = string;
export type MetadataKey = string;
export type StringValue = string;
export type StringListMemberValue = string;
export type StringValueList = string[];
export const StringValueList = /*@__PURE__*/ S.Array(S.String);
export type MemoryRecordMetadataValue =
  | {
      stringValue: string;
      stringListValue?: never;
      numberValue?: never;
      dateTimeValue?: never;
    }
  | {
      stringValue?: never;
      stringListValue: string[];
      numberValue?: never;
      dateTimeValue?: never;
    }
  | {
      stringValue?: never;
      stringListValue?: never;
      numberValue: number;
      dateTimeValue?: never;
    }
  | {
      stringValue?: never;
      stringListValue?: never;
      numberValue?: never;
      dateTimeValue: Date;
    };
export const MemoryRecordMetadataValue = /*@__PURE__*/ S.Union([
  S.Struct({ stringValue: S.String }),
  S.Struct({ stringListValue: StringValueList }),
  S.Struct({ numberValue: S.Number }),
  S.Struct({ dateTimeValue: S.Date.pipe(T.TimestampFormat("epoch-seconds")) }),
]);
export type MemoryRecordMetadataMap = {
  [key: string]: MemoryRecordMetadataValue | undefined;
};
export const MemoryRecordMetadataMap = /*@__PURE__*/ S.Record(
  S.String,
  MemoryRecordMetadataValue.pipe(S.optional),
);
export interface MemoryRecordCreateInput {
  requestIdentifier: string;
  namespaces: string[];
  content: MemoryContent;
  timestamp: Date;
  memoryStrategyId?: string;
  metadata?: { [key: string]: MemoryRecordMetadataValue | undefined };
}
export const MemoryRecordCreateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    requestIdentifier: S.String,
    namespaces: NamespacesList,
    content: MemoryContent,
    timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    memoryStrategyId: S.optional(S.String),
    metadata: S.optional(MemoryRecordMetadataMap),
  }),
).annotate({
  identifier: "MemoryRecordCreateInput",
}) as any as S.Schema<MemoryRecordCreateInput>;
export type MemoryRecordsCreateInputList = MemoryRecordCreateInput[];
export const MemoryRecordsCreateInputList = /*@__PURE__*/ S.Array(
  MemoryRecordCreateInput,
);
export interface BatchCreateMemoryRecordsInput {
  memoryId: string;
  records: MemoryRecordCreateInput[];
  clientToken?: string;
}
export const BatchCreateMemoryRecordsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memoryId: S.String.pipe(T.HttpLabel("memoryId")),
    records: MemoryRecordsCreateInputList,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/memories/{memoryId}/memoryRecords/batchCreate",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchCreateMemoryRecordsInput",
}) as any as S.Schema<BatchCreateMemoryRecordsInput>;
export type MemoryRecordId = string;
export type MemoryRecordStatus = "SUCCEEDED" | "FAILED" | (string & {});
export const MemoryRecordStatus = /*@__PURE__*/ S.String;

export interface MemoryRecordOutput {
  memoryRecordId: string;
  status: MemoryRecordStatus;
  requestIdentifier?: string;
  errorCode?: number;
  errorMessage?: string;
}
export const MemoryRecordOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memoryRecordId: S.String,
    status: MemoryRecordStatus,
    requestIdentifier: S.optional(S.String),
    errorCode: S.optional(S.Number),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "MemoryRecordOutput",
}) as any as S.Schema<MemoryRecordOutput>;
export type MemoryRecordsOutputList = MemoryRecordOutput[];
export const MemoryRecordsOutputList =
  /*@__PURE__*/ S.Array(MemoryRecordOutput);
export interface BatchCreateMemoryRecordsOutput {
  successfulRecords: MemoryRecordOutput[];
  failedRecords: MemoryRecordOutput[];
}
export const BatchCreateMemoryRecordsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    successfulRecords: MemoryRecordsOutputList,
    failedRecords: MemoryRecordsOutputList,
  }),
).annotate({
  identifier: "BatchCreateMemoryRecordsOutput",
}) as any as S.Schema<BatchCreateMemoryRecordsOutput>;
export interface MemoryRecordDeleteInput {
  memoryRecordId: string;
}
export const MemoryRecordDeleteInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ memoryRecordId: S.String }),
).annotate({
  identifier: "MemoryRecordDeleteInput",
}) as any as S.Schema<MemoryRecordDeleteInput>;
export type MemoryRecordsDeleteInputList = MemoryRecordDeleteInput[];
export const MemoryRecordsDeleteInputList = /*@__PURE__*/ S.Array(
  MemoryRecordDeleteInput,
);
export interface BatchDeleteMemoryRecordsInput {
  memoryId: string;
  records: MemoryRecordDeleteInput[];
}
export const BatchDeleteMemoryRecordsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memoryId: S.String.pipe(T.HttpLabel("memoryId")),
    records: MemoryRecordsDeleteInputList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/memories/{memoryId}/memoryRecords/batchDelete",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchDeleteMemoryRecordsInput",
}) as any as S.Schema<BatchDeleteMemoryRecordsInput>;
export interface BatchDeleteMemoryRecordsOutput {
  successfulRecords: MemoryRecordOutput[];
  failedRecords: MemoryRecordOutput[];
}
export const BatchDeleteMemoryRecordsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    successfulRecords: MemoryRecordsOutputList,
    failedRecords: MemoryRecordsOutputList,
  }),
).annotate({
  identifier: "BatchDeleteMemoryRecordsOutput",
}) as any as S.Schema<BatchDeleteMemoryRecordsOutput>;
export interface MemoryRecordUpdateInput {
  memoryRecordId: string;
  timestamp: Date;
  content?: MemoryContent;
  namespaces?: string[];
  memoryStrategyId?: string;
  metadata?: { [key: string]: MemoryRecordMetadataValue | undefined };
}
export const MemoryRecordUpdateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memoryRecordId: S.String,
    timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    content: S.optional(MemoryContent),
    namespaces: S.optional(NamespacesList),
    memoryStrategyId: S.optional(S.String),
    metadata: S.optional(MemoryRecordMetadataMap),
  }),
).annotate({
  identifier: "MemoryRecordUpdateInput",
}) as any as S.Schema<MemoryRecordUpdateInput>;
export type MemoryRecordsUpdateInputList = MemoryRecordUpdateInput[];
export const MemoryRecordsUpdateInputList = /*@__PURE__*/ S.Array(
  MemoryRecordUpdateInput,
);
export interface BatchUpdateMemoryRecordsInput {
  memoryId: string;
  records: MemoryRecordUpdateInput[];
}
export const BatchUpdateMemoryRecordsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memoryId: S.String.pipe(T.HttpLabel("memoryId")),
    records: MemoryRecordsUpdateInputList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/memories/{memoryId}/memoryRecords/batchUpdate",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchUpdateMemoryRecordsInput",
}) as any as S.Schema<BatchUpdateMemoryRecordsInput>;
export interface BatchUpdateMemoryRecordsOutput {
  successfulRecords: MemoryRecordOutput[];
  failedRecords: MemoryRecordOutput[];
}
export const BatchUpdateMemoryRecordsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    successfulRecords: MemoryRecordsOutputList,
    failedRecords: MemoryRecordsOutputList,
  }),
).annotate({
  identifier: "BatchUpdateMemoryRecordsOutput",
}) as any as S.Schema<BatchUpdateMemoryRecordsOutput>;
export type UserTokenType = string | redacted.Redacted<string>;
export type UserIdType = string;
export type UserIdentifier =
  | { userToken: string | redacted.Redacted<string>; userId?: never }
  | { userToken?: never; userId: string };
export const UserIdentifier = /*@__PURE__*/ S.Union([
  S.Struct({ userToken: SensitiveString }),
  S.Struct({ userId: S.String }),
]);
export type RequestUri = string;
export interface CompleteResourceTokenAuthRequest {
  userIdentifier: UserIdentifier;
  sessionUri: string;
}
export const CompleteResourceTokenAuthRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userIdentifier: UserIdentifier, sessionUri: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/identities/CompleteResourceTokenAuth" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CompleteResourceTokenAuthRequest",
}) as any as S.Schema<CompleteResourceTokenAuthRequest>;
export interface CompleteResourceTokenAuthResponse {}
export const CompleteResourceTokenAuthResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CompleteResourceTokenAuthResponse",
}) as any as S.Schema<CompleteResourceTokenAuthResponse>;
export type ABTestName = string;
export type ABTestDescription = string;
export type GatewayArn = string;
export type VariantName = string;
export type ConfigurationBundleArn = string;
export type ConfigurationBundleVersion = string;
export interface ConfigurationBundleRef {
  bundleArn: string;
  bundleVersion: string;
}
export const ConfigurationBundleRef = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bundleArn: S.String, bundleVersion: S.String }),
).annotate({
  identifier: "ConfigurationBundleRef",
}) as any as S.Schema<ConfigurationBundleRef>;
export type TargetName = string;
export interface TargetRef {
  name: string;
}
export const TargetRef = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }),
).annotate({ identifier: "TargetRef" }) as any as S.Schema<TargetRef>;
export interface VariantConfiguration {
  configurationBundle?: ConfigurationBundleRef;
  target?: TargetRef;
}
export const VariantConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configurationBundle: S.optional(ConfigurationBundleRef),
    target: S.optional(TargetRef),
  }),
).annotate({
  identifier: "VariantConfiguration",
}) as any as S.Schema<VariantConfiguration>;
export interface Variant {
  name: string;
  weight: number;
  variantConfiguration: VariantConfiguration;
}
export const Variant = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    weight: S.Number,
    variantConfiguration: VariantConfiguration,
  }),
).annotate({ identifier: "Variant" }) as any as S.Schema<Variant>;
export type VariantList = Variant[];
export const VariantList = /*@__PURE__*/ S.Array(Variant);
export type PathPattern = string;
export type TargetPathList = string[];
export const TargetPathList = /*@__PURE__*/ S.Array(S.String);
export interface GatewayFilter {
  targetPaths?: string[];
}
export const GatewayFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ targetPaths: S.optional(TargetPathList) }),
).annotate({ identifier: "GatewayFilter" }) as any as S.Schema<GatewayFilter>;
export type OnlineEvaluationConfigArn = string;
export interface PerVariantOnlineEvaluationConfig {
  name: string;
  onlineEvaluationConfigArn: string;
}
export const PerVariantOnlineEvaluationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, onlineEvaluationConfigArn: S.String }),
).annotate({
  identifier: "PerVariantOnlineEvaluationConfig",
}) as any as S.Schema<PerVariantOnlineEvaluationConfig>;
export type PerVariantOnlineEvaluationConfigList =
  PerVariantOnlineEvaluationConfig[];
export const PerVariantOnlineEvaluationConfigList = /*@__PURE__*/ S.Array(
  PerVariantOnlineEvaluationConfig,
);
export type ABTestEvaluationConfig =
  | {
      onlineEvaluationConfigArn: string;
      perVariantOnlineEvaluationConfig?: never;
    }
  | {
      onlineEvaluationConfigArn?: never;
      perVariantOnlineEvaluationConfig: PerVariantOnlineEvaluationConfig[];
    };
export const ABTestEvaluationConfig = /*@__PURE__*/ S.Union([
  S.Struct({ onlineEvaluationConfigArn: S.String }),
  S.Struct({
    perVariantOnlineEvaluationConfig: PerVariantOnlineEvaluationConfigList,
  }),
]);
export type RoleArn = string;
export type ClientToken = string;
export type TagKey = string;
export type TagValue = string;
export type TagsMap = { [key: string]: string | undefined };
export const TagsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateABTestRequest {
  name: string;
  description?: string;
  gatewayArn: string;
  variants: Variant[];
  gatewayFilter?: GatewayFilter;
  evaluationConfig: ABTestEvaluationConfig;
  roleArn: string;
  enableOnCreate?: boolean;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateABTestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    gatewayArn: S.String,
    variants: VariantList,
    gatewayFilter: S.optional(GatewayFilter),
    evaluationConfig: ABTestEvaluationConfig,
    roleArn: S.String,
    enableOnCreate: S.optional(S.Boolean),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ab-tests" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateABTestRequest",
}) as any as S.Schema<CreateABTestRequest>;
export type ABTestId = string;
export type ABTestArn = string;
export type ABTestStatus =
  | "CREATING"
  | "ACTIVE"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "DELETING"
  | "DELETE_FAILED"
  | "FAILED"
  | (string & {});
export const ABTestStatus = /*@__PURE__*/ S.String;

export type ABTestExecutionStatus =
  | "PAUSED"
  | "RUNNING"
  | "STOPPED"
  | "NOT_STARTED"
  | (string & {});
export const ABTestExecutionStatus = /*@__PURE__*/ S.String;

export interface CreateABTestResponse {
  abTestId: string;
  abTestArn: string;
  name?: string;
  status: ABTestStatus;
  executionStatus: ABTestExecutionStatus;
  createdAt: Date;
}
export const CreateABTestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    abTestId: S.String,
    abTestArn: S.String,
    name: S.optional(S.String),
    status: ABTestStatus,
    executionStatus: ABTestExecutionStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "CreateABTestResponse",
}) as any as S.Schema<CreateABTestResponse>;
export type ActorId = string;
export type SessionId = string;
export type Content = { text: string | redacted.Redacted<string> };
export const Content = /*@__PURE__*/ S.Union([
  S.Struct({ text: SensitiveString }),
]);
export type Role = "ASSISTANT" | "USER" | "TOOL" | "OTHER" | (string & {});
export const Role = /*@__PURE__*/ S.String;

export interface Conversational {
  content: Content;
  role: Role;
}
export const Conversational = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ content: Content, role: Role }),
).annotate({ identifier: "Conversational" }) as any as S.Schema<Conversational>;
export type MemoryDocument = unknown;
export type PayloadType =
  | { conversational: Conversational; blob?: never }
  | { conversational?: never; blob: any };
export const PayloadType = /*@__PURE__*/ S.Union([
  S.Struct({ conversational: Conversational }),
  S.Struct({ blob: S.Any }),
]);
export type PayloadTypeList = PayloadType[];
export const PayloadTypeList = /*@__PURE__*/ S.Array(PayloadType);
export type EventId = string;
export type BranchName = string;
export interface Branch {
  rootEventId?: string;
  name: string;
}
export const Branch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ rootEventId: S.optional(S.String), name: S.String }),
).annotate({ identifier: "Branch" }) as any as S.Schema<Branch>;
export type MetadataValue = { stringValue: string };
export const MetadataValue = /*@__PURE__*/ S.Union([
  S.Struct({ stringValue: S.String }),
]);
export type MetadataMap = { [key: string]: MetadataValue | undefined };
export const MetadataMap = /*@__PURE__*/ S.Record(
  S.String,
  MetadataValue.pipe(S.optional),
);
export type ExtractionMode = "SKIP" | (string & {});
export const ExtractionMode = /*@__PURE__*/ S.String;

export interface CreateEventInput {
  memoryId: string;
  actorId: string;
  sessionId?: string;
  eventTimestamp: Date;
  payload: PayloadType[];
  branch?: Branch;
  clientToken?: string;
  metadata?: { [key: string]: MetadataValue | undefined };
  extractionMode?: ExtractionMode;
}
export const CreateEventInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memoryId: S.String.pipe(T.HttpLabel("memoryId")),
    actorId: S.String,
    sessionId: S.optional(S.String),
    eventTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    payload: PayloadTypeList,
    branch: S.optional(Branch),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    metadata: S.optional(MetadataMap),
    extractionMode: S.optional(ExtractionMode),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/memories/{memoryId}/events" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEventInput",
}) as any as S.Schema<CreateEventInput>;
export interface Event {
  memoryId: string;
  actorId: string;
  sessionId: string;
  eventId: string;
  eventTimestamp: Date;
  payload?: PayloadType[];
  branch?: Branch;
  metadata?: { [key: string]: MetadataValue | undefined };
}
export const Event = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memoryId: S.String,
    actorId: S.String,
    sessionId: S.String,
    eventId: S.String,
    eventTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    payload: S.optional(PayloadTypeList),
    branch: S.optional(Branch),
    metadata: S.optional(MetadataMap),
  }),
).annotate({ identifier: "Event" }) as any as S.Schema<Event>;
export interface CreateEventOutput {
  event: Event;
}
export const CreateEventOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ event: Event }),
).annotate({
  identifier: "CreateEventOutput",
}) as any as S.Schema<CreateEventOutput>;
export type UserId = string;
export type PaymentAgentName = string;
export type PaymentManagerArn = string;
export type PaymentConnectorId = string;
export type PaymentInstrumentType = "EMBEDDED_CRYPTO_WALLET" | (string & {});
export const PaymentInstrumentType = /*@__PURE__*/ S.String;

export type CryptoWalletNetwork = "ETHEREUM" | "SOLANA" | (string & {});
export const CryptoWalletNetwork = /*@__PURE__*/ S.String;

export type Email = string | redacted.Redacted<string>;
export interface LinkedAccountEmail {
  emailAddress: string | redacted.Redacted<string>;
}
export const LinkedAccountEmail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ emailAddress: SensitiveString }),
).annotate({
  identifier: "LinkedAccountEmail",
}) as any as S.Schema<LinkedAccountEmail>;
export type PhoneNumber = string | redacted.Redacted<string>;
export interface LinkedAccountSms {
  phoneNumber: string | redacted.Redacted<string>;
}
export const LinkedAccountSms = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ phoneNumber: SensitiveString }),
).annotate({
  identifier: "LinkedAccountSms",
}) as any as S.Schema<LinkedAccountSms>;
export type JwtKeyId = string;
export interface LinkedAccountDeveloperJwt {
  kid: string;
  sub: string;
}
export const LinkedAccountDeveloperJwt = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ kid: S.String, sub: S.String }),
).annotate({
  identifier: "LinkedAccountDeveloperJwt",
}) as any as S.Schema<LinkedAccountDeveloperJwt>;
export interface OAuth2Authentication {
  sub: string;
  emailAddress?: string | redacted.Redacted<string>;
  name?: string;
  username?: string;
}
export const OAuth2Authentication = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sub: S.String,
    emailAddress: S.optional(SensitiveString),
    name: S.optional(S.String),
    username: S.optional(S.String),
  }),
).annotate({
  identifier: "OAuth2Authentication",
}) as any as S.Schema<OAuth2Authentication>;
export type LinkedAccountOAuth2 =
  | {
      google: OAuth2Authentication;
      apple?: never;
      x?: never;
      telegram?: never;
      github?: never;
    }
  | {
      google?: never;
      apple: OAuth2Authentication;
      x?: never;
      telegram?: never;
      github?: never;
    }
  | {
      google?: never;
      apple?: never;
      x: OAuth2Authentication;
      telegram?: never;
      github?: never;
    }
  | {
      google?: never;
      apple?: never;
      x?: never;
      telegram: OAuth2Authentication;
      github?: never;
    }
  | {
      google?: never;
      apple?: never;
      x?: never;
      telegram?: never;
      github: OAuth2Authentication;
    };
export const LinkedAccountOAuth2 = /*@__PURE__*/ S.Union([
  S.Struct({ google: OAuth2Authentication }),
  S.Struct({ apple: OAuth2Authentication }),
  S.Struct({ x: OAuth2Authentication }),
  S.Struct({ telegram: OAuth2Authentication }),
  S.Struct({ github: OAuth2Authentication }),
]);
export type LinkedAccount =
  | {
      email: LinkedAccountEmail;
      sms?: never;
      developerJwt?: never;
      oAuth2?: never;
    }
  | {
      email?: never;
      sms: LinkedAccountSms;
      developerJwt?: never;
      oAuth2?: never;
    }
  | {
      email?: never;
      sms?: never;
      developerJwt: LinkedAccountDeveloperJwt;
      oAuth2?: never;
    }
  | {
      email?: never;
      sms?: never;
      developerJwt?: never;
      oAuth2: LinkedAccountOAuth2;
    };
export const LinkedAccount = /*@__PURE__*/ S.Union([
  S.Struct({ email: LinkedAccountEmail }),
  S.Struct({ sms: LinkedAccountSms }),
  S.Struct({ developerJwt: LinkedAccountDeveloperJwt }),
  S.Struct({ oAuth2: LinkedAccountOAuth2 }),
]);
export type LinkedAccountList = LinkedAccount[];
export const LinkedAccountList = /*@__PURE__*/ S.Array(LinkedAccount);
export interface EmbeddedCryptoWallet {
  network: CryptoWalletNetwork;
  linkedAccounts: LinkedAccount[];
  walletAddress?: string;
  redirectUrl?: string;
}
export const EmbeddedCryptoWallet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    network: CryptoWalletNetwork,
    linkedAccounts: LinkedAccountList,
    walletAddress: S.optional(S.String),
    redirectUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "EmbeddedCryptoWallet",
}) as any as S.Schema<EmbeddedCryptoWallet>;
export type PaymentInstrumentDetails = {
  embeddedCryptoWallet: EmbeddedCryptoWallet;
};
export const PaymentInstrumentDetails = /*@__PURE__*/ S.Union([
  S.Struct({ embeddedCryptoWallet: EmbeddedCryptoWallet }),
]);
export interface CreatePaymentInstrumentRequest {
  userId?: string;
  agentName?: string;
  paymentManagerArn: string;
  paymentConnectorId: string;
  paymentInstrumentType: PaymentInstrumentType;
  paymentInstrumentDetails: PaymentInstrumentDetails;
  clientToken?: string;
}
export const CreatePaymentInstrumentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userId: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-User-Id"),
    ),
    agentName: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-Agent-Name"),
    ),
    paymentManagerArn: S.String,
    paymentConnectorId: S.String,
    paymentInstrumentType: PaymentInstrumentType,
    paymentInstrumentDetails: PaymentInstrumentDetails,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/payments/createPaymentInstrument" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePaymentInstrumentRequest",
}) as any as S.Schema<CreatePaymentInstrumentRequest>;
export type PaymentInstrumentId = string;
export type PaymentInstrumentStatus =
  | "INITIATED"
  | "ACTIVE"
  | "FAILED"
  | "DELETED"
  | (string & {});
export const PaymentInstrumentStatus = /*@__PURE__*/ S.String;

export interface PaymentInstrument {
  paymentInstrumentId: string;
  paymentManagerArn: string;
  paymentConnectorId: string;
  userId: string;
  paymentInstrumentType: PaymentInstrumentType;
  paymentInstrumentDetails: PaymentInstrumentDetails;
  createdAt: Date;
  status: PaymentInstrumentStatus;
  updatedAt: Date;
}
export const PaymentInstrument = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentInstrumentId: S.String,
    paymentManagerArn: S.String,
    paymentConnectorId: S.String,
    userId: S.String,
    paymentInstrumentType: PaymentInstrumentType,
    paymentInstrumentDetails: PaymentInstrumentDetails,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: PaymentInstrumentStatus,
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "PaymentInstrument",
}) as any as S.Schema<PaymentInstrument>;
export interface CreatePaymentInstrumentResponse {
  paymentInstrument: PaymentInstrument;
}
export const CreatePaymentInstrumentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ paymentInstrument: PaymentInstrument }),
).annotate({
  identifier: "CreatePaymentInstrumentResponse",
}) as any as S.Schema<CreatePaymentInstrumentResponse>;
export type Currency = "USD" | (string & {});
export const Currency = /*@__PURE__*/ S.String;

export interface Amount {
  value: string;
  currency: Currency;
}
export const Amount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: S.String, currency: Currency }),
).annotate({ identifier: "Amount" }) as any as S.Schema<Amount>;
export interface SessionLimits {
  maxSpendAmount: Amount;
}
export const SessionLimits = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ maxSpendAmount: Amount }),
).annotate({ identifier: "SessionLimits" }) as any as S.Schema<SessionLimits>;
export interface CreatePaymentSessionRequest {
  userId?: string;
  agentName?: string;
  paymentManagerArn: string;
  limits?: SessionLimits;
  expiryTimeInMinutes: number;
  clientToken?: string;
}
export const CreatePaymentSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userId: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-User-Id"),
    ),
    agentName: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-Agent-Name"),
    ),
    paymentManagerArn: S.String,
    limits: S.optional(SessionLimits),
    expiryTimeInMinutes: S.Number,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/payments/createPaymentSession" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePaymentSessionRequest",
}) as any as S.Schema<CreatePaymentSessionRequest>;
export type PaymentSessionId = string;
export interface AvailableLimits {
  availableSpendAmount?: Amount;
  updatedAt?: Date;
}
export const AvailableLimits = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    availableSpendAmount: S.optional(Amount),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "AvailableLimits",
}) as any as S.Schema<AvailableLimits>;
export interface PaymentSession {
  paymentSessionId: string;
  paymentManagerArn: string;
  limits?: SessionLimits;
  userId: string;
  expiryTimeInMinutes: number;
  createdAt: Date;
  availableLimits?: AvailableLimits;
  updatedAt: Date;
}
export const PaymentSession = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentSessionId: S.String,
    paymentManagerArn: S.String,
    limits: S.optional(SessionLimits),
    userId: S.String,
    expiryTimeInMinutes: S.Number,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    availableLimits: S.optional(AvailableLimits),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({ identifier: "PaymentSession" }) as any as S.Schema<PaymentSession>;
export interface CreatePaymentSessionResponse {
  paymentSession: PaymentSession;
}
export const CreatePaymentSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ paymentSession: PaymentSession }),
).annotate({
  identifier: "CreatePaymentSessionResponse",
}) as any as S.Schema<CreatePaymentSessionResponse>;
export interface DeleteABTestRequest {
  abTestId: string;
}
export const DeleteABTestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ abTestId: S.String.pipe(T.HttpLabel("abTestId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/ab-tests/{abTestId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteABTestRequest",
}) as any as S.Schema<DeleteABTestRequest>;
export interface DeleteABTestResponse {
  abTestId: string;
  abTestArn: string;
  status: ABTestStatus;
}
export const DeleteABTestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ abTestId: S.String, abTestArn: S.String, status: ABTestStatus }),
).annotate({
  identifier: "DeleteABTestResponse",
}) as any as S.Schema<DeleteABTestResponse>;
export type BatchEvaluationId = string;
export interface DeleteBatchEvaluationRequest {
  batchEvaluationId: string;
}
export const DeleteBatchEvaluationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    batchEvaluationId: S.String.pipe(T.HttpLabel("batchEvaluationId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/evaluations/batch-evaluate/{batchEvaluationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBatchEvaluationRequest",
}) as any as S.Schema<DeleteBatchEvaluationRequest>;
export type BatchEvaluationArn = string;
export type BatchEvaluationStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "COMPLETED_WITH_ERRORS"
  | "FAILED"
  | "STOPPING"
  | "STOPPED"
  | "DELETING"
  | (string & {});
export const BatchEvaluationStatus = /*@__PURE__*/ S.String;

export interface DeleteBatchEvaluationResponse {
  batchEvaluationId: string;
  batchEvaluationArn: string;
  status: BatchEvaluationStatus;
}
export const DeleteBatchEvaluationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    batchEvaluationId: S.String,
    batchEvaluationArn: S.String,
    status: BatchEvaluationStatus,
  }),
).annotate({
  identifier: "DeleteBatchEvaluationResponse",
}) as any as S.Schema<DeleteBatchEvaluationResponse>;
export interface DeleteEventInput {
  memoryId: string;
  sessionId: string;
  eventId: string;
  actorId: string;
}
export const DeleteEventInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memoryId: S.String.pipe(T.HttpLabel("memoryId")),
    sessionId: S.String.pipe(T.HttpLabel("sessionId")),
    eventId: S.String.pipe(T.HttpLabel("eventId")),
    actorId: S.String.pipe(T.HttpLabel("actorId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/memories/{memoryId}/actor/{actorId}/sessions/{sessionId}/events/{eventId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEventInput",
}) as any as S.Schema<DeleteEventInput>;
export interface DeleteEventOutput {
  eventId: string;
}
export const DeleteEventOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ eventId: S.String }),
).annotate({
  identifier: "DeleteEventOutput",
}) as any as S.Schema<DeleteEventOutput>;
export interface DeleteMemoryRecordInput {
  memoryId: string;
  memoryRecordId: string;
}
export const DeleteMemoryRecordInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memoryId: S.String.pipe(T.HttpLabel("memoryId")),
    memoryRecordId: S.String.pipe(T.HttpLabel("memoryRecordId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/memories/{memoryId}/memoryRecords/{memoryRecordId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMemoryRecordInput",
}) as any as S.Schema<DeleteMemoryRecordInput>;
export interface DeleteMemoryRecordOutput {
  memoryRecordId: string;
}
export const DeleteMemoryRecordOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ memoryRecordId: S.String }),
).annotate({
  identifier: "DeleteMemoryRecordOutput",
}) as any as S.Schema<DeleteMemoryRecordOutput>;
export interface DeletePaymentInstrumentRequest {
  userId?: string;
  paymentManagerArn: string;
  paymentConnectorId: string;
  paymentInstrumentId: string;
}
export const DeletePaymentInstrumentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userId: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-User-Id"),
    ),
    paymentManagerArn: S.String,
    paymentConnectorId: S.String,
    paymentInstrumentId: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/payments/deletePaymentInstrument" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePaymentInstrumentRequest",
}) as any as S.Schema<DeletePaymentInstrumentRequest>;
export interface DeletePaymentInstrumentResponse {
  status: PaymentInstrumentStatus;
}
export const DeletePaymentInstrumentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: PaymentInstrumentStatus }),
).annotate({
  identifier: "DeletePaymentInstrumentResponse",
}) as any as S.Schema<DeletePaymentInstrumentResponse>;
export interface DeletePaymentSessionRequest {
  userId?: string;
  paymentManagerArn: string;
  paymentSessionId: string;
}
export const DeletePaymentSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userId: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-User-Id"),
    ),
    paymentManagerArn: S.String,
    paymentSessionId: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/payments/deletePaymentSession" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePaymentSessionRequest",
}) as any as S.Schema<DeletePaymentSessionRequest>;
export type PaymentSessionStatus =
  | "ACTIVE"
  | "EXPIRED"
  | "DELETED"
  | (string & {});
export const PaymentSessionStatus = /*@__PURE__*/ S.String;

export interface DeletePaymentSessionResponse {
  status: PaymentSessionStatus;
}
export const DeletePaymentSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: PaymentSessionStatus }),
).annotate({
  identifier: "DeletePaymentSessionResponse",
}) as any as S.Schema<DeletePaymentSessionResponse>;
export type RecommendationId = string;
export interface DeleteRecommendationRequest {
  recommendationId: string;
}
export const DeleteRecommendationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendationId: S.String.pipe(T.HttpLabel("recommendationId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/recommendations/{recommendationId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRecommendationRequest",
}) as any as S.Schema<DeleteRecommendationRequest>;
export type RecommendationStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "DELETING"
  | (string & {});
export const RecommendationStatus = /*@__PURE__*/ S.String;

export interface DeleteRecommendationResponse {
  recommendationId: string;
  status: RecommendationStatus;
}
export const DeleteRecommendationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ recommendationId: S.String, status: RecommendationStatus }),
).annotate({
  identifier: "DeleteRecommendationResponse",
}) as any as S.Schema<DeleteRecommendationResponse>;
export type EvaluatorId = string;
export type Span = unknown;
export type Spans = any[];
export const Spans = /*@__PURE__*/ S.Array(S.Any);
export type EvaluationInput = { sessionSpans: any[] };
export const EvaluationInput = /*@__PURE__*/ S.Union([
  S.Struct({ sessionSpans: Spans }),
]);
export type SpanId = string;
export type SpanIds = string[];
export const SpanIds = /*@__PURE__*/ S.Array(S.String);
export type TraceId = string;
export type TraceIds = string[];
export const TraceIds = /*@__PURE__*/ S.Array(S.String);
export type EvaluationTarget =
  | { spanIds: string[]; traceIds?: never }
  | { spanIds?: never; traceIds: string[] };
export const EvaluationTarget = /*@__PURE__*/ S.Union([
  S.Struct({ spanIds: SpanIds }),
  S.Struct({ traceIds: TraceIds }),
]);
export interface SpanContext {
  sessionId: string;
  traceId?: string;
  spanId?: string;
}
export const SpanContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.String,
    traceId: S.optional(S.String),
    spanId: S.optional(S.String),
  }),
).annotate({ identifier: "SpanContext" }) as any as S.Schema<SpanContext>;
export type Context = { spanContext: SpanContext };
export const Context = /*@__PURE__*/ S.Union([
  S.Struct({ spanContext: SpanContext }),
]);
export type EvaluationContent = { text: string };
export const EvaluationContent = /*@__PURE__*/ S.Union([
  S.Struct({ text: S.String }),
]);
export type EvaluationContentList = EvaluationContent[];
export const EvaluationContentList = /*@__PURE__*/ S.Array(EvaluationContent);
export type EvaluationToolName = string;
export type EvaluationToolNames = string[];
export const EvaluationToolNames = /*@__PURE__*/ S.Array(S.String);
export interface EvaluationExpectedTrajectory {
  toolNames?: string[];
}
export const EvaluationExpectedTrajectory = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ toolNames: S.optional(EvaluationToolNames) }),
).annotate({
  identifier: "EvaluationExpectedTrajectory",
}) as any as S.Schema<EvaluationExpectedTrajectory>;
export interface EvaluationReferenceInput {
  context: Context;
  expectedResponse?: EvaluationContent;
  assertions?: EvaluationContent[];
  expectedTrajectory?: EvaluationExpectedTrajectory;
}
export const EvaluationReferenceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    context: Context,
    expectedResponse: S.optional(EvaluationContent),
    assertions: S.optional(EvaluationContentList),
    expectedTrajectory: S.optional(EvaluationExpectedTrajectory),
  }),
).annotate({
  identifier: "EvaluationReferenceInput",
}) as any as S.Schema<EvaluationReferenceInput>;
export type EvaluationReferenceInputs = EvaluationReferenceInput[];
export const EvaluationReferenceInputs = /*@__PURE__*/ S.Array(
  EvaluationReferenceInput,
);
export interface EvaluateRequest {
  evaluatorId: string;
  evaluationInput: EvaluationInput;
  evaluationTarget?: EvaluationTarget;
  evaluationReferenceInputs?: EvaluationReferenceInput[];
}
export const EvaluateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    evaluatorId: S.String.pipe(T.HttpLabel("evaluatorId")),
    evaluationInput: EvaluationInput,
    evaluationTarget: S.optional(EvaluationTarget),
    evaluationReferenceInputs: S.optional(EvaluationReferenceInputs),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/evaluations/evaluate/{evaluatorId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "EvaluateRequest",
}) as any as S.Schema<EvaluateRequest>;
export type EvaluatorArn = string;
export type EvaluatorName = string;
export type EvaluationExplanation = string | redacted.Redacted<string>;
export interface TokenUsage {
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
}
export const TokenUsage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inputTokens: S.optional(S.Number),
    outputTokens: S.optional(S.Number),
    totalTokens: S.optional(S.Number),
  }),
).annotate({ identifier: "TokenUsage" }) as any as S.Schema<TokenUsage>;
export type EvaluationErrorMessage = string;
export type EvaluationErrorCode = string;
export type IgnoredReferenceInputField = string;
export type IgnoredReferenceInputFields = string[];
export const IgnoredReferenceInputFields = /*@__PURE__*/ S.Array(S.String);
export interface EvaluationResultContent {
  evaluatorArn: string;
  evaluatorId: string;
  evaluatorName: string;
  explanation?: string | redacted.Redacted<string>;
  context: Context;
  value?: number;
  label?: string;
  tokenUsage?: TokenUsage;
  errorMessage?: string;
  errorCode?: string;
  ignoredReferenceInputFields?: string[];
}
export const EvaluationResultContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    evaluatorArn: S.String,
    evaluatorId: S.String,
    evaluatorName: S.String,
    explanation: S.optional(SensitiveString),
    context: Context,
    value: S.optional(S.Number),
    label: S.optional(S.String),
    tokenUsage: S.optional(TokenUsage),
    errorMessage: S.optional(S.String),
    errorCode: S.optional(S.String),
    ignoredReferenceInputFields: S.optional(IgnoredReferenceInputFields),
  }),
).annotate({
  identifier: "EvaluationResultContent",
}) as any as S.Schema<EvaluationResultContent>;
export type EvaluationResults = EvaluationResultContent[];
export const EvaluationResults = /*@__PURE__*/ S.Array(EvaluationResultContent);
export interface EvaluateResponse {
  evaluationResults: EvaluationResultContent[];
}
export const EvaluateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ evaluationResults: EvaluationResults }),
).annotate({
  identifier: "EvaluateResponse",
}) as any as S.Schema<EvaluateResponse>;
export interface GetABTestRequest {
  abTestId: string;
}
export const GetABTestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ abTestId: S.String.pipe(T.HttpLabel("abTestId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/ab-tests/{abTestId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetABTestRequest",
}) as any as S.Schema<GetABTestRequest>;
export type ErrorDetailsList = string[];
export const ErrorDetailsList = /*@__PURE__*/ S.Array(S.String);
export interface ControlStats {
  variantName: string;
  sampleSize: number;
  mean: number;
}
export const ControlStats = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ variantName: S.String, sampleSize: S.Number, mean: S.Number }),
).annotate({ identifier: "ControlStats" }) as any as S.Schema<ControlStats>;
export interface ConfidenceInterval {
  lower?: number;
  upper?: number;
}
export const ConfidenceInterval = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ lower: S.optional(S.Number), upper: S.optional(S.Number) }),
).annotate({
  identifier: "ConfidenceInterval",
}) as any as S.Schema<ConfidenceInterval>;
export interface VariantResult {
  variantName: string;
  sampleSize: number;
  mean: number;
  absoluteChange?: number;
  percentChange?: number;
  pValue?: number;
  confidenceInterval?: ConfidenceInterval;
  isSignificant: boolean;
}
export const VariantResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    variantName: S.String,
    sampleSize: S.Number,
    mean: S.Number,
    absoluteChange: S.optional(S.Number),
    percentChange: S.optional(S.Number),
    pValue: S.optional(S.Number),
    confidenceInterval: S.optional(ConfidenceInterval),
    isSignificant: S.Boolean,
  }),
).annotate({ identifier: "VariantResult" }) as any as S.Schema<VariantResult>;
export type VariantResultList = VariantResult[];
export const VariantResultList = /*@__PURE__*/ S.Array(VariantResult);
export interface EvaluatorMetric {
  evaluatorArn: string;
  controlStats: ControlStats;
  variantResults: VariantResult[];
}
export const EvaluatorMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    evaluatorArn: S.String,
    controlStats: ControlStats,
    variantResults: VariantResultList,
  }),
).annotate({
  identifier: "EvaluatorMetric",
}) as any as S.Schema<EvaluatorMetric>;
export type EvaluatorMetricList = EvaluatorMetric[];
export const EvaluatorMetricList = /*@__PURE__*/ S.Array(EvaluatorMetric);
export interface ABTestResults {
  analysisTimestamp?: Date;
  evaluatorMetrics: EvaluatorMetric[];
}
export const ABTestResults = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    analysisTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    evaluatorMetrics: EvaluatorMetricList,
  }),
).annotate({ identifier: "ABTestResults" }) as any as S.Schema<ABTestResults>;
export interface GetABTestResponse {
  abTestId: string;
  abTestArn: string;
  name: string;
  description?: string;
  status: ABTestStatus;
  executionStatus: ABTestExecutionStatus;
  gatewayArn: string;
  variants: Variant[];
  gatewayFilter?: GatewayFilter;
  evaluationConfig: ABTestEvaluationConfig;
  roleArn?: string;
  currentRunId?: string;
  errorDetails?: string[];
  startedAt?: Date;
  stoppedAt?: Date;
  maxDurationExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  results?: ABTestResults;
}
export const GetABTestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    abTestId: S.String,
    abTestArn: S.String,
    name: S.String,
    description: S.optional(S.String),
    status: ABTestStatus,
    executionStatus: ABTestExecutionStatus,
    gatewayArn: S.String,
    variants: VariantList,
    gatewayFilter: S.optional(GatewayFilter),
    evaluationConfig: ABTestEvaluationConfig,
    roleArn: S.optional(S.String),
    currentRunId: S.optional(S.String),
    errorDetails: S.optional(ErrorDetailsList),
    startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    stoppedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    maxDurationExpiresAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    results: S.optional(ABTestResults),
  }),
).annotate({
  identifier: "GetABTestResponse",
}) as any as S.Schema<GetABTestResponse>;
export type SessionType = string;
export interface GetAgentCardRequest {
  runtimeSessionId?: string;
  agentRuntimeArn: string;
  qualifier?: string;
}
export const GetAgentCardRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    runtimeSessionId: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Runtime-Session-Id"),
      T.IdempotencyToken(),
    ),
    agentRuntimeArn: S.String.pipe(T.HttpLabel("agentRuntimeArn")),
    qualifier: S.optional(S.String).pipe(T.HttpQuery("qualifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/runtimes/{agentRuntimeArn}/invocations/.well-known/agent-card.json",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAgentCardRequest",
}) as any as S.Schema<GetAgentCardRequest>;
export type AgentCard = unknown;
export type HttpResponseCode = number;
export interface GetAgentCardResponse {
  runtimeSessionId?: string;
  agentCard: any;
  statusCode?: number;
}
export const GetAgentCardResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    runtimeSessionId: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Runtime-Session-Id"),
    ),
    agentCard: S.Any.pipe(T.HttpPayload()),
    statusCode: S.optional(S.Number).pipe(T.HttpResponseCode()),
  }),
).annotate({
  identifier: "GetAgentCardResponse",
}) as any as S.Schema<GetAgentCardResponse>;
export interface GetBatchEvaluationRequest {
  batchEvaluationId: string;
}
export const GetBatchEvaluationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    batchEvaluationId: S.String.pipe(T.HttpLabel("batchEvaluationId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/evaluations/batch-evaluate/{batchEvaluationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBatchEvaluationRequest",
}) as any as S.Schema<GetBatchEvaluationRequest>;
export type BatchEvaluationName = string;
export interface Evaluator {
  evaluatorId: string;
}
export const Evaluator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ evaluatorId: S.String }),
).annotate({ identifier: "Evaluator" }) as any as S.Schema<Evaluator>;
export type EvaluatorList = Evaluator[];
export const EvaluatorList = /*@__PURE__*/ S.Array(Evaluator);
export type InsightId = string;
export interface Insight {
  insightId: string;
}
export const Insight = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ insightId: S.String }),
).annotate({ identifier: "Insight" }) as any as S.Schema<Insight>;
export type InsightList = Insight[];
export const InsightList = /*@__PURE__*/ S.Array(Insight);
export type EvaluationStringList = string[];
export const EvaluationStringList = /*@__PURE__*/ S.Array(S.String);
export interface SessionFilterConfig {
  startTime?: Date;
  endTime?: Date;
}
export const SessionFilterConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({
  identifier: "SessionFilterConfig",
}) as any as S.Schema<SessionFilterConfig>;
export interface CloudWatchFilterConfig {
  sessionIds?: string[];
  timeRange?: SessionFilterConfig;
}
export const CloudWatchFilterConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionIds: S.optional(EvaluationStringList),
    timeRange: S.optional(SessionFilterConfig),
  }),
).annotate({
  identifier: "CloudWatchFilterConfig",
}) as any as S.Schema<CloudWatchFilterConfig>;
export interface CloudWatchLogsSource {
  serviceNames: string[];
  logGroupNames: string[];
  filterConfig?: CloudWatchFilterConfig;
}
export const CloudWatchLogsSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceNames: EvaluationStringList,
    logGroupNames: EvaluationStringList,
    filterConfig: S.optional(CloudWatchFilterConfig),
  }),
).annotate({
  identifier: "CloudWatchLogsSource",
}) as any as S.Schema<CloudWatchLogsSource>;
export interface OnlineEvaluationConfigSource {
  onlineEvaluationConfigArn: string;
  timeRange?: SessionFilterConfig;
}
export const OnlineEvaluationConfigSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    onlineEvaluationConfigArn: S.String,
    timeRange: S.optional(SessionFilterConfig),
  }),
).annotate({
  identifier: "OnlineEvaluationConfigSource",
}) as any as S.Schema<OnlineEvaluationConfigSource>;
export type DataSourceConfig =
  | {
      cloudWatchLogs: CloudWatchLogsSource;
      onlineEvaluationConfigSource?: never;
    }
  | {
      cloudWatchLogs?: never;
      onlineEvaluationConfigSource: OnlineEvaluationConfigSource;
    };
export const DataSourceConfig = /*@__PURE__*/ S.Union([
  S.Struct({ cloudWatchLogs: CloudWatchLogsSource }),
  S.Struct({ onlineEvaluationConfigSource: OnlineEvaluationConfigSource }),
]);
export interface CloudWatchOutputConfig {
  logGroupName: string;
  logStreamName: string;
}
export const CloudWatchOutputConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ logGroupName: S.String, logStreamName: S.String }),
).annotate({
  identifier: "CloudWatchOutputConfig",
}) as any as S.Schema<CloudWatchOutputConfig>;
export type OutputConfig = { cloudWatchConfig: CloudWatchOutputConfig };
export const OutputConfig = /*@__PURE__*/ S.Union([
  S.Struct({ cloudWatchConfig: CloudWatchOutputConfig }),
]);
export interface EvaluatorStatistics {
  averageScore?: number;
}
export const EvaluatorStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ averageScore: S.optional(S.Number) }),
).annotate({
  identifier: "EvaluatorStatistics",
}) as any as S.Schema<EvaluatorStatistics>;
export interface EvaluatorSummary {
  evaluatorId?: string;
  statistics?: EvaluatorStatistics;
  totalEvaluated?: number;
  totalFailed?: number;
}
export const EvaluatorSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    evaluatorId: S.optional(S.String),
    statistics: S.optional(EvaluatorStatistics),
    totalEvaluated: S.optional(S.Number),
    totalFailed: S.optional(S.Number),
  }),
).annotate({
  identifier: "EvaluatorSummary",
}) as any as S.Schema<EvaluatorSummary>;
export type EvaluatorSummaryList = EvaluatorSummary[];
export const EvaluatorSummaryList = /*@__PURE__*/ S.Array(EvaluatorSummary);
export interface EvaluationJobResults {
  numberOfSessionsCompleted?: number;
  numberOfSessionsInProgress?: number;
  numberOfSessionsFailed?: number;
  totalNumberOfSessions?: number;
  numberOfSessionsIgnored?: number;
  evaluatorSummaries?: EvaluatorSummary[];
}
export const EvaluationJobResults = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    numberOfSessionsCompleted: S.optional(S.Number),
    numberOfSessionsInProgress: S.optional(S.Number),
    numberOfSessionsFailed: S.optional(S.Number),
    totalNumberOfSessions: S.optional(S.Number),
    numberOfSessionsIgnored: S.optional(S.Number),
    evaluatorSummaries: S.optional(EvaluatorSummaryList),
  }),
).annotate({
  identifier: "EvaluationJobResults",
}) as any as S.Schema<EvaluationJobResults>;
export type InsightsFailureCategory =
  | "execution-error-category-authentication"
  | "execution-error-category-resource-not-found"
  | "execution-error-category-service-errors"
  | "execution-error-category-rate-limiting"
  | "execution-error-category-formatting"
  | "execution-error-category-timeout"
  | "execution-error-category-resource-exhaustion"
  | "execution-error-category-environment"
  | "execution-error-category-tool-schema"
  | "task-instruction-category-non-compliance"
  | "task-instruction-category-problem-id"
  | "incorrect-actions-category-tool-selection"
  | "incorrect-actions-category-poor-information-retrieval"
  | "incorrect-actions-category-clarification"
  | "incorrect-actions-category-inappropriate-info-request"
  | "context-handling-error-category-context-handling-failures"
  | "hallucination-category-hall-capabilities"
  | "hallucination-category-hall-misunderstand"
  | "hallucination-category-hall-usage"
  | "hallucination-category-hall-history"
  | "hallucination-category-hall-params"
  | "hallucination-category-fabricate-tool-outputs"
  | "repetitive-behavior-category-repetition-tool"
  | "repetitive-behavior-category-repetition-info"
  | "repetitive-behavior-category-step-repetition"
  | "orchestration-related-errors-category-reasoning-mismatch"
  | "orchestration-related-errors-category-goal-deviation"
  | "orchestration-related-errors-category-premature-termination"
  | "orchestration-related-errors-category-unaware-termination"
  | "llm-output-category-nonsensical"
  | "configuration-mismatch-category-tool-definition"
  | "coding-use-case-specific-failure-types-category-edge-case-oversights"
  | "coding-use-case-specific-failure-types-category-dependency-issues"
  | "other"
  | (string & {});
export const InsightsFailureCategory = /*@__PURE__*/ S.String;

export interface InsightsFailureSignal {
  category: InsightsFailureCategory;
  evidence: string;
  confidence: number;
}
export const InsightsFailureSignal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    category: InsightsFailureCategory,
    evidence: S.String,
    confidence: S.Number,
  }),
).annotate({
  identifier: "InsightsFailureSignal",
}) as any as S.Schema<InsightsFailureSignal>;
export type InsightsFailureSignalList = InsightsFailureSignal[];
export const InsightsFailureSignalList = /*@__PURE__*/ S.Array(
  InsightsFailureSignal,
);
export interface FailureSpanDetail {
  spanId: string;
  traceId: string;
  signals: InsightsFailureSignal[];
}
export const FailureSpanDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spanId: S.String,
    traceId: S.String,
    signals: InsightsFailureSignalList,
  }),
).annotate({
  identifier: "FailureSpanDetail",
}) as any as S.Schema<FailureSpanDetail>;
export type FailureSpanDetailList = FailureSpanDetail[];
export const FailureSpanDetailList = /*@__PURE__*/ S.Array(FailureSpanDetail);
export interface AffectedSession {
  sessionId: string;
  explanation: string;
  fixType: string;
  recommendation: string;
  failureSpans: FailureSpanDetail[];
}
export const AffectedSession = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.String,
    explanation: S.String,
    fixType: S.String,
    recommendation: S.String,
    failureSpans: FailureSpanDetailList,
  }),
).annotate({
  identifier: "AffectedSession",
}) as any as S.Schema<AffectedSession>;
export type AffectedSessionList = AffectedSession[];
export const AffectedSessionList = /*@__PURE__*/ S.Array(AffectedSession);
export interface RootCauseCluster {
  clusterId: number;
  name: string;
  rootCause: string;
  recommendation: string;
  affectedSessionCount: number;
  affectedSessions: AffectedSession[];
}
export const RootCauseCluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterId: S.Number,
    name: S.String,
    rootCause: S.String,
    recommendation: S.String,
    affectedSessionCount: S.Number,
    affectedSessions: AffectedSessionList,
  }),
).annotate({
  identifier: "RootCauseCluster",
}) as any as S.Schema<RootCauseCluster>;
export type RootCauseClusterList = RootCauseCluster[];
export const RootCauseClusterList = /*@__PURE__*/ S.Array(RootCauseCluster);
export interface FailureSubCategoryCluster {
  clusterId: number;
  name: string;
  description: string;
  affectedSessionCount: number;
  rootCauses: RootCauseCluster[];
}
export const FailureSubCategoryCluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterId: S.Number,
    name: S.String,
    description: S.String,
    affectedSessionCount: S.Number,
    rootCauses: RootCauseClusterList,
  }),
).annotate({
  identifier: "FailureSubCategoryCluster",
}) as any as S.Schema<FailureSubCategoryCluster>;
export type FailureSubCategoryClusterList = FailureSubCategoryCluster[];
export const FailureSubCategoryClusterList = /*@__PURE__*/ S.Array(
  FailureSubCategoryCluster,
);
export interface FailureCategoryCluster {
  clusterId: number;
  name: string;
  description: string;
  affectedSessionCount: number;
  subCategories: FailureSubCategoryCluster[];
}
export const FailureCategoryCluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterId: S.Number,
    name: S.String,
    description: S.String,
    affectedSessionCount: S.Number,
    subCategories: FailureSubCategoryClusterList,
  }),
).annotate({
  identifier: "FailureCategoryCluster",
}) as any as S.Schema<FailureCategoryCluster>;
export type FailureCategoryClusterList = FailureCategoryCluster[];
export const FailureCategoryClusterList = /*@__PURE__*/ S.Array(
  FailureCategoryCluster,
);
export interface FailureAnalysisResultContent {
  failures: FailureCategoryCluster[];
}
export const FailureAnalysisResultContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ failures: FailureCategoryClusterList }),
).annotate({
  identifier: "FailureAnalysisResultContent",
}) as any as S.Schema<FailureAnalysisResultContent>;
export type UserIntentList = string[];
export const UserIntentList = /*@__PURE__*/ S.Array(S.String);
export interface UserIntentAffectedSession {
  sessionId: string;
  userMessages: string[];
}
export const UserIntentAffectedSession = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sessionId: S.String, userMessages: UserIntentList }),
).annotate({
  identifier: "UserIntentAffectedSession",
}) as any as S.Schema<UserIntentAffectedSession>;
export type UserIntentAffectedSessionList = UserIntentAffectedSession[];
export const UserIntentAffectedSessionList = /*@__PURE__*/ S.Array(
  UserIntentAffectedSession,
);
export interface UserIntentCluster {
  clusterId: number;
  name: string;
  description: string;
  affectedSessionCount: number;
  affectedSessions: UserIntentAffectedSession[];
}
export const UserIntentCluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterId: S.Number,
    name: S.String,
    description: S.String,
    affectedSessionCount: S.Number,
    affectedSessions: UserIntentAffectedSessionList,
  }),
).annotate({
  identifier: "UserIntentCluster",
}) as any as S.Schema<UserIntentCluster>;
export type UserIntentClusterList = UserIntentCluster[];
export const UserIntentClusterList = /*@__PURE__*/ S.Array(UserIntentCluster);
export interface UserIntentClusteringResultContent {
  userIntents: UserIntentCluster[];
}
export const UserIntentClusteringResultContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userIntents: UserIntentClusterList }),
).annotate({
  identifier: "UserIntentClusteringResultContent",
}) as any as S.Schema<UserIntentClusteringResultContent>;
export interface ExecutionSummaryAffectedSession {
  sessionId: string;
  approachTaken: string;
  finalOutcome: string;
}
export const ExecutionSummaryAffectedSession = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.String,
    approachTaken: S.String,
    finalOutcome: S.String,
  }),
).annotate({
  identifier: "ExecutionSummaryAffectedSession",
}) as any as S.Schema<ExecutionSummaryAffectedSession>;
export type ExecutionSummaryAffectedSessionList =
  ExecutionSummaryAffectedSession[];
export const ExecutionSummaryAffectedSessionList = /*@__PURE__*/ S.Array(
  ExecutionSummaryAffectedSession,
);
export interface ExecutionSummaryCluster {
  clusterId: number;
  name: string;
  description: string;
  affectedSessionCount: number;
  affectedSessions: ExecutionSummaryAffectedSession[];
}
export const ExecutionSummaryCluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterId: S.Number,
    name: S.String,
    description: S.String,
    affectedSessionCount: S.Number,
    affectedSessions: ExecutionSummaryAffectedSessionList,
  }),
).annotate({
  identifier: "ExecutionSummaryCluster",
}) as any as S.Schema<ExecutionSummaryCluster>;
export type ExecutionSummaryClusterList = ExecutionSummaryCluster[];
export const ExecutionSummaryClusterList = /*@__PURE__*/ S.Array(
  ExecutionSummaryCluster,
);
export interface ExecutionSummaryClusteringResultContent {
  executionSummaries: ExecutionSummaryCluster[];
}
export const ExecutionSummaryClusteringResultContent = /*@__PURE__*/ S.suspend(
  () => S.Struct({ executionSummaries: ExecutionSummaryClusterList }),
).annotate({
  identifier: "ExecutionSummaryClusteringResultContent",
}) as any as S.Schema<ExecutionSummaryClusteringResultContent>;
export type BatchEvaluationDescription = string;
export type KmsKeyArn = string;
export interface GetBatchEvaluationResponse {
  batchEvaluationId: string;
  batchEvaluationArn: string;
  batchEvaluationName: string;
  status: BatchEvaluationStatus;
  createdAt: Date;
  evaluators?: Evaluator[];
  insights?: Insight[];
  dataSourceConfig?: DataSourceConfig;
  outputConfig?: OutputConfig;
  evaluationResults?: EvaluationJobResults;
  failureAnalysisResult?: FailureAnalysisResultContent;
  userIntentResult?: UserIntentClusteringResultContent;
  executionSummaryResult?: ExecutionSummaryClusteringResultContent;
  errorDetails?: string[];
  description?: string;
  updatedAt?: Date;
  kmsKeyArn?: string;
}
export const GetBatchEvaluationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    batchEvaluationId: S.String,
    batchEvaluationArn: S.String,
    batchEvaluationName: S.String,
    status: BatchEvaluationStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    evaluators: S.optional(EvaluatorList),
    insights: S.optional(InsightList),
    dataSourceConfig: S.optional(DataSourceConfig),
    outputConfig: S.optional(OutputConfig),
    evaluationResults: S.optional(EvaluationJobResults),
    failureAnalysisResult: S.optional(FailureAnalysisResultContent),
    userIntentResult: S.optional(UserIntentClusteringResultContent),
    executionSummaryResult: S.optional(ExecutionSummaryClusteringResultContent),
    errorDetails: S.optional(ErrorDetailsList),
    description: S.optional(S.String),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    kmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetBatchEvaluationResponse",
}) as any as S.Schema<GetBatchEvaluationResponse>;
export type BrowserSessionId = string;
export interface GetBrowserSessionRequest {
  browserIdentifier: string;
  sessionId: string;
}
export const GetBrowserSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    browserIdentifier: S.String.pipe(T.HttpLabel("browserIdentifier")),
    sessionId: S.String.pipe(T.HttpQuery("sessionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/browsers/{browserIdentifier}/sessions/get",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBrowserSessionRequest",
}) as any as S.Schema<GetBrowserSessionRequest>;
export type Name = string;
export type ViewPortWidth = number;
export type ViewPortHeight = number;
export interface ViewPort {
  width: number;
  height: number;
}
export const ViewPort = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ width: S.Number, height: S.Number }),
).annotate({ identifier: "ViewPort" }) as any as S.Schema<ViewPort>;
export interface S3Location {
  bucket: string;
  prefix: string;
  versionId?: string;
}
export const S3Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucket: S.String,
    prefix: S.String,
    versionId: S.optional(S.String),
  }),
).annotate({ identifier: "S3Location" }) as any as S.Schema<S3Location>;
export type ResourceLocation = { s3: S3Location };
export const ResourceLocation = /*@__PURE__*/ S.Union([
  S.Struct({ s3: S3Location }),
]);
export interface BrowserExtension {
  location: ResourceLocation;
}
export const BrowserExtension = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ location: ResourceLocation }),
).annotate({
  identifier: "BrowserExtension",
}) as any as S.Schema<BrowserExtension>;
export type BrowserExtensions = BrowserExtension[];
export const BrowserExtensions = /*@__PURE__*/ S.Array(BrowserExtension);
export type BrowserEnterprisePolicyType =
  | "MANAGED"
  | "RECOMMENDED"
  | (string & {});
export const BrowserEnterprisePolicyType = /*@__PURE__*/ S.String;

export interface BrowserEnterprisePolicy {
  location: ResourceLocation;
  type?: BrowserEnterprisePolicyType;
}
export const BrowserEnterprisePolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    location: ResourceLocation,
    type: S.optional(BrowserEnterprisePolicyType),
  }),
).annotate({
  identifier: "BrowserEnterprisePolicy",
}) as any as S.Schema<BrowserEnterprisePolicy>;
export type BrowserEnterprisePolicies = BrowserEnterprisePolicy[];
export const BrowserEnterprisePolicies = /*@__PURE__*/ S.Array(
  BrowserEnterprisePolicy,
);
export type BrowserProfileId = string;
export interface BrowserProfileConfiguration {
  profileIdentifier: string;
}
export const BrowserProfileConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ profileIdentifier: S.String }),
).annotate({
  identifier: "BrowserProfileConfiguration",
}) as any as S.Schema<BrowserProfileConfiguration>;
export type BrowserSessionTimeout = number;
export type BrowserSessionStatus = "READY" | "TERMINATED" | (string & {});
export const BrowserSessionStatus = /*@__PURE__*/ S.String;

export type BrowserStreamEndpoint = string;
export type AutomationStreamStatus = "ENABLED" | "DISABLED" | (string & {});
export const AutomationStreamStatus = /*@__PURE__*/ S.String;

export interface AutomationStream {
  streamEndpoint: string;
  streamStatus: AutomationStreamStatus;
}
export const AutomationStream = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ streamEndpoint: S.String, streamStatus: AutomationStreamStatus }),
).annotate({
  identifier: "AutomationStream",
}) as any as S.Schema<AutomationStream>;
export interface LiveViewStream {
  streamEndpoint?: string;
}
export const LiveViewStream = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ streamEndpoint: S.optional(S.String) }),
).annotate({ identifier: "LiveViewStream" }) as any as S.Schema<LiveViewStream>;
export interface BrowserSessionStream {
  automationStream: AutomationStream;
  liveViewStream?: LiveViewStream;
}
export const BrowserSessionStream = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    automationStream: AutomationStream,
    liveViewStream: S.optional(LiveViewStream),
  }),
).annotate({
  identifier: "BrowserSessionStream",
}) as any as S.Schema<BrowserSessionStream>;
export type HostName = string;
export type DomainPattern = string;
export type DomainPatterns = string[];
export const DomainPatterns = /*@__PURE__*/ S.Array(S.String);
export type SecretArn = string;
export interface BasicAuth {
  secretArn: string;
}
export const BasicAuth = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ secretArn: S.String }),
).annotate({ identifier: "BasicAuth" }) as any as S.Schema<BasicAuth>;
export type ProxyCredentials = { basicAuth: BasicAuth };
export const ProxyCredentials = /*@__PURE__*/ S.Union([
  S.Struct({ basicAuth: BasicAuth }),
]);
export interface ExternalProxy {
  server: string;
  port: number;
  domainPatterns?: string[];
  credentials?: ProxyCredentials;
}
export const ExternalProxy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    server: S.String,
    port: S.Number,
    domainPatterns: S.optional(DomainPatterns),
    credentials: S.optional(ProxyCredentials),
  }),
).annotate({ identifier: "ExternalProxy" }) as any as S.Schema<ExternalProxy>;
export type Proxy = { externalProxy: ExternalProxy };
export const Proxy = /*@__PURE__*/ S.Union([
  S.Struct({ externalProxy: ExternalProxy }),
]);
export type Proxies = Proxy[];
export const Proxies = /*@__PURE__*/ S.Array(Proxy);
export interface ProxyBypass {
  domainPatterns?: string[];
}
export const ProxyBypass = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainPatterns: S.optional(DomainPatterns) }),
).annotate({ identifier: "ProxyBypass" }) as any as S.Schema<ProxyBypass>;
export interface ProxyConfiguration {
  proxies: Proxy[];
  bypass?: ProxyBypass;
}
export const ProxyConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ proxies: Proxies, bypass: S.optional(ProxyBypass) }),
).annotate({
  identifier: "ProxyConfiguration",
}) as any as S.Schema<ProxyConfiguration>;
export interface SecretsManagerLocation {
  secretArn: string;
}
export const SecretsManagerLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ secretArn: S.String }),
).annotate({
  identifier: "SecretsManagerLocation",
}) as any as S.Schema<SecretsManagerLocation>;
export type CertificateLocation = { secretsManager: SecretsManagerLocation };
export const CertificateLocation = /*@__PURE__*/ S.Union([
  S.Struct({ secretsManager: SecretsManagerLocation }),
]);
export interface Certificate {
  location: CertificateLocation;
}
export const Certificate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ location: CertificateLocation }),
).annotate({ identifier: "Certificate" }) as any as S.Schema<Certificate>;
export type Certificates = Certificate[];
export const Certificates = /*@__PURE__*/ S.Array(Certificate);
export interface GetBrowserSessionResponse {
  browserIdentifier: string;
  sessionId: string;
  name?: string;
  createdAt: Date;
  viewPort?: ViewPort;
  extensions?: BrowserExtension[];
  enterprisePolicies?: BrowserEnterprisePolicy[];
  profileConfiguration?: BrowserProfileConfiguration;
  sessionTimeoutSeconds?: number;
  status?: BrowserSessionStatus;
  streams?: BrowserSessionStream;
  proxyConfiguration?: ProxyConfiguration;
  certificates?: Certificate[];
  sessionReplayArtifact?: string;
  lastUpdatedAt?: Date;
}
export const GetBrowserSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    browserIdentifier: S.String,
    sessionId: S.String,
    name: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    viewPort: S.optional(ViewPort),
    extensions: S.optional(BrowserExtensions),
    enterprisePolicies: S.optional(BrowserEnterprisePolicies),
    profileConfiguration: S.optional(BrowserProfileConfiguration),
    sessionTimeoutSeconds: S.optional(S.Number),
    status: S.optional(BrowserSessionStatus),
    streams: S.optional(BrowserSessionStream),
    proxyConfiguration: S.optional(ProxyConfiguration),
    certificates: S.optional(Certificates),
    sessionReplayArtifact: S.optional(S.String),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetBrowserSessionResponse",
}) as any as S.Schema<GetBrowserSessionResponse>;
export type CodeInterpreterSessionId = string;
export interface GetCodeInterpreterSessionRequest {
  codeInterpreterIdentifier: string;
  sessionId: string;
}
export const GetCodeInterpreterSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeInterpreterIdentifier: S.String.pipe(
      T.HttpLabel("codeInterpreterIdentifier"),
    ),
    sessionId: S.String.pipe(T.HttpQuery("sessionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/code-interpreters/{codeInterpreterIdentifier}/sessions/get",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCodeInterpreterSessionRequest",
}) as any as S.Schema<GetCodeInterpreterSessionRequest>;
export type CodeInterpreterSessionTimeout = number;
export type CodeInterpreterSessionStatus =
  | "READY"
  | "TERMINATED"
  | (string & {});
export const CodeInterpreterSessionStatus = /*@__PURE__*/ S.String;

export interface GetCodeInterpreterSessionResponse {
  codeInterpreterIdentifier: string;
  sessionId: string;
  name?: string;
  createdAt: Date;
  sessionTimeoutSeconds?: number;
  status?: CodeInterpreterSessionStatus;
  certificates?: Certificate[];
}
export const GetCodeInterpreterSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeInterpreterIdentifier: S.String,
    sessionId: S.String,
    name: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    sessionTimeoutSeconds: S.optional(S.Number),
    status: S.optional(CodeInterpreterSessionStatus),
    certificates: S.optional(Certificates),
  }),
).annotate({
  identifier: "GetCodeInterpreterSessionResponse",
}) as any as S.Schema<GetCodeInterpreterSessionResponse>;
export interface GetEventInput {
  memoryId: string;
  sessionId: string;
  actorId: string;
  eventId: string;
}
export const GetEventInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memoryId: S.String.pipe(T.HttpLabel("memoryId")),
    sessionId: S.String.pipe(T.HttpLabel("sessionId")),
    actorId: S.String.pipe(T.HttpLabel("actorId")),
    eventId: S.String.pipe(T.HttpLabel("eventId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/memories/{memoryId}/actor/{actorId}/sessions/{sessionId}/events/{eventId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetEventInput" }) as any as S.Schema<GetEventInput>;
export interface GetEventOutput {
  event: Event;
}
export const GetEventOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ event: Event }),
).annotate({ identifier: "GetEventOutput" }) as any as S.Schema<GetEventOutput>;
export interface GetMemoryRecordInput {
  memoryId: string;
  memoryRecordId: string;
}
export const GetMemoryRecordInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memoryId: S.String.pipe(T.HttpLabel("memoryId")),
    memoryRecordId: S.String.pipe(T.HttpLabel("memoryRecordId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/memories/{memoryId}/memoryRecord/{memoryRecordId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMemoryRecordInput",
}) as any as S.Schema<GetMemoryRecordInput>;
export interface MemoryRecord {
  memoryRecordId: string;
  content: MemoryContent;
  memoryStrategyId?: string;
  namespaces: string[];
  createdAt: Date;
  metadata?: { [key: string]: MemoryRecordMetadataValue | undefined };
}
export const MemoryRecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memoryRecordId: S.String,
    content: MemoryContent,
    memoryStrategyId: S.optional(S.String),
    namespaces: NamespacesList,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    metadata: S.optional(MemoryRecordMetadataMap),
  }),
).annotate({ identifier: "MemoryRecord" }) as any as S.Schema<MemoryRecord>;
export interface GetMemoryRecordOutput {
  memoryRecord: MemoryRecord;
}
export const GetMemoryRecordOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ memoryRecord: MemoryRecord }),
).annotate({
  identifier: "GetMemoryRecordOutput",
}) as any as S.Schema<GetMemoryRecordOutput>;
export interface GetPaymentInstrumentRequest {
  userId?: string;
  agentName?: string;
  paymentManagerArn: string;
  paymentConnectorId?: string;
  paymentInstrumentId: string;
}
export const GetPaymentInstrumentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userId: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-User-Id"),
    ),
    agentName: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-Agent-Name"),
    ),
    paymentManagerArn: S.String,
    paymentConnectorId: S.optional(S.String),
    paymentInstrumentId: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/payments/getPaymentInstrument" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPaymentInstrumentRequest",
}) as any as S.Schema<GetPaymentInstrumentRequest>;
export interface GetPaymentInstrumentResponse {
  paymentInstrument: PaymentInstrument;
}
export const GetPaymentInstrumentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ paymentInstrument: PaymentInstrument }),
).annotate({
  identifier: "GetPaymentInstrumentResponse",
}) as any as S.Schema<GetPaymentInstrumentResponse>;
export type BlockchainChainId =
  | "BASE"
  | "BASE_SEPOLIA"
  | "ETHEREUM"
  | "SOLANA"
  | "SOLANA_DEVNET"
  | (string & {});
export const BlockchainChainId = /*@__PURE__*/ S.String;

export type InstrumentBalanceToken = "USDC" | (string & {});
export const InstrumentBalanceToken = /*@__PURE__*/ S.String;

export interface GetPaymentInstrumentBalanceRequest {
  userId?: string;
  agentName?: string;
  paymentManagerArn: string;
  paymentConnectorId: string;
  paymentInstrumentId: string;
  chain: BlockchainChainId;
  token: InstrumentBalanceToken;
}
export const GetPaymentInstrumentBalanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userId: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-User-Id"),
    ),
    agentName: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-Agent-Name"),
    ),
    paymentManagerArn: S.String,
    paymentConnectorId: S.String,
    paymentInstrumentId: S.String,
    chain: BlockchainChainId,
    token: InstrumentBalanceToken,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/payments/getPaymentInstrumentBalance" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPaymentInstrumentBalanceRequest",
}) as any as S.Schema<GetPaymentInstrumentBalanceRequest>;
export interface TokenBalance {
  amount: string;
  decimals: number;
  token: InstrumentBalanceToken;
  network: CryptoWalletNetwork;
  chain: BlockchainChainId;
}
export const TokenBalance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    amount: S.String,
    decimals: S.Number,
    token: InstrumentBalanceToken,
    network: CryptoWalletNetwork,
    chain: BlockchainChainId,
  }),
).annotate({ identifier: "TokenBalance" }) as any as S.Schema<TokenBalance>;
export interface GetPaymentInstrumentBalanceResponse {
  paymentInstrumentId: string;
  tokenBalance: TokenBalance;
}
export const GetPaymentInstrumentBalanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ paymentInstrumentId: S.String, tokenBalance: TokenBalance }),
).annotate({
  identifier: "GetPaymentInstrumentBalanceResponse",
}) as any as S.Schema<GetPaymentInstrumentBalanceResponse>;
export interface GetPaymentSessionRequest {
  userId?: string;
  agentName?: string;
  paymentManagerArn: string;
  paymentSessionId: string;
}
export const GetPaymentSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userId: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-User-Id"),
    ),
    agentName: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-Agent-Name"),
    ),
    paymentManagerArn: S.String,
    paymentSessionId: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/payments/getPaymentSession" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPaymentSessionRequest",
}) as any as S.Schema<GetPaymentSessionRequest>;
export interface GetPaymentSessionResponse {
  paymentSession: PaymentSession;
}
export const GetPaymentSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ paymentSession: PaymentSession }),
).annotate({
  identifier: "GetPaymentSessionResponse",
}) as any as S.Schema<GetPaymentSessionResponse>;
export interface GetRecommendationRequest {
  recommendationId: string;
}
export const GetRecommendationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendationId: S.String.pipe(T.HttpLabel("recommendationId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/recommendations/{recommendationId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRecommendationRequest",
}) as any as S.Schema<GetRecommendationRequest>;
export type RecommendationArn = string;
export type RecommendationName = string;
export type RecommendationDescription = string;
export type RecommendationType =
  | "SYSTEM_PROMPT_RECOMMENDATION"
  | "TOOL_DESCRIPTION_RECOMMENDATION"
  | (string & {});
export const RecommendationType = /*@__PURE__*/ S.String;

export type SystemPromptText = string | redacted.Redacted<string>;
export type ConfigurationBundleVersionId = string;
export interface SystemPromptConfigurationBundle {
  bundleArn: string;
  versionId: string;
  systemPromptJsonPath: string;
}
export const SystemPromptConfigurationBundle = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bundleArn: S.String,
    versionId: S.String,
    systemPromptJsonPath: S.String,
  }),
).annotate({
  identifier: "SystemPromptConfigurationBundle",
}) as any as S.Schema<SystemPromptConfigurationBundle>;
export type SystemPromptConfig =
  | { text: string | redacted.Redacted<string>; configurationBundle?: never }
  | { text?: never; configurationBundle: SystemPromptConfigurationBundle };
export const SystemPromptConfig = /*@__PURE__*/ S.Union([
  S.Struct({ text: SensitiveString }),
  S.Struct({ configurationBundle: SystemPromptConfigurationBundle }),
]);
export type LogGroupArnList = string[];
export const LogGroupArnList = /*@__PURE__*/ S.Array(S.String);
export type ServiceName = string;
export type ServiceNameList = string[];
export const ServiceNameList = /*@__PURE__*/ S.Array(S.String);
export type CloudWatchLogsFilterOperator =
  | "Equals"
  | "NotEquals"
  | "GreaterThan"
  | "LessThan"
  | "GreaterThanOrEqual"
  | "LessThanOrEqual"
  | "Contains"
  | "NotContains"
  | (string & {});
export const CloudWatchLogsFilterOperator = /*@__PURE__*/ S.String;

export type FilterStringValue = string;
export type FilterValue =
  | { stringValue: string; doubleValue?: never; booleanValue?: never }
  | { stringValue?: never; doubleValue: number; booleanValue?: never }
  | { stringValue?: never; doubleValue?: never; booleanValue: boolean };
export const FilterValue = /*@__PURE__*/ S.Union([
  S.Struct({ stringValue: S.String }),
  S.Struct({ doubleValue: S.Number }),
  S.Struct({ booleanValue: S.Boolean }),
]);
export interface CloudWatchLogsFilter {
  key: string;
  operator: CloudWatchLogsFilterOperator;
  value: FilterValue;
}
export const CloudWatchLogsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    key: S.String,
    operator: CloudWatchLogsFilterOperator,
    value: FilterValue,
  }),
).annotate({
  identifier: "CloudWatchLogsFilter",
}) as any as S.Schema<CloudWatchLogsFilter>;
export type CloudWatchLogsFilterList = CloudWatchLogsFilter[];
export const CloudWatchLogsFilterList =
  /*@__PURE__*/ S.Array(CloudWatchLogsFilter);
export interface CloudWatchLogsRule {
  filters?: CloudWatchLogsFilter[];
}
export const CloudWatchLogsRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ filters: S.optional(CloudWatchLogsFilterList) }),
).annotate({
  identifier: "CloudWatchLogsRule",
}) as any as S.Schema<CloudWatchLogsRule>;
export interface CloudWatchLogsTraceConfig {
  logGroupArns: string[];
  serviceNames: string[];
  startTime: Date;
  endTime: Date;
  rule?: CloudWatchLogsRule;
}
export const CloudWatchLogsTraceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    logGroupArns: LogGroupArnList,
    serviceNames: ServiceNameList,
    startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    endTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    rule: S.optional(CloudWatchLogsRule),
  }),
).annotate({
  identifier: "CloudWatchLogsTraceConfig",
}) as any as S.Schema<CloudWatchLogsTraceConfig>;
export interface BatchEvaluationTraceConfig {
  batchEvaluationArn: string;
}
export const BatchEvaluationTraceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ batchEvaluationArn: S.String }),
).annotate({
  identifier: "BatchEvaluationTraceConfig",
}) as any as S.Schema<BatchEvaluationTraceConfig>;
export type AgentTracesConfig =
  | { sessionSpans: any[]; cloudwatchLogs?: never; batchEvaluation?: never }
  | {
      sessionSpans?: never;
      cloudwatchLogs: CloudWatchLogsTraceConfig;
      batchEvaluation?: never;
    }
  | {
      sessionSpans?: never;
      cloudwatchLogs?: never;
      batchEvaluation: BatchEvaluationTraceConfig;
    };
export const AgentTracesConfig = /*@__PURE__*/ S.Union([
  S.Struct({ sessionSpans: Spans }),
  S.Struct({ cloudwatchLogs: CloudWatchLogsTraceConfig }),
  S.Struct({ batchEvaluation: BatchEvaluationTraceConfig }),
]);
export interface RecommendationEvaluatorReference {
  evaluatorArn: string;
}
export const RecommendationEvaluatorReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ evaluatorArn: S.String }),
).annotate({
  identifier: "RecommendationEvaluatorReference",
}) as any as S.Schema<RecommendationEvaluatorReference>;
export type RecommendationEvaluatorList = RecommendationEvaluatorReference[];
export const RecommendationEvaluatorList = /*@__PURE__*/ S.Array(
  RecommendationEvaluatorReference,
);
export interface RecommendationEvaluationConfig {
  evaluators: RecommendationEvaluatorReference[];
}
export const RecommendationEvaluationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ evaluators: RecommendationEvaluatorList }),
).annotate({
  identifier: "RecommendationEvaluationConfig",
}) as any as S.Schema<RecommendationEvaluationConfig>;
export interface SystemPromptRecommendationConfig {
  systemPrompt: SystemPromptConfig;
  agentTraces: AgentTracesConfig;
  evaluationConfig?: RecommendationEvaluationConfig;
}
export const SystemPromptRecommendationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    systemPrompt: SystemPromptConfig,
    agentTraces: AgentTracesConfig,
    evaluationConfig: S.optional(RecommendationEvaluationConfig),
  }),
).annotate({
  identifier: "SystemPromptRecommendationConfig",
}) as any as S.Schema<SystemPromptRecommendationConfig>;
export type RecommendationToolName = string;
export type ToolDescriptionText = string | redacted.Redacted<string>;
export type ToolDescriptionConfig = {
  text: string | redacted.Redacted<string>;
};
export const ToolDescriptionConfig = /*@__PURE__*/ S.Union([
  S.Struct({ text: SensitiveString }),
]);
export interface ToolDescriptionInput {
  toolName: string;
  toolDescription: ToolDescriptionConfig;
}
export const ToolDescriptionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ toolName: S.String, toolDescription: ToolDescriptionConfig }),
).annotate({
  identifier: "ToolDescriptionInput",
}) as any as S.Schema<ToolDescriptionInput>;
export type ToolDescriptionList = ToolDescriptionInput[];
export const ToolDescriptionList = /*@__PURE__*/ S.Array(ToolDescriptionInput);
export interface ToolDescriptionTextInput {
  tools: ToolDescriptionInput[];
}
export const ToolDescriptionTextInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tools: ToolDescriptionList }),
).annotate({
  identifier: "ToolDescriptionTextInput",
}) as any as S.Schema<ToolDescriptionTextInput>;
export interface ConfigurationBundleToolEntry {
  toolName: string;
  toolDescriptionJsonPath: string;
}
export const ConfigurationBundleToolEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ toolName: S.String, toolDescriptionJsonPath: S.String }),
).annotate({
  identifier: "ConfigurationBundleToolEntry",
}) as any as S.Schema<ConfigurationBundleToolEntry>;
export type ConfigurationBundleToolEntryList = ConfigurationBundleToolEntry[];
export const ConfigurationBundleToolEntryList = /*@__PURE__*/ S.Array(
  ConfigurationBundleToolEntry,
);
export interface ToolDescriptionConfigurationBundle {
  bundleArn: string;
  versionId: string;
  tools: ConfigurationBundleToolEntry[];
}
export const ToolDescriptionConfigurationBundle = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bundleArn: S.String,
    versionId: S.String,
    tools: ConfigurationBundleToolEntryList,
  }),
).annotate({
  identifier: "ToolDescriptionConfigurationBundle",
}) as any as S.Schema<ToolDescriptionConfigurationBundle>;
export type ToolDescriptionSource =
  | {
      toolDescriptionText: ToolDescriptionTextInput;
      configurationBundle?: never;
    }
  | {
      toolDescriptionText?: never;
      configurationBundle: ToolDescriptionConfigurationBundle;
    };
export const ToolDescriptionSource = /*@__PURE__*/ S.Union([
  S.Struct({ toolDescriptionText: ToolDescriptionTextInput }),
  S.Struct({ configurationBundle: ToolDescriptionConfigurationBundle }),
]);
export interface ToolDescriptionRecommendationConfig {
  toolDescription: ToolDescriptionSource;
  agentTraces: AgentTracesConfig;
}
export const ToolDescriptionRecommendationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    toolDescription: ToolDescriptionSource,
    agentTraces: AgentTracesConfig,
  }),
).annotate({
  identifier: "ToolDescriptionRecommendationConfig",
}) as any as S.Schema<ToolDescriptionRecommendationConfig>;
export type RecommendationConfig =
  | {
      systemPromptRecommendationConfig: SystemPromptRecommendationConfig;
      toolDescriptionRecommendationConfig?: never;
    }
  | {
      systemPromptRecommendationConfig?: never;
      toolDescriptionRecommendationConfig: ToolDescriptionRecommendationConfig;
    };
export const RecommendationConfig = /*@__PURE__*/ S.Union([
  S.Struct({
    systemPromptRecommendationConfig: SystemPromptRecommendationConfig,
  }),
  S.Struct({
    toolDescriptionRecommendationConfig: ToolDescriptionRecommendationConfig,
  }),
]);
export interface RecommendationResultConfigurationBundle {
  bundleArn: string;
  versionId: string;
}
export const RecommendationResultConfigurationBundle = /*@__PURE__*/ S.suspend(
  () => S.Struct({ bundleArn: S.String, versionId: S.String }),
).annotate({
  identifier: "RecommendationResultConfigurationBundle",
}) as any as S.Schema<RecommendationResultConfigurationBundle>;
export type RecommendationExplanation = string;
export type RecommendationErrorCode = string;
export type RecommendationErrorMessage = string;
export interface SystemPromptRecommendationResult {
  recommendedSystemPrompt?: string | redacted.Redacted<string>;
  configurationBundle?: RecommendationResultConfigurationBundle;
  explanation?: string;
  errorCode?: string;
  errorMessage?: string;
}
export const SystemPromptRecommendationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendedSystemPrompt: S.optional(SensitiveString),
    configurationBundle: S.optional(RecommendationResultConfigurationBundle),
    explanation: S.optional(S.String),
    errorCode: S.optional(S.String),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "SystemPromptRecommendationResult",
}) as any as S.Schema<SystemPromptRecommendationResult>;
export interface ToolDescriptionOutput {
  toolName: string;
  recommendedToolDescription?: string | redacted.Redacted<string>;
  explanation?: string;
}
export const ToolDescriptionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    toolName: S.String,
    recommendedToolDescription: S.optional(SensitiveString),
    explanation: S.optional(S.String),
  }),
).annotate({
  identifier: "ToolDescriptionOutput",
}) as any as S.Schema<ToolDescriptionOutput>;
export type ToolDescriptionResultList = ToolDescriptionOutput[];
export const ToolDescriptionResultList = /*@__PURE__*/ S.Array(
  ToolDescriptionOutput,
);
export interface ToolDescriptionRecommendationResult {
  tools?: ToolDescriptionOutput[];
  configurationBundle?: RecommendationResultConfigurationBundle;
  errorCode?: string;
  errorMessage?: string;
}
export const ToolDescriptionRecommendationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tools: S.optional(ToolDescriptionResultList),
    configurationBundle: S.optional(RecommendationResultConfigurationBundle),
    errorCode: S.optional(S.String),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "ToolDescriptionRecommendationResult",
}) as any as S.Schema<ToolDescriptionRecommendationResult>;
export type RecommendationResult =
  | {
      systemPromptRecommendationResult: SystemPromptRecommendationResult;
      toolDescriptionRecommendationResult?: never;
    }
  | {
      systemPromptRecommendationResult?: never;
      toolDescriptionRecommendationResult: ToolDescriptionRecommendationResult;
    };
export const RecommendationResult = /*@__PURE__*/ S.Union([
  S.Struct({
    systemPromptRecommendationResult: SystemPromptRecommendationResult,
  }),
  S.Struct({
    toolDescriptionRecommendationResult: ToolDescriptionRecommendationResult,
  }),
]);
export interface GetRecommendationResponse {
  recommendationId: string;
  recommendationArn: string;
  name: string;
  description?: string;
  type: RecommendationType;
  recommendationConfig: RecommendationConfig;
  status: RecommendationStatus;
  createdAt: Date;
  updatedAt: Date;
  recommendationResult?: RecommendationResult;
  kmsKeyArn?: string;
}
export const GetRecommendationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendationId: S.String,
    recommendationArn: S.String,
    name: S.String,
    description: S.optional(S.String),
    type: RecommendationType,
    recommendationConfig: RecommendationConfig,
    status: RecommendationStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    recommendationResult: S.optional(RecommendationResult),
    kmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetRecommendationResponse",
}) as any as S.Schema<GetRecommendationResponse>;
export type WorkloadIdentityTokenType = string | redacted.Redacted<string>;
export type CredentialProviderName = string;
export interface GetResourceApiKeyRequest {
  workloadIdentityToken: string | redacted.Redacted<string>;
  resourceCredentialProviderName: string;
}
export const GetResourceApiKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workloadIdentityToken: SensitiveString,
    resourceCredentialProviderName: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/identities/api-key" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourceApiKeyRequest",
}) as any as S.Schema<GetResourceApiKeyRequest>;
export type ApiKeyType = string | redacted.Redacted<string>;
export interface GetResourceApiKeyResponse {
  apiKey: string | redacted.Redacted<string>;
}
export const GetResourceApiKeyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apiKey: SensitiveString }),
).annotate({
  identifier: "GetResourceApiKeyResponse",
}) as any as S.Schema<GetResourceApiKeyResponse>;
export type ScopeType = string;
export type ScopesListType = string[];
export const ScopesListType = /*@__PURE__*/ S.Array(S.String);
export type Oauth2FlowType =
  | "USER_FEDERATION"
  | "M2M"
  | "ON_BEHALF_OF_TOKEN_EXCHANGE"
  | (string & {});
export const Oauth2FlowType = /*@__PURE__*/ S.String;

export type ResourceOauth2ReturnUrlType = string;
export type CustomRequestKeyType = string;
export type CustomRequestValueType = string | redacted.Redacted<string>;
export type CustomRequestParametersType = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export const CustomRequestParametersType = /*@__PURE__*/ S.Record(
  S.String,
  SensitiveString.pipe(S.optional),
);
export type State = string | redacted.Redacted<string>;
export type ResourceType = string;
export type ResourcesListType = string[];
export const ResourcesListType = /*@__PURE__*/ S.Array(S.String);
export type AudienceType = string;
export type AudiencesListType = string[];
export const AudiencesListType = /*@__PURE__*/ S.Array(S.String);
export interface GetResourceOauth2TokenRequest {
  workloadIdentityToken: string | redacted.Redacted<string>;
  resourceCredentialProviderName: string;
  scopes: string[];
  oauth2Flow: Oauth2FlowType;
  sessionUri?: string;
  resourceOauth2ReturnUrl?: string;
  forceAuthentication?: boolean;
  customParameters?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  customState?: string | redacted.Redacted<string>;
  resources?: string[];
  audiences?: string[];
}
export const GetResourceOauth2TokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workloadIdentityToken: SensitiveString,
    resourceCredentialProviderName: S.String,
    scopes: ScopesListType,
    oauth2Flow: Oauth2FlowType,
    sessionUri: S.optional(S.String),
    resourceOauth2ReturnUrl: S.optional(S.String),
    forceAuthentication: S.optional(S.Boolean),
    customParameters: S.optional(CustomRequestParametersType),
    customState: S.optional(SensitiveString),
    resources: S.optional(ResourcesListType),
    audiences: S.optional(AudiencesListType),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/identities/oauth2/token" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourceOauth2TokenRequest",
}) as any as S.Schema<GetResourceOauth2TokenRequest>;
export type AuthorizationUrlType = string | redacted.Redacted<string>;
export type AccessTokenType = string | redacted.Redacted<string>;
export type SessionStatus = "IN_PROGRESS" | "FAILED" | (string & {});
export const SessionStatus = /*@__PURE__*/ S.String;

export interface GetResourceOauth2TokenResponse {
  authorizationUrl?: string | redacted.Redacted<string>;
  accessToken?: string | redacted.Redacted<string>;
  sessionUri?: string;
  sessionStatus?: SessionStatus;
}
export const GetResourceOauth2TokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authorizationUrl: S.optional(SensitiveString),
    accessToken: S.optional(SensitiveString),
    sessionUri: S.optional(S.String),
    sessionStatus: S.optional(SessionStatus),
  }),
).annotate({
  identifier: "GetResourceOauth2TokenResponse",
}) as any as S.Schema<GetResourceOauth2TokenResponse>;
export type PaymentHttpMethodType =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | (string & {});
export const PaymentHttpMethodType = /*@__PURE__*/ S.String;

export type PaymentRequestHostType = string;
export type PaymentRequestPathType = string;
export type CoinbaseCdpPaymentRequestBodyType = string;
export interface CoinbaseCdpTokenRequestInput {
  requestMethod: PaymentHttpMethodType;
  requestHost?: string;
  requestPath: string;
  includeWalletAuthToken?: boolean;
  requestBody?: string;
}
export const CoinbaseCdpTokenRequestInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    requestMethod: PaymentHttpMethodType,
    requestHost: S.optional(S.String),
    requestPath: S.String,
    includeWalletAuthToken: S.optional(S.Boolean),
    requestBody: S.optional(S.String),
  }),
).annotate({
  identifier: "CoinbaseCdpTokenRequestInput",
}) as any as S.Schema<CoinbaseCdpTokenRequestInput>;
export type StripePrivyRequestHostType = string;
export type StripePrivyRequestPathType = string;
export type StripePrivyRequestBodyType = string | redacted.Redacted<string>;
export interface StripePrivyTokenRequestInput {
  requestHost?: string;
  requestPath: string;
  requestBody: string | redacted.Redacted<string>;
  includeAuthorizationSignature?: boolean;
}
export const StripePrivyTokenRequestInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    requestHost: S.optional(S.String),
    requestPath: S.String,
    requestBody: SensitiveString,
    includeAuthorizationSignature: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "StripePrivyTokenRequestInput",
}) as any as S.Schema<StripePrivyTokenRequestInput>;
export type PaymentTokenRequestInput =
  | {
      coinbaseCdpTokenRequest: CoinbaseCdpTokenRequestInput;
      stripePrivyTokenRequest?: never;
    }
  | {
      coinbaseCdpTokenRequest?: never;
      stripePrivyTokenRequest: StripePrivyTokenRequestInput;
    };
export const PaymentTokenRequestInput = /*@__PURE__*/ S.Union([
  S.Struct({ coinbaseCdpTokenRequest: CoinbaseCdpTokenRequestInput }),
  S.Struct({ stripePrivyTokenRequest: StripePrivyTokenRequestInput }),
]);
export interface GetResourcePaymentTokenRequest {
  workloadIdentityToken: string | redacted.Redacted<string>;
  resourceCredentialProviderName: string;
  paymentTokenRequest: PaymentTokenRequestInput;
}
export const GetResourcePaymentTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workloadIdentityToken: SensitiveString,
    resourceCredentialProviderName: S.String,
    paymentTokenRequest: PaymentTokenRequestInput,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/identities/payment/token" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourcePaymentTokenRequest",
}) as any as S.Schema<GetResourcePaymentTokenRequest>;
export type CoinbaseCdpPaymentJwtTokenType = string | redacted.Redacted<string>;
export interface CoinbaseCdpTokenResponseOutput {
  bearerToken: string | redacted.Redacted<string>;
  walletAuthToken?: string | redacted.Redacted<string>;
}
export const CoinbaseCdpTokenResponseOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bearerToken: SensitiveString,
    walletAuthToken: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "CoinbaseCdpTokenResponseOutput",
}) as any as S.Schema<CoinbaseCdpTokenResponseOutput>;
export type StripePrivyAuthorizationSignatureType =
  | string
  | redacted.Redacted<string>;
export type StripePrivyAppIdType = string;
export type StripePrivyBasicAuthTokenType = string | redacted.Redacted<string>;
export interface StripePrivyTokenResponseOutput {
  authorizationSignature?: string | redacted.Redacted<string>;
  requestExpiry?: number;
  appId: string;
  basicAuthToken: string | redacted.Redacted<string>;
}
export const StripePrivyTokenResponseOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authorizationSignature: S.optional(SensitiveString),
    requestExpiry: S.optional(S.Number),
    appId: S.String,
    basicAuthToken: SensitiveString,
  }),
).annotate({
  identifier: "StripePrivyTokenResponseOutput",
}) as any as S.Schema<StripePrivyTokenResponseOutput>;
export type PaymentTokenResponseOutput =
  | {
      coinbaseCdpTokenResponse: CoinbaseCdpTokenResponseOutput;
      stripePrivyTokenResponse?: never;
    }
  | {
      coinbaseCdpTokenResponse?: never;
      stripePrivyTokenResponse: StripePrivyTokenResponseOutput;
    };
export const PaymentTokenResponseOutput = /*@__PURE__*/ S.Union([
  S.Struct({ coinbaseCdpTokenResponse: CoinbaseCdpTokenResponseOutput }),
  S.Struct({ stripePrivyTokenResponse: StripePrivyTokenResponseOutput }),
]);
export interface GetResourcePaymentTokenResponse {
  paymentTokenResponse: PaymentTokenResponseOutput;
}
export const GetResourcePaymentTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ paymentTokenResponse: PaymentTokenResponseOutput }),
).annotate({
  identifier: "GetResourcePaymentTokenResponse",
}) as any as S.Schema<GetResourcePaymentTokenResponse>;
export type WorkloadIdentityNameType = string;
export interface GetWorkloadAccessTokenRequest {
  workloadName: string;
}
export const GetWorkloadAccessTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workloadName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/identities/GetWorkloadAccessToken" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWorkloadAccessTokenRequest",
}) as any as S.Schema<GetWorkloadAccessTokenRequest>;
export interface GetWorkloadAccessTokenResponse {
  workloadAccessToken: string | redacted.Redacted<string>;
}
export const GetWorkloadAccessTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workloadAccessToken: SensitiveString }),
).annotate({
  identifier: "GetWorkloadAccessTokenResponse",
}) as any as S.Schema<GetWorkloadAccessTokenResponse>;
export interface GetWorkloadAccessTokenForJWTRequest {
  workloadName: string;
  userToken: string | redacted.Redacted<string>;
}
export const GetWorkloadAccessTokenForJWTRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workloadName: S.String, userToken: SensitiveString }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/identities/GetWorkloadAccessTokenForJWT",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWorkloadAccessTokenForJWTRequest",
}) as any as S.Schema<GetWorkloadAccessTokenForJWTRequest>;
export interface GetWorkloadAccessTokenForJWTResponse {
  workloadAccessToken: string | redacted.Redacted<string>;
}
export const GetWorkloadAccessTokenForJWTResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ workloadAccessToken: SensitiveString }),
).annotate({
  identifier: "GetWorkloadAccessTokenForJWTResponse",
}) as any as S.Schema<GetWorkloadAccessTokenForJWTResponse>;
export interface GetWorkloadAccessTokenForUserIdRequest {
  workloadName: string;
  userId: string;
}
export const GetWorkloadAccessTokenForUserIdRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ workloadName: S.String, userId: S.String }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/identities/GetWorkloadAccessTokenForUserId",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetWorkloadAccessTokenForUserIdRequest",
}) as any as S.Schema<GetWorkloadAccessTokenForUserIdRequest>;
export interface GetWorkloadAccessTokenForUserIdResponse {
  workloadAccessToken: string | redacted.Redacted<string>;
}
export const GetWorkloadAccessTokenForUserIdResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ workloadAccessToken: SensitiveString }),
).annotate({
  identifier: "GetWorkloadAccessTokenForUserIdResponse",
}) as any as S.Schema<GetWorkloadAccessTokenForUserIdResponse>;
export type MimeType = string;
export type StringType = string;
export type Body = Uint8Array | redacted.Redacted<Uint8Array>;
export interface InvokeAgentRuntimeRequest {
  contentType?: string;
  accept?: string;
  mcpSessionId?: string;
  runtimeSessionId?: string;
  mcpProtocolVersion?: string;
  runtimeUserId?: string;
  traceId?: string;
  traceParent?: string;
  traceState?: string;
  baggage?: string;
  agentRuntimeArn: string;
  qualifier?: string;
  accountId?: string;
  payload: T.StreamingInputBody;
}
export const InvokeAgentRuntimeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    accept: S.optional(S.String).pipe(T.HttpHeader("Accept")),
    mcpSessionId: S.optional(S.String).pipe(T.HttpHeader("Mcp-Session-Id")),
    runtimeSessionId: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Runtime-Session-Id"),
      T.IdempotencyToken(),
    ),
    mcpProtocolVersion: S.optional(S.String).pipe(
      T.HttpHeader("Mcp-Protocol-Version"),
    ),
    runtimeUserId: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Runtime-User-Id"),
    ),
    traceId: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Trace-Id")),
    traceParent: S.optional(S.String).pipe(T.HttpHeader("traceparent")),
    traceState: S.optional(S.String).pipe(T.HttpHeader("tracestate")),
    baggage: S.optional(S.String).pipe(T.HttpHeader("baggage")),
    agentRuntimeArn: S.String.pipe(T.HttpLabel("agentRuntimeArn")),
    qualifier: S.optional(S.String).pipe(T.HttpQuery("qualifier")),
    accountId: S.optional(S.String).pipe(T.HttpQuery("accountId")),
    payload: T.StreamingInput.pipe(T.HttpPayload()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/runtimes/{agentRuntimeArn}/invocations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "InvokeAgentRuntimeRequest",
}) as any as S.Schema<InvokeAgentRuntimeRequest>;
export interface InvokeAgentRuntimeResponse {
  runtimeSessionId?: string;
  mcpSessionId?: string;
  mcpProtocolVersion?: string;
  traceId?: string;
  traceParent?: string;
  traceState?: string;
  baggage?: string;
  contentType: string;
  response?: T.StreamingOutputBody;
  statusCode?: number;
}
export const InvokeAgentRuntimeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    runtimeSessionId: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Runtime-Session-Id"),
    ),
    mcpSessionId: S.optional(S.String).pipe(T.HttpHeader("Mcp-Session-Id")),
    mcpProtocolVersion: S.optional(S.String).pipe(
      T.HttpHeader("Mcp-Protocol-Version"),
    ),
    traceId: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Trace-Id")),
    traceParent: S.optional(S.String).pipe(T.HttpHeader("traceparent")),
    traceState: S.optional(S.String).pipe(T.HttpHeader("tracestate")),
    baggage: S.optional(S.String).pipe(T.HttpHeader("baggage")),
    contentType: S.String.pipe(T.HttpHeader("Content-Type")),
    response: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
    statusCode: S.optional(S.Number).pipe(T.HttpResponseCode()),
  }),
).annotate({
  identifier: "InvokeAgentRuntimeResponse",
}) as any as S.Schema<InvokeAgentRuntimeResponse>;
export interface InvokeAgentRuntimeCommandRequestBody {
  command: string;
  timeout?: number;
}
export const InvokeAgentRuntimeCommandRequestBody = /*@__PURE__*/ S.suspend(
  () => S.Struct({ command: S.String, timeout: S.optional(S.Number) }),
).annotate({
  identifier: "InvokeAgentRuntimeCommandRequestBody",
}) as any as S.Schema<InvokeAgentRuntimeCommandRequestBody>;
export interface InvokeAgentRuntimeCommandRequest {
  contentType?: string;
  accept?: string;
  runtimeSessionId?: string;
  traceId?: string;
  traceParent?: string;
  traceState?: string;
  baggage?: string;
  agentRuntimeArn: string;
  qualifier?: string;
  accountId?: string;
  body: InvokeAgentRuntimeCommandRequestBody;
}
export const InvokeAgentRuntimeCommandRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    accept: S.optional(S.String).pipe(T.HttpHeader("Accept")),
    runtimeSessionId: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Runtime-Session-Id"),
      T.IdempotencyToken(),
    ),
    traceId: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Trace-Id")),
    traceParent: S.optional(S.String).pipe(T.HttpHeader("traceparent")),
    traceState: S.optional(S.String).pipe(T.HttpHeader("tracestate")),
    baggage: S.optional(S.String).pipe(T.HttpHeader("baggage")),
    agentRuntimeArn: S.String.pipe(T.HttpLabel("agentRuntimeArn")),
    qualifier: S.optional(S.String).pipe(T.HttpQuery("qualifier")),
    accountId: S.optional(S.String).pipe(T.HttpQuery("accountId")),
    body: InvokeAgentRuntimeCommandRequestBody.pipe(T.HttpPayload()).annotate({
      identifier: "InvokeAgentRuntimeCommandRequestBody",
    }),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/runtimes/{agentRuntimeArn}/commands" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "InvokeAgentRuntimeCommandRequest",
}) as any as S.Schema<InvokeAgentRuntimeCommandRequest>;
export interface ContentStartEvent {}
export const ContentStartEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ContentStartEvent",
}) as any as S.Schema<ContentStartEvent>;
export interface ContentDeltaEvent {
  stdout?: string;
  stderr?: string;
}
export const ContentDeltaEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ stdout: S.optional(S.String), stderr: S.optional(S.String) }),
).annotate({
  identifier: "ContentDeltaEvent",
}) as any as S.Schema<ContentDeltaEvent>;
export type CommandExecutionStatus = "COMPLETED" | "TIMED_OUT" | (string & {});
export const CommandExecutionStatus = /*@__PURE__*/ S.String;

export interface ContentStopEvent {
  exitCode: number;
  status: CommandExecutionStatus;
}
export const ContentStopEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ exitCode: S.Number, status: CommandExecutionStatus }),
).annotate({
  identifier: "ContentStopEvent",
}) as any as S.Schema<ContentStopEvent>;
export interface ResponseChunk {
  contentStart?: ContentStartEvent;
  contentDelta?: ContentDeltaEvent;
  contentStop?: ContentStopEvent;
}
export const ResponseChunk = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contentStart: S.optional(ContentStartEvent),
    contentDelta: S.optional(ContentDeltaEvent),
    contentStop: S.optional(ContentStopEvent),
  }),
).annotate({ identifier: "ResponseChunk" }) as any as S.Schema<ResponseChunk>;
export type NonBlankString = string;
export type ValidationExceptionReason =
  | "CannotParse"
  | "FieldValidationFailed"
  | "IdempotentParameterMismatchException"
  | "EventInOtherSession"
  | "ResourceConflict"
  | (string & {});
export const ValidationExceptionReason = /*@__PURE__*/ S.String;

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
export type InvokeAgentRuntimeCommandStreamOutput =
  | {
      chunk: ResponseChunk;
      accessDeniedException?: never;
      internalServerException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      validationException?: never;
      runtimeClientError?: never;
    }
  | {
      chunk?: never;
      accessDeniedException: AccessDeniedException;
      internalServerException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      validationException?: never;
      runtimeClientError?: never;
    }
  | {
      chunk?: never;
      accessDeniedException?: never;
      internalServerException: InternalServerException;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      validationException?: never;
      runtimeClientError?: never;
    }
  | {
      chunk?: never;
      accessDeniedException?: never;
      internalServerException?: never;
      resourceNotFoundException: ResourceNotFoundException;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      validationException?: never;
      runtimeClientError?: never;
    }
  | {
      chunk?: never;
      accessDeniedException?: never;
      internalServerException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException: ServiceQuotaExceededException;
      throttlingException?: never;
      validationException?: never;
      runtimeClientError?: never;
    }
  | {
      chunk?: never;
      accessDeniedException?: never;
      internalServerException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException: ThrottlingException;
      validationException?: never;
      runtimeClientError?: never;
    }
  | {
      chunk?: never;
      accessDeniedException?: never;
      internalServerException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      validationException: ValidationException;
      runtimeClientError?: never;
    }
  | {
      chunk?: never;
      accessDeniedException?: never;
      internalServerException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      validationException?: never;
      runtimeClientError: RuntimeClientError;
    };
export const InvokeAgentRuntimeCommandStreamOutput =
  /*@__PURE__*/ T.EventStream(
    S.Union([
      S.Struct({ chunk: ResponseChunk }),
      S.Struct({
        accessDeniedException: S.suspend(() => AccessDeniedException).annotate({
          identifier: "AccessDeniedException",
        }),
      }),
      S.Struct({
        internalServerException: S.suspend(
          () => InternalServerException,
        ).annotate({ identifier: "InternalServerException" }),
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
        validationException: S.suspend(() => ValidationException).annotate({
          identifier: "ValidationException",
        }),
      }),
      S.Struct({
        runtimeClientError: S.suspend(() => RuntimeClientError).annotate({
          identifier: "RuntimeClientError",
        }),
      }),
    ]),
  ) as any as S.Schema<
    stream.Stream<InvokeAgentRuntimeCommandStreamOutput, Error, never>
  >;
export interface InvokeAgentRuntimeCommandResponse {
  runtimeSessionId?: string;
  traceId?: string;
  traceParent?: string;
  traceState?: string;
  baggage?: string;
  contentType: string;
  statusCode?: number;
  stream: stream.Stream<InvokeAgentRuntimeCommandStreamOutput, Error, never>;
}
export const InvokeAgentRuntimeCommandResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    runtimeSessionId: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Runtime-Session-Id"),
    ),
    traceId: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Trace-Id")),
    traceParent: S.optional(S.String).pipe(T.HttpHeader("traceparent")),
    traceState: S.optional(S.String).pipe(T.HttpHeader("tracestate")),
    baggage: S.optional(S.String).pipe(T.HttpHeader("baggage")),
    contentType: S.String.pipe(T.HttpHeader("Content-Type")),
    statusCode: S.optional(S.Number).pipe(T.HttpResponseCode()),
    stream: InvokeAgentRuntimeCommandStreamOutput.pipe(T.HttpPayload()),
  }),
).annotate({
  identifier: "InvokeAgentRuntimeCommandResponse",
}) as any as S.Schema<InvokeAgentRuntimeCommandResponse>;
export type MouseButton = "LEFT" | "RIGHT" | "MIDDLE" | (string & {});
export const MouseButton = /*@__PURE__*/ S.String;

export interface MouseClickArguments {
  x: number;
  y: number;
  button?: MouseButton;
  clickCount?: number;
}
export const MouseClickArguments = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    x: S.Number,
    y: S.Number,
    button: S.optional(MouseButton),
    clickCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "MouseClickArguments",
}) as any as S.Schema<MouseClickArguments>;
export interface MouseMoveArguments {
  x: number;
  y: number;
}
export const MouseMoveArguments = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ x: S.Number, y: S.Number }),
).annotate({
  identifier: "MouseMoveArguments",
}) as any as S.Schema<MouseMoveArguments>;
export interface MouseDragArguments {
  endX: number;
  endY: number;
  startX: number;
  startY: number;
  button?: MouseButton;
}
export const MouseDragArguments = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    endX: S.Number,
    endY: S.Number,
    startX: S.Number,
    startY: S.Number,
    button: S.optional(MouseButton),
  }),
).annotate({
  identifier: "MouseDragArguments",
}) as any as S.Schema<MouseDragArguments>;
export interface MouseScrollArguments {
  x: number;
  y: number;
  deltaX?: number;
  deltaY?: number;
}
export const MouseScrollArguments = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    x: S.Number,
    y: S.Number,
    deltaX: S.optional(S.Number),
    deltaY: S.optional(S.Number),
  }),
).annotate({
  identifier: "MouseScrollArguments",
}) as any as S.Schema<MouseScrollArguments>;
export interface KeyTypeArguments {
  text: string;
}
export const KeyTypeArguments = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ text: S.String }),
).annotate({
  identifier: "KeyTypeArguments",
}) as any as S.Schema<KeyTypeArguments>;
export interface KeyPressArguments {
  key: string;
  presses?: number;
}
export const KeyPressArguments = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, presses: S.optional(S.Number) }),
).annotate({
  identifier: "KeyPressArguments",
}) as any as S.Schema<KeyPressArguments>;
export type KeyList = string[];
export const KeyList = /*@__PURE__*/ S.Array(S.String);
export interface KeyShortcutArguments {
  keys: string[];
}
export const KeyShortcutArguments = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ keys: KeyList }),
).annotate({
  identifier: "KeyShortcutArguments",
}) as any as S.Schema<KeyShortcutArguments>;
export type ScreenshotFormat = "PNG" | (string & {});
export const ScreenshotFormat = /*@__PURE__*/ S.String;

export interface ScreenshotArguments {
  format?: ScreenshotFormat;
}
export const ScreenshotArguments = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ format: S.optional(ScreenshotFormat) }),
).annotate({
  identifier: "ScreenshotArguments",
}) as any as S.Schema<ScreenshotArguments>;
export type BrowserAction =
  | {
      mouseClick: MouseClickArguments;
      mouseMove?: never;
      mouseDrag?: never;
      mouseScroll?: never;
      keyType?: never;
      keyPress?: never;
      keyShortcut?: never;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove: MouseMoveArguments;
      mouseDrag?: never;
      mouseScroll?: never;
      keyType?: never;
      keyPress?: never;
      keyShortcut?: never;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove?: never;
      mouseDrag: MouseDragArguments;
      mouseScroll?: never;
      keyType?: never;
      keyPress?: never;
      keyShortcut?: never;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove?: never;
      mouseDrag?: never;
      mouseScroll: MouseScrollArguments;
      keyType?: never;
      keyPress?: never;
      keyShortcut?: never;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove?: never;
      mouseDrag?: never;
      mouseScroll?: never;
      keyType: KeyTypeArguments;
      keyPress?: never;
      keyShortcut?: never;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove?: never;
      mouseDrag?: never;
      mouseScroll?: never;
      keyType?: never;
      keyPress: KeyPressArguments;
      keyShortcut?: never;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove?: never;
      mouseDrag?: never;
      mouseScroll?: never;
      keyType?: never;
      keyPress?: never;
      keyShortcut: KeyShortcutArguments;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove?: never;
      mouseDrag?: never;
      mouseScroll?: never;
      keyType?: never;
      keyPress?: never;
      keyShortcut?: never;
      screenshot: ScreenshotArguments;
    };
export const BrowserAction = /*@__PURE__*/ S.Union([
  S.Struct({ mouseClick: MouseClickArguments }),
  S.Struct({ mouseMove: MouseMoveArguments }),
  S.Struct({ mouseDrag: MouseDragArguments }),
  S.Struct({ mouseScroll: MouseScrollArguments }),
  S.Struct({ keyType: KeyTypeArguments }),
  S.Struct({ keyPress: KeyPressArguments }),
  S.Struct({ keyShortcut: KeyShortcutArguments }),
  S.Struct({ screenshot: ScreenshotArguments }),
]);
export interface InvokeBrowserRequest {
  browserIdentifier: string;
  sessionId: string;
  action: BrowserAction;
}
export const InvokeBrowserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    browserIdentifier: S.String.pipe(T.HttpLabel("browserIdentifier")),
    sessionId: S.String.pipe(T.HttpHeader("x-amzn-browser-session-id")),
    action: BrowserAction,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/browsers/{browserIdentifier}/sessions/invoke",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "InvokeBrowserRequest",
}) as any as S.Schema<InvokeBrowserRequest>;
export type BrowserActionStatus = "SUCCESS" | "FAILED" | (string & {});
export const BrowserActionStatus = /*@__PURE__*/ S.String;

export interface MouseClickResult {
  status: BrowserActionStatus;
  error?: string;
}
export const MouseClickResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: BrowserActionStatus, error: S.optional(S.String) }),
).annotate({
  identifier: "MouseClickResult",
}) as any as S.Schema<MouseClickResult>;
export interface MouseMoveResult {
  status: BrowserActionStatus;
  error?: string;
}
export const MouseMoveResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: BrowserActionStatus, error: S.optional(S.String) }),
).annotate({
  identifier: "MouseMoveResult",
}) as any as S.Schema<MouseMoveResult>;
export interface MouseDragResult {
  status: BrowserActionStatus;
  error?: string;
}
export const MouseDragResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: BrowserActionStatus, error: S.optional(S.String) }),
).annotate({
  identifier: "MouseDragResult",
}) as any as S.Schema<MouseDragResult>;
export interface MouseScrollResult {
  status: BrowserActionStatus;
  error?: string;
}
export const MouseScrollResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: BrowserActionStatus, error: S.optional(S.String) }),
).annotate({
  identifier: "MouseScrollResult",
}) as any as S.Schema<MouseScrollResult>;
export interface KeyTypeResult {
  status: BrowserActionStatus;
  error?: string;
}
export const KeyTypeResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: BrowserActionStatus, error: S.optional(S.String) }),
).annotate({ identifier: "KeyTypeResult" }) as any as S.Schema<KeyTypeResult>;
export interface KeyPressResult {
  status: BrowserActionStatus;
  error?: string;
}
export const KeyPressResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: BrowserActionStatus, error: S.optional(S.String) }),
).annotate({ identifier: "KeyPressResult" }) as any as S.Schema<KeyPressResult>;
export interface KeyShortcutResult {
  status: BrowserActionStatus;
  error?: string;
}
export const KeyShortcutResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: BrowserActionStatus, error: S.optional(S.String) }),
).annotate({
  identifier: "KeyShortcutResult",
}) as any as S.Schema<KeyShortcutResult>;
export interface ScreenshotResult {
  status: BrowserActionStatus;
  error?: string;
  data?: Uint8Array;
}
export const ScreenshotResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: BrowserActionStatus,
    error: S.optional(S.String),
    data: S.optional(T.Blob),
  }),
).annotate({
  identifier: "ScreenshotResult",
}) as any as S.Schema<ScreenshotResult>;
export type BrowserActionResult =
  | {
      mouseClick: MouseClickResult;
      mouseMove?: never;
      mouseDrag?: never;
      mouseScroll?: never;
      keyType?: never;
      keyPress?: never;
      keyShortcut?: never;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove: MouseMoveResult;
      mouseDrag?: never;
      mouseScroll?: never;
      keyType?: never;
      keyPress?: never;
      keyShortcut?: never;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove?: never;
      mouseDrag: MouseDragResult;
      mouseScroll?: never;
      keyType?: never;
      keyPress?: never;
      keyShortcut?: never;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove?: never;
      mouseDrag?: never;
      mouseScroll: MouseScrollResult;
      keyType?: never;
      keyPress?: never;
      keyShortcut?: never;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove?: never;
      mouseDrag?: never;
      mouseScroll?: never;
      keyType: KeyTypeResult;
      keyPress?: never;
      keyShortcut?: never;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove?: never;
      mouseDrag?: never;
      mouseScroll?: never;
      keyType?: never;
      keyPress: KeyPressResult;
      keyShortcut?: never;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove?: never;
      mouseDrag?: never;
      mouseScroll?: never;
      keyType?: never;
      keyPress?: never;
      keyShortcut: KeyShortcutResult;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove?: never;
      mouseDrag?: never;
      mouseScroll?: never;
      keyType?: never;
      keyPress?: never;
      keyShortcut?: never;
      screenshot: ScreenshotResult;
    };
export const BrowserActionResult = /*@__PURE__*/ S.Union([
  S.Struct({ mouseClick: MouseClickResult }),
  S.Struct({ mouseMove: MouseMoveResult }),
  S.Struct({ mouseDrag: MouseDragResult }),
  S.Struct({ mouseScroll: MouseScrollResult }),
  S.Struct({ keyType: KeyTypeResult }),
  S.Struct({ keyPress: KeyPressResult }),
  S.Struct({ keyShortcut: KeyShortcutResult }),
  S.Struct({ screenshot: ScreenshotResult }),
]);
export interface InvokeBrowserResponse {
  result: BrowserActionResult;
  sessionId: string;
}
export const InvokeBrowserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    result: BrowserActionResult,
    sessionId: S.String.pipe(T.HttpHeader("x-amzn-browser-session-id")),
  }),
).annotate({
  identifier: "InvokeBrowserResponse",
}) as any as S.Schema<InvokeBrowserResponse>;
export type ToolName =
  | "executeCode"
  | "executeCommand"
  | "readFiles"
  | "listFiles"
  | "removeFiles"
  | "writeFiles"
  | "startCommandExecution"
  | "getTask"
  | "stopTask"
  | (string & {});
export const ToolName = /*@__PURE__*/ S.String;

export type MaxLenString = string;
export type ProgrammingLanguage =
  | "python"
  | "javascript"
  | "typescript"
  | (string & {});
export const ProgrammingLanguage = /*@__PURE__*/ S.String;

export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface InputContentBlock {
  path: string;
  text?: string;
  blob?: Uint8Array | redacted.Redacted<Uint8Array>;
}
export const InputContentBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    path: S.String,
    text: S.optional(S.String),
    blob: S.optional(SensitiveBlob),
  }),
).annotate({
  identifier: "InputContentBlock",
}) as any as S.Schema<InputContentBlock>;
export type InputContentBlockList = InputContentBlock[];
export const InputContentBlockList = /*@__PURE__*/ S.Array(InputContentBlock);
export type LanguageRuntime = "nodejs" | "deno" | "python" | (string & {});
export const LanguageRuntime = /*@__PURE__*/ S.String;

export interface ToolArguments {
  code?: string;
  language?: ProgrammingLanguage;
  clearContext?: boolean;
  command?: string;
  path?: string;
  paths?: string[];
  content?: InputContentBlock[];
  directoryPath?: string;
  taskId?: string;
  runtime?: LanguageRuntime;
}
export const ToolArguments = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    code: S.optional(S.String),
    language: S.optional(ProgrammingLanguage),
    clearContext: S.optional(S.Boolean),
    command: S.optional(S.String),
    path: S.optional(S.String),
    paths: S.optional(StringList),
    content: S.optional(InputContentBlockList),
    directoryPath: S.optional(S.String),
    taskId: S.optional(S.String),
    runtime: S.optional(LanguageRuntime),
  }),
).annotate({ identifier: "ToolArguments" }) as any as S.Schema<ToolArguments>;
export interface InvokeCodeInterpreterRequest {
  codeInterpreterIdentifier: string;
  sessionId?: string;
  traceId?: string;
  traceParent?: string;
  name: ToolName;
  arguments?: ToolArguments;
}
export const InvokeCodeInterpreterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeInterpreterIdentifier: S.String.pipe(
      T.HttpLabel("codeInterpreterIdentifier"),
    ),
    sessionId: S.optional(S.String).pipe(
      T.HttpHeader("x-amzn-code-interpreter-session-id"),
    ),
    traceId: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Trace-Id")),
    traceParent: S.optional(S.String).pipe(T.HttpHeader("traceparent")),
    name: ToolName,
    arguments: S.optional(ToolArguments),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/code-interpreters/{codeInterpreterIdentifier}/tools/invoke",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "InvokeCodeInterpreterRequest",
}) as any as S.Schema<InvokeCodeInterpreterRequest>;
export type ContentBlockType =
  | "text"
  | "image"
  | "resource"
  | "resource_link"
  | (string & {});
export const ContentBlockType = /*@__PURE__*/ S.String;

export type ResourceContentType = "text" | "blob" | (string & {});
export const ResourceContentType = /*@__PURE__*/ S.String;

export interface ResourceContent {
  type: ResourceContentType;
  uri?: string;
  mimeType?: string;
  text?: string;
  blob?: Uint8Array;
}
export const ResourceContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: ResourceContentType,
    uri: S.optional(S.String),
    mimeType: S.optional(S.String),
    text: S.optional(S.String),
    blob: S.optional(T.Blob),
  }),
).annotate({
  identifier: "ResourceContent",
}) as any as S.Schema<ResourceContent>;
export interface ContentBlock {
  type: ContentBlockType;
  text?: string;
  data?: Uint8Array;
  mimeType?: string;
  uri?: string;
  name?: string;
  description?: string;
  size?: number;
  resource?: ResourceContent;
}
export const ContentBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: ContentBlockType,
    text: S.optional(S.String),
    data: S.optional(T.Blob),
    mimeType: S.optional(S.String),
    uri: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    size: S.optional(S.Number),
    resource: S.optional(ResourceContent),
  }),
).annotate({ identifier: "ContentBlock" }) as any as S.Schema<ContentBlock>;
export type ContentBlockList = ContentBlock[];
export const ContentBlockList = /*@__PURE__*/ S.Array(ContentBlock);
export type TaskStatus =
  | "submitted"
  | "working"
  | "completed"
  | "canceled"
  | "failed"
  | (string & {});
export const TaskStatus = /*@__PURE__*/ S.String;

export interface ToolResultStructuredContent {
  taskId?: string;
  taskStatus?: TaskStatus;
  stdout?: string;
  stderr?: string;
  exitCode?: number;
  executionTime?: number;
}
export const ToolResultStructuredContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.optional(S.String),
    taskStatus: S.optional(TaskStatus),
    stdout: S.optional(S.String),
    stderr: S.optional(S.String),
    exitCode: S.optional(S.Number),
    executionTime: S.optional(S.Number),
  }),
).annotate({
  identifier: "ToolResultStructuredContent",
}) as any as S.Schema<ToolResultStructuredContent>;
export interface CodeInterpreterResult {
  content: ContentBlock[];
  structuredContent?: ToolResultStructuredContent;
  isError?: boolean;
}
export const CodeInterpreterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    content: ContentBlockList,
    structuredContent: S.optional(ToolResultStructuredContent),
    isError: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "CodeInterpreterResult",
}) as any as S.Schema<CodeInterpreterResult>;
export type CodeInterpreterStreamOutput =
  | {
      result: CodeInterpreterResult;
      accessDeniedException?: never;
      conflictException?: never;
      internalServerException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      validationException?: never;
    }
  | {
      result?: never;
      accessDeniedException: AccessDeniedException;
      conflictException?: never;
      internalServerException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      validationException?: never;
    }
  | {
      result?: never;
      accessDeniedException?: never;
      conflictException: ConflictException;
      internalServerException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      validationException?: never;
    }
  | {
      result?: never;
      accessDeniedException?: never;
      conflictException?: never;
      internalServerException: InternalServerException;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      validationException?: never;
    }
  | {
      result?: never;
      accessDeniedException?: never;
      conflictException?: never;
      internalServerException?: never;
      resourceNotFoundException: ResourceNotFoundException;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      validationException?: never;
    }
  | {
      result?: never;
      accessDeniedException?: never;
      conflictException?: never;
      internalServerException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException: ServiceQuotaExceededException;
      throttlingException?: never;
      validationException?: never;
    }
  | {
      result?: never;
      accessDeniedException?: never;
      conflictException?: never;
      internalServerException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException: ThrottlingException;
      validationException?: never;
    }
  | {
      result?: never;
      accessDeniedException?: never;
      conflictException?: never;
      internalServerException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      validationException: ValidationException;
    };
export const CodeInterpreterStreamOutput = /*@__PURE__*/ T.EventStream(
  S.Union([
    S.Struct({ result: CodeInterpreterResult }),
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
      internalServerException: S.suspend(
        () => InternalServerException,
      ).annotate({ identifier: "InternalServerException" }),
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
      validationException: S.suspend(() => ValidationException).annotate({
        identifier: "ValidationException",
      }),
    }),
  ]),
) as any as S.Schema<stream.Stream<CodeInterpreterStreamOutput, Error, never>>;
export interface InvokeCodeInterpreterResponse {
  sessionId?: string;
  stream: stream.Stream<CodeInterpreterStreamOutput, Error, never>;
}
export const InvokeCodeInterpreterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.optional(S.String).pipe(
      T.HttpHeader("x-amzn-code-interpreter-session-id"),
    ),
    stream: CodeInterpreterStreamOutput.pipe(T.HttpPayload()),
  }),
).annotate({
  identifier: "InvokeCodeInterpreterResponse",
}) as any as S.Schema<InvokeCodeInterpreterResponse>;
export type HarnessArn = string;
export type HarnessEndpointName = string;
export type HarnessConversationRole = "user" | "assistant" | (string & {});
export const HarnessConversationRole = /*@__PURE__*/ S.String;

export type SensitiveText = string | redacted.Redacted<string>;
export type HarnessToolName = string;
export type HarnessToolUseId = string;
export type SensitiveJson = unknown;
export type HarnessToolUseType =
  | "tool_use"
  | "server_tool_use"
  | "mcp_tool_use"
  | (string & {});
export const HarnessToolUseType = /*@__PURE__*/ S.String;

export interface HarnessToolUseBlock {
  name: string;
  toolUseId: string;
  input: any;
  type?: HarnessToolUseType;
  serverName?: string;
}
export const HarnessToolUseBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    toolUseId: S.String,
    input: S.Any,
    type: S.optional(HarnessToolUseType),
    serverName: S.optional(S.String),
  }),
).annotate({
  identifier: "HarnessToolUseBlock",
}) as any as S.Schema<HarnessToolUseBlock>;
export type HarnessToolResultContentBlock =
  | { text: string | redacted.Redacted<string>; json?: never }
  | { text?: never; json: any };
export const HarnessToolResultContentBlock = /*@__PURE__*/ S.Union([
  S.Struct({ text: SensitiveString }),
  S.Struct({ json: S.Any }),
]);
export type HarnessToolResultContentBlocks = HarnessToolResultContentBlock[];
export const HarnessToolResultContentBlocks = /*@__PURE__*/ S.Array(
  HarnessToolResultContentBlock,
);
export type HarnessToolUseStatus = "success" | "error" | (string & {});
export const HarnessToolUseStatus = /*@__PURE__*/ S.String;

export interface HarnessToolResultBlock {
  toolUseId: string;
  content: HarnessToolResultContentBlock[];
  status?: HarnessToolUseStatus;
  type?: HarnessToolUseType;
}
export const HarnessToolResultBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    toolUseId: S.String,
    content: HarnessToolResultContentBlocks,
    status: S.optional(HarnessToolUseStatus),
    type: S.optional(HarnessToolUseType),
  }),
).annotate({
  identifier: "HarnessToolResultBlock",
}) as any as S.Schema<HarnessToolResultBlock>;
export interface HarnessReasoningTextBlock {
  text: string;
  signature?: string;
}
export const HarnessReasoningTextBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ text: S.String, signature: S.optional(S.String) }),
).annotate({
  identifier: "HarnessReasoningTextBlock",
}) as any as S.Schema<HarnessReasoningTextBlock>;
export type HarnessReasoningContentBlock =
  | { reasoningText: HarnessReasoningTextBlock; redactedContent?: never }
  | { reasoningText?: never; redactedContent: Uint8Array };
export const HarnessReasoningContentBlock = /*@__PURE__*/ S.Union([
  S.Struct({ reasoningText: HarnessReasoningTextBlock }),
  S.Struct({ redactedContent: T.Blob }),
]);
export type HarnessContentBlock =
  | {
      text: string | redacted.Redacted<string>;
      toolUse?: never;
      toolResult?: never;
      reasoningContent?: never;
    }
  | {
      text?: never;
      toolUse: HarnessToolUseBlock;
      toolResult?: never;
      reasoningContent?: never;
    }
  | {
      text?: never;
      toolUse?: never;
      toolResult: HarnessToolResultBlock;
      reasoningContent?: never;
    }
  | {
      text?: never;
      toolUse?: never;
      toolResult?: never;
      reasoningContent: HarnessReasoningContentBlock;
    };
export const HarnessContentBlock = /*@__PURE__*/ S.Union([
  S.Struct({ text: SensitiveString }),
  S.Struct({ toolUse: HarnessToolUseBlock }),
  S.Struct({ toolResult: HarnessToolResultBlock }),
  S.Struct({ reasoningContent: HarnessReasoningContentBlock }),
]);
export type HarnessContentBlocks = HarnessContentBlock[];
export const HarnessContentBlocks = /*@__PURE__*/ S.Array(HarnessContentBlock);
export interface HarnessMessage {
  role: HarnessConversationRole;
  content: HarnessContentBlock[];
}
export const HarnessMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ role: HarnessConversationRole, content: HarnessContentBlocks }),
).annotate({ identifier: "HarnessMessage" }) as any as S.Schema<HarnessMessage>;
export type HarnessMessages = HarnessMessage[];
export const HarnessMessages = /*@__PURE__*/ S.Array(HarnessMessage);
export type ModelId = string;
export type MaxTokens = number;
export type Temperature = number;
export type TopP = number;
export type HarnessBedrockApiFormat =
  | "converse_stream"
  | "responses"
  | "chat_completions"
  | (string & {});
export const HarnessBedrockApiFormat = /*@__PURE__*/ S.String;

export interface HarnessBedrockModelConfig {
  modelId: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  apiFormat?: HarnessBedrockApiFormat;
  additionalParams?: any;
}
export const HarnessBedrockModelConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.String,
    maxTokens: S.optional(S.Number),
    temperature: S.optional(S.Number),
    topP: S.optional(S.Number),
    apiFormat: S.optional(HarnessBedrockApiFormat),
    additionalParams: S.optional(S.Any),
  }),
).annotate({
  identifier: "HarnessBedrockModelConfig",
}) as any as S.Schema<HarnessBedrockModelConfig>;
export type ApiKeyArn = string;
export type HarnessOpenAiApiFormat =
  | "chat_completions"
  | "responses"
  | (string & {});
export const HarnessOpenAiApiFormat = /*@__PURE__*/ S.String;

export interface HarnessOpenAiModelConfig {
  modelId: string;
  apiKeyArn: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  apiFormat?: HarnessOpenAiApiFormat;
  additionalParams?: any;
}
export const HarnessOpenAiModelConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.String,
    apiKeyArn: S.String,
    maxTokens: S.optional(S.Number),
    temperature: S.optional(S.Number),
    topP: S.optional(S.Number),
    apiFormat: S.optional(HarnessOpenAiApiFormat),
    additionalParams: S.optional(S.Any),
  }),
).annotate({
  identifier: "HarnessOpenAiModelConfig",
}) as any as S.Schema<HarnessOpenAiModelConfig>;
export type TopK = number;
export interface HarnessGeminiModelConfig {
  modelId: string;
  apiKeyArn: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  topK?: number;
}
export const HarnessGeminiModelConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.String,
    apiKeyArn: S.String,
    maxTokens: S.optional(S.Number),
    temperature: S.optional(S.Number),
    topP: S.optional(S.Number),
    topK: S.optional(S.Number),
  }),
).annotate({
  identifier: "HarnessGeminiModelConfig",
}) as any as S.Schema<HarnessGeminiModelConfig>;
export type HarnessLiteLlmApiBase = string | redacted.Redacted<string>;
export interface HarnessLiteLlmModelConfig {
  modelId: string;
  apiKeyArn?: string;
  apiBase?: string | redacted.Redacted<string>;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  additionalParams?: any;
}
export const HarnessLiteLlmModelConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.String,
    apiKeyArn: S.optional(S.String),
    apiBase: S.optional(SensitiveString),
    maxTokens: S.optional(S.Number),
    temperature: S.optional(S.Number),
    topP: S.optional(S.Number),
    additionalParams: S.optional(S.Any),
  }),
).annotate({
  identifier: "HarnessLiteLlmModelConfig",
}) as any as S.Schema<HarnessLiteLlmModelConfig>;
export type HarnessModelConfiguration =
  | {
      bedrockModelConfig: HarnessBedrockModelConfig;
      openAiModelConfig?: never;
      geminiModelConfig?: never;
      liteLlmModelConfig?: never;
    }
  | {
      bedrockModelConfig?: never;
      openAiModelConfig: HarnessOpenAiModelConfig;
      geminiModelConfig?: never;
      liteLlmModelConfig?: never;
    }
  | {
      bedrockModelConfig?: never;
      openAiModelConfig?: never;
      geminiModelConfig: HarnessGeminiModelConfig;
      liteLlmModelConfig?: never;
    }
  | {
      bedrockModelConfig?: never;
      openAiModelConfig?: never;
      geminiModelConfig?: never;
      liteLlmModelConfig: HarnessLiteLlmModelConfig;
    };
export const HarnessModelConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ bedrockModelConfig: HarnessBedrockModelConfig }),
  S.Struct({ openAiModelConfig: HarnessOpenAiModelConfig }),
  S.Struct({ geminiModelConfig: HarnessGeminiModelConfig }),
  S.Struct({ liteLlmModelConfig: HarnessLiteLlmModelConfig }),
]);
export type HarnessSystemContentBlock = {
  text: string | redacted.Redacted<string>;
};
export const HarnessSystemContentBlock = /*@__PURE__*/ S.Union([
  S.Struct({ text: SensitiveString }),
]);
export type HarnessSystemPrompt = HarnessSystemContentBlock[];
export const HarnessSystemPrompt = /*@__PURE__*/ S.Array(
  HarnessSystemContentBlock,
);
export type HarnessToolType =
  | "remote_mcp"
  | "agentcore_browser"
  | "agentcore_gateway"
  | "inline_function"
  | "agentcore_code_interpreter"
  | (string & {});
export const HarnessToolType = /*@__PURE__*/ S.String;

export type HarnessRemoteMcpUrl = string | redacted.Redacted<string>;
export type HttpHeaderKey = string;
export type HttpHeaderValue = string;
export type HttpHeadersMap = { [key: string]: string | undefined };
export const HttpHeadersMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface HarnessRemoteMcpConfig {
  url: string | redacted.Redacted<string>;
  headers?: { [key: string]: string | undefined };
}
export const HarnessRemoteMcpConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ url: SensitiveString, headers: S.optional(HttpHeadersMap) }),
).annotate({
  identifier: "HarnessRemoteMcpConfig",
}) as any as S.Schema<HarnessRemoteMcpConfig>;
export type HarnessBrowserArn = string;
export interface HarnessAgentCoreBrowserConfig {
  browserArn?: string;
}
export const HarnessAgentCoreBrowserConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ browserArn: S.optional(S.String) }),
).annotate({
  identifier: "HarnessAgentCoreBrowserConfig",
}) as any as S.Schema<HarnessAgentCoreBrowserConfig>;
export type OAuthCredentialProviderArn = string;
export type OAuthScope = string;
export type OAuthScopes = string[];
export const OAuthScopes = /*@__PURE__*/ S.Array(S.String);
export type OAuthCustomParametersKey = string;
export type OAuthCustomParametersValue = string | redacted.Redacted<string>;
export type OAuthCustomParameters = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export const OAuthCustomParameters = /*@__PURE__*/ S.Record(
  S.String,
  SensitiveString.pipe(S.optional),
);
export type OAuthGrantType =
  | "CLIENT_CREDENTIALS"
  | "AUTHORIZATION_CODE"
  | "TOKEN_EXCHANGE"
  | (string & {});
export const OAuthGrantType = /*@__PURE__*/ S.String;

export type OAuthDefaultReturnUrl = string;
export interface OAuthCredentialProvider {
  providerArn: string;
  scopes: string[];
  customParameters?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  grantType?: OAuthGrantType;
  defaultReturnUrl?: string;
}
export const OAuthCredentialProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    providerArn: S.String,
    scopes: OAuthScopes,
    customParameters: S.optional(OAuthCustomParameters),
    grantType: S.optional(OAuthGrantType),
    defaultReturnUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "OAuthCredentialProvider",
}) as any as S.Schema<OAuthCredentialProvider>;
export type HarnessGatewayOutboundAuth =
  | { awsIam: Record<string, never>; none?: never; oauth?: never }
  | { awsIam?: never; none: Record<string, never>; oauth?: never }
  | { awsIam?: never; none?: never; oauth: OAuthCredentialProvider };
export const HarnessGatewayOutboundAuth = /*@__PURE__*/ S.Union([
  S.Struct({ awsIam: S.Struct({}) }),
  S.Struct({ none: S.Struct({}) }),
  S.Struct({ oauth: OAuthCredentialProvider }),
]);
export interface HarnessAgentCoreGatewayConfig {
  gatewayArn: string;
  outboundAuth?: HarnessGatewayOutboundAuth;
}
export const HarnessAgentCoreGatewayConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayArn: S.String,
    outboundAuth: S.optional(HarnessGatewayOutboundAuth),
  }),
).annotate({
  identifier: "HarnessAgentCoreGatewayConfig",
}) as any as S.Schema<HarnessAgentCoreGatewayConfig>;
export type HarnessInlineFunctionDescription =
  | string
  | redacted.Redacted<string>;
export interface HarnessInlineFunctionConfig {
  description: string | redacted.Redacted<string>;
  inputSchema: any;
}
export const HarnessInlineFunctionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ description: SensitiveString, inputSchema: S.Any }),
).annotate({
  identifier: "HarnessInlineFunctionConfig",
}) as any as S.Schema<HarnessInlineFunctionConfig>;
export type HarnessCodeInterpreterArn = string;
export interface HarnessAgentCoreCodeInterpreterConfig {
  codeInterpreterArn?: string;
}
export const HarnessAgentCoreCodeInterpreterConfig = /*@__PURE__*/ S.suspend(
  () => S.Struct({ codeInterpreterArn: S.optional(S.String) }),
).annotate({
  identifier: "HarnessAgentCoreCodeInterpreterConfig",
}) as any as S.Schema<HarnessAgentCoreCodeInterpreterConfig>;
export type HarnessToolConfiguration =
  | {
      remoteMcp: HarnessRemoteMcpConfig;
      agentCoreBrowser?: never;
      agentCoreGateway?: never;
      inlineFunction?: never;
      agentCoreCodeInterpreter?: never;
    }
  | {
      remoteMcp?: never;
      agentCoreBrowser: HarnessAgentCoreBrowserConfig;
      agentCoreGateway?: never;
      inlineFunction?: never;
      agentCoreCodeInterpreter?: never;
    }
  | {
      remoteMcp?: never;
      agentCoreBrowser?: never;
      agentCoreGateway: HarnessAgentCoreGatewayConfig;
      inlineFunction?: never;
      agentCoreCodeInterpreter?: never;
    }
  | {
      remoteMcp?: never;
      agentCoreBrowser?: never;
      agentCoreGateway?: never;
      inlineFunction: HarnessInlineFunctionConfig;
      agentCoreCodeInterpreter?: never;
    }
  | {
      remoteMcp?: never;
      agentCoreBrowser?: never;
      agentCoreGateway?: never;
      inlineFunction?: never;
      agentCoreCodeInterpreter: HarnessAgentCoreCodeInterpreterConfig;
    };
export const HarnessToolConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ remoteMcp: HarnessRemoteMcpConfig }),
  S.Struct({ agentCoreBrowser: HarnessAgentCoreBrowserConfig }),
  S.Struct({ agentCoreGateway: HarnessAgentCoreGatewayConfig }),
  S.Struct({ inlineFunction: HarnessInlineFunctionConfig }),
  S.Struct({ agentCoreCodeInterpreter: HarnessAgentCoreCodeInterpreterConfig }),
]);
export interface HarnessTool {
  type: HarnessToolType;
  name?: string;
  config?: HarnessToolConfiguration;
}
export const HarnessTool = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: HarnessToolType,
    name: S.optional(S.String),
    config: S.optional(HarnessToolConfiguration),
  }),
).annotate({ identifier: "HarnessTool" }) as any as S.Schema<HarnessTool>;
export type HarnessTools = HarnessTool[];
export const HarnessTools = /*@__PURE__*/ S.Array(HarnessTool);
export type HarnessSkillPath = string;
export type HarnessSkillS3Uri = string;
export interface HarnessSkillS3Source {
  uri: string;
}
export const HarnessSkillS3Source = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ uri: S.String }),
).annotate({
  identifier: "HarnessSkillS3Source",
}) as any as S.Schema<HarnessSkillS3Source>;
export type HarnessSkillGitUrl = string;
export interface HarnessSkillGitAuth {
  credentialArn: string;
  username?: string;
}
export const HarnessSkillGitAuth = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ credentialArn: S.String, username: S.optional(S.String) }),
).annotate({
  identifier: "HarnessSkillGitAuth",
}) as any as S.Schema<HarnessSkillGitAuth>;
export interface HarnessSkillGitSource {
  url: string;
  path?: string;
  auth?: HarnessSkillGitAuth;
}
export const HarnessSkillGitSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    url: S.String,
    path: S.optional(S.String),
    auth: S.optional(HarnessSkillGitAuth),
  }),
).annotate({
  identifier: "HarnessSkillGitSource",
}) as any as S.Schema<HarnessSkillGitSource>;
export type HarnessAwsSkillPath = string;
export type HarnessAwsSkillPaths = string[];
export const HarnessAwsSkillPaths = /*@__PURE__*/ S.Array(S.String);
export interface HarnessSkillAwsSkillsSource {
  paths?: string[];
}
export const HarnessSkillAwsSkillsSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ paths: S.optional(HarnessAwsSkillPaths) }),
).annotate({
  identifier: "HarnessSkillAwsSkillsSource",
}) as any as S.Schema<HarnessSkillAwsSkillsSource>;
export type HarnessSkill =
  | { path: string; s3?: never; git?: never; awsSkills?: never }
  | { path?: never; s3: HarnessSkillS3Source; git?: never; awsSkills?: never }
  | { path?: never; s3?: never; git: HarnessSkillGitSource; awsSkills?: never }
  | {
      path?: never;
      s3?: never;
      git?: never;
      awsSkills: HarnessSkillAwsSkillsSource;
    };
export const HarnessSkill = /*@__PURE__*/ S.Union([
  S.Struct({ path: S.String }),
  S.Struct({ s3: HarnessSkillS3Source }),
  S.Struct({ git: HarnessSkillGitSource }),
  S.Struct({ awsSkills: HarnessSkillAwsSkillsSource }),
]);
export type HarnessSkills = HarnessSkill[];
export const HarnessSkills = /*@__PURE__*/ S.Array(HarnessSkill);
export type HarnessAllowedTool = string;
export type HarnessAllowedTools = string[];
export const HarnessAllowedTools = /*@__PURE__*/ S.Array(S.String);
export interface InvokeHarnessRequest {
  harnessArn: string;
  qualifier?: string;
  runtimeSessionId: string;
  runtimeUserId?: string;
  messages: HarnessMessage[];
  model?: HarnessModelConfiguration;
  systemPrompt?: HarnessSystemContentBlock[];
  tools?: HarnessTool[];
  skills?: HarnessSkill[];
  allowedTools?: string[];
  maxIterations?: number;
  maxTokens?: number;
  timeoutSeconds?: number;
  actorId?: string;
}
export const InvokeHarnessRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    harnessArn: S.String.pipe(T.HttpQuery("harnessArn")),
    qualifier: S.optional(S.String).pipe(T.HttpQuery("qualifier")),
    runtimeSessionId: S.String.pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Runtime-Session-Id"),
    ),
    runtimeUserId: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Runtime-User-Id"),
    ),
    messages: HarnessMessages,
    model: S.optional(HarnessModelConfiguration),
    systemPrompt: S.optional(HarnessSystemPrompt),
    tools: S.optional(HarnessTools),
    skills: S.optional(HarnessSkills),
    allowedTools: S.optional(HarnessAllowedTools),
    maxIterations: S.optional(S.Number),
    maxTokens: S.optional(S.Number),
    timeoutSeconds: S.optional(S.Number),
    actorId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/harnesses/invoke" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "InvokeHarnessRequest",
}) as any as S.Schema<InvokeHarnessRequest>;
export interface HarnessMessageStartEvent {
  role: HarnessConversationRole;
}
export const HarnessMessageStartEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ role: HarnessConversationRole }),
).annotate({
  identifier: "HarnessMessageStartEvent",
}) as any as S.Schema<HarnessMessageStartEvent>;
export interface HarnessToolUseBlockStart {
  toolUseId: string;
  name: string;
  type?: HarnessToolUseType;
  serverName?: string;
}
export const HarnessToolUseBlockStart = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    toolUseId: S.String,
    name: S.String,
    type: S.optional(HarnessToolUseType),
    serverName: S.optional(S.String),
  }),
).annotate({
  identifier: "HarnessToolUseBlockStart",
}) as any as S.Schema<HarnessToolUseBlockStart>;
export interface HarnessToolResultBlockStart {
  toolUseId: string;
  status?: HarnessToolUseStatus;
}
export const HarnessToolResultBlockStart = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ toolUseId: S.String, status: S.optional(HarnessToolUseStatus) }),
).annotate({
  identifier: "HarnessToolResultBlockStart",
}) as any as S.Schema<HarnessToolResultBlockStart>;
export type HarnessContentBlockStart =
  | { toolUse: HarnessToolUseBlockStart; toolResult?: never }
  | { toolUse?: never; toolResult: HarnessToolResultBlockStart };
export const HarnessContentBlockStart = /*@__PURE__*/ S.Union([
  S.Struct({ toolUse: HarnessToolUseBlockStart }),
  S.Struct({ toolResult: HarnessToolResultBlockStart }),
]);
export interface HarnessContentBlockStartEvent {
  contentBlockIndex: number;
  start: HarnessContentBlockStart;
}
export const HarnessContentBlockStartEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ contentBlockIndex: S.Number, start: HarnessContentBlockStart }),
).annotate({
  identifier: "HarnessContentBlockStartEvent",
}) as any as S.Schema<HarnessContentBlockStartEvent>;
export interface HarnessToolUseBlockDelta {
  input: string | redacted.Redacted<string>;
}
export const HarnessToolUseBlockDelta = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ input: SensitiveString }),
).annotate({
  identifier: "HarnessToolUseBlockDelta",
}) as any as S.Schema<HarnessToolUseBlockDelta>;
export type HarnessToolResultBlockDelta =
  | { text: string | redacted.Redacted<string>; json?: never }
  | { text?: never; json: any };
export const HarnessToolResultBlockDelta = /*@__PURE__*/ S.Union([
  S.Struct({ text: SensitiveString }),
  S.Struct({ json: S.Any }),
]);
export type HarnessToolResultBlocksDelta = HarnessToolResultBlockDelta[];
export const HarnessToolResultBlocksDelta = /*@__PURE__*/ S.Array(
  HarnessToolResultBlockDelta,
);
export type HarnessReasoningContentBlockDelta =
  | { text: string; redactedContent?: never; signature?: never }
  | {
      text?: never;
      redactedContent: Uint8Array | redacted.Redacted<Uint8Array>;
      signature?: never;
    }
  | { text?: never; redactedContent?: never; signature: string };
export const HarnessReasoningContentBlockDelta = /*@__PURE__*/ S.Union([
  S.Struct({ text: S.String }),
  S.Struct({ redactedContent: SensitiveBlob }),
  S.Struct({ signature: S.String }),
]);
export type HarnessContentBlockDelta =
  | {
      text: string | redacted.Redacted<string>;
      toolUse?: never;
      toolResult?: never;
      reasoningContent?: never;
    }
  | {
      text?: never;
      toolUse: HarnessToolUseBlockDelta;
      toolResult?: never;
      reasoningContent?: never;
    }
  | {
      text?: never;
      toolUse?: never;
      toolResult: HarnessToolResultBlockDelta[];
      reasoningContent?: never;
    }
  | {
      text?: never;
      toolUse?: never;
      toolResult?: never;
      reasoningContent: HarnessReasoningContentBlockDelta;
    };
export const HarnessContentBlockDelta = /*@__PURE__*/ S.Union([
  S.Struct({ text: SensitiveString }),
  S.Struct({ toolUse: HarnessToolUseBlockDelta }),
  S.Struct({ toolResult: HarnessToolResultBlocksDelta }),
  S.Struct({ reasoningContent: HarnessReasoningContentBlockDelta }),
]);
export interface HarnessContentBlockDeltaEvent {
  contentBlockIndex: number;
  delta: HarnessContentBlockDelta;
}
export const HarnessContentBlockDeltaEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ contentBlockIndex: S.Number, delta: HarnessContentBlockDelta }),
).annotate({
  identifier: "HarnessContentBlockDeltaEvent",
}) as any as S.Schema<HarnessContentBlockDeltaEvent>;
export interface HarnessContentBlockStopEvent {
  contentBlockIndex: number;
}
export const HarnessContentBlockStopEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ contentBlockIndex: S.Number }),
).annotate({
  identifier: "HarnessContentBlockStopEvent",
}) as any as S.Schema<HarnessContentBlockStopEvent>;
export type HarnessStopReason =
  | "end_turn"
  | "tool_use"
  | "tool_result"
  | "max_tokens"
  | "stop_sequence"
  | "content_filtered"
  | "malformed_model_output"
  | "malformed_tool_use"
  | "interrupted"
  | "partial_turn"
  | "model_context_window_exceeded"
  | "max_iterations_exceeded"
  | "max_output_tokens_exceeded"
  | "timeout_exceeded"
  | (string & {});
export const HarnessStopReason = /*@__PURE__*/ S.String;

export interface HarnessMessageStopEvent {
  stopReason: HarnessStopReason;
}
export const HarnessMessageStopEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ stopReason: HarnessStopReason }),
).annotate({
  identifier: "HarnessMessageStopEvent",
}) as any as S.Schema<HarnessMessageStopEvent>;
export interface HarnessTokenUsage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  cacheReadInputTokens?: number;
  cacheWriteInputTokens?: number;
}
export const HarnessTokenUsage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inputTokens: S.Number,
    outputTokens: S.Number,
    totalTokens: S.Number,
    cacheReadInputTokens: S.optional(S.Number),
    cacheWriteInputTokens: S.optional(S.Number),
  }),
).annotate({
  identifier: "HarnessTokenUsage",
}) as any as S.Schema<HarnessTokenUsage>;
export interface HarnessStreamMetrics {
  latencyMs: number;
}
export const HarnessStreamMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ latencyMs: S.Number }),
).annotate({
  identifier: "HarnessStreamMetrics",
}) as any as S.Schema<HarnessStreamMetrics>;
export interface HarnessMetadataEvent {
  usage: HarnessTokenUsage;
  metrics: HarnessStreamMetrics;
}
export const HarnessMetadataEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ usage: HarnessTokenUsage, metrics: HarnessStreamMetrics }),
).annotate({
  identifier: "HarnessMetadataEvent",
}) as any as S.Schema<HarnessMetadataEvent>;
export type InvokeHarnessStreamOutput =
  | {
      messageStart: HarnessMessageStartEvent;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      validationException?: never;
      runtimeClientError?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart: HarnessContentBlockStartEvent;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      validationException?: never;
      runtimeClientError?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta: HarnessContentBlockDeltaEvent;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      validationException?: never;
      runtimeClientError?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop: HarnessContentBlockStopEvent;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      validationException?: never;
      runtimeClientError?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop: HarnessMessageStopEvent;
      metadata?: never;
      internalServerException?: never;
      validationException?: never;
      runtimeClientError?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata: HarnessMetadataEvent;
      internalServerException?: never;
      validationException?: never;
      runtimeClientError?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException: InternalServerException;
      validationException?: never;
      runtimeClientError?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      validationException: ValidationException;
      runtimeClientError?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      validationException?: never;
      runtimeClientError: RuntimeClientError;
    };
export const InvokeHarnessStreamOutput = /*@__PURE__*/ T.EventStream(
  S.Union([
    S.Struct({ messageStart: HarnessMessageStartEvent }),
    S.Struct({ contentBlockStart: HarnessContentBlockStartEvent }),
    S.Struct({ contentBlockDelta: HarnessContentBlockDeltaEvent }),
    S.Struct({ contentBlockStop: HarnessContentBlockStopEvent }),
    S.Struct({ messageStop: HarnessMessageStopEvent }),
    S.Struct({ metadata: HarnessMetadataEvent }),
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
      runtimeClientError: S.suspend(() => RuntimeClientError).annotate({
        identifier: "RuntimeClientError",
      }),
    }),
  ]),
) as any as S.Schema<stream.Stream<InvokeHarnessStreamOutput, Error, never>>;
export interface InvokeHarnessResponse {
  stream: stream.Stream<InvokeHarnessStreamOutput, Error, never>;
}
export const InvokeHarnessResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ stream: InvokeHarnessStreamOutput.pipe(T.HttpPayload()) }),
).annotate({
  identifier: "InvokeHarnessResponse",
}) as any as S.Schema<InvokeHarnessResponse>;
export interface ListABTestsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListABTestsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/ab-tests" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListABTestsRequest",
}) as any as S.Schema<ListABTestsRequest>;
export interface ABTestSummary {
  abTestId: string;
  abTestArn: string;
  name: string;
  status: ABTestStatus;
  executionStatus: ABTestExecutionStatus;
  description?: string;
  gatewayArn?: string;
  createdAt: Date;
  updatedAt: Date;
}
export const ABTestSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    abTestId: S.String,
    abTestArn: S.String,
    name: S.String,
    status: ABTestStatus,
    executionStatus: ABTestExecutionStatus,
    description: S.optional(S.String),
    gatewayArn: S.optional(S.String),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "ABTestSummary" }) as any as S.Schema<ABTestSummary>;
export type ABTestSummaryList = ABTestSummary[];
export const ABTestSummaryList = /*@__PURE__*/ S.Array(ABTestSummary);
export interface ListABTestsResponse {
  abTests: ABTestSummary[];
  nextToken?: string;
}
export const ListABTestsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ abTests: ABTestSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListABTestsResponse",
}) as any as S.Schema<ListABTestsResponse>;
export type MaxResults = number;
export type PaginationToken = string;
export interface ListActorsInput {
  memoryId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListActorsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memoryId: S.String.pipe(T.HttpLabel("memoryId")),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/memories/{memoryId}/actors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListActorsInput",
}) as any as S.Schema<ListActorsInput>;
export interface ActorSummary {
  actorId: string;
}
export const ActorSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ actorId: S.String }),
).annotate({ identifier: "ActorSummary" }) as any as S.Schema<ActorSummary>;
export type ActorSummaryList = ActorSummary[];
export const ActorSummaryList = /*@__PURE__*/ S.Array(ActorSummary);
export interface ListActorsOutput {
  actorSummaries: ActorSummary[];
  nextToken?: string;
}
export const ListActorsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actorSummaries: ActorSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListActorsOutput",
}) as any as S.Schema<ListActorsOutput>;
export interface ListBatchEvaluationsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListBatchEvaluationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/evaluations/batch-evaluate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBatchEvaluationsRequest",
}) as any as S.Schema<ListBatchEvaluationsRequest>;
export interface BatchEvaluationSummary {
  batchEvaluationId: string;
  batchEvaluationArn: string;
  batchEvaluationName: string;
  status: BatchEvaluationStatus;
  createdAt: Date;
  description?: string;
  evaluators?: Evaluator[];
  insights?: Insight[];
  evaluationResults?: EvaluationJobResults;
  errorDetails?: string[];
  kmsKeyArn?: string;
  updatedAt?: Date;
}
export const BatchEvaluationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    batchEvaluationId: S.String,
    batchEvaluationArn: S.String,
    batchEvaluationName: S.String,
    status: BatchEvaluationStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    description: S.optional(S.String),
    evaluators: S.optional(EvaluatorList),
    insights: S.optional(InsightList),
    evaluationResults: S.optional(EvaluationJobResults),
    errorDetails: S.optional(ErrorDetailsList),
    kmsKeyArn: S.optional(S.String),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "BatchEvaluationSummary",
}) as any as S.Schema<BatchEvaluationSummary>;
export type BatchEvaluationSummaryList = BatchEvaluationSummary[];
export const BatchEvaluationSummaryList = /*@__PURE__*/ S.Array(
  BatchEvaluationSummary,
);
export interface ListBatchEvaluationsResponse {
  batchEvaluations: BatchEvaluationSummary[];
  nextToken?: string;
}
export const ListBatchEvaluationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    batchEvaluations: BatchEvaluationSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBatchEvaluationsResponse",
}) as any as S.Schema<ListBatchEvaluationsResponse>;
export type NextToken = string;
export interface ListBrowserSessionsRequest {
  browserIdentifier: string;
  maxResults?: number;
  nextToken?: string;
  status?: BrowserSessionStatus;
}
export const ListBrowserSessionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    browserIdentifier: S.String.pipe(T.HttpLabel("browserIdentifier")),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    status: S.optional(BrowserSessionStatus),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/browsers/{browserIdentifier}/sessions/list",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBrowserSessionsRequest",
}) as any as S.Schema<ListBrowserSessionsRequest>;
export interface BrowserSessionSummary {
  browserIdentifier: string;
  sessionId: string;
  name?: string;
  status: BrowserSessionStatus;
  createdAt: Date;
  lastUpdatedAt?: Date;
}
export const BrowserSessionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    browserIdentifier: S.String,
    sessionId: S.String,
    name: S.optional(S.String),
    status: BrowserSessionStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "BrowserSessionSummary",
}) as any as S.Schema<BrowserSessionSummary>;
export type BrowserSessionSummaries = BrowserSessionSummary[];
export const BrowserSessionSummaries = /*@__PURE__*/ S.Array(
  BrowserSessionSummary,
);
export interface ListBrowserSessionsResponse {
  items: BrowserSessionSummary[];
  nextToken?: string;
}
export const ListBrowserSessionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: BrowserSessionSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListBrowserSessionsResponse",
}) as any as S.Schema<ListBrowserSessionsResponse>;
export interface ListCodeInterpreterSessionsRequest {
  codeInterpreterIdentifier: string;
  maxResults?: number;
  nextToken?: string;
  status?: CodeInterpreterSessionStatus;
}
export const ListCodeInterpreterSessionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeInterpreterIdentifier: S.String.pipe(
      T.HttpLabel("codeInterpreterIdentifier"),
    ),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    status: S.optional(CodeInterpreterSessionStatus),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/code-interpreters/{codeInterpreterIdentifier}/sessions/list",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCodeInterpreterSessionsRequest",
}) as any as S.Schema<ListCodeInterpreterSessionsRequest>;
export interface CodeInterpreterSessionSummary {
  codeInterpreterIdentifier: string;
  sessionId: string;
  name?: string;
  status: CodeInterpreterSessionStatus;
  createdAt: Date;
  lastUpdatedAt?: Date;
}
export const CodeInterpreterSessionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeInterpreterIdentifier: S.String,
    sessionId: S.String,
    name: S.optional(S.String),
    status: CodeInterpreterSessionStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CodeInterpreterSessionSummary",
}) as any as S.Schema<CodeInterpreterSessionSummary>;
export type CodeInterpreterSessionSummaries = CodeInterpreterSessionSummary[];
export const CodeInterpreterSessionSummaries = /*@__PURE__*/ S.Array(
  CodeInterpreterSessionSummary,
);
export interface ListCodeInterpreterSessionsResponse {
  items: CodeInterpreterSessionSummary[];
  nextToken?: string;
}
export const ListCodeInterpreterSessionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: CodeInterpreterSessionSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCodeInterpreterSessionsResponse",
}) as any as S.Schema<ListCodeInterpreterSessionsResponse>;
export interface BranchFilter {
  name: string;
  includeParentBranches?: boolean;
}
export const BranchFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, includeParentBranches: S.optional(S.Boolean) }),
).annotate({ identifier: "BranchFilter" }) as any as S.Schema<BranchFilter>;
export type LeftExpression = { metadataKey: string };
export const LeftExpression = /*@__PURE__*/ S.Union([
  S.Struct({ metadataKey: S.String }),
]);
export type OperatorType =
  | "EQUALS_TO"
  | "EXISTS"
  | "NOT_EXISTS"
  | (string & {});
export const OperatorType = /*@__PURE__*/ S.String;

export type RightExpression = { metadataValue: MetadataValue };
export const RightExpression = /*@__PURE__*/ S.Union([
  S.Struct({ metadataValue: MetadataValue }),
]);
export interface EventMetadataFilterExpression {
  left: LeftExpression;
  operator: OperatorType;
  right?: RightExpression;
}
export const EventMetadataFilterExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    left: LeftExpression,
    operator: OperatorType,
    right: S.optional(RightExpression),
  }),
).annotate({
  identifier: "EventMetadataFilterExpression",
}) as any as S.Schema<EventMetadataFilterExpression>;
export type EventMetadataFilterList = EventMetadataFilterExpression[];
export const EventMetadataFilterList = /*@__PURE__*/ S.Array(
  EventMetadataFilterExpression,
);
export interface FilterInput {
  branch?: BranchFilter;
  eventMetadata?: EventMetadataFilterExpression[];
}
export const FilterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    branch: S.optional(BranchFilter),
    eventMetadata: S.optional(EventMetadataFilterList),
  }),
).annotate({ identifier: "FilterInput" }) as any as S.Schema<FilterInput>;
export interface ListEventsInput {
  memoryId: string;
  sessionId: string;
  actorId: string;
  includePayloads?: boolean;
  filter?: FilterInput;
  maxResults?: number;
  nextToken?: string;
}
export const ListEventsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memoryId: S.String.pipe(T.HttpLabel("memoryId")),
    sessionId: S.String.pipe(T.HttpLabel("sessionId")),
    actorId: S.String.pipe(T.HttpLabel("actorId")),
    includePayloads: S.optional(S.Boolean),
    filter: S.optional(FilterInput),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/memories/{memoryId}/actor/{actorId}/sessions/{sessionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEventsInput",
}) as any as S.Schema<ListEventsInput>;
export type EventList = Event[];
export const EventList = /*@__PURE__*/ S.Array(Event);
export interface ListEventsOutput {
  events: Event[];
  nextToken?: string;
}
export const ListEventsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ events: EventList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListEventsOutput",
}) as any as S.Schema<ListEventsOutput>;
export type ExtractionJobStatus = "FAILED" | (string & {});
export const ExtractionJobStatus = /*@__PURE__*/ S.String;

export interface ExtractionJobFilterInput {
  strategyId?: string;
  sessionId?: string;
  actorId?: string;
  status?: ExtractionJobStatus;
}
export const ExtractionJobFilterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    strategyId: S.optional(S.String),
    sessionId: S.optional(S.String),
    actorId: S.optional(S.String),
    status: S.optional(ExtractionJobStatus),
  }),
).annotate({
  identifier: "ExtractionJobFilterInput",
}) as any as S.Schema<ExtractionJobFilterInput>;
export interface ListMemoryExtractionJobsInput {
  memoryId: string;
  maxResults?: number;
  filter?: ExtractionJobFilterInput;
  nextToken?: string;
}
export const ListMemoryExtractionJobsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memoryId: S.String.pipe(T.HttpLabel("memoryId")),
    maxResults: S.optional(S.Number),
    filter: S.optional(ExtractionJobFilterInput),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/memories/{memoryId}/extractionJobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMemoryExtractionJobsInput",
}) as any as S.Schema<ListMemoryExtractionJobsInput>;
export interface MessageMetadata {
  eventId: string;
  messageIndex: number;
}
export const MessageMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ eventId: S.String, messageIndex: S.Number }),
).annotate({
  identifier: "MessageMetadata",
}) as any as S.Schema<MessageMetadata>;
export type MessagesList = MessageMetadata[];
export const MessagesList = /*@__PURE__*/ S.Array(MessageMetadata);
export type ExtractionJobMessages = { messagesList: MessageMetadata[] };
export const ExtractionJobMessages = /*@__PURE__*/ S.Union([
  S.Struct({ messagesList: MessagesList }),
]);
export interface ExtractionJobMetadata {
  jobID: string;
  messages: ExtractionJobMessages;
  status?: ExtractionJobStatus;
  failureReason?: string;
  strategyId?: string;
  sessionId?: string;
  actorId?: string;
}
export const ExtractionJobMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobID: S.String,
    messages: ExtractionJobMessages,
    status: S.optional(ExtractionJobStatus),
    failureReason: S.optional(S.String),
    strategyId: S.optional(S.String),
    sessionId: S.optional(S.String),
    actorId: S.optional(S.String),
  }),
).annotate({
  identifier: "ExtractionJobMetadata",
}) as any as S.Schema<ExtractionJobMetadata>;
export type ExtractionJobMetadataList = ExtractionJobMetadata[];
export const ExtractionJobMetadataList = /*@__PURE__*/ S.Array(
  ExtractionJobMetadata,
);
export interface ListMemoryExtractionJobsOutput {
  jobs: ExtractionJobMetadata[];
  nextToken?: string;
}
export const ListMemoryExtractionJobsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobs: ExtractionJobMetadataList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMemoryExtractionJobsOutput",
}) as any as S.Schema<ListMemoryExtractionJobsOutput>;
export type MemoryRecordLeftExpression = { metadataKey: string };
export const MemoryRecordLeftExpression = /*@__PURE__*/ S.Union([
  S.Struct({ metadataKey: S.String }),
]);
export type MemoryRecordOperatorType =
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
export const MemoryRecordOperatorType = /*@__PURE__*/ S.String;

export type MemoryRecordRightExpression = {
  metadataValue: MemoryRecordMetadataValue;
};
export const MemoryRecordRightExpression = /*@__PURE__*/ S.Union([
  S.Struct({ metadataValue: MemoryRecordMetadataValue }),
]);
export interface MemoryMetadataFilterExpression {
  left: MemoryRecordLeftExpression;
  operator: MemoryRecordOperatorType;
  right?: MemoryRecordRightExpression;
}
export const MemoryMetadataFilterExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    left: MemoryRecordLeftExpression,
    operator: MemoryRecordOperatorType,
    right: S.optional(MemoryRecordRightExpression),
  }),
).annotate({
  identifier: "MemoryMetadataFilterExpression",
}) as any as S.Schema<MemoryMetadataFilterExpression>;
export type MemoryMetadataFilterList = MemoryMetadataFilterExpression[];
export const MemoryMetadataFilterList = /*@__PURE__*/ S.Array(
  MemoryMetadataFilterExpression,
);
export interface ListMemoryRecordsInput {
  memoryId: string;
  namespace?: string;
  namespacePath?: string;
  memoryStrategyId?: string;
  maxResults?: number;
  nextToken?: string;
  metadataFilters?: MemoryMetadataFilterExpression[];
}
export const ListMemoryRecordsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memoryId: S.String.pipe(T.HttpLabel("memoryId")),
    namespace: S.optional(S.String),
    namespacePath: S.optional(S.String),
    memoryStrategyId: S.optional(S.String),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    metadataFilters: S.optional(MemoryMetadataFilterList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/memories/{memoryId}/memoryRecords" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMemoryRecordsInput",
}) as any as S.Schema<ListMemoryRecordsInput>;
export interface MemoryRecordSummary {
  memoryRecordId: string;
  content: MemoryContent;
  memoryStrategyId?: string;
  namespaces: string[];
  createdAt: Date;
  score?: number;
  metadata?: { [key: string]: MemoryRecordMetadataValue | undefined };
}
export const MemoryRecordSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memoryRecordId: S.String,
    content: MemoryContent,
    memoryStrategyId: S.optional(S.String),
    namespaces: NamespacesList,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    score: S.optional(S.Number),
    metadata: S.optional(MemoryRecordMetadataMap),
  }),
).annotate({
  identifier: "MemoryRecordSummary",
}) as any as S.Schema<MemoryRecordSummary>;
export type MemoryRecordSummaryList = MemoryRecordSummary[];
export const MemoryRecordSummaryList =
  /*@__PURE__*/ S.Array(MemoryRecordSummary);
export interface ListMemoryRecordsOutput {
  memoryRecordSummaries: MemoryRecordSummary[];
  nextToken?: string;
}
export const ListMemoryRecordsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memoryRecordSummaries: MemoryRecordSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMemoryRecordsOutput",
}) as any as S.Schema<ListMemoryRecordsOutput>;
export interface ListPaymentInstrumentsRequest {
  userId?: string;
  agentName?: string;
  paymentManagerArn: string;
  paymentConnectorId?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListPaymentInstrumentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userId: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-User-Id"),
    ),
    agentName: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-Agent-Name"),
    ),
    paymentManagerArn: S.String,
    paymentConnectorId: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/payments/listPaymentInstruments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPaymentInstrumentsRequest",
}) as any as S.Schema<ListPaymentInstrumentsRequest>;
export interface PaymentInstrumentSummary {
  paymentInstrumentId: string;
  paymentManagerArn: string;
  paymentConnectorId: string;
  userId: string;
  paymentInstrumentType: PaymentInstrumentType;
  status: PaymentInstrumentStatus;
  createdAt: Date;
  updatedAt: Date;
}
export const PaymentInstrumentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentInstrumentId: S.String,
    paymentManagerArn: S.String,
    paymentConnectorId: S.String,
    userId: S.String,
    paymentInstrumentType: PaymentInstrumentType,
    status: PaymentInstrumentStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "PaymentInstrumentSummary",
}) as any as S.Schema<PaymentInstrumentSummary>;
export type PaymentInstrumentSummaryList = PaymentInstrumentSummary[];
export const PaymentInstrumentSummaryList = /*@__PURE__*/ S.Array(
  PaymentInstrumentSummary,
);
export interface ListPaymentInstrumentsResponse {
  paymentInstruments: PaymentInstrumentSummary[];
  nextToken?: string;
}
export const ListPaymentInstrumentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentInstruments: PaymentInstrumentSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPaymentInstrumentsResponse",
}) as any as S.Schema<ListPaymentInstrumentsResponse>;
export interface ListPaymentSessionsRequest {
  userId?: string;
  agentName?: string;
  paymentManagerArn: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListPaymentSessionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userId: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-User-Id"),
    ),
    agentName: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-Agent-Name"),
    ),
    paymentManagerArn: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/payments/listPaymentSessions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPaymentSessionsRequest",
}) as any as S.Schema<ListPaymentSessionsRequest>;
export interface PaymentSessionSummary {
  paymentSessionId: string;
  paymentManagerArn: string;
  userId: string;
  expiryTimeInMinutes: number;
  createdAt: Date;
  updatedAt: Date;
}
export const PaymentSessionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentSessionId: S.String,
    paymentManagerArn: S.String,
    userId: S.String,
    expiryTimeInMinutes: S.Number,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "PaymentSessionSummary",
}) as any as S.Schema<PaymentSessionSummary>;
export type PaymentSessionSummaryList = PaymentSessionSummary[];
export const PaymentSessionSummaryList = /*@__PURE__*/ S.Array(
  PaymentSessionSummary,
);
export interface ListPaymentSessionsResponse {
  paymentSessions: PaymentSessionSummary[];
  nextToken?: string;
}
export const ListPaymentSessionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentSessions: PaymentSessionSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPaymentSessionsResponse",
}) as any as S.Schema<ListPaymentSessionsResponse>;
export interface ListRecommendationsRequest {
  maxResults?: number;
  nextToken?: string;
  statusFilter?: RecommendationStatus;
}
export const ListRecommendationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    statusFilter: S.optional(RecommendationStatus).pipe(T.HttpQuery("status")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/recommendations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRecommendationsRequest",
}) as any as S.Schema<ListRecommendationsRequest>;
export interface RecommendationSummary {
  recommendationId: string;
  recommendationArn: string;
  name: string;
  description?: string;
  type: RecommendationType;
  status: RecommendationStatus;
  createdAt: Date;
  updatedAt: Date;
}
export const RecommendationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendationId: S.String,
    recommendationArn: S.String,
    name: S.String,
    description: S.optional(S.String),
    type: RecommendationType,
    status: RecommendationStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "RecommendationSummary",
}) as any as S.Schema<RecommendationSummary>;
export type RecommendationSummaryList = RecommendationSummary[];
export const RecommendationSummaryList = /*@__PURE__*/ S.Array(
  RecommendationSummary,
);
export interface ListRecommendationsResponse {
  recommendationSummaries: RecommendationSummary[];
  nextToken?: string;
}
export const ListRecommendationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendationSummaries: RecommendationSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRecommendationsResponse",
}) as any as S.Schema<ListRecommendationsResponse>;
export type EventFilterCondition = "HAS_EVENTS" | (string & {});
export const EventFilterCondition = /*@__PURE__*/ S.String;

export interface SessionFilter {
  eventFilter?: EventFilterCondition;
}
export const SessionFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ eventFilter: S.optional(EventFilterCondition) }),
).annotate({ identifier: "SessionFilter" }) as any as S.Schema<SessionFilter>;
export interface ListSessionsInput {
  memoryId: string;
  actorId: string;
  maxResults?: number;
  nextToken?: string;
  filter?: SessionFilter;
}
export const ListSessionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memoryId: S.String.pipe(T.HttpLabel("memoryId")),
    actorId: S.String.pipe(T.HttpLabel("actorId")),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    filter: S.optional(SessionFilter),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/memories/{memoryId}/actor/{actorId}/sessions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSessionsInput",
}) as any as S.Schema<ListSessionsInput>;
export interface SessionSummary {
  sessionId: string;
  actorId: string;
  createdAt: Date;
}
export const SessionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.String,
    actorId: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "SessionSummary" }) as any as S.Schema<SessionSummary>;
export type SessionSummaryList = SessionSummary[];
export const SessionSummaryList = /*@__PURE__*/ S.Array(SessionSummary);
export interface ListSessionsOutput {
  sessionSummaries: SessionSummary[];
  nextToken?: string;
}
export const ListSessionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionSummaries: SessionSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSessionsOutput",
}) as any as S.Schema<ListSessionsOutput>;
export type PaymentType = "CRYPTO_X402" | (string & {});
export const PaymentType = /*@__PURE__*/ S.String;

export type PaymentDocument = unknown;
export interface CryptoX402PaymentInput {
  version: string;
  payload: any;
}
export const CryptoX402PaymentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ version: S.String, payload: S.Any }),
).annotate({
  identifier: "CryptoX402PaymentInput",
}) as any as S.Schema<CryptoX402PaymentInput>;
export type PaymentInput = { cryptoX402: CryptoX402PaymentInput };
export const PaymentInput = /*@__PURE__*/ S.Union([
  S.Struct({ cryptoX402: CryptoX402PaymentInput }),
]);
export interface ProcessPaymentRequest {
  userId?: string;
  agentName?: string;
  paymentManagerArn: string;
  paymentSessionId: string;
  paymentInstrumentId: string;
  paymentType: PaymentType;
  paymentInput: PaymentInput;
  clientToken?: string;
}
export const ProcessPaymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userId: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-User-Id"),
    ),
    agentName: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-Agent-Name"),
    ),
    paymentManagerArn: S.String,
    paymentSessionId: S.String,
    paymentInstrumentId: S.String,
    paymentType: PaymentType,
    paymentInput: PaymentInput,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/payments/processPayment" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ProcessPaymentRequest",
}) as any as S.Schema<ProcessPaymentRequest>;
export type ProcessPaymentId = string;
export type PaymentStatus = "PROOF_GENERATED" | (string & {});
export const PaymentStatus = /*@__PURE__*/ S.String;

export interface CryptoX402PaymentOutput {
  version: string;
  payload: any;
}
export const CryptoX402PaymentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ version: S.String, payload: S.Any }),
).annotate({
  identifier: "CryptoX402PaymentOutput",
}) as any as S.Schema<CryptoX402PaymentOutput>;
export type PaymentOutput = { cryptoX402: CryptoX402PaymentOutput };
export const PaymentOutput = /*@__PURE__*/ S.Union([
  S.Struct({ cryptoX402: CryptoX402PaymentOutput }),
]);
export interface ProcessPaymentResponse {
  processPaymentId: string;
  paymentManagerArn: string;
  paymentSessionId: string;
  paymentInstrumentId: string;
  paymentType: PaymentType;
  status: PaymentStatus;
  paymentOutput: PaymentOutput;
  createdAt: Date;
  updatedAt: Date;
}
export const ProcessPaymentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    processPaymentId: S.String,
    paymentManagerArn: S.String,
    paymentSessionId: S.String,
    paymentInstrumentId: S.String,
    paymentType: PaymentType,
    status: PaymentStatus,
    paymentOutput: PaymentOutput,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "ProcessPaymentResponse",
}) as any as S.Schema<ProcessPaymentResponse>;
export interface SearchCriteria {
  searchQuery: string | redacted.Redacted<string>;
  memoryStrategyId?: string;
  topK?: number;
  metadataFilters?: MemoryMetadataFilterExpression[];
}
export const SearchCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    searchQuery: SensitiveString,
    memoryStrategyId: S.optional(S.String),
    topK: S.optional(S.Number),
    metadataFilters: S.optional(MemoryMetadataFilterList),
  }),
).annotate({ identifier: "SearchCriteria" }) as any as S.Schema<SearchCriteria>;
export interface RetrieveMemoryRecordsInput {
  memoryId: string;
  namespace?: string;
  namespacePath?: string;
  searchCriteria: SearchCriteria;
  nextToken?: string;
  maxResults?: number;
}
export const RetrieveMemoryRecordsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memoryId: S.String.pipe(T.HttpLabel("memoryId")),
    namespace: S.optional(S.String),
    namespacePath: S.optional(S.String),
    searchCriteria: SearchCriteria,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/memories/{memoryId}/retrieve" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RetrieveMemoryRecordsInput",
}) as any as S.Schema<RetrieveMemoryRecordsInput>;
export interface RetrieveMemoryRecordsOutput {
  memoryRecordSummaries: MemoryRecordSummary[];
  nextToken?: string;
}
export const RetrieveMemoryRecordsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memoryRecordSummaries: MemoryRecordSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "RetrieveMemoryRecordsOutput",
}) as any as S.Schema<RetrieveMemoryRecordsOutput>;
export interface SaveBrowserSessionProfileRequest {
  traceId?: string;
  traceParent?: string;
  profileIdentifier: string;
  browserIdentifier: string;
  sessionId: string;
  clientToken?: string;
}
export const SaveBrowserSessionProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    traceId: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Trace-Id")),
    traceParent: S.optional(S.String).pipe(T.HttpHeader("traceparent")),
    profileIdentifier: S.String.pipe(T.HttpLabel("profileIdentifier")),
    browserIdentifier: S.String,
    sessionId: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/browser-profiles/{profileIdentifier}/save",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SaveBrowserSessionProfileRequest",
}) as any as S.Schema<SaveBrowserSessionProfileRequest>;
export interface SaveBrowserSessionProfileResponse {
  profileIdentifier: string;
  browserIdentifier: string;
  sessionId: string;
  lastUpdatedAt: Date;
}
export const SaveBrowserSessionProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileIdentifier: S.String,
    browserIdentifier: S.String,
    sessionId: S.String,
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "SaveBrowserSessionProfileResponse",
}) as any as S.Schema<SaveBrowserSessionProfileResponse>;
export type RegistryIdentifier = string;
export type RegistryIdList = string[];
export const RegistryIdList = /*@__PURE__*/ S.Array(S.String);
export type MetadataFilterExpression = unknown;
export interface SearchRegistryRecordsRequest {
  searchQuery: string;
  registryIds: string[];
  maxResults?: number;
  filters?: any;
}
export const SearchRegistryRecordsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    searchQuery: S.String,
    registryIds: RegistryIdList,
    maxResults: S.optional(S.Number),
    filters: S.optional(S.Any),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/registry-records/search" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchRegistryRecordsRequest",
}) as any as S.Schema<SearchRegistryRecordsRequest>;
export type RegistryArn = string;
export type RegistryRecordArn = string;
export type RegistryRecordId = string;
export type RegistryRecordName = string;
export type Description = string | redacted.Redacted<string>;
export type DescriptorType =
  | "MCP"
  | "A2A"
  | "CUSTOM"
  | "AGENT_SKILLS"
  | (string & {});
export const DescriptorType = /*@__PURE__*/ S.String;

export type SchemaVersion = string;
export type InlineContent = string;
export interface ServerDefinition {
  schemaVersion?: string;
  inlineContent?: string;
}
export const ServerDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    schemaVersion: S.optional(S.String),
    inlineContent: S.optional(S.String),
  }),
).annotate({
  identifier: "ServerDefinition",
}) as any as S.Schema<ServerDefinition>;
export interface ToolsDefinition {
  protocolVersion?: string;
  inlineContent?: string;
}
export const ToolsDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    protocolVersion: S.optional(S.String),
    inlineContent: S.optional(S.String),
  }),
).annotate({
  identifier: "ToolsDefinition",
}) as any as S.Schema<ToolsDefinition>;
export interface McpDescriptor {
  server: ServerDefinition;
  tools: ToolsDefinition;
}
export const McpDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ server: ServerDefinition, tools: ToolsDefinition }),
).annotate({ identifier: "McpDescriptor" }) as any as S.Schema<McpDescriptor>;
export interface AgentCardDefinition {
  schemaVersion?: string;
  inlineContent?: string;
}
export const AgentCardDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    schemaVersion: S.optional(S.String),
    inlineContent: S.optional(S.String),
  }),
).annotate({
  identifier: "AgentCardDefinition",
}) as any as S.Schema<AgentCardDefinition>;
export interface A2aDescriptor {
  agentCard: AgentCardDefinition;
}
export const A2aDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agentCard: AgentCardDefinition }),
).annotate({ identifier: "A2aDescriptor" }) as any as S.Schema<A2aDescriptor>;
export interface CustomDescriptor {
  inlineContent?: string;
}
export const CustomDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ inlineContent: S.optional(S.String) }),
).annotate({
  identifier: "CustomDescriptor",
}) as any as S.Schema<CustomDescriptor>;
export interface SkillMdDefinition {
  inlineContent?: string;
}
export const SkillMdDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ inlineContent: S.optional(S.String) }),
).annotate({
  identifier: "SkillMdDefinition",
}) as any as S.Schema<SkillMdDefinition>;
export interface SkillDefinition {
  schemaVersion?: string;
  inlineContent?: string;
}
export const SkillDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    schemaVersion: S.optional(S.String),
    inlineContent: S.optional(S.String),
  }),
).annotate({
  identifier: "SkillDefinition",
}) as any as S.Schema<SkillDefinition>;
export interface AgentSkillsDescriptor {
  skillMd: SkillMdDefinition;
  skillDefinition?: SkillDefinition;
}
export const AgentSkillsDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    skillMd: SkillMdDefinition,
    skillDefinition: S.optional(SkillDefinition),
  }),
).annotate({
  identifier: "AgentSkillsDescriptor",
}) as any as S.Schema<AgentSkillsDescriptor>;
export interface Descriptors {
  mcp?: McpDescriptor;
  a2a?: A2aDescriptor;
  custom?: CustomDescriptor;
  agentSkills?: AgentSkillsDescriptor;
}
export const Descriptors = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mcp: S.optional(McpDescriptor),
    a2a: S.optional(A2aDescriptor),
    custom: S.optional(CustomDescriptor),
    agentSkills: S.optional(AgentSkillsDescriptor),
  }),
).annotate({ identifier: "Descriptors" }) as any as S.Schema<Descriptors>;
export type RegistryRecordVersion = string;
export type RegistryRecordStatus =
  | "DRAFT"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "DEPRECATED"
  | (string & {});
export const RegistryRecordStatus = /*@__PURE__*/ S.String;

export interface RegistryRecordSummary {
  registryArn: string;
  recordArn: string;
  recordId: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  descriptorType: DescriptorType;
  descriptors: Descriptors;
  version: string;
  status: RegistryRecordStatus;
  createdAt: Date;
  updatedAt: Date;
}
export const RegistryRecordSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryArn: S.String,
    recordArn: S.String,
    recordId: S.String,
    name: S.String,
    description: S.optional(SensitiveString),
    descriptorType: DescriptorType,
    descriptors: Descriptors,
    version: S.String,
    status: RegistryRecordStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "RegistryRecordSummary",
}) as any as S.Schema<RegistryRecordSummary>;
export type RegistryRecordSummaryList = RegistryRecordSummary[];
export const RegistryRecordSummaryList = /*@__PURE__*/ S.Array(
  RegistryRecordSummary,
);
export interface SearchRegistryRecordsResponse {
  registryRecords: RegistryRecordSummary[];
}
export const SearchRegistryRecordsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ registryRecords: RegistryRecordSummaryList }),
).annotate({
  identifier: "SearchRegistryRecordsResponse",
}) as any as S.Schema<SearchRegistryRecordsResponse>;
export type GroundTruthTurnInput = { prompt: string };
export const GroundTruthTurnInput = /*@__PURE__*/ S.Union([
  S.Struct({ prompt: S.String }),
]);
export interface GroundTruthTurn {
  input?: GroundTruthTurnInput;
  expectedResponse?: EvaluationContent;
}
export const GroundTruthTurn = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    input: S.optional(GroundTruthTurnInput),
    expectedResponse: S.optional(EvaluationContent),
  }),
).annotate({
  identifier: "GroundTruthTurn",
}) as any as S.Schema<GroundTruthTurn>;
export type GroundTruthTurnList = GroundTruthTurn[];
export const GroundTruthTurnList = /*@__PURE__*/ S.Array(GroundTruthTurn);
export interface InlineGroundTruth {
  assertions?: EvaluationContent[];
  expectedTrajectory?: EvaluationExpectedTrajectory;
  turns?: GroundTruthTurn[];
}
export const InlineGroundTruth = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assertions: S.optional(EvaluationContentList),
    expectedTrajectory: S.optional(EvaluationExpectedTrajectory),
    turns: S.optional(GroundTruthTurnList),
  }),
).annotate({
  identifier: "InlineGroundTruth",
}) as any as S.Schema<InlineGroundTruth>;
export type GroundTruthSource = { inline: InlineGroundTruth };
export const GroundTruthSource = /*@__PURE__*/ S.Union([
  S.Struct({ inline: InlineGroundTruth }),
]);
export type StringMap = { [key: string]: string | undefined };
export const StringMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface SessionMetadataShape {
  sessionId: string;
  testScenarioId?: string;
  groundTruth?: GroundTruthSource;
  metadata?: { [key: string]: string | undefined };
}
export const SessionMetadataShape = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.String,
    testScenarioId: S.optional(S.String),
    groundTruth: S.optional(GroundTruthSource),
    metadata: S.optional(StringMap),
  }),
).annotate({
  identifier: "SessionMetadataShape",
}) as any as S.Schema<SessionMetadataShape>;
export type SessionMetadataList = SessionMetadataShape[];
export const SessionMetadataList = /*@__PURE__*/ S.Array(SessionMetadataShape);
export type EvaluationMetadata = { sessionMetadata: SessionMetadataShape[] };
export const EvaluationMetadata = /*@__PURE__*/ S.Union([
  S.Struct({ sessionMetadata: SessionMetadataList }),
]);
export interface StartBatchEvaluationRequest {
  batchEvaluationName: string;
  evaluators?: Evaluator[];
  insights?: Insight[];
  dataSourceConfig: DataSourceConfig;
  clientToken?: string;
  evaluationMetadata?: EvaluationMetadata;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
  description?: string;
}
export const StartBatchEvaluationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    batchEvaluationName: S.String,
    evaluators: S.optional(EvaluatorList),
    insights: S.optional(InsightList),
    dataSourceConfig: DataSourceConfig,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    evaluationMetadata: S.optional(EvaluationMetadata),
    tags: S.optional(TagsMap),
    kmsKeyArn: S.optional(S.String),
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/evaluations/batch-evaluate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartBatchEvaluationRequest",
}) as any as S.Schema<StartBatchEvaluationRequest>;
export interface StartBatchEvaluationResponse {
  batchEvaluationId: string;
  batchEvaluationArn: string;
  batchEvaluationName: string;
  evaluators?: Evaluator[];
  insights?: Insight[];
  status: BatchEvaluationStatus;
  createdAt: Date;
  outputConfig?: OutputConfig;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
  description?: string;
}
export const StartBatchEvaluationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    batchEvaluationId: S.String,
    batchEvaluationArn: S.String,
    batchEvaluationName: S.String,
    evaluators: S.optional(EvaluatorList),
    insights: S.optional(InsightList),
    status: BatchEvaluationStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    outputConfig: S.optional(OutputConfig),
    tags: S.optional(TagsMap),
    kmsKeyArn: S.optional(S.String),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "StartBatchEvaluationResponse",
}) as any as S.Schema<StartBatchEvaluationResponse>;
export interface StartBrowserSessionRequest {
  traceId?: string;
  traceParent?: string;
  browserIdentifier: string;
  name?: string;
  sessionTimeoutSeconds?: number;
  viewPort?: ViewPort;
  extensions?: BrowserExtension[];
  profileConfiguration?: BrowserProfileConfiguration;
  proxyConfiguration?: ProxyConfiguration;
  enterprisePolicies?: BrowserEnterprisePolicy[];
  certificates?: Certificate[];
  clientToken?: string;
}
export const StartBrowserSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    traceId: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Trace-Id")),
    traceParent: S.optional(S.String).pipe(T.HttpHeader("traceparent")),
    browserIdentifier: S.String.pipe(T.HttpLabel("browserIdentifier")),
    name: S.optional(S.String),
    sessionTimeoutSeconds: S.optional(S.Number),
    viewPort: S.optional(ViewPort),
    extensions: S.optional(BrowserExtensions),
    profileConfiguration: S.optional(BrowserProfileConfiguration),
    proxyConfiguration: S.optional(ProxyConfiguration),
    enterprisePolicies: S.optional(BrowserEnterprisePolicies),
    certificates: S.optional(Certificates),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/browsers/{browserIdentifier}/sessions/start",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartBrowserSessionRequest",
}) as any as S.Schema<StartBrowserSessionRequest>;
export interface StartBrowserSessionResponse {
  browserIdentifier: string;
  sessionId: string;
  createdAt: Date;
  streams?: BrowserSessionStream;
}
export const StartBrowserSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    browserIdentifier: S.String,
    sessionId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    streams: S.optional(BrowserSessionStream),
  }),
).annotate({
  identifier: "StartBrowserSessionResponse",
}) as any as S.Schema<StartBrowserSessionResponse>;
export interface StartCodeInterpreterSessionRequest {
  traceId?: string;
  traceParent?: string;
  codeInterpreterIdentifier: string;
  name?: string;
  sessionTimeoutSeconds?: number;
  certificates?: Certificate[];
  clientToken?: string;
}
export const StartCodeInterpreterSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    traceId: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Trace-Id")),
    traceParent: S.optional(S.String).pipe(T.HttpHeader("traceparent")),
    codeInterpreterIdentifier: S.String.pipe(
      T.HttpLabel("codeInterpreterIdentifier"),
    ),
    name: S.optional(S.String),
    sessionTimeoutSeconds: S.optional(S.Number),
    certificates: S.optional(Certificates),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/code-interpreters/{codeInterpreterIdentifier}/sessions/start",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartCodeInterpreterSessionRequest",
}) as any as S.Schema<StartCodeInterpreterSessionRequest>;
export interface StartCodeInterpreterSessionResponse {
  codeInterpreterIdentifier: string;
  sessionId: string;
  createdAt: Date;
}
export const StartCodeInterpreterSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeInterpreterIdentifier: S.String,
    sessionId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "StartCodeInterpreterSessionResponse",
}) as any as S.Schema<StartCodeInterpreterSessionResponse>;
export interface ExtractionJob {
  jobId: string;
}
export const ExtractionJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String }),
).annotate({ identifier: "ExtractionJob" }) as any as S.Schema<ExtractionJob>;
export interface StartMemoryExtractionJobInput {
  memoryId: string;
  extractionJob: ExtractionJob;
  clientToken?: string;
}
export const StartMemoryExtractionJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memoryId: S.String.pipe(T.HttpLabel("memoryId")),
    extractionJob: ExtractionJob,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/memories/{memoryId}/extractionJobs/start",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartMemoryExtractionJobInput",
}) as any as S.Schema<StartMemoryExtractionJobInput>;
export interface StartMemoryExtractionJobOutput {
  jobId: string;
}
export const StartMemoryExtractionJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String }),
).annotate({
  identifier: "StartMemoryExtractionJobOutput",
}) as any as S.Schema<StartMemoryExtractionJobOutput>;
export interface StartRecommendationRequest {
  name: string;
  description?: string;
  type: RecommendationType;
  recommendationConfig: RecommendationConfig;
  kmsKeyArn?: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const StartRecommendationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    type: RecommendationType,
    recommendationConfig: RecommendationConfig,
    kmsKeyArn: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/recommendations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartRecommendationRequest",
}) as any as S.Schema<StartRecommendationRequest>;
export interface StartRecommendationResponse {
  recommendationId: string;
  recommendationArn: string;
  name: string;
  description?: string;
  type: RecommendationType;
  recommendationConfig: RecommendationConfig;
  status: RecommendationStatus;
  createdAt: Date;
  updatedAt: Date;
}
export const StartRecommendationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendationId: S.String,
    recommendationArn: S.String,
    name: S.String,
    description: S.optional(S.String),
    type: RecommendationType,
    recommendationConfig: RecommendationConfig,
    status: RecommendationStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "StartRecommendationResponse",
}) as any as S.Schema<StartRecommendationResponse>;
export interface StopBatchEvaluationRequest {
  batchEvaluationId: string;
}
export const StopBatchEvaluationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    batchEvaluationId: S.String.pipe(T.HttpLabel("batchEvaluationId")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/evaluations/batch-evaluate/{batchEvaluationId}/stop",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopBatchEvaluationRequest",
}) as any as S.Schema<StopBatchEvaluationRequest>;
export interface StopBatchEvaluationResponse {
  batchEvaluationId: string;
  batchEvaluationArn: string;
  status: BatchEvaluationStatus;
  description?: string;
}
export const StopBatchEvaluationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    batchEvaluationId: S.String,
    batchEvaluationArn: S.String,
    status: BatchEvaluationStatus,
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "StopBatchEvaluationResponse",
}) as any as S.Schema<StopBatchEvaluationResponse>;
export interface StopBrowserSessionRequest {
  traceId?: string;
  traceParent?: string;
  browserIdentifier: string;
  sessionId: string;
  clientToken?: string;
}
export const StopBrowserSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    traceId: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Trace-Id")),
    traceParent: S.optional(S.String).pipe(T.HttpHeader("traceparent")),
    browserIdentifier: S.String.pipe(T.HttpLabel("browserIdentifier")),
    sessionId: S.String.pipe(T.HttpQuery("sessionId")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/browsers/{browserIdentifier}/sessions/stop",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopBrowserSessionRequest",
}) as any as S.Schema<StopBrowserSessionRequest>;
export interface StopBrowserSessionResponse {
  browserIdentifier: string;
  sessionId: string;
  lastUpdatedAt: Date;
}
export const StopBrowserSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    browserIdentifier: S.String,
    sessionId: S.String,
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "StopBrowserSessionResponse",
}) as any as S.Schema<StopBrowserSessionResponse>;
export interface StopCodeInterpreterSessionRequest {
  traceId?: string;
  traceParent?: string;
  codeInterpreterIdentifier: string;
  sessionId: string;
  clientToken?: string;
}
export const StopCodeInterpreterSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    traceId: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Trace-Id")),
    traceParent: S.optional(S.String).pipe(T.HttpHeader("traceparent")),
    codeInterpreterIdentifier: S.String.pipe(
      T.HttpLabel("codeInterpreterIdentifier"),
    ),
    sessionId: S.String.pipe(T.HttpQuery("sessionId")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/code-interpreters/{codeInterpreterIdentifier}/sessions/stop",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopCodeInterpreterSessionRequest",
}) as any as S.Schema<StopCodeInterpreterSessionRequest>;
export interface StopCodeInterpreterSessionResponse {
  codeInterpreterIdentifier: string;
  sessionId: string;
  lastUpdatedAt: Date;
}
export const StopCodeInterpreterSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeInterpreterIdentifier: S.String,
    sessionId: S.String,
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "StopCodeInterpreterSessionResponse",
}) as any as S.Schema<StopCodeInterpreterSessionResponse>;
export interface StopRuntimeSessionRequest {
  runtimeSessionId: string;
  agentRuntimeArn: string;
  qualifier?: string;
  clientToken?: string;
}
export const StopRuntimeSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    runtimeSessionId: S.String.pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Runtime-Session-Id"),
    ),
    agentRuntimeArn: S.String.pipe(T.HttpLabel("agentRuntimeArn")),
    qualifier: S.optional(S.String).pipe(T.HttpQuery("qualifier")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/runtimes/{agentRuntimeArn}/stopruntimesession",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopRuntimeSessionRequest",
}) as any as S.Schema<StopRuntimeSessionRequest>;
export interface StopRuntimeSessionResponse {
  runtimeSessionId?: string;
  statusCode?: number;
}
export const StopRuntimeSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    runtimeSessionId: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-AgentCore-Runtime-Session-Id"),
    ),
    statusCode: S.optional(S.Number).pipe(T.HttpResponseCode()),
  }),
).annotate({
  identifier: "StopRuntimeSessionResponse",
}) as any as S.Schema<StopRuntimeSessionResponse>;
export interface UpdateABTestRequest {
  abTestId: string;
  clientToken?: string;
  name?: string;
  description?: string;
  variants?: Variant[];
  gatewayFilter?: GatewayFilter;
  evaluationConfig?: ABTestEvaluationConfig;
  roleArn?: string;
  executionStatus?: ABTestExecutionStatus;
}
export const UpdateABTestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    abTestId: S.String.pipe(T.HttpLabel("abTestId")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    name: S.optional(S.String),
    description: S.optional(S.String),
    variants: S.optional(VariantList),
    gatewayFilter: S.optional(GatewayFilter),
    evaluationConfig: S.optional(ABTestEvaluationConfig),
    roleArn: S.optional(S.String),
    executionStatus: S.optional(ABTestExecutionStatus),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/ab-tests/{abTestId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateABTestRequest",
}) as any as S.Schema<UpdateABTestRequest>;
export interface UpdateABTestResponse {
  abTestId: string;
  abTestArn: string;
  status: ABTestStatus;
  executionStatus: ABTestExecutionStatus;
  updatedAt: Date;
}
export const UpdateABTestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    abTestId: S.String,
    abTestArn: S.String,
    status: ABTestStatus,
    executionStatus: ABTestExecutionStatus,
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "UpdateABTestResponse",
}) as any as S.Schema<UpdateABTestResponse>;
export interface AutomationStreamUpdate {
  streamStatus?: AutomationStreamStatus;
}
export const AutomationStreamUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ streamStatus: S.optional(AutomationStreamStatus) }),
).annotate({
  identifier: "AutomationStreamUpdate",
}) as any as S.Schema<AutomationStreamUpdate>;
export type StreamUpdate = { automationStreamUpdate: AutomationStreamUpdate };
export const StreamUpdate = /*@__PURE__*/ S.Union([
  S.Struct({ automationStreamUpdate: AutomationStreamUpdate }),
]);
export interface UpdateBrowserStreamRequest {
  browserIdentifier: string;
  sessionId: string;
  streamUpdate: StreamUpdate;
  clientToken?: string;
}
export const UpdateBrowserStreamRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    browserIdentifier: S.String.pipe(T.HttpLabel("browserIdentifier")),
    sessionId: S.String.pipe(T.HttpQuery("sessionId")),
    streamUpdate: StreamUpdate,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/browsers/{browserIdentifier}/sessions/streams/update",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateBrowserStreamRequest",
}) as any as S.Schema<UpdateBrowserStreamRequest>;
export interface UpdateBrowserStreamResponse {
  browserIdentifier: string;
  sessionId: string;
  streams: BrowserSessionStream;
  updatedAt: Date;
}
export const UpdateBrowserStreamResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    browserIdentifier: S.String,
    sessionId: S.String,
    streams: BrowserSessionStream,
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "UpdateBrowserStreamResponse",
}) as any as S.Schema<UpdateBrowserStreamResponse>;
export type BatchCreateMemoryRecordsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Creates multiple memory records in a single batch operation for the specified memory with custom content.
 */
export const batchCreateMemoryRecords: API.OperationMethod<
  BatchCreateMemoryRecordsInput,
  BatchCreateMemoryRecordsOutput,
  BatchCreateMemoryRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchCreateMemoryRecordsInput,
  output: BatchCreateMemoryRecordsOutput,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateMemoryRecords",
}));

export type BatchDeleteMemoryRecordsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Deletes multiple memory records in a single batch operation from the specified memory.
 */
export const batchDeleteMemoryRecords: API.OperationMethod<
  BatchDeleteMemoryRecordsInput,
  BatchDeleteMemoryRecordsOutput,
  BatchDeleteMemoryRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteMemoryRecordsInput,
  output: BatchDeleteMemoryRecordsOutput,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteMemoryRecords",
}));

export type BatchUpdateMemoryRecordsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Updates multiple memory records with custom content in a single batch operation within the specified memory.
 */
export const batchUpdateMemoryRecords: API.OperationMethod<
  BatchUpdateMemoryRecordsInput,
  BatchUpdateMemoryRecordsOutput,
  BatchUpdateMemoryRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchUpdateMemoryRecordsInput,
  output: BatchUpdateMemoryRecordsOutput,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateMemoryRecords",
}));

export type CompleteResourceTokenAuthError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Confirms the user authentication session for obtaining OAuth2.0 tokens for a resource.
 */
export const completeResourceTokenAuth: API.OperationMethod<
  CompleteResourceTokenAuthRequest,
  CompleteResourceTokenAuthResponse,
  CompleteResourceTokenAuthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CompleteResourceTokenAuthRequest,
  output: CompleteResourceTokenAuthResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CompleteResourceTokenAuth",
}));

export type CreateABTestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates an A/B test for comparing agent configurations. A/B tests split traffic between a control variant and a treatment variant through a gateway, then evaluate performance using online evaluation configurations to determine which variant performs better.
 */
export const createABTest: API.OperationMethod<
  CreateABTestRequest,
  CreateABTestResponse,
  CreateABTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateABTestRequest,
  output: CreateABTestResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateABTest",
}));

export type CreateEventError =
  | AccessDeniedException
  | InvalidInputException
  | ResourceNotFoundException
  | RetryableConflictException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Creates an event in an AgentCore Memory resource. Events represent interactions or activities that occur within a session and are associated with specific actors.
 *
 * To use this operation, you must have the `bedrock-agentcore:CreateEvent` permission.
 *
 * This operation is subject to request rate limiting.
 */
export const createEvent: API.OperationMethod<
  CreateEventInput,
  CreateEventOutput,
  CreateEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEventInput,
  output: CreateEventOutput,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    ResourceNotFoundException,
    RetryableConflictException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEvent",
}));

export type CreatePaymentInstrumentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a new payment instrument for a connector.
 */
export const createPaymentInstrument: API.OperationMethod<
  CreatePaymentInstrumentRequest,
  CreatePaymentInstrumentResponse,
  CreatePaymentInstrumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePaymentInstrumentRequest,
  output: CreatePaymentInstrumentResponse,
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
  operationName: "CreatePaymentInstrument",
}));

export type CreatePaymentSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a new payment session.
 */
export const createPaymentSession: API.OperationMethod<
  CreatePaymentSessionRequest,
  CreatePaymentSessionResponse,
  CreatePaymentSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePaymentSessionRequest,
  output: CreatePaymentSessionResponse,
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
  operationName: "CreatePaymentSession",
}));

export type DeleteABTestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an A/B test and its associated gateway rules.
 */
export const deleteABTest: API.OperationMethod<
  DeleteABTestRequest,
  DeleteABTestResponse,
  DeleteABTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteABTestRequest,
  output: DeleteABTestResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteABTest",
}));

export type DeleteBatchEvaluationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a batch evaluation and its associated results.
 */
export const deleteBatchEvaluation: API.OperationMethod<
  DeleteBatchEvaluationRequest,
  DeleteBatchEvaluationResponse,
  DeleteBatchEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBatchEvaluationRequest,
  output: DeleteBatchEvaluationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBatchEvaluation",
}));

export type DeleteEventError =
  | AccessDeniedException
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an event from an AgentCore Memory resource. When you delete an event, it is permanently removed.
 *
 * To use this operation, you must have the `bedrock-agentcore:DeleteEvent` permission.
 */
export const deleteEvent: API.OperationMethod<
  DeleteEventInput,
  DeleteEventOutput,
  DeleteEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEventInput,
  output: DeleteEventOutput,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEvent",
}));

export type DeleteMemoryRecordError =
  | AccessDeniedException
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a memory record from an AgentCore Memory resource. When you delete a memory record, it is permanently removed.
 *
 * To use this operation, you must have the `bedrock-agentcore:DeleteMemoryRecord` permission.
 */
export const deleteMemoryRecord: API.OperationMethod<
  DeleteMemoryRecordInput,
  DeleteMemoryRecordOutput,
  DeleteMemoryRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMemoryRecordInput,
  output: DeleteMemoryRecordOutput,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMemoryRecord",
}));

export type DeletePaymentInstrumentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a payment instrument. This is a soft delete operation that preserves the record for audit and compliance purposes.
 */
export const deletePaymentInstrument: API.OperationMethod<
  DeletePaymentInstrumentRequest,
  DeletePaymentInstrumentResponse,
  DeletePaymentInstrumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePaymentInstrumentRequest,
  output: DeletePaymentInstrumentResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePaymentInstrument",
}));

export type DeletePaymentSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a payment session. This permanently removes the payment session record.
 */
export const deletePaymentSession: API.OperationMethod<
  DeletePaymentSessionRequest,
  DeletePaymentSessionResponse,
  DeletePaymentSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePaymentSessionRequest,
  output: DeletePaymentSessionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePaymentSession",
}));

export type DeleteRecommendationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a recommendation and its associated results.
 */
export const deleteRecommendation: API.OperationMethod<
  DeleteRecommendationRequest,
  DeleteRecommendationResponse,
  DeleteRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRecommendationRequest,
  output: DeleteRecommendationResponse,
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
  operationName: "DeleteRecommendation",
}));

export type EvaluateError =
  | AccessDeniedException
  | ConflictException
  | DuplicateIdException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Performs on-demand evaluation of agent traces using a specified evaluator. This synchronous API accepts traces in OpenTelemetry format and returns immediate scoring results with detailed explanations.
 */
export const evaluate: API.OperationMethod<
  EvaluateRequest,
  EvaluateResponse,
  EvaluateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EvaluateRequest,
  output: EvaluateResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    DuplicateIdException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Evaluate",
}));

export type GetABTestError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about an A/B test, including its configuration, status, and statistical results.
 */
export const getABTest: API.OperationMethod<
  GetABTestRequest,
  GetABTestResponse,
  GetABTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetABTestRequest,
  output: GetABTestResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetABTest",
}));

export type GetAgentCardError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | RetryableConflictException
  | RuntimeClientError
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the A2A agent card associated with an AgentCore Runtime agent.
 */
export const getAgentCard: API.OperationMethod<
  GetAgentCardRequest,
  GetAgentCardResponse,
  GetAgentCardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAgentCardRequest,
  output: GetAgentCardResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    RetryableConflictException,
    RuntimeClientError,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgentCard",
}));

export type GetBatchEvaluationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a batch evaluation, including its status, configuration, results, and any error details.
 */
export const getBatchEvaluation: API.OperationMethod<
  GetBatchEvaluationRequest,
  GetBatchEvaluationResponse,
  GetBatchEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBatchEvaluationRequest,
  output: GetBatchEvaluationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBatchEvaluation",
}));

export type GetBrowserSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific browser session in Amazon Bedrock AgentCore. This operation returns the session's configuration, current status, associated streams, and metadata.
 *
 * To get a browser session, you must specify both the browser identifier and the session ID. The response includes information about the session's viewport configuration, timeout settings, and stream endpoints.
 *
 * The following operations are related to `GetBrowserSession`:
 *
 * - StartBrowserSession
 *
 * - ListBrowserSessions
 *
 * - StopBrowserSession
 */
export const getBrowserSession: API.OperationMethod<
  GetBrowserSessionRequest,
  GetBrowserSessionResponse,
  GetBrowserSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBrowserSessionRequest,
  output: GetBrowserSessionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBrowserSession",
}));

export type GetCodeInterpreterSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific code interpreter session in Amazon Bedrock AgentCore. This operation returns the session's configuration, current status, and metadata.
 *
 * To get a code interpreter session, you must specify both the code interpreter identifier and the session ID. The response includes information about the session's timeout settings and current status.
 *
 * The following operations are related to `GetCodeInterpreterSession`:
 *
 * - StartCodeInterpreterSession
 *
 * - ListCodeInterpreterSessions
 *
 * - StopCodeInterpreterSession
 */
export const getCodeInterpreterSession: API.OperationMethod<
  GetCodeInterpreterSessionRequest,
  GetCodeInterpreterSessionResponse,
  GetCodeInterpreterSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCodeInterpreterSessionRequest,
  output: GetCodeInterpreterSessionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCodeInterpreterSession",
}));

export type GetEventError =
  | AccessDeniedException
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specific event in an AgentCore Memory resource.
 *
 * To use this operation, you must have the `bedrock-agentcore:GetEvent` permission.
 */
export const getEvent: API.OperationMethod<
  GetEventInput,
  GetEventOutput,
  GetEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEventInput,
  output: GetEventOutput,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEvent",
}));

export type GetMemoryRecordError =
  | AccessDeniedException
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a specific memory record from an AgentCore Memory resource.
 *
 * To use this operation, you must have the `bedrock-agentcore:GetMemoryRecord` permission.
 */
export const getMemoryRecord: API.OperationMethod<
  GetMemoryRecordInput,
  GetMemoryRecordOutput,
  GetMemoryRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMemoryRecordInput,
  output: GetMemoryRecordOutput,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMemoryRecord",
}));

export type GetPaymentInstrumentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a payment instrument by ID.
 */
export const getPaymentInstrument: API.OperationMethod<
  GetPaymentInstrumentRequest,
  GetPaymentInstrumentResponse,
  GetPaymentInstrumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPaymentInstrumentRequest,
  output: GetPaymentInstrumentResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPaymentInstrument",
}));

export type GetPaymentInstrumentBalanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the balance of a payment instrument.
 */
export const getPaymentInstrumentBalance: API.OperationMethod<
  GetPaymentInstrumentBalanceRequest,
  GetPaymentInstrumentBalanceResponse,
  GetPaymentInstrumentBalanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPaymentInstrumentBalanceRequest,
  output: GetPaymentInstrumentBalanceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPaymentInstrumentBalance",
}));

export type GetPaymentSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a payment session.
 */
export const getPaymentSession: API.OperationMethod<
  GetPaymentSessionRequest,
  GetPaymentSessionResponse,
  GetPaymentSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPaymentSessionRequest,
  output: GetPaymentSessionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPaymentSession",
}));

export type GetRecommendationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a recommendation, including its configuration, status, and results.
 */
export const getRecommendation: API.OperationMethod<
  GetRecommendationRequest,
  GetRecommendationResponse,
  GetRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRecommendationRequest,
  output: GetRecommendationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommendation",
}));

export type GetResourceApiKeyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the API key associated with an API key credential provider.
 */
export const getResourceApiKey: API.OperationMethod<
  GetResourceApiKeyRequest,
  GetResourceApiKeyResponse,
  GetResourceApiKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourceApiKeyRequest,
  output: GetResourceApiKeyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceApiKey",
}));

export type GetResourceOauth2TokenError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Returns the OAuth 2.0 token of the provided resource.
 */
export const getResourceOauth2Token: API.OperationMethod<
  GetResourceOauth2TokenRequest,
  GetResourceOauth2TokenResponse,
  GetResourceOauth2TokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourceOauth2TokenRequest,
  output: GetResourceOauth2TokenResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceOauth2Token",
}));

export type GetResourcePaymentTokenError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Generates authentication tokens for payment providers that use vendor-specific authentication mechanisms.
 */
export const getResourcePaymentToken: API.OperationMethod<
  GetResourcePaymentTokenRequest,
  GetResourcePaymentTokenResponse,
  GetResourcePaymentTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourcePaymentTokenRequest,
  output: GetResourcePaymentTokenResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePaymentToken",
}));

export type GetWorkloadAccessTokenError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Obtains a workload access token for agentic workloads not acting on behalf of a user.
 */
export const getWorkloadAccessToken: API.OperationMethod<
  GetWorkloadAccessTokenRequest,
  GetWorkloadAccessTokenResponse,
  GetWorkloadAccessTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWorkloadAccessTokenRequest,
  output: GetWorkloadAccessTokenResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkloadAccessToken",
}));

export type GetWorkloadAccessTokenForJWTError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Obtains a workload access token for agentic workloads acting on behalf of a user, using a JWT token.
 */
export const getWorkloadAccessTokenForJWT: API.OperationMethod<
  GetWorkloadAccessTokenForJWTRequest,
  GetWorkloadAccessTokenForJWTResponse,
  GetWorkloadAccessTokenForJWTError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWorkloadAccessTokenForJWTRequest,
  output: GetWorkloadAccessTokenForJWTResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkloadAccessTokenForJWT",
}));

export type GetWorkloadAccessTokenForUserIdError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Obtains a workload access token for agentic workloads acting on behalf of a user, using the user's ID.
 */
export const getWorkloadAccessTokenForUserId: API.OperationMethod<
  GetWorkloadAccessTokenForUserIdRequest,
  GetWorkloadAccessTokenForUserIdResponse,
  GetWorkloadAccessTokenForUserIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWorkloadAccessTokenForUserIdRequest,
  output: GetWorkloadAccessTokenForUserIdResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkloadAccessTokenForUserId",
}));

export type InvokeAgentRuntimeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | RetryableConflictException
  | RuntimeClientError
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends a request to an agent or tool hosted in an Amazon Bedrock AgentCore Runtime and receives responses in real-time.
 *
 * To invoke an agent, you can specify either the AgentCore Runtime ARN or the agent ID with an account ID, and provide a payload containing your request. When you use the agent ID instead of the full ARN, you don't need to URL-encode the identifier. You can optionally specify a qualifier to target a specific endpoint of the agent.
 *
 * This operation supports streaming responses, allowing you to receive partial responses as they become available. We recommend using pagination to ensure that the operation returns quickly and successfully when processing large responses.
 *
 * For example code, see Invoke an AgentCore Runtime agent.
 *
 * If you're integrating your agent with OAuth, you can't use the Amazon Web Services SDK to call `InvokeAgentRuntime`. Instead, make a HTTPS request to `InvokeAgentRuntime`. For an example, see Authenticate and authorize with Inbound Auth and Outbound Auth.
 *
 * To use this operation, you must have the `bedrock-agentcore:InvokeAgentRuntime` permission. If you are making a call to `InvokeAgentRuntime` on behalf of a user ID with the `X-Amzn-Bedrock-AgentCore-Runtime-User-Id` header, You require permissions to both actions (`bedrock-agentcore:InvokeAgentRuntime` and `bedrock-agentcore:InvokeAgentRuntimeForUser`).
 */
export const invokeAgentRuntime: API.OperationMethod<
  InvokeAgentRuntimeRequest,
  InvokeAgentRuntimeResponse,
  InvokeAgentRuntimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InvokeAgentRuntimeRequest,
  output: InvokeAgentRuntimeResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    RetryableConflictException,
    RuntimeClientError,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeAgentRuntime",
}));

export type InvokeAgentRuntimeCommandError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | RetryableConflictException
  | RuntimeClientError
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Executes a command in a runtime session container and streams the output back to the caller. This operation allows you to run shell commands within the agent runtime environment and receive real-time streaming responses including standard output and standard error.
 *
 * To invoke a command, you must specify the agent runtime ARN and a runtime session ID. The command execution supports streaming responses, allowing you to receive output as it becomes available through `contentStart`, `contentDelta`, and `contentStop` events.
 *
 * To use this operation, you must have the `bedrock-agentcore:InvokeAgentRuntimeCommand` permission.
 */
export const invokeAgentRuntimeCommand: API.OperationMethod<
  InvokeAgentRuntimeCommandRequest,
  InvokeAgentRuntimeCommandResponse,
  InvokeAgentRuntimeCommandError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InvokeAgentRuntimeCommandRequest,
  output: InvokeAgentRuntimeCommandResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    RetryableConflictException,
    RuntimeClientError,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeAgentRuntimeCommand",
}));

export type InvokeBrowserError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Invokes an operating system-level action on a browser session in Amazon Bedrock AgentCore. This operation provides direct OS-level control over browser sessions, enabling mouse actions, keyboard input, and screenshots that the WebSocket-based Chrome DevTools Protocol (CDP) cannot handle — such as interacting with print dialogs, context menus, and JavaScript alerts.
 *
 * You send a request with exactly one action in the `BrowserAction` union, and receive a corresponding result in the `BrowserActionResult` union.
 *
 * The following operations are related to `InvokeBrowser`:
 *
 * - StartBrowserSession
 *
 * - GetBrowserSession
 *
 * - StopBrowserSession
 */
export const invokeBrowser: API.OperationMethod<
  InvokeBrowserRequest,
  InvokeBrowserResponse,
  InvokeBrowserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InvokeBrowserRequest,
  output: InvokeBrowserResponse,
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
  operationName: "InvokeBrowser",
}));

export type InvokeCodeInterpreterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Executes code within an active code interpreter session in Amazon Bedrock AgentCore. This operation processes the provided code, runs it in a secure environment, and returns the execution results including output, errors, and generated visualizations.
 *
 * To execute code, you must specify the code interpreter identifier, session ID, and the code to run in the arguments parameter. The operation returns a stream containing the execution results, which can include text output, error messages, and data visualizations.
 *
 * This operation is subject to request rate limiting based on your account's service quotas.
 *
 * The following operations are related to `InvokeCodeInterpreter`:
 *
 * - StartCodeInterpreterSession
 *
 * - GetCodeInterpreterSession
 */
export const invokeCodeInterpreter: API.OperationMethod<
  InvokeCodeInterpreterRequest,
  InvokeCodeInterpreterResponse,
  InvokeCodeInterpreterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InvokeCodeInterpreterRequest,
  output: InvokeCodeInterpreterResponse,
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
  operationName: "InvokeCodeInterpreter",
}));

export type InvokeHarnessError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | RuntimeClientError
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Operation to invoke a Harness.
 */
export const invokeHarness: API.OperationMethod<
  InvokeHarnessRequest,
  InvokeHarnessResponse,
  InvokeHarnessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InvokeHarnessRequest,
  output: InvokeHarnessResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    RuntimeClientError,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeHarness",
}));

export type ListABTestsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all A/B tests in the account.
 */
export const listABTests: API.PaginatedOperationMethod<
  ListABTestsRequest,
  ListABTestsResponse,
  ListABTestsError,
  Credentials | HttpClient.HttpClient,
  ABTestSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListABTestsRequest,
  output: ListABTestsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListABTests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "abTests",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListActorsError =
  | AccessDeniedException
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Lists all actors in an AgentCore Memory resource. We recommend using pagination to ensure that the operation returns quickly and successfully.
 *
 * To use this operation, you must have the `bedrock-agentcore:ListActors` permission.
 */
export const listActors: API.PaginatedOperationMethod<
  ListActorsInput,
  ListActorsOutput,
  ListActorsError,
  Credentials | HttpClient.HttpClient,
  ActorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListActorsInput,
  output: ListActorsOutput,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListActors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "actorSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBatchEvaluationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all batch evaluations in the account, providing summary information about each evaluation's status and configuration.
 */
export const listBatchEvaluations: API.PaginatedOperationMethod<
  ListBatchEvaluationsRequest,
  ListBatchEvaluationsResponse,
  ListBatchEvaluationsError,
  Credentials | HttpClient.HttpClient,
  BatchEvaluationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBatchEvaluationsRequest,
  output: ListBatchEvaluationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBatchEvaluations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "batchEvaluations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBrowserSessionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of browser sessions in Amazon Bedrock AgentCore that match the specified criteria. This operation returns summary information about each session, including identifiers, status, and timestamps.
 *
 * You can filter the results by browser identifier and session status. The operation supports pagination to handle large result sets efficiently.
 *
 * We recommend using pagination to ensure that the operation returns quickly and successfully when retrieving large numbers of sessions.
 *
 * The following operations are related to `ListBrowserSessions`:
 *
 * - StartBrowserSession
 *
 * - GetBrowserSession
 */
export const listBrowserSessions: API.OperationMethod<
  ListBrowserSessionsRequest,
  ListBrowserSessionsResponse,
  ListBrowserSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListBrowserSessionsRequest,
  output: ListBrowserSessionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBrowserSessions",
}));

export type ListCodeInterpreterSessionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of code interpreter sessions in Amazon Bedrock AgentCore that match the specified criteria. This operation returns summary information about each session, including identifiers, status, and timestamps.
 *
 * You can filter the results by code interpreter identifier and session status. The operation supports pagination to handle large result sets efficiently.
 *
 * We recommend using pagination to ensure that the operation returns quickly and successfully when retrieving large numbers of sessions.
 *
 * The following operations are related to `ListCodeInterpreterSessions`:
 *
 * - StartCodeInterpreterSession
 *
 * - GetCodeInterpreterSession
 */
export const listCodeInterpreterSessions: API.OperationMethod<
  ListCodeInterpreterSessionsRequest,
  ListCodeInterpreterSessionsResponse,
  ListCodeInterpreterSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListCodeInterpreterSessionsRequest,
  output: ListCodeInterpreterSessionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCodeInterpreterSessions",
}));

export type ListEventsError =
  | AccessDeniedException
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Lists events in an AgentCore Memory resource based on specified criteria. We recommend using pagination to ensure that the operation returns quickly and successfully.
 *
 * To use this operation, you must have the `bedrock-agentcore:ListEvents` permission.
 */
export const listEvents: API.PaginatedOperationMethod<
  ListEventsInput,
  ListEventsOutput,
  ListEventsError,
  Credentials | HttpClient.HttpClient,
  Event
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEventsInput,
  output: ListEventsOutput,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "events",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMemoryExtractionJobsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Lists all long-term memory extraction jobs that are eligible to be started with optional filtering.
 *
 * To use this operation, you must have the `bedrock-agentcore:ListMemoryExtractionJobs` permission.
 */
export const listMemoryExtractionJobs: API.PaginatedOperationMethod<
  ListMemoryExtractionJobsInput,
  ListMemoryExtractionJobsOutput,
  ListMemoryExtractionJobsError,
  Credentials | HttpClient.HttpClient,
  ExtractionJobMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMemoryExtractionJobsInput,
  output: ListMemoryExtractionJobsOutput,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMemoryExtractionJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMemoryRecordsError =
  | AccessDeniedException
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Lists memory records in an AgentCore Memory resource based on specified criteria. We recommend using pagination to ensure that the operation returns quickly and successfully.
 *
 * To use this operation, you must have the `bedrock-agentcore:ListMemoryRecords` permission.
 */
export const listMemoryRecords: API.PaginatedOperationMethod<
  ListMemoryRecordsInput,
  ListMemoryRecordsOutput,
  ListMemoryRecordsError,
  Credentials | HttpClient.HttpClient,
  MemoryRecordSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMemoryRecordsInput,
  output: ListMemoryRecordsOutput,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMemoryRecords",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "memoryRecordSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPaymentInstrumentsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List payment instruments for a manager.
 */
export const listPaymentInstruments: API.PaginatedOperationMethod<
  ListPaymentInstrumentsRequest,
  ListPaymentInstrumentsResponse,
  ListPaymentInstrumentsError,
  Credentials | HttpClient.HttpClient,
  PaymentInstrumentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPaymentInstrumentsRequest,
  output: ListPaymentInstrumentsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPaymentInstruments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "paymentInstruments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPaymentSessionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List payment sessions.
 */
export const listPaymentSessions: API.PaginatedOperationMethod<
  ListPaymentSessionsRequest,
  ListPaymentSessionsResponse,
  ListPaymentSessionsError,
  Credentials | HttpClient.HttpClient,
  PaymentSessionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPaymentSessionsRequest,
  output: ListPaymentSessionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPaymentSessions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "paymentSessions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all recommendations in the account, with optional filtering by status.
 */
export const listRecommendations: API.PaginatedOperationMethod<
  ListRecommendationsRequest,
  ListRecommendationsResponse,
  ListRecommendationsError,
  Credentials | HttpClient.HttpClient,
  RecommendationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRecommendationsRequest,
  output: ListRecommendationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recommendationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSessionsError =
  | AccessDeniedException
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Lists sessions in an AgentCore Memory resource based on specified criteria. We recommend using pagination to ensure that the operation returns quickly and successfully.
 *
 * Empty sessions are automatically deleted after one day.
 *
 * To use this operation, you must have the `bedrock-agentcore:ListSessions` permission.
 */
export const listSessions: API.PaginatedOperationMethod<
  ListSessionsInput,
  ListSessionsOutput,
  ListSessionsError,
  Credentials | HttpClient.HttpClient,
  SessionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSessionsInput,
  output: ListSessionsOutput,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
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

export type ProcessPaymentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Processes a payment using a payment instrument within a payment session.
 */
export const processPayment: API.OperationMethod<
  ProcessPaymentRequest,
  ProcessPaymentResponse,
  ProcessPaymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ProcessPaymentRequest,
  output: ProcessPaymentResponse,
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
  operationName: "ProcessPayment",
}));

export type RetrieveMemoryRecordsError =
  | AccessDeniedException
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Searches for and retrieves memory records from an AgentCore Memory resource based on specified search criteria. We recommend using pagination to ensure that the operation returns quickly and successfully.
 *
 * To use this operation, you must have the `bedrock-agentcore:RetrieveMemoryRecords` permission.
 */
export const retrieveMemoryRecords: API.PaginatedOperationMethod<
  RetrieveMemoryRecordsInput,
  RetrieveMemoryRecordsOutput,
  RetrieveMemoryRecordsError,
  Credentials | HttpClient.HttpClient,
  MemoryRecordSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: RetrieveMemoryRecordsInput,
  output: RetrieveMemoryRecordsOutput,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetrieveMemoryRecords",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "memoryRecordSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SaveBrowserSessionProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Saves the current state of a browser session as a reusable profile in Amazon Bedrock AgentCore. A browser profile captures persistent browser data such as cookies and local storage from an active session, enabling you to reuse this data in future browser sessions.
 *
 * To save a browser session profile, you must specify the profile identifier, browser identifier, and session ID. The session must be active when saving the profile. Once saved, the profile can be used with the `StartBrowserSession` operation to initialize new sessions with the stored browser state.
 *
 * Browser profiles are useful for scenarios that require persistent authentication, maintaining user preferences across sessions, or continuing tasks that depend on previously stored browser data.
 *
 * The following operations are related to `SaveBrowserSessionProfile`:
 *
 * - StartBrowserSession
 *
 * - GetBrowserSession
 */
export const saveBrowserSessionProfile: API.OperationMethod<
  SaveBrowserSessionProfileRequest,
  SaveBrowserSessionProfileResponse,
  SaveBrowserSessionProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SaveBrowserSessionProfileRequest,
  output: SaveBrowserSessionProfileResponse,
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
  operationName: "SaveBrowserSessionProfile",
}));

export type SearchRegistryRecordsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Searches for registry records using semantic, lexical, or hybrid queries. Returns metadata for matching records ordered by relevance within the specified registry.
 */
export const searchRegistryRecords: API.OperationMethod<
  SearchRegistryRecordsRequest,
  SearchRegistryRecordsResponse,
  SearchRegistryRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SearchRegistryRecordsRequest,
  output: SearchRegistryRecordsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchRegistryRecords",
}));

export type StartBatchEvaluationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Starts a batch evaluation job that evaluates agent performance across multiple sessions. Batch evaluations pull agent traces from CloudWatch Logs or an existing online evaluation configuration and run specified evaluators and insights against them.
 */
export const startBatchEvaluation: API.OperationMethod<
  StartBatchEvaluationRequest,
  StartBatchEvaluationResponse,
  StartBatchEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartBatchEvaluationRequest,
  output: StartBatchEvaluationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartBatchEvaluation",
}));

export type StartBrowserSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates and initializes a browser session in Amazon Bedrock AgentCore. The session enables agents to navigate and interact with web content, extract information from websites, and perform web-based tasks as part of their response generation.
 *
 * To create a session, you must specify a browser identifier and a name. You can also configure the viewport dimensions to control the visible area of web content. The session remains active until it times out or you explicitly stop it using the `StopBrowserSession` operation.
 *
 * The following operations are related to `StartBrowserSession`:
 *
 * - GetBrowserSession
 *
 * - UpdateBrowserStream
 *
 * - SaveBrowserSessionProfile
 *
 * - StopBrowserSession
 *
 * - InvokeBrowser
 */
export const startBrowserSession: API.OperationMethod<
  StartBrowserSessionRequest,
  StartBrowserSessionResponse,
  StartBrowserSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartBrowserSessionRequest,
  output: StartBrowserSessionResponse,
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
  operationName: "StartBrowserSession",
}));

export type StartCodeInterpreterSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates and initializes a code interpreter session in Amazon Bedrock AgentCore. The session enables agents to execute code as part of their response generation, supporting programming languages such as Python for data analysis, visualization, and computation tasks.
 *
 * To create a session, you must specify a code interpreter identifier and a name. The session remains active until it times out or you explicitly stop it using the `StopCodeInterpreterSession` operation.
 *
 * The following operations are related to `StartCodeInterpreterSession`:
 *
 * - InvokeCodeInterpreter
 *
 * - GetCodeInterpreterSession
 *
 * - StopCodeInterpreterSession
 */
export const startCodeInterpreterSession: API.OperationMethod<
  StartCodeInterpreterSessionRequest,
  StartCodeInterpreterSessionResponse,
  StartCodeInterpreterSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartCodeInterpreterSessionRequest,
  output: StartCodeInterpreterSessionResponse,
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
  operationName: "StartCodeInterpreterSession",
}));

export type StartMemoryExtractionJobError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Starts a memory extraction job that processes events that failed extraction previously in an AgentCore Memory resource and produces structured memory records. When earlier extraction attempts have left events unprocessed, this job will pick up and extract those as well.
 *
 * To use this operation, you must have the `bedrock-agentcore:StartMemoryExtractionJob` permission.
 */
export const startMemoryExtractionJob: API.OperationMethod<
  StartMemoryExtractionJobInput,
  StartMemoryExtractionJobOutput,
  StartMemoryExtractionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMemoryExtractionJobInput,
  output: StartMemoryExtractionJobOutput,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMemoryExtractionJob",
}));

export type StartRecommendationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a recommendation job that analyzes agent traces and generates optimization suggestions for system prompts or tool descriptions to improve agent performance.
 */
export const startRecommendation: API.OperationMethod<
  StartRecommendationRequest,
  StartRecommendationResponse,
  StartRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartRecommendationRequest,
  output: StartRecommendationResponse,
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
  operationName: "StartRecommendation",
}));

export type StopBatchEvaluationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Stops a running batch evaluation. Sessions that have already been evaluated retain their results.
 */
export const stopBatchEvaluation: API.OperationMethod<
  StopBatchEvaluationRequest,
  StopBatchEvaluationResponse,
  StopBatchEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopBatchEvaluationRequest,
  output: StopBatchEvaluationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopBatchEvaluation",
}));

export type StopBrowserSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Terminates an active browser session in Amazon Bedrock AgentCore. This operation stops the session, releases associated resources, and makes the session unavailable for further use.
 *
 * To stop a browser session, you must specify both the browser identifier and the session ID. Once stopped, a session cannot be restarted; you must create a new session using `StartBrowserSession`.
 *
 * The following operations are related to `StopBrowserSession`:
 *
 * - StartBrowserSession
 *
 * - GetBrowserSession
 */
export const stopBrowserSession: API.OperationMethod<
  StopBrowserSessionRequest,
  StopBrowserSessionResponse,
  StopBrowserSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopBrowserSessionRequest,
  output: StopBrowserSessionResponse,
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
  operationName: "StopBrowserSession",
}));

export type StopCodeInterpreterSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Terminates an active code interpreter session in Amazon Bedrock AgentCore. This operation stops the session, releases associated resources, and makes the session unavailable for further use.
 *
 * To stop a code interpreter session, you must specify both the code interpreter identifier and the session ID. Once stopped, a session cannot be restarted; you must create a new session using `StartCodeInterpreterSession`.
 *
 * The following operations are related to `StopCodeInterpreterSession`:
 *
 * - StartCodeInterpreterSession
 *
 * - GetCodeInterpreterSession
 */
export const stopCodeInterpreterSession: API.OperationMethod<
  StopCodeInterpreterSessionRequest,
  StopCodeInterpreterSessionResponse,
  StopCodeInterpreterSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopCodeInterpreterSessionRequest,
  output: StopCodeInterpreterSessionResponse,
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
  operationName: "StopCodeInterpreterSession",
}));

export type StopRuntimeSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | RetryableConflictException
  | RuntimeClientError
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Stops a session that is running in an running AgentCore Runtime agent.
 */
export const stopRuntimeSession: API.OperationMethod<
  StopRuntimeSessionRequest,
  StopRuntimeSessionResponse,
  StopRuntimeSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopRuntimeSessionRequest,
  output: StopRuntimeSessionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    RetryableConflictException,
    RuntimeClientError,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopRuntimeSession",
}));

export type UpdateABTestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates an A/B test's configuration, including variants, traffic allocation, evaluation settings, or execution status.
 */
export const updateABTest: API.OperationMethod<
  UpdateABTestRequest,
  UpdateABTestResponse,
  UpdateABTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateABTestRequest,
  output: UpdateABTestResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateABTest",
}));

export type UpdateBrowserStreamError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a browser stream. To use this operation, you must have permissions to perform the bedrock:UpdateBrowserStream action.
 */
export const updateBrowserStream: API.OperationMethod<
  UpdateBrowserStreamRequest,
  UpdateBrowserStreamResponse,
  UpdateBrowserStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBrowserStreamRequest,
  output: UpdateBrowserStreamResponse,
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
  operationName: "UpdateBrowserStream",
}));
