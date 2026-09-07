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
  sdkId: "EFS",
  serviceShapeName: "MagnolioAPIService_v20150201",
});
const auth = T.AwsAuthSigv4({ name: "elasticfilesystem" });
const ver = T.ServiceVersion("2015-02-01");
const proto = T.AwsProtocolsRestJson1();
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
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            `https://efs.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === true &&
          UseDualStack === true
        ) {
          return e(
            `https://efs-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-cn" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            `https://efs.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-cn" &&
          UseFIPS === true &&
          UseDualStack === true
        ) {
          return e(
            `https://efs-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            `https://efs.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === true &&
          UseDualStack === true
        ) {
          return e(
            `https://efs-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://elasticfilesystem-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://elasticfilesystem-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://elasticfilesystem.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://elasticfilesystem.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessPointAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<AccessPointAlreadyExists>()(
    "AccessPointAlreadyExists",
    {
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      AccessPointId: S.String,
    },
    T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class AccessPointLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<AccessPointLimitExceeded>()(
    "AccessPointLimitExceeded",
    {
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError, C.withThrottlingError) {}
export class AccessPointNotFound
  extends /*@__PURE__*/ S.TaggedError<AccessPointNotFound>()(
    "AccessPointNotFound",
    {
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class AvailabilityZonesMismatch
  extends /*@__PURE__*/ S.TaggedError<AvailabilityZonesMismatch>()(
    "AvailabilityZonesMismatch",
    {
      ErrorCode: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class BadRequest
  extends /*@__PURE__*/ S.TaggedError<BadRequest>()(
    "BadRequest",
    {
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      ErrorCode: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DependencyTimeout
  extends /*@__PURE__*/ S.TaggedError<DependencyTimeout>()(
    "DependencyTimeout",
    {
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(504),
  ).pipe(C.withTimeoutError) {}
export class FileSystemAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<FileSystemAlreadyExists>()(
    "FileSystemAlreadyExists",
    {
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      FileSystemId: S.String,
    },
    T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class FileSystemInUse
  extends /*@__PURE__*/ S.TaggedError<FileSystemInUse>()(
    "FileSystemInUse",
    {
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError, C.withDependencyViolationError) {}
export class FileSystemLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<FileSystemLimitExceeded>()(
    "FileSystemLimitExceeded",
    {
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError, C.withThrottlingError) {}
export class FileSystemNotFound
  extends /*@__PURE__*/ S.TaggedError<FileSystemNotFound>()(
    "FileSystemNotFound",
    {
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class IncorrectFileSystemLifeCycleState
  extends /*@__PURE__*/ S.TaggedError<IncorrectFileSystemLifeCycleState>()(
    "IncorrectFileSystemLifeCycleState",
    {
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class IncorrectMountTargetState
  extends /*@__PURE__*/ S.TaggedError<IncorrectMountTargetState>()(
    "IncorrectMountTargetState",
    {
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InsufficientThroughputCapacity
  extends /*@__PURE__*/ S.TaggedError<InsufficientThroughputCapacity>()(
    "InsufficientThroughputCapacity",
    {
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class InternalServerError
  extends /*@__PURE__*/ S.TaggedError<InternalServerError>()(
    "InternalServerError",
    {
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidPolicyException
  extends /*@__PURE__*/ S.TaggedError<InvalidPolicyException>()(
    "InvalidPolicyException",
    {
      ErrorCode: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class IpAddressInUse
  extends /*@__PURE__*/ S.TaggedError<IpAddressInUse>()(
    "IpAddressInUse",
    {
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError, C.withDependencyViolationError) {}
export class MountTargetConflict
  extends /*@__PURE__*/ S.TaggedError<MountTargetConflict>()(
    "MountTargetConflict",
    {
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class MountTargetNotFound
  extends /*@__PURE__*/ S.TaggedError<MountTargetNotFound>()(
    "MountTargetNotFound",
    {
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NetworkInterfaceLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<NetworkInterfaceLimitExceeded>()(
    "NetworkInterfaceLimitExceeded",
    {
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError, C.withThrottlingError) {}
export class NoFreeAddressesInSubnet
  extends /*@__PURE__*/ S.TaggedError<NoFreeAddressesInSubnet>()(
    "NoFreeAddressesInSubnet",
    {
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class PolicyNotFound
  extends /*@__PURE__*/ S.TaggedError<PolicyNotFound>()(
    "PolicyNotFound",
    {
      ErrorCode: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ReplicationAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<ReplicationAlreadyExists>()(
    "ReplicationAlreadyExists",
    {
      ErrorCode: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class ReplicationNotFound
  extends /*@__PURE__*/ S.TaggedError<ReplicationNotFound>()(
    "ReplicationNotFound",
    {
      ErrorCode: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class SecurityGroupLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<SecurityGroupLimitExceeded>()(
    "SecurityGroupLimitExceeded",
    {
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withThrottlingError) {}
export class SecurityGroupNotFound
  extends /*@__PURE__*/ S.TaggedError<SecurityGroupNotFound>()(
    "SecurityGroupNotFound",
    {
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class SubnetNotFound
  extends /*@__PURE__*/ S.TaggedError<SubnetNotFound>()(
    "SubnetNotFound",
    {
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      ErrorCode: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ThroughputLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<ThroughputLimitExceeded>()(
    "ThroughputLimitExceeded",
    {
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withThrottlingError) {}
export class TooManyRequests
  extends /*@__PURE__*/ S.TaggedError<TooManyRequests>()(
    "TooManyRequests",
    {
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnsupportedAvailabilityZone
  extends /*@__PURE__*/ S.TaggedError<UnsupportedAvailabilityZone>()(
    "UnsupportedAvailabilityZone",
    {
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ClientToken = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type Tags = Tag[];
export const Tags = /*@__PURE__*/ S.Array(Tag);
export type FileSystemId = string;
export type Uid = number;
export type Gid = number;
export type SecondaryGids = number[];
export const SecondaryGids = /*@__PURE__*/ S.Array(S.Number);
export interface PosixUser {
  Uid: number;
  Gid: number;
  SecondaryGids?: number[];
}
export const PosixUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Uid: S.Number,
    Gid: S.Number,
    SecondaryGids: S.optional(SecondaryGids),
  }),
).annotate({ identifier: "PosixUser" }) as any as S.Schema<PosixUser>;
export type Path = string;
export type OwnerUid = number;
export type OwnerGid = number;
export type Permissions = string;
export interface CreationInfo {
  OwnerUid: number;
  OwnerGid: number;
  Permissions: string;
}
export const CreationInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OwnerUid: S.Number, OwnerGid: S.Number, Permissions: S.String }),
).annotate({ identifier: "CreationInfo" }) as any as S.Schema<CreationInfo>;
export interface RootDirectory {
  Path?: string;
  CreationInfo?: CreationInfo;
}
export const RootDirectory = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Path: S.optional(S.String),
    CreationInfo: S.optional(CreationInfo),
  }),
).annotate({ identifier: "RootDirectory" }) as any as S.Schema<RootDirectory>;
export interface CreateAccessPointRequest {
  ClientToken: string;
  Tags?: Tag[];
  FileSystemId: string;
  PosixUser?: PosixUser;
  RootDirectory?: RootDirectory;
}
export const CreateAccessPointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.String.pipe(T.IdempotencyToken()),
    Tags: S.optional(Tags),
    FileSystemId: S.String,
    PosixUser: S.optional(PosixUser),
    RootDirectory: S.optional(RootDirectory),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2015-02-01/access-points" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAccessPointRequest",
}) as any as S.Schema<CreateAccessPointRequest>;
export type Name = string;
export type AccessPointId = string;
export type AccessPointArn = string;
export type AwsAccountId = string;
export type LifeCycleState =
  | "creating"
  | "available"
  | "updating"
  | "deleting"
  | "deleted"
  | "error"
  | (string & {});
export const LifeCycleState = /*@__PURE__*/ S.String;

export interface AccessPointDescription {
  ClientToken?: string;
  Name?: string;
  Tags?: Tag[];
  AccessPointId?: string;
  AccessPointArn?: string;
  FileSystemId?: string;
  PosixUser?: PosixUser;
  RootDirectory?: RootDirectory;
  OwnerId?: string;
  LifeCycleState?: LifeCycleState;
}
export const AccessPointDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String),
    Name: S.optional(S.String),
    Tags: S.optional(Tags),
    AccessPointId: S.optional(S.String),
    AccessPointArn: S.optional(S.String),
    FileSystemId: S.optional(S.String),
    PosixUser: S.optional(PosixUser),
    RootDirectory: S.optional(RootDirectory),
    OwnerId: S.optional(S.String),
    LifeCycleState: S.optional(LifeCycleState),
  }),
).annotate({
  identifier: "AccessPointDescription",
}) as any as S.Schema<AccessPointDescription>;
export type CreationToken = string;
export type PerformanceMode = "generalPurpose" | "maxIO" | (string & {});
export const PerformanceMode = /*@__PURE__*/ S.String;

export type Encrypted = boolean;
export type KmsKeyId = string;
export type ThroughputMode =
  | "bursting"
  | "provisioned"
  | "elastic"
  | (string & {});
export const ThroughputMode = /*@__PURE__*/ S.String;

export type ProvisionedThroughputInMibps = number;
export type AvailabilityZoneName = string;
export type Backup = boolean;
export interface CreateFileSystemRequest {
  CreationToken: string;
  PerformanceMode?: PerformanceMode;
  Encrypted?: boolean;
  KmsKeyId?: string;
  ThroughputMode?: ThroughputMode;
  ProvisionedThroughputInMibps?: number;
  AvailabilityZoneName?: string;
  Backup?: boolean;
  Tags?: Tag[];
}
export const CreateFileSystemRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreationToken: S.String.pipe(T.IdempotencyToken()),
    PerformanceMode: S.optional(PerformanceMode),
    Encrypted: S.optional(S.Boolean),
    KmsKeyId: S.optional(S.String),
    ThroughputMode: S.optional(ThroughputMode),
    ProvisionedThroughputInMibps: S.optional(S.Number),
    AvailabilityZoneName: S.optional(S.String),
    Backup: S.optional(S.Boolean),
    Tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2015-02-01/file-systems" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFileSystemRequest",
}) as any as S.Schema<CreateFileSystemRequest>;
export type FileSystemArn = string;
export type MountTargetCount = number;
export type FileSystemSizeValue = number;
export type FileSystemNullableSizeValue = number;
export interface FileSystemSize {
  Value: number;
  Timestamp?: Date;
  ValueInIA?: number;
  ValueInStandard?: number;
  ValueInArchive?: number;
}
export const FileSystemSize = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Value: S.Number,
    Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ValueInIA: S.optional(S.Number),
    ValueInStandard: S.optional(S.Number),
    ValueInArchive: S.optional(S.Number),
  }),
).annotate({ identifier: "FileSystemSize" }) as any as S.Schema<FileSystemSize>;
export type AvailabilityZoneId = string;
export type ReplicationOverwriteProtection =
  | "ENABLED"
  | "DISABLED"
  | "REPLICATING"
  | (string & {});
export const ReplicationOverwriteProtection = /*@__PURE__*/ S.String;

export interface FileSystemProtectionDescription {
  ReplicationOverwriteProtection?: ReplicationOverwriteProtection;
}
export const FileSystemProtectionDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationOverwriteProtection: S.optional(ReplicationOverwriteProtection),
  }),
).annotate({
  identifier: "FileSystemProtectionDescription",
}) as any as S.Schema<FileSystemProtectionDescription>;
export interface FileSystemDescription {
  OwnerId: string;
  CreationToken: string;
  FileSystemId: string;
  FileSystemArn?: string;
  CreationTime: Date;
  LifeCycleState: LifeCycleState;
  Name?: string;
  NumberOfMountTargets: number;
  SizeInBytes: FileSystemSize;
  PerformanceMode: PerformanceMode;
  Encrypted?: boolean;
  KmsKeyId?: string;
  ThroughputMode?: ThroughputMode;
  ProvisionedThroughputInMibps?: number;
  AvailabilityZoneName?: string;
  AvailabilityZoneId?: string;
  Tags: Tag[];
  FileSystemProtection?: FileSystemProtectionDescription;
}
export const FileSystemDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OwnerId: S.String,
    CreationToken: S.String,
    FileSystemId: S.String,
    FileSystemArn: S.optional(S.String),
    CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    LifeCycleState: LifeCycleState,
    Name: S.optional(S.String),
    NumberOfMountTargets: S.Number,
    SizeInBytes: FileSystemSize,
    PerformanceMode: PerformanceMode,
    Encrypted: S.optional(S.Boolean),
    KmsKeyId: S.optional(S.String),
    ThroughputMode: S.optional(ThroughputMode),
    ProvisionedThroughputInMibps: S.optional(S.Number),
    AvailabilityZoneName: S.optional(S.String),
    AvailabilityZoneId: S.optional(S.String),
    Tags: Tags,
    FileSystemProtection: S.optional(FileSystemProtectionDescription),
  }),
).annotate({
  identifier: "FileSystemDescription",
}) as any as S.Schema<FileSystemDescription>;
export type SubnetId = string;
export type IpAddress = string;
export type Ipv6Address = string;
export type IpAddressType =
  | "IPV4_ONLY"
  | "IPV6_ONLY"
  | "DUAL_STACK"
  | (string & {});
export const IpAddressType = /*@__PURE__*/ S.String;

export type SecurityGroup = string;
export type SecurityGroups = string[];
export const SecurityGroups = /*@__PURE__*/ S.Array(S.String);
export interface CreateMountTargetRequest {
  FileSystemId: string;
  SubnetId: string;
  IpAddress?: string;
  Ipv6Address?: string;
  IpAddressType?: IpAddressType;
  SecurityGroups?: string[];
}
export const CreateMountTargetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileSystemId: S.String,
    SubnetId: S.String,
    IpAddress: S.optional(S.String),
    Ipv6Address: S.optional(S.String),
    IpAddressType: S.optional(IpAddressType),
    SecurityGroups: S.optional(SecurityGroups),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2015-02-01/mount-targets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMountTargetRequest",
}) as any as S.Schema<CreateMountTargetRequest>;
export type MountTargetId = string;
export type NetworkInterfaceId = string;
export type VpcId = string;
export interface MountTargetDescription {
  OwnerId?: string;
  MountTargetId: string;
  FileSystemId: string;
  SubnetId: string;
  LifeCycleState: LifeCycleState;
  IpAddress?: string;
  Ipv6Address?: string;
  NetworkInterfaceId?: string;
  AvailabilityZoneId?: string;
  AvailabilityZoneName?: string;
  VpcId?: string;
}
export const MountTargetDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OwnerId: S.optional(S.String),
    MountTargetId: S.String,
    FileSystemId: S.String,
    SubnetId: S.String,
    LifeCycleState: LifeCycleState,
    IpAddress: S.optional(S.String),
    Ipv6Address: S.optional(S.String),
    NetworkInterfaceId: S.optional(S.String),
    AvailabilityZoneId: S.optional(S.String),
    AvailabilityZoneName: S.optional(S.String),
    VpcId: S.optional(S.String),
  }),
).annotate({
  identifier: "MountTargetDescription",
}) as any as S.Schema<MountTargetDescription>;
export type RegionName = string;
export type RoleArn = string;
export interface DestinationToCreate {
  Region?: string;
  AvailabilityZoneName?: string;
  KmsKeyId?: string;
  FileSystemId?: string;
  RoleArn?: string;
}
export const DestinationToCreate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Region: S.optional(S.String),
    AvailabilityZoneName: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    FileSystemId: S.optional(S.String),
    RoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DestinationToCreate",
}) as any as S.Schema<DestinationToCreate>;
export type DestinationsToCreate = DestinationToCreate[];
export const DestinationsToCreate = /*@__PURE__*/ S.Array(DestinationToCreate);
export interface CreateReplicationConfigurationRequest {
  SourceFileSystemId: string;
  Destinations: DestinationToCreate[];
}
export const CreateReplicationConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SourceFileSystemId: S.String.pipe(T.HttpLabel("SourceFileSystemId")),
      Destinations: DestinationsToCreate,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/2015-02-01/file-systems/{SourceFileSystemId}/replication-configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateReplicationConfigurationRequest",
}) as any as S.Schema<CreateReplicationConfigurationRequest>;
export type ReplicationStatus =
  | "ENABLED"
  | "ENABLING"
  | "DELETING"
  | "ERROR"
  | "PAUSED"
  | "PAUSING"
  | (string & {});
export const ReplicationStatus = /*@__PURE__*/ S.String;

export type StatusMessage = string;
export interface Destination {
  Status: ReplicationStatus;
  FileSystemId: string;
  Region: string;
  LastReplicatedTimestamp?: Date;
  OwnerId?: string;
  StatusMessage?: string;
  RoleArn?: string;
}
export const Destination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: ReplicationStatus,
    FileSystemId: S.String,
    Region: S.String,
    LastReplicatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    OwnerId: S.optional(S.String),
    StatusMessage: S.optional(S.String),
    RoleArn: S.optional(S.String),
  }),
).annotate({ identifier: "Destination" }) as any as S.Schema<Destination>;
export type Destinations = Destination[];
export const Destinations = /*@__PURE__*/ S.Array(Destination);
export interface ReplicationConfigurationDescription {
  SourceFileSystemId: string;
  SourceFileSystemRegion: string;
  SourceFileSystemArn: string;
  OriginalSourceFileSystemArn: string;
  CreationTime: Date;
  Destinations: Destination[];
  SourceFileSystemOwnerId?: string;
}
export const ReplicationConfigurationDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceFileSystemId: S.String,
    SourceFileSystemRegion: S.String,
    SourceFileSystemArn: S.String,
    OriginalSourceFileSystemArn: S.String,
    CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Destinations: Destinations,
    SourceFileSystemOwnerId: S.optional(S.String),
  }),
).annotate({
  identifier: "ReplicationConfigurationDescription",
}) as any as S.Schema<ReplicationConfigurationDescription>;
export interface CreateTagsRequest {
  FileSystemId: string;
  Tags: Tag[];
}
export const CreateTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileSystemId: S.String.pipe(T.HttpLabel("FileSystemId")),
    Tags: Tags,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2015-02-01/create-tags/{FileSystemId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateTagsRequest",
}) as any as S.Schema<CreateTagsRequest>;
export interface CreateTagsResponse {}
export const CreateTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateTagsResponse",
}) as any as S.Schema<CreateTagsResponse>;
export interface DeleteAccessPointRequest {
  AccessPointId: string;
}
export const DeleteAccessPointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccessPointId: S.String.pipe(T.HttpLabel("AccessPointId")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2015-02-01/access-points/{AccessPointId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAccessPointRequest",
}) as any as S.Schema<DeleteAccessPointRequest>;
export interface DeleteAccessPointResponse {}
export const DeleteAccessPointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAccessPointResponse",
}) as any as S.Schema<DeleteAccessPointResponse>;
export interface DeleteFileSystemRequest {
  FileSystemId: string;
}
export const DeleteFileSystemRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FileSystemId: S.String.pipe(T.HttpLabel("FileSystemId")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2015-02-01/file-systems/{FileSystemId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFileSystemRequest",
}) as any as S.Schema<DeleteFileSystemRequest>;
export interface DeleteFileSystemResponse {}
export const DeleteFileSystemResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteFileSystemResponse",
}) as any as S.Schema<DeleteFileSystemResponse>;
export interface DeleteFileSystemPolicyRequest {
  FileSystemId: string;
}
export const DeleteFileSystemPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FileSystemId: S.String.pipe(T.HttpLabel("FileSystemId")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2015-02-01/file-systems/{FileSystemId}/policy",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFileSystemPolicyRequest",
}) as any as S.Schema<DeleteFileSystemPolicyRequest>;
export interface DeleteFileSystemPolicyResponse {}
export const DeleteFileSystemPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteFileSystemPolicyResponse",
}) as any as S.Schema<DeleteFileSystemPolicyResponse>;
export interface DeleteMountTargetRequest {
  MountTargetId: string;
}
export const DeleteMountTargetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MountTargetId: S.String.pipe(T.HttpLabel("MountTargetId")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2015-02-01/mount-targets/{MountTargetId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMountTargetRequest",
}) as any as S.Schema<DeleteMountTargetRequest>;
export interface DeleteMountTargetResponse {}
export const DeleteMountTargetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMountTargetResponse",
}) as any as S.Schema<DeleteMountTargetResponse>;
export type DeletionMode =
  | "ALL_CONFIGURATIONS"
  | "LOCAL_CONFIGURATION_ONLY"
  | (string & {});
export const DeletionMode = /*@__PURE__*/ S.String;

export interface DeleteReplicationConfigurationRequest {
  SourceFileSystemId: string;
  DeletionMode?: DeletionMode;
}
export const DeleteReplicationConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SourceFileSystemId: S.String.pipe(T.HttpLabel("SourceFileSystemId")),
      DeletionMode: S.optional(DeletionMode).pipe(T.HttpQuery("deletionMode")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/2015-02-01/file-systems/{SourceFileSystemId}/replication-configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteReplicationConfigurationRequest",
}) as any as S.Schema<DeleteReplicationConfigurationRequest>;
export interface DeleteReplicationConfigurationResponse {}
export const DeleteReplicationConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteReplicationConfigurationResponse",
}) as any as S.Schema<DeleteReplicationConfigurationResponse>;
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface DeleteTagsRequest {
  FileSystemId: string;
  TagKeys: string[];
}
export const DeleteTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileSystemId: S.String.pipe(T.HttpLabel("FileSystemId")),
    TagKeys: TagKeys,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2015-02-01/delete-tags/{FileSystemId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTagsRequest",
}) as any as S.Schema<DeleteTagsRequest>;
export interface DeleteTagsResponse {}
export const DeleteTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTagsResponse",
}) as any as S.Schema<DeleteTagsResponse>;
export type MaxResults = number;
export type Token = string;
export interface DescribeAccessPointsRequest {
  MaxResults?: number;
  NextToken?: string;
  AccessPointId?: string;
  FileSystemId?: string;
}
export const DescribeAccessPointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    AccessPointId: S.optional(S.String).pipe(T.HttpQuery("AccessPointId")),
    FileSystemId: S.optional(S.String).pipe(T.HttpQuery("FileSystemId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2015-02-01/access-points" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAccessPointsRequest",
}) as any as S.Schema<DescribeAccessPointsRequest>;
export type AccessPointDescriptions = AccessPointDescription[];
export const AccessPointDescriptions = /*@__PURE__*/ S.Array(
  AccessPointDescription,
);
export interface DescribeAccessPointsResponse {
  AccessPoints?: AccessPointDescription[];
  NextToken?: string;
}
export const DescribeAccessPointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessPoints: S.optional(AccessPointDescriptions),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeAccessPointsResponse",
}) as any as S.Schema<DescribeAccessPointsResponse>;
export interface DescribeAccountPreferencesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeAccountPreferencesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2015-02-01/account-preferences" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAccountPreferencesRequest",
}) as any as S.Schema<DescribeAccountPreferencesRequest>;
export type ResourceIdType = "LONG_ID" | "SHORT_ID" | (string & {});
export const ResourceIdType = /*@__PURE__*/ S.String;

export type Resource = "FILE_SYSTEM" | "MOUNT_TARGET" | (string & {});
export const Resource = /*@__PURE__*/ S.String;

export type Resources = Resource[];
export const Resources = /*@__PURE__*/ S.Array(Resource);
export interface ResourceIdPreference {
  ResourceIdType?: ResourceIdType;
  Resources?: Resource[];
}
export const ResourceIdPreference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceIdType: S.optional(ResourceIdType),
    Resources: S.optional(Resources),
  }),
).annotate({
  identifier: "ResourceIdPreference",
}) as any as S.Schema<ResourceIdPreference>;
export interface DescribeAccountPreferencesResponse {
  ResourceIdPreference?: ResourceIdPreference;
  NextToken?: string;
}
export const DescribeAccountPreferencesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceIdPreference: S.optional(ResourceIdPreference),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeAccountPreferencesResponse",
}) as any as S.Schema<DescribeAccountPreferencesResponse>;
export interface DescribeBackupPolicyRequest {
  FileSystemId: string;
}
export const DescribeBackupPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FileSystemId: S.String.pipe(T.HttpLabel("FileSystemId")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2015-02-01/file-systems/{FileSystemId}/backup-policy",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeBackupPolicyRequest",
}) as any as S.Schema<DescribeBackupPolicyRequest>;
export type Status =
  | "ENABLED"
  | "ENABLING"
  | "DISABLED"
  | "DISABLING"
  | (string & {});
export const Status = /*@__PURE__*/ S.String;

export interface BackupPolicy {
  Status: Status;
}
export const BackupPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: Status }),
).annotate({ identifier: "BackupPolicy" }) as any as S.Schema<BackupPolicy>;
export interface BackupPolicyDescription {
  BackupPolicy?: BackupPolicy;
}
export const BackupPolicyDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BackupPolicy: S.optional(BackupPolicy) }),
).annotate({
  identifier: "BackupPolicyDescription",
}) as any as S.Schema<BackupPolicyDescription>;
export interface DescribeFileSystemPolicyRequest {
  FileSystemId: string;
}
export const DescribeFileSystemPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FileSystemId: S.String.pipe(T.HttpLabel("FileSystemId")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2015-02-01/file-systems/{FileSystemId}/policy",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeFileSystemPolicyRequest",
}) as any as S.Schema<DescribeFileSystemPolicyRequest>;
export type Policy = string;
export interface FileSystemPolicyDescription {
  FileSystemId?: string;
  Policy?: string;
}
export const FileSystemPolicyDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileSystemId: S.optional(S.String),
    Policy: S.optional(S.String),
  }),
).annotate({
  identifier: "FileSystemPolicyDescription",
}) as any as S.Schema<FileSystemPolicyDescription>;
export type MaxItems = number;
export type Marker = string;
export interface DescribeFileSystemsRequest {
  MaxItems?: number;
  Marker?: string;
  CreationToken?: string;
  FileSystemId?: string;
}
export const DescribeFileSystemsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
    Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
    CreationToken: S.optional(S.String).pipe(T.HttpQuery("CreationToken")),
    FileSystemId: S.optional(S.String).pipe(T.HttpQuery("FileSystemId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2015-02-01/file-systems" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeFileSystemsRequest",
}) as any as S.Schema<DescribeFileSystemsRequest>;
export type FileSystemDescriptions = FileSystemDescription[];
export const FileSystemDescriptions = /*@__PURE__*/ S.Array(
  FileSystemDescription,
);
export interface DescribeFileSystemsResponse {
  Marker?: string;
  FileSystems?: FileSystemDescription[];
  NextMarker?: string;
}
export const DescribeFileSystemsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    FileSystems: S.optional(FileSystemDescriptions),
    NextMarker: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeFileSystemsResponse",
}) as any as S.Schema<DescribeFileSystemsResponse>;
export interface DescribeLifecycleConfigurationRequest {
  FileSystemId: string;
}
export const DescribeLifecycleConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ FileSystemId: S.String.pipe(T.HttpLabel("FileSystemId")) }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/2015-02-01/file-systems/{FileSystemId}/lifecycle-configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeLifecycleConfigurationRequest",
}) as any as S.Schema<DescribeLifecycleConfigurationRequest>;
export type TransitionToIARules =
  | "AFTER_7_DAYS"
  | "AFTER_14_DAYS"
  | "AFTER_30_DAYS"
  | "AFTER_60_DAYS"
  | "AFTER_90_DAYS"
  | "AFTER_1_DAY"
  | "AFTER_180_DAYS"
  | "AFTER_270_DAYS"
  | "AFTER_365_DAYS"
  | (string & {});
export const TransitionToIARules = /*@__PURE__*/ S.String;

export type TransitionToPrimaryStorageClassRules =
  | "AFTER_1_ACCESS"
  | (string & {});
export const TransitionToPrimaryStorageClassRules = /*@__PURE__*/ S.String;

export type TransitionToArchiveRules =
  | "AFTER_1_DAY"
  | "AFTER_7_DAYS"
  | "AFTER_14_DAYS"
  | "AFTER_30_DAYS"
  | "AFTER_60_DAYS"
  | "AFTER_90_DAYS"
  | "AFTER_180_DAYS"
  | "AFTER_270_DAYS"
  | "AFTER_365_DAYS"
  | (string & {});
export const TransitionToArchiveRules = /*@__PURE__*/ S.String;

export interface LifecyclePolicy {
  TransitionToIA?: TransitionToIARules;
  TransitionToPrimaryStorageClass?: TransitionToPrimaryStorageClassRules;
  TransitionToArchive?: TransitionToArchiveRules;
}
export const LifecyclePolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TransitionToIA: S.optional(TransitionToIARules),
    TransitionToPrimaryStorageClass: S.optional(
      TransitionToPrimaryStorageClassRules,
    ),
    TransitionToArchive: S.optional(TransitionToArchiveRules),
  }),
).annotate({
  identifier: "LifecyclePolicy",
}) as any as S.Schema<LifecyclePolicy>;
export type LifecyclePolicies = LifecyclePolicy[];
export const LifecyclePolicies = /*@__PURE__*/ S.Array(LifecyclePolicy);
export interface LifecycleConfigurationDescription {
  LifecyclePolicies?: LifecyclePolicy[];
}
export const LifecycleConfigurationDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LifecyclePolicies: S.optional(LifecyclePolicies) }),
).annotate({
  identifier: "LifecycleConfigurationDescription",
}) as any as S.Schema<LifecycleConfigurationDescription>;
export interface DescribeMountTargetsRequest {
  MaxItems?: number;
  Marker?: string;
  FileSystemId?: string;
  MountTargetId?: string;
  AccessPointId?: string;
}
export const DescribeMountTargetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
    Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
    FileSystemId: S.optional(S.String).pipe(T.HttpQuery("FileSystemId")),
    MountTargetId: S.optional(S.String).pipe(T.HttpQuery("MountTargetId")),
    AccessPointId: S.optional(S.String).pipe(T.HttpQuery("AccessPointId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2015-02-01/mount-targets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeMountTargetsRequest",
}) as any as S.Schema<DescribeMountTargetsRequest>;
export type MountTargetDescriptions = MountTargetDescription[];
export const MountTargetDescriptions = /*@__PURE__*/ S.Array(
  MountTargetDescription,
);
export interface DescribeMountTargetsResponse {
  Marker?: string;
  MountTargets?: MountTargetDescription[];
  NextMarker?: string;
}
export const DescribeMountTargetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    MountTargets: S.optional(MountTargetDescriptions),
    NextMarker: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeMountTargetsResponse",
}) as any as S.Schema<DescribeMountTargetsResponse>;
export interface DescribeMountTargetSecurityGroupsRequest {
  MountTargetId: string;
}
export const DescribeMountTargetSecurityGroupsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MountTargetId: S.String.pipe(T.HttpLabel("MountTargetId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/2015-02-01/mount-targets/{MountTargetId}/security-groups",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeMountTargetSecurityGroupsRequest",
}) as any as S.Schema<DescribeMountTargetSecurityGroupsRequest>;
export interface DescribeMountTargetSecurityGroupsResponse {
  SecurityGroups: string[];
}
export const DescribeMountTargetSecurityGroupsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ SecurityGroups: SecurityGroups }),
  ).annotate({
    identifier: "DescribeMountTargetSecurityGroupsResponse",
  }) as any as S.Schema<DescribeMountTargetSecurityGroupsResponse>;
export interface DescribeReplicationConfigurationsRequest {
  FileSystemId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeReplicationConfigurationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FileSystemId: S.optional(S.String).pipe(T.HttpQuery("FileSystemId")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/2015-02-01/file-systems/replication-configurations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeReplicationConfigurationsRequest",
}) as any as S.Schema<DescribeReplicationConfigurationsRequest>;
export type ReplicationConfigurationDescriptions =
  ReplicationConfigurationDescription[];
export const ReplicationConfigurationDescriptions = /*@__PURE__*/ S.Array(
  ReplicationConfigurationDescription,
);
export interface DescribeReplicationConfigurationsResponse {
  Replications?: ReplicationConfigurationDescription[];
  NextToken?: string;
}
export const DescribeReplicationConfigurationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Replications: S.optional(ReplicationConfigurationDescriptions),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "DescribeReplicationConfigurationsResponse",
  }) as any as S.Schema<DescribeReplicationConfigurationsResponse>;
export interface DescribeTagsRequest {
  MaxItems?: number;
  Marker?: string;
  FileSystemId: string;
}
export const DescribeTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
    Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
    FileSystemId: S.String.pipe(T.HttpLabel("FileSystemId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2015-02-01/tags/{FileSystemId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeTagsRequest",
}) as any as S.Schema<DescribeTagsRequest>;
export interface DescribeTagsResponse {
  Marker?: string;
  Tags: Tag[];
  NextMarker?: string;
}
export const DescribeTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    Tags: Tags,
    NextMarker: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeTagsResponse",
}) as any as S.Schema<DescribeTagsResponse>;
export type ResourceId = string;
export interface ListTagsForResourceRequest {
  ResourceId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.String.pipe(T.HttpLabel("ResourceId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2015-02-01/resource-tags/{ResourceId}" }),
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
  Tags?: Tag[];
  NextToken?: string;
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(Tags), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ModifyMountTargetSecurityGroupsRequest {
  MountTargetId: string;
  SecurityGroups?: string[];
}
export const ModifyMountTargetSecurityGroupsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MountTargetId: S.String.pipe(T.HttpLabel("MountTargetId")),
      SecurityGroups: S.optional(SecurityGroups),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/2015-02-01/mount-targets/{MountTargetId}/security-groups",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ModifyMountTargetSecurityGroupsRequest",
}) as any as S.Schema<ModifyMountTargetSecurityGroupsRequest>;
export interface ModifyMountTargetSecurityGroupsResponse {}
export const ModifyMountTargetSecurityGroupsResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "ModifyMountTargetSecurityGroupsResponse",
}) as any as S.Schema<ModifyMountTargetSecurityGroupsResponse>;
export interface PutAccountPreferencesRequest {
  ResourceIdType: ResourceIdType;
}
export const PutAccountPreferencesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceIdType: ResourceIdType }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/2015-02-01/account-preferences" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutAccountPreferencesRequest",
}) as any as S.Schema<PutAccountPreferencesRequest>;
export interface PutAccountPreferencesResponse {
  ResourceIdPreference?: ResourceIdPreference;
}
export const PutAccountPreferencesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceIdPreference: S.optional(ResourceIdPreference) }),
).annotate({
  identifier: "PutAccountPreferencesResponse",
}) as any as S.Schema<PutAccountPreferencesResponse>;
export interface PutBackupPolicyRequest {
  FileSystemId: string;
  BackupPolicy: BackupPolicy;
}
export const PutBackupPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileSystemId: S.String.pipe(T.HttpLabel("FileSystemId")),
    BackupPolicy: BackupPolicy,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2015-02-01/file-systems/{FileSystemId}/backup-policy",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutBackupPolicyRequest",
}) as any as S.Schema<PutBackupPolicyRequest>;
export type BypassPolicyLockoutSafetyCheck = boolean;
export interface PutFileSystemPolicyRequest {
  FileSystemId: string;
  Policy: string;
  BypassPolicyLockoutSafetyCheck?: boolean;
}
export const PutFileSystemPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileSystemId: S.String.pipe(T.HttpLabel("FileSystemId")),
    Policy: S.String,
    BypassPolicyLockoutSafetyCheck: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2015-02-01/file-systems/{FileSystemId}/policy",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutFileSystemPolicyRequest",
}) as any as S.Schema<PutFileSystemPolicyRequest>;
export interface PutLifecycleConfigurationRequest {
  FileSystemId: string;
  LifecyclePolicies: LifecyclePolicy[];
}
export const PutLifecycleConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileSystemId: S.String.pipe(T.HttpLabel("FileSystemId")),
    LifecyclePolicies: LifecyclePolicies,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2015-02-01/file-systems/{FileSystemId}/lifecycle-configuration",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutLifecycleConfigurationRequest",
}) as any as S.Schema<PutLifecycleConfigurationRequest>;
export interface TagResourceRequest {
  ResourceId: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.String.pipe(T.HttpLabel("ResourceId")),
    Tags: Tags,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2015-02-01/resource-tags/{ResourceId}" }),
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
export interface UntagResourceRequest {
  ResourceId: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.String.pipe(T.HttpLabel("ResourceId")),
    TagKeys: TagKeys.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2015-02-01/resource-tags/{ResourceId}",
      }),
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
export interface UpdateFileSystemRequest {
  FileSystemId: string;
  ThroughputMode?: ThroughputMode;
  ProvisionedThroughputInMibps?: number;
}
export const UpdateFileSystemRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileSystemId: S.String.pipe(T.HttpLabel("FileSystemId")),
    ThroughputMode: S.optional(ThroughputMode),
    ProvisionedThroughputInMibps: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/2015-02-01/file-systems/{FileSystemId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFileSystemRequest",
}) as any as S.Schema<UpdateFileSystemRequest>;
export interface UpdateFileSystemProtectionRequest {
  FileSystemId: string;
  ReplicationOverwriteProtection?: ReplicationOverwriteProtection;
}
export const UpdateFileSystemProtectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileSystemId: S.String.pipe(T.HttpLabel("FileSystemId")),
    ReplicationOverwriteProtection: S.optional(ReplicationOverwriteProtection),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2015-02-01/file-systems/{FileSystemId}/protection",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFileSystemProtectionRequest",
}) as any as S.Schema<UpdateFileSystemProtectionRequest>;
export type ErrorCode = string;
export type ErrorMessage = string;
export type CreateAccessPointError =
  | AccessPointAlreadyExists
  | AccessPointLimitExceeded
  | BadRequest
  | FileSystemNotFound
  | IncorrectFileSystemLifeCycleState
  | InternalServerError
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an EFS access point. An access point is an application-specific view
 * into an EFS file system that applies an operating system user and group, and a file
 * system path, to any file system request made through the access point. The operating system
 * user and group override any identity information provided by the NFS client. The file system
 * path is exposed as the access point's root directory. Applications using the access point can
 * only access data in the application's own directory and any subdirectories. A file system can
 * have a maximum of 10,000 access points unless you request an increase. To learn more, see
 * Mounting a file
 * system using EFS access points.
 *
 * If multiple requests to create access points on the same file system are sent in quick
 * succession, and the file system is near the limit of access points, you may experience a
 * throttling response for these requests. This is to ensure that the file system does not
 * exceed the stated access point limit.
 *
 * This operation requires permissions for the `elasticfilesystem:CreateAccessPoint` action.
 *
 * Access points can be tagged on creation. If tags are specified in the creation action, IAM
 * performs additional authorization on the `elasticfilesystem:TagResource` action to
 * verify if users have permissions to create tags. Therefore, you must grant explicit
 * permissions to use the `elasticfilesystem:TagResource` action. For more
 * information, see Granting
 * permissions to tag resources during creation.
 */
export const createAccessPoint: API.OperationMethod<
  CreateAccessPointRequest,
  AccessPointDescription,
  CreateAccessPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAccessPointRequest,
  output: AccessPointDescription,
  errors: [
    AccessPointAlreadyExists,
    AccessPointLimitExceeded,
    BadRequest,
    FileSystemNotFound,
    IncorrectFileSystemLifeCycleState,
    InternalServerError,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessPoint",
}));

export type CreateFileSystemError =
  | BadRequest
  | FileSystemAlreadyExists
  | FileSystemLimitExceeded
  | InsufficientThroughputCapacity
  | InternalServerError
  | ThroughputLimitExceeded
  | UnsupportedAvailabilityZone
  | CommonErrors;
/**
 * Creates a new, empty file system. The operation requires a creation token in the
 * request that Amazon EFS uses to ensure idempotent creation (calling the operation with same
 * creation token has no effect). If a file system does not currently exist that is owned by the
 * caller's Amazon Web Services account with the specified creation token, this operation does the
 * following:
 *
 * - Creates a new, empty file system. The file system will have an Amazon EFS assigned
 * ID, and an initial lifecycle state `creating`.
 *
 * - Returns with the description of the created file system.
 *
 * Otherwise, this operation returns a `FileSystemAlreadyExists` error with the
 * ID of the existing file system.
 *
 * For basic use cases, you can use a randomly generated UUID for the creation
 * token.
 *
 * The idempotent operation allows you to retry a `CreateFileSystem` call without
 * risk of creating an extra file system. This can happen when an initial call fails in a way
 * that leaves it uncertain whether or not a file system was actually created. An example might
 * be that a transport level timeout occurred or your connection was reset. As long as you use
 * the same creation token, if the initial call had succeeded in creating a file system, the
 * client can learn of its existence from the `FileSystemAlreadyExists` error.
 *
 * For more information, see
 * Creating a file system
 * in the *Amazon EFS User Guide*.
 *
 * The `CreateFileSystem` call returns while the file system's lifecycle
 * state is still `creating`. You can check the file system creation status by
 * calling the DescribeFileSystems operation, which among other things returns the file
 * system state.
 *
 * This operation accepts an optional `PerformanceMode` parameter that you choose
 * for your file system. We recommend `generalPurpose`
 * `PerformanceMode` for all file
 * systems. The `maxIO` mode is a previous generation performance type that is designed for highly parallelized workloads that can tolerate higher latencies
 * than the `generalPurpose` mode. `MaxIO` mode is not supported for One Zone file systems or
 * file systems that use Elastic throughput.
 *
 * The `PerformanceMode` can't be changed after the file system has been
 * created. For more information, see Amazon EFS performance
 * modes.
 *
 * You can set the throughput mode for the file system using the `ThroughputMode`
 * parameter.
 *
 * After the file system is fully created, Amazon EFS sets its lifecycle state to
 * `available`, at which point you can create one or more mount targets for the file
 * system in your VPC. For more information, see CreateMountTarget. You mount
 * your Amazon EFS file system on an EC2 instances in your VPC by using the mount
 * target. For more information, see Amazon EFS: How it Works.
 *
 * This operation requires permissions for the
 * `elasticfilesystem:CreateFileSystem` action.
 *
 * File systems can be tagged on creation. If tags are specified in the creation action, IAM
 * performs additional authorization on the `elasticfilesystem:TagResource` action to
 * verify if users have permissions to create tags. Therefore, you must grant explicit
 * permissions to use the `elasticfilesystem:TagResource` action. For more
 * information, see Granting permissions to tag resources during creation.
 */
export const createFileSystem: API.OperationMethod<
  CreateFileSystemRequest,
  FileSystemDescription,
  CreateFileSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFileSystemRequest,
  output: FileSystemDescription,
  errors: [
    BadRequest,
    FileSystemAlreadyExists,
    FileSystemLimitExceeded,
    InsufficientThroughputCapacity,
    InternalServerError,
    ThroughputLimitExceeded,
    UnsupportedAvailabilityZone,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFileSystem",
}));

export type CreateMountTargetError =
  | AvailabilityZonesMismatch
  | BadRequest
  | FileSystemNotFound
  | IncorrectFileSystemLifeCycleState
  | InternalServerError
  | IpAddressInUse
  | MountTargetConflict
  | NetworkInterfaceLimitExceeded
  | NoFreeAddressesInSubnet
  | SecurityGroupLimitExceeded
  | SecurityGroupNotFound
  | SubnetNotFound
  | UnsupportedAvailabilityZone
  | CommonErrors;
/**
 * Creates a mount target for a file system. You can then mount the file system on EC2
 * instances by using the mount target.
 *
 * You can create one mount target in each Availability Zone in your VPC. All EC2 instances
 * in a VPC within a given Availability Zone share a single mount target for a given file system. If
 * you have multiple subnets in an Availability Zone, you create a mount target in one of the subnets.
 * EC2 instances do not need to be in the same subnet as the mount target in order to
 * access their file system.
 *
 * You can create only one mount target for a One Zone file system. You must
 * create that mount target in the same Availability Zone in which the file system is located. Use the
 * `AvailabilityZoneName` and `AvailabiltyZoneId` properties in the DescribeFileSystems response object to get this information. Use the
 * `subnetId` associated with the file system's Availability Zone when creating the mount
 * target.
 *
 * For more information, see Amazon EFS: How it Works.
 *
 * To create a mount target for a file system, the file system's lifecycle state must be
 * `available`. For more information, see DescribeFileSystems.
 *
 * In the request, provide the following:
 *
 * - The file system ID for which you are creating the mount
 * target.
 *
 * - A subnet ID, which determines the following:
 *
 * - The VPC in which Amazon EFS creates the mount target
 *
 * - The Availability Zone in which Amazon EFS creates the mount target
 *
 * - The IP address range from which Amazon EFS selects the IP address of the mount target
 * (if you don't specify an IP address in the request)
 *
 * After creating the mount target, Amazon EFS returns a response that includes, a
 * `MountTargetId` and an `IpAddress`. You use this IP address when
 * mounting the file system in an EC2 instance. You can also use the mount target's
 * DNS name when mounting the file system. The EC2 instance on which you mount the file
 * system by using the mount target can resolve the mount target's DNS name to its IP
 * address. For more information, see How it Works:
 * Implementation Overview.
 *
 * Note that you can create mount targets for a file system in only one VPC, and there can be
 * only one mount target per Availability Zone. That is, if the file system already has one or more
 * mount targets created for it, the subnet specified in the request to add another mount target
 * must meet the following requirements:
 *
 * - Must belong to the same VPC as the subnets of the existing mount targets
 *
 * - Must not be in the same Availability Zone as any of the subnets of the existing mount
 * targets
 *
 * If the request satisfies the requirements, Amazon EFS does the following:
 *
 * - Creates a new mount target in the specified subnet.
 *
 * - Also creates a new network interface in the subnet as follows:
 *
 * - If the request provides an `IpAddress`, Amazon EFS assigns that
 * IP address to the network interface. Otherwise, Amazon EFS assigns a free
 * address in the subnet (in the same way that the Amazon EC2
 * `CreateNetworkInterface` call does when a request does not specify a
 * primary private IP address).
 *
 * - If the request provides `SecurityGroups`, this network interface is
 * associated with those security groups. Otherwise, it belongs to the default security
 * group for the subnet's VPC.
 *
 * - Assigns the description Mount target *fsmt-id* for
 * file system *fs-id*
 * where
 * *fsmt-id*
 * is the mount target ID, and
 * *fs-id*
 * is the `FileSystemId`.
 *
 * - Sets the `requesterManaged` property of the network interface to
 * `true`, and the `requesterId` value to
 * `EFS`.
 *
 * Each Amazon EFS mount target has one corresponding requester-managed
 * EC2 network interface. After the network interface is created, Amazon EFS
 * sets the `NetworkInterfaceId` field in the mount target's description to
 * the network interface ID, and the `IpAddress` field to its address. If network
 * interface creation fails, the entire `CreateMountTarget` operation
 * fails.
 *
 * The `CreateMountTarget` call returns only after creating the network
 * interface, but while the mount target state is still `creating`, you can check
 * the mount target creation status by calling the DescribeMountTargets operation, which among other things returns the mount
 * target state.
 *
 * We recommend that you create a mount target in each of the Availability Zones. There are cost
 * considerations for using a file system in an Availability Zone through a mount target created in
 * another Availability Zone. For more information, see Amazon EFS pricing. In addition, by always using a mount target local to the
 * instance's Availability Zone, you eliminate a partial failure scenario. If the Availability Zone in
 * which your mount target is created goes down, then you can't access your file system
 * through that mount target.
 *
 * This operation requires permissions for the following action on the file
 * system:
 *
 * - `elasticfilesystem:CreateMountTarget`
 *
 * This operation also requires permissions for the following Amazon EC2
 * actions:
 *
 * - `ec2:DescribeSubnets`
 *
 * - `ec2:DescribeNetworkInterfaces`
 *
 * - `ec2:CreateNetworkInterface`
 */
export const createMountTarget: API.OperationMethod<
  CreateMountTargetRequest,
  MountTargetDescription,
  CreateMountTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMountTargetRequest,
  output: MountTargetDescription,
  errors: [
    AvailabilityZonesMismatch,
    BadRequest,
    FileSystemNotFound,
    IncorrectFileSystemLifeCycleState,
    InternalServerError,
    IpAddressInUse,
    MountTargetConflict,
    NetworkInterfaceLimitExceeded,
    NoFreeAddressesInSubnet,
    SecurityGroupLimitExceeded,
    SecurityGroupNotFound,
    SubnetNotFound,
    UnsupportedAvailabilityZone,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMountTarget",
}));

export type CreateReplicationConfigurationError =
  | BadRequest
  | ConflictException
  | FileSystemLimitExceeded
  | FileSystemNotFound
  | IncorrectFileSystemLifeCycleState
  | InsufficientThroughputCapacity
  | InternalServerError
  | ReplicationNotFound
  | ThroughputLimitExceeded
  | UnsupportedAvailabilityZone
  | ValidationException
  | CommonErrors;
/**
 * Creates a replication conﬁguration to either a new or existing EFS file system.
 * For more information, see Amazon EFS replication in the Amazon EFS User
 * Guide. The replication configuration specifies the following:
 *
 * - **Source file system** – The EFS file
 * system that you want to replicate.
 *
 * - **Destination file system** – The destination file
 * system to which the source file system is replicated. There can only be one destination
 * file system in a replication configuration.
 *
 * A file system can be part of only one replication configuration.
 *
 * The destination parameters for the replication configuration depend on
 * whether you are replicating to a new file system or to an existing file system, and if you
 * are replicating across Amazon Web Services accounts. See DestinationToCreate for more information.
 *
 * This operation requires permissions for the `elasticfilesystem:CreateReplicationConfiguration`
 * action. Additionally, other permissions are required depending on how you are replicating file systems.
 * For more information, see Required permissions for replication
 * in the Amazon EFS User
 * Guide.
 */
export const createReplicationConfiguration: API.OperationMethod<
  CreateReplicationConfigurationRequest,
  ReplicationConfigurationDescription,
  CreateReplicationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateReplicationConfigurationRequest,
  output: ReplicationConfigurationDescription,
  errors: [
    BadRequest,
    ConflictException,
    FileSystemLimitExceeded,
    FileSystemNotFound,
    IncorrectFileSystemLifeCycleState,
    InsufficientThroughputCapacity,
    InternalServerError,
    ReplicationNotFound,
    ThroughputLimitExceeded,
    UnsupportedAvailabilityZone,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReplicationConfiguration",
}));

export type CreateTagsError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * DEPRECATED - `CreateTags` is deprecated and not maintained. To create tags for EFS
 * resources, use the API action.
 *
 * Creates or overwrites tags associated with a file system. Each tag is a key-value pair. If
 * a tag key specified in the request already exists on the file system, this operation
 * overwrites its value with the value provided in the request. If you add the `Name`
 * tag to your file system, Amazon EFS returns it in the response to the DescribeFileSystems operation.
 *
 * This operation requires permission for the `elasticfilesystem:CreateTags`
 * action.
 */
export const createTags: API.OperationMethod<
  CreateTagsRequest,
  CreateTagsResponse,
  CreateTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTagsRequest,
  output: CreateTagsResponse,
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTags",
}));

export type DeleteAccessPointError =
  | AccessPointNotFound
  | BadRequest
  | InternalServerError
  | CommonErrors;
/**
 * Deletes the specified access point. After deletion is complete, new clients can no
 * longer connect to the access points. Clients connected to the access point at the time of
 * deletion will continue to function until they terminate their connection.
 *
 * This operation requires permissions for the `elasticfilesystem:DeleteAccessPoint` action.
 */
export const deleteAccessPoint: API.OperationMethod<
  DeleteAccessPointRequest,
  DeleteAccessPointResponse,
  DeleteAccessPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccessPointRequest,
  output: DeleteAccessPointResponse,
  errors: [AccessPointNotFound, BadRequest, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessPoint",
}));

export type DeleteFileSystemError =
  | BadRequest
  | FileSystemInUse
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Deletes a file system, permanently severing access to its contents. Upon return, the
 * file system no longer exists and you can't access any contents of the deleted file
 * system.
 *
 * You need to manually delete mount targets attached to a file system before you can delete
 * an EFS file system. This step is performed for you when you use the Amazon Web Services console
 * to delete a file system.
 *
 * You cannot delete a file system that is part of an EFS replication configuration.
 * You need to delete the replication configuration first.
 *
 * You can't delete a file system that is in use. That is, if the file system has
 * any mount targets, you must first delete them. For more information, see DescribeMountTargets and DeleteMountTarget.
 *
 * The `DeleteFileSystem` call returns while the file system state is still
 * `deleting`. You can check the file system deletion status by calling the DescribeFileSystems operation, which returns a list of file systems in your
 * account. If you pass file system ID or creation token for the deleted file system, the DescribeFileSystems returns a `404 FileSystemNotFound`
 * error.
 *
 * This operation requires permissions for the
 * `elasticfilesystem:DeleteFileSystem` action.
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
    FileSystemInUse,
    FileSystemNotFound,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFileSystem",
}));

export type DeleteFileSystemPolicyError =
  | BadRequest
  | FileSystemNotFound
  | IncorrectFileSystemLifeCycleState
  | InternalServerError
  | CommonErrors;
/**
 * Deletes the `FileSystemPolicy` for the specified file system.
 * The default `FileSystemPolicy` goes into effect once the existing policy is deleted.
 * For more information about the default file system policy, see Using Resource-based Policies with EFS.
 *
 * This operation requires permissions for the `elasticfilesystem:DeleteFileSystemPolicy` action.
 */
export const deleteFileSystemPolicy: API.OperationMethod<
  DeleteFileSystemPolicyRequest,
  DeleteFileSystemPolicyResponse,
  DeleteFileSystemPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFileSystemPolicyRequest,
  output: DeleteFileSystemPolicyResponse,
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncorrectFileSystemLifeCycleState,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFileSystemPolicy",
}));

export type DeleteMountTargetError =
  | BadRequest
  | DependencyTimeout
  | InternalServerError
  | MountTargetNotFound
  | CommonErrors;
/**
 * Deletes the specified mount target.
 *
 * This operation forcibly breaks any mounts of the file system by using the mount target
 * that is being deleted, which might disrupt instances or applications using those mounts. To
 * avoid applications getting cut off abruptly, you might consider unmounting any mounts of the
 * mount target, if feasible. The operation also deletes the associated network interface.
 * Uncommitted writes might be lost, but breaking a mount target using this operation does not
 * corrupt the file system itself. The file system you created remains. You can mount an
 * EC2 instance in your VPC by using another mount target.
 *
 * This operation requires permissions for the following action on the file
 * system:
 *
 * - `elasticfilesystem:DeleteMountTarget`
 *
 * The `DeleteMountTarget` call returns while the mount target state is still
 * `deleting`. You can check the mount target deletion by calling the DescribeMountTargets operation, which returns a list of mount target
 * descriptions for the given file system.
 *
 * The operation also requires permissions for the following Amazon EC2 action on the
 * mount target's network interface:
 *
 * - `ec2:DeleteNetworkInterface`
 */
export const deleteMountTarget: API.OperationMethod<
  DeleteMountTargetRequest,
  DeleteMountTargetResponse,
  DeleteMountTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMountTargetRequest,
  output: DeleteMountTargetResponse,
  errors: [
    BadRequest,
    DependencyTimeout,
    InternalServerError,
    MountTargetNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMountTarget",
}));

export type DeleteReplicationConfigurationError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | ReplicationNotFound
  | CommonErrors;
/**
 * Deletes a replication configuration. Deleting a replication configuration ends the
 * replication process. After a replication configuration is deleted, the destination file system
 * becomes `Writeable` and its replication overwrite protection is re-enabled. For
 * more information, see Delete a replication configuration.
 *
 * This operation requires permissions for the
 * `elasticfilesystem:DeleteReplicationConfiguration` action.
 */
export const deleteReplicationConfiguration: API.OperationMethod<
  DeleteReplicationConfigurationRequest,
  DeleteReplicationConfigurationResponse,
  DeleteReplicationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteReplicationConfigurationRequest,
  output: DeleteReplicationConfigurationResponse,
  errors: [
    BadRequest,
    FileSystemNotFound,
    InternalServerError,
    ReplicationNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReplicationConfiguration",
}));

export type DeleteTagsError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * DEPRECATED - `DeleteTags` is deprecated and not maintained. To remove tags from EFS
 * resources, use the API action.
 *
 * Deletes the specified tags from a file system. If the `DeleteTags` request
 * includes a tag key that doesn't exist, Amazon EFS ignores it and doesn't cause an
 * error. For more information about tags and related restrictions, see Tag restrictions in the
 * *Billing and Cost Management User Guide*.
 *
 * This operation requires permissions for the `elasticfilesystem:DeleteTags`
 * action.
 */
export const deleteTags: API.OperationMethod<
  DeleteTagsRequest,
  DeleteTagsResponse,
  DeleteTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTagsRequest,
  output: DeleteTagsResponse,
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTags",
}));

export type DescribeAccessPointsError =
  | AccessPointNotFound
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Returns the description of a specific Amazon EFS access point if the
 * `AccessPointId` is provided. If you provide an EFS
 * `FileSystemId`, it returns descriptions of all access points for that file
 * system. You can provide either an `AccessPointId` or a `FileSystemId` in
 * the request, but not both.
 *
 * This operation requires permissions for the `elasticfilesystem:DescribeAccessPoints` action.
 */
export const describeAccessPoints: API.PaginatedOperationMethod<
  DescribeAccessPointsRequest,
  DescribeAccessPointsResponse,
  DescribeAccessPointsError,
  Credentials | HttpClient.HttpClient,
  AccessPointDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeAccessPointsRequest,
  output: DescribeAccessPointsResponse,
  errors: [
    AccessPointNotFound,
    BadRequest,
    FileSystemNotFound,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccessPoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AccessPoints",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeAccountPreferencesError =
  | InternalServerError
  | CommonErrors;
/**
 * Returns the account preferences settings for the Amazon Web Services account associated with the user making the request, in the current Amazon Web Services Region.
 */
export const describeAccountPreferences: API.OperationMethod<
  DescribeAccountPreferencesRequest,
  DescribeAccountPreferencesResponse,
  DescribeAccountPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAccountPreferencesRequest,
  output: DescribeAccountPreferencesResponse,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountPreferences",
}));

export type DescribeBackupPolicyError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | PolicyNotFound
  | ValidationException
  | CommonErrors;
/**
 * Returns the backup policy for the specified EFS file system.
 */
export const describeBackupPolicy: API.OperationMethod<
  DescribeBackupPolicyRequest,
  BackupPolicyDescription,
  DescribeBackupPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeBackupPolicyRequest,
  output: BackupPolicyDescription,
  errors: [
    BadRequest,
    FileSystemNotFound,
    InternalServerError,
    PolicyNotFound,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBackupPolicy",
}));

export type DescribeFileSystemPolicyError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | PolicyNotFound
  | CommonErrors;
/**
 * Returns the `FileSystemPolicy` for the specified EFS file
 * system.
 *
 * This operation requires permissions for the `elasticfilesystem:DescribeFileSystemPolicy` action.
 */
export const describeFileSystemPolicy: API.OperationMethod<
  DescribeFileSystemPolicyRequest,
  FileSystemPolicyDescription,
  DescribeFileSystemPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeFileSystemPolicyRequest,
  output: FileSystemPolicyDescription,
  errors: [BadRequest, FileSystemNotFound, InternalServerError, PolicyNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFileSystemPolicy",
}));

export type DescribeFileSystemsError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Returns the description of a specific Amazon EFS file system if either the file system
 * `CreationToken` or the `FileSystemId` is provided. Otherwise, it
 * returns descriptions of all file systems owned by the caller's Amazon Web Services account in the
 * Amazon Web Services Region of the endpoint that you're calling.
 *
 * When retrieving all file system descriptions, you can optionally specify the
 * `MaxItems` parameter to limit the number of descriptions in a response.
 * This number is automatically set to 100. If more file system descriptions remain,
 * Amazon EFS returns a `NextMarker`, an opaque token, in the response. In this case,
 * you should send a subsequent request with the `Marker` request parameter set to the
 * value of `NextMarker`.
 *
 * To retrieve a list of your file system descriptions, this operation is used in an
 * iterative process, where `DescribeFileSystems` is called first without the
 * `Marker` and then the operation continues to call it with the `Marker`
 * parameter set to the value of the `NextMarker` from the previous response until the
 * response has no `NextMarker`.
 *
 * The order of file systems returned in the response of one
 * `DescribeFileSystems` call and the order of file systems returned across the
 * responses of a multi-call iteration is unspecified.
 *
 * This operation requires permissions for the
 * `elasticfilesystem:DescribeFileSystems` action.
 */
export const describeFileSystems: API.PaginatedOperationMethod<
  DescribeFileSystemsRequest,
  DescribeFileSystemsResponse,
  DescribeFileSystemsError,
  Credentials | HttpClient.HttpClient,
  FileSystemDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeFileSystemsRequest,
  output: DescribeFileSystemsResponse,
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFileSystems",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "FileSystems",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type DescribeLifecycleConfigurationError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Returns the current `LifecycleConfiguration` object for the specified
 * EFS file system. Lifecycle management uses the `LifecycleConfiguration`
 * object to identify when to move files between storage classes. For a file system without a
 * `LifecycleConfiguration` object, the call returns an empty array in the
 * response.
 *
 * This operation requires permissions for the
 * `elasticfilesystem:DescribeLifecycleConfiguration` operation.
 */
export const describeLifecycleConfiguration: API.OperationMethod<
  DescribeLifecycleConfigurationRequest,
  LifecycleConfigurationDescription,
  DescribeLifecycleConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeLifecycleConfigurationRequest,
  output: LifecycleConfigurationDescription,
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLifecycleConfiguration",
}));

export type DescribeMountTargetsError =
  | AccessPointNotFound
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | MountTargetNotFound
  | CommonErrors;
/**
 * Returns the descriptions of all the current mount targets, or a specific mount target,
 * for a file system. When requesting all of the current mount targets, the order of mount
 * targets returned in the response is unspecified.
 *
 * This operation requires permissions for the
 * `elasticfilesystem:DescribeMountTargets` action, on either the file system ID
 * that you specify in `FileSystemId`, or on the file system of the mount target that
 * you specify in `MountTargetId`.
 */
export const describeMountTargets: API.PaginatedOperationMethod<
  DescribeMountTargetsRequest,
  DescribeMountTargetsResponse,
  DescribeMountTargetsError,
  Credentials | HttpClient.HttpClient,
  MountTargetDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeMountTargetsRequest,
  output: DescribeMountTargetsResponse,
  errors: [
    AccessPointNotFound,
    BadRequest,
    FileSystemNotFound,
    InternalServerError,
    MountTargetNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMountTargets",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "MountTargets",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type DescribeMountTargetSecurityGroupsError =
  | BadRequest
  | IncorrectMountTargetState
  | InternalServerError
  | MountTargetNotFound
  | CommonErrors;
/**
 * Returns the security groups currently in effect for a mount target. This operation
 * requires that the network interface of the mount target has been created and the lifecycle
 * state of the mount target is not `deleted`.
 *
 * This operation requires permissions for the following actions:
 *
 * - `elasticfilesystem:DescribeMountTargetSecurityGroups` action on the mount
 * target's file system.
 *
 * - `ec2:DescribeNetworkInterfaceAttribute` action on the mount target's
 * network interface.
 */
export const describeMountTargetSecurityGroups: API.OperationMethod<
  DescribeMountTargetSecurityGroupsRequest,
  DescribeMountTargetSecurityGroupsResponse,
  DescribeMountTargetSecurityGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeMountTargetSecurityGroupsRequest,
  output: DescribeMountTargetSecurityGroupsResponse,
  errors: [
    BadRequest,
    IncorrectMountTargetState,
    InternalServerError,
    MountTargetNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMountTargetSecurityGroups",
}));

export type DescribeReplicationConfigurationsError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | ReplicationNotFound
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the replication configuration for a specific file system. If a file system is
 * not specified, all of the replication configurations for the Amazon Web Services account in an
 * Amazon Web Services Region are retrieved.
 */
export const describeReplicationConfigurations: API.PaginatedOperationMethod<
  DescribeReplicationConfigurationsRequest,
  DescribeReplicationConfigurationsResponse,
  DescribeReplicationConfigurationsError,
  Credentials | HttpClient.HttpClient,
  ReplicationConfigurationDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeReplicationConfigurationsRequest,
  output: DescribeReplicationConfigurationsResponse,
  errors: [
    BadRequest,
    FileSystemNotFound,
    InternalServerError,
    ReplicationNotFound,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplicationConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Replications",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeTagsError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * DEPRECATED - The `DescribeTags` action is deprecated and not maintained. To view
 * tags associated with EFS resources, use the `ListTagsForResource` API
 * action.
 *
 * Returns the tags associated with a file system. The order of tags returned in the
 * response of one `DescribeTags` call and the order of tags returned across the
 * responses of a multiple-call iteration (when using pagination) is unspecified.
 *
 * This operation requires permissions for the
 * `elasticfilesystem:DescribeTags` action.
 */
export const describeTags: API.PaginatedOperationMethod<
  DescribeTagsRequest,
  DescribeTagsResponse,
  DescribeTagsError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeTagsRequest,
  output: DescribeTagsResponse,
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTags",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Tags",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessPointNotFound
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Lists all tags for a top-level EFS resource. You must provide the ID of the
 * resource that you want to retrieve the tags for.
 *
 * This operation requires permissions for the `elasticfilesystem:DescribeAccessPoints` action.
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
    AccessPointNotFound,
    BadRequest,
    FileSystemNotFound,
    InternalServerError,
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

export type ModifyMountTargetSecurityGroupsError =
  | BadRequest
  | IncorrectMountTargetState
  | InternalServerError
  | MountTargetNotFound
  | SecurityGroupLimitExceeded
  | SecurityGroupNotFound
  | CommonErrors;
/**
 * Modifies the set of security groups in effect for a mount target.
 *
 * When you create a mount target, Amazon EFS also creates a new network interface. For
 * more information, see CreateMountTarget. This operation replaces the security groups in effect for the
 * network interface associated with a mount target, with the `SecurityGroups`
 * provided in the request. This operation requires that the network interface of the mount
 * target has been created and the lifecycle state of the mount target is not
 * `deleted`.
 *
 * The operation requires permissions for the following actions:
 *
 * - `elasticfilesystem:ModifyMountTargetSecurityGroups` action on the mount
 * target's file system.
 *
 * - `ec2:ModifyNetworkInterfaceAttribute` action on the mount target's network
 * interface.
 */
export const modifyMountTargetSecurityGroups: API.OperationMethod<
  ModifyMountTargetSecurityGroupsRequest,
  ModifyMountTargetSecurityGroupsResponse,
  ModifyMountTargetSecurityGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyMountTargetSecurityGroupsRequest,
  output: ModifyMountTargetSecurityGroupsResponse,
  errors: [
    BadRequest,
    IncorrectMountTargetState,
    InternalServerError,
    MountTargetNotFound,
    SecurityGroupLimitExceeded,
    SecurityGroupNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyMountTargetSecurityGroups",
}));

export type PutAccountPreferencesError =
  | BadRequest
  | InternalServerError
  | CommonErrors;
/**
 * Use this operation to set the account preference in the current Amazon Web Services Region
 * to use long 17 character (63 bit) or short 8 character (32 bit) resource IDs for new
 * EFS file system and mount target resources. All existing resource IDs are not
 * affected by any changes you make. You can set the ID preference during the opt-in period as
 * EFS transitions to long resource IDs. For more information, see Managing Amazon EFS resource IDs.
 *
 * Starting in October, 2021, you will receive an error if you try to set the account preference
 * to use the short 8 character format resource ID. Contact Amazon Web Services support if you
 * receive an error and must use short IDs for file system and mount target resources.
 */
export const putAccountPreferences: API.OperationMethod<
  PutAccountPreferencesRequest,
  PutAccountPreferencesResponse,
  PutAccountPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAccountPreferencesRequest,
  output: PutAccountPreferencesResponse,
  errors: [BadRequest, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountPreferences",
}));

export type PutBackupPolicyError =
  | BadRequest
  | FileSystemNotFound
  | IncorrectFileSystemLifeCycleState
  | InternalServerError
  | ValidationException
  | CommonErrors;
/**
 * Updates the file system's backup policy. Use this action to start or stop automatic backups of the file system.
 */
export const putBackupPolicy: API.OperationMethod<
  PutBackupPolicyRequest,
  BackupPolicyDescription,
  PutBackupPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutBackupPolicyRequest,
  output: BackupPolicyDescription,
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncorrectFileSystemLifeCycleState,
    InternalServerError,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBackupPolicy",
}));

export type PutFileSystemPolicyError =
  | BadRequest
  | FileSystemNotFound
  | IncorrectFileSystemLifeCycleState
  | InternalServerError
  | InvalidPolicyException
  | CommonErrors;
/**
 * Applies an Amazon EFS
 * `FileSystemPolicy` to an Amazon EFS file system. A file system policy is an
 * IAM resource-based policy and can contain multiple policy statements. A file system always has
 * exactly one file system policy, which can be the default policy or an explicit policy set or
 * updated using this API operation. EFS file system policies have a 20,000 character
 * limit. When an explicit policy is set, it overrides the default policy. For more information
 * about the default file system policy, see
 * Default EFS file system policy.
 *
 * EFS file system policies have a 20,000 character limit.
 *
 * This operation requires permissions for the `elasticfilesystem:PutFileSystemPolicy` action.
 */
export const putFileSystemPolicy: API.OperationMethod<
  PutFileSystemPolicyRequest,
  FileSystemPolicyDescription,
  PutFileSystemPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutFileSystemPolicyRequest,
  output: FileSystemPolicyDescription,
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncorrectFileSystemLifeCycleState,
    InternalServerError,
    InvalidPolicyException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFileSystemPolicy",
}));

export type PutLifecycleConfigurationError =
  | BadRequest
  | FileSystemNotFound
  | IncorrectFileSystemLifeCycleState
  | InternalServerError
  | CommonErrors;
/**
 * Use this action to manage storage for your file system. A
 * `LifecycleConfiguration` consists of one or more `LifecyclePolicy`
 * objects that define the following:
 *
 * -
 * `TransitionToIA`
 * –
 * When to move files in the file system from primary storage (Standard storage class) into the Infrequent Access
 * (IA) storage.
 *
 * -
 * `TransitionToArchive`
 * –
 * When to move files in the file system from their current storage class (either IA or Standard storage) into the
 * Archive storage.
 *
 * File systems cannot transition into Archive storage before transitioning into IA storage. Therefore,
 * TransitionToArchive must either not be set or must be later than TransitionToIA.
 *
 * The Archive storage class is available only for file systems that use the Elastic throughput mode
 * and the General Purpose performance mode.
 *
 * -
 * `TransitionToPrimaryStorageClass`
 * –
 * Whether to move files in the file system back to primary storage (Standard storage class) after they are accessed in IA
 * or Archive storage.
 *
 * For more information, see Managing file system
 * storage.
 *
 * Each Amazon EFS file system supports one lifecycle configuration, which applies to
 * all files in the file system. If a `LifecycleConfiguration` object already exists
 * for the specified file system, a `PutLifecycleConfiguration` call modifies the
 * existing configuration. A `PutLifecycleConfiguration` call with an empty
 * `LifecyclePolicies` array in the request body deletes any existing
 * `LifecycleConfiguration`. In the request, specify the following:
 *
 * - The ID for the file system for which you are enabling, disabling, or modifying
 * lifecycle management.
 *
 * - A `LifecyclePolicies` array of `LifecyclePolicy` objects that
 * define when to move files to IA storage, to Archive storage,
 * and back to primary storage.
 *
 * Amazon EFS requires that each `LifecyclePolicy`
 * object have only have a single transition, so the `LifecyclePolicies` array needs to be structured with separate
 * `LifecyclePolicy` objects. See the example requests in the following section for more information.
 *
 * This operation requires permissions for the `elasticfilesystem:PutLifecycleConfiguration` operation.
 *
 * To apply a `LifecycleConfiguration` object to an encrypted file system, you
 * need the same Key Management Service permissions as when you created the encrypted file system.
 */
export const putLifecycleConfiguration: API.OperationMethod<
  PutLifecycleConfigurationRequest,
  LifecycleConfigurationDescription,
  PutLifecycleConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutLifecycleConfigurationRequest,
  output: LifecycleConfigurationDescription,
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncorrectFileSystemLifeCycleState,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLifecycleConfiguration",
}));

export type TagResourceError =
  | AccessPointNotFound
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Creates a tag for an EFS resource. You can create tags for EFS file
 * systems and access points using this API operation.
 *
 * This operation requires permissions for the `elasticfilesystem:TagResource` action.
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
    AccessPointNotFound,
    BadRequest,
    FileSystemNotFound,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessPointNotFound
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Removes tags from an EFS resource. You can remove tags from EFS file
 * systems and access points using this API operation.
 *
 * This operation requires permissions for the `elasticfilesystem:UntagResource` action.
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
    AccessPointNotFound,
    BadRequest,
    FileSystemNotFound,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateFileSystemError =
  | BadRequest
  | FileSystemNotFound
  | IncorrectFileSystemLifeCycleState
  | InsufficientThroughputCapacity
  | InternalServerError
  | ThroughputLimitExceeded
  | TooManyRequests
  | CommonErrors;
/**
 * Updates the throughput mode or the amount of provisioned throughput of an existing file
 * system.
 */
export const updateFileSystem: API.OperationMethod<
  UpdateFileSystemRequest,
  FileSystemDescription,
  UpdateFileSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFileSystemRequest,
  output: FileSystemDescription,
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncorrectFileSystemLifeCycleState,
    InsufficientThroughputCapacity,
    InternalServerError,
    ThroughputLimitExceeded,
    TooManyRequests,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFileSystem",
}));

export type UpdateFileSystemProtectionError =
  | BadRequest
  | FileSystemNotFound
  | IncorrectFileSystemLifeCycleState
  | InsufficientThroughputCapacity
  | InternalServerError
  | ReplicationAlreadyExists
  | ThroughputLimitExceeded
  | TooManyRequests
  | CommonErrors;
/**
 * Updates protection on the file system.
 *
 * This operation requires permissions for the
 * `elasticfilesystem:UpdateFileSystemProtection` action.
 */
export const updateFileSystemProtection: API.OperationMethod<
  UpdateFileSystemProtectionRequest,
  FileSystemProtectionDescription,
  UpdateFileSystemProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFileSystemProtectionRequest,
  output: FileSystemProtectionDescription,
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncorrectFileSystemLifeCycleState,
    InsufficientThroughputCapacity,
    InternalServerError,
    ReplicationAlreadyExists,
    ThroughputLimitExceeded,
    TooManyRequests,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFileSystemProtection",
}));
