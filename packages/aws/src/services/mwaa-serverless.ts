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
  sdkId: "MWAA Serverless",
  serviceShapeName: "AmazonMWAAServerless",
});
const auth = T.AwsAuthSigv4({ name: "airflow-serverless" });
const ver = T.ServiceVersion("2024-07-26");
const proto = T.AwsProtocolsAwsJson1_0();
const rules = T.EndpointResolver((p, _) => {
  const { UseFIPS = false, Endpoint, Region } = p;
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
    return e(Endpoint);
  }
  if (Region != null) {
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (UseFIPS === true) {
          return e(
            `https://airflow-serverless-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://airflow-serverless.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
    {
      message: S.String.pipe(T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      RetryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class OperationTimeoutException
  extends /*@__PURE__*/ S.TaggedError<OperationTimeoutException>()(
    "OperationTimeoutException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(504),
  ).pipe(C.withTimeoutError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
      ServiceCode: S.String,
      QuotaCode: S.String,
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      ServiceCode: S.String,
      QuotaCode: S.String,
      RetryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      Reason: S.suspend(() => ValidationExceptionReason).annotate({
        identifier: "ValidationExceptionReason",
      }),
      FieldList: S.optional(
        S.suspend(() => ValidationExceptionFields).annotate({
          identifier: "ValidationExceptionFields",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type NameString = string;
export type IdempotencyTokenString = string;
export interface DefinitionS3Location {
  Bucket: string;
  ObjectKey: string;
  VersionId?: string;
}
export const DefinitionS3Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bucket: S.String,
    ObjectKey: S.String,
    VersionId: S.optional(S.String),
  }),
).annotate({
  identifier: "DefinitionS3Location",
}) as any as S.Schema<DefinitionS3Location>;
export interface S3Location {
  Bucket: string;
  ObjectKey: string;
  VersionId?: string;
}
export const S3Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bucket: S.String,
    ObjectKey: S.String,
    VersionId: S.optional(S.String),
  }),
).annotate({ identifier: "S3Location" }) as any as S.Schema<S3Location>;
export type Code = { S3Location: S3Location };
export const Code = /*@__PURE__*/ S.Union([
  S.Struct({ S3Location: S3Location }),
]);
export type RoleARN = string;
export type DescriptionString = string;
export type EncryptionType =
  | "AWS_MANAGED_KEY"
  | "CUSTOMER_MANAGED_KEY"
  | (string & {});
export const EncryptionType = S.String;

export interface EncryptionConfiguration {
  Type: EncryptionType;
  KmsKeyId?: string;
}
export const EncryptionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: EncryptionType, KmsKeyId: S.optional(S.String) }),
).annotate({
  identifier: "EncryptionConfiguration",
}) as any as S.Schema<EncryptionConfiguration>;
export interface LoggingConfiguration {
  LogGroupName: string;
}
export const LoggingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LogGroupName: S.String }),
).annotate({
  identifier: "LoggingConfiguration",
}) as any as S.Schema<LoggingConfiguration>;
export type EngineVersion = 1 | (number & {});
export const EngineVersion = S.Number;
export type SecurityGroupString = string;
export type SecurityGroupIds = string[];
export const SecurityGroupIds = /*@__PURE__*/ S.Array(S.String);
export type SubnetString = string;
export type SubnetIds = string[];
export const SubnetIds = /*@__PURE__*/ S.Array(S.String);
export interface NetworkConfiguration {
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
}
export const NetworkConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecurityGroupIds: S.optional(SecurityGroupIds),
    SubnetIds: S.optional(SubnetIds),
  }),
).annotate({
  identifier: "NetworkConfiguration",
}) as any as S.Schema<NetworkConfiguration>;
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export interface CreateWorkflowRequest {
  Name: string;
  ClientToken?: string;
  DefinitionS3Location: DefinitionS3Location;
  Code?: Code;
  RoleArn: string;
  Description?: string;
  EncryptionConfiguration?: EncryptionConfiguration;
  LoggingConfiguration?: LoggingConfiguration;
  EngineVersion?: EngineVersion;
  NetworkConfiguration?: NetworkConfiguration;
  Tags?: { [key: string]: string | undefined };
  TriggerMode?: string;
}
export const CreateWorkflowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    DefinitionS3Location: DefinitionS3Location,
    Code: S.optional(Code),
    RoleArn: S.String,
    Description: S.optional(S.String),
    EncryptionConfiguration: S.optional(EncryptionConfiguration),
    LoggingConfiguration: S.optional(LoggingConfiguration),
    EngineVersion: S.optional(EngineVersion),
    NetworkConfiguration: S.optional(NetworkConfiguration),
    Tags: S.optional(Tags),
    TriggerMode: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/workflows" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateWorkflowRequest",
}) as any as S.Schema<CreateWorkflowRequest>;
export type WorkflowArn = string;
export type TimestampValue = Date;
export type WorkflowStatus = "READY" | "DELETING" | (string & {});
export const WorkflowStatus = S.String;

export type WorkflowVersion = string;
export type IsLatestVersion = boolean;
export type WarningMessages = string[];
export const WarningMessages = /*@__PURE__*/ S.Array(S.String);
export interface CreateWorkflowResponse {
  WorkflowArn: string;
  CreatedAt?: Date;
  RevisionId?: string;
  WorkflowStatus?: WorkflowStatus;
  WorkflowVersion?: string;
  IsLatestVersion?: boolean;
  Warnings?: string[];
}
export const CreateWorkflowResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkflowArn: S.String,
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    RevisionId: S.optional(S.String),
    WorkflowStatus: S.optional(WorkflowStatus),
    WorkflowVersion: S.optional(S.String),
    IsLatestVersion: S.optional(S.Boolean),
    Warnings: S.optional(WarningMessages),
  }),
).annotate({
  identifier: "CreateWorkflowResponse",
}) as any as S.Schema<CreateWorkflowResponse>;
export interface DeleteWorkflowRequest {
  WorkflowArn: string;
  WorkflowVersion?: string;
}
export const DeleteWorkflowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkflowArn: S.String.pipe(T.HttpLabel("WorkflowArn")),
    WorkflowVersion: S.optional(S.String).pipe(T.HttpQuery("workflowVersion")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/workflows/{WorkflowArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteWorkflowRequest",
}) as any as S.Schema<DeleteWorkflowRequest>;
export interface DeleteWorkflowResponse {
  WorkflowArn: string;
  WorkflowVersion?: string;
}
export const DeleteWorkflowResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WorkflowArn: S.String, WorkflowVersion: S.optional(S.String) }),
).annotate({
  identifier: "DeleteWorkflowResponse",
}) as any as S.Schema<DeleteWorkflowResponse>;
export type IdString = string;
export interface GetTaskInstanceRequest {
  WorkflowArn: string;
  TaskInstanceId: string;
  RunId: string;
}
export const GetTaskInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkflowArn: S.String.pipe(T.HttpLabel("WorkflowArn")),
    TaskInstanceId: S.String.pipe(T.HttpLabel("TaskInstanceId")),
    RunId: S.String.pipe(T.HttpLabel("RunId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/workflows/{WorkflowArn}/runs/{RunId}/tasks/{TaskInstanceId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTaskInstanceRequest",
}) as any as S.Schema<GetTaskInstanceRequest>;
export type VersionId = string;
export type TaskInstanceStatus =
  | "QUEUED"
  | "FAILED"
  | "SCHEDULED"
  | "RUNNING"
  | "SUCCESS"
  | "UP_FOR_RESCHEDULE"
  | "UP_FOR_RETRY"
  | "UPSTREAM_FAILED"
  | "REMOVED"
  | "RESTARTING"
  | "DEFERRED"
  | "NONE"
  | "CANCELLED"
  | "TIMEOUT"
  | (string & {});
export const TaskInstanceStatus = S.String;

export type GenericMap = { [key: string]: string | undefined };
export const GenericMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface GetTaskInstanceResponse {
  WorkflowArn: string;
  RunId: string;
  TaskInstanceId: string;
  WorkflowVersion?: string;
  Status?: TaskInstanceStatus;
  DurationInSeconds?: number;
  OperatorName?: string;
  ModifiedAt?: Date;
  EndedAt?: Date;
  StartedAt?: Date;
  AttemptNumber?: number;
  ErrorMessage?: string;
  TaskId?: string;
  LogStream?: string;
  Xcom?: { [key: string]: string | undefined };
}
export const GetTaskInstanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkflowArn: S.String,
    RunId: S.String,
    TaskInstanceId: S.String,
    WorkflowVersion: S.optional(S.String),
    Status: S.optional(TaskInstanceStatus),
    DurationInSeconds: S.optional(S.Number),
    OperatorName: S.optional(S.String),
    ModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    StartedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    AttemptNumber: S.optional(S.Number),
    ErrorMessage: S.optional(S.String),
    TaskId: S.optional(S.String),
    LogStream: S.optional(S.String),
    Xcom: S.optional(GenericMap),
  }),
).annotate({
  identifier: "GetTaskInstanceResponse",
}) as any as S.Schema<GetTaskInstanceResponse>;
export interface GetWorkflowRequest {
  WorkflowArn: string;
  WorkflowVersion?: string;
}
export const GetWorkflowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkflowArn: S.String.pipe(T.HttpLabel("WorkflowArn")),
    WorkflowVersion: S.optional(S.String).pipe(T.HttpQuery("workflowVersion")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/workflows/{WorkflowArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWorkflowRequest",
}) as any as S.Schema<GetWorkflowRequest>;
export interface ScheduleConfiguration {
  CronExpression?: string;
}
export const ScheduleConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CronExpression: S.optional(S.String) }),
).annotate({
  identifier: "ScheduleConfiguration",
}) as any as S.Schema<ScheduleConfiguration>;
export interface GetWorkflowResponse {
  WorkflowArn: string;
  WorkflowVersion?: string;
  Name?: string;
  Description?: string;
  CreatedAt?: Date;
  ModifiedAt?: Date;
  EncryptionConfiguration?: EncryptionConfiguration;
  LoggingConfiguration?: LoggingConfiguration;
  EngineVersion?: EngineVersion;
  WorkflowStatus?: WorkflowStatus;
  DefinitionS3Location?: DefinitionS3Location;
  Code?: Code;
  CodeSnapshottedAt?: Date;
  ScheduleConfiguration?: ScheduleConfiguration;
  RoleArn?: string;
  NetworkConfiguration?: NetworkConfiguration;
  TriggerMode?: string;
  WorkflowDefinition?: string;
}
export const GetWorkflowResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkflowArn: S.String,
    WorkflowVersion: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EncryptionConfiguration: S.optional(EncryptionConfiguration),
    LoggingConfiguration: S.optional(LoggingConfiguration),
    EngineVersion: S.optional(EngineVersion),
    WorkflowStatus: S.optional(WorkflowStatus),
    DefinitionS3Location: S.optional(DefinitionS3Location),
    Code: S.optional(Code),
    CodeSnapshottedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ScheduleConfiguration: S.optional(ScheduleConfiguration),
    RoleArn: S.optional(S.String),
    NetworkConfiguration: S.optional(NetworkConfiguration),
    TriggerMode: S.optional(S.String),
    WorkflowDefinition: S.optional(S.String),
  }),
).annotate({
  identifier: "GetWorkflowResponse",
}) as any as S.Schema<GetWorkflowResponse>;
export interface GetWorkflowRunRequest {
  WorkflowArn: string;
  RunId: string;
}
export const GetWorkflowRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkflowArn: S.String.pipe(T.HttpLabel("WorkflowArn")),
    RunId: S.String.pipe(T.HttpLabel("RunId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/workflows/{WorkflowArn}/runs/{RunId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWorkflowRunRequest",
}) as any as S.Schema<GetWorkflowRunRequest>;
export type RunType = "ON_DEMAND" | "SCHEDULED" | (string & {});
export const RunType = S.String;

export type ObjectMap = { [key: string]: any | undefined };
export const ObjectMap = /*@__PURE__*/ S.Record(
  S.String,
  S.Any.pipe(S.optional),
);
export type TaskInstanceIds = string[];
export const TaskInstanceIds = /*@__PURE__*/ S.Array(S.String);
export type WorkflowRunStatus =
  | "STARTING"
  | "QUEUED"
  | "RUNNING"
  | "SUCCESS"
  | "FAILED"
  | "TIMEOUT"
  | "STOPPING"
  | "STOPPED"
  | (string & {});
export const WorkflowRunStatus = S.String;

export interface WorkflowRunDetail {
  WorkflowArn?: string;
  WorkflowVersion?: string;
  RunId?: string;
  RunType?: RunType;
  StartedOn?: Date;
  CreatedAt?: Date;
  CompletedOn?: Date;
  ModifiedAt?: Date;
  Duration?: number;
  ErrorMessage?: string;
  TaskInstances?: string[];
  RunState?: WorkflowRunStatus;
}
export const WorkflowRunDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkflowArn: S.optional(S.String),
    WorkflowVersion: S.optional(S.String),
    RunId: S.optional(S.String),
    RunType: S.optional(RunType),
    StartedOn: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    CompletedOn: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Duration: S.optional(S.Number),
    ErrorMessage: S.optional(S.String),
    TaskInstances: S.optional(TaskInstanceIds),
    RunState: S.optional(WorkflowRunStatus),
  }),
).annotate({
  identifier: "WorkflowRunDetail",
}) as any as S.Schema<WorkflowRunDetail>;
export interface GetWorkflowRunResponse {
  WorkflowArn?: string;
  WorkflowVersion?: string;
  RunId?: string;
  RunType?: RunType;
  OverrideParameters?: { [key: string]: any | undefined };
  RunDetail?: WorkflowRunDetail;
}
export const GetWorkflowRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkflowArn: S.optional(S.String),
    WorkflowVersion: S.optional(S.String),
    RunId: S.optional(S.String),
    RunType: S.optional(RunType),
    OverrideParameters: S.optional(ObjectMap),
    RunDetail: S.optional(WorkflowRunDetail),
  }),
).annotate({
  identifier: "GetWorkflowRunResponse",
}) as any as S.Schema<GetWorkflowRunResponse>;
export type TaggableResourceArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
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
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListTaskInstancesRequest {
  WorkflowArn: string;
  RunId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListTaskInstancesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkflowArn: S.String.pipe(T.HttpLabel("WorkflowArn")),
    RunId: S.String.pipe(T.HttpLabel("RunId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/workflows/{WorkflowArn}/runs/{RunId}/tasks",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTaskInstancesRequest",
}) as any as S.Schema<ListTaskInstancesRequest>;
export interface TaskInstanceSummary {
  WorkflowArn?: string;
  WorkflowVersion?: string;
  RunId?: string;
  TaskInstanceId?: string;
  Status?: TaskInstanceStatus;
  DurationInSeconds?: number;
  OperatorName?: string;
}
export const TaskInstanceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkflowArn: S.optional(S.String),
    WorkflowVersion: S.optional(S.String),
    RunId: S.optional(S.String),
    TaskInstanceId: S.optional(S.String),
    Status: S.optional(TaskInstanceStatus),
    DurationInSeconds: S.optional(S.Number),
    OperatorName: S.optional(S.String),
  }),
).annotate({
  identifier: "TaskInstanceSummary",
}) as any as S.Schema<TaskInstanceSummary>;
export type TaskInstanceSummaries = TaskInstanceSummary[];
export const TaskInstanceSummaries = /*@__PURE__*/ S.Array(TaskInstanceSummary);
export interface ListTaskInstancesResponse {
  TaskInstances?: TaskInstanceSummary[];
  NextToken?: string;
}
export const ListTaskInstancesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TaskInstances: S.optional(TaskInstanceSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTaskInstancesResponse",
}) as any as S.Schema<ListTaskInstancesResponse>;
export interface ListWorkflowRunsRequest {
  MaxResults?: number;
  NextToken?: string;
  WorkflowArn: string;
  WorkflowVersion?: string;
}
export const ListWorkflowRunsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    WorkflowArn: S.String.pipe(T.HttpLabel("WorkflowArn")),
    WorkflowVersion: S.optional(S.String).pipe(T.HttpQuery("workflowVersion")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/workflows/{WorkflowArn}/runs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWorkflowRunsRequest",
}) as any as S.Schema<ListWorkflowRunsRequest>;
export interface RunDetailSummary {
  Status?: WorkflowRunStatus;
  CreatedOn?: Date;
  StartedAt?: Date;
  EndedAt?: Date;
}
export const RunDetailSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(WorkflowRunStatus),
    CreatedOn: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    StartedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({
  identifier: "RunDetailSummary",
}) as any as S.Schema<RunDetailSummary>;
export interface WorkflowRunSummary {
  RunId?: string;
  WorkflowArn?: string;
  WorkflowVersion?: string;
  RunType?: RunType;
  RunDetailSummary?: RunDetailSummary;
}
export const WorkflowRunSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RunId: S.optional(S.String),
    WorkflowArn: S.optional(S.String),
    WorkflowVersion: S.optional(S.String),
    RunType: S.optional(RunType),
    RunDetailSummary: S.optional(RunDetailSummary),
  }),
).annotate({
  identifier: "WorkflowRunSummary",
}) as any as S.Schema<WorkflowRunSummary>;
export type WorkflowRunSummaries = WorkflowRunSummary[];
export const WorkflowRunSummaries = /*@__PURE__*/ S.Array(WorkflowRunSummary);
export interface ListWorkflowRunsResponse {
  WorkflowRuns?: WorkflowRunSummary[];
  NextToken?: string;
}
export const ListWorkflowRunsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkflowRuns: S.optional(WorkflowRunSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWorkflowRunsResponse",
}) as any as S.Schema<ListWorkflowRunsResponse>;
export interface ListWorkflowsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListWorkflowsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/workflows" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWorkflowsRequest",
}) as any as S.Schema<ListWorkflowsRequest>;
export interface WorkflowSummary {
  WorkflowArn: string;
  WorkflowVersion?: string;
  Name?: string;
  Description?: string;
  CreatedAt?: Date;
  ModifiedAt?: Date;
  WorkflowStatus?: WorkflowStatus;
  TriggerMode?: string;
}
export const WorkflowSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkflowArn: S.String,
    WorkflowVersion: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    WorkflowStatus: S.optional(WorkflowStatus),
    TriggerMode: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkflowSummary",
}) as any as S.Schema<WorkflowSummary>;
export type WorkflowSummaries = WorkflowSummary[];
export const WorkflowSummaries = /*@__PURE__*/ S.Array(WorkflowSummary);
export interface ListWorkflowsResponse {
  Workflows: WorkflowSummary[];
  NextToken?: string;
}
export const ListWorkflowsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Workflows: WorkflowSummaries, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListWorkflowsResponse",
}) as any as S.Schema<ListWorkflowsResponse>;
export interface ListWorkflowVersionsRequest {
  MaxResults?: number;
  NextToken?: string;
  WorkflowArn: string;
}
export const ListWorkflowVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    WorkflowArn: S.String.pipe(T.HttpLabel("WorkflowArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/workflows/{WorkflowArn}/versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWorkflowVersionsRequest",
}) as any as S.Schema<ListWorkflowVersionsRequest>;
export interface WorkflowVersionSummary {
  WorkflowVersion: string;
  WorkflowArn: string;
  IsLatestVersion?: boolean;
  CreatedAt?: Date;
  ModifiedAt?: Date;
  DefinitionS3Location?: DefinitionS3Location;
  ScheduleConfiguration?: ScheduleConfiguration;
  TriggerMode?: string;
}
export const WorkflowVersionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkflowVersion: S.String,
    WorkflowArn: S.String,
    IsLatestVersion: S.optional(S.Boolean),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DefinitionS3Location: S.optional(DefinitionS3Location),
    ScheduleConfiguration: S.optional(ScheduleConfiguration),
    TriggerMode: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkflowVersionSummary",
}) as any as S.Schema<WorkflowVersionSummary>;
export type WorkflowVersionSummaries = WorkflowVersionSummary[];
export const WorkflowVersionSummaries = /*@__PURE__*/ S.Array(
  WorkflowVersionSummary,
);
export interface ListWorkflowVersionsResponse {
  WorkflowVersions?: WorkflowVersionSummary[];
  NextToken?: string;
}
export const ListWorkflowVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkflowVersions: S.optional(WorkflowVersionSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWorkflowVersionsResponse",
}) as any as S.Schema<ListWorkflowVersionsResponse>;
export interface StartWorkflowRunRequest {
  WorkflowArn: string;
  ClientToken?: string;
  OverrideParameters?: { [key: string]: any | undefined };
  WorkflowVersion?: string;
}
export const StartWorkflowRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkflowArn: S.String.pipe(T.HttpLabel("WorkflowArn")),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    OverrideParameters: S.optional(ObjectMap),
    WorkflowVersion: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/workflows/{WorkflowArn}/runs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartWorkflowRunRequest",
}) as any as S.Schema<StartWorkflowRunRequest>;
export interface StartWorkflowRunResponse {
  RunId?: string;
  Status?: WorkflowRunStatus;
  StartedAt?: Date;
}
export const StartWorkflowRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RunId: S.optional(S.String),
    Status: S.optional(WorkflowRunStatus),
    StartedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "StartWorkflowRunResponse",
}) as any as S.Schema<StartWorkflowRunResponse>;
export interface StopWorkflowRunRequest {
  WorkflowArn: string;
  RunId: string;
}
export const StopWorkflowRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkflowArn: S.String.pipe(T.HttpLabel("WorkflowArn")),
    RunId: S.String.pipe(T.HttpLabel("RunId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/workflows/{WorkflowArn}/runs/{RunId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopWorkflowRunRequest",
}) as any as S.Schema<StopWorkflowRunRequest>;
export interface StopWorkflowRunResponse {
  WorkflowArn?: string;
  WorkflowVersion?: string;
  RunId?: string;
  Status?: WorkflowRunStatus;
}
export const StopWorkflowRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkflowArn: S.optional(S.String),
    WorkflowVersion: S.optional(S.String),
    RunId: S.optional(S.String),
    Status: S.optional(WorkflowRunStatus),
  }),
).annotate({
  identifier: "StopWorkflowRunResponse",
}) as any as S.Schema<StopWorkflowRunResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: Tags,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
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
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: TagKeys.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
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
export interface UpdateWorkflowRequest {
  WorkflowArn: string;
  DefinitionS3Location: DefinitionS3Location;
  Code?: Code;
  RoleArn: string;
  Description?: string;
  LoggingConfiguration?: LoggingConfiguration;
  EngineVersion?: EngineVersion;
  NetworkConfiguration?: NetworkConfiguration;
  TriggerMode?: string;
}
export const UpdateWorkflowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkflowArn: S.String.pipe(T.HttpLabel("WorkflowArn")),
    DefinitionS3Location: DefinitionS3Location,
    Code: S.optional(Code),
    RoleArn: S.String,
    Description: S.optional(S.String),
    LoggingConfiguration: S.optional(LoggingConfiguration),
    EngineVersion: S.optional(EngineVersion),
    NetworkConfiguration: S.optional(NetworkConfiguration),
    TriggerMode: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/workflows/{WorkflowArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateWorkflowRequest",
}) as any as S.Schema<UpdateWorkflowRequest>;
export interface UpdateWorkflowResponse {
  WorkflowArn: string;
  ModifiedAt?: Date;
  WorkflowVersion?: string;
  Warnings?: string[];
}
export const UpdateWorkflowResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkflowArn: S.String,
    ModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    WorkflowVersion: S.optional(S.String),
    Warnings: S.optional(WarningMessages),
  }),
).annotate({
  identifier: "UpdateWorkflowResponse",
}) as any as S.Schema<UpdateWorkflowResponse>;
export type ErrorMessage = string;
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "other"
  | (string & {});
export const ValidationExceptionReason = S.String;

export interface ValidationExceptionField {
  Name: string;
  Message: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFields = ValidationExceptionField[];
export const ValidationExceptionFields = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export type CreateWorkflowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | OperationTimeoutException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new workflow in Amazon Managed Workflows for Apache Airflow Serverless. This operation initializes a workflow with the specified configuration including the workflow definition, execution role, and optional settings for encryption, logging, and networking. You must provide the workflow definition as a YAML file stored in Amazon S3 that defines the DAG structure using supported Amazon Web Services operators. Amazon Managed Workflows for Apache Airflow Serverless automatically creates the first version of the workflow and sets up the necessary execution environment with multi-tenant isolation and security controls.
 */
export const createWorkflow: API.OperationMethod<
  CreateWorkflowRequest,
  CreateWorkflowResponse,
  CreateWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWorkflowRequest,
  output: CreateWorkflowResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    OperationTimeoutException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkflow",
}));

export type DeleteWorkflowError =
  | AccessDeniedException
  | InternalServerException
  | OperationTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a workflow and all its versions. This operation permanently removes the workflow and cannot be undone. Amazon Managed Workflows for Apache Airflow Serverless ensures that all associated resources are properly cleaned up, including stopping any running executions, removing scheduled triggers, and cleaning up execution history. The deletion process respects the multi-tenant isolation boundaries and ensures that no residual data or configurations remain that could affect other customers or workflows.
 */
export const deleteWorkflow: API.OperationMethod<
  DeleteWorkflowRequest,
  DeleteWorkflowResponse,
  DeleteWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWorkflowRequest,
  output: DeleteWorkflowResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    OperationTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkflow",
}));

export type GetTaskInstanceError =
  | AccessDeniedException
  | InternalServerException
  | OperationTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific task instance within a workflow run. Task instances represent individual tasks that are executed as part of a workflow in the Amazon Managed Workflows for Apache Airflow Serverless environment. Each task instance runs in an isolated ECS container with dedicated resources and security boundaries. The service tracks task execution state, retry attempts, and provides detailed timing and error information for troubleshooting and monitoring purposes.
 */
export const getTaskInstance: API.OperationMethod<
  GetTaskInstanceRequest,
  GetTaskInstanceResponse,
  GetTaskInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTaskInstanceRequest,
  output: GetTaskInstanceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    OperationTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTaskInstance",
}));

export type GetWorkflowError =
  | AccessDeniedException
  | InternalServerException
  | OperationTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a workflow, including its configuration, status, and metadata.
 */
export const getWorkflow: API.OperationMethod<
  GetWorkflowRequest,
  GetWorkflowResponse,
  GetWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWorkflowRequest,
  output: GetWorkflowResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    OperationTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflow",
}));

export type GetWorkflowRunError =
  | AccessDeniedException
  | InternalServerException
  | OperationTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific workflow run, including its status, execution details, and task instances.
 */
export const getWorkflowRun: API.OperationMethod<
  GetWorkflowRunRequest,
  GetWorkflowRunResponse,
  GetWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWorkflowRunRequest,
  output: GetWorkflowRunResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    OperationTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflowRun",
}));

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | OperationTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all tags that are associated with a specified Amazon Managed Workflows for Apache Airflow Serverless resource.
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
    OperationTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTaskInstancesError =
  | AccessDeniedException
  | InternalServerException
  | OperationTimeoutException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all task instances for a specific workflow run, with optional pagination support.
 */
export const listTaskInstances: API.PaginatedOperationMethod<
  ListTaskInstancesRequest,
  ListTaskInstancesResponse,
  ListTaskInstancesError,
  Credentials | HttpClient.HttpClient,
  TaskInstanceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTaskInstancesRequest,
  output: ListTaskInstancesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    OperationTimeoutException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTaskInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TaskInstances",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWorkflowRunsError =
  | AccessDeniedException
  | InternalServerException
  | OperationTimeoutException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all runs for a specified workflow, with optional pagination and filtering support.
 */
export const listWorkflowRuns: API.PaginatedOperationMethod<
  ListWorkflowRunsRequest,
  ListWorkflowRunsResponse,
  ListWorkflowRunsError,
  Credentials | HttpClient.HttpClient,
  WorkflowRunSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWorkflowRunsRequest,
  output: ListWorkflowRunsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    OperationTimeoutException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflowRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WorkflowRuns",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWorkflowsError =
  | AccessDeniedException
  | InternalServerException
  | OperationTimeoutException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all workflows in your account, with optional pagination support. This operation returns summary information for workflows, showing only the most recently created version of each workflow. Amazon Managed Workflows for Apache Airflow Serverless maintains workflow metadata in a highly available, distributed storage system that enables efficient querying and filtering. The service implements proper access controls to ensure you can only view workflows that you have permissions to access, supporting both individual and team-based workflow management scenarios.
 */
export const listWorkflows: API.PaginatedOperationMethod<
  ListWorkflowsRequest,
  ListWorkflowsResponse,
  ListWorkflowsError,
  Credentials | HttpClient.HttpClient,
  WorkflowSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWorkflowsRequest,
  output: ListWorkflowsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    OperationTimeoutException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflows",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Workflows",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWorkflowVersionsError =
  | AccessDeniedException
  | InternalServerException
  | OperationTimeoutException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all versions of a specified workflow, with optional pagination support.
 */
export const listWorkflowVersions: API.PaginatedOperationMethod<
  ListWorkflowVersionsRequest,
  ListWorkflowVersionsResponse,
  ListWorkflowVersionsError,
  Credentials | HttpClient.HttpClient,
  WorkflowVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWorkflowVersionsRequest,
  output: ListWorkflowVersionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    OperationTimeoutException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflowVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WorkflowVersions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type StartWorkflowRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | OperationTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a new execution of a workflow. This operation creates a workflow run that executes the tasks that are defined in the workflow. Amazon Managed Workflows for Apache Airflow Serverless schedules the workflow execution across its managed Airflow environment, automatically scaling ECS worker tasks based on the workload. The service handles task isolation, dependency resolution, and provides comprehensive monitoring and logging throughout the execution lifecycle.
 */
export const startWorkflowRun: API.OperationMethod<
  StartWorkflowRunRequest,
  StartWorkflowRunResponse,
  StartWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartWorkflowRunRequest,
  output: StartWorkflowRunResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    OperationTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartWorkflowRun",
}));

export type StopWorkflowRunError =
  | AccessDeniedException
  | InternalServerException
  | OperationTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a running workflow execution. This operation terminates all running tasks and prevents new tasks from starting. Amazon Managed Workflows for Apache Airflow Serverless gracefully shuts down the workflow execution by stopping task scheduling and terminating active ECS worker containers. The operation transitions the workflow run to a `STOPPING` state and then to `STOPPED` once all cleanup is complete. In-flight tasks may complete or be terminated depending on their current execution state.
 */
export const stopWorkflowRun: API.OperationMethod<
  StopWorkflowRunRequest,
  StopWorkflowRunResponse,
  StopWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopWorkflowRunRequest,
  output: StopWorkflowRunResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    OperationTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopWorkflowRun",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | OperationTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds tags to an Amazon Managed Workflows for Apache Airflow Serverless resource. Tags are key-value pairs that help you organize and categorize your resources.
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
    OperationTimeoutException,
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
  | InternalServerException
  | OperationTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from an Amazon Managed Workflows for Apache Airflow Serverless resource. This operation removes the specified tags from the resource.
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
    OperationTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateWorkflowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | OperationTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing workflow with new configuration settings. This operation allows you to modify the workflow definition, role, and other settings. When you update a workflow, Amazon Managed Workflows for Apache Airflow Serverless automatically creates a new version with the updated configuration and disables scheduling on all previous versions to ensure only one version is actively scheduled at a time. The update operation maintains workflow history while providing a clean transition to the new configuration.
 */
export const updateWorkflow: API.OperationMethod<
  UpdateWorkflowRequest,
  UpdateWorkflowResponse,
  UpdateWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWorkflowRequest,
  output: UpdateWorkflowResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    OperationTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkflow",
}));
