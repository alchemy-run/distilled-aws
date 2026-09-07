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
  sdkId: "CodeStar connections",
  serviceShapeName: "CodeStar_connections_20191201",
});
const auth = T.AwsAuthSigv4({ name: "codestar-connections" });
const ver = T.ServiceVersion("2019-12-01");
const proto = T.AwsProtocolsAwsJson1_0();
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
              `https://codestar-connections-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://codestar-connections-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://codestar-connections.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://codestar-connections.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ConditionalCheckFailedException
  extends /*@__PURE__*/ S.TaggedError<ConditionalCheckFailedException>()(
    "ConditionalCheckFailedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
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
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()(
    "InvalidInputException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ResourceUnavailableException>()(
    "ResourceUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class RetryLatestCommitFailedException
  extends /*@__PURE__*/ S.TaggedError<RetryLatestCommitFailedException>()(
    "RetryLatestCommitFailedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class SyncBlockerDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<SyncBlockerDoesNotExistException>()(
    "SyncBlockerDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class SyncConfigurationStillExistsException
  extends /*@__PURE__*/ S.TaggedError<SyncConfigurationStillExistsException>()(
    "SyncConfigurationStillExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperationException>()(
    "UnsupportedOperationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedProviderTypeException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedProviderTypeException>()(
    "UnsupportedProviderTypeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UpdateOutOfSyncException
  extends /*@__PURE__*/ S.TaggedError<UpdateOutOfSyncException>()(
    "UpdateOutOfSyncException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export type ProviderType =
  | "Bitbucket"
  | "GitHub"
  | "GitHubEnterpriseServer"
  | "GitLab"
  | "GitLabSelfManaged"
  | (string & {});
export const ProviderType = /*@__PURE__*/ S.String;

export type ConnectionName = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export type HostArn = string;
export interface CreateConnectionInput {
  ProviderType?: ProviderType;
  ConnectionName: string;
  Tags?: Tag[];
  HostArn?: string;
}
export const CreateConnectionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProviderType: S.optional(ProviderType),
    ConnectionName: S.String,
    Tags: S.optional(TagList),
    HostArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateConnectionInput",
}) as any as S.Schema<CreateConnectionInput>;
export type ConnectionArn = string;
export interface CreateConnectionOutput {
  ConnectionArn: string;
  Tags?: Tag[];
}
export const CreateConnectionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConnectionArn: S.String, Tags: S.optional(TagList) }),
).annotate({
  identifier: "CreateConnectionOutput",
}) as any as S.Schema<CreateConnectionOutput>;
export type HostName = string;
export type Url = string;
export type VpcId = string;
export type SubnetId = string;
export type SubnetIds = string[];
export const SubnetIds = /*@__PURE__*/ S.Array(S.String);
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export const SecurityGroupIds = /*@__PURE__*/ S.Array(S.String);
export type TlsCertificate = string;
export interface VpcConfiguration {
  VpcId: string;
  SubnetIds: string[];
  SecurityGroupIds: string[];
  TlsCertificate?: string;
}
export const VpcConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcId: S.String,
    SubnetIds: SubnetIds,
    SecurityGroupIds: SecurityGroupIds,
    TlsCertificate: S.optional(S.String),
  }),
).annotate({
  identifier: "VpcConfiguration",
}) as any as S.Schema<VpcConfiguration>;
export interface CreateHostInput {
  Name: string;
  ProviderType: ProviderType;
  ProviderEndpoint: string;
  VpcConfiguration?: VpcConfiguration;
  Tags?: Tag[];
}
export const CreateHostInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    ProviderType: ProviderType,
    ProviderEndpoint: S.String,
    VpcConfiguration: S.optional(VpcConfiguration),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateHostInput",
}) as any as S.Schema<CreateHostInput>;
export interface CreateHostOutput {
  HostArn?: string;
  Tags?: Tag[];
}
export const CreateHostOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HostArn: S.optional(S.String), Tags: S.optional(TagList) }),
).annotate({
  identifier: "CreateHostOutput",
}) as any as S.Schema<CreateHostOutput>;
export type OwnerId = string;
export type RepositoryName = string;
export type KmsKeyArn = string;
export interface CreateRepositoryLinkInput {
  ConnectionArn: string;
  OwnerId: string;
  RepositoryName: string;
  EncryptionKeyArn?: string;
  Tags?: Tag[];
}
export const CreateRepositoryLinkInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionArn: S.String,
    OwnerId: S.String,
    RepositoryName: S.String,
    EncryptionKeyArn: S.optional(S.String),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateRepositoryLinkInput",
}) as any as S.Schema<CreateRepositoryLinkInput>;
export type RepositoryLinkArn = string;
export type RepositoryLinkId = string;
export interface RepositoryLinkInfo {
  ConnectionArn: string;
  EncryptionKeyArn?: string;
  OwnerId: string;
  ProviderType: ProviderType;
  RepositoryLinkArn: string;
  RepositoryLinkId: string;
  RepositoryName: string;
}
export const RepositoryLinkInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionArn: S.String,
    EncryptionKeyArn: S.optional(S.String),
    OwnerId: S.String,
    ProviderType: ProviderType,
    RepositoryLinkArn: S.String,
    RepositoryLinkId: S.String,
    RepositoryName: S.String,
  }),
).annotate({
  identifier: "RepositoryLinkInfo",
}) as any as S.Schema<RepositoryLinkInfo>;
export interface CreateRepositoryLinkOutput {
  RepositoryLinkInfo: RepositoryLinkInfo;
}
export const CreateRepositoryLinkOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RepositoryLinkInfo: RepositoryLinkInfo }),
).annotate({
  identifier: "CreateRepositoryLinkOutput",
}) as any as S.Schema<CreateRepositoryLinkOutput>;
export type BranchName = string;
export type DeploymentFilePath = string;
export type ResourceName = string;
export type IamRoleArn = string;
export type SyncConfigurationType = "CFN_STACK_SYNC" | (string & {});
export const SyncConfigurationType = /*@__PURE__*/ S.String;

export type PublishDeploymentStatus = "ENABLED" | "DISABLED" | (string & {});
export const PublishDeploymentStatus = /*@__PURE__*/ S.String;

export type TriggerResourceUpdateOn =
  | "ANY_CHANGE"
  | "FILE_CHANGE"
  | (string & {});
export const TriggerResourceUpdateOn = /*@__PURE__*/ S.String;

export interface CreateSyncConfigurationInput {
  Branch: string;
  ConfigFile: string;
  RepositoryLinkId: string;
  ResourceName: string;
  RoleArn: string;
  SyncType: SyncConfigurationType;
  PublishDeploymentStatus?: PublishDeploymentStatus;
  TriggerResourceUpdateOn?: TriggerResourceUpdateOn;
}
export const CreateSyncConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Branch: S.String,
    ConfigFile: S.String,
    RepositoryLinkId: S.String,
    ResourceName: S.String,
    RoleArn: S.String,
    SyncType: SyncConfigurationType,
    PublishDeploymentStatus: S.optional(PublishDeploymentStatus),
    TriggerResourceUpdateOn: S.optional(TriggerResourceUpdateOn),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateSyncConfigurationInput",
}) as any as S.Schema<CreateSyncConfigurationInput>;
export interface SyncConfiguration {
  Branch: string;
  ConfigFile?: string;
  OwnerId: string;
  ProviderType: ProviderType;
  RepositoryLinkId: string;
  RepositoryName: string;
  ResourceName: string;
  RoleArn: string;
  SyncType: SyncConfigurationType;
  PublishDeploymentStatus?: PublishDeploymentStatus;
  TriggerResourceUpdateOn?: TriggerResourceUpdateOn;
}
export const SyncConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Branch: S.String,
    ConfigFile: S.optional(S.String),
    OwnerId: S.String,
    ProviderType: ProviderType,
    RepositoryLinkId: S.String,
    RepositoryName: S.String,
    ResourceName: S.String,
    RoleArn: S.String,
    SyncType: SyncConfigurationType,
    PublishDeploymentStatus: S.optional(PublishDeploymentStatus),
    TriggerResourceUpdateOn: S.optional(TriggerResourceUpdateOn),
  }),
).annotate({
  identifier: "SyncConfiguration",
}) as any as S.Schema<SyncConfiguration>;
export interface CreateSyncConfigurationOutput {
  SyncConfiguration: SyncConfiguration;
}
export const CreateSyncConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SyncConfiguration: SyncConfiguration }),
).annotate({
  identifier: "CreateSyncConfigurationOutput",
}) as any as S.Schema<CreateSyncConfigurationOutput>;
export interface DeleteConnectionInput {
  ConnectionArn: string;
}
export const DeleteConnectionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConnectionArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteConnectionInput",
}) as any as S.Schema<DeleteConnectionInput>;
export interface DeleteConnectionOutput {}
export const DeleteConnectionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteConnectionOutput",
}) as any as S.Schema<DeleteConnectionOutput>;
export interface DeleteHostInput {
  HostArn: string;
}
export const DeleteHostInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HostArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteHostInput",
}) as any as S.Schema<DeleteHostInput>;
export interface DeleteHostOutput {}
export const DeleteHostOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteHostOutput",
}) as any as S.Schema<DeleteHostOutput>;
export interface DeleteRepositoryLinkInput {
  RepositoryLinkId: string;
}
export const DeleteRepositoryLinkInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RepositoryLinkId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteRepositoryLinkInput",
}) as any as S.Schema<DeleteRepositoryLinkInput>;
export interface DeleteRepositoryLinkOutput {}
export const DeleteRepositoryLinkOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRepositoryLinkOutput",
}) as any as S.Schema<DeleteRepositoryLinkOutput>;
export interface DeleteSyncConfigurationInput {
  SyncType: SyncConfigurationType;
  ResourceName: string;
}
export const DeleteSyncConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SyncType: SyncConfigurationType, ResourceName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteSyncConfigurationInput",
}) as any as S.Schema<DeleteSyncConfigurationInput>;
export interface DeleteSyncConfigurationOutput {}
export const DeleteSyncConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSyncConfigurationOutput",
}) as any as S.Schema<DeleteSyncConfigurationOutput>;
export interface GetConnectionInput {
  ConnectionArn: string;
}
export const GetConnectionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConnectionArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetConnectionInput",
}) as any as S.Schema<GetConnectionInput>;
export type AccountId = string;
export type ConnectionStatus =
  | "PENDING"
  | "AVAILABLE"
  | "ERROR"
  | (string & {});
export const ConnectionStatus = /*@__PURE__*/ S.String;

export interface Connection {
  ConnectionName?: string;
  ConnectionArn?: string;
  ProviderType?: ProviderType;
  OwnerAccountId?: string;
  ConnectionStatus?: ConnectionStatus;
  HostArn?: string;
}
export const Connection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionName: S.optional(S.String),
    ConnectionArn: S.optional(S.String),
    ProviderType: S.optional(ProviderType),
    OwnerAccountId: S.optional(S.String),
    ConnectionStatus: S.optional(ConnectionStatus),
    HostArn: S.optional(S.String),
  }),
).annotate({ identifier: "Connection" }) as any as S.Schema<Connection>;
export interface GetConnectionOutput {
  Connection?: Connection;
}
export const GetConnectionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Connection: S.optional(Connection) }),
).annotate({
  identifier: "GetConnectionOutput",
}) as any as S.Schema<GetConnectionOutput>;
export interface GetHostInput {
  HostArn: string;
}
export const GetHostInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HostArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({ identifier: "GetHostInput" }) as any as S.Schema<GetHostInput>;
export type HostStatus = string;
export interface GetHostOutput {
  Name?: string;
  Status?: string;
  ProviderType?: ProviderType;
  ProviderEndpoint?: string;
  VpcConfiguration?: VpcConfiguration;
}
export const GetHostOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Status: S.optional(S.String),
    ProviderType: S.optional(ProviderType),
    ProviderEndpoint: S.optional(S.String),
    VpcConfiguration: S.optional(VpcConfiguration),
  }),
).annotate({ identifier: "GetHostOutput" }) as any as S.Schema<GetHostOutput>;
export interface GetRepositoryLinkInput {
  RepositoryLinkId: string;
}
export const GetRepositoryLinkInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RepositoryLinkId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetRepositoryLinkInput",
}) as any as S.Schema<GetRepositoryLinkInput>;
export interface GetRepositoryLinkOutput {
  RepositoryLinkInfo: RepositoryLinkInfo;
}
export const GetRepositoryLinkOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RepositoryLinkInfo: RepositoryLinkInfo }),
).annotate({
  identifier: "GetRepositoryLinkOutput",
}) as any as S.Schema<GetRepositoryLinkOutput>;
export interface GetRepositorySyncStatusInput {
  Branch: string;
  RepositoryLinkId: string;
  SyncType: SyncConfigurationType;
}
export const GetRepositorySyncStatusInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Branch: S.String,
    RepositoryLinkId: S.String,
    SyncType: SyncConfigurationType,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetRepositorySyncStatusInput",
}) as any as S.Schema<GetRepositorySyncStatusInput>;
export type RepositorySyncStatus =
  | "FAILED"
  | "INITIATED"
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "QUEUED"
  | (string & {});
export const RepositorySyncStatus = /*@__PURE__*/ S.String;

export type Event = string;
export type ExternalId = string;
export type Type = string;
export interface RepositorySyncEvent {
  Event: string;
  ExternalId?: string;
  Time: Date;
  Type: string;
}
export const RepositorySyncEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Event: S.String,
    ExternalId: S.optional(S.String),
    Time: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Type: S.String,
  }),
).annotate({
  identifier: "RepositorySyncEvent",
}) as any as S.Schema<RepositorySyncEvent>;
export type RepositorySyncEventList = RepositorySyncEvent[];
export const RepositorySyncEventList =
  /*@__PURE__*/ S.Array(RepositorySyncEvent);
export interface RepositorySyncAttempt {
  StartedAt: Date;
  Status: RepositorySyncStatus;
  Events: RepositorySyncEvent[];
}
export const RepositorySyncAttempt = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Status: RepositorySyncStatus,
    Events: RepositorySyncEventList,
  }),
).annotate({
  identifier: "RepositorySyncAttempt",
}) as any as S.Schema<RepositorySyncAttempt>;
export interface GetRepositorySyncStatusOutput {
  LatestSync: RepositorySyncAttempt;
}
export const GetRepositorySyncStatusOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LatestSync: RepositorySyncAttempt }),
).annotate({
  identifier: "GetRepositorySyncStatusOutput",
}) as any as S.Schema<GetRepositorySyncStatusOutput>;
export interface GetResourceSyncStatusInput {
  ResourceName: string;
  SyncType: SyncConfigurationType;
}
export const GetResourceSyncStatusInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceName: S.String, SyncType: SyncConfigurationType }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetResourceSyncStatusInput",
}) as any as S.Schema<GetResourceSyncStatusInput>;
export type Directory = string;
export type SHA = string;
export interface Revision {
  Branch: string;
  Directory: string;
  OwnerId: string;
  RepositoryName: string;
  ProviderType: ProviderType;
  Sha: string;
}
export const Revision = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Branch: S.String,
    Directory: S.String,
    OwnerId: S.String,
    RepositoryName: S.String,
    ProviderType: ProviderType,
    Sha: S.String,
  }),
).annotate({ identifier: "Revision" }) as any as S.Schema<Revision>;
export interface ResourceSyncEvent {
  Event: string;
  ExternalId?: string;
  Time: Date;
  Type: string;
}
export const ResourceSyncEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Event: S.String,
    ExternalId: S.optional(S.String),
    Time: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Type: S.String,
  }),
).annotate({
  identifier: "ResourceSyncEvent",
}) as any as S.Schema<ResourceSyncEvent>;
export type ResourceSyncEventList = ResourceSyncEvent[];
export const ResourceSyncEventList = /*@__PURE__*/ S.Array(ResourceSyncEvent);
export type ResourceSyncStatus =
  | "FAILED"
  | "INITIATED"
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | (string & {});
export const ResourceSyncStatus = /*@__PURE__*/ S.String;

export type Target = string;
export interface ResourceSyncAttempt {
  Events: ResourceSyncEvent[];
  InitialRevision: Revision;
  StartedAt: Date;
  Status: ResourceSyncStatus;
  TargetRevision: Revision;
  Target: string;
}
export const ResourceSyncAttempt = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Events: ResourceSyncEventList,
    InitialRevision: Revision,
    StartedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Status: ResourceSyncStatus,
    TargetRevision: Revision,
    Target: S.String,
  }),
).annotate({
  identifier: "ResourceSyncAttempt",
}) as any as S.Schema<ResourceSyncAttempt>;
export interface GetResourceSyncStatusOutput {
  DesiredState?: Revision;
  LatestSuccessfulSync?: ResourceSyncAttempt;
  LatestSync: ResourceSyncAttempt;
}
export const GetResourceSyncStatusOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DesiredState: S.optional(Revision),
    LatestSuccessfulSync: S.optional(ResourceSyncAttempt),
    LatestSync: ResourceSyncAttempt,
  }),
).annotate({
  identifier: "GetResourceSyncStatusOutput",
}) as any as S.Schema<GetResourceSyncStatusOutput>;
export interface GetSyncBlockerSummaryInput {
  SyncType: SyncConfigurationType;
  ResourceName: string;
}
export const GetSyncBlockerSummaryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SyncType: SyncConfigurationType, ResourceName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetSyncBlockerSummaryInput",
}) as any as S.Schema<GetSyncBlockerSummaryInput>;
export type Id = string;
export type BlockerType = "AUTOMATED" | (string & {});
export const BlockerType = /*@__PURE__*/ S.String;

export type BlockerStatus = "ACTIVE" | "RESOLVED" | (string & {});
export const BlockerStatus = /*@__PURE__*/ S.String;

export type CreatedReason = string;
export type SyncBlockerContextKey = string;
export type SyncBlockerContextValue = string;
export interface SyncBlockerContext {
  Key: string;
  Value: string;
}
export const SyncBlockerContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({
  identifier: "SyncBlockerContext",
}) as any as S.Schema<SyncBlockerContext>;
export type SyncBlockerContextList = SyncBlockerContext[];
export const SyncBlockerContextList = /*@__PURE__*/ S.Array(SyncBlockerContext);
export type ResolvedReason = string;
export interface SyncBlocker {
  Id: string;
  Type: BlockerType;
  Status: BlockerStatus;
  CreatedReason: string;
  CreatedAt: Date;
  Contexts?: SyncBlockerContext[];
  ResolvedReason?: string;
  ResolvedAt?: Date;
}
export const SyncBlocker = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    Type: BlockerType,
    Status: BlockerStatus,
    CreatedReason: S.String,
    CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Contexts: S.optional(SyncBlockerContextList),
    ResolvedReason: S.optional(S.String),
    ResolvedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "SyncBlocker" }) as any as S.Schema<SyncBlocker>;
export type LatestSyncBlockerList = SyncBlocker[];
export const LatestSyncBlockerList = /*@__PURE__*/ S.Array(SyncBlocker);
export interface SyncBlockerSummary {
  ResourceName: string;
  ParentResourceName?: string;
  LatestBlockers?: SyncBlocker[];
}
export const SyncBlockerSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceName: S.String,
    ParentResourceName: S.optional(S.String),
    LatestBlockers: S.optional(LatestSyncBlockerList),
  }),
).annotate({
  identifier: "SyncBlockerSummary",
}) as any as S.Schema<SyncBlockerSummary>;
export interface GetSyncBlockerSummaryOutput {
  SyncBlockerSummary: SyncBlockerSummary;
}
export const GetSyncBlockerSummaryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SyncBlockerSummary: SyncBlockerSummary }),
).annotate({
  identifier: "GetSyncBlockerSummaryOutput",
}) as any as S.Schema<GetSyncBlockerSummaryOutput>;
export interface GetSyncConfigurationInput {
  SyncType: SyncConfigurationType;
  ResourceName: string;
}
export const GetSyncConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SyncType: SyncConfigurationType, ResourceName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetSyncConfigurationInput",
}) as any as S.Schema<GetSyncConfigurationInput>;
export interface GetSyncConfigurationOutput {
  SyncConfiguration: SyncConfiguration;
}
export const GetSyncConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SyncConfiguration: SyncConfiguration }),
).annotate({
  identifier: "GetSyncConfigurationOutput",
}) as any as S.Schema<GetSyncConfigurationOutput>;
export type MaxResults = number;
export type NextToken = string;
export interface ListConnectionsInput {
  ProviderTypeFilter?: ProviderType;
  HostArnFilter?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListConnectionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProviderTypeFilter: S.optional(ProviderType),
    HostArnFilter: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListConnectionsInput",
}) as any as S.Schema<ListConnectionsInput>;
export type ConnectionList = Connection[];
export const ConnectionList = /*@__PURE__*/ S.Array(Connection);
export interface ListConnectionsOutput {
  Connections?: Connection[];
  NextToken?: string;
}
export const ListConnectionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Connections: S.optional(ConnectionList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListConnectionsOutput",
}) as any as S.Schema<ListConnectionsOutput>;
export interface ListHostsInput {
  MaxResults?: number;
  NextToken?: string;
}
export const ListHostsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({ identifier: "ListHostsInput" }) as any as S.Schema<ListHostsInput>;
export type HostStatusMessage = string;
export interface Host {
  Name?: string;
  HostArn?: string;
  ProviderType?: ProviderType;
  ProviderEndpoint?: string;
  VpcConfiguration?: VpcConfiguration;
  Status?: string;
  StatusMessage?: string;
}
export const Host = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    HostArn: S.optional(S.String),
    ProviderType: S.optional(ProviderType),
    ProviderEndpoint: S.optional(S.String),
    VpcConfiguration: S.optional(VpcConfiguration),
    Status: S.optional(S.String),
    StatusMessage: S.optional(S.String),
  }),
).annotate({ identifier: "Host" }) as any as S.Schema<Host>;
export type HostList = Host[];
export const HostList = /*@__PURE__*/ S.Array(Host);
export interface ListHostsOutput {
  Hosts?: Host[];
  NextToken?: string;
}
export const ListHostsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Hosts: S.optional(HostList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListHostsOutput",
}) as any as S.Schema<ListHostsOutput>;
export type SharpNextToken = string;
export interface ListRepositoryLinksInput {
  MaxResults?: number;
  NextToken?: string;
}
export const ListRepositoryLinksInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRepositoryLinksInput",
}) as any as S.Schema<ListRepositoryLinksInput>;
export type RepositoryLinkList = RepositoryLinkInfo[];
export const RepositoryLinkList = /*@__PURE__*/ S.Array(RepositoryLinkInfo);
export interface ListRepositoryLinksOutput {
  RepositoryLinks: RepositoryLinkInfo[];
  NextToken?: string;
}
export const ListRepositoryLinksOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RepositoryLinks: RepositoryLinkList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRepositoryLinksOutput",
}) as any as S.Schema<ListRepositoryLinksOutput>;
export interface ListRepositorySyncDefinitionsInput {
  RepositoryLinkId: string;
  SyncType: SyncConfigurationType;
}
export const ListRepositorySyncDefinitionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RepositoryLinkId: S.String,
    SyncType: SyncConfigurationType,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRepositorySyncDefinitionsInput",
}) as any as S.Schema<ListRepositorySyncDefinitionsInput>;
export type Parent = string;
export interface RepositorySyncDefinition {
  Branch: string;
  Directory: string;
  Parent: string;
  Target: string;
}
export const RepositorySyncDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Branch: S.String,
    Directory: S.String,
    Parent: S.String,
    Target: S.String,
  }),
).annotate({
  identifier: "RepositorySyncDefinition",
}) as any as S.Schema<RepositorySyncDefinition>;
export type RepositorySyncDefinitionList = RepositorySyncDefinition[];
export const RepositorySyncDefinitionList = /*@__PURE__*/ S.Array(
  RepositorySyncDefinition,
);
export interface ListRepositorySyncDefinitionsOutput {
  RepositorySyncDefinitions: RepositorySyncDefinition[];
  NextToken?: string;
}
export const ListRepositorySyncDefinitionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RepositorySyncDefinitions: RepositorySyncDefinitionList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRepositorySyncDefinitionsOutput",
}) as any as S.Schema<ListRepositorySyncDefinitionsOutput>;
export interface ListSyncConfigurationsInput {
  MaxResults?: number;
  NextToken?: string;
  RepositoryLinkId: string;
  SyncType: SyncConfigurationType;
}
export const ListSyncConfigurationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    RepositoryLinkId: S.String,
    SyncType: SyncConfigurationType,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListSyncConfigurationsInput",
}) as any as S.Schema<ListSyncConfigurationsInput>;
export type SyncConfigurationList = SyncConfiguration[];
export const SyncConfigurationList = /*@__PURE__*/ S.Array(SyncConfiguration);
export interface ListSyncConfigurationsOutput {
  SyncConfigurations: SyncConfiguration[];
  NextToken?: string;
}
export const ListSyncConfigurationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SyncConfigurations: SyncConfigurationList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSyncConfigurationsOutput",
}) as any as S.Schema<ListSyncConfigurationsOutput>;
export type AmazonResourceName = string;
export interface ListTagsForResourceInput {
  ResourceArn: string;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  Tags?: Tag[];
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export interface TagResourceInput {
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: TagList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
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
  S.Struct({ ResourceArn: S.String, TagKeys: TagKeyList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
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
export interface UpdateHostInput {
  HostArn: string;
  ProviderEndpoint?: string;
  VpcConfiguration?: VpcConfiguration;
}
export const UpdateHostInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HostArn: S.String,
    ProviderEndpoint: S.optional(S.String),
    VpcConfiguration: S.optional(VpcConfiguration),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateHostInput",
}) as any as S.Schema<UpdateHostInput>;
export interface UpdateHostOutput {}
export const UpdateHostOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateHostOutput",
}) as any as S.Schema<UpdateHostOutput>;
export interface UpdateRepositoryLinkInput {
  ConnectionArn?: string;
  EncryptionKeyArn?: string;
  RepositoryLinkId: string;
}
export const UpdateRepositoryLinkInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionArn: S.optional(S.String),
    EncryptionKeyArn: S.optional(S.String),
    RepositoryLinkId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateRepositoryLinkInput",
}) as any as S.Schema<UpdateRepositoryLinkInput>;
export interface UpdateRepositoryLinkOutput {
  RepositoryLinkInfo: RepositoryLinkInfo;
}
export const UpdateRepositoryLinkOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RepositoryLinkInfo: RepositoryLinkInfo }),
).annotate({
  identifier: "UpdateRepositoryLinkOutput",
}) as any as S.Schema<UpdateRepositoryLinkOutput>;
export interface UpdateSyncBlockerInput {
  Id: string;
  SyncType: SyncConfigurationType;
  ResourceName: string;
  ResolvedReason: string;
}
export const UpdateSyncBlockerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    SyncType: SyncConfigurationType,
    ResourceName: S.String,
    ResolvedReason: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateSyncBlockerInput",
}) as any as S.Schema<UpdateSyncBlockerInput>;
export interface UpdateSyncBlockerOutput {
  ResourceName: string;
  ParentResourceName?: string;
  SyncBlocker: SyncBlocker;
}
export const UpdateSyncBlockerOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceName: S.String,
    ParentResourceName: S.optional(S.String),
    SyncBlocker: SyncBlocker,
  }),
).annotate({
  identifier: "UpdateSyncBlockerOutput",
}) as any as S.Schema<UpdateSyncBlockerOutput>;
export interface UpdateSyncConfigurationInput {
  Branch?: string;
  ConfigFile?: string;
  RepositoryLinkId?: string;
  ResourceName: string;
  RoleArn?: string;
  SyncType: SyncConfigurationType;
  PublishDeploymentStatus?: PublishDeploymentStatus;
  TriggerResourceUpdateOn?: TriggerResourceUpdateOn;
}
export const UpdateSyncConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Branch: S.optional(S.String),
    ConfigFile: S.optional(S.String),
    RepositoryLinkId: S.optional(S.String),
    ResourceName: S.String,
    RoleArn: S.optional(S.String),
    SyncType: SyncConfigurationType,
    PublishDeploymentStatus: S.optional(PublishDeploymentStatus),
    TriggerResourceUpdateOn: S.optional(TriggerResourceUpdateOn),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateSyncConfigurationInput",
}) as any as S.Schema<UpdateSyncConfigurationInput>;
export interface UpdateSyncConfigurationOutput {
  SyncConfiguration: SyncConfiguration;
}
export const UpdateSyncConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SyncConfiguration: SyncConfiguration }),
).annotate({
  identifier: "UpdateSyncConfigurationOutput",
}) as any as S.Schema<UpdateSyncConfigurationOutput>;
export type ErrorMessage = string;
export type CreateConnectionError =
  | LimitExceededException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | CommonErrors;
/**
 * Creates a connection that can then be given to other Amazon Web Services services like CodePipeline so
 * that it can access third-party code repositories. The connection is in pending status until
 * the third-party connection handshake is completed from the console.
 */
export const createConnection: API.OperationMethod<
  CreateConnectionInput,
  CreateConnectionOutput,
  CreateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConnectionInput,
  output: CreateConnectionOutput,
  errors: [
    LimitExceededException,
    ResourceNotFoundException,
    ResourceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnection",
}));

export type CreateHostError = LimitExceededException | CommonErrors;
/**
 * Creates a resource that represents the infrastructure where a third-party provider is
 * installed. The host is used when you create connections to an installed third-party provider
 * type, such as GitHub Enterprise Server. You create one host for all connections to that
 * provider.
 *
 * A host created through the CLI or the SDK is in `PENDING` status by
 * default. You can make its status `AVAILABLE` by setting up the host in the console.
 */
export const createHost: API.OperationMethod<
  CreateHostInput,
  CreateHostOutput,
  CreateHostError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateHostInput,
  output: CreateHostOutput,
  errors: [LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHost",
}));

export type CreateRepositoryLinkError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InternalServerException
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a link to a specified external Git repository. A repository link allows Git sync to monitor and sync changes to files in a specified Git repository.
 */
export const createRepositoryLink: API.OperationMethod<
  CreateRepositoryLinkInput,
  CreateRepositoryLinkOutput,
  CreateRepositoryLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRepositoryLinkInput,
  output: CreateRepositoryLinkOutput,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InternalServerException,
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRepositoryLink",
}));

export type CreateSyncConfigurationError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InternalServerException
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a sync configuration which allows Amazon Web Services to sync content from a Git
 * repository to update a specified Amazon Web Services resource. Parameters for the sync
 * configuration are determined by the sync type.
 */
export const createSyncConfiguration: API.OperationMethod<
  CreateSyncConfigurationInput,
  CreateSyncConfigurationOutput,
  CreateSyncConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSyncConfigurationInput,
  output: CreateSyncConfigurationOutput,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InternalServerException,
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSyncConfiguration",
}));

export type DeleteConnectionError = ResourceNotFoundException | CommonErrors;
/**
 * The connection to be deleted.
 */
export const deleteConnection: API.OperationMethod<
  DeleteConnectionInput,
  DeleteConnectionOutput,
  DeleteConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConnectionInput,
  output: DeleteConnectionOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnection",
}));

export type DeleteHostError =
  | ResourceNotFoundException
  | ResourceUnavailableException
  | CommonErrors;
/**
 * The host to be deleted. Before you delete a host, all connections associated to the host must be deleted.
 *
 * A host cannot be deleted if it is in the VPC_CONFIG_INITIALIZING or VPC_CONFIG_DELETING state.
 */
export const deleteHost: API.OperationMethod<
  DeleteHostInput,
  DeleteHostOutput,
  DeleteHostError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteHostInput,
  output: DeleteHostOutput,
  errors: [ResourceNotFoundException, ResourceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHost",
}));

export type DeleteRepositoryLinkError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | SyncConfigurationStillExistsException
  | ThrottlingException
  | UnsupportedProviderTypeException
  | CommonErrors;
/**
 * Deletes the association between your connection and a specified external Git repository.
 */
export const deleteRepositoryLink: API.OperationMethod<
  DeleteRepositoryLinkInput,
  DeleteRepositoryLinkOutput,
  DeleteRepositoryLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRepositoryLinkInput,
  output: DeleteRepositoryLinkOutput,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    SyncConfigurationStillExistsException,
    ThrottlingException,
    UnsupportedProviderTypeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRepositoryLink",
}));

export type DeleteSyncConfigurationError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InternalServerException
  | InvalidInputException
  | LimitExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the sync configuration for a specified repository and connection.
 */
export const deleteSyncConfiguration: API.OperationMethod<
  DeleteSyncConfigurationInput,
  DeleteSyncConfigurationOutput,
  DeleteSyncConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSyncConfigurationInput,
  output: DeleteSyncConfigurationOutput,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InternalServerException,
    InvalidInputException,
    LimitExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSyncConfiguration",
}));

export type GetConnectionError =
  | ResourceNotFoundException
  | ResourceUnavailableException
  | CommonErrors;
/**
 * Returns the connection ARN and details such as status, owner, and provider type.
 */
export const getConnection: API.OperationMethod<
  GetConnectionInput,
  GetConnectionOutput,
  GetConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConnectionInput,
  output: GetConnectionOutput,
  errors: [ResourceNotFoundException, ResourceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnection",
}));

export type GetHostError =
  | ResourceNotFoundException
  | ResourceUnavailableException
  | CommonErrors;
/**
 * Returns the host ARN and details such as status, provider type, endpoint, and, if
 * applicable, the VPC configuration.
 */
export const getHost: API.OperationMethod<
  GetHostInput,
  GetHostOutput,
  GetHostError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetHostInput,
  output: GetHostOutput,
  errors: [ResourceNotFoundException, ResourceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHost",
}));

export type GetRepositoryLinkError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns details about a repository link. A repository link allows Git sync to monitor
 * and sync changes from files in a specified Git repository.
 */
export const getRepositoryLink: API.OperationMethod<
  GetRepositoryLinkInput,
  GetRepositoryLinkOutput,
  GetRepositoryLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRepositoryLinkInput,
  output: GetRepositoryLinkOutput,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRepositoryLink",
}));

export type GetRepositorySyncStatusError =
  | AccessDeniedException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns details about the sync status for a repository. A repository sync uses Git sync
 * to push and pull changes from your remote repository.
 */
export const getRepositorySyncStatus: API.OperationMethod<
  GetRepositorySyncStatusInput,
  GetRepositorySyncStatusOutput,
  GetRepositorySyncStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRepositorySyncStatusInput,
  output: GetRepositorySyncStatusOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRepositorySyncStatus",
}));

export type GetResourceSyncStatusError =
  | AccessDeniedException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the status of the sync with the Git repository for a specific Amazon Web Services
 * resource.
 */
export const getResourceSyncStatus: API.OperationMethod<
  GetResourceSyncStatusInput,
  GetResourceSyncStatusOutput,
  GetResourceSyncStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourceSyncStatusInput,
  output: GetResourceSyncStatusOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceSyncStatus",
}));

export type GetSyncBlockerSummaryError =
  | AccessDeniedException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of the most recent sync blockers.
 */
export const getSyncBlockerSummary: API.OperationMethod<
  GetSyncBlockerSummaryInput,
  GetSyncBlockerSummaryOutput,
  GetSyncBlockerSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSyncBlockerSummaryInput,
  output: GetSyncBlockerSummaryOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSyncBlockerSummary",
}));

export type GetSyncConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns details about a sync configuration, including the sync type and resource name. A sync configuration allows the configuration to sync (push and pull) changes from the remote repository for a specified branch in a Git repository.
 */
export const getSyncConfiguration: API.OperationMethod<
  GetSyncConfigurationInput,
  GetSyncConfigurationOutput,
  GetSyncConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSyncConfigurationInput,
  output: GetSyncConfigurationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSyncConfiguration",
}));

export type ListConnectionsError = ResourceNotFoundException | CommonErrors;
/**
 * Lists the connections associated with your account.
 */
export const listConnections: API.PaginatedOperationMethod<
  ListConnectionsInput,
  ListConnectionsOutput,
  ListConnectionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConnectionsInput,
  output: ListConnectionsOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListHostsError = CommonErrors;
/**
 * Lists the hosts associated with your account.
 */
export const listHosts: API.PaginatedOperationMethod<
  ListHostsInput,
  ListHostsOutput,
  ListHostsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListHostsInput,
  output: ListHostsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHosts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRepositoryLinksError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the repository links created for connections in your account.
 */
export const listRepositoryLinks: API.PaginatedOperationMethod<
  ListRepositoryLinksInput,
  ListRepositoryLinksOutput,
  ListRepositoryLinksError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRepositoryLinksInput,
  output: ListRepositoryLinksOutput,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRepositoryLinks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRepositorySyncDefinitionsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the repository sync definitions for repository links in your account.
 */
export const listRepositorySyncDefinitions: API.OperationMethod<
  ListRepositorySyncDefinitionsInput,
  ListRepositorySyncDefinitionsOutput,
  ListRepositorySyncDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListRepositorySyncDefinitionsInput,
  output: ListRepositorySyncDefinitionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRepositorySyncDefinitions",
}));

export type ListSyncConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of sync configurations for a specified repository.
 */
export const listSyncConfigurations: API.PaginatedOperationMethod<
  ListSyncConfigurationsInput,
  ListSyncConfigurationsOutput,
  ListSyncConfigurationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSyncConfigurationsInput,
  output: ListSyncConfigurationsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSyncConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Gets the set of key-value pairs (metadata) that are used to manage the resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type TagResourceError =
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds to or modifies the tags of the given resource. Tags are metadata that can be used
 * to manage a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceOutput,
  errors: [LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Removes tags from an Amazon Web Services resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateHostError =
  | ConflictException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates a specified host with the provided configurations.
 */
export const updateHost: API.OperationMethod<
  UpdateHostInput,
  UpdateHostOutput,
  UpdateHostError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateHostInput,
  output: UpdateHostOutput,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateHost",
}));

export type UpdateRepositoryLinkError =
  | AccessDeniedException
  | ConditionalCheckFailedException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | ThrottlingException
  | UpdateOutOfSyncException
  | CommonErrors;
/**
 * Updates the association between your connection and a specified external Git repository.
 * A repository link allows Git sync to monitor and sync changes to files in a specified Git
 * repository.
 */
export const updateRepositoryLink: API.OperationMethod<
  UpdateRepositoryLinkInput,
  UpdateRepositoryLinkOutput,
  UpdateRepositoryLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRepositoryLinkInput,
  output: UpdateRepositoryLinkOutput,
  errors: [
    AccessDeniedException,
    ConditionalCheckFailedException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    ThrottlingException,
    UpdateOutOfSyncException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRepositoryLink",
}));

export type UpdateSyncBlockerError =
  | AccessDeniedException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | RetryLatestCommitFailedException
  | SyncBlockerDoesNotExistException
  | ThrottlingException
  | CommonErrors;
/**
 * Allows you to update the status of a sync blocker, resolving the blocker and allowing syncing to continue.
 */
export const updateSyncBlocker: API.OperationMethod<
  UpdateSyncBlockerInput,
  UpdateSyncBlockerOutput,
  UpdateSyncBlockerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSyncBlockerInput,
  output: UpdateSyncBlockerOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    RetryLatestCommitFailedException,
    SyncBlockerDoesNotExistException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSyncBlocker",
}));

export type UpdateSyncConfigurationError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | ThrottlingException
  | UpdateOutOfSyncException
  | CommonErrors;
/**
 * Updates the sync configuration for your connection and a specified external Git repository.
 */
export const updateSyncConfiguration: API.OperationMethod<
  UpdateSyncConfigurationInput,
  UpdateSyncConfigurationOutput,
  UpdateSyncConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSyncConfigurationInput,
  output: UpdateSyncConfigurationOutput,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    ThrottlingException,
    UpdateOutOfSyncException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSyncConfiguration",
}));
