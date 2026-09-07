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
  sdkId: "ElementalInference",
  serviceShapeName: "ElementalInference",
});
const auth = T.AwsAuthSigv4({ name: "elemental-inference" });
const ver = T.ServiceVersion("2018-11-14");
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
              `https://elemental-inference-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://elemental-inference-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://elemental-inference.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://elemental-inference.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(409), T.Retryable()),
  ).pipe(C.withConflictError, C.withRetryableError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class TooManyRequestException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestException>()(
    "TooManyRequestException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(429), T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type FeedId = string;
export type AssociatedResourceName = string;
export type ResourceName = string;
export interface CroppingConfig {}
export const CroppingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({ identifier: "CroppingConfig" }) as any as S.Schema<CroppingConfig>;
export type ResourceDescription = string;
export interface ClippingConfig {
  callbackMetadata?: string;
}
export const ClippingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ callbackMetadata: S.optional(S.String) }),
).annotate({ identifier: "ClippingConfig" }) as any as S.Schema<ClippingConfig>;
export type TranscriptionLanguage =
  | "eng"
  | "eng-au"
  | "eng-gb"
  | "eng-us"
  | "fra"
  | "ita"
  | "deu"
  | "spa"
  | "por"
  | (string & {});
export const TranscriptionLanguage = /*@__PURE__*/ S.String;

export interface AspectRatio {
  width: number;
  height: number;
}
export const AspectRatio = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ width: S.Number, height: S.Number }),
).annotate({ identifier: "AspectRatio" }) as any as S.Schema<AspectRatio>;
export type DictionaryId = string;
export type ProfanityFilterMode =
  | "DISABLED"
  | "CENSOR"
  | "DROP"
  | (string & {});
export const ProfanityFilterMode = /*@__PURE__*/ S.String;

export interface SubtitlingConfig {
  language: TranscriptionLanguage;
  aspectRatio?: AspectRatio;
  dictionary?: string;
  profanityFilter?: ProfanityFilterMode;
}
export const SubtitlingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    language: TranscriptionLanguage,
    aspectRatio: S.optional(AspectRatio),
    dictionary: S.optional(S.String),
    profanityFilter: S.optional(ProfanityFilterMode),
  }),
).annotate({
  identifier: "SubtitlingConfig",
}) as any as S.Schema<SubtitlingConfig>;
export type OutputConfig =
  | { cropping: CroppingConfig; clipping?: never; subtitling?: never }
  | { cropping?: never; clipping: ClippingConfig; subtitling?: never }
  | { cropping?: never; clipping?: never; subtitling: SubtitlingConfig };
export const OutputConfig = /*@__PURE__*/ S.Union([
  S.Struct({ cropping: CroppingConfig }),
  S.Struct({ clipping: ClippingConfig }),
  S.Struct({ subtitling: SubtitlingConfig }),
]);
export type OutputStatus = "ENABLED" | "DISABLED" | (string & {});
export const OutputStatus = /*@__PURE__*/ S.String;

export interface CreateOutput {
  name: string;
  outputConfig: OutputConfig;
  status: OutputStatus;
  description?: string;
}
export const CreateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    outputConfig: OutputConfig,
    status: OutputStatus,
    description: S.optional(S.String),
  }),
).annotate({ identifier: "CreateOutput" }) as any as S.Schema<CreateOutput>;
export type CreateOutputList = CreateOutput[];
export const CreateOutputList = /*@__PURE__*/ S.Array(CreateOutput);
export interface AssociateFeedRequest {
  id: string;
  associatedResourceName: string;
  outputs: CreateOutput[];
  dryRun?: boolean;
}
export const AssociateFeedRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    associatedResourceName: S.String.pipe(T.IdempotencyToken()),
    outputs: CreateOutputList,
    dryRun: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/feed/{id}/associate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateFeedRequest",
}) as any as S.Schema<AssociateFeedRequest>;
export type FeedArn = string;
export interface AssociateFeedResponse {
  arn: string;
  id: string;
}
export const AssociateFeedResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, id: S.String }),
).annotate({
  identifier: "AssociateFeedResponse",
}) as any as S.Schema<AssociateFeedResponse>;
export type DictionaryLanguage =
  | "eng"
  | "fra"
  | "ita"
  | "deu"
  | "spa"
  | "por"
  | (string & {});
export const DictionaryLanguage = /*@__PURE__*/ S.String;

export type DictionaryEntriesPayload = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateDictionaryRequest {
  name: string;
  language: DictionaryLanguage;
  entries?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateDictionaryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    language: DictionaryLanguage,
    entries: S.optional(S.String),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/dictionary" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDictionaryRequest",
}) as any as S.Schema<CreateDictionaryRequest>;
export type DictionaryArn = string;
export type DictionaryStatus =
  | "CREATING"
  | "AVAILABLE"
  | "REFERENCED"
  | "DELETING"
  | "DELETED"
  | (string & {});
export const DictionaryStatus = /*@__PURE__*/ S.String;

export type FeedReferences = string[];
export const FeedReferences = /*@__PURE__*/ S.Array(S.String);
export interface CreateDictionaryResponse {
  name: string;
  arn: string;
  id: string;
  language: DictionaryLanguage;
  status: DictionaryStatus;
  references?: string[];
  tags?: { [key: string]: string | undefined };
}
export const CreateDictionaryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    arn: S.String,
    id: S.String,
    language: DictionaryLanguage,
    status: DictionaryStatus,
    references: S.optional(FeedReferences),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreateDictionaryResponse",
}) as any as S.Schema<CreateDictionaryResponse>;
export interface CreateFeedRequest {
  name: string;
  outputs: CreateOutput[];
  tags?: { [key: string]: string | undefined };
}
export const CreateFeedRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    outputs: CreateOutputList,
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/feed" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFeedRequest",
}) as any as S.Schema<CreateFeedRequest>;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface GetOutput {
  name: string;
  outputConfig: OutputConfig;
  status: OutputStatus;
  description?: string;
  fromAssociation?: boolean;
}
export const GetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    outputConfig: OutputConfig,
    status: OutputStatus,
    description: S.optional(S.String),
    fromAssociation: S.optional(S.Boolean),
  }),
).annotate({ identifier: "GetOutput" }) as any as S.Schema<GetOutput>;
export type GetOutputList = GetOutput[];
export const GetOutputList = /*@__PURE__*/ S.Array(GetOutput);
export type FeedStatus =
  | "CREATING"
  | "AVAILABLE"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "DELETED"
  | "ARCHIVED"
  | (string & {});
export const FeedStatus = /*@__PURE__*/ S.String;

export interface FeedAssociation {
  associatedResourceName: string;
}
export const FeedAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ associatedResourceName: S.String }),
).annotate({
  identifier: "FeedAssociation",
}) as any as S.Schema<FeedAssociation>;
export interface CreateFeedResponse {
  arn: string;
  name: string;
  id: string;
  dataEndpoints: string[];
  outputs: GetOutput[];
  status: FeedStatus;
  association?: FeedAssociation;
  tags?: { [key: string]: string | undefined };
}
export const CreateFeedResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.String,
    id: S.String,
    dataEndpoints: StringList,
    outputs: GetOutputList,
    status: FeedStatus,
    association: S.optional(FeedAssociation),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreateFeedResponse",
}) as any as S.Schema<CreateFeedResponse>;
export interface DeleteDictionaryRequest {
  id: string;
}
export const DeleteDictionaryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/dictionary/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDictionaryRequest",
}) as any as S.Schema<DeleteDictionaryRequest>;
export interface DeleteDictionaryResponse {
  arn: string;
  id: string;
  status: DictionaryStatus;
}
export const DeleteDictionaryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, id: S.String, status: DictionaryStatus }),
).annotate({
  identifier: "DeleteDictionaryResponse",
}) as any as S.Schema<DeleteDictionaryResponse>;
export interface DeleteFeedRequest {
  id: string;
}
export const DeleteFeedRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/feed/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFeedRequest",
}) as any as S.Schema<DeleteFeedRequest>;
export interface DeleteFeedResponse {
  arn: string;
  id: string;
  status: FeedStatus;
}
export const DeleteFeedResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, id: S.String, status: FeedStatus }),
).annotate({
  identifier: "DeleteFeedResponse",
}) as any as S.Schema<DeleteFeedResponse>;
export interface DisassociateFeedRequest {
  id: string;
  associatedResourceName: string;
  dryRun?: boolean;
}
export const DisassociateFeedRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    associatedResourceName: S.String.pipe(T.IdempotencyToken()),
    dryRun: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/feed/{id}/disassociate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateFeedRequest",
}) as any as S.Schema<DisassociateFeedRequest>;
export interface DisassociateFeedResponse {
  arn: string;
  id: string;
}
export const DisassociateFeedResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, id: S.String }),
).annotate({
  identifier: "DisassociateFeedResponse",
}) as any as S.Schema<DisassociateFeedResponse>;
export interface ExportDictionaryEntriesRequest {
  id: string;
}
export const ExportDictionaryEntriesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/dictionary/{id}/entries/export" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ExportDictionaryEntriesRequest",
}) as any as S.Schema<ExportDictionaryEntriesRequest>;
export interface ExportDictionaryEntriesResponse {
  entries?: string;
}
export const ExportDictionaryEntriesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ entries: S.optional(S.String) }),
).annotate({
  identifier: "ExportDictionaryEntriesResponse",
}) as any as S.Schema<ExportDictionaryEntriesResponse>;
export interface GetDictionaryRequest {
  id: string;
}
export const GetDictionaryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/dictionary/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDictionaryRequest",
}) as any as S.Schema<GetDictionaryRequest>;
export interface GetDictionaryResponse {
  name: string;
  arn: string;
  id: string;
  language: DictionaryLanguage;
  status: DictionaryStatus;
  references?: string[];
  tags?: { [key: string]: string | undefined };
}
export const GetDictionaryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    arn: S.String,
    id: S.String,
    language: DictionaryLanguage,
    status: DictionaryStatus,
    references: S.optional(FeedReferences),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetDictionaryResponse",
}) as any as S.Schema<GetDictionaryResponse>;
export interface GetFeedRequest {
  id: string;
}
export const GetFeedRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/feed/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetFeedRequest" }) as any as S.Schema<GetFeedRequest>;
export interface GetFeedResponse {
  arn: string;
  name: string;
  id: string;
  dataEndpoints: string[];
  outputs: GetOutput[];
  status: FeedStatus;
  association?: FeedAssociation;
  tags?: { [key: string]: string | undefined };
}
export const GetFeedResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.String,
    id: S.String,
    dataEndpoints: StringList,
    outputs: GetOutputList,
    status: FeedStatus,
    association: S.optional(FeedAssociation),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetFeedResponse",
}) as any as S.Schema<GetFeedResponse>;
export interface ListDictionariesRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListDictionariesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/dictionaries" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDictionariesRequest",
}) as any as S.Schema<ListDictionariesRequest>;
export interface DictionarySummary {
  arn: string;
  id: string;
  name: string;
  language: DictionaryLanguage;
  status: DictionaryStatus;
}
export const DictionarySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    id: S.String,
    name: S.String,
    language: DictionaryLanguage,
    status: DictionaryStatus,
  }),
).annotate({
  identifier: "DictionarySummary",
}) as any as S.Schema<DictionarySummary>;
export type DictionarySummaryList = DictionarySummary[];
export const DictionarySummaryList = /*@__PURE__*/ S.Array(DictionarySummary);
export interface ListDictionariesResponse {
  dictionaries: DictionarySummary[];
  nextToken?: string;
}
export const ListDictionariesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dictionaries: DictionarySummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDictionariesResponse",
}) as any as S.Schema<ListDictionariesResponse>;
export interface ListFeedsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListFeedsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/feeds" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFeedsRequest",
}) as any as S.Schema<ListFeedsRequest>;
export interface FeedSummary {
  arn: string;
  id: string;
  name: string;
  association?: FeedAssociation;
  status: FeedStatus;
}
export const FeedSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    id: S.String,
    name: S.String,
    association: S.optional(FeedAssociation),
    status: FeedStatus,
  }),
).annotate({ identifier: "FeedSummary" }) as any as S.Schema<FeedSummary>;
export type FeedSummaryList = FeedSummary[];
export const FeedSummaryList = /*@__PURE__*/ S.Array(FeedSummary);
export interface ListFeedsResponse {
  feeds: FeedSummary[];
  nextToken?: string;
}
export const ListFeedsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ feeds: FeedSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListFeedsResponse",
}) as any as S.Schema<ListFeedsResponse>;
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/tags/{resourceArn}" }),
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
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
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
      T.Http({ method: "POST", uri: "/v1/tags/{resourceArn}" }),
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
      T.Http({ method: "DELETE", uri: "/v1/tags/{resourceArn}" }),
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
export interface UpdateDictionaryRequest {
  id: string;
  name?: string;
  language?: DictionaryLanguage;
  entries?: string;
}
export const UpdateDictionaryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    name: S.optional(S.String),
    language: S.optional(DictionaryLanguage),
    entries: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/v1/dictionary/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDictionaryRequest",
}) as any as S.Schema<UpdateDictionaryRequest>;
export interface UpdateDictionaryResponse {
  name: string;
  arn: string;
  id: string;
  language: DictionaryLanguage;
  status: DictionaryStatus;
  references?: string[];
  tags?: { [key: string]: string | undefined };
}
export const UpdateDictionaryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    arn: S.String,
    id: S.String,
    language: DictionaryLanguage,
    status: DictionaryStatus,
    references: S.optional(FeedReferences),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "UpdateDictionaryResponse",
}) as any as S.Schema<UpdateDictionaryResponse>;
export interface UpdateOutput {
  name: string;
  outputConfig: OutputConfig;
  status: OutputStatus;
  description?: string;
  fromAssociation?: boolean;
}
export const UpdateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    outputConfig: OutputConfig,
    status: OutputStatus,
    description: S.optional(S.String),
    fromAssociation: S.optional(S.Boolean),
  }),
).annotate({ identifier: "UpdateOutput" }) as any as S.Schema<UpdateOutput>;
export type UpdateOutputList = UpdateOutput[];
export const UpdateOutputList = /*@__PURE__*/ S.Array(UpdateOutput);
export interface UpdateFeedRequest {
  name: string;
  id: string;
  outputs: UpdateOutput[];
}
export const UpdateFeedRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    id: S.String.pipe(T.HttpLabel("id")),
    outputs: UpdateOutputList,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/feed/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFeedRequest",
}) as any as S.Schema<UpdateFeedRequest>;
export interface UpdateFeedResponse {
  arn: string;
  name: string;
  id: string;
  dataEndpoints: string[];
  outputs: GetOutput[];
  status: FeedStatus;
  association?: FeedAssociation;
  tags?: { [key: string]: string | undefined };
}
export const UpdateFeedResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.String,
    id: S.String,
    dataEndpoints: StringList,
    outputs: GetOutputList,
    status: FeedStatus,
    association: S.optional(FeedAssociation),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "UpdateFeedResponse",
}) as any as S.Schema<UpdateFeedResponse>;
export type AssociateFeedError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Associates a resource with the feed. The resource provides the input that Elemental Inference needs in order to perform an Elemental Inference feature, such as cropping video. You always provide the resource by associating it with a feed. You can associate only one resource with each feed. With an association, a specific source media is claiming ownership of the feed.
 *
 * AssociateFeed is a PATCH operation, which means that you can include only parameters that you want to change. Parameters that you don't include will not be affected by the operation.
 *
 * Specifically:
 *
 * - You can add more outputs to the existing outputs. New outputs will be appended.
 *
 * - You can't modify an existing output (for example to change its name). Instead, use UpdateFeed.
 *
 * - You can't delete an existing output. Instead, use UpdateFeed.
 *
 * Also note that you can't change the feed name with AssociateFeed. Instead, use UpdateFeed.
 */
export const associateFeed: API.OperationMethod<
  AssociateFeedRequest,
  AssociateFeedResponse,
  AssociateFeedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateFeedRequest,
  output: AssociateFeedResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateFeed",
}));

export type CreateDictionaryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ServiceQuotaExceededException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Creates a custom dictionary for improving transcription accuracy. A dictionary contains custom words and phrases that the ASR engine might not recognize, such as brand names, technical terms, or proper nouns. You can reference a dictionary when configuring a smart subtitles output.
 */
export const createDictionary: API.OperationMethod<
  CreateDictionaryRequest,
  CreateDictionaryResponse,
  CreateDictionaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDictionaryRequest,
  output: CreateDictionaryResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ServiceQuotaExceededException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDictionary",
}));

export type CreateFeedError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ServiceQuotaExceededException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Creates a feed. The feed is the target for the live media stream that is being sent by the calling application. An example of a calling application is AWS Elemental MediaLive.
 *
 * The key contents of the feed is an array of outputs. Each output represents an Elemental Inference feature. After you create the feed, you must associate a resource with the feed. At that point, you will have a useable feed: resource - feed - output or outputs.
 */
export const createFeed: API.OperationMethod<
  CreateFeedRequest,
  CreateFeedResponse,
  CreateFeedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFeedRequest,
  output: CreateFeedResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ServiceQuotaExceededException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFeed",
}));

export type DeleteDictionaryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified dictionary. You cannot delete a dictionary that is referenced by a feed. You must first remove the dictionary reference from the feed's subtitling configuration.
 */
export const deleteDictionary: API.OperationMethod<
  DeleteDictionaryRequest,
  DeleteDictionaryResponse,
  DeleteDictionaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDictionaryRequest,
  output: DeleteDictionaryResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDictionary",
}));

export type DeleteFeedError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified feed. You can delete the feed at any time. Elemental Inference doesn't block you from deleting a feed when the calling application is calling PutMedia or GetMetadata on that feed, although both these calls will start to fail. For more information about managing inactive feeds, see the Elemental Inference User Guide.
 */
export const deleteFeed: API.OperationMethod<
  DeleteFeedRequest,
  DeleteFeedResponse,
  DeleteFeedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFeedRequest,
  output: DeleteFeedResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFeed",
}));

export type DisassociateFeedError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Releases the resource (the source media) that is associated with this feed. The outputs in the feed become DISABLED.
 */
export const disassociateFeed: API.OperationMethod<
  DisassociateFeedRequest,
  DisassociateFeedResponse,
  DisassociateFeedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateFeedRequest,
  output: DisassociateFeedResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFeed",
}));

export type ExportDictionaryEntriesError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Exports the entries from the specified dictionary.
 */
export const exportDictionaryEntries: API.OperationMethod<
  ExportDictionaryEntriesRequest,
  ExportDictionaryEntriesResponse,
  ExportDictionaryEntriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExportDictionaryEntriesRequest,
  output: ExportDictionaryEntriesResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportDictionaryEntries",
}));

export type GetDictionaryError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the specified dictionary.
 */
export const getDictionary: API.OperationMethod<
  GetDictionaryRequest,
  GetDictionaryResponse,
  GetDictionaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDictionaryRequest,
  output: GetDictionaryResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDictionary",
}));

export type GetFeedError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | CommonErrors;
/**
 * Retrieves information about the specified feed.
 */
export const getFeed: API.OperationMethod<
  GetFeedRequest,
  GetFeedResponse,
  GetFeedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFeedRequest,
  output: GetFeedResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFeed",
}));

export type ListDictionariesError =
  | AccessDeniedException
  | InternalServerErrorException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Lists the dictionaries in your account.
 */
export const listDictionaries: API.PaginatedOperationMethod<
  ListDictionariesRequest,
  ListDictionariesResponse,
  ListDictionariesError,
  Credentials | HttpClient.HttpClient,
  DictionarySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDictionariesRequest,
  output: ListDictionariesResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDictionaries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dictionaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFeedsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Displays a list of feeds that belong to this AWS account.
 */
export const listFeeds: API.PaginatedOperationMethod<
  ListFeedsRequest,
  ListFeedsResponse,
  ListFeedsError,
  Credentials | HttpClient.HttpClient,
  FeedSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFeedsRequest,
  output: ListFeedsResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFeeds",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "feeds",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * List all tags that are on an Elemental Inference resource in the current region.
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
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Associates the specified tags to the resource identified by the specified resourceArn in the current region. If existing tags on a resource are not specified in the request parameters, they are not changed. When a resource is deleted, the tags associated with that resource are also deleted.
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
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Deletes specified tags from the specified resource in the current region.
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
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateDictionaryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified dictionary.
 */
export const updateDictionary: API.OperationMethod<
  UpdateDictionaryRequest,
  UpdateDictionaryResponse,
  UpdateDictionaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDictionaryRequest,
  output: UpdateDictionaryResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDictionary",
}));

export type UpdateFeedError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Updates the name and/or outputs in a feed.
 *
 * UpdateFeed is a PUT operation, which means that the payload that you specify completely overwrites the existing payload.
 *
 * This means that if you want to touch the array of outputs, you must pass in the full new list. So you must omit outputs you want to delete, and include outputs you want to add or modify.
 *
 * If you want to patch the array of outputs to make selective additions, use AssociateFeed.
 */
export const updateFeed: API.OperationMethod<
  UpdateFeedRequest,
  UpdateFeedResponse,
  UpdateFeedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFeedRequest,
  output: UpdateFeedResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFeed",
}));
