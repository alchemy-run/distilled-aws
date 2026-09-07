import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const ns = T.XmlNamespace("http://cloudsearch.amazonaws.com/doc/2013-01-01/");
const svc = T.AwsApiService({
  sdkId: "CloudSearch Domain",
  serviceShapeName: "AmazonCloudSearch2013",
});
const auth = T.AwsAuthSigv4({ name: "cloudsearch" });
const ver = T.ServiceVersion("2013-01-01");
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
              `https://cloudsearchdomain-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://cloudsearchdomain-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://cloudsearchdomain.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://cloudsearchdomain.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class DocumentServiceException
  extends /*@__PURE__*/ S.TaggedError<DocumentServiceException>()(
    "DocumentServiceException",
    {
      status: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
  ) {}
export class SearchException
  extends /*@__PURE__*/ S.TaggedError<SearchException>()("SearchException", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export type Cursor = string;
export type Expr = string;
export type Facet = string;
export type FilterQuery = string;
export type Highlight = string;
export type Partial = boolean;
export type Query = string;
export type QueryOptions = string;
export type QueryParser =
  | "simple"
  | "structured"
  | "lucene"
  | "dismax"
  | (string & {});
export const QueryParser = /*@__PURE__*/ S.String;

export type Return = string;
export type Size = number;
export type Sort = string;
export type Start = number;
export type Stat = string;
export interface SearchRequest {
  cursor?: string;
  expr?: string;
  facet?: string;
  filterQuery?: string;
  highlight?: string;
  partial?: boolean;
  query: string;
  queryOptions?: string;
  queryParser?: QueryParser;
  return?: string;
  size?: number;
  sort?: string;
  start?: number;
  stats?: string;
}
export const SearchRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cursor: S.optional(S.String).pipe(T.HttpQuery("cursor")),
    expr: S.optional(S.String).pipe(T.HttpQuery("expr")),
    facet: S.optional(S.String).pipe(T.HttpQuery("facet")),
    filterQuery: S.optional(S.String).pipe(T.HttpQuery("fq")),
    highlight: S.optional(S.String).pipe(T.HttpQuery("highlight")),
    partial: S.optional(S.Boolean).pipe(T.HttpQuery("partial")),
    query: S.String.pipe(T.HttpQuery("q")),
    queryOptions: S.optional(S.String).pipe(T.HttpQuery("q.options")),
    queryParser: S.optional(QueryParser).pipe(T.HttpQuery("q.parser")),
    return: S.optional(S.String).pipe(T.HttpQuery("return")),
    size: S.optional(S.Number).pipe(T.HttpQuery("size")),
    sort: S.optional(S.String).pipe(T.HttpQuery("sort")),
    start: S.optional(S.Number).pipe(T.HttpQuery("start")),
    stats: S.optional(S.String).pipe(T.HttpQuery("stats")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2013-01-01/search?format=sdk&pretty=true",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "SearchRequest" }) as any as S.Schema<SearchRequest>;
export interface SearchStatus {
  timems?: number;
  rid?: string;
}
export const SearchStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ timems: S.optional(S.Number), rid: S.optional(S.String) }),
).annotate({ identifier: "SearchStatus" }) as any as S.Schema<SearchStatus>;
export type FieldValue = string[];
export const FieldValue = /*@__PURE__*/ S.Array(S.String);
export type Fields = { [key: string]: string[] | undefined };
export const Fields = /*@__PURE__*/ S.Record(
  S.String,
  FieldValue.pipe(S.optional),
);
export type Exprs = { [key: string]: string | undefined };
export const Exprs = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type Highlights = { [key: string]: string | undefined };
export const Highlights = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface Hit {
  id?: string;
  fields?: { [key: string]: string[] | undefined };
  exprs?: { [key: string]: string | undefined };
  highlights?: { [key: string]: string | undefined };
}
export const Hit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    fields: S.optional(Fields),
    exprs: S.optional(Exprs),
    highlights: S.optional(Highlights),
  }),
).annotate({ identifier: "Hit" }) as any as S.Schema<Hit>;
export type HitList = Hit[];
export const HitList = /*@__PURE__*/ S.Array(Hit);
export interface Hits {
  found?: number;
  start?: number;
  cursor?: string;
  hit?: Hit[];
}
export const Hits = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    found: S.optional(S.Number),
    start: S.optional(S.Number),
    cursor: S.optional(S.String),
    hit: S.optional(HitList),
  }),
).annotate({ identifier: "Hits" }) as any as S.Schema<Hits>;
export interface Bucket {
  value?: string;
  count?: number;
}
export const Bucket = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: S.optional(S.String), count: S.optional(S.Number) }),
).annotate({ identifier: "Bucket" }) as any as S.Schema<Bucket>;
export type BucketList = Bucket[];
export const BucketList = /*@__PURE__*/ S.Array(Bucket);
export interface BucketInfo {
  buckets?: Bucket[];
}
export const BucketInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ buckets: S.optional(BucketList) }),
).annotate({ identifier: "BucketInfo" }) as any as S.Schema<BucketInfo>;
export type Facets = { [key: string]: BucketInfo | undefined };
export const Facets = /*@__PURE__*/ S.Record(
  S.String,
  BucketInfo.pipe(S.optional),
);
export interface FieldStats {
  min?: string;
  max?: string;
  count?: number;
  missing?: number;
  sum?: number;
  sumOfSquares?: number;
  mean?: string;
  stddev?: number;
}
export const FieldStats = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    min: S.optional(S.String),
    max: S.optional(S.String),
    count: S.optional(S.Number),
    missing: S.optional(S.Number),
    sum: S.optional(S.Number),
    sumOfSquares: S.optional(S.Number),
    mean: S.optional(S.String),
    stddev: S.optional(S.Number),
  }),
).annotate({ identifier: "FieldStats" }) as any as S.Schema<FieldStats>;
export type Stats = { [key: string]: FieldStats | undefined };
export const Stats = /*@__PURE__*/ S.Record(
  S.String,
  FieldStats.pipe(S.optional),
);
export interface SearchResponse {
  status?: SearchStatus;
  hits?: Hits;
  facets?: { [key: string]: BucketInfo | undefined };
  stats?: { [key: string]: FieldStats | undefined };
}
export const SearchResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(SearchStatus),
    hits: S.optional(Hits),
    facets: S.optional(Facets),
    stats: S.optional(Stats),
  }).pipe(ns),
).annotate({ identifier: "SearchResponse" }) as any as S.Schema<SearchResponse>;
export type Suggester = string;
export type SuggestionsSize = number;
export interface SuggestRequest {
  query: string;
  suggester: string;
  size?: number;
}
export const SuggestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    query: S.String.pipe(T.HttpQuery("q")),
    suggester: S.String.pipe(T.HttpQuery("suggester")),
    size: S.optional(S.Number).pipe(T.HttpQuery("size")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2013-01-01/suggest?format=sdk&pretty=true",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "SuggestRequest" }) as any as S.Schema<SuggestRequest>;
export interface SuggestStatus {
  timems?: number;
  rid?: string;
}
export const SuggestStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ timems: S.optional(S.Number), rid: S.optional(S.String) }),
).annotate({ identifier: "SuggestStatus" }) as any as S.Schema<SuggestStatus>;
export interface SuggestionMatch {
  suggestion?: string;
  score?: number;
  id?: string;
}
export const SuggestionMatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    suggestion: S.optional(S.String),
    score: S.optional(S.Number),
    id: S.optional(S.String),
  }),
).annotate({
  identifier: "SuggestionMatch",
}) as any as S.Schema<SuggestionMatch>;
export type Suggestions = SuggestionMatch[];
export const Suggestions = /*@__PURE__*/ S.Array(SuggestionMatch);
export interface SuggestModel {
  query?: string;
  found?: number;
  suggestions?: SuggestionMatch[];
}
export const SuggestModel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    query: S.optional(S.String),
    found: S.optional(S.Number),
    suggestions: S.optional(Suggestions),
  }),
).annotate({ identifier: "SuggestModel" }) as any as S.Schema<SuggestModel>;
export interface SuggestResponse {
  status?: SuggestStatus;
  suggest?: SuggestModel;
}
export const SuggestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(SuggestStatus),
    suggest: S.optional(SuggestModel),
  }).pipe(ns),
).annotate({
  identifier: "SuggestResponse",
}) as any as S.Schema<SuggestResponse>;
export type ContentType =
  | "application/json"
  | "application/xml"
  | (string & {});
export const ContentType = /*@__PURE__*/ S.String;

export interface UploadDocumentsRequest {
  documents: T.StreamingInputBody;
  contentType: ContentType;
}
export const UploadDocumentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    documents: T.StreamingInput.pipe(T.HttpPayload()),
    contentType: ContentType.pipe(T.HttpHeader("Content-Type")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2013-01-01/documents/batch?format=sdk" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UploadDocumentsRequest",
}) as any as S.Schema<UploadDocumentsRequest>;
export type Adds = number;
export type Deletes = number;
export interface DocumentServiceWarning {
  message?: string;
}
export const DocumentServiceWarning = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.optional(S.String) }),
).annotate({
  identifier: "DocumentServiceWarning",
}) as any as S.Schema<DocumentServiceWarning>;
export type DocumentServiceWarnings = DocumentServiceWarning[];
export const DocumentServiceWarnings = /*@__PURE__*/ S.Array(
  DocumentServiceWarning,
);
export interface UploadDocumentsResponse {
  status?: string;
  adds?: number;
  deletes?: number;
  warnings?: DocumentServiceWarning[];
}
export const UploadDocumentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(S.String),
    adds: S.optional(S.Number),
    deletes: S.optional(S.Number),
    warnings: S.optional(DocumentServiceWarnings),
  }).pipe(ns),
).annotate({
  identifier: "UploadDocumentsResponse",
}) as any as S.Schema<UploadDocumentsResponse>;
export type SearchError = SearchException | CommonErrors;
/**
 * Retrieves a list of documents that match the specified search criteria. How you specify the search criteria depends on which query parser you use. Amazon CloudSearch supports four query parsers:
 *
 * - `simple`: search all `text` and `text-array` fields for the specified string. Search for phrases, individual terms, and prefixes.
 *
 * - `structured`: search specific fields, construct compound queries using Boolean operators, and use advanced features such as term boosting and proximity searching.
 *
 * - `lucene`: specify search criteria using the Apache Lucene query parser syntax.
 *
 * - `dismax`: specify search criteria using the simplified subset of the Apache Lucene query parser syntax defined by the DisMax query parser.
 *
 * For more information, see Searching Your Data in the *Amazon CloudSearch Developer Guide*.
 *
 * The endpoint for submitting `Search` requests is domain-specific. You submit search requests to a domain's search endpoint. To get the search endpoint for your domain, use the Amazon CloudSearch configuration service `DescribeDomains` action. A domain's endpoints are also displayed on the domain dashboard in the Amazon CloudSearch console.
 */
export const search: API.OperationMethod<
  SearchRequest,
  SearchResponse,
  SearchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SearchRequest,
  output: SearchResponse,
  errors: [SearchException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Search",
}));

export type SuggestError = SearchException | CommonErrors;
/**
 * Retrieves autocomplete suggestions for a partial query string. You can use suggestions enable you to display likely matches before users finish typing. In Amazon CloudSearch, suggestions are based on the contents of a particular text field. When you request suggestions, Amazon CloudSearch finds all of the documents whose values in the suggester field start with the specified query string. The beginning of the field must match the query string to be considered a match.
 *
 * For more information about configuring suggesters and retrieving suggestions, see Getting Suggestions in the *Amazon CloudSearch Developer Guide*.
 *
 * The endpoint for submitting `Suggest` requests is domain-specific. You submit suggest requests to a domain's search endpoint. To get the search endpoint for your domain, use the Amazon CloudSearch configuration service `DescribeDomains` action. A domain's endpoints are also displayed on the domain dashboard in the Amazon CloudSearch console.
 */
export const suggest: API.OperationMethod<
  SuggestRequest,
  SuggestResponse,
  SuggestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SuggestRequest,
  output: SuggestResponse,
  errors: [SearchException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Suggest",
}));

export type UploadDocumentsError = DocumentServiceException | CommonErrors;
/**
 * Posts a batch of documents to a search domain for indexing. A document batch is a collection of add and delete operations that represent the documents you want to add, update, or delete from your domain. Batches can be described in either JSON or XML. Each item that you want Amazon CloudSearch to return as a search result (such as a product) is represented as a document. Every document has a unique ID and one or more fields that contain the data that you want to search and return in results. Individual documents cannot contain more than 1 MB of data. The entire batch cannot exceed 5 MB. To get the best possible upload performance, group add and delete operations in batches that are close the 5 MB limit. Submitting a large volume of single-document batches can overload a domain's document service.
 *
 * The endpoint for submitting `UploadDocuments` requests is domain-specific. To get the document endpoint for your domain, use the Amazon CloudSearch configuration service `DescribeDomains` action. A domain's endpoints are also displayed on the domain dashboard in the Amazon CloudSearch console.
 *
 * For more information about formatting your data for Amazon CloudSearch, see Preparing Your Data in the *Amazon CloudSearch Developer Guide*.
 * For more information about uploading data for indexing, see Uploading Data in the *Amazon CloudSearch Developer Guide*.
 */
export const uploadDocuments: API.OperationMethod<
  UploadDocumentsRequest,
  UploadDocumentsResponse,
  UploadDocumentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UploadDocumentsRequest,
  output: UploadDocumentsResponse,
  errors: [DocumentServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UploadDocuments",
}));
