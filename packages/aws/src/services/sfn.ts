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
const ns = T.XmlNamespace("http://swf.amazonaws.com/doc/2015-07-20/");
const svc = T.AwsApiService({
  sdkId: "SFN",
  serviceShapeName: "AWSStepFunctions",
});
const auth = T.AwsAuthSigv4({ name: "states" });
const ver = T.ServiceVersion("2016-11-23");
const proto = T.AwsProtocolsAwsJson1_0();
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
          Region === "us-gov-west-1" &&
          UseFIPS === true &&
          UseDualStack === false
        ) {
          return e(
            `https://states.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            `https://states-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://states-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://states-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://states.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://states.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ActivityAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<ActivityAlreadyExists>()(
    "ActivityAlreadyExists",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class ActivityDoesNotExist
  extends /*@__PURE__*/ S.TaggedError<ActivityDoesNotExist>()(
    "ActivityDoesNotExist",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ActivityLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<ActivityLimitExceeded>()(
    "ActivityLimitExceeded",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withThrottlingError) {}
export class ActivityWorkerLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<ActivityWorkerLimitExceeded>()(
    "ActivityWorkerLimitExceeded",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withThrottlingError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ExecutionAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<ExecutionAlreadyExists>()(
    "ExecutionAlreadyExists",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class ExecutionDoesNotExist
  extends /*@__PURE__*/ S.TaggedError<ExecutionDoesNotExist>()(
    "ExecutionDoesNotExist",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ExecutionLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<ExecutionLimitExceeded>()(
    "ExecutionLimitExceeded",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withThrottlingError) {}
export class ExecutionNotRedrivable
  extends /*@__PURE__*/ S.TaggedError<ExecutionNotRedrivable>()(
    "ExecutionNotRedrivable",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidArn
  extends /*@__PURE__*/ S.TaggedError<InvalidArn>()("InvalidArn", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class InvalidDefinition
  extends /*@__PURE__*/ S.TaggedError<InvalidDefinition>()(
    "InvalidDefinition",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidEncryptionConfiguration
  extends /*@__PURE__*/ S.TaggedError<InvalidEncryptionConfiguration>()(
    "InvalidEncryptionConfiguration",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidExecutionInput
  extends /*@__PURE__*/ S.TaggedError<InvalidExecutionInput>()(
    "InvalidExecutionInput",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidLoggingConfiguration
  extends /*@__PURE__*/ S.TaggedError<InvalidLoggingConfiguration>()(
    "InvalidLoggingConfiguration",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidName
  extends /*@__PURE__*/ S.TaggedError<InvalidName>()("InvalidName", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class InvalidOutput
  extends /*@__PURE__*/ S.TaggedError<InvalidOutput>()("InvalidOutput", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class InvalidToken
  extends /*@__PURE__*/ S.TaggedError<InvalidToken>()("InvalidToken", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class InvalidTracingConfiguration
  extends /*@__PURE__*/ S.TaggedError<InvalidTracingConfiguration>()(
    "InvalidTracingConfiguration",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class KmsAccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<KmsAccessDeniedException>()(
    "KmsAccessDeniedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAuthError) {}
export class KmsInvalidStateException
  extends /*@__PURE__*/ S.TaggedError<KmsInvalidStateException>()(
    "KmsInvalidStateException",
    {
      kmsKeyState: S.optional(
        S.suspend(() => KmsKeyState).annotate({ identifier: "KmsKeyState" }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
  ) {}
export class KmsThrottlingException
  extends /*@__PURE__*/ S.TaggedError<KmsThrottlingException>()(
    "KmsThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class MissingRequiredParameter
  extends /*@__PURE__*/ S.TaggedError<MissingRequiredParameter>()(
    "MissingRequiredParameter",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ResourceNotFound
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFound>()(
    "ResourceNotFound",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceName: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class StateMachineAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<StateMachineAlreadyExists>()(
    "StateMachineAlreadyExists",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class StateMachineDeleting
  extends /*@__PURE__*/ S.TaggedError<StateMachineDeleting>()(
    "StateMachineDeleting",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class StateMachineDoesNotExist
  extends /*@__PURE__*/ S.TaggedError<StateMachineDoesNotExist>()(
    "StateMachineDoesNotExist",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class StateMachineLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<StateMachineLimitExceeded>()(
    "StateMachineLimitExceeded",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withThrottlingError) {}
export class StateMachineTypeNotSupported
  extends /*@__PURE__*/ S.TaggedError<StateMachineTypeNotSupported>()(
    "StateMachineTypeNotSupported",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TaskDoesNotExist
  extends /*@__PURE__*/ S.TaggedError<TaskDoesNotExist>()("TaskDoesNotExist", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class TaskTimedOut
  extends /*@__PURE__*/ S.TaggedError<TaskTimedOut>()("TaskTimedOut", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class TooManyTags
  extends /*@__PURE__*/ S.TaggedError<TooManyTags>()(
    "TooManyTags",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceName: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      reason: S.optional(
        S.suspend(() => ValidationExceptionReason).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type Name = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key?: string;
  value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export type KmsKeyId = string;
export type KmsDataKeyReusePeriodSeconds = number;
export type EncryptionType =
  | "AWS_OWNED_KEY"
  | "CUSTOMER_MANAGED_KMS_KEY"
  | (string & {});
export const EncryptionType = /*@__PURE__*/ S.String;

export interface EncryptionConfiguration {
  kmsKeyId?: string;
  kmsDataKeyReusePeriodSeconds?: number;
  type: EncryptionType;
}
export const EncryptionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    kmsKeyId: S.optional(S.String),
    kmsDataKeyReusePeriodSeconds: S.optional(S.Number),
    type: EncryptionType,
  }),
).annotate({
  identifier: "EncryptionConfiguration",
}) as any as S.Schema<EncryptionConfiguration>;
export interface CreateActivityInput {
  name: string;
  tags?: Tag[];
  encryptionConfiguration?: EncryptionConfiguration;
}
export const CreateActivityInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    tags: S.optional(TagList),
    encryptionConfiguration: S.optional(EncryptionConfiguration),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateActivityInput",
}) as any as S.Schema<CreateActivityInput>;
export type Arn = string;
export interface CreateActivityOutput {
  activityArn: string;
  creationDate: Date;
}
export const CreateActivityOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    activityArn: S.String,
    creationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }).pipe(ns),
).annotate({
  identifier: "CreateActivityOutput",
}) as any as S.Schema<CreateActivityOutput>;
export type Definition = string | redacted.Redacted<string>;
export type StateMachineType = "STANDARD" | "EXPRESS" | (string & {});
export const StateMachineType = /*@__PURE__*/ S.String;

export type LogLevel = "ALL" | "ERROR" | "FATAL" | "OFF" | (string & {});
export const LogLevel = /*@__PURE__*/ S.String;

export type IncludeExecutionData = boolean;
export interface CloudWatchLogsLogGroup {
  logGroupArn?: string;
}
export const CloudWatchLogsLogGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ logGroupArn: S.optional(S.String) }),
).annotate({
  identifier: "CloudWatchLogsLogGroup",
}) as any as S.Schema<CloudWatchLogsLogGroup>;
export interface LogDestination {
  cloudWatchLogsLogGroup?: CloudWatchLogsLogGroup;
}
export const LogDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cloudWatchLogsLogGroup: S.optional(CloudWatchLogsLogGroup) }),
).annotate({ identifier: "LogDestination" }) as any as S.Schema<LogDestination>;
export type LogDestinationList = LogDestination[];
export const LogDestinationList = /*@__PURE__*/ S.Array(LogDestination);
export interface LoggingConfiguration {
  level?: LogLevel;
  includeExecutionData?: boolean;
  destinations?: LogDestination[];
}
export const LoggingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    level: S.optional(LogLevel),
    includeExecutionData: S.optional(S.Boolean),
    destinations: S.optional(LogDestinationList),
  }),
).annotate({
  identifier: "LoggingConfiguration",
}) as any as S.Schema<LoggingConfiguration>;
export type Enabled = boolean;
export interface TracingConfiguration {
  enabled?: boolean;
}
export const TracingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "TracingConfiguration",
}) as any as S.Schema<TracingConfiguration>;
export type Publish = boolean;
export type VersionDescription = string | redacted.Redacted<string>;
export interface CreateStateMachineInput {
  name: string;
  definition: string | redacted.Redacted<string>;
  roleArn: string;
  type?: StateMachineType;
  loggingConfiguration?: LoggingConfiguration;
  tags?: Tag[];
  tracingConfiguration?: TracingConfiguration;
  publish?: boolean;
  versionDescription?: string | redacted.Redacted<string>;
  encryptionConfiguration?: EncryptionConfiguration;
}
export const CreateStateMachineInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    definition: SensitiveString,
    roleArn: S.String,
    type: S.optional(StateMachineType),
    loggingConfiguration: S.optional(LoggingConfiguration),
    tags: S.optional(TagList),
    tracingConfiguration: S.optional(TracingConfiguration),
    publish: S.optional(S.Boolean),
    versionDescription: S.optional(SensitiveString),
    encryptionConfiguration: S.optional(EncryptionConfiguration),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateStateMachineInput",
}) as any as S.Schema<CreateStateMachineInput>;
export interface CreateStateMachineOutput {
  stateMachineArn: string;
  creationDate: Date;
  stateMachineVersionArn?: string;
}
export const CreateStateMachineOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stateMachineArn: S.String,
    creationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    stateMachineVersionArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateStateMachineOutput",
}) as any as S.Schema<CreateStateMachineOutput>;
export type AliasDescription = string | redacted.Redacted<string>;
export type CharacterRestrictedName = string;
export type VersionWeight = number;
export interface RoutingConfigurationListItem {
  stateMachineVersionArn: string;
  weight: number;
}
export const RoutingConfigurationListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ stateMachineVersionArn: S.String, weight: S.Number }),
).annotate({
  identifier: "RoutingConfigurationListItem",
}) as any as S.Schema<RoutingConfigurationListItem>;
export type RoutingConfigurationList = RoutingConfigurationListItem[];
export const RoutingConfigurationList = /*@__PURE__*/ S.Array(
  RoutingConfigurationListItem,
);
export interface CreateStateMachineAliasInput {
  description?: string | redacted.Redacted<string>;
  name: string;
  routingConfiguration: RoutingConfigurationListItem[];
}
export const CreateStateMachineAliasInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.optional(SensitiveString),
    name: S.String,
    routingConfiguration: RoutingConfigurationList,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateStateMachineAliasInput",
}) as any as S.Schema<CreateStateMachineAliasInput>;
export interface CreateStateMachineAliasOutput {
  stateMachineAliasArn: string;
  creationDate: Date;
}
export const CreateStateMachineAliasOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stateMachineAliasArn: S.String,
    creationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }).pipe(ns),
).annotate({
  identifier: "CreateStateMachineAliasOutput",
}) as any as S.Schema<CreateStateMachineAliasOutput>;
export interface DeleteActivityInput {
  activityArn: string;
}
export const DeleteActivityInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ activityArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteActivityInput",
}) as any as S.Schema<DeleteActivityInput>;
export interface DeleteActivityOutput {}
export const DeleteActivityOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteActivityOutput",
}) as any as S.Schema<DeleteActivityOutput>;
export interface DeleteStateMachineInput {
  stateMachineArn: string;
}
export const DeleteStateMachineInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ stateMachineArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteStateMachineInput",
}) as any as S.Schema<DeleteStateMachineInput>;
export interface DeleteStateMachineOutput {}
export const DeleteStateMachineOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteStateMachineOutput",
}) as any as S.Schema<DeleteStateMachineOutput>;
export interface DeleteStateMachineAliasInput {
  stateMachineAliasArn: string;
}
export const DeleteStateMachineAliasInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ stateMachineAliasArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteStateMachineAliasInput",
}) as any as S.Schema<DeleteStateMachineAliasInput>;
export interface DeleteStateMachineAliasOutput {}
export const DeleteStateMachineAliasOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteStateMachineAliasOutput",
}) as any as S.Schema<DeleteStateMachineAliasOutput>;
export type LongArn = string;
export interface DeleteStateMachineVersionInput {
  stateMachineVersionArn: string;
}
export const DeleteStateMachineVersionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ stateMachineVersionArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteStateMachineVersionInput",
}) as any as S.Schema<DeleteStateMachineVersionInput>;
export interface DeleteStateMachineVersionOutput {}
export const DeleteStateMachineVersionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteStateMachineVersionOutput",
}) as any as S.Schema<DeleteStateMachineVersionOutput>;
export interface DescribeActivityInput {
  activityArn: string;
}
export const DescribeActivityInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ activityArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeActivityInput",
}) as any as S.Schema<DescribeActivityInput>;
export interface DescribeActivityOutput {
  activityArn: string;
  name: string;
  creationDate: Date;
  encryptionConfiguration?: EncryptionConfiguration;
}
export const DescribeActivityOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    activityArn: S.String,
    name: S.String,
    creationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    encryptionConfiguration: S.optional(EncryptionConfiguration),
  }).pipe(ns),
).annotate({
  identifier: "DescribeActivityOutput",
}) as any as S.Schema<DescribeActivityOutput>;
export type IncludedData = "ALL_DATA" | "METADATA_ONLY" | (string & {});
export const IncludedData = /*@__PURE__*/ S.String;

export interface DescribeExecutionInput {
  executionArn: string;
  includedData?: IncludedData;
}
export const DescribeExecutionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionArn: S.String,
    includedData: S.optional(IncludedData),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeExecutionInput",
}) as any as S.Schema<DescribeExecutionInput>;
export type ExecutionStatus =
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "TIMED_OUT"
  | "ABORTED"
  | "PENDING_REDRIVE"
  | (string & {});
export const ExecutionStatus = /*@__PURE__*/ S.String;

export type SensitiveData = string | redacted.Redacted<string>;
export type IncludedDetails = boolean;
export interface CloudWatchEventsExecutionDataDetails {
  included?: boolean;
}
export const CloudWatchEventsExecutionDataDetails = /*@__PURE__*/ S.suspend(
  () => S.Struct({ included: S.optional(S.Boolean) }),
).annotate({
  identifier: "CloudWatchEventsExecutionDataDetails",
}) as any as S.Schema<CloudWatchEventsExecutionDataDetails>;
export type TraceHeader = string;
export type SensitiveError = string | redacted.Redacted<string>;
export type SensitiveCause = string | redacted.Redacted<string>;
export type RedriveCount = number;
export type ExecutionRedriveStatus =
  | "REDRIVABLE"
  | "NOT_REDRIVABLE"
  | "REDRIVABLE_BY_MAP_RUN"
  | (string & {});
export const ExecutionRedriveStatus = /*@__PURE__*/ S.String;

export interface DescribeExecutionOutput {
  executionArn: string;
  stateMachineArn: string;
  name?: string;
  status: ExecutionStatus;
  startDate: Date;
  stopDate?: Date;
  input?: string | redacted.Redacted<string>;
  inputDetails?: CloudWatchEventsExecutionDataDetails;
  output?: string | redacted.Redacted<string>;
  outputDetails?: CloudWatchEventsExecutionDataDetails;
  traceHeader?: string;
  mapRunArn?: string;
  error?: string | redacted.Redacted<string>;
  cause?: string | redacted.Redacted<string>;
  stateMachineVersionArn?: string;
  stateMachineAliasArn?: string;
  redriveCount?: number;
  redriveDate?: Date;
  redriveStatus?: ExecutionRedriveStatus;
  redriveStatusReason?: string | redacted.Redacted<string>;
}
export const DescribeExecutionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionArn: S.String,
    stateMachineArn: S.String,
    name: S.optional(S.String),
    status: ExecutionStatus,
    startDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    stopDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    input: S.optional(SensitiveString),
    inputDetails: S.optional(CloudWatchEventsExecutionDataDetails),
    output: S.optional(SensitiveString),
    outputDetails: S.optional(CloudWatchEventsExecutionDataDetails),
    traceHeader: S.optional(S.String),
    mapRunArn: S.optional(S.String),
    error: S.optional(SensitiveString),
    cause: S.optional(SensitiveString),
    stateMachineVersionArn: S.optional(S.String),
    stateMachineAliasArn: S.optional(S.String),
    redriveCount: S.optional(S.Number),
    redriveDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    redriveStatus: S.optional(ExecutionRedriveStatus),
    redriveStatusReason: S.optional(SensitiveString),
  }).pipe(ns),
).annotate({
  identifier: "DescribeExecutionOutput",
}) as any as S.Schema<DescribeExecutionOutput>;
export interface DescribeMapRunInput {
  mapRunArn: string;
}
export const DescribeMapRunInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ mapRunArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeMapRunInput",
}) as any as S.Schema<DescribeMapRunInput>;
export type MapRunStatus =
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "ABORTED"
  | (string & {});
export const MapRunStatus = /*@__PURE__*/ S.String;

export type MaxConcurrency = number;
export type ToleratedFailurePercentage = number;
export type ToleratedFailureCount = number;
export type UnsignedLong = number;
export type LongObject = number;
export interface MapRunItemCounts {
  pending: number;
  running: number;
  succeeded: number;
  failed: number;
  timedOut: number;
  aborted: number;
  total: number;
  resultsWritten: number;
  failuresNotRedrivable?: number;
  pendingRedrive?: number;
}
export const MapRunItemCounts = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pending: S.Number,
    running: S.Number,
    succeeded: S.Number,
    failed: S.Number,
    timedOut: S.Number,
    aborted: S.Number,
    total: S.Number,
    resultsWritten: S.Number,
    failuresNotRedrivable: S.optional(S.Number),
    pendingRedrive: S.optional(S.Number),
  }),
).annotate({
  identifier: "MapRunItemCounts",
}) as any as S.Schema<MapRunItemCounts>;
export interface MapRunExecutionCounts {
  pending: number;
  running: number;
  succeeded: number;
  failed: number;
  timedOut: number;
  aborted: number;
  total: number;
  resultsWritten: number;
  failuresNotRedrivable?: number;
  pendingRedrive?: number;
}
export const MapRunExecutionCounts = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pending: S.Number,
    running: S.Number,
    succeeded: S.Number,
    failed: S.Number,
    timedOut: S.Number,
    aborted: S.Number,
    total: S.Number,
    resultsWritten: S.Number,
    failuresNotRedrivable: S.optional(S.Number),
    pendingRedrive: S.optional(S.Number),
  }),
).annotate({
  identifier: "MapRunExecutionCounts",
}) as any as S.Schema<MapRunExecutionCounts>;
export interface DescribeMapRunOutput {
  mapRunArn: string;
  executionArn: string;
  status: MapRunStatus;
  startDate: Date;
  stopDate?: Date;
  maxConcurrency: number;
  toleratedFailurePercentage: number;
  toleratedFailureCount: number;
  itemCounts: MapRunItemCounts;
  executionCounts: MapRunExecutionCounts;
  redriveCount?: number;
  redriveDate?: Date;
}
export const DescribeMapRunOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mapRunArn: S.String,
    executionArn: S.String,
    status: MapRunStatus,
    startDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    stopDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    maxConcurrency: S.Number,
    toleratedFailurePercentage: S.Number,
    toleratedFailureCount: S.Number,
    itemCounts: MapRunItemCounts,
    executionCounts: MapRunExecutionCounts,
    redriveCount: S.optional(S.Number),
    redriveDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(ns),
).annotate({
  identifier: "DescribeMapRunOutput",
}) as any as S.Schema<DescribeMapRunOutput>;
export interface DescribeStateMachineInput {
  stateMachineArn: string;
  includedData?: IncludedData;
}
export const DescribeStateMachineInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stateMachineArn: S.String,
    includedData: S.optional(IncludedData),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeStateMachineInput",
}) as any as S.Schema<DescribeStateMachineInput>;
export type StateMachineStatus = "ACTIVE" | "DELETING" | (string & {});
export const StateMachineStatus = /*@__PURE__*/ S.String;

export type MapRunLabel = string;
export type RevisionId = string;
export type StateName = string;
export type VariableName = string | redacted.Redacted<string>;
export type VariableNameList = (string | redacted.Redacted<string>)[];
export const VariableNameList = /*@__PURE__*/ S.Array(SensitiveString);
export type VariableReferences = {
  [key: string]: (string | redacted.Redacted<string>)[] | undefined;
};
export const VariableReferences = /*@__PURE__*/ S.Record(
  S.String,
  VariableNameList.pipe(S.optional),
);
export interface DescribeStateMachineOutput {
  stateMachineArn: string;
  name: string;
  status?: StateMachineStatus;
  definition: string | redacted.Redacted<string>;
  roleArn: string;
  type: StateMachineType;
  creationDate: Date;
  loggingConfiguration?: LoggingConfiguration;
  tracingConfiguration?: TracingConfiguration;
  label?: string;
  revisionId?: string;
  description?: string | redacted.Redacted<string>;
  encryptionConfiguration?: EncryptionConfiguration;
  variableReferences?: {
    [key: string]: (string | redacted.Redacted<string>)[] | undefined;
  };
}
export const DescribeStateMachineOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stateMachineArn: S.String,
    name: S.String,
    status: S.optional(StateMachineStatus),
    definition: SensitiveString,
    roleArn: S.String,
    type: StateMachineType,
    creationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    loggingConfiguration: S.optional(LoggingConfiguration),
    tracingConfiguration: S.optional(TracingConfiguration),
    label: S.optional(S.String),
    revisionId: S.optional(S.String),
    description: S.optional(SensitiveString),
    encryptionConfiguration: S.optional(EncryptionConfiguration),
    variableReferences: S.optional(VariableReferences),
  }).pipe(ns),
).annotate({
  identifier: "DescribeStateMachineOutput",
}) as any as S.Schema<DescribeStateMachineOutput>;
export interface DescribeStateMachineAliasInput {
  stateMachineAliasArn: string;
}
export const DescribeStateMachineAliasInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ stateMachineAliasArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeStateMachineAliasInput",
}) as any as S.Schema<DescribeStateMachineAliasInput>;
export interface DescribeStateMachineAliasOutput {
  stateMachineAliasArn?: string;
  name?: string;
  description?: string | redacted.Redacted<string>;
  routingConfiguration?: RoutingConfigurationListItem[];
  creationDate?: Date;
  updateDate?: Date;
}
export const DescribeStateMachineAliasOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stateMachineAliasArn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(SensitiveString),
    routingConfiguration: S.optional(RoutingConfigurationList),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(ns),
).annotate({
  identifier: "DescribeStateMachineAliasOutput",
}) as any as S.Schema<DescribeStateMachineAliasOutput>;
export interface DescribeStateMachineForExecutionInput {
  executionArn: string;
  includedData?: IncludedData;
}
export const DescribeStateMachineForExecutionInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      executionArn: S.String,
      includedData: S.optional(IncludedData),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeStateMachineForExecutionInput",
}) as any as S.Schema<DescribeStateMachineForExecutionInput>;
export interface DescribeStateMachineForExecutionOutput {
  stateMachineArn: string;
  name: string;
  definition: string | redacted.Redacted<string>;
  roleArn: string;
  updateDate: Date;
  loggingConfiguration?: LoggingConfiguration;
  tracingConfiguration?: TracingConfiguration;
  mapRunArn?: string;
  label?: string;
  revisionId?: string;
  encryptionConfiguration?: EncryptionConfiguration;
  variableReferences?: {
    [key: string]: (string | redacted.Redacted<string>)[] | undefined;
  };
}
export const DescribeStateMachineForExecutionOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      stateMachineArn: S.String,
      name: S.String,
      definition: SensitiveString,
      roleArn: S.String,
      updateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      loggingConfiguration: S.optional(LoggingConfiguration),
      tracingConfiguration: S.optional(TracingConfiguration),
      mapRunArn: S.optional(S.String),
      label: S.optional(S.String),
      revisionId: S.optional(S.String),
      encryptionConfiguration: S.optional(EncryptionConfiguration),
      variableReferences: S.optional(VariableReferences),
    }).pipe(ns),
).annotate({
  identifier: "DescribeStateMachineForExecutionOutput",
}) as any as S.Schema<DescribeStateMachineForExecutionOutput>;
export interface GetActivityTaskInput {
  activityArn: string;
  workerName?: string;
}
export const GetActivityTaskInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ activityArn: S.String, workerName: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetActivityTaskInput",
}) as any as S.Schema<GetActivityTaskInput>;
export type TaskToken = string;
export type SensitiveDataJobInput = string | redacted.Redacted<string>;
export interface GetActivityTaskOutput {
  taskToken?: string;
  input?: string | redacted.Redacted<string>;
}
export const GetActivityTaskOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskToken: S.optional(S.String),
    input: S.optional(SensitiveString),
  }).pipe(ns),
).annotate({
  identifier: "GetActivityTaskOutput",
}) as any as S.Schema<GetActivityTaskOutput>;
export type PageSize = number;
export type ReverseOrder = boolean;
export type PageToken = string;
export type IncludeExecutionDataGetExecutionHistory = boolean;
export interface GetExecutionHistoryInput {
  executionArn: string;
  maxResults?: number;
  reverseOrder?: boolean;
  nextToken?: string;
  includeExecutionData?: boolean;
}
export const GetExecutionHistoryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionArn: S.String,
    maxResults: S.optional(S.Number),
    reverseOrder: S.optional(S.Boolean),
    nextToken: S.optional(S.String),
    includeExecutionData: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetExecutionHistoryInput",
}) as any as S.Schema<GetExecutionHistoryInput>;
export type HistoryEventType =
  | "ActivityFailed"
  | "ActivityScheduled"
  | "ActivityScheduleFailed"
  | "ActivityStarted"
  | "ActivitySucceeded"
  | "ActivityTimedOut"
  | "ChoiceStateEntered"
  | "ChoiceStateExited"
  | "ExecutionAborted"
  | "ExecutionFailed"
  | "ExecutionStarted"
  | "ExecutionSucceeded"
  | "ExecutionTimedOut"
  | "FailStateEntered"
  | "LambdaFunctionFailed"
  | "LambdaFunctionScheduled"
  | "LambdaFunctionScheduleFailed"
  | "LambdaFunctionStarted"
  | "LambdaFunctionStartFailed"
  | "LambdaFunctionSucceeded"
  | "LambdaFunctionTimedOut"
  | "MapIterationAborted"
  | "MapIterationFailed"
  | "MapIterationStarted"
  | "MapIterationSucceeded"
  | "MapStateAborted"
  | "MapStateEntered"
  | "MapStateExited"
  | "MapStateFailed"
  | "MapStateStarted"
  | "MapStateSucceeded"
  | "ParallelStateAborted"
  | "ParallelStateEntered"
  | "ParallelStateExited"
  | "ParallelStateFailed"
  | "ParallelStateStarted"
  | "ParallelStateSucceeded"
  | "PassStateEntered"
  | "PassStateExited"
  | "SucceedStateEntered"
  | "SucceedStateExited"
  | "TaskFailed"
  | "TaskScheduled"
  | "TaskStarted"
  | "TaskStartFailed"
  | "TaskStateAborted"
  | "TaskStateEntered"
  | "TaskStateExited"
  | "TaskSubmitFailed"
  | "TaskSubmitted"
  | "TaskSucceeded"
  | "TaskTimedOut"
  | "WaitStateAborted"
  | "WaitStateEntered"
  | "WaitStateExited"
  | "MapRunAborted"
  | "MapRunFailed"
  | "MapRunStarted"
  | "MapRunSucceeded"
  | "ExecutionRedriven"
  | "MapRunRedriven"
  | "EvaluationFailed"
  | (string & {});
export const HistoryEventType = /*@__PURE__*/ S.String;

export type EventId = number;
export interface ActivityFailedEventDetails {
  error?: string | redacted.Redacted<string>;
  cause?: string | redacted.Redacted<string>;
}
export const ActivityFailedEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    error: S.optional(SensitiveString),
    cause: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ActivityFailedEventDetails",
}) as any as S.Schema<ActivityFailedEventDetails>;
export interface ActivityScheduleFailedEventDetails {
  error?: string | redacted.Redacted<string>;
  cause?: string | redacted.Redacted<string>;
}
export const ActivityScheduleFailedEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    error: S.optional(SensitiveString),
    cause: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ActivityScheduleFailedEventDetails",
}) as any as S.Schema<ActivityScheduleFailedEventDetails>;
export type Truncated = boolean;
export interface HistoryEventExecutionDataDetails {
  truncated?: boolean;
}
export const HistoryEventExecutionDataDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ truncated: S.optional(S.Boolean) }),
).annotate({
  identifier: "HistoryEventExecutionDataDetails",
}) as any as S.Schema<HistoryEventExecutionDataDetails>;
export type TimeoutInSeconds = number;
export interface ActivityScheduledEventDetails {
  resource: string;
  input?: string | redacted.Redacted<string>;
  inputDetails?: HistoryEventExecutionDataDetails;
  timeoutInSeconds?: number;
  heartbeatInSeconds?: number;
}
export const ActivityScheduledEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resource: S.String,
    input: S.optional(SensitiveString),
    inputDetails: S.optional(HistoryEventExecutionDataDetails),
    timeoutInSeconds: S.optional(S.Number),
    heartbeatInSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "ActivityScheduledEventDetails",
}) as any as S.Schema<ActivityScheduledEventDetails>;
export type Identity = string;
export interface ActivityStartedEventDetails {
  workerName?: string;
}
export const ActivityStartedEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workerName: S.optional(S.String) }),
).annotate({
  identifier: "ActivityStartedEventDetails",
}) as any as S.Schema<ActivityStartedEventDetails>;
export interface ActivitySucceededEventDetails {
  output?: string | redacted.Redacted<string>;
  outputDetails?: HistoryEventExecutionDataDetails;
}
export const ActivitySucceededEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    output: S.optional(SensitiveString),
    outputDetails: S.optional(HistoryEventExecutionDataDetails),
  }),
).annotate({
  identifier: "ActivitySucceededEventDetails",
}) as any as S.Schema<ActivitySucceededEventDetails>;
export interface ActivityTimedOutEventDetails {
  error?: string | redacted.Redacted<string>;
  cause?: string | redacted.Redacted<string>;
}
export const ActivityTimedOutEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    error: S.optional(SensitiveString),
    cause: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ActivityTimedOutEventDetails",
}) as any as S.Schema<ActivityTimedOutEventDetails>;
export interface TaskFailedEventDetails {
  resourceType: string;
  resource: string;
  error?: string | redacted.Redacted<string>;
  cause?: string | redacted.Redacted<string>;
}
export const TaskFailedEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceType: S.String,
    resource: S.String,
    error: S.optional(SensitiveString),
    cause: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "TaskFailedEventDetails",
}) as any as S.Schema<TaskFailedEventDetails>;
export type ConnectorParameters = string | redacted.Redacted<string>;
export interface TaskCredentials {
  roleArn?: string;
}
export const TaskCredentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ roleArn: S.optional(S.String) }),
).annotate({
  identifier: "TaskCredentials",
}) as any as S.Schema<TaskCredentials>;
export interface TaskScheduledEventDetails {
  resourceType: string;
  resource: string;
  region: string;
  parameters: string | redacted.Redacted<string>;
  timeoutInSeconds?: number;
  heartbeatInSeconds?: number;
  taskCredentials?: TaskCredentials;
}
export const TaskScheduledEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceType: S.String,
    resource: S.String,
    region: S.String,
    parameters: SensitiveString,
    timeoutInSeconds: S.optional(S.Number),
    heartbeatInSeconds: S.optional(S.Number),
    taskCredentials: S.optional(TaskCredentials),
  }),
).annotate({
  identifier: "TaskScheduledEventDetails",
}) as any as S.Schema<TaskScheduledEventDetails>;
export interface TaskStartFailedEventDetails {
  resourceType: string;
  resource: string;
  error?: string | redacted.Redacted<string>;
  cause?: string | redacted.Redacted<string>;
}
export const TaskStartFailedEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceType: S.String,
    resource: S.String,
    error: S.optional(SensitiveString),
    cause: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "TaskStartFailedEventDetails",
}) as any as S.Schema<TaskStartFailedEventDetails>;
export interface TaskStartedEventDetails {
  resourceType: string;
  resource: string;
}
export const TaskStartedEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceType: S.String, resource: S.String }),
).annotate({
  identifier: "TaskStartedEventDetails",
}) as any as S.Schema<TaskStartedEventDetails>;
export interface TaskSubmitFailedEventDetails {
  resourceType: string;
  resource: string;
  error?: string | redacted.Redacted<string>;
  cause?: string | redacted.Redacted<string>;
}
export const TaskSubmitFailedEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceType: S.String,
    resource: S.String,
    error: S.optional(SensitiveString),
    cause: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "TaskSubmitFailedEventDetails",
}) as any as S.Schema<TaskSubmitFailedEventDetails>;
export interface TaskSubmittedEventDetails {
  resourceType: string;
  resource: string;
  output?: string | redacted.Redacted<string>;
  outputDetails?: HistoryEventExecutionDataDetails;
}
export const TaskSubmittedEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceType: S.String,
    resource: S.String,
    output: S.optional(SensitiveString),
    outputDetails: S.optional(HistoryEventExecutionDataDetails),
  }),
).annotate({
  identifier: "TaskSubmittedEventDetails",
}) as any as S.Schema<TaskSubmittedEventDetails>;
export interface TaskSucceededEventDetails {
  resourceType: string;
  resource: string;
  output?: string | redacted.Redacted<string>;
  outputDetails?: HistoryEventExecutionDataDetails;
}
export const TaskSucceededEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceType: S.String,
    resource: S.String,
    output: S.optional(SensitiveString),
    outputDetails: S.optional(HistoryEventExecutionDataDetails),
  }),
).annotate({
  identifier: "TaskSucceededEventDetails",
}) as any as S.Schema<TaskSucceededEventDetails>;
export interface TaskTimedOutEventDetails {
  resourceType: string;
  resource: string;
  error?: string | redacted.Redacted<string>;
  cause?: string | redacted.Redacted<string>;
}
export const TaskTimedOutEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceType: S.String,
    resource: S.String,
    error: S.optional(SensitiveString),
    cause: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "TaskTimedOutEventDetails",
}) as any as S.Schema<TaskTimedOutEventDetails>;
export interface ExecutionFailedEventDetails {
  error?: string | redacted.Redacted<string>;
  cause?: string | redacted.Redacted<string>;
}
export const ExecutionFailedEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    error: S.optional(SensitiveString),
    cause: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ExecutionFailedEventDetails",
}) as any as S.Schema<ExecutionFailedEventDetails>;
export interface ExecutionStartedEventDetails {
  input?: string | redacted.Redacted<string>;
  inputDetails?: HistoryEventExecutionDataDetails;
  roleArn?: string;
  stateMachineAliasArn?: string;
  stateMachineVersionArn?: string;
}
export const ExecutionStartedEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    input: S.optional(SensitiveString),
    inputDetails: S.optional(HistoryEventExecutionDataDetails),
    roleArn: S.optional(S.String),
    stateMachineAliasArn: S.optional(S.String),
    stateMachineVersionArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ExecutionStartedEventDetails",
}) as any as S.Schema<ExecutionStartedEventDetails>;
export interface ExecutionSucceededEventDetails {
  output?: string | redacted.Redacted<string>;
  outputDetails?: HistoryEventExecutionDataDetails;
}
export const ExecutionSucceededEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    output: S.optional(SensitiveString),
    outputDetails: S.optional(HistoryEventExecutionDataDetails),
  }),
).annotate({
  identifier: "ExecutionSucceededEventDetails",
}) as any as S.Schema<ExecutionSucceededEventDetails>;
export interface ExecutionAbortedEventDetails {
  error?: string | redacted.Redacted<string>;
  cause?: string | redacted.Redacted<string>;
}
export const ExecutionAbortedEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    error: S.optional(SensitiveString),
    cause: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ExecutionAbortedEventDetails",
}) as any as S.Schema<ExecutionAbortedEventDetails>;
export interface ExecutionTimedOutEventDetails {
  error?: string | redacted.Redacted<string>;
  cause?: string | redacted.Redacted<string>;
}
export const ExecutionTimedOutEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    error: S.optional(SensitiveString),
    cause: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ExecutionTimedOutEventDetails",
}) as any as S.Schema<ExecutionTimedOutEventDetails>;
export interface ExecutionRedrivenEventDetails {
  redriveCount?: number;
}
export const ExecutionRedrivenEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ redriveCount: S.optional(S.Number) }),
).annotate({
  identifier: "ExecutionRedrivenEventDetails",
}) as any as S.Schema<ExecutionRedrivenEventDetails>;
export type UnsignedInteger = number;
export interface MapStateStartedEventDetails {
  length?: number;
}
export const MapStateStartedEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ length: S.optional(S.Number) }),
).annotate({
  identifier: "MapStateStartedEventDetails",
}) as any as S.Schema<MapStateStartedEventDetails>;
export interface MapIterationEventDetails {
  name?: string;
  index?: number;
}
export const MapIterationEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), index: S.optional(S.Number) }),
).annotate({
  identifier: "MapIterationEventDetails",
}) as any as S.Schema<MapIterationEventDetails>;
export interface LambdaFunctionFailedEventDetails {
  error?: string | redacted.Redacted<string>;
  cause?: string | redacted.Redacted<string>;
}
export const LambdaFunctionFailedEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    error: S.optional(SensitiveString),
    cause: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "LambdaFunctionFailedEventDetails",
}) as any as S.Schema<LambdaFunctionFailedEventDetails>;
export interface LambdaFunctionScheduleFailedEventDetails {
  error?: string | redacted.Redacted<string>;
  cause?: string | redacted.Redacted<string>;
}
export const LambdaFunctionScheduleFailedEventDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      error: S.optional(SensitiveString),
      cause: S.optional(SensitiveString),
    }),
).annotate({
  identifier: "LambdaFunctionScheduleFailedEventDetails",
}) as any as S.Schema<LambdaFunctionScheduleFailedEventDetails>;
export interface LambdaFunctionScheduledEventDetails {
  resource: string;
  input?: string | redacted.Redacted<string>;
  inputDetails?: HistoryEventExecutionDataDetails;
  timeoutInSeconds?: number;
  taskCredentials?: TaskCredentials;
}
export const LambdaFunctionScheduledEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resource: S.String,
    input: S.optional(SensitiveString),
    inputDetails: S.optional(HistoryEventExecutionDataDetails),
    timeoutInSeconds: S.optional(S.Number),
    taskCredentials: S.optional(TaskCredentials),
  }),
).annotate({
  identifier: "LambdaFunctionScheduledEventDetails",
}) as any as S.Schema<LambdaFunctionScheduledEventDetails>;
export interface LambdaFunctionStartFailedEventDetails {
  error?: string | redacted.Redacted<string>;
  cause?: string | redacted.Redacted<string>;
}
export const LambdaFunctionStartFailedEventDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      error: S.optional(SensitiveString),
      cause: S.optional(SensitiveString),
    }),
).annotate({
  identifier: "LambdaFunctionStartFailedEventDetails",
}) as any as S.Schema<LambdaFunctionStartFailedEventDetails>;
export interface LambdaFunctionSucceededEventDetails {
  output?: string | redacted.Redacted<string>;
  outputDetails?: HistoryEventExecutionDataDetails;
}
export const LambdaFunctionSucceededEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    output: S.optional(SensitiveString),
    outputDetails: S.optional(HistoryEventExecutionDataDetails),
  }),
).annotate({
  identifier: "LambdaFunctionSucceededEventDetails",
}) as any as S.Schema<LambdaFunctionSucceededEventDetails>;
export interface LambdaFunctionTimedOutEventDetails {
  error?: string | redacted.Redacted<string>;
  cause?: string | redacted.Redacted<string>;
}
export const LambdaFunctionTimedOutEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    error: S.optional(SensitiveString),
    cause: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "LambdaFunctionTimedOutEventDetails",
}) as any as S.Schema<LambdaFunctionTimedOutEventDetails>;
export interface StateEnteredEventDetails {
  name: string;
  input?: string | redacted.Redacted<string>;
  inputDetails?: HistoryEventExecutionDataDetails;
}
export const StateEnteredEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    input: S.optional(SensitiveString),
    inputDetails: S.optional(HistoryEventExecutionDataDetails),
  }),
).annotate({
  identifier: "StateEnteredEventDetails",
}) as any as S.Schema<StateEnteredEventDetails>;
export type VariableValue = string | redacted.Redacted<string>;
export type AssignedVariables = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export const AssignedVariables = /*@__PURE__*/ S.Record(
  S.String,
  SensitiveString.pipe(S.optional),
);
export interface AssignedVariablesDetails {
  truncated?: boolean;
}
export const AssignedVariablesDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ truncated: S.optional(S.Boolean) }),
).annotate({
  identifier: "AssignedVariablesDetails",
}) as any as S.Schema<AssignedVariablesDetails>;
export interface StateExitedEventDetails {
  name: string;
  output?: string | redacted.Redacted<string>;
  outputDetails?: HistoryEventExecutionDataDetails;
  assignedVariables?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  assignedVariablesDetails?: AssignedVariablesDetails;
}
export const StateExitedEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    output: S.optional(SensitiveString),
    outputDetails: S.optional(HistoryEventExecutionDataDetails),
    assignedVariables: S.optional(AssignedVariables),
    assignedVariablesDetails: S.optional(AssignedVariablesDetails),
  }),
).annotate({
  identifier: "StateExitedEventDetails",
}) as any as S.Schema<StateExitedEventDetails>;
export interface MapRunStartedEventDetails {
  mapRunArn?: string;
}
export const MapRunStartedEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ mapRunArn: S.optional(S.String) }),
).annotate({
  identifier: "MapRunStartedEventDetails",
}) as any as S.Schema<MapRunStartedEventDetails>;
export interface MapRunFailedEventDetails {
  error?: string | redacted.Redacted<string>;
  cause?: string | redacted.Redacted<string>;
}
export const MapRunFailedEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    error: S.optional(SensitiveString),
    cause: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "MapRunFailedEventDetails",
}) as any as S.Schema<MapRunFailedEventDetails>;
export interface MapRunRedrivenEventDetails {
  mapRunArn?: string;
  redriveCount?: number;
}
export const MapRunRedrivenEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mapRunArn: S.optional(S.String),
    redriveCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "MapRunRedrivenEventDetails",
}) as any as S.Schema<MapRunRedrivenEventDetails>;
export type EvaluationFailureLocation = string | redacted.Redacted<string>;
export interface EvaluationFailedEventDetails {
  error?: string | redacted.Redacted<string>;
  cause?: string | redacted.Redacted<string>;
  location?: string | redacted.Redacted<string>;
  state: string;
}
export const EvaluationFailedEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    error: S.optional(SensitiveString),
    cause: S.optional(SensitiveString),
    location: S.optional(SensitiveString),
    state: S.String,
  }),
).annotate({
  identifier: "EvaluationFailedEventDetails",
}) as any as S.Schema<EvaluationFailedEventDetails>;
export interface HistoryEvent {
  timestamp: Date;
  type: HistoryEventType;
  id: number;
  previousEventId?: number;
  activityFailedEventDetails?: ActivityFailedEventDetails;
  activityScheduleFailedEventDetails?: ActivityScheduleFailedEventDetails;
  activityScheduledEventDetails?: ActivityScheduledEventDetails;
  activityStartedEventDetails?: ActivityStartedEventDetails;
  activitySucceededEventDetails?: ActivitySucceededEventDetails;
  activityTimedOutEventDetails?: ActivityTimedOutEventDetails;
  taskFailedEventDetails?: TaskFailedEventDetails;
  taskScheduledEventDetails?: TaskScheduledEventDetails;
  taskStartFailedEventDetails?: TaskStartFailedEventDetails;
  taskStartedEventDetails?: TaskStartedEventDetails;
  taskSubmitFailedEventDetails?: TaskSubmitFailedEventDetails;
  taskSubmittedEventDetails?: TaskSubmittedEventDetails;
  taskSucceededEventDetails?: TaskSucceededEventDetails;
  taskTimedOutEventDetails?: TaskTimedOutEventDetails;
  executionFailedEventDetails?: ExecutionFailedEventDetails;
  executionStartedEventDetails?: ExecutionStartedEventDetails;
  executionSucceededEventDetails?: ExecutionSucceededEventDetails;
  executionAbortedEventDetails?: ExecutionAbortedEventDetails;
  executionTimedOutEventDetails?: ExecutionTimedOutEventDetails;
  executionRedrivenEventDetails?: ExecutionRedrivenEventDetails;
  mapStateStartedEventDetails?: MapStateStartedEventDetails;
  mapIterationStartedEventDetails?: MapIterationEventDetails;
  mapIterationSucceededEventDetails?: MapIterationEventDetails;
  mapIterationFailedEventDetails?: MapIterationEventDetails;
  mapIterationAbortedEventDetails?: MapIterationEventDetails;
  lambdaFunctionFailedEventDetails?: LambdaFunctionFailedEventDetails;
  lambdaFunctionScheduleFailedEventDetails?: LambdaFunctionScheduleFailedEventDetails;
  lambdaFunctionScheduledEventDetails?: LambdaFunctionScheduledEventDetails;
  lambdaFunctionStartFailedEventDetails?: LambdaFunctionStartFailedEventDetails;
  lambdaFunctionSucceededEventDetails?: LambdaFunctionSucceededEventDetails;
  lambdaFunctionTimedOutEventDetails?: LambdaFunctionTimedOutEventDetails;
  stateEnteredEventDetails?: StateEnteredEventDetails;
  stateExitedEventDetails?: StateExitedEventDetails;
  mapRunStartedEventDetails?: MapRunStartedEventDetails;
  mapRunFailedEventDetails?: MapRunFailedEventDetails;
  mapRunRedrivenEventDetails?: MapRunRedrivenEventDetails;
  evaluationFailedEventDetails?: EvaluationFailedEventDetails;
}
export const HistoryEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    type: HistoryEventType,
    id: S.Number,
    previousEventId: S.optional(S.Number),
    activityFailedEventDetails: S.optional(ActivityFailedEventDetails),
    activityScheduleFailedEventDetails: S.optional(
      ActivityScheduleFailedEventDetails,
    ),
    activityScheduledEventDetails: S.optional(ActivityScheduledEventDetails),
    activityStartedEventDetails: S.optional(ActivityStartedEventDetails),
    activitySucceededEventDetails: S.optional(ActivitySucceededEventDetails),
    activityTimedOutEventDetails: S.optional(ActivityTimedOutEventDetails),
    taskFailedEventDetails: S.optional(TaskFailedEventDetails),
    taskScheduledEventDetails: S.optional(TaskScheduledEventDetails),
    taskStartFailedEventDetails: S.optional(TaskStartFailedEventDetails),
    taskStartedEventDetails: S.optional(TaskStartedEventDetails),
    taskSubmitFailedEventDetails: S.optional(TaskSubmitFailedEventDetails),
    taskSubmittedEventDetails: S.optional(TaskSubmittedEventDetails),
    taskSucceededEventDetails: S.optional(TaskSucceededEventDetails),
    taskTimedOutEventDetails: S.optional(TaskTimedOutEventDetails),
    executionFailedEventDetails: S.optional(ExecutionFailedEventDetails),
    executionStartedEventDetails: S.optional(ExecutionStartedEventDetails),
    executionSucceededEventDetails: S.optional(ExecutionSucceededEventDetails),
    executionAbortedEventDetails: S.optional(ExecutionAbortedEventDetails),
    executionTimedOutEventDetails: S.optional(ExecutionTimedOutEventDetails),
    executionRedrivenEventDetails: S.optional(ExecutionRedrivenEventDetails),
    mapStateStartedEventDetails: S.optional(MapStateStartedEventDetails),
    mapIterationStartedEventDetails: S.optional(MapIterationEventDetails),
    mapIterationSucceededEventDetails: S.optional(MapIterationEventDetails),
    mapIterationFailedEventDetails: S.optional(MapIterationEventDetails),
    mapIterationAbortedEventDetails: S.optional(MapIterationEventDetails),
    lambdaFunctionFailedEventDetails: S.optional(
      LambdaFunctionFailedEventDetails,
    ),
    lambdaFunctionScheduleFailedEventDetails: S.optional(
      LambdaFunctionScheduleFailedEventDetails,
    ),
    lambdaFunctionScheduledEventDetails: S.optional(
      LambdaFunctionScheduledEventDetails,
    ),
    lambdaFunctionStartFailedEventDetails: S.optional(
      LambdaFunctionStartFailedEventDetails,
    ),
    lambdaFunctionSucceededEventDetails: S.optional(
      LambdaFunctionSucceededEventDetails,
    ),
    lambdaFunctionTimedOutEventDetails: S.optional(
      LambdaFunctionTimedOutEventDetails,
    ),
    stateEnteredEventDetails: S.optional(StateEnteredEventDetails),
    stateExitedEventDetails: S.optional(StateExitedEventDetails),
    mapRunStartedEventDetails: S.optional(MapRunStartedEventDetails),
    mapRunFailedEventDetails: S.optional(MapRunFailedEventDetails),
    mapRunRedrivenEventDetails: S.optional(MapRunRedrivenEventDetails),
    evaluationFailedEventDetails: S.optional(EvaluationFailedEventDetails),
  }),
).annotate({ identifier: "HistoryEvent" }) as any as S.Schema<HistoryEvent>;
export type HistoryEventList = HistoryEvent[];
export const HistoryEventList = /*@__PURE__*/ S.Array(HistoryEvent);
export interface GetExecutionHistoryOutput {
  events: HistoryEvent[];
  nextToken?: string;
}
export const GetExecutionHistoryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ events: HistoryEventList, nextToken: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "GetExecutionHistoryOutput",
}) as any as S.Schema<GetExecutionHistoryOutput>;
export interface ListActivitiesInput {
  maxResults?: number;
  nextToken?: string;
}
export const ListActivitiesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListActivitiesInput",
}) as any as S.Schema<ListActivitiesInput>;
export interface ActivityListItem {
  activityArn: string;
  name: string;
  creationDate: Date;
}
export const ActivityListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    activityArn: S.String,
    name: S.String,
    creationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "ActivityListItem",
}) as any as S.Schema<ActivityListItem>;
export type ActivityList = ActivityListItem[];
export const ActivityList = /*@__PURE__*/ S.Array(ActivityListItem);
export interface ListActivitiesOutput {
  activities: ActivityListItem[];
  nextToken?: string;
}
export const ListActivitiesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ activities: ActivityList, nextToken: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "ListActivitiesOutput",
}) as any as S.Schema<ListActivitiesOutput>;
export type ListExecutionsPageToken = string;
export type ExecutionRedriveFilter =
  | "REDRIVEN"
  | "NOT_REDRIVEN"
  | (string & {});
export const ExecutionRedriveFilter = /*@__PURE__*/ S.String;

export interface ListExecutionsInput {
  stateMachineArn?: string;
  statusFilter?: ExecutionStatus;
  maxResults?: number;
  nextToken?: string;
  mapRunArn?: string;
  redriveFilter?: ExecutionRedriveFilter;
}
export const ListExecutionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stateMachineArn: S.optional(S.String),
    statusFilter: S.optional(ExecutionStatus),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    mapRunArn: S.optional(S.String),
    redriveFilter: S.optional(ExecutionRedriveFilter),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListExecutionsInput",
}) as any as S.Schema<ListExecutionsInput>;
export interface ExecutionListItem {
  executionArn: string;
  stateMachineArn: string;
  name: string;
  status: ExecutionStatus;
  startDate: Date;
  stopDate?: Date;
  mapRunArn?: string;
  itemCount?: number;
  stateMachineVersionArn?: string;
  stateMachineAliasArn?: string;
  redriveCount?: number;
  redriveDate?: Date;
}
export const ExecutionListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionArn: S.String,
    stateMachineArn: S.String,
    name: S.String,
    status: ExecutionStatus,
    startDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    stopDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    mapRunArn: S.optional(S.String),
    itemCount: S.optional(S.Number),
    stateMachineVersionArn: S.optional(S.String),
    stateMachineAliasArn: S.optional(S.String),
    redriveCount: S.optional(S.Number),
    redriveDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ExecutionListItem",
}) as any as S.Schema<ExecutionListItem>;
export type ExecutionList = ExecutionListItem[];
export const ExecutionList = /*@__PURE__*/ S.Array(ExecutionListItem);
export interface ListExecutionsOutput {
  executions: ExecutionListItem[];
  nextToken?: string;
}
export const ListExecutionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ executions: ExecutionList, nextToken: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "ListExecutionsOutput",
}) as any as S.Schema<ListExecutionsOutput>;
export interface ListMapRunsInput {
  executionArn: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListMapRunsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionArn: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMapRunsInput",
}) as any as S.Schema<ListMapRunsInput>;
export interface MapRunListItem {
  executionArn: string;
  mapRunArn: string;
  stateMachineArn: string;
  startDate: Date;
  stopDate?: Date;
}
export const MapRunListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionArn: S.String,
    mapRunArn: S.String,
    stateMachineArn: S.String,
    startDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    stopDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "MapRunListItem" }) as any as S.Schema<MapRunListItem>;
export type MapRunList = MapRunListItem[];
export const MapRunList = /*@__PURE__*/ S.Array(MapRunListItem);
export interface ListMapRunsOutput {
  mapRuns: MapRunListItem[];
  nextToken?: string;
}
export const ListMapRunsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ mapRuns: MapRunList, nextToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "ListMapRunsOutput",
}) as any as S.Schema<ListMapRunsOutput>;
export interface ListStateMachineAliasesInput {
  stateMachineArn: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListStateMachineAliasesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stateMachineArn: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListStateMachineAliasesInput",
}) as any as S.Schema<ListStateMachineAliasesInput>;
export interface StateMachineAliasListItem {
  stateMachineAliasArn: string;
  creationDate: Date;
}
export const StateMachineAliasListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stateMachineAliasArn: S.String,
    creationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "StateMachineAliasListItem",
}) as any as S.Schema<StateMachineAliasListItem>;
export type StateMachineAliasList = StateMachineAliasListItem[];
export const StateMachineAliasList = /*@__PURE__*/ S.Array(
  StateMachineAliasListItem,
);
export interface ListStateMachineAliasesOutput {
  stateMachineAliases: StateMachineAliasListItem[];
  nextToken?: string;
}
export const ListStateMachineAliasesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stateMachineAliases: StateMachineAliasList,
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListStateMachineAliasesOutput",
}) as any as S.Schema<ListStateMachineAliasesOutput>;
export interface ListStateMachinesInput {
  maxResults?: number;
  nextToken?: string;
}
export const ListStateMachinesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListStateMachinesInput",
}) as any as S.Schema<ListStateMachinesInput>;
export interface StateMachineListItem {
  stateMachineArn: string;
  name: string;
  type: StateMachineType;
  creationDate: Date;
}
export const StateMachineListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stateMachineArn: S.String,
    name: S.String,
    type: StateMachineType,
    creationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "StateMachineListItem",
}) as any as S.Schema<StateMachineListItem>;
export type StateMachineList = StateMachineListItem[];
export const StateMachineList = /*@__PURE__*/ S.Array(StateMachineListItem);
export interface ListStateMachinesOutput {
  stateMachines: StateMachineListItem[];
  nextToken?: string;
}
export const ListStateMachinesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stateMachines: StateMachineList,
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListStateMachinesOutput",
}) as any as S.Schema<ListStateMachinesOutput>;
export interface ListStateMachineVersionsInput {
  stateMachineArn: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListStateMachineVersionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stateMachineArn: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListStateMachineVersionsInput",
}) as any as S.Schema<ListStateMachineVersionsInput>;
export interface StateMachineVersionListItem {
  stateMachineVersionArn: string;
  creationDate: Date;
}
export const StateMachineVersionListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stateMachineVersionArn: S.String,
    creationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "StateMachineVersionListItem",
}) as any as S.Schema<StateMachineVersionListItem>;
export type StateMachineVersionList = StateMachineVersionListItem[];
export const StateMachineVersionList = /*@__PURE__*/ S.Array(
  StateMachineVersionListItem,
);
export interface ListStateMachineVersionsOutput {
  stateMachineVersions: StateMachineVersionListItem[];
  nextToken?: string;
}
export const ListStateMachineVersionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stateMachineVersions: StateMachineVersionList,
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListStateMachineVersionsOutput",
}) as any as S.Schema<ListStateMachineVersionsOutput>;
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  tags?: Tag[];
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagList) }).pipe(ns),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export interface PublishStateMachineVersionInput {
  stateMachineArn: string;
  revisionId?: string;
  description?: string | redacted.Redacted<string>;
}
export const PublishStateMachineVersionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stateMachineArn: S.String,
    revisionId: S.optional(S.String),
    description: S.optional(SensitiveString),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PublishStateMachineVersionInput",
}) as any as S.Schema<PublishStateMachineVersionInput>;
export interface PublishStateMachineVersionOutput {
  creationDate: Date;
  stateMachineVersionArn: string;
}
export const PublishStateMachineVersionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    creationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    stateMachineVersionArn: S.String,
  }).pipe(ns),
).annotate({
  identifier: "PublishStateMachineVersionOutput",
}) as any as S.Schema<PublishStateMachineVersionOutput>;
export type ClientToken = string;
export interface RedriveExecutionInput {
  executionArn: string;
  clientToken?: string;
}
export const RedriveExecutionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionArn: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RedriveExecutionInput",
}) as any as S.Schema<RedriveExecutionInput>;
export interface RedriveExecutionOutput {
  redriveDate: Date;
}
export const RedriveExecutionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    redriveDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }).pipe(ns),
).annotate({
  identifier: "RedriveExecutionOutput",
}) as any as S.Schema<RedriveExecutionOutput>;
export interface SendTaskFailureInput {
  taskToken: string;
  error?: string | redacted.Redacted<string>;
  cause?: string | redacted.Redacted<string>;
}
export const SendTaskFailureInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskToken: S.String,
    error: S.optional(SensitiveString),
    cause: S.optional(SensitiveString),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SendTaskFailureInput",
}) as any as S.Schema<SendTaskFailureInput>;
export interface SendTaskFailureOutput {}
export const SendTaskFailureOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "SendTaskFailureOutput",
}) as any as S.Schema<SendTaskFailureOutput>;
export interface SendTaskHeartbeatInput {
  taskToken: string;
}
export const SendTaskHeartbeatInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taskToken: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SendTaskHeartbeatInput",
}) as any as S.Schema<SendTaskHeartbeatInput>;
export interface SendTaskHeartbeatOutput {}
export const SendTaskHeartbeatOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "SendTaskHeartbeatOutput",
}) as any as S.Schema<SendTaskHeartbeatOutput>;
export interface SendTaskSuccessInput {
  taskToken: string;
  output: string | redacted.Redacted<string>;
}
export const SendTaskSuccessInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taskToken: S.String, output: SensitiveString }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SendTaskSuccessInput",
}) as any as S.Schema<SendTaskSuccessInput>;
export interface SendTaskSuccessOutput {}
export const SendTaskSuccessOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "SendTaskSuccessOutput",
}) as any as S.Schema<SendTaskSuccessOutput>;
export interface StartExecutionInput {
  stateMachineArn: string;
  name?: string;
  input?: string | redacted.Redacted<string>;
  traceHeader?: string;
}
export const StartExecutionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stateMachineArn: S.String,
    name: S.optional(S.String),
    input: S.optional(SensitiveString),
    traceHeader: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartExecutionInput",
}) as any as S.Schema<StartExecutionInput>;
export interface StartExecutionOutput {
  executionArn: string;
  startDate: Date;
}
export const StartExecutionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionArn: S.String,
    startDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }).pipe(ns),
).annotate({
  identifier: "StartExecutionOutput",
}) as any as S.Schema<StartExecutionOutput>;
export interface StartSyncExecutionInput {
  stateMachineArn: string;
  name?: string;
  input?: string | redacted.Redacted<string>;
  traceHeader?: string;
  includedData?: IncludedData;
}
export const StartSyncExecutionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stateMachineArn: S.String,
    name: S.optional(S.String),
    input: S.optional(SensitiveString),
    traceHeader: S.optional(S.String),
    includedData: S.optional(IncludedData),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartSyncExecutionInput",
}) as any as S.Schema<StartSyncExecutionInput>;
export type SyncExecutionStatus =
  | "SUCCEEDED"
  | "FAILED"
  | "TIMED_OUT"
  | (string & {});
export const SyncExecutionStatus = /*@__PURE__*/ S.String;

export type BilledMemoryUsed = number;
export type BilledDuration = number;
export interface BillingDetails {
  billedMemoryUsedInMB?: number;
  billedDurationInMilliseconds?: number;
}
export const BillingDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    billedMemoryUsedInMB: S.optional(S.Number),
    billedDurationInMilliseconds: S.optional(S.Number),
  }),
).annotate({ identifier: "BillingDetails" }) as any as S.Schema<BillingDetails>;
export interface StartSyncExecutionOutput {
  executionArn: string;
  stateMachineArn?: string;
  name?: string;
  startDate: Date;
  stopDate: Date;
  status: SyncExecutionStatus;
  error?: string | redacted.Redacted<string>;
  cause?: string | redacted.Redacted<string>;
  input?: string | redacted.Redacted<string>;
  inputDetails?: CloudWatchEventsExecutionDataDetails;
  output?: string | redacted.Redacted<string>;
  outputDetails?: CloudWatchEventsExecutionDataDetails;
  traceHeader?: string;
  billingDetails?: BillingDetails;
}
export const StartSyncExecutionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionArn: S.String,
    stateMachineArn: S.optional(S.String),
    name: S.optional(S.String),
    startDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    stopDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: SyncExecutionStatus,
    error: S.optional(SensitiveString),
    cause: S.optional(SensitiveString),
    input: S.optional(SensitiveString),
    inputDetails: S.optional(CloudWatchEventsExecutionDataDetails),
    output: S.optional(SensitiveString),
    outputDetails: S.optional(CloudWatchEventsExecutionDataDetails),
    traceHeader: S.optional(S.String),
    billingDetails: S.optional(BillingDetails),
  }).pipe(ns),
).annotate({
  identifier: "StartSyncExecutionOutput",
}) as any as S.Schema<StartSyncExecutionOutput>;
export interface StopExecutionInput {
  executionArn: string;
  error?: string | redacted.Redacted<string>;
  cause?: string | redacted.Redacted<string>;
}
export const StopExecutionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionArn: S.String,
    error: S.optional(SensitiveString),
    cause: S.optional(SensitiveString),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopExecutionInput",
}) as any as S.Schema<StopExecutionInput>;
export interface StopExecutionOutput {
  stopDate: Date;
}
export const StopExecutionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ stopDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")) }).pipe(
    ns,
  ),
).annotate({
  identifier: "StopExecutionOutput",
}) as any as S.Schema<StopExecutionOutput>;
export interface TagResourceInput {
  resourceArn: string;
  tags: Tag[];
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tags: TagList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceOutput {}
export const TagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TagResourceOutput",
}) as any as S.Schema<TagResourceOutput>;
export type InspectionLevel = "INFO" | "DEBUG" | "TRACE" | (string & {});
export const InspectionLevel = /*@__PURE__*/ S.String;

export type RevealSecrets = boolean;
export type TestStateStateName = string | redacted.Redacted<string>;
export interface MockErrorOutput {
  error?: string | redacted.Redacted<string>;
  cause?: string | redacted.Redacted<string>;
}
export const MockErrorOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    error: S.optional(SensitiveString),
    cause: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "MockErrorOutput",
}) as any as S.Schema<MockErrorOutput>;
export type MockResponseValidationMode =
  | "STRICT"
  | "PRESENT"
  | "NONE"
  | (string & {});
export const MockResponseValidationMode = /*@__PURE__*/ S.String;

export interface MockInput {
  result?: string | redacted.Redacted<string>;
  errorOutput?: MockErrorOutput;
  fieldValidationMode?: MockResponseValidationMode;
}
export const MockInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    result: S.optional(SensitiveString),
    errorOutput: S.optional(MockErrorOutput),
    fieldValidationMode: S.optional(MockResponseValidationMode),
  }),
).annotate({ identifier: "MockInput" }) as any as S.Schema<MockInput>;
export type RetrierRetryCount = number;
export type MapIterationFailureCount = number;
export interface TestStateConfiguration {
  retrierRetryCount?: number;
  errorCausedByState?: string | redacted.Redacted<string>;
  mapIterationFailureCount?: number;
  mapItemReaderData?: string | redacted.Redacted<string>;
}
export const TestStateConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    retrierRetryCount: S.optional(S.Number),
    errorCausedByState: S.optional(SensitiveString),
    mapIterationFailureCount: S.optional(S.Number),
    mapItemReaderData: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "TestStateConfiguration",
}) as any as S.Schema<TestStateConfiguration>;
export interface TestStateInput {
  definition: string | redacted.Redacted<string>;
  roleArn?: string;
  input?: string | redacted.Redacted<string>;
  inspectionLevel?: InspectionLevel;
  revealSecrets?: boolean;
  variables?: string | redacted.Redacted<string>;
  stateName?: string | redacted.Redacted<string>;
  mock?: MockInput;
  context?: string | redacted.Redacted<string>;
  stateConfiguration?: TestStateConfiguration;
}
export const TestStateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    definition: SensitiveString,
    roleArn: S.optional(S.String),
    input: S.optional(SensitiveString),
    inspectionLevel: S.optional(InspectionLevel),
    revealSecrets: S.optional(S.Boolean),
    variables: S.optional(SensitiveString),
    stateName: S.optional(SensitiveString),
    mock: S.optional(MockInput),
    context: S.optional(SensitiveString),
    stateConfiguration: S.optional(TestStateConfiguration),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "TestStateInput" }) as any as S.Schema<TestStateInput>;
export type HTTPProtocol = string;
export type HTTPMethod = string;
export type URL = string;
export type HTTPHeaders = string;
export type HTTPBody = string;
export interface InspectionDataRequest {
  protocol?: string;
  method?: string;
  url?: string;
  headers?: string;
  body?: string;
}
export const InspectionDataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    protocol: S.optional(S.String),
    method: S.optional(S.String),
    url: S.optional(S.String),
    headers: S.optional(S.String),
    body: S.optional(S.String),
  }),
).annotate({
  identifier: "InspectionDataRequest",
}) as any as S.Schema<InspectionDataRequest>;
export type HTTPStatusCode = string;
export type HTTPStatusMessage = string;
export interface InspectionDataResponse {
  protocol?: string;
  statusCode?: string;
  statusMessage?: string;
  headers?: string;
  body?: string;
}
export const InspectionDataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    protocol: S.optional(S.String),
    statusCode: S.optional(S.String),
    statusMessage: S.optional(S.String),
    headers: S.optional(S.String),
    body: S.optional(S.String),
  }),
).annotate({
  identifier: "InspectionDataResponse",
}) as any as S.Schema<InspectionDataResponse>;
export type ExceptionHandlerIndex = number;
export type RetryBackoffIntervalSeconds = number;
export interface InspectionErrorDetails {
  catchIndex?: number;
  retryIndex?: number;
  retryBackoffIntervalSeconds?: number;
}
export const InspectionErrorDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    catchIndex: S.optional(S.Number),
    retryIndex: S.optional(S.Number),
    retryBackoffIntervalSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "InspectionErrorDetails",
}) as any as S.Schema<InspectionErrorDetails>;
export type InspectionToleratedFailureCount = number;
export type InspectionToleratedFailurePercentage = number;
export type InspectionMaxConcurrency = number;
export interface InspectionData {
  input?: string | redacted.Redacted<string>;
  afterArguments?: string | redacted.Redacted<string>;
  afterInputPath?: string | redacted.Redacted<string>;
  afterParameters?: string | redacted.Redacted<string>;
  result?: string | redacted.Redacted<string>;
  afterResultSelector?: string | redacted.Redacted<string>;
  afterResultPath?: string | redacted.Redacted<string>;
  request?: InspectionDataRequest;
  response?: InspectionDataResponse;
  variables?: string | redacted.Redacted<string>;
  errorDetails?: InspectionErrorDetails;
  afterItemsPath?: string | redacted.Redacted<string>;
  afterItemSelector?: string | redacted.Redacted<string>;
  afterItemBatcher?: string | redacted.Redacted<string>;
  afterItemsPointer?: string | redacted.Redacted<string>;
  toleratedFailureCount?: number;
  toleratedFailurePercentage?: number;
  maxConcurrency?: number;
}
export const InspectionData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    input: S.optional(SensitiveString),
    afterArguments: S.optional(SensitiveString),
    afterInputPath: S.optional(SensitiveString),
    afterParameters: S.optional(SensitiveString),
    result: S.optional(SensitiveString),
    afterResultSelector: S.optional(SensitiveString),
    afterResultPath: S.optional(SensitiveString),
    request: S.optional(InspectionDataRequest),
    response: S.optional(InspectionDataResponse),
    variables: S.optional(SensitiveString),
    errorDetails: S.optional(InspectionErrorDetails),
    afterItemsPath: S.optional(SensitiveString),
    afterItemSelector: S.optional(SensitiveString),
    afterItemBatcher: S.optional(SensitiveString),
    afterItemsPointer: S.optional(SensitiveString),
    toleratedFailureCount: S.optional(S.Number),
    toleratedFailurePercentage: S.optional(S.Number),
    maxConcurrency: S.optional(S.Number),
  }),
).annotate({ identifier: "InspectionData" }) as any as S.Schema<InspectionData>;
export type TestExecutionStatus =
  | "SUCCEEDED"
  | "FAILED"
  | "RETRIABLE"
  | "CAUGHT_ERROR"
  | (string & {});
export const TestExecutionStatus = /*@__PURE__*/ S.String;

export interface TestStateOutput {
  output?: string | redacted.Redacted<string>;
  error?: string | redacted.Redacted<string>;
  cause?: string | redacted.Redacted<string>;
  inspectionData?: InspectionData;
  nextState?: string;
  status?: TestExecutionStatus;
}
export const TestStateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    output: S.optional(SensitiveString),
    error: S.optional(SensitiveString),
    cause: S.optional(SensitiveString),
    inspectionData: S.optional(InspectionData),
    nextState: S.optional(S.String),
    status: S.optional(TestExecutionStatus),
  }).pipe(ns),
).annotate({
  identifier: "TestStateOutput",
}) as any as S.Schema<TestStateOutput>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tagKeys: TagKeyList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceOutput {}
export const UntagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export interface UpdateMapRunInput {
  mapRunArn: string;
  maxConcurrency?: number;
  toleratedFailurePercentage?: number;
  toleratedFailureCount?: number;
}
export const UpdateMapRunInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mapRunArn: S.String,
    maxConcurrency: S.optional(S.Number),
    toleratedFailurePercentage: S.optional(S.Number),
    toleratedFailureCount: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMapRunInput",
}) as any as S.Schema<UpdateMapRunInput>;
export interface UpdateMapRunOutput {}
export const UpdateMapRunOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateMapRunOutput",
}) as any as S.Schema<UpdateMapRunOutput>;
export interface UpdateStateMachineInput {
  stateMachineArn: string;
  definition?: string | redacted.Redacted<string>;
  roleArn?: string;
  loggingConfiguration?: LoggingConfiguration;
  tracingConfiguration?: TracingConfiguration;
  publish?: boolean;
  versionDescription?: string | redacted.Redacted<string>;
  encryptionConfiguration?: EncryptionConfiguration;
}
export const UpdateStateMachineInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stateMachineArn: S.String,
    definition: S.optional(SensitiveString),
    roleArn: S.optional(S.String),
    loggingConfiguration: S.optional(LoggingConfiguration),
    tracingConfiguration: S.optional(TracingConfiguration),
    publish: S.optional(S.Boolean),
    versionDescription: S.optional(SensitiveString),
    encryptionConfiguration: S.optional(EncryptionConfiguration),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateStateMachineInput",
}) as any as S.Schema<UpdateStateMachineInput>;
export interface UpdateStateMachineOutput {
  updateDate: Date;
  revisionId?: string;
  stateMachineVersionArn?: string;
}
export const UpdateStateMachineOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    updateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    revisionId: S.optional(S.String),
    stateMachineVersionArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "UpdateStateMachineOutput",
}) as any as S.Schema<UpdateStateMachineOutput>;
export interface UpdateStateMachineAliasInput {
  stateMachineAliasArn: string;
  description?: string | redacted.Redacted<string>;
  routingConfiguration?: RoutingConfigurationListItem[];
}
export const UpdateStateMachineAliasInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stateMachineAliasArn: S.String,
    description: S.optional(SensitiveString),
    routingConfiguration: S.optional(RoutingConfigurationList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateStateMachineAliasInput",
}) as any as S.Schema<UpdateStateMachineAliasInput>;
export interface UpdateStateMachineAliasOutput {
  updateDate: Date;
}
export const UpdateStateMachineAliasOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    updateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }).pipe(ns),
).annotate({
  identifier: "UpdateStateMachineAliasOutput",
}) as any as S.Schema<UpdateStateMachineAliasOutput>;
export type ValidateStateMachineDefinitionSeverity =
  | "ERROR"
  | "WARNING"
  | (string & {});
export const ValidateStateMachineDefinitionSeverity = /*@__PURE__*/ S.String;

export type ValidateStateMachineDefinitionMaxResult = number;
export interface ValidateStateMachineDefinitionInput {
  definition: string | redacted.Redacted<string>;
  type?: StateMachineType;
  severity?: ValidateStateMachineDefinitionSeverity;
  maxResults?: number;
}
export const ValidateStateMachineDefinitionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    definition: SensitiveString,
    type: S.optional(StateMachineType),
    severity: S.optional(ValidateStateMachineDefinitionSeverity),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ValidateStateMachineDefinitionInput",
}) as any as S.Schema<ValidateStateMachineDefinitionInput>;
export type ValidateStateMachineDefinitionResultCode =
  | "OK"
  | "FAIL"
  | (string & {});
export const ValidateStateMachineDefinitionResultCode = /*@__PURE__*/ S.String;

export type ValidateStateMachineDefinitionCode =
  | string
  | redacted.Redacted<string>;
export type ValidateStateMachineDefinitionMessage =
  | string
  | redacted.Redacted<string>;
export type ValidateStateMachineDefinitionLocation =
  | string
  | redacted.Redacted<string>;
export interface ValidateStateMachineDefinitionDiagnostic {
  severity: ValidateStateMachineDefinitionSeverity;
  code: string | redacted.Redacted<string>;
  message: string | redacted.Redacted<string>;
  location?: string | redacted.Redacted<string>;
}
export const ValidateStateMachineDefinitionDiagnostic = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      severity: ValidateStateMachineDefinitionSeverity,
      code: SensitiveString,
      message: SensitiveString,
      location: S.optional(SensitiveString),
    }),
).annotate({
  identifier: "ValidateStateMachineDefinitionDiagnostic",
}) as any as S.Schema<ValidateStateMachineDefinitionDiagnostic>;
export type ValidateStateMachineDefinitionDiagnosticList =
  ValidateStateMachineDefinitionDiagnostic[];
export const ValidateStateMachineDefinitionDiagnosticList =
  /*@__PURE__*/ S.Array(ValidateStateMachineDefinitionDiagnostic);
export type ValidateStateMachineDefinitionTruncated = boolean;
export interface ValidateStateMachineDefinitionOutput {
  result: ValidateStateMachineDefinitionResultCode;
  diagnostics: ValidateStateMachineDefinitionDiagnostic[];
  truncated?: boolean;
}
export const ValidateStateMachineDefinitionOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      result: ValidateStateMachineDefinitionResultCode,
      diagnostics: ValidateStateMachineDefinitionDiagnosticList,
      truncated: S.optional(S.Boolean),
    }).pipe(ns),
).annotate({
  identifier: "ValidateStateMachineDefinitionOutput",
}) as any as S.Schema<ValidateStateMachineDefinitionOutput>;
export type ErrorMessage = string;
export type ValidationExceptionReason =
  | "API_DOES_NOT_SUPPORT_LABELED_ARNS"
  | "MISSING_REQUIRED_PARAMETER"
  | "CANNOT_UPDATE_COMPLETED_MAP_RUN"
  | "INVALID_ROUTING_CONFIGURATION"
  | (string & {});
export const ValidationExceptionReason = /*@__PURE__*/ S.String;

export type KmsKeyState =
  | "DISABLED"
  | "PENDING_DELETION"
  | "PENDING_IMPORT"
  | "UNAVAILABLE"
  | "CREATING"
  | (string & {});
export const KmsKeyState = /*@__PURE__*/ S.String;

export type CreateActivityError =
  | ActivityAlreadyExists
  | ActivityLimitExceeded
  | InvalidEncryptionConfiguration
  | InvalidName
  | KmsAccessDeniedException
  | KmsThrottlingException
  | TooManyTags
  | CommonErrors;
/**
 * Creates an activity. An activity is a task that you write in any programming language and
 * host on any machine that has access to Step Functions. Activities must poll Step Functions using the
 * `GetActivityTask` API action and respond using `SendTask*` API
 * actions. This function lets Step Functions know the existence of your activity and returns an
 * identifier for use in a state machine and when polling from the activity.
 *
 * This operation is eventually consistent. The results are best effort and may not reflect very recent updates and changes.
 *
 * `CreateActivity` is an idempotent API. Subsequent requests won’t create a
 * duplicate resource if it was already created. `CreateActivity`'s idempotency
 * check is based on the activity `name`. If a following request has different
 * `tags` values, Step Functions will ignore these differences and treat it as an
 * idempotent request of the previous. In this case, `tags` will not be updated,
 * even if they are different.
 */
export const createActivity: API.OperationMethod<
  CreateActivityInput,
  CreateActivityOutput,
  CreateActivityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateActivityInput,
  output: CreateActivityOutput,
  errors: [
    ActivityAlreadyExists,
    ActivityLimitExceeded,
    InvalidEncryptionConfiguration,
    InvalidName,
    KmsAccessDeniedException,
    KmsThrottlingException,
    TooManyTags,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateActivity",
}));

export type CreateStateMachineError =
  | ConflictException
  | InvalidArn
  | InvalidDefinition
  | InvalidEncryptionConfiguration
  | InvalidLoggingConfiguration
  | InvalidName
  | InvalidTracingConfiguration
  | KmsAccessDeniedException
  | KmsThrottlingException
  | StateMachineAlreadyExists
  | StateMachineDeleting
  | StateMachineLimitExceeded
  | StateMachineTypeNotSupported
  | TooManyTags
  | ValidationException
  | CommonErrors;
/**
 * Creates a state machine. A state machine consists of a collection of states that can do
 * work (`Task` states), determine to which states to transition next
 * (`Choice` states), stop an execution with an error (`Fail` states),
 * and so on. State machines are specified using a JSON-based, structured language. For more
 * information, see Amazon States
 * Language in the Step Functions User Guide.
 *
 * If you set the `publish` parameter of this API action to `true`, it
 * publishes version `1` as the first revision of the state machine.
 *
 * For additional control over security, you can encrypt your data using a **customer-managed key** for Step Functions state machines. You can configure a symmetric KMS key and data key reuse period when creating or updating a **State Machine**. The execution history and state machine definition will be encrypted with the key applied to the State Machine.
 *
 * This operation is eventually consistent. The results are best effort and may not reflect very recent updates and changes.
 *
 * `CreateStateMachine` is an idempotent API. Subsequent requests won’t create a
 * duplicate resource if it was already created. `CreateStateMachine`'s idempotency
 * check is based on the state machine `name`, `definition`,
 * `type`, `LoggingConfiguration`,
 * `TracingConfiguration`, and `EncryptionConfiguration` The check is also based on the `publish` and `versionDescription` parameters. If a following request has a different
 * `roleArn` or `tags`, Step Functions will ignore these differences and treat
 * it as an idempotent request of the previous. In this case, `roleArn` and
 * `tags` will not be updated, even if they are different.
 */
export const createStateMachine: API.OperationMethod<
  CreateStateMachineInput,
  CreateStateMachineOutput,
  CreateStateMachineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateStateMachineInput,
  output: CreateStateMachineOutput,
  errors: [
    ConflictException,
    InvalidArn,
    InvalidDefinition,
    InvalidEncryptionConfiguration,
    InvalidLoggingConfiguration,
    InvalidName,
    InvalidTracingConfiguration,
    KmsAccessDeniedException,
    KmsThrottlingException,
    StateMachineAlreadyExists,
    StateMachineDeleting,
    StateMachineLimitExceeded,
    StateMachineTypeNotSupported,
    TooManyTags,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStateMachine",
}));

export type CreateStateMachineAliasError =
  | ConflictException
  | InvalidArn
  | InvalidName
  | ResourceNotFound
  | ServiceQuotaExceededException
  | StateMachineDeleting
  | ValidationException
  | CommonErrors;
/**
 * Creates an alias for a state machine that points to one or two versions of the same state machine. You can set your application to call StartExecution with an alias and update the version the alias uses without changing the client's code.
 *
 * You can also map an alias to split StartExecution requests between two
 * versions of a state machine. To do this, add a second `RoutingConfig` object in the
 * `routingConfiguration` parameter. You must also specify the percentage of
 * execution run requests each version should receive in both `RoutingConfig` objects.
 * Step Functions randomly chooses which version runs a given execution based on the
 * percentage you specify.
 *
 * To create an alias that points to a single version, specify a single
 * `RoutingConfig` object with a `weight` set to 100.
 *
 * You can create up to 100 aliases for each state machine. You must delete unused aliases using the DeleteStateMachineAlias API action.
 *
 * `CreateStateMachineAlias` is an idempotent API. Step Functions bases the
 * idempotency check on the `stateMachineArn`, `description`,
 * `name`, and `routingConfiguration` parameters. Requests that contain
 * the same values for these parameters return a successful idempotent response without creating
 * a duplicate resource.
 *
 * **Related operations:**
 *
 * - DescribeStateMachineAlias
 *
 * - ListStateMachineAliases
 *
 * - UpdateStateMachineAlias
 *
 * - DeleteStateMachineAlias
 */
export const createStateMachineAlias: API.OperationMethod<
  CreateStateMachineAliasInput,
  CreateStateMachineAliasOutput,
  CreateStateMachineAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateStateMachineAliasInput,
  output: CreateStateMachineAliasOutput,
  errors: [
    ConflictException,
    InvalidArn,
    InvalidName,
    ResourceNotFound,
    ServiceQuotaExceededException,
    StateMachineDeleting,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStateMachineAlias",
}));

export type DeleteActivityError = InvalidArn | CommonErrors;
/**
 * Deletes an activity.
 */
export const deleteActivity: API.OperationMethod<
  DeleteActivityInput,
  DeleteActivityOutput,
  DeleteActivityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteActivityInput,
  output: DeleteActivityOutput,
  errors: [InvalidArn],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteActivity",
}));

export type DeleteStateMachineError =
  | InvalidArn
  | ValidationException
  | CommonErrors;
/**
 * Deletes a state machine. This is an asynchronous operation. It sets the state machine's
 * status to `DELETING` and begins the deletion process. A state machine is deleted only when all its executions are completed. On the next state transition, the state machine's executions are terminated.
 *
 * A qualified state machine ARN can either refer to a *Distributed Map state* defined within a state machine, a version ARN, or an alias ARN.
 *
 * The following are some examples of qualified and unqualified state machine ARNs:
 *
 * - The following qualified state machine ARN refers to a *Distributed Map state* with a label `mapStateLabel` in a state machine named `myStateMachine`.
 *
 * `arn:partition:states:region:account-id:stateMachine:myStateMachine/mapStateLabel`
 *
 * If you provide a qualified state machine ARN that refers to a *Distributed Map state*, the request fails with `ValidationException`.
 *
 * - The following unqualified state machine ARN refers to a state machine named `myStateMachine`.
 *
 * `arn:partition:states:region:account-id:stateMachine:myStateMachine`
 *
 * This API action also deletes all versions and aliases associated with a state machine.
 *
 * For `EXPRESS` state machines, the deletion happens eventually (usually in
 * less than a minute). Running executions may emit logs after `DeleteStateMachine`
 * API is called.
 */
export const deleteStateMachine: API.OperationMethod<
  DeleteStateMachineInput,
  DeleteStateMachineOutput,
  DeleteStateMachineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteStateMachineInput,
  output: DeleteStateMachineOutput,
  errors: [InvalidArn, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStateMachine",
}));

export type DeleteStateMachineAliasError =
  | ConflictException
  | InvalidArn
  | ResourceNotFound
  | ValidationException
  | CommonErrors;
/**
 * Deletes a state machine alias.
 *
 * After you delete a state machine alias, you can't use it to start executions. When you
 * delete a state machine alias, Step Functions doesn't delete the state machine versions
 * that alias references.
 *
 * **Related operations:**
 *
 * - CreateStateMachineAlias
 *
 * - DescribeStateMachineAlias
 *
 * - ListStateMachineAliases
 *
 * - UpdateStateMachineAlias
 */
export const deleteStateMachineAlias: API.OperationMethod<
  DeleteStateMachineAliasInput,
  DeleteStateMachineAliasOutput,
  DeleteStateMachineAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteStateMachineAliasInput,
  output: DeleteStateMachineAliasOutput,
  errors: [
    ConflictException,
    InvalidArn,
    ResourceNotFound,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStateMachineAlias",
}));

export type DeleteStateMachineVersionError =
  | ConflictException
  | InvalidArn
  | ValidationException
  | CommonErrors;
/**
 * Deletes a state machine version. After
 * you delete a version, you can't call StartExecution using that version's ARN
 * or use the version with a state machine alias.
 *
 * Deleting a state machine version won't terminate its in-progress executions.
 *
 * You can't delete a state machine version currently referenced by one or more aliases. Before you delete a version, you must either delete the aliases or update them to point to another state machine version.
 *
 * **Related operations:**
 *
 * - PublishStateMachineVersion
 *
 * - ListStateMachineVersions
 */
export const deleteStateMachineVersion: API.OperationMethod<
  DeleteStateMachineVersionInput,
  DeleteStateMachineVersionOutput,
  DeleteStateMachineVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteStateMachineVersionInput,
  output: DeleteStateMachineVersionOutput,
  errors: [ConflictException, InvalidArn, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStateMachineVersion",
}));

export type DescribeActivityError =
  | ActivityDoesNotExist
  | InvalidArn
  | CommonErrors;
/**
 * Describes an activity.
 *
 * This operation is eventually consistent. The results are best effort and may not reflect very recent updates and changes.
 */
export const describeActivity: API.OperationMethod<
  DescribeActivityInput,
  DescribeActivityOutput,
  DescribeActivityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeActivityInput,
  output: DescribeActivityOutput,
  errors: [ActivityDoesNotExist, InvalidArn],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeActivity",
}));

export type DescribeExecutionError =
  | ExecutionDoesNotExist
  | InvalidArn
  | KmsAccessDeniedException
  | KmsInvalidStateException
  | KmsThrottlingException
  | CommonErrors;
/**
 * Provides information about a state machine execution, such as the state machine associated with the execution, the execution input and output, and relevant execution metadata. If you've redriven an execution, you can use this API action to return information about the redrives of that execution. In addition, you can use this API action to return the Map Run Amazon Resource Name (ARN) if the execution was dispatched by a Map Run.
 *
 * If you specify a version or alias ARN when you call the StartExecution
 * API action, `DescribeExecution` returns that ARN.
 *
 * This operation is eventually consistent. The results are best effort and may not reflect very recent updates and changes.
 *
 * Executions of an `EXPRESS` state machine aren't supported by `DescribeExecution` unless a Map Run dispatched them.
 */
export const describeExecution: API.OperationMethod<
  DescribeExecutionInput,
  DescribeExecutionOutput,
  DescribeExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeExecutionInput,
  output: DescribeExecutionOutput,
  errors: [
    ExecutionDoesNotExist,
    InvalidArn,
    KmsAccessDeniedException,
    KmsInvalidStateException,
    KmsThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExecution",
}));

export type DescribeMapRunError = InvalidArn | ResourceNotFound | CommonErrors;
/**
 * Provides information about a Map Run's configuration, progress, and results. If you've redriven a Map Run, this API action also returns information about the redrives of that Map Run. For more information, see Examining Map Run in the *Step Functions Developer Guide*.
 */
export const describeMapRun: API.OperationMethod<
  DescribeMapRunInput,
  DescribeMapRunOutput,
  DescribeMapRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeMapRunInput,
  output: DescribeMapRunOutput,
  errors: [InvalidArn, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMapRun",
}));

export type DescribeStateMachineError =
  | InvalidArn
  | KmsAccessDeniedException
  | KmsInvalidStateException
  | KmsThrottlingException
  | StateMachineDoesNotExist
  | CommonErrors;
/**
 * Provides information about a state machine's definition, its IAM role Amazon Resource Name (ARN), and configuration.
 *
 * A qualified state machine ARN can either refer to a *Distributed Map state* defined within a state machine, a version ARN, or an alias ARN.
 *
 * The following are some examples of qualified and unqualified state machine ARNs:
 *
 * - The following qualified state machine ARN refers to a *Distributed Map state* with a label `mapStateLabel` in a state machine named `myStateMachine`.
 *
 * `arn:partition:states:region:account-id:stateMachine:myStateMachine/mapStateLabel`
 *
 * If you provide a qualified state machine ARN that refers to a *Distributed Map state*, the request fails with `ValidationException`.
 *
 * - The following qualified state machine ARN refers to an alias named `PROD`.
 *
 * `arn::states:::stateMachine:`
 *
 * If you provide a qualified state machine ARN that refers to a version ARN or an alias ARN, the request starts execution for that version or alias.
 *
 * - The following unqualified state machine ARN refers to a state machine named `myStateMachine`.
 *
 * `arn::states:::stateMachine:`
 *
 * This API action returns the details for a state machine version if the
 * `stateMachineArn` you specify is a state machine version ARN.
 *
 * This operation is eventually consistent. The results are best effort and may not reflect very recent updates and changes.
 */
export const describeStateMachine: API.OperationMethod<
  DescribeStateMachineInput,
  DescribeStateMachineOutput,
  DescribeStateMachineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeStateMachineInput,
  output: DescribeStateMachineOutput,
  errors: [
    InvalidArn,
    KmsAccessDeniedException,
    KmsInvalidStateException,
    KmsThrottlingException,
    StateMachineDoesNotExist,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStateMachine",
}));

export type DescribeStateMachineAliasError =
  | InvalidArn
  | ResourceNotFound
  | ValidationException
  | CommonErrors;
/**
 * Returns details about a state machine alias.
 *
 * **Related operations:**
 *
 * - CreateStateMachineAlias
 *
 * - ListStateMachineAliases
 *
 * - UpdateStateMachineAlias
 *
 * - DeleteStateMachineAlias
 */
export const describeStateMachineAlias: API.OperationMethod<
  DescribeStateMachineAliasInput,
  DescribeStateMachineAliasOutput,
  DescribeStateMachineAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeStateMachineAliasInput,
  output: DescribeStateMachineAliasOutput,
  errors: [InvalidArn, ResourceNotFound, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStateMachineAlias",
}));

export type DescribeStateMachineForExecutionError =
  | ExecutionDoesNotExist
  | InvalidArn
  | KmsAccessDeniedException
  | KmsInvalidStateException
  | KmsThrottlingException
  | CommonErrors;
/**
 * Provides information about a state machine's definition, its execution role ARN, and
 * configuration. If a Map Run dispatched the execution, this action returns the Map Run
 * Amazon Resource Name (ARN) in the response. The state machine returned is the state machine associated with the
 * Map Run.
 *
 * This operation is eventually consistent. The results are best effort and may not reflect very recent updates and changes.
 *
 * This API action is not supported by `EXPRESS` state machines.
 */
export const describeStateMachineForExecution: API.OperationMethod<
  DescribeStateMachineForExecutionInput,
  DescribeStateMachineForExecutionOutput,
  DescribeStateMachineForExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeStateMachineForExecutionInput,
  output: DescribeStateMachineForExecutionOutput,
  errors: [
    ExecutionDoesNotExist,
    InvalidArn,
    KmsAccessDeniedException,
    KmsInvalidStateException,
    KmsThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStateMachineForExecution",
}));

export type GetActivityTaskError =
  | ActivityDoesNotExist
  | ActivityWorkerLimitExceeded
  | InvalidArn
  | KmsAccessDeniedException
  | KmsInvalidStateException
  | KmsThrottlingException
  | CommonErrors;
/**
 * Used by workers to retrieve a task (with the specified activity ARN) which has been
 * scheduled for execution by a running state machine. This initiates a long poll, where the
 * service holds the HTTP connection open and responds as soon as a task becomes available (i.e.
 * an execution of a task of this type is needed.) The maximum time the service holds on to the
 * request before responding is 60 seconds. If no task is available within 60 seconds, the poll
 * returns a `taskToken` with a null string.
 *
 * This API action isn't logged in CloudTrail.
 *
 * Workers should set their client side socket timeout to at least 65 seconds (5 seconds
 * higher than the maximum time the service may hold the poll request).
 *
 * Polling with `GetActivityTask` can cause latency in some implementations. See
 * Avoid
 * Latency When Polling for Activity Tasks in the Step Functions Developer Guide.
 */
export const getActivityTask: API.OperationMethod<
  GetActivityTaskInput,
  GetActivityTaskOutput,
  GetActivityTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetActivityTaskInput,
  output: GetActivityTaskOutput,
  errors: [
    ActivityDoesNotExist,
    ActivityWorkerLimitExceeded,
    InvalidArn,
    KmsAccessDeniedException,
    KmsInvalidStateException,
    KmsThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetActivityTask",
}));

export type GetExecutionHistoryError =
  | ExecutionDoesNotExist
  | InvalidArn
  | InvalidToken
  | KmsAccessDeniedException
  | KmsInvalidStateException
  | KmsThrottlingException
  | CommonErrors;
/**
 * Returns the history of the specified execution as a list of events. By default, the
 * results are returned in ascending order of the `timeStamp` of the events. Use the
 * `reverseOrder` parameter to get the latest events first.
 *
 * If `nextToken` is returned, there are more results available. The value of `nextToken` is a unique pagination token for each page.
 * Make the call again using the returned token to retrieve the next page. Keep all other arguments unchanged. Each pagination token expires after 24 hours. Using an expired pagination token will return an *HTTP 400 InvalidToken* error.
 *
 * This API action is not supported by `EXPRESS` state machines.
 */
export const getExecutionHistory: API.PaginatedOperationMethod<
  GetExecutionHistoryInput,
  GetExecutionHistoryOutput,
  GetExecutionHistoryError,
  Credentials | HttpClient.HttpClient,
  HistoryEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetExecutionHistoryInput,
  output: GetExecutionHistoryOutput,
  errors: [
    ExecutionDoesNotExist,
    InvalidArn,
    InvalidToken,
    KmsAccessDeniedException,
    KmsInvalidStateException,
    KmsThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExecutionHistory",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "events",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListActivitiesError = InvalidToken | CommonErrors;
/**
 * Lists the existing activities.
 *
 * If `nextToken` is returned, there are more results available. The value of `nextToken` is a unique pagination token for each page.
 * Make the call again using the returned token to retrieve the next page. Keep all other arguments unchanged. Each pagination token expires after 24 hours. Using an expired pagination token will return an *HTTP 400 InvalidToken* error.
 *
 * This operation is eventually consistent. The results are best effort and may not reflect very recent updates and changes.
 */
export const listActivities: API.PaginatedOperationMethod<
  ListActivitiesInput,
  ListActivitiesOutput,
  ListActivitiesError,
  Credentials | HttpClient.HttpClient,
  ActivityListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListActivitiesInput,
  output: ListActivitiesOutput,
  errors: [InvalidToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListActivities",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "activities",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListExecutionsError =
  | InvalidArn
  | InvalidToken
  | ResourceNotFound
  | StateMachineDoesNotExist
  | StateMachineTypeNotSupported
  | ValidationException
  | CommonErrors;
/**
 * Lists all executions of a state machine or a Map Run. You can list all executions related to a state machine by specifying a state machine Amazon Resource Name (ARN), or those related to a Map Run by specifying a Map Run ARN. Using this API action, you can also list all redriven executions.
 *
 * You can also provide a state machine alias ARN or version ARN to list the executions associated with a specific alias or version.
 *
 * Results are
 * sorted by time, with the most recent execution first.
 *
 * If `nextToken` is returned, there are more results available. The value of `nextToken` is a unique pagination token for each page.
 * Make the call again using the returned token to retrieve the next page. Keep all other arguments unchanged. Each pagination token expires after 24 hours. Using an expired pagination token will return an *HTTP 400 InvalidToken* error.
 *
 * This operation is eventually consistent. The results are best effort and may not reflect very recent updates and changes.
 *
 * This API action is not supported by `EXPRESS` state machines.
 */
export const listExecutions: API.PaginatedOperationMethod<
  ListExecutionsInput,
  ListExecutionsOutput,
  ListExecutionsError,
  Credentials | HttpClient.HttpClient,
  ExecutionListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListExecutionsInput,
  output: ListExecutionsOutput,
  errors: [
    InvalidArn,
    InvalidToken,
    ResourceNotFound,
    StateMachineDoesNotExist,
    StateMachineTypeNotSupported,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "executions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMapRunsError =
  | ExecutionDoesNotExist
  | InvalidArn
  | InvalidToken
  | CommonErrors;
/**
 * Lists all Map Runs that were started by a given state machine execution. Use this API action to obtain Map Run ARNs, and then call `DescribeMapRun` to obtain more information, if needed.
 */
export const listMapRuns: API.PaginatedOperationMethod<
  ListMapRunsInput,
  ListMapRunsOutput,
  ListMapRunsError,
  Credentials | HttpClient.HttpClient,
  MapRunListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMapRunsInput,
  output: ListMapRunsOutput,
  errors: [ExecutionDoesNotExist, InvalidArn, InvalidToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMapRuns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "mapRuns",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStateMachineAliasesError =
  | InvalidArn
  | InvalidToken
  | ResourceNotFound
  | StateMachineDeleting
  | StateMachineDoesNotExist
  | CommonErrors;
/**
 * Lists aliases for a specified state machine ARN. Results are sorted by time, with the most recently created aliases listed first.
 *
 * To list aliases that reference a state machine version, you can specify the version ARN in the `stateMachineArn` parameter.
 *
 * If `nextToken` is returned, there are more results available. The value of `nextToken` is a unique pagination token for each page.
 * Make the call again using the returned token to retrieve the next page. Keep all other arguments unchanged. Each pagination token expires after 24 hours. Using an expired pagination token will return an *HTTP 400 InvalidToken* error.
 *
 * **Related operations:**
 *
 * - CreateStateMachineAlias
 *
 * - DescribeStateMachineAlias
 *
 * - UpdateStateMachineAlias
 *
 * - DeleteStateMachineAlias
 */
export const listStateMachineAliases: API.OperationMethod<
  ListStateMachineAliasesInput,
  ListStateMachineAliasesOutput,
  ListStateMachineAliasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListStateMachineAliasesInput,
  output: ListStateMachineAliasesOutput,
  errors: [
    InvalidArn,
    InvalidToken,
    ResourceNotFound,
    StateMachineDeleting,
    StateMachineDoesNotExist,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStateMachineAliases",
}));

export type ListStateMachinesError = InvalidToken | CommonErrors;
/**
 * Lists the existing state machines.
 *
 * If `nextToken` is returned, there are more results available. The value of `nextToken` is a unique pagination token for each page.
 * Make the call again using the returned token to retrieve the next page. Keep all other arguments unchanged. Each pagination token expires after 24 hours. Using an expired pagination token will return an *HTTP 400 InvalidToken* error.
 *
 * This operation is eventually consistent. The results are best effort and may not reflect very recent updates and changes.
 */
export const listStateMachines: API.PaginatedOperationMethod<
  ListStateMachinesInput,
  ListStateMachinesOutput,
  ListStateMachinesError,
  Credentials | HttpClient.HttpClient,
  StateMachineListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStateMachinesInput,
  output: ListStateMachinesOutput,
  errors: [InvalidToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStateMachines",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "stateMachines",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStateMachineVersionsError =
  | InvalidArn
  | InvalidToken
  | ValidationException
  | CommonErrors;
/**
 * Lists versions for the specified state machine Amazon Resource Name (ARN).
 *
 * The results are sorted in descending order of the version creation time.
 *
 * If `nextToken` is returned, there are more results available. The value of `nextToken` is a unique pagination token for each page.
 * Make the call again using the returned token to retrieve the next page. Keep all other arguments unchanged. Each pagination token expires after 24 hours. Using an expired pagination token will return an *HTTP 400 InvalidToken* error.
 *
 * **Related operations:**
 *
 * - PublishStateMachineVersion
 *
 * - DeleteStateMachineVersion
 */
export const listStateMachineVersions: API.OperationMethod<
  ListStateMachineVersionsInput,
  ListStateMachineVersionsOutput,
  ListStateMachineVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListStateMachineVersionsInput,
  output: ListStateMachineVersionsOutput,
  errors: [InvalidArn, InvalidToken, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStateMachineVersions",
}));

export type ListTagsForResourceError =
  | InvalidArn
  | ResourceNotFound
  | CommonErrors;
/**
 * List tags for a given resource.
 *
 * Tags may only contain Unicode letters, digits, white space, or these symbols: `_ . : / = + - @`.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [InvalidArn, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PublishStateMachineVersionError =
  | ConflictException
  | InvalidArn
  | ServiceQuotaExceededException
  | StateMachineDeleting
  | StateMachineDoesNotExist
  | ValidationException
  | CommonErrors;
/**
 * Creates a version from the
 * current revision of a state machine. Use versions to create immutable snapshots of your state
 * machine. You can start executions from versions either directly or with an alias. To create an
 * alias, use CreateStateMachineAlias.
 *
 * You can publish up to 1000 versions for each state machine. You must manually delete unused versions using the DeleteStateMachineVersion API action.
 *
 * `PublishStateMachineVersion` is an idempotent API. It doesn't create a
 * duplicate state machine version if it already exists for the current revision. Step Functions bases `PublishStateMachineVersion`'s idempotency check on the
 * `stateMachineArn`, `name`, and `revisionId` parameters.
 * Requests with the same parameters return a successful idempotent response. If you don't
 * specify a `revisionId`, Step Functions checks for a previously published
 * version of the state machine's current revision.
 *
 * **Related operations:**
 *
 * - DeleteStateMachineVersion
 *
 * - ListStateMachineVersions
 */
export const publishStateMachineVersion: API.OperationMethod<
  PublishStateMachineVersionInput,
  PublishStateMachineVersionOutput,
  PublishStateMachineVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PublishStateMachineVersionInput,
  output: PublishStateMachineVersionOutput,
  errors: [
    ConflictException,
    InvalidArn,
    ServiceQuotaExceededException,
    StateMachineDeleting,
    StateMachineDoesNotExist,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PublishStateMachineVersion",
}));

export type RedriveExecutionError =
  | ExecutionDoesNotExist
  | ExecutionLimitExceeded
  | ExecutionNotRedrivable
  | InvalidArn
  | ValidationException
  | CommonErrors;
/**
 * Restarts unsuccessful executions of Standard workflows that didn't complete successfully in the last 14 days. These include failed, aborted, or timed out executions. When you redrive an execution, it continues the failed execution from the unsuccessful step and uses the same input. Step Functions preserves the results and execution history of the successful steps, and doesn't rerun these steps when you redrive an execution. Redriven executions use the same state machine definition and execution ARN as the original execution attempt.
 *
 * For workflows that include an Inline Map or Parallel state, `RedriveExecution` API action reschedules and redrives only the iterations and branches that failed or aborted.
 *
 * To redrive a workflow that includes a Distributed Map state whose Map Run failed, you must redrive the parent workflow. The parent workflow redrives all the unsuccessful states, including a failed Map Run. If a Map Run was not started in the original execution attempt, the redriven parent workflow starts the Map Run.
 *
 * This API action is not supported by `EXPRESS` state machines.
 *
 * However, you can restart the unsuccessful executions of Express child workflows in a Distributed Map by redriving its Map Run. When you redrive a Map Run, the Express child workflows are rerun using the StartExecution API action. For more information, see Redriving Map Runs.
 *
 * You can redrive executions if your original execution meets the following conditions:
 *
 * - The execution status isn't `SUCCEEDED`.
 *
 * - Your workflow execution has not exceeded the redrivable period of 14 days. Redrivable period refers to the time during which you can redrive a given execution. This period starts from the day a state machine completes its execution.
 *
 * - The workflow execution has not exceeded the maximum open time of one year. For more information about state machine quotas, see Quotas related to state machine executions.
 *
 * - The execution event history count is less than 24,999. Redriven executions append their event history to the existing event history. Make sure your workflow execution contains less than 24,999 events to accommodate the `ExecutionRedriven` history event and at least one other history event.
 */
export const redriveExecution: API.OperationMethod<
  RedriveExecutionInput,
  RedriveExecutionOutput,
  RedriveExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RedriveExecutionInput,
  output: RedriveExecutionOutput,
  errors: [
    ExecutionDoesNotExist,
    ExecutionLimitExceeded,
    ExecutionNotRedrivable,
    InvalidArn,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RedriveExecution",
}));

export type SendTaskFailureError =
  | InvalidToken
  | KmsAccessDeniedException
  | KmsInvalidStateException
  | KmsThrottlingException
  | TaskDoesNotExist
  | TaskTimedOut
  | CommonErrors;
/**
 * Used by activity workers, Task states using the callback
 * pattern, and optionally Task states using the job run pattern to report that the task identified by the `taskToken` failed.
 *
 * For an execution with encryption enabled, Step Functions will encrypt the error and cause fields using the KMS key for the execution role.
 *
 * A caller can mark a task as fail without using any KMS permissions in the execution role if the caller provides a null value for both `error` and `cause` fields because no data needs to be encrypted.
 */
export const sendTaskFailure: API.OperationMethod<
  SendTaskFailureInput,
  SendTaskFailureOutput,
  SendTaskFailureError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendTaskFailureInput,
  output: SendTaskFailureOutput,
  errors: [
    InvalidToken,
    KmsAccessDeniedException,
    KmsInvalidStateException,
    KmsThrottlingException,
    TaskDoesNotExist,
    TaskTimedOut,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendTaskFailure",
}));

export type SendTaskHeartbeatError =
  | InvalidToken
  | TaskDoesNotExist
  | TaskTimedOut
  | CommonErrors;
/**
 * Used by activity workers and Task states using the callback
 * pattern, and optionally Task states using the job run pattern to report to Step Functions that the task represented by the specified
 * `taskToken` is still making progress. This action resets the
 * `Heartbeat` clock. The `Heartbeat` threshold is specified in the state
 * machine's Amazon States Language definition (`HeartbeatSeconds`). This action does not in itself
 * create an event in the execution history. However, if the task times out, the execution
 * history contains an `ActivityTimedOut` entry for activities, or a
 * `TaskTimedOut` entry for tasks using the job run or
 * callback
 * pattern.
 *
 * The `Timeout` of a task, defined in the state machine's Amazon States Language definition, is
 * its maximum allowed duration, regardless of the number of SendTaskHeartbeat requests received. Use `HeartbeatSeconds` to configure the timeout interval
 * for heartbeats.
 */
export const sendTaskHeartbeat: API.OperationMethod<
  SendTaskHeartbeatInput,
  SendTaskHeartbeatOutput,
  SendTaskHeartbeatError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendTaskHeartbeatInput,
  output: SendTaskHeartbeatOutput,
  errors: [InvalidToken, TaskDoesNotExist, TaskTimedOut],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendTaskHeartbeat",
}));

export type SendTaskSuccessError =
  | InvalidOutput
  | InvalidToken
  | KmsAccessDeniedException
  | KmsInvalidStateException
  | KmsThrottlingException
  | TaskDoesNotExist
  | TaskTimedOut
  | CommonErrors;
/**
 * Used by activity workers, Task states using the callback
 * pattern, and optionally Task states using the job run pattern to report that the task identified by the `taskToken` completed
 * successfully.
 */
export const sendTaskSuccess: API.OperationMethod<
  SendTaskSuccessInput,
  SendTaskSuccessOutput,
  SendTaskSuccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendTaskSuccessInput,
  output: SendTaskSuccessOutput,
  errors: [
    InvalidOutput,
    InvalidToken,
    KmsAccessDeniedException,
    KmsInvalidStateException,
    KmsThrottlingException,
    TaskDoesNotExist,
    TaskTimedOut,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendTaskSuccess",
}));

export type StartExecutionError =
  | ExecutionAlreadyExists
  | ExecutionLimitExceeded
  | InvalidArn
  | InvalidExecutionInput
  | InvalidName
  | KmsAccessDeniedException
  | KmsInvalidStateException
  | KmsThrottlingException
  | StateMachineDeleting
  | StateMachineDoesNotExist
  | ValidationException
  | CommonErrors;
/**
 * Starts a state machine execution.
 *
 * A qualified state machine ARN can either refer to a *Distributed Map state* defined within a state machine, a version ARN, or an alias ARN.
 *
 * The following are some examples of qualified and unqualified state machine ARNs:
 *
 * - The following qualified state machine ARN refers to a *Distributed Map state* with a label `mapStateLabel` in a state machine named `myStateMachine`.
 *
 * `arn:partition:states:region:account-id:stateMachine:myStateMachine/mapStateLabel`
 *
 * If you provide a qualified state machine ARN that refers to a *Distributed Map state*, the request fails with `ValidationException`.
 *
 * - The following qualified state machine ARN refers to an alias named `PROD`.
 *
 * `arn::states:::stateMachine:`
 *
 * If you provide a qualified state machine ARN that refers to a version ARN or an alias ARN, the request starts execution for that version or alias.
 *
 * - The following unqualified state machine ARN refers to a state machine named `myStateMachine`.
 *
 * `arn::states:::stateMachine:`
 *
 * If you start an execution with an unqualified state machine ARN, Step Functions uses the latest revision of the state machine for the execution.
 *
 * To start executions of a state machine version, call
 * `StartExecution` and provide the version ARN or the ARN of an alias that points to the version.
 *
 * `StartExecution` is idempotent for `STANDARD` workflows. For a
 * `STANDARD` workflow, if you call `StartExecution` with the same name
 * and input as a running execution, the call succeeds and return the same response as the
 * original request. If the execution is closed or if the input is different, it returns a
 * `400 ExecutionAlreadyExists` error. You can reuse names after 90 days.
 *
 * `StartExecution` isn't idempotent for `EXPRESS` workflows.
 */
export const startExecution: API.OperationMethod<
  StartExecutionInput,
  StartExecutionOutput,
  StartExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartExecutionInput,
  output: StartExecutionOutput,
  errors: [
    ExecutionAlreadyExists,
    ExecutionLimitExceeded,
    InvalidArn,
    InvalidExecutionInput,
    InvalidName,
    KmsAccessDeniedException,
    KmsInvalidStateException,
    KmsThrottlingException,
    StateMachineDeleting,
    StateMachineDoesNotExist,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartExecution",
}));

export type StartSyncExecutionError =
  | InvalidArn
  | InvalidExecutionInput
  | InvalidName
  | KmsAccessDeniedException
  | KmsInvalidStateException
  | KmsThrottlingException
  | StateMachineDeleting
  | StateMachineDoesNotExist
  | StateMachineTypeNotSupported
  | CommonErrors;
/**
 * Starts a Synchronous Express state machine execution. `StartSyncExecution`
 * is not available for `STANDARD` workflows.
 *
 * `StartSyncExecution` will return a `200 OK` response, even if your
 * execution fails, because the status code in the API response doesn't reflect function
 * errors. Error codes are reserved for errors that prevent your execution from running, such
 * as permissions errors, limit errors, or issues with your state machine code and
 * configuration.
 *
 * This API action isn't logged in CloudTrail.
 */
export const startSyncExecution: API.OperationMethod<
  StartSyncExecutionInput,
  StartSyncExecutionOutput,
  StartSyncExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartSyncExecutionInput,
  output: StartSyncExecutionOutput,
  errors: [
    InvalidArn,
    InvalidExecutionInput,
    InvalidName,
    KmsAccessDeniedException,
    KmsInvalidStateException,
    KmsThrottlingException,
    StateMachineDeleting,
    StateMachineDoesNotExist,
    StateMachineTypeNotSupported,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSyncExecution",
  endpointHostPrefix: "sync-",
}));

export type StopExecutionError =
  | ExecutionDoesNotExist
  | InvalidArn
  | KmsAccessDeniedException
  | KmsInvalidStateException
  | KmsThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops an execution.
 *
 * This API action is not supported by `EXPRESS` state machines.
 *
 * For an execution with encryption enabled, Step Functions will encrypt the error and cause fields using the KMS key for the execution role.
 *
 * A caller can stop an execution without using any KMS permissions in the execution role if the caller provides a null value for both `error` and `cause` fields because no data needs to be encrypted.
 */
export const stopExecution: API.OperationMethod<
  StopExecutionInput,
  StopExecutionOutput,
  StopExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopExecutionInput,
  output: StopExecutionOutput,
  errors: [
    ExecutionDoesNotExist,
    InvalidArn,
    KmsAccessDeniedException,
    KmsInvalidStateException,
    KmsThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopExecution",
}));

export type TagResourceError =
  | InvalidArn
  | ResourceNotFound
  | TooManyTags
  | CommonErrors;
/**
 * Add a tag to a Step Functions resource.
 *
 * An array of key-value pairs. For more information, see Using
 * Cost Allocation Tags in the Amazon Web Services Billing and Cost Management User
 * Guide, and Controlling Access Using IAM
 * Tags.
 *
 * Tags may only contain Unicode letters, digits, white space, or these symbols: `_ . : / = + - @`.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceOutput,
  errors: [InvalidArn, ResourceNotFound, TooManyTags],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TestStateError =
  | InvalidArn
  | InvalidDefinition
  | InvalidExecutionInput
  | ValidationException
  | CommonErrors;
/**
 * Accepts the definition of a single state and executes it. You can test a state without creating a state machine or updating an existing state machine. Using this API, you can test the following:
 *
 * - A state's input and output processing data flow
 *
 * - An Amazon Web Services service integration request and response
 *
 * - An HTTP Task request and response
 *
 * You can call this API on only one state at a time. The states that you can test include the following:
 *
 * - All Task types except Activity
 *
 * - Pass
 *
 * - Wait
 *
 * - Choice
 *
 * - Succeed
 *
 * - Fail
 *
 * The `TestState` API assumes an IAM role which must contain the required IAM permissions for the resources your state is accessing. For information about the permissions a state might need, see IAM permissions to test a state.
 *
 * The `TestState` API can run for up to five minutes. If the execution of a state exceeds this duration, it fails with the `States.Timeout` error.
 *
 * `TestState` only supports the following when a mock is specified: Activity tasks, `.sync` or `.waitForTaskToken`
 * service integration patterns, Parallel, or Map states.
 */
export const testState: API.OperationMethod<
  TestStateInput,
  TestStateOutput,
  TestStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TestStateInput,
  output: TestStateOutput,
  errors: [
    InvalidArn,
    InvalidDefinition,
    InvalidExecutionInput,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestState",
  endpointHostPrefix: "sync-",
}));

export type UntagResourceError = InvalidArn | ResourceNotFound | CommonErrors;
/**
 * Remove a tag from a Step Functions resource
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceOutput,
  errors: [InvalidArn, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateMapRunError =
  | InvalidArn
  | ResourceNotFound
  | ValidationException
  | CommonErrors;
/**
 * Updates an in-progress Map Run's configuration to include changes to the settings that control maximum concurrency and Map Run failure.
 */
export const updateMapRun: API.OperationMethod<
  UpdateMapRunInput,
  UpdateMapRunOutput,
  UpdateMapRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMapRunInput,
  output: UpdateMapRunOutput,
  errors: [InvalidArn, ResourceNotFound, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMapRun",
}));

export type UpdateStateMachineError =
  | ConflictException
  | InvalidArn
  | InvalidDefinition
  | InvalidEncryptionConfiguration
  | InvalidLoggingConfiguration
  | InvalidTracingConfiguration
  | KmsAccessDeniedException
  | KmsThrottlingException
  | MissingRequiredParameter
  | ServiceQuotaExceededException
  | StateMachineDeleting
  | StateMachineDoesNotExist
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing state machine by modifying its `definition`,
 * `roleArn`, `loggingConfiguration`, or `EncryptionConfiguration`. Running executions will continue
 * to use the previous `definition` and `roleArn`. You must include at
 * least one of `definition` or `roleArn` or you will receive a
 * `MissingRequiredParameter` error.
 *
 * A qualified state machine ARN refers to a *Distributed Map state* defined within a state machine. For example, the qualified state machine ARN `arn:partition:states:region:account-id:stateMachine:stateMachineName/mapStateLabel` refers to a *Distributed Map state* with a label `mapStateLabel` in the state machine named `stateMachineName`.
 *
 * A qualified state machine ARN can either refer to a *Distributed Map state* defined within a state machine, a version ARN, or an alias ARN.
 *
 * The following are some examples of qualified and unqualified state machine ARNs:
 *
 * - The following qualified state machine ARN refers to a *Distributed Map state* with a label `mapStateLabel` in a state machine named `myStateMachine`.
 *
 * `arn:partition:states:region:account-id:stateMachine:myStateMachine/mapStateLabel`
 *
 * If you provide a qualified state machine ARN that refers to a *Distributed Map state*, the request fails with `ValidationException`.
 *
 * - The following qualified state machine ARN refers to an alias named `PROD`.
 *
 * `arn::states:::stateMachine:`
 *
 * If you provide a qualified state machine ARN that refers to a version ARN or an alias ARN, the request starts execution for that version or alias.
 *
 * - The following unqualified state machine ARN refers to a state machine named `myStateMachine`.
 *
 * `arn::states:::stateMachine:`
 *
 * After you update your state machine, you can set the `publish` parameter to
 * `true` in the same action to publish a new version. This
 * way, you can opt-in to strict versioning of your state machine.
 *
 * Step Functions assigns monotonically increasing integers for state machine versions, starting at version number 1.
 *
 * All `StartExecution` calls within a few seconds use the updated
 * `definition` and `roleArn`. Executions started immediately after you
 * call `UpdateStateMachine` may use the previous state machine
 * `definition` and `roleArn`.
 */
export const updateStateMachine: API.OperationMethod<
  UpdateStateMachineInput,
  UpdateStateMachineOutput,
  UpdateStateMachineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateStateMachineInput,
  output: UpdateStateMachineOutput,
  errors: [
    ConflictException,
    InvalidArn,
    InvalidDefinition,
    InvalidEncryptionConfiguration,
    InvalidLoggingConfiguration,
    InvalidTracingConfiguration,
    KmsAccessDeniedException,
    KmsThrottlingException,
    MissingRequiredParameter,
    ServiceQuotaExceededException,
    StateMachineDeleting,
    StateMachineDoesNotExist,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStateMachine",
}));

export type UpdateStateMachineAliasError =
  | ConflictException
  | InvalidArn
  | ResourceNotFound
  | StateMachineDeleting
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an existing state machine alias by modifying its `description` or `routingConfiguration`.
 *
 * You must specify at least one of the `description` or `routingConfiguration` parameters to update a state machine alias.
 *
 * `UpdateStateMachineAlias` is an idempotent API. Step Functions bases the
 * idempotency check on the `stateMachineAliasArn`, `description`, and
 * `routingConfiguration` parameters. Requests with the same parameters return an
 * idempotent response.
 *
 * This operation is eventually consistent. All StartExecution requests
 * made within a few seconds use the latest alias configuration. Executions started immediately
 * after calling `UpdateStateMachineAlias` may use the previous routing
 * configuration.
 *
 * **Related operations:**
 *
 * - CreateStateMachineAlias
 *
 * - DescribeStateMachineAlias
 *
 * - ListStateMachineAliases
 *
 * - DeleteStateMachineAlias
 */
export const updateStateMachineAlias: API.OperationMethod<
  UpdateStateMachineAliasInput,
  UpdateStateMachineAliasOutput,
  UpdateStateMachineAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateStateMachineAliasInput,
  output: UpdateStateMachineAliasOutput,
  errors: [
    ConflictException,
    InvalidArn,
    ResourceNotFound,
    StateMachineDeleting,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStateMachineAlias",
}));

export type ValidateStateMachineDefinitionError =
  | ValidationException
  | CommonErrors;
/**
 * Validates the syntax of a state machine definition specified in Amazon States Language (ASL), a
 * JSON-based, structured language.
 *
 * You can validate that a state machine definition is correct without creating a state
 * machine resource.
 *
 * Suggested uses for `ValidateStateMachineDefinition`:
 *
 * - Integrate automated checks into your code review or Continuous Integration
 * (CI) process to check state machine definitions before starting
 * deployments.
 *
 * - Run validation from a Git pre-commit hook to verify the definition before
 * committing to your source repository.
 *
 * Validation will look for problems in your state machine definition and return a
 * **result** and a list of diagnostic
 * elements.
 *
 * The **result** value will be `OK` when your
 * workflow definition can be successfully created or updated. Note the result can be
 * `OK` even when diagnostic warnings are present in the response. The
 * **result** value will be `FAIL` when the
 * workflow definition contains errors that would prevent you from creating or updating
 * your state machine.
 *
 * The list of ValidateStateMachineDefinitionDiagnostic data elements can contain zero or more **WARNING** and/or **ERROR** elements.
 *
 * The **ValidateStateMachineDefinition API** might add
 * new diagnostics in the future, adjust diagnostic codes, or change the message
 * wording. Your automated processes should only rely on the value of the **result** field value (OK, FAIL). Do **not** rely on the exact order, count, or
 * wording of diagnostic messages.
 */
export const validateStateMachineDefinition: API.OperationMethod<
  ValidateStateMachineDefinitionInput,
  ValidateStateMachineDefinitionOutput,
  ValidateStateMachineDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ValidateStateMachineDefinitionInput,
  output: ValidateStateMachineDefinitionOutput,
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateStateMachineDefinition",
}));
