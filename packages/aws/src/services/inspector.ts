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
  sdkId: "Inspector",
  serviceShapeName: "InspectorService",
});
const auth = T.AwsAuthSigv4({ name: "inspector" });
const ver = T.ServiceVersion("2016-02-16");
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
              `https://inspector-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://inspector-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://inspector.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://inspector.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      errorCode: S.suspend(() => AccessDeniedErrorCode).annotate({
        identifier: "AccessDeniedErrorCode",
      }),
      canRetry: S.Boolean,
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class AgentsAlreadyRunningAssessmentException
  extends /*@__PURE__*/ S.TaggedError<AgentsAlreadyRunningAssessmentException>()(
    "AgentsAlreadyRunningAssessmentException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      agents: S.suspend(() => AgentAlreadyRunningAssessmentList).annotate({
        identifier: "AgentAlreadyRunningAssessmentList",
      }),
      agentsTruncated: S.Boolean,
      canRetry: S.Boolean,
    },
  ) {}
export class AssessmentRunInProgressException
  extends /*@__PURE__*/ S.TaggedError<AssessmentRunInProgressException>()(
    "AssessmentRunInProgressException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      assessmentRunArns: S.suspend(
        () => AssessmentRunInProgressArnList,
      ).annotate({ identifier: "AssessmentRunInProgressArnList" }),
      assessmentRunArnsTruncated: S.Boolean,
      canRetry: S.Boolean,
    },
  ) {}
export class InternalException
  extends /*@__PURE__*/ S.TaggedError<InternalException>()(
    "InternalException",
    { message: S.String.pipe(T.ErrorMessage()), canRetry: S.Boolean },
  ) {}
export class InvalidCrossAccountRoleException
  extends /*@__PURE__*/ S.TaggedError<InvalidCrossAccountRoleException>()(
    "InvalidCrossAccountRoleException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      errorCode: S.suspend(() => InvalidCrossAccountRoleErrorCode).annotate({
        identifier: "InvalidCrossAccountRoleErrorCode",
      }),
      canRetry: S.Boolean,
    },
  ) {}
export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()(
    "InvalidInputException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      errorCode: S.suspend(() => InvalidInputErrorCode).annotate({
        identifier: "InvalidInputErrorCode",
      }),
      canRetry: S.Boolean,
    },
  ) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      errorCode: S.suspend(() => LimitExceededErrorCode).annotate({
        identifier: "LimitExceededErrorCode",
      }),
      canRetry: S.Boolean,
    },
  ) {}
export class NoSuchEntityException
  extends /*@__PURE__*/ S.TaggedError<NoSuchEntityException>()(
    "NoSuchEntityException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      errorCode: S.suspend(() => NoSuchEntityErrorCode).annotate({
        identifier: "NoSuchEntityErrorCode",
      }),
      canRetry: S.Boolean,
    },
  ) {}
export class PreviewGenerationInProgressException
  extends /*@__PURE__*/ S.TaggedError<PreviewGenerationInProgressException>()(
    "PreviewGenerationInProgressException",
    { message: S.String.pipe(T.ErrorMessage()) },
  ) {}
export class ServiceTemporarilyUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceTemporarilyUnavailableException>()(
    "ServiceTemporarilyUnavailableException",
    { message: S.String.pipe(T.ErrorMessage()), canRetry: S.Boolean },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class UnsupportedFeatureException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedFeatureException>()(
    "UnsupportedFeatureException",
    { message: S.String.pipe(T.ErrorMessage()), canRetry: S.Boolean },
  ) {}
export type Arn = string;
export type AddRemoveAttributesFindingArnList = string[];
export const AddRemoveAttributesFindingArnList = /*@__PURE__*/ S.Array(
  S.String,
);
export type AttributeKey = string;
export type AttributeValue = string;
export interface Attribute {
  key: string;
  value?: string;
}
export const Attribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.optional(S.String) }),
).annotate({ identifier: "Attribute" }) as any as S.Schema<Attribute>;
export type UserAttributeList = Attribute[];
export const UserAttributeList = /*@__PURE__*/ S.Array(Attribute);
export interface AddAttributesToFindingsRequest {
  findingArns: string[];
  attributes: Attribute[];
}
export const AddAttributesToFindingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    findingArns: AddRemoveAttributesFindingArnList,
    attributes: UserAttributeList,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AddAttributesToFindingsRequest",
}) as any as S.Schema<AddAttributesToFindingsRequest>;
export type FailedItemErrorCode =
  | "INVALID_ARN"
  | "DUPLICATE_ARN"
  | "ITEM_DOES_NOT_EXIST"
  | "ACCESS_DENIED"
  | "LIMIT_EXCEEDED"
  | "INTERNAL_ERROR"
  | (string & {});
export const FailedItemErrorCode = S.String;

export interface FailedItemDetails {
  failureCode: FailedItemErrorCode;
  retryable: boolean;
}
export const FailedItemDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ failureCode: FailedItemErrorCode, retryable: S.Boolean }),
).annotate({
  identifier: "FailedItemDetails",
}) as any as S.Schema<FailedItemDetails>;
export type FailedItems = { [key: string]: FailedItemDetails | undefined };
export const FailedItems = /*@__PURE__*/ S.Record(
  S.String,
  FailedItemDetails.pipe(S.optional),
);
export interface AddAttributesToFindingsResponse {
  failedItems: { [key: string]: FailedItemDetails | undefined };
}
export const AddAttributesToFindingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ failedItems: FailedItems }),
).annotate({
  identifier: "AddAttributesToFindingsResponse",
}) as any as S.Schema<AddAttributesToFindingsResponse>;
export type AssessmentTargetName = string;
export interface CreateAssessmentTargetRequest {
  assessmentTargetName: string;
  resourceGroupArn?: string;
}
export const CreateAssessmentTargetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assessmentTargetName: S.String,
    resourceGroupArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateAssessmentTargetRequest",
}) as any as S.Schema<CreateAssessmentTargetRequest>;
export interface CreateAssessmentTargetResponse {
  assessmentTargetArn: string;
}
export const CreateAssessmentTargetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assessmentTargetArn: S.String }),
).annotate({
  identifier: "CreateAssessmentTargetResponse",
}) as any as S.Schema<CreateAssessmentTargetResponse>;
export type AssessmentTemplateName = string;
export type AssessmentRunDuration = number;
export type AssessmentTemplateRulesPackageArnList = string[];
export const AssessmentTemplateRulesPackageArnList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface CreateAssessmentTemplateRequest {
  assessmentTargetArn: string;
  assessmentTemplateName: string;
  durationInSeconds: number;
  rulesPackageArns: string[];
  userAttributesForFindings?: Attribute[];
}
export const CreateAssessmentTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assessmentTargetArn: S.String,
    assessmentTemplateName: S.String,
    durationInSeconds: S.Number,
    rulesPackageArns: AssessmentTemplateRulesPackageArnList,
    userAttributesForFindings: S.optional(UserAttributeList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateAssessmentTemplateRequest",
}) as any as S.Schema<CreateAssessmentTemplateRequest>;
export interface CreateAssessmentTemplateResponse {
  assessmentTemplateArn: string;
}
export const CreateAssessmentTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assessmentTemplateArn: S.String }),
).annotate({
  identifier: "CreateAssessmentTemplateResponse",
}) as any as S.Schema<CreateAssessmentTemplateResponse>;
export interface CreateExclusionsPreviewRequest {
  assessmentTemplateArn: string;
}
export const CreateExclusionsPreviewRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assessmentTemplateArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateExclusionsPreviewRequest",
}) as any as S.Schema<CreateExclusionsPreviewRequest>;
export type UUID = string;
export interface CreateExclusionsPreviewResponse {
  previewToken: string;
}
export const CreateExclusionsPreviewResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ previewToken: S.String }),
).annotate({
  identifier: "CreateExclusionsPreviewResponse",
}) as any as S.Schema<CreateExclusionsPreviewResponse>;
export type TagKey = string;
export type TagValue = string;
export interface ResourceGroupTag {
  key: string;
  value?: string;
}
export const ResourceGroupTag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.optional(S.String) }),
).annotate({
  identifier: "ResourceGroupTag",
}) as any as S.Schema<ResourceGroupTag>;
export type ResourceGroupTags = ResourceGroupTag[];
export const ResourceGroupTags = /*@__PURE__*/ S.Array(ResourceGroupTag);
export interface CreateResourceGroupRequest {
  resourceGroupTags: ResourceGroupTag[];
}
export const CreateResourceGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceGroupTags: ResourceGroupTags }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateResourceGroupRequest",
}) as any as S.Schema<CreateResourceGroupRequest>;
export interface CreateResourceGroupResponse {
  resourceGroupArn: string;
}
export const CreateResourceGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceGroupArn: S.String }),
).annotate({
  identifier: "CreateResourceGroupResponse",
}) as any as S.Schema<CreateResourceGroupResponse>;
export interface DeleteAssessmentRunRequest {
  assessmentRunArn: string;
}
export const DeleteAssessmentRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assessmentRunArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteAssessmentRunRequest",
}) as any as S.Schema<DeleteAssessmentRunRequest>;
export interface DeleteAssessmentRunResponse {}
export const DeleteAssessmentRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAssessmentRunResponse",
}) as any as S.Schema<DeleteAssessmentRunResponse>;
export interface DeleteAssessmentTargetRequest {
  assessmentTargetArn: string;
}
export const DeleteAssessmentTargetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assessmentTargetArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteAssessmentTargetRequest",
}) as any as S.Schema<DeleteAssessmentTargetRequest>;
export interface DeleteAssessmentTargetResponse {}
export const DeleteAssessmentTargetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAssessmentTargetResponse",
}) as any as S.Schema<DeleteAssessmentTargetResponse>;
export interface DeleteAssessmentTemplateRequest {
  assessmentTemplateArn: string;
}
export const DeleteAssessmentTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assessmentTemplateArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteAssessmentTemplateRequest",
}) as any as S.Schema<DeleteAssessmentTemplateRequest>;
export interface DeleteAssessmentTemplateResponse {}
export const DeleteAssessmentTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAssessmentTemplateResponse",
}) as any as S.Schema<DeleteAssessmentTemplateResponse>;
export type BatchDescribeArnList = string[];
export const BatchDescribeArnList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeAssessmentRunsRequest {
  assessmentRunArns: string[];
}
export const DescribeAssessmentRunsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assessmentRunArns: BatchDescribeArnList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeAssessmentRunsRequest",
}) as any as S.Schema<DescribeAssessmentRunsRequest>;
export type AssessmentRunName = string;
export type AssessmentRunState =
  | "CREATED"
  | "START_DATA_COLLECTION_PENDING"
  | "START_DATA_COLLECTION_IN_PROGRESS"
  | "COLLECTING_DATA"
  | "STOP_DATA_COLLECTION_PENDING"
  | "DATA_COLLECTED"
  | "START_EVALUATING_RULES_PENDING"
  | "EVALUATING_RULES"
  | "FAILED"
  | "ERROR"
  | "COMPLETED"
  | "COMPLETED_WITH_ERRORS"
  | "CANCELED"
  | (string & {});
export const AssessmentRunState = S.String;

export type AssessmentRulesPackageArnList = string[];
export const AssessmentRulesPackageArnList = /*@__PURE__*/ S.Array(S.String);
export interface AssessmentRunStateChange {
  stateChangedAt: Date;
  state: AssessmentRunState;
}
export const AssessmentRunStateChange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stateChangedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    state: AssessmentRunState,
  }),
).annotate({
  identifier: "AssessmentRunStateChange",
}) as any as S.Schema<AssessmentRunStateChange>;
export type AssessmentRunStateChangeList = AssessmentRunStateChange[];
export const AssessmentRunStateChangeList = /*@__PURE__*/ S.Array(
  AssessmentRunStateChange,
);
export type InspectorEvent =
  | "ASSESSMENT_RUN_STARTED"
  | "ASSESSMENT_RUN_COMPLETED"
  | "ASSESSMENT_RUN_STATE_CHANGED"
  | "FINDING_REPORTED"
  | "OTHER"
  | (string & {});
export const InspectorEvent = S.String;

export type Message = string;
export type AssessmentRunNotificationSnsStatusCode =
  | "SUCCESS"
  | "TOPIC_DOES_NOT_EXIST"
  | "ACCESS_DENIED"
  | "INTERNAL_ERROR"
  | (string & {});
export const AssessmentRunNotificationSnsStatusCode = S.String;

export interface AssessmentRunNotification {
  date: Date;
  event: InspectorEvent;
  message?: string;
  error: boolean;
  snsTopicArn?: string;
  snsPublishStatusCode?: AssessmentRunNotificationSnsStatusCode;
}
export const AssessmentRunNotification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    date: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    event: InspectorEvent,
    message: S.optional(S.String),
    error: S.Boolean,
    snsTopicArn: S.optional(S.String),
    snsPublishStatusCode: S.optional(AssessmentRunNotificationSnsStatusCode),
  }),
).annotate({
  identifier: "AssessmentRunNotification",
}) as any as S.Schema<AssessmentRunNotification>;
export type AssessmentRunNotificationList = AssessmentRunNotification[];
export const AssessmentRunNotificationList = /*@__PURE__*/ S.Array(
  AssessmentRunNotification,
);
export type Severity =
  | "Low"
  | "Medium"
  | "High"
  | "Informational"
  | "Undefined"
  | (string & {});
export const Severity = S.String;

export type FindingCount = number;
export type AssessmentRunFindingCounts = { [key in Severity]?: number };
export const AssessmentRunFindingCounts = /*@__PURE__*/ S.Record(
  Severity,
  S.Number.pipe(S.optional),
);
export interface AssessmentRun {
  arn: string;
  name: string;
  assessmentTemplateArn: string;
  state: AssessmentRunState;
  durationInSeconds: number;
  rulesPackageArns: string[];
  userAttributesForFindings: Attribute[];
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  stateChangedAt: Date;
  dataCollected: boolean;
  stateChanges: AssessmentRunStateChange[];
  notifications: AssessmentRunNotification[];
  findingCounts: { [key: string]: number | undefined };
}
export const AssessmentRun = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.String,
    assessmentTemplateArn: S.String,
    state: AssessmentRunState,
    durationInSeconds: S.Number,
    rulesPackageArns: AssessmentRulesPackageArnList,
    userAttributesForFindings: UserAttributeList,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    stateChangedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    dataCollected: S.Boolean,
    stateChanges: AssessmentRunStateChangeList,
    notifications: AssessmentRunNotificationList,
    findingCounts: AssessmentRunFindingCounts,
  }),
).annotate({ identifier: "AssessmentRun" }) as any as S.Schema<AssessmentRun>;
export type AssessmentRunList = AssessmentRun[];
export const AssessmentRunList = /*@__PURE__*/ S.Array(AssessmentRun);
export interface DescribeAssessmentRunsResponse {
  assessmentRuns: AssessmentRun[];
  failedItems: { [key: string]: FailedItemDetails | undefined };
}
export const DescribeAssessmentRunsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assessmentRuns: AssessmentRunList, failedItems: FailedItems }),
).annotate({
  identifier: "DescribeAssessmentRunsResponse",
}) as any as S.Schema<DescribeAssessmentRunsResponse>;
export interface DescribeAssessmentTargetsRequest {
  assessmentTargetArns: string[];
}
export const DescribeAssessmentTargetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assessmentTargetArns: BatchDescribeArnList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeAssessmentTargetsRequest",
}) as any as S.Schema<DescribeAssessmentTargetsRequest>;
export interface AssessmentTarget {
  arn: string;
  name: string;
  resourceGroupArn?: string;
  createdAt: Date;
  updatedAt: Date;
}
export const AssessmentTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.String,
    resourceGroupArn: S.optional(S.String),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "AssessmentTarget",
}) as any as S.Schema<AssessmentTarget>;
export type AssessmentTargetList = AssessmentTarget[];
export const AssessmentTargetList = /*@__PURE__*/ S.Array(AssessmentTarget);
export interface DescribeAssessmentTargetsResponse {
  assessmentTargets: AssessmentTarget[];
  failedItems: { [key: string]: FailedItemDetails | undefined };
}
export const DescribeAssessmentTargetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assessmentTargets: AssessmentTargetList,
    failedItems: FailedItems,
  }),
).annotate({
  identifier: "DescribeAssessmentTargetsResponse",
}) as any as S.Schema<DescribeAssessmentTargetsResponse>;
export interface DescribeAssessmentTemplatesRequest {
  assessmentTemplateArns: string[];
}
export const DescribeAssessmentTemplatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assessmentTemplateArns: BatchDescribeArnList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeAssessmentTemplatesRequest",
}) as any as S.Schema<DescribeAssessmentTemplatesRequest>;
export type ArnCount = number;
export interface AssessmentTemplate {
  arn: string;
  name: string;
  assessmentTargetArn: string;
  durationInSeconds: number;
  rulesPackageArns: string[];
  userAttributesForFindings: Attribute[];
  lastAssessmentRunArn?: string;
  assessmentRunCount: number;
  createdAt: Date;
}
export const AssessmentTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.String,
    assessmentTargetArn: S.String,
    durationInSeconds: S.Number,
    rulesPackageArns: AssessmentTemplateRulesPackageArnList,
    userAttributesForFindings: UserAttributeList,
    lastAssessmentRunArn: S.optional(S.String),
    assessmentRunCount: S.Number,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "AssessmentTemplate",
}) as any as S.Schema<AssessmentTemplate>;
export type AssessmentTemplateList = AssessmentTemplate[];
export const AssessmentTemplateList = /*@__PURE__*/ S.Array(AssessmentTemplate);
export interface DescribeAssessmentTemplatesResponse {
  assessmentTemplates: AssessmentTemplate[];
  failedItems: { [key: string]: FailedItemDetails | undefined };
}
export const DescribeAssessmentTemplatesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assessmentTemplates: AssessmentTemplateList,
    failedItems: FailedItems,
  }),
).annotate({
  identifier: "DescribeAssessmentTemplatesResponse",
}) as any as S.Schema<DescribeAssessmentTemplatesResponse>;
export interface DescribeCrossAccountAccessRoleRequest {}
export const DescribeCrossAccountAccessRoleRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({}).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DescribeCrossAccountAccessRoleRequest",
}) as any as S.Schema<DescribeCrossAccountAccessRoleRequest>;
export interface DescribeCrossAccountAccessRoleResponse {
  roleArn: string;
  valid: boolean;
  registeredAt: Date;
}
export const DescribeCrossAccountAccessRoleResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      roleArn: S.String,
      valid: S.Boolean,
      registeredAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    }),
).annotate({
  identifier: "DescribeCrossAccountAccessRoleResponse",
}) as any as S.Schema<DescribeCrossAccountAccessRoleResponse>;
export type BatchDescribeExclusionsArnList = string[];
export const BatchDescribeExclusionsArnList = /*@__PURE__*/ S.Array(S.String);
export type Locale = "EN_US" | (string & {});
export const Locale = S.String;

export interface DescribeExclusionsRequest {
  exclusionArns: string[];
  locale?: Locale;
}
export const DescribeExclusionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exclusionArns: BatchDescribeExclusionsArnList,
    locale: S.optional(Locale),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeExclusionsRequest",
}) as any as S.Schema<DescribeExclusionsRequest>;
export type Text = string;
export type ScopeType = "INSTANCE_ID" | "RULES_PACKAGE_ARN" | (string & {});
export const ScopeType = S.String;

export type ScopeValue = string;
export interface Scope {
  key?: ScopeType;
  value?: string;
}
export const Scope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.optional(ScopeType), value: S.optional(S.String) }),
).annotate({ identifier: "Scope" }) as any as S.Schema<Scope>;
export type ScopeList = Scope[];
export const ScopeList = /*@__PURE__*/ S.Array(Scope);
export type AttributeList = Attribute[];
export const AttributeList = /*@__PURE__*/ S.Array(Attribute);
export interface Exclusion {
  arn: string;
  title: string;
  description: string;
  recommendation: string;
  scopes: Scope[];
  attributes?: Attribute[];
}
export const Exclusion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    title: S.String,
    description: S.String,
    recommendation: S.String,
    scopes: ScopeList,
    attributes: S.optional(AttributeList),
  }),
).annotate({ identifier: "Exclusion" }) as any as S.Schema<Exclusion>;
export type ExclusionMap = { [key: string]: Exclusion | undefined };
export const ExclusionMap = /*@__PURE__*/ S.Record(
  S.String,
  Exclusion.pipe(S.optional),
);
export interface DescribeExclusionsResponse {
  exclusions: { [key: string]: Exclusion | undefined };
  failedItems: { [key: string]: FailedItemDetails | undefined };
}
export const DescribeExclusionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ exclusions: ExclusionMap, failedItems: FailedItems }),
).annotate({
  identifier: "DescribeExclusionsResponse",
}) as any as S.Schema<DescribeExclusionsResponse>;
export interface DescribeFindingsRequest {
  findingArns: string[];
  locale?: Locale;
}
export const DescribeFindingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    findingArns: BatchDescribeArnList,
    locale: S.optional(Locale),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeFindingsRequest",
}) as any as S.Schema<DescribeFindingsRequest>;
export type NumericVersion = number;
export type ServiceName = string;
export interface InspectorServiceAttributes {
  schemaVersion: number;
  assessmentRunArn?: string;
  rulesPackageArn?: string;
}
export const InspectorServiceAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    schemaVersion: S.Number,
    assessmentRunArn: S.optional(S.String),
    rulesPackageArn: S.optional(S.String),
  }),
).annotate({
  identifier: "InspectorServiceAttributes",
}) as any as S.Schema<InspectorServiceAttributes>;
export type AssetType = "ec2-instance" | (string & {});
export const AssetType = S.String;

export type AgentId = string;
export type AutoScalingGroup = string;
export type AmiId = string;
export type Hostname = string;
export type Ipv4Address = string;
export type Ipv4AddressList = string[];
export const Ipv4AddressList = /*@__PURE__*/ S.Array(S.String);
export interface Tag {
  key: string;
  value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type Tags = Tag[];
export const Tags = /*@__PURE__*/ S.Array(Tag);
export interface PrivateIp {
  privateDnsName?: string;
  privateIpAddress?: string;
}
export const PrivateIp = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    privateDnsName: S.optional(S.String),
    privateIpAddress: S.optional(S.String),
  }),
).annotate({ identifier: "PrivateIp" }) as any as S.Schema<PrivateIp>;
export type PrivateIpAddresses = PrivateIp[];
export const PrivateIpAddresses = /*@__PURE__*/ S.Array(PrivateIp);
export type Ipv6Addresses = string[];
export const Ipv6Addresses = /*@__PURE__*/ S.Array(S.String);
export interface SecurityGroup {
  groupName?: string;
  groupId?: string;
}
export const SecurityGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ groupName: S.optional(S.String), groupId: S.optional(S.String) }),
).annotate({ identifier: "SecurityGroup" }) as any as S.Schema<SecurityGroup>;
export type SecurityGroups = SecurityGroup[];
export const SecurityGroups = /*@__PURE__*/ S.Array(SecurityGroup);
export interface NetworkInterface {
  networkInterfaceId?: string;
  subnetId?: string;
  vpcId?: string;
  privateDnsName?: string;
  privateIpAddress?: string;
  privateIpAddresses?: PrivateIp[];
  publicDnsName?: string;
  publicIp?: string;
  ipv6Addresses?: string[];
  securityGroups?: SecurityGroup[];
}
export const NetworkInterface = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkInterfaceId: S.optional(S.String),
    subnetId: S.optional(S.String),
    vpcId: S.optional(S.String),
    privateDnsName: S.optional(S.String),
    privateIpAddress: S.optional(S.String),
    privateIpAddresses: S.optional(PrivateIpAddresses),
    publicDnsName: S.optional(S.String),
    publicIp: S.optional(S.String),
    ipv6Addresses: S.optional(Ipv6Addresses),
    securityGroups: S.optional(SecurityGroups),
  }),
).annotate({
  identifier: "NetworkInterface",
}) as any as S.Schema<NetworkInterface>;
export type NetworkInterfaces = NetworkInterface[];
export const NetworkInterfaces = /*@__PURE__*/ S.Array(NetworkInterface);
export interface AssetAttributes {
  schemaVersion: number;
  agentId?: string;
  autoScalingGroup?: string;
  amiId?: string;
  hostname?: string;
  ipv4Addresses?: string[];
  tags?: Tag[];
  networkInterfaces?: NetworkInterface[];
}
export const AssetAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    schemaVersion: S.Number,
    agentId: S.optional(S.String),
    autoScalingGroup: S.optional(S.String),
    amiId: S.optional(S.String),
    hostname: S.optional(S.String),
    ipv4Addresses: S.optional(Ipv4AddressList),
    tags: S.optional(Tags),
    networkInterfaces: S.optional(NetworkInterfaces),
  }),
).annotate({
  identifier: "AssetAttributes",
}) as any as S.Schema<AssetAttributes>;
export type FindingId = string;
export type NumericSeverity = number;
export type IocConfidence = number;
export interface Finding {
  arn: string;
  schemaVersion?: number;
  service?: string;
  serviceAttributes?: InspectorServiceAttributes;
  assetType?: AssetType;
  assetAttributes?: AssetAttributes;
  id?: string;
  title?: string;
  description?: string;
  recommendation?: string;
  severity?: Severity;
  numericSeverity?: number;
  confidence?: number;
  indicatorOfCompromise?: boolean;
  attributes: Attribute[];
  userAttributes: Attribute[];
  createdAt: Date;
  updatedAt: Date;
}
export const Finding = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    schemaVersion: S.optional(S.Number),
    service: S.optional(S.String),
    serviceAttributes: S.optional(InspectorServiceAttributes),
    assetType: S.optional(AssetType),
    assetAttributes: S.optional(AssetAttributes),
    id: S.optional(S.String),
    title: S.optional(S.String),
    description: S.optional(S.String),
    recommendation: S.optional(S.String),
    severity: S.optional(Severity),
    numericSeverity: S.optional(S.Number),
    confidence: S.optional(S.Number),
    indicatorOfCompromise: S.optional(S.Boolean),
    attributes: AttributeList,
    userAttributes: UserAttributeList,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "Finding" }) as any as S.Schema<Finding>;
export type FindingList = Finding[];
export const FindingList = /*@__PURE__*/ S.Array(Finding);
export interface DescribeFindingsResponse {
  findings: Finding[];
  failedItems: { [key: string]: FailedItemDetails | undefined };
}
export const DescribeFindingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ findings: FindingList, failedItems: FailedItems }),
).annotate({
  identifier: "DescribeFindingsResponse",
}) as any as S.Schema<DescribeFindingsResponse>;
export interface DescribeResourceGroupsRequest {
  resourceGroupArns: string[];
}
export const DescribeResourceGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceGroupArns: BatchDescribeArnList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeResourceGroupsRequest",
}) as any as S.Schema<DescribeResourceGroupsRequest>;
export interface ResourceGroup {
  arn: string;
  tags: ResourceGroupTag[];
  createdAt: Date;
}
export const ResourceGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    tags: ResourceGroupTags,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "ResourceGroup" }) as any as S.Schema<ResourceGroup>;
export type ResourceGroupList = ResourceGroup[];
export const ResourceGroupList = /*@__PURE__*/ S.Array(ResourceGroup);
export interface DescribeResourceGroupsResponse {
  resourceGroups: ResourceGroup[];
  failedItems: { [key: string]: FailedItemDetails | undefined };
}
export const DescribeResourceGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceGroups: ResourceGroupList, failedItems: FailedItems }),
).annotate({
  identifier: "DescribeResourceGroupsResponse",
}) as any as S.Schema<DescribeResourceGroupsResponse>;
export interface DescribeRulesPackagesRequest {
  rulesPackageArns: string[];
  locale?: Locale;
}
export const DescribeRulesPackagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    rulesPackageArns: BatchDescribeArnList,
    locale: S.optional(Locale),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeRulesPackagesRequest",
}) as any as S.Schema<DescribeRulesPackagesRequest>;
export type RulesPackageName = string;
export type Version = string;
export type ProviderName = string;
export interface RulesPackage {
  arn: string;
  name: string;
  version: string;
  provider: string;
  description?: string;
}
export const RulesPackage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.String,
    version: S.String,
    provider: S.String,
    description: S.optional(S.String),
  }),
).annotate({ identifier: "RulesPackage" }) as any as S.Schema<RulesPackage>;
export type RulesPackageList = RulesPackage[];
export const RulesPackageList = /*@__PURE__*/ S.Array(RulesPackage);
export interface DescribeRulesPackagesResponse {
  rulesPackages: RulesPackage[];
  failedItems: { [key: string]: FailedItemDetails | undefined };
}
export const DescribeRulesPackagesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ rulesPackages: RulesPackageList, failedItems: FailedItems }),
).annotate({
  identifier: "DescribeRulesPackagesResponse",
}) as any as S.Schema<DescribeRulesPackagesResponse>;
export type ReportFileFormat = "HTML" | "PDF" | (string & {});
export const ReportFileFormat = S.String;

export type ReportType = "FINDING" | "FULL" | (string & {});
export const ReportType = S.String;

export interface GetAssessmentReportRequest {
  assessmentRunArn: string;
  reportFileFormat: ReportFileFormat;
  reportType: ReportType;
}
export const GetAssessmentReportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assessmentRunArn: S.String,
    reportFileFormat: ReportFileFormat,
    reportType: ReportType,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAssessmentReportRequest",
}) as any as S.Schema<GetAssessmentReportRequest>;
export type ReportStatus =
  | "WORK_IN_PROGRESS"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export const ReportStatus = S.String;

export type Url = string;
export interface GetAssessmentReportResponse {
  status: ReportStatus;
  url?: string;
}
export const GetAssessmentReportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: ReportStatus, url: S.optional(S.String) }),
).annotate({
  identifier: "GetAssessmentReportResponse",
}) as any as S.Schema<GetAssessmentReportResponse>;
export type PaginationToken = string;
export type ListMaxResults = number;
export interface GetExclusionsPreviewRequest {
  assessmentTemplateArn: string;
  previewToken: string;
  nextToken?: string;
  maxResults?: number;
  locale?: Locale;
}
export const GetExclusionsPreviewRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assessmentTemplateArn: S.String,
    previewToken: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    locale: S.optional(Locale),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetExclusionsPreviewRequest",
}) as any as S.Schema<GetExclusionsPreviewRequest>;
export type PreviewStatus = "WORK_IN_PROGRESS" | "COMPLETED" | (string & {});
export const PreviewStatus = S.String;

export interface ExclusionPreview {
  title: string;
  description: string;
  recommendation: string;
  scopes: Scope[];
  attributes?: Attribute[];
}
export const ExclusionPreview = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    title: S.String,
    description: S.String,
    recommendation: S.String,
    scopes: ScopeList,
    attributes: S.optional(AttributeList),
  }),
).annotate({
  identifier: "ExclusionPreview",
}) as any as S.Schema<ExclusionPreview>;
export type ExclusionPreviewList = ExclusionPreview[];
export const ExclusionPreviewList = /*@__PURE__*/ S.Array(ExclusionPreview);
export interface GetExclusionsPreviewResponse {
  previewStatus: PreviewStatus;
  exclusionPreviews?: ExclusionPreview[];
  nextToken?: string;
}
export const GetExclusionsPreviewResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    previewStatus: PreviewStatus,
    exclusionPreviews: S.optional(ExclusionPreviewList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetExclusionsPreviewResponse",
}) as any as S.Schema<GetExclusionsPreviewResponse>;
export interface GetTelemetryMetadataRequest {
  assessmentRunArn: string;
}
export const GetTelemetryMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assessmentRunArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetTelemetryMetadataRequest",
}) as any as S.Schema<GetTelemetryMetadataRequest>;
export type MessageType = string;
export interface TelemetryMetadata {
  messageType: string;
  count: number;
  dataSize?: number;
}
export const TelemetryMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    messageType: S.String,
    count: S.Number,
    dataSize: S.optional(S.Number),
  }),
).annotate({
  identifier: "TelemetryMetadata",
}) as any as S.Schema<TelemetryMetadata>;
export type TelemetryMetadataList = TelemetryMetadata[];
export const TelemetryMetadataList = /*@__PURE__*/ S.Array(TelemetryMetadata);
export interface GetTelemetryMetadataResponse {
  telemetryMetadata: TelemetryMetadata[];
}
export const GetTelemetryMetadataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ telemetryMetadata: TelemetryMetadataList }),
).annotate({
  identifier: "GetTelemetryMetadataResponse",
}) as any as S.Schema<GetTelemetryMetadataResponse>;
export type AgentHealth = "HEALTHY" | "UNHEALTHY" | "UNKNOWN" | (string & {});
export const AgentHealth = S.String;

export type AgentHealthList = AgentHealth[];
export const AgentHealthList = /*@__PURE__*/ S.Array(AgentHealth);
export type AgentHealthCode =
  | "IDLE"
  | "RUNNING"
  | "SHUTDOWN"
  | "UNHEALTHY"
  | "THROTTLED"
  | "UNKNOWN"
  | (string & {});
export const AgentHealthCode = S.String;

export type AgentHealthCodeList = AgentHealthCode[];
export const AgentHealthCodeList = /*@__PURE__*/ S.Array(AgentHealthCode);
export interface AgentFilter {
  agentHealths: AgentHealth[];
  agentHealthCodes: AgentHealthCode[];
}
export const AgentFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentHealths: AgentHealthList,
    agentHealthCodes: AgentHealthCodeList,
  }),
).annotate({ identifier: "AgentFilter" }) as any as S.Schema<AgentFilter>;
export interface ListAssessmentRunAgentsRequest {
  assessmentRunArn: string;
  filter?: AgentFilter;
  nextToken?: string;
  maxResults?: number;
}
export const ListAssessmentRunAgentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assessmentRunArn: S.String,
    filter: S.optional(AgentFilter),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAssessmentRunAgentsRequest",
}) as any as S.Schema<ListAssessmentRunAgentsRequest>;
export interface AssessmentRunAgent {
  agentId: string;
  assessmentRunArn: string;
  agentHealth: AgentHealth;
  agentHealthCode: AgentHealthCode;
  agentHealthDetails?: string;
  autoScalingGroup?: string;
  telemetryMetadata: TelemetryMetadata[];
}
export const AssessmentRunAgent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentId: S.String,
    assessmentRunArn: S.String,
    agentHealth: AgentHealth,
    agentHealthCode: AgentHealthCode,
    agentHealthDetails: S.optional(S.String),
    autoScalingGroup: S.optional(S.String),
    telemetryMetadata: TelemetryMetadataList,
  }),
).annotate({
  identifier: "AssessmentRunAgent",
}) as any as S.Schema<AssessmentRunAgent>;
export type AssessmentRunAgentList = AssessmentRunAgent[];
export const AssessmentRunAgentList = /*@__PURE__*/ S.Array(AssessmentRunAgent);
export interface ListAssessmentRunAgentsResponse {
  assessmentRunAgents: AssessmentRunAgent[];
  nextToken?: string;
}
export const ListAssessmentRunAgentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assessmentRunAgents: AssessmentRunAgentList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAssessmentRunAgentsResponse",
}) as any as S.Schema<ListAssessmentRunAgentsResponse>;
export type ListParentArnList = string[];
export const ListParentArnList = /*@__PURE__*/ S.Array(S.String);
export type NamePattern = string;
export type AssessmentRunStateList = AssessmentRunState[];
export const AssessmentRunStateList = /*@__PURE__*/ S.Array(AssessmentRunState);
export interface DurationRange {
  minSeconds?: number;
  maxSeconds?: number;
}
export const DurationRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    minSeconds: S.optional(S.Number),
    maxSeconds: S.optional(S.Number),
  }),
).annotate({ identifier: "DurationRange" }) as any as S.Schema<DurationRange>;
export type FilterRulesPackageArnList = string[];
export const FilterRulesPackageArnList = /*@__PURE__*/ S.Array(S.String);
export interface TimestampRange {
  beginDate?: Date;
  endDate?: Date;
}
export const TimestampRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    beginDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "TimestampRange" }) as any as S.Schema<TimestampRange>;
export interface AssessmentRunFilter {
  namePattern?: string;
  states?: AssessmentRunState[];
  durationRange?: DurationRange;
  rulesPackageArns?: string[];
  startTimeRange?: TimestampRange;
  completionTimeRange?: TimestampRange;
  stateChangeTimeRange?: TimestampRange;
}
export const AssessmentRunFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    namePattern: S.optional(S.String),
    states: S.optional(AssessmentRunStateList),
    durationRange: S.optional(DurationRange),
    rulesPackageArns: S.optional(FilterRulesPackageArnList),
    startTimeRange: S.optional(TimestampRange),
    completionTimeRange: S.optional(TimestampRange),
    stateChangeTimeRange: S.optional(TimestampRange),
  }),
).annotate({
  identifier: "AssessmentRunFilter",
}) as any as S.Schema<AssessmentRunFilter>;
export interface ListAssessmentRunsRequest {
  assessmentTemplateArns?: string[];
  filter?: AssessmentRunFilter;
  nextToken?: string;
  maxResults?: number;
}
export const ListAssessmentRunsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assessmentTemplateArns: S.optional(ListParentArnList),
    filter: S.optional(AssessmentRunFilter),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAssessmentRunsRequest",
}) as any as S.Schema<ListAssessmentRunsRequest>;
export type ListReturnedArnList = string[];
export const ListReturnedArnList = /*@__PURE__*/ S.Array(S.String);
export interface ListAssessmentRunsResponse {
  assessmentRunArns: string[];
  nextToken?: string;
}
export const ListAssessmentRunsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assessmentRunArns: ListReturnedArnList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAssessmentRunsResponse",
}) as any as S.Schema<ListAssessmentRunsResponse>;
export interface AssessmentTargetFilter {
  assessmentTargetNamePattern?: string;
}
export const AssessmentTargetFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assessmentTargetNamePattern: S.optional(S.String) }),
).annotate({
  identifier: "AssessmentTargetFilter",
}) as any as S.Schema<AssessmentTargetFilter>;
export interface ListAssessmentTargetsRequest {
  filter?: AssessmentTargetFilter;
  nextToken?: string;
  maxResults?: number;
}
export const ListAssessmentTargetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filter: S.optional(AssessmentTargetFilter),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAssessmentTargetsRequest",
}) as any as S.Schema<ListAssessmentTargetsRequest>;
export interface ListAssessmentTargetsResponse {
  assessmentTargetArns: string[];
  nextToken?: string;
}
export const ListAssessmentTargetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assessmentTargetArns: ListReturnedArnList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAssessmentTargetsResponse",
}) as any as S.Schema<ListAssessmentTargetsResponse>;
export interface AssessmentTemplateFilter {
  namePattern?: string;
  durationRange?: DurationRange;
  rulesPackageArns?: string[];
}
export const AssessmentTemplateFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    namePattern: S.optional(S.String),
    durationRange: S.optional(DurationRange),
    rulesPackageArns: S.optional(FilterRulesPackageArnList),
  }),
).annotate({
  identifier: "AssessmentTemplateFilter",
}) as any as S.Schema<AssessmentTemplateFilter>;
export interface ListAssessmentTemplatesRequest {
  assessmentTargetArns?: string[];
  filter?: AssessmentTemplateFilter;
  nextToken?: string;
  maxResults?: number;
}
export const ListAssessmentTemplatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assessmentTargetArns: S.optional(ListParentArnList),
    filter: S.optional(AssessmentTemplateFilter),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAssessmentTemplatesRequest",
}) as any as S.Schema<ListAssessmentTemplatesRequest>;
export interface ListAssessmentTemplatesResponse {
  assessmentTemplateArns: string[];
  nextToken?: string;
}
export const ListAssessmentTemplatesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assessmentTemplateArns: ListReturnedArnList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAssessmentTemplatesResponse",
}) as any as S.Schema<ListAssessmentTemplatesResponse>;
export type ListEventSubscriptionsMaxResults = number;
export interface ListEventSubscriptionsRequest {
  resourceArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListEventSubscriptionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListEventSubscriptionsRequest",
}) as any as S.Schema<ListEventSubscriptionsRequest>;
export interface EventSubscription {
  event: InspectorEvent;
  subscribedAt: Date;
}
export const EventSubscription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    event: InspectorEvent,
    subscribedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "EventSubscription",
}) as any as S.Schema<EventSubscription>;
export type EventSubscriptionList = EventSubscription[];
export const EventSubscriptionList = /*@__PURE__*/ S.Array(EventSubscription);
export interface Subscription {
  resourceArn: string;
  topicArn: string;
  eventSubscriptions: EventSubscription[];
}
export const Subscription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String,
    topicArn: S.String,
    eventSubscriptions: EventSubscriptionList,
  }),
).annotate({ identifier: "Subscription" }) as any as S.Schema<Subscription>;
export type SubscriptionList = Subscription[];
export const SubscriptionList = /*@__PURE__*/ S.Array(Subscription);
export interface ListEventSubscriptionsResponse {
  subscriptions: Subscription[];
  nextToken?: string;
}
export const ListEventSubscriptionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subscriptions: SubscriptionList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEventSubscriptionsResponse",
}) as any as S.Schema<ListEventSubscriptionsResponse>;
export interface ListExclusionsRequest {
  assessmentRunArn: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListExclusionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assessmentRunArn: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListExclusionsRequest",
}) as any as S.Schema<ListExclusionsRequest>;
export interface ListExclusionsResponse {
  exclusionArns: string[];
  nextToken?: string;
}
export const ListExclusionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exclusionArns: ListReturnedArnList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListExclusionsResponse",
}) as any as S.Schema<ListExclusionsResponse>;
export type AgentIdList = string[];
export const AgentIdList = /*@__PURE__*/ S.Array(S.String);
export type AutoScalingGroupList = string[];
export const AutoScalingGroupList = /*@__PURE__*/ S.Array(S.String);
export type RuleName = string;
export type RuleNameList = string[];
export const RuleNameList = /*@__PURE__*/ S.Array(S.String);
export type SeverityList = Severity[];
export const SeverityList = /*@__PURE__*/ S.Array(Severity);
export interface FindingFilter {
  agentIds?: string[];
  autoScalingGroups?: string[];
  ruleNames?: string[];
  severities?: Severity[];
  rulesPackageArns?: string[];
  attributes?: Attribute[];
  userAttributes?: Attribute[];
  creationTimeRange?: TimestampRange;
}
export const FindingFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentIds: S.optional(AgentIdList),
    autoScalingGroups: S.optional(AutoScalingGroupList),
    ruleNames: S.optional(RuleNameList),
    severities: S.optional(SeverityList),
    rulesPackageArns: S.optional(FilterRulesPackageArnList),
    attributes: S.optional(AttributeList),
    userAttributes: S.optional(AttributeList),
    creationTimeRange: S.optional(TimestampRange),
  }),
).annotate({ identifier: "FindingFilter" }) as any as S.Schema<FindingFilter>;
export interface ListFindingsRequest {
  assessmentRunArns?: string[];
  filter?: FindingFilter;
  nextToken?: string;
  maxResults?: number;
}
export const ListFindingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assessmentRunArns: S.optional(ListParentArnList),
    filter: S.optional(FindingFilter),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListFindingsRequest",
}) as any as S.Schema<ListFindingsRequest>;
export interface ListFindingsResponse {
  findingArns: string[];
  nextToken?: string;
}
export const ListFindingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    findingArns: ListReturnedArnList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFindingsResponse",
}) as any as S.Schema<ListFindingsResponse>;
export interface ListRulesPackagesRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListRulesPackagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRulesPackagesRequest",
}) as any as S.Schema<ListRulesPackagesRequest>;
export interface ListRulesPackagesResponse {
  rulesPackageArns: string[];
  nextToken?: string;
}
export const ListRulesPackagesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    rulesPackageArns: ListReturnedArnList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRulesPackagesResponse",
}) as any as S.Schema<ListRulesPackagesResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface ListTagsForResourceResponse {
  tags: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: TagList }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type PreviewAgentsMaxResults = number;
export interface PreviewAgentsRequest {
  previewAgentsArn: string;
  nextToken?: string;
  maxResults?: number;
}
export const PreviewAgentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    previewAgentsArn: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PreviewAgentsRequest",
}) as any as S.Schema<PreviewAgentsRequest>;
export type AgentVersion = string;
export type OperatingSystem = string;
export type KernelVersion = string;
export interface AgentPreview {
  hostname?: string;
  agentId: string;
  autoScalingGroup?: string;
  agentHealth?: AgentHealth;
  agentVersion?: string;
  operatingSystem?: string;
  kernelVersion?: string;
  ipv4Address?: string;
}
export const AgentPreview = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    hostname: S.optional(S.String),
    agentId: S.String,
    autoScalingGroup: S.optional(S.String),
    agentHealth: S.optional(AgentHealth),
    agentVersion: S.optional(S.String),
    operatingSystem: S.optional(S.String),
    kernelVersion: S.optional(S.String),
    ipv4Address: S.optional(S.String),
  }),
).annotate({ identifier: "AgentPreview" }) as any as S.Schema<AgentPreview>;
export type AgentPreviewList = AgentPreview[];
export const AgentPreviewList = /*@__PURE__*/ S.Array(AgentPreview);
export interface PreviewAgentsResponse {
  agentPreviews: AgentPreview[];
  nextToken?: string;
}
export const PreviewAgentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentPreviews: AgentPreviewList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "PreviewAgentsResponse",
}) as any as S.Schema<PreviewAgentsResponse>;
export interface RegisterCrossAccountAccessRoleRequest {
  roleArn: string;
}
export const RegisterCrossAccountAccessRoleRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ roleArn: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "RegisterCrossAccountAccessRoleRequest",
}) as any as S.Schema<RegisterCrossAccountAccessRoleRequest>;
export interface RegisterCrossAccountAccessRoleResponse {}
export const RegisterCrossAccountAccessRoleResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "RegisterCrossAccountAccessRoleResponse",
}) as any as S.Schema<RegisterCrossAccountAccessRoleResponse>;
export type UserAttributeKeyList = string[];
export const UserAttributeKeyList = /*@__PURE__*/ S.Array(S.String);
export interface RemoveAttributesFromFindingsRequest {
  findingArns: string[];
  attributeKeys: string[];
}
export const RemoveAttributesFromFindingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    findingArns: AddRemoveAttributesFindingArnList,
    attributeKeys: UserAttributeKeyList,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RemoveAttributesFromFindingsRequest",
}) as any as S.Schema<RemoveAttributesFromFindingsRequest>;
export interface RemoveAttributesFromFindingsResponse {
  failedItems: { [key: string]: FailedItemDetails | undefined };
}
export const RemoveAttributesFromFindingsResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ failedItems: FailedItems }),
).annotate({
  identifier: "RemoveAttributesFromFindingsResponse",
}) as any as S.Schema<RemoveAttributesFromFindingsResponse>;
export interface SetTagsForResourceRequest {
  resourceArn: string;
  tags?: Tag[];
}
export const SetTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tags: S.optional(TagList) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "SetTagsForResourceRequest",
}) as any as S.Schema<SetTagsForResourceRequest>;
export interface SetTagsForResourceResponse {}
export const SetTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "SetTagsForResourceResponse",
}) as any as S.Schema<SetTagsForResourceResponse>;
export interface StartAssessmentRunRequest {
  assessmentTemplateArn: string;
  assessmentRunName?: string;
}
export const StartAssessmentRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assessmentTemplateArn: S.String,
    assessmentRunName: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartAssessmentRunRequest",
}) as any as S.Schema<StartAssessmentRunRequest>;
export interface StartAssessmentRunResponse {
  assessmentRunArn: string;
}
export const StartAssessmentRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assessmentRunArn: S.String }),
).annotate({
  identifier: "StartAssessmentRunResponse",
}) as any as S.Schema<StartAssessmentRunResponse>;
export type StopAction = "START_EVALUATION" | "SKIP_EVALUATION" | (string & {});
export const StopAction = S.String;

export interface StopAssessmentRunRequest {
  assessmentRunArn: string;
  stopAction?: StopAction;
}
export const StopAssessmentRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assessmentRunArn: S.String,
    stopAction: S.optional(StopAction),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopAssessmentRunRequest",
}) as any as S.Schema<StopAssessmentRunRequest>;
export interface StopAssessmentRunResponse {}
export const StopAssessmentRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopAssessmentRunResponse",
}) as any as S.Schema<StopAssessmentRunResponse>;
export interface SubscribeToEventRequest {
  resourceArn: string;
  event: InspectorEvent;
  topicArn: string;
}
export const SubscribeToEventRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String,
    event: InspectorEvent,
    topicArn: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "SubscribeToEventRequest",
}) as any as S.Schema<SubscribeToEventRequest>;
export interface SubscribeToEventResponse {}
export const SubscribeToEventResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "SubscribeToEventResponse",
}) as any as S.Schema<SubscribeToEventResponse>;
export interface UnsubscribeFromEventRequest {
  resourceArn: string;
  event: InspectorEvent;
  topicArn: string;
}
export const UnsubscribeFromEventRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String,
    event: InspectorEvent,
    topicArn: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UnsubscribeFromEventRequest",
}) as any as S.Schema<UnsubscribeFromEventRequest>;
export interface UnsubscribeFromEventResponse {}
export const UnsubscribeFromEventResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UnsubscribeFromEventResponse",
}) as any as S.Schema<UnsubscribeFromEventResponse>;
export interface UpdateAssessmentTargetRequest {
  assessmentTargetArn: string;
  assessmentTargetName: string;
  resourceGroupArn?: string;
}
export const UpdateAssessmentTargetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assessmentTargetArn: S.String,
    assessmentTargetName: S.String,
    resourceGroupArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateAssessmentTargetRequest",
}) as any as S.Schema<UpdateAssessmentTargetRequest>;
export interface UpdateAssessmentTargetResponse {}
export const UpdateAssessmentTargetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateAssessmentTargetResponse",
}) as any as S.Schema<UpdateAssessmentTargetResponse>;
export type ErrorMessage = string;
export type AccessDeniedErrorCode =
  | "ACCESS_DENIED_TO_ASSESSMENT_TARGET"
  | "ACCESS_DENIED_TO_ASSESSMENT_TEMPLATE"
  | "ACCESS_DENIED_TO_ASSESSMENT_RUN"
  | "ACCESS_DENIED_TO_FINDING"
  | "ACCESS_DENIED_TO_RESOURCE_GROUP"
  | "ACCESS_DENIED_TO_RULES_PACKAGE"
  | "ACCESS_DENIED_TO_SNS_TOPIC"
  | "ACCESS_DENIED_TO_IAM_ROLE"
  | (string & {});
export const AccessDeniedErrorCode = S.String;

export type InvalidInputErrorCode =
  | "INVALID_ASSESSMENT_TARGET_ARN"
  | "INVALID_ASSESSMENT_TEMPLATE_ARN"
  | "INVALID_ASSESSMENT_RUN_ARN"
  | "INVALID_FINDING_ARN"
  | "INVALID_RESOURCE_GROUP_ARN"
  | "INVALID_RULES_PACKAGE_ARN"
  | "INVALID_RESOURCE_ARN"
  | "INVALID_SNS_TOPIC_ARN"
  | "INVALID_IAM_ROLE_ARN"
  | "INVALID_ASSESSMENT_TARGET_NAME"
  | "INVALID_ASSESSMENT_TARGET_NAME_PATTERN"
  | "INVALID_ASSESSMENT_TEMPLATE_NAME"
  | "INVALID_ASSESSMENT_TEMPLATE_NAME_PATTERN"
  | "INVALID_ASSESSMENT_TEMPLATE_DURATION"
  | "INVALID_ASSESSMENT_TEMPLATE_DURATION_RANGE"
  | "INVALID_ASSESSMENT_RUN_DURATION_RANGE"
  | "INVALID_ASSESSMENT_RUN_START_TIME_RANGE"
  | "INVALID_ASSESSMENT_RUN_COMPLETION_TIME_RANGE"
  | "INVALID_ASSESSMENT_RUN_STATE_CHANGE_TIME_RANGE"
  | "INVALID_ASSESSMENT_RUN_STATE"
  | "INVALID_TAG"
  | "INVALID_TAG_KEY"
  | "INVALID_TAG_VALUE"
  | "INVALID_RESOURCE_GROUP_TAG_KEY"
  | "INVALID_RESOURCE_GROUP_TAG_VALUE"
  | "INVALID_ATTRIBUTE"
  | "INVALID_USER_ATTRIBUTE"
  | "INVALID_USER_ATTRIBUTE_KEY"
  | "INVALID_USER_ATTRIBUTE_VALUE"
  | "INVALID_PAGINATION_TOKEN"
  | "INVALID_MAX_RESULTS"
  | "INVALID_AGENT_ID"
  | "INVALID_AUTO_SCALING_GROUP"
  | "INVALID_RULE_NAME"
  | "INVALID_SEVERITY"
  | "INVALID_LOCALE"
  | "INVALID_EVENT"
  | "ASSESSMENT_TARGET_NAME_ALREADY_TAKEN"
  | "ASSESSMENT_TEMPLATE_NAME_ALREADY_TAKEN"
  | "INVALID_NUMBER_OF_ASSESSMENT_TARGET_ARNS"
  | "INVALID_NUMBER_OF_ASSESSMENT_TEMPLATE_ARNS"
  | "INVALID_NUMBER_OF_ASSESSMENT_RUN_ARNS"
  | "INVALID_NUMBER_OF_FINDING_ARNS"
  | "INVALID_NUMBER_OF_RESOURCE_GROUP_ARNS"
  | "INVALID_NUMBER_OF_RULES_PACKAGE_ARNS"
  | "INVALID_NUMBER_OF_ASSESSMENT_RUN_STATES"
  | "INVALID_NUMBER_OF_TAGS"
  | "INVALID_NUMBER_OF_RESOURCE_GROUP_TAGS"
  | "INVALID_NUMBER_OF_ATTRIBUTES"
  | "INVALID_NUMBER_OF_USER_ATTRIBUTES"
  | "INVALID_NUMBER_OF_AGENT_IDS"
  | "INVALID_NUMBER_OF_AUTO_SCALING_GROUPS"
  | "INVALID_NUMBER_OF_RULE_NAMES"
  | "INVALID_NUMBER_OF_SEVERITIES"
  | (string & {});
export const InvalidInputErrorCode = S.String;

export type NoSuchEntityErrorCode =
  | "ASSESSMENT_TARGET_DOES_NOT_EXIST"
  | "ASSESSMENT_TEMPLATE_DOES_NOT_EXIST"
  | "ASSESSMENT_RUN_DOES_NOT_EXIST"
  | "FINDING_DOES_NOT_EXIST"
  | "RESOURCE_GROUP_DOES_NOT_EXIST"
  | "RULES_PACKAGE_DOES_NOT_EXIST"
  | "SNS_TOPIC_DOES_NOT_EXIST"
  | "IAM_ROLE_DOES_NOT_EXIST"
  | (string & {});
export const NoSuchEntityErrorCode = S.String;

export type InvalidCrossAccountRoleErrorCode =
  | "ROLE_DOES_NOT_EXIST_OR_INVALID_TRUST_RELATIONSHIP"
  | "ROLE_DOES_NOT_HAVE_CORRECT_POLICY"
  | (string & {});
export const InvalidCrossAccountRoleErrorCode = S.String;

export type LimitExceededErrorCode =
  | "ASSESSMENT_TARGET_LIMIT_EXCEEDED"
  | "ASSESSMENT_TEMPLATE_LIMIT_EXCEEDED"
  | "ASSESSMENT_RUN_LIMIT_EXCEEDED"
  | "RESOURCE_GROUP_LIMIT_EXCEEDED"
  | "EVENT_SUBSCRIPTION_LIMIT_EXCEEDED"
  | (string & {});
export const LimitExceededErrorCode = S.String;

export type AssessmentRunInProgressArnList = string[];
export const AssessmentRunInProgressArnList = /*@__PURE__*/ S.Array(S.String);
export interface AgentAlreadyRunningAssessment {
  agentId: string;
  assessmentRunArn: string;
}
export const AgentAlreadyRunningAssessment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agentId: S.String, assessmentRunArn: S.String }),
).annotate({
  identifier: "AgentAlreadyRunningAssessment",
}) as any as S.Schema<AgentAlreadyRunningAssessment>;
export type AgentAlreadyRunningAssessmentList = AgentAlreadyRunningAssessment[];
export const AgentAlreadyRunningAssessmentList = /*@__PURE__*/ S.Array(
  AgentAlreadyRunningAssessment,
);
export type AddAttributesToFindingsError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Assigns attributes (key and value pairs) to the findings that are specified by the
 * ARNs of the findings.
 */
export const addAttributesToFindings: API.OperationMethod<
  AddAttributesToFindingsRequest,
  AddAttributesToFindingsResponse,
  AddAttributesToFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddAttributesToFindingsRequest,
  output: AddAttributesToFindingsResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddAttributesToFindings",
}));

export type CreateAssessmentTargetError =
  | AccessDeniedException
  | InternalException
  | InvalidCrossAccountRoleException
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Creates a new assessment target using the ARN of the resource group that is generated
 * by CreateResourceGroup. If resourceGroupArn is not specified, all EC2
 * instances in the current AWS account and region are included in the assessment target. If
 * the service-linked role isn’t already registered, this action also creates and
 * registers a service-linked role to grant Amazon Inspector access to AWS Services needed to
 * perform security assessments. You can create up to 50 assessment targets per AWS account.
 * You can run up to 500 concurrent agents per AWS account. For more information, see
 * Amazon Inspector Assessment Targets.
 */
export const createAssessmentTarget: API.OperationMethod<
  CreateAssessmentTargetRequest,
  CreateAssessmentTargetResponse,
  CreateAssessmentTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAssessmentTargetRequest,
  output: CreateAssessmentTargetResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidCrossAccountRoleException,
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssessmentTarget",
}));

export type CreateAssessmentTemplateError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Creates an assessment template for the assessment target that is specified by the ARN
 * of the assessment target. If the service-linked role isn’t already registered, this action also creates and
 * registers a service-linked role to grant Amazon Inspector access to AWS Services needed to
 * perform security assessments.
 */
export const createAssessmentTemplate: API.OperationMethod<
  CreateAssessmentTemplateRequest,
  CreateAssessmentTemplateResponse,
  CreateAssessmentTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAssessmentTemplateRequest,
  output: CreateAssessmentTemplateResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssessmentTemplate",
}));

export type CreateExclusionsPreviewError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | PreviewGenerationInProgressException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Starts the generation of an exclusions preview for the specified assessment template.
 * The exclusions preview lists the potential exclusions (ExclusionPreview) that Inspector can
 * detect before it runs the assessment.
 */
export const createExclusionsPreview: API.OperationMethod<
  CreateExclusionsPreviewRequest,
  CreateExclusionsPreviewResponse,
  CreateExclusionsPreviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateExclusionsPreviewRequest,
  output: CreateExclusionsPreviewResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
    PreviewGenerationInProgressException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExclusionsPreview",
}));

export type CreateResourceGroupError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | LimitExceededException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Creates a resource group using the specified set of tags (key and value pairs) that
 * are used to select the EC2 instances to be included in an Amazon Inspector assessment
 * target. The created resource group is then used to create an Amazon Inspector assessment
 * target. For more information, see CreateAssessmentTarget.
 */
export const createResourceGroup: API.OperationMethod<
  CreateResourceGroupRequest,
  CreateResourceGroupResponse,
  CreateResourceGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateResourceGroupRequest,
  output: CreateResourceGroupResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    LimitExceededException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourceGroup",
}));

export type DeleteAssessmentRunError =
  | AccessDeniedException
  | AssessmentRunInProgressException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Deletes the assessment run that is specified by the ARN of the assessment
 * run.
 */
export const deleteAssessmentRun: API.OperationMethod<
  DeleteAssessmentRunRequest,
  DeleteAssessmentRunResponse,
  DeleteAssessmentRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAssessmentRunRequest,
  output: DeleteAssessmentRunResponse,
  errors: [
    AccessDeniedException,
    AssessmentRunInProgressException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssessmentRun",
}));

export type DeleteAssessmentTargetError =
  | AccessDeniedException
  | AssessmentRunInProgressException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Deletes the assessment target that is specified by the ARN of the assessment
 * target.
 */
export const deleteAssessmentTarget: API.OperationMethod<
  DeleteAssessmentTargetRequest,
  DeleteAssessmentTargetResponse,
  DeleteAssessmentTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAssessmentTargetRequest,
  output: DeleteAssessmentTargetResponse,
  errors: [
    AccessDeniedException,
    AssessmentRunInProgressException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssessmentTarget",
}));

export type DeleteAssessmentTemplateError =
  | AccessDeniedException
  | AssessmentRunInProgressException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Deletes the assessment template that is specified by the ARN of the assessment
 * template.
 */
export const deleteAssessmentTemplate: API.OperationMethod<
  DeleteAssessmentTemplateRequest,
  DeleteAssessmentTemplateResponse,
  DeleteAssessmentTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAssessmentTemplateRequest,
  output: DeleteAssessmentTemplateResponse,
  errors: [
    AccessDeniedException,
    AssessmentRunInProgressException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssessmentTemplate",
}));

export type DescribeAssessmentRunsError =
  | InternalException
  | InvalidInputException
  | CommonErrors;
/**
 * Describes the assessment runs that are specified by the ARNs of the assessment
 * runs.
 */
export const describeAssessmentRuns: API.OperationMethod<
  DescribeAssessmentRunsRequest,
  DescribeAssessmentRunsResponse,
  DescribeAssessmentRunsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAssessmentRunsRequest,
  output: DescribeAssessmentRunsResponse,
  errors: [InternalException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssessmentRuns",
}));

export type DescribeAssessmentTargetsError =
  | InternalException
  | InvalidInputException
  | CommonErrors;
/**
 * Describes the assessment targets that are specified by the ARNs of the assessment
 * targets.
 */
export const describeAssessmentTargets: API.OperationMethod<
  DescribeAssessmentTargetsRequest,
  DescribeAssessmentTargetsResponse,
  DescribeAssessmentTargetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAssessmentTargetsRequest,
  output: DescribeAssessmentTargetsResponse,
  errors: [InternalException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssessmentTargets",
}));

export type DescribeAssessmentTemplatesError =
  | InternalException
  | InvalidInputException
  | CommonErrors;
/**
 * Describes the assessment templates that are specified by the ARNs of the assessment
 * templates.
 */
export const describeAssessmentTemplates: API.OperationMethod<
  DescribeAssessmentTemplatesRequest,
  DescribeAssessmentTemplatesResponse,
  DescribeAssessmentTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAssessmentTemplatesRequest,
  output: DescribeAssessmentTemplatesResponse,
  errors: [InternalException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssessmentTemplates",
}));

export type DescribeCrossAccountAccessRoleError =
  | InternalException
  | CommonErrors;
/**
 * Describes the IAM role that enables Amazon Inspector to access your AWS
 * account.
 */
export const describeCrossAccountAccessRole: API.OperationMethod<
  DescribeCrossAccountAccessRoleRequest,
  DescribeCrossAccountAccessRoleResponse,
  DescribeCrossAccountAccessRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeCrossAccountAccessRoleRequest,
  output: DescribeCrossAccountAccessRoleResponse,
  errors: [InternalException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCrossAccountAccessRole",
}));

export type DescribeExclusionsError =
  | InternalException
  | InvalidInputException
  | CommonErrors;
/**
 * Describes the exclusions that are specified by the exclusions' ARNs.
 */
export const describeExclusions: API.OperationMethod<
  DescribeExclusionsRequest,
  DescribeExclusionsResponse,
  DescribeExclusionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeExclusionsRequest,
  output: DescribeExclusionsResponse,
  errors: [InternalException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExclusions",
}));

export type DescribeFindingsError =
  | InternalException
  | InvalidInputException
  | CommonErrors;
/**
 * Describes the findings that are specified by the ARNs of the findings.
 */
export const describeFindings: API.OperationMethod<
  DescribeFindingsRequest,
  DescribeFindingsResponse,
  DescribeFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeFindingsRequest,
  output: DescribeFindingsResponse,
  errors: [InternalException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFindings",
}));

export type DescribeResourceGroupsError =
  | InternalException
  | InvalidInputException
  | CommonErrors;
/**
 * Describes the resource groups that are specified by the ARNs of the resource
 * groups.
 */
export const describeResourceGroups: API.OperationMethod<
  DescribeResourceGroupsRequest,
  DescribeResourceGroupsResponse,
  DescribeResourceGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeResourceGroupsRequest,
  output: DescribeResourceGroupsResponse,
  errors: [InternalException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResourceGroups",
}));

export type DescribeRulesPackagesError =
  | InternalException
  | InvalidInputException
  | CommonErrors;
/**
 * Describes the rules packages that are specified by the ARNs of the rules
 * packages.
 */
export const describeRulesPackages: API.OperationMethod<
  DescribeRulesPackagesRequest,
  DescribeRulesPackagesResponse,
  DescribeRulesPackagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeRulesPackagesRequest,
  output: DescribeRulesPackagesResponse,
  errors: [InternalException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRulesPackages",
}));

export type GetAssessmentReportError =
  | AccessDeniedException
  | AssessmentRunInProgressException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Produces an assessment report that includes detailed and comprehensive results of a
 * specified assessment run.
 */
export const getAssessmentReport: API.OperationMethod<
  GetAssessmentReportRequest,
  GetAssessmentReportResponse,
  GetAssessmentReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAssessmentReportRequest,
  output: GetAssessmentReportResponse,
  errors: [
    AccessDeniedException,
    AssessmentRunInProgressException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssessmentReport",
}));

export type GetExclusionsPreviewError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | CommonErrors;
/**
 * Retrieves the exclusions preview (a list of ExclusionPreview objects) specified by
 * the preview token. You can obtain the preview token by running the CreateExclusionsPreview
 * API.
 */
export const getExclusionsPreview: API.PaginatedOperationMethod<
  GetExclusionsPreviewRequest,
  GetExclusionsPreviewResponse,
  GetExclusionsPreviewError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetExclusionsPreviewRequest,
  output: GetExclusionsPreviewResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExclusionsPreview",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetTelemetryMetadataError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | CommonErrors;
/**
 * Information about the data that is collected for the specified assessment
 * run.
 */
export const getTelemetryMetadata: API.OperationMethod<
  GetTelemetryMetadataRequest,
  GetTelemetryMetadataResponse,
  GetTelemetryMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTelemetryMetadataRequest,
  output: GetTelemetryMetadataResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTelemetryMetadata",
}));

export type ListAssessmentRunAgentsError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | CommonErrors;
/**
 * Lists the agents of the assessment runs that are specified by the ARNs of the
 * assessment runs.
 */
export const listAssessmentRunAgents: API.PaginatedOperationMethod<
  ListAssessmentRunAgentsRequest,
  ListAssessmentRunAgentsResponse,
  ListAssessmentRunAgentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssessmentRunAgentsRequest,
  output: ListAssessmentRunAgentsResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssessmentRunAgents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssessmentRunsError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | CommonErrors;
/**
 * Lists the assessment runs that correspond to the assessment templates that are
 * specified by the ARNs of the assessment templates.
 */
export const listAssessmentRuns: API.PaginatedOperationMethod<
  ListAssessmentRunsRequest,
  ListAssessmentRunsResponse,
  ListAssessmentRunsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssessmentRunsRequest,
  output: ListAssessmentRunsResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssessmentRuns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssessmentTargetsError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | CommonErrors;
/**
 * Lists the ARNs of the assessment targets within this AWS account. For more
 * information about assessment targets, see Amazon Inspector Assessment
 * Targets.
 */
export const listAssessmentTargets: API.PaginatedOperationMethod<
  ListAssessmentTargetsRequest,
  ListAssessmentTargetsResponse,
  ListAssessmentTargetsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssessmentTargetsRequest,
  output: ListAssessmentTargetsResponse,
  errors: [AccessDeniedException, InternalException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssessmentTargets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssessmentTemplatesError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | CommonErrors;
/**
 * Lists the assessment templates that correspond to the assessment targets that are
 * specified by the ARNs of the assessment targets.
 */
export const listAssessmentTemplates: API.PaginatedOperationMethod<
  ListAssessmentTemplatesRequest,
  ListAssessmentTemplatesResponse,
  ListAssessmentTemplatesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssessmentTemplatesRequest,
  output: ListAssessmentTemplatesResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssessmentTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEventSubscriptionsError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | CommonErrors;
/**
 * Lists all the event subscriptions for the assessment template that is specified by
 * the ARN of the assessment template. For more information, see SubscribeToEvent and UnsubscribeFromEvent.
 */
export const listEventSubscriptions: API.PaginatedOperationMethod<
  ListEventSubscriptionsRequest,
  ListEventSubscriptionsResponse,
  ListEventSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEventSubscriptionsRequest,
  output: ListEventSubscriptionsResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventSubscriptions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListExclusionsError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | CommonErrors;
/**
 * List exclusions that are generated by the assessment run.
 */
export const listExclusions: API.PaginatedOperationMethod<
  ListExclusionsRequest,
  ListExclusionsResponse,
  ListExclusionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListExclusionsRequest,
  output: ListExclusionsResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExclusions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFindingsError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | CommonErrors;
/**
 * Lists findings that are generated by the assessment runs that are specified by the
 * ARNs of the assessment runs.
 */
export const listFindings: API.PaginatedOperationMethod<
  ListFindingsRequest,
  ListFindingsResponse,
  ListFindingsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFindingsRequest,
  output: ListFindingsResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFindings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRulesPackagesError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | CommonErrors;
/**
 * Lists all available Amazon Inspector rules packages.
 */
export const listRulesPackages: API.PaginatedOperationMethod<
  ListRulesPackagesRequest,
  ListRulesPackagesResponse,
  ListRulesPackagesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRulesPackagesRequest,
  output: ListRulesPackagesResponse,
  errors: [AccessDeniedException, InternalException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRulesPackages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | CommonErrors;
/**
 * Lists all tags associated with an assessment template.
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
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PreviewAgentsError =
  | AccessDeniedException
  | InternalException
  | InvalidCrossAccountRoleException
  | InvalidInputException
  | NoSuchEntityException
  | CommonErrors;
/**
 * Previews the agents installed on the EC2 instances that are part of the specified
 * assessment target.
 */
export const previewAgents: API.PaginatedOperationMethod<
  PreviewAgentsRequest,
  PreviewAgentsResponse,
  PreviewAgentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: PreviewAgentsRequest,
  output: PreviewAgentsResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidCrossAccountRoleException,
    InvalidInputException,
    NoSuchEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PreviewAgents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type RegisterCrossAccountAccessRoleError =
  | AccessDeniedException
  | InternalException
  | InvalidCrossAccountRoleException
  | InvalidInputException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Registers the IAM role that grants Amazon Inspector access to AWS Services needed to
 * perform security assessments.
 */
export const registerCrossAccountAccessRole: API.OperationMethod<
  RegisterCrossAccountAccessRoleRequest,
  RegisterCrossAccountAccessRoleResponse,
  RegisterCrossAccountAccessRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterCrossAccountAccessRoleRequest,
  output: RegisterCrossAccountAccessRoleResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidCrossAccountRoleException,
    InvalidInputException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterCrossAccountAccessRole",
}));

export type RemoveAttributesFromFindingsError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Removes entire attributes (key and value pairs) from the findings that are specified
 * by the ARNs of the findings where an attribute with the specified key exists.
 */
export const removeAttributesFromFindings: API.OperationMethod<
  RemoveAttributesFromFindingsRequest,
  RemoveAttributesFromFindingsResponse,
  RemoveAttributesFromFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveAttributesFromFindingsRequest,
  output: RemoveAttributesFromFindingsResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveAttributesFromFindings",
}));

export type SetTagsForResourceError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Sets tags (key and value pairs) to the assessment template that is specified by the
 * ARN of the assessment template.
 */
export const setTagsForResource: API.OperationMethod<
  SetTagsForResourceRequest,
  SetTagsForResourceResponse,
  SetTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetTagsForResourceRequest,
  output: SetTagsForResourceResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetTagsForResource",
}));

export type StartAssessmentRunError =
  | AccessDeniedException
  | AgentsAlreadyRunningAssessmentException
  | InternalException
  | InvalidCrossAccountRoleException
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Starts the assessment run specified by the ARN of the assessment template. For this
 * API to function properly, you must not exceed the limit of running up to 500 concurrent
 * agents per AWS account.
 */
export const startAssessmentRun: API.OperationMethod<
  StartAssessmentRunRequest,
  StartAssessmentRunResponse,
  StartAssessmentRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartAssessmentRunRequest,
  output: StartAssessmentRunResponse,
  errors: [
    AccessDeniedException,
    AgentsAlreadyRunningAssessmentException,
    InternalException,
    InvalidCrossAccountRoleException,
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAssessmentRun",
}));

export type StopAssessmentRunError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Stops the assessment run that is specified by the ARN of the assessment
 * run.
 */
export const stopAssessmentRun: API.OperationMethod<
  StopAssessmentRunRequest,
  StopAssessmentRunResponse,
  StopAssessmentRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopAssessmentRunRequest,
  output: StopAssessmentRunResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopAssessmentRun",
}));

export type SubscribeToEventError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Enables the process of sending Amazon Simple Notification Service (SNS) notifications
 * about a specified event to a specified SNS topic.
 */
export const subscribeToEvent: API.OperationMethod<
  SubscribeToEventRequest,
  SubscribeToEventResponse,
  SubscribeToEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SubscribeToEventRequest,
  output: SubscribeToEventResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubscribeToEvent",
}));

export type UnsubscribeFromEventError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Disables the process of sending Amazon Simple Notification Service (SNS)
 * notifications about a specified event to a specified SNS topic.
 */
export const unsubscribeFromEvent: API.OperationMethod<
  UnsubscribeFromEventRequest,
  UnsubscribeFromEventResponse,
  UnsubscribeFromEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UnsubscribeFromEventRequest,
  output: UnsubscribeFromEventResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UnsubscribeFromEvent",
}));

export type UpdateAssessmentTargetError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Updates the assessment target that is specified by the ARN of the assessment
 * target.
 *
 * If resourceGroupArn is not specified, all EC2 instances in the current AWS account
 * and region are included in the assessment target.
 */
export const updateAssessmentTarget: API.OperationMethod<
  UpdateAssessmentTargetRequest,
  UpdateAssessmentTargetResponse,
  UpdateAssessmentTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAssessmentTargetRequest,
  output: UpdateAssessmentTargetResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAssessmentTarget",
}));
