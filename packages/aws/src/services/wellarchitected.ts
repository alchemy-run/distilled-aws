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
  sdkId: "WellArchitected",
  serviceShapeName: "WellArchitectedApiServiceLambda",
});
const auth = T.AwsAuthSigv4({ name: "wellarchitected" });
const ver = T.ServiceVersion("2020-03-31");
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
              `https://wellarchitected-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://wellarchitected-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://wellarchitected.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://wellarchitected.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceId: S.optional(S.String),
      ResourceType: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceId: S.optional(S.String),
      ResourceType: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceId: S.optional(S.String),
      ResourceType: S.optional(S.String),
      QuotaCode: S.optional(S.String),
      ServiceCode: S.optional(S.String),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      QuotaCode: S.optional(S.String),
      ServiceCode: S.optional(S.String),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Reason: S.optional(
        S.suspend(() => ValidationExceptionReason).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
      Fields: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type WorkloadId = string;
export type LensAlias = string;
export type LensAliases = string[];
export const LensAliases = /*@__PURE__*/ S.Array(S.String);
export interface AssociateLensesInput {
  WorkloadId: string;
  LensAliases?: string[];
}
export const AssociateLensesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")),
    LensAliases: S.optional(LensAliases),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/workloads/{WorkloadId}/associateLenses",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateLensesInput",
}) as any as S.Schema<AssociateLensesInput>;
export interface AssociateLensesResponse {}
export const AssociateLensesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateLensesResponse",
}) as any as S.Schema<AssociateLensesResponse>;
export type ProfileArn = string;
export type ProfileArns = string[];
export const ProfileArns = /*@__PURE__*/ S.Array(S.String);
export interface AssociateProfilesInput {
  WorkloadId: string;
  ProfileArns?: string[];
}
export const AssociateProfilesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")),
    ProfileArns: S.optional(ProfileArns),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/workloads/{WorkloadId}/associateProfiles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateProfilesInput",
}) as any as S.Schema<AssociateProfilesInput>;
export interface AssociateProfilesResponse {}
export const AssociateProfilesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateProfilesResponse",
}) as any as S.Schema<AssociateProfilesResponse>;
export type AgentProfileArn = string;
export type SensitiveString = string | redacted.Redacted<string>;
export type ContextType = "APPLICATION" | (string & {});
export const ContextType = S.String;

export type ContextAccountIdList = string[];
export const ContextAccountIdList = /*@__PURE__*/ S.Array(S.String);
export type ContextRegionList = string[];
export const ContextRegionList = /*@__PURE__*/ S.Array(S.String);
export type ContextAwsServiceList = string[];
export const ContextAwsServiceList = /*@__PURE__*/ S.Array(S.String);
export type ContextResourceTypeList = string[];
export const ContextResourceTypeList = /*@__PURE__*/ S.Array(S.String);
export interface ContextResourceTag {
  key: string;
  value: string;
}
export const ContextResourceTag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({
  identifier: "ContextResourceTag",
}) as any as S.Schema<ContextResourceTag>;
export type ContextResourceTagList = ContextResourceTag[];
export const ContextResourceTagList = /*@__PURE__*/ S.Array(ContextResourceTag);
export type ApplicationType =
  | "SAS"
  | "DESKTOP_APPLICATION"
  | "OTHER"
  | (string & {});
export const ApplicationType = S.String;

export type Criticality =
  | "MISSION_CRITICAL"
  | "BUSINESS_CRITICAL"
  | "NON_CRITICAL"
  | "TEST_DEVELOPMENT"
  | (string & {});
export const Criticality = S.String;

export interface ContextContent {
  accountIds?: string[];
  regions?: string[];
  awsServices?: string[];
  resourceTypes?: string[];
  resourceTags?: ContextResourceTag[];
  applicationOverview?: string | redacted.Redacted<string>;
  industry?: string | redacted.Redacted<string>;
  applicationType?: ApplicationType;
  criticality?: Criticality;
  architectureOverview?: string | redacted.Redacted<string>;
  additionalContext?: string | redacted.Redacted<string>;
}
export const ContextContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountIds: S.optional(ContextAccountIdList),
    regions: S.optional(ContextRegionList),
    awsServices: S.optional(ContextAwsServiceList),
    resourceTypes: S.optional(ContextResourceTypeList),
    resourceTags: S.optional(ContextResourceTagList),
    applicationOverview: S.optional(SensitiveString),
    industry: S.optional(SensitiveString),
    applicationType: S.optional(ApplicationType),
    criticality: S.optional(Criticality),
    architectureOverview: S.optional(SensitiveString),
    additionalContext: S.optional(SensitiveString),
  }),
).annotate({ identifier: "ContextContent" }) as any as S.Schema<ContextContent>;
export interface CreateAgentContextRequest {
  clientToken?: string;
  profileArn: string;
  title: string | redacted.Redacted<string>;
  contextType: ContextType;
  content: ContextContent;
}
export const CreateAgentContextRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    profileArn: S.String.pipe(T.HttpLabel("profileArn")),
    title: SensitiveString,
    contextType: ContextType,
    content: ContextContent,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/api/v1/agent-profiles/{profileArn}/contexts",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAgentContextRequest",
}) as any as S.Schema<CreateAgentContextRequest>;
export type UUID = string;
export interface ContextSummary {
  id: string;
  profileArn: string;
  title: string | redacted.Redacted<string>;
  contextType: ContextType;
  content: ContextContent;
  applicationType?: ApplicationType;
  criticality?: Criticality;
  createdBy: string;
  createdAt: Date;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
}
export const ContextSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    profileArn: S.String,
    title: SensitiveString,
    contextType: ContextType,
    content: ContextContent,
    applicationType: S.optional(ApplicationType),
    criticality: S.optional(Criticality),
    createdBy: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModifiedBy: S.optional(S.String),
    lastModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "ContextSummary" }) as any as S.Schema<ContextSummary>;
export interface CreateAgentContextResponse {
  context: ContextSummary;
}
export const CreateAgentContextResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ context: ContextSummary }),
).annotate({
  identifier: "CreateAgentContextResponse",
}) as any as S.Schema<CreateAgentContextResponse>;
export type Pillar =
  | "COST_OPTIMIZATION"
  | "SECURITY"
  | "RESILIENCE"
  | "PERFORMANCE"
  | "OPERATIONAL_EXCELLENCE"
  | (string & {});
export const Pillar = S.String;

export type Pillars = Pillar[];
export const Pillars = /*@__PURE__*/ S.Array(Pillar);
export interface CreateAgentGoalRequest {
  clientToken?: string;
  profileArn: string;
  pillars: Pillar[];
  title: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
}
export const CreateAgentGoalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    profileArn: S.String.pipe(T.HttpLabel("profileArn")),
    pillars: Pillars,
    title: SensitiveString,
    description: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/api/v1/agent-profiles/{profileArn}/goals",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAgentGoalRequest",
}) as any as S.Schema<CreateAgentGoalRequest>;
export interface GoalSummary {
  id: string;
  profileArn: string;
  pillars: Pillar[];
  title: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  createdBy: string;
  createdAt: Date;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
}
export const GoalSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    profileArn: S.String,
    pillars: Pillars,
    title: SensitiveString,
    description: S.optional(SensitiveString),
    createdBy: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModifiedBy: S.optional(S.String),
    lastModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "GoalSummary" }) as any as S.Schema<GoalSummary>;
export interface CreateAgentGoalResponse {
  goal: GoalSummary;
}
export const CreateAgentGoalResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ goal: GoalSummary }),
).annotate({
  identifier: "CreateAgentGoalResponse",
}) as any as S.Schema<CreateAgentGoalResponse>;
export type RoleArn = string;
export type AccountId = string;
export type Region = string;
export type Regions = string[];
export const Regions = /*@__PURE__*/ S.Array(S.String);
export interface AggregationConfiguration {
  accountId: string;
  regions: string[];
  accessRoleArn: string;
}
export const AggregationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountId: S.String, regions: Regions, accessRoleArn: S.String }),
).annotate({
  identifier: "AggregationConfiguration",
}) as any as S.Schema<AggregationConfiguration>;
export type AggregationConfigurations = AggregationConfiguration[];
export const AggregationConfigurations = /*@__PURE__*/ S.Array(
  AggregationConfiguration,
);
export interface Tag {
  key: string;
  value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type Tags = Tag[];
export const Tags = /*@__PURE__*/ S.Array(Tag);
export interface CreateAgentProfileRequest {
  name: string;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  businessOverview?: string | redacted.Redacted<string>;
  pillars: Pillar[];
  deletionProtection?: boolean;
  executionRoleArn: string;
  aggregationConfiguration: AggregationConfiguration[];
  clientToken?: string;
  tags?: Tag[];
}
export const CreateAgentProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    displayName: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    businessOverview: S.optional(SensitiveString),
    pillars: Pillars,
    deletionProtection: S.optional(S.Boolean),
    executionRoleArn: S.String,
    aggregationConfiguration: AggregationConfigurations,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/api/v1/agent-profiles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAgentProfileRequest",
}) as any as S.Schema<CreateAgentProfileRequest>;
export type FieldErrorPath = string;
export type FieldErrorMessage = string;
export type FieldErrors = { [key: string]: string | undefined };
export const FieldErrors = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateAgentProfileResponse {
  name: string;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  businessOverview?: string | redacted.Redacted<string>;
  pillars: Pillar[];
  deletionProtection?: boolean;
  executionRoleArn: string;
  aggregationConfiguration: AggregationConfiguration[];
  arn: string;
  eligibleForScheduledGeneration?: boolean;
  eligibleForArchitectureGeneration?: boolean;
  fieldErrors?: { [key: string]: string | undefined };
  tags?: Tag[];
  createdBy: string;
  createdAt: Date;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
}
export const CreateAgentProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    displayName: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    businessOverview: S.optional(SensitiveString),
    pillars: Pillars,
    deletionProtection: S.optional(S.Boolean),
    executionRoleArn: S.String,
    aggregationConfiguration: AggregationConfigurations,
    arn: S.String,
    eligibleForScheduledGeneration: S.optional(S.Boolean),
    eligibleForArchitectureGeneration: S.optional(S.Boolean),
    fieldErrors: S.optional(FieldErrors),
    tags: S.optional(Tags),
    createdBy: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModifiedBy: S.optional(S.String),
    lastModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CreateAgentProfileResponse",
}) as any as S.Schema<CreateAgentProfileResponse>;
export type SharedWith = string;
export type ClientRequestToken = string;
export interface CreateLensShareInput {
  LensAlias: string;
  SharedWith?: string;
  ClientRequestToken?: string;
}
export const CreateLensShareInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LensAlias: S.String.pipe(T.HttpLabel("LensAlias")),
    SharedWith: S.optional(S.String),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/lenses/{LensAlias}/shares" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateLensShareInput",
}) as any as S.Schema<CreateLensShareInput>;
export type ShareId = string;
export interface CreateLensShareOutput {
  ShareId?: string;
}
export const CreateLensShareOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ShareId: S.optional(S.String) }),
).annotate({
  identifier: "CreateLensShareOutput",
}) as any as S.Schema<CreateLensShareOutput>;
export type LensVersion = string;
export type IsMajorVersion = boolean;
export interface CreateLensVersionInput {
  LensAlias: string;
  LensVersion?: string;
  IsMajorVersion?: boolean;
  ClientRequestToken?: string;
}
export const CreateLensVersionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LensAlias: S.String.pipe(T.HttpLabel("LensAlias")),
    LensVersion: S.optional(S.String),
    IsMajorVersion: S.optional(S.Boolean),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/lenses/{LensAlias}/versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateLensVersionInput",
}) as any as S.Schema<CreateLensVersionInput>;
export type LensArn = string;
export interface CreateLensVersionOutput {
  LensArn?: string;
  LensVersion?: string;
}
export const CreateLensVersionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LensArn: S.optional(S.String),
    LensVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateLensVersionOutput",
}) as any as S.Schema<CreateLensVersionOutput>;
export type MilestoneName = string;
export interface CreateMilestoneInput {
  WorkloadId: string;
  MilestoneName?: string;
  ClientRequestToken?: string;
}
export const CreateMilestoneInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")),
    MilestoneName: S.optional(S.String),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/workloads/{WorkloadId}/milestones" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMilestoneInput",
}) as any as S.Schema<CreateMilestoneInput>;
export type MilestoneNumber = number;
export interface CreateMilestoneOutput {
  WorkloadId?: string;
  MilestoneNumber?: number;
}
export const CreateMilestoneOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.optional(S.String),
    MilestoneNumber: S.optional(S.Number),
  }),
).annotate({
  identifier: "CreateMilestoneOutput",
}) as any as S.Schema<CreateMilestoneOutput>;
export type ProfileName = string;
export type ProfileDescription = string;
export type QuestionId = string;
export type ChoiceId = string;
export type SelectedProfileChoiceIds = string[];
export const SelectedProfileChoiceIds = /*@__PURE__*/ S.Array(S.String);
export interface ProfileQuestionUpdate {
  QuestionId?: string;
  SelectedChoiceIds?: string[];
}
export const ProfileQuestionUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QuestionId: S.optional(S.String),
    SelectedChoiceIds: S.optional(SelectedProfileChoiceIds),
  }),
).annotate({
  identifier: "ProfileQuestionUpdate",
}) as any as S.Schema<ProfileQuestionUpdate>;
export type ProfileQuestionUpdates = ProfileQuestionUpdate[];
export const ProfileQuestionUpdates = /*@__PURE__*/ S.Array(
  ProfileQuestionUpdate,
);
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateProfileInput {
  ProfileName?: string;
  ProfileDescription?: string;
  ProfileQuestions?: ProfileQuestionUpdate[];
  ClientRequestToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateProfileInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileName: S.optional(S.String),
    ProfileDescription: S.optional(S.String),
    ProfileQuestions: S.optional(ProfileQuestionUpdates),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/profiles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateProfileInput",
}) as any as S.Schema<CreateProfileInput>;
export type ProfileVersion = string;
export interface CreateProfileOutput {
  ProfileArn?: string;
  ProfileVersion?: string;
}
export const CreateProfileOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileArn: S.optional(S.String),
    ProfileVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateProfileOutput",
}) as any as S.Schema<CreateProfileOutput>;
export interface CreateProfileShareInput {
  ProfileArn: string;
  SharedWith?: string;
  ClientRequestToken?: string;
}
export const CreateProfileShareInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileArn: S.String.pipe(T.HttpLabel("ProfileArn")),
    SharedWith: S.optional(S.String),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/profiles/{ProfileArn}/shares" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateProfileShareInput",
}) as any as S.Schema<CreateProfileShareInput>;
export interface CreateProfileShareOutput {
  ShareId?: string;
  ProfileArn?: string;
}
export const CreateProfileShareOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ShareId: S.optional(S.String), ProfileArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateProfileShareOutput",
}) as any as S.Schema<CreateProfileShareOutput>;
export type TemplateName = string;
export type TemplateDescription = string;
export type ReviewTemplateLenses = string[];
export const ReviewTemplateLenses = /*@__PURE__*/ S.Array(S.String);
export type Notes = string;
export interface CreateReviewTemplateInput {
  TemplateName?: string;
  Description?: string;
  Lenses?: string[];
  Notes?: string;
  Tags?: { [key: string]: string | undefined };
  ClientRequestToken?: string;
}
export const CreateReviewTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateName: S.optional(S.String),
    Description: S.optional(S.String),
    Lenses: S.optional(ReviewTemplateLenses),
    Notes: S.optional(S.String),
    Tags: S.optional(TagMap),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/reviewTemplates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateReviewTemplateInput",
}) as any as S.Schema<CreateReviewTemplateInput>;
export type TemplateArn = string;
export interface CreateReviewTemplateOutput {
  TemplateArn?: string;
}
export const CreateReviewTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TemplateArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateReviewTemplateOutput",
}) as any as S.Schema<CreateReviewTemplateOutput>;
export interface CreateTemplateShareInput {
  TemplateArn: string;
  SharedWith?: string;
  ClientRequestToken?: string;
}
export const CreateTemplateShareInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateArn: S.String.pipe(T.HttpLabel("TemplateArn")),
    SharedWith: S.optional(S.String),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/templates/shares/{TemplateArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateTemplateShareInput",
}) as any as S.Schema<CreateTemplateShareInput>;
export interface CreateTemplateShareOutput {
  TemplateArn?: string;
  ShareId?: string;
}
export const CreateTemplateShareOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateArn: S.optional(S.String),
    ShareId: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateTemplateShareOutput",
}) as any as S.Schema<CreateTemplateShareOutput>;
export type WorkloadName = string;
export type WorkloadDescription = string;
export type WorkloadEnvironment =
  | "PRODUCTION"
  | "PREPRODUCTION"
  | (string & {});
export const WorkloadEnvironment = S.String;

export type AwsAccountId = string;
export type WorkloadAccountIds = string[];
export const WorkloadAccountIds = /*@__PURE__*/ S.Array(S.String);
export type AwsRegion = string;
export type WorkloadAwsRegions = string[];
export const WorkloadAwsRegions = /*@__PURE__*/ S.Array(S.String);
export type WorkloadNonAwsRegion = string;
export type WorkloadNonAwsRegions = string[];
export const WorkloadNonAwsRegions = /*@__PURE__*/ S.Array(S.String);
export type PillarId = string;
export type WorkloadPillarPriorities = string[];
export const WorkloadPillarPriorities = /*@__PURE__*/ S.Array(S.String);
export type WorkloadArchitecturalDesign = string;
export type WorkloadReviewOwner = string;
export type WorkloadIndustryType = string;
export type WorkloadIndustry = string;
export type WorkloadLenses = string[];
export const WorkloadLenses = /*@__PURE__*/ S.Array(S.String);
export type TrustedAdvisorIntegrationStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const TrustedAdvisorIntegrationStatus = S.String;

export type DefinitionType =
  | "WORKLOAD_METADATA"
  | "APP_REGISTRY"
  | (string & {});
export const DefinitionType = S.String;

export type WorkloadResourceDefinition = DefinitionType[];
export const WorkloadResourceDefinition = /*@__PURE__*/ S.Array(DefinitionType);
export interface WorkloadDiscoveryConfig {
  TrustedAdvisorIntegrationStatus?: TrustedAdvisorIntegrationStatus;
  WorkloadResourceDefinition?: DefinitionType[];
}
export const WorkloadDiscoveryConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrustedAdvisorIntegrationStatus: S.optional(
      TrustedAdvisorIntegrationStatus,
    ),
    WorkloadResourceDefinition: S.optional(WorkloadResourceDefinition),
  }),
).annotate({
  identifier: "WorkloadDiscoveryConfig",
}) as any as S.Schema<WorkloadDiscoveryConfig>;
export type ApplicationArn = string;
export type WorkloadApplications = string[];
export const WorkloadApplications = /*@__PURE__*/ S.Array(S.String);
export type WorkloadProfileArns = string[];
export const WorkloadProfileArns = /*@__PURE__*/ S.Array(S.String);
export type ReviewTemplateArns = string[];
export const ReviewTemplateArns = /*@__PURE__*/ S.Array(S.String);
export type WorkloadIssueManagementStatus =
  | "ENABLED"
  | "DISABLED"
  | "INHERIT"
  | (string & {});
export const WorkloadIssueManagementStatus = S.String;

export type IssueManagementType = "AUTO" | "MANUAL" | (string & {});
export const IssueManagementType = S.String;

export type JiraProjectKey = string;
export interface WorkloadJiraConfigurationInput {
  IssueManagementStatus?: WorkloadIssueManagementStatus;
  IssueManagementType?: IssueManagementType;
  JiraProjectKey?: string;
}
export const WorkloadJiraConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IssueManagementStatus: S.optional(WorkloadIssueManagementStatus),
    IssueManagementType: S.optional(IssueManagementType),
    JiraProjectKey: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkloadJiraConfigurationInput",
}) as any as S.Schema<WorkloadJiraConfigurationInput>;
export interface CreateWorkloadInput {
  WorkloadName?: string;
  Description?: string;
  Environment?: WorkloadEnvironment;
  AccountIds?: string[];
  AwsRegions?: string[];
  NonAwsRegions?: string[];
  PillarPriorities?: string[];
  ArchitecturalDesign?: string;
  ReviewOwner?: string;
  IndustryType?: string;
  Industry?: string;
  Lenses?: string[];
  Notes?: string;
  ClientRequestToken?: string;
  Tags?: { [key: string]: string | undefined };
  DiscoveryConfig?: WorkloadDiscoveryConfig;
  Applications?: string[];
  ProfileArns?: string[];
  ReviewTemplateArns?: string[];
  JiraConfiguration?: WorkloadJiraConfigurationInput;
}
export const CreateWorkloadInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadName: S.optional(S.String),
    Description: S.optional(S.String),
    Environment: S.optional(WorkloadEnvironment),
    AccountIds: S.optional(WorkloadAccountIds),
    AwsRegions: S.optional(WorkloadAwsRegions),
    NonAwsRegions: S.optional(WorkloadNonAwsRegions),
    PillarPriorities: S.optional(WorkloadPillarPriorities),
    ArchitecturalDesign: S.optional(S.String),
    ReviewOwner: S.optional(S.String),
    IndustryType: S.optional(S.String),
    Industry: S.optional(S.String),
    Lenses: S.optional(WorkloadLenses),
    Notes: S.optional(S.String),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagMap),
    DiscoveryConfig: S.optional(WorkloadDiscoveryConfig),
    Applications: S.optional(WorkloadApplications),
    ProfileArns: S.optional(WorkloadProfileArns),
    ReviewTemplateArns: S.optional(ReviewTemplateArns),
    JiraConfiguration: S.optional(WorkloadJiraConfigurationInput),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/workloads" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateWorkloadInput",
}) as any as S.Schema<CreateWorkloadInput>;
export type WorkloadArn = string;
export interface CreateWorkloadOutput {
  WorkloadId?: string;
  WorkloadArn?: string;
}
export const CreateWorkloadOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.optional(S.String),
    WorkloadArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateWorkloadOutput",
}) as any as S.Schema<CreateWorkloadOutput>;
export type PermissionType = "READONLY" | "CONTRIBUTOR" | (string & {});
export const PermissionType = S.String;

export interface CreateWorkloadShareInput {
  WorkloadId: string;
  SharedWith?: string;
  PermissionType?: PermissionType;
  ClientRequestToken?: string;
}
export const CreateWorkloadShareInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")),
    SharedWith: S.optional(S.String),
    PermissionType: S.optional(PermissionType),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/workloads/{WorkloadId}/shares" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateWorkloadShareInput",
}) as any as S.Schema<CreateWorkloadShareInput>;
export interface CreateWorkloadShareOutput {
  WorkloadId?: string;
  ShareId?: string;
}
export const CreateWorkloadShareOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WorkloadId: S.optional(S.String), ShareId: S.optional(S.String) }),
).annotate({
  identifier: "CreateWorkloadShareOutput",
}) as any as S.Schema<CreateWorkloadShareOutput>;
export interface DeleteAgentContextRequest {
  profileArn: string;
  id: string;
}
export const DeleteAgentContextRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileArn: S.String.pipe(T.HttpLabel("profileArn")),
    id: S.String.pipe(T.HttpLabel("id")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/api/v1/agent-profiles/{profileArn}/contexts/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAgentContextRequest",
}) as any as S.Schema<DeleteAgentContextRequest>;
export interface DeleteAgentContextResponse {}
export const DeleteAgentContextResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAgentContextResponse",
}) as any as S.Schema<DeleteAgentContextResponse>;
export interface DeleteAgentGoalRequest {
  profileArn: string;
  id: string;
}
export const DeleteAgentGoalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileArn: S.String.pipe(T.HttpLabel("profileArn")),
    id: S.String.pipe(T.HttpLabel("id")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/api/v1/agent-profiles/{profileArn}/goals/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAgentGoalRequest",
}) as any as S.Schema<DeleteAgentGoalRequest>;
export interface DeleteAgentGoalResponse {}
export const DeleteAgentGoalResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAgentGoalResponse",
}) as any as S.Schema<DeleteAgentGoalResponse>;
export interface DeleteAgentProfileRequest {
  profileArn: string;
}
export const DeleteAgentProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ profileArn: S.String.pipe(T.HttpLabel("profileArn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/api/v1/agent-profiles/{profileArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAgentProfileRequest",
}) as any as S.Schema<DeleteAgentProfileRequest>;
export interface DeleteAgentProfileResponse {}
export const DeleteAgentProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAgentProfileResponse",
}) as any as S.Schema<DeleteAgentProfileResponse>;
export type LensStatusType = "ALL" | "DRAFT" | "PUBLISHED" | (string & {});
export const LensStatusType = S.String;

export interface DeleteLensInput {
  LensAlias: string;
  ClientRequestToken?: string;
  LensStatus?: LensStatusType;
}
export const DeleteLensInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LensAlias: S.String.pipe(T.HttpLabel("LensAlias")),
    ClientRequestToken: S.optional(S.String).pipe(
      T.HttpQuery("ClientRequestToken"),
      T.IdempotencyToken(),
    ),
    LensStatus: S.optional(LensStatusType).pipe(T.HttpQuery("LensStatus")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/lenses/{LensAlias}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLensInput",
}) as any as S.Schema<DeleteLensInput>;
export interface DeleteLensResponse {}
export const DeleteLensResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteLensResponse",
}) as any as S.Schema<DeleteLensResponse>;
export interface DeleteLensShareInput {
  ShareId: string;
  LensAlias: string;
  ClientRequestToken?: string;
}
export const DeleteLensShareInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ShareId: S.String.pipe(T.HttpLabel("ShareId")),
    LensAlias: S.String.pipe(T.HttpLabel("LensAlias")),
    ClientRequestToken: S.optional(S.String).pipe(
      T.HttpQuery("ClientRequestToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/lenses/{LensAlias}/shares/{ShareId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLensShareInput",
}) as any as S.Schema<DeleteLensShareInput>;
export interface DeleteLensShareResponse {}
export const DeleteLensShareResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteLensShareResponse",
}) as any as S.Schema<DeleteLensShareResponse>;
export interface DeleteProfileInput {
  ProfileArn: string;
  ClientRequestToken?: string;
}
export const DeleteProfileInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileArn: S.String.pipe(T.HttpLabel("ProfileArn")),
    ClientRequestToken: S.optional(S.String).pipe(
      T.HttpQuery("ClientRequestToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/profiles/{ProfileArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteProfileInput",
}) as any as S.Schema<DeleteProfileInput>;
export interface DeleteProfileResponse {}
export const DeleteProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteProfileResponse",
}) as any as S.Schema<DeleteProfileResponse>;
export interface DeleteProfileShareInput {
  ShareId: string;
  ProfileArn: string;
  ClientRequestToken?: string;
}
export const DeleteProfileShareInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ShareId: S.String.pipe(T.HttpLabel("ShareId")),
    ProfileArn: S.String.pipe(T.HttpLabel("ProfileArn")),
    ClientRequestToken: S.optional(S.String).pipe(
      T.HttpQuery("ClientRequestToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/profiles/{ProfileArn}/shares/{ShareId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteProfileShareInput",
}) as any as S.Schema<DeleteProfileShareInput>;
export interface DeleteProfileShareResponse {}
export const DeleteProfileShareResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteProfileShareResponse",
}) as any as S.Schema<DeleteProfileShareResponse>;
export interface DeleteReviewTemplateInput {
  TemplateArn: string;
  ClientRequestToken?: string;
}
export const DeleteReviewTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateArn: S.String.pipe(T.HttpLabel("TemplateArn")),
    ClientRequestToken: S.optional(S.String).pipe(
      T.HttpQuery("ClientRequestToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/reviewTemplates/{TemplateArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteReviewTemplateInput",
}) as any as S.Schema<DeleteReviewTemplateInput>;
export interface DeleteReviewTemplateResponse {}
export const DeleteReviewTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteReviewTemplateResponse",
}) as any as S.Schema<DeleteReviewTemplateResponse>;
export interface DeleteTemplateShareInput {
  ShareId: string;
  TemplateArn: string;
  ClientRequestToken?: string;
}
export const DeleteTemplateShareInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ShareId: S.String.pipe(T.HttpLabel("ShareId")),
    TemplateArn: S.String.pipe(T.HttpLabel("TemplateArn")),
    ClientRequestToken: S.optional(S.String).pipe(
      T.HttpQuery("ClientRequestToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/templates/shares/{TemplateArn}/{ShareId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTemplateShareInput",
}) as any as S.Schema<DeleteTemplateShareInput>;
export interface DeleteTemplateShareResponse {}
export const DeleteTemplateShareResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTemplateShareResponse",
}) as any as S.Schema<DeleteTemplateShareResponse>;
export interface DeleteWorkloadInput {
  WorkloadId: string;
  ClientRequestToken?: string;
}
export const DeleteWorkloadInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")),
    ClientRequestToken: S.optional(S.String).pipe(
      T.HttpQuery("ClientRequestToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/workloads/{WorkloadId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteWorkloadInput",
}) as any as S.Schema<DeleteWorkloadInput>;
export interface DeleteWorkloadResponse {}
export const DeleteWorkloadResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteWorkloadResponse",
}) as any as S.Schema<DeleteWorkloadResponse>;
export interface DeleteWorkloadShareInput {
  ShareId: string;
  WorkloadId: string;
  ClientRequestToken?: string;
}
export const DeleteWorkloadShareInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ShareId: S.String.pipe(T.HttpLabel("ShareId")),
    WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")),
    ClientRequestToken: S.optional(S.String).pipe(
      T.HttpQuery("ClientRequestToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/workloads/{WorkloadId}/shares/{ShareId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteWorkloadShareInput",
}) as any as S.Schema<DeleteWorkloadShareInput>;
export interface DeleteWorkloadShareResponse {}
export const DeleteWorkloadShareResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteWorkloadShareResponse",
}) as any as S.Schema<DeleteWorkloadShareResponse>;
export interface DisassociateLensesInput {
  WorkloadId: string;
  LensAliases?: string[];
}
export const DisassociateLensesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")),
    LensAliases: S.optional(LensAliases),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/workloads/{WorkloadId}/disassociateLenses",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateLensesInput",
}) as any as S.Schema<DisassociateLensesInput>;
export interface DisassociateLensesResponse {}
export const DisassociateLensesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateLensesResponse",
}) as any as S.Schema<DisassociateLensesResponse>;
export interface DisassociateProfilesInput {
  WorkloadId: string;
  ProfileArns?: string[];
}
export const DisassociateProfilesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")),
    ProfileArns: S.optional(ProfileArns),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/workloads/{WorkloadId}/disassociateProfiles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateProfilesInput",
}) as any as S.Schema<DisassociateProfilesInput>;
export interface DisassociateProfilesResponse {}
export const DisassociateProfilesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateProfilesResponse",
}) as any as S.Schema<DisassociateProfilesResponse>;
export interface ExportLensInput {
  LensAlias: string;
  LensVersion?: string;
}
export const ExportLensInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LensAlias: S.String.pipe(T.HttpLabel("LensAlias")),
    LensVersion: S.optional(S.String).pipe(T.HttpQuery("LensVersion")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/lenses/{LensAlias}/export" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ExportLensInput",
}) as any as S.Schema<ExportLensInput>;
export type LensJSON = string;
export interface ExportLensOutput {
  LensJSON?: string;
}
export const ExportLensOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LensJSON: S.optional(S.String) }),
).annotate({
  identifier: "ExportLensOutput",
}) as any as S.Schema<ExportLensOutput>;
export interface GetAgentContextRequest {
  profileArn: string;
  id: string;
}
export const GetAgentContextRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileArn: S.String.pipe(T.HttpLabel("profileArn")),
    id: S.String.pipe(T.HttpLabel("id")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/api/v1/agent-profiles/{profileArn}/contexts/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAgentContextRequest",
}) as any as S.Schema<GetAgentContextRequest>;
export interface GetAgentContextResponse {
  context: ContextSummary;
}
export const GetAgentContextResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ context: ContextSummary }),
).annotate({
  identifier: "GetAgentContextResponse",
}) as any as S.Schema<GetAgentContextResponse>;
export interface GetAgentGoalRequest {
  profileArn: string;
  id: string;
}
export const GetAgentGoalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileArn: S.String.pipe(T.HttpLabel("profileArn")),
    id: S.String.pipe(T.HttpLabel("id")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/api/v1/agent-profiles/{profileArn}/goals/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAgentGoalRequest",
}) as any as S.Schema<GetAgentGoalRequest>;
export interface GetAgentGoalResponse {
  goal: GoalSummary;
}
export const GetAgentGoalResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ goal: GoalSummary }),
).annotate({
  identifier: "GetAgentGoalResponse",
}) as any as S.Schema<GetAgentGoalResponse>;
export interface GetAgentProfileRequest {
  profileArn: string;
}
export const GetAgentProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ profileArn: S.String.pipe(T.HttpLabel("profileArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/api/v1/agent-profiles/{profileArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAgentProfileRequest",
}) as any as S.Schema<GetAgentProfileRequest>;
export interface GetAgentProfileResponse {
  name: string;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  businessOverview?: string | redacted.Redacted<string>;
  pillars: Pillar[];
  deletionProtection?: boolean;
  executionRoleArn: string;
  aggregationConfiguration: AggregationConfiguration[];
  arn: string;
  eligibleForScheduledGeneration?: boolean;
  eligibleForArchitectureGeneration?: boolean;
  fieldErrors?: { [key: string]: string | undefined };
  tags?: Tag[];
  createdBy: string;
  createdAt: Date;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
}
export const GetAgentProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    displayName: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    businessOverview: S.optional(SensitiveString),
    pillars: Pillars,
    deletionProtection: S.optional(S.Boolean),
    executionRoleArn: S.String,
    aggregationConfiguration: AggregationConfigurations,
    arn: S.String,
    eligibleForScheduledGeneration: S.optional(S.Boolean),
    eligibleForArchitectureGeneration: S.optional(S.Boolean),
    fieldErrors: S.optional(FieldErrors),
    tags: S.optional(Tags),
    createdBy: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModifiedBy: S.optional(S.String),
    lastModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetAgentProfileResponse",
}) as any as S.Schema<GetAgentProfileResponse>;
export type AgentRecommendationArn = string;
export type RemediationType =
  | "AUTO_REMEDIATION"
  | "CONSOLE"
  | "CLI"
  | "SDK"
  | "IAC"
  | "MCP"
  | (string & {});
export const RemediationType = S.String;

export interface GetAgentRecommendationRequest {
  recommendationArn: string;
  remediationType?: RemediationType;
}
export const GetAgentRecommendationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendationArn: S.String.pipe(T.HttpLabel("recommendationArn")),
    remediationType: S.optional(RemediationType).pipe(
      T.HttpQuery("remediationType"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/api/v1/agent-recommendations/{recommendationArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAgentRecommendationRequest",
}) as any as S.Schema<GetAgentRecommendationRequest>;
export type RecommendationArn = string;
export type RecommendationType =
  | "RESOURCE"
  | "ARCHITECTURE"
  | "APPLICATION"
  | (string & {});
export const RecommendationType = S.String;

export type Priority = "HIGH" | "MEDIUM" | "LOW" | (string & {});
export const Priority = S.String;

export type Effort = "LARGE" | "MEDIUM" | "SMALL" | (string & {});
export const Effort = S.String;

export type RecommendationStatus =
  | "ACTIVE"
  | "SUPPRESSED"
  | "COMPLETED"
  | (string & {});
export const RecommendationStatus = S.String;

export type RecommendationState = "OPEN" | "CLOSED" | (string & {});
export const RecommendationState = S.String;

export type ImpactCategory = "HIGH" | "MEDIUM" | "LOW" | (string & {});
export const ImpactCategory = S.String;

export interface Roi {
  estimate?: string;
  detail: string;
}
export const Roi = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ estimate: S.optional(S.String), detail: S.String }),
).annotate({ identifier: "Roi" }) as any as S.Schema<Roi>;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export type ImpactDetail = string;
export type ImpactDetails = string[];
export const ImpactDetails = /*@__PURE__*/ S.Array(S.String);
export interface Insight {
  usagePattern: string;
  signalsDetected?: string;
}
export const Insight = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ usagePattern: S.String, signalsDetected: S.optional(S.String) }),
).annotate({ identifier: "Insight" }) as any as S.Schema<Insight>;
export type InsightList = Insight[];
export const InsightList = /*@__PURE__*/ S.Array(Insight);
export type Highlight = string;
export type Highlights = string[];
export const Highlights = /*@__PURE__*/ S.Array(S.String);
export type RecommendedFixStep = string;
export type RecommendedFixSteps = string[];
export const RecommendedFixSteps = /*@__PURE__*/ S.Array(S.String);
export interface RemediationSummary {
  recommendation: string;
  steps: string[];
}
export const RemediationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ recommendation: S.String, steps: RecommendedFixSteps }),
).annotate({
  identifier: "RemediationSummary",
}) as any as S.Schema<RemediationSummary>;
export interface CrossPillarBenefit {
  pillar: Pillar;
  title: string;
  description: string;
  impact: ImpactCategory;
}
export const CrossPillarBenefit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pillar: Pillar,
    title: S.String,
    description: S.String,
    impact: ImpactCategory,
  }),
).annotate({
  identifier: "CrossPillarBenefit",
}) as any as S.Schema<CrossPillarBenefit>;
export type CrossPillarBenefits = CrossPillarBenefit[];
export const CrossPillarBenefits = /*@__PURE__*/ S.Array(CrossPillarBenefit);
export type RiskRating = "LOW" | "MEDIUM" | "HIGH" | (string & {});
export const RiskRating = S.String;

export interface TradeOff {
  pillar: Pillar;
  title: string;
  description: string;
  risk: RiskRating;
  mitigation: string;
  riskExplanation?: string;
}
export const TradeOff = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pillar: Pillar,
    title: S.String,
    description: S.String,
    risk: RiskRating,
    mitigation: S.String,
    riskExplanation: S.optional(S.String),
  }),
).annotate({ identifier: "TradeOff" }) as any as S.Schema<TradeOff>;
export type TradeOffs = TradeOff[];
export const TradeOffs = /*@__PURE__*/ S.Array(TradeOff);
export type RecommendationSource =
  | "TRUSTED_ADVISOR"
  | "COST_EXPLORER"
  | "CLOUDWATCH"
  | "WELL_ARCHITECTED_TOOL"
  | "WELL_ARCHITECTED_AGENT"
  | "CUSTOMER_IAC"
  | (string & {});
export const RecommendationSource = S.String;

export type RecommendationSourceList = RecommendationSource[];
export const RecommendationSourceList =
  /*@__PURE__*/ S.Array(RecommendationSource);
export interface RecommendationGoal {
  title: string;
}
export const RecommendationGoal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ title: S.String }),
).annotate({
  identifier: "RecommendationGoal",
}) as any as S.Schema<RecommendationGoal>;
export type RecommendationGoals = RecommendationGoal[];
export const RecommendationGoals = /*@__PURE__*/ S.Array(RecommendationGoal);
export interface RemediationStep {
  title?: string | redacted.Redacted<string>;
  content: string | redacted.Redacted<string>;
}
export const RemediationStep = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ title: S.optional(SensitiveString), content: SensitiveString }),
).annotate({
  identifier: "RemediationStep",
}) as any as S.Schema<RemediationStep>;
export type RemediationSteps = RemediationStep[];
export const RemediationSteps = /*@__PURE__*/ S.Array(RemediationStep);
export interface ResourceLink {
  url: string;
  title?: string;
}
export const ResourceLink = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ url: S.String, title: S.optional(S.String) }),
).annotate({ identifier: "ResourceLink" }) as any as S.Schema<ResourceLink>;
export type ResourceLinks = ResourceLink[];
export const ResourceLinks = /*@__PURE__*/ S.Array(ResourceLink);
export interface AgentRecommendationRemediation {
  recommendationArn: string;
  type: RemediationType;
  steps: RemediationStep[];
  resourceLinks?: ResourceLink[];
  createdBy: string;
  createdAt: Date;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
}
export const AgentRecommendationRemediation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendationArn: S.String,
    type: RemediationType,
    steps: RemediationSteps,
    resourceLinks: S.optional(ResourceLinks),
    createdBy: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModifiedBy: S.optional(S.String),
    lastModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "AgentRecommendationRemediation",
}) as any as S.Schema<AgentRecommendationRemediation>;
export type AgentRecommendationRemediations = AgentRecommendationRemediation[];
export const AgentRecommendationRemediations = /*@__PURE__*/ S.Array(
  AgentRecommendationRemediation,
);
export interface GetAgentRecommendationResponse {
  recommendationArn: string;
  profileArn: string;
  title: string | redacted.Redacted<string>;
  description: string | redacted.Redacted<string>;
  type: RecommendationType;
  pillar: Pillar;
  priority: Priority;
  effort: Effort;
  status: RecommendationStatus;
  state: RecommendationState;
  updateReason?: string | redacted.Redacted<string>;
  impact: ImpactCategory;
  roi: Roi;
  numberOfResources?: number;
  awsServices?: string[];
  businessUnits?: string[];
  applications?: string[];
  impactDetails: string[];
  insights: Insight[];
  highlights: string[];
  remediationSummary: RemediationSummary;
  crossPillarBenefits?: CrossPillarBenefit[];
  tradeOffs?: TradeOff[];
  sources?: RecommendationSource[];
  goals?: RecommendationGoal[];
  tags?: Tag[];
  createdBy: string;
  createdAt: Date;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
  remediations?: AgentRecommendationRemediation[];
}
export const GetAgentRecommendationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendationArn: S.String,
    profileArn: S.String,
    title: SensitiveString,
    description: SensitiveString,
    type: RecommendationType,
    pillar: Pillar,
    priority: Priority,
    effort: Effort,
    status: RecommendationStatus,
    state: RecommendationState,
    updateReason: S.optional(SensitiveString),
    impact: ImpactCategory,
    roi: Roi,
    numberOfResources: S.optional(S.Number),
    awsServices: S.optional(StringList),
    businessUnits: S.optional(StringList),
    applications: S.optional(StringList),
    impactDetails: ImpactDetails,
    insights: InsightList,
    highlights: Highlights,
    remediationSummary: RemediationSummary,
    crossPillarBenefits: S.optional(CrossPillarBenefits),
    tradeOffs: S.optional(TradeOffs),
    sources: S.optional(RecommendationSourceList),
    goals: S.optional(RecommendationGoals),
    tags: S.optional(Tags),
    createdBy: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModifiedBy: S.optional(S.String),
    lastModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    remediations: S.optional(AgentRecommendationRemediations),
  }),
).annotate({
  identifier: "GetAgentRecommendationResponse",
}) as any as S.Schema<GetAgentRecommendationResponse>;
export interface GetAgentRecommendationGenerationRequest {
  profileArn: string;
  generationId: string;
}
export const GetAgentRecommendationGenerationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      profileArn: S.String.pipe(T.HttpLabel("profileArn")),
      generationId: S.String.pipe(T.HttpLabel("generationId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/api/v1/agent-profiles/{profileArn}/generations/{generationId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetAgentRecommendationGenerationRequest",
}) as any as S.Schema<GetAgentRecommendationGenerationRequest>;
export type GenerationStatus =
  | "QUEUED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ERROR"
  | (string & {});
export const GenerationStatus = S.String;

export type GoalIdList = string[];
export const GoalIdList = /*@__PURE__*/ S.Array(S.String);
export type ItemId = string;
export type ItemIds = string[];
export const ItemIds = /*@__PURE__*/ S.Array(S.String);
export interface PillarItem {
  pillar: Pillar;
  ids: string[];
}
export const PillarItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pillar: Pillar, ids: ItemIds }),
).annotate({ identifier: "PillarItem" }) as any as S.Schema<PillarItem>;
export type PillarItems = PillarItem[];
export const PillarItems = /*@__PURE__*/ S.Array(PillarItem);
export interface Scope {
  pillars: Pillar[];
  goalIds?: string[];
  items?: PillarItem[];
}
export const Scope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pillars: Pillars,
    goalIds: S.optional(GoalIdList),
    items: S.optional(PillarItems),
  }),
).annotate({ identifier: "Scope" }) as any as S.Schema<Scope>;
export interface Progress {
  stepsCompleted: number;
  totalSteps: number;
  completionPercentage: number;
}
export const Progress = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stepsCompleted: S.Number,
    totalSteps: S.Number,
    completionPercentage: S.Number,
  }),
).annotate({ identifier: "Progress" }) as any as S.Schema<Progress>;
export interface ErrorDetails {
  code: string;
  message: string;
}
export const ErrorDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ code: S.String, message: S.String }),
).annotate({ identifier: "ErrorDetails" }) as any as S.Schema<ErrorDetails>;
export interface GetAgentRecommendationGenerationResponse {
  id: string;
  profileArn: string;
  name?: string;
  status: GenerationStatus;
  estimatedCompletionTime?: Date;
  createdBy: string;
  createdAt: Date;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
  additionalContext?: any;
  scope?: Scope;
  startedAt?: Date;
  endedAt?: Date;
  progress?: Progress;
  errorDetails?: ErrorDetails;
}
export const GetAgentRecommendationGenerationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      id: S.String,
      profileArn: S.String,
      name: S.optional(S.String),
      status: GenerationStatus,
      estimatedCompletionTime: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      createdBy: S.String,
      createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      lastModifiedBy: S.optional(S.String),
      lastModifiedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      additionalContext: S.optional(S.Any),
      scope: S.optional(Scope),
      startedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      endedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      progress: S.optional(Progress),
      errorDetails: S.optional(ErrorDetails),
    }),
).annotate({
  identifier: "GetAgentRecommendationGenerationResponse",
}) as any as S.Schema<GetAgentRecommendationGenerationResponse>;
export interface GetAnswerInput {
  WorkloadId: string;
  LensAlias: string;
  QuestionId: string;
  MilestoneNumber?: number;
}
export const GetAnswerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")),
    LensAlias: S.String.pipe(T.HttpLabel("LensAlias")),
    QuestionId: S.String.pipe(T.HttpLabel("QuestionId")),
    MilestoneNumber: S.optional(S.Number).pipe(T.HttpQuery("MilestoneNumber")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/workloads/{WorkloadId}/lensReviews/{LensAlias}/answers/{QuestionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetAnswerInput" }) as any as S.Schema<GetAnswerInput>;
export type QuestionTitle = string;
export type QuestionDescription = string;
export type ImprovementPlanUrl = string;
export type HelpfulResourceUrl = string;
export type DisplayText = string;
export type ChoiceTitle = string;
export type ChoiceDescription = string;
export type ChoiceContentDisplayText = string;
export type ChoiceContentUrl = string;
export interface ChoiceContent {
  DisplayText?: string;
  Url?: string;
}
export const ChoiceContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DisplayText: S.optional(S.String), Url: S.optional(S.String) }),
).annotate({ identifier: "ChoiceContent" }) as any as S.Schema<ChoiceContent>;
export type AdditionalResourceType =
  | "HELPFUL_RESOURCE"
  | "IMPROVEMENT_PLAN"
  | (string & {});
export const AdditionalResourceType = S.String;

export type Urls = ChoiceContent[];
export const Urls = /*@__PURE__*/ S.Array(ChoiceContent);
export interface AdditionalResources {
  Type?: AdditionalResourceType;
  Content?: ChoiceContent[];
}
export const AdditionalResources = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(AdditionalResourceType),
    Content: S.optional(Urls),
  }),
).annotate({
  identifier: "AdditionalResources",
}) as any as S.Schema<AdditionalResources>;
export type AdditionalResourcesList = AdditionalResources[];
export const AdditionalResourcesList =
  /*@__PURE__*/ S.Array(AdditionalResources);
export interface Choice {
  ChoiceId?: string;
  Title?: string;
  Description?: string;
  HelpfulResource?: ChoiceContent;
  ImprovementPlan?: ChoiceContent;
  AdditionalResources?: AdditionalResources[];
}
export const Choice = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChoiceId: S.optional(S.String),
    Title: S.optional(S.String),
    Description: S.optional(S.String),
    HelpfulResource: S.optional(ChoiceContent),
    ImprovementPlan: S.optional(ChoiceContent),
    AdditionalResources: S.optional(AdditionalResourcesList),
  }),
).annotate({ identifier: "Choice" }) as any as S.Schema<Choice>;
export type Choices = Choice[];
export const Choices = /*@__PURE__*/ S.Array(Choice);
export type SelectedChoices = string[];
export const SelectedChoices = /*@__PURE__*/ S.Array(S.String);
export type ChoiceStatus =
  | "SELECTED"
  | "NOT_APPLICABLE"
  | "UNSELECTED"
  | (string & {});
export const ChoiceStatus = S.String;

export type ChoiceReason =
  | "OUT_OF_SCOPE"
  | "BUSINESS_PRIORITIES"
  | "ARCHITECTURE_CONSTRAINTS"
  | "OTHER"
  | "NONE"
  | (string & {});
export const ChoiceReason = S.String;

export type ChoiceNotes = string;
export interface ChoiceAnswer {
  ChoiceId?: string;
  Status?: ChoiceStatus;
  Reason?: ChoiceReason;
  Notes?: string;
}
export const ChoiceAnswer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChoiceId: S.optional(S.String),
    Status: S.optional(ChoiceStatus),
    Reason: S.optional(ChoiceReason),
    Notes: S.optional(S.String),
  }),
).annotate({ identifier: "ChoiceAnswer" }) as any as S.Schema<ChoiceAnswer>;
export type ChoiceAnswers = ChoiceAnswer[];
export const ChoiceAnswers = /*@__PURE__*/ S.Array(ChoiceAnswer);
export type IsApplicable = boolean;
export type Risk =
  | "UNANSWERED"
  | "HIGH"
  | "MEDIUM"
  | "NONE"
  | "NOT_APPLICABLE"
  | (string & {});
export const Risk = S.String;

export type AnswerReason =
  | "OUT_OF_SCOPE"
  | "BUSINESS_PRIORITIES"
  | "ARCHITECTURE_CONSTRAINTS"
  | "OTHER"
  | "NONE"
  | (string & {});
export const AnswerReason = S.String;

export type JiraIssueUrl = string;
export interface JiraConfiguration {
  JiraIssueUrl?: string;
  LastSyncedTime?: Date;
}
export const JiraConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JiraIssueUrl: S.optional(S.String),
    LastSyncedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "JiraConfiguration",
}) as any as S.Schema<JiraConfiguration>;
export interface Answer {
  QuestionId?: string;
  PillarId?: string;
  QuestionTitle?: string;
  QuestionDescription?: string;
  ImprovementPlanUrl?: string;
  HelpfulResourceUrl?: string;
  HelpfulResourceDisplayText?: string;
  Choices?: Choice[];
  SelectedChoices?: string[];
  ChoiceAnswers?: ChoiceAnswer[];
  IsApplicable?: boolean;
  Risk?: Risk;
  Notes?: string;
  Reason?: AnswerReason;
  JiraConfiguration?: JiraConfiguration;
}
export const Answer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QuestionId: S.optional(S.String),
    PillarId: S.optional(S.String),
    QuestionTitle: S.optional(S.String),
    QuestionDescription: S.optional(S.String),
    ImprovementPlanUrl: S.optional(S.String),
    HelpfulResourceUrl: S.optional(S.String),
    HelpfulResourceDisplayText: S.optional(S.String),
    Choices: S.optional(Choices),
    SelectedChoices: S.optional(SelectedChoices),
    ChoiceAnswers: S.optional(ChoiceAnswers),
    IsApplicable: S.optional(S.Boolean),
    Risk: S.optional(Risk),
    Notes: S.optional(S.String),
    Reason: S.optional(AnswerReason),
    JiraConfiguration: S.optional(JiraConfiguration),
  }),
).annotate({ identifier: "Answer" }) as any as S.Schema<Answer>;
export interface GetAnswerOutput {
  WorkloadId?: string;
  MilestoneNumber?: number;
  LensAlias?: string;
  LensArn?: string;
  Answer?: Answer;
}
export const GetAnswerOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.optional(S.String),
    MilestoneNumber: S.optional(S.Number),
    LensAlias: S.optional(S.String),
    LensArn: S.optional(S.String),
    Answer: S.optional(Answer),
  }),
).annotate({
  identifier: "GetAnswerOutput",
}) as any as S.Schema<GetAnswerOutput>;
export type ReportFormat = "PDF" | "JSON" | (string & {});
export const ReportFormat = S.String;

export type IncludeSharedResources = boolean;
export type NextToken = string;
export type MaxResults = number;
export interface GetConsolidatedReportInput {
  Format?: ReportFormat;
  IncludeSharedResources?: boolean;
  NextToken?: string;
  MaxResults?: number;
}
export const GetConsolidatedReportInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Format: S.optional(ReportFormat).pipe(T.HttpQuery("Format")),
    IncludeSharedResources: S.optional(S.Boolean).pipe(
      T.HttpQuery("IncludeSharedResources"),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/consolidatedReport" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConsolidatedReportInput",
}) as any as S.Schema<GetConsolidatedReportInput>;
export type MetricType = "WORKLOAD" | (string & {});
export const MetricType = S.String;

export type Count = number;
export type RiskCounts = { [key in Risk]?: number };
export const RiskCounts = /*@__PURE__*/ S.Record(
  Risk,
  S.Number.pipe(S.optional),
);
export interface BestPractice {
  ChoiceId?: string;
  ChoiceTitle?: string;
}
export const BestPractice = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChoiceId: S.optional(S.String),
    ChoiceTitle: S.optional(S.String),
  }),
).annotate({ identifier: "BestPractice" }) as any as S.Schema<BestPractice>;
export type BestPractices = BestPractice[];
export const BestPractices = /*@__PURE__*/ S.Array(BestPractice);
export interface QuestionMetric {
  QuestionId?: string;
  Risk?: Risk;
  BestPractices?: BestPractice[];
}
export const QuestionMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QuestionId: S.optional(S.String),
    Risk: S.optional(Risk),
    BestPractices: S.optional(BestPractices),
  }),
).annotate({ identifier: "QuestionMetric" }) as any as S.Schema<QuestionMetric>;
export type QuestionMetrics = QuestionMetric[];
export const QuestionMetrics = /*@__PURE__*/ S.Array(QuestionMetric);
export interface PillarMetric {
  PillarId?: string;
  RiskCounts?: { [key: string]: number | undefined };
  Questions?: QuestionMetric[];
}
export const PillarMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PillarId: S.optional(S.String),
    RiskCounts: S.optional(RiskCounts),
    Questions: S.optional(QuestionMetrics),
  }),
).annotate({ identifier: "PillarMetric" }) as any as S.Schema<PillarMetric>;
export type PillarMetrics = PillarMetric[];
export const PillarMetrics = /*@__PURE__*/ S.Array(PillarMetric);
export interface LensMetric {
  LensArn?: string;
  Pillars?: PillarMetric[];
  RiskCounts?: { [key: string]: number | undefined };
}
export const LensMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LensArn: S.optional(S.String),
    Pillars: S.optional(PillarMetrics),
    RiskCounts: S.optional(RiskCounts),
  }),
).annotate({ identifier: "LensMetric" }) as any as S.Schema<LensMetric>;
export type LensMetrics = LensMetric[];
export const LensMetrics = /*@__PURE__*/ S.Array(LensMetric);
export type LensesAppliedCount = number;
export interface ConsolidatedReportMetric {
  MetricType?: MetricType;
  RiskCounts?: { [key: string]: number | undefined };
  WorkloadId?: string;
  WorkloadName?: string;
  WorkloadArn?: string;
  UpdatedAt?: Date;
  Lenses?: LensMetric[];
  LensesAppliedCount?: number;
}
export const ConsolidatedReportMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetricType: S.optional(MetricType),
    RiskCounts: S.optional(RiskCounts),
    WorkloadId: S.optional(S.String),
    WorkloadName: S.optional(S.String),
    WorkloadArn: S.optional(S.String),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Lenses: S.optional(LensMetrics),
    LensesAppliedCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "ConsolidatedReportMetric",
}) as any as S.Schema<ConsolidatedReportMetric>;
export type ConsolidatedReportMetrics = ConsolidatedReportMetric[];
export const ConsolidatedReportMetrics = /*@__PURE__*/ S.Array(
  ConsolidatedReportMetric,
);
export type Base64String = string;
export interface GetConsolidatedReportOutput {
  Metrics?: ConsolidatedReportMetric[];
  NextToken?: string;
  Base64String?: string;
}
export const GetConsolidatedReportOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Metrics: S.optional(ConsolidatedReportMetrics),
    NextToken: S.optional(S.String),
    Base64String: S.optional(S.String),
  }),
).annotate({
  identifier: "GetConsolidatedReportOutput",
}) as any as S.Schema<GetConsolidatedReportOutput>;
export interface GetGlobalSettingsRequest {}
export const GetGlobalSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/global-settings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGlobalSettingsRequest",
}) as any as S.Schema<GetGlobalSettingsRequest>;
export type OrganizationSharingStatus = "ENABLED" | "DISABLED" | (string & {});
export const OrganizationSharingStatus = S.String;

export type DiscoveryIntegrationStatus = "ENABLED" | "DISABLED" | (string & {});
export const DiscoveryIntegrationStatus = S.String;

export type IntegrationStatus = "CONFIGURED" | "NOT_CONFIGURED" | (string & {});
export const IntegrationStatus = S.String;

export type AccountJiraIssueManagementStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const AccountJiraIssueManagementStatus = S.String;

export type Subdomain = string;
export type StatusMessage = string;
export interface AccountJiraConfigurationOutput {
  IntegrationStatus?: IntegrationStatus;
  IssueManagementStatus?: AccountJiraIssueManagementStatus;
  IssueManagementType?: IssueManagementType;
  Subdomain?: string;
  JiraProjectKey?: string;
  StatusMessage?: string;
}
export const AccountJiraConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IntegrationStatus: S.optional(IntegrationStatus),
    IssueManagementStatus: S.optional(AccountJiraIssueManagementStatus),
    IssueManagementType: S.optional(IssueManagementType),
    Subdomain: S.optional(S.String),
    JiraProjectKey: S.optional(S.String),
    StatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "AccountJiraConfigurationOutput",
}) as any as S.Schema<AccountJiraConfigurationOutput>;
export interface GetGlobalSettingsOutput {
  OrganizationSharingStatus?: OrganizationSharingStatus;
  DiscoveryIntegrationStatus?: DiscoveryIntegrationStatus;
  JiraConfiguration?: AccountJiraConfigurationOutput;
}
export const GetGlobalSettingsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationSharingStatus: S.optional(OrganizationSharingStatus),
    DiscoveryIntegrationStatus: S.optional(DiscoveryIntegrationStatus),
    JiraConfiguration: S.optional(AccountJiraConfigurationOutput),
  }),
).annotate({
  identifier: "GetGlobalSettingsOutput",
}) as any as S.Schema<GetGlobalSettingsOutput>;
export interface GetLensInput {
  LensAlias: string;
  LensVersion?: string;
}
export const GetLensInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LensAlias: S.String.pipe(T.HttpLabel("LensAlias")),
    LensVersion: S.optional(S.String).pipe(T.HttpQuery("LensVersion")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/lenses/{LensAlias}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetLensInput" }) as any as S.Schema<GetLensInput>;
export type LensName = string;
export type LensDescription = string;
export type LensOwner = string;
export type ShareInvitationId = string;
export interface Lens {
  LensArn?: string;
  LensVersion?: string;
  Name?: string;
  Description?: string;
  Owner?: string;
  ShareInvitationId?: string;
  Tags?: { [key: string]: string | undefined };
}
export const Lens = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LensArn: S.optional(S.String),
    LensVersion: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Owner: S.optional(S.String),
    ShareInvitationId: S.optional(S.String),
    Tags: S.optional(TagMap),
  }),
).annotate({ identifier: "Lens" }) as any as S.Schema<Lens>;
export interface GetLensOutput {
  Lens?: Lens;
}
export const GetLensOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Lens: S.optional(Lens) }),
).annotate({ identifier: "GetLensOutput" }) as any as S.Schema<GetLensOutput>;
export interface GetLensReviewInput {
  WorkloadId: string;
  LensAlias: string;
  MilestoneNumber?: number;
}
export const GetLensReviewInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")),
    LensAlias: S.String.pipe(T.HttpLabel("LensAlias")),
    MilestoneNumber: S.optional(S.Number).pipe(T.HttpQuery("MilestoneNumber")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/workloads/{WorkloadId}/lensReviews/{LensAlias}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLensReviewInput",
}) as any as S.Schema<GetLensReviewInput>;
export type LensStatus =
  | "CURRENT"
  | "NOT_CURRENT"
  | "DEPRECATED"
  | "DELETED"
  | "UNSHARED"
  | (string & {});
export const LensStatus = S.String;

export type PillarName = string;
export interface PillarReviewSummary {
  PillarId?: string;
  PillarName?: string;
  Notes?: string;
  RiskCounts?: { [key: string]: number | undefined };
  PrioritizedRiskCounts?: { [key: string]: number | undefined };
}
export const PillarReviewSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PillarId: S.optional(S.String),
    PillarName: S.optional(S.String),
    Notes: S.optional(S.String),
    RiskCounts: S.optional(RiskCounts),
    PrioritizedRiskCounts: S.optional(RiskCounts),
  }),
).annotate({
  identifier: "PillarReviewSummary",
}) as any as S.Schema<PillarReviewSummary>;
export type PillarReviewSummaries = PillarReviewSummary[];
export const PillarReviewSummaries = /*@__PURE__*/ S.Array(PillarReviewSummary);
export type SelectedQuestionId = string;
export type SelectedQuestionIds = string[];
export const SelectedQuestionIds = /*@__PURE__*/ S.Array(S.String);
export interface SelectedPillar {
  PillarId?: string;
  SelectedQuestionIds?: string[];
}
export const SelectedPillar = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PillarId: S.optional(S.String),
    SelectedQuestionIds: S.optional(SelectedQuestionIds),
  }),
).annotate({ identifier: "SelectedPillar" }) as any as S.Schema<SelectedPillar>;
export type SelectedPillars = SelectedPillar[];
export const SelectedPillars = /*@__PURE__*/ S.Array(SelectedPillar);
export interface JiraSelectedQuestionConfiguration {
  SelectedPillars?: SelectedPillar[];
}
export const JiraSelectedQuestionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SelectedPillars: S.optional(SelectedPillars) }),
).annotate({
  identifier: "JiraSelectedQuestionConfiguration",
}) as any as S.Schema<JiraSelectedQuestionConfiguration>;
export interface WorkloadProfile {
  ProfileArn?: string;
  ProfileVersion?: string;
}
export const WorkloadProfile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileArn: S.optional(S.String),
    ProfileVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkloadProfile",
}) as any as S.Schema<WorkloadProfile>;
export type WorkloadProfiles = WorkloadProfile[];
export const WorkloadProfiles = /*@__PURE__*/ S.Array(WorkloadProfile);
export interface LensReview {
  LensAlias?: string;
  LensArn?: string;
  LensVersion?: string;
  LensName?: string;
  LensStatus?: LensStatus;
  PillarReviewSummaries?: PillarReviewSummary[];
  JiraConfiguration?: JiraSelectedQuestionConfiguration;
  UpdatedAt?: Date;
  Notes?: string;
  RiskCounts?: { [key: string]: number | undefined };
  NextToken?: string;
  Profiles?: WorkloadProfile[];
  PrioritizedRiskCounts?: { [key: string]: number | undefined };
}
export const LensReview = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LensAlias: S.optional(S.String),
    LensArn: S.optional(S.String),
    LensVersion: S.optional(S.String),
    LensName: S.optional(S.String),
    LensStatus: S.optional(LensStatus),
    PillarReviewSummaries: S.optional(PillarReviewSummaries),
    JiraConfiguration: S.optional(JiraSelectedQuestionConfiguration),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Notes: S.optional(S.String),
    RiskCounts: S.optional(RiskCounts),
    NextToken: S.optional(S.String),
    Profiles: S.optional(WorkloadProfiles),
    PrioritizedRiskCounts: S.optional(RiskCounts),
  }),
).annotate({ identifier: "LensReview" }) as any as S.Schema<LensReview>;
export interface GetLensReviewOutput {
  WorkloadId?: string;
  MilestoneNumber?: number;
  LensReview?: LensReview;
}
export const GetLensReviewOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.optional(S.String),
    MilestoneNumber: S.optional(S.Number),
    LensReview: S.optional(LensReview),
  }),
).annotate({
  identifier: "GetLensReviewOutput",
}) as any as S.Schema<GetLensReviewOutput>;
export interface GetLensReviewReportInput {
  WorkloadId: string;
  LensAlias: string;
  MilestoneNumber?: number;
}
export const GetLensReviewReportInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")),
    LensAlias: S.String.pipe(T.HttpLabel("LensAlias")),
    MilestoneNumber: S.optional(S.Number).pipe(T.HttpQuery("MilestoneNumber")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/workloads/{WorkloadId}/lensReviews/{LensAlias}/report",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLensReviewReportInput",
}) as any as S.Schema<GetLensReviewReportInput>;
export interface LensReviewReport {
  LensAlias?: string;
  LensArn?: string;
  Base64String?: string;
}
export const LensReviewReport = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LensAlias: S.optional(S.String),
    LensArn: S.optional(S.String),
    Base64String: S.optional(S.String),
  }),
).annotate({
  identifier: "LensReviewReport",
}) as any as S.Schema<LensReviewReport>;
export interface GetLensReviewReportOutput {
  WorkloadId?: string;
  MilestoneNumber?: number;
  LensReviewReport?: LensReviewReport;
}
export const GetLensReviewReportOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.optional(S.String),
    MilestoneNumber: S.optional(S.Number),
    LensReviewReport: S.optional(LensReviewReport),
  }),
).annotate({
  identifier: "GetLensReviewReportOutput",
}) as any as S.Schema<GetLensReviewReportOutput>;
export interface GetLensVersionDifferenceInput {
  LensAlias: string;
  BaseLensVersion?: string;
  TargetLensVersion?: string;
}
export const GetLensVersionDifferenceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LensAlias: S.String.pipe(T.HttpLabel("LensAlias")),
    BaseLensVersion: S.optional(S.String).pipe(T.HttpQuery("BaseLensVersion")),
    TargetLensVersion: S.optional(S.String).pipe(
      T.HttpQuery("TargetLensVersion"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/lenses/{LensAlias}/versionDifference" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLensVersionDifferenceInput",
}) as any as S.Schema<GetLensVersionDifferenceInput>;
export type DifferenceStatus = "UPDATED" | "NEW" | "DELETED" | (string & {});
export const DifferenceStatus = S.String;

export interface QuestionDifference {
  QuestionId?: string;
  QuestionTitle?: string;
  DifferenceStatus?: DifferenceStatus;
}
export const QuestionDifference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QuestionId: S.optional(S.String),
    QuestionTitle: S.optional(S.String),
    DifferenceStatus: S.optional(DifferenceStatus),
  }),
).annotate({
  identifier: "QuestionDifference",
}) as any as S.Schema<QuestionDifference>;
export type QuestionDifferences = QuestionDifference[];
export const QuestionDifferences = /*@__PURE__*/ S.Array(QuestionDifference);
export interface PillarDifference {
  PillarId?: string;
  PillarName?: string;
  DifferenceStatus?: DifferenceStatus;
  QuestionDifferences?: QuestionDifference[];
}
export const PillarDifference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PillarId: S.optional(S.String),
    PillarName: S.optional(S.String),
    DifferenceStatus: S.optional(DifferenceStatus),
    QuestionDifferences: S.optional(QuestionDifferences),
  }),
).annotate({
  identifier: "PillarDifference",
}) as any as S.Schema<PillarDifference>;
export type PillarDifferences = PillarDifference[];
export const PillarDifferences = /*@__PURE__*/ S.Array(PillarDifference);
export interface VersionDifferences {
  PillarDifferences?: PillarDifference[];
}
export const VersionDifferences = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PillarDifferences: S.optional(PillarDifferences) }),
).annotate({
  identifier: "VersionDifferences",
}) as any as S.Schema<VersionDifferences>;
export interface GetLensVersionDifferenceOutput {
  LensAlias?: string;
  LensArn?: string;
  BaseLensVersion?: string;
  TargetLensVersion?: string;
  LatestLensVersion?: string;
  VersionDifferences?: VersionDifferences;
}
export const GetLensVersionDifferenceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LensAlias: S.optional(S.String),
    LensArn: S.optional(S.String),
    BaseLensVersion: S.optional(S.String),
    TargetLensVersion: S.optional(S.String),
    LatestLensVersion: S.optional(S.String),
    VersionDifferences: S.optional(VersionDifferences),
  }),
).annotate({
  identifier: "GetLensVersionDifferenceOutput",
}) as any as S.Schema<GetLensVersionDifferenceOutput>;
export interface GetMilestoneInput {
  WorkloadId: string;
  MilestoneNumber: number;
}
export const GetMilestoneInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")),
    MilestoneNumber: S.Number.pipe(T.HttpLabel("MilestoneNumber")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/workloads/{WorkloadId}/milestones/{MilestoneNumber}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMilestoneInput",
}) as any as S.Schema<GetMilestoneInput>;
export type IsReviewOwnerUpdateAcknowledged = boolean;
export type WorkloadImprovementStatus =
  | "NOT_APPLICABLE"
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETE"
  | "RISK_ACKNOWLEDGED"
  | (string & {});
export const WorkloadImprovementStatus = S.String;

export interface WorkloadJiraConfigurationOutput {
  IssueManagementStatus?: WorkloadIssueManagementStatus;
  IssueManagementType?: IssueManagementType;
  JiraProjectKey?: string;
  StatusMessage?: string;
}
export const WorkloadJiraConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IssueManagementStatus: S.optional(WorkloadIssueManagementStatus),
    IssueManagementType: S.optional(IssueManagementType),
    JiraProjectKey: S.optional(S.String),
    StatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkloadJiraConfigurationOutput",
}) as any as S.Schema<WorkloadJiraConfigurationOutput>;
export interface Workload {
  WorkloadId?: string;
  WorkloadArn?: string;
  WorkloadName?: string;
  Description?: string;
  Environment?: WorkloadEnvironment;
  UpdatedAt?: Date;
  AccountIds?: string[];
  AwsRegions?: string[];
  NonAwsRegions?: string[];
  ArchitecturalDesign?: string;
  ReviewOwner?: string;
  ReviewRestrictionDate?: Date;
  IsReviewOwnerUpdateAcknowledged?: boolean;
  IndustryType?: string;
  Industry?: string;
  Notes?: string;
  ImprovementStatus?: WorkloadImprovementStatus;
  RiskCounts?: { [key: string]: number | undefined };
  PillarPriorities?: string[];
  Lenses?: string[];
  Owner?: string;
  ShareInvitationId?: string;
  Tags?: { [key: string]: string | undefined };
  DiscoveryConfig?: WorkloadDiscoveryConfig;
  Applications?: string[];
  Profiles?: WorkloadProfile[];
  PrioritizedRiskCounts?: { [key: string]: number | undefined };
  JiraConfiguration?: WorkloadJiraConfigurationOutput;
}
export const Workload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.optional(S.String),
    WorkloadArn: S.optional(S.String),
    WorkloadName: S.optional(S.String),
    Description: S.optional(S.String),
    Environment: S.optional(WorkloadEnvironment),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    AccountIds: S.optional(WorkloadAccountIds),
    AwsRegions: S.optional(WorkloadAwsRegions),
    NonAwsRegions: S.optional(WorkloadNonAwsRegions),
    ArchitecturalDesign: S.optional(S.String),
    ReviewOwner: S.optional(S.String),
    ReviewRestrictionDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    IsReviewOwnerUpdateAcknowledged: S.optional(S.Boolean),
    IndustryType: S.optional(S.String),
    Industry: S.optional(S.String),
    Notes: S.optional(S.String),
    ImprovementStatus: S.optional(WorkloadImprovementStatus),
    RiskCounts: S.optional(RiskCounts),
    PillarPriorities: S.optional(WorkloadPillarPriorities),
    Lenses: S.optional(WorkloadLenses),
    Owner: S.optional(S.String),
    ShareInvitationId: S.optional(S.String),
    Tags: S.optional(TagMap),
    DiscoveryConfig: S.optional(WorkloadDiscoveryConfig),
    Applications: S.optional(WorkloadApplications),
    Profiles: S.optional(WorkloadProfiles),
    PrioritizedRiskCounts: S.optional(RiskCounts),
    JiraConfiguration: S.optional(WorkloadJiraConfigurationOutput),
  }),
).annotate({ identifier: "Workload" }) as any as S.Schema<Workload>;
export interface Milestone {
  MilestoneNumber?: number;
  MilestoneName?: string;
  RecordedAt?: Date;
  Workload?: Workload;
}
export const Milestone = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MilestoneNumber: S.optional(S.Number),
    MilestoneName: S.optional(S.String),
    RecordedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Workload: S.optional(Workload),
  }),
).annotate({ identifier: "Milestone" }) as any as S.Schema<Milestone>;
export interface GetMilestoneOutput {
  WorkloadId?: string;
  Milestone?: Milestone;
}
export const GetMilestoneOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.optional(S.String),
    Milestone: S.optional(Milestone),
  }),
).annotate({
  identifier: "GetMilestoneOutput",
}) as any as S.Schema<GetMilestoneOutput>;
export interface GetProfileInput {
  ProfileArn: string;
  ProfileVersion?: string;
}
export const GetProfileInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileArn: S.String.pipe(T.HttpLabel("ProfileArn")),
    ProfileVersion: S.optional(S.String).pipe(T.HttpQuery("ProfileVersion")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/profiles/{ProfileArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetProfileInput",
}) as any as S.Schema<GetProfileInput>;
export interface ProfileChoice {
  ChoiceId?: string;
  ChoiceTitle?: string;
  ChoiceDescription?: string;
}
export const ProfileChoice = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChoiceId: S.optional(S.String),
    ChoiceTitle: S.optional(S.String),
    ChoiceDescription: S.optional(S.String),
  }),
).annotate({ identifier: "ProfileChoice" }) as any as S.Schema<ProfileChoice>;
export type ProfileQuestionChoices = ProfileChoice[];
export const ProfileQuestionChoices = /*@__PURE__*/ S.Array(ProfileChoice);
export type SelectedChoiceIds = string[];
export const SelectedChoiceIds = /*@__PURE__*/ S.Array(S.String);
export type MinSelectedProfileChoices = number;
export type MaxSelectedProfileChoices = number;
export interface ProfileQuestion {
  QuestionId?: string;
  QuestionTitle?: string;
  QuestionDescription?: string;
  QuestionChoices?: ProfileChoice[];
  SelectedChoiceIds?: string[];
  MinSelectedChoices?: number;
  MaxSelectedChoices?: number;
}
export const ProfileQuestion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QuestionId: S.optional(S.String),
    QuestionTitle: S.optional(S.String),
    QuestionDescription: S.optional(S.String),
    QuestionChoices: S.optional(ProfileQuestionChoices),
    SelectedChoiceIds: S.optional(SelectedChoiceIds),
    MinSelectedChoices: S.optional(S.Number),
    MaxSelectedChoices: S.optional(S.Number),
  }),
).annotate({
  identifier: "ProfileQuestion",
}) as any as S.Schema<ProfileQuestion>;
export type ProfileQuestions = ProfileQuestion[];
export const ProfileQuestions = /*@__PURE__*/ S.Array(ProfileQuestion);
export interface Profile {
  ProfileArn?: string;
  ProfileVersion?: string;
  ProfileName?: string;
  ProfileDescription?: string;
  ProfileQuestions?: ProfileQuestion[];
  Owner?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  ShareInvitationId?: string;
  Tags?: { [key: string]: string | undefined };
}
export const Profile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileArn: S.optional(S.String),
    ProfileVersion: S.optional(S.String),
    ProfileName: S.optional(S.String),
    ProfileDescription: S.optional(S.String),
    ProfileQuestions: S.optional(ProfileQuestions),
    Owner: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ShareInvitationId: S.optional(S.String),
    Tags: S.optional(TagMap),
  }),
).annotate({ identifier: "Profile" }) as any as S.Schema<Profile>;
export interface GetProfileOutput {
  Profile?: Profile;
}
export const GetProfileOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Profile: S.optional(Profile) }),
).annotate({
  identifier: "GetProfileOutput",
}) as any as S.Schema<GetProfileOutput>;
export interface GetProfileTemplateInput {}
export const GetProfileTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/profileTemplate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetProfileTemplateInput",
}) as any as S.Schema<GetProfileTemplateInput>;
export interface ProfileTemplateChoice {
  ChoiceId?: string;
  ChoiceTitle?: string;
  ChoiceDescription?: string;
}
export const ProfileTemplateChoice = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChoiceId: S.optional(S.String),
    ChoiceTitle: S.optional(S.String),
    ChoiceDescription: S.optional(S.String),
  }),
).annotate({
  identifier: "ProfileTemplateChoice",
}) as any as S.Schema<ProfileTemplateChoice>;
export type ProfileTemplateQuestionChoices = ProfileTemplateChoice[];
export const ProfileTemplateQuestionChoices = /*@__PURE__*/ S.Array(
  ProfileTemplateChoice,
);
export interface ProfileTemplateQuestion {
  QuestionId?: string;
  QuestionTitle?: string;
  QuestionDescription?: string;
  QuestionChoices?: ProfileTemplateChoice[];
  MinSelectedChoices?: number;
  MaxSelectedChoices?: number;
}
export const ProfileTemplateQuestion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QuestionId: S.optional(S.String),
    QuestionTitle: S.optional(S.String),
    QuestionDescription: S.optional(S.String),
    QuestionChoices: S.optional(ProfileTemplateQuestionChoices),
    MinSelectedChoices: S.optional(S.Number),
    MaxSelectedChoices: S.optional(S.Number),
  }),
).annotate({
  identifier: "ProfileTemplateQuestion",
}) as any as S.Schema<ProfileTemplateQuestion>;
export type TemplateQuestions = ProfileTemplateQuestion[];
export const TemplateQuestions = /*@__PURE__*/ S.Array(ProfileTemplateQuestion);
export interface ProfileTemplate {
  TemplateName?: string;
  TemplateQuestions?: ProfileTemplateQuestion[];
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export const ProfileTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateName: S.optional(S.String),
    TemplateQuestions: S.optional(TemplateQuestions),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ProfileTemplate",
}) as any as S.Schema<ProfileTemplate>;
export interface GetProfileTemplateOutput {
  ProfileTemplate?: ProfileTemplate;
}
export const GetProfileTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProfileTemplate: S.optional(ProfileTemplate) }),
).annotate({
  identifier: "GetProfileTemplateOutput",
}) as any as S.Schema<GetProfileTemplateOutput>;
export interface GetReviewTemplateInput {
  TemplateArn: string;
}
export const GetReviewTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TemplateArn: S.String.pipe(T.HttpLabel("TemplateArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/reviewTemplates/{TemplateArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReviewTemplateInput",
}) as any as S.Schema<GetReviewTemplateInput>;
export type Question = "UNANSWERED" | "ANSWERED" | (string & {});
export const Question = S.String;

export type QuestionCounts = { [key in Question]?: number };
export const QuestionCounts = /*@__PURE__*/ S.Record(
  Question,
  S.Number.pipe(S.optional),
);
export type ReviewTemplateUpdateStatus =
  | "CURRENT"
  | "LENS_NOT_CURRENT"
  | (string & {});
export const ReviewTemplateUpdateStatus = S.String;

export interface ReviewTemplate {
  Description?: string;
  Lenses?: string[];
  Notes?: string;
  QuestionCounts?: { [key: string]: number | undefined };
  Owner?: string;
  UpdatedAt?: Date;
  TemplateArn?: string;
  TemplateName?: string;
  Tags?: { [key: string]: string | undefined };
  UpdateStatus?: ReviewTemplateUpdateStatus;
  ShareInvitationId?: string;
}
export const ReviewTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    Lenses: S.optional(ReviewTemplateLenses),
    Notes: S.optional(S.String),
    QuestionCounts: S.optional(QuestionCounts),
    Owner: S.optional(S.String),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    TemplateArn: S.optional(S.String),
    TemplateName: S.optional(S.String),
    Tags: S.optional(TagMap),
    UpdateStatus: S.optional(ReviewTemplateUpdateStatus),
    ShareInvitationId: S.optional(S.String),
  }),
).annotate({ identifier: "ReviewTemplate" }) as any as S.Schema<ReviewTemplate>;
export interface GetReviewTemplateOutput {
  ReviewTemplate?: ReviewTemplate;
}
export const GetReviewTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReviewTemplate: S.optional(ReviewTemplate) }),
).annotate({
  identifier: "GetReviewTemplateOutput",
}) as any as S.Schema<GetReviewTemplateOutput>;
export interface GetReviewTemplateAnswerInput {
  TemplateArn: string;
  LensAlias: string;
  QuestionId: string;
}
export const GetReviewTemplateAnswerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateArn: S.String.pipe(T.HttpLabel("TemplateArn")),
    LensAlias: S.String.pipe(T.HttpLabel("LensAlias")),
    QuestionId: S.String.pipe(T.HttpLabel("QuestionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/reviewTemplates/{TemplateArn}/lensReviews/{LensAlias}/answers/{QuestionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReviewTemplateAnswerInput",
}) as any as S.Schema<GetReviewTemplateAnswerInput>;
export type ReviewTemplateAnswerStatus =
  | "UNANSWERED"
  | "ANSWERED"
  | (string & {});
export const ReviewTemplateAnswerStatus = S.String;

export interface ReviewTemplateAnswer {
  QuestionId?: string;
  PillarId?: string;
  QuestionTitle?: string;
  QuestionDescription?: string;
  ImprovementPlanUrl?: string;
  HelpfulResourceUrl?: string;
  HelpfulResourceDisplayText?: string;
  Choices?: Choice[];
  SelectedChoices?: string[];
  ChoiceAnswers?: ChoiceAnswer[];
  IsApplicable?: boolean;
  AnswerStatus?: ReviewTemplateAnswerStatus;
  Notes?: string;
  Reason?: AnswerReason;
}
export const ReviewTemplateAnswer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QuestionId: S.optional(S.String),
    PillarId: S.optional(S.String),
    QuestionTitle: S.optional(S.String),
    QuestionDescription: S.optional(S.String),
    ImprovementPlanUrl: S.optional(S.String),
    HelpfulResourceUrl: S.optional(S.String),
    HelpfulResourceDisplayText: S.optional(S.String),
    Choices: S.optional(Choices),
    SelectedChoices: S.optional(SelectedChoices),
    ChoiceAnswers: S.optional(ChoiceAnswers),
    IsApplicable: S.optional(S.Boolean),
    AnswerStatus: S.optional(ReviewTemplateAnswerStatus),
    Notes: S.optional(S.String),
    Reason: S.optional(AnswerReason),
  }),
).annotate({
  identifier: "ReviewTemplateAnswer",
}) as any as S.Schema<ReviewTemplateAnswer>;
export interface GetReviewTemplateAnswerOutput {
  TemplateArn?: string;
  LensAlias?: string;
  Answer?: ReviewTemplateAnswer;
}
export const GetReviewTemplateAnswerOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateArn: S.optional(S.String),
    LensAlias: S.optional(S.String),
    Answer: S.optional(ReviewTemplateAnswer),
  }),
).annotate({
  identifier: "GetReviewTemplateAnswerOutput",
}) as any as S.Schema<GetReviewTemplateAnswerOutput>;
export interface GetReviewTemplateLensReviewInput {
  TemplateArn: string;
  LensAlias: string;
}
export const GetReviewTemplateLensReviewInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateArn: S.String.pipe(T.HttpLabel("TemplateArn")),
    LensAlias: S.String.pipe(T.HttpLabel("LensAlias")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/reviewTemplates/{TemplateArn}/lensReviews/{LensAlias}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReviewTemplateLensReviewInput",
}) as any as S.Schema<GetReviewTemplateLensReviewInput>;
export interface ReviewTemplatePillarReviewSummary {
  PillarId?: string;
  PillarName?: string;
  Notes?: string;
  QuestionCounts?: { [key: string]: number | undefined };
}
export const ReviewTemplatePillarReviewSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PillarId: S.optional(S.String),
    PillarName: S.optional(S.String),
    Notes: S.optional(S.String),
    QuestionCounts: S.optional(QuestionCounts),
  }),
).annotate({
  identifier: "ReviewTemplatePillarReviewSummary",
}) as any as S.Schema<ReviewTemplatePillarReviewSummary>;
export type ReviewTemplatePillarReviewSummaries =
  ReviewTemplatePillarReviewSummary[];
export const ReviewTemplatePillarReviewSummaries = /*@__PURE__*/ S.Array(
  ReviewTemplatePillarReviewSummary,
);
export interface ReviewTemplateLensReview {
  LensAlias?: string;
  LensArn?: string;
  LensVersion?: string;
  LensName?: string;
  LensStatus?: LensStatus;
  PillarReviewSummaries?: ReviewTemplatePillarReviewSummary[];
  UpdatedAt?: Date;
  Notes?: string;
  QuestionCounts?: { [key: string]: number | undefined };
  NextToken?: string;
}
export const ReviewTemplateLensReview = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LensAlias: S.optional(S.String),
    LensArn: S.optional(S.String),
    LensVersion: S.optional(S.String),
    LensName: S.optional(S.String),
    LensStatus: S.optional(LensStatus),
    PillarReviewSummaries: S.optional(ReviewTemplatePillarReviewSummaries),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Notes: S.optional(S.String),
    QuestionCounts: S.optional(QuestionCounts),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ReviewTemplateLensReview",
}) as any as S.Schema<ReviewTemplateLensReview>;
export interface GetReviewTemplateLensReviewOutput {
  TemplateArn?: string;
  LensReview?: ReviewTemplateLensReview;
}
export const GetReviewTemplateLensReviewOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateArn: S.optional(S.String),
    LensReview: S.optional(ReviewTemplateLensReview),
  }),
).annotate({
  identifier: "GetReviewTemplateLensReviewOutput",
}) as any as S.Schema<GetReviewTemplateLensReviewOutput>;
export interface GetWorkloadInput {
  WorkloadId: string;
}
export const GetWorkloadInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/workloads/{WorkloadId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWorkloadInput",
}) as any as S.Schema<GetWorkloadInput>;
export interface GetWorkloadOutput {
  Workload?: Workload;
}
export const GetWorkloadOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Workload: S.optional(Workload) }),
).annotate({
  identifier: "GetWorkloadOutput",
}) as any as S.Schema<GetWorkloadOutput>;
export interface ImportLensInput {
  LensAlias?: string;
  JSONString?: string;
  ClientRequestToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export const ImportLensInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LensAlias: S.optional(S.String),
    JSONString: S.optional(S.String),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/importLens" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ImportLensInput",
}) as any as S.Schema<ImportLensInput>;
export type ImportLensStatus =
  | "IN_PROGRESS"
  | "COMPLETE"
  | "ERROR"
  | (string & {});
export const ImportLensStatus = S.String;

export interface ImportLensOutput {
  LensArn?: string;
  Status?: ImportLensStatus;
}
export const ImportLensOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LensArn: S.optional(S.String),
    Status: S.optional(ImportLensStatus),
  }),
).annotate({
  identifier: "ImportLensOutput",
}) as any as S.Schema<ImportLensOutput>;
export interface ListAgentContextsRequest {
  profileArn: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListAgentContextsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileArn: S.String.pipe(T.HttpLabel("profileArn")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/api/v1/agent-profiles/{profileArn}/contexts",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAgentContextsRequest",
}) as any as S.Schema<ListAgentContextsRequest>;
export type ContextSummaries = ContextSummary[];
export const ContextSummaries = /*@__PURE__*/ S.Array(ContextSummary);
export interface ListAgentContextsResponse {
  items: ContextSummary[];
  nextToken?: string;
}
export const ListAgentContextsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: ContextSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListAgentContextsResponse",
}) as any as S.Schema<ListAgentContextsResponse>;
export interface ListAgentGoalsRequest {
  profileArn: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListAgentGoalsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileArn: S.String.pipe(T.HttpLabel("profileArn")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/api/v1/agent-profiles/{profileArn}/goals",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAgentGoalsRequest",
}) as any as S.Schema<ListAgentGoalsRequest>;
export type GoalSummaries = GoalSummary[];
export const GoalSummaries = /*@__PURE__*/ S.Array(GoalSummary);
export interface ListAgentGoalsResponse {
  items: GoalSummary[];
  nextToken?: string;
}
export const ListAgentGoalsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: GoalSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListAgentGoalsResponse",
}) as any as S.Schema<ListAgentGoalsResponse>;
export interface ListAgentProfilesRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListAgentProfilesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/api/v1/agent-profiles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAgentProfilesRequest",
}) as any as S.Schema<ListAgentProfilesRequest>;
export interface AgentProfileSummary {
  name: string;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  businessOverview?: string | redacted.Redacted<string>;
  pillars: Pillar[];
  deletionProtection?: boolean;
  executionRoleArn: string;
  aggregationConfiguration: AggregationConfiguration[];
  arn: string;
  eligibleForScheduledGeneration?: boolean;
  eligibleForArchitectureGeneration?: boolean;
  fieldErrors?: { [key: string]: string | undefined };
  tags?: Tag[];
  createdBy: string;
  createdAt: Date;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
}
export const AgentProfileSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    displayName: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    businessOverview: S.optional(SensitiveString),
    pillars: Pillars,
    deletionProtection: S.optional(S.Boolean),
    executionRoleArn: S.String,
    aggregationConfiguration: AggregationConfigurations,
    arn: S.String,
    eligibleForScheduledGeneration: S.optional(S.Boolean),
    eligibleForArchitectureGeneration: S.optional(S.Boolean),
    fieldErrors: S.optional(FieldErrors),
    tags: S.optional(Tags),
    createdBy: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModifiedBy: S.optional(S.String),
    lastModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "AgentProfileSummary",
}) as any as S.Schema<AgentProfileSummary>;
export type AgentProfileSummaries = AgentProfileSummary[];
export const AgentProfileSummaries = /*@__PURE__*/ S.Array(AgentProfileSummary);
export interface ListAgentProfilesResponse {
  items: AgentProfileSummary[];
  nextToken?: string;
}
export const ListAgentProfilesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: AgentProfileSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListAgentProfilesResponse",
}) as any as S.Schema<ListAgentProfilesResponse>;
export interface ListAgentRecommendationGenerationsRequest {
  profileArn: string;
  recommendationType?: RecommendationType;
  maxResults?: number;
  nextToken?: string;
}
export const ListAgentRecommendationGenerationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      profileArn: S.String.pipe(T.HttpLabel("profileArn")),
      recommendationType: S.optional(RecommendationType).pipe(
        T.HttpQuery("RecommendationType"),
      ),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/api/v1/agent-profiles/{profileArn}/generations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListAgentRecommendationGenerationsRequest",
  }) as any as S.Schema<ListAgentRecommendationGenerationsRequest>;
export interface AgentRecommendationGenerationSummary {
  id: string;
  profileArn: string;
  name?: string;
  status: GenerationStatus;
  estimatedCompletionTime?: Date;
  createdBy: string;
  createdAt: Date;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
}
export const AgentRecommendationGenerationSummary = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      id: S.String,
      profileArn: S.String,
      name: S.optional(S.String),
      status: GenerationStatus,
      estimatedCompletionTime: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      createdBy: S.String,
      createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      lastModifiedBy: S.optional(S.String),
      lastModifiedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
    }),
).annotate({
  identifier: "AgentRecommendationGenerationSummary",
}) as any as S.Schema<AgentRecommendationGenerationSummary>;
export type AgentRecommendationGenerationSummaries =
  AgentRecommendationGenerationSummary[];
export const AgentRecommendationGenerationSummaries = /*@__PURE__*/ S.Array(
  AgentRecommendationGenerationSummary,
);
export interface ListAgentRecommendationGenerationsResponse {
  items: AgentRecommendationGenerationSummary[];
  nextToken?: string;
}
export const ListAgentRecommendationGenerationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      items: AgentRecommendationGenerationSummaries,
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListAgentRecommendationGenerationsResponse",
  }) as any as S.Schema<ListAgentRecommendationGenerationsResponse>;
export type RecommendationItemType =
  | "AWS_RESOURCE"
  | "RECOMMENDATION"
  | (string & {});
export const RecommendationItemType = S.String;

export interface ListAgentRecommendationItemsRequest {
  recommendationArn: string;
  type?: RecommendationItemType;
  maxResults?: number;
  nextToken?: string;
}
export const ListAgentRecommendationItemsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendationArn: S.String.pipe(T.HttpLabel("recommendationArn")),
    type: S.optional(RecommendationItemType).pipe(T.HttpQuery("type")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/api/v1/agent-recommendations/{recommendationArn}/items",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAgentRecommendationItemsRequest",
}) as any as S.Schema<ListAgentRecommendationItemsRequest>;
export interface AgentRecommendationItemSummary {
  id: string;
  recommendationArn: string;
  type: RecommendationItemType;
  metadata: any;
  createdBy: string;
  createdAt: Date;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
}
export const AgentRecommendationItemSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    recommendationArn: S.String,
    type: RecommendationItemType,
    metadata: S.Any,
    createdBy: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModifiedBy: S.optional(S.String),
    lastModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "AgentRecommendationItemSummary",
}) as any as S.Schema<AgentRecommendationItemSummary>;
export type AgentRecommendationItemSummaries = AgentRecommendationItemSummary[];
export const AgentRecommendationItemSummaries = /*@__PURE__*/ S.Array(
  AgentRecommendationItemSummary,
);
export interface ListAgentRecommendationItemsResponse {
  items: AgentRecommendationItemSummary[];
  nextToken?: string;
}
export const ListAgentRecommendationItemsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      items: AgentRecommendationItemSummaries,
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListAgentRecommendationItemsResponse",
}) as any as S.Schema<ListAgentRecommendationItemsResponse>;
export interface ListAgentRecommendationsRequest {
  profileArn: string;
  maxResults?: number;
  nextToken?: string;
  state?: RecommendationState;
  pillar?: Pillar;
}
export const ListAgentRecommendationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileArn: S.String.pipe(T.HttpLabel("profileArn")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    state: S.optional(RecommendationState).pipe(T.HttpQuery("state")),
    pillar: S.optional(Pillar).pipe(T.HttpQuery("pillar")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/api/v1/agent-profiles/{profileArn}/recommendations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAgentRecommendationsRequest",
}) as any as S.Schema<ListAgentRecommendationsRequest>;
export interface AgentRecommendationSummary {
  recommendationArn: string;
  profileArn: string;
  title: string | redacted.Redacted<string>;
  description: string | redacted.Redacted<string>;
  type: RecommendationType;
  pillar: Pillar;
  priority: Priority;
  effort: Effort;
  status: RecommendationStatus;
  state: RecommendationState;
  updateReason?: string | redacted.Redacted<string>;
  impact: ImpactCategory;
  roi: Roi;
  numberOfResources?: number;
  awsServices?: string[];
  businessUnits?: string[];
  applications?: string[];
  createdBy: string;
  createdAt: Date;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
}
export const AgentRecommendationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendationArn: S.String,
    profileArn: S.String,
    title: SensitiveString,
    description: SensitiveString,
    type: RecommendationType,
    pillar: Pillar,
    priority: Priority,
    effort: Effort,
    status: RecommendationStatus,
    state: RecommendationState,
    updateReason: S.optional(SensitiveString),
    impact: ImpactCategory,
    roi: Roi,
    numberOfResources: S.optional(S.Number),
    awsServices: S.optional(StringList),
    businessUnits: S.optional(StringList),
    applications: S.optional(StringList),
    createdBy: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModifiedBy: S.optional(S.String),
    lastModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "AgentRecommendationSummary",
}) as any as S.Schema<AgentRecommendationSummary>;
export type AgentRecommendationSummaries = AgentRecommendationSummary[];
export const AgentRecommendationSummaries = /*@__PURE__*/ S.Array(
  AgentRecommendationSummary,
);
export interface ListAgentRecommendationsResponse {
  items: AgentRecommendationSummary[];
  nextToken?: string;
}
export const ListAgentRecommendationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: AgentRecommendationSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAgentRecommendationsResponse",
}) as any as S.Schema<ListAgentRecommendationsResponse>;
export type QuestionPriority = "PRIORITIZED" | "NONE" | (string & {});
export const QuestionPriority = S.String;

export interface ListAnswersInput {
  WorkloadId: string;
  LensAlias: string;
  PillarId?: string;
  MilestoneNumber?: number;
  NextToken?: string;
  MaxResults?: number;
  QuestionPriority?: QuestionPriority;
}
export const ListAnswersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")),
    LensAlias: S.String.pipe(T.HttpLabel("LensAlias")),
    PillarId: S.optional(S.String).pipe(T.HttpQuery("PillarId")),
    MilestoneNumber: S.optional(S.Number).pipe(T.HttpQuery("MilestoneNumber")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    QuestionPriority: S.optional(QuestionPriority).pipe(
      T.HttpQuery("QuestionPriority"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/workloads/{WorkloadId}/lensReviews/{LensAlias}/answers",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAnswersInput",
}) as any as S.Schema<ListAnswersInput>;
export interface ChoiceAnswerSummary {
  ChoiceId?: string;
  Status?: ChoiceStatus;
  Reason?: ChoiceReason;
}
export const ChoiceAnswerSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChoiceId: S.optional(S.String),
    Status: S.optional(ChoiceStatus),
    Reason: S.optional(ChoiceReason),
  }),
).annotate({
  identifier: "ChoiceAnswerSummary",
}) as any as S.Schema<ChoiceAnswerSummary>;
export type ChoiceAnswerSummaries = ChoiceAnswerSummary[];
export const ChoiceAnswerSummaries = /*@__PURE__*/ S.Array(ChoiceAnswerSummary);
export type QuestionType = "PRIORITIZED" | "NON_PRIORITIZED" | (string & {});
export const QuestionType = S.String;

export interface AnswerSummary {
  QuestionId?: string;
  PillarId?: string;
  QuestionTitle?: string;
  Choices?: Choice[];
  SelectedChoices?: string[];
  ChoiceAnswerSummaries?: ChoiceAnswerSummary[];
  IsApplicable?: boolean;
  Risk?: Risk;
  Reason?: AnswerReason;
  QuestionType?: QuestionType;
  JiraConfiguration?: JiraConfiguration;
}
export const AnswerSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QuestionId: S.optional(S.String),
    PillarId: S.optional(S.String),
    QuestionTitle: S.optional(S.String),
    Choices: S.optional(Choices),
    SelectedChoices: S.optional(SelectedChoices),
    ChoiceAnswerSummaries: S.optional(ChoiceAnswerSummaries),
    IsApplicable: S.optional(S.Boolean),
    Risk: S.optional(Risk),
    Reason: S.optional(AnswerReason),
    QuestionType: S.optional(QuestionType),
    JiraConfiguration: S.optional(JiraConfiguration),
  }),
).annotate({ identifier: "AnswerSummary" }) as any as S.Schema<AnswerSummary>;
export type AnswerSummaries = AnswerSummary[];
export const AnswerSummaries = /*@__PURE__*/ S.Array(AnswerSummary);
export interface ListAnswersOutput {
  WorkloadId?: string;
  MilestoneNumber?: number;
  LensAlias?: string;
  LensArn?: string;
  AnswerSummaries?: AnswerSummary[];
  NextToken?: string;
}
export const ListAnswersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.optional(S.String),
    MilestoneNumber: S.optional(S.Number),
    LensAlias: S.optional(S.String),
    LensArn: S.optional(S.String),
    AnswerSummaries: S.optional(AnswerSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAnswersOutput",
}) as any as S.Schema<ListAnswersOutput>;
export interface ListCheckDetailsInput {
  WorkloadId: string;
  NextToken?: string;
  MaxResults?: number;
  LensArn?: string;
  PillarId?: string;
  QuestionId?: string;
  ChoiceId?: string;
}
export const ListCheckDetailsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    LensArn: S.optional(S.String),
    PillarId: S.optional(S.String),
    QuestionId: S.optional(S.String),
    ChoiceId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/workloads/{WorkloadId}/checks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCheckDetailsInput",
}) as any as S.Schema<ListCheckDetailsInput>;
export type CheckId = string;
export type CheckName = string;
export type CheckDescription = string;
export type CheckProvider = "TRUSTED_ADVISOR" | (string & {});
export const CheckProvider = S.String;

export type CheckStatus =
  | "OKAY"
  | "WARNING"
  | "ERROR"
  | "NOT_AVAILABLE"
  | "FETCH_FAILED"
  | (string & {});
export const CheckStatus = S.String;

export type FlaggedResources = number;
export type CheckFailureReason =
  | "ASSUME_ROLE_ERROR"
  | "ACCESS_DENIED"
  | "UNKNOWN_ERROR"
  | "PREMIUM_SUPPORT_REQUIRED"
  | (string & {});
export const CheckFailureReason = S.String;

export interface CheckDetail {
  Id?: string;
  Name?: string;
  Description?: string;
  Provider?: CheckProvider;
  LensArn?: string;
  PillarId?: string;
  QuestionId?: string;
  ChoiceId?: string;
  Status?: CheckStatus;
  AccountId?: string;
  FlaggedResources?: number;
  Reason?: CheckFailureReason;
  UpdatedAt?: Date;
}
export const CheckDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Provider: S.optional(CheckProvider),
    LensArn: S.optional(S.String),
    PillarId: S.optional(S.String),
    QuestionId: S.optional(S.String),
    ChoiceId: S.optional(S.String),
    Status: S.optional(CheckStatus),
    AccountId: S.optional(S.String),
    FlaggedResources: S.optional(S.Number),
    Reason: S.optional(CheckFailureReason),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "CheckDetail" }) as any as S.Schema<CheckDetail>;
export type CheckDetails = CheckDetail[];
export const CheckDetails = /*@__PURE__*/ S.Array(CheckDetail);
export interface ListCheckDetailsOutput {
  CheckDetails?: CheckDetail[];
  NextToken?: string;
}
export const ListCheckDetailsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CheckDetails: S.optional(CheckDetails),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCheckDetailsOutput",
}) as any as S.Schema<ListCheckDetailsOutput>;
export interface ListCheckSummariesInput {
  WorkloadId: string;
  NextToken?: string;
  MaxResults?: number;
  LensArn?: string;
  PillarId?: string;
  QuestionId?: string;
  ChoiceId?: string;
}
export const ListCheckSummariesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    LensArn: S.optional(S.String),
    PillarId: S.optional(S.String),
    QuestionId: S.optional(S.String),
    ChoiceId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/workloads/{WorkloadId}/checkSummaries" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCheckSummariesInput",
}) as any as S.Schema<ListCheckSummariesInput>;
export type CheckStatusCount = number;
export type AccountSummary = { [key in CheckStatus]?: number };
export const AccountSummary = /*@__PURE__*/ S.Record(
  CheckStatus,
  S.Number.pipe(S.optional),
);
export interface CheckSummary {
  Id?: string;
  Name?: string;
  Provider?: CheckProvider;
  Description?: string;
  UpdatedAt?: Date;
  LensArn?: string;
  PillarId?: string;
  QuestionId?: string;
  ChoiceId?: string;
  Status?: CheckStatus;
  AccountSummary?: { [key: string]: number | undefined };
}
export const CheckSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Provider: S.optional(CheckProvider),
    Description: S.optional(S.String),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LensArn: S.optional(S.String),
    PillarId: S.optional(S.String),
    QuestionId: S.optional(S.String),
    ChoiceId: S.optional(S.String),
    Status: S.optional(CheckStatus),
    AccountSummary: S.optional(AccountSummary),
  }),
).annotate({ identifier: "CheckSummary" }) as any as S.Schema<CheckSummary>;
export type CheckSummaries = CheckSummary[];
export const CheckSummaries = /*@__PURE__*/ S.Array(CheckSummary);
export interface ListCheckSummariesOutput {
  CheckSummaries?: CheckSummary[];
  NextToken?: string;
}
export const ListCheckSummariesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CheckSummaries: S.optional(CheckSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCheckSummariesOutput",
}) as any as S.Schema<ListCheckSummariesOutput>;
export type LensType =
  | "AWS_OFFICIAL"
  | "CUSTOM_SHARED"
  | "CUSTOM_SELF"
  | (string & {});
export const LensType = S.String;

export interface ListLensesInput {
  NextToken?: string;
  MaxResults?: number;
  LensType?: LensType;
  LensStatus?: LensStatusType;
  LensName?: string;
}
export const ListLensesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    LensType: S.optional(LensType).pipe(T.HttpQuery("LensType")),
    LensStatus: S.optional(LensStatusType).pipe(T.HttpQuery("LensStatus")),
    LensName: S.optional(S.String).pipe(T.HttpQuery("LensName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/lenses" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLensesInput",
}) as any as S.Schema<ListLensesInput>;
export interface LensSummary {
  LensArn?: string;
  LensAlias?: string;
  LensName?: string;
  LensType?: LensType;
  Description?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  LensVersion?: string;
  Owner?: string;
  LensStatus?: LensStatus;
}
export const LensSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LensArn: S.optional(S.String),
    LensAlias: S.optional(S.String),
    LensName: S.optional(S.String),
    LensType: S.optional(LensType),
    Description: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LensVersion: S.optional(S.String),
    Owner: S.optional(S.String),
    LensStatus: S.optional(LensStatus),
  }),
).annotate({ identifier: "LensSummary" }) as any as S.Schema<LensSummary>;
export type LensSummaries = LensSummary[];
export const LensSummaries = /*@__PURE__*/ S.Array(LensSummary);
export interface ListLensesOutput {
  LensSummaries?: LensSummary[];
  NextToken?: string;
}
export const ListLensesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LensSummaries: S.optional(LensSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLensesOutput",
}) as any as S.Schema<ListLensesOutput>;
export interface ListLensReviewImprovementsInput {
  WorkloadId: string;
  LensAlias: string;
  PillarId?: string;
  MilestoneNumber?: number;
  NextToken?: string;
  MaxResults?: number;
  QuestionPriority?: QuestionPriority;
}
export const ListLensReviewImprovementsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")),
    LensAlias: S.String.pipe(T.HttpLabel("LensAlias")),
    PillarId: S.optional(S.String).pipe(T.HttpQuery("PillarId")),
    MilestoneNumber: S.optional(S.Number).pipe(T.HttpQuery("MilestoneNumber")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    QuestionPriority: S.optional(QuestionPriority).pipe(
      T.HttpQuery("QuestionPriority"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/workloads/{WorkloadId}/lensReviews/{LensAlias}/improvements",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLensReviewImprovementsInput",
}) as any as S.Schema<ListLensReviewImprovementsInput>;
export interface ChoiceImprovementPlan {
  ChoiceId?: string;
  DisplayText?: string;
  ImprovementPlanUrl?: string;
}
export const ChoiceImprovementPlan = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChoiceId: S.optional(S.String),
    DisplayText: S.optional(S.String),
    ImprovementPlanUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "ChoiceImprovementPlan",
}) as any as S.Schema<ChoiceImprovementPlan>;
export type ChoiceImprovementPlans = ChoiceImprovementPlan[];
export const ChoiceImprovementPlans = /*@__PURE__*/ S.Array(
  ChoiceImprovementPlan,
);
export interface ImprovementSummary {
  QuestionId?: string;
  PillarId?: string;
  QuestionTitle?: string;
  Risk?: Risk;
  ImprovementPlanUrl?: string;
  ImprovementPlans?: ChoiceImprovementPlan[];
  JiraConfiguration?: JiraConfiguration;
}
export const ImprovementSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QuestionId: S.optional(S.String),
    PillarId: S.optional(S.String),
    QuestionTitle: S.optional(S.String),
    Risk: S.optional(Risk),
    ImprovementPlanUrl: S.optional(S.String),
    ImprovementPlans: S.optional(ChoiceImprovementPlans),
    JiraConfiguration: S.optional(JiraConfiguration),
  }),
).annotate({
  identifier: "ImprovementSummary",
}) as any as S.Schema<ImprovementSummary>;
export type ImprovementSummaries = ImprovementSummary[];
export const ImprovementSummaries = /*@__PURE__*/ S.Array(ImprovementSummary);
export interface ListLensReviewImprovementsOutput {
  WorkloadId?: string;
  MilestoneNumber?: number;
  LensAlias?: string;
  LensArn?: string;
  ImprovementSummaries?: ImprovementSummary[];
  NextToken?: string;
}
export const ListLensReviewImprovementsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.optional(S.String),
    MilestoneNumber: S.optional(S.Number),
    LensAlias: S.optional(S.String),
    LensArn: S.optional(S.String),
    ImprovementSummaries: S.optional(ImprovementSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLensReviewImprovementsOutput",
}) as any as S.Schema<ListLensReviewImprovementsOutput>;
export interface ListLensReviewsInput {
  WorkloadId: string;
  MilestoneNumber?: number;
  NextToken?: string;
  MaxResults?: number;
}
export const ListLensReviewsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")),
    MilestoneNumber: S.optional(S.Number).pipe(T.HttpQuery("MilestoneNumber")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/workloads/{WorkloadId}/lensReviews" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLensReviewsInput",
}) as any as S.Schema<ListLensReviewsInput>;
export interface LensReviewSummary {
  LensAlias?: string;
  LensArn?: string;
  LensVersion?: string;
  LensName?: string;
  LensStatus?: LensStatus;
  UpdatedAt?: Date;
  RiskCounts?: { [key: string]: number | undefined };
  Profiles?: WorkloadProfile[];
  PrioritizedRiskCounts?: { [key: string]: number | undefined };
}
export const LensReviewSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LensAlias: S.optional(S.String),
    LensArn: S.optional(S.String),
    LensVersion: S.optional(S.String),
    LensName: S.optional(S.String),
    LensStatus: S.optional(LensStatus),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RiskCounts: S.optional(RiskCounts),
    Profiles: S.optional(WorkloadProfiles),
    PrioritizedRiskCounts: S.optional(RiskCounts),
  }),
).annotate({
  identifier: "LensReviewSummary",
}) as any as S.Schema<LensReviewSummary>;
export type LensReviewSummaries = LensReviewSummary[];
export const LensReviewSummaries = /*@__PURE__*/ S.Array(LensReviewSummary);
export interface ListLensReviewsOutput {
  WorkloadId?: string;
  MilestoneNumber?: number;
  LensReviewSummaries?: LensReviewSummary[];
  NextToken?: string;
}
export const ListLensReviewsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.optional(S.String),
    MilestoneNumber: S.optional(S.Number),
    LensReviewSummaries: S.optional(LensReviewSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLensReviewsOutput",
}) as any as S.Schema<ListLensReviewsOutput>;
export type SharedWithPrefix = string;
export type ShareStatus =
  | "ACCEPTED"
  | "REJECTED"
  | "PENDING"
  | "REVOKED"
  | "EXPIRED"
  | "ASSOCIATING"
  | "ASSOCIATED"
  | "FAILED"
  | (string & {});
export const ShareStatus = S.String;

export interface ListLensSharesInput {
  LensAlias: string;
  SharedWithPrefix?: string;
  NextToken?: string;
  MaxResults?: number;
  Status?: ShareStatus;
}
export const ListLensSharesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LensAlias: S.String.pipe(T.HttpLabel("LensAlias")),
    SharedWithPrefix: S.optional(S.String).pipe(
      T.HttpQuery("SharedWithPrefix"),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    Status: S.optional(ShareStatus).pipe(T.HttpQuery("Status")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/lenses/{LensAlias}/shares" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLensSharesInput",
}) as any as S.Schema<ListLensSharesInput>;
export interface LensShareSummary {
  ShareId?: string;
  SharedWith?: string;
  Status?: ShareStatus;
  StatusMessage?: string;
}
export const LensShareSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ShareId: S.optional(S.String),
    SharedWith: S.optional(S.String),
    Status: S.optional(ShareStatus),
    StatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "LensShareSummary",
}) as any as S.Schema<LensShareSummary>;
export type LensShareSummaries = LensShareSummary[];
export const LensShareSummaries = /*@__PURE__*/ S.Array(LensShareSummary);
export interface ListLensSharesOutput {
  LensShareSummaries?: LensShareSummary[];
  NextToken?: string;
}
export const ListLensSharesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LensShareSummaries: S.optional(LensShareSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLensSharesOutput",
}) as any as S.Schema<ListLensSharesOutput>;
export interface ListMilestonesInput {
  WorkloadId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListMilestonesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workloads/{WorkloadId}/milestonesSummaries",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMilestonesInput",
}) as any as S.Schema<ListMilestonesInput>;
export interface WorkloadSummary {
  WorkloadId?: string;
  WorkloadArn?: string;
  WorkloadName?: string;
  Owner?: string;
  UpdatedAt?: Date;
  Lenses?: string[];
  RiskCounts?: { [key: string]: number | undefined };
  ImprovementStatus?: WorkloadImprovementStatus;
  Profiles?: WorkloadProfile[];
  PrioritizedRiskCounts?: { [key: string]: number | undefined };
}
export const WorkloadSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.optional(S.String),
    WorkloadArn: S.optional(S.String),
    WorkloadName: S.optional(S.String),
    Owner: S.optional(S.String),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Lenses: S.optional(WorkloadLenses),
    RiskCounts: S.optional(RiskCounts),
    ImprovementStatus: S.optional(WorkloadImprovementStatus),
    Profiles: S.optional(WorkloadProfiles),
    PrioritizedRiskCounts: S.optional(RiskCounts),
  }),
).annotate({
  identifier: "WorkloadSummary",
}) as any as S.Schema<WorkloadSummary>;
export interface MilestoneSummary {
  MilestoneNumber?: number;
  MilestoneName?: string;
  RecordedAt?: Date;
  WorkloadSummary?: WorkloadSummary;
}
export const MilestoneSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MilestoneNumber: S.optional(S.Number),
    MilestoneName: S.optional(S.String),
    RecordedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    WorkloadSummary: S.optional(WorkloadSummary),
  }),
).annotate({
  identifier: "MilestoneSummary",
}) as any as S.Schema<MilestoneSummary>;
export type MilestoneSummaries = MilestoneSummary[];
export const MilestoneSummaries = /*@__PURE__*/ S.Array(MilestoneSummary);
export interface ListMilestonesOutput {
  WorkloadId?: string;
  MilestoneSummaries?: MilestoneSummary[];
  NextToken?: string;
}
export const ListMilestonesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.optional(S.String),
    MilestoneSummaries: S.optional(MilestoneSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMilestonesOutput",
}) as any as S.Schema<ListMilestonesOutput>;
export type ResourceArn = string;
export interface ListNotificationsInput {
  WorkloadId?: string;
  NextToken?: string;
  MaxResults?: number;
  ResourceArn?: string;
}
export const ListNotificationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    ResourceArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/notifications" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListNotificationsInput",
}) as any as S.Schema<ListNotificationsInput>;
export type NotificationType =
  | "LENS_VERSION_UPGRADED"
  | "LENS_VERSION_DEPRECATED"
  | (string & {});
export const NotificationType = S.String;

export interface LensUpgradeSummary {
  WorkloadId?: string;
  WorkloadName?: string;
  LensAlias?: string;
  LensArn?: string;
  CurrentLensVersion?: string;
  LatestLensVersion?: string;
  ResourceArn?: string;
  ResourceName?: string;
}
export const LensUpgradeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.optional(S.String),
    WorkloadName: S.optional(S.String),
    LensAlias: S.optional(S.String),
    LensArn: S.optional(S.String),
    CurrentLensVersion: S.optional(S.String),
    LatestLensVersion: S.optional(S.String),
    ResourceArn: S.optional(S.String),
    ResourceName: S.optional(S.String),
  }),
).annotate({
  identifier: "LensUpgradeSummary",
}) as any as S.Schema<LensUpgradeSummary>;
export interface NotificationSummary {
  Type?: NotificationType;
  LensUpgradeSummary?: LensUpgradeSummary;
}
export const NotificationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(NotificationType),
    LensUpgradeSummary: S.optional(LensUpgradeSummary),
  }),
).annotate({
  identifier: "NotificationSummary",
}) as any as S.Schema<NotificationSummary>;
export type NotificationSummaries = NotificationSummary[];
export const NotificationSummaries = /*@__PURE__*/ S.Array(NotificationSummary);
export interface ListNotificationsOutput {
  NotificationSummaries?: NotificationSummary[];
  NextToken?: string;
}
export const ListNotificationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotificationSummaries: S.optional(NotificationSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListNotificationsOutput",
}) as any as S.Schema<ListNotificationsOutput>;
export interface ListProfileNotificationsInput {
  WorkloadId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListProfileNotificationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.optional(S.String).pipe(T.HttpQuery("WorkloadId")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/profileNotifications" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProfileNotificationsInput",
}) as any as S.Schema<ListProfileNotificationsInput>;
export type ProfileNotificationType =
  | "PROFILE_ANSWERS_UPDATED"
  | "PROFILE_DELETED"
  | (string & {});
export const ProfileNotificationType = S.String;

export interface ProfileNotificationSummary {
  CurrentProfileVersion?: string;
  LatestProfileVersion?: string;
  Type?: ProfileNotificationType;
  ProfileArn?: string;
  ProfileName?: string;
  WorkloadId?: string;
  WorkloadName?: string;
}
export const ProfileNotificationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CurrentProfileVersion: S.optional(S.String),
    LatestProfileVersion: S.optional(S.String),
    Type: S.optional(ProfileNotificationType),
    ProfileArn: S.optional(S.String),
    ProfileName: S.optional(S.String),
    WorkloadId: S.optional(S.String),
    WorkloadName: S.optional(S.String),
  }),
).annotate({
  identifier: "ProfileNotificationSummary",
}) as any as S.Schema<ProfileNotificationSummary>;
export type ProfileNotificationSummaries = ProfileNotificationSummary[];
export const ProfileNotificationSummaries = /*@__PURE__*/ S.Array(
  ProfileNotificationSummary,
);
export interface ListProfileNotificationsOutput {
  NotificationSummaries?: ProfileNotificationSummary[];
  NextToken?: string;
}
export const ListProfileNotificationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotificationSummaries: S.optional(ProfileNotificationSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProfileNotificationsOutput",
}) as any as S.Schema<ListProfileNotificationsOutput>;
export type ProfileNamePrefix = string;
export type ProfileOwnerType = "SELF" | "SHARED" | (string & {});
export const ProfileOwnerType = S.String;

export interface ListProfilesInput {
  ProfileNamePrefix?: string;
  ProfileOwnerType?: ProfileOwnerType;
  NextToken?: string;
  MaxResults?: number;
}
export const ListProfilesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileNamePrefix: S.optional(S.String).pipe(
      T.HttpQuery("ProfileNamePrefix"),
    ),
    ProfileOwnerType: S.optional(ProfileOwnerType).pipe(
      T.HttpQuery("ProfileOwnerType"),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/profileSummaries" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProfilesInput",
}) as any as S.Schema<ListProfilesInput>;
export interface ProfileSummary {
  ProfileArn?: string;
  ProfileVersion?: string;
  ProfileName?: string;
  ProfileDescription?: string;
  Owner?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export const ProfileSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileArn: S.optional(S.String),
    ProfileVersion: S.optional(S.String),
    ProfileName: S.optional(S.String),
    ProfileDescription: S.optional(S.String),
    Owner: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "ProfileSummary" }) as any as S.Schema<ProfileSummary>;
export type ProfileSummaries = ProfileSummary[];
export const ProfileSummaries = /*@__PURE__*/ S.Array(ProfileSummary);
export interface ListProfilesOutput {
  ProfileSummaries?: ProfileSummary[];
  NextToken?: string;
}
export const ListProfilesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileSummaries: S.optional(ProfileSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProfilesOutput",
}) as any as S.Schema<ListProfilesOutput>;
export interface ListProfileSharesInput {
  ProfileArn: string;
  SharedWithPrefix?: string;
  NextToken?: string;
  MaxResults?: number;
  Status?: ShareStatus;
}
export const ListProfileSharesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileArn: S.String.pipe(T.HttpLabel("ProfileArn")),
    SharedWithPrefix: S.optional(S.String).pipe(
      T.HttpQuery("SharedWithPrefix"),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    Status: S.optional(ShareStatus).pipe(T.HttpQuery("Status")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/profiles/{ProfileArn}/shares" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProfileSharesInput",
}) as any as S.Schema<ListProfileSharesInput>;
export interface ProfileShareSummary {
  ShareId?: string;
  SharedWith?: string;
  Status?: ShareStatus;
  StatusMessage?: string;
}
export const ProfileShareSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ShareId: S.optional(S.String),
    SharedWith: S.optional(S.String),
    Status: S.optional(ShareStatus),
    StatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "ProfileShareSummary",
}) as any as S.Schema<ProfileShareSummary>;
export type ProfileShareSummaries = ProfileShareSummary[];
export const ProfileShareSummaries = /*@__PURE__*/ S.Array(ProfileShareSummary);
export interface ListProfileSharesOutput {
  ProfileShareSummaries?: ProfileShareSummary[];
  NextToken?: string;
}
export const ListProfileSharesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileShareSummaries: S.optional(ProfileShareSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProfileSharesOutput",
}) as any as S.Schema<ListProfileSharesOutput>;
export interface ListReviewTemplateAnswersInput {
  TemplateArn: string;
  LensAlias: string;
  PillarId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListReviewTemplateAnswersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateArn: S.String.pipe(T.HttpLabel("TemplateArn")),
    LensAlias: S.String.pipe(T.HttpLabel("LensAlias")),
    PillarId: S.optional(S.String).pipe(T.HttpQuery("PillarId")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/reviewTemplates/{TemplateArn}/lensReviews/{LensAlias}/answers",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReviewTemplateAnswersInput",
}) as any as S.Schema<ListReviewTemplateAnswersInput>;
export interface ReviewTemplateAnswerSummary {
  QuestionId?: string;
  PillarId?: string;
  QuestionTitle?: string;
  Choices?: Choice[];
  SelectedChoices?: string[];
  ChoiceAnswerSummaries?: ChoiceAnswerSummary[];
  IsApplicable?: boolean;
  AnswerStatus?: ReviewTemplateAnswerStatus;
  Reason?: AnswerReason;
  QuestionType?: QuestionType;
}
export const ReviewTemplateAnswerSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QuestionId: S.optional(S.String),
    PillarId: S.optional(S.String),
    QuestionTitle: S.optional(S.String),
    Choices: S.optional(Choices),
    SelectedChoices: S.optional(SelectedChoices),
    ChoiceAnswerSummaries: S.optional(ChoiceAnswerSummaries),
    IsApplicable: S.optional(S.Boolean),
    AnswerStatus: S.optional(ReviewTemplateAnswerStatus),
    Reason: S.optional(AnswerReason),
    QuestionType: S.optional(QuestionType),
  }),
).annotate({
  identifier: "ReviewTemplateAnswerSummary",
}) as any as S.Schema<ReviewTemplateAnswerSummary>;
export type ReviewTemplateAnswerSummaries = ReviewTemplateAnswerSummary[];
export const ReviewTemplateAnswerSummaries = /*@__PURE__*/ S.Array(
  ReviewTemplateAnswerSummary,
);
export interface ListReviewTemplateAnswersOutput {
  TemplateArn?: string;
  LensAlias?: string;
  AnswerSummaries?: ReviewTemplateAnswerSummary[];
  NextToken?: string;
}
export const ListReviewTemplateAnswersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateArn: S.optional(S.String),
    LensAlias: S.optional(S.String),
    AnswerSummaries: S.optional(ReviewTemplateAnswerSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListReviewTemplateAnswersOutput",
}) as any as S.Schema<ListReviewTemplateAnswersOutput>;
export interface ListReviewTemplatesInput {
  NextToken?: string;
  MaxResults?: number;
}
export const ListReviewTemplatesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/reviewTemplates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReviewTemplatesInput",
}) as any as S.Schema<ListReviewTemplatesInput>;
export interface ReviewTemplateSummary {
  Description?: string;
  Lenses?: string[];
  Owner?: string;
  UpdatedAt?: Date;
  TemplateArn?: string;
  TemplateName?: string;
  UpdateStatus?: ReviewTemplateUpdateStatus;
}
export const ReviewTemplateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    Lenses: S.optional(ReviewTemplateLenses),
    Owner: S.optional(S.String),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    TemplateArn: S.optional(S.String),
    TemplateName: S.optional(S.String),
    UpdateStatus: S.optional(ReviewTemplateUpdateStatus),
  }),
).annotate({
  identifier: "ReviewTemplateSummary",
}) as any as S.Schema<ReviewTemplateSummary>;
export type ReviewTemplates = ReviewTemplateSummary[];
export const ReviewTemplates = /*@__PURE__*/ S.Array(ReviewTemplateSummary);
export interface ListReviewTemplatesOutput {
  ReviewTemplates?: ReviewTemplateSummary[];
  NextToken?: string;
}
export const ListReviewTemplatesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReviewTemplates: S.optional(ReviewTemplates),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListReviewTemplatesOutput",
}) as any as S.Schema<ListReviewTemplatesOutput>;
export type WorkloadNamePrefix = string;
export type LensNamePrefix = string;
export type ShareResourceType =
  | "WORKLOAD"
  | "LENS"
  | "PROFILE"
  | "TEMPLATE"
  | (string & {});
export const ShareResourceType = S.String;

export type TemplateNamePrefix = string;
export interface ListShareInvitationsInput {
  WorkloadNamePrefix?: string;
  LensNamePrefix?: string;
  ShareResourceType?: ShareResourceType;
  NextToken?: string;
  MaxResults?: number;
  ProfileNamePrefix?: string;
  TemplateNamePrefix?: string;
}
export const ListShareInvitationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadNamePrefix: S.optional(S.String).pipe(
      T.HttpQuery("WorkloadNamePrefix"),
    ),
    LensNamePrefix: S.optional(S.String).pipe(T.HttpQuery("LensNamePrefix")),
    ShareResourceType: S.optional(ShareResourceType).pipe(
      T.HttpQuery("ShareResourceType"),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    ProfileNamePrefix: S.optional(S.String).pipe(
      T.HttpQuery("ProfileNamePrefix"),
    ),
    TemplateNamePrefix: S.optional(S.String).pipe(
      T.HttpQuery("TemplateNamePrefix"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/shareInvitations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListShareInvitationsInput",
}) as any as S.Schema<ListShareInvitationsInput>;
export interface ShareInvitationSummary {
  ShareInvitationId?: string;
  SharedBy?: string;
  SharedWith?: string;
  PermissionType?: PermissionType;
  ShareResourceType?: ShareResourceType;
  WorkloadName?: string;
  WorkloadId?: string;
  LensName?: string;
  LensArn?: string;
  ProfileName?: string;
  ProfileArn?: string;
  TemplateName?: string;
  TemplateArn?: string;
}
export const ShareInvitationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ShareInvitationId: S.optional(S.String),
    SharedBy: S.optional(S.String),
    SharedWith: S.optional(S.String),
    PermissionType: S.optional(PermissionType),
    ShareResourceType: S.optional(ShareResourceType),
    WorkloadName: S.optional(S.String),
    WorkloadId: S.optional(S.String),
    LensName: S.optional(S.String),
    LensArn: S.optional(S.String),
    ProfileName: S.optional(S.String),
    ProfileArn: S.optional(S.String),
    TemplateName: S.optional(S.String),
    TemplateArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ShareInvitationSummary",
}) as any as S.Schema<ShareInvitationSummary>;
export type ShareInvitationSummaries = ShareInvitationSummary[];
export const ShareInvitationSummaries = /*@__PURE__*/ S.Array(
  ShareInvitationSummary,
);
export interface ListShareInvitationsOutput {
  ShareInvitationSummaries?: ShareInvitationSummary[];
  NextToken?: string;
}
export const ListShareInvitationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ShareInvitationSummaries: S.optional(ShareInvitationSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListShareInvitationsOutput",
}) as any as S.Schema<ListShareInvitationsOutput>;
export interface ListTagsForResourceInput {
  WorkloadArn: string;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WorkloadArn: S.String.pipe(T.HttpLabel("WorkloadArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{WorkloadArn}" }),
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
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export interface ListTemplateSharesInput {
  TemplateArn: string;
  SharedWithPrefix?: string;
  NextToken?: string;
  MaxResults?: number;
  Status?: ShareStatus;
}
export const ListTemplateSharesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateArn: S.String.pipe(T.HttpLabel("TemplateArn")),
    SharedWithPrefix: S.optional(S.String).pipe(
      T.HttpQuery("SharedWithPrefix"),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    Status: S.optional(ShareStatus).pipe(T.HttpQuery("Status")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/templates/shares/{TemplateArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTemplateSharesInput",
}) as any as S.Schema<ListTemplateSharesInput>;
export interface TemplateShareSummary {
  ShareId?: string;
  SharedWith?: string;
  Status?: ShareStatus;
  StatusMessage?: string;
}
export const TemplateShareSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ShareId: S.optional(S.String),
    SharedWith: S.optional(S.String),
    Status: S.optional(ShareStatus),
    StatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "TemplateShareSummary",
}) as any as S.Schema<TemplateShareSummary>;
export type TemplateShareSummaries = TemplateShareSummary[];
export const TemplateShareSummaries =
  /*@__PURE__*/ S.Array(TemplateShareSummary);
export interface ListTemplateSharesOutput {
  TemplateArn?: string;
  TemplateShareSummaries?: TemplateShareSummary[];
  NextToken?: string;
}
export const ListTemplateSharesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateArn: S.optional(S.String),
    TemplateShareSummaries: S.optional(TemplateShareSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTemplateSharesOutput",
}) as any as S.Schema<ListTemplateSharesOutput>;
export interface ListWorkloadsInput {
  WorkloadNamePrefix?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListWorkloadsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadNamePrefix: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/workloadsSummaries" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWorkloadsInput",
}) as any as S.Schema<ListWorkloadsInput>;
export type WorkloadSummaries = WorkloadSummary[];
export const WorkloadSummaries = /*@__PURE__*/ S.Array(WorkloadSummary);
export interface ListWorkloadsOutput {
  WorkloadSummaries?: WorkloadSummary[];
  NextToken?: string;
}
export const ListWorkloadsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadSummaries: S.optional(WorkloadSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWorkloadsOutput",
}) as any as S.Schema<ListWorkloadsOutput>;
export interface ListWorkloadSharesInput {
  WorkloadId: string;
  SharedWithPrefix?: string;
  NextToken?: string;
  MaxResults?: number;
  Status?: ShareStatus;
}
export const ListWorkloadSharesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")),
    SharedWithPrefix: S.optional(S.String).pipe(
      T.HttpQuery("SharedWithPrefix"),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    Status: S.optional(ShareStatus).pipe(T.HttpQuery("Status")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/workloads/{WorkloadId}/shares" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWorkloadSharesInput",
}) as any as S.Schema<ListWorkloadSharesInput>;
export interface WorkloadShareSummary {
  ShareId?: string;
  SharedWith?: string;
  PermissionType?: PermissionType;
  Status?: ShareStatus;
  StatusMessage?: string;
}
export const WorkloadShareSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ShareId: S.optional(S.String),
    SharedWith: S.optional(S.String),
    PermissionType: S.optional(PermissionType),
    Status: S.optional(ShareStatus),
    StatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkloadShareSummary",
}) as any as S.Schema<WorkloadShareSummary>;
export type WorkloadShareSummaries = WorkloadShareSummary[];
export const WorkloadShareSummaries =
  /*@__PURE__*/ S.Array(WorkloadShareSummary);
export interface ListWorkloadSharesOutput {
  WorkloadId?: string;
  WorkloadShareSummaries?: WorkloadShareSummary[];
  NextToken?: string;
}
export const ListWorkloadSharesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.optional(S.String),
    WorkloadShareSummaries: S.optional(WorkloadShareSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWorkloadSharesOutput",
}) as any as S.Schema<ListWorkloadSharesOutput>;
export type RecommendationFeedbackType =
  | "USEFUL"
  | "NOT_USEFUL"
  | (string & {});
export const RecommendationFeedbackType = S.String;

export type FeedbackCategory =
  | "OTHER"
  | "RECOMMENDATION_NOT_RELEVANT"
  | "RESOURCE_NOT_IMPORTANT"
  | "RESOURCE_TYPE_NOT_IMPORTANT"
  | "RECOMMENDATION_INCORRECT"
  | (string & {});
export const FeedbackCategory = S.String;

export interface PutAgentRecommendationFeedbackRequest {
  recommendationArn: string;
  type: RecommendationFeedbackType;
  feedbackCategory?: FeedbackCategory;
  comments?: string;
}
export const PutAgentRecommendationFeedbackRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      recommendationArn: S.String.pipe(T.HttpLabel("recommendationArn")),
      type: RecommendationFeedbackType,
      feedbackCategory: S.optional(FeedbackCategory),
      comments: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/api/v1/agent-recommendations/{recommendationArn}/feedback",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutAgentRecommendationFeedbackRequest",
}) as any as S.Schema<PutAgentRecommendationFeedbackRequest>;
export interface PutAgentRecommendationFeedbackResponse {}
export const PutAgentRecommendationFeedbackResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "PutAgentRecommendationFeedbackResponse",
}) as any as S.Schema<PutAgentRecommendationFeedbackResponse>;
export type RecommendationTypes = RecommendationType[];
export const RecommendationTypes = /*@__PURE__*/ S.Array(RecommendationType);
export interface StartAgentRecommendationGenerationRequest {
  profileArn: string;
  types: RecommendationType[];
  name?: string;
  additionalContext?: any;
  scope: Scope;
}
export const StartAgentRecommendationGenerationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      profileArn: S.String.pipe(T.HttpLabel("profileArn")),
      types: RecommendationTypes,
      name: S.optional(S.String),
      additionalContext: S.optional(S.Any),
      scope: Scope,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/api/v1/agent-profiles/{profileArn}/generations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "StartAgentRecommendationGenerationRequest",
  }) as any as S.Schema<StartAgentRecommendationGenerationRequest>;
export interface StartAgentRecommendationGenerationResponse {
  id: string;
  profileArn: string;
  name?: string;
  status: GenerationStatus;
  estimatedCompletionTime?: Date;
  createdBy: string;
  createdAt: Date;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
}
export const StartAgentRecommendationGenerationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      id: S.String,
      profileArn: S.String,
      name: S.optional(S.String),
      status: GenerationStatus,
      estimatedCompletionTime: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      createdBy: S.String,
      createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      lastModifiedBy: S.optional(S.String),
      lastModifiedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
    }),
  ).annotate({
    identifier: "StartAgentRecommendationGenerationResponse",
  }) as any as S.Schema<StartAgentRecommendationGenerationResponse>;
export interface TagResourceInput {
  WorkloadArn: string;
  Tags?: { [key: string]: string | undefined };
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadArn: S.String.pipe(T.HttpLabel("WorkloadArn")),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{WorkloadArn}" }),
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
  S.Struct({}),
).annotate({
  identifier: "TagResourceOutput",
}) as any as S.Schema<TagResourceOutput>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  WorkloadArn: string;
  TagKeys?: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadArn: S.String.pipe(T.HttpLabel("WorkloadArn")),
    TagKeys: S.optional(TagKeyList).pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{WorkloadArn}" }),
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
  S.Struct({}),
).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export interface UpdateAgentContextRequest {
  clientToken?: string;
  profileArn: string;
  id: string;
  title?: string | redacted.Redacted<string>;
  content?: ContextContent;
}
export const UpdateAgentContextRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    profileArn: S.String.pipe(T.HttpLabel("profileArn")),
    id: S.String.pipe(T.HttpLabel("id")),
    title: S.optional(SensitiveString),
    content: S.optional(ContextContent),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/api/v1/agent-profiles/{profileArn}/contexts/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAgentContextRequest",
}) as any as S.Schema<UpdateAgentContextRequest>;
export interface UpdateAgentContextResponse {
  context: ContextSummary;
}
export const UpdateAgentContextResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ context: ContextSummary }),
).annotate({
  identifier: "UpdateAgentContextResponse",
}) as any as S.Schema<UpdateAgentContextResponse>;
export interface UpdateAgentGoalRequest {
  clientToken?: string;
  profileArn: string;
  id: string;
  pillars?: Pillar[];
  title?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
}
export const UpdateAgentGoalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    profileArn: S.String.pipe(T.HttpLabel("profileArn")),
    id: S.String.pipe(T.HttpLabel("id")),
    pillars: S.optional(Pillars),
    title: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/api/v1/agent-profiles/{profileArn}/goals/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAgentGoalRequest",
}) as any as S.Schema<UpdateAgentGoalRequest>;
export interface UpdateAgentGoalResponse {
  goal: GoalSummary;
}
export const UpdateAgentGoalResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ goal: GoalSummary }),
).annotate({
  identifier: "UpdateAgentGoalResponse",
}) as any as S.Schema<UpdateAgentGoalResponse>;
export interface UpdateAgentProfileRequest {
  clientToken?: string;
  profileArn: string;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  executionRoleArn?: string;
  aggregationConfiguration?: AggregationConfiguration[];
  businessOverview?: string | redacted.Redacted<string>;
  pillars?: Pillar[];
  deletionProtection?: boolean;
}
export const UpdateAgentProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    profileArn: S.String.pipe(T.HttpLabel("profileArn")),
    displayName: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    executionRoleArn: S.optional(S.String),
    aggregationConfiguration: S.optional(AggregationConfigurations),
    businessOverview: S.optional(SensitiveString),
    pillars: S.optional(Pillars),
    deletionProtection: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/api/v1/agent-profiles/{profileArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAgentProfileRequest",
}) as any as S.Schema<UpdateAgentProfileRequest>;
export interface UpdateAgentProfileResponse {
  name: string;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  businessOverview?: string | redacted.Redacted<string>;
  pillars: Pillar[];
  deletionProtection?: boolean;
  executionRoleArn: string;
  aggregationConfiguration: AggregationConfiguration[];
  arn: string;
  eligibleForScheduledGeneration?: boolean;
  eligibleForArchitectureGeneration?: boolean;
  fieldErrors?: { [key: string]: string | undefined };
  tags?: Tag[];
  createdBy: string;
  createdAt: Date;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
}
export const UpdateAgentProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    displayName: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    businessOverview: S.optional(SensitiveString),
    pillars: Pillars,
    deletionProtection: S.optional(S.Boolean),
    executionRoleArn: S.String,
    aggregationConfiguration: AggregationConfigurations,
    arn: S.String,
    eligibleForScheduledGeneration: S.optional(S.Boolean),
    eligibleForArchitectureGeneration: S.optional(S.Boolean),
    fieldErrors: S.optional(FieldErrors),
    tags: S.optional(Tags),
    createdBy: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModifiedBy: S.optional(S.String),
    lastModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "UpdateAgentProfileResponse",
}) as any as S.Schema<UpdateAgentProfileResponse>;
export interface UpdateAgentRecommendationStatusRequest {
  recommendationArn: string;
  status: RecommendationStatus;
  updateReason?: string | redacted.Redacted<string>;
}
export const UpdateAgentRecommendationStatusRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      recommendationArn: S.String.pipe(T.HttpLabel("recommendationArn")),
      status: RecommendationStatus,
      updateReason: S.optional(SensitiveString),
    }).pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/api/v1/agent-recommendations/{recommendationArn}/status",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateAgentRecommendationStatusRequest",
}) as any as S.Schema<UpdateAgentRecommendationStatusRequest>;
export interface UpdateAgentRecommendationStatusResponse {}
export const UpdateAgentRecommendationStatusResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateAgentRecommendationStatusResponse",
}) as any as S.Schema<UpdateAgentRecommendationStatusResponse>;
export interface ChoiceUpdate {
  Status?: ChoiceStatus;
  Reason?: ChoiceReason;
  Notes?: string;
}
export const ChoiceUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(ChoiceStatus),
    Reason: S.optional(ChoiceReason),
    Notes: S.optional(S.String),
  }),
).annotate({ identifier: "ChoiceUpdate" }) as any as S.Schema<ChoiceUpdate>;
export type ChoiceUpdates = { [key: string]: ChoiceUpdate | undefined };
export const ChoiceUpdates = /*@__PURE__*/ S.Record(
  S.String,
  ChoiceUpdate.pipe(S.optional),
);
export interface UpdateAnswerInput {
  WorkloadId: string;
  LensAlias: string;
  QuestionId: string;
  SelectedChoices?: string[];
  ChoiceUpdates?: { [key: string]: ChoiceUpdate | undefined };
  Notes?: string;
  IsApplicable?: boolean;
  Reason?: AnswerReason;
}
export const UpdateAnswerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")),
    LensAlias: S.String.pipe(T.HttpLabel("LensAlias")),
    QuestionId: S.String.pipe(T.HttpLabel("QuestionId")),
    SelectedChoices: S.optional(SelectedChoices),
    ChoiceUpdates: S.optional(ChoiceUpdates),
    Notes: S.optional(S.String),
    IsApplicable: S.optional(S.Boolean),
    Reason: S.optional(AnswerReason),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/workloads/{WorkloadId}/lensReviews/{LensAlias}/answers/{QuestionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAnswerInput",
}) as any as S.Schema<UpdateAnswerInput>;
export interface UpdateAnswerOutput {
  WorkloadId?: string;
  LensAlias?: string;
  LensArn?: string;
  Answer?: Answer;
}
export const UpdateAnswerOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.optional(S.String),
    LensAlias: S.optional(S.String),
    LensArn: S.optional(S.String),
    Answer: S.optional(Answer),
  }),
).annotate({
  identifier: "UpdateAnswerOutput",
}) as any as S.Schema<UpdateAnswerOutput>;
export type IntegrationStatusInput = "NOT_CONFIGURED" | (string & {});
export const IntegrationStatusInput = S.String;

export interface AccountJiraConfigurationInput {
  IssueManagementStatus?: AccountJiraIssueManagementStatus;
  IssueManagementType?: IssueManagementType;
  JiraProjectKey?: string;
  IntegrationStatus?: IntegrationStatusInput;
}
export const AccountJiraConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IssueManagementStatus: S.optional(AccountJiraIssueManagementStatus),
    IssueManagementType: S.optional(IssueManagementType),
    JiraProjectKey: S.optional(S.String),
    IntegrationStatus: S.optional(IntegrationStatusInput),
  }),
).annotate({
  identifier: "AccountJiraConfigurationInput",
}) as any as S.Schema<AccountJiraConfigurationInput>;
export interface UpdateGlobalSettingsInput {
  OrganizationSharingStatus?: OrganizationSharingStatus;
  DiscoveryIntegrationStatus?: DiscoveryIntegrationStatus;
  JiraConfiguration?: AccountJiraConfigurationInput;
}
export const UpdateGlobalSettingsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationSharingStatus: S.optional(OrganizationSharingStatus),
    DiscoveryIntegrationStatus: S.optional(DiscoveryIntegrationStatus),
    JiraConfiguration: S.optional(AccountJiraConfigurationInput),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/global-settings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGlobalSettingsInput",
}) as any as S.Schema<UpdateGlobalSettingsInput>;
export interface UpdateGlobalSettingsResponse {}
export const UpdateGlobalSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateGlobalSettingsResponse",
}) as any as S.Schema<UpdateGlobalSettingsResponse>;
export type IntegratingService = "JIRA" | (string & {});
export const IntegratingService = S.String;

export interface UpdateIntegrationInput {
  WorkloadId: string;
  ClientRequestToken?: string;
  IntegratingService?: IntegratingService;
}
export const UpdateIntegrationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    IntegratingService: S.optional(IntegratingService),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workloads/{WorkloadId}/updateIntegration",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateIntegrationInput",
}) as any as S.Schema<UpdateIntegrationInput>;
export interface UpdateIntegrationResponse {}
export const UpdateIntegrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateIntegrationResponse",
}) as any as S.Schema<UpdateIntegrationResponse>;
export type PillarNotes = { [key: string]: string | undefined };
export const PillarNotes = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface UpdateLensReviewInput {
  WorkloadId: string;
  LensAlias: string;
  LensNotes?: string;
  PillarNotes?: { [key: string]: string | undefined };
  JiraConfiguration?: JiraSelectedQuestionConfiguration;
}
export const UpdateLensReviewInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")),
    LensAlias: S.String.pipe(T.HttpLabel("LensAlias")),
    LensNotes: S.optional(S.String),
    PillarNotes: S.optional(PillarNotes),
    JiraConfiguration: S.optional(JiraSelectedQuestionConfiguration),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/workloads/{WorkloadId}/lensReviews/{LensAlias}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateLensReviewInput",
}) as any as S.Schema<UpdateLensReviewInput>;
export interface UpdateLensReviewOutput {
  WorkloadId?: string;
  LensReview?: LensReview;
}
export const UpdateLensReviewOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.optional(S.String),
    LensReview: S.optional(LensReview),
  }),
).annotate({
  identifier: "UpdateLensReviewOutput",
}) as any as S.Schema<UpdateLensReviewOutput>;
export interface UpdateProfileInput {
  ProfileArn: string;
  ProfileDescription?: string;
  ProfileQuestions?: ProfileQuestionUpdate[];
}
export const UpdateProfileInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileArn: S.String.pipe(T.HttpLabel("ProfileArn")),
    ProfileDescription: S.optional(S.String),
    ProfileQuestions: S.optional(ProfileQuestionUpdates),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/profiles/{ProfileArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateProfileInput",
}) as any as S.Schema<UpdateProfileInput>;
export interface UpdateProfileOutput {
  Profile?: Profile;
}
export const UpdateProfileOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Profile: S.optional(Profile) }),
).annotate({
  identifier: "UpdateProfileOutput",
}) as any as S.Schema<UpdateProfileOutput>;
export type ReviewTemplateLensAliases = string[];
export const ReviewTemplateLensAliases = /*@__PURE__*/ S.Array(S.String);
export interface UpdateReviewTemplateInput {
  TemplateArn: string;
  TemplateName?: string;
  Description?: string;
  Notes?: string;
  LensesToAssociate?: string[];
  LensesToDisassociate?: string[];
}
export const UpdateReviewTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateArn: S.String.pipe(T.HttpLabel("TemplateArn")),
    TemplateName: S.optional(S.String),
    Description: S.optional(S.String),
    Notes: S.optional(S.String),
    LensesToAssociate: S.optional(ReviewTemplateLensAliases),
    LensesToDisassociate: S.optional(ReviewTemplateLensAliases),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/reviewTemplates/{TemplateArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateReviewTemplateInput",
}) as any as S.Schema<UpdateReviewTemplateInput>;
export interface UpdateReviewTemplateOutput {
  ReviewTemplate?: ReviewTemplate;
}
export const UpdateReviewTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReviewTemplate: S.optional(ReviewTemplate) }),
).annotate({
  identifier: "UpdateReviewTemplateOutput",
}) as any as S.Schema<UpdateReviewTemplateOutput>;
export interface UpdateReviewTemplateAnswerInput {
  TemplateArn: string;
  LensAlias: string;
  QuestionId: string;
  SelectedChoices?: string[];
  ChoiceUpdates?: { [key: string]: ChoiceUpdate | undefined };
  Notes?: string;
  IsApplicable?: boolean;
  Reason?: AnswerReason;
}
export const UpdateReviewTemplateAnswerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateArn: S.String.pipe(T.HttpLabel("TemplateArn")),
    LensAlias: S.String.pipe(T.HttpLabel("LensAlias")),
    QuestionId: S.String.pipe(T.HttpLabel("QuestionId")),
    SelectedChoices: S.optional(SelectedChoices),
    ChoiceUpdates: S.optional(ChoiceUpdates),
    Notes: S.optional(S.String),
    IsApplicable: S.optional(S.Boolean),
    Reason: S.optional(AnswerReason),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/reviewTemplates/{TemplateArn}/lensReviews/{LensAlias}/answers/{QuestionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateReviewTemplateAnswerInput",
}) as any as S.Schema<UpdateReviewTemplateAnswerInput>;
export interface UpdateReviewTemplateAnswerOutput {
  TemplateArn?: string;
  LensAlias?: string;
  Answer?: ReviewTemplateAnswer;
}
export const UpdateReviewTemplateAnswerOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateArn: S.optional(S.String),
    LensAlias: S.optional(S.String),
    Answer: S.optional(ReviewTemplateAnswer),
  }),
).annotate({
  identifier: "UpdateReviewTemplateAnswerOutput",
}) as any as S.Schema<UpdateReviewTemplateAnswerOutput>;
export interface UpdateReviewTemplateLensReviewInput {
  TemplateArn: string;
  LensAlias: string;
  LensNotes?: string;
  PillarNotes?: { [key: string]: string | undefined };
}
export const UpdateReviewTemplateLensReviewInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateArn: S.String.pipe(T.HttpLabel("TemplateArn")),
    LensAlias: S.String.pipe(T.HttpLabel("LensAlias")),
    LensNotes: S.optional(S.String),
    PillarNotes: S.optional(PillarNotes),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/reviewTemplates/{TemplateArn}/lensReviews/{LensAlias}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateReviewTemplateLensReviewInput",
}) as any as S.Schema<UpdateReviewTemplateLensReviewInput>;
export interface UpdateReviewTemplateLensReviewOutput {
  TemplateArn?: string;
  LensReview?: ReviewTemplateLensReview;
}
export const UpdateReviewTemplateLensReviewOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TemplateArn: S.optional(S.String),
      LensReview: S.optional(ReviewTemplateLensReview),
    }),
).annotate({
  identifier: "UpdateReviewTemplateLensReviewOutput",
}) as any as S.Schema<UpdateReviewTemplateLensReviewOutput>;
export type ShareInvitationAction = "ACCEPT" | "REJECT" | (string & {});
export const ShareInvitationAction = S.String;

export interface UpdateShareInvitationInput {
  ShareInvitationId: string;
  ShareInvitationAction?: ShareInvitationAction;
}
export const UpdateShareInvitationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ShareInvitationId: S.String.pipe(T.HttpLabel("ShareInvitationId")),
    ShareInvitationAction: S.optional(ShareInvitationAction),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/shareInvitations/{ShareInvitationId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateShareInvitationInput",
}) as any as S.Schema<UpdateShareInvitationInput>;
export interface ShareInvitation {
  ShareInvitationId?: string;
  ShareResourceType?: ShareResourceType;
  WorkloadId?: string;
  LensAlias?: string;
  LensArn?: string;
  ProfileArn?: string;
  TemplateArn?: string;
}
export const ShareInvitation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ShareInvitationId: S.optional(S.String),
    ShareResourceType: S.optional(ShareResourceType),
    WorkloadId: S.optional(S.String),
    LensAlias: S.optional(S.String),
    LensArn: S.optional(S.String),
    ProfileArn: S.optional(S.String),
    TemplateArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ShareInvitation",
}) as any as S.Schema<ShareInvitation>;
export interface UpdateShareInvitationOutput {
  ShareInvitation?: ShareInvitation;
}
export const UpdateShareInvitationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ShareInvitation: S.optional(ShareInvitation) }),
).annotate({
  identifier: "UpdateShareInvitationOutput",
}) as any as S.Schema<UpdateShareInvitationOutput>;
export interface UpdateWorkloadInput {
  WorkloadId: string;
  WorkloadName?: string;
  Description?: string;
  Environment?: WorkloadEnvironment;
  AccountIds?: string[];
  AwsRegions?: string[];
  NonAwsRegions?: string[];
  PillarPriorities?: string[];
  ArchitecturalDesign?: string;
  ReviewOwner?: string;
  IsReviewOwnerUpdateAcknowledged?: boolean;
  IndustryType?: string;
  Industry?: string;
  Notes?: string;
  ImprovementStatus?: WorkloadImprovementStatus;
  DiscoveryConfig?: WorkloadDiscoveryConfig;
  Applications?: string[];
  JiraConfiguration?: WorkloadJiraConfigurationInput;
}
export const UpdateWorkloadInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")),
    WorkloadName: S.optional(S.String),
    Description: S.optional(S.String),
    Environment: S.optional(WorkloadEnvironment),
    AccountIds: S.optional(WorkloadAccountIds),
    AwsRegions: S.optional(WorkloadAwsRegions),
    NonAwsRegions: S.optional(WorkloadNonAwsRegions),
    PillarPriorities: S.optional(WorkloadPillarPriorities),
    ArchitecturalDesign: S.optional(S.String),
    ReviewOwner: S.optional(S.String),
    IsReviewOwnerUpdateAcknowledged: S.optional(S.Boolean),
    IndustryType: S.optional(S.String),
    Industry: S.optional(S.String),
    Notes: S.optional(S.String),
    ImprovementStatus: S.optional(WorkloadImprovementStatus),
    DiscoveryConfig: S.optional(WorkloadDiscoveryConfig),
    Applications: S.optional(WorkloadApplications),
    JiraConfiguration: S.optional(WorkloadJiraConfigurationInput),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/workloads/{WorkloadId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateWorkloadInput",
}) as any as S.Schema<UpdateWorkloadInput>;
export interface UpdateWorkloadOutput {
  Workload?: Workload;
}
export const UpdateWorkloadOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Workload: S.optional(Workload) }),
).annotate({
  identifier: "UpdateWorkloadOutput",
}) as any as S.Schema<UpdateWorkloadOutput>;
export interface UpdateWorkloadShareInput {
  ShareId: string;
  WorkloadId: string;
  PermissionType?: PermissionType;
}
export const UpdateWorkloadShareInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ShareId: S.String.pipe(T.HttpLabel("ShareId")),
    WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")),
    PermissionType: S.optional(PermissionType),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/workloads/{WorkloadId}/shares/{ShareId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateWorkloadShareInput",
}) as any as S.Schema<UpdateWorkloadShareInput>;
export interface WorkloadShare {
  ShareId?: string;
  SharedBy?: string;
  SharedWith?: string;
  PermissionType?: PermissionType;
  Status?: ShareStatus;
  WorkloadName?: string;
  WorkloadId?: string;
}
export const WorkloadShare = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ShareId: S.optional(S.String),
    SharedBy: S.optional(S.String),
    SharedWith: S.optional(S.String),
    PermissionType: S.optional(PermissionType),
    Status: S.optional(ShareStatus),
    WorkloadName: S.optional(S.String),
    WorkloadId: S.optional(S.String),
  }),
).annotate({ identifier: "WorkloadShare" }) as any as S.Schema<WorkloadShare>;
export interface UpdateWorkloadShareOutput {
  WorkloadId?: string;
  WorkloadShare?: WorkloadShare;
}
export const UpdateWorkloadShareOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.optional(S.String),
    WorkloadShare: S.optional(WorkloadShare),
  }),
).annotate({
  identifier: "UpdateWorkloadShareOutput",
}) as any as S.Schema<UpdateWorkloadShareOutput>;
export interface UpgradeLensReviewInput {
  WorkloadId: string;
  LensAlias: string;
  MilestoneName?: string;
  ClientRequestToken?: string;
}
export const UpgradeLensReviewInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")),
    LensAlias: S.String.pipe(T.HttpLabel("LensAlias")),
    MilestoneName: S.optional(S.String),
    ClientRequestToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/workloads/{WorkloadId}/lensReviews/{LensAlias}/upgrade",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpgradeLensReviewInput",
}) as any as S.Schema<UpgradeLensReviewInput>;
export interface UpgradeLensReviewResponse {}
export const UpgradeLensReviewResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpgradeLensReviewResponse",
}) as any as S.Schema<UpgradeLensReviewResponse>;
export interface UpgradeProfileVersionInput {
  WorkloadId: string;
  ProfileArn: string;
  MilestoneName?: string;
  ClientRequestToken?: string;
}
export const UpgradeProfileVersionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.String.pipe(T.HttpLabel("WorkloadId")),
    ProfileArn: S.String.pipe(T.HttpLabel("ProfileArn")),
    MilestoneName: S.optional(S.String),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/workloads/{WorkloadId}/profiles/{ProfileArn}/upgrade",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpgradeProfileVersionInput",
}) as any as S.Schema<UpgradeProfileVersionInput>;
export interface UpgradeProfileVersionResponse {}
export const UpgradeProfileVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpgradeProfileVersionResponse",
}) as any as S.Schema<UpgradeProfileVersionResponse>;
export interface UpgradeReviewTemplateLensReviewInput {
  TemplateArn: string;
  LensAlias: string;
  ClientRequestToken?: string;
}
export const UpgradeReviewTemplateLensReviewInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TemplateArn: S.String.pipe(T.HttpLabel("TemplateArn")),
      LensAlias: S.String.pipe(T.HttpLabel("LensAlias")),
      ClientRequestToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/reviewTemplates/{TemplateArn}/lensReviews/{LensAlias}/upgrade",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpgradeReviewTemplateLensReviewInput",
}) as any as S.Schema<UpgradeReviewTemplateLensReviewInput>;
export interface UpgradeReviewTemplateLensReviewResponse {}
export const UpgradeReviewTemplateLensReviewResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpgradeReviewTemplateLensReviewResponse",
}) as any as S.Schema<UpgradeReviewTemplateLensReviewResponse>;
export type ExceptionMessage = string;
export type ExceptionResourceId = string;
export type ExceptionResourceType = string;
export type QuotaCode = string;
export type ServiceCode = string;
export type ValidationExceptionReason =
  | "UNKNOWN_OPERATION"
  | "CANNOT_PARSE"
  | "FIELD_VALIDATION_FAILED"
  | "OTHER"
  | (string & {});
export const ValidationExceptionReason = S.String;

export type ValidationExceptionFieldName = string;
export interface ValidationExceptionField {
  Name?: string;
  Message?: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Message: S.optional(S.String) }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export type AssociateLensesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associate a lens to a workload.
 *
 * Up to 10 lenses can be associated with a workload in a single API operation. A maximum of 20 lenses can be associated with a workload.
 *
 * **Disclaimer**
 *
 * By accessing and/or applying custom lenses created by another Amazon Web Services user or account, you acknowledge that custom lenses created by other users and shared with you are Third Party Content as defined in the Amazon Web Services Customer Agreement.
 */
export const associateLenses: API.OperationMethod<
  AssociateLensesInput,
  AssociateLensesResponse,
  AssociateLensesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateLensesInput,
  output: AssociateLensesResponse,
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
  operationName: "AssociateLenses",
}));

export type AssociateProfilesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associate a profile with a workload.
 */
export const associateProfiles: API.OperationMethod<
  AssociateProfilesInput,
  AssociateProfilesResponse,
  AssociateProfilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateProfilesInput,
  output: AssociateProfilesResponse,
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
  operationName: "AssociateProfiles",
}));

export type CreateAgentContextError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a context associated with an optimization profile. Contexts provide application and environment information used during recommendation generation.
 */
export const createAgentContext: API.OperationMethod<
  CreateAgentContextRequest,
  CreateAgentContextResponse,
  CreateAgentContextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAgentContextRequest,
  output: CreateAgentContextResponse,
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
  operationName: "CreateAgentContext",
}));

export type CreateAgentGoalError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an optimization goal associated with a profile. Goals define specific targets and objectives for the optimization process.
 */
export const createAgentGoal: API.OperationMethod<
  CreateAgentGoalRequest,
  CreateAgentGoalResponse,
  CreateAgentGoalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAgentGoalRequest,
  output: CreateAgentGoalResponse,
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
  operationName: "CreateAgentGoal",
}));

export type CreateAgentProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an optimization profile that defines the scope and configuration for generating recommendations. A profile specifies the execution role, target pillars, and aggregation settings for analyzing your Amazon Web Services resources.
 */
export const createAgentProfile: API.OperationMethod<
  CreateAgentProfileRequest,
  CreateAgentProfileResponse,
  CreateAgentProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAgentProfileRequest,
  output: CreateAgentProfileResponse,
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
  operationName: "CreateAgentProfile",
}));

export type CreateLensShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a lens share.
 *
 * The owner of a lens can share it with other Amazon Web Services accounts, users, an organization, and organizational units (OUs) in the same Amazon Web Services Region. Lenses provided by Amazon Web Services (Amazon Web Services Official Content) cannot be shared.
 *
 * Shared access to a lens is not removed until the lens invitation is deleted.
 *
 * If you share a lens with an organization or OU, all accounts in the organization or OU are granted access to the lens.
 *
 * For more information, see Sharing a custom lens in the *Well-Architected Tool User Guide*.
 *
 * **Disclaimer**
 *
 * By sharing your custom lenses with other Amazon Web Services accounts, you acknowledge that Amazon Web Services will make your custom lenses available to those other accounts. Those other accounts may continue to access and use your shared custom lenses even if you delete the custom lenses from your own Amazon Web Services account or terminate your Amazon Web Services account.
 */
export const createLensShare: API.OperationMethod<
  CreateLensShareInput,
  CreateLensShareOutput,
  CreateLensShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLensShareInput,
  output: CreateLensShareOutput,
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
  operationName: "CreateLensShare",
}));

export type CreateLensVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a new lens version.
 *
 * A lens can have up to 100 versions.
 *
 * Use this operation to publish a new lens version after you have imported a lens. The `LensAlias` is used to identify the lens to be published. The owner of a lens can share the lens with other Amazon Web Services accounts and users in the same Amazon Web Services Region. Only the owner of a lens can delete it.
 */
export const createLensVersion: API.OperationMethod<
  CreateLensVersionInput,
  CreateLensVersionOutput,
  CreateLensVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLensVersionInput,
  output: CreateLensVersionOutput,
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
  operationName: "CreateLensVersion",
}));

export type CreateMilestoneError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a milestone for an existing workload.
 */
export const createMilestone: API.OperationMethod<
  CreateMilestoneInput,
  CreateMilestoneOutput,
  CreateMilestoneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMilestoneInput,
  output: CreateMilestoneOutput,
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
  operationName: "CreateMilestone",
}));

export type CreateProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a profile.
 */
export const createProfile: API.OperationMethod<
  CreateProfileInput,
  CreateProfileOutput,
  CreateProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProfileInput,
  output: CreateProfileOutput,
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
  operationName: "CreateProfile",
}));

export type CreateProfileShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a profile share.
 */
export const createProfileShare: API.OperationMethod<
  CreateProfileShareInput,
  CreateProfileShareOutput,
  CreateProfileShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProfileShareInput,
  output: CreateProfileShareOutput,
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
  operationName: "CreateProfileShare",
}));

export type CreateReviewTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a review template.
 *
 * **Disclaimer**
 *
 * Do not include or gather personal identifiable information (PII) of end users or other identifiable individuals in or via your review templates. If your review template or those shared with you and used in your account do include or collect PII you are responsible for: ensuring that the included PII is processed in accordance with applicable law, providing adequate privacy notices, and obtaining necessary consents for processing such data.
 */
export const createReviewTemplate: API.OperationMethod<
  CreateReviewTemplateInput,
  CreateReviewTemplateOutput,
  CreateReviewTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateReviewTemplateInput,
  output: CreateReviewTemplateOutput,
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
  operationName: "CreateReviewTemplate",
}));

export type CreateTemplateShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a review template share.
 *
 * The owner of a review template can share it with other Amazon Web Services accounts, users, an organization, and organizational units (OUs) in the same Amazon Web Services Region.
 *
 * Shared access to a review template is not removed until the review template share invitation is deleted.
 *
 * If you share a review template with an organization or OU, all accounts in the organization or OU are granted access to the review template.
 *
 * **Disclaimer**
 *
 * By sharing your review template with other Amazon Web Services accounts, you acknowledge that Amazon Web Services will make your review template available to those other accounts.
 */
export const createTemplateShare: API.OperationMethod<
  CreateTemplateShareInput,
  CreateTemplateShareOutput,
  CreateTemplateShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTemplateShareInput,
  output: CreateTemplateShareOutput,
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
  operationName: "CreateTemplateShare",
}));

export type CreateWorkloadError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a new workload.
 *
 * The owner of a workload can share the workload with other Amazon Web Services accounts, users, an organization, and organizational units (OUs) in the same Amazon Web Services Region. Only the owner of a workload can delete it.
 *
 * For more information, see Defining a Workload in the *Well-Architected Tool User Guide*.
 *
 * Either `AwsRegions`, `NonAwsRegions`, or both must be specified when creating a workload.
 *
 * You also must specify `ReviewOwner`, even though the parameter is listed as not being required in the following section.
 *
 * When creating a workload using a review template, you must have the following IAM permissions:
 *
 * - `wellarchitected:GetReviewTemplate`
 *
 * - `wellarchitected:GetReviewTemplateAnswer`
 *
 * - `wellarchitected:ListReviewTemplateAnswers`
 *
 * - `wellarchitected:GetReviewTemplateLensReview`
 */
export const createWorkload: API.OperationMethod<
  CreateWorkloadInput,
  CreateWorkloadOutput,
  CreateWorkloadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWorkloadInput,
  output: CreateWorkloadOutput,
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
  operationName: "CreateWorkload",
}));

export type CreateWorkloadShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a workload share.
 *
 * The owner of a workload can share it with other Amazon Web Services accounts and users in the same Amazon Web Services Region. Shared access to a workload is not removed until the workload invitation is deleted.
 *
 * If you share a workload with an organization or OU, all accounts in the organization or OU are granted access to the workload.
 *
 * For more information, see Sharing a workload in the *Well-Architected Tool User Guide*.
 */
export const createWorkloadShare: API.OperationMethod<
  CreateWorkloadShareInput,
  CreateWorkloadShareOutput,
  CreateWorkloadShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWorkloadShareInput,
  output: CreateWorkloadShareOutput,
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
  operationName: "CreateWorkloadShare",
}));

export type DeleteAgentContextError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a context associated with a profile.
 */
export const deleteAgentContext: API.OperationMethod<
  DeleteAgentContextRequest,
  DeleteAgentContextResponse,
  DeleteAgentContextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAgentContextRequest,
  output: DeleteAgentContextResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAgentContext",
}));

export type DeleteAgentGoalError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an optimization goal from a profile.
 */
export const deleteAgentGoal: API.OperationMethod<
  DeleteAgentGoalRequest,
  DeleteAgentGoalResponse,
  DeleteAgentGoalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAgentGoalRequest,
  output: DeleteAgentGoalResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAgentGoal",
}));

export type DeleteAgentProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an optimization profile and its associated configuration. This action cannot be undone.
 */
export const deleteAgentProfile: API.OperationMethod<
  DeleteAgentProfileRequest,
  DeleteAgentProfileResponse,
  DeleteAgentProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAgentProfileRequest,
  output: DeleteAgentProfileResponse,
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
  operationName: "DeleteAgentProfile",
}));

export type DeleteLensError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete an existing lens.
 *
 * Only the owner of a lens can delete it. After the lens is deleted, Amazon Web Services accounts and users that you shared the lens with can continue to use it, but they will no longer be able to apply it to new workloads.
 *
 * **Disclaimer**
 *
 * By sharing your custom lenses with other Amazon Web Services accounts, you acknowledge that Amazon Web Services will make your custom lenses available to those other accounts. Those other accounts may continue to access and use your shared custom lenses even if you delete the custom lenses from your own Amazon Web Services account or terminate your Amazon Web Services account.
 */
export const deleteLens: API.OperationMethod<
  DeleteLensInput,
  DeleteLensResponse,
  DeleteLensError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLensInput,
  output: DeleteLensResponse,
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
  operationName: "DeleteLens",
}));

export type DeleteLensShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a lens share.
 *
 * After the lens share is deleted, Amazon Web Services accounts, users, organizations, and organizational units (OUs) that you shared the lens with can continue to use it, but they will no longer be able to apply it to new workloads.
 *
 * **Disclaimer**
 *
 * By sharing your custom lenses with other Amazon Web Services accounts, you acknowledge that Amazon Web Services will make your custom lenses available to those other accounts. Those other accounts may continue to access and use your shared custom lenses even if you delete the custom lenses from your own Amazon Web Services account or terminate your Amazon Web Services account.
 */
export const deleteLensShare: API.OperationMethod<
  DeleteLensShareInput,
  DeleteLensShareResponse,
  DeleteLensShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLensShareInput,
  output: DeleteLensShareResponse,
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
  operationName: "DeleteLensShare",
}));

export type DeleteProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a profile.
 *
 * **Disclaimer**
 *
 * By sharing your profile with other Amazon Web Services accounts, you acknowledge that Amazon Web Services will make your profile available to those other accounts. Those other accounts may continue to access and use your shared profile even if you delete the profile from your own Amazon Web Services account or terminate your Amazon Web Services account.
 */
export const deleteProfile: API.OperationMethod<
  DeleteProfileInput,
  DeleteProfileResponse,
  DeleteProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProfileInput,
  output: DeleteProfileResponse,
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
  operationName: "DeleteProfile",
}));

export type DeleteProfileShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a profile share.
 */
export const deleteProfileShare: API.OperationMethod<
  DeleteProfileShareInput,
  DeleteProfileShareResponse,
  DeleteProfileShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProfileShareInput,
  output: DeleteProfileShareResponse,
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
  operationName: "DeleteProfileShare",
}));

export type DeleteReviewTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a review template.
 *
 * Only the owner of a review template can delete it.
 *
 * After the review template is deleted, Amazon Web Services accounts, users, organizations, and organizational units (OUs) that you shared the review template with will no longer be able to apply it to new workloads.
 */
export const deleteReviewTemplate: API.OperationMethod<
  DeleteReviewTemplateInput,
  DeleteReviewTemplateResponse,
  DeleteReviewTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteReviewTemplateInput,
  output: DeleteReviewTemplateResponse,
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
  operationName: "DeleteReviewTemplate",
}));

export type DeleteTemplateShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a review template share.
 *
 * After the review template share is deleted, Amazon Web Services accounts, users, organizations, and organizational units (OUs) that you shared the review template with will no longer be able to apply it to new workloads.
 */
export const deleteTemplateShare: API.OperationMethod<
  DeleteTemplateShareInput,
  DeleteTemplateShareResponse,
  DeleteTemplateShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTemplateShareInput,
  output: DeleteTemplateShareResponse,
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
  operationName: "DeleteTemplateShare",
}));

export type DeleteWorkloadError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete an existing workload.
 */
export const deleteWorkload: API.OperationMethod<
  DeleteWorkloadInput,
  DeleteWorkloadResponse,
  DeleteWorkloadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWorkloadInput,
  output: DeleteWorkloadResponse,
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
  operationName: "DeleteWorkload",
}));

export type DeleteWorkloadShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a workload share.
 */
export const deleteWorkloadShare: API.OperationMethod<
  DeleteWorkloadShareInput,
  DeleteWorkloadShareResponse,
  DeleteWorkloadShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWorkloadShareInput,
  output: DeleteWorkloadShareResponse,
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
  operationName: "DeleteWorkloadShare",
}));

export type DisassociateLensesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociate a lens from a workload.
 *
 * Up to 10 lenses can be disassociated from a workload in a single API operation.
 *
 * The Amazon Web Services Well-Architected Framework lens (`wellarchitected`) cannot be removed from a workload.
 */
export const disassociateLenses: API.OperationMethod<
  DisassociateLensesInput,
  DisassociateLensesResponse,
  DisassociateLensesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateLensesInput,
  output: DisassociateLensesResponse,
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
  operationName: "DisassociateLenses",
}));

export type DisassociateProfilesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociate a profile from a workload.
 */
export const disassociateProfiles: API.OperationMethod<
  DisassociateProfilesInput,
  DisassociateProfilesResponse,
  DisassociateProfilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateProfilesInput,
  output: DisassociateProfilesResponse,
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
  operationName: "DisassociateProfiles",
}));

export type ExportLensError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Export an existing lens.
 *
 * Only the owner of a lens can export it. Lenses provided by Amazon Web Services (Amazon Web Services Official Content) cannot be exported.
 *
 * Lenses are defined in JSON. For more information, see JSON format specification in the *Well-Architected Tool User Guide*.
 *
 * **Disclaimer**
 *
 * Do not include or gather personal identifiable information (PII) of end users or other identifiable individuals in or via your custom lenses. If your custom lens or those shared with you and used in your account do include or collect PII you are responsible for: ensuring that the included PII is processed in accordance with applicable law, providing adequate privacy notices, and obtaining necessary consents for processing such data.
 */
export const exportLens: API.OperationMethod<
  ExportLensInput,
  ExportLensOutput,
  ExportLensError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExportLensInput,
  output: ExportLensOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportLens",
}));

export type GetAgentContextError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific context associated with a profile.
 */
export const getAgentContext: API.OperationMethod<
  GetAgentContextRequest,
  GetAgentContextResponse,
  GetAgentContextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAgentContextRequest,
  output: GetAgentContextResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgentContext",
}));

export type GetAgentGoalError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific optimization goal.
 */
export const getAgentGoal: API.OperationMethod<
  GetAgentGoalRequest,
  GetAgentGoalResponse,
  GetAgentGoalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAgentGoalRequest,
  output: GetAgentGoalResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgentGoal",
}));

export type GetAgentProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about an optimization profile, including its configuration and metadata.
 */
export const getAgentProfile: API.OperationMethod<
  GetAgentProfileRequest,
  GetAgentProfileResponse,
  GetAgentProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAgentProfileRequest,
  output: GetAgentProfileResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgentProfile",
}));

export type GetAgentRecommendationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific optimization recommendation, including its impact analysis, content, and implementation guidance.
 */
export const getAgentRecommendation: API.OperationMethod<
  GetAgentRecommendationRequest,
  GetAgentRecommendationResponse,
  GetAgentRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAgentRecommendationRequest,
  output: GetAgentRecommendationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgentRecommendation",
}));

export type GetAgentRecommendationGenerationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a recommendation generation process, including its status, progress, and results. Recommendation generation is asynchronous: poll this operation until status reaches a terminal value of COMPLETED (results are ready) or ERROR (see errorDetails). Intermediate values are QUEUED and IN_PROGRESS.
 */
export const getAgentRecommendationGeneration: API.OperationMethod<
  GetAgentRecommendationGenerationRequest,
  GetAgentRecommendationGenerationResponse,
  GetAgentRecommendationGenerationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAgentRecommendationGenerationRequest,
  output: GetAgentRecommendationGenerationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgentRecommendationGeneration",
}));

export type GetAnswerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the answer to a specific question in a workload review.
 */
export const getAnswer: API.OperationMethod<
  GetAnswerInput,
  GetAnswerOutput,
  GetAnswerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAnswerInput,
  output: GetAnswerOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAnswer",
}));

export type GetConsolidatedReportError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a consolidated report of your workloads.
 *
 * You can optionally choose to include workloads that have been shared with you.
 */
export const getConsolidatedReport: API.PaginatedOperationMethod<
  GetConsolidatedReportInput,
  GetConsolidatedReportOutput,
  GetConsolidatedReportError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetConsolidatedReportInput,
  output: GetConsolidatedReportOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConsolidatedReport",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetGlobalSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Global settings for all workloads.
 */
export const getGlobalSettings: API.OperationMethod<
  GetGlobalSettingsRequest,
  GetGlobalSettingsOutput,
  GetGlobalSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGlobalSettingsRequest,
  output: GetGlobalSettingsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGlobalSettings",
}));

export type GetLensError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get an existing lens.
 */
export const getLens: API.OperationMethod<
  GetLensInput,
  GetLensOutput,
  GetLensError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLensInput,
  output: GetLensOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLens",
}));

export type GetLensReviewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get lens review.
 */
export const getLensReview: API.OperationMethod<
  GetLensReviewInput,
  GetLensReviewOutput,
  GetLensReviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLensReviewInput,
  output: GetLensReviewOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLensReview",
}));

export type GetLensReviewReportError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get lens review report.
 */
export const getLensReviewReport: API.OperationMethod<
  GetLensReviewReportInput,
  GetLensReviewReportOutput,
  GetLensReviewReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLensReviewReportInput,
  output: GetLensReviewReportOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLensReviewReport",
}));

export type GetLensVersionDifferenceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get lens version differences.
 */
export const getLensVersionDifference: API.OperationMethod<
  GetLensVersionDifferenceInput,
  GetLensVersionDifferenceOutput,
  GetLensVersionDifferenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLensVersionDifferenceInput,
  output: GetLensVersionDifferenceOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLensVersionDifference",
}));

export type GetMilestoneError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a milestone for an existing workload.
 */
export const getMilestone: API.OperationMethod<
  GetMilestoneInput,
  GetMilestoneOutput,
  GetMilestoneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMilestoneInput,
  output: GetMilestoneOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMilestone",
}));

export type GetProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get profile information.
 */
export const getProfile: API.OperationMethod<
  GetProfileInput,
  GetProfileOutput,
  GetProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProfileInput,
  output: GetProfileOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProfile",
}));

export type GetProfileTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get profile template.
 */
export const getProfileTemplate: API.OperationMethod<
  GetProfileTemplateInput,
  GetProfileTemplateOutput,
  GetProfileTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProfileTemplateInput,
  output: GetProfileTemplateOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProfileTemplate",
}));

export type GetReviewTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get review template.
 */
export const getReviewTemplate: API.OperationMethod<
  GetReviewTemplateInput,
  GetReviewTemplateOutput,
  GetReviewTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetReviewTemplateInput,
  output: GetReviewTemplateOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReviewTemplate",
}));

export type GetReviewTemplateAnswerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get review template answer.
 */
export const getReviewTemplateAnswer: API.OperationMethod<
  GetReviewTemplateAnswerInput,
  GetReviewTemplateAnswerOutput,
  GetReviewTemplateAnswerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetReviewTemplateAnswerInput,
  output: GetReviewTemplateAnswerOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReviewTemplateAnswer",
}));

export type GetReviewTemplateLensReviewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a lens review associated with a review template.
 */
export const getReviewTemplateLensReview: API.OperationMethod<
  GetReviewTemplateLensReviewInput,
  GetReviewTemplateLensReviewOutput,
  GetReviewTemplateLensReviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetReviewTemplateLensReviewInput,
  output: GetReviewTemplateLensReviewOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReviewTemplateLensReview",
}));

export type GetWorkloadError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get an existing workload.
 */
export const getWorkload: API.OperationMethod<
  GetWorkloadInput,
  GetWorkloadOutput,
  GetWorkloadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWorkloadInput,
  output: GetWorkloadOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkload",
}));

export type ImportLensError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Import a new custom lens or update an existing custom lens.
 *
 * To update an existing custom lens, specify its ARN as the `LensAlias`. If no ARN is specified, a new custom lens is created.
 *
 * The new or updated lens will have a status of `DRAFT`. The lens cannot be applied to workloads or shared with other Amazon Web Services accounts until it's published with CreateLensVersion.
 *
 * Lenses are defined in JSON. For more information, see JSON format specification in the *Well-Architected Tool User Guide*.
 *
 * A custom lens cannot exceed 500 KB in size.
 *
 * **Disclaimer**
 *
 * Do not include or gather personal identifiable information (PII) of end users or other identifiable individuals in or via your custom lenses. If your custom lens or those shared with you and used in your account do include or collect PII you are responsible for: ensuring that the included PII is processed in accordance with applicable law, providing adequate privacy notices, and obtaining necessary consents for processing such data.
 */
export const importLens: API.OperationMethod<
  ImportLensInput,
  ImportLensOutput,
  ImportLensError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportLensInput,
  output: ImportLensOutput,
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
  operationName: "ImportLens",
}));

export type ListAgentContextsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists contexts associated with a profile.
 */
export const listAgentContexts: API.PaginatedOperationMethod<
  ListAgentContextsRequest,
  ListAgentContextsResponse,
  ListAgentContextsError,
  Credentials | HttpClient.HttpClient,
  ContextSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAgentContextsRequest,
  output: ListAgentContextsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgentContexts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgentGoalsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists optimization goals associated with a specified profile. Goals define specific targets and objectives for the optimization process.
 */
export const listAgentGoals: API.PaginatedOperationMethod<
  ListAgentGoalsRequest,
  ListAgentGoalsResponse,
  ListAgentGoalsError,
  Credentials | HttpClient.HttpClient,
  GoalSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAgentGoalsRequest,
  output: ListAgentGoalsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgentGoals",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgentProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists optimization profiles in your account. Profiles define the scope and configuration for generating optimization recommendations.
 */
export const listAgentProfiles: API.PaginatedOperationMethod<
  ListAgentProfilesRequest,
  ListAgentProfilesResponse,
  ListAgentProfilesError,
  Credentials | HttpClient.HttpClient,
  AgentProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAgentProfilesRequest,
  output: ListAgentProfilesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgentProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgentRecommendationGenerationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists recommendation generation processes for a specified profile.
 */
export const listAgentRecommendationGenerations: API.PaginatedOperationMethod<
  ListAgentRecommendationGenerationsRequest,
  ListAgentRecommendationGenerationsResponse,
  ListAgentRecommendationGenerationsError,
  Credentials | HttpClient.HttpClient,
  AgentRecommendationGenerationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAgentRecommendationGenerationsRequest,
  output: ListAgentRecommendationGenerationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgentRecommendationGenerations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgentRecommendationItemsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists recommendation items for a specific recommendation. Recommendation items provide detailed information about individual optimization opportunities.
 */
export const listAgentRecommendationItems: API.PaginatedOperationMethod<
  ListAgentRecommendationItemsRequest,
  ListAgentRecommendationItemsResponse,
  ListAgentRecommendationItemsError,
  Credentials | HttpClient.HttpClient,
  AgentRecommendationItemSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAgentRecommendationItemsRequest,
  output: ListAgentRecommendationItemsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgentRecommendationItems",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgentRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists active optimization recommendations for a specified profile with optional filtering by state.
 */
export const listAgentRecommendations: API.PaginatedOperationMethod<
  ListAgentRecommendationsRequest,
  ListAgentRecommendationsResponse,
  ListAgentRecommendationsError,
  Credentials | HttpClient.HttpClient,
  AgentRecommendationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAgentRecommendationsRequest,
  output: ListAgentRecommendationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgentRecommendations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAnswersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List of answers for a particular workload and lens.
 */
export const listAnswers: API.PaginatedOperationMethod<
  ListAnswersInput,
  ListAnswersOutput,
  ListAnswersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAnswersInput,
  output: ListAnswersOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAnswers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCheckDetailsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List of Trusted Advisor check details by account related to the workload.
 */
export const listCheckDetails: API.PaginatedOperationMethod<
  ListCheckDetailsInput,
  ListCheckDetailsOutput,
  ListCheckDetailsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCheckDetailsInput,
  output: ListCheckDetailsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCheckDetails",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCheckSummariesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List of Trusted Advisor checks summarized for all accounts related to the workload.
 */
export const listCheckSummaries: API.PaginatedOperationMethod<
  ListCheckSummariesInput,
  ListCheckSummariesOutput,
  ListCheckSummariesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCheckSummariesInput,
  output: ListCheckSummariesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCheckSummaries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLensesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the available lenses.
 */
export const listLenses: API.PaginatedOperationMethod<
  ListLensesInput,
  ListLensesOutput,
  ListLensesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLensesInput,
  output: ListLensesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLenses",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLensReviewImprovementsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the improvements of a particular lens review.
 */
export const listLensReviewImprovements: API.PaginatedOperationMethod<
  ListLensReviewImprovementsInput,
  ListLensReviewImprovementsOutput,
  ListLensReviewImprovementsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLensReviewImprovementsInput,
  output: ListLensReviewImprovementsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLensReviewImprovements",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLensReviewsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List lens reviews for a particular workload.
 */
export const listLensReviews: API.PaginatedOperationMethod<
  ListLensReviewsInput,
  ListLensReviewsOutput,
  ListLensReviewsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLensReviewsInput,
  output: ListLensReviewsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLensReviews",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLensSharesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the lens shares associated with the lens.
 */
export const listLensShares: API.PaginatedOperationMethod<
  ListLensSharesInput,
  ListLensSharesOutput,
  ListLensSharesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLensSharesInput,
  output: ListLensSharesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLensShares",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMilestonesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all milestones for an existing workload.
 */
export const listMilestones: API.PaginatedOperationMethod<
  ListMilestonesInput,
  ListMilestonesOutput,
  ListMilestonesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMilestonesInput,
  output: ListMilestonesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMilestones",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNotificationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List lens notifications.
 */
export const listNotifications: API.PaginatedOperationMethod<
  ListNotificationsInput,
  ListNotificationsOutput,
  ListNotificationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNotificationsInput,
  output: ListNotificationsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotifications",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProfileNotificationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List profile notifications.
 */
export const listProfileNotifications: API.PaginatedOperationMethod<
  ListProfileNotificationsInput,
  ListProfileNotificationsOutput,
  ListProfileNotificationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProfileNotificationsInput,
  output: ListProfileNotificationsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProfileNotifications",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List profiles.
 */
export const listProfiles: API.PaginatedOperationMethod<
  ListProfilesInput,
  ListProfilesOutput,
  ListProfilesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProfilesInput,
  output: ListProfilesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProfiles",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProfileSharesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List profile shares.
 */
export const listProfileShares: API.PaginatedOperationMethod<
  ListProfileSharesInput,
  ListProfileSharesOutput,
  ListProfileSharesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProfileSharesInput,
  output: ListProfileSharesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProfileShares",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListReviewTemplateAnswersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the answers of a review template.
 */
export const listReviewTemplateAnswers: API.PaginatedOperationMethod<
  ListReviewTemplateAnswersInput,
  ListReviewTemplateAnswersOutput,
  ListReviewTemplateAnswersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListReviewTemplateAnswersInput,
  output: ListReviewTemplateAnswersOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReviewTemplateAnswers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListReviewTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List review templates.
 */
export const listReviewTemplates: API.PaginatedOperationMethod<
  ListReviewTemplatesInput,
  ListReviewTemplatesOutput,
  ListReviewTemplatesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListReviewTemplatesInput,
  output: ListReviewTemplatesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReviewTemplates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListShareInvitationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the share invitations.
 *
 * `WorkloadNamePrefix`, `LensNamePrefix`, `ProfileNamePrefix`, and `TemplateNamePrefix` are mutually exclusive. Use the parameter that matches your `ShareResourceType`.
 */
export const listShareInvitations: API.PaginatedOperationMethod<
  ListShareInvitationsInput,
  ListShareInvitationsOutput,
  ListShareInvitationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListShareInvitationsInput,
  output: ListShareInvitationsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListShareInvitations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * List the tags for a resource.
 *
 * The WorkloadArn parameter can be a workload ARN, a custom lens ARN, a profile ARN, or review template ARN.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTemplateSharesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List review template shares.
 */
export const listTemplateShares: API.PaginatedOperationMethod<
  ListTemplateSharesInput,
  ListTemplateSharesOutput,
  ListTemplateSharesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTemplateSharesInput,
  output: ListTemplateSharesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTemplateShares",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWorkloadsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Paginated list of workloads.
 */
export const listWorkloads: API.PaginatedOperationMethod<
  ListWorkloadsInput,
  ListWorkloadsOutput,
  ListWorkloadsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWorkloadsInput,
  output: ListWorkloadsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkloads",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWorkloadSharesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the workload shares associated with the workload.
 */
export const listWorkloadShares: API.PaginatedOperationMethod<
  ListWorkloadSharesInput,
  ListWorkloadSharesOutput,
  ListWorkloadSharesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWorkloadSharesInput,
  output: ListWorkloadSharesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkloadShares",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutAgentRecommendationFeedbackError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Submits user feedback on a recommendation to help improve future optimization suggestions and track implementation outcomes.
 */
export const putAgentRecommendationFeedback: API.OperationMethod<
  PutAgentRecommendationFeedbackRequest,
  PutAgentRecommendationFeedbackResponse,
  PutAgentRecommendationFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAgentRecommendationFeedbackRequest,
  output: PutAgentRecommendationFeedbackResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAgentRecommendationFeedback",
}));

export type StartAgentRecommendationGenerationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates a new recommendation generation process for the specified optimization profile. This asynchronous operation analyzes your Amazon Web Services resources and generates optimization recommendations based on the configured pillars and scope. Use GetAgentRecommendationGeneration to check status.
 */
export const startAgentRecommendationGeneration: API.OperationMethod<
  StartAgentRecommendationGenerationRequest,
  StartAgentRecommendationGenerationResponse,
  StartAgentRecommendationGenerationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartAgentRecommendationGenerationRequest,
  output: StartAgentRecommendationGenerationResponse,
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
  operationName: "StartAgentRecommendationGeneration",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds one or more tags to the specified resource.
 *
 * The WorkloadArn parameter can be a workload ARN, a custom lens ARN, a profile ARN, or review template ARN.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceOutput,
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes specified tags from a resource.
 *
 * The WorkloadArn parameter can be a workload ARN, a custom lens ARN, a profile ARN, or review template ARN.
 *
 * To specify multiple tags, use separate **tagKeys** parameters, for example:
 *
 * `DELETE /tags/WorkloadArn?tagKeys=key1&tagKeys=key2`
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceOutput,
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAgentContextError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing context associated with a profile.
 */
export const updateAgentContext: API.OperationMethod<
  UpdateAgentContextRequest,
  UpdateAgentContextResponse,
  UpdateAgentContextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAgentContextRequest,
  output: UpdateAgentContextResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAgentContext",
}));

export type UpdateAgentGoalError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the pillars and title of an existing goal associated with a profile.
 */
export const updateAgentGoal: API.OperationMethod<
  UpdateAgentGoalRequest,
  UpdateAgentGoalResponse,
  UpdateAgentGoalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAgentGoalRequest,
  output: UpdateAgentGoalResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAgentGoal",
}));

export type UpdateAgentProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing optimization profile's configuration, including its pillars, execution role, and aggregation settings.
 */
export const updateAgentProfile: API.OperationMethod<
  UpdateAgentProfileRequest,
  UpdateAgentProfileResponse,
  UpdateAgentProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAgentProfileRequest,
  output: UpdateAgentProfileResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAgentProfile",
}));

export type UpdateAgentRecommendationStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the status of a recommendation to track its progress through the implementation lifecycle.
 */
export const updateAgentRecommendationStatus: API.OperationMethod<
  UpdateAgentRecommendationStatusRequest,
  UpdateAgentRecommendationStatusResponse,
  UpdateAgentRecommendationStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAgentRecommendationStatusRequest,
  output: UpdateAgentRecommendationStatusResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAgentRecommendationStatus",
}));

export type UpdateAnswerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the answer to a specific question in a workload review.
 */
export const updateAnswer: API.OperationMethod<
  UpdateAnswerInput,
  UpdateAnswerOutput,
  UpdateAnswerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAnswerInput,
  output: UpdateAnswerOutput,
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
  operationName: "UpdateAnswer",
}));

export type UpdateGlobalSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update whether the Amazon Web Services account is opted into organization sharing and discovery integration features.
 */
export const updateGlobalSettings: API.OperationMethod<
  UpdateGlobalSettingsInput,
  UpdateGlobalSettingsResponse,
  UpdateGlobalSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGlobalSettingsInput,
  output: UpdateGlobalSettingsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGlobalSettings",
}));

export type UpdateIntegrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update integration features.
 */
export const updateIntegration: API.OperationMethod<
  UpdateIntegrationInput,
  UpdateIntegrationResponse,
  UpdateIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIntegrationInput,
  output: UpdateIntegrationResponse,
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
  operationName: "UpdateIntegration",
}));

export type UpdateLensReviewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update lens review for a particular workload.
 */
export const updateLensReview: API.OperationMethod<
  UpdateLensReviewInput,
  UpdateLensReviewOutput,
  UpdateLensReviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLensReviewInput,
  output: UpdateLensReviewOutput,
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
  operationName: "UpdateLensReview",
}));

export type UpdateProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a profile.
 */
export const updateProfile: API.OperationMethod<
  UpdateProfileInput,
  UpdateProfileOutput,
  UpdateProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProfileInput,
  output: UpdateProfileOutput,
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
  operationName: "UpdateProfile",
}));

export type UpdateReviewTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a review template.
 */
export const updateReviewTemplate: API.OperationMethod<
  UpdateReviewTemplateInput,
  UpdateReviewTemplateOutput,
  UpdateReviewTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateReviewTemplateInput,
  output: UpdateReviewTemplateOutput,
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
  operationName: "UpdateReviewTemplate",
}));

export type UpdateReviewTemplateAnswerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a review template answer.
 */
export const updateReviewTemplateAnswer: API.OperationMethod<
  UpdateReviewTemplateAnswerInput,
  UpdateReviewTemplateAnswerOutput,
  UpdateReviewTemplateAnswerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateReviewTemplateAnswerInput,
  output: UpdateReviewTemplateAnswerOutput,
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
  operationName: "UpdateReviewTemplateAnswer",
}));

export type UpdateReviewTemplateLensReviewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a lens review associated with a review template.
 */
export const updateReviewTemplateLensReview: API.OperationMethod<
  UpdateReviewTemplateLensReviewInput,
  UpdateReviewTemplateLensReviewOutput,
  UpdateReviewTemplateLensReviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateReviewTemplateLensReviewInput,
  output: UpdateReviewTemplateLensReviewOutput,
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
  operationName: "UpdateReviewTemplateLensReview",
}));

export type UpdateShareInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a workload or custom lens share invitation.
 *
 * This API operation can be called independently of any resource. Previous documentation implied that a workload ARN must be specified.
 */
export const updateShareInvitation: API.OperationMethod<
  UpdateShareInvitationInput,
  UpdateShareInvitationOutput,
  UpdateShareInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateShareInvitationInput,
  output: UpdateShareInvitationOutput,
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
  operationName: "UpdateShareInvitation",
}));

export type UpdateWorkloadError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update an existing workload.
 */
export const updateWorkload: API.OperationMethod<
  UpdateWorkloadInput,
  UpdateWorkloadOutput,
  UpdateWorkloadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWorkloadInput,
  output: UpdateWorkloadOutput,
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
  operationName: "UpdateWorkload",
}));

export type UpdateWorkloadShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a workload share.
 */
export const updateWorkloadShare: API.OperationMethod<
  UpdateWorkloadShareInput,
  UpdateWorkloadShareOutput,
  UpdateWorkloadShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWorkloadShareInput,
  output: UpdateWorkloadShareOutput,
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
  operationName: "UpdateWorkloadShare",
}));

export type UpgradeLensReviewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Upgrade lens review for a particular workload.
 */
export const upgradeLensReview: API.OperationMethod<
  UpgradeLensReviewInput,
  UpgradeLensReviewResponse,
  UpgradeLensReviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpgradeLensReviewInput,
  output: UpgradeLensReviewResponse,
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
  operationName: "UpgradeLensReview",
}));

export type UpgradeProfileVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Upgrade a profile.
 */
export const upgradeProfileVersion: API.OperationMethod<
  UpgradeProfileVersionInput,
  UpgradeProfileVersionResponse,
  UpgradeProfileVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpgradeProfileVersionInput,
  output: UpgradeProfileVersionResponse,
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
  operationName: "UpgradeProfileVersion",
}));

export type UpgradeReviewTemplateLensReviewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Upgrade the lens review of a review template.
 */
export const upgradeReviewTemplateLensReview: API.OperationMethod<
  UpgradeReviewTemplateLensReviewInput,
  UpgradeReviewTemplateLensReviewResponse,
  UpgradeReviewTemplateLensReviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpgradeReviewTemplateLensReviewInput,
  output: UpgradeReviewTemplateLensReviewResponse,
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
  operationName: "UpgradeReviewTemplateLensReview",
}));
