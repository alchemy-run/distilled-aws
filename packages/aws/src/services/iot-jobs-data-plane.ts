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
  sdkId: "IoT Jobs Data Plane",
  serviceShapeName: "IotLaserThingJobManagerExternalService",
});
const auth = T.AwsAuthSigv4({ name: "iot-jobs-data" });
const ver = T.ServiceVersion("2017-09-29");
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
              `https://data.jobs.iot-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://data.jobs.iot-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://data.jobs.iot.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://data.jobs.iot.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class CertificateValidationException
  extends /*@__PURE__*/ S.TaggedError<CertificateValidationException>()(
    "CertificateValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidStateTransitionException
  extends /*@__PURE__*/ S.TaggedError<InvalidStateTransitionException>()(
    "InvalidStateTransitionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
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
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class TerminalStateException
  extends /*@__PURE__*/ S.TaggedError<TerminalStateException>()(
    "TerminalStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(410),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      payload: S.optional(T.Blob),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type DescribeJobExecutionJobId = string;
export type ThingName = string;
export type IncludeJobDocument = boolean;
export type ExecutionNumber = number;
export interface DescribeJobExecutionRequest {
  jobId: string;
  thingName: string;
  includeJobDocument?: boolean;
  executionNumber?: number;
}
export const DescribeJobExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    thingName: S.String.pipe(T.HttpLabel("thingName")),
    includeJobDocument: S.optional(S.Boolean).pipe(
      T.HttpQuery("includeJobDocument"),
    ),
    executionNumber: S.optional(S.Number).pipe(T.HttpQuery("executionNumber")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/things/{thingName}/jobs/{jobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeJobExecutionRequest",
}) as any as S.Schema<DescribeJobExecutionRequest>;
export type JobId = string;
export type JobExecutionStatus =
  | "QUEUED"
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | "TIMED_OUT"
  | "REJECTED"
  | "REMOVED"
  | "CANCELED"
  | (string & {});
export const JobExecutionStatus = S.String;

export type DetailsKey = string;
export type DetailsValue = string;
export type DetailsMap = { [key: string]: string | undefined };
export const DetailsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type QueuedAt = number;
export type StartedAt = number;
export type LastUpdatedAt = number;
export type ApproximateSecondsBeforeTimedOut = number;
export type VersionNumber = number;
export type JobDocument = string;
export interface JobExecution {
  jobId?: string;
  thingName?: string;
  status?: JobExecutionStatus;
  statusDetails?: { [key: string]: string | undefined };
  queuedAt?: number;
  startedAt?: number;
  lastUpdatedAt?: number;
  approximateSecondsBeforeTimedOut?: number;
  versionNumber?: number;
  executionNumber?: number;
  jobDocument?: string;
}
export const JobExecution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.optional(S.String),
    thingName: S.optional(S.String),
    status: S.optional(JobExecutionStatus),
    statusDetails: S.optional(DetailsMap),
    queuedAt: S.optional(S.Number),
    startedAt: S.optional(S.Number),
    lastUpdatedAt: S.optional(S.Number),
    approximateSecondsBeforeTimedOut: S.optional(S.Number),
    versionNumber: S.optional(S.Number),
    executionNumber: S.optional(S.Number),
    jobDocument: S.optional(S.String),
  }),
).annotate({ identifier: "JobExecution" }) as any as S.Schema<JobExecution>;
export interface DescribeJobExecutionResponse {
  execution?: JobExecution;
}
export const DescribeJobExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ execution: S.optional(JobExecution) }),
).annotate({
  identifier: "DescribeJobExecutionResponse",
}) as any as S.Schema<DescribeJobExecutionResponse>;
export interface GetPendingJobExecutionsRequest {
  thingName: string;
}
export const GetPendingJobExecutionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ thingName: S.String.pipe(T.HttpLabel("thingName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/things/{thingName}/jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPendingJobExecutionsRequest",
}) as any as S.Schema<GetPendingJobExecutionsRequest>;
export interface JobExecutionSummary {
  jobId?: string;
  queuedAt?: number;
  startedAt?: number;
  lastUpdatedAt?: number;
  versionNumber?: number;
  executionNumber?: number;
}
export const JobExecutionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.optional(S.String),
    queuedAt: S.optional(S.Number),
    startedAt: S.optional(S.Number),
    lastUpdatedAt: S.optional(S.Number),
    versionNumber: S.optional(S.Number),
    executionNumber: S.optional(S.Number),
  }),
).annotate({
  identifier: "JobExecutionSummary",
}) as any as S.Schema<JobExecutionSummary>;
export type JobExecutionSummaryList = JobExecutionSummary[];
export const JobExecutionSummaryList =
  /*@__PURE__*/ S.Array(JobExecutionSummary);
export interface GetPendingJobExecutionsResponse {
  inProgressJobs?: JobExecutionSummary[];
  queuedJobs?: JobExecutionSummary[];
}
export const GetPendingJobExecutionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inProgressJobs: S.optional(JobExecutionSummaryList),
    queuedJobs: S.optional(JobExecutionSummaryList),
  }),
).annotate({
  identifier: "GetPendingJobExecutionsResponse",
}) as any as S.Schema<GetPendingJobExecutionsResponse>;
export type TargetArn = string;
export type CommandArn = string;
export type CommandParameterName = string;
export type StringParameterValue = string;
export type BooleanParameterValue = boolean;
export type IntegerParameterValue = number;
export type LongParameterValue = number;
export type DoubleParameterValue = number;
export type BinaryParameterValue = Uint8Array;
export type UnsignedLongParameterValue = string;
export interface CommandParameterValue {
  S?: string;
  B?: boolean;
  I?: number;
  L?: number;
  D?: number;
  BIN?: Uint8Array;
  UL?: string;
}
export const CommandParameterValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S: S.optional(S.String),
    B: S.optional(S.Boolean),
    I: S.optional(S.Number),
    L: S.optional(S.Number),
    D: S.optional(S.Number),
    BIN: S.optional(T.Blob),
    UL: S.optional(S.String),
  }),
).annotate({
  identifier: "CommandParameterValue",
}) as any as S.Schema<CommandParameterValue>;
export type CommandExecutionParameterMap = {
  [key: string]: CommandParameterValue | undefined;
};
export const CommandExecutionParameterMap = /*@__PURE__*/ S.Record(
  S.String,
  CommandParameterValue.pipe(S.optional),
);
export type CommandExecutionTimeoutInSeconds = number;
export type ClientRequestTokenV2 = string;
export interface StartCommandExecutionRequest {
  targetArn: string;
  commandArn: string;
  parameters?: { [key: string]: CommandParameterValue | undefined };
  executionTimeoutSeconds?: number;
  clientToken?: string;
}
export const StartCommandExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetArn: S.String,
    commandArn: S.String,
    parameters: S.optional(CommandExecutionParameterMap),
    executionTimeoutSeconds: S.optional(S.Number),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/command-executions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartCommandExecutionRequest",
}) as any as S.Schema<StartCommandExecutionRequest>;
export type CommandExecutionId = string;
export interface StartCommandExecutionResponse {
  executionId?: string;
}
export const StartCommandExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ executionId: S.optional(S.String) }),
).annotate({
  identifier: "StartCommandExecutionResponse",
}) as any as S.Schema<StartCommandExecutionResponse>;
export type StepTimeoutInMinutes = number;
export interface StartNextPendingJobExecutionRequest {
  thingName: string;
  statusDetails?: { [key: string]: string | undefined };
  stepTimeoutInMinutes?: number;
}
export const StartNextPendingJobExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingName: S.String.pipe(T.HttpLabel("thingName")),
    statusDetails: S.optional(DetailsMap),
    stepTimeoutInMinutes: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/things/{thingName}/jobs/$next" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartNextPendingJobExecutionRequest",
}) as any as S.Schema<StartNextPendingJobExecutionRequest>;
export interface StartNextPendingJobExecutionResponse {
  execution?: JobExecution;
}
export const StartNextPendingJobExecutionResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ execution: S.optional(JobExecution) }),
).annotate({
  identifier: "StartNextPendingJobExecutionResponse",
}) as any as S.Schema<StartNextPendingJobExecutionResponse>;
export type ExpectedVersion = number;
export type IncludeExecutionState = boolean;
export interface UpdateJobExecutionRequest {
  jobId: string;
  thingName: string;
  status: JobExecutionStatus;
  statusDetails?: { [key: string]: string | undefined };
  stepTimeoutInMinutes?: number;
  expectedVersion?: number;
  includeJobExecutionState?: boolean;
  includeJobDocument?: boolean;
  executionNumber?: number;
}
export const UpdateJobExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    thingName: S.String.pipe(T.HttpLabel("thingName")),
    status: JobExecutionStatus,
    statusDetails: S.optional(DetailsMap),
    stepTimeoutInMinutes: S.optional(S.Number),
    expectedVersion: S.optional(S.Number),
    includeJobExecutionState: S.optional(S.Boolean),
    includeJobDocument: S.optional(S.Boolean),
    executionNumber: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/things/{thingName}/jobs/{jobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateJobExecutionRequest",
}) as any as S.Schema<UpdateJobExecutionRequest>;
export interface JobExecutionState {
  status?: JobExecutionStatus;
  statusDetails?: { [key: string]: string | undefined };
  versionNumber?: number;
}
export const JobExecutionState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(JobExecutionStatus),
    statusDetails: S.optional(DetailsMap),
    versionNumber: S.optional(S.Number),
  }),
).annotate({
  identifier: "JobExecutionState",
}) as any as S.Schema<JobExecutionState>;
export interface UpdateJobExecutionResponse {
  executionState?: JobExecutionState;
  jobDocument?: string;
}
export const UpdateJobExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionState: S.optional(JobExecutionState),
    jobDocument: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateJobExecutionResponse",
}) as any as S.Schema<UpdateJobExecutionResponse>;
export type ErrorMessage = string;
export type BinaryBlob = Uint8Array;
export type ResourceId = string;
export type DescribeJobExecutionError =
  | CertificateValidationException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | TerminalStateException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets details of a job execution.
 *
 * Requires permission to access the DescribeJobExecution action.
 */
export const describeJobExecution: API.OperationMethod<
  DescribeJobExecutionRequest,
  DescribeJobExecutionResponse,
  DescribeJobExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeJobExecutionRequest,
  output: DescribeJobExecutionResponse,
  errors: [
    CertificateValidationException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    TerminalStateException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobExecution",
}));

export type GetPendingJobExecutionsError =
  | CertificateValidationException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the list of all jobs for a thing that are not in a terminal status.
 *
 * Requires permission to access the GetPendingJobExecutions action.
 */
export const getPendingJobExecutions: API.OperationMethod<
  GetPendingJobExecutionsRequest,
  GetPendingJobExecutionsResponse,
  GetPendingJobExecutionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPendingJobExecutionsRequest,
  output: GetPendingJobExecutionsResponse,
  errors: [
    CertificateValidationException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPendingJobExecutions",
}));

export type StartCommandExecutionError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Using the command created with the `CreateCommand` API, start a command
 * execution on a specific device.
 */
export const startCommandExecution: API.OperationMethod<
  StartCommandExecutionRequest,
  StartCommandExecutionResponse,
  StartCommandExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartCommandExecutionRequest,
  output: StartCommandExecutionResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCommandExecution",
}));

export type StartNextPendingJobExecutionError =
  | CertificateValidationException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets and starts the next pending (status IN_PROGRESS or QUEUED) job execution for a
 * thing.
 *
 * Requires permission to access the StartNextPendingJobExecution action.
 */
export const startNextPendingJobExecution: API.OperationMethod<
  StartNextPendingJobExecutionRequest,
  StartNextPendingJobExecutionResponse,
  StartNextPendingJobExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartNextPendingJobExecutionRequest,
  output: StartNextPendingJobExecutionResponse,
  errors: [
    CertificateValidationException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartNextPendingJobExecution",
}));

export type UpdateJobExecutionError =
  | CertificateValidationException
  | InvalidRequestException
  | InvalidStateTransitionException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the status of a job execution.
 *
 * Requires permission to access the UpdateJobExecution action.
 */
export const updateJobExecution: API.OperationMethod<
  UpdateJobExecutionRequest,
  UpdateJobExecutionResponse,
  UpdateJobExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateJobExecutionRequest,
  output: UpdateJobExecutionResponse,
  errors: [
    CertificateValidationException,
    InvalidRequestException,
    InvalidStateTransitionException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJobExecution",
}));
