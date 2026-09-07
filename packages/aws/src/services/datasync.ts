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
  sdkId: "DataSync",
  serviceShapeName: "FmrsService",
});
const auth = T.AwsAuthSigv4({ name: "datasync" });
const ver = T.ServiceVersion("2018-11-09");
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
              `https://datasync-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://datasync-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://datasync.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://datasync.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class InternalException
  extends /*@__PURE__*/ S.TaggedError<InternalException>()(
    "InternalException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      errorCode: S.optional(S.String),
    },
  ) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      errorCode: S.optional(S.String),
      datasyncErrorCode: S.optional(S.String),
    },
  ) {}
export class LocationAccessTestFailed
  extends /*@__PURE__*/ S.TaggedError<LocationAccessTestFailed>()(
    "LocationAccessTestFailed",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      errorCode: S.optional(S.String),
      datasyncErrorCode: S.optional(S.String),
    },
    T.SyntheticError({
      from: "InvalidRequestException",
      message: { includes: "location access test failed" },
    }),
  ).pipe(C.withRetryableError) {}
export class LocationNotFound
  extends /*@__PURE__*/ S.TaggedError<LocationNotFound>()(
    "LocationNotFound",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      errorCode: S.optional(S.String),
      datasyncErrorCode: S.optional(S.String),
    },
    T.SyntheticError({
      from: "InvalidRequestException",
      message: { matches: "^Location .* is not found" },
    }),
  ).pipe(C.withNotFoundError) {}
export class LocationRoleNotAssumable
  extends /*@__PURE__*/ S.TaggedError<LocationRoleNotAssumable>()(
    "LocationRoleNotAssumable",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      errorCode: S.optional(S.String),
      datasyncErrorCode: S.optional(S.String),
    },
    T.SyntheticError({
      from: "InvalidRequestException",
      message: { includes: "Invalid IAM role" },
    }),
  ).pipe(C.withRetryableError) {}
export class TaskNotFound
  extends /*@__PURE__*/ S.TaggedError<TaskNotFound>()(
    "TaskNotFound",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      errorCode: S.optional(S.String),
      datasyncErrorCode: S.optional(S.String),
    },
    T.SyntheticError({
      from: "InvalidRequestException",
      message: { matches: "^Task .* is not found" },
    }),
  ).pipe(C.withNotFoundError) {}
export type TaskExecutionArn = string;
export interface CancelTaskExecutionRequest {
  TaskExecutionArn: string;
}
export const CancelTaskExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TaskExecutionArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CancelTaskExecutionRequest",
}) as any as S.Schema<CancelTaskExecutionRequest>;
export interface CancelTaskExecutionResponse {}
export const CancelTaskExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelTaskExecutionResponse",
}) as any as S.Schema<CancelTaskExecutionResponse>;
export type ActivationKey = string;
export type TagValue = string;
export type TagKey = string;
export interface TagListEntry {
  Key: string;
  Value?: string;
}
export const TagListEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.optional(S.String) }),
).annotate({ identifier: "TagListEntry" }) as any as S.Schema<TagListEntry>;
export type InputTagList = TagListEntry[];
export const InputTagList = /*@__PURE__*/ S.Array(TagListEntry);
export type VpcEndpointId = string;
export type Ec2SubnetArn = string;
export type PLSubnetArnList = string[];
export const PLSubnetArnList = /*@__PURE__*/ S.Array(S.String);
export type Ec2SecurityGroupArn = string;
export type PLSecurityGroupArnList = string[];
export const PLSecurityGroupArnList = /*@__PURE__*/ S.Array(S.String);
export interface CreateAgentRequest {
  ActivationKey: string;
  AgentName?: string;
  Tags?: TagListEntry[];
  VpcEndpointId?: string;
  SubnetArns?: string[];
  SecurityGroupArns?: string[];
}
export const CreateAgentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActivationKey: S.String,
    AgentName: S.optional(S.String),
    Tags: S.optional(InputTagList),
    VpcEndpointId: S.optional(S.String),
    SubnetArns: S.optional(PLSubnetArnList),
    SecurityGroupArns: S.optional(PLSecurityGroupArnList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateAgentRequest",
}) as any as S.Schema<CreateAgentRequest>;
export type AgentArn = string;
export interface CreateAgentResponse {
  AgentArn?: string;
}
export const CreateAgentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AgentArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateAgentResponse",
}) as any as S.Schema<CreateAgentResponse>;
export type AzureBlobContainerUrl = string;
export type AzureBlobAuthenticationType = "SAS" | "NONE" | (string & {});
export const AzureBlobAuthenticationType = /*@__PURE__*/ S.String;

export type AzureBlobSasToken = string | redacted.Redacted<string>;
export interface AzureBlobSasConfiguration {
  Token: string | redacted.Redacted<string>;
}
export const AzureBlobSasConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Token: SensitiveString }),
).annotate({
  identifier: "AzureBlobSasConfiguration",
}) as any as S.Schema<AzureBlobSasConfiguration>;
export type AzureBlobType = "BLOCK" | (string & {});
export const AzureBlobType = /*@__PURE__*/ S.String;

export type AzureAccessTier = "HOT" | "COOL" | "ARCHIVE" | (string & {});
export const AzureAccessTier = /*@__PURE__*/ S.String;

export type AzureBlobSubdirectory = string;
export type AgentArnList = string[];
export const AgentArnList = /*@__PURE__*/ S.Array(S.String);
export type SecretArn = string;
export type KmsKeyArn = string;
export interface CmkSecretConfig {
  SecretArn?: string;
  KmsKeyArn?: string;
}
export const CmkSecretConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecretArn: S.optional(S.String),
    KmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CmkSecretConfig",
}) as any as S.Schema<CmkSecretConfig>;
export type IamRoleArnOrEmptyString = string;
export interface CustomSecretConfig {
  SecretArn?: string;
  SecretAccessRoleArn?: string;
}
export const CustomSecretConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecretArn: S.optional(S.String),
    SecretAccessRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CustomSecretConfig",
}) as any as S.Schema<CustomSecretConfig>;
export interface CreateLocationAzureBlobRequest {
  ContainerUrl: string;
  AuthenticationType: AzureBlobAuthenticationType;
  SasConfiguration?: AzureBlobSasConfiguration;
  BlobType?: AzureBlobType;
  AccessTier?: AzureAccessTier;
  Subdirectory?: string;
  AgentArns?: string[];
  Tags?: TagListEntry[];
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export const CreateLocationAzureBlobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerUrl: S.String,
    AuthenticationType: AzureBlobAuthenticationType,
    SasConfiguration: S.optional(AzureBlobSasConfiguration),
    BlobType: S.optional(AzureBlobType),
    AccessTier: S.optional(AzureAccessTier),
    Subdirectory: S.optional(S.String),
    AgentArns: S.optional(AgentArnList),
    Tags: S.optional(InputTagList),
    CmkSecretConfig: S.optional(CmkSecretConfig),
    CustomSecretConfig: S.optional(CustomSecretConfig),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateLocationAzureBlobRequest",
}) as any as S.Schema<CreateLocationAzureBlobRequest>;
export type LocationArn = string;
export interface CreateLocationAzureBlobResponse {
  LocationArn?: string;
}
export const CreateLocationAzureBlobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LocationArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateLocationAzureBlobResponse",
}) as any as S.Schema<CreateLocationAzureBlobResponse>;
export type EfsSubdirectory = string;
export type EfsFilesystemArn = string;
export type Ec2SecurityGroupArnList = string[];
export const Ec2SecurityGroupArnList = /*@__PURE__*/ S.Array(S.String);
export interface Ec2Config {
  SubnetArn: string;
  SecurityGroupArns: string[];
}
export const Ec2Config = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SubnetArn: S.String, SecurityGroupArns: Ec2SecurityGroupArnList }),
).annotate({ identifier: "Ec2Config" }) as any as S.Schema<Ec2Config>;
export type EfsAccessPointArn = string;
export type IamRoleArn = string;
export type EfsInTransitEncryption = "NONE" | "TLS1_2" | (string & {});
export const EfsInTransitEncryption = /*@__PURE__*/ S.String;

export interface CreateLocationEfsRequest {
  Subdirectory?: string;
  EfsFilesystemArn: string;
  Ec2Config: Ec2Config;
  Tags?: TagListEntry[];
  AccessPointArn?: string;
  FileSystemAccessRoleArn?: string;
  InTransitEncryption?: EfsInTransitEncryption;
}
export const CreateLocationEfsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Subdirectory: S.optional(S.String),
    EfsFilesystemArn: S.String,
    Ec2Config: Ec2Config,
    Tags: S.optional(InputTagList),
    AccessPointArn: S.optional(S.String),
    FileSystemAccessRoleArn: S.optional(S.String),
    InTransitEncryption: S.optional(EfsInTransitEncryption),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateLocationEfsRequest",
}) as any as S.Schema<CreateLocationEfsRequest>;
export interface CreateLocationEfsResponse {
  LocationArn?: string;
}
export const CreateLocationEfsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LocationArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateLocationEfsResponse",
}) as any as S.Schema<CreateLocationEfsResponse>;
export type FsxFilesystemArn = string;
export type FsxLustreSubdirectory = string;
export interface CreateLocationFsxLustreRequest {
  FsxFilesystemArn: string;
  SecurityGroupArns: string[];
  Subdirectory?: string;
  Tags?: TagListEntry[];
}
export const CreateLocationFsxLustreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FsxFilesystemArn: S.String,
    SecurityGroupArns: Ec2SecurityGroupArnList,
    Subdirectory: S.optional(S.String),
    Tags: S.optional(InputTagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateLocationFsxLustreRequest",
}) as any as S.Schema<CreateLocationFsxLustreRequest>;
export interface CreateLocationFsxLustreResponse {
  LocationArn?: string;
}
export const CreateLocationFsxLustreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LocationArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateLocationFsxLustreResponse",
}) as any as S.Schema<CreateLocationFsxLustreResponse>;
export type NfsVersion =
  | "AUTOMATIC"
  | "NFS3"
  | "NFS4_0"
  | "NFS4_1"
  | (string & {});
export const NfsVersion = /*@__PURE__*/ S.String;

export interface NfsMountOptions {
  Version?: NfsVersion;
}
export const NfsMountOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Version: S.optional(NfsVersion) }),
).annotate({
  identifier: "NfsMountOptions",
}) as any as S.Schema<NfsMountOptions>;
export interface FsxProtocolNfs {
  MountOptions?: NfsMountOptions;
}
export const FsxProtocolNfs = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MountOptions: S.optional(NfsMountOptions) }),
).annotate({ identifier: "FsxProtocolNfs" }) as any as S.Schema<FsxProtocolNfs>;
export type SmbDomain = string;
export type SmbVersion =
  | "AUTOMATIC"
  | "SMB2"
  | "SMB3"
  | "SMB1"
  | "SMB2_0"
  | (string & {});
export const SmbVersion = /*@__PURE__*/ S.String;

export interface SmbMountOptions {
  Version?: SmbVersion;
}
export const SmbMountOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Version: S.optional(SmbVersion) }),
).annotate({
  identifier: "SmbMountOptions",
}) as any as S.Schema<SmbMountOptions>;
export type SmbPassword = string | redacted.Redacted<string>;
export type SmbUser = string;
export interface ManagedSecretConfig {
  SecretArn?: string;
}
export const ManagedSecretConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SecretArn: S.optional(S.String) }),
).annotate({
  identifier: "ManagedSecretConfig",
}) as any as S.Schema<ManagedSecretConfig>;
export interface FsxProtocolSmb {
  Domain?: string;
  MountOptions?: SmbMountOptions;
  Password?: string | redacted.Redacted<string>;
  User: string;
  ManagedSecretConfig?: ManagedSecretConfig;
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export const FsxProtocolSmb = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Domain: S.optional(S.String),
    MountOptions: S.optional(SmbMountOptions),
    Password: S.optional(SensitiveString),
    User: S.String,
    ManagedSecretConfig: S.optional(ManagedSecretConfig),
    CmkSecretConfig: S.optional(CmkSecretConfig),
    CustomSecretConfig: S.optional(CustomSecretConfig),
  }),
).annotate({ identifier: "FsxProtocolSmb" }) as any as S.Schema<FsxProtocolSmb>;
export interface FsxProtocol {
  NFS?: FsxProtocolNfs;
  SMB?: FsxProtocolSmb;
}
export const FsxProtocol = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NFS: S.optional(FsxProtocolNfs),
    SMB: S.optional(FsxProtocolSmb),
  }),
).annotate({ identifier: "FsxProtocol" }) as any as S.Schema<FsxProtocol>;
export type StorageVirtualMachineArn = string;
export type FsxOntapSubdirectory = string;
export interface CreateLocationFsxOntapRequest {
  Protocol: FsxProtocol;
  SecurityGroupArns: string[];
  StorageVirtualMachineArn: string;
  Subdirectory?: string;
  Tags?: TagListEntry[];
}
export const CreateLocationFsxOntapRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Protocol: FsxProtocol,
    SecurityGroupArns: Ec2SecurityGroupArnList,
    StorageVirtualMachineArn: S.String,
    Subdirectory: S.optional(S.String),
    Tags: S.optional(InputTagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateLocationFsxOntapRequest",
}) as any as S.Schema<CreateLocationFsxOntapRequest>;
export interface CreateLocationFsxOntapResponse {
  LocationArn?: string;
}
export const CreateLocationFsxOntapResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LocationArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateLocationFsxOntapResponse",
}) as any as S.Schema<CreateLocationFsxOntapResponse>;
export type FsxOpenZfsSubdirectory = string;
export interface CreateLocationFsxOpenZfsRequest {
  FsxFilesystemArn: string;
  Protocol: FsxProtocol;
  SecurityGroupArns: string[];
  Subdirectory?: string;
  Tags?: TagListEntry[];
}
export const CreateLocationFsxOpenZfsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FsxFilesystemArn: S.String,
    Protocol: FsxProtocol,
    SecurityGroupArns: Ec2SecurityGroupArnList,
    Subdirectory: S.optional(S.String),
    Tags: S.optional(InputTagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateLocationFsxOpenZfsRequest",
}) as any as S.Schema<CreateLocationFsxOpenZfsRequest>;
export interface CreateLocationFsxOpenZfsResponse {
  LocationArn?: string;
}
export const CreateLocationFsxOpenZfsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LocationArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateLocationFsxOpenZfsResponse",
}) as any as S.Schema<CreateLocationFsxOpenZfsResponse>;
export type FsxWindowsSubdirectory = string;
export interface CreateLocationFsxWindowsRequest {
  Subdirectory?: string;
  FsxFilesystemArn: string;
  SecurityGroupArns: string[];
  Tags?: TagListEntry[];
  User: string;
  Domain?: string;
  Password?: string | redacted.Redacted<string>;
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export const CreateLocationFsxWindowsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Subdirectory: S.optional(S.String),
    FsxFilesystemArn: S.String,
    SecurityGroupArns: Ec2SecurityGroupArnList,
    Tags: S.optional(InputTagList),
    User: S.String,
    Domain: S.optional(S.String),
    Password: S.optional(SensitiveString),
    CmkSecretConfig: S.optional(CmkSecretConfig),
    CustomSecretConfig: S.optional(CustomSecretConfig),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateLocationFsxWindowsRequest",
}) as any as S.Schema<CreateLocationFsxWindowsRequest>;
export interface CreateLocationFsxWindowsResponse {
  LocationArn?: string;
}
export const CreateLocationFsxWindowsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LocationArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateLocationFsxWindowsResponse",
}) as any as S.Schema<CreateLocationFsxWindowsResponse>;
export type HdfsSubdirectory = string;
export type HdfsServerHostname = string;
export type HdfsServerPort = number;
export interface HdfsNameNode {
  Hostname: string;
  Port: number;
}
export const HdfsNameNode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Hostname: S.String, Port: S.Number }),
).annotate({ identifier: "HdfsNameNode" }) as any as S.Schema<HdfsNameNode>;
export type HdfsNameNodeList = HdfsNameNode[];
export const HdfsNameNodeList = /*@__PURE__*/ S.Array(HdfsNameNode);
export type HdfsBlockSize = number;
export type HdfsReplicationFactor = number;
export type KmsKeyProviderUri = string;
export type HdfsRpcProtection =
  | "DISABLED"
  | "AUTHENTICATION"
  | "INTEGRITY"
  | "PRIVACY"
  | (string & {});
export const HdfsRpcProtection = /*@__PURE__*/ S.String;

export type HdfsDataTransferProtection =
  | "DISABLED"
  | "AUTHENTICATION"
  | "INTEGRITY"
  | "PRIVACY"
  | (string & {});
export const HdfsDataTransferProtection = /*@__PURE__*/ S.String;

export interface QopConfiguration {
  RpcProtection?: HdfsRpcProtection;
  DataTransferProtection?: HdfsDataTransferProtection;
}
export const QopConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RpcProtection: S.optional(HdfsRpcProtection),
    DataTransferProtection: S.optional(HdfsDataTransferProtection),
  }),
).annotate({
  identifier: "QopConfiguration",
}) as any as S.Schema<QopConfiguration>;
export type HdfsAuthenticationType = "SIMPLE" | "KERBEROS" | (string & {});
export const HdfsAuthenticationType = /*@__PURE__*/ S.String;

export type HdfsUser = string;
export type KerberosPrincipal = string;
export type KerberosKeytabFile = Uint8Array;
export type KerberosKrb5ConfFile = Uint8Array;
export interface CreateLocationHdfsRequest {
  Subdirectory?: string;
  NameNodes: HdfsNameNode[];
  BlockSize?: number;
  ReplicationFactor?: number;
  KmsKeyProviderUri?: string;
  QopConfiguration?: QopConfiguration;
  AuthenticationType: HdfsAuthenticationType;
  SimpleUser?: string;
  KerberosPrincipal?: string;
  KerberosKeytab?: Uint8Array;
  KerberosKrb5Conf?: Uint8Array;
  AgentArns: string[];
  Tags?: TagListEntry[];
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export const CreateLocationHdfsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Subdirectory: S.optional(S.String),
    NameNodes: HdfsNameNodeList,
    BlockSize: S.optional(S.Number),
    ReplicationFactor: S.optional(S.Number),
    KmsKeyProviderUri: S.optional(S.String),
    QopConfiguration: S.optional(QopConfiguration),
    AuthenticationType: HdfsAuthenticationType,
    SimpleUser: S.optional(S.String),
    KerberosPrincipal: S.optional(S.String),
    KerberosKeytab: S.optional(T.Blob),
    KerberosKrb5Conf: S.optional(T.Blob),
    AgentArns: AgentArnList,
    Tags: S.optional(InputTagList),
    CmkSecretConfig: S.optional(CmkSecretConfig),
    CustomSecretConfig: S.optional(CustomSecretConfig),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateLocationHdfsRequest",
}) as any as S.Schema<CreateLocationHdfsRequest>;
export interface CreateLocationHdfsResponse {
  LocationArn?: string;
}
export const CreateLocationHdfsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LocationArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateLocationHdfsResponse",
}) as any as S.Schema<CreateLocationHdfsResponse>;
export type NfsSubdirectory = string;
export type ServerHostname = string;
export interface OnPremConfig {
  AgentArns: string[];
}
export const OnPremConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AgentArns: AgentArnList }),
).annotate({ identifier: "OnPremConfig" }) as any as S.Schema<OnPremConfig>;
export interface CreateLocationNfsRequest {
  Subdirectory: string;
  ServerHostname: string;
  OnPremConfig: OnPremConfig;
  MountOptions?: NfsMountOptions;
  Tags?: TagListEntry[];
}
export const CreateLocationNfsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Subdirectory: S.String,
    ServerHostname: S.String,
    OnPremConfig: OnPremConfig,
    MountOptions: S.optional(NfsMountOptions),
    Tags: S.optional(InputTagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateLocationNfsRequest",
}) as any as S.Schema<CreateLocationNfsRequest>;
export interface CreateLocationNfsResponse {
  LocationArn?: string;
}
export const CreateLocationNfsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LocationArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateLocationNfsResponse",
}) as any as S.Schema<CreateLocationNfsResponse>;
export type ObjectStorageServerPort = number;
export type ObjectStorageServerProtocol = "HTTPS" | "HTTP" | (string & {});
export const ObjectStorageServerProtocol = /*@__PURE__*/ S.String;

export type S3Subdirectory = string;
export type ObjectStorageBucketName = string;
export type ObjectStorageAccessKey = string;
export type ObjectStorageSecretKey = string | redacted.Redacted<string>;
export type ObjectStorageCertificate = Uint8Array;
export interface CreateLocationObjectStorageRequest {
  ServerHostname: string;
  ServerPort?: number;
  ServerProtocol?: ObjectStorageServerProtocol;
  Subdirectory?: string;
  BucketName: string;
  AccessKey?: string;
  SecretKey?: string | redacted.Redacted<string>;
  AgentArns?: string[];
  Tags?: TagListEntry[];
  ServerCertificate?: Uint8Array;
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export const CreateLocationObjectStorageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServerHostname: S.String,
    ServerPort: S.optional(S.Number),
    ServerProtocol: S.optional(ObjectStorageServerProtocol),
    Subdirectory: S.optional(S.String),
    BucketName: S.String,
    AccessKey: S.optional(S.String),
    SecretKey: S.optional(SensitiveString),
    AgentArns: S.optional(AgentArnList),
    Tags: S.optional(InputTagList),
    ServerCertificate: S.optional(T.Blob),
    CmkSecretConfig: S.optional(CmkSecretConfig),
    CustomSecretConfig: S.optional(CustomSecretConfig),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateLocationObjectStorageRequest",
}) as any as S.Schema<CreateLocationObjectStorageRequest>;
export interface CreateLocationObjectStorageResponse {
  LocationArn?: string;
}
export const CreateLocationObjectStorageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LocationArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateLocationObjectStorageResponse",
}) as any as S.Schema<CreateLocationObjectStorageResponse>;
export type S3BucketArn = string;
export type S3StorageClass =
  | "STANDARD"
  | "STANDARD_IA"
  | "ONEZONE_IA"
  | "INTELLIGENT_TIERING"
  | "GLACIER"
  | "DEEP_ARCHIVE"
  | "OUTPOSTS"
  | "GLACIER_INSTANT_RETRIEVAL"
  | (string & {});
export const S3StorageClass = /*@__PURE__*/ S.String;

export interface S3Config {
  BucketAccessRoleArn: string;
}
export const S3Config = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BucketAccessRoleArn: S.String }),
).annotate({ identifier: "S3Config" }) as any as S.Schema<S3Config>;
export interface CreateLocationS3Request {
  Subdirectory?: string;
  S3BucketArn: string;
  S3StorageClass?: S3StorageClass;
  S3Config: S3Config;
  AgentArns?: string[];
  Tags?: TagListEntry[];
}
export const CreateLocationS3Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Subdirectory: S.optional(S.String),
    S3BucketArn: S.String,
    S3StorageClass: S.optional(S3StorageClass),
    S3Config: S3Config,
    AgentArns: S.optional(AgentArnList),
    Tags: S.optional(InputTagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateLocationS3Request",
}) as any as S.Schema<CreateLocationS3Request>;
export interface CreateLocationS3Response {
  LocationArn?: string;
}
export const CreateLocationS3Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LocationArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateLocationS3Response",
}) as any as S.Schema<CreateLocationS3Response>;
export type SmbSubdirectory = string;
export type SmbAuthenticationType = "NTLM" | "KERBEROS" | (string & {});
export const SmbAuthenticationType = /*@__PURE__*/ S.String;

export type ServerIpAddress = string;
export type DnsIpList = string[];
export const DnsIpList = /*@__PURE__*/ S.Array(S.String);
export interface CreateLocationSmbRequest {
  Subdirectory: string;
  ServerHostname: string;
  User?: string;
  Domain?: string;
  Password?: string | redacted.Redacted<string>;
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
  AgentArns: string[];
  MountOptions?: SmbMountOptions;
  Tags?: TagListEntry[];
  AuthenticationType?: SmbAuthenticationType;
  DnsIpAddresses?: string[];
  KerberosPrincipal?: string;
  KerberosKeytab?: Uint8Array;
  KerberosKrb5Conf?: Uint8Array;
}
export const CreateLocationSmbRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Subdirectory: S.String,
    ServerHostname: S.String,
    User: S.optional(S.String),
    Domain: S.optional(S.String),
    Password: S.optional(SensitiveString),
    CmkSecretConfig: S.optional(CmkSecretConfig),
    CustomSecretConfig: S.optional(CustomSecretConfig),
    AgentArns: AgentArnList,
    MountOptions: S.optional(SmbMountOptions),
    Tags: S.optional(InputTagList),
    AuthenticationType: S.optional(SmbAuthenticationType),
    DnsIpAddresses: S.optional(DnsIpList),
    KerberosPrincipal: S.optional(S.String),
    KerberosKeytab: S.optional(T.Blob),
    KerberosKrb5Conf: S.optional(T.Blob),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateLocationSmbRequest",
}) as any as S.Schema<CreateLocationSmbRequest>;
export interface CreateLocationSmbResponse {
  LocationArn?: string;
}
export const CreateLocationSmbResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LocationArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateLocationSmbResponse",
}) as any as S.Schema<CreateLocationSmbResponse>;
export type LogGroupArn = string;
export type VerifyMode =
  | "POINT_IN_TIME_CONSISTENT"
  | "ONLY_FILES_TRANSFERRED"
  | "NONE"
  | (string & {});
export const VerifyMode = /*@__PURE__*/ S.String;

export type OverwriteMode = "ALWAYS" | "NEVER" | (string & {});
export const OverwriteMode = /*@__PURE__*/ S.String;

export type Atime = "NONE" | "BEST_EFFORT" | (string & {});
export const Atime = /*@__PURE__*/ S.String;

export type Mtime = "NONE" | "PRESERVE" | (string & {});
export const Mtime = /*@__PURE__*/ S.String;

export type Uid = "NONE" | "INT_VALUE" | "NAME" | "BOTH" | (string & {});
export const Uid = /*@__PURE__*/ S.String;

export type Gid = "NONE" | "INT_VALUE" | "NAME" | "BOTH" | (string & {});
export const Gid = /*@__PURE__*/ S.String;

export type PreserveDeletedFiles = "PRESERVE" | "REMOVE" | (string & {});
export const PreserveDeletedFiles = /*@__PURE__*/ S.String;

export type PreserveDevices = "NONE" | "PRESERVE" | (string & {});
export const PreserveDevices = /*@__PURE__*/ S.String;

export type PosixPermissions = "NONE" | "PRESERVE" | (string & {});
export const PosixPermissions = /*@__PURE__*/ S.String;

export type BytesPerSecond = number;
export type TaskQueueing = "ENABLED" | "DISABLED" | (string & {});
export const TaskQueueing = /*@__PURE__*/ S.String;

export type LogLevel = "OFF" | "BASIC" | "TRANSFER" | (string & {});
export const LogLevel = /*@__PURE__*/ S.String;

export type TransferMode = "CHANGED" | "ALL" | (string & {});
export const TransferMode = /*@__PURE__*/ S.String;

export type SmbSecurityDescriptorCopyFlags =
  | "NONE"
  | "OWNER_DACL"
  | "OWNER_DACL_SACL"
  | (string & {});
export const SmbSecurityDescriptorCopyFlags = /*@__PURE__*/ S.String;

export type ObjectTags = "PRESERVE" | "NONE" | (string & {});
export const ObjectTags = /*@__PURE__*/ S.String;

export interface Options {
  VerifyMode?: VerifyMode;
  OverwriteMode?: OverwriteMode;
  Atime?: Atime;
  Mtime?: Mtime;
  Uid?: Uid;
  Gid?: Gid;
  PreserveDeletedFiles?: PreserveDeletedFiles;
  PreserveDevices?: PreserveDevices;
  PosixPermissions?: PosixPermissions;
  BytesPerSecond?: number;
  TaskQueueing?: TaskQueueing;
  LogLevel?: LogLevel;
  TransferMode?: TransferMode;
  SecurityDescriptorCopyFlags?: SmbSecurityDescriptorCopyFlags;
  ObjectTags?: ObjectTags;
}
export const Options = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VerifyMode: S.optional(VerifyMode),
    OverwriteMode: S.optional(OverwriteMode),
    Atime: S.optional(Atime),
    Mtime: S.optional(Mtime),
    Uid: S.optional(Uid),
    Gid: S.optional(Gid),
    PreserveDeletedFiles: S.optional(PreserveDeletedFiles),
    PreserveDevices: S.optional(PreserveDevices),
    PosixPermissions: S.optional(PosixPermissions),
    BytesPerSecond: S.optional(S.Number),
    TaskQueueing: S.optional(TaskQueueing),
    LogLevel: S.optional(LogLevel),
    TransferMode: S.optional(TransferMode),
    SecurityDescriptorCopyFlags: S.optional(SmbSecurityDescriptorCopyFlags),
    ObjectTags: S.optional(ObjectTags),
  }),
).annotate({ identifier: "Options" }) as any as S.Schema<Options>;
export type FilterType = "SIMPLE_PATTERN" | (string & {});
export const FilterType = /*@__PURE__*/ S.String;

export type FilterValue = string;
export interface FilterRule {
  FilterType?: FilterType;
  Value?: string;
}
export const FilterRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FilterType: S.optional(FilterType), Value: S.optional(S.String) }),
).annotate({ identifier: "FilterRule" }) as any as S.Schema<FilterRule>;
export type FilterList = FilterRule[];
export const FilterList = /*@__PURE__*/ S.Array(FilterRule);
export type ScheduleExpressionCron = string;
export type ScheduleStatus = "ENABLED" | "DISABLED" | (string & {});
export const ScheduleStatus = /*@__PURE__*/ S.String;

export interface TaskSchedule {
  ScheduleExpression: string;
  Status?: ScheduleStatus;
}
export const TaskSchedule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScheduleExpression: S.String,
    Status: S.optional(ScheduleStatus),
  }),
).annotate({ identifier: "TaskSchedule" }) as any as S.Schema<TaskSchedule>;
export type ManifestAction = "TRANSFER" | (string & {});
export const ManifestAction = /*@__PURE__*/ S.String;

export type ManifestFormat = "CSV" | (string & {});
export const ManifestFormat = /*@__PURE__*/ S.String;

export type S3ObjectVersionId = string;
export interface S3ManifestConfig {
  ManifestObjectPath: string;
  BucketAccessRoleArn: string;
  S3BucketArn: string;
  ManifestObjectVersionId?: string;
}
export const S3ManifestConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManifestObjectPath: S.String,
    BucketAccessRoleArn: S.String,
    S3BucketArn: S.String,
    ManifestObjectVersionId: S.optional(S.String),
  }),
).annotate({
  identifier: "S3ManifestConfig",
}) as any as S.Schema<S3ManifestConfig>;
export interface SourceManifestConfig {
  S3: S3ManifestConfig;
}
export const SourceManifestConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3: S3ManifestConfig }),
).annotate({
  identifier: "SourceManifestConfig",
}) as any as S.Schema<SourceManifestConfig>;
export interface ManifestConfig {
  Action?: ManifestAction;
  Format?: ManifestFormat;
  Source?: SourceManifestConfig;
}
export const ManifestConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.optional(ManifestAction),
    Format: S.optional(ManifestFormat),
    Source: S.optional(SourceManifestConfig),
  }),
).annotate({ identifier: "ManifestConfig" }) as any as S.Schema<ManifestConfig>;
export interface ReportDestinationS3 {
  Subdirectory?: string;
  S3BucketArn: string;
  BucketAccessRoleArn: string;
}
export const ReportDestinationS3 = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Subdirectory: S.optional(S.String),
    S3BucketArn: S.String,
    BucketAccessRoleArn: S.String,
  }),
).annotate({
  identifier: "ReportDestinationS3",
}) as any as S.Schema<ReportDestinationS3>;
export interface ReportDestination {
  S3?: ReportDestinationS3;
}
export const ReportDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3: S.optional(ReportDestinationS3) }),
).annotate({
  identifier: "ReportDestination",
}) as any as S.Schema<ReportDestination>;
export type ReportOutputType = "SUMMARY_ONLY" | "STANDARD" | (string & {});
export const ReportOutputType = /*@__PURE__*/ S.String;

export type ReportLevel =
  | "ERRORS_ONLY"
  | "SUCCESSES_AND_ERRORS"
  | (string & {});
export const ReportLevel = /*@__PURE__*/ S.String;

export type ObjectVersionIds = "INCLUDE" | "NONE" | (string & {});
export const ObjectVersionIds = /*@__PURE__*/ S.String;

export interface ReportOverride {
  ReportLevel?: ReportLevel;
}
export const ReportOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReportLevel: S.optional(ReportLevel) }),
).annotate({ identifier: "ReportOverride" }) as any as S.Schema<ReportOverride>;
export interface ReportOverrides {
  Transferred?: ReportOverride;
  Verified?: ReportOverride;
  Deleted?: ReportOverride;
  Skipped?: ReportOverride;
}
export const ReportOverrides = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Transferred: S.optional(ReportOverride),
    Verified: S.optional(ReportOverride),
    Deleted: S.optional(ReportOverride),
    Skipped: S.optional(ReportOverride),
  }),
).annotate({
  identifier: "ReportOverrides",
}) as any as S.Schema<ReportOverrides>;
export interface TaskReportConfig {
  Destination?: ReportDestination;
  OutputType?: ReportOutputType;
  ReportLevel?: ReportLevel;
  ObjectVersionIds?: ObjectVersionIds;
  Overrides?: ReportOverrides;
}
export const TaskReportConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Destination: S.optional(ReportDestination),
    OutputType: S.optional(ReportOutputType),
    ReportLevel: S.optional(ReportLevel),
    ObjectVersionIds: S.optional(ObjectVersionIds),
    Overrides: S.optional(ReportOverrides),
  }),
).annotate({
  identifier: "TaskReportConfig",
}) as any as S.Schema<TaskReportConfig>;
export type TaskMode = "BASIC" | "ENHANCED" | (string & {});
export const TaskMode = /*@__PURE__*/ S.String;

export interface CreateTaskRequest {
  SourceLocationArn: string;
  DestinationLocationArn: string;
  CloudWatchLogGroupArn?: string;
  Name?: string;
  Options?: Options;
  Excludes?: FilterRule[];
  Schedule?: TaskSchedule;
  Tags?: TagListEntry[];
  Includes?: FilterRule[];
  ManifestConfig?: ManifestConfig;
  TaskReportConfig?: TaskReportConfig;
  TaskMode?: TaskMode;
}
export const CreateTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceLocationArn: S.String,
    DestinationLocationArn: S.String,
    CloudWatchLogGroupArn: S.optional(S.String),
    Name: S.optional(S.String),
    Options: S.optional(Options),
    Excludes: S.optional(FilterList),
    Schedule: S.optional(TaskSchedule),
    Tags: S.optional(InputTagList),
    Includes: S.optional(FilterList),
    ManifestConfig: S.optional(ManifestConfig),
    TaskReportConfig: S.optional(TaskReportConfig),
    TaskMode: S.optional(TaskMode),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateTaskRequest",
}) as any as S.Schema<CreateTaskRequest>;
export type TaskArn = string;
export interface CreateTaskResponse {
  TaskArn?: string;
}
export const CreateTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TaskArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateTaskResponse",
}) as any as S.Schema<CreateTaskResponse>;
export interface DeleteAgentRequest {
  AgentArn: string;
}
export const DeleteAgentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AgentArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteAgentRequest",
}) as any as S.Schema<DeleteAgentRequest>;
export interface DeleteAgentResponse {}
export const DeleteAgentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAgentResponse",
}) as any as S.Schema<DeleteAgentResponse>;
export interface DeleteLocationRequest {
  LocationArn: string;
}
export const DeleteLocationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LocationArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteLocationRequest",
}) as any as S.Schema<DeleteLocationRequest>;
export interface DeleteLocationResponse {}
export const DeleteLocationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteLocationResponse",
}) as any as S.Schema<DeleteLocationResponse>;
export interface DeleteTaskRequest {
  TaskArn: string;
}
export const DeleteTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TaskArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteTaskRequest",
}) as any as S.Schema<DeleteTaskRequest>;
export interface DeleteTaskResponse {}
export const DeleteTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTaskResponse",
}) as any as S.Schema<DeleteTaskResponse>;
export interface DescribeAgentRequest {
  AgentArn: string;
}
export const DescribeAgentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AgentArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeAgentRequest",
}) as any as S.Schema<DescribeAgentRequest>;
export type AgentStatus = "ONLINE" | "OFFLINE" | (string & {});
export const AgentStatus = /*@__PURE__*/ S.String;

export type EndpointType =
  | "PUBLIC"
  | "PRIVATE_LINK"
  | "FIPS"
  | "FIPS_PRIVATE_LINK"
  | (string & {});
export const EndpointType = /*@__PURE__*/ S.String;

export type Endpoint = string;
export interface PrivateLinkConfig {
  VpcEndpointId?: string;
  PrivateLinkEndpoint?: string;
  SubnetArns?: string[];
  SecurityGroupArns?: string[];
}
export const PrivateLinkConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcEndpointId: S.optional(S.String),
    PrivateLinkEndpoint: S.optional(S.String),
    SubnetArns: S.optional(PLSubnetArnList),
    SecurityGroupArns: S.optional(PLSecurityGroupArnList),
  }),
).annotate({
  identifier: "PrivateLinkConfig",
}) as any as S.Schema<PrivateLinkConfig>;
export type AgentVersion = string;
export interface Platform {
  Version?: string;
}
export const Platform = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Version: S.optional(S.String) }),
).annotate({ identifier: "Platform" }) as any as S.Schema<Platform>;
export interface DescribeAgentResponse {
  AgentArn?: string;
  Name?: string;
  Status?: AgentStatus;
  LastConnectionTime?: Date;
  CreationTime?: Date;
  EndpointType?: EndpointType;
  PrivateLinkConfig?: PrivateLinkConfig;
  Platform?: Platform;
}
export const DescribeAgentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AgentArn: S.optional(S.String),
    Name: S.optional(S.String),
    Status: S.optional(AgentStatus),
    LastConnectionTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndpointType: S.optional(EndpointType),
    PrivateLinkConfig: S.optional(PrivateLinkConfig),
    Platform: S.optional(Platform),
  }),
).annotate({
  identifier: "DescribeAgentResponse",
}) as any as S.Schema<DescribeAgentResponse>;
export interface DescribeLocationAzureBlobRequest {
  LocationArn: string;
}
export const DescribeLocationAzureBlobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LocationArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeLocationAzureBlobRequest",
}) as any as S.Schema<DescribeLocationAzureBlobRequest>;
export type LocationUri = string;
export interface DescribeLocationAzureBlobResponse {
  LocationArn?: string;
  LocationUri?: string;
  AuthenticationType?: AzureBlobAuthenticationType;
  BlobType?: AzureBlobType;
  AccessTier?: AzureAccessTier;
  AgentArns?: string[];
  CreationTime?: Date;
  ManagedSecretConfig?: ManagedSecretConfig;
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export const DescribeLocationAzureBlobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocationArn: S.optional(S.String),
    LocationUri: S.optional(S.String),
    AuthenticationType: S.optional(AzureBlobAuthenticationType),
    BlobType: S.optional(AzureBlobType),
    AccessTier: S.optional(AzureAccessTier),
    AgentArns: S.optional(AgentArnList),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ManagedSecretConfig: S.optional(ManagedSecretConfig),
    CmkSecretConfig: S.optional(CmkSecretConfig),
    CustomSecretConfig: S.optional(CustomSecretConfig),
  }),
).annotate({
  identifier: "DescribeLocationAzureBlobResponse",
}) as any as S.Schema<DescribeLocationAzureBlobResponse>;
export interface DescribeLocationEfsRequest {
  LocationArn: string;
}
export const DescribeLocationEfsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LocationArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeLocationEfsRequest",
}) as any as S.Schema<DescribeLocationEfsRequest>;
export interface DescribeLocationEfsResponse {
  LocationArn?: string;
  LocationUri?: string;
  Ec2Config?: Ec2Config;
  CreationTime?: Date;
  AccessPointArn?: string;
  FileSystemAccessRoleArn?: string;
  InTransitEncryption?: EfsInTransitEncryption;
}
export const DescribeLocationEfsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocationArn: S.optional(S.String),
    LocationUri: S.optional(S.String),
    Ec2Config: S.optional(Ec2Config),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    AccessPointArn: S.optional(S.String),
    FileSystemAccessRoleArn: S.optional(S.String),
    InTransitEncryption: S.optional(EfsInTransitEncryption),
  }),
).annotate({
  identifier: "DescribeLocationEfsResponse",
}) as any as S.Schema<DescribeLocationEfsResponse>;
export interface DescribeLocationFsxLustreRequest {
  LocationArn: string;
}
export const DescribeLocationFsxLustreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LocationArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeLocationFsxLustreRequest",
}) as any as S.Schema<DescribeLocationFsxLustreRequest>;
export interface DescribeLocationFsxLustreResponse {
  LocationArn?: string;
  LocationUri?: string;
  SecurityGroupArns?: string[];
  CreationTime?: Date;
}
export const DescribeLocationFsxLustreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocationArn: S.optional(S.String),
    LocationUri: S.optional(S.String),
    SecurityGroupArns: S.optional(Ec2SecurityGroupArnList),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DescribeLocationFsxLustreResponse",
}) as any as S.Schema<DescribeLocationFsxLustreResponse>;
export interface DescribeLocationFsxOntapRequest {
  LocationArn: string;
}
export const DescribeLocationFsxOntapRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LocationArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeLocationFsxOntapRequest",
}) as any as S.Schema<DescribeLocationFsxOntapRequest>;
export interface DescribeLocationFsxOntapResponse {
  CreationTime?: Date;
  LocationArn?: string;
  LocationUri?: string;
  Protocol?: FsxProtocol;
  SecurityGroupArns?: string[];
  StorageVirtualMachineArn?: string;
  FsxFilesystemArn?: string;
}
export const DescribeLocationFsxOntapResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LocationArn: S.optional(S.String),
    LocationUri: S.optional(S.String),
    Protocol: S.optional(FsxProtocol),
    SecurityGroupArns: S.optional(Ec2SecurityGroupArnList),
    StorageVirtualMachineArn: S.optional(S.String),
    FsxFilesystemArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeLocationFsxOntapResponse",
}) as any as S.Schema<DescribeLocationFsxOntapResponse>;
export interface DescribeLocationFsxOpenZfsRequest {
  LocationArn: string;
}
export const DescribeLocationFsxOpenZfsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LocationArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeLocationFsxOpenZfsRequest",
}) as any as S.Schema<DescribeLocationFsxOpenZfsRequest>;
export interface DescribeLocationFsxOpenZfsResponse {
  LocationArn?: string;
  LocationUri?: string;
  SecurityGroupArns?: string[];
  Protocol?: FsxProtocol;
  CreationTime?: Date;
}
export const DescribeLocationFsxOpenZfsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocationArn: S.optional(S.String),
    LocationUri: S.optional(S.String),
    SecurityGroupArns: S.optional(Ec2SecurityGroupArnList),
    Protocol: S.optional(FsxProtocol),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DescribeLocationFsxOpenZfsResponse",
}) as any as S.Schema<DescribeLocationFsxOpenZfsResponse>;
export interface DescribeLocationFsxWindowsRequest {
  LocationArn: string;
}
export const DescribeLocationFsxWindowsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LocationArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeLocationFsxWindowsRequest",
}) as any as S.Schema<DescribeLocationFsxWindowsRequest>;
export interface DescribeLocationFsxWindowsResponse {
  LocationArn?: string;
  LocationUri?: string;
  SecurityGroupArns?: string[];
  CreationTime?: Date;
  User?: string;
  Domain?: string;
  ManagedSecretConfig?: ManagedSecretConfig;
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export const DescribeLocationFsxWindowsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocationArn: S.optional(S.String),
    LocationUri: S.optional(S.String),
    SecurityGroupArns: S.optional(Ec2SecurityGroupArnList),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    User: S.optional(S.String),
    Domain: S.optional(S.String),
    ManagedSecretConfig: S.optional(ManagedSecretConfig),
    CmkSecretConfig: S.optional(CmkSecretConfig),
    CustomSecretConfig: S.optional(CustomSecretConfig),
  }),
).annotate({
  identifier: "DescribeLocationFsxWindowsResponse",
}) as any as S.Schema<DescribeLocationFsxWindowsResponse>;
export interface DescribeLocationHdfsRequest {
  LocationArn: string;
}
export const DescribeLocationHdfsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LocationArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeLocationHdfsRequest",
}) as any as S.Schema<DescribeLocationHdfsRequest>;
export interface DescribeLocationHdfsResponse {
  LocationArn?: string;
  LocationUri?: string;
  NameNodes?: HdfsNameNode[];
  BlockSize?: number;
  ReplicationFactor?: number;
  KmsKeyProviderUri?: string;
  QopConfiguration?: QopConfiguration;
  AuthenticationType?: HdfsAuthenticationType;
  SimpleUser?: string;
  KerberosPrincipal?: string;
  AgentArns?: string[];
  CreationTime?: Date;
  ManagedSecretConfig?: ManagedSecretConfig;
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export const DescribeLocationHdfsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocationArn: S.optional(S.String),
    LocationUri: S.optional(S.String),
    NameNodes: S.optional(HdfsNameNodeList),
    BlockSize: S.optional(S.Number),
    ReplicationFactor: S.optional(S.Number),
    KmsKeyProviderUri: S.optional(S.String),
    QopConfiguration: S.optional(QopConfiguration),
    AuthenticationType: S.optional(HdfsAuthenticationType),
    SimpleUser: S.optional(S.String),
    KerberosPrincipal: S.optional(S.String),
    AgentArns: S.optional(AgentArnList),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ManagedSecretConfig: S.optional(ManagedSecretConfig),
    CmkSecretConfig: S.optional(CmkSecretConfig),
    CustomSecretConfig: S.optional(CustomSecretConfig),
  }),
).annotate({
  identifier: "DescribeLocationHdfsResponse",
}) as any as S.Schema<DescribeLocationHdfsResponse>;
export interface DescribeLocationNfsRequest {
  LocationArn: string;
}
export const DescribeLocationNfsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LocationArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeLocationNfsRequest",
}) as any as S.Schema<DescribeLocationNfsRequest>;
export interface DescribeLocationNfsResponse {
  LocationArn?: string;
  LocationUri?: string;
  OnPremConfig?: OnPremConfig;
  MountOptions?: NfsMountOptions;
  CreationTime?: Date;
}
export const DescribeLocationNfsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocationArn: S.optional(S.String),
    LocationUri: S.optional(S.String),
    OnPremConfig: S.optional(OnPremConfig),
    MountOptions: S.optional(NfsMountOptions),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DescribeLocationNfsResponse",
}) as any as S.Schema<DescribeLocationNfsResponse>;
export interface DescribeLocationObjectStorageRequest {
  LocationArn: string;
}
export const DescribeLocationObjectStorageRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ LocationArn: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DescribeLocationObjectStorageRequest",
}) as any as S.Schema<DescribeLocationObjectStorageRequest>;
export interface DescribeLocationObjectStorageResponse {
  LocationArn?: string;
  LocationUri?: string;
  AccessKey?: string;
  ServerPort?: number;
  ServerProtocol?: ObjectStorageServerProtocol;
  AgentArns?: string[];
  CreationTime?: Date;
  ServerCertificate?: Uint8Array;
  ManagedSecretConfig?: ManagedSecretConfig;
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export const DescribeLocationObjectStorageResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      LocationArn: S.optional(S.String),
      LocationUri: S.optional(S.String),
      AccessKey: S.optional(S.String),
      ServerPort: S.optional(S.Number),
      ServerProtocol: S.optional(ObjectStorageServerProtocol),
      AgentArns: S.optional(AgentArnList),
      CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      ServerCertificate: S.optional(T.Blob),
      ManagedSecretConfig: S.optional(ManagedSecretConfig),
      CmkSecretConfig: S.optional(CmkSecretConfig),
      CustomSecretConfig: S.optional(CustomSecretConfig),
    }),
).annotate({
  identifier: "DescribeLocationObjectStorageResponse",
}) as any as S.Schema<DescribeLocationObjectStorageResponse>;
export interface DescribeLocationS3Request {
  LocationArn: string;
}
export const DescribeLocationS3Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LocationArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeLocationS3Request",
}) as any as S.Schema<DescribeLocationS3Request>;
export interface DescribeLocationS3Response {
  LocationArn?: string;
  LocationUri?: string;
  S3StorageClass?: S3StorageClass;
  S3Config?: S3Config;
  AgentArns?: string[];
  CreationTime?: Date;
}
export const DescribeLocationS3Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocationArn: S.optional(S.String),
    LocationUri: S.optional(S.String),
    S3StorageClass: S.optional(S3StorageClass),
    S3Config: S.optional(S3Config),
    AgentArns: S.optional(AgentArnList),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DescribeLocationS3Response",
}) as any as S.Schema<DescribeLocationS3Response>;
export interface DescribeLocationSmbRequest {
  LocationArn: string;
}
export const DescribeLocationSmbRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LocationArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeLocationSmbRequest",
}) as any as S.Schema<DescribeLocationSmbRequest>;
export interface DescribeLocationSmbResponse {
  LocationArn?: string;
  LocationUri?: string;
  AgentArns?: string[];
  User?: string;
  Domain?: string;
  MountOptions?: SmbMountOptions;
  CreationTime?: Date;
  DnsIpAddresses?: string[];
  KerberosPrincipal?: string;
  AuthenticationType?: SmbAuthenticationType;
  ManagedSecretConfig?: ManagedSecretConfig;
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export const DescribeLocationSmbResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocationArn: S.optional(S.String),
    LocationUri: S.optional(S.String),
    AgentArns: S.optional(AgentArnList),
    User: S.optional(S.String),
    Domain: S.optional(S.String),
    MountOptions: S.optional(SmbMountOptions),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DnsIpAddresses: S.optional(DnsIpList),
    KerberosPrincipal: S.optional(S.String),
    AuthenticationType: S.optional(SmbAuthenticationType),
    ManagedSecretConfig: S.optional(ManagedSecretConfig),
    CmkSecretConfig: S.optional(CmkSecretConfig),
    CustomSecretConfig: S.optional(CustomSecretConfig),
  }),
).annotate({
  identifier: "DescribeLocationSmbResponse",
}) as any as S.Schema<DescribeLocationSmbResponse>;
export interface DescribeTaskRequest {
  TaskArn: string;
}
export const DescribeTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TaskArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeTaskRequest",
}) as any as S.Schema<DescribeTaskRequest>;
export type TaskStatus =
  | "AVAILABLE"
  | "CREATING"
  | "QUEUED"
  | "RUNNING"
  | "UNAVAILABLE"
  | (string & {});
export const TaskStatus = /*@__PURE__*/ S.String;

export type NetworkInterfaceArn = string;
export type SourceNetworkInterfaceArns = string[];
export const SourceNetworkInterfaceArns = /*@__PURE__*/ S.Array(S.String);
export type DestinationNetworkInterfaceArns = string[];
export const DestinationNetworkInterfaceArns = /*@__PURE__*/ S.Array(S.String);
export type ScheduleDisabledReason = string;
export type ScheduleDisabledBy = "USER" | "SERVICE" | (string & {});
export const ScheduleDisabledBy = /*@__PURE__*/ S.String;

export interface TaskScheduleDetails {
  StatusUpdateTime?: Date;
  DisabledReason?: string;
  DisabledBy?: ScheduleDisabledBy;
}
export const TaskScheduleDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StatusUpdateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    DisabledReason: S.optional(S.String),
    DisabledBy: S.optional(ScheduleDisabledBy),
  }),
).annotate({
  identifier: "TaskScheduleDetails",
}) as any as S.Schema<TaskScheduleDetails>;
export interface DescribeTaskResponse {
  TaskArn?: string;
  Status?: TaskStatus;
  Name?: string;
  CurrentTaskExecutionArn?: string;
  SourceLocationArn?: string;
  DestinationLocationArn?: string;
  CloudWatchLogGroupArn?: string;
  SourceNetworkInterfaceArns?: string[];
  DestinationNetworkInterfaceArns?: string[];
  Options?: Options;
  Excludes?: FilterRule[];
  Schedule?: TaskSchedule;
  ErrorCode?: string;
  ErrorDetail?: string;
  CreationTime?: Date;
  Includes?: FilterRule[];
  ManifestConfig?: ManifestConfig;
  TaskReportConfig?: TaskReportConfig;
  ScheduleDetails?: TaskScheduleDetails;
  TaskMode?: TaskMode;
}
export const DescribeTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TaskArn: S.optional(S.String),
    Status: S.optional(TaskStatus),
    Name: S.optional(S.String),
    CurrentTaskExecutionArn: S.optional(S.String),
    SourceLocationArn: S.optional(S.String),
    DestinationLocationArn: S.optional(S.String),
    CloudWatchLogGroupArn: S.optional(S.String),
    SourceNetworkInterfaceArns: S.optional(SourceNetworkInterfaceArns),
    DestinationNetworkInterfaceArns: S.optional(
      DestinationNetworkInterfaceArns,
    ),
    Options: S.optional(Options),
    Excludes: S.optional(FilterList),
    Schedule: S.optional(TaskSchedule),
    ErrorCode: S.optional(S.String),
    ErrorDetail: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Includes: S.optional(FilterList),
    ManifestConfig: S.optional(ManifestConfig),
    TaskReportConfig: S.optional(TaskReportConfig),
    ScheduleDetails: S.optional(TaskScheduleDetails),
    TaskMode: S.optional(TaskMode),
  }),
).annotate({
  identifier: "DescribeTaskResponse",
}) as any as S.Schema<DescribeTaskResponse>;
export interface DescribeTaskExecutionRequest {
  TaskExecutionArn: string;
}
export const DescribeTaskExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TaskExecutionArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeTaskExecutionRequest",
}) as any as S.Schema<DescribeTaskExecutionRequest>;
export type TaskExecutionStatus =
  | "QUEUED"
  | "CANCELLING"
  | "LAUNCHING"
  | "PREPARING"
  | "TRANSFERRING"
  | "VERIFYING"
  | "SUCCESS"
  | "ERROR"
  | (string & {});
export const TaskExecutionStatus = /*@__PURE__*/ S.String;

export type Duration = number;
export type PhaseStatus = "PENDING" | "SUCCESS" | "ERROR" | (string & {});
export const PhaseStatus = /*@__PURE__*/ S.String;

export interface TaskExecutionResultDetail {
  PrepareDuration?: number;
  PrepareStatus?: PhaseStatus;
  TotalDuration?: number;
  TransferDuration?: number;
  TransferStatus?: PhaseStatus;
  VerifyDuration?: number;
  VerifyStatus?: PhaseStatus;
  ErrorCode?: string;
  ErrorDetail?: string;
}
export const TaskExecutionResultDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PrepareDuration: S.optional(S.Number),
    PrepareStatus: S.optional(PhaseStatus),
    TotalDuration: S.optional(S.Number),
    TransferDuration: S.optional(S.Number),
    TransferStatus: S.optional(PhaseStatus),
    VerifyDuration: S.optional(S.Number),
    VerifyStatus: S.optional(PhaseStatus),
    ErrorCode: S.optional(S.String),
    ErrorDetail: S.optional(S.String),
  }),
).annotate({
  identifier: "TaskExecutionResultDetail",
}) as any as S.Schema<TaskExecutionResultDetail>;
export interface ReportResult {
  Status?: PhaseStatus;
  ErrorCode?: string;
  ErrorDetail?: string;
}
export const ReportResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(PhaseStatus),
    ErrorCode: S.optional(S.String),
    ErrorDetail: S.optional(S.String),
  }),
).annotate({ identifier: "ReportResult" }) as any as S.Schema<ReportResult>;
export interface TaskExecutionFilesListedDetail {
  AtSource?: number;
  AtDestinationForDelete?: number;
}
export const TaskExecutionFilesListedDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AtSource: S.optional(S.Number),
    AtDestinationForDelete: S.optional(S.Number),
  }),
).annotate({
  identifier: "TaskExecutionFilesListedDetail",
}) as any as S.Schema<TaskExecutionFilesListedDetail>;
export interface TaskExecutionFilesFailedDetail {
  Prepare?: number;
  Transfer?: number;
  Verify?: number;
  Delete?: number;
}
export const TaskExecutionFilesFailedDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Prepare: S.optional(S.Number),
    Transfer: S.optional(S.Number),
    Verify: S.optional(S.Number),
    Delete: S.optional(S.Number),
  }),
).annotate({
  identifier: "TaskExecutionFilesFailedDetail",
}) as any as S.Schema<TaskExecutionFilesFailedDetail>;
export type ItemCount = number;
export interface TaskExecutionFoldersListedDetail {
  AtSource?: number;
  AtDestinationForDelete?: number;
}
export const TaskExecutionFoldersListedDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AtSource: S.optional(S.Number),
    AtDestinationForDelete: S.optional(S.Number),
  }),
).annotate({
  identifier: "TaskExecutionFoldersListedDetail",
}) as any as S.Schema<TaskExecutionFoldersListedDetail>;
export interface TaskExecutionFoldersFailedDetail {
  List?: number;
  Prepare?: number;
  Transfer?: number;
  Verify?: number;
  Delete?: number;
}
export const TaskExecutionFoldersFailedDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    List: S.optional(S.Number),
    Prepare: S.optional(S.Number),
    Transfer: S.optional(S.Number),
    Verify: S.optional(S.Number),
    Delete: S.optional(S.Number),
  }),
).annotate({
  identifier: "TaskExecutionFoldersFailedDetail",
}) as any as S.Schema<TaskExecutionFoldersFailedDetail>;
export interface DescribeTaskExecutionResponse {
  TaskExecutionArn?: string;
  Status?: TaskExecutionStatus;
  Options?: Options;
  Excludes?: FilterRule[];
  Includes?: FilterRule[];
  ManifestConfig?: ManifestConfig;
  StartTime?: Date;
  EstimatedFilesToTransfer?: number;
  EstimatedBytesToTransfer?: number;
  FilesTransferred?: number;
  BytesWritten?: number;
  BytesTransferred?: number;
  BytesCompressed?: number;
  Result?: TaskExecutionResultDetail;
  TaskReportConfig?: TaskReportConfig;
  FilesDeleted?: number;
  FilesSkipped?: number;
  FilesVerified?: number;
  ReportResult?: ReportResult;
  EstimatedFilesToDelete?: number;
  TaskMode?: TaskMode;
  FilesPrepared?: number;
  FilesListed?: TaskExecutionFilesListedDetail;
  FilesFailed?: TaskExecutionFilesFailedDetail;
  EstimatedFoldersToDelete?: number;
  EstimatedFoldersToTransfer?: number;
  FoldersSkipped?: number;
  FoldersPrepared?: number;
  FoldersTransferred?: number;
  FoldersVerified?: number;
  FoldersDeleted?: number;
  FoldersListed?: TaskExecutionFoldersListedDetail;
  FoldersFailed?: TaskExecutionFoldersFailedDetail;
  LaunchTime?: Date;
  EndTime?: Date;
}
export const DescribeTaskExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TaskExecutionArn: S.optional(S.String),
    Status: S.optional(TaskExecutionStatus),
    Options: S.optional(Options),
    Excludes: S.optional(FilterList),
    Includes: S.optional(FilterList),
    ManifestConfig: S.optional(ManifestConfig),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EstimatedFilesToTransfer: S.optional(S.Number),
    EstimatedBytesToTransfer: S.optional(S.Number),
    FilesTransferred: S.optional(S.Number),
    BytesWritten: S.optional(S.Number),
    BytesTransferred: S.optional(S.Number),
    BytesCompressed: S.optional(S.Number),
    Result: S.optional(TaskExecutionResultDetail),
    TaskReportConfig: S.optional(TaskReportConfig),
    FilesDeleted: S.optional(S.Number),
    FilesSkipped: S.optional(S.Number),
    FilesVerified: S.optional(S.Number),
    ReportResult: S.optional(ReportResult),
    EstimatedFilesToDelete: S.optional(S.Number),
    TaskMode: S.optional(TaskMode),
    FilesPrepared: S.optional(S.Number),
    FilesListed: S.optional(TaskExecutionFilesListedDetail),
    FilesFailed: S.optional(TaskExecutionFilesFailedDetail),
    EstimatedFoldersToDelete: S.optional(S.Number),
    EstimatedFoldersToTransfer: S.optional(S.Number),
    FoldersSkipped: S.optional(S.Number),
    FoldersPrepared: S.optional(S.Number),
    FoldersTransferred: S.optional(S.Number),
    FoldersVerified: S.optional(S.Number),
    FoldersDeleted: S.optional(S.Number),
    FoldersListed: S.optional(TaskExecutionFoldersListedDetail),
    FoldersFailed: S.optional(TaskExecutionFoldersFailedDetail),
    LaunchTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DescribeTaskExecutionResponse",
}) as any as S.Schema<DescribeTaskExecutionResponse>;
export type MaxResults = number;
export type NextToken = string;
export interface ListAgentsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListAgentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAgentsRequest",
}) as any as S.Schema<ListAgentsRequest>;
export interface AgentListEntry {
  AgentArn?: string;
  Name?: string;
  Status?: AgentStatus;
  Platform?: Platform;
}
export const AgentListEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AgentArn: S.optional(S.String),
    Name: S.optional(S.String),
    Status: S.optional(AgentStatus),
    Platform: S.optional(Platform),
  }),
).annotate({ identifier: "AgentListEntry" }) as any as S.Schema<AgentListEntry>;
export type AgentList = AgentListEntry[];
export const AgentList = /*@__PURE__*/ S.Array(AgentListEntry);
export interface ListAgentsResponse {
  Agents?: AgentListEntry[];
  NextToken?: string;
}
export const ListAgentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Agents: S.optional(AgentList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListAgentsResponse",
}) as any as S.Schema<ListAgentsResponse>;
export type LocationFilterName =
  | "LocationUri"
  | "LocationType"
  | "CreationTime"
  | (string & {});
export const LocationFilterName = /*@__PURE__*/ S.String;

export type FilterAttributeValue = string;
export type FilterValues = string[];
export const FilterValues = /*@__PURE__*/ S.Array(S.String);
export type Operator =
  | "Equals"
  | "NotEquals"
  | "In"
  | "LessThanOrEqual"
  | "LessThan"
  | "GreaterThanOrEqual"
  | "GreaterThan"
  | "Contains"
  | "NotContains"
  | "BeginsWith"
  | (string & {});
export const Operator = /*@__PURE__*/ S.String;

export interface LocationFilter {
  Name: LocationFilterName;
  Values: string[];
  Operator: Operator;
}
export const LocationFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: LocationFilterName,
    Values: FilterValues,
    Operator: Operator,
  }),
).annotate({ identifier: "LocationFilter" }) as any as S.Schema<LocationFilter>;
export type LocationFilters = LocationFilter[];
export const LocationFilters = /*@__PURE__*/ S.Array(LocationFilter);
export interface ListLocationsRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: LocationFilter[];
}
export const ListLocationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(LocationFilters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListLocationsRequest",
}) as any as S.Schema<ListLocationsRequest>;
export interface LocationListEntry {
  LocationArn?: string;
  LocationUri?: string;
}
export const LocationListEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocationArn: S.optional(S.String),
    LocationUri: S.optional(S.String),
  }),
).annotate({
  identifier: "LocationListEntry",
}) as any as S.Schema<LocationListEntry>;
export type LocationList = LocationListEntry[];
export const LocationList = /*@__PURE__*/ S.Array(LocationListEntry);
export interface ListLocationsResponse {
  Locations?: LocationListEntry[];
  NextToken?: string;
}
export const ListLocationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Locations: S.optional(LocationList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLocationsResponse",
}) as any as S.Schema<ListLocationsResponse>;
export type TaggableResourceArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export type OutputTagList = TagListEntry[];
export const OutputTagList = /*@__PURE__*/ S.Array(TagListEntry);
export interface ListTagsForResourceResponse {
  Tags?: TagListEntry[];
  NextToken?: string;
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Tags: S.optional(OutputTagList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListTaskExecutionsRequest {
  TaskArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListTaskExecutionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TaskArn: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTaskExecutionsRequest",
}) as any as S.Schema<ListTaskExecutionsRequest>;
export interface TaskExecutionListEntry {
  TaskExecutionArn?: string;
  Status?: TaskExecutionStatus;
  TaskMode?: TaskMode;
}
export const TaskExecutionListEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TaskExecutionArn: S.optional(S.String),
    Status: S.optional(TaskExecutionStatus),
    TaskMode: S.optional(TaskMode),
  }),
).annotate({
  identifier: "TaskExecutionListEntry",
}) as any as S.Schema<TaskExecutionListEntry>;
export type TaskExecutionList = TaskExecutionListEntry[];
export const TaskExecutionList = /*@__PURE__*/ S.Array(TaskExecutionListEntry);
export interface ListTaskExecutionsResponse {
  TaskExecutions?: TaskExecutionListEntry[];
  NextToken?: string;
}
export const ListTaskExecutionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TaskExecutions: S.optional(TaskExecutionList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTaskExecutionsResponse",
}) as any as S.Schema<ListTaskExecutionsResponse>;
export type TaskFilterName = "LocationId" | "CreationTime" | (string & {});
export const TaskFilterName = /*@__PURE__*/ S.String;

export interface TaskFilter {
  Name: TaskFilterName;
  Values: string[];
  Operator: Operator;
}
export const TaskFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: TaskFilterName, Values: FilterValues, Operator: Operator }),
).annotate({ identifier: "TaskFilter" }) as any as S.Schema<TaskFilter>;
export type TaskFilters = TaskFilter[];
export const TaskFilters = /*@__PURE__*/ S.Array(TaskFilter);
export interface ListTasksRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: TaskFilter[];
}
export const ListTasksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(TaskFilters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTasksRequest",
}) as any as S.Schema<ListTasksRequest>;
export interface TaskListEntry {
  TaskArn?: string;
  Status?: TaskStatus;
  Name?: string;
  TaskMode?: TaskMode;
}
export const TaskListEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TaskArn: S.optional(S.String),
    Status: S.optional(TaskStatus),
    Name: S.optional(S.String),
    TaskMode: S.optional(TaskMode),
  }),
).annotate({ identifier: "TaskListEntry" }) as any as S.Schema<TaskListEntry>;
export type TaskList = TaskListEntry[];
export const TaskList = /*@__PURE__*/ S.Array(TaskListEntry);
export interface ListTasksResponse {
  Tasks?: TaskListEntry[];
  NextToken?: string;
}
export const ListTasksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tasks: S.optional(TaskList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListTasksResponse",
}) as any as S.Schema<ListTasksResponse>;
export interface StartTaskExecutionRequest {
  TaskArn: string;
  OverrideOptions?: Options;
  Includes?: FilterRule[];
  Excludes?: FilterRule[];
  ManifestConfig?: ManifestConfig;
  TaskReportConfig?: TaskReportConfig;
  Tags?: TagListEntry[];
}
export const StartTaskExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TaskArn: S.String,
    OverrideOptions: S.optional(Options),
    Includes: S.optional(FilterList),
    Excludes: S.optional(FilterList),
    ManifestConfig: S.optional(ManifestConfig),
    TaskReportConfig: S.optional(TaskReportConfig),
    Tags: S.optional(InputTagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartTaskExecutionRequest",
}) as any as S.Schema<StartTaskExecutionRequest>;
export interface StartTaskExecutionResponse {
  TaskExecutionArn?: string;
}
export const StartTaskExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TaskExecutionArn: S.optional(S.String) }),
).annotate({
  identifier: "StartTaskExecutionResponse",
}) as any as S.Schema<StartTaskExecutionResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: TagListEntry[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: InputTagList }).pipe(
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
  ResourceArn: string;
  Keys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Keys: TagKeyList }).pipe(
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
export interface UpdateAgentRequest {
  AgentArn: string;
  Name?: string;
}
export const UpdateAgentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AgentArn: S.String, Name: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateAgentRequest",
}) as any as S.Schema<UpdateAgentRequest>;
export interface UpdateAgentResponse {}
export const UpdateAgentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateAgentResponse",
}) as any as S.Schema<UpdateAgentResponse>;
export interface UpdateLocationAzureBlobRequest {
  LocationArn: string;
  Subdirectory?: string;
  AuthenticationType?: AzureBlobAuthenticationType;
  SasConfiguration?: AzureBlobSasConfiguration;
  BlobType?: AzureBlobType;
  AccessTier?: AzureAccessTier;
  AgentArns?: string[];
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export const UpdateLocationAzureBlobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocationArn: S.String,
    Subdirectory: S.optional(S.String),
    AuthenticationType: S.optional(AzureBlobAuthenticationType),
    SasConfiguration: S.optional(AzureBlobSasConfiguration),
    BlobType: S.optional(AzureBlobType),
    AccessTier: S.optional(AzureAccessTier),
    AgentArns: S.optional(AgentArnList),
    CmkSecretConfig: S.optional(CmkSecretConfig),
    CustomSecretConfig: S.optional(CustomSecretConfig),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateLocationAzureBlobRequest",
}) as any as S.Schema<UpdateLocationAzureBlobRequest>;
export interface UpdateLocationAzureBlobResponse {}
export const UpdateLocationAzureBlobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateLocationAzureBlobResponse",
}) as any as S.Schema<UpdateLocationAzureBlobResponse>;
export type UpdatedEfsAccessPointArn = string;
export type UpdatedEfsIamRoleArn = string;
export interface UpdateLocationEfsRequest {
  LocationArn: string;
  Subdirectory?: string;
  AccessPointArn?: string;
  FileSystemAccessRoleArn?: string;
  InTransitEncryption?: EfsInTransitEncryption;
}
export const UpdateLocationEfsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocationArn: S.String,
    Subdirectory: S.optional(S.String),
    AccessPointArn: S.optional(S.String),
    FileSystemAccessRoleArn: S.optional(S.String),
    InTransitEncryption: S.optional(EfsInTransitEncryption),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateLocationEfsRequest",
}) as any as S.Schema<UpdateLocationEfsRequest>;
export interface UpdateLocationEfsResponse {}
export const UpdateLocationEfsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateLocationEfsResponse",
}) as any as S.Schema<UpdateLocationEfsResponse>;
export interface UpdateLocationFsxLustreRequest {
  LocationArn: string;
  Subdirectory?: string;
}
export const UpdateLocationFsxLustreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LocationArn: S.String, Subdirectory: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateLocationFsxLustreRequest",
}) as any as S.Schema<UpdateLocationFsxLustreRequest>;
export interface UpdateLocationFsxLustreResponse {}
export const UpdateLocationFsxLustreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateLocationFsxLustreResponse",
}) as any as S.Schema<UpdateLocationFsxLustreResponse>;
export type UpdateSmbDomain = string;
export interface FsxUpdateProtocolSmb {
  Domain?: string;
  MountOptions?: SmbMountOptions;
  Password?: string | redacted.Redacted<string>;
  User?: string;
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export const FsxUpdateProtocolSmb = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Domain: S.optional(S.String),
    MountOptions: S.optional(SmbMountOptions),
    Password: S.optional(SensitiveString),
    User: S.optional(S.String),
    CmkSecretConfig: S.optional(CmkSecretConfig),
    CustomSecretConfig: S.optional(CustomSecretConfig),
  }),
).annotate({
  identifier: "FsxUpdateProtocolSmb",
}) as any as S.Schema<FsxUpdateProtocolSmb>;
export interface FsxUpdateProtocol {
  NFS?: FsxProtocolNfs;
  SMB?: FsxUpdateProtocolSmb;
}
export const FsxUpdateProtocol = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NFS: S.optional(FsxProtocolNfs),
    SMB: S.optional(FsxUpdateProtocolSmb),
  }),
).annotate({
  identifier: "FsxUpdateProtocol",
}) as any as S.Schema<FsxUpdateProtocol>;
export interface UpdateLocationFsxOntapRequest {
  LocationArn: string;
  Protocol?: FsxUpdateProtocol;
  Subdirectory?: string;
}
export const UpdateLocationFsxOntapRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocationArn: S.String,
    Protocol: S.optional(FsxUpdateProtocol),
    Subdirectory: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateLocationFsxOntapRequest",
}) as any as S.Schema<UpdateLocationFsxOntapRequest>;
export interface UpdateLocationFsxOntapResponse {}
export const UpdateLocationFsxOntapResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateLocationFsxOntapResponse",
}) as any as S.Schema<UpdateLocationFsxOntapResponse>;
export interface UpdateLocationFsxOpenZfsRequest {
  LocationArn: string;
  Protocol?: FsxProtocol;
  Subdirectory?: string;
}
export const UpdateLocationFsxOpenZfsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocationArn: S.String,
    Protocol: S.optional(FsxProtocol),
    Subdirectory: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateLocationFsxOpenZfsRequest",
}) as any as S.Schema<UpdateLocationFsxOpenZfsRequest>;
export interface UpdateLocationFsxOpenZfsResponse {}
export const UpdateLocationFsxOpenZfsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateLocationFsxOpenZfsResponse",
}) as any as S.Schema<UpdateLocationFsxOpenZfsResponse>;
export interface UpdateLocationFsxWindowsRequest {
  LocationArn: string;
  Subdirectory?: string;
  Domain?: string;
  User?: string;
  Password?: string | redacted.Redacted<string>;
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export const UpdateLocationFsxWindowsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocationArn: S.String,
    Subdirectory: S.optional(S.String),
    Domain: S.optional(S.String),
    User: S.optional(S.String),
    Password: S.optional(SensitiveString),
    CmkSecretConfig: S.optional(CmkSecretConfig),
    CustomSecretConfig: S.optional(CustomSecretConfig),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateLocationFsxWindowsRequest",
}) as any as S.Schema<UpdateLocationFsxWindowsRequest>;
export interface UpdateLocationFsxWindowsResponse {}
export const UpdateLocationFsxWindowsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateLocationFsxWindowsResponse",
}) as any as S.Schema<UpdateLocationFsxWindowsResponse>;
export interface UpdateLocationHdfsRequest {
  LocationArn: string;
  Subdirectory?: string;
  NameNodes?: HdfsNameNode[];
  BlockSize?: number;
  ReplicationFactor?: number;
  KmsKeyProviderUri?: string;
  QopConfiguration?: QopConfiguration;
  AuthenticationType?: HdfsAuthenticationType;
  SimpleUser?: string;
  KerberosPrincipal?: string;
  KerberosKeytab?: Uint8Array;
  KerberosKrb5Conf?: Uint8Array;
  AgentArns?: string[];
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export const UpdateLocationHdfsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocationArn: S.String,
    Subdirectory: S.optional(S.String),
    NameNodes: S.optional(HdfsNameNodeList),
    BlockSize: S.optional(S.Number),
    ReplicationFactor: S.optional(S.Number),
    KmsKeyProviderUri: S.optional(S.String),
    QopConfiguration: S.optional(QopConfiguration),
    AuthenticationType: S.optional(HdfsAuthenticationType),
    SimpleUser: S.optional(S.String),
    KerberosPrincipal: S.optional(S.String),
    KerberosKeytab: S.optional(T.Blob),
    KerberosKrb5Conf: S.optional(T.Blob),
    AgentArns: S.optional(AgentArnList),
    CmkSecretConfig: S.optional(CmkSecretConfig),
    CustomSecretConfig: S.optional(CustomSecretConfig),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateLocationHdfsRequest",
}) as any as S.Schema<UpdateLocationHdfsRequest>;
export interface UpdateLocationHdfsResponse {}
export const UpdateLocationHdfsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateLocationHdfsResponse",
}) as any as S.Schema<UpdateLocationHdfsResponse>;
export interface UpdateLocationNfsRequest {
  LocationArn: string;
  Subdirectory?: string;
  ServerHostname?: string;
  OnPremConfig?: OnPremConfig;
  MountOptions?: NfsMountOptions;
}
export const UpdateLocationNfsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocationArn: S.String,
    Subdirectory: S.optional(S.String),
    ServerHostname: S.optional(S.String),
    OnPremConfig: S.optional(OnPremConfig),
    MountOptions: S.optional(NfsMountOptions),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateLocationNfsRequest",
}) as any as S.Schema<UpdateLocationNfsRequest>;
export interface UpdateLocationNfsResponse {}
export const UpdateLocationNfsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateLocationNfsResponse",
}) as any as S.Schema<UpdateLocationNfsResponse>;
export interface UpdateLocationObjectStorageRequest {
  LocationArn: string;
  ServerPort?: number;
  ServerProtocol?: ObjectStorageServerProtocol;
  Subdirectory?: string;
  ServerHostname?: string;
  AccessKey?: string;
  SecretKey?: string | redacted.Redacted<string>;
  AgentArns?: string[];
  ServerCertificate?: Uint8Array;
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export const UpdateLocationObjectStorageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocationArn: S.String,
    ServerPort: S.optional(S.Number),
    ServerProtocol: S.optional(ObjectStorageServerProtocol),
    Subdirectory: S.optional(S.String),
    ServerHostname: S.optional(S.String),
    AccessKey: S.optional(S.String),
    SecretKey: S.optional(SensitiveString),
    AgentArns: S.optional(AgentArnList),
    ServerCertificate: S.optional(T.Blob),
    CmkSecretConfig: S.optional(CmkSecretConfig),
    CustomSecretConfig: S.optional(CustomSecretConfig),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateLocationObjectStorageRequest",
}) as any as S.Schema<UpdateLocationObjectStorageRequest>;
export interface UpdateLocationObjectStorageResponse {}
export const UpdateLocationObjectStorageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateLocationObjectStorageResponse",
}) as any as S.Schema<UpdateLocationObjectStorageResponse>;
export interface UpdateLocationS3Request {
  LocationArn: string;
  Subdirectory?: string;
  S3StorageClass?: S3StorageClass;
  S3Config?: S3Config;
}
export const UpdateLocationS3Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocationArn: S.String,
    Subdirectory: S.optional(S.String),
    S3StorageClass: S.optional(S3StorageClass),
    S3Config: S.optional(S3Config),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateLocationS3Request",
}) as any as S.Schema<UpdateLocationS3Request>;
export interface UpdateLocationS3Response {}
export const UpdateLocationS3Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateLocationS3Response",
}) as any as S.Schema<UpdateLocationS3Response>;
export interface UpdateLocationSmbRequest {
  LocationArn: string;
  Subdirectory?: string;
  ServerHostname?: string;
  User?: string;
  Domain?: string;
  Password?: string | redacted.Redacted<string>;
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
  AgentArns?: string[];
  MountOptions?: SmbMountOptions;
  AuthenticationType?: SmbAuthenticationType;
  DnsIpAddresses?: string[];
  KerberosPrincipal?: string;
  KerberosKeytab?: Uint8Array;
  KerberosKrb5Conf?: Uint8Array;
}
export const UpdateLocationSmbRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocationArn: S.String,
    Subdirectory: S.optional(S.String),
    ServerHostname: S.optional(S.String),
    User: S.optional(S.String),
    Domain: S.optional(S.String),
    Password: S.optional(SensitiveString),
    CmkSecretConfig: S.optional(CmkSecretConfig),
    CustomSecretConfig: S.optional(CustomSecretConfig),
    AgentArns: S.optional(AgentArnList),
    MountOptions: S.optional(SmbMountOptions),
    AuthenticationType: S.optional(SmbAuthenticationType),
    DnsIpAddresses: S.optional(DnsIpList),
    KerberosPrincipal: S.optional(S.String),
    KerberosKeytab: S.optional(T.Blob),
    KerberosKrb5Conf: S.optional(T.Blob),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateLocationSmbRequest",
}) as any as S.Schema<UpdateLocationSmbRequest>;
export interface UpdateLocationSmbResponse {}
export const UpdateLocationSmbResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateLocationSmbResponse",
}) as any as S.Schema<UpdateLocationSmbResponse>;
export interface UpdateTaskRequest {
  TaskArn: string;
  Options?: Options;
  Excludes?: FilterRule[];
  Schedule?: TaskSchedule;
  Name?: string;
  CloudWatchLogGroupArn?: string;
  Includes?: FilterRule[];
  ManifestConfig?: ManifestConfig;
  TaskReportConfig?: TaskReportConfig;
}
export const UpdateTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TaskArn: S.String,
    Options: S.optional(Options),
    Excludes: S.optional(FilterList),
    Schedule: S.optional(TaskSchedule),
    Name: S.optional(S.String),
    CloudWatchLogGroupArn: S.optional(S.String),
    Includes: S.optional(FilterList),
    ManifestConfig: S.optional(ManifestConfig),
    TaskReportConfig: S.optional(TaskReportConfig),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateTaskRequest",
}) as any as S.Schema<UpdateTaskRequest>;
export interface UpdateTaskResponse {}
export const UpdateTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateTaskResponse",
}) as any as S.Schema<UpdateTaskResponse>;
export interface UpdateTaskExecutionRequest {
  TaskExecutionArn: string;
  Options: Options;
}
export const UpdateTaskExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TaskExecutionArn: S.String, Options: Options }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateTaskExecutionRequest",
}) as any as S.Schema<UpdateTaskExecutionRequest>;
export interface UpdateTaskExecutionResponse {}
export const UpdateTaskExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateTaskExecutionResponse",
}) as any as S.Schema<UpdateTaskExecutionResponse>;
export type CancelTaskExecutionError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Stops an DataSync task execution that's in progress. The transfer of some
 * files are abruptly interrupted. File contents that're transferred to the destination might be
 * incomplete or inconsistent with the source files.
 *
 * However, if you start a new task execution using the same task and allow it to finish,
 * file content on the destination will be complete and consistent. This applies to other
 * unexpected failures that interrupt a task execution. In all of these cases, DataSync
 * successfully completes the transfer when you start the next task execution.
 */
export const cancelTaskExecution: API.OperationMethod<
  CancelTaskExecutionRequest,
  CancelTaskExecutionResponse,
  CancelTaskExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelTaskExecutionRequest,
  output: CancelTaskExecutionResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelTaskExecution",
}));

export type CreateAgentError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Activates an DataSync agent that you deploy in your storage environment.
 * The activation process associates the agent with your Amazon Web Services account.
 *
 * If you haven't deployed an agent yet, see Do I need a DataSync
 * agent?
 */
export const createAgent: API.OperationMethod<
  CreateAgentRequest,
  CreateAgentResponse,
  CreateAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAgentRequest,
  output: CreateAgentResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAgent",
}));

export type CreateLocationAzureBlobError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a transfer *location* for a Microsoft Azure Blob Storage
 * container. DataSync can use this location as a transfer source or destination.
 * You can make transfers with or without a DataSync agent that connects to your
 * container.
 *
 * Before you begin, make sure you know how DataSync accesses Azure Blob Storage and works with access tiers and blob types.
 */
export const createLocationAzureBlob: API.OperationMethod<
  CreateLocationAzureBlobRequest,
  CreateLocationAzureBlobResponse,
  CreateLocationAzureBlobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLocationAzureBlobRequest,
  output: CreateLocationAzureBlobResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationAzureBlob",
}));

export type CreateLocationEfsError =
  | InternalException
  | InvalidRequestException
  | LocationRoleNotAssumable
  | LocationAccessTestFailed
  | CommonErrors;
/**
 * Creates a transfer *location* for an Amazon EFS file system.
 * DataSync can use this location as a source or destination for transferring
 * data.
 *
 * Before you begin, make sure that you understand how DataSync
 * accesses
 * Amazon EFS file systems.
 */
export const createLocationEfs: API.OperationMethod<
  CreateLocationEfsRequest,
  CreateLocationEfsResponse,
  CreateLocationEfsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLocationEfsRequest,
  output: CreateLocationEfsResponse,
  errors: [
    InternalException,
    InvalidRequestException,
    LocationRoleNotAssumable,
    LocationAccessTestFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationEfs",
}));

export type CreateLocationFsxLustreError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a transfer *location* for an Amazon FSx for Lustre file
 * system. DataSync can use this location as a source or destination for
 * transferring data.
 *
 * Before you begin, make sure that you understand how DataSync
 * accesses FSx for Lustre file systems.
 */
export const createLocationFsxLustre: API.OperationMethod<
  CreateLocationFsxLustreRequest,
  CreateLocationFsxLustreResponse,
  CreateLocationFsxLustreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLocationFsxLustreRequest,
  output: CreateLocationFsxLustreResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationFsxLustre",
}));

export type CreateLocationFsxOntapError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a transfer *location* for an Amazon FSx for NetApp ONTAP file
 * system. DataSync can use this location as a source or destination for
 * transferring data.
 *
 * Before you begin, make sure that you understand how DataSync
 * accesses FSx for ONTAP file systems.
 */
export const createLocationFsxOntap: API.OperationMethod<
  CreateLocationFsxOntapRequest,
  CreateLocationFsxOntapResponse,
  CreateLocationFsxOntapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLocationFsxOntapRequest,
  output: CreateLocationFsxOntapResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationFsxOntap",
}));

export type CreateLocationFsxOpenZfsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a transfer *location* for an Amazon FSx for OpenZFS file
 * system. DataSync can use this location as a source or destination for
 * transferring data.
 *
 * Before you begin, make sure that you understand how DataSync
 * accesses
 * FSx for OpenZFS file systems.
 *
 * Request parameters related to `SMB` aren't supported with the
 * `CreateLocationFsxOpenZfs` operation.
 */
export const createLocationFsxOpenZfs: API.OperationMethod<
  CreateLocationFsxOpenZfsRequest,
  CreateLocationFsxOpenZfsResponse,
  CreateLocationFsxOpenZfsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLocationFsxOpenZfsRequest,
  output: CreateLocationFsxOpenZfsResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationFsxOpenZfs",
}));

export type CreateLocationFsxWindowsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a transfer *location* for an Amazon FSx for Windows File Server file
 * system. DataSync can use this location as a source or destination for
 * transferring data.
 *
 * Before you begin, make sure that you understand how DataSync
 * accesses
 * FSx for Windows File Server file systems.
 */
export const createLocationFsxWindows: API.OperationMethod<
  CreateLocationFsxWindowsRequest,
  CreateLocationFsxWindowsResponse,
  CreateLocationFsxWindowsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLocationFsxWindowsRequest,
  output: CreateLocationFsxWindowsResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationFsxWindows",
}));

export type CreateLocationHdfsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a transfer *location* for a Hadoop Distributed File System
 * (HDFS). DataSync can use this location as a source or destination for
 * transferring data.
 *
 * Before you begin, make sure that you understand how DataSync
 * accesses HDFS
 * clusters.
 */
export const createLocationHdfs: API.OperationMethod<
  CreateLocationHdfsRequest,
  CreateLocationHdfsResponse,
  CreateLocationHdfsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLocationHdfsRequest,
  output: CreateLocationHdfsResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationHdfs",
}));

export type CreateLocationNfsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a transfer *location* for a Network File System (NFS) file
 * server. DataSync can use this location as a source or destination for
 * transferring data.
 *
 * Before you begin, make sure that you understand how DataSync
 * accesses NFS file
 * servers.
 */
export const createLocationNfs: API.OperationMethod<
  CreateLocationNfsRequest,
  CreateLocationNfsResponse,
  CreateLocationNfsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLocationNfsRequest,
  output: CreateLocationNfsResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationNfs",
}));

export type CreateLocationObjectStorageError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a transfer *location* for an object storage system. DataSync can use this location as a source or destination for transferring data. You
 * can make transfers with or without a DataSync
 * agent.
 *
 * Before you begin, make sure that you understand the prerequisites for DataSync to work with object storage systems.
 */
export const createLocationObjectStorage: API.OperationMethod<
  CreateLocationObjectStorageRequest,
  CreateLocationObjectStorageResponse,
  CreateLocationObjectStorageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLocationObjectStorageRequest,
  output: CreateLocationObjectStorageResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationObjectStorage",
}));

export type CreateLocationS3Error =
  | InternalException
  | InvalidRequestException
  | LocationRoleNotAssumable
  | LocationAccessTestFailed
  | CommonErrors;
/**
 * Creates a transfer *location* for an Amazon S3 bucket.
 * DataSync can use this location as a source or destination for transferring
 * data.
 *
 * Before you begin, make sure that you read the following topics:
 *
 * - Storage
 * class considerations with Amazon S3 locations
 *
 * - Evaluating S3 request costs when using DataSync
 *
 * For more information, see Configuring
 * transfers with Amazon S3.
 */
export const createLocationS3: API.OperationMethod<
  CreateLocationS3Request,
  CreateLocationS3Response,
  CreateLocationS3Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLocationS3Request,
  output: CreateLocationS3Response,
  errors: [
    InternalException,
    InvalidRequestException,
    LocationRoleNotAssumable,
    LocationAccessTestFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationS3",
}));

export type CreateLocationSmbError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a transfer *location* for a Server Message Block (SMB) file
 * server. DataSync can use this location as a source or destination for
 * transferring data.
 *
 * Before you begin, make sure that you understand how DataSync accesses SMB
 * file servers. For more information, see Providing DataSync access to SMB file servers.
 */
export const createLocationSmb: API.OperationMethod<
  CreateLocationSmbRequest,
  CreateLocationSmbResponse,
  CreateLocationSmbError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLocationSmbRequest,
  output: CreateLocationSmbResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationSmb",
}));

export type CreateTaskError =
  | InternalException
  | InvalidRequestException
  | LocationAccessTestFailed
  | CommonErrors;
/**
 * Configures a *task*, which defines where and how DataSync
 * transfers your data.
 *
 * A task includes a source location, destination location, and transfer options (such as
 * bandwidth limits, scheduling, and more).
 *
 * If you're planning to transfer data to or from an Amazon S3 location, review
 * how
 * DataSync can affect your S3 request charges and the DataSync pricing page before
 * you begin.
 */
export const createTask: API.OperationMethod<
  CreateTaskRequest,
  CreateTaskResponse,
  CreateTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTaskRequest,
  output: CreateTaskResponse,
  errors: [
    InternalException,
    InvalidRequestException,
    LocationAccessTestFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTask",
}));

export type DeleteAgentError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Removes an DataSync agent resource from your Amazon Web Services account.
 *
 * Keep in mind that this operation (which can't be undone) doesn't remove the agent's
 * virtual machine (VM) or Amazon EC2 instance from your storage environment. For next
 * steps, you can delete the VM or instance from your storage environment or reuse it to activate a new
 * agent.
 */
export const deleteAgent: API.OperationMethod<
  DeleteAgentRequest,
  DeleteAgentResponse,
  DeleteAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAgentRequest,
  output: DeleteAgentResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAgent",
}));

export type DeleteLocationError =
  | InternalException
  | InvalidRequestException
  | LocationNotFound
  | CommonErrors;
/**
 * Deletes a transfer location resource from DataSync.
 */
export const deleteLocation: API.OperationMethod<
  DeleteLocationRequest,
  DeleteLocationResponse,
  DeleteLocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLocationRequest,
  output: DeleteLocationResponse,
  errors: [InternalException, InvalidRequestException, LocationNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLocation",
}));

export type DeleteTaskError =
  | InternalException
  | InvalidRequestException
  | TaskNotFound
  | CommonErrors;
/**
 * Deletes a transfer task resource from DataSync.
 */
export const deleteTask: API.OperationMethod<
  DeleteTaskRequest,
  DeleteTaskResponse,
  DeleteTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTaskRequest,
  output: DeleteTaskResponse,
  errors: [InternalException, InvalidRequestException, TaskNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTask",
}));

export type DescribeAgentError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns information about an DataSync agent, such as its name, service
 * endpoint type, and status.
 */
export const describeAgent: API.OperationMethod<
  DescribeAgentRequest,
  DescribeAgentResponse,
  DescribeAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAgentRequest,
  output: DescribeAgentResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAgent",
}));

export type DescribeLocationAzureBlobError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides details about how an DataSync transfer location for Microsoft Azure
 * Blob Storage is configured.
 */
export const describeLocationAzureBlob: API.OperationMethod<
  DescribeLocationAzureBlobRequest,
  DescribeLocationAzureBlobResponse,
  DescribeLocationAzureBlobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeLocationAzureBlobRequest,
  output: DescribeLocationAzureBlobResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationAzureBlob",
}));

export type DescribeLocationEfsError =
  | InternalException
  | InvalidRequestException
  | LocationNotFound
  | CommonErrors;
/**
 * Provides details about how an DataSync transfer location for an Amazon EFS file system is configured.
 */
export const describeLocationEfs: API.OperationMethod<
  DescribeLocationEfsRequest,
  DescribeLocationEfsResponse,
  DescribeLocationEfsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeLocationEfsRequest,
  output: DescribeLocationEfsResponse,
  errors: [InternalException, InvalidRequestException, LocationNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationEfs",
}));

export type DescribeLocationFsxLustreError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides details about how an DataSync transfer location for an Amazon FSx for Lustre file system is configured.
 */
export const describeLocationFsxLustre: API.OperationMethod<
  DescribeLocationFsxLustreRequest,
  DescribeLocationFsxLustreResponse,
  DescribeLocationFsxLustreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeLocationFsxLustreRequest,
  output: DescribeLocationFsxLustreResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationFsxLustre",
}));

export type DescribeLocationFsxOntapError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides details about how an DataSync transfer location for an Amazon FSx for NetApp ONTAP file system is configured.
 *
 * If your location uses SMB, the `DescribeLocationFsxOntap` operation doesn't
 * actually return a `Password`.
 */
export const describeLocationFsxOntap: API.OperationMethod<
  DescribeLocationFsxOntapRequest,
  DescribeLocationFsxOntapResponse,
  DescribeLocationFsxOntapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeLocationFsxOntapRequest,
  output: DescribeLocationFsxOntapResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationFsxOntap",
}));

export type DescribeLocationFsxOpenZfsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides details about how an DataSync transfer location for an Amazon FSx for OpenZFS file system is configured.
 *
 * Response elements related to `SMB` aren't supported with the
 * `DescribeLocationFsxOpenZfs` operation.
 */
export const describeLocationFsxOpenZfs: API.OperationMethod<
  DescribeLocationFsxOpenZfsRequest,
  DescribeLocationFsxOpenZfsResponse,
  DescribeLocationFsxOpenZfsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeLocationFsxOpenZfsRequest,
  output: DescribeLocationFsxOpenZfsResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationFsxOpenZfs",
}));

export type DescribeLocationFsxWindowsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides details about how an DataSync transfer location for an Amazon FSx for Windows File Server file system is configured.
 */
export const describeLocationFsxWindows: API.OperationMethod<
  DescribeLocationFsxWindowsRequest,
  DescribeLocationFsxWindowsResponse,
  DescribeLocationFsxWindowsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeLocationFsxWindowsRequest,
  output: DescribeLocationFsxWindowsResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationFsxWindows",
}));

export type DescribeLocationHdfsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides details about how an DataSync transfer location for a Hadoop
 * Distributed File System (HDFS) is configured.
 */
export const describeLocationHdfs: API.OperationMethod<
  DescribeLocationHdfsRequest,
  DescribeLocationHdfsResponse,
  DescribeLocationHdfsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeLocationHdfsRequest,
  output: DescribeLocationHdfsResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationHdfs",
}));

export type DescribeLocationNfsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides details about how an DataSync transfer location for a Network
 * File System (NFS) file server is configured.
 */
export const describeLocationNfs: API.OperationMethod<
  DescribeLocationNfsRequest,
  DescribeLocationNfsResponse,
  DescribeLocationNfsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeLocationNfsRequest,
  output: DescribeLocationNfsResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationNfs",
}));

export type DescribeLocationObjectStorageError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides details about how an DataSync transfer location for an object
 * storage system is configured.
 */
export const describeLocationObjectStorage: API.OperationMethod<
  DescribeLocationObjectStorageRequest,
  DescribeLocationObjectStorageResponse,
  DescribeLocationObjectStorageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeLocationObjectStorageRequest,
  output: DescribeLocationObjectStorageResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationObjectStorage",
}));

export type DescribeLocationS3Error =
  | InternalException
  | InvalidRequestException
  | LocationNotFound
  | CommonErrors;
/**
 * Provides details about how an DataSync transfer location for an S3 bucket
 * is configured.
 */
export const describeLocationS3: API.OperationMethod<
  DescribeLocationS3Request,
  DescribeLocationS3Response,
  DescribeLocationS3Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeLocationS3Request,
  output: DescribeLocationS3Response,
  errors: [InternalException, InvalidRequestException, LocationNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationS3",
}));

export type DescribeLocationSmbError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides details about how an DataSync transfer location for a Server
 * Message Block (SMB) file server is configured.
 */
export const describeLocationSmb: API.OperationMethod<
  DescribeLocationSmbRequest,
  DescribeLocationSmbResponse,
  DescribeLocationSmbError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeLocationSmbRequest,
  output: DescribeLocationSmbResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationSmb",
}));

export type DescribeTaskError =
  | InternalException
  | InvalidRequestException
  | TaskNotFound
  | CommonErrors;
/**
 * Provides information about a *task*, which defines where and how
 * DataSync transfers your data.
 */
export const describeTask: API.OperationMethod<
  DescribeTaskRequest,
  DescribeTaskResponse,
  DescribeTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTaskRequest,
  output: DescribeTaskResponse,
  errors: [InternalException, InvalidRequestException, TaskNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTask",
}));

export type DescribeTaskExecutionError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides information about an execution of your DataSync task. You can
 * use this operation to help monitor the progress of an ongoing data transfer or check the
 * results of the transfer.
 *
 * Some `DescribeTaskExecution` response elements are only relevant to a
 * specific task mode. For information, see Understanding task mode differences and Understanding data
 * transfer performance counters.
 */
export const describeTaskExecution: API.OperationMethod<
  DescribeTaskExecutionRequest,
  DescribeTaskExecutionResponse,
  DescribeTaskExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTaskExecutionRequest,
  output: DescribeTaskExecutionResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTaskExecution",
}));

export type ListAgentsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns a list of DataSync agents that belong to an Amazon Web Services account in the Amazon Web Services Region specified in the request.
 *
 * With pagination, you can reduce the number of agents returned in a response. If you get
 * a truncated list of agents in a response, the response contains a marker that you can specify
 * in your next request to fetch the next page of agents.
 *
 * `ListAgents` is eventually consistent. This means the result of running the
 * operation might not reflect that you just created or deleted an agent. For example, if you
 * create an agent with CreateAgent and then
 * immediately run `ListAgents`, that agent might not show up in the list right away.
 * In situations like this, you can always confirm whether an agent has been created (or deleted)
 * by using DescribeAgent.
 */
export const listAgents: API.PaginatedOperationMethod<
  ListAgentsRequest,
  ListAgentsResponse,
  ListAgentsError,
  Credentials | HttpClient.HttpClient,
  AgentListEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAgentsRequest,
  output: ListAgentsResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Agents",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLocationsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns a list of source and destination locations.
 *
 * If you have more locations than are returned in a response (that is, the response
 * returns only a truncated list of your agents), the response contains a token that you can
 * specify in your next request to fetch the next page of locations.
 */
export const listLocations: API.PaginatedOperationMethod<
  ListLocationsRequest,
  ListLocationsResponse,
  ListLocationsError,
  Credentials | HttpClient.HttpClient,
  LocationListEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLocationsRequest,
  output: ListLocationsResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLocations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Locations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns all the tags associated with an Amazon Web Services resource.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  TagListEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tags",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTaskExecutionsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns a list of executions for an DataSync transfer task.
 */
export const listTaskExecutions: API.PaginatedOperationMethod<
  ListTaskExecutionsRequest,
  ListTaskExecutionsResponse,
  ListTaskExecutionsError,
  Credentials | HttpClient.HttpClient,
  TaskExecutionListEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTaskExecutionsRequest,
  output: ListTaskExecutionsResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTaskExecutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TaskExecutions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTasksError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns a list of the DataSync tasks you created.
 */
export const listTasks: API.PaginatedOperationMethod<
  ListTasksRequest,
  ListTasksResponse,
  ListTasksError,
  Credentials | HttpClient.HttpClient,
  TaskListEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTasksRequest,
  output: ListTasksResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tasks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type StartTaskExecutionError =
  | InternalException
  | InvalidRequestException
  | LocationAccessTestFailed
  | CommonErrors;
/**
 * Starts an DataSync transfer task. For each task, you can only run one task
 * execution at a time.
 *
 * There are several steps to a task execution. For more information, see Task execution statuses.
 *
 * If you're planning to transfer data to or from an Amazon S3 location, review
 * how
 * DataSync can affect your S3 request charges and the DataSync pricing page before
 * you begin.
 */
export const startTaskExecution: API.OperationMethod<
  StartTaskExecutionRequest,
  StartTaskExecutionResponse,
  StartTaskExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartTaskExecutionRequest,
  output: StartTaskExecutionResponse,
  errors: [
    InternalException,
    InvalidRequestException,
    LocationAccessTestFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTaskExecution",
}));

export type TagResourceError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Applies a *tag* to an Amazon Web Services resource. Tags are
 * key-value pairs that can help you manage, filter, and search for your resources.
 *
 * These include DataSync resources, such as locations, tasks, and task
 * executions.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Removes tags from an Amazon Web Services resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAgentError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Updates the name of an DataSync agent.
 */
export const updateAgent: API.OperationMethod<
  UpdateAgentRequest,
  UpdateAgentResponse,
  UpdateAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAgentRequest,
  output: UpdateAgentResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAgent",
}));

export type UpdateLocationAzureBlobError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Modifies the following configurations of the Microsoft Azure Blob Storage transfer
 * location that you're using with DataSync.
 *
 * For more information, see Configuring DataSync transfers with Azure Blob Storage.
 */
export const updateLocationAzureBlob: API.OperationMethod<
  UpdateLocationAzureBlobRequest,
  UpdateLocationAzureBlobResponse,
  UpdateLocationAzureBlobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLocationAzureBlobRequest,
  output: UpdateLocationAzureBlobResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationAzureBlob",
}));

export type UpdateLocationEfsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Modifies the following configuration parameters of the Amazon EFS transfer
 * location that you're using with DataSync.
 *
 * For more information, see Configuring DataSync
 * transfers with Amazon EFS.
 */
export const updateLocationEfs: API.OperationMethod<
  UpdateLocationEfsRequest,
  UpdateLocationEfsResponse,
  UpdateLocationEfsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLocationEfsRequest,
  output: UpdateLocationEfsResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationEfs",
}));

export type UpdateLocationFsxLustreError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Modifies the following configuration parameters of the Amazon FSx for Lustre
 * transfer location that you're using with DataSync.
 *
 * For more information, see Configuring DataSync
 * transfers with FSx for Lustre.
 */
export const updateLocationFsxLustre: API.OperationMethod<
  UpdateLocationFsxLustreRequest,
  UpdateLocationFsxLustreResponse,
  UpdateLocationFsxLustreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLocationFsxLustreRequest,
  output: UpdateLocationFsxLustreResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationFsxLustre",
}));

export type UpdateLocationFsxOntapError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Modifies the following configuration parameters of the Amazon FSx for NetApp ONTAP
 * transfer location that you're using with DataSync.
 *
 * For more information, see Configuring DataSync
 * transfers with FSx for ONTAP.
 */
export const updateLocationFsxOntap: API.OperationMethod<
  UpdateLocationFsxOntapRequest,
  UpdateLocationFsxOntapResponse,
  UpdateLocationFsxOntapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLocationFsxOntapRequest,
  output: UpdateLocationFsxOntapResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationFsxOntap",
}));

export type UpdateLocationFsxOpenZfsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Modifies the following configuration parameters of the Amazon FSx for OpenZFS
 * transfer location that you're using with DataSync.
 *
 * For more information, see Configuring DataSync
 * transfers with FSx for OpenZFS.
 *
 * Request parameters related to `SMB` aren't supported with the
 * `UpdateLocationFsxOpenZfs` operation.
 */
export const updateLocationFsxOpenZfs: API.OperationMethod<
  UpdateLocationFsxOpenZfsRequest,
  UpdateLocationFsxOpenZfsResponse,
  UpdateLocationFsxOpenZfsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLocationFsxOpenZfsRequest,
  output: UpdateLocationFsxOpenZfsResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationFsxOpenZfs",
}));

export type UpdateLocationFsxWindowsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Modifies the following configuration parameters of the Amazon FSx for Windows File Server
 * transfer location that you're using with DataSync.
 *
 * For more information, see Configuring DataSync
 * transfers with FSx for Windows File Server.
 */
export const updateLocationFsxWindows: API.OperationMethod<
  UpdateLocationFsxWindowsRequest,
  UpdateLocationFsxWindowsResponse,
  UpdateLocationFsxWindowsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLocationFsxWindowsRequest,
  output: UpdateLocationFsxWindowsResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationFsxWindows",
}));

export type UpdateLocationHdfsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Modifies the following configuration parameters of the Hadoop Distributed File System
 * (HDFS) transfer location that you're using with DataSync.
 *
 * For more information, see Configuring DataSync
 * transfers with an HDFS cluster.
 */
export const updateLocationHdfs: API.OperationMethod<
  UpdateLocationHdfsRequest,
  UpdateLocationHdfsResponse,
  UpdateLocationHdfsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLocationHdfsRequest,
  output: UpdateLocationHdfsResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationHdfs",
}));

export type UpdateLocationNfsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Modifies the following configuration parameters of the Network File System (NFS) transfer
 * location that you're using with DataSync.
 *
 * For more information, see Configuring transfers with an NFS
 * file server.
 */
export const updateLocationNfs: API.OperationMethod<
  UpdateLocationNfsRequest,
  UpdateLocationNfsResponse,
  UpdateLocationNfsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLocationNfsRequest,
  output: UpdateLocationNfsResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationNfs",
}));

export type UpdateLocationObjectStorageError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Modifies the following configuration parameters of the object storage transfer location
 * that you're using with DataSync.
 *
 * For more information, see Configuring DataSync
 * transfers with an object storage system.
 */
export const updateLocationObjectStorage: API.OperationMethod<
  UpdateLocationObjectStorageRequest,
  UpdateLocationObjectStorageResponse,
  UpdateLocationObjectStorageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLocationObjectStorageRequest,
  output: UpdateLocationObjectStorageResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationObjectStorage",
}));

export type UpdateLocationS3Error =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Modifies the following configuration parameters of the Amazon S3 transfer location
 * that you're using with DataSync.
 *
 * Before you begin, make sure that you read the following topics:
 *
 * - Storage
 * class considerations with Amazon S3 locations
 *
 * - Evaluating S3 request costs when using DataSync
 */
export const updateLocationS3: API.OperationMethod<
  UpdateLocationS3Request,
  UpdateLocationS3Response,
  UpdateLocationS3Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLocationS3Request,
  output: UpdateLocationS3Response,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationS3",
}));

export type UpdateLocationSmbError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Modifies the following configuration parameters of the Server Message Block (SMB) transfer
 * location that you're using with DataSync.
 *
 * For more information, see Configuring DataSync
 * transfers with an SMB file server.
 */
export const updateLocationSmb: API.OperationMethod<
  UpdateLocationSmbRequest,
  UpdateLocationSmbResponse,
  UpdateLocationSmbError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLocationSmbRequest,
  output: UpdateLocationSmbResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationSmb",
}));

export type UpdateTaskError =
  | InternalException
  | InvalidRequestException
  | TaskNotFound
  | CommonErrors;
/**
 * Updates the configuration of a *task*, which defines where and how
 * DataSync transfers your data.
 */
export const updateTask: API.OperationMethod<
  UpdateTaskRequest,
  UpdateTaskResponse,
  UpdateTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTaskRequest,
  output: UpdateTaskResponse,
  errors: [InternalException, InvalidRequestException, TaskNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTask",
}));

export type UpdateTaskExecutionError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Updates the configuration of a running DataSync task execution.
 *
 * Currently, the only `Option` that you can modify with
 * `UpdateTaskExecution` is
 * BytesPerSecond
 * , which throttles bandwidth for a running or queued task
 * execution.
 */
export const updateTaskExecution: API.OperationMethod<
  UpdateTaskExecutionRequest,
  UpdateTaskExecutionResponse,
  UpdateTaskExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTaskExecutionRequest,
  output: UpdateTaskExecutionResponse,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTaskExecution",
}));
