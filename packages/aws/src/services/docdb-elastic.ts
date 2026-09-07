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
  sdkId: "DocDB Elastic",
  serviceShapeName: "ChimeraDbLionfishServiceLambda",
});
const auth = T.AwsAuthSigv4({ name: "docdb-elastic" });
const ver = T.ServiceVersion("2022-11-28");
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
              `https://docdb-elastic-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://docdb-elastic-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://docdb-elastic.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://docdb-elastic.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
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
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.all(T.HttpError(429), T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.String,
      fieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type InputString = string;
export type OptInType = string;
export interface ApplyPendingMaintenanceActionInput {
  resourceArn: string;
  applyAction: string;
  optInType: string;
  applyOn?: string;
}
export const ApplyPendingMaintenanceActionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String,
    applyAction: S.String,
    optInType: S.String,
    applyOn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/pending-action" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ApplyPendingMaintenanceActionInput",
}) as any as S.Schema<ApplyPendingMaintenanceActionInput>;
export interface PendingMaintenanceActionDetails {
  action: string;
  autoAppliedAfterDate?: string;
  forcedApplyDate?: string;
  optInStatus?: string;
  currentApplyDate?: string;
  description?: string;
}
export const PendingMaintenanceActionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: S.String,
    autoAppliedAfterDate: S.optional(S.String),
    forcedApplyDate: S.optional(S.String),
    optInStatus: S.optional(S.String),
    currentApplyDate: S.optional(S.String),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "PendingMaintenanceActionDetails",
}) as any as S.Schema<PendingMaintenanceActionDetails>;
export type PendingMaintenanceActionDetailsList =
  PendingMaintenanceActionDetails[];
export const PendingMaintenanceActionDetailsList = /*@__PURE__*/ S.Array(
  PendingMaintenanceActionDetails,
);
export interface ResourcePendingMaintenanceAction {
  resourceArn?: string;
  pendingMaintenanceActionDetails?: PendingMaintenanceActionDetails[];
}
export const ResourcePendingMaintenanceAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.optional(S.String),
    pendingMaintenanceActionDetails: S.optional(
      PendingMaintenanceActionDetailsList,
    ),
  }),
).annotate({
  identifier: "ResourcePendingMaintenanceAction",
}) as any as S.Schema<ResourcePendingMaintenanceAction>;
export interface ApplyPendingMaintenanceActionOutput {
  resourcePendingMaintenanceAction: ResourcePendingMaintenanceAction;
}
export const ApplyPendingMaintenanceActionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourcePendingMaintenanceAction: ResourcePendingMaintenanceAction,
  }),
).annotate({
  identifier: "ApplyPendingMaintenanceActionOutput",
}) as any as S.Schema<ApplyPendingMaintenanceActionOutput>;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CopyClusterSnapshotInput {
  snapshotArn: string;
  targetSnapshotName: string;
  kmsKeyId?: string;
  copyTags?: boolean;
  tags?: { [key: string]: string | undefined };
}
export const CopyClusterSnapshotInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    snapshotArn: S.String.pipe(T.HttpLabel("snapshotArn")),
    targetSnapshotName: S.String,
    kmsKeyId: S.optional(S.String),
    copyTags: S.optional(S.Boolean),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/cluster-snapshot/{snapshotArn}/copy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CopyClusterSnapshotInput",
}) as any as S.Schema<CopyClusterSnapshotInput>;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export type Status = string;
export type SnapshotType = string;
export interface ClusterSnapshot {
  subnetIds: string[];
  snapshotName: string;
  snapshotArn: string;
  snapshotCreationTime: string;
  clusterArn: string;
  clusterCreationTime: string;
  status: string;
  vpcSecurityGroupIds: string[];
  adminUserName: string;
  kmsKeyId: string;
  snapshotType?: string;
}
export const ClusterSnapshot = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subnetIds: StringList,
    snapshotName: S.String,
    snapshotArn: S.String,
    snapshotCreationTime: S.String,
    clusterArn: S.String,
    clusterCreationTime: S.String,
    status: S.String,
    vpcSecurityGroupIds: StringList,
    adminUserName: S.String,
    kmsKeyId: S.String,
    snapshotType: S.optional(S.String),
  }),
).annotate({
  identifier: "ClusterSnapshot",
}) as any as S.Schema<ClusterSnapshot>;
export interface CopyClusterSnapshotOutput {
  snapshot: ClusterSnapshot;
}
export const CopyClusterSnapshotOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ snapshot: ClusterSnapshot }),
).annotate({
  identifier: "CopyClusterSnapshotOutput",
}) as any as S.Schema<CopyClusterSnapshotOutput>;
export type Auth = string;
export type Password = string | redacted.Redacted<string>;
export interface CreateClusterInput {
  clusterName: string;
  authType: string;
  adminUserName: string;
  adminUserPassword: string | redacted.Redacted<string>;
  shardCapacity: number;
  shardCount: number;
  vpcSecurityGroupIds?: string[];
  subnetIds?: string[];
  kmsKeyId?: string;
  clientToken?: string;
  preferredMaintenanceWindow?: string;
  tags?: { [key: string]: string | undefined };
  backupRetentionPeriod?: number;
  preferredBackupWindow?: string;
  shardInstanceCount?: number;
}
export const CreateClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String,
    authType: S.String,
    adminUserName: S.String,
    adminUserPassword: SensitiveString,
    shardCapacity: S.Number,
    shardCount: S.Number,
    vpcSecurityGroupIds: S.optional(StringList),
    subnetIds: S.optional(StringList),
    kmsKeyId: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    preferredMaintenanceWindow: S.optional(S.String),
    tags: S.optional(TagMap),
    backupRetentionPeriod: S.optional(S.Number),
    preferredBackupWindow: S.optional(S.String),
    shardInstanceCount: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/cluster" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateClusterInput",
}) as any as S.Schema<CreateClusterInput>;
export interface Shard {
  shardId: string;
  createTime: string;
  status: string;
}
export const Shard = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ shardId: S.String, createTime: S.String, status: S.String }),
).annotate({ identifier: "Shard" }) as any as S.Schema<Shard>;
export type ShardList = Shard[];
export const ShardList = /*@__PURE__*/ S.Array(Shard);
export interface Cluster {
  clusterName: string;
  clusterArn: string;
  status: string;
  clusterEndpoint?: string;
  createTime: string;
  adminUserName: string;
  authType: string;
  shardCapacity: number;
  shardCount: number;
  vpcSecurityGroupIds: string[];
  subnetIds: string[];
  preferredMaintenanceWindow: string;
  kmsKeyId: string;
  shards?: Shard[];
  backupRetentionPeriod?: number;
  preferredBackupWindow?: string;
  shardInstanceCount?: number;
}
export const Cluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String,
    clusterArn: S.String,
    status: S.String,
    clusterEndpoint: S.optional(S.String),
    createTime: S.String,
    adminUserName: S.String,
    authType: S.String,
    shardCapacity: S.Number,
    shardCount: S.Number,
    vpcSecurityGroupIds: StringList,
    subnetIds: StringList,
    preferredMaintenanceWindow: S.String,
    kmsKeyId: S.String,
    shards: S.optional(ShardList),
    backupRetentionPeriod: S.optional(S.Number),
    preferredBackupWindow: S.optional(S.String),
    shardInstanceCount: S.optional(S.Number),
  }),
).annotate({ identifier: "Cluster" }) as any as S.Schema<Cluster>;
export interface CreateClusterOutput {
  cluster: Cluster;
}
export const CreateClusterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cluster: Cluster }),
).annotate({
  identifier: "CreateClusterOutput",
}) as any as S.Schema<CreateClusterOutput>;
export interface CreateClusterSnapshotInput {
  clusterArn: string;
  snapshotName: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateClusterSnapshotInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterArn: S.String,
    snapshotName: S.String,
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/cluster-snapshot" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateClusterSnapshotInput",
}) as any as S.Schema<CreateClusterSnapshotInput>;
export interface CreateClusterSnapshotOutput {
  snapshot: ClusterSnapshot;
}
export const CreateClusterSnapshotOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ snapshot: ClusterSnapshot }),
).annotate({
  identifier: "CreateClusterSnapshotOutput",
}) as any as S.Schema<CreateClusterSnapshotOutput>;
export interface DeleteClusterInput {
  clusterArn: string;
}
export const DeleteClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ clusterArn: S.String.pipe(T.HttpLabel("clusterArn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/cluster/{clusterArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteClusterInput",
}) as any as S.Schema<DeleteClusterInput>;
export interface DeleteClusterOutput {
  cluster: Cluster;
}
export const DeleteClusterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cluster: Cluster }),
).annotate({
  identifier: "DeleteClusterOutput",
}) as any as S.Schema<DeleteClusterOutput>;
export interface DeleteClusterSnapshotInput {
  snapshotArn: string;
}
export const DeleteClusterSnapshotInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ snapshotArn: S.String.pipe(T.HttpLabel("snapshotArn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/cluster-snapshot/{snapshotArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteClusterSnapshotInput",
}) as any as S.Schema<DeleteClusterSnapshotInput>;
export interface DeleteClusterSnapshotOutput {
  snapshot: ClusterSnapshot;
}
export const DeleteClusterSnapshotOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ snapshot: ClusterSnapshot }),
).annotate({
  identifier: "DeleteClusterSnapshotOutput",
}) as any as S.Schema<DeleteClusterSnapshotOutput>;
export interface GetClusterInput {
  clusterArn: string;
}
export const GetClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ clusterArn: S.String.pipe(T.HttpLabel("clusterArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/cluster/{clusterArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetClusterInput",
}) as any as S.Schema<GetClusterInput>;
export interface GetClusterOutput {
  cluster: Cluster;
}
export const GetClusterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cluster: Cluster }),
).annotate({
  identifier: "GetClusterOutput",
}) as any as S.Schema<GetClusterOutput>;
export interface GetClusterSnapshotInput {
  snapshotArn: string;
}
export const GetClusterSnapshotInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ snapshotArn: S.String.pipe(T.HttpLabel("snapshotArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/cluster-snapshot/{snapshotArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetClusterSnapshotInput",
}) as any as S.Schema<GetClusterSnapshotInput>;
export interface GetClusterSnapshotOutput {
  snapshot: ClusterSnapshot;
}
export const GetClusterSnapshotOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ snapshot: ClusterSnapshot }),
).annotate({
  identifier: "GetClusterSnapshotOutput",
}) as any as S.Schema<GetClusterSnapshotOutput>;
export interface GetPendingMaintenanceActionInput {
  resourceArn: string;
}
export const GetPendingMaintenanceActionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/pending-action/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPendingMaintenanceActionInput",
}) as any as S.Schema<GetPendingMaintenanceActionInput>;
export interface GetPendingMaintenanceActionOutput {
  resourcePendingMaintenanceAction: ResourcePendingMaintenanceAction;
}
export const GetPendingMaintenanceActionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourcePendingMaintenanceAction: ResourcePendingMaintenanceAction,
  }),
).annotate({
  identifier: "GetPendingMaintenanceActionOutput",
}) as any as S.Schema<GetPendingMaintenanceActionOutput>;
export type PaginationToken = string;
export interface ListClustersInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListClustersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/clusters" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListClustersInput",
}) as any as S.Schema<ListClustersInput>;
export interface ClusterInList {
  clusterName: string;
  clusterArn: string;
  status: string;
}
export const ClusterInList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ clusterName: S.String, clusterArn: S.String, status: S.String }),
).annotate({ identifier: "ClusterInList" }) as any as S.Schema<ClusterInList>;
export type ClusterList = ClusterInList[];
export const ClusterList = /*@__PURE__*/ S.Array(ClusterInList);
export interface ListClustersOutput {
  clusters?: ClusterInList[];
  nextToken?: string;
}
export const ListClustersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusters: S.optional(ClusterList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListClustersOutput",
}) as any as S.Schema<ListClustersOutput>;
export interface ListClusterSnapshotsInput {
  clusterArn?: string;
  nextToken?: string;
  maxResults?: number;
  snapshotType?: string;
}
export const ListClusterSnapshotsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterArn: S.optional(S.String).pipe(T.HttpQuery("clusterArn")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    snapshotType: S.optional(S.String).pipe(T.HttpQuery("snapshotType")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/cluster-snapshots" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListClusterSnapshotsInput",
}) as any as S.Schema<ListClusterSnapshotsInput>;
export interface ClusterSnapshotInList {
  snapshotName: string;
  snapshotArn: string;
  clusterArn: string;
  status: string;
  snapshotCreationTime: string;
}
export const ClusterSnapshotInList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    snapshotName: S.String,
    snapshotArn: S.String,
    clusterArn: S.String,
    status: S.String,
    snapshotCreationTime: S.String,
  }),
).annotate({
  identifier: "ClusterSnapshotInList",
}) as any as S.Schema<ClusterSnapshotInList>;
export type ClusterSnapshotList = ClusterSnapshotInList[];
export const ClusterSnapshotList = /*@__PURE__*/ S.Array(ClusterSnapshotInList);
export interface ListClusterSnapshotsOutput {
  snapshots?: ClusterSnapshotInList[];
  nextToken?: string;
}
export const ListClusterSnapshotsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    snapshots: S.optional(ClusterSnapshotList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListClusterSnapshotsOutput",
}) as any as S.Schema<ListClusterSnapshotsOutput>;
export interface ListPendingMaintenanceActionsInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListPendingMaintenanceActionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/pending-actions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPendingMaintenanceActionsInput",
}) as any as S.Schema<ListPendingMaintenanceActionsInput>;
export type ResourcePendingMaintenanceActionList =
  ResourcePendingMaintenanceAction[];
export const ResourcePendingMaintenanceActionList = /*@__PURE__*/ S.Array(
  ResourcePendingMaintenanceAction,
);
export interface ListPendingMaintenanceActionsOutput {
  resourcePendingMaintenanceActions: ResourcePendingMaintenanceAction[];
  nextToken?: string;
}
export const ListPendingMaintenanceActionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourcePendingMaintenanceActions: ResourcePendingMaintenanceActionList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPendingMaintenanceActionsOutput",
}) as any as S.Schema<ListPendingMaintenanceActionsOutput>;
export type Arn = string;
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
export interface RestoreClusterFromSnapshotInput {
  clusterName: string;
  snapshotArn: string;
  vpcSecurityGroupIds?: string[];
  subnetIds?: string[];
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
  shardCapacity?: number;
  shardInstanceCount?: number;
}
export const RestoreClusterFromSnapshotInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String,
    snapshotArn: S.String.pipe(T.HttpLabel("snapshotArn")),
    vpcSecurityGroupIds: S.optional(StringList),
    subnetIds: S.optional(StringList),
    kmsKeyId: S.optional(S.String),
    tags: S.optional(TagMap),
    shardCapacity: S.optional(S.Number),
    shardInstanceCount: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/cluster-snapshot/{snapshotArn}/restore",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RestoreClusterFromSnapshotInput",
}) as any as S.Schema<RestoreClusterFromSnapshotInput>;
export interface RestoreClusterFromSnapshotOutput {
  cluster: Cluster;
}
export const RestoreClusterFromSnapshotOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cluster: Cluster }),
).annotate({
  identifier: "RestoreClusterFromSnapshotOutput",
}) as any as S.Schema<RestoreClusterFromSnapshotOutput>;
export interface StartClusterInput {
  clusterArn: string;
}
export const StartClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ clusterArn: S.String.pipe(T.HttpLabel("clusterArn")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/cluster/{clusterArn}/start" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartClusterInput",
}) as any as S.Schema<StartClusterInput>;
export interface StartClusterOutput {
  cluster: Cluster;
}
export const StartClusterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cluster: Cluster }),
).annotate({
  identifier: "StartClusterOutput",
}) as any as S.Schema<StartClusterOutput>;
export interface StopClusterInput {
  clusterArn: string;
}
export const StopClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ clusterArn: S.String.pipe(T.HttpLabel("clusterArn")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/cluster/{clusterArn}/stop" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopClusterInput",
}) as any as S.Schema<StopClusterInput>;
export interface StopClusterOutput {
  cluster: Cluster;
}
export const StopClusterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cluster: Cluster }),
).annotate({
  identifier: "StopClusterOutput",
}) as any as S.Schema<StopClusterOutput>;
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
export interface UpdateClusterInput {
  clusterArn: string;
  authType?: string;
  shardCapacity?: number;
  shardCount?: number;
  vpcSecurityGroupIds?: string[];
  subnetIds?: string[];
  adminUserPassword?: string | redacted.Redacted<string>;
  clientToken?: string;
  preferredMaintenanceWindow?: string;
  backupRetentionPeriod?: number;
  preferredBackupWindow?: string;
  shardInstanceCount?: number;
}
export const UpdateClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterArn: S.String.pipe(T.HttpLabel("clusterArn")),
    authType: S.optional(S.String),
    shardCapacity: S.optional(S.Number),
    shardCount: S.optional(S.Number),
    vpcSecurityGroupIds: S.optional(StringList),
    subnetIds: S.optional(StringList),
    adminUserPassword: S.optional(SensitiveString),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    preferredMaintenanceWindow: S.optional(S.String),
    backupRetentionPeriod: S.optional(S.Number),
    preferredBackupWindow: S.optional(S.String),
    shardInstanceCount: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/cluster/{clusterArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateClusterInput",
}) as any as S.Schema<UpdateClusterInput>;
export interface UpdateClusterOutput {
  cluster: Cluster;
}
export const UpdateClusterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cluster: Cluster }),
).annotate({
  identifier: "UpdateClusterOutput",
}) as any as S.Schema<UpdateClusterOutput>;
export type ValidationExceptionReason = string;
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
export type ApplyPendingMaintenanceActionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The type of pending maintenance action to be applied to the resource.
 */
export const applyPendingMaintenanceAction: API.OperationMethod<
  ApplyPendingMaintenanceActionInput,
  ApplyPendingMaintenanceActionOutput,
  ApplyPendingMaintenanceActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ApplyPendingMaintenanceActionInput,
  output: ApplyPendingMaintenanceActionOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ApplyPendingMaintenanceAction",
}));

export type CopyClusterSnapshotError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Copies a snapshot of an elastic cluster.
 */
export const copyClusterSnapshot: API.OperationMethod<
  CopyClusterSnapshotInput,
  CopyClusterSnapshotOutput,
  CopyClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CopyClusterSnapshotInput,
  output: CopyClusterSnapshotOutput,
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
  operationName: "CopyClusterSnapshot",
}));

export type CreateClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Amazon DocumentDB elastic cluster and returns its cluster structure.
 */
export const createCluster: API.OperationMethod<
  CreateClusterInput,
  CreateClusterOutput,
  CreateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateClusterInput,
  output: CreateClusterOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCluster",
}));

export type CreateClusterSnapshotError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a snapshot of an elastic cluster.
 */
export const createClusterSnapshot: API.OperationMethod<
  CreateClusterSnapshotInput,
  CreateClusterSnapshotOutput,
  CreateClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateClusterSnapshotInput,
  output: CreateClusterSnapshotOutput,
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
  operationName: "CreateClusterSnapshot",
}));

export type DeleteClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete an elastic cluster.
 */
export const deleteCluster: API.OperationMethod<
  DeleteClusterInput,
  DeleteClusterOutput,
  DeleteClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteClusterInput,
  output: DeleteClusterOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCluster",
}));

export type DeleteClusterSnapshotError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete an elastic cluster snapshot.
 */
export const deleteClusterSnapshot: API.OperationMethod<
  DeleteClusterSnapshotInput,
  DeleteClusterSnapshotOutput,
  DeleteClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteClusterSnapshotInput,
  output: DeleteClusterSnapshotOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClusterSnapshot",
}));

export type GetClusterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specific elastic cluster.
 */
export const getCluster: API.OperationMethod<
  GetClusterInput,
  GetClusterOutput,
  GetClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetClusterInput,
  output: GetClusterOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCluster",
}));

export type GetClusterSnapshotError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specific elastic cluster snapshot
 */
export const getClusterSnapshot: API.OperationMethod<
  GetClusterSnapshotInput,
  GetClusterSnapshotOutput,
  GetClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetClusterSnapshotInput,
  output: GetClusterSnapshotOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClusterSnapshot",
}));

export type GetPendingMaintenanceActionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves all maintenance actions that are pending.
 */
export const getPendingMaintenanceAction: API.OperationMethod<
  GetPendingMaintenanceActionInput,
  GetPendingMaintenanceActionOutput,
  GetPendingMaintenanceActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPendingMaintenanceActionInput,
  output: GetPendingMaintenanceActionOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPendingMaintenanceAction",
}));

export type ListClustersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about provisioned Amazon DocumentDB elastic clusters.
 */
export const listClusters: API.PaginatedOperationMethod<
  ListClustersInput,
  ListClustersOutput,
  ListClustersError,
  Credentials | HttpClient.HttpClient,
  ClusterInList
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListClustersInput,
  output: ListClustersOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClusters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "clusters",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListClusterSnapshotsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about snapshots for a specified elastic cluster.
 */
export const listClusterSnapshots: API.PaginatedOperationMethod<
  ListClusterSnapshotsInput,
  ListClusterSnapshotsOutput,
  ListClusterSnapshotsError,
  Credentials | HttpClient.HttpClient,
  ClusterSnapshotInList
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListClusterSnapshotsInput,
  output: ListClusterSnapshotsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClusterSnapshots",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "snapshots",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPendingMaintenanceActionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all maintenance actions that are pending.
 */
export const listPendingMaintenanceActions: API.PaginatedOperationMethod<
  ListPendingMaintenanceActionsInput,
  ListPendingMaintenanceActionsOutput,
  ListPendingMaintenanceActionsError,
  Credentials | HttpClient.HttpClient,
  ResourcePendingMaintenanceAction
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPendingMaintenanceActionsInput,
  output: ListPendingMaintenanceActionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPendingMaintenanceActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "resourcePendingMaintenanceActions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all tags on a elastic cluster resource
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
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type RestoreClusterFromSnapshotError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Restores an elastic cluster from a snapshot.
 */
export const restoreClusterFromSnapshot: API.OperationMethod<
  RestoreClusterFromSnapshotInput,
  RestoreClusterFromSnapshotOutput,
  RestoreClusterFromSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestoreClusterFromSnapshotInput,
  output: RestoreClusterFromSnapshotOutput,
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
  operationName: "RestoreClusterFromSnapshot",
}));

export type StartClusterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Restarts the stopped elastic cluster that is specified by `clusterARN`.
 */
export const startCluster: API.OperationMethod<
  StartClusterInput,
  StartClusterOutput,
  StartClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartClusterInput,
  output: StartClusterOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCluster",
}));

export type StopClusterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops the running elastic cluster that is specified by `clusterArn`.
 * The elastic cluster must be in the *available* state.
 */
export const stopCluster: API.OperationMethod<
  StopClusterInput,
  StopClusterOutput,
  StopClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopClusterInput,
  output: StopClusterOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopCluster",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds metadata tags to an elastic cluster resource
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
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes metadata tags from an elastic cluster resource
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
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Modifies an elastic cluster. This includes updating admin-username/password,
 * upgrading the API version, and setting up a backup window and maintenance window
 */
export const updateCluster: API.OperationMethod<
  UpdateClusterInput,
  UpdateClusterOutput,
  UpdateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateClusterInput,
  output: UpdateClusterOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCluster",
}));
