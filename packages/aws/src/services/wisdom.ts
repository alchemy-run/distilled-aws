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
  sdkId: "Wisdom",
  serviceShapeName: "WisdomService",
});
const auth = T.AwsAuthSigv4({ name: "wisdom" });
const ver = T.ServiceVersion("2020-10-19");
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
              `https://wisdom-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://wisdom-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://wisdom.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://wisdom.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class PreconditionFailedException
  extends /*@__PURE__*/ S.TaggedError<PreconditionFailedException>()(
    "PreconditionFailedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(412),
  ) {}
export class RequestTimeoutException
  extends /*@__PURE__*/ S.TaggedError<RequestTimeoutException>()(
    "RequestTimeoutException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(408), T.Retryable()),
  ).pipe(C.withTimeoutError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceName: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
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
export type ClientToken = string;
export type Name = string;
export type AssistantType = string;
export type Description = string;
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export type NonEmptyString = string;
export interface ServerSideEncryptionConfiguration {
  kmsKeyId?: string;
}
export const ServerSideEncryptionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ kmsKeyId: S.optional(S.String) }),
).annotate({
  identifier: "ServerSideEncryptionConfiguration",
}) as any as S.Schema<ServerSideEncryptionConfiguration>;
export interface CreateAssistantRequest {
  clientToken?: string;
  name: string;
  type: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  serverSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
}
export const CreateAssistantRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    name: S.String,
    type: S.String,
    description: S.optional(S.String),
    tags: S.optional(Tags),
    serverSideEncryptionConfiguration: S.optional(
      ServerSideEncryptionConfiguration,
    ),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/assistants" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAssistantRequest",
}) as any as S.Schema<CreateAssistantRequest>;
export type Uuid = string;
export type Arn = string;
export type AssistantStatus = string;
export type GenericArn = string;
export interface AssistantIntegrationConfiguration {
  topicIntegrationArn?: string;
}
export const AssistantIntegrationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ topicIntegrationArn: S.optional(S.String) }),
).annotate({
  identifier: "AssistantIntegrationConfiguration",
}) as any as S.Schema<AssistantIntegrationConfiguration>;
export interface AssistantData {
  assistantId: string;
  assistantArn: string;
  name: string;
  type: string;
  status: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  serverSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  integrationConfiguration?: AssistantIntegrationConfiguration;
}
export const AssistantData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assistantId: S.String,
    assistantArn: S.String,
    name: S.String,
    type: S.String,
    status: S.String,
    description: S.optional(S.String),
    tags: S.optional(Tags),
    serverSideEncryptionConfiguration: S.optional(
      ServerSideEncryptionConfiguration,
    ),
    integrationConfiguration: S.optional(AssistantIntegrationConfiguration),
  }),
).annotate({ identifier: "AssistantData" }) as any as S.Schema<AssistantData>;
export interface CreateAssistantResponse {
  assistant?: AssistantData;
}
export const CreateAssistantResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assistant: S.optional(AssistantData) }),
).annotate({
  identifier: "CreateAssistantResponse",
}) as any as S.Schema<CreateAssistantResponse>;
export type UuidOrArn = string;
export type AssociationType = string;
export type AssistantAssociationInputData = { knowledgeBaseId: string };
export const AssistantAssociationInputData = /*@__PURE__*/ S.Union([
  S.Struct({ knowledgeBaseId: S.String }),
]);
export interface CreateAssistantAssociationRequest {
  assistantId: string;
  associationType: string;
  association: AssistantAssociationInputData;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateAssistantAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assistantId: S.String.pipe(T.HttpLabel("assistantId")),
    associationType: S.String,
    association: AssistantAssociationInputData,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/assistants/{assistantId}/associations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAssistantAssociationRequest",
}) as any as S.Schema<CreateAssistantAssociationRequest>;
export interface KnowledgeBaseAssociationData {
  knowledgeBaseId?: string;
  knowledgeBaseArn?: string;
}
export const KnowledgeBaseAssociationData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    knowledgeBaseId: S.optional(S.String),
    knowledgeBaseArn: S.optional(S.String),
  }),
).annotate({
  identifier: "KnowledgeBaseAssociationData",
}) as any as S.Schema<KnowledgeBaseAssociationData>;
export type AssistantAssociationOutputData = {
  knowledgeBaseAssociation: KnowledgeBaseAssociationData;
};
export const AssistantAssociationOutputData = /*@__PURE__*/ S.Union([
  S.Struct({ knowledgeBaseAssociation: KnowledgeBaseAssociationData }),
]);
export interface AssistantAssociationData {
  assistantAssociationId: string;
  assistantAssociationArn: string;
  assistantId: string;
  assistantArn: string;
  associationType: string;
  associationData: AssistantAssociationOutputData;
  tags?: { [key: string]: string | undefined };
}
export const AssistantAssociationData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assistantAssociationId: S.String,
    assistantAssociationArn: S.String,
    assistantId: S.String,
    assistantArn: S.String,
    associationType: S.String,
    associationData: AssistantAssociationOutputData,
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "AssistantAssociationData",
}) as any as S.Schema<AssistantAssociationData>;
export interface CreateAssistantAssociationResponse {
  assistantAssociation?: AssistantAssociationData;
}
export const CreateAssistantAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assistantAssociation: S.optional(AssistantAssociationData) }),
).annotate({
  identifier: "CreateAssistantAssociationResponse",
}) as any as S.Schema<CreateAssistantAssociationResponse>;
export type ContentTitle = string;
export type Uri = string;
export type ContentMetadata = { [key: string]: string | undefined };
export const ContentMetadata = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type UploadId = string;
export interface CreateContentRequest {
  knowledgeBaseId: string;
  name: string;
  title?: string;
  overrideLinkOutUri?: string;
  metadata?: { [key: string]: string | undefined };
  uploadId: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateContentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
    name: S.String,
    title: S.optional(S.String),
    overrideLinkOutUri: S.optional(S.String),
    metadata: S.optional(ContentMetadata),
    uploadId: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/knowledgeBases/{knowledgeBaseId}/contents",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateContentRequest",
}) as any as S.Schema<CreateContentRequest>;
export type ContentType = string;
export type ContentStatus = string;
export type Url = string | redacted.Redacted<string>;
export interface ContentData {
  contentArn: string;
  contentId: string;
  knowledgeBaseArn: string;
  knowledgeBaseId: string;
  name: string;
  revisionId: string;
  title: string;
  contentType: string;
  status: string;
  metadata: { [key: string]: string | undefined };
  tags?: { [key: string]: string | undefined };
  linkOutUri?: string;
  url: string | redacted.Redacted<string>;
  urlExpiry: Date;
}
export const ContentData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contentArn: S.String,
    contentId: S.String,
    knowledgeBaseArn: S.String,
    knowledgeBaseId: S.String,
    name: S.String,
    revisionId: S.String,
    title: S.String,
    contentType: S.String,
    status: S.String,
    metadata: ContentMetadata,
    tags: S.optional(Tags),
    linkOutUri: S.optional(S.String),
    url: SensitiveString,
    urlExpiry: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "ContentData" }) as any as S.Schema<ContentData>;
export interface CreateContentResponse {
  content?: ContentData;
}
export const CreateContentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ content: S.optional(ContentData) }),
).annotate({
  identifier: "CreateContentResponse",
}) as any as S.Schema<CreateContentResponse>;
export type KnowledgeBaseType = string;
export type ObjectFieldsList = string[];
export const ObjectFieldsList = /*@__PURE__*/ S.Array(S.String);
export interface AppIntegrationsConfiguration {
  appIntegrationArn: string;
  objectFields?: string[];
}
export const AppIntegrationsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appIntegrationArn: S.String,
    objectFields: S.optional(ObjectFieldsList),
  }),
).annotate({
  identifier: "AppIntegrationsConfiguration",
}) as any as S.Schema<AppIntegrationsConfiguration>;
export type SourceConfiguration = {
  appIntegrations: AppIntegrationsConfiguration;
};
export const SourceConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ appIntegrations: AppIntegrationsConfiguration }),
]);
export interface RenderingConfiguration {
  templateUri?: string;
}
export const RenderingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ templateUri: S.optional(S.String) }),
).annotate({
  identifier: "RenderingConfiguration",
}) as any as S.Schema<RenderingConfiguration>;
export interface CreateKnowledgeBaseRequest {
  clientToken?: string;
  name: string;
  knowledgeBaseType: string;
  sourceConfiguration?: SourceConfiguration;
  renderingConfiguration?: RenderingConfiguration;
  serverSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateKnowledgeBaseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    name: S.String,
    knowledgeBaseType: S.String,
    sourceConfiguration: S.optional(SourceConfiguration),
    renderingConfiguration: S.optional(RenderingConfiguration),
    serverSideEncryptionConfiguration: S.optional(
      ServerSideEncryptionConfiguration,
    ),
    description: S.optional(S.String),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/knowledgeBases" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateKnowledgeBaseRequest",
}) as any as S.Schema<CreateKnowledgeBaseRequest>;
export type KnowledgeBaseStatus = string;
export interface KnowledgeBaseData {
  knowledgeBaseId: string;
  knowledgeBaseArn: string;
  name: string;
  knowledgeBaseType: string;
  status: string;
  lastContentModificationTime?: Date;
  sourceConfiguration?: SourceConfiguration;
  renderingConfiguration?: RenderingConfiguration;
  serverSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export const KnowledgeBaseData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    knowledgeBaseId: S.String,
    knowledgeBaseArn: S.String,
    name: S.String,
    knowledgeBaseType: S.String,
    status: S.String,
    lastContentModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    sourceConfiguration: S.optional(SourceConfiguration),
    renderingConfiguration: S.optional(RenderingConfiguration),
    serverSideEncryptionConfiguration: S.optional(
      ServerSideEncryptionConfiguration,
    ),
    description: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "KnowledgeBaseData",
}) as any as S.Schema<KnowledgeBaseData>;
export interface CreateKnowledgeBaseResponse {
  knowledgeBase?: KnowledgeBaseData;
}
export const CreateKnowledgeBaseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ knowledgeBase: S.optional(KnowledgeBaseData) }),
).annotate({
  identifier: "CreateKnowledgeBaseResponse",
}) as any as S.Schema<CreateKnowledgeBaseResponse>;
export type QuickResponseName = string;
export type QuickResponseContent = string | redacted.Redacted<string>;
export type QuickResponseDataProvider = {
  content: string | redacted.Redacted<string>;
};
export const QuickResponseDataProvider = /*@__PURE__*/ S.Union([
  S.Struct({ content: SensitiveString }),
]);
export type QuickResponseType = string;
export type GroupingCriteria = string | redacted.Redacted<string>;
export type GroupingValue = string | redacted.Redacted<string>;
export type GroupingValues = (string | redacted.Redacted<string>)[];
export const GroupingValues = /*@__PURE__*/ S.Array(SensitiveString);
export interface GroupingConfiguration {
  criteria?: string | redacted.Redacted<string>;
  values?: (string | redacted.Redacted<string>)[];
}
export const GroupingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    criteria: S.optional(SensitiveString),
    values: S.optional(GroupingValues),
  }),
).annotate({
  identifier: "GroupingConfiguration",
}) as any as S.Schema<GroupingConfiguration>;
export type QuickResponseDescription = string;
export type ShortCutKey = string;
export type Channel = string | redacted.Redacted<string>;
export type Channels = (string | redacted.Redacted<string>)[];
export const Channels = /*@__PURE__*/ S.Array(SensitiveString);
export type LanguageCode = string;
export interface CreateQuickResponseRequest {
  knowledgeBaseId: string;
  name: string;
  content: QuickResponseDataProvider;
  contentType?: string;
  groupingConfiguration?: GroupingConfiguration;
  description?: string;
  shortcutKey?: string;
  isActive?: boolean;
  channels?: (string | redacted.Redacted<string>)[];
  language?: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateQuickResponseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
    name: S.String,
    content: QuickResponseDataProvider,
    contentType: S.optional(S.String),
    groupingConfiguration: S.optional(GroupingConfiguration),
    description: S.optional(S.String),
    shortcutKey: S.optional(S.String),
    isActive: S.optional(S.Boolean),
    channels: S.optional(Channels),
    language: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/knowledgeBases/{knowledgeBaseId}/quickResponses",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateQuickResponseRequest",
}) as any as S.Schema<CreateQuickResponseRequest>;
export type QuickResponseStatus = string;
export type QuickResponseContentProvider = {
  content: string | redacted.Redacted<string>;
};
export const QuickResponseContentProvider = /*@__PURE__*/ S.Union([
  S.Struct({ content: SensitiveString }),
]);
export interface QuickResponseContents {
  plainText?: QuickResponseContentProvider;
  markdown?: QuickResponseContentProvider;
}
export const QuickResponseContents = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    plainText: S.optional(QuickResponseContentProvider),
    markdown: S.optional(QuickResponseContentProvider),
  }),
).annotate({
  identifier: "QuickResponseContents",
}) as any as S.Schema<QuickResponseContents>;
export interface QuickResponseData {
  quickResponseArn: string;
  quickResponseId: string;
  knowledgeBaseArn: string;
  knowledgeBaseId: string;
  name: string;
  contentType: string;
  status: string;
  createdTime: Date;
  lastModifiedTime: Date;
  contents?: QuickResponseContents;
  description?: string;
  groupingConfiguration?: GroupingConfiguration;
  shortcutKey?: string;
  lastModifiedBy?: string;
  isActive?: boolean;
  channels?: (string | redacted.Redacted<string>)[];
  language?: string;
  tags?: { [key: string]: string | undefined };
}
export const QuickResponseData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    quickResponseArn: S.String,
    quickResponseId: S.String,
    knowledgeBaseArn: S.String,
    knowledgeBaseId: S.String,
    name: S.String,
    contentType: S.String,
    status: S.String,
    createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    contents: S.optional(QuickResponseContents),
    description: S.optional(S.String),
    groupingConfiguration: S.optional(GroupingConfiguration),
    shortcutKey: S.optional(S.String),
    lastModifiedBy: S.optional(S.String),
    isActive: S.optional(S.Boolean),
    channels: S.optional(Channels),
    language: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "QuickResponseData",
}) as any as S.Schema<QuickResponseData>;
export interface CreateQuickResponseResponse {
  quickResponse?: QuickResponseData;
}
export const CreateQuickResponseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ quickResponse: S.optional(QuickResponseData) }),
).annotate({
  identifier: "CreateQuickResponseResponse",
}) as any as S.Schema<CreateQuickResponseResponse>;
export interface CreateSessionRequest {
  clientToken?: string;
  assistantId: string;
  name: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    assistantId: S.String.pipe(T.HttpLabel("assistantId")),
    name: S.String,
    description: S.optional(S.String),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/assistants/{assistantId}/sessions" }),
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
export interface SessionIntegrationConfiguration {
  topicIntegrationArn?: string;
}
export const SessionIntegrationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ topicIntegrationArn: S.optional(S.String) }),
).annotate({
  identifier: "SessionIntegrationConfiguration",
}) as any as S.Schema<SessionIntegrationConfiguration>;
export interface SessionData {
  sessionArn: string;
  sessionId: string;
  name: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  integrationConfiguration?: SessionIntegrationConfiguration;
}
export const SessionData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionArn: S.String,
    sessionId: S.String,
    name: S.String,
    description: S.optional(S.String),
    tags: S.optional(Tags),
    integrationConfiguration: S.optional(SessionIntegrationConfiguration),
  }),
).annotate({ identifier: "SessionData" }) as any as S.Schema<SessionData>;
export interface CreateSessionResponse {
  session?: SessionData;
}
export const CreateSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ session: S.optional(SessionData) }),
).annotate({
  identifier: "CreateSessionResponse",
}) as any as S.Schema<CreateSessionResponse>;
export interface DeleteAssistantRequest {
  assistantId: string;
}
export const DeleteAssistantRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assistantId: S.String.pipe(T.HttpLabel("assistantId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/assistants/{assistantId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAssistantRequest",
}) as any as S.Schema<DeleteAssistantRequest>;
export interface DeleteAssistantResponse {}
export const DeleteAssistantResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAssistantResponse",
}) as any as S.Schema<DeleteAssistantResponse>;
export interface DeleteAssistantAssociationRequest {
  assistantAssociationId: string;
  assistantId: string;
}
export const DeleteAssistantAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assistantAssociationId: S.String.pipe(
      T.HttpLabel("assistantAssociationId"),
    ),
    assistantId: S.String.pipe(T.HttpLabel("assistantId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/assistants/{assistantId}/associations/{assistantAssociationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAssistantAssociationRequest",
}) as any as S.Schema<DeleteAssistantAssociationRequest>;
export interface DeleteAssistantAssociationResponse {}
export const DeleteAssistantAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAssistantAssociationResponse",
}) as any as S.Schema<DeleteAssistantAssociationResponse>;
export interface DeleteContentRequest {
  knowledgeBaseId: string;
  contentId: string;
}
export const DeleteContentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
    contentId: S.String.pipe(T.HttpLabel("contentId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/knowledgeBases/{knowledgeBaseId}/contents/{contentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteContentRequest",
}) as any as S.Schema<DeleteContentRequest>;
export interface DeleteContentResponse {}
export const DeleteContentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteContentResponse",
}) as any as S.Schema<DeleteContentResponse>;
export interface DeleteImportJobRequest {
  knowledgeBaseId: string;
  importJobId: string;
}
export const DeleteImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
    importJobId: S.String.pipe(T.HttpLabel("importJobId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/knowledgeBases/{knowledgeBaseId}/importJobs/{importJobId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteImportJobRequest",
}) as any as S.Schema<DeleteImportJobRequest>;
export interface DeleteImportJobResponse {}
export const DeleteImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteImportJobResponse",
}) as any as S.Schema<DeleteImportJobResponse>;
export interface DeleteKnowledgeBaseRequest {
  knowledgeBaseId: string;
}
export const DeleteKnowledgeBaseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/knowledgeBases/{knowledgeBaseId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteKnowledgeBaseRequest",
}) as any as S.Schema<DeleteKnowledgeBaseRequest>;
export interface DeleteKnowledgeBaseResponse {}
export const DeleteKnowledgeBaseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteKnowledgeBaseResponse",
}) as any as S.Schema<DeleteKnowledgeBaseResponse>;
export interface DeleteQuickResponseRequest {
  knowledgeBaseId: string;
  quickResponseId: string;
}
export const DeleteQuickResponseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
    quickResponseId: S.String.pipe(T.HttpLabel("quickResponseId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/knowledgeBases/{knowledgeBaseId}/quickResponses/{quickResponseId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteQuickResponseRequest",
}) as any as S.Schema<DeleteQuickResponseRequest>;
export interface DeleteQuickResponseResponse {}
export const DeleteQuickResponseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteQuickResponseResponse",
}) as any as S.Schema<DeleteQuickResponseResponse>;
export interface GetAssistantRequest {
  assistantId: string;
}
export const GetAssistantRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assistantId: S.String.pipe(T.HttpLabel("assistantId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/assistants/{assistantId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAssistantRequest",
}) as any as S.Schema<GetAssistantRequest>;
export interface GetAssistantResponse {
  assistant?: AssistantData;
}
export const GetAssistantResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assistant: S.optional(AssistantData) }),
).annotate({
  identifier: "GetAssistantResponse",
}) as any as S.Schema<GetAssistantResponse>;
export interface GetAssistantAssociationRequest {
  assistantAssociationId: string;
  assistantId: string;
}
export const GetAssistantAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assistantAssociationId: S.String.pipe(
      T.HttpLabel("assistantAssociationId"),
    ),
    assistantId: S.String.pipe(T.HttpLabel("assistantId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/assistants/{assistantId}/associations/{assistantAssociationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAssistantAssociationRequest",
}) as any as S.Schema<GetAssistantAssociationRequest>;
export interface GetAssistantAssociationResponse {
  assistantAssociation?: AssistantAssociationData;
}
export const GetAssistantAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assistantAssociation: S.optional(AssistantAssociationData) }),
).annotate({
  identifier: "GetAssistantAssociationResponse",
}) as any as S.Schema<GetAssistantAssociationResponse>;
export interface GetContentRequest {
  contentId: string;
  knowledgeBaseId: string;
}
export const GetContentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contentId: S.String.pipe(T.HttpLabel("contentId")),
    knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/knowledgeBases/{knowledgeBaseId}/contents/{contentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetContentRequest",
}) as any as S.Schema<GetContentRequest>;
export interface GetContentResponse {
  content?: ContentData;
}
export const GetContentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ content: S.optional(ContentData) }),
).annotate({
  identifier: "GetContentResponse",
}) as any as S.Schema<GetContentResponse>;
export interface GetContentSummaryRequest {
  contentId: string;
  knowledgeBaseId: string;
}
export const GetContentSummaryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contentId: S.String.pipe(T.HttpLabel("contentId")),
    knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/knowledgeBases/{knowledgeBaseId}/contents/{contentId}/summary",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetContentSummaryRequest",
}) as any as S.Schema<GetContentSummaryRequest>;
export interface ContentSummary {
  contentArn: string;
  contentId: string;
  knowledgeBaseArn: string;
  knowledgeBaseId: string;
  name: string;
  revisionId: string;
  title: string;
  contentType: string;
  status: string;
  metadata: { [key: string]: string | undefined };
  tags?: { [key: string]: string | undefined };
}
export const ContentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contentArn: S.String,
    contentId: S.String,
    knowledgeBaseArn: S.String,
    knowledgeBaseId: S.String,
    name: S.String,
    revisionId: S.String,
    title: S.String,
    contentType: S.String,
    status: S.String,
    metadata: ContentMetadata,
    tags: S.optional(Tags),
  }),
).annotate({ identifier: "ContentSummary" }) as any as S.Schema<ContentSummary>;
export interface GetContentSummaryResponse {
  contentSummary?: ContentSummary;
}
export const GetContentSummaryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ contentSummary: S.optional(ContentSummary) }),
).annotate({
  identifier: "GetContentSummaryResponse",
}) as any as S.Schema<GetContentSummaryResponse>;
export interface GetImportJobRequest {
  importJobId: string;
  knowledgeBaseId: string;
}
export const GetImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    importJobId: S.String.pipe(T.HttpLabel("importJobId")),
    knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/knowledgeBases/{knowledgeBaseId}/importJobs/{importJobId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetImportJobRequest",
}) as any as S.Schema<GetImportJobRequest>;
export type ImportJobType = string;
export type ImportJobStatus = string;
export type ExternalSource = string;
export interface ConnectConfiguration {
  instanceId?: string;
}
export const ConnectConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instanceId: S.optional(S.String) }),
).annotate({
  identifier: "ConnectConfiguration",
}) as any as S.Schema<ConnectConfiguration>;
export type Configuration = { connectConfiguration: ConnectConfiguration };
export const Configuration = /*@__PURE__*/ S.Union([
  S.Struct({ connectConfiguration: ConnectConfiguration }),
]);
export interface ExternalSourceConfiguration {
  source: string;
  configuration: Configuration;
}
export const ExternalSourceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ source: S.String, configuration: Configuration }),
).annotate({
  identifier: "ExternalSourceConfiguration",
}) as any as S.Schema<ExternalSourceConfiguration>;
export interface ImportJobData {
  importJobId: string;
  knowledgeBaseId: string;
  uploadId: string;
  knowledgeBaseArn: string;
  importJobType: string;
  status: string;
  url: string | redacted.Redacted<string>;
  failedRecordReport?: string | redacted.Redacted<string>;
  urlExpiry: Date;
  createdTime: Date;
  lastModifiedTime: Date;
  metadata?: { [key: string]: string | undefined };
  externalSourceConfiguration?: ExternalSourceConfiguration;
}
export const ImportJobData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    importJobId: S.String,
    knowledgeBaseId: S.String,
    uploadId: S.String,
    knowledgeBaseArn: S.String,
    importJobType: S.String,
    status: S.String,
    url: SensitiveString,
    failedRecordReport: S.optional(SensitiveString),
    urlExpiry: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    metadata: S.optional(ContentMetadata),
    externalSourceConfiguration: S.optional(ExternalSourceConfiguration),
  }),
).annotate({ identifier: "ImportJobData" }) as any as S.Schema<ImportJobData>;
export interface GetImportJobResponse {
  importJob?: ImportJobData;
}
export const GetImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ importJob: S.optional(ImportJobData) }),
).annotate({
  identifier: "GetImportJobResponse",
}) as any as S.Schema<GetImportJobResponse>;
export interface GetKnowledgeBaseRequest {
  knowledgeBaseId: string;
}
export const GetKnowledgeBaseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/knowledgeBases/{knowledgeBaseId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetKnowledgeBaseRequest",
}) as any as S.Schema<GetKnowledgeBaseRequest>;
export interface GetKnowledgeBaseResponse {
  knowledgeBase?: KnowledgeBaseData;
}
export const GetKnowledgeBaseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ knowledgeBase: S.optional(KnowledgeBaseData) }),
).annotate({
  identifier: "GetKnowledgeBaseResponse",
}) as any as S.Schema<GetKnowledgeBaseResponse>;
export interface GetQuickResponseRequest {
  quickResponseId: string;
  knowledgeBaseId: string;
}
export const GetQuickResponseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    quickResponseId: S.String.pipe(T.HttpLabel("quickResponseId")),
    knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/knowledgeBases/{knowledgeBaseId}/quickResponses/{quickResponseId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetQuickResponseRequest",
}) as any as S.Schema<GetQuickResponseRequest>;
export interface GetQuickResponseResponse {
  quickResponse?: QuickResponseData;
}
export const GetQuickResponseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ quickResponse: S.optional(QuickResponseData) }),
).annotate({
  identifier: "GetQuickResponseResponse",
}) as any as S.Schema<GetQuickResponseResponse>;
export type MaxResults = number;
export type WaitTimeSeconds = number;
export interface GetRecommendationsRequest {
  assistantId: string;
  sessionId: string;
  maxResults?: number;
  waitTimeSeconds?: number;
}
export const GetRecommendationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assistantId: S.String.pipe(T.HttpLabel("assistantId")),
    sessionId: S.String.pipe(T.HttpLabel("sessionId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    waitTimeSeconds: S.optional(S.Number).pipe(T.HttpQuery("waitTimeSeconds")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/assistants/{assistantId}/sessions/{sessionId}/recommendations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRecommendationsRequest",
}) as any as S.Schema<GetRecommendationsRequest>;
export interface ContentReference {
  knowledgeBaseArn?: string;
  knowledgeBaseId?: string;
  contentArn?: string;
  contentId?: string;
}
export const ContentReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    knowledgeBaseArn: S.optional(S.String),
    knowledgeBaseId: S.optional(S.String),
    contentArn: S.optional(S.String),
    contentId: S.optional(S.String),
  }),
).annotate({
  identifier: "ContentReference",
}) as any as S.Schema<ContentReference>;
export type SensitiveString = string | redacted.Redacted<string>;
export type HighlightOffset = number;
export interface Highlight {
  beginOffsetInclusive?: number;
  endOffsetExclusive?: number;
}
export const Highlight = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    beginOffsetInclusive: S.optional(S.Number),
    endOffsetExclusive: S.optional(S.Number),
  }),
).annotate({ identifier: "Highlight" }) as any as S.Schema<Highlight>;
export type Highlights = Highlight[];
export const Highlights = /*@__PURE__*/ S.Array(Highlight);
export interface DocumentText {
  text?: string | redacted.Redacted<string>;
  highlights?: Highlight[];
}
export const DocumentText = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    text: S.optional(SensitiveString),
    highlights: S.optional(Highlights),
  }),
).annotate({ identifier: "DocumentText" }) as any as S.Schema<DocumentText>;
export interface Document {
  contentReference: ContentReference;
  title?: DocumentText;
  excerpt?: DocumentText;
}
export const Document = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contentReference: ContentReference,
    title: S.optional(DocumentText),
    excerpt: S.optional(DocumentText),
  }),
).annotate({ identifier: "Document" }) as any as S.Schema<Document>;
export type RelevanceScore = number;
export type RelevanceLevel = string;
export type RecommendationType = string;
export interface RecommendationData {
  recommendationId: string;
  document: Document;
  relevanceScore?: number;
  relevanceLevel?: string;
  type?: string;
}
export const RecommendationData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendationId: S.String,
    document: Document,
    relevanceScore: S.optional(S.Number),
    relevanceLevel: S.optional(S.String),
    type: S.optional(S.String),
  }),
).annotate({
  identifier: "RecommendationData",
}) as any as S.Schema<RecommendationData>;
export type RecommendationList = RecommendationData[];
export const RecommendationList = /*@__PURE__*/ S.Array(RecommendationData);
export type RecommendationTriggerType = string;
export type RecommendationSourceType = string;
export type QueryText = string | redacted.Redacted<string>;
export interface QueryRecommendationTriggerData {
  text?: string | redacted.Redacted<string>;
}
export const QueryRecommendationTriggerData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ text: S.optional(SensitiveString) }),
).annotate({
  identifier: "QueryRecommendationTriggerData",
}) as any as S.Schema<QueryRecommendationTriggerData>;
export type RecommendationTriggerData = {
  query: QueryRecommendationTriggerData;
};
export const RecommendationTriggerData = /*@__PURE__*/ S.Union([
  S.Struct({ query: QueryRecommendationTriggerData }),
]);
export type RecommendationIdList = string[];
export const RecommendationIdList = /*@__PURE__*/ S.Array(S.String);
export interface RecommendationTrigger {
  id: string;
  type: string;
  source: string;
  data: RecommendationTriggerData;
  recommendationIds: string[];
}
export const RecommendationTrigger = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    type: S.String,
    source: S.String,
    data: RecommendationTriggerData,
    recommendationIds: RecommendationIdList,
  }),
).annotate({
  identifier: "RecommendationTrigger",
}) as any as S.Schema<RecommendationTrigger>;
export type RecommendationTriggerList = RecommendationTrigger[];
export const RecommendationTriggerList = /*@__PURE__*/ S.Array(
  RecommendationTrigger,
);
export interface GetRecommendationsResponse {
  recommendations: RecommendationData[];
  triggers?: RecommendationTrigger[];
}
export const GetRecommendationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendations: RecommendationList,
    triggers: S.optional(RecommendationTriggerList),
  }),
).annotate({
  identifier: "GetRecommendationsResponse",
}) as any as S.Schema<GetRecommendationsResponse>;
export interface GetSessionRequest {
  assistantId: string;
  sessionId: string;
}
export const GetSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assistantId: S.String.pipe(T.HttpLabel("assistantId")),
    sessionId: S.String.pipe(T.HttpLabel("sessionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/assistants/{assistantId}/sessions/{sessionId}",
      }),
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
  session?: SessionData;
}
export const GetSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ session: S.optional(SessionData) }),
).annotate({
  identifier: "GetSessionResponse",
}) as any as S.Schema<GetSessionResponse>;
export type NextToken = string;
export interface ListAssistantAssociationsRequest {
  nextToken?: string;
  maxResults?: number;
  assistantId: string;
}
export const ListAssistantAssociationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    assistantId: S.String.pipe(T.HttpLabel("assistantId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/assistants/{assistantId}/associations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssistantAssociationsRequest",
}) as any as S.Schema<ListAssistantAssociationsRequest>;
export interface AssistantAssociationSummary {
  assistantAssociationId: string;
  assistantAssociationArn: string;
  assistantId: string;
  assistantArn: string;
  associationType: string;
  associationData: AssistantAssociationOutputData;
  tags?: { [key: string]: string | undefined };
}
export const AssistantAssociationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assistantAssociationId: S.String,
    assistantAssociationArn: S.String,
    assistantId: S.String,
    assistantArn: S.String,
    associationType: S.String,
    associationData: AssistantAssociationOutputData,
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "AssistantAssociationSummary",
}) as any as S.Schema<AssistantAssociationSummary>;
export type AssistantAssociationSummaryList = AssistantAssociationSummary[];
export const AssistantAssociationSummaryList = /*@__PURE__*/ S.Array(
  AssistantAssociationSummary,
);
export interface ListAssistantAssociationsResponse {
  assistantAssociationSummaries: AssistantAssociationSummary[];
  nextToken?: string;
}
export const ListAssistantAssociationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assistantAssociationSummaries: AssistantAssociationSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAssistantAssociationsResponse",
}) as any as S.Schema<ListAssistantAssociationsResponse>;
export interface ListAssistantsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListAssistantsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/assistants" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssistantsRequest",
}) as any as S.Schema<ListAssistantsRequest>;
export interface AssistantSummary {
  assistantId: string;
  assistantArn: string;
  name: string;
  type: string;
  status: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  serverSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  integrationConfiguration?: AssistantIntegrationConfiguration;
}
export const AssistantSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assistantId: S.String,
    assistantArn: S.String,
    name: S.String,
    type: S.String,
    status: S.String,
    description: S.optional(S.String),
    tags: S.optional(Tags),
    serverSideEncryptionConfiguration: S.optional(
      ServerSideEncryptionConfiguration,
    ),
    integrationConfiguration: S.optional(AssistantIntegrationConfiguration),
  }),
).annotate({
  identifier: "AssistantSummary",
}) as any as S.Schema<AssistantSummary>;
export type AssistantList = AssistantSummary[];
export const AssistantList = /*@__PURE__*/ S.Array(AssistantSummary);
export interface ListAssistantsResponse {
  assistantSummaries: AssistantSummary[];
  nextToken?: string;
}
export const ListAssistantsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assistantSummaries: AssistantList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAssistantsResponse",
}) as any as S.Schema<ListAssistantsResponse>;
export interface ListContentsRequest {
  nextToken?: string;
  maxResults?: number;
  knowledgeBaseId: string;
}
export const ListContentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/knowledgeBases/{knowledgeBaseId}/contents",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListContentsRequest",
}) as any as S.Schema<ListContentsRequest>;
export type ContentSummaryList = ContentSummary[];
export const ContentSummaryList = /*@__PURE__*/ S.Array(ContentSummary);
export interface ListContentsResponse {
  contentSummaries: ContentSummary[];
  nextToken?: string;
}
export const ListContentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contentSummaries: ContentSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListContentsResponse",
}) as any as S.Schema<ListContentsResponse>;
export interface ListImportJobsRequest {
  nextToken?: string;
  maxResults?: number;
  knowledgeBaseId: string;
}
export const ListImportJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/knowledgeBases/{knowledgeBaseId}/importJobs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListImportJobsRequest",
}) as any as S.Schema<ListImportJobsRequest>;
export interface ImportJobSummary {
  importJobId: string;
  knowledgeBaseId: string;
  uploadId: string;
  knowledgeBaseArn: string;
  importJobType: string;
  status: string;
  createdTime: Date;
  lastModifiedTime: Date;
  metadata?: { [key: string]: string | undefined };
  externalSourceConfiguration?: ExternalSourceConfiguration;
}
export const ImportJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    importJobId: S.String,
    knowledgeBaseId: S.String,
    uploadId: S.String,
    knowledgeBaseArn: S.String,
    importJobType: S.String,
    status: S.String,
    createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    metadata: S.optional(ContentMetadata),
    externalSourceConfiguration: S.optional(ExternalSourceConfiguration),
  }),
).annotate({
  identifier: "ImportJobSummary",
}) as any as S.Schema<ImportJobSummary>;
export type ImportJobList = ImportJobSummary[];
export const ImportJobList = /*@__PURE__*/ S.Array(ImportJobSummary);
export interface ListImportJobsResponse {
  importJobSummaries: ImportJobSummary[];
  nextToken?: string;
}
export const ListImportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    importJobSummaries: ImportJobList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListImportJobsResponse",
}) as any as S.Schema<ListImportJobsResponse>;
export interface ListKnowledgeBasesRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListKnowledgeBasesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/knowledgeBases" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListKnowledgeBasesRequest",
}) as any as S.Schema<ListKnowledgeBasesRequest>;
export interface KnowledgeBaseSummary {
  knowledgeBaseId: string;
  knowledgeBaseArn: string;
  name: string;
  knowledgeBaseType: string;
  status: string;
  sourceConfiguration?: SourceConfiguration;
  renderingConfiguration?: RenderingConfiguration;
  serverSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export const KnowledgeBaseSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    knowledgeBaseId: S.String,
    knowledgeBaseArn: S.String,
    name: S.String,
    knowledgeBaseType: S.String,
    status: S.String,
    sourceConfiguration: S.optional(SourceConfiguration),
    renderingConfiguration: S.optional(RenderingConfiguration),
    serverSideEncryptionConfiguration: S.optional(
      ServerSideEncryptionConfiguration,
    ),
    description: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "KnowledgeBaseSummary",
}) as any as S.Schema<KnowledgeBaseSummary>;
export type KnowledgeBaseList = KnowledgeBaseSummary[];
export const KnowledgeBaseList = /*@__PURE__*/ S.Array(KnowledgeBaseSummary);
export interface ListKnowledgeBasesResponse {
  knowledgeBaseSummaries: KnowledgeBaseSummary[];
  nextToken?: string;
}
export const ListKnowledgeBasesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    knowledgeBaseSummaries: KnowledgeBaseList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListKnowledgeBasesResponse",
}) as any as S.Schema<ListKnowledgeBasesResponse>;
export interface ListQuickResponsesRequest {
  nextToken?: string;
  maxResults?: number;
  knowledgeBaseId: string;
}
export const ListQuickResponsesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/knowledgeBases/{knowledgeBaseId}/quickResponses",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListQuickResponsesRequest",
}) as any as S.Schema<ListQuickResponsesRequest>;
export interface QuickResponseSummary {
  quickResponseArn: string;
  quickResponseId: string;
  knowledgeBaseArn: string;
  knowledgeBaseId: string;
  name: string;
  contentType: string;
  status: string;
  createdTime: Date;
  lastModifiedTime: Date;
  description?: string;
  lastModifiedBy?: string;
  isActive?: boolean;
  channels?: (string | redacted.Redacted<string>)[];
  tags?: { [key: string]: string | undefined };
}
export const QuickResponseSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    quickResponseArn: S.String,
    quickResponseId: S.String,
    knowledgeBaseArn: S.String,
    knowledgeBaseId: S.String,
    name: S.String,
    contentType: S.String,
    status: S.String,
    createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    description: S.optional(S.String),
    lastModifiedBy: S.optional(S.String),
    isActive: S.optional(S.Boolean),
    channels: S.optional(Channels),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "QuickResponseSummary",
}) as any as S.Schema<QuickResponseSummary>;
export type QuickResponseSummaryList = QuickResponseSummary[];
export const QuickResponseSummaryList =
  /*@__PURE__*/ S.Array(QuickResponseSummary);
export interface ListQuickResponsesResponse {
  quickResponseSummaries: QuickResponseSummary[];
  nextToken?: string;
}
export const ListQuickResponsesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    quickResponseSummaries: QuickResponseSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListQuickResponsesResponse",
}) as any as S.Schema<ListQuickResponsesResponse>;
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
  S.Struct({ tags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface NotifyRecommendationsReceivedRequest {
  assistantId: string;
  sessionId: string;
  recommendationIds: string[];
}
export const NotifyRecommendationsReceivedRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      assistantId: S.String.pipe(T.HttpLabel("assistantId")),
      sessionId: S.String.pipe(T.HttpLabel("sessionId")),
      recommendationIds: RecommendationIdList,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/assistants/{assistantId}/sessions/{sessionId}/recommendations/notify",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "NotifyRecommendationsReceivedRequest",
}) as any as S.Schema<NotifyRecommendationsReceivedRequest>;
export type NotifyRecommendationsReceivedErrorMessage = string;
export interface NotifyRecommendationsReceivedError_ {
  recommendationId?: string;
  message?: string;
}
export const NotifyRecommendationsReceivedError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendationId: S.optional(S.String),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "NotifyRecommendationsReceivedError",
}) as any as S.Schema<NotifyRecommendationsReceivedError_>;
export type NotifyRecommendationsReceivedErrorList =
  NotifyRecommendationsReceivedError_[];
export const NotifyRecommendationsReceivedErrorList = /*@__PURE__*/ S.Array(
  NotifyRecommendationsReceivedError_,
);
export interface NotifyRecommendationsReceivedResponse {
  recommendationIds?: string[];
  errors?: NotifyRecommendationsReceivedError_[];
}
export const NotifyRecommendationsReceivedResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      recommendationIds: S.optional(RecommendationIdList),
      errors: S.optional(NotifyRecommendationsReceivedErrorList),
    }),
).annotate({
  identifier: "NotifyRecommendationsReceivedResponse",
}) as any as S.Schema<NotifyRecommendationsReceivedResponse>;
export interface QueryAssistantRequest {
  assistantId: string;
  queryText: string | redacted.Redacted<string>;
  nextToken?: string;
  maxResults?: number;
}
export const QueryAssistantRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assistantId: S.String.pipe(T.HttpLabel("assistantId")),
    queryText: SensitiveString,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/assistants/{assistantId}/query" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "QueryAssistantRequest",
}) as any as S.Schema<QueryAssistantRequest>;
export interface ResultData {
  resultId: string;
  document: Document;
  relevanceScore?: number;
}
export const ResultData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resultId: S.String,
    document: Document,
    relevanceScore: S.optional(S.Number),
  }),
).annotate({ identifier: "ResultData" }) as any as S.Schema<ResultData>;
export type QueryResultsList = ResultData[];
export const QueryResultsList = /*@__PURE__*/ S.Array(ResultData);
export interface QueryAssistantResponse {
  results: ResultData[];
  nextToken?: string;
}
export const QueryAssistantResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ results: QueryResultsList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "QueryAssistantResponse",
}) as any as S.Schema<QueryAssistantResponse>;
export interface RemoveKnowledgeBaseTemplateUriRequest {
  knowledgeBaseId: string;
}
export const RemoveKnowledgeBaseTemplateUriRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/knowledgeBases/{knowledgeBaseId}/templateUri",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "RemoveKnowledgeBaseTemplateUriRequest",
}) as any as S.Schema<RemoveKnowledgeBaseTemplateUriRequest>;
export interface RemoveKnowledgeBaseTemplateUriResponse {}
export const RemoveKnowledgeBaseTemplateUriResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "RemoveKnowledgeBaseTemplateUriResponse",
}) as any as S.Schema<RemoveKnowledgeBaseTemplateUriResponse>;
export type FilterField = string;
export type FilterOperator = string;
export interface Filter {
  field: string;
  operator: string;
  value: string;
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ field: S.String, operator: S.String, value: S.String }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type FilterList = Filter[];
export const FilterList = /*@__PURE__*/ S.Array(Filter);
export interface SearchExpression {
  filters: Filter[];
}
export const SearchExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ filters: FilterList }),
).annotate({
  identifier: "SearchExpression",
}) as any as S.Schema<SearchExpression>;
export interface SearchContentRequest {
  nextToken?: string;
  maxResults?: number;
  knowledgeBaseId: string;
  searchExpression: SearchExpression;
}
export const SearchContentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
    searchExpression: SearchExpression,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/knowledgeBases/{knowledgeBaseId}/search",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchContentRequest",
}) as any as S.Schema<SearchContentRequest>;
export interface SearchContentResponse {
  contentSummaries: ContentSummary[];
  nextToken?: string;
}
export const SearchContentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contentSummaries: ContentSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchContentResponse",
}) as any as S.Schema<SearchContentResponse>;
export type QuickResponseQueryValue = string;
export type QuickResponseQueryValueList = string[];
export const QuickResponseQueryValueList = /*@__PURE__*/ S.Array(S.String);
export type QuickResponseQueryOperator = string;
export type Priority = string;
export interface QuickResponseQueryField {
  name: string;
  values: string[];
  operator: string;
  allowFuzziness?: boolean;
  priority?: string;
}
export const QuickResponseQueryField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    values: QuickResponseQueryValueList,
    operator: S.String,
    allowFuzziness: S.optional(S.Boolean),
    priority: S.optional(S.String),
  }),
).annotate({
  identifier: "QuickResponseQueryField",
}) as any as S.Schema<QuickResponseQueryField>;
export type QuickResponseQueryFieldList = QuickResponseQueryField[];
export const QuickResponseQueryFieldList = /*@__PURE__*/ S.Array(
  QuickResponseQueryField,
);
export type QuickResponseFilterValue = string;
export type QuickResponseFilterValueList = string[];
export const QuickResponseFilterValueList = /*@__PURE__*/ S.Array(S.String);
export type QuickResponseFilterOperator = string;
export interface QuickResponseFilterField {
  name: string;
  values?: string[];
  operator: string;
  includeNoExistence?: boolean;
}
export const QuickResponseFilterField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    values: S.optional(QuickResponseFilterValueList),
    operator: S.String,
    includeNoExistence: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "QuickResponseFilterField",
}) as any as S.Schema<QuickResponseFilterField>;
export type QuickResponseFilterFieldList = QuickResponseFilterField[];
export const QuickResponseFilterFieldList = /*@__PURE__*/ S.Array(
  QuickResponseFilterField,
);
export type Order = string;
export interface QuickResponseOrderField {
  name: string;
  order?: string;
}
export const QuickResponseOrderField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, order: S.optional(S.String) }),
).annotate({
  identifier: "QuickResponseOrderField",
}) as any as S.Schema<QuickResponseOrderField>;
export interface QuickResponseSearchExpression {
  queries?: QuickResponseQueryField[];
  filters?: QuickResponseFilterField[];
  orderOnField?: QuickResponseOrderField;
}
export const QuickResponseSearchExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queries: S.optional(QuickResponseQueryFieldList),
    filters: S.optional(QuickResponseFilterFieldList),
    orderOnField: S.optional(QuickResponseOrderField),
  }),
).annotate({
  identifier: "QuickResponseSearchExpression",
}) as any as S.Schema<QuickResponseSearchExpression>;
export type ContactAttributeKey = string;
export type ContactAttributeValue = string;
export type ContactAttributes = { [key: string]: string | undefined };
export const ContactAttributes = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface SearchQuickResponsesRequest {
  knowledgeBaseId: string;
  searchExpression: QuickResponseSearchExpression;
  nextToken?: string;
  maxResults?: number;
  attributes?: { [key: string]: string | undefined };
}
export const SearchQuickResponsesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
    searchExpression: QuickResponseSearchExpression,
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    attributes: S.optional(ContactAttributes),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/knowledgeBases/{knowledgeBaseId}/search/quickResponses",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchQuickResponsesRequest",
}) as any as S.Schema<SearchQuickResponsesRequest>;
export type ContactAttributeKeys = string[];
export const ContactAttributeKeys = /*@__PURE__*/ S.Array(S.String);
export interface QuickResponseSearchResultData {
  quickResponseArn: string;
  quickResponseId: string;
  knowledgeBaseArn: string;
  knowledgeBaseId: string;
  name: string;
  contentType: string;
  status: string;
  contents: QuickResponseContents;
  createdTime: Date;
  lastModifiedTime: Date;
  isActive: boolean;
  description?: string;
  groupingConfiguration?: GroupingConfiguration;
  shortcutKey?: string;
  lastModifiedBy?: string;
  channels?: (string | redacted.Redacted<string>)[];
  language?: string;
  attributesNotInterpolated?: string[];
  attributesInterpolated?: string[];
  tags?: { [key: string]: string | undefined };
}
export const QuickResponseSearchResultData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    quickResponseArn: S.String,
    quickResponseId: S.String,
    knowledgeBaseArn: S.String,
    knowledgeBaseId: S.String,
    name: S.String,
    contentType: S.String,
    status: S.String,
    contents: QuickResponseContents,
    createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    isActive: S.Boolean,
    description: S.optional(S.String),
    groupingConfiguration: S.optional(GroupingConfiguration),
    shortcutKey: S.optional(S.String),
    lastModifiedBy: S.optional(S.String),
    channels: S.optional(Channels),
    language: S.optional(S.String),
    attributesNotInterpolated: S.optional(ContactAttributeKeys),
    attributesInterpolated: S.optional(ContactAttributeKeys),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "QuickResponseSearchResultData",
}) as any as S.Schema<QuickResponseSearchResultData>;
export type QuickResponseSearchResultsList = QuickResponseSearchResultData[];
export const QuickResponseSearchResultsList = /*@__PURE__*/ S.Array(
  QuickResponseSearchResultData,
);
export interface SearchQuickResponsesResponse {
  results: QuickResponseSearchResultData[];
  nextToken?: string;
}
export const SearchQuickResponsesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    results: QuickResponseSearchResultsList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchQuickResponsesResponse",
}) as any as S.Schema<SearchQuickResponsesResponse>;
export interface SearchSessionsRequest {
  nextToken?: string;
  maxResults?: number;
  assistantId: string;
  searchExpression: SearchExpression;
}
export const SearchSessionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    assistantId: S.String.pipe(T.HttpLabel("assistantId")),
    searchExpression: SearchExpression,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/assistants/{assistantId}/searchSessions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchSessionsRequest",
}) as any as S.Schema<SearchSessionsRequest>;
export interface SessionSummary {
  sessionId: string;
  sessionArn: string;
  assistantId: string;
  assistantArn: string;
}
export const SessionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.String,
    sessionArn: S.String,
    assistantId: S.String,
    assistantArn: S.String,
  }),
).annotate({ identifier: "SessionSummary" }) as any as S.Schema<SessionSummary>;
export type SessionSummaries = SessionSummary[];
export const SessionSummaries = /*@__PURE__*/ S.Array(SessionSummary);
export interface SearchSessionsResponse {
  sessionSummaries: SessionSummary[];
  nextToken?: string;
}
export const SearchSessionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionSummaries: SessionSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchSessionsResponse",
}) as any as S.Schema<SearchSessionsResponse>;
export type TimeToLive = number;
export interface StartContentUploadRequest {
  knowledgeBaseId: string;
  contentType: string;
  presignedUrlTimeToLive?: number;
}
export const StartContentUploadRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
    contentType: S.String,
    presignedUrlTimeToLive: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/knowledgeBases/{knowledgeBaseId}/upload",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartContentUploadRequest",
}) as any as S.Schema<StartContentUploadRequest>;
export type Headers = { [key: string]: string | undefined };
export const Headers = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface StartContentUploadResponse {
  uploadId: string;
  url: string | redacted.Redacted<string>;
  urlExpiry: Date;
  headersToInclude: { [key: string]: string | undefined };
}
export const StartContentUploadResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    uploadId: S.String,
    url: SensitiveString,
    urlExpiry: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    headersToInclude: Headers,
  }),
).annotate({
  identifier: "StartContentUploadResponse",
}) as any as S.Schema<StartContentUploadResponse>;
export interface StartImportJobRequest {
  knowledgeBaseId: string;
  importJobType: string;
  uploadId: string;
  clientToken?: string;
  metadata?: { [key: string]: string | undefined };
  externalSourceConfiguration?: ExternalSourceConfiguration;
}
export const StartImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
    importJobType: S.String,
    uploadId: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    metadata: S.optional(ContentMetadata),
    externalSourceConfiguration: S.optional(ExternalSourceConfiguration),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/knowledgeBases/{knowledgeBaseId}/importJobs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartImportJobRequest",
}) as any as S.Schema<StartImportJobRequest>;
export interface StartImportJobResponse {
  importJob?: ImportJobData;
}
export const StartImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ importJob: S.optional(ImportJobData) }),
).annotate({
  identifier: "StartImportJobResponse",
}) as any as S.Schema<StartImportJobResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: Tags,
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
export interface UpdateContentRequest {
  knowledgeBaseId: string;
  contentId: string;
  revisionId?: string;
  title?: string;
  overrideLinkOutUri?: string;
  removeOverrideLinkOutUri?: boolean;
  metadata?: { [key: string]: string | undefined };
  uploadId?: string;
}
export const UpdateContentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
    contentId: S.String.pipe(T.HttpLabel("contentId")),
    revisionId: S.optional(S.String),
    title: S.optional(S.String),
    overrideLinkOutUri: S.optional(S.String),
    removeOverrideLinkOutUri: S.optional(S.Boolean),
    metadata: S.optional(ContentMetadata),
    uploadId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/knowledgeBases/{knowledgeBaseId}/contents/{contentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateContentRequest",
}) as any as S.Schema<UpdateContentRequest>;
export interface UpdateContentResponse {
  content?: ContentData;
}
export const UpdateContentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ content: S.optional(ContentData) }),
).annotate({
  identifier: "UpdateContentResponse",
}) as any as S.Schema<UpdateContentResponse>;
export interface UpdateKnowledgeBaseTemplateUriRequest {
  knowledgeBaseId: string;
  templateUri: string;
}
export const UpdateKnowledgeBaseTemplateUriRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
      templateUri: S.String,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/knowledgeBases/{knowledgeBaseId}/templateUri",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateKnowledgeBaseTemplateUriRequest",
}) as any as S.Schema<UpdateKnowledgeBaseTemplateUriRequest>;
export interface UpdateKnowledgeBaseTemplateUriResponse {
  knowledgeBase?: KnowledgeBaseData;
}
export const UpdateKnowledgeBaseTemplateUriResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ knowledgeBase: S.optional(KnowledgeBaseData) }),
).annotate({
  identifier: "UpdateKnowledgeBaseTemplateUriResponse",
}) as any as S.Schema<UpdateKnowledgeBaseTemplateUriResponse>;
export interface UpdateQuickResponseRequest {
  knowledgeBaseId: string;
  quickResponseId: string;
  name?: string;
  content?: QuickResponseDataProvider;
  contentType?: string;
  groupingConfiguration?: GroupingConfiguration;
  removeGroupingConfiguration?: boolean;
  description?: string;
  removeDescription?: boolean;
  shortcutKey?: string;
  removeShortcutKey?: boolean;
  isActive?: boolean;
  channels?: (string | redacted.Redacted<string>)[];
  language?: string;
}
export const UpdateQuickResponseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
    quickResponseId: S.String.pipe(T.HttpLabel("quickResponseId")),
    name: S.optional(S.String),
    content: S.optional(QuickResponseDataProvider),
    contentType: S.optional(S.String),
    groupingConfiguration: S.optional(GroupingConfiguration),
    removeGroupingConfiguration: S.optional(S.Boolean),
    description: S.optional(S.String),
    removeDescription: S.optional(S.Boolean),
    shortcutKey: S.optional(S.String),
    removeShortcutKey: S.optional(S.Boolean),
    isActive: S.optional(S.Boolean),
    channels: S.optional(Channels),
    language: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/knowledgeBases/{knowledgeBaseId}/quickResponses/{quickResponseId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateQuickResponseRequest",
}) as any as S.Schema<UpdateQuickResponseRequest>;
export interface UpdateQuickResponseResponse {
  quickResponse?: QuickResponseData;
}
export const UpdateQuickResponseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ quickResponse: S.optional(QuickResponseData) }),
).annotate({
  identifier: "UpdateQuickResponseResponse",
}) as any as S.Schema<UpdateQuickResponseResponse>;
export type CreateAssistantError =
  | AccessDeniedException
  | ConflictException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Connect Wisdom assistant.
 */
export const createAssistant: API.OperationMethod<
  CreateAssistantRequest,
  CreateAssistantResponse,
  CreateAssistantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAssistantRequest,
  output: CreateAssistantResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssistant",
}));

export type CreateAssistantAssociationError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an association between an Amazon Connect Wisdom assistant and another resource. Currently, the
 * only supported association is with a knowledge base. An assistant can have only a single
 * association.
 */
export const createAssistantAssociation: API.OperationMethod<
  CreateAssistantAssociationRequest,
  CreateAssistantAssociationResponse,
  CreateAssistantAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAssistantAssociationRequest,
  output: CreateAssistantAssociationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssistantAssociation",
}));

export type CreateContentError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates Wisdom content. Before to calling this API, use StartContentUpload to
 * upload an asset.
 */
export const createContent: API.OperationMethod<
  CreateContentRequest,
  CreateContentResponse,
  CreateContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateContentRequest,
  output: CreateContentResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContent",
}));

export type CreateKnowledgeBaseError =
  | AccessDeniedException
  | ConflictException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a knowledge base.
 *
 * When using this API, you cannot reuse Amazon AppIntegrations
 * DataIntegrations with external knowledge bases such as Salesforce and ServiceNow. If you do,
 * you'll get an `InvalidRequestException` error.
 *
 * For example, you're programmatically managing your external knowledge base, and you want
 * to add or remove one of the fields that is being ingested from Salesforce. Do the
 * following:
 *
 * - Call DeleteKnowledgeBase.
 *
 * - Call DeleteDataIntegration.
 *
 * - Call CreateDataIntegration to recreate the DataIntegration or a create different
 * one.
 *
 * - Call CreateKnowledgeBase.
 */
export const createKnowledgeBase: API.OperationMethod<
  CreateKnowledgeBaseRequest,
  CreateKnowledgeBaseResponse,
  CreateKnowledgeBaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateKnowledgeBaseRequest,
  output: CreateKnowledgeBaseResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateKnowledgeBase",
}));

export type CreateQuickResponseError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Wisdom quick response.
 */
export const createQuickResponse: API.OperationMethod<
  CreateQuickResponseRequest,
  CreateQuickResponseResponse,
  CreateQuickResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateQuickResponseRequest,
  output: CreateQuickResponseResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQuickResponse",
}));

export type CreateSessionError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a session. A session is a contextual container used for generating
 * recommendations. Amazon Connect creates a new Wisdom session for each contact on which
 * Wisdom is enabled.
 */
export const createSession: API.OperationMethod<
  CreateSessionRequest,
  CreateSessionResponse,
  CreateSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSessionRequest,
  output: CreateSessionResponse,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSession",
}));

export type DeleteAssistantError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an assistant.
 */
export const deleteAssistant: API.OperationMethod<
  DeleteAssistantRequest,
  DeleteAssistantResponse,
  DeleteAssistantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAssistantRequest,
  output: DeleteAssistantResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssistant",
}));

export type DeleteAssistantAssociationError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an assistant association.
 */
export const deleteAssistantAssociation: API.OperationMethod<
  DeleteAssistantAssociationRequest,
  DeleteAssistantAssociationResponse,
  DeleteAssistantAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAssistantAssociationRequest,
  output: DeleteAssistantAssociationResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssistantAssociation",
}));

export type DeleteContentError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the content.
 */
export const deleteContent: API.OperationMethod<
  DeleteContentRequest,
  DeleteContentResponse,
  DeleteContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteContentRequest,
  output: DeleteContentResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContent",
}));

export type DeleteImportJobError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the quick response import job.
 */
export const deleteImportJob: API.OperationMethod<
  DeleteImportJobRequest,
  DeleteImportJobResponse,
  DeleteImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteImportJobRequest,
  output: DeleteImportJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteImportJob",
}));

export type DeleteKnowledgeBaseError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the knowledge base.
 *
 * When you use this API to delete an external knowledge base such as Salesforce or
 * ServiceNow, you must also delete the Amazon AppIntegrations
 * DataIntegration. This is because you can't reuse the DataIntegration after it's been
 * associated with an external knowledge base. However, you can delete and recreate it. See
 * DeleteDataIntegration and CreateDataIntegration in the Amazon AppIntegrations API
 * Reference.
 */
export const deleteKnowledgeBase: API.OperationMethod<
  DeleteKnowledgeBaseRequest,
  DeleteKnowledgeBaseResponse,
  DeleteKnowledgeBaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteKnowledgeBaseRequest,
  output: DeleteKnowledgeBaseResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteKnowledgeBase",
}));

export type DeleteQuickResponseError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a quick response.
 */
export const deleteQuickResponse: API.OperationMethod<
  DeleteQuickResponseRequest,
  DeleteQuickResponseResponse,
  DeleteQuickResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteQuickResponseRequest,
  output: DeleteQuickResponseResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQuickResponse",
}));

export type GetAssistantError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an assistant.
 */
export const getAssistant: API.OperationMethod<
  GetAssistantRequest,
  GetAssistantResponse,
  GetAssistantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAssistantRequest,
  output: GetAssistantResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssistant",
}));

export type GetAssistantAssociationError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an assistant association.
 */
export const getAssistantAssociation: API.OperationMethod<
  GetAssistantAssociationRequest,
  GetAssistantAssociationResponse,
  GetAssistantAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAssistantAssociationRequest,
  output: GetAssistantAssociationResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssistantAssociation",
}));

export type GetContentError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves content, including a pre-signed URL to download the content.
 */
export const getContent: API.OperationMethod<
  GetContentRequest,
  GetContentResponse,
  GetContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetContentRequest,
  output: GetContentResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContent",
}));

export type GetContentSummaryError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves summary information about the content.
 */
export const getContentSummary: API.OperationMethod<
  GetContentSummaryRequest,
  GetContentSummaryResponse,
  GetContentSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetContentSummaryRequest,
  output: GetContentSummaryResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContentSummary",
}));

export type GetImportJobError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the started import job.
 */
export const getImportJob: API.OperationMethod<
  GetImportJobRequest,
  GetImportJobResponse,
  GetImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetImportJobRequest,
  output: GetImportJobResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImportJob",
}));

export type GetKnowledgeBaseError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the knowledge base.
 */
export const getKnowledgeBase: API.OperationMethod<
  GetKnowledgeBaseRequest,
  GetKnowledgeBaseResponse,
  GetKnowledgeBaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetKnowledgeBaseRequest,
  output: GetKnowledgeBaseResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKnowledgeBase",
}));

export type GetQuickResponseError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the quick response.
 */
export const getQuickResponse: API.OperationMethod<
  GetQuickResponseRequest,
  GetQuickResponseResponse,
  GetQuickResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetQuickResponseRequest,
  output: GetQuickResponseResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQuickResponse",
}));

export type GetRecommendationsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves recommendations for the specified session. To avoid retrieving the same
 * recommendations in subsequent calls, use NotifyRecommendationsReceived. This API supports long-polling behavior with the
 * `waitTimeSeconds` parameter. Short poll is the default behavior and only returns
 * recommendations already available. To perform a manual query against an assistant, use QueryAssistant.
 */
export const getRecommendations: API.OperationMethod<
  GetRecommendationsRequest,
  GetRecommendationsResponse,
  GetRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRecommendationsRequest,
  output: GetRecommendationsResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommendations",
}));

export type GetSessionError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information for a specified session.
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
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSession",
}));

export type ListAssistantAssociationsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists information about assistant associations.
 */
export const listAssistantAssociations: API.PaginatedOperationMethod<
  ListAssistantAssociationsRequest,
  ListAssistantAssociationsResponse,
  ListAssistantAssociationsError,
  Credentials | HttpClient.HttpClient,
  AssistantAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssistantAssociationsRequest,
  output: ListAssistantAssociationsResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssistantAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assistantAssociationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssistantsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Lists information about assistants.
 */
export const listAssistants: API.PaginatedOperationMethod<
  ListAssistantsRequest,
  ListAssistantsResponse,
  ListAssistantsError,
  Credentials | HttpClient.HttpClient,
  AssistantSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssistantsRequest,
  output: ListAssistantsResponse,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssistants",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assistantSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListContentsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the content.
 */
export const listContents: API.PaginatedOperationMethod<
  ListContentsRequest,
  ListContentsResponse,
  ListContentsError,
  Credentials | HttpClient.HttpClient,
  ContentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListContentsRequest,
  output: ListContentsResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "contentSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListImportJobsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Lists information about import jobs.
 */
export const listImportJobs: API.PaginatedOperationMethod<
  ListImportJobsRequest,
  ListImportJobsResponse,
  ListImportJobsError,
  Credentials | HttpClient.HttpClient,
  ImportJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListImportJobsRequest,
  output: ListImportJobsResponse,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImportJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "importJobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListKnowledgeBasesError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Lists the knowledge bases.
 */
export const listKnowledgeBases: API.PaginatedOperationMethod<
  ListKnowledgeBasesRequest,
  ListKnowledgeBasesResponse,
  ListKnowledgeBasesError,
  Credentials | HttpClient.HttpClient,
  KnowledgeBaseSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListKnowledgeBasesRequest,
  output: ListKnowledgeBasesResponse,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListKnowledgeBases",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "knowledgeBaseSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListQuickResponsesError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists information about quick response.
 */
export const listQuickResponses: API.PaginatedOperationMethod<
  ListQuickResponsesRequest,
  ListQuickResponsesResponse,
  ListQuickResponsesError,
  Credentials | HttpClient.HttpClient,
  QuickResponseSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListQuickResponsesRequest,
  output: ListQuickResponsesResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQuickResponses",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "quickResponseSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Lists the tags for the specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type NotifyRecommendationsReceivedError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified recommendations from the specified assistant's queue of newly
 * available recommendations. You can use this API in conjunction with GetRecommendations and a `waitTimeSeconds` input for long-polling
 * behavior and avoiding duplicate recommendations.
 */
export const notifyRecommendationsReceived: API.OperationMethod<
  NotifyRecommendationsReceivedRequest,
  NotifyRecommendationsReceivedResponse,
  NotifyRecommendationsReceivedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: NotifyRecommendationsReceivedRequest,
  output: NotifyRecommendationsReceivedResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "NotifyRecommendationsReceived",
}));

export type QueryAssistantError =
  | AccessDeniedException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Performs a manual search against the specified assistant. To retrieve recommendations for
 * an assistant, use GetRecommendations.
 */
export const queryAssistant: API.PaginatedOperationMethod<
  QueryAssistantRequest,
  QueryAssistantResponse,
  QueryAssistantError,
  Credentials | HttpClient.HttpClient,
  ResultData
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: QueryAssistantRequest,
  output: QueryAssistantResponse,
  errors: [
    AccessDeniedException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "QueryAssistant",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "results",
    pageSize: "maxResults",
  } as const,
})) as any;

export type RemoveKnowledgeBaseTemplateUriError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes a URI template from a knowledge base.
 */
export const removeKnowledgeBaseTemplateUri: API.OperationMethod<
  RemoveKnowledgeBaseTemplateUriRequest,
  RemoveKnowledgeBaseTemplateUriResponse,
  RemoveKnowledgeBaseTemplateUriError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveKnowledgeBaseTemplateUriRequest,
  output: RemoveKnowledgeBaseTemplateUriResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveKnowledgeBaseTemplateUri",
}));

export type SearchContentError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Searches for content in a specified knowledge base. Can be used to get a specific content
 * resource by its name.
 */
export const searchContent: API.PaginatedOperationMethod<
  SearchContentRequest,
  SearchContentResponse,
  SearchContentError,
  Credentials | HttpClient.HttpClient,
  ContentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchContentRequest,
  output: SearchContentResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchContent",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "contentSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchQuickResponsesError =
  | AccessDeniedException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Searches existing Wisdom quick responses in a Wisdom knowledge base.
 */
export const searchQuickResponses: API.PaginatedOperationMethod<
  SearchQuickResponsesRequest,
  SearchQuickResponsesResponse,
  SearchQuickResponsesError,
  Credentials | HttpClient.HttpClient,
  QuickResponseSearchResultData
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchQuickResponsesRequest,
  output: SearchQuickResponsesResponse,
  errors: [
    AccessDeniedException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchQuickResponses",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "results",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchSessionsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Searches for sessions.
 */
export const searchSessions: API.PaginatedOperationMethod<
  SearchSessionsRequest,
  SearchSessionsResponse,
  SearchSessionsError,
  Credentials | HttpClient.HttpClient,
  SessionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchSessionsRequest,
  output: SearchSessionsResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchSessions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sessionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type StartContentUploadError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Get a URL to upload content to a knowledge base. To upload content, first make a PUT
 * request to the returned URL with your file, making sure to include the required headers. Then
 * use CreateContent to finalize the content creation process or UpdateContent to modify an existing resource. You can only upload content to a
 * knowledge base of type CUSTOM.
 */
export const startContentUpload: API.OperationMethod<
  StartContentUploadRequest,
  StartContentUploadResponse,
  StartContentUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartContentUploadRequest,
  output: StartContentUploadResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartContentUpload",
}));

export type StartImportJobError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Start an asynchronous job to import Wisdom resources from an uploaded source file. Before calling this API, use StartContentUpload to
 * upload an asset that contains the resource data.
 *
 * - For importing Wisdom quick responses, you need to upload a csv file including the quick responses. For information about how to format the csv file for importing quick responses, see Import quick responses.
 */
export const startImportJob: API.OperationMethod<
  StartImportJobRequest,
  StartImportJobResponse,
  StartImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartImportJobRequest,
  output: StartImportJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImportJob",
}));

export type TagResourceError =
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Adds the specified tags to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [ResourceNotFoundException, TooManyTagsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Removes the specified tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateContentError =
  | AccessDeniedException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates information about the content.
 */
export const updateContent: API.OperationMethod<
  UpdateContentRequest,
  UpdateContentResponse,
  UpdateContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateContentRequest,
  output: UpdateContentResponse,
  errors: [
    AccessDeniedException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContent",
}));

export type UpdateKnowledgeBaseTemplateUriError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the template URI of a knowledge base. This is only supported for knowledge bases
 * of type EXTERNAL. Include a single variable in `${variable}` format; this
 * interpolated by Wisdom using ingested content. For example, if you ingest a Salesforce
 * article, it has an `Id` value, and you can set the template URI to
 * `https://myInstanceName.lightning.force.com/lightning/r/Knowledge__kav/*${Id}*\/view`.
 */
export const updateKnowledgeBaseTemplateUri: API.OperationMethod<
  UpdateKnowledgeBaseTemplateUriRequest,
  UpdateKnowledgeBaseTemplateUriResponse,
  UpdateKnowledgeBaseTemplateUriError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateKnowledgeBaseTemplateUriRequest,
  output: UpdateKnowledgeBaseTemplateUriResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateKnowledgeBaseTemplateUri",
}));

export type UpdateQuickResponseError =
  | AccessDeniedException
  | ConflictException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing Wisdom quick response.
 */
export const updateQuickResponse: API.OperationMethod<
  UpdateQuickResponseRequest,
  UpdateQuickResponseResponse,
  UpdateQuickResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateQuickResponseRequest,
  output: UpdateQuickResponseResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQuickResponse",
}));
