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
  sdkId: "SimSpaceWeaver",
  serviceShapeName: "SimSpaceWeaver",
});
const auth = T.AwsAuthSigv4({ name: "simspaceweaver" });
const ver = T.ServiceVersion("2022-10-28");
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
              `https://simspaceweaver-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://simspaceweaver-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://simspaceweaver.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://simspaceweaver.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type SimSpaceWeaverResourceName = string;
export type BucketName = string;
export type ObjectKeyPrefix = string;
export interface S3Destination {
  BucketName: string;
  ObjectKeyPrefix?: string;
}
export const S3Destination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BucketName: S.String, ObjectKeyPrefix: S.optional(S.String) }),
).annotate({ identifier: "S3Destination" }) as any as S.Schema<S3Destination>;
export interface CreateSnapshotInput {
  Simulation: string;
  Destination: S3Destination;
}
export const CreateSnapshotInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Simulation: S.String, Destination: S3Destination }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/createsnapshot" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSnapshotInput",
}) as any as S.Schema<CreateSnapshotInput>;
export interface CreateSnapshotOutput {}
export const CreateSnapshotOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateSnapshotOutput",
}) as any as S.Schema<CreateSnapshotOutput>;
export interface DeleteAppInput {
  Simulation: string;
  Domain: string;
  App: string;
}
export const DeleteAppInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Simulation: S.String.pipe(T.HttpQuery("simulation")),
    Domain: S.String.pipe(T.HttpQuery("domain")),
    App: S.String.pipe(T.HttpQuery("app")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/deleteapp" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "DeleteAppInput" }) as any as S.Schema<DeleteAppInput>;
export interface DeleteAppOutput {}
export const DeleteAppOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAppOutput",
}) as any as S.Schema<DeleteAppOutput>;
export interface DeleteSimulationInput {
  Simulation: string;
}
export const DeleteSimulationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Simulation: S.String.pipe(T.HttpQuery("simulation")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/deletesimulation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSimulationInput",
}) as any as S.Schema<DeleteSimulationInput>;
export interface DeleteSimulationOutput {}
export const DeleteSimulationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSimulationOutput",
}) as any as S.Schema<DeleteSimulationOutput>;
export type SimSpaceWeaverLongResourceName = string;
export interface DescribeAppInput {
  Simulation: string;
  Domain: string;
  App: string;
}
export const DescribeAppInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Simulation: S.String.pipe(T.HttpQuery("simulation")),
    Domain: S.String.pipe(T.HttpQuery("domain")),
    App: S.String.pipe(T.HttpQuery("app")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/describeapp" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAppInput",
}) as any as S.Schema<DescribeAppInput>;
export type SimulationAppStatus = string;
export type SimulationAppTargetStatus = string;
export type NonEmptyString = string;
export type LaunchCommandList = string[];
export const LaunchCommandList = /*@__PURE__*/ S.Array(S.String);
export interface LaunchOverrides {
  LaunchCommands?: string[];
}
export const LaunchOverrides = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LaunchCommands: S.optional(LaunchCommandList) }),
).annotate({
  identifier: "LaunchOverrides",
}) as any as S.Schema<LaunchOverrides>;
export type Description = string;
export type PortNumber = number;
export interface SimulationAppPortMapping {
  Declared?: number;
  Actual?: number;
}
export const SimulationAppPortMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Declared: S.optional(S.Number), Actual: S.optional(S.Number) }),
).annotate({
  identifier: "SimulationAppPortMapping",
}) as any as S.Schema<SimulationAppPortMapping>;
export type AppPortMappings = SimulationAppPortMapping[];
export const AppPortMappings = /*@__PURE__*/ S.Array(SimulationAppPortMapping);
export interface SimulationAppEndpointInfo {
  Address?: string;
  IngressPortMappings?: SimulationAppPortMapping[];
}
export const SimulationAppEndpointInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Address: S.optional(S.String),
    IngressPortMappings: S.optional(AppPortMappings),
  }),
).annotate({
  identifier: "SimulationAppEndpointInfo",
}) as any as S.Schema<SimulationAppEndpointInfo>;
export interface DescribeAppOutput {
  Name?: string;
  Simulation?: string;
  Domain?: string;
  Status?: string;
  TargetStatus?: string;
  LaunchOverrides?: LaunchOverrides;
  Description?: string;
  EndpointInfo?: SimulationAppEndpointInfo;
}
export const DescribeAppOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Simulation: S.optional(S.String),
    Domain: S.optional(S.String),
    Status: S.optional(S.String),
    TargetStatus: S.optional(S.String),
    LaunchOverrides: S.optional(LaunchOverrides),
    Description: S.optional(S.String),
    EndpointInfo: S.optional(SimulationAppEndpointInfo),
  }),
).annotate({
  identifier: "DescribeAppOutput",
}) as any as S.Schema<DescribeAppOutput>;
export interface DescribeSimulationInput {
  Simulation: string;
}
export const DescribeSimulationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Simulation: S.String.pipe(T.HttpQuery("simulation")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/describesimulation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeSimulationInput",
}) as any as S.Schema<DescribeSimulationInput>;
export type UUID = string;
export type SimSpaceWeaverArn = string;
export type RoleArn = string;
export type SimulationStatus = string;
export type SimulationTargetStatus = string;
export type ObjectKey = string;
export interface S3Location {
  BucketName: string;
  ObjectKey: string;
}
export const S3Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BucketName: S.String, ObjectKey: S.String }),
).annotate({ identifier: "S3Location" }) as any as S.Schema<S3Location>;
export type OptionalString = string;
export type LogGroupArn = string;
export interface CloudWatchLogsLogGroup {
  LogGroupArn?: string;
}
export const CloudWatchLogsLogGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LogGroupArn: S.optional(S.String) }),
).annotate({
  identifier: "CloudWatchLogsLogGroup",
}) as any as S.Schema<CloudWatchLogsLogGroup>;
export interface LogDestination {
  CloudWatchLogsLogGroup?: CloudWatchLogsLogGroup;
}
export const LogDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CloudWatchLogsLogGroup: S.optional(CloudWatchLogsLogGroup) }),
).annotate({ identifier: "LogDestination" }) as any as S.Schema<LogDestination>;
export type LogDestinations = LogDestination[];
export const LogDestinations = /*@__PURE__*/ S.Array(LogDestination);
export interface LoggingConfiguration {
  Destinations?: LogDestination[];
}
export const LoggingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Destinations: S.optional(LogDestinations) }),
).annotate({
  identifier: "LoggingConfiguration",
}) as any as S.Schema<LoggingConfiguration>;
export type LifecycleManagementStrategy = string;
export interface Domain {
  Name?: string;
  Lifecycle?: string;
}
export const Domain = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Lifecycle: S.optional(S.String) }),
).annotate({ identifier: "Domain" }) as any as S.Schema<Domain>;
export type DomainList = Domain[];
export const DomainList = /*@__PURE__*/ S.Array(Domain);
export type ClockStatus = string;
export type ClockTargetStatus = string;
export interface SimulationClock {
  Status?: string;
  TargetStatus?: string;
}
export const SimulationClock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(S.String),
    TargetStatus: S.optional(S.String),
  }),
).annotate({
  identifier: "SimulationClock",
}) as any as S.Schema<SimulationClock>;
export type SimulationClockList = SimulationClock[];
export const SimulationClockList = /*@__PURE__*/ S.Array(SimulationClock);
export interface LiveSimulationState {
  Domains?: Domain[];
  Clocks?: SimulationClock[];
}
export const LiveSimulationState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Domains: S.optional(DomainList),
    Clocks: S.optional(SimulationClockList),
  }),
).annotate({
  identifier: "LiveSimulationState",
}) as any as S.Schema<LiveSimulationState>;
export type TimeToLiveString = string;
export interface DescribeSimulationOutput {
  Name?: string;
  ExecutionId?: string;
  Arn?: string;
  Description?: string;
  RoleArn?: string;
  CreationTime?: Date;
  Status?: string;
  TargetStatus?: string;
  SchemaS3Location?: S3Location;
  SchemaError?: string;
  LoggingConfiguration?: LoggingConfiguration;
  LiveSimulationState?: LiveSimulationState;
  MaximumDuration?: string;
  SnapshotS3Location?: S3Location;
  StartError?: string;
}
export const DescribeSimulationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    ExecutionId: S.optional(S.String),
    Arn: S.optional(S.String),
    Description: S.optional(S.String),
    RoleArn: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(S.String),
    TargetStatus: S.optional(S.String),
    SchemaS3Location: S.optional(S3Location),
    SchemaError: S.optional(S.String),
    LoggingConfiguration: S.optional(LoggingConfiguration),
    LiveSimulationState: S.optional(LiveSimulationState),
    MaximumDuration: S.optional(S.String),
    SnapshotS3Location: S.optional(S3Location),
    StartError: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeSimulationOutput",
}) as any as S.Schema<DescribeSimulationOutput>;
export type PositiveInteger = number;
export interface ListAppsInput {
  Simulation: string;
  Domain?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListAppsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Simulation: S.String.pipe(T.HttpQuery("simulation")),
    Domain: S.optional(S.String).pipe(T.HttpQuery("domain")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/listapps" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "ListAppsInput" }) as any as S.Schema<ListAppsInput>;
export interface SimulationAppMetadata {
  Name?: string;
  Simulation?: string;
  Domain?: string;
  Status?: string;
  TargetStatus?: string;
}
export const SimulationAppMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Simulation: S.optional(S.String),
    Domain: S.optional(S.String),
    Status: S.optional(S.String),
    TargetStatus: S.optional(S.String),
  }),
).annotate({
  identifier: "SimulationAppMetadata",
}) as any as S.Schema<SimulationAppMetadata>;
export type SimulationAppList = SimulationAppMetadata[];
export const SimulationAppList = /*@__PURE__*/ S.Array(SimulationAppMetadata);
export interface ListAppsOutput {
  Apps?: SimulationAppMetadata[];
  NextToken?: string;
}
export const ListAppsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Apps: S.optional(SimulationAppList),
    NextToken: S.optional(S.String),
  }),
).annotate({ identifier: "ListAppsOutput" }) as any as S.Schema<ListAppsOutput>;
export interface ListSimulationsInput {
  MaxResults?: number;
  NextToken?: string;
}
export const ListSimulationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/listsimulations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSimulationsInput",
}) as any as S.Schema<ListSimulationsInput>;
export interface SimulationMetadata {
  Name?: string;
  Arn?: string;
  CreationTime?: Date;
  Status?: string;
  TargetStatus?: string;
}
export const SimulationMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Arn: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(S.String),
    TargetStatus: S.optional(S.String),
  }),
).annotate({
  identifier: "SimulationMetadata",
}) as any as S.Schema<SimulationMetadata>;
export type SimulationList = SimulationMetadata[];
export const SimulationList = /*@__PURE__*/ S.Array(SimulationMetadata);
export interface ListSimulationsOutput {
  Simulations?: SimulationMetadata[];
  NextToken?: string;
}
export const ListSimulationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Simulations: S.optional(SimulationList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSimulationsOutput",
}) as any as S.Schema<ListSimulationsOutput>;
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
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ListTagsForResourceOutput {
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export type ClientToken = string | redacted.Redacted<string>;
export interface StartAppInput {
  ClientToken?: string | redacted.Redacted<string>;
  Simulation: string;
  Domain: string;
  Name: string;
  Description?: string;
  LaunchOverrides?: LaunchOverrides;
}
export const StartAppInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
    Simulation: S.String,
    Domain: S.String,
    Name: S.String,
    Description: S.optional(S.String),
    LaunchOverrides: S.optional(LaunchOverrides),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/startapp" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "StartAppInput" }) as any as S.Schema<StartAppInput>;
export interface StartAppOutput {
  Name?: string;
  Domain?: string;
  Simulation?: string;
}
export const StartAppOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Domain: S.optional(S.String),
    Simulation: S.optional(S.String),
  }),
).annotate({ identifier: "StartAppOutput" }) as any as S.Schema<StartAppOutput>;
export interface StartClockInput {
  Simulation: string;
}
export const StartClockInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Simulation: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/startclock" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartClockInput",
}) as any as S.Schema<StartClockInput>;
export interface StartClockOutput {}
export const StartClockOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StartClockOutput",
}) as any as S.Schema<StartClockOutput>;
export interface StartSimulationInput {
  ClientToken?: string | redacted.Redacted<string>;
  Name: string;
  Description?: string;
  RoleArn: string;
  SchemaS3Location?: S3Location;
  MaximumDuration?: string;
  Tags?: { [key: string]: string | undefined };
  SnapshotS3Location?: S3Location;
}
export const StartSimulationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
    Name: S.String,
    Description: S.optional(S.String),
    RoleArn: S.String,
    SchemaS3Location: S.optional(S3Location),
    MaximumDuration: S.optional(S.String),
    Tags: S.optional(TagMap),
    SnapshotS3Location: S.optional(S3Location),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/startsimulation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartSimulationInput",
}) as any as S.Schema<StartSimulationInput>;
export interface StartSimulationOutput {
  Arn?: string;
  ExecutionId?: string;
  CreationTime?: Date;
}
export const StartSimulationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    ExecutionId: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "StartSimulationOutput",
}) as any as S.Schema<StartSimulationOutput>;
export interface StopAppInput {
  Simulation: string;
  Domain: string;
  App: string;
}
export const StopAppInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Simulation: S.String, Domain: S.String, App: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/stopapp" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "StopAppInput" }) as any as S.Schema<StopAppInput>;
export interface StopAppOutput {}
export const StopAppOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({ identifier: "StopAppOutput" }) as any as S.Schema<StopAppOutput>;
export interface StopClockInput {
  Simulation: string;
}
export const StopClockInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Simulation: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/stopclock" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "StopClockInput" }) as any as S.Schema<StopClockInput>;
export interface StopClockOutput {}
export const StopClockOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopClockOutput",
}) as any as S.Schema<StopClockOutput>;
export interface StopSimulationInput {
  Simulation: string;
}
export const StopSimulationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Simulation: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/stopsimulation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopSimulationInput",
}) as any as S.Schema<StopSimulationInput>;
export interface StopSimulationOutput {}
export const StopSimulationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopSimulationOutput",
}) as any as S.Schema<StopSimulationOutput>;
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
  TagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceOutput {}
export const UntagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export type CreateSnapshotError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a snapshot of the specified simulation.
 * A snapshot is a file that contains simulation state data at a specific time.
 * The state data saved in a snapshot includes entity data from the State Fabric,
 * the simulation configuration specified in the schema, and the clock tick number.
 * You can use the snapshot to initialize a new simulation.
 * For more information about snapshots, see Snapshots
 * in the *SimSpace Weaver User Guide*.
 *
 * You specify a `Destination` when you create a snapshot.
 * The `Destination` is the name of an Amazon S3 bucket and an optional
 * `ObjectKeyPrefix`. The `ObjectKeyPrefix` is
 * usually the name of a folder in the bucket. SimSpace Weaver creates a
 * `snapshot` folder inside the `Destination` and
 * places the snapshot file there.
 *
 * The snapshot file is an Amazon S3 object. It has an object key with the
 * form:
 * *object-key-prefix*\/snapshot/*simulation-name*-*YYMMdd*-*HHmm*-*ss*.zip, where:
 *
 * -
 * *YY*
 * is the 2-digit year
 *
 * -
 * *MM*
 * is the 2-digit month
 *
 * -
 * *dd*
 * is the 2-digit day of the month
 *
 * -
 * *HH*
 * is the 2-digit hour (24-hour clock)
 *
 * -
 * *mm*
 * is the 2-digit minutes
 *
 * -
 * *ss*
 * is the 2-digit seconds
 */
export const createSnapshot: API.OperationMethod<
  CreateSnapshotInput,
  CreateSnapshotOutput,
  CreateSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSnapshotInput,
  output: CreateSnapshotOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSnapshot",
}));

export type DeleteAppError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the instance of the given custom app.
 */
export const deleteApp: API.OperationMethod<
  DeleteAppInput,
  DeleteAppOutput,
  DeleteAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAppInput,
  output: DeleteAppOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApp",
}));

export type DeleteSimulationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes all SimSpace Weaver resources assigned to the given simulation.
 *
 * Your simulation uses resources in other Amazon Web Services. This API operation doesn't delete
 * resources in other Amazon Web Services.
 */
export const deleteSimulation: API.OperationMethod<
  DeleteSimulationInput,
  DeleteSimulationOutput,
  DeleteSimulationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSimulationInput,
  output: DeleteSimulationOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSimulation",
}));

export type DescribeAppError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the state of the given custom app.
 */
export const describeApp: API.OperationMethod<
  DescribeAppInput,
  DescribeAppOutput,
  DescribeAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAppInput,
  output: DescribeAppOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApp",
}));

export type DescribeSimulationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the current state of the given simulation.
 */
export const describeSimulation: API.OperationMethod<
  DescribeSimulationInput,
  DescribeSimulationOutput,
  DescribeSimulationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSimulationInput,
  output: DescribeSimulationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSimulation",
}));

export type ListAppsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all custom apps or service apps for the given simulation and domain.
 */
export const listApps: API.PaginatedOperationMethod<
  ListAppsInput,
  ListAppsOutput,
  ListAppsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAppsInput,
  output: ListAppsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApps",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSimulationsError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists the SimSpace Weaver simulations in the Amazon Web Services account used to make the API call.
 */
export const listSimulations: API.PaginatedOperationMethod<
  ListSimulationsInput,
  ListSimulationsOutput,
  ListSimulationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSimulationsInput,
  output: ListSimulationsOutput,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSimulations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all tags on a SimSpace Weaver resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type StartAppError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Starts a custom app with the configuration specified in the simulation schema.
 */
export const startApp: API.OperationMethod<
  StartAppInput,
  StartAppOutput,
  StartAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartAppInput,
  output: StartAppOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartApp",
}));

export type StartClockError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Starts the simulation clock.
 */
export const startClock: API.OperationMethod<
  StartClockInput,
  StartClockOutput,
  StartClockError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartClockInput,
  output: StartClockOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartClock",
}));

export type StartSimulationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Starts a simulation with the given name. You must choose to start your
 * simulation from a schema or from a snapshot.
 * For more information about the schema, see the schema reference
 * in the *SimSpace Weaver User Guide*.
 * For more information about snapshots, see Snapshots
 * in the *SimSpace Weaver User Guide*.
 */
export const startSimulation: API.OperationMethod<
  StartSimulationInput,
  StartSimulationOutput,
  StartSimulationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartSimulationInput,
  output: StartSimulationOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSimulation",
}));

export type StopAppError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Stops the given custom app and shuts down all of its allocated compute resources.
 */
export const stopApp: API.OperationMethod<
  StopAppInput,
  StopAppOutput,
  StopAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopAppInput,
  output: StopAppOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopApp",
}));

export type StopClockError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Stops the simulation clock.
 */
export const stopClock: API.OperationMethod<
  StopClockInput,
  StopClockOutput,
  StopClockError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopClockInput,
  output: StopClockOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopClock",
}));

export type StopSimulationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Stops the given simulation.
 *
 * You can't restart a simulation after you stop it. If you want to restart a simulation, then
 * you must stop it, delete it, and start a new instance of it.
 */
export const stopSimulation: API.OperationMethod<
  StopSimulationInput,
  StopSimulationOutput,
  StopSimulationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopSimulationInput,
  output: StopSimulationOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopSimulation",
}));

export type TagResourceError =
  | ResourceNotFoundException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Adds tags to a SimSpace Weaver resource. For more information about tags, see Tagging Amazon Web Services resources in the
 * *Amazon Web Services General Reference*.
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
    ResourceNotFoundException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from a SimSpace Weaver resource. For more information about tags, see Tagging Amazon Web Services resources in the
 * *Amazon Web Services General Reference*.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceOutput,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));
