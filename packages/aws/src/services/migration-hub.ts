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
  sdkId: "Migration Hub",
  serviceShapeName: "AWSMigrationHub",
});
const auth = T.AwsAuthSigv4({ name: "mgh" });
const ver = T.ServiceVersion("2017-05-31");
const proto = T.AwsProtocolsAwsJson1_1();
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
              `https://mgh-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://mgh-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://mgh.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://mgh.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  ).pipe(C.withAuthError) {}
export class DryRunOperation
  extends /*@__PURE__*/ S.TaggedError<DryRunOperation>()("DryRunOperation", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class HomeRegionNotSetException
  extends /*@__PURE__*/ S.TaggedError<HomeRegionNotSetException>()(
    "HomeRegionNotSetException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InternalServerError
  extends /*@__PURE__*/ S.TaggedError<InternalServerError>()(
    "InternalServerError",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()(
    "InvalidInputException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class PolicyErrorException
  extends /*@__PURE__*/ S.TaggedError<PolicyErrorException>()(
    "PolicyErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      RetryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedOperation
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedOperation>()(
    "UnauthorizedOperation",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAuthError) {}
export type ProgressUpdateStream = string;
export type MigrationTaskName = string;
export type CreatedArtifactName = string;
export type CreatedArtifactDescription = string;
export interface CreatedArtifact {
  Name: string;
  Description?: string;
}
export const CreatedArtifact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Description: S.optional(S.String) }),
).annotate({
  identifier: "CreatedArtifact",
}) as any as S.Schema<CreatedArtifact>;
export type DryRun = boolean;
export interface AssociateCreatedArtifactRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
  CreatedArtifact: CreatedArtifact;
  DryRun?: boolean;
}
export const AssociateCreatedArtifactRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProgressUpdateStream: S.String,
    MigrationTaskName: S.String,
    CreatedArtifact: CreatedArtifact,
    DryRun: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateCreatedArtifactRequest",
}) as any as S.Schema<AssociateCreatedArtifactRequest>;
export interface AssociateCreatedArtifactResult {}
export const AssociateCreatedArtifactResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateCreatedArtifactResult",
}) as any as S.Schema<AssociateCreatedArtifactResult>;
export type ConfigurationId = string;
export type DiscoveredResourceDescription = string;
export interface DiscoveredResource {
  ConfigurationId: string;
  Description?: string;
}
export const DiscoveredResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConfigurationId: S.String, Description: S.optional(S.String) }),
).annotate({
  identifier: "DiscoveredResource",
}) as any as S.Schema<DiscoveredResource>;
export interface AssociateDiscoveredResourceRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
  DiscoveredResource: DiscoveredResource;
  DryRun?: boolean;
}
export const AssociateDiscoveredResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProgressUpdateStream: S.String,
    MigrationTaskName: S.String,
    DiscoveredResource: DiscoveredResource,
    DryRun: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateDiscoveredResourceRequest",
}) as any as S.Schema<AssociateDiscoveredResourceRequest>;
export interface AssociateDiscoveredResourceResult {}
export const AssociateDiscoveredResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateDiscoveredResourceResult",
}) as any as S.Schema<AssociateDiscoveredResourceResult>;
export type SourceResourceName = string;
export type SourceResourceDescription = string;
export type StatusDetail = string;
export interface SourceResource {
  Name: string;
  Description?: string;
  StatusDetail?: string;
}
export const SourceResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    StatusDetail: S.optional(S.String),
  }),
).annotate({ identifier: "SourceResource" }) as any as S.Schema<SourceResource>;
export interface AssociateSourceResourceRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
  SourceResource: SourceResource;
  DryRun?: boolean;
}
export const AssociateSourceResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProgressUpdateStream: S.String,
    MigrationTaskName: S.String,
    SourceResource: SourceResource,
    DryRun: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateSourceResourceRequest",
}) as any as S.Schema<AssociateSourceResourceRequest>;
export interface AssociateSourceResourceResult {}
export const AssociateSourceResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateSourceResourceResult",
}) as any as S.Schema<AssociateSourceResourceResult>;
export interface CreateProgressUpdateStreamRequest {
  ProgressUpdateStreamName: string;
  DryRun?: boolean;
}
export const CreateProgressUpdateStreamRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProgressUpdateStreamName: S.String,
    DryRun: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateProgressUpdateStreamRequest",
}) as any as S.Schema<CreateProgressUpdateStreamRequest>;
export interface CreateProgressUpdateStreamResult {}
export const CreateProgressUpdateStreamResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateProgressUpdateStreamResult",
}) as any as S.Schema<CreateProgressUpdateStreamResult>;
export interface DeleteProgressUpdateStreamRequest {
  ProgressUpdateStreamName: string;
  DryRun?: boolean;
}
export const DeleteProgressUpdateStreamRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProgressUpdateStreamName: S.String,
    DryRun: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteProgressUpdateStreamRequest",
}) as any as S.Schema<DeleteProgressUpdateStreamRequest>;
export interface DeleteProgressUpdateStreamResult {}
export const DeleteProgressUpdateStreamResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteProgressUpdateStreamResult",
}) as any as S.Schema<DeleteProgressUpdateStreamResult>;
export type ApplicationId = string;
export interface DescribeApplicationStateRequest {
  ApplicationId: string;
}
export const DescribeApplicationStateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeApplicationStateRequest",
}) as any as S.Schema<DescribeApplicationStateRequest>;
export type ApplicationStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | (string & {});
export const ApplicationStatus = S.String;

export type UpdateDateTime = Date;
export interface DescribeApplicationStateResult {
  ApplicationStatus?: ApplicationStatus;
  LastUpdatedTime?: Date;
}
export const DescribeApplicationStateResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationStatus: S.optional(ApplicationStatus),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DescribeApplicationStateResult",
}) as any as S.Schema<DescribeApplicationStateResult>;
export interface DescribeMigrationTaskRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
}
export const DescribeMigrationTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProgressUpdateStream: S.String,
    MigrationTaskName: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeMigrationTaskRequest",
}) as any as S.Schema<DescribeMigrationTaskRequest>;
export type Status =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export const Status = S.String;

export type ProgressPercent = number;
export interface Task {
  Status: Status;
  StatusDetail?: string;
  ProgressPercent?: number;
}
export const Task = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: Status,
    StatusDetail: S.optional(S.String),
    ProgressPercent: S.optional(S.Number),
  }),
).annotate({ identifier: "Task" }) as any as S.Schema<Task>;
export type ResourceAttributeType =
  | "IPV4_ADDRESS"
  | "IPV6_ADDRESS"
  | "MAC_ADDRESS"
  | "FQDN"
  | "VM_MANAGER_ID"
  | "VM_MANAGED_OBJECT_REFERENCE"
  | "VM_NAME"
  | "VM_PATH"
  | "BIOS_ID"
  | "MOTHERBOARD_SERIAL_NUMBER"
  | (string & {});
export const ResourceAttributeType = S.String;

export type ResourceAttributeValue = string;
export interface ResourceAttribute {
  Type: ResourceAttributeType;
  Value: string;
}
export const ResourceAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: ResourceAttributeType, Value: S.String }),
).annotate({
  identifier: "ResourceAttribute",
}) as any as S.Schema<ResourceAttribute>;
export type LatestResourceAttributeList = ResourceAttribute[];
export const LatestResourceAttributeList =
  /*@__PURE__*/ S.Array(ResourceAttribute);
export interface MigrationTask {
  ProgressUpdateStream?: string;
  MigrationTaskName?: string;
  Task?: Task;
  UpdateDateTime?: Date;
  ResourceAttributeList?: ResourceAttribute[];
}
export const MigrationTask = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProgressUpdateStream: S.optional(S.String),
    MigrationTaskName: S.optional(S.String),
    Task: S.optional(Task),
    UpdateDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ResourceAttributeList: S.optional(LatestResourceAttributeList),
  }),
).annotate({ identifier: "MigrationTask" }) as any as S.Schema<MigrationTask>;
export interface DescribeMigrationTaskResult {
  MigrationTask?: MigrationTask;
}
export const DescribeMigrationTaskResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MigrationTask: S.optional(MigrationTask) }),
).annotate({
  identifier: "DescribeMigrationTaskResult",
}) as any as S.Schema<DescribeMigrationTaskResult>;
export interface DisassociateCreatedArtifactRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
  CreatedArtifactName: string;
  DryRun?: boolean;
}
export const DisassociateCreatedArtifactRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProgressUpdateStream: S.String,
    MigrationTaskName: S.String,
    CreatedArtifactName: S.String,
    DryRun: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DisassociateCreatedArtifactRequest",
}) as any as S.Schema<DisassociateCreatedArtifactRequest>;
export interface DisassociateCreatedArtifactResult {}
export const DisassociateCreatedArtifactResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateCreatedArtifactResult",
}) as any as S.Schema<DisassociateCreatedArtifactResult>;
export interface DisassociateDiscoveredResourceRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
  ConfigurationId: string;
  DryRun?: boolean;
}
export const DisassociateDiscoveredResourceRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProgressUpdateStream: S.String,
      MigrationTaskName: S.String,
      ConfigurationId: S.String,
      DryRun: S.optional(S.Boolean),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DisassociateDiscoveredResourceRequest",
}) as any as S.Schema<DisassociateDiscoveredResourceRequest>;
export interface DisassociateDiscoveredResourceResult {}
export const DisassociateDiscoveredResourceResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DisassociateDiscoveredResourceResult",
}) as any as S.Schema<DisassociateDiscoveredResourceResult>;
export interface DisassociateSourceResourceRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
  SourceResourceName: string;
  DryRun?: boolean;
}
export const DisassociateSourceResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProgressUpdateStream: S.String,
    MigrationTaskName: S.String,
    SourceResourceName: S.String,
    DryRun: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DisassociateSourceResourceRequest",
}) as any as S.Schema<DisassociateSourceResourceRequest>;
export interface DisassociateSourceResourceResult {}
export const DisassociateSourceResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateSourceResourceResult",
}) as any as S.Schema<DisassociateSourceResourceResult>;
export interface ImportMigrationTaskRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
  DryRun?: boolean;
}
export const ImportMigrationTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProgressUpdateStream: S.String,
    MigrationTaskName: S.String,
    DryRun: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ImportMigrationTaskRequest",
}) as any as S.Schema<ImportMigrationTaskRequest>;
export interface ImportMigrationTaskResult {}
export const ImportMigrationTaskResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ImportMigrationTaskResult",
}) as any as S.Schema<ImportMigrationTaskResult>;
export type ApplicationIds = string[];
export const ApplicationIds = /*@__PURE__*/ S.Array(S.String);
export type Token = string;
export type MaxResults = number;
export interface ListApplicationStatesRequest {
  ApplicationIds?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListApplicationStatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationIds: S.optional(ApplicationIds),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListApplicationStatesRequest",
}) as any as S.Schema<ListApplicationStatesRequest>;
export interface ApplicationState {
  ApplicationId?: string;
  ApplicationStatus?: ApplicationStatus;
  LastUpdatedTime?: Date;
}
export const ApplicationState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    ApplicationStatus: S.optional(ApplicationStatus),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "ApplicationState",
}) as any as S.Schema<ApplicationState>;
export type ApplicationStateList = ApplicationState[];
export const ApplicationStateList = /*@__PURE__*/ S.Array(ApplicationState);
export interface ListApplicationStatesResult {
  ApplicationStateList?: ApplicationState[];
  NextToken?: string;
}
export const ListApplicationStatesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationStateList: S.optional(ApplicationStateList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListApplicationStatesResult",
}) as any as S.Schema<ListApplicationStatesResult>;
export type MaxResultsCreatedArtifacts = number;
export interface ListCreatedArtifactsRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListCreatedArtifactsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProgressUpdateStream: S.String,
    MigrationTaskName: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListCreatedArtifactsRequest",
}) as any as S.Schema<ListCreatedArtifactsRequest>;
export type CreatedArtifactList = CreatedArtifact[];
export const CreatedArtifactList = /*@__PURE__*/ S.Array(CreatedArtifact);
export interface ListCreatedArtifactsResult {
  NextToken?: string;
  CreatedArtifactList?: CreatedArtifact[];
}
export const ListCreatedArtifactsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    CreatedArtifactList: S.optional(CreatedArtifactList),
  }),
).annotate({
  identifier: "ListCreatedArtifactsResult",
}) as any as S.Schema<ListCreatedArtifactsResult>;
export type MaxResultsResources = number;
export interface ListDiscoveredResourcesRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListDiscoveredResourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProgressUpdateStream: S.String,
    MigrationTaskName: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDiscoveredResourcesRequest",
}) as any as S.Schema<ListDiscoveredResourcesRequest>;
export type DiscoveredResourceList = DiscoveredResource[];
export const DiscoveredResourceList = /*@__PURE__*/ S.Array(DiscoveredResource);
export interface ListDiscoveredResourcesResult {
  NextToken?: string;
  DiscoveredResourceList?: DiscoveredResource[];
}
export const ListDiscoveredResourcesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    DiscoveredResourceList: S.optional(DiscoveredResourceList),
  }),
).annotate({
  identifier: "ListDiscoveredResourcesResult",
}) as any as S.Schema<ListDiscoveredResourcesResult>;
export type ResourceName = string;
export interface ListMigrationTasksRequest {
  NextToken?: string;
  MaxResults?: number;
  ResourceName?: string;
}
export const ListMigrationTasksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    ResourceName: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListMigrationTasksRequest",
}) as any as S.Schema<ListMigrationTasksRequest>;
export interface MigrationTaskSummary {
  ProgressUpdateStream?: string;
  MigrationTaskName?: string;
  Status?: Status;
  ProgressPercent?: number;
  StatusDetail?: string;
  UpdateDateTime?: Date;
}
export const MigrationTaskSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProgressUpdateStream: S.optional(S.String),
    MigrationTaskName: S.optional(S.String),
    Status: S.optional(Status),
    ProgressPercent: S.optional(S.Number),
    StatusDetail: S.optional(S.String),
    UpdateDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "MigrationTaskSummary",
}) as any as S.Schema<MigrationTaskSummary>;
export type MigrationTaskSummaryList = MigrationTaskSummary[];
export const MigrationTaskSummaryList =
  /*@__PURE__*/ S.Array(MigrationTaskSummary);
export interface ListMigrationTasksResult {
  NextToken?: string;
  MigrationTaskSummaryList?: MigrationTaskSummary[];
}
export const ListMigrationTasksResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MigrationTaskSummaryList: S.optional(MigrationTaskSummaryList),
  }),
).annotate({
  identifier: "ListMigrationTasksResult",
}) as any as S.Schema<ListMigrationTasksResult>;
export interface ListMigrationTaskUpdatesRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListMigrationTaskUpdatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProgressUpdateStream: S.String,
    MigrationTaskName: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListMigrationTaskUpdatesRequest",
}) as any as S.Schema<ListMigrationTaskUpdatesRequest>;
export type UpdateType = "MIGRATION_TASK_STATE_UPDATED" | (string & {});
export const UpdateType = S.String;

export interface MigrationTaskUpdate {
  UpdateDateTime?: Date;
  UpdateType?: UpdateType;
  MigrationTaskState?: Task;
}
export const MigrationTaskUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpdateDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdateType: S.optional(UpdateType),
    MigrationTaskState: S.optional(Task),
  }),
).annotate({
  identifier: "MigrationTaskUpdate",
}) as any as S.Schema<MigrationTaskUpdate>;
export type MigrationTaskUpdateList = MigrationTaskUpdate[];
export const MigrationTaskUpdateList =
  /*@__PURE__*/ S.Array(MigrationTaskUpdate);
export interface ListMigrationTaskUpdatesResult {
  NextToken?: string;
  MigrationTaskUpdateList?: MigrationTaskUpdate[];
}
export const ListMigrationTaskUpdatesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MigrationTaskUpdateList: S.optional(MigrationTaskUpdateList),
  }),
).annotate({
  identifier: "ListMigrationTaskUpdatesResult",
}) as any as S.Schema<ListMigrationTaskUpdatesResult>;
export interface ListProgressUpdateStreamsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListProgressUpdateStreamsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListProgressUpdateStreamsRequest",
}) as any as S.Schema<ListProgressUpdateStreamsRequest>;
export interface ProgressUpdateStreamSummary {
  ProgressUpdateStreamName?: string;
}
export const ProgressUpdateStreamSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProgressUpdateStreamName: S.optional(S.String) }),
).annotate({
  identifier: "ProgressUpdateStreamSummary",
}) as any as S.Schema<ProgressUpdateStreamSummary>;
export type ProgressUpdateStreamSummaryList = ProgressUpdateStreamSummary[];
export const ProgressUpdateStreamSummaryList = /*@__PURE__*/ S.Array(
  ProgressUpdateStreamSummary,
);
export interface ListProgressUpdateStreamsResult {
  ProgressUpdateStreamSummaryList?: ProgressUpdateStreamSummary[];
  NextToken?: string;
}
export const ListProgressUpdateStreamsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProgressUpdateStreamSummaryList: S.optional(
      ProgressUpdateStreamSummaryList,
    ),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProgressUpdateStreamsResult",
}) as any as S.Schema<ListProgressUpdateStreamsResult>;
export type MaxResultsSourceResources = number;
export interface ListSourceResourcesRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListSourceResourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProgressUpdateStream: S.String,
    MigrationTaskName: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListSourceResourcesRequest",
}) as any as S.Schema<ListSourceResourcesRequest>;
export type SourceResourceList = SourceResource[];
export const SourceResourceList = /*@__PURE__*/ S.Array(SourceResource);
export interface ListSourceResourcesResult {
  NextToken?: string;
  SourceResourceList?: SourceResource[];
}
export const ListSourceResourcesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    SourceResourceList: S.optional(SourceResourceList),
  }),
).annotate({
  identifier: "ListSourceResourcesResult",
}) as any as S.Schema<ListSourceResourcesResult>;
export interface NotifyApplicationStateRequest {
  ApplicationId: string;
  Status: ApplicationStatus;
  UpdateDateTime?: Date;
  DryRun?: boolean;
}
export const NotifyApplicationStateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String,
    Status: ApplicationStatus,
    UpdateDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DryRun: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "NotifyApplicationStateRequest",
}) as any as S.Schema<NotifyApplicationStateRequest>;
export interface NotifyApplicationStateResult {}
export const NotifyApplicationStateResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "NotifyApplicationStateResult",
}) as any as S.Schema<NotifyApplicationStateResult>;
export type NextUpdateSeconds = number;
export interface NotifyMigrationTaskStateRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
  Task: Task;
  UpdateDateTime: Date;
  NextUpdateSeconds: number;
  DryRun?: boolean;
}
export const NotifyMigrationTaskStateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProgressUpdateStream: S.String,
    MigrationTaskName: S.String,
    Task: Task,
    UpdateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    NextUpdateSeconds: S.Number,
    DryRun: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "NotifyMigrationTaskStateRequest",
}) as any as S.Schema<NotifyMigrationTaskStateRequest>;
export interface NotifyMigrationTaskStateResult {}
export const NotifyMigrationTaskStateResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "NotifyMigrationTaskStateResult",
}) as any as S.Schema<NotifyMigrationTaskStateResult>;
export type ResourceAttributeList = ResourceAttribute[];
export const ResourceAttributeList = /*@__PURE__*/ S.Array(ResourceAttribute);
export interface PutResourceAttributesRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
  ResourceAttributeList: ResourceAttribute[];
  DryRun?: boolean;
}
export const PutResourceAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProgressUpdateStream: S.String,
    MigrationTaskName: S.String,
    ResourceAttributeList: ResourceAttributeList,
    DryRun: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutResourceAttributesRequest",
}) as any as S.Schema<PutResourceAttributesRequest>;
export interface PutResourceAttributesResult {}
export const PutResourceAttributesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutResourceAttributesResult",
}) as any as S.Schema<PutResourceAttributesResult>;
export type ErrorMessage = string;
export type RetryAfterSeconds = number;
export type AssociateCreatedArtifactError =
  | AccessDeniedException
  | DryRunOperation
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Associates a created artifact of an AWS cloud resource, the target receiving the
 * migration, with the migration task performed by a migration tool. This API has the
 * following traits:
 *
 * - Migration tools can call the `AssociateCreatedArtifact` operation to
 * indicate which AWS artifact is associated with a migration task.
 *
 * - The created artifact name must be provided in ARN (Amazon Resource Name) format
 * which will contain information about type and region; for example:
 * `arn:aws:ec2:us-east-1:488216288981:image/ami-6d0ba87b`.
 *
 * - Examples of the AWS resource behind the created artifact are, AMI's, EC2 instance,
 * or DMS endpoint, etc.
 */
export const associateCreatedArtifact: API.OperationMethod<
  AssociateCreatedArtifactRequest,
  AssociateCreatedArtifactResult,
  AssociateCreatedArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateCreatedArtifactRequest,
  output: AssociateCreatedArtifactResult,
  errors: [
    AccessDeniedException,
    DryRunOperation,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateCreatedArtifact",
}));

export type AssociateDiscoveredResourceError =
  | AccessDeniedException
  | DryRunOperation
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | PolicyErrorException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Associates a discovered resource ID from Application Discovery Service with a migration
 * task.
 */
export const associateDiscoveredResource: API.OperationMethod<
  AssociateDiscoveredResourceRequest,
  AssociateDiscoveredResourceResult,
  AssociateDiscoveredResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateDiscoveredResourceRequest,
  output: AssociateDiscoveredResourceResult,
  errors: [
    AccessDeniedException,
    DryRunOperation,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    PolicyErrorException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateDiscoveredResource",
}));

export type AssociateSourceResourceError =
  | AccessDeniedException
  | DryRunOperation
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Associates a source resource with a migration task. For example, the source resource can
 * be a source server, an application, or a migration wave.
 */
export const associateSourceResource: API.OperationMethod<
  AssociateSourceResourceRequest,
  AssociateSourceResourceResult,
  AssociateSourceResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateSourceResourceRequest,
  output: AssociateSourceResourceResult,
  errors: [
    AccessDeniedException,
    DryRunOperation,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateSourceResource",
}));

export type CreateProgressUpdateStreamError =
  | AccessDeniedException
  | DryRunOperation
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Creates a progress update stream which is an AWS resource used for access control as
 * well as a namespace for migration task names that is implicitly linked to your AWS account.
 * It must uniquely identify the migration tool as it is used for all updates made by the
 * tool; however, it does not need to be unique for each AWS account because it is scoped to
 * the AWS account.
 */
export const createProgressUpdateStream: API.OperationMethod<
  CreateProgressUpdateStreamRequest,
  CreateProgressUpdateStreamResult,
  CreateProgressUpdateStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProgressUpdateStreamRequest,
  output: CreateProgressUpdateStreamResult,
  errors: [
    AccessDeniedException,
    DryRunOperation,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProgressUpdateStream",
}));

export type DeleteProgressUpdateStreamError =
  | AccessDeniedException
  | DryRunOperation
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Deletes a progress update stream, including all of its tasks, which was previously
 * created as an AWS resource used for access control. This API has the following
 * traits:
 *
 * - The only parameter needed for `DeleteProgressUpdateStream` is the
 * stream name (same as a `CreateProgressUpdateStream` call).
 *
 * - The call will return, and a background process will asynchronously delete the
 * stream and all of its resources (tasks, associated resources, resource attributes,
 * created artifacts).
 *
 * - If the stream takes time to be deleted, it might still show up on a
 * `ListProgressUpdateStreams` call.
 *
 * - `CreateProgressUpdateStream`, `ImportMigrationTask`,
 * `NotifyMigrationTaskState`, and all Associate[*] APIs related to the
 * tasks belonging to the stream will throw "InvalidInputException" if the stream of the
 * same name is in the process of being deleted.
 *
 * - Once the stream and all of its resources are deleted,
 * `CreateProgressUpdateStream` for a stream of the same name will
 * succeed, and that stream will be an entirely new logical resource (without any
 * resources associated with the old stream).
 */
export const deleteProgressUpdateStream: API.OperationMethod<
  DeleteProgressUpdateStreamRequest,
  DeleteProgressUpdateStreamResult,
  DeleteProgressUpdateStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProgressUpdateStreamRequest,
  output: DeleteProgressUpdateStreamResult,
  errors: [
    AccessDeniedException,
    DryRunOperation,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProgressUpdateStream",
}));

export type DescribeApplicationStateError =
  | AccessDeniedException
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | PolicyErrorException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the migration status of an application.
 */
export const describeApplicationState: API.OperationMethod<
  DescribeApplicationStateRequest,
  DescribeApplicationStateResult,
  DescribeApplicationStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeApplicationStateRequest,
  output: DescribeApplicationStateResult,
  errors: [
    AccessDeniedException,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    PolicyErrorException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplicationState",
}));

export type DescribeMigrationTaskError =
  | AccessDeniedException
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a list of all attributes associated with a specific migration task.
 */
export const describeMigrationTask: API.OperationMethod<
  DescribeMigrationTaskRequest,
  DescribeMigrationTaskResult,
  DescribeMigrationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeMigrationTaskRequest,
  output: DescribeMigrationTaskResult,
  errors: [
    AccessDeniedException,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMigrationTask",
}));

export type DisassociateCreatedArtifactError =
  | AccessDeniedException
  | DryRunOperation
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Disassociates a created artifact of an AWS resource with a migration task performed by a
 * migration tool that was previously associated. This API has the following traits:
 *
 * - A migration user can call the `DisassociateCreatedArtifacts` operation
 * to disassociate a created AWS Artifact from a migration task.
 *
 * - The created artifact name must be provided in ARN (Amazon Resource Name) format
 * which will contain information about type and region; for example:
 * `arn:aws:ec2:us-east-1:488216288981:image/ami-6d0ba87b`.
 *
 * - Examples of the AWS resource behind the created artifact are, AMI's, EC2 instance,
 * or RDS instance, etc.
 */
export const disassociateCreatedArtifact: API.OperationMethod<
  DisassociateCreatedArtifactRequest,
  DisassociateCreatedArtifactResult,
  DisassociateCreatedArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateCreatedArtifactRequest,
  output: DisassociateCreatedArtifactResult,
  errors: [
    AccessDeniedException,
    DryRunOperation,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateCreatedArtifact",
}));

export type DisassociateDiscoveredResourceError =
  | AccessDeniedException
  | DryRunOperation
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Disassociate an Application Discovery Service discovered resource from a migration
 * task.
 */
export const disassociateDiscoveredResource: API.OperationMethod<
  DisassociateDiscoveredResourceRequest,
  DisassociateDiscoveredResourceResult,
  DisassociateDiscoveredResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateDiscoveredResourceRequest,
  output: DisassociateDiscoveredResourceResult,
  errors: [
    AccessDeniedException,
    DryRunOperation,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateDiscoveredResource",
}));

export type DisassociateSourceResourceError =
  | AccessDeniedException
  | DryRunOperation
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Removes the association between a source resource and a migration task.
 */
export const disassociateSourceResource: API.OperationMethod<
  DisassociateSourceResourceRequest,
  DisassociateSourceResourceResult,
  DisassociateSourceResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateSourceResourceRequest,
  output: DisassociateSourceResourceResult,
  errors: [
    AccessDeniedException,
    DryRunOperation,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateSourceResource",
}));

export type ImportMigrationTaskError =
  | AccessDeniedException
  | DryRunOperation
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Registers a new migration task which represents a server, database, etc., being migrated
 * to AWS by a migration tool.
 *
 * This API is a prerequisite to calling the `NotifyMigrationTaskState` API as
 * the migration tool must first register the migration task with Migration Hub.
 */
export const importMigrationTask: API.OperationMethod<
  ImportMigrationTaskRequest,
  ImportMigrationTaskResult,
  ImportMigrationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportMigrationTaskRequest,
  output: ImportMigrationTaskResult,
  errors: [
    AccessDeniedException,
    DryRunOperation,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportMigrationTask",
}));

export type ListApplicationStatesError =
  | AccessDeniedException
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all the migration statuses for your applications. If you use the optional
 * `ApplicationIds` parameter, only the migration statuses for those
 * applications will be returned.
 */
export const listApplicationStates: API.PaginatedOperationMethod<
  ListApplicationStatesRequest,
  ListApplicationStatesResult,
  ListApplicationStatesError,
  Credentials | HttpClient.HttpClient,
  ApplicationState
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationStatesRequest,
  output: ListApplicationStatesResult,
  errors: [
    AccessDeniedException,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationStates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ApplicationStateList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCreatedArtifactsError =
  | AccessDeniedException
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the created artifacts attached to a given migration task in an update stream. This
 * API has the following traits:
 *
 * - Gets the list of the created artifacts while
 * migration is taking place.
 *
 * - Shows the artifacts created by the migration tool that was associated by the
 * `AssociateCreatedArtifact` API.
 *
 * - Lists created artifacts in a paginated interface.
 */
export const listCreatedArtifacts: API.PaginatedOperationMethod<
  ListCreatedArtifactsRequest,
  ListCreatedArtifactsResult,
  ListCreatedArtifactsError,
  Credentials | HttpClient.HttpClient,
  CreatedArtifact
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCreatedArtifactsRequest,
  output: ListCreatedArtifactsResult,
  errors: [
    AccessDeniedException,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCreatedArtifacts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CreatedArtifactList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDiscoveredResourcesError =
  | AccessDeniedException
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists discovered resources associated with the given `MigrationTask`.
 */
export const listDiscoveredResources: API.PaginatedOperationMethod<
  ListDiscoveredResourcesRequest,
  ListDiscoveredResourcesResult,
  ListDiscoveredResourcesError,
  Credentials | HttpClient.HttpClient,
  DiscoveredResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDiscoveredResourcesRequest,
  output: ListDiscoveredResourcesResult,
  errors: [
    AccessDeniedException,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDiscoveredResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DiscoveredResourceList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMigrationTasksError =
  | AccessDeniedException
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | PolicyErrorException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all, or filtered by resource name, migration tasks associated with the user
 * account making this call. This API has the following traits:
 *
 * - Can show a summary list of the most recent migration tasks.
 *
 * - Can show a summary list of migration tasks associated with a given discovered
 * resource.
 *
 * - Lists migration tasks in a paginated interface.
 */
export const listMigrationTasks: API.PaginatedOperationMethod<
  ListMigrationTasksRequest,
  ListMigrationTasksResult,
  ListMigrationTasksError,
  Credentials | HttpClient.HttpClient,
  MigrationTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMigrationTasksRequest,
  output: ListMigrationTasksResult,
  errors: [
    AccessDeniedException,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    PolicyErrorException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMigrationTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MigrationTaskSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMigrationTaskUpdatesError =
  | AccessDeniedException
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * This is a paginated API that returns all the migration-task states for the specified
 * `MigrationTaskName` and `ProgressUpdateStream`.
 */
export const listMigrationTaskUpdates: API.PaginatedOperationMethod<
  ListMigrationTaskUpdatesRequest,
  ListMigrationTaskUpdatesResult,
  ListMigrationTaskUpdatesError,
  Credentials | HttpClient.HttpClient,
  MigrationTaskUpdate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMigrationTaskUpdatesRequest,
  output: ListMigrationTaskUpdatesResult,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMigrationTaskUpdates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MigrationTaskUpdateList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProgressUpdateStreamsError =
  | AccessDeniedException
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists progress update streams associated with the user account making this call.
 */
export const listProgressUpdateStreams: API.PaginatedOperationMethod<
  ListProgressUpdateStreamsRequest,
  ListProgressUpdateStreamsResult,
  ListProgressUpdateStreamsError,
  Credentials | HttpClient.HttpClient,
  ProgressUpdateStreamSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProgressUpdateStreamsRequest,
  output: ListProgressUpdateStreamsResult,
  errors: [
    AccessDeniedException,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProgressUpdateStreams",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProgressUpdateStreamSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSourceResourcesError =
  | AccessDeniedException
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all the source resource that are associated with the specified
 * `MigrationTaskName` and `ProgressUpdateStream`.
 */
export const listSourceResources: API.PaginatedOperationMethod<
  ListSourceResourcesRequest,
  ListSourceResourcesResult,
  ListSourceResourcesError,
  Credentials | HttpClient.HttpClient,
  SourceResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSourceResourcesRequest,
  output: ListSourceResourcesResult,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSourceResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SourceResourceList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type NotifyApplicationStateError =
  | AccessDeniedException
  | DryRunOperation
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | PolicyErrorException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Sets the migration state of an application. For a given application identified by the
 * value passed to `ApplicationId`, its status is set or updated by passing one of
 * three values to `Status`: NOT_STARTED | IN_PROGRESS |
 * COMPLETED.
 */
export const notifyApplicationState: API.OperationMethod<
  NotifyApplicationStateRequest,
  NotifyApplicationStateResult,
  NotifyApplicationStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: NotifyApplicationStateRequest,
  output: NotifyApplicationStateResult,
  errors: [
    AccessDeniedException,
    DryRunOperation,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    PolicyErrorException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "NotifyApplicationState",
}));

export type NotifyMigrationTaskStateError =
  | AccessDeniedException
  | DryRunOperation
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Notifies Migration Hub of the current status, progress, or other detail regarding a
 * migration task. This API has the following traits:
 *
 * - Migration tools will call the `NotifyMigrationTaskState` API to share
 * the latest progress and status.
 *
 * - `MigrationTaskName` is used for addressing updates to the correct
 * target.
 *
 * - `ProgressUpdateStream` is used for access control and to provide a
 * namespace for each migration tool.
 */
export const notifyMigrationTaskState: API.OperationMethod<
  NotifyMigrationTaskStateRequest,
  NotifyMigrationTaskStateResult,
  NotifyMigrationTaskStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: NotifyMigrationTaskStateRequest,
  output: NotifyMigrationTaskStateResult,
  errors: [
    AccessDeniedException,
    DryRunOperation,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "NotifyMigrationTaskState",
}));

export type PutResourceAttributesError =
  | AccessDeniedException
  | DryRunOperation
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Provides identifying details of the resource being migrated so that it can be associated
 * in the Application Discovery Service repository. This association occurs asynchronously
 * after `PutResourceAttributes` returns.
 *
 * - Keep in mind that subsequent calls to PutResourceAttributes will override
 * previously stored attributes. For example, if it is first called with a MAC
 * address, but later, it is desired to *add* an IP address, it
 * will then be required to call it with *both* the IP and MAC
 * addresses to prevent overriding the MAC address.
 *
 * - Note the instructions regarding the special use case of the
 * `ResourceAttributeList`
 * parameter when specifying any
 * "VM" related value.
 *
 * Because this is an asynchronous call, it will always return 200, whether an
 * association occurs or not. To confirm if an association was found based on the provided
 * details, call `ListDiscoveredResources`.
 */
export const putResourceAttributes: API.OperationMethod<
  PutResourceAttributesRequest,
  PutResourceAttributesResult,
  PutResourceAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutResourceAttributesRequest,
  output: PutResourceAttributesResult,
  errors: [
    AccessDeniedException,
    DryRunOperation,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourceAttributes",
}));
