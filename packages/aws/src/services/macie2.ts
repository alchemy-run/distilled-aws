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
const svc = T.AwsApiService({ sdkId: "Macie2", serviceShapeName: "Macie2" });
const auth = T.AwsAuthSigv4({ name: "macie2" });
const ver = T.ServiceVersion("2020-01-01");
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
              `https://macie2-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://macie2-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://macie2.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://macie2.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class MacieNotEnabled
  extends /*@__PURE__*/ S.TaggedError<MacieNotEnabled>()(
    "MacieNotEnabled",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "AccessDeniedException",
      message: { matches: "Macie is(n[’']t| not) enabled" },
    }),
  ).pipe(C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
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
export class UnprocessableEntityException
  extends /*@__PURE__*/ S.TaggedError<UnprocessableEntityException>()(
    "UnprocessableEntityException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(422),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export interface AcceptInvitationRequest {
  administratorAccountId?: string;
  invitationId?: string;
  masterAccount?: string;
}
export const AcceptInvitationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    administratorAccountId: S.optional(S.String),
    invitationId: S.optional(S.String),
    masterAccount: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/invitations/accept" }),
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
export type __listOf__string = string[];
export const __listOf__string = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetCustomDataIdentifiersRequest {
  ids?: string[];
}
export const BatchGetCustomDataIdentifiersRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ ids: S.optional(__listOf__string) }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/custom-data-identifiers/get" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "BatchGetCustomDataIdentifiersRequest",
}) as any as S.Schema<BatchGetCustomDataIdentifiersRequest>;
export type __timestampIso8601 = Date;
export interface BatchGetCustomDataIdentifierSummary {
  arn?: string;
  createdAt?: Date;
  deleted?: boolean;
  description?: string;
  id?: string;
  name?: string;
}
export const BatchGetCustomDataIdentifierSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    deleted: S.optional(S.Boolean),
    description: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchGetCustomDataIdentifierSummary",
}) as any as S.Schema<BatchGetCustomDataIdentifierSummary>;
export type __listOfBatchGetCustomDataIdentifierSummary =
  BatchGetCustomDataIdentifierSummary[];
export const __listOfBatchGetCustomDataIdentifierSummary =
  /*@__PURE__*/ S.Array(BatchGetCustomDataIdentifierSummary);
export interface BatchGetCustomDataIdentifiersResponse {
  customDataIdentifiers?: BatchGetCustomDataIdentifierSummary[];
  notFoundIdentifierIds?: string[];
}
export const BatchGetCustomDataIdentifiersResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      customDataIdentifiers: S.optional(
        __listOfBatchGetCustomDataIdentifierSummary,
      ),
      notFoundIdentifierIds: S.optional(__listOf__string),
    }),
).annotate({
  identifier: "BatchGetCustomDataIdentifiersResponse",
}) as any as S.Schema<BatchGetCustomDataIdentifiersResponse>;
export type AutomatedDiscoveryAccountStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const AutomatedDiscoveryAccountStatus = S.String;

export interface AutomatedDiscoveryAccountUpdate {
  accountId?: string;
  status?: AutomatedDiscoveryAccountStatus;
}
export const AutomatedDiscoveryAccountUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    status: S.optional(AutomatedDiscoveryAccountStatus),
  }),
).annotate({
  identifier: "AutomatedDiscoveryAccountUpdate",
}) as any as S.Schema<AutomatedDiscoveryAccountUpdate>;
export type __listOfAutomatedDiscoveryAccountUpdate =
  AutomatedDiscoveryAccountUpdate[];
export const __listOfAutomatedDiscoveryAccountUpdate = /*@__PURE__*/ S.Array(
  AutomatedDiscoveryAccountUpdate,
);
export interface BatchUpdateAutomatedDiscoveryAccountsRequest {
  accounts?: AutomatedDiscoveryAccountUpdate[];
}
export const BatchUpdateAutomatedDiscoveryAccountsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      accounts: S.optional(__listOfAutomatedDiscoveryAccountUpdate),
    }).pipe(
      T.all(
        T.Http({ method: "PATCH", uri: "/automated-discovery/accounts" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "BatchUpdateAutomatedDiscoveryAccountsRequest",
  }) as any as S.Schema<BatchUpdateAutomatedDiscoveryAccountsRequest>;
export type AutomatedDiscoveryAccountUpdateErrorCode =
  | "ACCOUNT_PAUSED"
  | "ACCOUNT_NOT_FOUND"
  | (string & {});
export const AutomatedDiscoveryAccountUpdateErrorCode = S.String;

export interface AutomatedDiscoveryAccountUpdateError {
  accountId?: string;
  errorCode?: AutomatedDiscoveryAccountUpdateErrorCode;
}
export const AutomatedDiscoveryAccountUpdateError = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      accountId: S.optional(S.String),
      errorCode: S.optional(AutomatedDiscoveryAccountUpdateErrorCode),
    }),
).annotate({
  identifier: "AutomatedDiscoveryAccountUpdateError",
}) as any as S.Schema<AutomatedDiscoveryAccountUpdateError>;
export type __listOfAutomatedDiscoveryAccountUpdateError =
  AutomatedDiscoveryAccountUpdateError[];
export const __listOfAutomatedDiscoveryAccountUpdateError =
  /*@__PURE__*/ S.Array(AutomatedDiscoveryAccountUpdateError);
export interface BatchUpdateAutomatedDiscoveryAccountsResponse {
  errors?: AutomatedDiscoveryAccountUpdateError[];
}
export const BatchUpdateAutomatedDiscoveryAccountsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      errors: S.optional(__listOfAutomatedDiscoveryAccountUpdateError),
    }),
  ).annotate({
    identifier: "BatchUpdateAutomatedDiscoveryAccountsResponse",
  }) as any as S.Schema<BatchUpdateAutomatedDiscoveryAccountsResponse>;
export type __stringMin1Max512PatternSS = string;
export type __stringMin3Max255PatternAZaZ093255 = string;
export type __stringMin1Max1024PatternSS = string;
export interface S3WordsList {
  bucketName?: string;
  objectKey?: string;
}
export const S3WordsList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucketName: S.optional(S.String),
    objectKey: S.optional(S.String),
  }),
).annotate({ identifier: "S3WordsList" }) as any as S.Schema<S3WordsList>;
export interface AllowListCriteria {
  regex?: string;
  s3WordsList?: S3WordsList;
}
export const AllowListCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    regex: S.optional(S.String),
    s3WordsList: S.optional(S3WordsList),
  }),
).annotate({
  identifier: "AllowListCriteria",
}) as any as S.Schema<AllowListCriteria>;
export type __stringMin1Max128Pattern = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateAllowListRequest {
  clientToken?: string;
  criteria?: AllowListCriteria;
  description?: string;
  name?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateAllowListRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    criteria: S.optional(AllowListCriteria),
    description: S.optional(S.String),
    name: S.optional(S.String),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/allow-lists" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAllowListRequest",
}) as any as S.Schema<CreateAllowListRequest>;
export type __stringMin71Max89PatternArnAwsAwsCnAwsUsGovMacie2AZ19920D12AllowListAZ0922 =
  string;
export type __stringMin22Max22PatternAZ0922 = string;
export interface CreateAllowListResponse {
  arn?: string;
  id?: string;
}
export const CreateAllowListResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.optional(S.String), id: S.optional(S.String) }),
).annotate({
  identifier: "CreateAllowListResponse",
}) as any as S.Schema<CreateAllowListResponse>;
export type JobType = "ONE_TIME" | "SCHEDULED" | (string & {});
export const JobType = S.String;

export type ManagedDataIdentifierSelector =
  | "ALL"
  | "EXCLUDE"
  | "INCLUDE"
  | "NONE"
  | "RECOMMENDED"
  | (string & {});
export const ManagedDataIdentifierSelector = S.String;

export type JobComparator =
  | "EQ"
  | "GT"
  | "GTE"
  | "LT"
  | "LTE"
  | "NE"
  | "CONTAINS"
  | "STARTS_WITH"
  | (string & {});
export const JobComparator = S.String;

export type SimpleCriterionKeyForJob =
  | "ACCOUNT_ID"
  | "S3_BUCKET_NAME"
  | "S3_BUCKET_EFFECTIVE_PERMISSION"
  | "S3_BUCKET_SHARED_ACCESS"
  | (string & {});
export const SimpleCriterionKeyForJob = S.String;

export interface SimpleCriterionForJob {
  comparator?: JobComparator;
  key?: SimpleCriterionKeyForJob;
  values?: string[];
}
export const SimpleCriterionForJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    comparator: S.optional(JobComparator),
    key: S.optional(SimpleCriterionKeyForJob),
    values: S.optional(__listOf__string),
  }),
).annotate({
  identifier: "SimpleCriterionForJob",
}) as any as S.Schema<SimpleCriterionForJob>;
export interface TagCriterionPairForJob {
  key?: string;
  value?: string;
}
export const TagCriterionPairForJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
).annotate({
  identifier: "TagCriterionPairForJob",
}) as any as S.Schema<TagCriterionPairForJob>;
export type __listOfTagCriterionPairForJob = TagCriterionPairForJob[];
export const __listOfTagCriterionPairForJob = /*@__PURE__*/ S.Array(
  TagCriterionPairForJob,
);
export interface TagCriterionForJob {
  comparator?: JobComparator;
  tagValues?: TagCriterionPairForJob[];
}
export const TagCriterionForJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    comparator: S.optional(JobComparator),
    tagValues: S.optional(__listOfTagCriterionPairForJob),
  }),
).annotate({
  identifier: "TagCriterionForJob",
}) as any as S.Schema<TagCriterionForJob>;
export interface CriteriaForJob {
  simpleCriterion?: SimpleCriterionForJob;
  tagCriterion?: TagCriterionForJob;
}
export const CriteriaForJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    simpleCriterion: S.optional(SimpleCriterionForJob),
    tagCriterion: S.optional(TagCriterionForJob),
  }),
).annotate({ identifier: "CriteriaForJob" }) as any as S.Schema<CriteriaForJob>;
export type __listOfCriteriaForJob = CriteriaForJob[];
export const __listOfCriteriaForJob = /*@__PURE__*/ S.Array(CriteriaForJob);
export interface CriteriaBlockForJob {
  and?: CriteriaForJob[];
}
export const CriteriaBlockForJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ and: S.optional(__listOfCriteriaForJob) }),
).annotate({
  identifier: "CriteriaBlockForJob",
}) as any as S.Schema<CriteriaBlockForJob>;
export interface S3BucketCriteriaForJob {
  excludes?: CriteriaBlockForJob;
  includes?: CriteriaBlockForJob;
}
export const S3BucketCriteriaForJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    excludes: S.optional(CriteriaBlockForJob),
    includes: S.optional(CriteriaBlockForJob),
  }),
).annotate({
  identifier: "S3BucketCriteriaForJob",
}) as any as S.Schema<S3BucketCriteriaForJob>;
export interface S3BucketDefinitionForJob {
  accountId?: string;
  buckets?: string[];
}
export const S3BucketDefinitionForJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    buckets: S.optional(__listOf__string),
  }),
).annotate({
  identifier: "S3BucketDefinitionForJob",
}) as any as S.Schema<S3BucketDefinitionForJob>;
export type __listOfS3BucketDefinitionForJob = S3BucketDefinitionForJob[];
export const __listOfS3BucketDefinitionForJob = /*@__PURE__*/ S.Array(
  S3BucketDefinitionForJob,
);
export type ScopeFilterKey =
  | "OBJECT_EXTENSION"
  | "OBJECT_LAST_MODIFIED_DATE"
  | "OBJECT_SIZE"
  | "OBJECT_KEY"
  | (string & {});
export const ScopeFilterKey = S.String;

export interface SimpleScopeTerm {
  comparator?: JobComparator;
  key?: ScopeFilterKey;
  values?: string[];
}
export const SimpleScopeTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    comparator: S.optional(JobComparator),
    key: S.optional(ScopeFilterKey),
    values: S.optional(__listOf__string),
  }),
).annotate({
  identifier: "SimpleScopeTerm",
}) as any as S.Schema<SimpleScopeTerm>;
export interface TagValuePair {
  key?: string;
  value?: string;
}
export const TagValuePair = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
).annotate({ identifier: "TagValuePair" }) as any as S.Schema<TagValuePair>;
export type __listOfTagValuePair = TagValuePair[];
export const __listOfTagValuePair = /*@__PURE__*/ S.Array(TagValuePair);
export type TagTarget = "S3_OBJECT" | (string & {});
export const TagTarget = S.String;

export interface TagScopeTerm {
  comparator?: JobComparator;
  key?: string;
  tagValues?: TagValuePair[];
  target?: TagTarget;
}
export const TagScopeTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    comparator: S.optional(JobComparator),
    key: S.optional(S.String),
    tagValues: S.optional(__listOfTagValuePair),
    target: S.optional(TagTarget),
  }),
).annotate({ identifier: "TagScopeTerm" }) as any as S.Schema<TagScopeTerm>;
export interface JobScopeTerm {
  simpleScopeTerm?: SimpleScopeTerm;
  tagScopeTerm?: TagScopeTerm;
}
export const JobScopeTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    simpleScopeTerm: S.optional(SimpleScopeTerm),
    tagScopeTerm: S.optional(TagScopeTerm),
  }),
).annotate({ identifier: "JobScopeTerm" }) as any as S.Schema<JobScopeTerm>;
export type __listOfJobScopeTerm = JobScopeTerm[];
export const __listOfJobScopeTerm = /*@__PURE__*/ S.Array(JobScopeTerm);
export interface JobScopingBlock {
  and?: JobScopeTerm[];
}
export const JobScopingBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ and: S.optional(__listOfJobScopeTerm) }),
).annotate({
  identifier: "JobScopingBlock",
}) as any as S.Schema<JobScopingBlock>;
export interface Scoping {
  excludes?: JobScopingBlock;
  includes?: JobScopingBlock;
}
export const Scoping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    excludes: S.optional(JobScopingBlock),
    includes: S.optional(JobScopingBlock),
  }),
).annotate({ identifier: "Scoping" }) as any as S.Schema<Scoping>;
export interface S3JobDefinition {
  bucketCriteria?: S3BucketCriteriaForJob;
  bucketDefinitions?: S3BucketDefinitionForJob[];
  scoping?: Scoping;
}
export const S3JobDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucketCriteria: S.optional(S3BucketCriteriaForJob),
    bucketDefinitions: S.optional(__listOfS3BucketDefinitionForJob),
    scoping: S.optional(Scoping),
  }),
).annotate({
  identifier: "S3JobDefinition",
}) as any as S.Schema<S3JobDefinition>;
export interface DailySchedule {}
export const DailySchedule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({ identifier: "DailySchedule" }) as any as S.Schema<DailySchedule>;
export interface MonthlySchedule {
  dayOfMonth?: number;
}
export const MonthlySchedule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dayOfMonth: S.optional(S.Number) }),
).annotate({
  identifier: "MonthlySchedule",
}) as any as S.Schema<MonthlySchedule>;
export type DayOfWeek =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | (string & {});
export const DayOfWeek = S.String;

export interface WeeklySchedule {
  dayOfWeek?: DayOfWeek;
}
export const WeeklySchedule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dayOfWeek: S.optional(DayOfWeek) }),
).annotate({ identifier: "WeeklySchedule" }) as any as S.Schema<WeeklySchedule>;
export interface JobScheduleFrequency {
  dailySchedule?: DailySchedule;
  monthlySchedule?: MonthlySchedule;
  weeklySchedule?: WeeklySchedule;
}
export const JobScheduleFrequency = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dailySchedule: S.optional(DailySchedule),
    monthlySchedule: S.optional(MonthlySchedule),
    weeklySchedule: S.optional(WeeklySchedule),
  }),
).annotate({
  identifier: "JobScheduleFrequency",
}) as any as S.Schema<JobScheduleFrequency>;
export interface CreateClassificationJobRequest {
  allowListIds?: string[];
  clientToken?: string;
  customDataIdentifierIds?: string[];
  description?: string;
  initialRun?: boolean;
  jobType?: JobType;
  managedDataIdentifierIds?: string[];
  managedDataIdentifierSelector?: ManagedDataIdentifierSelector;
  name?: string;
  s3JobDefinition?: S3JobDefinition;
  samplingPercentage?: number;
  scheduleFrequency?: JobScheduleFrequency;
  tags?: { [key: string]: string | undefined };
}
export const CreateClassificationJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    allowListIds: S.optional(__listOf__string),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    customDataIdentifierIds: S.optional(__listOf__string),
    description: S.optional(S.String),
    initialRun: S.optional(S.Boolean),
    jobType: S.optional(JobType),
    managedDataIdentifierIds: S.optional(__listOf__string),
    managedDataIdentifierSelector: S.optional(ManagedDataIdentifierSelector),
    name: S.optional(S.String),
    s3JobDefinition: S.optional(S3JobDefinition),
    samplingPercentage: S.optional(S.Number),
    scheduleFrequency: S.optional(JobScheduleFrequency),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateClassificationJobRequest",
}) as any as S.Schema<CreateClassificationJobRequest>;
export interface CreateClassificationJobResponse {
  jobArn?: string;
  jobId?: string;
}
export const CreateClassificationJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobArn: S.optional(S.String), jobId: S.optional(S.String) }),
).annotate({
  identifier: "CreateClassificationJobResponse",
}) as any as S.Schema<CreateClassificationJobResponse>;
export type DataIdentifierSeverity = "LOW" | "MEDIUM" | "HIGH" | (string & {});
export const DataIdentifierSeverity = S.String;

export interface SeverityLevel {
  occurrencesThreshold?: number;
  severity?: DataIdentifierSeverity;
}
export const SeverityLevel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    occurrencesThreshold: S.optional(S.Number),
    severity: S.optional(DataIdentifierSeverity),
  }),
).annotate({ identifier: "SeverityLevel" }) as any as S.Schema<SeverityLevel>;
export type SeverityLevelList = SeverityLevel[];
export const SeverityLevelList = /*@__PURE__*/ S.Array(SeverityLevel);
export interface CreateCustomDataIdentifierRequest {
  clientToken?: string;
  description?: string;
  ignoreWords?: string[];
  keywords?: string[];
  maximumMatchDistance?: number;
  name?: string;
  regex?: string;
  severityLevels?: SeverityLevel[];
  tags?: { [key: string]: string | undefined };
}
export const CreateCustomDataIdentifierRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    description: S.optional(S.String),
    ignoreWords: S.optional(__listOf__string),
    keywords: S.optional(__listOf__string),
    maximumMatchDistance: S.optional(S.Number),
    name: S.optional(S.String),
    regex: S.optional(S.String),
    severityLevels: S.optional(SeverityLevelList),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/custom-data-identifiers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCustomDataIdentifierRequest",
}) as any as S.Schema<CreateCustomDataIdentifierRequest>;
export interface CreateCustomDataIdentifierResponse {
  customDataIdentifierId?: string;
}
export const CreateCustomDataIdentifierResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ customDataIdentifierId: S.optional(S.String) }),
).annotate({
  identifier: "CreateCustomDataIdentifierResponse",
}) as any as S.Schema<CreateCustomDataIdentifierResponse>;
export type FindingsFilterAction = "ARCHIVE" | "NOOP" | (string & {});
export const FindingsFilterAction = S.String;

export interface CriterionAdditionalProperties {
  eq?: string[];
  eqExactMatch?: string[];
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
  neq?: string[];
}
export const CriterionAdditionalProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eq: S.optional(__listOf__string),
    eqExactMatch: S.optional(__listOf__string),
    gt: S.optional(S.Number),
    gte: S.optional(S.Number),
    lt: S.optional(S.Number),
    lte: S.optional(S.Number),
    neq: S.optional(__listOf__string),
  }),
).annotate({
  identifier: "CriterionAdditionalProperties",
}) as any as S.Schema<CriterionAdditionalProperties>;
export type Criterion = {
  [key: string]: CriterionAdditionalProperties | undefined;
};
export const Criterion = /*@__PURE__*/ S.Record(
  S.String,
  CriterionAdditionalProperties.pipe(S.optional),
);
export interface FindingCriteria {
  criterion?: { [key: string]: CriterionAdditionalProperties | undefined };
}
export const FindingCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ criterion: S.optional(Criterion) }),
).annotate({
  identifier: "FindingCriteria",
}) as any as S.Schema<FindingCriteria>;
export interface CreateFindingsFilterRequest {
  action?: FindingsFilterAction;
  clientToken?: string;
  description?: string;
  findingCriteria?: FindingCriteria;
  name?: string;
  position?: number;
  tags?: { [key: string]: string | undefined };
}
export const CreateFindingsFilterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: S.optional(FindingsFilterAction),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    description: S.optional(S.String),
    findingCriteria: S.optional(FindingCriteria),
    name: S.optional(S.String),
    position: S.optional(S.Number),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/findingsfilters" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFindingsFilterRequest",
}) as any as S.Schema<CreateFindingsFilterRequest>;
export interface CreateFindingsFilterResponse {
  arn?: string;
  id?: string;
}
export const CreateFindingsFilterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.optional(S.String), id: S.optional(S.String) }),
).annotate({
  identifier: "CreateFindingsFilterResponse",
}) as any as S.Schema<CreateFindingsFilterResponse>;
export interface CreateInvitationsRequest {
  accountIds?: string[];
  disableEmailNotification?: boolean;
  message?: string;
}
export const CreateInvitationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountIds: S.optional(__listOf__string),
    disableEmailNotification: S.optional(S.Boolean),
    message: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/invitations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateInvitationsRequest",
}) as any as S.Schema<CreateInvitationsRequest>;
export type ErrorCode = "ClientError" | "InternalError" | (string & {});
export const ErrorCode = S.String;

export interface UnprocessedAccount {
  accountId?: string;
  errorCode?: ErrorCode;
  errorMessage?: string;
}
export const UnprocessedAccount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    errorCode: S.optional(ErrorCode),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "UnprocessedAccount",
}) as any as S.Schema<UnprocessedAccount>;
export type __listOfUnprocessedAccount = UnprocessedAccount[];
export const __listOfUnprocessedAccount =
  /*@__PURE__*/ S.Array(UnprocessedAccount);
export interface CreateInvitationsResponse {
  unprocessedAccounts?: UnprocessedAccount[];
}
export const CreateInvitationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ unprocessedAccounts: S.optional(__listOfUnprocessedAccount) }),
).annotate({
  identifier: "CreateInvitationsResponse",
}) as any as S.Schema<CreateInvitationsResponse>;
export interface AccountDetail {
  accountId?: string;
  email?: string;
}
export const AccountDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountId: S.optional(S.String), email: S.optional(S.String) }),
).annotate({ identifier: "AccountDetail" }) as any as S.Schema<AccountDetail>;
export interface CreateMemberRequest {
  account?: AccountDetail;
  tags?: { [key: string]: string | undefined };
}
export const CreateMemberRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    account: S.optional(AccountDetail),
    tags: S.optional(TagMap),
  }).pipe(
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
  identifier: "CreateMemberRequest",
}) as any as S.Schema<CreateMemberRequest>;
export interface CreateMemberResponse {
  arn?: string;
}
export const CreateMemberResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.optional(S.String) }),
).annotate({
  identifier: "CreateMemberResponse",
}) as any as S.Schema<CreateMemberResponse>;
export type FindingType =
  | "SensitiveData:S3Object/Multiple"
  | "SensitiveData:S3Object/Financial"
  | "SensitiveData:S3Object/Personal"
  | "SensitiveData:S3Object/Credentials"
  | "SensitiveData:S3Object/CustomIdentifier"
  | "Policy:IAMUser/S3BucketPublic"
  | "Policy:IAMUser/S3BucketSharedExternally"
  | "Policy:IAMUser/S3BucketReplicatedExternally"
  | "Policy:IAMUser/S3BucketEncryptionDisabled"
  | "Policy:IAMUser/S3BlockPublicAccessDisabled"
  | "Policy:IAMUser/S3BucketSharedWithCloudFront"
  | (string & {});
export const FindingType = S.String;

export type __listOfFindingType = FindingType[];
export const __listOfFindingType = /*@__PURE__*/ S.Array(FindingType);
export interface CreateSampleFindingsRequest {
  findingTypes?: FindingType[];
}
export const CreateSampleFindingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ findingTypes: S.optional(__listOfFindingType) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/findings/sample" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSampleFindingsRequest",
}) as any as S.Schema<CreateSampleFindingsRequest>;
export interface CreateSampleFindingsResponse {}
export const CreateSampleFindingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateSampleFindingsResponse",
}) as any as S.Schema<CreateSampleFindingsResponse>;
export interface DeclineInvitationsRequest {
  accountIds?: string[];
}
export const DeclineInvitationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountIds: S.optional(__listOf__string) }).pipe(
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
  unprocessedAccounts?: UnprocessedAccount[];
}
export const DeclineInvitationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ unprocessedAccounts: S.optional(__listOfUnprocessedAccount) }),
).annotate({
  identifier: "DeclineInvitationsResponse",
}) as any as S.Schema<DeclineInvitationsResponse>;
export interface DeleteAllowListRequest {
  id: string;
  ignoreJobChecks?: string;
}
export const DeleteAllowListRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    ignoreJobChecks: S.optional(S.String).pipe(T.HttpQuery("ignoreJobChecks")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/allow-lists/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAllowListRequest",
}) as any as S.Schema<DeleteAllowListRequest>;
export interface DeleteAllowListResponse {}
export const DeleteAllowListResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAllowListResponse",
}) as any as S.Schema<DeleteAllowListResponse>;
export interface DeleteCustomDataIdentifierRequest {
  id: string;
}
export const DeleteCustomDataIdentifierRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/custom-data-identifiers/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCustomDataIdentifierRequest",
}) as any as S.Schema<DeleteCustomDataIdentifierRequest>;
export interface DeleteCustomDataIdentifierResponse {}
export const DeleteCustomDataIdentifierResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCustomDataIdentifierResponse",
}) as any as S.Schema<DeleteCustomDataIdentifierResponse>;
export interface DeleteFindingsFilterRequest {
  id: string;
}
export const DeleteFindingsFilterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/findingsfilters/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFindingsFilterRequest",
}) as any as S.Schema<DeleteFindingsFilterRequest>;
export interface DeleteFindingsFilterResponse {}
export const DeleteFindingsFilterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteFindingsFilterResponse",
}) as any as S.Schema<DeleteFindingsFilterResponse>;
export interface DeleteInvitationsRequest {
  accountIds?: string[];
}
export const DeleteInvitationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountIds: S.optional(__listOf__string) }).pipe(
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
  unprocessedAccounts?: UnprocessedAccount[];
}
export const DeleteInvitationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ unprocessedAccounts: S.optional(__listOfUnprocessedAccount) }),
).annotate({
  identifier: "DeleteInvitationsResponse",
}) as any as S.Schema<DeleteInvitationsResponse>;
export interface DeleteMemberRequest {
  id: string;
}
export const DeleteMemberRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/members/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMemberRequest",
}) as any as S.Schema<DeleteMemberRequest>;
export interface DeleteMemberResponse {}
export const DeleteMemberResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMemberResponse",
}) as any as S.Schema<DeleteMemberResponse>;
export interface BucketCriteriaAdditionalProperties {
  eq?: string[];
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
  neq?: string[];
  prefix?: string;
}
export const BucketCriteriaAdditionalProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eq: S.optional(__listOf__string),
    gt: S.optional(S.Number),
    gte: S.optional(S.Number),
    lt: S.optional(S.Number),
    lte: S.optional(S.Number),
    neq: S.optional(__listOf__string),
    prefix: S.optional(S.String),
  }),
).annotate({
  identifier: "BucketCriteriaAdditionalProperties",
}) as any as S.Schema<BucketCriteriaAdditionalProperties>;
export type BucketCriteria = {
  [key: string]: BucketCriteriaAdditionalProperties | undefined;
};
export const BucketCriteria = /*@__PURE__*/ S.Record(
  S.String,
  BucketCriteriaAdditionalProperties.pipe(S.optional),
);
export type OrderBy = "ASC" | "DESC" | (string & {});
export const OrderBy = S.String;

export interface BucketSortCriteria {
  attributeName?: string;
  orderBy?: OrderBy;
}
export const BucketSortCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attributeName: S.optional(S.String),
    orderBy: S.optional(OrderBy),
  }),
).annotate({
  identifier: "BucketSortCriteria",
}) as any as S.Schema<BucketSortCriteria>;
export interface DescribeBucketsRequest {
  criteria?: { [key: string]: BucketCriteriaAdditionalProperties | undefined };
  maxResults?: number;
  nextToken?: string;
  sortCriteria?: BucketSortCriteria;
}
export const DescribeBucketsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    criteria: S.optional(BucketCriteria),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    sortCriteria: S.optional(BucketSortCriteria),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/datasources/s3" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeBucketsRequest",
}) as any as S.Schema<DescribeBucketsRequest>;
export type AllowsUnencryptedObjectUploads =
  | "TRUE"
  | "FALSE"
  | "UNKNOWN"
  | (string & {});
export const AllowsUnencryptedObjectUploads = S.String;

export type AutomatedDiscoveryMonitoringStatus =
  | "MONITORED"
  | "NOT_MONITORED"
  | (string & {});
export const AutomatedDiscoveryMonitoringStatus = S.String;

export type BucketMetadataErrorCode =
  | "ACCESS_DENIED"
  | "BUCKET_COUNT_EXCEEDS_QUOTA"
  | (string & {});
export const BucketMetadataErrorCode = S.String;

export type IsDefinedInJob = "TRUE" | "FALSE" | "UNKNOWN" | (string & {});
export const IsDefinedInJob = S.String;

export type IsMonitoredByJob = "TRUE" | "FALSE" | "UNKNOWN" | (string & {});
export const IsMonitoredByJob = S.String;

export interface JobDetails {
  isDefinedInJob?: IsDefinedInJob;
  isMonitoredByJob?: IsMonitoredByJob;
  lastJobId?: string;
  lastJobRunTime?: Date;
}
export const JobDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    isDefinedInJob: S.optional(IsDefinedInJob),
    isMonitoredByJob: S.optional(IsMonitoredByJob),
    lastJobId: S.optional(S.String),
    lastJobRunTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "JobDetails" }) as any as S.Schema<JobDetails>;
export interface ObjectCountByEncryptionType {
  customerManaged?: number;
  kmsManaged?: number;
  s3Managed?: number;
  unencrypted?: number;
  unknown?: number;
}
export const ObjectCountByEncryptionType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    customerManaged: S.optional(S.Number),
    kmsManaged: S.optional(S.Number),
    s3Managed: S.optional(S.Number),
    unencrypted: S.optional(S.Number),
    unknown: S.optional(S.Number),
  }),
).annotate({
  identifier: "ObjectCountByEncryptionType",
}) as any as S.Schema<ObjectCountByEncryptionType>;
export type EffectivePermission =
  | "PUBLIC"
  | "NOT_PUBLIC"
  | "UNKNOWN"
  | (string & {});
export const EffectivePermission = S.String;

export interface BlockPublicAccess {
  blockPublicAcls?: boolean;
  blockPublicPolicy?: boolean;
  ignorePublicAcls?: boolean;
  restrictPublicBuckets?: boolean;
}
export const BlockPublicAccess = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    blockPublicAcls: S.optional(S.Boolean),
    blockPublicPolicy: S.optional(S.Boolean),
    ignorePublicAcls: S.optional(S.Boolean),
    restrictPublicBuckets: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "BlockPublicAccess",
}) as any as S.Schema<BlockPublicAccess>;
export interface AccountLevelPermissions {
  blockPublicAccess?: BlockPublicAccess;
}
export const AccountLevelPermissions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ blockPublicAccess: S.optional(BlockPublicAccess) }),
).annotate({
  identifier: "AccountLevelPermissions",
}) as any as S.Schema<AccountLevelPermissions>;
export interface AccessControlList {
  allowsPublicReadAccess?: boolean;
  allowsPublicWriteAccess?: boolean;
}
export const AccessControlList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    allowsPublicReadAccess: S.optional(S.Boolean),
    allowsPublicWriteAccess: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AccessControlList",
}) as any as S.Schema<AccessControlList>;
export interface BucketPolicy {
  allowsPublicReadAccess?: boolean;
  allowsPublicWriteAccess?: boolean;
}
export const BucketPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    allowsPublicReadAccess: S.optional(S.Boolean),
    allowsPublicWriteAccess: S.optional(S.Boolean),
  }),
).annotate({ identifier: "BucketPolicy" }) as any as S.Schema<BucketPolicy>;
export interface BucketLevelPermissions {
  accessControlList?: AccessControlList;
  blockPublicAccess?: BlockPublicAccess;
  bucketPolicy?: BucketPolicy;
}
export const BucketLevelPermissions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessControlList: S.optional(AccessControlList),
    blockPublicAccess: S.optional(BlockPublicAccess),
    bucketPolicy: S.optional(BucketPolicy),
  }),
).annotate({
  identifier: "BucketLevelPermissions",
}) as any as S.Schema<BucketLevelPermissions>;
export interface BucketPermissionConfiguration {
  accountLevelPermissions?: AccountLevelPermissions;
  bucketLevelPermissions?: BucketLevelPermissions;
}
export const BucketPermissionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountLevelPermissions: S.optional(AccountLevelPermissions),
    bucketLevelPermissions: S.optional(BucketLevelPermissions),
  }),
).annotate({
  identifier: "BucketPermissionConfiguration",
}) as any as S.Schema<BucketPermissionConfiguration>;
export interface BucketPublicAccess {
  effectivePermission?: EffectivePermission;
  permissionConfiguration?: BucketPermissionConfiguration;
}
export const BucketPublicAccess = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    effectivePermission: S.optional(EffectivePermission),
    permissionConfiguration: S.optional(BucketPermissionConfiguration),
  }),
).annotate({
  identifier: "BucketPublicAccess",
}) as any as S.Schema<BucketPublicAccess>;
export interface ReplicationDetails {
  replicated?: boolean;
  replicatedExternally?: boolean;
  replicationAccounts?: string[];
}
export const ReplicationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    replicated: S.optional(S.Boolean),
    replicatedExternally: S.optional(S.Boolean),
    replicationAccounts: S.optional(__listOf__string),
  }),
).annotate({
  identifier: "ReplicationDetails",
}) as any as S.Schema<ReplicationDetails>;
export type Type =
  | "NONE"
  | "AES256"
  | "aws:kms"
  | "aws:kms:dsse"
  | (string & {});
export const Type = S.String;

export interface BucketServerSideEncryption {
  kmsMasterKeyId?: string;
  type?: Type;
}
export const BucketServerSideEncryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ kmsMasterKeyId: S.optional(S.String), type: S.optional(Type) }),
).annotate({
  identifier: "BucketServerSideEncryption",
}) as any as S.Schema<BucketServerSideEncryption>;
export type SharedAccess =
  | "EXTERNAL"
  | "INTERNAL"
  | "NOT_SHARED"
  | "UNKNOWN"
  | (string & {});
export const SharedAccess = S.String;

export interface KeyValuePair {
  key?: string;
  value?: string;
}
export const KeyValuePair = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
).annotate({ identifier: "KeyValuePair" }) as any as S.Schema<KeyValuePair>;
export type __listOfKeyValuePair = KeyValuePair[];
export const __listOfKeyValuePair = /*@__PURE__*/ S.Array(KeyValuePair);
export interface ObjectLevelStatistics {
  fileType?: number;
  storageClass?: number;
  total?: number;
}
export const ObjectLevelStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fileType: S.optional(S.Number),
    storageClass: S.optional(S.Number),
    total: S.optional(S.Number),
  }),
).annotate({
  identifier: "ObjectLevelStatistics",
}) as any as S.Schema<ObjectLevelStatistics>;
export interface BucketMetadata {
  accountId?: string;
  allowsUnencryptedObjectUploads?: AllowsUnencryptedObjectUploads;
  automatedDiscoveryMonitoringStatus?: AutomatedDiscoveryMonitoringStatus;
  bucketArn?: string;
  bucketCreatedAt?: Date;
  bucketName?: string;
  classifiableObjectCount?: number;
  classifiableSizeInBytes?: number;
  errorCode?: BucketMetadataErrorCode;
  errorMessage?: string;
  jobDetails?: JobDetails;
  lastAutomatedDiscoveryTime?: Date;
  lastUpdated?: Date;
  objectCount?: number;
  objectCountByEncryptionType?: ObjectCountByEncryptionType;
  publicAccess?: BucketPublicAccess;
  region?: string;
  replicationDetails?: ReplicationDetails;
  sensitivityScore?: number;
  serverSideEncryption?: BucketServerSideEncryption;
  sharedAccess?: SharedAccess;
  sizeInBytes?: number;
  sizeInBytesCompressed?: number;
  tags?: KeyValuePair[];
  unclassifiableObjectCount?: ObjectLevelStatistics;
  unclassifiableObjectSizeInBytes?: ObjectLevelStatistics;
  versioning?: boolean;
}
export const BucketMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    allowsUnencryptedObjectUploads: S.optional(AllowsUnencryptedObjectUploads),
    automatedDiscoveryMonitoringStatus: S.optional(
      AutomatedDiscoveryMonitoringStatus,
    ),
    bucketArn: S.optional(S.String),
    bucketCreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    bucketName: S.optional(S.String),
    classifiableObjectCount: S.optional(S.Number),
    classifiableSizeInBytes: S.optional(S.Number),
    errorCode: S.optional(BucketMetadataErrorCode),
    errorMessage: S.optional(S.String),
    jobDetails: S.optional(JobDetails),
    lastAutomatedDiscoveryTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdated: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    objectCount: S.optional(S.Number),
    objectCountByEncryptionType: S.optional(ObjectCountByEncryptionType),
    publicAccess: S.optional(BucketPublicAccess),
    region: S.optional(S.String),
    replicationDetails: S.optional(ReplicationDetails),
    sensitivityScore: S.optional(S.Number),
    serverSideEncryption: S.optional(BucketServerSideEncryption),
    sharedAccess: S.optional(SharedAccess),
    sizeInBytes: S.optional(S.Number),
    sizeInBytesCompressed: S.optional(S.Number),
    tags: S.optional(__listOfKeyValuePair),
    unclassifiableObjectCount: S.optional(ObjectLevelStatistics),
    unclassifiableObjectSizeInBytes: S.optional(ObjectLevelStatistics),
    versioning: S.optional(S.Boolean),
  }),
).annotate({ identifier: "BucketMetadata" }) as any as S.Schema<BucketMetadata>;
export type __listOfBucketMetadata = BucketMetadata[];
export const __listOfBucketMetadata = /*@__PURE__*/ S.Array(BucketMetadata);
export interface DescribeBucketsResponse {
  buckets?: BucketMetadata[];
  nextToken?: string;
}
export const DescribeBucketsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    buckets: S.optional(__listOfBucketMetadata),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeBucketsResponse",
}) as any as S.Schema<DescribeBucketsResponse>;
export interface DescribeClassificationJobRequest {
  jobId: string;
}
export const DescribeClassificationJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String.pipe(T.HttpLabel("jobId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/jobs/{jobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeClassificationJobRequest",
}) as any as S.Schema<DescribeClassificationJobRequest>;
export type JobStatus =
  | "RUNNING"
  | "PAUSED"
  | "CANCELLED"
  | "COMPLETE"
  | "IDLE"
  | "USER_PAUSED"
  | (string & {});
export const JobStatus = S.String;

export type LastRunErrorStatusCode = "NONE" | "ERROR" | (string & {});
export const LastRunErrorStatusCode = S.String;

export interface LastRunErrorStatus {
  code?: LastRunErrorStatusCode;
}
export const LastRunErrorStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ code: S.optional(LastRunErrorStatusCode) }),
).annotate({
  identifier: "LastRunErrorStatus",
}) as any as S.Schema<LastRunErrorStatus>;
export interface Statistics {
  approximateNumberOfObjectsToProcess?: number;
  numberOfRuns?: number;
}
export const Statistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    approximateNumberOfObjectsToProcess: S.optional(S.Number),
    numberOfRuns: S.optional(S.Number),
  }),
).annotate({ identifier: "Statistics" }) as any as S.Schema<Statistics>;
export interface UserPausedDetails {
  jobExpiresAt?: Date;
  jobImminentExpirationHealthEventArn?: string;
  jobPausedAt?: Date;
}
export const UserPausedDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobExpiresAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    jobImminentExpirationHealthEventArn: S.optional(S.String),
    jobPausedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "UserPausedDetails",
}) as any as S.Schema<UserPausedDetails>;
export interface DescribeClassificationJobResponse {
  allowListIds?: string[];
  clientToken?: string;
  createdAt?: Date;
  customDataIdentifierIds?: string[];
  description?: string;
  initialRun?: boolean;
  jobArn?: string;
  jobId?: string;
  jobStatus?: JobStatus;
  jobType?: JobType;
  lastRunErrorStatus?: LastRunErrorStatus;
  lastRunTime?: Date;
  managedDataIdentifierIds?: string[];
  managedDataIdentifierSelector?: ManagedDataIdentifierSelector;
  name?: string;
  s3JobDefinition?: S3JobDefinition & {
    bucketDefinitions: (S3BucketDefinitionForJob & {
      accountId: string;
      buckets: __listOf__string;
    })[];
  };
  samplingPercentage?: number;
  scheduleFrequency?: JobScheduleFrequency;
  statistics?: Statistics;
  tags?: { [key: string]: string | undefined };
  userPausedDetails?: UserPausedDetails;
}
export const DescribeClassificationJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    allowListIds: S.optional(__listOf__string),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    customDataIdentifierIds: S.optional(__listOf__string),
    description: S.optional(S.String),
    initialRun: S.optional(S.Boolean),
    jobArn: S.optional(S.String),
    jobId: S.optional(S.String),
    jobStatus: S.optional(JobStatus),
    jobType: S.optional(JobType),
    lastRunErrorStatus: S.optional(LastRunErrorStatus),
    lastRunTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    managedDataIdentifierIds: S.optional(__listOf__string),
    managedDataIdentifierSelector: S.optional(ManagedDataIdentifierSelector),
    name: S.optional(S.String),
    s3JobDefinition: S.optional(S3JobDefinition),
    samplingPercentage: S.optional(S.Number),
    scheduleFrequency: S.optional(JobScheduleFrequency),
    statistics: S.optional(Statistics),
    tags: S.optional(TagMap),
    userPausedDetails: S.optional(UserPausedDetails),
  }),
).annotate({
  identifier: "DescribeClassificationJobResponse",
}) as any as S.Schema<DescribeClassificationJobResponse>;
export interface DescribeOrganizationConfigurationRequest {}
export const DescribeOrganizationConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({}).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/admin/configuration" }),
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
export interface DescribeOrganizationConfigurationResponse {
  autoEnable?: boolean;
  maxAccountLimitReached?: boolean;
}
export const DescribeOrganizationConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      autoEnable: S.optional(S.Boolean),
      maxAccountLimitReached: S.optional(S.Boolean),
    }),
  ).annotate({
    identifier: "DescribeOrganizationConfigurationResponse",
  }) as any as S.Schema<DescribeOrganizationConfigurationResponse>;
export interface DisableMacieRequest {}
export const DisableMacieRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/macie" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisableMacieRequest",
}) as any as S.Schema<DisableMacieRequest>;
export interface DisableMacieResponse {}
export const DisableMacieResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisableMacieResponse",
}) as any as S.Schema<DisableMacieResponse>;
export interface DisableOrganizationAdminAccountRequest {
  adminAccountId?: string;
}
export const DisableOrganizationAdminAccountRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      adminAccountId: S.optional(S.String).pipe(T.HttpQuery("adminAccountId")),
    }).pipe(
      T.all(
        T.Http({ method: "DELETE", uri: "/admin" }),
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
export interface DisassociateMemberRequest {
  id: string;
}
export const DisassociateMemberRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/members/disassociate/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateMemberRequest",
}) as any as S.Schema<DisassociateMemberRequest>;
export interface DisassociateMemberResponse {}
export const DisassociateMemberResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateMemberResponse",
}) as any as S.Schema<DisassociateMemberResponse>;
export type FindingPublishingFrequency =
  | "FIFTEEN_MINUTES"
  | "ONE_HOUR"
  | "SIX_HOURS"
  | (string & {});
export const FindingPublishingFrequency = S.String;

export type MacieStatus = "PAUSED" | "ENABLED" | (string & {});
export const MacieStatus = S.String;

export interface EnableMacieRequest {
  clientToken?: string;
  findingPublishingFrequency?: FindingPublishingFrequency;
  status?: MacieStatus;
}
export const EnableMacieRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    findingPublishingFrequency: S.optional(FindingPublishingFrequency),
    status: S.optional(MacieStatus),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/macie" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "EnableMacieRequest",
}) as any as S.Schema<EnableMacieRequest>;
export interface EnableMacieResponse {}
export const EnableMacieResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "EnableMacieResponse",
}) as any as S.Schema<EnableMacieResponse>;
export interface EnableOrganizationAdminAccountRequest {
  adminAccountId?: string;
  clientToken?: string;
}
export const EnableOrganizationAdminAccountRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      adminAccountId: S.optional(S.String),
      clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/admin" }),
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
export interface EnableOrganizationAdminAccountResponse {}
export const EnableOrganizationAdminAccountResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "EnableOrganizationAdminAccountResponse",
}) as any as S.Schema<EnableOrganizationAdminAccountResponse>;
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
export type RelationshipStatus =
  | "Enabled"
  | "Paused"
  | "Invited"
  | "Created"
  | "Removed"
  | "Resigned"
  | "EmailVerificationInProgress"
  | "EmailVerificationFailed"
  | "RegionDisabled"
  | "AccountSuspended"
  | (string & {});
export const RelationshipStatus = S.String;

export interface Invitation {
  accountId?: string;
  invitationId?: string;
  invitedAt?: Date;
  relationshipStatus?: RelationshipStatus;
}
export const Invitation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    invitationId: S.optional(S.String),
    invitedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    relationshipStatus: S.optional(RelationshipStatus),
  }),
).annotate({ identifier: "Invitation" }) as any as S.Schema<Invitation>;
export interface GetAdministratorAccountResponse {
  administrator?: Invitation;
}
export const GetAdministratorAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ administrator: S.optional(Invitation) }),
).annotate({
  identifier: "GetAdministratorAccountResponse",
}) as any as S.Schema<GetAdministratorAccountResponse>;
export interface GetAllowListRequest {
  id: string;
}
export const GetAllowListRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/allow-lists/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAllowListRequest",
}) as any as S.Schema<GetAllowListRequest>;
export type AllowListStatusCode =
  | "OK"
  | "S3_OBJECT_NOT_FOUND"
  | "S3_USER_ACCESS_DENIED"
  | "S3_OBJECT_ACCESS_DENIED"
  | "S3_THROTTLED"
  | "S3_OBJECT_OVERSIZE"
  | "S3_OBJECT_EMPTY"
  | "UNKNOWN_ERROR"
  | (string & {});
export const AllowListStatusCode = S.String;

export interface AllowListStatus {
  code?: AllowListStatusCode;
  description?: string;
}
export const AllowListStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    code: S.optional(AllowListStatusCode),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "AllowListStatus",
}) as any as S.Schema<AllowListStatus>;
export interface GetAllowListResponse {
  arn?: string;
  createdAt?: Date;
  criteria?: AllowListCriteria & {
    s3WordsList: S3WordsList & {
      bucketName: __stringMin3Max255PatternAZaZ093255;
      objectKey: __stringMin1Max1024PatternSS;
    };
  };
  description?: string;
  id?: string;
  name?: string;
  status?: AllowListStatus & { code: AllowListStatusCode };
  tags?: { [key: string]: string | undefined };
  updatedAt?: Date;
}
export const GetAllowListResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    criteria: S.optional(AllowListCriteria),
    description: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    status: S.optional(AllowListStatus),
    tags: S.optional(TagMap),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetAllowListResponse",
}) as any as S.Schema<GetAllowListResponse>;
export interface GetAutomatedDiscoveryConfigurationRequest {}
export const GetAutomatedDiscoveryConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({}).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/automated-discovery/configuration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetAutomatedDiscoveryConfigurationRequest",
  }) as any as S.Schema<GetAutomatedDiscoveryConfigurationRequest>;
export type AutoEnableMode = "ALL" | "NEW" | "NONE" | (string & {});
export const AutoEnableMode = S.String;

export type ClassificationScopeId = string;
export type SensitivityInspectionTemplateId = string;
export type AutomatedDiscoveryStatus = "ENABLED" | "DISABLED" | (string & {});
export const AutomatedDiscoveryStatus = S.String;

export interface GetAutomatedDiscoveryConfigurationResponse {
  autoEnableOrganizationMembers?: AutoEnableMode;
  classificationScopeId?: string;
  disabledAt?: Date;
  firstEnabledAt?: Date;
  lastUpdatedAt?: Date;
  sensitivityInspectionTemplateId?: string;
  status?: AutomatedDiscoveryStatus;
}
export const GetAutomatedDiscoveryConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      autoEnableOrganizationMembers: S.optional(AutoEnableMode),
      classificationScopeId: S.optional(S.String),
      disabledAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      firstEnabledAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      lastUpdatedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      sensitivityInspectionTemplateId: S.optional(S.String),
      status: S.optional(AutomatedDiscoveryStatus),
    }),
  ).annotate({
    identifier: "GetAutomatedDiscoveryConfigurationResponse",
  }) as any as S.Schema<GetAutomatedDiscoveryConfigurationResponse>;
export interface GetBucketStatisticsRequest {
  accountId?: string;
}
export const GetBucketStatisticsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountId: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/datasources/s3/statistics" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBucketStatisticsRequest",
}) as any as S.Schema<GetBucketStatisticsRequest>;
export interface BucketCountByEffectivePermission {
  publiclyAccessible?: number;
  publiclyReadable?: number;
  publiclyWritable?: number;
  unknown?: number;
}
export const BucketCountByEffectivePermission = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    publiclyAccessible: S.optional(S.Number),
    publiclyReadable: S.optional(S.Number),
    publiclyWritable: S.optional(S.Number),
    unknown: S.optional(S.Number),
  }),
).annotate({
  identifier: "BucketCountByEffectivePermission",
}) as any as S.Schema<BucketCountByEffectivePermission>;
export interface BucketCountByEncryptionType {
  kmsManaged?: number;
  s3Managed?: number;
  unencrypted?: number;
  unknown?: number;
}
export const BucketCountByEncryptionType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    kmsManaged: S.optional(S.Number),
    s3Managed: S.optional(S.Number),
    unencrypted: S.optional(S.Number),
    unknown: S.optional(S.Number),
  }),
).annotate({
  identifier: "BucketCountByEncryptionType",
}) as any as S.Schema<BucketCountByEncryptionType>;
export interface BucketCountPolicyAllowsUnencryptedObjectUploads {
  allowsUnencryptedObjectUploads?: number;
  deniesUnencryptedObjectUploads?: number;
  unknown?: number;
}
export const BucketCountPolicyAllowsUnencryptedObjectUploads =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      allowsUnencryptedObjectUploads: S.optional(S.Number),
      deniesUnencryptedObjectUploads: S.optional(S.Number),
      unknown: S.optional(S.Number),
    }),
  ).annotate({
    identifier: "BucketCountPolicyAllowsUnencryptedObjectUploads",
  }) as any as S.Schema<BucketCountPolicyAllowsUnencryptedObjectUploads>;
export interface BucketCountBySharedAccessType {
  external?: number;
  internal?: number;
  notShared?: number;
  unknown?: number;
}
export const BucketCountBySharedAccessType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    external: S.optional(S.Number),
    internal: S.optional(S.Number),
    notShared: S.optional(S.Number),
    unknown: S.optional(S.Number),
  }),
).annotate({
  identifier: "BucketCountBySharedAccessType",
}) as any as S.Schema<BucketCountBySharedAccessType>;
export interface SensitivityAggregations {
  classifiableSizeInBytes?: number;
  publiclyAccessibleCount?: number;
  totalCount?: number;
  totalSizeInBytes?: number;
}
export const SensitivityAggregations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    classifiableSizeInBytes: S.optional(S.Number),
    publiclyAccessibleCount: S.optional(S.Number),
    totalCount: S.optional(S.Number),
    totalSizeInBytes: S.optional(S.Number),
  }),
).annotate({
  identifier: "SensitivityAggregations",
}) as any as S.Schema<SensitivityAggregations>;
export interface BucketStatisticsBySensitivity {
  classificationError?: SensitivityAggregations;
  notClassified?: SensitivityAggregations;
  notSensitive?: SensitivityAggregations;
  sensitive?: SensitivityAggregations;
}
export const BucketStatisticsBySensitivity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    classificationError: S.optional(SensitivityAggregations),
    notClassified: S.optional(SensitivityAggregations),
    notSensitive: S.optional(SensitivityAggregations),
    sensitive: S.optional(SensitivityAggregations),
  }),
).annotate({
  identifier: "BucketStatisticsBySensitivity",
}) as any as S.Schema<BucketStatisticsBySensitivity>;
export interface GetBucketStatisticsResponse {
  bucketCount?: number;
  bucketCountByEffectivePermission?: BucketCountByEffectivePermission;
  bucketCountByEncryptionType?: BucketCountByEncryptionType;
  bucketCountByObjectEncryptionRequirement?: BucketCountPolicyAllowsUnencryptedObjectUploads;
  bucketCountBySharedAccessType?: BucketCountBySharedAccessType;
  bucketStatisticsBySensitivity?: BucketStatisticsBySensitivity;
  classifiableObjectCount?: number;
  classifiableSizeInBytes?: number;
  lastUpdated?: Date;
  objectCount?: number;
  sizeInBytes?: number;
  sizeInBytesCompressed?: number;
  unclassifiableObjectCount?: ObjectLevelStatistics;
  unclassifiableObjectSizeInBytes?: ObjectLevelStatistics;
}
export const GetBucketStatisticsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucketCount: S.optional(S.Number),
    bucketCountByEffectivePermission: S.optional(
      BucketCountByEffectivePermission,
    ),
    bucketCountByEncryptionType: S.optional(BucketCountByEncryptionType),
    bucketCountByObjectEncryptionRequirement: S.optional(
      BucketCountPolicyAllowsUnencryptedObjectUploads,
    ),
    bucketCountBySharedAccessType: S.optional(BucketCountBySharedAccessType),
    bucketStatisticsBySensitivity: S.optional(BucketStatisticsBySensitivity),
    classifiableObjectCount: S.optional(S.Number),
    classifiableSizeInBytes: S.optional(S.Number),
    lastUpdated: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    objectCount: S.optional(S.Number),
    sizeInBytes: S.optional(S.Number),
    sizeInBytesCompressed: S.optional(S.Number),
    unclassifiableObjectCount: S.optional(ObjectLevelStatistics),
    unclassifiableObjectSizeInBytes: S.optional(ObjectLevelStatistics),
  }),
).annotate({
  identifier: "GetBucketStatisticsResponse",
}) as any as S.Schema<GetBucketStatisticsResponse>;
export interface GetClassificationExportConfigurationRequest {}
export const GetClassificationExportConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({}).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/classification-export-configuration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetClassificationExportConfigurationRequest",
  }) as any as S.Schema<GetClassificationExportConfigurationRequest>;
export interface S3Destination {
  bucketName?: string;
  expectedBucketOwner?: string;
  keyPrefix?: string;
  kmsKeyArn?: string;
}
export const S3Destination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucketName: S.optional(S.String),
    expectedBucketOwner: S.optional(S.String),
    keyPrefix: S.optional(S.String),
    kmsKeyArn: S.optional(S.String),
  }),
).annotate({ identifier: "S3Destination" }) as any as S.Schema<S3Destination>;
export interface ClassificationExportConfiguration {
  s3Destination?: S3Destination;
}
export const ClassificationExportConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Destination: S.optional(S3Destination) }),
).annotate({
  identifier: "ClassificationExportConfiguration",
}) as any as S.Schema<ClassificationExportConfiguration>;
export interface GetClassificationExportConfigurationResponse {
  configuration?: ClassificationExportConfiguration & {
    s3Destination: S3Destination & { bucketName: string; kmsKeyArn: string };
  };
}
export const GetClassificationExportConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ configuration: S.optional(ClassificationExportConfiguration) }),
  ).annotate({
    identifier: "GetClassificationExportConfigurationResponse",
  }) as any as S.Schema<GetClassificationExportConfigurationResponse>;
export interface GetClassificationScopeRequest {
  id: string;
}
export const GetClassificationScopeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/classification-scopes/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetClassificationScopeRequest",
}) as any as S.Schema<GetClassificationScopeRequest>;
export type ClassificationScopeName = string;
export type S3BucketName = string;
export type __listOfS3BucketName = string[];
export const __listOfS3BucketName = /*@__PURE__*/ S.Array(S.String);
export interface S3ClassificationScopeExclusion {
  bucketNames?: string[];
}
export const S3ClassificationScopeExclusion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucketNames: S.optional(__listOfS3BucketName) }),
).annotate({
  identifier: "S3ClassificationScopeExclusion",
}) as any as S.Schema<S3ClassificationScopeExclusion>;
export interface S3ClassificationScope {
  excludes?: S3ClassificationScopeExclusion;
}
export const S3ClassificationScope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ excludes: S.optional(S3ClassificationScopeExclusion) }),
).annotate({
  identifier: "S3ClassificationScope",
}) as any as S.Schema<S3ClassificationScope>;
export interface GetClassificationScopeResponse {
  id?: string;
  name?: string;
  s3?: S3ClassificationScope & {
    excludes: S3ClassificationScopeExclusion & {
      bucketNames: __listOfS3BucketName;
    };
  };
}
export const GetClassificationScopeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    s3: S.optional(S3ClassificationScope),
  }),
).annotate({
  identifier: "GetClassificationScopeResponse",
}) as any as S.Schema<GetClassificationScopeResponse>;
export interface GetCustomDataIdentifierRequest {
  id: string;
}
export const GetCustomDataIdentifierRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/custom-data-identifiers/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCustomDataIdentifierRequest",
}) as any as S.Schema<GetCustomDataIdentifierRequest>;
export interface GetCustomDataIdentifierResponse {
  arn?: string;
  createdAt?: Date;
  deleted?: boolean;
  description?: string;
  id?: string;
  ignoreWords?: string[];
  keywords?: string[];
  maximumMatchDistance?: number;
  name?: string;
  regex?: string;
  severityLevels?: (SeverityLevel & {
    occurrencesThreshold: number;
    severity: DataIdentifierSeverity;
  })[];
  tags?: { [key: string]: string | undefined };
}
export const GetCustomDataIdentifierResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    deleted: S.optional(S.Boolean),
    description: S.optional(S.String),
    id: S.optional(S.String),
    ignoreWords: S.optional(__listOf__string),
    keywords: S.optional(__listOf__string),
    maximumMatchDistance: S.optional(S.Number),
    name: S.optional(S.String),
    regex: S.optional(S.String),
    severityLevels: S.optional(SeverityLevelList),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetCustomDataIdentifierResponse",
}) as any as S.Schema<GetCustomDataIdentifierResponse>;
export interface SortCriteria {
  attributeName?: string;
  orderBy?: OrderBy;
}
export const SortCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attributeName: S.optional(S.String),
    orderBy: S.optional(OrderBy),
  }),
).annotate({ identifier: "SortCriteria" }) as any as S.Schema<SortCriteria>;
export interface GetFindingsRequest {
  findingIds?: string[];
  sortCriteria?: SortCriteria;
}
export const GetFindingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    findingIds: S.optional(__listOf__string),
    sortCriteria: S.optional(SortCriteria),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/findings/describe" }),
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
export type FindingCategory = "CLASSIFICATION" | "POLICY" | (string & {});
export const FindingCategory = S.String;

export type OriginType =
  | "SENSITIVE_DATA_DISCOVERY_JOB"
  | "AUTOMATED_SENSITIVE_DATA_DISCOVERY"
  | (string & {});
export const OriginType = S.String;

export interface Cell {
  cellReference?: string;
  column?: number;
  columnName?: string;
  row?: number;
}
export const Cell = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cellReference: S.optional(S.String),
    column: S.optional(S.Number),
    columnName: S.optional(S.String),
    row: S.optional(S.Number),
  }),
).annotate({ identifier: "Cell" }) as any as S.Schema<Cell>;
export type Cells = Cell[];
export const Cells = /*@__PURE__*/ S.Array(Cell);
export interface Range {
  end?: number;
  start?: number;
  startColumn?: number;
}
export const Range = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    end: S.optional(S.Number),
    start: S.optional(S.Number),
    startColumn: S.optional(S.Number),
  }),
).annotate({ identifier: "Range" }) as any as S.Schema<Range>;
export type Ranges = Range[];
export const Ranges = /*@__PURE__*/ S.Array(Range);
export interface Page {
  lineRange?: Range;
  offsetRange?: Range;
  pageNumber?: number;
}
export const Page = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    lineRange: S.optional(Range),
    offsetRange: S.optional(Range),
    pageNumber: S.optional(S.Number),
  }),
).annotate({ identifier: "Page" }) as any as S.Schema<Page>;
export type Pages = Page[];
export const Pages = /*@__PURE__*/ S.Array(Page);
export interface Record {
  jsonPath?: string;
  recordIndex?: number;
}
export const Record = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jsonPath: S.optional(S.String),
    recordIndex: S.optional(S.Number),
  }),
).annotate({ identifier: "Record" }) as any as S.Schema<Record>;
export type Records = Record[];
export const Records = /*@__PURE__*/ S.Array(Record);
export interface Occurrences {
  cells?: Cell[];
  lineRanges?: Range[];
  offsetRanges?: Range[];
  pages?: Page[];
  records?: Record[];
}
export const Occurrences = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cells: S.optional(Cells),
    lineRanges: S.optional(Ranges),
    offsetRanges: S.optional(Ranges),
    pages: S.optional(Pages),
    records: S.optional(Records),
  }),
).annotate({ identifier: "Occurrences" }) as any as S.Schema<Occurrences>;
export interface CustomDetection {
  arn?: string;
  count?: number;
  name?: string;
  occurrences?: Occurrences;
}
export const CustomDetection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    count: S.optional(S.Number),
    name: S.optional(S.String),
    occurrences: S.optional(Occurrences),
  }),
).annotate({
  identifier: "CustomDetection",
}) as any as S.Schema<CustomDetection>;
export type CustomDetections = CustomDetection[];
export const CustomDetections = /*@__PURE__*/ S.Array(CustomDetection);
export interface CustomDataIdentifiers {
  detections?: CustomDetection[];
  totalCount?: number;
}
export const CustomDataIdentifiers = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    detections: S.optional(CustomDetections),
    totalCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "CustomDataIdentifiers",
}) as any as S.Schema<CustomDataIdentifiers>;
export type SensitiveDataItemCategory =
  | "FINANCIAL_INFORMATION"
  | "PERSONAL_INFORMATION"
  | "CREDENTIALS"
  | "CUSTOM_IDENTIFIER"
  | (string & {});
export const SensitiveDataItemCategory = S.String;

export interface DefaultDetection {
  count?: number;
  occurrences?: Occurrences;
  type?: string;
}
export const DefaultDetection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    count: S.optional(S.Number),
    occurrences: S.optional(Occurrences),
    type: S.optional(S.String),
  }),
).annotate({
  identifier: "DefaultDetection",
}) as any as S.Schema<DefaultDetection>;
export type DefaultDetections = DefaultDetection[];
export const DefaultDetections = /*@__PURE__*/ S.Array(DefaultDetection);
export interface SensitiveDataItem {
  category?: SensitiveDataItemCategory;
  detections?: DefaultDetection[];
  totalCount?: number;
}
export const SensitiveDataItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    category: S.optional(SensitiveDataItemCategory),
    detections: S.optional(DefaultDetections),
    totalCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "SensitiveDataItem",
}) as any as S.Schema<SensitiveDataItem>;
export type SensitiveData = SensitiveDataItem[];
export const SensitiveData = /*@__PURE__*/ S.Array(SensitiveDataItem);
export interface ClassificationResultStatus {
  code?: string;
  reason?: string;
}
export const ClassificationResultStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ code: S.optional(S.String), reason: S.optional(S.String) }),
).annotate({
  identifier: "ClassificationResultStatus",
}) as any as S.Schema<ClassificationResultStatus>;
export interface ClassificationResult {
  additionalOccurrences?: boolean;
  customDataIdentifiers?: CustomDataIdentifiers;
  mimeType?: string;
  sensitiveData?: SensitiveDataItem[];
  sizeClassified?: number;
  status?: ClassificationResultStatus;
}
export const ClassificationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    additionalOccurrences: S.optional(S.Boolean),
    customDataIdentifiers: S.optional(CustomDataIdentifiers),
    mimeType: S.optional(S.String),
    sensitiveData: S.optional(SensitiveData),
    sizeClassified: S.optional(S.Number),
    status: S.optional(ClassificationResultStatus),
  }),
).annotate({
  identifier: "ClassificationResult",
}) as any as S.Schema<ClassificationResult>;
export interface ClassificationDetails {
  detailedResultsLocation?: string;
  jobArn?: string;
  jobId?: string;
  originType?: OriginType;
  result?: ClassificationResult;
}
export const ClassificationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    detailedResultsLocation: S.optional(S.String),
    jobArn: S.optional(S.String),
    jobId: S.optional(S.String),
    originType: S.optional(OriginType),
    result: S.optional(ClassificationResult),
  }),
).annotate({
  identifier: "ClassificationDetails",
}) as any as S.Schema<ClassificationDetails>;
export type FindingActionType = "AWS_API_CALL" | (string & {});
export const FindingActionType = S.String;

export interface ApiCallDetails {
  api?: string;
  apiServiceName?: string;
  firstSeen?: Date;
  lastSeen?: Date;
}
export const ApiCallDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    api: S.optional(S.String),
    apiServiceName: S.optional(S.String),
    firstSeen: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastSeen: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({ identifier: "ApiCallDetails" }) as any as S.Schema<ApiCallDetails>;
export interface FindingAction {
  actionType?: FindingActionType;
  apiCallDetails?: ApiCallDetails;
}
export const FindingAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionType: S.optional(FindingActionType),
    apiCallDetails: S.optional(ApiCallDetails),
  }),
).annotate({ identifier: "FindingAction" }) as any as S.Schema<FindingAction>;
export interface DomainDetails {
  domainName?: string;
}
export const DomainDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainName: S.optional(S.String) }),
).annotate({ identifier: "DomainDetails" }) as any as S.Schema<DomainDetails>;
export interface IpCity {
  name?: string;
}
export const IpCity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String) }),
).annotate({ identifier: "IpCity" }) as any as S.Schema<IpCity>;
export interface IpCountry {
  code?: string;
  name?: string;
}
export const IpCountry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ code: S.optional(S.String), name: S.optional(S.String) }),
).annotate({ identifier: "IpCountry" }) as any as S.Schema<IpCountry>;
export interface IpGeoLocation {
  lat?: number;
  lon?: number;
}
export const IpGeoLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ lat: S.optional(S.Number), lon: S.optional(S.Number) }),
).annotate({ identifier: "IpGeoLocation" }) as any as S.Schema<IpGeoLocation>;
export interface IpOwner {
  asn?: string;
  asnOrg?: string;
  isp?: string;
  org?: string;
}
export const IpOwner = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    asn: S.optional(S.String),
    asnOrg: S.optional(S.String),
    isp: S.optional(S.String),
    org: S.optional(S.String),
  }),
).annotate({ identifier: "IpOwner" }) as any as S.Schema<IpOwner>;
export interface IpAddressDetails {
  ipAddressV4?: string;
  ipCity?: IpCity;
  ipCountry?: IpCountry;
  ipGeoLocation?: IpGeoLocation;
  ipOwner?: IpOwner;
}
export const IpAddressDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ipAddressV4: S.optional(S.String),
    ipCity: S.optional(IpCity),
    ipCountry: S.optional(IpCountry),
    ipGeoLocation: S.optional(IpGeoLocation),
    ipOwner: S.optional(IpOwner),
  }),
).annotate({
  identifier: "IpAddressDetails",
}) as any as S.Schema<IpAddressDetails>;
export interface SessionContextAttributes {
  creationDate?: Date;
  mfaAuthenticated?: boolean;
}
export const SessionContextAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    creationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    mfaAuthenticated: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "SessionContextAttributes",
}) as any as S.Schema<SessionContextAttributes>;
export interface SessionIssuer {
  accountId?: string;
  arn?: string;
  principalId?: string;
  type?: string;
  userName?: string;
}
export const SessionIssuer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    arn: S.optional(S.String),
    principalId: S.optional(S.String),
    type: S.optional(S.String),
    userName: S.optional(S.String),
  }),
).annotate({ identifier: "SessionIssuer" }) as any as S.Schema<SessionIssuer>;
export interface SessionContext {
  attributes?: SessionContextAttributes;
  sessionIssuer?: SessionIssuer;
}
export const SessionContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attributes: S.optional(SessionContextAttributes),
    sessionIssuer: S.optional(SessionIssuer),
  }),
).annotate({ identifier: "SessionContext" }) as any as S.Schema<SessionContext>;
export interface AssumedRole {
  accessKeyId?: string;
  accountId?: string;
  arn?: string;
  principalId?: string;
  sessionContext?: SessionContext;
}
export const AssumedRole = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessKeyId: S.optional(S.String),
    accountId: S.optional(S.String),
    arn: S.optional(S.String),
    principalId: S.optional(S.String),
    sessionContext: S.optional(SessionContext),
  }),
).annotate({ identifier: "AssumedRole" }) as any as S.Schema<AssumedRole>;
export interface AwsAccount {
  accountId?: string;
  principalId?: string;
}
export const AwsAccount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    principalId: S.optional(S.String),
  }),
).annotate({ identifier: "AwsAccount" }) as any as S.Schema<AwsAccount>;
export interface AwsService {
  invokedBy?: string;
}
export const AwsService = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ invokedBy: S.optional(S.String) }),
).annotate({ identifier: "AwsService" }) as any as S.Schema<AwsService>;
export interface FederatedUser {
  accessKeyId?: string;
  accountId?: string;
  arn?: string;
  principalId?: string;
  sessionContext?: SessionContext;
}
export const FederatedUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessKeyId: S.optional(S.String),
    accountId: S.optional(S.String),
    arn: S.optional(S.String),
    principalId: S.optional(S.String),
    sessionContext: S.optional(SessionContext),
  }),
).annotate({ identifier: "FederatedUser" }) as any as S.Schema<FederatedUser>;
export interface IamUser {
  accountId?: string;
  arn?: string;
  principalId?: string;
  userName?: string;
}
export const IamUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    arn: S.optional(S.String),
    principalId: S.optional(S.String),
    userName: S.optional(S.String),
  }),
).annotate({ identifier: "IamUser" }) as any as S.Schema<IamUser>;
export interface UserIdentityRoot {
  accountId?: string;
  arn?: string;
  principalId?: string;
}
export const UserIdentityRoot = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    arn: S.optional(S.String),
    principalId: S.optional(S.String),
  }),
).annotate({
  identifier: "UserIdentityRoot",
}) as any as S.Schema<UserIdentityRoot>;
export type UserIdentityType =
  | "AssumedRole"
  | "IAMUser"
  | "FederatedUser"
  | "Root"
  | "AWSAccount"
  | "AWSService"
  | (string & {});
export const UserIdentityType = S.String;

export interface UserIdentity {
  assumedRole?: AssumedRole;
  awsAccount?: AwsAccount;
  awsService?: AwsService;
  federatedUser?: FederatedUser;
  iamUser?: IamUser;
  root?: UserIdentityRoot;
  type?: UserIdentityType;
}
export const UserIdentity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assumedRole: S.optional(AssumedRole),
    awsAccount: S.optional(AwsAccount),
    awsService: S.optional(AwsService),
    federatedUser: S.optional(FederatedUser),
    iamUser: S.optional(IamUser),
    root: S.optional(UserIdentityRoot),
    type: S.optional(UserIdentityType),
  }),
).annotate({ identifier: "UserIdentity" }) as any as S.Schema<UserIdentity>;
export interface FindingActor {
  domainDetails?: DomainDetails;
  ipAddressDetails?: IpAddressDetails;
  userIdentity?: UserIdentity;
}
export const FindingActor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainDetails: S.optional(DomainDetails),
    ipAddressDetails: S.optional(IpAddressDetails),
    userIdentity: S.optional(UserIdentity),
  }),
).annotate({ identifier: "FindingActor" }) as any as S.Schema<FindingActor>;
export interface PolicyDetails {
  action?: FindingAction;
  actor?: FindingActor;
}
export const PolicyDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: S.optional(FindingAction),
    actor: S.optional(FindingActor),
  }),
).annotate({ identifier: "PolicyDetails" }) as any as S.Schema<PolicyDetails>;
export type EncryptionType =
  | "NONE"
  | "AES256"
  | "aws:kms"
  | "UNKNOWN"
  | "aws:kms:dsse"
  | (string & {});
export const EncryptionType = S.String;

export interface ServerSideEncryption {
  encryptionType?: EncryptionType;
  kmsMasterKeyId?: string;
}
export const ServerSideEncryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    encryptionType: S.optional(EncryptionType),
    kmsMasterKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "ServerSideEncryption",
}) as any as S.Schema<ServerSideEncryption>;
export interface S3BucketOwner {
  displayName?: string;
  id?: string;
}
export const S3BucketOwner = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ displayName: S.optional(S.String), id: S.optional(S.String) }),
).annotate({ identifier: "S3BucketOwner" }) as any as S.Schema<S3BucketOwner>;
export type KeyValuePairList = KeyValuePair[];
export const KeyValuePairList = /*@__PURE__*/ S.Array(KeyValuePair);
export interface S3Bucket {
  allowsUnencryptedObjectUploads?: AllowsUnencryptedObjectUploads;
  arn?: string;
  createdAt?: Date;
  defaultServerSideEncryption?: ServerSideEncryption;
  name?: string;
  owner?: S3BucketOwner;
  publicAccess?: BucketPublicAccess;
  tags?: KeyValuePair[];
}
export const S3Bucket = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    allowsUnencryptedObjectUploads: S.optional(AllowsUnencryptedObjectUploads),
    arn: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    defaultServerSideEncryption: S.optional(ServerSideEncryption),
    name: S.optional(S.String),
    owner: S.optional(S3BucketOwner),
    publicAccess: S.optional(BucketPublicAccess),
    tags: S.optional(KeyValuePairList),
  }),
).annotate({ identifier: "S3Bucket" }) as any as S.Schema<S3Bucket>;
export type StorageClass =
  | "STANDARD"
  | "REDUCED_REDUNDANCY"
  | "STANDARD_IA"
  | "INTELLIGENT_TIERING"
  | "DEEP_ARCHIVE"
  | "ONEZONE_IA"
  | "GLACIER"
  | "GLACIER_IR"
  | "OUTPOSTS"
  | (string & {});
export const StorageClass = S.String;

export interface S3Object {
  bucketArn?: string;
  eTag?: string;
  extension?: string;
  key?: string;
  lastModified?: Date;
  path?: string;
  publicAccess?: boolean;
  serverSideEncryption?: ServerSideEncryption;
  size?: number;
  storageClass?: StorageClass;
  tags?: KeyValuePair[];
  versionId?: string;
}
export const S3Object = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucketArn: S.optional(S.String),
    eTag: S.optional(S.String),
    extension: S.optional(S.String),
    key: S.optional(S.String),
    lastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    path: S.optional(S.String),
    publicAccess: S.optional(S.Boolean),
    serverSideEncryption: S.optional(ServerSideEncryption),
    size: S.optional(S.Number),
    storageClass: S.optional(StorageClass),
    tags: S.optional(KeyValuePairList),
    versionId: S.optional(S.String),
  }),
).annotate({ identifier: "S3Object" }) as any as S.Schema<S3Object>;
export interface ResourcesAffected {
  s3Bucket?: S3Bucket;
  s3Object?: S3Object;
}
export const ResourcesAffected = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Bucket: S.optional(S3Bucket), s3Object: S.optional(S3Object) }),
).annotate({
  identifier: "ResourcesAffected",
}) as any as S.Schema<ResourcesAffected>;
export type SeverityDescription = "Low" | "Medium" | "High" | (string & {});
export const SeverityDescription = S.String;

export interface Severity {
  description?: SeverityDescription;
  score?: number;
}
export const Severity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.optional(SeverityDescription),
    score: S.optional(S.Number),
  }),
).annotate({ identifier: "Severity" }) as any as S.Schema<Severity>;
export interface Finding {
  accountId?: string;
  archived?: boolean;
  category?: FindingCategory;
  classificationDetails?: ClassificationDetails;
  count?: number;
  createdAt?: Date;
  description?: string;
  id?: string;
  partition?: string;
  policyDetails?: PolicyDetails;
  region?: string;
  resourcesAffected?: ResourcesAffected;
  sample?: boolean;
  schemaVersion?: string;
  severity?: Severity;
  title?: string;
  type?: FindingType;
  updatedAt?: Date;
}
export const Finding = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    archived: S.optional(S.Boolean),
    category: S.optional(FindingCategory),
    classificationDetails: S.optional(ClassificationDetails),
    count: S.optional(S.Number),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    description: S.optional(S.String),
    id: S.optional(S.String),
    partition: S.optional(S.String),
    policyDetails: S.optional(PolicyDetails),
    region: S.optional(S.String),
    resourcesAffected: S.optional(ResourcesAffected),
    sample: S.optional(S.Boolean),
    schemaVersion: S.optional(S.String),
    severity: S.optional(Severity),
    title: S.optional(S.String),
    type: S.optional(FindingType),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "Finding" }) as any as S.Schema<Finding>;
export type __listOfFinding = Finding[];
export const __listOfFinding = /*@__PURE__*/ S.Array(Finding);
export interface GetFindingsResponse {
  findings?: Finding[];
}
export const GetFindingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ findings: S.optional(__listOfFinding) }),
).annotate({
  identifier: "GetFindingsResponse",
}) as any as S.Schema<GetFindingsResponse>;
export interface GetFindingsFilterRequest {
  id: string;
}
export const GetFindingsFilterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/findingsfilters/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFindingsFilterRequest",
}) as any as S.Schema<GetFindingsFilterRequest>;
export interface GetFindingsFilterResponse {
  action?: FindingsFilterAction;
  arn?: string;
  description?: string;
  findingCriteria?: FindingCriteria;
  id?: string;
  name?: string;
  position?: number;
  tags?: { [key: string]: string | undefined };
}
export const GetFindingsFilterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: S.optional(FindingsFilterAction),
    arn: S.optional(S.String),
    description: S.optional(S.String),
    findingCriteria: S.optional(FindingCriteria),
    id: S.optional(S.String),
    name: S.optional(S.String),
    position: S.optional(S.Number),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetFindingsFilterResponse",
}) as any as S.Schema<GetFindingsFilterResponse>;
export interface GetFindingsPublicationConfigurationRequest {}
export const GetFindingsPublicationConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({}).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/findings-publication-configuration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetFindingsPublicationConfigurationRequest",
  }) as any as S.Schema<GetFindingsPublicationConfigurationRequest>;
export interface SecurityHubConfiguration {
  publishClassificationFindings?: boolean;
  publishPolicyFindings?: boolean;
}
export const SecurityHubConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    publishClassificationFindings: S.optional(S.Boolean),
    publishPolicyFindings: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "SecurityHubConfiguration",
}) as any as S.Schema<SecurityHubConfiguration>;
export interface GetFindingsPublicationConfigurationResponse {
  securityHubConfiguration?: SecurityHubConfiguration & {
    publishClassificationFindings: boolean;
    publishPolicyFindings: boolean;
  };
}
export const GetFindingsPublicationConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      securityHubConfiguration: S.optional(SecurityHubConfiguration),
    }),
  ).annotate({
    identifier: "GetFindingsPublicationConfigurationResponse",
  }) as any as S.Schema<GetFindingsPublicationConfigurationResponse>;
export type GroupBy =
  | "resourcesAffected.s3Bucket.name"
  | "type"
  | "classificationDetails.jobId"
  | "severity.description"
  | (string & {});
export const GroupBy = S.String;

export type FindingStatisticsSortAttributeName =
  | "groupKey"
  | "count"
  | (string & {});
export const FindingStatisticsSortAttributeName = S.String;

export interface FindingStatisticsSortCriteria {
  attributeName?: FindingStatisticsSortAttributeName;
  orderBy?: OrderBy;
}
export const FindingStatisticsSortCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attributeName: S.optional(FindingStatisticsSortAttributeName),
    orderBy: S.optional(OrderBy),
  }),
).annotate({
  identifier: "FindingStatisticsSortCriteria",
}) as any as S.Schema<FindingStatisticsSortCriteria>;
export interface GetFindingStatisticsRequest {
  findingCriteria?: FindingCriteria;
  groupBy?: GroupBy;
  size?: number;
  sortCriteria?: FindingStatisticsSortCriteria;
}
export const GetFindingStatisticsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    findingCriteria: S.optional(FindingCriteria),
    groupBy: S.optional(GroupBy),
    size: S.optional(S.Number),
    sortCriteria: S.optional(FindingStatisticsSortCriteria),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/findings/statistics" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFindingStatisticsRequest",
}) as any as S.Schema<GetFindingStatisticsRequest>;
export interface GroupCount {
  count?: number;
  groupKey?: string;
}
export const GroupCount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ count: S.optional(S.Number), groupKey: S.optional(S.String) }),
).annotate({ identifier: "GroupCount" }) as any as S.Schema<GroupCount>;
export type __listOfGroupCount = GroupCount[];
export const __listOfGroupCount = /*@__PURE__*/ S.Array(GroupCount);
export interface GetFindingStatisticsResponse {
  countsByGroup?: GroupCount[];
}
export const GetFindingStatisticsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ countsByGroup: S.optional(__listOfGroupCount) }),
).annotate({
  identifier: "GetFindingStatisticsResponse",
}) as any as S.Schema<GetFindingStatisticsResponse>;
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
  invitationsCount?: number;
}
export const GetInvitationsCountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ invitationsCount: S.optional(S.Number) }),
).annotate({
  identifier: "GetInvitationsCountResponse",
}) as any as S.Schema<GetInvitationsCountResponse>;
export interface GetMacieSessionRequest {}
export const GetMacieSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/macie" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMacieSessionRequest",
}) as any as S.Schema<GetMacieSessionRequest>;
export interface GetMacieSessionResponse {
  createdAt?: Date;
  findingPublishingFrequency?: FindingPublishingFrequency;
  serviceRole?: string;
  status?: MacieStatus;
  updatedAt?: Date;
}
export const GetMacieSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    findingPublishingFrequency: S.optional(FindingPublishingFrequency),
    serviceRole: S.optional(S.String),
    status: S.optional(MacieStatus),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetMacieSessionResponse",
}) as any as S.Schema<GetMacieSessionResponse>;
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
  master?: Invitation;
}
export const GetMasterAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ master: S.optional(Invitation) }),
).annotate({
  identifier: "GetMasterAccountResponse",
}) as any as S.Schema<GetMasterAccountResponse>;
export interface GetMemberRequest {
  id: string;
}
export const GetMemberRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/members/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMemberRequest",
}) as any as S.Schema<GetMemberRequest>;
export interface GetMemberResponse {
  accountId?: string;
  administratorAccountId?: string;
  arn?: string;
  email?: string;
  invitedAt?: Date;
  masterAccountId?: string;
  relationshipStatus?: RelationshipStatus;
  tags?: { [key: string]: string | undefined };
  updatedAt?: Date;
}
export const GetMemberResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    administratorAccountId: S.optional(S.String),
    arn: S.optional(S.String),
    email: S.optional(S.String),
    invitedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    masterAccountId: S.optional(S.String),
    relationshipStatus: S.optional(RelationshipStatus),
    tags: S.optional(TagMap),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetMemberResponse",
}) as any as S.Schema<GetMemberResponse>;
export interface GetResourceProfileRequest {
  resourceArn?: string;
}
export const GetResourceProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.optional(S.String).pipe(T.HttpQuery("resourceArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/resource-profiles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourceProfileRequest",
}) as any as S.Schema<GetResourceProfileRequest>;
export interface ResourceStatistics {
  totalBytesClassified?: number;
  totalDetections?: number;
  totalDetectionsSuppressed?: number;
  totalItemsClassified?: number;
  totalItemsSensitive?: number;
  totalItemsSkipped?: number;
  totalItemsSkippedInvalidEncryption?: number;
  totalItemsSkippedInvalidKms?: number;
  totalItemsSkippedPermissionDenied?: number;
}
export const ResourceStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    totalBytesClassified: S.optional(S.Number),
    totalDetections: S.optional(S.Number),
    totalDetectionsSuppressed: S.optional(S.Number),
    totalItemsClassified: S.optional(S.Number),
    totalItemsSensitive: S.optional(S.Number),
    totalItemsSkipped: S.optional(S.Number),
    totalItemsSkippedInvalidEncryption: S.optional(S.Number),
    totalItemsSkippedInvalidKms: S.optional(S.Number),
    totalItemsSkippedPermissionDenied: S.optional(S.Number),
  }),
).annotate({
  identifier: "ResourceStatistics",
}) as any as S.Schema<ResourceStatistics>;
export interface GetResourceProfileResponse {
  profileUpdatedAt?: Date;
  sensitivityScore?: number;
  sensitivityScoreOverridden?: boolean;
  statistics?: ResourceStatistics;
}
export const GetResourceProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    sensitivityScore: S.optional(S.Number),
    sensitivityScoreOverridden: S.optional(S.Boolean),
    statistics: S.optional(ResourceStatistics),
  }),
).annotate({
  identifier: "GetResourceProfileResponse",
}) as any as S.Schema<GetResourceProfileResponse>;
export interface GetRevealConfigurationRequest {}
export const GetRevealConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/reveal-configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRevealConfigurationRequest",
}) as any as S.Schema<GetRevealConfigurationRequest>;
export type __stringMin1Max2048 = string;
export type RevealStatus = "ENABLED" | "DISABLED" | (string & {});
export const RevealStatus = S.String;

export interface RevealConfiguration {
  kmsKeyId?: string;
  status?: RevealStatus;
}
export const RevealConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    kmsKeyId: S.optional(S.String),
    status: S.optional(RevealStatus),
  }),
).annotate({
  identifier: "RevealConfiguration",
}) as any as S.Schema<RevealConfiguration>;
export type RetrievalMode =
  | "CALLER_CREDENTIALS"
  | "ASSUME_ROLE"
  | (string & {});
export const RetrievalMode = S.String;

export type __stringMin1Max64PatternW = string;
export interface RetrievalConfiguration {
  externalId?: string;
  retrievalMode?: RetrievalMode;
  roleName?: string;
}
export const RetrievalConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    externalId: S.optional(S.String),
    retrievalMode: S.optional(RetrievalMode),
    roleName: S.optional(S.String),
  }),
).annotate({
  identifier: "RetrievalConfiguration",
}) as any as S.Schema<RetrievalConfiguration>;
export interface GetRevealConfigurationResponse {
  configuration?: RevealConfiguration & { status: RevealStatus };
  retrievalConfiguration?: RetrievalConfiguration & {
    retrievalMode: RetrievalMode;
  };
}
export const GetRevealConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuration: S.optional(RevealConfiguration),
    retrievalConfiguration: S.optional(RetrievalConfiguration),
  }),
).annotate({
  identifier: "GetRevealConfigurationResponse",
}) as any as S.Schema<GetRevealConfigurationResponse>;
export interface GetSensitiveDataOccurrencesRequest {
  findingId: string;
}
export const GetSensitiveDataOccurrencesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ findingId: S.String.pipe(T.HttpLabel("findingId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/findings/{findingId}/reveal" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSensitiveDataOccurrencesRequest",
}) as any as S.Schema<GetSensitiveDataOccurrencesRequest>;
export type __stringMin1Max128 = string;
export interface DetectedDataDetails {
  value?: string | redacted.Redacted<string>;
}
export const DetectedDataDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: S.optional(SensitiveString) }),
).annotate({
  identifier: "DetectedDataDetails",
}) as any as S.Schema<DetectedDataDetails>;
export type __listOfDetectedDataDetails = DetectedDataDetails[];
export const __listOfDetectedDataDetails =
  /*@__PURE__*/ S.Array(DetectedDataDetails);
export type SensitiveDataOccurrences = {
  [key: string]: DetectedDataDetails[] | undefined;
};
export const SensitiveDataOccurrences = /*@__PURE__*/ S.Record(
  S.String,
  __listOfDetectedDataDetails.pipe(S.optional),
);
export type RevealRequestStatus =
  | "SUCCESS"
  | "PROCESSING"
  | "ERROR"
  | (string & {});
export const RevealRequestStatus = S.String;

export interface GetSensitiveDataOccurrencesResponse {
  error?: string;
  sensitiveDataOccurrences?: {
    [key: string]:
      | (DetectedDataDetails & { value: __stringMin1Max128 })[]
      | undefined;
  };
  status?: RevealRequestStatus;
}
export const GetSensitiveDataOccurrencesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    error: S.optional(S.String),
    sensitiveDataOccurrences: S.optional(SensitiveDataOccurrences),
    status: S.optional(RevealRequestStatus),
  }),
).annotate({
  identifier: "GetSensitiveDataOccurrencesResponse",
}) as any as S.Schema<GetSensitiveDataOccurrencesResponse>;
export interface GetSensitiveDataOccurrencesAvailabilityRequest {
  findingId: string;
}
export const GetSensitiveDataOccurrencesAvailabilityRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ findingId: S.String.pipe(T.HttpLabel("findingId")) }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/findings/{findingId}/reveal/availability",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetSensitiveDataOccurrencesAvailabilityRequest",
  }) as any as S.Schema<GetSensitiveDataOccurrencesAvailabilityRequest>;
export type AvailabilityCode = "AVAILABLE" | "UNAVAILABLE" | (string & {});
export const AvailabilityCode = S.String;

export type UnavailabilityReasonCode =
  | "OBJECT_EXCEEDS_SIZE_QUOTA"
  | "UNSUPPORTED_OBJECT_TYPE"
  | "UNSUPPORTED_FINDING_TYPE"
  | "INVALID_CLASSIFICATION_RESULT"
  | "OBJECT_UNAVAILABLE"
  | "ACCOUNT_NOT_IN_ORGANIZATION"
  | "MISSING_GET_MEMBER_PERMISSION"
  | "ROLE_TOO_PERMISSIVE"
  | "MEMBER_ROLE_TOO_PERMISSIVE"
  | "INVALID_RESULT_SIGNATURE"
  | "RESULT_NOT_SIGNED"
  | (string & {});
export const UnavailabilityReasonCode = S.String;

export type __listOfUnavailabilityReasonCode = UnavailabilityReasonCode[];
export const __listOfUnavailabilityReasonCode = /*@__PURE__*/ S.Array(
  UnavailabilityReasonCode,
);
export interface GetSensitiveDataOccurrencesAvailabilityResponse {
  code?: AvailabilityCode;
  reasons?: UnavailabilityReasonCode[];
}
export const GetSensitiveDataOccurrencesAvailabilityResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      code: S.optional(AvailabilityCode),
      reasons: S.optional(__listOfUnavailabilityReasonCode),
    }),
  ).annotate({
    identifier: "GetSensitiveDataOccurrencesAvailabilityResponse",
  }) as any as S.Schema<GetSensitiveDataOccurrencesAvailabilityResponse>;
export interface GetSensitivityInspectionTemplateRequest {
  id: string;
}
export const GetSensitivityInspectionTemplateRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/templates/sensitivity-inspections/{id}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetSensitivityInspectionTemplateRequest",
}) as any as S.Schema<GetSensitivityInspectionTemplateRequest>;
export interface SensitivityInspectionTemplateExcludes {
  managedDataIdentifierIds?: string[];
}
export const SensitivityInspectionTemplateExcludes = /*@__PURE__*/ S.suspend(
  () => S.Struct({ managedDataIdentifierIds: S.optional(__listOf__string) }),
).annotate({
  identifier: "SensitivityInspectionTemplateExcludes",
}) as any as S.Schema<SensitivityInspectionTemplateExcludes>;
export interface SensitivityInspectionTemplateIncludes {
  allowListIds?: string[];
  customDataIdentifierIds?: string[];
  managedDataIdentifierIds?: string[];
}
export const SensitivityInspectionTemplateIncludes = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      allowListIds: S.optional(__listOf__string),
      customDataIdentifierIds: S.optional(__listOf__string),
      managedDataIdentifierIds: S.optional(__listOf__string),
    }),
).annotate({
  identifier: "SensitivityInspectionTemplateIncludes",
}) as any as S.Schema<SensitivityInspectionTemplateIncludes>;
export interface GetSensitivityInspectionTemplateResponse {
  description?: string;
  excludes?: SensitivityInspectionTemplateExcludes;
  includes?: SensitivityInspectionTemplateIncludes;
  name?: string;
  sensitivityInspectionTemplateId?: string;
}
export const GetSensitivityInspectionTemplateResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      description: S.optional(S.String),
      excludes: S.optional(SensitivityInspectionTemplateExcludes),
      includes: S.optional(SensitivityInspectionTemplateIncludes),
      name: S.optional(S.String),
      sensitivityInspectionTemplateId: S.optional(S.String),
    }),
).annotate({
  identifier: "GetSensitivityInspectionTemplateResponse",
}) as any as S.Schema<GetSensitivityInspectionTemplateResponse>;
export type UsageStatisticsFilterComparator =
  | "GT"
  | "GTE"
  | "LT"
  | "LTE"
  | "EQ"
  | "NE"
  | "CONTAINS"
  | (string & {});
export const UsageStatisticsFilterComparator = S.String;

export type UsageStatisticsFilterKey =
  | "accountId"
  | "serviceLimit"
  | "freeTrialStartDate"
  | "total"
  | (string & {});
export const UsageStatisticsFilterKey = S.String;

export interface UsageStatisticsFilter {
  comparator?: UsageStatisticsFilterComparator;
  key?: UsageStatisticsFilterKey;
  values?: string[];
}
export const UsageStatisticsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    comparator: S.optional(UsageStatisticsFilterComparator),
    key: S.optional(UsageStatisticsFilterKey),
    values: S.optional(__listOf__string),
  }),
).annotate({
  identifier: "UsageStatisticsFilter",
}) as any as S.Schema<UsageStatisticsFilter>;
export type __listOfUsageStatisticsFilter = UsageStatisticsFilter[];
export const __listOfUsageStatisticsFilter = /*@__PURE__*/ S.Array(
  UsageStatisticsFilter,
);
export type UsageStatisticsSortKey =
  | "accountId"
  | "total"
  | "serviceLimitValue"
  | "freeTrialStartDate"
  | (string & {});
export const UsageStatisticsSortKey = S.String;

export interface UsageStatisticsSortBy {
  key?: UsageStatisticsSortKey;
  orderBy?: OrderBy;
}
export const UsageStatisticsSortBy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    key: S.optional(UsageStatisticsSortKey),
    orderBy: S.optional(OrderBy),
  }),
).annotate({
  identifier: "UsageStatisticsSortBy",
}) as any as S.Schema<UsageStatisticsSortBy>;
export type TimeRange = "MONTH_TO_DATE" | "PAST_30_DAYS" | (string & {});
export const TimeRange = S.String;

export interface GetUsageStatisticsRequest {
  filterBy?: UsageStatisticsFilter[];
  maxResults?: number;
  nextToken?: string;
  sortBy?: UsageStatisticsSortBy;
  timeRange?: TimeRange;
}
export const GetUsageStatisticsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filterBy: S.optional(__listOfUsageStatisticsFilter),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    sortBy: S.optional(UsageStatisticsSortBy),
    timeRange: S.optional(TimeRange),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/usage/statistics" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetUsageStatisticsRequest",
}) as any as S.Schema<GetUsageStatisticsRequest>;
export type Currency = "USD" | (string & {});
export const Currency = S.String;

export type Unit = "TERABYTES" | (string & {});
export const Unit = S.String;

export interface ServiceLimit {
  isServiceLimited?: boolean;
  unit?: Unit;
  value?: number;
}
export const ServiceLimit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    isServiceLimited: S.optional(S.Boolean),
    unit: S.optional(Unit),
    value: S.optional(S.Number),
  }),
).annotate({ identifier: "ServiceLimit" }) as any as S.Schema<ServiceLimit>;
export type UsageType =
  | "DATA_INVENTORY_EVALUATION"
  | "SENSITIVE_DATA_DISCOVERY"
  | "AUTOMATED_SENSITIVE_DATA_DISCOVERY"
  | "AUTOMATED_OBJECT_MONITORING"
  | (string & {});
export const UsageType = S.String;

export interface UsageByAccount {
  currency?: Currency;
  estimatedCost?: string;
  serviceLimit?: ServiceLimit;
  type?: UsageType;
}
export const UsageByAccount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    currency: S.optional(Currency),
    estimatedCost: S.optional(S.String),
    serviceLimit: S.optional(ServiceLimit),
    type: S.optional(UsageType),
  }),
).annotate({ identifier: "UsageByAccount" }) as any as S.Schema<UsageByAccount>;
export type __listOfUsageByAccount = UsageByAccount[];
export const __listOfUsageByAccount = /*@__PURE__*/ S.Array(UsageByAccount);
export interface UsageRecord {
  accountId?: string;
  automatedDiscoveryFreeTrialStartDate?: Date;
  freeTrialStartDate?: Date;
  usage?: UsageByAccount[];
}
export const UsageRecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    automatedDiscoveryFreeTrialStartDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    freeTrialStartDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    usage: S.optional(__listOfUsageByAccount),
  }),
).annotate({ identifier: "UsageRecord" }) as any as S.Schema<UsageRecord>;
export type __listOfUsageRecord = UsageRecord[];
export const __listOfUsageRecord = /*@__PURE__*/ S.Array(UsageRecord);
export interface GetUsageStatisticsResponse {
  nextToken?: string;
  records?: UsageRecord[];
  timeRange?: TimeRange;
}
export const GetUsageStatisticsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    records: S.optional(__listOfUsageRecord),
    timeRange: S.optional(TimeRange),
  }),
).annotate({
  identifier: "GetUsageStatisticsResponse",
}) as any as S.Schema<GetUsageStatisticsResponse>;
export interface GetUsageTotalsRequest {
  timeRange?: string;
}
export const GetUsageTotalsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timeRange: S.optional(S.String).pipe(T.HttpQuery("timeRange")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/usage" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetUsageTotalsRequest",
}) as any as S.Schema<GetUsageTotalsRequest>;
export interface UsageTotal {
  currency?: Currency;
  estimatedCost?: string;
  type?: UsageType;
}
export const UsageTotal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    currency: S.optional(Currency),
    estimatedCost: S.optional(S.String),
    type: S.optional(UsageType),
  }),
).annotate({ identifier: "UsageTotal" }) as any as S.Schema<UsageTotal>;
export type __listOfUsageTotal = UsageTotal[];
export const __listOfUsageTotal = /*@__PURE__*/ S.Array(UsageTotal);
export interface GetUsageTotalsResponse {
  timeRange?: TimeRange;
  usageTotals?: UsageTotal[];
}
export const GetUsageTotalsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timeRange: S.optional(TimeRange),
    usageTotals: S.optional(__listOfUsageTotal),
  }),
).annotate({
  identifier: "GetUsageTotalsResponse",
}) as any as S.Schema<GetUsageTotalsResponse>;
export type MaxResults = number;
export interface ListAllowListsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListAllowListsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/allow-lists" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAllowListsRequest",
}) as any as S.Schema<ListAllowListsRequest>;
export interface AllowListSummary {
  arn?: string;
  createdAt?: Date;
  description?: string;
  id?: string;
  name?: string;
  updatedAt?: Date;
}
export const AllowListSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    description: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "AllowListSummary",
}) as any as S.Schema<AllowListSummary>;
export type __listOfAllowListSummary = AllowListSummary[];
export const __listOfAllowListSummary = /*@__PURE__*/ S.Array(AllowListSummary);
export interface ListAllowListsResponse {
  allowLists?: AllowListSummary[];
  nextToken?: string;
}
export const ListAllowListsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    allowLists: S.optional(__listOfAllowListSummary),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAllowListsResponse",
}) as any as S.Schema<ListAllowListsResponse>;
export interface ListAutomatedDiscoveryAccountsRequest {
  accountIds?: string[];
  maxResults?: number;
  nextToken?: string;
}
export const ListAutomatedDiscoveryAccountsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      accountIds: S.optional(__listOf__string).pipe(T.HttpQuery("accountIds")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/automated-discovery/accounts" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListAutomatedDiscoveryAccountsRequest",
}) as any as S.Schema<ListAutomatedDiscoveryAccountsRequest>;
export interface AutomatedDiscoveryAccount {
  accountId?: string;
  status?: AutomatedDiscoveryAccountStatus;
}
export const AutomatedDiscoveryAccount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    status: S.optional(AutomatedDiscoveryAccountStatus),
  }),
).annotate({
  identifier: "AutomatedDiscoveryAccount",
}) as any as S.Schema<AutomatedDiscoveryAccount>;
export type __listOfAutomatedDiscoveryAccount = AutomatedDiscoveryAccount[];
export const __listOfAutomatedDiscoveryAccount = /*@__PURE__*/ S.Array(
  AutomatedDiscoveryAccount,
);
export interface ListAutomatedDiscoveryAccountsResponse {
  items?: AutomatedDiscoveryAccount[];
  nextToken?: string;
}
export const ListAutomatedDiscoveryAccountsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      items: S.optional(__listOfAutomatedDiscoveryAccount),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListAutomatedDiscoveryAccountsResponse",
}) as any as S.Schema<ListAutomatedDiscoveryAccountsResponse>;
export type ListJobsFilterKey =
  | "jobType"
  | "jobStatus"
  | "createdAt"
  | "name"
  | (string & {});
export const ListJobsFilterKey = S.String;

export interface ListJobsFilterTerm {
  comparator?: JobComparator;
  key?: ListJobsFilterKey;
  values?: string[];
}
export const ListJobsFilterTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    comparator: S.optional(JobComparator),
    key: S.optional(ListJobsFilterKey),
    values: S.optional(__listOf__string),
  }),
).annotate({
  identifier: "ListJobsFilterTerm",
}) as any as S.Schema<ListJobsFilterTerm>;
export type __listOfListJobsFilterTerm = ListJobsFilterTerm[];
export const __listOfListJobsFilterTerm =
  /*@__PURE__*/ S.Array(ListJobsFilterTerm);
export interface ListJobsFilterCriteria {
  excludes?: ListJobsFilterTerm[];
  includes?: ListJobsFilterTerm[];
}
export const ListJobsFilterCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    excludes: S.optional(__listOfListJobsFilterTerm),
    includes: S.optional(__listOfListJobsFilterTerm),
  }),
).annotate({
  identifier: "ListJobsFilterCriteria",
}) as any as S.Schema<ListJobsFilterCriteria>;
export type ListJobsSortAttributeName =
  | "createdAt"
  | "jobStatus"
  | "name"
  | "jobType"
  | (string & {});
export const ListJobsSortAttributeName = S.String;

export interface ListJobsSortCriteria {
  attributeName?: ListJobsSortAttributeName;
  orderBy?: OrderBy;
}
export const ListJobsSortCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attributeName: S.optional(ListJobsSortAttributeName),
    orderBy: S.optional(OrderBy),
  }),
).annotate({
  identifier: "ListJobsSortCriteria",
}) as any as S.Schema<ListJobsSortCriteria>;
export interface ListClassificationJobsRequest {
  filterCriteria?: ListJobsFilterCriteria;
  maxResults?: number;
  nextToken?: string;
  sortCriteria?: ListJobsSortCriteria;
}
export const ListClassificationJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filterCriteria: S.optional(ListJobsFilterCriteria),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    sortCriteria: S.optional(ListJobsSortCriteria),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/jobs/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListClassificationJobsRequest",
}) as any as S.Schema<ListClassificationJobsRequest>;
export interface JobSummary {
  bucketCriteria?: S3BucketCriteriaForJob;
  bucketDefinitions?: S3BucketDefinitionForJob[];
  createdAt?: Date;
  jobId?: string;
  jobStatus?: JobStatus;
  jobType?: JobType;
  lastRunErrorStatus?: LastRunErrorStatus;
  name?: string;
  userPausedDetails?: UserPausedDetails;
}
export const JobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucketCriteria: S.optional(S3BucketCriteriaForJob),
    bucketDefinitions: S.optional(__listOfS3BucketDefinitionForJob),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    jobId: S.optional(S.String),
    jobStatus: S.optional(JobStatus),
    jobType: S.optional(JobType),
    lastRunErrorStatus: S.optional(LastRunErrorStatus),
    name: S.optional(S.String),
    userPausedDetails: S.optional(UserPausedDetails),
  }),
).annotate({ identifier: "JobSummary" }) as any as S.Schema<JobSummary>;
export type __listOfJobSummary = JobSummary[];
export const __listOfJobSummary = /*@__PURE__*/ S.Array(JobSummary);
export interface ListClassificationJobsResponse {
  items?: (JobSummary & {
    bucketDefinitions: (S3BucketDefinitionForJob & {
      accountId: string;
      buckets: __listOf__string;
    })[];
  })[];
  nextToken?: string;
}
export const ListClassificationJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(__listOfJobSummary),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListClassificationJobsResponse",
}) as any as S.Schema<ListClassificationJobsResponse>;
export interface ListClassificationScopesRequest {
  name?: string;
  nextToken?: string;
}
export const ListClassificationScopesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String).pipe(T.HttpQuery("name")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/classification-scopes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListClassificationScopesRequest",
}) as any as S.Schema<ListClassificationScopesRequest>;
export interface ClassificationScopeSummary {
  id?: string;
  name?: string;
}
export const ClassificationScopeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String), name: S.optional(S.String) }),
).annotate({
  identifier: "ClassificationScopeSummary",
}) as any as S.Schema<ClassificationScopeSummary>;
export type __listOfClassificationScopeSummary = ClassificationScopeSummary[];
export const __listOfClassificationScopeSummary = /*@__PURE__*/ S.Array(
  ClassificationScopeSummary,
);
export type NextToken = string;
export interface ListClassificationScopesResponse {
  classificationScopes?: ClassificationScopeSummary[];
  nextToken?: string;
}
export const ListClassificationScopesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    classificationScopes: S.optional(__listOfClassificationScopeSummary),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListClassificationScopesResponse",
}) as any as S.Schema<ListClassificationScopesResponse>;
export interface ListCustomDataIdentifiersRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListCustomDataIdentifiersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/custom-data-identifiers/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCustomDataIdentifiersRequest",
}) as any as S.Schema<ListCustomDataIdentifiersRequest>;
export interface CustomDataIdentifierSummary {
  arn?: string;
  createdAt?: Date;
  description?: string;
  id?: string;
  name?: string;
}
export const CustomDataIdentifierSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    description: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
  }),
).annotate({
  identifier: "CustomDataIdentifierSummary",
}) as any as S.Schema<CustomDataIdentifierSummary>;
export type __listOfCustomDataIdentifierSummary = CustomDataIdentifierSummary[];
export const __listOfCustomDataIdentifierSummary = /*@__PURE__*/ S.Array(
  CustomDataIdentifierSummary,
);
export interface ListCustomDataIdentifiersResponse {
  items?: CustomDataIdentifierSummary[];
  nextToken?: string;
}
export const ListCustomDataIdentifiersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(__listOfCustomDataIdentifierSummary),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCustomDataIdentifiersResponse",
}) as any as S.Schema<ListCustomDataIdentifiersResponse>;
export interface ListFindingsRequest {
  findingCriteria?: FindingCriteria;
  maxResults?: number;
  nextToken?: string;
  sortCriteria?: SortCriteria;
}
export const ListFindingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    findingCriteria: S.optional(FindingCriteria),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    sortCriteria: S.optional(SortCriteria),
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
  identifier: "ListFindingsRequest",
}) as any as S.Schema<ListFindingsRequest>;
export interface ListFindingsResponse {
  findingIds?: string[];
  nextToken?: string;
}
export const ListFindingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    findingIds: S.optional(__listOf__string),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFindingsResponse",
}) as any as S.Schema<ListFindingsResponse>;
export interface ListFindingsFiltersRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListFindingsFiltersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/findingsfilters" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFindingsFiltersRequest",
}) as any as S.Schema<ListFindingsFiltersRequest>;
export interface FindingsFilterListItem {
  action?: FindingsFilterAction;
  arn?: string;
  id?: string;
  name?: string;
  tags?: { [key: string]: string | undefined };
}
export const FindingsFilterListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: S.optional(FindingsFilterAction),
    arn: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "FindingsFilterListItem",
}) as any as S.Schema<FindingsFilterListItem>;
export type __listOfFindingsFilterListItem = FindingsFilterListItem[];
export const __listOfFindingsFilterListItem = /*@__PURE__*/ S.Array(
  FindingsFilterListItem,
);
export interface ListFindingsFiltersResponse {
  findingsFilterListItems?: FindingsFilterListItem[];
  nextToken?: string;
}
export const ListFindingsFiltersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    findingsFilterListItems: S.optional(__listOfFindingsFilterListItem),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFindingsFiltersResponse",
}) as any as S.Schema<ListFindingsFiltersResponse>;
export interface ListInvitationsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListInvitationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
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
export type __listOfInvitation = Invitation[];
export const __listOfInvitation = /*@__PURE__*/ S.Array(Invitation);
export interface ListInvitationsResponse {
  invitations?: Invitation[];
  nextToken?: string;
}
export const ListInvitationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    invitations: S.optional(__listOfInvitation),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListInvitationsResponse",
}) as any as S.Schema<ListInvitationsResponse>;
export interface ListManagedDataIdentifiersRequest {
  nextToken?: string;
}
export const ListManagedDataIdentifiersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/managed-data-identifiers/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListManagedDataIdentifiersRequest",
}) as any as S.Schema<ListManagedDataIdentifiersRequest>;
export interface ManagedDataIdentifierSummary {
  category?: SensitiveDataItemCategory;
  id?: string;
}
export const ManagedDataIdentifierSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    category: S.optional(SensitiveDataItemCategory),
    id: S.optional(S.String),
  }),
).annotate({
  identifier: "ManagedDataIdentifierSummary",
}) as any as S.Schema<ManagedDataIdentifierSummary>;
export type __listOfManagedDataIdentifierSummary =
  ManagedDataIdentifierSummary[];
export const __listOfManagedDataIdentifierSummary = /*@__PURE__*/ S.Array(
  ManagedDataIdentifierSummary,
);
export interface ListManagedDataIdentifiersResponse {
  items?: ManagedDataIdentifierSummary[];
  nextToken?: string;
}
export const ListManagedDataIdentifiersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(__listOfManagedDataIdentifierSummary),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListManagedDataIdentifiersResponse",
}) as any as S.Schema<ListManagedDataIdentifiersResponse>;
export interface ListMembersRequest {
  maxResults?: number;
  nextToken?: string;
  onlyAssociated?: string;
}
export const ListMembersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    onlyAssociated: S.optional(S.String).pipe(T.HttpQuery("onlyAssociated")),
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
export interface Member {
  accountId?: string;
  administratorAccountId?: string;
  arn?: string;
  email?: string;
  invitedAt?: Date;
  masterAccountId?: string;
  relationshipStatus?: RelationshipStatus;
  tags?: { [key: string]: string | undefined };
  updatedAt?: Date;
}
export const Member = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    administratorAccountId: S.optional(S.String),
    arn: S.optional(S.String),
    email: S.optional(S.String),
    invitedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    masterAccountId: S.optional(S.String),
    relationshipStatus: S.optional(RelationshipStatus),
    tags: S.optional(TagMap),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "Member" }) as any as S.Schema<Member>;
export type __listOfMember = Member[];
export const __listOfMember = /*@__PURE__*/ S.Array(Member);
export interface ListMembersResponse {
  members?: Member[];
  nextToken?: string;
}
export const ListMembersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    members: S.optional(__listOfMember),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMembersResponse",
}) as any as S.Schema<ListMembersResponse>;
export interface ListOrganizationAdminAccountsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListOrganizationAdminAccountsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/admin" }),
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
export type AdminStatus = "ENABLED" | "DISABLING_IN_PROGRESS" | (string & {});
export const AdminStatus = S.String;

export interface AdminAccount {
  accountId?: string;
  status?: AdminStatus;
}
export const AdminAccount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    status: S.optional(AdminStatus),
  }),
).annotate({ identifier: "AdminAccount" }) as any as S.Schema<AdminAccount>;
export type __listOfAdminAccount = AdminAccount[];
export const __listOfAdminAccount = /*@__PURE__*/ S.Array(AdminAccount);
export interface ListOrganizationAdminAccountsResponse {
  adminAccounts?: AdminAccount[];
  nextToken?: string;
}
export const ListOrganizationAdminAccountsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      adminAccounts: S.optional(__listOfAdminAccount),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListOrganizationAdminAccountsResponse",
}) as any as S.Schema<ListOrganizationAdminAccountsResponse>;
export interface ListResourceProfileArtifactsRequest {
  nextToken?: string;
  resourceArn?: string;
}
export const ListResourceProfileArtifactsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    resourceArn: S.optional(S.String).pipe(T.HttpQuery("resourceArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/resource-profiles/artifacts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListResourceProfileArtifactsRequest",
}) as any as S.Schema<ListResourceProfileArtifactsRequest>;
export interface ResourceProfileArtifact {
  arn?: string;
  classificationResultStatus?: string;
  sensitive?: boolean;
}
export const ResourceProfileArtifact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    classificationResultStatus: S.optional(S.String),
    sensitive: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ResourceProfileArtifact",
}) as any as S.Schema<ResourceProfileArtifact>;
export type __listOfResourceProfileArtifact = ResourceProfileArtifact[];
export const __listOfResourceProfileArtifact = /*@__PURE__*/ S.Array(
  ResourceProfileArtifact,
);
export interface ListResourceProfileArtifactsResponse {
  artifacts?: (ResourceProfileArtifact & {
    arn: string;
    classificationResultStatus: string;
  })[];
  nextToken?: string;
}
export const ListResourceProfileArtifactsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      artifacts: S.optional(__listOfResourceProfileArtifact),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListResourceProfileArtifactsResponse",
}) as any as S.Schema<ListResourceProfileArtifactsResponse>;
export interface ListResourceProfileDetectionsRequest {
  maxResults?: number;
  nextToken?: string;
  resourceArn?: string;
}
export const ListResourceProfileDetectionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      resourceArn: S.optional(S.String).pipe(T.HttpQuery("resourceArn")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/resource-profiles/detections" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListResourceProfileDetectionsRequest",
}) as any as S.Schema<ListResourceProfileDetectionsRequest>;
export type DataIdentifierType = "CUSTOM" | "MANAGED" | (string & {});
export const DataIdentifierType = S.String;

export interface Detection {
  arn?: string;
  count?: number;
  id?: string;
  name?: string;
  suppressed?: boolean;
  type?: DataIdentifierType;
}
export const Detection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    count: S.optional(S.Number),
    id: S.optional(S.String),
    name: S.optional(S.String),
    suppressed: S.optional(S.Boolean),
    type: S.optional(DataIdentifierType),
  }),
).annotate({ identifier: "Detection" }) as any as S.Schema<Detection>;
export type __listOfDetection = Detection[];
export const __listOfDetection = /*@__PURE__*/ S.Array(Detection);
export interface ListResourceProfileDetectionsResponse {
  detections?: Detection[];
  nextToken?: string;
}
export const ListResourceProfileDetectionsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      detections: S.optional(__listOfDetection),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListResourceProfileDetectionsResponse",
}) as any as S.Schema<ListResourceProfileDetectionsResponse>;
export interface ListSensitivityInspectionTemplatesRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListSensitivityInspectionTemplatesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/templates/sensitivity-inspections" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListSensitivityInspectionTemplatesRequest",
  }) as any as S.Schema<ListSensitivityInspectionTemplatesRequest>;
export interface SensitivityInspectionTemplatesEntry {
  id?: string;
  name?: string;
}
export const SensitivityInspectionTemplatesEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String), name: S.optional(S.String) }),
).annotate({
  identifier: "SensitivityInspectionTemplatesEntry",
}) as any as S.Schema<SensitivityInspectionTemplatesEntry>;
export type __listOfSensitivityInspectionTemplatesEntry =
  SensitivityInspectionTemplatesEntry[];
export const __listOfSensitivityInspectionTemplatesEntry =
  /*@__PURE__*/ S.Array(SensitivityInspectionTemplatesEntry);
export interface ListSensitivityInspectionTemplatesResponse {
  nextToken?: string;
  sensitivityInspectionTemplates?: SensitivityInspectionTemplatesEntry[];
}
export const ListSensitivityInspectionTemplatesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      nextToken: S.optional(S.String),
      sensitivityInspectionTemplates: S.optional(
        __listOfSensitivityInspectionTemplatesEntry,
      ),
    }),
  ).annotate({
    identifier: "ListSensitivityInspectionTemplatesResponse",
  }) as any as S.Schema<ListSensitivityInspectionTemplatesResponse>;
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
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PutClassificationExportConfigurationRequest {
  configuration?: ClassificationExportConfiguration;
}
export const PutClassificationExportConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      configuration: S.optional(ClassificationExportConfiguration),
    }).pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/classification-export-configuration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "PutClassificationExportConfigurationRequest",
  }) as any as S.Schema<PutClassificationExportConfigurationRequest>;
export interface PutClassificationExportConfigurationResponse {
  configuration?: ClassificationExportConfiguration & {
    s3Destination: S3Destination & { bucketName: string; kmsKeyArn: string };
  };
}
export const PutClassificationExportConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ configuration: S.optional(ClassificationExportConfiguration) }),
  ).annotate({
    identifier: "PutClassificationExportConfigurationResponse",
  }) as any as S.Schema<PutClassificationExportConfigurationResponse>;
export interface PutFindingsPublicationConfigurationRequest {
  clientToken?: string;
  securityHubConfiguration?: SecurityHubConfiguration;
}
export const PutFindingsPublicationConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      securityHubConfiguration: S.optional(SecurityHubConfiguration),
    }).pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/findings-publication-configuration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "PutFindingsPublicationConfigurationRequest",
  }) as any as S.Schema<PutFindingsPublicationConfigurationRequest>;
export interface PutFindingsPublicationConfigurationResponse {}
export const PutFindingsPublicationConfigurationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "PutFindingsPublicationConfigurationResponse",
  }) as any as S.Schema<PutFindingsPublicationConfigurationResponse>;
export type SearchResourcesComparator = "EQ" | "NE" | (string & {});
export const SearchResourcesComparator = S.String;

export type SearchResourcesSimpleCriterionKey =
  | "ACCOUNT_ID"
  | "S3_BUCKET_NAME"
  | "S3_BUCKET_EFFECTIVE_PERMISSION"
  | "S3_BUCKET_SHARED_ACCESS"
  | "AUTOMATED_DISCOVERY_MONITORING_STATUS"
  | (string & {});
export const SearchResourcesSimpleCriterionKey = S.String;

export interface SearchResourcesSimpleCriterion {
  comparator?: SearchResourcesComparator;
  key?: SearchResourcesSimpleCriterionKey;
  values?: string[];
}
export const SearchResourcesSimpleCriterion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    comparator: S.optional(SearchResourcesComparator),
    key: S.optional(SearchResourcesSimpleCriterionKey),
    values: S.optional(__listOf__string),
  }),
).annotate({
  identifier: "SearchResourcesSimpleCriterion",
}) as any as S.Schema<SearchResourcesSimpleCriterion>;
export interface SearchResourcesTagCriterionPair {
  key?: string;
  value?: string;
}
export const SearchResourcesTagCriterionPair = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
).annotate({
  identifier: "SearchResourcesTagCriterionPair",
}) as any as S.Schema<SearchResourcesTagCriterionPair>;
export type __listOfSearchResourcesTagCriterionPair =
  SearchResourcesTagCriterionPair[];
export const __listOfSearchResourcesTagCriterionPair = /*@__PURE__*/ S.Array(
  SearchResourcesTagCriterionPair,
);
export interface SearchResourcesTagCriterion {
  comparator?: SearchResourcesComparator;
  tagValues?: SearchResourcesTagCriterionPair[];
}
export const SearchResourcesTagCriterion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    comparator: S.optional(SearchResourcesComparator),
    tagValues: S.optional(__listOfSearchResourcesTagCriterionPair),
  }),
).annotate({
  identifier: "SearchResourcesTagCriterion",
}) as any as S.Schema<SearchResourcesTagCriterion>;
export interface SearchResourcesCriteria {
  simpleCriterion?: SearchResourcesSimpleCriterion;
  tagCriterion?: SearchResourcesTagCriterion;
}
export const SearchResourcesCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    simpleCriterion: S.optional(SearchResourcesSimpleCriterion),
    tagCriterion: S.optional(SearchResourcesTagCriterion),
  }),
).annotate({
  identifier: "SearchResourcesCriteria",
}) as any as S.Schema<SearchResourcesCriteria>;
export type __listOfSearchResourcesCriteria = SearchResourcesCriteria[];
export const __listOfSearchResourcesCriteria = /*@__PURE__*/ S.Array(
  SearchResourcesCriteria,
);
export interface SearchResourcesCriteriaBlock {
  and?: SearchResourcesCriteria[];
}
export const SearchResourcesCriteriaBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ and: S.optional(__listOfSearchResourcesCriteria) }),
).annotate({
  identifier: "SearchResourcesCriteriaBlock",
}) as any as S.Schema<SearchResourcesCriteriaBlock>;
export interface SearchResourcesBucketCriteria {
  excludes?: SearchResourcesCriteriaBlock;
  includes?: SearchResourcesCriteriaBlock;
}
export const SearchResourcesBucketCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    excludes: S.optional(SearchResourcesCriteriaBlock),
    includes: S.optional(SearchResourcesCriteriaBlock),
  }),
).annotate({
  identifier: "SearchResourcesBucketCriteria",
}) as any as S.Schema<SearchResourcesBucketCriteria>;
export type SearchResourcesSortAttributeName =
  | "ACCOUNT_ID"
  | "RESOURCE_NAME"
  | "S3_CLASSIFIABLE_OBJECT_COUNT"
  | "S3_CLASSIFIABLE_SIZE_IN_BYTES"
  | (string & {});
export const SearchResourcesSortAttributeName = S.String;

export interface SearchResourcesSortCriteria {
  attributeName?: SearchResourcesSortAttributeName;
  orderBy?: OrderBy;
}
export const SearchResourcesSortCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attributeName: S.optional(SearchResourcesSortAttributeName),
    orderBy: S.optional(OrderBy),
  }),
).annotate({
  identifier: "SearchResourcesSortCriteria",
}) as any as S.Schema<SearchResourcesSortCriteria>;
export interface SearchResourcesRequest {
  bucketCriteria?: SearchResourcesBucketCriteria;
  maxResults?: number;
  nextToken?: string;
  sortCriteria?: SearchResourcesSortCriteria;
}
export const SearchResourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucketCriteria: S.optional(SearchResourcesBucketCriteria),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    sortCriteria: S.optional(SearchResourcesSortCriteria),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/datasources/search-resources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchResourcesRequest",
}) as any as S.Schema<SearchResourcesRequest>;
export interface MatchingBucket {
  accountId?: string;
  automatedDiscoveryMonitoringStatus?: AutomatedDiscoveryMonitoringStatus;
  bucketName?: string;
  classifiableObjectCount?: number;
  classifiableSizeInBytes?: number;
  errorCode?: BucketMetadataErrorCode;
  errorMessage?: string;
  jobDetails?: JobDetails;
  lastAutomatedDiscoveryTime?: Date;
  objectCount?: number;
  objectCountByEncryptionType?: ObjectCountByEncryptionType;
  sensitivityScore?: number;
  sizeInBytes?: number;
  sizeInBytesCompressed?: number;
  unclassifiableObjectCount?: ObjectLevelStatistics;
  unclassifiableObjectSizeInBytes?: ObjectLevelStatistics;
}
export const MatchingBucket = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    automatedDiscoveryMonitoringStatus: S.optional(
      AutomatedDiscoveryMonitoringStatus,
    ),
    bucketName: S.optional(S.String),
    classifiableObjectCount: S.optional(S.Number),
    classifiableSizeInBytes: S.optional(S.Number),
    errorCode: S.optional(BucketMetadataErrorCode),
    errorMessage: S.optional(S.String),
    jobDetails: S.optional(JobDetails),
    lastAutomatedDiscoveryTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    objectCount: S.optional(S.Number),
    objectCountByEncryptionType: S.optional(ObjectCountByEncryptionType),
    sensitivityScore: S.optional(S.Number),
    sizeInBytes: S.optional(S.Number),
    sizeInBytesCompressed: S.optional(S.Number),
    unclassifiableObjectCount: S.optional(ObjectLevelStatistics),
    unclassifiableObjectSizeInBytes: S.optional(ObjectLevelStatistics),
  }),
).annotate({ identifier: "MatchingBucket" }) as any as S.Schema<MatchingBucket>;
export interface MatchingResource {
  matchingBucket?: MatchingBucket;
}
export const MatchingResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ matchingBucket: S.optional(MatchingBucket) }),
).annotate({
  identifier: "MatchingResource",
}) as any as S.Schema<MatchingResource>;
export type __listOfMatchingResource = MatchingResource[];
export const __listOfMatchingResource = /*@__PURE__*/ S.Array(MatchingResource);
export interface SearchResourcesResponse {
  matchingResources?: MatchingResource[];
  nextToken?: string;
}
export const SearchResourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    matchingResources: S.optional(__listOfMatchingResource),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchResourcesResponse",
}) as any as S.Schema<SearchResourcesResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags?: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: S.optional(TagMap),
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
export interface TestCustomDataIdentifierRequest {
  ignoreWords?: string[];
  keywords?: string[];
  maximumMatchDistance?: number;
  regex?: string;
  sampleText?: string;
}
export const TestCustomDataIdentifierRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ignoreWords: S.optional(__listOf__string),
    keywords: S.optional(__listOf__string),
    maximumMatchDistance: S.optional(S.Number),
    regex: S.optional(S.String),
    sampleText: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/custom-data-identifiers/test" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TestCustomDataIdentifierRequest",
}) as any as S.Schema<TestCustomDataIdentifierRequest>;
export interface TestCustomDataIdentifierResponse {
  matchCount?: number;
}
export const TestCustomDataIdentifierResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ matchCount: S.optional(S.Number) }),
).annotate({
  identifier: "TestCustomDataIdentifierResponse",
}) as any as S.Schema<TestCustomDataIdentifierResponse>;
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys?: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: S.optional(__listOf__string).pipe(T.HttpQuery("tagKeys")),
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
export interface UpdateAllowListRequest {
  criteria?: AllowListCriteria;
  description?: string;
  id: string;
  name?: string;
}
export const UpdateAllowListRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    criteria: S.optional(AllowListCriteria),
    description: S.optional(S.String),
    id: S.String.pipe(T.HttpLabel("id")),
    name: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/allow-lists/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAllowListRequest",
}) as any as S.Schema<UpdateAllowListRequest>;
export interface UpdateAllowListResponse {
  arn?: string;
  id?: string;
}
export const UpdateAllowListResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.optional(S.String), id: S.optional(S.String) }),
).annotate({
  identifier: "UpdateAllowListResponse",
}) as any as S.Schema<UpdateAllowListResponse>;
export interface UpdateAutomatedDiscoveryConfigurationRequest {
  autoEnableOrganizationMembers?: AutoEnableMode;
  status?: AutomatedDiscoveryStatus;
}
export const UpdateAutomatedDiscoveryConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      autoEnableOrganizationMembers: S.optional(AutoEnableMode),
      status: S.optional(AutomatedDiscoveryStatus),
    }).pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/automated-discovery/configuration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateAutomatedDiscoveryConfigurationRequest",
  }) as any as S.Schema<UpdateAutomatedDiscoveryConfigurationRequest>;
export interface UpdateAutomatedDiscoveryConfigurationResponse {}
export const UpdateAutomatedDiscoveryConfigurationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "UpdateAutomatedDiscoveryConfigurationResponse",
  }) as any as S.Schema<UpdateAutomatedDiscoveryConfigurationResponse>;
export interface UpdateClassificationJobRequest {
  jobId: string;
  jobStatus?: JobStatus;
}
export const UpdateClassificationJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    jobStatus: S.optional(JobStatus),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/jobs/{jobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateClassificationJobRequest",
}) as any as S.Schema<UpdateClassificationJobRequest>;
export interface UpdateClassificationJobResponse {}
export const UpdateClassificationJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateClassificationJobResponse",
}) as any as S.Schema<UpdateClassificationJobResponse>;
export type ClassificationScopeUpdateOperation =
  | "ADD"
  | "REPLACE"
  | "REMOVE"
  | (string & {});
export const ClassificationScopeUpdateOperation = S.String;

export interface S3ClassificationScopeExclusionUpdate {
  bucketNames?: string[];
  operation?: ClassificationScopeUpdateOperation;
}
export const S3ClassificationScopeExclusionUpdate = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      bucketNames: S.optional(__listOfS3BucketName),
      operation: S.optional(ClassificationScopeUpdateOperation),
    }),
).annotate({
  identifier: "S3ClassificationScopeExclusionUpdate",
}) as any as S.Schema<S3ClassificationScopeExclusionUpdate>;
export interface S3ClassificationScopeUpdate {
  excludes?: S3ClassificationScopeExclusionUpdate;
}
export const S3ClassificationScopeUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ excludes: S.optional(S3ClassificationScopeExclusionUpdate) }),
).annotate({
  identifier: "S3ClassificationScopeUpdate",
}) as any as S.Schema<S3ClassificationScopeUpdate>;
export interface UpdateClassificationScopeRequest {
  id: string;
  s3?: S3ClassificationScopeUpdate;
}
export const UpdateClassificationScopeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    s3: S.optional(S3ClassificationScopeUpdate),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/classification-scopes/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateClassificationScopeRequest",
}) as any as S.Schema<UpdateClassificationScopeRequest>;
export interface UpdateClassificationScopeResponse {}
export const UpdateClassificationScopeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateClassificationScopeResponse",
}) as any as S.Schema<UpdateClassificationScopeResponse>;
export interface UpdateFindingsFilterRequest {
  action?: FindingsFilterAction;
  clientToken?: string;
  description?: string;
  findingCriteria?: FindingCriteria;
  id: string;
  name?: string;
  position?: number;
}
export const UpdateFindingsFilterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: S.optional(FindingsFilterAction),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    description: S.optional(S.String),
    findingCriteria: S.optional(FindingCriteria),
    id: S.String.pipe(T.HttpLabel("id")),
    name: S.optional(S.String),
    position: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/findingsfilters/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFindingsFilterRequest",
}) as any as S.Schema<UpdateFindingsFilterRequest>;
export interface UpdateFindingsFilterResponse {
  arn?: string;
  id?: string;
}
export const UpdateFindingsFilterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.optional(S.String), id: S.optional(S.String) }),
).annotate({
  identifier: "UpdateFindingsFilterResponse",
}) as any as S.Schema<UpdateFindingsFilterResponse>;
export interface UpdateMacieSessionRequest {
  findingPublishingFrequency?: FindingPublishingFrequency;
  status?: MacieStatus;
}
export const UpdateMacieSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    findingPublishingFrequency: S.optional(FindingPublishingFrequency),
    status: S.optional(MacieStatus),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/macie" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMacieSessionRequest",
}) as any as S.Schema<UpdateMacieSessionRequest>;
export interface UpdateMacieSessionResponse {}
export const UpdateMacieSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateMacieSessionResponse",
}) as any as S.Schema<UpdateMacieSessionResponse>;
export interface UpdateMemberSessionRequest {
  id: string;
  status?: MacieStatus;
}
export const UpdateMemberSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    status: S.optional(MacieStatus),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/macie/members/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMemberSessionRequest",
}) as any as S.Schema<UpdateMemberSessionRequest>;
export interface UpdateMemberSessionResponse {}
export const UpdateMemberSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateMemberSessionResponse",
}) as any as S.Schema<UpdateMemberSessionResponse>;
export interface UpdateOrganizationConfigurationRequest {
  autoEnable?: boolean;
}
export const UpdateOrganizationConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ autoEnable: S.optional(S.Boolean) }).pipe(
      T.all(
        T.Http({ method: "PATCH", uri: "/admin/configuration" }),
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
export interface UpdateResourceProfileRequest {
  resourceArn?: string;
  sensitivityScoreOverride?: number;
}
export const UpdateResourceProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.optional(S.String).pipe(T.HttpQuery("resourceArn")),
    sensitivityScoreOverride: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/resource-profiles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateResourceProfileRequest",
}) as any as S.Schema<UpdateResourceProfileRequest>;
export interface UpdateResourceProfileResponse {}
export const UpdateResourceProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateResourceProfileResponse",
}) as any as S.Schema<UpdateResourceProfileResponse>;
export interface SuppressDataIdentifier {
  id?: string;
  type?: DataIdentifierType;
}
export const SuppressDataIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String), type: S.optional(DataIdentifierType) }),
).annotate({
  identifier: "SuppressDataIdentifier",
}) as any as S.Schema<SuppressDataIdentifier>;
export type __listOfSuppressDataIdentifier = SuppressDataIdentifier[];
export const __listOfSuppressDataIdentifier = /*@__PURE__*/ S.Array(
  SuppressDataIdentifier,
);
export interface UpdateResourceProfileDetectionsRequest {
  resourceArn?: string;
  suppressDataIdentifiers?: SuppressDataIdentifier[];
}
export const UpdateResourceProfileDetectionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      resourceArn: S.optional(S.String).pipe(T.HttpQuery("resourceArn")),
      suppressDataIdentifiers: S.optional(__listOfSuppressDataIdentifier),
    }).pipe(
      T.all(
        T.Http({ method: "PATCH", uri: "/resource-profiles/detections" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateResourceProfileDetectionsRequest",
}) as any as S.Schema<UpdateResourceProfileDetectionsRequest>;
export interface UpdateResourceProfileDetectionsResponse {}
export const UpdateResourceProfileDetectionsResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateResourceProfileDetectionsResponse",
}) as any as S.Schema<UpdateResourceProfileDetectionsResponse>;
export interface UpdateRetrievalConfiguration {
  retrievalMode?: RetrievalMode;
  roleName?: string;
}
export const UpdateRetrievalConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    retrievalMode: S.optional(RetrievalMode),
    roleName: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateRetrievalConfiguration",
}) as any as S.Schema<UpdateRetrievalConfiguration>;
export interface UpdateRevealConfigurationRequest {
  configuration?: RevealConfiguration;
  retrievalConfiguration?: UpdateRetrievalConfiguration;
}
export const UpdateRevealConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuration: S.optional(RevealConfiguration),
    retrievalConfiguration: S.optional(UpdateRetrievalConfiguration),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/reveal-configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRevealConfigurationRequest",
}) as any as S.Schema<UpdateRevealConfigurationRequest>;
export interface UpdateRevealConfigurationResponse {
  configuration?: RevealConfiguration & { status: RevealStatus };
  retrievalConfiguration?: RetrievalConfiguration & {
    retrievalMode: RetrievalMode;
  };
}
export const UpdateRevealConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuration: S.optional(RevealConfiguration),
    retrievalConfiguration: S.optional(RetrievalConfiguration),
  }),
).annotate({
  identifier: "UpdateRevealConfigurationResponse",
}) as any as S.Schema<UpdateRevealConfigurationResponse>;
export interface UpdateSensitivityInspectionTemplateRequest {
  description?: string;
  excludes?: SensitivityInspectionTemplateExcludes;
  id: string;
  includes?: SensitivityInspectionTemplateIncludes;
}
export const UpdateSensitivityInspectionTemplateRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      description: S.optional(S.String),
      excludes: S.optional(SensitivityInspectionTemplateExcludes),
      id: S.String.pipe(T.HttpLabel("id")),
      includes: S.optional(SensitivityInspectionTemplateIncludes),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/templates/sensitivity-inspections/{id}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateSensitivityInspectionTemplateRequest",
  }) as any as S.Schema<UpdateSensitivityInspectionTemplateRequest>;
export interface UpdateSensitivityInspectionTemplateResponse {}
export const UpdateSensitivityInspectionTemplateResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "UpdateSensitivityInspectionTemplateResponse",
  }) as any as S.Schema<UpdateSensitivityInspectionTemplateResponse>;
export type AcceptInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Accepts an Amazon Macie membership invitation that was received from a specific account.
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
  operationName: "AcceptInvitation",
}));

export type BatchGetCustomDataIdentifiersError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about one or more custom data identifiers.
 */
export const batchGetCustomDataIdentifiers: API.OperationMethod<
  BatchGetCustomDataIdentifiersRequest,
  BatchGetCustomDataIdentifiersResponse,
  BatchGetCustomDataIdentifiersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetCustomDataIdentifiersRequest,
  output: BatchGetCustomDataIdentifiersResponse,
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
  operationName: "BatchGetCustomDataIdentifiers",
}));

export type BatchUpdateAutomatedDiscoveryAccountsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Changes the status of automated sensitive data discovery for one or more accounts.
 */
export const batchUpdateAutomatedDiscoveryAccounts: API.OperationMethod<
  BatchUpdateAutomatedDiscoveryAccountsRequest,
  BatchUpdateAutomatedDiscoveryAccountsResponse,
  BatchUpdateAutomatedDiscoveryAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchUpdateAutomatedDiscoveryAccountsRequest,
  output: BatchUpdateAutomatedDiscoveryAccountsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateAutomatedDiscoveryAccounts",
}));

export type CreateAllowListError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | MacieNotEnabled
  | CommonErrors;
/**
 * Creates and defines the settings for an allow list.
 */
export const createAllowList: API.OperationMethod<
  CreateAllowListRequest,
  CreateAllowListResponse,
  CreateAllowListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAllowListRequest,
  output: CreateAllowListResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    MacieNotEnabled,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAllowList",
}));

export type CreateClassificationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | MacieNotEnabled
  | CommonErrors;
/**
 * Creates and defines the settings for a classification job.
 */
export const createClassificationJob: API.OperationMethod<
  CreateClassificationJobRequest,
  CreateClassificationJobResponse,
  CreateClassificationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateClassificationJobRequest,
  output: CreateClassificationJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    MacieNotEnabled,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateClassificationJob",
}));

export type CreateCustomDataIdentifierError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | MacieNotEnabled
  | CommonErrors;
/**
 * Creates and defines the criteria and other settings for a custom data identifier.
 */
export const createCustomDataIdentifier: API.OperationMethod<
  CreateCustomDataIdentifierRequest,
  CreateCustomDataIdentifierResponse,
  CreateCustomDataIdentifierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCustomDataIdentifierRequest,
  output: CreateCustomDataIdentifierResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    MacieNotEnabled,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomDataIdentifier",
}));

export type CreateFindingsFilterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | MacieNotEnabled
  | CommonErrors;
/**
 * Creates and defines the criteria and other settings for a findings filter.
 */
export const createFindingsFilter: API.OperationMethod<
  CreateFindingsFilterRequest,
  CreateFindingsFilterResponse,
  CreateFindingsFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFindingsFilterRequest,
  output: CreateFindingsFilterResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    MacieNotEnabled,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFindingsFilter",
}));

export type CreateInvitationsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends an Amazon Macie membership invitation to one or more accounts.
 */
export const createInvitations: API.OperationMethod<
  CreateInvitationsRequest,
  CreateInvitationsResponse,
  CreateInvitationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateInvitationsRequest,
  output: CreateInvitationsResponse,
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
  operationName: "CreateInvitations",
}));

export type CreateMemberError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates an account with an Amazon Macie administrator account.
 */
export const createMember: API.OperationMethod<
  CreateMemberRequest,
  CreateMemberResponse,
  CreateMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMemberRequest,
  output: CreateMemberResponse,
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
  operationName: "CreateMember",
}));

export type CreateSampleFindingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates sample findings.
 */
export const createSampleFindings: API.OperationMethod<
  CreateSampleFindingsRequest,
  CreateSampleFindingsResponse,
  CreateSampleFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSampleFindingsRequest,
  output: CreateSampleFindingsResponse,
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
  operationName: "CreateSampleFindings",
}));

export type DeclineInvitationsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Declines Amazon Macie membership invitations that were received from specific accounts.
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
  operationName: "DeclineInvitations",
}));

export type DeleteAllowListError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an allow list.
 */
export const deleteAllowList: API.OperationMethod<
  DeleteAllowListRequest,
  DeleteAllowListResponse,
  DeleteAllowListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAllowListRequest,
  output: DeleteAllowListResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAllowList",
}));

export type DeleteCustomDataIdentifierError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Soft deletes a custom data identifier.
 */
export const deleteCustomDataIdentifier: API.OperationMethod<
  DeleteCustomDataIdentifierRequest,
  DeleteCustomDataIdentifierResponse,
  DeleteCustomDataIdentifierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCustomDataIdentifierRequest,
  output: DeleteCustomDataIdentifierResponse,
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
  operationName: "DeleteCustomDataIdentifier",
}));

export type DeleteFindingsFilterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a findings filter.
 */
export const deleteFindingsFilter: API.OperationMethod<
  DeleteFindingsFilterRequest,
  DeleteFindingsFilterResponse,
  DeleteFindingsFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFindingsFilterRequest,
  output: DeleteFindingsFilterResponse,
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
  operationName: "DeleteFindingsFilter",
}));

export type DeleteInvitationsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes Amazon Macie membership invitations that were received from specific accounts.
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
  operationName: "DeleteInvitations",
}));

export type DeleteMemberError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the association between an Amazon Macie administrator account and an account.
 */
export const deleteMember: API.OperationMethod<
  DeleteMemberRequest,
  DeleteMemberResponse,
  DeleteMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMemberRequest,
  output: DeleteMemberResponse,
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
  operationName: "DeleteMember",
}));

export type DescribeBucketsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves (queries) statistical data and other information about one or more S3 buckets that Amazon Macie monitors and analyzes for an account.
 */
export const describeBuckets: API.PaginatedOperationMethod<
  DescribeBucketsRequest,
  DescribeBucketsResponse,
  DescribeBucketsError,
  Credentials | HttpClient.HttpClient,
  BucketMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeBucketsRequest,
  output: DescribeBucketsResponse,
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
  operationName: "DescribeBuckets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "buckets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeClassificationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the status and settings for a classification job.
 */
export const describeClassificationJob: API.OperationMethod<
  DescribeClassificationJobRequest,
  DescribeClassificationJobResponse,
  DescribeClassificationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeClassificationJobRequest,
  output: DescribeClassificationJobResponse,
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
  operationName: "DescribeClassificationJob",
}));

export type DescribeOrganizationConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the Amazon Macie configuration settings for an organization in Organizations.
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
  operationName: "DescribeOrganizationConfiguration",
}));

export type DisableMacieError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disables Amazon Macie and deletes all settings and resources for a Macie account.
 */
export const disableMacie: API.OperationMethod<
  DisableMacieRequest,
  DisableMacieResponse,
  DisableMacieError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisableMacieRequest,
  output: DisableMacieResponse,
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
  operationName: "DisableMacie",
}));

export type DisableOrganizationAdminAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disables an account as the delegated Amazon Macie administrator account for an organization in Organizations.
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
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableOrganizationAdminAccount",
}));

export type DisassociateFromAdministratorAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a member account from its Amazon Macie administrator account.
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
  operationName: "DisassociateFromAdministratorAccount",
}));

export type DisassociateFromMasterAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * (Deprecated) Disassociates a member account from its Amazon Macie administrator account. This operation has been replaced by the DisassociateFromAdministratorAccount operation.
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
  operationName: "DisassociateFromMasterAccount",
}));

export type DisassociateMemberError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates an Amazon Macie administrator account from a member account.
 */
export const disassociateMember: API.OperationMethod<
  DisassociateMemberRequest,
  DisassociateMemberResponse,
  DisassociateMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateMemberRequest,
  output: DisassociateMemberResponse,
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
  operationName: "DisassociateMember",
}));

export type EnableMacieError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables Amazon Macie and specifies the configuration settings for a Macie account.
 */
export const enableMacie: API.OperationMethod<
  EnableMacieRequest,
  EnableMacieResponse,
  EnableMacieError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableMacieRequest,
  output: EnableMacieResponse,
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
  operationName: "EnableMacie",
}));

export type EnableOrganizationAdminAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Designates an account as the delegated Amazon Macie administrator account for an organization in Organizations.
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
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableOrganizationAdminAccount",
}));

export type GetAdministratorAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the Amazon Macie administrator account for an account.
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
  operationName: "GetAdministratorAccount",
}));

export type GetAllowListError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the settings and status of an allow list.
 */
export const getAllowList: API.OperationMethod<
  GetAllowListRequest,
  GetAllowListResponse,
  GetAllowListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAllowListRequest,
  output: GetAllowListResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAllowList",
}));

export type GetAutomatedDiscoveryConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the configuration settings and status of automated sensitive data discovery for an organization or standalone account.
 */
export const getAutomatedDiscoveryConfiguration: API.OperationMethod<
  GetAutomatedDiscoveryConfigurationRequest,
  GetAutomatedDiscoveryConfigurationResponse,
  GetAutomatedDiscoveryConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAutomatedDiscoveryConfigurationRequest,
  output: GetAutomatedDiscoveryConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutomatedDiscoveryConfiguration",
}));

export type GetBucketStatisticsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves (queries) aggregated statistical data about all the S3 buckets that Amazon Macie monitors and analyzes for an account.
 */
export const getBucketStatistics: API.OperationMethod<
  GetBucketStatisticsRequest,
  GetBucketStatisticsResponse,
  GetBucketStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBucketStatisticsRequest,
  output: GetBucketStatisticsResponse,
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
  operationName: "GetBucketStatistics",
}));

export type GetClassificationExportConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the configuration settings for storing data classification results.
 */
export const getClassificationExportConfiguration: API.OperationMethod<
  GetClassificationExportConfigurationRequest,
  GetClassificationExportConfigurationResponse,
  GetClassificationExportConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetClassificationExportConfigurationRequest,
  output: GetClassificationExportConfigurationResponse,
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
  operationName: "GetClassificationExportConfiguration",
}));

export type GetClassificationScopeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the classification scope settings for an account.
 */
export const getClassificationScope: API.OperationMethod<
  GetClassificationScopeRequest,
  GetClassificationScopeResponse,
  GetClassificationScopeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetClassificationScopeRequest,
  output: GetClassificationScopeResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClassificationScope",
}));

export type GetCustomDataIdentifierError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the criteria and other settings for a custom data identifier.
 */
export const getCustomDataIdentifier: API.OperationMethod<
  GetCustomDataIdentifierRequest,
  GetCustomDataIdentifierResponse,
  GetCustomDataIdentifierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCustomDataIdentifierRequest,
  output: GetCustomDataIdentifierResponse,
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
  operationName: "GetCustomDataIdentifier",
}));

export type GetFindingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of one or more findings.
 */
export const getFindings: API.OperationMethod<
  GetFindingsRequest,
  GetFindingsResponse,
  GetFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFindingsRequest,
  output: GetFindingsResponse,
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
  operationName: "GetFindings",
}));

export type GetFindingsFilterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the criteria and other settings for a findings filter.
 */
export const getFindingsFilter: API.OperationMethod<
  GetFindingsFilterRequest,
  GetFindingsFilterResponse,
  GetFindingsFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFindingsFilterRequest,
  output: GetFindingsFilterResponse,
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
  operationName: "GetFindingsFilter",
}));

export type GetFindingsPublicationConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the configuration settings for publishing findings to Security Hub.
 */
export const getFindingsPublicationConfiguration: API.OperationMethod<
  GetFindingsPublicationConfigurationRequest,
  GetFindingsPublicationConfigurationResponse,
  GetFindingsPublicationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFindingsPublicationConfigurationRequest,
  output: GetFindingsPublicationConfigurationResponse,
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
  operationName: "GetFindingsPublicationConfiguration",
}));

export type GetFindingStatisticsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves (queries) aggregated statistical data about findings.
 */
export const getFindingStatistics: API.OperationMethod<
  GetFindingStatisticsRequest,
  GetFindingStatisticsResponse,
  GetFindingStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFindingStatisticsRequest,
  output: GetFindingStatisticsResponse,
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
  operationName: "GetFindingStatistics",
}));

export type GetInvitationsCountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the count of Amazon Macie membership invitations that were received by an account.
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
  operationName: "GetInvitationsCount",
}));

export type GetMacieSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the status and configuration settings for an Amazon Macie account.
 */
export const getMacieSession: API.OperationMethod<
  GetMacieSessionRequest,
  GetMacieSessionResponse,
  GetMacieSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMacieSessionRequest,
  output: GetMacieSessionResponse,
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
  operationName: "GetMacieSession",
}));

export type GetMasterAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * (Deprecated) Retrieves information about the Amazon Macie administrator account for an account. This operation has been replaced by the GetAdministratorAccount operation.
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
  operationName: "GetMasterAccount",
}));

export type GetMemberError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an account that's associated with an Amazon Macie administrator account.
 */
export const getMember: API.OperationMethod<
  GetMemberRequest,
  GetMemberResponse,
  GetMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMemberRequest,
  output: GetMemberResponse,
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
  operationName: "GetMember",
}));

export type GetResourceProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves (queries) sensitive data discovery statistics and the sensitivity score for an S3 bucket.
 */
export const getResourceProfile: API.OperationMethod<
  GetResourceProfileRequest,
  GetResourceProfileResponse,
  GetResourceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourceProfileRequest,
  output: GetResourceProfileResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceProfile",
}));

export type GetRevealConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the status and configuration settings for retrieving occurrences of sensitive data reported by findings.
 */
export const getRevealConfiguration: API.OperationMethod<
  GetRevealConfigurationRequest,
  GetRevealConfigurationResponse,
  GetRevealConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRevealConfigurationRequest,
  output: GetRevealConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRevealConfiguration",
}));

export type GetSensitiveDataOccurrencesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Retrieves occurrences of sensitive data reported by a finding.
 */
export const getSensitiveDataOccurrences: API.OperationMethod<
  GetSensitiveDataOccurrencesRequest,
  GetSensitiveDataOccurrencesResponse,
  GetSensitiveDataOccurrencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSensitiveDataOccurrencesRequest,
  output: GetSensitiveDataOccurrencesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSensitiveDataOccurrences",
}));

export type GetSensitiveDataOccurrencesAvailabilityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Checks whether occurrences of sensitive data can be retrieved for a finding.
 */
export const getSensitiveDataOccurrencesAvailability: API.OperationMethod<
  GetSensitiveDataOccurrencesAvailabilityRequest,
  GetSensitiveDataOccurrencesAvailabilityResponse,
  GetSensitiveDataOccurrencesAvailabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSensitiveDataOccurrencesAvailabilityRequest,
  output: GetSensitiveDataOccurrencesAvailabilityResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSensitiveDataOccurrencesAvailability",
}));

export type GetSensitivityInspectionTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the settings for the sensitivity inspection template for an account.
 */
export const getSensitivityInspectionTemplate: API.OperationMethod<
  GetSensitivityInspectionTemplateRequest,
  GetSensitivityInspectionTemplateResponse,
  GetSensitivityInspectionTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSensitivityInspectionTemplateRequest,
  output: GetSensitivityInspectionTemplateResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSensitivityInspectionTemplate",
}));

export type GetUsageStatisticsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves (queries) quotas and aggregated usage data for one or more accounts.
 */
export const getUsageStatistics: API.PaginatedOperationMethod<
  GetUsageStatisticsRequest,
  GetUsageStatisticsResponse,
  GetUsageStatisticsError,
  Credentials | HttpClient.HttpClient,
  UsageRecord
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetUsageStatisticsRequest,
  output: GetUsageStatisticsResponse,
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
  operationName: "GetUsageStatistics",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "records",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetUsageTotalsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves (queries) aggregated usage data for an account.
 */
export const getUsageTotals: API.OperationMethod<
  GetUsageTotalsRequest,
  GetUsageTotalsResponse,
  GetUsageTotalsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUsageTotalsRequest,
  output: GetUsageTotalsResponse,
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
  operationName: "GetUsageTotals",
}));

export type ListAllowListsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a subset of information about all the allow lists for an account.
 */
export const listAllowLists: API.PaginatedOperationMethod<
  ListAllowListsRequest,
  ListAllowListsResponse,
  ListAllowListsError,
  Credentials | HttpClient.HttpClient,
  AllowListSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAllowListsRequest,
  output: ListAllowListsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAllowLists",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "allowLists",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutomatedDiscoveryAccountsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the status of automated sensitive data discovery for one or more accounts.
 */
export const listAutomatedDiscoveryAccounts: API.PaginatedOperationMethod<
  ListAutomatedDiscoveryAccountsRequest,
  ListAutomatedDiscoveryAccountsResponse,
  ListAutomatedDiscoveryAccountsError,
  Credentials | HttpClient.HttpClient,
  AutomatedDiscoveryAccount
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAutomatedDiscoveryAccountsRequest,
  output: ListAutomatedDiscoveryAccountsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutomatedDiscoveryAccounts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListClassificationJobsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a subset of information about one or more classification jobs.
 */
export const listClassificationJobs: API.PaginatedOperationMethod<
  ListClassificationJobsRequest,
  ListClassificationJobsResponse,
  ListClassificationJobsError,
  Credentials | HttpClient.HttpClient,
  JobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListClassificationJobsRequest,
  output: ListClassificationJobsResponse,
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
  operationName: "ListClassificationJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListClassificationScopesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a subset of information about the classification scope for an account.
 */
export const listClassificationScopes: API.PaginatedOperationMethod<
  ListClassificationScopesRequest,
  ListClassificationScopesResponse,
  ListClassificationScopesError,
  Credentials | HttpClient.HttpClient,
  ClassificationScopeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListClassificationScopesRequest,
  output: ListClassificationScopesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClassificationScopes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "classificationScopes",
  } as const,
})) as any;

export type ListCustomDataIdentifiersError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a subset of information about the custom data identifiers for an account.
 */
export const listCustomDataIdentifiers: API.PaginatedOperationMethod<
  ListCustomDataIdentifiersRequest,
  ListCustomDataIdentifiersResponse,
  ListCustomDataIdentifiersError,
  Credentials | HttpClient.HttpClient,
  CustomDataIdentifierSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCustomDataIdentifiersRequest,
  output: ListCustomDataIdentifiersResponse,
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
  operationName: "ListCustomDataIdentifiers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFindingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a subset of information about one or more findings.
 */
export const listFindings: API.PaginatedOperationMethod<
  ListFindingsRequest,
  ListFindingsResponse,
  ListFindingsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFindingsRequest,
  output: ListFindingsResponse,
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
  operationName: "ListFindings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findingIds",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFindingsFiltersError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a subset of information about all the findings filters for an account.
 */
export const listFindingsFilters: API.PaginatedOperationMethod<
  ListFindingsFiltersRequest,
  ListFindingsFiltersResponse,
  ListFindingsFiltersError,
  Credentials | HttpClient.HttpClient,
  FindingsFilterListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFindingsFiltersRequest,
  output: ListFindingsFiltersResponse,
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
  operationName: "ListFindingsFilters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findingsFilterListItems",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListInvitationsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about Amazon Macie membership invitations that were received by an account.
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
  operationName: "ListInvitations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "invitations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListManagedDataIdentifiersError = CommonErrors;
/**
 * Retrieves information about all the managed data identifiers that Amazon Macie currently provides.
 */
export const listManagedDataIdentifiers: API.PaginatedOperationMethod<
  ListManagedDataIdentifiersRequest,
  ListManagedDataIdentifiersResponse,
  ListManagedDataIdentifiersError,
  Credentials | HttpClient.HttpClient,
  ManagedDataIdentifierSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListManagedDataIdentifiersRequest,
  output: ListManagedDataIdentifiersResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedDataIdentifiers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
  } as const,
})) as any;

export type ListMembersError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the accounts that are associated with an Amazon Macie administrator account.
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
  operationName: "ListMembers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "members",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListOrganizationAdminAccountsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the delegated Amazon Macie administrator account for an organization in Organizations.
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
  operationName: "ListOrganizationAdminAccounts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "adminAccounts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResourceProfileArtifactsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about objects that Amazon Macie selected from an S3 bucket for automated sensitive data discovery.
 */
export const listResourceProfileArtifacts: API.PaginatedOperationMethod<
  ListResourceProfileArtifactsRequest,
  ListResourceProfileArtifactsResponse,
  ListResourceProfileArtifactsError,
  Credentials | HttpClient.HttpClient,
  ResourceProfileArtifact
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourceProfileArtifactsRequest,
  output: ListResourceProfileArtifactsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceProfileArtifacts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "artifacts",
  } as const,
})) as any;

export type ListResourceProfileDetectionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the types and amount of sensitive data that Amazon Macie found in an S3 bucket.
 */
export const listResourceProfileDetections: API.PaginatedOperationMethod<
  ListResourceProfileDetectionsRequest,
  ListResourceProfileDetectionsResponse,
  ListResourceProfileDetectionsError,
  Credentials | HttpClient.HttpClient,
  Detection
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourceProfileDetectionsRequest,
  output: ListResourceProfileDetectionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceProfileDetections",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "detections",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSensitivityInspectionTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a subset of information about the sensitivity inspection template for an account.
 */
export const listSensitivityInspectionTemplates: API.PaginatedOperationMethod<
  ListSensitivityInspectionTemplatesRequest,
  ListSensitivityInspectionTemplatesResponse,
  ListSensitivityInspectionTemplatesError,
  Credentials | HttpClient.HttpClient,
  SensitivityInspectionTemplatesEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSensitivityInspectionTemplatesRequest,
  output: ListSensitivityInspectionTemplatesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSensitivityInspectionTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sensitivityInspectionTemplates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = CommonErrors;
/**
 * Retrieves the tags (keys and values) that are associated with an Amazon Macie resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutClassificationExportConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates the configuration settings for storing data classification results.
 */
export const putClassificationExportConfiguration: API.OperationMethod<
  PutClassificationExportConfigurationRequest,
  PutClassificationExportConfigurationResponse,
  PutClassificationExportConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutClassificationExportConfigurationRequest,
  output: PutClassificationExportConfigurationResponse,
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
  operationName: "PutClassificationExportConfiguration",
}));

export type PutFindingsPublicationConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration settings for publishing findings to Security Hub.
 */
export const putFindingsPublicationConfiguration: API.OperationMethod<
  PutFindingsPublicationConfigurationRequest,
  PutFindingsPublicationConfigurationResponse,
  PutFindingsPublicationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutFindingsPublicationConfigurationRequest,
  output: PutFindingsPublicationConfigurationResponse,
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
  operationName: "PutFindingsPublicationConfiguration",
}));

export type SearchResourcesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves (queries) statistical data and other information about Amazon Web Services resources that Amazon Macie monitors and analyzes for an account.
 */
export const searchResources: API.PaginatedOperationMethod<
  SearchResourcesRequest,
  SearchResourcesResponse,
  SearchResourcesError,
  Credentials | HttpClient.HttpClient,
  MatchingResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchResourcesRequest,
  output: SearchResourcesResponse,
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
  operationName: "SearchResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "matchingResources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type TagResourceError = CommonErrors;
/**
 * Adds or updates one or more tags (keys and values) that are associated with an Amazon Macie resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TestCustomDataIdentifierError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Tests criteria for a custom data identifier.
 */
export const testCustomDataIdentifier: API.OperationMethod<
  TestCustomDataIdentifierRequest,
  TestCustomDataIdentifierResponse,
  TestCustomDataIdentifierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TestCustomDataIdentifierRequest,
  output: TestCustomDataIdentifierResponse,
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
  operationName: "TestCustomDataIdentifier",
}));

export type UntagResourceError = CommonErrors;
/**
 * Removes one or more tags (keys and values) from an Amazon Macie resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAllowListError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the settings for an allow list.
 */
export const updateAllowList: API.OperationMethod<
  UpdateAllowListRequest,
  UpdateAllowListResponse,
  UpdateAllowListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAllowListRequest,
  output: UpdateAllowListResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAllowList",
}));

export type UpdateAutomatedDiscoveryConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Changes the configuration settings and status of automated sensitive data discovery for an organization or standalone account.
 */
export const updateAutomatedDiscoveryConfiguration: API.OperationMethod<
  UpdateAutomatedDiscoveryConfigurationRequest,
  UpdateAutomatedDiscoveryConfigurationResponse,
  UpdateAutomatedDiscoveryConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAutomatedDiscoveryConfigurationRequest,
  output: UpdateAutomatedDiscoveryConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAutomatedDiscoveryConfiguration",
}));

export type UpdateClassificationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Changes the status of a classification job.
 */
export const updateClassificationJob: API.OperationMethod<
  UpdateClassificationJobRequest,
  UpdateClassificationJobResponse,
  UpdateClassificationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateClassificationJobRequest,
  output: UpdateClassificationJobResponse,
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
  operationName: "UpdateClassificationJob",
}));

export type UpdateClassificationScopeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the classification scope settings for an account.
 */
export const updateClassificationScope: API.OperationMethod<
  UpdateClassificationScopeRequest,
  UpdateClassificationScopeResponse,
  UpdateClassificationScopeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateClassificationScopeRequest,
  output: UpdateClassificationScopeResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateClassificationScope",
}));

export type UpdateFindingsFilterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the criteria and other settings for a findings filter.
 */
export const updateFindingsFilter: API.OperationMethod<
  UpdateFindingsFilterRequest,
  UpdateFindingsFilterResponse,
  UpdateFindingsFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFindingsFilterRequest,
  output: UpdateFindingsFilterResponse,
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
  operationName: "UpdateFindingsFilter",
}));

export type UpdateMacieSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Suspends or re-enables Amazon Macie, or updates the configuration settings for a Macie account.
 */
export const updateMacieSession: API.OperationMethod<
  UpdateMacieSessionRequest,
  UpdateMacieSessionResponse,
  UpdateMacieSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMacieSessionRequest,
  output: UpdateMacieSessionResponse,
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
  operationName: "UpdateMacieSession",
}));

export type UpdateMemberSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables an Amazon Macie administrator to suspend or re-enable Macie for a member account.
 */
export const updateMemberSession: API.OperationMethod<
  UpdateMemberSessionRequest,
  UpdateMemberSessionResponse,
  UpdateMemberSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMemberSessionRequest,
  output: UpdateMemberSessionResponse,
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
  operationName: "UpdateMemberSession",
}));

export type UpdateOrganizationConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the Amazon Macie configuration settings for an organization in Organizations.
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
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOrganizationConfiguration",
}));

export type UpdateResourceProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the sensitivity score for an S3 bucket.
 */
export const updateResourceProfile: API.OperationMethod<
  UpdateResourceProfileRequest,
  UpdateResourceProfileResponse,
  UpdateResourceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateResourceProfileRequest,
  output: UpdateResourceProfileResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResourceProfile",
}));

export type UpdateResourceProfileDetectionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the sensitivity scoring settings for an S3 bucket.
 */
export const updateResourceProfileDetections: API.OperationMethod<
  UpdateResourceProfileDetectionsRequest,
  UpdateResourceProfileDetectionsResponse,
  UpdateResourceProfileDetectionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateResourceProfileDetectionsRequest,
  output: UpdateResourceProfileDetectionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResourceProfileDetections",
}));

export type UpdateRevealConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the status and configuration settings for retrieving occurrences of sensitive data reported by findings.
 */
export const updateRevealConfiguration: API.OperationMethod<
  UpdateRevealConfigurationRequest,
  UpdateRevealConfigurationResponse,
  UpdateRevealConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRevealConfigurationRequest,
  output: UpdateRevealConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRevealConfiguration",
}));

export type UpdateSensitivityInspectionTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the settings for the sensitivity inspection template for an account.
 */
export const updateSensitivityInspectionTemplate: API.OperationMethod<
  UpdateSensitivityInspectionTemplateRequest,
  UpdateSensitivityInspectionTemplateResponse,
  UpdateSensitivityInspectionTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSensitivityInspectionTemplateRequest,
  output: UpdateSensitivityInspectionTemplateResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSensitivityInspectionTemplate",
}));
