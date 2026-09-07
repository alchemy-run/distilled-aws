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
  sdkId: "deadline",
  serviceShapeName: "Deadline",
});
const auth = T.AwsAuthSigv4({ name: "deadline" });
const ver = T.ServiceVersion("2023-10-12");
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
              `https://deadline-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://deadline-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://deadline.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://deadline.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
      context: S.optional(
        S.suspend(() => ExceptionContext).annotate({
          identifier: "ExceptionContext",
        }),
      ),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.suspend(() => ConflictExceptionReason).annotate({
        identifier: "ConflictExceptionReason",
      }),
      resourceId: S.String,
      resourceType: S.String,
      context: S.optional(
        S.suspend(() => ExceptionContext).annotate({
          identifier: "ExceptionContext",
        }),
      ),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
      context: S.optional(
        S.suspend(() => ExceptionContext).annotate({
          identifier: "ExceptionContext",
        }),
      ),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.suspend(() => ServiceQuotaExceededExceptionReason).annotate({
        identifier: "ServiceQuotaExceededExceptionReason",
      }),
      resourceType: S.String,
      serviceCode: S.String,
      quotaCode: S.String,
      resourceId: S.optional(S.String),
      context: S.optional(
        S.suspend(() => ExceptionContext).annotate({
          identifier: "ExceptionContext",
        }),
      ),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      serviceCode: S.optional(S.String),
      quotaCode: S.optional(S.String),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
      context: S.optional(
        S.suspend(() => ExceptionContext).annotate({
          identifier: "ExceptionContext",
        }),
      ),
    },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.suspend(() => ValidationExceptionReason).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
      context: S.optional(
        S.suspend(() => ExceptionContext).annotate({
          identifier: "ExceptionContext",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type FarmId = string;
export type DeadlinePrincipalType = "USER" | "GROUP" | (string & {});
export const DeadlinePrincipalType = /*@__PURE__*/ S.String;

export type IdentityStoreId = string;
export type MembershipLevel =
  | "VIEWER"
  | "CONTRIBUTOR"
  | "OWNER"
  | "MANAGER"
  | (string & {});
export const MembershipLevel = /*@__PURE__*/ S.String;

export type IdentityCenterPrincipalId = string;
export type Region = string;
export interface AssociateMemberToFarmRequest {
  farmId: string;
  principalType: DeadlinePrincipalType;
  identityStoreId: string;
  membershipLevel: MembershipLevel;
  principalId: string;
  identityCenterRegion?: string;
}
export const AssociateMemberToFarmRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    principalType: DeadlinePrincipalType,
    identityStoreId: S.String,
    membershipLevel: MembershipLevel,
    principalId: S.String.pipe(T.HttpLabel("principalId")),
    identityCenterRegion: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2023-10-12/farms/{farmId}/members/{principalId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateMemberToFarmRequest",
}) as any as S.Schema<AssociateMemberToFarmRequest>;
export interface AssociateMemberToFarmResponse {}
export const AssociateMemberToFarmResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateMemberToFarmResponse",
}) as any as S.Schema<AssociateMemberToFarmResponse>;
export type FleetId = string;
export interface AssociateMemberToFleetRequest {
  farmId: string;
  fleetId: string;
  principalType: DeadlinePrincipalType;
  identityStoreId: string;
  membershipLevel: MembershipLevel;
  principalId: string;
  identityCenterRegion?: string;
}
export const AssociateMemberToFleetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    fleetId: S.String.pipe(T.HttpLabel("fleetId")),
    principalType: DeadlinePrincipalType,
    identityStoreId: S.String,
    membershipLevel: MembershipLevel,
    principalId: S.String.pipe(T.HttpLabel("principalId")),
    identityCenterRegion: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/members/{principalId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateMemberToFleetRequest",
}) as any as S.Schema<AssociateMemberToFleetRequest>;
export interface AssociateMemberToFleetResponse {}
export const AssociateMemberToFleetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateMemberToFleetResponse",
}) as any as S.Schema<AssociateMemberToFleetResponse>;
export type QueueId = string;
export type JobId = string;
export interface AssociateMemberToJobRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  principalType: DeadlinePrincipalType;
  identityStoreId: string;
  membershipLevel: MembershipLevel;
  principalId: string;
  identityCenterRegion?: string;
}
export const AssociateMemberToJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    principalType: DeadlinePrincipalType,
    identityStoreId: S.String,
    membershipLevel: MembershipLevel,
    principalId: S.String.pipe(T.HttpLabel("principalId")),
    identityCenterRegion: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/members/{principalId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateMemberToJobRequest",
}) as any as S.Schema<AssociateMemberToJobRequest>;
export interface AssociateMemberToJobResponse {}
export const AssociateMemberToJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateMemberToJobResponse",
}) as any as S.Schema<AssociateMemberToJobResponse>;
export interface AssociateMemberToQueueRequest {
  farmId: string;
  queueId: string;
  principalType: DeadlinePrincipalType;
  identityStoreId: string;
  membershipLevel: MembershipLevel;
  principalId: string;
  identityCenterRegion?: string;
}
export const AssociateMemberToQueueRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    principalType: DeadlinePrincipalType,
    identityStoreId: S.String,
    membershipLevel: MembershipLevel,
    principalId: S.String.pipe(T.HttpLabel("principalId")),
    identityCenterRegion: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/members/{principalId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateMemberToQueueRequest",
}) as any as S.Schema<AssociateMemberToQueueRequest>;
export interface AssociateMemberToQueueResponse {}
export const AssociateMemberToQueueResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateMemberToQueueResponse",
}) as any as S.Schema<AssociateMemberToQueueResponse>;
export interface AssumeFleetRoleForReadRequest {
  farmId: string;
  fleetId: string;
}
export const AssumeFleetRoleForReadRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    fleetId: S.String.pipe(T.HttpLabel("fleetId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/read-roles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssumeFleetRoleForReadRequest",
}) as any as S.Schema<AssumeFleetRoleForReadRequest>;
export type AccessKeyId = string | redacted.Redacted<string>;
export type SecretAccessKey = string | redacted.Redacted<string>;
export type SessionToken = string | redacted.Redacted<string>;
export interface AwsCredentials {
  accessKeyId: string | redacted.Redacted<string>;
  secretAccessKey: string | redacted.Redacted<string>;
  sessionToken: string | redacted.Redacted<string>;
  expiration: Date;
}
export const AwsCredentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessKeyId: SensitiveString,
    secretAccessKey: SensitiveString,
    sessionToken: SensitiveString,
    expiration: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({ identifier: "AwsCredentials" }) as any as S.Schema<AwsCredentials>;
export interface AssumeFleetRoleForReadResponse {
  credentials: AwsCredentials;
}
export const AssumeFleetRoleForReadResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ credentials: AwsCredentials }),
).annotate({
  identifier: "AssumeFleetRoleForReadResponse",
}) as any as S.Schema<AssumeFleetRoleForReadResponse>;
export type WorkerId = string;
export interface AssumeFleetRoleForWorkerRequest {
  farmId: string;
  fleetId: string;
  workerId: string;
}
export const AssumeFleetRoleForWorkerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    fleetId: S.String.pipe(T.HttpLabel("fleetId")),
    workerId: S.String.pipe(T.HttpLabel("workerId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/workers/{workerId}/fleet-roles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssumeFleetRoleForWorkerRequest",
}) as any as S.Schema<AssumeFleetRoleForWorkerRequest>;
export interface AssumeFleetRoleForWorkerResponse {
  credentials: AwsCredentials;
}
export const AssumeFleetRoleForWorkerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ credentials: AwsCredentials }),
).annotate({
  identifier: "AssumeFleetRoleForWorkerResponse",
}) as any as S.Schema<AssumeFleetRoleForWorkerResponse>;
export interface AssumeQueueRoleForReadRequest {
  farmId: string;
  queueId: string;
}
export const AssumeQueueRoleForReadRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/read-roles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssumeQueueRoleForReadRequest",
}) as any as S.Schema<AssumeQueueRoleForReadRequest>;
export interface AssumeQueueRoleForReadResponse {
  credentials: AwsCredentials;
}
export const AssumeQueueRoleForReadResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ credentials: AwsCredentials }),
).annotate({
  identifier: "AssumeQueueRoleForReadResponse",
}) as any as S.Schema<AssumeQueueRoleForReadResponse>;
export interface AssumeQueueRoleForUserRequest {
  farmId: string;
  queueId: string;
}
export const AssumeQueueRoleForUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/user-roles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssumeQueueRoleForUserRequest",
}) as any as S.Schema<AssumeQueueRoleForUserRequest>;
export interface AssumeQueueRoleForUserResponse {
  credentials: AwsCredentials;
}
export const AssumeQueueRoleForUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ credentials: AwsCredentials }),
).annotate({
  identifier: "AssumeQueueRoleForUserResponse",
}) as any as S.Schema<AssumeQueueRoleForUserResponse>;
export interface AssumeQueueRoleForWorkerRequest {
  farmId: string;
  fleetId: string;
  workerId: string;
  queueId: string;
}
export const AssumeQueueRoleForWorkerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    fleetId: S.String.pipe(T.HttpLabel("fleetId")),
    workerId: S.String.pipe(T.HttpLabel("workerId")),
    queueId: S.String.pipe(T.HttpQuery("queueId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/workers/{workerId}/queue-roles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssumeQueueRoleForWorkerRequest",
}) as any as S.Schema<AssumeQueueRoleForWorkerRequest>;
export interface AssumeQueueRoleForWorkerResponse {
  credentials?: AwsCredentials;
}
export const AssumeQueueRoleForWorkerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ credentials: S.optional(AwsCredentials) }),
).annotate({
  identifier: "AssumeQueueRoleForWorkerResponse",
}) as any as S.Schema<AssumeQueueRoleForWorkerResponse>;
export interface BatchGetJobIdentifier {
  farmId: string;
  queueId: string;
  jobId: string;
}
export const BatchGetJobIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ farmId: S.String, queueId: S.String, jobId: S.String }),
).annotate({
  identifier: "BatchGetJobIdentifier",
}) as any as S.Schema<BatchGetJobIdentifier>;
export type BatchGetJobIdentifiers = BatchGetJobIdentifier[];
export const BatchGetJobIdentifiers = /*@__PURE__*/ S.Array(
  BatchGetJobIdentifier,
);
export interface BatchGetJobRequest {
  identifiers: BatchGetJobIdentifier[];
}
export const BatchGetJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifiers: BatchGetJobIdentifiers }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2023-10-12/batch-get-job" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetJobRequest",
}) as any as S.Schema<BatchGetJobRequest>;
export type JobName = string;
export type JobLifecycleStatus =
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "CREATE_COMPLETE"
  | "UPLOAD_IN_PROGRESS"
  | "UPLOAD_FAILED"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_FAILED"
  | "UPDATE_SUCCEEDED"
  | "ARCHIVED"
  | (string & {});
export const JobLifecycleStatus = /*@__PURE__*/ S.String;

export type JobPriority = number;
export type CreatedAt = Date;
export type CreatedBy = string;
export type UpdatedAt = Date;
export type UpdatedBy = string;
export type StartedAt = Date;
export type EndedAt = Date;
export type TaskRunStatus =
  | "PENDING"
  | "READY"
  | "ASSIGNED"
  | "STARTING"
  | "SCHEDULED"
  | "INTERRUPTING"
  | "RUNNING"
  | "SUSPENDED"
  | "CANCELED"
  | "FAILED"
  | "SUCCEEDED"
  | "NOT_COMPATIBLE"
  | (string & {});
export const TaskRunStatus = /*@__PURE__*/ S.String;

export type JobTargetTaskRunStatus =
  | "READY"
  | "FAILED"
  | "SUCCEEDED"
  | "CANCELED"
  | "SUSPENDED"
  | "PENDING"
  | (string & {});
export const JobTargetTaskRunStatus = /*@__PURE__*/ S.String;

export type TaskRunStatusCounts = { [key in TaskRunStatus]?: number };
export const TaskRunStatusCounts = /*@__PURE__*/ S.Record(
  TaskRunStatus,
  S.Number.pipe(S.optional),
);
export type TaskFailureRetryCount = number;
export type StorageProfileId = string;
export type MaxFailedTasksCount = number;
export type MaxRetriesPerTask = number;
export type IntString = string;
export type FloatString = string;
export type ParameterString = string;
export type PathString = string;
export type JobParameter =
  | { int: string; float?: never; string?: never; path?: never }
  | { int?: never; float: string; string?: never; path?: never }
  | { int?: never; float?: never; string: string; path?: never }
  | { int?: never; float?: never; string?: never; path: string };
export const JobParameter = /*@__PURE__*/ S.Union([
  S.Struct({ int: S.String }),
  S.Struct({ float: S.String }),
  S.Struct({ string: S.String }),
  S.Struct({ path: S.String }),
]);
export type JobParameters = { [key: string]: JobParameter | undefined };
export const JobParameters = /*@__PURE__*/ S.Record(
  S.String,
  JobParameter.pipe(S.optional),
);
export type FileSystemLocationName = string;
export type PathFormat = "windows" | "posix" | (string & {});
export const PathFormat = /*@__PURE__*/ S.String;

export type OutputRelativeDirectoriesList = string[];
export const OutputRelativeDirectoriesList = /*@__PURE__*/ S.Array(S.String);
export interface ManifestProperties {
  fileSystemLocationName?: string;
  rootPath: string;
  rootPathFormat: PathFormat;
  outputRelativeDirectories?: string[];
  inputManifestPath?: string;
  inputManifestHash?: string;
}
export const ManifestProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fileSystemLocationName: S.optional(S.String),
    rootPath: S.String,
    rootPathFormat: PathFormat,
    outputRelativeDirectories: S.optional(OutputRelativeDirectoriesList),
    inputManifestPath: S.optional(S.String),
    inputManifestHash: S.optional(S.String),
  }),
).annotate({
  identifier: "ManifestProperties",
}) as any as S.Schema<ManifestProperties>;
export type ManifestPropertiesList = ManifestProperties[];
export const ManifestPropertiesList = /*@__PURE__*/ S.Array(ManifestProperties);
export type JobAttachmentsFileSystem = "COPIED" | "VIRTUAL" | (string & {});
export const JobAttachmentsFileSystem = /*@__PURE__*/ S.String;

export interface Attachments {
  manifests: ManifestProperties[];
  fileSystem?: JobAttachmentsFileSystem;
}
export const Attachments = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    manifests: ManifestPropertiesList,
    fileSystem: S.optional(JobAttachmentsFileSystem),
  }),
).annotate({ identifier: "Attachments" }) as any as S.Schema<Attachments>;
export type JobDescription = string | redacted.Redacted<string>;
export type MaxWorkerCount = number;
export interface BatchGetJobItem {
  farmId: string;
  queueId: string;
  jobId: string;
  name: string;
  lifecycleStatus: JobLifecycleStatus;
  lifecycleStatusMessage: string;
  priority: number;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  startedAt?: Date;
  endedAt?: Date;
  taskRunStatus?: TaskRunStatus;
  targetTaskRunStatus?: JobTargetTaskRunStatus;
  taskRunStatusCounts?: { [key: string]: number | undefined };
  taskFailureRetryCount?: number;
  storageProfileId?: string;
  maxFailedTasksCount?: number;
  maxRetriesPerTask?: number;
  parameters?: { [key: string]: JobParameter | undefined };
  attachments?: Attachments;
  description?: string | redacted.Redacted<string>;
  maxWorkerCount?: number;
  sourceJobId?: string;
}
export const BatchGetJobItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    queueId: S.String,
    jobId: S.String,
    name: S.String,
    lifecycleStatus: JobLifecycleStatus,
    lifecycleStatusMessage: S.String,
    priority: S.Number,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    startedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    taskRunStatus: S.optional(TaskRunStatus),
    targetTaskRunStatus: S.optional(JobTargetTaskRunStatus),
    taskRunStatusCounts: S.optional(TaskRunStatusCounts),
    taskFailureRetryCount: S.optional(S.Number),
    storageProfileId: S.optional(S.String),
    maxFailedTasksCount: S.optional(S.Number),
    maxRetriesPerTask: S.optional(S.Number),
    parameters: S.optional(JobParameters),
    attachments: S.optional(Attachments),
    description: S.optional(SensitiveString),
    maxWorkerCount: S.optional(S.Number),
    sourceJobId: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchGetJobItem",
}) as any as S.Schema<BatchGetJobItem>;
export type BatchGetJobItems = BatchGetJobItem[];
export const BatchGetJobItems = /*@__PURE__*/ S.Array(BatchGetJobItem);
export type BatchGetJobErrorCode =
  | "InternalServerErrorException"
  | "ResourceNotFoundException"
  | "ValidationException"
  | "AccessDeniedException"
  | "ThrottlingException"
  | (string & {});
export const BatchGetJobErrorCode = /*@__PURE__*/ S.String;

export interface BatchGetJobError_ {
  farmId: string;
  queueId: string;
  jobId: string;
  code: BatchGetJobErrorCode;
  message: string;
}
export const BatchGetJobError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    queueId: S.String,
    jobId: S.String,
    code: BatchGetJobErrorCode,
    message: S.String,
  }),
).annotate({
  identifier: "BatchGetJobError",
}) as any as S.Schema<BatchGetJobError_>;
export type BatchGetJobErrors = BatchGetJobError_[];
export const BatchGetJobErrors = /*@__PURE__*/ S.Array(BatchGetJobError_);
export interface BatchGetJobResponse {
  jobs: BatchGetJobItem[];
  errors: BatchGetJobError_[];
}
export const BatchGetJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobs: BatchGetJobItems, errors: BatchGetJobErrors }),
).annotate({
  identifier: "BatchGetJobResponse",
}) as any as S.Schema<BatchGetJobResponse>;
export interface JobDetailsIdentifiers {
  jobId: string;
}
export const JobDetailsIdentifiers = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String }),
).annotate({
  identifier: "JobDetailsIdentifiers",
}) as any as S.Schema<JobDetailsIdentifiers>;
export interface JobAttachmentDetailsIdentifiers {
  jobId: string;
}
export const JobAttachmentDetailsIdentifiers = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String }),
).annotate({
  identifier: "JobAttachmentDetailsIdentifiers",
}) as any as S.Schema<JobAttachmentDetailsIdentifiers>;
export type StepId = string;
export interface StepDetailsIdentifiers {
  jobId: string;
  stepId: string;
}
export const StepDetailsIdentifiers = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String, stepId: S.String }),
).annotate({
  identifier: "StepDetailsIdentifiers",
}) as any as S.Schema<StepDetailsIdentifiers>;
export type EnvironmentId = string;
export interface EnvironmentDetailsIdentifiers {
  jobId: string;
  environmentId: string;
}
export const EnvironmentDetailsIdentifiers = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String, environmentId: S.String }),
).annotate({
  identifier: "EnvironmentDetailsIdentifiers",
}) as any as S.Schema<EnvironmentDetailsIdentifiers>;
export type JobEntityIdentifiersUnion =
  | {
      jobDetails: JobDetailsIdentifiers;
      jobAttachmentDetails?: never;
      stepDetails?: never;
      environmentDetails?: never;
    }
  | {
      jobDetails?: never;
      jobAttachmentDetails: JobAttachmentDetailsIdentifiers;
      stepDetails?: never;
      environmentDetails?: never;
    }
  | {
      jobDetails?: never;
      jobAttachmentDetails?: never;
      stepDetails: StepDetailsIdentifiers;
      environmentDetails?: never;
    }
  | {
      jobDetails?: never;
      jobAttachmentDetails?: never;
      stepDetails?: never;
      environmentDetails: EnvironmentDetailsIdentifiers;
    };
export const JobEntityIdentifiersUnion = /*@__PURE__*/ S.Union([
  S.Struct({ jobDetails: JobDetailsIdentifiers }),
  S.Struct({ jobAttachmentDetails: JobAttachmentDetailsIdentifiers }),
  S.Struct({ stepDetails: StepDetailsIdentifiers }),
  S.Struct({ environmentDetails: EnvironmentDetailsIdentifiers }),
]);
export type JobEntityIdentifiers = JobEntityIdentifiersUnion[];
export const JobEntityIdentifiers = /*@__PURE__*/ S.Array(
  JobEntityIdentifiersUnion,
);
export interface BatchGetJobEntityRequest {
  farmId: string;
  fleetId: string;
  workerId: string;
  identifiers: JobEntityIdentifiersUnion[];
}
export const BatchGetJobEntityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    fleetId: S.String.pipe(T.HttpLabel("fleetId")),
    workerId: S.String.pipe(T.HttpLabel("workerId")),
    identifiers: JobEntityIdentifiers,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/workers/{workerId}/batchGetJobEntity",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetJobEntityRequest",
}) as any as S.Schema<BatchGetJobEntityRequest>;
export type S3BucketName = string;
export type S3Prefix = string;
export interface JobAttachmentSettings {
  s3BucketName: string;
  rootPrefix: string;
}
export const JobAttachmentSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3BucketName: S.String, rootPrefix: S.String }),
).annotate({
  identifier: "JobAttachmentSettings",
}) as any as S.Schema<JobAttachmentSettings>;
export interface PosixUser {
  user: string;
  group: string;
}
export const PosixUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ user: S.String, group: S.String }),
).annotate({ identifier: "PosixUser" }) as any as S.Schema<PosixUser>;
export interface WindowsUser {
  user: string;
  passwordArn: string;
}
export const WindowsUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ user: S.String, passwordArn: S.String }),
).annotate({ identifier: "WindowsUser" }) as any as S.Schema<WindowsUser>;
export type RunAs =
  | "QUEUE_CONFIGURED_USER"
  | "WORKER_AGENT_USER"
  | (string & {});
export const RunAs = /*@__PURE__*/ S.String;

export interface JobRunAsUser {
  posix?: PosixUser;
  windows?: WindowsUser;
  runAs: RunAs;
}
export const JobRunAsUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    posix: S.optional(PosixUser),
    windows: S.optional(WindowsUser),
    runAs: RunAs,
  }),
).annotate({ identifier: "JobRunAsUser" }) as any as S.Schema<JobRunAsUser>;
export type IamRoleArn = string;
export interface PathMappingRule {
  sourcePathFormat: PathFormat;
  sourcePath: string;
  destinationPath: string;
}
export const PathMappingRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourcePathFormat: PathFormat,
    sourcePath: S.String,
    destinationPath: S.String,
  }),
).annotate({
  identifier: "PathMappingRule",
}) as any as S.Schema<PathMappingRule>;
export type PathMappingRules = PathMappingRule[];
export const PathMappingRules = /*@__PURE__*/ S.Array(PathMappingRule);
export interface JobDetailsEntity {
  jobId: string;
  jobAttachmentSettings?: JobAttachmentSettings;
  jobRunAsUser?: JobRunAsUser;
  logGroupName: string;
  queueRoleArn?: string;
  parameters?: { [key: string]: JobParameter | undefined };
  schemaVersion: string;
  pathMappingRules?: PathMappingRule[];
}
export const JobDetailsEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String,
    jobAttachmentSettings: S.optional(JobAttachmentSettings),
    jobRunAsUser: S.optional(JobRunAsUser),
    logGroupName: S.String,
    queueRoleArn: S.optional(S.String),
    parameters: S.optional(JobParameters),
    schemaVersion: S.String,
    pathMappingRules: S.optional(PathMappingRules),
  }),
).annotate({
  identifier: "JobDetailsEntity",
}) as any as S.Schema<JobDetailsEntity>;
export interface JobAttachmentDetailsEntity {
  jobId: string;
  attachments: Attachments;
}
export const JobAttachmentDetailsEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String, attachments: Attachments }),
).annotate({
  identifier: "JobAttachmentDetailsEntity",
}) as any as S.Schema<JobAttachmentDetailsEntity>;
export type Document = unknown;
export type DependenciesList = string[];
export const DependenciesList = /*@__PURE__*/ S.Array(S.String);
export interface StepDetailsEntity {
  jobId: string;
  stepId: string;
  schemaVersion: string;
  template: any;
  dependencies: string[];
}
export const StepDetailsEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String,
    stepId: S.String,
    schemaVersion: S.String,
    template: S.Any,
    dependencies: DependenciesList,
  }),
).annotate({
  identifier: "StepDetailsEntity",
}) as any as S.Schema<StepDetailsEntity>;
export interface EnvironmentDetailsEntity {
  jobId: string;
  environmentId: string;
  schemaVersion: string;
  template: any;
}
export const EnvironmentDetailsEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String,
    environmentId: S.String,
    schemaVersion: S.String,
    template: S.Any,
  }),
).annotate({
  identifier: "EnvironmentDetailsEntity",
}) as any as S.Schema<EnvironmentDetailsEntity>;
export type JobEntity =
  | {
      jobDetails: JobDetailsEntity;
      jobAttachmentDetails?: never;
      stepDetails?: never;
      environmentDetails?: never;
    }
  | {
      jobDetails?: never;
      jobAttachmentDetails: JobAttachmentDetailsEntity;
      stepDetails?: never;
      environmentDetails?: never;
    }
  | {
      jobDetails?: never;
      jobAttachmentDetails?: never;
      stepDetails: StepDetailsEntity;
      environmentDetails?: never;
    }
  | {
      jobDetails?: never;
      jobAttachmentDetails?: never;
      stepDetails?: never;
      environmentDetails: EnvironmentDetailsEntity;
    };
export const JobEntity = /*@__PURE__*/ S.Union([
  S.Struct({ jobDetails: JobDetailsEntity }),
  S.Struct({ jobAttachmentDetails: JobAttachmentDetailsEntity }),
  S.Struct({ stepDetails: StepDetailsEntity }),
  S.Struct({ environmentDetails: EnvironmentDetailsEntity }),
]);
export type BatchGetJobEntityList = JobEntity[];
export const BatchGetJobEntityList = /*@__PURE__*/ S.Array(JobEntity);
export type JobEntityErrorCode =
  | "AccessDeniedException"
  | "InternalServerException"
  | "ValidationException"
  | "ResourceNotFoundException"
  | "MaxPayloadSizeExceeded"
  | "ConflictException"
  | (string & {});
export const JobEntityErrorCode = /*@__PURE__*/ S.String;

export interface JobDetailsError {
  jobId: string;
  code: JobEntityErrorCode;
  message: string;
}
export const JobDetailsError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String, code: JobEntityErrorCode, message: S.String }),
).annotate({
  identifier: "JobDetailsError",
}) as any as S.Schema<JobDetailsError>;
export interface JobAttachmentDetailsError {
  jobId: string;
  code: JobEntityErrorCode;
  message: string;
}
export const JobAttachmentDetailsError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String, code: JobEntityErrorCode, message: S.String }),
).annotate({
  identifier: "JobAttachmentDetailsError",
}) as any as S.Schema<JobAttachmentDetailsError>;
export interface StepDetailsError {
  jobId: string;
  stepId: string;
  code: JobEntityErrorCode;
  message: string;
}
export const StepDetailsError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String,
    stepId: S.String,
    code: JobEntityErrorCode,
    message: S.String,
  }),
).annotate({
  identifier: "StepDetailsError",
}) as any as S.Schema<StepDetailsError>;
export interface EnvironmentDetailsError {
  jobId: string;
  environmentId: string;
  code: JobEntityErrorCode;
  message: string;
}
export const EnvironmentDetailsError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String,
    environmentId: S.String,
    code: JobEntityErrorCode,
    message: S.String,
  }),
).annotate({
  identifier: "EnvironmentDetailsError",
}) as any as S.Schema<EnvironmentDetailsError>;
export type GetJobEntityError =
  | {
      jobDetails: JobDetailsError;
      jobAttachmentDetails?: never;
      stepDetails?: never;
      environmentDetails?: never;
    }
  | {
      jobDetails?: never;
      jobAttachmentDetails: JobAttachmentDetailsError;
      stepDetails?: never;
      environmentDetails?: never;
    }
  | {
      jobDetails?: never;
      jobAttachmentDetails?: never;
      stepDetails: StepDetailsError;
      environmentDetails?: never;
    }
  | {
      jobDetails?: never;
      jobAttachmentDetails?: never;
      stepDetails?: never;
      environmentDetails: EnvironmentDetailsError;
    };
export const GetJobEntityError = /*@__PURE__*/ S.Union([
  S.Struct({ jobDetails: JobDetailsError }),
  S.Struct({ jobAttachmentDetails: JobAttachmentDetailsError }),
  S.Struct({ stepDetails: StepDetailsError }),
  S.Struct({ environmentDetails: EnvironmentDetailsError }),
]);
export type BatchGetJobEntityErrors = GetJobEntityError[];
export const BatchGetJobEntityErrors = /*@__PURE__*/ S.Array(GetJobEntityError);
export interface BatchGetJobEntityResponse {
  entities: JobEntity[];
  errors: GetJobEntityError[];
}
export const BatchGetJobEntityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entities: BatchGetJobEntityList,
    errors: BatchGetJobEntityErrors,
  }),
).annotate({
  identifier: "BatchGetJobEntityResponse",
}) as any as S.Schema<BatchGetJobEntityResponse>;
export type SessionId = string;
export interface BatchGetSessionIdentifier {
  farmId: string;
  queueId: string;
  jobId: string;
  sessionId: string;
}
export const BatchGetSessionIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    queueId: S.String,
    jobId: S.String,
    sessionId: S.String,
  }),
).annotate({
  identifier: "BatchGetSessionIdentifier",
}) as any as S.Schema<BatchGetSessionIdentifier>;
export type BatchGetSessionIdentifiers = BatchGetSessionIdentifier[];
export const BatchGetSessionIdentifiers = /*@__PURE__*/ S.Array(
  BatchGetSessionIdentifier,
);
export interface BatchGetSessionRequest {
  identifiers: BatchGetSessionIdentifier[];
}
export const BatchGetSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifiers: BatchGetSessionIdentifiers }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2023-10-12/batch-get-session" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetSessionRequest",
}) as any as S.Schema<BatchGetSessionRequest>;
export type SessionLifecycleStatus =
  | "STARTED"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_SUCCEEDED"
  | "UPDATE_FAILED"
  | "ENDED"
  | (string & {});
export const SessionLifecycleStatus = /*@__PURE__*/ S.String;

export type SessionLifecycleTargetStatus = "ENDED" | (string & {});
export const SessionLifecycleTargetStatus = /*@__PURE__*/ S.String;

export type LogDriver = string;
export type LogOptions = { [key: string]: string | undefined };
export const LogOptions = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type LogParameters = { [key: string]: string | undefined };
export const LogParameters = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type LogError = string;
export interface LogConfiguration {
  logDriver: string;
  options?: { [key: string]: string | undefined };
  parameters?: { [key: string]: string | undefined };
  error?: string;
}
export const LogConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    logDriver: S.String,
    options: S.optional(LogOptions),
    parameters: S.optional(LogParameters),
    error: S.optional(S.String),
  }),
).annotate({
  identifier: "LogConfiguration",
}) as any as S.Schema<LogConfiguration>;
export type IpV4Address = string;
export type IpV4Addresses = string[];
export const IpV4Addresses = /*@__PURE__*/ S.Array(S.String);
export type IpV6Address = string;
export type IpV6Addresses = string[];
export const IpV6Addresses = /*@__PURE__*/ S.Array(S.String);
export interface IpAddresses {
  ipV4Addresses?: string[];
  ipV6Addresses?: string[];
}
export const IpAddresses = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ipV4Addresses: S.optional(IpV4Addresses),
    ipV6Addresses: S.optional(IpV6Addresses),
  }),
).annotate({ identifier: "IpAddresses" }) as any as S.Schema<IpAddresses>;
export type HostName = string;
export type InstanceType = string;
export interface HostPropertiesResponse {
  ipAddresses?: IpAddresses;
  hostName?: string;
  ec2InstanceArn?: string;
  ec2InstanceType?: string;
}
export const HostPropertiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ipAddresses: S.optional(IpAddresses),
    hostName: S.optional(S.String),
    ec2InstanceArn: S.optional(S.String),
    ec2InstanceType: S.optional(S.String),
  }),
).annotate({
  identifier: "HostPropertiesResponse",
}) as any as S.Schema<HostPropertiesResponse>;
export interface BatchGetSessionItem {
  farmId: string;
  queueId: string;
  jobId: string;
  sessionId: string;
  fleetId: string;
  workerId: string;
  startedAt: Date;
  lifecycleStatus: SessionLifecycleStatus;
  endedAt?: Date;
  targetLifecycleStatus?: SessionLifecycleTargetStatus;
  updatedAt?: Date;
  updatedBy?: string;
  log: LogConfiguration;
  hostProperties?: HostPropertiesResponse;
  workerLog?: LogConfiguration;
}
export const BatchGetSessionItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    queueId: S.String,
    jobId: S.String,
    sessionId: S.String,
    fleetId: S.String,
    workerId: S.String,
    startedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lifecycleStatus: SessionLifecycleStatus,
    endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    targetLifecycleStatus: S.optional(SessionLifecycleTargetStatus),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    log: LogConfiguration,
    hostProperties: S.optional(HostPropertiesResponse),
    workerLog: S.optional(LogConfiguration),
  }),
).annotate({
  identifier: "BatchGetSessionItem",
}) as any as S.Schema<BatchGetSessionItem>;
export type BatchGetSessionItems = BatchGetSessionItem[];
export const BatchGetSessionItems = /*@__PURE__*/ S.Array(BatchGetSessionItem);
export type BatchGetSessionErrorCode =
  | "InternalServerErrorException"
  | "ResourceNotFoundException"
  | "ValidationException"
  | (string & {});
export const BatchGetSessionErrorCode = /*@__PURE__*/ S.String;

export interface BatchGetSessionError_ {
  farmId: string;
  queueId: string;
  jobId: string;
  sessionId: string;
  code: BatchGetSessionErrorCode;
  message: string;
}
export const BatchGetSessionError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    queueId: S.String,
    jobId: S.String,
    sessionId: S.String,
    code: BatchGetSessionErrorCode,
    message: S.String,
  }),
).annotate({
  identifier: "BatchGetSessionError",
}) as any as S.Schema<BatchGetSessionError_>;
export type BatchGetSessionErrors = BatchGetSessionError_[];
export const BatchGetSessionErrors = /*@__PURE__*/ S.Array(
  BatchGetSessionError_,
);
export interface BatchGetSessionResponse {
  sessions: BatchGetSessionItem[];
  errors: BatchGetSessionError_[];
}
export const BatchGetSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sessions: BatchGetSessionItems, errors: BatchGetSessionErrors }),
).annotate({
  identifier: "BatchGetSessionResponse",
}) as any as S.Schema<BatchGetSessionResponse>;
export type SessionActionId = string;
export interface BatchGetSessionActionIdentifier {
  farmId: string;
  queueId: string;
  jobId: string;
  sessionActionId: string;
}
export const BatchGetSessionActionIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    queueId: S.String,
    jobId: S.String,
    sessionActionId: S.String,
  }),
).annotate({
  identifier: "BatchGetSessionActionIdentifier",
}) as any as S.Schema<BatchGetSessionActionIdentifier>;
export type BatchGetSessionActionIdentifiers =
  BatchGetSessionActionIdentifier[];
export const BatchGetSessionActionIdentifiers = /*@__PURE__*/ S.Array(
  BatchGetSessionActionIdentifier,
);
export interface BatchGetSessionActionRequest {
  identifiers: BatchGetSessionActionIdentifier[];
}
export const BatchGetSessionActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifiers: BatchGetSessionActionIdentifiers }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2023-10-12/batch-get-session-action" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetSessionActionRequest",
}) as any as S.Schema<BatchGetSessionActionRequest>;
export type SessionActionStatus =
  | "ASSIGNED"
  | "RUNNING"
  | "CANCELING"
  | "SUCCEEDED"
  | "FAILED"
  | "INTERRUPTED"
  | "CANCELED"
  | "NEVER_ATTEMPTED"
  | "SCHEDULED"
  | "RECLAIMING"
  | "RECLAIMED"
  | (string & {});
export const SessionActionStatus = /*@__PURE__*/ S.String;

export type SessionActionProgressPercent = number;
export interface TaskRunManifestPropertiesResponse {
  outputManifestPath?: string;
  outputManifestHash?: string;
}
export const TaskRunManifestPropertiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    outputManifestPath: S.optional(S.String),
    outputManifestHash: S.optional(S.String),
  }),
).annotate({
  identifier: "TaskRunManifestPropertiesResponse",
}) as any as S.Schema<TaskRunManifestPropertiesResponse>;
export type TaskRunManifestPropertiesListResponse =
  TaskRunManifestPropertiesResponse[];
export const TaskRunManifestPropertiesListResponse = /*@__PURE__*/ S.Array(
  TaskRunManifestPropertiesResponse,
);
export type ProcessExitCode = number;
export type SessionActionProgressMessage = string | redacted.Redacted<string>;
export type LimitId = string;
export type MinOneMaxInteger = number;
export interface AcquiredLimit {
  limitId: string;
  count: number;
}
export const AcquiredLimit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ limitId: S.String, count: S.Number }),
).annotate({ identifier: "AcquiredLimit" }) as any as S.Schema<AcquiredLimit>;
export type AcquiredLimits = AcquiredLimit[];
export const AcquiredLimits = /*@__PURE__*/ S.Array(AcquiredLimit);
export interface EnvironmentEnterSessionActionDefinition {
  environmentId: string;
}
export const EnvironmentEnterSessionActionDefinition = /*@__PURE__*/ S.suspend(
  () => S.Struct({ environmentId: S.String }),
).annotate({
  identifier: "EnvironmentEnterSessionActionDefinition",
}) as any as S.Schema<EnvironmentEnterSessionActionDefinition>;
export interface EnvironmentExitSessionActionDefinition {
  environmentId: string;
}
export const EnvironmentExitSessionActionDefinition = /*@__PURE__*/ S.suspend(
  () => S.Struct({ environmentId: S.String }),
).annotate({
  identifier: "EnvironmentExitSessionActionDefinition",
}) as any as S.Schema<EnvironmentExitSessionActionDefinition>;
export type TaskId = string;
export type TaskParameterValue =
  | {
      int: string;
      float?: never;
      string?: never;
      path?: never;
      chunkInt?: never;
    }
  | {
      int?: never;
      float: string;
      string?: never;
      path?: never;
      chunkInt?: never;
    }
  | {
      int?: never;
      float?: never;
      string: string;
      path?: never;
      chunkInt?: never;
    }
  | {
      int?: never;
      float?: never;
      string?: never;
      path: string;
      chunkInt?: never;
    }
  | {
      int?: never;
      float?: never;
      string?: never;
      path?: never;
      chunkInt: string;
    };
export const TaskParameterValue = /*@__PURE__*/ S.Union([
  S.Struct({ int: S.String }),
  S.Struct({ float: S.String }),
  S.Struct({ string: S.String }),
  S.Struct({ path: S.String }),
  S.Struct({ chunkInt: S.String }),
]);
export type TaskParameters = { [key: string]: TaskParameterValue | undefined };
export const TaskParameters = /*@__PURE__*/ S.Record(
  S.String,
  TaskParameterValue.pipe(S.optional),
);
export interface TaskRunSessionActionDefinition {
  taskId?: string;
  stepId: string;
  parameters: { [key: string]: TaskParameterValue | undefined };
}
export const TaskRunSessionActionDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.optional(S.String),
    stepId: S.String,
    parameters: TaskParameters,
  }),
).annotate({
  identifier: "TaskRunSessionActionDefinition",
}) as any as S.Schema<TaskRunSessionActionDefinition>;
export interface SyncInputJobAttachmentsSessionActionDefinition {
  stepId?: string;
}
export const SyncInputJobAttachmentsSessionActionDefinition =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ stepId: S.optional(S.String) }),
  ).annotate({
    identifier: "SyncInputJobAttachmentsSessionActionDefinition",
  }) as any as S.Schema<SyncInputJobAttachmentsSessionActionDefinition>;
export type SessionActionDefinition =
  | {
      envEnter: EnvironmentEnterSessionActionDefinition;
      envExit?: never;
      taskRun?: never;
      syncInputJobAttachments?: never;
    }
  | {
      envEnter?: never;
      envExit: EnvironmentExitSessionActionDefinition;
      taskRun?: never;
      syncInputJobAttachments?: never;
    }
  | {
      envEnter?: never;
      envExit?: never;
      taskRun: TaskRunSessionActionDefinition;
      syncInputJobAttachments?: never;
    }
  | {
      envEnter?: never;
      envExit?: never;
      taskRun?: never;
      syncInputJobAttachments: SyncInputJobAttachmentsSessionActionDefinition;
    };
export const SessionActionDefinition = /*@__PURE__*/ S.Union([
  S.Struct({ envEnter: EnvironmentEnterSessionActionDefinition }),
  S.Struct({ envExit: EnvironmentExitSessionActionDefinition }),
  S.Struct({ taskRun: TaskRunSessionActionDefinition }),
  S.Struct({
    syncInputJobAttachments: SyncInputJobAttachmentsSessionActionDefinition,
  }),
]);
export interface BatchGetSessionActionItem {
  farmId: string;
  queueId: string;
  jobId: string;
  sessionActionId: string;
  status: SessionActionStatus;
  startedAt?: Date;
  endedAt?: Date;
  workerUpdatedAt?: Date;
  progressPercent?: number;
  manifests?: TaskRunManifestPropertiesResponse[];
  sessionId: string;
  processExitCode?: number;
  progressMessage?: string | redacted.Redacted<string>;
  acquiredLimits?: AcquiredLimit[];
  definition: SessionActionDefinition;
}
export const BatchGetSessionActionItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    queueId: S.String,
    jobId: S.String,
    sessionActionId: S.String,
    status: SessionActionStatus,
    startedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    workerUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    progressPercent: S.optional(S.Number),
    manifests: S.optional(TaskRunManifestPropertiesListResponse),
    sessionId: S.String,
    processExitCode: S.optional(S.Number),
    progressMessage: S.optional(SensitiveString),
    acquiredLimits: S.optional(AcquiredLimits),
    definition: SessionActionDefinition,
  }),
).annotate({
  identifier: "BatchGetSessionActionItem",
}) as any as S.Schema<BatchGetSessionActionItem>;
export type BatchGetSessionActionItems = BatchGetSessionActionItem[];
export const BatchGetSessionActionItems = /*@__PURE__*/ S.Array(
  BatchGetSessionActionItem,
);
export type BatchGetSessionActionErrorCode =
  | "InternalServerErrorException"
  | "ResourceNotFoundException"
  | "ValidationException"
  | (string & {});
export const BatchGetSessionActionErrorCode = /*@__PURE__*/ S.String;

export interface BatchGetSessionActionError_ {
  farmId: string;
  queueId: string;
  jobId: string;
  sessionActionId: string;
  code: BatchGetSessionActionErrorCode;
  message: string;
}
export const BatchGetSessionActionError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    queueId: S.String,
    jobId: S.String,
    sessionActionId: S.String,
    code: BatchGetSessionActionErrorCode,
    message: S.String,
  }),
).annotate({
  identifier: "BatchGetSessionActionError",
}) as any as S.Schema<BatchGetSessionActionError_>;
export type BatchGetSessionActionErrors = BatchGetSessionActionError_[];
export const BatchGetSessionActionErrors = /*@__PURE__*/ S.Array(
  BatchGetSessionActionError_,
);
export interface BatchGetSessionActionResponse {
  sessionActions: BatchGetSessionActionItem[];
  errors: BatchGetSessionActionError_[];
}
export const BatchGetSessionActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionActions: BatchGetSessionActionItems,
    errors: BatchGetSessionActionErrors,
  }),
).annotate({
  identifier: "BatchGetSessionActionResponse",
}) as any as S.Schema<BatchGetSessionActionResponse>;
export interface BatchGetStepIdentifier {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
}
export const BatchGetStepIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    queueId: S.String,
    jobId: S.String,
    stepId: S.String,
  }),
).annotate({
  identifier: "BatchGetStepIdentifier",
}) as any as S.Schema<BatchGetStepIdentifier>;
export type BatchGetStepIdentifiers = BatchGetStepIdentifier[];
export const BatchGetStepIdentifiers = /*@__PURE__*/ S.Array(
  BatchGetStepIdentifier,
);
export interface BatchGetStepRequest {
  identifiers: BatchGetStepIdentifier[];
}
export const BatchGetStepRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifiers: BatchGetStepIdentifiers }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2023-10-12/batch-get-step" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetStepRequest",
}) as any as S.Schema<BatchGetStepRequest>;
export type StepName = string;
export type StepLifecycleStatus =
  | "CREATE_COMPLETE"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_FAILED"
  | "UPDATE_SUCCEEDED"
  | (string & {});
export const StepLifecycleStatus = /*@__PURE__*/ S.String;

export type StepTargetTaskRunStatus =
  | "READY"
  | "FAILED"
  | "SUCCEEDED"
  | "CANCELED"
  | "SUSPENDED"
  | "PENDING"
  | (string & {});
export const StepTargetTaskRunStatus = /*@__PURE__*/ S.String;

export interface DependencyCounts {
  dependenciesResolved: number;
  dependenciesUnresolved: number;
  consumersResolved: number;
  consumersUnresolved: number;
}
export const DependencyCounts = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dependenciesResolved: S.Number,
    dependenciesUnresolved: S.Number,
    consumersResolved: S.Number,
    consumersUnresolved: S.Number,
  }),
).annotate({
  identifier: "DependencyCounts",
}) as any as S.Schema<DependencyCounts>;
export type AttributeCapabilityName = string;
export type AttributeCapabilityValue = string;
export type ListAttributeCapabilityValue = string[];
export const ListAttributeCapabilityValue = /*@__PURE__*/ S.Array(S.String);
export interface StepAttributeCapability {
  name: string;
  anyOf?: string[];
  allOf?: string[];
}
export const StepAttributeCapability = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    anyOf: S.optional(ListAttributeCapabilityValue),
    allOf: S.optional(ListAttributeCapabilityValue),
  }),
).annotate({
  identifier: "StepAttributeCapability",
}) as any as S.Schema<StepAttributeCapability>;
export type StepAttributeCapabilities = StepAttributeCapability[];
export const StepAttributeCapabilities = /*@__PURE__*/ S.Array(
  StepAttributeCapability,
);
export type AmountCapabilityName = string;
export interface StepAmountCapability {
  name: string;
  min?: number;
  max?: number;
  value?: number;
}
export const StepAmountCapability = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    min: S.optional(S.Number),
    max: S.optional(S.Number),
    value: S.optional(S.Number),
  }),
).annotate({
  identifier: "StepAmountCapability",
}) as any as S.Schema<StepAmountCapability>;
export type StepAmountCapabilities = StepAmountCapability[];
export const StepAmountCapabilities =
  /*@__PURE__*/ S.Array(StepAmountCapability);
export interface StepRequiredCapabilities {
  attributes: StepAttributeCapability[];
  amounts: StepAmountCapability[];
}
export const StepRequiredCapabilities = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attributes: StepAttributeCapabilities,
    amounts: StepAmountCapabilities,
  }),
).annotate({
  identifier: "StepRequiredCapabilities",
}) as any as S.Schema<StepRequiredCapabilities>;
export type StepParameterName = string;
export type StepParameterType =
  | "INT"
  | "FLOAT"
  | "STRING"
  | "PATH"
  | "CHUNK_INT"
  | (string & {});
export const StepParameterType = /*@__PURE__*/ S.String;

export type DefaultTaskCount = number;
export type TargetRuntimeSeconds = number;
export type RangeConstraint = "CONTIGUOUS" | "NONCONTIGUOUS" | (string & {});
export const RangeConstraint = /*@__PURE__*/ S.String;

export interface StepParameterChunks {
  defaultTaskCount: number;
  targetRuntimeSeconds?: number;
  rangeConstraint: RangeConstraint;
}
export const StepParameterChunks = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    defaultTaskCount: S.Number,
    targetRuntimeSeconds: S.optional(S.Number),
    rangeConstraint: RangeConstraint,
  }),
).annotate({
  identifier: "StepParameterChunks",
}) as any as S.Schema<StepParameterChunks>;
export interface StepParameter {
  name: string;
  type: StepParameterType;
  chunks?: StepParameterChunks;
}
export const StepParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    type: StepParameterType,
    chunks: S.optional(StepParameterChunks),
  }),
).annotate({ identifier: "StepParameter" }) as any as S.Schema<StepParameter>;
export type StepParameterList = StepParameter[];
export const StepParameterList = /*@__PURE__*/ S.Array(StepParameter);
export type CombinationExpression = string;
export interface ParameterSpace {
  parameters: StepParameter[];
  combination?: string;
}
export const ParameterSpace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    parameters: StepParameterList,
    combination: S.optional(S.String),
  }),
).annotate({ identifier: "ParameterSpace" }) as any as S.Schema<ParameterSpace>;
export type StepDescription = string | redacted.Redacted<string>;
export interface BatchGetStepItem {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
  name: string;
  lifecycleStatus: StepLifecycleStatus;
  lifecycleStatusMessage?: string;
  taskRunStatus: TaskRunStatus;
  taskRunStatusCounts: { [key: string]: number | undefined };
  taskFailureRetryCount?: number;
  targetTaskRunStatus?: StepTargetTaskRunStatus;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  startedAt?: Date;
  endedAt?: Date;
  dependencyCounts?: DependencyCounts;
  requiredCapabilities?: StepRequiredCapabilities;
  parameterSpace?: ParameterSpace;
  description?: string | redacted.Redacted<string>;
}
export const BatchGetStepItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    queueId: S.String,
    jobId: S.String,
    stepId: S.String,
    name: S.String,
    lifecycleStatus: StepLifecycleStatus,
    lifecycleStatusMessage: S.optional(S.String),
    taskRunStatus: TaskRunStatus,
    taskRunStatusCounts: TaskRunStatusCounts,
    taskFailureRetryCount: S.optional(S.Number),
    targetTaskRunStatus: S.optional(StepTargetTaskRunStatus),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    startedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    dependencyCounts: S.optional(DependencyCounts),
    requiredCapabilities: S.optional(StepRequiredCapabilities),
    parameterSpace: S.optional(ParameterSpace),
    description: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "BatchGetStepItem",
}) as any as S.Schema<BatchGetStepItem>;
export type BatchGetStepItems = BatchGetStepItem[];
export const BatchGetStepItems = /*@__PURE__*/ S.Array(BatchGetStepItem);
export type BatchGetStepErrorCode =
  | "InternalServerErrorException"
  | "ResourceNotFoundException"
  | "ValidationException"
  | "AccessDeniedException"
  | "ThrottlingException"
  | (string & {});
export const BatchGetStepErrorCode = /*@__PURE__*/ S.String;

export interface BatchGetStepError_ {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
  code: BatchGetStepErrorCode;
  message: string;
}
export const BatchGetStepError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    queueId: S.String,
    jobId: S.String,
    stepId: S.String,
    code: BatchGetStepErrorCode,
    message: S.String,
  }),
).annotate({
  identifier: "BatchGetStepError",
}) as any as S.Schema<BatchGetStepError_>;
export type BatchGetStepErrors = BatchGetStepError_[];
export const BatchGetStepErrors = /*@__PURE__*/ S.Array(BatchGetStepError_);
export interface BatchGetStepResponse {
  steps: BatchGetStepItem[];
  errors: BatchGetStepError_[];
}
export const BatchGetStepResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ steps: BatchGetStepItems, errors: BatchGetStepErrors }),
).annotate({
  identifier: "BatchGetStepResponse",
}) as any as S.Schema<BatchGetStepResponse>;
export interface BatchGetTaskIdentifier {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
  taskId: string;
}
export const BatchGetTaskIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    queueId: S.String,
    jobId: S.String,
    stepId: S.String,
    taskId: S.String,
  }),
).annotate({
  identifier: "BatchGetTaskIdentifier",
}) as any as S.Schema<BatchGetTaskIdentifier>;
export type BatchGetTaskIdentifiers = BatchGetTaskIdentifier[];
export const BatchGetTaskIdentifiers = /*@__PURE__*/ S.Array(
  BatchGetTaskIdentifier,
);
export interface BatchGetTaskRequest {
  identifiers: BatchGetTaskIdentifier[];
}
export const BatchGetTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifiers: BatchGetTaskIdentifiers }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2023-10-12/batch-get-task" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetTaskRequest",
}) as any as S.Schema<BatchGetTaskRequest>;
export type TaskTargetRunStatus =
  | "READY"
  | "FAILED"
  | "SUCCEEDED"
  | "CANCELED"
  | "SUSPENDED"
  | "PENDING"
  | (string & {});
export const TaskTargetRunStatus = /*@__PURE__*/ S.String;

export type TaskRetryCount = number;
export interface BatchGetTaskItem {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
  taskId: string;
  createdAt: Date;
  createdBy: string;
  runStatus: TaskRunStatus;
  targetRunStatus?: TaskTargetRunStatus;
  failureRetryCount?: number;
  startedAt?: Date;
  endedAt?: Date;
  updatedAt?: Date;
  updatedBy?: string;
  latestSessionActionId?: string;
  parameters?: { [key: string]: TaskParameterValue | undefined };
}
export const BatchGetTaskItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    queueId: S.String,
    jobId: S.String,
    stepId: S.String,
    taskId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    runStatus: TaskRunStatus,
    targetRunStatus: S.optional(TaskTargetRunStatus),
    failureRetryCount: S.optional(S.Number),
    startedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    latestSessionActionId: S.optional(S.String),
    parameters: S.optional(TaskParameters),
  }),
).annotate({
  identifier: "BatchGetTaskItem",
}) as any as S.Schema<BatchGetTaskItem>;
export type BatchGetTaskItems = BatchGetTaskItem[];
export const BatchGetTaskItems = /*@__PURE__*/ S.Array(BatchGetTaskItem);
export type BatchGetTaskErrorCode =
  | "InternalServerErrorException"
  | "ResourceNotFoundException"
  | "ValidationException"
  | "AccessDeniedException"
  | "ThrottlingException"
  | (string & {});
export const BatchGetTaskErrorCode = /*@__PURE__*/ S.String;

export interface BatchGetTaskError_ {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
  taskId: string;
  code: BatchGetTaskErrorCode;
  message: string;
}
export const BatchGetTaskError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    queueId: S.String,
    jobId: S.String,
    stepId: S.String,
    taskId: S.String,
    code: BatchGetTaskErrorCode,
    message: S.String,
  }),
).annotate({
  identifier: "BatchGetTaskError",
}) as any as S.Schema<BatchGetTaskError_>;
export type BatchGetTaskErrors = BatchGetTaskError_[];
export const BatchGetTaskErrors = /*@__PURE__*/ S.Array(BatchGetTaskError_);
export interface BatchGetTaskResponse {
  tasks: BatchGetTaskItem[];
  errors: BatchGetTaskError_[];
}
export const BatchGetTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tasks: BatchGetTaskItems, errors: BatchGetTaskErrors }),
).annotate({
  identifier: "BatchGetTaskResponse",
}) as any as S.Schema<BatchGetTaskResponse>;
export interface BatchGetWorkerIdentifier {
  farmId: string;
  fleetId: string;
  workerId: string;
}
export const BatchGetWorkerIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ farmId: S.String, fleetId: S.String, workerId: S.String }),
).annotate({
  identifier: "BatchGetWorkerIdentifier",
}) as any as S.Schema<BatchGetWorkerIdentifier>;
export type BatchGetWorkerIdentifiers = BatchGetWorkerIdentifier[];
export const BatchGetWorkerIdentifiers = /*@__PURE__*/ S.Array(
  BatchGetWorkerIdentifier,
);
export interface BatchGetWorkerRequest {
  identifiers: BatchGetWorkerIdentifier[];
}
export const BatchGetWorkerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifiers: BatchGetWorkerIdentifiers }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2023-10-12/batch-get-worker" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetWorkerRequest",
}) as any as S.Schema<BatchGetWorkerRequest>;
export type WorkerStatus =
  | "CREATED"
  | "STARTED"
  | "STOPPING"
  | "STOPPED"
  | "NOT_RESPONDING"
  | "NOT_COMPATIBLE"
  | "RUNNING"
  | "IDLE"
  | (string & {});
export const WorkerStatus = /*@__PURE__*/ S.String;

export interface BatchGetWorkerItem {
  farmId: string;
  fleetId: string;
  workerId: string;
  hostProperties?: HostPropertiesResponse;
  status: WorkerStatus;
  log?: LogConfiguration;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export const BatchGetWorkerItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    fleetId: S.String,
    workerId: S.String,
    hostProperties: S.optional(HostPropertiesResponse),
    status: WorkerStatus,
    log: S.optional(LogConfiguration),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchGetWorkerItem",
}) as any as S.Schema<BatchGetWorkerItem>;
export type BatchGetWorkerItems = BatchGetWorkerItem[];
export const BatchGetWorkerItems = /*@__PURE__*/ S.Array(BatchGetWorkerItem);
export type BatchGetWorkerErrorCode =
  | "InternalServerErrorException"
  | "ResourceNotFoundException"
  | "ValidationException"
  | (string & {});
export const BatchGetWorkerErrorCode = /*@__PURE__*/ S.String;

export interface BatchGetWorkerError_ {
  farmId: string;
  fleetId: string;
  workerId: string;
  code: BatchGetWorkerErrorCode;
  message: string;
}
export const BatchGetWorkerError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    fleetId: S.String,
    workerId: S.String,
    code: BatchGetWorkerErrorCode,
    message: S.String,
  }),
).annotate({
  identifier: "BatchGetWorkerError",
}) as any as S.Schema<BatchGetWorkerError_>;
export type BatchGetWorkerErrors = BatchGetWorkerError_[];
export const BatchGetWorkerErrors = /*@__PURE__*/ S.Array(BatchGetWorkerError_);
export interface BatchGetWorkerResponse {
  workers: BatchGetWorkerItem[];
  errors: BatchGetWorkerError_[];
}
export const BatchGetWorkerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workers: BatchGetWorkerItems, errors: BatchGetWorkerErrors }),
).annotate({
  identifier: "BatchGetWorkerResponse",
}) as any as S.Schema<BatchGetWorkerResponse>;
export type ClientToken = string;
export type UpdateJobLifecycleStatus = "ARCHIVED" | (string & {});
export const UpdateJobLifecycleStatus = /*@__PURE__*/ S.String;

export type JobDescriptionOverride = string | redacted.Redacted<string>;
export interface BatchUpdateJobItem {
  farmId: string;
  queueId: string;
  jobId: string;
  targetTaskRunStatus?: JobTargetTaskRunStatus;
  priority?: number;
  maxFailedTasksCount?: number;
  maxRetriesPerTask?: number;
  lifecycleStatus?: UpdateJobLifecycleStatus;
  maxWorkerCount?: number;
  name?: string;
  description?: string | redacted.Redacted<string>;
}
export const BatchUpdateJobItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    queueId: S.String,
    jobId: S.String,
    targetTaskRunStatus: S.optional(JobTargetTaskRunStatus),
    priority: S.optional(S.Number),
    maxFailedTasksCount: S.optional(S.Number),
    maxRetriesPerTask: S.optional(S.Number),
    lifecycleStatus: S.optional(UpdateJobLifecycleStatus),
    maxWorkerCount: S.optional(S.Number),
    name: S.optional(S.String),
    description: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "BatchUpdateJobItem",
}) as any as S.Schema<BatchUpdateJobItem>;
export type BatchUpdateJobItems = BatchUpdateJobItem[];
export const BatchUpdateJobItems = /*@__PURE__*/ S.Array(BatchUpdateJobItem);
export interface BatchUpdateJobRequest {
  clientToken?: string;
  jobs: BatchUpdateJobItem[];
}
export const BatchUpdateJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Client-Token"),
      T.IdempotencyToken(),
    ),
    jobs: BatchUpdateJobItems,
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/2023-10-12/batch-update-job" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchUpdateJobRequest",
}) as any as S.Schema<BatchUpdateJobRequest>;
export type BatchUpdateJobErrorCode =
  | "ConflictException"
  | "InternalServerErrorException"
  | "ResourceNotFoundException"
  | "ValidationException"
  | "AccessDeniedException"
  | "ThrottlingException"
  | (string & {});
export const BatchUpdateJobErrorCode = /*@__PURE__*/ S.String;

export interface BatchUpdateJobError_ {
  farmId: string;
  queueId: string;
  jobId: string;
  code: BatchUpdateJobErrorCode;
  message: string;
}
export const BatchUpdateJobError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    queueId: S.String,
    jobId: S.String,
    code: BatchUpdateJobErrorCode,
    message: S.String,
  }),
).annotate({
  identifier: "BatchUpdateJobError",
}) as any as S.Schema<BatchUpdateJobError_>;
export type BatchUpdateJobErrors = BatchUpdateJobError_[];
export const BatchUpdateJobErrors = /*@__PURE__*/ S.Array(BatchUpdateJobError_);
export interface BatchUpdateJobResponse {
  errors: BatchUpdateJobError_[];
}
export const BatchUpdateJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ errors: BatchUpdateJobErrors }),
).annotate({
  identifier: "BatchUpdateJobResponse",
}) as any as S.Schema<BatchUpdateJobResponse>;
export interface BatchUpdateTaskItem {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
  taskId: string;
  targetRunStatus: TaskTargetRunStatus;
}
export const BatchUpdateTaskItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    queueId: S.String,
    jobId: S.String,
    stepId: S.String,
    taskId: S.String,
    targetRunStatus: TaskTargetRunStatus,
  }),
).annotate({
  identifier: "BatchUpdateTaskItem",
}) as any as S.Schema<BatchUpdateTaskItem>;
export type BatchUpdateTaskItems = BatchUpdateTaskItem[];
export const BatchUpdateTaskItems = /*@__PURE__*/ S.Array(BatchUpdateTaskItem);
export interface BatchUpdateTaskRequest {
  clientToken?: string;
  tasks: BatchUpdateTaskItem[];
}
export const BatchUpdateTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Client-Token"),
      T.IdempotencyToken(),
    ),
    tasks: BatchUpdateTaskItems,
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/2023-10-12/batch-update-task" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchUpdateTaskRequest",
}) as any as S.Schema<BatchUpdateTaskRequest>;
export type BatchUpdateTaskErrorCode =
  | "ConflictException"
  | "InternalServerErrorException"
  | "ResourceNotFoundException"
  | "ValidationException"
  | "AccessDeniedException"
  | "ThrottlingException"
  | (string & {});
export const BatchUpdateTaskErrorCode = /*@__PURE__*/ S.String;

export interface BatchUpdateTaskError_ {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
  taskId: string;
  code: BatchUpdateTaskErrorCode;
  message: string;
}
export const BatchUpdateTaskError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    queueId: S.String,
    jobId: S.String,
    stepId: S.String,
    taskId: S.String,
    code: BatchUpdateTaskErrorCode,
    message: S.String,
  }),
).annotate({
  identifier: "BatchUpdateTaskError",
}) as any as S.Schema<BatchUpdateTaskError_>;
export type BatchUpdateTaskErrors = BatchUpdateTaskError_[];
export const BatchUpdateTaskErrors = /*@__PURE__*/ S.Array(
  BatchUpdateTaskError_,
);
export interface BatchUpdateTaskResponse {
  errors: BatchUpdateTaskError_[];
}
export const BatchUpdateTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ errors: BatchUpdateTaskErrors }),
).annotate({
  identifier: "BatchUpdateTaskResponse",
}) as any as S.Schema<BatchUpdateTaskResponse>;
export type S3Key = string;
export interface S3Location {
  bucketName: string;
  key: string;
}
export const S3Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucketName: S.String, key: S.String }),
).annotate({ identifier: "S3Location" }) as any as S.Schema<S3Location>;
export interface CopyJobTemplateRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  targetS3Location: S3Location;
}
export const CopyJobTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    targetS3Location: S3Location,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/template",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CopyJobTemplateRequest",
}) as any as S.Schema<CopyJobTemplateRequest>;
export type JobTemplateType = "JSON" | "YAML" | (string & {});
export const JobTemplateType = /*@__PURE__*/ S.String;

export interface CopyJobTemplateResponse {
  templateType: JobTemplateType;
}
export const CopyJobTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ templateType: JobTemplateType }),
).annotate({
  identifier: "CopyJobTemplateResponse",
}) as any as S.Schema<CopyJobTemplateResponse>;
export type ResourceName = string;
export type Description = string | redacted.Redacted<string>;
export type UsageTrackingResource = { queueId: string };
export const UsageTrackingResource = /*@__PURE__*/ S.Union([
  S.Struct({ queueId: S.String }),
]);
export type ConsumedUsageLimit = number;
export type BudgetActionType =
  | "STOP_SCHEDULING_AND_COMPLETE_TASKS"
  | "STOP_SCHEDULING_AND_CANCEL_TASKS"
  | (string & {});
export const BudgetActionType = /*@__PURE__*/ S.String;

export type ThresholdPercentage = number;
export interface BudgetActionToAdd {
  type: BudgetActionType;
  thresholdPercentage: number;
  description?: string | redacted.Redacted<string>;
}
export const BudgetActionToAdd = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: BudgetActionType,
    thresholdPercentage: S.Number,
    description: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "BudgetActionToAdd",
}) as any as S.Schema<BudgetActionToAdd>;
export type BudgetActionsToAdd = BudgetActionToAdd[];
export const BudgetActionsToAdd = /*@__PURE__*/ S.Array(BudgetActionToAdd);
export type StartsAt = Date;
export type EndsAt = Date;
export interface FixedBudgetSchedule {
  startTime: Date;
  endTime: Date;
}
export const FixedBudgetSchedule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    endTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "FixedBudgetSchedule",
}) as any as S.Schema<FixedBudgetSchedule>;
export type BudgetSchedule = { fixed: FixedBudgetSchedule };
export const BudgetSchedule = /*@__PURE__*/ S.Union([
  S.Struct({ fixed: FixedBudgetSchedule }),
]);
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export interface CreateBudgetRequest {
  farmId: string;
  displayName: string;
  description?: string | redacted.Redacted<string>;
  clientToken?: string;
  usageTrackingResource: UsageTrackingResource;
  approximateDollarLimit: number;
  actions: BudgetActionToAdd[];
  schedule: BudgetSchedule;
  tags?: { [key: string]: string | undefined };
}
export const CreateBudgetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    displayName: S.String,
    description: S.optional(SensitiveString),
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Client-Token"),
      T.IdempotencyToken(),
    ),
    usageTrackingResource: UsageTrackingResource,
    approximateDollarLimit: S.Number,
    actions: BudgetActionsToAdd,
    schedule: BudgetSchedule,
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2023-10-12/farms/{farmId}/budgets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateBudgetRequest",
}) as any as S.Schema<CreateBudgetRequest>;
export type BudgetId = string;
export interface CreateBudgetResponse {
  budgetId: string;
}
export const CreateBudgetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ budgetId: S.String }),
).annotate({
  identifier: "CreateBudgetResponse",
}) as any as S.Schema<CreateBudgetResponse>;
export type KmsKeyArn = string;
export type CostScaleFactor = number;
export interface CreateFarmRequest {
  clientToken?: string;
  displayName: string;
  description?: string | redacted.Redacted<string>;
  kmsKeyArn?: string;
  costScaleFactor?: number;
  tags?: { [key: string]: string | undefined };
}
export const CreateFarmRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Client-Token"),
      T.IdempotencyToken(),
    ),
    displayName: S.String,
    description: S.optional(SensitiveString),
    kmsKeyArn: S.optional(S.String),
    costScaleFactor: S.optional(S.Number),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2023-10-12/farms" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFarmRequest",
}) as any as S.Schema<CreateFarmRequest>;
export interface CreateFarmResponse {
  farmId: string;
}
export const CreateFarmResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ farmId: S.String }),
).annotate({
  identifier: "CreateFarmResponse",
}) as any as S.Schema<CreateFarmResponse>;
export type MinZeroMaxInteger = number;
export type AutoScalingMode =
  | "NO_SCALING"
  | "EVENT_BASED_AUTO_SCALING"
  | (string & {});
export const AutoScalingMode = /*@__PURE__*/ S.String;

export interface CustomerManagedAutoScalingConfiguration {
  standbyWorkerCount?: number;
  workerIdleDurationSeconds?: number;
  scaleOutWorkersPerMinute?: number;
}
export const CustomerManagedAutoScalingConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      standbyWorkerCount: S.optional(S.Number),
      workerIdleDurationSeconds: S.optional(S.Number),
      scaleOutWorkersPerMinute: S.optional(S.Number),
    }),
).annotate({
  identifier: "CustomerManagedAutoScalingConfiguration",
}) as any as S.Schema<CustomerManagedAutoScalingConfiguration>;
export type MinOneMaxTenThousand = number;
export interface VCpuCountRange {
  min: number;
  max?: number;
}
export const VCpuCountRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ min: S.Number, max: S.optional(S.Number) }),
).annotate({ identifier: "VCpuCountRange" }) as any as S.Schema<VCpuCountRange>;
export type MemoryAmountMiB = number;
export interface MemoryMiBRange {
  min: number;
  max?: number;
}
export const MemoryMiBRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ min: S.Number, max: S.optional(S.Number) }),
).annotate({ identifier: "MemoryMiBRange" }) as any as S.Schema<MemoryMiBRange>;
export type AcceleratorType = "gpu" | (string & {});
export const AcceleratorType = /*@__PURE__*/ S.String;

export type AcceleratorTypes = AcceleratorType[];
export const AcceleratorTypes = /*@__PURE__*/ S.Array(AcceleratorType);
export interface AcceleratorCountRange {
  min: number;
  max?: number;
}
export const AcceleratorCountRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ min: S.Number, max: S.optional(S.Number) }),
).annotate({
  identifier: "AcceleratorCountRange",
}) as any as S.Schema<AcceleratorCountRange>;
export interface AcceleratorTotalMemoryMiBRange {
  min: number;
  max?: number;
}
export const AcceleratorTotalMemoryMiBRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ min: S.Number, max: S.optional(S.Number) }),
).annotate({
  identifier: "AcceleratorTotalMemoryMiBRange",
}) as any as S.Schema<AcceleratorTotalMemoryMiBRange>;
export type CustomerManagedFleetOperatingSystemFamily =
  | "WINDOWS"
  | "LINUX"
  | "MACOS"
  | (string & {});
export const CustomerManagedFleetOperatingSystemFamily = /*@__PURE__*/ S.String;

export type CpuArchitectureType = "x86_64" | "arm64" | (string & {});
export const CpuArchitectureType = /*@__PURE__*/ S.String;

export interface FleetAmountCapability {
  name: string;
  min: number;
  max?: number;
}
export const FleetAmountCapability = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, min: S.Number, max: S.optional(S.Number) }),
).annotate({
  identifier: "FleetAmountCapability",
}) as any as S.Schema<FleetAmountCapability>;
export type CustomFleetAmountCapabilities = FleetAmountCapability[];
export const CustomFleetAmountCapabilities = /*@__PURE__*/ S.Array(
  FleetAmountCapability,
);
export type AttributeCapabilityValuesList = string[];
export const AttributeCapabilityValuesList = /*@__PURE__*/ S.Array(S.String);
export interface FleetAttributeCapability {
  name: string;
  values: string[];
}
export const FleetAttributeCapability = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, values: AttributeCapabilityValuesList }),
).annotate({
  identifier: "FleetAttributeCapability",
}) as any as S.Schema<FleetAttributeCapability>;
export type CustomFleetAttributeCapabilities = FleetAttributeCapability[];
export const CustomFleetAttributeCapabilities = /*@__PURE__*/ S.Array(
  FleetAttributeCapability,
);
export interface CustomerManagedWorkerCapabilities {
  vCpuCount: VCpuCountRange;
  memoryMiB: MemoryMiBRange;
  acceleratorTypes?: AcceleratorType[];
  acceleratorCount?: AcceleratorCountRange;
  acceleratorTotalMemoryMiB?: AcceleratorTotalMemoryMiBRange;
  osFamily: CustomerManagedFleetOperatingSystemFamily;
  cpuArchitectureType: CpuArchitectureType;
  customAmounts?: FleetAmountCapability[];
  customAttributes?: FleetAttributeCapability[];
}
export const CustomerManagedWorkerCapabilities = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vCpuCount: VCpuCountRange,
    memoryMiB: MemoryMiBRange,
    acceleratorTypes: S.optional(AcceleratorTypes),
    acceleratorCount: S.optional(AcceleratorCountRange),
    acceleratorTotalMemoryMiB: S.optional(AcceleratorTotalMemoryMiBRange),
    osFamily: CustomerManagedFleetOperatingSystemFamily,
    cpuArchitectureType: CpuArchitectureType,
    customAmounts: S.optional(CustomFleetAmountCapabilities),
    customAttributes: S.optional(CustomFleetAttributeCapabilities),
  }),
).annotate({
  identifier: "CustomerManagedWorkerCapabilities",
}) as any as S.Schema<CustomerManagedWorkerCapabilities>;
export type TagPropagationMode =
  | "NO_PROPAGATION"
  | "PROPAGATE_TAGS_TO_WORKERS_AT_LAUNCH"
  | (string & {});
export const TagPropagationMode = /*@__PURE__*/ S.String;

export interface CustomerManagedFleetConfiguration {
  mode: AutoScalingMode;
  autoScalingConfiguration?: CustomerManagedAutoScalingConfiguration;
  workerCapabilities: CustomerManagedWorkerCapabilities;
  storageProfileId?: string;
  tagPropagationMode?: TagPropagationMode;
}
export const CustomerManagedFleetConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mode: AutoScalingMode,
    autoScalingConfiguration: S.optional(
      CustomerManagedAutoScalingConfiguration,
    ),
    workerCapabilities: CustomerManagedWorkerCapabilities,
    storageProfileId: S.optional(S.String),
    tagPropagationMode: S.optional(TagPropagationMode),
  }),
).annotate({
  identifier: "CustomerManagedFleetConfiguration",
}) as any as S.Schema<CustomerManagedFleetConfiguration>;
export type ServiceManagedFleetOperatingSystemFamily =
  | "WINDOWS"
  | "LINUX"
  | (string & {});
export const ServiceManagedFleetOperatingSystemFamily = /*@__PURE__*/ S.String;

export type EbsIops = number;
export type EbsThroughputMiB = number;
export interface Ec2EbsVolume {
  sizeGiB?: number;
  iops?: number;
  throughputMiB?: number;
}
export const Ec2EbsVolume = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sizeGiB: S.optional(S.Number),
    iops: S.optional(S.Number),
    throughputMiB: S.optional(S.Number),
  }),
).annotate({ identifier: "Ec2EbsVolume" }) as any as S.Schema<Ec2EbsVolume>;
export type AcceleratorName =
  | "t4"
  | "a10g"
  | "l4"
  | "l40s"
  | "rtx-pro-server-6000"
  | (string & {});
export const AcceleratorName = /*@__PURE__*/ S.String;

export type AcceleratorRuntime = string;
export interface AcceleratorSelection {
  name: AcceleratorName;
  runtime?: string;
}
export const AcceleratorSelection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: AcceleratorName, runtime: S.optional(S.String) }),
).annotate({
  identifier: "AcceleratorSelection",
}) as any as S.Schema<AcceleratorSelection>;
export type AcceleratorSelections = AcceleratorSelection[];
export const AcceleratorSelections =
  /*@__PURE__*/ S.Array(AcceleratorSelection);
export interface AcceleratorCapabilities {
  selections: AcceleratorSelection[];
  count?: AcceleratorCountRange;
}
export const AcceleratorCapabilities = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    selections: AcceleratorSelections,
    count: S.optional(AcceleratorCountRange),
  }),
).annotate({
  identifier: "AcceleratorCapabilities",
}) as any as S.Schema<AcceleratorCapabilities>;
export type InstanceTypes = string[];
export const InstanceTypes = /*@__PURE__*/ S.Array(S.String);
export interface ServiceManagedEc2InstanceCapabilities {
  vCpuCount: VCpuCountRange;
  memoryMiB: MemoryMiBRange;
  osFamily: ServiceManagedFleetOperatingSystemFamily;
  cpuArchitectureType: CpuArchitectureType;
  rootEbsVolume?: Ec2EbsVolume;
  acceleratorCapabilities?: AcceleratorCapabilities;
  allowedInstanceTypes?: string[];
  excludedInstanceTypes?: string[];
  customAmounts?: FleetAmountCapability[];
  customAttributes?: FleetAttributeCapability[];
}
export const ServiceManagedEc2InstanceCapabilities = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      vCpuCount: VCpuCountRange,
      memoryMiB: MemoryMiBRange,
      osFamily: ServiceManagedFleetOperatingSystemFamily,
      cpuArchitectureType: CpuArchitectureType,
      rootEbsVolume: S.optional(Ec2EbsVolume),
      acceleratorCapabilities: S.optional(AcceleratorCapabilities),
      allowedInstanceTypes: S.optional(InstanceTypes),
      excludedInstanceTypes: S.optional(InstanceTypes),
      customAmounts: S.optional(CustomFleetAmountCapabilities),
      customAttributes: S.optional(CustomFleetAttributeCapabilities),
    }),
).annotate({
  identifier: "ServiceManagedEc2InstanceCapabilities",
}) as any as S.Schema<ServiceManagedEc2InstanceCapabilities>;
export type Ec2MarketType =
  | "on-demand"
  | "spot"
  | "wait-and-save"
  | (string & {});
export const Ec2MarketType = /*@__PURE__*/ S.String;

export interface ServiceManagedEc2InstanceMarketOptions {
  type: Ec2MarketType;
}
export const ServiceManagedEc2InstanceMarketOptions = /*@__PURE__*/ S.suspend(
  () => S.Struct({ type: Ec2MarketType }),
).annotate({
  identifier: "ServiceManagedEc2InstanceMarketOptions",
}) as any as S.Schema<ServiceManagedEc2InstanceMarketOptions>;
export type VpcResourceConfigurationArn = string;
export type VpcResourceConfigurationArns = string[];
export const VpcResourceConfigurationArns = /*@__PURE__*/ S.Array(S.String);
export interface VpcConfiguration {
  resourceConfigurationArns?: string[];
}
export const VpcConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceConfigurationArns: S.optional(VpcResourceConfigurationArns),
  }),
).annotate({
  identifier: "VpcConfiguration",
}) as any as S.Schema<VpcConfiguration>;
export type PersistentVolumeSizeGiB = number;
export type PersistentVolumeIops = number;
export type PersistentVolumeThroughputMiB = number;
export type MountPath = string;
export type PersistentVolumeTtlHours = number;
export interface PersistentVolumeConfiguration {
  sizeGiB?: number;
  iops?: number;
  throughputMiB?: number;
  mountPath: string;
  lastUsedTtlHours?: number;
}
export const PersistentVolumeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sizeGiB: S.optional(S.Number),
    iops: S.optional(S.Number),
    throughputMiB: S.optional(S.Number),
    mountPath: S.String,
    lastUsedTtlHours: S.optional(S.Number),
  }),
).annotate({
  identifier: "PersistentVolumeConfiguration",
}) as any as S.Schema<PersistentVolumeConfiguration>;
export type ServiceManagedEc2WorkerIdleDurationSeconds = number;
export interface ServiceManagedEc2AutoScalingConfiguration {
  standbyWorkerCount?: number;
  workerIdleDurationSeconds?: number;
  scaleOutWorkersPerMinute?: number;
}
export const ServiceManagedEc2AutoScalingConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      standbyWorkerCount: S.optional(S.Number),
      workerIdleDurationSeconds: S.optional(S.Number),
      scaleOutWorkersPerMinute: S.optional(S.Number),
    }),
  ).annotate({
    identifier: "ServiceManagedEc2AutoScalingConfiguration",
  }) as any as S.Schema<ServiceManagedEc2AutoScalingConfiguration>;
export interface ServiceManagedEc2FleetConfiguration {
  instanceCapabilities: ServiceManagedEc2InstanceCapabilities;
  instanceMarketOptions: ServiceManagedEc2InstanceMarketOptions;
  vpcConfiguration?: VpcConfiguration;
  storageProfileId?: string;
  persistentVolumeConfiguration?: PersistentVolumeConfiguration;
  autoScalingConfiguration?: ServiceManagedEc2AutoScalingConfiguration;
}
export const ServiceManagedEc2FleetConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceCapabilities: ServiceManagedEc2InstanceCapabilities,
    instanceMarketOptions: ServiceManagedEc2InstanceMarketOptions,
    vpcConfiguration: S.optional(VpcConfiguration),
    storageProfileId: S.optional(S.String),
    persistentVolumeConfiguration: S.optional(PersistentVolumeConfiguration),
    autoScalingConfiguration: S.optional(
      ServiceManagedEc2AutoScalingConfiguration,
    ),
  }),
).annotate({
  identifier: "ServiceManagedEc2FleetConfiguration",
}) as any as S.Schema<ServiceManagedEc2FleetConfiguration>;
export type FleetConfiguration =
  | {
      customerManaged: CustomerManagedFleetConfiguration;
      serviceManagedEc2?: never;
    }
  | {
      customerManaged?: never;
      serviceManagedEc2: ServiceManagedEc2FleetConfiguration;
    };
export const FleetConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ customerManaged: CustomerManagedFleetConfiguration }),
  S.Struct({ serviceManagedEc2: ServiceManagedEc2FleetConfiguration }),
]);
export type HostConfigurationScript = string | redacted.Redacted<string>;
export type HostConfigurationScriptTimeoutSeconds = number;
export interface HostConfiguration {
  scriptBody: string | redacted.Redacted<string>;
  scriptTimeoutSeconds?: number;
}
export const HostConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scriptBody: SensitiveString,
    scriptTimeoutSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "HostConfiguration",
}) as any as S.Schema<HostConfiguration>;
export interface CreateFleetRequest {
  farmId: string;
  clientToken?: string;
  displayName: string;
  description?: string | redacted.Redacted<string>;
  roleArn: string;
  minWorkerCount?: number;
  maxWorkerCount: number;
  configuration: FleetConfiguration;
  tags?: { [key: string]: string | undefined };
  hostConfiguration?: HostConfiguration;
}
export const CreateFleetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Client-Token"),
      T.IdempotencyToken(),
    ),
    displayName: S.String,
    description: S.optional(SensitiveString),
    roleArn: S.String,
    minWorkerCount: S.optional(S.Number),
    maxWorkerCount: S.Number,
    configuration: FleetConfiguration,
    tags: S.optional(Tags),
    hostConfiguration: S.optional(HostConfiguration),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2023-10-12/farms/{farmId}/fleets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFleetRequest",
}) as any as S.Schema<CreateFleetRequest>;
export interface CreateFleetResponse {
  fleetId: string;
}
export const CreateFleetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fleetId: S.String }),
).annotate({
  identifier: "CreateFleetResponse",
}) as any as S.Schema<CreateFleetResponse>;
export type JobTemplate = string | redacted.Redacted<string>;
export type CreateJobTargetTaskRunStatus =
  | "READY"
  | "SUSPENDED"
  | (string & {});
export const CreateJobTargetTaskRunStatus = /*@__PURE__*/ S.String;

export interface CreateJobRequest {
  farmId: string;
  queueId: string;
  clientToken?: string;
  template?: string | redacted.Redacted<string>;
  templateType?: JobTemplateType;
  priority: number;
  parameters?: { [key: string]: JobParameter | undefined };
  attachments?: Attachments;
  storageProfileId?: string;
  targetTaskRunStatus?: CreateJobTargetTaskRunStatus;
  maxFailedTasksCount?: number;
  maxRetriesPerTask?: number;
  maxWorkerCount?: number;
  sourceJobId?: string;
  nameOverride?: string;
  descriptionOverride?: string | redacted.Redacted<string>;
  tags?: { [key: string]: string | undefined };
}
export const CreateJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Client-Token"),
      T.IdempotencyToken(),
    ),
    template: S.optional(SensitiveString),
    templateType: S.optional(JobTemplateType),
    priority: S.Number,
    parameters: S.optional(JobParameters),
    attachments: S.optional(Attachments),
    storageProfileId: S.optional(S.String),
    targetTaskRunStatus: S.optional(CreateJobTargetTaskRunStatus),
    maxFailedTasksCount: S.optional(S.Number),
    maxRetriesPerTask: S.optional(S.Number),
    maxWorkerCount: S.optional(S.Number),
    sourceJobId: S.optional(S.String),
    nameOverride: S.optional(S.String),
    descriptionOverride: S.optional(SensitiveString),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateJobRequest",
}) as any as S.Schema<CreateJobRequest>;
export interface CreateJobResponse {
  jobId: string;
}
export const CreateJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String }),
).annotate({
  identifier: "CreateJobResponse",
}) as any as S.Schema<CreateJobResponse>;
export type VpcId = string;
export type SubnetId = string;
export type SubnetIdList = string[];
export const SubnetIdList = /*@__PURE__*/ S.Array(S.String);
export type SecurityGroupId = string;
export type SecurityGroupIdList = string[];
export const SecurityGroupIdList = /*@__PURE__*/ S.Array(S.String);
export interface CreateLicenseEndpointRequest {
  clientToken?: string;
  vpcId: string;
  subnetIds: string[];
  securityGroupIds: string[];
  tags?: { [key: string]: string | undefined };
}
export const CreateLicenseEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Client-Token"),
      T.IdempotencyToken(),
    ),
    vpcId: S.String,
    subnetIds: SubnetIdList,
    securityGroupIds: SecurityGroupIdList,
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2023-10-12/license-endpoints" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateLicenseEndpointRequest",
}) as any as S.Schema<CreateLicenseEndpointRequest>;
export type LicenseEndpointId = string;
export interface CreateLicenseEndpointResponse {
  licenseEndpointId: string;
}
export const CreateLicenseEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ licenseEndpointId: S.String }),
).annotate({
  identifier: "CreateLicenseEndpointResponse",
}) as any as S.Schema<CreateLicenseEndpointResponse>;
export type AmountRequirementName = string;
export type MaxCount = number;
export interface CreateLimitRequest {
  farmId: string;
  clientToken?: string;
  displayName: string;
  amountRequirementName: string;
  maxCount: number;
  description?: string | redacted.Redacted<string>;
}
export const CreateLimitRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Client-Token"),
      T.IdempotencyToken(),
    ),
    displayName: S.String,
    amountRequirementName: S.String,
    maxCount: S.Number,
    description: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2023-10-12/farms/{farmId}/limits" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateLimitRequest",
}) as any as S.Schema<CreateLimitRequest>;
export interface CreateLimitResponse {
  limitId: string;
}
export const CreateLimitResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ limitId: S.String }),
).annotate({
  identifier: "CreateLimitResponse",
}) as any as S.Schema<CreateLimitResponse>;
export type IdentityCenterInstanceArn = string;
export type Subdomain = string;
export interface CreateMonitorRequest {
  clientToken?: string;
  displayName: string;
  identityCenterInstanceArn: string;
  identityCenterRegion?: string;
  subdomain: string;
  roleArn: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateMonitorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Client-Token"),
      T.IdempotencyToken(),
    ),
    displayName: S.String,
    identityCenterInstanceArn: S.String,
    identityCenterRegion: S.optional(S.String),
    subdomain: S.String,
    roleArn: S.String,
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2023-10-12/monitors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMonitorRequest",
}) as any as S.Schema<CreateMonitorRequest>;
export type MonitorId = string;
export type IdentityCenterApplicationArn = string;
export interface CreateMonitorResponse {
  monitorId: string;
  identityCenterApplicationArn: string;
}
export const CreateMonitorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ monitorId: S.String, identityCenterApplicationArn: S.String }),
).annotate({
  identifier: "CreateMonitorResponse",
}) as any as S.Schema<CreateMonitorResponse>;
export type DefaultQueueBudgetAction =
  | "NONE"
  | "STOP_SCHEDULING_AND_COMPLETE_TASKS"
  | "STOP_SCHEDULING_AND_CANCEL_TASKS"
  | (string & {});
export const DefaultQueueBudgetAction = /*@__PURE__*/ S.String;

export type RequiredFileSystemLocationNames = string[];
export const RequiredFileSystemLocationNames = /*@__PURE__*/ S.Array(S.String);
export type AllowedStorageProfileIds = string[];
export const AllowedStorageProfileIds = /*@__PURE__*/ S.Array(S.String);
export interface PriorityFifoSchedulingConfiguration {}
export const PriorityFifoSchedulingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PriorityFifoSchedulingConfiguration",
}) as any as S.Schema<PriorityFifoSchedulingConfiguration>;
export type SchedulingRenderingTaskBuffer = number;
export interface PriorityBalancedSchedulingConfiguration {
  renderingTaskBuffer?: number;
}
export const PriorityBalancedSchedulingConfiguration = /*@__PURE__*/ S.suspend(
  () => S.Struct({ renderingTaskBuffer: S.optional(S.Number) }),
).annotate({
  identifier: "PriorityBalancedSchedulingConfiguration",
}) as any as S.Schema<PriorityBalancedSchedulingConfiguration>;
export type SchedulingPriorityWeight = number;
export type SchedulingErrorWeight = number;
export type SchedulingSubmissionTimeWeight = number;
export type SchedulingRenderingTaskWeight = number;
export interface SchedulingMaxPriorityOverrideAlwaysScheduleFirst {}
export const SchedulingMaxPriorityOverrideAlwaysScheduleFirst =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "SchedulingMaxPriorityOverrideAlwaysScheduleFirst",
  }) as any as S.Schema<SchedulingMaxPriorityOverrideAlwaysScheduleFirst>;
export type SchedulingMaxPriorityOverride = {
  alwaysScheduleFirst: SchedulingMaxPriorityOverrideAlwaysScheduleFirst;
};
export const SchedulingMaxPriorityOverride = /*@__PURE__*/ S.Union([
  S.Struct({
    alwaysScheduleFirst: SchedulingMaxPriorityOverrideAlwaysScheduleFirst,
  }),
]);
export interface SchedulingMinPriorityOverrideAlwaysScheduleLast {}
export const SchedulingMinPriorityOverrideAlwaysScheduleLast =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "SchedulingMinPriorityOverrideAlwaysScheduleLast",
  }) as any as S.Schema<SchedulingMinPriorityOverrideAlwaysScheduleLast>;
export type SchedulingMinPriorityOverride = {
  alwaysScheduleLast: SchedulingMinPriorityOverrideAlwaysScheduleLast;
};
export const SchedulingMinPriorityOverride = /*@__PURE__*/ S.Union([
  S.Struct({
    alwaysScheduleLast: SchedulingMinPriorityOverrideAlwaysScheduleLast,
  }),
]);
export interface WeightedBalancedSchedulingConfiguration {
  priorityWeight?: number;
  errorWeight?: number;
  submissionTimeWeight?: number;
  renderingTaskWeight?: number;
  renderingTaskBuffer?: number;
  maxPriorityOverride?: SchedulingMaxPriorityOverride;
  minPriorityOverride?: SchedulingMinPriorityOverride;
}
export const WeightedBalancedSchedulingConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      priorityWeight: S.optional(S.Number),
      errorWeight: S.optional(S.Number),
      submissionTimeWeight: S.optional(S.Number),
      renderingTaskWeight: S.optional(S.Number),
      renderingTaskBuffer: S.optional(S.Number),
      maxPriorityOverride: S.optional(SchedulingMaxPriorityOverride),
      minPriorityOverride: S.optional(SchedulingMinPriorityOverride),
    }),
).annotate({
  identifier: "WeightedBalancedSchedulingConfiguration",
}) as any as S.Schema<WeightedBalancedSchedulingConfiguration>;
export type SchedulingConfiguration =
  | {
      priorityFifo: PriorityFifoSchedulingConfiguration;
      priorityBalanced?: never;
      weightedBalanced?: never;
    }
  | {
      priorityFifo?: never;
      priorityBalanced: PriorityBalancedSchedulingConfiguration;
      weightedBalanced?: never;
    }
  | {
      priorityFifo?: never;
      priorityBalanced?: never;
      weightedBalanced: WeightedBalancedSchedulingConfiguration;
    };
export const SchedulingConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ priorityFifo: PriorityFifoSchedulingConfiguration }),
  S.Struct({ priorityBalanced: PriorityBalancedSchedulingConfiguration }),
  S.Struct({ weightedBalanced: WeightedBalancedSchedulingConfiguration }),
]);
export interface CreateQueueRequest {
  farmId: string;
  clientToken?: string;
  displayName: string;
  description?: string | redacted.Redacted<string>;
  defaultBudgetAction?: DefaultQueueBudgetAction;
  jobAttachmentSettings?: JobAttachmentSettings;
  roleArn?: string;
  jobRunAsUser?: JobRunAsUser;
  requiredFileSystemLocationNames?: string[];
  allowedStorageProfileIds?: string[];
  tags?: { [key: string]: string | undefined };
  schedulingConfiguration?: SchedulingConfiguration;
}
export const CreateQueueRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Client-Token"),
      T.IdempotencyToken(),
    ),
    displayName: S.String,
    description: S.optional(SensitiveString),
    defaultBudgetAction: S.optional(DefaultQueueBudgetAction),
    jobAttachmentSettings: S.optional(JobAttachmentSettings),
    roleArn: S.optional(S.String),
    jobRunAsUser: S.optional(JobRunAsUser),
    requiredFileSystemLocationNames: S.optional(
      RequiredFileSystemLocationNames,
    ),
    allowedStorageProfileIds: S.optional(AllowedStorageProfileIds),
    tags: S.optional(Tags),
    schedulingConfiguration: S.optional(SchedulingConfiguration),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2023-10-12/farms/{farmId}/queues" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateQueueRequest",
}) as any as S.Schema<CreateQueueRequest>;
export interface CreateQueueResponse {
  queueId: string;
}
export const CreateQueueResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ queueId: S.String }),
).annotate({
  identifier: "CreateQueueResponse",
}) as any as S.Schema<CreateQueueResponse>;
export type Priority = number;
export type EnvironmentTemplateType = "JSON" | "YAML" | (string & {});
export const EnvironmentTemplateType = /*@__PURE__*/ S.String;

export type EnvironmentTemplate = string | redacted.Redacted<string>;
export interface CreateQueueEnvironmentRequest {
  farmId: string;
  queueId: string;
  clientToken?: string;
  priority: number;
  templateType: EnvironmentTemplateType;
  template: string | redacted.Redacted<string>;
}
export const CreateQueueEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Client-Token"),
      T.IdempotencyToken(),
    ),
    priority: S.Number,
    templateType: EnvironmentTemplateType,
    template: SensitiveString,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/environments",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateQueueEnvironmentRequest",
}) as any as S.Schema<CreateQueueEnvironmentRequest>;
export type QueueEnvironmentId = string;
export interface CreateQueueEnvironmentResponse {
  queueEnvironmentId: string;
}
export const CreateQueueEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ queueEnvironmentId: S.String }),
).annotate({
  identifier: "CreateQueueEnvironmentResponse",
}) as any as S.Schema<CreateQueueEnvironmentResponse>;
export interface CreateQueueFleetAssociationRequest {
  farmId: string;
  queueId: string;
  fleetId: string;
}
export const CreateQueueFleetAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String,
    fleetId: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2023-10-12/farms/{farmId}/queue-fleet-associations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateQueueFleetAssociationRequest",
}) as any as S.Schema<CreateQueueFleetAssociationRequest>;
export interface CreateQueueFleetAssociationResponse {}
export const CreateQueueFleetAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateQueueFleetAssociationResponse",
}) as any as S.Schema<CreateQueueFleetAssociationResponse>;
export interface CreateQueueLimitAssociationRequest {
  farmId: string;
  queueId: string;
  limitId: string;
}
export const CreateQueueLimitAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String,
    limitId: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2023-10-12/farms/{farmId}/queue-limit-associations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateQueueLimitAssociationRequest",
}) as any as S.Schema<CreateQueueLimitAssociationRequest>;
export interface CreateQueueLimitAssociationResponse {}
export const CreateQueueLimitAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateQueueLimitAssociationResponse",
}) as any as S.Schema<CreateQueueLimitAssociationResponse>;
export type StorageProfileOperatingSystemFamily =
  | "WINDOWS"
  | "LINUX"
  | "MACOS"
  | (string & {});
export const StorageProfileOperatingSystemFamily = /*@__PURE__*/ S.String;

export type FileSystemLocationType = "SHARED" | "LOCAL" | (string & {});
export const FileSystemLocationType = /*@__PURE__*/ S.String;

export interface FileSystemLocation {
  name: string;
  path: string;
  type: FileSystemLocationType;
}
export const FileSystemLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, path: S.String, type: FileSystemLocationType }),
).annotate({
  identifier: "FileSystemLocation",
}) as any as S.Schema<FileSystemLocation>;
export type FileSystemLocationsList = FileSystemLocation[];
export const FileSystemLocationsList =
  /*@__PURE__*/ S.Array(FileSystemLocation);
export interface CreateStorageProfileRequest {
  farmId: string;
  clientToken?: string;
  displayName: string;
  osFamily: StorageProfileOperatingSystemFamily;
  fileSystemLocations?: FileSystemLocation[];
}
export const CreateStorageProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Client-Token"),
      T.IdempotencyToken(),
    ),
    displayName: S.String,
    osFamily: StorageProfileOperatingSystemFamily,
    fileSystemLocations: S.optional(FileSystemLocationsList),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/2023-10-12/farms/{farmId}/storage-profiles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateStorageProfileRequest",
}) as any as S.Schema<CreateStorageProfileRequest>;
export interface CreateStorageProfileResponse {
  storageProfileId: string;
}
export const CreateStorageProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ storageProfileId: S.String }),
).annotate({
  identifier: "CreateStorageProfileResponse",
}) as any as S.Schema<CreateStorageProfileResponse>;
export interface HostPropertiesRequest {
  ipAddresses?: IpAddresses;
  hostName?: string;
}
export const HostPropertiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ipAddresses: S.optional(IpAddresses),
    hostName: S.optional(S.String),
  }),
).annotate({
  identifier: "HostPropertiesRequest",
}) as any as S.Schema<HostPropertiesRequest>;
export interface CreateWorkerRequest {
  farmId: string;
  fleetId: string;
  hostProperties?: HostPropertiesRequest;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateWorkerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    fleetId: S.String.pipe(T.HttpLabel("fleetId")),
    hostProperties: S.optional(HostPropertiesRequest),
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Client-Token"),
      T.IdempotencyToken(),
    ),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/workers",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateWorkerRequest",
}) as any as S.Schema<CreateWorkerRequest>;
export interface CreateWorkerResponse {
  workerId: string;
}
export const CreateWorkerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workerId: S.String }),
).annotate({
  identifier: "CreateWorkerResponse",
}) as any as S.Schema<CreateWorkerResponse>;
export interface DeleteBudgetRequest {
  farmId: string;
  budgetId: string;
}
export const DeleteBudgetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    budgetId: S.String.pipe(T.HttpLabel("budgetId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2023-10-12/farms/{farmId}/budgets/{budgetId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBudgetRequest",
}) as any as S.Schema<DeleteBudgetRequest>;
export interface DeleteBudgetResponse {}
export const DeleteBudgetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteBudgetResponse",
}) as any as S.Schema<DeleteBudgetResponse>;
export interface DeleteFarmRequest {
  farmId: string;
}
export const DeleteFarmRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ farmId: S.String.pipe(T.HttpLabel("farmId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/2023-10-12/farms/{farmId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFarmRequest",
}) as any as S.Schema<DeleteFarmRequest>;
export interface DeleteFarmResponse {}
export const DeleteFarmResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteFarmResponse",
}) as any as S.Schema<DeleteFarmResponse>;
export interface DeleteFleetRequest {
  farmId: string;
  fleetId: string;
  clientToken?: string;
}
export const DeleteFleetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    fleetId: S.String.pipe(T.HttpLabel("fleetId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Client-Token"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFleetRequest",
}) as any as S.Schema<DeleteFleetRequest>;
export interface DeleteFleetResponse {}
export const DeleteFleetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteFleetResponse",
}) as any as S.Schema<DeleteFleetResponse>;
export interface DeleteLicenseEndpointRequest {
  licenseEndpointId: string;
}
export const DeleteLicenseEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    licenseEndpointId: S.String.pipe(T.HttpLabel("licenseEndpointId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2023-10-12/license-endpoints/{licenseEndpointId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLicenseEndpointRequest",
}) as any as S.Schema<DeleteLicenseEndpointRequest>;
export interface DeleteLicenseEndpointResponse {}
export const DeleteLicenseEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteLicenseEndpointResponse",
}) as any as S.Schema<DeleteLicenseEndpointResponse>;
export interface DeleteLimitRequest {
  farmId: string;
  limitId: string;
}
export const DeleteLimitRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    limitId: S.String.pipe(T.HttpLabel("limitId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2023-10-12/farms/{farmId}/limits/{limitId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLimitRequest",
}) as any as S.Schema<DeleteLimitRequest>;
export interface DeleteLimitResponse {}
export const DeleteLimitResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteLimitResponse",
}) as any as S.Schema<DeleteLimitResponse>;
export type MeteredProductId = string;
export interface DeleteMeteredProductRequest {
  licenseEndpointId: string;
  productId: string;
}
export const DeleteMeteredProductRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    licenseEndpointId: S.String.pipe(T.HttpLabel("licenseEndpointId")),
    productId: S.String.pipe(T.HttpLabel("productId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2023-10-12/license-endpoints/{licenseEndpointId}/metered-products/{productId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMeteredProductRequest",
}) as any as S.Schema<DeleteMeteredProductRequest>;
export interface DeleteMeteredProductResponse {}
export const DeleteMeteredProductResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMeteredProductResponse",
}) as any as S.Schema<DeleteMeteredProductResponse>;
export interface DeleteMonitorRequest {
  monitorId: string;
}
export const DeleteMonitorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ monitorId: S.String.pipe(T.HttpLabel("monitorId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/2023-10-12/monitors/{monitorId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMonitorRequest",
}) as any as S.Schema<DeleteMonitorRequest>;
export interface DeleteMonitorResponse {}
export const DeleteMonitorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMonitorResponse",
}) as any as S.Schema<DeleteMonitorResponse>;
export interface DeleteQueueRequest {
  farmId: string;
  queueId: string;
}
export const DeleteQueueRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteQueueRequest",
}) as any as S.Schema<DeleteQueueRequest>;
export interface DeleteQueueResponse {}
export const DeleteQueueResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteQueueResponse",
}) as any as S.Schema<DeleteQueueResponse>;
export interface DeleteQueueEnvironmentRequest {
  farmId: string;
  queueId: string;
  queueEnvironmentId: string;
}
export const DeleteQueueEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    queueEnvironmentId: S.String.pipe(T.HttpLabel("queueEnvironmentId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/environments/{queueEnvironmentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteQueueEnvironmentRequest",
}) as any as S.Schema<DeleteQueueEnvironmentRequest>;
export interface DeleteQueueEnvironmentResponse {}
export const DeleteQueueEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteQueueEnvironmentResponse",
}) as any as S.Schema<DeleteQueueEnvironmentResponse>;
export interface DeleteQueueFleetAssociationRequest {
  farmId: string;
  queueId: string;
  fleetId: string;
}
export const DeleteQueueFleetAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    fleetId: S.String.pipe(T.HttpLabel("fleetId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2023-10-12/farms/{farmId}/queue-fleet-associations/{queueId}/{fleetId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteQueueFleetAssociationRequest",
}) as any as S.Schema<DeleteQueueFleetAssociationRequest>;
export interface DeleteQueueFleetAssociationResponse {}
export const DeleteQueueFleetAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteQueueFleetAssociationResponse",
}) as any as S.Schema<DeleteQueueFleetAssociationResponse>;
export interface DeleteQueueLimitAssociationRequest {
  farmId: string;
  queueId: string;
  limitId: string;
}
export const DeleteQueueLimitAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    limitId: S.String.pipe(T.HttpLabel("limitId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2023-10-12/farms/{farmId}/queue-limit-associations/{queueId}/{limitId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteQueueLimitAssociationRequest",
}) as any as S.Schema<DeleteQueueLimitAssociationRequest>;
export interface DeleteQueueLimitAssociationResponse {}
export const DeleteQueueLimitAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteQueueLimitAssociationResponse",
}) as any as S.Schema<DeleteQueueLimitAssociationResponse>;
export interface DeleteStorageProfileRequest {
  farmId: string;
  storageProfileId: string;
}
export const DeleteStorageProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    storageProfileId: S.String.pipe(T.HttpLabel("storageProfileId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2023-10-12/farms/{farmId}/storage-profiles/{storageProfileId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteStorageProfileRequest",
}) as any as S.Schema<DeleteStorageProfileRequest>;
export interface DeleteStorageProfileResponse {}
export const DeleteStorageProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteStorageProfileResponse",
}) as any as S.Schema<DeleteStorageProfileResponse>;
export type VolumeId = string;
export interface DeleteVolumeRequest {
  farmId: string;
  fleetId: string;
  volumeId: string;
}
export const DeleteVolumeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    fleetId: S.String.pipe(T.HttpLabel("fleetId")),
    volumeId: S.String.pipe(T.HttpLabel("volumeId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/volumes/{volumeId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVolumeRequest",
}) as any as S.Schema<DeleteVolumeRequest>;
export interface DeleteVolumeResponse {}
export const DeleteVolumeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteVolumeResponse",
}) as any as S.Schema<DeleteVolumeResponse>;
export interface DeleteWorkerRequest {
  farmId: string;
  fleetId: string;
  workerId: string;
}
export const DeleteWorkerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    fleetId: S.String.pipe(T.HttpLabel("fleetId")),
    workerId: S.String.pipe(T.HttpLabel("workerId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/workers/{workerId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteWorkerRequest",
}) as any as S.Schema<DeleteWorkerRequest>;
export interface DeleteWorkerResponse {}
export const DeleteWorkerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteWorkerResponse",
}) as any as S.Schema<DeleteWorkerResponse>;
export interface DisassociateMemberFromFarmRequest {
  farmId: string;
  principalId: string;
}
export const DisassociateMemberFromFarmRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    principalId: S.String.pipe(T.HttpLabel("principalId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2023-10-12/farms/{farmId}/members/{principalId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateMemberFromFarmRequest",
}) as any as S.Schema<DisassociateMemberFromFarmRequest>;
export interface DisassociateMemberFromFarmResponse {}
export const DisassociateMemberFromFarmResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateMemberFromFarmResponse",
}) as any as S.Schema<DisassociateMemberFromFarmResponse>;
export interface DisassociateMemberFromFleetRequest {
  farmId: string;
  fleetId: string;
  principalId: string;
}
export const DisassociateMemberFromFleetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    fleetId: S.String.pipe(T.HttpLabel("fleetId")),
    principalId: S.String.pipe(T.HttpLabel("principalId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/members/{principalId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateMemberFromFleetRequest",
}) as any as S.Schema<DisassociateMemberFromFleetRequest>;
export interface DisassociateMemberFromFleetResponse {}
export const DisassociateMemberFromFleetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateMemberFromFleetResponse",
}) as any as S.Schema<DisassociateMemberFromFleetResponse>;
export interface DisassociateMemberFromJobRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  principalId: string;
}
export const DisassociateMemberFromJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    principalId: S.String.pipe(T.HttpLabel("principalId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/members/{principalId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateMemberFromJobRequest",
}) as any as S.Schema<DisassociateMemberFromJobRequest>;
export interface DisassociateMemberFromJobResponse {}
export const DisassociateMemberFromJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateMemberFromJobResponse",
}) as any as S.Schema<DisassociateMemberFromJobResponse>;
export interface DisassociateMemberFromQueueRequest {
  farmId: string;
  queueId: string;
  principalId: string;
}
export const DisassociateMemberFromQueueRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    principalId: S.String.pipe(T.HttpLabel("principalId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/members/{principalId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateMemberFromQueueRequest",
}) as any as S.Schema<DisassociateMemberFromQueueRequest>;
export interface DisassociateMemberFromQueueResponse {}
export const DisassociateMemberFromQueueResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateMemberFromQueueResponse",
}) as any as S.Schema<DisassociateMemberFromQueueResponse>;
export interface GetBudgetRequest {
  farmId: string;
  budgetId: string;
}
export const GetBudgetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    budgetId: S.String.pipe(T.HttpLabel("budgetId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/budgets/{budgetId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBudgetRequest",
}) as any as S.Schema<GetBudgetRequest>;
export type BudgetStatus = "ACTIVE" | "INACTIVE" | (string & {});
export const BudgetStatus = /*@__PURE__*/ S.String;

export interface ConsumedUsages {
  approximateDollarUsage: number;
}
export const ConsumedUsages = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ approximateDollarUsage: S.Number }),
).annotate({ identifier: "ConsumedUsages" }) as any as S.Schema<ConsumedUsages>;
export interface ResponseBudgetAction {
  type: BudgetActionType;
  thresholdPercentage: number;
  description?: string | redacted.Redacted<string>;
}
export const ResponseBudgetAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: BudgetActionType,
    thresholdPercentage: S.Number,
    description: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ResponseBudgetAction",
}) as any as S.Schema<ResponseBudgetAction>;
export type ResponseBudgetActionList = ResponseBudgetAction[];
export const ResponseBudgetActionList =
  /*@__PURE__*/ S.Array(ResponseBudgetAction);
export interface GetBudgetResponse {
  budgetId: string;
  usageTrackingResource: UsageTrackingResource;
  status: BudgetStatus;
  displayName: string;
  approximateDollarLimit: number;
  usages: ConsumedUsages;
  createdBy: string;
  createdAt: Date;
  updatedBy?: string;
  updatedAt?: Date;
  description?: string | redacted.Redacted<string>;
  actions: ResponseBudgetAction[];
  schedule: BudgetSchedule;
  queueStoppedAt?: Date;
}
export const GetBudgetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    budgetId: S.String,
    usageTrackingResource: UsageTrackingResource,
    status: BudgetStatus,
    displayName: S.String,
    approximateDollarLimit: S.Number,
    usages: ConsumedUsages,
    createdBy: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedBy: S.optional(S.String),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    description: S.optional(SensitiveString),
    actions: ResponseBudgetActionList,
    schedule: BudgetSchedule,
    queueStoppedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetBudgetResponse",
}) as any as S.Schema<GetBudgetResponse>;
export interface GetFarmRequest {
  farmId: string;
}
export const GetFarmRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ farmId: S.String.pipe(T.HttpLabel("farmId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2023-10-12/farms/{farmId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetFarmRequest" }) as any as S.Schema<GetFarmRequest>;
export interface GetFarmResponse {
  farmId: string;
  displayName: string;
  kmsKeyArn?: string;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  description?: string | redacted.Redacted<string>;
  costScaleFactor: number;
}
export const GetFarmResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    displayName: S.String,
    kmsKeyArn: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    description: S.optional(SensitiveString),
    costScaleFactor: S.Number,
  }),
).annotate({
  identifier: "GetFarmResponse",
}) as any as S.Schema<GetFarmResponse>;
export interface GetFleetRequest {
  farmId: string;
  fleetId: string;
}
export const GetFleetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    fleetId: S.String.pipe(T.HttpLabel("fleetId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFleetRequest",
}) as any as S.Schema<GetFleetRequest>;
export type FleetStatus =
  | "ACTIVE"
  | "CREATE_IN_PROGRESS"
  | "UPDATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | "SUSPENDED"
  | (string & {});
export const FleetStatus = /*@__PURE__*/ S.String;

export type AutoScalingStatus =
  | "GROWING"
  | "STEADY"
  | "SHRINKING"
  | (string & {});
export const AutoScalingStatus = /*@__PURE__*/ S.String;

export type FleetAmountCapabilities = FleetAmountCapability[];
export const FleetAmountCapabilities = /*@__PURE__*/ S.Array(
  FleetAmountCapability,
);
export type FleetAttributeCapabilities = FleetAttributeCapability[];
export const FleetAttributeCapabilities = /*@__PURE__*/ S.Array(
  FleetAttributeCapability,
);
export interface FleetCapabilities {
  amounts?: FleetAmountCapability[];
  attributes?: FleetAttributeCapability[];
}
export const FleetCapabilities = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    amounts: S.optional(FleetAmountCapabilities),
    attributes: S.optional(FleetAttributeCapabilities),
  }),
).annotate({
  identifier: "FleetCapabilities",
}) as any as S.Schema<FleetCapabilities>;
export interface GetFleetResponse {
  fleetId: string;
  farmId: string;
  displayName: string;
  status: FleetStatus;
  statusMessage?: string;
  autoScalingStatus?: AutoScalingStatus;
  targetWorkerCount?: number;
  workerCount: number;
  minWorkerCount: number;
  maxWorkerCount: number;
  configuration: FleetConfiguration;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  description?: string | redacted.Redacted<string>;
  hostConfiguration?: HostConfiguration;
  capabilities?: FleetCapabilities;
  roleArn: string;
}
export const GetFleetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fleetId: S.String,
    farmId: S.String,
    displayName: S.String,
    status: FleetStatus,
    statusMessage: S.optional(S.String),
    autoScalingStatus: S.optional(AutoScalingStatus),
    targetWorkerCount: S.optional(S.Number),
    workerCount: S.Number,
    minWorkerCount: S.Number,
    maxWorkerCount: S.Number,
    configuration: FleetConfiguration,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    description: S.optional(SensitiveString),
    hostConfiguration: S.optional(HostConfiguration),
    capabilities: S.optional(FleetCapabilities),
    roleArn: S.String,
  }),
).annotate({
  identifier: "GetFleetResponse",
}) as any as S.Schema<GetFleetResponse>;
export interface GetJobRequest {
  farmId: string;
  queueId: string;
  jobId: string;
}
export const GetJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetJobRequest" }) as any as S.Schema<GetJobRequest>;
export interface GetJobResponse {
  jobId: string;
  name: string;
  lifecycleStatus: JobLifecycleStatus;
  lifecycleStatusMessage: string;
  priority: number;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  startedAt?: Date;
  endedAt?: Date;
  taskRunStatus?: TaskRunStatus;
  targetTaskRunStatus?: JobTargetTaskRunStatus;
  taskRunStatusCounts?: { [key: string]: number | undefined };
  taskFailureRetryCount?: number;
  storageProfileId?: string;
  maxFailedTasksCount?: number;
  maxRetriesPerTask?: number;
  parameters?: { [key: string]: JobParameter | undefined };
  attachments?: Attachments;
  description?: string | redacted.Redacted<string>;
  maxWorkerCount?: number;
  sourceJobId?: string;
}
export const GetJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String,
    name: S.String,
    lifecycleStatus: JobLifecycleStatus,
    lifecycleStatusMessage: S.String,
    priority: S.Number,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    startedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    taskRunStatus: S.optional(TaskRunStatus),
    targetTaskRunStatus: S.optional(JobTargetTaskRunStatus),
    taskRunStatusCounts: S.optional(TaskRunStatusCounts),
    taskFailureRetryCount: S.optional(S.Number),
    storageProfileId: S.optional(S.String),
    maxFailedTasksCount: S.optional(S.Number),
    maxRetriesPerTask: S.optional(S.Number),
    parameters: S.optional(JobParameters),
    attachments: S.optional(Attachments),
    description: S.optional(SensitiveString),
    maxWorkerCount: S.optional(S.Number),
    sourceJobId: S.optional(S.String),
  }),
).annotate({ identifier: "GetJobResponse" }) as any as S.Schema<GetJobResponse>;
export interface GetLicenseEndpointRequest {
  licenseEndpointId: string;
}
export const GetLicenseEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    licenseEndpointId: S.String.pipe(T.HttpLabel("licenseEndpointId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/license-endpoints/{licenseEndpointId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLicenseEndpointRequest",
}) as any as S.Schema<GetLicenseEndpointRequest>;
export type LicenseEndpointStatus =
  | "CREATE_IN_PROGRESS"
  | "DELETE_IN_PROGRESS"
  | "READY"
  | "NOT_READY"
  | (string & {});
export const LicenseEndpointStatus = /*@__PURE__*/ S.String;

export type StatusMessage = string;
export type DnsName = string;
export interface GetLicenseEndpointResponse {
  licenseEndpointId: string;
  status: LicenseEndpointStatus;
  statusMessage: string;
  vpcId?: string;
  dnsName?: string;
  subnetIds?: string[];
  securityGroupIds?: string[];
}
export const GetLicenseEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    licenseEndpointId: S.String,
    status: LicenseEndpointStatus,
    statusMessage: S.String,
    vpcId: S.optional(S.String),
    dnsName: S.optional(S.String),
    subnetIds: S.optional(SubnetIdList),
    securityGroupIds: S.optional(SecurityGroupIdList),
  }),
).annotate({
  identifier: "GetLicenseEndpointResponse",
}) as any as S.Schema<GetLicenseEndpointResponse>;
export interface GetLimitRequest {
  farmId: string;
  limitId: string;
}
export const GetLimitRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    limitId: S.String.pipe(T.HttpLabel("limitId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/limits/{limitId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLimitRequest",
}) as any as S.Schema<GetLimitRequest>;
export interface GetLimitResponse {
  farmId: string;
  limitId: string;
  currentCount: number;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  displayName: string;
  amountRequirementName: string;
  maxCount: number;
  description?: string | redacted.Redacted<string>;
}
export const GetLimitResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    limitId: S.String,
    currentCount: S.Number,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    displayName: S.String,
    amountRequirementName: S.String,
    maxCount: S.Number,
    description: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "GetLimitResponse",
}) as any as S.Schema<GetLimitResponse>;
export interface GetMonitorRequest {
  monitorId: string;
}
export const GetMonitorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ monitorId: S.String.pipe(T.HttpLabel("monitorId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2023-10-12/monitors/{monitorId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMonitorRequest",
}) as any as S.Schema<GetMonitorRequest>;
export type Url = string;
export interface GetMonitorResponse {
  monitorId: string;
  displayName: string;
  subdomain: string;
  url: string;
  roleArn: string;
  identityCenterInstanceArn: string;
  identityCenterRegion?: string;
  identityCenterApplicationArn: string;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export const GetMonitorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    monitorId: S.String,
    displayName: S.String,
    subdomain: S.String,
    url: S.String,
    roleArn: S.String,
    identityCenterInstanceArn: S.String,
    identityCenterRegion: S.optional(S.String),
    identityCenterApplicationArn: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "GetMonitorResponse",
}) as any as S.Schema<GetMonitorResponse>;
export interface GetMonitorSettingsRequest {
  monitorId: string;
}
export const GetMonitorSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ monitorId: S.String.pipe(T.HttpLabel("monitorId")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/monitors/{monitorId}/settings",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMonitorSettingsRequest",
}) as any as S.Schema<GetMonitorSettingsRequest>;
export type SettingKey = string;
export type SettingValue = string;
export type SettingsMap = { [key: string]: string | undefined };
export const SettingsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface GetMonitorSettingsResponse {
  settings: { [key: string]: string | undefined };
}
export const GetMonitorSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ settings: SettingsMap }),
).annotate({
  identifier: "GetMonitorSettingsResponse",
}) as any as S.Schema<GetMonitorSettingsResponse>;
export interface GetQueueRequest {
  farmId: string;
  queueId: string;
}
export const GetQueueRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetQueueRequest",
}) as any as S.Schema<GetQueueRequest>;
export type QueueStatus =
  | "IDLE"
  | "SCHEDULING"
  | "SCHEDULING_BLOCKED"
  | (string & {});
export const QueueStatus = /*@__PURE__*/ S.String;

export type QueueBlockedReason =
  | "NO_BUDGET_CONFIGURED"
  | "BUDGET_THRESHOLD_REACHED"
  | (string & {});
export const QueueBlockedReason = /*@__PURE__*/ S.String;

export interface GetQueueResponse {
  farmId: string;
  queueId: string;
  displayName: string;
  status: QueueStatus;
  defaultBudgetAction: DefaultQueueBudgetAction;
  blockedReason?: QueueBlockedReason;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  description?: string | redacted.Redacted<string>;
  jobAttachmentSettings?: JobAttachmentSettings;
  roleArn?: string;
  requiredFileSystemLocationNames?: string[];
  allowedStorageProfileIds?: string[];
  jobRunAsUser?: JobRunAsUser;
  schedulingConfiguration?: SchedulingConfiguration;
}
export const GetQueueResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    queueId: S.String,
    displayName: S.String,
    status: QueueStatus,
    defaultBudgetAction: DefaultQueueBudgetAction,
    blockedReason: S.optional(QueueBlockedReason),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    description: S.optional(SensitiveString),
    jobAttachmentSettings: S.optional(JobAttachmentSettings),
    roleArn: S.optional(S.String),
    requiredFileSystemLocationNames: S.optional(
      RequiredFileSystemLocationNames,
    ),
    allowedStorageProfileIds: S.optional(AllowedStorageProfileIds),
    jobRunAsUser: S.optional(JobRunAsUser),
    schedulingConfiguration: S.optional(SchedulingConfiguration),
  }),
).annotate({
  identifier: "GetQueueResponse",
}) as any as S.Schema<GetQueueResponse>;
export interface GetQueueEnvironmentRequest {
  farmId: string;
  queueId: string;
  queueEnvironmentId: string;
}
export const GetQueueEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    queueEnvironmentId: S.String.pipe(T.HttpLabel("queueEnvironmentId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/environments/{queueEnvironmentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetQueueEnvironmentRequest",
}) as any as S.Schema<GetQueueEnvironmentRequest>;
export type EnvironmentName = string;
export interface GetQueueEnvironmentResponse {
  queueEnvironmentId: string;
  name: string;
  priority: number;
  templateType: EnvironmentTemplateType;
  template: string | redacted.Redacted<string>;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export const GetQueueEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queueEnvironmentId: S.String,
    name: S.String,
    priority: S.Number,
    templateType: EnvironmentTemplateType,
    template: SensitiveString,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "GetQueueEnvironmentResponse",
}) as any as S.Schema<GetQueueEnvironmentResponse>;
export interface GetQueueFleetAssociationRequest {
  farmId: string;
  queueId: string;
  fleetId: string;
}
export const GetQueueFleetAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    fleetId: S.String.pipe(T.HttpLabel("fleetId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/queue-fleet-associations/{queueId}/{fleetId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetQueueFleetAssociationRequest",
}) as any as S.Schema<GetQueueFleetAssociationRequest>;
export type QueueFleetAssociationStatus =
  | "ACTIVE"
  | "STOP_SCHEDULING_AND_COMPLETE_TASKS"
  | "STOP_SCHEDULING_AND_CANCEL_TASKS"
  | "STOPPED"
  | (string & {});
export const QueueFleetAssociationStatus = /*@__PURE__*/ S.String;

export interface GetQueueFleetAssociationResponse {
  queueId: string;
  fleetId: string;
  status: QueueFleetAssociationStatus;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export const GetQueueFleetAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queueId: S.String,
    fleetId: S.String,
    status: QueueFleetAssociationStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "GetQueueFleetAssociationResponse",
}) as any as S.Schema<GetQueueFleetAssociationResponse>;
export interface GetQueueLimitAssociationRequest {
  farmId: string;
  queueId: string;
  limitId: string;
}
export const GetQueueLimitAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    limitId: S.String.pipe(T.HttpLabel("limitId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/queue-limit-associations/{queueId}/{limitId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetQueueLimitAssociationRequest",
}) as any as S.Schema<GetQueueLimitAssociationRequest>;
export type QueueLimitAssociationStatus =
  | "ACTIVE"
  | "STOP_LIMIT_USAGE_AND_COMPLETE_TASKS"
  | "STOP_LIMIT_USAGE_AND_CANCEL_TASKS"
  | "STOPPED"
  | (string & {});
export const QueueLimitAssociationStatus = /*@__PURE__*/ S.String;

export interface GetQueueLimitAssociationResponse {
  queueId: string;
  limitId: string;
  status: QueueLimitAssociationStatus;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export const GetQueueLimitAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queueId: S.String,
    limitId: S.String,
    status: QueueLimitAssociationStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "GetQueueLimitAssociationResponse",
}) as any as S.Schema<GetQueueLimitAssociationResponse>;
export interface GetSessionRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  sessionId: string;
}
export const GetSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    sessionId: S.String.pipe(T.HttpLabel("sessionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/sessions/{sessionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSessionRequest",
}) as any as S.Schema<GetSessionRequest>;
export interface GetSessionResponse {
  sessionId: string;
  fleetId: string;
  workerId: string;
  startedAt: Date;
  lifecycleStatus: SessionLifecycleStatus;
  endedAt?: Date;
  targetLifecycleStatus?: SessionLifecycleTargetStatus;
  updatedAt?: Date;
  updatedBy?: string;
  log: LogConfiguration;
  hostProperties?: HostPropertiesResponse;
  workerLog?: LogConfiguration;
}
export const GetSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.String,
    fleetId: S.String,
    workerId: S.String,
    startedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lifecycleStatus: SessionLifecycleStatus,
    endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    targetLifecycleStatus: S.optional(SessionLifecycleTargetStatus),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    log: LogConfiguration,
    hostProperties: S.optional(HostPropertiesResponse),
    workerLog: S.optional(LogConfiguration),
  }),
).annotate({
  identifier: "GetSessionResponse",
}) as any as S.Schema<GetSessionResponse>;
export interface GetSessionActionRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  sessionActionId: string;
}
export const GetSessionActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    sessionActionId: S.String.pipe(T.HttpLabel("sessionActionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/session-actions/{sessionActionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSessionActionRequest",
}) as any as S.Schema<GetSessionActionRequest>;
export interface GetSessionActionResponse {
  sessionActionId: string;
  status: SessionActionStatus;
  startedAt?: Date;
  endedAt?: Date;
  workerUpdatedAt?: Date;
  progressPercent?: number;
  manifests?: TaskRunManifestPropertiesResponse[];
  sessionId: string;
  processExitCode?: number;
  progressMessage?: string | redacted.Redacted<string>;
  acquiredLimits?: AcquiredLimit[];
  definition: SessionActionDefinition;
}
export const GetSessionActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionActionId: S.String,
    status: SessionActionStatus,
    startedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    workerUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    progressPercent: S.optional(S.Number),
    manifests: S.optional(TaskRunManifestPropertiesListResponse),
    sessionId: S.String,
    processExitCode: S.optional(S.Number),
    progressMessage: S.optional(SensitiveString),
    acquiredLimits: S.optional(AcquiredLimits),
    definition: SessionActionDefinition,
  }),
).annotate({
  identifier: "GetSessionActionResponse",
}) as any as S.Schema<GetSessionActionResponse>;
export type NextToken = string;
export type MaxResults = number;
export type AggregationId = string;
export interface GetSessionsStatisticsAggregationRequest {
  farmId: string;
  nextToken?: string;
  maxResults?: number;
  aggregationId: string;
}
export const GetSessionsStatisticsAggregationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      farmId: S.String.pipe(T.HttpLabel("farmId")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      aggregationId: S.String.pipe(T.HttpQuery("aggregationId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/2023-10-12/farms/{farmId}/sessions-statistics-aggregation",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetSessionsStatisticsAggregationRequest",
}) as any as S.Schema<GetSessionsStatisticsAggregationRequest>;
export type UserId = string;
export type UsageType = "COMPUTE" | "LICENSE" | (string & {});
export const UsageType = /*@__PURE__*/ S.String;

export type LicenseProduct = string;
export interface Stats {
  min?: number;
  max?: number;
  avg?: number;
  sum?: number;
}
export const Stats = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    min: S.optional(S.Number),
    max: S.optional(S.Number),
    avg: S.optional(S.Number),
    sum: S.optional(S.Number),
  }),
).annotate({ identifier: "Stats" }) as any as S.Schema<Stats>;
export interface Statistics {
  queueId?: string;
  fleetId?: string;
  jobId?: string;
  jobName?: string;
  userId?: string;
  usageType?: UsageType;
  licenseProduct?: string;
  instanceType?: string;
  count: number;
  costInUsd: Stats;
  runtimeInSeconds: Stats;
  aggregationStartTime?: Date;
  aggregationEndTime?: Date;
}
export const Statistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queueId: S.optional(S.String),
    fleetId: S.optional(S.String),
    jobId: S.optional(S.String),
    jobName: S.optional(S.String),
    userId: S.optional(S.String),
    usageType: S.optional(UsageType),
    licenseProduct: S.optional(S.String),
    instanceType: S.optional(S.String),
    count: S.Number,
    costInUsd: Stats,
    runtimeInSeconds: Stats,
    aggregationStartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    aggregationEndTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "Statistics" }) as any as S.Schema<Statistics>;
export type StatisticsList = Statistics[];
export const StatisticsList = /*@__PURE__*/ S.Array(Statistics);
export type SessionsStatisticsAggregationStatus =
  | "IN_PROGRESS"
  | "TIMEOUT"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export const SessionsStatisticsAggregationStatus = /*@__PURE__*/ S.String;

export interface GetSessionsStatisticsAggregationResponse {
  statistics?: Statistics[];
  status: SessionsStatisticsAggregationStatus;
  statusMessage?: string;
  nextToken?: string;
}
export const GetSessionsStatisticsAggregationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      statistics: S.optional(StatisticsList),
      status: SessionsStatisticsAggregationStatus,
      statusMessage: S.optional(S.String),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "GetSessionsStatisticsAggregationResponse",
}) as any as S.Schema<GetSessionsStatisticsAggregationResponse>;
export interface GetStepRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
}
export const GetStepRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    stepId: S.String.pipe(T.HttpLabel("stepId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/steps/{stepId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetStepRequest" }) as any as S.Schema<GetStepRequest>;
export interface GetStepResponse {
  stepId: string;
  name: string;
  lifecycleStatus: StepLifecycleStatus;
  lifecycleStatusMessage?: string;
  taskRunStatus: TaskRunStatus;
  taskRunStatusCounts: { [key: string]: number | undefined };
  taskFailureRetryCount?: number;
  targetTaskRunStatus?: StepTargetTaskRunStatus;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  startedAt?: Date;
  endedAt?: Date;
  dependencyCounts?: DependencyCounts;
  requiredCapabilities?: StepRequiredCapabilities;
  parameterSpace?: ParameterSpace;
  description?: string | redacted.Redacted<string>;
}
export const GetStepResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stepId: S.String,
    name: S.String,
    lifecycleStatus: StepLifecycleStatus,
    lifecycleStatusMessage: S.optional(S.String),
    taskRunStatus: TaskRunStatus,
    taskRunStatusCounts: TaskRunStatusCounts,
    taskFailureRetryCount: S.optional(S.Number),
    targetTaskRunStatus: S.optional(StepTargetTaskRunStatus),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    startedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    dependencyCounts: S.optional(DependencyCounts),
    requiredCapabilities: S.optional(StepRequiredCapabilities),
    parameterSpace: S.optional(ParameterSpace),
    description: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "GetStepResponse",
}) as any as S.Schema<GetStepResponse>;
export interface GetStorageProfileRequest {
  farmId: string;
  storageProfileId: string;
}
export const GetStorageProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    storageProfileId: S.String.pipe(T.HttpLabel("storageProfileId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/storage-profiles/{storageProfileId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetStorageProfileRequest",
}) as any as S.Schema<GetStorageProfileRequest>;
export interface GetStorageProfileResponse {
  storageProfileId: string;
  displayName: string;
  osFamily: StorageProfileOperatingSystemFamily;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  fileSystemLocations?: FileSystemLocation[];
}
export const GetStorageProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    storageProfileId: S.String,
    displayName: S.String,
    osFamily: StorageProfileOperatingSystemFamily,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    fileSystemLocations: S.optional(FileSystemLocationsList),
  }),
).annotate({
  identifier: "GetStorageProfileResponse",
}) as any as S.Schema<GetStorageProfileResponse>;
export interface GetStorageProfileForQueueRequest {
  farmId: string;
  queueId: string;
  storageProfileId: string;
}
export const GetStorageProfileForQueueRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    storageProfileId: S.String.pipe(T.HttpLabel("storageProfileId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/storage-profiles/{storageProfileId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetStorageProfileForQueueRequest",
}) as any as S.Schema<GetStorageProfileForQueueRequest>;
export interface GetStorageProfileForQueueResponse {
  storageProfileId: string;
  displayName: string;
  osFamily: StorageProfileOperatingSystemFamily;
  fileSystemLocations?: FileSystemLocation[];
}
export const GetStorageProfileForQueueResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    storageProfileId: S.String,
    displayName: S.String,
    osFamily: StorageProfileOperatingSystemFamily,
    fileSystemLocations: S.optional(FileSystemLocationsList),
  }),
).annotate({
  identifier: "GetStorageProfileForQueueResponse",
}) as any as S.Schema<GetStorageProfileForQueueResponse>;
export interface GetTaskRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
  taskId: string;
}
export const GetTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    stepId: S.String.pipe(T.HttpLabel("stepId")),
    taskId: S.String.pipe(T.HttpLabel("taskId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/steps/{stepId}/tasks/{taskId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetTaskRequest" }) as any as S.Schema<GetTaskRequest>;
export interface GetTaskResponse {
  taskId: string;
  createdAt: Date;
  createdBy: string;
  runStatus: TaskRunStatus;
  targetRunStatus?: TaskTargetRunStatus;
  failureRetryCount?: number;
  startedAt?: Date;
  endedAt?: Date;
  updatedAt?: Date;
  updatedBy?: string;
  latestSessionActionId?: string;
  parameters?: { [key: string]: TaskParameterValue | undefined };
}
export const GetTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    runStatus: TaskRunStatus,
    targetRunStatus: S.optional(TaskTargetRunStatus),
    failureRetryCount: S.optional(S.Number),
    startedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    latestSessionActionId: S.optional(S.String),
    parameters: S.optional(TaskParameters),
  }),
).annotate({
  identifier: "GetTaskResponse",
}) as any as S.Schema<GetTaskResponse>;
export interface GetVolumeRequest {
  farmId: string;
  fleetId: string;
  volumeId: string;
}
export const GetVolumeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    fleetId: S.String.pipe(T.HttpLabel("fleetId")),
    volumeId: S.String.pipe(T.HttpLabel("volumeId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/volumes/{volumeId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVolumeRequest",
}) as any as S.Schema<GetVolumeRequest>;
export type VolumeState =
  | "PENDING_CREATION"
  | "PENDING_ATTACHMENT"
  | "IN_USE"
  | "AVAILABLE"
  | "PENDING_DELETION"
  | (string & {});
export const VolumeState = /*@__PURE__*/ S.String;

export type EbsVolumeType = "gp3" | (string & {});
export const EbsVolumeType = /*@__PURE__*/ S.String;

export interface GetVolumeResponse {
  volumeId: string;
  farmId: string;
  fleetId: string;
  state: VolumeState;
  sizeGiB: number;
  availabilityZoneId: string;
  attachedWorkerId?: string;
  volumeType: EbsVolumeType;
  iops?: number;
  throughputMiB?: number;
  createdAt: Date;
  lastAssignedAt?: Date;
  lastReleasedAt?: Date;
  expiresAt?: Date;
}
export const GetVolumeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    volumeId: S.String,
    farmId: S.String,
    fleetId: S.String,
    state: VolumeState,
    sizeGiB: S.Number,
    availabilityZoneId: S.String,
    attachedWorkerId: S.optional(S.String),
    volumeType: EbsVolumeType,
    iops: S.optional(S.Number),
    throughputMiB: S.optional(S.Number),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastAssignedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastReleasedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    expiresAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetVolumeResponse",
}) as any as S.Schema<GetVolumeResponse>;
export interface GetWorkerRequest {
  farmId: string;
  fleetId: string;
  workerId: string;
}
export const GetWorkerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    fleetId: S.String.pipe(T.HttpLabel("fleetId")),
    workerId: S.String.pipe(T.HttpLabel("workerId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/workers/{workerId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWorkerRequest",
}) as any as S.Schema<GetWorkerRequest>;
export interface GetWorkerResponse {
  farmId: string;
  fleetId: string;
  workerId: string;
  hostProperties?: HostPropertiesResponse;
  status: WorkerStatus;
  log?: LogConfiguration;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export const GetWorkerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    fleetId: S.String,
    workerId: S.String,
    hostProperties: S.optional(HostPropertiesResponse),
    status: WorkerStatus,
    log: S.optional(LogConfiguration),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "GetWorkerResponse",
}) as any as S.Schema<GetWorkerResponse>;
export interface ListAvailableMeteredProductsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListAvailableMeteredProductsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2023-10-12/metered-products" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAvailableMeteredProductsRequest",
}) as any as S.Schema<ListAvailableMeteredProductsRequest>;
export type BoundedString = string;
export type PortNumber = number;
export interface MeteredProductSummary {
  productId: string;
  family: string;
  vendor: string;
  port: number;
}
export const MeteredProductSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    productId: S.String,
    family: S.String,
    vendor: S.String,
    port: S.Number,
  }),
).annotate({
  identifier: "MeteredProductSummary",
}) as any as S.Schema<MeteredProductSummary>;
export type MeteredProductSummaryList = MeteredProductSummary[];
export const MeteredProductSummaryList = /*@__PURE__*/ S.Array(
  MeteredProductSummary,
);
export interface ListAvailableMeteredProductsResponse {
  meteredProducts: MeteredProductSummary[];
  nextToken?: string;
}
export const ListAvailableMeteredProductsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      meteredProducts: MeteredProductSummaryList,
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListAvailableMeteredProductsResponse",
}) as any as S.Schema<ListAvailableMeteredProductsResponse>;
export interface ListBudgetsRequest {
  farmId: string;
  nextToken?: string;
  maxResults?: number;
  status?: BudgetStatus;
}
export const ListBudgetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    status: S.optional(BudgetStatus).pipe(T.HttpQuery("status")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2023-10-12/farms/{farmId}/budgets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBudgetsRequest",
}) as any as S.Schema<ListBudgetsRequest>;
export interface BudgetSummary {
  budgetId: string;
  usageTrackingResource: UsageTrackingResource;
  status: BudgetStatus;
  displayName: string;
  approximateDollarLimit: number;
  usages: ConsumedUsages;
  createdBy: string;
  createdAt: Date;
  updatedBy?: string;
  updatedAt?: Date;
  description?: string | redacted.Redacted<string>;
}
export const BudgetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    budgetId: S.String,
    usageTrackingResource: UsageTrackingResource,
    status: BudgetStatus,
    displayName: S.String,
    approximateDollarLimit: S.Number,
    usages: ConsumedUsages,
    createdBy: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedBy: S.optional(S.String),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    description: S.optional(SensitiveString),
  }),
).annotate({ identifier: "BudgetSummary" }) as any as S.Schema<BudgetSummary>;
export type BudgetSummaries = BudgetSummary[];
export const BudgetSummaries = /*@__PURE__*/ S.Array(BudgetSummary);
export interface ListBudgetsResponse {
  budgets: BudgetSummary[];
  nextToken?: string;
}
export const ListBudgetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ budgets: BudgetSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListBudgetsResponse",
}) as any as S.Schema<ListBudgetsResponse>;
export interface ListFarmMembersRequest {
  farmId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListFarmMembersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2023-10-12/farms/{farmId}/members" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFarmMembersRequest",
}) as any as S.Schema<ListFarmMembersRequest>;
export interface FarmMember {
  farmId: string;
  principalId: string;
  principalType: DeadlinePrincipalType;
  identityStoreId: string;
  membershipLevel: MembershipLevel;
}
export const FarmMember = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    principalId: S.String,
    principalType: DeadlinePrincipalType,
    identityStoreId: S.String,
    membershipLevel: MembershipLevel,
  }),
).annotate({ identifier: "FarmMember" }) as any as S.Schema<FarmMember>;
export type FarmMembers = FarmMember[];
export const FarmMembers = /*@__PURE__*/ S.Array(FarmMember);
export interface ListFarmMembersResponse {
  members: FarmMember[];
  nextToken?: string;
}
export const ListFarmMembersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ members: FarmMembers, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListFarmMembersResponse",
}) as any as S.Schema<ListFarmMembersResponse>;
export interface ListFarmsRequest {
  nextToken?: string;
  maxResults?: number;
  principalId?: string;
}
export const ListFarmsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    principalId: S.optional(S.String).pipe(T.HttpQuery("principalId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2023-10-12/farms" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFarmsRequest",
}) as any as S.Schema<ListFarmsRequest>;
export interface FarmSummary {
  farmId: string;
  displayName: string;
  kmsKeyArn?: string;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export const FarmSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    displayName: S.String,
    kmsKeyArn: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
  }),
).annotate({ identifier: "FarmSummary" }) as any as S.Schema<FarmSummary>;
export type FarmSummaries = FarmSummary[];
export const FarmSummaries = /*@__PURE__*/ S.Array(FarmSummary);
export interface ListFarmsResponse {
  farms: FarmSummary[];
  nextToken?: string;
}
export const ListFarmsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ farms: FarmSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListFarmsResponse",
}) as any as S.Schema<ListFarmsResponse>;
export interface ListFleetMembersRequest {
  farmId: string;
  fleetId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListFleetMembersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    fleetId: S.String.pipe(T.HttpLabel("fleetId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/members",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFleetMembersRequest",
}) as any as S.Schema<ListFleetMembersRequest>;
export interface FleetMember {
  farmId: string;
  fleetId: string;
  principalId: string;
  principalType: DeadlinePrincipalType;
  identityStoreId: string;
  membershipLevel: MembershipLevel;
}
export const FleetMember = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    fleetId: S.String,
    principalId: S.String,
    principalType: DeadlinePrincipalType,
    identityStoreId: S.String,
    membershipLevel: MembershipLevel,
  }),
).annotate({ identifier: "FleetMember" }) as any as S.Schema<FleetMember>;
export type FleetMembers = FleetMember[];
export const FleetMembers = /*@__PURE__*/ S.Array(FleetMember);
export interface ListFleetMembersResponse {
  members: FleetMember[];
  nextToken?: string;
}
export const ListFleetMembersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ members: FleetMembers, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListFleetMembersResponse",
}) as any as S.Schema<ListFleetMembersResponse>;
export interface ListFleetsRequest {
  farmId: string;
  nextToken?: string;
  maxResults?: number;
  principalId?: string;
  displayName?: string;
  status?: FleetStatus;
}
export const ListFleetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    principalId: S.optional(S.String).pipe(T.HttpQuery("principalId")),
    displayName: S.optional(S.String).pipe(T.HttpQuery("displayName")),
    status: S.optional(FleetStatus).pipe(T.HttpQuery("status")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2023-10-12/farms/{farmId}/fleets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFleetsRequest",
}) as any as S.Schema<ListFleetsRequest>;
export interface FleetSummary {
  fleetId: string;
  farmId: string;
  displayName: string;
  status: FleetStatus;
  statusMessage?: string;
  autoScalingStatus?: AutoScalingStatus;
  targetWorkerCount?: number;
  workerCount: number;
  minWorkerCount: number;
  maxWorkerCount: number;
  configuration: FleetConfiguration;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export const FleetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fleetId: S.String,
    farmId: S.String,
    displayName: S.String,
    status: FleetStatus,
    statusMessage: S.optional(S.String),
    autoScalingStatus: S.optional(AutoScalingStatus),
    targetWorkerCount: S.optional(S.Number),
    workerCount: S.Number,
    minWorkerCount: S.Number,
    maxWorkerCount: S.Number,
    configuration: FleetConfiguration,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
  }),
).annotate({ identifier: "FleetSummary" }) as any as S.Schema<FleetSummary>;
export type FleetSummaries = FleetSummary[];
export const FleetSummaries = /*@__PURE__*/ S.Array(FleetSummary);
export interface ListFleetsResponse {
  fleets: FleetSummary[];
  nextToken?: string;
}
export const ListFleetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fleets: FleetSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListFleetsResponse",
}) as any as S.Schema<ListFleetsResponse>;
export interface ListJobMembersRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListJobMembersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/members",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListJobMembersRequest",
}) as any as S.Schema<ListJobMembersRequest>;
export interface JobMember {
  farmId: string;
  queueId: string;
  jobId: string;
  principalId: string;
  principalType: DeadlinePrincipalType;
  identityStoreId: string;
  membershipLevel: MembershipLevel;
}
export const JobMember = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    queueId: S.String,
    jobId: S.String,
    principalId: S.String,
    principalType: DeadlinePrincipalType,
    identityStoreId: S.String,
    membershipLevel: MembershipLevel,
  }),
).annotate({ identifier: "JobMember" }) as any as S.Schema<JobMember>;
export type JobMembers = JobMember[];
export const JobMembers = /*@__PURE__*/ S.Array(JobMember);
export interface ListJobMembersResponse {
  members: JobMember[];
  nextToken?: string;
}
export const ListJobMembersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ members: JobMembers, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListJobMembersResponse",
}) as any as S.Schema<ListJobMembersResponse>;
export interface ListJobParameterDefinitionsRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListJobParameterDefinitionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/parameter-definitions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListJobParameterDefinitionsRequest",
}) as any as S.Schema<ListJobParameterDefinitionsRequest>;
export type JobParameterDefinition = unknown;
export type JobParameterDefinitions = any[];
export const JobParameterDefinitions = /*@__PURE__*/ S.Array(S.Any);
export interface ListJobParameterDefinitionsResponse {
  jobParameterDefinitions: any[];
  nextToken?: string;
}
export const ListJobParameterDefinitionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobParameterDefinitions: JobParameterDefinitions,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListJobParameterDefinitionsResponse",
}) as any as S.Schema<ListJobParameterDefinitionsResponse>;
export interface ListJobsRequest {
  farmId: string;
  queueId: string;
  nextToken?: string;
  maxResults?: number;
  principalId?: string;
}
export const ListJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    principalId: S.optional(S.String).pipe(T.HttpQuery("principalId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListJobsRequest",
}) as any as S.Schema<ListJobsRequest>;
export interface JobSummary {
  jobId: string;
  name: string;
  lifecycleStatus: JobLifecycleStatus;
  lifecycleStatusMessage: string;
  priority: number;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  startedAt?: Date;
  endedAt?: Date;
  taskRunStatus?: TaskRunStatus;
  targetTaskRunStatus?: JobTargetTaskRunStatus;
  taskRunStatusCounts?: { [key: string]: number | undefined };
  taskFailureRetryCount?: number;
  maxFailedTasksCount?: number;
  maxRetriesPerTask?: number;
  maxWorkerCount?: number;
  sourceJobId?: string;
}
export const JobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String,
    name: S.String,
    lifecycleStatus: JobLifecycleStatus,
    lifecycleStatusMessage: S.String,
    priority: S.Number,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    startedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    taskRunStatus: S.optional(TaskRunStatus),
    targetTaskRunStatus: S.optional(JobTargetTaskRunStatus),
    taskRunStatusCounts: S.optional(TaskRunStatusCounts),
    taskFailureRetryCount: S.optional(S.Number),
    maxFailedTasksCount: S.optional(S.Number),
    maxRetriesPerTask: S.optional(S.Number),
    maxWorkerCount: S.optional(S.Number),
    sourceJobId: S.optional(S.String),
  }),
).annotate({ identifier: "JobSummary" }) as any as S.Schema<JobSummary>;
export type JobSummaries = JobSummary[];
export const JobSummaries = /*@__PURE__*/ S.Array(JobSummary);
export interface ListJobsResponse {
  jobs: JobSummary[];
  nextToken?: string;
}
export const ListJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobs: JobSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListJobsResponse",
}) as any as S.Schema<ListJobsResponse>;
export interface ListLicenseEndpointsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListLicenseEndpointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2023-10-12/license-endpoints" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLicenseEndpointsRequest",
}) as any as S.Schema<ListLicenseEndpointsRequest>;
export interface LicenseEndpointSummary {
  licenseEndpointId?: string;
  status?: LicenseEndpointStatus;
  statusMessage?: string;
  vpcId?: string;
}
export const LicenseEndpointSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    licenseEndpointId: S.optional(S.String),
    status: S.optional(LicenseEndpointStatus),
    statusMessage: S.optional(S.String),
    vpcId: S.optional(S.String),
  }),
).annotate({
  identifier: "LicenseEndpointSummary",
}) as any as S.Schema<LicenseEndpointSummary>;
export type LicenseEndpointSummaries = LicenseEndpointSummary[];
export const LicenseEndpointSummaries = /*@__PURE__*/ S.Array(
  LicenseEndpointSummary,
);
export interface ListLicenseEndpointsResponse {
  licenseEndpoints: LicenseEndpointSummary[];
  nextToken?: string;
}
export const ListLicenseEndpointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    licenseEndpoints: LicenseEndpointSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLicenseEndpointsResponse",
}) as any as S.Schema<ListLicenseEndpointsResponse>;
export interface ListLimitsRequest {
  farmId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListLimitsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2023-10-12/farms/{farmId}/limits" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLimitsRequest",
}) as any as S.Schema<ListLimitsRequest>;
export interface LimitSummary {
  farmId: string;
  limitId: string;
  currentCount: number;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  displayName: string;
  amountRequirementName: string;
  maxCount: number;
}
export const LimitSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    limitId: S.String,
    currentCount: S.Number,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    displayName: S.String,
    amountRequirementName: S.String,
    maxCount: S.Number,
  }),
).annotate({ identifier: "LimitSummary" }) as any as S.Schema<LimitSummary>;
export type LimitSummaries = LimitSummary[];
export const LimitSummaries = /*@__PURE__*/ S.Array(LimitSummary);
export interface ListLimitsResponse {
  limits: LimitSummary[];
  nextToken?: string;
}
export const ListLimitsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ limits: LimitSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListLimitsResponse",
}) as any as S.Schema<ListLimitsResponse>;
export interface ListMeteredProductsRequest {
  licenseEndpointId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListMeteredProductsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    licenseEndpointId: S.String.pipe(T.HttpLabel("licenseEndpointId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/license-endpoints/{licenseEndpointId}/metered-products",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMeteredProductsRequest",
}) as any as S.Schema<ListMeteredProductsRequest>;
export interface ListMeteredProductsResponse {
  meteredProducts: MeteredProductSummary[];
  nextToken?: string;
}
export const ListMeteredProductsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    meteredProducts: MeteredProductSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMeteredProductsResponse",
}) as any as S.Schema<ListMeteredProductsResponse>;
export interface ListMonitorsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListMonitorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2023-10-12/monitors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMonitorsRequest",
}) as any as S.Schema<ListMonitorsRequest>;
export interface MonitorSummary {
  monitorId: string;
  displayName: string;
  subdomain: string;
  url: string;
  roleArn: string;
  identityCenterInstanceArn: string;
  identityCenterRegion?: string;
  identityCenterApplicationArn: string;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export const MonitorSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    monitorId: S.String,
    displayName: S.String,
    subdomain: S.String,
    url: S.String,
    roleArn: S.String,
    identityCenterInstanceArn: S.String,
    identityCenterRegion: S.optional(S.String),
    identityCenterApplicationArn: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
  }),
).annotate({ identifier: "MonitorSummary" }) as any as S.Schema<MonitorSummary>;
export type MonitorSummaries = MonitorSummary[];
export const MonitorSummaries = /*@__PURE__*/ S.Array(MonitorSummary);
export interface ListMonitorsResponse {
  monitors: MonitorSummary[];
  nextToken?: string;
}
export const ListMonitorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ monitors: MonitorSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListMonitorsResponse",
}) as any as S.Schema<ListMonitorsResponse>;
export interface ListQueueEnvironmentsRequest {
  farmId: string;
  queueId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListQueueEnvironmentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/environments",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListQueueEnvironmentsRequest",
}) as any as S.Schema<ListQueueEnvironmentsRequest>;
export interface QueueEnvironmentSummary {
  queueEnvironmentId: string;
  name: string;
  priority: number;
}
export const QueueEnvironmentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queueEnvironmentId: S.String,
    name: S.String,
    priority: S.Number,
  }),
).annotate({
  identifier: "QueueEnvironmentSummary",
}) as any as S.Schema<QueueEnvironmentSummary>;
export type QueueEnvironmentSummaries = QueueEnvironmentSummary[];
export const QueueEnvironmentSummaries = /*@__PURE__*/ S.Array(
  QueueEnvironmentSummary,
);
export interface ListQueueEnvironmentsResponse {
  environments: QueueEnvironmentSummary[];
  nextToken?: string;
}
export const ListQueueEnvironmentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    environments: QueueEnvironmentSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListQueueEnvironmentsResponse",
}) as any as S.Schema<ListQueueEnvironmentsResponse>;
export interface ListQueueFleetAssociationsRequest {
  farmId: string;
  nextToken?: string;
  maxResults?: number;
  queueId?: string;
  fleetId?: string;
}
export const ListQueueFleetAssociationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    queueId: S.optional(S.String).pipe(T.HttpQuery("queueId")),
    fleetId: S.optional(S.String).pipe(T.HttpQuery("fleetId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/queue-fleet-associations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListQueueFleetAssociationsRequest",
}) as any as S.Schema<ListQueueFleetAssociationsRequest>;
export interface QueueFleetAssociationSummary {
  queueId: string;
  fleetId: string;
  status: QueueFleetAssociationStatus;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export const QueueFleetAssociationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queueId: S.String,
    fleetId: S.String,
    status: QueueFleetAssociationStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "QueueFleetAssociationSummary",
}) as any as S.Schema<QueueFleetAssociationSummary>;
export type QueueFleetAssociationSummaries = QueueFleetAssociationSummary[];
export const QueueFleetAssociationSummaries = /*@__PURE__*/ S.Array(
  QueueFleetAssociationSummary,
);
export interface ListQueueFleetAssociationsResponse {
  queueFleetAssociations: QueueFleetAssociationSummary[];
  nextToken?: string;
}
export const ListQueueFleetAssociationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queueFleetAssociations: QueueFleetAssociationSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListQueueFleetAssociationsResponse",
}) as any as S.Schema<ListQueueFleetAssociationsResponse>;
export interface ListQueueLimitAssociationsRequest {
  farmId: string;
  nextToken?: string;
  maxResults?: number;
  queueId?: string;
  limitId?: string;
}
export const ListQueueLimitAssociationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    queueId: S.optional(S.String).pipe(T.HttpQuery("queueId")),
    limitId: S.optional(S.String).pipe(T.HttpQuery("limitId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/queue-limit-associations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListQueueLimitAssociationsRequest",
}) as any as S.Schema<ListQueueLimitAssociationsRequest>;
export interface QueueLimitAssociationSummary {
  queueId: string;
  limitId: string;
  status: QueueLimitAssociationStatus;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export const QueueLimitAssociationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queueId: S.String,
    limitId: S.String,
    status: QueueLimitAssociationStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "QueueLimitAssociationSummary",
}) as any as S.Schema<QueueLimitAssociationSummary>;
export type QueueLimitAssociationSummaries = QueueLimitAssociationSummary[];
export const QueueLimitAssociationSummaries = /*@__PURE__*/ S.Array(
  QueueLimitAssociationSummary,
);
export interface ListQueueLimitAssociationsResponse {
  queueLimitAssociations: QueueLimitAssociationSummary[];
  nextToken?: string;
}
export const ListQueueLimitAssociationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queueLimitAssociations: QueueLimitAssociationSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListQueueLimitAssociationsResponse",
}) as any as S.Schema<ListQueueLimitAssociationsResponse>;
export interface ListQueueMembersRequest {
  farmId: string;
  queueId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListQueueMembersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/members",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListQueueMembersRequest",
}) as any as S.Schema<ListQueueMembersRequest>;
export interface QueueMember {
  farmId: string;
  queueId: string;
  principalId: string;
  principalType: DeadlinePrincipalType;
  identityStoreId: string;
  membershipLevel: MembershipLevel;
}
export const QueueMember = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    queueId: S.String,
    principalId: S.String,
    principalType: DeadlinePrincipalType,
    identityStoreId: S.String,
    membershipLevel: MembershipLevel,
  }),
).annotate({ identifier: "QueueMember" }) as any as S.Schema<QueueMember>;
export type QueueMemberList = QueueMember[];
export const QueueMemberList = /*@__PURE__*/ S.Array(QueueMember);
export interface ListQueueMembersResponse {
  members: QueueMember[];
  nextToken?: string;
}
export const ListQueueMembersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ members: QueueMemberList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListQueueMembersResponse",
}) as any as S.Schema<ListQueueMembersResponse>;
export interface ListQueuesRequest {
  farmId: string;
  nextToken?: string;
  maxResults?: number;
  principalId?: string;
  status?: QueueStatus;
}
export const ListQueuesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    principalId: S.optional(S.String).pipe(T.HttpQuery("principalId")),
    status: S.optional(QueueStatus).pipe(T.HttpQuery("status")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2023-10-12/farms/{farmId}/queues" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListQueuesRequest",
}) as any as S.Schema<ListQueuesRequest>;
export interface QueueSummary {
  farmId: string;
  queueId: string;
  displayName: string;
  status: QueueStatus;
  defaultBudgetAction: DefaultQueueBudgetAction;
  blockedReason?: QueueBlockedReason;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export const QueueSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    queueId: S.String,
    displayName: S.String,
    status: QueueStatus,
    defaultBudgetAction: DefaultQueueBudgetAction,
    blockedReason: S.optional(QueueBlockedReason),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
  }),
).annotate({ identifier: "QueueSummary" }) as any as S.Schema<QueueSummary>;
export type QueueSummaries = QueueSummary[];
export const QueueSummaries = /*@__PURE__*/ S.Array(QueueSummary);
export interface ListQueuesResponse {
  queues: QueueSummary[];
  nextToken?: string;
}
export const ListQueuesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ queues: QueueSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListQueuesResponse",
}) as any as S.Schema<ListQueuesResponse>;
export interface ListSessionActionsRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  nextToken?: string;
  maxResults?: number;
  sessionId?: string;
  taskId?: string;
}
export const ListSessionActionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    sessionId: S.optional(S.String).pipe(T.HttpQuery("sessionId")),
    taskId: S.optional(S.String).pipe(T.HttpQuery("taskId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/session-actions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSessionActionsRequest",
}) as any as S.Schema<ListSessionActionsRequest>;
export interface EnvironmentEnterSessionActionDefinitionSummary {
  environmentId: string;
}
export const EnvironmentEnterSessionActionDefinitionSummary =
  /*@__PURE__*/ S.suspend(() => S.Struct({ environmentId: S.String })).annotate(
    { identifier: "EnvironmentEnterSessionActionDefinitionSummary" },
  ) as any as S.Schema<EnvironmentEnterSessionActionDefinitionSummary>;
export interface EnvironmentExitSessionActionDefinitionSummary {
  environmentId: string;
}
export const EnvironmentExitSessionActionDefinitionSummary =
  /*@__PURE__*/ S.suspend(() => S.Struct({ environmentId: S.String })).annotate(
    { identifier: "EnvironmentExitSessionActionDefinitionSummary" },
  ) as any as S.Schema<EnvironmentExitSessionActionDefinitionSummary>;
export interface TaskRunSessionActionDefinitionSummary {
  taskId?: string;
  stepId: string;
  parameters?: { [key: string]: TaskParameterValue | undefined };
}
export const TaskRunSessionActionDefinitionSummary = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      taskId: S.optional(S.String),
      stepId: S.String,
      parameters: S.optional(TaskParameters),
    }),
).annotate({
  identifier: "TaskRunSessionActionDefinitionSummary",
}) as any as S.Schema<TaskRunSessionActionDefinitionSummary>;
export interface SyncInputJobAttachmentsSessionActionDefinitionSummary {
  stepId?: string;
}
export const SyncInputJobAttachmentsSessionActionDefinitionSummary =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ stepId: S.optional(S.String) }),
  ).annotate({
    identifier: "SyncInputJobAttachmentsSessionActionDefinitionSummary",
  }) as any as S.Schema<SyncInputJobAttachmentsSessionActionDefinitionSummary>;
export type SessionActionDefinitionSummary =
  | {
      envEnter: EnvironmentEnterSessionActionDefinitionSummary;
      envExit?: never;
      taskRun?: never;
      syncInputJobAttachments?: never;
    }
  | {
      envEnter?: never;
      envExit: EnvironmentExitSessionActionDefinitionSummary;
      taskRun?: never;
      syncInputJobAttachments?: never;
    }
  | {
      envEnter?: never;
      envExit?: never;
      taskRun: TaskRunSessionActionDefinitionSummary;
      syncInputJobAttachments?: never;
    }
  | {
      envEnter?: never;
      envExit?: never;
      taskRun?: never;
      syncInputJobAttachments: SyncInputJobAttachmentsSessionActionDefinitionSummary;
    };
export const SessionActionDefinitionSummary = /*@__PURE__*/ S.Union([
  S.Struct({ envEnter: EnvironmentEnterSessionActionDefinitionSummary }),
  S.Struct({ envExit: EnvironmentExitSessionActionDefinitionSummary }),
  S.Struct({ taskRun: TaskRunSessionActionDefinitionSummary }),
  S.Struct({
    syncInputJobAttachments:
      SyncInputJobAttachmentsSessionActionDefinitionSummary,
  }),
]);
export interface SessionActionSummary {
  sessionActionId: string;
  status: SessionActionStatus;
  startedAt?: Date;
  endedAt?: Date;
  workerUpdatedAt?: Date;
  progressPercent?: number;
  manifests?: TaskRunManifestPropertiesResponse[];
  definition: SessionActionDefinitionSummary;
}
export const SessionActionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionActionId: S.String,
    status: SessionActionStatus,
    startedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    workerUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    progressPercent: S.optional(S.Number),
    manifests: S.optional(TaskRunManifestPropertiesListResponse),
    definition: SessionActionDefinitionSummary,
  }),
).annotate({
  identifier: "SessionActionSummary",
}) as any as S.Schema<SessionActionSummary>;
export type SessionActionSummaries = SessionActionSummary[];
export const SessionActionSummaries =
  /*@__PURE__*/ S.Array(SessionActionSummary);
export interface ListSessionActionsResponse {
  sessionActions: SessionActionSummary[];
  nextToken?: string;
}
export const ListSessionActionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionActions: SessionActionSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSessionActionsResponse",
}) as any as S.Schema<ListSessionActionsResponse>;
export interface ListSessionsRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListSessionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/sessions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSessionsRequest",
}) as any as S.Schema<ListSessionsRequest>;
export interface SessionSummary {
  sessionId: string;
  fleetId: string;
  workerId: string;
  startedAt: Date;
  lifecycleStatus: SessionLifecycleStatus;
  endedAt?: Date;
  targetLifecycleStatus?: SessionLifecycleTargetStatus;
  updatedAt?: Date;
  updatedBy?: string;
}
export const SessionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.String,
    fleetId: S.String,
    workerId: S.String,
    startedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lifecycleStatus: SessionLifecycleStatus,
    endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    targetLifecycleStatus: S.optional(SessionLifecycleTargetStatus),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
  }),
).annotate({ identifier: "SessionSummary" }) as any as S.Schema<SessionSummary>;
export type SessionSummaries = SessionSummary[];
export const SessionSummaries = /*@__PURE__*/ S.Array(SessionSummary);
export interface ListSessionsResponse {
  sessions: SessionSummary[];
  nextToken?: string;
}
export const ListSessionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sessions: SessionSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListSessionsResponse",
}) as any as S.Schema<ListSessionsResponse>;
export interface ListSessionsForWorkerRequest {
  farmId: string;
  fleetId: string;
  workerId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListSessionsForWorkerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    fleetId: S.String.pipe(T.HttpLabel("fleetId")),
    workerId: S.String.pipe(T.HttpLabel("workerId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/workers/{workerId}/sessions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSessionsForWorkerRequest",
}) as any as S.Schema<ListSessionsForWorkerRequest>;
export interface WorkerSessionSummary {
  sessionId: string;
  queueId: string;
  jobId: string;
  startedAt: Date;
  lifecycleStatus: SessionLifecycleStatus;
  endedAt?: Date;
  targetLifecycleStatus?: SessionLifecycleTargetStatus;
}
export const WorkerSessionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.String,
    queueId: S.String,
    jobId: S.String,
    startedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lifecycleStatus: SessionLifecycleStatus,
    endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    targetLifecycleStatus: S.optional(SessionLifecycleTargetStatus),
  }),
).annotate({
  identifier: "WorkerSessionSummary",
}) as any as S.Schema<WorkerSessionSummary>;
export type ListSessionsForWorkerSummaries = WorkerSessionSummary[];
export const ListSessionsForWorkerSummaries =
  /*@__PURE__*/ S.Array(WorkerSessionSummary);
export interface ListSessionsForWorkerResponse {
  sessions: WorkerSessionSummary[];
  nextToken?: string;
}
export const ListSessionsForWorkerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessions: ListSessionsForWorkerSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSessionsForWorkerResponse",
}) as any as S.Schema<ListSessionsForWorkerResponse>;
export interface ListStepConsumersRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListStepConsumersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    stepId: S.String.pipe(T.HttpLabel("stepId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/steps/{stepId}/consumers",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListStepConsumersRequest",
}) as any as S.Schema<ListStepConsumersRequest>;
export type DependencyConsumerResolutionStatus =
  | "RESOLVED"
  | "UNRESOLVED"
  | (string & {});
export const DependencyConsumerResolutionStatus = /*@__PURE__*/ S.String;

export interface StepConsumer {
  stepId: string;
  status: DependencyConsumerResolutionStatus;
}
export const StepConsumer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ stepId: S.String, status: DependencyConsumerResolutionStatus }),
).annotate({ identifier: "StepConsumer" }) as any as S.Schema<StepConsumer>;
export type StepConsumers = StepConsumer[];
export const StepConsumers = /*@__PURE__*/ S.Array(StepConsumer);
export interface ListStepConsumersResponse {
  consumers: StepConsumer[];
  nextToken?: string;
}
export const ListStepConsumersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ consumers: StepConsumers, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListStepConsumersResponse",
}) as any as S.Schema<ListStepConsumersResponse>;
export interface ListStepDependenciesRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListStepDependenciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    stepId: S.String.pipe(T.HttpLabel("stepId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/steps/{stepId}/dependencies",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListStepDependenciesRequest",
}) as any as S.Schema<ListStepDependenciesRequest>;
export interface StepDependency {
  stepId: string;
  status: DependencyConsumerResolutionStatus;
}
export const StepDependency = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ stepId: S.String, status: DependencyConsumerResolutionStatus }),
).annotate({ identifier: "StepDependency" }) as any as S.Schema<StepDependency>;
export type StepDependencies = StepDependency[];
export const StepDependencies = /*@__PURE__*/ S.Array(StepDependency);
export interface ListStepDependenciesResponse {
  dependencies: StepDependency[];
  nextToken?: string;
}
export const ListStepDependenciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dependencies: StepDependencies, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListStepDependenciesResponse",
}) as any as S.Schema<ListStepDependenciesResponse>;
export interface ListStepsRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListStepsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/steps",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListStepsRequest",
}) as any as S.Schema<ListStepsRequest>;
export interface StepSummary {
  stepId: string;
  name: string;
  lifecycleStatus: StepLifecycleStatus;
  lifecycleStatusMessage?: string;
  taskRunStatus: TaskRunStatus;
  taskRunStatusCounts: { [key: string]: number | undefined };
  taskFailureRetryCount?: number;
  targetTaskRunStatus?: StepTargetTaskRunStatus;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  startedAt?: Date;
  endedAt?: Date;
  dependencyCounts?: DependencyCounts;
}
export const StepSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stepId: S.String,
    name: S.String,
    lifecycleStatus: StepLifecycleStatus,
    lifecycleStatusMessage: S.optional(S.String),
    taskRunStatus: TaskRunStatus,
    taskRunStatusCounts: TaskRunStatusCounts,
    taskFailureRetryCount: S.optional(S.Number),
    targetTaskRunStatus: S.optional(StepTargetTaskRunStatus),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    startedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    dependencyCounts: S.optional(DependencyCounts),
  }),
).annotate({ identifier: "StepSummary" }) as any as S.Schema<StepSummary>;
export type StepSummaries = StepSummary[];
export const StepSummaries = /*@__PURE__*/ S.Array(StepSummary);
export interface ListStepsResponse {
  steps: StepSummary[];
  nextToken?: string;
}
export const ListStepsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ steps: StepSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListStepsResponse",
}) as any as S.Schema<ListStepsResponse>;
export interface ListStorageProfilesRequest {
  farmId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListStorageProfilesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/storage-profiles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListStorageProfilesRequest",
}) as any as S.Schema<ListStorageProfilesRequest>;
export interface StorageProfileSummary {
  storageProfileId: string;
  displayName: string;
  osFamily: StorageProfileOperatingSystemFamily;
}
export const StorageProfileSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    storageProfileId: S.String,
    displayName: S.String,
    osFamily: StorageProfileOperatingSystemFamily,
  }),
).annotate({
  identifier: "StorageProfileSummary",
}) as any as S.Schema<StorageProfileSummary>;
export type StorageProfileSummaries = StorageProfileSummary[];
export const StorageProfileSummaries = /*@__PURE__*/ S.Array(
  StorageProfileSummary,
);
export interface ListStorageProfilesResponse {
  storageProfiles: StorageProfileSummary[];
  nextToken?: string;
}
export const ListStorageProfilesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    storageProfiles: StorageProfileSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListStorageProfilesResponse",
}) as any as S.Schema<ListStorageProfilesResponse>;
export interface ListStorageProfilesForQueueRequest {
  farmId: string;
  queueId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListStorageProfilesForQueueRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/storage-profiles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListStorageProfilesForQueueRequest",
}) as any as S.Schema<ListStorageProfilesForQueueRequest>;
export interface ListStorageProfilesForQueueResponse {
  storageProfiles: StorageProfileSummary[];
  nextToken?: string;
}
export const ListStorageProfilesForQueueResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    storageProfiles: StorageProfileSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListStorageProfilesForQueueResponse",
}) as any as S.Schema<ListStorageProfilesForQueueResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2023-10-12/tags/{resourceArn}" }),
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
  S.Struct({ tags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListTasksRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListTasksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    stepId: S.String.pipe(T.HttpLabel("stepId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/steps/{stepId}/tasks",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTasksRequest",
}) as any as S.Schema<ListTasksRequest>;
export interface TaskSummary {
  taskId: string;
  createdAt: Date;
  createdBy: string;
  runStatus: TaskRunStatus;
  targetRunStatus?: TaskTargetRunStatus;
  failureRetryCount?: number;
  startedAt?: Date;
  endedAt?: Date;
  updatedAt?: Date;
  updatedBy?: string;
  latestSessionActionId?: string;
  parameters?: { [key: string]: TaskParameterValue | undefined };
}
export const TaskSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    runStatus: TaskRunStatus,
    targetRunStatus: S.optional(TaskTargetRunStatus),
    failureRetryCount: S.optional(S.Number),
    startedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    latestSessionActionId: S.optional(S.String),
    parameters: S.optional(TaskParameters),
  }),
).annotate({ identifier: "TaskSummary" }) as any as S.Schema<TaskSummary>;
export type TaskSummaries = TaskSummary[];
export const TaskSummaries = /*@__PURE__*/ S.Array(TaskSummary);
export interface ListTasksResponse {
  tasks: TaskSummary[];
  nextToken?: string;
}
export const ListTasksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tasks: TaskSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListTasksResponse",
}) as any as S.Schema<ListTasksResponse>;
export interface ListVolumesRequest {
  farmId: string;
  fleetId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListVolumesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    fleetId: S.String.pipe(T.HttpLabel("fleetId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/volumes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVolumesRequest",
}) as any as S.Schema<ListVolumesRequest>;
export interface VolumeSummary {
  volumeId: string;
  farmId: string;
  fleetId: string;
  state: VolumeState;
  sizeGiB: number;
  availabilityZoneId: string;
  attachedWorkerId?: string;
}
export const VolumeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    volumeId: S.String,
    farmId: S.String,
    fleetId: S.String,
    state: VolumeState,
    sizeGiB: S.Number,
    availabilityZoneId: S.String,
    attachedWorkerId: S.optional(S.String),
  }),
).annotate({ identifier: "VolumeSummary" }) as any as S.Schema<VolumeSummary>;
export type VolumeSummaries = VolumeSummary[];
export const VolumeSummaries = /*@__PURE__*/ S.Array(VolumeSummary);
export interface ListVolumesResponse {
  volumes: VolumeSummary[];
  nextToken?: string;
}
export const ListVolumesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ volumes: VolumeSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListVolumesResponse",
}) as any as S.Schema<ListVolumesResponse>;
export interface ListWorkersRequest {
  farmId: string;
  fleetId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListWorkersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    fleetId: S.String.pipe(T.HttpLabel("fleetId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/workers",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWorkersRequest",
}) as any as S.Schema<ListWorkersRequest>;
export interface WorkerSummary {
  farmId: string;
  fleetId: string;
  workerId: string;
  hostProperties?: HostPropertiesResponse;
  status: WorkerStatus;
  log?: LogConfiguration;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export const WorkerSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String,
    fleetId: S.String,
    workerId: S.String,
    hostProperties: S.optional(HostPropertiesResponse),
    status: WorkerStatus,
    log: S.optional(LogConfiguration),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
  }),
).annotate({ identifier: "WorkerSummary" }) as any as S.Schema<WorkerSummary>;
export type WorkerSummaries = WorkerSummary[];
export const WorkerSummaries = /*@__PURE__*/ S.Array(WorkerSummary);
export interface ListWorkersResponse {
  workers: WorkerSummary[];
  nextToken?: string;
}
export const ListWorkersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workers: WorkerSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListWorkersResponse",
}) as any as S.Schema<ListWorkersResponse>;
export interface PutMeteredProductRequest {
  licenseEndpointId: string;
  productId: string;
}
export const PutMeteredProductRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    licenseEndpointId: S.String.pipe(T.HttpLabel("licenseEndpointId")),
    productId: S.String.pipe(T.HttpLabel("productId")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2023-10-12/license-endpoints/{licenseEndpointId}/metered-products/{productId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutMeteredProductRequest",
}) as any as S.Schema<PutMeteredProductRequest>;
export interface PutMeteredProductResponse {}
export const PutMeteredProductResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutMeteredProductResponse",
}) as any as S.Schema<PutMeteredProductResponse>;
export type ComparisonOperator =
  | "EQUAL"
  | "NOT_EQUAL"
  | "GREATER_THAN_EQUAL_TO"
  | "GREATER_THAN"
  | "LESS_THAN_EQUAL_TO"
  | "LESS_THAN"
  | "ANY_EQUALS"
  | "ALL_NOT_EQUALS"
  | (string & {});
export const ComparisonOperator = /*@__PURE__*/ S.String;

export interface DateTimeFilterExpression {
  name: string;
  operator: ComparisonOperator;
  dateTime: Date;
}
export const DateTimeFilterExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    operator: ComparisonOperator,
    dateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "DateTimeFilterExpression",
}) as any as S.Schema<DateTimeFilterExpression>;
export type ParameterValue = string;
export interface ParameterFilterExpression {
  name: string;
  operator: ComparisonOperator;
  value: string;
}
export const ParameterFilterExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, operator: ComparisonOperator, value: S.String }),
).annotate({
  identifier: "ParameterFilterExpression",
}) as any as S.Schema<ParameterFilterExpression>;
export type SearchTerm = string;
export type SearchTermMatchingType = "FUZZY_MATCH" | "CONTAINS" | (string & {});
export const SearchTermMatchingType = /*@__PURE__*/ S.String;

export interface SearchTermFilterExpression {
  searchTerm: string;
  matchType?: SearchTermMatchingType;
}
export const SearchTermFilterExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    searchTerm: S.String,
    matchType: S.optional(SearchTermMatchingType),
  }),
).annotate({
  identifier: "SearchTermFilterExpression",
}) as any as S.Schema<SearchTermFilterExpression>;
export type StringFilter = string;
export interface StringFilterExpression {
  name: string;
  operator: ComparisonOperator;
  value: string;
}
export const StringFilterExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, operator: ComparisonOperator, value: S.String }),
).annotate({
  identifier: "StringFilterExpression",
}) as any as S.Schema<StringFilterExpression>;
export type StringFilterList = string[];
export const StringFilterList = /*@__PURE__*/ S.Array(S.String);
export interface StringListFilterExpression {
  name: string;
  operator: ComparisonOperator;
  values: string[];
}
export const StringListFilterExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    operator: ComparisonOperator,
    values: StringFilterList,
  }),
).annotate({
  identifier: "StringListFilterExpression",
}) as any as S.Schema<StringListFilterExpression>;
export type SearchFilterExpression =
  | {
      dateTimeFilter: DateTimeFilterExpression;
      parameterFilter?: never;
      searchTermFilter?: never;
      stringFilter?: never;
      stringListFilter?: never;
      groupFilter?: never;
    }
  | {
      dateTimeFilter?: never;
      parameterFilter: ParameterFilterExpression;
      searchTermFilter?: never;
      stringFilter?: never;
      stringListFilter?: never;
      groupFilter?: never;
    }
  | {
      dateTimeFilter?: never;
      parameterFilter?: never;
      searchTermFilter: SearchTermFilterExpression;
      stringFilter?: never;
      stringListFilter?: never;
      groupFilter?: never;
    }
  | {
      dateTimeFilter?: never;
      parameterFilter?: never;
      searchTermFilter?: never;
      stringFilter: StringFilterExpression;
      stringListFilter?: never;
      groupFilter?: never;
    }
  | {
      dateTimeFilter?: never;
      parameterFilter?: never;
      searchTermFilter?: never;
      stringFilter?: never;
      stringListFilter: StringListFilterExpression;
      groupFilter?: never;
    }
  | {
      dateTimeFilter?: never;
      parameterFilter?: never;
      searchTermFilter?: never;
      stringFilter?: never;
      stringListFilter?: never;
      groupFilter: SearchGroupedFilterExpressions;
    };
export const SearchFilterExpression = /*@__PURE__*/ S.Union([
  S.Struct({ dateTimeFilter: DateTimeFilterExpression }),
  S.Struct({ parameterFilter: ParameterFilterExpression }),
  S.Struct({ searchTermFilter: SearchTermFilterExpression }),
  S.Struct({ stringFilter: StringFilterExpression }),
  S.Struct({ stringListFilter: StringListFilterExpression }),
  S.Struct({
    groupFilter: S.suspend(
      (): S.Schema<SearchGroupedFilterExpressions> =>
        SearchGroupedFilterExpressions,
    ).annotate({ identifier: "SearchGroupedFilterExpressions" }),
  }),
]) as any as S.Schema<SearchFilterExpression>;
export type SearchFilterExpressions = SearchFilterExpression[];
export const SearchFilterExpressions = /*@__PURE__*/ S.Array(
  S.suspend(() => SearchFilterExpression).annotate({
    identifier: "SearchFilterExpression",
  }),
) as any as S.Schema<SearchFilterExpressions>;
export type LogicalOperator = "AND" | "OR" | (string & {});
export const LogicalOperator = /*@__PURE__*/ S.String;

export interface SearchGroupedFilterExpressions {
  filters: SearchFilterExpression[];
  operator: LogicalOperator;
}
export const SearchGroupedFilterExpressions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.suspend(() => SearchFilterExpressions).annotate({
      identifier: "SearchFilterExpressions",
    }),
    operator: LogicalOperator,
  }),
).annotate({
  identifier: "SearchGroupedFilterExpressions",
}) as any as S.Schema<SearchGroupedFilterExpressions>;
export interface UserJobsFirst {
  userIdentityId: string;
}
export const UserJobsFirst = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userIdentityId: S.String }),
).annotate({ identifier: "UserJobsFirst" }) as any as S.Schema<UserJobsFirst>;
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export const SortOrder = /*@__PURE__*/ S.String;

export interface FieldSortExpression {
  sortOrder: SortOrder;
  name: string;
}
export const FieldSortExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sortOrder: SortOrder, name: S.String }),
).annotate({
  identifier: "FieldSortExpression",
}) as any as S.Schema<FieldSortExpression>;
export interface ParameterSortExpression {
  sortOrder: SortOrder;
  name: string;
}
export const ParameterSortExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sortOrder: SortOrder, name: S.String }),
).annotate({
  identifier: "ParameterSortExpression",
}) as any as S.Schema<ParameterSortExpression>;
export type SearchSortExpression =
  | { userJobsFirst: UserJobsFirst; fieldSort?: never; parameterSort?: never }
  | {
      userJobsFirst?: never;
      fieldSort: FieldSortExpression;
      parameterSort?: never;
    }
  | {
      userJobsFirst?: never;
      fieldSort?: never;
      parameterSort: ParameterSortExpression;
    };
export const SearchSortExpression = /*@__PURE__*/ S.Union([
  S.Struct({ userJobsFirst: UserJobsFirst }),
  S.Struct({ fieldSort: FieldSortExpression }),
  S.Struct({ parameterSort: ParameterSortExpression }),
]);
export type SearchSortExpressions = SearchSortExpression[];
export const SearchSortExpressions =
  /*@__PURE__*/ S.Array(SearchSortExpression);
export type QueueIds = string[];
export const QueueIds = /*@__PURE__*/ S.Array(S.String);
export interface SearchJobsRequest {
  farmId: string;
  filterExpressions?: SearchGroupedFilterExpressions;
  sortExpressions?: SearchSortExpression[];
  itemOffset: number;
  pageSize?: number;
  queueIds: string[];
}
export const SearchJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    filterExpressions: S.optional(SearchGroupedFilterExpressions),
    sortExpressions: S.optional(SearchSortExpressions),
    itemOffset: S.Number,
    pageSize: S.optional(S.Number),
    queueIds: QueueIds,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2023-10-12/farms/{farmId}/search/jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchJobsRequest",
}) as any as S.Schema<SearchJobsRequest>;
export interface JobSearchSummary {
  jobId?: string;
  queueId?: string;
  name?: string;
  lifecycleStatus?: JobLifecycleStatus;
  lifecycleStatusMessage?: string;
  taskRunStatus?: TaskRunStatus;
  targetTaskRunStatus?: JobTargetTaskRunStatus;
  taskRunStatusCounts?: { [key: string]: number | undefined };
  taskFailureRetryCount?: number;
  priority?: number;
  maxFailedTasksCount?: number;
  maxRetriesPerTask?: number;
  createdBy?: string;
  createdAt?: Date;
  endedAt?: Date;
  startedAt?: Date;
  updatedAt?: Date;
  updatedBy?: string;
  jobParameters?: { [key: string]: JobParameter | undefined };
  maxWorkerCount?: number;
  sourceJobId?: string;
}
export const JobSearchSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.optional(S.String),
    queueId: S.optional(S.String),
    name: S.optional(S.String),
    lifecycleStatus: S.optional(JobLifecycleStatus),
    lifecycleStatusMessage: S.optional(S.String),
    taskRunStatus: S.optional(TaskRunStatus),
    targetTaskRunStatus: S.optional(JobTargetTaskRunStatus),
    taskRunStatusCounts: S.optional(TaskRunStatusCounts),
    taskFailureRetryCount: S.optional(S.Number),
    priority: S.optional(S.Number),
    maxFailedTasksCount: S.optional(S.Number),
    maxRetriesPerTask: S.optional(S.Number),
    createdBy: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    startedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    jobParameters: S.optional(JobParameters),
    maxWorkerCount: S.optional(S.Number),
    sourceJobId: S.optional(S.String),
  }),
).annotate({
  identifier: "JobSearchSummary",
}) as any as S.Schema<JobSearchSummary>;
export type JobSearchSummaries = JobSearchSummary[];
export const JobSearchSummaries = /*@__PURE__*/ S.Array(JobSearchSummary);
export type NextItemOffset = number;
export type TotalResults = number;
export interface SearchJobsResponse {
  jobs: JobSearchSummary[];
  nextItemOffset?: number;
  totalResults: number;
}
export const SearchJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobs: JobSearchSummaries,
    nextItemOffset: S.optional(S.Number),
    totalResults: S.Number,
  }),
).annotate({
  identifier: "SearchJobsResponse",
}) as any as S.Schema<SearchJobsResponse>;
export interface SearchStepsRequest {
  farmId: string;
  filterExpressions?: SearchGroupedFilterExpressions;
  sortExpressions?: SearchSortExpression[];
  itemOffset: number;
  pageSize?: number;
  queueIds: string[];
  jobId?: string;
}
export const SearchStepsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    filterExpressions: S.optional(SearchGroupedFilterExpressions),
    sortExpressions: S.optional(SearchSortExpressions),
    itemOffset: S.Number,
    pageSize: S.optional(S.Number),
    queueIds: QueueIds,
    jobId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/2023-10-12/farms/{farmId}/search/steps",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchStepsRequest",
}) as any as S.Schema<SearchStepsRequest>;
export interface StepSearchSummary {
  stepId?: string;
  jobId?: string;
  queueId?: string;
  name?: string;
  lifecycleStatus?: StepLifecycleStatus;
  lifecycleStatusMessage?: string;
  taskRunStatus?: TaskRunStatus;
  targetTaskRunStatus?: StepTargetTaskRunStatus;
  taskRunStatusCounts?: { [key: string]: number | undefined };
  taskFailureRetryCount?: number;
  createdAt?: Date;
  createdBy?: string;
  startedAt?: Date;
  endedAt?: Date;
  updatedAt?: Date;
  updatedBy?: string;
  parameterSpace?: ParameterSpace;
}
export const StepSearchSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stepId: S.optional(S.String),
    jobId: S.optional(S.String),
    queueId: S.optional(S.String),
    name: S.optional(S.String),
    lifecycleStatus: S.optional(StepLifecycleStatus),
    lifecycleStatusMessage: S.optional(S.String),
    taskRunStatus: S.optional(TaskRunStatus),
    targetTaskRunStatus: S.optional(StepTargetTaskRunStatus),
    taskRunStatusCounts: S.optional(TaskRunStatusCounts),
    taskFailureRetryCount: S.optional(S.Number),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    createdBy: S.optional(S.String),
    startedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    parameterSpace: S.optional(ParameterSpace),
  }),
).annotate({
  identifier: "StepSearchSummary",
}) as any as S.Schema<StepSearchSummary>;
export type StepSearchSummaries = StepSearchSummary[];
export const StepSearchSummaries = /*@__PURE__*/ S.Array(StepSearchSummary);
export interface SearchStepsResponse {
  steps: StepSearchSummary[];
  nextItemOffset?: number;
  totalResults: number;
}
export const SearchStepsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    steps: StepSearchSummaries,
    nextItemOffset: S.optional(S.Number),
    totalResults: S.Number,
  }),
).annotate({
  identifier: "SearchStepsResponse",
}) as any as S.Schema<SearchStepsResponse>;
export interface SearchTasksRequest {
  farmId: string;
  filterExpressions?: SearchGroupedFilterExpressions;
  sortExpressions?: SearchSortExpression[];
  itemOffset: number;
  pageSize?: number;
  queueIds: string[];
  jobId?: string;
}
export const SearchTasksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    filterExpressions: S.optional(SearchGroupedFilterExpressions),
    sortExpressions: S.optional(SearchSortExpressions),
    itemOffset: S.Number,
    pageSize: S.optional(S.Number),
    queueIds: QueueIds,
    jobId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/2023-10-12/farms/{farmId}/search/tasks",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchTasksRequest",
}) as any as S.Schema<SearchTasksRequest>;
export interface TaskSearchSummary {
  taskId?: string;
  stepId?: string;
  jobId?: string;
  queueId?: string;
  runStatus?: TaskRunStatus;
  targetRunStatus?: TaskTargetRunStatus;
  parameters?: { [key: string]: TaskParameterValue | undefined };
  failureRetryCount?: number;
  startedAt?: Date;
  endedAt?: Date;
  updatedAt?: Date;
  updatedBy?: string;
  latestSessionActionId?: string;
}
export const TaskSearchSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.optional(S.String),
    stepId: S.optional(S.String),
    jobId: S.optional(S.String),
    queueId: S.optional(S.String),
    runStatus: S.optional(TaskRunStatus),
    targetRunStatus: S.optional(TaskTargetRunStatus),
    parameters: S.optional(TaskParameters),
    failureRetryCount: S.optional(S.Number),
    startedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    latestSessionActionId: S.optional(S.String),
  }),
).annotate({
  identifier: "TaskSearchSummary",
}) as any as S.Schema<TaskSearchSummary>;
export type TaskSearchSummaries = TaskSearchSummary[];
export const TaskSearchSummaries = /*@__PURE__*/ S.Array(TaskSearchSummary);
export interface SearchTasksResponse {
  tasks: TaskSearchSummary[];
  nextItemOffset?: number;
  totalResults: number;
}
export const SearchTasksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tasks: TaskSearchSummaries,
    nextItemOffset: S.optional(S.Number),
    totalResults: S.Number,
  }),
).annotate({
  identifier: "SearchTasksResponse",
}) as any as S.Schema<SearchTasksResponse>;
export type FleetIds = string[];
export const FleetIds = /*@__PURE__*/ S.Array(S.String);
export interface SearchWorkersRequest {
  farmId: string;
  filterExpressions?: SearchGroupedFilterExpressions;
  sortExpressions?: SearchSortExpression[];
  itemOffset: number;
  pageSize?: number;
  fleetIds: string[];
}
export const SearchWorkersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    filterExpressions: S.optional(SearchGroupedFilterExpressions),
    sortExpressions: S.optional(SearchSortExpressions),
    itemOffset: S.Number,
    pageSize: S.optional(S.Number),
    fleetIds: FleetIds,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/2023-10-12/farms/{farmId}/search/workers",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchWorkersRequest",
}) as any as S.Schema<SearchWorkersRequest>;
export interface WorkerSearchSummary {
  fleetId?: string;
  workerId?: string;
  status?: WorkerStatus;
  hostProperties?: HostPropertiesResponse;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}
export const WorkerSearchSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fleetId: S.optional(S.String),
    workerId: S.optional(S.String),
    status: S.optional(WorkerStatus),
    hostProperties: S.optional(HostPropertiesResponse),
    createdBy: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "WorkerSearchSummary",
}) as any as S.Schema<WorkerSearchSummary>;
export type WorkerSearchSummaries = WorkerSearchSummary[];
export const WorkerSearchSummaries = /*@__PURE__*/ S.Array(WorkerSearchSummary);
export interface SearchWorkersResponse {
  workers: WorkerSearchSummary[];
  nextItemOffset?: number;
  totalResults: number;
}
export const SearchWorkersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workers: WorkerSearchSummaries,
    nextItemOffset: S.optional(S.Number),
    totalResults: S.Number,
  }),
).annotate({
  identifier: "SearchWorkersResponse",
}) as any as S.Schema<SearchWorkersResponse>;
export type SessionsStatisticsResources =
  | { queueIds: string[]; fleetIds?: never }
  | { queueIds?: never; fleetIds: string[] };
export const SessionsStatisticsResources = /*@__PURE__*/ S.Union([
  S.Struct({ queueIds: QueueIds }),
  S.Struct({ fleetIds: FleetIds }),
]);
export type Timezone = string;
export type Period = "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY" | (string & {});
export const Period = /*@__PURE__*/ S.String;

export type UsageGroupByField =
  | "QUEUE_ID"
  | "FLEET_ID"
  | "JOB_ID"
  | "USER_ID"
  | "USAGE_TYPE"
  | "INSTANCE_TYPE"
  | "LICENSE_PRODUCT"
  | (string & {});
export const UsageGroupByField = /*@__PURE__*/ S.String;

export type UsageGroupBy = UsageGroupByField[];
export const UsageGroupBy = /*@__PURE__*/ S.Array(UsageGroupByField);
export type UsageStatistic = "SUM" | "MIN" | "MAX" | "AVG" | (string & {});
export const UsageStatistic = /*@__PURE__*/ S.String;

export type UsageStatistics = UsageStatistic[];
export const UsageStatistics = /*@__PURE__*/ S.Array(UsageStatistic);
export interface StartSessionsStatisticsAggregationRequest {
  farmId: string;
  resourceIds: SessionsStatisticsResources;
  startTime: Date;
  endTime: Date;
  timezone?: string;
  period?: Period;
  groupBy: UsageGroupByField[];
  statistics: UsageStatistic[];
}
export const StartSessionsStatisticsAggregationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      farmId: S.String.pipe(T.HttpLabel("farmId")),
      resourceIds: SessionsStatisticsResources,
      startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      endTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      timezone: S.optional(S.String),
      period: S.optional(Period),
      groupBy: UsageGroupBy,
      statistics: UsageStatistics,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/2023-10-12/farms/{farmId}/sessions-statistics-aggregation",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "StartSessionsStatisticsAggregationRequest",
  }) as any as S.Schema<StartSessionsStatisticsAggregationRequest>;
export interface StartSessionsStatisticsAggregationResponse {
  aggregationId: string;
}
export const StartSessionsStatisticsAggregationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({ aggregationId: S.String })).annotate(
    { identifier: "StartSessionsStatisticsAggregationResponse" },
  ) as any as S.Schema<StartSessionsStatisticsAggregationResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags?: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2023-10-12/tags/{resourceArn}" }),
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
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: StringList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/2023-10-12/tags/{resourceArn}" }),
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
export interface BudgetActionToRemove {
  type: BudgetActionType;
  thresholdPercentage: number;
}
export const BudgetActionToRemove = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: BudgetActionType, thresholdPercentage: S.Number }),
).annotate({
  identifier: "BudgetActionToRemove",
}) as any as S.Schema<BudgetActionToRemove>;
export type BudgetActionsToRemove = BudgetActionToRemove[];
export const BudgetActionsToRemove =
  /*@__PURE__*/ S.Array(BudgetActionToRemove);
export interface UpdateBudgetRequest {
  farmId: string;
  budgetId: string;
  clientToken?: string;
  displayName?: string;
  description?: string | redacted.Redacted<string>;
  status?: BudgetStatus;
  approximateDollarLimit?: number;
  actionsToAdd?: BudgetActionToAdd[];
  actionsToRemove?: BudgetActionToRemove[];
  schedule?: BudgetSchedule;
}
export const UpdateBudgetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    budgetId: S.String.pipe(T.HttpLabel("budgetId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Client-Token"),
      T.IdempotencyToken(),
    ),
    displayName: S.optional(S.String),
    description: S.optional(SensitiveString),
    status: S.optional(BudgetStatus),
    approximateDollarLimit: S.optional(S.Number),
    actionsToAdd: S.optional(BudgetActionsToAdd),
    actionsToRemove: S.optional(BudgetActionsToRemove),
    schedule: S.optional(BudgetSchedule),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/2023-10-12/farms/{farmId}/budgets/{budgetId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateBudgetRequest",
}) as any as S.Schema<UpdateBudgetRequest>;
export interface UpdateBudgetResponse {}
export const UpdateBudgetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateBudgetResponse",
}) as any as S.Schema<UpdateBudgetResponse>;
export interface UpdateFarmRequest {
  farmId: string;
  displayName?: string;
  description?: string | redacted.Redacted<string>;
  costScaleFactor?: number;
}
export const UpdateFarmRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    displayName: S.optional(S.String),
    description: S.optional(SensitiveString),
    costScaleFactor: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/2023-10-12/farms/{farmId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFarmRequest",
}) as any as S.Schema<UpdateFarmRequest>;
export interface UpdateFarmResponse {}
export const UpdateFarmResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateFarmResponse",
}) as any as S.Schema<UpdateFarmResponse>;
export interface UpdateFleetRequest {
  farmId: string;
  fleetId: string;
  clientToken?: string;
  displayName?: string;
  description?: string | redacted.Redacted<string>;
  roleArn?: string;
  minWorkerCount?: number;
  maxWorkerCount?: number;
  configuration?: FleetConfiguration;
  hostConfiguration?: HostConfiguration;
}
export const UpdateFleetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    fleetId: S.String.pipe(T.HttpLabel("fleetId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Client-Token"),
      T.IdempotencyToken(),
    ),
    displayName: S.optional(S.String),
    description: S.optional(SensitiveString),
    roleArn: S.optional(S.String),
    minWorkerCount: S.optional(S.Number),
    maxWorkerCount: S.optional(S.Number),
    configuration: S.optional(FleetConfiguration),
    hostConfiguration: S.optional(HostConfiguration),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFleetRequest",
}) as any as S.Schema<UpdateFleetRequest>;
export interface UpdateFleetResponse {}
export const UpdateFleetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateFleetResponse",
}) as any as S.Schema<UpdateFleetResponse>;
export interface UpdateJobRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  clientToken?: string;
  targetTaskRunStatus?: JobTargetTaskRunStatus;
  priority?: number;
  maxFailedTasksCount?: number;
  maxRetriesPerTask?: number;
  lifecycleStatus?: UpdateJobLifecycleStatus;
  maxWorkerCount?: number;
  name?: string;
  description?: string | redacted.Redacted<string>;
}
export const UpdateJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Client-Token"),
      T.IdempotencyToken(),
    ),
    targetTaskRunStatus: S.optional(JobTargetTaskRunStatus),
    priority: S.optional(S.Number),
    maxFailedTasksCount: S.optional(S.Number),
    maxRetriesPerTask: S.optional(S.Number),
    lifecycleStatus: S.optional(UpdateJobLifecycleStatus),
    maxWorkerCount: S.optional(S.Number),
    name: S.optional(S.String),
    description: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateJobRequest",
}) as any as S.Schema<UpdateJobRequest>;
export interface UpdateJobResponse {}
export const UpdateJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateJobResponse",
}) as any as S.Schema<UpdateJobResponse>;
export interface UpdateLimitRequest {
  farmId: string;
  limitId: string;
  displayName?: string;
  description?: string | redacted.Redacted<string>;
  maxCount?: number;
}
export const UpdateLimitRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    limitId: S.String.pipe(T.HttpLabel("limitId")),
    displayName: S.optional(S.String),
    description: S.optional(SensitiveString),
    maxCount: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/2023-10-12/farms/{farmId}/limits/{limitId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateLimitRequest",
}) as any as S.Schema<UpdateLimitRequest>;
export interface UpdateLimitResponse {}
export const UpdateLimitResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateLimitResponse",
}) as any as S.Schema<UpdateLimitResponse>;
export interface UpdateMonitorRequest {
  monitorId: string;
  subdomain?: string;
  displayName?: string;
  roleArn?: string;
}
export const UpdateMonitorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    monitorId: S.String.pipe(T.HttpLabel("monitorId")),
    subdomain: S.optional(S.String),
    displayName: S.optional(S.String),
    roleArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/2023-10-12/monitors/{monitorId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMonitorRequest",
}) as any as S.Schema<UpdateMonitorRequest>;
export interface UpdateMonitorResponse {}
export const UpdateMonitorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateMonitorResponse",
}) as any as S.Schema<UpdateMonitorResponse>;
export interface UpdateMonitorSettingsRequest {
  monitorId: string;
  settings: { [key: string]: string | undefined };
}
export const UpdateMonitorSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    monitorId: S.String.pipe(T.HttpLabel("monitorId")),
    settings: SettingsMap,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/2023-10-12/monitors/{monitorId}/settings",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMonitorSettingsRequest",
}) as any as S.Schema<UpdateMonitorSettingsRequest>;
export interface UpdateMonitorSettingsResponse {}
export const UpdateMonitorSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateMonitorSettingsResponse",
}) as any as S.Schema<UpdateMonitorSettingsResponse>;
export interface UpdateQueueRequest {
  farmId: string;
  queueId: string;
  clientToken?: string;
  displayName?: string;
  description?: string | redacted.Redacted<string>;
  defaultBudgetAction?: DefaultQueueBudgetAction;
  jobAttachmentSettings?: JobAttachmentSettings;
  roleArn?: string;
  jobRunAsUser?: JobRunAsUser;
  requiredFileSystemLocationNamesToAdd?: string[];
  requiredFileSystemLocationNamesToRemove?: string[];
  allowedStorageProfileIdsToAdd?: string[];
  allowedStorageProfileIdsToRemove?: string[];
  schedulingConfiguration?: SchedulingConfiguration;
}
export const UpdateQueueRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Client-Token"),
      T.IdempotencyToken(),
    ),
    displayName: S.optional(S.String),
    description: S.optional(SensitiveString),
    defaultBudgetAction: S.optional(DefaultQueueBudgetAction),
    jobAttachmentSettings: S.optional(JobAttachmentSettings),
    roleArn: S.optional(S.String),
    jobRunAsUser: S.optional(JobRunAsUser),
    requiredFileSystemLocationNamesToAdd: S.optional(
      RequiredFileSystemLocationNames,
    ),
    requiredFileSystemLocationNamesToRemove: S.optional(
      RequiredFileSystemLocationNames,
    ),
    allowedStorageProfileIdsToAdd: S.optional(AllowedStorageProfileIds),
    allowedStorageProfileIdsToRemove: S.optional(AllowedStorageProfileIds),
    schedulingConfiguration: S.optional(SchedulingConfiguration),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateQueueRequest",
}) as any as S.Schema<UpdateQueueRequest>;
export interface UpdateQueueResponse {}
export const UpdateQueueResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateQueueResponse",
}) as any as S.Schema<UpdateQueueResponse>;
export interface UpdateQueueEnvironmentRequest {
  farmId: string;
  queueId: string;
  queueEnvironmentId: string;
  clientToken?: string;
  priority?: number;
  templateType?: EnvironmentTemplateType;
  template?: string | redacted.Redacted<string>;
}
export const UpdateQueueEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    queueEnvironmentId: S.String.pipe(T.HttpLabel("queueEnvironmentId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Client-Token"),
      T.IdempotencyToken(),
    ),
    priority: S.optional(S.Number),
    templateType: S.optional(EnvironmentTemplateType),
    template: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/environments/{queueEnvironmentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateQueueEnvironmentRequest",
}) as any as S.Schema<UpdateQueueEnvironmentRequest>;
export interface UpdateQueueEnvironmentResponse {}
export const UpdateQueueEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateQueueEnvironmentResponse",
}) as any as S.Schema<UpdateQueueEnvironmentResponse>;
export type UpdateQueueFleetAssociationStatus =
  | "ACTIVE"
  | "STOP_SCHEDULING_AND_COMPLETE_TASKS"
  | "STOP_SCHEDULING_AND_CANCEL_TASKS"
  | (string & {});
export const UpdateQueueFleetAssociationStatus = /*@__PURE__*/ S.String;

export interface UpdateQueueFleetAssociationRequest {
  farmId: string;
  queueId: string;
  fleetId: string;
  status: UpdateQueueFleetAssociationStatus;
}
export const UpdateQueueFleetAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    fleetId: S.String.pipe(T.HttpLabel("fleetId")),
    status: UpdateQueueFleetAssociationStatus,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/2023-10-12/farms/{farmId}/queue-fleet-associations/{queueId}/{fleetId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateQueueFleetAssociationRequest",
}) as any as S.Schema<UpdateQueueFleetAssociationRequest>;
export interface UpdateQueueFleetAssociationResponse {}
export const UpdateQueueFleetAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateQueueFleetAssociationResponse",
}) as any as S.Schema<UpdateQueueFleetAssociationResponse>;
export type UpdateQueueLimitAssociationStatus =
  | "ACTIVE"
  | "STOP_LIMIT_USAGE_AND_COMPLETE_TASKS"
  | "STOP_LIMIT_USAGE_AND_CANCEL_TASKS"
  | (string & {});
export const UpdateQueueLimitAssociationStatus = /*@__PURE__*/ S.String;

export interface UpdateQueueLimitAssociationRequest {
  farmId: string;
  queueId: string;
  limitId: string;
  status: UpdateQueueLimitAssociationStatus;
}
export const UpdateQueueLimitAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    limitId: S.String.pipe(T.HttpLabel("limitId")),
    status: UpdateQueueLimitAssociationStatus,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/2023-10-12/farms/{farmId}/queue-limit-associations/{queueId}/{limitId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateQueueLimitAssociationRequest",
}) as any as S.Schema<UpdateQueueLimitAssociationRequest>;
export interface UpdateQueueLimitAssociationResponse {}
export const UpdateQueueLimitAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateQueueLimitAssociationResponse",
}) as any as S.Schema<UpdateQueueLimitAssociationResponse>;
export interface UpdateSessionRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  sessionId: string;
  clientToken?: string;
  targetLifecycleStatus: SessionLifecycleTargetStatus;
}
export const UpdateSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    sessionId: S.String.pipe(T.HttpLabel("sessionId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Client-Token"),
      T.IdempotencyToken(),
    ),
    targetLifecycleStatus: SessionLifecycleTargetStatus,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/sessions/{sessionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSessionRequest",
}) as any as S.Schema<UpdateSessionRequest>;
export interface UpdateSessionResponse {}
export const UpdateSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateSessionResponse",
}) as any as S.Schema<UpdateSessionResponse>;
export interface UpdateStepRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
  clientToken?: string;
  targetTaskRunStatus: StepTargetTaskRunStatus;
}
export const UpdateStepRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    stepId: S.String.pipe(T.HttpLabel("stepId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Client-Token"),
      T.IdempotencyToken(),
    ),
    targetTaskRunStatus: StepTargetTaskRunStatus,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/steps/{stepId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateStepRequest",
}) as any as S.Schema<UpdateStepRequest>;
export interface UpdateStepResponse {}
export const UpdateStepResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateStepResponse",
}) as any as S.Schema<UpdateStepResponse>;
export interface UpdateStorageProfileRequest {
  farmId: string;
  storageProfileId: string;
  clientToken?: string;
  displayName?: string;
  osFamily?: StorageProfileOperatingSystemFamily;
  fileSystemLocationsToAdd?: FileSystemLocation[];
  fileSystemLocationsToRemove?: FileSystemLocation[];
}
export const UpdateStorageProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    storageProfileId: S.String.pipe(T.HttpLabel("storageProfileId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Client-Token"),
      T.IdempotencyToken(),
    ),
    displayName: S.optional(S.String),
    osFamily: S.optional(StorageProfileOperatingSystemFamily),
    fileSystemLocationsToAdd: S.optional(FileSystemLocationsList),
    fileSystemLocationsToRemove: S.optional(FileSystemLocationsList),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/2023-10-12/farms/{farmId}/storage-profiles/{storageProfileId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateStorageProfileRequest",
}) as any as S.Schema<UpdateStorageProfileRequest>;
export interface UpdateStorageProfileResponse {}
export const UpdateStorageProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateStorageProfileResponse",
}) as any as S.Schema<UpdateStorageProfileResponse>;
export interface UpdateTaskRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
  taskId: string;
  clientToken?: string;
  targetRunStatus: TaskTargetRunStatus;
}
export const UpdateTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    queueId: S.String.pipe(T.HttpLabel("queueId")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    stepId: S.String.pipe(T.HttpLabel("stepId")),
    taskId: S.String.pipe(T.HttpLabel("taskId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Client-Token"),
      T.IdempotencyToken(),
    ),
    targetRunStatus: TaskTargetRunStatus,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/steps/{stepId}/tasks/{taskId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateTaskRequest",
}) as any as S.Schema<UpdateTaskRequest>;
export interface UpdateTaskResponse {}
export const UpdateTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateTaskResponse",
}) as any as S.Schema<UpdateTaskResponse>;
export type UpdatedWorkerStatus =
  | "STARTED"
  | "STOPPING"
  | "STOPPED"
  | (string & {});
export const UpdatedWorkerStatus = /*@__PURE__*/ S.String;

export interface WorkerAmountCapability {
  name: string;
  value: number;
}
export const WorkerAmountCapability = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, value: S.Number }),
).annotate({
  identifier: "WorkerAmountCapability",
}) as any as S.Schema<WorkerAmountCapability>;
export type WorkerAmountCapabilityList = WorkerAmountCapability[];
export const WorkerAmountCapabilityList = /*@__PURE__*/ S.Array(
  WorkerAmountCapability,
);
export interface WorkerAttributeCapability {
  name: string;
  values: string[];
}
export const WorkerAttributeCapability = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, values: AttributeCapabilityValuesList }),
).annotate({
  identifier: "WorkerAttributeCapability",
}) as any as S.Schema<WorkerAttributeCapability>;
export type WorkerAttributeCapabilityList = WorkerAttributeCapability[];
export const WorkerAttributeCapabilityList = /*@__PURE__*/ S.Array(
  WorkerAttributeCapability,
);
export interface WorkerCapabilities {
  amounts: WorkerAmountCapability[];
  attributes: WorkerAttributeCapability[];
}
export const WorkerCapabilities = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    amounts: WorkerAmountCapabilityList,
    attributes: WorkerAttributeCapabilityList,
  }),
).annotate({
  identifier: "WorkerCapabilities",
}) as any as S.Schema<WorkerCapabilities>;
export interface UpdateWorkerRequest {
  farmId: string;
  fleetId: string;
  workerId: string;
  status?: UpdatedWorkerStatus;
  capabilities?: WorkerCapabilities;
  hostProperties?: HostPropertiesRequest;
}
export const UpdateWorkerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    fleetId: S.String.pipe(T.HttpLabel("fleetId")),
    workerId: S.String.pipe(T.HttpLabel("workerId")),
    status: S.optional(UpdatedWorkerStatus),
    capabilities: S.optional(WorkerCapabilities),
    hostProperties: S.optional(HostPropertiesRequest),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/workers/{workerId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateWorkerRequest",
}) as any as S.Schema<UpdateWorkerRequest>;
export interface UpdateWorkerResponse {
  log?: LogConfiguration;
  hostConfiguration?: HostConfiguration;
}
export const UpdateWorkerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    log: S.optional(LogConfiguration),
    hostConfiguration: S.optional(HostConfiguration),
  }),
).annotate({
  identifier: "UpdateWorkerResponse",
}) as any as S.Schema<UpdateWorkerResponse>;
export type CompletedStatus =
  | "SUCCEEDED"
  | "FAILED"
  | "INTERRUPTED"
  | "CANCELED"
  | "NEVER_ATTEMPTED"
  | (string & {});
export const CompletedStatus = /*@__PURE__*/ S.String;

export interface TaskRunManifestPropertiesRequest {
  outputManifestPath?: string;
  outputManifestHash?: string;
}
export const TaskRunManifestPropertiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    outputManifestPath: S.optional(S.String),
    outputManifestHash: S.optional(S.String),
  }),
).annotate({
  identifier: "TaskRunManifestPropertiesRequest",
}) as any as S.Schema<TaskRunManifestPropertiesRequest>;
export type TaskRunManifestPropertiesListRequest =
  TaskRunManifestPropertiesRequest[];
export const TaskRunManifestPropertiesListRequest = /*@__PURE__*/ S.Array(
  TaskRunManifestPropertiesRequest,
);
export interface UpdatedSessionActionInfo {
  completedStatus?: CompletedStatus;
  processExitCode?: number;
  progressMessage?: string | redacted.Redacted<string>;
  startedAt?: Date;
  endedAt?: Date;
  updatedAt?: Date;
  progressPercent?: number;
  manifests?: TaskRunManifestPropertiesRequest[];
}
export const UpdatedSessionActionInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    completedStatus: S.optional(CompletedStatus),
    processExitCode: S.optional(S.Number),
    progressMessage: S.optional(SensitiveString),
    startedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    progressPercent: S.optional(S.Number),
    manifests: S.optional(TaskRunManifestPropertiesListRequest),
  }),
).annotate({
  identifier: "UpdatedSessionActionInfo",
}) as any as S.Schema<UpdatedSessionActionInfo>;
export type UpdatedSessionActions = {
  [key: string]: UpdatedSessionActionInfo | undefined;
};
export const UpdatedSessionActions = /*@__PURE__*/ S.Record(
  S.String,
  UpdatedSessionActionInfo.pipe(S.optional),
);
export interface UpdateWorkerScheduleRequest {
  farmId: string;
  fleetId: string;
  workerId: string;
  updatedSessionActions?: {
    [key: string]: UpdatedSessionActionInfo | undefined;
  };
}
export const UpdateWorkerScheduleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    farmId: S.String.pipe(T.HttpLabel("farmId")),
    fleetId: S.String.pipe(T.HttpLabel("fleetId")),
    workerId: S.String.pipe(T.HttpLabel("workerId")),
    updatedSessionActions: S.optional(UpdatedSessionActions),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/workers/{workerId}/schedule",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateWorkerScheduleRequest",
}) as any as S.Schema<UpdateWorkerScheduleRequest>;
export interface AssignedEnvironmentEnterSessionActionDefinition {
  environmentId: string;
}
export const AssignedEnvironmentEnterSessionActionDefinition =
  /*@__PURE__*/ S.suspend(() => S.Struct({ environmentId: S.String })).annotate(
    { identifier: "AssignedEnvironmentEnterSessionActionDefinition" },
  ) as any as S.Schema<AssignedEnvironmentEnterSessionActionDefinition>;
export interface AssignedEnvironmentExitSessionActionDefinition {
  environmentId: string;
}
export const AssignedEnvironmentExitSessionActionDefinition =
  /*@__PURE__*/ S.suspend(() => S.Struct({ environmentId: S.String })).annotate(
    { identifier: "AssignedEnvironmentExitSessionActionDefinition" },
  ) as any as S.Schema<AssignedEnvironmentExitSessionActionDefinition>;
export interface AssignedTaskRunSessionActionDefinition {
  taskId?: string;
  stepId: string;
  parameters: { [key: string]: TaskParameterValue | undefined };
}
export const AssignedTaskRunSessionActionDefinition = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      taskId: S.optional(S.String),
      stepId: S.String,
      parameters: TaskParameters,
    }),
).annotate({
  identifier: "AssignedTaskRunSessionActionDefinition",
}) as any as S.Schema<AssignedTaskRunSessionActionDefinition>;
export interface AssignedSyncInputJobAttachmentsSessionActionDefinition {
  stepId?: string;
}
export const AssignedSyncInputJobAttachmentsSessionActionDefinition =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ stepId: S.optional(S.String) }),
  ).annotate({
    identifier: "AssignedSyncInputJobAttachmentsSessionActionDefinition",
  }) as any as S.Schema<AssignedSyncInputJobAttachmentsSessionActionDefinition>;
export type AssignedSessionActionDefinition =
  | {
      envEnter: AssignedEnvironmentEnterSessionActionDefinition;
      envExit?: never;
      taskRun?: never;
      syncInputJobAttachments?: never;
    }
  | {
      envEnter?: never;
      envExit: AssignedEnvironmentExitSessionActionDefinition;
      taskRun?: never;
      syncInputJobAttachments?: never;
    }
  | {
      envEnter?: never;
      envExit?: never;
      taskRun: AssignedTaskRunSessionActionDefinition;
      syncInputJobAttachments?: never;
    }
  | {
      envEnter?: never;
      envExit?: never;
      taskRun?: never;
      syncInputJobAttachments: AssignedSyncInputJobAttachmentsSessionActionDefinition;
    };
export const AssignedSessionActionDefinition = /*@__PURE__*/ S.Union([
  S.Struct({ envEnter: AssignedEnvironmentEnterSessionActionDefinition }),
  S.Struct({ envExit: AssignedEnvironmentExitSessionActionDefinition }),
  S.Struct({ taskRun: AssignedTaskRunSessionActionDefinition }),
  S.Struct({
    syncInputJobAttachments:
      AssignedSyncInputJobAttachmentsSessionActionDefinition,
  }),
]);
export interface AssignedSessionAction {
  sessionActionId: string;
  definition: AssignedSessionActionDefinition;
}
export const AssignedSessionAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionActionId: S.String,
    definition: AssignedSessionActionDefinition,
  }),
).annotate({
  identifier: "AssignedSessionAction",
}) as any as S.Schema<AssignedSessionAction>;
export type AssignedSessionActions = AssignedSessionAction[];
export const AssignedSessionActions = /*@__PURE__*/ S.Array(
  AssignedSessionAction,
);
export interface AssignedSession {
  queueId: string;
  jobId: string;
  sessionActions: AssignedSessionAction[];
  logConfiguration: LogConfiguration;
}
export const AssignedSession = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queueId: S.String,
    jobId: S.String,
    sessionActions: AssignedSessionActions,
    logConfiguration: LogConfiguration,
  }),
).annotate({
  identifier: "AssignedSession",
}) as any as S.Schema<AssignedSession>;
export type AssignedSessions = { [key: string]: AssignedSession | undefined };
export const AssignedSessions = /*@__PURE__*/ S.Record(
  S.String,
  AssignedSession.pipe(S.optional),
);
export type SessionActionIdList = string[];
export const SessionActionIdList = /*@__PURE__*/ S.Array(S.String);
export type CancelSessionActions = { [key: string]: string[] | undefined };
export const CancelSessionActions = /*@__PURE__*/ S.Record(
  S.String,
  SessionActionIdList.pipe(S.optional),
);
export type DesiredWorkerStatus = "STOPPED" | (string & {});
export const DesiredWorkerStatus = /*@__PURE__*/ S.String;

export type UpdateWorkerScheduleInterval = number;
export interface UpdateWorkerScheduleResponse {
  assignedSessions: { [key: string]: AssignedSession | undefined };
  cancelSessionActions: { [key: string]: string[] | undefined };
  desiredWorkerStatus?: DesiredWorkerStatus;
  updateIntervalSeconds: number;
}
export const UpdateWorkerScheduleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assignedSessions: AssignedSessions,
    cancelSessionActions: CancelSessionActions,
    desiredWorkerStatus: S.optional(DesiredWorkerStatus),
    updateIntervalSeconds: S.Number,
  }),
).annotate({
  identifier: "UpdateWorkerScheduleResponse",
}) as any as S.Schema<UpdateWorkerScheduleResponse>;
export type ExceptionContext = { [key: string]: string | undefined };
export const ExceptionContext = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ServiceQuotaExceededExceptionReason =
  | "SERVICE_QUOTA_EXCEEDED_EXCEPTION"
  | "KMS_KEY_LIMIT_EXCEEDED"
  | "DEPENDENCY_LIMIT_EXCEEDED"
  | (string & {});
export const ServiceQuotaExceededExceptionReason = /*@__PURE__*/ S.String;

export type ValidationExceptionReason =
  | "UNKNOWN_OPERATION"
  | "CANNOT_PARSE"
  | "FIELD_VALIDATION_FAILED"
  | "OTHER"
  | (string & {});
export const ValidationExceptionReason = /*@__PURE__*/ S.String;

export interface ValidationExceptionField {
  name: string;
  message: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export type ConflictExceptionReason =
  | "CONFLICT_EXCEPTION"
  | "CONCURRENT_MODIFICATION"
  | "RESOURCE_ALREADY_EXISTS"
  | "RESOURCE_IN_USE"
  | "STATUS_CONFLICT"
  | (string & {});
export const ConflictExceptionReason = /*@__PURE__*/ S.String;

export type AssociateMemberToFarmError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns a farm membership level to a member.
 */
export const associateMemberToFarm: API.OperationMethod<
  AssociateMemberToFarmRequest,
  AssociateMemberToFarmResponse,
  AssociateMemberToFarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateMemberToFarmRequest,
  output: AssociateMemberToFarmResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateMemberToFarm",
  endpointHostPrefix: "management.",
}));

export type AssociateMemberToFleetError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns a fleet membership level to a member.
 */
export const associateMemberToFleet: API.OperationMethod<
  AssociateMemberToFleetRequest,
  AssociateMemberToFleetResponse,
  AssociateMemberToFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateMemberToFleetRequest,
  output: AssociateMemberToFleetResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateMemberToFleet",
  endpointHostPrefix: "management.",
}));

export type AssociateMemberToJobError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns a job membership level to a member
 */
export const associateMemberToJob: API.OperationMethod<
  AssociateMemberToJobRequest,
  AssociateMemberToJobResponse,
  AssociateMemberToJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateMemberToJobRequest,
  output: AssociateMemberToJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateMemberToJob",
  endpointHostPrefix: "management.",
}));

export type AssociateMemberToQueueError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns a queue membership level to a member
 */
export const associateMemberToQueue: API.OperationMethod<
  AssociateMemberToQueueRequest,
  AssociateMemberToQueueResponse,
  AssociateMemberToQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateMemberToQueueRequest,
  output: AssociateMemberToQueueResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateMemberToQueue",
  endpointHostPrefix: "management.",
}));

export type AssumeFleetRoleForReadError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get Amazon Web Services credentials from the fleet role. The IAM permissions of the credentials are scoped down to have read-only access.
 */
export const assumeFleetRoleForRead: API.OperationMethod<
  AssumeFleetRoleForReadRequest,
  AssumeFleetRoleForReadResponse,
  AssumeFleetRoleForReadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssumeFleetRoleForReadRequest,
  output: AssumeFleetRoleForReadResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssumeFleetRoleForRead",
  endpointHostPrefix: "management.",
}));

export type AssumeFleetRoleForWorkerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get credentials from the fleet role for a worker.
 */
export const assumeFleetRoleForWorker: API.OperationMethod<
  AssumeFleetRoleForWorkerRequest,
  AssumeFleetRoleForWorkerResponse,
  AssumeFleetRoleForWorkerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssumeFleetRoleForWorkerRequest,
  output: AssumeFleetRoleForWorkerResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssumeFleetRoleForWorker",
  endpointHostPrefix: "scheduling.",
}));

export type AssumeQueueRoleForReadError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets Amazon Web Services credentials from the queue role. The IAM permissions of the credentials are scoped down to have read-only access.
 */
export const assumeQueueRoleForRead: API.OperationMethod<
  AssumeQueueRoleForReadRequest,
  AssumeQueueRoleForReadResponse,
  AssumeQueueRoleForReadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssumeQueueRoleForReadRequest,
  output: AssumeQueueRoleForReadResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssumeQueueRoleForRead",
  endpointHostPrefix: "management.",
}));

export type AssumeQueueRoleForUserError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows a user to assume a role for a queue.
 */
export const assumeQueueRoleForUser: API.OperationMethod<
  AssumeQueueRoleForUserRequest,
  AssumeQueueRoleForUserResponse,
  AssumeQueueRoleForUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssumeQueueRoleForUserRequest,
  output: AssumeQueueRoleForUserResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssumeQueueRoleForUser",
  endpointHostPrefix: "management.",
}));

export type AssumeQueueRoleForWorkerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows a worker to assume a queue role.
 */
export const assumeQueueRoleForWorker: API.OperationMethod<
  AssumeQueueRoleForWorkerRequest,
  AssumeQueueRoleForWorkerResponse,
  AssumeQueueRoleForWorkerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssumeQueueRoleForWorkerRequest,
  output: AssumeQueueRoleForWorkerResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssumeQueueRoleForWorker",
  endpointHostPrefix: "scheduling.",
}));

export type BatchGetJobError =
  | AccessDeniedException
  | InternalServerErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves multiple jobs in a single request. This is a batch version of the `GetJob` API.
 *
 * The result of getting each job is reported individually in the response. Because the batch request can result in a combination of successful and unsuccessful actions, you should check for batch errors even when the call returns an HTTP status code of 200.
 */
export const batchGetJob: API.OperationMethod<
  BatchGetJobRequest,
  BatchGetJobResponse,
  BatchGetJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetJobRequest,
  output: BatchGetJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetJob",
  endpointHostPrefix: "management.",
}));

export type BatchGetJobEntityError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get batched job details for a worker.
 */
export const batchGetJobEntity: API.OperationMethod<
  BatchGetJobEntityRequest,
  BatchGetJobEntityResponse,
  BatchGetJobEntityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetJobEntityRequest,
  output: BatchGetJobEntityResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetJobEntity",
  endpointHostPrefix: "scheduling.",
}));

export type BatchGetSessionError =
  | AccessDeniedException
  | InternalServerErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves multiple sessions in a single request. This is a batch version of the `GetSession` API.
 *
 * The result of getting each session is reported individually in the response. Because the batch request can result in a combination of successful and unsuccessful actions, you should check for batch errors even when the call returns an HTTP status code of 200.
 */
export const batchGetSession: API.OperationMethod<
  BatchGetSessionRequest,
  BatchGetSessionResponse,
  BatchGetSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetSessionRequest,
  output: BatchGetSessionResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetSession",
  endpointHostPrefix: "management.",
}));

export type BatchGetSessionActionError =
  | AccessDeniedException
  | InternalServerErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves multiple session actions in a single request. This is a batch version of the `GetSessionAction` API.
 *
 * The result of getting each session action is reported individually in the response. Because the batch request can result in a combination of successful and unsuccessful actions, you should check for batch errors even when the call returns an HTTP status code of 200.
 */
export const batchGetSessionAction: API.OperationMethod<
  BatchGetSessionActionRequest,
  BatchGetSessionActionResponse,
  BatchGetSessionActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetSessionActionRequest,
  output: BatchGetSessionActionResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetSessionAction",
  endpointHostPrefix: "management.",
}));

export type BatchGetStepError =
  | AccessDeniedException
  | InternalServerErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves multiple steps in a single request. This is a batch version of the `GetStep` API.
 *
 * The result of getting each step is reported individually in the response. Because the batch request can result in a combination of successful and unsuccessful actions, you should check for batch errors even when the call returns an HTTP status code of 200.
 */
export const batchGetStep: API.OperationMethod<
  BatchGetStepRequest,
  BatchGetStepResponse,
  BatchGetStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetStepRequest,
  output: BatchGetStepResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetStep",
  endpointHostPrefix: "management.",
}));

export type BatchGetTaskError =
  | AccessDeniedException
  | InternalServerErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves multiple tasks in a single request. This is a batch version of the `GetTask` API.
 *
 * The result of getting each task is reported individually in the response. Because the batch request can result in a combination of successful and unsuccessful actions, you should check for batch errors even when the call returns an HTTP status code of 200.
 */
export const batchGetTask: API.OperationMethod<
  BatchGetTaskRequest,
  BatchGetTaskResponse,
  BatchGetTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetTaskRequest,
  output: BatchGetTaskResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetTask",
  endpointHostPrefix: "management.",
}));

export type BatchGetWorkerError =
  | AccessDeniedException
  | InternalServerErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves multiple workers in a single request. This is a batch version of the `GetWorker` API.
 *
 * The result of getting each worker is reported individually in the response. Because the batch request can result in a combination of successful and unsuccessful actions, you should check for batch errors even when the call returns an HTTP status code of 200.
 */
export const batchGetWorker: API.OperationMethod<
  BatchGetWorkerRequest,
  BatchGetWorkerResponse,
  BatchGetWorkerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetWorkerRequest,
  output: BatchGetWorkerResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetWorker",
  endpointHostPrefix: "management.",
}));

export type BatchUpdateJobError =
  | AccessDeniedException
  | InternalServerErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates multiple jobs in a single request. This is a batch version of the `UpdateJob` API.
 *
 * The result of updating each job is reported individually in the response. Because the batch request can result in a combination of successful and unsuccessful actions, you should check for batch errors even when the call returns an HTTP status code of 200.
 *
 * When you change the status of a job to `ARCHIVED`, the job can't be scheduled or archived.
 *
 * An archived job and its steps and tasks are deleted after 120 days. The job can't be recovered.
 */
export const batchUpdateJob: API.OperationMethod<
  BatchUpdateJobRequest,
  BatchUpdateJobResponse,
  BatchUpdateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchUpdateJobRequest,
  output: BatchUpdateJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateJob",
  endpointHostPrefix: "management.",
}));

export type BatchUpdateTaskError =
  | AccessDeniedException
  | InternalServerErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates multiple tasks in a single request. This is a batch version of the `UpdateTask` API.
 *
 * The result of updating each task is reported individually in the response. Because the batch request can result in a combination of successful and unsuccessful actions, you should check for batch errors even when the call returns an HTTP status code of 200.
 */
export const batchUpdateTask: API.OperationMethod<
  BatchUpdateTaskRequest,
  BatchUpdateTaskResponse,
  BatchUpdateTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchUpdateTaskRequest,
  output: BatchUpdateTaskResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateTask",
  endpointHostPrefix: "management.",
}));

export type CopyJobTemplateError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Copies a job template to an Amazon S3 bucket.
 */
export const copyJobTemplate: API.OperationMethod<
  CopyJobTemplateRequest,
  CopyJobTemplateResponse,
  CopyJobTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CopyJobTemplateRequest,
  output: CopyJobTemplateResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyJobTemplate",
  endpointHostPrefix: "management.",
}));

export type CreateBudgetError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | CommonErrors;
/**
 * Creates a budget to set spending thresholds for your rendering activity.
 */
export const createBudget: API.OperationMethod<
  CreateBudgetRequest,
  CreateBudgetResponse,
  CreateBudgetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBudgetRequest,
  output: CreateBudgetResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBudget",
  endpointHostPrefix: "management.",
}));

export type CreateFarmError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a farm to allow space for queues and fleets. Farms are the space where the components of your renders gather and are pieced together in the cloud. Farms contain budgets and allow you to enforce permissions. Deadline Cloud farms are a useful container for large projects.
 */
export const createFarm: API.OperationMethod<
  CreateFarmRequest,
  CreateFarmResponse,
  CreateFarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFarmRequest,
  output: CreateFarmResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFarm",
  endpointHostPrefix: "management.",
}));

export type CreateFleetError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | CommonErrors;
/**
 * Creates a fleet. Fleets gather information relating to compute, or capacity, for renders within your farms. You can choose to manage your own capacity or opt to have fleets fully managed by Deadline Cloud.
 */
export const createFleet: API.OperationMethod<
  CreateFleetRequest,
  CreateFleetResponse,
  CreateFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFleetRequest,
  output: CreateFleetResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFleet",
  endpointHostPrefix: "management.",
}));

export type CreateJobError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a job. A job is a set of instructions that Deadline Cloud uses to schedule and run work on available workers. For more information, see Deadline Cloud jobs.
 */
export const createJob: API.OperationMethod<
  CreateJobRequest,
  CreateJobResponse,
  CreateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateJobRequest,
  output: CreateJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJob",
  endpointHostPrefix: "management.",
}));

export type CreateLicenseEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a license endpoint to integrate your various licensed software used for rendering on Deadline Cloud.
 */
export const createLicenseEndpoint: API.OperationMethod<
  CreateLicenseEndpointRequest,
  CreateLicenseEndpointResponse,
  CreateLicenseEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLicenseEndpointRequest,
  output: CreateLicenseEndpointResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLicenseEndpoint",
  endpointHostPrefix: "management.",
}));

export type CreateLimitError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a limit that manages the distribution of shared resources, such as floating licenses. A limit can throttle work assignments, help manage workloads, and track current usage. Before you use a limit, you must associate the limit with one or more queues.
 *
 * You must add the `amountRequirementName` to a step in a job template to declare the limit requirement.
 */
export const createLimit: API.OperationMethod<
  CreateLimitRequest,
  CreateLimitResponse,
  CreateLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLimitRequest,
  output: CreateLimitResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLimit",
  endpointHostPrefix: "management.",
}));

export type CreateMonitorError =
  | AccessDeniedException
  | InternalServerErrorException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | CommonErrors;
/**
 * Creates an Amazon Web Services Deadline Cloud monitor that you can use to view your farms, queues, and fleets. After you submit a job, you can track the progress of the tasks and steps that make up the job, and then download the job's results.
 */
export const createMonitor: API.OperationMethod<
  CreateMonitorRequest,
  CreateMonitorResponse,
  CreateMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMonitorRequest,
  output: CreateMonitorResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMonitor",
  endpointHostPrefix: "management.",
}));

export type CreateQueueError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | CommonErrors;
/**
 * Creates a queue to coordinate the order in which jobs run on a farm. A queue can also specify where to pull resources and indicate where to output completed jobs.
 */
export const createQueue: API.OperationMethod<
  CreateQueueRequest,
  CreateQueueResponse,
  CreateQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateQueueRequest,
  output: CreateQueueResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQueue",
  endpointHostPrefix: "management.",
}));

export type CreateQueueEnvironmentError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an environment for a queue that defines how jobs in the queue run.
 */
export const createQueueEnvironment: API.OperationMethod<
  CreateQueueEnvironmentRequest,
  CreateQueueEnvironmentResponse,
  CreateQueueEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateQueueEnvironmentRequest,
  output: CreateQueueEnvironmentResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQueueEnvironment",
  endpointHostPrefix: "management.",
}));

export type CreateQueueFleetAssociationError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an association between a queue and a fleet.
 */
export const createQueueFleetAssociation: API.OperationMethod<
  CreateQueueFleetAssociationRequest,
  CreateQueueFleetAssociationResponse,
  CreateQueueFleetAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateQueueFleetAssociationRequest,
  output: CreateQueueFleetAssociationResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQueueFleetAssociation",
  endpointHostPrefix: "management.",
}));

export type CreateQueueLimitAssociationError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a limit with a particular queue. After the limit is associated, all workers for jobs that specify the limit associated with the queue are subject to the limit. You can't associate two limits with the same `amountRequirementName` to the same queue.
 */
export const createQueueLimitAssociation: API.OperationMethod<
  CreateQueueLimitAssociationRequest,
  CreateQueueLimitAssociationResponse,
  CreateQueueLimitAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateQueueLimitAssociationRequest,
  output: CreateQueueLimitAssociationResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQueueLimitAssociation",
  endpointHostPrefix: "management.",
}));

export type CreateStorageProfileError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | CommonErrors;
/**
 * Creates a storage profile that specifies the operating system, file type, and file location of resources used on a farm.
 */
export const createStorageProfile: API.OperationMethod<
  CreateStorageProfileRequest,
  CreateStorageProfileResponse,
  CreateStorageProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateStorageProfileRequest,
  output: CreateStorageProfileResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStorageProfile",
  endpointHostPrefix: "management.",
}));

export type CreateWorkerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a worker. A worker tells your instance how much processing power (vCPU), and memory (GiB) you’ll need to assemble the digital assets held within a particular instance. You can specify certain instance types to use, or let the worker know which instances types to exclude.
 *
 * Deadline Cloud limits the number of workers to less than or equal to the fleet's maximum worker count. The service maintains eventual consistency for the worker count. If you make multiple rapid calls to `CreateWorker` before the field updates, you might exceed your fleet's maximum worker count. For example, if your `maxWorkerCount` is 10 and you currently have 9 workers, making two quick `CreateWorker` calls might successfully create 2 workers instead of 1, resulting in 11 total workers.
 */
export const createWorker: API.OperationMethod<
  CreateWorkerRequest,
  CreateWorkerResponse,
  CreateWorkerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWorkerRequest,
  output: CreateWorkerResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorker",
  endpointHostPrefix: "scheduling.",
}));

export type DeleteBudgetError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | CommonErrors;
/**
 * Deletes a budget.
 */
export const deleteBudget: API.OperationMethod<
  DeleteBudgetRequest,
  DeleteBudgetResponse,
  DeleteBudgetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBudgetRequest,
  output: DeleteBudgetResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBudget",
  endpointHostPrefix: "management.",
}));

export type DeleteFarmError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | CommonErrors;
/**
 * Deletes a farm.
 */
export const deleteFarm: API.OperationMethod<
  DeleteFarmRequest,
  DeleteFarmResponse,
  DeleteFarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFarmRequest,
  output: DeleteFarmResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFarm",
  endpointHostPrefix: "management.",
}));

export type DeleteFleetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a fleet.
 */
export const deleteFleet: API.OperationMethod<
  DeleteFleetRequest,
  DeleteFleetResponse,
  DeleteFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFleetRequest,
  output: DeleteFleetResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFleet",
  endpointHostPrefix: "management.",
}));

export type DeleteLicenseEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a license endpoint.
 */
export const deleteLicenseEndpoint: API.OperationMethod<
  DeleteLicenseEndpointRequest,
  DeleteLicenseEndpointResponse,
  DeleteLicenseEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLicenseEndpointRequest,
  output: DeleteLicenseEndpointResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLicenseEndpoint",
  endpointHostPrefix: "management.",
}));

export type DeleteLimitError =
  | AccessDeniedException
  | InternalServerErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a limit from the specified farm. Before you delete a limit you must use the `DeleteQueueLimitAssociation` operation to remove the association with any queues.
 */
export const deleteLimit: API.OperationMethod<
  DeleteLimitRequest,
  DeleteLimitResponse,
  DeleteLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLimitRequest,
  output: DeleteLimitResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLimit",
  endpointHostPrefix: "management.",
}));

export type DeleteMeteredProductError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a metered product.
 */
export const deleteMeteredProduct: API.OperationMethod<
  DeleteMeteredProductRequest,
  DeleteMeteredProductResponse,
  DeleteMeteredProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMeteredProductRequest,
  output: DeleteMeteredProductResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMeteredProduct",
  endpointHostPrefix: "management.",
}));

export type DeleteMonitorError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | CommonErrors;
/**
 * Removes a Deadline Cloud monitor. After you delete a monitor, you can create a new one and attach farms to the monitor.
 */
export const deleteMonitor: API.OperationMethod<
  DeleteMonitorRequest,
  DeleteMonitorResponse,
  DeleteMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMonitorRequest,
  output: DeleteMonitorResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMonitor",
  endpointHostPrefix: "management.",
}));

export type DeleteQueueError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a queue.
 *
 * You can't recover the jobs in a queue if you delete the queue. Deleting the queue also deletes the jobs in that queue.
 */
export const deleteQueue: API.OperationMethod<
  DeleteQueueRequest,
  DeleteQueueResponse,
  DeleteQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteQueueRequest,
  output: DeleteQueueResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQueue",
  endpointHostPrefix: "management.",
}));

export type DeleteQueueEnvironmentError =
  | AccessDeniedException
  | InternalServerErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a queue environment.
 */
export const deleteQueueEnvironment: API.OperationMethod<
  DeleteQueueEnvironmentRequest,
  DeleteQueueEnvironmentResponse,
  DeleteQueueEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteQueueEnvironmentRequest,
  output: DeleteQueueEnvironmentResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQueueEnvironment",
  endpointHostPrefix: "management.",
}));

export type DeleteQueueFleetAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a queue-fleet association.
 */
export const deleteQueueFleetAssociation: API.OperationMethod<
  DeleteQueueFleetAssociationRequest,
  DeleteQueueFleetAssociationResponse,
  DeleteQueueFleetAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteQueueFleetAssociationRequest,
  output: DeleteQueueFleetAssociationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQueueFleetAssociation",
  endpointHostPrefix: "management.",
}));

export type DeleteQueueLimitAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the association between a queue and a limit. You must use the `UpdateQueueLimitAssociation` operation to set the status to `STOP_LIMIT_USAGE_AND_COMPLETE_TASKS` or `STOP_LIMIT_USAGE_AND_CANCEL_TASKS`. The status does not change immediately. Use the `GetQueueLimitAssociation` operation to see if the status changed to `STOPPED` before deleting the association.
 */
export const deleteQueueLimitAssociation: API.OperationMethod<
  DeleteQueueLimitAssociationRequest,
  DeleteQueueLimitAssociationResponse,
  DeleteQueueLimitAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteQueueLimitAssociationRequest,
  output: DeleteQueueLimitAssociationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQueueLimitAssociation",
  endpointHostPrefix: "management.",
}));

export type DeleteStorageProfileError =
  | AccessDeniedException
  | InternalServerErrorException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a storage profile.
 */
export const deleteStorageProfile: API.OperationMethod<
  DeleteStorageProfileRequest,
  DeleteStorageProfileResponse,
  DeleteStorageProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteStorageProfileRequest,
  output: DeleteStorageProfileResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ThrottlingException,
    ValidationException,
    ConflictException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStorageProfile",
  endpointHostPrefix: "management.",
}));

export type DeleteVolumeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a persistent volume.
 */
export const deleteVolume: API.OperationMethod<
  DeleteVolumeRequest,
  DeleteVolumeResponse,
  DeleteVolumeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVolumeRequest,
  output: DeleteVolumeResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVolume",
  endpointHostPrefix: "management.",
}));

export type DeleteWorkerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a worker.
 */
export const deleteWorker: API.OperationMethod<
  DeleteWorkerRequest,
  DeleteWorkerResponse,
  DeleteWorkerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWorkerRequest,
  output: DeleteWorkerResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorker",
  endpointHostPrefix: "management.",
}));

export type DisassociateMemberFromFarmError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a member from a farm.
 */
export const disassociateMemberFromFarm: API.OperationMethod<
  DisassociateMemberFromFarmRequest,
  DisassociateMemberFromFarmResponse,
  DisassociateMemberFromFarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateMemberFromFarmRequest,
  output: DisassociateMemberFromFarmResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateMemberFromFarm",
  endpointHostPrefix: "management.",
}));

export type DisassociateMemberFromFleetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a member from a fleet.
 */
export const disassociateMemberFromFleet: API.OperationMethod<
  DisassociateMemberFromFleetRequest,
  DisassociateMemberFromFleetResponse,
  DisassociateMemberFromFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateMemberFromFleetRequest,
  output: DisassociateMemberFromFleetResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateMemberFromFleet",
  endpointHostPrefix: "management.",
}));

export type DisassociateMemberFromJobError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a member from a job.
 */
export const disassociateMemberFromJob: API.OperationMethod<
  DisassociateMemberFromJobRequest,
  DisassociateMemberFromJobResponse,
  DisassociateMemberFromJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateMemberFromJobRequest,
  output: DisassociateMemberFromJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateMemberFromJob",
  endpointHostPrefix: "management.",
}));

export type DisassociateMemberFromQueueError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a member from a queue.
 */
export const disassociateMemberFromQueue: API.OperationMethod<
  DisassociateMemberFromQueueRequest,
  DisassociateMemberFromQueueResponse,
  DisassociateMemberFromQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateMemberFromQueueRequest,
  output: DisassociateMemberFromQueueResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateMemberFromQueue",
  endpointHostPrefix: "management.",
}));

export type GetBudgetError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a budget.
 */
export const getBudget: API.OperationMethod<
  GetBudgetRequest,
  GetBudgetResponse,
  GetBudgetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBudgetRequest,
  output: GetBudgetResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBudget",
  endpointHostPrefix: "management.",
}));

export type GetFarmError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a farm.
 */
export const getFarm: API.OperationMethod<
  GetFarmRequest,
  GetFarmResponse,
  GetFarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFarmRequest,
  output: GetFarmResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFarm",
  endpointHostPrefix: "management.",
}));

export type GetFleetError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a fleet.
 */
export const getFleet: API.OperationMethod<
  GetFleetRequest,
  GetFleetResponse,
  GetFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFleetRequest,
  output: GetFleetResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFleet",
  endpointHostPrefix: "management.",
}));

export type GetJobError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a Deadline Cloud job.
 */
export const getJob: API.OperationMethod<
  GetJobRequest,
  GetJobResponse,
  GetJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJobRequest,
  output: GetJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJob",
  endpointHostPrefix: "management.",
}));

export type GetLicenseEndpointError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a licence endpoint.
 */
export const getLicenseEndpoint: API.OperationMethod<
  GetLicenseEndpointRequest,
  GetLicenseEndpointResponse,
  GetLicenseEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLicenseEndpointRequest,
  output: GetLicenseEndpointResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLicenseEndpoint",
  endpointHostPrefix: "management.",
}));

export type GetLimitError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a specific limit.
 */
export const getLimit: API.OperationMethod<
  GetLimitRequest,
  GetLimitResponse,
  GetLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLimitRequest,
  output: GetLimitResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLimit",
  endpointHostPrefix: "management.",
}));

export type GetMonitorError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified monitor.
 */
export const getMonitor: API.OperationMethod<
  GetMonitorRequest,
  GetMonitorResponse,
  GetMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMonitorRequest,
  output: GetMonitorResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMonitor",
  endpointHostPrefix: "management.",
}));

export type GetMonitorSettingsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the settings for a Deadline Cloud monitor.
 */
export const getMonitorSettings: API.OperationMethod<
  GetMonitorSettingsRequest,
  GetMonitorSettingsResponse,
  GetMonitorSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMonitorSettingsRequest,
  output: GetMonitorSettingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMonitorSettings",
  endpointHostPrefix: "management.",
}));

export type GetQueueError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a queue.
 */
export const getQueue: API.OperationMethod<
  GetQueueRequest,
  GetQueueResponse,
  GetQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetQueueRequest,
  output: GetQueueResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueue",
  endpointHostPrefix: "management.",
}));

export type GetQueueEnvironmentError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a queue environment.
 */
export const getQueueEnvironment: API.OperationMethod<
  GetQueueEnvironmentRequest,
  GetQueueEnvironmentResponse,
  GetQueueEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetQueueEnvironmentRequest,
  output: GetQueueEnvironmentResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueueEnvironment",
  endpointHostPrefix: "management.",
}));

export type GetQueueFleetAssociationError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a queue-fleet association.
 */
export const getQueueFleetAssociation: API.OperationMethod<
  GetQueueFleetAssociationRequest,
  GetQueueFleetAssociationResponse,
  GetQueueFleetAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetQueueFleetAssociationRequest,
  output: GetQueueFleetAssociationResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueueFleetAssociation",
  endpointHostPrefix: "management.",
}));

export type GetQueueLimitAssociationError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a specific association between a queue and a limit.
 */
export const getQueueLimitAssociation: API.OperationMethod<
  GetQueueLimitAssociationRequest,
  GetQueueLimitAssociationResponse,
  GetQueueLimitAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetQueueLimitAssociationRequest,
  output: GetQueueLimitAssociationResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueueLimitAssociation",
  endpointHostPrefix: "management.",
}));

export type GetSessionError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a session.
 */
export const getSession: API.OperationMethod<
  GetSessionRequest,
  GetSessionResponse,
  GetSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSessionRequest,
  output: GetSessionResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSession",
  endpointHostPrefix: "management.",
}));

export type GetSessionActionError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a session action for the job.
 */
export const getSessionAction: API.OperationMethod<
  GetSessionActionRequest,
  GetSessionActionResponse,
  GetSessionActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSessionActionRequest,
  output: GetSessionActionResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSessionAction",
  endpointHostPrefix: "management.",
}));

export type GetSessionsStatisticsAggregationError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a set of statistics for queues or farms. Before you can call the `GetSessionStatisticsAggregation` operation, you must first call the `StartSessionsStatisticsAggregation` operation. Statistics are available for 1 hour after you call the `StartSessionsStatisticsAggregation` operation.
 */
export const getSessionsStatisticsAggregation: API.PaginatedOperationMethod<
  GetSessionsStatisticsAggregationRequest,
  GetSessionsStatisticsAggregationResponse,
  GetSessionsStatisticsAggregationError,
  Credentials | HttpClient.HttpClient,
  Statistics
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetSessionsStatisticsAggregationRequest,
  output: GetSessionsStatisticsAggregationResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSessionsStatisticsAggregation",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "statistics",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetStepError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a step.
 */
export const getStep: API.OperationMethod<
  GetStepRequest,
  GetStepResponse,
  GetStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetStepRequest,
  output: GetStepResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStep",
  endpointHostPrefix: "management.",
}));

export type GetStorageProfileError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a storage profile.
 */
export const getStorageProfile: API.OperationMethod<
  GetStorageProfileRequest,
  GetStorageProfileResponse,
  GetStorageProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetStorageProfileRequest,
  output: GetStorageProfileResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStorageProfile",
  endpointHostPrefix: "management.",
}));

export type GetStorageProfileForQueueError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a storage profile for a queue.
 */
export const getStorageProfileForQueue: API.OperationMethod<
  GetStorageProfileForQueueRequest,
  GetStorageProfileForQueueResponse,
  GetStorageProfileForQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetStorageProfileForQueueRequest,
  output: GetStorageProfileForQueueResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStorageProfileForQueue",
  endpointHostPrefix: "management.",
}));

export type GetTaskError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a task.
 */
export const getTask: API.OperationMethod<
  GetTaskRequest,
  GetTaskResponse,
  GetTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTaskRequest,
  output: GetTaskResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTask",
  endpointHostPrefix: "management.",
}));

export type GetVolumeError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a persistent volume.
 */
export const getVolume: API.OperationMethod<
  GetVolumeRequest,
  GetVolumeResponse,
  GetVolumeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetVolumeRequest,
  output: GetVolumeResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVolume",
  endpointHostPrefix: "management.",
}));

export type GetWorkerError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a worker.
 */
export const getWorker: API.OperationMethod<
  GetWorkerRequest,
  GetWorkerResponse,
  GetWorkerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWorkerRequest,
  output: GetWorkerResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorker",
  endpointHostPrefix: "management.",
}));

export type ListAvailableMeteredProductsError =
  | InternalServerErrorException
  | ThrottlingException
  | CommonErrors;
/**
 * A list of the available metered products.
 */
export const listAvailableMeteredProducts: API.PaginatedOperationMethod<
  ListAvailableMeteredProductsRequest,
  ListAvailableMeteredProductsResponse,
  ListAvailableMeteredProductsError,
  Credentials | HttpClient.HttpClient,
  MeteredProductSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAvailableMeteredProductsRequest,
  output: ListAvailableMeteredProductsResponse,
  errors: [InternalServerErrorException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAvailableMeteredProducts",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "meteredProducts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBudgetsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A list of budgets in a farm.
 */
export const listBudgets: API.PaginatedOperationMethod<
  ListBudgetsRequest,
  ListBudgetsResponse,
  ListBudgetsError,
  Credentials | HttpClient.HttpClient,
  BudgetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBudgetsRequest,
  output: ListBudgetsResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBudgets",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "budgets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFarmMembersError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the members of a farm.
 */
export const listFarmMembers: API.PaginatedOperationMethod<
  ListFarmMembersRequest,
  ListFarmMembersResponse,
  ListFarmMembersError,
  Credentials | HttpClient.HttpClient,
  FarmMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFarmMembersRequest,
  output: ListFarmMembersResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFarmMembers",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "members",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFarmsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists farms.
 */
export const listFarms: API.PaginatedOperationMethod<
  ListFarmsRequest,
  ListFarmsResponse,
  ListFarmsError,
  Credentials | HttpClient.HttpClient,
  FarmSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFarmsRequest,
  output: ListFarmsResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFarms",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "farms",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFleetMembersError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists fleet members.
 */
export const listFleetMembers: API.PaginatedOperationMethod<
  ListFleetMembersRequest,
  ListFleetMembersResponse,
  ListFleetMembersError,
  Credentials | HttpClient.HttpClient,
  FleetMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFleetMembersRequest,
  output: ListFleetMembersResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFleetMembers",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "members",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFleetsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists fleets.
 */
export const listFleets: API.PaginatedOperationMethod<
  ListFleetsRequest,
  ListFleetsResponse,
  ListFleetsError,
  Credentials | HttpClient.HttpClient,
  FleetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFleetsRequest,
  output: ListFleetsResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFleets",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "fleets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobMembersError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists members on a job.
 */
export const listJobMembers: API.PaginatedOperationMethod<
  ListJobMembersRequest,
  ListJobMembersResponse,
  ListJobMembersError,
  Credentials | HttpClient.HttpClient,
  JobMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListJobMembersRequest,
  output: ListJobMembersResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobMembers",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "members",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobParameterDefinitionsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists parameter definitions of a job.
 */
export const listJobParameterDefinitions: API.PaginatedOperationMethod<
  ListJobParameterDefinitionsRequest,
  ListJobParameterDefinitionsResponse,
  ListJobParameterDefinitionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListJobParameterDefinitionsRequest,
  output: ListJobParameterDefinitionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobParameterDefinitions",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobParameterDefinitions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists jobs.
 */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsRequest,
  ListJobsResponse,
  ListJobsError,
  Credentials | HttpClient.HttpClient,
  JobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListJobsRequest,
  output: ListJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobs",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListLicenseEndpointsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists license endpoints.
 */
export const listLicenseEndpoints: API.PaginatedOperationMethod<
  ListLicenseEndpointsRequest,
  ListLicenseEndpointsResponse,
  ListLicenseEndpointsError,
  Credentials | HttpClient.HttpClient,
  LicenseEndpointSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLicenseEndpointsRequest,
  output: ListLicenseEndpointsResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLicenseEndpoints",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "licenseEndpoints",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListLimitsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of limits defined in the specified farm.
 */
export const listLimits: API.PaginatedOperationMethod<
  ListLimitsRequest,
  ListLimitsResponse,
  ListLimitsError,
  Credentials | HttpClient.HttpClient,
  LimitSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLimitsRequest,
  output: ListLimitsResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLimits",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "limits",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMeteredProductsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists metered products.
 */
export const listMeteredProducts: API.PaginatedOperationMethod<
  ListMeteredProductsRequest,
  ListMeteredProductsResponse,
  ListMeteredProductsError,
  Credentials | HttpClient.HttpClient,
  MeteredProductSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMeteredProductsRequest,
  output: ListMeteredProductsResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMeteredProducts",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "meteredProducts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMonitorsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of your monitors in Deadline Cloud.
 */
export const listMonitors: API.PaginatedOperationMethod<
  ListMonitorsRequest,
  ListMonitorsResponse,
  ListMonitorsError,
  Credentials | HttpClient.HttpClient,
  MonitorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMonitorsRequest,
  output: ListMonitorsResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMonitors",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "monitors",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListQueueEnvironmentsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists queue environments.
 */
export const listQueueEnvironments: API.PaginatedOperationMethod<
  ListQueueEnvironmentsRequest,
  ListQueueEnvironmentsResponse,
  ListQueueEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  QueueEnvironmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListQueueEnvironmentsRequest,
  output: ListQueueEnvironmentsResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQueueEnvironments",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "environments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListQueueFleetAssociationsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists queue-fleet associations.
 */
export const listQueueFleetAssociations: API.PaginatedOperationMethod<
  ListQueueFleetAssociationsRequest,
  ListQueueFleetAssociationsResponse,
  ListQueueFleetAssociationsError,
  Credentials | HttpClient.HttpClient,
  QueueFleetAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListQueueFleetAssociationsRequest,
  output: ListQueueFleetAssociationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQueueFleetAssociations",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "queueFleetAssociations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListQueueLimitAssociationsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets a list of the associations between queues and limits defined in a farm.
 */
export const listQueueLimitAssociations: API.PaginatedOperationMethod<
  ListQueueLimitAssociationsRequest,
  ListQueueLimitAssociationsResponse,
  ListQueueLimitAssociationsError,
  Credentials | HttpClient.HttpClient,
  QueueLimitAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListQueueLimitAssociationsRequest,
  output: ListQueueLimitAssociationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQueueLimitAssociations",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "queueLimitAssociations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListQueueMembersError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the members in a queue.
 */
export const listQueueMembers: API.PaginatedOperationMethod<
  ListQueueMembersRequest,
  ListQueueMembersResponse,
  ListQueueMembersError,
  Credentials | HttpClient.HttpClient,
  QueueMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListQueueMembersRequest,
  output: ListQueueMembersResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQueueMembers",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "members",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListQueuesError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists queues.
 */
export const listQueues: API.PaginatedOperationMethod<
  ListQueuesRequest,
  ListQueuesResponse,
  ListQueuesError,
  Credentials | HttpClient.HttpClient,
  QueueSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListQueuesRequest,
  output: ListQueuesResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQueues",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "queues",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSessionActionsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists session actions.
 */
export const listSessionActions: API.PaginatedOperationMethod<
  ListSessionActionsRequest,
  ListSessionActionsResponse,
  ListSessionActionsError,
  Credentials | HttpClient.HttpClient,
  SessionActionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSessionActionsRequest,
  output: ListSessionActionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSessionActions",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sessionActions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSessionsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists sessions.
 */
export const listSessions: API.PaginatedOperationMethod<
  ListSessionsRequest,
  ListSessionsResponse,
  ListSessionsError,
  Credentials | HttpClient.HttpClient,
  SessionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSessionsRequest,
  output: ListSessionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSessions",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sessions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSessionsForWorkerError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists sessions for a worker.
 */
export const listSessionsForWorker: API.PaginatedOperationMethod<
  ListSessionsForWorkerRequest,
  ListSessionsForWorkerResponse,
  ListSessionsForWorkerError,
  Credentials | HttpClient.HttpClient,
  WorkerSessionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSessionsForWorkerRequest,
  output: ListSessionsForWorkerResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSessionsForWorker",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sessions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStepConsumersError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists step consumers.
 */
export const listStepConsumers: API.PaginatedOperationMethod<
  ListStepConsumersRequest,
  ListStepConsumersResponse,
  ListStepConsumersError,
  Credentials | HttpClient.HttpClient,
  StepConsumer
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStepConsumersRequest,
  output: ListStepConsumersResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStepConsumers",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "consumers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStepDependenciesError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the dependencies for a step.
 */
export const listStepDependencies: API.PaginatedOperationMethod<
  ListStepDependenciesRequest,
  ListStepDependenciesResponse,
  ListStepDependenciesError,
  Credentials | HttpClient.HttpClient,
  StepDependency
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStepDependenciesRequest,
  output: ListStepDependenciesResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStepDependencies",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dependencies",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStepsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists steps for a job.
 */
export const listSteps: API.PaginatedOperationMethod<
  ListStepsRequest,
  ListStepsResponse,
  ListStepsError,
  Credentials | HttpClient.HttpClient,
  StepSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStepsRequest,
  output: ListStepsResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSteps",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "steps",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStorageProfilesError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists storage profiles.
 */
export const listStorageProfiles: API.PaginatedOperationMethod<
  ListStorageProfilesRequest,
  ListStorageProfilesResponse,
  ListStorageProfilesError,
  Credentials | HttpClient.HttpClient,
  StorageProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStorageProfilesRequest,
  output: ListStorageProfilesResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStorageProfiles",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "storageProfiles",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStorageProfilesForQueueError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists storage profiles for a queue.
 */
export const listStorageProfilesForQueue: API.PaginatedOperationMethod<
  ListStorageProfilesForQueueRequest,
  ListStorageProfilesForQueueResponse,
  ListStorageProfilesForQueueError,
  Credentials | HttpClient.HttpClient,
  StorageProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStorageProfilesForQueueRequest,
  output: ListStorageProfilesForQueueResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStorageProfilesForQueue",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "storageProfiles",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists tags for a resource.
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
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  endpointHostPrefix: "management.",
}));

export type ListTasksError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists tasks for a job.
 */
export const listTasks: API.PaginatedOperationMethod<
  ListTasksRequest,
  ListTasksResponse,
  ListTasksError,
  Credentials | HttpClient.HttpClient,
  TaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTasksRequest,
  output: ListTasksResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTasks",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tasks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListVolumesError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the persistent volumes in a fleet.
 */
export const listVolumes: API.PaginatedOperationMethod<
  ListVolumesRequest,
  ListVolumesResponse,
  ListVolumesError,
  Credentials | HttpClient.HttpClient,
  VolumeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListVolumesRequest,
  output: ListVolumesResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVolumes",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "volumes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkersError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists workers.
 */
export const listWorkers: API.PaginatedOperationMethod<
  ListWorkersRequest,
  ListWorkersResponse,
  ListWorkersError,
  Credentials | HttpClient.HttpClient,
  WorkerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWorkersRequest,
  output: ListWorkersResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkers",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutMeteredProductError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a metered product.
 */
export const putMeteredProduct: API.OperationMethod<
  PutMeteredProductRequest,
  PutMeteredProductResponse,
  PutMeteredProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutMeteredProductRequest,
  output: PutMeteredProductResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMeteredProduct",
  endpointHostPrefix: "management.",
}));

export type SearchJobsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches for jobs.
 */
export const searchJobs: API.OperationMethod<
  SearchJobsRequest,
  SearchJobsResponse,
  SearchJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SearchJobsRequest,
  output: SearchJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchJobs",
  endpointHostPrefix: "management.",
}));

export type SearchStepsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches for steps.
 */
export const searchSteps: API.OperationMethod<
  SearchStepsRequest,
  SearchStepsResponse,
  SearchStepsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SearchStepsRequest,
  output: SearchStepsResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchSteps",
  endpointHostPrefix: "management.",
}));

export type SearchTasksError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches for tasks.
 */
export const searchTasks: API.OperationMethod<
  SearchTasksRequest,
  SearchTasksResponse,
  SearchTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SearchTasksRequest,
  output: SearchTasksResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchTasks",
  endpointHostPrefix: "management.",
}));

export type SearchWorkersError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches for workers.
 */
export const searchWorkers: API.OperationMethod<
  SearchWorkersRequest,
  SearchWorkersResponse,
  SearchWorkersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SearchWorkersRequest,
  output: SearchWorkersResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchWorkers",
  endpointHostPrefix: "management.",
}));

export type StartSessionsStatisticsAggregationError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts an asynchronous request for getting aggregated statistics about queues and farms. Get the statistics using the `GetSessionsStatisticsAggregation` operation. You can only have one running aggregation for your Deadline Cloud farm. Call the `GetSessionsStatisticsAggregation` operation and check the `status` field to see if an aggregation is running. Statistics are available for 1 hour after you call the `StartSessionsStatisticsAggregation` operation.
 */
export const startSessionsStatisticsAggregation: API.OperationMethod<
  StartSessionsStatisticsAggregationRequest,
  StartSessionsStatisticsAggregationResponse,
  StartSessionsStatisticsAggregationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartSessionsStatisticsAggregationRequest,
  output: StartSessionsStatisticsAggregationResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSessionsStatisticsAggregation",
  endpointHostPrefix: "management.",
}));

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Tags a resource using the resource's ARN and desired tags.
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
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  endpointHostPrefix: "management.",
}));

export type UntagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag from a resource using the resource's ARN and tag to remove.
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
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  endpointHostPrefix: "management.",
}));

export type UpdateBudgetError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | InternalServerException
  | CommonErrors;
/**
 * Updates a budget that sets spending thresholds for rendering activity.
 */
export const updateBudget: API.OperationMethod<
  UpdateBudgetRequest,
  UpdateBudgetResponse,
  UpdateBudgetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBudgetRequest,
  output: UpdateBudgetResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    ConflictException,
    InternalServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBudget",
  endpointHostPrefix: "management.",
}));

export type UpdateFarmError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | CommonErrors;
/**
 * Updates a farm.
 */
export const updateFarm: API.OperationMethod<
  UpdateFarmRequest,
  UpdateFarmResponse,
  UpdateFarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFarmRequest,
  output: UpdateFarmResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFarm",
  endpointHostPrefix: "management.",
}));

export type UpdateFleetError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a fleet.
 */
export const updateFleet: API.OperationMethod<
  UpdateFleetRequest,
  UpdateFleetResponse,
  UpdateFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFleetRequest,
  output: UpdateFleetResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFleet",
  endpointHostPrefix: "management.",
}));

export type UpdateJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a job.
 *
 * When you change the status of the job to `ARCHIVED`, the job can't be scheduled or archived.
 *
 * An archived jobs and its steps and tasks are deleted after 120 days. The job can't be recovered.
 */
export const updateJob: API.OperationMethod<
  UpdateJobRequest,
  UpdateJobResponse,
  UpdateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateJobRequest,
  output: UpdateJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJob",
  endpointHostPrefix: "management.",
}));

export type UpdateLimitError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the properties of the specified limit.
 */
export const updateLimit: API.OperationMethod<
  UpdateLimitRequest,
  UpdateLimitResponse,
  UpdateLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLimitRequest,
  output: UpdateLimitResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLimit",
  endpointHostPrefix: "management.",
}));

export type UpdateMonitorError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | CommonErrors;
/**
 * Modifies the settings for a Deadline Cloud monitor. You can modify one or all of the settings when you call `UpdateMonitor`.
 */
export const updateMonitor: API.OperationMethod<
  UpdateMonitorRequest,
  UpdateMonitorResponse,
  UpdateMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMonitorRequest,
  output: UpdateMonitorResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMonitor",
  endpointHostPrefix: "management.",
}));

export type UpdateMonitorSettingsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the settings for a Deadline Cloud monitor. Keys present in the request are upserted; keys absent are left unchanged. Send an empty string value to delete a key.
 */
export const updateMonitorSettings: API.OperationMethod<
  UpdateMonitorSettingsRequest,
  UpdateMonitorSettingsResponse,
  UpdateMonitorSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMonitorSettingsRequest,
  output: UpdateMonitorSettingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMonitorSettings",
  endpointHostPrefix: "management.",
}));

export type UpdateQueueError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a queue.
 */
export const updateQueue: API.OperationMethod<
  UpdateQueueRequest,
  UpdateQueueResponse,
  UpdateQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateQueueRequest,
  output: UpdateQueueResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQueue",
  endpointHostPrefix: "management.",
}));

export type UpdateQueueEnvironmentError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the queue environment.
 */
export const updateQueueEnvironment: API.OperationMethod<
  UpdateQueueEnvironmentRequest,
  UpdateQueueEnvironmentResponse,
  UpdateQueueEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateQueueEnvironmentRequest,
  output: UpdateQueueEnvironmentResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQueueEnvironment",
  endpointHostPrefix: "management.",
}));

export type UpdateQueueFleetAssociationError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a queue-fleet association.
 */
export const updateQueueFleetAssociation: API.OperationMethod<
  UpdateQueueFleetAssociationRequest,
  UpdateQueueFleetAssociationResponse,
  UpdateQueueFleetAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateQueueFleetAssociationRequest,
  output: UpdateQueueFleetAssociationResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQueueFleetAssociation",
  endpointHostPrefix: "management.",
}));

export type UpdateQueueLimitAssociationError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the status of the queue. If you set the status to one of the `STOP_LIMIT_USAGE*` values, there will be a delay before the status transitions to the `STOPPED` state.
 */
export const updateQueueLimitAssociation: API.OperationMethod<
  UpdateQueueLimitAssociationRequest,
  UpdateQueueLimitAssociationResponse,
  UpdateQueueLimitAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateQueueLimitAssociationRequest,
  output: UpdateQueueLimitAssociationResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQueueLimitAssociation",
  endpointHostPrefix: "management.",
}));

export type UpdateSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a session.
 */
export const updateSession: API.OperationMethod<
  UpdateSessionRequest,
  UpdateSessionResponse,
  UpdateSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSessionRequest,
  output: UpdateSessionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSession",
  endpointHostPrefix: "management.",
}));

export type UpdateStepError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a step.
 */
export const updateStep: API.OperationMethod<
  UpdateStepRequest,
  UpdateStepResponse,
  UpdateStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateStepRequest,
  output: UpdateStepResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStep",
  endpointHostPrefix: "management.",
}));

export type UpdateStorageProfileError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | CommonErrors;
/**
 * Updates a storage profile.
 */
export const updateStorageProfile: API.OperationMethod<
  UpdateStorageProfileRequest,
  UpdateStorageProfileResponse,
  UpdateStorageProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateStorageProfileRequest,
  output: UpdateStorageProfileResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStorageProfile",
  endpointHostPrefix: "management.",
}));

export type UpdateTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a task.
 */
export const updateTask: API.OperationMethod<
  UpdateTaskRequest,
  UpdateTaskResponse,
  UpdateTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTaskRequest,
  output: UpdateTaskResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTask",
  endpointHostPrefix: "management.",
}));

export type UpdateWorkerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a worker.
 */
export const updateWorker: API.OperationMethod<
  UpdateWorkerRequest,
  UpdateWorkerResponse,
  UpdateWorkerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWorkerRequest,
  output: UpdateWorkerResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorker",
  endpointHostPrefix: "scheduling.",
}));

export type UpdateWorkerScheduleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the schedule for a worker.
 */
export const updateWorkerSchedule: API.OperationMethod<
  UpdateWorkerScheduleRequest,
  UpdateWorkerScheduleResponse,
  UpdateWorkerScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWorkerScheduleRequest,
  output: UpdateWorkerScheduleResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkerSchedule",
  endpointHostPrefix: "scheduling.",
}));
