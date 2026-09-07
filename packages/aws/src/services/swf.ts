import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const ns = T.XmlNamespace("http://swf.amazonaws.com/doc/2012-01-25");
const svc = T.AwsApiService({
  sdkId: "SWF",
  serviceShapeName: "SimpleWorkflowService",
});
const auth = T.AwsAuthSigv4({ name: "swf" });
const ver = T.ServiceVersion("2012-01-25");
const proto = T.AwsProtocolsAwsJson1_0();
const rules = T.EndpointResolver((p, _) => {
  const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
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
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === true &&
          UseDualStack === false
        ) {
          return e(
            `https://swf.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            `https://swf-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://swf-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://swf-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://swf.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://swf.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class DefaultUndefinedFault
  extends /*@__PURE__*/ S.TaggedError<DefaultUndefinedFault>()(
    "DefaultUndefinedFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DomainAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<DomainAlreadyExistsFault>()(
    "DomainAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class DomainDeprecatedFault
  extends /*@__PURE__*/ S.TaggedError<DomainDeprecatedFault>()(
    "DomainDeprecatedFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class LimitExceededFault
  extends /*@__PURE__*/ S.TaggedError<LimitExceededFault>()(
    "LimitExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class OperationNotPermittedFault
  extends /*@__PURE__*/ S.TaggedError<OperationNotPermittedFault>()(
    "OperationNotPermittedFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TooManyTagsFault
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsFault>()(
    "TooManyTagsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TypeAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<TypeAlreadyExistsFault>()(
    "TypeAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class TypeDeprecatedFault
  extends /*@__PURE__*/ S.TaggedError<TypeDeprecatedFault>()(
    "TypeDeprecatedFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TypeNotDeprecatedFault
  extends /*@__PURE__*/ S.TaggedError<TypeNotDeprecatedFault>()(
    "TypeNotDeprecatedFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class UnknownResourceFault
  extends /*@__PURE__*/ S.TaggedError<UnknownResourceFault>()(
    "UnknownResourceFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class WorkflowExecutionAlreadyStartedFault
  extends /*@__PURE__*/ S.TaggedError<WorkflowExecutionAlreadyStartedFault>()(
    "WorkflowExecutionAlreadyStartedFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type DomainName = string;
export interface ExecutionTimeFilter {
  oldestDate: Date;
  latestDate?: Date;
}
export const ExecutionTimeFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    oldestDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    latestDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ExecutionTimeFilter",
}) as any as S.Schema<ExecutionTimeFilter>;
export type WorkflowId = string;
export interface WorkflowExecutionFilter {
  workflowId: string;
}
export const WorkflowExecutionFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workflowId: S.String }),
).annotate({
  identifier: "WorkflowExecutionFilter",
}) as any as S.Schema<WorkflowExecutionFilter>;
export type Name = string;
export type VersionOptional = string;
export interface WorkflowTypeFilter {
  name: string;
  version?: string;
}
export const WorkflowTypeFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, version: S.optional(S.String) }),
).annotate({
  identifier: "WorkflowTypeFilter",
}) as any as S.Schema<WorkflowTypeFilter>;
export type Tag = string;
export interface TagFilter {
  tag: string;
}
export const TagFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tag: S.String }),
).annotate({ identifier: "TagFilter" }) as any as S.Schema<TagFilter>;
export type CloseStatus =
  | "COMPLETED"
  | "FAILED"
  | "CANCELED"
  | "TERMINATED"
  | "CONTINUED_AS_NEW"
  | "TIMED_OUT"
  | (string & {});
export const CloseStatus = /*@__PURE__*/ S.String;

export interface CloseStatusFilter {
  status: CloseStatus;
}
export const CloseStatusFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: CloseStatus }),
).annotate({
  identifier: "CloseStatusFilter",
}) as any as S.Schema<CloseStatusFilter>;
export interface CountClosedWorkflowExecutionsInput {
  domain: string;
  startTimeFilter?: ExecutionTimeFilter;
  closeTimeFilter?: ExecutionTimeFilter;
  executionFilter?: WorkflowExecutionFilter;
  typeFilter?: WorkflowTypeFilter;
  tagFilter?: TagFilter;
  closeStatusFilter?: CloseStatusFilter;
}
export const CountClosedWorkflowExecutionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String,
    startTimeFilter: S.optional(ExecutionTimeFilter),
    closeTimeFilter: S.optional(ExecutionTimeFilter),
    executionFilter: S.optional(WorkflowExecutionFilter),
    typeFilter: S.optional(WorkflowTypeFilter),
    tagFilter: S.optional(TagFilter),
    closeStatusFilter: S.optional(CloseStatusFilter),
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
  identifier: "CountClosedWorkflowExecutionsInput",
}) as any as S.Schema<CountClosedWorkflowExecutionsInput>;
export type Count = number;
export type Truncated = boolean;
export interface WorkflowExecutionCount {
  count: number;
  truncated?: boolean;
}
export const WorkflowExecutionCount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ count: S.Number, truncated: S.optional(S.Boolean) }).pipe(ns),
).annotate({
  identifier: "WorkflowExecutionCount",
}) as any as S.Schema<WorkflowExecutionCount>;
export interface CountOpenWorkflowExecutionsInput {
  domain: string;
  startTimeFilter: ExecutionTimeFilter;
  typeFilter?: WorkflowTypeFilter;
  tagFilter?: TagFilter;
  executionFilter?: WorkflowExecutionFilter;
}
export const CountOpenWorkflowExecutionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String,
    startTimeFilter: ExecutionTimeFilter,
    typeFilter: S.optional(WorkflowTypeFilter),
    tagFilter: S.optional(TagFilter),
    executionFilter: S.optional(WorkflowExecutionFilter),
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
  identifier: "CountOpenWorkflowExecutionsInput",
}) as any as S.Schema<CountOpenWorkflowExecutionsInput>;
export interface TaskList {
  name: string;
}
export const TaskList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }),
).annotate({ identifier: "TaskList" }) as any as S.Schema<TaskList>;
export interface CountPendingActivityTasksInput {
  domain: string;
  taskList: TaskList;
}
export const CountPendingActivityTasksInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domain: S.String, taskList: TaskList }).pipe(
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
  identifier: "CountPendingActivityTasksInput",
}) as any as S.Schema<CountPendingActivityTasksInput>;
export interface PendingTaskCount {
  count: number;
  truncated?: boolean;
}
export const PendingTaskCount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ count: S.Number, truncated: S.optional(S.Boolean) }).pipe(ns),
).annotate({
  identifier: "PendingTaskCount",
}) as any as S.Schema<PendingTaskCount>;
export interface CountPendingDecisionTasksInput {
  domain: string;
  taskList: TaskList;
}
export const CountPendingDecisionTasksInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domain: S.String, taskList: TaskList }).pipe(
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
  identifier: "CountPendingDecisionTasksInput",
}) as any as S.Schema<CountPendingDecisionTasksInput>;
export type Version = string;
export interface ActivityType {
  name: string;
  version: string;
}
export const ActivityType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, version: S.String }),
).annotate({ identifier: "ActivityType" }) as any as S.Schema<ActivityType>;
export interface DeleteActivityTypeInput {
  domain: string;
  activityType: ActivityType;
}
export const DeleteActivityTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domain: S.String, activityType: ActivityType }).pipe(
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
  identifier: "DeleteActivityTypeInput",
}) as any as S.Schema<DeleteActivityTypeInput>;
export interface DeleteActivityTypeResponse {}
export const DeleteActivityTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteActivityTypeResponse",
}) as any as S.Schema<DeleteActivityTypeResponse>;
export interface WorkflowType {
  name: string;
  version: string;
}
export const WorkflowType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, version: S.String }),
).annotate({ identifier: "WorkflowType" }) as any as S.Schema<WorkflowType>;
export interface DeleteWorkflowTypeInput {
  domain: string;
  workflowType: WorkflowType;
}
export const DeleteWorkflowTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domain: S.String, workflowType: WorkflowType }).pipe(
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
  identifier: "DeleteWorkflowTypeInput",
}) as any as S.Schema<DeleteWorkflowTypeInput>;
export interface DeleteWorkflowTypeResponse {}
export const DeleteWorkflowTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteWorkflowTypeResponse",
}) as any as S.Schema<DeleteWorkflowTypeResponse>;
export interface DeprecateActivityTypeInput {
  domain: string;
  activityType: ActivityType;
}
export const DeprecateActivityTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domain: S.String, activityType: ActivityType }).pipe(
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
  identifier: "DeprecateActivityTypeInput",
}) as any as S.Schema<DeprecateActivityTypeInput>;
export interface DeprecateActivityTypeResponse {}
export const DeprecateActivityTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeprecateActivityTypeResponse",
}) as any as S.Schema<DeprecateActivityTypeResponse>;
export interface DeprecateDomainInput {
  name: string;
}
export const DeprecateDomainInput = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "DeprecateDomainInput",
}) as any as S.Schema<DeprecateDomainInput>;
export interface DeprecateDomainResponse {}
export const DeprecateDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeprecateDomainResponse",
}) as any as S.Schema<DeprecateDomainResponse>;
export interface DeprecateWorkflowTypeInput {
  domain: string;
  workflowType: WorkflowType;
}
export const DeprecateWorkflowTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domain: S.String, workflowType: WorkflowType }).pipe(
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
  identifier: "DeprecateWorkflowTypeInput",
}) as any as S.Schema<DeprecateWorkflowTypeInput>;
export interface DeprecateWorkflowTypeResponse {}
export const DeprecateWorkflowTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeprecateWorkflowTypeResponse",
}) as any as S.Schema<DeprecateWorkflowTypeResponse>;
export interface DescribeActivityTypeInput {
  domain: string;
  activityType: ActivityType;
}
export const DescribeActivityTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domain: S.String, activityType: ActivityType }).pipe(
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
  identifier: "DescribeActivityTypeInput",
}) as any as S.Schema<DescribeActivityTypeInput>;
export type RegistrationStatus = "REGISTERED" | "DEPRECATED" | (string & {});
export const RegistrationStatus = /*@__PURE__*/ S.String;

export type Description = string;
export interface ActivityTypeInfo {
  activityType: ActivityType;
  status: RegistrationStatus;
  description?: string;
  creationDate: Date;
  deprecationDate?: Date;
}
export const ActivityTypeInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    activityType: ActivityType,
    status: RegistrationStatus,
    description: S.optional(S.String),
    creationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    deprecationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "ActivityTypeInfo",
}) as any as S.Schema<ActivityTypeInfo>;
export type DurationInSecondsOptional = string;
export type TaskPriority = string;
export interface ActivityTypeConfiguration {
  defaultTaskStartToCloseTimeout?: string;
  defaultTaskHeartbeatTimeout?: string;
  defaultTaskList?: TaskList;
  defaultTaskPriority?: string;
  defaultTaskScheduleToStartTimeout?: string;
  defaultTaskScheduleToCloseTimeout?: string;
}
export const ActivityTypeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    defaultTaskStartToCloseTimeout: S.optional(S.String),
    defaultTaskHeartbeatTimeout: S.optional(S.String),
    defaultTaskList: S.optional(TaskList),
    defaultTaskPriority: S.optional(S.String),
    defaultTaskScheduleToStartTimeout: S.optional(S.String),
    defaultTaskScheduleToCloseTimeout: S.optional(S.String),
  }),
).annotate({
  identifier: "ActivityTypeConfiguration",
}) as any as S.Schema<ActivityTypeConfiguration>;
export interface ActivityTypeDetail {
  typeInfo: ActivityTypeInfo;
  configuration: ActivityTypeConfiguration;
}
export const ActivityTypeDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    typeInfo: ActivityTypeInfo,
    configuration: ActivityTypeConfiguration,
  }).pipe(ns),
).annotate({
  identifier: "ActivityTypeDetail",
}) as any as S.Schema<ActivityTypeDetail>;
export interface DescribeDomainInput {
  name: string;
}
export const DescribeDomainInput = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "DescribeDomainInput",
}) as any as S.Schema<DescribeDomainInput>;
export type Arn = string;
export interface DomainInfo {
  name: string;
  status: RegistrationStatus;
  description?: string;
  arn?: string;
}
export const DomainInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    status: RegistrationStatus,
    description: S.optional(S.String),
    arn: S.optional(S.String),
  }),
).annotate({ identifier: "DomainInfo" }) as any as S.Schema<DomainInfo>;
export type DurationInDays = string;
export interface DomainConfiguration {
  workflowExecutionRetentionPeriodInDays: string;
}
export const DomainConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workflowExecutionRetentionPeriodInDays: S.String }),
).annotate({
  identifier: "DomainConfiguration",
}) as any as S.Schema<DomainConfiguration>;
export interface DomainDetail {
  domainInfo: DomainInfo;
  configuration: DomainConfiguration;
}
export const DomainDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainInfo: DomainInfo, configuration: DomainConfiguration }).pipe(
    ns,
  ),
).annotate({ identifier: "DomainDetail" }) as any as S.Schema<DomainDetail>;
export type WorkflowRunId = string;
export interface WorkflowExecution {
  workflowId: string;
  runId: string;
}
export const WorkflowExecution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workflowId: S.String, runId: S.String }),
).annotate({
  identifier: "WorkflowExecution",
}) as any as S.Schema<WorkflowExecution>;
export interface DescribeWorkflowExecutionInput {
  domain: string;
  execution: WorkflowExecution;
}
export const DescribeWorkflowExecutionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domain: S.String, execution: WorkflowExecution }).pipe(
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
  identifier: "DescribeWorkflowExecutionInput",
}) as any as S.Schema<DescribeWorkflowExecutionInput>;
export type ExecutionStatus = "OPEN" | "CLOSED" | (string & {});
export const ExecutionStatus = /*@__PURE__*/ S.String;

export type TagList = string[];
export const TagList = /*@__PURE__*/ S.Array(S.String);
export type Canceled = boolean;
export interface WorkflowExecutionInfo {
  execution: WorkflowExecution;
  workflowType: WorkflowType;
  startTimestamp: Date;
  closeTimestamp?: Date;
  executionStatus: ExecutionStatus;
  closeStatus?: CloseStatus;
  parent?: WorkflowExecution;
  tagList?: string[];
  cancelRequested?: boolean;
}
export const WorkflowExecutionInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    execution: WorkflowExecution,
    workflowType: WorkflowType,
    startTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    closeTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    executionStatus: ExecutionStatus,
    closeStatus: S.optional(CloseStatus),
    parent: S.optional(WorkflowExecution),
    tagList: S.optional(TagList),
    cancelRequested: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "WorkflowExecutionInfo",
}) as any as S.Schema<WorkflowExecutionInfo>;
export type DurationInSeconds = string;
export type ChildPolicy =
  | "TERMINATE"
  | "REQUEST_CANCEL"
  | "ABANDON"
  | (string & {});
export const ChildPolicy = /*@__PURE__*/ S.String;

export interface WorkflowExecutionConfiguration {
  taskStartToCloseTimeout: string;
  executionStartToCloseTimeout: string;
  taskList: TaskList;
  taskPriority?: string;
  childPolicy: ChildPolicy;
  lambdaRole?: string;
}
export const WorkflowExecutionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskStartToCloseTimeout: S.String,
    executionStartToCloseTimeout: S.String,
    taskList: TaskList,
    taskPriority: S.optional(S.String),
    childPolicy: ChildPolicy,
    lambdaRole: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkflowExecutionConfiguration",
}) as any as S.Schema<WorkflowExecutionConfiguration>;
export type OpenDecisionTasksCount = number;
export interface WorkflowExecutionOpenCounts {
  openActivityTasks: number;
  openDecisionTasks: number;
  openTimers: number;
  openChildWorkflowExecutions: number;
  openLambdaFunctions?: number;
}
export const WorkflowExecutionOpenCounts = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    openActivityTasks: S.Number,
    openDecisionTasks: S.Number,
    openTimers: S.Number,
    openChildWorkflowExecutions: S.Number,
    openLambdaFunctions: S.optional(S.Number),
  }),
).annotate({
  identifier: "WorkflowExecutionOpenCounts",
}) as any as S.Schema<WorkflowExecutionOpenCounts>;
export type Data = string;
export interface WorkflowExecutionDetail {
  executionInfo: WorkflowExecutionInfo;
  executionConfiguration: WorkflowExecutionConfiguration;
  openCounts: WorkflowExecutionOpenCounts;
  latestActivityTaskTimestamp?: Date;
  latestExecutionContext?: string;
}
export const WorkflowExecutionDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionInfo: WorkflowExecutionInfo,
    executionConfiguration: WorkflowExecutionConfiguration,
    openCounts: WorkflowExecutionOpenCounts,
    latestActivityTaskTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    latestExecutionContext: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "WorkflowExecutionDetail",
}) as any as S.Schema<WorkflowExecutionDetail>;
export interface DescribeWorkflowTypeInput {
  domain: string;
  workflowType: WorkflowType;
}
export const DescribeWorkflowTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domain: S.String, workflowType: WorkflowType }).pipe(
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
  identifier: "DescribeWorkflowTypeInput",
}) as any as S.Schema<DescribeWorkflowTypeInput>;
export interface WorkflowTypeInfo {
  workflowType: WorkflowType;
  status: RegistrationStatus;
  description?: string;
  creationDate: Date;
  deprecationDate?: Date;
}
export const WorkflowTypeInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowType: WorkflowType,
    status: RegistrationStatus,
    description: S.optional(S.String),
    creationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    deprecationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "WorkflowTypeInfo",
}) as any as S.Schema<WorkflowTypeInfo>;
export interface WorkflowTypeConfiguration {
  defaultTaskStartToCloseTimeout?: string;
  defaultExecutionStartToCloseTimeout?: string;
  defaultTaskList?: TaskList;
  defaultTaskPriority?: string;
  defaultChildPolicy?: ChildPolicy;
  defaultLambdaRole?: string;
}
export const WorkflowTypeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    defaultTaskStartToCloseTimeout: S.optional(S.String),
    defaultExecutionStartToCloseTimeout: S.optional(S.String),
    defaultTaskList: S.optional(TaskList),
    defaultTaskPriority: S.optional(S.String),
    defaultChildPolicy: S.optional(ChildPolicy),
    defaultLambdaRole: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkflowTypeConfiguration",
}) as any as S.Schema<WorkflowTypeConfiguration>;
export interface WorkflowTypeDetail {
  typeInfo: WorkflowTypeInfo;
  configuration: WorkflowTypeConfiguration;
}
export const WorkflowTypeDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    typeInfo: WorkflowTypeInfo,
    configuration: WorkflowTypeConfiguration,
  }).pipe(ns),
).annotate({
  identifier: "WorkflowTypeDetail",
}) as any as S.Schema<WorkflowTypeDetail>;
export type PageToken = string;
export type PageSize = number;
export type ReverseOrder = boolean;
export interface GetWorkflowExecutionHistoryInput {
  domain: string;
  execution: WorkflowExecution;
  nextPageToken?: string;
  maximumPageSize?: number;
  reverseOrder?: boolean;
}
export const GetWorkflowExecutionHistoryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String,
    execution: WorkflowExecution,
    nextPageToken: S.optional(S.String),
    maximumPageSize: S.optional(S.Number),
    reverseOrder: S.optional(S.Boolean),
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
  identifier: "GetWorkflowExecutionHistoryInput",
}) as any as S.Schema<GetWorkflowExecutionHistoryInput>;
export type EventType =
  | "WorkflowExecutionStarted"
  | "WorkflowExecutionCancelRequested"
  | "WorkflowExecutionCompleted"
  | "CompleteWorkflowExecutionFailed"
  | "WorkflowExecutionFailed"
  | "FailWorkflowExecutionFailed"
  | "WorkflowExecutionTimedOut"
  | "WorkflowExecutionCanceled"
  | "CancelWorkflowExecutionFailed"
  | "WorkflowExecutionContinuedAsNew"
  | "ContinueAsNewWorkflowExecutionFailed"
  | "WorkflowExecutionTerminated"
  | "DecisionTaskScheduled"
  | "DecisionTaskStarted"
  | "DecisionTaskCompleted"
  | "DecisionTaskTimedOut"
  | "ActivityTaskScheduled"
  | "ScheduleActivityTaskFailed"
  | "ActivityTaskStarted"
  | "ActivityTaskCompleted"
  | "ActivityTaskFailed"
  | "ActivityTaskTimedOut"
  | "ActivityTaskCanceled"
  | "ActivityTaskCancelRequested"
  | "RequestCancelActivityTaskFailed"
  | "WorkflowExecutionSignaled"
  | "MarkerRecorded"
  | "RecordMarkerFailed"
  | "TimerStarted"
  | "StartTimerFailed"
  | "TimerFired"
  | "TimerCanceled"
  | "CancelTimerFailed"
  | "StartChildWorkflowExecutionInitiated"
  | "StartChildWorkflowExecutionFailed"
  | "ChildWorkflowExecutionStarted"
  | "ChildWorkflowExecutionCompleted"
  | "ChildWorkflowExecutionFailed"
  | "ChildWorkflowExecutionTimedOut"
  | "ChildWorkflowExecutionCanceled"
  | "ChildWorkflowExecutionTerminated"
  | "SignalExternalWorkflowExecutionInitiated"
  | "SignalExternalWorkflowExecutionFailed"
  | "ExternalWorkflowExecutionSignaled"
  | "RequestCancelExternalWorkflowExecutionInitiated"
  | "RequestCancelExternalWorkflowExecutionFailed"
  | "ExternalWorkflowExecutionCancelRequested"
  | "LambdaFunctionScheduled"
  | "LambdaFunctionStarted"
  | "LambdaFunctionCompleted"
  | "LambdaFunctionFailed"
  | "LambdaFunctionTimedOut"
  | "ScheduleLambdaFunctionFailed"
  | "StartLambdaFunctionFailed"
  | (string & {});
export const EventType = /*@__PURE__*/ S.String;

export type EventId = number;
export type WorkflowRunIdOptional = string;
export interface WorkflowExecutionStartedEventAttributes {
  input?: string;
  executionStartToCloseTimeout?: string;
  taskStartToCloseTimeout?: string;
  childPolicy: ChildPolicy;
  taskList: TaskList;
  taskPriority?: string;
  workflowType: WorkflowType;
  tagList?: string[];
  continuedExecutionRunId?: string;
  parentWorkflowExecution?: WorkflowExecution;
  parentInitiatedEventId?: number;
  lambdaRole?: string;
}
export const WorkflowExecutionStartedEventAttributes = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      input: S.optional(S.String),
      executionStartToCloseTimeout: S.optional(S.String),
      taskStartToCloseTimeout: S.optional(S.String),
      childPolicy: ChildPolicy,
      taskList: TaskList,
      taskPriority: S.optional(S.String),
      workflowType: WorkflowType,
      tagList: S.optional(TagList),
      continuedExecutionRunId: S.optional(S.String),
      parentWorkflowExecution: S.optional(WorkflowExecution),
      parentInitiatedEventId: S.optional(S.Number),
      lambdaRole: S.optional(S.String),
    }),
).annotate({
  identifier: "WorkflowExecutionStartedEventAttributes",
}) as any as S.Schema<WorkflowExecutionStartedEventAttributes>;
export interface WorkflowExecutionCompletedEventAttributes {
  result?: string;
  decisionTaskCompletedEventId: number;
}
export const WorkflowExecutionCompletedEventAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      result: S.optional(S.String),
      decisionTaskCompletedEventId: S.Number,
    }),
  ).annotate({
    identifier: "WorkflowExecutionCompletedEventAttributes",
  }) as any as S.Schema<WorkflowExecutionCompletedEventAttributes>;
export type CompleteWorkflowExecutionFailedCause =
  | "UNHANDLED_DECISION"
  | "OPERATION_NOT_PERMITTED"
  | (string & {});
export const CompleteWorkflowExecutionFailedCause = /*@__PURE__*/ S.String;

export interface CompleteWorkflowExecutionFailedEventAttributes {
  cause: CompleteWorkflowExecutionFailedCause;
  decisionTaskCompletedEventId: number;
}
export const CompleteWorkflowExecutionFailedEventAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      cause: CompleteWorkflowExecutionFailedCause,
      decisionTaskCompletedEventId: S.Number,
    }),
  ).annotate({
    identifier: "CompleteWorkflowExecutionFailedEventAttributes",
  }) as any as S.Schema<CompleteWorkflowExecutionFailedEventAttributes>;
export type FailureReason = string;
export interface WorkflowExecutionFailedEventAttributes {
  reason?: string;
  details?: string;
  decisionTaskCompletedEventId: number;
}
export const WorkflowExecutionFailedEventAttributes = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      reason: S.optional(S.String),
      details: S.optional(S.String),
      decisionTaskCompletedEventId: S.Number,
    }),
).annotate({
  identifier: "WorkflowExecutionFailedEventAttributes",
}) as any as S.Schema<WorkflowExecutionFailedEventAttributes>;
export type FailWorkflowExecutionFailedCause =
  | "UNHANDLED_DECISION"
  | "OPERATION_NOT_PERMITTED"
  | (string & {});
export const FailWorkflowExecutionFailedCause = /*@__PURE__*/ S.String;

export interface FailWorkflowExecutionFailedEventAttributes {
  cause: FailWorkflowExecutionFailedCause;
  decisionTaskCompletedEventId: number;
}
export const FailWorkflowExecutionFailedEventAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      cause: FailWorkflowExecutionFailedCause,
      decisionTaskCompletedEventId: S.Number,
    }),
  ).annotate({
    identifier: "FailWorkflowExecutionFailedEventAttributes",
  }) as any as S.Schema<FailWorkflowExecutionFailedEventAttributes>;
export type WorkflowExecutionTimeoutType = "START_TO_CLOSE" | (string & {});
export const WorkflowExecutionTimeoutType = /*@__PURE__*/ S.String;

export interface WorkflowExecutionTimedOutEventAttributes {
  timeoutType: WorkflowExecutionTimeoutType;
  childPolicy: ChildPolicy;
}
export const WorkflowExecutionTimedOutEventAttributes = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      timeoutType: WorkflowExecutionTimeoutType,
      childPolicy: ChildPolicy,
    }),
).annotate({
  identifier: "WorkflowExecutionTimedOutEventAttributes",
}) as any as S.Schema<WorkflowExecutionTimedOutEventAttributes>;
export interface WorkflowExecutionCanceledEventAttributes {
  details?: string;
  decisionTaskCompletedEventId: number;
}
export const WorkflowExecutionCanceledEventAttributes = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      details: S.optional(S.String),
      decisionTaskCompletedEventId: S.Number,
    }),
).annotate({
  identifier: "WorkflowExecutionCanceledEventAttributes",
}) as any as S.Schema<WorkflowExecutionCanceledEventAttributes>;
export type CancelWorkflowExecutionFailedCause =
  | "UNHANDLED_DECISION"
  | "OPERATION_NOT_PERMITTED"
  | (string & {});
export const CancelWorkflowExecutionFailedCause = /*@__PURE__*/ S.String;

export interface CancelWorkflowExecutionFailedEventAttributes {
  cause: CancelWorkflowExecutionFailedCause;
  decisionTaskCompletedEventId: number;
}
export const CancelWorkflowExecutionFailedEventAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      cause: CancelWorkflowExecutionFailedCause,
      decisionTaskCompletedEventId: S.Number,
    }),
  ).annotate({
    identifier: "CancelWorkflowExecutionFailedEventAttributes",
  }) as any as S.Schema<CancelWorkflowExecutionFailedEventAttributes>;
export interface WorkflowExecutionContinuedAsNewEventAttributes {
  input?: string;
  decisionTaskCompletedEventId: number;
  newExecutionRunId: string;
  executionStartToCloseTimeout?: string;
  taskList: TaskList;
  taskPriority?: string;
  taskStartToCloseTimeout?: string;
  childPolicy: ChildPolicy;
  tagList?: string[];
  workflowType: WorkflowType;
  lambdaRole?: string;
}
export const WorkflowExecutionContinuedAsNewEventAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      input: S.optional(S.String),
      decisionTaskCompletedEventId: S.Number,
      newExecutionRunId: S.String,
      executionStartToCloseTimeout: S.optional(S.String),
      taskList: TaskList,
      taskPriority: S.optional(S.String),
      taskStartToCloseTimeout: S.optional(S.String),
      childPolicy: ChildPolicy,
      tagList: S.optional(TagList),
      workflowType: WorkflowType,
      lambdaRole: S.optional(S.String),
    }),
  ).annotate({
    identifier: "WorkflowExecutionContinuedAsNewEventAttributes",
  }) as any as S.Schema<WorkflowExecutionContinuedAsNewEventAttributes>;
export type ContinueAsNewWorkflowExecutionFailedCause =
  | "UNHANDLED_DECISION"
  | "WORKFLOW_TYPE_DEPRECATED"
  | "WORKFLOW_TYPE_DOES_NOT_EXIST"
  | "DEFAULT_EXECUTION_START_TO_CLOSE_TIMEOUT_UNDEFINED"
  | "DEFAULT_TASK_START_TO_CLOSE_TIMEOUT_UNDEFINED"
  | "DEFAULT_TASK_LIST_UNDEFINED"
  | "DEFAULT_CHILD_POLICY_UNDEFINED"
  | "CONTINUE_AS_NEW_WORKFLOW_EXECUTION_RATE_EXCEEDED"
  | "OPERATION_NOT_PERMITTED"
  | (string & {});
export const ContinueAsNewWorkflowExecutionFailedCause = /*@__PURE__*/ S.String;

export interface ContinueAsNewWorkflowExecutionFailedEventAttributes {
  cause: ContinueAsNewWorkflowExecutionFailedCause;
  decisionTaskCompletedEventId: number;
}
export const ContinueAsNewWorkflowExecutionFailedEventAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      cause: ContinueAsNewWorkflowExecutionFailedCause,
      decisionTaskCompletedEventId: S.Number,
    }),
  ).annotate({
    identifier: "ContinueAsNewWorkflowExecutionFailedEventAttributes",
  }) as any as S.Schema<ContinueAsNewWorkflowExecutionFailedEventAttributes>;
export type TerminateReason = string;
export type WorkflowExecutionTerminatedCause =
  | "CHILD_POLICY_APPLIED"
  | "EVENT_LIMIT_EXCEEDED"
  | "OPERATOR_INITIATED"
  | (string & {});
export const WorkflowExecutionTerminatedCause = /*@__PURE__*/ S.String;

export interface WorkflowExecutionTerminatedEventAttributes {
  reason?: string;
  details?: string;
  childPolicy: ChildPolicy;
  cause?: WorkflowExecutionTerminatedCause;
}
export const WorkflowExecutionTerminatedEventAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      reason: S.optional(S.String),
      details: S.optional(S.String),
      childPolicy: ChildPolicy,
      cause: S.optional(WorkflowExecutionTerminatedCause),
    }),
  ).annotate({
    identifier: "WorkflowExecutionTerminatedEventAttributes",
  }) as any as S.Schema<WorkflowExecutionTerminatedEventAttributes>;
export type WorkflowExecutionCancelRequestedCause =
  | "CHILD_POLICY_APPLIED"
  | (string & {});
export const WorkflowExecutionCancelRequestedCause = /*@__PURE__*/ S.String;

export interface WorkflowExecutionCancelRequestedEventAttributes {
  externalWorkflowExecution?: WorkflowExecution;
  externalInitiatedEventId?: number;
  cause?: WorkflowExecutionCancelRequestedCause;
}
export const WorkflowExecutionCancelRequestedEventAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      externalWorkflowExecution: S.optional(WorkflowExecution),
      externalInitiatedEventId: S.optional(S.Number),
      cause: S.optional(WorkflowExecutionCancelRequestedCause),
    }),
  ).annotate({
    identifier: "WorkflowExecutionCancelRequestedEventAttributes",
  }) as any as S.Schema<WorkflowExecutionCancelRequestedEventAttributes>;
export interface DecisionTaskScheduledEventAttributes {
  taskList: TaskList;
  taskPriority?: string;
  startToCloseTimeout?: string;
  scheduleToStartTimeout?: string;
}
export const DecisionTaskScheduledEventAttributes = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      taskList: TaskList,
      taskPriority: S.optional(S.String),
      startToCloseTimeout: S.optional(S.String),
      scheduleToStartTimeout: S.optional(S.String),
    }),
).annotate({
  identifier: "DecisionTaskScheduledEventAttributes",
}) as any as S.Schema<DecisionTaskScheduledEventAttributes>;
export type Identity = string;
export interface DecisionTaskStartedEventAttributes {
  identity?: string;
  scheduledEventId: number;
}
export const DecisionTaskStartedEventAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identity: S.optional(S.String), scheduledEventId: S.Number }),
).annotate({
  identifier: "DecisionTaskStartedEventAttributes",
}) as any as S.Schema<DecisionTaskStartedEventAttributes>;
export interface DecisionTaskCompletedEventAttributes {
  executionContext?: string;
  scheduledEventId: number;
  startedEventId: number;
  taskList?: TaskList;
  taskListScheduleToStartTimeout?: string;
}
export const DecisionTaskCompletedEventAttributes = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      executionContext: S.optional(S.String),
      scheduledEventId: S.Number,
      startedEventId: S.Number,
      taskList: S.optional(TaskList),
      taskListScheduleToStartTimeout: S.optional(S.String),
    }),
).annotate({
  identifier: "DecisionTaskCompletedEventAttributes",
}) as any as S.Schema<DecisionTaskCompletedEventAttributes>;
export type DecisionTaskTimeoutType =
  | "START_TO_CLOSE"
  | "SCHEDULE_TO_START"
  | (string & {});
export const DecisionTaskTimeoutType = /*@__PURE__*/ S.String;

export interface DecisionTaskTimedOutEventAttributes {
  timeoutType: DecisionTaskTimeoutType;
  scheduledEventId: number;
  startedEventId: number;
}
export const DecisionTaskTimedOutEventAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timeoutType: DecisionTaskTimeoutType,
    scheduledEventId: S.Number,
    startedEventId: S.Number,
  }),
).annotate({
  identifier: "DecisionTaskTimedOutEventAttributes",
}) as any as S.Schema<DecisionTaskTimedOutEventAttributes>;
export type ActivityId = string;
export interface ActivityTaskScheduledEventAttributes {
  activityType: ActivityType;
  activityId: string;
  input?: string;
  control?: string;
  scheduleToStartTimeout?: string;
  scheduleToCloseTimeout?: string;
  startToCloseTimeout?: string;
  taskList: TaskList;
  taskPriority?: string;
  decisionTaskCompletedEventId: number;
  heartbeatTimeout?: string;
}
export const ActivityTaskScheduledEventAttributes = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      activityType: ActivityType,
      activityId: S.String,
      input: S.optional(S.String),
      control: S.optional(S.String),
      scheduleToStartTimeout: S.optional(S.String),
      scheduleToCloseTimeout: S.optional(S.String),
      startToCloseTimeout: S.optional(S.String),
      taskList: TaskList,
      taskPriority: S.optional(S.String),
      decisionTaskCompletedEventId: S.Number,
      heartbeatTimeout: S.optional(S.String),
    }),
).annotate({
  identifier: "ActivityTaskScheduledEventAttributes",
}) as any as S.Schema<ActivityTaskScheduledEventAttributes>;
export interface ActivityTaskStartedEventAttributes {
  identity?: string;
  scheduledEventId: number;
}
export const ActivityTaskStartedEventAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identity: S.optional(S.String), scheduledEventId: S.Number }),
).annotate({
  identifier: "ActivityTaskStartedEventAttributes",
}) as any as S.Schema<ActivityTaskStartedEventAttributes>;
export interface ActivityTaskCompletedEventAttributes {
  result?: string;
  scheduledEventId: number;
  startedEventId: number;
}
export const ActivityTaskCompletedEventAttributes = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      result: S.optional(S.String),
      scheduledEventId: S.Number,
      startedEventId: S.Number,
    }),
).annotate({
  identifier: "ActivityTaskCompletedEventAttributes",
}) as any as S.Schema<ActivityTaskCompletedEventAttributes>;
export interface ActivityTaskFailedEventAttributes {
  reason?: string;
  details?: string;
  scheduledEventId: number;
  startedEventId: number;
}
export const ActivityTaskFailedEventAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reason: S.optional(S.String),
    details: S.optional(S.String),
    scheduledEventId: S.Number,
    startedEventId: S.Number,
  }),
).annotate({
  identifier: "ActivityTaskFailedEventAttributes",
}) as any as S.Schema<ActivityTaskFailedEventAttributes>;
export type ActivityTaskTimeoutType =
  | "START_TO_CLOSE"
  | "SCHEDULE_TO_START"
  | "SCHEDULE_TO_CLOSE"
  | "HEARTBEAT"
  | (string & {});
export const ActivityTaskTimeoutType = /*@__PURE__*/ S.String;

export type LimitedData = string;
export interface ActivityTaskTimedOutEventAttributes {
  timeoutType: ActivityTaskTimeoutType;
  scheduledEventId: number;
  startedEventId: number;
  details?: string;
}
export const ActivityTaskTimedOutEventAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timeoutType: ActivityTaskTimeoutType,
    scheduledEventId: S.Number,
    startedEventId: S.Number,
    details: S.optional(S.String),
  }),
).annotate({
  identifier: "ActivityTaskTimedOutEventAttributes",
}) as any as S.Schema<ActivityTaskTimedOutEventAttributes>;
export interface ActivityTaskCanceledEventAttributes {
  details?: string;
  scheduledEventId: number;
  startedEventId: number;
  latestCancelRequestedEventId?: number;
}
export const ActivityTaskCanceledEventAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    details: S.optional(S.String),
    scheduledEventId: S.Number,
    startedEventId: S.Number,
    latestCancelRequestedEventId: S.optional(S.Number),
  }),
).annotate({
  identifier: "ActivityTaskCanceledEventAttributes",
}) as any as S.Schema<ActivityTaskCanceledEventAttributes>;
export interface ActivityTaskCancelRequestedEventAttributes {
  decisionTaskCompletedEventId: number;
  activityId: string;
}
export const ActivityTaskCancelRequestedEventAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ decisionTaskCompletedEventId: S.Number, activityId: S.String }),
  ).annotate({
    identifier: "ActivityTaskCancelRequestedEventAttributes",
  }) as any as S.Schema<ActivityTaskCancelRequestedEventAttributes>;
export type SignalName = string;
export interface WorkflowExecutionSignaledEventAttributes {
  signalName: string;
  input?: string;
  externalWorkflowExecution?: WorkflowExecution;
  externalInitiatedEventId?: number;
}
export const WorkflowExecutionSignaledEventAttributes = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      signalName: S.String,
      input: S.optional(S.String),
      externalWorkflowExecution: S.optional(WorkflowExecution),
      externalInitiatedEventId: S.optional(S.Number),
    }),
).annotate({
  identifier: "WorkflowExecutionSignaledEventAttributes",
}) as any as S.Schema<WorkflowExecutionSignaledEventAttributes>;
export type MarkerName = string;
export interface MarkerRecordedEventAttributes {
  markerName: string;
  details?: string;
  decisionTaskCompletedEventId: number;
}
export const MarkerRecordedEventAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    markerName: S.String,
    details: S.optional(S.String),
    decisionTaskCompletedEventId: S.Number,
  }),
).annotate({
  identifier: "MarkerRecordedEventAttributes",
}) as any as S.Schema<MarkerRecordedEventAttributes>;
export type RecordMarkerFailedCause = "OPERATION_NOT_PERMITTED" | (string & {});
export const RecordMarkerFailedCause = /*@__PURE__*/ S.String;

export interface RecordMarkerFailedEventAttributes {
  markerName: string;
  cause: RecordMarkerFailedCause;
  decisionTaskCompletedEventId: number;
}
export const RecordMarkerFailedEventAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    markerName: S.String,
    cause: RecordMarkerFailedCause,
    decisionTaskCompletedEventId: S.Number,
  }),
).annotate({
  identifier: "RecordMarkerFailedEventAttributes",
}) as any as S.Schema<RecordMarkerFailedEventAttributes>;
export type TimerId = string;
export interface TimerStartedEventAttributes {
  timerId: string;
  control?: string;
  startToFireTimeout: string;
  decisionTaskCompletedEventId: number;
}
export const TimerStartedEventAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timerId: S.String,
    control: S.optional(S.String),
    startToFireTimeout: S.String,
    decisionTaskCompletedEventId: S.Number,
  }),
).annotate({
  identifier: "TimerStartedEventAttributes",
}) as any as S.Schema<TimerStartedEventAttributes>;
export interface TimerFiredEventAttributes {
  timerId: string;
  startedEventId: number;
}
export const TimerFiredEventAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ timerId: S.String, startedEventId: S.Number }),
).annotate({
  identifier: "TimerFiredEventAttributes",
}) as any as S.Schema<TimerFiredEventAttributes>;
export interface TimerCanceledEventAttributes {
  timerId: string;
  startedEventId: number;
  decisionTaskCompletedEventId: number;
}
export const TimerCanceledEventAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timerId: S.String,
    startedEventId: S.Number,
    decisionTaskCompletedEventId: S.Number,
  }),
).annotate({
  identifier: "TimerCanceledEventAttributes",
}) as any as S.Schema<TimerCanceledEventAttributes>;
export interface StartChildWorkflowExecutionInitiatedEventAttributes {
  workflowId: string;
  workflowType: WorkflowType;
  control?: string;
  input?: string;
  executionStartToCloseTimeout?: string;
  taskList: TaskList;
  taskPriority?: string;
  decisionTaskCompletedEventId: number;
  childPolicy: ChildPolicy;
  taskStartToCloseTimeout?: string;
  tagList?: string[];
  lambdaRole?: string;
}
export const StartChildWorkflowExecutionInitiatedEventAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      workflowId: S.String,
      workflowType: WorkflowType,
      control: S.optional(S.String),
      input: S.optional(S.String),
      executionStartToCloseTimeout: S.optional(S.String),
      taskList: TaskList,
      taskPriority: S.optional(S.String),
      decisionTaskCompletedEventId: S.Number,
      childPolicy: ChildPolicy,
      taskStartToCloseTimeout: S.optional(S.String),
      tagList: S.optional(TagList),
      lambdaRole: S.optional(S.String),
    }),
  ).annotate({
    identifier: "StartChildWorkflowExecutionInitiatedEventAttributes",
  }) as any as S.Schema<StartChildWorkflowExecutionInitiatedEventAttributes>;
export interface ChildWorkflowExecutionStartedEventAttributes {
  workflowExecution: WorkflowExecution;
  workflowType: WorkflowType;
  initiatedEventId: number;
}
export const ChildWorkflowExecutionStartedEventAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      workflowExecution: WorkflowExecution,
      workflowType: WorkflowType,
      initiatedEventId: S.Number,
    }),
  ).annotate({
    identifier: "ChildWorkflowExecutionStartedEventAttributes",
  }) as any as S.Schema<ChildWorkflowExecutionStartedEventAttributes>;
export interface ChildWorkflowExecutionCompletedEventAttributes {
  workflowExecution: WorkflowExecution;
  workflowType: WorkflowType;
  result?: string;
  initiatedEventId: number;
  startedEventId: number;
}
export const ChildWorkflowExecutionCompletedEventAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      workflowExecution: WorkflowExecution,
      workflowType: WorkflowType,
      result: S.optional(S.String),
      initiatedEventId: S.Number,
      startedEventId: S.Number,
    }),
  ).annotate({
    identifier: "ChildWorkflowExecutionCompletedEventAttributes",
  }) as any as S.Schema<ChildWorkflowExecutionCompletedEventAttributes>;
export interface ChildWorkflowExecutionFailedEventAttributes {
  workflowExecution: WorkflowExecution;
  workflowType: WorkflowType;
  reason?: string;
  details?: string;
  initiatedEventId: number;
  startedEventId: number;
}
export const ChildWorkflowExecutionFailedEventAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      workflowExecution: WorkflowExecution,
      workflowType: WorkflowType,
      reason: S.optional(S.String),
      details: S.optional(S.String),
      initiatedEventId: S.Number,
      startedEventId: S.Number,
    }),
  ).annotate({
    identifier: "ChildWorkflowExecutionFailedEventAttributes",
  }) as any as S.Schema<ChildWorkflowExecutionFailedEventAttributes>;
export interface ChildWorkflowExecutionTimedOutEventAttributes {
  workflowExecution: WorkflowExecution;
  workflowType: WorkflowType;
  timeoutType: WorkflowExecutionTimeoutType;
  initiatedEventId: number;
  startedEventId: number;
}
export const ChildWorkflowExecutionTimedOutEventAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      workflowExecution: WorkflowExecution,
      workflowType: WorkflowType,
      timeoutType: WorkflowExecutionTimeoutType,
      initiatedEventId: S.Number,
      startedEventId: S.Number,
    }),
  ).annotate({
    identifier: "ChildWorkflowExecutionTimedOutEventAttributes",
  }) as any as S.Schema<ChildWorkflowExecutionTimedOutEventAttributes>;
export interface ChildWorkflowExecutionCanceledEventAttributes {
  workflowExecution: WorkflowExecution;
  workflowType: WorkflowType;
  details?: string;
  initiatedEventId: number;
  startedEventId: number;
}
export const ChildWorkflowExecutionCanceledEventAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      workflowExecution: WorkflowExecution,
      workflowType: WorkflowType,
      details: S.optional(S.String),
      initiatedEventId: S.Number,
      startedEventId: S.Number,
    }),
  ).annotate({
    identifier: "ChildWorkflowExecutionCanceledEventAttributes",
  }) as any as S.Schema<ChildWorkflowExecutionCanceledEventAttributes>;
export interface ChildWorkflowExecutionTerminatedEventAttributes {
  workflowExecution: WorkflowExecution;
  workflowType: WorkflowType;
  initiatedEventId: number;
  startedEventId: number;
}
export const ChildWorkflowExecutionTerminatedEventAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      workflowExecution: WorkflowExecution,
      workflowType: WorkflowType,
      initiatedEventId: S.Number,
      startedEventId: S.Number,
    }),
  ).annotate({
    identifier: "ChildWorkflowExecutionTerminatedEventAttributes",
  }) as any as S.Schema<ChildWorkflowExecutionTerminatedEventAttributes>;
export interface SignalExternalWorkflowExecutionInitiatedEventAttributes {
  workflowId: string;
  runId?: string;
  signalName: string;
  input?: string;
  decisionTaskCompletedEventId: number;
  control?: string;
}
export const SignalExternalWorkflowExecutionInitiatedEventAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      workflowId: S.String,
      runId: S.optional(S.String),
      signalName: S.String,
      input: S.optional(S.String),
      decisionTaskCompletedEventId: S.Number,
      control: S.optional(S.String),
    }),
  ).annotate({
    identifier: "SignalExternalWorkflowExecutionInitiatedEventAttributes",
  }) as any as S.Schema<SignalExternalWorkflowExecutionInitiatedEventAttributes>;
export interface ExternalWorkflowExecutionSignaledEventAttributes {
  workflowExecution: WorkflowExecution;
  initiatedEventId: number;
}
export const ExternalWorkflowExecutionSignaledEventAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      workflowExecution: WorkflowExecution,
      initiatedEventId: S.Number,
    }),
  ).annotate({
    identifier: "ExternalWorkflowExecutionSignaledEventAttributes",
  }) as any as S.Schema<ExternalWorkflowExecutionSignaledEventAttributes>;
export type SignalExternalWorkflowExecutionFailedCause =
  | "UNKNOWN_EXTERNAL_WORKFLOW_EXECUTION"
  | "SIGNAL_EXTERNAL_WORKFLOW_EXECUTION_RATE_EXCEEDED"
  | "OPERATION_NOT_PERMITTED"
  | (string & {});
export const SignalExternalWorkflowExecutionFailedCause =
  /*@__PURE__*/ S.String;

export interface SignalExternalWorkflowExecutionFailedEventAttributes {
  workflowId: string;
  runId?: string;
  cause: SignalExternalWorkflowExecutionFailedCause;
  initiatedEventId: number;
  decisionTaskCompletedEventId: number;
  control?: string;
}
export const SignalExternalWorkflowExecutionFailedEventAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      workflowId: S.String,
      runId: S.optional(S.String),
      cause: SignalExternalWorkflowExecutionFailedCause,
      initiatedEventId: S.Number,
      decisionTaskCompletedEventId: S.Number,
      control: S.optional(S.String),
    }),
  ).annotate({
    identifier: "SignalExternalWorkflowExecutionFailedEventAttributes",
  }) as any as S.Schema<SignalExternalWorkflowExecutionFailedEventAttributes>;
export interface ExternalWorkflowExecutionCancelRequestedEventAttributes {
  workflowExecution: WorkflowExecution;
  initiatedEventId: number;
}
export const ExternalWorkflowExecutionCancelRequestedEventAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      workflowExecution: WorkflowExecution,
      initiatedEventId: S.Number,
    }),
  ).annotate({
    identifier: "ExternalWorkflowExecutionCancelRequestedEventAttributes",
  }) as any as S.Schema<ExternalWorkflowExecutionCancelRequestedEventAttributes>;
export interface RequestCancelExternalWorkflowExecutionInitiatedEventAttributes {
  workflowId: string;
  runId?: string;
  decisionTaskCompletedEventId: number;
  control?: string;
}
export const RequestCancelExternalWorkflowExecutionInitiatedEventAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      workflowId: S.String,
      runId: S.optional(S.String),
      decisionTaskCompletedEventId: S.Number,
      control: S.optional(S.String),
    }),
  ).annotate({
    identifier:
      "RequestCancelExternalWorkflowExecutionInitiatedEventAttributes",
  }) as any as S.Schema<RequestCancelExternalWorkflowExecutionInitiatedEventAttributes>;
export type RequestCancelExternalWorkflowExecutionFailedCause =
  | "UNKNOWN_EXTERNAL_WORKFLOW_EXECUTION"
  | "REQUEST_CANCEL_EXTERNAL_WORKFLOW_EXECUTION_RATE_EXCEEDED"
  | "OPERATION_NOT_PERMITTED"
  | (string & {});
export const RequestCancelExternalWorkflowExecutionFailedCause =
  /*@__PURE__*/ S.String;

export interface RequestCancelExternalWorkflowExecutionFailedEventAttributes {
  workflowId: string;
  runId?: string;
  cause: RequestCancelExternalWorkflowExecutionFailedCause;
  initiatedEventId: number;
  decisionTaskCompletedEventId: number;
  control?: string;
}
export const RequestCancelExternalWorkflowExecutionFailedEventAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      workflowId: S.String,
      runId: S.optional(S.String),
      cause: RequestCancelExternalWorkflowExecutionFailedCause,
      initiatedEventId: S.Number,
      decisionTaskCompletedEventId: S.Number,
      control: S.optional(S.String),
    }),
  ).annotate({
    identifier: "RequestCancelExternalWorkflowExecutionFailedEventAttributes",
  }) as any as S.Schema<RequestCancelExternalWorkflowExecutionFailedEventAttributes>;
export type ScheduleActivityTaskFailedCause =
  | "ACTIVITY_TYPE_DEPRECATED"
  | "ACTIVITY_TYPE_DOES_NOT_EXIST"
  | "ACTIVITY_ID_ALREADY_IN_USE"
  | "OPEN_ACTIVITIES_LIMIT_EXCEEDED"
  | "ACTIVITY_CREATION_RATE_EXCEEDED"
  | "DEFAULT_SCHEDULE_TO_CLOSE_TIMEOUT_UNDEFINED"
  | "DEFAULT_TASK_LIST_UNDEFINED"
  | "DEFAULT_SCHEDULE_TO_START_TIMEOUT_UNDEFINED"
  | "DEFAULT_START_TO_CLOSE_TIMEOUT_UNDEFINED"
  | "DEFAULT_HEARTBEAT_TIMEOUT_UNDEFINED"
  | "OPERATION_NOT_PERMITTED"
  | (string & {});
export const ScheduleActivityTaskFailedCause = /*@__PURE__*/ S.String;

export interface ScheduleActivityTaskFailedEventAttributes {
  activityType: ActivityType;
  activityId: string;
  cause: ScheduleActivityTaskFailedCause;
  decisionTaskCompletedEventId: number;
}
export const ScheduleActivityTaskFailedEventAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      activityType: ActivityType,
      activityId: S.String,
      cause: ScheduleActivityTaskFailedCause,
      decisionTaskCompletedEventId: S.Number,
    }),
  ).annotate({
    identifier: "ScheduleActivityTaskFailedEventAttributes",
  }) as any as S.Schema<ScheduleActivityTaskFailedEventAttributes>;
export type RequestCancelActivityTaskFailedCause =
  | "ACTIVITY_ID_UNKNOWN"
  | "OPERATION_NOT_PERMITTED"
  | (string & {});
export const RequestCancelActivityTaskFailedCause = /*@__PURE__*/ S.String;

export interface RequestCancelActivityTaskFailedEventAttributes {
  activityId: string;
  cause: RequestCancelActivityTaskFailedCause;
  decisionTaskCompletedEventId: number;
}
export const RequestCancelActivityTaskFailedEventAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      activityId: S.String,
      cause: RequestCancelActivityTaskFailedCause,
      decisionTaskCompletedEventId: S.Number,
    }),
  ).annotate({
    identifier: "RequestCancelActivityTaskFailedEventAttributes",
  }) as any as S.Schema<RequestCancelActivityTaskFailedEventAttributes>;
export type StartTimerFailedCause =
  | "TIMER_ID_ALREADY_IN_USE"
  | "OPEN_TIMERS_LIMIT_EXCEEDED"
  | "TIMER_CREATION_RATE_EXCEEDED"
  | "OPERATION_NOT_PERMITTED"
  | (string & {});
export const StartTimerFailedCause = /*@__PURE__*/ S.String;

export interface StartTimerFailedEventAttributes {
  timerId: string;
  cause: StartTimerFailedCause;
  decisionTaskCompletedEventId: number;
}
export const StartTimerFailedEventAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timerId: S.String,
    cause: StartTimerFailedCause,
    decisionTaskCompletedEventId: S.Number,
  }),
).annotate({
  identifier: "StartTimerFailedEventAttributes",
}) as any as S.Schema<StartTimerFailedEventAttributes>;
export type CancelTimerFailedCause =
  | "TIMER_ID_UNKNOWN"
  | "OPERATION_NOT_PERMITTED"
  | (string & {});
export const CancelTimerFailedCause = /*@__PURE__*/ S.String;

export interface CancelTimerFailedEventAttributes {
  timerId: string;
  cause: CancelTimerFailedCause;
  decisionTaskCompletedEventId: number;
}
export const CancelTimerFailedEventAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timerId: S.String,
    cause: CancelTimerFailedCause,
    decisionTaskCompletedEventId: S.Number,
  }),
).annotate({
  identifier: "CancelTimerFailedEventAttributes",
}) as any as S.Schema<CancelTimerFailedEventAttributes>;
export type StartChildWorkflowExecutionFailedCause =
  | "WORKFLOW_TYPE_DOES_NOT_EXIST"
  | "WORKFLOW_TYPE_DEPRECATED"
  | "OPEN_CHILDREN_LIMIT_EXCEEDED"
  | "OPEN_WORKFLOWS_LIMIT_EXCEEDED"
  | "CHILD_CREATION_RATE_EXCEEDED"
  | "WORKFLOW_ALREADY_RUNNING"
  | "DEFAULT_EXECUTION_START_TO_CLOSE_TIMEOUT_UNDEFINED"
  | "DEFAULT_TASK_LIST_UNDEFINED"
  | "DEFAULT_TASK_START_TO_CLOSE_TIMEOUT_UNDEFINED"
  | "DEFAULT_CHILD_POLICY_UNDEFINED"
  | "OPERATION_NOT_PERMITTED"
  | (string & {});
export const StartChildWorkflowExecutionFailedCause = /*@__PURE__*/ S.String;

export interface StartChildWorkflowExecutionFailedEventAttributes {
  workflowType: WorkflowType;
  cause: StartChildWorkflowExecutionFailedCause;
  workflowId: string;
  initiatedEventId: number;
  decisionTaskCompletedEventId: number;
  control?: string;
}
export const StartChildWorkflowExecutionFailedEventAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      workflowType: WorkflowType,
      cause: StartChildWorkflowExecutionFailedCause,
      workflowId: S.String,
      initiatedEventId: S.Number,
      decisionTaskCompletedEventId: S.Number,
      control: S.optional(S.String),
    }),
  ).annotate({
    identifier: "StartChildWorkflowExecutionFailedEventAttributes",
  }) as any as S.Schema<StartChildWorkflowExecutionFailedEventAttributes>;
export type FunctionId = string;
export type FunctionName = string;
export type FunctionInput = string;
export interface LambdaFunctionScheduledEventAttributes {
  id: string;
  name: string;
  control?: string;
  input?: string;
  startToCloseTimeout?: string;
  decisionTaskCompletedEventId: number;
}
export const LambdaFunctionScheduledEventAttributes = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      id: S.String,
      name: S.String,
      control: S.optional(S.String),
      input: S.optional(S.String),
      startToCloseTimeout: S.optional(S.String),
      decisionTaskCompletedEventId: S.Number,
    }),
).annotate({
  identifier: "LambdaFunctionScheduledEventAttributes",
}) as any as S.Schema<LambdaFunctionScheduledEventAttributes>;
export interface LambdaFunctionStartedEventAttributes {
  scheduledEventId: number;
}
export const LambdaFunctionStartedEventAttributes = /*@__PURE__*/ S.suspend(
  () => S.Struct({ scheduledEventId: S.Number }),
).annotate({
  identifier: "LambdaFunctionStartedEventAttributes",
}) as any as S.Schema<LambdaFunctionStartedEventAttributes>;
export interface LambdaFunctionCompletedEventAttributes {
  scheduledEventId: number;
  startedEventId: number;
  result?: string;
}
export const LambdaFunctionCompletedEventAttributes = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      scheduledEventId: S.Number,
      startedEventId: S.Number,
      result: S.optional(S.String),
    }),
).annotate({
  identifier: "LambdaFunctionCompletedEventAttributes",
}) as any as S.Schema<LambdaFunctionCompletedEventAttributes>;
export interface LambdaFunctionFailedEventAttributes {
  scheduledEventId: number;
  startedEventId: number;
  reason?: string;
  details?: string;
}
export const LambdaFunctionFailedEventAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scheduledEventId: S.Number,
    startedEventId: S.Number,
    reason: S.optional(S.String),
    details: S.optional(S.String),
  }),
).annotate({
  identifier: "LambdaFunctionFailedEventAttributes",
}) as any as S.Schema<LambdaFunctionFailedEventAttributes>;
export type LambdaFunctionTimeoutType = "START_TO_CLOSE" | (string & {});
export const LambdaFunctionTimeoutType = /*@__PURE__*/ S.String;

export interface LambdaFunctionTimedOutEventAttributes {
  scheduledEventId: number;
  startedEventId: number;
  timeoutType?: LambdaFunctionTimeoutType;
}
export const LambdaFunctionTimedOutEventAttributes = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      scheduledEventId: S.Number,
      startedEventId: S.Number,
      timeoutType: S.optional(LambdaFunctionTimeoutType),
    }),
).annotate({
  identifier: "LambdaFunctionTimedOutEventAttributes",
}) as any as S.Schema<LambdaFunctionTimedOutEventAttributes>;
export type ScheduleLambdaFunctionFailedCause =
  | "ID_ALREADY_IN_USE"
  | "OPEN_LAMBDA_FUNCTIONS_LIMIT_EXCEEDED"
  | "LAMBDA_FUNCTION_CREATION_RATE_EXCEEDED"
  | "LAMBDA_SERVICE_NOT_AVAILABLE_IN_REGION"
  | (string & {});
export const ScheduleLambdaFunctionFailedCause = /*@__PURE__*/ S.String;

export interface ScheduleLambdaFunctionFailedEventAttributes {
  id: string;
  name: string;
  cause: ScheduleLambdaFunctionFailedCause;
  decisionTaskCompletedEventId: number;
}
export const ScheduleLambdaFunctionFailedEventAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      id: S.String,
      name: S.String,
      cause: ScheduleLambdaFunctionFailedCause,
      decisionTaskCompletedEventId: S.Number,
    }),
  ).annotate({
    identifier: "ScheduleLambdaFunctionFailedEventAttributes",
  }) as any as S.Schema<ScheduleLambdaFunctionFailedEventAttributes>;
export type StartLambdaFunctionFailedCause =
  | "ASSUME_ROLE_FAILED"
  | (string & {});
export const StartLambdaFunctionFailedCause = /*@__PURE__*/ S.String;

export type CauseMessage = string;
export interface StartLambdaFunctionFailedEventAttributes {
  scheduledEventId?: number;
  cause?: StartLambdaFunctionFailedCause;
  message?: string;
}
export const StartLambdaFunctionFailedEventAttributes = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      scheduledEventId: S.optional(S.Number),
      cause: S.optional(StartLambdaFunctionFailedCause),
      message: S.optional(S.String),
    }),
).annotate({
  identifier: "StartLambdaFunctionFailedEventAttributes",
}) as any as S.Schema<StartLambdaFunctionFailedEventAttributes>;
export interface HistoryEvent {
  eventTimestamp: Date;
  eventType: EventType;
  eventId: number;
  workflowExecutionStartedEventAttributes?: WorkflowExecutionStartedEventAttributes;
  workflowExecutionCompletedEventAttributes?: WorkflowExecutionCompletedEventAttributes;
  completeWorkflowExecutionFailedEventAttributes?: CompleteWorkflowExecutionFailedEventAttributes;
  workflowExecutionFailedEventAttributes?: WorkflowExecutionFailedEventAttributes;
  failWorkflowExecutionFailedEventAttributes?: FailWorkflowExecutionFailedEventAttributes;
  workflowExecutionTimedOutEventAttributes?: WorkflowExecutionTimedOutEventAttributes;
  workflowExecutionCanceledEventAttributes?: WorkflowExecutionCanceledEventAttributes;
  cancelWorkflowExecutionFailedEventAttributes?: CancelWorkflowExecutionFailedEventAttributes;
  workflowExecutionContinuedAsNewEventAttributes?: WorkflowExecutionContinuedAsNewEventAttributes;
  continueAsNewWorkflowExecutionFailedEventAttributes?: ContinueAsNewWorkflowExecutionFailedEventAttributes;
  workflowExecutionTerminatedEventAttributes?: WorkflowExecutionTerminatedEventAttributes;
  workflowExecutionCancelRequestedEventAttributes?: WorkflowExecutionCancelRequestedEventAttributes;
  decisionTaskScheduledEventAttributes?: DecisionTaskScheduledEventAttributes;
  decisionTaskStartedEventAttributes?: DecisionTaskStartedEventAttributes;
  decisionTaskCompletedEventAttributes?: DecisionTaskCompletedEventAttributes;
  decisionTaskTimedOutEventAttributes?: DecisionTaskTimedOutEventAttributes;
  activityTaskScheduledEventAttributes?: ActivityTaskScheduledEventAttributes;
  activityTaskStartedEventAttributes?: ActivityTaskStartedEventAttributes;
  activityTaskCompletedEventAttributes?: ActivityTaskCompletedEventAttributes;
  activityTaskFailedEventAttributes?: ActivityTaskFailedEventAttributes;
  activityTaskTimedOutEventAttributes?: ActivityTaskTimedOutEventAttributes;
  activityTaskCanceledEventAttributes?: ActivityTaskCanceledEventAttributes;
  activityTaskCancelRequestedEventAttributes?: ActivityTaskCancelRequestedEventAttributes;
  workflowExecutionSignaledEventAttributes?: WorkflowExecutionSignaledEventAttributes;
  markerRecordedEventAttributes?: MarkerRecordedEventAttributes;
  recordMarkerFailedEventAttributes?: RecordMarkerFailedEventAttributes;
  timerStartedEventAttributes?: TimerStartedEventAttributes;
  timerFiredEventAttributes?: TimerFiredEventAttributes;
  timerCanceledEventAttributes?: TimerCanceledEventAttributes;
  startChildWorkflowExecutionInitiatedEventAttributes?: StartChildWorkflowExecutionInitiatedEventAttributes;
  childWorkflowExecutionStartedEventAttributes?: ChildWorkflowExecutionStartedEventAttributes;
  childWorkflowExecutionCompletedEventAttributes?: ChildWorkflowExecutionCompletedEventAttributes;
  childWorkflowExecutionFailedEventAttributes?: ChildWorkflowExecutionFailedEventAttributes;
  childWorkflowExecutionTimedOutEventAttributes?: ChildWorkflowExecutionTimedOutEventAttributes;
  childWorkflowExecutionCanceledEventAttributes?: ChildWorkflowExecutionCanceledEventAttributes;
  childWorkflowExecutionTerminatedEventAttributes?: ChildWorkflowExecutionTerminatedEventAttributes;
  signalExternalWorkflowExecutionInitiatedEventAttributes?: SignalExternalWorkflowExecutionInitiatedEventAttributes;
  externalWorkflowExecutionSignaledEventAttributes?: ExternalWorkflowExecutionSignaledEventAttributes;
  signalExternalWorkflowExecutionFailedEventAttributes?: SignalExternalWorkflowExecutionFailedEventAttributes;
  externalWorkflowExecutionCancelRequestedEventAttributes?: ExternalWorkflowExecutionCancelRequestedEventAttributes;
  requestCancelExternalWorkflowExecutionInitiatedEventAttributes?: RequestCancelExternalWorkflowExecutionInitiatedEventAttributes;
  requestCancelExternalWorkflowExecutionFailedEventAttributes?: RequestCancelExternalWorkflowExecutionFailedEventAttributes;
  scheduleActivityTaskFailedEventAttributes?: ScheduleActivityTaskFailedEventAttributes;
  requestCancelActivityTaskFailedEventAttributes?: RequestCancelActivityTaskFailedEventAttributes;
  startTimerFailedEventAttributes?: StartTimerFailedEventAttributes;
  cancelTimerFailedEventAttributes?: CancelTimerFailedEventAttributes;
  startChildWorkflowExecutionFailedEventAttributes?: StartChildWorkflowExecutionFailedEventAttributes;
  lambdaFunctionScheduledEventAttributes?: LambdaFunctionScheduledEventAttributes;
  lambdaFunctionStartedEventAttributes?: LambdaFunctionStartedEventAttributes;
  lambdaFunctionCompletedEventAttributes?: LambdaFunctionCompletedEventAttributes;
  lambdaFunctionFailedEventAttributes?: LambdaFunctionFailedEventAttributes;
  lambdaFunctionTimedOutEventAttributes?: LambdaFunctionTimedOutEventAttributes;
  scheduleLambdaFunctionFailedEventAttributes?: ScheduleLambdaFunctionFailedEventAttributes;
  startLambdaFunctionFailedEventAttributes?: StartLambdaFunctionFailedEventAttributes;
}
export const HistoryEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    eventType: EventType,
    eventId: S.Number,
    workflowExecutionStartedEventAttributes: S.optional(
      WorkflowExecutionStartedEventAttributes,
    ),
    workflowExecutionCompletedEventAttributes: S.optional(
      WorkflowExecutionCompletedEventAttributes,
    ),
    completeWorkflowExecutionFailedEventAttributes: S.optional(
      CompleteWorkflowExecutionFailedEventAttributes,
    ),
    workflowExecutionFailedEventAttributes: S.optional(
      WorkflowExecutionFailedEventAttributes,
    ),
    failWorkflowExecutionFailedEventAttributes: S.optional(
      FailWorkflowExecutionFailedEventAttributes,
    ),
    workflowExecutionTimedOutEventAttributes: S.optional(
      WorkflowExecutionTimedOutEventAttributes,
    ),
    workflowExecutionCanceledEventAttributes: S.optional(
      WorkflowExecutionCanceledEventAttributes,
    ),
    cancelWorkflowExecutionFailedEventAttributes: S.optional(
      CancelWorkflowExecutionFailedEventAttributes,
    ),
    workflowExecutionContinuedAsNewEventAttributes: S.optional(
      WorkflowExecutionContinuedAsNewEventAttributes,
    ),
    continueAsNewWorkflowExecutionFailedEventAttributes: S.optional(
      ContinueAsNewWorkflowExecutionFailedEventAttributes,
    ),
    workflowExecutionTerminatedEventAttributes: S.optional(
      WorkflowExecutionTerminatedEventAttributes,
    ),
    workflowExecutionCancelRequestedEventAttributes: S.optional(
      WorkflowExecutionCancelRequestedEventAttributes,
    ),
    decisionTaskScheduledEventAttributes: S.optional(
      DecisionTaskScheduledEventAttributes,
    ),
    decisionTaskStartedEventAttributes: S.optional(
      DecisionTaskStartedEventAttributes,
    ),
    decisionTaskCompletedEventAttributes: S.optional(
      DecisionTaskCompletedEventAttributes,
    ),
    decisionTaskTimedOutEventAttributes: S.optional(
      DecisionTaskTimedOutEventAttributes,
    ),
    activityTaskScheduledEventAttributes: S.optional(
      ActivityTaskScheduledEventAttributes,
    ),
    activityTaskStartedEventAttributes: S.optional(
      ActivityTaskStartedEventAttributes,
    ),
    activityTaskCompletedEventAttributes: S.optional(
      ActivityTaskCompletedEventAttributes,
    ),
    activityTaskFailedEventAttributes: S.optional(
      ActivityTaskFailedEventAttributes,
    ),
    activityTaskTimedOutEventAttributes: S.optional(
      ActivityTaskTimedOutEventAttributes,
    ),
    activityTaskCanceledEventAttributes: S.optional(
      ActivityTaskCanceledEventAttributes,
    ),
    activityTaskCancelRequestedEventAttributes: S.optional(
      ActivityTaskCancelRequestedEventAttributes,
    ),
    workflowExecutionSignaledEventAttributes: S.optional(
      WorkflowExecutionSignaledEventAttributes,
    ),
    markerRecordedEventAttributes: S.optional(MarkerRecordedEventAttributes),
    recordMarkerFailedEventAttributes: S.optional(
      RecordMarkerFailedEventAttributes,
    ),
    timerStartedEventAttributes: S.optional(TimerStartedEventAttributes),
    timerFiredEventAttributes: S.optional(TimerFiredEventAttributes),
    timerCanceledEventAttributes: S.optional(TimerCanceledEventAttributes),
    startChildWorkflowExecutionInitiatedEventAttributes: S.optional(
      StartChildWorkflowExecutionInitiatedEventAttributes,
    ),
    childWorkflowExecutionStartedEventAttributes: S.optional(
      ChildWorkflowExecutionStartedEventAttributes,
    ),
    childWorkflowExecutionCompletedEventAttributes: S.optional(
      ChildWorkflowExecutionCompletedEventAttributes,
    ),
    childWorkflowExecutionFailedEventAttributes: S.optional(
      ChildWorkflowExecutionFailedEventAttributes,
    ),
    childWorkflowExecutionTimedOutEventAttributes: S.optional(
      ChildWorkflowExecutionTimedOutEventAttributes,
    ),
    childWorkflowExecutionCanceledEventAttributes: S.optional(
      ChildWorkflowExecutionCanceledEventAttributes,
    ),
    childWorkflowExecutionTerminatedEventAttributes: S.optional(
      ChildWorkflowExecutionTerminatedEventAttributes,
    ),
    signalExternalWorkflowExecutionInitiatedEventAttributes: S.optional(
      SignalExternalWorkflowExecutionInitiatedEventAttributes,
    ),
    externalWorkflowExecutionSignaledEventAttributes: S.optional(
      ExternalWorkflowExecutionSignaledEventAttributes,
    ),
    signalExternalWorkflowExecutionFailedEventAttributes: S.optional(
      SignalExternalWorkflowExecutionFailedEventAttributes,
    ),
    externalWorkflowExecutionCancelRequestedEventAttributes: S.optional(
      ExternalWorkflowExecutionCancelRequestedEventAttributes,
    ),
    requestCancelExternalWorkflowExecutionInitiatedEventAttributes: S.optional(
      RequestCancelExternalWorkflowExecutionInitiatedEventAttributes,
    ),
    requestCancelExternalWorkflowExecutionFailedEventAttributes: S.optional(
      RequestCancelExternalWorkflowExecutionFailedEventAttributes,
    ),
    scheduleActivityTaskFailedEventAttributes: S.optional(
      ScheduleActivityTaskFailedEventAttributes,
    ),
    requestCancelActivityTaskFailedEventAttributes: S.optional(
      RequestCancelActivityTaskFailedEventAttributes,
    ),
    startTimerFailedEventAttributes: S.optional(
      StartTimerFailedEventAttributes,
    ),
    cancelTimerFailedEventAttributes: S.optional(
      CancelTimerFailedEventAttributes,
    ),
    startChildWorkflowExecutionFailedEventAttributes: S.optional(
      StartChildWorkflowExecutionFailedEventAttributes,
    ),
    lambdaFunctionScheduledEventAttributes: S.optional(
      LambdaFunctionScheduledEventAttributes,
    ),
    lambdaFunctionStartedEventAttributes: S.optional(
      LambdaFunctionStartedEventAttributes,
    ),
    lambdaFunctionCompletedEventAttributes: S.optional(
      LambdaFunctionCompletedEventAttributes,
    ),
    lambdaFunctionFailedEventAttributes: S.optional(
      LambdaFunctionFailedEventAttributes,
    ),
    lambdaFunctionTimedOutEventAttributes: S.optional(
      LambdaFunctionTimedOutEventAttributes,
    ),
    scheduleLambdaFunctionFailedEventAttributes: S.optional(
      ScheduleLambdaFunctionFailedEventAttributes,
    ),
    startLambdaFunctionFailedEventAttributes: S.optional(
      StartLambdaFunctionFailedEventAttributes,
    ),
  }),
).annotate({ identifier: "HistoryEvent" }) as any as S.Schema<HistoryEvent>;
export type HistoryEventList = HistoryEvent[];
export const HistoryEventList = /*@__PURE__*/ S.Array(HistoryEvent);
export interface History {
  events: HistoryEvent[];
  nextPageToken?: string;
}
export const History = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    events: HistoryEventList,
    nextPageToken: S.optional(S.String),
  }).pipe(ns),
).annotate({ identifier: "History" }) as any as S.Schema<History>;
export interface ListActivityTypesInput {
  domain: string;
  name?: string;
  registrationStatus: RegistrationStatus;
  nextPageToken?: string;
  maximumPageSize?: number;
  reverseOrder?: boolean;
}
export const ListActivityTypesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String,
    name: S.optional(S.String),
    registrationStatus: RegistrationStatus,
    nextPageToken: S.optional(S.String),
    maximumPageSize: S.optional(S.Number),
    reverseOrder: S.optional(S.Boolean),
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
  identifier: "ListActivityTypesInput",
}) as any as S.Schema<ListActivityTypesInput>;
export type ActivityTypeInfoList = ActivityTypeInfo[];
export const ActivityTypeInfoList = /*@__PURE__*/ S.Array(ActivityTypeInfo);
export interface ActivityTypeInfos {
  typeInfos: ActivityTypeInfo[];
  nextPageToken?: string;
}
export const ActivityTypeInfos = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    typeInfos: ActivityTypeInfoList,
    nextPageToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ActivityTypeInfos",
}) as any as S.Schema<ActivityTypeInfos>;
export interface ListClosedWorkflowExecutionsInput {
  domain: string;
  startTimeFilter?: ExecutionTimeFilter;
  closeTimeFilter?: ExecutionTimeFilter;
  executionFilter?: WorkflowExecutionFilter;
  closeStatusFilter?: CloseStatusFilter;
  typeFilter?: WorkflowTypeFilter;
  tagFilter?: TagFilter;
  nextPageToken?: string;
  maximumPageSize?: number;
  reverseOrder?: boolean;
}
export const ListClosedWorkflowExecutionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String,
    startTimeFilter: S.optional(ExecutionTimeFilter),
    closeTimeFilter: S.optional(ExecutionTimeFilter),
    executionFilter: S.optional(WorkflowExecutionFilter),
    closeStatusFilter: S.optional(CloseStatusFilter),
    typeFilter: S.optional(WorkflowTypeFilter),
    tagFilter: S.optional(TagFilter),
    nextPageToken: S.optional(S.String),
    maximumPageSize: S.optional(S.Number),
    reverseOrder: S.optional(S.Boolean),
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
  identifier: "ListClosedWorkflowExecutionsInput",
}) as any as S.Schema<ListClosedWorkflowExecutionsInput>;
export type WorkflowExecutionInfoList = WorkflowExecutionInfo[];
export const WorkflowExecutionInfoList = /*@__PURE__*/ S.Array(
  WorkflowExecutionInfo,
);
export interface WorkflowExecutionInfos {
  executionInfos: WorkflowExecutionInfo[];
  nextPageToken?: string;
}
export const WorkflowExecutionInfos = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionInfos: WorkflowExecutionInfoList,
    nextPageToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "WorkflowExecutionInfos",
}) as any as S.Schema<WorkflowExecutionInfos>;
export interface ListDomainsInput {
  nextPageToken?: string;
  registrationStatus: RegistrationStatus;
  maximumPageSize?: number;
  reverseOrder?: boolean;
}
export const ListDomainsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextPageToken: S.optional(S.String),
    registrationStatus: RegistrationStatus,
    maximumPageSize: S.optional(S.Number),
    reverseOrder: S.optional(S.Boolean),
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
  identifier: "ListDomainsInput",
}) as any as S.Schema<ListDomainsInput>;
export type DomainInfoList = DomainInfo[];
export const DomainInfoList = /*@__PURE__*/ S.Array(DomainInfo);
export interface DomainInfos {
  domainInfos: DomainInfo[];
  nextPageToken?: string;
}
export const DomainInfos = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainInfos: DomainInfoList,
    nextPageToken: S.optional(S.String),
  }).pipe(ns),
).annotate({ identifier: "DomainInfos" }) as any as S.Schema<DomainInfos>;
export interface ListOpenWorkflowExecutionsInput {
  domain: string;
  startTimeFilter: ExecutionTimeFilter;
  typeFilter?: WorkflowTypeFilter;
  tagFilter?: TagFilter;
  nextPageToken?: string;
  maximumPageSize?: number;
  reverseOrder?: boolean;
  executionFilter?: WorkflowExecutionFilter;
}
export const ListOpenWorkflowExecutionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String,
    startTimeFilter: ExecutionTimeFilter,
    typeFilter: S.optional(WorkflowTypeFilter),
    tagFilter: S.optional(TagFilter),
    nextPageToken: S.optional(S.String),
    maximumPageSize: S.optional(S.Number),
    reverseOrder: S.optional(S.Boolean),
    executionFilter: S.optional(WorkflowExecutionFilter),
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
  identifier: "ListOpenWorkflowExecutionsInput",
}) as any as S.Schema<ListOpenWorkflowExecutionsInput>;
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String }).pipe(
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
export type ResourceTagKey = string;
export type ResourceTagValue = string;
export interface ResourceTag {
  key: string;
  value?: string;
}
export const ResourceTag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.optional(S.String) }),
).annotate({ identifier: "ResourceTag" }) as any as S.Schema<ResourceTag>;
export type ResourceTagList = ResourceTag[];
export const ResourceTagList = /*@__PURE__*/ S.Array(ResourceTag);
export interface ListTagsForResourceOutput {
  tags?: ResourceTag[];
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(ResourceTagList) }).pipe(ns),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export interface ListWorkflowTypesInput {
  domain: string;
  name?: string;
  registrationStatus: RegistrationStatus;
  nextPageToken?: string;
  maximumPageSize?: number;
  reverseOrder?: boolean;
}
export const ListWorkflowTypesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String,
    name: S.optional(S.String),
    registrationStatus: RegistrationStatus,
    nextPageToken: S.optional(S.String),
    maximumPageSize: S.optional(S.Number),
    reverseOrder: S.optional(S.Boolean),
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
  identifier: "ListWorkflowTypesInput",
}) as any as S.Schema<ListWorkflowTypesInput>;
export type WorkflowTypeInfoList = WorkflowTypeInfo[];
export const WorkflowTypeInfoList = /*@__PURE__*/ S.Array(WorkflowTypeInfo);
export interface WorkflowTypeInfos {
  typeInfos: WorkflowTypeInfo[];
  nextPageToken?: string;
}
export const WorkflowTypeInfos = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    typeInfos: WorkflowTypeInfoList,
    nextPageToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "WorkflowTypeInfos",
}) as any as S.Schema<WorkflowTypeInfos>;
export interface PollForActivityTaskInput {
  domain: string;
  taskList: TaskList;
  identity?: string;
}
export const PollForActivityTaskInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String,
    taskList: TaskList,
    identity: S.optional(S.String),
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
  identifier: "PollForActivityTaskInput",
}) as any as S.Schema<PollForActivityTaskInput>;
export type TaskToken = string;
export interface ActivityTask {
  taskToken: string;
  activityId: string;
  startedEventId: number;
  workflowExecution: WorkflowExecution;
  activityType: ActivityType;
  input?: string;
}
export const ActivityTask = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskToken: S.String,
    activityId: S.String,
    startedEventId: S.Number,
    workflowExecution: WorkflowExecution,
    activityType: ActivityType,
    input: S.optional(S.String),
  }).pipe(ns),
).annotate({ identifier: "ActivityTask" }) as any as S.Schema<ActivityTask>;
export type StartAtPreviousStartedEvent = boolean;
export interface PollForDecisionTaskInput {
  domain: string;
  taskList: TaskList;
  identity?: string;
  nextPageToken?: string;
  maximumPageSize?: number;
  reverseOrder?: boolean;
  startAtPreviousStartedEvent?: boolean;
}
export const PollForDecisionTaskInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String,
    taskList: TaskList,
    identity: S.optional(S.String),
    nextPageToken: S.optional(S.String),
    maximumPageSize: S.optional(S.Number),
    reverseOrder: S.optional(S.Boolean),
    startAtPreviousStartedEvent: S.optional(S.Boolean),
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
  identifier: "PollForDecisionTaskInput",
}) as any as S.Schema<PollForDecisionTaskInput>;
export interface DecisionTask {
  taskToken: string;
  startedEventId: number;
  workflowExecution: WorkflowExecution;
  workflowType: WorkflowType;
  events: HistoryEvent[];
  nextPageToken?: string;
  previousStartedEventId?: number;
}
export const DecisionTask = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskToken: S.String,
    startedEventId: S.Number,
    workflowExecution: WorkflowExecution,
    workflowType: WorkflowType,
    events: HistoryEventList,
    nextPageToken: S.optional(S.String),
    previousStartedEventId: S.optional(S.Number),
  }).pipe(ns),
).annotate({ identifier: "DecisionTask" }) as any as S.Schema<DecisionTask>;
export interface RecordActivityTaskHeartbeatInput {
  taskToken: string;
  details?: string;
}
export const RecordActivityTaskHeartbeatInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taskToken: S.String, details: S.optional(S.String) }).pipe(
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
  identifier: "RecordActivityTaskHeartbeatInput",
}) as any as S.Schema<RecordActivityTaskHeartbeatInput>;
export interface ActivityTaskStatus {
  cancelRequested: boolean;
}
export const ActivityTaskStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cancelRequested: S.Boolean }).pipe(ns),
).annotate({
  identifier: "ActivityTaskStatus",
}) as any as S.Schema<ActivityTaskStatus>;
export interface RegisterActivityTypeInput {
  domain: string;
  name: string;
  version: string;
  description?: string;
  defaultTaskStartToCloseTimeout?: string;
  defaultTaskHeartbeatTimeout?: string;
  defaultTaskList?: TaskList;
  defaultTaskPriority?: string;
  defaultTaskScheduleToStartTimeout?: string;
  defaultTaskScheduleToCloseTimeout?: string;
}
export const RegisterActivityTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String,
    name: S.String,
    version: S.String,
    description: S.optional(S.String),
    defaultTaskStartToCloseTimeout: S.optional(S.String),
    defaultTaskHeartbeatTimeout: S.optional(S.String),
    defaultTaskList: S.optional(TaskList),
    defaultTaskPriority: S.optional(S.String),
    defaultTaskScheduleToStartTimeout: S.optional(S.String),
    defaultTaskScheduleToCloseTimeout: S.optional(S.String),
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
  identifier: "RegisterActivityTypeInput",
}) as any as S.Schema<RegisterActivityTypeInput>;
export interface RegisterActivityTypeResponse {}
export const RegisterActivityTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RegisterActivityTypeResponse",
}) as any as S.Schema<RegisterActivityTypeResponse>;
export interface RegisterDomainInput {
  name: string;
  description?: string;
  workflowExecutionRetentionPeriodInDays: string;
  tags?: ResourceTag[];
}
export const RegisterDomainInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    workflowExecutionRetentionPeriodInDays: S.String,
    tags: S.optional(ResourceTagList),
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
  identifier: "RegisterDomainInput",
}) as any as S.Schema<RegisterDomainInput>;
export interface RegisterDomainResponse {}
export const RegisterDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RegisterDomainResponse",
}) as any as S.Schema<RegisterDomainResponse>;
export interface RegisterWorkflowTypeInput {
  domain: string;
  name: string;
  version: string;
  description?: string;
  defaultTaskStartToCloseTimeout?: string;
  defaultExecutionStartToCloseTimeout?: string;
  defaultTaskList?: TaskList;
  defaultTaskPriority?: string;
  defaultChildPolicy?: ChildPolicy;
  defaultLambdaRole?: string;
}
export const RegisterWorkflowTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String,
    name: S.String,
    version: S.String,
    description: S.optional(S.String),
    defaultTaskStartToCloseTimeout: S.optional(S.String),
    defaultExecutionStartToCloseTimeout: S.optional(S.String),
    defaultTaskList: S.optional(TaskList),
    defaultTaskPriority: S.optional(S.String),
    defaultChildPolicy: S.optional(ChildPolicy),
    defaultLambdaRole: S.optional(S.String),
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
  identifier: "RegisterWorkflowTypeInput",
}) as any as S.Schema<RegisterWorkflowTypeInput>;
export interface RegisterWorkflowTypeResponse {}
export const RegisterWorkflowTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RegisterWorkflowTypeResponse",
}) as any as S.Schema<RegisterWorkflowTypeResponse>;
export interface RequestCancelWorkflowExecutionInput {
  domain: string;
  workflowId: string;
  runId?: string;
}
export const RequestCancelWorkflowExecutionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String,
    workflowId: S.String,
    runId: S.optional(S.String),
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
  identifier: "RequestCancelWorkflowExecutionInput",
}) as any as S.Schema<RequestCancelWorkflowExecutionInput>;
export interface RequestCancelWorkflowExecutionResponse {}
export const RequestCancelWorkflowExecutionResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "RequestCancelWorkflowExecutionResponse",
}) as any as S.Schema<RequestCancelWorkflowExecutionResponse>;
export interface RespondActivityTaskCanceledInput {
  taskToken: string;
  details?: string;
}
export const RespondActivityTaskCanceledInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taskToken: S.String, details: S.optional(S.String) }).pipe(
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
  identifier: "RespondActivityTaskCanceledInput",
}) as any as S.Schema<RespondActivityTaskCanceledInput>;
export interface RespondActivityTaskCanceledResponse {}
export const RespondActivityTaskCanceledResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RespondActivityTaskCanceledResponse",
}) as any as S.Schema<RespondActivityTaskCanceledResponse>;
export interface RespondActivityTaskCompletedInput {
  taskToken: string;
  result?: string;
}
export const RespondActivityTaskCompletedInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taskToken: S.String, result: S.optional(S.String) }).pipe(
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
  identifier: "RespondActivityTaskCompletedInput",
}) as any as S.Schema<RespondActivityTaskCompletedInput>;
export interface RespondActivityTaskCompletedResponse {}
export const RespondActivityTaskCompletedResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "RespondActivityTaskCompletedResponse",
}) as any as S.Schema<RespondActivityTaskCompletedResponse>;
export interface RespondActivityTaskFailedInput {
  taskToken: string;
  reason?: string;
  details?: string;
}
export const RespondActivityTaskFailedInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskToken: S.String,
    reason: S.optional(S.String),
    details: S.optional(S.String),
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
  identifier: "RespondActivityTaskFailedInput",
}) as any as S.Schema<RespondActivityTaskFailedInput>;
export interface RespondActivityTaskFailedResponse {}
export const RespondActivityTaskFailedResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RespondActivityTaskFailedResponse",
}) as any as S.Schema<RespondActivityTaskFailedResponse>;
export type DecisionType =
  | "ScheduleActivityTask"
  | "RequestCancelActivityTask"
  | "CompleteWorkflowExecution"
  | "FailWorkflowExecution"
  | "CancelWorkflowExecution"
  | "ContinueAsNewWorkflowExecution"
  | "RecordMarker"
  | "StartTimer"
  | "CancelTimer"
  | "SignalExternalWorkflowExecution"
  | "RequestCancelExternalWorkflowExecution"
  | "StartChildWorkflowExecution"
  | "ScheduleLambdaFunction"
  | (string & {});
export const DecisionType = /*@__PURE__*/ S.String;

export interface ScheduleActivityTaskDecisionAttributes {
  activityType: ActivityType;
  activityId: string;
  control?: string;
  input?: string;
  scheduleToCloseTimeout?: string;
  taskList?: TaskList;
  taskPriority?: string;
  scheduleToStartTimeout?: string;
  startToCloseTimeout?: string;
  heartbeatTimeout?: string;
}
export const ScheduleActivityTaskDecisionAttributes = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      activityType: ActivityType,
      activityId: S.String,
      control: S.optional(S.String),
      input: S.optional(S.String),
      scheduleToCloseTimeout: S.optional(S.String),
      taskList: S.optional(TaskList),
      taskPriority: S.optional(S.String),
      scheduleToStartTimeout: S.optional(S.String),
      startToCloseTimeout: S.optional(S.String),
      heartbeatTimeout: S.optional(S.String),
    }),
).annotate({
  identifier: "ScheduleActivityTaskDecisionAttributes",
}) as any as S.Schema<ScheduleActivityTaskDecisionAttributes>;
export interface RequestCancelActivityTaskDecisionAttributes {
  activityId: string;
}
export const RequestCancelActivityTaskDecisionAttributes =
  /*@__PURE__*/ S.suspend(() => S.Struct({ activityId: S.String })).annotate({
    identifier: "RequestCancelActivityTaskDecisionAttributes",
  }) as any as S.Schema<RequestCancelActivityTaskDecisionAttributes>;
export interface CompleteWorkflowExecutionDecisionAttributes {
  result?: string;
}
export const CompleteWorkflowExecutionDecisionAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ result: S.optional(S.String) }),
  ).annotate({
    identifier: "CompleteWorkflowExecutionDecisionAttributes",
  }) as any as S.Schema<CompleteWorkflowExecutionDecisionAttributes>;
export interface FailWorkflowExecutionDecisionAttributes {
  reason?: string;
  details?: string;
}
export const FailWorkflowExecutionDecisionAttributes = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ reason: S.optional(S.String), details: S.optional(S.String) }),
).annotate({
  identifier: "FailWorkflowExecutionDecisionAttributes",
}) as any as S.Schema<FailWorkflowExecutionDecisionAttributes>;
export interface CancelWorkflowExecutionDecisionAttributes {
  details?: string;
}
export const CancelWorkflowExecutionDecisionAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ details: S.optional(S.String) }),
  ).annotate({
    identifier: "CancelWorkflowExecutionDecisionAttributes",
  }) as any as S.Schema<CancelWorkflowExecutionDecisionAttributes>;
export interface ContinueAsNewWorkflowExecutionDecisionAttributes {
  input?: string;
  executionStartToCloseTimeout?: string;
  taskList?: TaskList;
  taskPriority?: string;
  taskStartToCloseTimeout?: string;
  childPolicy?: ChildPolicy;
  tagList?: string[];
  workflowTypeVersion?: string;
  lambdaRole?: string;
}
export const ContinueAsNewWorkflowExecutionDecisionAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      input: S.optional(S.String),
      executionStartToCloseTimeout: S.optional(S.String),
      taskList: S.optional(TaskList),
      taskPriority: S.optional(S.String),
      taskStartToCloseTimeout: S.optional(S.String),
      childPolicy: S.optional(ChildPolicy),
      tagList: S.optional(TagList),
      workflowTypeVersion: S.optional(S.String),
      lambdaRole: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ContinueAsNewWorkflowExecutionDecisionAttributes",
  }) as any as S.Schema<ContinueAsNewWorkflowExecutionDecisionAttributes>;
export interface RecordMarkerDecisionAttributes {
  markerName: string;
  details?: string;
}
export const RecordMarkerDecisionAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ markerName: S.String, details: S.optional(S.String) }),
).annotate({
  identifier: "RecordMarkerDecisionAttributes",
}) as any as S.Schema<RecordMarkerDecisionAttributes>;
export interface StartTimerDecisionAttributes {
  timerId: string;
  control?: string;
  startToFireTimeout: string;
}
export const StartTimerDecisionAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timerId: S.String,
    control: S.optional(S.String),
    startToFireTimeout: S.String,
  }),
).annotate({
  identifier: "StartTimerDecisionAttributes",
}) as any as S.Schema<StartTimerDecisionAttributes>;
export interface CancelTimerDecisionAttributes {
  timerId: string;
}
export const CancelTimerDecisionAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ timerId: S.String }),
).annotate({
  identifier: "CancelTimerDecisionAttributes",
}) as any as S.Schema<CancelTimerDecisionAttributes>;
export interface SignalExternalWorkflowExecutionDecisionAttributes {
  workflowId: string;
  runId?: string;
  signalName: string;
  input?: string;
  control?: string;
}
export const SignalExternalWorkflowExecutionDecisionAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      workflowId: S.String,
      runId: S.optional(S.String),
      signalName: S.String,
      input: S.optional(S.String),
      control: S.optional(S.String),
    }),
  ).annotate({
    identifier: "SignalExternalWorkflowExecutionDecisionAttributes",
  }) as any as S.Schema<SignalExternalWorkflowExecutionDecisionAttributes>;
export interface RequestCancelExternalWorkflowExecutionDecisionAttributes {
  workflowId: string;
  runId?: string;
  control?: string;
}
export const RequestCancelExternalWorkflowExecutionDecisionAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      workflowId: S.String,
      runId: S.optional(S.String),
      control: S.optional(S.String),
    }),
  ).annotate({
    identifier: "RequestCancelExternalWorkflowExecutionDecisionAttributes",
  }) as any as S.Schema<RequestCancelExternalWorkflowExecutionDecisionAttributes>;
export interface StartChildWorkflowExecutionDecisionAttributes {
  workflowType: WorkflowType;
  workflowId: string;
  control?: string;
  input?: string;
  executionStartToCloseTimeout?: string;
  taskList?: TaskList;
  taskPriority?: string;
  taskStartToCloseTimeout?: string;
  childPolicy?: ChildPolicy;
  tagList?: string[];
  lambdaRole?: string;
}
export const StartChildWorkflowExecutionDecisionAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      workflowType: WorkflowType,
      workflowId: S.String,
      control: S.optional(S.String),
      input: S.optional(S.String),
      executionStartToCloseTimeout: S.optional(S.String),
      taskList: S.optional(TaskList),
      taskPriority: S.optional(S.String),
      taskStartToCloseTimeout: S.optional(S.String),
      childPolicy: S.optional(ChildPolicy),
      tagList: S.optional(TagList),
      lambdaRole: S.optional(S.String),
    }),
  ).annotate({
    identifier: "StartChildWorkflowExecutionDecisionAttributes",
  }) as any as S.Schema<StartChildWorkflowExecutionDecisionAttributes>;
export interface ScheduleLambdaFunctionDecisionAttributes {
  id: string;
  name: string;
  control?: string;
  input?: string;
  startToCloseTimeout?: string;
}
export const ScheduleLambdaFunctionDecisionAttributes = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      id: S.String,
      name: S.String,
      control: S.optional(S.String),
      input: S.optional(S.String),
      startToCloseTimeout: S.optional(S.String),
    }),
).annotate({
  identifier: "ScheduleLambdaFunctionDecisionAttributes",
}) as any as S.Schema<ScheduleLambdaFunctionDecisionAttributes>;
export interface Decision {
  decisionType: DecisionType;
  scheduleActivityTaskDecisionAttributes?: ScheduleActivityTaskDecisionAttributes;
  requestCancelActivityTaskDecisionAttributes?: RequestCancelActivityTaskDecisionAttributes;
  completeWorkflowExecutionDecisionAttributes?: CompleteWorkflowExecutionDecisionAttributes;
  failWorkflowExecutionDecisionAttributes?: FailWorkflowExecutionDecisionAttributes;
  cancelWorkflowExecutionDecisionAttributes?: CancelWorkflowExecutionDecisionAttributes;
  continueAsNewWorkflowExecutionDecisionAttributes?: ContinueAsNewWorkflowExecutionDecisionAttributes;
  recordMarkerDecisionAttributes?: RecordMarkerDecisionAttributes;
  startTimerDecisionAttributes?: StartTimerDecisionAttributes;
  cancelTimerDecisionAttributes?: CancelTimerDecisionAttributes;
  signalExternalWorkflowExecutionDecisionAttributes?: SignalExternalWorkflowExecutionDecisionAttributes;
  requestCancelExternalWorkflowExecutionDecisionAttributes?: RequestCancelExternalWorkflowExecutionDecisionAttributes;
  startChildWorkflowExecutionDecisionAttributes?: StartChildWorkflowExecutionDecisionAttributes;
  scheduleLambdaFunctionDecisionAttributes?: ScheduleLambdaFunctionDecisionAttributes;
}
export const Decision = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    decisionType: DecisionType,
    scheduleActivityTaskDecisionAttributes: S.optional(
      ScheduleActivityTaskDecisionAttributes,
    ),
    requestCancelActivityTaskDecisionAttributes: S.optional(
      RequestCancelActivityTaskDecisionAttributes,
    ),
    completeWorkflowExecutionDecisionAttributes: S.optional(
      CompleteWorkflowExecutionDecisionAttributes,
    ),
    failWorkflowExecutionDecisionAttributes: S.optional(
      FailWorkflowExecutionDecisionAttributes,
    ),
    cancelWorkflowExecutionDecisionAttributes: S.optional(
      CancelWorkflowExecutionDecisionAttributes,
    ),
    continueAsNewWorkflowExecutionDecisionAttributes: S.optional(
      ContinueAsNewWorkflowExecutionDecisionAttributes,
    ),
    recordMarkerDecisionAttributes: S.optional(RecordMarkerDecisionAttributes),
    startTimerDecisionAttributes: S.optional(StartTimerDecisionAttributes),
    cancelTimerDecisionAttributes: S.optional(CancelTimerDecisionAttributes),
    signalExternalWorkflowExecutionDecisionAttributes: S.optional(
      SignalExternalWorkflowExecutionDecisionAttributes,
    ),
    requestCancelExternalWorkflowExecutionDecisionAttributes: S.optional(
      RequestCancelExternalWorkflowExecutionDecisionAttributes,
    ),
    startChildWorkflowExecutionDecisionAttributes: S.optional(
      StartChildWorkflowExecutionDecisionAttributes,
    ),
    scheduleLambdaFunctionDecisionAttributes: S.optional(
      ScheduleLambdaFunctionDecisionAttributes,
    ),
  }),
).annotate({ identifier: "Decision" }) as any as S.Schema<Decision>;
export type DecisionList = Decision[];
export const DecisionList = /*@__PURE__*/ S.Array(Decision);
export interface RespondDecisionTaskCompletedInput {
  taskToken: string;
  decisions?: Decision[];
  executionContext?: string;
  taskList?: TaskList;
  taskListScheduleToStartTimeout?: string;
}
export const RespondDecisionTaskCompletedInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskToken: S.String,
    decisions: S.optional(DecisionList),
    executionContext: S.optional(S.String),
    taskList: S.optional(TaskList),
    taskListScheduleToStartTimeout: S.optional(S.String),
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
  identifier: "RespondDecisionTaskCompletedInput",
}) as any as S.Schema<RespondDecisionTaskCompletedInput>;
export interface RespondDecisionTaskCompletedResponse {}
export const RespondDecisionTaskCompletedResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "RespondDecisionTaskCompletedResponse",
}) as any as S.Schema<RespondDecisionTaskCompletedResponse>;
export interface SignalWorkflowExecutionInput {
  domain: string;
  workflowId: string;
  runId?: string;
  signalName: string;
  input?: string;
}
export const SignalWorkflowExecutionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String,
    workflowId: S.String,
    runId: S.optional(S.String),
    signalName: S.String,
    input: S.optional(S.String),
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
  identifier: "SignalWorkflowExecutionInput",
}) as any as S.Schema<SignalWorkflowExecutionInput>;
export interface SignalWorkflowExecutionResponse {}
export const SignalWorkflowExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "SignalWorkflowExecutionResponse",
}) as any as S.Schema<SignalWorkflowExecutionResponse>;
export interface StartWorkflowExecutionInput {
  domain: string;
  workflowId: string;
  workflowType: WorkflowType;
  taskList?: TaskList;
  taskPriority?: string;
  input?: string;
  executionStartToCloseTimeout?: string;
  tagList?: string[];
  taskStartToCloseTimeout?: string;
  childPolicy?: ChildPolicy;
  lambdaRole?: string;
}
export const StartWorkflowExecutionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String,
    workflowId: S.String,
    workflowType: WorkflowType,
    taskList: S.optional(TaskList),
    taskPriority: S.optional(S.String),
    input: S.optional(S.String),
    executionStartToCloseTimeout: S.optional(S.String),
    tagList: S.optional(TagList),
    taskStartToCloseTimeout: S.optional(S.String),
    childPolicy: S.optional(ChildPolicy),
    lambdaRole: S.optional(S.String),
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
  identifier: "StartWorkflowExecutionInput",
}) as any as S.Schema<StartWorkflowExecutionInput>;
export interface Run {
  runId?: string;
}
export const Run = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ runId: S.optional(S.String) }).pipe(ns),
).annotate({ identifier: "Run" }) as any as S.Schema<Run>;
export interface TagResourceInput {
  resourceArn: string;
  tags: ResourceTag[];
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tags: ResourceTagList }).pipe(
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
export interface TagResourceResponse {}
export const TagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export interface TerminateWorkflowExecutionInput {
  domain: string;
  workflowId: string;
  runId?: string;
  reason?: string;
  details?: string;
  childPolicy?: ChildPolicy;
}
export const TerminateWorkflowExecutionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String,
    workflowId: S.String,
    runId: S.optional(S.String),
    reason: S.optional(S.String),
    details: S.optional(S.String),
    childPolicy: S.optional(ChildPolicy),
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
  identifier: "TerminateWorkflowExecutionInput",
}) as any as S.Schema<TerminateWorkflowExecutionInput>;
export interface TerminateWorkflowExecutionResponse {}
export const TerminateWorkflowExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TerminateWorkflowExecutionResponse",
}) as any as S.Schema<TerminateWorkflowExecutionResponse>;
export interface UndeprecateActivityTypeInput {
  domain: string;
  activityType: ActivityType;
}
export const UndeprecateActivityTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domain: S.String, activityType: ActivityType }).pipe(
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
  identifier: "UndeprecateActivityTypeInput",
}) as any as S.Schema<UndeprecateActivityTypeInput>;
export interface UndeprecateActivityTypeResponse {}
export const UndeprecateActivityTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UndeprecateActivityTypeResponse",
}) as any as S.Schema<UndeprecateActivityTypeResponse>;
export interface UndeprecateDomainInput {
  name: string;
}
export const UndeprecateDomainInput = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "UndeprecateDomainInput",
}) as any as S.Schema<UndeprecateDomainInput>;
export interface UndeprecateDomainResponse {}
export const UndeprecateDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UndeprecateDomainResponse",
}) as any as S.Schema<UndeprecateDomainResponse>;
export interface UndeprecateWorkflowTypeInput {
  domain: string;
  workflowType: WorkflowType;
}
export const UndeprecateWorkflowTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domain: S.String, workflowType: WorkflowType }).pipe(
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
  identifier: "UndeprecateWorkflowTypeInput",
}) as any as S.Schema<UndeprecateWorkflowTypeInput>;
export interface UndeprecateWorkflowTypeResponse {}
export const UndeprecateWorkflowTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UndeprecateWorkflowTypeResponse",
}) as any as S.Schema<UndeprecateWorkflowTypeResponse>;
export type ResourceTagKeyList = string[];
export const ResourceTagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tagKeys: ResourceTagKeyList }).pipe(
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
export interface UntagResourceResponse {}
export const UntagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export type ErrorMessage = string;
export type CountClosedWorkflowExecutionsError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Returns the number of closed workflow executions within the given domain that meet the
 * specified filtering criteria.
 *
 * This operation is eventually consistent. The results are best effort and may not
 * exactly reflect recent updates and changes.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `tagFilter.tag`: String constraint. The key is
 * `swf:tagFilter.tag`.
 *
 * - `typeFilter.name`: String constraint. The key is
 * `swf:typeFilter.name`.
 *
 * - `typeFilter.version`: String constraint. The key is
 * `swf:typeFilter.version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const countClosedWorkflowExecutions: API.OperationMethod<
  CountClosedWorkflowExecutionsInput,
  WorkflowExecutionCount,
  CountClosedWorkflowExecutionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CountClosedWorkflowExecutionsInput,
  output: WorkflowExecutionCount,
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CountClosedWorkflowExecutions",
}));

export type CountOpenWorkflowExecutionsError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Returns the number of open workflow executions within the given domain that meet the
 * specified filtering criteria.
 *
 * This operation is eventually consistent. The results are best effort and may not
 * exactly reflect recent updates and changes.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `tagFilter.tag`: String constraint. The key is
 * `swf:tagFilter.tag`.
 *
 * - `typeFilter.name`: String constraint. The key is
 * `swf:typeFilter.name`.
 *
 * - `typeFilter.version`: String constraint. The key is
 * `swf:typeFilter.version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const countOpenWorkflowExecutions: API.OperationMethod<
  CountOpenWorkflowExecutionsInput,
  WorkflowExecutionCount,
  CountOpenWorkflowExecutionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CountOpenWorkflowExecutionsInput,
  output: WorkflowExecutionCount,
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CountOpenWorkflowExecutions",
}));

export type CountPendingActivityTasksError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Returns the estimated number of activity tasks in the specified task list. The count
 * returned is an approximation and isn't guaranteed to be exact. If you specify a task list that
 * no activity task was ever scheduled in then `0` is returned.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the `taskList.name` parameter by using a
 * `Condition` element with the `swf:taskList.name` key to allow the
 * action to access only certain task lists.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const countPendingActivityTasks: API.OperationMethod<
  CountPendingActivityTasksInput,
  PendingTaskCount,
  CountPendingActivityTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CountPendingActivityTasksInput,
  output: PendingTaskCount,
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CountPendingActivityTasks",
}));

export type CountPendingDecisionTasksError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Returns the estimated number of decision tasks in the specified task list. The count
 * returned is an approximation and isn't guaranteed to be exact. If you specify a task list that
 * no decision task was ever scheduled in then `0` is returned.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the `taskList.name` parameter by using a
 * `Condition` element with the `swf:taskList.name` key to allow the
 * action to access only certain task lists.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const countPendingDecisionTasks: API.OperationMethod<
  CountPendingDecisionTasksInput,
  PendingTaskCount,
  CountPendingDecisionTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CountPendingDecisionTasksInput,
  output: PendingTaskCount,
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CountPendingDecisionTasks",
}));

export type DeleteActivityTypeError =
  | OperationNotPermittedFault
  | TypeNotDeprecatedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Deletes the specified *activity type*.
 *
 * Note: Prior to deletion, activity types must first be **deprecated**.
 *
 * After an activity type has been deleted, you cannot schedule new activities of that type. Activities that started before the type was deleted will continue to run.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `activityType.name`: String constraint. The key is
 * `swf:activityType.name`.
 *
 * - `activityType.version`: String constraint. The key is
 * `swf:activityType.version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const deleteActivityType: API.OperationMethod<
  DeleteActivityTypeInput,
  DeleteActivityTypeResponse,
  DeleteActivityTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteActivityTypeInput,
  output: DeleteActivityTypeResponse,
  errors: [
    OperationNotPermittedFault,
    TypeNotDeprecatedFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteActivityType",
}));

export type DeleteWorkflowTypeError =
  | OperationNotPermittedFault
  | TypeNotDeprecatedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Deletes the specified *workflow type*.
 *
 * Note: Prior to deletion, workflow types must first be **deprecated**.
 *
 * After a workflow type has been deleted, you cannot create new executions of that type. Executions that
 * started before the type was deleted will continue to run.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `workflowType.name`: String constraint. The key is
 * `swf:workflowType.name`.
 *
 * - `workflowType.version`: String constraint. The key is
 * `swf:workflowType.version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const deleteWorkflowType: API.OperationMethod<
  DeleteWorkflowTypeInput,
  DeleteWorkflowTypeResponse,
  DeleteWorkflowTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWorkflowTypeInput,
  output: DeleteWorkflowTypeResponse,
  errors: [
    OperationNotPermittedFault,
    TypeNotDeprecatedFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkflowType",
}));

export type DeprecateActivityTypeError =
  | OperationNotPermittedFault
  | TypeDeprecatedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Deprecates the specified *activity type*. After an activity type has
 * been deprecated, you cannot create new tasks of that activity type. Tasks of this type that
 * were scheduled before the type was deprecated continue to run.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `activityType.name`: String constraint. The key is
 * `swf:activityType.name`.
 *
 * - `activityType.version`: String constraint. The key is
 * `swf:activityType.version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const deprecateActivityType: API.OperationMethod<
  DeprecateActivityTypeInput,
  DeprecateActivityTypeResponse,
  DeprecateActivityTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeprecateActivityTypeInput,
  output: DeprecateActivityTypeResponse,
  errors: [
    OperationNotPermittedFault,
    TypeDeprecatedFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeprecateActivityType",
}));

export type DeprecateDomainError =
  | DomainDeprecatedFault
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Deprecates the specified domain. After a domain has been deprecated it cannot be used
 * to create new workflow executions or register new types. However, you can still use visibility
 * actions on this domain. Deprecating a domain also deprecates all activity and workflow types
 * registered in the domain. Executions that were started before the domain was deprecated
 * continues to run.
 *
 * This operation is eventually consistent. The results are best effort and may not
 * exactly reflect recent updates and changes.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const deprecateDomain: API.OperationMethod<
  DeprecateDomainInput,
  DeprecateDomainResponse,
  DeprecateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeprecateDomainInput,
  output: DeprecateDomainResponse,
  errors: [
    DomainDeprecatedFault,
    OperationNotPermittedFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeprecateDomain",
}));

export type DeprecateWorkflowTypeError =
  | OperationNotPermittedFault
  | TypeDeprecatedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Deprecates the specified *workflow type*. After a workflow type has
 * been deprecated, you cannot create new executions of that type. Executions that were started
 * before the type was deprecated continues to run. A deprecated workflow type may still be used
 * when calling visibility actions.
 *
 * This operation is eventually consistent. The results are best effort and may not
 * exactly reflect recent updates and changes.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `workflowType.name`: String constraint. The key is
 * `swf:workflowType.name`.
 *
 * - `workflowType.version`: String constraint. The key is
 * `swf:workflowType.version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const deprecateWorkflowType: API.OperationMethod<
  DeprecateWorkflowTypeInput,
  DeprecateWorkflowTypeResponse,
  DeprecateWorkflowTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeprecateWorkflowTypeInput,
  output: DeprecateWorkflowTypeResponse,
  errors: [
    OperationNotPermittedFault,
    TypeDeprecatedFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeprecateWorkflowType",
}));

export type DescribeActivityTypeError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Returns information about the specified activity type. This includes configuration
 * settings provided when the type was registered and other general information about the
 * type.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `activityType.name`: String constraint. The key is
 * `swf:activityType.name`.
 *
 * - `activityType.version`: String constraint. The key is
 * `swf:activityType.version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const describeActivityType: API.OperationMethod<
  DescribeActivityTypeInput,
  ActivityTypeDetail,
  DescribeActivityTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeActivityTypeInput,
  output: ActivityTypeDetail,
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeActivityType",
}));

export type DescribeDomainError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Returns information about the specified domain, including description and
 * status.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const describeDomain: API.OperationMethod<
  DescribeDomainInput,
  DomainDetail,
  DescribeDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDomainInput,
  output: DomainDetail,
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDomain",
}));

export type DescribeWorkflowExecutionError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Returns information about the specified workflow execution including its type and some
 * statistics.
 *
 * This operation is eventually consistent. The results are best effort and may not
 * exactly reflect recent updates and changes.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const describeWorkflowExecution: API.OperationMethod<
  DescribeWorkflowExecutionInput,
  WorkflowExecutionDetail,
  DescribeWorkflowExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeWorkflowExecutionInput,
  output: WorkflowExecutionDetail,
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkflowExecution",
}));

export type DescribeWorkflowTypeError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Returns information about the specified *workflow type*. This
 * includes configuration settings specified when the type was registered and other information
 * such as creation date, current status, etc.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `workflowType.name`: String constraint. The key is
 * `swf:workflowType.name`.
 *
 * - `workflowType.version`: String constraint. The key is
 * `swf:workflowType.version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const describeWorkflowType: API.OperationMethod<
  DescribeWorkflowTypeInput,
  WorkflowTypeDetail,
  DescribeWorkflowTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeWorkflowTypeInput,
  output: WorkflowTypeDetail,
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkflowType",
}));

export type GetWorkflowExecutionHistoryError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Returns the history of the specified workflow execution. The results may be split into
 * multiple pages. To retrieve subsequent pages, make the call again using the
 * `nextPageToken` returned by the initial call.
 *
 * This operation is eventually consistent. The results are best effort and may not
 * exactly reflect recent updates and changes.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const getWorkflowExecutionHistory: API.PaginatedOperationMethod<
  GetWorkflowExecutionHistoryInput,
  History,
  GetWorkflowExecutionHistoryError,
  Credentials | HttpClient.HttpClient,
  HistoryEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetWorkflowExecutionHistoryInput,
  output: History,
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflowExecutionHistory",
  pagination: {
    inputToken: "nextPageToken",
    outputToken: "nextPageToken",
    items: "events",
    pageSize: "maximumPageSize",
  } as const,
})) as any;

export type ListActivityTypesError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Returns information about all activities registered in the specified domain that match
 * the specified name and registration status. The result includes information like creation
 * date, current status of the activity, etc. The results may be split into multiple pages. To
 * retrieve subsequent pages, make the call again using the `nextPageToken` returned
 * by the initial call.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const listActivityTypes: API.PaginatedOperationMethod<
  ListActivityTypesInput,
  ActivityTypeInfos,
  ListActivityTypesError,
  Credentials | HttpClient.HttpClient,
  ActivityTypeInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListActivityTypesInput,
  output: ActivityTypeInfos,
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListActivityTypes",
  pagination: {
    inputToken: "nextPageToken",
    outputToken: "nextPageToken",
    items: "typeInfos",
    pageSize: "maximumPageSize",
  } as const,
})) as any;

export type ListClosedWorkflowExecutionsError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Returns a list of closed workflow executions in the specified domain that meet the
 * filtering criteria. The results may be split into multiple pages. To retrieve subsequent
 * pages, make the call again using the nextPageToken returned by the initial call.
 *
 * This operation is eventually consistent. The results are best effort and may not
 * exactly reflect recent updates and changes.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `tagFilter.tag`: String constraint. The key is
 * `swf:tagFilter.tag`.
 *
 * - `typeFilter.name`: String constraint. The key is
 * `swf:typeFilter.name`.
 *
 * - `typeFilter.version`: String constraint. The key is
 * `swf:typeFilter.version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const listClosedWorkflowExecutions: API.PaginatedOperationMethod<
  ListClosedWorkflowExecutionsInput,
  WorkflowExecutionInfos,
  ListClosedWorkflowExecutionsError,
  Credentials | HttpClient.HttpClient,
  WorkflowExecutionInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListClosedWorkflowExecutionsInput,
  output: WorkflowExecutionInfos,
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClosedWorkflowExecutions",
  pagination: {
    inputToken: "nextPageToken",
    outputToken: "nextPageToken",
    items: "executionInfos",
    pageSize: "maximumPageSize",
  } as const,
})) as any;

export type ListDomainsError = OperationNotPermittedFault | CommonErrors;
/**
 * Returns the list of domains registered in the account. The results may be split into
 * multiple pages. To retrieve subsequent pages, make the call again using the nextPageToken
 * returned by the initial call.
 *
 * This operation is eventually consistent. The results are best effort and may not
 * exactly reflect recent updates and changes.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains. The element must be set to
 * `arn:aws:swf::AccountID:domain/*`, where *AccountID* is
 * the account ID, with no dashes.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const listDomains: API.PaginatedOperationMethod<
  ListDomainsInput,
  DomainInfos,
  ListDomainsError,
  Credentials | HttpClient.HttpClient,
  DomainInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDomainsInput,
  output: DomainInfos,
  errors: [OperationNotPermittedFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomains",
  pagination: {
    inputToken: "nextPageToken",
    outputToken: "nextPageToken",
    items: "domainInfos",
    pageSize: "maximumPageSize",
  } as const,
})) as any;

export type ListOpenWorkflowExecutionsError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Returns a list of open workflow executions in the specified domain that meet the
 * filtering criteria. The results may be split into multiple pages. To retrieve subsequent
 * pages, make the call again using the nextPageToken returned by the initial call.
 *
 * This operation is eventually consistent. The results are best effort and may not
 * exactly reflect recent updates and changes.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `tagFilter.tag`: String constraint. The key is
 * `swf:tagFilter.tag`.
 *
 * - `typeFilter.name`: String constraint. The key is
 * `swf:typeFilter.name`.
 *
 * - `typeFilter.version`: String constraint. The key is
 * `swf:typeFilter.version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const listOpenWorkflowExecutions: API.PaginatedOperationMethod<
  ListOpenWorkflowExecutionsInput,
  WorkflowExecutionInfos,
  ListOpenWorkflowExecutionsError,
  Credentials | HttpClient.HttpClient,
  WorkflowExecutionInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOpenWorkflowExecutionsInput,
  output: WorkflowExecutionInfos,
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOpenWorkflowExecutions",
  pagination: {
    inputToken: "nextPageToken",
    outputToken: "nextPageToken",
    items: "executionInfos",
    pageSize: "maximumPageSize",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | LimitExceededFault
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * List tags for a given domain.
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
    LimitExceededFault,
    OperationNotPermittedFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListWorkflowTypesError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Returns information about workflow types in the specified domain. The results may be
 * split into multiple pages that can be retrieved by making the call repeatedly.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const listWorkflowTypes: API.PaginatedOperationMethod<
  ListWorkflowTypesInput,
  WorkflowTypeInfos,
  ListWorkflowTypesError,
  Credentials | HttpClient.HttpClient,
  WorkflowTypeInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWorkflowTypesInput,
  output: WorkflowTypeInfos,
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflowTypes",
  pagination: {
    inputToken: "nextPageToken",
    outputToken: "nextPageToken",
    items: "typeInfos",
    pageSize: "maximumPageSize",
  } as const,
})) as any;

export type PollForActivityTaskError =
  | LimitExceededFault
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Used by workers to get an ActivityTask from the specified activity
 * `taskList`. This initiates a long poll, where the service holds the HTTP
 * connection open and responds as soon as a task becomes available. The maximum time the service
 * holds on to the request before responding is 60 seconds. If no task is available within 60
 * seconds, the poll returns an empty result. An empty result, in this context, means that an
 * ActivityTask is returned, but that the value of taskToken is an empty string. If a task is
 * returned, the worker should use its type to identify and process it correctly.
 *
 * Workers should set their client side socket timeout to at least 70 seconds (10
 * seconds higher than the maximum time service may hold the poll request).
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the `taskList.name` parameter by using a
 * `Condition` element with the `swf:taskList.name` key to allow the
 * action to access only certain task lists.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const pollForActivityTask: API.OperationMethod<
  PollForActivityTaskInput,
  ActivityTask,
  PollForActivityTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PollForActivityTaskInput,
  output: ActivityTask,
  errors: [
    LimitExceededFault,
    OperationNotPermittedFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PollForActivityTask",
}));

export type PollForDecisionTaskError =
  | LimitExceededFault
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Used by deciders to get a DecisionTask from the specified decision
 * `taskList`. A decision task may be returned for any open workflow execution that
 * is using the specified task list. The task includes a paginated view of the history of the
 * workflow execution. The decider should use the workflow type and the history to determine how
 * to properly handle the task.
 *
 * This action initiates a long poll, where the service holds the HTTP connection open and
 * responds as soon a task becomes available. If no decision task is available in the specified
 * task list before the timeout of 60 seconds expires, an empty result is returned. An empty
 * result, in this context, means that a DecisionTask is returned, but that the value of
 * taskToken is an empty string.
 *
 * Deciders should set their client side socket timeout to at least 70 seconds (10
 * seconds higher than the timeout).
 *
 * Because the number of workflow history events for a single workflow execution might
 * be very large, the result returned might be split up across a number of pages. To retrieve
 * subsequent pages, make additional calls to `PollForDecisionTask` using the
 * `nextPageToken` returned by the initial call. Note that you do
 * *not* call `GetWorkflowExecutionHistory` with this
 * `nextPageToken`. Instead, call `PollForDecisionTask`
 * again.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the `taskList.name` parameter by using a
 * `Condition` element with the `swf:taskList.name` key to allow the
 * action to access only certain task lists.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const pollForDecisionTask: API.PaginatedOperationMethod<
  PollForDecisionTaskInput,
  DecisionTask,
  PollForDecisionTaskError,
  Credentials | HttpClient.HttpClient,
  HistoryEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: PollForDecisionTaskInput,
  output: DecisionTask,
  errors: [
    LimitExceededFault,
    OperationNotPermittedFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PollForDecisionTask",
  pagination: {
    inputToken: "nextPageToken",
    outputToken: "nextPageToken",
    items: "events",
    pageSize: "maximumPageSize",
  } as const,
})) as any;

export type RecordActivityTaskHeartbeatError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Used by activity workers to report to the service that the ActivityTask represented by the specified `taskToken` is still making progress. The worker
 * can also specify details of the progress, for example percent complete, using the
 * `details` parameter. This action can also be used by the worker as a mechanism to
 * check if cancellation is being requested for the activity task. If a cancellation is being
 * attempted for the specified task, then the boolean `cancelRequested` flag returned
 * by the service is set to `true`.
 *
 * This action resets the `taskHeartbeatTimeout` clock. The
 * `taskHeartbeatTimeout` is specified in RegisterActivityType.
 *
 * This action doesn't in itself create an event in the workflow execution history.
 * However, if the task times out, the workflow execution history contains a
 * `ActivityTaskTimedOut` event that contains the information from the last
 * heartbeat generated by the activity worker.
 *
 * The `taskStartToCloseTimeout` of an activity type is the maximum duration
 * of an activity task, regardless of the number of RecordActivityTaskHeartbeat requests received. The `taskStartToCloseTimeout` is also specified in RegisterActivityType.
 *
 * This operation is only useful for long-lived activities to report liveliness of the
 * task and to determine if a cancellation is being attempted.
 *
 * If the `cancelRequested` flag returns `true`, a cancellation is
 * being attempted. If the worker can cancel the activity, it should respond with RespondActivityTaskCanceled. Otherwise, it should ignore the cancellation
 * request.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const recordActivityTaskHeartbeat: API.OperationMethod<
  RecordActivityTaskHeartbeatInput,
  ActivityTaskStatus,
  RecordActivityTaskHeartbeatError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RecordActivityTaskHeartbeatInput,
  output: ActivityTaskStatus,
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RecordActivityTaskHeartbeat",
}));

export type RegisterActivityTypeError =
  | LimitExceededFault
  | OperationNotPermittedFault
  | TypeAlreadyExistsFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Registers a new *activity type* along with its configuration
 * settings in the specified domain.
 *
 * A `TypeAlreadyExists` fault is returned if the type already exists in the
 * domain. You cannot change any configuration settings of the type after its registration, and
 * it must be registered as a new version.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `defaultTaskList.name`: String constraint. The key is
 * `swf:defaultTaskList.name`.
 *
 * - `name`: String constraint. The key is `swf:name`.
 *
 * - `version`: String constraint. The key is
 * `swf:version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const registerActivityType: API.OperationMethod<
  RegisterActivityTypeInput,
  RegisterActivityTypeResponse,
  RegisterActivityTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterActivityTypeInput,
  output: RegisterActivityTypeResponse,
  errors: [
    LimitExceededFault,
    OperationNotPermittedFault,
    TypeAlreadyExistsFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterActivityType",
}));

export type RegisterDomainError =
  | DomainAlreadyExistsFault
  | LimitExceededFault
  | OperationNotPermittedFault
  | TooManyTagsFault
  | CommonErrors;
/**
 * Registers a new domain.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - You cannot use an IAM policy to control domain access for this action. The name of
 * the domain being registered is available as the resource of this action.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const registerDomain: API.OperationMethod<
  RegisterDomainInput,
  RegisterDomainResponse,
  RegisterDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterDomainInput,
  output: RegisterDomainResponse,
  errors: [
    DomainAlreadyExistsFault,
    LimitExceededFault,
    OperationNotPermittedFault,
    TooManyTagsFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterDomain",
}));

export type RegisterWorkflowTypeError =
  | LimitExceededFault
  | OperationNotPermittedFault
  | TypeAlreadyExistsFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Registers a new *workflow type* and its configuration settings in
 * the specified domain.
 *
 * The retention period for the workflow history is set by the RegisterDomain action.
 *
 * If the type already exists, then a `TypeAlreadyExists` fault is returned.
 * You cannot change the configuration settings of a workflow type once it is registered and it
 * must be registered as a new version.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `defaultTaskList.name`: String constraint. The key is
 * `swf:defaultTaskList.name`.
 *
 * - `name`: String constraint. The key is `swf:name`.
 *
 * - `version`: String constraint. The key is
 * `swf:version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const registerWorkflowType: API.OperationMethod<
  RegisterWorkflowTypeInput,
  RegisterWorkflowTypeResponse,
  RegisterWorkflowTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterWorkflowTypeInput,
  output: RegisterWorkflowTypeResponse,
  errors: [
    LimitExceededFault,
    OperationNotPermittedFault,
    TypeAlreadyExistsFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterWorkflowType",
}));

export type RequestCancelWorkflowExecutionError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Records a `WorkflowExecutionCancelRequested` event in the currently running
 * workflow execution identified by the given domain, workflowId, and runId. This logically
 * requests the cancellation of the workflow execution as a whole. It is up to the decider to
 * take appropriate actions when it receives an execution history with this event.
 *
 * If the runId isn't specified, the `WorkflowExecutionCancelRequested` event
 * is recorded in the history of the current open workflow execution with the specified
 * workflowId in the domain.
 *
 * Because this action allows the workflow to properly clean up and gracefully close, it
 * should be used instead of TerminateWorkflowExecution when
 * possible.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const requestCancelWorkflowExecution: API.OperationMethod<
  RequestCancelWorkflowExecutionInput,
  RequestCancelWorkflowExecutionResponse,
  RequestCancelWorkflowExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RequestCancelWorkflowExecutionInput,
  output: RequestCancelWorkflowExecutionResponse,
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RequestCancelWorkflowExecution",
}));

export type RespondActivityTaskCanceledError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Used by workers to tell the service that the ActivityTask identified
 * by the `taskToken` was successfully canceled. Additional `details` can
 * be provided using the `details` argument.
 *
 * These `details` (if provided) appear in the
 * `ActivityTaskCanceled` event added to the workflow history.
 *
 * Only use this operation if the `canceled` flag of a RecordActivityTaskHeartbeat request returns `true` and if the
 * activity can be safely undone or abandoned.
 *
 * A task is considered open from the time that it is scheduled until it is closed.
 * Therefore a task is reported as open while a worker is processing it. A task is closed after
 * it has been specified in a call to RespondActivityTaskCompleted,
 * RespondActivityTaskCanceled, RespondActivityTaskFailed, or the task has
 * timed
 * out.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const respondActivityTaskCanceled: API.OperationMethod<
  RespondActivityTaskCanceledInput,
  RespondActivityTaskCanceledResponse,
  RespondActivityTaskCanceledError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RespondActivityTaskCanceledInput,
  output: RespondActivityTaskCanceledResponse,
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RespondActivityTaskCanceled",
}));

export type RespondActivityTaskCompletedError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Used by workers to tell the service that the ActivityTask identified
 * by the `taskToken` completed successfully with a `result` (if provided).
 * The `result` appears in the `ActivityTaskCompleted` event in the
 * workflow history.
 *
 * If the requested task doesn't complete successfully, use RespondActivityTaskFailed instead. If the worker finds that the task is
 * canceled through the `canceled` flag returned by RecordActivityTaskHeartbeat, it should cancel the task, clean up and then call
 * RespondActivityTaskCanceled.
 *
 * A task is considered open from the time that it is scheduled until it is closed.
 * Therefore a task is reported as open while a worker is processing it. A task is closed after
 * it has been specified in a call to RespondActivityTaskCompleted, RespondActivityTaskCanceled, RespondActivityTaskFailed, or the
 * task has timed
 * out.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const respondActivityTaskCompleted: API.OperationMethod<
  RespondActivityTaskCompletedInput,
  RespondActivityTaskCompletedResponse,
  RespondActivityTaskCompletedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RespondActivityTaskCompletedInput,
  output: RespondActivityTaskCompletedResponse,
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RespondActivityTaskCompleted",
}));

export type RespondActivityTaskFailedError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Used by workers to tell the service that the ActivityTask identified
 * by the `taskToken` has failed with `reason` (if specified). The
 * `reason` and `details` appear in the `ActivityTaskFailed`
 * event added to the workflow history.
 *
 * A task is considered open from the time that it is scheduled until it is closed.
 * Therefore a task is reported as open while a worker is processing it. A task is closed after
 * it has been specified in a call to RespondActivityTaskCompleted, RespondActivityTaskCanceled, RespondActivityTaskFailed, or the task has timed
 * out.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const respondActivityTaskFailed: API.OperationMethod<
  RespondActivityTaskFailedInput,
  RespondActivityTaskFailedResponse,
  RespondActivityTaskFailedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RespondActivityTaskFailedInput,
  output: RespondActivityTaskFailedResponse,
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RespondActivityTaskFailed",
}));

export type RespondDecisionTaskCompletedError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Used by deciders to tell the service that the DecisionTask identified
 * by the `taskToken` has successfully completed. The `decisions` argument
 * specifies the list of decisions made while processing the task.
 *
 * A `DecisionTaskCompleted` event is added to the workflow history. The
 * `executionContext` specified is attached to the event in the workflow execution
 * history.
 *
 * **Access Control**
 *
 * If an IAM policy grants permission to use `RespondDecisionTaskCompleted`, it
 * can express permissions for the list of decisions in the `decisions` parameter.
 * Each of the decisions has one or more parameters, much like a regular API call. To allow for
 * policies to be as readable as possible, you can express permissions on decisions as if they
 * were actual API calls, including applying conditions to some parameters. For more information,
 * see Using
 * IAM to Manage Access to Amazon SWF Workflows in the
 * *Amazon SWF Developer Guide*.
 */
export const respondDecisionTaskCompleted: API.OperationMethod<
  RespondDecisionTaskCompletedInput,
  RespondDecisionTaskCompletedResponse,
  RespondDecisionTaskCompletedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RespondDecisionTaskCompletedInput,
  output: RespondDecisionTaskCompletedResponse,
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RespondDecisionTaskCompleted",
}));

export type SignalWorkflowExecutionError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Records a `WorkflowExecutionSignaled` event in the workflow execution
 * history and creates a decision task for the workflow execution identified by the given domain,
 * workflowId and runId. The event is recorded with the specified user defined signalName and
 * input (if provided).
 *
 * If a runId isn't specified, then the `WorkflowExecutionSignaled` event is
 * recorded in the history of the current open workflow with the matching workflowId in the
 * domain.
 *
 * If the specified workflow execution isn't open, this method fails with
 * `UnknownResource`.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const signalWorkflowExecution: API.OperationMethod<
  SignalWorkflowExecutionInput,
  SignalWorkflowExecutionResponse,
  SignalWorkflowExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SignalWorkflowExecutionInput,
  output: SignalWorkflowExecutionResponse,
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SignalWorkflowExecution",
}));

export type StartWorkflowExecutionError =
  | DefaultUndefinedFault
  | LimitExceededFault
  | OperationNotPermittedFault
  | TypeDeprecatedFault
  | UnknownResourceFault
  | WorkflowExecutionAlreadyStartedFault
  | CommonErrors;
/**
 * Starts an execution of the workflow type in the specified domain using the provided
 * `workflowId` and input data.
 *
 * This action returns the newly started workflow execution.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `tagList.member.0`: The key is `swf:tagList.member.0`.
 *
 * - `tagList.member.1`: The key is `swf:tagList.member.1`.
 *
 * - `tagList.member.2`: The key is `swf:tagList.member.2`.
 *
 * - `tagList.member.3`: The key is `swf:tagList.member.3`.
 *
 * - `tagList.member.4`: The key is `swf:tagList.member.4`.
 *
 * - `taskList`: String constraint. The key is
 * `swf:taskList.name`.
 *
 * - `workflowType.name`: String constraint. The key is
 * `swf:workflowType.name`.
 *
 * - `workflowType.version`: String constraint. The key is
 * `swf:workflowType.version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const startWorkflowExecution: API.OperationMethod<
  StartWorkflowExecutionInput,
  Run,
  StartWorkflowExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartWorkflowExecutionInput,
  output: Run,
  errors: [
    DefaultUndefinedFault,
    LimitExceededFault,
    OperationNotPermittedFault,
    TypeDeprecatedFault,
    UnknownResourceFault,
    WorkflowExecutionAlreadyStartedFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartWorkflowExecution",
}));

export type TagResourceError =
  | LimitExceededFault
  | OperationNotPermittedFault
  | TooManyTagsFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Add a tag to a Amazon SWF domain.
 *
 * Amazon SWF supports a maximum of 50 tags per resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceResponse,
  errors: [
    LimitExceededFault,
    OperationNotPermittedFault,
    TooManyTagsFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TerminateWorkflowExecutionError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Records a `WorkflowExecutionTerminated` event and forces closure of the
 * workflow execution identified by the given domain, runId, and workflowId. The child policy,
 * registered with the workflow type or specified when starting this execution, is applied to any
 * open child workflow executions of this workflow execution.
 *
 * If the identified workflow execution was in progress, it is terminated
 * immediately.
 *
 * If a runId isn't specified, then the `WorkflowExecutionTerminated` event
 * is recorded in the history of the current open workflow with the matching workflowId in the
 * domain.
 *
 * You should consider using RequestCancelWorkflowExecution action
 * instead because it allows the workflow to gracefully close while TerminateWorkflowExecution doesn't.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const terminateWorkflowExecution: API.OperationMethod<
  TerminateWorkflowExecutionInput,
  TerminateWorkflowExecutionResponse,
  TerminateWorkflowExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TerminateWorkflowExecutionInput,
  output: TerminateWorkflowExecutionResponse,
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateWorkflowExecution",
}));

export type UndeprecateActivityTypeError =
  | OperationNotPermittedFault
  | TypeAlreadyExistsFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Undeprecates a previously deprecated *activity type*. After an activity type has
 * been undeprecated, you can create new tasks of that activity type.
 *
 * This operation is eventually consistent. The results are best effort and may not
 * exactly reflect recent updates and changes.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `activityType.name`: String constraint. The key is
 * `swf:activityType.name`.
 *
 * - `activityType.version`: String constraint. The key is
 * `swf:activityType.version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const undeprecateActivityType: API.OperationMethod<
  UndeprecateActivityTypeInput,
  UndeprecateActivityTypeResponse,
  UndeprecateActivityTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UndeprecateActivityTypeInput,
  output: UndeprecateActivityTypeResponse,
  errors: [
    OperationNotPermittedFault,
    TypeAlreadyExistsFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UndeprecateActivityType",
}));

export type UndeprecateDomainError =
  | DomainAlreadyExistsFault
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Undeprecates a previously deprecated domain. After a domain has been undeprecated it can be used
 * to create new workflow executions or register new types.
 *
 * This operation is eventually consistent. The results are best effort and may not
 * exactly reflect recent updates and changes.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const undeprecateDomain: API.OperationMethod<
  UndeprecateDomainInput,
  UndeprecateDomainResponse,
  UndeprecateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UndeprecateDomainInput,
  output: UndeprecateDomainResponse,
  errors: [
    DomainAlreadyExistsFault,
    OperationNotPermittedFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UndeprecateDomain",
}));

export type UndeprecateWorkflowTypeError =
  | OperationNotPermittedFault
  | TypeAlreadyExistsFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Undeprecates a previously deprecated *workflow type*. After a workflow type has
 * been undeprecated, you can create new executions of that type.
 *
 * This operation is eventually consistent. The results are best effort and may not
 * exactly reflect recent updates and changes.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `workflowType.name`: String constraint. The key is
 * `swf:workflowType.name`.
 *
 * - `workflowType.version`: String constraint. The key is
 * `swf:workflowType.version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const undeprecateWorkflowType: API.OperationMethod<
  UndeprecateWorkflowTypeInput,
  UndeprecateWorkflowTypeResponse,
  UndeprecateWorkflowTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UndeprecateWorkflowTypeInput,
  output: UndeprecateWorkflowTypeResponse,
  errors: [
    OperationNotPermittedFault,
    TypeAlreadyExistsFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UndeprecateWorkflowType",
}));

export type UntagResourceError =
  | LimitExceededFault
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Remove a tag from a Amazon SWF domain.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceResponse,
  errors: [
    LimitExceededFault,
    OperationNotPermittedFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));
