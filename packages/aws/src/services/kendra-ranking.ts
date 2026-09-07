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
  sdkId: "Kendra Ranking",
  serviceShapeName: "AWSKendraRerankingFrontendService",
});
const auth = T.AwsAuthSigv4({ name: "kendra-ranking" });
const ver = T.ServiceVersion("2022-10-19");
const proto = T.AwsProtocolsAwsJson1_0();
const rules = T.EndpointResolver((p, _) => {
  const { Region, UseFIPS = false, Endpoint } = p;
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
        if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://kendra-ranking-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          return e(
            `https://kendra-ranking.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://kendra-ranking-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        return e(
          `https://kendra-ranking.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
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
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ResourceUnavailableException>()(
    "ResourceUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
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
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type RescoreExecutionPlanName = string;
export type Description = string;
export type RescoreCapacityUnit = number;
export interface CapacityUnitsConfiguration {
  RescoreCapacityUnits: number;
}
export const CapacityUnitsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RescoreCapacityUnits: S.Number }),
).annotate({
  identifier: "CapacityUnitsConfiguration",
}) as any as S.Schema<CapacityUnitsConfiguration>;
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
export type ClientTokenName = string;
export interface CreateRescoreExecutionPlanRequest {
  Name: string;
  Description?: string;
  CapacityUnits?: CapacityUnitsConfiguration;
  Tags?: Tag[];
  ClientToken?: string;
}
export const CreateRescoreExecutionPlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    CapacityUnits: S.optional(CapacityUnitsConfiguration),
    Tags: S.optional(TagList),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/rescore-execution-plans" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRescoreExecutionPlanRequest",
}) as any as S.Schema<CreateRescoreExecutionPlanRequest>;
export type RescoreExecutionPlanId = string;
export type RescoreExecutionPlanArn = string;
export interface CreateRescoreExecutionPlanResponse {
  Id: string;
  Arn: string;
}
export const CreateRescoreExecutionPlanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String, Arn: S.String }),
).annotate({
  identifier: "CreateRescoreExecutionPlanResponse",
}) as any as S.Schema<CreateRescoreExecutionPlanResponse>;
export interface DeleteRescoreExecutionPlanRequest {
  Id: string;
}
export const DeleteRescoreExecutionPlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/rescore-execution-plans/{Id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRescoreExecutionPlanRequest",
}) as any as S.Schema<DeleteRescoreExecutionPlanRequest>;
export interface DeleteRescoreExecutionPlanResponse {}
export const DeleteRescoreExecutionPlanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRescoreExecutionPlanResponse",
}) as any as S.Schema<DeleteRescoreExecutionPlanResponse>;
export interface DescribeRescoreExecutionPlanRequest {
  Id: string;
}
export const DescribeRescoreExecutionPlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/rescore-execution-plans/{Id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeRescoreExecutionPlanRequest",
}) as any as S.Schema<DescribeRescoreExecutionPlanRequest>;
export type RescoreExecutionPlanStatus =
  | "CREATING"
  | "UPDATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | (string & {});
export const RescoreExecutionPlanStatus = S.String;

export type ErrorMessage = string;
export interface DescribeRescoreExecutionPlanResponse {
  Id?: string;
  Arn?: string;
  Name?: string;
  Description?: string;
  CapacityUnits?: CapacityUnitsConfiguration;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  Status?: RescoreExecutionPlanStatus;
  ErrorMessage?: string;
}
export const DescribeRescoreExecutionPlanResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Id: S.optional(S.String),
      Arn: S.optional(S.String),
      Name: S.optional(S.String),
      Description: S.optional(S.String),
      CapacityUnits: S.optional(CapacityUnitsConfiguration),
      CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      Status: S.optional(RescoreExecutionPlanStatus),
      ErrorMessage: S.optional(S.String),
    }),
).annotate({
  identifier: "DescribeRescoreExecutionPlanResponse",
}) as any as S.Schema<DescribeRescoreExecutionPlanResponse>;
export type NextToken = string;
export type MaxResultsIntegerForListRescoreExecutionPlansRequest = number;
export interface ListRescoreExecutionPlansRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListRescoreExecutionPlansRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/rescore-execution-plans" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRescoreExecutionPlansRequest",
}) as any as S.Schema<ListRescoreExecutionPlansRequest>;
export interface RescoreExecutionPlanSummary {
  Name?: string;
  Id?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  Status?: RescoreExecutionPlanStatus;
}
export const RescoreExecutionPlanSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Id: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(RescoreExecutionPlanStatus),
  }),
).annotate({
  identifier: "RescoreExecutionPlanSummary",
}) as any as S.Schema<RescoreExecutionPlanSummary>;
export type RescoreExecutionPlanSummaryList = RescoreExecutionPlanSummary[];
export const RescoreExecutionPlanSummaryList = /*@__PURE__*/ S.Array(
  RescoreExecutionPlanSummary,
);
export interface ListRescoreExecutionPlansResponse {
  SummaryItems?: RescoreExecutionPlanSummary[];
  NextToken?: string;
}
export const ListRescoreExecutionPlansResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SummaryItems: S.optional(RescoreExecutionPlanSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRescoreExecutionPlansResponse",
}) as any as S.Schema<ListRescoreExecutionPlansResponse>;
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
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
export type SearchQuery = string;
export type DocumentId = string;
export type GroupId = string;
export type DocumentTitle = string;
export type DocumentBody = string;
export type Tokens = string;
export type TitleTokensList = string[];
export const TitleTokensList = /*@__PURE__*/ S.Array(S.String);
export type BodyTokensList = string[];
export const BodyTokensList = /*@__PURE__*/ S.Array(S.String);
export interface Document {
  Id: string;
  GroupId?: string;
  Title?: string;
  Body?: string;
  TokenizedTitle?: string[];
  TokenizedBody?: string[];
  OriginalScore: number;
}
export const Document = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    GroupId: S.optional(S.String),
    Title: S.optional(S.String),
    Body: S.optional(S.String),
    TokenizedTitle: S.optional(TitleTokensList),
    TokenizedBody: S.optional(BodyTokensList),
    OriginalScore: S.Number,
  }),
).annotate({ identifier: "Document" }) as any as S.Schema<Document>;
export type DocumentList = Document[];
export const DocumentList = /*@__PURE__*/ S.Array(Document);
export interface RescoreRequest {
  RescoreExecutionPlanId: string;
  SearchQuery: string;
  Documents: Document[];
}
export const RescoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RescoreExecutionPlanId: S.String.pipe(
      T.HttpLabel("RescoreExecutionPlanId"),
    ),
    SearchQuery: S.String,
    Documents: DocumentList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/rescore-execution-plans/{RescoreExecutionPlanId}/rescore",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "RescoreRequest" }) as any as S.Schema<RescoreRequest>;
export type RescoreId = string;
export interface RescoreResultItem {
  DocumentId?: string;
  Score?: number;
}
export const RescoreResultItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DocumentId: S.optional(S.String), Score: S.optional(S.Number) }),
).annotate({
  identifier: "RescoreResultItem",
}) as any as S.Schema<RescoreResultItem>;
export type RescoreResultItemList = RescoreResultItem[];
export const RescoreResultItemList = /*@__PURE__*/ S.Array(RescoreResultItem);
export interface RescoreResult {
  RescoreId?: string;
  ResultItems?: RescoreResultItem[];
}
export const RescoreResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RescoreId: S.optional(S.String),
    ResultItems: S.optional(RescoreResultItemList),
  }),
).annotate({ identifier: "RescoreResult" }) as any as S.Schema<RescoreResult>;
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, Tags: TagList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
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
  ResourceARN: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, TagKeys: TagKeyList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
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
export interface UpdateRescoreExecutionPlanRequest {
  Id: string;
  Name?: string;
  Description?: string;
  CapacityUnits?: CapacityUnitsConfiguration;
}
export const UpdateRescoreExecutionPlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String.pipe(T.HttpLabel("Id")),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    CapacityUnits: S.optional(CapacityUnitsConfiguration),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/rescore-execution-plans/{Id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRescoreExecutionPlanRequest",
}) as any as S.Schema<UpdateRescoreExecutionPlanRequest>;
export interface UpdateRescoreExecutionPlanResponse {}
export const UpdateRescoreExecutionPlanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateRescoreExecutionPlanResponse",
}) as any as S.Schema<UpdateRescoreExecutionPlanResponse>;
export type CreateRescoreExecutionPlanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a rescore execution plan. A rescore execution
 * plan is an Amazon Kendra Intelligent Ranking resource
 * used for provisioning the `Rescore` API. You set
 * the number of capacity units that you require for
 * Amazon Kendra Intelligent Ranking to rescore or re-rank
 * a search service's results.
 *
 * For an example of using the
 * `CreateRescoreExecutionPlan` API, including using
 * the Python and Java SDKs, see Semantically
 * ranking a search service's results.
 */
export const createRescoreExecutionPlan: API.OperationMethod<
  CreateRescoreExecutionPlanRequest,
  CreateRescoreExecutionPlanResponse,
  CreateRescoreExecutionPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRescoreExecutionPlanRequest,
  output: CreateRescoreExecutionPlanResponse,
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
  operationName: "CreateRescoreExecutionPlan",
}));

export type DeleteRescoreExecutionPlanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a rescore execution plan. A rescore execution
 * plan is an Amazon Kendra Intelligent Ranking resource
 * used for provisioning the `Rescore` API.
 */
export const deleteRescoreExecutionPlan: API.OperationMethod<
  DeleteRescoreExecutionPlanRequest,
  DeleteRescoreExecutionPlanResponse,
  DeleteRescoreExecutionPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRescoreExecutionPlanRequest,
  output: DeleteRescoreExecutionPlanResponse,
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
  operationName: "DeleteRescoreExecutionPlan",
}));

export type DescribeRescoreExecutionPlanError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a rescore execution plan. A rescore
 * execution plan is an Amazon Kendra Intelligent Ranking
 * resource used for provisioning the `Rescore` API.
 */
export const describeRescoreExecutionPlan: API.OperationMethod<
  DescribeRescoreExecutionPlanRequest,
  DescribeRescoreExecutionPlanResponse,
  DescribeRescoreExecutionPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeRescoreExecutionPlanRequest,
  output: DescribeRescoreExecutionPlanResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRescoreExecutionPlan",
}));

export type ListRescoreExecutionPlansError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists your rescore execution plans. A rescore execution plan
 * is an Amazon Kendra Intelligent Ranking resource used for
 * provisioning the `Rescore` API.
 */
export const listRescoreExecutionPlans: API.PaginatedOperationMethod<
  ListRescoreExecutionPlansRequest,
  ListRescoreExecutionPlansResponse,
  ListRescoreExecutionPlansError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRescoreExecutionPlansRequest,
  output: ListRescoreExecutionPlansResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRescoreExecutionPlans",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of tags associated with a specified resource.
 * A rescore execution plan is an example of a resource that
 * can have tags associated with it.
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
    ResourceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type RescoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Rescores or re-ranks search results from a search service
 * such as OpenSearch (self managed). You use the semantic search
 * capabilities of Amazon Kendra Intelligent Ranking to
 * improve the search service's results.
 */
export const rescore: API.OperationMethod<
  RescoreRequest,
  RescoreResult,
  RescoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RescoreRequest,
  output: RescoreResult,
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
  operationName: "Rescore",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a specified tag to a specified rescore execution
 * plan. A rescore execution plan is an Amazon Kendra
 * Intelligent Ranking resource used for provisioning the
 * `Rescore` API. If the tag already exists,
 * the existing value is replaced with the new value.
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
    ResourceUnavailableException,
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
  | ResourceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag from a rescore execution plan. A rescore
 * execution plan is an Amazon Kendra Intelligent
 * Ranking resource used for provisioning the
 * `Rescore` operation.
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
    ResourceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateRescoreExecutionPlanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a rescore execution plan. A rescore execution plan
 * is an Amazon Kendra Intelligent Ranking resource used for
 * provisioning the `Rescore` API. You can update the
 * number of capacity units you require for Amazon Kendra
 * Intelligent Ranking to rescore or re-rank a search service's
 * results.
 */
export const updateRescoreExecutionPlan: API.OperationMethod<
  UpdateRescoreExecutionPlanRequest,
  UpdateRescoreExecutionPlanResponse,
  UpdateRescoreExecutionPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRescoreExecutionPlanRequest,
  output: UpdateRescoreExecutionPlanResponse,
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
  operationName: "UpdateRescoreExecutionPlan",
}));
