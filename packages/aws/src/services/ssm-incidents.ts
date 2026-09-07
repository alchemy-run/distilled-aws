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
  sdkId: "SSM Incidents",
  serviceShapeName: "SSMIncidents",
});
const auth = T.AwsAuthSigv4({ name: "ssm-incidents" });
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
              `https://ssm-incidents-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://ssm-incidents-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://ssm-incidents.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://ssm-incidents.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
      resourceIdentifier: S.optional(S.String),
      resourceType: S.optional(S.String),
      retryAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceIdentifier: S.optional(S.String),
      resourceType: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceIdentifier: S.optional(S.String),
      resourceType: S.optional(S.String),
      serviceCode: S.String,
      quotaCode: S.String,
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      serviceCode: S.String,
      quotaCode: S.String,
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperationException>()(
    "UnsupportedOperationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type Arn = string;
export type FindingId = string;
export type FindingIdList = string[];
export const FindingIdList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetIncidentFindingsInput {
  incidentRecordArn: string;
  findingIds: string[];
}
export const BatchGetIncidentFindingsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ incidentRecordArn: S.String, findingIds: FindingIdList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/batchGetIncidentFindings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetIncidentFindingsInput",
}) as any as S.Schema<BatchGetIncidentFindingsInput>;
export interface CodeDeployDeployment {
  startTime: Date;
  endTime?: Date;
  deploymentGroupArn: string;
  deploymentId: string;
}
export const CodeDeployDeployment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    deploymentGroupArn: S.String,
    deploymentId: S.String,
  }),
).annotate({
  identifier: "CodeDeployDeployment",
}) as any as S.Schema<CodeDeployDeployment>;
export interface CloudFormationStackUpdate {
  startTime: Date;
  endTime?: Date;
  stackArn: string;
}
export const CloudFormationStackUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    stackArn: S.String,
  }),
).annotate({
  identifier: "CloudFormationStackUpdate",
}) as any as S.Schema<CloudFormationStackUpdate>;
export type FindingDetails =
  | {
      codeDeployDeployment: CodeDeployDeployment;
      cloudFormationStackUpdate?: never;
    }
  | {
      codeDeployDeployment?: never;
      cloudFormationStackUpdate: CloudFormationStackUpdate;
    };
export const FindingDetails = /*@__PURE__*/ S.Union([
  S.Struct({ codeDeployDeployment: CodeDeployDeployment }),
  S.Struct({ cloudFormationStackUpdate: CloudFormationStackUpdate }),
]);
export interface Finding {
  id: string;
  creationTime: Date;
  lastModifiedTime: Date;
  details?: FindingDetails;
}
export const Finding = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    details: S.optional(FindingDetails),
  }),
).annotate({ identifier: "Finding" }) as any as S.Schema<Finding>;
export type FindingList = Finding[];
export const FindingList = /*@__PURE__*/ S.Array(Finding);
export interface BatchGetIncidentFindingsError_ {
  findingId: string;
  code: string;
  message: string;
}
export const BatchGetIncidentFindingsError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ findingId: S.String, code: S.String, message: S.String }),
).annotate({
  identifier: "BatchGetIncidentFindingsError",
}) as any as S.Schema<BatchGetIncidentFindingsError_>;
export type BatchGetIncidentFindingsErrorList =
  BatchGetIncidentFindingsError_[];
export const BatchGetIncidentFindingsErrorList = /*@__PURE__*/ S.Array(
  BatchGetIncidentFindingsError_,
);
export interface BatchGetIncidentFindingsOutput {
  findings: Finding[];
  errors: BatchGetIncidentFindingsError_[];
}
export const BatchGetIncidentFindingsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    findings: FindingList,
    errors: BatchGetIncidentFindingsErrorList,
  }),
).annotate({
  identifier: "BatchGetIncidentFindingsOutput",
}) as any as S.Schema<BatchGetIncidentFindingsOutput>;
export type RegionName = string;
export type SseKmsKey = string;
export interface RegionMapInputValue {
  sseKmsKeyId?: string;
}
export const RegionMapInputValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sseKmsKeyId: S.optional(S.String) }),
).annotate({
  identifier: "RegionMapInputValue",
}) as any as S.Schema<RegionMapInputValue>;
export type RegionMapInput = { [key: string]: RegionMapInputValue | undefined };
export const RegionMapInput = /*@__PURE__*/ S.Record(
  S.String,
  RegionMapInputValue.pipe(S.optional),
);
export type ClientToken = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateReplicationSetInput {
  regions: { [key: string]: RegionMapInputValue | undefined };
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateReplicationSetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    regions: RegionMapInput,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/createReplicationSet" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateReplicationSetInput",
}) as any as S.Schema<CreateReplicationSetInput>;
export interface CreateReplicationSetOutput {
  arn: string;
}
export const CreateReplicationSetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }),
).annotate({
  identifier: "CreateReplicationSetOutput",
}) as any as S.Schema<CreateReplicationSetOutput>;
export type ResponsePlanName = string;
export type ResponsePlanDisplayName = string;
export type IncidentTitle = string;
export type Impact = number;
export type IncidentSummary = string;
export type DedupeString = string;
export type NotificationTargetItem = { snsTopicArn: string };
export const NotificationTargetItem = /*@__PURE__*/ S.Union([
  S.Struct({ snsTopicArn: S.String }),
]);
export type NotificationTargetSet = NotificationTargetItem[];
export const NotificationTargetSet = /*@__PURE__*/ S.Array(
  NotificationTargetItem,
);
export interface IncidentTemplate {
  title: string;
  impact: number;
  summary?: string;
  dedupeString?: string;
  notificationTargets?: NotificationTargetItem[];
  incidentTags?: { [key: string]: string | undefined };
}
export const IncidentTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    title: S.String,
    impact: S.Number,
    summary: S.optional(S.String),
    dedupeString: S.optional(S.String),
    notificationTargets: S.optional(NotificationTargetSet),
    incidentTags: S.optional(TagMap),
  }),
).annotate({
  identifier: "IncidentTemplate",
}) as any as S.Schema<IncidentTemplate>;
export interface EmptyChatChannel {}
export const EmptyChatChannel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "EmptyChatChannel",
}) as any as S.Schema<EmptyChatChannel>;
export type SnsArn = string;
export type ChatbotSnsConfigurationSet = string[];
export const ChatbotSnsConfigurationSet = /*@__PURE__*/ S.Array(S.String);
export type ChatChannel =
  | { empty: EmptyChatChannel; chatbotSns?: never }
  | { empty?: never; chatbotSns: string[] };
export const ChatChannel = /*@__PURE__*/ S.Union([
  S.Struct({ empty: EmptyChatChannel }),
  S.Struct({ chatbotSns: ChatbotSnsConfigurationSet }),
]);
export type SsmContactsArn = string;
export type EngagementSet = string[];
export const EngagementSet = /*@__PURE__*/ S.Array(S.String);
export type RoleArn = string;
export type SsmTargetAccount = string;
export type SsmParameterValues = string[];
export const SsmParameterValues = /*@__PURE__*/ S.Array(S.String);
export type SsmParameters = { [key: string]: string[] | undefined };
export const SsmParameters = /*@__PURE__*/ S.Record(
  S.String,
  SsmParameterValues.pipe(S.optional),
);
export type VariableType = string;
export type DynamicSsmParameterValue = { variable: string };
export const DynamicSsmParameterValue = /*@__PURE__*/ S.Union([
  S.Struct({ variable: S.String }),
]);
export type DynamicSsmParameters = {
  [key: string]: DynamicSsmParameterValue | undefined;
};
export const DynamicSsmParameters = /*@__PURE__*/ S.Record(
  S.String,
  DynamicSsmParameterValue.pipe(S.optional),
);
export interface SsmAutomation {
  roleArn: string;
  documentName: string;
  documentVersion?: string;
  targetAccount?: string;
  parameters?: { [key: string]: string[] | undefined };
  dynamicParameters?: { [key: string]: DynamicSsmParameterValue | undefined };
}
export const SsmAutomation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleArn: S.String,
    documentName: S.String,
    documentVersion: S.optional(S.String),
    targetAccount: S.optional(S.String),
    parameters: S.optional(SsmParameters),
    dynamicParameters: S.optional(DynamicSsmParameters),
  }),
).annotate({ identifier: "SsmAutomation" }) as any as S.Schema<SsmAutomation>;
export type Action = { ssmAutomation: SsmAutomation };
export const Action = /*@__PURE__*/ S.Union([
  S.Struct({ ssmAutomation: SsmAutomation }),
]);
export type ActionsList = Action[];
export const ActionsList = /*@__PURE__*/ S.Array(Action);
export interface PagerDutyIncidentConfiguration {
  serviceId: string;
}
export const PagerDutyIncidentConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceId: S.String }),
).annotate({
  identifier: "PagerDutyIncidentConfiguration",
}) as any as S.Schema<PagerDutyIncidentConfiguration>;
export interface PagerDutyConfiguration {
  name: string;
  secretId: string;
  pagerDutyIncidentConfiguration: PagerDutyIncidentConfiguration;
}
export const PagerDutyConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    secretId: S.String,
    pagerDutyIncidentConfiguration: PagerDutyIncidentConfiguration,
  }),
).annotate({
  identifier: "PagerDutyConfiguration",
}) as any as S.Schema<PagerDutyConfiguration>;
export type Integration = { pagerDutyConfiguration: PagerDutyConfiguration };
export const Integration = /*@__PURE__*/ S.Union([
  S.Struct({ pagerDutyConfiguration: PagerDutyConfiguration }),
]);
export type Integrations = Integration[];
export const Integrations = /*@__PURE__*/ S.Array(Integration);
export interface CreateResponsePlanInput {
  clientToken?: string;
  name: string;
  displayName?: string;
  incidentTemplate: IncidentTemplate;
  chatChannel?: ChatChannel;
  engagements?: string[];
  actions?: Action[];
  tags?: { [key: string]: string | undefined };
  integrations?: Integration[];
}
export const CreateResponsePlanInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    name: S.String,
    displayName: S.optional(S.String),
    incidentTemplate: IncidentTemplate,
    chatChannel: S.optional(ChatChannel),
    engagements: S.optional(EngagementSet),
    actions: S.optional(ActionsList),
    tags: S.optional(TagMap),
    integrations: S.optional(Integrations),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/createResponsePlan" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateResponsePlanInput",
}) as any as S.Schema<CreateResponsePlanInput>;
export interface CreateResponsePlanOutput {
  arn: string;
}
export const CreateResponsePlanOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }),
).annotate({
  identifier: "CreateResponsePlanOutput",
}) as any as S.Schema<CreateResponsePlanOutput>;
export type TimelineEventType = string;
export type EventData = string;
export type GeneratedId = string;
export type EventReference =
  | { resource: string; relatedItemId?: never }
  | { resource?: never; relatedItemId: string };
export const EventReference = /*@__PURE__*/ S.Union([
  S.Struct({ resource: S.String }),
  S.Struct({ relatedItemId: S.String }),
]);
export type EventReferenceList = EventReference[];
export const EventReferenceList = /*@__PURE__*/ S.Array(EventReference);
export interface CreateTimelineEventInput {
  clientToken?: string;
  incidentRecordArn: string;
  eventTime: Date;
  eventType: string;
  eventData: string;
  eventReferences?: EventReference[];
}
export const CreateTimelineEventInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    incidentRecordArn: S.String,
    eventTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    eventType: S.String,
    eventData: S.String,
    eventReferences: S.optional(EventReferenceList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/createTimelineEvent" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateTimelineEventInput",
}) as any as S.Schema<CreateTimelineEventInput>;
export type UUID = string;
export interface CreateTimelineEventOutput {
  incidentRecordArn: string;
  eventId: string;
}
export const CreateTimelineEventOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ incidentRecordArn: S.String, eventId: S.String }),
).annotate({
  identifier: "CreateTimelineEventOutput",
}) as any as S.Schema<CreateTimelineEventOutput>;
export interface DeleteIncidentRecordInput {
  arn: string;
}
export const DeleteIncidentRecordInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/deleteIncidentRecord" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIncidentRecordInput",
}) as any as S.Schema<DeleteIncidentRecordInput>;
export interface DeleteIncidentRecordOutput {}
export const DeleteIncidentRecordOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteIncidentRecordOutput",
}) as any as S.Schema<DeleteIncidentRecordOutput>;
export interface DeleteReplicationSetInput {
  arn: string;
}
export const DeleteReplicationSetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String.pipe(T.HttpQuery("arn")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/deleteReplicationSet" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteReplicationSetInput",
}) as any as S.Schema<DeleteReplicationSetInput>;
export interface DeleteReplicationSetOutput {}
export const DeleteReplicationSetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteReplicationSetOutput",
}) as any as S.Schema<DeleteReplicationSetOutput>;
export type PolicyId = string;
export interface DeleteResourcePolicyInput {
  resourceArn: string;
  policyId: string;
}
export const DeleteResourcePolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, policyId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/deleteResourcePolicy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteResourcePolicyInput",
}) as any as S.Schema<DeleteResourcePolicyInput>;
export interface DeleteResourcePolicyOutput {}
export const DeleteResourcePolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteResourcePolicyOutput",
}) as any as S.Schema<DeleteResourcePolicyOutput>;
export interface DeleteResponsePlanInput {
  arn: string;
}
export const DeleteResponsePlanInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/deleteResponsePlan" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteResponsePlanInput",
}) as any as S.Schema<DeleteResponsePlanInput>;
export interface DeleteResponsePlanOutput {}
export const DeleteResponsePlanOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteResponsePlanOutput",
}) as any as S.Schema<DeleteResponsePlanOutput>;
export interface DeleteTimelineEventInput {
  incidentRecordArn: string;
  eventId: string;
}
export const DeleteTimelineEventInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ incidentRecordArn: S.String, eventId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/deleteTimelineEvent" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTimelineEventInput",
}) as any as S.Schema<DeleteTimelineEventInput>;
export interface DeleteTimelineEventOutput {}
export const DeleteTimelineEventOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTimelineEventOutput",
}) as any as S.Schema<DeleteTimelineEventOutput>;
export interface GetIncidentRecordInput {
  arn: string;
}
export const GetIncidentRecordInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String.pipe(T.HttpQuery("arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/getIncidentRecord" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIncidentRecordInput",
}) as any as S.Schema<GetIncidentRecordInput>;
export type IncidentRecordStatus = string;
export type AutomationExecution = { ssmExecutionArn: string };
export const AutomationExecution = /*@__PURE__*/ S.Union([
  S.Struct({ ssmExecutionArn: S.String }),
]);
export type AutomationExecutionSet = AutomationExecution[];
export const AutomationExecutionSet =
  /*@__PURE__*/ S.Array(AutomationExecution);
export type ServicePrincipal = string;
export type IncidentSource = string;
export interface IncidentRecordSource {
  createdBy: string;
  invokedBy?: string;
  resourceArn?: string;
  source: string;
}
export const IncidentRecordSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createdBy: S.String,
    invokedBy: S.optional(S.String),
    resourceArn: S.optional(S.String),
    source: S.String,
  }),
).annotate({
  identifier: "IncidentRecordSource",
}) as any as S.Schema<IncidentRecordSource>;
export interface IncidentRecord {
  arn: string;
  title: string;
  summary?: string;
  status: string;
  impact: number;
  creationTime: Date;
  resolvedTime?: Date;
  lastModifiedTime: Date;
  lastModifiedBy: string;
  automationExecutions?: AutomationExecution[];
  incidentRecordSource: IncidentRecordSource;
  dedupeString: string;
  chatChannel?: ChatChannel;
  notificationTargets?: NotificationTargetItem[];
}
export const IncidentRecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    title: S.String,
    summary: S.optional(S.String),
    status: S.String,
    impact: S.Number,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    resolvedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModifiedBy: S.String,
    automationExecutions: S.optional(AutomationExecutionSet),
    incidentRecordSource: IncidentRecordSource,
    dedupeString: S.String,
    chatChannel: S.optional(ChatChannel),
    notificationTargets: S.optional(NotificationTargetSet),
  }),
).annotate({ identifier: "IncidentRecord" }) as any as S.Schema<IncidentRecord>;
export interface GetIncidentRecordOutput {
  incidentRecord: IncidentRecord;
}
export const GetIncidentRecordOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ incidentRecord: IncidentRecord }),
).annotate({
  identifier: "GetIncidentRecordOutput",
}) as any as S.Schema<GetIncidentRecordOutput>;
export interface GetReplicationSetInput {
  arn: string;
}
export const GetReplicationSetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String.pipe(T.HttpQuery("arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/getReplicationSet" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReplicationSetInput",
}) as any as S.Schema<GetReplicationSetInput>;
export type RegionStatus = string;
export interface RegionInfo {
  sseKmsKeyId?: string;
  status: string;
  statusMessage?: string;
  statusUpdateDateTime: Date;
}
export const RegionInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sseKmsKeyId: S.optional(S.String),
    status: S.String,
    statusMessage: S.optional(S.String),
    statusUpdateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "RegionInfo" }) as any as S.Schema<RegionInfo>;
export type RegionInfoMap = { [key: string]: RegionInfo | undefined };
export const RegionInfoMap = /*@__PURE__*/ S.Record(
  S.String,
  RegionInfo.pipe(S.optional),
);
export type ReplicationSetStatus = string;
export interface ReplicationSet {
  arn?: string;
  regionMap: { [key: string]: RegionInfo | undefined };
  status: string;
  deletionProtected: boolean;
  createdTime: Date;
  createdBy: string;
  lastModifiedTime: Date;
  lastModifiedBy: string;
}
export const ReplicationSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    regionMap: RegionInfoMap,
    status: S.String,
    deletionProtected: S.Boolean,
    createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    createdBy: S.String,
    lastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModifiedBy: S.String,
  }),
).annotate({ identifier: "ReplicationSet" }) as any as S.Schema<ReplicationSet>;
export interface GetReplicationSetOutput {
  replicationSet: ReplicationSet;
}
export const GetReplicationSetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ replicationSet: ReplicationSet }),
).annotate({
  identifier: "GetReplicationSetOutput",
}) as any as S.Schema<GetReplicationSetOutput>;
export type MaxResults = number;
export type NextToken = string;
export interface GetResourcePoliciesInput {
  resourceArn: string;
  maxResults?: number;
  nextToken?: string;
}
export const GetResourcePoliciesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/getResourcePolicies" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourcePoliciesInput",
}) as any as S.Schema<GetResourcePoliciesInput>;
export type Policy = string;
export interface ResourcePolicy {
  policyDocument: string;
  policyId: string;
  ramResourceShareRegion: string;
}
export const ResourcePolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyDocument: S.String,
    policyId: S.String,
    ramResourceShareRegion: S.String,
  }),
).annotate({ identifier: "ResourcePolicy" }) as any as S.Schema<ResourcePolicy>;
export type ResourcePolicyList = ResourcePolicy[];
export const ResourcePolicyList = /*@__PURE__*/ S.Array(ResourcePolicy);
export interface GetResourcePoliciesOutput {
  resourcePolicies: ResourcePolicy[];
  nextToken?: string;
}
export const GetResourcePoliciesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourcePolicies: ResourcePolicyList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetResourcePoliciesOutput",
}) as any as S.Schema<GetResourcePoliciesOutput>;
export interface GetResponsePlanInput {
  arn: string;
}
export const GetResponsePlanInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String.pipe(T.HttpQuery("arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/getResponsePlan" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResponsePlanInput",
}) as any as S.Schema<GetResponsePlanInput>;
export interface GetResponsePlanOutput {
  arn: string;
  name: string;
  displayName?: string;
  incidentTemplate: IncidentTemplate;
  chatChannel?: ChatChannel;
  engagements?: string[];
  actions?: Action[];
  integrations?: Integration[];
}
export const GetResponsePlanOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.String,
    displayName: S.optional(S.String),
    incidentTemplate: IncidentTemplate,
    chatChannel: S.optional(ChatChannel),
    engagements: S.optional(EngagementSet),
    actions: S.optional(ActionsList),
    integrations: S.optional(Integrations),
  }),
).annotate({
  identifier: "GetResponsePlanOutput",
}) as any as S.Schema<GetResponsePlanOutput>;
export interface GetTimelineEventInput {
  incidentRecordArn: string;
  eventId: string;
}
export const GetTimelineEventInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    incidentRecordArn: S.String.pipe(T.HttpQuery("incidentRecordArn")),
    eventId: S.String.pipe(T.HttpQuery("eventId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/getTimelineEvent" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTimelineEventInput",
}) as any as S.Schema<GetTimelineEventInput>;
export interface TimelineEvent {
  incidentRecordArn: string;
  eventId: string;
  eventTime: Date;
  eventUpdatedTime: Date;
  eventType: string;
  eventData: string;
  eventReferences?: EventReference[];
}
export const TimelineEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    incidentRecordArn: S.String,
    eventId: S.String,
    eventTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    eventUpdatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    eventType: S.String,
    eventData: S.String,
    eventReferences: S.optional(EventReferenceList),
  }),
).annotate({ identifier: "TimelineEvent" }) as any as S.Schema<TimelineEvent>;
export interface GetTimelineEventOutput {
  event: TimelineEvent;
}
export const GetTimelineEventOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ event: TimelineEvent }),
).annotate({
  identifier: "GetTimelineEventOutput",
}) as any as S.Schema<GetTimelineEventOutput>;
export interface ListIncidentFindingsInput {
  incidentRecordArn: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListIncidentFindingsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    incidentRecordArn: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/listIncidentFindings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIncidentFindingsInput",
}) as any as S.Schema<ListIncidentFindingsInput>;
export interface FindingSummary {
  id: string;
  lastModifiedTime: Date;
}
export const FindingSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    lastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "FindingSummary" }) as any as S.Schema<FindingSummary>;
export type FindingSummaryList = FindingSummary[];
export const FindingSummaryList = /*@__PURE__*/ S.Array(FindingSummary);
export interface ListIncidentFindingsOutput {
  findings: FindingSummary[];
  nextToken?: string;
}
export const ListIncidentFindingsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ findings: FindingSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListIncidentFindingsOutput",
}) as any as S.Schema<ListIncidentFindingsOutput>;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export type IntegerList = number[];
export const IntegerList = /*@__PURE__*/ S.Array(S.Number);
export type AttributeValueList =
  | { stringValues: string[]; integerValues?: never }
  | { stringValues?: never; integerValues: number[] };
export const AttributeValueList = /*@__PURE__*/ S.Union([
  S.Struct({ stringValues: StringList }),
  S.Struct({ integerValues: IntegerList }),
]);
export type Condition =
  | { before: Date; after?: never; equals?: never }
  | { before?: never; after: Date; equals?: never }
  | { before?: never; after?: never; equals: AttributeValueList };
export const Condition = /*@__PURE__*/ S.Union([
  S.Struct({ before: S.Date.pipe(T.TimestampFormat("epoch-seconds")) }),
  S.Struct({ after: S.Date.pipe(T.TimestampFormat("epoch-seconds")) }),
  S.Struct({ equals: AttributeValueList }),
]);
export interface Filter {
  key: string;
  condition: Condition;
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, condition: Condition }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type FilterList = Filter[];
export const FilterList = /*@__PURE__*/ S.Array(Filter);
export interface ListIncidentRecordsInput {
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListIncidentRecordsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.optional(FilterList),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/listIncidentRecords" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIncidentRecordsInput",
}) as any as S.Schema<ListIncidentRecordsInput>;
export interface IncidentRecordSummary {
  arn: string;
  title: string;
  status: string;
  impact: number;
  creationTime: Date;
  resolvedTime?: Date;
  incidentRecordSource: IncidentRecordSource;
}
export const IncidentRecordSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    title: S.String,
    status: S.String,
    impact: S.Number,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    resolvedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    incidentRecordSource: IncidentRecordSource,
  }),
).annotate({
  identifier: "IncidentRecordSummary",
}) as any as S.Schema<IncidentRecordSummary>;
export type IncidentRecordSummaryList = IncidentRecordSummary[];
export const IncidentRecordSummaryList = /*@__PURE__*/ S.Array(
  IncidentRecordSummary,
);
export interface ListIncidentRecordsOutput {
  incidentRecordSummaries: IncidentRecordSummary[];
  nextToken?: string;
}
export const ListIncidentRecordsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    incidentRecordSummaries: IncidentRecordSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListIncidentRecordsOutput",
}) as any as S.Schema<ListIncidentRecordsOutput>;
export interface ListRelatedItemsInput {
  incidentRecordArn: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListRelatedItemsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    incidentRecordArn: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/listRelatedItems" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRelatedItemsInput",
}) as any as S.Schema<ListRelatedItemsInput>;
export type Url = string;
export type MetricDefinition = string;
export interface PagerDutyIncidentDetail {
  id: string;
  autoResolve?: boolean;
  secretId?: string;
}
export const PagerDutyIncidentDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    autoResolve: S.optional(S.Boolean),
    secretId: S.optional(S.String),
  }),
).annotate({
  identifier: "PagerDutyIncidentDetail",
}) as any as S.Schema<PagerDutyIncidentDetail>;
export type ItemValue =
  | {
      arn: string;
      url?: never;
      metricDefinition?: never;
      pagerDutyIncidentDetail?: never;
    }
  | {
      arn?: never;
      url: string;
      metricDefinition?: never;
      pagerDutyIncidentDetail?: never;
    }
  | {
      arn?: never;
      url?: never;
      metricDefinition: string;
      pagerDutyIncidentDetail?: never;
    }
  | {
      arn?: never;
      url?: never;
      metricDefinition?: never;
      pagerDutyIncidentDetail: PagerDutyIncidentDetail;
    };
export const ItemValue = /*@__PURE__*/ S.Union([
  S.Struct({ arn: S.String }),
  S.Struct({ url: S.String }),
  S.Struct({ metricDefinition: S.String }),
  S.Struct({ pagerDutyIncidentDetail: PagerDutyIncidentDetail }),
]);
export type ItemType = string;
export interface ItemIdentifier {
  value: ItemValue;
  type: string;
}
export const ItemIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: ItemValue, type: S.String }),
).annotate({ identifier: "ItemIdentifier" }) as any as S.Schema<ItemIdentifier>;
export interface RelatedItem {
  identifier: ItemIdentifier;
  title?: string;
  generatedId?: string;
}
export const RelatedItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: ItemIdentifier,
    title: S.optional(S.String),
    generatedId: S.optional(S.String),
  }),
).annotate({ identifier: "RelatedItem" }) as any as S.Schema<RelatedItem>;
export type RelatedItemList = RelatedItem[];
export const RelatedItemList = /*@__PURE__*/ S.Array(RelatedItem);
export interface ListRelatedItemsOutput {
  relatedItems: RelatedItem[];
  nextToken?: string;
}
export const ListRelatedItemsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ relatedItems: RelatedItemList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListRelatedItemsOutput",
}) as any as S.Schema<ListRelatedItemsOutput>;
export interface ListReplicationSetsInput {
  maxResults?: number;
  nextToken?: string;
}
export const ListReplicationSetsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/listReplicationSets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReplicationSetsInput",
}) as any as S.Schema<ListReplicationSetsInput>;
export type ReplicationSetArnList = string[];
export const ReplicationSetArnList = /*@__PURE__*/ S.Array(S.String);
export interface ListReplicationSetsOutput {
  replicationSetArns: string[];
  nextToken?: string;
}
export const ListReplicationSetsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    replicationSetArns: ReplicationSetArnList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListReplicationSetsOutput",
}) as any as S.Schema<ListReplicationSetsOutput>;
export interface ListResponsePlansInput {
  maxResults?: number;
  nextToken?: string;
}
export const ListResponsePlansInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/listResponsePlans" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListResponsePlansInput",
}) as any as S.Schema<ListResponsePlansInput>;
export interface ResponsePlanSummary {
  arn: string;
  name: string;
  displayName?: string;
}
export const ResponsePlanSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.String,
    displayName: S.optional(S.String),
  }),
).annotate({
  identifier: "ResponsePlanSummary",
}) as any as S.Schema<ResponsePlanSummary>;
export type ResponsePlanSummaryList = ResponsePlanSummary[];
export const ResponsePlanSummaryList =
  /*@__PURE__*/ S.Array(ResponsePlanSummary);
export interface ListResponsePlansOutput {
  responsePlanSummaries: ResponsePlanSummary[];
  nextToken?: string;
}
export const ListResponsePlansOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    responsePlanSummaries: ResponsePlanSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListResponsePlansOutput",
}) as any as S.Schema<ListResponsePlansOutput>;
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
  tags: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: TagMap }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type TimelineEventSort = string;
export type SortOrder = string;
export interface ListTimelineEventsInput {
  incidentRecordArn: string;
  filters?: Filter[];
  sortBy?: string;
  sortOrder?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListTimelineEventsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    incidentRecordArn: S.String,
    filters: S.optional(FilterList),
    sortBy: S.optional(S.String),
    sortOrder: S.optional(S.String),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/listTimelineEvents" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTimelineEventsInput",
}) as any as S.Schema<ListTimelineEventsInput>;
export interface EventSummary {
  incidentRecordArn: string;
  eventId: string;
  eventTime: Date;
  eventUpdatedTime: Date;
  eventType: string;
  eventReferences?: EventReference[];
}
export const EventSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    incidentRecordArn: S.String,
    eventId: S.String,
    eventTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    eventUpdatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    eventType: S.String,
    eventReferences: S.optional(EventReferenceList),
  }),
).annotate({ identifier: "EventSummary" }) as any as S.Schema<EventSummary>;
export type EventSummaryList = EventSummary[];
export const EventSummaryList = /*@__PURE__*/ S.Array(EventSummary);
export interface ListTimelineEventsOutput {
  eventSummaries: EventSummary[];
  nextToken?: string;
}
export const ListTimelineEventsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventSummaries: EventSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTimelineEventsOutput",
}) as any as S.Schema<ListTimelineEventsOutput>;
export interface PutResourcePolicyInput {
  resourceArn: string;
  policy: string;
}
export const PutResourcePolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, policy: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/putResourcePolicy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutResourcePolicyInput",
}) as any as S.Schema<PutResourcePolicyInput>;
export interface PutResourcePolicyOutput {
  policyId: string;
}
export const PutResourcePolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyId: S.String }),
).annotate({
  identifier: "PutResourcePolicyOutput",
}) as any as S.Schema<PutResourcePolicyOutput>;
export type RawData = string;
export interface TriggerDetails {
  source: string;
  triggerArn?: string;
  timestamp: Date;
  rawData?: string;
}
export const TriggerDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    source: S.String,
    triggerArn: S.optional(S.String),
    timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    rawData: S.optional(S.String),
  }),
).annotate({ identifier: "TriggerDetails" }) as any as S.Schema<TriggerDetails>;
export interface StartIncidentInput {
  clientToken?: string;
  responsePlanArn: string;
  title?: string;
  impact?: number;
  triggerDetails?: TriggerDetails;
  relatedItems?: RelatedItem[];
}
export const StartIncidentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    responsePlanArn: S.String,
    title: S.optional(S.String),
    impact: S.optional(S.Number),
    triggerDetails: S.optional(TriggerDetails),
    relatedItems: S.optional(RelatedItemList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/startIncident" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartIncidentInput",
}) as any as S.Schema<StartIncidentInput>;
export interface StartIncidentOutput {
  incidentRecordArn: string;
}
export const StartIncidentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ incidentRecordArn: S.String }),
).annotate({
  identifier: "StartIncidentOutput",
}) as any as S.Schema<StartIncidentOutput>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
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
export interface UpdateDeletionProtectionInput {
  arn: string;
  deletionProtected: boolean;
  clientToken?: string;
}
export const UpdateDeletionProtectionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    deletionProtected: S.Boolean,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/updateDeletionProtection" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDeletionProtectionInput",
}) as any as S.Schema<UpdateDeletionProtectionInput>;
export interface UpdateDeletionProtectionOutput {}
export const UpdateDeletionProtectionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateDeletionProtectionOutput",
}) as any as S.Schema<UpdateDeletionProtectionOutput>;
export interface UpdateIncidentRecordInput {
  clientToken?: string;
  arn: string;
  title?: string;
  summary?: string;
  impact?: number;
  status?: string;
  chatChannel?: ChatChannel;
  notificationTargets?: NotificationTargetItem[];
}
export const UpdateIncidentRecordInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    arn: S.String,
    title: S.optional(S.String),
    summary: S.optional(S.String),
    impact: S.optional(S.Number),
    status: S.optional(S.String),
    chatChannel: S.optional(ChatChannel),
    notificationTargets: S.optional(NotificationTargetSet),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/updateIncidentRecord" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateIncidentRecordInput",
}) as any as S.Schema<UpdateIncidentRecordInput>;
export interface UpdateIncidentRecordOutput {}
export const UpdateIncidentRecordOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateIncidentRecordOutput",
}) as any as S.Schema<UpdateIncidentRecordOutput>;
export type RelatedItemsUpdate =
  | { itemToAdd: RelatedItem; itemToRemove?: never }
  | { itemToAdd?: never; itemToRemove: ItemIdentifier };
export const RelatedItemsUpdate = /*@__PURE__*/ S.Union([
  S.Struct({ itemToAdd: RelatedItem }),
  S.Struct({ itemToRemove: ItemIdentifier }),
]);
export interface UpdateRelatedItemsInput {
  clientToken?: string;
  incidentRecordArn: string;
  relatedItemsUpdate: RelatedItemsUpdate;
}
export const UpdateRelatedItemsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    incidentRecordArn: S.String,
    relatedItemsUpdate: RelatedItemsUpdate,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/updateRelatedItems" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRelatedItemsInput",
}) as any as S.Schema<UpdateRelatedItemsInput>;
export interface UpdateRelatedItemsOutput {}
export const UpdateRelatedItemsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateRelatedItemsOutput",
}) as any as S.Schema<UpdateRelatedItemsOutput>;
export interface AddRegionAction {
  regionName: string;
  sseKmsKeyId?: string;
}
export const AddRegionAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ regionName: S.String, sseKmsKeyId: S.optional(S.String) }),
).annotate({
  identifier: "AddRegionAction",
}) as any as S.Schema<AddRegionAction>;
export interface DeleteRegionAction {
  regionName: string;
}
export const DeleteRegionAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ regionName: S.String }),
).annotate({
  identifier: "DeleteRegionAction",
}) as any as S.Schema<DeleteRegionAction>;
export type UpdateReplicationSetAction =
  | { addRegionAction: AddRegionAction; deleteRegionAction?: never }
  | { addRegionAction?: never; deleteRegionAction: DeleteRegionAction };
export const UpdateReplicationSetAction = /*@__PURE__*/ S.Union([
  S.Struct({ addRegionAction: AddRegionAction }),
  S.Struct({ deleteRegionAction: DeleteRegionAction }),
]);
export type UpdateActionList = UpdateReplicationSetAction[];
export const UpdateActionList = /*@__PURE__*/ S.Array(
  UpdateReplicationSetAction,
);
export interface UpdateReplicationSetInput {
  arn: string;
  actions: UpdateReplicationSetAction[];
  clientToken?: string;
}
export const UpdateReplicationSetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    actions: UpdateActionList,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/updateReplicationSet" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateReplicationSetInput",
}) as any as S.Schema<UpdateReplicationSetInput>;
export interface UpdateReplicationSetOutput {}
export const UpdateReplicationSetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateReplicationSetOutput",
}) as any as S.Schema<UpdateReplicationSetOutput>;
export type TagMapUpdate = { [key: string]: string | undefined };
export const TagMapUpdate = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface UpdateResponsePlanInput {
  clientToken?: string;
  arn: string;
  displayName?: string;
  incidentTemplateTitle?: string;
  incidentTemplateImpact?: number;
  incidentTemplateSummary?: string;
  incidentTemplateDedupeString?: string;
  incidentTemplateNotificationTargets?: NotificationTargetItem[];
  chatChannel?: ChatChannel;
  engagements?: string[];
  actions?: Action[];
  incidentTemplateTags?: { [key: string]: string | undefined };
  integrations?: Integration[];
}
export const UpdateResponsePlanInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    arn: S.String,
    displayName: S.optional(S.String),
    incidentTemplateTitle: S.optional(S.String),
    incidentTemplateImpact: S.optional(S.Number),
    incidentTemplateSummary: S.optional(S.String),
    incidentTemplateDedupeString: S.optional(S.String),
    incidentTemplateNotificationTargets: S.optional(NotificationTargetSet),
    chatChannel: S.optional(ChatChannel),
    engagements: S.optional(EngagementSet),
    actions: S.optional(ActionsList),
    incidentTemplateTags: S.optional(TagMapUpdate),
    integrations: S.optional(Integrations),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/updateResponsePlan" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateResponsePlanInput",
}) as any as S.Schema<UpdateResponsePlanInput>;
export interface UpdateResponsePlanOutput {}
export const UpdateResponsePlanOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateResponsePlanOutput",
}) as any as S.Schema<UpdateResponsePlanOutput>;
export interface UpdateTimelineEventInput {
  clientToken?: string;
  incidentRecordArn: string;
  eventId: string;
  eventTime?: Date;
  eventType?: string;
  eventData?: string;
  eventReferences?: EventReference[];
}
export const UpdateTimelineEventInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    incidentRecordArn: S.String,
    eventId: S.String,
    eventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    eventType: S.optional(S.String),
    eventData: S.optional(S.String),
    eventReferences: S.optional(EventReferenceList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/updateTimelineEvent" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateTimelineEventInput",
}) as any as S.Schema<UpdateTimelineEventInput>;
export interface UpdateTimelineEventOutput {}
export const UpdateTimelineEventOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateTimelineEventOutput",
}) as any as S.Schema<UpdateTimelineEventOutput>;
export type ExceptionMessage = string;
export type ResourceType = string;
export type ServiceCode = string;
export type BatchGetIncidentFindingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about all specified findings for an incident, including descriptive details about each finding. A finding
 * represents a recent application environment change made by an CodeDeploy
 * deployment or an CloudFormation stack creation or update that can be investigated as a
 * potential cause of the incident.
 */
export const batchGetIncidentFindings: API.OperationMethod<
  BatchGetIncidentFindingsInput,
  BatchGetIncidentFindingsOutput,
  BatchGetIncidentFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetIncidentFindingsInput,
  output: BatchGetIncidentFindingsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetIncidentFindings",
}));

export type CreateReplicationSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * A replication set replicates and encrypts your data to the provided Regions with the
 * provided KMS key.
 */
export const createReplicationSet: API.OperationMethod<
  CreateReplicationSetInput,
  CreateReplicationSetOutput,
  CreateReplicationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateReplicationSetInput,
  output: CreateReplicationSetOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReplicationSet",
}));

export type CreateResponsePlanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a response plan that automates the initial response to incidents. A response plan
 * engages contacts, starts chat channel collaboration, and initiates runbooks at the beginning
 * of an incident.
 */
export const createResponsePlan: API.OperationMethod<
  CreateResponsePlanInput,
  CreateResponsePlanOutput,
  CreateResponsePlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateResponsePlanInput,
  output: CreateResponsePlanOutput,
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
  operationName: "CreateResponsePlan",
}));

export type CreateTimelineEventError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a custom timeline event on the incident details page of an incident record.
 * Incident Manager automatically creates timeline events that mark key moments during an incident.
 * You can create custom timeline events to mark important events that Incident Manager can detect
 * automatically.
 */
export const createTimelineEvent: API.OperationMethod<
  CreateTimelineEventInput,
  CreateTimelineEventOutput,
  CreateTimelineEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTimelineEventInput,
  output: CreateTimelineEventOutput,
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
  operationName: "CreateTimelineEvent",
}));

export type DeleteIncidentRecordError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete an incident record from Incident Manager.
 */
export const deleteIncidentRecord: API.OperationMethod<
  DeleteIncidentRecordInput,
  DeleteIncidentRecordOutput,
  DeleteIncidentRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIncidentRecordInput,
  output: DeleteIncidentRecordOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIncidentRecord",
}));

export type DeleteReplicationSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes all Regions in your replication set. Deleting the replication set deletes all
 * Incident Manager data.
 */
export const deleteReplicationSet: API.OperationMethod<
  DeleteReplicationSetInput,
  DeleteReplicationSetOutput,
  DeleteReplicationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteReplicationSetInput,
  output: DeleteReplicationSetOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReplicationSet",
}));

export type DeleteResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the resource policy that Resource Access Manager uses to share your Incident Manager
 * resource.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyInput,
  DeleteResourcePolicyOutput,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourcePolicyInput,
  output: DeleteResourcePolicyOutput,
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

export type DeleteResponsePlanError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified response plan. Deleting a response plan stops all linked CloudWatch alarms and EventBridge events from creating an incident with this response
 * plan.
 */
export const deleteResponsePlan: API.OperationMethod<
  DeleteResponsePlanInput,
  DeleteResponsePlanOutput,
  DeleteResponsePlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResponsePlanInput,
  output: DeleteResponsePlanOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResponsePlan",
}));

export type DeleteTimelineEventError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a timeline event from an incident.
 */
export const deleteTimelineEvent: API.OperationMethod<
  DeleteTimelineEventInput,
  DeleteTimelineEventOutput,
  DeleteTimelineEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTimelineEventInput,
  output: DeleteTimelineEventOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTimelineEvent",
}));

export type GetIncidentRecordError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the details for the specified incident record.
 */
export const getIncidentRecord: API.OperationMethod<
  GetIncidentRecordInput,
  GetIncidentRecordOutput,
  GetIncidentRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIncidentRecordInput,
  output: GetIncidentRecordOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIncidentRecord",
}));

export type GetReplicationSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieve your Incident Manager replication set.
 */
export const getReplicationSet: API.OperationMethod<
  GetReplicationSetInput,
  GetReplicationSetOutput,
  GetReplicationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetReplicationSetInput,
  output: GetReplicationSetOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReplicationSet",
}));

export type GetResourcePoliciesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the resource policies attached to the specified response plan.
 */
export const getResourcePolicies: API.PaginatedOperationMethod<
  GetResourcePoliciesInput,
  GetResourcePoliciesOutput,
  GetResourcePoliciesError,
  Credentials | HttpClient.HttpClient,
  ResourcePolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetResourcePoliciesInput,
  output: GetResourcePoliciesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "resourcePolicies",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetResponsePlanError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of the specified response plan.
 */
export const getResponsePlan: API.OperationMethod<
  GetResponsePlanInput,
  GetResponsePlanOutput,
  GetResponsePlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResponsePlanInput,
  output: GetResponsePlanOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResponsePlan",
}));

export type GetTimelineEventError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a timeline event based on its ID and incident record.
 */
export const getTimelineEvent: API.OperationMethod<
  GetTimelineEventInput,
  GetTimelineEventOutput,
  GetTimelineEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTimelineEventInput,
  output: GetTimelineEventOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTimelineEvent",
}));

export type ListIncidentFindingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of the IDs of findings, plus their last modified times, that have been
 * identified for a specified incident. A finding represents a recent application environment
 * change made by an CloudFormation stack creation or update or an CodeDeploy
 * deployment that can be investigated as a potential cause of the incident.
 */
export const listIncidentFindings: API.PaginatedOperationMethod<
  ListIncidentFindingsInput,
  ListIncidentFindingsOutput,
  ListIncidentFindingsError,
  Credentials | HttpClient.HttpClient,
  FindingSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIncidentFindingsInput,
  output: ListIncidentFindingsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIncidentFindings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findings",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIncidentRecordsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all incident records in your account. Use this command to retrieve the Amazon
 * Resource Name (ARN) of the incident record you want to update.
 */
export const listIncidentRecords: API.PaginatedOperationMethod<
  ListIncidentRecordsInput,
  ListIncidentRecordsOutput,
  ListIncidentRecordsError,
  Credentials | HttpClient.HttpClient,
  IncidentRecordSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIncidentRecordsInput,
  output: ListIncidentRecordsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIncidentRecords",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "incidentRecordSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRelatedItemsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all related items for an incident record.
 */
export const listRelatedItems: API.PaginatedOperationMethod<
  ListRelatedItemsInput,
  ListRelatedItemsOutput,
  ListRelatedItemsError,
  Credentials | HttpClient.HttpClient,
  RelatedItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRelatedItemsInput,
  output: ListRelatedItemsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRelatedItems",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "relatedItems",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReplicationSetsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists details about the replication set configured in your account.
 */
export const listReplicationSets: API.PaginatedOperationMethod<
  ListReplicationSetsInput,
  ListReplicationSetsOutput,
  ListReplicationSetsError,
  Credentials | HttpClient.HttpClient,
  Arn
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListReplicationSetsInput,
  output: ListReplicationSetsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReplicationSets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "replicationSetArns",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResponsePlansError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all response plans in your account.
 */
export const listResponsePlans: API.PaginatedOperationMethod<
  ListResponsePlansInput,
  ListResponsePlansOutput,
  ListResponsePlansError,
  Credentials | HttpClient.HttpClient,
  ResponsePlanSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResponsePlansInput,
  output: ListResponsePlansOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResponsePlans",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "responsePlanSummaries",
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
 * Lists the tags that are attached to the specified response plan or incident.
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

export type ListTimelineEventsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists timeline events for the specified incident record.
 */
export const listTimelineEvents: API.PaginatedOperationMethod<
  ListTimelineEventsInput,
  ListTimelineEventsOutput,
  ListTimelineEventsError,
  Credentials | HttpClient.HttpClient,
  EventSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTimelineEventsInput,
  output: ListTimelineEventsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTimelineEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "eventSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a resource policy to the specified response plan. The resource policy is used to
 * share the response plan using Resource Access Manager (RAM). For more
 * information about cross-account sharing, see Cross-Region and cross-account incident management.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyInput,
  PutResourcePolicyOutput,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutResourcePolicyInput,
  output: PutResourcePolicyOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type StartIncidentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Used to start an incident from CloudWatch alarms, EventBridge events, or
 * manually.
 */
export const startIncident: API.OperationMethod<
  StartIncidentInput,
  StartIncidentOutput,
  StartIncidentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartIncidentInput,
  output: StartIncidentOutput,
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
  operationName: "StartIncident",
}));

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a tag to a response plan.
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
    ConflictException,
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
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag from a resource.
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
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateDeletionProtectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update deletion protection to either allow or deny deletion of the final Region in a
 * replication set.
 */
export const updateDeletionProtection: API.OperationMethod<
  UpdateDeletionProtectionInput,
  UpdateDeletionProtectionOutput,
  UpdateDeletionProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDeletionProtectionInput,
  output: UpdateDeletionProtectionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDeletionProtection",
}));

export type UpdateIncidentRecordError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the details of an incident record. You can use this operation to update an incident
 * record from the defined chat channel. For more information about using actions in chat
 * channels, see Interacting through chat.
 */
export const updateIncidentRecord: API.OperationMethod<
  UpdateIncidentRecordInput,
  UpdateIncidentRecordOutput,
  UpdateIncidentRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIncidentRecordInput,
  output: UpdateIncidentRecordOutput,
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
  operationName: "UpdateIncidentRecord",
}));

export type UpdateRelatedItemsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Add or remove related items from the related items tab of an incident record.
 */
export const updateRelatedItems: API.OperationMethod<
  UpdateRelatedItemsInput,
  UpdateRelatedItemsOutput,
  UpdateRelatedItemsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRelatedItemsInput,
  output: UpdateRelatedItemsOutput,
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
  operationName: "UpdateRelatedItems",
}));

export type UpdateReplicationSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Add or delete Regions from your replication set.
 */
export const updateReplicationSet: API.OperationMethod<
  UpdateReplicationSetInput,
  UpdateReplicationSetOutput,
  UpdateReplicationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateReplicationSetInput,
  output: UpdateReplicationSetOutput,
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
  operationName: "UpdateReplicationSet",
}));

export type UpdateResponsePlanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified response plan.
 */
export const updateResponsePlan: API.OperationMethod<
  UpdateResponsePlanInput,
  UpdateResponsePlanOutput,
  UpdateResponsePlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateResponsePlanInput,
  output: UpdateResponsePlanOutput,
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
  operationName: "UpdateResponsePlan",
}));

export type UpdateTimelineEventError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a timeline event. You can update events of type `Custom Event`.
 */
export const updateTimelineEvent: API.OperationMethod<
  UpdateTimelineEventInput,
  UpdateTimelineEventOutput,
  UpdateTimelineEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTimelineEventInput,
  output: UpdateTimelineEventOutput,
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
  operationName: "UpdateTimelineEvent",
}));
