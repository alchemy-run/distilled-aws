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
  sdkId: "Agent Registry",
  serviceShapeName: "AgentRegistry",
});
const auth = T.AwsAuthSigv4({ name: "agent-registry" });
const ver = T.ServiceVersion("2025-12-01");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const { Region, Endpoint } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  if (Endpoint != null) {
    return e(Endpoint);
  }
  if (Region != null) {
    return e(`https://agent-registry.${Region}.api.aws`);
  }
  return err(
    "Unable to resolve an Agent Registry endpoint: Region was not set and no explicit Endpoint override was provided.",
  );
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
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
export type RegistryIdentifier = string;
export type RecordIdentifier = string;
export type RegistryRecordIdList = string[];
export const RegistryRecordIdList = /*@__PURE__*/ S.Array(S.String);
export interface RegistryRecordsEntry {
  registryId: string;
  recordIds: string[];
}
export const RegistryRecordsEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ registryId: S.String, recordIds: RegistryRecordIdList }),
).annotate({
  identifier: "RegistryRecordsEntry",
}) as any as S.Schema<RegistryRecordsEntry>;
export type RegistryRecordsEntryList = RegistryRecordsEntry[];
export const RegistryRecordsEntryList =
  /*@__PURE__*/ S.Array(RegistryRecordsEntry);
export interface BatchGetDiscoverableRegistryRecordRequest {
  entries: RegistryRecordsEntry[];
}
export const BatchGetDiscoverableRegistryRecordRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ entries: RegistryRecordsEntryList }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/discoverable-records-batch" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "BatchGetDiscoverableRegistryRecordRequest",
  }) as any as S.Schema<BatchGetDiscoverableRegistryRecordRequest>;
export type RegistryArn = string;
export type RegistryRecordArn = string;
export type RegistryRecordId = string;
export type RegistryRecordName = string;
export type Description = string | redacted.Redacted<string>;
export type RegistryRecordDisplayName = string;
export type RecordType = "MCP" | "AGENT" | "CUSTOM" | "SKILL" | (string & {});
export const RecordType = S.String;

export type DescriptorData = string | redacted.Redacted<string>;
export type DataSchemaVersion = string;
export interface McpToolsDescriptor {
  data?: string | redacted.Redacted<string>;
  dataSchemaVersion?: string;
}
export const McpToolsDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    data: S.optional(SensitiveString),
    dataSchemaVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "McpToolsDescriptor",
}) as any as S.Schema<McpToolsDescriptor>;
export interface McpServerAdditionalData {
  tools?: McpToolsDescriptor;
}
export const McpServerAdditionalData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tools: S.optional(McpToolsDescriptor) }),
).annotate({
  identifier: "McpServerAdditionalData",
}) as any as S.Schema<McpServerAdditionalData>;
export type DescriptorSourceUrl = string;
export interface DescriptorSourceFromUrl {
  url: string;
}
export const DescriptorSourceFromUrl = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ url: S.String }),
).annotate({
  identifier: "DescriptorSourceFromUrl",
}) as any as S.Schema<DescriptorSourceFromUrl>;
export interface DescriptorSource {
  fromUrl?: DescriptorSourceFromUrl;
}
export const DescriptorSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fromUrl: S.optional(DescriptorSourceFromUrl) }),
).annotate({
  identifier: "DescriptorSource",
}) as any as S.Schema<DescriptorSource>;
export interface McpServerDescriptor {
  data?: string | redacted.Redacted<string>;
  dataSchemaVersion?: string;
  additionalData?: McpServerAdditionalData;
  source?: DescriptorSource;
}
export const McpServerDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    data: S.optional(SensitiveString),
    dataSchemaVersion: S.optional(S.String),
    additionalData: S.optional(McpServerAdditionalData),
    source: S.optional(DescriptorSource),
  }),
).annotate({
  identifier: "McpServerDescriptor",
}) as any as S.Schema<McpServerDescriptor>;
export interface A2aAgentCardDescriptor {
  data?: string | redacted.Redacted<string>;
  dataSchemaVersion?: string;
  source?: DescriptorSource;
}
export const A2aAgentCardDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    data: S.optional(SensitiveString),
    dataSchemaVersion: S.optional(S.String),
    source: S.optional(DescriptorSource),
  }),
).annotate({
  identifier: "A2aAgentCardDescriptor",
}) as any as S.Schema<A2aAgentCardDescriptor>;
export interface AgentSkillsMdDescriptor {
  data?: string | redacted.Redacted<string>;
  dataSchemaVersion?: string;
  source?: DescriptorSource;
}
export const AgentSkillsMdDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    data: S.optional(SensitiveString),
    dataSchemaVersion: S.optional(S.String),
    source: S.optional(DescriptorSource),
  }),
).annotate({
  identifier: "AgentSkillsMdDescriptor",
}) as any as S.Schema<AgentSkillsMdDescriptor>;
export interface AgentSkillsAdditionalData {
  skillMd?: AgentSkillsMdDescriptor;
}
export const AgentSkillsAdditionalData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ skillMd: S.optional(AgentSkillsMdDescriptor) }),
).annotate({
  identifier: "AgentSkillsAdditionalData",
}) as any as S.Schema<AgentSkillsAdditionalData>;
export interface AgentSkillsDefinitionDescriptor {
  data?: string | redacted.Redacted<string>;
  dataSchemaVersion?: string;
  additionalData?: AgentSkillsAdditionalData;
}
export const AgentSkillsDefinitionDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    data: S.optional(SensitiveString),
    dataSchemaVersion: S.optional(S.String),
    additionalData: S.optional(AgentSkillsAdditionalData),
  }),
).annotate({
  identifier: "AgentSkillsDefinitionDescriptor",
}) as any as S.Schema<AgentSkillsDefinitionDescriptor>;
export interface CustomDescriptor {
  data?: string | redacted.Redacted<string>;
}
export const CustomDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ data: S.optional(SensitiveString) }),
).annotate({
  identifier: "CustomDescriptor",
}) as any as S.Schema<CustomDescriptor>;
export interface Descriptors {
  mcpServer?: McpServerDescriptor;
  a2aAgentCard?: A2aAgentCardDescriptor;
  agentSkillsDefinition?: AgentSkillsDefinitionDescriptor;
  custom?: CustomDescriptor;
}
export const Descriptors = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mcpServer: S.optional(McpServerDescriptor),
    a2aAgentCard: S.optional(A2aAgentCardDescriptor),
    agentSkillsDefinition: S.optional(AgentSkillsDefinitionDescriptor),
    custom: S.optional(CustomDescriptor),
  }),
).annotate({ identifier: "Descriptors" }) as any as S.Schema<Descriptors>;
export type RegistryRecordVersion = string;
export type RegistryRecordStatus =
  | "DRAFT"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "DEPRECATED"
  | "CREATING"
  | "UPDATING"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | (string & {});
export const RegistryRecordStatus = S.String;

export interface RegistryRecordSummary {
  registryArn: string;
  recordArn: string;
  recordId: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  displayName?: string;
  recordType: RecordType;
  descriptors: Descriptors;
  recordVersion: string;
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
    displayName: S.optional(S.String),
    recordType: RecordType,
    descriptors: Descriptors,
    recordVersion: S.String,
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
export type BatchGetDiscoverableRegistryRecordErrorCode =
  | "RESOURCE_NOT_FOUND"
  | "ACCESS_DENIED"
  | "INTERNAL_ERROR"
  | (string & {});
export const BatchGetDiscoverableRegistryRecordErrorCode = S.String;

export interface BatchGetDiscoverableRegistryRecordError_ {
  registryId: string;
  recordId: string;
  errorCode: BatchGetDiscoverableRegistryRecordErrorCode;
  message?: string;
}
export const BatchGetDiscoverableRegistryRecordError_ = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      registryId: S.String,
      recordId: S.String,
      errorCode: BatchGetDiscoverableRegistryRecordErrorCode,
      message: S.optional(S.String),
    }),
).annotate({
  identifier: "BatchGetDiscoverableRegistryRecordError",
}) as any as S.Schema<BatchGetDiscoverableRegistryRecordError_>;
export type BatchGetDiscoverableRegistryRecordErrorList =
  BatchGetDiscoverableRegistryRecordError_[];
export const BatchGetDiscoverableRegistryRecordErrorList =
  /*@__PURE__*/ S.Array(BatchGetDiscoverableRegistryRecordError_);
export interface BatchGetDiscoverableRegistryRecordResponse {
  registryRecords: RegistryRecordSummary[];
  errors: BatchGetDiscoverableRegistryRecordError_[];
}
export const BatchGetDiscoverableRegistryRecordResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      registryRecords: RegistryRecordSummaryList,
      errors: BatchGetDiscoverableRegistryRecordErrorList,
    }),
  ).annotate({
    identifier: "BatchGetDiscoverableRegistryRecordResponse",
  }) as any as S.Schema<BatchGetDiscoverableRegistryRecordResponse>;
export type RegistryRecordFilterName =
  | "recordType"
  | "descriptorType"
  | (string & {});
export const RegistryRecordFilterName = S.String;

export type FilterValue = string;
export type DiscoverableFilterValues = string[];
export const DiscoverableFilterValues = /*@__PURE__*/ S.Array(S.String);
export interface RegistryRecordFilter {
  name: RegistryRecordFilterName;
  values: string[];
}
export const RegistryRecordFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: RegistryRecordFilterName,
    values: DiscoverableFilterValues,
  }),
).annotate({
  identifier: "RegistryRecordFilter",
}) as any as S.Schema<RegistryRecordFilter>;
export type RegistryRecordFilterList = RegistryRecordFilter[];
export const RegistryRecordFilterList =
  /*@__PURE__*/ S.Array(RegistryRecordFilter);
export interface ListDiscoverableRegistryRecordsRequest {
  registryId: string;
  maxResults?: number;
  nextToken?: string;
  filters?: RegistryRecordFilter[];
}
export const ListDiscoverableRegistryRecordsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      registryId: S.String.pipe(T.HttpLabel("registryId")),
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
      filters: S.optional(RegistryRecordFilterList),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/registries/{registryId}/discoverable-records-list",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListDiscoverableRegistryRecordsRequest",
}) as any as S.Schema<ListDiscoverableRegistryRecordsRequest>;
export interface DiscoverableRegistryRecordSummary {
  registryArn: string;
  recordArn: string;
  recordId: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  displayName?: string;
  recordType: RecordType;
  recordVersion: string;
  status: RegistryRecordStatus;
  createdAt: Date;
  updatedAt: Date;
}
export const DiscoverableRegistryRecordSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryArn: S.String,
    recordArn: S.String,
    recordId: S.String,
    name: S.String,
    description: S.optional(SensitiveString),
    displayName: S.optional(S.String),
    recordType: RecordType,
    recordVersion: S.String,
    status: RegistryRecordStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "DiscoverableRegistryRecordSummary",
}) as any as S.Schema<DiscoverableRegistryRecordSummary>;
export type DiscoverableRegistryRecordSummaryList =
  DiscoverableRegistryRecordSummary[];
export const DiscoverableRegistryRecordSummaryList = /*@__PURE__*/ S.Array(
  DiscoverableRegistryRecordSummary,
);
export interface ListDiscoverableRegistryRecordsResponse {
  registryRecords: DiscoverableRegistryRecordSummary[];
  nextToken?: string;
}
export const ListDiscoverableRegistryRecordsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      registryRecords: DiscoverableRegistryRecordSummaryList,
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListDiscoverableRegistryRecordsResponse",
}) as any as S.Schema<ListDiscoverableRegistryRecordsResponse>;
export type SearchQuery = string | redacted.Redacted<string>;
export type RegistryIdList = string[];
export const RegistryIdList = /*@__PURE__*/ S.Array(S.String);
export type MetadataFilterExpression = unknown;
export interface SearchDiscoverableRegistryRecordsRequest {
  searchQuery: string | redacted.Redacted<string>;
  registryIds: string[];
  maxResults?: number;
  filters?: any;
}
export const SearchDiscoverableRegistryRecordsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      searchQuery: SensitiveString,
      registryIds: RegistryIdList,
      maxResults: S.optional(S.Number),
      filters: S.optional(S.Any),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/discoverable-records-search" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "SearchDiscoverableRegistryRecordsRequest",
}) as any as S.Schema<SearchDiscoverableRegistryRecordsRequest>;
export interface SearchDiscoverableRegistryRecordsResponse {
  registryRecords: RegistryRecordSummary[];
}
export const SearchDiscoverableRegistryRecordsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ registryRecords: RegistryRecordSummaryList }),
  ).annotate({
    identifier: "SearchDiscoverableRegistryRecordsResponse",
  }) as any as S.Schema<SearchDiscoverableRegistryRecordsResponse>;
export type NonBlankString = string;
export type ValidationExceptionReason =
  | "CannotParse"
  | "FieldValidationFailed"
  | "IdempotentParameterMismatchException"
  | "EventInOtherSession"
  | "ResourceConflict"
  | (string & {});
export const ValidationExceptionReason = S.String;

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
export type BatchGetDiscoverableRegistryRecordError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves multiple discoverable registry records by ID from a single registry. Records that cannot be retrieved are reported individually in the `errors` list rather than failing the entire request.
 */
export const batchGetDiscoverableRegistryRecord: API.OperationMethod<
  BatchGetDiscoverableRegistryRecordRequest,
  BatchGetDiscoverableRegistryRecordResponse,
  BatchGetDiscoverableRegistryRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetDiscoverableRegistryRecordRequest,
  output: BatchGetDiscoverableRegistryRecordResponse,
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
  operationName: "BatchGetDiscoverableRegistryRecord",
}));

export type ListDiscoverableRegistryRecordsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists the discoverable registry records in a registry. You can optionally filter and paginate the results.
 */
export const listDiscoverableRegistryRecords: API.PaginatedOperationMethod<
  ListDiscoverableRegistryRecordsRequest,
  ListDiscoverableRegistryRecordsResponse,
  ListDiscoverableRegistryRecordsError,
  Credentials | HttpClient.HttpClient,
  DiscoverableRegistryRecordSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDiscoverableRegistryRecordsRequest,
  output: ListDiscoverableRegistryRecordsResponse,
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
  operationName: "ListDiscoverableRegistryRecords",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "registryRecords",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchDiscoverableRegistryRecordsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Searches the discoverable registry records in a registry using a natural language query. Returns metadata for the matching records ordered by relevance.
 */
export const searchDiscoverableRegistryRecords: API.OperationMethod<
  SearchDiscoverableRegistryRecordsRequest,
  SearchDiscoverableRegistryRecordsResponse,
  SearchDiscoverableRegistryRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SearchDiscoverableRegistryRecordsRequest,
  output: SearchDiscoverableRegistryRecordsResponse,
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
  operationName: "SearchDiscoverableRegistryRecords",
}));
