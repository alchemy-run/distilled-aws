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
  sdkId: "rbin",
  serviceShapeName: "AmazonRecycleBin",
});
const auth = T.AwsAuthSigv4({ name: "rbin" });
const ver = T.ServiceVersion("2021-06-15");
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
              `https://rbin-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://rbin-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://rbin.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://rbin.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Reason: S.optional(
        S.suspend(() => ConflictExceptionReason).annotate({
          identifier: "ConflictExceptionReason",
        }),
      ),
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
      Reason: S.optional(
        S.suspend(() => ResourceNotFoundExceptionReason).annotate({
          identifier: "ResourceNotFoundExceptionReason",
        }),
      ),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Reason: S.optional(
        S.suspend(() => ServiceQuotaExceededExceptionReason).annotate({
          identifier: "ServiceQuotaExceededExceptionReason",
        }),
      ),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
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
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type RetentionPeriodValue = number;
export type RetentionPeriodUnit = "DAYS" | (string & {});
export const RetentionPeriodUnit = S.String;

export interface RetentionPeriod {
  RetentionPeriodValue: number;
  RetentionPeriodUnit: RetentionPeriodUnit;
}
export const RetentionPeriod = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RetentionPeriodValue: S.Number,
    RetentionPeriodUnit: RetentionPeriodUnit,
  }),
).annotate({
  identifier: "RetentionPeriod",
}) as any as S.Schema<RetentionPeriod>;
export type Description = string;
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
export type ResourceType =
  | "EBS_SNAPSHOT"
  | "EC2_IMAGE"
  | "EBS_VOLUME"
  | (string & {});
export const ResourceType = S.String;

export type ResourceTagKey = string;
export type ResourceTagValue = string;
export interface ResourceTag {
  ResourceTagKey: string;
  ResourceTagValue?: string;
}
export const ResourceTag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceTagKey: S.String,
    ResourceTagValue: S.optional(S.String),
  }),
).annotate({ identifier: "ResourceTag" }) as any as S.Schema<ResourceTag>;
export type ResourceTags = ResourceTag[];
export const ResourceTags = /*@__PURE__*/ S.Array(ResourceTag);
export type UnlockDelayValue = number;
export type UnlockDelayUnit = "DAYS" | (string & {});
export const UnlockDelayUnit = S.String;

export interface UnlockDelay {
  UnlockDelayValue: number;
  UnlockDelayUnit: UnlockDelayUnit;
}
export const UnlockDelay = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UnlockDelayValue: S.Number, UnlockDelayUnit: UnlockDelayUnit }),
).annotate({ identifier: "UnlockDelay" }) as any as S.Schema<UnlockDelay>;
export interface LockConfiguration {
  UnlockDelay: UnlockDelay;
}
export const LockConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UnlockDelay: UnlockDelay }),
).annotate({
  identifier: "LockConfiguration",
}) as any as S.Schema<LockConfiguration>;
export type ExcludeResourceTags = ResourceTag[];
export const ExcludeResourceTags = /*@__PURE__*/ S.Array(ResourceTag);
export interface CreateRuleRequest {
  RetentionPeriod: RetentionPeriod;
  Description?: string;
  Tags?: Tag[];
  ResourceType: ResourceType;
  ResourceTags?: ResourceTag[];
  LockConfiguration?: LockConfiguration;
  ExcludeResourceTags?: ResourceTag[];
}
export const CreateRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RetentionPeriod: RetentionPeriod,
    Description: S.optional(S.String),
    Tags: S.optional(TagList),
    ResourceType: ResourceType,
    ResourceTags: S.optional(ResourceTags),
    LockConfiguration: S.optional(LockConfiguration),
    ExcludeResourceTags: S.optional(ExcludeResourceTags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/rules" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRuleRequest",
}) as any as S.Schema<CreateRuleRequest>;
export type RuleIdentifier = string;
export type RuleStatus = "pending" | "available" | (string & {});
export const RuleStatus = S.String;

export type LockState =
  | "locked"
  | "pending_unlock"
  | "unlocked"
  | (string & {});
export const LockState = S.String;

export type RuleArn = string;
export interface CreateRuleResponse {
  Identifier?: string;
  RetentionPeriod?: RetentionPeriod;
  Description?: string;
  Tags?: Tag[];
  ResourceType?: ResourceType;
  ResourceTags?: ResourceTag[];
  Status?: RuleStatus;
  LockConfiguration?: LockConfiguration;
  LockState?: LockState;
  RuleArn?: string;
  ExcludeResourceTags?: ResourceTag[];
}
export const CreateRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.optional(S.String),
    RetentionPeriod: S.optional(RetentionPeriod),
    Description: S.optional(S.String),
    Tags: S.optional(TagList),
    ResourceType: S.optional(ResourceType),
    ResourceTags: S.optional(ResourceTags),
    Status: S.optional(RuleStatus),
    LockConfiguration: S.optional(LockConfiguration),
    LockState: S.optional(LockState),
    RuleArn: S.optional(S.String),
    ExcludeResourceTags: S.optional(ExcludeResourceTags),
  }),
).annotate({
  identifier: "CreateRuleResponse",
}) as any as S.Schema<CreateRuleResponse>;
export interface DeleteRuleRequest {
  Identifier: string;
}
export const DeleteRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/rules/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRuleRequest",
}) as any as S.Schema<DeleteRuleRequest>;
export interface DeleteRuleResponse {}
export const DeleteRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRuleResponse",
}) as any as S.Schema<DeleteRuleResponse>;
export interface GetRuleRequest {
  Identifier: string;
}
export const GetRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/rules/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetRuleRequest" }) as any as S.Schema<GetRuleRequest>;
export interface GetRuleResponse {
  Identifier?: string;
  Description?: string;
  ResourceType?: ResourceType;
  RetentionPeriod?: RetentionPeriod;
  ResourceTags?: ResourceTag[];
  Status?: RuleStatus;
  LockConfiguration?: LockConfiguration;
  LockState?: LockState;
  LockEndTime?: Date;
  RuleArn?: string;
  ExcludeResourceTags?: ResourceTag[];
}
export const GetRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.optional(S.String),
    Description: S.optional(S.String),
    ResourceType: S.optional(ResourceType),
    RetentionPeriod: S.optional(RetentionPeriod),
    ResourceTags: S.optional(ResourceTags),
    Status: S.optional(RuleStatus),
    LockConfiguration: S.optional(LockConfiguration),
    LockState: S.optional(LockState),
    LockEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RuleArn: S.optional(S.String),
    ExcludeResourceTags: S.optional(ExcludeResourceTags),
  }),
).annotate({
  identifier: "GetRuleResponse",
}) as any as S.Schema<GetRuleResponse>;
export type MaxResults = number;
export type NextToken = string;
export interface ListRulesRequest {
  MaxResults?: number;
  NextToken?: string;
  ResourceType: ResourceType;
  ResourceTags?: ResourceTag[];
  LockState?: LockState;
  ExcludeResourceTags?: ResourceTag[];
}
export const ListRulesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    ResourceType: ResourceType,
    ResourceTags: S.optional(ResourceTags),
    LockState: S.optional(LockState),
    ExcludeResourceTags: S.optional(ExcludeResourceTags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-rules" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRulesRequest",
}) as any as S.Schema<ListRulesRequest>;
export interface RuleSummary {
  Identifier?: string;
  Description?: string;
  RetentionPeriod?: RetentionPeriod;
  LockState?: LockState;
  RuleArn?: string;
}
export const RuleSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.optional(S.String),
    Description: S.optional(S.String),
    RetentionPeriod: S.optional(RetentionPeriod),
    LockState: S.optional(LockState),
    RuleArn: S.optional(S.String),
  }),
).annotate({ identifier: "RuleSummary" }) as any as S.Schema<RuleSummary>;
export type RuleSummaryList = RuleSummary[];
export const RuleSummaryList = /*@__PURE__*/ S.Array(RuleSummary);
export interface ListRulesResponse {
  Rules?: RuleSummary[];
  NextToken?: string;
}
export const ListRulesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Rules: S.optional(RuleSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRulesResponse",
}) as any as S.Schema<ListRulesResponse>;
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
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface LockRuleRequest {
  Identifier: string;
  LockConfiguration: LockConfiguration;
}
export const LockRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    LockConfiguration: LockConfiguration,
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/rules/{Identifier}/lock" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "LockRuleRequest",
}) as any as S.Schema<LockRuleRequest>;
export interface LockRuleResponse {
  Identifier?: string;
  Description?: string;
  ResourceType?: ResourceType;
  RetentionPeriod?: RetentionPeriod;
  ResourceTags?: ResourceTag[];
  Status?: RuleStatus;
  LockConfiguration?: LockConfiguration;
  LockState?: LockState;
  RuleArn?: string;
  ExcludeResourceTags?: ResourceTag[];
}
export const LockRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.optional(S.String),
    Description: S.optional(S.String),
    ResourceType: S.optional(ResourceType),
    RetentionPeriod: S.optional(RetentionPeriod),
    ResourceTags: S.optional(ResourceTags),
    Status: S.optional(RuleStatus),
    LockConfiguration: S.optional(LockConfiguration),
    LockState: S.optional(LockState),
    RuleArn: S.optional(S.String),
    ExcludeResourceTags: S.optional(ExcludeResourceTags),
  }),
).annotate({
  identifier: "LockRuleResponse",
}) as any as S.Schema<LockRuleResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: TagList,
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
export interface UnlockRuleRequest {
  Identifier: string;
}
export const UnlockRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/rules/{Identifier}/unlock" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UnlockRuleRequest",
}) as any as S.Schema<UnlockRuleRequest>;
export interface UnlockRuleResponse {
  Identifier?: string;
  Description?: string;
  ResourceType?: ResourceType;
  RetentionPeriod?: RetentionPeriod;
  ResourceTags?: ResourceTag[];
  Status?: RuleStatus;
  LockConfiguration?: LockConfiguration;
  LockState?: LockState;
  LockEndTime?: Date;
  RuleArn?: string;
  ExcludeResourceTags?: ResourceTag[];
}
export const UnlockRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.optional(S.String),
    Description: S.optional(S.String),
    ResourceType: S.optional(ResourceType),
    RetentionPeriod: S.optional(RetentionPeriod),
    ResourceTags: S.optional(ResourceTags),
    Status: S.optional(RuleStatus),
    LockConfiguration: S.optional(LockConfiguration),
    LockState: S.optional(LockState),
    LockEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RuleArn: S.optional(S.String),
    ExcludeResourceTags: S.optional(ExcludeResourceTags),
  }),
).annotate({
  identifier: "UnlockRuleResponse",
}) as any as S.Schema<UnlockRuleResponse>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
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
export interface UpdateRuleRequest {
  Identifier: string;
  RetentionPeriod?: RetentionPeriod;
  Description?: string;
  ResourceType?: ResourceType;
  ResourceTags?: ResourceTag[];
  ExcludeResourceTags?: ResourceTag[];
}
export const UpdateRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    RetentionPeriod: S.optional(RetentionPeriod),
    Description: S.optional(S.String),
    ResourceType: S.optional(ResourceType),
    ResourceTags: S.optional(ResourceTags),
    ExcludeResourceTags: S.optional(ExcludeResourceTags),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/rules/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRuleRequest",
}) as any as S.Schema<UpdateRuleRequest>;
export interface UpdateRuleResponse {
  Identifier?: string;
  RetentionPeriod?: RetentionPeriod;
  Description?: string;
  ResourceType?: ResourceType;
  ResourceTags?: ResourceTag[];
  Status?: RuleStatus;
  LockState?: LockState;
  LockEndTime?: Date;
  RuleArn?: string;
  ExcludeResourceTags?: ResourceTag[];
}
export const UpdateRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.optional(S.String),
    RetentionPeriod: S.optional(RetentionPeriod),
    Description: S.optional(S.String),
    ResourceType: S.optional(ResourceType),
    ResourceTags: S.optional(ResourceTags),
    Status: S.optional(RuleStatus),
    LockState: S.optional(LockState),
    LockEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RuleArn: S.optional(S.String),
    ExcludeResourceTags: S.optional(ExcludeResourceTags),
  }),
).annotate({
  identifier: "UpdateRuleResponse",
}) as any as S.Schema<UpdateRuleResponse>;
export type ErrorMessage = string;
export type ServiceQuotaExceededExceptionReason =
  | "SERVICE_QUOTA_EXCEEDED"
  | (string & {});
export const ServiceQuotaExceededExceptionReason = S.String;

export type ValidationExceptionReason =
  | "INVALID_PAGE_TOKEN"
  | "INVALID_PARAMETER_VALUE"
  | (string & {});
export const ValidationExceptionReason = S.String;

export type ConflictExceptionReason = "INVALID_RULE_STATE" | (string & {});
export const ConflictExceptionReason = S.String;

export type ResourceNotFoundExceptionReason = "RULE_NOT_FOUND" | (string & {});
export const ResourceNotFoundExceptionReason = S.String;

export type CreateRuleError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Recycle Bin retention rule. You can create two types of retention rules:
 *
 * - **Tag-level retention rules** - These retention rules use
 * resource tags to identify the resources to protect. For each retention rule, you specify one or
 * more tag key and value pairs. Resources (of the specified type) that have at least one of these
 * tag key and value pairs are automatically retained in the Recycle Bin upon deletion. Use this
 * type of retention rule to protect specific resources in your account based on their tags.
 *
 * - **Region-level retention rules** - These retention rules,
 * by default, apply to all of the resources (of the specified type) in the Region, even if the
 * resources are not tagged. However, you can specify exclusion tags to exclude resources that have
 * specific tags. Use this type of retention rule to protect all resources of a specific type in a
 * Region.
 *
 * For more information, see
 * Create Recycle Bin retention rules in the *Amazon EBS User Guide*.
 */
export const createRule: API.OperationMethod<
  CreateRuleRequest,
  CreateRuleResponse,
  CreateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRuleRequest,
  output: CreateRuleResponse,
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRule",
}));

export type DeleteRuleError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Recycle Bin retention rule. For more information, see
 * Delete Recycle Bin retention rules in the *Amazon Elastic Compute Cloud User Guide*.
 */
export const deleteRule: API.OperationMethod<
  DeleteRuleRequest,
  DeleteRuleResponse,
  DeleteRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRuleRequest,
  output: DeleteRuleResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRule",
}));

export type GetRuleError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a Recycle Bin retention rule.
 */
export const getRule: API.OperationMethod<
  GetRuleRequest,
  GetRuleResponse,
  GetRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRuleRequest,
  output: GetRuleResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRule",
}));

export type ListRulesError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Recycle Bin retention rules in the Region.
 */
export const listRules: API.PaginatedOperationMethod<
  ListRulesRequest,
  ListRulesResponse,
  ListRulesError,
  Credentials | HttpClient.HttpClient,
  RuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRulesRequest,
  output: ListRulesResponse,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Rules",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags assigned to a retention rule.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type LockRuleError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Locks a Region-level retention rule. A locked retention rule can't be modified or
 * deleted.
 *
 * You can't lock tag-level retention rules, or Region-level retention rules that
 * have exclusion tags.
 */
export const lockRule: API.OperationMethod<
  LockRuleRequest,
  LockRuleResponse,
  LockRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: LockRuleRequest,
  output: LockRuleResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "LockRule",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Assigns tags to the specified retention rule.
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
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UnlockRuleError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Unlocks a retention rule. After a retention rule is unlocked, it can be modified or deleted
 * only after the unlock delay period expires.
 */
export const unlockRule: API.OperationMethod<
  UnlockRuleRequest,
  UnlockRuleResponse,
  UnlockRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UnlockRuleRequest,
  output: UnlockRuleResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UnlockRule",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Unassigns a tag from a retention rule.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateRuleError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing Recycle Bin retention rule. You can update a retention rule's description,
 * resource tags, and retention period at any time after creation. You can't update a retention rule's
 * resource type after creation. For more information, see
 * Update Recycle Bin retention rules in the *Amazon Elastic Compute Cloud User Guide*.
 */
export const updateRule: API.OperationMethod<
  UpdateRuleRequest,
  UpdateRuleResponse,
  UpdateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRuleRequest,
  output: UpdateRuleResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRule",
}));
