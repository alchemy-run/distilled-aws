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
  sdkId: "Marketplace Catalog",
  serviceShapeName: "AWSMPSeymour",
});
const auth = T.AwsAuthSigv4({ name: "aws-marketplace" });
const ver = T.ServiceVersion("2018-09-17");
const proto = T.AwsProtocolsRestJson1();
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
          Region === "us-east-1" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            `https://catalog-marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://catalog.marketplace-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://catalog.marketplace-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://catalog.marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://catalog.marketplace.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class InternalServiceException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceException>()(
    "InternalServiceException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(423),
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotSupportedException>()(
    "ResourceNotSupportedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(415),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ValidationExceptionFieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(422),
  ).pipe(C.withBadRequestError) {}
export type Catalog = string;
export type EntityId = string;
export interface EntityRequest {
  Catalog: string;
  EntityId: string;
}
export const EntityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Catalog: S.String, EntityId: S.String }),
).annotate({ identifier: "EntityRequest" }) as any as S.Schema<EntityRequest>;
export type EntityRequestList = EntityRequest[];
export const EntityRequestList = /*@__PURE__*/ S.Array(EntityRequest);
export interface BatchDescribeEntitiesRequest {
  EntityRequestList: EntityRequest[];
}
export const BatchDescribeEntitiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EntityRequestList: EntityRequestList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchDescribeEntities" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchDescribeEntitiesRequest",
}) as any as S.Schema<BatchDescribeEntitiesRequest>;
export type EntityType = string;
export type ARN = string;
export type Identifier = string;
export type DateTimeISO8601 = string;
export type JsonDocumentType = unknown;
export interface EntityDetail {
  EntityType?: string;
  EntityArn?: string;
  EntityIdentifier?: string;
  LastModifiedDate?: string;
  DetailsDocument?: any;
}
export const EntityDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EntityType: S.optional(S.String),
    EntityArn: S.optional(S.String),
    EntityIdentifier: S.optional(S.String),
    LastModifiedDate: S.optional(S.String),
    DetailsDocument: S.optional(S.Any),
  }),
).annotate({ identifier: "EntityDetail" }) as any as S.Schema<EntityDetail>;
export type EntityDetails = { [key: string]: EntityDetail | undefined };
export const EntityDetails = /*@__PURE__*/ S.Record(
  S.String,
  EntityDetail.pipe(S.optional),
);
export type BatchDescribeErrorCodeString = string;
export type BatchDescribeErrorMessageContent = string;
export interface BatchDescribeErrorDetail {
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const BatchDescribeErrorDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchDescribeErrorDetail",
}) as any as S.Schema<BatchDescribeErrorDetail>;
export type Errors = { [key: string]: BatchDescribeErrorDetail | undefined };
export const Errors = /*@__PURE__*/ S.Record(
  S.String,
  BatchDescribeErrorDetail.pipe(S.optional),
);
export interface BatchDescribeEntitiesResponse {
  EntityDetails?: { [key: string]: EntityDetail | undefined };
  Errors?: { [key: string]: BatchDescribeErrorDetail | undefined };
}
export const BatchDescribeEntitiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EntityDetails: S.optional(EntityDetails),
    Errors: S.optional(Errors),
  }),
).annotate({
  identifier: "BatchDescribeEntitiesResponse",
}) as any as S.Schema<BatchDescribeEntitiesResponse>;
export type ResourceId = string;
export interface CancelChangeSetRequest {
  Catalog: string;
  ChangeSetId: string;
}
export const CancelChangeSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String.pipe(T.HttpQuery("catalog")),
    ChangeSetId: S.String.pipe(T.HttpQuery("changeSetId")),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/CancelChangeSet" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelChangeSetRequest",
}) as any as S.Schema<CancelChangeSetRequest>;
export interface CancelChangeSetResponse {
  ChangeSetId?: string;
  ChangeSetArn?: string;
}
export const CancelChangeSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChangeSetId: S.optional(S.String),
    ChangeSetArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CancelChangeSetResponse",
}) as any as S.Schema<CancelChangeSetResponse>;
export type ResourceARN = string;
export interface DeleteResourcePolicyRequest {
  ResourceArn: string;
}
export const DeleteResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpQuery("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/DeleteResourcePolicy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteResourcePolicyRequest",
}) as any as S.Schema<DeleteResourcePolicyRequest>;
export interface DeleteResourcePolicyResponse {}
export const DeleteResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteResourcePolicyResponse",
}) as any as S.Schema<DeleteResourcePolicyResponse>;
export type AssessmentIdentifier = string;
export type DescribeAssessmentMaxResultInteger = number;
export type NextToken = string;
export interface DescribeAssessmentRequest {
  Catalog: string;
  AssessmentIdentifier: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeAssessmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    AssessmentIdentifier: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DescribeAssessment" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAssessmentRequest",
}) as any as S.Schema<DescribeAssessmentRequest>;
export type VersionedFrameworkId = string;
export interface AssessmentTargetSummary {
  EntityId?: string;
  ChangeSetId?: string;
}
export const AssessmentTargetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EntityId: S.optional(S.String),
    ChangeSetId: S.optional(S.String),
  }),
).annotate({
  identifier: "AssessmentTargetSummary",
}) as any as S.Schema<AssessmentTargetSummary>;
export interface AMISecuritySummary {
  DeliveryOptionId?: string;
}
export const AMISecuritySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DeliveryOptionId: S.optional(S.String) }),
).annotate({
  identifier: "AMISecuritySummary",
}) as any as S.Schema<AMISecuritySummary>;
export interface ContainerSecuritySummary {
  DeliveryOptionId?: string;
}
export const ContainerSecuritySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DeliveryOptionId: S.optional(S.String) }),
).annotate({
  identifier: "ContainerSecuritySummary",
}) as any as S.Schema<ContainerSecuritySummary>;
export type FrameworkSummary =
  | { AMISecuritySummary: AMISecuritySummary; ContainerSecuritySummary?: never }
  | {
      AMISecuritySummary?: never;
      ContainerSecuritySummary: ContainerSecuritySummary;
    };
export const FrameworkSummary = /*@__PURE__*/ S.Union([
  S.Struct({ AMISecuritySummary: AMISecuritySummary }),
  S.Struct({ ContainerSecuritySummary: ContainerSecuritySummary }),
]);
export type AssessmentResult = "PASS" | "FAIL" | (string & {});
export const AssessmentResult = S.String;

export type ControlAssessmentResult =
  | "PASS"
  | "FAIL"
  | "NOT_EXECUTED"
  | "EXEMPTION_PASS"
  | (string & {});
export const ControlAssessmentResult = S.String;

export type ErrorCode = string;
export type ErrorMessage = string;
export type ScopeName = string;
export type ScopeValue = string;
export interface ErrorScope {
  Name?: string;
  Value?: string;
}
export const ErrorScope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "ErrorScope" }) as any as S.Schema<ErrorScope>;
export type ErrorScopeList = ErrorScope[];
export const ErrorScopeList = /*@__PURE__*/ S.Array(ErrorScope);
export interface ControlError {
  Code?: string;
  Message?: string;
  Scope?: ErrorScope[];
}
export const ControlError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.optional(S.String),
    Message: S.optional(S.String),
    Scope: S.optional(ErrorScopeList),
  }),
).annotate({ identifier: "ControlError" }) as any as S.Schema<ControlError>;
export type ControlErrorList = ControlError[];
export const ControlErrorList = /*@__PURE__*/ S.Array(ControlError);
export interface ControlAssessment {
  ControlId?: string;
  ControlAssessmentResult?: ControlAssessmentResult;
  Errors?: ControlError[];
}
export const ControlAssessment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ControlId: S.optional(S.String),
    ControlAssessmentResult: S.optional(ControlAssessmentResult),
    Errors: S.optional(ControlErrorList),
  }),
).annotate({
  identifier: "ControlAssessment",
}) as any as S.Schema<ControlAssessment>;
export type ControlAssessmentList = ControlAssessment[];
export const ControlAssessmentList = /*@__PURE__*/ S.Array(ControlAssessment);
export interface DescribeAssessmentResponse {
  AssessmentArn?: string;
  AssessmentId?: string;
  FrameworkId?: string;
  AssessmentTargetSummary?: AssessmentTargetSummary;
  FrameworkSummary?: FrameworkSummary;
  AssessmentResult?: AssessmentResult;
  CreatedAt?: string;
  ExpiresAt?: string;
  ControlAssessments?: ControlAssessment[];
  NextToken?: string;
}
export const DescribeAssessmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssessmentArn: S.optional(S.String),
    AssessmentId: S.optional(S.String),
    FrameworkId: S.optional(S.String),
    AssessmentTargetSummary: S.optional(AssessmentTargetSummary),
    FrameworkSummary: S.optional(FrameworkSummary),
    AssessmentResult: S.optional(AssessmentResult),
    CreatedAt: S.optional(S.String),
    ExpiresAt: S.optional(S.String),
    ControlAssessments: S.optional(ControlAssessmentList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeAssessmentResponse",
}) as any as S.Schema<DescribeAssessmentResponse>;
export interface DescribeChangeSetRequest {
  Catalog: string;
  ChangeSetId: string;
}
export const DescribeChangeSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String.pipe(T.HttpQuery("catalog")),
    ChangeSetId: S.String.pipe(T.HttpQuery("changeSetId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/DescribeChangeSet" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeChangeSetRequest",
}) as any as S.Schema<DescribeChangeSetRequest>;
export type ChangeSetName = string;
export type Intent = "VALIDATE" | "APPLY" | (string & {});
export const Intent = S.String;

export type ChangeStatus =
  | "PREPARING"
  | "APPLYING"
  | "SUCCEEDED"
  | "CANCELLED"
  | "FAILED"
  | (string & {});
export const ChangeStatus = S.String;

export type FailureCode = "CLIENT_ERROR" | "SERVER_FAULT" | (string & {});
export const FailureCode = S.String;

export type ExceptionMessageContent = string;
export type ChangeType = string;
export interface Entity {
  Type: string;
  Identifier?: string;
}
export const Entity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: S.String, Identifier: S.optional(S.String) }),
).annotate({ identifier: "Entity" }) as any as S.Schema<Entity>;
export type Json = string;
export type ErrorCodeString = string;
export interface ErrorDetail {
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const ErrorDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "ErrorDetail" }) as any as S.Schema<ErrorDetail>;
export type ErrorDetailList = ErrorDetail[];
export const ErrorDetailList = /*@__PURE__*/ S.Array(ErrorDetail);
export type ChangeName = string;
export interface ChangeSummary {
  ChangeType?: string;
  Entity?: Entity;
  Details?: string;
  DetailsDocument?: any;
  ErrorDetailList?: ErrorDetail[];
  ChangeName?: string;
}
export const ChangeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChangeType: S.optional(S.String),
    Entity: S.optional(Entity),
    Details: S.optional(S.String),
    DetailsDocument: S.optional(S.Any),
    ErrorDetailList: S.optional(ErrorDetailList),
    ChangeName: S.optional(S.String),
  }),
).annotate({ identifier: "ChangeSummary" }) as any as S.Schema<ChangeSummary>;
export type ChangeSetDescription = ChangeSummary[];
export const ChangeSetDescription = /*@__PURE__*/ S.Array(ChangeSummary);
export interface DescribeChangeSetResponse {
  ChangeSetId?: string;
  ChangeSetArn?: string;
  ChangeSetName?: string;
  Intent?: Intent;
  StartTime?: string;
  EndTime?: string;
  Status?: ChangeStatus;
  FailureCode?: FailureCode;
  FailureDescription?: string;
  ChangeSet?: ChangeSummary[];
}
export const DescribeChangeSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChangeSetId: S.optional(S.String),
    ChangeSetArn: S.optional(S.String),
    ChangeSetName: S.optional(S.String),
    Intent: S.optional(Intent),
    StartTime: S.optional(S.String),
    EndTime: S.optional(S.String),
    Status: S.optional(ChangeStatus),
    FailureCode: S.optional(FailureCode),
    FailureDescription: S.optional(S.String),
    ChangeSet: S.optional(ChangeSetDescription),
  }),
).annotate({
  identifier: "DescribeChangeSetResponse",
}) as any as S.Schema<DescribeChangeSetResponse>;
export interface DescribeEntityRequest {
  Catalog: string;
  EntityId: string;
}
export const DescribeEntityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String.pipe(T.HttpQuery("catalog")),
    EntityId: S.String.pipe(T.HttpQuery("entityId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/DescribeEntity" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeEntityRequest",
}) as any as S.Schema<DescribeEntityRequest>;
export interface DescribeEntityResponse {
  EntityType?: string;
  EntityIdentifier?: string;
  EntityArn?: string;
  LastModifiedDate?: string;
  Details?: string;
  DetailsDocument?: any;
}
export const DescribeEntityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EntityType: S.optional(S.String),
    EntityIdentifier: S.optional(S.String),
    EntityArn: S.optional(S.String),
    LastModifiedDate: S.optional(S.String),
    Details: S.optional(S.String),
    DetailsDocument: S.optional(S.Any),
  }),
).annotate({
  identifier: "DescribeEntityResponse",
}) as any as S.Schema<DescribeEntityResponse>;
export interface GetResourcePolicyRequest {
  ResourceArn: string;
}
export const GetResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpQuery("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/GetResourcePolicy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourcePolicyRequest",
}) as any as S.Schema<GetResourcePolicyRequest>;
export type ResourcePolicyJson = string;
export interface GetResourcePolicyResponse {
  Policy?: string;
}
export const GetResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policy: S.optional(S.String) }),
).annotate({
  identifier: "GetResourcePolicyResponse",
}) as any as S.Schema<GetResourcePolicyResponse>;
export type FrameworkId = string;
export interface AssessmentTargetFilter {
  EntityId?: string;
  ChangeSetId?: string;
}
export const AssessmentTargetFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EntityId: S.optional(S.String),
    ChangeSetId: S.optional(S.String),
  }),
).annotate({
  identifier: "AssessmentTargetFilter",
}) as any as S.Schema<AssessmentTargetFilter>;
export interface AMISecurityFilters {
  DeliveryOptionId?: string;
}
export const AMISecurityFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DeliveryOptionId: S.optional(S.String) }),
).annotate({
  identifier: "AMISecurityFilters",
}) as any as S.Schema<AMISecurityFilters>;
export interface ContainerSecurityFilters {
  DeliveryOptionId?: string;
}
export const ContainerSecurityFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DeliveryOptionId: S.optional(S.String) }),
).annotate({
  identifier: "ContainerSecurityFilters",
}) as any as S.Schema<ContainerSecurityFilters>;
export type FrameworkFilters =
  | { AMISecurityFilters: AMISecurityFilters; ContainerSecurityFilters?: never }
  | {
      AMISecurityFilters?: never;
      ContainerSecurityFilters: ContainerSecurityFilters;
    };
export const FrameworkFilters = /*@__PURE__*/ S.Union([
  S.Struct({ AMISecurityFilters: AMISecurityFilters }),
  S.Struct({ ContainerSecurityFilters: ContainerSecurityFilters }),
]);
export type ListAssessmentsMaxResultInteger = number;
export interface ListAssessmentsRequest {
  Catalog: string;
  FrameworkId?: string;
  AssessmentTargetFilter?: AssessmentTargetFilter;
  FrameworkFilters?: FrameworkFilters;
  MaxResults?: number;
  NextToken?: string;
}
export const ListAssessmentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    FrameworkId: S.optional(S.String),
    AssessmentTargetFilter: S.optional(AssessmentTargetFilter),
    FrameworkFilters: S.optional(FrameworkFilters),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListAssessments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssessmentsRequest",
}) as any as S.Schema<ListAssessmentsRequest>;
export interface AssessmentSummary {
  AssessmentArn?: string;
  AssessmentId?: string;
  FrameworkId?: string;
  AssessmentTargetSummary?: AssessmentTargetSummary;
  FrameworkSummary?: FrameworkSummary;
  AssessmentResult?: AssessmentResult;
  CreatedAt?: string;
  ExpiresAt?: string;
}
export const AssessmentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssessmentArn: S.optional(S.String),
    AssessmentId: S.optional(S.String),
    FrameworkId: S.optional(S.String),
    AssessmentTargetSummary: S.optional(AssessmentTargetSummary),
    FrameworkSummary: S.optional(FrameworkSummary),
    AssessmentResult: S.optional(AssessmentResult),
    CreatedAt: S.optional(S.String),
    ExpiresAt: S.optional(S.String),
  }),
).annotate({
  identifier: "AssessmentSummary",
}) as any as S.Schema<AssessmentSummary>;
export type AssessmentSummaryList = AssessmentSummary[];
export const AssessmentSummaryList = /*@__PURE__*/ S.Array(AssessmentSummary);
export interface ListAssessmentsResponse {
  AssessmentSummaryList?: AssessmentSummary[];
  NextToken?: string;
}
export const ListAssessmentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssessmentSummaryList: S.optional(AssessmentSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAssessmentsResponse",
}) as any as S.Schema<ListAssessmentsResponse>;
export type FilterName = string;
export type FilterValueContent = string;
export type ValueList = string[];
export const ValueList = /*@__PURE__*/ S.Array(S.String);
export interface Filter {
  Name?: string;
  ValueList?: string[];
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), ValueList: S.optional(ValueList) }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type FilterList = Filter[];
export const FilterList = /*@__PURE__*/ S.Array(Filter);
export type SortBy = string;
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export const SortOrder = S.String;

export interface Sort {
  SortBy?: string;
  SortOrder?: SortOrder;
}
export const Sort = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SortBy: S.optional(S.String), SortOrder: S.optional(SortOrder) }),
).annotate({ identifier: "Sort" }) as any as S.Schema<Sort>;
export type ListChangeSetsMaxResultInteger = number;
export interface ListChangeSetsRequest {
  Catalog: string;
  FilterList?: Filter[];
  Sort?: Sort;
  MaxResults?: number;
  NextToken?: string;
}
export const ListChangeSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    FilterList: S.optional(FilterList),
    Sort: S.optional(Sort),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListChangeSets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListChangeSetsRequest",
}) as any as S.Schema<ListChangeSetsRequest>;
export type ResourceIdList = string[];
export const ResourceIdList = /*@__PURE__*/ S.Array(S.String);
export interface ChangeSetSummaryListItem {
  ChangeSetId?: string;
  ChangeSetArn?: string;
  ChangeSetName?: string;
  StartTime?: string;
  EndTime?: string;
  Status?: ChangeStatus;
  EntityIdList?: string[];
  FailureCode?: FailureCode;
}
export const ChangeSetSummaryListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChangeSetId: S.optional(S.String),
    ChangeSetArn: S.optional(S.String),
    ChangeSetName: S.optional(S.String),
    StartTime: S.optional(S.String),
    EndTime: S.optional(S.String),
    Status: S.optional(ChangeStatus),
    EntityIdList: S.optional(ResourceIdList),
    FailureCode: S.optional(FailureCode),
  }),
).annotate({
  identifier: "ChangeSetSummaryListItem",
}) as any as S.Schema<ChangeSetSummaryListItem>;
export type ChangeSetSummaryList = ChangeSetSummaryListItem[];
export const ChangeSetSummaryList = /*@__PURE__*/ S.Array(
  ChangeSetSummaryListItem,
);
export interface ListChangeSetsResponse {
  ChangeSetSummaryList?: ChangeSetSummaryListItem[];
  NextToken?: string;
}
export const ListChangeSetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChangeSetSummaryList: S.optional(ChangeSetSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListChangeSetsResponse",
}) as any as S.Schema<ListChangeSetsResponse>;
export type ListEntitiesMaxResultInteger = number;
export type OwnershipType = "SELF" | "SHARED" | (string & {});
export const OwnershipType = S.String;

export type DataProductEntityIdString = string;
export type DataProductEntityIdFilterValueList = string[];
export const DataProductEntityIdFilterValueList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface DataProductEntityIdFilter {
  ValueList?: string[];
}
export const DataProductEntityIdFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ValueList: S.optional(DataProductEntityIdFilterValueList) }),
).annotate({
  identifier: "DataProductEntityIdFilter",
}) as any as S.Schema<DataProductEntityIdFilter>;
export type DataProductTitleString = string;
export type DataProductTitleFilterValueList = string[];
export const DataProductTitleFilterValueList = /*@__PURE__*/ S.Array(S.String);
export interface DataProductTitleFilter {
  ValueList?: string[];
  WildCardValue?: string;
}
export const DataProductTitleFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ValueList: S.optional(DataProductTitleFilterValueList),
    WildCardValue: S.optional(S.String),
  }),
).annotate({
  identifier: "DataProductTitleFilter",
}) as any as S.Schema<DataProductTitleFilter>;
export type DataProductVisibilityString =
  | "Limited"
  | "Public"
  | "Restricted"
  | "Unavailable"
  | "Draft"
  | (string & {});
export const DataProductVisibilityString = S.String;

export type DataProductVisibilityFilterValueList =
  DataProductVisibilityString[];
export const DataProductVisibilityFilterValueList = /*@__PURE__*/ S.Array(
  DataProductVisibilityString,
);
export interface DataProductVisibilityFilter {
  ValueList?: DataProductVisibilityString[];
}
export const DataProductVisibilityFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ValueList: S.optional(DataProductVisibilityFilterValueList) }),
).annotate({
  identifier: "DataProductVisibilityFilter",
}) as any as S.Schema<DataProductVisibilityFilter>;
export interface DataProductLastModifiedDateFilterDateRange {
  AfterValue?: string;
  BeforeValue?: string;
}
export const DataProductLastModifiedDateFilterDateRange =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AfterValue: S.optional(S.String),
      BeforeValue: S.optional(S.String),
    }),
  ).annotate({
    identifier: "DataProductLastModifiedDateFilterDateRange",
  }) as any as S.Schema<DataProductLastModifiedDateFilterDateRange>;
export interface DataProductLastModifiedDateFilter {
  DateRange?: DataProductLastModifiedDateFilterDateRange;
}
export const DataProductLastModifiedDateFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DateRange: S.optional(DataProductLastModifiedDateFilterDateRange),
  }),
).annotate({
  identifier: "DataProductLastModifiedDateFilter",
}) as any as S.Schema<DataProductLastModifiedDateFilter>;
export interface DataProductFilters {
  EntityId?: DataProductEntityIdFilter;
  ProductTitle?: DataProductTitleFilter;
  Visibility?: DataProductVisibilityFilter;
  LastModifiedDate?: DataProductLastModifiedDateFilter;
}
export const DataProductFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EntityId: S.optional(DataProductEntityIdFilter),
    ProductTitle: S.optional(DataProductTitleFilter),
    Visibility: S.optional(DataProductVisibilityFilter),
    LastModifiedDate: S.optional(DataProductLastModifiedDateFilter),
  }),
).annotate({
  identifier: "DataProductFilters",
}) as any as S.Schema<DataProductFilters>;
export type SaaSProductEntityIdString = string;
export type SaaSProductEntityIdFilterValueList = string[];
export const SaaSProductEntityIdFilterValueList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface SaaSProductEntityIdFilter {
  ValueList?: string[];
}
export const SaaSProductEntityIdFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ValueList: S.optional(SaaSProductEntityIdFilterValueList) }),
).annotate({
  identifier: "SaaSProductEntityIdFilter",
}) as any as S.Schema<SaaSProductEntityIdFilter>;
export type SaaSProductTitleString = string;
export type SaaSProductTitleFilterValueList = string[];
export const SaaSProductTitleFilterValueList = /*@__PURE__*/ S.Array(S.String);
export interface SaaSProductTitleFilter {
  ValueList?: string[];
  WildCardValue?: string;
}
export const SaaSProductTitleFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ValueList: S.optional(SaaSProductTitleFilterValueList),
    WildCardValue: S.optional(S.String),
  }),
).annotate({
  identifier: "SaaSProductTitleFilter",
}) as any as S.Schema<SaaSProductTitleFilter>;
export type SaaSProductVisibilityString =
  | "Limited"
  | "Public"
  | "Restricted"
  | "Draft"
  | (string & {});
export const SaaSProductVisibilityString = S.String;

export type SaaSProductVisibilityFilterValueList =
  SaaSProductVisibilityString[];
export const SaaSProductVisibilityFilterValueList = /*@__PURE__*/ S.Array(
  SaaSProductVisibilityString,
);
export interface SaaSProductVisibilityFilter {
  ValueList?: SaaSProductVisibilityString[];
}
export const SaaSProductVisibilityFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ValueList: S.optional(SaaSProductVisibilityFilterValueList) }),
).annotate({
  identifier: "SaaSProductVisibilityFilter",
}) as any as S.Schema<SaaSProductVisibilityFilter>;
export interface SaaSProductLastModifiedDateFilterDateRange {
  AfterValue?: string;
  BeforeValue?: string;
}
export const SaaSProductLastModifiedDateFilterDateRange =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AfterValue: S.optional(S.String),
      BeforeValue: S.optional(S.String),
    }),
  ).annotate({
    identifier: "SaaSProductLastModifiedDateFilterDateRange",
  }) as any as S.Schema<SaaSProductLastModifiedDateFilterDateRange>;
export interface SaaSProductLastModifiedDateFilter {
  DateRange?: SaaSProductLastModifiedDateFilterDateRange;
}
export const SaaSProductLastModifiedDateFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DateRange: S.optional(SaaSProductLastModifiedDateFilterDateRange),
  }),
).annotate({
  identifier: "SaaSProductLastModifiedDateFilter",
}) as any as S.Schema<SaaSProductLastModifiedDateFilter>;
export interface SaaSProductFilters {
  EntityId?: SaaSProductEntityIdFilter;
  ProductTitle?: SaaSProductTitleFilter;
  Visibility?: SaaSProductVisibilityFilter;
  LastModifiedDate?: SaaSProductLastModifiedDateFilter;
}
export const SaaSProductFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EntityId: S.optional(SaaSProductEntityIdFilter),
    ProductTitle: S.optional(SaaSProductTitleFilter),
    Visibility: S.optional(SaaSProductVisibilityFilter),
    LastModifiedDate: S.optional(SaaSProductLastModifiedDateFilter),
  }),
).annotate({
  identifier: "SaaSProductFilters",
}) as any as S.Schema<SaaSProductFilters>;
export type AmiProductEntityIdString = string;
export type AmiProductEntityIdFilterValueList = string[];
export const AmiProductEntityIdFilterValueList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface AmiProductEntityIdFilter {
  ValueList?: string[];
}
export const AmiProductEntityIdFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ValueList: S.optional(AmiProductEntityIdFilterValueList) }),
).annotate({
  identifier: "AmiProductEntityIdFilter",
}) as any as S.Schema<AmiProductEntityIdFilter>;
export interface AmiProductLastModifiedDateFilterDateRange {
  AfterValue?: string;
  BeforeValue?: string;
}
export const AmiProductLastModifiedDateFilterDateRange =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AfterValue: S.optional(S.String),
      BeforeValue: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AmiProductLastModifiedDateFilterDateRange",
  }) as any as S.Schema<AmiProductLastModifiedDateFilterDateRange>;
export interface AmiProductLastModifiedDateFilter {
  DateRange?: AmiProductLastModifiedDateFilterDateRange;
}
export const AmiProductLastModifiedDateFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DateRange: S.optional(AmiProductLastModifiedDateFilterDateRange),
  }),
).annotate({
  identifier: "AmiProductLastModifiedDateFilter",
}) as any as S.Schema<AmiProductLastModifiedDateFilter>;
export type AmiProductTitleString = string;
export type AmiProductTitleFilterValueList = string[];
export const AmiProductTitleFilterValueList = /*@__PURE__*/ S.Array(S.String);
export interface AmiProductTitleFilter {
  ValueList?: string[];
  WildCardValue?: string;
}
export const AmiProductTitleFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ValueList: S.optional(AmiProductTitleFilterValueList),
    WildCardValue: S.optional(S.String),
  }),
).annotate({
  identifier: "AmiProductTitleFilter",
}) as any as S.Schema<AmiProductTitleFilter>;
export type AmiProductVisibilityString =
  | "Limited"
  | "Public"
  | "Restricted"
  | "Draft"
  | (string & {});
export const AmiProductVisibilityString = S.String;

export type AmiProductVisibilityFilterValueList = AmiProductVisibilityString[];
export const AmiProductVisibilityFilterValueList = /*@__PURE__*/ S.Array(
  AmiProductVisibilityString,
);
export interface AmiProductVisibilityFilter {
  ValueList?: AmiProductVisibilityString[];
}
export const AmiProductVisibilityFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ValueList: S.optional(AmiProductVisibilityFilterValueList) }),
).annotate({
  identifier: "AmiProductVisibilityFilter",
}) as any as S.Schema<AmiProductVisibilityFilter>;
export interface AmiProductFilters {
  EntityId?: AmiProductEntityIdFilter;
  LastModifiedDate?: AmiProductLastModifiedDateFilter;
  ProductTitle?: AmiProductTitleFilter;
  Visibility?: AmiProductVisibilityFilter;
}
export const AmiProductFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EntityId: S.optional(AmiProductEntityIdFilter),
    LastModifiedDate: S.optional(AmiProductLastModifiedDateFilter),
    ProductTitle: S.optional(AmiProductTitleFilter),
    Visibility: S.optional(AmiProductVisibilityFilter),
  }),
).annotate({
  identifier: "AmiProductFilters",
}) as any as S.Schema<AmiProductFilters>;
export type OfferEntityIdString = string;
export type OfferEntityIdFilterValueList = string[];
export const OfferEntityIdFilterValueList = /*@__PURE__*/ S.Array(S.String);
export interface OfferEntityIdFilter {
  ValueList?: string[];
}
export const OfferEntityIdFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ValueList: S.optional(OfferEntityIdFilterValueList) }),
).annotate({
  identifier: "OfferEntityIdFilter",
}) as any as S.Schema<OfferEntityIdFilter>;
export type OfferNameString = string;
export type OfferNameFilterValueList = string[];
export const OfferNameFilterValueList = /*@__PURE__*/ S.Array(S.String);
export interface OfferNameFilter {
  ValueList?: string[];
  WildCardValue?: string;
}
export const OfferNameFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ValueList: S.optional(OfferNameFilterValueList),
    WildCardValue: S.optional(S.String),
  }),
).annotate({
  identifier: "OfferNameFilter",
}) as any as S.Schema<OfferNameFilter>;
export type OfferProductIdString = string;
export type OfferProductIdFilterValueList = string[];
export const OfferProductIdFilterValueList = /*@__PURE__*/ S.Array(S.String);
export interface OfferProductIdFilter {
  ValueList?: string[];
}
export const OfferProductIdFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ValueList: S.optional(OfferProductIdFilterValueList) }),
).annotate({
  identifier: "OfferProductIdFilter",
}) as any as S.Schema<OfferProductIdFilter>;
export type OfferResaleAuthorizationIdString = string;
export type OfferResaleAuthorizationIdFilterValueList = string[];
export const OfferResaleAuthorizationIdFilterValueList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface OfferResaleAuthorizationIdFilter {
  ValueList?: string[];
}
export const OfferResaleAuthorizationIdFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ValueList: S.optional(OfferResaleAuthorizationIdFilterValueList),
  }),
).annotate({
  identifier: "OfferResaleAuthorizationIdFilter",
}) as any as S.Schema<OfferResaleAuthorizationIdFilter>;
export interface OfferReleaseDateFilterDateRange {
  AfterValue?: string;
  BeforeValue?: string;
}
export const OfferReleaseDateFilterDateRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AfterValue: S.optional(S.String),
    BeforeValue: S.optional(S.String),
  }),
).annotate({
  identifier: "OfferReleaseDateFilterDateRange",
}) as any as S.Schema<OfferReleaseDateFilterDateRange>;
export interface OfferReleaseDateFilter {
  DateRange?: OfferReleaseDateFilterDateRange;
}
export const OfferReleaseDateFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DateRange: S.optional(OfferReleaseDateFilterDateRange) }),
).annotate({
  identifier: "OfferReleaseDateFilter",
}) as any as S.Schema<OfferReleaseDateFilter>;
export interface OfferAvailabilityEndDateFilterDateRange {
  AfterValue?: string;
  BeforeValue?: string;
}
export const OfferAvailabilityEndDateFilterDateRange = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AfterValue: S.optional(S.String),
      BeforeValue: S.optional(S.String),
    }),
).annotate({
  identifier: "OfferAvailabilityEndDateFilterDateRange",
}) as any as S.Schema<OfferAvailabilityEndDateFilterDateRange>;
export interface OfferAvailabilityEndDateFilter {
  DateRange?: OfferAvailabilityEndDateFilterDateRange;
}
export const OfferAvailabilityEndDateFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DateRange: S.optional(OfferAvailabilityEndDateFilterDateRange) }),
).annotate({
  identifier: "OfferAvailabilityEndDateFilter",
}) as any as S.Schema<OfferAvailabilityEndDateFilter>;
export type OfferBuyerAccountsFilterWildcard = string;
export interface OfferBuyerAccountsFilter {
  WildCardValue?: string;
}
export const OfferBuyerAccountsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WildCardValue: S.optional(S.String) }),
).annotate({
  identifier: "OfferBuyerAccountsFilter",
}) as any as S.Schema<OfferBuyerAccountsFilter>;
export type OfferStateString = "Draft" | "Released" | (string & {});
export const OfferStateString = S.String;

export type OfferStateFilterValueList = OfferStateString[];
export const OfferStateFilterValueList =
  /*@__PURE__*/ S.Array(OfferStateString);
export interface OfferStateFilter {
  ValueList?: OfferStateString[];
}
export const OfferStateFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ValueList: S.optional(OfferStateFilterValueList) }),
).annotate({
  identifier: "OfferStateFilter",
}) as any as S.Schema<OfferStateFilter>;
export type OfferTargetingString =
  | "BuyerAccounts"
  | "ParticipatingPrograms"
  | "CountryCodes"
  | "None"
  | (string & {});
export const OfferTargetingString = S.String;

export type OfferTargetingFilterValueList = OfferTargetingString[];
export const OfferTargetingFilterValueList =
  /*@__PURE__*/ S.Array(OfferTargetingString);
export interface OfferTargetingFilter {
  ValueList?: OfferTargetingString[];
}
export const OfferTargetingFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ValueList: S.optional(OfferTargetingFilterValueList) }),
).annotate({
  identifier: "OfferTargetingFilter",
}) as any as S.Schema<OfferTargetingFilter>;
export interface OfferLastModifiedDateFilterDateRange {
  AfterValue?: string;
  BeforeValue?: string;
}
export const OfferLastModifiedDateFilterDateRange = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AfterValue: S.optional(S.String),
      BeforeValue: S.optional(S.String),
    }),
).annotate({
  identifier: "OfferLastModifiedDateFilterDateRange",
}) as any as S.Schema<OfferLastModifiedDateFilterDateRange>;
export interface OfferLastModifiedDateFilter {
  DateRange?: OfferLastModifiedDateFilterDateRange;
}
export const OfferLastModifiedDateFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DateRange: S.optional(OfferLastModifiedDateFilterDateRange) }),
).annotate({
  identifier: "OfferLastModifiedDateFilter",
}) as any as S.Schema<OfferLastModifiedDateFilter>;
export type OfferSetIdString = string;
export type OfferSetIdFilterValueList = string[];
export const OfferSetIdFilterValueList = /*@__PURE__*/ S.Array(S.String);
export interface OfferSetIdFilter {
  ValueList?: string[];
}
export const OfferSetIdFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ValueList: S.optional(OfferSetIdFilterValueList) }),
).annotate({
  identifier: "OfferSetIdFilter",
}) as any as S.Schema<OfferSetIdFilter>;
export type OfferTargetAgreementIdString = string;
export type OfferTargetAgreementIdFilterValueList = string[];
export const OfferTargetAgreementIdFilterValueList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface OfferTargetAgreementIdFilter {
  ValueList?: string[];
}
export const OfferTargetAgreementIdFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ValueList: S.optional(OfferTargetAgreementIdFilterValueList) }),
).annotate({
  identifier: "OfferTargetAgreementIdFilter",
}) as any as S.Schema<OfferTargetAgreementIdFilter>;
export type OfferTargetAgreementIntentString = "Renew" | (string & {});
export const OfferTargetAgreementIntentString = S.String;

export type OfferTargetAgreementIntentFilterValueList =
  OfferTargetAgreementIntentString[];
export const OfferTargetAgreementIntentFilterValueList = /*@__PURE__*/ S.Array(
  OfferTargetAgreementIntentString,
);
export interface OfferTargetAgreementIntentFilter {
  ValueList?: OfferTargetAgreementIntentString[];
}
export const OfferTargetAgreementIntentFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ValueList: S.optional(OfferTargetAgreementIntentFilterValueList),
  }),
).annotate({
  identifier: "OfferTargetAgreementIntentFilter",
}) as any as S.Schema<OfferTargetAgreementIntentFilter>;
export type OfferCreatedBySourceString =
  | "Seller"
  | "AwsMarketplace"
  | (string & {});
export const OfferCreatedBySourceString = S.String;

export type OfferCreatedBySourceFilterValueList = OfferCreatedBySourceString[];
export const OfferCreatedBySourceFilterValueList = /*@__PURE__*/ S.Array(
  OfferCreatedBySourceString,
);
export interface OfferCreatedBySourceFilter {
  ValueList?: OfferCreatedBySourceString[];
}
export const OfferCreatedBySourceFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ValueList: S.optional(OfferCreatedBySourceFilterValueList) }),
).annotate({
  identifier: "OfferCreatedBySourceFilter",
}) as any as S.Schema<OfferCreatedBySourceFilter>;
export interface OfferFilters {
  EntityId?: OfferEntityIdFilter;
  Name?: OfferNameFilter;
  ProductId?: OfferProductIdFilter;
  ResaleAuthorizationId?: OfferResaleAuthorizationIdFilter;
  ReleaseDate?: OfferReleaseDateFilter;
  AvailabilityEndDate?: OfferAvailabilityEndDateFilter;
  BuyerAccounts?: OfferBuyerAccountsFilter;
  State?: OfferStateFilter;
  Targeting?: OfferTargetingFilter;
  LastModifiedDate?: OfferLastModifiedDateFilter;
  OfferSetId?: OfferSetIdFilter;
  TargetAgreementId?: OfferTargetAgreementIdFilter;
  TargetAgreementIntent?: OfferTargetAgreementIntentFilter;
  CreatedBySource?: OfferCreatedBySourceFilter;
}
export const OfferFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EntityId: S.optional(OfferEntityIdFilter),
    Name: S.optional(OfferNameFilter),
    ProductId: S.optional(OfferProductIdFilter),
    ResaleAuthorizationId: S.optional(OfferResaleAuthorizationIdFilter),
    ReleaseDate: S.optional(OfferReleaseDateFilter),
    AvailabilityEndDate: S.optional(OfferAvailabilityEndDateFilter),
    BuyerAccounts: S.optional(OfferBuyerAccountsFilter),
    State: S.optional(OfferStateFilter),
    Targeting: S.optional(OfferTargetingFilter),
    LastModifiedDate: S.optional(OfferLastModifiedDateFilter),
    OfferSetId: S.optional(OfferSetIdFilter),
    TargetAgreementId: S.optional(OfferTargetAgreementIdFilter),
    TargetAgreementIntent: S.optional(OfferTargetAgreementIntentFilter),
    CreatedBySource: S.optional(OfferCreatedBySourceFilter),
  }),
).annotate({ identifier: "OfferFilters" }) as any as S.Schema<OfferFilters>;
export type ContainerProductEntityIdString = string;
export type ContainerProductEntityIdFilterValueList = string[];
export const ContainerProductEntityIdFilterValueList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface ContainerProductEntityIdFilter {
  ValueList?: string[];
}
export const ContainerProductEntityIdFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ValueList: S.optional(ContainerProductEntityIdFilterValueList) }),
).annotate({
  identifier: "ContainerProductEntityIdFilter",
}) as any as S.Schema<ContainerProductEntityIdFilter>;
export interface ContainerProductLastModifiedDateFilterDateRange {
  AfterValue?: string;
  BeforeValue?: string;
}
export const ContainerProductLastModifiedDateFilterDateRange =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AfterValue: S.optional(S.String),
      BeforeValue: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ContainerProductLastModifiedDateFilterDateRange",
  }) as any as S.Schema<ContainerProductLastModifiedDateFilterDateRange>;
export interface ContainerProductLastModifiedDateFilter {
  DateRange?: ContainerProductLastModifiedDateFilterDateRange;
}
export const ContainerProductLastModifiedDateFilter = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DateRange: S.optional(ContainerProductLastModifiedDateFilterDateRange),
    }),
).annotate({
  identifier: "ContainerProductLastModifiedDateFilter",
}) as any as S.Schema<ContainerProductLastModifiedDateFilter>;
export type ContainerProductTitleString = string;
export type ContainerProductTitleFilterValueList = string[];
export const ContainerProductTitleFilterValueList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface ContainerProductTitleFilter {
  ValueList?: string[];
  WildCardValue?: string;
}
export const ContainerProductTitleFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ValueList: S.optional(ContainerProductTitleFilterValueList),
    WildCardValue: S.optional(S.String),
  }),
).annotate({
  identifier: "ContainerProductTitleFilter",
}) as any as S.Schema<ContainerProductTitleFilter>;
export type ContainerProductVisibilityString =
  | "Limited"
  | "Public"
  | "Restricted"
  | "Draft"
  | (string & {});
export const ContainerProductVisibilityString = S.String;

export type ContainerProductVisibilityFilterValueList =
  ContainerProductVisibilityString[];
export const ContainerProductVisibilityFilterValueList = /*@__PURE__*/ S.Array(
  ContainerProductVisibilityString,
);
export interface ContainerProductVisibilityFilter {
  ValueList?: ContainerProductVisibilityString[];
}
export const ContainerProductVisibilityFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ValueList: S.optional(ContainerProductVisibilityFilterValueList),
  }),
).annotate({
  identifier: "ContainerProductVisibilityFilter",
}) as any as S.Schema<ContainerProductVisibilityFilter>;
export interface ContainerProductFilters {
  EntityId?: ContainerProductEntityIdFilter;
  LastModifiedDate?: ContainerProductLastModifiedDateFilter;
  ProductTitle?: ContainerProductTitleFilter;
  Visibility?: ContainerProductVisibilityFilter;
}
export const ContainerProductFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EntityId: S.optional(ContainerProductEntityIdFilter),
    LastModifiedDate: S.optional(ContainerProductLastModifiedDateFilter),
    ProductTitle: S.optional(ContainerProductTitleFilter),
    Visibility: S.optional(ContainerProductVisibilityFilter),
  }),
).annotate({
  identifier: "ContainerProductFilters",
}) as any as S.Schema<ContainerProductFilters>;
export type ResaleAuthorizationEntityIdString = string;
export type ResaleAuthorizationEntityIdFilterValueList = string[];
export const ResaleAuthorizationEntityIdFilterValueList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface ResaleAuthorizationEntityIdFilter {
  ValueList?: string[];
}
export const ResaleAuthorizationEntityIdFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ValueList: S.optional(ResaleAuthorizationEntityIdFilterValueList),
  }),
).annotate({
  identifier: "ResaleAuthorizationEntityIdFilter",
}) as any as S.Schema<ResaleAuthorizationEntityIdFilter>;
export type ResaleAuthorizationNameString = string;
export type ResaleAuthorizationNameFilterValueList = string[];
export const ResaleAuthorizationNameFilterValueList = /*@__PURE__*/ S.Array(
  S.String,
);
export type ResaleAuthorizationNameFilterWildcard = string;
export interface ResaleAuthorizationNameFilter {
  ValueList?: string[];
  WildCardValue?: string;
}
export const ResaleAuthorizationNameFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ValueList: S.optional(ResaleAuthorizationNameFilterValueList),
    WildCardValue: S.optional(S.String),
  }),
).annotate({
  identifier: "ResaleAuthorizationNameFilter",
}) as any as S.Schema<ResaleAuthorizationNameFilter>;
export type ResaleAuthorizationProductIdString = string;
export type ResaleAuthorizationProductIdFilterValueList = string[];
export const ResaleAuthorizationProductIdFilterValueList =
  /*@__PURE__*/ S.Array(S.String);
export type ResaleAuthorizationProductIdFilterWildcard = string;
export interface ResaleAuthorizationProductIdFilter {
  ValueList?: string[];
  WildCardValue?: string;
}
export const ResaleAuthorizationProductIdFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ValueList: S.optional(ResaleAuthorizationProductIdFilterValueList),
    WildCardValue: S.optional(S.String),
  }),
).annotate({
  identifier: "ResaleAuthorizationProductIdFilter",
}) as any as S.Schema<ResaleAuthorizationProductIdFilter>;
export interface ResaleAuthorizationCreatedDateFilterDateRange {
  AfterValue?: string;
  BeforeValue?: string;
}
export const ResaleAuthorizationCreatedDateFilterDateRange =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AfterValue: S.optional(S.String),
      BeforeValue: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ResaleAuthorizationCreatedDateFilterDateRange",
  }) as any as S.Schema<ResaleAuthorizationCreatedDateFilterDateRange>;
export type ResaleAuthorizationCreatedDateFilterValueList = string[];
export const ResaleAuthorizationCreatedDateFilterValueList =
  /*@__PURE__*/ S.Array(S.String);
export interface ResaleAuthorizationCreatedDateFilter {
  DateRange?: ResaleAuthorizationCreatedDateFilterDateRange;
  ValueList?: string[];
}
export const ResaleAuthorizationCreatedDateFilter = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DateRange: S.optional(ResaleAuthorizationCreatedDateFilterDateRange),
      ValueList: S.optional(ResaleAuthorizationCreatedDateFilterValueList),
    }),
).annotate({
  identifier: "ResaleAuthorizationCreatedDateFilter",
}) as any as S.Schema<ResaleAuthorizationCreatedDateFilter>;
export interface ResaleAuthorizationAvailabilityEndDateFilterDateRange {
  AfterValue?: string;
  BeforeValue?: string;
}
export const ResaleAuthorizationAvailabilityEndDateFilterDateRange =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AfterValue: S.optional(S.String),
      BeforeValue: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ResaleAuthorizationAvailabilityEndDateFilterDateRange",
  }) as any as S.Schema<ResaleAuthorizationAvailabilityEndDateFilterDateRange>;
export type ResaleAuthorizationAvailabilityEndDateFilterValueList = string[];
export const ResaleAuthorizationAvailabilityEndDateFilterValueList =
  /*@__PURE__*/ S.Array(S.String);
export interface ResaleAuthorizationAvailabilityEndDateFilter {
  DateRange?: ResaleAuthorizationAvailabilityEndDateFilterDateRange;
  ValueList?: string[];
}
export const ResaleAuthorizationAvailabilityEndDateFilter =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DateRange: S.optional(
        ResaleAuthorizationAvailabilityEndDateFilterDateRange,
      ),
      ValueList: S.optional(
        ResaleAuthorizationAvailabilityEndDateFilterValueList,
      ),
    }),
  ).annotate({
    identifier: "ResaleAuthorizationAvailabilityEndDateFilter",
  }) as any as S.Schema<ResaleAuthorizationAvailabilityEndDateFilter>;
export type ResaleAuthorizationManufacturerAccountIdString = string;
export type ResaleAuthorizationManufacturerAccountIdFilterValueList = string[];
export const ResaleAuthorizationManufacturerAccountIdFilterValueList =
  /*@__PURE__*/ S.Array(S.String);
export type ResaleAuthorizationManufacturerAccountIdFilterWildcard = string;
export interface ResaleAuthorizationManufacturerAccountIdFilter {
  ValueList?: string[];
  WildCardValue?: string;
}
export const ResaleAuthorizationManufacturerAccountIdFilter =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ValueList: S.optional(
        ResaleAuthorizationManufacturerAccountIdFilterValueList,
      ),
      WildCardValue: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ResaleAuthorizationManufacturerAccountIdFilter",
  }) as any as S.Schema<ResaleAuthorizationManufacturerAccountIdFilter>;
export type ResaleAuthorizationProductNameString = string;
export type ResaleAuthorizationProductNameFilterValueList = string[];
export const ResaleAuthorizationProductNameFilterValueList =
  /*@__PURE__*/ S.Array(S.String);
export type ResaleAuthorizationProductNameFilterWildcard = string;
export interface ResaleAuthorizationProductNameFilter {
  ValueList?: string[];
  WildCardValue?: string;
}
export const ResaleAuthorizationProductNameFilter = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ValueList: S.optional(ResaleAuthorizationProductNameFilterValueList),
      WildCardValue: S.optional(S.String),
    }),
).annotate({
  identifier: "ResaleAuthorizationProductNameFilter",
}) as any as S.Schema<ResaleAuthorizationProductNameFilter>;
export type ResaleAuthorizationManufacturerLegalNameString = string;
export type ResaleAuthorizationManufacturerLegalNameFilterValueList = string[];
export const ResaleAuthorizationManufacturerLegalNameFilterValueList =
  /*@__PURE__*/ S.Array(S.String);
export type ResaleAuthorizationManufacturerLegalNameFilterWildcard = string;
export interface ResaleAuthorizationManufacturerLegalNameFilter {
  ValueList?: string[];
  WildCardValue?: string;
}
export const ResaleAuthorizationManufacturerLegalNameFilter =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ValueList: S.optional(
        ResaleAuthorizationManufacturerLegalNameFilterValueList,
      ),
      WildCardValue: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ResaleAuthorizationManufacturerLegalNameFilter",
  }) as any as S.Schema<ResaleAuthorizationManufacturerLegalNameFilter>;
export type ResaleAuthorizationResellerAccountIDString = string;
export type ResaleAuthorizationResellerAccountIDFilterValueList = string[];
export const ResaleAuthorizationResellerAccountIDFilterValueList =
  /*@__PURE__*/ S.Array(S.String);
export type ResaleAuthorizationResellerAccountIDFilterWildcard = string;
export interface ResaleAuthorizationResellerAccountIDFilter {
  ValueList?: string[];
  WildCardValue?: string;
}
export const ResaleAuthorizationResellerAccountIDFilter =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ValueList: S.optional(
        ResaleAuthorizationResellerAccountIDFilterValueList,
      ),
      WildCardValue: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ResaleAuthorizationResellerAccountIDFilter",
  }) as any as S.Schema<ResaleAuthorizationResellerAccountIDFilter>;
export type ResaleAuthorizationResellerLegalNameString = string;
export type ResaleAuthorizationResellerLegalNameFilterValueList = string[];
export const ResaleAuthorizationResellerLegalNameFilterValueList =
  /*@__PURE__*/ S.Array(S.String);
export type ResaleAuthorizationResellerLegalNameFilterWildcard = string;
export interface ResaleAuthorizationResellerLegalNameFilter {
  ValueList?: string[];
  WildCardValue?: string;
}
export const ResaleAuthorizationResellerLegalNameFilter =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ValueList: S.optional(
        ResaleAuthorizationResellerLegalNameFilterValueList,
      ),
      WildCardValue: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ResaleAuthorizationResellerLegalNameFilter",
  }) as any as S.Schema<ResaleAuthorizationResellerLegalNameFilter>;
export type ResaleAuthorizationStatusString =
  | "Draft"
  | "Active"
  | "Restricted"
  | (string & {});
export const ResaleAuthorizationStatusString = S.String;

export type ResaleAuthorizationStatusFilterValueList =
  ResaleAuthorizationStatusString[];
export const ResaleAuthorizationStatusFilterValueList = /*@__PURE__*/ S.Array(
  ResaleAuthorizationStatusString,
);
export interface ResaleAuthorizationStatusFilter {
  ValueList?: ResaleAuthorizationStatusString[];
}
export const ResaleAuthorizationStatusFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ValueList: S.optional(ResaleAuthorizationStatusFilterValueList) }),
).annotate({
  identifier: "ResaleAuthorizationStatusFilter",
}) as any as S.Schema<ResaleAuthorizationStatusFilter>;
export type ResaleAuthorizationOfferExtendedStatusString = string;
export type ResaleAuthorizationOfferExtendedStatusFilterValueList = string[];
export const ResaleAuthorizationOfferExtendedStatusFilterValueList =
  /*@__PURE__*/ S.Array(S.String);
export interface ResaleAuthorizationOfferExtendedStatusFilter {
  ValueList?: string[];
}
export const ResaleAuthorizationOfferExtendedStatusFilter =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ValueList: S.optional(
        ResaleAuthorizationOfferExtendedStatusFilterValueList,
      ),
    }),
  ).annotate({
    identifier: "ResaleAuthorizationOfferExtendedStatusFilter",
  }) as any as S.Schema<ResaleAuthorizationOfferExtendedStatusFilter>;
export interface ResaleAuthorizationLastModifiedDateFilterDateRange {
  AfterValue?: string;
  BeforeValue?: string;
}
export const ResaleAuthorizationLastModifiedDateFilterDateRange =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AfterValue: S.optional(S.String),
      BeforeValue: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ResaleAuthorizationLastModifiedDateFilterDateRange",
  }) as any as S.Schema<ResaleAuthorizationLastModifiedDateFilterDateRange>;
export interface ResaleAuthorizationLastModifiedDateFilter {
  DateRange?: ResaleAuthorizationLastModifiedDateFilterDateRange;
}
export const ResaleAuthorizationLastModifiedDateFilter =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DateRange: S.optional(ResaleAuthorizationLastModifiedDateFilterDateRange),
    }),
  ).annotate({
    identifier: "ResaleAuthorizationLastModifiedDateFilter",
  }) as any as S.Schema<ResaleAuthorizationLastModifiedDateFilter>;
export type ResaleAuthorizationResellerRoleString =
  | "ChannelPartner"
  | "Distributor"
  | (string & {});
export const ResaleAuthorizationResellerRoleString = S.String;

export type ResaleAuthorizationResellerRoleFilterValueList =
  ResaleAuthorizationResellerRoleString[];
export const ResaleAuthorizationResellerRoleFilterValueList =
  /*@__PURE__*/ S.Array(ResaleAuthorizationResellerRoleString);
export interface ResaleAuthorizationResellerRoleFilter {
  ValueList?: ResaleAuthorizationResellerRoleString[];
}
export const ResaleAuthorizationResellerRoleFilter = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ValueList: S.optional(ResaleAuthorizationResellerRoleFilterValueList),
    }),
).annotate({
  identifier: "ResaleAuthorizationResellerRoleFilter",
}) as any as S.Schema<ResaleAuthorizationResellerRoleFilter>;
export interface ResaleAuthorizationFilters {
  EntityId?: ResaleAuthorizationEntityIdFilter;
  Name?: ResaleAuthorizationNameFilter;
  ProductId?: ResaleAuthorizationProductIdFilter;
  CreatedDate?: ResaleAuthorizationCreatedDateFilter;
  AvailabilityEndDate?: ResaleAuthorizationAvailabilityEndDateFilter;
  ManufacturerAccountId?: ResaleAuthorizationManufacturerAccountIdFilter;
  ProductName?: ResaleAuthorizationProductNameFilter;
  ManufacturerLegalName?: ResaleAuthorizationManufacturerLegalNameFilter;
  ResellerAccountID?: ResaleAuthorizationResellerAccountIDFilter;
  ResellerLegalName?: ResaleAuthorizationResellerLegalNameFilter;
  Status?: ResaleAuthorizationStatusFilter;
  OfferExtendedStatus?: ResaleAuthorizationOfferExtendedStatusFilter;
  LastModifiedDate?: ResaleAuthorizationLastModifiedDateFilter;
  ResellerRole?: ResaleAuthorizationResellerRoleFilter;
}
export const ResaleAuthorizationFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EntityId: S.optional(ResaleAuthorizationEntityIdFilter),
    Name: S.optional(ResaleAuthorizationNameFilter),
    ProductId: S.optional(ResaleAuthorizationProductIdFilter),
    CreatedDate: S.optional(ResaleAuthorizationCreatedDateFilter),
    AvailabilityEndDate: S.optional(
      ResaleAuthorizationAvailabilityEndDateFilter,
    ),
    ManufacturerAccountId: S.optional(
      ResaleAuthorizationManufacturerAccountIdFilter,
    ),
    ProductName: S.optional(ResaleAuthorizationProductNameFilter),
    ManufacturerLegalName: S.optional(
      ResaleAuthorizationManufacturerLegalNameFilter,
    ),
    ResellerAccountID: S.optional(ResaleAuthorizationResellerAccountIDFilter),
    ResellerLegalName: S.optional(ResaleAuthorizationResellerLegalNameFilter),
    Status: S.optional(ResaleAuthorizationStatusFilter),
    OfferExtendedStatus: S.optional(
      ResaleAuthorizationOfferExtendedStatusFilter,
    ),
    LastModifiedDate: S.optional(ResaleAuthorizationLastModifiedDateFilter),
    ResellerRole: S.optional(ResaleAuthorizationResellerRoleFilter),
  }),
).annotate({
  identifier: "ResaleAuthorizationFilters",
}) as any as S.Schema<ResaleAuthorizationFilters>;
export type MachineLearningProductEntityIdString = string;
export type MachineLearningProductEntityIdFilterValueList = string[];
export const MachineLearningProductEntityIdFilterValueList =
  /*@__PURE__*/ S.Array(S.String);
export interface MachineLearningProductEntityIdFilter {
  ValueList?: string[];
}
export const MachineLearningProductEntityIdFilter = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ValueList: S.optional(MachineLearningProductEntityIdFilterValueList),
    }),
).annotate({
  identifier: "MachineLearningProductEntityIdFilter",
}) as any as S.Schema<MachineLearningProductEntityIdFilter>;
export interface MachineLearningProductLastModifiedDateFilterDateRange {
  AfterValue?: string;
  BeforeValue?: string;
}
export const MachineLearningProductLastModifiedDateFilterDateRange =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AfterValue: S.optional(S.String),
      BeforeValue: S.optional(S.String),
    }),
  ).annotate({
    identifier: "MachineLearningProductLastModifiedDateFilterDateRange",
  }) as any as S.Schema<MachineLearningProductLastModifiedDateFilterDateRange>;
export interface MachineLearningProductLastModifiedDateFilter {
  DateRange?: MachineLearningProductLastModifiedDateFilterDateRange;
}
export const MachineLearningProductLastModifiedDateFilter =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DateRange: S.optional(
        MachineLearningProductLastModifiedDateFilterDateRange,
      ),
    }),
  ).annotate({
    identifier: "MachineLearningProductLastModifiedDateFilter",
  }) as any as S.Schema<MachineLearningProductLastModifiedDateFilter>;
export type MachineLearningProductTitleString = string;
export type MachineLearningProductTitleFilterValueList = string[];
export const MachineLearningProductTitleFilterValueList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface MachineLearningProductTitleFilter {
  ValueList?: string[];
  WildCardValue?: string;
}
export const MachineLearningProductTitleFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ValueList: S.optional(MachineLearningProductTitleFilterValueList),
    WildCardValue: S.optional(S.String),
  }),
).annotate({
  identifier: "MachineLearningProductTitleFilter",
}) as any as S.Schema<MachineLearningProductTitleFilter>;
export type MachineLearningProductVisibilityString =
  | "Limited"
  | "Public"
  | "Restricted"
  | "Draft"
  | (string & {});
export const MachineLearningProductVisibilityString = S.String;

export type MachineLearningProductVisibilityFilterValueList =
  MachineLearningProductVisibilityString[];
export const MachineLearningProductVisibilityFilterValueList =
  /*@__PURE__*/ S.Array(MachineLearningProductVisibilityString);
export interface MachineLearningProductVisibilityFilter {
  ValueList?: MachineLearningProductVisibilityString[];
}
export const MachineLearningProductVisibilityFilter = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ValueList: S.optional(MachineLearningProductVisibilityFilterValueList),
    }),
).annotate({
  identifier: "MachineLearningProductVisibilityFilter",
}) as any as S.Schema<MachineLearningProductVisibilityFilter>;
export interface MachineLearningProductFilters {
  EntityId?: MachineLearningProductEntityIdFilter;
  LastModifiedDate?: MachineLearningProductLastModifiedDateFilter;
  ProductTitle?: MachineLearningProductTitleFilter;
  Visibility?: MachineLearningProductVisibilityFilter;
}
export const MachineLearningProductFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EntityId: S.optional(MachineLearningProductEntityIdFilter),
    LastModifiedDate: S.optional(MachineLearningProductLastModifiedDateFilter),
    ProductTitle: S.optional(MachineLearningProductTitleFilter),
    Visibility: S.optional(MachineLearningProductVisibilityFilter),
  }),
).annotate({
  identifier: "MachineLearningProductFilters",
}) as any as S.Schema<MachineLearningProductFilters>;
export type OfferSetEntityIdString = string;
export type OfferSetEntityIdFilterValueList = string[];
export const OfferSetEntityIdFilterValueList = /*@__PURE__*/ S.Array(S.String);
export interface OfferSetEntityIdFilter {
  ValueList?: string[];
}
export const OfferSetEntityIdFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ValueList: S.optional(OfferSetEntityIdFilterValueList) }),
).annotate({
  identifier: "OfferSetEntityIdFilter",
}) as any as S.Schema<OfferSetEntityIdFilter>;
export type OfferSetNameString = string;
export type OfferSetNameFilterValueList = string[];
export const OfferSetNameFilterValueList = /*@__PURE__*/ S.Array(S.String);
export interface OfferSetNameFilter {
  ValueList?: string[];
}
export const OfferSetNameFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ValueList: S.optional(OfferSetNameFilterValueList) }),
).annotate({
  identifier: "OfferSetNameFilter",
}) as any as S.Schema<OfferSetNameFilter>;
export type OfferSetStateString = "Draft" | "Released" | (string & {});
export const OfferSetStateString = S.String;

export type OfferSetStateFilterValueList = OfferSetStateString[];
export const OfferSetStateFilterValueList =
  /*@__PURE__*/ S.Array(OfferSetStateString);
export interface OfferSetStateFilter {
  ValueList?: OfferSetStateString[];
}
export const OfferSetStateFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ValueList: S.optional(OfferSetStateFilterValueList) }),
).annotate({
  identifier: "OfferSetStateFilter",
}) as any as S.Schema<OfferSetStateFilter>;
export interface OfferSetReleaseDateFilterDateRange {
  AfterValue?: string;
  BeforeValue?: string;
}
export const OfferSetReleaseDateFilterDateRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AfterValue: S.optional(S.String),
    BeforeValue: S.optional(S.String),
  }),
).annotate({
  identifier: "OfferSetReleaseDateFilterDateRange",
}) as any as S.Schema<OfferSetReleaseDateFilterDateRange>;
export interface OfferSetReleaseDateFilter {
  DateRange?: OfferSetReleaseDateFilterDateRange;
}
export const OfferSetReleaseDateFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DateRange: S.optional(OfferSetReleaseDateFilterDateRange) }),
).annotate({
  identifier: "OfferSetReleaseDateFilter",
}) as any as S.Schema<OfferSetReleaseDateFilter>;
export type OfferSetAssociatedOfferIdsString = string;
export type OfferSetAssociatedOfferIdsFilterValueList = string[];
export const OfferSetAssociatedOfferIdsFilterValueList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface OfferSetAssociatedOfferIdsFilter {
  ValueList?: string[];
}
export const OfferSetAssociatedOfferIdsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ValueList: S.optional(OfferSetAssociatedOfferIdsFilterValueList),
  }),
).annotate({
  identifier: "OfferSetAssociatedOfferIdsFilter",
}) as any as S.Schema<OfferSetAssociatedOfferIdsFilter>;
export type OfferSetSolutionIdString = string;
export type OfferSetSolutionIdFilterValueList = string[];
export const OfferSetSolutionIdFilterValueList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface OfferSetSolutionIdFilter {
  ValueList?: string[];
}
export const OfferSetSolutionIdFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ValueList: S.optional(OfferSetSolutionIdFilterValueList) }),
).annotate({
  identifier: "OfferSetSolutionIdFilter",
}) as any as S.Schema<OfferSetSolutionIdFilter>;
export interface OfferSetLastModifiedDateFilterDateRange {
  AfterValue?: string;
  BeforeValue?: string;
}
export const OfferSetLastModifiedDateFilterDateRange = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AfterValue: S.optional(S.String),
      BeforeValue: S.optional(S.String),
    }),
).annotate({
  identifier: "OfferSetLastModifiedDateFilterDateRange",
}) as any as S.Schema<OfferSetLastModifiedDateFilterDateRange>;
export interface OfferSetLastModifiedDateFilter {
  DateRange?: OfferSetLastModifiedDateFilterDateRange;
}
export const OfferSetLastModifiedDateFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DateRange: S.optional(OfferSetLastModifiedDateFilterDateRange) }),
).annotate({
  identifier: "OfferSetLastModifiedDateFilter",
}) as any as S.Schema<OfferSetLastModifiedDateFilter>;
export interface OfferSetFilters {
  EntityId?: OfferSetEntityIdFilter;
  Name?: OfferSetNameFilter;
  State?: OfferSetStateFilter;
  ReleaseDate?: OfferSetReleaseDateFilter;
  AssociatedOfferIds?: OfferSetAssociatedOfferIdsFilter;
  SolutionId?: OfferSetSolutionIdFilter;
  LastModifiedDate?: OfferSetLastModifiedDateFilter;
}
export const OfferSetFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EntityId: S.optional(OfferSetEntityIdFilter),
    Name: S.optional(OfferSetNameFilter),
    State: S.optional(OfferSetStateFilter),
    ReleaseDate: S.optional(OfferSetReleaseDateFilter),
    AssociatedOfferIds: S.optional(OfferSetAssociatedOfferIdsFilter),
    SolutionId: S.optional(OfferSetSolutionIdFilter),
    LastModifiedDate: S.optional(OfferSetLastModifiedDateFilter),
  }),
).annotate({
  identifier: "OfferSetFilters",
}) as any as S.Schema<OfferSetFilters>;
export type EntityTypeFilters =
  | {
      DataProductFilters: DataProductFilters;
      SaaSProductFilters?: never;
      AmiProductFilters?: never;
      OfferFilters?: never;
      ContainerProductFilters?: never;
      ResaleAuthorizationFilters?: never;
      MachineLearningProductFilters?: never;
      OfferSetFilters?: never;
    }
  | {
      DataProductFilters?: never;
      SaaSProductFilters: SaaSProductFilters;
      AmiProductFilters?: never;
      OfferFilters?: never;
      ContainerProductFilters?: never;
      ResaleAuthorizationFilters?: never;
      MachineLearningProductFilters?: never;
      OfferSetFilters?: never;
    }
  | {
      DataProductFilters?: never;
      SaaSProductFilters?: never;
      AmiProductFilters: AmiProductFilters;
      OfferFilters?: never;
      ContainerProductFilters?: never;
      ResaleAuthorizationFilters?: never;
      MachineLearningProductFilters?: never;
      OfferSetFilters?: never;
    }
  | {
      DataProductFilters?: never;
      SaaSProductFilters?: never;
      AmiProductFilters?: never;
      OfferFilters: OfferFilters;
      ContainerProductFilters?: never;
      ResaleAuthorizationFilters?: never;
      MachineLearningProductFilters?: never;
      OfferSetFilters?: never;
    }
  | {
      DataProductFilters?: never;
      SaaSProductFilters?: never;
      AmiProductFilters?: never;
      OfferFilters?: never;
      ContainerProductFilters: ContainerProductFilters;
      ResaleAuthorizationFilters?: never;
      MachineLearningProductFilters?: never;
      OfferSetFilters?: never;
    }
  | {
      DataProductFilters?: never;
      SaaSProductFilters?: never;
      AmiProductFilters?: never;
      OfferFilters?: never;
      ContainerProductFilters?: never;
      ResaleAuthorizationFilters: ResaleAuthorizationFilters;
      MachineLearningProductFilters?: never;
      OfferSetFilters?: never;
    }
  | {
      DataProductFilters?: never;
      SaaSProductFilters?: never;
      AmiProductFilters?: never;
      OfferFilters?: never;
      ContainerProductFilters?: never;
      ResaleAuthorizationFilters?: never;
      MachineLearningProductFilters: MachineLearningProductFilters;
      OfferSetFilters?: never;
    }
  | {
      DataProductFilters?: never;
      SaaSProductFilters?: never;
      AmiProductFilters?: never;
      OfferFilters?: never;
      ContainerProductFilters?: never;
      ResaleAuthorizationFilters?: never;
      MachineLearningProductFilters?: never;
      OfferSetFilters: OfferSetFilters;
    };
export const EntityTypeFilters = /*@__PURE__*/ S.Union([
  S.Struct({ DataProductFilters: DataProductFilters }),
  S.Struct({ SaaSProductFilters: SaaSProductFilters }),
  S.Struct({ AmiProductFilters: AmiProductFilters }),
  S.Struct({ OfferFilters: OfferFilters }),
  S.Struct({ ContainerProductFilters: ContainerProductFilters }),
  S.Struct({ ResaleAuthorizationFilters: ResaleAuthorizationFilters }),
  S.Struct({ MachineLearningProductFilters: MachineLearningProductFilters }),
  S.Struct({ OfferSetFilters: OfferSetFilters }),
]);
export type DataProductSortBy =
  | "EntityId"
  | "ProductTitle"
  | "Visibility"
  | "LastModifiedDate"
  | (string & {});
export const DataProductSortBy = S.String;

export interface DataProductSort {
  SortBy?: DataProductSortBy;
  SortOrder?: SortOrder;
}
export const DataProductSort = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SortBy: S.optional(DataProductSortBy),
    SortOrder: S.optional(SortOrder),
  }),
).annotate({
  identifier: "DataProductSort",
}) as any as S.Schema<DataProductSort>;
export type SaaSProductSortBy =
  | "EntityId"
  | "ProductTitle"
  | "Visibility"
  | "LastModifiedDate"
  | "DeliveryOptionTypes"
  | (string & {});
export const SaaSProductSortBy = S.String;

export interface SaaSProductSort {
  SortBy?: SaaSProductSortBy;
  SortOrder?: SortOrder;
}
export const SaaSProductSort = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SortBy: S.optional(SaaSProductSortBy),
    SortOrder: S.optional(SortOrder),
  }),
).annotate({
  identifier: "SaaSProductSort",
}) as any as S.Schema<SaaSProductSort>;
export type AmiProductSortBy =
  | "EntityId"
  | "LastModifiedDate"
  | "ProductTitle"
  | "Visibility"
  | (string & {});
export const AmiProductSortBy = S.String;

export interface AmiProductSort {
  SortBy?: AmiProductSortBy;
  SortOrder?: SortOrder;
}
export const AmiProductSort = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SortBy: S.optional(AmiProductSortBy),
    SortOrder: S.optional(SortOrder),
  }),
).annotate({ identifier: "AmiProductSort" }) as any as S.Schema<AmiProductSort>;
export type OfferSortBy =
  | "EntityId"
  | "Name"
  | "ProductId"
  | "ResaleAuthorizationId"
  | "ReleaseDate"
  | "AvailabilityEndDate"
  | "BuyerAccounts"
  | "State"
  | "Targeting"
  | "LastModifiedDate"
  | "OfferSetId"
  | "TargetAgreementId"
  | "TargetAgreementIntent"
  | "CreatedBySource"
  | (string & {});
export const OfferSortBy = S.String;

export interface OfferSort {
  SortBy?: OfferSortBy;
  SortOrder?: SortOrder;
}
export const OfferSort = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SortBy: S.optional(OfferSortBy),
    SortOrder: S.optional(SortOrder),
  }),
).annotate({ identifier: "OfferSort" }) as any as S.Schema<OfferSort>;
export type ContainerProductSortBy =
  | "EntityId"
  | "LastModifiedDate"
  | "ProductTitle"
  | "Visibility"
  | "CompatibleAWSServices"
  | (string & {});
export const ContainerProductSortBy = S.String;

export interface ContainerProductSort {
  SortBy?: ContainerProductSortBy;
  SortOrder?: SortOrder;
}
export const ContainerProductSort = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SortBy: S.optional(ContainerProductSortBy),
    SortOrder: S.optional(SortOrder),
  }),
).annotate({
  identifier: "ContainerProductSort",
}) as any as S.Schema<ContainerProductSort>;
export type ResaleAuthorizationSortBy =
  | "EntityId"
  | "Name"
  | "ProductId"
  | "ProductName"
  | "ManufacturerAccountId"
  | "ManufacturerLegalName"
  | "ResellerAccountID"
  | "ResellerLegalName"
  | "Status"
  | "OfferExtendedStatus"
  | "CreatedDate"
  | "AvailabilityEndDate"
  | "LastModifiedDate"
  | (string & {});
export const ResaleAuthorizationSortBy = S.String;

export interface ResaleAuthorizationSort {
  SortBy?: ResaleAuthorizationSortBy;
  SortOrder?: SortOrder;
}
export const ResaleAuthorizationSort = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SortBy: S.optional(ResaleAuthorizationSortBy),
    SortOrder: S.optional(SortOrder),
  }),
).annotate({
  identifier: "ResaleAuthorizationSort",
}) as any as S.Schema<ResaleAuthorizationSort>;
export type MachineLearningProductSortBy =
  | "EntityId"
  | "LastModifiedDate"
  | "ProductTitle"
  | "Visibility"
  | (string & {});
export const MachineLearningProductSortBy = S.String;

export interface MachineLearningProductSort {
  SortBy?: MachineLearningProductSortBy;
  SortOrder?: SortOrder;
}
export const MachineLearningProductSort = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SortBy: S.optional(MachineLearningProductSortBy),
    SortOrder: S.optional(SortOrder),
  }),
).annotate({
  identifier: "MachineLearningProductSort",
}) as any as S.Schema<MachineLearningProductSort>;
export type OfferSetSortBy =
  | "Name"
  | "State"
  | "ReleaseDate"
  | "SolutionId"
  | "EntityId"
  | "LastModifiedDate"
  | (string & {});
export const OfferSetSortBy = S.String;

export interface OfferSetSort {
  SortBy?: OfferSetSortBy;
  SortOrder?: SortOrder;
}
export const OfferSetSort = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SortBy: S.optional(OfferSetSortBy),
    SortOrder: S.optional(SortOrder),
  }),
).annotate({ identifier: "OfferSetSort" }) as any as S.Schema<OfferSetSort>;
export type EntityTypeSort =
  | {
      DataProductSort: DataProductSort;
      SaaSProductSort?: never;
      AmiProductSort?: never;
      OfferSort?: never;
      ContainerProductSort?: never;
      ResaleAuthorizationSort?: never;
      MachineLearningProductSort?: never;
      OfferSetSort?: never;
    }
  | {
      DataProductSort?: never;
      SaaSProductSort: SaaSProductSort;
      AmiProductSort?: never;
      OfferSort?: never;
      ContainerProductSort?: never;
      ResaleAuthorizationSort?: never;
      MachineLearningProductSort?: never;
      OfferSetSort?: never;
    }
  | {
      DataProductSort?: never;
      SaaSProductSort?: never;
      AmiProductSort: AmiProductSort;
      OfferSort?: never;
      ContainerProductSort?: never;
      ResaleAuthorizationSort?: never;
      MachineLearningProductSort?: never;
      OfferSetSort?: never;
    }
  | {
      DataProductSort?: never;
      SaaSProductSort?: never;
      AmiProductSort?: never;
      OfferSort: OfferSort;
      ContainerProductSort?: never;
      ResaleAuthorizationSort?: never;
      MachineLearningProductSort?: never;
      OfferSetSort?: never;
    }
  | {
      DataProductSort?: never;
      SaaSProductSort?: never;
      AmiProductSort?: never;
      OfferSort?: never;
      ContainerProductSort: ContainerProductSort;
      ResaleAuthorizationSort?: never;
      MachineLearningProductSort?: never;
      OfferSetSort?: never;
    }
  | {
      DataProductSort?: never;
      SaaSProductSort?: never;
      AmiProductSort?: never;
      OfferSort?: never;
      ContainerProductSort?: never;
      ResaleAuthorizationSort: ResaleAuthorizationSort;
      MachineLearningProductSort?: never;
      OfferSetSort?: never;
    }
  | {
      DataProductSort?: never;
      SaaSProductSort?: never;
      AmiProductSort?: never;
      OfferSort?: never;
      ContainerProductSort?: never;
      ResaleAuthorizationSort?: never;
      MachineLearningProductSort: MachineLearningProductSort;
      OfferSetSort?: never;
    }
  | {
      DataProductSort?: never;
      SaaSProductSort?: never;
      AmiProductSort?: never;
      OfferSort?: never;
      ContainerProductSort?: never;
      ResaleAuthorizationSort?: never;
      MachineLearningProductSort?: never;
      OfferSetSort: OfferSetSort;
    };
export const EntityTypeSort = /*@__PURE__*/ S.Union([
  S.Struct({ DataProductSort: DataProductSort }),
  S.Struct({ SaaSProductSort: SaaSProductSort }),
  S.Struct({ AmiProductSort: AmiProductSort }),
  S.Struct({ OfferSort: OfferSort }),
  S.Struct({ ContainerProductSort: ContainerProductSort }),
  S.Struct({ ResaleAuthorizationSort: ResaleAuthorizationSort }),
  S.Struct({ MachineLearningProductSort: MachineLearningProductSort }),
  S.Struct({ OfferSetSort: OfferSetSort }),
]);
export interface ListEntitiesRequest {
  Catalog: string;
  EntityType: string;
  FilterList?: Filter[];
  Sort?: Sort;
  NextToken?: string;
  MaxResults?: number;
  OwnershipType?: OwnershipType;
  EntityTypeFilters?: EntityTypeFilters;
  EntityTypeSort?: EntityTypeSort;
}
export const ListEntitiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    EntityType: S.String,
    FilterList: S.optional(FilterList),
    Sort: S.optional(Sort),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    OwnershipType: S.optional(OwnershipType),
    EntityTypeFilters: S.optional(EntityTypeFilters),
    EntityTypeSort: S.optional(EntityTypeSort),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListEntities" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEntitiesRequest",
}) as any as S.Schema<ListEntitiesRequest>;
export type EntityNameString = string;
export type VisibilityValue = string;
export interface AmiProductSummary {
  ProductTitle?: string;
  Visibility?: AmiProductVisibilityString;
}
export const AmiProductSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductTitle: S.optional(S.String),
    Visibility: S.optional(AmiProductVisibilityString),
  }),
).annotate({
  identifier: "AmiProductSummary",
}) as any as S.Schema<AmiProductSummary>;
export interface ContainerProductSummary {
  ProductTitle?: string;
  Visibility?: ContainerProductVisibilityString;
}
export const ContainerProductSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductTitle: S.optional(S.String),
    Visibility: S.optional(ContainerProductVisibilityString),
  }),
).annotate({
  identifier: "ContainerProductSummary",
}) as any as S.Schema<ContainerProductSummary>;
export interface DataProductSummary {
  ProductTitle?: string;
  Visibility?: DataProductVisibilityString;
}
export const DataProductSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductTitle: S.optional(S.String),
    Visibility: S.optional(DataProductVisibilityString),
  }),
).annotate({
  identifier: "DataProductSummary",
}) as any as S.Schema<DataProductSummary>;
export interface SaaSProductSummary {
  ProductTitle?: string;
  Visibility?: SaaSProductVisibilityString;
}
export const SaaSProductSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductTitle: S.optional(S.String),
    Visibility: S.optional(SaaSProductVisibilityString),
  }),
).annotate({
  identifier: "SaaSProductSummary",
}) as any as S.Schema<SaaSProductSummary>;
export type OfferBuyerAccountsString = string;
export type OfferBuyerAccountsList = string[];
export const OfferBuyerAccountsList = /*@__PURE__*/ S.Array(S.String);
export type OfferTargetingList = OfferTargetingString[];
export const OfferTargetingList = /*@__PURE__*/ S.Array(OfferTargetingString);
export interface OfferSummary {
  Name?: string;
  ProductId?: string;
  ResaleAuthorizationId?: string;
  ReleaseDate?: string;
  AvailabilityEndDate?: string;
  BuyerAccounts?: string[];
  State?: OfferStateString;
  Targeting?: OfferTargetingString[];
  OfferSetId?: string;
  TargetAgreementId?: string;
  TargetAgreementIntent?: OfferTargetAgreementIntentString;
  CreatedBySource?: OfferCreatedBySourceString;
}
export const OfferSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    ProductId: S.optional(S.String),
    ResaleAuthorizationId: S.optional(S.String),
    ReleaseDate: S.optional(S.String),
    AvailabilityEndDate: S.optional(S.String),
    BuyerAccounts: S.optional(OfferBuyerAccountsList),
    State: S.optional(OfferStateString),
    Targeting: S.optional(OfferTargetingList),
    OfferSetId: S.optional(S.String),
    TargetAgreementId: S.optional(S.String),
    TargetAgreementIntent: S.optional(OfferTargetAgreementIntentString),
    CreatedBySource: S.optional(OfferCreatedBySourceString),
  }),
).annotate({ identifier: "OfferSummary" }) as any as S.Schema<OfferSummary>;
export interface ResaleAuthorizationSummary {
  Name?: string;
  ProductId?: string;
  ProductName?: string;
  ManufacturerAccountId?: string;
  ManufacturerLegalName?: string;
  ResellerAccountID?: string;
  ResellerLegalName?: string;
  Status?: ResaleAuthorizationStatusString;
  OfferExtendedStatus?: string;
  CreatedDate?: string;
  AvailabilityEndDate?: string;
  ResellerRole?: ResaleAuthorizationResellerRoleString;
}
export const ResaleAuthorizationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    ProductId: S.optional(S.String),
    ProductName: S.optional(S.String),
    ManufacturerAccountId: S.optional(S.String),
    ManufacturerLegalName: S.optional(S.String),
    ResellerAccountID: S.optional(S.String),
    ResellerLegalName: S.optional(S.String),
    Status: S.optional(ResaleAuthorizationStatusString),
    OfferExtendedStatus: S.optional(S.String),
    CreatedDate: S.optional(S.String),
    AvailabilityEndDate: S.optional(S.String),
    ResellerRole: S.optional(ResaleAuthorizationResellerRoleString),
  }),
).annotate({
  identifier: "ResaleAuthorizationSummary",
}) as any as S.Schema<ResaleAuthorizationSummary>;
export interface MachineLearningProductSummary {
  ProductTitle?: string;
  Visibility?: MachineLearningProductVisibilityString;
}
export const MachineLearningProductSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductTitle: S.optional(S.String),
    Visibility: S.optional(MachineLearningProductVisibilityString),
  }),
).annotate({
  identifier: "MachineLearningProductSummary",
}) as any as S.Schema<MachineLearningProductSummary>;
export type OfferSetAssociatedOfferIdsList = string[];
export const OfferSetAssociatedOfferIdsList = /*@__PURE__*/ S.Array(S.String);
export interface OfferSetSummary {
  Name?: string;
  State?: OfferSetStateString;
  ReleaseDate?: string;
  AssociatedOfferIds?: string[];
  SolutionId?: string;
}
export const OfferSetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    State: S.optional(OfferSetStateString),
    ReleaseDate: S.optional(S.String),
    AssociatedOfferIds: S.optional(OfferSetAssociatedOfferIdsList),
    SolutionId: S.optional(S.String),
  }),
).annotate({
  identifier: "OfferSetSummary",
}) as any as S.Schema<OfferSetSummary>;
export interface EntitySummary {
  Name?: string;
  EntityType?: string;
  EntityId?: string;
  EntityArn?: string;
  LastModifiedDate?: string;
  Visibility?: string;
  AmiProductSummary?: AmiProductSummary;
  ContainerProductSummary?: ContainerProductSummary;
  DataProductSummary?: DataProductSummary;
  SaaSProductSummary?: SaaSProductSummary;
  OfferSummary?: OfferSummary;
  ResaleAuthorizationSummary?: ResaleAuthorizationSummary;
  MachineLearningProductSummary?: MachineLearningProductSummary;
  OfferSetSummary?: OfferSetSummary;
}
export const EntitySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    EntityType: S.optional(S.String),
    EntityId: S.optional(S.String),
    EntityArn: S.optional(S.String),
    LastModifiedDate: S.optional(S.String),
    Visibility: S.optional(S.String),
    AmiProductSummary: S.optional(AmiProductSummary),
    ContainerProductSummary: S.optional(ContainerProductSummary),
    DataProductSummary: S.optional(DataProductSummary),
    SaaSProductSummary: S.optional(SaaSProductSummary),
    OfferSummary: S.optional(OfferSummary),
    ResaleAuthorizationSummary: S.optional(ResaleAuthorizationSummary),
    MachineLearningProductSummary: S.optional(MachineLearningProductSummary),
    OfferSetSummary: S.optional(OfferSetSummary),
  }),
).annotate({ identifier: "EntitySummary" }) as any as S.Schema<EntitySummary>;
export type EntitySummaryList = EntitySummary[];
export const EntitySummaryList = /*@__PURE__*/ S.Array(EntitySummary);
export interface ListEntitiesResponse {
  EntitySummaryList?: EntitySummary[];
  NextToken?: string;
}
export const ListEntitiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EntitySummaryList: S.optional(EntitySummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEntitiesResponse",
}) as any as S.Schema<ListEntitiesResponse>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListTagsForResource" }),
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
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface ListTagsForResourceResponse {
  ResourceArn?: string;
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.optional(S.String), Tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PutResourcePolicyRequest {
  ResourceArn: string;
  Policy: string;
}
export const PutResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Policy: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/PutResourcePolicy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutResourcePolicyRequest",
}) as any as S.Schema<PutResourcePolicyRequest>;
export interface PutResourcePolicyResponse {}
export const PutResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutResourcePolicyResponse",
}) as any as S.Schema<PutResourcePolicyResponse>;
export interface Change {
  ChangeType: string;
  Entity: Entity;
  EntityTags?: Tag[];
  Details?: string;
  DetailsDocument?: any;
  ChangeName?: string;
}
export const Change = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChangeType: S.String,
    Entity: Entity,
    EntityTags: S.optional(TagList),
    Details: S.optional(S.String),
    DetailsDocument: S.optional(S.Any),
    ChangeName: S.optional(S.String),
  }),
).annotate({ identifier: "Change" }) as any as S.Schema<Change>;
export type RequestedChangeList = Change[];
export const RequestedChangeList = /*@__PURE__*/ S.Array(Change);
export type ClientRequestToken = string;
export interface StartChangeSetRequest {
  Catalog: string;
  ChangeSet: Change[];
  ChangeSetName?: string;
  ClientRequestToken?: string;
  ChangeSetTags?: Tag[];
  Intent?: Intent;
}
export const StartChangeSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    ChangeSet: RequestedChangeList,
    ChangeSetName: S.optional(S.String),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    ChangeSetTags: S.optional(TagList),
    Intent: S.optional(Intent),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartChangeSet" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartChangeSetRequest",
}) as any as S.Schema<StartChangeSetRequest>;
export interface StartChangeSetResponse {
  ChangeSetId?: string;
  ChangeSetArn?: string;
}
export const StartChangeSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChangeSetId: S.optional(S.String),
    ChangeSetArn: S.optional(S.String),
  }),
).annotate({
  identifier: "StartChangeSetResponse",
}) as any as S.Schema<StartChangeSetResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: TagList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/TagResource" }),
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
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, TagKeys: TagKeyList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UntagResource" }),
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
export type ValidationExceptionReason =
  | "UnknownOperation"
  | "CannotParse"
  | "FieldValidationFailed"
  | "Other"
  | (string & {});
export const ValidationExceptionReason = S.String;

export type FieldName = string;
export interface ValidationExceptionField {
  Reason?: ValidationExceptionReason;
  EntityType?: string;
  EntityId?: string;
  ChangeType?: string;
  Field?: string;
  Message?: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Reason: S.optional(ValidationExceptionReason),
    EntityType: S.optional(S.String),
    EntityId: S.optional(S.String),
    ChangeType: S.optional(S.String),
    Field: S.optional(S.String),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export type BatchDescribeEntitiesError =
  | AccessDeniedException
  | InternalServiceException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns metadata and content for multiple entities. This is the Batch version of the `DescribeEntity` API and uses the same IAM permission action as `DescribeEntity` API.
 */
export const batchDescribeEntities: API.OperationMethod<
  BatchDescribeEntitiesRequest,
  BatchDescribeEntitiesResponse,
  BatchDescribeEntitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDescribeEntitiesRequest,
  output: BatchDescribeEntitiesResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDescribeEntities",
}));

export type CancelChangeSetError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Used to cancel an open change request. Must be sent before the status of the request
 * changes to `APPLYING`, the final stage of completing your change request. You
 * can describe a change during the 60-day request history retention period for API
 * calls.
 */
export const cancelChangeSet: API.OperationMethod<
  CancelChangeSetRequest,
  CancelChangeSetResponse,
  CancelChangeSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelChangeSetRequest,
  output: CancelChangeSetResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelChangeSet",
}));

export type DeleteResourcePolicyError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a resource-based policy on an entity that is identified by its resource
 * ARN.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourcePolicyRequest,
  output: DeleteResourcePolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type DescribeAssessmentError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the metadata and detailed results of a single assessment, including the
 * framework that was evaluated, the overall assessment result, and a paginated list of
 * individual control evaluation results.
 *
 * To list available assessments before describing one, use the
 * `ListAssessments` action.
 */
export const describeAssessment: API.PaginatedOperationMethod<
  DescribeAssessmentRequest,
  DescribeAssessmentResponse,
  DescribeAssessmentError,
  Credentials | HttpClient.HttpClient,
  ControlAssessment
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeAssessmentRequest,
  output: DescribeAssessmentResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssessment",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ControlAssessments",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeChangeSetError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides information about a given change set.
 */
export const describeChangeSet: API.OperationMethod<
  DescribeChangeSetRequest,
  DescribeChangeSetResponse,
  DescribeChangeSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeChangeSetRequest,
  output: DescribeChangeSetResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeChangeSet",
}));

export type DescribeEntityError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ResourceNotSupportedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the metadata and content of the entity.
 */
export const describeEntity: API.OperationMethod<
  DescribeEntityRequest,
  DescribeEntityResponse,
  DescribeEntityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeEntityRequest,
  output: DescribeEntityResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ResourceNotSupportedException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEntity",
}));

export type GetResourcePolicyError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a resource-based policy of an entity that is identified by its resource
 * ARN.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourcePolicyRequest,
  output: GetResourcePolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

export type ListAssessmentsError =
  | AccessDeniedException
  | InternalServiceException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of assessments associated with an entity or change set in
 * AWS Marketplace. An *assessment* is the result of evaluating a
 * product or change set against a framework, such as AMI Security or Container
 * Security.
 *
 * Use the `AssessmentTargetFilter` to scope results to a specific entity or
 * change set, and use `FrameworkFilters` to scope results to a single
 * framework. To retrieve detailed control-level results for an individual assessment, use
 * the `DescribeAssessment` action.
 *
 * Results are sorted by assessment creation time in descending order.
 */
export const listAssessments: API.PaginatedOperationMethod<
  ListAssessmentsRequest,
  ListAssessmentsResponse,
  ListAssessmentsError,
  Credentials | HttpClient.HttpClient,
  AssessmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssessmentsRequest,
  output: ListAssessmentsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssessments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AssessmentSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListChangeSetsError =
  | AccessDeniedException
  | InternalServiceException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the list of change sets owned by the account being used to make the call. You
 * can filter this list by providing any combination of `entityId`,
 * `ChangeSetName`, and status. If you provide more than one filter, the API
 * operation applies a logical AND between the filters.
 *
 * You can describe a change during the 60-day request history retention period for API
 * calls.
 */
export const listChangeSets: API.PaginatedOperationMethod<
  ListChangeSetsRequest,
  ListChangeSetsResponse,
  ListChangeSetsError,
  Credentials | HttpClient.HttpClient,
  ChangeSetSummaryListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListChangeSetsRequest,
  output: ListChangeSetsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChangeSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ChangeSetSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEntitiesError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides the list of entities of a given type.
 */
export const listEntities: API.PaginatedOperationMethod<
  ListEntitiesRequest,
  ListEntitiesResponse,
  ListEntitiesError,
  Credentials | HttpClient.HttpClient,
  EntitySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEntitiesRequest,
  output: ListEntitiesResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEntities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EntitySummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all tags that have been added to a resource (either an entity or change set).
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
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutResourcePolicyError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attaches a resource-based policy to an entity. Examples of an entity include:
 * `AmiProduct` and `ContainerProduct`.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutResourcePolicyRequest,
  output: PutResourcePolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type StartChangeSetError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows you to request changes for your entities. Within a single
 * `ChangeSet`, you can't start the same change type against the same entity
 * multiple times. Additionally, when a `ChangeSet` is running, all the entities
 * targeted by the different changes are locked until the change set has completed (either
 * succeeded, cancelled, or failed). If you try to start a change set containing a change
 * against an entity that is already locked, you will receive a
 * `ResourceInUseException` error.
 *
 * For example, you can't start the `ChangeSet` described in the example later in this topic because it contains two changes to run the same
 * change type (`AddRevisions`) against the same entity
 * (`entity-id@1`).
 *
 * For more information about working with change sets, see Working with change sets. For information about change types for
 * single-AMI products, see Working with single-AMI products. Also, for more information about change
 * types available for container-based products, see Working with container products.
 *
 * To download "DetailsDocument" shapes, see Python
 * and Java shapes on GitHub.
 */
export const startChangeSet: API.OperationMethod<
  StartChangeSetRequest,
  StartChangeSetResponse,
  StartChangeSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartChangeSetRequest,
  output: StartChangeSetResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartChangeSet",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Tags a resource (either an entity or change set).
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
    InternalServiceException,
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
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag or list of tags from a resource (either an entity or change set).
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
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));
