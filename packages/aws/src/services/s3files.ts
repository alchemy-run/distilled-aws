import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const ns = T.XmlNamespace("s3files");
const svc = T.AwsApiService({ sdkId: "S3Files", serviceShapeName: "S3Files" });
const auth = T.AwsAuthSigv4({ name: "s3files" });
const ver = T.ServiceVersion("2025-05-05");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const { UseFIPS = false, Endpoint, Region } = p;
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
    return e(Endpoint);
  }
  if (Region != null) {
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (UseFIPS === true) {
          return e(
            `https://s3files-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://s3files.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      errorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      errorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      errorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      errorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      errorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ClientToken = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export type FileSystemId = string;
export type Uid = number;
export type Gid = number;
export type SecondaryGids = number[];
export const SecondaryGids = /*@__PURE__*/ S.Array(S.Number);
export interface PosixUser {
  uid: number;
  gid: number;
  secondaryGids?: number[];
}
export const PosixUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    uid: S.Number,
    gid: S.Number,
    secondaryGids: S.optional(SecondaryGids),
  }),
).annotate({ identifier: "PosixUser" }) as any as S.Schema<PosixUser>;
export type Path = string;
export type OwnerUid = number;
export type OwnerGid = number;
export type Permissions = string;
export interface CreationPermissions {
  ownerUid: number;
  ownerGid: number;
  permissions: string;
}
export const CreationPermissions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ownerUid: S.Number, ownerGid: S.Number, permissions: S.String }),
).annotate({
  identifier: "CreationPermissions",
}) as any as S.Schema<CreationPermissions>;
export interface RootDirectory {
  path?: string;
  creationPermissions?: CreationPermissions;
}
export const RootDirectory = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    path: S.optional(S.String),
    creationPermissions: S.optional(CreationPermissions),
  }),
).annotate({ identifier: "RootDirectory" }) as any as S.Schema<RootDirectory>;
export interface CreateAccessPointRequest {
  clientToken?: string;
  tags?: Tag[];
  fileSystemId: string;
  posixUser?: PosixUser;
  rootDirectory?: RootDirectory;
}
export const CreateAccessPointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagList),
    fileSystemId: S.String,
    posixUser: S.optional(PosixUser),
    rootDirectory: S.optional(RootDirectory),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "PUT", uri: "/access-points" }),
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
export type AccessPointArn = string;
export type AccessPointId = string;
export type LifeCycleState =
  | "available"
  | "creating"
  | "deleting"
  | "deleted"
  | "error"
  | "updating"
  | (string & {});
export const LifeCycleState = S.String;

export type AwsAccountId = string;
export interface CreateAccessPointResponse {
  accessPointArn: string;
  accessPointId: string;
  clientToken: string;
  fileSystemId: string;
  status: LifeCycleState;
  ownerId: string;
  posixUser?: PosixUser;
  rootDirectory?: RootDirectory;
  tags?: Tag[];
  name?: string;
}
export const CreateAccessPointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessPointArn: S.String,
    accessPointId: S.String,
    clientToken: S.String,
    fileSystemId: S.String,
    status: LifeCycleState,
    ownerId: S.String,
    posixUser: S.optional(PosixUser),
    rootDirectory: S.optional(RootDirectory),
    tags: S.optional(TagList),
    name: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateAccessPointResponse",
}) as any as S.Schema<CreateAccessPointResponse>;
export type BucketArn = string;
export type CreationToken = string;
export type KmsKeyId = string;
export type RoleArn = string;
export interface CreateFileSystemRequest {
  bucket: string;
  prefix?: string;
  clientToken?: string;
  kmsKeyId?: string;
  roleArn: string;
  tags?: Tag[];
  acceptBucketWarning?: boolean;
}
export const CreateFileSystemRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucket: S.String,
    prefix: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    kmsKeyId: S.optional(S.String),
    roleArn: S.String,
    tags: S.optional(TagList),
    acceptBucketWarning: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "PUT", uri: "/file-systems" }),
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
export type StatusMessage = string;
export interface CreateFileSystemResponse {
  creationTime?: Date;
  fileSystemArn?: string;
  fileSystemId?: string;
  bucket?: string;
  prefix?: string;
  clientToken?: string;
  kmsKeyId?: string;
  status?: LifeCycleState;
  statusMessage?: string;
  roleArn?: string;
  ownerId?: string;
  tags?: Tag[];
  name?: string;
}
export const CreateFileSystemResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    fileSystemArn: S.optional(S.String),
    fileSystemId: S.optional(S.String),
    bucket: S.optional(S.String),
    prefix: S.optional(S.String),
    clientToken: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
    status: S.optional(LifeCycleState),
    statusMessage: S.optional(S.String),
    roleArn: S.optional(S.String),
    ownerId: S.optional(S.String),
    tags: S.optional(TagList),
    name: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateFileSystemResponse",
}) as any as S.Schema<CreateFileSystemResponse>;
export type SubnetId = string;
export type Ipv4Address = string;
export type Ipv6Address = string;
export type IpAddressType =
  | "IPV4_ONLY"
  | "IPV6_ONLY"
  | "DUAL_STACK"
  | (string & {});
export const IpAddressType = S.String;

export type SecurityGroup = string;
export type SecurityGroups = string[];
export const SecurityGroups = /*@__PURE__*/ S.Array(S.String);
export interface CreateMountTargetRequest {
  fileSystemId: string;
  subnetId: string;
  ipv4Address?: string;
  ipv6Address?: string;
  ipAddressType?: IpAddressType;
  securityGroups?: string[];
}
export const CreateMountTargetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fileSystemId: S.String,
    subnetId: S.String,
    ipv4Address: S.optional(S.String),
    ipv6Address: S.optional(S.String),
    ipAddressType: S.optional(IpAddressType),
    securityGroups: S.optional(SecurityGroups),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "PUT", uri: "/mount-targets" }),
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
export type AvailabilityZoneId = string;
export type MountTargetId = string;
export type NetworkInterfaceId = string;
export type VpcId = string;
export interface CreateMountTargetResponse {
  availabilityZoneId?: string;
  ownerId: string;
  mountTargetId: string;
  fileSystemId?: string;
  subnetId: string;
  ipv4Address?: string;
  ipv6Address?: string;
  networkInterfaceId?: string;
  vpcId?: string;
  securityGroups?: string[];
  status?: LifeCycleState;
  statusMessage?: string;
}
export const CreateMountTargetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    availabilityZoneId: S.optional(S.String),
    ownerId: S.String,
    mountTargetId: S.String,
    fileSystemId: S.optional(S.String),
    subnetId: S.String,
    ipv4Address: S.optional(S.String),
    ipv6Address: S.optional(S.String),
    networkInterfaceId: S.optional(S.String),
    vpcId: S.optional(S.String),
    securityGroups: S.optional(SecurityGroups),
    status: S.optional(LifeCycleState),
    statusMessage: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateMountTargetResponse",
}) as any as S.Schema<CreateMountTargetResponse>;
export interface DeleteAccessPointRequest {
  accessPointId: string;
}
export const DeleteAccessPointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accessPointId: S.String.pipe(T.HttpLabel("accessPointId")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/access-points/{accessPointId}" }),
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
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteAccessPointResponse",
}) as any as S.Schema<DeleteAccessPointResponse>;
export interface DeleteFileSystemRequest {
  fileSystemId: string;
  forceDelete?: boolean;
}
export const DeleteFileSystemRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fileSystemId: S.String.pipe(T.HttpLabel("fileSystemId")),
    forceDelete: S.optional(S.Boolean).pipe(T.HttpQuery("forceDelete")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/file-systems/{fileSystemId}" }),
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
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteFileSystemResponse",
}) as any as S.Schema<DeleteFileSystemResponse>;
export interface DeleteFileSystemPolicyRequest {
  fileSystemId: string;
}
export const DeleteFileSystemPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fileSystemId: S.String.pipe(T.HttpLabel("fileSystemId")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/file-systems/{fileSystemId}/policy" }),
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
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteFileSystemPolicyResponse",
}) as any as S.Schema<DeleteFileSystemPolicyResponse>;
export interface DeleteMountTargetRequest {
  mountTargetId: string;
}
export const DeleteMountTargetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ mountTargetId: S.String.pipe(T.HttpLabel("mountTargetId")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/mount-targets/{mountTargetId}" }),
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
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteMountTargetResponse",
}) as any as S.Schema<DeleteMountTargetResponse>;
export interface GetAccessPointRequest {
  accessPointId: string;
}
export const GetAccessPointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accessPointId: S.String.pipe(T.HttpLabel("accessPointId")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/access-points/{accessPointId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAccessPointRequest",
}) as any as S.Schema<GetAccessPointRequest>;
export interface GetAccessPointResponse {
  accessPointArn: string;
  accessPointId: string;
  clientToken: string;
  fileSystemId: string;
  status: LifeCycleState;
  ownerId: string;
  posixUser?: PosixUser;
  rootDirectory?: RootDirectory;
  tags?: Tag[];
  name?: string;
}
export const GetAccessPointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessPointArn: S.String,
    accessPointId: S.String,
    clientToken: S.String,
    fileSystemId: S.String,
    status: LifeCycleState,
    ownerId: S.String,
    posixUser: S.optional(PosixUser),
    rootDirectory: S.optional(RootDirectory),
    tags: S.optional(TagList),
    name: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetAccessPointResponse",
}) as any as S.Schema<GetAccessPointResponse>;
export interface GetFileSystemRequest {
  fileSystemId: string;
}
export const GetFileSystemRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fileSystemId: S.String.pipe(T.HttpLabel("fileSystemId")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/file-systems/{fileSystemId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFileSystemRequest",
}) as any as S.Schema<GetFileSystemRequest>;
export interface GetFileSystemResponse {
  creationTime?: Date;
  fileSystemArn?: string;
  fileSystemId?: string;
  bucket?: string;
  prefix?: string;
  clientToken?: string;
  kmsKeyId?: string;
  status?: LifeCycleState;
  statusMessage?: string;
  roleArn?: string;
  ownerId?: string;
  tags?: Tag[];
  name?: string;
}
export const GetFileSystemResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    fileSystemArn: S.optional(S.String),
    fileSystemId: S.optional(S.String),
    bucket: S.optional(S.String),
    prefix: S.optional(S.String),
    clientToken: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
    status: S.optional(LifeCycleState),
    statusMessage: S.optional(S.String),
    roleArn: S.optional(S.String),
    ownerId: S.optional(S.String),
    tags: S.optional(TagList),
    name: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetFileSystemResponse",
}) as any as S.Schema<GetFileSystemResponse>;
export interface GetFileSystemPolicyRequest {
  fileSystemId: string;
}
export const GetFileSystemPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fileSystemId: S.String.pipe(T.HttpLabel("fileSystemId")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/file-systems/{fileSystemId}/policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFileSystemPolicyRequest",
}) as any as S.Schema<GetFileSystemPolicyRequest>;
export interface GetFileSystemPolicyResponse {
  fileSystemId: string;
  policy: string;
}
export const GetFileSystemPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fileSystemId: S.String, policy: S.String }).pipe(ns),
).annotate({
  identifier: "GetFileSystemPolicyResponse",
}) as any as S.Schema<GetFileSystemPolicyResponse>;
export interface GetMountTargetRequest {
  mountTargetId: string;
}
export const GetMountTargetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ mountTargetId: S.String.pipe(T.HttpLabel("mountTargetId")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/mount-targets/{mountTargetId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMountTargetRequest",
}) as any as S.Schema<GetMountTargetRequest>;
export interface GetMountTargetResponse {
  availabilityZoneId?: string;
  ownerId: string;
  mountTargetId: string;
  fileSystemId?: string;
  subnetId: string;
  ipv4Address?: string;
  ipv6Address?: string;
  networkInterfaceId?: string;
  vpcId?: string;
  securityGroups?: string[];
  status?: LifeCycleState;
  statusMessage?: string;
}
export const GetMountTargetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    availabilityZoneId: S.optional(S.String),
    ownerId: S.String,
    mountTargetId: S.String,
    fileSystemId: S.optional(S.String),
    subnetId: S.String,
    ipv4Address: S.optional(S.String),
    ipv6Address: S.optional(S.String),
    networkInterfaceId: S.optional(S.String),
    vpcId: S.optional(S.String),
    securityGroups: S.optional(SecurityGroups),
    status: S.optional(LifeCycleState),
    statusMessage: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetMountTargetResponse",
}) as any as S.Schema<GetMountTargetResponse>;
export interface GetSynchronizationConfigurationRequest {
  fileSystemId: string;
}
export const GetSynchronizationConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ fileSystemId: S.String.pipe(T.HttpLabel("fileSystemId")) }).pipe(
      T.all(
        ns,
        T.Http({
          method: "GET",
          uri: "/file-systems/{fileSystemId}/synchronization-configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetSynchronizationConfigurationRequest",
}) as any as S.Schema<GetSynchronizationConfigurationRequest>;
export type ImportTrigger =
  | "ON_DIRECTORY_FIRST_ACCESS"
  | "ON_FILE_ACCESS"
  | (string & {});
export const ImportTrigger = S.String;

export interface ImportDataRule {
  prefix: string;
  trigger: ImportTrigger;
  sizeLessThan: number;
}
export const ImportDataRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    prefix: S.String,
    trigger: ImportTrigger,
    sizeLessThan: S.Number,
  }),
).annotate({ identifier: "ImportDataRule" }) as any as S.Schema<ImportDataRule>;
export type ImportDataRuleList = ImportDataRule[];
export const ImportDataRuleList = /*@__PURE__*/ S.Array(ImportDataRule);
export interface ExpirationDataRule {
  daysAfterLastAccess: number;
}
export const ExpirationDataRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ daysAfterLastAccess: S.Number }),
).annotate({
  identifier: "ExpirationDataRule",
}) as any as S.Schema<ExpirationDataRule>;
export type ExpirationDataRuleList = ExpirationDataRule[];
export const ExpirationDataRuleList = /*@__PURE__*/ S.Array(ExpirationDataRule);
export interface GetSynchronizationConfigurationResponse {
  latestVersionNumber?: number;
  importDataRules: ImportDataRule[];
  expirationDataRules: ExpirationDataRule[];
}
export const GetSynchronizationConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      latestVersionNumber: S.optional(S.Number),
      importDataRules: ImportDataRuleList,
      expirationDataRules: ExpirationDataRuleList,
    }).pipe(ns),
).annotate({
  identifier: "GetSynchronizationConfigurationResponse",
}) as any as S.Schema<GetSynchronizationConfigurationResponse>;
export interface ListAccessPointsRequest {
  fileSystemId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListAccessPointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fileSystemId: S.String.pipe(T.HttpQuery("fileSystemId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/access-points" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAccessPointsRequest",
}) as any as S.Schema<ListAccessPointsRequest>;
export interface ListAccessPointsDescription {
  accessPointArn: string;
  accessPointId: string;
  fileSystemId: string;
  status: LifeCycleState;
  ownerId: string;
  posixUser?: PosixUser;
  rootDirectory?: RootDirectory;
  name?: string;
}
export const ListAccessPointsDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessPointArn: S.String,
    accessPointId: S.String,
    fileSystemId: S.String,
    status: LifeCycleState,
    ownerId: S.String,
    posixUser: S.optional(PosixUser),
    rootDirectory: S.optional(RootDirectory),
    name: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAccessPointsDescription",
}) as any as S.Schema<ListAccessPointsDescription>;
export type AccessPoints = ListAccessPointsDescription[];
export const AccessPoints = /*@__PURE__*/ S.Array(ListAccessPointsDescription);
export interface ListAccessPointsResponse {
  nextToken?: string;
  accessPoints: ListAccessPointsDescription[];
}
export const ListAccessPointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    accessPoints: AccessPoints,
  }).pipe(ns),
).annotate({
  identifier: "ListAccessPointsResponse",
}) as any as S.Schema<ListAccessPointsResponse>;
export interface ListFileSystemsRequest {
  bucket?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListFileSystemsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucket: S.optional(S.String).pipe(T.HttpQuery("bucket")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/file-systems" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFileSystemsRequest",
}) as any as S.Schema<ListFileSystemsRequest>;
export interface ListFileSystemsDescription {
  creationTime: Date;
  fileSystemArn: string;
  fileSystemId: string;
  name?: string;
  bucket: string;
  status: LifeCycleState;
  statusMessage?: string;
  roleArn: string;
  ownerId: string;
}
export const ListFileSystemsDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    fileSystemArn: S.String,
    fileSystemId: S.String,
    name: S.optional(S.String),
    bucket: S.String,
    status: LifeCycleState,
    statusMessage: S.optional(S.String),
    roleArn: S.String,
    ownerId: S.String,
  }),
).annotate({
  identifier: "ListFileSystemsDescription",
}) as any as S.Schema<ListFileSystemsDescription>;
export type FileSystems = ListFileSystemsDescription[];
export const FileSystems = /*@__PURE__*/ S.Array(ListFileSystemsDescription);
export interface ListFileSystemsResponse {
  nextToken?: string;
  fileSystems: ListFileSystemsDescription[];
}
export const ListFileSystemsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), fileSystems: FileSystems }).pipe(
    ns,
  ),
).annotate({
  identifier: "ListFileSystemsResponse",
}) as any as S.Schema<ListFileSystemsResponse>;
export interface ListMountTargetsRequest {
  fileSystemId?: string;
  accessPointId?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListMountTargetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fileSystemId: S.optional(S.String).pipe(T.HttpQuery("fileSystemId")),
    accessPointId: S.optional(S.String).pipe(T.HttpQuery("accessPointId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/mount-targets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMountTargetsRequest",
}) as any as S.Schema<ListMountTargetsRequest>;
export interface ListMountTargetsDescription {
  availabilityZoneId?: string;
  fileSystemId?: string;
  ipv4Address?: string;
  ipv6Address?: string;
  status?: LifeCycleState;
  statusMessage?: string;
  mountTargetId: string;
  networkInterfaceId?: string;
  ownerId: string;
  subnetId: string;
  vpcId?: string;
}
export const ListMountTargetsDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    availabilityZoneId: S.optional(S.String),
    fileSystemId: S.optional(S.String),
    ipv4Address: S.optional(S.String),
    ipv6Address: S.optional(S.String),
    status: S.optional(LifeCycleState),
    statusMessage: S.optional(S.String),
    mountTargetId: S.String,
    networkInterfaceId: S.optional(S.String),
    ownerId: S.String,
    subnetId: S.String,
    vpcId: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMountTargetsDescription",
}) as any as S.Schema<ListMountTargetsDescription>;
export type MountTargets = ListMountTargetsDescription[];
export const MountTargets = /*@__PURE__*/ S.Array(ListMountTargetsDescription);
export interface ListMountTargetsResponse {
  nextToken?: string;
  mountTargets: ListMountTargetsDescription[];
}
export const ListMountTargetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    mountTargets: MountTargets,
  }).pipe(ns),
).annotate({
  identifier: "ListMountTargetsResponse",
}) as any as S.Schema<ListMountTargetsResponse>;
export type ResourceId = string;
export interface ListTagsForResourceRequest {
  resourceId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceId: S.String.pipe(T.HttpLabel("resourceId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/resource-tags/{resourceId}" }),
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
  tags?: Tag[];
  nextToken?: string;
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagList), nextToken: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PutFileSystemPolicyRequest {
  fileSystemId: string;
  policy: string;
}
export const PutFileSystemPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fileSystemId: S.String.pipe(T.HttpLabel("fileSystemId")),
    policy: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "PUT", uri: "/file-systems/{fileSystemId}/policy" }),
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
export interface PutFileSystemPolicyResponse {}
export const PutFileSystemPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutFileSystemPolicyResponse",
}) as any as S.Schema<PutFileSystemPolicyResponse>;
export interface PutSynchronizationConfigurationRequest {
  fileSystemId: string;
  latestVersionNumber?: number;
  importDataRules: ImportDataRule[];
  expirationDataRules: ExpirationDataRule[];
}
export const PutSynchronizationConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      fileSystemId: S.String.pipe(T.HttpLabel("fileSystemId")),
      latestVersionNumber: S.optional(S.Number),
      importDataRules: ImportDataRuleList,
      expirationDataRules: ExpirationDataRuleList,
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "PUT",
          uri: "/file-systems/{fileSystemId}/synchronization-configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutSynchronizationConfigurationRequest",
}) as any as S.Schema<PutSynchronizationConfigurationRequest>;
export interface PutSynchronizationConfigurationResponse {}
export const PutSynchronizationConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutSynchronizationConfigurationResponse",
}) as any as S.Schema<PutSynchronizationConfigurationResponse>;
export interface TagResourceRequest {
  resourceId: string;
  tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceId: S.String.pipe(T.HttpLabel("resourceId")),
    tags: TagList,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/resource-tags/{resourceId}" }),
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
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resourceId: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceId: S.String.pipe(T.HttpLabel("resourceId")),
    tagKeys: TagKeys.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/resource-tags/{resourceId}" }),
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
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateMountTargetRequest {
  mountTargetId: string;
  securityGroups: string[];
}
export const UpdateMountTargetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mountTargetId: S.String.pipe(T.HttpLabel("mountTargetId")),
    securityGroups: SecurityGroups,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "PUT", uri: "/mount-targets/{mountTargetId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMountTargetRequest",
}) as any as S.Schema<UpdateMountTargetRequest>;
export interface UpdateMountTargetResponse {
  availabilityZoneId?: string;
  ownerId: string;
  mountTargetId: string;
  fileSystemId?: string;
  subnetId: string;
  ipv4Address?: string;
  ipv6Address?: string;
  networkInterfaceId?: string;
  vpcId?: string;
  securityGroups?: string[];
  status?: LifeCycleState;
  statusMessage?: string;
}
export const UpdateMountTargetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    availabilityZoneId: S.optional(S.String),
    ownerId: S.String,
    mountTargetId: S.String,
    fileSystemId: S.optional(S.String),
    subnetId: S.String,
    ipv4Address: S.optional(S.String),
    ipv6Address: S.optional(S.String),
    networkInterfaceId: S.optional(S.String),
    vpcId: S.optional(S.String),
    securityGroups: S.optional(SecurityGroups),
    status: S.optional(LifeCycleState),
    statusMessage: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "UpdateMountTargetResponse",
}) as any as S.Schema<UpdateMountTargetResponse>;
export type ErrorCode = string;
export type CreateAccessPointError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an S3 File System Access Point for application-specific access with POSIX user identity and root directory enforcement. Access points provide a way to manage access to shared datasets in multi-tenant scenarios.
 */
export const createAccessPoint: API.OperationMethod<
  CreateAccessPointRequest,
  CreateAccessPointResponse,
  CreateAccessPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAccessPointRequest,
  output: CreateAccessPointResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessPoint",
}));

export type CreateFileSystemError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an S3 File System resource scoped to a bucket or prefix within a bucket, enabling file system access to S3 data. To create a file system, you need an S3 bucket and an IAM role that grants the service permission to access the bucket.
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
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFileSystem",
}));

export type CreateMountTargetError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a mount target resource as an endpoint for mounting the S3 File System from compute resources in a specific Availability Zone and VPC. Mount targets provide network access to the file system.
 */
export const createMountTarget: API.OperationMethod<
  CreateMountTargetRequest,
  CreateMountTargetResponse,
  CreateMountTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMountTargetRequest,
  output: CreateMountTargetResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMountTarget",
}));

export type DeleteAccessPointError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an S3 File System Access Point. This operation is irreversible.
 */
export const deleteAccessPoint: API.OperationMethod<
  DeleteAccessPointRequest,
  DeleteAccessPointResponse,
  DeleteAccessPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccessPointRequest,
  output: DeleteAccessPointResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessPoint",
}));

export type DeleteFileSystemError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an S3 File System. You can optionally force deletion of a file system that has pending export data.
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
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFileSystem",
}));

export type DeleteFileSystemPolicyError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the IAM resource policy of an S3 File System.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFileSystemPolicy",
}));

export type DeleteMountTargetError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified mount target. This operation is irreversible.
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
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMountTarget",
}));

export type GetAccessPointError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns resource information for an S3 File System Access Point.
 */
export const getAccessPoint: API.OperationMethod<
  GetAccessPointRequest,
  GetAccessPointResponse,
  GetAccessPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccessPointRequest,
  output: GetAccessPointResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPoint",
}));

export type GetFileSystemError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns resource information for the specified S3 File System including status, configuration, and metadata.
 */
export const getFileSystem: API.OperationMethod<
  GetFileSystemRequest,
  GetFileSystemResponse,
  GetFileSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFileSystemRequest,
  output: GetFileSystemResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFileSystem",
}));

export type GetFileSystemPolicyError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the IAM resource policy of an S3 File System.
 */
export const getFileSystemPolicy: API.OperationMethod<
  GetFileSystemPolicyRequest,
  GetFileSystemPolicyResponse,
  GetFileSystemPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFileSystemPolicyRequest,
  output: GetFileSystemPolicyResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFileSystemPolicy",
}));

export type GetMountTargetError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns detailed resource information for the specified mount target including network configuration.
 */
export const getMountTarget: API.OperationMethod<
  GetMountTargetRequest,
  GetMountTargetResponse,
  GetMountTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMountTargetRequest,
  output: GetMountTargetResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMountTarget",
}));

export type GetSynchronizationConfigurationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the synchronization configuration for the specified S3 File System, including import data rules and expiration data rules.
 */
export const getSynchronizationConfiguration: API.OperationMethod<
  GetSynchronizationConfigurationRequest,
  GetSynchronizationConfigurationResponse,
  GetSynchronizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSynchronizationConfigurationRequest,
  output: GetSynchronizationConfigurationResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSynchronizationConfiguration",
}));

export type ListAccessPointsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns resource information for all S3 File System Access Points associated with the specified S3 File System.
 */
export const listAccessPoints: API.PaginatedOperationMethod<
  ListAccessPointsRequest,
  ListAccessPointsResponse,
  ListAccessPointsError,
  Credentials | HttpClient.HttpClient,
  ListAccessPointsDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccessPointsRequest,
  output: ListAccessPointsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessPoints",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accessPoints",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFileSystemsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all S3 File Systems owned by the account with optional filtering by bucket.
 */
export const listFileSystems: API.PaginatedOperationMethod<
  ListFileSystemsRequest,
  ListFileSystemsResponse,
  ListFileSystemsError,
  Credentials | HttpClient.HttpClient,
  ListFileSystemsDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFileSystemsRequest,
  output: ListFileSystemsResponse,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFileSystems",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "fileSystems",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMountTargetsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns resource information for all mount targets with optional filtering by file system, access point, and VPC.
 */
export const listMountTargets: API.PaginatedOperationMethod<
  ListMountTargetsRequest,
  ListMountTargetsResponse,
  ListMountTargetsError,
  Credentials | HttpClient.HttpClient,
  ListMountTargetsDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMountTargetsRequest,
  output: ListMountTargetsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMountTargets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "mountTargets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all tags for S3 Files resources.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tags",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutFileSystemPolicyError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates or replaces the IAM resource policy for an S3 File System to control access permissions.
 */
export const putFileSystemPolicy: API.OperationMethod<
  PutFileSystemPolicyRequest,
  PutFileSystemPolicyResponse,
  PutFileSystemPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutFileSystemPolicyRequest,
  output: PutFileSystemPolicyResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFileSystemPolicy",
}));

export type PutSynchronizationConfigurationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates the synchronization configuration for the specified S3 File System, including import data rules and expiration data rules.
 */
export const putSynchronizationConfiguration: API.OperationMethod<
  PutSynchronizationConfigurationRequest,
  PutSynchronizationConfigurationResponse,
  PutSynchronizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutSynchronizationConfigurationRequest,
  output: PutSynchronizationConfigurationResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSynchronizationConfiguration",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates tags for S3 Files resources using standard Amazon Web Services tagging APIs.
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
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from S3 Files resources.
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
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateMountTargetError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the mount target resource, specifically security group configurations.
 */
export const updateMountTarget: API.OperationMethod<
  UpdateMountTargetRequest,
  UpdateMountTargetResponse,
  UpdateMountTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMountTargetRequest,
  output: UpdateMountTargetResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMountTarget",
}));
