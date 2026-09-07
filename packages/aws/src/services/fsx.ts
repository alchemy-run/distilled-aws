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
  sdkId: "FSx",
  serviceShapeName: "AWSSimbaAPIService_v20180301",
});
const auth = T.AwsAuthSigv4({ name: "fsx" });
const ver = T.ServiceVersion("2018-03-01");
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
              `https://fsx-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://fsx-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://fsx.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://fsx.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessPointAlreadyOwnedByYou
  extends /*@__PURE__*/ S.TaggedError<AccessPointAlreadyOwnedByYou>()(
    "AccessPointAlreadyOwnedByYou",
    {
      ErrorCode: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ActiveDirectoryError
  extends /*@__PURE__*/ S.TaggedError<ActiveDirectoryError>()(
    "ActiveDirectoryError",
    {
      ActiveDirectoryId: S.optional(S.String),
      Type: S.optional(
        S.suspend(() => ActiveDirectoryErrorType).annotate({
          identifier: "ActiveDirectoryErrorType",
        }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
  ) {}
export class BackupBeingCopied
  extends /*@__PURE__*/ S.TaggedError<BackupBeingCopied>()(
    "BackupBeingCopied",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      BackupId: S.optional(S.String),
    },
  ) {}
export class BackupInProgress
  extends /*@__PURE__*/ S.TaggedError<BackupInProgress>()("BackupInProgress", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class BackupNotFound
  extends /*@__PURE__*/ S.TaggedError<BackupNotFound>()("BackupNotFound", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class BackupRestoring
  extends /*@__PURE__*/ S.TaggedError<BackupRestoring>()("BackupRestoring", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
    FileSystemId: S.optional(S.String),
  }) {}
export class BadRequest
  extends /*@__PURE__*/ S.TaggedError<BadRequest>()("BadRequest", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class DataRepositoryAssociationNotFound
  extends /*@__PURE__*/ S.TaggedError<DataRepositoryAssociationNotFound>()(
    "DataRepositoryAssociationNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DataRepositoryTaskEnded
  extends /*@__PURE__*/ S.TaggedError<DataRepositoryTaskEnded>()(
    "DataRepositoryTaskEnded",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DataRepositoryTaskExecuting
  extends /*@__PURE__*/ S.TaggedError<DataRepositoryTaskExecuting>()(
    "DataRepositoryTaskExecuting",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DataRepositoryTaskNotFound
  extends /*@__PURE__*/ S.TaggedError<DataRepositoryTaskNotFound>()(
    "DataRepositoryTaskNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class FileCacheNotFound
  extends /*@__PURE__*/ S.TaggedError<FileCacheNotFound>()(
    "FileCacheNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class FileSystemNotFound
  extends /*@__PURE__*/ S.TaggedError<FileSystemNotFound>()(
    "FileSystemNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class IncompatibleParameterError
  extends /*@__PURE__*/ S.TaggedError<IncompatibleParameterError>()(
    "IncompatibleParameterError",
    {
      Parameter: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
  ) {}
export class IncompatibleRegionForMultiAZ
  extends /*@__PURE__*/ S.TaggedError<IncompatibleRegionForMultiAZ>()(
    "IncompatibleRegionForMultiAZ",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InternalServerError
  extends /*@__PURE__*/ S.TaggedError<InternalServerError>()(
    "InternalServerError",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidAccessPoint
  extends /*@__PURE__*/ S.TaggedError<InvalidAccessPoint>()(
    "InvalidAccessPoint",
    {
      ErrorCode: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidDataRepositoryType
  extends /*@__PURE__*/ S.TaggedError<InvalidDataRepositoryType>()(
    "InvalidDataRepositoryType",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidDestinationKmsKey
  extends /*@__PURE__*/ S.TaggedError<InvalidDestinationKmsKey>()(
    "InvalidDestinationKmsKey",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidExportPath
  extends /*@__PURE__*/ S.TaggedError<InvalidExportPath>()(
    "InvalidExportPath",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidImportPath
  extends /*@__PURE__*/ S.TaggedError<InvalidImportPath>()(
    "InvalidImportPath",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidNetworkSettings
  extends /*@__PURE__*/ S.TaggedError<InvalidNetworkSettings>()(
    "InvalidNetworkSettings",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      InvalidSubnetId: S.optional(S.String),
      InvalidSecurityGroupId: S.optional(S.String),
      InvalidRouteTableId: S.optional(S.String),
    },
  ) {}
export class InvalidPerUnitStorageThroughput
  extends /*@__PURE__*/ S.TaggedError<InvalidPerUnitStorageThroughput>()(
    "InvalidPerUnitStorageThroughput",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidRegion
  extends /*@__PURE__*/ S.TaggedError<InvalidRegion>()("InvalidRegion", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class InvalidRequest
  extends /*@__PURE__*/ S.TaggedError<InvalidRequest>()(
    "InvalidRequest",
    {
      ErrorCode: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidSourceKmsKey
  extends /*@__PURE__*/ S.TaggedError<InvalidSourceKmsKey>()(
    "InvalidSourceKmsKey",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class MissingFileCacheConfiguration
  extends /*@__PURE__*/ S.TaggedError<MissingFileCacheConfiguration>()(
    "MissingFileCacheConfiguration",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class MissingFileSystemConfiguration
  extends /*@__PURE__*/ S.TaggedError<MissingFileSystemConfiguration>()(
    "MissingFileSystemConfiguration",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class MissingVolumeConfiguration
  extends /*@__PURE__*/ S.TaggedError<MissingVolumeConfiguration>()(
    "MissingVolumeConfiguration",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class NotServiceResourceError
  extends /*@__PURE__*/ S.TaggedError<NotServiceResourceError>()(
    "NotServiceResourceError",
    {
      ResourceARN: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
  ) {}
export class ResourceDoesNotSupportTagging
  extends /*@__PURE__*/ S.TaggedError<ResourceDoesNotSupportTagging>()(
    "ResourceDoesNotSupportTagging",
    {
      ResourceARN: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
  ) {}
export class ResourceNotFound
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFound>()("ResourceNotFound", {
    ResourceARN: S.optional(S.String),
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class RestoreSnapshotNotFound
  extends /*@__PURE__*/ S.TaggedError<RestoreSnapshotNotFound>()(
    "RestoreSnapshotNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "BadRequest",
      message: { includes: "snapshot cannot be found" },
    }),
  ).pipe(C.withNotFoundError) {}
export class S3AccessPointAttachmentNotFound
  extends /*@__PURE__*/ S.TaggedError<S3AccessPointAttachmentNotFound>()(
    "S3AccessPointAttachmentNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ServiceLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<ServiceLimitExceeded>()(
    "ServiceLimitExceeded",
    {
      Limit: S.optional(
        S.suspend(() => ServiceLimit).annotate({ identifier: "ServiceLimit" }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
  ).pipe(C.withThrottlingError) {}
export class SnapshotNotFound
  extends /*@__PURE__*/ S.TaggedError<SnapshotNotFound>()("SnapshotNotFound", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class SnapshotVolumeNotFound
  extends /*@__PURE__*/ S.TaggedError<SnapshotVolumeNotFound>()(
    "SnapshotVolumeNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "BadRequest",
      message: { includes: "volume was not found" },
    }),
  ).pipe(C.withNotFoundError) {}
export class SourceBackupUnavailable
  extends /*@__PURE__*/ S.TaggedError<SourceBackupUnavailable>()(
    "SourceBackupUnavailable",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      BackupId: S.optional(S.String),
    },
  ) {}
export class SourceSnapshotNotFound
  extends /*@__PURE__*/ S.TaggedError<SourceSnapshotNotFound>()(
    "SourceSnapshotNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "BadRequest",
      message: { includes: "SourceSnapshotARN provided is not a valid ARN" },
    }),
  ).pipe(C.withNotFoundError) {}
export class StorageVirtualMachineNotFound
  extends /*@__PURE__*/ S.TaggedError<StorageVirtualMachineNotFound>()(
    "StorageVirtualMachineNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TooManyAccessPoints
  extends /*@__PURE__*/ S.TaggedError<TooManyAccessPoints>()(
    "TooManyAccessPoints",
    {
      ErrorCode: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedOperation
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperation>()(
    "UnsupportedOperation",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class UpdateSnapshotNotFound
  extends /*@__PURE__*/ S.TaggedError<UpdateSnapshotNotFound>()(
    "UpdateSnapshotNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "BadRequest",
      message: { includes: "the snapshot is not found" },
    }),
  ).pipe(C.withNotFoundError) {}
export class VolumeNotFound
  extends /*@__PURE__*/ S.TaggedError<VolumeNotFound>()("VolumeNotFound", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export type ClientRequestToken = string;
export type FileSystemId = string;
export type AlternateDNSName = string;
export type AlternateDNSNames = string[];
export const AlternateDNSNames = /*@__PURE__*/ S.Array(S.String);
export interface AssociateFileSystemAliasesRequest {
  ClientRequestToken?: string;
  FileSystemId?: string;
  Aliases?: string[];
}
export const AssociateFileSystemAliasesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    FileSystemId: S.optional(S.String),
    Aliases: S.optional(AlternateDNSNames),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateFileSystemAliasesRequest",
}) as any as S.Schema<AssociateFileSystemAliasesRequest>;
export type AliasLifecycle =
  | "AVAILABLE"
  | "CREATING"
  | "DELETING"
  | "CREATE_FAILED"
  | "DELETE_FAILED"
  | (string & {});
export const AliasLifecycle = S.String;

export interface Alias {
  Name?: string;
  Lifecycle?: AliasLifecycle;
}
export const Alias = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Lifecycle: S.optional(AliasLifecycle),
  }),
).annotate({ identifier: "Alias" }) as any as S.Schema<Alias>;
export type Aliases = Alias[];
export const Aliases = /*@__PURE__*/ S.Array(Alias);
export interface AssociateFileSystemAliasesResponse {
  Aliases?: Alias[];
}
export const AssociateFileSystemAliasesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Aliases: S.optional(Aliases) }),
).annotate({
  identifier: "AssociateFileSystemAliasesResponse",
}) as any as S.Schema<AssociateFileSystemAliasesResponse>;
export type TaskId = string;
export interface CancelDataRepositoryTaskRequest {
  TaskId?: string;
}
export const CancelDataRepositoryTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TaskId: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CancelDataRepositoryTaskRequest",
}) as any as S.Schema<CancelDataRepositoryTaskRequest>;
export type DataRepositoryTaskLifecycle =
  | "PENDING"
  | "EXECUTING"
  | "FAILED"
  | "SUCCEEDED"
  | "CANCELED"
  | "CANCELING"
  | (string & {});
export const DataRepositoryTaskLifecycle = S.String;

export interface CancelDataRepositoryTaskResponse {
  Lifecycle?: DataRepositoryTaskLifecycle;
  TaskId?: string;
}
export const CancelDataRepositoryTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Lifecycle: S.optional(DataRepositoryTaskLifecycle),
    TaskId: S.optional(S.String),
  }),
).annotate({
  identifier: "CancelDataRepositoryTaskResponse",
}) as any as S.Schema<CancelDataRepositoryTaskResponse>;
export type SourceBackupId = string;
export type Region = string;
export type KmsKeyId = string;
export type Flag = boolean;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type Tags = Tag[];
export const Tags = /*@__PURE__*/ S.Array(Tag);
export interface CopyBackupRequest {
  ClientRequestToken?: string;
  SourceBackupId?: string;
  SourceRegion?: string;
  KmsKeyId?: string;
  CopyTags?: boolean;
  Tags?: Tag[];
}
export const CopyBackupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    SourceBackupId: S.optional(S.String),
    SourceRegion: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    CopyTags: S.optional(S.Boolean),
    Tags: S.optional(Tags),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CopyBackupRequest",
}) as any as S.Schema<CopyBackupRequest>;
export type BackupId = string;
export type BackupLifecycle =
  | "AVAILABLE"
  | "CREATING"
  | "TRANSFERRING"
  | "DELETED"
  | "FAILED"
  | "PENDING"
  | "COPYING"
  | (string & {});
export const BackupLifecycle = S.String;

export type ErrorMessage = string;
export interface BackupFailureDetails {
  Message?: string;
}
export const BackupFailureDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Message: S.optional(S.String) }),
).annotate({
  identifier: "BackupFailureDetails",
}) as any as S.Schema<BackupFailureDetails>;
export type BackupType =
  | "AUTOMATIC"
  | "USER_INITIATED"
  | "AWS_BACKUP"
  | (string & {});
export const BackupType = S.String;

export type ProgressPercent = number;
export type CreationTime = Date;
export type ResourceARN = string;
export type AWSAccountId = string;
export type FileSystemType =
  | "WINDOWS"
  | "LUSTRE"
  | "ONTAP"
  | "OPENZFS"
  | (string & {});
export const FileSystemType = S.String;

export type FileSystemLifecycle =
  | "AVAILABLE"
  | "CREATING"
  | "FAILED"
  | "DELETING"
  | "MISCONFIGURED"
  | "UPDATING"
  | "MISCONFIGURED_UNAVAILABLE"
  | (string & {});
export const FileSystemLifecycle = S.String;

export interface FileSystemFailureDetails {
  Message?: string;
}
export const FileSystemFailureDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Message: S.optional(S.String) }),
).annotate({
  identifier: "FileSystemFailureDetails",
}) as any as S.Schema<FileSystemFailureDetails>;
export type StorageCapacity = number;
export type StorageType = "SSD" | "HDD" | "INTELLIGENT_TIERING" | (string & {});
export const StorageType = S.String;

export type VpcId = string;
export type SubnetId = string;
export type SubnetIds = string[];
export const SubnetIds = /*@__PURE__*/ S.Array(S.String);
export type NetworkInterfaceId = string;
export type NetworkInterfaceIds = string[];
export const NetworkInterfaceIds = /*@__PURE__*/ S.Array(S.String);
export type DNSName = string;
export type DirectoryId = string;
export type ActiveDirectoryFullyQualifiedName = string;
export type OrganizationalUnitDistinguishedName = string;
export type FileSystemAdministratorsGroupName = string;
export type DirectoryUserName = string;
export type IpAddress = string;
export type DnsIps = string[];
export const DnsIps = /*@__PURE__*/ S.Array(S.String);
export type CustomerSecretsManagerARN = string;
export interface SelfManagedActiveDirectoryAttributes {
  DomainName?: string;
  OrganizationalUnitDistinguishedName?: string;
  FileSystemAdministratorsGroup?: string;
  UserName?: string;
  DnsIps?: string[];
  DomainJoinServiceAccountSecret?: string;
}
export const SelfManagedActiveDirectoryAttributes = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DomainName: S.optional(S.String),
      OrganizationalUnitDistinguishedName: S.optional(S.String),
      FileSystemAdministratorsGroup: S.optional(S.String),
      UserName: S.optional(S.String),
      DnsIps: S.optional(DnsIps),
      DomainJoinServiceAccountSecret: S.optional(S.String),
    }),
).annotate({
  identifier: "SelfManagedActiveDirectoryAttributes",
}) as any as S.Schema<SelfManagedActiveDirectoryAttributes>;
export type WindowsDeploymentType =
  | "MULTI_AZ_1"
  | "SINGLE_AZ_1"
  | "SINGLE_AZ_2"
  | (string & {});
export const WindowsDeploymentType = S.String;

export type MegabytesPerSecond = number;
export type FileSystemMaintenanceOperation =
  | "PATCHING"
  | "BACKING_UP"
  | (string & {});
export const FileSystemMaintenanceOperation = S.String;

export type FileSystemMaintenanceOperations = FileSystemMaintenanceOperation[];
export const FileSystemMaintenanceOperations = /*@__PURE__*/ S.Array(
  FileSystemMaintenanceOperation,
);
export type WeeklyTime = string;
export type DailyTime = string;
export type AutomaticBackupRetentionDays = number;
export type WindowsAccessAuditLogLevel =
  | "DISABLED"
  | "SUCCESS_ONLY"
  | "FAILURE_ONLY"
  | "SUCCESS_AND_FAILURE"
  | (string & {});
export const WindowsAccessAuditLogLevel = S.String;

export type GeneralARN = string;
export interface WindowsAuditLogConfiguration {
  FileAccessAuditLogLevel?: WindowsAccessAuditLogLevel;
  FileShareAccessAuditLogLevel?: WindowsAccessAuditLogLevel;
  AuditLogDestination?: string;
}
export const WindowsAuditLogConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileAccessAuditLogLevel: S.optional(WindowsAccessAuditLogLevel),
    FileShareAccessAuditLogLevel: S.optional(WindowsAccessAuditLogLevel),
    AuditLogDestination: S.optional(S.String),
  }),
).annotate({
  identifier: "WindowsAuditLogConfiguration",
}) as any as S.Schema<WindowsAuditLogConfiguration>;
export type DiskIopsConfigurationMode =
  | "AUTOMATIC"
  | "USER_PROVISIONED"
  | (string & {});
export const DiskIopsConfigurationMode = S.String;

export type Iops = number;
export interface DiskIopsConfiguration {
  Mode?: DiskIopsConfigurationMode;
  Iops?: number;
}
export const DiskIopsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Mode: S.optional(DiskIopsConfigurationMode),
    Iops: S.optional(S.Number),
  }),
).annotate({
  identifier: "DiskIopsConfiguration",
}) as any as S.Schema<DiskIopsConfiguration>;
export interface WindowsFsrmConfiguration {
  FsrmServiceEnabled?: boolean;
  EventLogDestination?: string;
}
export const WindowsFsrmConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FsrmServiceEnabled: S.optional(S.Boolean),
    EventLogDestination: S.optional(S.String),
  }),
).annotate({
  identifier: "WindowsFsrmConfiguration",
}) as any as S.Schema<WindowsFsrmConfiguration>;
export interface WindowsFileSystemConfiguration {
  ActiveDirectoryId?: string;
  SelfManagedActiveDirectoryConfiguration?: SelfManagedActiveDirectoryAttributes;
  DeploymentType?: WindowsDeploymentType;
  RemoteAdministrationEndpoint?: string;
  PreferredSubnetId?: string;
  PreferredFileServerIp?: string;
  ThroughputCapacity?: number;
  MaintenanceOperationsInProgress?: FileSystemMaintenanceOperation[];
  WeeklyMaintenanceStartTime?: string;
  DailyAutomaticBackupStartTime?: string;
  AutomaticBackupRetentionDays?: number;
  CopyTagsToBackups?: boolean;
  Aliases?: Alias[];
  AuditLogConfiguration?: WindowsAuditLogConfiguration;
  DiskIopsConfiguration?: DiskIopsConfiguration;
  PreferredFileServerIpv6?: string;
  FsrmConfiguration?: WindowsFsrmConfiguration;
}
export const WindowsFileSystemConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActiveDirectoryId: S.optional(S.String),
    SelfManagedActiveDirectoryConfiguration: S.optional(
      SelfManagedActiveDirectoryAttributes,
    ),
    DeploymentType: S.optional(WindowsDeploymentType),
    RemoteAdministrationEndpoint: S.optional(S.String),
    PreferredSubnetId: S.optional(S.String),
    PreferredFileServerIp: S.optional(S.String),
    ThroughputCapacity: S.optional(S.Number),
    MaintenanceOperationsInProgress: S.optional(
      FileSystemMaintenanceOperations,
    ),
    WeeklyMaintenanceStartTime: S.optional(S.String),
    DailyAutomaticBackupStartTime: S.optional(S.String),
    AutomaticBackupRetentionDays: S.optional(S.Number),
    CopyTagsToBackups: S.optional(S.Boolean),
    Aliases: S.optional(Aliases),
    AuditLogConfiguration: S.optional(WindowsAuditLogConfiguration),
    DiskIopsConfiguration: S.optional(DiskIopsConfiguration),
    PreferredFileServerIpv6: S.optional(S.String),
    FsrmConfiguration: S.optional(WindowsFsrmConfiguration),
  }),
).annotate({
  identifier: "WindowsFileSystemConfiguration",
}) as any as S.Schema<WindowsFileSystemConfiguration>;
export type DataRepositoryLifecycle =
  | "CREATING"
  | "AVAILABLE"
  | "MISCONFIGURED"
  | "UPDATING"
  | "DELETING"
  | "FAILED"
  | (string & {});
export const DataRepositoryLifecycle = S.String;

export type ArchivePath = string;
export type Megabytes = number;
export type AutoImportPolicyType =
  | "NONE"
  | "NEW"
  | "NEW_CHANGED"
  | "NEW_CHANGED_DELETED"
  | (string & {});
export const AutoImportPolicyType = S.String;

export interface DataRepositoryFailureDetails {
  Message?: string;
}
export const DataRepositoryFailureDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Message: S.optional(S.String) }),
).annotate({
  identifier: "DataRepositoryFailureDetails",
}) as any as S.Schema<DataRepositoryFailureDetails>;
export interface DataRepositoryConfiguration {
  Lifecycle?: DataRepositoryLifecycle;
  ImportPath?: string;
  ExportPath?: string;
  ImportedFileChunkSize?: number;
  AutoImportPolicy?: AutoImportPolicyType;
  FailureDetails?: DataRepositoryFailureDetails;
}
export const DataRepositoryConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Lifecycle: S.optional(DataRepositoryLifecycle),
    ImportPath: S.optional(S.String),
    ExportPath: S.optional(S.String),
    ImportedFileChunkSize: S.optional(S.Number),
    AutoImportPolicy: S.optional(AutoImportPolicyType),
    FailureDetails: S.optional(DataRepositoryFailureDetails),
  }),
).annotate({
  identifier: "DataRepositoryConfiguration",
}) as any as S.Schema<DataRepositoryConfiguration>;
export type LustreDeploymentType =
  | "SCRATCH_1"
  | "SCRATCH_2"
  | "PERSISTENT_1"
  | "PERSISTENT_2"
  | (string & {});
export const LustreDeploymentType = S.String;

export type PerUnitStorageThroughput = number;
export type LustreFileSystemMountName = string;
export type DriveCacheType = "NONE" | "READ" | (string & {});
export const DriveCacheType = S.String;

export type DataCompressionType = "NONE" | "LZ4" | (string & {});
export const DataCompressionType = S.String;

export type LustreAccessAuditLogLevel =
  | "DISABLED"
  | "WARN_ONLY"
  | "ERROR_ONLY"
  | "WARN_ERROR"
  | (string & {});
export const LustreAccessAuditLogLevel = S.String;

export interface LustreLogConfiguration {
  Level?: LustreAccessAuditLogLevel;
  Destination?: string;
}
export const LustreLogConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Level: S.optional(LustreAccessAuditLogLevel),
    Destination: S.optional(S.String),
  }),
).annotate({
  identifier: "LustreLogConfiguration",
}) as any as S.Schema<LustreLogConfiguration>;
export type LustreRootSquash = string;
export type LustreNoSquashNid = string;
export type LustreNoSquashNids = string[];
export const LustreNoSquashNids = /*@__PURE__*/ S.Array(S.String);
export interface LustreRootSquashConfiguration {
  RootSquash?: string;
  NoSquashNids?: string[];
}
export const LustreRootSquashConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RootSquash: S.optional(S.String),
    NoSquashNids: S.optional(LustreNoSquashNids),
  }),
).annotate({
  identifier: "LustreRootSquashConfiguration",
}) as any as S.Schema<LustreRootSquashConfiguration>;
export type MetadataIops = number;
export type MetadataConfigurationMode =
  | "AUTOMATIC"
  | "USER_PROVISIONED"
  | (string & {});
export const MetadataConfigurationMode = S.String;

export interface FileSystemLustreMetadataConfiguration {
  Iops?: number;
  Mode?: MetadataConfigurationMode;
}
export const FileSystemLustreMetadataConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Iops: S.optional(S.Number),
      Mode: S.optional(MetadataConfigurationMode),
    }),
).annotate({
  identifier: "FileSystemLustreMetadataConfiguration",
}) as any as S.Schema<FileSystemLustreMetadataConfiguration>;
export type ThroughputCapacityMbps = number;
export type LustreReadCacheSizingMode =
  | "NO_CACHE"
  | "USER_PROVISIONED"
  | "PROPORTIONAL_TO_THROUGHPUT_CAPACITY"
  | (string & {});
export const LustreReadCacheSizingMode = S.String;

export interface LustreReadCacheConfiguration {
  SizingMode?: LustreReadCacheSizingMode;
  SizeGiB?: number;
}
export const LustreReadCacheConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SizingMode: S.optional(LustreReadCacheSizingMode),
    SizeGiB: S.optional(S.Number),
  }),
).annotate({
  identifier: "LustreReadCacheConfiguration",
}) as any as S.Schema<LustreReadCacheConfiguration>;
export interface LustreFileSystemConfiguration {
  WeeklyMaintenanceStartTime?: string;
  DataRepositoryConfiguration?: DataRepositoryConfiguration;
  DeploymentType?: LustreDeploymentType;
  PerUnitStorageThroughput?: number;
  MountName?: string;
  DailyAutomaticBackupStartTime?: string;
  AutomaticBackupRetentionDays?: number;
  CopyTagsToBackups?: boolean;
  DriveCacheType?: DriveCacheType;
  DataCompressionType?: DataCompressionType;
  LogConfiguration?: LustreLogConfiguration;
  RootSquashConfiguration?: LustreRootSquashConfiguration;
  MetadataConfiguration?: FileSystemLustreMetadataConfiguration;
  EfaEnabled?: boolean;
  ThroughputCapacity?: number;
  DataReadCacheConfiguration?: LustreReadCacheConfiguration;
}
export const LustreFileSystemConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WeeklyMaintenanceStartTime: S.optional(S.String),
    DataRepositoryConfiguration: S.optional(DataRepositoryConfiguration),
    DeploymentType: S.optional(LustreDeploymentType),
    PerUnitStorageThroughput: S.optional(S.Number),
    MountName: S.optional(S.String),
    DailyAutomaticBackupStartTime: S.optional(S.String),
    AutomaticBackupRetentionDays: S.optional(S.Number),
    CopyTagsToBackups: S.optional(S.Boolean),
    DriveCacheType: S.optional(DriveCacheType),
    DataCompressionType: S.optional(DataCompressionType),
    LogConfiguration: S.optional(LustreLogConfiguration),
    RootSquashConfiguration: S.optional(LustreRootSquashConfiguration),
    MetadataConfiguration: S.optional(FileSystemLustreMetadataConfiguration),
    EfaEnabled: S.optional(S.Boolean),
    ThroughputCapacity: S.optional(S.Number),
    DataReadCacheConfiguration: S.optional(LustreReadCacheConfiguration),
  }),
).annotate({
  identifier: "LustreFileSystemConfiguration",
}) as any as S.Schema<LustreFileSystemConfiguration>;
export type AdministrativeActionType =
  | "FILE_SYSTEM_UPDATE"
  | "STORAGE_OPTIMIZATION"
  | "FILE_SYSTEM_ALIAS_ASSOCIATION"
  | "FILE_SYSTEM_ALIAS_DISASSOCIATION"
  | "VOLUME_UPDATE"
  | "SNAPSHOT_UPDATE"
  | "RELEASE_NFS_V3_LOCKS"
  | "VOLUME_RESTORE"
  | "THROUGHPUT_OPTIMIZATION"
  | "IOPS_OPTIMIZATION"
  | "STORAGE_TYPE_OPTIMIZATION"
  | "MISCONFIGURED_STATE_RECOVERY"
  | "VOLUME_UPDATE_WITH_SNAPSHOT"
  | "VOLUME_INITIALIZE_WITH_SNAPSHOT"
  | "DOWNLOAD_DATA_FROM_BACKUP"
  | (string & {});
export const AdministrativeActionType = S.String;

export type RequestTime = Date;
export type Status =
  | "FAILED"
  | "IN_PROGRESS"
  | "PENDING"
  | "COMPLETED"
  | "UPDATED_OPTIMIZING"
  | "OPTIMIZING"
  | "PAUSED"
  | "CANCELLED"
  | (string & {});
export const Status = S.String;

export interface AdministrativeActionFailureDetails {
  Message?: string;
}
export const AdministrativeActionFailureDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Message: S.optional(S.String) }),
).annotate({
  identifier: "AdministrativeActionFailureDetails",
}) as any as S.Schema<AdministrativeActionFailureDetails>;
export type VolumeLifecycle =
  | "CREATING"
  | "CREATED"
  | "DELETING"
  | "FAILED"
  | "MISCONFIGURED"
  | "PENDING"
  | "AVAILABLE"
  | (string & {});
export const VolumeLifecycle = S.String;

export type VolumeName = string;
export type FlexCacheEndpointType = "NONE" | "ORIGIN" | "CACHE" | (string & {});
export const FlexCacheEndpointType = S.String;

export type JunctionPath = string;
export type SecurityStyle = "UNIX" | "NTFS" | "MIXED" | (string & {});
export const SecurityStyle = S.String;

export type VolumeCapacity = number;
export type StorageVirtualMachineId = string;
export type CoolingPeriod = number;
export type TieringPolicyName =
  | "SNAPSHOT_ONLY"
  | "AUTO"
  | "ALL"
  | "NONE"
  | (string & {});
export const TieringPolicyName = S.String;

export interface TieringPolicy {
  CoolingPeriod?: number;
  Name?: TieringPolicyName;
}
export const TieringPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CoolingPeriod: S.optional(S.Number),
    Name: S.optional(TieringPolicyName),
  }),
).annotate({ identifier: "TieringPolicy" }) as any as S.Schema<TieringPolicy>;
export type UUID = string;
export type OntapVolumeType = "RW" | "DP" | "LS" | (string & {});
export const OntapVolumeType = S.String;

export type SnapshotPolicy = string;
export type AutocommitPeriodType =
  | "MINUTES"
  | "HOURS"
  | "DAYS"
  | "MONTHS"
  | "YEARS"
  | "NONE"
  | (string & {});
export const AutocommitPeriodType = S.String;

export type AutocommitPeriodValue = number;
export interface AutocommitPeriod {
  Type?: AutocommitPeriodType;
  Value?: number;
}
export const AutocommitPeriod = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(AutocommitPeriodType),
    Value: S.optional(S.Number),
  }),
).annotate({
  identifier: "AutocommitPeriod",
}) as any as S.Schema<AutocommitPeriod>;
export type PrivilegedDelete =
  | "DISABLED"
  | "ENABLED"
  | "PERMANENTLY_DISABLED"
  | (string & {});
export const PrivilegedDelete = S.String;

export type RetentionPeriodType =
  | "SECONDS"
  | "MINUTES"
  | "HOURS"
  | "DAYS"
  | "MONTHS"
  | "YEARS"
  | "INFINITE"
  | "UNSPECIFIED"
  | (string & {});
export const RetentionPeriodType = S.String;

export type RetentionPeriodValue = number;
export interface RetentionPeriod {
  Type?: RetentionPeriodType;
  Value?: number;
}
export const RetentionPeriod = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(RetentionPeriodType),
    Value: S.optional(S.Number),
  }),
).annotate({
  identifier: "RetentionPeriod",
}) as any as S.Schema<RetentionPeriod>;
export interface SnaplockRetentionPeriod {
  DefaultRetention?: RetentionPeriod;
  MinimumRetention?: RetentionPeriod;
  MaximumRetention?: RetentionPeriod;
}
export const SnaplockRetentionPeriod = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultRetention: S.optional(RetentionPeriod),
    MinimumRetention: S.optional(RetentionPeriod),
    MaximumRetention: S.optional(RetentionPeriod),
  }),
).annotate({
  identifier: "SnaplockRetentionPeriod",
}) as any as S.Schema<SnaplockRetentionPeriod>;
export type SnaplockType = "COMPLIANCE" | "ENTERPRISE" | (string & {});
export const SnaplockType = S.String;

export interface SnaplockConfiguration {
  AuditLogVolume?: boolean;
  AutocommitPeriod?: AutocommitPeriod;
  PrivilegedDelete?: PrivilegedDelete;
  RetentionPeriod?: SnaplockRetentionPeriod;
  SnaplockType?: SnaplockType;
  VolumeAppendModeEnabled?: boolean;
}
export const SnaplockConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuditLogVolume: S.optional(S.Boolean),
    AutocommitPeriod: S.optional(AutocommitPeriod),
    PrivilegedDelete: S.optional(PrivilegedDelete),
    RetentionPeriod: S.optional(SnaplockRetentionPeriod),
    SnaplockType: S.optional(SnaplockType),
    VolumeAppendModeEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "SnaplockConfiguration",
}) as any as S.Schema<SnaplockConfiguration>;
export type VolumeStyle = "FLEXVOL" | "FLEXGROUP" | (string & {});
export const VolumeStyle = S.String;

export type Aggregate = string;
export type Aggregates = string[];
export const Aggregates = /*@__PURE__*/ S.Array(S.String);
export type TotalConstituents = number;
export interface AggregateConfiguration {
  Aggregates?: string[];
  TotalConstituents?: number;
}
export const AggregateConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Aggregates: S.optional(Aggregates),
    TotalConstituents: S.optional(S.Number),
  }),
).annotate({
  identifier: "AggregateConfiguration",
}) as any as S.Schema<AggregateConfiguration>;
export type VolumeCapacityBytes = number;
export interface OntapVolumeConfiguration {
  FlexCacheEndpointType?: FlexCacheEndpointType;
  JunctionPath?: string;
  SecurityStyle?: SecurityStyle;
  SizeInMegabytes?: number;
  StorageEfficiencyEnabled?: boolean;
  StorageVirtualMachineId?: string;
  StorageVirtualMachineRoot?: boolean;
  TieringPolicy?: TieringPolicy;
  UUID?: string;
  OntapVolumeType?: OntapVolumeType;
  SnapshotPolicy?: string;
  CopyTagsToBackups?: boolean;
  SnaplockConfiguration?: SnaplockConfiguration;
  VolumeStyle?: VolumeStyle;
  AggregateConfiguration?: AggregateConfiguration;
  SizeInBytes?: number;
}
export const OntapVolumeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlexCacheEndpointType: S.optional(FlexCacheEndpointType),
    JunctionPath: S.optional(S.String),
    SecurityStyle: S.optional(SecurityStyle),
    SizeInMegabytes: S.optional(S.Number),
    StorageEfficiencyEnabled: S.optional(S.Boolean),
    StorageVirtualMachineId: S.optional(S.String),
    StorageVirtualMachineRoot: S.optional(S.Boolean),
    TieringPolicy: S.optional(TieringPolicy),
    UUID: S.optional(S.String),
    OntapVolumeType: S.optional(OntapVolumeType),
    SnapshotPolicy: S.optional(S.String),
    CopyTagsToBackups: S.optional(S.Boolean),
    SnaplockConfiguration: S.optional(SnaplockConfiguration),
    VolumeStyle: S.optional(VolumeStyle),
    AggregateConfiguration: S.optional(AggregateConfiguration),
    SizeInBytes: S.optional(S.Number),
  }),
).annotate({
  identifier: "OntapVolumeConfiguration",
}) as any as S.Schema<OntapVolumeConfiguration>;
export type VolumeId = string;
export type VolumeType = "ONTAP" | "OPENZFS" | (string & {});
export const VolumeType = S.String;

export interface LifecycleTransitionReason {
  Message?: string;
}
export const LifecycleTransitionReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Message: S.optional(S.String) }),
).annotate({
  identifier: "LifecycleTransitionReason",
}) as any as S.Schema<LifecycleTransitionReason>;
export type VolumePath = string;
export type IntegerNoMax = number;
export type IntegerRecordSizeKiB = number;
export type OpenZFSDataCompressionType =
  | "NONE"
  | "ZSTD"
  | "LZ4"
  | (string & {});
export const OpenZFSDataCompressionType = S.String;

export type OpenZFSCopyStrategy =
  | "CLONE"
  | "FULL_COPY"
  | "INCREMENTAL_COPY"
  | (string & {});
export const OpenZFSCopyStrategy = S.String;

export interface OpenZFSOriginSnapshotConfiguration {
  SnapshotARN?: string;
  CopyStrategy?: OpenZFSCopyStrategy;
}
export const OpenZFSOriginSnapshotConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnapshotARN: S.optional(S.String),
    CopyStrategy: S.optional(OpenZFSCopyStrategy),
  }),
).annotate({
  identifier: "OpenZFSOriginSnapshotConfiguration",
}) as any as S.Schema<OpenZFSOriginSnapshotConfiguration>;
export type ReadOnly = boolean;
export type OpenZFSClients = string;
export type OpenZFSNfsExportOption = string;
export type OpenZFSNfsExportOptions = string[];
export const OpenZFSNfsExportOptions = /*@__PURE__*/ S.Array(S.String);
export interface OpenZFSClientConfiguration {
  Clients?: string;
  Options?: string[];
}
export const OpenZFSClientConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Clients: S.optional(S.String),
    Options: S.optional(OpenZFSNfsExportOptions),
  }),
).annotate({
  identifier: "OpenZFSClientConfiguration",
}) as any as S.Schema<OpenZFSClientConfiguration>;
export type OpenZFSClientConfigurations = OpenZFSClientConfiguration[];
export const OpenZFSClientConfigurations = /*@__PURE__*/ S.Array(
  OpenZFSClientConfiguration,
);
export interface OpenZFSNfsExport {
  ClientConfigurations?: OpenZFSClientConfiguration[];
}
export const OpenZFSNfsExport = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClientConfigurations: S.optional(OpenZFSClientConfigurations) }),
).annotate({
  identifier: "OpenZFSNfsExport",
}) as any as S.Schema<OpenZFSNfsExport>;
export type OpenZFSNfsExports = OpenZFSNfsExport[];
export const OpenZFSNfsExports = /*@__PURE__*/ S.Array(OpenZFSNfsExport);
export type OpenZFSQuotaType = "USER" | "GROUP" | (string & {});
export const OpenZFSQuotaType = S.String;

export interface OpenZFSUserOrGroupQuota {
  Type?: OpenZFSQuotaType;
  Id?: number;
  StorageCapacityQuotaGiB?: number;
}
export const OpenZFSUserOrGroupQuota = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(OpenZFSQuotaType),
    Id: S.optional(S.Number),
    StorageCapacityQuotaGiB: S.optional(S.Number),
  }),
).annotate({
  identifier: "OpenZFSUserOrGroupQuota",
}) as any as S.Schema<OpenZFSUserOrGroupQuota>;
export type OpenZFSUserAndGroupQuotas = OpenZFSUserOrGroupQuota[];
export const OpenZFSUserAndGroupQuotas = /*@__PURE__*/ S.Array(
  OpenZFSUserOrGroupQuota,
);
export type SnapshotId = string;
export interface OpenZFSVolumeConfiguration {
  ParentVolumeId?: string;
  VolumePath?: string;
  StorageCapacityReservationGiB?: number;
  StorageCapacityQuotaGiB?: number;
  RecordSizeKiB?: number;
  DataCompressionType?: OpenZFSDataCompressionType;
  CopyTagsToSnapshots?: boolean;
  OriginSnapshot?: OpenZFSOriginSnapshotConfiguration;
  ReadOnly?: boolean;
  NfsExports?: OpenZFSNfsExport[];
  UserAndGroupQuotas?: OpenZFSUserOrGroupQuota[];
  RestoreToSnapshot?: string;
  DeleteIntermediateSnaphots?: boolean;
  DeleteClonedVolumes?: boolean;
  DeleteIntermediateData?: boolean;
  SourceSnapshotARN?: string;
  DestinationSnapshot?: string;
  CopyStrategy?: OpenZFSCopyStrategy;
}
export const OpenZFSVolumeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParentVolumeId: S.optional(S.String),
    VolumePath: S.optional(S.String),
    StorageCapacityReservationGiB: S.optional(S.Number),
    StorageCapacityQuotaGiB: S.optional(S.Number),
    RecordSizeKiB: S.optional(S.Number),
    DataCompressionType: S.optional(OpenZFSDataCompressionType),
    CopyTagsToSnapshots: S.optional(S.Boolean),
    OriginSnapshot: S.optional(OpenZFSOriginSnapshotConfiguration),
    ReadOnly: S.optional(S.Boolean),
    NfsExports: S.optional(OpenZFSNfsExports),
    UserAndGroupQuotas: S.optional(OpenZFSUserAndGroupQuotas),
    RestoreToSnapshot: S.optional(S.String),
    DeleteIntermediateSnaphots: S.optional(S.Boolean),
    DeleteClonedVolumes: S.optional(S.Boolean),
    DeleteIntermediateData: S.optional(S.Boolean),
    SourceSnapshotARN: S.optional(S.String),
    DestinationSnapshot: S.optional(S.String),
    CopyStrategy: S.optional(OpenZFSCopyStrategy),
  }),
).annotate({
  identifier: "OpenZFSVolumeConfiguration",
}) as any as S.Schema<OpenZFSVolumeConfiguration>;
export interface Volume {
  CreationTime?: Date;
  FileSystemId?: string;
  Lifecycle?: VolumeLifecycle;
  Name?: string;
  OntapConfiguration?: OntapVolumeConfiguration;
  ResourceARN?: string;
  Tags?: Tag[];
  VolumeId?: string;
  VolumeType?: VolumeType;
  LifecycleTransitionReason?: LifecycleTransitionReason;
  AdministrativeActions?: AdministrativeAction[];
  OpenZFSConfiguration?: OpenZFSVolumeConfiguration;
}
export const Volume = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    FileSystemId: S.optional(S.String),
    Lifecycle: S.optional(VolumeLifecycle),
    Name: S.optional(S.String),
    OntapConfiguration: S.optional(OntapVolumeConfiguration),
    ResourceARN: S.optional(S.String),
    Tags: S.optional(Tags),
    VolumeId: S.optional(S.String),
    VolumeType: S.optional(VolumeType),
    LifecycleTransitionReason: S.optional(LifecycleTransitionReason),
    AdministrativeActions: S.optional(
      S.suspend(() => AdministrativeActions).annotate({
        identifier: "AdministrativeActions",
      }),
    ),
    OpenZFSConfiguration: S.optional(OpenZFSVolumeConfiguration),
  }),
).annotate({ identifier: "Volume" }) as any as S.Schema<Volume>;
export type SnapshotName = string;
export type SnapshotLifecycle =
  | "PENDING"
  | "CREATING"
  | "DELETING"
  | "AVAILABLE"
  | (string & {});
export const SnapshotLifecycle = S.String;

export interface Snapshot {
  ResourceARN?: string;
  SnapshotId?: string;
  Name?: string;
  VolumeId?: string;
  CreationTime?: Date;
  Lifecycle?: SnapshotLifecycle;
  LifecycleTransitionReason?: LifecycleTransitionReason;
  Tags?: Tag[];
  AdministrativeActions?: AdministrativeAction[];
}
export const Snapshot = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARN: S.optional(S.String),
    SnapshotId: S.optional(S.String),
    Name: S.optional(S.String),
    VolumeId: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Lifecycle: S.optional(SnapshotLifecycle),
    LifecycleTransitionReason: S.optional(LifecycleTransitionReason),
    Tags: S.optional(Tags),
    AdministrativeActions: S.optional(
      S.suspend(() => AdministrativeActions).annotate({
        identifier: "AdministrativeActions",
      }),
    ),
  }),
).annotate({ identifier: "Snapshot" }) as any as S.Schema<Snapshot>;
export type TotalTransferBytes = number;
export type RemainingTransferBytes = number;
export interface AdministrativeAction {
  AdministrativeActionType?: AdministrativeActionType;
  ProgressPercent?: number;
  RequestTime?: Date;
  Status?: Status;
  TargetFileSystemValues?: FileSystem;
  FailureDetails?: AdministrativeActionFailureDetails;
  TargetVolumeValues?: Volume;
  TargetSnapshotValues?: Snapshot;
  TotalTransferBytes?: number;
  RemainingTransferBytes?: number;
  Message?: string;
}
export const AdministrativeAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdministrativeActionType: S.optional(AdministrativeActionType),
    ProgressPercent: S.optional(S.Number),
    RequestTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(Status),
    TargetFileSystemValues: S.optional(
      S.suspend((): S.Schema<FileSystem> => FileSystem).annotate({
        identifier: "FileSystem",
      }),
    ),
    FailureDetails: S.optional(AdministrativeActionFailureDetails),
    TargetVolumeValues: S.optional(
      S.suspend((): S.Schema<Volume> => Volume).annotate({
        identifier: "Volume",
      }),
    ),
    TargetSnapshotValues: S.optional(
      S.suspend((): S.Schema<Snapshot> => Snapshot).annotate({
        identifier: "Snapshot",
      }),
    ),
    TotalTransferBytes: S.optional(S.Number),
    RemainingTransferBytes: S.optional(S.Number),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "AdministrativeAction",
}) as any as S.Schema<AdministrativeAction>;
export type AdministrativeActions = AdministrativeAction[];
export const AdministrativeActions = /*@__PURE__*/ S.Array(
  S.suspend(
    (): S.Schema<AdministrativeAction> => AdministrativeAction,
  ).annotate({ identifier: "AdministrativeAction" }),
) as any as S.Schema<AdministrativeActions>;
export type OntapDeploymentType =
  | "MULTI_AZ_1"
  | "SINGLE_AZ_1"
  | "SINGLE_AZ_2"
  | "MULTI_AZ_2"
  | (string & {});
export const OntapDeploymentType = S.String;

export type IpAddressRange = string;
export type OntapEndpointIpAddresses = string[];
export const OntapEndpointIpAddresses = /*@__PURE__*/ S.Array(S.String);
export interface FileSystemEndpoint {
  DNSName?: string;
  IpAddresses?: string[];
  Ipv6Addresses?: string[];
}
export const FileSystemEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DNSName: S.optional(S.String),
    IpAddresses: S.optional(OntapEndpointIpAddresses),
    Ipv6Addresses: S.optional(OntapEndpointIpAddresses),
  }),
).annotate({
  identifier: "FileSystemEndpoint",
}) as any as S.Schema<FileSystemEndpoint>;
export interface FileSystemEndpoints {
  Intercluster?: FileSystemEndpoint;
  Management?: FileSystemEndpoint;
}
export const FileSystemEndpoints = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Intercluster: S.optional(FileSystemEndpoint),
    Management: S.optional(FileSystemEndpoint),
  }),
).annotate({
  identifier: "FileSystemEndpoints",
}) as any as S.Schema<FileSystemEndpoints>;
export type RouteTableId = string;
export type RouteTableIds = string[];
export const RouteTableIds = /*@__PURE__*/ S.Array(S.String);
export type AdminPassword = string | redacted.Redacted<string>;
export type HAPairs = number;
export type ThroughputCapacityPerHAPair = number;
export type Ipv6AddressRange = string;
export interface OntapFileSystemConfiguration {
  AutomaticBackupRetentionDays?: number;
  DailyAutomaticBackupStartTime?: string;
  DeploymentType?: OntapDeploymentType;
  EndpointIpAddressRange?: string;
  Endpoints?: FileSystemEndpoints;
  DiskIopsConfiguration?: DiskIopsConfiguration;
  PreferredSubnetId?: string;
  RouteTableIds?: string[];
  ThroughputCapacity?: number;
  WeeklyMaintenanceStartTime?: string;
  FsxAdminPassword?: string | redacted.Redacted<string>;
  HAPairs?: number;
  ThroughputCapacityPerHAPair?: number;
  EndpointIpv6AddressRange?: string;
}
export const OntapFileSystemConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutomaticBackupRetentionDays: S.optional(S.Number),
    DailyAutomaticBackupStartTime: S.optional(S.String),
    DeploymentType: S.optional(OntapDeploymentType),
    EndpointIpAddressRange: S.optional(S.String),
    Endpoints: S.optional(FileSystemEndpoints),
    DiskIopsConfiguration: S.optional(DiskIopsConfiguration),
    PreferredSubnetId: S.optional(S.String),
    RouteTableIds: S.optional(RouteTableIds),
    ThroughputCapacity: S.optional(S.Number),
    WeeklyMaintenanceStartTime: S.optional(S.String),
    FsxAdminPassword: S.optional(SensitiveString),
    HAPairs: S.optional(S.Number),
    ThroughputCapacityPerHAPair: S.optional(S.Number),
    EndpointIpv6AddressRange: S.optional(S.String),
  }),
).annotate({
  identifier: "OntapFileSystemConfiguration",
}) as any as S.Schema<OntapFileSystemConfiguration>;
export type FileSystemTypeVersion = string;
export type OpenZFSDeploymentType =
  | "SINGLE_AZ_1"
  | "SINGLE_AZ_2"
  | "SINGLE_AZ_HA_1"
  | "SINGLE_AZ_HA_2"
  | "MULTI_AZ_1"
  | (string & {});
export const OpenZFSDeploymentType = S.String;

export type OpenZFSReadCacheSizingMode =
  | "NO_CACHE"
  | "USER_PROVISIONED"
  | "PROPORTIONAL_TO_THROUGHPUT_CAPACITY"
  | (string & {});
export const OpenZFSReadCacheSizingMode = S.String;

export interface OpenZFSReadCacheConfiguration {
  SizingMode?: OpenZFSReadCacheSizingMode;
  SizeGiB?: number;
}
export const OpenZFSReadCacheConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SizingMode: S.optional(OpenZFSReadCacheSizingMode),
    SizeGiB: S.optional(S.Number),
  }),
).annotate({
  identifier: "OpenZFSReadCacheConfiguration",
}) as any as S.Schema<OpenZFSReadCacheConfiguration>;
export interface OpenZFSFileSystemConfiguration {
  AutomaticBackupRetentionDays?: number;
  CopyTagsToBackups?: boolean;
  CopyTagsToVolumes?: boolean;
  DailyAutomaticBackupStartTime?: string;
  DeploymentType?: OpenZFSDeploymentType;
  ThroughputCapacity?: number;
  WeeklyMaintenanceStartTime?: string;
  DiskIopsConfiguration?: DiskIopsConfiguration;
  RootVolumeId?: string;
  PreferredSubnetId?: string;
  EndpointIpAddressRange?: string;
  EndpointIpv6AddressRange?: string;
  RouteTableIds?: string[];
  EndpointIpAddress?: string;
  EndpointIpv6Address?: string;
  ReadCacheConfiguration?: OpenZFSReadCacheConfiguration;
}
export const OpenZFSFileSystemConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutomaticBackupRetentionDays: S.optional(S.Number),
    CopyTagsToBackups: S.optional(S.Boolean),
    CopyTagsToVolumes: S.optional(S.Boolean),
    DailyAutomaticBackupStartTime: S.optional(S.String),
    DeploymentType: S.optional(OpenZFSDeploymentType),
    ThroughputCapacity: S.optional(S.Number),
    WeeklyMaintenanceStartTime: S.optional(S.String),
    DiskIopsConfiguration: S.optional(DiskIopsConfiguration),
    RootVolumeId: S.optional(S.String),
    PreferredSubnetId: S.optional(S.String),
    EndpointIpAddressRange: S.optional(S.String),
    EndpointIpv6AddressRange: S.optional(S.String),
    RouteTableIds: S.optional(RouteTableIds),
    EndpointIpAddress: S.optional(S.String),
    EndpointIpv6Address: S.optional(S.String),
    ReadCacheConfiguration: S.optional(OpenZFSReadCacheConfiguration),
  }),
).annotate({
  identifier: "OpenZFSFileSystemConfiguration",
}) as any as S.Schema<OpenZFSFileSystemConfiguration>;
export type NetworkType = "IPV4" | "DUAL" | (string & {});
export const NetworkType = S.String;

export interface FileSystem {
  OwnerId?: string;
  CreationTime?: Date;
  FileSystemId?: string;
  FileSystemType?: FileSystemType;
  Lifecycle?: FileSystemLifecycle;
  FailureDetails?: FileSystemFailureDetails;
  StorageCapacity?: number;
  StorageType?: StorageType;
  VpcId?: string;
  SubnetIds?: string[];
  NetworkInterfaceIds?: string[];
  DNSName?: string;
  KmsKeyId?: string;
  ResourceARN?: string;
  Tags?: Tag[];
  WindowsConfiguration?: WindowsFileSystemConfiguration;
  LustreConfiguration?: LustreFileSystemConfiguration;
  AdministrativeActions?: AdministrativeAction[];
  OntapConfiguration?: OntapFileSystemConfiguration;
  FileSystemTypeVersion?: string;
  OpenZFSConfiguration?: OpenZFSFileSystemConfiguration;
  NetworkType?: NetworkType;
}
export const FileSystem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OwnerId: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    FileSystemId: S.optional(S.String),
    FileSystemType: S.optional(FileSystemType),
    Lifecycle: S.optional(FileSystemLifecycle),
    FailureDetails: S.optional(FileSystemFailureDetails),
    StorageCapacity: S.optional(S.Number),
    StorageType: S.optional(StorageType),
    VpcId: S.optional(S.String),
    SubnetIds: S.optional(SubnetIds),
    NetworkInterfaceIds: S.optional(NetworkInterfaceIds),
    DNSName: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    ResourceARN: S.optional(S.String),
    Tags: S.optional(Tags),
    WindowsConfiguration: S.optional(WindowsFileSystemConfiguration),
    LustreConfiguration: S.optional(LustreFileSystemConfiguration),
    AdministrativeActions: S.optional(
      S.suspend(() => AdministrativeActions).annotate({
        identifier: "AdministrativeActions",
      }),
    ),
    OntapConfiguration: S.optional(OntapFileSystemConfiguration),
    FileSystemTypeVersion: S.optional(S.String),
    OpenZFSConfiguration: S.optional(OpenZFSFileSystemConfiguration),
    NetworkType: S.optional(NetworkType),
  }),
).annotate({ identifier: "FileSystem" }) as any as S.Schema<FileSystem>;
export interface ActiveDirectoryBackupAttributes {
  DomainName?: string;
  ActiveDirectoryId?: string;
  ResourceARN?: string;
}
export const ActiveDirectoryBackupAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.optional(S.String),
    ActiveDirectoryId: S.optional(S.String),
    ResourceARN: S.optional(S.String),
  }),
).annotate({
  identifier: "ActiveDirectoryBackupAttributes",
}) as any as S.Schema<ActiveDirectoryBackupAttributes>;
export type ResourceType = "FILE_SYSTEM" | "VOLUME" | (string & {});
export const ResourceType = S.String;

export type SizeInBytes = number;
export interface Backup {
  BackupId?: string;
  Lifecycle?: BackupLifecycle;
  FailureDetails?: BackupFailureDetails;
  Type?: BackupType;
  ProgressPercent?: number;
  CreationTime?: Date;
  KmsKeyId?: string;
  ResourceARN?: string;
  Tags?: Tag[];
  FileSystem?: FileSystem;
  DirectoryInformation?: ActiveDirectoryBackupAttributes;
  OwnerId?: string;
  SourceBackupId?: string;
  SourceBackupRegion?: string;
  ResourceType?: ResourceType;
  Volume?: Volume;
  SizeInBytes?: number;
}
export const Backup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BackupId: S.optional(S.String),
    Lifecycle: S.optional(BackupLifecycle),
    FailureDetails: S.optional(BackupFailureDetails),
    Type: S.optional(BackupType),
    ProgressPercent: S.optional(S.Number),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    KmsKeyId: S.optional(S.String),
    ResourceARN: S.optional(S.String),
    Tags: S.optional(Tags),
    FileSystem: S.optional(FileSystem),
    DirectoryInformation: S.optional(ActiveDirectoryBackupAttributes),
    OwnerId: S.optional(S.String),
    SourceBackupId: S.optional(S.String),
    SourceBackupRegion: S.optional(S.String),
    ResourceType: S.optional(ResourceType),
    Volume: S.optional(Volume),
    SizeInBytes: S.optional(S.Number),
  }),
).annotate({ identifier: "Backup" }) as any as S.Schema<Backup>;
export interface CopyBackupResponse {
  Backup?: Backup & {
    BackupId: BackupId;
    Lifecycle: BackupLifecycle;
    Type: BackupType;
    CreationTime: CreationTime;
    FileSystem: FileSystem & {
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      WindowsConfiguration: WindowsFileSystemConfiguration & {
        AuditLogConfiguration: WindowsAuditLogConfiguration & {
          FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
          FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
        };
        FsrmConfiguration: WindowsFsrmConfiguration & {
          FsrmServiceEnabled: Flag;
        };
      };
      LustreConfiguration: LustreFileSystemConfiguration & {
        LogConfiguration: LustreLogConfiguration & {
          Level: LustreAccessAuditLogLevel;
        };
        MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
          Mode: MetadataConfigurationMode;
        };
      };
      AdministrativeActions: (AdministrativeAction & {
        TargetVolumeValues: Volume & {
          OntapConfiguration: OntapVolumeConfiguration & {
            SnaplockConfiguration: SnaplockConfiguration & {
              AutocommitPeriod: AutocommitPeriod & {
                Type: AutocommitPeriodType;
              };
              RetentionPeriod: SnaplockRetentionPeriod & {
                DefaultRetention: RetentionPeriod & {
                  Type: RetentionPeriodType;
                };
                MinimumRetention: RetentionPeriod & {
                  Type: RetentionPeriodType;
                };
                MaximumRetention: RetentionPeriod & {
                  Type: RetentionPeriodType;
                };
              };
            };
          };
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
          OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
            NfsExports: (OpenZFSNfsExport & {
              ClientConfigurations: (OpenZFSClientConfiguration & {
                Clients: OpenZFSClients;
                Options: OpenZFSNfsExportOptions;
              })[];
            })[];
            UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
              Type: OpenZFSQuotaType;
              Id: IntegerNoMax;
              StorageCapacityQuotaGiB: IntegerNoMax;
            })[];
          };
        };
        TargetSnapshotValues: Snapshot & {
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        };
      })[];
    };
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    Volume: Volume & {
      OntapConfiguration: OntapVolumeConfiguration & {
        SnaplockConfiguration: SnaplockConfiguration & {
          AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
          RetentionPeriod: SnaplockRetentionPeriod & {
            DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
            MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
          };
        };
      };
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      AdministrativeActions: (AdministrativeAction & {
        TargetFileSystemValues: FileSystem & {
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
          WindowsConfiguration: WindowsFileSystemConfiguration & {
            AuditLogConfiguration: WindowsAuditLogConfiguration & {
              FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
              FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
            };
            FsrmConfiguration: WindowsFsrmConfiguration & {
              FsrmServiceEnabled: Flag;
            };
          };
          LustreConfiguration: LustreFileSystemConfiguration & {
            LogConfiguration: LustreLogConfiguration & {
              Level: LustreAccessAuditLogLevel;
            };
            MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
              Mode: MetadataConfigurationMode;
            };
          };
        };
        TargetSnapshotValues: Snapshot & {
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        };
      })[];
      OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
        NfsExports: (OpenZFSNfsExport & {
          ClientConfigurations: (OpenZFSClientConfiguration & {
            Clients: OpenZFSClients;
            Options: OpenZFSNfsExportOptions;
          })[];
        })[];
        UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
          Type: OpenZFSQuotaType;
          Id: IntegerNoMax;
          StorageCapacityQuotaGiB: IntegerNoMax;
        })[];
      };
    };
  };
}
export const CopyBackupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Backup: S.optional(Backup) }),
).annotate({
  identifier: "CopyBackupResponse",
}) as any as S.Schema<CopyBackupResponse>;
export type UpdateOpenZFSVolumeOption =
  | "DELETE_INTERMEDIATE_SNAPSHOTS"
  | "DELETE_CLONED_VOLUMES"
  | "DELETE_INTERMEDIATE_DATA"
  | (string & {});
export const UpdateOpenZFSVolumeOption = S.String;

export type UpdateOpenZFSVolumeOptions = UpdateOpenZFSVolumeOption[];
export const UpdateOpenZFSVolumeOptions = /*@__PURE__*/ S.Array(
  UpdateOpenZFSVolumeOption,
);
export interface CopySnapshotAndUpdateVolumeRequest {
  ClientRequestToken?: string;
  VolumeId?: string;
  SourceSnapshotARN?: string;
  CopyStrategy?: OpenZFSCopyStrategy;
  Options?: UpdateOpenZFSVolumeOption[];
}
export const CopySnapshotAndUpdateVolumeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    VolumeId: S.optional(S.String),
    SourceSnapshotARN: S.optional(S.String),
    CopyStrategy: S.optional(OpenZFSCopyStrategy),
    Options: S.optional(UpdateOpenZFSVolumeOptions),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CopySnapshotAndUpdateVolumeRequest",
}) as any as S.Schema<CopySnapshotAndUpdateVolumeRequest>;
export interface CopySnapshotAndUpdateVolumeResponse {
  VolumeId?: string;
  Lifecycle?: VolumeLifecycle;
  AdministrativeActions?: (AdministrativeAction & {
    TargetFileSystemValues: FileSystem & {
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      WindowsConfiguration: WindowsFileSystemConfiguration & {
        AuditLogConfiguration: WindowsAuditLogConfiguration & {
          FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
          FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
        };
        FsrmConfiguration: WindowsFsrmConfiguration & {
          FsrmServiceEnabled: Flag;
        };
      };
      LustreConfiguration: LustreFileSystemConfiguration & {
        LogConfiguration: LustreLogConfiguration & {
          Level: LustreAccessAuditLogLevel;
        };
        MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
          Mode: MetadataConfigurationMode;
        };
      };
    };
    TargetVolumeValues: Volume & {
      OntapConfiguration: OntapVolumeConfiguration & {
        SnaplockConfiguration: SnaplockConfiguration & {
          AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
          RetentionPeriod: SnaplockRetentionPeriod & {
            DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
            MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
          };
        };
      };
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
        NfsExports: (OpenZFSNfsExport & {
          ClientConfigurations: (OpenZFSClientConfiguration & {
            Clients: OpenZFSClients;
            Options: OpenZFSNfsExportOptions;
          })[];
        })[];
        UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
          Type: OpenZFSQuotaType;
          Id: IntegerNoMax;
          StorageCapacityQuotaGiB: IntegerNoMax;
        })[];
      };
    };
    TargetSnapshotValues: Snapshot & {
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    };
  })[];
}
export const CopySnapshotAndUpdateVolumeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VolumeId: S.optional(S.String),
    Lifecycle: S.optional(VolumeLifecycle),
    AdministrativeActions: S.optional(AdministrativeActions),
  }),
).annotate({
  identifier: "CopySnapshotAndUpdateVolumeResponse",
}) as any as S.Schema<CopySnapshotAndUpdateVolumeResponse>;
export type S3AccessPointAttachmentName = string;
export type S3AccessPointAttachmentType = "OPENZFS" | "ONTAP" | (string & {});
export const S3AccessPointAttachmentType = S.String;

export type OpenZFSFileSystemUserType = "POSIX" | (string & {});
export const OpenZFSFileSystemUserType = S.String;

export type FileSystemUID = number;
export type FileSystemGID = number;
export type FileSystemSecondaryGIDs = number[];
export const FileSystemSecondaryGIDs = /*@__PURE__*/ S.Array(S.Number);
export interface OpenZFSPosixFileSystemUser {
  Uid?: number;
  Gid?: number;
  SecondaryGids?: number[];
}
export const OpenZFSPosixFileSystemUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Uid: S.optional(S.Number),
    Gid: S.optional(S.Number),
    SecondaryGids: S.optional(FileSystemSecondaryGIDs),
  }),
).annotate({
  identifier: "OpenZFSPosixFileSystemUser",
}) as any as S.Schema<OpenZFSPosixFileSystemUser>;
export interface OpenZFSFileSystemIdentity {
  Type?: OpenZFSFileSystemUserType;
  PosixUser?: OpenZFSPosixFileSystemUser;
}
export const OpenZFSFileSystemIdentity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(OpenZFSFileSystemUserType),
    PosixUser: S.optional(OpenZFSPosixFileSystemUser),
  }),
).annotate({
  identifier: "OpenZFSFileSystemIdentity",
}) as any as S.Schema<OpenZFSFileSystemIdentity>;
export interface CreateAndAttachS3AccessPointOpenZFSConfiguration {
  VolumeId?: string;
  FileSystemIdentity?: OpenZFSFileSystemIdentity;
}
export const CreateAndAttachS3AccessPointOpenZFSConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      VolumeId: S.optional(S.String),
      FileSystemIdentity: S.optional(OpenZFSFileSystemIdentity),
    }),
  ).annotate({
    identifier: "CreateAndAttachS3AccessPointOpenZFSConfiguration",
  }) as any as S.Schema<CreateAndAttachS3AccessPointOpenZFSConfiguration>;
export type OntapFileSystemUserType = "UNIX" | "WINDOWS" | (string & {});
export const OntapFileSystemUserType = S.String;

export type OntapFileSystemUserName = string;
export interface OntapUnixFileSystemUser {
  Name?: string;
}
export const OntapUnixFileSystemUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "OntapUnixFileSystemUser",
}) as any as S.Schema<OntapUnixFileSystemUser>;
export interface OntapWindowsFileSystemUser {
  Name?: string;
}
export const OntapWindowsFileSystemUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "OntapWindowsFileSystemUser",
}) as any as S.Schema<OntapWindowsFileSystemUser>;
export interface OntapFileSystemIdentity {
  Type?: OntapFileSystemUserType;
  UnixUser?: OntapUnixFileSystemUser;
  WindowsUser?: OntapWindowsFileSystemUser;
}
export const OntapFileSystemIdentity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(OntapFileSystemUserType),
    UnixUser: S.optional(OntapUnixFileSystemUser),
    WindowsUser: S.optional(OntapWindowsFileSystemUser),
  }),
).annotate({
  identifier: "OntapFileSystemIdentity",
}) as any as S.Schema<OntapFileSystemIdentity>;
export interface CreateAndAttachS3AccessPointOntapConfiguration {
  VolumeId?: string;
  FileSystemIdentity?: OntapFileSystemIdentity;
}
export const CreateAndAttachS3AccessPointOntapConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      VolumeId: S.optional(S.String),
      FileSystemIdentity: S.optional(OntapFileSystemIdentity),
    }),
  ).annotate({
    identifier: "CreateAndAttachS3AccessPointOntapConfiguration",
  }) as any as S.Schema<CreateAndAttachS3AccessPointOntapConfiguration>;
export interface S3AccessPointVpcConfiguration {
  VpcId?: string;
}
export const S3AccessPointVpcConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcId: S.optional(S.String) }),
).annotate({
  identifier: "S3AccessPointVpcConfiguration",
}) as any as S.Schema<S3AccessPointVpcConfiguration>;
export type AccessPointPolicy = string;
export interface CreateAndAttachS3AccessPointS3Configuration {
  VpcConfiguration?: S3AccessPointVpcConfiguration;
  Policy?: string;
}
export const CreateAndAttachS3AccessPointS3Configuration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      VpcConfiguration: S.optional(S3AccessPointVpcConfiguration),
      Policy: S.optional(S.String),
    }),
  ).annotate({
    identifier: "CreateAndAttachS3AccessPointS3Configuration",
  }) as any as S.Schema<CreateAndAttachS3AccessPointS3Configuration>;
export interface CreateAndAttachS3AccessPointRequest {
  ClientRequestToken?: string;
  Name?: string;
  Type?: S3AccessPointAttachmentType;
  OpenZFSConfiguration?: CreateAndAttachS3AccessPointOpenZFSConfiguration;
  OntapConfiguration?: CreateAndAttachS3AccessPointOntapConfiguration;
  S3AccessPoint?: CreateAndAttachS3AccessPointS3Configuration;
}
export const CreateAndAttachS3AccessPointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Name: S.optional(S.String),
    Type: S.optional(S3AccessPointAttachmentType),
    OpenZFSConfiguration: S.optional(
      CreateAndAttachS3AccessPointOpenZFSConfiguration,
    ),
    OntapConfiguration: S.optional(
      CreateAndAttachS3AccessPointOntapConfiguration,
    ),
    S3AccessPoint: S.optional(CreateAndAttachS3AccessPointS3Configuration),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateAndAttachS3AccessPointRequest",
}) as any as S.Schema<CreateAndAttachS3AccessPointRequest>;
export type S3AccessPointAttachmentLifecycle =
  | "AVAILABLE"
  | "CREATING"
  | "DELETING"
  | "UPDATING"
  | "FAILED"
  | "MISCONFIGURED"
  | (string & {});
export const S3AccessPointAttachmentLifecycle = S.String;

export interface S3AccessPointOpenZFSConfiguration {
  VolumeId?: string;
  FileSystemIdentity?: OpenZFSFileSystemIdentity;
}
export const S3AccessPointOpenZFSConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VolumeId: S.optional(S.String),
    FileSystemIdentity: S.optional(OpenZFSFileSystemIdentity),
  }),
).annotate({
  identifier: "S3AccessPointOpenZFSConfiguration",
}) as any as S.Schema<S3AccessPointOpenZFSConfiguration>;
export interface S3AccessPointOntapConfiguration {
  VolumeId?: string;
  FileSystemIdentity?: OntapFileSystemIdentity;
}
export const S3AccessPointOntapConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VolumeId: S.optional(S.String),
    FileSystemIdentity: S.optional(OntapFileSystemIdentity),
  }),
).annotate({
  identifier: "S3AccessPointOntapConfiguration",
}) as any as S.Schema<S3AccessPointOntapConfiguration>;
export type S3AccessPointAlias = string;
export interface S3AccessPoint {
  ResourceARN?: string;
  Alias?: string;
  VpcConfiguration?: S3AccessPointVpcConfiguration;
}
export const S3AccessPoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARN: S.optional(S.String),
    Alias: S.optional(S.String),
    VpcConfiguration: S.optional(S3AccessPointVpcConfiguration),
  }),
).annotate({ identifier: "S3AccessPoint" }) as any as S.Schema<S3AccessPoint>;
export interface S3AccessPointAttachment {
  Lifecycle?: S3AccessPointAttachmentLifecycle;
  LifecycleTransitionReason?: LifecycleTransitionReason;
  CreationTime?: Date;
  Name?: string;
  Type?: S3AccessPointAttachmentType;
  OpenZFSConfiguration?: S3AccessPointOpenZFSConfiguration;
  OntapConfiguration?: S3AccessPointOntapConfiguration;
  S3AccessPoint?: S3AccessPoint;
}
export const S3AccessPointAttachment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Lifecycle: S.optional(S3AccessPointAttachmentLifecycle),
    LifecycleTransitionReason: S.optional(LifecycleTransitionReason),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Name: S.optional(S.String),
    Type: S.optional(S3AccessPointAttachmentType),
    OpenZFSConfiguration: S.optional(S3AccessPointOpenZFSConfiguration),
    OntapConfiguration: S.optional(S3AccessPointOntapConfiguration),
    S3AccessPoint: S.optional(S3AccessPoint),
  }),
).annotate({
  identifier: "S3AccessPointAttachment",
}) as any as S.Schema<S3AccessPointAttachment>;
export interface CreateAndAttachS3AccessPointResponse {
  S3AccessPointAttachment?: S3AccessPointAttachment & {
    OpenZFSConfiguration: S3AccessPointOpenZFSConfiguration & {
      FileSystemIdentity: OpenZFSFileSystemIdentity & {
        Type: OpenZFSFileSystemUserType;
        PosixUser: OpenZFSPosixFileSystemUser & {
          Uid: FileSystemUID;
          Gid: FileSystemGID;
        };
      };
    };
    OntapConfiguration: S3AccessPointOntapConfiguration & {
      FileSystemIdentity: OntapFileSystemIdentity & {
        Type: OntapFileSystemUserType;
        UnixUser: OntapUnixFileSystemUser & { Name: OntapFileSystemUserName };
        WindowsUser: OntapWindowsFileSystemUser & {
          Name: OntapFileSystemUserName;
        };
      };
    };
  };
}
export const CreateAndAttachS3AccessPointResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ S3AccessPointAttachment: S.optional(S3AccessPointAttachment) }),
).annotate({
  identifier: "CreateAndAttachS3AccessPointResponse",
}) as any as S.Schema<CreateAndAttachS3AccessPointResponse>;
export interface CreateBackupRequest {
  FileSystemId?: string;
  ClientRequestToken?: string;
  Tags?: Tag[];
  VolumeId?: string;
}
export const CreateBackupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileSystemId: S.optional(S.String),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(Tags),
    VolumeId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateBackupRequest",
}) as any as S.Schema<CreateBackupRequest>;
export interface CreateBackupResponse {
  Backup?: Backup & {
    BackupId: BackupId;
    Lifecycle: BackupLifecycle;
    Type: BackupType;
    CreationTime: CreationTime;
    FileSystem: FileSystem & {
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      WindowsConfiguration: WindowsFileSystemConfiguration & {
        AuditLogConfiguration: WindowsAuditLogConfiguration & {
          FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
          FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
        };
        FsrmConfiguration: WindowsFsrmConfiguration & {
          FsrmServiceEnabled: Flag;
        };
      };
      LustreConfiguration: LustreFileSystemConfiguration & {
        LogConfiguration: LustreLogConfiguration & {
          Level: LustreAccessAuditLogLevel;
        };
        MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
          Mode: MetadataConfigurationMode;
        };
      };
      AdministrativeActions: (AdministrativeAction & {
        TargetVolumeValues: Volume & {
          OntapConfiguration: OntapVolumeConfiguration & {
            SnaplockConfiguration: SnaplockConfiguration & {
              AutocommitPeriod: AutocommitPeriod & {
                Type: AutocommitPeriodType;
              };
              RetentionPeriod: SnaplockRetentionPeriod & {
                DefaultRetention: RetentionPeriod & {
                  Type: RetentionPeriodType;
                };
                MinimumRetention: RetentionPeriod & {
                  Type: RetentionPeriodType;
                };
                MaximumRetention: RetentionPeriod & {
                  Type: RetentionPeriodType;
                };
              };
            };
          };
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
          OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
            NfsExports: (OpenZFSNfsExport & {
              ClientConfigurations: (OpenZFSClientConfiguration & {
                Clients: OpenZFSClients;
                Options: OpenZFSNfsExportOptions;
              })[];
            })[];
            UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
              Type: OpenZFSQuotaType;
              Id: IntegerNoMax;
              StorageCapacityQuotaGiB: IntegerNoMax;
            })[];
          };
        };
        TargetSnapshotValues: Snapshot & {
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        };
      })[];
    };
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    Volume: Volume & {
      OntapConfiguration: OntapVolumeConfiguration & {
        SnaplockConfiguration: SnaplockConfiguration & {
          AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
          RetentionPeriod: SnaplockRetentionPeriod & {
            DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
            MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
          };
        };
      };
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      AdministrativeActions: (AdministrativeAction & {
        TargetFileSystemValues: FileSystem & {
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
          WindowsConfiguration: WindowsFileSystemConfiguration & {
            AuditLogConfiguration: WindowsAuditLogConfiguration & {
              FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
              FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
            };
            FsrmConfiguration: WindowsFsrmConfiguration & {
              FsrmServiceEnabled: Flag;
            };
          };
          LustreConfiguration: LustreFileSystemConfiguration & {
            LogConfiguration: LustreLogConfiguration & {
              Level: LustreAccessAuditLogLevel;
            };
            MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
              Mode: MetadataConfigurationMode;
            };
          };
        };
        TargetSnapshotValues: Snapshot & {
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        };
      })[];
      OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
        NfsExports: (OpenZFSNfsExport & {
          ClientConfigurations: (OpenZFSClientConfiguration & {
            Clients: OpenZFSClients;
            Options: OpenZFSNfsExportOptions;
          })[];
        })[];
        UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
          Type: OpenZFSQuotaType;
          Id: IntegerNoMax;
          StorageCapacityQuotaGiB: IntegerNoMax;
        })[];
      };
    };
  };
}
export const CreateBackupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Backup: S.optional(Backup) }),
).annotate({
  identifier: "CreateBackupResponse",
}) as any as S.Schema<CreateBackupResponse>;
export type Namespace = string;
export type BatchImportMetaDataOnCreate = boolean;
export type EventType = "NEW" | "CHANGED" | "DELETED" | (string & {});
export const EventType = S.String;

export type EventTypes = EventType[];
export const EventTypes = /*@__PURE__*/ S.Array(EventType);
export interface AutoImportPolicy {
  Events?: EventType[];
}
export const AutoImportPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Events: S.optional(EventTypes) }),
).annotate({
  identifier: "AutoImportPolicy",
}) as any as S.Schema<AutoImportPolicy>;
export interface AutoExportPolicy {
  Events?: EventType[];
}
export const AutoExportPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Events: S.optional(EventTypes) }),
).annotate({
  identifier: "AutoExportPolicy",
}) as any as S.Schema<AutoExportPolicy>;
export interface S3DataRepositoryConfiguration {
  AutoImportPolicy?: AutoImportPolicy;
  AutoExportPolicy?: AutoExportPolicy;
}
export const S3DataRepositoryConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutoImportPolicy: S.optional(AutoImportPolicy),
    AutoExportPolicy: S.optional(AutoExportPolicy),
  }),
).annotate({
  identifier: "S3DataRepositoryConfiguration",
}) as any as S.Schema<S3DataRepositoryConfiguration>;
export interface CreateDataRepositoryAssociationRequest {
  FileSystemId?: string;
  FileSystemPath?: string;
  DataRepositoryPath?: string;
  BatchImportMetaDataOnCreate?: boolean;
  ImportedFileChunkSize?: number;
  S3?: S3DataRepositoryConfiguration;
  ClientRequestToken?: string;
  Tags?: Tag[];
}
export const CreateDataRepositoryAssociationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FileSystemId: S.optional(S.String),
      FileSystemPath: S.optional(S.String),
      DataRepositoryPath: S.optional(S.String),
      BatchImportMetaDataOnCreate: S.optional(S.Boolean),
      ImportedFileChunkSize: S.optional(S.Number),
      S3: S.optional(S3DataRepositoryConfiguration),
      ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      Tags: S.optional(Tags),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "CreateDataRepositoryAssociationRequest",
}) as any as S.Schema<CreateDataRepositoryAssociationRequest>;
export type DataRepositoryAssociationId = string;
export type FileCacheId = string;
export type SubDirectoriesPaths = string[];
export const SubDirectoriesPaths = /*@__PURE__*/ S.Array(S.String);
export type NfsVersion = "NFS3" | (string & {});
export const NfsVersion = S.String;

export type RepositoryDnsIps = string[];
export const RepositoryDnsIps = /*@__PURE__*/ S.Array(S.String);
export interface NFSDataRepositoryConfiguration {
  Version?: NfsVersion;
  DnsIps?: string[];
  AutoExportPolicy?: AutoExportPolicy;
}
export const NFSDataRepositoryConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Version: S.optional(NfsVersion),
    DnsIps: S.optional(RepositoryDnsIps),
    AutoExportPolicy: S.optional(AutoExportPolicy),
  }),
).annotate({
  identifier: "NFSDataRepositoryConfiguration",
}) as any as S.Schema<NFSDataRepositoryConfiguration>;
export interface DataRepositoryAssociation {
  AssociationId?: string;
  ResourceARN?: string;
  FileSystemId?: string;
  Lifecycle?: DataRepositoryLifecycle;
  FailureDetails?: DataRepositoryFailureDetails;
  FileSystemPath?: string;
  DataRepositoryPath?: string;
  BatchImportMetaDataOnCreate?: boolean;
  ImportedFileChunkSize?: number;
  S3?: S3DataRepositoryConfiguration;
  Tags?: Tag[];
  CreationTime?: Date;
  FileCacheId?: string;
  FileCachePath?: string;
  DataRepositorySubdirectories?: string[];
  NFS?: NFSDataRepositoryConfiguration;
}
export const DataRepositoryAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssociationId: S.optional(S.String),
    ResourceARN: S.optional(S.String),
    FileSystemId: S.optional(S.String),
    Lifecycle: S.optional(DataRepositoryLifecycle),
    FailureDetails: S.optional(DataRepositoryFailureDetails),
    FileSystemPath: S.optional(S.String),
    DataRepositoryPath: S.optional(S.String),
    BatchImportMetaDataOnCreate: S.optional(S.Boolean),
    ImportedFileChunkSize: S.optional(S.Number),
    S3: S.optional(S3DataRepositoryConfiguration),
    Tags: S.optional(Tags),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    FileCacheId: S.optional(S.String),
    FileCachePath: S.optional(S.String),
    DataRepositorySubdirectories: S.optional(SubDirectoriesPaths),
    NFS: S.optional(NFSDataRepositoryConfiguration),
  }),
).annotate({
  identifier: "DataRepositoryAssociation",
}) as any as S.Schema<DataRepositoryAssociation>;
export interface CreateDataRepositoryAssociationResponse {
  Association?: DataRepositoryAssociation & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    NFS: NFSDataRepositoryConfiguration & { Version: NfsVersion };
  };
}
export const CreateDataRepositoryAssociationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Association: S.optional(DataRepositoryAssociation) }),
).annotate({
  identifier: "CreateDataRepositoryAssociationResponse",
}) as any as S.Schema<CreateDataRepositoryAssociationResponse>;
export type DataRepositoryTaskType =
  | "EXPORT_TO_REPOSITORY"
  | "IMPORT_METADATA_FROM_REPOSITORY"
  | "RELEASE_DATA_FROM_FILESYSTEM"
  | "AUTO_RELEASE_DATA"
  | (string & {});
export const DataRepositoryTaskType = S.String;

export type DataRepositoryTaskPath = string;
export type DataRepositoryTaskPaths = string[];
export const DataRepositoryTaskPaths = /*@__PURE__*/ S.Array(S.String);
export type ReportFormat = "REPORT_CSV_20191124" | (string & {});
export const ReportFormat = S.String;

export type ReportScope = "FAILED_FILES_ONLY" | (string & {});
export const ReportScope = S.String;

export interface CompletionReport {
  Enabled?: boolean;
  Path?: string;
  Format?: ReportFormat;
  Scope?: ReportScope;
}
export const CompletionReport = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    Path: S.optional(S.String),
    Format: S.optional(ReportFormat),
    Scope: S.optional(ReportScope),
  }),
).annotate({
  identifier: "CompletionReport",
}) as any as S.Schema<CompletionReport>;
export type CapacityToRelease = number;
export type Unit = "DAYS" | (string & {});
export const Unit = S.String;

export type Value = number;
export interface DurationSinceLastAccess {
  Unit?: Unit;
  Value?: number;
}
export const DurationSinceLastAccess = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Unit: S.optional(Unit), Value: S.optional(S.Number) }),
).annotate({
  identifier: "DurationSinceLastAccess",
}) as any as S.Schema<DurationSinceLastAccess>;
export interface ReleaseConfiguration {
  DurationSinceLastAccess?: DurationSinceLastAccess;
}
export const ReleaseConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DurationSinceLastAccess: S.optional(DurationSinceLastAccess) }),
).annotate({
  identifier: "ReleaseConfiguration",
}) as any as S.Schema<ReleaseConfiguration>;
export interface CreateDataRepositoryTaskRequest {
  Type?: DataRepositoryTaskType;
  Paths?: string[];
  FileSystemId?: string;
  Report?: CompletionReport;
  ClientRequestToken?: string;
  Tags?: Tag[];
  CapacityToRelease?: number;
  ReleaseConfiguration?: ReleaseConfiguration;
}
export const CreateDataRepositoryTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(DataRepositoryTaskType),
    Paths: S.optional(DataRepositoryTaskPaths),
    FileSystemId: S.optional(S.String),
    Report: S.optional(CompletionReport),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(Tags),
    CapacityToRelease: S.optional(S.Number),
    ReleaseConfiguration: S.optional(ReleaseConfiguration),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateDataRepositoryTaskRequest",
}) as any as S.Schema<CreateDataRepositoryTaskRequest>;
export type StartTime = Date;
export type EndTime = Date;
export interface DataRepositoryTaskFailureDetails {
  Message?: string;
}
export const DataRepositoryTaskFailureDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Message: S.optional(S.String) }),
).annotate({
  identifier: "DataRepositoryTaskFailureDetails",
}) as any as S.Schema<DataRepositoryTaskFailureDetails>;
export type TotalCount = number;
export type SucceededCount = number;
export type FailedCount = number;
export type LastUpdatedTime = Date;
export type ReleasedCapacity = number;
export interface DataRepositoryTaskStatus {
  TotalCount?: number;
  SucceededCount?: number;
  FailedCount?: number;
  LastUpdatedTime?: Date;
  ReleasedCapacity?: number;
}
export const DataRepositoryTaskStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TotalCount: S.optional(S.Number),
    SucceededCount: S.optional(S.Number),
    FailedCount: S.optional(S.Number),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ReleasedCapacity: S.optional(S.Number),
  }),
).annotate({
  identifier: "DataRepositoryTaskStatus",
}) as any as S.Schema<DataRepositoryTaskStatus>;
export interface DataRepositoryTask {
  TaskId?: string;
  Lifecycle?: DataRepositoryTaskLifecycle;
  Type?: DataRepositoryTaskType;
  CreationTime?: Date;
  StartTime?: Date;
  EndTime?: Date;
  ResourceARN?: string;
  Tags?: Tag[];
  FileSystemId?: string;
  Paths?: string[];
  FailureDetails?: DataRepositoryTaskFailureDetails;
  Status?: DataRepositoryTaskStatus;
  Report?: CompletionReport;
  CapacityToRelease?: number;
  FileCacheId?: string;
  ReleaseConfiguration?: ReleaseConfiguration;
}
export const DataRepositoryTask = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TaskId: S.optional(S.String),
    Lifecycle: S.optional(DataRepositoryTaskLifecycle),
    Type: S.optional(DataRepositoryTaskType),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ResourceARN: S.optional(S.String),
    Tags: S.optional(Tags),
    FileSystemId: S.optional(S.String),
    Paths: S.optional(DataRepositoryTaskPaths),
    FailureDetails: S.optional(DataRepositoryTaskFailureDetails),
    Status: S.optional(DataRepositoryTaskStatus),
    Report: S.optional(CompletionReport),
    CapacityToRelease: S.optional(S.Number),
    FileCacheId: S.optional(S.String),
    ReleaseConfiguration: S.optional(ReleaseConfiguration),
  }),
).annotate({
  identifier: "DataRepositoryTask",
}) as any as S.Schema<DataRepositoryTask>;
export interface CreateDataRepositoryTaskResponse {
  DataRepositoryTask?: DataRepositoryTask & {
    TaskId: TaskId;
    Lifecycle: DataRepositoryTaskLifecycle;
    Type: DataRepositoryTaskType;
    CreationTime: CreationTime;
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    Report: CompletionReport & { Enabled: Flag };
  };
}
export const CreateDataRepositoryTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataRepositoryTask: S.optional(DataRepositoryTask) }),
).annotate({
  identifier: "CreateDataRepositoryTaskResponse",
}) as any as S.Schema<CreateDataRepositoryTaskResponse>;
export type FileCacheType = "LUSTRE" | (string & {});
export const FileCacheType = S.String;

export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export const SecurityGroupIds = /*@__PURE__*/ S.Array(S.String);
export type CopyTagsToDataRepositoryAssociations = boolean;
export type FileCacheLustreDeploymentType = "CACHE_1" | (string & {});
export const FileCacheLustreDeploymentType = S.String;

export type MetadataStorageCapacity = number;
export interface FileCacheLustreMetadataConfiguration {
  StorageCapacity?: number;
}
export const FileCacheLustreMetadataConfiguration = /*@__PURE__*/ S.suspend(
  () => S.Struct({ StorageCapacity: S.optional(S.Number) }),
).annotate({
  identifier: "FileCacheLustreMetadataConfiguration",
}) as any as S.Schema<FileCacheLustreMetadataConfiguration>;
export interface CreateFileCacheLustreConfiguration {
  PerUnitStorageThroughput?: number;
  DeploymentType?: FileCacheLustreDeploymentType;
  WeeklyMaintenanceStartTime?: string;
  MetadataConfiguration?: FileCacheLustreMetadataConfiguration;
}
export const CreateFileCacheLustreConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PerUnitStorageThroughput: S.optional(S.Number),
    DeploymentType: S.optional(FileCacheLustreDeploymentType),
    WeeklyMaintenanceStartTime: S.optional(S.String),
    MetadataConfiguration: S.optional(FileCacheLustreMetadataConfiguration),
  }),
).annotate({
  identifier: "CreateFileCacheLustreConfiguration",
}) as any as S.Schema<CreateFileCacheLustreConfiguration>;
export interface FileCacheNFSConfiguration {
  Version?: NfsVersion;
  DnsIps?: string[];
}
export const FileCacheNFSConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Version: S.optional(NfsVersion),
    DnsIps: S.optional(RepositoryDnsIps),
  }),
).annotate({
  identifier: "FileCacheNFSConfiguration",
}) as any as S.Schema<FileCacheNFSConfiguration>;
export interface FileCacheDataRepositoryAssociation {
  FileCachePath?: string;
  DataRepositoryPath?: string;
  DataRepositorySubdirectories?: string[];
  NFS?: FileCacheNFSConfiguration;
}
export const FileCacheDataRepositoryAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileCachePath: S.optional(S.String),
    DataRepositoryPath: S.optional(S.String),
    DataRepositorySubdirectories: S.optional(SubDirectoriesPaths),
    NFS: S.optional(FileCacheNFSConfiguration),
  }),
).annotate({
  identifier: "FileCacheDataRepositoryAssociation",
}) as any as S.Schema<FileCacheDataRepositoryAssociation>;
export type CreateFileCacheDataRepositoryAssociations =
  FileCacheDataRepositoryAssociation[];
export const CreateFileCacheDataRepositoryAssociations = /*@__PURE__*/ S.Array(
  FileCacheDataRepositoryAssociation,
);
export interface CreateFileCacheRequest {
  ClientRequestToken?: string;
  FileCacheType?: FileCacheType;
  FileCacheTypeVersion?: string;
  StorageCapacity?: number;
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
  Tags?: Tag[];
  CopyTagsToDataRepositoryAssociations?: boolean;
  KmsKeyId?: string;
  LustreConfiguration?: CreateFileCacheLustreConfiguration;
  DataRepositoryAssociations?: FileCacheDataRepositoryAssociation[];
}
export const CreateFileCacheRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    FileCacheType: S.optional(FileCacheType),
    FileCacheTypeVersion: S.optional(S.String),
    StorageCapacity: S.optional(S.Number),
    SubnetIds: S.optional(SubnetIds),
    SecurityGroupIds: S.optional(SecurityGroupIds),
    Tags: S.optional(Tags),
    CopyTagsToDataRepositoryAssociations: S.optional(S.Boolean),
    KmsKeyId: S.optional(S.String),
    LustreConfiguration: S.optional(CreateFileCacheLustreConfiguration),
    DataRepositoryAssociations: S.optional(
      CreateFileCacheDataRepositoryAssociations,
    ),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateFileCacheRequest",
}) as any as S.Schema<CreateFileCacheRequest>;
export type FileCacheLifecycle =
  | "AVAILABLE"
  | "CREATING"
  | "DELETING"
  | "UPDATING"
  | "FAILED"
  | (string & {});
export const FileCacheLifecycle = S.String;

export interface FileCacheFailureDetails {
  Message?: string;
}
export const FileCacheFailureDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Message: S.optional(S.String) }),
).annotate({
  identifier: "FileCacheFailureDetails",
}) as any as S.Schema<FileCacheFailureDetails>;
export interface FileCacheLustreConfiguration {
  PerUnitStorageThroughput?: number;
  DeploymentType?: FileCacheLustreDeploymentType;
  MountName?: string;
  WeeklyMaintenanceStartTime?: string;
  MetadataConfiguration?: FileCacheLustreMetadataConfiguration;
  LogConfiguration?: LustreLogConfiguration;
}
export const FileCacheLustreConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PerUnitStorageThroughput: S.optional(S.Number),
    DeploymentType: S.optional(FileCacheLustreDeploymentType),
    MountName: S.optional(S.String),
    WeeklyMaintenanceStartTime: S.optional(S.String),
    MetadataConfiguration: S.optional(FileCacheLustreMetadataConfiguration),
    LogConfiguration: S.optional(LustreLogConfiguration),
  }),
).annotate({
  identifier: "FileCacheLustreConfiguration",
}) as any as S.Schema<FileCacheLustreConfiguration>;
export type DataRepositoryAssociationIds = string[];
export const DataRepositoryAssociationIds = /*@__PURE__*/ S.Array(S.String);
export interface FileCacheCreating {
  OwnerId?: string;
  CreationTime?: Date;
  FileCacheId?: string;
  FileCacheType?: FileCacheType;
  FileCacheTypeVersion?: string;
  Lifecycle?: FileCacheLifecycle;
  FailureDetails?: FileCacheFailureDetails;
  StorageCapacity?: number;
  VpcId?: string;
  SubnetIds?: string[];
  NetworkInterfaceIds?: string[];
  DNSName?: string;
  KmsKeyId?: string;
  ResourceARN?: string;
  Tags?: Tag[];
  CopyTagsToDataRepositoryAssociations?: boolean;
  LustreConfiguration?: FileCacheLustreConfiguration;
  DataRepositoryAssociationIds?: string[];
}
export const FileCacheCreating = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OwnerId: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    FileCacheId: S.optional(S.String),
    FileCacheType: S.optional(FileCacheType),
    FileCacheTypeVersion: S.optional(S.String),
    Lifecycle: S.optional(FileCacheLifecycle),
    FailureDetails: S.optional(FileCacheFailureDetails),
    StorageCapacity: S.optional(S.Number),
    VpcId: S.optional(S.String),
    SubnetIds: S.optional(SubnetIds),
    NetworkInterfaceIds: S.optional(NetworkInterfaceIds),
    DNSName: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    ResourceARN: S.optional(S.String),
    Tags: S.optional(Tags),
    CopyTagsToDataRepositoryAssociations: S.optional(S.Boolean),
    LustreConfiguration: S.optional(FileCacheLustreConfiguration),
    DataRepositoryAssociationIds: S.optional(DataRepositoryAssociationIds),
  }),
).annotate({
  identifier: "FileCacheCreating",
}) as any as S.Schema<FileCacheCreating>;
export interface CreateFileCacheResponse {
  FileCache?: FileCacheCreating & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    LustreConfiguration: FileCacheLustreConfiguration & {
      MetadataConfiguration: FileCacheLustreMetadataConfiguration & {
        StorageCapacity: MetadataStorageCapacity;
      };
      LogConfiguration: LustreLogConfiguration & {
        Level: LustreAccessAuditLogLevel;
      };
    };
  };
}
export const CreateFileCacheResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FileCache: S.optional(FileCacheCreating) }),
).annotate({
  identifier: "CreateFileCacheResponse",
}) as any as S.Schema<CreateFileCacheResponse>;
export type DirectoryPassword = string | redacted.Redacted<string>;
export interface SelfManagedActiveDirectoryConfiguration {
  DomainName?: string;
  OrganizationalUnitDistinguishedName?: string;
  FileSystemAdministratorsGroup?: string;
  UserName?: string;
  Password?: string | redacted.Redacted<string>;
  DnsIps?: string[];
  DomainJoinServiceAccountSecret?: string;
}
export const SelfManagedActiveDirectoryConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DomainName: S.optional(S.String),
      OrganizationalUnitDistinguishedName: S.optional(S.String),
      FileSystemAdministratorsGroup: S.optional(S.String),
      UserName: S.optional(S.String),
      Password: S.optional(SensitiveString),
      DnsIps: S.optional(DnsIps),
      DomainJoinServiceAccountSecret: S.optional(S.String),
    }),
).annotate({
  identifier: "SelfManagedActiveDirectoryConfiguration",
}) as any as S.Schema<SelfManagedActiveDirectoryConfiguration>;
export interface WindowsAuditLogCreateConfiguration {
  FileAccessAuditLogLevel?: WindowsAccessAuditLogLevel;
  FileShareAccessAuditLogLevel?: WindowsAccessAuditLogLevel;
  AuditLogDestination?: string;
}
export const WindowsAuditLogCreateConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileAccessAuditLogLevel: S.optional(WindowsAccessAuditLogLevel),
    FileShareAccessAuditLogLevel: S.optional(WindowsAccessAuditLogLevel),
    AuditLogDestination: S.optional(S.String),
  }),
).annotate({
  identifier: "WindowsAuditLogCreateConfiguration",
}) as any as S.Schema<WindowsAuditLogCreateConfiguration>;
export interface CreateFileSystemWindowsConfiguration {
  ActiveDirectoryId?: string;
  SelfManagedActiveDirectoryConfiguration?: SelfManagedActiveDirectoryConfiguration;
  DeploymentType?: WindowsDeploymentType;
  PreferredSubnetId?: string;
  ThroughputCapacity?: number;
  WeeklyMaintenanceStartTime?: string;
  DailyAutomaticBackupStartTime?: string;
  AutomaticBackupRetentionDays?: number;
  CopyTagsToBackups?: boolean;
  Aliases?: string[];
  AuditLogConfiguration?: WindowsAuditLogCreateConfiguration;
  DiskIopsConfiguration?: DiskIopsConfiguration;
  FsrmConfiguration?: WindowsFsrmConfiguration;
}
export const CreateFileSystemWindowsConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ActiveDirectoryId: S.optional(S.String),
      SelfManagedActiveDirectoryConfiguration: S.optional(
        SelfManagedActiveDirectoryConfiguration,
      ),
      DeploymentType: S.optional(WindowsDeploymentType),
      PreferredSubnetId: S.optional(S.String),
      ThroughputCapacity: S.optional(S.Number),
      WeeklyMaintenanceStartTime: S.optional(S.String),
      DailyAutomaticBackupStartTime: S.optional(S.String),
      AutomaticBackupRetentionDays: S.optional(S.Number),
      CopyTagsToBackups: S.optional(S.Boolean),
      Aliases: S.optional(AlternateDNSNames),
      AuditLogConfiguration: S.optional(WindowsAuditLogCreateConfiguration),
      DiskIopsConfiguration: S.optional(DiskIopsConfiguration),
      FsrmConfiguration: S.optional(WindowsFsrmConfiguration),
    }),
).annotate({
  identifier: "CreateFileSystemWindowsConfiguration",
}) as any as S.Schema<CreateFileSystemWindowsConfiguration>;
export interface LustreLogCreateConfiguration {
  Level?: LustreAccessAuditLogLevel;
  Destination?: string;
}
export const LustreLogCreateConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Level: S.optional(LustreAccessAuditLogLevel),
    Destination: S.optional(S.String),
  }),
).annotate({
  identifier: "LustreLogCreateConfiguration",
}) as any as S.Schema<LustreLogCreateConfiguration>;
export interface CreateFileSystemLustreMetadataConfiguration {
  Iops?: number;
  Mode?: MetadataConfigurationMode;
}
export const CreateFileSystemLustreMetadataConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Iops: S.optional(S.Number),
      Mode: S.optional(MetadataConfigurationMode),
    }),
  ).annotate({
    identifier: "CreateFileSystemLustreMetadataConfiguration",
  }) as any as S.Schema<CreateFileSystemLustreMetadataConfiguration>;
export interface CreateFileSystemLustreConfiguration {
  WeeklyMaintenanceStartTime?: string;
  ImportPath?: string;
  ExportPath?: string;
  ImportedFileChunkSize?: number;
  DeploymentType?: LustreDeploymentType;
  AutoImportPolicy?: AutoImportPolicyType;
  PerUnitStorageThroughput?: number;
  DailyAutomaticBackupStartTime?: string;
  AutomaticBackupRetentionDays?: number;
  CopyTagsToBackups?: boolean;
  DriveCacheType?: DriveCacheType;
  DataCompressionType?: DataCompressionType;
  EfaEnabled?: boolean;
  LogConfiguration?: LustreLogCreateConfiguration;
  RootSquashConfiguration?: LustreRootSquashConfiguration;
  MetadataConfiguration?: CreateFileSystemLustreMetadataConfiguration;
  ThroughputCapacity?: number;
  DataReadCacheConfiguration?: LustreReadCacheConfiguration;
}
export const CreateFileSystemLustreConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WeeklyMaintenanceStartTime: S.optional(S.String),
    ImportPath: S.optional(S.String),
    ExportPath: S.optional(S.String),
    ImportedFileChunkSize: S.optional(S.Number),
    DeploymentType: S.optional(LustreDeploymentType),
    AutoImportPolicy: S.optional(AutoImportPolicyType),
    PerUnitStorageThroughput: S.optional(S.Number),
    DailyAutomaticBackupStartTime: S.optional(S.String),
    AutomaticBackupRetentionDays: S.optional(S.Number),
    CopyTagsToBackups: S.optional(S.Boolean),
    DriveCacheType: S.optional(DriveCacheType),
    DataCompressionType: S.optional(DataCompressionType),
    EfaEnabled: S.optional(S.Boolean),
    LogConfiguration: S.optional(LustreLogCreateConfiguration),
    RootSquashConfiguration: S.optional(LustreRootSquashConfiguration),
    MetadataConfiguration: S.optional(
      CreateFileSystemLustreMetadataConfiguration,
    ),
    ThroughputCapacity: S.optional(S.Number),
    DataReadCacheConfiguration: S.optional(LustreReadCacheConfiguration),
  }),
).annotate({
  identifier: "CreateFileSystemLustreConfiguration",
}) as any as S.Schema<CreateFileSystemLustreConfiguration>;
export interface CreateFileSystemOntapConfiguration {
  AutomaticBackupRetentionDays?: number;
  DailyAutomaticBackupStartTime?: string;
  DeploymentType?: OntapDeploymentType;
  EndpointIpAddressRange?: string;
  FsxAdminPassword?: string | redacted.Redacted<string>;
  DiskIopsConfiguration?: DiskIopsConfiguration;
  PreferredSubnetId?: string;
  RouteTableIds?: string[];
  ThroughputCapacity?: number;
  WeeklyMaintenanceStartTime?: string;
  HAPairs?: number;
  ThroughputCapacityPerHAPair?: number;
  EndpointIpv6AddressRange?: string;
}
export const CreateFileSystemOntapConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutomaticBackupRetentionDays: S.optional(S.Number),
    DailyAutomaticBackupStartTime: S.optional(S.String),
    DeploymentType: S.optional(OntapDeploymentType),
    EndpointIpAddressRange: S.optional(S.String),
    FsxAdminPassword: S.optional(SensitiveString),
    DiskIopsConfiguration: S.optional(DiskIopsConfiguration),
    PreferredSubnetId: S.optional(S.String),
    RouteTableIds: S.optional(RouteTableIds),
    ThroughputCapacity: S.optional(S.Number),
    WeeklyMaintenanceStartTime: S.optional(S.String),
    HAPairs: S.optional(S.Number),
    ThroughputCapacityPerHAPair: S.optional(S.Number),
    EndpointIpv6AddressRange: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateFileSystemOntapConfiguration",
}) as any as S.Schema<CreateFileSystemOntapConfiguration>;
export interface OpenZFSCreateRootVolumeConfiguration {
  RecordSizeKiB?: number;
  DataCompressionType?: OpenZFSDataCompressionType;
  NfsExports?: OpenZFSNfsExport[];
  UserAndGroupQuotas?: OpenZFSUserOrGroupQuota[];
  CopyTagsToSnapshots?: boolean;
  ReadOnly?: boolean;
}
export const OpenZFSCreateRootVolumeConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RecordSizeKiB: S.optional(S.Number),
      DataCompressionType: S.optional(OpenZFSDataCompressionType),
      NfsExports: S.optional(OpenZFSNfsExports),
      UserAndGroupQuotas: S.optional(OpenZFSUserAndGroupQuotas),
      CopyTagsToSnapshots: S.optional(S.Boolean),
      ReadOnly: S.optional(S.Boolean),
    }),
).annotate({
  identifier: "OpenZFSCreateRootVolumeConfiguration",
}) as any as S.Schema<OpenZFSCreateRootVolumeConfiguration>;
export interface CreateFileSystemOpenZFSConfiguration {
  AutomaticBackupRetentionDays?: number;
  CopyTagsToBackups?: boolean;
  CopyTagsToVolumes?: boolean;
  DailyAutomaticBackupStartTime?: string;
  DeploymentType?: OpenZFSDeploymentType;
  ThroughputCapacity?: number;
  WeeklyMaintenanceStartTime?: string;
  DiskIopsConfiguration?: DiskIopsConfiguration;
  RootVolumeConfiguration?: OpenZFSCreateRootVolumeConfiguration;
  PreferredSubnetId?: string;
  EndpointIpAddressRange?: string;
  EndpointIpv6AddressRange?: string;
  RouteTableIds?: string[];
  ReadCacheConfiguration?: OpenZFSReadCacheConfiguration;
}
export const CreateFileSystemOpenZFSConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AutomaticBackupRetentionDays: S.optional(S.Number),
      CopyTagsToBackups: S.optional(S.Boolean),
      CopyTagsToVolumes: S.optional(S.Boolean),
      DailyAutomaticBackupStartTime: S.optional(S.String),
      DeploymentType: S.optional(OpenZFSDeploymentType),
      ThroughputCapacity: S.optional(S.Number),
      WeeklyMaintenanceStartTime: S.optional(S.String),
      DiskIopsConfiguration: S.optional(DiskIopsConfiguration),
      RootVolumeConfiguration: S.optional(OpenZFSCreateRootVolumeConfiguration),
      PreferredSubnetId: S.optional(S.String),
      EndpointIpAddressRange: S.optional(S.String),
      EndpointIpv6AddressRange: S.optional(S.String),
      RouteTableIds: S.optional(RouteTableIds),
      ReadCacheConfiguration: S.optional(OpenZFSReadCacheConfiguration),
    }),
).annotate({
  identifier: "CreateFileSystemOpenZFSConfiguration",
}) as any as S.Schema<CreateFileSystemOpenZFSConfiguration>;
export interface CreateFileSystemRequest {
  ClientRequestToken?: string;
  FileSystemType?: FileSystemType;
  StorageCapacity?: number;
  StorageType?: StorageType;
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
  Tags?: Tag[];
  KmsKeyId?: string;
  WindowsConfiguration?: CreateFileSystemWindowsConfiguration;
  LustreConfiguration?: CreateFileSystemLustreConfiguration;
  OntapConfiguration?: CreateFileSystemOntapConfiguration;
  FileSystemTypeVersion?: string;
  OpenZFSConfiguration?: CreateFileSystemOpenZFSConfiguration;
  NetworkType?: NetworkType;
}
export const CreateFileSystemRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    FileSystemType: S.optional(FileSystemType),
    StorageCapacity: S.optional(S.Number),
    StorageType: S.optional(StorageType),
    SubnetIds: S.optional(SubnetIds),
    SecurityGroupIds: S.optional(SecurityGroupIds),
    Tags: S.optional(Tags),
    KmsKeyId: S.optional(S.String),
    WindowsConfiguration: S.optional(CreateFileSystemWindowsConfiguration),
    LustreConfiguration: S.optional(CreateFileSystemLustreConfiguration),
    OntapConfiguration: S.optional(CreateFileSystemOntapConfiguration),
    FileSystemTypeVersion: S.optional(S.String),
    OpenZFSConfiguration: S.optional(CreateFileSystemOpenZFSConfiguration),
    NetworkType: S.optional(NetworkType),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateFileSystemRequest",
}) as any as S.Schema<CreateFileSystemRequest>;
export interface CreateFileSystemResponse {
  FileSystem?: FileSystem & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    WindowsConfiguration: WindowsFileSystemConfiguration & {
      AuditLogConfiguration: WindowsAuditLogConfiguration & {
        FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
        FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
      };
      FsrmConfiguration: WindowsFsrmConfiguration & {
        FsrmServiceEnabled: Flag;
      };
    };
    LustreConfiguration: LustreFileSystemConfiguration & {
      LogConfiguration: LustreLogConfiguration & {
        Level: LustreAccessAuditLogLevel;
      };
      MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
        Mode: MetadataConfigurationMode;
      };
    };
    AdministrativeActions: (AdministrativeAction & {
      TargetVolumeValues: Volume & {
        OntapConfiguration: OntapVolumeConfiguration & {
          SnaplockConfiguration: SnaplockConfiguration & {
            AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
            RetentionPeriod: SnaplockRetentionPeriod & {
              DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            };
          };
        };
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
          NfsExports: (OpenZFSNfsExport & {
            ClientConfigurations: (OpenZFSClientConfiguration & {
              Clients: OpenZFSClients;
              Options: OpenZFSNfsExportOptions;
            })[];
          })[];
          UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
            Type: OpenZFSQuotaType;
            Id: IntegerNoMax;
            StorageCapacityQuotaGiB: IntegerNoMax;
          })[];
        };
      };
      TargetSnapshotValues: Snapshot & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      };
    })[];
  };
}
export const CreateFileSystemResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FileSystem: S.optional(FileSystem) }),
).annotate({
  identifier: "CreateFileSystemResponse",
}) as any as S.Schema<CreateFileSystemResponse>;
export interface CreateFileSystemFromBackupRequest {
  BackupId?: string;
  ClientRequestToken?: string;
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
  Tags?: Tag[];
  WindowsConfiguration?: CreateFileSystemWindowsConfiguration;
  LustreConfiguration?: CreateFileSystemLustreConfiguration;
  StorageType?: StorageType;
  KmsKeyId?: string;
  FileSystemTypeVersion?: string;
  OpenZFSConfiguration?: CreateFileSystemOpenZFSConfiguration;
  StorageCapacity?: number;
  NetworkType?: NetworkType;
}
export const CreateFileSystemFromBackupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BackupId: S.optional(S.String),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    SubnetIds: S.optional(SubnetIds),
    SecurityGroupIds: S.optional(SecurityGroupIds),
    Tags: S.optional(Tags),
    WindowsConfiguration: S.optional(CreateFileSystemWindowsConfiguration),
    LustreConfiguration: S.optional(CreateFileSystemLustreConfiguration),
    StorageType: S.optional(StorageType),
    KmsKeyId: S.optional(S.String),
    FileSystemTypeVersion: S.optional(S.String),
    OpenZFSConfiguration: S.optional(CreateFileSystemOpenZFSConfiguration),
    StorageCapacity: S.optional(S.Number),
    NetworkType: S.optional(NetworkType),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateFileSystemFromBackupRequest",
}) as any as S.Schema<CreateFileSystemFromBackupRequest>;
export interface CreateFileSystemFromBackupResponse {
  FileSystem?: FileSystem & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    WindowsConfiguration: WindowsFileSystemConfiguration & {
      AuditLogConfiguration: WindowsAuditLogConfiguration & {
        FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
        FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
      };
      FsrmConfiguration: WindowsFsrmConfiguration & {
        FsrmServiceEnabled: Flag;
      };
    };
    LustreConfiguration: LustreFileSystemConfiguration & {
      LogConfiguration: LustreLogConfiguration & {
        Level: LustreAccessAuditLogLevel;
      };
      MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
        Mode: MetadataConfigurationMode;
      };
    };
    AdministrativeActions: (AdministrativeAction & {
      TargetVolumeValues: Volume & {
        OntapConfiguration: OntapVolumeConfiguration & {
          SnaplockConfiguration: SnaplockConfiguration & {
            AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
            RetentionPeriod: SnaplockRetentionPeriod & {
              DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            };
          };
        };
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
          NfsExports: (OpenZFSNfsExport & {
            ClientConfigurations: (OpenZFSClientConfiguration & {
              Clients: OpenZFSClients;
              Options: OpenZFSNfsExportOptions;
            })[];
          })[];
          UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
            Type: OpenZFSQuotaType;
            Id: IntegerNoMax;
            StorageCapacityQuotaGiB: IntegerNoMax;
          })[];
        };
      };
      TargetSnapshotValues: Snapshot & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      };
    })[];
  };
}
export const CreateFileSystemFromBackupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FileSystem: S.optional(FileSystem) }),
).annotate({
  identifier: "CreateFileSystemFromBackupResponse",
}) as any as S.Schema<CreateFileSystemFromBackupResponse>;
export interface CreateSnapshotRequest {
  ClientRequestToken?: string;
  Name?: string;
  VolumeId?: string;
  Tags?: Tag[];
}
export const CreateSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Name: S.optional(S.String),
    VolumeId: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateSnapshotRequest",
}) as any as S.Schema<CreateSnapshotRequest>;
export interface CreateSnapshotResponse {
  Snapshot?: Snapshot & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    AdministrativeActions: (AdministrativeAction & {
      TargetFileSystemValues: FileSystem & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        WindowsConfiguration: WindowsFileSystemConfiguration & {
          AuditLogConfiguration: WindowsAuditLogConfiguration & {
            FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
            FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
          };
          FsrmConfiguration: WindowsFsrmConfiguration & {
            FsrmServiceEnabled: Flag;
          };
        };
        LustreConfiguration: LustreFileSystemConfiguration & {
          LogConfiguration: LustreLogConfiguration & {
            Level: LustreAccessAuditLogLevel;
          };
          MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
            Mode: MetadataConfigurationMode;
          };
        };
      };
      TargetVolumeValues: Volume & {
        OntapConfiguration: OntapVolumeConfiguration & {
          SnaplockConfiguration: SnaplockConfiguration & {
            AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
            RetentionPeriod: SnaplockRetentionPeriod & {
              DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            };
          };
        };
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
          NfsExports: (OpenZFSNfsExport & {
            ClientConfigurations: (OpenZFSClientConfiguration & {
              Clients: OpenZFSClients;
              Options: OpenZFSNfsExportOptions;
            })[];
          })[];
          UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
            Type: OpenZFSQuotaType;
            Id: IntegerNoMax;
            StorageCapacityQuotaGiB: IntegerNoMax;
          })[];
        };
      };
    })[];
  };
}
export const CreateSnapshotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Snapshot: S.optional(Snapshot) }),
).annotate({
  identifier: "CreateSnapshotResponse",
}) as any as S.Schema<CreateSnapshotResponse>;
export type NetBiosAlias = string;
export interface CreateSvmActiveDirectoryConfiguration {
  NetBiosName?: string;
  SelfManagedActiveDirectoryConfiguration?: SelfManagedActiveDirectoryConfiguration;
}
export const CreateSvmActiveDirectoryConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NetBiosName: S.optional(S.String),
      SelfManagedActiveDirectoryConfiguration: S.optional(
        SelfManagedActiveDirectoryConfiguration,
      ),
    }),
).annotate({
  identifier: "CreateSvmActiveDirectoryConfiguration",
}) as any as S.Schema<CreateSvmActiveDirectoryConfiguration>;
export type StorageVirtualMachineName = string;
export type StorageVirtualMachineRootVolumeSecurityStyle =
  | "UNIX"
  | "NTFS"
  | "MIXED"
  | (string & {});
export const StorageVirtualMachineRootVolumeSecurityStyle = S.String;

export interface CreateStorageVirtualMachineRequest {
  ActiveDirectoryConfiguration?: CreateSvmActiveDirectoryConfiguration;
  ClientRequestToken?: string;
  FileSystemId?: string;
  Name?: string;
  SvmAdminPassword?: string | redacted.Redacted<string>;
  Tags?: Tag[];
  RootVolumeSecurityStyle?: StorageVirtualMachineRootVolumeSecurityStyle;
}
export const CreateStorageVirtualMachineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActiveDirectoryConfiguration: S.optional(
      CreateSvmActiveDirectoryConfiguration,
    ),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    FileSystemId: S.optional(S.String),
    Name: S.optional(S.String),
    SvmAdminPassword: S.optional(SensitiveString),
    Tags: S.optional(Tags),
    RootVolumeSecurityStyle: S.optional(
      StorageVirtualMachineRootVolumeSecurityStyle,
    ),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateStorageVirtualMachineRequest",
}) as any as S.Schema<CreateStorageVirtualMachineRequest>;
export interface SvmActiveDirectoryConfiguration {
  NetBiosName?: string;
  SelfManagedActiveDirectoryConfiguration?: SelfManagedActiveDirectoryAttributes;
}
export const SvmActiveDirectoryConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetBiosName: S.optional(S.String),
    SelfManagedActiveDirectoryConfiguration: S.optional(
      SelfManagedActiveDirectoryAttributes,
    ),
  }),
).annotate({
  identifier: "SvmActiveDirectoryConfiguration",
}) as any as S.Schema<SvmActiveDirectoryConfiguration>;
export interface SvmEndpoint {
  DNSName?: string;
  IpAddresses?: string[];
  Ipv6Addresses?: string[];
}
export const SvmEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DNSName: S.optional(S.String),
    IpAddresses: S.optional(OntapEndpointIpAddresses),
    Ipv6Addresses: S.optional(OntapEndpointIpAddresses),
  }),
).annotate({ identifier: "SvmEndpoint" }) as any as S.Schema<SvmEndpoint>;
export interface SvmEndpoints {
  Iscsi?: SvmEndpoint;
  Management?: SvmEndpoint;
  Nfs?: SvmEndpoint;
  Smb?: SvmEndpoint;
}
export const SvmEndpoints = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Iscsi: S.optional(SvmEndpoint),
    Management: S.optional(SvmEndpoint),
    Nfs: S.optional(SvmEndpoint),
    Smb: S.optional(SvmEndpoint),
  }),
).annotate({ identifier: "SvmEndpoints" }) as any as S.Schema<SvmEndpoints>;
export type StorageVirtualMachineLifecycle =
  | "CREATED"
  | "CREATING"
  | "DELETING"
  | "FAILED"
  | "MISCONFIGURED"
  | "PENDING"
  | (string & {});
export const StorageVirtualMachineLifecycle = S.String;

export type StorageVirtualMachineSubtype =
  | "DEFAULT"
  | "DP_DESTINATION"
  | "SYNC_DESTINATION"
  | "SYNC_SOURCE"
  | (string & {});
export const StorageVirtualMachineSubtype = S.String;

export interface StorageVirtualMachine {
  ActiveDirectoryConfiguration?: SvmActiveDirectoryConfiguration;
  CreationTime?: Date;
  Endpoints?: SvmEndpoints;
  FileSystemId?: string;
  Lifecycle?: StorageVirtualMachineLifecycle;
  Name?: string;
  ResourceARN?: string;
  StorageVirtualMachineId?: string;
  Subtype?: StorageVirtualMachineSubtype;
  UUID?: string;
  Tags?: Tag[];
  LifecycleTransitionReason?: LifecycleTransitionReason;
  RootVolumeSecurityStyle?: StorageVirtualMachineRootVolumeSecurityStyle;
}
export const StorageVirtualMachine = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActiveDirectoryConfiguration: S.optional(SvmActiveDirectoryConfiguration),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Endpoints: S.optional(SvmEndpoints),
    FileSystemId: S.optional(S.String),
    Lifecycle: S.optional(StorageVirtualMachineLifecycle),
    Name: S.optional(S.String),
    ResourceARN: S.optional(S.String),
    StorageVirtualMachineId: S.optional(S.String),
    Subtype: S.optional(StorageVirtualMachineSubtype),
    UUID: S.optional(S.String),
    Tags: S.optional(Tags),
    LifecycleTransitionReason: S.optional(LifecycleTransitionReason),
    RootVolumeSecurityStyle: S.optional(
      StorageVirtualMachineRootVolumeSecurityStyle,
    ),
  }),
).annotate({
  identifier: "StorageVirtualMachine",
}) as any as S.Schema<StorageVirtualMachine>;
export interface CreateStorageVirtualMachineResponse {
  StorageVirtualMachine?: StorageVirtualMachine & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
  };
}
export const CreateStorageVirtualMachineResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StorageVirtualMachine: S.optional(StorageVirtualMachine) }),
).annotate({
  identifier: "CreateStorageVirtualMachineResponse",
}) as any as S.Schema<CreateStorageVirtualMachineResponse>;
export type InputOntapVolumeType = "RW" | "DP" | (string & {});
export const InputOntapVolumeType = S.String;

export interface CreateSnaplockConfiguration {
  AuditLogVolume?: boolean;
  AutocommitPeriod?: AutocommitPeriod;
  PrivilegedDelete?: PrivilegedDelete;
  RetentionPeriod?: SnaplockRetentionPeriod;
  SnaplockType?: SnaplockType;
  VolumeAppendModeEnabled?: boolean;
}
export const CreateSnaplockConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuditLogVolume: S.optional(S.Boolean),
    AutocommitPeriod: S.optional(AutocommitPeriod),
    PrivilegedDelete: S.optional(PrivilegedDelete),
    RetentionPeriod: S.optional(SnaplockRetentionPeriod),
    SnaplockType: S.optional(SnaplockType),
    VolumeAppendModeEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "CreateSnaplockConfiguration",
}) as any as S.Schema<CreateSnaplockConfiguration>;
export type AggregateListMultiplier = number;
export interface CreateAggregateConfiguration {
  Aggregates?: string[];
  ConstituentsPerAggregate?: number;
}
export const CreateAggregateConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Aggregates: S.optional(Aggregates),
    ConstituentsPerAggregate: S.optional(S.Number),
  }),
).annotate({
  identifier: "CreateAggregateConfiguration",
}) as any as S.Schema<CreateAggregateConfiguration>;
export interface CreateOntapVolumeConfiguration {
  JunctionPath?: string;
  SecurityStyle?: SecurityStyle;
  SizeInMegabytes?: number;
  StorageEfficiencyEnabled?: boolean;
  StorageVirtualMachineId?: string;
  TieringPolicy?: TieringPolicy;
  OntapVolumeType?: InputOntapVolumeType;
  SnapshotPolicy?: string;
  CopyTagsToBackups?: boolean;
  SnaplockConfiguration?: CreateSnaplockConfiguration;
  VolumeStyle?: VolumeStyle;
  AggregateConfiguration?: CreateAggregateConfiguration;
  SizeInBytes?: number;
}
export const CreateOntapVolumeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JunctionPath: S.optional(S.String),
    SecurityStyle: S.optional(SecurityStyle),
    SizeInMegabytes: S.optional(S.Number),
    StorageEfficiencyEnabled: S.optional(S.Boolean),
    StorageVirtualMachineId: S.optional(S.String),
    TieringPolicy: S.optional(TieringPolicy),
    OntapVolumeType: S.optional(InputOntapVolumeType),
    SnapshotPolicy: S.optional(S.String),
    CopyTagsToBackups: S.optional(S.Boolean),
    SnaplockConfiguration: S.optional(CreateSnaplockConfiguration),
    VolumeStyle: S.optional(VolumeStyle),
    AggregateConfiguration: S.optional(CreateAggregateConfiguration),
    SizeInBytes: S.optional(S.Number),
  }),
).annotate({
  identifier: "CreateOntapVolumeConfiguration",
}) as any as S.Schema<CreateOntapVolumeConfiguration>;
export type IntegerNoMaxFromNegativeOne = number;
export interface CreateOpenZFSOriginSnapshotConfiguration {
  SnapshotARN?: string;
  CopyStrategy?: OpenZFSCopyStrategy;
}
export const CreateOpenZFSOriginSnapshotConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SnapshotARN: S.optional(S.String),
      CopyStrategy: S.optional(OpenZFSCopyStrategy),
    }),
).annotate({
  identifier: "CreateOpenZFSOriginSnapshotConfiguration",
}) as any as S.Schema<CreateOpenZFSOriginSnapshotConfiguration>;
export interface CreateOpenZFSVolumeConfiguration {
  ParentVolumeId?: string;
  StorageCapacityReservationGiB?: number;
  StorageCapacityQuotaGiB?: number;
  RecordSizeKiB?: number;
  DataCompressionType?: OpenZFSDataCompressionType;
  CopyTagsToSnapshots?: boolean;
  OriginSnapshot?: CreateOpenZFSOriginSnapshotConfiguration;
  ReadOnly?: boolean;
  NfsExports?: OpenZFSNfsExport[];
  UserAndGroupQuotas?: OpenZFSUserOrGroupQuota[];
}
export const CreateOpenZFSVolumeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParentVolumeId: S.optional(S.String),
    StorageCapacityReservationGiB: S.optional(S.Number),
    StorageCapacityQuotaGiB: S.optional(S.Number),
    RecordSizeKiB: S.optional(S.Number),
    DataCompressionType: S.optional(OpenZFSDataCompressionType),
    CopyTagsToSnapshots: S.optional(S.Boolean),
    OriginSnapshot: S.optional(CreateOpenZFSOriginSnapshotConfiguration),
    ReadOnly: S.optional(S.Boolean),
    NfsExports: S.optional(OpenZFSNfsExports),
    UserAndGroupQuotas: S.optional(OpenZFSUserAndGroupQuotas),
  }),
).annotate({
  identifier: "CreateOpenZFSVolumeConfiguration",
}) as any as S.Schema<CreateOpenZFSVolumeConfiguration>;
export interface CreateVolumeRequest {
  ClientRequestToken?: string;
  VolumeType?: VolumeType;
  Name?: string;
  OntapConfiguration?: CreateOntapVolumeConfiguration;
  Tags?: Tag[];
  OpenZFSConfiguration?: CreateOpenZFSVolumeConfiguration;
}
export const CreateVolumeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    VolumeType: S.optional(VolumeType),
    Name: S.optional(S.String),
    OntapConfiguration: S.optional(CreateOntapVolumeConfiguration),
    Tags: S.optional(Tags),
    OpenZFSConfiguration: S.optional(CreateOpenZFSVolumeConfiguration),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateVolumeRequest",
}) as any as S.Schema<CreateVolumeRequest>;
export interface CreateVolumeResponse {
  Volume?: Volume & {
    OntapConfiguration: OntapVolumeConfiguration & {
      SnaplockConfiguration: SnaplockConfiguration & {
        AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
        RetentionPeriod: SnaplockRetentionPeriod & {
          DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
          MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
          MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
        };
      };
    };
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    AdministrativeActions: (AdministrativeAction & {
      TargetFileSystemValues: FileSystem & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        WindowsConfiguration: WindowsFileSystemConfiguration & {
          AuditLogConfiguration: WindowsAuditLogConfiguration & {
            FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
            FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
          };
          FsrmConfiguration: WindowsFsrmConfiguration & {
            FsrmServiceEnabled: Flag;
          };
        };
        LustreConfiguration: LustreFileSystemConfiguration & {
          LogConfiguration: LustreLogConfiguration & {
            Level: LustreAccessAuditLogLevel;
          };
          MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
            Mode: MetadataConfigurationMode;
          };
        };
      };
      TargetSnapshotValues: Snapshot & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      };
    })[];
    OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
      NfsExports: (OpenZFSNfsExport & {
        ClientConfigurations: (OpenZFSClientConfiguration & {
          Clients: OpenZFSClients;
          Options: OpenZFSNfsExportOptions;
        })[];
      })[];
      UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
        Type: OpenZFSQuotaType;
        Id: IntegerNoMax;
        StorageCapacityQuotaGiB: IntegerNoMax;
      })[];
    };
  };
}
export const CreateVolumeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Volume: S.optional(Volume) }),
).annotate({
  identifier: "CreateVolumeResponse",
}) as any as S.Schema<CreateVolumeResponse>;
export interface CreateVolumeFromBackupRequest {
  BackupId?: string;
  ClientRequestToken?: string;
  Name?: string;
  OntapConfiguration?: CreateOntapVolumeConfiguration;
  Tags?: Tag[];
}
export const CreateVolumeFromBackupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BackupId: S.optional(S.String),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Name: S.optional(S.String),
    OntapConfiguration: S.optional(CreateOntapVolumeConfiguration),
    Tags: S.optional(Tags),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateVolumeFromBackupRequest",
}) as any as S.Schema<CreateVolumeFromBackupRequest>;
export interface CreateVolumeFromBackupResponse {
  Volume?: Volume & {
    OntapConfiguration: OntapVolumeConfiguration & {
      SnaplockConfiguration: SnaplockConfiguration & {
        AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
        RetentionPeriod: SnaplockRetentionPeriod & {
          DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
          MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
          MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
        };
      };
    };
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    AdministrativeActions: (AdministrativeAction & {
      TargetFileSystemValues: FileSystem & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        WindowsConfiguration: WindowsFileSystemConfiguration & {
          AuditLogConfiguration: WindowsAuditLogConfiguration & {
            FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
            FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
          };
          FsrmConfiguration: WindowsFsrmConfiguration & {
            FsrmServiceEnabled: Flag;
          };
        };
        LustreConfiguration: LustreFileSystemConfiguration & {
          LogConfiguration: LustreLogConfiguration & {
            Level: LustreAccessAuditLogLevel;
          };
          MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
            Mode: MetadataConfigurationMode;
          };
        };
      };
      TargetSnapshotValues: Snapshot & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      };
    })[];
    OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
      NfsExports: (OpenZFSNfsExport & {
        ClientConfigurations: (OpenZFSClientConfiguration & {
          Clients: OpenZFSClients;
          Options: OpenZFSNfsExportOptions;
        })[];
      })[];
      UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
        Type: OpenZFSQuotaType;
        Id: IntegerNoMax;
        StorageCapacityQuotaGiB: IntegerNoMax;
      })[];
    };
  };
}
export const CreateVolumeFromBackupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Volume: S.optional(Volume) }),
).annotate({
  identifier: "CreateVolumeFromBackupResponse",
}) as any as S.Schema<CreateVolumeFromBackupResponse>;
export interface DeleteBackupRequest {
  BackupId?: string;
  ClientRequestToken?: string;
}
export const DeleteBackupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BackupId: S.optional(S.String),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteBackupRequest",
}) as any as S.Schema<DeleteBackupRequest>;
export interface DeleteBackupResponse {
  BackupId?: string;
  Lifecycle?: BackupLifecycle;
}
export const DeleteBackupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BackupId: S.optional(S.String),
    Lifecycle: S.optional(BackupLifecycle),
  }),
).annotate({
  identifier: "DeleteBackupResponse",
}) as any as S.Schema<DeleteBackupResponse>;
export type DeleteDataInFileSystem = boolean;
export interface DeleteDataRepositoryAssociationRequest {
  AssociationId?: string;
  ClientRequestToken?: string;
  DeleteDataInFileSystem?: boolean;
}
export const DeleteDataRepositoryAssociationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AssociationId: S.optional(S.String),
      ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      DeleteDataInFileSystem: S.optional(S.Boolean),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DeleteDataRepositoryAssociationRequest",
}) as any as S.Schema<DeleteDataRepositoryAssociationRequest>;
export interface DeleteDataRepositoryAssociationResponse {
  AssociationId?: string;
  Lifecycle?: DataRepositoryLifecycle;
  DeleteDataInFileSystem?: boolean;
}
export const DeleteDataRepositoryAssociationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AssociationId: S.optional(S.String),
      Lifecycle: S.optional(DataRepositoryLifecycle),
      DeleteDataInFileSystem: S.optional(S.Boolean),
    }),
).annotate({
  identifier: "DeleteDataRepositoryAssociationResponse",
}) as any as S.Schema<DeleteDataRepositoryAssociationResponse>;
export interface DeleteFileCacheRequest {
  FileCacheId?: string;
  ClientRequestToken?: string;
}
export const DeleteFileCacheRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileCacheId: S.optional(S.String),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteFileCacheRequest",
}) as any as S.Schema<DeleteFileCacheRequest>;
export interface DeleteFileCacheResponse {
  FileCacheId?: string;
  Lifecycle?: FileCacheLifecycle;
}
export const DeleteFileCacheResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileCacheId: S.optional(S.String),
    Lifecycle: S.optional(FileCacheLifecycle),
  }),
).annotate({
  identifier: "DeleteFileCacheResponse",
}) as any as S.Schema<DeleteFileCacheResponse>;
export interface DeleteFileSystemWindowsConfiguration {
  SkipFinalBackup?: boolean;
  FinalBackupTags?: Tag[];
}
export const DeleteFileSystemWindowsConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SkipFinalBackup: S.optional(S.Boolean),
      FinalBackupTags: S.optional(Tags),
    }),
).annotate({
  identifier: "DeleteFileSystemWindowsConfiguration",
}) as any as S.Schema<DeleteFileSystemWindowsConfiguration>;
export interface DeleteFileSystemLustreConfiguration {
  SkipFinalBackup?: boolean;
  FinalBackupTags?: Tag[];
}
export const DeleteFileSystemLustreConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SkipFinalBackup: S.optional(S.Boolean),
    FinalBackupTags: S.optional(Tags),
  }),
).annotate({
  identifier: "DeleteFileSystemLustreConfiguration",
}) as any as S.Schema<DeleteFileSystemLustreConfiguration>;
export type DeleteFileSystemOpenZFSOption =
  | "DELETE_CHILD_VOLUMES_AND_SNAPSHOTS"
  | (string & {});
export const DeleteFileSystemOpenZFSOption = S.String;

export type DeleteFileSystemOpenZFSOptions = DeleteFileSystemOpenZFSOption[];
export const DeleteFileSystemOpenZFSOptions = /*@__PURE__*/ S.Array(
  DeleteFileSystemOpenZFSOption,
);
export interface DeleteFileSystemOpenZFSConfiguration {
  SkipFinalBackup?: boolean;
  FinalBackupTags?: Tag[];
  Options?: DeleteFileSystemOpenZFSOption[];
}
export const DeleteFileSystemOpenZFSConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SkipFinalBackup: S.optional(S.Boolean),
      FinalBackupTags: S.optional(Tags),
      Options: S.optional(DeleteFileSystemOpenZFSOptions),
    }),
).annotate({
  identifier: "DeleteFileSystemOpenZFSConfiguration",
}) as any as S.Schema<DeleteFileSystemOpenZFSConfiguration>;
export interface DeleteFileSystemRequest {
  FileSystemId?: string;
  ClientRequestToken?: string;
  WindowsConfiguration?: DeleteFileSystemWindowsConfiguration;
  LustreConfiguration?: DeleteFileSystemLustreConfiguration;
  OpenZFSConfiguration?: DeleteFileSystemOpenZFSConfiguration;
}
export const DeleteFileSystemRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileSystemId: S.optional(S.String),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    WindowsConfiguration: S.optional(DeleteFileSystemWindowsConfiguration),
    LustreConfiguration: S.optional(DeleteFileSystemLustreConfiguration),
    OpenZFSConfiguration: S.optional(DeleteFileSystemOpenZFSConfiguration),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteFileSystemRequest",
}) as any as S.Schema<DeleteFileSystemRequest>;
export interface DeleteFileSystemWindowsResponse {
  FinalBackupId?: string;
  FinalBackupTags?: Tag[];
}
export const DeleteFileSystemWindowsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FinalBackupId: S.optional(S.String),
    FinalBackupTags: S.optional(Tags),
  }),
).annotate({
  identifier: "DeleteFileSystemWindowsResponse",
}) as any as S.Schema<DeleteFileSystemWindowsResponse>;
export interface DeleteFileSystemLustreResponse {
  FinalBackupId?: string;
  FinalBackupTags?: Tag[];
}
export const DeleteFileSystemLustreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FinalBackupId: S.optional(S.String),
    FinalBackupTags: S.optional(Tags),
  }),
).annotate({
  identifier: "DeleteFileSystemLustreResponse",
}) as any as S.Schema<DeleteFileSystemLustreResponse>;
export interface DeleteFileSystemOpenZFSResponse {
  FinalBackupId?: string;
  FinalBackupTags?: Tag[];
}
export const DeleteFileSystemOpenZFSResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FinalBackupId: S.optional(S.String),
    FinalBackupTags: S.optional(Tags),
  }),
).annotate({
  identifier: "DeleteFileSystemOpenZFSResponse",
}) as any as S.Schema<DeleteFileSystemOpenZFSResponse>;
export interface DeleteFileSystemResponse {
  FileSystemId?: string;
  Lifecycle?: FileSystemLifecycle;
  WindowsResponse?: DeleteFileSystemWindowsResponse & {
    FinalBackupTags: (Tag & { Key: TagKey; Value: TagValue })[];
  };
  LustreResponse?: DeleteFileSystemLustreResponse & {
    FinalBackupTags: (Tag & { Key: TagKey; Value: TagValue })[];
  };
  OpenZFSResponse?: DeleteFileSystemOpenZFSResponse & {
    FinalBackupTags: (Tag & { Key: TagKey; Value: TagValue })[];
  };
}
export const DeleteFileSystemResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileSystemId: S.optional(S.String),
    Lifecycle: S.optional(FileSystemLifecycle),
    WindowsResponse: S.optional(DeleteFileSystemWindowsResponse),
    LustreResponse: S.optional(DeleteFileSystemLustreResponse),
    OpenZFSResponse: S.optional(DeleteFileSystemOpenZFSResponse),
  }),
).annotate({
  identifier: "DeleteFileSystemResponse",
}) as any as S.Schema<DeleteFileSystemResponse>;
export interface DeleteSnapshotRequest {
  ClientRequestToken?: string;
  SnapshotId?: string;
}
export const DeleteSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    SnapshotId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteSnapshotRequest",
}) as any as S.Schema<DeleteSnapshotRequest>;
export interface DeleteSnapshotResponse {
  SnapshotId?: string;
  Lifecycle?: SnapshotLifecycle;
}
export const DeleteSnapshotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnapshotId: S.optional(S.String),
    Lifecycle: S.optional(SnapshotLifecycle),
  }),
).annotate({
  identifier: "DeleteSnapshotResponse",
}) as any as S.Schema<DeleteSnapshotResponse>;
export interface DeleteStorageVirtualMachineRequest {
  ClientRequestToken?: string;
  StorageVirtualMachineId?: string;
}
export const DeleteStorageVirtualMachineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    StorageVirtualMachineId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteStorageVirtualMachineRequest",
}) as any as S.Schema<DeleteStorageVirtualMachineRequest>;
export interface DeleteStorageVirtualMachineResponse {
  StorageVirtualMachineId?: string;
  Lifecycle?: StorageVirtualMachineLifecycle;
}
export const DeleteStorageVirtualMachineResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StorageVirtualMachineId: S.optional(S.String),
    Lifecycle: S.optional(StorageVirtualMachineLifecycle),
  }),
).annotate({
  identifier: "DeleteStorageVirtualMachineResponse",
}) as any as S.Schema<DeleteStorageVirtualMachineResponse>;
export interface DeleteVolumeOntapConfiguration {
  SkipFinalBackup?: boolean;
  FinalBackupTags?: Tag[];
  BypassSnaplockEnterpriseRetention?: boolean;
}
export const DeleteVolumeOntapConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SkipFinalBackup: S.optional(S.Boolean),
    FinalBackupTags: S.optional(Tags),
    BypassSnaplockEnterpriseRetention: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DeleteVolumeOntapConfiguration",
}) as any as S.Schema<DeleteVolumeOntapConfiguration>;
export type DeleteOpenZFSVolumeOption =
  | "DELETE_CHILD_VOLUMES_AND_SNAPSHOTS"
  | (string & {});
export const DeleteOpenZFSVolumeOption = S.String;

export type DeleteOpenZFSVolumeOptions = DeleteOpenZFSVolumeOption[];
export const DeleteOpenZFSVolumeOptions = /*@__PURE__*/ S.Array(
  DeleteOpenZFSVolumeOption,
);
export interface DeleteVolumeOpenZFSConfiguration {
  Options?: DeleteOpenZFSVolumeOption[];
}
export const DeleteVolumeOpenZFSConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: S.optional(DeleteOpenZFSVolumeOptions) }),
).annotate({
  identifier: "DeleteVolumeOpenZFSConfiguration",
}) as any as S.Schema<DeleteVolumeOpenZFSConfiguration>;
export interface DeleteVolumeRequest {
  ClientRequestToken?: string;
  VolumeId?: string;
  OntapConfiguration?: DeleteVolumeOntapConfiguration;
  OpenZFSConfiguration?: DeleteVolumeOpenZFSConfiguration;
}
export const DeleteVolumeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    VolumeId: S.optional(S.String),
    OntapConfiguration: S.optional(DeleteVolumeOntapConfiguration),
    OpenZFSConfiguration: S.optional(DeleteVolumeOpenZFSConfiguration),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteVolumeRequest",
}) as any as S.Schema<DeleteVolumeRequest>;
export interface DeleteVolumeOntapResponse {
  FinalBackupId?: string;
  FinalBackupTags?: Tag[];
}
export const DeleteVolumeOntapResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FinalBackupId: S.optional(S.String),
    FinalBackupTags: S.optional(Tags),
  }),
).annotate({
  identifier: "DeleteVolumeOntapResponse",
}) as any as S.Schema<DeleteVolumeOntapResponse>;
export interface DeleteVolumeResponse {
  VolumeId?: string;
  Lifecycle?: VolumeLifecycle;
  OntapResponse?: DeleteVolumeOntapResponse & {
    FinalBackupTags: (Tag & { Key: TagKey; Value: TagValue })[];
  };
}
export const DeleteVolumeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VolumeId: S.optional(S.String),
    Lifecycle: S.optional(VolumeLifecycle),
    OntapResponse: S.optional(DeleteVolumeOntapResponse),
  }),
).annotate({
  identifier: "DeleteVolumeResponse",
}) as any as S.Schema<DeleteVolumeResponse>;
export type BackupIds = string[];
export const BackupIds = /*@__PURE__*/ S.Array(S.String);
export type FilterName =
  | "file-system-id"
  | "backup-type"
  | "file-system-type"
  | "volume-id"
  | "data-repository-type"
  | "file-cache-id"
  | "file-cache-type"
  | (string & {});
export const FilterName = S.String;

export type FilterValue = string;
export type FilterValues = string[];
export const FilterValues = /*@__PURE__*/ S.Array(S.String);
export interface Filter {
  Name?: FilterName;
  Values?: string[];
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(FilterName), Values: S.optional(FilterValues) }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type Filters = Filter[];
export const Filters = /*@__PURE__*/ S.Array(Filter);
export type MaxResults = number;
export type NextToken = string;
export interface DescribeBackupsRequest {
  BackupIds?: string[];
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeBackupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BackupIds: S.optional(BackupIds),
    Filters: S.optional(Filters),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeBackupsRequest",
}) as any as S.Schema<DescribeBackupsRequest>;
export type Backups = Backup[];
export const Backups = /*@__PURE__*/ S.Array(Backup);
export interface DescribeBackupsResponse {
  Backups?: (Backup & {
    BackupId: BackupId;
    Lifecycle: BackupLifecycle;
    Type: BackupType;
    CreationTime: CreationTime;
    FileSystem: FileSystem & {
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      WindowsConfiguration: WindowsFileSystemConfiguration & {
        AuditLogConfiguration: WindowsAuditLogConfiguration & {
          FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
          FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
        };
        FsrmConfiguration: WindowsFsrmConfiguration & {
          FsrmServiceEnabled: Flag;
        };
      };
      LustreConfiguration: LustreFileSystemConfiguration & {
        LogConfiguration: LustreLogConfiguration & {
          Level: LustreAccessAuditLogLevel;
        };
        MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
          Mode: MetadataConfigurationMode;
        };
      };
      AdministrativeActions: (AdministrativeAction & {
        TargetVolumeValues: Volume & {
          OntapConfiguration: OntapVolumeConfiguration & {
            SnaplockConfiguration: SnaplockConfiguration & {
              AutocommitPeriod: AutocommitPeriod & {
                Type: AutocommitPeriodType;
              };
              RetentionPeriod: SnaplockRetentionPeriod & {
                DefaultRetention: RetentionPeriod & {
                  Type: RetentionPeriodType;
                };
                MinimumRetention: RetentionPeriod & {
                  Type: RetentionPeriodType;
                };
                MaximumRetention: RetentionPeriod & {
                  Type: RetentionPeriodType;
                };
              };
            };
          };
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
          OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
            NfsExports: (OpenZFSNfsExport & {
              ClientConfigurations: (OpenZFSClientConfiguration & {
                Clients: OpenZFSClients;
                Options: OpenZFSNfsExportOptions;
              })[];
            })[];
            UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
              Type: OpenZFSQuotaType;
              Id: IntegerNoMax;
              StorageCapacityQuotaGiB: IntegerNoMax;
            })[];
          };
        };
        TargetSnapshotValues: Snapshot & {
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        };
      })[];
    };
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    Volume: Volume & {
      OntapConfiguration: OntapVolumeConfiguration & {
        SnaplockConfiguration: SnaplockConfiguration & {
          AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
          RetentionPeriod: SnaplockRetentionPeriod & {
            DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
            MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
          };
        };
      };
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      AdministrativeActions: (AdministrativeAction & {
        TargetFileSystemValues: FileSystem & {
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
          WindowsConfiguration: WindowsFileSystemConfiguration & {
            AuditLogConfiguration: WindowsAuditLogConfiguration & {
              FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
              FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
            };
            FsrmConfiguration: WindowsFsrmConfiguration & {
              FsrmServiceEnabled: Flag;
            };
          };
          LustreConfiguration: LustreFileSystemConfiguration & {
            LogConfiguration: LustreLogConfiguration & {
              Level: LustreAccessAuditLogLevel;
            };
            MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
              Mode: MetadataConfigurationMode;
            };
          };
        };
        TargetSnapshotValues: Snapshot & {
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        };
      })[];
      OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
        NfsExports: (OpenZFSNfsExport & {
          ClientConfigurations: (OpenZFSClientConfiguration & {
            Clients: OpenZFSClients;
            Options: OpenZFSNfsExportOptions;
          })[];
        })[];
        UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
          Type: OpenZFSQuotaType;
          Id: IntegerNoMax;
          StorageCapacityQuotaGiB: IntegerNoMax;
        })[];
      };
    };
  })[];
  NextToken?: string;
}
export const DescribeBackupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Backups: S.optional(Backups), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "DescribeBackupsResponse",
}) as any as S.Schema<DescribeBackupsResponse>;
export type LimitedMaxResults = number;
export interface DescribeDataRepositoryAssociationsRequest {
  AssociationIds?: string[];
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeDataRepositoryAssociationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AssociationIds: S.optional(DataRepositoryAssociationIds),
      Filters: S.optional(Filters),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DescribeDataRepositoryAssociationsRequest",
  }) as any as S.Schema<DescribeDataRepositoryAssociationsRequest>;
export type DataRepositoryAssociations = DataRepositoryAssociation[];
export const DataRepositoryAssociations = /*@__PURE__*/ S.Array(
  DataRepositoryAssociation,
);
export interface DescribeDataRepositoryAssociationsResponse {
  Associations?: (DataRepositoryAssociation & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    NFS: NFSDataRepositoryConfiguration & { Version: NfsVersion };
  })[];
  NextToken?: string;
}
export const DescribeDataRepositoryAssociationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Associations: S.optional(DataRepositoryAssociations),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "DescribeDataRepositoryAssociationsResponse",
  }) as any as S.Schema<DescribeDataRepositoryAssociationsResponse>;
export type TaskIds = string[];
export const TaskIds = /*@__PURE__*/ S.Array(S.String);
export type DataRepositoryTaskFilterName =
  | "file-system-id"
  | "task-lifecycle"
  | "data-repository-association-id"
  | "file-cache-id"
  | (string & {});
export const DataRepositoryTaskFilterName = S.String;

export type DataRepositoryTaskFilterValue = string;
export type DataRepositoryTaskFilterValues = string[];
export const DataRepositoryTaskFilterValues = /*@__PURE__*/ S.Array(S.String);
export interface DataRepositoryTaskFilter {
  Name?: DataRepositoryTaskFilterName;
  Values?: string[];
}
export const DataRepositoryTaskFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(DataRepositoryTaskFilterName),
    Values: S.optional(DataRepositoryTaskFilterValues),
  }),
).annotate({
  identifier: "DataRepositoryTaskFilter",
}) as any as S.Schema<DataRepositoryTaskFilter>;
export type DataRepositoryTaskFilters = DataRepositoryTaskFilter[];
export const DataRepositoryTaskFilters = /*@__PURE__*/ S.Array(
  DataRepositoryTaskFilter,
);
export interface DescribeDataRepositoryTasksRequest {
  TaskIds?: string[];
  Filters?: DataRepositoryTaskFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeDataRepositoryTasksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TaskIds: S.optional(TaskIds),
    Filters: S.optional(DataRepositoryTaskFilters),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeDataRepositoryTasksRequest",
}) as any as S.Schema<DescribeDataRepositoryTasksRequest>;
export type DataRepositoryTasks = DataRepositoryTask[];
export const DataRepositoryTasks = /*@__PURE__*/ S.Array(DataRepositoryTask);
export interface DescribeDataRepositoryTasksResponse {
  DataRepositoryTasks?: (DataRepositoryTask & {
    TaskId: TaskId;
    Lifecycle: DataRepositoryTaskLifecycle;
    Type: DataRepositoryTaskType;
    CreationTime: CreationTime;
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    Report: CompletionReport & { Enabled: Flag };
  })[];
  NextToken?: string;
}
export const DescribeDataRepositoryTasksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataRepositoryTasks: S.optional(DataRepositoryTasks),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeDataRepositoryTasksResponse",
}) as any as S.Schema<DescribeDataRepositoryTasksResponse>;
export type FileCacheIds = string[];
export const FileCacheIds = /*@__PURE__*/ S.Array(S.String);
export interface DescribeFileCachesRequest {
  FileCacheIds?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeFileCachesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileCacheIds: S.optional(FileCacheIds),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeFileCachesRequest",
}) as any as S.Schema<DescribeFileCachesRequest>;
export interface FileCache {
  OwnerId?: string;
  CreationTime?: Date;
  FileCacheId?: string;
  FileCacheType?: FileCacheType;
  FileCacheTypeVersion?: string;
  Lifecycle?: FileCacheLifecycle;
  FailureDetails?: FileCacheFailureDetails;
  StorageCapacity?: number;
  VpcId?: string;
  SubnetIds?: string[];
  NetworkInterfaceIds?: string[];
  DNSName?: string;
  KmsKeyId?: string;
  ResourceARN?: string;
  LustreConfiguration?: FileCacheLustreConfiguration;
  DataRepositoryAssociationIds?: string[];
}
export const FileCache = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OwnerId: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    FileCacheId: S.optional(S.String),
    FileCacheType: S.optional(FileCacheType),
    FileCacheTypeVersion: S.optional(S.String),
    Lifecycle: S.optional(FileCacheLifecycle),
    FailureDetails: S.optional(FileCacheFailureDetails),
    StorageCapacity: S.optional(S.Number),
    VpcId: S.optional(S.String),
    SubnetIds: S.optional(SubnetIds),
    NetworkInterfaceIds: S.optional(NetworkInterfaceIds),
    DNSName: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    ResourceARN: S.optional(S.String),
    LustreConfiguration: S.optional(FileCacheLustreConfiguration),
    DataRepositoryAssociationIds: S.optional(DataRepositoryAssociationIds),
  }),
).annotate({ identifier: "FileCache" }) as any as S.Schema<FileCache>;
export type FileCaches = FileCache[];
export const FileCaches = /*@__PURE__*/ S.Array(FileCache);
export interface DescribeFileCachesResponse {
  FileCaches?: (FileCache & {
    LustreConfiguration: FileCacheLustreConfiguration & {
      MetadataConfiguration: FileCacheLustreMetadataConfiguration & {
        StorageCapacity: MetadataStorageCapacity;
      };
      LogConfiguration: LustreLogConfiguration & {
        Level: LustreAccessAuditLogLevel;
      };
    };
  })[];
  NextToken?: string;
}
export const DescribeFileCachesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileCaches: S.optional(FileCaches),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeFileCachesResponse",
}) as any as S.Schema<DescribeFileCachesResponse>;
export interface DescribeFileSystemAliasesRequest {
  ClientRequestToken?: string;
  FileSystemId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeFileSystemAliasesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    FileSystemId: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeFileSystemAliasesRequest",
}) as any as S.Schema<DescribeFileSystemAliasesRequest>;
export interface DescribeFileSystemAliasesResponse {
  Aliases?: Alias[];
  NextToken?: string;
}
export const DescribeFileSystemAliasesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Aliases: S.optional(Aliases), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "DescribeFileSystemAliasesResponse",
}) as any as S.Schema<DescribeFileSystemAliasesResponse>;
export type FileSystemIds = string[];
export const FileSystemIds = /*@__PURE__*/ S.Array(S.String);
export interface DescribeFileSystemsRequest {
  FileSystemIds?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeFileSystemsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileSystemIds: S.optional(FileSystemIds),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeFileSystemsRequest",
}) as any as S.Schema<DescribeFileSystemsRequest>;
export type FileSystems = FileSystem[];
export const FileSystems = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<FileSystem> => FileSystem).annotate({
    identifier: "FileSystem",
  }),
);
export interface DescribeFileSystemsResponse {
  FileSystems?: (FileSystem & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    WindowsConfiguration: WindowsFileSystemConfiguration & {
      AuditLogConfiguration: WindowsAuditLogConfiguration & {
        FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
        FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
      };
      FsrmConfiguration: WindowsFsrmConfiguration & {
        FsrmServiceEnabled: Flag;
      };
    };
    LustreConfiguration: LustreFileSystemConfiguration & {
      LogConfiguration: LustreLogConfiguration & {
        Level: LustreAccessAuditLogLevel;
      };
      MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
        Mode: MetadataConfigurationMode;
      };
    };
    AdministrativeActions: (AdministrativeAction & {
      TargetVolumeValues: Volume & {
        OntapConfiguration: OntapVolumeConfiguration & {
          SnaplockConfiguration: SnaplockConfiguration & {
            AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
            RetentionPeriod: SnaplockRetentionPeriod & {
              DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            };
          };
        };
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
          NfsExports: (OpenZFSNfsExport & {
            ClientConfigurations: (OpenZFSClientConfiguration & {
              Clients: OpenZFSClients;
              Options: OpenZFSNfsExportOptions;
            })[];
          })[];
          UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
            Type: OpenZFSQuotaType;
            Id: IntegerNoMax;
            StorageCapacityQuotaGiB: IntegerNoMax;
          })[];
        };
      };
      TargetSnapshotValues: Snapshot & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      };
    })[];
  })[];
  NextToken?: string;
}
export const DescribeFileSystemsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileSystems: S.optional(FileSystems),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeFileSystemsResponse",
}) as any as S.Schema<DescribeFileSystemsResponse>;
export type S3AccessPointAttachmentNames = string[];
export const S3AccessPointAttachmentNames = /*@__PURE__*/ S.Array(S.String);
export type S3AccessPointAttachmentsFilterName =
  | "file-system-id"
  | "volume-id"
  | "type"
  | (string & {});
export const S3AccessPointAttachmentsFilterName = S.String;

export type S3AccessPointAttachmentsFilterValue = string;
export type S3AccessPointAttachmentsFilterValues = string[];
export const S3AccessPointAttachmentsFilterValues = /*@__PURE__*/ S.Array(
  S.String,
);
export interface S3AccessPointAttachmentsFilter {
  Name?: S3AccessPointAttachmentsFilterName;
  Values?: string[];
}
export const S3AccessPointAttachmentsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S3AccessPointAttachmentsFilterName),
    Values: S.optional(S3AccessPointAttachmentsFilterValues),
  }),
).annotate({
  identifier: "S3AccessPointAttachmentsFilter",
}) as any as S.Schema<S3AccessPointAttachmentsFilter>;
export type S3AccessPointAttachmentsFilters = S3AccessPointAttachmentsFilter[];
export const S3AccessPointAttachmentsFilters = /*@__PURE__*/ S.Array(
  S3AccessPointAttachmentsFilter,
);
export interface DescribeS3AccessPointAttachmentsRequest {
  Names?: string[];
  Filters?: S3AccessPointAttachmentsFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeS3AccessPointAttachmentsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Names: S.optional(S3AccessPointAttachmentNames),
      Filters: S.optional(S3AccessPointAttachmentsFilters),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DescribeS3AccessPointAttachmentsRequest",
}) as any as S.Schema<DescribeS3AccessPointAttachmentsRequest>;
export type S3AccessPointAttachments = S3AccessPointAttachment[];
export const S3AccessPointAttachments = /*@__PURE__*/ S.Array(
  S3AccessPointAttachment,
);
export interface DescribeS3AccessPointAttachmentsResponse {
  S3AccessPointAttachments?: (S3AccessPointAttachment & {
    OpenZFSConfiguration: S3AccessPointOpenZFSConfiguration & {
      FileSystemIdentity: OpenZFSFileSystemIdentity & {
        Type: OpenZFSFileSystemUserType;
        PosixUser: OpenZFSPosixFileSystemUser & {
          Uid: FileSystemUID;
          Gid: FileSystemGID;
        };
      };
    };
    OntapConfiguration: S3AccessPointOntapConfiguration & {
      FileSystemIdentity: OntapFileSystemIdentity & {
        Type: OntapFileSystemUserType;
        UnixUser: OntapUnixFileSystemUser & { Name: OntapFileSystemUserName };
        WindowsUser: OntapWindowsFileSystemUser & {
          Name: OntapFileSystemUserName;
        };
      };
    };
  })[];
  NextToken?: string;
}
export const DescribeS3AccessPointAttachmentsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      S3AccessPointAttachments: S.optional(S3AccessPointAttachments),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "DescribeS3AccessPointAttachmentsResponse",
}) as any as S.Schema<DescribeS3AccessPointAttachmentsResponse>;
export interface DescribeSharedVpcConfigurationRequest {}
export const DescribeSharedVpcConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({}).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DescribeSharedVpcConfigurationRequest",
}) as any as S.Schema<DescribeSharedVpcConfigurationRequest>;
export type VerboseFlag = string;
export interface DescribeSharedVpcConfigurationResponse {
  EnableFsxRouteTableUpdatesFromParticipantAccounts?: string;
}
export const DescribeSharedVpcConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      EnableFsxRouteTableUpdatesFromParticipantAccounts: S.optional(S.String),
    }),
).annotate({
  identifier: "DescribeSharedVpcConfigurationResponse",
}) as any as S.Schema<DescribeSharedVpcConfigurationResponse>;
export type SnapshotIds = string[];
export const SnapshotIds = /*@__PURE__*/ S.Array(S.String);
export type SnapshotFilterName = "file-system-id" | "volume-id" | (string & {});
export const SnapshotFilterName = S.String;

export type SnapshotFilterValue = string;
export type SnapshotFilterValues = string[];
export const SnapshotFilterValues = /*@__PURE__*/ S.Array(S.String);
export interface SnapshotFilter {
  Name?: SnapshotFilterName;
  Values?: string[];
}
export const SnapshotFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(SnapshotFilterName),
    Values: S.optional(SnapshotFilterValues),
  }),
).annotate({ identifier: "SnapshotFilter" }) as any as S.Schema<SnapshotFilter>;
export type SnapshotFilters = SnapshotFilter[];
export const SnapshotFilters = /*@__PURE__*/ S.Array(SnapshotFilter);
export type IncludeShared = boolean;
export interface DescribeSnapshotsRequest {
  SnapshotIds?: string[];
  Filters?: SnapshotFilter[];
  MaxResults?: number;
  NextToken?: string;
  IncludeShared?: boolean;
}
export const DescribeSnapshotsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnapshotIds: S.optional(SnapshotIds),
    Filters: S.optional(SnapshotFilters),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    IncludeShared: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeSnapshotsRequest",
}) as any as S.Schema<DescribeSnapshotsRequest>;
export type Snapshots = Snapshot[];
export const Snapshots = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<Snapshot> => Snapshot).annotate({
    identifier: "Snapshot",
  }),
);
export interface DescribeSnapshotsResponse {
  Snapshots?: (Snapshot & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    AdministrativeActions: (AdministrativeAction & {
      TargetFileSystemValues: FileSystem & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        WindowsConfiguration: WindowsFileSystemConfiguration & {
          AuditLogConfiguration: WindowsAuditLogConfiguration & {
            FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
            FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
          };
          FsrmConfiguration: WindowsFsrmConfiguration & {
            FsrmServiceEnabled: Flag;
          };
        };
        LustreConfiguration: LustreFileSystemConfiguration & {
          LogConfiguration: LustreLogConfiguration & {
            Level: LustreAccessAuditLogLevel;
          };
          MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
            Mode: MetadataConfigurationMode;
          };
        };
      };
      TargetVolumeValues: Volume & {
        OntapConfiguration: OntapVolumeConfiguration & {
          SnaplockConfiguration: SnaplockConfiguration & {
            AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
            RetentionPeriod: SnaplockRetentionPeriod & {
              DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            };
          };
        };
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
          NfsExports: (OpenZFSNfsExport & {
            ClientConfigurations: (OpenZFSClientConfiguration & {
              Clients: OpenZFSClients;
              Options: OpenZFSNfsExportOptions;
            })[];
          })[];
          UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
            Type: OpenZFSQuotaType;
            Id: IntegerNoMax;
            StorageCapacityQuotaGiB: IntegerNoMax;
          })[];
        };
      };
    })[];
  })[];
  NextToken?: string;
}
export const DescribeSnapshotsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Snapshots: S.optional(Snapshots),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeSnapshotsResponse",
}) as any as S.Schema<DescribeSnapshotsResponse>;
export type StorageVirtualMachineIds = string[];
export const StorageVirtualMachineIds = /*@__PURE__*/ S.Array(S.String);
export type StorageVirtualMachineFilterName = "file-system-id" | (string & {});
export const StorageVirtualMachineFilterName = S.String;

export type StorageVirtualMachineFilterValue = string;
export type StorageVirtualMachineFilterValues = string[];
export const StorageVirtualMachineFilterValues = /*@__PURE__*/ S.Array(
  S.String,
);
export interface StorageVirtualMachineFilter {
  Name?: StorageVirtualMachineFilterName;
  Values?: string[];
}
export const StorageVirtualMachineFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(StorageVirtualMachineFilterName),
    Values: S.optional(StorageVirtualMachineFilterValues),
  }),
).annotate({
  identifier: "StorageVirtualMachineFilter",
}) as any as S.Schema<StorageVirtualMachineFilter>;
export type StorageVirtualMachineFilters = StorageVirtualMachineFilter[];
export const StorageVirtualMachineFilters = /*@__PURE__*/ S.Array(
  StorageVirtualMachineFilter,
);
export interface DescribeStorageVirtualMachinesRequest {
  StorageVirtualMachineIds?: string[];
  Filters?: StorageVirtualMachineFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeStorageVirtualMachinesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StorageVirtualMachineIds: S.optional(StorageVirtualMachineIds),
      Filters: S.optional(StorageVirtualMachineFilters),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DescribeStorageVirtualMachinesRequest",
}) as any as S.Schema<DescribeStorageVirtualMachinesRequest>;
export type StorageVirtualMachines = StorageVirtualMachine[];
export const StorageVirtualMachines = /*@__PURE__*/ S.Array(
  StorageVirtualMachine,
);
export interface DescribeStorageVirtualMachinesResponse {
  StorageVirtualMachines?: (StorageVirtualMachine & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
  })[];
  NextToken?: string;
}
export const DescribeStorageVirtualMachinesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StorageVirtualMachines: S.optional(StorageVirtualMachines),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "DescribeStorageVirtualMachinesResponse",
}) as any as S.Schema<DescribeStorageVirtualMachinesResponse>;
export type VolumeIds = string[];
export const VolumeIds = /*@__PURE__*/ S.Array(S.String);
export type VolumeFilterName =
  | "file-system-id"
  | "storage-virtual-machine-id"
  | (string & {});
export const VolumeFilterName = S.String;

export type VolumeFilterValue = string;
export type VolumeFilterValues = string[];
export const VolumeFilterValues = /*@__PURE__*/ S.Array(S.String);
export interface VolumeFilter {
  Name?: VolumeFilterName;
  Values?: string[];
}
export const VolumeFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(VolumeFilterName),
    Values: S.optional(VolumeFilterValues),
  }),
).annotate({ identifier: "VolumeFilter" }) as any as S.Schema<VolumeFilter>;
export type VolumeFilters = VolumeFilter[];
export const VolumeFilters = /*@__PURE__*/ S.Array(VolumeFilter);
export interface DescribeVolumesRequest {
  VolumeIds?: string[];
  Filters?: VolumeFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeVolumesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VolumeIds: S.optional(VolumeIds),
    Filters: S.optional(VolumeFilters),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeVolumesRequest",
}) as any as S.Schema<DescribeVolumesRequest>;
export type Volumes = Volume[];
export const Volumes = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<Volume> => Volume).annotate({ identifier: "Volume" }),
);
export interface DescribeVolumesResponse {
  Volumes?: (Volume & {
    OntapConfiguration: OntapVolumeConfiguration & {
      SnaplockConfiguration: SnaplockConfiguration & {
        AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
        RetentionPeriod: SnaplockRetentionPeriod & {
          DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
          MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
          MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
        };
      };
    };
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    AdministrativeActions: (AdministrativeAction & {
      TargetFileSystemValues: FileSystem & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        WindowsConfiguration: WindowsFileSystemConfiguration & {
          AuditLogConfiguration: WindowsAuditLogConfiguration & {
            FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
            FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
          };
          FsrmConfiguration: WindowsFsrmConfiguration & {
            FsrmServiceEnabled: Flag;
          };
        };
        LustreConfiguration: LustreFileSystemConfiguration & {
          LogConfiguration: LustreLogConfiguration & {
            Level: LustreAccessAuditLogLevel;
          };
          MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
            Mode: MetadataConfigurationMode;
          };
        };
      };
      TargetSnapshotValues: Snapshot & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      };
    })[];
    OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
      NfsExports: (OpenZFSNfsExport & {
        ClientConfigurations: (OpenZFSClientConfiguration & {
          Clients: OpenZFSClients;
          Options: OpenZFSNfsExportOptions;
        })[];
      })[];
      UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
        Type: OpenZFSQuotaType;
        Id: IntegerNoMax;
        StorageCapacityQuotaGiB: IntegerNoMax;
      })[];
    };
  })[];
  NextToken?: string;
}
export const DescribeVolumesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Volumes: S.optional(Volumes), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "DescribeVolumesResponse",
}) as any as S.Schema<DescribeVolumesResponse>;
export interface DetachAndDeleteS3AccessPointRequest {
  ClientRequestToken?: string;
  Name?: string;
}
export const DetachAndDeleteS3AccessPointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Name: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DetachAndDeleteS3AccessPointRequest",
}) as any as S.Schema<DetachAndDeleteS3AccessPointRequest>;
export interface DetachAndDeleteS3AccessPointResponse {
  Lifecycle?: S3AccessPointAttachmentLifecycle;
  Name?: string;
}
export const DetachAndDeleteS3AccessPointResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Lifecycle: S.optional(S3AccessPointAttachmentLifecycle),
      Name: S.optional(S.String),
    }),
).annotate({
  identifier: "DetachAndDeleteS3AccessPointResponse",
}) as any as S.Schema<DetachAndDeleteS3AccessPointResponse>;
export interface DisassociateFileSystemAliasesRequest {
  ClientRequestToken?: string;
  FileSystemId?: string;
  Aliases?: string[];
}
export const DisassociateFileSystemAliasesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      FileSystemId: S.optional(S.String),
      Aliases: S.optional(AlternateDNSNames),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DisassociateFileSystemAliasesRequest",
}) as any as S.Schema<DisassociateFileSystemAliasesRequest>;
export interface DisassociateFileSystemAliasesResponse {
  Aliases?: Alias[];
}
export const DisassociateFileSystemAliasesResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Aliases: S.optional(Aliases) }),
).annotate({
  identifier: "DisassociateFileSystemAliasesResponse",
}) as any as S.Schema<DisassociateFileSystemAliasesResponse>;
export interface ListTagsForResourceRequest {
  ResourceARN?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARN: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  Tags?: (Tag & { Key: TagKey; Value: TagValue })[];
  NextToken?: string;
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(Tags), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ReleaseFileSystemNfsV3LocksRequest {
  FileSystemId?: string;
  ClientRequestToken?: string;
}
export const ReleaseFileSystemNfsV3LocksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileSystemId: S.optional(S.String),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ReleaseFileSystemNfsV3LocksRequest",
}) as any as S.Schema<ReleaseFileSystemNfsV3LocksRequest>;
export interface ReleaseFileSystemNfsV3LocksResponse {
  FileSystem?: FileSystem & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    WindowsConfiguration: WindowsFileSystemConfiguration & {
      AuditLogConfiguration: WindowsAuditLogConfiguration & {
        FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
        FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
      };
      FsrmConfiguration: WindowsFsrmConfiguration & {
        FsrmServiceEnabled: Flag;
      };
    };
    LustreConfiguration: LustreFileSystemConfiguration & {
      LogConfiguration: LustreLogConfiguration & {
        Level: LustreAccessAuditLogLevel;
      };
      MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
        Mode: MetadataConfigurationMode;
      };
    };
    AdministrativeActions: (AdministrativeAction & {
      TargetVolumeValues: Volume & {
        OntapConfiguration: OntapVolumeConfiguration & {
          SnaplockConfiguration: SnaplockConfiguration & {
            AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
            RetentionPeriod: SnaplockRetentionPeriod & {
              DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            };
          };
        };
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
          NfsExports: (OpenZFSNfsExport & {
            ClientConfigurations: (OpenZFSClientConfiguration & {
              Clients: OpenZFSClients;
              Options: OpenZFSNfsExportOptions;
            })[];
          })[];
          UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
            Type: OpenZFSQuotaType;
            Id: IntegerNoMax;
            StorageCapacityQuotaGiB: IntegerNoMax;
          })[];
        };
      };
      TargetSnapshotValues: Snapshot & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      };
    })[];
  };
}
export const ReleaseFileSystemNfsV3LocksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FileSystem: S.optional(FileSystem) }),
).annotate({
  identifier: "ReleaseFileSystemNfsV3LocksResponse",
}) as any as S.Schema<ReleaseFileSystemNfsV3LocksResponse>;
export type RestoreOpenZFSVolumeOption =
  | "DELETE_INTERMEDIATE_SNAPSHOTS"
  | "DELETE_CLONED_VOLUMES"
  | (string & {});
export const RestoreOpenZFSVolumeOption = S.String;

export type RestoreOpenZFSVolumeOptions = RestoreOpenZFSVolumeOption[];
export const RestoreOpenZFSVolumeOptions = /*@__PURE__*/ S.Array(
  RestoreOpenZFSVolumeOption,
);
export interface RestoreVolumeFromSnapshotRequest {
  ClientRequestToken?: string;
  VolumeId?: string;
  SnapshotId?: string;
  Options?: RestoreOpenZFSVolumeOption[];
}
export const RestoreVolumeFromSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    VolumeId: S.optional(S.String),
    SnapshotId: S.optional(S.String),
    Options: S.optional(RestoreOpenZFSVolumeOptions),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RestoreVolumeFromSnapshotRequest",
}) as any as S.Schema<RestoreVolumeFromSnapshotRequest>;
export interface RestoreVolumeFromSnapshotResponse {
  VolumeId?: string;
  Lifecycle?: VolumeLifecycle;
  AdministrativeActions?: (AdministrativeAction & {
    TargetFileSystemValues: FileSystem & {
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      WindowsConfiguration: WindowsFileSystemConfiguration & {
        AuditLogConfiguration: WindowsAuditLogConfiguration & {
          FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
          FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
        };
        FsrmConfiguration: WindowsFsrmConfiguration & {
          FsrmServiceEnabled: Flag;
        };
      };
      LustreConfiguration: LustreFileSystemConfiguration & {
        LogConfiguration: LustreLogConfiguration & {
          Level: LustreAccessAuditLogLevel;
        };
        MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
          Mode: MetadataConfigurationMode;
        };
      };
    };
    TargetVolumeValues: Volume & {
      OntapConfiguration: OntapVolumeConfiguration & {
        SnaplockConfiguration: SnaplockConfiguration & {
          AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
          RetentionPeriod: SnaplockRetentionPeriod & {
            DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
            MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
          };
        };
      };
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
        NfsExports: (OpenZFSNfsExport & {
          ClientConfigurations: (OpenZFSClientConfiguration & {
            Clients: OpenZFSClients;
            Options: OpenZFSNfsExportOptions;
          })[];
        })[];
        UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
          Type: OpenZFSQuotaType;
          Id: IntegerNoMax;
          StorageCapacityQuotaGiB: IntegerNoMax;
        })[];
      };
    };
    TargetSnapshotValues: Snapshot & {
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    };
  })[];
}
export const RestoreVolumeFromSnapshotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VolumeId: S.optional(S.String),
    Lifecycle: S.optional(VolumeLifecycle),
    AdministrativeActions: S.optional(AdministrativeActions),
  }),
).annotate({
  identifier: "RestoreVolumeFromSnapshotResponse",
}) as any as S.Schema<RestoreVolumeFromSnapshotResponse>;
export interface StartMisconfiguredStateRecoveryRequest {
  ClientRequestToken?: string;
  FileSystemId?: string;
}
export const StartMisconfiguredStateRecoveryRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      FileSystemId: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "StartMisconfiguredStateRecoveryRequest",
}) as any as S.Schema<StartMisconfiguredStateRecoveryRequest>;
export interface StartMisconfiguredStateRecoveryResponse {
  FileSystem?: FileSystem & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    WindowsConfiguration: WindowsFileSystemConfiguration & {
      AuditLogConfiguration: WindowsAuditLogConfiguration & {
        FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
        FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
      };
      FsrmConfiguration: WindowsFsrmConfiguration & {
        FsrmServiceEnabled: Flag;
      };
    };
    LustreConfiguration: LustreFileSystemConfiguration & {
      LogConfiguration: LustreLogConfiguration & {
        Level: LustreAccessAuditLogLevel;
      };
      MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
        Mode: MetadataConfigurationMode;
      };
    };
    AdministrativeActions: (AdministrativeAction & {
      TargetVolumeValues: Volume & {
        OntapConfiguration: OntapVolumeConfiguration & {
          SnaplockConfiguration: SnaplockConfiguration & {
            AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
            RetentionPeriod: SnaplockRetentionPeriod & {
              DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            };
          };
        };
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
          NfsExports: (OpenZFSNfsExport & {
            ClientConfigurations: (OpenZFSClientConfiguration & {
              Clients: OpenZFSClients;
              Options: OpenZFSNfsExportOptions;
            })[];
          })[];
          UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
            Type: OpenZFSQuotaType;
            Id: IntegerNoMax;
            StorageCapacityQuotaGiB: IntegerNoMax;
          })[];
        };
      };
      TargetSnapshotValues: Snapshot & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      };
    })[];
  };
}
export const StartMisconfiguredStateRecoveryResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ FileSystem: S.optional(FileSystem) }),
).annotate({
  identifier: "StartMisconfiguredStateRecoveryResponse",
}) as any as S.Schema<StartMisconfiguredStateRecoveryResponse>;
export interface TagResourceRequest {
  ResourceARN?: string;
  Tags?: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.optional(S.String), Tags: S.optional(Tags) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
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
  ResourceARN?: string;
  TagKeys?: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARN: S.optional(S.String),
    TagKeys: S.optional(TagKeys),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
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
export interface UpdateDataRepositoryAssociationRequest {
  AssociationId?: string;
  ClientRequestToken?: string;
  ImportedFileChunkSize?: number;
  S3?: S3DataRepositoryConfiguration;
}
export const UpdateDataRepositoryAssociationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AssociationId: S.optional(S.String),
      ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      ImportedFileChunkSize: S.optional(S.Number),
      S3: S.optional(S3DataRepositoryConfiguration),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "UpdateDataRepositoryAssociationRequest",
}) as any as S.Schema<UpdateDataRepositoryAssociationRequest>;
export interface UpdateDataRepositoryAssociationResponse {
  Association?: DataRepositoryAssociation & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    NFS: NFSDataRepositoryConfiguration & { Version: NfsVersion };
  };
}
export const UpdateDataRepositoryAssociationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Association: S.optional(DataRepositoryAssociation) }),
).annotate({
  identifier: "UpdateDataRepositoryAssociationResponse",
}) as any as S.Schema<UpdateDataRepositoryAssociationResponse>;
export interface UpdateFileCacheLustreConfiguration {
  WeeklyMaintenanceStartTime?: string;
}
export const UpdateFileCacheLustreConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WeeklyMaintenanceStartTime: S.optional(S.String) }),
).annotate({
  identifier: "UpdateFileCacheLustreConfiguration",
}) as any as S.Schema<UpdateFileCacheLustreConfiguration>;
export interface UpdateFileCacheRequest {
  FileCacheId?: string;
  ClientRequestToken?: string;
  LustreConfiguration?: UpdateFileCacheLustreConfiguration;
}
export const UpdateFileCacheRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileCacheId: S.optional(S.String),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    LustreConfiguration: S.optional(UpdateFileCacheLustreConfiguration),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateFileCacheRequest",
}) as any as S.Schema<UpdateFileCacheRequest>;
export interface UpdateFileCacheResponse {
  FileCache?: FileCache & {
    LustreConfiguration: FileCacheLustreConfiguration & {
      MetadataConfiguration: FileCacheLustreMetadataConfiguration & {
        StorageCapacity: MetadataStorageCapacity;
      };
      LogConfiguration: LustreLogConfiguration & {
        Level: LustreAccessAuditLogLevel;
      };
    };
  };
}
export const UpdateFileCacheResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FileCache: S.optional(FileCache) }),
).annotate({
  identifier: "UpdateFileCacheResponse",
}) as any as S.Schema<UpdateFileCacheResponse>;
export interface SelfManagedActiveDirectoryConfigurationUpdates {
  UserName?: string;
  Password?: string | redacted.Redacted<string>;
  DnsIps?: string[];
  DomainName?: string;
  OrganizationalUnitDistinguishedName?: string;
  FileSystemAdministratorsGroup?: string;
  DomainJoinServiceAccountSecret?: string;
}
export const SelfManagedActiveDirectoryConfigurationUpdates =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      UserName: S.optional(S.String),
      Password: S.optional(SensitiveString),
      DnsIps: S.optional(DnsIps),
      DomainName: S.optional(S.String),
      OrganizationalUnitDistinguishedName: S.optional(S.String),
      FileSystemAdministratorsGroup: S.optional(S.String),
      DomainJoinServiceAccountSecret: S.optional(S.String),
    }),
  ).annotate({
    identifier: "SelfManagedActiveDirectoryConfigurationUpdates",
  }) as any as S.Schema<SelfManagedActiveDirectoryConfigurationUpdates>;
export interface UpdateFileSystemWindowsConfiguration {
  WeeklyMaintenanceStartTime?: string;
  DailyAutomaticBackupStartTime?: string;
  AutomaticBackupRetentionDays?: number;
  ThroughputCapacity?: number;
  SelfManagedActiveDirectoryConfiguration?: SelfManagedActiveDirectoryConfigurationUpdates;
  AuditLogConfiguration?: WindowsAuditLogCreateConfiguration;
  DiskIopsConfiguration?: DiskIopsConfiguration;
  FsrmConfiguration?: WindowsFsrmConfiguration;
}
export const UpdateFileSystemWindowsConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      WeeklyMaintenanceStartTime: S.optional(S.String),
      DailyAutomaticBackupStartTime: S.optional(S.String),
      AutomaticBackupRetentionDays: S.optional(S.Number),
      ThroughputCapacity: S.optional(S.Number),
      SelfManagedActiveDirectoryConfiguration: S.optional(
        SelfManagedActiveDirectoryConfigurationUpdates,
      ),
      AuditLogConfiguration: S.optional(WindowsAuditLogCreateConfiguration),
      DiskIopsConfiguration: S.optional(DiskIopsConfiguration),
      FsrmConfiguration: S.optional(WindowsFsrmConfiguration),
    }),
).annotate({
  identifier: "UpdateFileSystemWindowsConfiguration",
}) as any as S.Schema<UpdateFileSystemWindowsConfiguration>;
export interface UpdateFileSystemLustreMetadataConfiguration {
  Iops?: number;
  Mode?: MetadataConfigurationMode;
}
export const UpdateFileSystemLustreMetadataConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Iops: S.optional(S.Number),
      Mode: S.optional(MetadataConfigurationMode),
    }),
  ).annotate({
    identifier: "UpdateFileSystemLustreMetadataConfiguration",
  }) as any as S.Schema<UpdateFileSystemLustreMetadataConfiguration>;
export interface UpdateFileSystemLustreConfiguration {
  WeeklyMaintenanceStartTime?: string;
  DailyAutomaticBackupStartTime?: string;
  AutomaticBackupRetentionDays?: number;
  AutoImportPolicy?: AutoImportPolicyType;
  DataCompressionType?: DataCompressionType;
  LogConfiguration?: LustreLogCreateConfiguration;
  RootSquashConfiguration?: LustreRootSquashConfiguration;
  PerUnitStorageThroughput?: number;
  MetadataConfiguration?: UpdateFileSystemLustreMetadataConfiguration;
  ThroughputCapacity?: number;
  DataReadCacheConfiguration?: LustreReadCacheConfiguration;
}
export const UpdateFileSystemLustreConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WeeklyMaintenanceStartTime: S.optional(S.String),
    DailyAutomaticBackupStartTime: S.optional(S.String),
    AutomaticBackupRetentionDays: S.optional(S.Number),
    AutoImportPolicy: S.optional(AutoImportPolicyType),
    DataCompressionType: S.optional(DataCompressionType),
    LogConfiguration: S.optional(LustreLogCreateConfiguration),
    RootSquashConfiguration: S.optional(LustreRootSquashConfiguration),
    PerUnitStorageThroughput: S.optional(S.Number),
    MetadataConfiguration: S.optional(
      UpdateFileSystemLustreMetadataConfiguration,
    ),
    ThroughputCapacity: S.optional(S.Number),
    DataReadCacheConfiguration: S.optional(LustreReadCacheConfiguration),
  }),
).annotate({
  identifier: "UpdateFileSystemLustreConfiguration",
}) as any as S.Schema<UpdateFileSystemLustreConfiguration>;
export interface UpdateFileSystemOntapConfiguration {
  AutomaticBackupRetentionDays?: number;
  DailyAutomaticBackupStartTime?: string;
  FsxAdminPassword?: string | redacted.Redacted<string>;
  WeeklyMaintenanceStartTime?: string;
  DiskIopsConfiguration?: DiskIopsConfiguration;
  ThroughputCapacity?: number;
  AddRouteTableIds?: string[];
  RemoveRouteTableIds?: string[];
  ThroughputCapacityPerHAPair?: number;
  HAPairs?: number;
  EndpointIpv6AddressRange?: string;
}
export const UpdateFileSystemOntapConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutomaticBackupRetentionDays: S.optional(S.Number),
    DailyAutomaticBackupStartTime: S.optional(S.String),
    FsxAdminPassword: S.optional(SensitiveString),
    WeeklyMaintenanceStartTime: S.optional(S.String),
    DiskIopsConfiguration: S.optional(DiskIopsConfiguration),
    ThroughputCapacity: S.optional(S.Number),
    AddRouteTableIds: S.optional(RouteTableIds),
    RemoveRouteTableIds: S.optional(RouteTableIds),
    ThroughputCapacityPerHAPair: S.optional(S.Number),
    HAPairs: S.optional(S.Number),
    EndpointIpv6AddressRange: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateFileSystemOntapConfiguration",
}) as any as S.Schema<UpdateFileSystemOntapConfiguration>;
export interface UpdateFileSystemOpenZFSConfiguration {
  AutomaticBackupRetentionDays?: number;
  CopyTagsToBackups?: boolean;
  CopyTagsToVolumes?: boolean;
  DailyAutomaticBackupStartTime?: string;
  ThroughputCapacity?: number;
  WeeklyMaintenanceStartTime?: string;
  DiskIopsConfiguration?: DiskIopsConfiguration;
  AddRouteTableIds?: string[];
  RemoveRouteTableIds?: string[];
  ReadCacheConfiguration?: OpenZFSReadCacheConfiguration;
  EndpointIpv6AddressRange?: string;
}
export const UpdateFileSystemOpenZFSConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AutomaticBackupRetentionDays: S.optional(S.Number),
      CopyTagsToBackups: S.optional(S.Boolean),
      CopyTagsToVolumes: S.optional(S.Boolean),
      DailyAutomaticBackupStartTime: S.optional(S.String),
      ThroughputCapacity: S.optional(S.Number),
      WeeklyMaintenanceStartTime: S.optional(S.String),
      DiskIopsConfiguration: S.optional(DiskIopsConfiguration),
      AddRouteTableIds: S.optional(RouteTableIds),
      RemoveRouteTableIds: S.optional(RouteTableIds),
      ReadCacheConfiguration: S.optional(OpenZFSReadCacheConfiguration),
      EndpointIpv6AddressRange: S.optional(S.String),
    }),
).annotate({
  identifier: "UpdateFileSystemOpenZFSConfiguration",
}) as any as S.Schema<UpdateFileSystemOpenZFSConfiguration>;
export interface UpdateFileSystemRequest {
  FileSystemId?: string;
  ClientRequestToken?: string;
  StorageCapacity?: number;
  WindowsConfiguration?: UpdateFileSystemWindowsConfiguration;
  LustreConfiguration?: UpdateFileSystemLustreConfiguration;
  OntapConfiguration?: UpdateFileSystemOntapConfiguration;
  OpenZFSConfiguration?: UpdateFileSystemOpenZFSConfiguration;
  StorageType?: StorageType;
  FileSystemTypeVersion?: string;
  NetworkType?: NetworkType;
}
export const UpdateFileSystemRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileSystemId: S.optional(S.String),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    StorageCapacity: S.optional(S.Number),
    WindowsConfiguration: S.optional(UpdateFileSystemWindowsConfiguration),
    LustreConfiguration: S.optional(UpdateFileSystemLustreConfiguration),
    OntapConfiguration: S.optional(UpdateFileSystemOntapConfiguration),
    OpenZFSConfiguration: S.optional(UpdateFileSystemOpenZFSConfiguration),
    StorageType: S.optional(StorageType),
    FileSystemTypeVersion: S.optional(S.String),
    NetworkType: S.optional(NetworkType),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateFileSystemRequest",
}) as any as S.Schema<UpdateFileSystemRequest>;
export interface UpdateFileSystemResponse {
  FileSystem?: FileSystem & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    WindowsConfiguration: WindowsFileSystemConfiguration & {
      AuditLogConfiguration: WindowsAuditLogConfiguration & {
        FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
        FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
      };
      FsrmConfiguration: WindowsFsrmConfiguration & {
        FsrmServiceEnabled: Flag;
      };
    };
    LustreConfiguration: LustreFileSystemConfiguration & {
      LogConfiguration: LustreLogConfiguration & {
        Level: LustreAccessAuditLogLevel;
      };
      MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
        Mode: MetadataConfigurationMode;
      };
    };
    AdministrativeActions: (AdministrativeAction & {
      TargetVolumeValues: Volume & {
        OntapConfiguration: OntapVolumeConfiguration & {
          SnaplockConfiguration: SnaplockConfiguration & {
            AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
            RetentionPeriod: SnaplockRetentionPeriod & {
              DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            };
          };
        };
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
          NfsExports: (OpenZFSNfsExport & {
            ClientConfigurations: (OpenZFSClientConfiguration & {
              Clients: OpenZFSClients;
              Options: OpenZFSNfsExportOptions;
            })[];
          })[];
          UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
            Type: OpenZFSQuotaType;
            Id: IntegerNoMax;
            StorageCapacityQuotaGiB: IntegerNoMax;
          })[];
        };
      };
      TargetSnapshotValues: Snapshot & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      };
    })[];
  };
}
export const UpdateFileSystemResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FileSystem: S.optional(FileSystem) }),
).annotate({
  identifier: "UpdateFileSystemResponse",
}) as any as S.Schema<UpdateFileSystemResponse>;
export interface UpdateSharedVpcConfigurationRequest {
  EnableFsxRouteTableUpdatesFromParticipantAccounts?: string;
  ClientRequestToken?: string;
}
export const UpdateSharedVpcConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnableFsxRouteTableUpdatesFromParticipantAccounts: S.optional(S.String),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateSharedVpcConfigurationRequest",
}) as any as S.Schema<UpdateSharedVpcConfigurationRequest>;
export interface UpdateSharedVpcConfigurationResponse {
  EnableFsxRouteTableUpdatesFromParticipantAccounts?: string;
}
export const UpdateSharedVpcConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      EnableFsxRouteTableUpdatesFromParticipantAccounts: S.optional(S.String),
    }),
).annotate({
  identifier: "UpdateSharedVpcConfigurationResponse",
}) as any as S.Schema<UpdateSharedVpcConfigurationResponse>;
export interface UpdateSnapshotRequest {
  ClientRequestToken?: string;
  Name?: string;
  SnapshotId?: string;
}
export const UpdateSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Name: S.optional(S.String),
    SnapshotId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateSnapshotRequest",
}) as any as S.Schema<UpdateSnapshotRequest>;
export interface UpdateSnapshotResponse {
  Snapshot?: Snapshot & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    AdministrativeActions: (AdministrativeAction & {
      TargetFileSystemValues: FileSystem & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        WindowsConfiguration: WindowsFileSystemConfiguration & {
          AuditLogConfiguration: WindowsAuditLogConfiguration & {
            FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
            FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
          };
          FsrmConfiguration: WindowsFsrmConfiguration & {
            FsrmServiceEnabled: Flag;
          };
        };
        LustreConfiguration: LustreFileSystemConfiguration & {
          LogConfiguration: LustreLogConfiguration & {
            Level: LustreAccessAuditLogLevel;
          };
          MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
            Mode: MetadataConfigurationMode;
          };
        };
      };
      TargetVolumeValues: Volume & {
        OntapConfiguration: OntapVolumeConfiguration & {
          SnaplockConfiguration: SnaplockConfiguration & {
            AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
            RetentionPeriod: SnaplockRetentionPeriod & {
              DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            };
          };
        };
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
          NfsExports: (OpenZFSNfsExport & {
            ClientConfigurations: (OpenZFSClientConfiguration & {
              Clients: OpenZFSClients;
              Options: OpenZFSNfsExportOptions;
            })[];
          })[];
          UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
            Type: OpenZFSQuotaType;
            Id: IntegerNoMax;
            StorageCapacityQuotaGiB: IntegerNoMax;
          })[];
        };
      };
    })[];
  };
}
export const UpdateSnapshotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Snapshot: S.optional(Snapshot) }),
).annotate({
  identifier: "UpdateSnapshotResponse",
}) as any as S.Schema<UpdateSnapshotResponse>;
export interface UpdateSvmActiveDirectoryConfiguration {
  SelfManagedActiveDirectoryConfiguration?: SelfManagedActiveDirectoryConfigurationUpdates;
  NetBiosName?: string;
}
export const UpdateSvmActiveDirectoryConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SelfManagedActiveDirectoryConfiguration: S.optional(
        SelfManagedActiveDirectoryConfigurationUpdates,
      ),
      NetBiosName: S.optional(S.String),
    }),
).annotate({
  identifier: "UpdateSvmActiveDirectoryConfiguration",
}) as any as S.Schema<UpdateSvmActiveDirectoryConfiguration>;
export interface UpdateStorageVirtualMachineRequest {
  ActiveDirectoryConfiguration?: UpdateSvmActiveDirectoryConfiguration;
  ClientRequestToken?: string;
  StorageVirtualMachineId?: string;
  SvmAdminPassword?: string | redacted.Redacted<string>;
}
export const UpdateStorageVirtualMachineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActiveDirectoryConfiguration: S.optional(
      UpdateSvmActiveDirectoryConfiguration,
    ),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    StorageVirtualMachineId: S.optional(S.String),
    SvmAdminPassword: S.optional(SensitiveString),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateStorageVirtualMachineRequest",
}) as any as S.Schema<UpdateStorageVirtualMachineRequest>;
export interface UpdateStorageVirtualMachineResponse {
  StorageVirtualMachine?: StorageVirtualMachine & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
  };
}
export const UpdateStorageVirtualMachineResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StorageVirtualMachine: S.optional(StorageVirtualMachine) }),
).annotate({
  identifier: "UpdateStorageVirtualMachineResponse",
}) as any as S.Schema<UpdateStorageVirtualMachineResponse>;
export interface UpdateSnaplockConfiguration {
  AuditLogVolume?: boolean;
  AutocommitPeriod?: AutocommitPeriod;
  PrivilegedDelete?: PrivilegedDelete;
  RetentionPeriod?: SnaplockRetentionPeriod;
  VolumeAppendModeEnabled?: boolean;
}
export const UpdateSnaplockConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuditLogVolume: S.optional(S.Boolean),
    AutocommitPeriod: S.optional(AutocommitPeriod),
    PrivilegedDelete: S.optional(PrivilegedDelete),
    RetentionPeriod: S.optional(SnaplockRetentionPeriod),
    VolumeAppendModeEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "UpdateSnaplockConfiguration",
}) as any as S.Schema<UpdateSnaplockConfiguration>;
export interface UpdateOntapVolumeConfiguration {
  JunctionPath?: string;
  SecurityStyle?: SecurityStyle;
  SizeInMegabytes?: number;
  StorageEfficiencyEnabled?: boolean;
  TieringPolicy?: TieringPolicy;
  SnapshotPolicy?: string;
  CopyTagsToBackups?: boolean;
  SnaplockConfiguration?: UpdateSnaplockConfiguration;
  SizeInBytes?: number;
}
export const UpdateOntapVolumeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JunctionPath: S.optional(S.String),
    SecurityStyle: S.optional(SecurityStyle),
    SizeInMegabytes: S.optional(S.Number),
    StorageEfficiencyEnabled: S.optional(S.Boolean),
    TieringPolicy: S.optional(TieringPolicy),
    SnapshotPolicy: S.optional(S.String),
    CopyTagsToBackups: S.optional(S.Boolean),
    SnaplockConfiguration: S.optional(UpdateSnaplockConfiguration),
    SizeInBytes: S.optional(S.Number),
  }),
).annotate({
  identifier: "UpdateOntapVolumeConfiguration",
}) as any as S.Schema<UpdateOntapVolumeConfiguration>;
export interface UpdateOpenZFSVolumeConfiguration {
  StorageCapacityReservationGiB?: number;
  StorageCapacityQuotaGiB?: number;
  RecordSizeKiB?: number;
  DataCompressionType?: OpenZFSDataCompressionType;
  NfsExports?: OpenZFSNfsExport[];
  UserAndGroupQuotas?: OpenZFSUserOrGroupQuota[];
  ReadOnly?: boolean;
}
export const UpdateOpenZFSVolumeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StorageCapacityReservationGiB: S.optional(S.Number),
    StorageCapacityQuotaGiB: S.optional(S.Number),
    RecordSizeKiB: S.optional(S.Number),
    DataCompressionType: S.optional(OpenZFSDataCompressionType),
    NfsExports: S.optional(OpenZFSNfsExports),
    UserAndGroupQuotas: S.optional(OpenZFSUserAndGroupQuotas),
    ReadOnly: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "UpdateOpenZFSVolumeConfiguration",
}) as any as S.Schema<UpdateOpenZFSVolumeConfiguration>;
export interface UpdateVolumeRequest {
  ClientRequestToken?: string;
  VolumeId?: string;
  OntapConfiguration?: UpdateOntapVolumeConfiguration;
  Name?: string;
  OpenZFSConfiguration?: UpdateOpenZFSVolumeConfiguration;
}
export const UpdateVolumeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    VolumeId: S.optional(S.String),
    OntapConfiguration: S.optional(UpdateOntapVolumeConfiguration),
    Name: S.optional(S.String),
    OpenZFSConfiguration: S.optional(UpdateOpenZFSVolumeConfiguration),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateVolumeRequest",
}) as any as S.Schema<UpdateVolumeRequest>;
export interface UpdateVolumeResponse {
  Volume?: Volume & {
    OntapConfiguration: OntapVolumeConfiguration & {
      SnaplockConfiguration: SnaplockConfiguration & {
        AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
        RetentionPeriod: SnaplockRetentionPeriod & {
          DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
          MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
          MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
        };
      };
    };
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    AdministrativeActions: (AdministrativeAction & {
      TargetFileSystemValues: FileSystem & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        WindowsConfiguration: WindowsFileSystemConfiguration & {
          AuditLogConfiguration: WindowsAuditLogConfiguration & {
            FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
            FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
          };
          FsrmConfiguration: WindowsFsrmConfiguration & {
            FsrmServiceEnabled: Flag;
          };
        };
        LustreConfiguration: LustreFileSystemConfiguration & {
          LogConfiguration: LustreLogConfiguration & {
            Level: LustreAccessAuditLogLevel;
          };
          MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
            Mode: MetadataConfigurationMode;
          };
        };
      };
      TargetSnapshotValues: Snapshot & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      };
    })[];
    OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
      NfsExports: (OpenZFSNfsExport & {
        ClientConfigurations: (OpenZFSClientConfiguration & {
          Clients: OpenZFSClients;
          Options: OpenZFSNfsExportOptions;
        })[];
      })[];
      UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
        Type: OpenZFSQuotaType;
        Id: IntegerNoMax;
        StorageCapacityQuotaGiB: IntegerNoMax;
      })[];
    };
  };
}
export const UpdateVolumeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Volume: S.optional(Volume) }),
).annotate({
  identifier: "UpdateVolumeResponse",
}) as any as S.Schema<UpdateVolumeResponse>;
export type Parameter = string;
export type ServiceLimit =
  | "FILE_SYSTEM_COUNT"
  | "TOTAL_THROUGHPUT_CAPACITY"
  | "TOTAL_STORAGE"
  | "TOTAL_USER_INITIATED_BACKUPS"
  | "TOTAL_USER_TAGS"
  | "TOTAL_IN_PROGRESS_COPY_BACKUPS"
  | "STORAGE_VIRTUAL_MACHINES_PER_FILE_SYSTEM"
  | "VOLUMES_PER_FILE_SYSTEM"
  | "TOTAL_SSD_IOPS"
  | "FILE_CACHE_COUNT"
  | (string & {});
export const ServiceLimit = S.String;

export type ErrorCode = string;
export type ActiveDirectoryErrorType =
  | "DOMAIN_NOT_FOUND"
  | "INCOMPATIBLE_DOMAIN_MODE"
  | "WRONG_VPC"
  | "INVALID_NETWORK_TYPE"
  | "INVALID_DOMAIN_STAGE"
  | (string & {});
export const ActiveDirectoryErrorType = S.String;

export type AssociateFileSystemAliasesError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Use this action to associate one or more Domain Name Server (DNS) aliases with an existing Amazon FSx for Windows File Server file system.
 * A file system can have a maximum of 50 DNS aliases associated with it at any one time. If you try to
 * associate a DNS alias that is already associated with the file system, FSx takes no action on that alias in the request.
 * For more information, see Working with DNS Aliases and
 * Walkthrough 5: Using DNS aliases to access your file system, including
 * additional steps you must take to be able to access your file system using a DNS alias.
 *
 * The system response shows the DNS aliases that
 * Amazon FSx is attempting to associate with the file system.
 * Use the API
 * operation to monitor the status of the aliases Amazon FSx is
 * associating with the file system.
 */
export const associateFileSystemAliases: API.OperationMethod<
  AssociateFileSystemAliasesRequest,
  AssociateFileSystemAliasesResponse,
  AssociateFileSystemAliasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateFileSystemAliasesRequest,
  output: AssociateFileSystemAliasesResponse,
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateFileSystemAliases",
}));

export type CancelDataRepositoryTaskError =
  | BadRequest
  | DataRepositoryTaskEnded
  | DataRepositoryTaskNotFound
  | InternalServerError
  | UnsupportedOperation
  | CommonErrors;
/**
 * Cancels an existing Amazon FSx for Lustre data repository task if that task is in either the
 * `PENDING` or `EXECUTING` state. When you cancel an export task, Amazon FSx
 * does the following.
 *
 * - Any files that FSx has already exported are not reverted.
 *
 * - FSx continues to export any files that are in-flight when the cancel operation is received.
 *
 * - FSx does not export any files that have not yet been exported.
 *
 * For a release task, Amazon FSx will stop releasing files upon cancellation. Any files that
 * have already been released will remain in the released state.
 */
export const cancelDataRepositoryTask: API.OperationMethod<
  CancelDataRepositoryTaskRequest,
  CancelDataRepositoryTaskResponse,
  CancelDataRepositoryTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelDataRepositoryTaskRequest,
  output: CancelDataRepositoryTaskResponse,
  errors: [
    BadRequest,
    DataRepositoryTaskEnded,
    DataRepositoryTaskNotFound,
    InternalServerError,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelDataRepositoryTask",
}));

export type CopyBackupError =
  | BackupNotFound
  | BadRequest
  | IncompatibleParameterError
  | IncompatibleRegionForMultiAZ
  | InternalServerError
  | InvalidDestinationKmsKey
  | InvalidRegion
  | InvalidSourceKmsKey
  | ServiceLimitExceeded
  | SourceBackupUnavailable
  | UnsupportedOperation
  | CommonErrors;
/**
 * Copies an existing backup within the same Amazon Web Services account to another Amazon Web Services Region
 * (cross-Region copy) or within the same Amazon Web Services Region (in-Region copy). You can have up to five
 * backup copy requests in progress to a single destination Region per account.
 *
 * You can use cross-Region backup copies for cross-Region disaster recovery. You can
 * periodically take backups and copy them to another Region so that in the event of a
 * disaster in the primary Region, you can restore from backup and recover availability
 * quickly in the other Region. You can make cross-Region copies only within your Amazon Web Services partition. A partition is a grouping of Regions. Amazon Web Services currently
 * has three partitions: `aws` (Standard Regions), `aws-cn` (China
 * Regions), and `aws-us-gov` (Amazon Web Services GovCloud [US] Regions).
 *
 * You can also use backup copies to clone your file dataset to another Region or within
 * the same Region.
 *
 * You can use the `SourceRegion` parameter to specify the Amazon Web Services Region
 * from which the backup will be copied. For example, if you make the call from the
 * `us-west-1` Region and want to copy a backup from the `us-east-2`
 * Region, you specify `us-east-2` in the `SourceRegion` parameter
 * to make a cross-Region copy. If you don't specify a Region, the backup copy is
 * created in the same Region where the request is sent from (in-Region copy).
 *
 * For more information about creating backup copies, see Copying backups
 * in the *Amazon FSx for Windows User Guide*, Copying backups in the Amazon FSx for Lustre User
 * Guide, and Copying backups in the Amazon FSx for OpenZFS User
 * Guide.
 */
export const copyBackup: API.OperationMethod<
  CopyBackupRequest,
  CopyBackupResponse,
  CopyBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CopyBackupRequest,
  output: CopyBackupResponse,
  errors: [
    BackupNotFound,
    BadRequest,
    IncompatibleParameterError,
    IncompatibleRegionForMultiAZ,
    InternalServerError,
    InvalidDestinationKmsKey,
    InvalidRegion,
    InvalidSourceKmsKey,
    ServiceLimitExceeded,
    SourceBackupUnavailable,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyBackup",
}));

export type CopySnapshotAndUpdateVolumeError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | SourceSnapshotNotFound
  | CommonErrors;
/**
 * Updates an existing volume by using a snapshot from another Amazon FSx for OpenZFS file system. For more information, see on-demand data replication in the Amazon FSx for OpenZFS User
 * Guide.
 */
export const copySnapshotAndUpdateVolume: API.OperationMethod<
  CopySnapshotAndUpdateVolumeRequest,
  CopySnapshotAndUpdateVolumeResponse,
  CopySnapshotAndUpdateVolumeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CopySnapshotAndUpdateVolumeRequest,
  output: CopySnapshotAndUpdateVolumeResponse,
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
    SourceSnapshotNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopySnapshotAndUpdateVolume",
}));

export type CreateAndAttachS3AccessPointError =
  | AccessPointAlreadyOwnedByYou
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | InvalidAccessPoint
  | InvalidRequest
  | TooManyAccessPoints
  | UnsupportedOperation
  | VolumeNotFound
  | CommonErrors;
/**
 * Creates an S3 access point and attaches it to an Amazon FSx volume. For FSx for OpenZFS file systems, the
 * volume must be hosted on a high-availability file system, either Single-AZ or Multi-AZ. For more information,
 * see Accessing your data using Amazon S3 access points.
 * in the Amazon FSx for OpenZFS User Guide.
 *
 * The requester requires the following permissions to perform these actions:
 *
 * - `fsx:CreateAndAttachS3AccessPoint`
 *
 * - `s3:CreateAccessPoint`
 *
 * - `s3:GetAccessPoint`
 *
 * - `s3:PutAccessPointPolicy`
 *
 * - `s3:DeleteAccessPoint`
 *
 * The following actions are related to `CreateAndAttachS3AccessPoint`:
 *
 * - DescribeS3AccessPointAttachments
 *
 * - DetachAndDeleteS3AccessPoint
 */
export const createAndAttachS3AccessPoint: API.OperationMethod<
  CreateAndAttachS3AccessPointRequest,
  CreateAndAttachS3AccessPointResponse,
  CreateAndAttachS3AccessPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAndAttachS3AccessPointRequest,
  output: CreateAndAttachS3AccessPointResponse,
  errors: [
    AccessPointAlreadyOwnedByYou,
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    InvalidAccessPoint,
    InvalidRequest,
    TooManyAccessPoints,
    UnsupportedOperation,
    VolumeNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAndAttachS3AccessPoint",
}));

export type CreateBackupError =
  | BackupInProgress
  | BadRequest
  | FileSystemNotFound
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | UnsupportedOperation
  | VolumeNotFound
  | CommonErrors;
/**
 * Creates a backup of an existing Amazon FSx for Windows File Server file
 * system, Amazon FSx for Lustre file system, Amazon FSx for NetApp ONTAP
 * volume, or Amazon FSx for OpenZFS file system. We recommend creating regular
 * backups so that you can restore a file system or volume from a backup if an issue arises
 * with the original file system or volume.
 *
 * For Amazon FSx for Lustre file systems, you can create a backup only for file
 * systems that have the following configuration:
 *
 * - A Persistent deployment type
 *
 * - Are *not* linked to a data repository
 *
 * For more information about backups, see the following:
 *
 * - For Amazon FSx for Lustre, see Working with FSx for
 * Lustre backups.
 *
 * - For Amazon FSx for Windows, see Working with FSx for
 * Windows backups.
 *
 * - For Amazon FSx for NetApp ONTAP, see Working with FSx for NetApp
 * ONTAP backups.
 *
 * - For Amazon FSx for OpenZFS, see Working with FSx for OpenZFS backups.
 *
 * If a backup with the specified client request token exists and the parameters match,
 * this operation returns the description of the existing backup. If a backup with the
 * specified client request token exists and the parameters don't match, this operation
 * returns `IncompatibleParameterError`. If a backup with the specified client
 * request token doesn't exist, `CreateBackup` does the following:
 *
 * - Creates a new Amazon FSx backup with an assigned ID, and an initial
 * lifecycle state of `CREATING`.
 *
 * - Returns the description of the backup.
 *
 * By using the idempotent operation, you can retry a `CreateBackup`
 * operation without the risk of creating an extra backup. This approach can be useful when
 * an initial call fails in a way that makes it unclear whether a backup was created. If
 * you use the same client request token and the initial call created a backup, the
 * operation returns a successful result because all the parameters are the same.
 *
 * The `CreateBackup` operation returns while the backup's lifecycle state is
 * still `CREATING`. You can check the backup creation status by calling the
 * DescribeBackups operation, which returns the backup state along with other
 * information.
 */
export const createBackup: API.OperationMethod<
  CreateBackupRequest,
  CreateBackupResponse,
  CreateBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBackupRequest,
  output: CreateBackupResponse,
  errors: [
    BackupInProgress,
    BadRequest,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
    UnsupportedOperation,
    VolumeNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBackup",
}));

export type CreateDataRepositoryAssociationError =
  | BadRequest
  | FileSystemNotFound
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | UnsupportedOperation
  | CommonErrors;
/**
 * Creates an Amazon FSx for Lustre data repository association (DRA). A data
 * repository association is a link between a directory on the file system and
 * an Amazon S3 bucket or prefix. You can have a maximum of 8 data repository
 * associations on a file system. Data repository associations are supported
 * on all FSx for Lustre 2.12 and 2.15 file systems, excluding
 * `scratch_1` deployment type.
 *
 * Each data repository association must have a unique Amazon FSx file
 * system directory and a unique S3 bucket or prefix associated with it. You
 * can configure a data repository association for automatic import only,
 * for automatic export only, or for both. To learn more about linking a
 * data repository to your file system, see
 * Linking your file system to an S3 bucket.
 *
 * `CreateDataRepositoryAssociation` isn't supported
 * on Amazon File Cache resources. To create a DRA on Amazon File Cache,
 * use the `CreateFileCache` operation.
 */
export const createDataRepositoryAssociation: API.OperationMethod<
  CreateDataRepositoryAssociationRequest,
  CreateDataRepositoryAssociationResponse,
  CreateDataRepositoryAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataRepositoryAssociationRequest,
  output: CreateDataRepositoryAssociationResponse,
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataRepositoryAssociation",
}));

export type CreateDataRepositoryTaskError =
  | BadRequest
  | DataRepositoryTaskExecuting
  | FileSystemNotFound
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | UnsupportedOperation
  | CommonErrors;
/**
 * Creates an Amazon FSx for Lustre data repository task.
 * A `CreateDataRepositoryTask` operation will fail if a data
 * repository is not linked to the FSx file system.
 *
 * You use import and export data repository tasks to perform bulk operations between your
 * FSx for Lustre file system and its linked data repositories. An example of a data repository
 * task is exporting any data and metadata changes, including POSIX metadata, to files, directories,
 * and symbolic links (symlinks) from your FSx file system to a linked data repository.
 *
 * You use release data repository tasks to release data from your file system for files that
 * are exported to S3. The metadata of released files remains on the file system so users or applications
 * can still access released files by reading the files again, which will restore data from
 * Amazon S3 to the FSx for Lustre file system.
 *
 * To learn more about data repository tasks, see
 * Data Repository Tasks.
 * To learn more about linking a data repository to your file system, see
 * Linking your file system to an S3 bucket.
 */
export const createDataRepositoryTask: API.OperationMethod<
  CreateDataRepositoryTaskRequest,
  CreateDataRepositoryTaskResponse,
  CreateDataRepositoryTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataRepositoryTaskRequest,
  output: CreateDataRepositoryTaskResponse,
  errors: [
    BadRequest,
    DataRepositoryTaskExecuting,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataRepositoryTask",
}));

export type CreateFileCacheError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | InvalidNetworkSettings
  | InvalidPerUnitStorageThroughput
  | MissingFileCacheConfiguration
  | ServiceLimitExceeded
  | CommonErrors;
/**
 * Creates a new Amazon File Cache resource.
 *
 * You can use this operation with a client request token in the request that
 * Amazon File Cache uses to ensure idempotent creation.
 * If a cache with the specified client request token exists and the parameters
 * match, `CreateFileCache` returns the description of the existing
 * cache. If a cache with the specified client request token exists and the
 * parameters don't match, this call returns `IncompatibleParameterError`.
 * If a file cache with the specified client request token doesn't exist,
 * `CreateFileCache` does the following:
 *
 * - Creates a new, empty Amazon File Cache resource with an assigned ID, and
 * an initial lifecycle state of `CREATING`.
 *
 * - Returns the description of the cache in JSON format.
 *
 * The `CreateFileCache` call returns while the cache's lifecycle
 * state is still `CREATING`. You can check the cache creation status
 * by calling the DescribeFileCaches operation, which returns the cache state
 * along with other information.
 */
export const createFileCache: API.OperationMethod<
  CreateFileCacheRequest,
  CreateFileCacheResponse,
  CreateFileCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFileCacheRequest,
  output: CreateFileCacheResponse,
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    InvalidNetworkSettings,
    InvalidPerUnitStorageThroughput,
    MissingFileCacheConfiguration,
    ServiceLimitExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFileCache",
}));

export type CreateFileSystemError =
  | ActiveDirectoryError
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | InvalidExportPath
  | InvalidImportPath
  | InvalidNetworkSettings
  | InvalidPerUnitStorageThroughput
  | MissingFileSystemConfiguration
  | ServiceLimitExceeded
  | CommonErrors;
/**
 * Creates a new, empty Amazon FSx file system. You can create the following supported
 * Amazon FSx file systems using the `CreateFileSystem` API operation:
 *
 * - Amazon FSx for Lustre
 *
 * - Amazon FSx for NetApp ONTAP
 *
 * - Amazon FSx for OpenZFS
 *
 * - Amazon FSx for Windows File Server
 *
 * This operation requires a client request token in the request that Amazon FSx uses
 * to ensure idempotent creation. This means that calling the operation multiple times with
 * the same client request token has no effect. By using the idempotent operation, you can
 * retry a `CreateFileSystem` operation without the risk of creating an extra
 * file system. This approach can be useful when an initial call fails in a way that makes
 * it unclear whether a file system was created. Examples are if a transport level timeout
 * occurred, or your connection was reset. If you use the same client request token and the
 * initial call created a file system, the client receives success as long as the
 * parameters are the same.
 *
 * If a file system with the specified client request token exists and the parameters
 * match, `CreateFileSystem` returns the description of the existing file
 * system. If a file system with the specified client request token exists and the
 * parameters don't match, this call returns `IncompatibleParameterError`. If a
 * file system with the specified client request token doesn't exist,
 * `CreateFileSystem` does the following:
 *
 * - Creates a new, empty Amazon FSx file system with an assigned ID, and
 * an initial lifecycle state of `CREATING`.
 *
 * - Returns the description of the file system in JSON format.
 *
 * The `CreateFileSystem` call returns while the file system's lifecycle
 * state is still `CREATING`. You can check the file-system creation status
 * by calling the DescribeFileSystems operation, which returns the file system state
 * along with other information.
 */
export const createFileSystem: API.OperationMethod<
  CreateFileSystemRequest,
  CreateFileSystemResponse,
  CreateFileSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFileSystemRequest,
  output: CreateFileSystemResponse,
  errors: [
    ActiveDirectoryError,
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    InvalidExportPath,
    InvalidImportPath,
    InvalidNetworkSettings,
    InvalidPerUnitStorageThroughput,
    MissingFileSystemConfiguration,
    ServiceLimitExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFileSystem",
}));

export type CreateFileSystemFromBackupError =
  | ActiveDirectoryError
  | BackupNotFound
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | InvalidNetworkSettings
  | InvalidPerUnitStorageThroughput
  | MissingFileSystemConfiguration
  | ServiceLimitExceeded
  | CommonErrors;
/**
 * Creates a new Amazon FSx for Lustre, Amazon FSx for Windows File
 * Server, or Amazon FSx for OpenZFS file system from an existing Amazon FSx backup.
 *
 * If a file system with the specified client request token exists and the parameters
 * match, this operation returns the description of the file system. If a file system
 * with the specified client request token exists but the parameters don't match, this
 * call returns `IncompatibleParameterError`. If a file system with the
 * specified client request token doesn't exist, this operation does the following:
 *
 * - Creates a new Amazon FSx file system from backup with an assigned ID,
 * and an initial lifecycle state of `CREATING`.
 *
 * - Returns the description of the file system.
 *
 * Parameters like the Active Directory, default share name, automatic backup, and backup
 * settings default to the parameters of the file system that was backed up, unless
 * overridden. You can explicitly supply other settings.
 *
 * By using the idempotent operation, you can retry a
 * `CreateFileSystemFromBackup` call without the risk of creating an extra
 * file system. This approach can be useful when an initial call fails in a way that makes
 * it unclear whether a file system was created. Examples are if a transport level timeout
 * occurred, or your connection was reset. If you use the same client request token and the
 * initial call created a file system, the client receives a success message as long as the
 * parameters are the same.
 *
 * The `CreateFileSystemFromBackup` call returns while the file system's
 * lifecycle state is still `CREATING`. You can check the file-system
 * creation status by calling the
 * DescribeFileSystems operation, which returns the file system state along
 * with other information.
 */
export const createFileSystemFromBackup: API.OperationMethod<
  CreateFileSystemFromBackupRequest,
  CreateFileSystemFromBackupResponse,
  CreateFileSystemFromBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFileSystemFromBackupRequest,
  output: CreateFileSystemFromBackupResponse,
  errors: [
    ActiveDirectoryError,
    BackupNotFound,
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    InvalidNetworkSettings,
    InvalidPerUnitStorageThroughput,
    MissingFileSystemConfiguration,
    ServiceLimitExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFileSystemFromBackup",
}));

export type CreateSnapshotError =
  | BadRequest
  | InternalServerError
  | ServiceLimitExceeded
  | VolumeNotFound
  | SnapshotVolumeNotFound
  | CommonErrors;
/**
 * Creates a snapshot of an existing Amazon FSx for OpenZFS volume. With
 * snapshots, you can easily undo file changes and compare file versions by restoring the
 * volume to a previous version.
 *
 * If a snapshot with the specified client request token exists, and the parameters
 * match, this operation returns the description of the existing snapshot. If a snapshot
 * with the specified client request token exists, and the parameters don't match, this
 * operation returns `IncompatibleParameterError`. If a snapshot with the
 * specified client request token doesn't exist, `CreateSnapshot` does the
 * following:
 *
 * - Creates a new OpenZFS snapshot with an assigned ID, and an initial lifecycle
 * state of `CREATING`.
 *
 * - Returns the description of the snapshot.
 *
 * By using the idempotent operation, you can retry a `CreateSnapshot`
 * operation without the risk of creating an extra snapshot. This approach can be useful
 * when an initial call fails in a way that makes it unclear whether a snapshot was
 * created. If you use the same client request token and the initial call created a
 * snapshot, the operation returns a successful result because all the parameters are the
 * same.
 *
 * The `CreateSnapshot` operation returns while the snapshot's lifecycle state
 * is still `CREATING`. You can check the snapshot creation status by calling
 * the DescribeSnapshots operation, which returns the snapshot state along with
 * other information.
 */
export const createSnapshot: API.OperationMethod<
  CreateSnapshotRequest,
  CreateSnapshotResponse,
  CreateSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSnapshotRequest,
  output: CreateSnapshotResponse,
  errors: [
    BadRequest,
    InternalServerError,
    ServiceLimitExceeded,
    VolumeNotFound,
    SnapshotVolumeNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSnapshot",
}));

export type CreateStorageVirtualMachineError =
  | ActiveDirectoryError
  | BadRequest
  | FileSystemNotFound
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | UnsupportedOperation
  | CommonErrors;
/**
 * Creates a storage virtual machine (SVM) for an Amazon FSx for ONTAP file system.
 */
export const createStorageVirtualMachine: API.OperationMethod<
  CreateStorageVirtualMachineRequest,
  CreateStorageVirtualMachineResponse,
  CreateStorageVirtualMachineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateStorageVirtualMachineRequest,
  output: CreateStorageVirtualMachineResponse,
  errors: [
    ActiveDirectoryError,
    BadRequest,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStorageVirtualMachine",
}));

export type CreateVolumeError =
  | BadRequest
  | FileSystemNotFound
  | IncompatibleParameterError
  | InternalServerError
  | MissingVolumeConfiguration
  | ServiceLimitExceeded
  | StorageVirtualMachineNotFound
  | UnsupportedOperation
  | CommonErrors;
/**
 * Creates an FSx for ONTAP or Amazon FSx for OpenZFS storage volume.
 */
export const createVolume: API.OperationMethod<
  CreateVolumeRequest,
  CreateVolumeResponse,
  CreateVolumeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateVolumeRequest,
  output: CreateVolumeResponse,
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    MissingVolumeConfiguration,
    ServiceLimitExceeded,
    StorageVirtualMachineNotFound,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVolume",
}));

export type CreateVolumeFromBackupError =
  | BackupNotFound
  | BadRequest
  | FileSystemNotFound
  | IncompatibleParameterError
  | InternalServerError
  | MissingVolumeConfiguration
  | ServiceLimitExceeded
  | StorageVirtualMachineNotFound
  | CommonErrors;
/**
 * Creates a new Amazon FSx for NetApp ONTAP volume from an
 * existing Amazon FSx volume backup.
 */
export const createVolumeFromBackup: API.OperationMethod<
  CreateVolumeFromBackupRequest,
  CreateVolumeFromBackupResponse,
  CreateVolumeFromBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateVolumeFromBackupRequest,
  output: CreateVolumeFromBackupResponse,
  errors: [
    BackupNotFound,
    BadRequest,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    MissingVolumeConfiguration,
    ServiceLimitExceeded,
    StorageVirtualMachineNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVolumeFromBackup",
}));

export type DeleteBackupError =
  | BackupBeingCopied
  | BackupInProgress
  | BackupNotFound
  | BackupRestoring
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | CommonErrors;
/**
 * Deletes an Amazon FSx backup. After deletion, the backup no longer exists, and
 * its data is gone.
 *
 * The `DeleteBackup` call returns instantly. The backup won't show up in
 * later `DescribeBackups` calls.
 *
 * The data in a deleted backup is also deleted and can't be recovered by any
 * means.
 */
export const deleteBackup: API.OperationMethod<
  DeleteBackupRequest,
  DeleteBackupResponse,
  DeleteBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBackupRequest,
  output: DeleteBackupResponse,
  errors: [
    BackupBeingCopied,
    BackupInProgress,
    BackupNotFound,
    BackupRestoring,
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackup",
}));

export type DeleteDataRepositoryAssociationError =
  | BadRequest
  | DataRepositoryAssociationNotFound
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | CommonErrors;
/**
 * Deletes a data repository association on an Amazon FSx for Lustre
 * file system. Deleting the data repository association unlinks the
 * file system from the Amazon S3 bucket. When deleting a data repository
 * association, you have the option of deleting the data in the file system
 * that corresponds to the data repository association. Data repository
 * associations are supported on all FSx for Lustre 2.12 and 2.15 file
 * systems, excluding `scratch_1` deployment type.
 */
export const deleteDataRepositoryAssociation: API.OperationMethod<
  DeleteDataRepositoryAssociationRequest,
  DeleteDataRepositoryAssociationResponse,
  DeleteDataRepositoryAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDataRepositoryAssociationRequest,
  output: DeleteDataRepositoryAssociationResponse,
  errors: [
    BadRequest,
    DataRepositoryAssociationNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataRepositoryAssociation",
}));

export type DeleteFileCacheError =
  | BadRequest
  | FileCacheNotFound
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | CommonErrors;
/**
 * Deletes an Amazon File Cache resource. After deletion, the cache no longer exists, and its data
 * is gone.
 *
 * The `DeleteFileCache` operation returns while the cache has the
 * `DELETING` status. You can check the cache deletion status by
 * calling the DescribeFileCaches operation, which returns a list of caches in your
 * account. If you pass the cache ID for a deleted cache, the
 * `DescribeFileCaches` operation returns a `FileCacheNotFound`
 * error.
 *
 * The data in a deleted cache is also deleted and can't be recovered by
 * any means.
 */
export const deleteFileCache: API.OperationMethod<
  DeleteFileCacheRequest,
  DeleteFileCacheResponse,
  DeleteFileCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFileCacheRequest,
  output: DeleteFileCacheResponse,
  errors: [
    BadRequest,
    FileCacheNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFileCache",
}));

export type DeleteFileSystemError =
  | BadRequest
  | FileSystemNotFound
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | CommonErrors;
/**
 * Deletes a file system. After deletion, the file system no longer exists, and its data
 * is gone. Any existing automatic backups and snapshots are also deleted.
 *
 * To delete an Amazon FSx for NetApp ONTAP file system, first delete all the
 * volumes and storage virtual machines (SVMs) on the file system. Then provide a
 * `FileSystemId` value to the `DeleteFileSystem` operation.
 *
 * Before deleting an Amazon FSx for OpenZFS file system, make sure that there aren't
 * any Amazon S3 access points attached to any volume. For more information on how to list S3
 * access points that are attached to volumes, see
 * Listing S3 access point attachments.
 * For more information on how to delete S3 access points, see
 * Deleting an S3 access point attachment.
 *
 * By default, when you delete an Amazon FSx for Windows File Server file system,
 * a final backup is created upon deletion. This final backup isn't subject to the file
 * system's retention policy, and must be manually deleted.
 *
 * To delete an Amazon FSx for Lustre file system, first
 * unmount
 * it from every connected Amazon EC2 instance, then provide a `FileSystemId`
 * value to the `DeleteFileSystem` operation. By default, Amazon FSx will not
 * take a final backup when the `DeleteFileSystem` operation is invoked. On file systems
 * not linked to an Amazon S3 bucket, set `SkipFinalBackup` to `false`
 * to take a final backup of the file system you are deleting. Backups cannot be enabled on S3-linked
 * file systems. To ensure all of your data is written back to S3 before deleting your file system,
 * you can either monitor for the
 * AgeOfOldestQueuedMessage
 * metric to be zero (if using automatic export) or you can run an
 * export data repository task.
 * If you have automatic export enabled and want to use an export data repository task, you have
 * to disable automatic export before executing the export data repository task.
 *
 * The `DeleteFileSystem` operation returns while the file system has the
 * `DELETING` status. You can check the file system deletion status by
 * calling the DescribeFileSystems operation, which returns a list of file systems in your
 * account. If you pass the file system ID for a deleted file system, the
 * `DescribeFileSystems` operation returns a `FileSystemNotFound`
 * error.
 *
 * If a data repository task is in a `PENDING` or `EXECUTING` state,
 * deleting an Amazon FSx for Lustre file system will fail with an HTTP status
 * code 400 (Bad Request).
 *
 * The data in a deleted file system is also deleted and can't be recovered by
 * any means.
 */
export const deleteFileSystem: API.OperationMethod<
  DeleteFileSystemRequest,
  DeleteFileSystemResponse,
  DeleteFileSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFileSystemRequest,
  output: DeleteFileSystemResponse,
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFileSystem",
}));

export type DeleteSnapshotError =
  | BadRequest
  | InternalServerError
  | SnapshotNotFound
  | CommonErrors;
/**
 * Deletes an Amazon FSx for OpenZFS snapshot. After deletion, the snapshot no longer
 * exists, and its data is gone. Deleting a snapshot doesn't affect snapshots stored in a
 * file system backup.
 *
 * The `DeleteSnapshot` operation returns instantly. The snapshot appears with
 * the lifecycle status of `DELETING` until the deletion is complete.
 */
export const deleteSnapshot: API.OperationMethod<
  DeleteSnapshotRequest,
  DeleteSnapshotResponse,
  DeleteSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSnapshotRequest,
  output: DeleteSnapshotResponse,
  errors: [BadRequest, InternalServerError, SnapshotNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapshot",
}));

export type DeleteStorageVirtualMachineError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | StorageVirtualMachineNotFound
  | CommonErrors;
/**
 * Deletes an existing Amazon FSx for ONTAP storage virtual machine (SVM). Prior
 * to deleting an SVM, you must delete all non-root volumes in the SVM, otherwise the operation will fail.
 */
export const deleteStorageVirtualMachine: API.OperationMethod<
  DeleteStorageVirtualMachineRequest,
  DeleteStorageVirtualMachineResponse,
  DeleteStorageVirtualMachineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteStorageVirtualMachineRequest,
  output: DeleteStorageVirtualMachineResponse,
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    StorageVirtualMachineNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStorageVirtualMachine",
}));

export type DeleteVolumeError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | VolumeNotFound
  | CommonErrors;
/**
 * Deletes an Amazon FSx for NetApp ONTAP or Amazon FSx for OpenZFS
 * volume.
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
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
    VolumeNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVolume",
}));

export type DescribeBackupsError =
  | BackupNotFound
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | VolumeNotFound
  | CommonErrors;
/**
 * Returns the description of a specific Amazon FSx backup, if a
 * `BackupIds` value is provided for that backup. Otherwise, it returns all
 * backups owned by your Amazon Web Services account in the Amazon Web Services Region of the
 * endpoint that you're calling.
 *
 * When retrieving all backups, you can optionally specify the `MaxResults`
 * parameter to limit the number of backups in a response. If more backups remain, Amazon FSx returns a `NextToken` value in the response. In this case,
 * send a later request with the `NextToken` request parameter set to the value
 * of the `NextToken` value from the last response.
 *
 * This operation is used in an iterative process to retrieve a list of your backups.
 * `DescribeBackups` is called first without a `NextToken` value.
 * Then the operation continues to be called with the `NextToken` parameter set
 * to the value of the last `NextToken` value until a response has no
 * `NextToken` value.
 *
 * When using this operation, keep the following in mind:
 *
 * - The operation might return fewer than the `MaxResults` value of
 * backup descriptions while still including a `NextToken`
 * value.
 *
 * - The order of the backups returned in the response of one
 * `DescribeBackups` call and the order of the backups returned
 * across the responses of a multi-call iteration is unspecified.
 */
export const describeBackups: API.PaginatedOperationMethod<
  DescribeBackupsRequest,
  DescribeBackupsResponse,
  DescribeBackupsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeBackupsRequest,
  output: DescribeBackupsResponse,
  errors: [
    BackupNotFound,
    BadRequest,
    FileSystemNotFound,
    InternalServerError,
    VolumeNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBackups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeDataRepositoryAssociationsError =
  | BadRequest
  | DataRepositoryAssociationNotFound
  | FileSystemNotFound
  | InternalServerError
  | InvalidDataRepositoryType
  | CommonErrors;
/**
 * Returns the description of specific Amazon FSx for Lustre or Amazon File Cache
 * data repository associations, if one or more `AssociationIds` values
 * are provided in the request, or if filters are used in the request. Data repository
 * associations are supported on Amazon File Cache resources and all FSx for Lustre
 * 2.12 and 2,15 file systems, excluding `scratch_1` deployment type.
 *
 * You can use filters to narrow the response to include just data repository
 * associations for specific file systems (use the `file-system-id` filter with
 * the ID of the file system) or caches (use the `file-cache-id` filter with
 * the ID of the cache), or data repository associations for a specific repository type
 * (use the `data-repository-type` filter with a value of `S3`
 * or `NFS`). If you don't use filters, the response returns all data
 * repository associations owned by your Amazon Web Services account in the Amazon Web Services Region
 * of the endpoint that you're calling.
 *
 * When retrieving all data repository associations, you can paginate the response by using
 * the optional `MaxResults` parameter to limit the number of data repository associations
 * returned in a response. If more data repository associations remain, a
 * `NextToken` value is returned in the response. In this case, send a later
 * request with the `NextToken` request parameter set to the value of
 * `NextToken` from the last response.
 */
export const describeDataRepositoryAssociations: API.PaginatedOperationMethod<
  DescribeDataRepositoryAssociationsRequest,
  DescribeDataRepositoryAssociationsResponse,
  DescribeDataRepositoryAssociationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeDataRepositoryAssociationsRequest,
  output: DescribeDataRepositoryAssociationsResponse,
  errors: [
    BadRequest,
    DataRepositoryAssociationNotFound,
    FileSystemNotFound,
    InternalServerError,
    InvalidDataRepositoryType,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataRepositoryAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeDataRepositoryTasksError =
  | BadRequest
  | DataRepositoryTaskNotFound
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Returns the description of specific Amazon FSx for Lustre or Amazon File Cache data repository tasks, if
 * one or more `TaskIds` values are provided in the request, or if filters are used in the request.
 * You can use filters to narrow the response to include just tasks for specific file systems or caches,
 * or tasks in a specific lifecycle state. Otherwise, it returns all data repository tasks owned
 * by your Amazon Web Services account in the Amazon Web Services Region of the endpoint that you're calling.
 *
 * When retrieving all tasks, you can paginate the response by using the optional `MaxResults`
 * parameter to limit the number of tasks returned in a response. If more tasks remain,
 * a `NextToken` value is returned in the response. In this case, send a later
 * request with the `NextToken` request parameter set to the value of
 * `NextToken` from the last response.
 */
export const describeDataRepositoryTasks: API.PaginatedOperationMethod<
  DescribeDataRepositoryTasksRequest,
  DescribeDataRepositoryTasksResponse,
  DescribeDataRepositoryTasksError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeDataRepositoryTasksRequest,
  output: DescribeDataRepositoryTasksResponse,
  errors: [
    BadRequest,
    DataRepositoryTaskNotFound,
    FileSystemNotFound,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataRepositoryTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeFileCachesError =
  | BadRequest
  | FileCacheNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Returns the description of a specific Amazon File Cache resource, if a
 * `FileCacheIds` value is provided for that cache. Otherwise, it
 * returns descriptions of all caches owned by your Amazon Web Services account in the
 * Amazon Web Services Region of the endpoint that you're calling.
 *
 * When retrieving all cache descriptions, you can optionally specify the
 * `MaxResults` parameter to limit the number of descriptions in a response.
 * If more cache descriptions remain, the operation returns a
 * `NextToken` value in the response. In this case, send a later request
 * with the `NextToken` request parameter set to the value of
 * `NextToken` from the last response.
 *
 * This operation is used in an iterative process to retrieve a list of your cache
 * descriptions. `DescribeFileCaches` is called first without a
 * `NextToken`value. Then the operation continues to be called with the
 * `NextToken` parameter set to the value of the last `NextToken`
 * value until a response has no `NextToken`.
 *
 * When using this operation, keep the following in mind:
 *
 * - The implementation might return fewer than `MaxResults`
 * cache descriptions while still including a `NextToken`
 * value.
 *
 * - The order of caches returned in the response of one
 * `DescribeFileCaches` call and the order of caches returned
 * across the responses of a multicall iteration is unspecified.
 */
export const describeFileCaches: API.PaginatedOperationMethod<
  DescribeFileCachesRequest,
  DescribeFileCachesResponse,
  DescribeFileCachesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeFileCachesRequest,
  output: DescribeFileCachesResponse,
  errors: [BadRequest, FileCacheNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFileCaches",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeFileSystemAliasesError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Returns the DNS aliases that are associated with the specified Amazon FSx for Windows File Server file system. A history of
 * all DNS aliases that have been associated with and disassociated from the file system is available in the list of AdministrativeAction
 * provided in the DescribeFileSystems operation response.
 */
export const describeFileSystemAliases: API.PaginatedOperationMethod<
  DescribeFileSystemAliasesRequest,
  DescribeFileSystemAliasesResponse,
  DescribeFileSystemAliasesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeFileSystemAliasesRequest,
  output: DescribeFileSystemAliasesResponse,
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFileSystemAliases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeFileSystemsError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Returns the description of specific Amazon FSx file systems, if a
 * `FileSystemIds` value is provided for that file system. Otherwise, it
 * returns descriptions of all file systems owned by your Amazon Web Services account in the
 * Amazon Web Services Region of the endpoint that you're calling.
 *
 * When retrieving all file system descriptions, you can optionally specify the
 * `MaxResults` parameter to limit the number of descriptions in a response.
 * If more file system descriptions remain, Amazon FSx returns a
 * `NextToken` value in the response. In this case, send a later request
 * with the `NextToken` request parameter set to the value of
 * `NextToken` from the last response.
 *
 * This operation is used in an iterative process to retrieve a list of your file system
 * descriptions. `DescribeFileSystems` is called first without a
 * `NextToken`value. Then the operation continues to be called with the
 * `NextToken` parameter set to the value of the last `NextToken`
 * value until a response has no `NextToken`.
 *
 * When using this operation, keep the following in mind:
 *
 * - The implementation might return fewer than `MaxResults` file
 * system descriptions while still including a `NextToken`
 * value.
 *
 * - The order of file systems returned in the response of one
 * `DescribeFileSystems` call and the order of file systems returned
 * across the responses of a multicall iteration is unspecified.
 */
export const describeFileSystems: API.PaginatedOperationMethod<
  DescribeFileSystemsRequest,
  DescribeFileSystemsResponse,
  DescribeFileSystemsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeFileSystemsRequest,
  output: DescribeFileSystemsResponse,
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFileSystems",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeS3AccessPointAttachmentsError =
  | BadRequest
  | InternalServerError
  | S3AccessPointAttachmentNotFound
  | UnsupportedOperation
  | CommonErrors;
/**
 * Describes one or more S3 access points attached to Amazon FSx volumes.
 *
 * The requester requires the following permission to perform this action:
 *
 * - `fsx:DescribeS3AccessPointAttachments`
 */
export const describeS3AccessPointAttachments: API.PaginatedOperationMethod<
  DescribeS3AccessPointAttachmentsRequest,
  DescribeS3AccessPointAttachmentsResponse,
  DescribeS3AccessPointAttachmentsError,
  Credentials | HttpClient.HttpClient,
  S3AccessPointAttachment
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeS3AccessPointAttachmentsRequest,
  output: DescribeS3AccessPointAttachmentsResponse,
  errors: [
    BadRequest,
    InternalServerError,
    S3AccessPointAttachmentNotFound,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeS3AccessPointAttachments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "S3AccessPointAttachments",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeSharedVpcConfigurationError =
  | BadRequest
  | InternalServerError
  | CommonErrors;
/**
 * Indicates whether participant accounts in your organization can create Amazon FSx for NetApp ONTAP Multi-AZ file systems in subnets that are shared by a virtual
 * private cloud (VPC) owner. For more information, see Creating FSx for ONTAP file systems in shared subnets.
 */
export const describeSharedVpcConfiguration: API.OperationMethod<
  DescribeSharedVpcConfigurationRequest,
  DescribeSharedVpcConfigurationResponse,
  DescribeSharedVpcConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSharedVpcConfigurationRequest,
  output: DescribeSharedVpcConfigurationResponse,
  errors: [BadRequest, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSharedVpcConfiguration",
}));

export type DescribeSnapshotsError =
  | BadRequest
  | InternalServerError
  | SnapshotNotFound
  | CommonErrors;
/**
 * Returns the description of specific Amazon FSx for OpenZFS snapshots, if a
 * `SnapshotIds` value is provided. Otherwise, this operation returns all
 * snapshots owned by your Amazon Web Services account in the Amazon Web Services Region of
 * the endpoint that you're calling.
 *
 * When retrieving all snapshots, you can optionally specify the `MaxResults`
 * parameter to limit the number of snapshots in a response. If more backups remain,
 * Amazon FSx returns a `NextToken` value in the response. In this
 * case, send a later request with the `NextToken` request parameter set to the
 * value of `NextToken` from the last response.
 *
 * Use this operation in an iterative process to retrieve a list of your snapshots.
 * `DescribeSnapshots` is called first without a `NextToken`
 * value. Then the operation continues to be called with the `NextToken`
 * parameter set to the value of the last `NextToken` value until a response has
 * no `NextToken` value.
 *
 * When using this operation, keep the following in mind:
 *
 * - The operation might return fewer than the `MaxResults` value of
 * snapshot descriptions while still including a `NextToken`
 * value.
 *
 * - The order of snapshots returned in the response of one
 * `DescribeSnapshots` call and the order of backups returned across
 * the responses of a multi-call iteration is unspecified.
 */
export const describeSnapshots: API.PaginatedOperationMethod<
  DescribeSnapshotsRequest,
  DescribeSnapshotsResponse,
  DescribeSnapshotsError,
  Credentials | HttpClient.HttpClient,
  Snapshot
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeSnapshotsRequest,
  output: DescribeSnapshotsResponse,
  errors: [BadRequest, InternalServerError, SnapshotNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSnapshots",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Snapshots",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeStorageVirtualMachinesError =
  | BadRequest
  | InternalServerError
  | StorageVirtualMachineNotFound
  | CommonErrors;
/**
 * Describes one or more Amazon FSx for NetApp ONTAP storage virtual machines (SVMs).
 */
export const describeStorageVirtualMachines: API.PaginatedOperationMethod<
  DescribeStorageVirtualMachinesRequest,
  DescribeStorageVirtualMachinesResponse,
  DescribeStorageVirtualMachinesError,
  Credentials | HttpClient.HttpClient,
  StorageVirtualMachine
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeStorageVirtualMachinesRequest,
  output: DescribeStorageVirtualMachinesResponse,
  errors: [BadRequest, InternalServerError, StorageVirtualMachineNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStorageVirtualMachines",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "StorageVirtualMachines",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeVolumesError =
  | BadRequest
  | InternalServerError
  | VolumeNotFound
  | CommonErrors;
/**
 * Describes one or more Amazon FSx for NetApp ONTAP or Amazon FSx for
 * OpenZFS volumes.
 */
export const describeVolumes: API.PaginatedOperationMethod<
  DescribeVolumesRequest,
  DescribeVolumesResponse,
  DescribeVolumesError,
  Credentials | HttpClient.HttpClient,
  Volume
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeVolumesRequest,
  output: DescribeVolumesResponse,
  errors: [BadRequest, InternalServerError, VolumeNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVolumes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Volumes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DetachAndDeleteS3AccessPointError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | S3AccessPointAttachmentNotFound
  | UnsupportedOperation
  | CommonErrors;
/**
 * Detaches an S3 access point from an Amazon FSx volume and deletes the S3 access point.
 *
 * The requester requires the following permission to perform this action:
 *
 * - `fsx:DetachAndDeleteS3AccessPoint`
 *
 * - `s3:DeleteAccessPoint`
 */
export const detachAndDeleteS3AccessPoint: API.OperationMethod<
  DetachAndDeleteS3AccessPointRequest,
  DetachAndDeleteS3AccessPointResponse,
  DetachAndDeleteS3AccessPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DetachAndDeleteS3AccessPointRequest,
  output: DetachAndDeleteS3AccessPointResponse,
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    S3AccessPointAttachmentNotFound,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachAndDeleteS3AccessPoint",
}));

export type DisassociateFileSystemAliasesError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Use this action to disassociate, or remove, one or more Domain Name Service (DNS) aliases
 * from an Amazon FSx for Windows File Server file system. If you attempt to disassociate a DNS alias that is not
 * associated with the file system, Amazon FSx responds with an HTTP status code 400 (Bad Request). For more information, see
 * Working with DNS Aliases.
 *
 * The system generated response showing the DNS aliases that
 * Amazon FSx is attempting to disassociate from the file system.
 * Use the API
 * operation to monitor the status of the aliases Amazon FSx is
 * disassociating with the file system.
 */
export const disassociateFileSystemAliases: API.OperationMethod<
  DisassociateFileSystemAliasesRequest,
  DisassociateFileSystemAliasesResponse,
  DisassociateFileSystemAliasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateFileSystemAliasesRequest,
  output: DisassociateFileSystemAliasesResponse,
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFileSystemAliases",
}));

export type ListTagsForResourceError =
  | BadRequest
  | InternalServerError
  | NotServiceResourceError
  | ResourceDoesNotSupportTagging
  | ResourceNotFound
  | CommonErrors;
/**
 * Lists tags for Amazon FSx resources.
 *
 * When retrieving all tags, you can optionally specify the `MaxResults`
 * parameter to limit the number of tags in a response. If more tags remain, Amazon FSx
 * returns a `NextToken` value in the response. In this case, send a later
 * request with the `NextToken` request parameter set to the value of
 * `NextToken` from the last response.
 *
 * This action is used in an iterative process to retrieve a list of your tags.
 * `ListTagsForResource` is called first without a
 * `NextToken`value. Then the action continues to be called with the
 * `NextToken` parameter set to the value of the last `NextToken`
 * value until a response has no `NextToken`.
 *
 * When using this action, keep the following in mind:
 *
 * - The implementation might return fewer than `MaxResults` file
 * system descriptions while still including a `NextToken`
 * value.
 *
 * - The order of tags returned in the response of one
 * `ListTagsForResource` call and the order of tags returned across
 * the responses of a multi-call iteration is unspecified.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    BadRequest,
    InternalServerError,
    NotServiceResourceError,
    ResourceDoesNotSupportTagging,
    ResourceNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ReleaseFileSystemNfsV3LocksError =
  | BadRequest
  | FileSystemNotFound
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | CommonErrors;
/**
 * Releases the file system lock from an Amazon FSx for OpenZFS file
 * system.
 */
export const releaseFileSystemNfsV3Locks: API.OperationMethod<
  ReleaseFileSystemNfsV3LocksRequest,
  ReleaseFileSystemNfsV3LocksResponse,
  ReleaseFileSystemNfsV3LocksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ReleaseFileSystemNfsV3LocksRequest,
  output: ReleaseFileSystemNfsV3LocksResponse,
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReleaseFileSystemNfsV3Locks",
}));

export type RestoreVolumeFromSnapshotError =
  | BadRequest
  | InternalServerError
  | VolumeNotFound
  | RestoreSnapshotNotFound
  | CommonErrors;
/**
 * Returns an Amazon FSx for OpenZFS volume to the state saved by the specified
 * snapshot.
 */
export const restoreVolumeFromSnapshot: API.OperationMethod<
  RestoreVolumeFromSnapshotRequest,
  RestoreVolumeFromSnapshotResponse,
  RestoreVolumeFromSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestoreVolumeFromSnapshotRequest,
  output: RestoreVolumeFromSnapshotResponse,
  errors: [
    BadRequest,
    InternalServerError,
    VolumeNotFound,
    RestoreSnapshotNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreVolumeFromSnapshot",
}));

export type StartMisconfiguredStateRecoveryError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * After performing steps to repair the Active Directory configuration of an FSx for Windows File Server file system, use this action to
 * initiate the process of Amazon FSx attempting to reconnect to the file system.
 */
export const startMisconfiguredStateRecovery: API.OperationMethod<
  StartMisconfiguredStateRecoveryRequest,
  StartMisconfiguredStateRecoveryResponse,
  StartMisconfiguredStateRecoveryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMisconfiguredStateRecoveryRequest,
  output: StartMisconfiguredStateRecoveryResponse,
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMisconfiguredStateRecovery",
}));

export type TagResourceError =
  | BadRequest
  | InternalServerError
  | NotServiceResourceError
  | ResourceDoesNotSupportTagging
  | ResourceNotFound
  | CommonErrors;
/**
 * Tags an Amazon FSx resource.
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
    BadRequest,
    InternalServerError,
    NotServiceResourceError,
    ResourceDoesNotSupportTagging,
    ResourceNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | BadRequest
  | InternalServerError
  | NotServiceResourceError
  | ResourceDoesNotSupportTagging
  | ResourceNotFound
  | CommonErrors;
/**
 * This action removes a tag from an Amazon FSx resource.
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
    BadRequest,
    InternalServerError,
    NotServiceResourceError,
    ResourceDoesNotSupportTagging,
    ResourceNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateDataRepositoryAssociationError =
  | BadRequest
  | DataRepositoryAssociationNotFound
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | CommonErrors;
/**
 * Updates the configuration of an existing data repository association
 * on an Amazon FSx for Lustre file system. Data repository associations
 * are supported on all FSx for Lustre 2.12 and 2.15 file systems,
 * excluding `scratch_1` deployment type.
 */
export const updateDataRepositoryAssociation: API.OperationMethod<
  UpdateDataRepositoryAssociationRequest,
  UpdateDataRepositoryAssociationResponse,
  UpdateDataRepositoryAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDataRepositoryAssociationRequest,
  output: UpdateDataRepositoryAssociationResponse,
  errors: [
    BadRequest,
    DataRepositoryAssociationNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataRepositoryAssociation",
}));

export type UpdateFileCacheError =
  | BadRequest
  | FileCacheNotFound
  | IncompatibleParameterError
  | InternalServerError
  | MissingFileCacheConfiguration
  | ServiceLimitExceeded
  | UnsupportedOperation
  | CommonErrors;
/**
 * Updates the configuration of an existing Amazon File Cache resource.
 * You can update multiple properties in a single request.
 */
export const updateFileCache: API.OperationMethod<
  UpdateFileCacheRequest,
  UpdateFileCacheResponse,
  UpdateFileCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFileCacheRequest,
  output: UpdateFileCacheResponse,
  errors: [
    BadRequest,
    FileCacheNotFound,
    IncompatibleParameterError,
    InternalServerError,
    MissingFileCacheConfiguration,
    ServiceLimitExceeded,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFileCache",
}));

export type UpdateFileSystemError =
  | BadRequest
  | FileSystemNotFound
  | IncompatibleParameterError
  | InternalServerError
  | InvalidNetworkSettings
  | MissingFileSystemConfiguration
  | ServiceLimitExceeded
  | UnsupportedOperation
  | CommonErrors;
/**
 * Use this operation to update the configuration of an existing Amazon FSx file
 * system. You can update multiple properties in a single request.
 *
 * For FSx for Windows File Server file systems, you can update the following
 * properties:
 *
 * - `AuditLogConfiguration`
 *
 * - `AutomaticBackupRetentionDays`
 *
 * - `DailyAutomaticBackupStartTime`
 *
 * - `DiskIopsConfiguration`
 *
 * - `SelfManagedActiveDirectoryConfiguration`
 *
 * - `StorageCapacity`
 *
 * - `StorageType`
 *
 * - `ThroughputCapacity`
 *
 * - `WeeklyMaintenanceStartTime`
 *
 * For FSx for Lustre file systems, you can update the following
 * properties:
 *
 * - `AutoImportPolicy`
 *
 * - `AutomaticBackupRetentionDays`
 *
 * - `DailyAutomaticBackupStartTime`
 *
 * - `DataCompressionType`
 *
 * - `FileSystemTypeVersion`
 *
 * - `LogConfiguration`
 *
 * - `LustreReadCacheConfiguration`
 *
 * - `LustreRootSquashConfiguration`
 *
 * - `MetadataConfiguration`
 *
 * - `PerUnitStorageThroughput`
 *
 * - `StorageCapacity`
 *
 * - `ThroughputCapacity`
 *
 * - `WeeklyMaintenanceStartTime`
 *
 * For FSx for ONTAP file systems, you can update the following
 * properties:
 *
 * - `AddRouteTableIds`
 *
 * - `AutomaticBackupRetentionDays`
 *
 * - `DailyAutomaticBackupStartTime`
 *
 * - `DiskIopsConfiguration`
 *
 * - `EndpointIpv6AddressRange`
 *
 * - `FsxAdminPassword`
 *
 * - `HAPairs`
 *
 * - `RemoveRouteTableIds`
 *
 * - `StorageCapacity`
 *
 * - `ThroughputCapacity`
 *
 * - `ThroughputCapacityPerHAPair`
 *
 * - `WeeklyMaintenanceStartTime`
 *
 * For FSx for OpenZFS file systems, you can update the following
 * properties:
 *
 * - `AddRouteTableIds`
 *
 * - `AutomaticBackupRetentionDays`
 *
 * - `CopyTagsToBackups`
 *
 * - `CopyTagsToVolumes`
 *
 * - `DailyAutomaticBackupStartTime`
 *
 * - `DiskIopsConfiguration`
 *
 * - `EndpointIpv6AddressRange`
 *
 * - `ReadCacheConfiguration`
 *
 * - `RemoveRouteTableIds`
 *
 * - `StorageCapacity`
 *
 * - `ThroughputCapacity`
 *
 * - `WeeklyMaintenanceStartTime`
 */
export const updateFileSystem: API.OperationMethod<
  UpdateFileSystemRequest,
  UpdateFileSystemResponse,
  UpdateFileSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFileSystemRequest,
  output: UpdateFileSystemResponse,
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    InvalidNetworkSettings,
    MissingFileSystemConfiguration,
    ServiceLimitExceeded,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFileSystem",
}));

export type UpdateSharedVpcConfigurationError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | CommonErrors;
/**
 * Configures whether participant accounts in your organization can create Amazon FSx for NetApp ONTAP Multi-AZ file systems in subnets that are shared by a virtual
 * private cloud (VPC) owner. For more information, see the Amazon FSx for NetApp ONTAP User
 * Guide.
 *
 * We strongly recommend that participant-created Multi-AZ file systems in the shared
 * VPC are deleted before you disable this feature. Once the feature is disabled, these
 * file systems will enter a `MISCONFIGURED` state and behave like Single-AZ
 * file systems. For more information, see Important considerations before disabling shared VPC support for Multi-AZ file
 * systems.
 */
export const updateSharedVpcConfiguration: API.OperationMethod<
  UpdateSharedVpcConfigurationRequest,
  UpdateSharedVpcConfigurationResponse,
  UpdateSharedVpcConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSharedVpcConfigurationRequest,
  output: UpdateSharedVpcConfigurationResponse,
  errors: [BadRequest, IncompatibleParameterError, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSharedVpcConfiguration",
}));

export type UpdateSnapshotError =
  | BadRequest
  | InternalServerError
  | SnapshotNotFound
  | UpdateSnapshotNotFound
  | CommonErrors;
/**
 * Updates the name of an Amazon FSx for OpenZFS snapshot.
 */
export const updateSnapshot: API.OperationMethod<
  UpdateSnapshotRequest,
  UpdateSnapshotResponse,
  UpdateSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSnapshotRequest,
  output: UpdateSnapshotResponse,
  errors: [
    BadRequest,
    InternalServerError,
    SnapshotNotFound,
    UpdateSnapshotNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSnapshot",
}));

export type UpdateStorageVirtualMachineError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | StorageVirtualMachineNotFound
  | UnsupportedOperation
  | CommonErrors;
/**
 * Updates an FSx for ONTAP storage virtual machine (SVM).
 */
export const updateStorageVirtualMachine: API.OperationMethod<
  UpdateStorageVirtualMachineRequest,
  UpdateStorageVirtualMachineResponse,
  UpdateStorageVirtualMachineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateStorageVirtualMachineRequest,
  output: UpdateStorageVirtualMachineResponse,
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    StorageVirtualMachineNotFound,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStorageVirtualMachine",
}));

export type UpdateVolumeError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | MissingVolumeConfiguration
  | VolumeNotFound
  | CommonErrors;
/**
 * Updates the configuration of an Amazon FSx for NetApp ONTAP or Amazon FSx for OpenZFS volume.
 */
export const updateVolume: API.OperationMethod<
  UpdateVolumeRequest,
  UpdateVolumeResponse,
  UpdateVolumeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateVolumeRequest,
  output: UpdateVolumeResponse,
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    MissingVolumeConfiguration,
    VolumeNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVolume",
}));
