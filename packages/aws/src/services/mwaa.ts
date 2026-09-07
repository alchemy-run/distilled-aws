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
const svc = T.AwsApiService({ sdkId: "MWAA", serviceShapeName: "AmazonMWAA" });
const auth = T.AwsAuthSigv4({ name: "airflow" });
const ver = T.ServiceVersion("2020-07-01");
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
              `https://airflow-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://airflow-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://airflow.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://airflow.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class RestApiClientException
  extends /*@__PURE__*/ S.TaggedError<RestApiClientException>()(
    "RestApiClientException",
    {
      RestApiStatusCode: S.optional(S.Number),
      RestApiResponse: S.optional(S.Any),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class RestApiServerException
  extends /*@__PURE__*/ S.TaggedError<RestApiServerException>()(
    "RestApiServerException",
    {
      RestApiStatusCode: S.optional(S.Number),
      RestApiResponse: S.optional(S.Any),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type EnvironmentName = string;
export interface CreateCliTokenRequest {
  Name: string;
}
export const CreateCliTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/clitoken/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCliTokenRequest",
}) as any as S.Schema<CreateCliTokenRequest>;
export type Token = string | redacted.Redacted<string>;
export type Hostname = string;
export interface CreateCliTokenResponse {
  CliToken?: string | redacted.Redacted<string>;
  WebServerHostname?: string;
}
export const CreateCliTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CliToken: S.optional(SensitiveString),
    WebServerHostname: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateCliTokenResponse",
}) as any as S.Schema<CreateCliTokenResponse>;
export type IamRoleArn = string;
export type S3BucketArn = string;
export type RelativePath = string;
export type SubnetId = string;
export type SubnetList = string[];
export const SubnetList = /*@__PURE__*/ S.Array(S.String);
export type SecurityGroupId = string;
export type SecurityGroupList = string[];
export const SecurityGroupList = /*@__PURE__*/ S.Array(S.String);
export interface NetworkConfiguration {
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
}
export const NetworkConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubnetIds: S.optional(SubnetList),
    SecurityGroupIds: S.optional(SecurityGroupList),
  }),
).annotate({
  identifier: "NetworkConfiguration",
}) as any as S.Schema<NetworkConfiguration>;
export type S3ObjectVersion = string;
export type ConfigKey = string;
export type ConfigValue = string | redacted.Redacted<string>;
export type AirflowConfigurationOptions = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export const AirflowConfigurationOptions = /*@__PURE__*/ S.Record(
  S.String,
  SensitiveString.pipe(S.optional),
);
export type EnvironmentClass = string;
export type MaxWorkers = number;
export type KmsKey = string;
export type AirflowVersion = string;
export type LoggingEnabled = boolean;
export type LoggingLevel = string;
export interface ModuleLoggingConfigurationInput {
  Enabled: boolean;
  LogLevel: string;
}
export const ModuleLoggingConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Enabled: S.Boolean, LogLevel: S.String }),
).annotate({
  identifier: "ModuleLoggingConfigurationInput",
}) as any as S.Schema<ModuleLoggingConfigurationInput>;
export interface LoggingConfigurationInput {
  DagProcessingLogs?: ModuleLoggingConfigurationInput;
  SchedulerLogs?: ModuleLoggingConfigurationInput;
  WebserverLogs?: ModuleLoggingConfigurationInput;
  WorkerLogs?: ModuleLoggingConfigurationInput;
  TaskLogs?: ModuleLoggingConfigurationInput;
}
export const LoggingConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DagProcessingLogs: S.optional(ModuleLoggingConfigurationInput),
    SchedulerLogs: S.optional(ModuleLoggingConfigurationInput),
    WebserverLogs: S.optional(ModuleLoggingConfigurationInput),
    WorkerLogs: S.optional(ModuleLoggingConfigurationInput),
    TaskLogs: S.optional(ModuleLoggingConfigurationInput),
  }),
).annotate({
  identifier: "LoggingConfigurationInput",
}) as any as S.Schema<LoggingConfigurationInput>;
export type WeeklyMaintenanceWindowStart = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type WebserverAccessMode = string;
export type MinWorkers = number;
export type Schedulers = number;
export type EndpointManagement = string;
export type MinWebservers = number;
export type MaxWebservers = number;
export interface CreateEnvironmentInput {
  Name: string;
  ExecutionRoleArn: string;
  SourceBucketArn: string;
  DagS3Path: string;
  NetworkConfiguration: NetworkConfiguration;
  PluginsS3Path?: string;
  PluginsS3ObjectVersion?: string;
  RequirementsS3Path?: string;
  RequirementsS3ObjectVersion?: string;
  StartupScriptS3Path?: string;
  StartupScriptS3ObjectVersion?: string;
  AirflowConfigurationOptions?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  EnvironmentClass?: string;
  MaxWorkers?: number;
  KmsKey?: string;
  AirflowVersion?: string;
  LoggingConfiguration?: LoggingConfigurationInput;
  WeeklyMaintenanceWindowStart?: string;
  Tags?: { [key: string]: string | undefined };
  WebserverAccessMode?: string;
  MinWorkers?: number;
  Schedulers?: number;
  EndpointManagement?: string;
  MinWebservers?: number;
  MaxWebservers?: number;
}
export const CreateEnvironmentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    ExecutionRoleArn: S.String,
    SourceBucketArn: S.String,
    DagS3Path: S.String,
    NetworkConfiguration: NetworkConfiguration,
    PluginsS3Path: S.optional(S.String),
    PluginsS3ObjectVersion: S.optional(S.String),
    RequirementsS3Path: S.optional(S.String),
    RequirementsS3ObjectVersion: S.optional(S.String),
    StartupScriptS3Path: S.optional(S.String),
    StartupScriptS3ObjectVersion: S.optional(S.String),
    AirflowConfigurationOptions: S.optional(AirflowConfigurationOptions),
    EnvironmentClass: S.optional(S.String),
    MaxWorkers: S.optional(S.Number),
    KmsKey: S.optional(S.String),
    AirflowVersion: S.optional(S.String),
    LoggingConfiguration: S.optional(LoggingConfigurationInput),
    WeeklyMaintenanceWindowStart: S.optional(S.String),
    Tags: S.optional(TagMap),
    WebserverAccessMode: S.optional(S.String),
    MinWorkers: S.optional(S.Number),
    Schedulers: S.optional(S.Number),
    EndpointManagement: S.optional(S.String),
    MinWebservers: S.optional(S.Number),
    MaxWebservers: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/environments/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEnvironmentInput",
}) as any as S.Schema<CreateEnvironmentInput>;
export type EnvironmentArn = string;
export interface CreateEnvironmentOutput {
  Arn?: string;
}
export const CreateEnvironmentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "CreateEnvironmentOutput",
}) as any as S.Schema<CreateEnvironmentOutput>;
export interface CreateWebLoginTokenRequest {
  Name: string;
}
export const CreateWebLoginTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/webtoken/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateWebLoginTokenRequest",
}) as any as S.Schema<CreateWebLoginTokenRequest>;
export type IamIdentity = string;
export type AirflowIdentity = string;
export interface CreateWebLoginTokenResponse {
  WebToken?: string | redacted.Redacted<string>;
  WebServerHostname?: string;
  IamIdentity?: string;
  AirflowIdentity?: string;
}
export const CreateWebLoginTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WebToken: S.optional(SensitiveString),
    WebServerHostname: S.optional(S.String),
    IamIdentity: S.optional(S.String),
    AirflowIdentity: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateWebLoginTokenResponse",
}) as any as S.Schema<CreateWebLoginTokenResponse>;
export interface DeleteEnvironmentInput {
  Name: string;
}
export const DeleteEnvironmentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/environments/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEnvironmentInput",
}) as any as S.Schema<DeleteEnvironmentInput>;
export interface DeleteEnvironmentOutput {}
export const DeleteEnvironmentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteEnvironmentOutput",
}) as any as S.Schema<DeleteEnvironmentOutput>;
export interface GetEnvironmentInput {
  Name: string;
}
export const GetEnvironmentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/environments/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEnvironmentInput",
}) as any as S.Schema<GetEnvironmentInput>;
export type EnvironmentStatus = string;
export type CreatedAt = Date;
export type WebserverUrl = string;
export type CloudWatchLogGroupArn = string;
export interface ModuleLoggingConfiguration {
  Enabled?: boolean;
  LogLevel?: string;
  CloudWatchLogGroupArn?: string;
}
export const ModuleLoggingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    LogLevel: S.optional(S.String),
    CloudWatchLogGroupArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ModuleLoggingConfiguration",
}) as any as S.Schema<ModuleLoggingConfiguration>;
export interface LoggingConfiguration {
  DagProcessingLogs?: ModuleLoggingConfiguration;
  SchedulerLogs?: ModuleLoggingConfiguration;
  WebserverLogs?: ModuleLoggingConfiguration;
  WorkerLogs?: ModuleLoggingConfiguration;
  TaskLogs?: ModuleLoggingConfiguration;
}
export const LoggingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DagProcessingLogs: S.optional(ModuleLoggingConfiguration),
    SchedulerLogs: S.optional(ModuleLoggingConfiguration),
    WebserverLogs: S.optional(ModuleLoggingConfiguration),
    WorkerLogs: S.optional(ModuleLoggingConfiguration),
    TaskLogs: S.optional(ModuleLoggingConfiguration),
  }),
).annotate({
  identifier: "LoggingConfiguration",
}) as any as S.Schema<LoggingConfiguration>;
export type UpdateStatus = string;
export type UpdateCreatedAt = Date;
export type ErrorCode = string;
export type ErrorMessage = string;
export interface UpdateError {
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const UpdateError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "UpdateError" }) as any as S.Schema<UpdateError>;
export type UpdateSource = string;
export type WorkerReplacementStrategy = string;
export interface LastUpdate {
  Status?: string;
  CreatedAt?: Date;
  Error?: UpdateError;
  Source?: string;
  WorkerReplacementStrategy?: string;
}
export const LastUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Error: S.optional(UpdateError),
    Source: S.optional(S.String),
    WorkerReplacementStrategy: S.optional(S.String),
  }),
).annotate({ identifier: "LastUpdate" }) as any as S.Schema<LastUpdate>;
export type VpcEndpointServiceName = string;
export type CeleryExecutorQueue = string;
export interface Environment {
  Name?: string;
  Status?: string;
  Arn?: string;
  CreatedAt?: Date;
  WebserverUrl?: string;
  ExecutionRoleArn?: string;
  ServiceRoleArn?: string;
  KmsKey?: string;
  AirflowVersion?: string;
  SourceBucketArn?: string;
  DagS3Path?: string;
  PluginsS3Path?: string;
  PluginsS3ObjectVersion?: string;
  RequirementsS3Path?: string;
  RequirementsS3ObjectVersion?: string;
  StartupScriptS3Path?: string;
  StartupScriptS3ObjectVersion?: string;
  AirflowConfigurationOptions?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  EnvironmentClass?: string;
  MaxWorkers?: number;
  NetworkConfiguration?: NetworkConfiguration;
  LoggingConfiguration?: LoggingConfiguration;
  LastUpdate?: LastUpdate;
  WeeklyMaintenanceWindowStart?: string;
  Tags?: { [key: string]: string | undefined };
  WebserverAccessMode?: string;
  MinWorkers?: number;
  Schedulers?: number;
  WebserverVpcEndpointService?: string;
  DatabaseVpcEndpointService?: string;
  CeleryExecutorQueue?: string;
  EndpointManagement?: string;
  MinWebservers?: number;
  MaxWebservers?: number;
}
export const Environment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Status: S.optional(S.String),
    Arn: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    WebserverUrl: S.optional(S.String),
    ExecutionRoleArn: S.optional(S.String),
    ServiceRoleArn: S.optional(S.String),
    KmsKey: S.optional(S.String),
    AirflowVersion: S.optional(S.String),
    SourceBucketArn: S.optional(S.String),
    DagS3Path: S.optional(S.String),
    PluginsS3Path: S.optional(S.String),
    PluginsS3ObjectVersion: S.optional(S.String),
    RequirementsS3Path: S.optional(S.String),
    RequirementsS3ObjectVersion: S.optional(S.String),
    StartupScriptS3Path: S.optional(S.String),
    StartupScriptS3ObjectVersion: S.optional(S.String),
    AirflowConfigurationOptions: S.optional(AirflowConfigurationOptions),
    EnvironmentClass: S.optional(S.String),
    MaxWorkers: S.optional(S.Number),
    NetworkConfiguration: S.optional(NetworkConfiguration),
    LoggingConfiguration: S.optional(LoggingConfiguration),
    LastUpdate: S.optional(LastUpdate),
    WeeklyMaintenanceWindowStart: S.optional(S.String),
    Tags: S.optional(TagMap),
    WebserverAccessMode: S.optional(S.String),
    MinWorkers: S.optional(S.Number),
    Schedulers: S.optional(S.Number),
    WebserverVpcEndpointService: S.optional(S.String),
    DatabaseVpcEndpointService: S.optional(S.String),
    CeleryExecutorQueue: S.optional(S.String),
    EndpointManagement: S.optional(S.String),
    MinWebservers: S.optional(S.Number),
    MaxWebservers: S.optional(S.Number),
  }),
).annotate({ identifier: "Environment" }) as any as S.Schema<Environment>;
export interface GetEnvironmentOutput {
  Environment?: Environment;
}
export const GetEnvironmentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Environment: S.optional(Environment) }),
).annotate({
  identifier: "GetEnvironmentOutput",
}) as any as S.Schema<GetEnvironmentOutput>;
export type RestApiPath = string;
export type RestApiMethod = string;
export type RestApiRequestBody = unknown;
export interface InvokeRestApiRequest {
  Name: string;
  Path: string;
  Method: string;
  QueryParameters?: any;
  Body?: any;
}
export const InvokeRestApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    Path: S.String,
    Method: S.String,
    QueryParameters: S.optional(S.Any),
    Body: S.optional(S.Any),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/restapi/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "InvokeRestApiRequest",
}) as any as S.Schema<InvokeRestApiRequest>;
export type RestApiResponse = unknown;
export interface InvokeRestApiResponse {
  RestApiStatusCode?: number;
  RestApiResponse?: any;
}
export const InvokeRestApiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RestApiStatusCode: S.optional(S.Number),
    RestApiResponse: S.optional(S.Any),
  }),
).annotate({
  identifier: "InvokeRestApiResponse",
}) as any as S.Schema<InvokeRestApiResponse>;
export type NextToken = string;
export interface ListEnvironmentsInput {
  NextToken?: string;
  MaxResults?: number;
}
export const ListEnvironmentsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/environments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEnvironmentsInput",
}) as any as S.Schema<ListEnvironmentsInput>;
export type EnvironmentList = string[];
export const EnvironmentList = /*@__PURE__*/ S.Array(S.String);
export interface ListEnvironmentsOutput {
  Environments: string[];
  NextToken?: string;
}
export const ListEnvironmentsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Environments: EnvironmentList, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListEnvironmentsOutput",
}) as any as S.Schema<ListEnvironmentsOutput>;
export interface ListTagsForResourceInput {
  ResourceArn: string;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export interface Dimension {
  Name: string;
  Value: string;
}
export const Dimension = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Value: S.String }),
).annotate({ identifier: "Dimension" }) as any as S.Schema<Dimension>;
export type Dimensions = Dimension[];
export const Dimensions = /*@__PURE__*/ S.Array(Dimension);
export type Unit = string;
export interface StatisticSet {
  SampleCount?: number;
  Sum?: number;
  Minimum?: number;
  Maximum?: number;
}
export const StatisticSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SampleCount: S.optional(S.Number),
    Sum: S.optional(S.Number),
    Minimum: S.optional(S.Number),
    Maximum: S.optional(S.Number),
  }),
).annotate({ identifier: "StatisticSet" }) as any as S.Schema<StatisticSet>;
export interface MetricDatum {
  MetricName: string;
  Timestamp: Date;
  Dimensions?: Dimension[];
  Value?: number;
  Unit?: string;
  StatisticValues?: StatisticSet;
}
export const MetricDatum = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetricName: S.String,
    Timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Dimensions: S.optional(Dimensions),
    Value: S.optional(S.Number),
    Unit: S.optional(S.String),
    StatisticValues: S.optional(StatisticSet),
  }),
).annotate({ identifier: "MetricDatum" }) as any as S.Schema<MetricDatum>;
export type MetricData = MetricDatum[];
export const MetricData = /*@__PURE__*/ S.Array(MetricDatum);
export interface PublishMetricsInput {
  EnvironmentName: string;
  MetricData: MetricDatum[];
}
export const PublishMetricsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnvironmentName: S.String.pipe(T.HttpLabel("EnvironmentName")),
    MetricData: MetricData,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/metrics/environments/{EnvironmentName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PublishMetricsInput",
}) as any as S.Schema<PublishMetricsInput>;
export interface PublishMetricsOutput {}
export const PublishMetricsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PublishMetricsOutput",
}) as any as S.Schema<PublishMetricsOutput>;
export interface TagResourceInput {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceOutput {}
export const TagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagResourceOutput",
}) as any as S.Schema<TagResourceOutput>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  ResourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
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
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceOutput {}
export const UntagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export interface UpdateNetworkConfigurationInput {
  SecurityGroupIds: string[];
}
export const UpdateNetworkConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SecurityGroupIds: SecurityGroupList }),
).annotate({
  identifier: "UpdateNetworkConfigurationInput",
}) as any as S.Schema<UpdateNetworkConfigurationInput>;
export interface UpdateEnvironmentInput {
  Name: string;
  ExecutionRoleArn?: string;
  AirflowConfigurationOptions?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  AirflowVersion?: string;
  DagS3Path?: string;
  EnvironmentClass?: string;
  LoggingConfiguration?: LoggingConfigurationInput;
  MaxWorkers?: number;
  MinWorkers?: number;
  MaxWebservers?: number;
  MinWebservers?: number;
  WorkerReplacementStrategy?: string;
  NetworkConfiguration?: UpdateNetworkConfigurationInput;
  PluginsS3Path?: string;
  PluginsS3ObjectVersion?: string;
  RequirementsS3Path?: string;
  RequirementsS3ObjectVersion?: string;
  Schedulers?: number;
  SourceBucketArn?: string;
  StartupScriptS3Path?: string;
  StartupScriptS3ObjectVersion?: string;
  WebserverAccessMode?: string;
  WeeklyMaintenanceWindowStart?: string;
}
export const UpdateEnvironmentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    ExecutionRoleArn: S.optional(S.String),
    AirflowConfigurationOptions: S.optional(AirflowConfigurationOptions),
    AirflowVersion: S.optional(S.String),
    DagS3Path: S.optional(S.String),
    EnvironmentClass: S.optional(S.String),
    LoggingConfiguration: S.optional(LoggingConfigurationInput),
    MaxWorkers: S.optional(S.Number),
    MinWorkers: S.optional(S.Number),
    MaxWebservers: S.optional(S.Number),
    MinWebservers: S.optional(S.Number),
    WorkerReplacementStrategy: S.optional(S.String),
    NetworkConfiguration: S.optional(UpdateNetworkConfigurationInput),
    PluginsS3Path: S.optional(S.String),
    PluginsS3ObjectVersion: S.optional(S.String),
    RequirementsS3Path: S.optional(S.String),
    RequirementsS3ObjectVersion: S.optional(S.String),
    Schedulers: S.optional(S.Number),
    SourceBucketArn: S.optional(S.String),
    StartupScriptS3Path: S.optional(S.String),
    StartupScriptS3ObjectVersion: S.optional(S.String),
    WebserverAccessMode: S.optional(S.String),
    WeeklyMaintenanceWindowStart: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/environments/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEnvironmentInput",
}) as any as S.Schema<UpdateEnvironmentInput>;
export interface UpdateEnvironmentOutput {
  Arn?: string;
}
export const UpdateEnvironmentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "UpdateEnvironmentOutput",
}) as any as S.Schema<UpdateEnvironmentOutput>;
export type CreateCliTokenError = ResourceNotFoundException | CommonErrors;
/**
 * Creates a CLI token for the Airflow CLI. To learn more, see Creating an Apache Airflow CLI token.
 */
export const createCliToken: API.OperationMethod<
  CreateCliTokenRequest,
  CreateCliTokenResponse,
  CreateCliTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCliTokenRequest,
  output: CreateCliTokenResponse,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCliToken",
  endpointHostPrefix: "env.",
}));

export type CreateEnvironmentError =
  | InternalServerException
  | ServiceUnavailableException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Managed Workflows for Apache Airflow (Amazon MWAA) environment.
 */
export const createEnvironment: API.OperationMethod<
  CreateEnvironmentInput,
  CreateEnvironmentOutput,
  CreateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEnvironmentInput,
  output: CreateEnvironmentOutput,
  errors: [
    InternalServerException,
    ServiceUnavailableException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironment",
  endpointHostPrefix: "api.",
}));

export type CreateWebLoginTokenError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a web login token for the Airflow Web UI. To learn more, see Creating an Apache Airflow web login token.
 */
export const createWebLoginToken: API.OperationMethod<
  CreateWebLoginTokenRequest,
  CreateWebLoginTokenResponse,
  CreateWebLoginTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWebLoginTokenRequest,
  output: CreateWebLoginTokenResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWebLoginToken",
  endpointHostPrefix: "env.",
}));

export type DeleteEnvironmentError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Managed Workflows for Apache Airflow (Amazon MWAA) environment.
 */
export const deleteEnvironment: API.OperationMethod<
  DeleteEnvironmentInput,
  DeleteEnvironmentOutput,
  DeleteEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEnvironmentInput,
  output: DeleteEnvironmentOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironment",
  endpointHostPrefix: "api.",
}));

export type GetEnvironmentError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes an Amazon Managed Workflows for Apache Airflow (MWAA) environment.
 */
export const getEnvironment: API.OperationMethod<
  GetEnvironmentInput,
  GetEnvironmentOutput,
  GetEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEnvironmentInput,
  output: GetEnvironmentOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironment",
  endpointHostPrefix: "api.",
}));

export type InvokeRestApiError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | RestApiClientException
  | RestApiServerException
  | ValidationException
  | CommonErrors;
/**
 * Invokes the Apache Airflow REST API on the webserver with the specified inputs. To learn more, see Using the Apache Airflow REST API
 */
export const invokeRestApi: API.OperationMethod<
  InvokeRestApiRequest,
  InvokeRestApiResponse,
  InvokeRestApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InvokeRestApiRequest,
  output: InvokeRestApiResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    RestApiClientException,
    RestApiServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeRestApi",
  endpointHostPrefix: "env.",
}));

export type ListEnvironmentsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Amazon Managed Workflows for Apache Airflow (MWAA) environments.
 */
export const listEnvironments: API.PaginatedOperationMethod<
  ListEnvironmentsInput,
  ListEnvironmentsOutput,
  ListEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentName
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEnvironmentsInput,
  output: ListEnvironmentsOutput,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironments",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Environments",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the key-value tag pairs associated to the Amazon Managed Workflows for Apache Airflow (MWAA) environment. For example, `"Environment": "Staging"`.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  endpointHostPrefix: "api.",
}));

export type PublishMetricsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * **Internal only**. Publishes environment health metrics to Amazon CloudWatch.
 */
export const publishMetrics: API.OperationMethod<
  PublishMetricsInput,
  PublishMetricsOutput,
  PublishMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PublishMetricsInput,
  output: PublishMetricsOutput,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PublishMetrics",
  endpointHostPrefix: "ops.",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Associates key-value tag pairs to your Amazon Managed Workflows for Apache Airflow (MWAA) environment.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  endpointHostPrefix: "api.",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes key-value tag pairs associated to your Amazon Managed Workflows for Apache Airflow (MWAA) environment. For example, `"Environment": "Staging"`.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  endpointHostPrefix: "api.",
}));

export type UpdateEnvironmentError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ValidationException
  | CommonErrors;
/**
 * Updates an Amazon Managed Workflows for Apache Airflow (MWAA) environment.
 */
export const updateEnvironment: API.OperationMethod<
  UpdateEnvironmentInput,
  UpdateEnvironmentOutput,
  UpdateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEnvironmentInput,
  output: UpdateEnvironmentOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnvironment",
  endpointHostPrefix: "api.",
}));
