import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const ns = T.XmlNamespace("http://ec2.amazon.com/awsposiedon/V2015_11_01/");
const svc = T.AwsApiService({
  sdkId: "Application Discovery Service",
  serviceShapeName: "AWSPoseidonService_V2015_11_01",
});
const auth = T.AwsAuthSigv4({ name: "discovery" });
const ver = T.ServiceVersion("2015-11-01");
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
              `https://discovery-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://discovery-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://discovery.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://discovery.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AuthorizationErrorException
  extends /*@__PURE__*/ S.TaggedError<AuthorizationErrorException>()(
    "AuthorizationErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictErrorException
  extends /*@__PURE__*/ S.TaggedError<ConflictErrorException>()(
    "ConflictErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class HomeRegionNotSetException
  extends /*@__PURE__*/ S.TaggedError<HomeRegionNotSetException>()(
    "HomeRegionNotSetException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValueException>()(
    "InvalidParameterValueException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class OperationNotPermittedException
  extends /*@__PURE__*/ S.TaggedError<OperationNotPermittedException>()(
    "OperationNotPermittedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
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
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ServerInternalErrorException
  extends /*@__PURE__*/ S.TaggedError<ServerInternalErrorException>()(
    "ServerInternalErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export type ApplicationId = string;
export type ConfigurationId = string;
export type ConfigurationIdList = string[];
export const ConfigurationIdList = /*@__PURE__*/ S.Array(S.String);
export interface AssociateConfigurationItemsToApplicationRequest {
  applicationConfigurationId: string;
  configurationIds: string[];
}
export const AssociateConfigurationItemsToApplicationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      applicationConfigurationId: S.String,
      configurationIds: ConfigurationIdList,
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
    identifier: "AssociateConfigurationItemsToApplicationRequest",
  }) as any as S.Schema<AssociateConfigurationItemsToApplicationRequest>;
export interface AssociateConfigurationItemsToApplicationResponse {}
export const AssociateConfigurationItemsToApplicationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "AssociateConfigurationItemsToApplicationResponse",
  }) as any as S.Schema<AssociateConfigurationItemsToApplicationResponse>;
export type AgentId = string;
export interface DeleteAgent {
  agentId: string;
  force?: boolean;
}
export const DeleteAgent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agentId: S.String, force: S.optional(S.Boolean) }),
).annotate({ identifier: "DeleteAgent" }) as any as S.Schema<DeleteAgent>;
export type DeleteAgents = DeleteAgent[];
export const DeleteAgents = /*@__PURE__*/ S.Array(DeleteAgent);
export interface BatchDeleteAgentsRequest {
  deleteAgents: DeleteAgent[];
}
export const BatchDeleteAgentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deleteAgents: DeleteAgents }).pipe(
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
  identifier: "BatchDeleteAgentsRequest",
}) as any as S.Schema<BatchDeleteAgentsRequest>;
export type DeleteAgentErrorCode =
  | "NOT_FOUND"
  | "INTERNAL_SERVER_ERROR"
  | "AGENT_IN_USE"
  | (string & {});
export const DeleteAgentErrorCode = /*@__PURE__*/ S.String;

export interface BatchDeleteAgentError {
  agentId: string;
  errorMessage: string;
  errorCode: DeleteAgentErrorCode;
}
export const BatchDeleteAgentError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentId: S.String,
    errorMessage: S.String,
    errorCode: DeleteAgentErrorCode,
  }),
).annotate({
  identifier: "BatchDeleteAgentError",
}) as any as S.Schema<BatchDeleteAgentError>;
export type BatchDeleteAgentErrors = BatchDeleteAgentError[];
export const BatchDeleteAgentErrors = /*@__PURE__*/ S.Array(
  BatchDeleteAgentError,
);
export interface BatchDeleteAgentsResponse {
  errors?: BatchDeleteAgentError[];
}
export const BatchDeleteAgentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ errors: S.optional(BatchDeleteAgentErrors) }).pipe(ns),
).annotate({
  identifier: "BatchDeleteAgentsResponse",
}) as any as S.Schema<BatchDeleteAgentsResponse>;
export type ImportTaskIdentifier = string;
export type ToDeleteIdentifierList = string[];
export const ToDeleteIdentifierList = /*@__PURE__*/ S.Array(S.String);
export interface BatchDeleteImportDataRequest {
  importTaskIds: string[];
  deleteHistory?: boolean;
}
export const BatchDeleteImportDataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    importTaskIds: ToDeleteIdentifierList,
    deleteHistory: S.optional(S.Boolean),
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
  identifier: "BatchDeleteImportDataRequest",
}) as any as S.Schema<BatchDeleteImportDataRequest>;
export type BatchDeleteImportDataErrorCode =
  | "NOT_FOUND"
  | "INTERNAL_SERVER_ERROR"
  | "OVER_LIMIT"
  | (string & {});
export const BatchDeleteImportDataErrorCode = /*@__PURE__*/ S.String;

export type BatchDeleteImportDataErrorDescription = string;
export interface BatchDeleteImportDataError_ {
  importTaskId?: string;
  errorCode?: BatchDeleteImportDataErrorCode;
  errorDescription?: string;
}
export const BatchDeleteImportDataError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    importTaskId: S.optional(S.String),
    errorCode: S.optional(BatchDeleteImportDataErrorCode),
    errorDescription: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchDeleteImportDataError",
}) as any as S.Schema<BatchDeleteImportDataError_>;
export type BatchDeleteImportDataErrorList = BatchDeleteImportDataError_[];
export const BatchDeleteImportDataErrorList = /*@__PURE__*/ S.Array(
  BatchDeleteImportDataError_,
);
export interface BatchDeleteImportDataResponse {
  errors?: BatchDeleteImportDataError_[];
}
export const BatchDeleteImportDataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ errors: S.optional(BatchDeleteImportDataErrorList) }).pipe(ns),
).annotate({
  identifier: "BatchDeleteImportDataResponse",
}) as any as S.Schema<BatchDeleteImportDataResponse>;
export type ApplicationName = string;
export type ApplicationDescription = string;
export type ApplicationWave = string;
export interface CreateApplicationRequest {
  name: string;
  description?: string;
  wave?: string;
}
export const CreateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    wave: S.optional(S.String),
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
  identifier: "CreateApplicationRequest",
}) as any as S.Schema<CreateApplicationRequest>;
export interface CreateApplicationResponse {
  configurationId?: string;
}
export const CreateApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ configurationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateApplicationResponse",
}) as any as S.Schema<CreateApplicationResponse>;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagSet = Tag[];
export const TagSet = /*@__PURE__*/ S.Array(
  Tag.pipe(T.XmlName("item")).annotate({ identifier: "Tag" }),
);
export interface CreateTagsRequest {
  configurationIds: string[];
  tags: Tag[];
}
export const CreateTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ configurationIds: ConfigurationIdList, tags: TagSet }).pipe(
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
  identifier: "CreateTagsRequest",
}) as any as S.Schema<CreateTagsRequest>;
export interface CreateTagsResponse {}
export const CreateTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CreateTagsResponse",
}) as any as S.Schema<CreateTagsResponse>;
export type ApplicationIdsList = string[];
export const ApplicationIdsList = /*@__PURE__*/ S.Array(S.String);
export interface DeleteApplicationsRequest {
  configurationIds: string[];
}
export const DeleteApplicationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ configurationIds: ApplicationIdsList }).pipe(
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
  identifier: "DeleteApplicationsRequest",
}) as any as S.Schema<DeleteApplicationsRequest>;
export interface DeleteApplicationsResponse {}
export const DeleteApplicationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteApplicationsResponse",
}) as any as S.Schema<DeleteApplicationsResponse>;
export interface DeleteTagsRequest {
  configurationIds: string[];
  tags?: Tag[];
}
export const DeleteTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configurationIds: ConfigurationIdList,
    tags: S.optional(TagSet),
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
  identifier: "DeleteTagsRequest",
}) as any as S.Schema<DeleteTagsRequest>;
export interface DeleteTagsResponse {}
export const DeleteTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteTagsResponse",
}) as any as S.Schema<DeleteTagsResponse>;
export type AgentIds = string[];
export const AgentIds = /*@__PURE__*/ S.Array(S.String);
export type FilterValue = string;
export type FilterValues = string[];
export const FilterValues = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("item")),
);
export type Condition = string;
export interface Filter {
  name: string;
  values: string[];
  condition: string;
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, values: FilterValues, condition: S.String }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type Filters = Filter[];
export const Filters = /*@__PURE__*/ S.Array(Filter);
export type NextToken = string;
export interface DescribeAgentsRequest {
  agentIds?: string[];
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export const DescribeAgentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentIds: S.optional(AgentIds),
    filters: S.optional(Filters),
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
  identifier: "DescribeAgentsRequest",
}) as any as S.Schema<DescribeAgentsRequest>;
export interface AgentNetworkInfo {
  ipAddress?: string;
  macAddress?: string;
}
export const AgentNetworkInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ipAddress: S.optional(S.String),
    macAddress: S.optional(S.String),
  }),
).annotate({
  identifier: "AgentNetworkInfo",
}) as any as S.Schema<AgentNetworkInfo>;
export type AgentNetworkInfoList = AgentNetworkInfo[];
export const AgentNetworkInfoList = /*@__PURE__*/ S.Array(AgentNetworkInfo);
export type AgentStatus =
  | "HEALTHY"
  | "UNHEALTHY"
  | "RUNNING"
  | "UNKNOWN"
  | "BLACKLISTED"
  | "SHUTDOWN"
  | (string & {});
export const AgentStatus = /*@__PURE__*/ S.String;

export interface AgentInfo {
  agentId?: string;
  hostName?: string;
  agentNetworkInfoList?: AgentNetworkInfo[];
  connectorId?: string;
  version?: string;
  health?: AgentStatus;
  lastHealthPingTime?: string;
  collectionStatus?: string;
  agentType?: string;
  registeredTime?: string;
}
export const AgentInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentId: S.optional(S.String),
    hostName: S.optional(S.String),
    agentNetworkInfoList: S.optional(AgentNetworkInfoList),
    connectorId: S.optional(S.String),
    version: S.optional(S.String),
    health: S.optional(AgentStatus),
    lastHealthPingTime: S.optional(S.String),
    collectionStatus: S.optional(S.String),
    agentType: S.optional(S.String),
    registeredTime: S.optional(S.String),
  }),
).annotate({ identifier: "AgentInfo" }) as any as S.Schema<AgentInfo>;
export type AgentsInfo = AgentInfo[];
export const AgentsInfo = /*@__PURE__*/ S.Array(AgentInfo);
export interface DescribeAgentsResponse {
  agentsInfo?: AgentInfo[];
  nextToken?: string;
}
export const DescribeAgentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentsInfo: S.optional(AgentsInfo),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeAgentsResponse",
}) as any as S.Schema<DescribeAgentsResponse>;
export type UUID = string;
export interface DescribeBatchDeleteConfigurationTaskRequest {
  taskId: string;
}
export const DescribeBatchDeleteConfigurationTaskRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ taskId: S.String }).pipe(
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
    identifier: "DescribeBatchDeleteConfigurationTaskRequest",
  }) as any as S.Schema<DescribeBatchDeleteConfigurationTaskRequest>;
export type BatchDeleteConfigurationTaskStatus =
  | "INITIALIZING"
  | "VALIDATING"
  | "DELETING"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export const BatchDeleteConfigurationTaskStatus = /*@__PURE__*/ S.String;

export type DeletionConfigurationItemType = "SERVER" | (string & {});
export const DeletionConfigurationItemType = /*@__PURE__*/ S.String;

export type ErrorStatusCode = number;
export type ErrorMessage = string;
export interface FailedConfiguration {
  configurationId?: string;
  errorStatusCode?: number;
  errorMessage?: string;
}
export const FailedConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configurationId: S.optional(S.String),
    errorStatusCode: S.optional(S.Number),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "FailedConfiguration",
}) as any as S.Schema<FailedConfiguration>;
export type FailedConfigurationList = FailedConfiguration[];
export const FailedConfigurationList =
  /*@__PURE__*/ S.Array(FailedConfiguration);
export type WarningCode = number;
export type WarningText = string;
export interface DeletionWarning {
  configurationId?: string;
  warningCode?: number;
  warningText?: string;
}
export const DeletionWarning = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configurationId: S.optional(S.String),
    warningCode: S.optional(S.Number),
    warningText: S.optional(S.String),
  }),
).annotate({
  identifier: "DeletionWarning",
}) as any as S.Schema<DeletionWarning>;
export type DeletionWarningsList = DeletionWarning[];
export const DeletionWarningsList = /*@__PURE__*/ S.Array(DeletionWarning);
export interface BatchDeleteConfigurationTask {
  taskId?: string;
  status?: BatchDeleteConfigurationTaskStatus;
  startTime?: Date;
  endTime?: Date;
  configurationType?: DeletionConfigurationItemType;
  requestedConfigurations?: string[];
  deletedConfigurations?: string[];
  failedConfigurations?: FailedConfiguration[];
  deletionWarnings?: DeletionWarning[];
}
export const BatchDeleteConfigurationTask = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.optional(S.String),
    status: S.optional(BatchDeleteConfigurationTaskStatus),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    configurationType: S.optional(DeletionConfigurationItemType),
    requestedConfigurations: S.optional(ConfigurationIdList),
    deletedConfigurations: S.optional(ConfigurationIdList),
    failedConfigurations: S.optional(FailedConfigurationList),
    deletionWarnings: S.optional(DeletionWarningsList),
  }),
).annotate({
  identifier: "BatchDeleteConfigurationTask",
}) as any as S.Schema<BatchDeleteConfigurationTask>;
export interface DescribeBatchDeleteConfigurationTaskResponse {
  task?: BatchDeleteConfigurationTask;
}
export const DescribeBatchDeleteConfigurationTaskResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ task: S.optional(BatchDeleteConfigurationTask) }).pipe(ns),
  ).annotate({
    identifier: "DescribeBatchDeleteConfigurationTaskResponse",
  }) as any as S.Schema<DescribeBatchDeleteConfigurationTaskResponse>;
export interface DescribeConfigurationsRequest {
  configurationIds: string[];
}
export const DescribeConfigurationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ configurationIds: ConfigurationIdList }).pipe(
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
  identifier: "DescribeConfigurationsRequest",
}) as any as S.Schema<DescribeConfigurationsRequest>;
export type DescribeConfigurationsAttribute = {
  [key: string]: string | undefined;
};
export const DescribeConfigurationsAttribute = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type DescribeConfigurationsAttributes = {
  [key: string]: string | undefined;
}[];
export const DescribeConfigurationsAttributes = /*@__PURE__*/ S.Array(
  DescribeConfigurationsAttribute,
);
export interface DescribeConfigurationsResponse {
  configurations?: { [key: string]: string | undefined }[];
}
export const DescribeConfigurationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configurations: S.optional(DescribeConfigurationsAttributes),
  }).pipe(ns),
).annotate({
  identifier: "DescribeConfigurationsResponse",
}) as any as S.Schema<DescribeConfigurationsResponse>;
export type ConfigurationsExportId = string;
export type ContinuousExportIds = string[];
export const ContinuousExportIds = /*@__PURE__*/ S.Array(S.String);
export type DescribeContinuousExportsMaxResults = number;
export interface DescribeContinuousExportsRequest {
  exportIds?: string[];
  maxResults?: number;
  nextToken?: string;
}
export const DescribeContinuousExportsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exportIds: S.optional(ContinuousExportIds),
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
  identifier: "DescribeContinuousExportsRequest",
}) as any as S.Schema<DescribeContinuousExportsRequest>;
export type ContinuousExportStatus =
  | "START_IN_PROGRESS"
  | "START_FAILED"
  | "ACTIVE"
  | "ERROR"
  | "STOP_IN_PROGRESS"
  | "STOP_FAILED"
  | "INACTIVE"
  | (string & {});
export const ContinuousExportStatus = /*@__PURE__*/ S.String;

export type StringMax255 = string;
export type S3Bucket = string;
export type DataSource = "AGENT" | (string & {});
export const DataSource = /*@__PURE__*/ S.String;

export type DatabaseName = string;
export type SchemaStorageConfig = { [key: string]: string | undefined };
export const SchemaStorageConfig = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ContinuousExportDescription {
  exportId?: string;
  status?: ContinuousExportStatus;
  statusDetail?: string;
  s3Bucket?: string;
  startTime?: Date;
  stopTime?: Date;
  dataSource?: DataSource;
  schemaStorageConfig?: { [key: string]: string | undefined };
}
export const ContinuousExportDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exportId: S.optional(S.String),
    status: S.optional(ContinuousExportStatus),
    statusDetail: S.optional(S.String),
    s3Bucket: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    stopTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    dataSource: S.optional(DataSource),
    schemaStorageConfig: S.optional(SchemaStorageConfig),
  }),
).annotate({
  identifier: "ContinuousExportDescription",
}) as any as S.Schema<ContinuousExportDescription>;
export type ContinuousExportDescriptions = ContinuousExportDescription[];
export const ContinuousExportDescriptions = /*@__PURE__*/ S.Array(
  ContinuousExportDescription,
);
export interface DescribeContinuousExportsResponse {
  descriptions?: ContinuousExportDescription[];
  nextToken?: string;
}
export const DescribeContinuousExportsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    descriptions: S.optional(ContinuousExportDescriptions),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeContinuousExportsResponse",
}) as any as S.Schema<DescribeContinuousExportsResponse>;
export type ExportIds = string[];
export const ExportIds = /*@__PURE__*/ S.Array(S.String);
export interface DescribeExportConfigurationsRequest {
  exportIds?: string[];
  maxResults?: number;
  nextToken?: string;
}
export const DescribeExportConfigurationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exportIds: S.optional(ExportIds),
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
  identifier: "DescribeExportConfigurationsRequest",
}) as any as S.Schema<DescribeExportConfigurationsRequest>;
export type ExportStatus =
  | "FAILED"
  | "SUCCEEDED"
  | "IN_PROGRESS"
  | (string & {});
export const ExportStatus = /*@__PURE__*/ S.String;

export type ExportStatusMessage = string;
export type ConfigurationsDownloadUrl = string;
export type ExportRequestTime = Date;
export interface ExportInfo {
  exportId: string;
  exportStatus: ExportStatus;
  statusMessage: string;
  configurationsDownloadUrl?: string;
  exportRequestTime: Date;
  isTruncated?: boolean;
  requestedStartTime?: Date;
  requestedEndTime?: Date;
}
export const ExportInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exportId: S.String,
    exportStatus: ExportStatus,
    statusMessage: S.String,
    configurationsDownloadUrl: S.optional(S.String),
    exportRequestTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    isTruncated: S.optional(S.Boolean),
    requestedStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    requestedEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "ExportInfo" }) as any as S.Schema<ExportInfo>;
export type ExportsInfo = ExportInfo[];
export const ExportsInfo = /*@__PURE__*/ S.Array(ExportInfo);
export interface DescribeExportConfigurationsResponse {
  exportsInfo?: ExportInfo[];
  nextToken?: string;
}
export const DescribeExportConfigurationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      exportsInfo: S.optional(ExportsInfo),
      nextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "DescribeExportConfigurationsResponse",
}) as any as S.Schema<DescribeExportConfigurationsResponse>;
export type FilterName = string;
export interface ExportFilter {
  name: string;
  values: string[];
  condition: string;
}
export const ExportFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, values: FilterValues, condition: S.String }),
).annotate({ identifier: "ExportFilter" }) as any as S.Schema<ExportFilter>;
export type ExportFilters = ExportFilter[];
export const ExportFilters = /*@__PURE__*/ S.Array(ExportFilter);
export interface DescribeExportTasksRequest {
  exportIds?: string[];
  filters?: ExportFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const DescribeExportTasksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exportIds: S.optional(ExportIds),
    filters: S.optional(ExportFilters),
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
  identifier: "DescribeExportTasksRequest",
}) as any as S.Schema<DescribeExportTasksRequest>;
export interface DescribeExportTasksResponse {
  exportsInfo?: ExportInfo[];
  nextToken?: string;
}
export const DescribeExportTasksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exportsInfo: S.optional(ExportsInfo),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeExportTasksResponse",
}) as any as S.Schema<DescribeExportTasksResponse>;
export type ImportTaskFilterName =
  | "IMPORT_TASK_ID"
  | "STATUS"
  | "NAME"
  | "FILE_CLASSIFICATION"
  | (string & {});
export const ImportTaskFilterName = /*@__PURE__*/ S.String;

export type ImportTaskFilterValue = string;
export type ImportTaskFilterValueList = string[];
export const ImportTaskFilterValueList = /*@__PURE__*/ S.Array(S.String);
export interface ImportTaskFilter {
  name?: ImportTaskFilterName;
  values?: string[];
}
export const ImportTaskFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(ImportTaskFilterName),
    values: S.optional(ImportTaskFilterValueList),
  }),
).annotate({
  identifier: "ImportTaskFilter",
}) as any as S.Schema<ImportTaskFilter>;
export type DescribeImportTasksFilterList = ImportTaskFilter[];
export const DescribeImportTasksFilterList =
  /*@__PURE__*/ S.Array(ImportTaskFilter);
export type DescribeImportTasksMaxResults = number;
export interface DescribeImportTasksRequest {
  filters?: ImportTaskFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const DescribeImportTasksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.optional(DescribeImportTasksFilterList),
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
  identifier: "DescribeImportTasksRequest",
}) as any as S.Schema<DescribeImportTasksRequest>;
export type ClientRequestToken = string;
export type ImportTaskName = string;
export type ImportURL = string;
export type ImportStatus =
  | "IMPORT_IN_PROGRESS"
  | "IMPORT_COMPLETE"
  | "IMPORT_COMPLETE_WITH_ERRORS"
  | "IMPORT_FAILED"
  | "IMPORT_FAILED_SERVER_LIMIT_EXCEEDED"
  | "IMPORT_FAILED_RECORD_LIMIT_EXCEEDED"
  | "IMPORT_FAILED_UNSUPPORTED_FILE_TYPE"
  | "DELETE_IN_PROGRESS"
  | "DELETE_COMPLETE"
  | "DELETE_FAILED"
  | "DELETE_FAILED_LIMIT_EXCEEDED"
  | "INTERNAL_ERROR"
  | (string & {});
export const ImportStatus = /*@__PURE__*/ S.String;

export type FileClassification =
  | "MODELIZEIT_EXPORT"
  | "RVTOOLS_EXPORT"
  | "VMWARE_NSX_EXPORT"
  | "IMPORT_TEMPLATE"
  | (string & {});
export const FileClassification = /*@__PURE__*/ S.String;

export type S3PresignedUrl = string;
export interface ImportTask {
  importTaskId?: string;
  clientRequestToken?: string;
  name?: string;
  importUrl?: string;
  status?: ImportStatus;
  importRequestTime?: Date;
  importCompletionTime?: Date;
  importDeletedTime?: Date;
  fileClassification?: FileClassification;
  serverImportSuccess?: number;
  serverImportFailure?: number;
  applicationImportSuccess?: number;
  applicationImportFailure?: number;
  errorsAndFailedEntriesZip?: string;
}
export const ImportTask = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    importTaskId: S.optional(S.String),
    clientRequestToken: S.optional(S.String),
    name: S.optional(S.String),
    importUrl: S.optional(S.String),
    status: S.optional(ImportStatus),
    importRequestTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    importCompletionTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    importDeletedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    fileClassification: S.optional(FileClassification),
    serverImportSuccess: S.optional(S.Number),
    serverImportFailure: S.optional(S.Number),
    applicationImportSuccess: S.optional(S.Number),
    applicationImportFailure: S.optional(S.Number),
    errorsAndFailedEntriesZip: S.optional(S.String),
  }),
).annotate({ identifier: "ImportTask" }) as any as S.Schema<ImportTask>;
export type ImportTaskList = ImportTask[];
export const ImportTaskList = /*@__PURE__*/ S.Array(ImportTask);
export interface DescribeImportTasksResponse {
  nextToken?: string;
  tasks?: ImportTask[];
}
export const DescribeImportTasksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    tasks: S.optional(ImportTaskList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeImportTasksResponse",
}) as any as S.Schema<DescribeImportTasksResponse>;
export interface TagFilter {
  name: string;
  values: string[];
}
export const TagFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, values: FilterValues }),
).annotate({ identifier: "TagFilter" }) as any as S.Schema<TagFilter>;
export type TagFilters = TagFilter[];
export const TagFilters = /*@__PURE__*/ S.Array(TagFilter);
export interface DescribeTagsRequest {
  filters?: TagFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const DescribeTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.optional(TagFilters),
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
  identifier: "DescribeTagsRequest",
}) as any as S.Schema<DescribeTagsRequest>;
export type ConfigurationItemType =
  | "SERVER"
  | "PROCESS"
  | "CONNECTION"
  | "APPLICATION"
  | (string & {});
export const ConfigurationItemType = /*@__PURE__*/ S.String;

export interface ConfigurationTag {
  configurationType?: ConfigurationItemType;
  configurationId?: string;
  key?: string;
  value?: string;
  timeOfCreation?: Date;
}
export const ConfigurationTag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configurationType: S.optional(ConfigurationItemType),
    configurationId: S.optional(S.String),
    key: S.optional(S.String),
    value: S.optional(S.String),
    timeOfCreation: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ConfigurationTag",
}) as any as S.Schema<ConfigurationTag>;
export type ConfigurationTagSet = ConfigurationTag[];
export const ConfigurationTagSet = /*@__PURE__*/ S.Array(
  ConfigurationTag.pipe(T.XmlName("item")).annotate({
    identifier: "ConfigurationTag",
  }),
);
export interface DescribeTagsResponse {
  tags?: ConfigurationTag[];
  nextToken?: string;
}
export const DescribeTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tags: S.optional(ConfigurationTagSet),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeTagsResponse",
}) as any as S.Schema<DescribeTagsResponse>;
export interface DisassociateConfigurationItemsFromApplicationRequest {
  applicationConfigurationId: string;
  configurationIds: string[];
}
export const DisassociateConfigurationItemsFromApplicationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      applicationConfigurationId: S.String,
      configurationIds: ConfigurationIdList,
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
    identifier: "DisassociateConfigurationItemsFromApplicationRequest",
  }) as any as S.Schema<DisassociateConfigurationItemsFromApplicationRequest>;
export interface DisassociateConfigurationItemsFromApplicationResponse {}
export const DisassociateConfigurationItemsFromApplicationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "DisassociateConfigurationItemsFromApplicationResponse",
  }) as any as S.Schema<DisassociateConfigurationItemsFromApplicationResponse>;
export interface ExportConfigurationsRequest {}
export const ExportConfigurationsRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "ExportConfigurationsRequest",
}) as any as S.Schema<ExportConfigurationsRequest>;
export interface ExportConfigurationsResponse {
  exportId?: string;
}
export const ExportConfigurationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ exportId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "ExportConfigurationsResponse",
}) as any as S.Schema<ExportConfigurationsResponse>;
export interface GetDiscoverySummaryRequest {}
export const GetDiscoverySummaryRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "GetDiscoverySummaryRequest",
}) as any as S.Schema<GetDiscoverySummaryRequest>;
export interface CustomerAgentInfo {
  activeAgents: number;
  healthyAgents: number;
  blackListedAgents: number;
  shutdownAgents: number;
  unhealthyAgents: number;
  totalAgents: number;
  unknownAgents: number;
}
export const CustomerAgentInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    activeAgents: S.Number,
    healthyAgents: S.Number,
    blackListedAgents: S.Number,
    shutdownAgents: S.Number,
    unhealthyAgents: S.Number,
    totalAgents: S.Number,
    unknownAgents: S.Number,
  }),
).annotate({
  identifier: "CustomerAgentInfo",
}) as any as S.Schema<CustomerAgentInfo>;
export interface CustomerConnectorInfo {
  activeConnectors: number;
  healthyConnectors: number;
  blackListedConnectors: number;
  shutdownConnectors: number;
  unhealthyConnectors: number;
  totalConnectors: number;
  unknownConnectors: number;
}
export const CustomerConnectorInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    activeConnectors: S.Number,
    healthyConnectors: S.Number,
    blackListedConnectors: S.Number,
    shutdownConnectors: S.Number,
    unhealthyConnectors: S.Number,
    totalConnectors: S.Number,
    unknownConnectors: S.Number,
  }),
).annotate({
  identifier: "CustomerConnectorInfo",
}) as any as S.Schema<CustomerConnectorInfo>;
export interface CustomerMeCollectorInfo {
  activeMeCollectors: number;
  healthyMeCollectors: number;
  denyListedMeCollectors: number;
  shutdownMeCollectors: number;
  unhealthyMeCollectors: number;
  totalMeCollectors: number;
  unknownMeCollectors: number;
}
export const CustomerMeCollectorInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    activeMeCollectors: S.Number,
    healthyMeCollectors: S.Number,
    denyListedMeCollectors: S.Number,
    shutdownMeCollectors: S.Number,
    unhealthyMeCollectors: S.Number,
    totalMeCollectors: S.Number,
    unknownMeCollectors: S.Number,
  }),
).annotate({
  identifier: "CustomerMeCollectorInfo",
}) as any as S.Schema<CustomerMeCollectorInfo>;
export interface CustomerAgentlessCollectorInfo {
  activeAgentlessCollectors: number;
  healthyAgentlessCollectors: number;
  denyListedAgentlessCollectors: number;
  shutdownAgentlessCollectors: number;
  unhealthyAgentlessCollectors: number;
  totalAgentlessCollectors: number;
  unknownAgentlessCollectors: number;
}
export const CustomerAgentlessCollectorInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    activeAgentlessCollectors: S.Number,
    healthyAgentlessCollectors: S.Number,
    denyListedAgentlessCollectors: S.Number,
    shutdownAgentlessCollectors: S.Number,
    unhealthyAgentlessCollectors: S.Number,
    totalAgentlessCollectors: S.Number,
    unknownAgentlessCollectors: S.Number,
  }),
).annotate({
  identifier: "CustomerAgentlessCollectorInfo",
}) as any as S.Schema<CustomerAgentlessCollectorInfo>;
export interface GetDiscoverySummaryResponse {
  servers?: number;
  applications?: number;
  serversMappedToApplications?: number;
  serversMappedtoTags?: number;
  agentSummary?: CustomerAgentInfo;
  connectorSummary?: CustomerConnectorInfo;
  meCollectorSummary?: CustomerMeCollectorInfo;
  agentlessCollectorSummary?: CustomerAgentlessCollectorInfo;
}
export const GetDiscoverySummaryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    servers: S.optional(S.Number),
    applications: S.optional(S.Number),
    serversMappedToApplications: S.optional(S.Number),
    serversMappedtoTags: S.optional(S.Number),
    agentSummary: S.optional(CustomerAgentInfo),
    connectorSummary: S.optional(CustomerConnectorInfo),
    meCollectorSummary: S.optional(CustomerMeCollectorInfo),
    agentlessCollectorSummary: S.optional(CustomerAgentlessCollectorInfo),
  }).pipe(ns),
).annotate({
  identifier: "GetDiscoverySummaryResponse",
}) as any as S.Schema<GetDiscoverySummaryResponse>;
export type OrderByElementFieldName = string;
export type OrderString = "ASC" | "DESC" | (string & {});
export const OrderString = /*@__PURE__*/ S.String;

export interface OrderByElement {
  fieldName: string;
  sortOrder?: OrderString;
}
export const OrderByElement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fieldName: S.String, sortOrder: S.optional(OrderString) }),
).annotate({ identifier: "OrderByElement" }) as any as S.Schema<OrderByElement>;
export type OrderByList = OrderByElement[];
export const OrderByList = /*@__PURE__*/ S.Array(OrderByElement);
export interface ListConfigurationsRequest {
  configurationType: ConfigurationItemType;
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
  orderBy?: OrderByElement[];
}
export const ListConfigurationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configurationType: ConfigurationItemType,
    filters: S.optional(Filters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    orderBy: S.optional(OrderByList),
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
  identifier: "ListConfigurationsRequest",
}) as any as S.Schema<ListConfigurationsRequest>;
export type Configuration = { [key: string]: string | undefined };
export const Configuration = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type Configurations = { [key: string]: string | undefined }[];
export const Configurations = /*@__PURE__*/ S.Array(Configuration);
export interface ListConfigurationsResponse {
  configurations?: { [key: string]: string | undefined }[];
  nextToken?: string;
}
export const ListConfigurationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configurations: S.optional(Configurations),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListConfigurationsResponse",
}) as any as S.Schema<ListConfigurationsResponse>;
export interface ListServerNeighborsRequest {
  configurationId: string;
  portInformationNeeded?: boolean;
  neighborConfigurationIds?: string[];
  maxResults?: number;
  nextToken?: string;
}
export const ListServerNeighborsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configurationId: S.String,
    portInformationNeeded: S.optional(S.Boolean),
    neighborConfigurationIds: S.optional(ConfigurationIdList),
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
  identifier: "ListServerNeighborsRequest",
}) as any as S.Schema<ListServerNeighborsRequest>;
export type BoxedInteger = number;
export interface NeighborConnectionDetail {
  sourceServerId: string;
  destinationServerId: string;
  destinationPort?: number;
  transportProtocol?: string;
  connectionsCount: number;
}
export const NeighborConnectionDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceServerId: S.String,
    destinationServerId: S.String,
    destinationPort: S.optional(S.Number),
    transportProtocol: S.optional(S.String),
    connectionsCount: S.Number,
  }),
).annotate({
  identifier: "NeighborConnectionDetail",
}) as any as S.Schema<NeighborConnectionDetail>;
export type NeighborDetailsList = NeighborConnectionDetail[];
export const NeighborDetailsList = /*@__PURE__*/ S.Array(
  NeighborConnectionDetail,
);
export interface ListServerNeighborsResponse {
  neighbors: NeighborConnectionDetail[];
  nextToken?: string;
  knownDependencyCount?: number;
}
export const ListServerNeighborsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    neighbors: NeighborDetailsList,
    nextToken: S.optional(S.String),
    knownDependencyCount: S.optional(S.Number),
  }).pipe(ns),
).annotate({
  identifier: "ListServerNeighborsResponse",
}) as any as S.Schema<ListServerNeighborsResponse>;
export interface StartBatchDeleteConfigurationTaskRequest {
  configurationType: DeletionConfigurationItemType;
  configurationIds: string[];
}
export const StartBatchDeleteConfigurationTaskRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      configurationType: DeletionConfigurationItemType,
      configurationIds: ConfigurationIdList,
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
  identifier: "StartBatchDeleteConfigurationTaskRequest",
}) as any as S.Schema<StartBatchDeleteConfigurationTaskRequest>;
export interface StartBatchDeleteConfigurationTaskResponse {
  taskId?: string;
}
export const StartBatchDeleteConfigurationTaskResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ taskId: S.optional(S.String) }).pipe(ns),
  ).annotate({
    identifier: "StartBatchDeleteConfigurationTaskResponse",
  }) as any as S.Schema<StartBatchDeleteConfigurationTaskResponse>;
export interface StartContinuousExportRequest {}
export const StartContinuousExportRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "StartContinuousExportRequest",
}) as any as S.Schema<StartContinuousExportRequest>;
export interface StartContinuousExportResponse {
  exportId?: string;
  s3Bucket?: string;
  startTime?: Date;
  dataSource?: DataSource;
  schemaStorageConfig?: { [key: string]: string | undefined };
}
export const StartContinuousExportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exportId: S.optional(S.String),
    s3Bucket: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    dataSource: S.optional(DataSource),
    schemaStorageConfig: S.optional(SchemaStorageConfig),
  }).pipe(ns),
).annotate({
  identifier: "StartContinuousExportResponse",
}) as any as S.Schema<StartContinuousExportResponse>;
export interface StartDataCollectionByAgentIdsRequest {
  agentIds: string[];
}
export const StartDataCollectionByAgentIdsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ agentIds: AgentIds }).pipe(
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
  identifier: "StartDataCollectionByAgentIdsRequest",
}) as any as S.Schema<StartDataCollectionByAgentIdsRequest>;
export interface AgentConfigurationStatus {
  agentId?: string;
  operationSucceeded?: boolean;
  description?: string;
}
export const AgentConfigurationStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentId: S.optional(S.String),
    operationSucceeded: S.optional(S.Boolean),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "AgentConfigurationStatus",
}) as any as S.Schema<AgentConfigurationStatus>;
export type AgentConfigurationStatusList = AgentConfigurationStatus[];
export const AgentConfigurationStatusList = /*@__PURE__*/ S.Array(
  AgentConfigurationStatus,
);
export interface StartDataCollectionByAgentIdsResponse {
  agentsConfigurationStatus?: AgentConfigurationStatus[];
}
export const StartDataCollectionByAgentIdsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      agentsConfigurationStatus: S.optional(AgentConfigurationStatusList),
    }).pipe(ns),
).annotate({
  identifier: "StartDataCollectionByAgentIdsResponse",
}) as any as S.Schema<StartDataCollectionByAgentIdsResponse>;
export type ExportDataFormat = "CSV" | (string & {});
export const ExportDataFormat = /*@__PURE__*/ S.String;

export type ExportDataFormats = ExportDataFormat[];
export const ExportDataFormats = /*@__PURE__*/ S.Array(ExportDataFormat);
export type ExportEnabled = boolean;
export type UsageMetricBasisName = string;
export type UsageMetricPercentageAdjust = number;
export interface UsageMetricBasis {
  name?: string;
  percentageAdjust?: number;
}
export const UsageMetricBasis = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    percentageAdjust: S.optional(S.Number),
  }),
).annotate({
  identifier: "UsageMetricBasis",
}) as any as S.Schema<UsageMetricBasis>;
export type Tenancy = "DEDICATED" | "SHARED" | (string & {});
export const Tenancy = /*@__PURE__*/ S.String;

export type EC2InstanceType = string;
export type ExcludedInstanceTypes = string[];
export const ExcludedInstanceTypes = /*@__PURE__*/ S.Array(S.String);
export type UserPreferredRegion = string;
export type PurchasingOption =
  | "ALL_UPFRONT"
  | "PARTIAL_UPFRONT"
  | "NO_UPFRONT"
  | (string & {});
export const PurchasingOption = /*@__PURE__*/ S.String;

export type OfferingClass = "STANDARD" | "CONVERTIBLE" | (string & {});
export const OfferingClass = /*@__PURE__*/ S.String;

export type TermLength = "ONE_YEAR" | "THREE_YEAR" | (string & {});
export const TermLength = /*@__PURE__*/ S.String;

export interface ReservedInstanceOptions {
  purchasingOption: PurchasingOption;
  offeringClass: OfferingClass;
  termLength: TermLength;
}
export const ReservedInstanceOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    purchasingOption: PurchasingOption,
    offeringClass: OfferingClass,
    termLength: TermLength,
  }),
).annotate({
  identifier: "ReservedInstanceOptions",
}) as any as S.Schema<ReservedInstanceOptions>;
export interface Ec2RecommendationsExportPreferences {
  enabled?: boolean;
  cpuPerformanceMetricBasis?: UsageMetricBasis;
  ramPerformanceMetricBasis?: UsageMetricBasis;
  tenancy?: Tenancy;
  excludedInstanceTypes?: string[];
  preferredRegion?: string;
  reservedInstanceOptions?: ReservedInstanceOptions;
}
export const Ec2RecommendationsExportPreferences = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.optional(S.Boolean),
    cpuPerformanceMetricBasis: S.optional(UsageMetricBasis),
    ramPerformanceMetricBasis: S.optional(UsageMetricBasis),
    tenancy: S.optional(Tenancy),
    excludedInstanceTypes: S.optional(ExcludedInstanceTypes),
    preferredRegion: S.optional(S.String),
    reservedInstanceOptions: S.optional(ReservedInstanceOptions),
  }),
).annotate({
  identifier: "Ec2RecommendationsExportPreferences",
}) as any as S.Schema<Ec2RecommendationsExportPreferences>;
export type ExportPreferences = {
  ec2RecommendationsPreferences: Ec2RecommendationsExportPreferences;
};
export const ExportPreferences = /*@__PURE__*/ S.Union([
  S.Struct({
    ec2RecommendationsPreferences: Ec2RecommendationsExportPreferences,
  }),
]);
export interface StartExportTaskRequest {
  exportDataFormat?: ExportDataFormat[];
  filters?: ExportFilter[];
  startTime?: Date;
  endTime?: Date;
  preferences?: ExportPreferences;
}
export const StartExportTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exportDataFormat: S.optional(ExportDataFormats),
    filters: S.optional(ExportFilters),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    preferences: S.optional(ExportPreferences),
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
  identifier: "StartExportTaskRequest",
}) as any as S.Schema<StartExportTaskRequest>;
export interface StartExportTaskResponse {
  exportId?: string;
}
export const StartExportTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ exportId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "StartExportTaskResponse",
}) as any as S.Schema<StartExportTaskResponse>;
export interface StartImportTaskRequest {
  clientRequestToken?: string;
  name: string;
  importUrl: string;
}
export const StartImportTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    name: S.String,
    importUrl: S.String,
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
  identifier: "StartImportTaskRequest",
}) as any as S.Schema<StartImportTaskRequest>;
export interface StartImportTaskResponse {
  task?: ImportTask;
}
export const StartImportTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ task: S.optional(ImportTask) }).pipe(ns),
).annotate({
  identifier: "StartImportTaskResponse",
}) as any as S.Schema<StartImportTaskResponse>;
export interface StopContinuousExportRequest {
  exportId: string;
}
export const StopContinuousExportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ exportId: S.String }).pipe(
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
  identifier: "StopContinuousExportRequest",
}) as any as S.Schema<StopContinuousExportRequest>;
export interface StopContinuousExportResponse {
  startTime?: Date;
  stopTime?: Date;
}
export const StopContinuousExportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    stopTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(ns),
).annotate({
  identifier: "StopContinuousExportResponse",
}) as any as S.Schema<StopContinuousExportResponse>;
export interface StopDataCollectionByAgentIdsRequest {
  agentIds: string[];
}
export const StopDataCollectionByAgentIdsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agentIds: AgentIds }).pipe(
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
  identifier: "StopDataCollectionByAgentIdsRequest",
}) as any as S.Schema<StopDataCollectionByAgentIdsRequest>;
export interface StopDataCollectionByAgentIdsResponse {
  agentsConfigurationStatus?: AgentConfigurationStatus[];
}
export const StopDataCollectionByAgentIdsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      agentsConfigurationStatus: S.optional(AgentConfigurationStatusList),
    }).pipe(ns),
).annotate({
  identifier: "StopDataCollectionByAgentIdsResponse",
}) as any as S.Schema<StopDataCollectionByAgentIdsResponse>;
export interface UpdateApplicationRequest {
  configurationId: string;
  name?: string;
  description?: string;
  wave?: string;
}
export const UpdateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configurationId: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    wave: S.optional(S.String),
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
  identifier: "UpdateApplicationRequest",
}) as any as S.Schema<UpdateApplicationRequest>;
export interface UpdateApplicationResponse {}
export const UpdateApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateApplicationResponse",
}) as any as S.Schema<UpdateApplicationResponse>;
export type Message = string;
export type AssociateConfigurationItemsToApplicationError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Associates one or more configuration items with an application.
 */
export const associateConfigurationItemsToApplication: API.OperationMethod<
  AssociateConfigurationItemsToApplicationRequest,
  AssociateConfigurationItemsToApplicationResponse,
  AssociateConfigurationItemsToApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateConfigurationItemsToApplicationRequest,
  output: AssociateConfigurationItemsToApplicationResponse,
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateConfigurationItemsToApplication",
}));

export type BatchDeleteAgentsError =
  | AuthorizationErrorException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Deletes one or more agents or collectors as specified by ID. Deleting an agent or collector does not
 * delete the previously discovered data.
 * To delete the data collected, use `StartBatchDeleteConfigurationTask`.
 */
export const batchDeleteAgents: API.OperationMethod<
  BatchDeleteAgentsRequest,
  BatchDeleteAgentsResponse,
  BatchDeleteAgentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteAgentsRequest,
  output: BatchDeleteAgentsResponse,
  errors: [
    AuthorizationErrorException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteAgents",
}));

export type BatchDeleteImportDataError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Deletes one or more import tasks, each identified by their import ID. Each import task has
 * a number of records that can identify servers or applications.
 *
 * Amazon Web Services Application Discovery Service has built-in matching logic that will identify when
 * discovered servers match existing entries that you've previously discovered, the information
 * for the already-existing discovered server is updated. When you delete an import task that
 * contains records that were used to match, the information in those matched records that comes
 * from the deleted records will also be deleted.
 */
export const batchDeleteImportData: API.OperationMethod<
  BatchDeleteImportDataRequest,
  BatchDeleteImportDataResponse,
  BatchDeleteImportDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteImportDataRequest,
  output: BatchDeleteImportDataResponse,
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteImportData",
}));

export type CreateApplicationError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Creates an application with the given name and description.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateApplicationRequest,
  output: CreateApplicationResponse,
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
}));

export type CreateTagsError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Creates one or more tags for configuration items. Tags are metadata that help you
 * categorize IT assets. This API accepts a list of multiple configuration items.
 *
 * Do not store sensitive information (like personal data) in tags.
 */
export const createTags: API.OperationMethod<
  CreateTagsRequest,
  CreateTagsResponse,
  CreateTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTagsRequest,
  output: CreateTagsResponse,
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTags",
}));

export type DeleteApplicationsError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Deletes a list of applications and their associations with configuration
 * items.
 */
export const deleteApplications: API.OperationMethod<
  DeleteApplicationsRequest,
  DeleteApplicationsResponse,
  DeleteApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApplicationsRequest,
  output: DeleteApplicationsResponse,
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplications",
}));

export type DeleteTagsError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Deletes the association between configuration items and one or more tags. This API
 * accepts a list of multiple configuration items.
 */
export const deleteTags: API.OperationMethod<
  DeleteTagsRequest,
  DeleteTagsResponse,
  DeleteTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTagsRequest,
  output: DeleteTagsResponse,
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTags",
}));

export type DescribeAgentsError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Lists agents or collectors as specified by ID or other filters. All agents/collectors
 * associated with your user can be listed if you call `DescribeAgents` as is
 * without passing any parameters.
 */
export const describeAgents: API.PaginatedOperationMethod<
  DescribeAgentsRequest,
  DescribeAgentsResponse,
  DescribeAgentsError,
  Credentials | HttpClient.HttpClient,
  AgentInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeAgentsRequest,
  output: DescribeAgentsResponse,
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAgents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "agentsInfo",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeBatchDeleteConfigurationTaskError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Takes a unique deletion task identifier as input and returns metadata about a configuration deletion task.
 */
export const describeBatchDeleteConfigurationTask: API.OperationMethod<
  DescribeBatchDeleteConfigurationTaskRequest,
  DescribeBatchDeleteConfigurationTaskResponse,
  DescribeBatchDeleteConfigurationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeBatchDeleteConfigurationTaskRequest,
  output: DescribeBatchDeleteConfigurationTaskResponse,
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBatchDeleteConfigurationTask",
}));

export type DescribeConfigurationsError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Retrieves attributes for a list of configuration item IDs.
 *
 * All of the supplied IDs must be for the same asset type from one of the
 * following:
 *
 * - server
 *
 * - application
 *
 * - process
 *
 * - connection
 *
 * Output fields are specific to the asset type specified. For example, the output for a
 * *server* configuration item includes a list of attributes about the
 * server, such as host name, operating system, number of network cards, etc.
 *
 * For a complete list of outputs for each asset type, see Using the DescribeConfigurations Action in the Amazon Web Services Application
 * Discovery Service User Guide.
 */
export const describeConfigurations: API.OperationMethod<
  DescribeConfigurationsRequest,
  DescribeConfigurationsResponse,
  DescribeConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeConfigurationsRequest,
  output: DescribeConfigurationsResponse,
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConfigurations",
}));

export type DescribeContinuousExportsError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Lists exports as specified by ID. All continuous exports associated with your user
 * can be listed if you call `DescribeContinuousExports` as is without passing
 * any parameters.
 */
export const describeContinuousExports: API.PaginatedOperationMethod<
  DescribeContinuousExportsRequest,
  DescribeContinuousExportsResponse,
  DescribeContinuousExportsError,
  Credentials | HttpClient.HttpClient,
  ContinuousExportDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeContinuousExportsRequest,
  output: DescribeContinuousExportsResponse,
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    OperationNotPermittedException,
    ResourceNotFoundException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContinuousExports",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "descriptions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeExportConfigurationsError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * `DescribeExportConfigurations` is deprecated. Use DescribeExportTasks, instead.
 */
export const describeExportConfigurations: API.PaginatedOperationMethod<
  DescribeExportConfigurationsRequest,
  DescribeExportConfigurationsResponse,
  DescribeExportConfigurationsError,
  Credentials | HttpClient.HttpClient,
  ExportInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeExportConfigurationsRequest,
  output: DescribeExportConfigurationsResponse,
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExportConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "exportsInfo",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeExportTasksError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Retrieve status of one or more export tasks. You can retrieve the status of up to 100
 * export tasks.
 */
export const describeExportTasks: API.PaginatedOperationMethod<
  DescribeExportTasksRequest,
  DescribeExportTasksResponse,
  DescribeExportTasksError,
  Credentials | HttpClient.HttpClient,
  ExportInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeExportTasksRequest,
  output: DescribeExportTasksResponse,
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExportTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "exportsInfo",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeImportTasksError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Returns an array of import tasks for your account, including status information, times,
 * IDs, the Amazon S3 Object URL for the import file, and more.
 */
export const describeImportTasks: API.PaginatedOperationMethod<
  DescribeImportTasksRequest,
  DescribeImportTasksResponse,
  DescribeImportTasksError,
  Credentials | HttpClient.HttpClient,
  ImportTask
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeImportTasksRequest,
  output: DescribeImportTasksResponse,
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImportTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tasks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeTagsError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Retrieves a list of configuration items that have tags as specified by the key-value
 * pairs, name and value, passed to the optional parameter `filters`.
 *
 * There are three valid tag filter names:
 *
 * - tagKey
 *
 * - tagValue
 *
 * - configurationId
 *
 * Also, all configuration items associated with your user that have tags can be
 * listed if you call `DescribeTags` as is without passing any parameters.
 */
export const describeTags: API.PaginatedOperationMethod<
  DescribeTagsRequest,
  DescribeTagsResponse,
  DescribeTagsError,
  Credentials | HttpClient.HttpClient,
  ConfigurationTag
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeTagsRequest,
  output: DescribeTagsResponse,
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTags",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tags",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DisassociateConfigurationItemsFromApplicationError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Disassociates one or more configuration items from an application.
 */
export const disassociateConfigurationItemsFromApplication: API.OperationMethod<
  DisassociateConfigurationItemsFromApplicationRequest,
  DisassociateConfigurationItemsFromApplicationResponse,
  DisassociateConfigurationItemsFromApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateConfigurationItemsFromApplicationRequest,
  output: DisassociateConfigurationItemsFromApplicationResponse,
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateConfigurationItemsFromApplication",
}));

export type ExportConfigurationsError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | OperationNotPermittedException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Deprecated. Use `StartExportTask` instead.
 *
 * Exports all discovered configuration data to an Amazon S3 bucket or an application that
 * enables you to view and evaluate the data. Data includes tags and tag associations, processes,
 * connections, servers, and system performance. This API returns an export ID that you can query
 * using the *DescribeExportConfigurations* API. The system imposes a limit of
 * two configuration exports in six hours.
 */
export const exportConfigurations: API.OperationMethod<
  ExportConfigurationsRequest,
  ExportConfigurationsResponse,
  ExportConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExportConfigurationsRequest,
  output: ExportConfigurationsResponse,
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    OperationNotPermittedException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportConfigurations",
}));

export type GetDiscoverySummaryError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Retrieves a short summary of discovered assets.
 *
 * This API operation takes no request parameters and is called as is at the command
 * prompt as shown in the example.
 */
export const getDiscoverySummary: API.OperationMethod<
  GetDiscoverySummaryRequest,
  GetDiscoverySummaryResponse,
  GetDiscoverySummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDiscoverySummaryRequest,
  output: GetDiscoverySummaryResponse,
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDiscoverySummary",
}));

export type ListConfigurationsError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Retrieves a list of configuration items as specified by the value passed to the
 * required parameter `configurationType`. Optional filtering may be applied to refine
 * search results.
 */
export const listConfigurations: API.PaginatedOperationMethod<
  ListConfigurationsRequest,
  ListConfigurationsResponse,
  ListConfigurationsError,
  Credentials | HttpClient.HttpClient,
  { [key: string]: string | undefined }
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConfigurationsRequest,
  output: ListConfigurationsResponse,
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "configurations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServerNeighborsError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Retrieves a list of servers that are one network hop away from a specified
 * server.
 */
export const listServerNeighbors: API.OperationMethod<
  ListServerNeighborsRequest,
  ListServerNeighborsResponse,
  ListServerNeighborsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListServerNeighborsRequest,
  output: ListServerNeighborsResponse,
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServerNeighbors",
}));

export type StartBatchDeleteConfigurationTaskError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | LimitExceededException
  | OperationNotPermittedException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Takes a list of configurationId as input and starts an asynchronous deletion
 * task to remove the configurationItems. Returns a unique deletion task identifier.
 */
export const startBatchDeleteConfigurationTask: API.OperationMethod<
  StartBatchDeleteConfigurationTaskRequest,
  StartBatchDeleteConfigurationTaskResponse,
  StartBatchDeleteConfigurationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartBatchDeleteConfigurationTaskRequest,
  output: StartBatchDeleteConfigurationTaskResponse,
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    LimitExceededException,
    OperationNotPermittedException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartBatchDeleteConfigurationTask",
}));

export type StartContinuousExportError =
  | AuthorizationErrorException
  | ConflictErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | OperationNotPermittedException
  | ResourceInUseException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Start the continuous flow of agent's discovered data into Amazon Athena.
 */
export const startContinuousExport: API.OperationMethod<
  StartContinuousExportRequest,
  StartContinuousExportResponse,
  StartContinuousExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartContinuousExportRequest,
  output: StartContinuousExportResponse,
  errors: [
    AuthorizationErrorException,
    ConflictErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    OperationNotPermittedException,
    ResourceInUseException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartContinuousExport",
}));

export type StartDataCollectionByAgentIdsError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Instructs the specified agents to start collecting data.
 */
export const startDataCollectionByAgentIds: API.OperationMethod<
  StartDataCollectionByAgentIdsRequest,
  StartDataCollectionByAgentIdsResponse,
  StartDataCollectionByAgentIdsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartDataCollectionByAgentIdsRequest,
  output: StartDataCollectionByAgentIdsResponse,
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDataCollectionByAgentIds",
}));

export type StartExportTaskError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | OperationNotPermittedException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Begins the export of a discovered data report to an Amazon S3 bucket managed by Amazon Web Services.
 *
 * Exports might provide an estimate of fees and savings based on certain information
 * that you provide. Fee estimates do not include any taxes that might apply.
 * Your actual fees and savings depend on a variety of factors, including your actual usage of Amazon Web Services
 * services, which might vary from the estimates provided in this report.
 *
 * If you do not specify `preferences` or `agentIds` in the filter, a
 * summary of all servers, applications, tags, and performance is generated. This data is an
 * aggregation of all server data collected through on-premises tooling, file import, application
 * grouping and applying tags.
 *
 * If you specify `agentIds` in a filter, the task exports up to 72 hours of
 * detailed data collected by the identified Application Discovery Agent, including network,
 * process, and performance details. A time range for exported agent data may be set by using
 * `startTime` and `endTime`. Export of detailed agent data is limited to
 * five concurrently running exports.
 * Export of detailed agent data is limited to two exports per day.
 *
 * If you enable `ec2RecommendationsPreferences` in `preferences`
 * , an
 * Amazon EC2 instance matching the characteristics of each server in Application Discovery Service is generated.
 * Changing the attributes of the `ec2RecommendationsPreferences` changes the
 * criteria of the recommendation.
 */
export const startExportTask: API.OperationMethod<
  StartExportTaskRequest,
  StartExportTaskResponse,
  StartExportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartExportTaskRequest,
  output: StartExportTaskResponse,
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    OperationNotPermittedException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartExportTask",
}));

export type StartImportTaskError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ResourceInUseException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Starts an import task, which allows you to import details of your on-premises environment
 * directly into Amazon Web Services Migration Hub without having to use the Amazon Web Services Application Discovery
 * Service (Application Discovery Service) tools such as the Amazon Web Services Application Discovery Service Agentless Collector
 * or Application Discovery Agent. This gives you the option to
 * perform migration assessment and planning directly from your imported data, including the
 * ability to group your devices as applications and track their migration status.
 *
 * To start an import request, do this:
 *
 * - Download the specially formatted comma separated value (CSV) import template, which
 * you can find here: https://s3.us-west-2.amazonaws.com/templates-7cffcf56-bd96-4b1c-b45b-a5b42f282e46/import_template.csv.
 *
 * - Fill out the template with your server and application data.
 *
 * - Upload your import file to an Amazon S3 bucket, and make a note of it's Object URL.
 * Your import file must be in the CSV format.
 *
 * - Use the console or the `StartImportTask` command with the Amazon Web Services CLI or one
 * of the Amazon Web Services SDKs to import the records from your file.
 *
 * For more information, including step-by-step procedures, see Migration Hub
 * Import in the Amazon Web Services Application Discovery Service User
 * Guide.
 *
 * There are limits to the number of import tasks you can create (and delete) in an Amazon Web Services
 * account. For more information, see Amazon Web Services Application
 * Discovery Service Limits in the Amazon Web Services Application Discovery Service User
 * Guide.
 */
export const startImportTask: API.OperationMethod<
  StartImportTaskRequest,
  StartImportTaskResponse,
  StartImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartImportTaskRequest,
  output: StartImportTaskResponse,
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ResourceInUseException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImportTask",
}));

export type StopContinuousExportError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | OperationNotPermittedException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Stop the continuous flow of agent's discovered data into Amazon Athena.
 */
export const stopContinuousExport: API.OperationMethod<
  StopContinuousExportRequest,
  StopContinuousExportResponse,
  StopContinuousExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopContinuousExportRequest,
  output: StopContinuousExportResponse,
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    OperationNotPermittedException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopContinuousExport",
}));

export type StopDataCollectionByAgentIdsError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Instructs the specified agents to stop collecting data.
 */
export const stopDataCollectionByAgentIds: API.OperationMethod<
  StopDataCollectionByAgentIdsRequest,
  StopDataCollectionByAgentIdsResponse,
  StopDataCollectionByAgentIdsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopDataCollectionByAgentIdsRequest,
  output: StopDataCollectionByAgentIdsResponse,
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDataCollectionByAgentIds",
}));

export type UpdateApplicationError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Updates metadata about an application.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApplicationRequest,
  output: UpdateApplicationResponse,
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
}));
