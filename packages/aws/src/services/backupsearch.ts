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
  sdkId: "BackupSearch",
  serviceShapeName: "CryoBackupSearchService",
});
const auth = T.AwsAuthSigv4({ name: "backup-search" });
const ver = T.ServiceVersion("2018-05-10");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const { UseFIPS = false, Endpoint, Region } = p;
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
        if (UseFIPS === true) {
          return e(
            `https://backup-search-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://backup-search.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
      serviceCode: S.String,
      quotaCode: S.String,
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export type GenericId = string;
export interface GetSearchJobInput {
  SearchJobIdentifier: string;
}
export const GetSearchJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SearchJobIdentifier: S.String.pipe(T.HttpLabel("SearchJobIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/search-jobs/{SearchJobIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSearchJobInput",
}) as any as S.Schema<GetSearchJobInput>;
export interface SearchScopeSummary {
  TotalRecoveryPointsToScanCount?: number;
  TotalItemsToScanCount?: number;
}
export const SearchScopeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TotalRecoveryPointsToScanCount: S.optional(S.Number),
    TotalItemsToScanCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "SearchScopeSummary",
}) as any as S.Schema<SearchScopeSummary>;
export interface CurrentSearchProgress {
  RecoveryPointsScannedCount?: number;
  ItemsScannedCount?: number;
  ItemsMatchedCount?: number;
}
export const CurrentSearchProgress = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RecoveryPointsScannedCount: S.optional(S.Number),
    ItemsScannedCount: S.optional(S.Number),
    ItemsMatchedCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "CurrentSearchProgress",
}) as any as S.Schema<CurrentSearchProgress>;
export type EncryptionKeyArn = string;
export type SearchJobState =
  | "RUNNING"
  | "COMPLETED"
  | "STOPPING"
  | "STOPPED"
  | "FAILED"
  | (string & {});
export const SearchJobState = /*@__PURE__*/ S.String;

export type ResourceType = "S3" | "EBS" | (string & {});
export const ResourceType = /*@__PURE__*/ S.String;

export type ResourceTypeList = ResourceType[];
export const ResourceTypeList = /*@__PURE__*/ S.Array(ResourceType);
export interface BackupCreationTimeFilter {
  CreatedAfter?: Date;
  CreatedBefore?: Date;
}
export const BackupCreationTimeFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "BackupCreationTimeFilter",
}) as any as S.Schema<BackupCreationTimeFilter>;
export type ResourceArnList = string[];
export const ResourceArnList = /*@__PURE__*/ S.Array(S.String);
export type RecoveryPoint = string;
export type RecoveryPointArnList = string[];
export const RecoveryPointArnList = /*@__PURE__*/ S.Array(S.String);
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
).pipe(T.Sparse());
export interface SearchScope {
  BackupResourceTypes: ResourceType[];
  BackupResourceCreationTime?: BackupCreationTimeFilter;
  SourceResourceArns?: string[];
  BackupResourceArns?: string[];
  BackupResourceTags?: { [key: string]: string | undefined };
}
export const SearchScope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BackupResourceTypes: ResourceTypeList,
    BackupResourceCreationTime: S.optional(BackupCreationTimeFilter),
    SourceResourceArns: S.optional(ResourceArnList),
    BackupResourceArns: S.optional(RecoveryPointArnList),
    BackupResourceTags: S.optional(TagMap),
  }),
).annotate({ identifier: "SearchScope" }) as any as S.Schema<SearchScope>;
export type StringConditionOperator =
  | "EQUALS_TO"
  | "NOT_EQUALS_TO"
  | "CONTAINS"
  | "DOES_NOT_CONTAIN"
  | "BEGINS_WITH"
  | "ENDS_WITH"
  | "DOES_NOT_BEGIN_WITH"
  | "DOES_NOT_END_WITH"
  | (string & {});
export const StringConditionOperator = /*@__PURE__*/ S.String;

export interface StringCondition {
  Value: string;
  Operator?: StringConditionOperator;
}
export const StringCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.String, Operator: S.optional(StringConditionOperator) }),
).annotate({
  identifier: "StringCondition",
}) as any as S.Schema<StringCondition>;
export type StringConditionList = StringCondition[];
export const StringConditionList = /*@__PURE__*/ S.Array(StringCondition);
export type LongConditionOperator =
  | "EQUALS_TO"
  | "NOT_EQUALS_TO"
  | "LESS_THAN_EQUAL_TO"
  | "GREATER_THAN_EQUAL_TO"
  | (string & {});
export const LongConditionOperator = /*@__PURE__*/ S.String;

export interface LongCondition {
  Value: number;
  Operator?: LongConditionOperator;
}
export const LongCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.Number, Operator: S.optional(LongConditionOperator) }),
).annotate({ identifier: "LongCondition" }) as any as S.Schema<LongCondition>;
export type LongConditionList = LongCondition[];
export const LongConditionList = /*@__PURE__*/ S.Array(LongCondition);
export type TimeConditionOperator =
  | "EQUALS_TO"
  | "NOT_EQUALS_TO"
  | "LESS_THAN_EQUAL_TO"
  | "GREATER_THAN_EQUAL_TO"
  | (string & {});
export const TimeConditionOperator = /*@__PURE__*/ S.String;

export interface TimeCondition {
  Value: Date;
  Operator?: TimeConditionOperator;
}
export const TimeCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Value: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Operator: S.optional(TimeConditionOperator),
  }),
).annotate({ identifier: "TimeCondition" }) as any as S.Schema<TimeCondition>;
export type TimeConditionList = TimeCondition[];
export const TimeConditionList = /*@__PURE__*/ S.Array(TimeCondition);
export interface S3ItemFilter {
  ObjectKeys?: StringCondition[];
  Sizes?: LongCondition[];
  CreationTimes?: TimeCondition[];
  VersionIds?: StringCondition[];
  ETags?: StringCondition[];
}
export const S3ItemFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ObjectKeys: S.optional(StringConditionList),
    Sizes: S.optional(LongConditionList),
    CreationTimes: S.optional(TimeConditionList),
    VersionIds: S.optional(StringConditionList),
    ETags: S.optional(StringConditionList),
  }),
).annotate({ identifier: "S3ItemFilter" }) as any as S.Schema<S3ItemFilter>;
export type S3ItemFilters = S3ItemFilter[];
export const S3ItemFilters = /*@__PURE__*/ S.Array(S3ItemFilter);
export interface EBSItemFilter {
  FilePaths?: StringCondition[];
  Sizes?: LongCondition[];
  CreationTimes?: TimeCondition[];
  LastModificationTimes?: TimeCondition[];
}
export const EBSItemFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FilePaths: S.optional(StringConditionList),
    Sizes: S.optional(LongConditionList),
    CreationTimes: S.optional(TimeConditionList),
    LastModificationTimes: S.optional(TimeConditionList),
  }),
).annotate({ identifier: "EBSItemFilter" }) as any as S.Schema<EBSItemFilter>;
export type EBSItemFilters = EBSItemFilter[];
export const EBSItemFilters = /*@__PURE__*/ S.Array(EBSItemFilter);
export interface ItemFilters {
  S3ItemFilters?: S3ItemFilter[];
  EBSItemFilters?: EBSItemFilter[];
}
export const ItemFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3ItemFilters: S.optional(S3ItemFilters),
    EBSItemFilters: S.optional(EBSItemFilters),
  }),
).annotate({ identifier: "ItemFilters" }) as any as S.Schema<ItemFilters>;
export type SearchJobArn = string;
export interface GetSearchJobOutput {
  Name?: string;
  SearchScopeSummary?: SearchScopeSummary;
  CurrentSearchProgress?: CurrentSearchProgress;
  StatusMessage?: string;
  EncryptionKeyArn?: string;
  CompletionTime?: Date;
  Status: SearchJobState;
  SearchScope: SearchScope;
  ItemFilters: ItemFilters;
  CreationTime: Date;
  SearchJobIdentifier: string;
  SearchJobArn: string;
}
export const GetSearchJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    SearchScopeSummary: S.optional(SearchScopeSummary),
    CurrentSearchProgress: S.optional(CurrentSearchProgress),
    StatusMessage: S.optional(S.String),
    EncryptionKeyArn: S.optional(S.String),
    CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: SearchJobState,
    SearchScope: SearchScope,
    ItemFilters: ItemFilters,
    CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    SearchJobIdentifier: S.String,
    SearchJobArn: S.String,
  }),
).annotate({
  identifier: "GetSearchJobOutput",
}) as any as S.Schema<GetSearchJobOutput>;
export interface GetSearchResultExportJobInput {
  ExportJobIdentifier: string;
}
export const GetSearchResultExportJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExportJobIdentifier: S.String.pipe(T.HttpLabel("ExportJobIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/export-search-jobs/{ExportJobIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSearchResultExportJobInput",
}) as any as S.Schema<GetSearchResultExportJobInput>;
export type ExportJobArn = string;
export type ExportJobStatus =
  | "RUNNING"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export const ExportJobStatus = /*@__PURE__*/ S.String;

export interface S3ExportSpecification {
  DestinationBucket: string;
  DestinationPrefix?: string;
}
export const S3ExportSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DestinationBucket: S.String,
    DestinationPrefix: S.optional(S.String),
  }),
).annotate({
  identifier: "S3ExportSpecification",
}) as any as S.Schema<S3ExportSpecification>;
export type ExportSpecification = {
  s3ExportSpecification: S3ExportSpecification;
};
export const ExportSpecification = /*@__PURE__*/ S.Union([
  S.Struct({ s3ExportSpecification: S3ExportSpecification }),
]);
export interface GetSearchResultExportJobOutput {
  ExportJobIdentifier: string;
  ExportJobArn?: string;
  Status?: ExportJobStatus;
  CreationTime?: Date;
  CompletionTime?: Date;
  StatusMessage?: string;
  ExportSpecification?: ExportSpecification;
  SearchJobArn?: string;
}
export const GetSearchResultExportJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExportJobIdentifier: S.String,
    ExportJobArn: S.optional(S.String),
    Status: S.optional(ExportJobStatus),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StatusMessage: S.optional(S.String),
    ExportSpecification: S.optional(ExportSpecification),
    SearchJobArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetSearchResultExportJobOutput",
}) as any as S.Schema<GetSearchResultExportJobOutput>;
export interface ListSearchJobBackupsInput {
  SearchJobIdentifier: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListSearchJobBackupsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SearchJobIdentifier: S.String.pipe(T.HttpLabel("SearchJobIdentifier")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/search-jobs/{SearchJobIdentifier}/backups",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSearchJobBackupsInput",
}) as any as S.Schema<ListSearchJobBackupsInput>;
export interface SearchJobBackupsResult {
  Status?: SearchJobState;
  StatusMessage?: string;
  ResourceType?: ResourceType;
  BackupResourceArn?: string;
  SourceResourceArn?: string;
  IndexCreationTime?: Date;
  BackupCreationTime?: Date;
}
export const SearchJobBackupsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(SearchJobState),
    StatusMessage: S.optional(S.String),
    ResourceType: S.optional(ResourceType),
    BackupResourceArn: S.optional(S.String),
    SourceResourceArn: S.optional(S.String),
    IndexCreationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    BackupCreationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "SearchJobBackupsResult",
}) as any as S.Schema<SearchJobBackupsResult>;
export type SearchJobBackupsResults = SearchJobBackupsResult[];
export const SearchJobBackupsResults = /*@__PURE__*/ S.Array(
  SearchJobBackupsResult,
);
export interface ListSearchJobBackupsOutput {
  Results: SearchJobBackupsResult[];
  NextToken?: string;
}
export const ListSearchJobBackupsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Results: SearchJobBackupsResults,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSearchJobBackupsOutput",
}) as any as S.Schema<ListSearchJobBackupsOutput>;
export interface ListSearchJobResultsInput {
  SearchJobIdentifier: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListSearchJobResultsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SearchJobIdentifier: S.String.pipe(T.HttpLabel("SearchJobIdentifier")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/search-jobs/{SearchJobIdentifier}/search-results",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSearchJobResultsInput",
}) as any as S.Schema<ListSearchJobResultsInput>;
export type ObjectKey = string | redacted.Redacted<string>;
export interface S3ResultItem {
  BackupResourceArn?: string;
  SourceResourceArn?: string;
  BackupVaultName?: string;
  ObjectKey?: string | redacted.Redacted<string>;
  ObjectSize?: number;
  CreationTime?: Date;
  ETag?: string;
  VersionId?: string;
}
export const S3ResultItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BackupResourceArn: S.optional(S.String),
    SourceResourceArn: S.optional(S.String),
    BackupVaultName: S.optional(S.String),
    ObjectKey: S.optional(SensitiveString),
    ObjectSize: S.optional(S.Number),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ETag: S.optional(S.String),
    VersionId: S.optional(S.String),
  }),
).annotate({ identifier: "S3ResultItem" }) as any as S.Schema<S3ResultItem>;
export type FilePath = string | redacted.Redacted<string>;
export interface EBSResultItem {
  BackupResourceArn?: string;
  SourceResourceArn?: string;
  BackupVaultName?: string;
  FileSystemIdentifier?: string;
  FilePath?: string | redacted.Redacted<string>;
  FileSize?: number;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export const EBSResultItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BackupResourceArn: S.optional(S.String),
    SourceResourceArn: S.optional(S.String),
    BackupVaultName: S.optional(S.String),
    FileSystemIdentifier: S.optional(S.String),
    FilePath: S.optional(SensitiveString),
    FileSize: S.optional(S.Number),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "EBSResultItem" }) as any as S.Schema<EBSResultItem>;
export type ResultItem =
  | { S3ResultItem: S3ResultItem; EBSResultItem?: never }
  | { S3ResultItem?: never; EBSResultItem: EBSResultItem };
export const ResultItem = /*@__PURE__*/ S.Union([
  S.Struct({ S3ResultItem: S3ResultItem }),
  S.Struct({ EBSResultItem: EBSResultItem }),
]);
export type Results = ResultItem[];
export const Results = /*@__PURE__*/ S.Array(ResultItem);
export interface ListSearchJobResultsOutput {
  Results: ResultItem[];
  NextToken?: string;
}
export const ListSearchJobResultsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Results: Results, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListSearchJobResultsOutput",
}) as any as S.Schema<ListSearchJobResultsOutput>;
export interface ListSearchJobsInput {
  ByStatus?: SearchJobState;
  NextToken?: string;
  MaxResults?: number;
}
export const ListSearchJobsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ByStatus: S.optional(SearchJobState).pipe(T.HttpQuery("Status")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/search-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSearchJobsInput",
}) as any as S.Schema<ListSearchJobsInput>;
export interface SearchJobSummary {
  SearchJobIdentifier?: string;
  SearchJobArn?: string;
  Name?: string;
  Status?: SearchJobState;
  CreationTime?: Date;
  CompletionTime?: Date;
  SearchScopeSummary?: SearchScopeSummary;
  StatusMessage?: string;
}
export const SearchJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SearchJobIdentifier: S.optional(S.String),
    SearchJobArn: S.optional(S.String),
    Name: S.optional(S.String),
    Status: S.optional(SearchJobState),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    SearchScopeSummary: S.optional(SearchScopeSummary),
    StatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchJobSummary",
}) as any as S.Schema<SearchJobSummary>;
export type SearchJobs = SearchJobSummary[];
export const SearchJobs = /*@__PURE__*/ S.Array(SearchJobSummary);
export interface ListSearchJobsOutput {
  SearchJobs: SearchJobSummary[];
  NextToken?: string;
}
export const ListSearchJobsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SearchJobs: SearchJobs, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListSearchJobsOutput",
}) as any as S.Schema<ListSearchJobsOutput>;
export interface ListSearchResultExportJobsInput {
  Status?: ExportJobStatus;
  SearchJobIdentifier?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListSearchResultExportJobsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(ExportJobStatus).pipe(T.HttpQuery("Status")),
    SearchJobIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("SearchJobIdentifier"),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/export-search-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSearchResultExportJobsInput",
}) as any as S.Schema<ListSearchResultExportJobsInput>;
export interface ExportJobSummary {
  ExportJobIdentifier: string;
  ExportJobArn?: string;
  Status?: ExportJobStatus;
  CreationTime?: Date;
  CompletionTime?: Date;
  StatusMessage?: string;
  SearchJobArn?: string;
}
export const ExportJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExportJobIdentifier: S.String,
    ExportJobArn: S.optional(S.String),
    Status: S.optional(ExportJobStatus),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StatusMessage: S.optional(S.String),
    SearchJobArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ExportJobSummary",
}) as any as S.Schema<ExportJobSummary>;
export type ExportJobSummaries = ExportJobSummary[];
export const ExportJobSummaries = /*@__PURE__*/ S.Array(ExportJobSummary);
export interface ListSearchResultExportJobsOutput {
  ExportJobs: ExportJobSummary[];
  NextToken?: string;
}
export const ListSearchResultExportJobsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExportJobs: ExportJobSummaries, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListSearchResultExportJobsOutput",
}) as any as S.Schema<ListSearchResultExportJobsOutput>;
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
export interface StartSearchJobInput {
  Tags?: { [key: string]: string | undefined };
  Name?: string;
  EncryptionKeyArn?: string;
  ClientToken?: string;
  SearchScope: SearchScope;
  ItemFilters?: ItemFilters;
}
export const StartSearchJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Tags: S.optional(TagMap),
    Name: S.optional(S.String),
    EncryptionKeyArn: S.optional(S.String),
    ClientToken: S.optional(S.String),
    SearchScope: SearchScope,
    ItemFilters: S.optional(ItemFilters),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/search-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartSearchJobInput",
}) as any as S.Schema<StartSearchJobInput>;
export interface StartSearchJobOutput {
  SearchJobArn?: string;
  CreationTime?: Date;
  SearchJobIdentifier?: string;
}
export const StartSearchJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SearchJobArn: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    SearchJobIdentifier: S.optional(S.String),
  }),
).annotate({
  identifier: "StartSearchJobOutput",
}) as any as S.Schema<StartSearchJobOutput>;
export type IamRoleArn = string;
export interface StartSearchResultExportJobInput {
  SearchJobIdentifier: string;
  ExportSpecification: ExportSpecification;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
  RoleArn?: string;
}
export const StartSearchResultExportJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SearchJobIdentifier: S.String,
    ExportSpecification: ExportSpecification,
    ClientToken: S.optional(S.String),
    Tags: S.optional(TagMap),
    RoleArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/export-search-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartSearchResultExportJobInput",
}) as any as S.Schema<StartSearchResultExportJobInput>;
export interface StartSearchResultExportJobOutput {
  ExportJobArn?: string;
  ExportJobIdentifier: string;
}
export const StartSearchResultExportJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExportJobArn: S.optional(S.String),
    ExportJobIdentifier: S.String,
  }),
).annotate({
  identifier: "StartSearchResultExportJobOutput",
}) as any as S.Schema<StartSearchResultExportJobOutput>;
export interface StopSearchJobInput {
  SearchJobIdentifier: string;
}
export const StopSearchJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SearchJobIdentifier: S.String.pipe(T.HttpLabel("SearchJobIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/search-jobs/{SearchJobIdentifier}/actions/cancel",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopSearchJobInput",
}) as any as S.Schema<StopSearchJobInput>;
export interface StopSearchJobOutput {}
export const StopSearchJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopSearchJobOutput",
}) as any as S.Schema<StopSearchJobOutput>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: TagMap,
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
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: TagKeys.pipe(T.HttpQuery("tagKeys")),
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
export type GetSearchJobError = ResourceNotFoundException | CommonErrors;
/**
 * This operation retrieves metadata of a search job, including its progress.
 */
export const getSearchJob: API.OperationMethod<
  GetSearchJobInput,
  GetSearchJobOutput,
  GetSearchJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSearchJobInput,
  output: GetSearchJobOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSearchJob",
}));

export type GetSearchResultExportJobError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This operation retrieves the metadata of an export job.
 *
 * An export job is an operation that transmits the results of a search job to a specified S3 bucket in a .csv file.
 *
 * An export job allows you to retain results of a search beyond the search job's scheduled retention of 7 days.
 */
export const getSearchResultExportJob: API.OperationMethod<
  GetSearchResultExportJobInput,
  GetSearchResultExportJobOutput,
  GetSearchResultExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSearchResultExportJobInput,
  output: GetSearchResultExportJobOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSearchResultExportJob",
}));

export type ListSearchJobBackupsError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This operation returns a list of all backups (recovery points) in a paginated format that were included in the search job.
 *
 * If a search does not display an expected backup in the results, you can call this operation to display each backup included in the search. Any backups that were not included because they have a `FAILED` status from a permissions issue will be displayed, along with a status message.
 *
 * Only recovery points with a backup index that has a status of `ACTIVE` will be included in search results. If the index has any other status, its status will be displayed along with a status message.
 */
export const listSearchJobBackups: API.PaginatedOperationMethod<
  ListSearchJobBackupsInput,
  ListSearchJobBackupsOutput,
  ListSearchJobBackupsError,
  Credentials | HttpClient.HttpClient,
  SearchJobBackupsResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSearchJobBackupsInput,
  output: ListSearchJobBackupsOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSearchJobBackups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSearchJobResultsError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This operation returns a list of a specified search job.
 */
export const listSearchJobResults: API.PaginatedOperationMethod<
  ListSearchJobResultsInput,
  ListSearchJobResultsOutput,
  ListSearchJobResultsError,
  Credentials | HttpClient.HttpClient,
  ResultItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSearchJobResultsInput,
  output: ListSearchJobResultsOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSearchJobResults",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSearchJobsError = CommonErrors;
/**
 * This operation returns a list of search jobs belonging to an account.
 */
export const listSearchJobs: API.PaginatedOperationMethod<
  ListSearchJobsInput,
  ListSearchJobsOutput,
  ListSearchJobsError,
  Credentials | HttpClient.HttpClient,
  SearchJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSearchJobsInput,
  output: ListSearchJobsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSearchJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SearchJobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSearchResultExportJobsError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * This operation exports search results of a search job to a specified destination S3 bucket.
 */
export const listSearchResultExportJobs: API.PaginatedOperationMethod<
  ListSearchResultExportJobsInput,
  ListSearchResultExportJobsOutput,
  ListSearchResultExportJobsError,
  Credentials | HttpClient.HttpClient,
  ExportJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSearchResultExportJobsInput,
  output: ListSearchResultExportJobsOutput,
  errors: [ResourceNotFoundException, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSearchResultExportJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ExportJobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * This operation returns the tags for a resource type.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type StartSearchJobError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * This operation creates a search job which returns recovery points filtered by SearchScope and items filtered by ItemFilters.
 *
 * You can optionally include ClientToken, EncryptionKeyArn, Name, and/or Tags.
 */
export const startSearchJob: API.OperationMethod<
  StartSearchJobInput,
  StartSearchJobOutput,
  StartSearchJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartSearchJobInput,
  output: StartSearchJobOutput,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSearchJob",
}));

export type StartSearchResultExportJobError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * This operations starts a job to export the results of search job to a designated S3 bucket.
 */
export const startSearchResultExportJob: API.OperationMethod<
  StartSearchResultExportJobInput,
  StartSearchResultExportJobOutput,
  StartSearchResultExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartSearchResultExportJobInput,
  output: StartSearchResultExportJobOutput,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSearchResultExportJob",
}));

export type StopSearchJobError =
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This operations ends a search job.
 *
 * Only a search job with a status of `RUNNING` can be stopped.
 */
export const stopSearchJob: API.OperationMethod<
  StopSearchJobInput,
  StopSearchJobOutput,
  StopSearchJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopSearchJobInput,
  output: StopSearchJobOutput,
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopSearchJob",
}));

export type TagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * This operation puts tags on the resource you indicate.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * This operation removes tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));
