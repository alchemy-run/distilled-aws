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
  sdkId: "CloudHSM V2",
  serviceShapeName: "BaldrApiService",
});
const auth = T.AwsAuthSigv4({ name: "cloudhsm" });
const ver = T.ServiceVersion("2017-04-28");
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
              `https://cloudhsmv2-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://cloudhsmv2-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://cloudhsmv2.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        if ("aws" === _.getAttr(PartitionResult, "name")) {
          return e(`https://cloudhsmv2.${Region}.amazonaws.com`);
        }
        if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
          return e(`https://cloudhsmv2.${Region}.amazonaws.com`);
        }
        return e(
          `https://cloudhsmv2.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class CloudHsmAccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<CloudHsmAccessDeniedException>()(
    "CloudHsmAccessDeniedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAuthError) {}
export class CloudHsmInternalFailureException
  extends /*@__PURE__*/ S.TaggedError<CloudHsmInternalFailureException>()(
    "CloudHsmInternalFailureException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class CloudHsmInvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<CloudHsmInvalidRequestException>()(
    "CloudHsmInvalidRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class CloudHsmResourceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<CloudHsmResourceLimitExceededException>()(
    "CloudHsmResourceLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class CloudHsmResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<CloudHsmResourceNotFoundException>()(
    "CloudHsmResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class CloudHsmServiceException
  extends /*@__PURE__*/ S.TaggedError<CloudHsmServiceException>()(
    "CloudHsmServiceException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class CloudHsmTagException
  extends /*@__PURE__*/ S.TaggedError<CloudHsmTagException>()(
    "CloudHsmTagException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type Region = string;
export type BackupId = string;
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
export interface CopyBackupToRegionRequest {
  DestinationRegion: string;
  BackupId: string;
  TagList?: Tag[];
}
export const CopyBackupToRegionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DestinationRegion: S.String,
    BackupId: S.String,
    TagList: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CopyBackupToRegionRequest",
}) as any as S.Schema<CopyBackupToRegionRequest>;
export type ClusterId = string;
export interface DestinationBackup {
  CreateTimestamp?: Date;
  SourceRegion?: string;
  SourceBackup?: string;
  SourceCluster?: string;
}
export const DestinationBackup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreateTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SourceRegion: S.optional(S.String),
    SourceBackup: S.optional(S.String),
    SourceCluster: S.optional(S.String),
  }),
).annotate({
  identifier: "DestinationBackup",
}) as any as S.Schema<DestinationBackup>;
export interface CopyBackupToRegionResponse {
  DestinationBackup?: DestinationBackup;
}
export const CopyBackupToRegionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DestinationBackup: S.optional(DestinationBackup) }),
).annotate({
  identifier: "CopyBackupToRegionResponse",
}) as any as S.Schema<CopyBackupToRegionResponse>;
export type BackupRetentionType = "DAYS" | (string & {});
export const BackupRetentionType = S.String;

export type BackupRetentionValue = string;
export interface BackupRetentionPolicy {
  Type?: BackupRetentionType;
  Value?: string;
}
export const BackupRetentionPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(BackupRetentionType),
    Value: S.optional(S.String),
  }),
).annotate({
  identifier: "BackupRetentionPolicy",
}) as any as S.Schema<BackupRetentionPolicy>;
export type HsmType = string;
export type BackupArn = string;
export type SubnetId = string;
export type SubnetIds = string[];
export const SubnetIds = /*@__PURE__*/ S.Array(S.String);
export type NetworkType = "IPV4" | "DUALSTACK" | (string & {});
export const NetworkType = S.String;

export type ClusterMode = "FIPS" | "NON_FIPS" | (string & {});
export const ClusterMode = S.String;

export interface CreateClusterRequest {
  BackupRetentionPolicy?: BackupRetentionPolicy;
  HsmType: string;
  SourceBackupId?: string;
  SubnetIds: string[];
  NetworkType?: NetworkType;
  TagList?: Tag[];
  Mode?: ClusterMode;
}
export const CreateClusterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BackupRetentionPolicy: S.optional(BackupRetentionPolicy),
    HsmType: S.String,
    SourceBackupId: S.optional(S.String),
    SubnetIds: SubnetIds,
    NetworkType: S.optional(NetworkType),
    TagList: S.optional(TagList),
    Mode: S.optional(ClusterMode),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateClusterRequest",
}) as any as S.Schema<CreateClusterRequest>;
export type BackupPolicy = "DEFAULT" | (string & {});
export const BackupPolicy = S.String;

export type ExternalAz = string;
export type EniId = string;
export type IpAddress = string;
export type IpV6Address = string;
export type HsmId = string;
export type HsmState =
  | "CREATE_IN_PROGRESS"
  | "ACTIVE"
  | "DEGRADED"
  | "DELETE_IN_PROGRESS"
  | "DELETED"
  | (string & {});
export const HsmState = S.String;

export interface Hsm {
  AvailabilityZone?: string;
  ClusterId?: string;
  SubnetId?: string;
  EniId?: string;
  EniIp?: string;
  EniIpV6?: string;
  HsmId: string;
  HsmType?: string;
  State?: HsmState;
  StateMessage?: string;
}
export const Hsm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityZone: S.optional(S.String),
    ClusterId: S.optional(S.String),
    SubnetId: S.optional(S.String),
    EniId: S.optional(S.String),
    EniIp: S.optional(S.String),
    EniIpV6: S.optional(S.String),
    HsmId: S.String,
    HsmType: S.optional(S.String),
    State: S.optional(HsmState),
    StateMessage: S.optional(S.String),
  }),
).annotate({ identifier: "Hsm" }) as any as S.Schema<Hsm>;
export type Hsms = Hsm[];
export const Hsms = /*@__PURE__*/ S.Array(Hsm);
export type PreCoPassword = string;
export type SecurityGroup = string;
export type ClusterState =
  | "CREATE_IN_PROGRESS"
  | "UNINITIALIZED"
  | "INITIALIZE_IN_PROGRESS"
  | "INITIALIZED"
  | "ACTIVE"
  | "UPDATE_IN_PROGRESS"
  | "MODIFY_IN_PROGRESS"
  | "ROLLBACK_IN_PROGRESS"
  | "DELETE_IN_PROGRESS"
  | "DELETED"
  | "DEGRADED"
  | (string & {});
export const ClusterState = S.String;

export type StateMessage = string;
export type ExternalSubnetMapping = { [key: string]: string | undefined };
export const ExternalSubnetMapping = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type VpcId = string;
export type Cert = string;
export interface Certificates {
  ClusterCsr?: string;
  HsmCertificate?: string;
  AwsHardwareCertificate?: string;
  ManufacturerHardwareCertificate?: string;
  ClusterCertificate?: string;
}
export const Certificates = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterCsr: S.optional(S.String),
    HsmCertificate: S.optional(S.String),
    AwsHardwareCertificate: S.optional(S.String),
    ManufacturerHardwareCertificate: S.optional(S.String),
    ClusterCertificate: S.optional(S.String),
  }),
).annotate({ identifier: "Certificates" }) as any as S.Schema<Certificates>;
export interface Cluster {
  BackupPolicy?: BackupPolicy;
  BackupRetentionPolicy?: BackupRetentionPolicy;
  ClusterId?: string;
  CreateTimestamp?: Date;
  Hsms?: Hsm[];
  HsmType?: string;
  HsmTypeRollbackExpiration?: Date;
  PreCoPassword?: string;
  SecurityGroup?: string;
  SourceBackupId?: string;
  State?: ClusterState;
  StateMessage?: string;
  SubnetMapping?: { [key: string]: string | undefined };
  VpcId?: string;
  NetworkType?: NetworkType;
  Certificates?: Certificates;
  TagList?: Tag[];
  Mode?: ClusterMode;
}
export const Cluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BackupPolicy: S.optional(BackupPolicy),
    BackupRetentionPolicy: S.optional(BackupRetentionPolicy),
    ClusterId: S.optional(S.String),
    CreateTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Hsms: S.optional(Hsms),
    HsmType: S.optional(S.String),
    HsmTypeRollbackExpiration: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    PreCoPassword: S.optional(S.String),
    SecurityGroup: S.optional(S.String),
    SourceBackupId: S.optional(S.String),
    State: S.optional(ClusterState),
    StateMessage: S.optional(S.String),
    SubnetMapping: S.optional(ExternalSubnetMapping),
    VpcId: S.optional(S.String),
    NetworkType: S.optional(NetworkType),
    Certificates: S.optional(Certificates),
    TagList: S.optional(TagList),
    Mode: S.optional(ClusterMode),
  }),
).annotate({ identifier: "Cluster" }) as any as S.Schema<Cluster>;
export interface CreateClusterResponse {
  Cluster?: Cluster;
}
export const CreateClusterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }),
).annotate({
  identifier: "CreateClusterResponse",
}) as any as S.Schema<CreateClusterResponse>;
export interface CreateHsmRequest {
  ClusterId: string;
  AvailabilityZone: string;
  IpAddress?: string;
}
export const CreateHsmRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.String,
    AvailabilityZone: S.String,
    IpAddress: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateHsmRequest",
}) as any as S.Schema<CreateHsmRequest>;
export interface CreateHsmResponse {
  Hsm?: Hsm;
}
export const CreateHsmResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Hsm: S.optional(Hsm) }),
).annotate({
  identifier: "CreateHsmResponse",
}) as any as S.Schema<CreateHsmResponse>;
export interface DeleteBackupRequest {
  BackupId: string;
}
export const DeleteBackupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BackupId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteBackupRequest",
}) as any as S.Schema<DeleteBackupRequest>;
export type BackupState =
  | "CREATE_IN_PROGRESS"
  | "READY"
  | "DELETED"
  | "PENDING_DELETION"
  | (string & {});
export const BackupState = S.String;

export interface Backup {
  BackupId: string;
  BackupArn?: string;
  BackupState?: BackupState;
  ClusterId?: string;
  CreateTimestamp?: Date;
  CopyTimestamp?: Date;
  NeverExpires?: boolean;
  SourceRegion?: string;
  SourceBackup?: string;
  SourceCluster?: string;
  DeleteTimestamp?: Date;
  TagList?: Tag[];
  HsmType?: string;
  Mode?: ClusterMode;
}
export const Backup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BackupId: S.String,
    BackupArn: S.optional(S.String),
    BackupState: S.optional(BackupState),
    ClusterId: S.optional(S.String),
    CreateTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CopyTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    NeverExpires: S.optional(S.Boolean),
    SourceRegion: S.optional(S.String),
    SourceBackup: S.optional(S.String),
    SourceCluster: S.optional(S.String),
    DeleteTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    TagList: S.optional(TagList),
    HsmType: S.optional(S.String),
    Mode: S.optional(ClusterMode),
  }),
).annotate({ identifier: "Backup" }) as any as S.Schema<Backup>;
export interface DeleteBackupResponse {
  Backup?: Backup;
}
export const DeleteBackupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Backup: S.optional(Backup) }),
).annotate({
  identifier: "DeleteBackupResponse",
}) as any as S.Schema<DeleteBackupResponse>;
export interface DeleteClusterRequest {
  ClusterId: string;
}
export const DeleteClusterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteClusterRequest",
}) as any as S.Schema<DeleteClusterRequest>;
export interface DeleteClusterResponse {
  Cluster?: Cluster;
}
export const DeleteClusterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }),
).annotate({
  identifier: "DeleteClusterResponse",
}) as any as S.Schema<DeleteClusterResponse>;
export interface DeleteHsmRequest {
  ClusterId: string;
  HsmId?: string;
  EniId?: string;
  EniIp?: string;
}
export const DeleteHsmRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.String,
    HsmId: S.optional(S.String),
    EniId: S.optional(S.String),
    EniIp: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteHsmRequest",
}) as any as S.Schema<DeleteHsmRequest>;
export interface DeleteHsmResponse {
  HsmId?: string;
}
export const DeleteHsmResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HsmId: S.optional(S.String) }),
).annotate({
  identifier: "DeleteHsmResponse",
}) as any as S.Schema<DeleteHsmResponse>;
export type CloudHsmArn = string;
export interface DeleteResourcePolicyRequest {
  ResourceArn?: string;
}
export const DeleteResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteResourcePolicyRequest",
}) as any as S.Schema<DeleteResourcePolicyRequest>;
export type ResourcePolicy = string;
export interface DeleteResourcePolicyResponse {
  ResourceArn?: string;
  Policy?: string;
}
export const DeleteResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.optional(S.String), Policy: S.optional(S.String) }),
).annotate({
  identifier: "DeleteResourcePolicyResponse",
}) as any as S.Schema<DeleteResourcePolicyResponse>;
export type NextToken = string;
export type BackupsMaxSize = number;
export type Field = string;
export type Strings = string[];
export const Strings = /*@__PURE__*/ S.Array(S.String);
export type Filters = { [key: string]: string[] | undefined };
export const Filters = /*@__PURE__*/ S.Record(
  S.String,
  Strings.pipe(S.optional),
);
export interface DescribeBackupsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: { [key: string]: string[] | undefined };
  Shared?: boolean;
  SortAscending?: boolean;
}
export const DescribeBackupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Filters: S.optional(Filters),
    Shared: S.optional(S.Boolean),
    SortAscending: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeBackupsRequest",
}) as any as S.Schema<DescribeBackupsRequest>;
export type Backups = Backup[];
export const Backups = /*@__PURE__*/ S.Array(Backup);
export interface DescribeBackupsResponse {
  Backups?: Backup[];
  NextToken?: string;
}
export const DescribeBackupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Backups: S.optional(Backups), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "DescribeBackupsResponse",
}) as any as S.Schema<DescribeBackupsResponse>;
export type ClustersMaxSize = number;
export interface DescribeClustersRequest {
  Filters?: { [key: string]: string[] | undefined };
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeClustersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(Filters),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeClustersRequest",
}) as any as S.Schema<DescribeClustersRequest>;
export type Clusters = Cluster[];
export const Clusters = /*@__PURE__*/ S.Array(Cluster);
export interface DescribeClustersResponse {
  Clusters?: Cluster[];
  NextToken?: string;
}
export const DescribeClustersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Clusters: S.optional(Clusters), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "DescribeClustersResponse",
}) as any as S.Schema<DescribeClustersResponse>;
export interface GetResourcePolicyRequest {
  ResourceArn?: string;
}
export const GetResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetResourcePolicyRequest",
}) as any as S.Schema<GetResourcePolicyRequest>;
export interface GetResourcePolicyResponse {
  Policy?: string;
}
export const GetResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policy: S.optional(S.String) }),
).annotate({
  identifier: "GetResourcePolicyResponse",
}) as any as S.Schema<GetResourcePolicyResponse>;
export interface InitializeClusterRequest {
  ClusterId: string;
  SignedCert: string;
  TrustAnchor: string;
}
export const InitializeClusterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.String,
    SignedCert: S.String,
    TrustAnchor: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "InitializeClusterRequest",
}) as any as S.Schema<InitializeClusterRequest>;
export interface InitializeClusterResponse {
  State?: ClusterState;
  StateMessage?: string;
}
export const InitializeClusterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: S.optional(ClusterState),
    StateMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "InitializeClusterResponse",
}) as any as S.Schema<InitializeClusterResponse>;
export type ResourceId = string;
export type MaxSize = number;
export interface ListTagsRequest {
  ResourceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsRequest",
}) as any as S.Schema<ListTagsRequest>;
export interface ListTagsResponse {
  TagList: Tag[];
  NextToken?: string;
}
export const ListTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TagList: TagList, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListTagsResponse",
}) as any as S.Schema<ListTagsResponse>;
export interface ModifyBackupAttributesRequest {
  BackupId: string;
  NeverExpires: boolean;
}
export const ModifyBackupAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BackupId: S.String, NeverExpires: S.Boolean }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ModifyBackupAttributesRequest",
}) as any as S.Schema<ModifyBackupAttributesRequest>;
export interface ModifyBackupAttributesResponse {
  Backup?: Backup;
}
export const ModifyBackupAttributesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Backup: S.optional(Backup) }),
).annotate({
  identifier: "ModifyBackupAttributesResponse",
}) as any as S.Schema<ModifyBackupAttributesResponse>;
export interface ModifyClusterRequest {
  HsmType?: string;
  BackupRetentionPolicy?: BackupRetentionPolicy;
  ClusterId: string;
}
export const ModifyClusterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HsmType: S.optional(S.String),
    BackupRetentionPolicy: S.optional(BackupRetentionPolicy),
    ClusterId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ModifyClusterRequest",
}) as any as S.Schema<ModifyClusterRequest>;
export interface ModifyClusterResponse {
  Cluster?: Cluster;
}
export const ModifyClusterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }),
).annotate({
  identifier: "ModifyClusterResponse",
}) as any as S.Schema<ModifyClusterResponse>;
export interface PutResourcePolicyRequest {
  ResourceArn?: string;
  Policy?: string;
}
export const PutResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    Policy: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutResourcePolicyRequest",
}) as any as S.Schema<PutResourcePolicyRequest>;
export interface PutResourcePolicyResponse {
  ResourceArn?: string;
  Policy?: string;
}
export const PutResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.optional(S.String), Policy: S.optional(S.String) }),
).annotate({
  identifier: "PutResourcePolicyResponse",
}) as any as S.Schema<PutResourcePolicyResponse>;
export interface RestoreBackupRequest {
  BackupId: string;
}
export const RestoreBackupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BackupId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RestoreBackupRequest",
}) as any as S.Schema<RestoreBackupRequest>;
export interface RestoreBackupResponse {
  Backup?: Backup;
}
export const RestoreBackupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Backup: S.optional(Backup) }),
).annotate({
  identifier: "RestoreBackupResponse",
}) as any as S.Schema<RestoreBackupResponse>;
export interface TagResourceRequest {
  ResourceId: string;
  TagList: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceId: S.String, TagList: TagList }).pipe(
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
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceId: string;
  TagKeyList: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceId: S.String, TagKeyList: TagKeyList }).pipe(
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
export type ErrorMessage = string;
export type CopyBackupToRegionError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CloudHsmTagException
  | CommonErrors;
/**
 * Copy an CloudHSM cluster backup to a different region.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM backup in a different Amazon Web Services account.
 */
export const copyBackupToRegion: API.OperationMethod<
  CopyBackupToRegionRequest,
  CopyBackupToRegionResponse,
  CopyBackupToRegionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CopyBackupToRegionRequest,
  output: CopyBackupToRegionResponse,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
    CloudHsmTagException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyBackupToRegion",
}));

export type CreateClusterError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CloudHsmTagException
  | CommonErrors;
/**
 * Creates a new CloudHSM cluster.
 *
 * **Cross-account use:** Yes. To perform this operation with an CloudHSM backup in a different AWS account, specify the full backup
 * ARN in the value of the SourceBackupId parameter.
 */
export const createCluster: API.OperationMethod<
  CreateClusterRequest,
  CreateClusterResponse,
  CreateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateClusterRequest,
  output: CreateClusterResponse,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
    CloudHsmTagException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCluster",
}));

export type CreateHsmError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CommonErrors;
/**
 * Creates a new hardware security module (HSM) in the specified CloudHSM
 * cluster.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM cluster in a different Amazon Web Service account.
 */
export const createHsm: API.OperationMethod<
  CreateHsmRequest,
  CreateHsmResponse,
  CreateHsmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateHsmRequest,
  output: CreateHsmResponse,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHsm",
}));

export type DeleteBackupError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CommonErrors;
/**
 * Deletes a specified CloudHSM backup. A backup can be restored up to 7 days
 * after the DeleteBackup request is made. For more information on restoring a backup, see
 * RestoreBackup.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM backup in a different Amazon Web Services account.
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
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackup",
}));

export type DeleteClusterError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CloudHsmTagException
  | CommonErrors;
/**
 * Deletes the specified CloudHSM cluster. Before you can delete a cluster, you must
 * delete all HSMs in the cluster. To see if the cluster contains any HSMs, use DescribeClusters. To delete an HSM, use DeleteHsm.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM cluster in a different Amazon Web Services account.
 */
export const deleteCluster: API.OperationMethod<
  DeleteClusterRequest,
  DeleteClusterResponse,
  DeleteClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteClusterRequest,
  output: DeleteClusterResponse,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
    CloudHsmTagException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCluster",
}));

export type DeleteHsmError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CommonErrors;
/**
 * Deletes the specified HSM. To specify an HSM, you can use its identifier (ID), the IP
 * address of the HSM's elastic network interface (ENI), or the ID of the HSM's ENI. You need to
 * specify only one of these values. To find these values, use DescribeClusters.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM hsm in a different Amazon Web Services account.
 */
export const deleteHsm: API.OperationMethod<
  DeleteHsmRequest,
  DeleteHsmResponse,
  DeleteHsmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteHsmRequest,
  output: DeleteHsmResponse,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHsm",
}));

export type DeleteResourcePolicyError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CommonErrors;
/**
 * Deletes an CloudHSM resource policy. Deleting a resource policy will result in the resource being unshared and removed from
 * any RAM resource shares. Deleting the resource policy attached to a backup will not impact any clusters created from that
 * backup.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM resource in a different Amazon Web Services account.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourcePolicyRequest,
  output: DeleteResourcePolicyResponse,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type DescribeBackupsError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CloudHsmTagException
  | CommonErrors;
/**
 * Gets information about backups of CloudHSM clusters. Lists either the backups you own or the backups shared with you when the Shared parameter is true.
 *
 * This is a paginated operation, which means that each response might contain only a
 * subset of all the backups. When the response contains only a subset of backups, it includes a
 * `NextToken` value. Use this value in a subsequent `DescribeBackups`
 * request to get more backups. When you receive a response with no `NextToken` (or an
 * empty or null value), that means there are no more backups to get.
 *
 * **Cross-account use:** Yes. Customers can describe backups in other Amazon Web Services accounts that are shared with them.
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
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
    CloudHsmTagException,
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

export type DescribeClustersError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmServiceException
  | CloudHsmTagException
  | CommonErrors;
/**
 * Gets information about CloudHSM clusters.
 *
 * This is a paginated operation, which means that each response might contain only a
 * subset of all the clusters. When the response contains only a subset of clusters, it includes
 * a `NextToken` value. Use this value in a subsequent `DescribeClusters`
 * request to get more clusters. When you receive a response with no `NextToken` (or
 * an empty or null value), that means there are no more clusters to get.
 *
 * **Cross-account use:** No. You cannot perform this operation on CloudHSM clusters in a different Amazon Web Services account.
 */
export const describeClusters: API.PaginatedOperationMethod<
  DescribeClustersRequest,
  DescribeClustersResponse,
  DescribeClustersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeClustersRequest,
  output: DescribeClustersResponse,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmServiceException,
    CloudHsmTagException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusters",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetResourcePolicyError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CommonErrors;
/**
 * Retrieves the resource policy document attached to a given resource.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM resource in a different Amazon Web Services account.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourcePolicyRequest,
  output: GetResourcePolicyResponse,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

export type InitializeClusterError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CommonErrors;
/**
 * Claims an CloudHSM cluster by submitting the cluster certificate issued by your
 * issuing certificate authority (CA) and the CA's root certificate. Before you can claim a
 * cluster, you must sign the cluster's certificate signing request (CSR) with your issuing CA.
 * To get the cluster's CSR, use DescribeClusters.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM cluster in a different Amazon Web Services account.
 */
export const initializeCluster: API.OperationMethod<
  InitializeClusterRequest,
  InitializeClusterResponse,
  InitializeClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InitializeClusterRequest,
  output: InitializeClusterResponse,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InitializeCluster",
}));

export type ListTagsError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CloudHsmTagException
  | CommonErrors;
/**
 * Gets a list of tags for the specified CloudHSM cluster.
 *
 * This is a paginated operation, which means that each response might contain only a
 * subset of all the tags. When the response contains only a subset of tags, it includes a
 * `NextToken` value. Use this value in a subsequent `ListTags` request to
 * get more tags. When you receive a response with no `NextToken` (or an empty or null
 * value), that means there are no more tags to get.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM resource in a different Amazon Web Services account.
 */
export const listTags: API.PaginatedOperationMethod<
  ListTagsRequest,
  ListTagsResponse,
  ListTagsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTagsRequest,
  output: ListTagsResponse,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
    CloudHsmTagException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTags",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ModifyBackupAttributesError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CommonErrors;
/**
 * Modifies attributes for CloudHSM backup.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM backup in a different Amazon Web Services account.
 */
export const modifyBackupAttributes: API.OperationMethod<
  ModifyBackupAttributesRequest,
  ModifyBackupAttributesResponse,
  ModifyBackupAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyBackupAttributesRequest,
  output: ModifyBackupAttributesResponse,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyBackupAttributes",
}));

export type ModifyClusterError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CommonErrors;
/**
 * Modifies CloudHSM cluster.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM cluster in a different Amazon Web Services account.
 */
export const modifyCluster: API.OperationMethod<
  ModifyClusterRequest,
  ModifyClusterResponse,
  ModifyClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyClusterRequest,
  output: ModifyClusterResponse,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCluster",
}));

export type PutResourcePolicyError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CommonErrors;
/**
 * Creates or updates an CloudHSM resource policy. A resource policy helps you to define the IAM entity
 * (for example, an Amazon Web Services account) that can manage your CloudHSM resources. The following resources support
 * CloudHSM resource policies:
 *
 * - Backup - The resource policy allows you to describe the backup and restore a cluster from the backup in another Amazon Web Services account.
 *
 * In order to share a backup, it must be in a 'READY' state and you must own it.
 *
 * While you can share a backup using the CloudHSM PutResourcePolicy operation, we recommend using Resource Access Manager
 * (RAM) instead. Using RAM provides multiple benefits as it creates the policy for you, allows multiple resources to be shared at
 * one time, and increases the discoverability of shared resources. If you use PutResourcePolicy and want consumers to be able to
 * describe the backups you share with them, you must promote the backup to a standard RAM
 * Resource Share using the RAM PromoteResourceShareCreatedFromPolicy API operation.
 *
 * For more information, see Working with shared backups in the CloudHSM User Guide
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM resource in a different Amazon Web Services account.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutResourcePolicyRequest,
  output: PutResourcePolicyResponse,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type RestoreBackupError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CommonErrors;
/**
 * Restores a specified CloudHSM backup that is in the
 * `PENDING_DELETION` state. For more information on deleting a backup, see
 * DeleteBackup.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM backup in a different Amazon Web Services account.
 */
export const restoreBackup: API.OperationMethod<
  RestoreBackupRequest,
  RestoreBackupResponse,
  RestoreBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestoreBackupRequest,
  output: RestoreBackupResponse,
  errors: [
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreBackup",
}));

export type TagResourceError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceLimitExceededException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CloudHsmTagException
  | CommonErrors;
/**
 * Adds or overwrites one or more tags for the specified CloudHSM cluster.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM resource in a different Amazon Web Services account.
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
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceLimitExceededException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
    CloudHsmTagException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | CloudHsmAccessDeniedException
  | CloudHsmInternalFailureException
  | CloudHsmInvalidRequestException
  | CloudHsmResourceNotFoundException
  | CloudHsmServiceException
  | CloudHsmTagException
  | CommonErrors;
/**
 * Removes the specified tag or tags from the specified CloudHSM cluster.
 *
 * **Cross-account use:** No. You cannot perform this operation on an CloudHSM resource in a different Amazon Web Services account.
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
    CloudHsmAccessDeniedException,
    CloudHsmInternalFailureException,
    CloudHsmInvalidRequestException,
    CloudHsmResourceNotFoundException,
    CloudHsmServiceException,
    CloudHsmTagException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));
