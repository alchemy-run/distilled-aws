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
  sdkId: "SecurityHub",
  serviceShapeName: "SecurityHubAPIService",
});
const auth = T.AwsAuthSigv4({ name: "securityhub" });
const ver = T.ServiceVersion("2018-10-26");
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
              `https://securityhub-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://securityhub-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://securityhub.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://securityhub.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalException
  extends /*@__PURE__*/ S.TaggedError<InternalException>()(
    "InternalException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidAccessException
  extends /*@__PURE__*/ S.TaggedError<InvalidAccessException>()(
    "InvalidAccessException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
    },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()(
    "InvalidInputException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class OrganizationalUnitNotFoundException
  extends /*@__PURE__*/ S.TaggedError<OrganizationalUnitNotFoundException>()(
    "OrganizationalUnitNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class OrganizationNotFoundException
  extends /*@__PURE__*/ S.TaggedError<OrganizationNotFoundException>()(
    "OrganizationNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceConflictException
  extends /*@__PURE__*/ S.TaggedError<ResourceConflictException>()(
    "ResourceConflictException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type NonEmptyString = string;
export interface AcceptAdministratorInvitationRequest {
  AdministratorId?: string;
  InvitationId?: string;
}
export const AcceptAdministratorInvitationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AdministratorId: S.optional(S.String),
      InvitationId: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/administrator" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AcceptAdministratorInvitationRequest",
}) as any as S.Schema<AcceptAdministratorInvitationRequest>;
export interface AcceptAdministratorInvitationResponse {}
export const AcceptAdministratorInvitationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "AcceptAdministratorInvitationResponse",
}) as any as S.Schema<AcceptAdministratorInvitationResponse>;
export interface AcceptInvitationRequest {
  MasterId?: string;
  InvitationId?: string;
}
export const AcceptInvitationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MasterId: S.optional(S.String),
    InvitationId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/master" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AcceptInvitationRequest",
}) as any as S.Schema<AcceptInvitationRequest>;
export interface AcceptInvitationResponse {}
export const AcceptInvitationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AcceptInvitationResponse",
}) as any as S.Schema<AcceptInvitationResponse>;
export type AutomationRulesArnsList = string[];
export const AutomationRulesArnsList = /*@__PURE__*/ S.Array(S.String);
export interface BatchDeleteAutomationRulesRequest {
  AutomationRulesArns?: string[];
}
export const BatchDeleteAutomationRulesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AutomationRulesArns: S.optional(AutomationRulesArnsList) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/automationrules/delete" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchDeleteAutomationRulesRequest",
}) as any as S.Schema<BatchDeleteAutomationRulesRequest>;
export interface UnprocessedAutomationRule {
  RuleArn?: string;
  ErrorCode?: number;
  ErrorMessage?: string;
}
export const UnprocessedAutomationRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleArn: S.optional(S.String),
    ErrorCode: S.optional(S.Number),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "UnprocessedAutomationRule",
}) as any as S.Schema<UnprocessedAutomationRule>;
export type UnprocessedAutomationRulesList = UnprocessedAutomationRule[];
export const UnprocessedAutomationRulesList = /*@__PURE__*/ S.Array(
  UnprocessedAutomationRule,
);
export interface BatchDeleteAutomationRulesResponse {
  ProcessedAutomationRules?: string[];
  UnprocessedAutomationRules?: UnprocessedAutomationRule[];
}
export const BatchDeleteAutomationRulesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProcessedAutomationRules: S.optional(AutomationRulesArnsList),
    UnprocessedAutomationRules: S.optional(UnprocessedAutomationRulesList),
  }),
).annotate({
  identifier: "BatchDeleteAutomationRulesResponse",
}) as any as S.Schema<BatchDeleteAutomationRulesResponse>;
export type StandardsSubscriptionArns = string[];
export const StandardsSubscriptionArns = /*@__PURE__*/ S.Array(S.String);
export interface BatchDisableStandardsRequest {
  StandardsSubscriptionArns?: string[];
}
export const BatchDisableStandardsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StandardsSubscriptionArns: S.optional(StandardsSubscriptionArns),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/standards/deregister" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchDisableStandardsRequest",
}) as any as S.Schema<BatchDisableStandardsRequest>;
export type StandardsInputParameterMap = { [key: string]: string | undefined };
export const StandardsInputParameterMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type StandardsStatus =
  | "PENDING"
  | "READY"
  | "FAILED"
  | "DELETING"
  | "INCOMPLETE"
  | (string & {});
export const StandardsStatus = /*@__PURE__*/ S.String;

export type StandardsControlsUpdatable =
  | "READY_FOR_UPDATES"
  | "NOT_READY_FOR_UPDATES"
  | (string & {});
export const StandardsControlsUpdatable = /*@__PURE__*/ S.String;

export type StatusReasonCode =
  | "NO_AVAILABLE_CONFIGURATION_RECORDER"
  | "MAXIMUM_NUMBER_OF_CONFIG_RULES_EXCEEDED"
  | "INTERNAL_ERROR"
  | (string & {});
export const StatusReasonCode = /*@__PURE__*/ S.String;

export interface StandardsStatusReason {
  StatusReasonCode?: StatusReasonCode;
}
export const StandardsStatusReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StatusReasonCode: S.optional(StatusReasonCode) }),
).annotate({
  identifier: "StandardsStatusReason",
}) as any as S.Schema<StandardsStatusReason>;
export interface StandardsSubscription {
  StandardsSubscriptionArn?: string;
  StandardsArn?: string;
  StandardsInput?: { [key: string]: string | undefined };
  StandardsStatus?: StandardsStatus;
  StandardsControlsUpdatable?: StandardsControlsUpdatable;
  StandardsStatusReason?: StandardsStatusReason;
}
export const StandardsSubscription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StandardsSubscriptionArn: S.optional(S.String),
    StandardsArn: S.optional(S.String),
    StandardsInput: S.optional(StandardsInputParameterMap),
    StandardsStatus: S.optional(StandardsStatus),
    StandardsControlsUpdatable: S.optional(StandardsControlsUpdatable),
    StandardsStatusReason: S.optional(StandardsStatusReason),
  }),
).annotate({
  identifier: "StandardsSubscription",
}) as any as S.Schema<StandardsSubscription>;
export type StandardsSubscriptions = StandardsSubscription[];
export const StandardsSubscriptions = /*@__PURE__*/ S.Array(
  StandardsSubscription,
);
export interface BatchDisableStandardsResponse {
  StandardsSubscriptions?: (StandardsSubscription & {
    StandardsSubscriptionArn: NonEmptyString;
    StandardsArn: NonEmptyString;
    StandardsInput: StandardsInputParameterMap;
    StandardsStatus: StandardsStatus;
    StandardsStatusReason: StandardsStatusReason & {
      StatusReasonCode: StatusReasonCode;
    };
  })[];
}
export const BatchDisableStandardsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StandardsSubscriptions: S.optional(StandardsSubscriptions) }),
).annotate({
  identifier: "BatchDisableStandardsResponse",
}) as any as S.Schema<BatchDisableStandardsResponse>;
export interface StandardsSubscriptionRequest {
  StandardsArn?: string;
  StandardsInput?: { [key: string]: string | undefined };
}
export const StandardsSubscriptionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StandardsArn: S.optional(S.String),
    StandardsInput: S.optional(StandardsInputParameterMap),
  }),
).annotate({
  identifier: "StandardsSubscriptionRequest",
}) as any as S.Schema<StandardsSubscriptionRequest>;
export type StandardsSubscriptionRequests = StandardsSubscriptionRequest[];
export const StandardsSubscriptionRequests = /*@__PURE__*/ S.Array(
  StandardsSubscriptionRequest,
);
export interface BatchEnableStandardsRequest {
  StandardsSubscriptionRequests?: StandardsSubscriptionRequest[];
}
export const BatchEnableStandardsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StandardsSubscriptionRequests: S.optional(StandardsSubscriptionRequests),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/standards/register" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchEnableStandardsRequest",
}) as any as S.Schema<BatchEnableStandardsRequest>;
export interface BatchEnableStandardsResponse {
  StandardsSubscriptions?: (StandardsSubscription & {
    StandardsSubscriptionArn: NonEmptyString;
    StandardsArn: NonEmptyString;
    StandardsInput: StandardsInputParameterMap;
    StandardsStatus: StandardsStatus;
    StandardsStatusReason: StandardsStatusReason & {
      StatusReasonCode: StatusReasonCode;
    };
  })[];
}
export const BatchEnableStandardsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StandardsSubscriptions: S.optional(StandardsSubscriptions) }),
).annotate({
  identifier: "BatchEnableStandardsResponse",
}) as any as S.Schema<BatchEnableStandardsResponse>;
export interface BatchGetAutomationRulesRequest {
  AutomationRulesArns?: string[];
}
export const BatchGetAutomationRulesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AutomationRulesArns: S.optional(AutomationRulesArnsList) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/automationrules/get" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetAutomationRulesRequest",
}) as any as S.Schema<BatchGetAutomationRulesRequest>;
export type RuleStatus = "ENABLED" | "DISABLED" | (string & {});
export const RuleStatus = /*@__PURE__*/ S.String;

export type RuleOrderValue = number;
export type StringFilterComparison =
  | "EQUALS"
  | "PREFIX"
  | "NOT_EQUALS"
  | "PREFIX_NOT_EQUALS"
  | "CONTAINS"
  | "NOT_CONTAINS"
  | "CONTAINS_WORD"
  | (string & {});
export const StringFilterComparison = /*@__PURE__*/ S.String;

export interface StringFilter {
  Value?: string;
  Comparison?: StringFilterComparison;
}
export const StringFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Value: S.optional(S.String),
    Comparison: S.optional(StringFilterComparison),
  }),
).annotate({ identifier: "StringFilter" }) as any as S.Schema<StringFilter>;
export type StringFilterList = StringFilter[];
export const StringFilterList = /*@__PURE__*/ S.Array(StringFilter);
export type DateRangeUnit = "DAYS" | (string & {});
export const DateRangeUnit = /*@__PURE__*/ S.String;

export type DateRangeComparison = "WITHIN" | "OLDER_THAN" | (string & {});
export const DateRangeComparison = /*@__PURE__*/ S.String;

export interface DateRange {
  Value?: number;
  Unit?: DateRangeUnit;
  Comparison?: DateRangeComparison;
}
export const DateRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Value: S.optional(S.Number),
    Unit: S.optional(DateRangeUnit),
    Comparison: S.optional(DateRangeComparison),
  }),
).annotate({ identifier: "DateRange" }) as any as S.Schema<DateRange>;
export interface DateFilter {
  Start?: string;
  End?: string;
  DateRange?: DateRange;
}
export const DateFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Start: S.optional(S.String),
    End: S.optional(S.String),
    DateRange: S.optional(DateRange),
  }),
).annotate({ identifier: "DateFilter" }) as any as S.Schema<DateFilter>;
export type DateFilterList = DateFilter[];
export const DateFilterList = /*@__PURE__*/ S.Array(DateFilter);
export interface NumberFilter {
  Gte?: number;
  Lte?: number;
  Eq?: number;
  Gt?: number;
  Lt?: number;
}
export const NumberFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Gte: S.optional(S.Number),
    Lte: S.optional(S.Number),
    Eq: S.optional(S.Number),
    Gt: S.optional(S.Number),
    Lt: S.optional(S.Number),
  }),
).annotate({ identifier: "NumberFilter" }) as any as S.Schema<NumberFilter>;
export type NumberFilterList = NumberFilter[];
export const NumberFilterList = /*@__PURE__*/ S.Array(NumberFilter);
export type MapFilterComparison =
  | "EQUALS"
  | "NOT_EQUALS"
  | "CONTAINS"
  | "NOT_CONTAINS"
  | (string & {});
export const MapFilterComparison = /*@__PURE__*/ S.String;

export interface MapFilter {
  Key?: string;
  Value?: string;
  Comparison?: MapFilterComparison;
}
export const MapFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(S.String),
    Value: S.optional(S.String),
    Comparison: S.optional(MapFilterComparison),
  }),
).annotate({ identifier: "MapFilter" }) as any as S.Schema<MapFilter>;
export type MapFilterList = MapFilter[];
export const MapFilterList = /*@__PURE__*/ S.Array(MapFilter);
export interface AutomationRulesFindingFilters {
  ProductArn?: StringFilter[];
  AwsAccountId?: StringFilter[];
  Id?: StringFilter[];
  GeneratorId?: StringFilter[];
  Type?: StringFilter[];
  FirstObservedAt?: DateFilter[];
  LastObservedAt?: DateFilter[];
  CreatedAt?: DateFilter[];
  UpdatedAt?: DateFilter[];
  Confidence?: NumberFilter[];
  Criticality?: NumberFilter[];
  Title?: StringFilter[];
  Description?: StringFilter[];
  SourceUrl?: StringFilter[];
  ProductName?: StringFilter[];
  CompanyName?: StringFilter[];
  SeverityLabel?: StringFilter[];
  ResourceType?: StringFilter[];
  ResourceId?: StringFilter[];
  ResourcePartition?: StringFilter[];
  ResourceRegion?: StringFilter[];
  ResourceTags?: MapFilter[];
  ResourceDetailsOther?: MapFilter[];
  ComplianceStatus?: StringFilter[];
  ComplianceSecurityControlId?: StringFilter[];
  ComplianceAssociatedStandardsId?: StringFilter[];
  VerificationState?: StringFilter[];
  WorkflowStatus?: StringFilter[];
  RecordState?: StringFilter[];
  RelatedFindingsProductArn?: StringFilter[];
  RelatedFindingsId?: StringFilter[];
  NoteText?: StringFilter[];
  NoteUpdatedAt?: DateFilter[];
  NoteUpdatedBy?: StringFilter[];
  UserDefinedFields?: MapFilter[];
  ResourceApplicationArn?: StringFilter[];
  ResourceApplicationName?: StringFilter[];
  AwsAccountName?: StringFilter[];
}
export const AutomationRulesFindingFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductArn: S.optional(StringFilterList),
    AwsAccountId: S.optional(StringFilterList),
    Id: S.optional(StringFilterList),
    GeneratorId: S.optional(StringFilterList),
    Type: S.optional(StringFilterList),
    FirstObservedAt: S.optional(DateFilterList),
    LastObservedAt: S.optional(DateFilterList),
    CreatedAt: S.optional(DateFilterList),
    UpdatedAt: S.optional(DateFilterList),
    Confidence: S.optional(NumberFilterList),
    Criticality: S.optional(NumberFilterList),
    Title: S.optional(StringFilterList),
    Description: S.optional(StringFilterList),
    SourceUrl: S.optional(StringFilterList),
    ProductName: S.optional(StringFilterList),
    CompanyName: S.optional(StringFilterList),
    SeverityLabel: S.optional(StringFilterList),
    ResourceType: S.optional(StringFilterList),
    ResourceId: S.optional(StringFilterList),
    ResourcePartition: S.optional(StringFilterList),
    ResourceRegion: S.optional(StringFilterList),
    ResourceTags: S.optional(MapFilterList),
    ResourceDetailsOther: S.optional(MapFilterList),
    ComplianceStatus: S.optional(StringFilterList),
    ComplianceSecurityControlId: S.optional(StringFilterList),
    ComplianceAssociatedStandardsId: S.optional(StringFilterList),
    VerificationState: S.optional(StringFilterList),
    WorkflowStatus: S.optional(StringFilterList),
    RecordState: S.optional(StringFilterList),
    RelatedFindingsProductArn: S.optional(StringFilterList),
    RelatedFindingsId: S.optional(StringFilterList),
    NoteText: S.optional(StringFilterList),
    NoteUpdatedAt: S.optional(DateFilterList),
    NoteUpdatedBy: S.optional(StringFilterList),
    UserDefinedFields: S.optional(MapFilterList),
    ResourceApplicationArn: S.optional(StringFilterList),
    ResourceApplicationName: S.optional(StringFilterList),
    AwsAccountName: S.optional(StringFilterList),
  }),
).annotate({
  identifier: "AutomationRulesFindingFilters",
}) as any as S.Schema<AutomationRulesFindingFilters>;
export type AutomationRulesActionType = "FINDING_FIELDS_UPDATE" | (string & {});
export const AutomationRulesActionType = /*@__PURE__*/ S.String;

export interface NoteUpdate {
  Text?: string;
  UpdatedBy?: string;
}
export const NoteUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Text: S.optional(S.String), UpdatedBy: S.optional(S.String) }),
).annotate({ identifier: "NoteUpdate" }) as any as S.Schema<NoteUpdate>;
export type RatioScale = number;
export type SeverityLabel =
  | "INFORMATIONAL"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL"
  | (string & {});
export const SeverityLabel = /*@__PURE__*/ S.String;

export interface SeverityUpdate {
  Normalized?: number;
  Product?: number;
  Label?: SeverityLabel;
}
export const SeverityUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Normalized: S.optional(S.Number),
    Product: S.optional(S.Number),
    Label: S.optional(SeverityLabel),
  }),
).annotate({ identifier: "SeverityUpdate" }) as any as S.Schema<SeverityUpdate>;
export type VerificationState =
  | "UNKNOWN"
  | "TRUE_POSITIVE"
  | "FALSE_POSITIVE"
  | "BENIGN_POSITIVE"
  | (string & {});
export const VerificationState = /*@__PURE__*/ S.String;

export type TypeList = string[];
export const TypeList = /*@__PURE__*/ S.Array(S.String);
export type FieldMap = { [key: string]: string | undefined };
export const FieldMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type WorkflowStatus =
  | "NEW"
  | "NOTIFIED"
  | "RESOLVED"
  | "SUPPRESSED"
  | (string & {});
export const WorkflowStatus = /*@__PURE__*/ S.String;

export interface WorkflowUpdate {
  Status?: WorkflowStatus;
}
export const WorkflowUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(WorkflowStatus) }),
).annotate({ identifier: "WorkflowUpdate" }) as any as S.Schema<WorkflowUpdate>;
export interface RelatedFinding {
  ProductArn?: string;
  Id?: string;
}
export const RelatedFinding = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProductArn: S.optional(S.String), Id: S.optional(S.String) }),
).annotate({ identifier: "RelatedFinding" }) as any as S.Schema<RelatedFinding>;
export type RelatedFindingList = RelatedFinding[];
export const RelatedFindingList = /*@__PURE__*/ S.Array(RelatedFinding);
export interface AutomationRulesFindingFieldsUpdate {
  Note?: NoteUpdate;
  Severity?: SeverityUpdate;
  VerificationState?: VerificationState;
  Confidence?: number;
  Criticality?: number;
  Types?: string[];
  UserDefinedFields?: { [key: string]: string | undefined };
  Workflow?: WorkflowUpdate;
  RelatedFindings?: RelatedFinding[];
}
export const AutomationRulesFindingFieldsUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Note: S.optional(NoteUpdate),
    Severity: S.optional(SeverityUpdate),
    VerificationState: S.optional(VerificationState),
    Confidence: S.optional(S.Number),
    Criticality: S.optional(S.Number),
    Types: S.optional(TypeList),
    UserDefinedFields: S.optional(FieldMap),
    Workflow: S.optional(WorkflowUpdate),
    RelatedFindings: S.optional(RelatedFindingList),
  }),
).annotate({
  identifier: "AutomationRulesFindingFieldsUpdate",
}) as any as S.Schema<AutomationRulesFindingFieldsUpdate>;
export interface AutomationRulesAction {
  Type?: AutomationRulesActionType;
  FindingFieldsUpdate?: AutomationRulesFindingFieldsUpdate;
}
export const AutomationRulesAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(AutomationRulesActionType),
    FindingFieldsUpdate: S.optional(AutomationRulesFindingFieldsUpdate),
  }),
).annotate({
  identifier: "AutomationRulesAction",
}) as any as S.Schema<AutomationRulesAction>;
export type ActionList = AutomationRulesAction[];
export const ActionList = /*@__PURE__*/ S.Array(AutomationRulesAction);
export interface AutomationRulesConfig {
  RuleArn?: string;
  RuleStatus?: RuleStatus;
  RuleOrder?: number;
  RuleName?: string;
  Description?: string;
  IsTerminal?: boolean;
  Criteria?: AutomationRulesFindingFilters;
  Actions?: AutomationRulesAction[];
  CreatedAt?: Date;
  UpdatedAt?: Date;
  CreatedBy?: string;
}
export const AutomationRulesConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleArn: S.optional(S.String),
    RuleStatus: S.optional(RuleStatus),
    RuleOrder: S.optional(S.Number),
    RuleName: S.optional(S.String),
    Description: S.optional(S.String),
    IsTerminal: S.optional(S.Boolean),
    Criteria: S.optional(AutomationRulesFindingFilters),
    Actions: S.optional(ActionList),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    CreatedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "AutomationRulesConfig",
}) as any as S.Schema<AutomationRulesConfig>;
export type AutomationRulesConfigList = AutomationRulesConfig[];
export const AutomationRulesConfigList = /*@__PURE__*/ S.Array(
  AutomationRulesConfig,
);
export interface BatchGetAutomationRulesResponse {
  Rules?: (AutomationRulesConfig & {
    Actions: (AutomationRulesAction & {
      FindingFieldsUpdate: AutomationRulesFindingFieldsUpdate & {
        Note: NoteUpdate & { Text: NonEmptyString; UpdatedBy: NonEmptyString };
        RelatedFindings: (RelatedFinding & {
          ProductArn: NonEmptyString;
          Id: NonEmptyString;
        })[];
      };
    })[];
  })[];
  UnprocessedAutomationRules?: UnprocessedAutomationRule[];
}
export const BatchGetAutomationRulesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Rules: S.optional(AutomationRulesConfigList),
    UnprocessedAutomationRules: S.optional(UnprocessedAutomationRulesList),
  }),
).annotate({
  identifier: "BatchGetAutomationRulesResponse",
}) as any as S.Schema<BatchGetAutomationRulesResponse>;
export type Target =
  | { AccountId: string; OrganizationalUnitId?: never; RootId?: never }
  | { AccountId?: never; OrganizationalUnitId: string; RootId?: never }
  | { AccountId?: never; OrganizationalUnitId?: never; RootId: string };
export const Target = /*@__PURE__*/ S.Union([
  S.Struct({ AccountId: S.String }),
  S.Struct({ OrganizationalUnitId: S.String }),
  S.Struct({ RootId: S.String }),
]);
export interface ConfigurationPolicyAssociation {
  Target?: Target;
}
export const ConfigurationPolicyAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Target: S.optional(Target) }),
).annotate({
  identifier: "ConfigurationPolicyAssociation",
}) as any as S.Schema<ConfigurationPolicyAssociation>;
export type ConfigurationPolicyAssociationsList =
  ConfigurationPolicyAssociation[];
export const ConfigurationPolicyAssociationsList = /*@__PURE__*/ S.Array(
  ConfigurationPolicyAssociation,
);
export interface BatchGetConfigurationPolicyAssociationsRequest {
  ConfigurationPolicyAssociationIdentifiers?: ConfigurationPolicyAssociation[];
}
export const BatchGetConfigurationPolicyAssociationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationPolicyAssociationIdentifiers: S.optional(
        ConfigurationPolicyAssociationsList,
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/configurationPolicyAssociation/batchget",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "BatchGetConfigurationPolicyAssociationsRequest",
  }) as any as S.Schema<BatchGetConfigurationPolicyAssociationsRequest>;
export type TargetType =
  | "ACCOUNT"
  | "ORGANIZATIONAL_UNIT"
  | "ROOT"
  | (string & {});
export const TargetType = /*@__PURE__*/ S.String;

export type AssociationType = "INHERITED" | "APPLIED" | (string & {});
export const AssociationType = /*@__PURE__*/ S.String;

export type ConfigurationPolicyAssociationStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | (string & {});
export const ConfigurationPolicyAssociationStatus = /*@__PURE__*/ S.String;

export interface ConfigurationPolicyAssociationSummary {
  ConfigurationPolicyId?: string;
  TargetId?: string;
  TargetType?: TargetType;
  AssociationType?: AssociationType;
  UpdatedAt?: Date;
  AssociationStatus?: ConfigurationPolicyAssociationStatus;
  AssociationStatusMessage?: string;
}
export const ConfigurationPolicyAssociationSummary = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ConfigurationPolicyId: S.optional(S.String),
      TargetId: S.optional(S.String),
      TargetType: S.optional(TargetType),
      AssociationType: S.optional(AssociationType),
      UpdatedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      AssociationStatus: S.optional(ConfigurationPolicyAssociationStatus),
      AssociationStatusMessage: S.optional(S.String),
    }),
).annotate({
  identifier: "ConfigurationPolicyAssociationSummary",
}) as any as S.Schema<ConfigurationPolicyAssociationSummary>;
export type ConfigurationPolicyAssociationList =
  ConfigurationPolicyAssociationSummary[];
export const ConfigurationPolicyAssociationList = /*@__PURE__*/ S.Array(
  ConfigurationPolicyAssociationSummary,
);
export interface UnprocessedConfigurationPolicyAssociation {
  ConfigurationPolicyAssociationIdentifiers?: ConfigurationPolicyAssociation;
  ErrorCode?: string;
  ErrorReason?: string;
}
export const UnprocessedConfigurationPolicyAssociation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationPolicyAssociationIdentifiers: S.optional(
        ConfigurationPolicyAssociation,
      ),
      ErrorCode: S.optional(S.String),
      ErrorReason: S.optional(S.String),
    }),
  ).annotate({
    identifier: "UnprocessedConfigurationPolicyAssociation",
  }) as any as S.Schema<UnprocessedConfigurationPolicyAssociation>;
export type UnprocessedConfigurationPolicyAssociationList =
  UnprocessedConfigurationPolicyAssociation[];
export const UnprocessedConfigurationPolicyAssociationList =
  /*@__PURE__*/ S.Array(UnprocessedConfigurationPolicyAssociation);
export interface BatchGetConfigurationPolicyAssociationsResponse {
  ConfigurationPolicyAssociations?: ConfigurationPolicyAssociationSummary[];
  UnprocessedConfigurationPolicyAssociations?: UnprocessedConfigurationPolicyAssociation[];
}
export const BatchGetConfigurationPolicyAssociationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationPolicyAssociations: S.optional(
        ConfigurationPolicyAssociationList,
      ),
      UnprocessedConfigurationPolicyAssociations: S.optional(
        UnprocessedConfigurationPolicyAssociationList,
      ),
    }),
  ).annotate({
    identifier: "BatchGetConfigurationPolicyAssociationsResponse",
  }) as any as S.Schema<BatchGetConfigurationPolicyAssociationsResponse>;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetSecurityControlsRequest {
  SecurityControlIds?: string[];
}
export const BatchGetSecurityControlsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SecurityControlIds: S.optional(StringList) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/securityControls/batchGet" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetSecurityControlsRequest",
}) as any as S.Schema<BatchGetSecurityControlsRequest>;
export type SeverityRating =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL"
  | (string & {});
export const SeverityRating = /*@__PURE__*/ S.String;

export type ControlStatus = "ENABLED" | "DISABLED" | (string & {});
export const ControlStatus = /*@__PURE__*/ S.String;

export type UpdateStatus = "READY" | "UPDATING" | (string & {});
export const UpdateStatus = /*@__PURE__*/ S.String;

export type ParameterValueType = "DEFAULT" | "CUSTOM" | (string & {});
export const ParameterValueType = /*@__PURE__*/ S.String;

export type IntegerList = number[];
export const IntegerList = /*@__PURE__*/ S.Array(S.Number);
export type ParameterValue =
  | {
      Integer: number;
      IntegerList?: never;
      Double?: never;
      String?: never;
      StringList?: never;
      Boolean?: never;
      Enum?: never;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList: number[];
      Double?: never;
      String?: never;
      StringList?: never;
      Boolean?: never;
      Enum?: never;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList?: never;
      Double: number;
      String?: never;
      StringList?: never;
      Boolean?: never;
      Enum?: never;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList?: never;
      Double?: never;
      String: string;
      StringList?: never;
      Boolean?: never;
      Enum?: never;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList?: never;
      Double?: never;
      String?: never;
      StringList: string[];
      Boolean?: never;
      Enum?: never;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList?: never;
      Double?: never;
      String?: never;
      StringList?: never;
      Boolean: boolean;
      Enum?: never;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList?: never;
      Double?: never;
      String?: never;
      StringList?: never;
      Boolean?: never;
      Enum: string;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList?: never;
      Double?: never;
      String?: never;
      StringList?: never;
      Boolean?: never;
      Enum?: never;
      EnumList: string[];
    };
export const ParameterValue = /*@__PURE__*/ S.Union([
  S.Struct({ Integer: S.Number }),
  S.Struct({ IntegerList: IntegerList }),
  S.Struct({ Double: S.Number }),
  S.Struct({ String: S.String }),
  S.Struct({ StringList: StringList }),
  S.Struct({ Boolean: S.Boolean }),
  S.Struct({ Enum: S.String }),
  S.Struct({ EnumList: StringList }),
]);
export interface ParameterConfiguration {
  ValueType?: ParameterValueType;
  Value?: ParameterValue;
}
export const ParameterConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ValueType: S.optional(ParameterValueType),
    Value: S.optional(ParameterValue),
  }),
).annotate({
  identifier: "ParameterConfiguration",
}) as any as S.Schema<ParameterConfiguration>;
export type Parameters = { [key: string]: ParameterConfiguration | undefined };
export const Parameters = /*@__PURE__*/ S.Record(
  S.String,
  ParameterConfiguration.pipe(S.optional),
);
export type AlphaNumericNonEmptyString = string;
export interface SecurityControl {
  SecurityControlId?: string;
  SecurityControlArn?: string;
  Title?: string;
  Description?: string;
  RemediationUrl?: string;
  SeverityRating?: SeverityRating;
  SecurityControlStatus?: ControlStatus;
  UpdateStatus?: UpdateStatus;
  Parameters?: { [key: string]: ParameterConfiguration | undefined };
  LastUpdateReason?: string;
}
export const SecurityControl = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecurityControlId: S.optional(S.String),
    SecurityControlArn: S.optional(S.String),
    Title: S.optional(S.String),
    Description: S.optional(S.String),
    RemediationUrl: S.optional(S.String),
    SeverityRating: S.optional(SeverityRating),
    SecurityControlStatus: S.optional(ControlStatus),
    UpdateStatus: S.optional(UpdateStatus),
    Parameters: S.optional(Parameters),
    LastUpdateReason: S.optional(S.String),
  }),
).annotate({
  identifier: "SecurityControl",
}) as any as S.Schema<SecurityControl>;
export type SecurityControls = SecurityControl[];
export const SecurityControls = /*@__PURE__*/ S.Array(SecurityControl);
export type UnprocessedErrorCode =
  | "INVALID_INPUT"
  | "ACCESS_DENIED"
  | "NOT_FOUND"
  | "RESOURCE_NOT_FOUND"
  | "LIMIT_EXCEEDED"
  | (string & {});
export const UnprocessedErrorCode = /*@__PURE__*/ S.String;

export interface UnprocessedSecurityControl {
  SecurityControlId?: string;
  ErrorCode?: UnprocessedErrorCode;
  ErrorReason?: string;
}
export const UnprocessedSecurityControl = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecurityControlId: S.optional(S.String),
    ErrorCode: S.optional(UnprocessedErrorCode),
    ErrorReason: S.optional(S.String),
  }),
).annotate({
  identifier: "UnprocessedSecurityControl",
}) as any as S.Schema<UnprocessedSecurityControl>;
export type UnprocessedSecurityControls = UnprocessedSecurityControl[];
export const UnprocessedSecurityControls = /*@__PURE__*/ S.Array(
  UnprocessedSecurityControl,
);
export interface BatchGetSecurityControlsResponse {
  SecurityControls: (SecurityControl & {
    SecurityControlId: NonEmptyString;
    SecurityControlArn: NonEmptyString;
    Title: NonEmptyString;
    Description: NonEmptyString;
    RemediationUrl: NonEmptyString;
    SeverityRating: SeverityRating;
    SecurityControlStatus: ControlStatus;
    Parameters: {
      [key: string]:
        | (ParameterConfiguration & { ValueType: ParameterValueType })
        | undefined;
    };
  })[];
  UnprocessedIds?: (UnprocessedSecurityControl & {
    SecurityControlId: NonEmptyString;
    ErrorCode: UnprocessedErrorCode;
  })[];
}
export const BatchGetSecurityControlsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecurityControls: S.optional(SecurityControls),
    UnprocessedIds: S.optional(UnprocessedSecurityControls),
  }),
).annotate({
  identifier: "BatchGetSecurityControlsResponse",
}) as any as S.Schema<BatchGetSecurityControlsResponse>;
export interface StandardsControlAssociationId {
  SecurityControlId?: string;
  StandardsArn?: string;
}
export const StandardsControlAssociationId = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecurityControlId: S.optional(S.String),
    StandardsArn: S.optional(S.String),
  }),
).annotate({
  identifier: "StandardsControlAssociationId",
}) as any as S.Schema<StandardsControlAssociationId>;
export type StandardsControlAssociationIds = StandardsControlAssociationId[];
export const StandardsControlAssociationIds = /*@__PURE__*/ S.Array(
  StandardsControlAssociationId,
);
export interface BatchGetStandardsControlAssociationsRequest {
  StandardsControlAssociationIds?: StandardsControlAssociationId[];
}
export const BatchGetStandardsControlAssociationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      StandardsControlAssociationIds: S.optional(
        StandardsControlAssociationIds,
      ),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/associations/batchGet" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "BatchGetStandardsControlAssociationsRequest",
  }) as any as S.Schema<BatchGetStandardsControlAssociationsRequest>;
export type AssociationStatus = "ENABLED" | "DISABLED" | (string & {});
export const AssociationStatus = /*@__PURE__*/ S.String;

export type RelatedRequirementsList = string[];
export const RelatedRequirementsList = /*@__PURE__*/ S.Array(S.String);
export type StandardsControlArnList = string[];
export const StandardsControlArnList = /*@__PURE__*/ S.Array(S.String);
export interface StandardsControlAssociationDetail {
  StandardsArn?: string;
  SecurityControlId?: string;
  SecurityControlArn?: string;
  AssociationStatus?: AssociationStatus;
  RelatedRequirements?: string[];
  UpdatedAt?: Date;
  UpdatedReason?: string;
  StandardsControlTitle?: string;
  StandardsControlDescription?: string;
  StandardsControlArns?: string[];
}
export const StandardsControlAssociationDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StandardsArn: S.optional(S.String),
    SecurityControlId: S.optional(S.String),
    SecurityControlArn: S.optional(S.String),
    AssociationStatus: S.optional(AssociationStatus),
    RelatedRequirements: S.optional(RelatedRequirementsList),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedReason: S.optional(S.String),
    StandardsControlTitle: S.optional(S.String),
    StandardsControlDescription: S.optional(S.String),
    StandardsControlArns: S.optional(StandardsControlArnList),
  }),
).annotate({
  identifier: "StandardsControlAssociationDetail",
}) as any as S.Schema<StandardsControlAssociationDetail>;
export type StandardsControlAssociationDetails =
  StandardsControlAssociationDetail[];
export const StandardsControlAssociationDetails = /*@__PURE__*/ S.Array(
  StandardsControlAssociationDetail,
);
export interface UnprocessedStandardsControlAssociation {
  StandardsControlAssociationId?: StandardsControlAssociationId;
  ErrorCode?: UnprocessedErrorCode;
  ErrorReason?: string;
}
export const UnprocessedStandardsControlAssociation = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StandardsControlAssociationId: S.optional(StandardsControlAssociationId),
      ErrorCode: S.optional(UnprocessedErrorCode),
      ErrorReason: S.optional(S.String),
    }),
).annotate({
  identifier: "UnprocessedStandardsControlAssociation",
}) as any as S.Schema<UnprocessedStandardsControlAssociation>;
export type UnprocessedStandardsControlAssociations =
  UnprocessedStandardsControlAssociation[];
export const UnprocessedStandardsControlAssociations = /*@__PURE__*/ S.Array(
  UnprocessedStandardsControlAssociation,
);
export interface BatchGetStandardsControlAssociationsResponse {
  StandardsControlAssociationDetails: (StandardsControlAssociationDetail & {
    StandardsArn: NonEmptyString;
    SecurityControlId: NonEmptyString;
    SecurityControlArn: NonEmptyString;
    AssociationStatus: AssociationStatus;
  })[];
  UnprocessedAssociations?: (UnprocessedStandardsControlAssociation & {
    StandardsControlAssociationId: StandardsControlAssociationId & {
      SecurityControlId: NonEmptyString;
      StandardsArn: NonEmptyString;
    };
    ErrorCode: UnprocessedErrorCode;
  })[];
}
export const BatchGetStandardsControlAssociationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      StandardsControlAssociationDetails: S.optional(
        StandardsControlAssociationDetails,
      ),
      UnprocessedAssociations: S.optional(
        UnprocessedStandardsControlAssociations,
      ),
    }),
  ).annotate({
    identifier: "BatchGetStandardsControlAssociationsResponse",
  }) as any as S.Schema<BatchGetStandardsControlAssociationsResponse>;
export interface Severity {
  Product?: number;
  Label?: SeverityLabel;
  Normalized?: number;
  Original?: string;
}
export const Severity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Product: S.optional(S.Number),
    Label: S.optional(SeverityLabel),
    Normalized: S.optional(S.Number),
    Original: S.optional(S.String),
  }),
).annotate({ identifier: "Severity" }) as any as S.Schema<Severity>;
export interface Recommendation {
  Text?: string;
  Url?: string;
}
export const Recommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Text: S.optional(S.String), Url: S.optional(S.String) }),
).annotate({ identifier: "Recommendation" }) as any as S.Schema<Recommendation>;
export interface Remediation {
  Recommendation?: Recommendation;
}
export const Remediation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Recommendation: S.optional(Recommendation) }),
).annotate({ identifier: "Remediation" }) as any as S.Schema<Remediation>;
export type MalwareType =
  | "ADWARE"
  | "BLENDED_THREAT"
  | "BOTNET_AGENT"
  | "COIN_MINER"
  | "EXPLOIT_KIT"
  | "KEYLOGGER"
  | "MACRO"
  | "POTENTIALLY_UNWANTED"
  | "SPYWARE"
  | "RANSOMWARE"
  | "REMOTE_ACCESS"
  | "ROOTKIT"
  | "TROJAN"
  | "VIRUS"
  | "WORM"
  | (string & {});
export const MalwareType = /*@__PURE__*/ S.String;

export type MalwareState =
  | "OBSERVED"
  | "REMOVAL_FAILED"
  | "REMOVED"
  | (string & {});
export const MalwareState = /*@__PURE__*/ S.String;

export interface Malware {
  Name?: string;
  Type?: MalwareType;
  Path?: string;
  State?: MalwareState;
}
export const Malware = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Type: S.optional(MalwareType),
    Path: S.optional(S.String),
    State: S.optional(MalwareState),
  }),
).annotate({ identifier: "Malware" }) as any as S.Schema<Malware>;
export type MalwareList = Malware[];
export const MalwareList = /*@__PURE__*/ S.Array(Malware);
export type NetworkDirection = "IN" | "OUT" | (string & {});
export const NetworkDirection = /*@__PURE__*/ S.String;

export interface PortRange {
  Begin?: number;
  End?: number;
}
export const PortRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Begin: S.optional(S.Number), End: S.optional(S.Number) }),
).annotate({ identifier: "PortRange" }) as any as S.Schema<PortRange>;
export interface Network {
  Direction?: NetworkDirection;
  Protocol?: string;
  OpenPortRange?: PortRange;
  SourceIpV4?: string;
  SourceIpV6?: string;
  SourcePort?: number;
  SourceDomain?: string;
  SourceMac?: string;
  DestinationIpV4?: string;
  DestinationIpV6?: string;
  DestinationPort?: number;
  DestinationDomain?: string;
}
export const Network = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Direction: S.optional(NetworkDirection),
    Protocol: S.optional(S.String),
    OpenPortRange: S.optional(PortRange),
    SourceIpV4: S.optional(S.String),
    SourceIpV6: S.optional(S.String),
    SourcePort: S.optional(S.Number),
    SourceDomain: S.optional(S.String),
    SourceMac: S.optional(S.String),
    DestinationIpV4: S.optional(S.String),
    DestinationIpV6: S.optional(S.String),
    DestinationPort: S.optional(S.Number),
    DestinationDomain: S.optional(S.String),
  }),
).annotate({ identifier: "Network" }) as any as S.Schema<Network>;
export type PortRangeList = PortRange[];
export const PortRangeList = /*@__PURE__*/ S.Array(PortRange);
export interface NetworkPathComponentDetails {
  Address?: string[];
  PortRanges?: PortRange[];
}
export const NetworkPathComponentDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Address: S.optional(StringList),
    PortRanges: S.optional(PortRangeList),
  }),
).annotate({
  identifier: "NetworkPathComponentDetails",
}) as any as S.Schema<NetworkPathComponentDetails>;
export interface NetworkHeader {
  Protocol?: string;
  Destination?: NetworkPathComponentDetails;
  Source?: NetworkPathComponentDetails;
}
export const NetworkHeader = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Protocol: S.optional(S.String),
    Destination: S.optional(NetworkPathComponentDetails),
    Source: S.optional(NetworkPathComponentDetails),
  }),
).annotate({ identifier: "NetworkHeader" }) as any as S.Schema<NetworkHeader>;
export interface NetworkPathComponent {
  ComponentId?: string;
  ComponentType?: string;
  Egress?: NetworkHeader;
  Ingress?: NetworkHeader;
}
export const NetworkPathComponent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ComponentId: S.optional(S.String),
    ComponentType: S.optional(S.String),
    Egress: S.optional(NetworkHeader),
    Ingress: S.optional(NetworkHeader),
  }),
).annotate({
  identifier: "NetworkPathComponent",
}) as any as S.Schema<NetworkPathComponent>;
export type NetworkPathList = NetworkPathComponent[];
export const NetworkPathList = /*@__PURE__*/ S.Array(NetworkPathComponent);
export interface ProcessDetails {
  Name?: string;
  Path?: string;
  Pid?: number;
  ParentPid?: number;
  LaunchedAt?: string;
  TerminatedAt?: string;
}
export const ProcessDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Path: S.optional(S.String),
    Pid: S.optional(S.Number),
    ParentPid: S.optional(S.Number),
    LaunchedAt: S.optional(S.String),
    TerminatedAt: S.optional(S.String),
  }),
).annotate({ identifier: "ProcessDetails" }) as any as S.Schema<ProcessDetails>;
export interface FilePaths {
  FilePath?: string;
  FileName?: string;
  ResourceId?: string;
  Hash?: string;
}
export const FilePaths = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FilePath: S.optional(S.String),
    FileName: S.optional(S.String),
    ResourceId: S.optional(S.String),
    Hash: S.optional(S.String),
  }),
).annotate({ identifier: "FilePaths" }) as any as S.Schema<FilePaths>;
export type FilePathList = FilePaths[];
export const FilePathList = /*@__PURE__*/ S.Array(FilePaths);
export interface Threat {
  Name?: string;
  Severity?: string;
  ItemCount?: number;
  FilePaths?: FilePaths[];
}
export const Threat = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Severity: S.optional(S.String),
    ItemCount: S.optional(S.Number),
    FilePaths: S.optional(FilePathList),
  }),
).annotate({ identifier: "Threat" }) as any as S.Schema<Threat>;
export type ThreatList = Threat[];
export const ThreatList = /*@__PURE__*/ S.Array(Threat);
export type ThreatIntelIndicatorType =
  | "DOMAIN"
  | "EMAIL_ADDRESS"
  | "HASH_MD5"
  | "HASH_SHA1"
  | "HASH_SHA256"
  | "HASH_SHA512"
  | "IPV4_ADDRESS"
  | "IPV6_ADDRESS"
  | "MUTEX"
  | "PROCESS"
  | "URL"
  | (string & {});
export const ThreatIntelIndicatorType = /*@__PURE__*/ S.String;

export type ThreatIntelIndicatorCategory =
  | "BACKDOOR"
  | "CARD_STEALER"
  | "COMMAND_AND_CONTROL"
  | "DROP_SITE"
  | "EXPLOIT_SITE"
  | "KEYLOGGER"
  | (string & {});
export const ThreatIntelIndicatorCategory = /*@__PURE__*/ S.String;

export interface ThreatIntelIndicator {
  Type?: ThreatIntelIndicatorType;
  Value?: string;
  Category?: ThreatIntelIndicatorCategory;
  LastObservedAt?: string;
  Source?: string;
  SourceUrl?: string;
}
export const ThreatIntelIndicator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(ThreatIntelIndicatorType),
    Value: S.optional(S.String),
    Category: S.optional(ThreatIntelIndicatorCategory),
    LastObservedAt: S.optional(S.String),
    Source: S.optional(S.String),
    SourceUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "ThreatIntelIndicator",
}) as any as S.Schema<ThreatIntelIndicator>;
export type ThreatIntelIndicatorList = ThreatIntelIndicator[];
export const ThreatIntelIndicatorList =
  /*@__PURE__*/ S.Array(ThreatIntelIndicator);
export type Partition = "aws" | "aws-cn" | "aws-us-gov" | (string & {});
export const Partition = /*@__PURE__*/ S.String;

export interface ClassificationStatus {
  Code?: string;
  Reason?: string;
}
export const ClassificationStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Code: S.optional(S.String), Reason: S.optional(S.String) }),
).annotate({
  identifier: "ClassificationStatus",
}) as any as S.Schema<ClassificationStatus>;
export interface Range {
  Start?: number;
  End?: number;
  StartColumn?: number;
}
export const Range = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Start: S.optional(S.Number),
    End: S.optional(S.Number),
    StartColumn: S.optional(S.Number),
  }),
).annotate({ identifier: "Range" }) as any as S.Schema<Range>;
export type Ranges = Range[];
export const Ranges = /*@__PURE__*/ S.Array(Range);
export interface Page {
  PageNumber?: number;
  LineRange?: Range;
  OffsetRange?: Range;
}
export const Page = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PageNumber: S.optional(S.Number),
    LineRange: S.optional(Range),
    OffsetRange: S.optional(Range),
  }),
).annotate({ identifier: "Page" }) as any as S.Schema<Page>;
export type Pages = Page[];
export const Pages = /*@__PURE__*/ S.Array(Page);
export interface Record {
  JsonPath?: string;
  RecordIndex?: number;
}
export const Record = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JsonPath: S.optional(S.String),
    RecordIndex: S.optional(S.Number),
  }),
).annotate({ identifier: "Record" }) as any as S.Schema<Record>;
export type Records = Record[];
export const Records = /*@__PURE__*/ S.Array(Record);
export interface Cell {
  Column?: number;
  Row?: number;
  ColumnName?: string;
  CellReference?: string;
}
export const Cell = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Column: S.optional(S.Number),
    Row: S.optional(S.Number),
    ColumnName: S.optional(S.String),
    CellReference: S.optional(S.String),
  }),
).annotate({ identifier: "Cell" }) as any as S.Schema<Cell>;
export type Cells = Cell[];
export const Cells = /*@__PURE__*/ S.Array(Cell);
export interface Occurrences {
  LineRanges?: Range[];
  OffsetRanges?: Range[];
  Pages?: Page[];
  Records?: Record[];
  Cells?: Cell[];
}
export const Occurrences = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LineRanges: S.optional(Ranges),
    OffsetRanges: S.optional(Ranges),
    Pages: S.optional(Pages),
    Records: S.optional(Records),
    Cells: S.optional(Cells),
  }),
).annotate({ identifier: "Occurrences" }) as any as S.Schema<Occurrences>;
export interface SensitiveDataDetections {
  Count?: number;
  Type?: string;
  Occurrences?: Occurrences;
}
export const SensitiveDataDetections = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Count: S.optional(S.Number),
    Type: S.optional(S.String),
    Occurrences: S.optional(Occurrences),
  }),
).annotate({
  identifier: "SensitiveDataDetections",
}) as any as S.Schema<SensitiveDataDetections>;
export type SensitiveDataDetectionsList = SensitiveDataDetections[];
export const SensitiveDataDetectionsList = /*@__PURE__*/ S.Array(
  SensitiveDataDetections,
);
export interface SensitiveDataResult {
  Category?: string;
  Detections?: SensitiveDataDetections[];
  TotalCount?: number;
}
export const SensitiveDataResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Category: S.optional(S.String),
    Detections: S.optional(SensitiveDataDetectionsList),
    TotalCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "SensitiveDataResult",
}) as any as S.Schema<SensitiveDataResult>;
export type SensitiveDataResultList = SensitiveDataResult[];
export const SensitiveDataResultList =
  /*@__PURE__*/ S.Array(SensitiveDataResult);
export interface CustomDataIdentifiersDetections {
  Count?: number;
  Arn?: string;
  Name?: string;
  Occurrences?: Occurrences;
}
export const CustomDataIdentifiersDetections = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Count: S.optional(S.Number),
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    Occurrences: S.optional(Occurrences),
  }),
).annotate({
  identifier: "CustomDataIdentifiersDetections",
}) as any as S.Schema<CustomDataIdentifiersDetections>;
export type CustomDataIdentifiersDetectionsList =
  CustomDataIdentifiersDetections[];
export const CustomDataIdentifiersDetectionsList = /*@__PURE__*/ S.Array(
  CustomDataIdentifiersDetections,
);
export interface CustomDataIdentifiersResult {
  Detections?: CustomDataIdentifiersDetections[];
  TotalCount?: number;
}
export const CustomDataIdentifiersResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Detections: S.optional(CustomDataIdentifiersDetectionsList),
    TotalCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "CustomDataIdentifiersResult",
}) as any as S.Schema<CustomDataIdentifiersResult>;
export interface ClassificationResult {
  MimeType?: string;
  SizeClassified?: number;
  AdditionalOccurrences?: boolean;
  Status?: ClassificationStatus;
  SensitiveData?: SensitiveDataResult[];
  CustomDataIdentifiers?: CustomDataIdentifiersResult;
}
export const ClassificationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MimeType: S.optional(S.String),
    SizeClassified: S.optional(S.Number),
    AdditionalOccurrences: S.optional(S.Boolean),
    Status: S.optional(ClassificationStatus),
    SensitiveData: S.optional(SensitiveDataResultList),
    CustomDataIdentifiers: S.optional(CustomDataIdentifiersResult),
  }),
).annotate({
  identifier: "ClassificationResult",
}) as any as S.Schema<ClassificationResult>;
export interface DataClassificationDetails {
  DetailedResultsLocation?: string;
  Result?: ClassificationResult;
}
export const DataClassificationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetailedResultsLocation: S.optional(S.String),
    Result: S.optional(ClassificationResult),
  }),
).annotate({
  identifier: "DataClassificationDetails",
}) as any as S.Schema<DataClassificationDetails>;
export interface AwsAutoScalingAutoScalingGroupMixedInstancesPolicyInstancesDistributionDetails {
  OnDemandAllocationStrategy?: string;
  OnDemandBaseCapacity?: number;
  OnDemandPercentageAboveBaseCapacity?: number;
  SpotAllocationStrategy?: string;
  SpotInstancePools?: number;
  SpotMaxPrice?: string;
}
export const AwsAutoScalingAutoScalingGroupMixedInstancesPolicyInstancesDistributionDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      OnDemandAllocationStrategy: S.optional(S.String),
      OnDemandBaseCapacity: S.optional(S.Number),
      OnDemandPercentageAboveBaseCapacity: S.optional(S.Number),
      SpotAllocationStrategy: S.optional(S.String),
      SpotInstancePools: S.optional(S.Number),
      SpotMaxPrice: S.optional(S.String),
    }),
  ).annotate({
    identifier:
      "AwsAutoScalingAutoScalingGroupMixedInstancesPolicyInstancesDistributionDetails",
  }) as any as S.Schema<AwsAutoScalingAutoScalingGroupMixedInstancesPolicyInstancesDistributionDetails>;
export interface AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateLaunchTemplateSpecification {
  LaunchTemplateId?: string;
  LaunchTemplateName?: string;
  Version?: string;
}
export const AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateLaunchTemplateSpecification =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      LaunchTemplateId: S.optional(S.String),
      LaunchTemplateName: S.optional(S.String),
      Version: S.optional(S.String),
    }),
  ).annotate({
    identifier:
      "AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateLaunchTemplateSpecification",
  }) as any as S.Schema<AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateLaunchTemplateSpecification>;
export interface AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateOverridesListDetails {
  InstanceType?: string;
  WeightedCapacity?: string;
}
export const AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateOverridesListDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      InstanceType: S.optional(S.String),
      WeightedCapacity: S.optional(S.String),
    }),
  ).annotate({
    identifier:
      "AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateOverridesListDetails",
  }) as any as S.Schema<AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateOverridesListDetails>;
export type AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateOverridesList =
  AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateOverridesListDetails[];
export const AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateOverridesList =
  /*@__PURE__*/ S.Array(
    AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateOverridesListDetails,
  );
export interface AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateDetails {
  LaunchTemplateSpecification?: AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateLaunchTemplateSpecification;
  Overrides?: AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateOverridesListDetails[];
}
export const AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      LaunchTemplateSpecification: S.optional(
        AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateLaunchTemplateSpecification,
      ),
      Overrides: S.optional(
        AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateOverridesList,
      ),
    }),
  ).annotate({
    identifier:
      "AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateDetails",
  }) as any as S.Schema<AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateDetails>;
export interface AwsAutoScalingAutoScalingGroupMixedInstancesPolicyDetails {
  InstancesDistribution?: AwsAutoScalingAutoScalingGroupMixedInstancesPolicyInstancesDistributionDetails;
  LaunchTemplate?: AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateDetails;
}
export const AwsAutoScalingAutoScalingGroupMixedInstancesPolicyDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      InstancesDistribution: S.optional(
        AwsAutoScalingAutoScalingGroupMixedInstancesPolicyInstancesDistributionDetails,
      ),
      LaunchTemplate: S.optional(
        AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateDetails,
      ),
    }),
  ).annotate({
    identifier: "AwsAutoScalingAutoScalingGroupMixedInstancesPolicyDetails",
  }) as any as S.Schema<AwsAutoScalingAutoScalingGroupMixedInstancesPolicyDetails>;
export interface AwsAutoScalingAutoScalingGroupAvailabilityZonesListDetails {
  Value?: string;
}
export const AwsAutoScalingAutoScalingGroupAvailabilityZonesListDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Value: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsAutoScalingAutoScalingGroupAvailabilityZonesListDetails",
  }) as any as S.Schema<AwsAutoScalingAutoScalingGroupAvailabilityZonesListDetails>;
export type AwsAutoScalingAutoScalingGroupAvailabilityZonesList =
  AwsAutoScalingAutoScalingGroupAvailabilityZonesListDetails[];
export const AwsAutoScalingAutoScalingGroupAvailabilityZonesList =
  /*@__PURE__*/ S.Array(
    AwsAutoScalingAutoScalingGroupAvailabilityZonesListDetails,
  );
export interface AwsAutoScalingAutoScalingGroupLaunchTemplateLaunchTemplateSpecification {
  LaunchTemplateId?: string;
  LaunchTemplateName?: string;
  Version?: string;
}
export const AwsAutoScalingAutoScalingGroupLaunchTemplateLaunchTemplateSpecification =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      LaunchTemplateId: S.optional(S.String),
      LaunchTemplateName: S.optional(S.String),
      Version: S.optional(S.String),
    }),
  ).annotate({
    identifier:
      "AwsAutoScalingAutoScalingGroupLaunchTemplateLaunchTemplateSpecification",
  }) as any as S.Schema<AwsAutoScalingAutoScalingGroupLaunchTemplateLaunchTemplateSpecification>;
export interface AwsAutoScalingAutoScalingGroupDetails {
  LaunchConfigurationName?: string;
  LoadBalancerNames?: string[];
  HealthCheckType?: string;
  HealthCheckGracePeriod?: number;
  CreatedTime?: string;
  MixedInstancesPolicy?: AwsAutoScalingAutoScalingGroupMixedInstancesPolicyDetails;
  AvailabilityZones?: AwsAutoScalingAutoScalingGroupAvailabilityZonesListDetails[];
  LaunchTemplate?: AwsAutoScalingAutoScalingGroupLaunchTemplateLaunchTemplateSpecification;
  CapacityRebalance?: boolean;
}
export const AwsAutoScalingAutoScalingGroupDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      LaunchConfigurationName: S.optional(S.String),
      LoadBalancerNames: S.optional(StringList),
      HealthCheckType: S.optional(S.String),
      HealthCheckGracePeriod: S.optional(S.Number),
      CreatedTime: S.optional(S.String),
      MixedInstancesPolicy: S.optional(
        AwsAutoScalingAutoScalingGroupMixedInstancesPolicyDetails,
      ),
      AvailabilityZones: S.optional(
        AwsAutoScalingAutoScalingGroupAvailabilityZonesList,
      ),
      LaunchTemplate: S.optional(
        AwsAutoScalingAutoScalingGroupLaunchTemplateLaunchTemplateSpecification,
      ),
      CapacityRebalance: S.optional(S.Boolean),
    }),
).annotate({
  identifier: "AwsAutoScalingAutoScalingGroupDetails",
}) as any as S.Schema<AwsAutoScalingAutoScalingGroupDetails>;
export interface AwsCodeBuildProjectArtifactsDetails {
  ArtifactIdentifier?: string;
  EncryptionDisabled?: boolean;
  Location?: string;
  Name?: string;
  NamespaceType?: string;
  OverrideArtifactName?: boolean;
  Packaging?: string;
  Path?: string;
  Type?: string;
}
export const AwsCodeBuildProjectArtifactsDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ArtifactIdentifier: S.optional(S.String),
    EncryptionDisabled: S.optional(S.Boolean),
    Location: S.optional(S.String),
    Name: S.optional(S.String),
    NamespaceType: S.optional(S.String),
    OverrideArtifactName: S.optional(S.Boolean),
    Packaging: S.optional(S.String),
    Path: S.optional(S.String),
    Type: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsCodeBuildProjectArtifactsDetails",
}) as any as S.Schema<AwsCodeBuildProjectArtifactsDetails>;
export type AwsCodeBuildProjectArtifactsList =
  AwsCodeBuildProjectArtifactsDetails[];
export const AwsCodeBuildProjectArtifactsList = /*@__PURE__*/ S.Array(
  AwsCodeBuildProjectArtifactsDetails,
);
export interface AwsCodeBuildProjectEnvironmentEnvironmentVariablesDetails {
  Name?: string;
  Type?: string;
  Value?: string;
}
export const AwsCodeBuildProjectEnvironmentEnvironmentVariablesDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Name: S.optional(S.String),
      Type: S.optional(S.String),
      Value: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsCodeBuildProjectEnvironmentEnvironmentVariablesDetails",
  }) as any as S.Schema<AwsCodeBuildProjectEnvironmentEnvironmentVariablesDetails>;
export type AwsCodeBuildProjectEnvironmentEnvironmentVariablesList =
  AwsCodeBuildProjectEnvironmentEnvironmentVariablesDetails[];
export const AwsCodeBuildProjectEnvironmentEnvironmentVariablesList =
  /*@__PURE__*/ S.Array(
    AwsCodeBuildProjectEnvironmentEnvironmentVariablesDetails,
  );
export interface AwsCodeBuildProjectEnvironmentRegistryCredential {
  Credential?: string;
  CredentialProvider?: string;
}
export const AwsCodeBuildProjectEnvironmentRegistryCredential =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Credential: S.optional(S.String),
      CredentialProvider: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsCodeBuildProjectEnvironmentRegistryCredential",
  }) as any as S.Schema<AwsCodeBuildProjectEnvironmentRegistryCredential>;
export interface AwsCodeBuildProjectEnvironment {
  Certificate?: string;
  EnvironmentVariables?: AwsCodeBuildProjectEnvironmentEnvironmentVariablesDetails[];
  PrivilegedMode?: boolean;
  ImagePullCredentialsType?: string;
  RegistryCredential?: AwsCodeBuildProjectEnvironmentRegistryCredential;
  Type?: string;
}
export const AwsCodeBuildProjectEnvironment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Certificate: S.optional(S.String),
    EnvironmentVariables: S.optional(
      AwsCodeBuildProjectEnvironmentEnvironmentVariablesList,
    ),
    PrivilegedMode: S.optional(S.Boolean),
    ImagePullCredentialsType: S.optional(S.String),
    RegistryCredential: S.optional(
      AwsCodeBuildProjectEnvironmentRegistryCredential,
    ),
    Type: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsCodeBuildProjectEnvironment",
}) as any as S.Schema<AwsCodeBuildProjectEnvironment>;
export interface AwsCodeBuildProjectSource {
  Type?: string;
  Location?: string;
  GitCloneDepth?: number;
  InsecureSsl?: boolean;
}
export const AwsCodeBuildProjectSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(S.String),
    Location: S.optional(S.String),
    GitCloneDepth: S.optional(S.Number),
    InsecureSsl: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AwsCodeBuildProjectSource",
}) as any as S.Schema<AwsCodeBuildProjectSource>;
export interface AwsCodeBuildProjectLogsConfigCloudWatchLogsDetails {
  GroupName?: string;
  Status?: string;
  StreamName?: string;
}
export const AwsCodeBuildProjectLogsConfigCloudWatchLogsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      GroupName: S.optional(S.String),
      Status: S.optional(S.String),
      StreamName: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsCodeBuildProjectLogsConfigCloudWatchLogsDetails",
  }) as any as S.Schema<AwsCodeBuildProjectLogsConfigCloudWatchLogsDetails>;
export interface AwsCodeBuildProjectLogsConfigS3LogsDetails {
  EncryptionDisabled?: boolean;
  Location?: string;
  Status?: string;
}
export const AwsCodeBuildProjectLogsConfigS3LogsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      EncryptionDisabled: S.optional(S.Boolean),
      Location: S.optional(S.String),
      Status: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsCodeBuildProjectLogsConfigS3LogsDetails",
  }) as any as S.Schema<AwsCodeBuildProjectLogsConfigS3LogsDetails>;
export interface AwsCodeBuildProjectLogsConfigDetails {
  CloudWatchLogs?: AwsCodeBuildProjectLogsConfigCloudWatchLogsDetails;
  S3Logs?: AwsCodeBuildProjectLogsConfigS3LogsDetails;
}
export const AwsCodeBuildProjectLogsConfigDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CloudWatchLogs: S.optional(
        AwsCodeBuildProjectLogsConfigCloudWatchLogsDetails,
      ),
      S3Logs: S.optional(AwsCodeBuildProjectLogsConfigS3LogsDetails),
    }),
).annotate({
  identifier: "AwsCodeBuildProjectLogsConfigDetails",
}) as any as S.Schema<AwsCodeBuildProjectLogsConfigDetails>;
export type NonEmptyStringList = string[];
export const NonEmptyStringList = /*@__PURE__*/ S.Array(S.String);
export interface AwsCodeBuildProjectVpcConfig {
  VpcId?: string;
  Subnets?: string[];
  SecurityGroupIds?: string[];
}
export const AwsCodeBuildProjectVpcConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcId: S.optional(S.String),
    Subnets: S.optional(NonEmptyStringList),
    SecurityGroupIds: S.optional(NonEmptyStringList),
  }),
).annotate({
  identifier: "AwsCodeBuildProjectVpcConfig",
}) as any as S.Schema<AwsCodeBuildProjectVpcConfig>;
export interface AwsCodeBuildProjectDetails {
  EncryptionKey?: string;
  Artifacts?: AwsCodeBuildProjectArtifactsDetails[];
  Environment?: AwsCodeBuildProjectEnvironment;
  Name?: string;
  Source?: AwsCodeBuildProjectSource;
  ServiceRole?: string;
  LogsConfig?: AwsCodeBuildProjectLogsConfigDetails;
  VpcConfig?: AwsCodeBuildProjectVpcConfig;
  SecondaryArtifacts?: AwsCodeBuildProjectArtifactsDetails[];
}
export const AwsCodeBuildProjectDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EncryptionKey: S.optional(S.String),
    Artifacts: S.optional(AwsCodeBuildProjectArtifactsList),
    Environment: S.optional(AwsCodeBuildProjectEnvironment),
    Name: S.optional(S.String),
    Source: S.optional(AwsCodeBuildProjectSource),
    ServiceRole: S.optional(S.String),
    LogsConfig: S.optional(AwsCodeBuildProjectLogsConfigDetails),
    VpcConfig: S.optional(AwsCodeBuildProjectVpcConfig),
    SecondaryArtifacts: S.optional(AwsCodeBuildProjectArtifactsList),
  }),
).annotate({
  identifier: "AwsCodeBuildProjectDetails",
}) as any as S.Schema<AwsCodeBuildProjectDetails>;
export interface AwsCloudFrontDistributionCacheBehavior {
  ViewerProtocolPolicy?: string;
}
export const AwsCloudFrontDistributionCacheBehavior = /*@__PURE__*/ S.suspend(
  () => S.Struct({ ViewerProtocolPolicy: S.optional(S.String) }),
).annotate({
  identifier: "AwsCloudFrontDistributionCacheBehavior",
}) as any as S.Schema<AwsCloudFrontDistributionCacheBehavior>;
export type AwsCloudFrontDistributionCacheBehaviorsItemList =
  AwsCloudFrontDistributionCacheBehavior[];
export const AwsCloudFrontDistributionCacheBehaviorsItemList =
  /*@__PURE__*/ S.Array(AwsCloudFrontDistributionCacheBehavior);
export interface AwsCloudFrontDistributionCacheBehaviors {
  Items?: AwsCloudFrontDistributionCacheBehavior[];
}
export const AwsCloudFrontDistributionCacheBehaviors = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Items: S.optional(AwsCloudFrontDistributionCacheBehaviorsItemList),
    }),
).annotate({
  identifier: "AwsCloudFrontDistributionCacheBehaviors",
}) as any as S.Schema<AwsCloudFrontDistributionCacheBehaviors>;
export interface AwsCloudFrontDistributionDefaultCacheBehavior {
  ViewerProtocolPolicy?: string;
}
export const AwsCloudFrontDistributionDefaultCacheBehavior =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ViewerProtocolPolicy: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsCloudFrontDistributionDefaultCacheBehavior",
  }) as any as S.Schema<AwsCloudFrontDistributionDefaultCacheBehavior>;
export interface AwsCloudFrontDistributionLogging {
  Bucket?: string;
  Enabled?: boolean;
  IncludeCookies?: boolean;
  Prefix?: string;
}
export const AwsCloudFrontDistributionLogging = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bucket: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
    IncludeCookies: S.optional(S.Boolean),
    Prefix: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsCloudFrontDistributionLogging",
}) as any as S.Schema<AwsCloudFrontDistributionLogging>;
export interface AwsCloudFrontDistributionOriginS3OriginConfig {
  OriginAccessIdentity?: string;
}
export const AwsCloudFrontDistributionOriginS3OriginConfig =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ OriginAccessIdentity: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsCloudFrontDistributionOriginS3OriginConfig",
  }) as any as S.Schema<AwsCloudFrontDistributionOriginS3OriginConfig>;
export interface AwsCloudFrontDistributionOriginSslProtocols {
  Items?: string[];
  Quantity?: number;
}
export const AwsCloudFrontDistributionOriginSslProtocols =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Items: S.optional(NonEmptyStringList),
      Quantity: S.optional(S.Number),
    }),
  ).annotate({
    identifier: "AwsCloudFrontDistributionOriginSslProtocols",
  }) as any as S.Schema<AwsCloudFrontDistributionOriginSslProtocols>;
export interface AwsCloudFrontDistributionOriginCustomOriginConfig {
  HttpPort?: number;
  HttpsPort?: number;
  OriginKeepaliveTimeout?: number;
  OriginProtocolPolicy?: string;
  OriginReadTimeout?: number;
  OriginSslProtocols?: AwsCloudFrontDistributionOriginSslProtocols;
}
export const AwsCloudFrontDistributionOriginCustomOriginConfig =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      HttpPort: S.optional(S.Number),
      HttpsPort: S.optional(S.Number),
      OriginKeepaliveTimeout: S.optional(S.Number),
      OriginProtocolPolicy: S.optional(S.String),
      OriginReadTimeout: S.optional(S.Number),
      OriginSslProtocols: S.optional(
        AwsCloudFrontDistributionOriginSslProtocols,
      ),
    }),
  ).annotate({
    identifier: "AwsCloudFrontDistributionOriginCustomOriginConfig",
  }) as any as S.Schema<AwsCloudFrontDistributionOriginCustomOriginConfig>;
export interface AwsCloudFrontDistributionOriginItem {
  DomainName?: string;
  Id?: string;
  OriginPath?: string;
  S3OriginConfig?: AwsCloudFrontDistributionOriginS3OriginConfig;
  CustomOriginConfig?: AwsCloudFrontDistributionOriginCustomOriginConfig;
}
export const AwsCloudFrontDistributionOriginItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.optional(S.String),
    Id: S.optional(S.String),
    OriginPath: S.optional(S.String),
    S3OriginConfig: S.optional(AwsCloudFrontDistributionOriginS3OriginConfig),
    CustomOriginConfig: S.optional(
      AwsCloudFrontDistributionOriginCustomOriginConfig,
    ),
  }),
).annotate({
  identifier: "AwsCloudFrontDistributionOriginItem",
}) as any as S.Schema<AwsCloudFrontDistributionOriginItem>;
export type AwsCloudFrontDistributionOriginItemList =
  AwsCloudFrontDistributionOriginItem[];
export const AwsCloudFrontDistributionOriginItemList = /*@__PURE__*/ S.Array(
  AwsCloudFrontDistributionOriginItem,
);
export interface AwsCloudFrontDistributionOrigins {
  Items?: AwsCloudFrontDistributionOriginItem[];
}
export const AwsCloudFrontDistributionOrigins = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Items: S.optional(AwsCloudFrontDistributionOriginItemList) }),
).annotate({
  identifier: "AwsCloudFrontDistributionOrigins",
}) as any as S.Schema<AwsCloudFrontDistributionOrigins>;
export type AwsCloudFrontDistributionOriginGroupFailoverStatusCodesItemList =
  number[];
export const AwsCloudFrontDistributionOriginGroupFailoverStatusCodesItemList =
  /*@__PURE__*/ S.Array(S.Number);
export interface AwsCloudFrontDistributionOriginGroupFailoverStatusCodes {
  Items?: number[];
  Quantity?: number;
}
export const AwsCloudFrontDistributionOriginGroupFailoverStatusCodes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Items: S.optional(
        AwsCloudFrontDistributionOriginGroupFailoverStatusCodesItemList,
      ),
      Quantity: S.optional(S.Number),
    }),
  ).annotate({
    identifier: "AwsCloudFrontDistributionOriginGroupFailoverStatusCodes",
  }) as any as S.Schema<AwsCloudFrontDistributionOriginGroupFailoverStatusCodes>;
export interface AwsCloudFrontDistributionOriginGroupFailover {
  StatusCodes?: AwsCloudFrontDistributionOriginGroupFailoverStatusCodes;
}
export const AwsCloudFrontDistributionOriginGroupFailover =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      StatusCodes: S.optional(
        AwsCloudFrontDistributionOriginGroupFailoverStatusCodes,
      ),
    }),
  ).annotate({
    identifier: "AwsCloudFrontDistributionOriginGroupFailover",
  }) as any as S.Schema<AwsCloudFrontDistributionOriginGroupFailover>;
export interface AwsCloudFrontDistributionOriginGroup {
  FailoverCriteria?: AwsCloudFrontDistributionOriginGroupFailover;
}
export const AwsCloudFrontDistributionOriginGroup = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FailoverCriteria: S.optional(
        AwsCloudFrontDistributionOriginGroupFailover,
      ),
    }),
).annotate({
  identifier: "AwsCloudFrontDistributionOriginGroup",
}) as any as S.Schema<AwsCloudFrontDistributionOriginGroup>;
export type AwsCloudFrontDistributionOriginGroupsItemList =
  AwsCloudFrontDistributionOriginGroup[];
export const AwsCloudFrontDistributionOriginGroupsItemList =
  /*@__PURE__*/ S.Array(AwsCloudFrontDistributionOriginGroup);
export interface AwsCloudFrontDistributionOriginGroups {
  Items?: AwsCloudFrontDistributionOriginGroup[];
}
export const AwsCloudFrontDistributionOriginGroups = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Items: S.optional(AwsCloudFrontDistributionOriginGroupsItemList),
    }),
).annotate({
  identifier: "AwsCloudFrontDistributionOriginGroups",
}) as any as S.Schema<AwsCloudFrontDistributionOriginGroups>;
export interface AwsCloudFrontDistributionViewerCertificate {
  AcmCertificateArn?: string;
  Certificate?: string;
  CertificateSource?: string;
  CloudFrontDefaultCertificate?: boolean;
  IamCertificateId?: string;
  MinimumProtocolVersion?: string;
  SslSupportMethod?: string;
}
export const AwsCloudFrontDistributionViewerCertificate =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AcmCertificateArn: S.optional(S.String),
      Certificate: S.optional(S.String),
      CertificateSource: S.optional(S.String),
      CloudFrontDefaultCertificate: S.optional(S.Boolean),
      IamCertificateId: S.optional(S.String),
      MinimumProtocolVersion: S.optional(S.String),
      SslSupportMethod: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsCloudFrontDistributionViewerCertificate",
  }) as any as S.Schema<AwsCloudFrontDistributionViewerCertificate>;
export interface AwsCloudFrontDistributionDetails {
  CacheBehaviors?: AwsCloudFrontDistributionCacheBehaviors;
  DefaultCacheBehavior?: AwsCloudFrontDistributionDefaultCacheBehavior;
  DefaultRootObject?: string;
  DomainName?: string;
  ETag?: string;
  LastModifiedTime?: string;
  Logging?: AwsCloudFrontDistributionLogging;
  Origins?: AwsCloudFrontDistributionOrigins;
  OriginGroups?: AwsCloudFrontDistributionOriginGroups;
  ViewerCertificate?: AwsCloudFrontDistributionViewerCertificate;
  Status?: string;
  WebAclId?: string;
}
export const AwsCloudFrontDistributionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheBehaviors: S.optional(AwsCloudFrontDistributionCacheBehaviors),
    DefaultCacheBehavior: S.optional(
      AwsCloudFrontDistributionDefaultCacheBehavior,
    ),
    DefaultRootObject: S.optional(S.String),
    DomainName: S.optional(S.String),
    ETag: S.optional(S.String),
    LastModifiedTime: S.optional(S.String),
    Logging: S.optional(AwsCloudFrontDistributionLogging),
    Origins: S.optional(AwsCloudFrontDistributionOrigins),
    OriginGroups: S.optional(AwsCloudFrontDistributionOriginGroups),
    ViewerCertificate: S.optional(AwsCloudFrontDistributionViewerCertificate),
    Status: S.optional(S.String),
    WebAclId: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsCloudFrontDistributionDetails",
}) as any as S.Schema<AwsCloudFrontDistributionDetails>;
export interface AwsEc2InstanceNetworkInterfacesDetails {
  NetworkInterfaceId?: string;
}
export const AwsEc2InstanceNetworkInterfacesDetails = /*@__PURE__*/ S.suspend(
  () => S.Struct({ NetworkInterfaceId: S.optional(S.String) }),
).annotate({
  identifier: "AwsEc2InstanceNetworkInterfacesDetails",
}) as any as S.Schema<AwsEc2InstanceNetworkInterfacesDetails>;
export type AwsEc2InstanceNetworkInterfacesList =
  AwsEc2InstanceNetworkInterfacesDetails[];
export const AwsEc2InstanceNetworkInterfacesList = /*@__PURE__*/ S.Array(
  AwsEc2InstanceNetworkInterfacesDetails,
);
export interface AwsEc2InstanceMetadataOptions {
  HttpEndpoint?: string;
  HttpProtocolIpv6?: string;
  HttpPutResponseHopLimit?: number;
  HttpTokens?: string;
  InstanceMetadataTags?: string;
}
export const AwsEc2InstanceMetadataOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HttpEndpoint: S.optional(S.String),
    HttpProtocolIpv6: S.optional(S.String),
    HttpPutResponseHopLimit: S.optional(S.Number),
    HttpTokens: S.optional(S.String),
    InstanceMetadataTags: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEc2InstanceMetadataOptions",
}) as any as S.Schema<AwsEc2InstanceMetadataOptions>;
export interface AwsEc2InstanceMonitoringDetails {
  State?: string;
}
export const AwsEc2InstanceMonitoringDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ State: S.optional(S.String) }),
).annotate({
  identifier: "AwsEc2InstanceMonitoringDetails",
}) as any as S.Schema<AwsEc2InstanceMonitoringDetails>;
export interface AwsEc2InstanceDetails {
  Type?: string;
  ImageId?: string;
  IpV4Addresses?: string[];
  IpV6Addresses?: string[];
  KeyName?: string;
  IamInstanceProfileArn?: string;
  VpcId?: string;
  SubnetId?: string;
  LaunchedAt?: string;
  NetworkInterfaces?: AwsEc2InstanceNetworkInterfacesDetails[];
  VirtualizationType?: string;
  MetadataOptions?: AwsEc2InstanceMetadataOptions;
  Monitoring?: AwsEc2InstanceMonitoringDetails;
}
export const AwsEc2InstanceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(S.String),
    ImageId: S.optional(S.String),
    IpV4Addresses: S.optional(StringList),
    IpV6Addresses: S.optional(StringList),
    KeyName: S.optional(S.String),
    IamInstanceProfileArn: S.optional(S.String),
    VpcId: S.optional(S.String),
    SubnetId: S.optional(S.String),
    LaunchedAt: S.optional(S.String),
    NetworkInterfaces: S.optional(AwsEc2InstanceNetworkInterfacesList),
    VirtualizationType: S.optional(S.String),
    MetadataOptions: S.optional(AwsEc2InstanceMetadataOptions),
    Monitoring: S.optional(AwsEc2InstanceMonitoringDetails),
  }),
).annotate({
  identifier: "AwsEc2InstanceDetails",
}) as any as S.Schema<AwsEc2InstanceDetails>;
export interface AwsEc2NetworkInterfaceAttachment {
  AttachTime?: string;
  AttachmentId?: string;
  DeleteOnTermination?: boolean;
  DeviceIndex?: number;
  InstanceId?: string;
  InstanceOwnerId?: string;
  Status?: string;
}
export const AwsEc2NetworkInterfaceAttachment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttachTime: S.optional(S.String),
    AttachmentId: S.optional(S.String),
    DeleteOnTermination: S.optional(S.Boolean),
    DeviceIndex: S.optional(S.Number),
    InstanceId: S.optional(S.String),
    InstanceOwnerId: S.optional(S.String),
    Status: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEc2NetworkInterfaceAttachment",
}) as any as S.Schema<AwsEc2NetworkInterfaceAttachment>;
export interface AwsEc2NetworkInterfaceSecurityGroup {
  GroupName?: string;
  GroupId?: string;
}
export const AwsEc2NetworkInterfaceSecurityGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupName: S.optional(S.String), GroupId: S.optional(S.String) }),
).annotate({
  identifier: "AwsEc2NetworkInterfaceSecurityGroup",
}) as any as S.Schema<AwsEc2NetworkInterfaceSecurityGroup>;
export type AwsEc2NetworkInterfaceSecurityGroupList =
  AwsEc2NetworkInterfaceSecurityGroup[];
export const AwsEc2NetworkInterfaceSecurityGroupList = /*@__PURE__*/ S.Array(
  AwsEc2NetworkInterfaceSecurityGroup,
);
export interface AwsEc2NetworkInterfaceIpV6AddressDetail {
  IpV6Address?: string;
}
export const AwsEc2NetworkInterfaceIpV6AddressDetail = /*@__PURE__*/ S.suspend(
  () => S.Struct({ IpV6Address: S.optional(S.String) }),
).annotate({
  identifier: "AwsEc2NetworkInterfaceIpV6AddressDetail",
}) as any as S.Schema<AwsEc2NetworkInterfaceIpV6AddressDetail>;
export type AwsEc2NetworkInterfaceIpV6AddressList =
  AwsEc2NetworkInterfaceIpV6AddressDetail[];
export const AwsEc2NetworkInterfaceIpV6AddressList = /*@__PURE__*/ S.Array(
  AwsEc2NetworkInterfaceIpV6AddressDetail,
);
export interface AwsEc2NetworkInterfacePrivateIpAddressDetail {
  PrivateIpAddress?: string;
  PrivateDnsName?: string;
}
export const AwsEc2NetworkInterfacePrivateIpAddressDetail =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      PrivateIpAddress: S.optional(S.String),
      PrivateDnsName: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsEc2NetworkInterfacePrivateIpAddressDetail",
  }) as any as S.Schema<AwsEc2NetworkInterfacePrivateIpAddressDetail>;
export type AwsEc2NetworkInterfacePrivateIpAddressList =
  AwsEc2NetworkInterfacePrivateIpAddressDetail[];
export const AwsEc2NetworkInterfacePrivateIpAddressList = /*@__PURE__*/ S.Array(
  AwsEc2NetworkInterfacePrivateIpAddressDetail,
);
export interface AwsEc2NetworkInterfaceDetails {
  Attachment?: AwsEc2NetworkInterfaceAttachment;
  NetworkInterfaceId?: string;
  SecurityGroups?: AwsEc2NetworkInterfaceSecurityGroup[];
  SourceDestCheck?: boolean;
  IpV6Addresses?: AwsEc2NetworkInterfaceIpV6AddressDetail[];
  PrivateIpAddresses?: AwsEc2NetworkInterfacePrivateIpAddressDetail[];
  PublicDnsName?: string;
  PublicIp?: string;
}
export const AwsEc2NetworkInterfaceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attachment: S.optional(AwsEc2NetworkInterfaceAttachment),
    NetworkInterfaceId: S.optional(S.String),
    SecurityGroups: S.optional(AwsEc2NetworkInterfaceSecurityGroupList),
    SourceDestCheck: S.optional(S.Boolean),
    IpV6Addresses: S.optional(AwsEc2NetworkInterfaceIpV6AddressList),
    PrivateIpAddresses: S.optional(AwsEc2NetworkInterfacePrivateIpAddressList),
    PublicDnsName: S.optional(S.String),
    PublicIp: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEc2NetworkInterfaceDetails",
}) as any as S.Schema<AwsEc2NetworkInterfaceDetails>;
export interface AwsEc2SecurityGroupUserIdGroupPair {
  GroupId?: string;
  GroupName?: string;
  PeeringStatus?: string;
  UserId?: string;
  VpcId?: string;
  VpcPeeringConnectionId?: string;
}
export const AwsEc2SecurityGroupUserIdGroupPair = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupId: S.optional(S.String),
    GroupName: S.optional(S.String),
    PeeringStatus: S.optional(S.String),
    UserId: S.optional(S.String),
    VpcId: S.optional(S.String),
    VpcPeeringConnectionId: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEc2SecurityGroupUserIdGroupPair",
}) as any as S.Schema<AwsEc2SecurityGroupUserIdGroupPair>;
export type AwsEc2SecurityGroupUserIdGroupPairList =
  AwsEc2SecurityGroupUserIdGroupPair[];
export const AwsEc2SecurityGroupUserIdGroupPairList = /*@__PURE__*/ S.Array(
  AwsEc2SecurityGroupUserIdGroupPair,
);
export interface AwsEc2SecurityGroupIpRange {
  CidrIp?: string;
}
export const AwsEc2SecurityGroupIpRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CidrIp: S.optional(S.String) }),
).annotate({
  identifier: "AwsEc2SecurityGroupIpRange",
}) as any as S.Schema<AwsEc2SecurityGroupIpRange>;
export type AwsEc2SecurityGroupIpRangeList = AwsEc2SecurityGroupIpRange[];
export const AwsEc2SecurityGroupIpRangeList = /*@__PURE__*/ S.Array(
  AwsEc2SecurityGroupIpRange,
);
export interface AwsEc2SecurityGroupIpv6Range {
  CidrIpv6?: string;
}
export const AwsEc2SecurityGroupIpv6Range = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CidrIpv6: S.optional(S.String) }),
).annotate({
  identifier: "AwsEc2SecurityGroupIpv6Range",
}) as any as S.Schema<AwsEc2SecurityGroupIpv6Range>;
export type AwsEc2SecurityGroupIpv6RangeList = AwsEc2SecurityGroupIpv6Range[];
export const AwsEc2SecurityGroupIpv6RangeList = /*@__PURE__*/ S.Array(
  AwsEc2SecurityGroupIpv6Range,
);
export interface AwsEc2SecurityGroupPrefixListId {
  PrefixListId?: string;
}
export const AwsEc2SecurityGroupPrefixListId = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PrefixListId: S.optional(S.String) }),
).annotate({
  identifier: "AwsEc2SecurityGroupPrefixListId",
}) as any as S.Schema<AwsEc2SecurityGroupPrefixListId>;
export type AwsEc2SecurityGroupPrefixListIdList =
  AwsEc2SecurityGroupPrefixListId[];
export const AwsEc2SecurityGroupPrefixListIdList = /*@__PURE__*/ S.Array(
  AwsEc2SecurityGroupPrefixListId,
);
export interface AwsEc2SecurityGroupIpPermission {
  IpProtocol?: string;
  FromPort?: number;
  ToPort?: number;
  UserIdGroupPairs?: AwsEc2SecurityGroupUserIdGroupPair[];
  IpRanges?: AwsEc2SecurityGroupIpRange[];
  Ipv6Ranges?: AwsEc2SecurityGroupIpv6Range[];
  PrefixListIds?: AwsEc2SecurityGroupPrefixListId[];
}
export const AwsEc2SecurityGroupIpPermission = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IpProtocol: S.optional(S.String),
    FromPort: S.optional(S.Number),
    ToPort: S.optional(S.Number),
    UserIdGroupPairs: S.optional(AwsEc2SecurityGroupUserIdGroupPairList),
    IpRanges: S.optional(AwsEc2SecurityGroupIpRangeList),
    Ipv6Ranges: S.optional(AwsEc2SecurityGroupIpv6RangeList),
    PrefixListIds: S.optional(AwsEc2SecurityGroupPrefixListIdList),
  }),
).annotate({
  identifier: "AwsEc2SecurityGroupIpPermission",
}) as any as S.Schema<AwsEc2SecurityGroupIpPermission>;
export type AwsEc2SecurityGroupIpPermissionList =
  AwsEc2SecurityGroupIpPermission[];
export const AwsEc2SecurityGroupIpPermissionList = /*@__PURE__*/ S.Array(
  AwsEc2SecurityGroupIpPermission,
);
export interface AwsEc2SecurityGroupDetails {
  GroupName?: string;
  GroupId?: string;
  OwnerId?: string;
  VpcId?: string;
  IpPermissions?: AwsEc2SecurityGroupIpPermission[];
  IpPermissionsEgress?: AwsEc2SecurityGroupIpPermission[];
}
export const AwsEc2SecurityGroupDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupName: S.optional(S.String),
    GroupId: S.optional(S.String),
    OwnerId: S.optional(S.String),
    VpcId: S.optional(S.String),
    IpPermissions: S.optional(AwsEc2SecurityGroupIpPermissionList),
    IpPermissionsEgress: S.optional(AwsEc2SecurityGroupIpPermissionList),
  }),
).annotate({
  identifier: "AwsEc2SecurityGroupDetails",
}) as any as S.Schema<AwsEc2SecurityGroupDetails>;
export interface AwsEc2VolumeAttachment {
  AttachTime?: string;
  DeleteOnTermination?: boolean;
  InstanceId?: string;
  Status?: string;
}
export const AwsEc2VolumeAttachment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttachTime: S.optional(S.String),
    DeleteOnTermination: S.optional(S.Boolean),
    InstanceId: S.optional(S.String),
    Status: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEc2VolumeAttachment",
}) as any as S.Schema<AwsEc2VolumeAttachment>;
export type AwsEc2VolumeAttachmentList = AwsEc2VolumeAttachment[];
export const AwsEc2VolumeAttachmentList = /*@__PURE__*/ S.Array(
  AwsEc2VolumeAttachment,
);
export interface AwsEc2VolumeDetails {
  CreateTime?: string;
  DeviceName?: string;
  Encrypted?: boolean;
  Size?: number;
  SnapshotId?: string;
  Status?: string;
  KmsKeyId?: string;
  Attachments?: AwsEc2VolumeAttachment[];
  VolumeId?: string;
  VolumeType?: string;
  VolumeScanStatus?: string;
}
export const AwsEc2VolumeDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreateTime: S.optional(S.String),
    DeviceName: S.optional(S.String),
    Encrypted: S.optional(S.Boolean),
    Size: S.optional(S.Number),
    SnapshotId: S.optional(S.String),
    Status: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    Attachments: S.optional(AwsEc2VolumeAttachmentList),
    VolumeId: S.optional(S.String),
    VolumeType: S.optional(S.String),
    VolumeScanStatus: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEc2VolumeDetails",
}) as any as S.Schema<AwsEc2VolumeDetails>;
export interface CidrBlockAssociation {
  AssociationId?: string;
  CidrBlock?: string;
  CidrBlockState?: string;
}
export const CidrBlockAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssociationId: S.optional(S.String),
    CidrBlock: S.optional(S.String),
    CidrBlockState: S.optional(S.String),
  }),
).annotate({
  identifier: "CidrBlockAssociation",
}) as any as S.Schema<CidrBlockAssociation>;
export type CidrBlockAssociationList = CidrBlockAssociation[];
export const CidrBlockAssociationList =
  /*@__PURE__*/ S.Array(CidrBlockAssociation);
export interface Ipv6CidrBlockAssociation {
  AssociationId?: string;
  Ipv6CidrBlock?: string;
  CidrBlockState?: string;
}
export const Ipv6CidrBlockAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssociationId: S.optional(S.String),
    Ipv6CidrBlock: S.optional(S.String),
    CidrBlockState: S.optional(S.String),
  }),
).annotate({
  identifier: "Ipv6CidrBlockAssociation",
}) as any as S.Schema<Ipv6CidrBlockAssociation>;
export type Ipv6CidrBlockAssociationList = Ipv6CidrBlockAssociation[];
export const Ipv6CidrBlockAssociationList = /*@__PURE__*/ S.Array(
  Ipv6CidrBlockAssociation,
);
export interface AwsEc2VpcDetails {
  CidrBlockAssociationSet?: CidrBlockAssociation[];
  Ipv6CidrBlockAssociationSet?: Ipv6CidrBlockAssociation[];
  DhcpOptionsId?: string;
  State?: string;
}
export const AwsEc2VpcDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CidrBlockAssociationSet: S.optional(CidrBlockAssociationList),
    Ipv6CidrBlockAssociationSet: S.optional(Ipv6CidrBlockAssociationList),
    DhcpOptionsId: S.optional(S.String),
    State: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEc2VpcDetails",
}) as any as S.Schema<AwsEc2VpcDetails>;
export interface AwsEc2EipDetails {
  InstanceId?: string;
  PublicIp?: string;
  AllocationId?: string;
  AssociationId?: string;
  Domain?: string;
  PublicIpv4Pool?: string;
  NetworkBorderGroup?: string;
  NetworkInterfaceId?: string;
  NetworkInterfaceOwnerId?: string;
  PrivateIpAddress?: string;
}
export const AwsEc2EipDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceId: S.optional(S.String),
    PublicIp: S.optional(S.String),
    AllocationId: S.optional(S.String),
    AssociationId: S.optional(S.String),
    Domain: S.optional(S.String),
    PublicIpv4Pool: S.optional(S.String),
    NetworkBorderGroup: S.optional(S.String),
    NetworkInterfaceId: S.optional(S.String),
    NetworkInterfaceOwnerId: S.optional(S.String),
    PrivateIpAddress: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEc2EipDetails",
}) as any as S.Schema<AwsEc2EipDetails>;
export interface AwsEc2SubnetDetails {
  AssignIpv6AddressOnCreation?: boolean;
  AvailabilityZone?: string;
  AvailabilityZoneId?: string;
  AvailableIpAddressCount?: number;
  CidrBlock?: string;
  DefaultForAz?: boolean;
  MapPublicIpOnLaunch?: boolean;
  OwnerId?: string;
  State?: string;
  SubnetArn?: string;
  SubnetId?: string;
  VpcId?: string;
  Ipv6CidrBlockAssociationSet?: Ipv6CidrBlockAssociation[];
}
export const AwsEc2SubnetDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssignIpv6AddressOnCreation: S.optional(S.Boolean),
    AvailabilityZone: S.optional(S.String),
    AvailabilityZoneId: S.optional(S.String),
    AvailableIpAddressCount: S.optional(S.Number),
    CidrBlock: S.optional(S.String),
    DefaultForAz: S.optional(S.Boolean),
    MapPublicIpOnLaunch: S.optional(S.Boolean),
    OwnerId: S.optional(S.String),
    State: S.optional(S.String),
    SubnetArn: S.optional(S.String),
    SubnetId: S.optional(S.String),
    VpcId: S.optional(S.String),
    Ipv6CidrBlockAssociationSet: S.optional(Ipv6CidrBlockAssociationList),
  }),
).annotate({
  identifier: "AwsEc2SubnetDetails",
}) as any as S.Schema<AwsEc2SubnetDetails>;
export interface AwsEc2NetworkAclAssociation {
  NetworkAclAssociationId?: string;
  NetworkAclId?: string;
  SubnetId?: string;
}
export const AwsEc2NetworkAclAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetworkAclAssociationId: S.optional(S.String),
    NetworkAclId: S.optional(S.String),
    SubnetId: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEc2NetworkAclAssociation",
}) as any as S.Schema<AwsEc2NetworkAclAssociation>;
export type AwsEc2NetworkAclAssociationList = AwsEc2NetworkAclAssociation[];
export const AwsEc2NetworkAclAssociationList = /*@__PURE__*/ S.Array(
  AwsEc2NetworkAclAssociation,
);
export interface IcmpTypeCode {
  Code?: number;
  Type?: number;
}
export const IcmpTypeCode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Code: S.optional(S.Number), Type: S.optional(S.Number) }),
).annotate({ identifier: "IcmpTypeCode" }) as any as S.Schema<IcmpTypeCode>;
export interface PortRangeFromTo {
  From?: number;
  To?: number;
}
export const PortRangeFromTo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ From: S.optional(S.Number), To: S.optional(S.Number) }),
).annotate({
  identifier: "PortRangeFromTo",
}) as any as S.Schema<PortRangeFromTo>;
export interface AwsEc2NetworkAclEntry {
  CidrBlock?: string;
  Egress?: boolean;
  IcmpTypeCode?: IcmpTypeCode;
  Ipv6CidrBlock?: string;
  PortRange?: PortRangeFromTo;
  Protocol?: string;
  RuleAction?: string;
  RuleNumber?: number;
}
export const AwsEc2NetworkAclEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CidrBlock: S.optional(S.String),
    Egress: S.optional(S.Boolean),
    IcmpTypeCode: S.optional(IcmpTypeCode),
    Ipv6CidrBlock: S.optional(S.String),
    PortRange: S.optional(PortRangeFromTo),
    Protocol: S.optional(S.String),
    RuleAction: S.optional(S.String),
    RuleNumber: S.optional(S.Number),
  }),
).annotate({
  identifier: "AwsEc2NetworkAclEntry",
}) as any as S.Schema<AwsEc2NetworkAclEntry>;
export type AwsEc2NetworkAclEntryList = AwsEc2NetworkAclEntry[];
export const AwsEc2NetworkAclEntryList = /*@__PURE__*/ S.Array(
  AwsEc2NetworkAclEntry,
);
export interface AwsEc2NetworkAclDetails {
  IsDefault?: boolean;
  NetworkAclId?: string;
  OwnerId?: string;
  VpcId?: string;
  Associations?: AwsEc2NetworkAclAssociation[];
  Entries?: AwsEc2NetworkAclEntry[];
}
export const AwsEc2NetworkAclDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IsDefault: S.optional(S.Boolean),
    NetworkAclId: S.optional(S.String),
    OwnerId: S.optional(S.String),
    VpcId: S.optional(S.String),
    Associations: S.optional(AwsEc2NetworkAclAssociationList),
    Entries: S.optional(AwsEc2NetworkAclEntryList),
  }),
).annotate({
  identifier: "AwsEc2NetworkAclDetails",
}) as any as S.Schema<AwsEc2NetworkAclDetails>;
export interface AvailabilityZone {
  ZoneName?: string;
  SubnetId?: string;
}
export const AvailabilityZone = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ZoneName: S.optional(S.String), SubnetId: S.optional(S.String) }),
).annotate({
  identifier: "AvailabilityZone",
}) as any as S.Schema<AvailabilityZone>;
export type AvailabilityZones = AvailabilityZone[];
export const AvailabilityZones = /*@__PURE__*/ S.Array(AvailabilityZone);
export type SecurityGroups = string[];
export const SecurityGroups = /*@__PURE__*/ S.Array(S.String);
export interface LoadBalancerState {
  Code?: string;
  Reason?: string;
}
export const LoadBalancerState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Code: S.optional(S.String), Reason: S.optional(S.String) }),
).annotate({
  identifier: "LoadBalancerState",
}) as any as S.Schema<LoadBalancerState>;
export interface AwsElbv2LoadBalancerAttribute {
  Key?: string;
  Value?: string;
}
export const AwsElbv2LoadBalancerAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({
  identifier: "AwsElbv2LoadBalancerAttribute",
}) as any as S.Schema<AwsElbv2LoadBalancerAttribute>;
export type AwsElbv2LoadBalancerAttributes = AwsElbv2LoadBalancerAttribute[];
export const AwsElbv2LoadBalancerAttributes = /*@__PURE__*/ S.Array(
  AwsElbv2LoadBalancerAttribute,
);
export interface AwsElbv2LoadBalancerDetails {
  AvailabilityZones?: AvailabilityZone[];
  CanonicalHostedZoneId?: string;
  CreatedTime?: string;
  DNSName?: string;
  IpAddressType?: string;
  Scheme?: string;
  SecurityGroups?: string[];
  State?: LoadBalancerState;
  Type?: string;
  VpcId?: string;
  LoadBalancerAttributes?: AwsElbv2LoadBalancerAttribute[];
}
export const AwsElbv2LoadBalancerDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityZones: S.optional(AvailabilityZones),
    CanonicalHostedZoneId: S.optional(S.String),
    CreatedTime: S.optional(S.String),
    DNSName: S.optional(S.String),
    IpAddressType: S.optional(S.String),
    Scheme: S.optional(S.String),
    SecurityGroups: S.optional(SecurityGroups),
    State: S.optional(LoadBalancerState),
    Type: S.optional(S.String),
    VpcId: S.optional(S.String),
    LoadBalancerAttributes: S.optional(AwsElbv2LoadBalancerAttributes),
  }),
).annotate({
  identifier: "AwsElbv2LoadBalancerDetails",
}) as any as S.Schema<AwsElbv2LoadBalancerDetails>;
export interface AwsElasticBeanstalkEnvironmentEnvironmentLink {
  EnvironmentName?: string;
  LinkName?: string;
}
export const AwsElasticBeanstalkEnvironmentEnvironmentLink =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      EnvironmentName: S.optional(S.String),
      LinkName: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsElasticBeanstalkEnvironmentEnvironmentLink",
  }) as any as S.Schema<AwsElasticBeanstalkEnvironmentEnvironmentLink>;
export type AwsElasticBeanstalkEnvironmentEnvironmentLinks =
  AwsElasticBeanstalkEnvironmentEnvironmentLink[];
export const AwsElasticBeanstalkEnvironmentEnvironmentLinks =
  /*@__PURE__*/ S.Array(AwsElasticBeanstalkEnvironmentEnvironmentLink);
export interface AwsElasticBeanstalkEnvironmentOptionSetting {
  Namespace?: string;
  OptionName?: string;
  ResourceName?: string;
  Value?: string;
}
export const AwsElasticBeanstalkEnvironmentOptionSetting =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Namespace: S.optional(S.String),
      OptionName: S.optional(S.String),
      ResourceName: S.optional(S.String),
      Value: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsElasticBeanstalkEnvironmentOptionSetting",
  }) as any as S.Schema<AwsElasticBeanstalkEnvironmentOptionSetting>;
export type AwsElasticBeanstalkEnvironmentOptionSettings =
  AwsElasticBeanstalkEnvironmentOptionSetting[];
export const AwsElasticBeanstalkEnvironmentOptionSettings =
  /*@__PURE__*/ S.Array(AwsElasticBeanstalkEnvironmentOptionSetting);
export interface AwsElasticBeanstalkEnvironmentTier {
  Name?: string;
  Type?: string;
  Version?: string;
}
export const AwsElasticBeanstalkEnvironmentTier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Type: S.optional(S.String),
    Version: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsElasticBeanstalkEnvironmentTier",
}) as any as S.Schema<AwsElasticBeanstalkEnvironmentTier>;
export interface AwsElasticBeanstalkEnvironmentDetails {
  ApplicationName?: string;
  Cname?: string;
  DateCreated?: string;
  DateUpdated?: string;
  Description?: string;
  EndpointUrl?: string;
  EnvironmentArn?: string;
  EnvironmentId?: string;
  EnvironmentLinks?: AwsElasticBeanstalkEnvironmentEnvironmentLink[];
  EnvironmentName?: string;
  OptionSettings?: AwsElasticBeanstalkEnvironmentOptionSetting[];
  PlatformArn?: string;
  SolutionStackName?: string;
  Status?: string;
  Tier?: AwsElasticBeanstalkEnvironmentTier;
  VersionLabel?: string;
}
export const AwsElasticBeanstalkEnvironmentDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ApplicationName: S.optional(S.String),
      Cname: S.optional(S.String),
      DateCreated: S.optional(S.String),
      DateUpdated: S.optional(S.String),
      Description: S.optional(S.String),
      EndpointUrl: S.optional(S.String),
      EnvironmentArn: S.optional(S.String),
      EnvironmentId: S.optional(S.String),
      EnvironmentLinks: S.optional(
        AwsElasticBeanstalkEnvironmentEnvironmentLinks,
      ),
      EnvironmentName: S.optional(S.String),
      OptionSettings: S.optional(AwsElasticBeanstalkEnvironmentOptionSettings),
      PlatformArn: S.optional(S.String),
      SolutionStackName: S.optional(S.String),
      Status: S.optional(S.String),
      Tier: S.optional(AwsElasticBeanstalkEnvironmentTier),
      VersionLabel: S.optional(S.String),
    }),
).annotate({
  identifier: "AwsElasticBeanstalkEnvironmentDetails",
}) as any as S.Schema<AwsElasticBeanstalkEnvironmentDetails>;
export interface AwsElasticsearchDomainDomainEndpointOptions {
  EnforceHTTPS?: boolean;
  TLSSecurityPolicy?: string;
}
export const AwsElasticsearchDomainDomainEndpointOptions =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      EnforceHTTPS: S.optional(S.Boolean),
      TLSSecurityPolicy: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsElasticsearchDomainDomainEndpointOptions",
  }) as any as S.Schema<AwsElasticsearchDomainDomainEndpointOptions>;
export interface AwsElasticsearchDomainElasticsearchClusterConfigZoneAwarenessConfigDetails {
  AvailabilityZoneCount?: number;
}
export const AwsElasticsearchDomainElasticsearchClusterConfigZoneAwarenessConfigDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ AvailabilityZoneCount: S.optional(S.Number) }),
  ).annotate({
    identifier:
      "AwsElasticsearchDomainElasticsearchClusterConfigZoneAwarenessConfigDetails",
  }) as any as S.Schema<AwsElasticsearchDomainElasticsearchClusterConfigZoneAwarenessConfigDetails>;
export interface AwsElasticsearchDomainElasticsearchClusterConfigDetails {
  DedicatedMasterCount?: number;
  DedicatedMasterEnabled?: boolean;
  DedicatedMasterType?: string;
  InstanceCount?: number;
  InstanceType?: string;
  ZoneAwarenessConfig?: AwsElasticsearchDomainElasticsearchClusterConfigZoneAwarenessConfigDetails;
  ZoneAwarenessEnabled?: boolean;
}
export const AwsElasticsearchDomainElasticsearchClusterConfigDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DedicatedMasterCount: S.optional(S.Number),
      DedicatedMasterEnabled: S.optional(S.Boolean),
      DedicatedMasterType: S.optional(S.String),
      InstanceCount: S.optional(S.Number),
      InstanceType: S.optional(S.String),
      ZoneAwarenessConfig: S.optional(
        AwsElasticsearchDomainElasticsearchClusterConfigZoneAwarenessConfigDetails,
      ),
      ZoneAwarenessEnabled: S.optional(S.Boolean),
    }),
  ).annotate({
    identifier: "AwsElasticsearchDomainElasticsearchClusterConfigDetails",
  }) as any as S.Schema<AwsElasticsearchDomainElasticsearchClusterConfigDetails>;
export interface AwsElasticsearchDomainEncryptionAtRestOptions {
  Enabled?: boolean;
  KmsKeyId?: string;
}
export const AwsElasticsearchDomainEncryptionAtRestOptions =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Enabled: S.optional(S.Boolean),
      KmsKeyId: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsElasticsearchDomainEncryptionAtRestOptions",
  }) as any as S.Schema<AwsElasticsearchDomainEncryptionAtRestOptions>;
export interface AwsElasticsearchDomainLogPublishingOptionsLogConfig {
  CloudWatchLogsLogGroupArn?: string;
  Enabled?: boolean;
}
export const AwsElasticsearchDomainLogPublishingOptionsLogConfig =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CloudWatchLogsLogGroupArn: S.optional(S.String),
      Enabled: S.optional(S.Boolean),
    }),
  ).annotate({
    identifier: "AwsElasticsearchDomainLogPublishingOptionsLogConfig",
  }) as any as S.Schema<AwsElasticsearchDomainLogPublishingOptionsLogConfig>;
export interface AwsElasticsearchDomainLogPublishingOptions {
  IndexSlowLogs?: AwsElasticsearchDomainLogPublishingOptionsLogConfig;
  SearchSlowLogs?: AwsElasticsearchDomainLogPublishingOptionsLogConfig;
  AuditLogs?: AwsElasticsearchDomainLogPublishingOptionsLogConfig;
}
export const AwsElasticsearchDomainLogPublishingOptions =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      IndexSlowLogs: S.optional(
        AwsElasticsearchDomainLogPublishingOptionsLogConfig,
      ),
      SearchSlowLogs: S.optional(
        AwsElasticsearchDomainLogPublishingOptionsLogConfig,
      ),
      AuditLogs: S.optional(
        AwsElasticsearchDomainLogPublishingOptionsLogConfig,
      ),
    }),
  ).annotate({
    identifier: "AwsElasticsearchDomainLogPublishingOptions",
  }) as any as S.Schema<AwsElasticsearchDomainLogPublishingOptions>;
export interface AwsElasticsearchDomainNodeToNodeEncryptionOptions {
  Enabled?: boolean;
}
export const AwsElasticsearchDomainNodeToNodeEncryptionOptions =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Enabled: S.optional(S.Boolean) }),
  ).annotate({
    identifier: "AwsElasticsearchDomainNodeToNodeEncryptionOptions",
  }) as any as S.Schema<AwsElasticsearchDomainNodeToNodeEncryptionOptions>;
export interface AwsElasticsearchDomainServiceSoftwareOptions {
  AutomatedUpdateDate?: string;
  Cancellable?: boolean;
  CurrentVersion?: string;
  Description?: string;
  NewVersion?: string;
  UpdateAvailable?: boolean;
  UpdateStatus?: string;
}
export const AwsElasticsearchDomainServiceSoftwareOptions =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AutomatedUpdateDate: S.optional(S.String),
      Cancellable: S.optional(S.Boolean),
      CurrentVersion: S.optional(S.String),
      Description: S.optional(S.String),
      NewVersion: S.optional(S.String),
      UpdateAvailable: S.optional(S.Boolean),
      UpdateStatus: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsElasticsearchDomainServiceSoftwareOptions",
  }) as any as S.Schema<AwsElasticsearchDomainServiceSoftwareOptions>;
export interface AwsElasticsearchDomainVPCOptions {
  AvailabilityZones?: string[];
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
  VPCId?: string;
}
export const AwsElasticsearchDomainVPCOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityZones: S.optional(NonEmptyStringList),
    SecurityGroupIds: S.optional(NonEmptyStringList),
    SubnetIds: S.optional(NonEmptyStringList),
    VPCId: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsElasticsearchDomainVPCOptions",
}) as any as S.Schema<AwsElasticsearchDomainVPCOptions>;
export interface AwsElasticsearchDomainDetails {
  AccessPolicies?: string;
  DomainEndpointOptions?: AwsElasticsearchDomainDomainEndpointOptions;
  DomainId?: string;
  DomainName?: string;
  Endpoint?: string;
  Endpoints?: { [key: string]: string | undefined };
  ElasticsearchVersion?: string;
  ElasticsearchClusterConfig?: AwsElasticsearchDomainElasticsearchClusterConfigDetails;
  EncryptionAtRestOptions?: AwsElasticsearchDomainEncryptionAtRestOptions;
  LogPublishingOptions?: AwsElasticsearchDomainLogPublishingOptions;
  NodeToNodeEncryptionOptions?: AwsElasticsearchDomainNodeToNodeEncryptionOptions;
  ServiceSoftwareOptions?: AwsElasticsearchDomainServiceSoftwareOptions;
  VPCOptions?: AwsElasticsearchDomainVPCOptions;
}
export const AwsElasticsearchDomainDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessPolicies: S.optional(S.String),
    DomainEndpointOptions: S.optional(
      AwsElasticsearchDomainDomainEndpointOptions,
    ),
    DomainId: S.optional(S.String),
    DomainName: S.optional(S.String),
    Endpoint: S.optional(S.String),
    Endpoints: S.optional(FieldMap),
    ElasticsearchVersion: S.optional(S.String),
    ElasticsearchClusterConfig: S.optional(
      AwsElasticsearchDomainElasticsearchClusterConfigDetails,
    ),
    EncryptionAtRestOptions: S.optional(
      AwsElasticsearchDomainEncryptionAtRestOptions,
    ),
    LogPublishingOptions: S.optional(
      AwsElasticsearchDomainLogPublishingOptions,
    ),
    NodeToNodeEncryptionOptions: S.optional(
      AwsElasticsearchDomainNodeToNodeEncryptionOptions,
    ),
    ServiceSoftwareOptions: S.optional(
      AwsElasticsearchDomainServiceSoftwareOptions,
    ),
    VPCOptions: S.optional(AwsElasticsearchDomainVPCOptions),
  }),
).annotate({
  identifier: "AwsElasticsearchDomainDetails",
}) as any as S.Schema<AwsElasticsearchDomainDetails>;
export interface AwsS3BucketServerSideEncryptionByDefault {
  SSEAlgorithm?: string;
  KMSMasterKeyID?: string;
}
export const AwsS3BucketServerSideEncryptionByDefault = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SSEAlgorithm: S.optional(S.String),
      KMSMasterKeyID: S.optional(S.String),
    }),
).annotate({
  identifier: "AwsS3BucketServerSideEncryptionByDefault",
}) as any as S.Schema<AwsS3BucketServerSideEncryptionByDefault>;
export interface AwsS3BucketServerSideEncryptionRule {
  ApplyServerSideEncryptionByDefault?: AwsS3BucketServerSideEncryptionByDefault;
}
export const AwsS3BucketServerSideEncryptionRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplyServerSideEncryptionByDefault: S.optional(
      AwsS3BucketServerSideEncryptionByDefault,
    ),
  }),
).annotate({
  identifier: "AwsS3BucketServerSideEncryptionRule",
}) as any as S.Schema<AwsS3BucketServerSideEncryptionRule>;
export type AwsS3BucketServerSideEncryptionRules =
  AwsS3BucketServerSideEncryptionRule[];
export const AwsS3BucketServerSideEncryptionRules = /*@__PURE__*/ S.Array(
  AwsS3BucketServerSideEncryptionRule,
);
export interface AwsS3BucketServerSideEncryptionConfiguration {
  Rules?: AwsS3BucketServerSideEncryptionRule[];
}
export const AwsS3BucketServerSideEncryptionConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Rules: S.optional(AwsS3BucketServerSideEncryptionRules) }),
  ).annotate({
    identifier: "AwsS3BucketServerSideEncryptionConfiguration",
  }) as any as S.Schema<AwsS3BucketServerSideEncryptionConfiguration>;
export interface AwsS3BucketBucketLifecycleConfigurationRulesAbortIncompleteMultipartUploadDetails {
  DaysAfterInitiation?: number;
}
export const AwsS3BucketBucketLifecycleConfigurationRulesAbortIncompleteMultipartUploadDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ DaysAfterInitiation: S.optional(S.Number) }),
  ).annotate({
    identifier:
      "AwsS3BucketBucketLifecycleConfigurationRulesAbortIncompleteMultipartUploadDetails",
  }) as any as S.Schema<AwsS3BucketBucketLifecycleConfigurationRulesAbortIncompleteMultipartUploadDetails>;
export interface AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsTagDetails {
  Key?: string;
  Value?: string;
}
export const AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsTagDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
  ).annotate({
    identifier:
      "AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsTagDetails",
  }) as any as S.Schema<AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsTagDetails>;
export interface AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsDetails {
  Prefix?: string;
  Tag?: AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsTagDetails;
  Type?: string;
}
export const AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Prefix: S.optional(S.String),
      Tag: S.optional(
        AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsTagDetails,
      ),
      Type: S.optional(S.String),
    }),
  ).annotate({
    identifier:
      "AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsDetails",
  }) as any as S.Schema<AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsDetails>;
export type AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsList =
  AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsDetails[];
export const AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsList =
  /*@__PURE__*/ S.Array(
    AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsDetails,
  );
export interface AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateTagDetails {
  Key?: string;
  Value?: string;
}
export const AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateTagDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
  ).annotate({
    identifier:
      "AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateTagDetails",
  }) as any as S.Schema<AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateTagDetails>;
export interface AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateDetails {
  Operands?: AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsDetails[];
  Prefix?: string;
  Tag?: AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateTagDetails;
  Type?: string;
}
export const AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Operands: S.optional(
        AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsList,
      ),
      Prefix: S.optional(S.String),
      Tag: S.optional(
        AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateTagDetails,
      ),
      Type: S.optional(S.String),
    }),
  ).annotate({
    identifier:
      "AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateDetails",
  }) as any as S.Schema<AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateDetails>;
export interface AwsS3BucketBucketLifecycleConfigurationRulesFilterDetails {
  Predicate?: AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateDetails;
}
export const AwsS3BucketBucketLifecycleConfigurationRulesFilterDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Predicate: S.optional(
        AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateDetails,
      ),
    }),
  ).annotate({
    identifier: "AwsS3BucketBucketLifecycleConfigurationRulesFilterDetails",
  }) as any as S.Schema<AwsS3BucketBucketLifecycleConfigurationRulesFilterDetails>;
export interface AwsS3BucketBucketLifecycleConfigurationRulesNoncurrentVersionTransitionsDetails {
  Days?: number;
  StorageClass?: string;
}
export const AwsS3BucketBucketLifecycleConfigurationRulesNoncurrentVersionTransitionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Days: S.optional(S.Number),
      StorageClass: S.optional(S.String),
    }),
  ).annotate({
    identifier:
      "AwsS3BucketBucketLifecycleConfigurationRulesNoncurrentVersionTransitionsDetails",
  }) as any as S.Schema<AwsS3BucketBucketLifecycleConfigurationRulesNoncurrentVersionTransitionsDetails>;
export type AwsS3BucketBucketLifecycleConfigurationRulesNoncurrentVersionTransitionsList =
  AwsS3BucketBucketLifecycleConfigurationRulesNoncurrentVersionTransitionsDetails[];
export const AwsS3BucketBucketLifecycleConfigurationRulesNoncurrentVersionTransitionsList =
  /*@__PURE__*/ S.Array(
    AwsS3BucketBucketLifecycleConfigurationRulesNoncurrentVersionTransitionsDetails,
  );
export interface AwsS3BucketBucketLifecycleConfigurationRulesTransitionsDetails {
  Date?: string;
  Days?: number;
  StorageClass?: string;
}
export const AwsS3BucketBucketLifecycleConfigurationRulesTransitionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Date: S.optional(S.String),
      Days: S.optional(S.Number),
      StorageClass: S.optional(S.String),
    }),
  ).annotate({
    identifier:
      "AwsS3BucketBucketLifecycleConfigurationRulesTransitionsDetails",
  }) as any as S.Schema<AwsS3BucketBucketLifecycleConfigurationRulesTransitionsDetails>;
export type AwsS3BucketBucketLifecycleConfigurationRulesTransitionsList =
  AwsS3BucketBucketLifecycleConfigurationRulesTransitionsDetails[];
export const AwsS3BucketBucketLifecycleConfigurationRulesTransitionsList =
  /*@__PURE__*/ S.Array(
    AwsS3BucketBucketLifecycleConfigurationRulesTransitionsDetails,
  );
export interface AwsS3BucketBucketLifecycleConfigurationRulesDetails {
  AbortIncompleteMultipartUpload?: AwsS3BucketBucketLifecycleConfigurationRulesAbortIncompleteMultipartUploadDetails;
  ExpirationDate?: string;
  ExpirationInDays?: number;
  ExpiredObjectDeleteMarker?: boolean;
  Filter?: AwsS3BucketBucketLifecycleConfigurationRulesFilterDetails;
  ID?: string;
  NoncurrentVersionExpirationInDays?: number;
  NoncurrentVersionTransitions?: AwsS3BucketBucketLifecycleConfigurationRulesNoncurrentVersionTransitionsDetails[];
  Prefix?: string;
  Status?: string;
  Transitions?: AwsS3BucketBucketLifecycleConfigurationRulesTransitionsDetails[];
}
export const AwsS3BucketBucketLifecycleConfigurationRulesDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AbortIncompleteMultipartUpload: S.optional(
        AwsS3BucketBucketLifecycleConfigurationRulesAbortIncompleteMultipartUploadDetails,
      ),
      ExpirationDate: S.optional(S.String),
      ExpirationInDays: S.optional(S.Number),
      ExpiredObjectDeleteMarker: S.optional(S.Boolean),
      Filter: S.optional(
        AwsS3BucketBucketLifecycleConfigurationRulesFilterDetails,
      ),
      ID: S.optional(S.String),
      NoncurrentVersionExpirationInDays: S.optional(S.Number),
      NoncurrentVersionTransitions: S.optional(
        AwsS3BucketBucketLifecycleConfigurationRulesNoncurrentVersionTransitionsList,
      ),
      Prefix: S.optional(S.String),
      Status: S.optional(S.String),
      Transitions: S.optional(
        AwsS3BucketBucketLifecycleConfigurationRulesTransitionsList,
      ),
    }),
  ).annotate({
    identifier: "AwsS3BucketBucketLifecycleConfigurationRulesDetails",
  }) as any as S.Schema<AwsS3BucketBucketLifecycleConfigurationRulesDetails>;
export type AwsS3BucketBucketLifecycleConfigurationRulesList =
  AwsS3BucketBucketLifecycleConfigurationRulesDetails[];
export const AwsS3BucketBucketLifecycleConfigurationRulesList =
  /*@__PURE__*/ S.Array(AwsS3BucketBucketLifecycleConfigurationRulesDetails);
export interface AwsS3BucketBucketLifecycleConfigurationDetails {
  Rules?: AwsS3BucketBucketLifecycleConfigurationRulesDetails[];
}
export const AwsS3BucketBucketLifecycleConfigurationDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Rules: S.optional(AwsS3BucketBucketLifecycleConfigurationRulesList),
    }),
  ).annotate({
    identifier: "AwsS3BucketBucketLifecycleConfigurationDetails",
  }) as any as S.Schema<AwsS3BucketBucketLifecycleConfigurationDetails>;
export interface AwsS3AccountPublicAccessBlockDetails {
  BlockPublicAcls?: boolean;
  BlockPublicPolicy?: boolean;
  IgnorePublicAcls?: boolean;
  RestrictPublicBuckets?: boolean;
}
export const AwsS3AccountPublicAccessBlockDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      BlockPublicAcls: S.optional(S.Boolean),
      BlockPublicPolicy: S.optional(S.Boolean),
      IgnorePublicAcls: S.optional(S.Boolean),
      RestrictPublicBuckets: S.optional(S.Boolean),
    }),
).annotate({
  identifier: "AwsS3AccountPublicAccessBlockDetails",
}) as any as S.Schema<AwsS3AccountPublicAccessBlockDetails>;
export interface AwsS3BucketLoggingConfiguration {
  DestinationBucketName?: string;
  LogFilePrefix?: string;
}
export const AwsS3BucketLoggingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DestinationBucketName: S.optional(S.String),
    LogFilePrefix: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsS3BucketLoggingConfiguration",
}) as any as S.Schema<AwsS3BucketLoggingConfiguration>;
export interface AwsS3BucketWebsiteConfigurationRedirectTo {
  Hostname?: string;
  Protocol?: string;
}
export const AwsS3BucketWebsiteConfigurationRedirectTo =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Hostname: S.optional(S.String),
      Protocol: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsS3BucketWebsiteConfigurationRedirectTo",
  }) as any as S.Schema<AwsS3BucketWebsiteConfigurationRedirectTo>;
export interface AwsS3BucketWebsiteConfigurationRoutingRuleCondition {
  HttpErrorCodeReturnedEquals?: string;
  KeyPrefixEquals?: string;
}
export const AwsS3BucketWebsiteConfigurationRoutingRuleCondition =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      HttpErrorCodeReturnedEquals: S.optional(S.String),
      KeyPrefixEquals: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsS3BucketWebsiteConfigurationRoutingRuleCondition",
  }) as any as S.Schema<AwsS3BucketWebsiteConfigurationRoutingRuleCondition>;
export interface AwsS3BucketWebsiteConfigurationRoutingRuleRedirect {
  Hostname?: string;
  HttpRedirectCode?: string;
  Protocol?: string;
  ReplaceKeyPrefixWith?: string;
  ReplaceKeyWith?: string;
}
export const AwsS3BucketWebsiteConfigurationRoutingRuleRedirect =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Hostname: S.optional(S.String),
      HttpRedirectCode: S.optional(S.String),
      Protocol: S.optional(S.String),
      ReplaceKeyPrefixWith: S.optional(S.String),
      ReplaceKeyWith: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsS3BucketWebsiteConfigurationRoutingRuleRedirect",
  }) as any as S.Schema<AwsS3BucketWebsiteConfigurationRoutingRuleRedirect>;
export interface AwsS3BucketWebsiteConfigurationRoutingRule {
  Condition?: AwsS3BucketWebsiteConfigurationRoutingRuleCondition;
  Redirect?: AwsS3BucketWebsiteConfigurationRoutingRuleRedirect;
}
export const AwsS3BucketWebsiteConfigurationRoutingRule =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Condition: S.optional(
        AwsS3BucketWebsiteConfigurationRoutingRuleCondition,
      ),
      Redirect: S.optional(AwsS3BucketWebsiteConfigurationRoutingRuleRedirect),
    }),
  ).annotate({
    identifier: "AwsS3BucketWebsiteConfigurationRoutingRule",
  }) as any as S.Schema<AwsS3BucketWebsiteConfigurationRoutingRule>;
export type AwsS3BucketWebsiteConfigurationRoutingRules =
  AwsS3BucketWebsiteConfigurationRoutingRule[];
export const AwsS3BucketWebsiteConfigurationRoutingRules =
  /*@__PURE__*/ S.Array(AwsS3BucketWebsiteConfigurationRoutingRule);
export interface AwsS3BucketWebsiteConfiguration {
  ErrorDocument?: string;
  IndexDocumentSuffix?: string;
  RedirectAllRequestsTo?: AwsS3BucketWebsiteConfigurationRedirectTo;
  RoutingRules?: AwsS3BucketWebsiteConfigurationRoutingRule[];
}
export const AwsS3BucketWebsiteConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorDocument: S.optional(S.String),
    IndexDocumentSuffix: S.optional(S.String),
    RedirectAllRequestsTo: S.optional(
      AwsS3BucketWebsiteConfigurationRedirectTo,
    ),
    RoutingRules: S.optional(AwsS3BucketWebsiteConfigurationRoutingRules),
  }),
).annotate({
  identifier: "AwsS3BucketWebsiteConfiguration",
}) as any as S.Schema<AwsS3BucketWebsiteConfiguration>;
export type AwsS3BucketNotificationConfigurationEvents = string[];
export const AwsS3BucketNotificationConfigurationEvents = /*@__PURE__*/ S.Array(
  S.String,
);
export type AwsS3BucketNotificationConfigurationS3KeyFilterRuleName =
  | "Prefix"
  | "Suffix"
  | (string & {});
export const AwsS3BucketNotificationConfigurationS3KeyFilterRuleName =
  /*@__PURE__*/ S.String;

export interface AwsS3BucketNotificationConfigurationS3KeyFilterRule {
  Name?: AwsS3BucketNotificationConfigurationS3KeyFilterRuleName;
  Value?: string;
}
export const AwsS3BucketNotificationConfigurationS3KeyFilterRule =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Name: S.optional(AwsS3BucketNotificationConfigurationS3KeyFilterRuleName),
      Value: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsS3BucketNotificationConfigurationS3KeyFilterRule",
  }) as any as S.Schema<AwsS3BucketNotificationConfigurationS3KeyFilterRule>;
export type AwsS3BucketNotificationConfigurationS3KeyFilterRules =
  AwsS3BucketNotificationConfigurationS3KeyFilterRule[];
export const AwsS3BucketNotificationConfigurationS3KeyFilterRules =
  /*@__PURE__*/ S.Array(AwsS3BucketNotificationConfigurationS3KeyFilterRule);
export interface AwsS3BucketNotificationConfigurationS3KeyFilter {
  FilterRules?: AwsS3BucketNotificationConfigurationS3KeyFilterRule[];
}
export const AwsS3BucketNotificationConfigurationS3KeyFilter =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      FilterRules: S.optional(
        AwsS3BucketNotificationConfigurationS3KeyFilterRules,
      ),
    }),
  ).annotate({
    identifier: "AwsS3BucketNotificationConfigurationS3KeyFilter",
  }) as any as S.Schema<AwsS3BucketNotificationConfigurationS3KeyFilter>;
export interface AwsS3BucketNotificationConfigurationFilter {
  S3KeyFilter?: AwsS3BucketNotificationConfigurationS3KeyFilter;
}
export const AwsS3BucketNotificationConfigurationFilter =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      S3KeyFilter: S.optional(AwsS3BucketNotificationConfigurationS3KeyFilter),
    }),
  ).annotate({
    identifier: "AwsS3BucketNotificationConfigurationFilter",
  }) as any as S.Schema<AwsS3BucketNotificationConfigurationFilter>;
export interface AwsS3BucketNotificationConfigurationDetail {
  Events?: string[];
  Filter?: AwsS3BucketNotificationConfigurationFilter;
  Destination?: string;
  Type?: string;
}
export const AwsS3BucketNotificationConfigurationDetail =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Events: S.optional(AwsS3BucketNotificationConfigurationEvents),
      Filter: S.optional(AwsS3BucketNotificationConfigurationFilter),
      Destination: S.optional(S.String),
      Type: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsS3BucketNotificationConfigurationDetail",
  }) as any as S.Schema<AwsS3BucketNotificationConfigurationDetail>;
export type AwsS3BucketNotificationConfigurationDetails =
  AwsS3BucketNotificationConfigurationDetail[];
export const AwsS3BucketNotificationConfigurationDetails =
  /*@__PURE__*/ S.Array(AwsS3BucketNotificationConfigurationDetail);
export interface AwsS3BucketNotificationConfiguration {
  Configurations?: AwsS3BucketNotificationConfigurationDetail[];
}
export const AwsS3BucketNotificationConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Configurations: S.optional(AwsS3BucketNotificationConfigurationDetails),
    }),
).annotate({
  identifier: "AwsS3BucketNotificationConfiguration",
}) as any as S.Schema<AwsS3BucketNotificationConfiguration>;
export interface AwsS3BucketBucketVersioningConfiguration {
  IsMfaDeleteEnabled?: boolean;
  Status?: string;
}
export const AwsS3BucketBucketVersioningConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      IsMfaDeleteEnabled: S.optional(S.Boolean),
      Status: S.optional(S.String),
    }),
).annotate({
  identifier: "AwsS3BucketBucketVersioningConfiguration",
}) as any as S.Schema<AwsS3BucketBucketVersioningConfiguration>;
export interface AwsS3BucketObjectLockConfigurationRuleDefaultRetentionDetails {
  Days?: number;
  Mode?: string;
  Years?: number;
}
export const AwsS3BucketObjectLockConfigurationRuleDefaultRetentionDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Days: S.optional(S.Number),
      Mode: S.optional(S.String),
      Years: S.optional(S.Number),
    }),
  ).annotate({
    identifier: "AwsS3BucketObjectLockConfigurationRuleDefaultRetentionDetails",
  }) as any as S.Schema<AwsS3BucketObjectLockConfigurationRuleDefaultRetentionDetails>;
export interface AwsS3BucketObjectLockConfigurationRuleDetails {
  DefaultRetention?: AwsS3BucketObjectLockConfigurationRuleDefaultRetentionDetails;
}
export const AwsS3BucketObjectLockConfigurationRuleDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DefaultRetention: S.optional(
        AwsS3BucketObjectLockConfigurationRuleDefaultRetentionDetails,
      ),
    }),
  ).annotate({
    identifier: "AwsS3BucketObjectLockConfigurationRuleDetails",
  }) as any as S.Schema<AwsS3BucketObjectLockConfigurationRuleDetails>;
export interface AwsS3BucketObjectLockConfiguration {
  ObjectLockEnabled?: string;
  Rule?: AwsS3BucketObjectLockConfigurationRuleDetails;
}
export const AwsS3BucketObjectLockConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ObjectLockEnabled: S.optional(S.String),
    Rule: S.optional(AwsS3BucketObjectLockConfigurationRuleDetails),
  }),
).annotate({
  identifier: "AwsS3BucketObjectLockConfiguration",
}) as any as S.Schema<AwsS3BucketObjectLockConfiguration>;
export interface AwsS3BucketDetails {
  OwnerId?: string;
  OwnerName?: string;
  OwnerAccountId?: string;
  CreatedAt?: string;
  ServerSideEncryptionConfiguration?: AwsS3BucketServerSideEncryptionConfiguration;
  BucketLifecycleConfiguration?: AwsS3BucketBucketLifecycleConfigurationDetails;
  PublicAccessBlockConfiguration?: AwsS3AccountPublicAccessBlockDetails;
  AccessControlList?: string;
  BucketLoggingConfiguration?: AwsS3BucketLoggingConfiguration;
  BucketWebsiteConfiguration?: AwsS3BucketWebsiteConfiguration;
  BucketNotificationConfiguration?: AwsS3BucketNotificationConfiguration;
  BucketVersioningConfiguration?: AwsS3BucketBucketVersioningConfiguration;
  ObjectLockConfiguration?: AwsS3BucketObjectLockConfiguration;
  Name?: string;
}
export const AwsS3BucketDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OwnerId: S.optional(S.String),
    OwnerName: S.optional(S.String),
    OwnerAccountId: S.optional(S.String),
    CreatedAt: S.optional(S.String),
    ServerSideEncryptionConfiguration: S.optional(
      AwsS3BucketServerSideEncryptionConfiguration,
    ),
    BucketLifecycleConfiguration: S.optional(
      AwsS3BucketBucketLifecycleConfigurationDetails,
    ),
    PublicAccessBlockConfiguration: S.optional(
      AwsS3AccountPublicAccessBlockDetails,
    ),
    AccessControlList: S.optional(S.String),
    BucketLoggingConfiguration: S.optional(AwsS3BucketLoggingConfiguration),
    BucketWebsiteConfiguration: S.optional(AwsS3BucketWebsiteConfiguration),
    BucketNotificationConfiguration: S.optional(
      AwsS3BucketNotificationConfiguration,
    ),
    BucketVersioningConfiguration: S.optional(
      AwsS3BucketBucketVersioningConfiguration,
    ),
    ObjectLockConfiguration: S.optional(AwsS3BucketObjectLockConfiguration),
    Name: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsS3BucketDetails",
}) as any as S.Schema<AwsS3BucketDetails>;
export interface AwsS3ObjectDetails {
  LastModified?: string;
  ETag?: string;
  VersionId?: string;
  ContentType?: string;
  ServerSideEncryption?: string;
  SSEKMSKeyId?: string;
}
export const AwsS3ObjectDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LastModified: S.optional(S.String),
    ETag: S.optional(S.String),
    VersionId: S.optional(S.String),
    ContentType: S.optional(S.String),
    ServerSideEncryption: S.optional(S.String),
    SSEKMSKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsS3ObjectDetails",
}) as any as S.Schema<AwsS3ObjectDetails>;
export interface AwsSecretsManagerSecretRotationRules {
  AutomaticallyAfterDays?: number;
}
export const AwsSecretsManagerSecretRotationRules = /*@__PURE__*/ S.suspend(
  () => S.Struct({ AutomaticallyAfterDays: S.optional(S.Number) }),
).annotate({
  identifier: "AwsSecretsManagerSecretRotationRules",
}) as any as S.Schema<AwsSecretsManagerSecretRotationRules>;
export interface AwsSecretsManagerSecretDetails {
  RotationRules?: AwsSecretsManagerSecretRotationRules;
  RotationOccurredWithinFrequency?: boolean;
  KmsKeyId?: string;
  RotationEnabled?: boolean;
  RotationLambdaArn?: string;
  Deleted?: boolean;
  Name?: string;
  Description?: string;
}
export const AwsSecretsManagerSecretDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RotationRules: S.optional(AwsSecretsManagerSecretRotationRules),
    RotationOccurredWithinFrequency: S.optional(S.Boolean),
    KmsKeyId: S.optional(S.String),
    RotationEnabled: S.optional(S.Boolean),
    RotationLambdaArn: S.optional(S.String),
    Deleted: S.optional(S.Boolean),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsSecretsManagerSecretDetails",
}) as any as S.Schema<AwsSecretsManagerSecretDetails>;
export type AwsIamAccessKeyStatus = "Active" | "Inactive" | (string & {});
export const AwsIamAccessKeyStatus = /*@__PURE__*/ S.String;

export interface AwsIamAccessKeySessionContextAttributes {
  MfaAuthenticated?: boolean;
  CreationDate?: string;
}
export const AwsIamAccessKeySessionContextAttributes = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MfaAuthenticated: S.optional(S.Boolean),
      CreationDate: S.optional(S.String),
    }),
).annotate({
  identifier: "AwsIamAccessKeySessionContextAttributes",
}) as any as S.Schema<AwsIamAccessKeySessionContextAttributes>;
export interface AwsIamAccessKeySessionContextSessionIssuer {
  Type?: string;
  PrincipalId?: string;
  Arn?: string;
  AccountId?: string;
  UserName?: string;
}
export const AwsIamAccessKeySessionContextSessionIssuer =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Type: S.optional(S.String),
      PrincipalId: S.optional(S.String),
      Arn: S.optional(S.String),
      AccountId: S.optional(S.String),
      UserName: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsIamAccessKeySessionContextSessionIssuer",
  }) as any as S.Schema<AwsIamAccessKeySessionContextSessionIssuer>;
export interface AwsIamAccessKeySessionContext {
  Attributes?: AwsIamAccessKeySessionContextAttributes;
  SessionIssuer?: AwsIamAccessKeySessionContextSessionIssuer;
}
export const AwsIamAccessKeySessionContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attributes: S.optional(AwsIamAccessKeySessionContextAttributes),
    SessionIssuer: S.optional(AwsIamAccessKeySessionContextSessionIssuer),
  }),
).annotate({
  identifier: "AwsIamAccessKeySessionContext",
}) as any as S.Schema<AwsIamAccessKeySessionContext>;
export interface AwsIamAccessKeyDetails {
  UserName?: string;
  Status?: AwsIamAccessKeyStatus;
  CreatedAt?: string;
  PrincipalId?: string;
  PrincipalType?: string;
  PrincipalName?: string;
  AccountId?: string;
  AccessKeyId?: string;
  SessionContext?: AwsIamAccessKeySessionContext;
}
export const AwsIamAccessKeyDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserName: S.optional(S.String),
    Status: S.optional(AwsIamAccessKeyStatus),
    CreatedAt: S.optional(S.String),
    PrincipalId: S.optional(S.String),
    PrincipalType: S.optional(S.String),
    PrincipalName: S.optional(S.String),
    AccountId: S.optional(S.String),
    AccessKeyId: S.optional(S.String),
    SessionContext: S.optional(AwsIamAccessKeySessionContext),
  }),
).annotate({
  identifier: "AwsIamAccessKeyDetails",
}) as any as S.Schema<AwsIamAccessKeyDetails>;
export interface AwsIamAttachedManagedPolicy {
  PolicyName?: string;
  PolicyArn?: string;
}
export const AwsIamAttachedManagedPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyName: S.optional(S.String),
    PolicyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsIamAttachedManagedPolicy",
}) as any as S.Schema<AwsIamAttachedManagedPolicy>;
export type AwsIamAttachedManagedPolicyList = AwsIamAttachedManagedPolicy[];
export const AwsIamAttachedManagedPolicyList = /*@__PURE__*/ S.Array(
  AwsIamAttachedManagedPolicy,
);
export interface AwsIamPermissionsBoundary {
  PermissionsBoundaryArn?: string;
  PermissionsBoundaryType?: string;
}
export const AwsIamPermissionsBoundary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PermissionsBoundaryArn: S.optional(S.String),
    PermissionsBoundaryType: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsIamPermissionsBoundary",
}) as any as S.Schema<AwsIamPermissionsBoundary>;
export interface AwsIamUserPolicy {
  PolicyName?: string;
}
export const AwsIamUserPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PolicyName: S.optional(S.String) }),
).annotate({
  identifier: "AwsIamUserPolicy",
}) as any as S.Schema<AwsIamUserPolicy>;
export type AwsIamUserPolicyList = AwsIamUserPolicy[];
export const AwsIamUserPolicyList = /*@__PURE__*/ S.Array(AwsIamUserPolicy);
export interface AwsIamUserDetails {
  AttachedManagedPolicies?: AwsIamAttachedManagedPolicy[];
  CreateDate?: string;
  GroupList?: string[];
  Path?: string;
  PermissionsBoundary?: AwsIamPermissionsBoundary;
  UserId?: string;
  UserName?: string;
  UserPolicyList?: AwsIamUserPolicy[];
}
export const AwsIamUserDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttachedManagedPolicies: S.optional(AwsIamAttachedManagedPolicyList),
    CreateDate: S.optional(S.String),
    GroupList: S.optional(StringList),
    Path: S.optional(S.String),
    PermissionsBoundary: S.optional(AwsIamPermissionsBoundary),
    UserId: S.optional(S.String),
    UserName: S.optional(S.String),
    UserPolicyList: S.optional(AwsIamUserPolicyList),
  }),
).annotate({
  identifier: "AwsIamUserDetails",
}) as any as S.Schema<AwsIamUserDetails>;
export interface AwsIamPolicyVersion {
  VersionId?: string;
  IsDefaultVersion?: boolean;
  CreateDate?: string;
}
export const AwsIamPolicyVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VersionId: S.optional(S.String),
    IsDefaultVersion: S.optional(S.Boolean),
    CreateDate: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsIamPolicyVersion",
}) as any as S.Schema<AwsIamPolicyVersion>;
export type AwsIamPolicyVersionList = AwsIamPolicyVersion[];
export const AwsIamPolicyVersionList =
  /*@__PURE__*/ S.Array(AwsIamPolicyVersion);
export interface AwsIamPolicyDetails {
  AttachmentCount?: number;
  CreateDate?: string;
  DefaultVersionId?: string;
  Description?: string;
  IsAttachable?: boolean;
  Path?: string;
  PermissionsBoundaryUsageCount?: number;
  PolicyId?: string;
  PolicyName?: string;
  PolicyVersionList?: AwsIamPolicyVersion[];
  UpdateDate?: string;
}
export const AwsIamPolicyDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttachmentCount: S.optional(S.Number),
    CreateDate: S.optional(S.String),
    DefaultVersionId: S.optional(S.String),
    Description: S.optional(S.String),
    IsAttachable: S.optional(S.Boolean),
    Path: S.optional(S.String),
    PermissionsBoundaryUsageCount: S.optional(S.Number),
    PolicyId: S.optional(S.String),
    PolicyName: S.optional(S.String),
    PolicyVersionList: S.optional(AwsIamPolicyVersionList),
    UpdateDate: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsIamPolicyDetails",
}) as any as S.Schema<AwsIamPolicyDetails>;
export interface AwsApiGatewayV2RouteSettings {
  DetailedMetricsEnabled?: boolean;
  LoggingLevel?: string;
  DataTraceEnabled?: boolean;
  ThrottlingBurstLimit?: number;
  ThrottlingRateLimit?: number;
}
export const AwsApiGatewayV2RouteSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetailedMetricsEnabled: S.optional(S.Boolean),
    LoggingLevel: S.optional(S.String),
    DataTraceEnabled: S.optional(S.Boolean),
    ThrottlingBurstLimit: S.optional(S.Number),
    ThrottlingRateLimit: S.optional(S.Number),
  }),
).annotate({
  identifier: "AwsApiGatewayV2RouteSettings",
}) as any as S.Schema<AwsApiGatewayV2RouteSettings>;
export interface AwsApiGatewayAccessLogSettings {
  Format?: string;
  DestinationArn?: string;
}
export const AwsApiGatewayAccessLogSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Format: S.optional(S.String),
    DestinationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsApiGatewayAccessLogSettings",
}) as any as S.Schema<AwsApiGatewayAccessLogSettings>;
export interface AwsApiGatewayV2StageDetails {
  ClientCertificateId?: string;
  CreatedDate?: string;
  Description?: string;
  DefaultRouteSettings?: AwsApiGatewayV2RouteSettings;
  DeploymentId?: string;
  LastUpdatedDate?: string;
  RouteSettings?: AwsApiGatewayV2RouteSettings;
  StageName?: string;
  StageVariables?: { [key: string]: string | undefined };
  AccessLogSettings?: AwsApiGatewayAccessLogSettings;
  AutoDeploy?: boolean;
  LastDeploymentStatusMessage?: string;
  ApiGatewayManaged?: boolean;
}
export const AwsApiGatewayV2StageDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientCertificateId: S.optional(S.String),
    CreatedDate: S.optional(S.String),
    Description: S.optional(S.String),
    DefaultRouteSettings: S.optional(AwsApiGatewayV2RouteSettings),
    DeploymentId: S.optional(S.String),
    LastUpdatedDate: S.optional(S.String),
    RouteSettings: S.optional(AwsApiGatewayV2RouteSettings),
    StageName: S.optional(S.String),
    StageVariables: S.optional(FieldMap),
    AccessLogSettings: S.optional(AwsApiGatewayAccessLogSettings),
    AutoDeploy: S.optional(S.Boolean),
    LastDeploymentStatusMessage: S.optional(S.String),
    ApiGatewayManaged: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AwsApiGatewayV2StageDetails",
}) as any as S.Schema<AwsApiGatewayV2StageDetails>;
export interface AwsCorsConfiguration {
  AllowOrigins?: string[];
  AllowCredentials?: boolean;
  ExposeHeaders?: string[];
  MaxAge?: number;
  AllowMethods?: string[];
  AllowHeaders?: string[];
}
export const AwsCorsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AllowOrigins: S.optional(NonEmptyStringList),
    AllowCredentials: S.optional(S.Boolean),
    ExposeHeaders: S.optional(NonEmptyStringList),
    MaxAge: S.optional(S.Number),
    AllowMethods: S.optional(NonEmptyStringList),
    AllowHeaders: S.optional(NonEmptyStringList),
  }),
).annotate({
  identifier: "AwsCorsConfiguration",
}) as any as S.Schema<AwsCorsConfiguration>;
export interface AwsApiGatewayV2ApiDetails {
  ApiEndpoint?: string;
  ApiId?: string;
  ApiKeySelectionExpression?: string;
  CreatedDate?: string;
  Description?: string;
  Version?: string;
  Name?: string;
  ProtocolType?: string;
  RouteSelectionExpression?: string;
  CorsConfiguration?: AwsCorsConfiguration;
}
export const AwsApiGatewayV2ApiDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiEndpoint: S.optional(S.String),
    ApiId: S.optional(S.String),
    ApiKeySelectionExpression: S.optional(S.String),
    CreatedDate: S.optional(S.String),
    Description: S.optional(S.String),
    Version: S.optional(S.String),
    Name: S.optional(S.String),
    ProtocolType: S.optional(S.String),
    RouteSelectionExpression: S.optional(S.String),
    CorsConfiguration: S.optional(AwsCorsConfiguration),
  }),
).annotate({
  identifier: "AwsApiGatewayV2ApiDetails",
}) as any as S.Schema<AwsApiGatewayV2ApiDetails>;
export interface AwsDynamoDbTableAttributeDefinition {
  AttributeName?: string;
  AttributeType?: string;
}
export const AwsDynamoDbTableAttributeDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttributeName: S.optional(S.String),
    AttributeType: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsDynamoDbTableAttributeDefinition",
}) as any as S.Schema<AwsDynamoDbTableAttributeDefinition>;
export type AwsDynamoDbTableAttributeDefinitionList =
  AwsDynamoDbTableAttributeDefinition[];
export const AwsDynamoDbTableAttributeDefinitionList = /*@__PURE__*/ S.Array(
  AwsDynamoDbTableAttributeDefinition,
);
export interface AwsDynamoDbTableBillingModeSummary {
  BillingMode?: string;
  LastUpdateToPayPerRequestDateTime?: string;
}
export const AwsDynamoDbTableBillingModeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BillingMode: S.optional(S.String),
    LastUpdateToPayPerRequestDateTime: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsDynamoDbTableBillingModeSummary",
}) as any as S.Schema<AwsDynamoDbTableBillingModeSummary>;
export type SizeBytes = number;
export interface AwsDynamoDbTableKeySchema {
  AttributeName?: string;
  KeyType?: string;
}
export const AwsDynamoDbTableKeySchema = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttributeName: S.optional(S.String),
    KeyType: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsDynamoDbTableKeySchema",
}) as any as S.Schema<AwsDynamoDbTableKeySchema>;
export type AwsDynamoDbTableKeySchemaList = AwsDynamoDbTableKeySchema[];
export const AwsDynamoDbTableKeySchemaList = /*@__PURE__*/ S.Array(
  AwsDynamoDbTableKeySchema,
);
export interface AwsDynamoDbTableProjection {
  NonKeyAttributes?: string[];
  ProjectionType?: string;
}
export const AwsDynamoDbTableProjection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NonKeyAttributes: S.optional(StringList),
    ProjectionType: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsDynamoDbTableProjection",
}) as any as S.Schema<AwsDynamoDbTableProjection>;
export interface AwsDynamoDbTableProvisionedThroughput {
  LastDecreaseDateTime?: string;
  LastIncreaseDateTime?: string;
  NumberOfDecreasesToday?: number;
  ReadCapacityUnits?: number;
  WriteCapacityUnits?: number;
}
export const AwsDynamoDbTableProvisionedThroughput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      LastDecreaseDateTime: S.optional(S.String),
      LastIncreaseDateTime: S.optional(S.String),
      NumberOfDecreasesToday: S.optional(S.Number),
      ReadCapacityUnits: S.optional(S.Number),
      WriteCapacityUnits: S.optional(S.Number),
    }),
).annotate({
  identifier: "AwsDynamoDbTableProvisionedThroughput",
}) as any as S.Schema<AwsDynamoDbTableProvisionedThroughput>;
export interface AwsDynamoDbTableGlobalSecondaryIndex {
  Backfilling?: boolean;
  IndexArn?: string;
  IndexName?: string;
  IndexSizeBytes?: number;
  IndexStatus?: string;
  ItemCount?: number;
  KeySchema?: AwsDynamoDbTableKeySchema[];
  Projection?: AwsDynamoDbTableProjection;
  ProvisionedThroughput?: AwsDynamoDbTableProvisionedThroughput;
}
export const AwsDynamoDbTableGlobalSecondaryIndex = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Backfilling: S.optional(S.Boolean),
      IndexArn: S.optional(S.String),
      IndexName: S.optional(S.String),
      IndexSizeBytes: S.optional(S.Number),
      IndexStatus: S.optional(S.String),
      ItemCount: S.optional(S.Number),
      KeySchema: S.optional(AwsDynamoDbTableKeySchemaList),
      Projection: S.optional(AwsDynamoDbTableProjection),
      ProvisionedThroughput: S.optional(AwsDynamoDbTableProvisionedThroughput),
    }),
).annotate({
  identifier: "AwsDynamoDbTableGlobalSecondaryIndex",
}) as any as S.Schema<AwsDynamoDbTableGlobalSecondaryIndex>;
export type AwsDynamoDbTableGlobalSecondaryIndexList =
  AwsDynamoDbTableGlobalSecondaryIndex[];
export const AwsDynamoDbTableGlobalSecondaryIndexList = /*@__PURE__*/ S.Array(
  AwsDynamoDbTableGlobalSecondaryIndex,
);
export interface AwsDynamoDbTableLocalSecondaryIndex {
  IndexArn?: string;
  IndexName?: string;
  KeySchema?: AwsDynamoDbTableKeySchema[];
  Projection?: AwsDynamoDbTableProjection;
}
export const AwsDynamoDbTableLocalSecondaryIndex = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IndexArn: S.optional(S.String),
    IndexName: S.optional(S.String),
    KeySchema: S.optional(AwsDynamoDbTableKeySchemaList),
    Projection: S.optional(AwsDynamoDbTableProjection),
  }),
).annotate({
  identifier: "AwsDynamoDbTableLocalSecondaryIndex",
}) as any as S.Schema<AwsDynamoDbTableLocalSecondaryIndex>;
export type AwsDynamoDbTableLocalSecondaryIndexList =
  AwsDynamoDbTableLocalSecondaryIndex[];
export const AwsDynamoDbTableLocalSecondaryIndexList = /*@__PURE__*/ S.Array(
  AwsDynamoDbTableLocalSecondaryIndex,
);
export interface AwsDynamoDbTableProvisionedThroughputOverride {
  ReadCapacityUnits?: number;
}
export const AwsDynamoDbTableProvisionedThroughputOverride =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ReadCapacityUnits: S.optional(S.Number) }),
  ).annotate({
    identifier: "AwsDynamoDbTableProvisionedThroughputOverride",
  }) as any as S.Schema<AwsDynamoDbTableProvisionedThroughputOverride>;
export interface AwsDynamoDbTableReplicaGlobalSecondaryIndex {
  IndexName?: string;
  ProvisionedThroughputOverride?: AwsDynamoDbTableProvisionedThroughputOverride;
}
export const AwsDynamoDbTableReplicaGlobalSecondaryIndex =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      IndexName: S.optional(S.String),
      ProvisionedThroughputOverride: S.optional(
        AwsDynamoDbTableProvisionedThroughputOverride,
      ),
    }),
  ).annotate({
    identifier: "AwsDynamoDbTableReplicaGlobalSecondaryIndex",
  }) as any as S.Schema<AwsDynamoDbTableReplicaGlobalSecondaryIndex>;
export type AwsDynamoDbTableReplicaGlobalSecondaryIndexList =
  AwsDynamoDbTableReplicaGlobalSecondaryIndex[];
export const AwsDynamoDbTableReplicaGlobalSecondaryIndexList =
  /*@__PURE__*/ S.Array(AwsDynamoDbTableReplicaGlobalSecondaryIndex);
export interface AwsDynamoDbTableReplica {
  GlobalSecondaryIndexes?: AwsDynamoDbTableReplicaGlobalSecondaryIndex[];
  KmsMasterKeyId?: string;
  ProvisionedThroughputOverride?: AwsDynamoDbTableProvisionedThroughputOverride;
  RegionName?: string;
  ReplicaStatus?: string;
  ReplicaStatusDescription?: string;
}
export const AwsDynamoDbTableReplica = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlobalSecondaryIndexes: S.optional(
      AwsDynamoDbTableReplicaGlobalSecondaryIndexList,
    ),
    KmsMasterKeyId: S.optional(S.String),
    ProvisionedThroughputOverride: S.optional(
      AwsDynamoDbTableProvisionedThroughputOverride,
    ),
    RegionName: S.optional(S.String),
    ReplicaStatus: S.optional(S.String),
    ReplicaStatusDescription: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsDynamoDbTableReplica",
}) as any as S.Schema<AwsDynamoDbTableReplica>;
export type AwsDynamoDbTableReplicaList = AwsDynamoDbTableReplica[];
export const AwsDynamoDbTableReplicaList = /*@__PURE__*/ S.Array(
  AwsDynamoDbTableReplica,
);
export interface AwsDynamoDbTableRestoreSummary {
  SourceBackupArn?: string;
  SourceTableArn?: string;
  RestoreDateTime?: string;
  RestoreInProgress?: boolean;
}
export const AwsDynamoDbTableRestoreSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceBackupArn: S.optional(S.String),
    SourceTableArn: S.optional(S.String),
    RestoreDateTime: S.optional(S.String),
    RestoreInProgress: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AwsDynamoDbTableRestoreSummary",
}) as any as S.Schema<AwsDynamoDbTableRestoreSummary>;
export interface AwsDynamoDbTableSseDescription {
  InaccessibleEncryptionDateTime?: string;
  Status?: string;
  SseType?: string;
  KmsMasterKeyArn?: string;
}
export const AwsDynamoDbTableSseDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InaccessibleEncryptionDateTime: S.optional(S.String),
    Status: S.optional(S.String),
    SseType: S.optional(S.String),
    KmsMasterKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsDynamoDbTableSseDescription",
}) as any as S.Schema<AwsDynamoDbTableSseDescription>;
export interface AwsDynamoDbTableStreamSpecification {
  StreamEnabled?: boolean;
  StreamViewType?: string;
}
export const AwsDynamoDbTableStreamSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StreamEnabled: S.optional(S.Boolean),
    StreamViewType: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsDynamoDbTableStreamSpecification",
}) as any as S.Schema<AwsDynamoDbTableStreamSpecification>;
export interface AwsDynamoDbTableDetails {
  AttributeDefinitions?: AwsDynamoDbTableAttributeDefinition[];
  BillingModeSummary?: AwsDynamoDbTableBillingModeSummary;
  CreationDateTime?: string;
  GlobalSecondaryIndexes?: AwsDynamoDbTableGlobalSecondaryIndex[];
  GlobalTableVersion?: string;
  ItemCount?: number;
  KeySchema?: AwsDynamoDbTableKeySchema[];
  LatestStreamArn?: string;
  LatestStreamLabel?: string;
  LocalSecondaryIndexes?: AwsDynamoDbTableLocalSecondaryIndex[];
  ProvisionedThroughput?: AwsDynamoDbTableProvisionedThroughput;
  Replicas?: AwsDynamoDbTableReplica[];
  RestoreSummary?: AwsDynamoDbTableRestoreSummary;
  SseDescription?: AwsDynamoDbTableSseDescription;
  StreamSpecification?: AwsDynamoDbTableStreamSpecification;
  TableId?: string;
  TableName?: string;
  TableSizeBytes?: number;
  TableStatus?: string;
  DeletionProtectionEnabled?: boolean;
}
export const AwsDynamoDbTableDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttributeDefinitions: S.optional(AwsDynamoDbTableAttributeDefinitionList),
    BillingModeSummary: S.optional(AwsDynamoDbTableBillingModeSummary),
    CreationDateTime: S.optional(S.String),
    GlobalSecondaryIndexes: S.optional(
      AwsDynamoDbTableGlobalSecondaryIndexList,
    ),
    GlobalTableVersion: S.optional(S.String),
    ItemCount: S.optional(S.Number),
    KeySchema: S.optional(AwsDynamoDbTableKeySchemaList),
    LatestStreamArn: S.optional(S.String),
    LatestStreamLabel: S.optional(S.String),
    LocalSecondaryIndexes: S.optional(AwsDynamoDbTableLocalSecondaryIndexList),
    ProvisionedThroughput: S.optional(AwsDynamoDbTableProvisionedThroughput),
    Replicas: S.optional(AwsDynamoDbTableReplicaList),
    RestoreSummary: S.optional(AwsDynamoDbTableRestoreSummary),
    SseDescription: S.optional(AwsDynamoDbTableSseDescription),
    StreamSpecification: S.optional(AwsDynamoDbTableStreamSpecification),
    TableId: S.optional(S.String),
    TableName: S.optional(S.String),
    TableSizeBytes: S.optional(S.Number),
    TableStatus: S.optional(S.String),
    DeletionProtectionEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AwsDynamoDbTableDetails",
}) as any as S.Schema<AwsDynamoDbTableDetails>;
export interface AwsApiGatewayMethodSettings {
  MetricsEnabled?: boolean;
  LoggingLevel?: string;
  DataTraceEnabled?: boolean;
  ThrottlingBurstLimit?: number;
  ThrottlingRateLimit?: number;
  CachingEnabled?: boolean;
  CacheTtlInSeconds?: number;
  CacheDataEncrypted?: boolean;
  RequireAuthorizationForCacheControl?: boolean;
  UnauthorizedCacheControlHeaderStrategy?: string;
  HttpMethod?: string;
  ResourcePath?: string;
}
export const AwsApiGatewayMethodSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetricsEnabled: S.optional(S.Boolean),
    LoggingLevel: S.optional(S.String),
    DataTraceEnabled: S.optional(S.Boolean),
    ThrottlingBurstLimit: S.optional(S.Number),
    ThrottlingRateLimit: S.optional(S.Number),
    CachingEnabled: S.optional(S.Boolean),
    CacheTtlInSeconds: S.optional(S.Number),
    CacheDataEncrypted: S.optional(S.Boolean),
    RequireAuthorizationForCacheControl: S.optional(S.Boolean),
    UnauthorizedCacheControlHeaderStrategy: S.optional(S.String),
    HttpMethod: S.optional(S.String),
    ResourcePath: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsApiGatewayMethodSettings",
}) as any as S.Schema<AwsApiGatewayMethodSettings>;
export type AwsApiGatewayMethodSettingsList = AwsApiGatewayMethodSettings[];
export const AwsApiGatewayMethodSettingsList = /*@__PURE__*/ S.Array(
  AwsApiGatewayMethodSettings,
);
export interface AwsApiGatewayCanarySettings {
  PercentTraffic?: number;
  DeploymentId?: string;
  StageVariableOverrides?: { [key: string]: string | undefined };
  UseStageCache?: boolean;
}
export const AwsApiGatewayCanarySettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PercentTraffic: S.optional(S.Number),
    DeploymentId: S.optional(S.String),
    StageVariableOverrides: S.optional(FieldMap),
    UseStageCache: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AwsApiGatewayCanarySettings",
}) as any as S.Schema<AwsApiGatewayCanarySettings>;
export interface AwsApiGatewayStageDetails {
  DeploymentId?: string;
  ClientCertificateId?: string;
  StageName?: string;
  Description?: string;
  CacheClusterEnabled?: boolean;
  CacheClusterSize?: string;
  CacheClusterStatus?: string;
  MethodSettings?: AwsApiGatewayMethodSettings[];
  Variables?: { [key: string]: string | undefined };
  DocumentationVersion?: string;
  AccessLogSettings?: AwsApiGatewayAccessLogSettings;
  CanarySettings?: AwsApiGatewayCanarySettings;
  TracingEnabled?: boolean;
  CreatedDate?: string;
  LastUpdatedDate?: string;
  WebAclArn?: string;
}
export const AwsApiGatewayStageDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeploymentId: S.optional(S.String),
    ClientCertificateId: S.optional(S.String),
    StageName: S.optional(S.String),
    Description: S.optional(S.String),
    CacheClusterEnabled: S.optional(S.Boolean),
    CacheClusterSize: S.optional(S.String),
    CacheClusterStatus: S.optional(S.String),
    MethodSettings: S.optional(AwsApiGatewayMethodSettingsList),
    Variables: S.optional(FieldMap),
    DocumentationVersion: S.optional(S.String),
    AccessLogSettings: S.optional(AwsApiGatewayAccessLogSettings),
    CanarySettings: S.optional(AwsApiGatewayCanarySettings),
    TracingEnabled: S.optional(S.Boolean),
    CreatedDate: S.optional(S.String),
    LastUpdatedDate: S.optional(S.String),
    WebAclArn: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsApiGatewayStageDetails",
}) as any as S.Schema<AwsApiGatewayStageDetails>;
export interface AwsApiGatewayEndpointConfiguration {
  Types?: string[];
}
export const AwsApiGatewayEndpointConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Types: S.optional(NonEmptyStringList) }),
).annotate({
  identifier: "AwsApiGatewayEndpointConfiguration",
}) as any as S.Schema<AwsApiGatewayEndpointConfiguration>;
export interface AwsApiGatewayRestApiDetails {
  Id?: string;
  Name?: string;
  Description?: string;
  CreatedDate?: string;
  Version?: string;
  BinaryMediaTypes?: string[];
  MinimumCompressionSize?: number;
  ApiKeySource?: string;
  EndpointConfiguration?: AwsApiGatewayEndpointConfiguration;
}
export const AwsApiGatewayRestApiDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    CreatedDate: S.optional(S.String),
    Version: S.optional(S.String),
    BinaryMediaTypes: S.optional(NonEmptyStringList),
    MinimumCompressionSize: S.optional(S.Number),
    ApiKeySource: S.optional(S.String),
    EndpointConfiguration: S.optional(AwsApiGatewayEndpointConfiguration),
  }),
).annotate({
  identifier: "AwsApiGatewayRestApiDetails",
}) as any as S.Schema<AwsApiGatewayRestApiDetails>;
export interface AwsCloudTrailTrailDetails {
  CloudWatchLogsLogGroupArn?: string;
  CloudWatchLogsRoleArn?: string;
  HasCustomEventSelectors?: boolean;
  HomeRegion?: string;
  IncludeGlobalServiceEvents?: boolean;
  IsMultiRegionTrail?: boolean;
  IsOrganizationTrail?: boolean;
  KmsKeyId?: string;
  LogFileValidationEnabled?: boolean;
  Name?: string;
  S3BucketName?: string;
  S3KeyPrefix?: string;
  SnsTopicArn?: string;
  SnsTopicName?: string;
  TrailArn?: string;
}
export const AwsCloudTrailTrailDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudWatchLogsLogGroupArn: S.optional(S.String),
    CloudWatchLogsRoleArn: S.optional(S.String),
    HasCustomEventSelectors: S.optional(S.Boolean),
    HomeRegion: S.optional(S.String),
    IncludeGlobalServiceEvents: S.optional(S.Boolean),
    IsMultiRegionTrail: S.optional(S.Boolean),
    IsOrganizationTrail: S.optional(S.Boolean),
    KmsKeyId: S.optional(S.String),
    LogFileValidationEnabled: S.optional(S.Boolean),
    Name: S.optional(S.String),
    S3BucketName: S.optional(S.String),
    S3KeyPrefix: S.optional(S.String),
    SnsTopicArn: S.optional(S.String),
    SnsTopicName: S.optional(S.String),
    TrailArn: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsCloudTrailTrailDetails",
}) as any as S.Schema<AwsCloudTrailTrailDetails>;
export interface AwsSsmComplianceSummary {
  Status?: string;
  CompliantCriticalCount?: number;
  CompliantHighCount?: number;
  CompliantMediumCount?: number;
  ExecutionType?: string;
  NonCompliantCriticalCount?: number;
  CompliantInformationalCount?: number;
  NonCompliantInformationalCount?: number;
  CompliantUnspecifiedCount?: number;
  NonCompliantLowCount?: number;
  NonCompliantHighCount?: number;
  CompliantLowCount?: number;
  ComplianceType?: string;
  PatchBaselineId?: string;
  OverallSeverity?: string;
  NonCompliantMediumCount?: number;
  NonCompliantUnspecifiedCount?: number;
  PatchGroup?: string;
}
export const AwsSsmComplianceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(S.String),
    CompliantCriticalCount: S.optional(S.Number),
    CompliantHighCount: S.optional(S.Number),
    CompliantMediumCount: S.optional(S.Number),
    ExecutionType: S.optional(S.String),
    NonCompliantCriticalCount: S.optional(S.Number),
    CompliantInformationalCount: S.optional(S.Number),
    NonCompliantInformationalCount: S.optional(S.Number),
    CompliantUnspecifiedCount: S.optional(S.Number),
    NonCompliantLowCount: S.optional(S.Number),
    NonCompliantHighCount: S.optional(S.Number),
    CompliantLowCount: S.optional(S.Number),
    ComplianceType: S.optional(S.String),
    PatchBaselineId: S.optional(S.String),
    OverallSeverity: S.optional(S.String),
    NonCompliantMediumCount: S.optional(S.Number),
    NonCompliantUnspecifiedCount: S.optional(S.Number),
    PatchGroup: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsSsmComplianceSummary",
}) as any as S.Schema<AwsSsmComplianceSummary>;
export interface AwsSsmPatch {
  ComplianceSummary?: AwsSsmComplianceSummary;
}
export const AwsSsmPatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ComplianceSummary: S.optional(AwsSsmComplianceSummary) }),
).annotate({ identifier: "AwsSsmPatch" }) as any as S.Schema<AwsSsmPatch>;
export interface AwsSsmPatchComplianceDetails {
  Patch?: AwsSsmPatch;
}
export const AwsSsmPatchComplianceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Patch: S.optional(AwsSsmPatch) }),
).annotate({
  identifier: "AwsSsmPatchComplianceDetails",
}) as any as S.Schema<AwsSsmPatchComplianceDetails>;
export interface AwsCertificateManagerCertificateResourceRecord {
  Name?: string;
  Type?: string;
  Value?: string;
}
export const AwsCertificateManagerCertificateResourceRecord =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Name: S.optional(S.String),
      Type: S.optional(S.String),
      Value: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsCertificateManagerCertificateResourceRecord",
  }) as any as S.Schema<AwsCertificateManagerCertificateResourceRecord>;
export interface AwsCertificateManagerCertificateDomainValidationOption {
  DomainName?: string;
  ResourceRecord?: AwsCertificateManagerCertificateResourceRecord;
  ValidationDomain?: string;
  ValidationEmails?: string[];
  ValidationMethod?: string;
  ValidationStatus?: string;
}
export const AwsCertificateManagerCertificateDomainValidationOption =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DomainName: S.optional(S.String),
      ResourceRecord: S.optional(
        AwsCertificateManagerCertificateResourceRecord,
      ),
      ValidationDomain: S.optional(S.String),
      ValidationEmails: S.optional(StringList),
      ValidationMethod: S.optional(S.String),
      ValidationStatus: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsCertificateManagerCertificateDomainValidationOption",
  }) as any as S.Schema<AwsCertificateManagerCertificateDomainValidationOption>;
export type AwsCertificateManagerCertificateDomainValidationOptions =
  AwsCertificateManagerCertificateDomainValidationOption[];
export const AwsCertificateManagerCertificateDomainValidationOptions =
  /*@__PURE__*/ S.Array(AwsCertificateManagerCertificateDomainValidationOption);
export interface AwsCertificateManagerCertificateExtendedKeyUsage {
  Name?: string;
  OId?: string;
}
export const AwsCertificateManagerCertificateExtendedKeyUsage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Name: S.optional(S.String), OId: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsCertificateManagerCertificateExtendedKeyUsage",
  }) as any as S.Schema<AwsCertificateManagerCertificateExtendedKeyUsage>;
export type AwsCertificateManagerCertificateExtendedKeyUsages =
  AwsCertificateManagerCertificateExtendedKeyUsage[];
export const AwsCertificateManagerCertificateExtendedKeyUsages =
  /*@__PURE__*/ S.Array(AwsCertificateManagerCertificateExtendedKeyUsage);
export interface AwsCertificateManagerCertificateKeyUsage {
  Name?: string;
}
export const AwsCertificateManagerCertificateKeyUsage = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "AwsCertificateManagerCertificateKeyUsage",
}) as any as S.Schema<AwsCertificateManagerCertificateKeyUsage>;
export type AwsCertificateManagerCertificateKeyUsages =
  AwsCertificateManagerCertificateKeyUsage[];
export const AwsCertificateManagerCertificateKeyUsages = /*@__PURE__*/ S.Array(
  AwsCertificateManagerCertificateKeyUsage,
);
export interface AwsCertificateManagerCertificateOptions {
  CertificateTransparencyLoggingPreference?: string;
}
export const AwsCertificateManagerCertificateOptions = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CertificateTransparencyLoggingPreference: S.optional(S.String),
    }),
).annotate({
  identifier: "AwsCertificateManagerCertificateOptions",
}) as any as S.Schema<AwsCertificateManagerCertificateOptions>;
export interface AwsCertificateManagerCertificateRenewalSummary {
  DomainValidationOptions?: AwsCertificateManagerCertificateDomainValidationOption[];
  RenewalStatus?: string;
  RenewalStatusReason?: string;
  UpdatedAt?: string;
}
export const AwsCertificateManagerCertificateRenewalSummary =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DomainValidationOptions: S.optional(
        AwsCertificateManagerCertificateDomainValidationOptions,
      ),
      RenewalStatus: S.optional(S.String),
      RenewalStatusReason: S.optional(S.String),
      UpdatedAt: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsCertificateManagerCertificateRenewalSummary",
  }) as any as S.Schema<AwsCertificateManagerCertificateRenewalSummary>;
export interface AwsCertificateManagerCertificateDetails {
  CertificateAuthorityArn?: string;
  CreatedAt?: string;
  DomainName?: string;
  DomainValidationOptions?: AwsCertificateManagerCertificateDomainValidationOption[];
  ExtendedKeyUsages?: AwsCertificateManagerCertificateExtendedKeyUsage[];
  FailureReason?: string;
  ImportedAt?: string;
  InUseBy?: string[];
  IssuedAt?: string;
  Issuer?: string;
  KeyAlgorithm?: string;
  KeyUsages?: AwsCertificateManagerCertificateKeyUsage[];
  NotAfter?: string;
  NotBefore?: string;
  Options?: AwsCertificateManagerCertificateOptions;
  RenewalEligibility?: string;
  RenewalSummary?: AwsCertificateManagerCertificateRenewalSummary;
  Serial?: string;
  SignatureAlgorithm?: string;
  Status?: string;
  Subject?: string;
  SubjectAlternativeNames?: string[];
  Type?: string;
}
export const AwsCertificateManagerCertificateDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CertificateAuthorityArn: S.optional(S.String),
      CreatedAt: S.optional(S.String),
      DomainName: S.optional(S.String),
      DomainValidationOptions: S.optional(
        AwsCertificateManagerCertificateDomainValidationOptions,
      ),
      ExtendedKeyUsages: S.optional(
        AwsCertificateManagerCertificateExtendedKeyUsages,
      ),
      FailureReason: S.optional(S.String),
      ImportedAt: S.optional(S.String),
      InUseBy: S.optional(StringList),
      IssuedAt: S.optional(S.String),
      Issuer: S.optional(S.String),
      KeyAlgorithm: S.optional(S.String),
      KeyUsages: S.optional(AwsCertificateManagerCertificateKeyUsages),
      NotAfter: S.optional(S.String),
      NotBefore: S.optional(S.String),
      Options: S.optional(AwsCertificateManagerCertificateOptions),
      RenewalEligibility: S.optional(S.String),
      RenewalSummary: S.optional(
        AwsCertificateManagerCertificateRenewalSummary,
      ),
      Serial: S.optional(S.String),
      SignatureAlgorithm: S.optional(S.String),
      Status: S.optional(S.String),
      Subject: S.optional(S.String),
      SubjectAlternativeNames: S.optional(StringList),
      Type: S.optional(S.String),
    }),
).annotate({
  identifier: "AwsCertificateManagerCertificateDetails",
}) as any as S.Schema<AwsCertificateManagerCertificateDetails>;
export interface AwsRedshiftClusterClusterNode {
  NodeRole?: string;
  PrivateIpAddress?: string;
  PublicIpAddress?: string;
}
export const AwsRedshiftClusterClusterNode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NodeRole: S.optional(S.String),
    PrivateIpAddress: S.optional(S.String),
    PublicIpAddress: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsRedshiftClusterClusterNode",
}) as any as S.Schema<AwsRedshiftClusterClusterNode>;
export type AwsRedshiftClusterClusterNodes = AwsRedshiftClusterClusterNode[];
export const AwsRedshiftClusterClusterNodes = /*@__PURE__*/ S.Array(
  AwsRedshiftClusterClusterNode,
);
export interface AwsRedshiftClusterClusterParameterStatus {
  ParameterName?: string;
  ParameterApplyStatus?: string;
  ParameterApplyErrorDescription?: string;
}
export const AwsRedshiftClusterClusterParameterStatus = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ParameterName: S.optional(S.String),
      ParameterApplyStatus: S.optional(S.String),
      ParameterApplyErrorDescription: S.optional(S.String),
    }),
).annotate({
  identifier: "AwsRedshiftClusterClusterParameterStatus",
}) as any as S.Schema<AwsRedshiftClusterClusterParameterStatus>;
export type AwsRedshiftClusterClusterParameterStatusList =
  AwsRedshiftClusterClusterParameterStatus[];
export const AwsRedshiftClusterClusterParameterStatusList =
  /*@__PURE__*/ S.Array(AwsRedshiftClusterClusterParameterStatus);
export interface AwsRedshiftClusterClusterParameterGroup {
  ClusterParameterStatusList?: AwsRedshiftClusterClusterParameterStatus[];
  ParameterApplyStatus?: string;
  ParameterGroupName?: string;
}
export const AwsRedshiftClusterClusterParameterGroup = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ClusterParameterStatusList: S.optional(
        AwsRedshiftClusterClusterParameterStatusList,
      ),
      ParameterApplyStatus: S.optional(S.String),
      ParameterGroupName: S.optional(S.String),
    }),
).annotate({
  identifier: "AwsRedshiftClusterClusterParameterGroup",
}) as any as S.Schema<AwsRedshiftClusterClusterParameterGroup>;
export type AwsRedshiftClusterClusterParameterGroups =
  AwsRedshiftClusterClusterParameterGroup[];
export const AwsRedshiftClusterClusterParameterGroups = /*@__PURE__*/ S.Array(
  AwsRedshiftClusterClusterParameterGroup,
);
export interface AwsRedshiftClusterClusterSecurityGroup {
  ClusterSecurityGroupName?: string;
  Status?: string;
}
export const AwsRedshiftClusterClusterSecurityGroup = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ClusterSecurityGroupName: S.optional(S.String),
      Status: S.optional(S.String),
    }),
).annotate({
  identifier: "AwsRedshiftClusterClusterSecurityGroup",
}) as any as S.Schema<AwsRedshiftClusterClusterSecurityGroup>;
export type AwsRedshiftClusterClusterSecurityGroups =
  AwsRedshiftClusterClusterSecurityGroup[];
export const AwsRedshiftClusterClusterSecurityGroups = /*@__PURE__*/ S.Array(
  AwsRedshiftClusterClusterSecurityGroup,
);
export interface AwsRedshiftClusterClusterSnapshotCopyStatus {
  DestinationRegion?: string;
  ManualSnapshotRetentionPeriod?: number;
  RetentionPeriod?: number;
  SnapshotCopyGrantName?: string;
}
export const AwsRedshiftClusterClusterSnapshotCopyStatus =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DestinationRegion: S.optional(S.String),
      ManualSnapshotRetentionPeriod: S.optional(S.Number),
      RetentionPeriod: S.optional(S.Number),
      SnapshotCopyGrantName: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsRedshiftClusterClusterSnapshotCopyStatus",
  }) as any as S.Schema<AwsRedshiftClusterClusterSnapshotCopyStatus>;
export interface AwsRedshiftClusterDeferredMaintenanceWindow {
  DeferMaintenanceEndTime?: string;
  DeferMaintenanceIdentifier?: string;
  DeferMaintenanceStartTime?: string;
}
export const AwsRedshiftClusterDeferredMaintenanceWindow =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DeferMaintenanceEndTime: S.optional(S.String),
      DeferMaintenanceIdentifier: S.optional(S.String),
      DeferMaintenanceStartTime: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsRedshiftClusterDeferredMaintenanceWindow",
  }) as any as S.Schema<AwsRedshiftClusterDeferredMaintenanceWindow>;
export type AwsRedshiftClusterDeferredMaintenanceWindows =
  AwsRedshiftClusterDeferredMaintenanceWindow[];
export const AwsRedshiftClusterDeferredMaintenanceWindows =
  /*@__PURE__*/ S.Array(AwsRedshiftClusterDeferredMaintenanceWindow);
export interface AwsRedshiftClusterElasticIpStatus {
  ElasticIp?: string;
  Status?: string;
}
export const AwsRedshiftClusterElasticIpStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ElasticIp: S.optional(S.String), Status: S.optional(S.String) }),
).annotate({
  identifier: "AwsRedshiftClusterElasticIpStatus",
}) as any as S.Schema<AwsRedshiftClusterElasticIpStatus>;
export interface AwsRedshiftClusterEndpoint {
  Address?: string;
  Port?: number;
}
export const AwsRedshiftClusterEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Address: S.optional(S.String), Port: S.optional(S.Number) }),
).annotate({
  identifier: "AwsRedshiftClusterEndpoint",
}) as any as S.Schema<AwsRedshiftClusterEndpoint>;
export interface AwsRedshiftClusterHsmStatus {
  HsmClientCertificateIdentifier?: string;
  HsmConfigurationIdentifier?: string;
  Status?: string;
}
export const AwsRedshiftClusterHsmStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HsmClientCertificateIdentifier: S.optional(S.String),
    HsmConfigurationIdentifier: S.optional(S.String),
    Status: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsRedshiftClusterHsmStatus",
}) as any as S.Schema<AwsRedshiftClusterHsmStatus>;
export interface AwsRedshiftClusterIamRole {
  ApplyStatus?: string;
  IamRoleArn?: string;
}
export const AwsRedshiftClusterIamRole = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplyStatus: S.optional(S.String),
    IamRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsRedshiftClusterIamRole",
}) as any as S.Schema<AwsRedshiftClusterIamRole>;
export type AwsRedshiftClusterIamRoles = AwsRedshiftClusterIamRole[];
export const AwsRedshiftClusterIamRoles = /*@__PURE__*/ S.Array(
  AwsRedshiftClusterIamRole,
);
export interface AwsRedshiftClusterPendingModifiedValues {
  AutomatedSnapshotRetentionPeriod?: number;
  ClusterIdentifier?: string;
  ClusterType?: string;
  ClusterVersion?: string;
  EncryptionType?: string;
  EnhancedVpcRouting?: boolean;
  MaintenanceTrackName?: string;
  MasterUserPassword?: string;
  NodeType?: string;
  NumberOfNodes?: number;
  PubliclyAccessible?: boolean;
}
export const AwsRedshiftClusterPendingModifiedValues = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AutomatedSnapshotRetentionPeriod: S.optional(S.Number),
      ClusterIdentifier: S.optional(S.String),
      ClusterType: S.optional(S.String),
      ClusterVersion: S.optional(S.String),
      EncryptionType: S.optional(S.String),
      EnhancedVpcRouting: S.optional(S.Boolean),
      MaintenanceTrackName: S.optional(S.String),
      MasterUserPassword: S.optional(S.String),
      NodeType: S.optional(S.String),
      NumberOfNodes: S.optional(S.Number),
      PubliclyAccessible: S.optional(S.Boolean),
    }),
).annotate({
  identifier: "AwsRedshiftClusterPendingModifiedValues",
}) as any as S.Schema<AwsRedshiftClusterPendingModifiedValues>;
export interface AwsRedshiftClusterResizeInfo {
  AllowCancelResize?: boolean;
  ResizeType?: string;
}
export const AwsRedshiftClusterResizeInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AllowCancelResize: S.optional(S.Boolean),
    ResizeType: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsRedshiftClusterResizeInfo",
}) as any as S.Schema<AwsRedshiftClusterResizeInfo>;
export interface AwsRedshiftClusterRestoreStatus {
  CurrentRestoreRateInMegaBytesPerSecond?: number;
  ElapsedTimeInSeconds?: number;
  EstimatedTimeToCompletionInSeconds?: number;
  ProgressInMegaBytes?: number;
  SnapshotSizeInMegaBytes?: number;
  Status?: string;
}
export const AwsRedshiftClusterRestoreStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CurrentRestoreRateInMegaBytesPerSecond: S.optional(S.Number),
    ElapsedTimeInSeconds: S.optional(S.Number),
    EstimatedTimeToCompletionInSeconds: S.optional(S.Number),
    ProgressInMegaBytes: S.optional(S.Number),
    SnapshotSizeInMegaBytes: S.optional(S.Number),
    Status: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsRedshiftClusterRestoreStatus",
}) as any as S.Schema<AwsRedshiftClusterRestoreStatus>;
export interface AwsRedshiftClusterVpcSecurityGroup {
  Status?: string;
  VpcSecurityGroupId?: string;
}
export const AwsRedshiftClusterVpcSecurityGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(S.String),
    VpcSecurityGroupId: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsRedshiftClusterVpcSecurityGroup",
}) as any as S.Schema<AwsRedshiftClusterVpcSecurityGroup>;
export type AwsRedshiftClusterVpcSecurityGroups =
  AwsRedshiftClusterVpcSecurityGroup[];
export const AwsRedshiftClusterVpcSecurityGroups = /*@__PURE__*/ S.Array(
  AwsRedshiftClusterVpcSecurityGroup,
);
export interface AwsRedshiftClusterLoggingStatus {
  BucketName?: string;
  LastFailureMessage?: string;
  LastFailureTime?: string;
  LastSuccessfulDeliveryTime?: string;
  LoggingEnabled?: boolean;
  S3KeyPrefix?: string;
}
export const AwsRedshiftClusterLoggingStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BucketName: S.optional(S.String),
    LastFailureMessage: S.optional(S.String),
    LastFailureTime: S.optional(S.String),
    LastSuccessfulDeliveryTime: S.optional(S.String),
    LoggingEnabled: S.optional(S.Boolean),
    S3KeyPrefix: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsRedshiftClusterLoggingStatus",
}) as any as S.Schema<AwsRedshiftClusterLoggingStatus>;
export interface AwsRedshiftClusterDetails {
  AllowVersionUpgrade?: boolean;
  AutomatedSnapshotRetentionPeriod?: number;
  AvailabilityZone?: string;
  ClusterAvailabilityStatus?: string;
  ClusterCreateTime?: string;
  ClusterIdentifier?: string;
  ClusterNodes?: AwsRedshiftClusterClusterNode[];
  ClusterParameterGroups?: AwsRedshiftClusterClusterParameterGroup[];
  ClusterPublicKey?: string;
  ClusterRevisionNumber?: string;
  ClusterSecurityGroups?: AwsRedshiftClusterClusterSecurityGroup[];
  ClusterSnapshotCopyStatus?: AwsRedshiftClusterClusterSnapshotCopyStatus;
  ClusterStatus?: string;
  ClusterSubnetGroupName?: string;
  ClusterVersion?: string;
  DBName?: string;
  DeferredMaintenanceWindows?: AwsRedshiftClusterDeferredMaintenanceWindow[];
  ElasticIpStatus?: AwsRedshiftClusterElasticIpStatus;
  ElasticResizeNumberOfNodeOptions?: string;
  Encrypted?: boolean;
  Endpoint?: AwsRedshiftClusterEndpoint;
  EnhancedVpcRouting?: boolean;
  ExpectedNextSnapshotScheduleTime?: string;
  ExpectedNextSnapshotScheduleTimeStatus?: string;
  HsmStatus?: AwsRedshiftClusterHsmStatus;
  IamRoles?: AwsRedshiftClusterIamRole[];
  KmsKeyId?: string;
  MaintenanceTrackName?: string;
  ManualSnapshotRetentionPeriod?: number;
  MasterUsername?: string;
  NextMaintenanceWindowStartTime?: string;
  NodeType?: string;
  NumberOfNodes?: number;
  PendingActions?: string[];
  PendingModifiedValues?: AwsRedshiftClusterPendingModifiedValues;
  PreferredMaintenanceWindow?: string;
  PubliclyAccessible?: boolean;
  ResizeInfo?: AwsRedshiftClusterResizeInfo;
  RestoreStatus?: AwsRedshiftClusterRestoreStatus;
  SnapshotScheduleIdentifier?: string;
  SnapshotScheduleState?: string;
  VpcId?: string;
  VpcSecurityGroups?: AwsRedshiftClusterVpcSecurityGroup[];
  LoggingStatus?: AwsRedshiftClusterLoggingStatus;
}
export const AwsRedshiftClusterDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AllowVersionUpgrade: S.optional(S.Boolean),
    AutomatedSnapshotRetentionPeriod: S.optional(S.Number),
    AvailabilityZone: S.optional(S.String),
    ClusterAvailabilityStatus: S.optional(S.String),
    ClusterCreateTime: S.optional(S.String),
    ClusterIdentifier: S.optional(S.String),
    ClusterNodes: S.optional(AwsRedshiftClusterClusterNodes),
    ClusterParameterGroups: S.optional(
      AwsRedshiftClusterClusterParameterGroups,
    ),
    ClusterPublicKey: S.optional(S.String),
    ClusterRevisionNumber: S.optional(S.String),
    ClusterSecurityGroups: S.optional(AwsRedshiftClusterClusterSecurityGroups),
    ClusterSnapshotCopyStatus: S.optional(
      AwsRedshiftClusterClusterSnapshotCopyStatus,
    ),
    ClusterStatus: S.optional(S.String),
    ClusterSubnetGroupName: S.optional(S.String),
    ClusterVersion: S.optional(S.String),
    DBName: S.optional(S.String),
    DeferredMaintenanceWindows: S.optional(
      AwsRedshiftClusterDeferredMaintenanceWindows,
    ),
    ElasticIpStatus: S.optional(AwsRedshiftClusterElasticIpStatus),
    ElasticResizeNumberOfNodeOptions: S.optional(S.String),
    Encrypted: S.optional(S.Boolean),
    Endpoint: S.optional(AwsRedshiftClusterEndpoint),
    EnhancedVpcRouting: S.optional(S.Boolean),
    ExpectedNextSnapshotScheduleTime: S.optional(S.String),
    ExpectedNextSnapshotScheduleTimeStatus: S.optional(S.String),
    HsmStatus: S.optional(AwsRedshiftClusterHsmStatus),
    IamRoles: S.optional(AwsRedshiftClusterIamRoles),
    KmsKeyId: S.optional(S.String),
    MaintenanceTrackName: S.optional(S.String),
    ManualSnapshotRetentionPeriod: S.optional(S.Number),
    MasterUsername: S.optional(S.String),
    NextMaintenanceWindowStartTime: S.optional(S.String),
    NodeType: S.optional(S.String),
    NumberOfNodes: S.optional(S.Number),
    PendingActions: S.optional(StringList),
    PendingModifiedValues: S.optional(AwsRedshiftClusterPendingModifiedValues),
    PreferredMaintenanceWindow: S.optional(S.String),
    PubliclyAccessible: S.optional(S.Boolean),
    ResizeInfo: S.optional(AwsRedshiftClusterResizeInfo),
    RestoreStatus: S.optional(AwsRedshiftClusterRestoreStatus),
    SnapshotScheduleIdentifier: S.optional(S.String),
    SnapshotScheduleState: S.optional(S.String),
    VpcId: S.optional(S.String),
    VpcSecurityGroups: S.optional(AwsRedshiftClusterVpcSecurityGroups),
    LoggingStatus: S.optional(AwsRedshiftClusterLoggingStatus),
  }),
).annotate({
  identifier: "AwsRedshiftClusterDetails",
}) as any as S.Schema<AwsRedshiftClusterDetails>;
export interface AwsElbLoadBalancerBackendServerDescription {
  InstancePort?: number;
  PolicyNames?: string[];
}
export const AwsElbLoadBalancerBackendServerDescription =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      InstancePort: S.optional(S.Number),
      PolicyNames: S.optional(StringList),
    }),
  ).annotate({
    identifier: "AwsElbLoadBalancerBackendServerDescription",
  }) as any as S.Schema<AwsElbLoadBalancerBackendServerDescription>;
export type AwsElbLoadBalancerBackendServerDescriptions =
  AwsElbLoadBalancerBackendServerDescription[];
export const AwsElbLoadBalancerBackendServerDescriptions =
  /*@__PURE__*/ S.Array(AwsElbLoadBalancerBackendServerDescription);
export interface AwsElbLoadBalancerHealthCheck {
  HealthyThreshold?: number;
  Interval?: number;
  Target?: string;
  Timeout?: number;
  UnhealthyThreshold?: number;
}
export const AwsElbLoadBalancerHealthCheck = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HealthyThreshold: S.optional(S.Number),
    Interval: S.optional(S.Number),
    Target: S.optional(S.String),
    Timeout: S.optional(S.Number),
    UnhealthyThreshold: S.optional(S.Number),
  }),
).annotate({
  identifier: "AwsElbLoadBalancerHealthCheck",
}) as any as S.Schema<AwsElbLoadBalancerHealthCheck>;
export interface AwsElbLoadBalancerInstance {
  InstanceId?: string;
}
export const AwsElbLoadBalancerInstance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InstanceId: S.optional(S.String) }),
).annotate({
  identifier: "AwsElbLoadBalancerInstance",
}) as any as S.Schema<AwsElbLoadBalancerInstance>;
export type AwsElbLoadBalancerInstances = AwsElbLoadBalancerInstance[];
export const AwsElbLoadBalancerInstances = /*@__PURE__*/ S.Array(
  AwsElbLoadBalancerInstance,
);
export interface AwsElbLoadBalancerListener {
  InstancePort?: number;
  InstanceProtocol?: string;
  LoadBalancerPort?: number;
  Protocol?: string;
  SslCertificateId?: string;
}
export const AwsElbLoadBalancerListener = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstancePort: S.optional(S.Number),
    InstanceProtocol: S.optional(S.String),
    LoadBalancerPort: S.optional(S.Number),
    Protocol: S.optional(S.String),
    SslCertificateId: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsElbLoadBalancerListener",
}) as any as S.Schema<AwsElbLoadBalancerListener>;
export interface AwsElbLoadBalancerListenerDescription {
  Listener?: AwsElbLoadBalancerListener;
  PolicyNames?: string[];
}
export const AwsElbLoadBalancerListenerDescription = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Listener: S.optional(AwsElbLoadBalancerListener),
      PolicyNames: S.optional(StringList),
    }),
).annotate({
  identifier: "AwsElbLoadBalancerListenerDescription",
}) as any as S.Schema<AwsElbLoadBalancerListenerDescription>;
export type AwsElbLoadBalancerListenerDescriptions =
  AwsElbLoadBalancerListenerDescription[];
export const AwsElbLoadBalancerListenerDescriptions = /*@__PURE__*/ S.Array(
  AwsElbLoadBalancerListenerDescription,
);
export interface AwsElbLoadBalancerAccessLog {
  EmitInterval?: number;
  Enabled?: boolean;
  S3BucketName?: string;
  S3BucketPrefix?: string;
}
export const AwsElbLoadBalancerAccessLog = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EmitInterval: S.optional(S.Number),
    Enabled: S.optional(S.Boolean),
    S3BucketName: S.optional(S.String),
    S3BucketPrefix: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsElbLoadBalancerAccessLog",
}) as any as S.Schema<AwsElbLoadBalancerAccessLog>;
export interface AwsElbLoadBalancerConnectionDraining {
  Enabled?: boolean;
  Timeout?: number;
}
export const AwsElbLoadBalancerConnectionDraining = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Enabled: S.optional(S.Boolean), Timeout: S.optional(S.Number) }),
).annotate({
  identifier: "AwsElbLoadBalancerConnectionDraining",
}) as any as S.Schema<AwsElbLoadBalancerConnectionDraining>;
export interface AwsElbLoadBalancerConnectionSettings {
  IdleTimeout?: number;
}
export const AwsElbLoadBalancerConnectionSettings = /*@__PURE__*/ S.suspend(
  () => S.Struct({ IdleTimeout: S.optional(S.Number) }),
).annotate({
  identifier: "AwsElbLoadBalancerConnectionSettings",
}) as any as S.Schema<AwsElbLoadBalancerConnectionSettings>;
export interface AwsElbLoadBalancerCrossZoneLoadBalancing {
  Enabled?: boolean;
}
export const AwsElbLoadBalancerCrossZoneLoadBalancing = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Enabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "AwsElbLoadBalancerCrossZoneLoadBalancing",
}) as any as S.Schema<AwsElbLoadBalancerCrossZoneLoadBalancing>;
export interface AwsElbLoadBalancerAdditionalAttribute {
  Key?: string;
  Value?: string;
}
export const AwsElbLoadBalancerAdditionalAttribute = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({
  identifier: "AwsElbLoadBalancerAdditionalAttribute",
}) as any as S.Schema<AwsElbLoadBalancerAdditionalAttribute>;
export type AwsElbLoadBalancerAdditionalAttributeList =
  AwsElbLoadBalancerAdditionalAttribute[];
export const AwsElbLoadBalancerAdditionalAttributeList = /*@__PURE__*/ S.Array(
  AwsElbLoadBalancerAdditionalAttribute,
);
export interface AwsElbLoadBalancerAttributes {
  AccessLog?: AwsElbLoadBalancerAccessLog;
  ConnectionDraining?: AwsElbLoadBalancerConnectionDraining;
  ConnectionSettings?: AwsElbLoadBalancerConnectionSettings;
  CrossZoneLoadBalancing?: AwsElbLoadBalancerCrossZoneLoadBalancing;
  AdditionalAttributes?: AwsElbLoadBalancerAdditionalAttribute[];
}
export const AwsElbLoadBalancerAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessLog: S.optional(AwsElbLoadBalancerAccessLog),
    ConnectionDraining: S.optional(AwsElbLoadBalancerConnectionDraining),
    ConnectionSettings: S.optional(AwsElbLoadBalancerConnectionSettings),
    CrossZoneLoadBalancing: S.optional(
      AwsElbLoadBalancerCrossZoneLoadBalancing,
    ),
    AdditionalAttributes: S.optional(AwsElbLoadBalancerAdditionalAttributeList),
  }),
).annotate({
  identifier: "AwsElbLoadBalancerAttributes",
}) as any as S.Schema<AwsElbLoadBalancerAttributes>;
export interface AwsElbAppCookieStickinessPolicy {
  CookieName?: string;
  PolicyName?: string;
}
export const AwsElbAppCookieStickinessPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CookieName: S.optional(S.String),
    PolicyName: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsElbAppCookieStickinessPolicy",
}) as any as S.Schema<AwsElbAppCookieStickinessPolicy>;
export type AwsElbAppCookieStickinessPolicies =
  AwsElbAppCookieStickinessPolicy[];
export const AwsElbAppCookieStickinessPolicies = /*@__PURE__*/ S.Array(
  AwsElbAppCookieStickinessPolicy,
);
export interface AwsElbLbCookieStickinessPolicy {
  CookieExpirationPeriod?: number;
  PolicyName?: string;
}
export const AwsElbLbCookieStickinessPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CookieExpirationPeriod: S.optional(S.Number),
    PolicyName: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsElbLbCookieStickinessPolicy",
}) as any as S.Schema<AwsElbLbCookieStickinessPolicy>;
export type AwsElbLbCookieStickinessPolicies = AwsElbLbCookieStickinessPolicy[];
export const AwsElbLbCookieStickinessPolicies = /*@__PURE__*/ S.Array(
  AwsElbLbCookieStickinessPolicy,
);
export interface AwsElbLoadBalancerPolicies {
  AppCookieStickinessPolicies?: AwsElbAppCookieStickinessPolicy[];
  LbCookieStickinessPolicies?: AwsElbLbCookieStickinessPolicy[];
  OtherPolicies?: string[];
}
export const AwsElbLoadBalancerPolicies = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppCookieStickinessPolicies: S.optional(AwsElbAppCookieStickinessPolicies),
    LbCookieStickinessPolicies: S.optional(AwsElbLbCookieStickinessPolicies),
    OtherPolicies: S.optional(StringList),
  }),
).annotate({
  identifier: "AwsElbLoadBalancerPolicies",
}) as any as S.Schema<AwsElbLoadBalancerPolicies>;
export interface AwsElbLoadBalancerSourceSecurityGroup {
  GroupName?: string;
  OwnerAlias?: string;
}
export const AwsElbLoadBalancerSourceSecurityGroup = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      GroupName: S.optional(S.String),
      OwnerAlias: S.optional(S.String),
    }),
).annotate({
  identifier: "AwsElbLoadBalancerSourceSecurityGroup",
}) as any as S.Schema<AwsElbLoadBalancerSourceSecurityGroup>;
export interface AwsElbLoadBalancerDetails {
  AvailabilityZones?: string[];
  BackendServerDescriptions?: AwsElbLoadBalancerBackendServerDescription[];
  CanonicalHostedZoneName?: string;
  CanonicalHostedZoneNameID?: string;
  CreatedTime?: string;
  DnsName?: string;
  HealthCheck?: AwsElbLoadBalancerHealthCheck;
  Instances?: AwsElbLoadBalancerInstance[];
  ListenerDescriptions?: AwsElbLoadBalancerListenerDescription[];
  LoadBalancerAttributes?: AwsElbLoadBalancerAttributes;
  LoadBalancerName?: string;
  Policies?: AwsElbLoadBalancerPolicies;
  Scheme?: string;
  SecurityGroups?: string[];
  SourceSecurityGroup?: AwsElbLoadBalancerSourceSecurityGroup;
  Subnets?: string[];
  VpcId?: string;
}
export const AwsElbLoadBalancerDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityZones: S.optional(StringList),
    BackendServerDescriptions: S.optional(
      AwsElbLoadBalancerBackendServerDescriptions,
    ),
    CanonicalHostedZoneName: S.optional(S.String),
    CanonicalHostedZoneNameID: S.optional(S.String),
    CreatedTime: S.optional(S.String),
    DnsName: S.optional(S.String),
    HealthCheck: S.optional(AwsElbLoadBalancerHealthCheck),
    Instances: S.optional(AwsElbLoadBalancerInstances),
    ListenerDescriptions: S.optional(AwsElbLoadBalancerListenerDescriptions),
    LoadBalancerAttributes: S.optional(AwsElbLoadBalancerAttributes),
    LoadBalancerName: S.optional(S.String),
    Policies: S.optional(AwsElbLoadBalancerPolicies),
    Scheme: S.optional(S.String),
    SecurityGroups: S.optional(StringList),
    SourceSecurityGroup: S.optional(AwsElbLoadBalancerSourceSecurityGroup),
    Subnets: S.optional(StringList),
    VpcId: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsElbLoadBalancerDetails",
}) as any as S.Schema<AwsElbLoadBalancerDetails>;
export interface AwsIamGroupPolicy {
  PolicyName?: string;
}
export const AwsIamGroupPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PolicyName: S.optional(S.String) }),
).annotate({
  identifier: "AwsIamGroupPolicy",
}) as any as S.Schema<AwsIamGroupPolicy>;
export type AwsIamGroupPolicyList = AwsIamGroupPolicy[];
export const AwsIamGroupPolicyList = /*@__PURE__*/ S.Array(AwsIamGroupPolicy);
export interface AwsIamGroupDetails {
  AttachedManagedPolicies?: AwsIamAttachedManagedPolicy[];
  CreateDate?: string;
  GroupId?: string;
  GroupName?: string;
  GroupPolicyList?: AwsIamGroupPolicy[];
  Path?: string;
}
export const AwsIamGroupDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttachedManagedPolicies: S.optional(AwsIamAttachedManagedPolicyList),
    CreateDate: S.optional(S.String),
    GroupId: S.optional(S.String),
    GroupName: S.optional(S.String),
    GroupPolicyList: S.optional(AwsIamGroupPolicyList),
    Path: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsIamGroupDetails",
}) as any as S.Schema<AwsIamGroupDetails>;
export type AwsIamRoleAssumeRolePolicyDocument = string;
export interface AwsIamInstanceProfileRole {
  Arn?: string;
  AssumeRolePolicyDocument?: string;
  CreateDate?: string;
  Path?: string;
  RoleId?: string;
  RoleName?: string;
}
export const AwsIamInstanceProfileRole = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AssumeRolePolicyDocument: S.optional(S.String),
    CreateDate: S.optional(S.String),
    Path: S.optional(S.String),
    RoleId: S.optional(S.String),
    RoleName: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsIamInstanceProfileRole",
}) as any as S.Schema<AwsIamInstanceProfileRole>;
export type AwsIamInstanceProfileRoles = AwsIamInstanceProfileRole[];
export const AwsIamInstanceProfileRoles = /*@__PURE__*/ S.Array(
  AwsIamInstanceProfileRole,
);
export interface AwsIamInstanceProfile {
  Arn?: string;
  CreateDate?: string;
  InstanceProfileId?: string;
  InstanceProfileName?: string;
  Path?: string;
  Roles?: AwsIamInstanceProfileRole[];
}
export const AwsIamInstanceProfile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreateDate: S.optional(S.String),
    InstanceProfileId: S.optional(S.String),
    InstanceProfileName: S.optional(S.String),
    Path: S.optional(S.String),
    Roles: S.optional(AwsIamInstanceProfileRoles),
  }),
).annotate({
  identifier: "AwsIamInstanceProfile",
}) as any as S.Schema<AwsIamInstanceProfile>;
export type AwsIamInstanceProfileList = AwsIamInstanceProfile[];
export const AwsIamInstanceProfileList = /*@__PURE__*/ S.Array(
  AwsIamInstanceProfile,
);
export interface AwsIamRolePolicy {
  PolicyName?: string;
}
export const AwsIamRolePolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PolicyName: S.optional(S.String) }),
).annotate({
  identifier: "AwsIamRolePolicy",
}) as any as S.Schema<AwsIamRolePolicy>;
export type AwsIamRolePolicyList = AwsIamRolePolicy[];
export const AwsIamRolePolicyList = /*@__PURE__*/ S.Array(AwsIamRolePolicy);
export interface AwsIamRoleDetails {
  AssumeRolePolicyDocument?: string;
  AttachedManagedPolicies?: AwsIamAttachedManagedPolicy[];
  CreateDate?: string;
  InstanceProfileList?: AwsIamInstanceProfile[];
  PermissionsBoundary?: AwsIamPermissionsBoundary;
  RoleId?: string;
  RoleName?: string;
  RolePolicyList?: AwsIamRolePolicy[];
  MaxSessionDuration?: number;
  Path?: string;
}
export const AwsIamRoleDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssumeRolePolicyDocument: S.optional(S.String),
    AttachedManagedPolicies: S.optional(AwsIamAttachedManagedPolicyList),
    CreateDate: S.optional(S.String),
    InstanceProfileList: S.optional(AwsIamInstanceProfileList),
    PermissionsBoundary: S.optional(AwsIamPermissionsBoundary),
    RoleId: S.optional(S.String),
    RoleName: S.optional(S.String),
    RolePolicyList: S.optional(AwsIamRolePolicyList),
    MaxSessionDuration: S.optional(S.Number),
    Path: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsIamRoleDetails",
}) as any as S.Schema<AwsIamRoleDetails>;
export interface AwsKmsKeyDetails {
  AWSAccountId?: string;
  CreationDate?: number;
  KeyId?: string;
  KeyManager?: string;
  KeyState?: string;
  Origin?: string;
  Description?: string;
  KeyRotationStatus?: boolean;
}
export const AwsKmsKeyDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AWSAccountId: S.optional(S.String),
    CreationDate: S.optional(S.Number),
    KeyId: S.optional(S.String),
    KeyManager: S.optional(S.String),
    KeyState: S.optional(S.String),
    Origin: S.optional(S.String),
    Description: S.optional(S.String),
    KeyRotationStatus: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AwsKmsKeyDetails",
}) as any as S.Schema<AwsKmsKeyDetails>;
export interface AwsLambdaFunctionCode {
  S3Bucket?: string;
  S3Key?: string;
  S3ObjectVersion?: string;
  ZipFile?: string;
}
export const AwsLambdaFunctionCode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3Bucket: S.optional(S.String),
    S3Key: S.optional(S.String),
    S3ObjectVersion: S.optional(S.String),
    ZipFile: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsLambdaFunctionCode",
}) as any as S.Schema<AwsLambdaFunctionCode>;
export interface AwsLambdaFunctionDeadLetterConfig {
  TargetArn?: string;
}
export const AwsLambdaFunctionDeadLetterConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TargetArn: S.optional(S.String) }),
).annotate({
  identifier: "AwsLambdaFunctionDeadLetterConfig",
}) as any as S.Schema<AwsLambdaFunctionDeadLetterConfig>;
export interface AwsLambdaFunctionEnvironmentError {
  ErrorCode?: string;
  Message?: string;
}
export const AwsLambdaFunctionEnvironmentError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ErrorCode: S.optional(S.String), Message: S.optional(S.String) }),
).annotate({
  identifier: "AwsLambdaFunctionEnvironmentError",
}) as any as S.Schema<AwsLambdaFunctionEnvironmentError>;
export interface AwsLambdaFunctionEnvironment {
  Variables?: { [key: string]: string | undefined };
  Error?: AwsLambdaFunctionEnvironmentError;
}
export const AwsLambdaFunctionEnvironment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Variables: S.optional(FieldMap),
    Error: S.optional(AwsLambdaFunctionEnvironmentError),
  }),
).annotate({
  identifier: "AwsLambdaFunctionEnvironment",
}) as any as S.Schema<AwsLambdaFunctionEnvironment>;
export interface AwsLambdaFunctionLayer {
  Arn?: string;
  CodeSize?: number;
}
export const AwsLambdaFunctionLayer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String), CodeSize: S.optional(S.Number) }),
).annotate({
  identifier: "AwsLambdaFunctionLayer",
}) as any as S.Schema<AwsLambdaFunctionLayer>;
export type AwsLambdaFunctionLayerList = AwsLambdaFunctionLayer[];
export const AwsLambdaFunctionLayerList = /*@__PURE__*/ S.Array(
  AwsLambdaFunctionLayer,
);
export interface AwsLambdaFunctionTracingConfig {
  Mode?: string;
}
export const AwsLambdaFunctionTracingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Mode: S.optional(S.String) }),
).annotate({
  identifier: "AwsLambdaFunctionTracingConfig",
}) as any as S.Schema<AwsLambdaFunctionTracingConfig>;
export interface AwsLambdaFunctionVpcConfig {
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
  VpcId?: string;
}
export const AwsLambdaFunctionVpcConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecurityGroupIds: S.optional(NonEmptyStringList),
    SubnetIds: S.optional(NonEmptyStringList),
    VpcId: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsLambdaFunctionVpcConfig",
}) as any as S.Schema<AwsLambdaFunctionVpcConfig>;
export interface AwsLambdaFunctionDetails {
  Code?: AwsLambdaFunctionCode;
  CodeSha256?: string;
  DeadLetterConfig?: AwsLambdaFunctionDeadLetterConfig;
  Environment?: AwsLambdaFunctionEnvironment;
  FunctionName?: string;
  Handler?: string;
  KmsKeyArn?: string;
  LastModified?: string;
  Layers?: AwsLambdaFunctionLayer[];
  MasterArn?: string;
  MemorySize?: number;
  RevisionId?: string;
  Role?: string;
  Runtime?: string;
  Timeout?: number;
  TracingConfig?: AwsLambdaFunctionTracingConfig;
  VpcConfig?: AwsLambdaFunctionVpcConfig;
  Version?: string;
  Architectures?: string[];
  PackageType?: string;
}
export const AwsLambdaFunctionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.optional(AwsLambdaFunctionCode),
    CodeSha256: S.optional(S.String),
    DeadLetterConfig: S.optional(AwsLambdaFunctionDeadLetterConfig),
    Environment: S.optional(AwsLambdaFunctionEnvironment),
    FunctionName: S.optional(S.String),
    Handler: S.optional(S.String),
    KmsKeyArn: S.optional(S.String),
    LastModified: S.optional(S.String),
    Layers: S.optional(AwsLambdaFunctionLayerList),
    MasterArn: S.optional(S.String),
    MemorySize: S.optional(S.Number),
    RevisionId: S.optional(S.String),
    Role: S.optional(S.String),
    Runtime: S.optional(S.String),
    Timeout: S.optional(S.Number),
    TracingConfig: S.optional(AwsLambdaFunctionTracingConfig),
    VpcConfig: S.optional(AwsLambdaFunctionVpcConfig),
    Version: S.optional(S.String),
    Architectures: S.optional(NonEmptyStringList),
    PackageType: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsLambdaFunctionDetails",
}) as any as S.Schema<AwsLambdaFunctionDetails>;
export type AwsLambdaLayerVersionNumber = number;
export interface AwsLambdaLayerVersionDetails {
  Version?: number;
  CompatibleRuntimes?: string[];
  CreatedDate?: string;
}
export const AwsLambdaLayerVersionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Version: S.optional(S.Number),
    CompatibleRuntimes: S.optional(NonEmptyStringList),
    CreatedDate: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsLambdaLayerVersionDetails",
}) as any as S.Schema<AwsLambdaLayerVersionDetails>;
export interface AwsRdsDbInstanceAssociatedRole {
  RoleArn?: string;
  FeatureName?: string;
  Status?: string;
}
export const AwsRdsDbInstanceAssociatedRole = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RoleArn: S.optional(S.String),
    FeatureName: S.optional(S.String),
    Status: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsRdsDbInstanceAssociatedRole",
}) as any as S.Schema<AwsRdsDbInstanceAssociatedRole>;
export type AwsRdsDbInstanceAssociatedRoles = AwsRdsDbInstanceAssociatedRole[];
export const AwsRdsDbInstanceAssociatedRoles = /*@__PURE__*/ S.Array(
  AwsRdsDbInstanceAssociatedRole,
);
export interface AwsRdsDbInstanceEndpoint {
  Address?: string;
  Port?: number;
  HostedZoneId?: string;
}
export const AwsRdsDbInstanceEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Address: S.optional(S.String),
    Port: S.optional(S.Number),
    HostedZoneId: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsRdsDbInstanceEndpoint",
}) as any as S.Schema<AwsRdsDbInstanceEndpoint>;
export interface AwsRdsDbInstanceVpcSecurityGroup {
  VpcSecurityGroupId?: string;
  Status?: string;
}
export const AwsRdsDbInstanceVpcSecurityGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcSecurityGroupId: S.optional(S.String),
    Status: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsRdsDbInstanceVpcSecurityGroup",
}) as any as S.Schema<AwsRdsDbInstanceVpcSecurityGroup>;
export type AwsRdsDbInstanceVpcSecurityGroups =
  AwsRdsDbInstanceVpcSecurityGroup[];
export const AwsRdsDbInstanceVpcSecurityGroups = /*@__PURE__*/ S.Array(
  AwsRdsDbInstanceVpcSecurityGroup,
);
export interface AwsRdsDbParameterGroup {
  DbParameterGroupName?: string;
  ParameterApplyStatus?: string;
}
export const AwsRdsDbParameterGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DbParameterGroupName: S.optional(S.String),
    ParameterApplyStatus: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsRdsDbParameterGroup",
}) as any as S.Schema<AwsRdsDbParameterGroup>;
export type AwsRdsDbParameterGroups = AwsRdsDbParameterGroup[];
export const AwsRdsDbParameterGroups = /*@__PURE__*/ S.Array(
  AwsRdsDbParameterGroup,
);
export interface AwsRdsDbSubnetGroupSubnetAvailabilityZone {
  Name?: string;
}
export const AwsRdsDbSubnetGroupSubnetAvailabilityZone =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Name: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsRdsDbSubnetGroupSubnetAvailabilityZone",
  }) as any as S.Schema<AwsRdsDbSubnetGroupSubnetAvailabilityZone>;
export interface AwsRdsDbSubnetGroupSubnet {
  SubnetIdentifier?: string;
  SubnetAvailabilityZone?: AwsRdsDbSubnetGroupSubnetAvailabilityZone;
  SubnetStatus?: string;
}
export const AwsRdsDbSubnetGroupSubnet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubnetIdentifier: S.optional(S.String),
    SubnetAvailabilityZone: S.optional(
      AwsRdsDbSubnetGroupSubnetAvailabilityZone,
    ),
    SubnetStatus: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsRdsDbSubnetGroupSubnet",
}) as any as S.Schema<AwsRdsDbSubnetGroupSubnet>;
export type AwsRdsDbSubnetGroupSubnets = AwsRdsDbSubnetGroupSubnet[];
export const AwsRdsDbSubnetGroupSubnets = /*@__PURE__*/ S.Array(
  AwsRdsDbSubnetGroupSubnet,
);
export interface AwsRdsDbSubnetGroup {
  DbSubnetGroupName?: string;
  DbSubnetGroupDescription?: string;
  VpcId?: string;
  SubnetGroupStatus?: string;
  Subnets?: AwsRdsDbSubnetGroupSubnet[];
  DbSubnetGroupArn?: string;
}
export const AwsRdsDbSubnetGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DbSubnetGroupName: S.optional(S.String),
    DbSubnetGroupDescription: S.optional(S.String),
    VpcId: S.optional(S.String),
    SubnetGroupStatus: S.optional(S.String),
    Subnets: S.optional(AwsRdsDbSubnetGroupSubnets),
    DbSubnetGroupArn: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsRdsDbSubnetGroup",
}) as any as S.Schema<AwsRdsDbSubnetGroup>;
export interface AwsRdsPendingCloudWatchLogsExports {
  LogTypesToEnable?: string[];
  LogTypesToDisable?: string[];
}
export const AwsRdsPendingCloudWatchLogsExports = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogTypesToEnable: S.optional(StringList),
    LogTypesToDisable: S.optional(StringList),
  }),
).annotate({
  identifier: "AwsRdsPendingCloudWatchLogsExports",
}) as any as S.Schema<AwsRdsPendingCloudWatchLogsExports>;
export interface AwsRdsDbProcessorFeature {
  Name?: string;
  Value?: string;
}
export const AwsRdsDbProcessorFeature = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({
  identifier: "AwsRdsDbProcessorFeature",
}) as any as S.Schema<AwsRdsDbProcessorFeature>;
export type AwsRdsDbProcessorFeatures = AwsRdsDbProcessorFeature[];
export const AwsRdsDbProcessorFeatures = /*@__PURE__*/ S.Array(
  AwsRdsDbProcessorFeature,
);
export interface AwsRdsDbPendingModifiedValues {
  DbInstanceClass?: string;
  AllocatedStorage?: number;
  MasterUserPassword?: string;
  Port?: number;
  BackupRetentionPeriod?: number;
  MultiAZ?: boolean;
  EngineVersion?: string;
  LicenseModel?: string;
  Iops?: number;
  DbInstanceIdentifier?: string;
  StorageType?: string;
  CaCertificateIdentifier?: string;
  DbSubnetGroupName?: string;
  PendingCloudWatchLogsExports?: AwsRdsPendingCloudWatchLogsExports;
  ProcessorFeatures?: AwsRdsDbProcessorFeature[];
}
export const AwsRdsDbPendingModifiedValues = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DbInstanceClass: S.optional(S.String),
    AllocatedStorage: S.optional(S.Number),
    MasterUserPassword: S.optional(S.String),
    Port: S.optional(S.Number),
    BackupRetentionPeriod: S.optional(S.Number),
    MultiAZ: S.optional(S.Boolean),
    EngineVersion: S.optional(S.String),
    LicenseModel: S.optional(S.String),
    Iops: S.optional(S.Number),
    DbInstanceIdentifier: S.optional(S.String),
    StorageType: S.optional(S.String),
    CaCertificateIdentifier: S.optional(S.String),
    DbSubnetGroupName: S.optional(S.String),
    PendingCloudWatchLogsExports: S.optional(
      AwsRdsPendingCloudWatchLogsExports,
    ),
    ProcessorFeatures: S.optional(AwsRdsDbProcessorFeatures),
  }),
).annotate({
  identifier: "AwsRdsDbPendingModifiedValues",
}) as any as S.Schema<AwsRdsDbPendingModifiedValues>;
export interface AwsRdsDbOptionGroupMembership {
  OptionGroupName?: string;
  Status?: string;
}
export const AwsRdsDbOptionGroupMembership = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OptionGroupName: S.optional(S.String),
    Status: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsRdsDbOptionGroupMembership",
}) as any as S.Schema<AwsRdsDbOptionGroupMembership>;
export type AwsRdsDbOptionGroupMemberships = AwsRdsDbOptionGroupMembership[];
export const AwsRdsDbOptionGroupMemberships = /*@__PURE__*/ S.Array(
  AwsRdsDbOptionGroupMembership,
);
export interface AwsRdsDbStatusInfo {
  StatusType?: string;
  Normal?: boolean;
  Status?: string;
  Message?: string;
}
export const AwsRdsDbStatusInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StatusType: S.optional(S.String),
    Normal: S.optional(S.Boolean),
    Status: S.optional(S.String),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsRdsDbStatusInfo",
}) as any as S.Schema<AwsRdsDbStatusInfo>;
export type AwsRdsDbStatusInfos = AwsRdsDbStatusInfo[];
export const AwsRdsDbStatusInfos = /*@__PURE__*/ S.Array(AwsRdsDbStatusInfo);
export interface AwsRdsDbDomainMembership {
  Domain?: string;
  Status?: string;
  Fqdn?: string;
  IamRoleName?: string;
}
export const AwsRdsDbDomainMembership = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Domain: S.optional(S.String),
    Status: S.optional(S.String),
    Fqdn: S.optional(S.String),
    IamRoleName: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsRdsDbDomainMembership",
}) as any as S.Schema<AwsRdsDbDomainMembership>;
export type AwsRdsDbDomainMemberships = AwsRdsDbDomainMembership[];
export const AwsRdsDbDomainMemberships = /*@__PURE__*/ S.Array(
  AwsRdsDbDomainMembership,
);
export interface AwsRdsDbInstanceDetails {
  AssociatedRoles?: AwsRdsDbInstanceAssociatedRole[];
  CACertificateIdentifier?: string;
  DBClusterIdentifier?: string;
  DBInstanceIdentifier?: string;
  DBInstanceClass?: string;
  DbInstancePort?: number;
  DbiResourceId?: string;
  DBName?: string;
  DeletionProtection?: boolean;
  Endpoint?: AwsRdsDbInstanceEndpoint;
  Engine?: string;
  EngineVersion?: string;
  IAMDatabaseAuthenticationEnabled?: boolean;
  InstanceCreateTime?: string;
  KmsKeyId?: string;
  PubliclyAccessible?: boolean;
  StorageEncrypted?: boolean;
  TdeCredentialArn?: string;
  VpcSecurityGroups?: AwsRdsDbInstanceVpcSecurityGroup[];
  MultiAz?: boolean;
  EnhancedMonitoringResourceArn?: string;
  DbInstanceStatus?: string;
  MasterUsername?: string;
  AllocatedStorage?: number;
  PreferredBackupWindow?: string;
  BackupRetentionPeriod?: number;
  DbSecurityGroups?: string[];
  DbParameterGroups?: AwsRdsDbParameterGroup[];
  AvailabilityZone?: string;
  DbSubnetGroup?: AwsRdsDbSubnetGroup;
  PreferredMaintenanceWindow?: string;
  PendingModifiedValues?: AwsRdsDbPendingModifiedValues;
  LatestRestorableTime?: string;
  AutoMinorVersionUpgrade?: boolean;
  ReadReplicaSourceDBInstanceIdentifier?: string;
  ReadReplicaDBInstanceIdentifiers?: string[];
  ReadReplicaDBClusterIdentifiers?: string[];
  LicenseModel?: string;
  Iops?: number;
  OptionGroupMemberships?: AwsRdsDbOptionGroupMembership[];
  CharacterSetName?: string;
  SecondaryAvailabilityZone?: string;
  StatusInfos?: AwsRdsDbStatusInfo[];
  StorageType?: string;
  DomainMemberships?: AwsRdsDbDomainMembership[];
  CopyTagsToSnapshot?: boolean;
  MonitoringInterval?: number;
  MonitoringRoleArn?: string;
  PromotionTier?: number;
  Timezone?: string;
  PerformanceInsightsEnabled?: boolean;
  PerformanceInsightsKmsKeyId?: string;
  PerformanceInsightsRetentionPeriod?: number;
  EnabledCloudWatchLogsExports?: string[];
  ProcessorFeatures?: AwsRdsDbProcessorFeature[];
  ListenerEndpoint?: AwsRdsDbInstanceEndpoint;
  MaxAllocatedStorage?: number;
}
export const AwsRdsDbInstanceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssociatedRoles: S.optional(AwsRdsDbInstanceAssociatedRoles),
    CACertificateIdentifier: S.optional(S.String),
    DBClusterIdentifier: S.optional(S.String),
    DBInstanceIdentifier: S.optional(S.String),
    DBInstanceClass: S.optional(S.String),
    DbInstancePort: S.optional(S.Number),
    DbiResourceId: S.optional(S.String),
    DBName: S.optional(S.String),
    DeletionProtection: S.optional(S.Boolean),
    Endpoint: S.optional(AwsRdsDbInstanceEndpoint),
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    IAMDatabaseAuthenticationEnabled: S.optional(S.Boolean),
    InstanceCreateTime: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    PubliclyAccessible: S.optional(S.Boolean),
    StorageEncrypted: S.optional(S.Boolean),
    TdeCredentialArn: S.optional(S.String),
    VpcSecurityGroups: S.optional(AwsRdsDbInstanceVpcSecurityGroups),
    MultiAz: S.optional(S.Boolean),
    EnhancedMonitoringResourceArn: S.optional(S.String),
    DbInstanceStatus: S.optional(S.String),
    MasterUsername: S.optional(S.String),
    AllocatedStorage: S.optional(S.Number),
    PreferredBackupWindow: S.optional(S.String),
    BackupRetentionPeriod: S.optional(S.Number),
    DbSecurityGroups: S.optional(StringList),
    DbParameterGroups: S.optional(AwsRdsDbParameterGroups),
    AvailabilityZone: S.optional(S.String),
    DbSubnetGroup: S.optional(AwsRdsDbSubnetGroup),
    PreferredMaintenanceWindow: S.optional(S.String),
    PendingModifiedValues: S.optional(AwsRdsDbPendingModifiedValues),
    LatestRestorableTime: S.optional(S.String),
    AutoMinorVersionUpgrade: S.optional(S.Boolean),
    ReadReplicaSourceDBInstanceIdentifier: S.optional(S.String),
    ReadReplicaDBInstanceIdentifiers: S.optional(StringList),
    ReadReplicaDBClusterIdentifiers: S.optional(StringList),
    LicenseModel: S.optional(S.String),
    Iops: S.optional(S.Number),
    OptionGroupMemberships: S.optional(AwsRdsDbOptionGroupMemberships),
    CharacterSetName: S.optional(S.String),
    SecondaryAvailabilityZone: S.optional(S.String),
    StatusInfos: S.optional(AwsRdsDbStatusInfos),
    StorageType: S.optional(S.String),
    DomainMemberships: S.optional(AwsRdsDbDomainMemberships),
    CopyTagsToSnapshot: S.optional(S.Boolean),
    MonitoringInterval: S.optional(S.Number),
    MonitoringRoleArn: S.optional(S.String),
    PromotionTier: S.optional(S.Number),
    Timezone: S.optional(S.String),
    PerformanceInsightsEnabled: S.optional(S.Boolean),
    PerformanceInsightsKmsKeyId: S.optional(S.String),
    PerformanceInsightsRetentionPeriod: S.optional(S.Number),
    EnabledCloudWatchLogsExports: S.optional(StringList),
    ProcessorFeatures: S.optional(AwsRdsDbProcessorFeatures),
    ListenerEndpoint: S.optional(AwsRdsDbInstanceEndpoint),
    MaxAllocatedStorage: S.optional(S.Number),
  }),
).annotate({
  identifier: "AwsRdsDbInstanceDetails",
}) as any as S.Schema<AwsRdsDbInstanceDetails>;
export interface AwsSnsTopicSubscription {
  Endpoint?: string;
  Protocol?: string;
}
export const AwsSnsTopicSubscription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Endpoint: S.optional(S.String), Protocol: S.optional(S.String) }),
).annotate({
  identifier: "AwsSnsTopicSubscription",
}) as any as S.Schema<AwsSnsTopicSubscription>;
export type AwsSnsTopicSubscriptionList = AwsSnsTopicSubscription[];
export const AwsSnsTopicSubscriptionList = /*@__PURE__*/ S.Array(
  AwsSnsTopicSubscription,
);
export interface AwsSnsTopicDetails {
  KmsMasterKeyId?: string;
  Subscription?: AwsSnsTopicSubscription[];
  TopicName?: string;
  Owner?: string;
  SqsSuccessFeedbackRoleArn?: string;
  SqsFailureFeedbackRoleArn?: string;
  ApplicationSuccessFeedbackRoleArn?: string;
  FirehoseSuccessFeedbackRoleArn?: string;
  FirehoseFailureFeedbackRoleArn?: string;
  HttpSuccessFeedbackRoleArn?: string;
  HttpFailureFeedbackRoleArn?: string;
}
export const AwsSnsTopicDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KmsMasterKeyId: S.optional(S.String),
    Subscription: S.optional(AwsSnsTopicSubscriptionList),
    TopicName: S.optional(S.String),
    Owner: S.optional(S.String),
    SqsSuccessFeedbackRoleArn: S.optional(S.String),
    SqsFailureFeedbackRoleArn: S.optional(S.String),
    ApplicationSuccessFeedbackRoleArn: S.optional(S.String),
    FirehoseSuccessFeedbackRoleArn: S.optional(S.String),
    FirehoseFailureFeedbackRoleArn: S.optional(S.String),
    HttpSuccessFeedbackRoleArn: S.optional(S.String),
    HttpFailureFeedbackRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsSnsTopicDetails",
}) as any as S.Schema<AwsSnsTopicDetails>;
export interface AwsSqsQueueDetails {
  KmsDataKeyReusePeriodSeconds?: number;
  KmsMasterKeyId?: string;
  QueueName?: string;
  DeadLetterTargetArn?: string;
}
export const AwsSqsQueueDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KmsDataKeyReusePeriodSeconds: S.optional(S.Number),
    KmsMasterKeyId: S.optional(S.String),
    QueueName: S.optional(S.String),
    DeadLetterTargetArn: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsSqsQueueDetails",
}) as any as S.Schema<AwsSqsQueueDetails>;
export interface WafAction {
  Type?: string;
}
export const WafAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: S.optional(S.String) }),
).annotate({ identifier: "WafAction" }) as any as S.Schema<WafAction>;
export interface WafExcludedRule {
  RuleId?: string;
}
export const WafExcludedRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleId: S.optional(S.String) }),
).annotate({
  identifier: "WafExcludedRule",
}) as any as S.Schema<WafExcludedRule>;
export type WafExcludedRuleList = WafExcludedRule[];
export const WafExcludedRuleList = /*@__PURE__*/ S.Array(WafExcludedRule);
export interface WafOverrideAction {
  Type?: string;
}
export const WafOverrideAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: S.optional(S.String) }),
).annotate({
  identifier: "WafOverrideAction",
}) as any as S.Schema<WafOverrideAction>;
export interface AwsWafWebAclRule {
  Action?: WafAction;
  ExcludedRules?: WafExcludedRule[];
  OverrideAction?: WafOverrideAction;
  Priority?: number;
  RuleId?: string;
  Type?: string;
}
export const AwsWafWebAclRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.optional(WafAction),
    ExcludedRules: S.optional(WafExcludedRuleList),
    OverrideAction: S.optional(WafOverrideAction),
    Priority: S.optional(S.Number),
    RuleId: S.optional(S.String),
    Type: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsWafWebAclRule",
}) as any as S.Schema<AwsWafWebAclRule>;
export type AwsWafWebAclRuleList = AwsWafWebAclRule[];
export const AwsWafWebAclRuleList = /*@__PURE__*/ S.Array(AwsWafWebAclRule);
export interface AwsWafWebAclDetails {
  Name?: string;
  DefaultAction?: string;
  Rules?: AwsWafWebAclRule[];
  WebAclId?: string;
}
export const AwsWafWebAclDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    DefaultAction: S.optional(S.String),
    Rules: S.optional(AwsWafWebAclRuleList),
    WebAclId: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsWafWebAclDetails",
}) as any as S.Schema<AwsWafWebAclDetails>;
export interface AwsRdsDbSnapshotDetails {
  DbSnapshotIdentifier?: string;
  DbInstanceIdentifier?: string;
  SnapshotCreateTime?: string;
  Engine?: string;
  AllocatedStorage?: number;
  Status?: string;
  Port?: number;
  AvailabilityZone?: string;
  VpcId?: string;
  InstanceCreateTime?: string;
  MasterUsername?: string;
  EngineVersion?: string;
  LicenseModel?: string;
  SnapshotType?: string;
  Iops?: number;
  OptionGroupName?: string;
  PercentProgress?: number;
  SourceRegion?: string;
  SourceDbSnapshotIdentifier?: string;
  StorageType?: string;
  TdeCredentialArn?: string;
  Encrypted?: boolean;
  KmsKeyId?: string;
  Timezone?: string;
  IamDatabaseAuthenticationEnabled?: boolean;
  ProcessorFeatures?: AwsRdsDbProcessorFeature[];
  DbiResourceId?: string;
}
export const AwsRdsDbSnapshotDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DbSnapshotIdentifier: S.optional(S.String),
    DbInstanceIdentifier: S.optional(S.String),
    SnapshotCreateTime: S.optional(S.String),
    Engine: S.optional(S.String),
    AllocatedStorage: S.optional(S.Number),
    Status: S.optional(S.String),
    Port: S.optional(S.Number),
    AvailabilityZone: S.optional(S.String),
    VpcId: S.optional(S.String),
    InstanceCreateTime: S.optional(S.String),
    MasterUsername: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    LicenseModel: S.optional(S.String),
    SnapshotType: S.optional(S.String),
    Iops: S.optional(S.Number),
    OptionGroupName: S.optional(S.String),
    PercentProgress: S.optional(S.Number),
    SourceRegion: S.optional(S.String),
    SourceDbSnapshotIdentifier: S.optional(S.String),
    StorageType: S.optional(S.String),
    TdeCredentialArn: S.optional(S.String),
    Encrypted: S.optional(S.Boolean),
    KmsKeyId: S.optional(S.String),
    Timezone: S.optional(S.String),
    IamDatabaseAuthenticationEnabled: S.optional(S.Boolean),
    ProcessorFeatures: S.optional(AwsRdsDbProcessorFeatures),
    DbiResourceId: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsRdsDbSnapshotDetails",
}) as any as S.Schema<AwsRdsDbSnapshotDetails>;
export interface AwsRdsDbClusterSnapshotDbClusterSnapshotAttribute {
  AttributeName?: string;
  AttributeValues?: string[];
}
export const AwsRdsDbClusterSnapshotDbClusterSnapshotAttribute =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AttributeName: S.optional(S.String),
      AttributeValues: S.optional(NonEmptyStringList),
    }),
  ).annotate({
    identifier: "AwsRdsDbClusterSnapshotDbClusterSnapshotAttribute",
  }) as any as S.Schema<AwsRdsDbClusterSnapshotDbClusterSnapshotAttribute>;
export type AwsRdsDbClusterSnapshotDbClusterSnapshotAttributes =
  AwsRdsDbClusterSnapshotDbClusterSnapshotAttribute[];
export const AwsRdsDbClusterSnapshotDbClusterSnapshotAttributes =
  /*@__PURE__*/ S.Array(AwsRdsDbClusterSnapshotDbClusterSnapshotAttribute);
export interface AwsRdsDbClusterSnapshotDetails {
  AvailabilityZones?: string[];
  SnapshotCreateTime?: string;
  Engine?: string;
  AllocatedStorage?: number;
  Status?: string;
  Port?: number;
  VpcId?: string;
  ClusterCreateTime?: string;
  MasterUsername?: string;
  EngineVersion?: string;
  LicenseModel?: string;
  SnapshotType?: string;
  PercentProgress?: number;
  StorageEncrypted?: boolean;
  KmsKeyId?: string;
  DbClusterIdentifier?: string;
  DbClusterSnapshotIdentifier?: string;
  IamDatabaseAuthenticationEnabled?: boolean;
  DbClusterSnapshotAttributes?: AwsRdsDbClusterSnapshotDbClusterSnapshotAttribute[];
}
export const AwsRdsDbClusterSnapshotDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityZones: S.optional(StringList),
    SnapshotCreateTime: S.optional(S.String),
    Engine: S.optional(S.String),
    AllocatedStorage: S.optional(S.Number),
    Status: S.optional(S.String),
    Port: S.optional(S.Number),
    VpcId: S.optional(S.String),
    ClusterCreateTime: S.optional(S.String),
    MasterUsername: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    LicenseModel: S.optional(S.String),
    SnapshotType: S.optional(S.String),
    PercentProgress: S.optional(S.Number),
    StorageEncrypted: S.optional(S.Boolean),
    KmsKeyId: S.optional(S.String),
    DbClusterIdentifier: S.optional(S.String),
    DbClusterSnapshotIdentifier: S.optional(S.String),
    IamDatabaseAuthenticationEnabled: S.optional(S.Boolean),
    DbClusterSnapshotAttributes: S.optional(
      AwsRdsDbClusterSnapshotDbClusterSnapshotAttributes,
    ),
  }),
).annotate({
  identifier: "AwsRdsDbClusterSnapshotDetails",
}) as any as S.Schema<AwsRdsDbClusterSnapshotDetails>;
export interface AwsRdsDbClusterAssociatedRole {
  RoleArn?: string;
  Status?: string;
}
export const AwsRdsDbClusterAssociatedRole = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RoleArn: S.optional(S.String), Status: S.optional(S.String) }),
).annotate({
  identifier: "AwsRdsDbClusterAssociatedRole",
}) as any as S.Schema<AwsRdsDbClusterAssociatedRole>;
export type AwsRdsDbClusterAssociatedRoles = AwsRdsDbClusterAssociatedRole[];
export const AwsRdsDbClusterAssociatedRoles = /*@__PURE__*/ S.Array(
  AwsRdsDbClusterAssociatedRole,
);
export interface AwsRdsDbClusterOptionGroupMembership {
  DbClusterOptionGroupName?: string;
  Status?: string;
}
export const AwsRdsDbClusterOptionGroupMembership = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DbClusterOptionGroupName: S.optional(S.String),
      Status: S.optional(S.String),
    }),
).annotate({
  identifier: "AwsRdsDbClusterOptionGroupMembership",
}) as any as S.Schema<AwsRdsDbClusterOptionGroupMembership>;
export type AwsRdsDbClusterOptionGroupMemberships =
  AwsRdsDbClusterOptionGroupMembership[];
export const AwsRdsDbClusterOptionGroupMemberships = /*@__PURE__*/ S.Array(
  AwsRdsDbClusterOptionGroupMembership,
);
export interface AwsRdsDbClusterMember {
  IsClusterWriter?: boolean;
  PromotionTier?: number;
  DbInstanceIdentifier?: string;
  DbClusterParameterGroupStatus?: string;
}
export const AwsRdsDbClusterMember = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IsClusterWriter: S.optional(S.Boolean),
    PromotionTier: S.optional(S.Number),
    DbInstanceIdentifier: S.optional(S.String),
    DbClusterParameterGroupStatus: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsRdsDbClusterMember",
}) as any as S.Schema<AwsRdsDbClusterMember>;
export type AwsRdsDbClusterMembers = AwsRdsDbClusterMember[];
export const AwsRdsDbClusterMembers = /*@__PURE__*/ S.Array(
  AwsRdsDbClusterMember,
);
export interface AwsRdsDbClusterDetails {
  AllocatedStorage?: number;
  AvailabilityZones?: string[];
  BackupRetentionPeriod?: number;
  DatabaseName?: string;
  Status?: string;
  Endpoint?: string;
  ReaderEndpoint?: string;
  CustomEndpoints?: string[];
  MultiAz?: boolean;
  Engine?: string;
  EngineVersion?: string;
  Port?: number;
  MasterUsername?: string;
  PreferredBackupWindow?: string;
  PreferredMaintenanceWindow?: string;
  ReadReplicaIdentifiers?: string[];
  VpcSecurityGroups?: AwsRdsDbInstanceVpcSecurityGroup[];
  HostedZoneId?: string;
  StorageEncrypted?: boolean;
  KmsKeyId?: string;
  DbClusterResourceId?: string;
  AssociatedRoles?: AwsRdsDbClusterAssociatedRole[];
  ClusterCreateTime?: string;
  EnabledCloudWatchLogsExports?: string[];
  EngineMode?: string;
  DeletionProtection?: boolean;
  HttpEndpointEnabled?: boolean;
  ActivityStreamStatus?: string;
  CopyTagsToSnapshot?: boolean;
  CrossAccountClone?: boolean;
  DomainMemberships?: AwsRdsDbDomainMembership[];
  DbClusterParameterGroup?: string;
  DbSubnetGroup?: string;
  DbClusterOptionGroupMemberships?: AwsRdsDbClusterOptionGroupMembership[];
  DbClusterIdentifier?: string;
  DbClusterMembers?: AwsRdsDbClusterMember[];
  IamDatabaseAuthenticationEnabled?: boolean;
  AutoMinorVersionUpgrade?: boolean;
}
export const AwsRdsDbClusterDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AllocatedStorage: S.optional(S.Number),
    AvailabilityZones: S.optional(StringList),
    BackupRetentionPeriod: S.optional(S.Number),
    DatabaseName: S.optional(S.String),
    Status: S.optional(S.String),
    Endpoint: S.optional(S.String),
    ReaderEndpoint: S.optional(S.String),
    CustomEndpoints: S.optional(StringList),
    MultiAz: S.optional(S.Boolean),
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    Port: S.optional(S.Number),
    MasterUsername: S.optional(S.String),
    PreferredBackupWindow: S.optional(S.String),
    PreferredMaintenanceWindow: S.optional(S.String),
    ReadReplicaIdentifiers: S.optional(StringList),
    VpcSecurityGroups: S.optional(AwsRdsDbInstanceVpcSecurityGroups),
    HostedZoneId: S.optional(S.String),
    StorageEncrypted: S.optional(S.Boolean),
    KmsKeyId: S.optional(S.String),
    DbClusterResourceId: S.optional(S.String),
    AssociatedRoles: S.optional(AwsRdsDbClusterAssociatedRoles),
    ClusterCreateTime: S.optional(S.String),
    EnabledCloudWatchLogsExports: S.optional(StringList),
    EngineMode: S.optional(S.String),
    DeletionProtection: S.optional(S.Boolean),
    HttpEndpointEnabled: S.optional(S.Boolean),
    ActivityStreamStatus: S.optional(S.String),
    CopyTagsToSnapshot: S.optional(S.Boolean),
    CrossAccountClone: S.optional(S.Boolean),
    DomainMemberships: S.optional(AwsRdsDbDomainMemberships),
    DbClusterParameterGroup: S.optional(S.String),
    DbSubnetGroup: S.optional(S.String),
    DbClusterOptionGroupMemberships: S.optional(
      AwsRdsDbClusterOptionGroupMemberships,
    ),
    DbClusterIdentifier: S.optional(S.String),
    DbClusterMembers: S.optional(AwsRdsDbClusterMembers),
    IamDatabaseAuthenticationEnabled: S.optional(S.Boolean),
    AutoMinorVersionUpgrade: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AwsRdsDbClusterDetails",
}) as any as S.Schema<AwsRdsDbClusterDetails>;
export interface AwsEcsClusterClusterSettingsDetails {
  Name?: string;
  Value?: string;
}
export const AwsEcsClusterClusterSettingsDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({
  identifier: "AwsEcsClusterClusterSettingsDetails",
}) as any as S.Schema<AwsEcsClusterClusterSettingsDetails>;
export type AwsEcsClusterClusterSettingsList =
  AwsEcsClusterClusterSettingsDetails[];
export const AwsEcsClusterClusterSettingsList = /*@__PURE__*/ S.Array(
  AwsEcsClusterClusterSettingsDetails,
);
export interface AwsEcsClusterConfigurationExecuteCommandConfigurationLogConfigurationDetails {
  CloudWatchEncryptionEnabled?: boolean;
  CloudWatchLogGroupName?: string;
  S3BucketName?: string;
  S3EncryptionEnabled?: boolean;
  S3KeyPrefix?: string;
}
export const AwsEcsClusterConfigurationExecuteCommandConfigurationLogConfigurationDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CloudWatchEncryptionEnabled: S.optional(S.Boolean),
      CloudWatchLogGroupName: S.optional(S.String),
      S3BucketName: S.optional(S.String),
      S3EncryptionEnabled: S.optional(S.Boolean),
      S3KeyPrefix: S.optional(S.String),
    }),
  ).annotate({
    identifier:
      "AwsEcsClusterConfigurationExecuteCommandConfigurationLogConfigurationDetails",
  }) as any as S.Schema<AwsEcsClusterConfigurationExecuteCommandConfigurationLogConfigurationDetails>;
export interface AwsEcsClusterConfigurationExecuteCommandConfigurationDetails {
  KmsKeyId?: string;
  LogConfiguration?: AwsEcsClusterConfigurationExecuteCommandConfigurationLogConfigurationDetails;
  Logging?: string;
}
export const AwsEcsClusterConfigurationExecuteCommandConfigurationDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      KmsKeyId: S.optional(S.String),
      LogConfiguration: S.optional(
        AwsEcsClusterConfigurationExecuteCommandConfigurationLogConfigurationDetails,
      ),
      Logging: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsEcsClusterConfigurationExecuteCommandConfigurationDetails",
  }) as any as S.Schema<AwsEcsClusterConfigurationExecuteCommandConfigurationDetails>;
export interface AwsEcsClusterConfigurationDetails {
  ExecuteCommandConfiguration?: AwsEcsClusterConfigurationExecuteCommandConfigurationDetails;
}
export const AwsEcsClusterConfigurationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExecuteCommandConfiguration: S.optional(
      AwsEcsClusterConfigurationExecuteCommandConfigurationDetails,
    ),
  }),
).annotate({
  identifier: "AwsEcsClusterConfigurationDetails",
}) as any as S.Schema<AwsEcsClusterConfigurationDetails>;
export interface AwsEcsClusterDefaultCapacityProviderStrategyDetails {
  Base?: number;
  CapacityProvider?: string;
  Weight?: number;
}
export const AwsEcsClusterDefaultCapacityProviderStrategyDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Base: S.optional(S.Number),
      CapacityProvider: S.optional(S.String),
      Weight: S.optional(S.Number),
    }),
  ).annotate({
    identifier: "AwsEcsClusterDefaultCapacityProviderStrategyDetails",
  }) as any as S.Schema<AwsEcsClusterDefaultCapacityProviderStrategyDetails>;
export type AwsEcsClusterDefaultCapacityProviderStrategyList =
  AwsEcsClusterDefaultCapacityProviderStrategyDetails[];
export const AwsEcsClusterDefaultCapacityProviderStrategyList =
  /*@__PURE__*/ S.Array(AwsEcsClusterDefaultCapacityProviderStrategyDetails);
export interface AwsEcsClusterDetails {
  ClusterArn?: string;
  ActiveServicesCount?: number;
  CapacityProviders?: string[];
  ClusterSettings?: AwsEcsClusterClusterSettingsDetails[];
  Configuration?: AwsEcsClusterConfigurationDetails;
  DefaultCapacityProviderStrategy?: AwsEcsClusterDefaultCapacityProviderStrategyDetails[];
  ClusterName?: string;
  RegisteredContainerInstancesCount?: number;
  RunningTasksCount?: number;
  Status?: string;
}
export const AwsEcsClusterDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterArn: S.optional(S.String),
    ActiveServicesCount: S.optional(S.Number),
    CapacityProviders: S.optional(NonEmptyStringList),
    ClusterSettings: S.optional(AwsEcsClusterClusterSettingsList),
    Configuration: S.optional(AwsEcsClusterConfigurationDetails),
    DefaultCapacityProviderStrategy: S.optional(
      AwsEcsClusterDefaultCapacityProviderStrategyList,
    ),
    ClusterName: S.optional(S.String),
    RegisteredContainerInstancesCount: S.optional(S.Number),
    RunningTasksCount: S.optional(S.Number),
    Status: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEcsClusterDetails",
}) as any as S.Schema<AwsEcsClusterDetails>;
export interface AwsMountPoint {
  SourceVolume?: string;
  ContainerPath?: string;
}
export const AwsMountPoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceVolume: S.optional(S.String),
    ContainerPath: S.optional(S.String),
  }),
).annotate({ identifier: "AwsMountPoint" }) as any as S.Schema<AwsMountPoint>;
export type AwsMountPointList = AwsMountPoint[];
export const AwsMountPointList = /*@__PURE__*/ S.Array(AwsMountPoint);
export interface AwsEcsContainerDetails {
  Name?: string;
  Image?: string;
  MountPoints?: AwsMountPoint[];
  Privileged?: boolean;
}
export const AwsEcsContainerDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Image: S.optional(S.String),
    MountPoints: S.optional(AwsMountPointList),
    Privileged: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AwsEcsContainerDetails",
}) as any as S.Schema<AwsEcsContainerDetails>;
export interface AwsEcsTaskDefinitionContainerDefinitionsDependsOnDetails {
  Condition?: string;
  ContainerName?: string;
}
export const AwsEcsTaskDefinitionContainerDefinitionsDependsOnDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Condition: S.optional(S.String),
      ContainerName: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsEcsTaskDefinitionContainerDefinitionsDependsOnDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionContainerDefinitionsDependsOnDetails>;
export type AwsEcsTaskDefinitionContainerDefinitionsDependsOnList =
  AwsEcsTaskDefinitionContainerDefinitionsDependsOnDetails[];
export const AwsEcsTaskDefinitionContainerDefinitionsDependsOnList =
  /*@__PURE__*/ S.Array(
    AwsEcsTaskDefinitionContainerDefinitionsDependsOnDetails,
  );
export interface AwsEcsTaskDefinitionContainerDefinitionsEnvironmentDetails {
  Name?: string;
  Value?: string;
}
export const AwsEcsTaskDefinitionContainerDefinitionsEnvironmentDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsEcsTaskDefinitionContainerDefinitionsEnvironmentDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionContainerDefinitionsEnvironmentDetails>;
export type AwsEcsTaskDefinitionContainerDefinitionsEnvironmentList =
  AwsEcsTaskDefinitionContainerDefinitionsEnvironmentDetails[];
export const AwsEcsTaskDefinitionContainerDefinitionsEnvironmentList =
  /*@__PURE__*/ S.Array(
    AwsEcsTaskDefinitionContainerDefinitionsEnvironmentDetails,
  );
export interface AwsEcsTaskDefinitionContainerDefinitionsEnvironmentFilesDetails {
  Type?: string;
  Value?: string;
}
export const AwsEcsTaskDefinitionContainerDefinitionsEnvironmentFilesDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Type: S.optional(S.String), Value: S.optional(S.String) }),
  ).annotate({
    identifier:
      "AwsEcsTaskDefinitionContainerDefinitionsEnvironmentFilesDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionContainerDefinitionsEnvironmentFilesDetails>;
export type AwsEcsTaskDefinitionContainerDefinitionsEnvironmentFilesList =
  AwsEcsTaskDefinitionContainerDefinitionsEnvironmentFilesDetails[];
export const AwsEcsTaskDefinitionContainerDefinitionsEnvironmentFilesList =
  /*@__PURE__*/ S.Array(
    AwsEcsTaskDefinitionContainerDefinitionsEnvironmentFilesDetails,
  );
export interface AwsEcsTaskDefinitionContainerDefinitionsExtraHostsDetails {
  Hostname?: string;
  IpAddress?: string;
}
export const AwsEcsTaskDefinitionContainerDefinitionsExtraHostsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Hostname: S.optional(S.String),
      IpAddress: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsEcsTaskDefinitionContainerDefinitionsExtraHostsDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionContainerDefinitionsExtraHostsDetails>;
export type AwsEcsTaskDefinitionContainerDefinitionsExtraHostsList =
  AwsEcsTaskDefinitionContainerDefinitionsExtraHostsDetails[];
export const AwsEcsTaskDefinitionContainerDefinitionsExtraHostsList =
  /*@__PURE__*/ S.Array(
    AwsEcsTaskDefinitionContainerDefinitionsExtraHostsDetails,
  );
export interface AwsEcsTaskDefinitionContainerDefinitionsFirelensConfigurationDetails {
  Options?: { [key: string]: string | undefined };
  Type?: string;
}
export const AwsEcsTaskDefinitionContainerDefinitionsFirelensConfigurationDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Options: S.optional(FieldMap), Type: S.optional(S.String) }),
  ).annotate({
    identifier:
      "AwsEcsTaskDefinitionContainerDefinitionsFirelensConfigurationDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionContainerDefinitionsFirelensConfigurationDetails>;
export interface AwsEcsTaskDefinitionContainerDefinitionsHealthCheckDetails {
  Command?: string[];
  Interval?: number;
  Retries?: number;
  StartPeriod?: number;
  Timeout?: number;
}
export const AwsEcsTaskDefinitionContainerDefinitionsHealthCheckDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Command: S.optional(NonEmptyStringList),
      Interval: S.optional(S.Number),
      Retries: S.optional(S.Number),
      StartPeriod: S.optional(S.Number),
      Timeout: S.optional(S.Number),
    }),
  ).annotate({
    identifier: "AwsEcsTaskDefinitionContainerDefinitionsHealthCheckDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionContainerDefinitionsHealthCheckDetails>;
export interface AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersCapabilitiesDetails {
  Add?: string[];
  Drop?: string[];
}
export const AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersCapabilitiesDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Add: S.optional(NonEmptyStringList),
      Drop: S.optional(NonEmptyStringList),
    }),
  ).annotate({
    identifier:
      "AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersCapabilitiesDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersCapabilitiesDetails>;
export interface AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDevicesDetails {
  ContainerPath?: string;
  HostPath?: string;
  Permissions?: string[];
}
export const AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDevicesDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ContainerPath: S.optional(S.String),
      HostPath: S.optional(S.String),
      Permissions: S.optional(NonEmptyStringList),
    }),
  ).annotate({
    identifier:
      "AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDevicesDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDevicesDetails>;
export type AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDevicesList =
  AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDevicesDetails[];
export const AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDevicesList =
  /*@__PURE__*/ S.Array(
    AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDevicesDetails,
  );
export interface AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersTmpfsDetails {
  ContainerPath?: string;
  MountOptions?: string[];
  Size?: number;
}
export const AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersTmpfsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ContainerPath: S.optional(S.String),
      MountOptions: S.optional(NonEmptyStringList),
      Size: S.optional(S.Number),
    }),
  ).annotate({
    identifier:
      "AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersTmpfsDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersTmpfsDetails>;
export type AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersTmpfsList =
  AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersTmpfsDetails[];
export const AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersTmpfsList =
  /*@__PURE__*/ S.Array(
    AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersTmpfsDetails,
  );
export interface AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDetails {
  Capabilities?: AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersCapabilitiesDetails;
  Devices?: AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDevicesDetails[];
  InitProcessEnabled?: boolean;
  MaxSwap?: number;
  SharedMemorySize?: number;
  Swappiness?: number;
  Tmpfs?: AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersTmpfsDetails[];
}
export const AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Capabilities: S.optional(
        AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersCapabilitiesDetails,
      ),
      Devices: S.optional(
        AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDevicesList,
      ),
      InitProcessEnabled: S.optional(S.Boolean),
      MaxSwap: S.optional(S.Number),
      SharedMemorySize: S.optional(S.Number),
      Swappiness: S.optional(S.Number),
      Tmpfs: S.optional(
        AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersTmpfsList,
      ),
    }),
  ).annotate({
    identifier:
      "AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDetails>;
export interface AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationSecretOptionsDetails {
  Name?: string;
  ValueFrom?: string;
}
export const AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationSecretOptionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Name: S.optional(S.String), ValueFrom: S.optional(S.String) }),
  ).annotate({
    identifier:
      "AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationSecretOptionsDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationSecretOptionsDetails>;
export type AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationSecretOptionsList =
  AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationSecretOptionsDetails[];
export const AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationSecretOptionsList =
  /*@__PURE__*/ S.Array(
    AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationSecretOptionsDetails,
  );
export interface AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationDetails {
  LogDriver?: string;
  Options?: { [key: string]: string | undefined };
  SecretOptions?: AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationSecretOptionsDetails[];
}
export const AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      LogDriver: S.optional(S.String),
      Options: S.optional(FieldMap),
      SecretOptions: S.optional(
        AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationSecretOptionsList,
      ),
    }),
  ).annotate({
    identifier:
      "AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationDetails>;
export interface AwsEcsTaskDefinitionContainerDefinitionsMountPointsDetails {
  ContainerPath?: string;
  ReadOnly?: boolean;
  SourceVolume?: string;
}
export const AwsEcsTaskDefinitionContainerDefinitionsMountPointsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ContainerPath: S.optional(S.String),
      ReadOnly: S.optional(S.Boolean),
      SourceVolume: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsEcsTaskDefinitionContainerDefinitionsMountPointsDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionContainerDefinitionsMountPointsDetails>;
export type AwsEcsTaskDefinitionContainerDefinitionsMountPointsList =
  AwsEcsTaskDefinitionContainerDefinitionsMountPointsDetails[];
export const AwsEcsTaskDefinitionContainerDefinitionsMountPointsList =
  /*@__PURE__*/ S.Array(
    AwsEcsTaskDefinitionContainerDefinitionsMountPointsDetails,
  );
export interface AwsEcsTaskDefinitionContainerDefinitionsPortMappingsDetails {
  ContainerPort?: number;
  HostPort?: number;
  Protocol?: string;
}
export const AwsEcsTaskDefinitionContainerDefinitionsPortMappingsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ContainerPort: S.optional(S.Number),
      HostPort: S.optional(S.Number),
      Protocol: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsEcsTaskDefinitionContainerDefinitionsPortMappingsDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionContainerDefinitionsPortMappingsDetails>;
export type AwsEcsTaskDefinitionContainerDefinitionsPortMappingsList =
  AwsEcsTaskDefinitionContainerDefinitionsPortMappingsDetails[];
export const AwsEcsTaskDefinitionContainerDefinitionsPortMappingsList =
  /*@__PURE__*/ S.Array(
    AwsEcsTaskDefinitionContainerDefinitionsPortMappingsDetails,
  );
export interface AwsEcsTaskDefinitionContainerDefinitionsRepositoryCredentialsDetails {
  CredentialsParameter?: string;
}
export const AwsEcsTaskDefinitionContainerDefinitionsRepositoryCredentialsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ CredentialsParameter: S.optional(S.String) }),
  ).annotate({
    identifier:
      "AwsEcsTaskDefinitionContainerDefinitionsRepositoryCredentialsDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionContainerDefinitionsRepositoryCredentialsDetails>;
export interface AwsEcsTaskDefinitionContainerDefinitionsResourceRequirementsDetails {
  Type?: string;
  Value?: string;
}
export const AwsEcsTaskDefinitionContainerDefinitionsResourceRequirementsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Type: S.optional(S.String), Value: S.optional(S.String) }),
  ).annotate({
    identifier:
      "AwsEcsTaskDefinitionContainerDefinitionsResourceRequirementsDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionContainerDefinitionsResourceRequirementsDetails>;
export type AwsEcsTaskDefinitionContainerDefinitionsResourceRequirementsList =
  AwsEcsTaskDefinitionContainerDefinitionsResourceRequirementsDetails[];
export const AwsEcsTaskDefinitionContainerDefinitionsResourceRequirementsList =
  /*@__PURE__*/ S.Array(
    AwsEcsTaskDefinitionContainerDefinitionsResourceRequirementsDetails,
  );
export interface AwsEcsTaskDefinitionContainerDefinitionsSecretsDetails {
  Name?: string;
  ValueFrom?: string;
}
export const AwsEcsTaskDefinitionContainerDefinitionsSecretsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Name: S.optional(S.String), ValueFrom: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsEcsTaskDefinitionContainerDefinitionsSecretsDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionContainerDefinitionsSecretsDetails>;
export type AwsEcsTaskDefinitionContainerDefinitionsSecretsList =
  AwsEcsTaskDefinitionContainerDefinitionsSecretsDetails[];
export const AwsEcsTaskDefinitionContainerDefinitionsSecretsList =
  /*@__PURE__*/ S.Array(AwsEcsTaskDefinitionContainerDefinitionsSecretsDetails);
export interface AwsEcsTaskDefinitionContainerDefinitionsSystemControlsDetails {
  Namespace?: string;
  Value?: string;
}
export const AwsEcsTaskDefinitionContainerDefinitionsSystemControlsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Namespace: S.optional(S.String), Value: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsEcsTaskDefinitionContainerDefinitionsSystemControlsDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionContainerDefinitionsSystemControlsDetails>;
export type AwsEcsTaskDefinitionContainerDefinitionsSystemControlsList =
  AwsEcsTaskDefinitionContainerDefinitionsSystemControlsDetails[];
export const AwsEcsTaskDefinitionContainerDefinitionsSystemControlsList =
  /*@__PURE__*/ S.Array(
    AwsEcsTaskDefinitionContainerDefinitionsSystemControlsDetails,
  );
export interface AwsEcsTaskDefinitionContainerDefinitionsUlimitsDetails {
  HardLimit?: number;
  Name?: string;
  SoftLimit?: number;
}
export const AwsEcsTaskDefinitionContainerDefinitionsUlimitsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      HardLimit: S.optional(S.Number),
      Name: S.optional(S.String),
      SoftLimit: S.optional(S.Number),
    }),
  ).annotate({
    identifier: "AwsEcsTaskDefinitionContainerDefinitionsUlimitsDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionContainerDefinitionsUlimitsDetails>;
export type AwsEcsTaskDefinitionContainerDefinitionsUlimitsList =
  AwsEcsTaskDefinitionContainerDefinitionsUlimitsDetails[];
export const AwsEcsTaskDefinitionContainerDefinitionsUlimitsList =
  /*@__PURE__*/ S.Array(AwsEcsTaskDefinitionContainerDefinitionsUlimitsDetails);
export interface AwsEcsTaskDefinitionContainerDefinitionsVolumesFromDetails {
  ReadOnly?: boolean;
  SourceContainer?: string;
}
export const AwsEcsTaskDefinitionContainerDefinitionsVolumesFromDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ReadOnly: S.optional(S.Boolean),
      SourceContainer: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsEcsTaskDefinitionContainerDefinitionsVolumesFromDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionContainerDefinitionsVolumesFromDetails>;
export type AwsEcsTaskDefinitionContainerDefinitionsVolumesFromList =
  AwsEcsTaskDefinitionContainerDefinitionsVolumesFromDetails[];
export const AwsEcsTaskDefinitionContainerDefinitionsVolumesFromList =
  /*@__PURE__*/ S.Array(
    AwsEcsTaskDefinitionContainerDefinitionsVolumesFromDetails,
  );
export interface AwsEcsTaskDefinitionContainerDefinitionsDetails {
  Command?: string[];
  Cpu?: number;
  DependsOn?: AwsEcsTaskDefinitionContainerDefinitionsDependsOnDetails[];
  DisableNetworking?: boolean;
  DnsSearchDomains?: string[];
  DnsServers?: string[];
  DockerLabels?: { [key: string]: string | undefined };
  DockerSecurityOptions?: string[];
  EntryPoint?: string[];
  Environment?: AwsEcsTaskDefinitionContainerDefinitionsEnvironmentDetails[];
  EnvironmentFiles?: AwsEcsTaskDefinitionContainerDefinitionsEnvironmentFilesDetails[];
  Essential?: boolean;
  ExtraHosts?: AwsEcsTaskDefinitionContainerDefinitionsExtraHostsDetails[];
  FirelensConfiguration?: AwsEcsTaskDefinitionContainerDefinitionsFirelensConfigurationDetails;
  HealthCheck?: AwsEcsTaskDefinitionContainerDefinitionsHealthCheckDetails;
  Hostname?: string;
  Image?: string;
  Interactive?: boolean;
  Links?: string[];
  LinuxParameters?: AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDetails;
  LogConfiguration?: AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationDetails;
  Memory?: number;
  MemoryReservation?: number;
  MountPoints?: AwsEcsTaskDefinitionContainerDefinitionsMountPointsDetails[];
  Name?: string;
  PortMappings?: AwsEcsTaskDefinitionContainerDefinitionsPortMappingsDetails[];
  Privileged?: boolean;
  PseudoTerminal?: boolean;
  ReadonlyRootFilesystem?: boolean;
  RepositoryCredentials?: AwsEcsTaskDefinitionContainerDefinitionsRepositoryCredentialsDetails;
  ResourceRequirements?: AwsEcsTaskDefinitionContainerDefinitionsResourceRequirementsDetails[];
  Secrets?: AwsEcsTaskDefinitionContainerDefinitionsSecretsDetails[];
  StartTimeout?: number;
  StopTimeout?: number;
  SystemControls?: AwsEcsTaskDefinitionContainerDefinitionsSystemControlsDetails[];
  Ulimits?: AwsEcsTaskDefinitionContainerDefinitionsUlimitsDetails[];
  User?: string;
  VolumesFrom?: AwsEcsTaskDefinitionContainerDefinitionsVolumesFromDetails[];
  WorkingDirectory?: string;
}
export const AwsEcsTaskDefinitionContainerDefinitionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Command: S.optional(NonEmptyStringList),
      Cpu: S.optional(S.Number),
      DependsOn: S.optional(
        AwsEcsTaskDefinitionContainerDefinitionsDependsOnList,
      ),
      DisableNetworking: S.optional(S.Boolean),
      DnsSearchDomains: S.optional(NonEmptyStringList),
      DnsServers: S.optional(NonEmptyStringList),
      DockerLabels: S.optional(FieldMap),
      DockerSecurityOptions: S.optional(NonEmptyStringList),
      EntryPoint: S.optional(NonEmptyStringList),
      Environment: S.optional(
        AwsEcsTaskDefinitionContainerDefinitionsEnvironmentList,
      ),
      EnvironmentFiles: S.optional(
        AwsEcsTaskDefinitionContainerDefinitionsEnvironmentFilesList,
      ),
      Essential: S.optional(S.Boolean),
      ExtraHosts: S.optional(
        AwsEcsTaskDefinitionContainerDefinitionsExtraHostsList,
      ),
      FirelensConfiguration: S.optional(
        AwsEcsTaskDefinitionContainerDefinitionsFirelensConfigurationDetails,
      ),
      HealthCheck: S.optional(
        AwsEcsTaskDefinitionContainerDefinitionsHealthCheckDetails,
      ),
      Hostname: S.optional(S.String),
      Image: S.optional(S.String),
      Interactive: S.optional(S.Boolean),
      Links: S.optional(NonEmptyStringList),
      LinuxParameters: S.optional(
        AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDetails,
      ),
      LogConfiguration: S.optional(
        AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationDetails,
      ),
      Memory: S.optional(S.Number),
      MemoryReservation: S.optional(S.Number),
      MountPoints: S.optional(
        AwsEcsTaskDefinitionContainerDefinitionsMountPointsList,
      ),
      Name: S.optional(S.String),
      PortMappings: S.optional(
        AwsEcsTaskDefinitionContainerDefinitionsPortMappingsList,
      ),
      Privileged: S.optional(S.Boolean),
      PseudoTerminal: S.optional(S.Boolean),
      ReadonlyRootFilesystem: S.optional(S.Boolean),
      RepositoryCredentials: S.optional(
        AwsEcsTaskDefinitionContainerDefinitionsRepositoryCredentialsDetails,
      ),
      ResourceRequirements: S.optional(
        AwsEcsTaskDefinitionContainerDefinitionsResourceRequirementsList,
      ),
      Secrets: S.optional(AwsEcsTaskDefinitionContainerDefinitionsSecretsList),
      StartTimeout: S.optional(S.Number),
      StopTimeout: S.optional(S.Number),
      SystemControls: S.optional(
        AwsEcsTaskDefinitionContainerDefinitionsSystemControlsList,
      ),
      Ulimits: S.optional(AwsEcsTaskDefinitionContainerDefinitionsUlimitsList),
      User: S.optional(S.String),
      VolumesFrom: S.optional(
        AwsEcsTaskDefinitionContainerDefinitionsVolumesFromList,
      ),
      WorkingDirectory: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsEcsTaskDefinitionContainerDefinitionsDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionContainerDefinitionsDetails>;
export type AwsEcsTaskDefinitionContainerDefinitionsList =
  AwsEcsTaskDefinitionContainerDefinitionsDetails[];
export const AwsEcsTaskDefinitionContainerDefinitionsList =
  /*@__PURE__*/ S.Array(AwsEcsTaskDefinitionContainerDefinitionsDetails);
export interface AwsEcsTaskDefinitionInferenceAcceleratorsDetails {
  DeviceName?: string;
  DeviceType?: string;
}
export const AwsEcsTaskDefinitionInferenceAcceleratorsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DeviceName: S.optional(S.String),
      DeviceType: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsEcsTaskDefinitionInferenceAcceleratorsDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionInferenceAcceleratorsDetails>;
export type AwsEcsTaskDefinitionInferenceAcceleratorsList =
  AwsEcsTaskDefinitionInferenceAcceleratorsDetails[];
export const AwsEcsTaskDefinitionInferenceAcceleratorsList =
  /*@__PURE__*/ S.Array(AwsEcsTaskDefinitionInferenceAcceleratorsDetails);
export interface AwsEcsTaskDefinitionPlacementConstraintsDetails {
  Expression?: string;
  Type?: string;
}
export const AwsEcsTaskDefinitionPlacementConstraintsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Expression: S.optional(S.String), Type: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsEcsTaskDefinitionPlacementConstraintsDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionPlacementConstraintsDetails>;
export type AwsEcsTaskDefinitionPlacementConstraintsList =
  AwsEcsTaskDefinitionPlacementConstraintsDetails[];
export const AwsEcsTaskDefinitionPlacementConstraintsList =
  /*@__PURE__*/ S.Array(AwsEcsTaskDefinitionPlacementConstraintsDetails);
export interface AwsEcsTaskDefinitionProxyConfigurationProxyConfigurationPropertiesDetails {
  Name?: string;
  Value?: string;
}
export const AwsEcsTaskDefinitionProxyConfigurationProxyConfigurationPropertiesDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
  ).annotate({
    identifier:
      "AwsEcsTaskDefinitionProxyConfigurationProxyConfigurationPropertiesDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionProxyConfigurationProxyConfigurationPropertiesDetails>;
export type AwsEcsTaskDefinitionProxyConfigurationProxyConfigurationPropertiesList =
  AwsEcsTaskDefinitionProxyConfigurationProxyConfigurationPropertiesDetails[];
export const AwsEcsTaskDefinitionProxyConfigurationProxyConfigurationPropertiesList =
  /*@__PURE__*/ S.Array(
    AwsEcsTaskDefinitionProxyConfigurationProxyConfigurationPropertiesDetails,
  );
export interface AwsEcsTaskDefinitionProxyConfigurationDetails {
  ContainerName?: string;
  ProxyConfigurationProperties?: AwsEcsTaskDefinitionProxyConfigurationProxyConfigurationPropertiesDetails[];
  Type?: string;
}
export const AwsEcsTaskDefinitionProxyConfigurationDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ContainerName: S.optional(S.String),
      ProxyConfigurationProperties: S.optional(
        AwsEcsTaskDefinitionProxyConfigurationProxyConfigurationPropertiesList,
      ),
      Type: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsEcsTaskDefinitionProxyConfigurationDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionProxyConfigurationDetails>;
export interface AwsEcsTaskDefinitionVolumesDockerVolumeConfigurationDetails {
  Autoprovision?: boolean;
  Driver?: string;
  DriverOpts?: { [key: string]: string | undefined };
  Labels?: { [key: string]: string | undefined };
  Scope?: string;
}
export const AwsEcsTaskDefinitionVolumesDockerVolumeConfigurationDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Autoprovision: S.optional(S.Boolean),
      Driver: S.optional(S.String),
      DriverOpts: S.optional(FieldMap),
      Labels: S.optional(FieldMap),
      Scope: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsEcsTaskDefinitionVolumesDockerVolumeConfigurationDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionVolumesDockerVolumeConfigurationDetails>;
export interface AwsEcsTaskDefinitionVolumesEfsVolumeConfigurationAuthorizationConfigDetails {
  AccessPointId?: string;
  Iam?: string;
}
export const AwsEcsTaskDefinitionVolumesEfsVolumeConfigurationAuthorizationConfigDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccessPointId: S.optional(S.String),
      Iam: S.optional(S.String),
    }),
  ).annotate({
    identifier:
      "AwsEcsTaskDefinitionVolumesEfsVolumeConfigurationAuthorizationConfigDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionVolumesEfsVolumeConfigurationAuthorizationConfigDetails>;
export interface AwsEcsTaskDefinitionVolumesEfsVolumeConfigurationDetails {
  AuthorizationConfig?: AwsEcsTaskDefinitionVolumesEfsVolumeConfigurationAuthorizationConfigDetails;
  FilesystemId?: string;
  RootDirectory?: string;
  TransitEncryption?: string;
  TransitEncryptionPort?: number;
}
export const AwsEcsTaskDefinitionVolumesEfsVolumeConfigurationDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AuthorizationConfig: S.optional(
        AwsEcsTaskDefinitionVolumesEfsVolumeConfigurationAuthorizationConfigDetails,
      ),
      FilesystemId: S.optional(S.String),
      RootDirectory: S.optional(S.String),
      TransitEncryption: S.optional(S.String),
      TransitEncryptionPort: S.optional(S.Number),
    }),
  ).annotate({
    identifier: "AwsEcsTaskDefinitionVolumesEfsVolumeConfigurationDetails",
  }) as any as S.Schema<AwsEcsTaskDefinitionVolumesEfsVolumeConfigurationDetails>;
export interface AwsEcsTaskDefinitionVolumesHostDetails {
  SourcePath?: string;
}
export const AwsEcsTaskDefinitionVolumesHostDetails = /*@__PURE__*/ S.suspend(
  () => S.Struct({ SourcePath: S.optional(S.String) }),
).annotate({
  identifier: "AwsEcsTaskDefinitionVolumesHostDetails",
}) as any as S.Schema<AwsEcsTaskDefinitionVolumesHostDetails>;
export interface AwsEcsTaskDefinitionVolumesDetails {
  DockerVolumeConfiguration?: AwsEcsTaskDefinitionVolumesDockerVolumeConfigurationDetails;
  EfsVolumeConfiguration?: AwsEcsTaskDefinitionVolumesEfsVolumeConfigurationDetails;
  Host?: AwsEcsTaskDefinitionVolumesHostDetails;
  Name?: string;
}
export const AwsEcsTaskDefinitionVolumesDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DockerVolumeConfiguration: S.optional(
      AwsEcsTaskDefinitionVolumesDockerVolumeConfigurationDetails,
    ),
    EfsVolumeConfiguration: S.optional(
      AwsEcsTaskDefinitionVolumesEfsVolumeConfigurationDetails,
    ),
    Host: S.optional(AwsEcsTaskDefinitionVolumesHostDetails),
    Name: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEcsTaskDefinitionVolumesDetails",
}) as any as S.Schema<AwsEcsTaskDefinitionVolumesDetails>;
export type AwsEcsTaskDefinitionVolumesList =
  AwsEcsTaskDefinitionVolumesDetails[];
export const AwsEcsTaskDefinitionVolumesList = /*@__PURE__*/ S.Array(
  AwsEcsTaskDefinitionVolumesDetails,
);
export interface AwsEcsTaskDefinitionDetails {
  ContainerDefinitions?: AwsEcsTaskDefinitionContainerDefinitionsDetails[];
  Cpu?: string;
  ExecutionRoleArn?: string;
  Family?: string;
  InferenceAccelerators?: AwsEcsTaskDefinitionInferenceAcceleratorsDetails[];
  IpcMode?: string;
  Memory?: string;
  NetworkMode?: string;
  PidMode?: string;
  PlacementConstraints?: AwsEcsTaskDefinitionPlacementConstraintsDetails[];
  ProxyConfiguration?: AwsEcsTaskDefinitionProxyConfigurationDetails;
  RequiresCompatibilities?: string[];
  TaskRoleArn?: string;
  Volumes?: AwsEcsTaskDefinitionVolumesDetails[];
  Status?: string;
}
export const AwsEcsTaskDefinitionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerDefinitions: S.optional(
      AwsEcsTaskDefinitionContainerDefinitionsList,
    ),
    Cpu: S.optional(S.String),
    ExecutionRoleArn: S.optional(S.String),
    Family: S.optional(S.String),
    InferenceAccelerators: S.optional(
      AwsEcsTaskDefinitionInferenceAcceleratorsList,
    ),
    IpcMode: S.optional(S.String),
    Memory: S.optional(S.String),
    NetworkMode: S.optional(S.String),
    PidMode: S.optional(S.String),
    PlacementConstraints: S.optional(
      AwsEcsTaskDefinitionPlacementConstraintsList,
    ),
    ProxyConfiguration: S.optional(
      AwsEcsTaskDefinitionProxyConfigurationDetails,
    ),
    RequiresCompatibilities: S.optional(NonEmptyStringList),
    TaskRoleArn: S.optional(S.String),
    Volumes: S.optional(AwsEcsTaskDefinitionVolumesList),
    Status: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEcsTaskDefinitionDetails",
}) as any as S.Schema<AwsEcsTaskDefinitionDetails>;
export interface VolumeMount {
  Name?: string;
  MountPath?: string;
}
export const VolumeMount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), MountPath: S.optional(S.String) }),
).annotate({ identifier: "VolumeMount" }) as any as S.Schema<VolumeMount>;
export type VolumeMountList = VolumeMount[];
export const VolumeMountList = /*@__PURE__*/ S.Array(VolumeMount);
export interface ContainerDetails {
  ContainerRuntime?: string;
  Name?: string;
  ImageId?: string;
  ImageName?: string;
  LaunchedAt?: string;
  VolumeMounts?: VolumeMount[];
  Privileged?: boolean;
}
export const ContainerDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerRuntime: S.optional(S.String),
    Name: S.optional(S.String),
    ImageId: S.optional(S.String),
    ImageName: S.optional(S.String),
    LaunchedAt: S.optional(S.String),
    VolumeMounts: S.optional(VolumeMountList),
    Privileged: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ContainerDetails",
}) as any as S.Schema<ContainerDetails>;
export interface AwsRdsEventSubscriptionDetails {
  CustSubscriptionId?: string;
  CustomerAwsId?: string;
  Enabled?: boolean;
  EventCategoriesList?: string[];
  EventSubscriptionArn?: string;
  SnsTopicArn?: string;
  SourceIdsList?: string[];
  SourceType?: string;
  Status?: string;
  SubscriptionCreationTime?: string;
}
export const AwsRdsEventSubscriptionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustSubscriptionId: S.optional(S.String),
    CustomerAwsId: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
    EventCategoriesList: S.optional(NonEmptyStringList),
    EventSubscriptionArn: S.optional(S.String),
    SnsTopicArn: S.optional(S.String),
    SourceIdsList: S.optional(NonEmptyStringList),
    SourceType: S.optional(S.String),
    Status: S.optional(S.String),
    SubscriptionCreationTime: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsRdsEventSubscriptionDetails",
}) as any as S.Schema<AwsRdsEventSubscriptionDetails>;
export interface AwsEcsServiceCapacityProviderStrategyDetails {
  Base?: number;
  CapacityProvider?: string;
  Weight?: number;
}
export const AwsEcsServiceCapacityProviderStrategyDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Base: S.optional(S.Number),
      CapacityProvider: S.optional(S.String),
      Weight: S.optional(S.Number),
    }),
  ).annotate({
    identifier: "AwsEcsServiceCapacityProviderStrategyDetails",
  }) as any as S.Schema<AwsEcsServiceCapacityProviderStrategyDetails>;
export type AwsEcsServiceCapacityProviderStrategyList =
  AwsEcsServiceCapacityProviderStrategyDetails[];
export const AwsEcsServiceCapacityProviderStrategyList = /*@__PURE__*/ S.Array(
  AwsEcsServiceCapacityProviderStrategyDetails,
);
export interface AwsEcsServiceDeploymentConfigurationDeploymentCircuitBreakerDetails {
  Enable?: boolean;
  Rollback?: boolean;
}
export const AwsEcsServiceDeploymentConfigurationDeploymentCircuitBreakerDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Enable: S.optional(S.Boolean),
      Rollback: S.optional(S.Boolean),
    }),
  ).annotate({
    identifier:
      "AwsEcsServiceDeploymentConfigurationDeploymentCircuitBreakerDetails",
  }) as any as S.Schema<AwsEcsServiceDeploymentConfigurationDeploymentCircuitBreakerDetails>;
export interface AwsEcsServiceDeploymentConfigurationDetails {
  DeploymentCircuitBreaker?: AwsEcsServiceDeploymentConfigurationDeploymentCircuitBreakerDetails;
  MaximumPercent?: number;
  MinimumHealthyPercent?: number;
}
export const AwsEcsServiceDeploymentConfigurationDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DeploymentCircuitBreaker: S.optional(
        AwsEcsServiceDeploymentConfigurationDeploymentCircuitBreakerDetails,
      ),
      MaximumPercent: S.optional(S.Number),
      MinimumHealthyPercent: S.optional(S.Number),
    }),
  ).annotate({
    identifier: "AwsEcsServiceDeploymentConfigurationDetails",
  }) as any as S.Schema<AwsEcsServiceDeploymentConfigurationDetails>;
export interface AwsEcsServiceDeploymentControllerDetails {
  Type?: string;
}
export const AwsEcsServiceDeploymentControllerDetails = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Type: S.optional(S.String) }),
).annotate({
  identifier: "AwsEcsServiceDeploymentControllerDetails",
}) as any as S.Schema<AwsEcsServiceDeploymentControllerDetails>;
export interface AwsEcsServiceLoadBalancersDetails {
  ContainerName?: string;
  ContainerPort?: number;
  LoadBalancerName?: string;
  TargetGroupArn?: string;
}
export const AwsEcsServiceLoadBalancersDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerName: S.optional(S.String),
    ContainerPort: S.optional(S.Number),
    LoadBalancerName: S.optional(S.String),
    TargetGroupArn: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEcsServiceLoadBalancersDetails",
}) as any as S.Schema<AwsEcsServiceLoadBalancersDetails>;
export type AwsEcsServiceLoadBalancersList =
  AwsEcsServiceLoadBalancersDetails[];
export const AwsEcsServiceLoadBalancersList = /*@__PURE__*/ S.Array(
  AwsEcsServiceLoadBalancersDetails,
);
export interface AwsEcsServiceNetworkConfigurationAwsVpcConfigurationDetails {
  AssignPublicIp?: string;
  SecurityGroups?: string[];
  Subnets?: string[];
}
export const AwsEcsServiceNetworkConfigurationAwsVpcConfigurationDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AssignPublicIp: S.optional(S.String),
      SecurityGroups: S.optional(NonEmptyStringList),
      Subnets: S.optional(NonEmptyStringList),
    }),
  ).annotate({
    identifier: "AwsEcsServiceNetworkConfigurationAwsVpcConfigurationDetails",
  }) as any as S.Schema<AwsEcsServiceNetworkConfigurationAwsVpcConfigurationDetails>;
export interface AwsEcsServiceNetworkConfigurationDetails {
  AwsVpcConfiguration?: AwsEcsServiceNetworkConfigurationAwsVpcConfigurationDetails;
}
export const AwsEcsServiceNetworkConfigurationDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AwsVpcConfiguration: S.optional(
        AwsEcsServiceNetworkConfigurationAwsVpcConfigurationDetails,
      ),
    }),
).annotate({
  identifier: "AwsEcsServiceNetworkConfigurationDetails",
}) as any as S.Schema<AwsEcsServiceNetworkConfigurationDetails>;
export interface AwsEcsServicePlacementConstraintsDetails {
  Expression?: string;
  Type?: string;
}
export const AwsEcsServicePlacementConstraintsDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Expression: S.optional(S.String), Type: S.optional(S.String) }),
).annotate({
  identifier: "AwsEcsServicePlacementConstraintsDetails",
}) as any as S.Schema<AwsEcsServicePlacementConstraintsDetails>;
export type AwsEcsServicePlacementConstraintsList =
  AwsEcsServicePlacementConstraintsDetails[];
export const AwsEcsServicePlacementConstraintsList = /*@__PURE__*/ S.Array(
  AwsEcsServicePlacementConstraintsDetails,
);
export interface AwsEcsServicePlacementStrategiesDetails {
  Field?: string;
  Type?: string;
}
export const AwsEcsServicePlacementStrategiesDetails = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Field: S.optional(S.String), Type: S.optional(S.String) }),
).annotate({
  identifier: "AwsEcsServicePlacementStrategiesDetails",
}) as any as S.Schema<AwsEcsServicePlacementStrategiesDetails>;
export type AwsEcsServicePlacementStrategiesList =
  AwsEcsServicePlacementStrategiesDetails[];
export const AwsEcsServicePlacementStrategiesList = /*@__PURE__*/ S.Array(
  AwsEcsServicePlacementStrategiesDetails,
);
export interface AwsEcsServiceServiceRegistriesDetails {
  ContainerName?: string;
  ContainerPort?: number;
  Port?: number;
  RegistryArn?: string;
}
export const AwsEcsServiceServiceRegistriesDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ContainerName: S.optional(S.String),
      ContainerPort: S.optional(S.Number),
      Port: S.optional(S.Number),
      RegistryArn: S.optional(S.String),
    }),
).annotate({
  identifier: "AwsEcsServiceServiceRegistriesDetails",
}) as any as S.Schema<AwsEcsServiceServiceRegistriesDetails>;
export type AwsEcsServiceServiceRegistriesList =
  AwsEcsServiceServiceRegistriesDetails[];
export const AwsEcsServiceServiceRegistriesList = /*@__PURE__*/ S.Array(
  AwsEcsServiceServiceRegistriesDetails,
);
export interface AwsEcsServiceDetails {
  CapacityProviderStrategy?: AwsEcsServiceCapacityProviderStrategyDetails[];
  Cluster?: string;
  DeploymentConfiguration?: AwsEcsServiceDeploymentConfigurationDetails;
  DeploymentController?: AwsEcsServiceDeploymentControllerDetails;
  DesiredCount?: number;
  EnableEcsManagedTags?: boolean;
  EnableExecuteCommand?: boolean;
  HealthCheckGracePeriodSeconds?: number;
  LaunchType?: string;
  LoadBalancers?: AwsEcsServiceLoadBalancersDetails[];
  Name?: string;
  NetworkConfiguration?: AwsEcsServiceNetworkConfigurationDetails;
  PlacementConstraints?: AwsEcsServicePlacementConstraintsDetails[];
  PlacementStrategies?: AwsEcsServicePlacementStrategiesDetails[];
  PlatformVersion?: string;
  PropagateTags?: string;
  Role?: string;
  SchedulingStrategy?: string;
  ServiceArn?: string;
  ServiceName?: string;
  ServiceRegistries?: AwsEcsServiceServiceRegistriesDetails[];
  TaskDefinition?: string;
}
export const AwsEcsServiceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CapacityProviderStrategy: S.optional(
      AwsEcsServiceCapacityProviderStrategyList,
    ),
    Cluster: S.optional(S.String),
    DeploymentConfiguration: S.optional(
      AwsEcsServiceDeploymentConfigurationDetails,
    ),
    DeploymentController: S.optional(AwsEcsServiceDeploymentControllerDetails),
    DesiredCount: S.optional(S.Number),
    EnableEcsManagedTags: S.optional(S.Boolean),
    EnableExecuteCommand: S.optional(S.Boolean),
    HealthCheckGracePeriodSeconds: S.optional(S.Number),
    LaunchType: S.optional(S.String),
    LoadBalancers: S.optional(AwsEcsServiceLoadBalancersList),
    Name: S.optional(S.String),
    NetworkConfiguration: S.optional(AwsEcsServiceNetworkConfigurationDetails),
    PlacementConstraints: S.optional(AwsEcsServicePlacementConstraintsList),
    PlacementStrategies: S.optional(AwsEcsServicePlacementStrategiesList),
    PlatformVersion: S.optional(S.String),
    PropagateTags: S.optional(S.String),
    Role: S.optional(S.String),
    SchedulingStrategy: S.optional(S.String),
    ServiceArn: S.optional(S.String),
    ServiceName: S.optional(S.String),
    ServiceRegistries: S.optional(AwsEcsServiceServiceRegistriesList),
    TaskDefinition: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEcsServiceDetails",
}) as any as S.Schema<AwsEcsServiceDetails>;
export interface AwsAutoScalingLaunchConfigurationBlockDeviceMappingsEbsDetails {
  DeleteOnTermination?: boolean;
  Encrypted?: boolean;
  Iops?: number;
  SnapshotId?: string;
  VolumeSize?: number;
  VolumeType?: string;
}
export const AwsAutoScalingLaunchConfigurationBlockDeviceMappingsEbsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DeleteOnTermination: S.optional(S.Boolean),
      Encrypted: S.optional(S.Boolean),
      Iops: S.optional(S.Number),
      SnapshotId: S.optional(S.String),
      VolumeSize: S.optional(S.Number),
      VolumeType: S.optional(S.String),
    }),
  ).annotate({
    identifier:
      "AwsAutoScalingLaunchConfigurationBlockDeviceMappingsEbsDetails",
  }) as any as S.Schema<AwsAutoScalingLaunchConfigurationBlockDeviceMappingsEbsDetails>;
export interface AwsAutoScalingLaunchConfigurationBlockDeviceMappingsDetails {
  DeviceName?: string;
  Ebs?: AwsAutoScalingLaunchConfigurationBlockDeviceMappingsEbsDetails;
  NoDevice?: boolean;
  VirtualName?: string;
}
export const AwsAutoScalingLaunchConfigurationBlockDeviceMappingsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DeviceName: S.optional(S.String),
      Ebs: S.optional(
        AwsAutoScalingLaunchConfigurationBlockDeviceMappingsEbsDetails,
      ),
      NoDevice: S.optional(S.Boolean),
      VirtualName: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsAutoScalingLaunchConfigurationBlockDeviceMappingsDetails",
  }) as any as S.Schema<AwsAutoScalingLaunchConfigurationBlockDeviceMappingsDetails>;
export type AwsAutoScalingLaunchConfigurationBlockDeviceMappingsList =
  AwsAutoScalingLaunchConfigurationBlockDeviceMappingsDetails[];
export const AwsAutoScalingLaunchConfigurationBlockDeviceMappingsList =
  /*@__PURE__*/ S.Array(
    AwsAutoScalingLaunchConfigurationBlockDeviceMappingsDetails,
  );
export interface AwsAutoScalingLaunchConfigurationInstanceMonitoringDetails {
  Enabled?: boolean;
}
export const AwsAutoScalingLaunchConfigurationInstanceMonitoringDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Enabled: S.optional(S.Boolean) }),
  ).annotate({
    identifier: "AwsAutoScalingLaunchConfigurationInstanceMonitoringDetails",
  }) as any as S.Schema<AwsAutoScalingLaunchConfigurationInstanceMonitoringDetails>;
export interface AwsAutoScalingLaunchConfigurationMetadataOptions {
  HttpEndpoint?: string;
  HttpPutResponseHopLimit?: number;
  HttpTokens?: string;
}
export const AwsAutoScalingLaunchConfigurationMetadataOptions =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      HttpEndpoint: S.optional(S.String),
      HttpPutResponseHopLimit: S.optional(S.Number),
      HttpTokens: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsAutoScalingLaunchConfigurationMetadataOptions",
  }) as any as S.Schema<AwsAutoScalingLaunchConfigurationMetadataOptions>;
export interface AwsAutoScalingLaunchConfigurationDetails {
  AssociatePublicIpAddress?: boolean;
  BlockDeviceMappings?: AwsAutoScalingLaunchConfigurationBlockDeviceMappingsDetails[];
  ClassicLinkVpcId?: string;
  ClassicLinkVpcSecurityGroups?: string[];
  CreatedTime?: string;
  EbsOptimized?: boolean;
  IamInstanceProfile?: string;
  ImageId?: string;
  InstanceMonitoring?: AwsAutoScalingLaunchConfigurationInstanceMonitoringDetails;
  InstanceType?: string;
  KernelId?: string;
  KeyName?: string;
  LaunchConfigurationName?: string;
  PlacementTenancy?: string;
  RamdiskId?: string;
  SecurityGroups?: string[];
  SpotPrice?: string;
  UserData?: string;
  MetadataOptions?: AwsAutoScalingLaunchConfigurationMetadataOptions;
}
export const AwsAutoScalingLaunchConfigurationDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AssociatePublicIpAddress: S.optional(S.Boolean),
      BlockDeviceMappings: S.optional(
        AwsAutoScalingLaunchConfigurationBlockDeviceMappingsList,
      ),
      ClassicLinkVpcId: S.optional(S.String),
      ClassicLinkVpcSecurityGroups: S.optional(NonEmptyStringList),
      CreatedTime: S.optional(S.String),
      EbsOptimized: S.optional(S.Boolean),
      IamInstanceProfile: S.optional(S.String),
      ImageId: S.optional(S.String),
      InstanceMonitoring: S.optional(
        AwsAutoScalingLaunchConfigurationInstanceMonitoringDetails,
      ),
      InstanceType: S.optional(S.String),
      KernelId: S.optional(S.String),
      KeyName: S.optional(S.String),
      LaunchConfigurationName: S.optional(S.String),
      PlacementTenancy: S.optional(S.String),
      RamdiskId: S.optional(S.String),
      SecurityGroups: S.optional(NonEmptyStringList),
      SpotPrice: S.optional(S.String),
      UserData: S.optional(S.String),
      MetadataOptions: S.optional(
        AwsAutoScalingLaunchConfigurationMetadataOptions,
      ),
    }),
).annotate({
  identifier: "AwsAutoScalingLaunchConfigurationDetails",
}) as any as S.Schema<AwsAutoScalingLaunchConfigurationDetails>;
export interface AwsEc2VpnConnectionVgwTelemetryDetails {
  AcceptedRouteCount?: number;
  CertificateArn?: string;
  LastStatusChange?: string;
  OutsideIpAddress?: string;
  Status?: string;
  StatusMessage?: string;
}
export const AwsEc2VpnConnectionVgwTelemetryDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AcceptedRouteCount: S.optional(S.Number),
      CertificateArn: S.optional(S.String),
      LastStatusChange: S.optional(S.String),
      OutsideIpAddress: S.optional(S.String),
      Status: S.optional(S.String),
      StatusMessage: S.optional(S.String),
    }),
).annotate({
  identifier: "AwsEc2VpnConnectionVgwTelemetryDetails",
}) as any as S.Schema<AwsEc2VpnConnectionVgwTelemetryDetails>;
export type AwsEc2VpnConnectionVgwTelemetryList =
  AwsEc2VpnConnectionVgwTelemetryDetails[];
export const AwsEc2VpnConnectionVgwTelemetryList = /*@__PURE__*/ S.Array(
  AwsEc2VpnConnectionVgwTelemetryDetails,
);
export interface AwsEc2VpnConnectionOptionsTunnelOptionsDetails {
  DpdTimeoutSeconds?: number;
  IkeVersions?: string[];
  OutsideIpAddress?: string;
  Phase1DhGroupNumbers?: number[];
  Phase1EncryptionAlgorithms?: string[];
  Phase1IntegrityAlgorithms?: string[];
  Phase1LifetimeSeconds?: number;
  Phase2DhGroupNumbers?: number[];
  Phase2EncryptionAlgorithms?: string[];
  Phase2IntegrityAlgorithms?: string[];
  Phase2LifetimeSeconds?: number;
  PreSharedKey?: string;
  RekeyFuzzPercentage?: number;
  RekeyMarginTimeSeconds?: number;
  ReplayWindowSize?: number;
  TunnelInsideCidr?: string;
}
export const AwsEc2VpnConnectionOptionsTunnelOptionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DpdTimeoutSeconds: S.optional(S.Number),
      IkeVersions: S.optional(NonEmptyStringList),
      OutsideIpAddress: S.optional(S.String),
      Phase1DhGroupNumbers: S.optional(IntegerList),
      Phase1EncryptionAlgorithms: S.optional(NonEmptyStringList),
      Phase1IntegrityAlgorithms: S.optional(NonEmptyStringList),
      Phase1LifetimeSeconds: S.optional(S.Number),
      Phase2DhGroupNumbers: S.optional(IntegerList),
      Phase2EncryptionAlgorithms: S.optional(NonEmptyStringList),
      Phase2IntegrityAlgorithms: S.optional(NonEmptyStringList),
      Phase2LifetimeSeconds: S.optional(S.Number),
      PreSharedKey: S.optional(S.String),
      RekeyFuzzPercentage: S.optional(S.Number),
      RekeyMarginTimeSeconds: S.optional(S.Number),
      ReplayWindowSize: S.optional(S.Number),
      TunnelInsideCidr: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsEc2VpnConnectionOptionsTunnelOptionsDetails",
  }) as any as S.Schema<AwsEc2VpnConnectionOptionsTunnelOptionsDetails>;
export type AwsEc2VpnConnectionOptionsTunnelOptionsList =
  AwsEc2VpnConnectionOptionsTunnelOptionsDetails[];
export const AwsEc2VpnConnectionOptionsTunnelOptionsList =
  /*@__PURE__*/ S.Array(AwsEc2VpnConnectionOptionsTunnelOptionsDetails);
export interface AwsEc2VpnConnectionOptionsDetails {
  StaticRoutesOnly?: boolean;
  TunnelOptions?: AwsEc2VpnConnectionOptionsTunnelOptionsDetails[];
}
export const AwsEc2VpnConnectionOptionsDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StaticRoutesOnly: S.optional(S.Boolean),
    TunnelOptions: S.optional(AwsEc2VpnConnectionOptionsTunnelOptionsList),
  }),
).annotate({
  identifier: "AwsEc2VpnConnectionOptionsDetails",
}) as any as S.Schema<AwsEc2VpnConnectionOptionsDetails>;
export interface AwsEc2VpnConnectionRoutesDetails {
  DestinationCidrBlock?: string;
  State?: string;
}
export const AwsEc2VpnConnectionRoutesDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DestinationCidrBlock: S.optional(S.String),
    State: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEc2VpnConnectionRoutesDetails",
}) as any as S.Schema<AwsEc2VpnConnectionRoutesDetails>;
export type AwsEc2VpnConnectionRoutesList = AwsEc2VpnConnectionRoutesDetails[];
export const AwsEc2VpnConnectionRoutesList = /*@__PURE__*/ S.Array(
  AwsEc2VpnConnectionRoutesDetails,
);
export interface AwsEc2VpnConnectionDetails {
  VpnConnectionId?: string;
  State?: string;
  CustomerGatewayId?: string;
  CustomerGatewayConfiguration?: string;
  Type?: string;
  VpnGatewayId?: string;
  Category?: string;
  VgwTelemetry?: AwsEc2VpnConnectionVgwTelemetryDetails[];
  Options?: AwsEc2VpnConnectionOptionsDetails;
  Routes?: AwsEc2VpnConnectionRoutesDetails[];
  TransitGatewayId?: string;
}
export const AwsEc2VpnConnectionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpnConnectionId: S.optional(S.String),
    State: S.optional(S.String),
    CustomerGatewayId: S.optional(S.String),
    CustomerGatewayConfiguration: S.optional(S.String),
    Type: S.optional(S.String),
    VpnGatewayId: S.optional(S.String),
    Category: S.optional(S.String),
    VgwTelemetry: S.optional(AwsEc2VpnConnectionVgwTelemetryList),
    Options: S.optional(AwsEc2VpnConnectionOptionsDetails),
    Routes: S.optional(AwsEc2VpnConnectionRoutesList),
    TransitGatewayId: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEc2VpnConnectionDetails",
}) as any as S.Schema<AwsEc2VpnConnectionDetails>;
export interface AwsEcrContainerImageDetails {
  RegistryId?: string;
  RepositoryName?: string;
  Architecture?: string;
  ImageDigest?: string;
  ImageTags?: string[];
  ImagePublishedAt?: string;
}
export const AwsEcrContainerImageDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistryId: S.optional(S.String),
    RepositoryName: S.optional(S.String),
    Architecture: S.optional(S.String),
    ImageDigest: S.optional(S.String),
    ImageTags: S.optional(NonEmptyStringList),
    ImagePublishedAt: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEcrContainerImageDetails",
}) as any as S.Schema<AwsEcrContainerImageDetails>;
export interface AwsOpenSearchServiceDomainEncryptionAtRestOptionsDetails {
  Enabled?: boolean;
  KmsKeyId?: string;
}
export const AwsOpenSearchServiceDomainEncryptionAtRestOptionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Enabled: S.optional(S.Boolean),
      KmsKeyId: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsOpenSearchServiceDomainEncryptionAtRestOptionsDetails",
  }) as any as S.Schema<AwsOpenSearchServiceDomainEncryptionAtRestOptionsDetails>;
export interface AwsOpenSearchServiceDomainNodeToNodeEncryptionOptionsDetails {
  Enabled?: boolean;
}
export const AwsOpenSearchServiceDomainNodeToNodeEncryptionOptionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Enabled: S.optional(S.Boolean) }),
  ).annotate({
    identifier: "AwsOpenSearchServiceDomainNodeToNodeEncryptionOptionsDetails",
  }) as any as S.Schema<AwsOpenSearchServiceDomainNodeToNodeEncryptionOptionsDetails>;
export interface AwsOpenSearchServiceDomainServiceSoftwareOptionsDetails {
  AutomatedUpdateDate?: string;
  Cancellable?: boolean;
  CurrentVersion?: string;
  Description?: string;
  NewVersion?: string;
  UpdateAvailable?: boolean;
  UpdateStatus?: string;
  OptionalDeployment?: boolean;
}
export const AwsOpenSearchServiceDomainServiceSoftwareOptionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AutomatedUpdateDate: S.optional(S.String),
      Cancellable: S.optional(S.Boolean),
      CurrentVersion: S.optional(S.String),
      Description: S.optional(S.String),
      NewVersion: S.optional(S.String),
      UpdateAvailable: S.optional(S.Boolean),
      UpdateStatus: S.optional(S.String),
      OptionalDeployment: S.optional(S.Boolean),
    }),
  ).annotate({
    identifier: "AwsOpenSearchServiceDomainServiceSoftwareOptionsDetails",
  }) as any as S.Schema<AwsOpenSearchServiceDomainServiceSoftwareOptionsDetails>;
export interface AwsOpenSearchServiceDomainClusterConfigZoneAwarenessConfigDetails {
  AvailabilityZoneCount?: number;
}
export const AwsOpenSearchServiceDomainClusterConfigZoneAwarenessConfigDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ AvailabilityZoneCount: S.optional(S.Number) }),
  ).annotate({
    identifier:
      "AwsOpenSearchServiceDomainClusterConfigZoneAwarenessConfigDetails",
  }) as any as S.Schema<AwsOpenSearchServiceDomainClusterConfigZoneAwarenessConfigDetails>;
export interface AwsOpenSearchServiceDomainClusterConfigDetails {
  InstanceCount?: number;
  WarmEnabled?: boolean;
  WarmCount?: number;
  DedicatedMasterEnabled?: boolean;
  ZoneAwarenessConfig?: AwsOpenSearchServiceDomainClusterConfigZoneAwarenessConfigDetails;
  DedicatedMasterCount?: number;
  InstanceType?: string;
  WarmType?: string;
  ZoneAwarenessEnabled?: boolean;
  DedicatedMasterType?: string;
}
export const AwsOpenSearchServiceDomainClusterConfigDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      InstanceCount: S.optional(S.Number),
      WarmEnabled: S.optional(S.Boolean),
      WarmCount: S.optional(S.Number),
      DedicatedMasterEnabled: S.optional(S.Boolean),
      ZoneAwarenessConfig: S.optional(
        AwsOpenSearchServiceDomainClusterConfigZoneAwarenessConfigDetails,
      ),
      DedicatedMasterCount: S.optional(S.Number),
      InstanceType: S.optional(S.String),
      WarmType: S.optional(S.String),
      ZoneAwarenessEnabled: S.optional(S.Boolean),
      DedicatedMasterType: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsOpenSearchServiceDomainClusterConfigDetails",
  }) as any as S.Schema<AwsOpenSearchServiceDomainClusterConfigDetails>;
export interface AwsOpenSearchServiceDomainDomainEndpointOptionsDetails {
  CustomEndpointCertificateArn?: string;
  CustomEndpointEnabled?: boolean;
  EnforceHTTPS?: boolean;
  CustomEndpoint?: string;
  TLSSecurityPolicy?: string;
}
export const AwsOpenSearchServiceDomainDomainEndpointOptionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CustomEndpointCertificateArn: S.optional(S.String),
      CustomEndpointEnabled: S.optional(S.Boolean),
      EnforceHTTPS: S.optional(S.Boolean),
      CustomEndpoint: S.optional(S.String),
      TLSSecurityPolicy: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsOpenSearchServiceDomainDomainEndpointOptionsDetails",
  }) as any as S.Schema<AwsOpenSearchServiceDomainDomainEndpointOptionsDetails>;
export interface AwsOpenSearchServiceDomainVpcOptionsDetails {
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
}
export const AwsOpenSearchServiceDomainVpcOptionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      SecurityGroupIds: S.optional(NonEmptyStringList),
      SubnetIds: S.optional(NonEmptyStringList),
    }),
  ).annotate({
    identifier: "AwsOpenSearchServiceDomainVpcOptionsDetails",
  }) as any as S.Schema<AwsOpenSearchServiceDomainVpcOptionsDetails>;
export interface AwsOpenSearchServiceDomainLogPublishingOption {
  CloudWatchLogsLogGroupArn?: string;
  Enabled?: boolean;
}
export const AwsOpenSearchServiceDomainLogPublishingOption =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CloudWatchLogsLogGroupArn: S.optional(S.String),
      Enabled: S.optional(S.Boolean),
    }),
  ).annotate({
    identifier: "AwsOpenSearchServiceDomainLogPublishingOption",
  }) as any as S.Schema<AwsOpenSearchServiceDomainLogPublishingOption>;
export interface AwsOpenSearchServiceDomainLogPublishingOptionsDetails {
  IndexSlowLogs?: AwsOpenSearchServiceDomainLogPublishingOption;
  SearchSlowLogs?: AwsOpenSearchServiceDomainLogPublishingOption;
  AuditLogs?: AwsOpenSearchServiceDomainLogPublishingOption;
}
export const AwsOpenSearchServiceDomainLogPublishingOptionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      IndexSlowLogs: S.optional(AwsOpenSearchServiceDomainLogPublishingOption),
      SearchSlowLogs: S.optional(AwsOpenSearchServiceDomainLogPublishingOption),
      AuditLogs: S.optional(AwsOpenSearchServiceDomainLogPublishingOption),
    }),
  ).annotate({
    identifier: "AwsOpenSearchServiceDomainLogPublishingOptionsDetails",
  }) as any as S.Schema<AwsOpenSearchServiceDomainLogPublishingOptionsDetails>;
export interface AwsOpenSearchServiceDomainMasterUserOptionsDetails {
  MasterUserArn?: string;
  MasterUserName?: string;
  MasterUserPassword?: string;
}
export const AwsOpenSearchServiceDomainMasterUserOptionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      MasterUserArn: S.optional(S.String),
      MasterUserName: S.optional(S.String),
      MasterUserPassword: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsOpenSearchServiceDomainMasterUserOptionsDetails",
  }) as any as S.Schema<AwsOpenSearchServiceDomainMasterUserOptionsDetails>;
export interface AwsOpenSearchServiceDomainAdvancedSecurityOptionsDetails {
  Enabled?: boolean;
  InternalUserDatabaseEnabled?: boolean;
  MasterUserOptions?: AwsOpenSearchServiceDomainMasterUserOptionsDetails;
}
export const AwsOpenSearchServiceDomainAdvancedSecurityOptionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Enabled: S.optional(S.Boolean),
      InternalUserDatabaseEnabled: S.optional(S.Boolean),
      MasterUserOptions: S.optional(
        AwsOpenSearchServiceDomainMasterUserOptionsDetails,
      ),
    }),
  ).annotate({
    identifier: "AwsOpenSearchServiceDomainAdvancedSecurityOptionsDetails",
  }) as any as S.Schema<AwsOpenSearchServiceDomainAdvancedSecurityOptionsDetails>;
export interface AwsOpenSearchServiceDomainDetails {
  Arn?: string;
  AccessPolicies?: string;
  DomainName?: string;
  Id?: string;
  DomainEndpoint?: string;
  EngineVersion?: string;
  EncryptionAtRestOptions?: AwsOpenSearchServiceDomainEncryptionAtRestOptionsDetails;
  NodeToNodeEncryptionOptions?: AwsOpenSearchServiceDomainNodeToNodeEncryptionOptionsDetails;
  ServiceSoftwareOptions?: AwsOpenSearchServiceDomainServiceSoftwareOptionsDetails;
  ClusterConfig?: AwsOpenSearchServiceDomainClusterConfigDetails;
  DomainEndpointOptions?: AwsOpenSearchServiceDomainDomainEndpointOptionsDetails;
  VpcOptions?: AwsOpenSearchServiceDomainVpcOptionsDetails;
  LogPublishingOptions?: AwsOpenSearchServiceDomainLogPublishingOptionsDetails;
  DomainEndpoints?: { [key: string]: string | undefined };
  AdvancedSecurityOptions?: AwsOpenSearchServiceDomainAdvancedSecurityOptionsDetails;
}
export const AwsOpenSearchServiceDomainDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AccessPolicies: S.optional(S.String),
    DomainName: S.optional(S.String),
    Id: S.optional(S.String),
    DomainEndpoint: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    EncryptionAtRestOptions: S.optional(
      AwsOpenSearchServiceDomainEncryptionAtRestOptionsDetails,
    ),
    NodeToNodeEncryptionOptions: S.optional(
      AwsOpenSearchServiceDomainNodeToNodeEncryptionOptionsDetails,
    ),
    ServiceSoftwareOptions: S.optional(
      AwsOpenSearchServiceDomainServiceSoftwareOptionsDetails,
    ),
    ClusterConfig: S.optional(AwsOpenSearchServiceDomainClusterConfigDetails),
    DomainEndpointOptions: S.optional(
      AwsOpenSearchServiceDomainDomainEndpointOptionsDetails,
    ),
    VpcOptions: S.optional(AwsOpenSearchServiceDomainVpcOptionsDetails),
    LogPublishingOptions: S.optional(
      AwsOpenSearchServiceDomainLogPublishingOptionsDetails,
    ),
    DomainEndpoints: S.optional(FieldMap),
    AdvancedSecurityOptions: S.optional(
      AwsOpenSearchServiceDomainAdvancedSecurityOptionsDetails,
    ),
  }),
).annotate({
  identifier: "AwsOpenSearchServiceDomainDetails",
}) as any as S.Schema<AwsOpenSearchServiceDomainDetails>;
export interface AwsEc2VpcEndpointServiceServiceTypeDetails {
  ServiceType?: string;
}
export const AwsEc2VpcEndpointServiceServiceTypeDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ServiceType: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsEc2VpcEndpointServiceServiceTypeDetails",
  }) as any as S.Schema<AwsEc2VpcEndpointServiceServiceTypeDetails>;
export type AwsEc2VpcEndpointServiceServiceTypeList =
  AwsEc2VpcEndpointServiceServiceTypeDetails[];
export const AwsEc2VpcEndpointServiceServiceTypeList = /*@__PURE__*/ S.Array(
  AwsEc2VpcEndpointServiceServiceTypeDetails,
);
export interface AwsEc2VpcEndpointServiceDetails {
  AcceptanceRequired?: boolean;
  AvailabilityZones?: string[];
  BaseEndpointDnsNames?: string[];
  ManagesVpcEndpoints?: boolean;
  GatewayLoadBalancerArns?: string[];
  NetworkLoadBalancerArns?: string[];
  PrivateDnsName?: string;
  ServiceId?: string;
  ServiceName?: string;
  ServiceState?: string;
  ServiceType?: AwsEc2VpcEndpointServiceServiceTypeDetails[];
}
export const AwsEc2VpcEndpointServiceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptanceRequired: S.optional(S.Boolean),
    AvailabilityZones: S.optional(NonEmptyStringList),
    BaseEndpointDnsNames: S.optional(NonEmptyStringList),
    ManagesVpcEndpoints: S.optional(S.Boolean),
    GatewayLoadBalancerArns: S.optional(NonEmptyStringList),
    NetworkLoadBalancerArns: S.optional(NonEmptyStringList),
    PrivateDnsName: S.optional(S.String),
    ServiceId: S.optional(S.String),
    ServiceName: S.optional(S.String),
    ServiceState: S.optional(S.String),
    ServiceType: S.optional(AwsEc2VpcEndpointServiceServiceTypeList),
  }),
).annotate({
  identifier: "AwsEc2VpcEndpointServiceDetails",
}) as any as S.Schema<AwsEc2VpcEndpointServiceDetails>;
export interface AwsXrayEncryptionConfigDetails {
  KeyId?: string;
  Status?: string;
  Type?: string;
}
export const AwsXrayEncryptionConfigDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KeyId: S.optional(S.String),
    Status: S.optional(S.String),
    Type: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsXrayEncryptionConfigDetails",
}) as any as S.Schema<AwsXrayEncryptionConfigDetails>;
export interface AwsWafRateBasedRuleMatchPredicate {
  DataId?: string;
  Negated?: boolean;
  Type?: string;
}
export const AwsWafRateBasedRuleMatchPredicate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataId: S.optional(S.String),
    Negated: S.optional(S.Boolean),
    Type: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsWafRateBasedRuleMatchPredicate",
}) as any as S.Schema<AwsWafRateBasedRuleMatchPredicate>;
export type AwsWafRateBasedRuleMatchPredicateList =
  AwsWafRateBasedRuleMatchPredicate[];
export const AwsWafRateBasedRuleMatchPredicateList = /*@__PURE__*/ S.Array(
  AwsWafRateBasedRuleMatchPredicate,
);
export interface AwsWafRateBasedRuleDetails {
  MetricName?: string;
  Name?: string;
  RateKey?: string;
  RateLimit?: number;
  RuleId?: string;
  MatchPredicates?: AwsWafRateBasedRuleMatchPredicate[];
}
export const AwsWafRateBasedRuleDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetricName: S.optional(S.String),
    Name: S.optional(S.String),
    RateKey: S.optional(S.String),
    RateLimit: S.optional(S.Number),
    RuleId: S.optional(S.String),
    MatchPredicates: S.optional(AwsWafRateBasedRuleMatchPredicateList),
  }),
).annotate({
  identifier: "AwsWafRateBasedRuleDetails",
}) as any as S.Schema<AwsWafRateBasedRuleDetails>;
export interface AwsWafRegionalRateBasedRuleMatchPredicate {
  DataId?: string;
  Negated?: boolean;
  Type?: string;
}
export const AwsWafRegionalRateBasedRuleMatchPredicate =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DataId: S.optional(S.String),
      Negated: S.optional(S.Boolean),
      Type: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsWafRegionalRateBasedRuleMatchPredicate",
  }) as any as S.Schema<AwsWafRegionalRateBasedRuleMatchPredicate>;
export type AwsWafRegionalRateBasedRuleMatchPredicateList =
  AwsWafRegionalRateBasedRuleMatchPredicate[];
export const AwsWafRegionalRateBasedRuleMatchPredicateList =
  /*@__PURE__*/ S.Array(AwsWafRegionalRateBasedRuleMatchPredicate);
export interface AwsWafRegionalRateBasedRuleDetails {
  MetricName?: string;
  Name?: string;
  RateKey?: string;
  RateLimit?: number;
  RuleId?: string;
  MatchPredicates?: AwsWafRegionalRateBasedRuleMatchPredicate[];
}
export const AwsWafRegionalRateBasedRuleDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetricName: S.optional(S.String),
    Name: S.optional(S.String),
    RateKey: S.optional(S.String),
    RateLimit: S.optional(S.Number),
    RuleId: S.optional(S.String),
    MatchPredicates: S.optional(AwsWafRegionalRateBasedRuleMatchPredicateList),
  }),
).annotate({
  identifier: "AwsWafRegionalRateBasedRuleDetails",
}) as any as S.Schema<AwsWafRegionalRateBasedRuleDetails>;
export interface AwsEcrRepositoryImageScanningConfigurationDetails {
  ScanOnPush?: boolean;
}
export const AwsEcrRepositoryImageScanningConfigurationDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ScanOnPush: S.optional(S.Boolean) }),
  ).annotate({
    identifier: "AwsEcrRepositoryImageScanningConfigurationDetails",
  }) as any as S.Schema<AwsEcrRepositoryImageScanningConfigurationDetails>;
export interface AwsEcrRepositoryLifecyclePolicyDetails {
  LifecyclePolicyText?: string;
  RegistryId?: string;
}
export const AwsEcrRepositoryLifecyclePolicyDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      LifecyclePolicyText: S.optional(S.String),
      RegistryId: S.optional(S.String),
    }),
).annotate({
  identifier: "AwsEcrRepositoryLifecyclePolicyDetails",
}) as any as S.Schema<AwsEcrRepositoryLifecyclePolicyDetails>;
export interface AwsEcrRepositoryDetails {
  Arn?: string;
  ImageScanningConfiguration?: AwsEcrRepositoryImageScanningConfigurationDetails;
  ImageTagMutability?: string;
  LifecyclePolicy?: AwsEcrRepositoryLifecyclePolicyDetails;
  RepositoryName?: string;
  RepositoryPolicyText?: string;
}
export const AwsEcrRepositoryDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    ImageScanningConfiguration: S.optional(
      AwsEcrRepositoryImageScanningConfigurationDetails,
    ),
    ImageTagMutability: S.optional(S.String),
    LifecyclePolicy: S.optional(AwsEcrRepositoryLifecyclePolicyDetails),
    RepositoryName: S.optional(S.String),
    RepositoryPolicyText: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEcrRepositoryDetails",
}) as any as S.Schema<AwsEcrRepositoryDetails>;
export interface AwsEksClusterResourcesVpcConfigDetails {
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
  EndpointPublicAccess?: boolean;
}
export const AwsEksClusterResourcesVpcConfigDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SecurityGroupIds: S.optional(NonEmptyStringList),
      SubnetIds: S.optional(NonEmptyStringList),
      EndpointPublicAccess: S.optional(S.Boolean),
    }),
).annotate({
  identifier: "AwsEksClusterResourcesVpcConfigDetails",
}) as any as S.Schema<AwsEksClusterResourcesVpcConfigDetails>;
export interface AwsEksClusterLoggingClusterLoggingDetails {
  Enabled?: boolean;
  Types?: string[];
}
export const AwsEksClusterLoggingClusterLoggingDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Enabled: S.optional(S.Boolean),
      Types: S.optional(NonEmptyStringList),
    }),
  ).annotate({
    identifier: "AwsEksClusterLoggingClusterLoggingDetails",
  }) as any as S.Schema<AwsEksClusterLoggingClusterLoggingDetails>;
export type AwsEksClusterLoggingClusterLoggingList =
  AwsEksClusterLoggingClusterLoggingDetails[];
export const AwsEksClusterLoggingClusterLoggingList = /*@__PURE__*/ S.Array(
  AwsEksClusterLoggingClusterLoggingDetails,
);
export interface AwsEksClusterLoggingDetails {
  ClusterLogging?: AwsEksClusterLoggingClusterLoggingDetails[];
}
export const AwsEksClusterLoggingDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterLogging: S.optional(AwsEksClusterLoggingClusterLoggingList),
  }),
).annotate({
  identifier: "AwsEksClusterLoggingDetails",
}) as any as S.Schema<AwsEksClusterLoggingDetails>;
export interface AwsEksClusterDetails {
  Arn?: string;
  CertificateAuthorityData?: string;
  ClusterStatus?: string;
  Endpoint?: string;
  Name?: string;
  ResourcesVpcConfig?: AwsEksClusterResourcesVpcConfigDetails;
  RoleArn?: string;
  Version?: string;
  Logging?: AwsEksClusterLoggingDetails;
}
export const AwsEksClusterDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CertificateAuthorityData: S.optional(S.String),
    ClusterStatus: S.optional(S.String),
    Endpoint: S.optional(S.String),
    Name: S.optional(S.String),
    ResourcesVpcConfig: S.optional(AwsEksClusterResourcesVpcConfigDetails),
    RoleArn: S.optional(S.String),
    Version: S.optional(S.String),
    Logging: S.optional(AwsEksClusterLoggingDetails),
  }),
).annotate({
  identifier: "AwsEksClusterDetails",
}) as any as S.Schema<AwsEksClusterDetails>;
export interface FirewallPolicyStatefulRuleGroupReferencesDetails {
  ResourceArn?: string;
}
export const FirewallPolicyStatefulRuleGroupReferencesDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ResourceArn: S.optional(S.String) }),
  ).annotate({
    identifier: "FirewallPolicyStatefulRuleGroupReferencesDetails",
  }) as any as S.Schema<FirewallPolicyStatefulRuleGroupReferencesDetails>;
export type FirewallPolicyStatefulRuleGroupReferencesList =
  FirewallPolicyStatefulRuleGroupReferencesDetails[];
export const FirewallPolicyStatefulRuleGroupReferencesList =
  /*@__PURE__*/ S.Array(FirewallPolicyStatefulRuleGroupReferencesDetails);
export interface StatelessCustomPublishMetricActionDimension {
  Value?: string;
}
export const StatelessCustomPublishMetricActionDimension =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Value: S.optional(S.String) }),
  ).annotate({
    identifier: "StatelessCustomPublishMetricActionDimension",
  }) as any as S.Schema<StatelessCustomPublishMetricActionDimension>;
export type StatelessCustomPublishMetricActionDimensionsList =
  StatelessCustomPublishMetricActionDimension[];
export const StatelessCustomPublishMetricActionDimensionsList =
  /*@__PURE__*/ S.Array(StatelessCustomPublishMetricActionDimension);
export interface StatelessCustomPublishMetricAction {
  Dimensions?: StatelessCustomPublishMetricActionDimension[];
}
export const StatelessCustomPublishMetricAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Dimensions: S.optional(StatelessCustomPublishMetricActionDimensionsList),
  }),
).annotate({
  identifier: "StatelessCustomPublishMetricAction",
}) as any as S.Schema<StatelessCustomPublishMetricAction>;
export interface StatelessCustomActionDefinition {
  PublishMetricAction?: StatelessCustomPublishMetricAction;
}
export const StatelessCustomActionDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PublishMetricAction: S.optional(StatelessCustomPublishMetricAction),
  }),
).annotate({
  identifier: "StatelessCustomActionDefinition",
}) as any as S.Schema<StatelessCustomActionDefinition>;
export interface FirewallPolicyStatelessCustomActionsDetails {
  ActionDefinition?: StatelessCustomActionDefinition;
  ActionName?: string;
}
export const FirewallPolicyStatelessCustomActionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ActionDefinition: S.optional(StatelessCustomActionDefinition),
      ActionName: S.optional(S.String),
    }),
  ).annotate({
    identifier: "FirewallPolicyStatelessCustomActionsDetails",
  }) as any as S.Schema<FirewallPolicyStatelessCustomActionsDetails>;
export type FirewallPolicyStatelessCustomActionsList =
  FirewallPolicyStatelessCustomActionsDetails[];
export const FirewallPolicyStatelessCustomActionsList = /*@__PURE__*/ S.Array(
  FirewallPolicyStatelessCustomActionsDetails,
);
export interface FirewallPolicyStatelessRuleGroupReferencesDetails {
  Priority?: number;
  ResourceArn?: string;
}
export const FirewallPolicyStatelessRuleGroupReferencesDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Priority: S.optional(S.Number),
      ResourceArn: S.optional(S.String),
    }),
  ).annotate({
    identifier: "FirewallPolicyStatelessRuleGroupReferencesDetails",
  }) as any as S.Schema<FirewallPolicyStatelessRuleGroupReferencesDetails>;
export type FirewallPolicyStatelessRuleGroupReferencesList =
  FirewallPolicyStatelessRuleGroupReferencesDetails[];
export const FirewallPolicyStatelessRuleGroupReferencesList =
  /*@__PURE__*/ S.Array(FirewallPolicyStatelessRuleGroupReferencesDetails);
export interface FirewallPolicyDetails {
  StatefulRuleGroupReferences?: FirewallPolicyStatefulRuleGroupReferencesDetails[];
  StatelessCustomActions?: FirewallPolicyStatelessCustomActionsDetails[];
  StatelessDefaultActions?: string[];
  StatelessFragmentDefaultActions?: string[];
  StatelessRuleGroupReferences?: FirewallPolicyStatelessRuleGroupReferencesDetails[];
}
export const FirewallPolicyDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StatefulRuleGroupReferences: S.optional(
      FirewallPolicyStatefulRuleGroupReferencesList,
    ),
    StatelessCustomActions: S.optional(
      FirewallPolicyStatelessCustomActionsList,
    ),
    StatelessDefaultActions: S.optional(NonEmptyStringList),
    StatelessFragmentDefaultActions: S.optional(NonEmptyStringList),
    StatelessRuleGroupReferences: S.optional(
      FirewallPolicyStatelessRuleGroupReferencesList,
    ),
  }),
).annotate({
  identifier: "FirewallPolicyDetails",
}) as any as S.Schema<FirewallPolicyDetails>;
export interface AwsNetworkFirewallFirewallPolicyDetails {
  FirewallPolicy?: FirewallPolicyDetails;
  FirewallPolicyArn?: string;
  FirewallPolicyId?: string;
  FirewallPolicyName?: string;
  Description?: string;
}
export const AwsNetworkFirewallFirewallPolicyDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FirewallPolicy: S.optional(FirewallPolicyDetails),
      FirewallPolicyArn: S.optional(S.String),
      FirewallPolicyId: S.optional(S.String),
      FirewallPolicyName: S.optional(S.String),
      Description: S.optional(S.String),
    }),
).annotate({
  identifier: "AwsNetworkFirewallFirewallPolicyDetails",
}) as any as S.Schema<AwsNetworkFirewallFirewallPolicyDetails>;
export interface AwsNetworkFirewallFirewallSubnetMappingsDetails {
  SubnetId?: string;
}
export const AwsNetworkFirewallFirewallSubnetMappingsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ SubnetId: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsNetworkFirewallFirewallSubnetMappingsDetails",
  }) as any as S.Schema<AwsNetworkFirewallFirewallSubnetMappingsDetails>;
export type AwsNetworkFirewallFirewallSubnetMappingsList =
  AwsNetworkFirewallFirewallSubnetMappingsDetails[];
export const AwsNetworkFirewallFirewallSubnetMappingsList =
  /*@__PURE__*/ S.Array(AwsNetworkFirewallFirewallSubnetMappingsDetails);
export interface AwsNetworkFirewallFirewallDetails {
  DeleteProtection?: boolean;
  Description?: string;
  FirewallArn?: string;
  FirewallId?: string;
  FirewallName?: string;
  FirewallPolicyArn?: string;
  FirewallPolicyChangeProtection?: boolean;
  SubnetChangeProtection?: boolean;
  SubnetMappings?: AwsNetworkFirewallFirewallSubnetMappingsDetails[];
  VpcId?: string;
}
export const AwsNetworkFirewallFirewallDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeleteProtection: S.optional(S.Boolean),
    Description: S.optional(S.String),
    FirewallArn: S.optional(S.String),
    FirewallId: S.optional(S.String),
    FirewallName: S.optional(S.String),
    FirewallPolicyArn: S.optional(S.String),
    FirewallPolicyChangeProtection: S.optional(S.Boolean),
    SubnetChangeProtection: S.optional(S.Boolean),
    SubnetMappings: S.optional(AwsNetworkFirewallFirewallSubnetMappingsList),
    VpcId: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsNetworkFirewallFirewallDetails",
}) as any as S.Schema<AwsNetworkFirewallFirewallDetails>;
export interface RuleGroupVariablesIpSetsDetails {
  Definition?: string[];
}
export const RuleGroupVariablesIpSetsDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Definition: S.optional(NonEmptyStringList) }),
).annotate({
  identifier: "RuleGroupVariablesIpSetsDetails",
}) as any as S.Schema<RuleGroupVariablesIpSetsDetails>;
export interface RuleGroupVariablesPortSetsDetails {
  Definition?: string[];
}
export const RuleGroupVariablesPortSetsDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Definition: S.optional(NonEmptyStringList) }),
).annotate({
  identifier: "RuleGroupVariablesPortSetsDetails",
}) as any as S.Schema<RuleGroupVariablesPortSetsDetails>;
export interface RuleGroupVariables {
  IpSets?: RuleGroupVariablesIpSetsDetails;
  PortSets?: RuleGroupVariablesPortSetsDetails;
}
export const RuleGroupVariables = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IpSets: S.optional(RuleGroupVariablesIpSetsDetails),
    PortSets: S.optional(RuleGroupVariablesPortSetsDetails),
  }),
).annotate({
  identifier: "RuleGroupVariables",
}) as any as S.Schema<RuleGroupVariables>;
export interface RuleGroupSourceListDetails {
  GeneratedRulesType?: string;
  TargetTypes?: string[];
  Targets?: string[];
}
export const RuleGroupSourceListDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GeneratedRulesType: S.optional(S.String),
    TargetTypes: S.optional(NonEmptyStringList),
    Targets: S.optional(NonEmptyStringList),
  }),
).annotate({
  identifier: "RuleGroupSourceListDetails",
}) as any as S.Schema<RuleGroupSourceListDetails>;
export interface RuleGroupSourceStatefulRulesHeaderDetails {
  Destination?: string;
  DestinationPort?: string;
  Direction?: string;
  Protocol?: string;
  Source?: string;
  SourcePort?: string;
}
export const RuleGroupSourceStatefulRulesHeaderDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Destination: S.optional(S.String),
      DestinationPort: S.optional(S.String),
      Direction: S.optional(S.String),
      Protocol: S.optional(S.String),
      Source: S.optional(S.String),
      SourcePort: S.optional(S.String),
    }),
  ).annotate({
    identifier: "RuleGroupSourceStatefulRulesHeaderDetails",
  }) as any as S.Schema<RuleGroupSourceStatefulRulesHeaderDetails>;
export type RuleGroupSourceStatefulRulesRuleOptionsSettingsList = string[];
export const RuleGroupSourceStatefulRulesRuleOptionsSettingsList =
  /*@__PURE__*/ S.Array(S.String);
export interface RuleGroupSourceStatefulRulesOptionsDetails {
  Keyword?: string;
  Settings?: string[];
}
export const RuleGroupSourceStatefulRulesOptionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Keyword: S.optional(S.String),
      Settings: S.optional(RuleGroupSourceStatefulRulesRuleOptionsSettingsList),
    }),
  ).annotate({
    identifier: "RuleGroupSourceStatefulRulesOptionsDetails",
  }) as any as S.Schema<RuleGroupSourceStatefulRulesOptionsDetails>;
export type RuleGroupSourceStatefulRulesOptionsList =
  RuleGroupSourceStatefulRulesOptionsDetails[];
export const RuleGroupSourceStatefulRulesOptionsList = /*@__PURE__*/ S.Array(
  RuleGroupSourceStatefulRulesOptionsDetails,
);
export interface RuleGroupSourceStatefulRulesDetails {
  Action?: string;
  Header?: RuleGroupSourceStatefulRulesHeaderDetails;
  RuleOptions?: RuleGroupSourceStatefulRulesOptionsDetails[];
}
export const RuleGroupSourceStatefulRulesDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.optional(S.String),
    Header: S.optional(RuleGroupSourceStatefulRulesHeaderDetails),
    RuleOptions: S.optional(RuleGroupSourceStatefulRulesOptionsList),
  }),
).annotate({
  identifier: "RuleGroupSourceStatefulRulesDetails",
}) as any as S.Schema<RuleGroupSourceStatefulRulesDetails>;
export type RuleGroupSourceStatefulRulesList =
  RuleGroupSourceStatefulRulesDetails[];
export const RuleGroupSourceStatefulRulesList = /*@__PURE__*/ S.Array(
  RuleGroupSourceStatefulRulesDetails,
);
export interface RuleGroupSourceCustomActionsDetails {
  ActionDefinition?: StatelessCustomActionDefinition;
  ActionName?: string;
}
export const RuleGroupSourceCustomActionsDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionDefinition: S.optional(StatelessCustomActionDefinition),
    ActionName: S.optional(S.String),
  }),
).annotate({
  identifier: "RuleGroupSourceCustomActionsDetails",
}) as any as S.Schema<RuleGroupSourceCustomActionsDetails>;
export type RuleGroupSourceCustomActionsList =
  RuleGroupSourceCustomActionsDetails[];
export const RuleGroupSourceCustomActionsList = /*@__PURE__*/ S.Array(
  RuleGroupSourceCustomActionsDetails,
);
export interface RuleGroupSourceStatelessRuleMatchAttributesDestinationPorts {
  FromPort?: number;
  ToPort?: number;
}
export const RuleGroupSourceStatelessRuleMatchAttributesDestinationPorts =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ FromPort: S.optional(S.Number), ToPort: S.optional(S.Number) }),
  ).annotate({
    identifier: "RuleGroupSourceStatelessRuleMatchAttributesDestinationPorts",
  }) as any as S.Schema<RuleGroupSourceStatelessRuleMatchAttributesDestinationPorts>;
export type RuleGroupSourceStatelessRuleMatchAttributesDestinationPortsList =
  RuleGroupSourceStatelessRuleMatchAttributesDestinationPorts[];
export const RuleGroupSourceStatelessRuleMatchAttributesDestinationPortsList =
  /*@__PURE__*/ S.Array(
    RuleGroupSourceStatelessRuleMatchAttributesDestinationPorts,
  );
export interface RuleGroupSourceStatelessRuleMatchAttributesDestinations {
  AddressDefinition?: string;
}
export const RuleGroupSourceStatelessRuleMatchAttributesDestinations =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ AddressDefinition: S.optional(S.String) }),
  ).annotate({
    identifier: "RuleGroupSourceStatelessRuleMatchAttributesDestinations",
  }) as any as S.Schema<RuleGroupSourceStatelessRuleMatchAttributesDestinations>;
export type RuleGroupSourceStatelessRuleMatchAttributesDestinationsList =
  RuleGroupSourceStatelessRuleMatchAttributesDestinations[];
export const RuleGroupSourceStatelessRuleMatchAttributesDestinationsList =
  /*@__PURE__*/ S.Array(
    RuleGroupSourceStatelessRuleMatchAttributesDestinations,
  );
export type RuleGroupSourceStatelessRuleMatchAttributesProtocolsList = number[];
export const RuleGroupSourceStatelessRuleMatchAttributesProtocolsList =
  /*@__PURE__*/ S.Array(S.Number);
export interface RuleGroupSourceStatelessRuleMatchAttributesSourcePorts {
  FromPort?: number;
  ToPort?: number;
}
export const RuleGroupSourceStatelessRuleMatchAttributesSourcePorts =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ FromPort: S.optional(S.Number), ToPort: S.optional(S.Number) }),
  ).annotate({
    identifier: "RuleGroupSourceStatelessRuleMatchAttributesSourcePorts",
  }) as any as S.Schema<RuleGroupSourceStatelessRuleMatchAttributesSourcePorts>;
export type RuleGroupSourceStatelessRuleMatchAttributesSourcePortsList =
  RuleGroupSourceStatelessRuleMatchAttributesSourcePorts[];
export const RuleGroupSourceStatelessRuleMatchAttributesSourcePortsList =
  /*@__PURE__*/ S.Array(RuleGroupSourceStatelessRuleMatchAttributesSourcePorts);
export interface RuleGroupSourceStatelessRuleMatchAttributesSources {
  AddressDefinition?: string;
}
export const RuleGroupSourceStatelessRuleMatchAttributesSources =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ AddressDefinition: S.optional(S.String) }),
  ).annotate({
    identifier: "RuleGroupSourceStatelessRuleMatchAttributesSources",
  }) as any as S.Schema<RuleGroupSourceStatelessRuleMatchAttributesSources>;
export type RuleGroupSourceStatelessRuleMatchAttributesSourcesList =
  RuleGroupSourceStatelessRuleMatchAttributesSources[];
export const RuleGroupSourceStatelessRuleMatchAttributesSourcesList =
  /*@__PURE__*/ S.Array(RuleGroupSourceStatelessRuleMatchAttributesSources);
export interface RuleGroupSourceStatelessRuleMatchAttributesTcpFlags {
  Flags?: string[];
  Masks?: string[];
}
export const RuleGroupSourceStatelessRuleMatchAttributesTcpFlags =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Flags: S.optional(NonEmptyStringList),
      Masks: S.optional(NonEmptyStringList),
    }),
  ).annotate({
    identifier: "RuleGroupSourceStatelessRuleMatchAttributesTcpFlags",
  }) as any as S.Schema<RuleGroupSourceStatelessRuleMatchAttributesTcpFlags>;
export type RuleGroupSourceStatelessRuleMatchAttributesTcpFlagsList =
  RuleGroupSourceStatelessRuleMatchAttributesTcpFlags[];
export const RuleGroupSourceStatelessRuleMatchAttributesTcpFlagsList =
  /*@__PURE__*/ S.Array(RuleGroupSourceStatelessRuleMatchAttributesTcpFlags);
export interface RuleGroupSourceStatelessRuleMatchAttributes {
  DestinationPorts?: RuleGroupSourceStatelessRuleMatchAttributesDestinationPorts[];
  Destinations?: RuleGroupSourceStatelessRuleMatchAttributesDestinations[];
  Protocols?: number[];
  SourcePorts?: RuleGroupSourceStatelessRuleMatchAttributesSourcePorts[];
  Sources?: RuleGroupSourceStatelessRuleMatchAttributesSources[];
  TcpFlags?: RuleGroupSourceStatelessRuleMatchAttributesTcpFlags[];
}
export const RuleGroupSourceStatelessRuleMatchAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DestinationPorts: S.optional(
        RuleGroupSourceStatelessRuleMatchAttributesDestinationPortsList,
      ),
      Destinations: S.optional(
        RuleGroupSourceStatelessRuleMatchAttributesDestinationsList,
      ),
      Protocols: S.optional(
        RuleGroupSourceStatelessRuleMatchAttributesProtocolsList,
      ),
      SourcePorts: S.optional(
        RuleGroupSourceStatelessRuleMatchAttributesSourcePortsList,
      ),
      Sources: S.optional(
        RuleGroupSourceStatelessRuleMatchAttributesSourcesList,
      ),
      TcpFlags: S.optional(
        RuleGroupSourceStatelessRuleMatchAttributesTcpFlagsList,
      ),
    }),
  ).annotate({
    identifier: "RuleGroupSourceStatelessRuleMatchAttributes",
  }) as any as S.Schema<RuleGroupSourceStatelessRuleMatchAttributes>;
export interface RuleGroupSourceStatelessRuleDefinition {
  Actions?: string[];
  MatchAttributes?: RuleGroupSourceStatelessRuleMatchAttributes;
}
export const RuleGroupSourceStatelessRuleDefinition = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Actions: S.optional(NonEmptyStringList),
      MatchAttributes: S.optional(RuleGroupSourceStatelessRuleMatchAttributes),
    }),
).annotate({
  identifier: "RuleGroupSourceStatelessRuleDefinition",
}) as any as S.Schema<RuleGroupSourceStatelessRuleDefinition>;
export interface RuleGroupSourceStatelessRulesDetails {
  Priority?: number;
  RuleDefinition?: RuleGroupSourceStatelessRuleDefinition;
}
export const RuleGroupSourceStatelessRulesDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Priority: S.optional(S.Number),
      RuleDefinition: S.optional(RuleGroupSourceStatelessRuleDefinition),
    }),
).annotate({
  identifier: "RuleGroupSourceStatelessRulesDetails",
}) as any as S.Schema<RuleGroupSourceStatelessRulesDetails>;
export type RuleGroupSourceStatelessRulesList =
  RuleGroupSourceStatelessRulesDetails[];
export const RuleGroupSourceStatelessRulesList = /*@__PURE__*/ S.Array(
  RuleGroupSourceStatelessRulesDetails,
);
export interface RuleGroupSourceStatelessRulesAndCustomActionsDetails {
  CustomActions?: RuleGroupSourceCustomActionsDetails[];
  StatelessRules?: RuleGroupSourceStatelessRulesDetails[];
}
export const RuleGroupSourceStatelessRulesAndCustomActionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CustomActions: S.optional(RuleGroupSourceCustomActionsList),
      StatelessRules: S.optional(RuleGroupSourceStatelessRulesList),
    }),
  ).annotate({
    identifier: "RuleGroupSourceStatelessRulesAndCustomActionsDetails",
  }) as any as S.Schema<RuleGroupSourceStatelessRulesAndCustomActionsDetails>;
export interface RuleGroupSource {
  RulesSourceList?: RuleGroupSourceListDetails;
  RulesString?: string;
  StatefulRules?: RuleGroupSourceStatefulRulesDetails[];
  StatelessRulesAndCustomActions?: RuleGroupSourceStatelessRulesAndCustomActionsDetails;
}
export const RuleGroupSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RulesSourceList: S.optional(RuleGroupSourceListDetails),
    RulesString: S.optional(S.String),
    StatefulRules: S.optional(RuleGroupSourceStatefulRulesList),
    StatelessRulesAndCustomActions: S.optional(
      RuleGroupSourceStatelessRulesAndCustomActionsDetails,
    ),
  }),
).annotate({
  identifier: "RuleGroupSource",
}) as any as S.Schema<RuleGroupSource>;
export interface RuleGroupDetails {
  RuleVariables?: RuleGroupVariables;
  RulesSource?: RuleGroupSource;
}
export const RuleGroupDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleVariables: S.optional(RuleGroupVariables),
    RulesSource: S.optional(RuleGroupSource),
  }),
).annotate({
  identifier: "RuleGroupDetails",
}) as any as S.Schema<RuleGroupDetails>;
export interface AwsNetworkFirewallRuleGroupDetails {
  Capacity?: number;
  Description?: string;
  RuleGroup?: RuleGroupDetails;
  RuleGroupArn?: string;
  RuleGroupId?: string;
  RuleGroupName?: string;
  Type?: string;
}
export const AwsNetworkFirewallRuleGroupDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Capacity: S.optional(S.Number),
    Description: S.optional(S.String),
    RuleGroup: S.optional(RuleGroupDetails),
    RuleGroupArn: S.optional(S.String),
    RuleGroupId: S.optional(S.String),
    RuleGroupName: S.optional(S.String),
    Type: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsNetworkFirewallRuleGroupDetails",
}) as any as S.Schema<AwsNetworkFirewallRuleGroupDetails>;
export interface AwsRdsDbSecurityGroupEc2SecurityGroup {
  Ec2SecurityGroupId?: string;
  Ec2SecurityGroupName?: string;
  Ec2SecurityGroupOwnerId?: string;
  Status?: string;
}
export const AwsRdsDbSecurityGroupEc2SecurityGroup = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Ec2SecurityGroupId: S.optional(S.String),
      Ec2SecurityGroupName: S.optional(S.String),
      Ec2SecurityGroupOwnerId: S.optional(S.String),
      Status: S.optional(S.String),
    }),
).annotate({
  identifier: "AwsRdsDbSecurityGroupEc2SecurityGroup",
}) as any as S.Schema<AwsRdsDbSecurityGroupEc2SecurityGroup>;
export type AwsRdsDbSecurityGroupEc2SecurityGroups =
  AwsRdsDbSecurityGroupEc2SecurityGroup[];
export const AwsRdsDbSecurityGroupEc2SecurityGroups = /*@__PURE__*/ S.Array(
  AwsRdsDbSecurityGroupEc2SecurityGroup,
);
export interface AwsRdsDbSecurityGroupIpRange {
  CidrIp?: string;
  Status?: string;
}
export const AwsRdsDbSecurityGroupIpRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CidrIp: S.optional(S.String), Status: S.optional(S.String) }),
).annotate({
  identifier: "AwsRdsDbSecurityGroupIpRange",
}) as any as S.Schema<AwsRdsDbSecurityGroupIpRange>;
export type AwsRdsDbSecurityGroupIpRanges = AwsRdsDbSecurityGroupIpRange[];
export const AwsRdsDbSecurityGroupIpRanges = /*@__PURE__*/ S.Array(
  AwsRdsDbSecurityGroupIpRange,
);
export interface AwsRdsDbSecurityGroupDetails {
  DbSecurityGroupArn?: string;
  DbSecurityGroupDescription?: string;
  DbSecurityGroupName?: string;
  Ec2SecurityGroups?: AwsRdsDbSecurityGroupEc2SecurityGroup[];
  IpRanges?: AwsRdsDbSecurityGroupIpRange[];
  OwnerId?: string;
  VpcId?: string;
}
export const AwsRdsDbSecurityGroupDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DbSecurityGroupArn: S.optional(S.String),
    DbSecurityGroupDescription: S.optional(S.String),
    DbSecurityGroupName: S.optional(S.String),
    Ec2SecurityGroups: S.optional(AwsRdsDbSecurityGroupEc2SecurityGroups),
    IpRanges: S.optional(AwsRdsDbSecurityGroupIpRanges),
    OwnerId: S.optional(S.String),
    VpcId: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsRdsDbSecurityGroupDetails",
}) as any as S.Schema<AwsRdsDbSecurityGroupDetails>;
export interface AwsKinesisStreamStreamEncryptionDetails {
  EncryptionType?: string;
  KeyId?: string;
}
export const AwsKinesisStreamStreamEncryptionDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      EncryptionType: S.optional(S.String),
      KeyId: S.optional(S.String),
    }),
).annotate({
  identifier: "AwsKinesisStreamStreamEncryptionDetails",
}) as any as S.Schema<AwsKinesisStreamStreamEncryptionDetails>;
export interface AwsKinesisStreamDetails {
  Name?: string;
  Arn?: string;
  StreamEncryption?: AwsKinesisStreamStreamEncryptionDetails;
  ShardCount?: number;
  RetentionPeriodHours?: number;
}
export const AwsKinesisStreamDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Arn: S.optional(S.String),
    StreamEncryption: S.optional(AwsKinesisStreamStreamEncryptionDetails),
    ShardCount: S.optional(S.Number),
    RetentionPeriodHours: S.optional(S.Number),
  }),
).annotate({
  identifier: "AwsKinesisStreamDetails",
}) as any as S.Schema<AwsKinesisStreamDetails>;
export interface AwsEc2TransitGatewayDetails {
  Id?: string;
  Description?: string;
  DefaultRouteTablePropagation?: string;
  AutoAcceptSharedAttachments?: string;
  DefaultRouteTableAssociation?: string;
  TransitGatewayCidrBlocks?: string[];
  AssociationDefaultRouteTableId?: string;
  PropagationDefaultRouteTableId?: string;
  VpnEcmpSupport?: string;
  DnsSupport?: string;
  MulticastSupport?: string;
  AmazonSideAsn?: number;
}
export const AwsEc2TransitGatewayDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Description: S.optional(S.String),
    DefaultRouteTablePropagation: S.optional(S.String),
    AutoAcceptSharedAttachments: S.optional(S.String),
    DefaultRouteTableAssociation: S.optional(S.String),
    TransitGatewayCidrBlocks: S.optional(NonEmptyStringList),
    AssociationDefaultRouteTableId: S.optional(S.String),
    PropagationDefaultRouteTableId: S.optional(S.String),
    VpnEcmpSupport: S.optional(S.String),
    DnsSupport: S.optional(S.String),
    MulticastSupport: S.optional(S.String),
    AmazonSideAsn: S.optional(S.Number),
  }),
).annotate({
  identifier: "AwsEc2TransitGatewayDetails",
}) as any as S.Schema<AwsEc2TransitGatewayDetails>;
export interface AwsEfsAccessPointPosixUserDetails {
  Gid?: string;
  SecondaryGids?: string[];
  Uid?: string;
}
export const AwsEfsAccessPointPosixUserDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Gid: S.optional(S.String),
    SecondaryGids: S.optional(NonEmptyStringList),
    Uid: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEfsAccessPointPosixUserDetails",
}) as any as S.Schema<AwsEfsAccessPointPosixUserDetails>;
export interface AwsEfsAccessPointRootDirectoryCreationInfoDetails {
  OwnerGid?: string;
  OwnerUid?: string;
  Permissions?: string;
}
export const AwsEfsAccessPointRootDirectoryCreationInfoDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      OwnerGid: S.optional(S.String),
      OwnerUid: S.optional(S.String),
      Permissions: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsEfsAccessPointRootDirectoryCreationInfoDetails",
  }) as any as S.Schema<AwsEfsAccessPointRootDirectoryCreationInfoDetails>;
export interface AwsEfsAccessPointRootDirectoryDetails {
  CreationInfo?: AwsEfsAccessPointRootDirectoryCreationInfoDetails;
  Path?: string;
}
export const AwsEfsAccessPointRootDirectoryDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CreationInfo: S.optional(
        AwsEfsAccessPointRootDirectoryCreationInfoDetails,
      ),
      Path: S.optional(S.String),
    }),
).annotate({
  identifier: "AwsEfsAccessPointRootDirectoryDetails",
}) as any as S.Schema<AwsEfsAccessPointRootDirectoryDetails>;
export interface AwsEfsAccessPointDetails {
  AccessPointId?: string;
  Arn?: string;
  ClientToken?: string;
  FileSystemId?: string;
  PosixUser?: AwsEfsAccessPointPosixUserDetails;
  RootDirectory?: AwsEfsAccessPointRootDirectoryDetails;
}
export const AwsEfsAccessPointDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessPointId: S.optional(S.String),
    Arn: S.optional(S.String),
    ClientToken: S.optional(S.String),
    FileSystemId: S.optional(S.String),
    PosixUser: S.optional(AwsEfsAccessPointPosixUserDetails),
    RootDirectory: S.optional(AwsEfsAccessPointRootDirectoryDetails),
  }),
).annotate({
  identifier: "AwsEfsAccessPointDetails",
}) as any as S.Schema<AwsEfsAccessPointDetails>;
export interface AwsCloudFormationStackDriftInformationDetails {
  StackDriftStatus?: string;
}
export const AwsCloudFormationStackDriftInformationDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ StackDriftStatus: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsCloudFormationStackDriftInformationDetails",
  }) as any as S.Schema<AwsCloudFormationStackDriftInformationDetails>;
export interface AwsCloudFormationStackOutputsDetails {
  Description?: string;
  OutputKey?: string;
  OutputValue?: string;
}
export const AwsCloudFormationStackOutputsDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Description: S.optional(S.String),
      OutputKey: S.optional(S.String),
      OutputValue: S.optional(S.String),
    }),
).annotate({
  identifier: "AwsCloudFormationStackOutputsDetails",
}) as any as S.Schema<AwsCloudFormationStackOutputsDetails>;
export type AwsCloudFormationStackOutputsList =
  AwsCloudFormationStackOutputsDetails[];
export const AwsCloudFormationStackOutputsList = /*@__PURE__*/ S.Array(
  AwsCloudFormationStackOutputsDetails,
);
export interface AwsCloudFormationStackDetails {
  Capabilities?: string[];
  CreationTime?: string;
  Description?: string;
  DisableRollback?: boolean;
  DriftInformation?: AwsCloudFormationStackDriftInformationDetails;
  EnableTerminationProtection?: boolean;
  LastUpdatedTime?: string;
  NotificationArns?: string[];
  Outputs?: AwsCloudFormationStackOutputsDetails[];
  RoleArn?: string;
  StackId?: string;
  StackName?: string;
  StackStatus?: string;
  StackStatusReason?: string;
  TimeoutInMinutes?: number;
}
export const AwsCloudFormationStackDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Capabilities: S.optional(NonEmptyStringList),
    CreationTime: S.optional(S.String),
    Description: S.optional(S.String),
    DisableRollback: S.optional(S.Boolean),
    DriftInformation: S.optional(AwsCloudFormationStackDriftInformationDetails),
    EnableTerminationProtection: S.optional(S.Boolean),
    LastUpdatedTime: S.optional(S.String),
    NotificationArns: S.optional(NonEmptyStringList),
    Outputs: S.optional(AwsCloudFormationStackOutputsList),
    RoleArn: S.optional(S.String),
    StackId: S.optional(S.String),
    StackName: S.optional(S.String),
    StackStatus: S.optional(S.String),
    StackStatusReason: S.optional(S.String),
    TimeoutInMinutes: S.optional(S.Number),
  }),
).annotate({
  identifier: "AwsCloudFormationStackDetails",
}) as any as S.Schema<AwsCloudFormationStackDetails>;
export interface AwsCloudWatchAlarmDimensionsDetails {
  Name?: string;
  Value?: string;
}
export const AwsCloudWatchAlarmDimensionsDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({
  identifier: "AwsCloudWatchAlarmDimensionsDetails",
}) as any as S.Schema<AwsCloudWatchAlarmDimensionsDetails>;
export type AwsCloudWatchAlarmDimensionsList =
  AwsCloudWatchAlarmDimensionsDetails[];
export const AwsCloudWatchAlarmDimensionsList = /*@__PURE__*/ S.Array(
  AwsCloudWatchAlarmDimensionsDetails,
);
export interface AwsCloudWatchAlarmDetails {
  ActionsEnabled?: boolean;
  AlarmActions?: string[];
  AlarmArn?: string;
  AlarmConfigurationUpdatedTimestamp?: string;
  AlarmDescription?: string;
  AlarmName?: string;
  ComparisonOperator?: string;
  DatapointsToAlarm?: number;
  Dimensions?: AwsCloudWatchAlarmDimensionsDetails[];
  EvaluateLowSampleCountPercentile?: string;
  EvaluationPeriods?: number;
  ExtendedStatistic?: string;
  InsufficientDataActions?: string[];
  MetricName?: string;
  Namespace?: string;
  OkActions?: string[];
  Period?: number;
  Statistic?: string;
  Threshold?: number;
  ThresholdMetricId?: string;
  TreatMissingData?: string;
  Unit?: string;
}
export const AwsCloudWatchAlarmDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionsEnabled: S.optional(S.Boolean),
    AlarmActions: S.optional(NonEmptyStringList),
    AlarmArn: S.optional(S.String),
    AlarmConfigurationUpdatedTimestamp: S.optional(S.String),
    AlarmDescription: S.optional(S.String),
    AlarmName: S.optional(S.String),
    ComparisonOperator: S.optional(S.String),
    DatapointsToAlarm: S.optional(S.Number),
    Dimensions: S.optional(AwsCloudWatchAlarmDimensionsList),
    EvaluateLowSampleCountPercentile: S.optional(S.String),
    EvaluationPeriods: S.optional(S.Number),
    ExtendedStatistic: S.optional(S.String),
    InsufficientDataActions: S.optional(NonEmptyStringList),
    MetricName: S.optional(S.String),
    Namespace: S.optional(S.String),
    OkActions: S.optional(NonEmptyStringList),
    Period: S.optional(S.Number),
    Statistic: S.optional(S.String),
    Threshold: S.optional(S.Number),
    ThresholdMetricId: S.optional(S.String),
    TreatMissingData: S.optional(S.String),
    Unit: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsCloudWatchAlarmDetails",
}) as any as S.Schema<AwsCloudWatchAlarmDetails>;
export interface VpcInfoCidrBlockSetDetails {
  CidrBlock?: string;
}
export const VpcInfoCidrBlockSetDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CidrBlock: S.optional(S.String) }),
).annotate({
  identifier: "VpcInfoCidrBlockSetDetails",
}) as any as S.Schema<VpcInfoCidrBlockSetDetails>;
export type VpcInfoCidrBlockSetList = VpcInfoCidrBlockSetDetails[];
export const VpcInfoCidrBlockSetList = /*@__PURE__*/ S.Array(
  VpcInfoCidrBlockSetDetails,
);
export interface VpcInfoIpv6CidrBlockSetDetails {
  Ipv6CidrBlock?: string;
}
export const VpcInfoIpv6CidrBlockSetDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Ipv6CidrBlock: S.optional(S.String) }),
).annotate({
  identifier: "VpcInfoIpv6CidrBlockSetDetails",
}) as any as S.Schema<VpcInfoIpv6CidrBlockSetDetails>;
export type VpcInfoIpv6CidrBlockSetList = VpcInfoIpv6CidrBlockSetDetails[];
export const VpcInfoIpv6CidrBlockSetList = /*@__PURE__*/ S.Array(
  VpcInfoIpv6CidrBlockSetDetails,
);
export interface VpcInfoPeeringOptionsDetails {
  AllowDnsResolutionFromRemoteVpc?: boolean;
  AllowEgressFromLocalClassicLinkToRemoteVpc?: boolean;
  AllowEgressFromLocalVpcToRemoteClassicLink?: boolean;
}
export const VpcInfoPeeringOptionsDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AllowDnsResolutionFromRemoteVpc: S.optional(S.Boolean),
    AllowEgressFromLocalClassicLinkToRemoteVpc: S.optional(S.Boolean),
    AllowEgressFromLocalVpcToRemoteClassicLink: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "VpcInfoPeeringOptionsDetails",
}) as any as S.Schema<VpcInfoPeeringOptionsDetails>;
export interface AwsEc2VpcPeeringConnectionVpcInfoDetails {
  CidrBlock?: string;
  CidrBlockSet?: VpcInfoCidrBlockSetDetails[];
  Ipv6CidrBlockSet?: VpcInfoIpv6CidrBlockSetDetails[];
  OwnerId?: string;
  PeeringOptions?: VpcInfoPeeringOptionsDetails;
  Region?: string;
  VpcId?: string;
}
export const AwsEc2VpcPeeringConnectionVpcInfoDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CidrBlock: S.optional(S.String),
      CidrBlockSet: S.optional(VpcInfoCidrBlockSetList),
      Ipv6CidrBlockSet: S.optional(VpcInfoIpv6CidrBlockSetList),
      OwnerId: S.optional(S.String),
      PeeringOptions: S.optional(VpcInfoPeeringOptionsDetails),
      Region: S.optional(S.String),
      VpcId: S.optional(S.String),
    }),
).annotate({
  identifier: "AwsEc2VpcPeeringConnectionVpcInfoDetails",
}) as any as S.Schema<AwsEc2VpcPeeringConnectionVpcInfoDetails>;
export interface AwsEc2VpcPeeringConnectionStatusDetails {
  Code?: string;
  Message?: string;
}
export const AwsEc2VpcPeeringConnectionStatusDetails = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Code: S.optional(S.String), Message: S.optional(S.String) }),
).annotate({
  identifier: "AwsEc2VpcPeeringConnectionStatusDetails",
}) as any as S.Schema<AwsEc2VpcPeeringConnectionStatusDetails>;
export interface AwsEc2VpcPeeringConnectionDetails {
  AccepterVpcInfo?: AwsEc2VpcPeeringConnectionVpcInfoDetails;
  ExpirationTime?: string;
  RequesterVpcInfo?: AwsEc2VpcPeeringConnectionVpcInfoDetails;
  Status?: AwsEc2VpcPeeringConnectionStatusDetails;
  VpcPeeringConnectionId?: string;
}
export const AwsEc2VpcPeeringConnectionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccepterVpcInfo: S.optional(AwsEc2VpcPeeringConnectionVpcInfoDetails),
    ExpirationTime: S.optional(S.String),
    RequesterVpcInfo: S.optional(AwsEc2VpcPeeringConnectionVpcInfoDetails),
    Status: S.optional(AwsEc2VpcPeeringConnectionStatusDetails),
    VpcPeeringConnectionId: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEc2VpcPeeringConnectionDetails",
}) as any as S.Schema<AwsEc2VpcPeeringConnectionDetails>;
export interface AwsWafRegionalRuleGroupRulesActionDetails {
  Type?: string;
}
export const AwsWafRegionalRuleGroupRulesActionDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Type: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsWafRegionalRuleGroupRulesActionDetails",
  }) as any as S.Schema<AwsWafRegionalRuleGroupRulesActionDetails>;
export interface AwsWafRegionalRuleGroupRulesDetails {
  Action?: AwsWafRegionalRuleGroupRulesActionDetails;
  Priority?: number;
  RuleId?: string;
  Type?: string;
}
export const AwsWafRegionalRuleGroupRulesDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.optional(AwsWafRegionalRuleGroupRulesActionDetails),
    Priority: S.optional(S.Number),
    RuleId: S.optional(S.String),
    Type: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsWafRegionalRuleGroupRulesDetails",
}) as any as S.Schema<AwsWafRegionalRuleGroupRulesDetails>;
export type AwsWafRegionalRuleGroupRulesList =
  AwsWafRegionalRuleGroupRulesDetails[];
export const AwsWafRegionalRuleGroupRulesList = /*@__PURE__*/ S.Array(
  AwsWafRegionalRuleGroupRulesDetails,
);
export interface AwsWafRegionalRuleGroupDetails {
  MetricName?: string;
  Name?: string;
  RuleGroupId?: string;
  Rules?: AwsWafRegionalRuleGroupRulesDetails[];
}
export const AwsWafRegionalRuleGroupDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetricName: S.optional(S.String),
    Name: S.optional(S.String),
    RuleGroupId: S.optional(S.String),
    Rules: S.optional(AwsWafRegionalRuleGroupRulesList),
  }),
).annotate({
  identifier: "AwsWafRegionalRuleGroupDetails",
}) as any as S.Schema<AwsWafRegionalRuleGroupDetails>;
export interface AwsWafRegionalRulePredicateListDetails {
  DataId?: string;
  Negated?: boolean;
  Type?: string;
}
export const AwsWafRegionalRulePredicateListDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DataId: S.optional(S.String),
      Negated: S.optional(S.Boolean),
      Type: S.optional(S.String),
    }),
).annotate({
  identifier: "AwsWafRegionalRulePredicateListDetails",
}) as any as S.Schema<AwsWafRegionalRulePredicateListDetails>;
export type AwsWafRegionalRulePredicateList =
  AwsWafRegionalRulePredicateListDetails[];
export const AwsWafRegionalRulePredicateList = /*@__PURE__*/ S.Array(
  AwsWafRegionalRulePredicateListDetails,
);
export interface AwsWafRegionalRuleDetails {
  MetricName?: string;
  Name?: string;
  PredicateList?: AwsWafRegionalRulePredicateListDetails[];
  RuleId?: string;
}
export const AwsWafRegionalRuleDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetricName: S.optional(S.String),
    Name: S.optional(S.String),
    PredicateList: S.optional(AwsWafRegionalRulePredicateList),
    RuleId: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsWafRegionalRuleDetails",
}) as any as S.Schema<AwsWafRegionalRuleDetails>;
export interface AwsWafRegionalWebAclRulesListActionDetails {
  Type?: string;
}
export const AwsWafRegionalWebAclRulesListActionDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Type: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsWafRegionalWebAclRulesListActionDetails",
  }) as any as S.Schema<AwsWafRegionalWebAclRulesListActionDetails>;
export interface AwsWafRegionalWebAclRulesListOverrideActionDetails {
  Type?: string;
}
export const AwsWafRegionalWebAclRulesListOverrideActionDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Type: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsWafRegionalWebAclRulesListOverrideActionDetails",
  }) as any as S.Schema<AwsWafRegionalWebAclRulesListOverrideActionDetails>;
export interface AwsWafRegionalWebAclRulesListDetails {
  Action?: AwsWafRegionalWebAclRulesListActionDetails;
  OverrideAction?: AwsWafRegionalWebAclRulesListOverrideActionDetails;
  Priority?: number;
  RuleId?: string;
  Type?: string;
}
export const AwsWafRegionalWebAclRulesListDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Action: S.optional(AwsWafRegionalWebAclRulesListActionDetails),
      OverrideAction: S.optional(
        AwsWafRegionalWebAclRulesListOverrideActionDetails,
      ),
      Priority: S.optional(S.Number),
      RuleId: S.optional(S.String),
      Type: S.optional(S.String),
    }),
).annotate({
  identifier: "AwsWafRegionalWebAclRulesListDetails",
}) as any as S.Schema<AwsWafRegionalWebAclRulesListDetails>;
export type AwsWafRegionalWebAclRulesList =
  AwsWafRegionalWebAclRulesListDetails[];
export const AwsWafRegionalWebAclRulesList = /*@__PURE__*/ S.Array(
  AwsWafRegionalWebAclRulesListDetails,
);
export interface AwsWafRegionalWebAclDetails {
  DefaultAction?: string;
  MetricName?: string;
  Name?: string;
  RulesList?: AwsWafRegionalWebAclRulesListDetails[];
  WebAclId?: string;
}
export const AwsWafRegionalWebAclDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultAction: S.optional(S.String),
    MetricName: S.optional(S.String),
    Name: S.optional(S.String),
    RulesList: S.optional(AwsWafRegionalWebAclRulesList),
    WebAclId: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsWafRegionalWebAclDetails",
}) as any as S.Schema<AwsWafRegionalWebAclDetails>;
export interface AwsWafRulePredicateListDetails {
  DataId?: string;
  Negated?: boolean;
  Type?: string;
}
export const AwsWafRulePredicateListDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataId: S.optional(S.String),
    Negated: S.optional(S.Boolean),
    Type: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsWafRulePredicateListDetails",
}) as any as S.Schema<AwsWafRulePredicateListDetails>;
export type AwsWafRulePredicateList = AwsWafRulePredicateListDetails[];
export const AwsWafRulePredicateList = /*@__PURE__*/ S.Array(
  AwsWafRulePredicateListDetails,
);
export interface AwsWafRuleDetails {
  MetricName?: string;
  Name?: string;
  PredicateList?: AwsWafRulePredicateListDetails[];
  RuleId?: string;
}
export const AwsWafRuleDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetricName: S.optional(S.String),
    Name: S.optional(S.String),
    PredicateList: S.optional(AwsWafRulePredicateList),
    RuleId: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsWafRuleDetails",
}) as any as S.Schema<AwsWafRuleDetails>;
export interface AwsWafRuleGroupRulesActionDetails {
  Type?: string;
}
export const AwsWafRuleGroupRulesActionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: S.optional(S.String) }),
).annotate({
  identifier: "AwsWafRuleGroupRulesActionDetails",
}) as any as S.Schema<AwsWafRuleGroupRulesActionDetails>;
export interface AwsWafRuleGroupRulesDetails {
  Action?: AwsWafRuleGroupRulesActionDetails;
  Priority?: number;
  RuleId?: string;
  Type?: string;
}
export const AwsWafRuleGroupRulesDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.optional(AwsWafRuleGroupRulesActionDetails),
    Priority: S.optional(S.Number),
    RuleId: S.optional(S.String),
    Type: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsWafRuleGroupRulesDetails",
}) as any as S.Schema<AwsWafRuleGroupRulesDetails>;
export type AwsWafRuleGroupRulesList = AwsWafRuleGroupRulesDetails[];
export const AwsWafRuleGroupRulesList = /*@__PURE__*/ S.Array(
  AwsWafRuleGroupRulesDetails,
);
export interface AwsWafRuleGroupDetails {
  MetricName?: string;
  Name?: string;
  RuleGroupId?: string;
  Rules?: AwsWafRuleGroupRulesDetails[];
}
export const AwsWafRuleGroupDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetricName: S.optional(S.String),
    Name: S.optional(S.String),
    RuleGroupId: S.optional(S.String),
    Rules: S.optional(AwsWafRuleGroupRulesList),
  }),
).annotate({
  identifier: "AwsWafRuleGroupDetails",
}) as any as S.Schema<AwsWafRuleGroupDetails>;
export interface AwsEcsTaskVolumeHostDetails {
  SourcePath?: string;
}
export const AwsEcsTaskVolumeHostDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SourcePath: S.optional(S.String) }),
).annotate({
  identifier: "AwsEcsTaskVolumeHostDetails",
}) as any as S.Schema<AwsEcsTaskVolumeHostDetails>;
export interface AwsEcsTaskVolumeDetails {
  Name?: string;
  Host?: AwsEcsTaskVolumeHostDetails;
}
export const AwsEcsTaskVolumeDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Host: S.optional(AwsEcsTaskVolumeHostDetails),
  }),
).annotate({
  identifier: "AwsEcsTaskVolumeDetails",
}) as any as S.Schema<AwsEcsTaskVolumeDetails>;
export type AwsEcsTaskVolumeDetailsList = AwsEcsTaskVolumeDetails[];
export const AwsEcsTaskVolumeDetailsList = /*@__PURE__*/ S.Array(
  AwsEcsTaskVolumeDetails,
);
export type AwsEcsContainerDetailsList = AwsEcsContainerDetails[];
export const AwsEcsContainerDetailsList = /*@__PURE__*/ S.Array(
  AwsEcsContainerDetails,
);
export interface AwsEcsTaskDetails {
  ClusterArn?: string;
  TaskDefinitionArn?: string;
  Version?: string;
  CreatedAt?: string;
  StartedAt?: string;
  StartedBy?: string;
  Group?: string;
  Volumes?: AwsEcsTaskVolumeDetails[];
  Containers?: AwsEcsContainerDetails[];
}
export const AwsEcsTaskDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterArn: S.optional(S.String),
    TaskDefinitionArn: S.optional(S.String),
    Version: S.optional(S.String),
    CreatedAt: S.optional(S.String),
    StartedAt: S.optional(S.String),
    StartedBy: S.optional(S.String),
    Group: S.optional(S.String),
    Volumes: S.optional(AwsEcsTaskVolumeDetailsList),
    Containers: S.optional(AwsEcsContainerDetailsList),
  }),
).annotate({
  identifier: "AwsEcsTaskDetails",
}) as any as S.Schema<AwsEcsTaskDetails>;
export interface AwsBackupBackupVaultNotificationsDetails {
  BackupVaultEvents?: string[];
  SnsTopicArn?: string;
}
export const AwsBackupBackupVaultNotificationsDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      BackupVaultEvents: S.optional(NonEmptyStringList),
      SnsTopicArn: S.optional(S.String),
    }),
).annotate({
  identifier: "AwsBackupBackupVaultNotificationsDetails",
}) as any as S.Schema<AwsBackupBackupVaultNotificationsDetails>;
export interface AwsBackupBackupVaultDetails {
  BackupVaultArn?: string;
  BackupVaultName?: string;
  EncryptionKeyArn?: string;
  Notifications?: AwsBackupBackupVaultNotificationsDetails;
  AccessPolicy?: string;
}
export const AwsBackupBackupVaultDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BackupVaultArn: S.optional(S.String),
    BackupVaultName: S.optional(S.String),
    EncryptionKeyArn: S.optional(S.String),
    Notifications: S.optional(AwsBackupBackupVaultNotificationsDetails),
    AccessPolicy: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsBackupBackupVaultDetails",
}) as any as S.Schema<AwsBackupBackupVaultDetails>;
export interface AwsBackupBackupPlanAdvancedBackupSettingsDetails {
  BackupOptions?: { [key: string]: string | undefined };
  ResourceType?: string;
}
export const AwsBackupBackupPlanAdvancedBackupSettingsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      BackupOptions: S.optional(FieldMap),
      ResourceType: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsBackupBackupPlanAdvancedBackupSettingsDetails",
  }) as any as S.Schema<AwsBackupBackupPlanAdvancedBackupSettingsDetails>;
export type AwsBackupBackupPlanAdvancedBackupSettingsList =
  AwsBackupBackupPlanAdvancedBackupSettingsDetails[];
export const AwsBackupBackupPlanAdvancedBackupSettingsList =
  /*@__PURE__*/ S.Array(AwsBackupBackupPlanAdvancedBackupSettingsDetails);
export interface AwsBackupBackupPlanLifecycleDetails {
  DeleteAfterDays?: number;
  MoveToColdStorageAfterDays?: number;
}
export const AwsBackupBackupPlanLifecycleDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeleteAfterDays: S.optional(S.Number),
    MoveToColdStorageAfterDays: S.optional(S.Number),
  }),
).annotate({
  identifier: "AwsBackupBackupPlanLifecycleDetails",
}) as any as S.Schema<AwsBackupBackupPlanLifecycleDetails>;
export interface AwsBackupBackupPlanRuleCopyActionsDetails {
  DestinationBackupVaultArn?: string;
  Lifecycle?: AwsBackupBackupPlanLifecycleDetails;
}
export const AwsBackupBackupPlanRuleCopyActionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DestinationBackupVaultArn: S.optional(S.String),
      Lifecycle: S.optional(AwsBackupBackupPlanLifecycleDetails),
    }),
  ).annotate({
    identifier: "AwsBackupBackupPlanRuleCopyActionsDetails",
  }) as any as S.Schema<AwsBackupBackupPlanRuleCopyActionsDetails>;
export type AwsBackupBackupPlanRuleCopyActionsList =
  AwsBackupBackupPlanRuleCopyActionsDetails[];
export const AwsBackupBackupPlanRuleCopyActionsList = /*@__PURE__*/ S.Array(
  AwsBackupBackupPlanRuleCopyActionsDetails,
);
export interface AwsBackupBackupPlanRuleDetails {
  TargetBackupVault?: string;
  StartWindowMinutes?: number;
  ScheduleExpression?: string;
  RuleName?: string;
  RuleId?: string;
  EnableContinuousBackup?: boolean;
  CompletionWindowMinutes?: number;
  CopyActions?: AwsBackupBackupPlanRuleCopyActionsDetails[];
  Lifecycle?: AwsBackupBackupPlanLifecycleDetails;
}
export const AwsBackupBackupPlanRuleDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetBackupVault: S.optional(S.String),
    StartWindowMinutes: S.optional(S.Number),
    ScheduleExpression: S.optional(S.String),
    RuleName: S.optional(S.String),
    RuleId: S.optional(S.String),
    EnableContinuousBackup: S.optional(S.Boolean),
    CompletionWindowMinutes: S.optional(S.Number),
    CopyActions: S.optional(AwsBackupBackupPlanRuleCopyActionsList),
    Lifecycle: S.optional(AwsBackupBackupPlanLifecycleDetails),
  }),
).annotate({
  identifier: "AwsBackupBackupPlanRuleDetails",
}) as any as S.Schema<AwsBackupBackupPlanRuleDetails>;
export type AwsBackupBackupPlanRuleList = AwsBackupBackupPlanRuleDetails[];
export const AwsBackupBackupPlanRuleList = /*@__PURE__*/ S.Array(
  AwsBackupBackupPlanRuleDetails,
);
export interface AwsBackupBackupPlanBackupPlanDetails {
  BackupPlanName?: string;
  AdvancedBackupSettings?: AwsBackupBackupPlanAdvancedBackupSettingsDetails[];
  BackupPlanRule?: AwsBackupBackupPlanRuleDetails[];
}
export const AwsBackupBackupPlanBackupPlanDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      BackupPlanName: S.optional(S.String),
      AdvancedBackupSettings: S.optional(
        AwsBackupBackupPlanAdvancedBackupSettingsList,
      ),
      BackupPlanRule: S.optional(AwsBackupBackupPlanRuleList),
    }),
).annotate({
  identifier: "AwsBackupBackupPlanBackupPlanDetails",
}) as any as S.Schema<AwsBackupBackupPlanBackupPlanDetails>;
export interface AwsBackupBackupPlanDetails {
  BackupPlan?: AwsBackupBackupPlanBackupPlanDetails;
  BackupPlanArn?: string;
  BackupPlanId?: string;
  VersionId?: string;
}
export const AwsBackupBackupPlanDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BackupPlan: S.optional(AwsBackupBackupPlanBackupPlanDetails),
    BackupPlanArn: S.optional(S.String),
    BackupPlanId: S.optional(S.String),
    VersionId: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsBackupBackupPlanDetails",
}) as any as S.Schema<AwsBackupBackupPlanDetails>;
export interface AwsBackupRecoveryPointCalculatedLifecycleDetails {
  DeleteAt?: string;
  MoveToColdStorageAt?: string;
}
export const AwsBackupRecoveryPointCalculatedLifecycleDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DeleteAt: S.optional(S.String),
      MoveToColdStorageAt: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsBackupRecoveryPointCalculatedLifecycleDetails",
  }) as any as S.Schema<AwsBackupRecoveryPointCalculatedLifecycleDetails>;
export interface AwsBackupRecoveryPointCreatedByDetails {
  BackupPlanArn?: string;
  BackupPlanId?: string;
  BackupPlanVersion?: string;
  BackupRuleId?: string;
}
export const AwsBackupRecoveryPointCreatedByDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      BackupPlanArn: S.optional(S.String),
      BackupPlanId: S.optional(S.String),
      BackupPlanVersion: S.optional(S.String),
      BackupRuleId: S.optional(S.String),
    }),
).annotate({
  identifier: "AwsBackupRecoveryPointCreatedByDetails",
}) as any as S.Schema<AwsBackupRecoveryPointCreatedByDetails>;
export interface AwsBackupRecoveryPointLifecycleDetails {
  DeleteAfterDays?: number;
  MoveToColdStorageAfterDays?: number;
}
export const AwsBackupRecoveryPointLifecycleDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DeleteAfterDays: S.optional(S.Number),
      MoveToColdStorageAfterDays: S.optional(S.Number),
    }),
).annotate({
  identifier: "AwsBackupRecoveryPointLifecycleDetails",
}) as any as S.Schema<AwsBackupRecoveryPointLifecycleDetails>;
export interface AwsBackupRecoveryPointDetails {
  BackupSizeInBytes?: number;
  BackupVaultArn?: string;
  BackupVaultName?: string;
  CalculatedLifecycle?: AwsBackupRecoveryPointCalculatedLifecycleDetails;
  CompletionDate?: string;
  CreatedBy?: AwsBackupRecoveryPointCreatedByDetails;
  CreationDate?: string;
  EncryptionKeyArn?: string;
  IamRoleArn?: string;
  IsEncrypted?: boolean;
  LastRestoreTime?: string;
  Lifecycle?: AwsBackupRecoveryPointLifecycleDetails;
  RecoveryPointArn?: string;
  ResourceArn?: string;
  ResourceType?: string;
  SourceBackupVaultArn?: string;
  Status?: string;
  StatusMessage?: string;
  StorageClass?: string;
}
export const AwsBackupRecoveryPointDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BackupSizeInBytes: S.optional(S.Number),
    BackupVaultArn: S.optional(S.String),
    BackupVaultName: S.optional(S.String),
    CalculatedLifecycle: S.optional(
      AwsBackupRecoveryPointCalculatedLifecycleDetails,
    ),
    CompletionDate: S.optional(S.String),
    CreatedBy: S.optional(AwsBackupRecoveryPointCreatedByDetails),
    CreationDate: S.optional(S.String),
    EncryptionKeyArn: S.optional(S.String),
    IamRoleArn: S.optional(S.String),
    IsEncrypted: S.optional(S.Boolean),
    LastRestoreTime: S.optional(S.String),
    Lifecycle: S.optional(AwsBackupRecoveryPointLifecycleDetails),
    RecoveryPointArn: S.optional(S.String),
    ResourceArn: S.optional(S.String),
    ResourceType: S.optional(S.String),
    SourceBackupVaultArn: S.optional(S.String),
    Status: S.optional(S.String),
    StatusMessage: S.optional(S.String),
    StorageClass: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsBackupRecoveryPointDetails",
}) as any as S.Schema<AwsBackupRecoveryPointDetails>;
export interface AwsEc2LaunchTemplateDataBlockDeviceMappingSetEbsDetails {
  DeleteOnTermination?: boolean;
  Encrypted?: boolean;
  Iops?: number;
  KmsKeyId?: string;
  SnapshotId?: string;
  Throughput?: number;
  VolumeSize?: number;
  VolumeType?: string;
}
export const AwsEc2LaunchTemplateDataBlockDeviceMappingSetEbsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DeleteOnTermination: S.optional(S.Boolean),
      Encrypted: S.optional(S.Boolean),
      Iops: S.optional(S.Number),
      KmsKeyId: S.optional(S.String),
      SnapshotId: S.optional(S.String),
      Throughput: S.optional(S.Number),
      VolumeSize: S.optional(S.Number),
      VolumeType: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsEc2LaunchTemplateDataBlockDeviceMappingSetEbsDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataBlockDeviceMappingSetEbsDetails>;
export interface AwsEc2LaunchTemplateDataBlockDeviceMappingSetDetails {
  DeviceName?: string;
  Ebs?: AwsEc2LaunchTemplateDataBlockDeviceMappingSetEbsDetails;
  NoDevice?: string;
  VirtualName?: string;
}
export const AwsEc2LaunchTemplateDataBlockDeviceMappingSetDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DeviceName: S.optional(S.String),
      Ebs: S.optional(AwsEc2LaunchTemplateDataBlockDeviceMappingSetEbsDetails),
      NoDevice: S.optional(S.String),
      VirtualName: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsEc2LaunchTemplateDataBlockDeviceMappingSetDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataBlockDeviceMappingSetDetails>;
export type AwsEc2LaunchTemplateDataBlockDeviceMappingSetList =
  AwsEc2LaunchTemplateDataBlockDeviceMappingSetDetails[];
export const AwsEc2LaunchTemplateDataBlockDeviceMappingSetList =
  /*@__PURE__*/ S.Array(AwsEc2LaunchTemplateDataBlockDeviceMappingSetDetails);
export interface AwsEc2LaunchTemplateDataCapacityReservationSpecificationCapacityReservationTargetDetails {
  CapacityReservationId?: string;
  CapacityReservationResourceGroupArn?: string;
}
export const AwsEc2LaunchTemplateDataCapacityReservationSpecificationCapacityReservationTargetDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CapacityReservationId: S.optional(S.String),
      CapacityReservationResourceGroupArn: S.optional(S.String),
    }),
  ).annotate({
    identifier:
      "AwsEc2LaunchTemplateDataCapacityReservationSpecificationCapacityReservationTargetDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataCapacityReservationSpecificationCapacityReservationTargetDetails>;
export interface AwsEc2LaunchTemplateDataCapacityReservationSpecificationDetails {
  CapacityReservationPreference?: string;
  CapacityReservationTarget?: AwsEc2LaunchTemplateDataCapacityReservationSpecificationCapacityReservationTargetDetails;
}
export const AwsEc2LaunchTemplateDataCapacityReservationSpecificationDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CapacityReservationPreference: S.optional(S.String),
      CapacityReservationTarget: S.optional(
        AwsEc2LaunchTemplateDataCapacityReservationSpecificationCapacityReservationTargetDetails,
      ),
    }),
  ).annotate({
    identifier:
      "AwsEc2LaunchTemplateDataCapacityReservationSpecificationDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataCapacityReservationSpecificationDetails>;
export interface AwsEc2LaunchTemplateDataCpuOptionsDetails {
  CoreCount?: number;
  ThreadsPerCore?: number;
}
export const AwsEc2LaunchTemplateDataCpuOptionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CoreCount: S.optional(S.Number),
      ThreadsPerCore: S.optional(S.Number),
    }),
  ).annotate({
    identifier: "AwsEc2LaunchTemplateDataCpuOptionsDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataCpuOptionsDetails>;
export interface AwsEc2LaunchTemplateDataCreditSpecificationDetails {
  CpuCredits?: string;
}
export const AwsEc2LaunchTemplateDataCreditSpecificationDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ CpuCredits: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsEc2LaunchTemplateDataCreditSpecificationDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataCreditSpecificationDetails>;
export interface AwsEc2LaunchTemplateDataElasticGpuSpecificationSetDetails {
  Type?: string;
}
export const AwsEc2LaunchTemplateDataElasticGpuSpecificationSetDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Type: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsEc2LaunchTemplateDataElasticGpuSpecificationSetDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataElasticGpuSpecificationSetDetails>;
export type AwsEc2LaunchTemplateDataElasticGpuSpecificationSetList =
  AwsEc2LaunchTemplateDataElasticGpuSpecificationSetDetails[];
export const AwsEc2LaunchTemplateDataElasticGpuSpecificationSetList =
  /*@__PURE__*/ S.Array(
    AwsEc2LaunchTemplateDataElasticGpuSpecificationSetDetails,
  );
export interface AwsEc2LaunchTemplateDataElasticInferenceAcceleratorSetDetails {
  Count?: number;
  Type?: string;
}
export const AwsEc2LaunchTemplateDataElasticInferenceAcceleratorSetDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Count: S.optional(S.Number), Type: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsEc2LaunchTemplateDataElasticInferenceAcceleratorSetDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataElasticInferenceAcceleratorSetDetails>;
export type AwsEc2LaunchTemplateDataElasticInferenceAcceleratorSetList =
  AwsEc2LaunchTemplateDataElasticInferenceAcceleratorSetDetails[];
export const AwsEc2LaunchTemplateDataElasticInferenceAcceleratorSetList =
  /*@__PURE__*/ S.Array(
    AwsEc2LaunchTemplateDataElasticInferenceAcceleratorSetDetails,
  );
export interface AwsEc2LaunchTemplateDataEnclaveOptionsDetails {
  Enabled?: boolean;
}
export const AwsEc2LaunchTemplateDataEnclaveOptionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Enabled: S.optional(S.Boolean) }),
  ).annotate({
    identifier: "AwsEc2LaunchTemplateDataEnclaveOptionsDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataEnclaveOptionsDetails>;
export interface AwsEc2LaunchTemplateDataHibernationOptionsDetails {
  Configured?: boolean;
}
export const AwsEc2LaunchTemplateDataHibernationOptionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Configured: S.optional(S.Boolean) }),
  ).annotate({
    identifier: "AwsEc2LaunchTemplateDataHibernationOptionsDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataHibernationOptionsDetails>;
export interface AwsEc2LaunchTemplateDataIamInstanceProfileDetails {
  Arn?: string;
  Name?: string;
}
export const AwsEc2LaunchTemplateDataIamInstanceProfileDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Arn: S.optional(S.String), Name: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsEc2LaunchTemplateDataIamInstanceProfileDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataIamInstanceProfileDetails>;
export interface AwsEc2LaunchTemplateDataInstanceMarketOptionsSpotOptionsDetails {
  BlockDurationMinutes?: number;
  InstanceInterruptionBehavior?: string;
  MaxPrice?: string;
  SpotInstanceType?: string;
  ValidUntil?: string;
}
export const AwsEc2LaunchTemplateDataInstanceMarketOptionsSpotOptionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      BlockDurationMinutes: S.optional(S.Number),
      InstanceInterruptionBehavior: S.optional(S.String),
      MaxPrice: S.optional(S.String),
      SpotInstanceType: S.optional(S.String),
      ValidUntil: S.optional(S.String),
    }),
  ).annotate({
    identifier:
      "AwsEc2LaunchTemplateDataInstanceMarketOptionsSpotOptionsDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataInstanceMarketOptionsSpotOptionsDetails>;
export interface AwsEc2LaunchTemplateDataInstanceMarketOptionsDetails {
  MarketType?: string;
  SpotOptions?: AwsEc2LaunchTemplateDataInstanceMarketOptionsSpotOptionsDetails;
}
export const AwsEc2LaunchTemplateDataInstanceMarketOptionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      MarketType: S.optional(S.String),
      SpotOptions: S.optional(
        AwsEc2LaunchTemplateDataInstanceMarketOptionsSpotOptionsDetails,
      ),
    }),
  ).annotate({
    identifier: "AwsEc2LaunchTemplateDataInstanceMarketOptionsDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataInstanceMarketOptionsDetails>;
export interface AwsEc2LaunchTemplateDataInstanceRequirementsAcceleratorCountDetails {
  Max?: number;
  Min?: number;
}
export const AwsEc2LaunchTemplateDataInstanceRequirementsAcceleratorCountDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Max: S.optional(S.Number), Min: S.optional(S.Number) }),
  ).annotate({
    identifier:
      "AwsEc2LaunchTemplateDataInstanceRequirementsAcceleratorCountDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataInstanceRequirementsAcceleratorCountDetails>;
export interface AwsEc2LaunchTemplateDataInstanceRequirementsAcceleratorTotalMemoryMiBDetails {
  Max?: number;
  Min?: number;
}
export const AwsEc2LaunchTemplateDataInstanceRequirementsAcceleratorTotalMemoryMiBDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Max: S.optional(S.Number), Min: S.optional(S.Number) }),
  ).annotate({
    identifier:
      "AwsEc2LaunchTemplateDataInstanceRequirementsAcceleratorTotalMemoryMiBDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataInstanceRequirementsAcceleratorTotalMemoryMiBDetails>;
export interface AwsEc2LaunchTemplateDataInstanceRequirementsBaselineEbsBandwidthMbpsDetails {
  Max?: number;
  Min?: number;
}
export const AwsEc2LaunchTemplateDataInstanceRequirementsBaselineEbsBandwidthMbpsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Max: S.optional(S.Number), Min: S.optional(S.Number) }),
  ).annotate({
    identifier:
      "AwsEc2LaunchTemplateDataInstanceRequirementsBaselineEbsBandwidthMbpsDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataInstanceRequirementsBaselineEbsBandwidthMbpsDetails>;
export interface AwsEc2LaunchTemplateDataInstanceRequirementsMemoryGiBPerVCpuDetails {
  Max?: number;
  Min?: number;
}
export const AwsEc2LaunchTemplateDataInstanceRequirementsMemoryGiBPerVCpuDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Max: S.optional(S.Number), Min: S.optional(S.Number) }),
  ).annotate({
    identifier:
      "AwsEc2LaunchTemplateDataInstanceRequirementsMemoryGiBPerVCpuDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataInstanceRequirementsMemoryGiBPerVCpuDetails>;
export interface AwsEc2LaunchTemplateDataInstanceRequirementsMemoryMiBDetails {
  Max?: number;
  Min?: number;
}
export const AwsEc2LaunchTemplateDataInstanceRequirementsMemoryMiBDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Max: S.optional(S.Number), Min: S.optional(S.Number) }),
  ).annotate({
    identifier: "AwsEc2LaunchTemplateDataInstanceRequirementsMemoryMiBDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataInstanceRequirementsMemoryMiBDetails>;
export interface AwsEc2LaunchTemplateDataInstanceRequirementsNetworkInterfaceCountDetails {
  Max?: number;
  Min?: number;
}
export const AwsEc2LaunchTemplateDataInstanceRequirementsNetworkInterfaceCountDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Max: S.optional(S.Number), Min: S.optional(S.Number) }),
  ).annotate({
    identifier:
      "AwsEc2LaunchTemplateDataInstanceRequirementsNetworkInterfaceCountDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataInstanceRequirementsNetworkInterfaceCountDetails>;
export interface AwsEc2LaunchTemplateDataInstanceRequirementsTotalLocalStorageGBDetails {
  Max?: number;
  Min?: number;
}
export const AwsEc2LaunchTemplateDataInstanceRequirementsTotalLocalStorageGBDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Max: S.optional(S.Number), Min: S.optional(S.Number) }),
  ).annotate({
    identifier:
      "AwsEc2LaunchTemplateDataInstanceRequirementsTotalLocalStorageGBDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataInstanceRequirementsTotalLocalStorageGBDetails>;
export interface AwsEc2LaunchTemplateDataInstanceRequirementsVCpuCountDetails {
  Max?: number;
  Min?: number;
}
export const AwsEc2LaunchTemplateDataInstanceRequirementsVCpuCountDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Max: S.optional(S.Number), Min: S.optional(S.Number) }),
  ).annotate({
    identifier: "AwsEc2LaunchTemplateDataInstanceRequirementsVCpuCountDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataInstanceRequirementsVCpuCountDetails>;
export interface AwsEc2LaunchTemplateDataInstanceRequirementsDetails {
  AcceleratorCount?: AwsEc2LaunchTemplateDataInstanceRequirementsAcceleratorCountDetails;
  AcceleratorManufacturers?: string[];
  AcceleratorNames?: string[];
  AcceleratorTotalMemoryMiB?: AwsEc2LaunchTemplateDataInstanceRequirementsAcceleratorTotalMemoryMiBDetails;
  AcceleratorTypes?: string[];
  BareMetal?: string;
  BaselineEbsBandwidthMbps?: AwsEc2LaunchTemplateDataInstanceRequirementsBaselineEbsBandwidthMbpsDetails;
  BurstablePerformance?: string;
  CpuManufacturers?: string[];
  ExcludedInstanceTypes?: string[];
  InstanceGenerations?: string[];
  LocalStorage?: string;
  LocalStorageTypes?: string[];
  MemoryGiBPerVCpu?: AwsEc2LaunchTemplateDataInstanceRequirementsMemoryGiBPerVCpuDetails;
  MemoryMiB?: AwsEc2LaunchTemplateDataInstanceRequirementsMemoryMiBDetails;
  NetworkInterfaceCount?: AwsEc2LaunchTemplateDataInstanceRequirementsNetworkInterfaceCountDetails;
  OnDemandMaxPricePercentageOverLowestPrice?: number;
  RequireHibernateSupport?: boolean;
  SpotMaxPricePercentageOverLowestPrice?: number;
  TotalLocalStorageGB?: AwsEc2LaunchTemplateDataInstanceRequirementsTotalLocalStorageGBDetails;
  VCpuCount?: AwsEc2LaunchTemplateDataInstanceRequirementsVCpuCountDetails;
}
export const AwsEc2LaunchTemplateDataInstanceRequirementsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AcceleratorCount: S.optional(
        AwsEc2LaunchTemplateDataInstanceRequirementsAcceleratorCountDetails,
      ),
      AcceleratorManufacturers: S.optional(NonEmptyStringList),
      AcceleratorNames: S.optional(NonEmptyStringList),
      AcceleratorTotalMemoryMiB: S.optional(
        AwsEc2LaunchTemplateDataInstanceRequirementsAcceleratorTotalMemoryMiBDetails,
      ),
      AcceleratorTypes: S.optional(NonEmptyStringList),
      BareMetal: S.optional(S.String),
      BaselineEbsBandwidthMbps: S.optional(
        AwsEc2LaunchTemplateDataInstanceRequirementsBaselineEbsBandwidthMbpsDetails,
      ),
      BurstablePerformance: S.optional(S.String),
      CpuManufacturers: S.optional(NonEmptyStringList),
      ExcludedInstanceTypes: S.optional(NonEmptyStringList),
      InstanceGenerations: S.optional(NonEmptyStringList),
      LocalStorage: S.optional(S.String),
      LocalStorageTypes: S.optional(NonEmptyStringList),
      MemoryGiBPerVCpu: S.optional(
        AwsEc2LaunchTemplateDataInstanceRequirementsMemoryGiBPerVCpuDetails,
      ),
      MemoryMiB: S.optional(
        AwsEc2LaunchTemplateDataInstanceRequirementsMemoryMiBDetails,
      ),
      NetworkInterfaceCount: S.optional(
        AwsEc2LaunchTemplateDataInstanceRequirementsNetworkInterfaceCountDetails,
      ),
      OnDemandMaxPricePercentageOverLowestPrice: S.optional(S.Number),
      RequireHibernateSupport: S.optional(S.Boolean),
      SpotMaxPricePercentageOverLowestPrice: S.optional(S.Number),
      TotalLocalStorageGB: S.optional(
        AwsEc2LaunchTemplateDataInstanceRequirementsTotalLocalStorageGBDetails,
      ),
      VCpuCount: S.optional(
        AwsEc2LaunchTemplateDataInstanceRequirementsVCpuCountDetails,
      ),
    }),
  ).annotate({
    identifier: "AwsEc2LaunchTemplateDataInstanceRequirementsDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataInstanceRequirementsDetails>;
export interface AwsEc2LaunchTemplateDataLicenseSetDetails {
  LicenseConfigurationArn?: string;
}
export const AwsEc2LaunchTemplateDataLicenseSetDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ LicenseConfigurationArn: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsEc2LaunchTemplateDataLicenseSetDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataLicenseSetDetails>;
export type AwsEc2LaunchTemplateDataLicenseSetList =
  AwsEc2LaunchTemplateDataLicenseSetDetails[];
export const AwsEc2LaunchTemplateDataLicenseSetList = /*@__PURE__*/ S.Array(
  AwsEc2LaunchTemplateDataLicenseSetDetails,
);
export interface AwsEc2LaunchTemplateDataMaintenanceOptionsDetails {
  AutoRecovery?: string;
}
export const AwsEc2LaunchTemplateDataMaintenanceOptionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ AutoRecovery: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsEc2LaunchTemplateDataMaintenanceOptionsDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataMaintenanceOptionsDetails>;
export interface AwsEc2LaunchTemplateDataMetadataOptionsDetails {
  HttpEndpoint?: string;
  HttpProtocolIpv6?: string;
  HttpTokens?: string;
  HttpPutResponseHopLimit?: number;
  InstanceMetadataTags?: string;
}
export const AwsEc2LaunchTemplateDataMetadataOptionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      HttpEndpoint: S.optional(S.String),
      HttpProtocolIpv6: S.optional(S.String),
      HttpTokens: S.optional(S.String),
      HttpPutResponseHopLimit: S.optional(S.Number),
      InstanceMetadataTags: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsEc2LaunchTemplateDataMetadataOptionsDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataMetadataOptionsDetails>;
export interface AwsEc2LaunchTemplateDataMonitoringDetails {
  Enabled?: boolean;
}
export const AwsEc2LaunchTemplateDataMonitoringDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Enabled: S.optional(S.Boolean) }),
  ).annotate({
    identifier: "AwsEc2LaunchTemplateDataMonitoringDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataMonitoringDetails>;
export interface AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv4PrefixesDetails {
  Ipv4Prefix?: string;
}
export const AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv4PrefixesDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Ipv4Prefix: S.optional(S.String) }),
  ).annotate({
    identifier:
      "AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv4PrefixesDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv4PrefixesDetails>;
export type AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv4PrefixesList =
  AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv4PrefixesDetails[];
export const AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv4PrefixesList =
  /*@__PURE__*/ S.Array(
    AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv4PrefixesDetails,
  );
export interface AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6AddressesDetails {
  Ipv6Address?: string;
}
export const AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6AddressesDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Ipv6Address: S.optional(S.String) }),
  ).annotate({
    identifier:
      "AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6AddressesDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6AddressesDetails>;
export type AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6AddressesList =
  AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6AddressesDetails[];
export const AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6AddressesList =
  /*@__PURE__*/ S.Array(
    AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6AddressesDetails,
  );
export interface AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6PrefixesDetails {
  Ipv6Prefix?: string;
}
export const AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6PrefixesDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Ipv6Prefix: S.optional(S.String) }),
  ).annotate({
    identifier:
      "AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6PrefixesDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6PrefixesDetails>;
export type AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6PrefixesList =
  AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6PrefixesDetails[];
export const AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6PrefixesList =
  /*@__PURE__*/ S.Array(
    AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6PrefixesDetails,
  );
export interface AwsEc2LaunchTemplateDataNetworkInterfaceSetPrivateIpAddressesDetails {
  Primary?: boolean;
  PrivateIpAddress?: string;
}
export const AwsEc2LaunchTemplateDataNetworkInterfaceSetPrivateIpAddressesDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Primary: S.optional(S.Boolean),
      PrivateIpAddress: S.optional(S.String),
    }),
  ).annotate({
    identifier:
      "AwsEc2LaunchTemplateDataNetworkInterfaceSetPrivateIpAddressesDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataNetworkInterfaceSetPrivateIpAddressesDetails>;
export type AwsEc2LaunchTemplateDataNetworkInterfaceSetPrivateIpAddressesList =
  AwsEc2LaunchTemplateDataNetworkInterfaceSetPrivateIpAddressesDetails[];
export const AwsEc2LaunchTemplateDataNetworkInterfaceSetPrivateIpAddressesList =
  /*@__PURE__*/ S.Array(
    AwsEc2LaunchTemplateDataNetworkInterfaceSetPrivateIpAddressesDetails,
  );
export interface AwsEc2LaunchTemplateDataNetworkInterfaceSetDetails {
  AssociateCarrierIpAddress?: boolean;
  AssociatePublicIpAddress?: boolean;
  DeleteOnTermination?: boolean;
  Description?: string;
  DeviceIndex?: number;
  Groups?: string[];
  InterfaceType?: string;
  Ipv4PrefixCount?: number;
  Ipv4Prefixes?: AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv4PrefixesDetails[];
  Ipv6AddressCount?: number;
  Ipv6Addresses?: AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6AddressesDetails[];
  Ipv6PrefixCount?: number;
  Ipv6Prefixes?: AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6PrefixesDetails[];
  NetworkCardIndex?: number;
  NetworkInterfaceId?: string;
  PrivateIpAddress?: string;
  PrivateIpAddresses?: AwsEc2LaunchTemplateDataNetworkInterfaceSetPrivateIpAddressesDetails[];
  SecondaryPrivateIpAddressCount?: number;
  SubnetId?: string;
}
export const AwsEc2LaunchTemplateDataNetworkInterfaceSetDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AssociateCarrierIpAddress: S.optional(S.Boolean),
      AssociatePublicIpAddress: S.optional(S.Boolean),
      DeleteOnTermination: S.optional(S.Boolean),
      Description: S.optional(S.String),
      DeviceIndex: S.optional(S.Number),
      Groups: S.optional(NonEmptyStringList),
      InterfaceType: S.optional(S.String),
      Ipv4PrefixCount: S.optional(S.Number),
      Ipv4Prefixes: S.optional(
        AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv4PrefixesList,
      ),
      Ipv6AddressCount: S.optional(S.Number),
      Ipv6Addresses: S.optional(
        AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6AddressesList,
      ),
      Ipv6PrefixCount: S.optional(S.Number),
      Ipv6Prefixes: S.optional(
        AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6PrefixesList,
      ),
      NetworkCardIndex: S.optional(S.Number),
      NetworkInterfaceId: S.optional(S.String),
      PrivateIpAddress: S.optional(S.String),
      PrivateIpAddresses: S.optional(
        AwsEc2LaunchTemplateDataNetworkInterfaceSetPrivateIpAddressesList,
      ),
      SecondaryPrivateIpAddressCount: S.optional(S.Number),
      SubnetId: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsEc2LaunchTemplateDataNetworkInterfaceSetDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataNetworkInterfaceSetDetails>;
export type AwsEc2LaunchTemplateDataNetworkInterfaceSetList =
  AwsEc2LaunchTemplateDataNetworkInterfaceSetDetails[];
export const AwsEc2LaunchTemplateDataNetworkInterfaceSetList =
  /*@__PURE__*/ S.Array(AwsEc2LaunchTemplateDataNetworkInterfaceSetDetails);
export interface AwsEc2LaunchTemplateDataPlacementDetails {
  Affinity?: string;
  AvailabilityZone?: string;
  GroupName?: string;
  HostId?: string;
  HostResourceGroupArn?: string;
  PartitionNumber?: number;
  SpreadDomain?: string;
  Tenancy?: string;
}
export const AwsEc2LaunchTemplateDataPlacementDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Affinity: S.optional(S.String),
      AvailabilityZone: S.optional(S.String),
      GroupName: S.optional(S.String),
      HostId: S.optional(S.String),
      HostResourceGroupArn: S.optional(S.String),
      PartitionNumber: S.optional(S.Number),
      SpreadDomain: S.optional(S.String),
      Tenancy: S.optional(S.String),
    }),
).annotate({
  identifier: "AwsEc2LaunchTemplateDataPlacementDetails",
}) as any as S.Schema<AwsEc2LaunchTemplateDataPlacementDetails>;
export interface AwsEc2LaunchTemplateDataPrivateDnsNameOptionsDetails {
  EnableResourceNameDnsAAAARecord?: boolean;
  EnableResourceNameDnsARecord?: boolean;
  HostnameType?: string;
}
export const AwsEc2LaunchTemplateDataPrivateDnsNameOptionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      EnableResourceNameDnsAAAARecord: S.optional(S.Boolean),
      EnableResourceNameDnsARecord: S.optional(S.Boolean),
      HostnameType: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsEc2LaunchTemplateDataPrivateDnsNameOptionsDetails",
  }) as any as S.Schema<AwsEc2LaunchTemplateDataPrivateDnsNameOptionsDetails>;
export interface AwsEc2LaunchTemplateDataDetails {
  BlockDeviceMappingSet?: AwsEc2LaunchTemplateDataBlockDeviceMappingSetDetails[];
  CapacityReservationSpecification?: AwsEc2LaunchTemplateDataCapacityReservationSpecificationDetails;
  CpuOptions?: AwsEc2LaunchTemplateDataCpuOptionsDetails;
  CreditSpecification?: AwsEc2LaunchTemplateDataCreditSpecificationDetails;
  DisableApiStop?: boolean;
  DisableApiTermination?: boolean;
  EbsOptimized?: boolean;
  ElasticGpuSpecificationSet?: AwsEc2LaunchTemplateDataElasticGpuSpecificationSetDetails[];
  ElasticInferenceAcceleratorSet?: AwsEc2LaunchTemplateDataElasticInferenceAcceleratorSetDetails[];
  EnclaveOptions?: AwsEc2LaunchTemplateDataEnclaveOptionsDetails;
  HibernationOptions?: AwsEc2LaunchTemplateDataHibernationOptionsDetails;
  IamInstanceProfile?: AwsEc2LaunchTemplateDataIamInstanceProfileDetails;
  ImageId?: string;
  InstanceInitiatedShutdownBehavior?: string;
  InstanceMarketOptions?: AwsEc2LaunchTemplateDataInstanceMarketOptionsDetails;
  InstanceRequirements?: AwsEc2LaunchTemplateDataInstanceRequirementsDetails;
  InstanceType?: string;
  KernelId?: string;
  KeyName?: string;
  LicenseSet?: AwsEc2LaunchTemplateDataLicenseSetDetails[];
  MaintenanceOptions?: AwsEc2LaunchTemplateDataMaintenanceOptionsDetails;
  MetadataOptions?: AwsEc2LaunchTemplateDataMetadataOptionsDetails;
  Monitoring?: AwsEc2LaunchTemplateDataMonitoringDetails;
  NetworkInterfaceSet?: AwsEc2LaunchTemplateDataNetworkInterfaceSetDetails[];
  Placement?: AwsEc2LaunchTemplateDataPlacementDetails;
  PrivateDnsNameOptions?: AwsEc2LaunchTemplateDataPrivateDnsNameOptionsDetails;
  RamDiskId?: string;
  SecurityGroupIdSet?: string[];
  SecurityGroupSet?: string[];
  UserData?: string;
}
export const AwsEc2LaunchTemplateDataDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BlockDeviceMappingSet: S.optional(
      AwsEc2LaunchTemplateDataBlockDeviceMappingSetList,
    ),
    CapacityReservationSpecification: S.optional(
      AwsEc2LaunchTemplateDataCapacityReservationSpecificationDetails,
    ),
    CpuOptions: S.optional(AwsEc2LaunchTemplateDataCpuOptionsDetails),
    CreditSpecification: S.optional(
      AwsEc2LaunchTemplateDataCreditSpecificationDetails,
    ),
    DisableApiStop: S.optional(S.Boolean),
    DisableApiTermination: S.optional(S.Boolean),
    EbsOptimized: S.optional(S.Boolean),
    ElasticGpuSpecificationSet: S.optional(
      AwsEc2LaunchTemplateDataElasticGpuSpecificationSetList,
    ),
    ElasticInferenceAcceleratorSet: S.optional(
      AwsEc2LaunchTemplateDataElasticInferenceAcceleratorSetList,
    ),
    EnclaveOptions: S.optional(AwsEc2LaunchTemplateDataEnclaveOptionsDetails),
    HibernationOptions: S.optional(
      AwsEc2LaunchTemplateDataHibernationOptionsDetails,
    ),
    IamInstanceProfile: S.optional(
      AwsEc2LaunchTemplateDataIamInstanceProfileDetails,
    ),
    ImageId: S.optional(S.String),
    InstanceInitiatedShutdownBehavior: S.optional(S.String),
    InstanceMarketOptions: S.optional(
      AwsEc2LaunchTemplateDataInstanceMarketOptionsDetails,
    ),
    InstanceRequirements: S.optional(
      AwsEc2LaunchTemplateDataInstanceRequirementsDetails,
    ),
    InstanceType: S.optional(S.String),
    KernelId: S.optional(S.String),
    KeyName: S.optional(S.String),
    LicenseSet: S.optional(AwsEc2LaunchTemplateDataLicenseSetList),
    MaintenanceOptions: S.optional(
      AwsEc2LaunchTemplateDataMaintenanceOptionsDetails,
    ),
    MetadataOptions: S.optional(AwsEc2LaunchTemplateDataMetadataOptionsDetails),
    Monitoring: S.optional(AwsEc2LaunchTemplateDataMonitoringDetails),
    NetworkInterfaceSet: S.optional(
      AwsEc2LaunchTemplateDataNetworkInterfaceSetList,
    ),
    Placement: S.optional(AwsEc2LaunchTemplateDataPlacementDetails),
    PrivateDnsNameOptions: S.optional(
      AwsEc2LaunchTemplateDataPrivateDnsNameOptionsDetails,
    ),
    RamDiskId: S.optional(S.String),
    SecurityGroupIdSet: S.optional(NonEmptyStringList),
    SecurityGroupSet: S.optional(NonEmptyStringList),
    UserData: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEc2LaunchTemplateDataDetails",
}) as any as S.Schema<AwsEc2LaunchTemplateDataDetails>;
export interface AwsEc2LaunchTemplateDetails {
  LaunchTemplateName?: string;
  Id?: string;
  LaunchTemplateData?: AwsEc2LaunchTemplateDataDetails;
  DefaultVersionNumber?: number;
  LatestVersionNumber?: number;
}
export const AwsEc2LaunchTemplateDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LaunchTemplateName: S.optional(S.String),
    Id: S.optional(S.String),
    LaunchTemplateData: S.optional(AwsEc2LaunchTemplateDataDetails),
    DefaultVersionNumber: S.optional(S.Number),
    LatestVersionNumber: S.optional(S.Number),
  }),
).annotate({
  identifier: "AwsEc2LaunchTemplateDetails",
}) as any as S.Schema<AwsEc2LaunchTemplateDetails>;
export interface AwsSageMakerNotebookInstanceMetadataServiceConfigurationDetails {
  MinimumInstanceMetadataServiceVersion?: string;
}
export const AwsSageMakerNotebookInstanceMetadataServiceConfigurationDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ MinimumInstanceMetadataServiceVersion: S.optional(S.String) }),
  ).annotate({
    identifier:
      "AwsSageMakerNotebookInstanceMetadataServiceConfigurationDetails",
  }) as any as S.Schema<AwsSageMakerNotebookInstanceMetadataServiceConfigurationDetails>;
export interface AwsSageMakerNotebookInstanceDetails {
  AcceleratorTypes?: string[];
  AdditionalCodeRepositories?: string[];
  DefaultCodeRepository?: string;
  DirectInternetAccess?: string;
  FailureReason?: string;
  InstanceMetadataServiceConfiguration?: AwsSageMakerNotebookInstanceMetadataServiceConfigurationDetails;
  InstanceType?: string;
  KmsKeyId?: string;
  NetworkInterfaceId?: string;
  NotebookInstanceArn?: string;
  NotebookInstanceLifecycleConfigName?: string;
  NotebookInstanceName?: string;
  NotebookInstanceStatus?: string;
  PlatformIdentifier?: string;
  RoleArn?: string;
  RootAccess?: string;
  SecurityGroups?: string[];
  SubnetId?: string;
  Url?: string;
  VolumeSizeInGB?: number;
}
export const AwsSageMakerNotebookInstanceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceleratorTypes: S.optional(NonEmptyStringList),
    AdditionalCodeRepositories: S.optional(NonEmptyStringList),
    DefaultCodeRepository: S.optional(S.String),
    DirectInternetAccess: S.optional(S.String),
    FailureReason: S.optional(S.String),
    InstanceMetadataServiceConfiguration: S.optional(
      AwsSageMakerNotebookInstanceMetadataServiceConfigurationDetails,
    ),
    InstanceType: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    NetworkInterfaceId: S.optional(S.String),
    NotebookInstanceArn: S.optional(S.String),
    NotebookInstanceLifecycleConfigName: S.optional(S.String),
    NotebookInstanceName: S.optional(S.String),
    NotebookInstanceStatus: S.optional(S.String),
    PlatformIdentifier: S.optional(S.String),
    RoleArn: S.optional(S.String),
    RootAccess: S.optional(S.String),
    SecurityGroups: S.optional(NonEmptyStringList),
    SubnetId: S.optional(S.String),
    Url: S.optional(S.String),
    VolumeSizeInGB: S.optional(S.Number),
  }),
).annotate({
  identifier: "AwsSageMakerNotebookInstanceDetails",
}) as any as S.Schema<AwsSageMakerNotebookInstanceDetails>;
export interface AwsWafv2WebAclCaptchaConfigImmunityTimePropertyDetails {
  ImmunityTime?: number;
}
export const AwsWafv2WebAclCaptchaConfigImmunityTimePropertyDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ImmunityTime: S.optional(S.Number) }),
  ).annotate({
    identifier: "AwsWafv2WebAclCaptchaConfigImmunityTimePropertyDetails",
  }) as any as S.Schema<AwsWafv2WebAclCaptchaConfigImmunityTimePropertyDetails>;
export interface AwsWafv2WebAclCaptchaConfigDetails {
  ImmunityTimeProperty?: AwsWafv2WebAclCaptchaConfigImmunityTimePropertyDetails;
}
export const AwsWafv2WebAclCaptchaConfigDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImmunityTimeProperty: S.optional(
      AwsWafv2WebAclCaptchaConfigImmunityTimePropertyDetails,
    ),
  }),
).annotate({
  identifier: "AwsWafv2WebAclCaptchaConfigDetails",
}) as any as S.Schema<AwsWafv2WebAclCaptchaConfigDetails>;
export interface AwsWafv2CustomHttpHeader {
  Name?: string;
  Value?: string;
}
export const AwsWafv2CustomHttpHeader = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({
  identifier: "AwsWafv2CustomHttpHeader",
}) as any as S.Schema<AwsWafv2CustomHttpHeader>;
export type AwsWafv2InsertHeadersList = AwsWafv2CustomHttpHeader[];
export const AwsWafv2InsertHeadersList = /*@__PURE__*/ S.Array(
  AwsWafv2CustomHttpHeader,
);
export interface AwsWafv2CustomRequestHandlingDetails {
  InsertHeaders?: AwsWafv2CustomHttpHeader[];
}
export const AwsWafv2CustomRequestHandlingDetails = /*@__PURE__*/ S.suspend(
  () => S.Struct({ InsertHeaders: S.optional(AwsWafv2InsertHeadersList) }),
).annotate({
  identifier: "AwsWafv2CustomRequestHandlingDetails",
}) as any as S.Schema<AwsWafv2CustomRequestHandlingDetails>;
export interface AwsWafv2ActionAllowDetails {
  CustomRequestHandling?: AwsWafv2CustomRequestHandlingDetails;
}
export const AwsWafv2ActionAllowDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomRequestHandling: S.optional(AwsWafv2CustomRequestHandlingDetails),
  }),
).annotate({
  identifier: "AwsWafv2ActionAllowDetails",
}) as any as S.Schema<AwsWafv2ActionAllowDetails>;
export interface AwsWafv2CustomResponseDetails {
  CustomResponseBodyKey?: string;
  ResponseCode?: number;
  ResponseHeaders?: AwsWafv2CustomHttpHeader[];
}
export const AwsWafv2CustomResponseDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomResponseBodyKey: S.optional(S.String),
    ResponseCode: S.optional(S.Number),
    ResponseHeaders: S.optional(AwsWafv2InsertHeadersList),
  }),
).annotate({
  identifier: "AwsWafv2CustomResponseDetails",
}) as any as S.Schema<AwsWafv2CustomResponseDetails>;
export interface AwsWafv2ActionBlockDetails {
  CustomResponse?: AwsWafv2CustomResponseDetails;
}
export const AwsWafv2ActionBlockDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CustomResponse: S.optional(AwsWafv2CustomResponseDetails) }),
).annotate({
  identifier: "AwsWafv2ActionBlockDetails",
}) as any as S.Schema<AwsWafv2ActionBlockDetails>;
export interface AwsWafv2WebAclActionDetails {
  Allow?: AwsWafv2ActionAllowDetails;
  Block?: AwsWafv2ActionBlockDetails;
}
export const AwsWafv2WebAclActionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Allow: S.optional(AwsWafv2ActionAllowDetails),
    Block: S.optional(AwsWafv2ActionBlockDetails),
  }),
).annotate({
  identifier: "AwsWafv2WebAclActionDetails",
}) as any as S.Schema<AwsWafv2WebAclActionDetails>;
export interface AwsWafv2RulesActionCaptchaDetails {
  CustomRequestHandling?: AwsWafv2CustomRequestHandlingDetails;
}
export const AwsWafv2RulesActionCaptchaDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomRequestHandling: S.optional(AwsWafv2CustomRequestHandlingDetails),
  }),
).annotate({
  identifier: "AwsWafv2RulesActionCaptchaDetails",
}) as any as S.Schema<AwsWafv2RulesActionCaptchaDetails>;
export interface AwsWafv2RulesActionCountDetails {
  CustomRequestHandling?: AwsWafv2CustomRequestHandlingDetails;
}
export const AwsWafv2RulesActionCountDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomRequestHandling: S.optional(AwsWafv2CustomRequestHandlingDetails),
  }),
).annotate({
  identifier: "AwsWafv2RulesActionCountDetails",
}) as any as S.Schema<AwsWafv2RulesActionCountDetails>;
export interface AwsWafv2RulesActionDetails {
  Allow?: AwsWafv2ActionAllowDetails;
  Block?: AwsWafv2ActionBlockDetails;
  Captcha?: AwsWafv2RulesActionCaptchaDetails;
  Count?: AwsWafv2RulesActionCountDetails;
}
export const AwsWafv2RulesActionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Allow: S.optional(AwsWafv2ActionAllowDetails),
    Block: S.optional(AwsWafv2ActionBlockDetails),
    Captcha: S.optional(AwsWafv2RulesActionCaptchaDetails),
    Count: S.optional(AwsWafv2RulesActionCountDetails),
  }),
).annotate({
  identifier: "AwsWafv2RulesActionDetails",
}) as any as S.Schema<AwsWafv2RulesActionDetails>;
export interface AwsWafv2VisibilityConfigDetails {
  CloudWatchMetricsEnabled?: boolean;
  MetricName?: string;
  SampledRequestsEnabled?: boolean;
}
export const AwsWafv2VisibilityConfigDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudWatchMetricsEnabled: S.optional(S.Boolean),
    MetricName: S.optional(S.String),
    SampledRequestsEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AwsWafv2VisibilityConfigDetails",
}) as any as S.Schema<AwsWafv2VisibilityConfigDetails>;
export interface AwsWafv2RulesDetails {
  Action?: AwsWafv2RulesActionDetails;
  Name?: string;
  OverrideAction?: string;
  Priority?: number;
  VisibilityConfig?: AwsWafv2VisibilityConfigDetails;
}
export const AwsWafv2RulesDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.optional(AwsWafv2RulesActionDetails),
    Name: S.optional(S.String),
    OverrideAction: S.optional(S.String),
    Priority: S.optional(S.Number),
    VisibilityConfig: S.optional(AwsWafv2VisibilityConfigDetails),
  }),
).annotate({
  identifier: "AwsWafv2RulesDetails",
}) as any as S.Schema<AwsWafv2RulesDetails>;
export type AwsWafv2RulesList = AwsWafv2RulesDetails[];
export const AwsWafv2RulesList = /*@__PURE__*/ S.Array(AwsWafv2RulesDetails);
export interface AwsWafv2WebAclDetails {
  Name?: string;
  Arn?: string;
  ManagedbyFirewallManager?: boolean;
  Id?: string;
  Capacity?: number;
  CaptchaConfig?: AwsWafv2WebAclCaptchaConfigDetails;
  DefaultAction?: AwsWafv2WebAclActionDetails;
  Description?: string;
  Rules?: AwsWafv2RulesDetails[];
  VisibilityConfig?: AwsWafv2VisibilityConfigDetails;
}
export const AwsWafv2WebAclDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Arn: S.optional(S.String),
    ManagedbyFirewallManager: S.optional(S.Boolean),
    Id: S.optional(S.String),
    Capacity: S.optional(S.Number),
    CaptchaConfig: S.optional(AwsWafv2WebAclCaptchaConfigDetails),
    DefaultAction: S.optional(AwsWafv2WebAclActionDetails),
    Description: S.optional(S.String),
    Rules: S.optional(AwsWafv2RulesList),
    VisibilityConfig: S.optional(AwsWafv2VisibilityConfigDetails),
  }),
).annotate({
  identifier: "AwsWafv2WebAclDetails",
}) as any as S.Schema<AwsWafv2WebAclDetails>;
export interface AwsWafv2RuleGroupDetails {
  Capacity?: number;
  Description?: string;
  Id?: string;
  Name?: string;
  Arn?: string;
  Rules?: AwsWafv2RulesDetails[];
  Scope?: string;
  VisibilityConfig?: AwsWafv2VisibilityConfigDetails;
}
export const AwsWafv2RuleGroupDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Capacity: S.optional(S.Number),
    Description: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Arn: S.optional(S.String),
    Rules: S.optional(AwsWafv2RulesList),
    Scope: S.optional(S.String),
    VisibilityConfig: S.optional(AwsWafv2VisibilityConfigDetails),
  }),
).annotate({
  identifier: "AwsWafv2RuleGroupDetails",
}) as any as S.Schema<AwsWafv2RuleGroupDetails>;
export interface AssociationStateDetails {
  State?: string;
  StatusMessage?: string;
}
export const AssociationStateDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: S.optional(S.String),
    StatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "AssociationStateDetails",
}) as any as S.Schema<AssociationStateDetails>;
export interface AssociationSetDetails {
  AssociationState?: AssociationStateDetails;
  GatewayId?: string;
  Main?: boolean;
  RouteTableAssociationId?: string;
  RouteTableId?: string;
  SubnetId?: string;
}
export const AssociationSetDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssociationState: S.optional(AssociationStateDetails),
    GatewayId: S.optional(S.String),
    Main: S.optional(S.Boolean),
    RouteTableAssociationId: S.optional(S.String),
    RouteTableId: S.optional(S.String),
    SubnetId: S.optional(S.String),
  }),
).annotate({
  identifier: "AssociationSetDetails",
}) as any as S.Schema<AssociationSetDetails>;
export type AssociationSetList = AssociationSetDetails[];
export const AssociationSetList = /*@__PURE__*/ S.Array(AssociationSetDetails);
export interface PropagatingVgwSetDetails {
  GatewayId?: string;
}
export const PropagatingVgwSetDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GatewayId: S.optional(S.String) }),
).annotate({
  identifier: "PropagatingVgwSetDetails",
}) as any as S.Schema<PropagatingVgwSetDetails>;
export type PropagatingVgwSetList = PropagatingVgwSetDetails[];
export const PropagatingVgwSetList = /*@__PURE__*/ S.Array(
  PropagatingVgwSetDetails,
);
export interface RouteSetDetails {
  CarrierGatewayId?: string;
  CoreNetworkArn?: string;
  DestinationCidrBlock?: string;
  DestinationIpv6CidrBlock?: string;
  DestinationPrefixListId?: string;
  EgressOnlyInternetGatewayId?: string;
  GatewayId?: string;
  InstanceId?: string;
  InstanceOwnerId?: string;
  LocalGatewayId?: string;
  NatGatewayId?: string;
  NetworkInterfaceId?: string;
  Origin?: string;
  State?: string;
  TransitGatewayId?: string;
  VpcPeeringConnectionId?: string;
}
export const RouteSetDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CarrierGatewayId: S.optional(S.String),
    CoreNetworkArn: S.optional(S.String),
    DestinationCidrBlock: S.optional(S.String),
    DestinationIpv6CidrBlock: S.optional(S.String),
    DestinationPrefixListId: S.optional(S.String),
    EgressOnlyInternetGatewayId: S.optional(S.String),
    GatewayId: S.optional(S.String),
    InstanceId: S.optional(S.String),
    InstanceOwnerId: S.optional(S.String),
    LocalGatewayId: S.optional(S.String),
    NatGatewayId: S.optional(S.String),
    NetworkInterfaceId: S.optional(S.String),
    Origin: S.optional(S.String),
    State: S.optional(S.String),
    TransitGatewayId: S.optional(S.String),
    VpcPeeringConnectionId: S.optional(S.String),
  }),
).annotate({
  identifier: "RouteSetDetails",
}) as any as S.Schema<RouteSetDetails>;
export type RouteSetList = RouteSetDetails[];
export const RouteSetList = /*@__PURE__*/ S.Array(RouteSetDetails);
export interface AwsEc2RouteTableDetails {
  AssociationSet?: AssociationSetDetails[];
  OwnerId?: string;
  PropagatingVgwSet?: PropagatingVgwSetDetails[];
  RouteTableId?: string;
  RouteSet?: RouteSetDetails[];
  VpcId?: string;
}
export const AwsEc2RouteTableDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssociationSet: S.optional(AssociationSetList),
    OwnerId: S.optional(S.String),
    PropagatingVgwSet: S.optional(PropagatingVgwSetList),
    RouteTableId: S.optional(S.String),
    RouteSet: S.optional(RouteSetList),
    VpcId: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEc2RouteTableDetails",
}) as any as S.Schema<AwsEc2RouteTableDetails>;
export interface AwsAmazonMqBrokerEncryptionOptionsDetails {
  KmsKeyId?: string;
  UseAwsOwnedKey?: boolean;
}
export const AwsAmazonMqBrokerEncryptionOptionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      KmsKeyId: S.optional(S.String),
      UseAwsOwnedKey: S.optional(S.Boolean),
    }),
  ).annotate({
    identifier: "AwsAmazonMqBrokerEncryptionOptionsDetails",
  }) as any as S.Schema<AwsAmazonMqBrokerEncryptionOptionsDetails>;
export interface AwsAmazonMqBrokerLdapServerMetadataDetails {
  Hosts?: string[];
  RoleBase?: string;
  RoleName?: string;
  RoleSearchMatching?: string;
  RoleSearchSubtree?: boolean;
  ServiceAccountUsername?: string;
  UserBase?: string;
  UserRoleName?: string;
  UserSearchMatching?: string;
  UserSearchSubtree?: boolean;
}
export const AwsAmazonMqBrokerLdapServerMetadataDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Hosts: S.optional(StringList),
      RoleBase: S.optional(S.String),
      RoleName: S.optional(S.String),
      RoleSearchMatching: S.optional(S.String),
      RoleSearchSubtree: S.optional(S.Boolean),
      ServiceAccountUsername: S.optional(S.String),
      UserBase: S.optional(S.String),
      UserRoleName: S.optional(S.String),
      UserSearchMatching: S.optional(S.String),
      UserSearchSubtree: S.optional(S.Boolean),
    }),
  ).annotate({
    identifier: "AwsAmazonMqBrokerLdapServerMetadataDetails",
  }) as any as S.Schema<AwsAmazonMqBrokerLdapServerMetadataDetails>;
export interface AwsAmazonMqBrokerLogsPendingDetails {
  Audit?: boolean;
  General?: boolean;
}
export const AwsAmazonMqBrokerLogsPendingDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Audit: S.optional(S.Boolean), General: S.optional(S.Boolean) }),
).annotate({
  identifier: "AwsAmazonMqBrokerLogsPendingDetails",
}) as any as S.Schema<AwsAmazonMqBrokerLogsPendingDetails>;
export interface AwsAmazonMqBrokerLogsDetails {
  Audit?: boolean;
  General?: boolean;
  AuditLogGroup?: string;
  GeneralLogGroup?: string;
  Pending?: AwsAmazonMqBrokerLogsPendingDetails;
}
export const AwsAmazonMqBrokerLogsDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Audit: S.optional(S.Boolean),
    General: S.optional(S.Boolean),
    AuditLogGroup: S.optional(S.String),
    GeneralLogGroup: S.optional(S.String),
    Pending: S.optional(AwsAmazonMqBrokerLogsPendingDetails),
  }),
).annotate({
  identifier: "AwsAmazonMqBrokerLogsDetails",
}) as any as S.Schema<AwsAmazonMqBrokerLogsDetails>;
export interface AwsAmazonMqBrokerMaintenanceWindowStartTimeDetails {
  DayOfWeek?: string;
  TimeOfDay?: string;
  TimeZone?: string;
}
export const AwsAmazonMqBrokerMaintenanceWindowStartTimeDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DayOfWeek: S.optional(S.String),
      TimeOfDay: S.optional(S.String),
      TimeZone: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsAmazonMqBrokerMaintenanceWindowStartTimeDetails",
  }) as any as S.Schema<AwsAmazonMqBrokerMaintenanceWindowStartTimeDetails>;
export interface AwsAmazonMqBrokerUsersDetails {
  PendingChange?: string;
  Username?: string;
}
export const AwsAmazonMqBrokerUsersDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PendingChange: S.optional(S.String),
    Username: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsAmazonMqBrokerUsersDetails",
}) as any as S.Schema<AwsAmazonMqBrokerUsersDetails>;
export type AwsAmazonMqBrokerUsersList = AwsAmazonMqBrokerUsersDetails[];
export const AwsAmazonMqBrokerUsersList = /*@__PURE__*/ S.Array(
  AwsAmazonMqBrokerUsersDetails,
);
export interface AwsAmazonMqBrokerDetails {
  AuthenticationStrategy?: string;
  AutoMinorVersionUpgrade?: boolean;
  BrokerArn?: string;
  BrokerName?: string;
  DeploymentMode?: string;
  EncryptionOptions?: AwsAmazonMqBrokerEncryptionOptionsDetails;
  EngineType?: string;
  EngineVersion?: string;
  HostInstanceType?: string;
  BrokerId?: string;
  LdapServerMetadata?: AwsAmazonMqBrokerLdapServerMetadataDetails;
  Logs?: AwsAmazonMqBrokerLogsDetails;
  MaintenanceWindowStartTime?: AwsAmazonMqBrokerMaintenanceWindowStartTimeDetails;
  PubliclyAccessible?: boolean;
  SecurityGroups?: string[];
  StorageType?: string;
  SubnetIds?: string[];
  Users?: AwsAmazonMqBrokerUsersDetails[];
}
export const AwsAmazonMqBrokerDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationStrategy: S.optional(S.String),
    AutoMinorVersionUpgrade: S.optional(S.Boolean),
    BrokerArn: S.optional(S.String),
    BrokerName: S.optional(S.String),
    DeploymentMode: S.optional(S.String),
    EncryptionOptions: S.optional(AwsAmazonMqBrokerEncryptionOptionsDetails),
    EngineType: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    HostInstanceType: S.optional(S.String),
    BrokerId: S.optional(S.String),
    LdapServerMetadata: S.optional(AwsAmazonMqBrokerLdapServerMetadataDetails),
    Logs: S.optional(AwsAmazonMqBrokerLogsDetails),
    MaintenanceWindowStartTime: S.optional(
      AwsAmazonMqBrokerMaintenanceWindowStartTimeDetails,
    ),
    PubliclyAccessible: S.optional(S.Boolean),
    SecurityGroups: S.optional(StringList),
    StorageType: S.optional(S.String),
    SubnetIds: S.optional(StringList),
    Users: S.optional(AwsAmazonMqBrokerUsersList),
  }),
).annotate({
  identifier: "AwsAmazonMqBrokerDetails",
}) as any as S.Schema<AwsAmazonMqBrokerDetails>;
export interface AwsAppSyncGraphQlApiOpenIdConnectConfigDetails {
  AuthTtL?: number;
  ClientId?: string;
  IatTtL?: number;
  Issuer?: string;
}
export const AwsAppSyncGraphQlApiOpenIdConnectConfigDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AuthTtL: S.optional(S.Number),
      ClientId: S.optional(S.String),
      IatTtL: S.optional(S.Number),
      Issuer: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsAppSyncGraphQlApiOpenIdConnectConfigDetails",
  }) as any as S.Schema<AwsAppSyncGraphQlApiOpenIdConnectConfigDetails>;
export interface AwsAppSyncGraphQlApiLambdaAuthorizerConfigDetails {
  AuthorizerResultTtlInSeconds?: number;
  AuthorizerUri?: string;
  IdentityValidationExpression?: string;
}
export const AwsAppSyncGraphQlApiLambdaAuthorizerConfigDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AuthorizerResultTtlInSeconds: S.optional(S.Number),
      AuthorizerUri: S.optional(S.String),
      IdentityValidationExpression: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsAppSyncGraphQlApiLambdaAuthorizerConfigDetails",
  }) as any as S.Schema<AwsAppSyncGraphQlApiLambdaAuthorizerConfigDetails>;
export interface AwsAppSyncGraphQlApiUserPoolConfigDetails {
  AppIdClientRegex?: string;
  AwsRegion?: string;
  DefaultAction?: string;
  UserPoolId?: string;
}
export const AwsAppSyncGraphQlApiUserPoolConfigDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AppIdClientRegex: S.optional(S.String),
      AwsRegion: S.optional(S.String),
      DefaultAction: S.optional(S.String),
      UserPoolId: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsAppSyncGraphQlApiUserPoolConfigDetails",
  }) as any as S.Schema<AwsAppSyncGraphQlApiUserPoolConfigDetails>;
export interface AwsAppSyncGraphQlApiLogConfigDetails {
  CloudWatchLogsRoleArn?: string;
  ExcludeVerboseContent?: boolean;
  FieldLogLevel?: string;
}
export const AwsAppSyncGraphQlApiLogConfigDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CloudWatchLogsRoleArn: S.optional(S.String),
      ExcludeVerboseContent: S.optional(S.Boolean),
      FieldLogLevel: S.optional(S.String),
    }),
).annotate({
  identifier: "AwsAppSyncGraphQlApiLogConfigDetails",
}) as any as S.Schema<AwsAppSyncGraphQlApiLogConfigDetails>;
export interface AwsAppSyncGraphQlApiAdditionalAuthenticationProvidersDetails {
  AuthenticationType?: string;
  LambdaAuthorizerConfig?: AwsAppSyncGraphQlApiLambdaAuthorizerConfigDetails;
  OpenIdConnectConfig?: AwsAppSyncGraphQlApiOpenIdConnectConfigDetails;
  UserPoolConfig?: AwsAppSyncGraphQlApiUserPoolConfigDetails;
}
export const AwsAppSyncGraphQlApiAdditionalAuthenticationProvidersDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AuthenticationType: S.optional(S.String),
      LambdaAuthorizerConfig: S.optional(
        AwsAppSyncGraphQlApiLambdaAuthorizerConfigDetails,
      ),
      OpenIdConnectConfig: S.optional(
        AwsAppSyncGraphQlApiOpenIdConnectConfigDetails,
      ),
      UserPoolConfig: S.optional(AwsAppSyncGraphQlApiUserPoolConfigDetails),
    }),
  ).annotate({
    identifier: "AwsAppSyncGraphQlApiAdditionalAuthenticationProvidersDetails",
  }) as any as S.Schema<AwsAppSyncGraphQlApiAdditionalAuthenticationProvidersDetails>;
export type AwsAppSyncGraphQlApiAdditionalAuthenticationProvidersList =
  AwsAppSyncGraphQlApiAdditionalAuthenticationProvidersDetails[];
export const AwsAppSyncGraphQlApiAdditionalAuthenticationProvidersList =
  /*@__PURE__*/ S.Array(
    AwsAppSyncGraphQlApiAdditionalAuthenticationProvidersDetails,
  );
export interface AwsAppSyncGraphQlApiDetails {
  ApiId?: string;
  Id?: string;
  OpenIdConnectConfig?: AwsAppSyncGraphQlApiOpenIdConnectConfigDetails;
  Name?: string;
  LambdaAuthorizerConfig?: AwsAppSyncGraphQlApiLambdaAuthorizerConfigDetails;
  XrayEnabled?: boolean;
  Arn?: string;
  UserPoolConfig?: AwsAppSyncGraphQlApiUserPoolConfigDetails;
  AuthenticationType?: string;
  LogConfig?: AwsAppSyncGraphQlApiLogConfigDetails;
  AdditionalAuthenticationProviders?: AwsAppSyncGraphQlApiAdditionalAuthenticationProvidersDetails[];
  WafWebAclArn?: string;
}
export const AwsAppSyncGraphQlApiDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.optional(S.String),
    Id: S.optional(S.String),
    OpenIdConnectConfig: S.optional(
      AwsAppSyncGraphQlApiOpenIdConnectConfigDetails,
    ),
    Name: S.optional(S.String),
    LambdaAuthorizerConfig: S.optional(
      AwsAppSyncGraphQlApiLambdaAuthorizerConfigDetails,
    ),
    XrayEnabled: S.optional(S.Boolean),
    Arn: S.optional(S.String),
    UserPoolConfig: S.optional(AwsAppSyncGraphQlApiUserPoolConfigDetails),
    AuthenticationType: S.optional(S.String),
    LogConfig: S.optional(AwsAppSyncGraphQlApiLogConfigDetails),
    AdditionalAuthenticationProviders: S.optional(
      AwsAppSyncGraphQlApiAdditionalAuthenticationProvidersList,
    ),
    WafWebAclArn: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsAppSyncGraphQlApiDetails",
}) as any as S.Schema<AwsAppSyncGraphQlApiDetails>;
export interface AwsEventSchemasRegistryDetails {
  Description?: string;
  RegistryArn?: string;
  RegistryName?: string;
}
export const AwsEventSchemasRegistryDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    RegistryArn: S.optional(S.String),
    RegistryName: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEventSchemasRegistryDetails",
}) as any as S.Schema<AwsEventSchemasRegistryDetails>;
export interface AwsGuardDutyDetectorDataSourcesCloudTrailDetails {
  Status?: string;
}
export const AwsGuardDutyDetectorDataSourcesCloudTrailDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Status: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsGuardDutyDetectorDataSourcesCloudTrailDetails",
  }) as any as S.Schema<AwsGuardDutyDetectorDataSourcesCloudTrailDetails>;
export interface AwsGuardDutyDetectorDataSourcesDnsLogsDetails {
  Status?: string;
}
export const AwsGuardDutyDetectorDataSourcesDnsLogsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Status: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsGuardDutyDetectorDataSourcesDnsLogsDetails",
  }) as any as S.Schema<AwsGuardDutyDetectorDataSourcesDnsLogsDetails>;
export interface AwsGuardDutyDetectorDataSourcesFlowLogsDetails {
  Status?: string;
}
export const AwsGuardDutyDetectorDataSourcesFlowLogsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Status: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsGuardDutyDetectorDataSourcesFlowLogsDetails",
  }) as any as S.Schema<AwsGuardDutyDetectorDataSourcesFlowLogsDetails>;
export interface AwsGuardDutyDetectorDataSourcesKubernetesAuditLogsDetails {
  Status?: string;
}
export const AwsGuardDutyDetectorDataSourcesKubernetesAuditLogsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Status: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsGuardDutyDetectorDataSourcesKubernetesAuditLogsDetails",
  }) as any as S.Schema<AwsGuardDutyDetectorDataSourcesKubernetesAuditLogsDetails>;
export interface AwsGuardDutyDetectorDataSourcesKubernetesDetails {
  AuditLogs?: AwsGuardDutyDetectorDataSourcesKubernetesAuditLogsDetails;
}
export const AwsGuardDutyDetectorDataSourcesKubernetesDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AuditLogs: S.optional(
        AwsGuardDutyDetectorDataSourcesKubernetesAuditLogsDetails,
      ),
    }),
  ).annotate({
    identifier: "AwsGuardDutyDetectorDataSourcesKubernetesDetails",
  }) as any as S.Schema<AwsGuardDutyDetectorDataSourcesKubernetesDetails>;
export interface AwsGuardDutyDetectorDataSourcesMalwareProtectionScanEc2InstanceWithFindingsEbsVolumesDetails {
  Reason?: string;
  Status?: string;
}
export const AwsGuardDutyDetectorDataSourcesMalwareProtectionScanEc2InstanceWithFindingsEbsVolumesDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Reason: S.optional(S.String), Status: S.optional(S.String) }),
  ).annotate({
    identifier:
      "AwsGuardDutyDetectorDataSourcesMalwareProtectionScanEc2InstanceWithFindingsEbsVolumesDetails",
  }) as any as S.Schema<AwsGuardDutyDetectorDataSourcesMalwareProtectionScanEc2InstanceWithFindingsEbsVolumesDetails>;
export interface AwsGuardDutyDetectorDataSourcesMalwareProtectionScanEc2InstanceWithFindingsDetails {
  EbsVolumes?: AwsGuardDutyDetectorDataSourcesMalwareProtectionScanEc2InstanceWithFindingsEbsVolumesDetails;
}
export const AwsGuardDutyDetectorDataSourcesMalwareProtectionScanEc2InstanceWithFindingsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      EbsVolumes: S.optional(
        AwsGuardDutyDetectorDataSourcesMalwareProtectionScanEc2InstanceWithFindingsEbsVolumesDetails,
      ),
    }),
  ).annotate({
    identifier:
      "AwsGuardDutyDetectorDataSourcesMalwareProtectionScanEc2InstanceWithFindingsDetails",
  }) as any as S.Schema<AwsGuardDutyDetectorDataSourcesMalwareProtectionScanEc2InstanceWithFindingsDetails>;
export interface AwsGuardDutyDetectorDataSourcesMalwareProtectionDetails {
  ScanEc2InstanceWithFindings?: AwsGuardDutyDetectorDataSourcesMalwareProtectionScanEc2InstanceWithFindingsDetails;
  ServiceRole?: string;
}
export const AwsGuardDutyDetectorDataSourcesMalwareProtectionDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ScanEc2InstanceWithFindings: S.optional(
        AwsGuardDutyDetectorDataSourcesMalwareProtectionScanEc2InstanceWithFindingsDetails,
      ),
      ServiceRole: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsGuardDutyDetectorDataSourcesMalwareProtectionDetails",
  }) as any as S.Schema<AwsGuardDutyDetectorDataSourcesMalwareProtectionDetails>;
export interface AwsGuardDutyDetectorDataSourcesS3LogsDetails {
  Status?: string;
}
export const AwsGuardDutyDetectorDataSourcesS3LogsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Status: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsGuardDutyDetectorDataSourcesS3LogsDetails",
  }) as any as S.Schema<AwsGuardDutyDetectorDataSourcesS3LogsDetails>;
export interface AwsGuardDutyDetectorDataSourcesDetails {
  CloudTrail?: AwsGuardDutyDetectorDataSourcesCloudTrailDetails;
  DnsLogs?: AwsGuardDutyDetectorDataSourcesDnsLogsDetails;
  FlowLogs?: AwsGuardDutyDetectorDataSourcesFlowLogsDetails;
  Kubernetes?: AwsGuardDutyDetectorDataSourcesKubernetesDetails;
  MalwareProtection?: AwsGuardDutyDetectorDataSourcesMalwareProtectionDetails;
  S3Logs?: AwsGuardDutyDetectorDataSourcesS3LogsDetails;
}
export const AwsGuardDutyDetectorDataSourcesDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CloudTrail: S.optional(AwsGuardDutyDetectorDataSourcesCloudTrailDetails),
      DnsLogs: S.optional(AwsGuardDutyDetectorDataSourcesDnsLogsDetails),
      FlowLogs: S.optional(AwsGuardDutyDetectorDataSourcesFlowLogsDetails),
      Kubernetes: S.optional(AwsGuardDutyDetectorDataSourcesKubernetesDetails),
      MalwareProtection: S.optional(
        AwsGuardDutyDetectorDataSourcesMalwareProtectionDetails,
      ),
      S3Logs: S.optional(AwsGuardDutyDetectorDataSourcesS3LogsDetails),
    }),
).annotate({
  identifier: "AwsGuardDutyDetectorDataSourcesDetails",
}) as any as S.Schema<AwsGuardDutyDetectorDataSourcesDetails>;
export interface AwsGuardDutyDetectorFeaturesDetails {
  Name?: string;
  Status?: string;
}
export const AwsGuardDutyDetectorFeaturesDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Status: S.optional(S.String) }),
).annotate({
  identifier: "AwsGuardDutyDetectorFeaturesDetails",
}) as any as S.Schema<AwsGuardDutyDetectorFeaturesDetails>;
export type AwsGuardDutyDetectorFeaturesList =
  AwsGuardDutyDetectorFeaturesDetails[];
export const AwsGuardDutyDetectorFeaturesList = /*@__PURE__*/ S.Array(
  AwsGuardDutyDetectorFeaturesDetails,
);
export interface AwsGuardDutyDetectorDetails {
  DataSources?: AwsGuardDutyDetectorDataSourcesDetails;
  Features?: AwsGuardDutyDetectorFeaturesDetails[];
  FindingPublishingFrequency?: string;
  ServiceRole?: string;
  Status?: string;
}
export const AwsGuardDutyDetectorDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSources: S.optional(AwsGuardDutyDetectorDataSourcesDetails),
    Features: S.optional(AwsGuardDutyDetectorFeaturesList),
    FindingPublishingFrequency: S.optional(S.String),
    ServiceRole: S.optional(S.String),
    Status: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsGuardDutyDetectorDetails",
}) as any as S.Schema<AwsGuardDutyDetectorDetails>;
export interface AwsStepFunctionStateMachineLoggingConfigurationDestinationsCloudWatchLogsLogGroupDetails {
  LogGroupArn?: string;
}
export const AwsStepFunctionStateMachineLoggingConfigurationDestinationsCloudWatchLogsLogGroupDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ LogGroupArn: S.optional(S.String) }),
  ).annotate({
    identifier:
      "AwsStepFunctionStateMachineLoggingConfigurationDestinationsCloudWatchLogsLogGroupDetails",
  }) as any as S.Schema<AwsStepFunctionStateMachineLoggingConfigurationDestinationsCloudWatchLogsLogGroupDetails>;
export interface AwsStepFunctionStateMachineLoggingConfigurationDestinationsDetails {
  CloudWatchLogsLogGroup?: AwsStepFunctionStateMachineLoggingConfigurationDestinationsCloudWatchLogsLogGroupDetails;
}
export const AwsStepFunctionStateMachineLoggingConfigurationDestinationsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CloudWatchLogsLogGroup: S.optional(
        AwsStepFunctionStateMachineLoggingConfigurationDestinationsCloudWatchLogsLogGroupDetails,
      ),
    }),
  ).annotate({
    identifier:
      "AwsStepFunctionStateMachineLoggingConfigurationDestinationsDetails",
  }) as any as S.Schema<AwsStepFunctionStateMachineLoggingConfigurationDestinationsDetails>;
export type AwsStepFunctionStateMachineLoggingConfigurationDestinationsList =
  AwsStepFunctionStateMachineLoggingConfigurationDestinationsDetails[];
export const AwsStepFunctionStateMachineLoggingConfigurationDestinationsList =
  /*@__PURE__*/ S.Array(
    AwsStepFunctionStateMachineLoggingConfigurationDestinationsDetails,
  );
export interface AwsStepFunctionStateMachineLoggingConfigurationDetails {
  Destinations?: AwsStepFunctionStateMachineLoggingConfigurationDestinationsDetails[];
  IncludeExecutionData?: boolean;
  Level?: string;
}
export const AwsStepFunctionStateMachineLoggingConfigurationDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Destinations: S.optional(
        AwsStepFunctionStateMachineLoggingConfigurationDestinationsList,
      ),
      IncludeExecutionData: S.optional(S.Boolean),
      Level: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsStepFunctionStateMachineLoggingConfigurationDetails",
  }) as any as S.Schema<AwsStepFunctionStateMachineLoggingConfigurationDetails>;
export interface AwsStepFunctionStateMachineTracingConfigurationDetails {
  Enabled?: boolean;
}
export const AwsStepFunctionStateMachineTracingConfigurationDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Enabled: S.optional(S.Boolean) }),
  ).annotate({
    identifier: "AwsStepFunctionStateMachineTracingConfigurationDetails",
  }) as any as S.Schema<AwsStepFunctionStateMachineTracingConfigurationDetails>;
export interface AwsStepFunctionStateMachineDetails {
  Label?: string;
  LoggingConfiguration?: AwsStepFunctionStateMachineLoggingConfigurationDetails;
  Name?: string;
  RoleArn?: string;
  StateMachineArn?: string;
  Status?: string;
  TracingConfiguration?: AwsStepFunctionStateMachineTracingConfigurationDetails;
  Type?: string;
}
export const AwsStepFunctionStateMachineDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Label: S.optional(S.String),
    LoggingConfiguration: S.optional(
      AwsStepFunctionStateMachineLoggingConfigurationDetails,
    ),
    Name: S.optional(S.String),
    RoleArn: S.optional(S.String),
    StateMachineArn: S.optional(S.String),
    Status: S.optional(S.String),
    TracingConfiguration: S.optional(
      AwsStepFunctionStateMachineTracingConfigurationDetails,
    ),
    Type: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsStepFunctionStateMachineDetails",
}) as any as S.Schema<AwsStepFunctionStateMachineDetails>;
export interface AwsAthenaWorkGroupConfigurationResultConfigurationEncryptionConfigurationDetails {
  EncryptionOption?: string;
  KmsKey?: string;
}
export const AwsAthenaWorkGroupConfigurationResultConfigurationEncryptionConfigurationDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      EncryptionOption: S.optional(S.String),
      KmsKey: S.optional(S.String),
    }),
  ).annotate({
    identifier:
      "AwsAthenaWorkGroupConfigurationResultConfigurationEncryptionConfigurationDetails",
  }) as any as S.Schema<AwsAthenaWorkGroupConfigurationResultConfigurationEncryptionConfigurationDetails>;
export interface AwsAthenaWorkGroupConfigurationResultConfigurationDetails {
  EncryptionConfiguration?: AwsAthenaWorkGroupConfigurationResultConfigurationEncryptionConfigurationDetails;
}
export const AwsAthenaWorkGroupConfigurationResultConfigurationDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      EncryptionConfiguration: S.optional(
        AwsAthenaWorkGroupConfigurationResultConfigurationEncryptionConfigurationDetails,
      ),
    }),
  ).annotate({
    identifier: "AwsAthenaWorkGroupConfigurationResultConfigurationDetails",
  }) as any as S.Schema<AwsAthenaWorkGroupConfigurationResultConfigurationDetails>;
export interface AwsAthenaWorkGroupConfigurationDetails {
  ResultConfiguration?: AwsAthenaWorkGroupConfigurationResultConfigurationDetails;
}
export const AwsAthenaWorkGroupConfigurationDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ResultConfiguration: S.optional(
        AwsAthenaWorkGroupConfigurationResultConfigurationDetails,
      ),
    }),
).annotate({
  identifier: "AwsAthenaWorkGroupConfigurationDetails",
}) as any as S.Schema<AwsAthenaWorkGroupConfigurationDetails>;
export interface AwsAthenaWorkGroupDetails {
  Name?: string;
  Description?: string;
  State?: string;
  Configuration?: AwsAthenaWorkGroupConfigurationDetails;
}
export const AwsAthenaWorkGroupDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    State: S.optional(S.String),
    Configuration: S.optional(AwsAthenaWorkGroupConfigurationDetails),
  }),
).annotate({
  identifier: "AwsAthenaWorkGroupDetails",
}) as any as S.Schema<AwsAthenaWorkGroupDetails>;
export interface AwsEventsEventbusDetails {
  Arn?: string;
  Name?: string;
  Policy?: string;
}
export const AwsEventsEventbusDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    Policy: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEventsEventbusDetails",
}) as any as S.Schema<AwsEventsEventbusDetails>;
export interface AwsDmsEndpointDetails {
  CertificateArn?: string;
  DatabaseName?: string;
  EndpointArn?: string;
  EndpointIdentifier?: string;
  EndpointType?: string;
  EngineName?: string;
  ExternalId?: string;
  ExtraConnectionAttributes?: string;
  KmsKeyId?: string;
  Port?: number;
  ServerName?: string;
  SslMode?: string;
  Username?: string;
}
export const AwsDmsEndpointDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CertificateArn: S.optional(S.String),
    DatabaseName: S.optional(S.String),
    EndpointArn: S.optional(S.String),
    EndpointIdentifier: S.optional(S.String),
    EndpointType: S.optional(S.String),
    EngineName: S.optional(S.String),
    ExternalId: S.optional(S.String),
    ExtraConnectionAttributes: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    Port: S.optional(S.Number),
    ServerName: S.optional(S.String),
    SslMode: S.optional(S.String),
    Username: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsDmsEndpointDetails",
}) as any as S.Schema<AwsDmsEndpointDetails>;
export interface AwsEventsEndpointEventBusesDetails {
  EventBusArn?: string;
}
export const AwsEventsEndpointEventBusesDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventBusArn: S.optional(S.String) }),
).annotate({
  identifier: "AwsEventsEndpointEventBusesDetails",
}) as any as S.Schema<AwsEventsEndpointEventBusesDetails>;
export type AwsEventsEndpointEventBusesList =
  AwsEventsEndpointEventBusesDetails[];
export const AwsEventsEndpointEventBusesList = /*@__PURE__*/ S.Array(
  AwsEventsEndpointEventBusesDetails,
);
export interface AwsEventsEndpointReplicationConfigDetails {
  State?: string;
}
export const AwsEventsEndpointReplicationConfigDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ State: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsEventsEndpointReplicationConfigDetails",
  }) as any as S.Schema<AwsEventsEndpointReplicationConfigDetails>;
export interface AwsEventsEndpointRoutingConfigFailoverConfigPrimaryDetails {
  HealthCheck?: string;
}
export const AwsEventsEndpointRoutingConfigFailoverConfigPrimaryDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ HealthCheck: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsEventsEndpointRoutingConfigFailoverConfigPrimaryDetails",
  }) as any as S.Schema<AwsEventsEndpointRoutingConfigFailoverConfigPrimaryDetails>;
export interface AwsEventsEndpointRoutingConfigFailoverConfigSecondaryDetails {
  Route?: string;
}
export const AwsEventsEndpointRoutingConfigFailoverConfigSecondaryDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Route: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsEventsEndpointRoutingConfigFailoverConfigSecondaryDetails",
  }) as any as S.Schema<AwsEventsEndpointRoutingConfigFailoverConfigSecondaryDetails>;
export interface AwsEventsEndpointRoutingConfigFailoverConfigDetails {
  Primary?: AwsEventsEndpointRoutingConfigFailoverConfigPrimaryDetails;
  Secondary?: AwsEventsEndpointRoutingConfigFailoverConfigSecondaryDetails;
}
export const AwsEventsEndpointRoutingConfigFailoverConfigDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Primary: S.optional(
        AwsEventsEndpointRoutingConfigFailoverConfigPrimaryDetails,
      ),
      Secondary: S.optional(
        AwsEventsEndpointRoutingConfigFailoverConfigSecondaryDetails,
      ),
    }),
  ).annotate({
    identifier: "AwsEventsEndpointRoutingConfigFailoverConfigDetails",
  }) as any as S.Schema<AwsEventsEndpointRoutingConfigFailoverConfigDetails>;
export interface AwsEventsEndpointRoutingConfigDetails {
  FailoverConfig?: AwsEventsEndpointRoutingConfigFailoverConfigDetails;
}
export const AwsEventsEndpointRoutingConfigDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FailoverConfig: S.optional(
        AwsEventsEndpointRoutingConfigFailoverConfigDetails,
      ),
    }),
).annotate({
  identifier: "AwsEventsEndpointRoutingConfigDetails",
}) as any as S.Schema<AwsEventsEndpointRoutingConfigDetails>;
export interface AwsEventsEndpointDetails {
  Arn?: string;
  Description?: string;
  EndpointId?: string;
  EndpointUrl?: string;
  EventBuses?: AwsEventsEndpointEventBusesDetails[];
  Name?: string;
  ReplicationConfig?: AwsEventsEndpointReplicationConfigDetails;
  RoleArn?: string;
  RoutingConfig?: AwsEventsEndpointRoutingConfigDetails;
  State?: string;
  StateReason?: string;
}
export const AwsEventsEndpointDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Description: S.optional(S.String),
    EndpointId: S.optional(S.String),
    EndpointUrl: S.optional(S.String),
    EventBuses: S.optional(AwsEventsEndpointEventBusesList),
    Name: S.optional(S.String),
    ReplicationConfig: S.optional(AwsEventsEndpointReplicationConfigDetails),
    RoleArn: S.optional(S.String),
    RoutingConfig: S.optional(AwsEventsEndpointRoutingConfigDetails),
    State: S.optional(S.String),
    StateReason: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEventsEndpointDetails",
}) as any as S.Schema<AwsEventsEndpointDetails>;
export interface AwsDmsReplicationTaskDetails {
  CdcStartPosition?: string;
  CdcStartTime?: string;
  CdcStopPosition?: string;
  MigrationType?: string;
  Id?: string;
  ResourceIdentifier?: string;
  ReplicationInstanceArn?: string;
  ReplicationTaskIdentifier?: string;
  ReplicationTaskSettings?: string;
  SourceEndpointArn?: string;
  TableMappings?: string;
  TargetEndpointArn?: string;
  TaskData?: string;
}
export const AwsDmsReplicationTaskDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CdcStartPosition: S.optional(S.String),
    CdcStartTime: S.optional(S.String),
    CdcStopPosition: S.optional(S.String),
    MigrationType: S.optional(S.String),
    Id: S.optional(S.String),
    ResourceIdentifier: S.optional(S.String),
    ReplicationInstanceArn: S.optional(S.String),
    ReplicationTaskIdentifier: S.optional(S.String),
    ReplicationTaskSettings: S.optional(S.String),
    SourceEndpointArn: S.optional(S.String),
    TableMappings: S.optional(S.String),
    TargetEndpointArn: S.optional(S.String),
    TaskData: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsDmsReplicationTaskDetails",
}) as any as S.Schema<AwsDmsReplicationTaskDetails>;
export interface AwsDmsReplicationInstanceReplicationSubnetGroupDetails {
  ReplicationSubnetGroupIdentifier?: string;
}
export const AwsDmsReplicationInstanceReplicationSubnetGroupDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ReplicationSubnetGroupIdentifier: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsDmsReplicationInstanceReplicationSubnetGroupDetails",
  }) as any as S.Schema<AwsDmsReplicationInstanceReplicationSubnetGroupDetails>;
export interface AwsDmsReplicationInstanceVpcSecurityGroupsDetails {
  VpcSecurityGroupId?: string;
}
export const AwsDmsReplicationInstanceVpcSecurityGroupsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ VpcSecurityGroupId: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsDmsReplicationInstanceVpcSecurityGroupsDetails",
  }) as any as S.Schema<AwsDmsReplicationInstanceVpcSecurityGroupsDetails>;
export type AwsDmsReplicationInstanceVpcSecurityGroupsList =
  AwsDmsReplicationInstanceVpcSecurityGroupsDetails[];
export const AwsDmsReplicationInstanceVpcSecurityGroupsList =
  /*@__PURE__*/ S.Array(AwsDmsReplicationInstanceVpcSecurityGroupsDetails);
export interface AwsDmsReplicationInstanceDetails {
  AllocatedStorage?: number;
  AutoMinorVersionUpgrade?: boolean;
  AvailabilityZone?: string;
  EngineVersion?: string;
  KmsKeyId?: string;
  MultiAZ?: boolean;
  PreferredMaintenanceWindow?: string;
  PubliclyAccessible?: boolean;
  ReplicationInstanceClass?: string;
  ReplicationInstanceIdentifier?: string;
  ReplicationSubnetGroup?: AwsDmsReplicationInstanceReplicationSubnetGroupDetails;
  VpcSecurityGroups?: AwsDmsReplicationInstanceVpcSecurityGroupsDetails[];
}
export const AwsDmsReplicationInstanceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AllocatedStorage: S.optional(S.Number),
    AutoMinorVersionUpgrade: S.optional(S.Boolean),
    AvailabilityZone: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    MultiAZ: S.optional(S.Boolean),
    PreferredMaintenanceWindow: S.optional(S.String),
    PubliclyAccessible: S.optional(S.Boolean),
    ReplicationInstanceClass: S.optional(S.String),
    ReplicationInstanceIdentifier: S.optional(S.String),
    ReplicationSubnetGroup: S.optional(
      AwsDmsReplicationInstanceReplicationSubnetGroupDetails,
    ),
    VpcSecurityGroups: S.optional(
      AwsDmsReplicationInstanceVpcSecurityGroupsList,
    ),
  }),
).annotate({
  identifier: "AwsDmsReplicationInstanceDetails",
}) as any as S.Schema<AwsDmsReplicationInstanceDetails>;
export interface AwsRoute53HostedZoneConfigDetails {
  Comment?: string;
}
export const AwsRoute53HostedZoneConfigDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Comment: S.optional(S.String) }),
).annotate({
  identifier: "AwsRoute53HostedZoneConfigDetails",
}) as any as S.Schema<AwsRoute53HostedZoneConfigDetails>;
export interface AwsRoute53HostedZoneObjectDetails {
  Id?: string;
  Name?: string;
  Config?: AwsRoute53HostedZoneConfigDetails;
}
export const AwsRoute53HostedZoneObjectDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Config: S.optional(AwsRoute53HostedZoneConfigDetails),
  }),
).annotate({
  identifier: "AwsRoute53HostedZoneObjectDetails",
}) as any as S.Schema<AwsRoute53HostedZoneObjectDetails>;
export interface AwsRoute53HostedZoneVpcDetails {
  Id?: string;
  Region?: string;
}
export const AwsRoute53HostedZoneVpcDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String), Region: S.optional(S.String) }),
).annotate({
  identifier: "AwsRoute53HostedZoneVpcDetails",
}) as any as S.Schema<AwsRoute53HostedZoneVpcDetails>;
export type AwsRoute53HostedZoneVpcsList = AwsRoute53HostedZoneVpcDetails[];
export const AwsRoute53HostedZoneVpcsList = /*@__PURE__*/ S.Array(
  AwsRoute53HostedZoneVpcDetails,
);
export type AwsRoute53HostedZoneNameServersList = string[];
export const AwsRoute53HostedZoneNameServersList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface CloudWatchLogsLogGroupArnConfigDetails {
  CloudWatchLogsLogGroupArn?: string;
  HostedZoneId?: string;
  Id?: string;
}
export const CloudWatchLogsLogGroupArnConfigDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CloudWatchLogsLogGroupArn: S.optional(S.String),
      HostedZoneId: S.optional(S.String),
      Id: S.optional(S.String),
    }),
).annotate({
  identifier: "CloudWatchLogsLogGroupArnConfigDetails",
}) as any as S.Schema<CloudWatchLogsLogGroupArnConfigDetails>;
export interface AwsRoute53QueryLoggingConfigDetails {
  CloudWatchLogsLogGroupArn?: CloudWatchLogsLogGroupArnConfigDetails;
}
export const AwsRoute53QueryLoggingConfigDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudWatchLogsLogGroupArn: S.optional(
      CloudWatchLogsLogGroupArnConfigDetails,
    ),
  }),
).annotate({
  identifier: "AwsRoute53QueryLoggingConfigDetails",
}) as any as S.Schema<AwsRoute53QueryLoggingConfigDetails>;
export interface AwsRoute53HostedZoneDetails {
  HostedZone?: AwsRoute53HostedZoneObjectDetails;
  Vpcs?: AwsRoute53HostedZoneVpcDetails[];
  NameServers?: string[];
  QueryLoggingConfig?: AwsRoute53QueryLoggingConfigDetails;
}
export const AwsRoute53HostedZoneDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HostedZone: S.optional(AwsRoute53HostedZoneObjectDetails),
    Vpcs: S.optional(AwsRoute53HostedZoneVpcsList),
    NameServers: S.optional(AwsRoute53HostedZoneNameServersList),
    QueryLoggingConfig: S.optional(AwsRoute53QueryLoggingConfigDetails),
  }),
).annotate({
  identifier: "AwsRoute53HostedZoneDetails",
}) as any as S.Schema<AwsRoute53HostedZoneDetails>;
export interface AwsMskClusterClusterInfoEncryptionInfoEncryptionInTransitDetails {
  InCluster?: boolean;
  ClientBroker?: string;
}
export const AwsMskClusterClusterInfoEncryptionInfoEncryptionInTransitDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      InCluster: S.optional(S.Boolean),
      ClientBroker: S.optional(S.String),
    }),
  ).annotate({
    identifier:
      "AwsMskClusterClusterInfoEncryptionInfoEncryptionInTransitDetails",
  }) as any as S.Schema<AwsMskClusterClusterInfoEncryptionInfoEncryptionInTransitDetails>;
export interface AwsMskClusterClusterInfoEncryptionInfoEncryptionAtRestDetails {
  DataVolumeKMSKeyId?: string;
}
export const AwsMskClusterClusterInfoEncryptionInfoEncryptionAtRestDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ DataVolumeKMSKeyId: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsMskClusterClusterInfoEncryptionInfoEncryptionAtRestDetails",
  }) as any as S.Schema<AwsMskClusterClusterInfoEncryptionInfoEncryptionAtRestDetails>;
export interface AwsMskClusterClusterInfoEncryptionInfoDetails {
  EncryptionInTransit?: AwsMskClusterClusterInfoEncryptionInfoEncryptionInTransitDetails;
  EncryptionAtRest?: AwsMskClusterClusterInfoEncryptionInfoEncryptionAtRestDetails;
}
export const AwsMskClusterClusterInfoEncryptionInfoDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      EncryptionInTransit: S.optional(
        AwsMskClusterClusterInfoEncryptionInfoEncryptionInTransitDetails,
      ),
      EncryptionAtRest: S.optional(
        AwsMskClusterClusterInfoEncryptionInfoEncryptionAtRestDetails,
      ),
    }),
  ).annotate({
    identifier: "AwsMskClusterClusterInfoEncryptionInfoDetails",
  }) as any as S.Schema<AwsMskClusterClusterInfoEncryptionInfoDetails>;
export interface AwsMskClusterClusterInfoClientAuthenticationSaslIamDetails {
  Enabled?: boolean;
}
export const AwsMskClusterClusterInfoClientAuthenticationSaslIamDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Enabled: S.optional(S.Boolean) }),
  ).annotate({
    identifier: "AwsMskClusterClusterInfoClientAuthenticationSaslIamDetails",
  }) as any as S.Schema<AwsMskClusterClusterInfoClientAuthenticationSaslIamDetails>;
export interface AwsMskClusterClusterInfoClientAuthenticationSaslScramDetails {
  Enabled?: boolean;
}
export const AwsMskClusterClusterInfoClientAuthenticationSaslScramDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Enabled: S.optional(S.Boolean) }),
  ).annotate({
    identifier: "AwsMskClusterClusterInfoClientAuthenticationSaslScramDetails",
  }) as any as S.Schema<AwsMskClusterClusterInfoClientAuthenticationSaslScramDetails>;
export interface AwsMskClusterClusterInfoClientAuthenticationSaslDetails {
  Iam?: AwsMskClusterClusterInfoClientAuthenticationSaslIamDetails;
  Scram?: AwsMskClusterClusterInfoClientAuthenticationSaslScramDetails;
}
export const AwsMskClusterClusterInfoClientAuthenticationSaslDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Iam: S.optional(
        AwsMskClusterClusterInfoClientAuthenticationSaslIamDetails,
      ),
      Scram: S.optional(
        AwsMskClusterClusterInfoClientAuthenticationSaslScramDetails,
      ),
    }),
  ).annotate({
    identifier: "AwsMskClusterClusterInfoClientAuthenticationSaslDetails",
  }) as any as S.Schema<AwsMskClusterClusterInfoClientAuthenticationSaslDetails>;
export interface AwsMskClusterClusterInfoClientAuthenticationUnauthenticatedDetails {
  Enabled?: boolean;
}
export const AwsMskClusterClusterInfoClientAuthenticationUnauthenticatedDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Enabled: S.optional(S.Boolean) }),
  ).annotate({
    identifier:
      "AwsMskClusterClusterInfoClientAuthenticationUnauthenticatedDetails",
  }) as any as S.Schema<AwsMskClusterClusterInfoClientAuthenticationUnauthenticatedDetails>;
export interface AwsMskClusterClusterInfoClientAuthenticationTlsDetails {
  CertificateAuthorityArnList?: string[];
  Enabled?: boolean;
}
export const AwsMskClusterClusterInfoClientAuthenticationTlsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CertificateAuthorityArnList: S.optional(StringList),
      Enabled: S.optional(S.Boolean),
    }),
  ).annotate({
    identifier: "AwsMskClusterClusterInfoClientAuthenticationTlsDetails",
  }) as any as S.Schema<AwsMskClusterClusterInfoClientAuthenticationTlsDetails>;
export interface AwsMskClusterClusterInfoClientAuthenticationDetails {
  Sasl?: AwsMskClusterClusterInfoClientAuthenticationSaslDetails;
  Unauthenticated?: AwsMskClusterClusterInfoClientAuthenticationUnauthenticatedDetails;
  Tls?: AwsMskClusterClusterInfoClientAuthenticationTlsDetails;
}
export const AwsMskClusterClusterInfoClientAuthenticationDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Sasl: S.optional(AwsMskClusterClusterInfoClientAuthenticationSaslDetails),
      Unauthenticated: S.optional(
        AwsMskClusterClusterInfoClientAuthenticationUnauthenticatedDetails,
      ),
      Tls: S.optional(AwsMskClusterClusterInfoClientAuthenticationTlsDetails),
    }),
  ).annotate({
    identifier: "AwsMskClusterClusterInfoClientAuthenticationDetails",
  }) as any as S.Schema<AwsMskClusterClusterInfoClientAuthenticationDetails>;
export interface AwsMskClusterClusterInfoDetails {
  EncryptionInfo?: AwsMskClusterClusterInfoEncryptionInfoDetails;
  CurrentVersion?: string;
  NumberOfBrokerNodes?: number;
  ClusterName?: string;
  ClientAuthentication?: AwsMskClusterClusterInfoClientAuthenticationDetails;
  EnhancedMonitoring?: string;
}
export const AwsMskClusterClusterInfoDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EncryptionInfo: S.optional(AwsMskClusterClusterInfoEncryptionInfoDetails),
    CurrentVersion: S.optional(S.String),
    NumberOfBrokerNodes: S.optional(S.Number),
    ClusterName: S.optional(S.String),
    ClientAuthentication: S.optional(
      AwsMskClusterClusterInfoClientAuthenticationDetails,
    ),
    EnhancedMonitoring: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsMskClusterClusterInfoDetails",
}) as any as S.Schema<AwsMskClusterClusterInfoDetails>;
export interface AwsMskClusterDetails {
  ClusterInfo?: AwsMskClusterClusterInfoDetails;
}
export const AwsMskClusterDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterInfo: S.optional(AwsMskClusterClusterInfoDetails) }),
).annotate({
  identifier: "AwsMskClusterDetails",
}) as any as S.Schema<AwsMskClusterDetails>;
export interface AwsS3AccessPointVpcConfigurationDetails {
  VpcId?: string;
}
export const AwsS3AccessPointVpcConfigurationDetails = /*@__PURE__*/ S.suspend(
  () => S.Struct({ VpcId: S.optional(S.String) }),
).annotate({
  identifier: "AwsS3AccessPointVpcConfigurationDetails",
}) as any as S.Schema<AwsS3AccessPointVpcConfigurationDetails>;
export interface AwsS3AccessPointDetails {
  AccessPointArn?: string;
  Alias?: string;
  Bucket?: string;
  BucketAccountId?: string;
  Name?: string;
  NetworkOrigin?: string;
  PublicAccessBlockConfiguration?: AwsS3AccountPublicAccessBlockDetails;
  VpcConfiguration?: AwsS3AccessPointVpcConfigurationDetails;
}
export const AwsS3AccessPointDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessPointArn: S.optional(S.String),
    Alias: S.optional(S.String),
    Bucket: S.optional(S.String),
    BucketAccountId: S.optional(S.String),
    Name: S.optional(S.String),
    NetworkOrigin: S.optional(S.String),
    PublicAccessBlockConfiguration: S.optional(
      AwsS3AccountPublicAccessBlockDetails,
    ),
    VpcConfiguration: S.optional(AwsS3AccessPointVpcConfigurationDetails),
  }),
).annotate({
  identifier: "AwsS3AccessPointDetails",
}) as any as S.Schema<AwsS3AccessPointDetails>;
export interface AwsEc2ClientVpnEndpointAuthenticationOptionsActiveDirectoryDetails {
  DirectoryId?: string;
}
export const AwsEc2ClientVpnEndpointAuthenticationOptionsActiveDirectoryDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ DirectoryId: S.optional(S.String) }),
  ).annotate({
    identifier:
      "AwsEc2ClientVpnEndpointAuthenticationOptionsActiveDirectoryDetails",
  }) as any as S.Schema<AwsEc2ClientVpnEndpointAuthenticationOptionsActiveDirectoryDetails>;
export interface AwsEc2ClientVpnEndpointAuthenticationOptionsMutualAuthenticationDetails {
  ClientRootCertificateChain?: string;
}
export const AwsEc2ClientVpnEndpointAuthenticationOptionsMutualAuthenticationDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ClientRootCertificateChain: S.optional(S.String) }),
  ).annotate({
    identifier:
      "AwsEc2ClientVpnEndpointAuthenticationOptionsMutualAuthenticationDetails",
  }) as any as S.Schema<AwsEc2ClientVpnEndpointAuthenticationOptionsMutualAuthenticationDetails>;
export interface AwsEc2ClientVpnEndpointAuthenticationOptionsFederatedAuthenticationDetails {
  SamlProviderArn?: string;
  SelfServiceSamlProviderArn?: string;
}
export const AwsEc2ClientVpnEndpointAuthenticationOptionsFederatedAuthenticationDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      SamlProviderArn: S.optional(S.String),
      SelfServiceSamlProviderArn: S.optional(S.String),
    }),
  ).annotate({
    identifier:
      "AwsEc2ClientVpnEndpointAuthenticationOptionsFederatedAuthenticationDetails",
  }) as any as S.Schema<AwsEc2ClientVpnEndpointAuthenticationOptionsFederatedAuthenticationDetails>;
export interface AwsEc2ClientVpnEndpointAuthenticationOptionsDetails {
  Type?: string;
  ActiveDirectory?: AwsEc2ClientVpnEndpointAuthenticationOptionsActiveDirectoryDetails;
  MutualAuthentication?: AwsEc2ClientVpnEndpointAuthenticationOptionsMutualAuthenticationDetails;
  FederatedAuthentication?: AwsEc2ClientVpnEndpointAuthenticationOptionsFederatedAuthenticationDetails;
}
export const AwsEc2ClientVpnEndpointAuthenticationOptionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Type: S.optional(S.String),
      ActiveDirectory: S.optional(
        AwsEc2ClientVpnEndpointAuthenticationOptionsActiveDirectoryDetails,
      ),
      MutualAuthentication: S.optional(
        AwsEc2ClientVpnEndpointAuthenticationOptionsMutualAuthenticationDetails,
      ),
      FederatedAuthentication: S.optional(
        AwsEc2ClientVpnEndpointAuthenticationOptionsFederatedAuthenticationDetails,
      ),
    }),
  ).annotate({
    identifier: "AwsEc2ClientVpnEndpointAuthenticationOptionsDetails",
  }) as any as S.Schema<AwsEc2ClientVpnEndpointAuthenticationOptionsDetails>;
export type AwsEc2ClientVpnEndpointAuthenticationOptionsList =
  AwsEc2ClientVpnEndpointAuthenticationOptionsDetails[];
export const AwsEc2ClientVpnEndpointAuthenticationOptionsList =
  /*@__PURE__*/ S.Array(AwsEc2ClientVpnEndpointAuthenticationOptionsDetails);
export interface AwsEc2ClientVpnEndpointConnectionLogOptionsDetails {
  Enabled?: boolean;
  CloudwatchLogGroup?: string;
  CloudwatchLogStream?: string;
}
export const AwsEc2ClientVpnEndpointConnectionLogOptionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Enabled: S.optional(S.Boolean),
      CloudwatchLogGroup: S.optional(S.String),
      CloudwatchLogStream: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsEc2ClientVpnEndpointConnectionLogOptionsDetails",
  }) as any as S.Schema<AwsEc2ClientVpnEndpointConnectionLogOptionsDetails>;
export interface AwsEc2ClientVpnEndpointClientConnectOptionsStatusDetails {
  Code?: string;
  Message?: string;
}
export const AwsEc2ClientVpnEndpointClientConnectOptionsStatusDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Code: S.optional(S.String), Message: S.optional(S.String) }),
  ).annotate({
    identifier: "AwsEc2ClientVpnEndpointClientConnectOptionsStatusDetails",
  }) as any as S.Schema<AwsEc2ClientVpnEndpointClientConnectOptionsStatusDetails>;
export interface AwsEc2ClientVpnEndpointClientConnectOptionsDetails {
  Enabled?: boolean;
  LambdaFunctionArn?: string;
  Status?: AwsEc2ClientVpnEndpointClientConnectOptionsStatusDetails;
}
export const AwsEc2ClientVpnEndpointClientConnectOptionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Enabled: S.optional(S.Boolean),
      LambdaFunctionArn: S.optional(S.String),
      Status: S.optional(
        AwsEc2ClientVpnEndpointClientConnectOptionsStatusDetails,
      ),
    }),
  ).annotate({
    identifier: "AwsEc2ClientVpnEndpointClientConnectOptionsDetails",
  }) as any as S.Schema<AwsEc2ClientVpnEndpointClientConnectOptionsDetails>;
export interface AwsEc2ClientVpnEndpointClientLoginBannerOptionsDetails {
  Enabled?: boolean;
  BannerText?: string;
}
export const AwsEc2ClientVpnEndpointClientLoginBannerOptionsDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Enabled: S.optional(S.Boolean),
      BannerText: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AwsEc2ClientVpnEndpointClientLoginBannerOptionsDetails",
  }) as any as S.Schema<AwsEc2ClientVpnEndpointClientLoginBannerOptionsDetails>;
export interface AwsEc2ClientVpnEndpointDetails {
  ClientVpnEndpointId?: string;
  Description?: string;
  ClientCidrBlock?: string;
  DnsServer?: string[];
  SplitTunnel?: boolean;
  TransportProtocol?: string;
  VpnPort?: number;
  ServerCertificateArn?: string;
  AuthenticationOptions?: AwsEc2ClientVpnEndpointAuthenticationOptionsDetails[];
  ConnectionLogOptions?: AwsEc2ClientVpnEndpointConnectionLogOptionsDetails;
  SecurityGroupIdSet?: string[];
  VpcId?: string;
  SelfServicePortalUrl?: string;
  ClientConnectOptions?: AwsEc2ClientVpnEndpointClientConnectOptionsDetails;
  SessionTimeoutHours?: number;
  ClientLoginBannerOptions?: AwsEc2ClientVpnEndpointClientLoginBannerOptionsDetails;
}
export const AwsEc2ClientVpnEndpointDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientVpnEndpointId: S.optional(S.String),
    Description: S.optional(S.String),
    ClientCidrBlock: S.optional(S.String),
    DnsServer: S.optional(StringList),
    SplitTunnel: S.optional(S.Boolean),
    TransportProtocol: S.optional(S.String),
    VpnPort: S.optional(S.Number),
    ServerCertificateArn: S.optional(S.String),
    AuthenticationOptions: S.optional(
      AwsEc2ClientVpnEndpointAuthenticationOptionsList,
    ),
    ConnectionLogOptions: S.optional(
      AwsEc2ClientVpnEndpointConnectionLogOptionsDetails,
    ),
    SecurityGroupIdSet: S.optional(StringList),
    VpcId: S.optional(S.String),
    SelfServicePortalUrl: S.optional(S.String),
    ClientConnectOptions: S.optional(
      AwsEc2ClientVpnEndpointClientConnectOptionsDetails,
    ),
    SessionTimeoutHours: S.optional(S.Number),
    ClientLoginBannerOptions: S.optional(
      AwsEc2ClientVpnEndpointClientLoginBannerOptionsDetails,
    ),
  }),
).annotate({
  identifier: "AwsEc2ClientVpnEndpointDetails",
}) as any as S.Schema<AwsEc2ClientVpnEndpointDetails>;
export interface CodeRepositoryDetails {
  ProviderType?: string;
  ProjectName?: string;
  CodeSecurityIntegrationArn?: string;
}
export const CodeRepositoryDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProviderType: S.optional(S.String),
    ProjectName: S.optional(S.String),
    CodeSecurityIntegrationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CodeRepositoryDetails",
}) as any as S.Schema<CodeRepositoryDetails>;
export interface ResourceDetails {
  AwsAutoScalingAutoScalingGroup?: AwsAutoScalingAutoScalingGroupDetails;
  AwsCodeBuildProject?: AwsCodeBuildProjectDetails;
  AwsCloudFrontDistribution?: AwsCloudFrontDistributionDetails;
  AwsEc2Instance?: AwsEc2InstanceDetails;
  AwsEc2NetworkInterface?: AwsEc2NetworkInterfaceDetails;
  AwsEc2SecurityGroup?: AwsEc2SecurityGroupDetails;
  AwsEc2Volume?: AwsEc2VolumeDetails;
  AwsEc2Vpc?: AwsEc2VpcDetails;
  AwsEc2Eip?: AwsEc2EipDetails;
  AwsEc2Subnet?: AwsEc2SubnetDetails;
  AwsEc2NetworkAcl?: AwsEc2NetworkAclDetails;
  AwsElbv2LoadBalancer?: AwsElbv2LoadBalancerDetails;
  AwsElasticBeanstalkEnvironment?: AwsElasticBeanstalkEnvironmentDetails;
  AwsElasticsearchDomain?: AwsElasticsearchDomainDetails;
  AwsS3Bucket?: AwsS3BucketDetails;
  AwsS3AccountPublicAccessBlock?: AwsS3AccountPublicAccessBlockDetails;
  AwsS3Object?: AwsS3ObjectDetails;
  AwsSecretsManagerSecret?: AwsSecretsManagerSecretDetails;
  AwsIamAccessKey?: AwsIamAccessKeyDetails;
  AwsIamUser?: AwsIamUserDetails;
  AwsIamPolicy?: AwsIamPolicyDetails;
  AwsApiGatewayV2Stage?: AwsApiGatewayV2StageDetails;
  AwsApiGatewayV2Api?: AwsApiGatewayV2ApiDetails;
  AwsDynamoDbTable?: AwsDynamoDbTableDetails;
  AwsApiGatewayStage?: AwsApiGatewayStageDetails;
  AwsApiGatewayRestApi?: AwsApiGatewayRestApiDetails;
  AwsCloudTrailTrail?: AwsCloudTrailTrailDetails;
  AwsSsmPatchCompliance?: AwsSsmPatchComplianceDetails;
  AwsCertificateManagerCertificate?: AwsCertificateManagerCertificateDetails;
  AwsRedshiftCluster?: AwsRedshiftClusterDetails;
  AwsElbLoadBalancer?: AwsElbLoadBalancerDetails;
  AwsIamGroup?: AwsIamGroupDetails;
  AwsIamRole?: AwsIamRoleDetails;
  AwsKmsKey?: AwsKmsKeyDetails;
  AwsLambdaFunction?: AwsLambdaFunctionDetails;
  AwsLambdaLayerVersion?: AwsLambdaLayerVersionDetails;
  AwsRdsDbInstance?: AwsRdsDbInstanceDetails;
  AwsSnsTopic?: AwsSnsTopicDetails;
  AwsSqsQueue?: AwsSqsQueueDetails;
  AwsWafWebAcl?: AwsWafWebAclDetails;
  AwsRdsDbSnapshot?: AwsRdsDbSnapshotDetails;
  AwsRdsDbClusterSnapshot?: AwsRdsDbClusterSnapshotDetails;
  AwsRdsDbCluster?: AwsRdsDbClusterDetails;
  AwsEcsCluster?: AwsEcsClusterDetails;
  AwsEcsContainer?: AwsEcsContainerDetails;
  AwsEcsTaskDefinition?: AwsEcsTaskDefinitionDetails;
  Container?: ContainerDetails;
  Other?: { [key: string]: string | undefined };
  AwsRdsEventSubscription?: AwsRdsEventSubscriptionDetails;
  AwsEcsService?: AwsEcsServiceDetails;
  AwsAutoScalingLaunchConfiguration?: AwsAutoScalingLaunchConfigurationDetails;
  AwsEc2VpnConnection?: AwsEc2VpnConnectionDetails;
  AwsEcrContainerImage?: AwsEcrContainerImageDetails;
  AwsOpenSearchServiceDomain?: AwsOpenSearchServiceDomainDetails;
  AwsEc2VpcEndpointService?: AwsEc2VpcEndpointServiceDetails;
  AwsXrayEncryptionConfig?: AwsXrayEncryptionConfigDetails;
  AwsWafRateBasedRule?: AwsWafRateBasedRuleDetails;
  AwsWafRegionalRateBasedRule?: AwsWafRegionalRateBasedRuleDetails;
  AwsEcrRepository?: AwsEcrRepositoryDetails;
  AwsEksCluster?: AwsEksClusterDetails;
  AwsNetworkFirewallFirewallPolicy?: AwsNetworkFirewallFirewallPolicyDetails;
  AwsNetworkFirewallFirewall?: AwsNetworkFirewallFirewallDetails;
  AwsNetworkFirewallRuleGroup?: AwsNetworkFirewallRuleGroupDetails;
  AwsRdsDbSecurityGroup?: AwsRdsDbSecurityGroupDetails;
  AwsKinesisStream?: AwsKinesisStreamDetails;
  AwsEc2TransitGateway?: AwsEc2TransitGatewayDetails;
  AwsEfsAccessPoint?: AwsEfsAccessPointDetails;
  AwsCloudFormationStack?: AwsCloudFormationStackDetails;
  AwsCloudWatchAlarm?: AwsCloudWatchAlarmDetails;
  AwsEc2VpcPeeringConnection?: AwsEc2VpcPeeringConnectionDetails;
  AwsWafRegionalRuleGroup?: AwsWafRegionalRuleGroupDetails;
  AwsWafRegionalRule?: AwsWafRegionalRuleDetails;
  AwsWafRegionalWebAcl?: AwsWafRegionalWebAclDetails;
  AwsWafRule?: AwsWafRuleDetails;
  AwsWafRuleGroup?: AwsWafRuleGroupDetails;
  AwsEcsTask?: AwsEcsTaskDetails;
  AwsBackupBackupVault?: AwsBackupBackupVaultDetails;
  AwsBackupBackupPlan?: AwsBackupBackupPlanDetails;
  AwsBackupRecoveryPoint?: AwsBackupRecoveryPointDetails;
  AwsEc2LaunchTemplate?: AwsEc2LaunchTemplateDetails;
  AwsSageMakerNotebookInstance?: AwsSageMakerNotebookInstanceDetails;
  AwsWafv2WebAcl?: AwsWafv2WebAclDetails;
  AwsWafv2RuleGroup?: AwsWafv2RuleGroupDetails;
  AwsEc2RouteTable?: AwsEc2RouteTableDetails;
  AwsAmazonMqBroker?: AwsAmazonMqBrokerDetails;
  AwsAppSyncGraphQlApi?: AwsAppSyncGraphQlApiDetails;
  AwsEventSchemasRegistry?: AwsEventSchemasRegistryDetails;
  AwsGuardDutyDetector?: AwsGuardDutyDetectorDetails;
  AwsStepFunctionStateMachine?: AwsStepFunctionStateMachineDetails;
  AwsAthenaWorkGroup?: AwsAthenaWorkGroupDetails;
  AwsEventsEventbus?: AwsEventsEventbusDetails;
  AwsDmsEndpoint?: AwsDmsEndpointDetails;
  AwsEventsEndpoint?: AwsEventsEndpointDetails;
  AwsDmsReplicationTask?: AwsDmsReplicationTaskDetails;
  AwsDmsReplicationInstance?: AwsDmsReplicationInstanceDetails;
  AwsRoute53HostedZone?: AwsRoute53HostedZoneDetails;
  AwsMskCluster?: AwsMskClusterDetails;
  AwsS3AccessPoint?: AwsS3AccessPointDetails;
  AwsEc2ClientVpnEndpoint?: AwsEc2ClientVpnEndpointDetails;
  CodeRepository?: CodeRepositoryDetails;
}
export const ResourceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AwsAutoScalingAutoScalingGroup: S.optional(
      AwsAutoScalingAutoScalingGroupDetails,
    ),
    AwsCodeBuildProject: S.optional(AwsCodeBuildProjectDetails),
    AwsCloudFrontDistribution: S.optional(AwsCloudFrontDistributionDetails),
    AwsEc2Instance: S.optional(AwsEc2InstanceDetails),
    AwsEc2NetworkInterface: S.optional(AwsEc2NetworkInterfaceDetails),
    AwsEc2SecurityGroup: S.optional(AwsEc2SecurityGroupDetails),
    AwsEc2Volume: S.optional(AwsEc2VolumeDetails),
    AwsEc2Vpc: S.optional(AwsEc2VpcDetails),
    AwsEc2Eip: S.optional(AwsEc2EipDetails),
    AwsEc2Subnet: S.optional(AwsEc2SubnetDetails),
    AwsEc2NetworkAcl: S.optional(AwsEc2NetworkAclDetails),
    AwsElbv2LoadBalancer: S.optional(AwsElbv2LoadBalancerDetails),
    AwsElasticBeanstalkEnvironment: S.optional(
      AwsElasticBeanstalkEnvironmentDetails,
    ),
    AwsElasticsearchDomain: S.optional(AwsElasticsearchDomainDetails),
    AwsS3Bucket: S.optional(AwsS3BucketDetails),
    AwsS3AccountPublicAccessBlock: S.optional(
      AwsS3AccountPublicAccessBlockDetails,
    ),
    AwsS3Object: S.optional(AwsS3ObjectDetails),
    AwsSecretsManagerSecret: S.optional(AwsSecretsManagerSecretDetails),
    AwsIamAccessKey: S.optional(AwsIamAccessKeyDetails),
    AwsIamUser: S.optional(AwsIamUserDetails),
    AwsIamPolicy: S.optional(AwsIamPolicyDetails),
    AwsApiGatewayV2Stage: S.optional(AwsApiGatewayV2StageDetails),
    AwsApiGatewayV2Api: S.optional(AwsApiGatewayV2ApiDetails),
    AwsDynamoDbTable: S.optional(AwsDynamoDbTableDetails),
    AwsApiGatewayStage: S.optional(AwsApiGatewayStageDetails),
    AwsApiGatewayRestApi: S.optional(AwsApiGatewayRestApiDetails),
    AwsCloudTrailTrail: S.optional(AwsCloudTrailTrailDetails),
    AwsSsmPatchCompliance: S.optional(AwsSsmPatchComplianceDetails),
    AwsCertificateManagerCertificate: S.optional(
      AwsCertificateManagerCertificateDetails,
    ),
    AwsRedshiftCluster: S.optional(AwsRedshiftClusterDetails),
    AwsElbLoadBalancer: S.optional(AwsElbLoadBalancerDetails),
    AwsIamGroup: S.optional(AwsIamGroupDetails),
    AwsIamRole: S.optional(AwsIamRoleDetails),
    AwsKmsKey: S.optional(AwsKmsKeyDetails),
    AwsLambdaFunction: S.optional(AwsLambdaFunctionDetails),
    AwsLambdaLayerVersion: S.optional(AwsLambdaLayerVersionDetails),
    AwsRdsDbInstance: S.optional(AwsRdsDbInstanceDetails),
    AwsSnsTopic: S.optional(AwsSnsTopicDetails),
    AwsSqsQueue: S.optional(AwsSqsQueueDetails),
    AwsWafWebAcl: S.optional(AwsWafWebAclDetails),
    AwsRdsDbSnapshot: S.optional(AwsRdsDbSnapshotDetails),
    AwsRdsDbClusterSnapshot: S.optional(AwsRdsDbClusterSnapshotDetails),
    AwsRdsDbCluster: S.optional(AwsRdsDbClusterDetails),
    AwsEcsCluster: S.optional(AwsEcsClusterDetails),
    AwsEcsContainer: S.optional(AwsEcsContainerDetails),
    AwsEcsTaskDefinition: S.optional(AwsEcsTaskDefinitionDetails),
    Container: S.optional(ContainerDetails),
    Other: S.optional(FieldMap),
    AwsRdsEventSubscription: S.optional(AwsRdsEventSubscriptionDetails),
    AwsEcsService: S.optional(AwsEcsServiceDetails),
    AwsAutoScalingLaunchConfiguration: S.optional(
      AwsAutoScalingLaunchConfigurationDetails,
    ),
    AwsEc2VpnConnection: S.optional(AwsEc2VpnConnectionDetails),
    AwsEcrContainerImage: S.optional(AwsEcrContainerImageDetails),
    AwsOpenSearchServiceDomain: S.optional(AwsOpenSearchServiceDomainDetails),
    AwsEc2VpcEndpointService: S.optional(AwsEc2VpcEndpointServiceDetails),
    AwsXrayEncryptionConfig: S.optional(AwsXrayEncryptionConfigDetails),
    AwsWafRateBasedRule: S.optional(AwsWafRateBasedRuleDetails),
    AwsWafRegionalRateBasedRule: S.optional(AwsWafRegionalRateBasedRuleDetails),
    AwsEcrRepository: S.optional(AwsEcrRepositoryDetails),
    AwsEksCluster: S.optional(AwsEksClusterDetails),
    AwsNetworkFirewallFirewallPolicy: S.optional(
      AwsNetworkFirewallFirewallPolicyDetails,
    ),
    AwsNetworkFirewallFirewall: S.optional(AwsNetworkFirewallFirewallDetails),
    AwsNetworkFirewallRuleGroup: S.optional(AwsNetworkFirewallRuleGroupDetails),
    AwsRdsDbSecurityGroup: S.optional(AwsRdsDbSecurityGroupDetails),
    AwsKinesisStream: S.optional(AwsKinesisStreamDetails),
    AwsEc2TransitGateway: S.optional(AwsEc2TransitGatewayDetails),
    AwsEfsAccessPoint: S.optional(AwsEfsAccessPointDetails),
    AwsCloudFormationStack: S.optional(AwsCloudFormationStackDetails),
    AwsCloudWatchAlarm: S.optional(AwsCloudWatchAlarmDetails),
    AwsEc2VpcPeeringConnection: S.optional(AwsEc2VpcPeeringConnectionDetails),
    AwsWafRegionalRuleGroup: S.optional(AwsWafRegionalRuleGroupDetails),
    AwsWafRegionalRule: S.optional(AwsWafRegionalRuleDetails),
    AwsWafRegionalWebAcl: S.optional(AwsWafRegionalWebAclDetails),
    AwsWafRule: S.optional(AwsWafRuleDetails),
    AwsWafRuleGroup: S.optional(AwsWafRuleGroupDetails),
    AwsEcsTask: S.optional(AwsEcsTaskDetails),
    AwsBackupBackupVault: S.optional(AwsBackupBackupVaultDetails),
    AwsBackupBackupPlan: S.optional(AwsBackupBackupPlanDetails),
    AwsBackupRecoveryPoint: S.optional(AwsBackupRecoveryPointDetails),
    AwsEc2LaunchTemplate: S.optional(AwsEc2LaunchTemplateDetails),
    AwsSageMakerNotebookInstance: S.optional(
      AwsSageMakerNotebookInstanceDetails,
    ),
    AwsWafv2WebAcl: S.optional(AwsWafv2WebAclDetails),
    AwsWafv2RuleGroup: S.optional(AwsWafv2RuleGroupDetails),
    AwsEc2RouteTable: S.optional(AwsEc2RouteTableDetails),
    AwsAmazonMqBroker: S.optional(AwsAmazonMqBrokerDetails),
    AwsAppSyncGraphQlApi: S.optional(AwsAppSyncGraphQlApiDetails),
    AwsEventSchemasRegistry: S.optional(AwsEventSchemasRegistryDetails),
    AwsGuardDutyDetector: S.optional(AwsGuardDutyDetectorDetails),
    AwsStepFunctionStateMachine: S.optional(AwsStepFunctionStateMachineDetails),
    AwsAthenaWorkGroup: S.optional(AwsAthenaWorkGroupDetails),
    AwsEventsEventbus: S.optional(AwsEventsEventbusDetails),
    AwsDmsEndpoint: S.optional(AwsDmsEndpointDetails),
    AwsEventsEndpoint: S.optional(AwsEventsEndpointDetails),
    AwsDmsReplicationTask: S.optional(AwsDmsReplicationTaskDetails),
    AwsDmsReplicationInstance: S.optional(AwsDmsReplicationInstanceDetails),
    AwsRoute53HostedZone: S.optional(AwsRoute53HostedZoneDetails),
    AwsMskCluster: S.optional(AwsMskClusterDetails),
    AwsS3AccessPoint: S.optional(AwsS3AccessPointDetails),
    AwsEc2ClientVpnEndpoint: S.optional(AwsEc2ClientVpnEndpointDetails),
    CodeRepository: S.optional(CodeRepositoryDetails),
  }),
).annotate({
  identifier: "ResourceDetails",
}) as any as S.Schema<ResourceDetails>;
export interface Resource {
  Type?: string;
  Id?: string;
  Partition?: Partition;
  Region?: string;
  ResourceRole?: string;
  Tags?: { [key: string]: string | undefined };
  DataClassification?: DataClassificationDetails;
  Details?: ResourceDetails;
  ApplicationName?: string;
  ApplicationArn?: string;
}
export const Resource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(S.String),
    Id: S.optional(S.String),
    Partition: S.optional(Partition),
    Region: S.optional(S.String),
    ResourceRole: S.optional(S.String),
    Tags: S.optional(FieldMap),
    DataClassification: S.optional(DataClassificationDetails),
    Details: S.optional(ResourceDetails),
    ApplicationName: S.optional(S.String),
    ApplicationArn: S.optional(S.String),
  }),
).annotate({ identifier: "Resource" }) as any as S.Schema<Resource>;
export type ResourceList = Resource[];
export const ResourceList = /*@__PURE__*/ S.Array(Resource);
export type ComplianceStatus =
  | "PASSED"
  | "WARNING"
  | "FAILED"
  | "NOT_AVAILABLE"
  | (string & {});
export const ComplianceStatus = /*@__PURE__*/ S.String;

export interface StatusReason {
  ReasonCode?: string;
  Description?: string;
}
export const StatusReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReasonCode: S.optional(S.String),
    Description: S.optional(S.String),
  }),
).annotate({ identifier: "StatusReason" }) as any as S.Schema<StatusReason>;
export type StatusReasonsList = StatusReason[];
export const StatusReasonsList = /*@__PURE__*/ S.Array(StatusReason);
export interface AssociatedStandard {
  StandardsId?: string;
}
export const AssociatedStandard = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StandardsId: S.optional(S.String) }),
).annotate({
  identifier: "AssociatedStandard",
}) as any as S.Schema<AssociatedStandard>;
export type AssociatedStandardsList = AssociatedStandard[];
export const AssociatedStandardsList =
  /*@__PURE__*/ S.Array(AssociatedStandard);
export interface SecurityControlParameter {
  Name?: string;
  Value?: string[];
}
export const SecurityControlParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Value: S.optional(TypeList) }),
).annotate({
  identifier: "SecurityControlParameter",
}) as any as S.Schema<SecurityControlParameter>;
export type SecurityControlParametersList = SecurityControlParameter[];
export const SecurityControlParametersList = /*@__PURE__*/ S.Array(
  SecurityControlParameter,
);
export interface Compliance {
  Status?: ComplianceStatus;
  RelatedRequirements?: string[];
  StatusReasons?: StatusReason[];
  SecurityControlId?: string;
  AssociatedStandards?: AssociatedStandard[];
  SecurityControlParameters?: SecurityControlParameter[];
}
export const Compliance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(ComplianceStatus),
    RelatedRequirements: S.optional(RelatedRequirementsList),
    StatusReasons: S.optional(StatusReasonsList),
    SecurityControlId: S.optional(S.String),
    AssociatedStandards: S.optional(AssociatedStandardsList),
    SecurityControlParameters: S.optional(SecurityControlParametersList),
  }),
).annotate({ identifier: "Compliance" }) as any as S.Schema<Compliance>;
export type WorkflowState =
  | "NEW"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "DEFERRED"
  | "RESOLVED"
  | (string & {});
export const WorkflowState = /*@__PURE__*/ S.String;

export interface Workflow {
  Status?: WorkflowStatus;
}
export const Workflow = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(WorkflowStatus) }),
).annotate({ identifier: "Workflow" }) as any as S.Schema<Workflow>;
export type RecordState = "ACTIVE" | "ARCHIVED" | (string & {});
export const RecordState = /*@__PURE__*/ S.String;

export interface Note {
  Text?: string;
  UpdatedBy?: string;
  UpdatedAt?: string;
}
export const Note = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Text: S.optional(S.String),
    UpdatedBy: S.optional(S.String),
    UpdatedAt: S.optional(S.String),
  }),
).annotate({ identifier: "Note" }) as any as S.Schema<Note>;
export interface SoftwarePackage {
  Name?: string;
  Version?: string;
  Epoch?: string;
  Release?: string;
  Architecture?: string;
  PackageManager?: string;
  FilePath?: string;
  FixedInVersion?: string;
  Remediation?: string;
  SourceLayerHash?: string;
  SourceLayerArn?: string;
}
export const SoftwarePackage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Version: S.optional(S.String),
    Epoch: S.optional(S.String),
    Release: S.optional(S.String),
    Architecture: S.optional(S.String),
    PackageManager: S.optional(S.String),
    FilePath: S.optional(S.String),
    FixedInVersion: S.optional(S.String),
    Remediation: S.optional(S.String),
    SourceLayerHash: S.optional(S.String),
    SourceLayerArn: S.optional(S.String),
  }),
).annotate({
  identifier: "SoftwarePackage",
}) as any as S.Schema<SoftwarePackage>;
export type SoftwarePackageList = SoftwarePackage[];
export const SoftwarePackageList = /*@__PURE__*/ S.Array(SoftwarePackage);
export interface Adjustment {
  Metric?: string;
  Reason?: string;
}
export const Adjustment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Metric: S.optional(S.String), Reason: S.optional(S.String) }),
).annotate({ identifier: "Adjustment" }) as any as S.Schema<Adjustment>;
export type AdjustmentList = Adjustment[];
export const AdjustmentList = /*@__PURE__*/ S.Array(Adjustment);
export interface Cvss {
  Version?: string;
  BaseScore?: number;
  BaseVector?: string;
  Source?: string;
  Adjustments?: Adjustment[];
}
export const Cvss = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Version: S.optional(S.String),
    BaseScore: S.optional(S.Number),
    BaseVector: S.optional(S.String),
    Source: S.optional(S.String),
    Adjustments: S.optional(AdjustmentList),
  }),
).annotate({ identifier: "Cvss" }) as any as S.Schema<Cvss>;
export type CvssList = Cvss[];
export const CvssList = /*@__PURE__*/ S.Array(Cvss);
export interface VulnerabilityVendor {
  Name?: string;
  Url?: string;
  VendorSeverity?: string;
  VendorCreatedAt?: string;
  VendorUpdatedAt?: string;
}
export const VulnerabilityVendor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Url: S.optional(S.String),
    VendorSeverity: S.optional(S.String),
    VendorCreatedAt: S.optional(S.String),
    VendorUpdatedAt: S.optional(S.String),
  }),
).annotate({
  identifier: "VulnerabilityVendor",
}) as any as S.Schema<VulnerabilityVendor>;
export type VulnerabilityFixAvailable =
  | "YES"
  | "NO"
  | "PARTIAL"
  | (string & {});
export const VulnerabilityFixAvailable = /*@__PURE__*/ S.String;

export type VulnerabilityExploitAvailable = "YES" | "NO" | (string & {});
export const VulnerabilityExploitAvailable = /*@__PURE__*/ S.String;

export interface CodeVulnerabilitiesFilePath {
  EndLine?: number;
  FileName?: string;
  FilePath?: string;
  StartLine?: number;
}
export const CodeVulnerabilitiesFilePath = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndLine: S.optional(S.Number),
    FileName: S.optional(S.String),
    FilePath: S.optional(S.String),
    StartLine: S.optional(S.Number),
  }),
).annotate({
  identifier: "CodeVulnerabilitiesFilePath",
}) as any as S.Schema<CodeVulnerabilitiesFilePath>;
export interface VulnerabilityCodeVulnerabilities {
  Cwes?: string[];
  FilePath?: CodeVulnerabilitiesFilePath;
  SourceArn?: string;
}
export const VulnerabilityCodeVulnerabilities = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Cwes: S.optional(TypeList),
    FilePath: S.optional(CodeVulnerabilitiesFilePath),
    SourceArn: S.optional(S.String),
  }),
).annotate({
  identifier: "VulnerabilityCodeVulnerabilities",
}) as any as S.Schema<VulnerabilityCodeVulnerabilities>;
export type VulnerabilityCodeVulnerabilitiesList =
  VulnerabilityCodeVulnerabilities[];
export const VulnerabilityCodeVulnerabilitiesList = /*@__PURE__*/ S.Array(
  VulnerabilityCodeVulnerabilities,
);
export interface Vulnerability {
  Id?: string;
  VulnerablePackages?: SoftwarePackage[];
  Cvss?: Cvss[];
  RelatedVulnerabilities?: string[];
  Vendor?: VulnerabilityVendor;
  ReferenceUrls?: string[];
  FixAvailable?: VulnerabilityFixAvailable;
  EpssScore?: number;
  ExploitAvailable?: VulnerabilityExploitAvailable;
  LastKnownExploitAt?: string;
  CodeVulnerabilities?: VulnerabilityCodeVulnerabilities[];
}
export const Vulnerability = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    VulnerablePackages: S.optional(SoftwarePackageList),
    Cvss: S.optional(CvssList),
    RelatedVulnerabilities: S.optional(StringList),
    Vendor: S.optional(VulnerabilityVendor),
    ReferenceUrls: S.optional(StringList),
    FixAvailable: S.optional(VulnerabilityFixAvailable),
    EpssScore: S.optional(S.Number),
    ExploitAvailable: S.optional(VulnerabilityExploitAvailable),
    LastKnownExploitAt: S.optional(S.String),
    CodeVulnerabilities: S.optional(VulnerabilityCodeVulnerabilitiesList),
  }),
).annotate({ identifier: "Vulnerability" }) as any as S.Schema<Vulnerability>;
export type VulnerabilityList = Vulnerability[];
export const VulnerabilityList = /*@__PURE__*/ S.Array(Vulnerability);
export interface PatchSummary {
  Id?: string;
  InstalledCount?: number;
  MissingCount?: number;
  FailedCount?: number;
  InstalledOtherCount?: number;
  InstalledRejectedCount?: number;
  InstalledPendingReboot?: number;
  OperationStartTime?: string;
  OperationEndTime?: string;
  RebootOption?: string;
  Operation?: string;
}
export const PatchSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    InstalledCount: S.optional(S.Number),
    MissingCount: S.optional(S.Number),
    FailedCount: S.optional(S.Number),
    InstalledOtherCount: S.optional(S.Number),
    InstalledRejectedCount: S.optional(S.Number),
    InstalledPendingReboot: S.optional(S.Number),
    OperationStartTime: S.optional(S.String),
    OperationEndTime: S.optional(S.String),
    RebootOption: S.optional(S.String),
    Operation: S.optional(S.String),
  }),
).annotate({ identifier: "PatchSummary" }) as any as S.Schema<PatchSummary>;
export interface IpOrganizationDetails {
  Asn?: number;
  AsnOrg?: string;
  Isp?: string;
  Org?: string;
}
export const IpOrganizationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Asn: S.optional(S.Number),
    AsnOrg: S.optional(S.String),
    Isp: S.optional(S.String),
    Org: S.optional(S.String),
  }),
).annotate({
  identifier: "IpOrganizationDetails",
}) as any as S.Schema<IpOrganizationDetails>;
export interface Country {
  CountryCode?: string;
  CountryName?: string;
}
export const Country = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CountryCode: S.optional(S.String),
    CountryName: S.optional(S.String),
  }),
).annotate({ identifier: "Country" }) as any as S.Schema<Country>;
export interface City {
  CityName?: string;
}
export const City = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CityName: S.optional(S.String) }),
).annotate({ identifier: "City" }) as any as S.Schema<City>;
export interface GeoLocation {
  Lon?: number;
  Lat?: number;
}
export const GeoLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Lon: S.optional(S.Number), Lat: S.optional(S.Number) }),
).annotate({ identifier: "GeoLocation" }) as any as S.Schema<GeoLocation>;
export interface ActionRemoteIpDetails {
  IpAddressV4?: string;
  Organization?: IpOrganizationDetails;
  Country?: Country;
  City?: City;
  GeoLocation?: GeoLocation;
}
export const ActionRemoteIpDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IpAddressV4: S.optional(S.String),
    Organization: S.optional(IpOrganizationDetails),
    Country: S.optional(Country),
    City: S.optional(City),
    GeoLocation: S.optional(GeoLocation),
  }),
).annotate({
  identifier: "ActionRemoteIpDetails",
}) as any as S.Schema<ActionRemoteIpDetails>;
export interface ActionRemotePortDetails {
  Port?: number;
  PortName?: string;
}
export const ActionRemotePortDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Port: S.optional(S.Number), PortName: S.optional(S.String) }),
).annotate({
  identifier: "ActionRemotePortDetails",
}) as any as S.Schema<ActionRemotePortDetails>;
export interface ActionLocalPortDetails {
  Port?: number;
  PortName?: string;
}
export const ActionLocalPortDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Port: S.optional(S.Number), PortName: S.optional(S.String) }),
).annotate({
  identifier: "ActionLocalPortDetails",
}) as any as S.Schema<ActionLocalPortDetails>;
export interface NetworkConnectionAction {
  ConnectionDirection?: string;
  RemoteIpDetails?: ActionRemoteIpDetails;
  RemotePortDetails?: ActionRemotePortDetails;
  LocalPortDetails?: ActionLocalPortDetails;
  Protocol?: string;
  Blocked?: boolean;
}
export const NetworkConnectionAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionDirection: S.optional(S.String),
    RemoteIpDetails: S.optional(ActionRemoteIpDetails),
    RemotePortDetails: S.optional(ActionRemotePortDetails),
    LocalPortDetails: S.optional(ActionLocalPortDetails),
    Protocol: S.optional(S.String),
    Blocked: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "NetworkConnectionAction",
}) as any as S.Schema<NetworkConnectionAction>;
export interface AwsApiCallActionDomainDetails {
  Domain?: string;
}
export const AwsApiCallActionDomainDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Domain: S.optional(S.String) }),
).annotate({
  identifier: "AwsApiCallActionDomainDetails",
}) as any as S.Schema<AwsApiCallActionDomainDetails>;
export interface AwsApiCallAction {
  Api?: string;
  ServiceName?: string;
  CallerType?: string;
  RemoteIpDetails?: ActionRemoteIpDetails;
  DomainDetails?: AwsApiCallActionDomainDetails;
  AffectedResources?: { [key: string]: string | undefined };
  FirstSeen?: string;
  LastSeen?: string;
}
export const AwsApiCallAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Api: S.optional(S.String),
    ServiceName: S.optional(S.String),
    CallerType: S.optional(S.String),
    RemoteIpDetails: S.optional(ActionRemoteIpDetails),
    DomainDetails: S.optional(AwsApiCallActionDomainDetails),
    AffectedResources: S.optional(FieldMap),
    FirstSeen: S.optional(S.String),
    LastSeen: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsApiCallAction",
}) as any as S.Schema<AwsApiCallAction>;
export interface DnsRequestAction {
  Domain?: string;
  Protocol?: string;
  Blocked?: boolean;
}
export const DnsRequestAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Domain: S.optional(S.String),
    Protocol: S.optional(S.String),
    Blocked: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DnsRequestAction",
}) as any as S.Schema<DnsRequestAction>;
export interface ActionLocalIpDetails {
  IpAddressV4?: string;
}
export const ActionLocalIpDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IpAddressV4: S.optional(S.String) }),
).annotate({
  identifier: "ActionLocalIpDetails",
}) as any as S.Schema<ActionLocalIpDetails>;
export interface PortProbeDetail {
  LocalPortDetails?: ActionLocalPortDetails;
  LocalIpDetails?: ActionLocalIpDetails;
  RemoteIpDetails?: ActionRemoteIpDetails;
}
export const PortProbeDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocalPortDetails: S.optional(ActionLocalPortDetails),
    LocalIpDetails: S.optional(ActionLocalIpDetails),
    RemoteIpDetails: S.optional(ActionRemoteIpDetails),
  }),
).annotate({
  identifier: "PortProbeDetail",
}) as any as S.Schema<PortProbeDetail>;
export type PortProbeDetailList = PortProbeDetail[];
export const PortProbeDetailList = /*@__PURE__*/ S.Array(PortProbeDetail);
export interface PortProbeAction {
  PortProbeDetails?: PortProbeDetail[];
  Blocked?: boolean;
}
export const PortProbeAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PortProbeDetails: S.optional(PortProbeDetailList),
    Blocked: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "PortProbeAction",
}) as any as S.Schema<PortProbeAction>;
export interface Action {
  ActionType?: string;
  NetworkConnectionAction?: NetworkConnectionAction;
  AwsApiCallAction?: AwsApiCallAction;
  DnsRequestAction?: DnsRequestAction;
  PortProbeAction?: PortProbeAction;
}
export const Action = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionType: S.optional(S.String),
    NetworkConnectionAction: S.optional(NetworkConnectionAction),
    AwsApiCallAction: S.optional(AwsApiCallAction),
    DnsRequestAction: S.optional(DnsRequestAction),
    PortProbeAction: S.optional(PortProbeAction),
  }),
).annotate({ identifier: "Action" }) as any as S.Schema<Action>;
export interface FindingProviderSeverity {
  Label?: SeverityLabel;
  Original?: string;
}
export const FindingProviderSeverity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Label: S.optional(SeverityLabel),
    Original: S.optional(S.String),
  }),
).annotate({
  identifier: "FindingProviderSeverity",
}) as any as S.Schema<FindingProviderSeverity>;
export interface FindingProviderFields {
  Confidence?: number;
  Criticality?: number;
  RelatedFindings?: RelatedFinding[];
  Severity?: FindingProviderSeverity;
  Types?: string[];
}
export const FindingProviderFields = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Confidence: S.optional(S.Number),
    Criticality: S.optional(S.Number),
    RelatedFindings: S.optional(RelatedFindingList),
    Severity: S.optional(FindingProviderSeverity),
    Types: S.optional(TypeList),
  }),
).annotate({
  identifier: "FindingProviderFields",
}) as any as S.Schema<FindingProviderFields>;
export interface GeneratorDetails {
  Name?: string;
  Description?: string;
  Labels?: string[];
}
export const GeneratorDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Labels: S.optional(TypeList),
  }),
).annotate({
  identifier: "GeneratorDetails",
}) as any as S.Schema<GeneratorDetails>;
export interface UserAccount {
  Uid?: string;
  Name?: string;
}
export const UserAccount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Uid: S.optional(S.String), Name: S.optional(S.String) }),
).annotate({ identifier: "UserAccount" }) as any as S.Schema<UserAccount>;
export interface ActorUser {
  Name?: string;
  Uid?: string;
  Type?: string;
  CredentialUid?: string;
  Account?: UserAccount;
}
export const ActorUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Uid: S.optional(S.String),
    Type: S.optional(S.String),
    CredentialUid: S.optional(S.String),
    Account: S.optional(UserAccount),
  }),
).annotate({ identifier: "ActorUser" }) as any as S.Schema<ActorUser>;
export type ActorSessionMfaStatus = "ENABLED" | "DISABLED" | (string & {});
export const ActorSessionMfaStatus = /*@__PURE__*/ S.String;

export interface ActorSession {
  Uid?: string;
  MfaStatus?: ActorSessionMfaStatus;
  CreatedTime?: number;
  Issuer?: string;
}
export const ActorSession = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Uid: S.optional(S.String),
    MfaStatus: S.optional(ActorSessionMfaStatus),
    CreatedTime: S.optional(S.Number),
    Issuer: S.optional(S.String),
  }),
).annotate({ identifier: "ActorSession" }) as any as S.Schema<ActorSession>;
export interface Actor {
  Id?: string;
  User?: ActorUser;
  Session?: ActorSession;
}
export const Actor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    User: S.optional(ActorUser),
    Session: S.optional(ActorSession),
  }),
).annotate({ identifier: "Actor" }) as any as S.Schema<Actor>;
export type ActorsList = Actor[];
export const ActorsList = /*@__PURE__*/ S.Array(Actor);
export interface NetworkGeoLocation {
  City?: string;
  Country?: string;
  Lat?: number;
  Lon?: number;
}
export const NetworkGeoLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    City: S.optional(S.String),
    Country: S.optional(S.String),
    Lat: S.optional(S.Number),
    Lon: S.optional(S.Number),
  }),
).annotate({
  identifier: "NetworkGeoLocation",
}) as any as S.Schema<NetworkGeoLocation>;
export interface NetworkAutonomousSystem {
  Name?: string;
  Number?: number;
}
export const NetworkAutonomousSystem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Number: S.optional(S.Number) }),
).annotate({
  identifier: "NetworkAutonomousSystem",
}) as any as S.Schema<NetworkAutonomousSystem>;
export type ConnectionDirection = "INBOUND" | "OUTBOUND" | (string & {});
export const ConnectionDirection = /*@__PURE__*/ S.String;

export interface NetworkConnection {
  Direction?: ConnectionDirection;
}
export const NetworkConnection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Direction: S.optional(ConnectionDirection) }),
).annotate({
  identifier: "NetworkConnection",
}) as any as S.Schema<NetworkConnection>;
export interface NetworkEndpoint {
  Id?: string;
  Ip?: string;
  Domain?: string;
  Port?: number;
  Location?: NetworkGeoLocation;
  AutonomousSystem?: NetworkAutonomousSystem;
  Connection?: NetworkConnection;
}
export const NetworkEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Ip: S.optional(S.String),
    Domain: S.optional(S.String),
    Port: S.optional(S.Number),
    Location: S.optional(NetworkGeoLocation),
    AutonomousSystem: S.optional(NetworkAutonomousSystem),
    Connection: S.optional(NetworkConnection),
  }),
).annotate({
  identifier: "NetworkEndpoint",
}) as any as S.Schema<NetworkEndpoint>;
export type NetworkEndpointsList = NetworkEndpoint[];
export const NetworkEndpointsList = /*@__PURE__*/ S.Array(NetworkEndpoint);
export interface Indicator {
  Key?: string;
  Values?: string[];
  Title?: string;
  Type?: string;
}
export const Indicator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(S.String),
    Values: S.optional(NonEmptyStringList),
    Title: S.optional(S.String),
    Type: S.optional(S.String),
  }),
).annotate({ identifier: "Indicator" }) as any as S.Schema<Indicator>;
export type IndicatorsList = Indicator[];
export const IndicatorsList = /*@__PURE__*/ S.Array(Indicator);
export interface Signal {
  Type?: string;
  Id?: string;
  Title?: string;
  ProductArn?: string;
  ResourceIds?: string[];
  SignalIndicators?: Indicator[];
  Name?: string;
  CreatedAt?: number;
  UpdatedAt?: number;
  FirstSeenAt?: number;
  LastSeenAt?: number;
  Severity?: number;
  Count?: number;
  ActorIds?: string[];
  EndpointIds?: string[];
}
export const Signal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(S.String),
    Id: S.optional(S.String),
    Title: S.optional(S.String),
    ProductArn: S.optional(S.String),
    ResourceIds: S.optional(NonEmptyStringList),
    SignalIndicators: S.optional(IndicatorsList),
    Name: S.optional(S.String),
    CreatedAt: S.optional(S.Number),
    UpdatedAt: S.optional(S.Number),
    FirstSeenAt: S.optional(S.Number),
    LastSeenAt: S.optional(S.Number),
    Severity: S.optional(S.Number),
    Count: S.optional(S.Number),
    ActorIds: S.optional(NonEmptyStringList),
    EndpointIds: S.optional(NonEmptyStringList),
  }),
).annotate({ identifier: "Signal" }) as any as S.Schema<Signal>;
export type SignalsList = Signal[];
export const SignalsList = /*@__PURE__*/ S.Array(Signal);
export interface Sequence {
  Uid?: string;
  Actors?: Actor[];
  Endpoints?: NetworkEndpoint[];
  Signals?: Signal[];
  SequenceIndicators?: Indicator[];
}
export const Sequence = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Uid: S.optional(S.String),
    Actors: S.optional(ActorsList),
    Endpoints: S.optional(NetworkEndpointsList),
    Signals: S.optional(SignalsList),
    SequenceIndicators: S.optional(IndicatorsList),
  }),
).annotate({ identifier: "Sequence" }) as any as S.Schema<Sequence>;
export interface Detection {
  Sequence?: Sequence;
}
export const Detection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Sequence: S.optional(Sequence) }),
).annotate({ identifier: "Detection" }) as any as S.Schema<Detection>;
export interface AwsSecurityFinding {
  SchemaVersion?: string;
  Id?: string;
  ProductArn?: string;
  ProductName?: string;
  CompanyName?: string;
  Region?: string;
  GeneratorId?: string;
  AwsAccountId?: string;
  Types?: string[];
  FirstObservedAt?: string;
  LastObservedAt?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
  Severity?: Severity;
  Confidence?: number;
  Criticality?: number;
  Title?: string;
  Description?: string;
  Remediation?: Remediation;
  SourceUrl?: string;
  ProductFields?: { [key: string]: string | undefined };
  UserDefinedFields?: { [key: string]: string | undefined };
  Malware?: Malware[];
  Network?: Network;
  NetworkPath?: NetworkPathComponent[];
  Process?: ProcessDetails;
  Threats?: Threat[];
  ThreatIntelIndicators?: ThreatIntelIndicator[];
  Resources?: Resource[];
  Compliance?: Compliance;
  VerificationState?: VerificationState;
  WorkflowState?: WorkflowState;
  Workflow?: Workflow;
  RecordState?: RecordState;
  RelatedFindings?: RelatedFinding[];
  Note?: Note;
  Vulnerabilities?: Vulnerability[];
  PatchSummary?: PatchSummary;
  Action?: Action;
  FindingProviderFields?: FindingProviderFields;
  Sample?: boolean;
  GeneratorDetails?: GeneratorDetails;
  ProcessedAt?: string;
  AwsAccountName?: string;
  Detection?: Detection;
}
export const AwsSecurityFinding = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SchemaVersion: S.optional(S.String),
    Id: S.optional(S.String),
    ProductArn: S.optional(S.String),
    ProductName: S.optional(S.String),
    CompanyName: S.optional(S.String),
    Region: S.optional(S.String),
    GeneratorId: S.optional(S.String),
    AwsAccountId: S.optional(S.String),
    Types: S.optional(TypeList),
    FirstObservedAt: S.optional(S.String),
    LastObservedAt: S.optional(S.String),
    CreatedAt: S.optional(S.String),
    UpdatedAt: S.optional(S.String),
    Severity: S.optional(Severity),
    Confidence: S.optional(S.Number),
    Criticality: S.optional(S.Number),
    Title: S.optional(S.String),
    Description: S.optional(S.String),
    Remediation: S.optional(Remediation),
    SourceUrl: S.optional(S.String),
    ProductFields: S.optional(FieldMap),
    UserDefinedFields: S.optional(FieldMap),
    Malware: S.optional(MalwareList),
    Network: S.optional(Network),
    NetworkPath: S.optional(NetworkPathList),
    Process: S.optional(ProcessDetails),
    Threats: S.optional(ThreatList),
    ThreatIntelIndicators: S.optional(ThreatIntelIndicatorList),
    Resources: S.optional(ResourceList),
    Compliance: S.optional(Compliance),
    VerificationState: S.optional(VerificationState),
    WorkflowState: S.optional(WorkflowState),
    Workflow: S.optional(Workflow),
    RecordState: S.optional(RecordState),
    RelatedFindings: S.optional(RelatedFindingList),
    Note: S.optional(Note),
    Vulnerabilities: S.optional(VulnerabilityList),
    PatchSummary: S.optional(PatchSummary),
    Action: S.optional(Action),
    FindingProviderFields: S.optional(FindingProviderFields),
    Sample: S.optional(S.Boolean),
    GeneratorDetails: S.optional(GeneratorDetails),
    ProcessedAt: S.optional(S.String),
    AwsAccountName: S.optional(S.String),
    Detection: S.optional(Detection),
  }),
).annotate({
  identifier: "AwsSecurityFinding",
}) as any as S.Schema<AwsSecurityFinding>;
export type BatchImportFindingsRequestFindingList = AwsSecurityFinding[];
export const BatchImportFindingsRequestFindingList =
  /*@__PURE__*/ S.Array(AwsSecurityFinding);
export interface BatchImportFindingsRequest {
  Findings?: AwsSecurityFinding[];
}
export const BatchImportFindingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Findings: S.optional(BatchImportFindingsRequestFindingList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/findings/import" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchImportFindingsRequest",
}) as any as S.Schema<BatchImportFindingsRequest>;
export interface ImportFindingsError {
  Id?: string;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const ImportFindingsError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "ImportFindingsError",
}) as any as S.Schema<ImportFindingsError>;
export type ImportFindingsErrorList = ImportFindingsError[];
export const ImportFindingsErrorList =
  /*@__PURE__*/ S.Array(ImportFindingsError);
export interface BatchImportFindingsResponse {
  FailedCount: number;
  SuccessCount: number;
  FailedFindings?: (ImportFindingsError & {
    Id: NonEmptyString;
    ErrorCode: NonEmptyString;
    ErrorMessage: NonEmptyString;
  })[];
}
export const BatchImportFindingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FailedCount: S.optional(S.Number),
    SuccessCount: S.optional(S.Number),
    FailedFindings: S.optional(ImportFindingsErrorList),
  }),
).annotate({
  identifier: "BatchImportFindingsResponse",
}) as any as S.Schema<BatchImportFindingsResponse>;
export interface UpdateAutomationRulesRequestItem {
  RuleArn?: string;
  RuleStatus?: RuleStatus;
  RuleOrder?: number;
  Description?: string;
  RuleName?: string;
  IsTerminal?: boolean;
  Criteria?: AutomationRulesFindingFilters;
  Actions?: AutomationRulesAction[];
}
export const UpdateAutomationRulesRequestItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleArn: S.optional(S.String),
    RuleStatus: S.optional(RuleStatus),
    RuleOrder: S.optional(S.Number),
    Description: S.optional(S.String),
    RuleName: S.optional(S.String),
    IsTerminal: S.optional(S.Boolean),
    Criteria: S.optional(AutomationRulesFindingFilters),
    Actions: S.optional(ActionList),
  }),
).annotate({
  identifier: "UpdateAutomationRulesRequestItem",
}) as any as S.Schema<UpdateAutomationRulesRequestItem>;
export type UpdateAutomationRulesRequestItemsList =
  UpdateAutomationRulesRequestItem[];
export const UpdateAutomationRulesRequestItemsList = /*@__PURE__*/ S.Array(
  UpdateAutomationRulesRequestItem,
);
export interface BatchUpdateAutomationRulesRequest {
  UpdateAutomationRulesRequestItems?: UpdateAutomationRulesRequestItem[];
}
export const BatchUpdateAutomationRulesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpdateAutomationRulesRequestItems: S.optional(
      UpdateAutomationRulesRequestItemsList,
    ),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/automationrules/update" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchUpdateAutomationRulesRequest",
}) as any as S.Schema<BatchUpdateAutomationRulesRequest>;
export interface BatchUpdateAutomationRulesResponse {
  ProcessedAutomationRules?: string[];
  UnprocessedAutomationRules?: UnprocessedAutomationRule[];
}
export const BatchUpdateAutomationRulesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProcessedAutomationRules: S.optional(AutomationRulesArnsList),
    UnprocessedAutomationRules: S.optional(UnprocessedAutomationRulesList),
  }),
).annotate({
  identifier: "BatchUpdateAutomationRulesResponse",
}) as any as S.Schema<BatchUpdateAutomationRulesResponse>;
export interface AwsSecurityFindingIdentifier {
  Id?: string;
  ProductArn?: string;
}
export const AwsSecurityFindingIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String), ProductArn: S.optional(S.String) }),
).annotate({
  identifier: "AwsSecurityFindingIdentifier",
}) as any as S.Schema<AwsSecurityFindingIdentifier>;
export type AwsSecurityFindingIdentifierList = AwsSecurityFindingIdentifier[];
export const AwsSecurityFindingIdentifierList = /*@__PURE__*/ S.Array(
  AwsSecurityFindingIdentifier,
);
export interface BatchUpdateFindingsRequest {
  FindingIdentifiers?: AwsSecurityFindingIdentifier[];
  Note?: NoteUpdate;
  Severity?: SeverityUpdate;
  VerificationState?: VerificationState;
  Confidence?: number;
  Criticality?: number;
  Types?: string[];
  UserDefinedFields?: { [key: string]: string | undefined };
  Workflow?: WorkflowUpdate;
  RelatedFindings?: RelatedFinding[];
}
export const BatchUpdateFindingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FindingIdentifiers: S.optional(AwsSecurityFindingIdentifierList),
    Note: S.optional(NoteUpdate),
    Severity: S.optional(SeverityUpdate),
    VerificationState: S.optional(VerificationState),
    Confidence: S.optional(S.Number),
    Criticality: S.optional(S.Number),
    Types: S.optional(TypeList),
    UserDefinedFields: S.optional(FieldMap),
    Workflow: S.optional(WorkflowUpdate),
    RelatedFindings: S.optional(RelatedFindingList),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/findings/batchupdate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchUpdateFindingsRequest",
}) as any as S.Schema<BatchUpdateFindingsRequest>;
export interface BatchUpdateFindingsUnprocessedFinding {
  FindingIdentifier?: AwsSecurityFindingIdentifier;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const BatchUpdateFindingsUnprocessedFinding = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FindingIdentifier: S.optional(AwsSecurityFindingIdentifier),
      ErrorCode: S.optional(S.String),
      ErrorMessage: S.optional(S.String),
    }),
).annotate({
  identifier: "BatchUpdateFindingsUnprocessedFinding",
}) as any as S.Schema<BatchUpdateFindingsUnprocessedFinding>;
export type BatchUpdateFindingsUnprocessedFindingsList =
  BatchUpdateFindingsUnprocessedFinding[];
export const BatchUpdateFindingsUnprocessedFindingsList = /*@__PURE__*/ S.Array(
  BatchUpdateFindingsUnprocessedFinding,
);
export interface BatchUpdateFindingsResponse {
  ProcessedFindings: (AwsSecurityFindingIdentifier & {
    Id: NonEmptyString;
    ProductArn: NonEmptyString;
  })[];
  UnprocessedFindings: (BatchUpdateFindingsUnprocessedFinding & {
    FindingIdentifier: AwsSecurityFindingIdentifier & {
      Id: NonEmptyString;
      ProductArn: NonEmptyString;
    };
    ErrorCode: NonEmptyString;
    ErrorMessage: NonEmptyString;
  })[];
}
export const BatchUpdateFindingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProcessedFindings: S.optional(AwsSecurityFindingIdentifierList),
    UnprocessedFindings: S.optional(BatchUpdateFindingsUnprocessedFindingsList),
  }),
).annotate({
  identifier: "BatchUpdateFindingsResponse",
}) as any as S.Schema<BatchUpdateFindingsResponse>;
export type MetadataUidList = string[];
export const MetadataUidList = /*@__PURE__*/ S.Array(S.String);
export interface OcsfFindingIdentifier {
  CloudAccountUid?: string;
  FindingInfoUid?: string;
  MetadataProductUid?: string;
}
export const OcsfFindingIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudAccountUid: S.optional(S.String),
    FindingInfoUid: S.optional(S.String),
    MetadataProductUid: S.optional(S.String),
  }),
).annotate({
  identifier: "OcsfFindingIdentifier",
}) as any as S.Schema<OcsfFindingIdentifier>;
export type OcsfFindingIdentifierList = OcsfFindingIdentifier[];
export const OcsfFindingIdentifierList = /*@__PURE__*/ S.Array(
  OcsfFindingIdentifier,
);
export interface BatchUpdateFindingsV2Request {
  MetadataUids?: string[];
  FindingIdentifiers?: OcsfFindingIdentifier[];
  Comment?: string;
  SeverityId?: number;
  StatusId?: number;
}
export const BatchUpdateFindingsV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetadataUids: S.optional(MetadataUidList),
    FindingIdentifiers: S.optional(OcsfFindingIdentifierList),
    Comment: S.optional(S.String),
    SeverityId: S.optional(S.Number),
    StatusId: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/findingsv2/batchupdatev2" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchUpdateFindingsV2Request",
}) as any as S.Schema<BatchUpdateFindingsV2Request>;
export interface BatchUpdateFindingsV2ProcessedFinding {
  FindingIdentifier?: OcsfFindingIdentifier;
  MetadataUid?: string;
}
export const BatchUpdateFindingsV2ProcessedFinding = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FindingIdentifier: S.optional(OcsfFindingIdentifier),
      MetadataUid: S.optional(S.String),
    }),
).annotate({
  identifier: "BatchUpdateFindingsV2ProcessedFinding",
}) as any as S.Schema<BatchUpdateFindingsV2ProcessedFinding>;
export type BatchUpdateFindingsV2ProcessedFindingsList =
  BatchUpdateFindingsV2ProcessedFinding[];
export const BatchUpdateFindingsV2ProcessedFindingsList = /*@__PURE__*/ S.Array(
  BatchUpdateFindingsV2ProcessedFinding,
);
export type BatchUpdateFindingsV2UnprocessedFindingErrorCode =
  | "ResourceNotFoundException"
  | "ValidationException"
  | "InternalServerException"
  | "ConflictException"
  | (string & {});
export const BatchUpdateFindingsV2UnprocessedFindingErrorCode =
  /*@__PURE__*/ S.String;

export interface BatchUpdateFindingsV2UnprocessedFinding {
  FindingIdentifier?: OcsfFindingIdentifier;
  MetadataUid?: string;
  ErrorCode?: BatchUpdateFindingsV2UnprocessedFindingErrorCode;
  ErrorMessage?: string;
}
export const BatchUpdateFindingsV2UnprocessedFinding = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FindingIdentifier: S.optional(OcsfFindingIdentifier),
      MetadataUid: S.optional(S.String),
      ErrorCode: S.optional(BatchUpdateFindingsV2UnprocessedFindingErrorCode),
      ErrorMessage: S.optional(S.String),
    }),
).annotate({
  identifier: "BatchUpdateFindingsV2UnprocessedFinding",
}) as any as S.Schema<BatchUpdateFindingsV2UnprocessedFinding>;
export type BatchUpdateFindingsV2UnprocessedFindingsList =
  BatchUpdateFindingsV2UnprocessedFinding[];
export const BatchUpdateFindingsV2UnprocessedFindingsList =
  /*@__PURE__*/ S.Array(BatchUpdateFindingsV2UnprocessedFinding);
export interface BatchUpdateFindingsV2Response {
  ProcessedFindings: (BatchUpdateFindingsV2ProcessedFinding & {
    FindingIdentifier: OcsfFindingIdentifier & {
      CloudAccountUid: NonEmptyString;
      FindingInfoUid: NonEmptyString;
      MetadataProductUid: NonEmptyString;
    };
  })[];
  UnprocessedFindings: (BatchUpdateFindingsV2UnprocessedFinding & {
    FindingIdentifier: OcsfFindingIdentifier & {
      CloudAccountUid: NonEmptyString;
      FindingInfoUid: NonEmptyString;
      MetadataProductUid: NonEmptyString;
    };
  })[];
}
export const BatchUpdateFindingsV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProcessedFindings: S.optional(BatchUpdateFindingsV2ProcessedFindingsList),
    UnprocessedFindings: S.optional(
      BatchUpdateFindingsV2UnprocessedFindingsList,
    ),
  }),
).annotate({
  identifier: "BatchUpdateFindingsV2Response",
}) as any as S.Schema<BatchUpdateFindingsV2Response>;
export interface StandardsControlAssociationUpdate {
  StandardsArn?: string;
  SecurityControlId?: string;
  AssociationStatus?: AssociationStatus;
  UpdatedReason?: string;
}
export const StandardsControlAssociationUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StandardsArn: S.optional(S.String),
    SecurityControlId: S.optional(S.String),
    AssociationStatus: S.optional(AssociationStatus),
    UpdatedReason: S.optional(S.String),
  }),
).annotate({
  identifier: "StandardsControlAssociationUpdate",
}) as any as S.Schema<StandardsControlAssociationUpdate>;
export type StandardsControlAssociationUpdates =
  StandardsControlAssociationUpdate[];
export const StandardsControlAssociationUpdates = /*@__PURE__*/ S.Array(
  StandardsControlAssociationUpdate,
);
export interface BatchUpdateStandardsControlAssociationsRequest {
  StandardsControlAssociationUpdates?: StandardsControlAssociationUpdate[];
}
export const BatchUpdateStandardsControlAssociationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      StandardsControlAssociationUpdates: S.optional(
        StandardsControlAssociationUpdates,
      ),
    }).pipe(
      T.all(
        T.Http({ method: "PATCH", uri: "/associations" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "BatchUpdateStandardsControlAssociationsRequest",
  }) as any as S.Schema<BatchUpdateStandardsControlAssociationsRequest>;
export interface UnprocessedStandardsControlAssociationUpdate {
  StandardsControlAssociationUpdate?: StandardsControlAssociationUpdate;
  ErrorCode?: UnprocessedErrorCode;
  ErrorReason?: string;
}
export const UnprocessedStandardsControlAssociationUpdate =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      StandardsControlAssociationUpdate: S.optional(
        StandardsControlAssociationUpdate,
      ),
      ErrorCode: S.optional(UnprocessedErrorCode),
      ErrorReason: S.optional(S.String),
    }),
  ).annotate({
    identifier: "UnprocessedStandardsControlAssociationUpdate",
  }) as any as S.Schema<UnprocessedStandardsControlAssociationUpdate>;
export type UnprocessedStandardsControlAssociationUpdates =
  UnprocessedStandardsControlAssociationUpdate[];
export const UnprocessedStandardsControlAssociationUpdates =
  /*@__PURE__*/ S.Array(UnprocessedStandardsControlAssociationUpdate);
export interface BatchUpdateStandardsControlAssociationsResponse {
  UnprocessedAssociationUpdates?: (UnprocessedStandardsControlAssociationUpdate & {
    StandardsControlAssociationUpdate: StandardsControlAssociationUpdate & {
      StandardsArn: NonEmptyString;
      SecurityControlId: NonEmptyString;
      AssociationStatus: AssociationStatus;
    };
    ErrorCode: UnprocessedErrorCode;
  })[];
}
export const BatchUpdateStandardsControlAssociationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      UnprocessedAssociationUpdates: S.optional(
        UnprocessedStandardsControlAssociationUpdates,
      ),
    }),
  ).annotate({
    identifier: "BatchUpdateStandardsControlAssociationsResponse",
  }) as any as S.Schema<BatchUpdateStandardsControlAssociationsResponse>;
export interface CreateActionTargetRequest {
  Name?: string;
  Description?: string;
  Id?: string;
}
export const CreateActionTargetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Id: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/actionTargets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateActionTargetRequest",
}) as any as S.Schema<CreateActionTargetRequest>;
export interface CreateActionTargetResponse {
  ActionTargetArn: string;
}
export const CreateActionTargetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ActionTargetArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateActionTargetResponse",
}) as any as S.Schema<CreateActionTargetResponse>;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ClientToken = string;
export interface CreateAggregatorV2Request {
  RegionLinkingMode?: string;
  LinkedRegions?: string[];
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
}
export const CreateAggregatorV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegionLinkingMode: S.optional(S.String),
    LinkedRegions: S.optional(StringList),
    Tags: S.optional(TagMap),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/aggregatorv2/create" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAggregatorV2Request",
}) as any as S.Schema<CreateAggregatorV2Request>;
export interface CreateAggregatorV2Response {
  AggregatorV2Arn?: string;
  AggregationRegion?: string;
  RegionLinkingMode?: string;
  LinkedRegions?: string[];
}
export const CreateAggregatorV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AggregatorV2Arn: S.optional(S.String),
    AggregationRegion: S.optional(S.String),
    RegionLinkingMode: S.optional(S.String),
    LinkedRegions: S.optional(StringList),
  }),
).annotate({
  identifier: "CreateAggregatorV2Response",
}) as any as S.Schema<CreateAggregatorV2Response>;
export interface CreateAutomationRuleRequest {
  Tags?: { [key: string]: string | undefined };
  RuleStatus?: RuleStatus;
  RuleOrder?: number;
  RuleName?: string;
  Description?: string;
  IsTerminal?: boolean;
  Criteria?: AutomationRulesFindingFilters;
  Actions?: AutomationRulesAction[];
}
export const CreateAutomationRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Tags: S.optional(TagMap),
    RuleStatus: S.optional(RuleStatus),
    RuleOrder: S.optional(S.Number),
    RuleName: S.optional(S.String),
    Description: S.optional(S.String),
    IsTerminal: S.optional(S.Boolean),
    Criteria: S.optional(AutomationRulesFindingFilters),
    Actions: S.optional(ActionList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/automationrules/create" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAutomationRuleRequest",
}) as any as S.Schema<CreateAutomationRuleRequest>;
export interface CreateAutomationRuleResponse {
  RuleArn?: string;
}
export const CreateAutomationRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateAutomationRuleResponse",
}) as any as S.Schema<CreateAutomationRuleResponse>;
export type RuleStatusV2 = "ENABLED" | "DISABLED" | (string & {});
export const RuleStatusV2 = /*@__PURE__*/ S.String;

export type RuleOrderValueV2 = number;
export type OcsfStringField =
  | "metadata.uid"
  | "activity_name"
  | "cloud.account.uid"
  | "cloud.provider"
  | "cloud.region"
  | "compliance.assessments.category"
  | "compliance.assessments.name"
  | "compliance.control"
  | "compliance.status"
  | "compliance.standards"
  | "finding_info.desc"
  | "finding_info.src_url"
  | "finding_info.title"
  | "finding_info.types"
  | "finding_info.uid"
  | "finding_info.related_events.traits.category"
  | "finding_info.related_events.uid"
  | "finding_info.related_events.product.uid"
  | "finding_info.related_events.title"
  | "metadata.product.name"
  | "metadata.product.uid"
  | "metadata.product.vendor_name"
  | "remediation.desc"
  | "remediation.references"
  | "resources.cloud_partition"
  | "resources.region"
  | "resources.type"
  | "resources.uid"
  | "severity"
  | "status"
  | "comment"
  | "vulnerabilities.fix_coverage"
  | "class_name"
  | "databucket.encryption_details.algorithm"
  | "databucket.encryption_details.key_uid"
  | "databucket.file.data_classifications.classifier_details.type"
  | "evidences.actor.user.account.uid"
  | "evidences.api.operation"
  | "evidences.api.response.error_message"
  | "evidences.api.service.name"
  | "evidences.connection_info.direction"
  | "evidences.connection_info.protocol_name"
  | "evidences.dst_endpoint.autonomous_system.name"
  | "evidences.dst_endpoint.location.city"
  | "evidences.dst_endpoint.location.country"
  | "evidences.src_endpoint.autonomous_system.name"
  | "evidences.src_endpoint.hostname"
  | "evidences.src_endpoint.location.city"
  | "evidences.src_endpoint.location.country"
  | "finding_info.analytic.name"
  | "malware.name"
  | "malware_scan_info.uid"
  | "malware.severity"
  | "resources.cloud_function.layers.uid_alt"
  | "resources.cloud_function.runtime"
  | "resources.cloud_function.user.uid"
  | "resources.device.encryption_details.key_uid"
  | "resources.device.image.uid"
  | "resources.image.architecture"
  | "resources.image.registry_uid"
  | "resources.image.repository_name"
  | "resources.image.uid"
  | "resources.subnet_info.uid"
  | "resources.vpc_uid"
  | "vulnerabilities.affected_code.file.path"
  | "vulnerabilities.affected_packages.name"
  | "vulnerabilities.cve.epss.score"
  | "vulnerabilities.cve.uid"
  | "vulnerabilities.related_vulnerabilities"
  | "cloud.account.name"
  | "vendor_attributes.severity"
  | (string & {});
export const OcsfStringField = /*@__PURE__*/ S.String;

export interface OcsfStringFilter {
  FieldName?: OcsfStringField;
  Filter?: StringFilter;
}
export const OcsfStringFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FieldName: S.optional(OcsfStringField),
    Filter: S.optional(StringFilter),
  }),
).annotate({
  identifier: "OcsfStringFilter",
}) as any as S.Schema<OcsfStringFilter>;
export type OcsfStringFilterList = OcsfStringFilter[];
export const OcsfStringFilterList = /*@__PURE__*/ S.Array(OcsfStringFilter);
export type OcsfDateField =
  | "finding_info.created_time_dt"
  | "finding_info.first_seen_time_dt"
  | "finding_info.last_seen_time_dt"
  | "finding_info.modified_time_dt"
  | "resources.image.created_time_dt"
  | "resources.image.last_used_time_dt"
  | "resources.modified_time_dt"
  | (string & {});
export const OcsfDateField = /*@__PURE__*/ S.String;

export interface OcsfDateFilter {
  FieldName?: OcsfDateField;
  Filter?: DateFilter;
}
export const OcsfDateFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FieldName: S.optional(OcsfDateField),
    Filter: S.optional(DateFilter),
  }),
).annotate({ identifier: "OcsfDateFilter" }) as any as S.Schema<OcsfDateFilter>;
export type OcsfDateFilterList = OcsfDateFilter[];
export const OcsfDateFilterList = /*@__PURE__*/ S.Array(OcsfDateFilter);
export type OcsfBooleanField =
  | "compliance.assessments.meets_criteria"
  | "vulnerabilities.is_exploit_available"
  | "vulnerabilities.is_fix_available"
  | (string & {});
export const OcsfBooleanField = /*@__PURE__*/ S.String;

export interface BooleanFilter {
  Value?: boolean;
}
export const BooleanFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.optional(S.Boolean) }),
).annotate({ identifier: "BooleanFilter" }) as any as S.Schema<BooleanFilter>;
export interface OcsfBooleanFilter {
  FieldName?: OcsfBooleanField;
  Filter?: BooleanFilter;
}
export const OcsfBooleanFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FieldName: S.optional(OcsfBooleanField),
    Filter: S.optional(BooleanFilter),
  }),
).annotate({
  identifier: "OcsfBooleanFilter",
}) as any as S.Schema<OcsfBooleanFilter>;
export type OcsfBooleanFilterList = OcsfBooleanFilter[];
export const OcsfBooleanFilterList = /*@__PURE__*/ S.Array(OcsfBooleanFilter);
export type OcsfNumberField =
  | "activity_id"
  | "compliance.status_id"
  | "confidence_score"
  | "severity_id"
  | "status_id"
  | "finding_info.related_events_count"
  | "evidences.api.response.code"
  | "evidences.dst_endpoint.autonomous_system.number"
  | "evidences.dst_endpoint.port"
  | "evidences.src_endpoint.autonomous_system.number"
  | "evidences.src_endpoint.port"
  | "resources.image.in_use_count"
  | "vulnerabilities.cve.cvss.base_score"
  | "vendor_attributes.severity_id"
  | (string & {});
export const OcsfNumberField = /*@__PURE__*/ S.String;

export interface OcsfNumberFilter {
  FieldName?: OcsfNumberField;
  Filter?: NumberFilter;
}
export const OcsfNumberFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FieldName: S.optional(OcsfNumberField),
    Filter: S.optional(NumberFilter),
  }),
).annotate({
  identifier: "OcsfNumberFilter",
}) as any as S.Schema<OcsfNumberFilter>;
export type OcsfNumberFilterList = OcsfNumberFilter[];
export const OcsfNumberFilterList = /*@__PURE__*/ S.Array(OcsfNumberFilter);
export type OcsfMapField =
  | "resources.tags"
  | "compliance.control_parameters"
  | "databucket.tags"
  | "finding_info.tags"
  | (string & {});
export const OcsfMapField = /*@__PURE__*/ S.String;

export interface OcsfMapFilter {
  FieldName?: OcsfMapField;
  Filter?: MapFilter;
}
export const OcsfMapFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FieldName: S.optional(OcsfMapField),
    Filter: S.optional(MapFilter),
  }),
).annotate({ identifier: "OcsfMapFilter" }) as any as S.Schema<OcsfMapFilter>;
export type OcsfMapFilterList = OcsfMapFilter[];
export const OcsfMapFilterList = /*@__PURE__*/ S.Array(OcsfMapFilter);
export type OcsfIpField =
  | "evidences.dst_endpoint.ip"
  | "evidences.src_endpoint.ip"
  | (string & {});
export const OcsfIpField = /*@__PURE__*/ S.String;

export interface IpFilter {
  Cidr?: string;
}
export const IpFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cidr: S.optional(S.String) }),
).annotate({ identifier: "IpFilter" }) as any as S.Schema<IpFilter>;
export interface OcsfIpFilter {
  FieldName?: OcsfIpField;
  Filter?: IpFilter;
}
export const OcsfIpFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FieldName: S.optional(OcsfIpField),
    Filter: S.optional(IpFilter),
  }),
).annotate({ identifier: "OcsfIpFilter" }) as any as S.Schema<OcsfIpFilter>;
export type OcsfIpFilterList = OcsfIpFilter[];
export const OcsfIpFilterList = /*@__PURE__*/ S.Array(OcsfIpFilter);
export type AllowedOperators = "AND" | "OR" | (string & {});
export const AllowedOperators = /*@__PURE__*/ S.String;

export interface CompositeFilter {
  StringFilters?: OcsfStringFilter[];
  DateFilters?: OcsfDateFilter[];
  BooleanFilters?: OcsfBooleanFilter[];
  NumberFilters?: OcsfNumberFilter[];
  MapFilters?: OcsfMapFilter[];
  IpFilters?: OcsfIpFilter[];
  NestedCompositeFilters?: CompositeFilter[];
  Operator?: AllowedOperators;
}
export const CompositeFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StringFilters: S.optional(OcsfStringFilterList),
    DateFilters: S.optional(OcsfDateFilterList),
    BooleanFilters: S.optional(OcsfBooleanFilterList),
    NumberFilters: S.optional(OcsfNumberFilterList),
    MapFilters: S.optional(OcsfMapFilterList),
    IpFilters: S.optional(OcsfIpFilterList),
    NestedCompositeFilters: S.optional(
      S.suspend(() => CompositeFilterList).annotate({
        identifier: "CompositeFilterList",
      }),
    ),
    Operator: S.optional(AllowedOperators),
  }),
).annotate({
  identifier: "CompositeFilter",
}) as any as S.Schema<CompositeFilter>;
export type CompositeFilterList = CompositeFilter[];
export const CompositeFilterList = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<CompositeFilter> => CompositeFilter).annotate({
    identifier: "CompositeFilter",
  }),
) as any as S.Schema<CompositeFilterList>;
export interface OcsfFindingFilters {
  CompositeFilters?: CompositeFilter[];
  CompositeOperator?: AllowedOperators;
}
export const OcsfFindingFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CompositeFilters: S.optional(CompositeFilterList),
    CompositeOperator: S.optional(AllowedOperators),
  }),
).annotate({
  identifier: "OcsfFindingFilters",
}) as any as S.Schema<OcsfFindingFilters>;
export type Criteria = { OcsfFindingCriteria: OcsfFindingFilters };
export const Criteria = /*@__PURE__*/ S.Union([
  S.Struct({ OcsfFindingCriteria: OcsfFindingFilters }),
]);
export type AutomationRulesActionTypeV2 =
  | "FINDING_FIELDS_UPDATE"
  | "EXTERNAL_INTEGRATION"
  | (string & {});
export const AutomationRulesActionTypeV2 = /*@__PURE__*/ S.String;

export interface AutomationRulesFindingFieldsUpdateV2 {
  SeverityId?: number;
  Comment?: string;
  StatusId?: number;
}
export const AutomationRulesFindingFieldsUpdateV2 = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SeverityId: S.optional(S.Number),
      Comment: S.optional(S.String),
      StatusId: S.optional(S.Number),
    }),
).annotate({
  identifier: "AutomationRulesFindingFieldsUpdateV2",
}) as any as S.Schema<AutomationRulesFindingFieldsUpdateV2>;
export interface ExternalIntegrationConfiguration {
  ConnectorArn?: string;
}
export const ExternalIntegrationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConnectorArn: S.optional(S.String) }),
).annotate({
  identifier: "ExternalIntegrationConfiguration",
}) as any as S.Schema<ExternalIntegrationConfiguration>;
export interface AutomationRulesActionV2 {
  Type?: AutomationRulesActionTypeV2;
  FindingFieldsUpdate?: AutomationRulesFindingFieldsUpdateV2;
  ExternalIntegrationConfiguration?: ExternalIntegrationConfiguration;
}
export const AutomationRulesActionV2 = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(AutomationRulesActionTypeV2),
    FindingFieldsUpdate: S.optional(AutomationRulesFindingFieldsUpdateV2),
    ExternalIntegrationConfiguration: S.optional(
      ExternalIntegrationConfiguration,
    ),
  }),
).annotate({
  identifier: "AutomationRulesActionV2",
}) as any as S.Schema<AutomationRulesActionV2>;
export type AutomationRulesActionListV2 = AutomationRulesActionV2[];
export const AutomationRulesActionListV2 = /*@__PURE__*/ S.Array(
  AutomationRulesActionV2,
);
export interface CreateAutomationRuleV2Request {
  RuleName?: string;
  RuleStatus?: RuleStatusV2;
  Description?: string;
  RuleOrder?: number;
  Criteria?: Criteria;
  Actions?: AutomationRulesActionV2[];
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
}
export const CreateAutomationRuleV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleName: S.optional(S.String),
    RuleStatus: S.optional(RuleStatusV2),
    Description: S.optional(S.String),
    RuleOrder: S.optional(S.Number),
    Criteria: S.optional(Criteria),
    Actions: S.optional(AutomationRulesActionListV2),
    Tags: S.optional(TagMap),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/automationrulesv2/create" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAutomationRuleV2Request",
}) as any as S.Schema<CreateAutomationRuleV2Request>;
export interface CreateAutomationRuleV2Response {
  RuleArn?: string;
  RuleId?: string;
}
export const CreateAutomationRuleV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleArn: S.optional(S.String), RuleId: S.optional(S.String) }),
).annotate({
  identifier: "CreateAutomationRuleV2Response",
}) as any as S.Schema<CreateAutomationRuleV2Response>;
export type EnabledStandardIdentifierList = string[];
export const EnabledStandardIdentifierList = /*@__PURE__*/ S.Array(S.String);
export type EnabledSecurityControlIdentifierList = string[];
export const EnabledSecurityControlIdentifierList = /*@__PURE__*/ S.Array(
  S.String,
);
export type DisabledSecurityControlIdentifierList = string[];
export const DisabledSecurityControlIdentifierList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface SecurityControlCustomParameter {
  SecurityControlId?: string;
  Parameters?: { [key: string]: ParameterConfiguration | undefined };
}
export const SecurityControlCustomParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecurityControlId: S.optional(S.String),
    Parameters: S.optional(Parameters),
  }),
).annotate({
  identifier: "SecurityControlCustomParameter",
}) as any as S.Schema<SecurityControlCustomParameter>;
export type SecurityControlCustomParametersList =
  SecurityControlCustomParameter[];
export const SecurityControlCustomParametersList = /*@__PURE__*/ S.Array(
  SecurityControlCustomParameter,
);
export interface SecurityControlsConfiguration {
  EnabledSecurityControlIdentifiers?: string[];
  DisabledSecurityControlIdentifiers?: string[];
  SecurityControlCustomParameters?: SecurityControlCustomParameter[];
}
export const SecurityControlsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnabledSecurityControlIdentifiers: S.optional(
      EnabledSecurityControlIdentifierList,
    ),
    DisabledSecurityControlIdentifiers: S.optional(
      DisabledSecurityControlIdentifierList,
    ),
    SecurityControlCustomParameters: S.optional(
      SecurityControlCustomParametersList,
    ),
  }),
).annotate({
  identifier: "SecurityControlsConfiguration",
}) as any as S.Schema<SecurityControlsConfiguration>;
export interface SecurityHubPolicy {
  ServiceEnabled?: boolean;
  EnabledStandardIdentifiers?: string[];
  SecurityControlsConfiguration?: SecurityControlsConfiguration;
}
export const SecurityHubPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceEnabled: S.optional(S.Boolean),
    EnabledStandardIdentifiers: S.optional(EnabledStandardIdentifierList),
    SecurityControlsConfiguration: S.optional(SecurityControlsConfiguration),
  }),
).annotate({
  identifier: "SecurityHubPolicy",
}) as any as S.Schema<SecurityHubPolicy>;
export type Policy = { SecurityHub: SecurityHubPolicy };
export const Policy = /*@__PURE__*/ S.Union([
  S.Struct({ SecurityHub: SecurityHubPolicy }),
]);
export interface CreateConfigurationPolicyRequest {
  Name?: string;
  Description?: string;
  ConfigurationPolicy?: Policy;
  Tags?: { [key: string]: string | undefined };
}
export const CreateConfigurationPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    ConfigurationPolicy: S.optional(Policy),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/configurationPolicy/create" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateConfigurationPolicyRequest",
}) as any as S.Schema<CreateConfigurationPolicyRequest>;
export interface CreateConfigurationPolicyResponse {
  Arn?: string;
  Id?: string;
  Name?: string;
  Description?: string;
  UpdatedAt?: Date;
  CreatedAt?: Date;
  ConfigurationPolicy?: Policy;
}
export const CreateConfigurationPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ConfigurationPolicy: S.optional(Policy),
  }),
).annotate({
  identifier: "CreateConfigurationPolicyResponse",
}) as any as S.Schema<CreateConfigurationPolicyResponse>;
export interface JiraCloudProviderConfiguration {
  ProjectKey?: string;
}
export const JiraCloudProviderConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProjectKey: S.optional(S.String) }),
).annotate({
  identifier: "JiraCloudProviderConfiguration",
}) as any as S.Schema<JiraCloudProviderConfiguration>;
export interface ServiceNowProviderConfiguration {
  InstanceName?: string;
  SecretArn?: string;
}
export const ServiceNowProviderConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceName: S.optional(S.String),
    SecretArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceNowProviderConfiguration",
}) as any as S.Schema<ServiceNowProviderConfiguration>;
export type ProviderConfiguration =
  | { JiraCloud: JiraCloudProviderConfiguration; ServiceNow?: never }
  | { JiraCloud?: never; ServiceNow: ServiceNowProviderConfiguration };
export const ProviderConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ JiraCloud: JiraCloudProviderConfiguration }),
  S.Struct({ ServiceNow: ServiceNowProviderConfiguration }),
]);
export interface CreateConnectorV2Request {
  Name?: string;
  Description?: string;
  Provider?: ProviderConfiguration;
  KmsKeyArn?: string;
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
}
export const CreateConnectorV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Provider: S.optional(ProviderConfiguration),
    KmsKeyArn: S.optional(S.String),
    Tags: S.optional(TagMap),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/connectorsv2" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateConnectorV2Request",
}) as any as S.Schema<CreateConnectorV2Request>;
export type ConnectorStatus =
  | "CONNECTED"
  | "FAILED_TO_CONNECT"
  | "PENDING_CONFIGURATION"
  | "PENDING_AUTHORIZATION"
  | (string & {});
export const ConnectorStatus = /*@__PURE__*/ S.String;

export interface CreateConnectorV2Response {
  ConnectorArn: string;
  ConnectorId: string;
  AuthUrl?: string;
  ConnectorStatus?: ConnectorStatus;
}
export const CreateConnectorV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectorArn: S.optional(S.String),
    ConnectorId: S.optional(S.String),
    AuthUrl: S.optional(S.String),
    ConnectorStatus: S.optional(ConnectorStatus),
  }),
).annotate({
  identifier: "CreateConnectorV2Response",
}) as any as S.Schema<CreateConnectorV2Response>;
export interface CreateFindingAggregatorRequest {
  RegionLinkingMode?: string;
  Regions?: string[];
}
export const CreateFindingAggregatorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegionLinkingMode: S.optional(S.String),
    Regions: S.optional(StringList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/findingAggregator/create" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFindingAggregatorRequest",
}) as any as S.Schema<CreateFindingAggregatorRequest>;
export interface CreateFindingAggregatorResponse {
  FindingAggregatorArn?: string;
  FindingAggregationRegion?: string;
  RegionLinkingMode?: string;
  Regions?: string[];
}
export const CreateFindingAggregatorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FindingAggregatorArn: S.optional(S.String),
    FindingAggregationRegion: S.optional(S.String),
    RegionLinkingMode: S.optional(S.String),
    Regions: S.optional(StringList),
  }),
).annotate({
  identifier: "CreateFindingAggregatorResponse",
}) as any as S.Schema<CreateFindingAggregatorResponse>;
export type IpFilterList = IpFilter[];
export const IpFilterList = /*@__PURE__*/ S.Array(IpFilter);
export interface KeywordFilter {
  Value?: string;
}
export const KeywordFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.optional(S.String) }),
).annotate({ identifier: "KeywordFilter" }) as any as S.Schema<KeywordFilter>;
export type KeywordFilterList = KeywordFilter[];
export const KeywordFilterList = /*@__PURE__*/ S.Array(KeywordFilter);
export type BooleanFilterList = BooleanFilter[];
export const BooleanFilterList = /*@__PURE__*/ S.Array(BooleanFilter);
export interface AwsSecurityFindingFilters {
  ProductArn?: StringFilter[];
  AwsAccountId?: StringFilter[];
  Id?: StringFilter[];
  GeneratorId?: StringFilter[];
  Region?: StringFilter[];
  Type?: StringFilter[];
  FirstObservedAt?: DateFilter[];
  LastObservedAt?: DateFilter[];
  CreatedAt?: DateFilter[];
  UpdatedAt?: DateFilter[];
  SeverityProduct?: NumberFilter[];
  SeverityNormalized?: NumberFilter[];
  SeverityLabel?: StringFilter[];
  Confidence?: NumberFilter[];
  Criticality?: NumberFilter[];
  Title?: StringFilter[];
  Description?: StringFilter[];
  RecommendationText?: StringFilter[];
  SourceUrl?: StringFilter[];
  ProductFields?: MapFilter[];
  ProductName?: StringFilter[];
  CompanyName?: StringFilter[];
  UserDefinedFields?: MapFilter[];
  MalwareName?: StringFilter[];
  MalwareType?: StringFilter[];
  MalwarePath?: StringFilter[];
  MalwareState?: StringFilter[];
  NetworkDirection?: StringFilter[];
  NetworkProtocol?: StringFilter[];
  NetworkSourceIpV4?: IpFilter[];
  NetworkSourceIpV6?: IpFilter[];
  NetworkSourcePort?: NumberFilter[];
  NetworkSourceDomain?: StringFilter[];
  NetworkSourceMac?: StringFilter[];
  NetworkDestinationIpV4?: IpFilter[];
  NetworkDestinationIpV6?: IpFilter[];
  NetworkDestinationPort?: NumberFilter[];
  NetworkDestinationDomain?: StringFilter[];
  ProcessName?: StringFilter[];
  ProcessPath?: StringFilter[];
  ProcessPid?: NumberFilter[];
  ProcessParentPid?: NumberFilter[];
  ProcessLaunchedAt?: DateFilter[];
  ProcessTerminatedAt?: DateFilter[];
  ThreatIntelIndicatorType?: StringFilter[];
  ThreatIntelIndicatorValue?: StringFilter[];
  ThreatIntelIndicatorCategory?: StringFilter[];
  ThreatIntelIndicatorLastObservedAt?: DateFilter[];
  ThreatIntelIndicatorSource?: StringFilter[];
  ThreatIntelIndicatorSourceUrl?: StringFilter[];
  ResourceType?: StringFilter[];
  ResourceId?: StringFilter[];
  ResourcePartition?: StringFilter[];
  ResourceRegion?: StringFilter[];
  ResourceTags?: MapFilter[];
  ResourceAwsEc2InstanceType?: StringFilter[];
  ResourceAwsEc2InstanceImageId?: StringFilter[];
  ResourceAwsEc2InstanceIpV4Addresses?: IpFilter[];
  ResourceAwsEc2InstanceIpV6Addresses?: IpFilter[];
  ResourceAwsEc2InstanceKeyName?: StringFilter[];
  ResourceAwsEc2InstanceIamInstanceProfileArn?: StringFilter[];
  ResourceAwsEc2InstanceVpcId?: StringFilter[];
  ResourceAwsEc2InstanceSubnetId?: StringFilter[];
  ResourceAwsEc2InstanceLaunchedAt?: DateFilter[];
  ResourceAwsS3BucketOwnerId?: StringFilter[];
  ResourceAwsS3BucketOwnerName?: StringFilter[];
  ResourceAwsIamAccessKeyUserName?: StringFilter[];
  ResourceAwsIamAccessKeyPrincipalName?: StringFilter[];
  ResourceAwsIamAccessKeyStatus?: StringFilter[];
  ResourceAwsIamAccessKeyCreatedAt?: DateFilter[];
  ResourceAwsIamUserUserName?: StringFilter[];
  ResourceContainerName?: StringFilter[];
  ResourceContainerImageId?: StringFilter[];
  ResourceContainerImageName?: StringFilter[];
  ResourceContainerLaunchedAt?: DateFilter[];
  ResourceDetailsOther?: MapFilter[];
  ComplianceStatus?: StringFilter[];
  VerificationState?: StringFilter[];
  WorkflowState?: StringFilter[];
  WorkflowStatus?: StringFilter[];
  RecordState?: StringFilter[];
  RelatedFindingsProductArn?: StringFilter[];
  RelatedFindingsId?: StringFilter[];
  NoteText?: StringFilter[];
  NoteUpdatedAt?: DateFilter[];
  NoteUpdatedBy?: StringFilter[];
  Keyword?: KeywordFilter[];
  FindingProviderFieldsConfidence?: NumberFilter[];
  FindingProviderFieldsCriticality?: NumberFilter[];
  FindingProviderFieldsRelatedFindingsId?: StringFilter[];
  FindingProviderFieldsRelatedFindingsProductArn?: StringFilter[];
  FindingProviderFieldsSeverityLabel?: StringFilter[];
  FindingProviderFieldsSeverityOriginal?: StringFilter[];
  FindingProviderFieldsTypes?: StringFilter[];
  Sample?: BooleanFilter[];
  ComplianceSecurityControlId?: StringFilter[];
  ComplianceAssociatedStandardsId?: StringFilter[];
  VulnerabilitiesExploitAvailable?: StringFilter[];
  VulnerabilitiesFixAvailable?: StringFilter[];
  ComplianceSecurityControlParametersName?: StringFilter[];
  ComplianceSecurityControlParametersValue?: StringFilter[];
  AwsAccountName?: StringFilter[];
  ResourceApplicationName?: StringFilter[];
  ResourceApplicationArn?: StringFilter[];
}
export const AwsSecurityFindingFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductArn: S.optional(StringFilterList),
    AwsAccountId: S.optional(StringFilterList),
    Id: S.optional(StringFilterList),
    GeneratorId: S.optional(StringFilterList),
    Region: S.optional(StringFilterList),
    Type: S.optional(StringFilterList),
    FirstObservedAt: S.optional(DateFilterList),
    LastObservedAt: S.optional(DateFilterList),
    CreatedAt: S.optional(DateFilterList),
    UpdatedAt: S.optional(DateFilterList),
    SeverityProduct: S.optional(NumberFilterList),
    SeverityNormalized: S.optional(NumberFilterList),
    SeverityLabel: S.optional(StringFilterList),
    Confidence: S.optional(NumberFilterList),
    Criticality: S.optional(NumberFilterList),
    Title: S.optional(StringFilterList),
    Description: S.optional(StringFilterList),
    RecommendationText: S.optional(StringFilterList),
    SourceUrl: S.optional(StringFilterList),
    ProductFields: S.optional(MapFilterList),
    ProductName: S.optional(StringFilterList),
    CompanyName: S.optional(StringFilterList),
    UserDefinedFields: S.optional(MapFilterList),
    MalwareName: S.optional(StringFilterList),
    MalwareType: S.optional(StringFilterList),
    MalwarePath: S.optional(StringFilterList),
    MalwareState: S.optional(StringFilterList),
    NetworkDirection: S.optional(StringFilterList),
    NetworkProtocol: S.optional(StringFilterList),
    NetworkSourceIpV4: S.optional(IpFilterList),
    NetworkSourceIpV6: S.optional(IpFilterList),
    NetworkSourcePort: S.optional(NumberFilterList),
    NetworkSourceDomain: S.optional(StringFilterList),
    NetworkSourceMac: S.optional(StringFilterList),
    NetworkDestinationIpV4: S.optional(IpFilterList),
    NetworkDestinationIpV6: S.optional(IpFilterList),
    NetworkDestinationPort: S.optional(NumberFilterList),
    NetworkDestinationDomain: S.optional(StringFilterList),
    ProcessName: S.optional(StringFilterList),
    ProcessPath: S.optional(StringFilterList),
    ProcessPid: S.optional(NumberFilterList),
    ProcessParentPid: S.optional(NumberFilterList),
    ProcessLaunchedAt: S.optional(DateFilterList),
    ProcessTerminatedAt: S.optional(DateFilterList),
    ThreatIntelIndicatorType: S.optional(StringFilterList),
    ThreatIntelIndicatorValue: S.optional(StringFilterList),
    ThreatIntelIndicatorCategory: S.optional(StringFilterList),
    ThreatIntelIndicatorLastObservedAt: S.optional(DateFilterList),
    ThreatIntelIndicatorSource: S.optional(StringFilterList),
    ThreatIntelIndicatorSourceUrl: S.optional(StringFilterList),
    ResourceType: S.optional(StringFilterList),
    ResourceId: S.optional(StringFilterList),
    ResourcePartition: S.optional(StringFilterList),
    ResourceRegion: S.optional(StringFilterList),
    ResourceTags: S.optional(MapFilterList),
    ResourceAwsEc2InstanceType: S.optional(StringFilterList),
    ResourceAwsEc2InstanceImageId: S.optional(StringFilterList),
    ResourceAwsEc2InstanceIpV4Addresses: S.optional(IpFilterList),
    ResourceAwsEc2InstanceIpV6Addresses: S.optional(IpFilterList),
    ResourceAwsEc2InstanceKeyName: S.optional(StringFilterList),
    ResourceAwsEc2InstanceIamInstanceProfileArn: S.optional(StringFilterList),
    ResourceAwsEc2InstanceVpcId: S.optional(StringFilterList),
    ResourceAwsEc2InstanceSubnetId: S.optional(StringFilterList),
    ResourceAwsEc2InstanceLaunchedAt: S.optional(DateFilterList),
    ResourceAwsS3BucketOwnerId: S.optional(StringFilterList),
    ResourceAwsS3BucketOwnerName: S.optional(StringFilterList),
    ResourceAwsIamAccessKeyUserName: S.optional(StringFilterList),
    ResourceAwsIamAccessKeyPrincipalName: S.optional(StringFilterList),
    ResourceAwsIamAccessKeyStatus: S.optional(StringFilterList),
    ResourceAwsIamAccessKeyCreatedAt: S.optional(DateFilterList),
    ResourceAwsIamUserUserName: S.optional(StringFilterList),
    ResourceContainerName: S.optional(StringFilterList),
    ResourceContainerImageId: S.optional(StringFilterList),
    ResourceContainerImageName: S.optional(StringFilterList),
    ResourceContainerLaunchedAt: S.optional(DateFilterList),
    ResourceDetailsOther: S.optional(MapFilterList),
    ComplianceStatus: S.optional(StringFilterList),
    VerificationState: S.optional(StringFilterList),
    WorkflowState: S.optional(StringFilterList),
    WorkflowStatus: S.optional(StringFilterList),
    RecordState: S.optional(StringFilterList),
    RelatedFindingsProductArn: S.optional(StringFilterList),
    RelatedFindingsId: S.optional(StringFilterList),
    NoteText: S.optional(StringFilterList),
    NoteUpdatedAt: S.optional(DateFilterList),
    NoteUpdatedBy: S.optional(StringFilterList),
    Keyword: S.optional(KeywordFilterList),
    FindingProviderFieldsConfidence: S.optional(NumberFilterList),
    FindingProviderFieldsCriticality: S.optional(NumberFilterList),
    FindingProviderFieldsRelatedFindingsId: S.optional(StringFilterList),
    FindingProviderFieldsRelatedFindingsProductArn:
      S.optional(StringFilterList),
    FindingProviderFieldsSeverityLabel: S.optional(StringFilterList),
    FindingProviderFieldsSeverityOriginal: S.optional(StringFilterList),
    FindingProviderFieldsTypes: S.optional(StringFilterList),
    Sample: S.optional(BooleanFilterList),
    ComplianceSecurityControlId: S.optional(StringFilterList),
    ComplianceAssociatedStandardsId: S.optional(StringFilterList),
    VulnerabilitiesExploitAvailable: S.optional(StringFilterList),
    VulnerabilitiesFixAvailable: S.optional(StringFilterList),
    ComplianceSecurityControlParametersName: S.optional(StringFilterList),
    ComplianceSecurityControlParametersValue: S.optional(StringFilterList),
    AwsAccountName: S.optional(StringFilterList),
    ResourceApplicationName: S.optional(StringFilterList),
    ResourceApplicationArn: S.optional(StringFilterList),
  }),
).annotate({
  identifier: "AwsSecurityFindingFilters",
}) as any as S.Schema<AwsSecurityFindingFilters>;
export interface CreateInsightRequest {
  Name?: string;
  Filters?: AwsSecurityFindingFilters;
  GroupByAttribute?: string;
}
export const CreateInsightRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Filters: S.optional(AwsSecurityFindingFilters),
    GroupByAttribute: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/insights" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateInsightRequest",
}) as any as S.Schema<CreateInsightRequest>;
export interface CreateInsightResponse {
  InsightArn: string;
}
export const CreateInsightResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InsightArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateInsightResponse",
}) as any as S.Schema<CreateInsightResponse>;
export type AccountId = string;
export interface AccountDetails {
  AccountId?: string;
  Email?: string;
}
export const AccountDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountId: S.optional(S.String), Email: S.optional(S.String) }),
).annotate({ identifier: "AccountDetails" }) as any as S.Schema<AccountDetails>;
export type AccountDetailsList = AccountDetails[];
export const AccountDetailsList = /*@__PURE__*/ S.Array(AccountDetails);
export interface CreateMembersRequest {
  AccountDetails?: AccountDetails[];
}
export const CreateMembersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountDetails: S.optional(AccountDetailsList) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/members" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMembersRequest",
}) as any as S.Schema<CreateMembersRequest>;
export interface Result {
  AccountId?: string;
  ProcessingResult?: string;
}
export const Result = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    ProcessingResult: S.optional(S.String),
  }),
).annotate({ identifier: "Result" }) as any as S.Schema<Result>;
export type ResultList = Result[];
export const ResultList = /*@__PURE__*/ S.Array(Result);
export interface CreateMembersResponse {
  UnprocessedAccounts?: Result[];
}
export const CreateMembersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UnprocessedAccounts: S.optional(ResultList) }),
).annotate({
  identifier: "CreateMembersResponse",
}) as any as S.Schema<CreateMembersResponse>;
export type TicketCreationMode = "DRYRUN" | (string & {});
export const TicketCreationMode = /*@__PURE__*/ S.String;

export interface CreateTicketV2Request {
  ConnectorId?: string;
  FindingMetadataUid?: string;
  ClientToken?: string;
  Mode?: TicketCreationMode;
}
export const CreateTicketV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectorId: S.optional(S.String),
    FindingMetadataUid: S.optional(S.String),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Mode: S.optional(TicketCreationMode),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ticketsv2" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateTicketV2Request",
}) as any as S.Schema<CreateTicketV2Request>;
export interface CreateTicketV2Response {
  TicketId: string;
  TicketSrcUrl?: string;
}
export const CreateTicketV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TicketId: S.optional(S.String),
    TicketSrcUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateTicketV2Response",
}) as any as S.Schema<CreateTicketV2Response>;
export type AccountIdList = string[];
export const AccountIdList = /*@__PURE__*/ S.Array(S.String);
export interface DeclineInvitationsRequest {
  AccountIds?: string[];
}
export const DeclineInvitationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountIds: S.optional(AccountIdList) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/invitations/decline" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeclineInvitationsRequest",
}) as any as S.Schema<DeclineInvitationsRequest>;
export interface DeclineInvitationsResponse {
  UnprocessedAccounts?: Result[];
}
export const DeclineInvitationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UnprocessedAccounts: S.optional(ResultList) }),
).annotate({
  identifier: "DeclineInvitationsResponse",
}) as any as S.Schema<DeclineInvitationsResponse>;
export interface DeleteActionTargetRequest {
  ActionTargetArn: string;
}
export const DeleteActionTargetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionTargetArn: S.String.pipe(T.HttpLabel("ActionTargetArn")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/actionTargets/{ActionTargetArn+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteActionTargetRequest",
}) as any as S.Schema<DeleteActionTargetRequest>;
export interface DeleteActionTargetResponse {
  ActionTargetArn: string;
}
export const DeleteActionTargetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ActionTargetArn: S.optional(S.String) }),
).annotate({
  identifier: "DeleteActionTargetResponse",
}) as any as S.Schema<DeleteActionTargetResponse>;
export interface DeleteAggregatorV2Request {
  AggregatorV2Arn: string;
}
export const DeleteAggregatorV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AggregatorV2Arn: S.String.pipe(T.HttpLabel("AggregatorV2Arn")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/aggregatorv2/delete/{AggregatorV2Arn+}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAggregatorV2Request",
}) as any as S.Schema<DeleteAggregatorV2Request>;
export interface DeleteAggregatorV2Response {}
export const DeleteAggregatorV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAggregatorV2Response",
}) as any as S.Schema<DeleteAggregatorV2Response>;
export interface DeleteAutomationRuleV2Request {
  Identifier: string;
}
export const DeleteAutomationRuleV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/automationrulesv2/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAutomationRuleV2Request",
}) as any as S.Schema<DeleteAutomationRuleV2Request>;
export interface DeleteAutomationRuleV2Response {}
export const DeleteAutomationRuleV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAutomationRuleV2Response",
}) as any as S.Schema<DeleteAutomationRuleV2Response>;
export interface DeleteConfigurationPolicyRequest {
  Identifier: string;
}
export const DeleteConfigurationPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/configurationPolicy/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConfigurationPolicyRequest",
}) as any as S.Schema<DeleteConfigurationPolicyRequest>;
export interface DeleteConfigurationPolicyResponse {}
export const DeleteConfigurationPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteConfigurationPolicyResponse",
}) as any as S.Schema<DeleteConfigurationPolicyResponse>;
export interface DeleteConnectorV2Request {
  ConnectorId: string;
}
export const DeleteConnectorV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConnectorId: S.String.pipe(T.HttpLabel("ConnectorId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/connectorsv2/{ConnectorId+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConnectorV2Request",
}) as any as S.Schema<DeleteConnectorV2Request>;
export interface DeleteConnectorV2Response {}
export const DeleteConnectorV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteConnectorV2Response",
}) as any as S.Schema<DeleteConnectorV2Response>;
export interface DeleteFindingAggregatorRequest {
  FindingAggregatorArn: string;
}
export const DeleteFindingAggregatorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FindingAggregatorArn: S.String.pipe(T.HttpLabel("FindingAggregatorArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/findingAggregator/delete/{FindingAggregatorArn+}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFindingAggregatorRequest",
}) as any as S.Schema<DeleteFindingAggregatorRequest>;
export interface DeleteFindingAggregatorResponse {}
export const DeleteFindingAggregatorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteFindingAggregatorResponse",
}) as any as S.Schema<DeleteFindingAggregatorResponse>;
export interface DeleteInsightRequest {
  InsightArn: string;
}
export const DeleteInsightRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InsightArn: S.String.pipe(T.HttpLabel("InsightArn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/insights/{InsightArn+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteInsightRequest",
}) as any as S.Schema<DeleteInsightRequest>;
export interface DeleteInsightResponse {
  InsightArn: string;
}
export const DeleteInsightResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InsightArn: S.optional(S.String) }),
).annotate({
  identifier: "DeleteInsightResponse",
}) as any as S.Schema<DeleteInsightResponse>;
export interface DeleteInvitationsRequest {
  AccountIds?: string[];
}
export const DeleteInvitationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountIds: S.optional(AccountIdList) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/invitations/delete" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteInvitationsRequest",
}) as any as S.Schema<DeleteInvitationsRequest>;
export interface DeleteInvitationsResponse {
  UnprocessedAccounts?: Result[];
}
export const DeleteInvitationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UnprocessedAccounts: S.optional(ResultList) }),
).annotate({
  identifier: "DeleteInvitationsResponse",
}) as any as S.Schema<DeleteInvitationsResponse>;
export interface DeleteMembersRequest {
  AccountIds?: string[];
}
export const DeleteMembersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountIds: S.optional(AccountIdList) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/members/delete" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMembersRequest",
}) as any as S.Schema<DeleteMembersRequest>;
export interface DeleteMembersResponse {
  UnprocessedAccounts?: Result[];
}
export const DeleteMembersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UnprocessedAccounts: S.optional(ResultList) }),
).annotate({
  identifier: "DeleteMembersResponse",
}) as any as S.Schema<DeleteMembersResponse>;
export type ArnList = string[];
export const ArnList = /*@__PURE__*/ S.Array(S.String);
export type NextToken = string;
export type MaxResults = number;
export interface DescribeActionTargetsRequest {
  ActionTargetArns?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeActionTargetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionTargetArns: S.optional(ArnList),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/actionTargets/get" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeActionTargetsRequest",
}) as any as S.Schema<DescribeActionTargetsRequest>;
export interface ActionTarget {
  ActionTargetArn?: string;
  Name?: string;
  Description?: string;
}
export const ActionTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionTargetArn: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
  }),
).annotate({ identifier: "ActionTarget" }) as any as S.Schema<ActionTarget>;
export type ActionTargetList = ActionTarget[];
export const ActionTargetList = /*@__PURE__*/ S.Array(ActionTarget);
export interface DescribeActionTargetsResponse {
  ActionTargets: (ActionTarget & {
    ActionTargetArn: NonEmptyString;
    Name: NonEmptyString;
    Description: NonEmptyString;
  })[];
  NextToken?: string;
}
export const DescribeActionTargetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionTargets: S.optional(ActionTargetList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeActionTargetsResponse",
}) as any as S.Schema<DescribeActionTargetsResponse>;
export interface DescribeHubRequest {
  HubArn?: string;
}
export const DescribeHubRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HubArn: S.optional(S.String).pipe(T.HttpQuery("HubArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/accounts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeHubRequest",
}) as any as S.Schema<DescribeHubRequest>;
export type ControlFindingGenerator =
  | "STANDARD_CONTROL"
  | "SECURITY_CONTROL"
  | (string & {});
export const ControlFindingGenerator = /*@__PURE__*/ S.String;

export interface DescribeHubResponse {
  HubArn?: string;
  SubscribedAt?: string;
  AutoEnableControls?: boolean;
  ControlFindingGenerator?: ControlFindingGenerator;
}
export const DescribeHubResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HubArn: S.optional(S.String),
    SubscribedAt: S.optional(S.String),
    AutoEnableControls: S.optional(S.Boolean),
    ControlFindingGenerator: S.optional(ControlFindingGenerator),
  }),
).annotate({
  identifier: "DescribeHubResponse",
}) as any as S.Schema<DescribeHubResponse>;
export interface DescribeOrganizationConfigurationRequest {}
export const DescribeOrganizationConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({}).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/organization/configuration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeOrganizationConfigurationRequest",
}) as any as S.Schema<DescribeOrganizationConfigurationRequest>;
export type AutoEnableStandards = "NONE" | "DEFAULT" | (string & {});
export const AutoEnableStandards = /*@__PURE__*/ S.String;

export type OrganizationConfigurationConfigurationType =
  | "CENTRAL"
  | "LOCAL"
  | (string & {});
export const OrganizationConfigurationConfigurationType =
  /*@__PURE__*/ S.String;

export type OrganizationConfigurationStatus =
  | "PENDING"
  | "ENABLED"
  | "FAILED"
  | (string & {});
export const OrganizationConfigurationStatus = /*@__PURE__*/ S.String;

export interface OrganizationConfiguration {
  ConfigurationType?: OrganizationConfigurationConfigurationType;
  Status?: OrganizationConfigurationStatus;
  StatusMessage?: string;
}
export const OrganizationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationType: S.optional(OrganizationConfigurationConfigurationType),
    Status: S.optional(OrganizationConfigurationStatus),
    StatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "OrganizationConfiguration",
}) as any as S.Schema<OrganizationConfiguration>;
export interface DescribeOrganizationConfigurationResponse {
  AutoEnable?: boolean;
  MemberAccountLimitReached?: boolean;
  AutoEnableStandards?: AutoEnableStandards;
  OrganizationConfiguration?: OrganizationConfiguration;
}
export const DescribeOrganizationConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AutoEnable: S.optional(S.Boolean),
      MemberAccountLimitReached: S.optional(S.Boolean),
      AutoEnableStandards: S.optional(AutoEnableStandards),
      OrganizationConfiguration: S.optional(OrganizationConfiguration),
    }),
  ).annotate({
    identifier: "DescribeOrganizationConfigurationResponse",
  }) as any as S.Schema<DescribeOrganizationConfigurationResponse>;
export interface DescribeProductsRequest {
  NextToken?: string;
  MaxResults?: number;
  ProductArn?: string;
}
export const DescribeProductsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    ProductArn: S.optional(S.String).pipe(T.HttpQuery("ProductArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/products" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeProductsRequest",
}) as any as S.Schema<DescribeProductsRequest>;
export type CategoryList = string[];
export const CategoryList = /*@__PURE__*/ S.Array(S.String);
export type IntegrationType =
  | "SEND_FINDINGS_TO_SECURITY_HUB"
  | "RECEIVE_FINDINGS_FROM_SECURITY_HUB"
  | "UPDATE_FINDINGS_IN_SECURITY_HUB"
  | (string & {});
export const IntegrationType = /*@__PURE__*/ S.String;

export type IntegrationTypeList = IntegrationType[];
export const IntegrationTypeList = /*@__PURE__*/ S.Array(IntegrationType);
export interface Product {
  ProductArn?: string;
  ProductName?: string;
  CompanyName?: string;
  Description?: string;
  Categories?: string[];
  IntegrationTypes?: IntegrationType[];
  MarketplaceUrl?: string;
  ActivationUrl?: string;
  ProductSubscriptionResourcePolicy?: string;
}
export const Product = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductArn: S.optional(S.String),
    ProductName: S.optional(S.String),
    CompanyName: S.optional(S.String),
    Description: S.optional(S.String),
    Categories: S.optional(CategoryList),
    IntegrationTypes: S.optional(IntegrationTypeList),
    MarketplaceUrl: S.optional(S.String),
    ActivationUrl: S.optional(S.String),
    ProductSubscriptionResourcePolicy: S.optional(S.String),
  }),
).annotate({ identifier: "Product" }) as any as S.Schema<Product>;
export type ProductsList = Product[];
export const ProductsList = /*@__PURE__*/ S.Array(Product);
export interface DescribeProductsResponse {
  Products: (Product & { ProductArn: NonEmptyString })[];
  NextToken?: string;
}
export const DescribeProductsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Products: S.optional(ProductsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeProductsResponse",
}) as any as S.Schema<DescribeProductsResponse>;
export interface DescribeProductsV2Request {
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeProductsV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/productsV2" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeProductsV2Request",
}) as any as S.Schema<DescribeProductsV2Request>;
export type IntegrationV2Type =
  | "SEND_FINDINGS_TO_SECURITY_HUB"
  | "RECEIVE_FINDINGS_FROM_SECURITY_HUB"
  | "UPDATE_FINDINGS_IN_SECURITY_HUB"
  | "EXTENDED_PLAN"
  | (string & {});
export const IntegrationV2Type = /*@__PURE__*/ S.String;

export type IntegrationV2TypeList = IntegrationV2Type[];
export const IntegrationV2TypeList = /*@__PURE__*/ S.Array(IntegrationV2Type);
export interface ProductV2 {
  ProductV2Name?: string;
  CompanyName?: string;
  Description?: string;
  Categories?: string[];
  IntegrationV2Types?: IntegrationV2Type[];
  MarketplaceUrl?: string;
  ActivationUrl?: string;
  MarketplaceProductId?: string;
}
export const ProductV2 = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductV2Name: S.optional(S.String),
    CompanyName: S.optional(S.String),
    Description: S.optional(S.String),
    Categories: S.optional(CategoryList),
    IntegrationV2Types: S.optional(IntegrationV2TypeList),
    MarketplaceUrl: S.optional(S.String),
    ActivationUrl: S.optional(S.String),
    MarketplaceProductId: S.optional(S.String),
  }),
).annotate({ identifier: "ProductV2" }) as any as S.Schema<ProductV2>;
export type ProductsV2List = ProductV2[];
export const ProductsV2List = /*@__PURE__*/ S.Array(ProductV2);
export interface DescribeProductsV2Response {
  ProductsV2: ProductV2[];
  NextToken?: string;
}
export const DescribeProductsV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductsV2: S.optional(ProductsV2List),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeProductsV2Response",
}) as any as S.Schema<DescribeProductsV2Response>;
export interface DescribeSecurityHubV2Request {}
export const DescribeSecurityHubV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/hubv2" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeSecurityHubV2Request",
}) as any as S.Schema<DescribeSecurityHubV2Request>;
export interface DescribeSecurityHubV2Response {
  HubV2Arn?: string;
  SubscribedAt?: string;
}
export const DescribeSecurityHubV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HubV2Arn: S.optional(S.String),
    SubscribedAt: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeSecurityHubV2Response",
}) as any as S.Schema<DescribeSecurityHubV2Response>;
export interface DescribeStandardsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeStandardsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/standards" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeStandardsRequest",
}) as any as S.Schema<DescribeStandardsRequest>;
export interface StandardsManagedBy {
  Company?: string;
  Product?: string;
}
export const StandardsManagedBy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Company: S.optional(S.String), Product: S.optional(S.String) }),
).annotate({
  identifier: "StandardsManagedBy",
}) as any as S.Schema<StandardsManagedBy>;
export interface Standard {
  StandardsArn?: string;
  Name?: string;
  Description?: string;
  EnabledByDefault?: boolean;
  StandardsManagedBy?: StandardsManagedBy;
}
export const Standard = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StandardsArn: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    EnabledByDefault: S.optional(S.Boolean),
    StandardsManagedBy: S.optional(StandardsManagedBy),
  }),
).annotate({ identifier: "Standard" }) as any as S.Schema<Standard>;
export type Standards = Standard[];
export const Standards = /*@__PURE__*/ S.Array(Standard);
export interface DescribeStandardsResponse {
  Standards?: Standard[];
  NextToken?: string;
}
export const DescribeStandardsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Standards: S.optional(Standards),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeStandardsResponse",
}) as any as S.Schema<DescribeStandardsResponse>;
export interface DescribeStandardsControlsRequest {
  StandardsSubscriptionArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeStandardsControlsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StandardsSubscriptionArn: S.String.pipe(
      T.HttpLabel("StandardsSubscriptionArn"),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/standards/controls/{StandardsSubscriptionArn+}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeStandardsControlsRequest",
}) as any as S.Schema<DescribeStandardsControlsRequest>;
export interface StandardsControl {
  StandardsControlArn?: string;
  ControlStatus?: ControlStatus;
  DisabledReason?: string;
  ControlStatusUpdatedAt?: Date;
  ControlId?: string;
  Title?: string;
  Description?: string;
  RemediationUrl?: string;
  SeverityRating?: SeverityRating;
  RelatedRequirements?: string[];
}
export const StandardsControl = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StandardsControlArn: S.optional(S.String),
    ControlStatus: S.optional(ControlStatus),
    DisabledReason: S.optional(S.String),
    ControlStatusUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ControlId: S.optional(S.String),
    Title: S.optional(S.String),
    Description: S.optional(S.String),
    RemediationUrl: S.optional(S.String),
    SeverityRating: S.optional(SeverityRating),
    RelatedRequirements: S.optional(RelatedRequirementsList),
  }),
).annotate({
  identifier: "StandardsControl",
}) as any as S.Schema<StandardsControl>;
export type StandardsControls = StandardsControl[];
export const StandardsControls = /*@__PURE__*/ S.Array(StandardsControl);
export interface DescribeStandardsControlsResponse {
  Controls?: StandardsControl[];
  NextToken?: string;
}
export const DescribeStandardsControlsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Controls: S.optional(StandardsControls),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeStandardsControlsResponse",
}) as any as S.Schema<DescribeStandardsControlsResponse>;
export interface DisableImportFindingsForProductRequest {
  ProductSubscriptionArn: string;
}
export const DisableImportFindingsForProductRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProductSubscriptionArn: S.String.pipe(
        T.HttpLabel("ProductSubscriptionArn"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/productSubscriptions/{ProductSubscriptionArn+}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DisableImportFindingsForProductRequest",
}) as any as S.Schema<DisableImportFindingsForProductRequest>;
export interface DisableImportFindingsForProductResponse {}
export const DisableImportFindingsForProductResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DisableImportFindingsForProductResponse",
}) as any as S.Schema<DisableImportFindingsForProductResponse>;
export type SecurityHubFeature =
  | "SecurityHub"
  | "SecurityHubV2"
  | (string & {});
export const SecurityHubFeature = /*@__PURE__*/ S.String;

export interface DisableOrganizationAdminAccountRequest {
  AdminAccountId?: string;
  Feature?: SecurityHubFeature;
}
export const DisableOrganizationAdminAccountRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AdminAccountId: S.optional(S.String),
      Feature: S.optional(SecurityHubFeature),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/organization/admin/disable" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DisableOrganizationAdminAccountRequest",
}) as any as S.Schema<DisableOrganizationAdminAccountRequest>;
export interface DisableOrganizationAdminAccountResponse {}
export const DisableOrganizationAdminAccountResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DisableOrganizationAdminAccountResponse",
}) as any as S.Schema<DisableOrganizationAdminAccountResponse>;
export interface DisableSecurityHubRequest {}
export const DisableSecurityHubRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/accounts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisableSecurityHubRequest",
}) as any as S.Schema<DisableSecurityHubRequest>;
export interface DisableSecurityHubResponse {}
export const DisableSecurityHubResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisableSecurityHubResponse",
}) as any as S.Schema<DisableSecurityHubResponse>;
export interface DisableSecurityHubV2Request {}
export const DisableSecurityHubV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/hubv2" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisableSecurityHubV2Request",
}) as any as S.Schema<DisableSecurityHubV2Request>;
export interface DisableSecurityHubV2Response {}
export const DisableSecurityHubV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisableSecurityHubV2Response",
}) as any as S.Schema<DisableSecurityHubV2Response>;
export interface DisassociateFromAdministratorAccountRequest {}
export const DisassociateFromAdministratorAccountRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({}).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/administrator/disassociate" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DisassociateFromAdministratorAccountRequest",
  }) as any as S.Schema<DisassociateFromAdministratorAccountRequest>;
export interface DisassociateFromAdministratorAccountResponse {}
export const DisassociateFromAdministratorAccountResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DisassociateFromAdministratorAccountResponse",
  }) as any as S.Schema<DisassociateFromAdministratorAccountResponse>;
export interface DisassociateFromMasterAccountRequest {}
export const DisassociateFromMasterAccountRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({}).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/master/disassociate" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DisassociateFromMasterAccountRequest",
}) as any as S.Schema<DisassociateFromMasterAccountRequest>;
export interface DisassociateFromMasterAccountResponse {}
export const DisassociateFromMasterAccountResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DisassociateFromMasterAccountResponse",
}) as any as S.Schema<DisassociateFromMasterAccountResponse>;
export interface DisassociateMembersRequest {
  AccountIds?: string[];
}
export const DisassociateMembersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountIds: S.optional(AccountIdList) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/members/disassociate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateMembersRequest",
}) as any as S.Schema<DisassociateMembersRequest>;
export interface DisassociateMembersResponse {}
export const DisassociateMembersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateMembersResponse",
}) as any as S.Schema<DisassociateMembersResponse>;
export interface EnableImportFindingsForProductRequest {
  ProductArn?: string;
}
export const EnableImportFindingsForProductRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ ProductArn: S.optional(S.String) }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/productSubscriptions" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "EnableImportFindingsForProductRequest",
}) as any as S.Schema<EnableImportFindingsForProductRequest>;
export interface EnableImportFindingsForProductResponse {
  ProductSubscriptionArn?: string;
}
export const EnableImportFindingsForProductResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ ProductSubscriptionArn: S.optional(S.String) }),
).annotate({
  identifier: "EnableImportFindingsForProductResponse",
}) as any as S.Schema<EnableImportFindingsForProductResponse>;
export interface EnableOrganizationAdminAccountRequest {
  AdminAccountId?: string;
  Feature?: SecurityHubFeature;
}
export const EnableOrganizationAdminAccountRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AdminAccountId: S.optional(S.String),
      Feature: S.optional(SecurityHubFeature),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/organization/admin/enable" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "EnableOrganizationAdminAccountRequest",
}) as any as S.Schema<EnableOrganizationAdminAccountRequest>;
export interface EnableOrganizationAdminAccountResponse {
  AdminAccountId?: string;
  Feature?: SecurityHubFeature;
}
export const EnableOrganizationAdminAccountResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AdminAccountId: S.optional(S.String),
      Feature: S.optional(SecurityHubFeature),
    }),
).annotate({
  identifier: "EnableOrganizationAdminAccountResponse",
}) as any as S.Schema<EnableOrganizationAdminAccountResponse>;
export interface EnableSecurityHubRequest {
  Tags?: { [key: string]: string | undefined };
  EnableDefaultStandards?: boolean;
  ControlFindingGenerator?: ControlFindingGenerator;
}
export const EnableSecurityHubRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Tags: S.optional(TagMap),
    EnableDefaultStandards: S.optional(S.Boolean),
    ControlFindingGenerator: S.optional(ControlFindingGenerator),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/accounts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "EnableSecurityHubRequest",
}) as any as S.Schema<EnableSecurityHubRequest>;
export interface EnableSecurityHubResponse {}
export const EnableSecurityHubResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "EnableSecurityHubResponse",
}) as any as S.Schema<EnableSecurityHubResponse>;
export interface EnableSecurityHubV2Request {
  Tags?: { [key: string]: string | undefined };
}
export const EnableSecurityHubV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagMap) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/hubv2" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "EnableSecurityHubV2Request",
}) as any as S.Schema<EnableSecurityHubV2Request>;
export interface EnableSecurityHubV2Response {
  HubV2Arn?: string;
}
export const EnableSecurityHubV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HubV2Arn: S.optional(S.String) }),
).annotate({
  identifier: "EnableSecurityHubV2Response",
}) as any as S.Schema<EnableSecurityHubV2Response>;
export interface GenerateRecommendedPolicyV2Request {
  MetadataUid: string;
}
export const GenerateRecommendedPolicyV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MetadataUid: S.String.pipe(T.HttpLabel("MetadataUid")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/recommendedPolicyV2/{MetadataUid}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GenerateRecommendedPolicyV2Request",
}) as any as S.Schema<GenerateRecommendedPolicyV2Request>;
export interface GenerateRecommendedPolicyV2Response {}
export const GenerateRecommendedPolicyV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "GenerateRecommendedPolicyV2Response",
}) as any as S.Schema<GenerateRecommendedPolicyV2Response>;
export interface GetAdministratorAccountRequest {}
export const GetAdministratorAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/administrator" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAdministratorAccountRequest",
}) as any as S.Schema<GetAdministratorAccountRequest>;
export interface Invitation {
  AccountId?: string;
  InvitationId?: string;
  InvitedAt?: Date;
  MemberStatus?: string;
}
export const Invitation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    InvitationId: S.optional(S.String),
    InvitedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    MemberStatus: S.optional(S.String),
  }),
).annotate({ identifier: "Invitation" }) as any as S.Schema<Invitation>;
export interface GetAdministratorAccountResponse {
  Administrator?: Invitation;
}
export const GetAdministratorAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Administrator: S.optional(Invitation) }),
).annotate({
  identifier: "GetAdministratorAccountResponse",
}) as any as S.Schema<GetAdministratorAccountResponse>;
export interface GetAggregatorV2Request {
  AggregatorV2Arn: string;
}
export const GetAggregatorV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AggregatorV2Arn: S.String.pipe(T.HttpLabel("AggregatorV2Arn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/aggregatorv2/get/{AggregatorV2Arn+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAggregatorV2Request",
}) as any as S.Schema<GetAggregatorV2Request>;
export interface GetAggregatorV2Response {
  AggregatorV2Arn?: string;
  AggregationRegion?: string;
  RegionLinkingMode?: string;
  LinkedRegions?: string[];
}
export const GetAggregatorV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AggregatorV2Arn: S.optional(S.String),
    AggregationRegion: S.optional(S.String),
    RegionLinkingMode: S.optional(S.String),
    LinkedRegions: S.optional(StringList),
  }),
).annotate({
  identifier: "GetAggregatorV2Response",
}) as any as S.Schema<GetAggregatorV2Response>;
export interface GetAutomationRuleV2Request {
  Identifier: string;
}
export const GetAutomationRuleV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/automationrulesv2/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAutomationRuleV2Request",
}) as any as S.Schema<GetAutomationRuleV2Request>;
export interface GetAutomationRuleV2Response {
  RuleArn?: string;
  RuleId?: string;
  RuleOrder?: number;
  RuleName?: string;
  RuleStatus?: RuleStatusV2;
  Description?: string;
  Criteria?: Criteria;
  Actions?: (AutomationRulesActionV2 & { Type: AutomationRulesActionTypeV2 })[];
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export const GetAutomationRuleV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleArn: S.optional(S.String),
    RuleId: S.optional(S.String),
    RuleOrder: S.optional(S.Number),
    RuleName: S.optional(S.String),
    RuleStatus: S.optional(RuleStatusV2),
    Description: S.optional(S.String),
    Criteria: S.optional(Criteria),
    Actions: S.optional(AutomationRulesActionListV2),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetAutomationRuleV2Response",
}) as any as S.Schema<GetAutomationRuleV2Response>;
export interface GetConfigurationPolicyRequest {
  Identifier: string;
}
export const GetConfigurationPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/configurationPolicy/get/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConfigurationPolicyRequest",
}) as any as S.Schema<GetConfigurationPolicyRequest>;
export interface GetConfigurationPolicyResponse {
  Arn?: string;
  Id?: string;
  Name?: string;
  Description?: string;
  UpdatedAt?: Date;
  CreatedAt?: Date;
  ConfigurationPolicy?: Policy;
}
export const GetConfigurationPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ConfigurationPolicy: S.optional(Policy),
  }),
).annotate({
  identifier: "GetConfigurationPolicyResponse",
}) as any as S.Schema<GetConfigurationPolicyResponse>;
export interface GetConfigurationPolicyAssociationRequest {
  Target?: Target;
}
export const GetConfigurationPolicyAssociationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Target: S.optional(Target) }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/configurationPolicyAssociation/get" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetConfigurationPolicyAssociationRequest",
}) as any as S.Schema<GetConfigurationPolicyAssociationRequest>;
export interface GetConfigurationPolicyAssociationResponse {
  ConfigurationPolicyId?: string;
  TargetId?: string;
  TargetType?: TargetType;
  AssociationType?: AssociationType;
  UpdatedAt?: Date;
  AssociationStatus?: ConfigurationPolicyAssociationStatus;
  AssociationStatusMessage?: string;
}
export const GetConfigurationPolicyAssociationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationPolicyId: S.optional(S.String),
      TargetId: S.optional(S.String),
      TargetType: S.optional(TargetType),
      AssociationType: S.optional(AssociationType),
      UpdatedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      AssociationStatus: S.optional(ConfigurationPolicyAssociationStatus),
      AssociationStatusMessage: S.optional(S.String),
    }),
  ).annotate({
    identifier: "GetConfigurationPolicyAssociationResponse",
  }) as any as S.Schema<GetConfigurationPolicyAssociationResponse>;
export interface GetConnectorV2Request {
  ConnectorId: string;
}
export const GetConnectorV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConnectorId: S.String.pipe(T.HttpLabel("ConnectorId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/connectorsv2/{ConnectorId+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConnectorV2Request",
}) as any as S.Schema<GetConnectorV2Request>;
export interface HealthCheck {
  ConnectorStatus?: ConnectorStatus;
  Message?: string;
  LastCheckedAt?: Date;
}
export const HealthCheck = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectorStatus: S.optional(ConnectorStatus),
    Message: S.optional(S.String),
    LastCheckedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "HealthCheck" }) as any as S.Schema<HealthCheck>;
export type ConnectorAuthStatus = "ACTIVE" | "FAILED" | (string & {});
export const ConnectorAuthStatus = /*@__PURE__*/ S.String;

export interface JiraCloudDetail {
  CloudId?: string;
  ProjectKey?: string;
  Domain?: string;
  AuthUrl?: string;
  AuthStatus?: ConnectorAuthStatus;
}
export const JiraCloudDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudId: S.optional(S.String),
    ProjectKey: S.optional(S.String),
    Domain: S.optional(S.String),
    AuthUrl: S.optional(S.String),
    AuthStatus: S.optional(ConnectorAuthStatus),
  }),
).annotate({
  identifier: "JiraCloudDetail",
}) as any as S.Schema<JiraCloudDetail>;
export interface ServiceNowDetail {
  InstanceName?: string;
  SecretArn?: string;
  AuthStatus?: ConnectorAuthStatus;
}
export const ServiceNowDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceName: S.optional(S.String),
    SecretArn: S.optional(S.String),
    AuthStatus: S.optional(ConnectorAuthStatus),
  }),
).annotate({
  identifier: "ServiceNowDetail",
}) as any as S.Schema<ServiceNowDetail>;
export type ProviderDetail =
  | { JiraCloud: JiraCloudDetail; ServiceNow?: never }
  | { JiraCloud?: never; ServiceNow: ServiceNowDetail };
export const ProviderDetail = /*@__PURE__*/ S.Union([
  S.Struct({ JiraCloud: JiraCloudDetail }),
  S.Struct({ ServiceNow: ServiceNowDetail }),
]);
export interface GetConnectorV2Response {
  ConnectorArn?: string;
  ConnectorId: string;
  Name: string;
  Description?: string;
  KmsKeyArn?: string;
  CreatedAt: Date;
  LastUpdatedAt: Date;
  Health: HealthCheck & {
    ConnectorStatus: ConnectorStatus;
    LastCheckedAt: Date;
  };
  ProviderDetail: ProviderDetail;
}
export const GetConnectorV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectorArn: S.optional(S.String),
    ConnectorId: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    KmsKeyArn: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Health: S.optional(HealthCheck),
    ProviderDetail: S.optional(ProviderDetail),
  }),
).annotate({
  identifier: "GetConnectorV2Response",
}) as any as S.Schema<GetConnectorV2Response>;
export interface GetEnabledStandardsRequest {
  StandardsSubscriptionArns?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export const GetEnabledStandardsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StandardsSubscriptionArns: S.optional(StandardsSubscriptionArns),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/standards/get" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEnabledStandardsRequest",
}) as any as S.Schema<GetEnabledStandardsRequest>;
export interface GetEnabledStandardsResponse {
  StandardsSubscriptions?: (StandardsSubscription & {
    StandardsSubscriptionArn: NonEmptyString;
    StandardsArn: NonEmptyString;
    StandardsInput: StandardsInputParameterMap;
    StandardsStatus: StandardsStatus;
    StandardsStatusReason: StandardsStatusReason & {
      StatusReasonCode: StatusReasonCode;
    };
  })[];
  NextToken?: string;
}
export const GetEnabledStandardsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StandardsSubscriptions: S.optional(StandardsSubscriptions),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetEnabledStandardsResponse",
}) as any as S.Schema<GetEnabledStandardsResponse>;
export interface GetFindingAggregatorRequest {
  FindingAggregatorArn: string;
}
export const GetFindingAggregatorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FindingAggregatorArn: S.String.pipe(T.HttpLabel("FindingAggregatorArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/findingAggregator/get/{FindingAggregatorArn+}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFindingAggregatorRequest",
}) as any as S.Schema<GetFindingAggregatorRequest>;
export interface GetFindingAggregatorResponse {
  FindingAggregatorArn?: string;
  FindingAggregationRegion?: string;
  RegionLinkingMode?: string;
  Regions?: string[];
}
export const GetFindingAggregatorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FindingAggregatorArn: S.optional(S.String),
    FindingAggregationRegion: S.optional(S.String),
    RegionLinkingMode: S.optional(S.String),
    Regions: S.optional(StringList),
  }),
).annotate({
  identifier: "GetFindingAggregatorResponse",
}) as any as S.Schema<GetFindingAggregatorResponse>;
export interface GetFindingHistoryRequest {
  FindingIdentifier?: AwsSecurityFindingIdentifier;
  StartTime?: Date;
  EndTime?: Date;
  NextToken?: string;
  MaxResults?: number;
}
export const GetFindingHistoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FindingIdentifier: S.optional(AwsSecurityFindingIdentifier),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/findingHistory/get" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFindingHistoryRequest",
}) as any as S.Schema<GetFindingHistoryRequest>;
export type FindingHistoryUpdateSourceType =
  | "BATCH_UPDATE_FINDINGS"
  | "BATCH_IMPORT_FINDINGS"
  | (string & {});
export const FindingHistoryUpdateSourceType = /*@__PURE__*/ S.String;

export interface FindingHistoryUpdateSource {
  Type?: FindingHistoryUpdateSourceType;
  Identity?: string;
}
export const FindingHistoryUpdateSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(FindingHistoryUpdateSourceType),
    Identity: S.optional(S.String),
  }),
).annotate({
  identifier: "FindingHistoryUpdateSource",
}) as any as S.Schema<FindingHistoryUpdateSource>;
export interface FindingHistoryUpdate {
  UpdatedField?: string;
  OldValue?: string;
  NewValue?: string;
}
export const FindingHistoryUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpdatedField: S.optional(S.String),
    OldValue: S.optional(S.String),
    NewValue: S.optional(S.String),
  }),
).annotate({
  identifier: "FindingHistoryUpdate",
}) as any as S.Schema<FindingHistoryUpdate>;
export type FindingHistoryUpdatesList = FindingHistoryUpdate[];
export const FindingHistoryUpdatesList =
  /*@__PURE__*/ S.Array(FindingHistoryUpdate);
export interface FindingHistoryRecord {
  FindingIdentifier?: AwsSecurityFindingIdentifier;
  UpdateTime?: Date;
  FindingCreated?: boolean;
  UpdateSource?: FindingHistoryUpdateSource;
  Updates?: FindingHistoryUpdate[];
  NextToken?: string;
}
export const FindingHistoryRecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FindingIdentifier: S.optional(AwsSecurityFindingIdentifier),
    UpdateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    FindingCreated: S.optional(S.Boolean),
    UpdateSource: S.optional(FindingHistoryUpdateSource),
    Updates: S.optional(FindingHistoryUpdatesList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "FindingHistoryRecord",
}) as any as S.Schema<FindingHistoryRecord>;
export type FindingHistoryRecordList = FindingHistoryRecord[];
export const FindingHistoryRecordList =
  /*@__PURE__*/ S.Array(FindingHistoryRecord);
export interface GetFindingHistoryResponse {
  Records?: (FindingHistoryRecord & {
    FindingIdentifier: AwsSecurityFindingIdentifier & {
      Id: NonEmptyString;
      ProductArn: NonEmptyString;
    };
  })[];
  NextToken?: string;
}
export const GetFindingHistoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Records: S.optional(FindingHistoryRecordList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetFindingHistoryResponse",
}) as any as S.Schema<GetFindingHistoryResponse>;
export type SortOrder = "asc" | "desc" | (string & {});
export const SortOrder = /*@__PURE__*/ S.String;

export interface SortCriterion {
  Field?: string;
  SortOrder?: SortOrder;
}
export const SortCriterion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Field: S.optional(S.String), SortOrder: S.optional(SortOrder) }),
).annotate({ identifier: "SortCriterion" }) as any as S.Schema<SortCriterion>;
export type SortCriteria = SortCriterion[];
export const SortCriteria = /*@__PURE__*/ S.Array(SortCriterion);
export interface GetFindingsRequest {
  Filters?: AwsSecurityFindingFilters;
  SortCriteria?: SortCriterion[];
  NextToken?: string;
  MaxResults?: number;
}
export const GetFindingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(AwsSecurityFindingFilters),
    SortCriteria: S.optional(SortCriteria),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/findings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFindingsRequest",
}) as any as S.Schema<GetFindingsRequest>;
export type AwsSecurityFindingList = AwsSecurityFinding[];
export const AwsSecurityFindingList = /*@__PURE__*/ S.Array(AwsSecurityFinding);
export interface GetFindingsResponse {
  Findings: (AwsSecurityFinding & {
    SchemaVersion: NonEmptyString;
    Id: NonEmptyString;
    ProductArn: NonEmptyString;
    GeneratorId: NonEmptyString;
    AwsAccountId: NonEmptyString;
    CreatedAt: NonEmptyString;
    UpdatedAt: NonEmptyString;
    Title: NonEmptyString;
    Description: NonEmptyString;
    Resources: (Resource & { Type: NonEmptyString; Id: NonEmptyString })[];
    Malware: (Malware & { Name: NonEmptyString })[];
    Compliance: Compliance & {
      StatusReasons: (StatusReason & { ReasonCode: NonEmptyString })[];
    };
    RelatedFindings: (RelatedFinding & {
      ProductArn: NonEmptyString;
      Id: NonEmptyString;
    })[];
    Note: Note & {
      Text: NonEmptyString;
      UpdatedBy: NonEmptyString;
      UpdatedAt: NonEmptyString;
    };
    Vulnerabilities: (Vulnerability & {
      Id: NonEmptyString;
      Vendor: VulnerabilityVendor & { Name: NonEmptyString };
    })[];
    PatchSummary: PatchSummary & { Id: NonEmptyString };
    FindingProviderFields: FindingProviderFields & {
      RelatedFindings: (RelatedFinding & {
        ProductArn: NonEmptyString;
        Id: NonEmptyString;
      })[];
    };
  })[];
  NextToken?: string;
}
export const GetFindingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Findings: S.optional(AwsSecurityFindingList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetFindingsResponse",
}) as any as S.Schema<GetFindingsResponse>;
export type GroupByField =
  | "activity_name"
  | "cloud.account.uid"
  | "cloud.provider"
  | "cloud.region"
  | "compliance.assessments.name"
  | "compliance.status"
  | "compliance.control"
  | "finding_info.title"
  | "finding_info.related_events.traits.category"
  | "finding_info.types"
  | "metadata.product.name"
  | "metadata.product.uid"
  | "resources.type"
  | "resources.uid"
  | "severity"
  | "status"
  | "vulnerabilities.fix_coverage"
  | "class_name"
  | "vulnerabilities.affected_packages.name"
  | "finding_info.analytic.name"
  | "compliance.standards"
  | "cloud.account.name"
  | "vendor_attributes.severity"
  | "metadata.product.vendor_name"
  | (string & {});
export const GroupByField = /*@__PURE__*/ S.String;

export interface GroupByRule {
  Filters?: OcsfFindingFilters;
  GroupByField?: GroupByField;
}
export const GroupByRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(OcsfFindingFilters),
    GroupByField: S.optional(GroupByField),
  }),
).annotate({ identifier: "GroupByRule" }) as any as S.Schema<GroupByRule>;
export type GroupByRules = GroupByRule[];
export const GroupByRules = /*@__PURE__*/ S.Array(GroupByRule);
export interface AwsOrganizationScope {
  OrganizationId?: string;
  OrganizationalUnitId?: string;
}
export const AwsOrganizationScope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.optional(S.String),
    OrganizationalUnitId: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsOrganizationScope",
}) as any as S.Schema<AwsOrganizationScope>;
export type AwsOrganizationScopeList = AwsOrganizationScope[];
export const AwsOrganizationScopeList =
  /*@__PURE__*/ S.Array(AwsOrganizationScope);
export interface FindingScopes {
  AwsOrganizations?: AwsOrganizationScope[];
}
export const FindingScopes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AwsOrganizations: S.optional(AwsOrganizationScopeList) }),
).annotate({ identifier: "FindingScopes" }) as any as S.Schema<FindingScopes>;
export type MaxStatisticResults = number;
export interface GetFindingStatisticsV2Request {
  GroupByRules?: GroupByRule[];
  Scopes?: FindingScopes;
  SortOrder?: SortOrder;
  MaxStatisticResults?: number;
}
export const GetFindingStatisticsV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupByRules: S.optional(GroupByRules),
    Scopes: S.optional(FindingScopes),
    SortOrder: S.optional(SortOrder),
    MaxStatisticResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/findingsv2/statistics" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFindingStatisticsV2Request",
}) as any as S.Schema<GetFindingStatisticsV2Request>;
export interface GroupByValue {
  FieldValue?: string;
  Count?: number;
}
export const GroupByValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FieldValue: S.optional(S.String), Count: S.optional(S.Number) }),
).annotate({ identifier: "GroupByValue" }) as any as S.Schema<GroupByValue>;
export type GroupByValues = GroupByValue[];
export const GroupByValues = /*@__PURE__*/ S.Array(GroupByValue);
export interface GroupByResult {
  GroupByField?: string;
  GroupByValues?: GroupByValue[];
}
export const GroupByResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupByField: S.optional(S.String),
    GroupByValues: S.optional(GroupByValues),
  }),
).annotate({ identifier: "GroupByResult" }) as any as S.Schema<GroupByResult>;
export type GroupByResults = GroupByResult[];
export const GroupByResults = /*@__PURE__*/ S.Array(GroupByResult);
export interface GetFindingStatisticsV2Response {
  GroupByResults?: GroupByResult[];
}
export const GetFindingStatisticsV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupByResults: S.optional(GroupByResults) }),
).annotate({
  identifier: "GetFindingStatisticsV2Response",
}) as any as S.Schema<GetFindingStatisticsV2Response>;
export type FindingsTrendsStringField =
  | "account_id"
  | "region"
  | "finding_types"
  | "finding_status"
  | "finding_cve_ids"
  | "finding_compliance_status"
  | "finding_control_id"
  | "finding_class_name"
  | "finding_provider"
  | "finding_activity_name"
  | (string & {});
export const FindingsTrendsStringField = /*@__PURE__*/ S.String;

export interface FindingsTrendsStringFilter {
  FieldName?: FindingsTrendsStringField;
  Filter?: StringFilter;
}
export const FindingsTrendsStringFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FieldName: S.optional(FindingsTrendsStringField),
    Filter: S.optional(StringFilter),
  }),
).annotate({
  identifier: "FindingsTrendsStringFilter",
}) as any as S.Schema<FindingsTrendsStringFilter>;
export type FindingsTrendsStringFilterList = FindingsTrendsStringFilter[];
export const FindingsTrendsStringFilterList = /*@__PURE__*/ S.Array(
  FindingsTrendsStringFilter,
);
export interface FindingsTrendsCompositeFilter {
  StringFilters?: FindingsTrendsStringFilter[];
  NestedCompositeFilters?: FindingsTrendsCompositeFilter[];
  Operator?: AllowedOperators;
}
export const FindingsTrendsCompositeFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StringFilters: S.optional(FindingsTrendsStringFilterList),
    NestedCompositeFilters: S.optional(
      S.suspend(() => FindingsTrendsCompositeFilterList).annotate({
        identifier: "FindingsTrendsCompositeFilterList",
      }),
    ),
    Operator: S.optional(AllowedOperators),
  }),
).annotate({
  identifier: "FindingsTrendsCompositeFilter",
}) as any as S.Schema<FindingsTrendsCompositeFilter>;
export type FindingsTrendsCompositeFilterList = FindingsTrendsCompositeFilter[];
export const FindingsTrendsCompositeFilterList = /*@__PURE__*/ S.Array(
  S.suspend(
    (): S.Schema<FindingsTrendsCompositeFilter> =>
      FindingsTrendsCompositeFilter,
  ).annotate({ identifier: "FindingsTrendsCompositeFilter" }),
) as any as S.Schema<FindingsTrendsCompositeFilterList>;
export interface FindingsTrendsFilters {
  CompositeFilters?: FindingsTrendsCompositeFilter[];
  CompositeOperator?: AllowedOperators;
}
export const FindingsTrendsFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CompositeFilters: S.optional(FindingsTrendsCompositeFilterList),
    CompositeOperator: S.optional(AllowedOperators),
  }),
).annotate({
  identifier: "FindingsTrendsFilters",
}) as any as S.Schema<FindingsTrendsFilters>;
export interface GetFindingsTrendsV2Request {
  Filters?: FindingsTrendsFilters;
  StartTime?: Date;
  EndTime?: Date;
  NextToken?: string;
  MaxResults?: number;
}
export const GetFindingsTrendsV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(FindingsTrendsFilters),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/findingsTrendsv2" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFindingsTrendsV2Request",
}) as any as S.Schema<GetFindingsTrendsV2Request>;
export type GranularityField = "Daily" | "Weekly" | "Monthly" | (string & {});
export const GranularityField = /*@__PURE__*/ S.String;

export type TrendsValueCount = number;
export interface SeverityTrendsCount {
  Unknown?: number;
  Informational?: number;
  Low?: number;
  Medium?: number;
  High?: number;
  Critical?: number;
  Fatal?: number;
  Other?: number;
}
export const SeverityTrendsCount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Unknown: S.optional(S.Number),
    Informational: S.optional(S.Number),
    Low: S.optional(S.Number),
    Medium: S.optional(S.Number),
    High: S.optional(S.Number),
    Critical: S.optional(S.Number),
    Fatal: S.optional(S.Number),
    Other: S.optional(S.Number),
  }),
).annotate({
  identifier: "SeverityTrendsCount",
}) as any as S.Schema<SeverityTrendsCount>;
export interface TrendsValues {
  SeverityTrends?: SeverityTrendsCount;
}
export const TrendsValues = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SeverityTrends: S.optional(SeverityTrendsCount) }),
).annotate({ identifier: "TrendsValues" }) as any as S.Schema<TrendsValues>;
export interface TrendsMetricsResult {
  Timestamp?: Date;
  TrendsValues?: TrendsValues;
}
export const TrendsMetricsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Timestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    TrendsValues: S.optional(TrendsValues),
  }),
).annotate({
  identifier: "TrendsMetricsResult",
}) as any as S.Schema<TrendsMetricsResult>;
export type TrendsMetrics = TrendsMetricsResult[];
export const TrendsMetrics = /*@__PURE__*/ S.Array(TrendsMetricsResult);
export interface GetFindingsTrendsV2Response {
  Granularity: GranularityField;
  TrendsMetrics: (TrendsMetricsResult & {
    Timestamp: Date;
    TrendsValues: TrendsValues & {
      SeverityTrends: SeverityTrendsCount & {
        Unknown: TrendsValueCount;
        Informational: TrendsValueCount;
        Low: TrendsValueCount;
        Medium: TrendsValueCount;
        High: TrendsValueCount;
        Critical: TrendsValueCount;
        Fatal: TrendsValueCount;
        Other: TrendsValueCount;
      };
    };
  })[];
  NextToken?: string;
}
export const GetFindingsTrendsV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Granularity: S.optional(GranularityField),
    TrendsMetrics: S.optional(TrendsMetrics),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetFindingsTrendsV2Response",
}) as any as S.Schema<GetFindingsTrendsV2Response>;
export interface GetFindingsV2Request {
  Filters?: OcsfFindingFilters;
  Scopes?: FindingScopes;
  SortCriteria?: SortCriterion[];
  NextToken?: string;
  MaxResults?: number;
}
export const GetFindingsV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(OcsfFindingFilters),
    Scopes: S.optional(FindingScopes),
    SortCriteria: S.optional(SortCriteria),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/findingsv2" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFindingsV2Request",
}) as any as S.Schema<GetFindingsV2Request>;
export type OcsfFinding = unknown;
export type OcsfFindingsList = any[];
export const OcsfFindingsList = /*@__PURE__*/ S.Array(S.Any);
export interface GetFindingsV2Response {
  Findings?: any[];
  NextToken?: string;
}
export const GetFindingsV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Findings: S.optional(OcsfFindingsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetFindingsV2Response",
}) as any as S.Schema<GetFindingsV2Response>;
export interface GetInsightResultsRequest {
  InsightArn: string;
}
export const GetInsightResultsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InsightArn: S.String.pipe(T.HttpLabel("InsightArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/insights/results/{InsightArn+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetInsightResultsRequest",
}) as any as S.Schema<GetInsightResultsRequest>;
export interface InsightResultValue {
  GroupByAttributeValue?: string;
  Count?: number;
}
export const InsightResultValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupByAttributeValue: S.optional(S.String),
    Count: S.optional(S.Number),
  }),
).annotate({
  identifier: "InsightResultValue",
}) as any as S.Schema<InsightResultValue>;
export type InsightResultValueList = InsightResultValue[];
export const InsightResultValueList = /*@__PURE__*/ S.Array(InsightResultValue);
export interface InsightResults {
  InsightArn?: string;
  GroupByAttribute?: string;
  ResultValues?: InsightResultValue[];
}
export const InsightResults = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InsightArn: S.optional(S.String),
    GroupByAttribute: S.optional(S.String),
    ResultValues: S.optional(InsightResultValueList),
  }),
).annotate({ identifier: "InsightResults" }) as any as S.Schema<InsightResults>;
export interface GetInsightResultsResponse {
  InsightResults: InsightResults & {
    InsightArn: NonEmptyString;
    GroupByAttribute: NonEmptyString;
    ResultValues: (InsightResultValue & {
      GroupByAttributeValue: NonEmptyString;
      Count: number;
    })[];
  };
}
export const GetInsightResultsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InsightResults: S.optional(InsightResults) }),
).annotate({
  identifier: "GetInsightResultsResponse",
}) as any as S.Schema<GetInsightResultsResponse>;
export interface GetInsightsRequest {
  InsightArns?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export const GetInsightsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InsightArns: S.optional(ArnList),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/insights/get" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetInsightsRequest",
}) as any as S.Schema<GetInsightsRequest>;
export interface Insight {
  InsightArn?: string;
  Name?: string;
  Filters?: AwsSecurityFindingFilters;
  GroupByAttribute?: string;
}
export const Insight = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InsightArn: S.optional(S.String),
    Name: S.optional(S.String),
    Filters: S.optional(AwsSecurityFindingFilters),
    GroupByAttribute: S.optional(S.String),
  }),
).annotate({ identifier: "Insight" }) as any as S.Schema<Insight>;
export type InsightList = Insight[];
export const InsightList = /*@__PURE__*/ S.Array(Insight);
export interface GetInsightsResponse {
  Insights: (Insight & {
    InsightArn: NonEmptyString;
    Name: NonEmptyString;
    Filters: AwsSecurityFindingFilters;
    GroupByAttribute: NonEmptyString;
  })[];
  NextToken?: string;
}
export const GetInsightsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Insights: S.optional(InsightList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetInsightsResponse",
}) as any as S.Schema<GetInsightsResponse>;
export interface GetInvitationsCountRequest {}
export const GetInvitationsCountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/invitations/count" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetInvitationsCountRequest",
}) as any as S.Schema<GetInvitationsCountRequest>;
export interface GetInvitationsCountResponse {
  InvitationsCount?: number;
}
export const GetInvitationsCountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InvitationsCount: S.optional(S.Number) }),
).annotate({
  identifier: "GetInvitationsCountResponse",
}) as any as S.Schema<GetInvitationsCountResponse>;
export interface GetMasterAccountRequest {}
export const GetMasterAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/master" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMasterAccountRequest",
}) as any as S.Schema<GetMasterAccountRequest>;
export interface GetMasterAccountResponse {
  Master?: Invitation;
}
export const GetMasterAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Master: S.optional(Invitation) }),
).annotate({
  identifier: "GetMasterAccountResponse",
}) as any as S.Schema<GetMasterAccountResponse>;
export interface GetMembersRequest {
  AccountIds?: string[];
}
export const GetMembersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountIds: S.optional(AccountIdList) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/members/get" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMembersRequest",
}) as any as S.Schema<GetMembersRequest>;
export interface Member {
  AccountId?: string;
  Email?: string;
  MasterId?: string;
  AdministratorId?: string;
  MemberStatus?: string;
  InvitedAt?: Date;
  UpdatedAt?: Date;
}
export const Member = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    Email: S.optional(S.String),
    MasterId: S.optional(S.String),
    AdministratorId: S.optional(S.String),
    MemberStatus: S.optional(S.String),
    InvitedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "Member" }) as any as S.Schema<Member>;
export type MemberList = Member[];
export const MemberList = /*@__PURE__*/ S.Array(Member);
export interface GetMembersResponse {
  Members?: Member[];
  UnprocessedAccounts?: Result[];
}
export const GetMembersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Members: S.optional(MemberList),
    UnprocessedAccounts: S.optional(ResultList),
  }),
).annotate({
  identifier: "GetMembersResponse",
}) as any as S.Schema<GetMembersResponse>;
export interface GetRecommendedPolicyV2Request {
  MetadataUid: string;
  NextToken?: string;
  MaxResults?: number;
}
export const GetRecommendedPolicyV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetadataUid: S.String.pipe(T.HttpLabel("MetadataUid")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/recommendedPolicyV2/{MetadataUid}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRecommendedPolicyV2Request",
}) as any as S.Schema<GetRecommendedPolicyV2Request>;
export type RecommendationType =
  | "UNUSED_PERMISSION_RECOMMENDATION"
  | (string & {});
export const RecommendationType = /*@__PURE__*/ S.String;

export interface UnusedPermissionsRecommendationStep {
  RecommendedAction?: string;
  ExistingPolicy?: string;
  ExistingPolicyId?: string;
  PolicyUpdatedAt?: Date;
  RecommendedPolicy?: string;
}
export const UnusedPermissionsRecommendationStep = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RecommendedAction: S.optional(S.String),
    ExistingPolicy: S.optional(S.String),
    ExistingPolicyId: S.optional(S.String),
    PolicyUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    RecommendedPolicy: S.optional(S.String),
  }),
).annotate({
  identifier: "UnusedPermissionsRecommendationStep",
}) as any as S.Schema<UnusedPermissionsRecommendationStep>;
export type RecommendationStep = {
  UnusedPermissions: UnusedPermissionsRecommendationStep;
};
export const RecommendationStep = /*@__PURE__*/ S.Union([
  S.Struct({ UnusedPermissions: UnusedPermissionsRecommendationStep }),
]);
export type RecommendationSteps = RecommendationStep[];
export const RecommendationSteps = /*@__PURE__*/ S.Array(RecommendationStep);
export interface RecommendationError {
  Code?: string;
  Message?: string;
}
export const RecommendationError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Code: S.optional(S.String), Message: S.optional(S.String) }),
).annotate({
  identifier: "RecommendationError",
}) as any as S.Schema<RecommendationError>;
export type RecommendationStatus =
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export const RecommendationStatus = /*@__PURE__*/ S.String;

export interface GetRecommendedPolicyV2Response {
  NextToken?: string;
  RecommendationType?: RecommendationType;
  RecommendationSteps?: RecommendationStep[];
  Error?: RecommendationError;
  Status?: RecommendationStatus;
  ResourceArn?: string;
}
export const GetRecommendedPolicyV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    RecommendationType: S.optional(RecommendationType),
    RecommendationSteps: S.optional(RecommendationSteps),
    Error: S.optional(RecommendationError),
    Status: S.optional(RecommendationStatus),
    ResourceArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetRecommendedPolicyV2Response",
}) as any as S.Schema<GetRecommendedPolicyV2Response>;
export type ResourceGroupByField =
  | "AccountId"
  | "Region"
  | "ResourceCategory"
  | "ResourceType"
  | "ResourceName"
  | "FindingsSummary.FindingType"
  | (string & {});
export const ResourceGroupByField = /*@__PURE__*/ S.String;

export type ResourcesStringField =
  | "ResourceGuid"
  | "ResourceId"
  | "AccountId"
  | "Region"
  | "ResourceCategory"
  | "ResourceType"
  | "ResourceName"
  | "FindingsSummary.FindingType"
  | "FindingsSummary.ProductName"
  | (string & {});
export const ResourcesStringField = /*@__PURE__*/ S.String;

export interface ResourcesStringFilter {
  FieldName?: ResourcesStringField;
  Filter?: StringFilter;
}
export const ResourcesStringFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FieldName: S.optional(ResourcesStringField),
    Filter: S.optional(StringFilter),
  }),
).annotate({
  identifier: "ResourcesStringFilter",
}) as any as S.Schema<ResourcesStringFilter>;
export type ResourcesStringFilterList = ResourcesStringFilter[];
export const ResourcesStringFilterList = /*@__PURE__*/ S.Array(
  ResourcesStringFilter,
);
export type ResourcesDateField =
  | "ResourceDetailCaptureTime"
  | "ResourceCreationTime"
  | (string & {});
export const ResourcesDateField = /*@__PURE__*/ S.String;

export interface ResourcesDateFilter {
  FieldName?: ResourcesDateField;
  Filter?: DateFilter;
}
export const ResourcesDateFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FieldName: S.optional(ResourcesDateField),
    Filter: S.optional(DateFilter),
  }),
).annotate({
  identifier: "ResourcesDateFilter",
}) as any as S.Schema<ResourcesDateFilter>;
export type ResourcesDateFilterList = ResourcesDateFilter[];
export const ResourcesDateFilterList =
  /*@__PURE__*/ S.Array(ResourcesDateFilter);
export type ResourcesNumberField =
  | "FindingsSummary.TotalFindings"
  | "FindingsSummary.Severities.Other"
  | "FindingsSummary.Severities.Fatal"
  | "FindingsSummary.Severities.Critical"
  | "FindingsSummary.Severities.High"
  | "FindingsSummary.Severities.Medium"
  | "FindingsSummary.Severities.Low"
  | "FindingsSummary.Severities.Informational"
  | "FindingsSummary.Severities.Unknown"
  | (string & {});
export const ResourcesNumberField = /*@__PURE__*/ S.String;

export interface ResourcesNumberFilter {
  FieldName?: ResourcesNumberField;
  Filter?: NumberFilter;
}
export const ResourcesNumberFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FieldName: S.optional(ResourcesNumberField),
    Filter: S.optional(NumberFilter),
  }),
).annotate({
  identifier: "ResourcesNumberFilter",
}) as any as S.Schema<ResourcesNumberFilter>;
export type ResourcesNumberFilterList = ResourcesNumberFilter[];
export const ResourcesNumberFilterList = /*@__PURE__*/ S.Array(
  ResourcesNumberFilter,
);
export type ResourcesMapField = "ResourceTags" | (string & {});
export const ResourcesMapField = /*@__PURE__*/ S.String;

export interface ResourcesMapFilter {
  FieldName?: ResourcesMapField;
  Filter?: MapFilter;
}
export const ResourcesMapFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FieldName: S.optional(ResourcesMapField),
    Filter: S.optional(MapFilter),
  }),
).annotate({
  identifier: "ResourcesMapFilter",
}) as any as S.Schema<ResourcesMapFilter>;
export type ResourcesMapFilterList = ResourcesMapFilter[];
export const ResourcesMapFilterList = /*@__PURE__*/ S.Array(ResourcesMapFilter);
export interface ResourcesCompositeFilter {
  StringFilters?: ResourcesStringFilter[];
  DateFilters?: ResourcesDateFilter[];
  NumberFilters?: ResourcesNumberFilter[];
  MapFilters?: ResourcesMapFilter[];
  NestedCompositeFilters?: ResourcesCompositeFilter[];
  Operator?: AllowedOperators;
}
export const ResourcesCompositeFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StringFilters: S.optional(ResourcesStringFilterList),
    DateFilters: S.optional(ResourcesDateFilterList),
    NumberFilters: S.optional(ResourcesNumberFilterList),
    MapFilters: S.optional(ResourcesMapFilterList),
    NestedCompositeFilters: S.optional(
      S.suspend(() => ResourcesCompositeFilterList).annotate({
        identifier: "ResourcesCompositeFilterList",
      }),
    ),
    Operator: S.optional(AllowedOperators),
  }),
).annotate({
  identifier: "ResourcesCompositeFilter",
}) as any as S.Schema<ResourcesCompositeFilter>;
export type ResourcesCompositeFilterList = ResourcesCompositeFilter[];
export const ResourcesCompositeFilterList = /*@__PURE__*/ S.Array(
  S.suspend(
    (): S.Schema<ResourcesCompositeFilter> => ResourcesCompositeFilter,
  ).annotate({ identifier: "ResourcesCompositeFilter" }),
) as any as S.Schema<ResourcesCompositeFilterList>;
export interface ResourcesFilters {
  CompositeFilters?: ResourcesCompositeFilter[];
  CompositeOperator?: AllowedOperators;
}
export const ResourcesFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CompositeFilters: S.optional(ResourcesCompositeFilterList),
    CompositeOperator: S.optional(AllowedOperators),
  }),
).annotate({
  identifier: "ResourcesFilters",
}) as any as S.Schema<ResourcesFilters>;
export interface ResourceGroupByRule {
  GroupByField?: ResourceGroupByField;
  Filters?: ResourcesFilters;
}
export const ResourceGroupByRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupByField: S.optional(ResourceGroupByField),
    Filters: S.optional(ResourcesFilters),
  }),
).annotate({
  identifier: "ResourceGroupByRule",
}) as any as S.Schema<ResourceGroupByRule>;
export type ResourceGroupByRules = ResourceGroupByRule[];
export const ResourceGroupByRules = /*@__PURE__*/ S.Array(ResourceGroupByRule);
export interface ResourceScopes {
  AwsOrganizations?: AwsOrganizationScope[];
}
export const ResourceScopes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AwsOrganizations: S.optional(AwsOrganizationScopeList) }),
).annotate({ identifier: "ResourceScopes" }) as any as S.Schema<ResourceScopes>;
export interface GetResourcesStatisticsV2Request {
  GroupByRules?: ResourceGroupByRule[];
  Scopes?: ResourceScopes;
  SortOrder?: SortOrder;
  MaxStatisticResults?: number;
}
export const GetResourcesStatisticsV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupByRules: S.optional(ResourceGroupByRules),
    Scopes: S.optional(ResourceScopes),
    SortOrder: S.optional(SortOrder),
    MaxStatisticResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/resourcesv2/statistics" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourcesStatisticsV2Request",
}) as any as S.Schema<GetResourcesStatisticsV2Request>;
export interface GetResourcesStatisticsV2Response {
  GroupByResults: GroupByResult[];
}
export const GetResourcesStatisticsV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupByResults: S.optional(GroupByResults) }),
).annotate({
  identifier: "GetResourcesStatisticsV2Response",
}) as any as S.Schema<GetResourcesStatisticsV2Response>;
export type ResourcesTrendsStringField =
  | "account_id"
  | "region"
  | "resource_type"
  | "resource_category"
  | (string & {});
export const ResourcesTrendsStringField = /*@__PURE__*/ S.String;

export interface ResourcesTrendsStringFilter {
  FieldName?: ResourcesTrendsStringField;
  Filter?: StringFilter;
}
export const ResourcesTrendsStringFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FieldName: S.optional(ResourcesTrendsStringField),
    Filter: S.optional(StringFilter),
  }),
).annotate({
  identifier: "ResourcesTrendsStringFilter",
}) as any as S.Schema<ResourcesTrendsStringFilter>;
export type ResourcesTrendsStringFilterList = ResourcesTrendsStringFilter[];
export const ResourcesTrendsStringFilterList = /*@__PURE__*/ S.Array(
  ResourcesTrendsStringFilter,
);
export interface ResourcesTrendsCompositeFilter {
  StringFilters?: ResourcesTrendsStringFilter[];
  NestedCompositeFilters?: ResourcesTrendsCompositeFilter[];
  Operator?: AllowedOperators;
}
export const ResourcesTrendsCompositeFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StringFilters: S.optional(ResourcesTrendsStringFilterList),
    NestedCompositeFilters: S.optional(
      S.suspend(() => ResourcesTrendsCompositeFilterList).annotate({
        identifier: "ResourcesTrendsCompositeFilterList",
      }),
    ),
    Operator: S.optional(AllowedOperators),
  }),
).annotate({
  identifier: "ResourcesTrendsCompositeFilter",
}) as any as S.Schema<ResourcesTrendsCompositeFilter>;
export type ResourcesTrendsCompositeFilterList =
  ResourcesTrendsCompositeFilter[];
export const ResourcesTrendsCompositeFilterList = /*@__PURE__*/ S.Array(
  S.suspend(
    (): S.Schema<ResourcesTrendsCompositeFilter> =>
      ResourcesTrendsCompositeFilter,
  ).annotate({ identifier: "ResourcesTrendsCompositeFilter" }),
) as any as S.Schema<ResourcesTrendsCompositeFilterList>;
export interface ResourcesTrendsFilters {
  CompositeFilters?: ResourcesTrendsCompositeFilter[];
  CompositeOperator?: AllowedOperators;
}
export const ResourcesTrendsFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CompositeFilters: S.optional(ResourcesTrendsCompositeFilterList),
    CompositeOperator: S.optional(AllowedOperators),
  }),
).annotate({
  identifier: "ResourcesTrendsFilters",
}) as any as S.Schema<ResourcesTrendsFilters>;
export interface GetResourcesTrendsV2Request {
  Filters?: ResourcesTrendsFilters;
  StartTime?: Date;
  EndTime?: Date;
  NextToken?: string;
  MaxResults?: number;
}
export const GetResourcesTrendsV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(ResourcesTrendsFilters),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/resourcesTrendsv2" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourcesTrendsV2Request",
}) as any as S.Schema<GetResourcesTrendsV2Request>;
export interface ResourcesCount {
  AllResources?: number;
}
export const ResourcesCount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AllResources: S.optional(S.Number) }),
).annotate({ identifier: "ResourcesCount" }) as any as S.Schema<ResourcesCount>;
export interface ResourcesTrendsValues {
  ResourcesCount?: ResourcesCount;
}
export const ResourcesTrendsValues = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourcesCount: S.optional(ResourcesCount) }),
).annotate({
  identifier: "ResourcesTrendsValues",
}) as any as S.Schema<ResourcesTrendsValues>;
export interface ResourcesTrendsMetricsResult {
  Timestamp?: Date;
  TrendsValues?: ResourcesTrendsValues;
}
export const ResourcesTrendsMetricsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Timestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    TrendsValues: S.optional(ResourcesTrendsValues),
  }),
).annotate({
  identifier: "ResourcesTrendsMetricsResult",
}) as any as S.Schema<ResourcesTrendsMetricsResult>;
export type ResourcesTrendsMetrics = ResourcesTrendsMetricsResult[];
export const ResourcesTrendsMetrics = /*@__PURE__*/ S.Array(
  ResourcesTrendsMetricsResult,
);
export interface GetResourcesTrendsV2Response {
  Granularity: GranularityField;
  TrendsMetrics: (ResourcesTrendsMetricsResult & {
    Timestamp: Date;
    TrendsValues: ResourcesTrendsValues & {
      ResourcesCount: ResourcesCount & { AllResources: TrendsValueCount };
    };
  })[];
  NextToken?: string;
}
export const GetResourcesTrendsV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Granularity: S.optional(GranularityField),
    TrendsMetrics: S.optional(ResourcesTrendsMetrics),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetResourcesTrendsV2Response",
}) as any as S.Schema<GetResourcesTrendsV2Response>;
export interface GetResourcesV2Request {
  Filters?: ResourcesFilters;
  Scopes?: ResourceScopes;
  SortCriteria?: SortCriterion[];
  NextToken?: string;
  MaxResults?: number;
}
export const GetResourcesV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(ResourcesFilters),
    Scopes: S.optional(ResourceScopes),
    SortCriteria: S.optional(SortCriteria),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/resourcesv2" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourcesV2Request",
}) as any as S.Schema<GetResourcesV2Request>;
export type ResourceCategory =
  | "Compute"
  | "Database"
  | "Storage"
  | "Code"
  | "AI/ML"
  | "Identity"
  | "Network"
  | "Other"
  | (string & {});
export const ResourceCategory = /*@__PURE__*/ S.String;

export interface ResourceSeverityBreakdown {
  Other?: number;
  Fatal?: number;
  Critical?: number;
  High?: number;
  Medium?: number;
  Low?: number;
  Informational?: number;
  Unknown?: number;
}
export const ResourceSeverityBreakdown = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Other: S.optional(S.Number),
    Fatal: S.optional(S.Number),
    Critical: S.optional(S.Number),
    High: S.optional(S.Number),
    Medium: S.optional(S.Number),
    Low: S.optional(S.Number),
    Informational: S.optional(S.Number),
    Unknown: S.optional(S.Number),
  }),
).annotate({
  identifier: "ResourceSeverityBreakdown",
}) as any as S.Schema<ResourceSeverityBreakdown>;
export interface ResourceFindingsSummary {
  FindingType?: string;
  ProductName?: string;
  TotalFindings?: number;
  Severities?: ResourceSeverityBreakdown;
}
export const ResourceFindingsSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FindingType: S.optional(S.String),
    ProductName: S.optional(S.String),
    TotalFindings: S.optional(S.Number),
    Severities: S.optional(ResourceSeverityBreakdown),
  }),
).annotate({
  identifier: "ResourceFindingsSummary",
}) as any as S.Schema<ResourceFindingsSummary>;
export type ResourceFindingsSummaryList = ResourceFindingsSummary[];
export const ResourceFindingsSummaryList = /*@__PURE__*/ S.Array(
  ResourceFindingsSummary,
);
export interface ResourceTag {
  Key?: string;
  Value?: string;
}
export const ResourceTag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "ResourceTag" }) as any as S.Schema<ResourceTag>;
export type ResourceTagList = ResourceTag[];
export const ResourceTagList = /*@__PURE__*/ S.Array(ResourceTag);
export type ResourceConfig = unknown;
export interface ResourceResult {
  ResourceGuid?: string;
  ResourceId?: string;
  AccountId?: string;
  Region?: string;
  ResourceCategory?: ResourceCategory;
  ResourceType?: string;
  ResourceName?: string;
  ResourceCreationTimeDt?: string;
  ResourceDetailCaptureTimeDt?: string;
  FindingsSummary?: ResourceFindingsSummary[];
  ResourceTags?: ResourceTag[];
  ResourceConfig?: any;
}
export const ResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceGuid: S.optional(S.String),
    ResourceId: S.optional(S.String),
    AccountId: S.optional(S.String),
    Region: S.optional(S.String),
    ResourceCategory: S.optional(ResourceCategory),
    ResourceType: S.optional(S.String),
    ResourceName: S.optional(S.String),
    ResourceCreationTimeDt: S.optional(S.String),
    ResourceDetailCaptureTimeDt: S.optional(S.String),
    FindingsSummary: S.optional(ResourceFindingsSummaryList),
    ResourceTags: S.optional(ResourceTagList),
    ResourceConfig: S.optional(S.Any),
  }),
).annotate({ identifier: "ResourceResult" }) as any as S.Schema<ResourceResult>;
export type Resources = ResourceResult[];
export const Resources = /*@__PURE__*/ S.Array(ResourceResult);
export interface GetResourcesV2Response {
  Resources: (ResourceResult & {
    ResourceId: NonEmptyString;
    AccountId: NonEmptyString;
    Region: NonEmptyString;
    ResourceDetailCaptureTimeDt: NonEmptyString;
    ResourceConfig: ResourceConfig;
    FindingsSummary: (ResourceFindingsSummary & {
      FindingType: NonEmptyString;
      ProductName: NonEmptyString;
      TotalFindings: number;
    })[];
    ResourceTags: (ResourceTag & {
      Key: NonEmptyString;
      Value: NonEmptyString;
    })[];
  })[];
  NextToken?: string;
}
export const GetResourcesV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Resources: S.optional(Resources),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetResourcesV2Response",
}) as any as S.Schema<GetResourcesV2Response>;
export interface GetSecurityControlDefinitionRequest {
  SecurityControlId?: string;
}
export const GetSecurityControlDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecurityControlId: S.optional(S.String).pipe(
      T.HttpQuery("SecurityControlId"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/securityControl/definition" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSecurityControlDefinitionRequest",
}) as any as S.Schema<GetSecurityControlDefinitionRequest>;
export type RegionAvailabilityStatus =
  | "AVAILABLE"
  | "UNAVAILABLE"
  | (string & {});
export const RegionAvailabilityStatus = /*@__PURE__*/ S.String;

export type SecurityControlProperty = "Parameters" | (string & {});
export const SecurityControlProperty = /*@__PURE__*/ S.String;

export type CustomizableProperties = SecurityControlProperty[];
export const CustomizableProperties = /*@__PURE__*/ S.Array(
  SecurityControlProperty,
);
export interface IntegerConfigurationOptions {
  DefaultValue?: number;
  Min?: number;
  Max?: number;
}
export const IntegerConfigurationOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.Number),
    Min: S.optional(S.Number),
    Max: S.optional(S.Number),
  }),
).annotate({
  identifier: "IntegerConfigurationOptions",
}) as any as S.Schema<IntegerConfigurationOptions>;
export interface IntegerListConfigurationOptions {
  DefaultValue?: number[];
  Min?: number;
  Max?: number;
  MaxItems?: number;
}
export const IntegerListConfigurationOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(IntegerList),
    Min: S.optional(S.Number),
    Max: S.optional(S.Number),
    MaxItems: S.optional(S.Number),
  }),
).annotate({
  identifier: "IntegerListConfigurationOptions",
}) as any as S.Schema<IntegerListConfigurationOptions>;
export interface DoubleConfigurationOptions {
  DefaultValue?: number;
  Min?: number;
  Max?: number;
}
export const DoubleConfigurationOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.Number),
    Min: S.optional(S.Number),
    Max: S.optional(S.Number),
  }),
).annotate({
  identifier: "DoubleConfigurationOptions",
}) as any as S.Schema<DoubleConfigurationOptions>;
export interface StringConfigurationOptions {
  DefaultValue?: string;
  Re2Expression?: string;
  ExpressionDescription?: string;
}
export const StringConfigurationOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.String),
    Re2Expression: S.optional(S.String),
    ExpressionDescription: S.optional(S.String),
  }),
).annotate({
  identifier: "StringConfigurationOptions",
}) as any as S.Schema<StringConfigurationOptions>;
export interface StringListConfigurationOptions {
  DefaultValue?: string[];
  Re2Expression?: string;
  MaxItems?: number;
  ExpressionDescription?: string;
}
export const StringListConfigurationOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(StringList),
    Re2Expression: S.optional(S.String),
    MaxItems: S.optional(S.Number),
    ExpressionDescription: S.optional(S.String),
  }),
).annotate({
  identifier: "StringListConfigurationOptions",
}) as any as S.Schema<StringListConfigurationOptions>;
export interface BooleanConfigurationOptions {
  DefaultValue?: boolean;
}
export const BooleanConfigurationOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DefaultValue: S.optional(S.Boolean) }),
).annotate({
  identifier: "BooleanConfigurationOptions",
}) as any as S.Schema<BooleanConfigurationOptions>;
export interface EnumConfigurationOptions {
  DefaultValue?: string;
  AllowedValues?: string[];
}
export const EnumConfigurationOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.String),
    AllowedValues: S.optional(StringList),
  }),
).annotate({
  identifier: "EnumConfigurationOptions",
}) as any as S.Schema<EnumConfigurationOptions>;
export interface EnumListConfigurationOptions {
  DefaultValue?: string[];
  MaxItems?: number;
  AllowedValues?: string[];
}
export const EnumListConfigurationOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(StringList),
    MaxItems: S.optional(S.Number),
    AllowedValues: S.optional(StringList),
  }),
).annotate({
  identifier: "EnumListConfigurationOptions",
}) as any as S.Schema<EnumListConfigurationOptions>;
export type ConfigurationOptions =
  | {
      Integer: IntegerConfigurationOptions;
      IntegerList?: never;
      Double?: never;
      String?: never;
      StringList?: never;
      Boolean?: never;
      Enum?: never;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList: IntegerListConfigurationOptions;
      Double?: never;
      String?: never;
      StringList?: never;
      Boolean?: never;
      Enum?: never;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList?: never;
      Double: DoubleConfigurationOptions;
      String?: never;
      StringList?: never;
      Boolean?: never;
      Enum?: never;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList?: never;
      Double?: never;
      String: StringConfigurationOptions;
      StringList?: never;
      Boolean?: never;
      Enum?: never;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList?: never;
      Double?: never;
      String?: never;
      StringList: StringListConfigurationOptions;
      Boolean?: never;
      Enum?: never;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList?: never;
      Double?: never;
      String?: never;
      StringList?: never;
      Boolean: BooleanConfigurationOptions;
      Enum?: never;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList?: never;
      Double?: never;
      String?: never;
      StringList?: never;
      Boolean?: never;
      Enum: EnumConfigurationOptions;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList?: never;
      Double?: never;
      String?: never;
      StringList?: never;
      Boolean?: never;
      Enum?: never;
      EnumList: EnumListConfigurationOptions;
    };
export const ConfigurationOptions = /*@__PURE__*/ S.Union([
  S.Struct({ Integer: IntegerConfigurationOptions }),
  S.Struct({ IntegerList: IntegerListConfigurationOptions }),
  S.Struct({ Double: DoubleConfigurationOptions }),
  S.Struct({ String: StringConfigurationOptions }),
  S.Struct({ StringList: StringListConfigurationOptions }),
  S.Struct({ Boolean: BooleanConfigurationOptions }),
  S.Struct({ Enum: EnumConfigurationOptions }),
  S.Struct({ EnumList: EnumListConfigurationOptions }),
]);
export interface ParameterDefinition {
  Description?: string;
  ConfigurationOptions?: ConfigurationOptions;
}
export const ParameterDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    ConfigurationOptions: S.optional(ConfigurationOptions),
  }),
).annotate({
  identifier: "ParameterDefinition",
}) as any as S.Schema<ParameterDefinition>;
export type ParameterDefinitions = {
  [key: string]: ParameterDefinition | undefined;
};
export const ParameterDefinitions = /*@__PURE__*/ S.Record(
  S.String,
  ParameterDefinition.pipe(S.optional),
);
export interface SecurityControlDefinition {
  SecurityControlId?: string;
  Title?: string;
  Description?: string;
  RemediationUrl?: string;
  SeverityRating?: SeverityRating;
  CurrentRegionAvailability?: RegionAvailabilityStatus;
  CustomizableProperties?: SecurityControlProperty[];
  ParameterDefinitions?: { [key: string]: ParameterDefinition | undefined };
}
export const SecurityControlDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecurityControlId: S.optional(S.String),
    Title: S.optional(S.String),
    Description: S.optional(S.String),
    RemediationUrl: S.optional(S.String),
    SeverityRating: S.optional(SeverityRating),
    CurrentRegionAvailability: S.optional(RegionAvailabilityStatus),
    CustomizableProperties: S.optional(CustomizableProperties),
    ParameterDefinitions: S.optional(ParameterDefinitions),
  }),
).annotate({
  identifier: "SecurityControlDefinition",
}) as any as S.Schema<SecurityControlDefinition>;
export interface GetSecurityControlDefinitionResponse {
  SecurityControlDefinition: SecurityControlDefinition & {
    SecurityControlId: NonEmptyString;
    Title: NonEmptyString;
    Description: NonEmptyString;
    RemediationUrl: NonEmptyString;
    SeverityRating: SeverityRating;
    CurrentRegionAvailability: RegionAvailabilityStatus;
    ParameterDefinitions: {
      [key: string]:
        | (ParameterDefinition & {
            Description: NonEmptyString;
            ConfigurationOptions: ConfigurationOptions;
          })
        | undefined;
    };
  };
}
export const GetSecurityControlDefinitionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SecurityControlDefinition: S.optional(SecurityControlDefinition),
    }),
).annotate({
  identifier: "GetSecurityControlDefinitionResponse",
}) as any as S.Schema<GetSecurityControlDefinitionResponse>;
export interface InviteMembersRequest {
  AccountIds?: string[];
}
export const InviteMembersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountIds: S.optional(AccountIdList) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/members/invite" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "InviteMembersRequest",
}) as any as S.Schema<InviteMembersRequest>;
export interface InviteMembersResponse {
  UnprocessedAccounts?: Result[];
}
export const InviteMembersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UnprocessedAccounts: S.optional(ResultList) }),
).annotate({
  identifier: "InviteMembersResponse",
}) as any as S.Schema<InviteMembersResponse>;
export interface ListAggregatorsV2Request {
  NextToken?: string;
  MaxResults?: number;
}
export const ListAggregatorsV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/aggregatorv2/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAggregatorsV2Request",
}) as any as S.Schema<ListAggregatorsV2Request>;
export interface AggregatorV2 {
  AggregatorV2Arn?: string;
}
export const AggregatorV2 = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AggregatorV2Arn: S.optional(S.String) }),
).annotate({ identifier: "AggregatorV2" }) as any as S.Schema<AggregatorV2>;
export type AggregatorV2List = AggregatorV2[];
export const AggregatorV2List = /*@__PURE__*/ S.Array(AggregatorV2);
export interface ListAggregatorsV2Response {
  AggregatorsV2?: AggregatorV2[];
  NextToken?: string;
}
export const ListAggregatorsV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AggregatorsV2: S.optional(AggregatorV2List),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAggregatorsV2Response",
}) as any as S.Schema<ListAggregatorsV2Response>;
export interface ListAutomationRulesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListAutomationRulesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/automationrules/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAutomationRulesRequest",
}) as any as S.Schema<ListAutomationRulesRequest>;
export interface AutomationRulesMetadata {
  RuleArn?: string;
  RuleStatus?: RuleStatus;
  RuleOrder?: number;
  RuleName?: string;
  Description?: string;
  IsTerminal?: boolean;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  CreatedBy?: string;
}
export const AutomationRulesMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleArn: S.optional(S.String),
    RuleStatus: S.optional(RuleStatus),
    RuleOrder: S.optional(S.Number),
    RuleName: S.optional(S.String),
    Description: S.optional(S.String),
    IsTerminal: S.optional(S.Boolean),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    CreatedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "AutomationRulesMetadata",
}) as any as S.Schema<AutomationRulesMetadata>;
export type AutomationRulesMetadataList = AutomationRulesMetadata[];
export const AutomationRulesMetadataList = /*@__PURE__*/ S.Array(
  AutomationRulesMetadata,
);
export interface ListAutomationRulesResponse {
  AutomationRulesMetadata?: AutomationRulesMetadata[];
  NextToken?: string;
}
export const ListAutomationRulesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutomationRulesMetadata: S.optional(AutomationRulesMetadataList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAutomationRulesResponse",
}) as any as S.Schema<ListAutomationRulesResponse>;
export interface ListAutomationRulesV2Request {
  NextToken?: string;
  MaxResults?: number;
}
export const ListAutomationRulesV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/automationrulesv2/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAutomationRulesV2Request",
}) as any as S.Schema<ListAutomationRulesV2Request>;
export interface AutomationRulesActionTypeObjectV2 {
  Type?: AutomationRulesActionTypeV2;
}
export const AutomationRulesActionTypeObjectV2 = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: S.optional(AutomationRulesActionTypeV2) }),
).annotate({
  identifier: "AutomationRulesActionTypeObjectV2",
}) as any as S.Schema<AutomationRulesActionTypeObjectV2>;
export type AutomationRulesActionTypeListV2 =
  AutomationRulesActionTypeObjectV2[];
export const AutomationRulesActionTypeListV2 = /*@__PURE__*/ S.Array(
  AutomationRulesActionTypeObjectV2,
);
export interface AutomationRulesMetadataV2 {
  RuleArn?: string;
  RuleId?: string;
  RuleOrder?: number;
  RuleName?: string;
  RuleStatus?: RuleStatusV2;
  Description?: string;
  Actions?: AutomationRulesActionTypeObjectV2[];
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export const AutomationRulesMetadataV2 = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleArn: S.optional(S.String),
    RuleId: S.optional(S.String),
    RuleOrder: S.optional(S.Number),
    RuleName: S.optional(S.String),
    RuleStatus: S.optional(RuleStatusV2),
    Description: S.optional(S.String),
    Actions: S.optional(AutomationRulesActionTypeListV2),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "AutomationRulesMetadataV2",
}) as any as S.Schema<AutomationRulesMetadataV2>;
export type AutomationRulesMetadataListV2 = AutomationRulesMetadataV2[];
export const AutomationRulesMetadataListV2 = /*@__PURE__*/ S.Array(
  AutomationRulesMetadataV2,
);
export interface ListAutomationRulesV2Response {
  Rules?: AutomationRulesMetadataV2[];
  NextToken?: string;
}
export const ListAutomationRulesV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Rules: S.optional(AutomationRulesMetadataListV2),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAutomationRulesV2Response",
}) as any as S.Schema<ListAutomationRulesV2Response>;
export interface ListConfigurationPoliciesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListConfigurationPoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/configurationPolicy/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConfigurationPoliciesRequest",
}) as any as S.Schema<ListConfigurationPoliciesRequest>;
export interface ConfigurationPolicySummary {
  Arn?: string;
  Id?: string;
  Name?: string;
  Description?: string;
  UpdatedAt?: Date;
  ServiceEnabled?: boolean;
}
export const ConfigurationPolicySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ServiceEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ConfigurationPolicySummary",
}) as any as S.Schema<ConfigurationPolicySummary>;
export type ConfigurationPolicySummaryList = ConfigurationPolicySummary[];
export const ConfigurationPolicySummaryList = /*@__PURE__*/ S.Array(
  ConfigurationPolicySummary,
);
export interface ListConfigurationPoliciesResponse {
  ConfigurationPolicySummaries?: ConfigurationPolicySummary[];
  NextToken?: string;
}
export const ListConfigurationPoliciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationPolicySummaries: S.optional(ConfigurationPolicySummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListConfigurationPoliciesResponse",
}) as any as S.Schema<ListConfigurationPoliciesResponse>;
export interface AssociationFilters {
  ConfigurationPolicyId?: string;
  AssociationType?: AssociationType;
  AssociationStatus?: ConfigurationPolicyAssociationStatus;
}
export const AssociationFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationPolicyId: S.optional(S.String),
    AssociationType: S.optional(AssociationType),
    AssociationStatus: S.optional(ConfigurationPolicyAssociationStatus),
  }),
).annotate({
  identifier: "AssociationFilters",
}) as any as S.Schema<AssociationFilters>;
export interface ListConfigurationPolicyAssociationsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: AssociationFilters;
}
export const ListConfigurationPolicyAssociationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
      Filters: S.optional(AssociationFilters),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/configurationPolicyAssociation/list" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListConfigurationPolicyAssociationsRequest",
  }) as any as S.Schema<ListConfigurationPolicyAssociationsRequest>;
export type ConfigurationPolicyAssociationSummaryList =
  ConfigurationPolicyAssociationSummary[];
export const ConfigurationPolicyAssociationSummaryList = /*@__PURE__*/ S.Array(
  ConfigurationPolicyAssociationSummary,
);
export interface ListConfigurationPolicyAssociationsResponse {
  ConfigurationPolicyAssociationSummaries?: ConfigurationPolicyAssociationSummary[];
  NextToken?: string;
}
export const ListConfigurationPolicyAssociationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationPolicyAssociationSummaries: S.optional(
        ConfigurationPolicyAssociationSummaryList,
      ),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListConfigurationPolicyAssociationsResponse",
  }) as any as S.Schema<ListConfigurationPolicyAssociationsResponse>;
export type ConnectorProviderName = "JIRA_CLOUD" | "SERVICENOW" | (string & {});
export const ConnectorProviderName = /*@__PURE__*/ S.String;

export interface ListConnectorsV2Request {
  NextToken?: string;
  MaxResults?: number;
  ProviderName?: ConnectorProviderName;
  ConnectorStatus?: ConnectorStatus;
}
export const ListConnectorsV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    ProviderName: S.optional(ConnectorProviderName).pipe(
      T.HttpQuery("ProviderName"),
    ),
    ConnectorStatus: S.optional(ConnectorStatus).pipe(
      T.HttpQuery("ConnectorStatus"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/connectorsv2" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConnectorsV2Request",
}) as any as S.Schema<ListConnectorsV2Request>;
export interface ProviderSummary {
  ProviderName?: ConnectorProviderName;
  ConnectorStatus?: ConnectorStatus;
}
export const ProviderSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProviderName: S.optional(ConnectorProviderName),
    ConnectorStatus: S.optional(ConnectorStatus),
  }),
).annotate({
  identifier: "ProviderSummary",
}) as any as S.Schema<ProviderSummary>;
export interface ConnectorSummary {
  ConnectorArn?: string;
  ConnectorId?: string;
  Name?: string;
  Description?: string;
  ProviderSummary?: ProviderSummary;
  CreatedAt?: Date;
}
export const ConnectorSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectorArn: S.optional(S.String),
    ConnectorId: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    ProviderSummary: S.optional(ProviderSummary),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ConnectorSummary",
}) as any as S.Schema<ConnectorSummary>;
export type ConnectorSummaryList = ConnectorSummary[];
export const ConnectorSummaryList = /*@__PURE__*/ S.Array(ConnectorSummary);
export interface ListConnectorsV2Response {
  NextToken?: string;
  Connectors: (ConnectorSummary & {
    ConnectorId: NonEmptyString;
    Name: NonEmptyString;
    ProviderSummary: ProviderSummary;
    CreatedAt: Date;
  })[];
}
export const ListConnectorsV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Connectors: S.optional(ConnectorSummaryList),
  }),
).annotate({
  identifier: "ListConnectorsV2Response",
}) as any as S.Schema<ListConnectorsV2Response>;
export interface ListEnabledProductsForImportRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListEnabledProductsForImportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/productSubscriptions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEnabledProductsForImportRequest",
}) as any as S.Schema<ListEnabledProductsForImportRequest>;
export type ProductSubscriptionArnList = string[];
export const ProductSubscriptionArnList = /*@__PURE__*/ S.Array(S.String);
export interface ListEnabledProductsForImportResponse {
  ProductSubscriptions?: string[];
  NextToken?: string;
}
export const ListEnabledProductsForImportResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProductSubscriptions: S.optional(ProductSubscriptionArnList),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListEnabledProductsForImportResponse",
}) as any as S.Schema<ListEnabledProductsForImportResponse>;
export interface ListFindingAggregatorsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListFindingAggregatorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/findingAggregator/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFindingAggregatorsRequest",
}) as any as S.Schema<ListFindingAggregatorsRequest>;
export interface FindingAggregator {
  FindingAggregatorArn?: string;
}
export const FindingAggregator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FindingAggregatorArn: S.optional(S.String) }),
).annotate({
  identifier: "FindingAggregator",
}) as any as S.Schema<FindingAggregator>;
export type FindingAggregatorList = FindingAggregator[];
export const FindingAggregatorList = /*@__PURE__*/ S.Array(FindingAggregator);
export interface ListFindingAggregatorsResponse {
  FindingAggregators?: FindingAggregator[];
  NextToken?: string;
}
export const ListFindingAggregatorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FindingAggregators: S.optional(FindingAggregatorList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFindingAggregatorsResponse",
}) as any as S.Schema<ListFindingAggregatorsResponse>;
export type CrossAccountMaxResults = number;
export interface ListInvitationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListInvitationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/invitations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListInvitationsRequest",
}) as any as S.Schema<ListInvitationsRequest>;
export type InvitationList = Invitation[];
export const InvitationList = /*@__PURE__*/ S.Array(Invitation);
export interface ListInvitationsResponse {
  Invitations?: Invitation[];
  NextToken?: string;
}
export const ListInvitationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Invitations: S.optional(InvitationList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListInvitationsResponse",
}) as any as S.Schema<ListInvitationsResponse>;
export interface ListMembersRequest {
  OnlyAssociated?: boolean;
  MaxResults?: number;
  NextToken?: string;
}
export const ListMembersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OnlyAssociated: S.optional(S.Boolean).pipe(T.HttpQuery("OnlyAssociated")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/members" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMembersRequest",
}) as any as S.Schema<ListMembersRequest>;
export interface ListMembersResponse {
  Members?: Member[];
  NextToken?: string;
}
export const ListMembersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Members: S.optional(MemberList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMembersResponse",
}) as any as S.Schema<ListMembersResponse>;
export type AdminsMaxResults = number;
export interface ListOrganizationAdminAccountsRequest {
  MaxResults?: number;
  NextToken?: string;
  Feature?: SecurityHubFeature;
}
export const ListOrganizationAdminAccountsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
      Feature: S.optional(SecurityHubFeature).pipe(T.HttpQuery("Feature")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/organization/admin" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListOrganizationAdminAccountsRequest",
}) as any as S.Schema<ListOrganizationAdminAccountsRequest>;
export type AdminStatus = "ENABLED" | "DISABLE_IN_PROGRESS" | (string & {});
export const AdminStatus = /*@__PURE__*/ S.String;

export interface AdminAccount {
  AccountId?: string;
  Status?: AdminStatus;
}
export const AdminAccount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    Status: S.optional(AdminStatus),
  }),
).annotate({ identifier: "AdminAccount" }) as any as S.Schema<AdminAccount>;
export type AdminAccounts = AdminAccount[];
export const AdminAccounts = /*@__PURE__*/ S.Array(AdminAccount);
export interface ListOrganizationAdminAccountsResponse {
  AdminAccounts?: AdminAccount[];
  NextToken?: string;
  Feature?: SecurityHubFeature;
}
export const ListOrganizationAdminAccountsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AdminAccounts: S.optional(AdminAccounts),
      NextToken: S.optional(S.String),
      Feature: S.optional(SecurityHubFeature),
    }),
).annotate({
  identifier: "ListOrganizationAdminAccountsResponse",
}) as any as S.Schema<ListOrganizationAdminAccountsResponse>;
export interface ListSecurityControlDefinitionsRequest {
  StandardsArn?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListSecurityControlDefinitionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StandardsArn: S.optional(S.String).pipe(T.HttpQuery("StandardsArn")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/securityControls/definitions" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListSecurityControlDefinitionsRequest",
}) as any as S.Schema<ListSecurityControlDefinitionsRequest>;
export type SecurityControlDefinitions = SecurityControlDefinition[];
export const SecurityControlDefinitions = /*@__PURE__*/ S.Array(
  SecurityControlDefinition,
);
export interface ListSecurityControlDefinitionsResponse {
  SecurityControlDefinitions: (SecurityControlDefinition & {
    SecurityControlId: NonEmptyString;
    Title: NonEmptyString;
    Description: NonEmptyString;
    RemediationUrl: NonEmptyString;
    SeverityRating: SeverityRating;
    CurrentRegionAvailability: RegionAvailabilityStatus;
    ParameterDefinitions: {
      [key: string]:
        | (ParameterDefinition & {
            Description: NonEmptyString;
            ConfigurationOptions: ConfigurationOptions;
          })
        | undefined;
    };
  })[];
  NextToken?: string;
}
export const ListSecurityControlDefinitionsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SecurityControlDefinitions: S.optional(SecurityControlDefinitions),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListSecurityControlDefinitionsResponse",
}) as any as S.Schema<ListSecurityControlDefinitionsResponse>;
export interface ListStandardsControlAssociationsRequest {
  SecurityControlId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListStandardsControlAssociationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SecurityControlId: S.optional(S.String).pipe(
        T.HttpQuery("SecurityControlId"),
      ),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/associations" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListStandardsControlAssociationsRequest",
}) as any as S.Schema<ListStandardsControlAssociationsRequest>;
export interface StandardsControlAssociationSummary {
  StandardsArn?: string;
  SecurityControlId?: string;
  SecurityControlArn?: string;
  AssociationStatus?: AssociationStatus;
  RelatedRequirements?: string[];
  UpdatedAt?: Date;
  UpdatedReason?: string;
  StandardsControlTitle?: string;
  StandardsControlDescription?: string;
}
export const StandardsControlAssociationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StandardsArn: S.optional(S.String),
    SecurityControlId: S.optional(S.String),
    SecurityControlArn: S.optional(S.String),
    AssociationStatus: S.optional(AssociationStatus),
    RelatedRequirements: S.optional(RelatedRequirementsList),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedReason: S.optional(S.String),
    StandardsControlTitle: S.optional(S.String),
    StandardsControlDescription: S.optional(S.String),
  }),
).annotate({
  identifier: "StandardsControlAssociationSummary",
}) as any as S.Schema<StandardsControlAssociationSummary>;
export type StandardsControlAssociationSummaries =
  StandardsControlAssociationSummary[];
export const StandardsControlAssociationSummaries = /*@__PURE__*/ S.Array(
  StandardsControlAssociationSummary,
);
export interface ListStandardsControlAssociationsResponse {
  StandardsControlAssociationSummaries: (StandardsControlAssociationSummary & {
    StandardsArn: NonEmptyString;
    SecurityControlId: NonEmptyString;
    SecurityControlArn: NonEmptyString;
    AssociationStatus: AssociationStatus;
  })[];
  NextToken?: string;
}
export const ListStandardsControlAssociationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StandardsControlAssociationSummaries: S.optional(
        StandardsControlAssociationSummaries,
      ),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListStandardsControlAssociationsResponse",
}) as any as S.Schema<ListStandardsControlAssociationsResponse>;
export type ResourceArn = string;
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
  S.Struct({ Tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface RegisterConnectorV2Request {
  AuthCode?: string;
  AuthState?: string;
}
export const RegisterConnectorV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthCode: S.optional(S.String),
    AuthState: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/connectorsv2/register" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterConnectorV2Request",
}) as any as S.Schema<RegisterConnectorV2Request>;
export interface RegisterConnectorV2Response {
  ConnectorArn?: string;
  ConnectorId: string;
}
export const RegisterConnectorV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectorArn: S.optional(S.String),
    ConnectorId: S.optional(S.String),
  }),
).annotate({
  identifier: "RegisterConnectorV2Response",
}) as any as S.Schema<RegisterConnectorV2Response>;
export interface StartConfigurationPolicyAssociationRequest {
  ConfigurationPolicyIdentifier?: string;
  Target?: Target;
}
export const StartConfigurationPolicyAssociationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationPolicyIdentifier: S.optional(S.String),
      Target: S.optional(Target),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/configurationPolicyAssociation/associate",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "StartConfigurationPolicyAssociationRequest",
  }) as any as S.Schema<StartConfigurationPolicyAssociationRequest>;
export interface StartConfigurationPolicyAssociationResponse {
  ConfigurationPolicyId?: string;
  TargetId?: string;
  TargetType?: TargetType;
  AssociationType?: AssociationType;
  UpdatedAt?: Date;
  AssociationStatus?: ConfigurationPolicyAssociationStatus;
  AssociationStatusMessage?: string;
}
export const StartConfigurationPolicyAssociationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationPolicyId: S.optional(S.String),
      TargetId: S.optional(S.String),
      TargetType: S.optional(TargetType),
      AssociationType: S.optional(AssociationType),
      UpdatedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      AssociationStatus: S.optional(ConfigurationPolicyAssociationStatus),
      AssociationStatusMessage: S.optional(S.String),
    }),
  ).annotate({
    identifier: "StartConfigurationPolicyAssociationResponse",
  }) as any as S.Schema<StartConfigurationPolicyAssociationResponse>;
export interface StartConfigurationPolicyDisassociationRequest {
  Target?: Target;
  ConfigurationPolicyIdentifier?: string;
}
export const StartConfigurationPolicyDisassociationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Target: S.optional(Target),
      ConfigurationPolicyIdentifier: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/configurationPolicyAssociation/disassociate",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "StartConfigurationPolicyDisassociationRequest",
  }) as any as S.Schema<StartConfigurationPolicyDisassociationRequest>;
export interface StartConfigurationPolicyDisassociationResponse {}
export const StartConfigurationPolicyDisassociationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "StartConfigurationPolicyDisassociationResponse",
  }) as any as S.Schema<StartConfigurationPolicyDisassociationResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: S.optional(TagMap),
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
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: S.optional(TagKeyList).pipe(T.HttpQuery("tagKeys")),
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
export interface UpdateActionTargetRequest {
  ActionTargetArn: string;
  Name?: string;
  Description?: string;
}
export const UpdateActionTargetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionTargetArn: S.String.pipe(T.HttpLabel("ActionTargetArn")),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/actionTargets/{ActionTargetArn+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateActionTargetRequest",
}) as any as S.Schema<UpdateActionTargetRequest>;
export interface UpdateActionTargetResponse {}
export const UpdateActionTargetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateActionTargetResponse",
}) as any as S.Schema<UpdateActionTargetResponse>;
export interface UpdateAggregatorV2Request {
  AggregatorV2Arn: string;
  RegionLinkingMode?: string;
  LinkedRegions?: string[];
}
export const UpdateAggregatorV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AggregatorV2Arn: S.String.pipe(T.HttpLabel("AggregatorV2Arn")),
    RegionLinkingMode: S.optional(S.String),
    LinkedRegions: S.optional(StringList),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/aggregatorv2/update/{AggregatorV2Arn+}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAggregatorV2Request",
}) as any as S.Schema<UpdateAggregatorV2Request>;
export interface UpdateAggregatorV2Response {
  AggregatorV2Arn?: string;
  AggregationRegion?: string;
  RegionLinkingMode?: string;
  LinkedRegions?: string[];
}
export const UpdateAggregatorV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AggregatorV2Arn: S.optional(S.String),
    AggregationRegion: S.optional(S.String),
    RegionLinkingMode: S.optional(S.String),
    LinkedRegions: S.optional(StringList),
  }),
).annotate({
  identifier: "UpdateAggregatorV2Response",
}) as any as S.Schema<UpdateAggregatorV2Response>;
export interface UpdateAutomationRuleV2Request {
  Identifier: string;
  RuleStatus?: RuleStatusV2;
  RuleOrder?: number;
  Description?: string;
  RuleName?: string;
  Criteria?: Criteria;
  Actions?: AutomationRulesActionV2[];
}
export const UpdateAutomationRuleV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    RuleStatus: S.optional(RuleStatusV2),
    RuleOrder: S.optional(S.Number),
    Description: S.optional(S.String),
    RuleName: S.optional(S.String),
    Criteria: S.optional(Criteria),
    Actions: S.optional(AutomationRulesActionListV2),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/automationrulesv2/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAutomationRuleV2Request",
}) as any as S.Schema<UpdateAutomationRuleV2Request>;
export interface UpdateAutomationRuleV2Response {}
export const UpdateAutomationRuleV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateAutomationRuleV2Response",
}) as any as S.Schema<UpdateAutomationRuleV2Response>;
export interface UpdateConfigurationPolicyRequest {
  Identifier: string;
  Name?: string;
  Description?: string;
  UpdatedReason?: string;
  ConfigurationPolicy?: Policy;
}
export const UpdateConfigurationPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    UpdatedReason: S.optional(S.String),
    ConfigurationPolicy: S.optional(Policy),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/configurationPolicy/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateConfigurationPolicyRequest",
}) as any as S.Schema<UpdateConfigurationPolicyRequest>;
export interface UpdateConfigurationPolicyResponse {
  Arn?: string;
  Id?: string;
  Name?: string;
  Description?: string;
  UpdatedAt?: Date;
  CreatedAt?: Date;
  ConfigurationPolicy?: Policy;
}
export const UpdateConfigurationPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ConfigurationPolicy: S.optional(Policy),
  }),
).annotate({
  identifier: "UpdateConfigurationPolicyResponse",
}) as any as S.Schema<UpdateConfigurationPolicyResponse>;
export interface JiraCloudUpdateConfiguration {
  ProjectKey?: string;
}
export const JiraCloudUpdateConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProjectKey: S.optional(S.String) }),
).annotate({
  identifier: "JiraCloudUpdateConfiguration",
}) as any as S.Schema<JiraCloudUpdateConfiguration>;
export interface ServiceNowUpdateConfiguration {
  SecretArn?: string;
}
export const ServiceNowUpdateConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SecretArn: S.optional(S.String) }),
).annotate({
  identifier: "ServiceNowUpdateConfiguration",
}) as any as S.Schema<ServiceNowUpdateConfiguration>;
export type ProviderUpdateConfiguration =
  | { JiraCloud: JiraCloudUpdateConfiguration; ServiceNow?: never }
  | { JiraCloud?: never; ServiceNow: ServiceNowUpdateConfiguration };
export const ProviderUpdateConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ JiraCloud: JiraCloudUpdateConfiguration }),
  S.Struct({ ServiceNow: ServiceNowUpdateConfiguration }),
]);
export interface UpdateConnectorV2Request {
  ConnectorId: string;
  Description?: string;
  Provider?: ProviderUpdateConfiguration;
}
export const UpdateConnectorV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectorId: S.String.pipe(T.HttpLabel("ConnectorId")),
    Description: S.optional(S.String),
    Provider: S.optional(ProviderUpdateConfiguration),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/connectorsv2/{ConnectorId+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateConnectorV2Request",
}) as any as S.Schema<UpdateConnectorV2Request>;
export interface UpdateConnectorV2Response {}
export const UpdateConnectorV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateConnectorV2Response",
}) as any as S.Schema<UpdateConnectorV2Response>;
export interface UpdateFindingAggregatorRequest {
  FindingAggregatorArn?: string;
  RegionLinkingMode?: string;
  Regions?: string[];
}
export const UpdateFindingAggregatorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FindingAggregatorArn: S.optional(S.String),
    RegionLinkingMode: S.optional(S.String),
    Regions: S.optional(StringList),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/findingAggregator/update" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFindingAggregatorRequest",
}) as any as S.Schema<UpdateFindingAggregatorRequest>;
export interface UpdateFindingAggregatorResponse {
  FindingAggregatorArn?: string;
  FindingAggregationRegion?: string;
  RegionLinkingMode?: string;
  Regions?: string[];
}
export const UpdateFindingAggregatorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FindingAggregatorArn: S.optional(S.String),
    FindingAggregationRegion: S.optional(S.String),
    RegionLinkingMode: S.optional(S.String),
    Regions: S.optional(StringList),
  }),
).annotate({
  identifier: "UpdateFindingAggregatorResponse",
}) as any as S.Schema<UpdateFindingAggregatorResponse>;
export interface UpdateFindingsRequest {
  Filters?: AwsSecurityFindingFilters;
  Note?: NoteUpdate;
  RecordState?: RecordState;
}
export const UpdateFindingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(AwsSecurityFindingFilters),
    Note: S.optional(NoteUpdate),
    RecordState: S.optional(RecordState),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/findings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFindingsRequest",
}) as any as S.Schema<UpdateFindingsRequest>;
export interface UpdateFindingsResponse {}
export const UpdateFindingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateFindingsResponse",
}) as any as S.Schema<UpdateFindingsResponse>;
export interface UpdateInsightRequest {
  InsightArn: string;
  Name?: string;
  Filters?: AwsSecurityFindingFilters;
  GroupByAttribute?: string;
}
export const UpdateInsightRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InsightArn: S.String.pipe(T.HttpLabel("InsightArn")),
    Name: S.optional(S.String),
    Filters: S.optional(AwsSecurityFindingFilters),
    GroupByAttribute: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/insights/{InsightArn+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateInsightRequest",
}) as any as S.Schema<UpdateInsightRequest>;
export interface UpdateInsightResponse {}
export const UpdateInsightResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateInsightResponse",
}) as any as S.Schema<UpdateInsightResponse>;
export interface UpdateOrganizationConfigurationRequest {
  AutoEnable?: boolean;
  AutoEnableStandards?: AutoEnableStandards;
  OrganizationConfiguration?: OrganizationConfiguration;
}
export const UpdateOrganizationConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AutoEnable: S.optional(S.Boolean),
      AutoEnableStandards: S.optional(AutoEnableStandards),
      OrganizationConfiguration: S.optional(OrganizationConfiguration),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/organization/configuration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateOrganizationConfigurationRequest",
}) as any as S.Schema<UpdateOrganizationConfigurationRequest>;
export interface UpdateOrganizationConfigurationResponse {}
export const UpdateOrganizationConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateOrganizationConfigurationResponse",
}) as any as S.Schema<UpdateOrganizationConfigurationResponse>;
export interface UpdateSecurityControlRequest {
  SecurityControlId?: string;
  Parameters?: { [key: string]: ParameterConfiguration | undefined };
  LastUpdateReason?: string;
}
export const UpdateSecurityControlRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecurityControlId: S.optional(S.String),
    Parameters: S.optional(Parameters),
    LastUpdateReason: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/securityControl/update" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSecurityControlRequest",
}) as any as S.Schema<UpdateSecurityControlRequest>;
export interface UpdateSecurityControlResponse {}
export const UpdateSecurityControlResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateSecurityControlResponse",
}) as any as S.Schema<UpdateSecurityControlResponse>;
export interface UpdateSecurityHubConfigurationRequest {
  AutoEnableControls?: boolean;
  ControlFindingGenerator?: ControlFindingGenerator;
}
export const UpdateSecurityHubConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AutoEnableControls: S.optional(S.Boolean),
      ControlFindingGenerator: S.optional(ControlFindingGenerator),
    }).pipe(
      T.all(
        T.Http({ method: "PATCH", uri: "/accounts" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateSecurityHubConfigurationRequest",
}) as any as S.Schema<UpdateSecurityHubConfigurationRequest>;
export interface UpdateSecurityHubConfigurationResponse {}
export const UpdateSecurityHubConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateSecurityHubConfigurationResponse",
}) as any as S.Schema<UpdateSecurityHubConfigurationResponse>;
export interface UpdateStandardsControlRequest {
  StandardsControlArn: string;
  ControlStatus?: ControlStatus;
  DisabledReason?: string;
}
export const UpdateStandardsControlRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StandardsControlArn: S.String.pipe(T.HttpLabel("StandardsControlArn")),
    ControlStatus: S.optional(ControlStatus),
    DisabledReason: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/standards/control/{StandardsControlArn+}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateStandardsControlRequest",
}) as any as S.Schema<UpdateStandardsControlRequest>;
export interface UpdateStandardsControlResponse {}
export const UpdateStandardsControlResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateStandardsControlResponse",
}) as any as S.Schema<UpdateStandardsControlResponse>;
export type AcceptAdministratorInvitationError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * We recommend using Organizations instead of Security Hub CSPM invitations to manage your member accounts.
 * For information, see Managing Security Hub CSPM administrator and member accounts with Organizations
 * in the *Security Hub CSPM User Guide*.
 *
 * Accepts the invitation to be a member account and be monitored by the Security Hub CSPM administrator
 * account that the invitation was sent from.
 *
 * This operation is only used by member accounts that are not added through
 * Organizations.
 *
 * When the member account accepts the invitation, permission is granted to the administrator
 * account to view findings generated in the member account.
 */
export const acceptAdministratorInvitation: API.OperationMethod<
  AcceptAdministratorInvitationRequest,
  AcceptAdministratorInvitationResponse,
  AcceptAdministratorInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptAdministratorInvitationRequest,
  output: AcceptAdministratorInvitationResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptAdministratorInvitation",
}));

export type AcceptInvitationError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This method is deprecated. Instead, use `AcceptAdministratorInvitation`.
 *
 * The Security Hub CSPM console continues to use `AcceptInvitation`. It will eventually change to use `AcceptAdministratorInvitation`. Any IAM policies that specifically control access to this function must continue to use `AcceptInvitation`. You should also add `AcceptAdministratorInvitation` to your policies to ensure that the correct permissions are in place after the console begins to use `AcceptAdministratorInvitation`.
 *
 * Accepts the invitation to be a member account and be monitored by the Security Hub CSPM administrator
 * account that the invitation was sent from.
 *
 * This operation is only used by member accounts that are not added through
 * Organizations.
 *
 * When the member account accepts the invitation, permission is granted to the administrator
 * account to view findings generated in the member account.
 */
export const acceptInvitation: API.OperationMethod<
  AcceptInvitationRequest,
  AcceptInvitationResponse,
  AcceptInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptInvitationRequest,
  output: AcceptInvitationResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptInvitation",
}));

export type BatchDeleteAutomationRulesError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes one or more automation rules.
 */
export const batchDeleteAutomationRules: API.OperationMethod<
  BatchDeleteAutomationRulesRequest,
  BatchDeleteAutomationRulesResponse,
  BatchDeleteAutomationRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteAutomationRulesRequest,
  output: BatchDeleteAutomationRulesResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteAutomationRules",
}));

export type BatchDisableStandardsError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Disables the standards specified by the provided
 * `StandardsSubscriptionArns`.
 *
 * For more information, see Security Standards section of the Security Hub CSPM User
 * Guide.
 */
export const batchDisableStandards: API.OperationMethod<
  BatchDisableStandardsRequest,
  BatchDisableStandardsResponse,
  BatchDisableStandardsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDisableStandardsRequest,
  output: BatchDisableStandardsResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDisableStandards",
}));

export type BatchEnableStandardsError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Enables the standards specified by the provided `StandardsArn`. To obtain the
 * ARN for a standard, use the `DescribeStandards`
 * operation.
 *
 * For more information, see the Security Standards
 * section of the *Security Hub CSPM User Guide*.
 */
export const batchEnableStandards: API.OperationMethod<
  BatchEnableStandardsRequest,
  BatchEnableStandardsResponse,
  BatchEnableStandardsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchEnableStandardsRequest,
  output: BatchEnableStandardsResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchEnableStandards",
}));

export type BatchGetAutomationRulesError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list of details for automation rules based on rule Amazon Resource Names
 * (ARNs).
 */
export const batchGetAutomationRules: API.OperationMethod<
  BatchGetAutomationRulesRequest,
  BatchGetAutomationRulesResponse,
  BatchGetAutomationRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetAutomationRulesRequest,
  output: BatchGetAutomationRulesResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetAutomationRules",
}));

export type BatchGetConfigurationPolicyAssociationsError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns associations between an Security Hub CSPM configuration and a batch of target accounts, organizational units, or the root.
 * Only the Security Hub CSPM delegated administrator can invoke this operation from the home Region. A configuration
 * can refer to a configuration policy or to a self-managed configuration.
 */
export const batchGetConfigurationPolicyAssociations: API.OperationMethod<
  BatchGetConfigurationPolicyAssociationsRequest,
  BatchGetConfigurationPolicyAssociationsResponse,
  BatchGetConfigurationPolicyAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetConfigurationPolicyAssociationsRequest,
  output: BatchGetConfigurationPolicyAssociationsResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetConfigurationPolicyAssociations",
}));

export type BatchGetSecurityControlsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Provides details about a batch of security controls for the current Amazon Web Services account and Amazon Web Services Region.
 */
export const batchGetSecurityControls: API.OperationMethod<
  BatchGetSecurityControlsRequest,
  BatchGetSecurityControlsResponse,
  BatchGetSecurityControlsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetSecurityControlsRequest,
  output: BatchGetSecurityControlsResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetSecurityControls",
}));

export type BatchGetStandardsControlAssociationsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * For a batch of security controls and standards, identifies whether each control is currently enabled or disabled in a standard.
 *
 * Calls to this operation return a `RESOURCE_NOT_FOUND_EXCEPTION` error when the standard subscription for the association has a `NOT_READY_FOR_UPDATES` value for `StandardsControlsUpdatable`.
 */
export const batchGetStandardsControlAssociations: API.OperationMethod<
  BatchGetStandardsControlAssociationsRequest,
  BatchGetStandardsControlAssociationsResponse,
  BatchGetStandardsControlAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetStandardsControlAssociationsRequest,
  output: BatchGetStandardsControlAssociationsResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetStandardsControlAssociations",
}));

export type BatchImportFindingsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Imports security findings generated by a finding provider into Security Hub CSPM.
 * This action is requested by the finding provider to import its findings into
 * Security Hub CSPM.
 *
 * `BatchImportFindings` must be called by one of the following:
 *
 * - The Amazon Web Services account that is associated with a finding if you are using
 * the default product ARN
 * or are a partner sending findings from within a customer's Amazon Web Services account.
 * In these cases, the identifier of the account that you are calling `BatchImportFindings`
 * from needs to be the same as the `AwsAccountId` attribute for the finding.
 *
 * - An Amazon Web Services account that Security Hub CSPM has allow-listed for an official partner
 * integration. In this case, you can call `BatchImportFindings` from the allow-listed
 * account and send findings from different customer accounts in the same batch.
 *
 * The maximum allowed size for a finding is 240 Kb. An error is returned for any finding
 * larger than 240 Kb.
 *
 * After a finding is created, `BatchImportFindings` cannot be used to update
 * the following finding fields and objects, which Security Hub CSPM customers use to manage their
 * investigation workflow.
 *
 * - `Note`
 *
 * - `UserDefinedFields`
 *
 * - `VerificationState`
 *
 * - `Workflow`
 *
 * Finding providers also should not use `BatchImportFindings` to update the following attributes.
 *
 * - `Confidence`
 *
 * - `Criticality`
 *
 * - `RelatedFindings`
 *
 * - `Severity`
 *
 * - `Types`
 *
 * Instead, finding providers use `FindingProviderFields` to provide values for these attributes.
 */
export const batchImportFindings: API.OperationMethod<
  BatchImportFindingsRequest,
  BatchImportFindingsResponse,
  BatchImportFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchImportFindingsRequest,
  output: BatchImportFindingsResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchImportFindings",
}));

export type BatchUpdateAutomationRulesError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates one or more automation rules based on rule Amazon Resource Names (ARNs)
 * and input parameters.
 */
export const batchUpdateAutomationRules: API.OperationMethod<
  BatchUpdateAutomationRulesRequest,
  BatchUpdateAutomationRulesResponse,
  BatchUpdateAutomationRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchUpdateAutomationRulesRequest,
  output: BatchUpdateAutomationRulesResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateAutomationRules",
}));

export type BatchUpdateFindingsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Used by Security Hub CSPM customers to update information about their investigation into one or more findings.
 * Requested by administrator accounts or member accounts.
 * Administrator accounts can update findings for their account and their member accounts.
 * A member account can update findings only for their own account.
 * Administrator and member accounts can use this operation to update the following fields and objects for one or more findings:
 *
 * - `Confidence`
 *
 * - `Criticality`
 *
 * - `Note`
 *
 * - `RelatedFindings`
 *
 * - `Severity`
 *
 * - `Types`
 *
 * - `UserDefinedFields`
 *
 * - `VerificationState`
 *
 * - `Workflow`
 *
 * If you use this operation to update a finding, your updates don’t affect the value for the `UpdatedAt` field of the finding.
 * Also note that it can take several minutes for Security Hub CSPM to process your request and update each finding specified in the request.
 *
 * You can configure IAM policies to restrict access to fields and field values.
 * For example, you might not want member accounts to be able to suppress findings or change the finding severity.
 * For more information see Configuring access to BatchUpdateFindings in the *Security Hub CSPM User Guide*.
 */
export const batchUpdateFindings: API.OperationMethod<
  BatchUpdateFindingsRequest,
  BatchUpdateFindingsResponse,
  BatchUpdateFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchUpdateFindingsRequest,
  output: BatchUpdateFindingsResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateFindings",
}));

export type BatchUpdateFindingsV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates information about a customer's investigation into a finding. Delegated administrator accounts can update findings for their account and their member accounts. Member accounts can update findings for their own account.
 *
 * `BatchUpdateFindings` and `BatchUpdateFindingsV2` both use `securityhub:BatchUpdateFindings` in the `Action` element of an IAM policy statement.
 * You must have permission to perform the `securityhub:BatchUpdateFindings` action.
 * You can configure IAM policies to restrict access to specific finding fields or field values by using the `securityhub:OCSFSyntaxPath/` condition key, where `` is one of the following supported fields: `SeverityId`, `StatusId`, or `Comment`.
 *
 * To prevent a user from updating a specific field, use a `Null` condition with `securityhub:OCSFSyntaxPath/` set to `"false"`.
 * To prevent a user from setting a field to a specific value, use a `StringEquals` condition with `securityhub:OCSFSyntaxPath/` set to the disallowed value or list of values.
 *
 * Updates from `BatchUpdateFindingsV2` don't affect the value of `finding_info.modified_time`, `finding_info.modified_time_dt`, `time`, or `time_dt` for a finding.
 */
export const batchUpdateFindingsV2: API.OperationMethod<
  BatchUpdateFindingsV2Request,
  BatchUpdateFindingsV2Response,
  BatchUpdateFindingsV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchUpdateFindingsV2Request,
  output: BatchUpdateFindingsV2Response,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateFindingsV2",
}));

export type BatchUpdateStandardsControlAssociationsError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * For a batch of security controls and standards, this operation updates the enablement status of a control in a standard.
 */
export const batchUpdateStandardsControlAssociations: API.OperationMethod<
  BatchUpdateStandardsControlAssociationsRequest,
  BatchUpdateStandardsControlAssociationsResponse,
  BatchUpdateStandardsControlAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchUpdateStandardsControlAssociationsRequest,
  output: BatchUpdateStandardsControlAssociationsResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateStandardsControlAssociations",
}));

export type CreateActionTargetError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceConflictException
  | CommonErrors;
/**
 * Creates a custom action target in Security Hub CSPM.
 *
 * You can use custom actions on findings and insights in Security Hub CSPM to trigger target actions
 * in Amazon CloudWatch Events.
 */
export const createActionTarget: API.OperationMethod<
  CreateActionTargetRequest,
  CreateActionTargetResponse,
  CreateActionTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateActionTargetRequest,
  output: CreateActionTargetResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateActionTarget",
}));

export type CreateAggregatorV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables aggregation across Amazon Web Services Regions.
 */
export const createAggregatorV2: API.OperationMethod<
  CreateAggregatorV2Request,
  CreateAggregatorV2Response,
  CreateAggregatorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAggregatorV2Request,
  output: CreateAggregatorV2Response,
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
  operationName: "CreateAggregatorV2",
}));

export type CreateAutomationRuleError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates an automation rule based on input parameters.
 */
export const createAutomationRule: API.OperationMethod<
  CreateAutomationRuleRequest,
  CreateAutomationRuleResponse,
  CreateAutomationRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAutomationRuleRequest,
  output: CreateAutomationRuleResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAutomationRule",
}));

export type CreateAutomationRuleV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a V2 automation rule.
 */
export const createAutomationRuleV2: API.OperationMethod<
  CreateAutomationRuleV2Request,
  CreateAutomationRuleV2Response,
  CreateAutomationRuleV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAutomationRuleV2Request,
  output: CreateAutomationRuleV2Response,
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
  operationName: "CreateAutomationRuleV2",
}));

export type CreateConfigurationPolicyError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceConflictException
  | CommonErrors;
/**
 * Creates a configuration policy with the defined configuration. Only the Security Hub CSPM delegated administrator
 * can invoke this operation from the home Region.
 */
export const createConfigurationPolicy: API.OperationMethod<
  CreateConfigurationPolicyRequest,
  CreateConfigurationPolicyResponse,
  CreateConfigurationPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConfigurationPolicyRequest,
  output: CreateConfigurationPolicyResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationPolicy",
}));

export type CreateConnectorV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Grants permission to create a connectorV2 based on input parameters.
 */
export const createConnectorV2: API.OperationMethod<
  CreateConnectorV2Request,
  CreateConnectorV2Response,
  CreateConnectorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConnectorV2Request,
  output: CreateConnectorV2Response,
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
  operationName: "CreateConnectorV2",
}));

export type CreateFindingAggregatorError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * The *aggregation Region* is now called the *home Region*.
 *
 * Used to enable cross-Region aggregation. This operation can be invoked from the home Region only.
 *
 * For information about how cross-Region aggregation works, see Understanding cross-Region aggregation in Security Hub CSPM in the *Security Hub CSPM User Guide*.
 */
export const createFindingAggregator: API.OperationMethod<
  CreateFindingAggregatorRequest,
  CreateFindingAggregatorResponse,
  CreateFindingAggregatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFindingAggregatorRequest,
  output: CreateFindingAggregatorResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFindingAggregator",
}));

export type CreateInsightError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceConflictException
  | CommonErrors;
/**
 * Creates a custom insight in Security Hub CSPM. An insight is a consolidation of findings that relate
 * to a security issue that requires attention or remediation.
 *
 * To group the related findings in the insight, use the
 * `GroupByAttribute`.
 */
export const createInsight: API.OperationMethod<
  CreateInsightRequest,
  CreateInsightResponse,
  CreateInsightError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateInsightRequest,
  output: CreateInsightResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInsight",
}));

export type CreateMembersError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceConflictException
  | CommonErrors;
/**
 * Creates a member association in Security Hub CSPM between the specified accounts and the account
 * used to make the request, which is the administrator account. If you are integrated with
 * Organizations, then the administrator account is designated by the organization management account.
 *
 * `CreateMembers` is always used to add accounts that are not organization
 * members.
 *
 * For accounts that are managed using Organizations, `CreateMembers` is only used
 * in the following cases:
 *
 * - Security Hub CSPM is not configured to automatically add new organization accounts.
 *
 * - The account was disassociated or deleted in Security Hub CSPM.
 *
 * This action can only be used by an account that has Security Hub CSPM enabled. To enable Security Hub CSPM, you
 * can use the `EnableSecurityHub` operation.
 *
 * For accounts that are not organization members, you create the account association and
 * then send an invitation to the member account. To send the invitation, you use the
 * `InviteMembers` operation. If the account owner accepts
 * the invitation, the account becomes a member account in Security Hub CSPM.
 *
 * Accounts that are managed using Organizations don't receive an invitation. They
 * automatically become a member account in Security Hub CSPM.
 *
 * - If the organization account does not have Security Hub CSPM enabled, then Security Hub CSPM and the default standards are automatically enabled. Note that Security Hub CSPM cannot be enabled automatically for the organization management account. The organization management account must enable Security Hub CSPM before the administrator account enables it as a member account.
 *
 * - For organization accounts that already have Security Hub CSPM enabled, Security Hub CSPM does not make any other changes to those accounts. It does not change their enabled standards or controls.
 *
 * A permissions policy is added that permits the administrator account to view the findings
 * generated in the member account.
 *
 * To remove the association between the administrator and member accounts, use the `DisassociateFromMasterAccount` or `DisassociateMembers` operation.
 */
export const createMembers: API.OperationMethod<
  CreateMembersRequest,
  CreateMembersResponse,
  CreateMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMembersRequest,
  output: CreateMembersResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMembers",
}));

export type CreateTicketV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Grants permission to create a ticket in the chosen ITSM based on finding information for the provided finding metadata UID.
 */
export const createTicketV2: API.OperationMethod<
  CreateTicketV2Request,
  CreateTicketV2Response,
  CreateTicketV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTicketV2Request,
  output: CreateTicketV2Response,
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
  operationName: "CreateTicketV2",
}));

export type DeclineInvitationsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * We recommend using Organizations instead of Security Hub CSPM invitations to manage your member accounts.
 * For information, see Managing Security Hub CSPM administrator and member accounts with Organizations
 * in the *Security Hub CSPM User Guide*.
 *
 * Declines invitations to become a Security Hub CSPM member account.
 *
 * A prospective member account uses this operation to decline an invitation to become a member.
 *
 * Only member accounts that aren't part of an Amazon Web Services organization should use this operation.
 * Organization accounts don't receive invitations.
 */
export const declineInvitations: API.OperationMethod<
  DeclineInvitationsRequest,
  DeclineInvitationsResponse,
  DeclineInvitationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeclineInvitationsRequest,
  output: DeclineInvitationsResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeclineInvitations",
}));

export type DeleteActionTargetError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a custom action target from Security Hub CSPM.
 *
 * Deleting a custom action target does not affect any findings or insights that were
 * already sent to Amazon CloudWatch Events using the custom action.
 */
export const deleteActionTarget: API.OperationMethod<
  DeleteActionTargetRequest,
  DeleteActionTargetResponse,
  DeleteActionTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteActionTargetRequest,
  output: DeleteActionTargetResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteActionTarget",
}));

export type DeleteAggregatorV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the Aggregator V2.
 */
export const deleteAggregatorV2: API.OperationMethod<
  DeleteAggregatorV2Request,
  DeleteAggregatorV2Response,
  DeleteAggregatorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAggregatorV2Request,
  output: DeleteAggregatorV2Response,
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
  operationName: "DeleteAggregatorV2",
}));

export type DeleteAutomationRuleV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a V2 automation rule.
 */
export const deleteAutomationRuleV2: API.OperationMethod<
  DeleteAutomationRuleV2Request,
  DeleteAutomationRuleV2Response,
  DeleteAutomationRuleV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAutomationRuleV2Request,
  output: DeleteAutomationRuleV2Response,
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
  operationName: "DeleteAutomationRuleV2",
}));

export type DeleteConfigurationPolicyError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a configuration policy. Only the Security Hub CSPM delegated administrator can invoke this operation
 * from the home Region. For the deletion to succeed, you must first disassociate a configuration policy from target accounts,
 * organizational units, or the root by invoking the `StartConfigurationPolicyDisassociation` operation.
 */
export const deleteConfigurationPolicy: API.OperationMethod<
  DeleteConfigurationPolicyRequest,
  DeleteConfigurationPolicyResponse,
  DeleteConfigurationPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfigurationPolicyRequest,
  output: DeleteConfigurationPolicyResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceConflictException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationPolicy",
}));

export type DeleteConnectorV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Grants permission to delete a connectorV2.
 */
export const deleteConnectorV2: API.OperationMethod<
  DeleteConnectorV2Request,
  DeleteConnectorV2Response,
  DeleteConnectorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConnectorV2Request,
  output: DeleteConnectorV2Response,
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
  operationName: "DeleteConnectorV2",
}));

export type DeleteFindingAggregatorError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * The *aggregation Region* is now called the *home Region*.
 *
 * Deletes a finding aggregator. When you delete the finding aggregator, you stop cross-Region aggregation. Finding replication stops
 * occurring from the linked Regions to the home Region.
 *
 * When you stop cross-Region aggregation, findings that were already replicated and sent to the home Region are still visible from
 * the home Region. However, new findings and finding updates are no longer replicated and sent to the home Region.
 */
export const deleteFindingAggregator: API.OperationMethod<
  DeleteFindingAggregatorRequest,
  DeleteFindingAggregatorResponse,
  DeleteFindingAggregatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFindingAggregatorRequest,
  output: DeleteFindingAggregatorResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFindingAggregator",
}));

export type DeleteInsightError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the insight specified by the `InsightArn`.
 */
export const deleteInsight: API.OperationMethod<
  DeleteInsightRequest,
  DeleteInsightResponse,
  DeleteInsightError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteInsightRequest,
  output: DeleteInsightResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInsight",
}));

export type DeleteInvitationsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * We recommend using Organizations instead of Security Hub CSPM invitations to manage your member accounts.
 * For information, see Managing Security Hub CSPM administrator and member accounts with Organizations
 * in the *Security Hub CSPM User Guide*.
 *
 * Deletes invitations to become a Security Hub CSPM member account.
 *
 * A Security Hub CSPM administrator account can use this operation to delete invitations sent to one or more prospective member accounts.
 *
 * This operation is only used to delete invitations that are sent to prospective member accounts that aren't part of an Amazon Web Services organization.
 * Organization accounts don't receive invitations.
 */
export const deleteInvitations: API.OperationMethod<
  DeleteInvitationsRequest,
  DeleteInvitationsResponse,
  DeleteInvitationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteInvitationsRequest,
  output: DeleteInvitationsResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInvitations",
}));

export type DeleteMembersError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified member accounts from Security Hub CSPM.
 *
 * You can invoke this API only to delete accounts that became members through invitation. You can't invoke this
 * API to delete accounts that belong to an Organizations organization.
 */
export const deleteMembers: API.OperationMethod<
  DeleteMembersRequest,
  DeleteMembersResponse,
  DeleteMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMembersRequest,
  output: DeleteMembersResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMembers",
}));

export type DescribeActionTargetsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of the custom action targets in Security Hub CSPM in your account.
 */
export const describeActionTargets: API.PaginatedOperationMethod<
  DescribeActionTargetsRequest,
  DescribeActionTargetsResponse,
  DescribeActionTargetsError,
  Credentials | HttpClient.HttpClient,
  ActionTarget
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeActionTargetsRequest,
  output: DescribeActionTargetsResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeActionTargets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ActionTargets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeHubError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns details about the Hub resource in your account, including the
 * `HubArn` and the time when you enabled Security Hub CSPM.
 */
export const describeHub: API.OperationMethod<
  DescribeHubRequest,
  DescribeHubResponse,
  DescribeHubError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeHubRequest,
  output: DescribeHubResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHub",
}));

export type DescribeOrganizationConfigurationError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Returns information about the way your organization is configured in Security Hub CSPM. Only the
 * Security Hub CSPM administrator account can invoke this operation.
 */
export const describeOrganizationConfiguration: API.OperationMethod<
  DescribeOrganizationConfigurationRequest,
  DescribeOrganizationConfigurationResponse,
  DescribeOrganizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeOrganizationConfigurationRequest,
  output: DescribeOrganizationConfigurationResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrganizationConfiguration",
}));

export type DescribeProductsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Returns information about product integrations in Security Hub CSPM.
 *
 * You can optionally provide an integration ARN. If you provide an integration ARN, then
 * the results only include that integration.
 *
 * If you don't provide an integration ARN, then the results include all of the available
 * product integrations.
 */
export const describeProducts: API.PaginatedOperationMethod<
  DescribeProductsRequest,
  DescribeProductsResponse,
  DescribeProductsError,
  Credentials | HttpClient.HttpClient,
  Product
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeProductsRequest,
  output: DescribeProductsResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProducts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Products",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeProductsV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the product integration.
 */
export const describeProductsV2: API.PaginatedOperationMethod<
  DescribeProductsV2Request,
  DescribeProductsV2Response,
  DescribeProductsV2Error,
  Credentials | HttpClient.HttpClient,
  ProductV2
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeProductsV2Request,
  output: DescribeProductsV2Response,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProductsV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProductsV2",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeSecurityHubV2Error =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details about the service resource in your account.
 */
export const describeSecurityHubV2: API.OperationMethod<
  DescribeSecurityHubV2Request,
  DescribeSecurityHubV2Response,
  DescribeSecurityHubV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSecurityHubV2Request,
  output: DescribeSecurityHubV2Response,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSecurityHubV2",
}));

export type DescribeStandardsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | CommonErrors;
/**
 * Returns a list of the available standards in Security Hub CSPM.
 *
 * For each standard, the results include the standard ARN, the name, and a description.
 */
export const describeStandards: API.PaginatedOperationMethod<
  DescribeStandardsRequest,
  DescribeStandardsResponse,
  DescribeStandardsError,
  Credentials | HttpClient.HttpClient,
  Standard
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeStandardsRequest,
  output: DescribeStandardsResponse,
  errors: [InternalException, InvalidAccessException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStandards",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Standards",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeStandardsControlsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of security standards controls.
 *
 * For each control, the results include information about whether it is currently enabled,
 * the severity, and a link to remediation information.
 *
 * This operation returns an empty list for standard subscriptions where `StandardsControlsUpdatable` has value `NOT_READY_FOR_UPDATES`.
 */
export const describeStandardsControls: API.PaginatedOperationMethod<
  DescribeStandardsControlsRequest,
  DescribeStandardsControlsResponse,
  DescribeStandardsControlsError,
  Credentials | HttpClient.HttpClient,
  StandardsControl
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeStandardsControlsRequest,
  output: DescribeStandardsControlsResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStandardsControls",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Controls",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DisableImportFindingsForProductError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disables the integration of the specified product with Security Hub CSPM. After the integration is
 * disabled, findings from that product are no longer sent to Security Hub CSPM.
 */
export const disableImportFindingsForProduct: API.OperationMethod<
  DisableImportFindingsForProductRequest,
  DisableImportFindingsForProductResponse,
  DisableImportFindingsForProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisableImportFindingsForProductRequest,
  output: DisableImportFindingsForProductResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableImportFindingsForProduct",
}));

export type DisableOrganizationAdminAccountError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Disables a Security Hub CSPM administrator account. Can only be called by the organization
 * management account.
 */
export const disableOrganizationAdminAccount: API.OperationMethod<
  DisableOrganizationAdminAccountRequest,
  DisableOrganizationAdminAccountResponse,
  DisableOrganizationAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisableOrganizationAdminAccountRequest,
  output: DisableOrganizationAdminAccountResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableOrganizationAdminAccount",
}));

export type DisableSecurityHubError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disables Security Hub CSPM in your account only in the current Amazon Web Services Region. To disable Security Hub CSPM in all
 * Regions, you must submit one request per Region where you have enabled Security Hub CSPM.
 *
 * You can't disable Security Hub CSPM in an account that is currently the Security Hub CSPM administrator.
 *
 * When you disable Security Hub CSPM, your existing findings and insights and any Security Hub CSPM configuration
 * settings are deleted after 90 days and cannot be recovered. Any standards that were enabled
 * are disabled, and your administrator and member account associations are removed.
 *
 * If you want to save your existing findings, you must export them before you disable
 * Security Hub CSPM.
 */
export const disableSecurityHub: API.OperationMethod<
  DisableSecurityHubRequest,
  DisableSecurityHubResponse,
  DisableSecurityHubError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisableSecurityHubRequest,
  output: DisableSecurityHubResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableSecurityHub",
}));

export type DisableSecurityHubV2Error =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disable the service for the current Amazon Web Services Region or specified Amazon Web Services Region.
 */
export const disableSecurityHubV2: API.OperationMethod<
  DisableSecurityHubV2Request,
  DisableSecurityHubV2Response,
  DisableSecurityHubV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisableSecurityHubV2Request,
  output: DisableSecurityHubV2Response,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableSecurityHubV2",
}));

export type DisassociateFromAdministratorAccountError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates the current Security Hub CSPM member account from the associated administrator
 * account.
 *
 * This operation is only used by accounts that are not part of an organization. For
 * organization accounts, only the administrator account can
 * disassociate a member account.
 */
export const disassociateFromAdministratorAccount: API.OperationMethod<
  DisassociateFromAdministratorAccountRequest,
  DisassociateFromAdministratorAccountResponse,
  DisassociateFromAdministratorAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateFromAdministratorAccountRequest,
  output: DisassociateFromAdministratorAccountResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFromAdministratorAccount",
}));

export type DisassociateFromMasterAccountError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This method is deprecated. Instead, use `DisassociateFromAdministratorAccount`.
 *
 * The Security Hub CSPM console continues to use `DisassociateFromMasterAccount`. It will eventually change to use `DisassociateFromAdministratorAccount`. Any IAM policies that specifically control access to this function must continue to use `DisassociateFromMasterAccount`. You should also add `DisassociateFromAdministratorAccount` to your policies to ensure that the correct permissions are in place after the console begins to use `DisassociateFromAdministratorAccount`.
 *
 * Disassociates the current Security Hub CSPM member account from the associated administrator
 * account.
 *
 * This operation is only used by accounts that are not part of an organization. For
 * organization accounts, only the administrator account can
 * disassociate a member account.
 */
export const disassociateFromMasterAccount: API.OperationMethod<
  DisassociateFromMasterAccountRequest,
  DisassociateFromMasterAccountResponse,
  DisassociateFromMasterAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateFromMasterAccountRequest,
  output: DisassociateFromMasterAccountResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFromMasterAccount",
}));

export type DisassociateMembersError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates the specified member accounts from the associated administrator account.
 *
 * Can be used to disassociate both accounts that are managed using Organizations and accounts that
 * were invited manually.
 */
export const disassociateMembers: API.OperationMethod<
  DisassociateMembersRequest,
  DisassociateMembersResponse,
  DisassociateMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateMembersRequest,
  output: DisassociateMembersResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateMembers",
}));

export type EnableImportFindingsForProductError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceConflictException
  | CommonErrors;
/**
 * Enables the integration of a partner product with Security Hub CSPM. Integrated products send
 * findings to Security Hub CSPM.
 *
 * When you enable a product integration, a permissions policy that grants permission for
 * the product to send findings to Security Hub CSPM is applied.
 */
export const enableImportFindingsForProduct: API.OperationMethod<
  EnableImportFindingsForProductRequest,
  EnableImportFindingsForProductResponse,
  EnableImportFindingsForProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableImportFindingsForProductRequest,
  output: EnableImportFindingsForProductResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableImportFindingsForProduct",
}));

export type EnableOrganizationAdminAccountError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Designates the Security Hub CSPM administrator account for an organization. Can only be called by
 * the organization management account.
 */
export const enableOrganizationAdminAccount: API.OperationMethod<
  EnableOrganizationAdminAccountRequest,
  EnableOrganizationAdminAccountResponse,
  EnableOrganizationAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableOrganizationAdminAccountRequest,
  output: EnableOrganizationAdminAccountResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableOrganizationAdminAccount",
}));

export type EnableSecurityHubError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | LimitExceededException
  | ResourceConflictException
  | CommonErrors;
/**
 * Enables Security Hub CSPM for your account in the current Region or the Region you specify in the
 * request.
 *
 * When you enable Security Hub CSPM, you grant to Security Hub CSPM the permissions necessary to gather findings
 * from other services that are integrated with Security Hub CSPM.
 *
 * When you use the `EnableSecurityHub` operation to enable Security Hub CSPM, you also
 * automatically enable the following standards:
 *
 * - Center for Internet Security (CIS) Amazon Web Services Foundations Benchmark v1.2.0
 *
 * - Amazon Web Services Foundational Security Best Practices
 *
 * Other standards are not automatically enabled.
 *
 * To opt out of automatically enabled standards, set
 * `EnableDefaultStandards` to `false`.
 *
 * After you enable Security Hub CSPM, to enable a standard, use the `BatchEnableStandards` operation. To disable a standard, use the
 * `BatchDisableStandards` operation.
 *
 * To learn more, see the setup information in the *Security Hub CSPM User Guide*.
 */
export const enableSecurityHub: API.OperationMethod<
  EnableSecurityHubRequest,
  EnableSecurityHubResponse,
  EnableSecurityHubError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableSecurityHubRequest,
  output: EnableSecurityHubResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    LimitExceededException,
    ResourceConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableSecurityHub",
}));

export type EnableSecurityHubV2Error =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables the service in account for the current Amazon Web Services Region or specified Amazon Web Services Region.
 */
export const enableSecurityHubV2: API.OperationMethod<
  EnableSecurityHubV2Request,
  EnableSecurityHubV2Response,
  EnableSecurityHubV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableSecurityHubV2Request,
  output: EnableSecurityHubV2Response,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableSecurityHubV2",
}));

export type GenerateRecommendedPolicyV2Error =
  | AccessDeniedException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Begins the recommended policy generation to remediate a Security Hub finding.
 * `GenerateRecommendedPolicyV2` only supports findings for unused permissions.
 */
export const generateRecommendedPolicyV2: API.OperationMethod<
  GenerateRecommendedPolicyV2Request,
  GenerateRecommendedPolicyV2Response,
  GenerateRecommendedPolicyV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GenerateRecommendedPolicyV2Request,
  output: GenerateRecommendedPolicyV2Response,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateRecommendedPolicyV2",
}));

export type GetAdministratorAccountError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Provides the details for the Security Hub CSPM administrator account for the current member account.
 *
 * Can be used by both member accounts that are managed using Organizations and accounts that were
 * invited manually.
 */
export const getAdministratorAccount: API.OperationMethod<
  GetAdministratorAccountRequest,
  GetAdministratorAccountResponse,
  GetAdministratorAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAdministratorAccountRequest,
  output: GetAdministratorAccountResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAdministratorAccount",
}));

export type GetAggregatorV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the configuration of the specified Aggregator V2.
 */
export const getAggregatorV2: API.OperationMethod<
  GetAggregatorV2Request,
  GetAggregatorV2Response,
  GetAggregatorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAggregatorV2Request,
  output: GetAggregatorV2Response,
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
  operationName: "GetAggregatorV2",
}));

export type GetAutomationRuleV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns an automation rule for the V2 service.
 */
export const getAutomationRuleV2: API.OperationMethod<
  GetAutomationRuleV2Request,
  GetAutomationRuleV2Response,
  GetAutomationRuleV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAutomationRuleV2Request,
  output: GetAutomationRuleV2Response,
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
  operationName: "GetAutomationRuleV2",
}));

export type GetConfigurationPolicyError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Provides information about a configuration policy. Only the Security Hub CSPM delegated administrator can invoke
 * this operation from the home Region.
 */
export const getConfigurationPolicy: API.OperationMethod<
  GetConfigurationPolicyRequest,
  GetConfigurationPolicyResponse,
  GetConfigurationPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConfigurationPolicyRequest,
  output: GetConfigurationPolicyResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfigurationPolicy",
}));

export type GetConfigurationPolicyAssociationError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the association between a configuration and a target account, organizational unit, or the root. The
 * configuration can be a configuration policy or self-managed behavior. Only the Security Hub CSPM delegated administrator can
 * invoke this operation from the home Region.
 */
export const getConfigurationPolicyAssociation: API.OperationMethod<
  GetConfigurationPolicyAssociationRequest,
  GetConfigurationPolicyAssociationResponse,
  GetConfigurationPolicyAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConfigurationPolicyAssociationRequest,
  output: GetConfigurationPolicyAssociationResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfigurationPolicyAssociation",
}));

export type GetConnectorV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Grants permission to retrieve details for a connectorV2 based on connector id.
 */
export const getConnectorV2: API.OperationMethod<
  GetConnectorV2Request,
  GetConnectorV2Response,
  GetConnectorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConnectorV2Request,
  output: GetConnectorV2Response,
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
  operationName: "GetConnectorV2",
}));

export type GetEnabledStandardsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Returns a list of the standards that are currently enabled.
 */
export const getEnabledStandards: API.PaginatedOperationMethod<
  GetEnabledStandardsRequest,
  GetEnabledStandardsResponse,
  GetEnabledStandardsError,
  Credentials | HttpClient.HttpClient,
  StandardsSubscription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetEnabledStandardsRequest,
  output: GetEnabledStandardsResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnabledStandards",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "StandardsSubscriptions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetFindingAggregatorError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * The *aggregation Region* is now called the *home Region*.
 *
 * Returns the current configuration in the calling account for cross-Region aggregation. A finding aggregator is a resource that establishes
 * the home Region and any linked Regions.
 */
export const getFindingAggregator: API.OperationMethod<
  GetFindingAggregatorRequest,
  GetFindingAggregatorResponse,
  GetFindingAggregatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFindingAggregatorRequest,
  output: GetFindingAggregatorResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFindingAggregator",
}));

export type GetFindingHistoryError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Returns the history of a Security Hub CSPM finding. The history includes changes made to any fields in
 * the Amazon Web Services Security Finding Format (ASFF) except top-level timestamp fields, such as the `CreatedAt` and
 * `UpdatedAt` fields.
 *
 * This operation might return fewer results than the maximum number of results (`MaxResults`) specified in a request, even
 * when more results are available. If this occurs, the response includes a `NextToken` value, which you should use to retrieve
 * the next set of results in the response. The presence of a `NextToken` value in a response doesn't necessarily indicate
 * that the results are incomplete. However, you should continue to specify a `NextToken` value until you receive a
 * response that doesn't include this value.
 */
export const getFindingHistory: API.PaginatedOperationMethod<
  GetFindingHistoryRequest,
  GetFindingHistoryResponse,
  GetFindingHistoryError,
  Credentials | HttpClient.HttpClient,
  FindingHistoryRecord
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetFindingHistoryRequest,
  output: GetFindingHistoryResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFindingHistory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Records",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetFindingsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Returns a list of findings that match the specified criteria.
 *
 * If cross-Region aggregation is enabled, then when you call `GetFindings` from the home Region, the results include all of the matching findings from both the home Region and linked Regions.
 */
export const getFindings: API.PaginatedOperationMethod<
  GetFindingsRequest,
  GetFindingsResponse,
  GetFindingsError,
  Credentials | HttpClient.HttpClient,
  AwsSecurityFinding
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetFindingsRequest,
  output: GetFindingsResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFindings",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Findings",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetFindingStatisticsV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | OrganizationalUnitNotFoundException
  | OrganizationNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns aggregated statistical data about findings.
 *
 * You can use the `Scopes` parameter to define the data boundary for the query. Currently, `Scopes` supports `AwsOrganizations`, which lets you aggregate findings from your entire organization or from specific organizational units. Only the delegated administrator account can use `Scopes`.
 *
 * `GetFindingStatisticsV2` uses `securityhub:GetAdhocInsightResults` in the `Action` element of an IAM policy statement.
 * You must have permission to perform the `securityhub:GetAdhocInsightResults` action.
 */
export const getFindingStatisticsV2: API.OperationMethod<
  GetFindingStatisticsV2Request,
  GetFindingStatisticsV2Response,
  GetFindingStatisticsV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFindingStatisticsV2Request,
  output: GetFindingStatisticsV2Response,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    OrganizationalUnitNotFoundException,
    OrganizationNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFindingStatisticsV2",
}));

export type GetFindingsTrendsV2Error =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns findings trend data based on the specified criteria. This operation helps you analyze patterns and changes in findings over time.
 */
export const getFindingsTrendsV2: API.PaginatedOperationMethod<
  GetFindingsTrendsV2Request,
  GetFindingsTrendsV2Response,
  GetFindingsTrendsV2Error,
  Credentials | HttpClient.HttpClient,
  TrendsMetricsResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetFindingsTrendsV2Request,
  output: GetFindingsTrendsV2Response,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFindingsTrendsV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TrendsMetrics",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetFindingsV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | OrganizationalUnitNotFoundException
  | OrganizationNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of findings that match the specified criteria.
 *
 * You can use the `Scopes` parameter to define the data boundary for the query. Currently, `Scopes` supports `AwsOrganizations`, which lets you retrieve findings from your entire organization or from specific organizational units. Only the delegated administrator account can use `Scopes`.
 *
 * You can use the `Filters` parameter to refine results based on finding attributes. You can use `Scopes` and `Filters` independently or together. When both are provided, `Scopes` narrows the data set first, and then `Filters` refines results within that scoped data set.
 *
 * `GetFindings` and `GetFindingsV2` both use `securityhub:GetFindings` in the `Action` element of an IAM policy statement.
 * You must have permission to perform the `securityhub:GetFindings` action.
 */
export const getFindingsV2: API.PaginatedOperationMethod<
  GetFindingsV2Request,
  GetFindingsV2Response,
  GetFindingsV2Error,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetFindingsV2Request,
  output: GetFindingsV2Response,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    OrganizationalUnitNotFoundException,
    OrganizationNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFindingsV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Findings",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetInsightResultsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the results of the Security Hub CSPM insight specified by the insight ARN.
 */
export const getInsightResults: API.OperationMethod<
  GetInsightResultsRequest,
  GetInsightResultsResponse,
  GetInsightResultsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInsightResultsRequest,
  output: GetInsightResultsResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInsightResults",
}));

export type GetInsightsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists and describes insights for the specified insight ARNs.
 */
export const getInsights: API.PaginatedOperationMethod<
  GetInsightsRequest,
  GetInsightsResponse,
  GetInsightsError,
  Credentials | HttpClient.HttpClient,
  Insight
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetInsightsRequest,
  output: GetInsightsResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInsights",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Insights",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetInvitationsCountError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * We recommend using Organizations instead of Security Hub CSPM invitations to manage your member accounts.
 * For information, see Managing Security Hub CSPM administrator and member accounts with Organizations
 * in the *Security Hub CSPM User Guide*.
 *
 * Returns the count of all Security Hub CSPM membership invitations that were sent to the
 * calling member account, not including the currently accepted invitation.
 */
export const getInvitationsCount: API.OperationMethod<
  GetInvitationsCountRequest,
  GetInvitationsCountResponse,
  GetInvitationsCountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInvitationsCountRequest,
  output: GetInvitationsCountResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInvitationsCount",
}));

export type GetMasterAccountError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This method is deprecated. Instead, use `GetAdministratorAccount`.
 *
 * The Security Hub CSPM console continues to use `GetMasterAccount`. It will eventually change to use `GetAdministratorAccount`. Any IAM policies that specifically control access to this function must continue to use `GetMasterAccount`. You should also add `GetAdministratorAccount` to your policies to ensure that the correct permissions are in place after the console begins to use `GetAdministratorAccount`.
 *
 * Provides the details for the Security Hub CSPM administrator account for the current member account.
 *
 * Can be used by both member accounts that are managed using Organizations and accounts that were
 * invited manually.
 */
export const getMasterAccount: API.OperationMethod<
  GetMasterAccountRequest,
  GetMasterAccountResponse,
  GetMasterAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMasterAccountRequest,
  output: GetMasterAccountResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMasterAccount",
}));

export type GetMembersError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the details for the Security Hub CSPM member accounts for the specified account IDs.
 *
 * An administrator account can be either the delegated Security Hub CSPM administrator account for an
 * organization or an administrator account that enabled Security Hub CSPM manually.
 *
 * The results include both member accounts that are managed using Organizations and accounts that
 * were invited manually.
 */
export const getMembers: API.OperationMethod<
  GetMembersRequest,
  GetMembersResponse,
  GetMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMembersRequest,
  output: GetMembersResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMembers",
}));

export type GetRecommendedPolicyV2Error =
  | AccessDeniedException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the recommended policy to remediate a Security Hub finding.
 * `GetRecommendedPolicyV2` only supports findings for unused permissions.
 */
export const getRecommendedPolicyV2: API.PaginatedOperationMethod<
  GetRecommendedPolicyV2Request,
  GetRecommendedPolicyV2Response,
  GetRecommendedPolicyV2Error,
  Credentials | HttpClient.HttpClient,
  RecommendationStep
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetRecommendedPolicyV2Request,
  output: GetRecommendedPolicyV2Response,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommendedPolicyV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RecommendationSteps",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetResourcesStatisticsV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | OrganizationalUnitNotFoundException
  | OrganizationNotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves statistical information about Amazon Web Services resources and their associated security findings.
 *
 * You can use the `Scopes` parameter to define the data boundary for the query. Currently, `Scopes` supports `AwsOrganizations`, which lets you aggregate resources from your entire organization or from specific organizational units. Only the delegated administrator account can use `Scopes`.
 */
export const getResourcesStatisticsV2: API.OperationMethod<
  GetResourcesStatisticsV2Request,
  GetResourcesStatisticsV2Response,
  GetResourcesStatisticsV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourcesStatisticsV2Request,
  output: GetResourcesStatisticsV2Response,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    OrganizationalUnitNotFoundException,
    OrganizationNotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcesStatisticsV2",
}));

export type GetResourcesTrendsV2Error =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns resource trend data based on the specified criteria. This operation helps you analyze patterns and changes in resource compliance over time.
 */
export const getResourcesTrendsV2: API.PaginatedOperationMethod<
  GetResourcesTrendsV2Request,
  GetResourcesTrendsV2Response,
  GetResourcesTrendsV2Error,
  Credentials | HttpClient.HttpClient,
  ResourcesTrendsMetricsResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetResourcesTrendsV2Request,
  output: GetResourcesTrendsV2Response,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcesTrendsV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TrendsMetrics",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetResourcesV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | OrganizationalUnitNotFoundException
  | OrganizationNotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of resources.
 *
 * You can use the `Scopes` parameter to define the data boundary for the query. Currently, `Scopes` supports `AwsOrganizations`, which lets you retrieve resources from your entire organization or from specific organizational units. Only the delegated administrator account can use `Scopes`.
 *
 * You can use the `Filters` parameter to refine results based on resource attributes. You can use `Scopes` and `Filters` independently or together. When both are provided, `Scopes` narrows the data set first, and then `Filters` refines results within that scoped data set.
 */
export const getResourcesV2: API.PaginatedOperationMethod<
  GetResourcesV2Request,
  GetResourcesV2Response,
  GetResourcesV2Error,
  Credentials | HttpClient.HttpClient,
  ResourceResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetResourcesV2Request,
  output: GetResourcesV2Response,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    OrganizationalUnitNotFoundException,
    OrganizationNotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcesV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Resources",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetSecurityControlDefinitionError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the definition of a security control. The definition includes the control title, description, Region availability, parameter definitions, and other details.
 */
export const getSecurityControlDefinition: API.OperationMethod<
  GetSecurityControlDefinitionRequest,
  GetSecurityControlDefinitionResponse,
  GetSecurityControlDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSecurityControlDefinitionRequest,
  output: GetSecurityControlDefinitionResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSecurityControlDefinition",
}));

export type InviteMembersError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * We recommend using Organizations instead of Security Hub CSPM invitations to manage your member accounts.
 * For information, see Managing Security Hub CSPM administrator and member accounts with Organizations
 * in the *Security Hub CSPM User Guide*.
 *
 * Invites other Amazon Web Services accounts to become member accounts for the Security Hub CSPM administrator account that
 * the invitation is sent from.
 *
 * This operation is only used to invite accounts that don't belong to an Amazon Web Services organization.
 * Organization accounts don't receive invitations.
 *
 * Before you can use this action to invite a member, you must first use the `CreateMembers` action to create the member account in Security Hub CSPM.
 *
 * When the account owner enables Security Hub CSPM and accepts the invitation to become a member
 * account, the administrator account can view the findings generated in the member account.
 */
export const inviteMembers: API.OperationMethod<
  InviteMembersRequest,
  InviteMembersResponse,
  InviteMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InviteMembersRequest,
  output: InviteMembersResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InviteMembers",
}));

export type ListAggregatorsV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of V2 aggregators.
 */
export const listAggregatorsV2: API.PaginatedOperationMethod<
  ListAggregatorsV2Request,
  ListAggregatorsV2Response,
  ListAggregatorsV2Error,
  Credentials | HttpClient.HttpClient,
  AggregatorV2
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAggregatorsV2Request,
  output: ListAggregatorsV2Response,
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
  operationName: "ListAggregatorsV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AggregatorsV2",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAutomationRulesError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * A list of automation rules and their metadata for the calling account.
 */
export const listAutomationRules: API.OperationMethod<
  ListAutomationRulesRequest,
  ListAutomationRulesResponse,
  ListAutomationRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListAutomationRulesRequest,
  output: ListAutomationRulesResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutomationRules",
}));

export type ListAutomationRulesV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of automation rules and metadata for the calling account.
 */
export const listAutomationRulesV2: API.OperationMethod<
  ListAutomationRulesV2Request,
  ListAutomationRulesV2Response,
  ListAutomationRulesV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListAutomationRulesV2Request,
  output: ListAutomationRulesV2Response,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutomationRulesV2",
}));

export type ListConfigurationPoliciesError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Lists the configuration policies that the Security Hub CSPM delegated administrator has created for your
 * organization. Only the delegated administrator can invoke this operation from the home Region.
 */
export const listConfigurationPolicies: API.PaginatedOperationMethod<
  ListConfigurationPoliciesRequest,
  ListConfigurationPoliciesResponse,
  ListConfigurationPoliciesError,
  Credentials | HttpClient.HttpClient,
  ConfigurationPolicySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConfigurationPoliciesRequest,
  output: ListConfigurationPoliciesResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationPolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConfigurationPolicySummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListConfigurationPolicyAssociationsError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Provides information about the associations for your configuration policies and self-managed behavior. Only the
 * Security Hub CSPM delegated administrator can invoke this operation from the home Region.
 */
export const listConfigurationPolicyAssociations: API.PaginatedOperationMethod<
  ListConfigurationPolicyAssociationsRequest,
  ListConfigurationPolicyAssociationsResponse,
  ListConfigurationPolicyAssociationsError,
  Credentials | HttpClient.HttpClient,
  ConfigurationPolicyAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConfigurationPolicyAssociationsRequest,
  output: ListConfigurationPolicyAssociationsResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationPolicyAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConfigurationPolicyAssociationSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListConnectorsV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Grants permission to retrieve a list of connectorsV2 and their metadata for the calling account.
 */
export const listConnectorsV2: API.OperationMethod<
  ListConnectorsV2Request,
  ListConnectorsV2Response,
  ListConnectorsV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListConnectorsV2Request,
  output: ListConnectorsV2Response,
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
  operationName: "ListConnectorsV2",
}));

export type ListEnabledProductsForImportError =
  | InternalException
  | InvalidAccessException
  | LimitExceededException
  | CommonErrors;
/**
 * Lists all findings-generating solutions (products) that you are subscribed to receive
 * findings from in Security Hub CSPM.
 */
export const listEnabledProductsForImport: API.PaginatedOperationMethod<
  ListEnabledProductsForImportRequest,
  ListEnabledProductsForImportResponse,
  ListEnabledProductsForImportError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEnabledProductsForImportRequest,
  output: ListEnabledProductsForImportResponse,
  errors: [InternalException, InvalidAccessException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnabledProductsForImport",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProductSubscriptions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFindingAggregatorsError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * If cross-Region aggregation is enabled, then `ListFindingAggregators` returns the Amazon Resource Name (ARN)
 * of the finding aggregator. You can run this operation from any Amazon Web Services Region.
 */
export const listFindingAggregators: API.PaginatedOperationMethod<
  ListFindingAggregatorsRequest,
  ListFindingAggregatorsResponse,
  ListFindingAggregatorsError,
  Credentials | HttpClient.HttpClient,
  FindingAggregator
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFindingAggregatorsRequest,
  output: ListFindingAggregatorsResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFindingAggregators",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FindingAggregators",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInvitationsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * We recommend using Organizations instead of Security Hub CSPM invitations to manage your member accounts.
 * For information, see Managing Security Hub CSPM administrator and member accounts with Organizations
 * in the *Security Hub CSPM User Guide*.
 *
 * Lists all Security Hub CSPM membership invitations that were sent to the calling account.
 *
 * Only accounts that are managed by invitation can use this operation.
 * Accounts that are managed using the integration with Organizations don't receive invitations.
 */
export const listInvitations: API.PaginatedOperationMethod<
  ListInvitationsRequest,
  ListInvitationsResponse,
  ListInvitationsError,
  Credentials | HttpClient.HttpClient,
  Invitation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInvitationsRequest,
  output: ListInvitationsResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInvitations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Invitations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMembersError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Lists details about all member accounts for the current Security Hub CSPM administrator
 * account.
 *
 * The results include both member accounts that belong to an organization and member
 * accounts that were invited manually.
 */
export const listMembers: API.PaginatedOperationMethod<
  ListMembersRequest,
  ListMembersResponse,
  ListMembersError,
  Credentials | HttpClient.HttpClient,
  Member
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMembersRequest,
  output: ListMembersResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMembers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Members",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOrganizationAdminAccountsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Lists the Security Hub CSPM administrator accounts. Can only be called by the organization
 * management account.
 */
export const listOrganizationAdminAccounts: API.PaginatedOperationMethod<
  ListOrganizationAdminAccountsRequest,
  ListOrganizationAdminAccountsResponse,
  ListOrganizationAdminAccountsError,
  Credentials | HttpClient.HttpClient,
  AdminAccount
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOrganizationAdminAccountsRequest,
  output: ListOrganizationAdminAccountsResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOrganizationAdminAccounts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AdminAccounts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSecurityControlDefinitionsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Lists all of the security controls that apply to a specified standard.
 */
export const listSecurityControlDefinitions: API.PaginatedOperationMethod<
  ListSecurityControlDefinitionsRequest,
  ListSecurityControlDefinitionsResponse,
  ListSecurityControlDefinitionsError,
  Credentials | HttpClient.HttpClient,
  SecurityControlDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSecurityControlDefinitionsRequest,
  output: ListSecurityControlDefinitionsResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecurityControlDefinitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SecurityControlDefinitions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStandardsControlAssociationsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Specifies whether a control is currently enabled or disabled in each enabled standard in the calling account.
 *
 * This operation omits standards control associations for standard subscriptions where `StandardsControlsUpdatable` has value `NOT_READY_FOR_UPDATES`.
 */
export const listStandardsControlAssociations: API.PaginatedOperationMethod<
  ListStandardsControlAssociationsRequest,
  ListStandardsControlAssociationsResponse,
  ListStandardsControlAssociationsError,
  Credentials | HttpClient.HttpClient,
  StandardsControlAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStandardsControlAssociationsRequest,
  output: ListStandardsControlAssociationsResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStandardsControlAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "StandardsControlAssociationSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of tags associated with a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [InternalException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type RegisterConnectorV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Grants permission to complete the authorization based on input parameters.
 */
export const registerConnectorV2: API.OperationMethod<
  RegisterConnectorV2Request,
  RegisterConnectorV2Response,
  RegisterConnectorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterConnectorV2Request,
  output: RegisterConnectorV2Response,
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
  operationName: "RegisterConnectorV2",
}));

export type StartConfigurationPolicyAssociationError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates a target account, organizational unit, or the root with a specified configuration. The target can be
 * associated with a configuration policy or self-managed behavior. Only the Security Hub CSPM delegated administrator can
 * invoke this operation from the home Region.
 */
export const startConfigurationPolicyAssociation: API.OperationMethod<
  StartConfigurationPolicyAssociationRequest,
  StartConfigurationPolicyAssociationResponse,
  StartConfigurationPolicyAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartConfigurationPolicyAssociationRequest,
  output: StartConfigurationPolicyAssociationResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartConfigurationPolicyAssociation",
}));

export type StartConfigurationPolicyDisassociationError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates a target account, organizational unit, or the root from a specified configuration. When you
 * disassociate a configuration from its target, the target inherits the configuration of the closest parent. If there’s no
 * configuration to inherit, the target retains its settings but becomes a self-managed account. A target can be disassociated from
 * a configuration policy or self-managed behavior. Only the Security Hub CSPM delegated administrator can invoke this
 * operation from the home Region.
 */
export const startConfigurationPolicyDisassociation: API.OperationMethod<
  StartConfigurationPolicyDisassociationRequest,
  StartConfigurationPolicyDisassociationResponse,
  StartConfigurationPolicyDisassociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartConfigurationPolicyDisassociationRequest,
  output: StartConfigurationPolicyDisassociationResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartConfigurationPolicyDisassociation",
}));

export type TagResourceError =
  | InternalException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds one or more tags to a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [InternalException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes one or more tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [InternalException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateActionTargetError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the name and description of a custom action target in Security Hub CSPM.
 */
export const updateActionTarget: API.OperationMethod<
  UpdateActionTargetRequest,
  UpdateActionTargetResponse,
  UpdateActionTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateActionTargetRequest,
  output: UpdateActionTargetResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateActionTarget",
}));

export type UpdateAggregatorV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Udpates the configuration for the Aggregator V2.
 */
export const updateAggregatorV2: API.OperationMethod<
  UpdateAggregatorV2Request,
  UpdateAggregatorV2Response,
  UpdateAggregatorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAggregatorV2Request,
  output: UpdateAggregatorV2Response,
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
  operationName: "UpdateAggregatorV2",
}));

export type UpdateAutomationRuleV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a V2 automation rule.
 */
export const updateAutomationRuleV2: API.OperationMethod<
  UpdateAutomationRuleV2Request,
  UpdateAutomationRuleV2Response,
  UpdateAutomationRuleV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAutomationRuleV2Request,
  output: UpdateAutomationRuleV2Response,
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
  operationName: "UpdateAutomationRuleV2",
}));

export type UpdateConfigurationPolicyError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a configuration policy. Only the Security Hub CSPM delegated
 * administrator can invoke this operation from the home Region.
 */
export const updateConfigurationPolicy: API.OperationMethod<
  UpdateConfigurationPolicyRequest,
  UpdateConfigurationPolicyResponse,
  UpdateConfigurationPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConfigurationPolicyRequest,
  output: UpdateConfigurationPolicyResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceConflictException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationPolicy",
}));

export type UpdateConnectorV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Grants permission to update a connectorV2 based on its id and input parameters.
 */
export const updateConnectorV2: API.OperationMethod<
  UpdateConnectorV2Request,
  UpdateConnectorV2Response,
  UpdateConnectorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConnectorV2Request,
  output: UpdateConnectorV2Response,
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
  operationName: "UpdateConnectorV2",
}));

export type UpdateFindingAggregatorError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * The *aggregation Region* is now called the *home Region*.
 *
 * Updates cross-Region aggregation settings. You can use this operation to update the Region linking mode and the list
 * of included or excluded Amazon Web Services Regions. However, you can't use this operation to change the home Region.
 *
 * You can invoke this operation from the current home Region only.
 */
export const updateFindingAggregator: API.OperationMethod<
  UpdateFindingAggregatorRequest,
  UpdateFindingAggregatorResponse,
  UpdateFindingAggregatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFindingAggregatorRequest,
  output: UpdateFindingAggregatorResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFindingAggregator",
}));

export type UpdateFindingsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * `UpdateFindings` is a deprecated operation. Instead of `UpdateFindings`, use
 * the `BatchUpdateFindings` operation.
 *
 * The `UpdateFindings` operation updates the `Note` and `RecordState` of the Security Hub CSPM aggregated
 * findings that the filter attributes specify. Any member account that can view the finding
 * can also see the update to the finding.
 *
 * Finding updates made with `UpdateFindings` aren't persisted if the same finding is later updated by the
 * finding provider through the `BatchImportFindings` operation. In addition, Security Hub CSPM doesn't
 * record updates made with `UpdateFindings` in the finding history.
 */
export const updateFindings: API.OperationMethod<
  UpdateFindingsRequest,
  UpdateFindingsResponse,
  UpdateFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFindingsRequest,
  output: UpdateFindingsResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFindings",
}));

export type UpdateInsightError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the Security Hub CSPM insight identified by the specified insight ARN.
 */
export const updateInsight: API.OperationMethod<
  UpdateInsightRequest,
  UpdateInsightResponse,
  UpdateInsightError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateInsightRequest,
  output: UpdateInsightResponse,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInsight",
}));

export type UpdateOrganizationConfigurationError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the configuration of your organization in Security Hub CSPM. Only the
 * Security Hub CSPM administrator account can invoke this operation.
 */
export const updateOrganizationConfiguration: API.OperationMethod<
  UpdateOrganizationConfigurationRequest,
  UpdateOrganizationConfigurationResponse,
  UpdateOrganizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateOrganizationConfigurationRequest,
  output: UpdateOrganizationConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceConflictException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOrganizationConfiguration",
}));

export type UpdateSecurityControlError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the properties of a security control.
 */
export const updateSecurityControl: API.OperationMethod<
  UpdateSecurityControlRequest,
  UpdateSecurityControlResponse,
  UpdateSecurityControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSecurityControlRequest,
  output: UpdateSecurityControlResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSecurityControl",
}));

export type UpdateSecurityHubConfigurationError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates configuration options for Security Hub CSPM.
 */
export const updateSecurityHubConfiguration: API.OperationMethod<
  UpdateSecurityHubConfigurationRequest,
  UpdateSecurityHubConfigurationResponse,
  UpdateSecurityHubConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSecurityHubConfigurationRequest,
  output: UpdateSecurityHubConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSecurityHubConfiguration",
}));

export type UpdateStandardsControlError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Used to control whether an individual security standard control is enabled or
 * disabled.
 *
 * Calls to this operation return a `RESOURCE_NOT_FOUND_EXCEPTION` error when the standard subscription for the control has `StandardsControlsUpdatable` value `NOT_READY_FOR_UPDATES`.
 */
export const updateStandardsControl: API.OperationMethod<
  UpdateStandardsControlRequest,
  UpdateStandardsControlResponse,
  UpdateStandardsControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateStandardsControlRequest,
  output: UpdateStandardsControlResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStandardsControl",
}));
