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
  sdkId: "Lightsail",
  serviceShapeName: "Lightsail_20161128",
});
const auth = T.AwsAuthSigv4({ name: "lightsail" });
const ver = T.ServiceVersion("2016-11-28");
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
              `https://lightsail-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://lightsail-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://lightsail.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://lightsail.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      code: S.optional(S.String),
      docs: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      tip: S.optional(S.String),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class AccountSetupInProgressException
  extends /*@__PURE__*/ S.TaggedError<AccountSetupInProgressException>()(
    "AccountSetupInProgressException",
    {
      code: S.optional(S.String),
      docs: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      tip: S.optional(S.String),
    },
    T.HttpError(428),
  ) {}
export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()(
    "InvalidInputException",
    {
      code: S.optional(S.String),
      docs: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      tip: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    {
      code: S.optional(S.String),
      docs: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      tip: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class OperationFailureException
  extends /*@__PURE__*/ S.TaggedError<OperationFailureException>()(
    "OperationFailureException",
    {
      code: S.optional(S.String),
      docs: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      tip: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class RegionSetupInProgressException
  extends /*@__PURE__*/ S.TaggedError<RegionSetupInProgressException>()(
    "RegionSetupInProgressException",
    {
      code: S.optional(S.String),
      docs: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      tip: S.optional(S.String),
    },
    T.HttpError(428),
  ) {}
export class ServiceException
  extends /*@__PURE__*/ S.TaggedError<ServiceException>()(
    "ServiceException",
    {
      code: S.optional(S.String),
      docs: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      tip: S.optional(S.String),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class UnauthenticatedException
  extends /*@__PURE__*/ S.TaggedError<UnauthenticatedException>()(
    "UnauthenticatedException",
    {
      code: S.optional(S.String),
      docs: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      tip: S.optional(S.String),
    },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export type ResourceName = string;
export interface AllocateStaticIpRequest {
  staticIpName: string;
}
export const AllocateStaticIpRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ staticIpName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/AllocateStaticIp" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AllocateStaticIpRequest",
}) as any as S.Schema<AllocateStaticIpRequest>;
export type NonEmptyString = string;
export type ResourceType =
  | "ContainerService"
  | "Instance"
  | "StaticIp"
  | "KeyPair"
  | "InstanceSnapshot"
  | "Domain"
  | "PeeredVpc"
  | "LoadBalancer"
  | "LoadBalancerTlsCertificate"
  | "Disk"
  | "DiskSnapshot"
  | "RelationalDatabase"
  | "RelationalDatabaseSnapshot"
  | "ExportSnapshotRecord"
  | "CloudFormationStackRecord"
  | "Alarm"
  | "ContactMethod"
  | "Distribution"
  | "Certificate"
  | "Bucket"
  | (string & {});
export const ResourceType = /*@__PURE__*/ S.String;

export type IsoDate = Date;
export type RegionName =
  | "us-east-1"
  | "us-east-2"
  | "us-west-1"
  | "us-west-2"
  | "eu-west-1"
  | "eu-west-2"
  | "eu-west-3"
  | "eu-central-1"
  | "eu-north-1"
  | "eu-south-2"
  | "ca-central-1"
  | "ap-east-1"
  | "ap-south-1"
  | "ap-southeast-1"
  | "ap-southeast-2"
  | "ap-northeast-1"
  | "ap-northeast-2"
  | "ap-southeast-3"
  | "ap-southeast-5"
  | "sa-east-1"
  | (string & {});
export const RegionName = /*@__PURE__*/ S.String;

export interface ResourceLocation {
  availabilityZone?: string;
  regionName?: RegionName;
}
export const ResourceLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    availabilityZone: S.optional(S.String),
    regionName: S.optional(RegionName),
  }),
).annotate({
  identifier: "ResourceLocation",
}) as any as S.Schema<ResourceLocation>;
export type OperationType =
  | "DeleteKnownHostKeys"
  | "DeleteInstance"
  | "CreateInstance"
  | "StopInstance"
  | "StartInstance"
  | "RebootInstance"
  | "OpenInstancePublicPorts"
  | "PutInstancePublicPorts"
  | "CloseInstancePublicPorts"
  | "AllocateStaticIp"
  | "ReleaseStaticIp"
  | "AttachStaticIp"
  | "DetachStaticIp"
  | "UpdateDomainEntry"
  | "DeleteDomainEntry"
  | "CreateDomain"
  | "DeleteDomain"
  | "CreateInstanceSnapshot"
  | "DeleteInstanceSnapshot"
  | "CreateInstancesFromSnapshot"
  | "CreateLoadBalancer"
  | "DeleteLoadBalancer"
  | "AttachInstancesToLoadBalancer"
  | "DetachInstancesFromLoadBalancer"
  | "UpdateLoadBalancerAttribute"
  | "CreateLoadBalancerTlsCertificate"
  | "DeleteLoadBalancerTlsCertificate"
  | "AttachLoadBalancerTlsCertificate"
  | "CreateDisk"
  | "DeleteDisk"
  | "AttachDisk"
  | "DetachDisk"
  | "CreateDiskSnapshot"
  | "DeleteDiskSnapshot"
  | "CreateDiskFromSnapshot"
  | "CreateRelationalDatabase"
  | "UpdateRelationalDatabase"
  | "DeleteRelationalDatabase"
  | "CreateRelationalDatabaseFromSnapshot"
  | "CreateRelationalDatabaseSnapshot"
  | "DeleteRelationalDatabaseSnapshot"
  | "UpdateRelationalDatabaseParameters"
  | "StartRelationalDatabase"
  | "RebootRelationalDatabase"
  | "StopRelationalDatabase"
  | "EnableAddOn"
  | "DisableAddOn"
  | "PutAlarm"
  | "GetAlarms"
  | "DeleteAlarm"
  | "TestAlarm"
  | "CreateContactMethod"
  | "GetContactMethods"
  | "SendContactMethodVerification"
  | "DeleteContactMethod"
  | "CreateDistribution"
  | "UpdateDistribution"
  | "DeleteDistribution"
  | "ResetDistributionCache"
  | "AttachCertificateToDistribution"
  | "DetachCertificateFromDistribution"
  | "UpdateDistributionBundle"
  | "SetIpAddressType"
  | "CreateCertificate"
  | "DeleteCertificate"
  | "CreateContainerService"
  | "UpdateContainerService"
  | "DeleteContainerService"
  | "CreateContainerServiceDeployment"
  | "CreateContainerServiceRegistryLogin"
  | "RegisterContainerImage"
  | "DeleteContainerImage"
  | "CreateBucket"
  | "DeleteBucket"
  | "CreateBucketAccessKey"
  | "DeleteBucketAccessKey"
  | "UpdateBucketBundle"
  | "UpdateBucket"
  | "SetResourceAccessForBucket"
  | "UpdateInstanceMetadataOptions"
  | "StartGUISession"
  | "StopGUISession"
  | "SetupInstanceHttps"
  | (string & {});
export const OperationType = /*@__PURE__*/ S.String;

export type OperationStatus =
  | "NotStarted"
  | "Started"
  | "Failed"
  | "Completed"
  | "Succeeded"
  | (string & {});
export const OperationStatus = /*@__PURE__*/ S.String;

export interface Operation {
  id?: string;
  resourceName?: string;
  resourceType?: ResourceType;
  createdAt?: Date;
  location?: ResourceLocation;
  isTerminal?: boolean;
  operationDetails?: string;
  operationType?: OperationType;
  status?: OperationStatus;
  statusChangedAt?: Date;
  errorCode?: string;
  errorDetails?: string;
}
export const Operation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    resourceName: S.optional(S.String),
    resourceType: S.optional(ResourceType),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    location: S.optional(ResourceLocation),
    isTerminal: S.optional(S.Boolean),
    operationDetails: S.optional(S.String),
    operationType: S.optional(OperationType),
    status: S.optional(OperationStatus),
    statusChangedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    errorCode: S.optional(S.String),
    errorDetails: S.optional(S.String),
  }),
).annotate({ identifier: "Operation" }) as any as S.Schema<Operation>;
export type OperationList = Operation[];
export const OperationList = /*@__PURE__*/ S.Array(Operation);
export interface AllocateStaticIpResult {
  operations?: Operation[];
}
export const AllocateStaticIpResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "AllocateStaticIpResult",
}) as any as S.Schema<AllocateStaticIpResult>;
export interface AttachCertificateToDistributionRequest {
  distributionName: string;
  certificateName: string;
}
export const AttachCertificateToDistributionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ distributionName: S.String, certificateName: S.String }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/AttachCertificateToDistribution",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AttachCertificateToDistributionRequest",
}) as any as S.Schema<AttachCertificateToDistributionRequest>;
export interface AttachCertificateToDistributionResult {
  operation?: Operation;
}
export const AttachCertificateToDistributionResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ operation: S.optional(Operation) }),
).annotate({
  identifier: "AttachCertificateToDistributionResult",
}) as any as S.Schema<AttachCertificateToDistributionResult>;
export interface AttachDiskRequest {
  diskName: string;
  instanceName: string;
  diskPath: string;
  autoMounting?: boolean;
}
export const AttachDiskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    diskName: S.String,
    instanceName: S.String,
    diskPath: S.String,
    autoMounting: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/AttachDisk" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AttachDiskRequest",
}) as any as S.Schema<AttachDiskRequest>;
export interface AttachDiskResult {
  operations?: Operation[];
}
export const AttachDiskResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "AttachDiskResult",
}) as any as S.Schema<AttachDiskResult>;
export type ResourceNameList = string[];
export const ResourceNameList = /*@__PURE__*/ S.Array(S.String);
export interface AttachInstancesToLoadBalancerRequest {
  loadBalancerName: string;
  instanceNames: string[];
}
export const AttachInstancesToLoadBalancerRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      loadBalancerName: S.String,
      instanceNames: ResourceNameList,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/AttachInstancesToLoadBalancer",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AttachInstancesToLoadBalancerRequest",
}) as any as S.Schema<AttachInstancesToLoadBalancerRequest>;
export interface AttachInstancesToLoadBalancerResult {
  operations?: Operation[];
}
export const AttachInstancesToLoadBalancerResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "AttachInstancesToLoadBalancerResult",
}) as any as S.Schema<AttachInstancesToLoadBalancerResult>;
export interface AttachLoadBalancerTlsCertificateRequest {
  loadBalancerName: string;
  certificateName: string;
}
export const AttachLoadBalancerTlsCertificateRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ loadBalancerName: S.String, certificateName: S.String }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/AttachLoadBalancerTlsCertificate",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AttachLoadBalancerTlsCertificateRequest",
}) as any as S.Schema<AttachLoadBalancerTlsCertificateRequest>;
export interface AttachLoadBalancerTlsCertificateResult {
  operations?: Operation[];
}
export const AttachLoadBalancerTlsCertificateResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "AttachLoadBalancerTlsCertificateResult",
}) as any as S.Schema<AttachLoadBalancerTlsCertificateResult>;
export interface AttachStaticIpRequest {
  staticIpName: string;
  instanceName: string;
}
export const AttachStaticIpRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ staticIpName: S.String, instanceName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/AttachStaticIp" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AttachStaticIpRequest",
}) as any as S.Schema<AttachStaticIpRequest>;
export interface AttachStaticIpResult {
  operations?: Operation[];
}
export const AttachStaticIpResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "AttachStaticIpResult",
}) as any as S.Schema<AttachStaticIpResult>;
export type Port = number;
export type NetworkProtocol =
  | "tcp"
  | "all"
  | "udp"
  | "icmp"
  | "icmpv6"
  | (string & {});
export const NetworkProtocol = /*@__PURE__*/ S.String;

export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface PortInfo {
  fromPort?: number;
  toPort?: number;
  protocol?: NetworkProtocol;
  cidrs?: string[];
  ipv6Cidrs?: string[];
  cidrListAliases?: string[];
}
export const PortInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fromPort: S.optional(S.Number),
    toPort: S.optional(S.Number),
    protocol: S.optional(NetworkProtocol),
    cidrs: S.optional(StringList),
    ipv6Cidrs: S.optional(StringList),
    cidrListAliases: S.optional(StringList),
  }),
).annotate({ identifier: "PortInfo" }) as any as S.Schema<PortInfo>;
export interface CloseInstancePublicPortsRequest {
  portInfo: PortInfo;
  instanceName: string;
}
export const CloseInstancePublicPortsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ portInfo: PortInfo, instanceName: S.String }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/CloseInstancePublicPorts",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CloseInstancePublicPortsRequest",
}) as any as S.Schema<CloseInstancePublicPortsRequest>;
export interface CloseInstancePublicPortsResult {
  operation?: Operation;
}
export const CloseInstancePublicPortsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operation: S.optional(Operation) }),
).annotate({
  identifier: "CloseInstancePublicPortsResult",
}) as any as S.Schema<CloseInstancePublicPortsResult>;
export interface CopySnapshotRequest {
  sourceSnapshotName?: string;
  sourceResourceName?: string;
  restoreDate?: string;
  useLatestRestorableAutoSnapshot?: boolean;
  targetSnapshotName: string;
  sourceRegion: RegionName;
}
export const CopySnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceSnapshotName: S.optional(S.String),
    sourceResourceName: S.optional(S.String),
    restoreDate: S.optional(S.String),
    useLatestRestorableAutoSnapshot: S.optional(S.Boolean),
    targetSnapshotName: S.String,
    sourceRegion: RegionName,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CopySnapshot" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CopySnapshotRequest",
}) as any as S.Schema<CopySnapshotRequest>;
export interface CopySnapshotResult {
  operations?: Operation[];
}
export const CopySnapshotResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "CopySnapshotResult",
}) as any as S.Schema<CopySnapshotResult>;
export type BucketName = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key?: string;
  value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface CreateBucketRequest {
  bucketName: string;
  bundleId: string;
  tags?: Tag[];
  enableObjectVersioning?: boolean;
}
export const CreateBucketRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucketName: S.String,
    bundleId: S.String,
    tags: S.optional(TagList),
    enableObjectVersioning: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateBucket" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateBucketRequest",
}) as any as S.Schema<CreateBucketRequest>;
export type AccessType = "public" | "private" | (string & {});
export const AccessType = /*@__PURE__*/ S.String;

export interface AccessRules {
  getObject?: AccessType;
  allowPublicOverrides?: boolean;
}
export const AccessRules = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    getObject: S.optional(AccessType),
    allowPublicOverrides: S.optional(S.Boolean),
  }),
).annotate({ identifier: "AccessRules" }) as any as S.Schema<AccessRules>;
export type PartnerIdList = string[];
export const PartnerIdList = /*@__PURE__*/ S.Array(S.String);
export interface ResourceReceivingAccess {
  name?: string;
  resourceType?: string;
}
export const ResourceReceivingAccess = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), resourceType: S.optional(S.String) }),
).annotate({
  identifier: "ResourceReceivingAccess",
}) as any as S.Schema<ResourceReceivingAccess>;
export type AccessReceiverList = ResourceReceivingAccess[];
export const AccessReceiverList = /*@__PURE__*/ S.Array(
  ResourceReceivingAccess,
);
export interface BucketState {
  code?: string;
  message?: string;
}
export const BucketState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ code: S.optional(S.String), message: S.optional(S.String) }),
).annotate({ identifier: "BucketState" }) as any as S.Schema<BucketState>;
export type BucketAccessLogPrefix = string;
export interface BucketAccessLogConfig {
  enabled: boolean;
  destination?: string;
  prefix?: string;
}
export const BucketAccessLogConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.Boolean,
    destination: S.optional(S.String),
    prefix: S.optional(S.String),
  }),
).annotate({
  identifier: "BucketAccessLogConfig",
}) as any as S.Schema<BucketAccessLogConfig>;
export type BucketCorsRuleId = string;
export type BucketCorsAllowedMethod = string;
export type BucketCorsAllowedMethods = string[];
export const BucketCorsAllowedMethods = /*@__PURE__*/ S.Array(S.String);
export type BucketCorsAllowedOrigins = string[];
export const BucketCorsAllowedOrigins = /*@__PURE__*/ S.Array(S.String);
export type BucketCorsAllowedHeaders = string[];
export const BucketCorsAllowedHeaders = /*@__PURE__*/ S.Array(S.String);
export type BucketCorsExposeHeaders = string[];
export const BucketCorsExposeHeaders = /*@__PURE__*/ S.Array(S.String);
export interface BucketCorsRule {
  id?: string;
  allowedMethods: string[];
  allowedOrigins: string[];
  allowedHeaders?: string[];
  exposeHeaders?: string[];
  maxAgeSeconds?: number;
}
export const BucketCorsRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    allowedMethods: BucketCorsAllowedMethods,
    allowedOrigins: BucketCorsAllowedOrigins,
    allowedHeaders: S.optional(BucketCorsAllowedHeaders),
    exposeHeaders: S.optional(BucketCorsExposeHeaders),
    maxAgeSeconds: S.optional(S.Number),
  }),
).annotate({ identifier: "BucketCorsRule" }) as any as S.Schema<BucketCorsRule>;
export type BucketCorsRules = BucketCorsRule[];
export const BucketCorsRules = /*@__PURE__*/ S.Array(BucketCorsRule);
export interface BucketCorsConfig {
  rules?: BucketCorsRule[];
}
export const BucketCorsConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ rules: S.optional(BucketCorsRules) }),
).annotate({
  identifier: "BucketCorsConfig",
}) as any as S.Schema<BucketCorsConfig>;
export interface Bucket {
  resourceType?: string;
  accessRules?: AccessRules;
  arn?: string;
  bundleId?: string;
  createdAt?: Date;
  url?: string;
  location?: ResourceLocation;
  name?: string;
  supportCode?: string;
  tags?: Tag[];
  objectVersioning?: string;
  ableToUpdateBundle?: boolean;
  readonlyAccessAccounts?: string[];
  resourcesReceivingAccess?: ResourceReceivingAccess[];
  state?: BucketState;
  accessLogConfig?: BucketAccessLogConfig;
  cors?: BucketCorsConfig;
}
export const Bucket = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceType: S.optional(S.String),
    accessRules: S.optional(AccessRules),
    arn: S.optional(S.String),
    bundleId: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    url: S.optional(S.String),
    location: S.optional(ResourceLocation),
    name: S.optional(S.String),
    supportCode: S.optional(S.String),
    tags: S.optional(TagList),
    objectVersioning: S.optional(S.String),
    ableToUpdateBundle: S.optional(S.Boolean),
    readonlyAccessAccounts: S.optional(PartnerIdList),
    resourcesReceivingAccess: S.optional(AccessReceiverList),
    state: S.optional(BucketState),
    accessLogConfig: S.optional(BucketAccessLogConfig),
    cors: S.optional(BucketCorsConfig),
  }),
).annotate({ identifier: "Bucket" }) as any as S.Schema<Bucket>;
export interface CreateBucketResult {
  bucket?: Bucket;
  operations?: Operation[];
}
export const CreateBucketResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucket: S.optional(Bucket),
    operations: S.optional(OperationList),
  }),
).annotate({
  identifier: "CreateBucketResult",
}) as any as S.Schema<CreateBucketResult>;
export interface CreateBucketAccessKeyRequest {
  bucketName: string;
}
export const CreateBucketAccessKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucketName: S.String }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/CreateBucketAccessKey",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateBucketAccessKeyRequest",
}) as any as S.Schema<CreateBucketAccessKeyRequest>;
export type IAMAccessKeyId = string | redacted.Redacted<string>;
export type StatusType = "Active" | "Inactive" | (string & {});
export const StatusType = /*@__PURE__*/ S.String;

export interface AccessKeyLastUsed {
  lastUsedDate?: Date;
  region?: string;
  serviceName?: string;
}
export const AccessKeyLastUsed = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    lastUsedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    region: S.optional(S.String),
    serviceName: S.optional(S.String),
  }),
).annotate({
  identifier: "AccessKeyLastUsed",
}) as any as S.Schema<AccessKeyLastUsed>;
export interface AccessKey {
  accessKeyId?: string | redacted.Redacted<string>;
  secretAccessKey?: string;
  status?: StatusType;
  createdAt?: Date;
  lastUsed?: AccessKeyLastUsed;
}
export const AccessKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessKeyId: S.optional(SensitiveString),
    secretAccessKey: S.optional(S.String),
    status: S.optional(StatusType),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUsed: S.optional(AccessKeyLastUsed),
  }),
).annotate({ identifier: "AccessKey" }) as any as S.Schema<AccessKey>;
export interface CreateBucketAccessKeyResult {
  accessKey?: AccessKey;
  operations?: Operation[];
}
export const CreateBucketAccessKeyResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessKey: S.optional(AccessKey),
    operations: S.optional(OperationList),
  }),
).annotate({
  identifier: "CreateBucketAccessKeyResult",
}) as any as S.Schema<CreateBucketAccessKeyResult>;
export type CertificateName = string;
export type DomainName = string;
export type SubjectAlternativeNameList = string[];
export const SubjectAlternativeNameList = /*@__PURE__*/ S.Array(S.String);
export interface CreateCertificateRequest {
  certificateName: string;
  domainName: string;
  subjectAlternativeNames?: string[];
  tags?: Tag[];
}
export const CreateCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateName: S.String,
    domainName: S.String,
    subjectAlternativeNames: S.optional(SubjectAlternativeNameList),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateCertificate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCertificateRequest",
}) as any as S.Schema<CreateCertificateRequest>;
export type CertificateStatus =
  | "PENDING_VALIDATION"
  | "ISSUED"
  | "INACTIVE"
  | "EXPIRED"
  | "VALIDATION_TIMED_OUT"
  | "REVOKED"
  | "FAILED"
  | (string & {});
export const CertificateStatus = /*@__PURE__*/ S.String;

export type SerialNumber = string;
export interface ResourceRecord {
  name?: string;
  type?: string;
  value?: string;
}
export const ResourceRecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    type: S.optional(S.String),
    value: S.optional(S.String),
  }),
).annotate({ identifier: "ResourceRecord" }) as any as S.Schema<ResourceRecord>;
export type DnsRecordCreationStateCode =
  | "SUCCEEDED"
  | "STARTED"
  | "FAILED"
  | (string & {});
export const DnsRecordCreationStateCode = /*@__PURE__*/ S.String;

export interface DnsRecordCreationState {
  code?: DnsRecordCreationStateCode;
  message?: string;
}
export const DnsRecordCreationState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    code: S.optional(DnsRecordCreationStateCode),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "DnsRecordCreationState",
}) as any as S.Schema<DnsRecordCreationState>;
export type CertificateDomainValidationStatus =
  | "PENDING_VALIDATION"
  | "FAILED"
  | "SUCCESS"
  | (string & {});
export const CertificateDomainValidationStatus = /*@__PURE__*/ S.String;

export interface DomainValidationRecord {
  domainName?: string;
  resourceRecord?: ResourceRecord;
  dnsRecordCreationState?: DnsRecordCreationState;
  validationStatus?: CertificateDomainValidationStatus;
}
export const DomainValidationRecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainName: S.optional(S.String),
    resourceRecord: S.optional(ResourceRecord),
    dnsRecordCreationState: S.optional(DnsRecordCreationState),
    validationStatus: S.optional(CertificateDomainValidationStatus),
  }),
).annotate({
  identifier: "DomainValidationRecord",
}) as any as S.Schema<DomainValidationRecord>;
export type DomainValidationRecordList = DomainValidationRecord[];
export const DomainValidationRecordList = /*@__PURE__*/ S.Array(
  DomainValidationRecord,
);
export type RequestFailureReason = string;
export type InUseResourceCount = number;
export type KeyAlgorithm = string;
export type IssuerCA = string;
export type EligibleToRenew = string;
export type RenewalStatus =
  | "PendingAutoRenewal"
  | "PendingValidation"
  | "Success"
  | "Failed"
  | (string & {});
export const RenewalStatus = /*@__PURE__*/ S.String;

export type RenewalStatusReason = string;
export interface RenewalSummary {
  domainValidationRecords?: DomainValidationRecord[];
  renewalStatus?: RenewalStatus;
  renewalStatusReason?: string;
  updatedAt?: Date;
}
export const RenewalSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainValidationRecords: S.optional(DomainValidationRecordList),
    renewalStatus: S.optional(RenewalStatus),
    renewalStatusReason: S.optional(S.String),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "RenewalSummary" }) as any as S.Schema<RenewalSummary>;
export type RevocationReason = string;
export interface Certificate {
  arn?: string;
  name?: string;
  domainName?: string;
  status?: CertificateStatus;
  serialNumber?: string;
  subjectAlternativeNames?: string[];
  domainValidationRecords?: DomainValidationRecord[];
  requestFailureReason?: string;
  inUseResourceCount?: number;
  keyAlgorithm?: string;
  createdAt?: Date;
  issuedAt?: Date;
  issuerCA?: string;
  notBefore?: Date;
  notAfter?: Date;
  eligibleToRenew?: string;
  renewalSummary?: RenewalSummary;
  revokedAt?: Date;
  revocationReason?: string;
  tags?: Tag[];
  supportCode?: string;
}
export const Certificate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    domainName: S.optional(S.String),
    status: S.optional(CertificateStatus),
    serialNumber: S.optional(S.String),
    subjectAlternativeNames: S.optional(SubjectAlternativeNameList),
    domainValidationRecords: S.optional(DomainValidationRecordList),
    requestFailureReason: S.optional(S.String),
    inUseResourceCount: S.optional(S.Number),
    keyAlgorithm: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    issuedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    issuerCA: S.optional(S.String),
    notBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    notAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    eligibleToRenew: S.optional(S.String),
    renewalSummary: S.optional(RenewalSummary),
    revokedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    revocationReason: S.optional(S.String),
    tags: S.optional(TagList),
    supportCode: S.optional(S.String),
  }),
).annotate({ identifier: "Certificate" }) as any as S.Schema<Certificate>;
export interface CertificateSummary {
  certificateArn?: string;
  certificateName?: string;
  domainName?: string;
  certificateDetail?: Certificate;
  tags?: Tag[];
}
export const CertificateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateArn: S.optional(S.String),
    certificateName: S.optional(S.String),
    domainName: S.optional(S.String),
    certificateDetail: S.optional(Certificate),
    tags: S.optional(TagList),
  }),
).annotate({
  identifier: "CertificateSummary",
}) as any as S.Schema<CertificateSummary>;
export interface CreateCertificateResult {
  certificate?: CertificateSummary;
  operations?: Operation[];
}
export const CreateCertificateResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificate: S.optional(CertificateSummary),
    operations: S.optional(OperationList),
  }),
).annotate({
  identifier: "CreateCertificateResult",
}) as any as S.Schema<CreateCertificateResult>;
export type PortInfoSourceType =
  | "DEFAULT"
  | "INSTANCE"
  | "NONE"
  | "CLOSED"
  | (string & {});
export const PortInfoSourceType = /*@__PURE__*/ S.String;

export interface InstanceEntry {
  sourceName: string;
  instanceType: string;
  portInfoSource: PortInfoSourceType;
  userData?: string;
  availabilityZone: string;
}
export const InstanceEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceName: S.String,
    instanceType: S.String,
    portInfoSource: PortInfoSourceType,
    userData: S.optional(S.String),
    availabilityZone: S.String,
  }),
).annotate({ identifier: "InstanceEntry" }) as any as S.Schema<InstanceEntry>;
export type InstanceEntryList = InstanceEntry[];
export const InstanceEntryList = /*@__PURE__*/ S.Array(InstanceEntry);
export interface CreateCloudFormationStackRequest {
  instances: InstanceEntry[];
}
export const CreateCloudFormationStackRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instances: InstanceEntryList }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/CreateCloudFormationStack",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCloudFormationStackRequest",
}) as any as S.Schema<CreateCloudFormationStackRequest>;
export interface CreateCloudFormationStackResult {
  operations?: Operation[];
}
export const CreateCloudFormationStackResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "CreateCloudFormationStackResult",
}) as any as S.Schema<CreateCloudFormationStackResult>;
export type ContactProtocol = "Email" | "SMS" | (string & {});
export const ContactProtocol = /*@__PURE__*/ S.String;

export type StringMax256 = string;
export interface CreateContactMethodRequest {
  protocol: ContactProtocol;
  contactEndpoint: string;
  tags?: Tag[];
}
export const CreateContactMethodRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    protocol: ContactProtocol,
    contactEndpoint: S.String,
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateContactMethod" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateContactMethodRequest",
}) as any as S.Schema<CreateContactMethodRequest>;
export interface CreateContactMethodResult {
  operations?: Operation[];
}
export const CreateContactMethodResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "CreateContactMethodResult",
}) as any as S.Schema<CreateContactMethodResult>;
export type ContainerServiceName = string;
export type ContainerServicePowerName =
  | "nano"
  | "micro"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | (string & {});
export const ContainerServicePowerName = /*@__PURE__*/ S.String;

export type ContainerServiceScale = number;
export type ContainerServicePublicDomainsList = string[];
export const ContainerServicePublicDomainsList = /*@__PURE__*/ S.Array(
  S.String,
);
export type ContainerServicePublicDomains = {
  [key: string]: string[] | undefined;
};
export const ContainerServicePublicDomains = /*@__PURE__*/ S.Record(
  S.String,
  ContainerServicePublicDomainsList.pipe(S.optional),
);
export type ContainerName = string;
export type Environment = { [key: string]: string | undefined };
export const Environment = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ContainerServiceProtocol =
  | "HTTP"
  | "HTTPS"
  | "TCP"
  | "UDP"
  | (string & {});
export const ContainerServiceProtocol = /*@__PURE__*/ S.String;

export type PortMap = { [key: string]: ContainerServiceProtocol | undefined };
export const PortMap = /*@__PURE__*/ S.Record(
  S.String,
  ContainerServiceProtocol.pipe(S.optional),
);
export interface Container {
  image?: string;
  command?: string[];
  environment?: { [key: string]: string | undefined };
  ports?: { [key: string]: ContainerServiceProtocol | undefined };
}
export const Container = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    image: S.optional(S.String),
    command: S.optional(StringList),
    environment: S.optional(Environment),
    ports: S.optional(PortMap),
  }),
).annotate({ identifier: "Container" }) as any as S.Schema<Container>;
export type ContainerMap = { [key: string]: Container | undefined };
export const ContainerMap = /*@__PURE__*/ S.Record(
  S.String,
  Container.pipe(S.optional),
);
export interface ContainerServiceHealthCheckConfig {
  healthyThreshold?: number;
  unhealthyThreshold?: number;
  timeoutSeconds?: number;
  intervalSeconds?: number;
  path?: string;
  successCodes?: string;
}
export const ContainerServiceHealthCheckConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    healthyThreshold: S.optional(S.Number),
    unhealthyThreshold: S.optional(S.Number),
    timeoutSeconds: S.optional(S.Number),
    intervalSeconds: S.optional(S.Number),
    path: S.optional(S.String),
    successCodes: S.optional(S.String),
  }),
).annotate({
  identifier: "ContainerServiceHealthCheckConfig",
}) as any as S.Schema<ContainerServiceHealthCheckConfig>;
export interface EndpointRequest {
  containerName: string;
  containerPort: number;
  healthCheck?: ContainerServiceHealthCheckConfig;
}
export const EndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containerName: S.String,
    containerPort: S.Number,
    healthCheck: S.optional(ContainerServiceHealthCheckConfig),
  }),
).annotate({
  identifier: "EndpointRequest",
}) as any as S.Schema<EndpointRequest>;
export interface ContainerServiceDeploymentRequest {
  containers?: { [key: string]: Container | undefined };
  publicEndpoint?: EndpointRequest;
}
export const ContainerServiceDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containers: S.optional(ContainerMap),
    publicEndpoint: S.optional(EndpointRequest),
  }),
).annotate({
  identifier: "ContainerServiceDeploymentRequest",
}) as any as S.Schema<ContainerServiceDeploymentRequest>;
export interface ContainerServiceECRImagePullerRoleRequest {
  isActive?: boolean;
}
export const ContainerServiceECRImagePullerRoleRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ isActive: S.optional(S.Boolean) }),
  ).annotate({
    identifier: "ContainerServiceECRImagePullerRoleRequest",
  }) as any as S.Schema<ContainerServiceECRImagePullerRoleRequest>;
export interface PrivateRegistryAccessRequest {
  ecrImagePullerRole?: ContainerServiceECRImagePullerRoleRequest;
}
export const PrivateRegistryAccessRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ecrImagePullerRole: S.optional(ContainerServiceECRImagePullerRoleRequest),
  }),
).annotate({
  identifier: "PrivateRegistryAccessRequest",
}) as any as S.Schema<PrivateRegistryAccessRequest>;
export interface CreateContainerServiceRequest {
  serviceName: string;
  power: ContainerServicePowerName;
  scale: number;
  tags?: Tag[];
  publicDomainNames?: { [key: string]: string[] | undefined };
  deployment?: ContainerServiceDeploymentRequest;
  privateRegistryAccess?: PrivateRegistryAccessRequest;
}
export const CreateContainerServiceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceName: S.String,
    power: ContainerServicePowerName,
    scale: S.Number,
    tags: S.optional(TagList),
    publicDomainNames: S.optional(ContainerServicePublicDomains),
    deployment: S.optional(ContainerServiceDeploymentRequest),
    privateRegistryAccess: S.optional(PrivateRegistryAccessRequest),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/container-services" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateContainerServiceRequest",
}) as any as S.Schema<CreateContainerServiceRequest>;
export type ContainerServiceState =
  | "PENDING"
  | "READY"
  | "RUNNING"
  | "UPDATING"
  | "DELETING"
  | "DISABLED"
  | "DEPLOYING"
  | (string & {});
export const ContainerServiceState = /*@__PURE__*/ S.String;

export type ContainerServiceStateDetailCode =
  | "CREATING_SYSTEM_RESOURCES"
  | "CREATING_NETWORK_INFRASTRUCTURE"
  | "PROVISIONING_CERTIFICATE"
  | "PROVISIONING_SERVICE"
  | "CREATING_DEPLOYMENT"
  | "EVALUATING_HEALTH_CHECK"
  | "ACTIVATING_DEPLOYMENT"
  | "CERTIFICATE_LIMIT_EXCEEDED"
  | "UNKNOWN_ERROR"
  | (string & {});
export const ContainerServiceStateDetailCode = /*@__PURE__*/ S.String;

export interface ContainerServiceStateDetail {
  code?: ContainerServiceStateDetailCode;
  message?: string;
}
export const ContainerServiceStateDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    code: S.optional(ContainerServiceStateDetailCode),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "ContainerServiceStateDetail",
}) as any as S.Schema<ContainerServiceStateDetail>;
export type ContainerServiceDeploymentState =
  | "ACTIVATING"
  | "ACTIVE"
  | "INACTIVE"
  | "FAILED"
  | (string & {});
export const ContainerServiceDeploymentState = /*@__PURE__*/ S.String;

export interface ContainerServiceEndpoint {
  containerName?: string;
  containerPort?: number;
  healthCheck?: ContainerServiceHealthCheckConfig;
}
export const ContainerServiceEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containerName: S.optional(S.String),
    containerPort: S.optional(S.Number),
    healthCheck: S.optional(ContainerServiceHealthCheckConfig),
  }),
).annotate({
  identifier: "ContainerServiceEndpoint",
}) as any as S.Schema<ContainerServiceEndpoint>;
export interface ContainerServiceDeployment {
  version?: number;
  state?: ContainerServiceDeploymentState;
  containers?: { [key: string]: Container | undefined };
  publicEndpoint?: ContainerServiceEndpoint;
  createdAt?: Date;
}
export const ContainerServiceDeployment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    version: S.optional(S.Number),
    state: S.optional(ContainerServiceDeploymentState),
    containers: S.optional(ContainerMap),
    publicEndpoint: S.optional(ContainerServiceEndpoint),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ContainerServiceDeployment",
}) as any as S.Schema<ContainerServiceDeployment>;
export interface ContainerServiceECRImagePullerRole {
  isActive?: boolean;
  principalArn?: string;
}
export const ContainerServiceECRImagePullerRole = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    isActive: S.optional(S.Boolean),
    principalArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ContainerServiceECRImagePullerRole",
}) as any as S.Schema<ContainerServiceECRImagePullerRole>;
export interface PrivateRegistryAccess {
  ecrImagePullerRole?: ContainerServiceECRImagePullerRole;
}
export const PrivateRegistryAccess = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ecrImagePullerRole: S.optional(ContainerServiceECRImagePullerRole),
  }),
).annotate({
  identifier: "PrivateRegistryAccess",
}) as any as S.Schema<PrivateRegistryAccess>;
export interface ContainerService {
  containerServiceName?: string;
  arn?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  tags?: Tag[];
  power?: ContainerServicePowerName;
  powerId?: string;
  state?: ContainerServiceState;
  stateDetail?: ContainerServiceStateDetail;
  scale?: number;
  currentDeployment?: ContainerServiceDeployment;
  nextDeployment?: ContainerServiceDeployment;
  isDisabled?: boolean;
  principalArn?: string;
  privateDomainName?: string;
  publicDomainNames?: { [key: string]: string[] | undefined };
  url?: string;
  privateRegistryAccess?: PrivateRegistryAccess;
}
export const ContainerService = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containerServiceName: S.optional(S.String),
    arn: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    location: S.optional(ResourceLocation),
    resourceType: S.optional(ResourceType),
    tags: S.optional(TagList),
    power: S.optional(ContainerServicePowerName),
    powerId: S.optional(S.String),
    state: S.optional(ContainerServiceState),
    stateDetail: S.optional(ContainerServiceStateDetail),
    scale: S.optional(S.Number),
    currentDeployment: S.optional(ContainerServiceDeployment),
    nextDeployment: S.optional(ContainerServiceDeployment),
    isDisabled: S.optional(S.Boolean),
    principalArn: S.optional(S.String),
    privateDomainName: S.optional(S.String),
    publicDomainNames: S.optional(ContainerServicePublicDomains),
    url: S.optional(S.String),
    privateRegistryAccess: S.optional(PrivateRegistryAccess),
  }),
).annotate({
  identifier: "ContainerService",
}) as any as S.Schema<ContainerService>;
export interface CreateContainerServiceResult {
  containerService?: ContainerService;
}
export const CreateContainerServiceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ containerService: S.optional(ContainerService) }),
).annotate({
  identifier: "CreateContainerServiceResult",
}) as any as S.Schema<CreateContainerServiceResult>;
export interface CreateContainerServiceDeploymentRequest {
  serviceName: string;
  containers?: { [key: string]: Container | undefined };
  publicEndpoint?: EndpointRequest;
}
export const CreateContainerServiceDeploymentRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      serviceName: S.String.pipe(T.HttpLabel("serviceName")),
      containers: S.optional(ContainerMap),
      publicEndpoint: S.optional(EndpointRequest),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/container-services/{serviceName}/deployments",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateContainerServiceDeploymentRequest",
}) as any as S.Schema<CreateContainerServiceDeploymentRequest>;
export interface CreateContainerServiceDeploymentResult {
  containerService?: ContainerService;
}
export const CreateContainerServiceDeploymentResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ containerService: S.optional(ContainerService) }),
).annotate({
  identifier: "CreateContainerServiceDeploymentResult",
}) as any as S.Schema<CreateContainerServiceDeploymentResult>;
export interface CreateContainerServiceRegistryLoginRequest {}
export const CreateContainerServiceRegistryLoginRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({}).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/container-registry-login",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateContainerServiceRegistryLoginRequest",
  }) as any as S.Schema<CreateContainerServiceRegistryLoginRequest>;
export interface ContainerServiceRegistryLogin {
  username?: string;
  password?: string;
  expiresAt?: Date;
  registry?: string;
}
export const ContainerServiceRegistryLogin = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    username: S.optional(S.String),
    password: S.optional(S.String),
    expiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    registry: S.optional(S.String),
  }),
).annotate({
  identifier: "ContainerServiceRegistryLogin",
}) as any as S.Schema<ContainerServiceRegistryLogin>;
export interface CreateContainerServiceRegistryLoginResult {
  registryLogin?: ContainerServiceRegistryLogin;
}
export const CreateContainerServiceRegistryLoginResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ registryLogin: S.optional(ContainerServiceRegistryLogin) }),
  ).annotate({
    identifier: "CreateContainerServiceRegistryLoginResult",
  }) as any as S.Schema<CreateContainerServiceRegistryLoginResult>;
export type AddOnType = "AutoSnapshot" | "StopInstanceOnIdle" | (string & {});
export const AddOnType = /*@__PURE__*/ S.String;

export type TimeOfDay = string;
export interface AutoSnapshotAddOnRequest {
  snapshotTimeOfDay?: string;
}
export const AutoSnapshotAddOnRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ snapshotTimeOfDay: S.optional(S.String) }),
).annotate({
  identifier: "AutoSnapshotAddOnRequest",
}) as any as S.Schema<AutoSnapshotAddOnRequest>;
export interface StopInstanceOnIdleRequest {
  threshold?: string;
  duration?: string;
}
export const StopInstanceOnIdleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ threshold: S.optional(S.String), duration: S.optional(S.String) }),
).annotate({
  identifier: "StopInstanceOnIdleRequest",
}) as any as S.Schema<StopInstanceOnIdleRequest>;
export interface AddOnRequest {
  addOnType: AddOnType;
  autoSnapshotAddOnRequest?: AutoSnapshotAddOnRequest;
  stopInstanceOnIdleRequest?: StopInstanceOnIdleRequest;
}
export const AddOnRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    addOnType: AddOnType,
    autoSnapshotAddOnRequest: S.optional(AutoSnapshotAddOnRequest),
    stopInstanceOnIdleRequest: S.optional(StopInstanceOnIdleRequest),
  }),
).annotate({ identifier: "AddOnRequest" }) as any as S.Schema<AddOnRequest>;
export type AddOnRequestList = AddOnRequest[];
export const AddOnRequestList = /*@__PURE__*/ S.Array(AddOnRequest);
export interface CreateDiskRequest {
  diskName: string;
  availabilityZone: string;
  sizeInGb: number;
  tags?: Tag[];
  addOns?: AddOnRequest[];
}
export const CreateDiskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    diskName: S.String,
    availabilityZone: S.String,
    sizeInGb: S.Number,
    tags: S.optional(TagList),
    addOns: S.optional(AddOnRequestList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateDisk" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDiskRequest",
}) as any as S.Schema<CreateDiskRequest>;
export interface CreateDiskResult {
  operations?: Operation[];
}
export const CreateDiskResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "CreateDiskResult",
}) as any as S.Schema<CreateDiskResult>;
export interface CreateDiskFromSnapshotRequest {
  diskName: string;
  diskSnapshotName?: string;
  availabilityZone: string;
  sizeInGb: number;
  tags?: Tag[];
  addOns?: AddOnRequest[];
  sourceDiskName?: string;
  restoreDate?: string;
  useLatestRestorableAutoSnapshot?: boolean;
}
export const CreateDiskFromSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    diskName: S.String,
    diskSnapshotName: S.optional(S.String),
    availabilityZone: S.String,
    sizeInGb: S.Number,
    tags: S.optional(TagList),
    addOns: S.optional(AddOnRequestList),
    sourceDiskName: S.optional(S.String),
    restoreDate: S.optional(S.String),
    useLatestRestorableAutoSnapshot: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/CreateDiskFromSnapshot",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDiskFromSnapshotRequest",
}) as any as S.Schema<CreateDiskFromSnapshotRequest>;
export interface CreateDiskFromSnapshotResult {
  operations?: Operation[];
}
export const CreateDiskFromSnapshotResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "CreateDiskFromSnapshotResult",
}) as any as S.Schema<CreateDiskFromSnapshotResult>;
export interface CreateDiskSnapshotRequest {
  diskName?: string;
  diskSnapshotName: string;
  instanceName?: string;
  tags?: Tag[];
}
export const CreateDiskSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    diskName: S.optional(S.String),
    diskSnapshotName: S.String,
    instanceName: S.optional(S.String),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateDiskSnapshot" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDiskSnapshotRequest",
}) as any as S.Schema<CreateDiskSnapshotRequest>;
export interface CreateDiskSnapshotResult {
  operations?: Operation[];
}
export const CreateDiskSnapshotResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "CreateDiskSnapshotResult",
}) as any as S.Schema<CreateDiskSnapshotResult>;
export type OriginProtocolPolicyEnum =
  | "http-only"
  | "https-only"
  | (string & {});
export const OriginProtocolPolicyEnum = /*@__PURE__*/ S.String;

export type OriginIpAddressTypeEnum =
  | "ipv4"
  | "ipv6"
  | "dualstack"
  | (string & {});
export const OriginIpAddressTypeEnum = /*@__PURE__*/ S.String;

export interface InputOrigin {
  name?: string;
  regionName?: RegionName;
  protocolPolicy?: OriginProtocolPolicyEnum;
  responseTimeout?: number;
  ipAddressType?: OriginIpAddressTypeEnum;
}
export const InputOrigin = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    regionName: S.optional(RegionName),
    protocolPolicy: S.optional(OriginProtocolPolicyEnum),
    responseTimeout: S.optional(S.Number),
    ipAddressType: S.optional(OriginIpAddressTypeEnum),
  }),
).annotate({ identifier: "InputOrigin" }) as any as S.Schema<InputOrigin>;
export type BehaviorEnum = "dont-cache" | "cache" | (string & {});
export const BehaviorEnum = /*@__PURE__*/ S.String;

export interface CacheBehavior {
  behavior?: BehaviorEnum;
}
export const CacheBehavior = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ behavior: S.optional(BehaviorEnum) }),
).annotate({ identifier: "CacheBehavior" }) as any as S.Schema<CacheBehavior>;
export type ForwardValues = "none" | "allow-list" | "all" | (string & {});
export const ForwardValues = /*@__PURE__*/ S.String;

export interface CookieObject {
  option?: ForwardValues;
  cookiesAllowList?: string[];
}
export const CookieObject = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    option: S.optional(ForwardValues),
    cookiesAllowList: S.optional(StringList),
  }),
).annotate({ identifier: "CookieObject" }) as any as S.Schema<CookieObject>;
export type HeaderEnum =
  | "Accept"
  | "Accept-Charset"
  | "Accept-Datetime"
  | "Accept-Encoding"
  | "Accept-Language"
  | "Authorization"
  | "CloudFront-Forwarded-Proto"
  | "CloudFront-Is-Desktop-Viewer"
  | "CloudFront-Is-Mobile-Viewer"
  | "CloudFront-Is-SmartTV-Viewer"
  | "CloudFront-Is-Tablet-Viewer"
  | "CloudFront-Viewer-Country"
  | "Host"
  | "Origin"
  | "Referer"
  | (string & {});
export const HeaderEnum = /*@__PURE__*/ S.String;

export type HeaderForwardList = HeaderEnum[];
export const HeaderForwardList = /*@__PURE__*/ S.Array(HeaderEnum);
export interface HeaderObject {
  option?: ForwardValues;
  headersAllowList?: HeaderEnum[];
}
export const HeaderObject = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    option: S.optional(ForwardValues),
    headersAllowList: S.optional(HeaderForwardList),
  }),
).annotate({ identifier: "HeaderObject" }) as any as S.Schema<HeaderObject>;
export interface QueryStringObject {
  option?: boolean;
  queryStringsAllowList?: string[];
}
export const QueryStringObject = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    option: S.optional(S.Boolean),
    queryStringsAllowList: S.optional(StringList),
  }),
).annotate({
  identifier: "QueryStringObject",
}) as any as S.Schema<QueryStringObject>;
export interface CacheSettings {
  defaultTTL?: number;
  minimumTTL?: number;
  maximumTTL?: number;
  allowedHTTPMethods?: string;
  cachedHTTPMethods?: string;
  forwardedCookies?: CookieObject;
  forwardedHeaders?: HeaderObject;
  forwardedQueryStrings?: QueryStringObject;
}
export const CacheSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    defaultTTL: S.optional(S.Number),
    minimumTTL: S.optional(S.Number),
    maximumTTL: S.optional(S.Number),
    allowedHTTPMethods: S.optional(S.String),
    cachedHTTPMethods: S.optional(S.String),
    forwardedCookies: S.optional(CookieObject),
    forwardedHeaders: S.optional(HeaderObject),
    forwardedQueryStrings: S.optional(QueryStringObject),
  }),
).annotate({ identifier: "CacheSettings" }) as any as S.Schema<CacheSettings>;
export interface CacheBehaviorPerPath {
  path?: string;
  behavior?: BehaviorEnum;
}
export const CacheBehaviorPerPath = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ path: S.optional(S.String), behavior: S.optional(BehaviorEnum) }),
).annotate({
  identifier: "CacheBehaviorPerPath",
}) as any as S.Schema<CacheBehaviorPerPath>;
export type CacheBehaviorList = CacheBehaviorPerPath[];
export const CacheBehaviorList = /*@__PURE__*/ S.Array(CacheBehaviorPerPath);
export type IpAddressType = "dualstack" | "ipv4" | "ipv6" | (string & {});
export const IpAddressType = /*@__PURE__*/ S.String;

export type ViewerMinimumTlsProtocolVersionEnum =
  | "TLSv1.1_2016"
  | "TLSv1.2_2018"
  | "TLSv1.2_2019"
  | "TLSv1.2_2021"
  | (string & {});
export const ViewerMinimumTlsProtocolVersionEnum = /*@__PURE__*/ S.String;

export interface CreateDistributionRequest {
  distributionName: string;
  origin: InputOrigin;
  defaultCacheBehavior: CacheBehavior;
  cacheBehaviorSettings?: CacheSettings;
  cacheBehaviors?: CacheBehaviorPerPath[];
  bundleId: string;
  ipAddressType?: IpAddressType;
  tags?: Tag[];
  certificateName?: string;
  viewerMinimumTlsProtocolVersion?: ViewerMinimumTlsProtocolVersionEnum;
}
export const CreateDistributionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    distributionName: S.String,
    origin: InputOrigin,
    defaultCacheBehavior: CacheBehavior,
    cacheBehaviorSettings: S.optional(CacheSettings),
    cacheBehaviors: S.optional(CacheBehaviorList),
    bundleId: S.String,
    ipAddressType: S.optional(IpAddressType),
    tags: S.optional(TagList),
    certificateName: S.optional(S.String),
    viewerMinimumTlsProtocolVersion: S.optional(
      ViewerMinimumTlsProtocolVersionEnum,
    ),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateDistribution" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDistributionRequest",
}) as any as S.Schema<CreateDistributionRequest>;
export interface Origin {
  name?: string;
  resourceType?: ResourceType;
  regionName?: RegionName;
  protocolPolicy?: OriginProtocolPolicyEnum;
  responseTimeout?: number;
  ipAddressType?: OriginIpAddressTypeEnum;
}
export const Origin = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    resourceType: S.optional(ResourceType),
    regionName: S.optional(RegionName),
    protocolPolicy: S.optional(OriginProtocolPolicyEnum),
    responseTimeout: S.optional(S.Number),
    ipAddressType: S.optional(OriginIpAddressTypeEnum),
  }),
).annotate({ identifier: "Origin" }) as any as S.Schema<Origin>;
export interface LightsailDistribution {
  name?: string;
  arn?: string;
  supportCode?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  alternativeDomainNames?: string[];
  status?: string;
  isEnabled?: boolean;
  domainName?: string;
  bundleId?: string;
  certificateName?: string;
  origin?: Origin;
  originPublicDNS?: string;
  defaultCacheBehavior?: CacheBehavior;
  cacheBehaviorSettings?: CacheSettings;
  cacheBehaviors?: CacheBehaviorPerPath[];
  ableToUpdateBundle?: boolean;
  ipAddressType?: IpAddressType;
  tags?: Tag[];
  viewerMinimumTlsProtocolVersion?: string;
}
export const LightsailDistribution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    supportCode: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    location: S.optional(ResourceLocation),
    resourceType: S.optional(ResourceType),
    alternativeDomainNames: S.optional(StringList),
    status: S.optional(S.String),
    isEnabled: S.optional(S.Boolean),
    domainName: S.optional(S.String),
    bundleId: S.optional(S.String),
    certificateName: S.optional(S.String),
    origin: S.optional(Origin),
    originPublicDNS: S.optional(S.String),
    defaultCacheBehavior: S.optional(CacheBehavior),
    cacheBehaviorSettings: S.optional(CacheSettings),
    cacheBehaviors: S.optional(CacheBehaviorList),
    ableToUpdateBundle: S.optional(S.Boolean),
    ipAddressType: S.optional(IpAddressType),
    tags: S.optional(TagList),
    viewerMinimumTlsProtocolVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "LightsailDistribution",
}) as any as S.Schema<LightsailDistribution>;
export interface CreateDistributionResult {
  distribution?: LightsailDistribution;
  operation?: Operation;
}
export const CreateDistributionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    distribution: S.optional(LightsailDistribution),
    operation: S.optional(Operation),
  }),
).annotate({
  identifier: "CreateDistributionResult",
}) as any as S.Schema<CreateDistributionResult>;
export interface CreateDomainRequest {
  domainName: string;
  tags?: Tag[];
}
export const CreateDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainName: S.String, tags: S.optional(TagList) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateDomain" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDomainRequest",
}) as any as S.Schema<CreateDomainRequest>;
export interface CreateDomainResult {
  operation?: Operation;
}
export const CreateDomainResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operation: S.optional(Operation) }),
).annotate({
  identifier: "CreateDomainResult",
}) as any as S.Schema<CreateDomainResult>;
export type DomainEntryType = string;
export type DomainEntryOptionsKeys = string;
export type DomainEntryOptions = { [key: string]: string | undefined };
export const DomainEntryOptions = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface DomainEntry {
  id?: string;
  name?: string;
  target?: string;
  isAlias?: boolean;
  type?: string;
  options?: { [key: string]: string | undefined };
}
export const DomainEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    target: S.optional(S.String),
    isAlias: S.optional(S.Boolean),
    type: S.optional(S.String),
    options: S.optional(DomainEntryOptions),
  }),
).annotate({ identifier: "DomainEntry" }) as any as S.Schema<DomainEntry>;
export interface CreateDomainEntryRequest {
  domainName: string;
  domainEntry: DomainEntry;
}
export const CreateDomainEntryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainName: S.String, domainEntry: DomainEntry }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateDomainEntry" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDomainEntryRequest",
}) as any as S.Schema<CreateDomainEntryRequest>;
export interface CreateDomainEntryResult {
  operation?: Operation;
}
export const CreateDomainEntryResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operation: S.optional(Operation) }),
).annotate({
  identifier: "CreateDomainEntryResult",
}) as any as S.Schema<CreateDomainEntryResult>;
export interface CreateGUISessionAccessDetailsRequest {
  resourceName: string;
}
export const CreateGUISessionAccessDetailsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ resourceName: S.String }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/create-gui-session-access-details",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateGUISessionAccessDetailsRequest",
}) as any as S.Schema<CreateGUISessionAccessDetailsRequest>;
export type Status =
  | "startExpired"
  | "notStarted"
  | "started"
  | "starting"
  | "stopped"
  | "stopping"
  | "settingUpInstance"
  | "failedInstanceCreation"
  | "failedStartingGUISession"
  | "failedStoppingGUISession"
  | (string & {});
export const Status = /*@__PURE__*/ S.String;

export type SensitiveNonEmptyString = string | redacted.Redacted<string>;
export interface Session {
  name?: string;
  url?: string | redacted.Redacted<string>;
  isPrimary?: boolean;
}
export const Session = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    url: S.optional(SensitiveString),
    isPrimary: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Session" }) as any as S.Schema<Session>;
export type Sessions = Session[];
export const Sessions = /*@__PURE__*/ S.Array(Session);
export interface CreateGUISessionAccessDetailsResult {
  resourceName?: string;
  status?: Status;
  percentageComplete?: number;
  failureReason?: string;
  sessions?: Session[];
}
export const CreateGUISessionAccessDetailsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceName: S.optional(S.String),
    status: S.optional(Status),
    percentageComplete: S.optional(S.Number),
    failureReason: S.optional(S.String),
    sessions: S.optional(Sessions),
  }),
).annotate({
  identifier: "CreateGUISessionAccessDetailsResult",
}) as any as S.Schema<CreateGUISessionAccessDetailsResult>;
export interface CreateInstancesRequest {
  instanceNames: string[];
  availabilityZone: string;
  customImageName?: string;
  blueprintId: string;
  bundleId: string;
  userData?: string;
  keyPairName?: string;
  tags?: Tag[];
  addOns?: AddOnRequest[];
  ipAddressType?: IpAddressType;
}
export const CreateInstancesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceNames: StringList,
    availabilityZone: S.String,
    customImageName: S.optional(S.String),
    blueprintId: S.String,
    bundleId: S.String,
    userData: S.optional(S.String),
    keyPairName: S.optional(S.String),
    tags: S.optional(TagList),
    addOns: S.optional(AddOnRequestList),
    ipAddressType: S.optional(IpAddressType),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateInstances" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateInstancesRequest",
}) as any as S.Schema<CreateInstancesRequest>;
export interface CreateInstancesResult {
  operations?: Operation[];
}
export const CreateInstancesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "CreateInstancesResult",
}) as any as S.Schema<CreateInstancesResult>;
export interface DiskMap {
  originalDiskPath?: string;
  newDiskName?: string;
}
export const DiskMap = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    originalDiskPath: S.optional(S.String),
    newDiskName: S.optional(S.String),
  }),
).annotate({ identifier: "DiskMap" }) as any as S.Schema<DiskMap>;
export type DiskMapList = DiskMap[];
export const DiskMapList = /*@__PURE__*/ S.Array(DiskMap);
export type AttachedDiskMap = { [key: string]: DiskMap[] | undefined };
export const AttachedDiskMap = /*@__PURE__*/ S.Record(
  S.String,
  DiskMapList.pipe(S.optional),
);
export interface CreateInstancesFromSnapshotRequest {
  instanceNames: string[];
  attachedDiskMapping?: { [key: string]: DiskMap[] | undefined };
  availabilityZone: string;
  instanceSnapshotName?: string;
  bundleId: string;
  userData?: string;
  keyPairName?: string;
  tags?: Tag[];
  addOns?: AddOnRequest[];
  ipAddressType?: IpAddressType;
  sourceInstanceName?: string;
  restoreDate?: string;
  useLatestRestorableAutoSnapshot?: boolean;
}
export const CreateInstancesFromSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceNames: StringList,
    attachedDiskMapping: S.optional(AttachedDiskMap),
    availabilityZone: S.String,
    instanceSnapshotName: S.optional(S.String),
    bundleId: S.String,
    userData: S.optional(S.String),
    keyPairName: S.optional(S.String),
    tags: S.optional(TagList),
    addOns: S.optional(AddOnRequestList),
    ipAddressType: S.optional(IpAddressType),
    sourceInstanceName: S.optional(S.String),
    restoreDate: S.optional(S.String),
    useLatestRestorableAutoSnapshot: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/CreateInstancesFromSnapshot",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateInstancesFromSnapshotRequest",
}) as any as S.Schema<CreateInstancesFromSnapshotRequest>;
export interface CreateInstancesFromSnapshotResult {
  operations?: Operation[];
}
export const CreateInstancesFromSnapshotResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "CreateInstancesFromSnapshotResult",
}) as any as S.Schema<CreateInstancesFromSnapshotResult>;
export interface CreateInstanceSnapshotRequest {
  instanceSnapshotName: string;
  instanceName: string;
  tags?: Tag[];
}
export const CreateInstanceSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceSnapshotName: S.String,
    instanceName: S.String,
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/CreateInstanceSnapshot",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateInstanceSnapshotRequest",
}) as any as S.Schema<CreateInstanceSnapshotRequest>;
export interface CreateInstanceSnapshotResult {
  operations?: Operation[];
}
export const CreateInstanceSnapshotResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "CreateInstanceSnapshotResult",
}) as any as S.Schema<CreateInstanceSnapshotResult>;
export interface CreateKeyPairRequest {
  keyPairName: string;
  tags?: Tag[];
}
export const CreateKeyPairRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ keyPairName: S.String, tags: S.optional(TagList) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateKeyPair" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateKeyPairRequest",
}) as any as S.Schema<CreateKeyPairRequest>;
export type Base64 = string;
export interface KeyPair {
  name?: string;
  arn?: string;
  supportCode?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  tags?: Tag[];
  fingerprint?: string;
}
export const KeyPair = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    supportCode: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    location: S.optional(ResourceLocation),
    resourceType: S.optional(ResourceType),
    tags: S.optional(TagList),
    fingerprint: S.optional(S.String),
  }),
).annotate({ identifier: "KeyPair" }) as any as S.Schema<KeyPair>;
export interface CreateKeyPairResult {
  keyPair?: KeyPair;
  publicKeyBase64?: string;
  privateKeyBase64?: string;
  operation?: Operation;
}
export const CreateKeyPairResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    keyPair: S.optional(KeyPair),
    publicKeyBase64: S.optional(S.String),
    privateKeyBase64: S.optional(S.String),
    operation: S.optional(Operation),
  }),
).annotate({
  identifier: "CreateKeyPairResult",
}) as any as S.Schema<CreateKeyPairResult>;
export type DomainNameList = string[];
export const DomainNameList = /*@__PURE__*/ S.Array(S.String);
export interface CreateLoadBalancerRequest {
  loadBalancerName: string;
  instancePort: number;
  healthCheckPath?: string;
  certificateName?: string;
  certificateDomainName?: string;
  certificateAlternativeNames?: string[];
  tags?: Tag[];
  ipAddressType?: IpAddressType;
  tlsPolicyName?: string;
}
export const CreateLoadBalancerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    loadBalancerName: S.String,
    instancePort: S.Number,
    healthCheckPath: S.optional(S.String),
    certificateName: S.optional(S.String),
    certificateDomainName: S.optional(S.String),
    certificateAlternativeNames: S.optional(DomainNameList),
    tags: S.optional(TagList),
    ipAddressType: S.optional(IpAddressType),
    tlsPolicyName: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/CreateLoadBalancer" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateLoadBalancerRequest",
}) as any as S.Schema<CreateLoadBalancerRequest>;
export interface CreateLoadBalancerResult {
  operations?: Operation[];
}
export const CreateLoadBalancerResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "CreateLoadBalancerResult",
}) as any as S.Schema<CreateLoadBalancerResult>;
export interface CreateLoadBalancerTlsCertificateRequest {
  loadBalancerName: string;
  certificateName: string;
  certificateDomainName: string;
  certificateAlternativeNames?: string[];
  tags?: Tag[];
}
export const CreateLoadBalancerTlsCertificateRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      loadBalancerName: S.String,
      certificateName: S.String,
      certificateDomainName: S.String,
      certificateAlternativeNames: S.optional(DomainNameList),
      tags: S.optional(TagList),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/CreateLoadBalancerTlsCertificate",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateLoadBalancerTlsCertificateRequest",
}) as any as S.Schema<CreateLoadBalancerTlsCertificateRequest>;
export interface CreateLoadBalancerTlsCertificateResult {
  operations?: Operation[];
}
export const CreateLoadBalancerTlsCertificateResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "CreateLoadBalancerTlsCertificateResult",
}) as any as S.Schema<CreateLoadBalancerTlsCertificateResult>;
export type SensitiveString = string | redacted.Redacted<string>;
export interface CreateRelationalDatabaseRequest {
  relationalDatabaseName: string;
  availabilityZone?: string;
  relationalDatabaseBlueprintId: string;
  relationalDatabaseBundleId: string;
  masterDatabaseName: string;
  masterUsername: string;
  masterUserPassword?: string | redacted.Redacted<string>;
  preferredBackupWindow?: string;
  preferredMaintenanceWindow?: string;
  publiclyAccessible?: boolean;
  tags?: Tag[];
}
export const CreateRelationalDatabaseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    relationalDatabaseName: S.String,
    availabilityZone: S.optional(S.String),
    relationalDatabaseBlueprintId: S.String,
    relationalDatabaseBundleId: S.String,
    masterDatabaseName: S.String,
    masterUsername: S.String,
    masterUserPassword: S.optional(SensitiveString),
    preferredBackupWindow: S.optional(S.String),
    preferredMaintenanceWindow: S.optional(S.String),
    publiclyAccessible: S.optional(S.Boolean),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/CreateRelationalDatabase",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRelationalDatabaseRequest",
}) as any as S.Schema<CreateRelationalDatabaseRequest>;
export interface CreateRelationalDatabaseResult {
  operations?: Operation[];
}
export const CreateRelationalDatabaseResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "CreateRelationalDatabaseResult",
}) as any as S.Schema<CreateRelationalDatabaseResult>;
export interface CreateRelationalDatabaseFromSnapshotRequest {
  relationalDatabaseName: string;
  availabilityZone?: string;
  publiclyAccessible?: boolean;
  relationalDatabaseSnapshotName?: string;
  relationalDatabaseBundleId?: string;
  sourceRelationalDatabaseName?: string;
  restoreTime?: Date;
  useLatestRestorableTime?: boolean;
  tags?: Tag[];
}
export const CreateRelationalDatabaseFromSnapshotRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      relationalDatabaseName: S.String,
      availabilityZone: S.optional(S.String),
      publiclyAccessible: S.optional(S.Boolean),
      relationalDatabaseSnapshotName: S.optional(S.String),
      relationalDatabaseBundleId: S.optional(S.String),
      sourceRelationalDatabaseName: S.optional(S.String),
      restoreTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      useLatestRestorableTime: S.optional(S.Boolean),
      tags: S.optional(TagList),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/CreateRelationalDatabaseFromSnapshot",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateRelationalDatabaseFromSnapshotRequest",
  }) as any as S.Schema<CreateRelationalDatabaseFromSnapshotRequest>;
export interface CreateRelationalDatabaseFromSnapshotResult {
  operations?: Operation[];
}
export const CreateRelationalDatabaseFromSnapshotResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ operations: S.optional(OperationList) }),
  ).annotate({
    identifier: "CreateRelationalDatabaseFromSnapshotResult",
  }) as any as S.Schema<CreateRelationalDatabaseFromSnapshotResult>;
export interface CreateRelationalDatabaseSnapshotRequest {
  relationalDatabaseName: string;
  relationalDatabaseSnapshotName: string;
  tags?: Tag[];
}
export const CreateRelationalDatabaseSnapshotRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      relationalDatabaseName: S.String,
      relationalDatabaseSnapshotName: S.String,
      tags: S.optional(TagList),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/CreateRelationalDatabaseSnapshot",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateRelationalDatabaseSnapshotRequest",
}) as any as S.Schema<CreateRelationalDatabaseSnapshotRequest>;
export interface CreateRelationalDatabaseSnapshotResult {
  operations?: Operation[];
}
export const CreateRelationalDatabaseSnapshotResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "CreateRelationalDatabaseSnapshotResult",
}) as any as S.Schema<CreateRelationalDatabaseSnapshotResult>;
export interface DeleteAlarmRequest {
  alarmName: string;
}
export const DeleteAlarmRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ alarmName: S.String.pipe(T.HttpLabel("alarmName")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/ls/api/2016-11-28/DeleteAlarm/{alarmName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAlarmRequest",
}) as any as S.Schema<DeleteAlarmRequest>;
export interface DeleteAlarmResult {
  operations?: Operation[];
}
export const DeleteAlarmResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "DeleteAlarmResult",
}) as any as S.Schema<DeleteAlarmResult>;
export type AutoSnapshotDate = string;
export interface DeleteAutoSnapshotRequest {
  resourceName: string;
  date: string;
}
export const DeleteAutoSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceName: S.String, date: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteAutoSnapshot" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAutoSnapshotRequest",
}) as any as S.Schema<DeleteAutoSnapshotRequest>;
export interface DeleteAutoSnapshotResult {
  operations?: Operation[];
}
export const DeleteAutoSnapshotResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "DeleteAutoSnapshotResult",
}) as any as S.Schema<DeleteAutoSnapshotResult>;
export interface DeleteBucketRequest {
  bucketName: string;
  forceDelete?: boolean;
}
export const DeleteBucketRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucketName: S.String, forceDelete: S.optional(S.Boolean) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteBucket" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBucketRequest",
}) as any as S.Schema<DeleteBucketRequest>;
export interface DeleteBucketResult {
  operations?: Operation[];
}
export const DeleteBucketResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "DeleteBucketResult",
}) as any as S.Schema<DeleteBucketResult>;
export interface DeleteBucketAccessKeyRequest {
  bucketName: string;
  accessKeyId: string;
}
export const DeleteBucketAccessKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucketName: S.String, accessKeyId: S.String }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/DeleteBucketAccessKey",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBucketAccessKeyRequest",
}) as any as S.Schema<DeleteBucketAccessKeyRequest>;
export interface DeleteBucketAccessKeyResult {
  operations?: Operation[];
}
export const DeleteBucketAccessKeyResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "DeleteBucketAccessKeyResult",
}) as any as S.Schema<DeleteBucketAccessKeyResult>;
export interface DeleteCertificateRequest {
  certificateName: string;
}
export const DeleteCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ certificateName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteCertificate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCertificateRequest",
}) as any as S.Schema<DeleteCertificateRequest>;
export interface DeleteCertificateResult {
  operations?: Operation[];
}
export const DeleteCertificateResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "DeleteCertificateResult",
}) as any as S.Schema<DeleteCertificateResult>;
export interface DeleteContactMethodRequest {
  protocol: ContactProtocol;
}
export const DeleteContactMethodRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ protocol: ContactProtocol }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteContactMethod" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteContactMethodRequest",
}) as any as S.Schema<DeleteContactMethodRequest>;
export interface DeleteContactMethodResult {
  operations?: Operation[];
}
export const DeleteContactMethodResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "DeleteContactMethodResult",
}) as any as S.Schema<DeleteContactMethodResult>;
export interface DeleteContainerImageRequest {
  serviceName: string;
  image: string;
}
export const DeleteContainerImageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceName: S.String.pipe(T.HttpLabel("serviceName")),
    image: S.String.pipe(T.HttpLabel("image")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/ls/api/2016-11-28/container-services/{serviceName}/images/{image}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteContainerImageRequest",
}) as any as S.Schema<DeleteContainerImageRequest>;
export interface DeleteContainerImageResult {}
export const DeleteContainerImageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteContainerImageResult",
}) as any as S.Schema<DeleteContainerImageResult>;
export interface DeleteContainerServiceRequest {
  serviceName: string;
}
export const DeleteContainerServiceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceName: S.String.pipe(T.HttpLabel("serviceName")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/ls/api/2016-11-28/container-services/{serviceName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteContainerServiceRequest",
}) as any as S.Schema<DeleteContainerServiceRequest>;
export interface DeleteContainerServiceResult {}
export const DeleteContainerServiceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteContainerServiceResult",
}) as any as S.Schema<DeleteContainerServiceResult>;
export interface DeleteDiskRequest {
  diskName: string;
  forceDeleteAddOns?: boolean;
}
export const DeleteDiskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    diskName: S.String,
    forceDeleteAddOns: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteDisk" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDiskRequest",
}) as any as S.Schema<DeleteDiskRequest>;
export interface DeleteDiskResult {
  operations?: Operation[];
}
export const DeleteDiskResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "DeleteDiskResult",
}) as any as S.Schema<DeleteDiskResult>;
export interface DeleteDiskSnapshotRequest {
  diskSnapshotName: string;
}
export const DeleteDiskSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ diskSnapshotName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteDiskSnapshot" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDiskSnapshotRequest",
}) as any as S.Schema<DeleteDiskSnapshotRequest>;
export interface DeleteDiskSnapshotResult {
  operations?: Operation[];
}
export const DeleteDiskSnapshotResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "DeleteDiskSnapshotResult",
}) as any as S.Schema<DeleteDiskSnapshotResult>;
export interface DeleteDistributionRequest {
  distributionName?: string;
}
export const DeleteDistributionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ distributionName: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteDistribution" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDistributionRequest",
}) as any as S.Schema<DeleteDistributionRequest>;
export interface DeleteDistributionResult {
  operation?: Operation;
}
export const DeleteDistributionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operation: S.optional(Operation) }),
).annotate({
  identifier: "DeleteDistributionResult",
}) as any as S.Schema<DeleteDistributionResult>;
export interface DeleteDomainRequest {
  domainName: string;
}
export const DeleteDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteDomain" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDomainRequest",
}) as any as S.Schema<DeleteDomainRequest>;
export interface DeleteDomainResult {
  operation?: Operation;
}
export const DeleteDomainResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operation: S.optional(Operation) }),
).annotate({
  identifier: "DeleteDomainResult",
}) as any as S.Schema<DeleteDomainResult>;
export interface DeleteDomainEntryRequest {
  domainName: string;
  domainEntry: DomainEntry;
}
export const DeleteDomainEntryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainName: S.String, domainEntry: DomainEntry }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteDomainEntry" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDomainEntryRequest",
}) as any as S.Schema<DeleteDomainEntryRequest>;
export interface DeleteDomainEntryResult {
  operation?: Operation;
}
export const DeleteDomainEntryResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operation: S.optional(Operation) }),
).annotate({
  identifier: "DeleteDomainEntryResult",
}) as any as S.Schema<DeleteDomainEntryResult>;
export interface DeleteInstanceRequest {
  instanceName: string;
  forceDeleteAddOns?: boolean;
}
export const DeleteInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceName: S.String,
    forceDeleteAddOns: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteInstance" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteInstanceRequest",
}) as any as S.Schema<DeleteInstanceRequest>;
export interface DeleteInstanceResult {
  operations?: Operation[];
}
export const DeleteInstanceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "DeleteInstanceResult",
}) as any as S.Schema<DeleteInstanceResult>;
export interface DeleteInstanceSnapshotRequest {
  instanceSnapshotName: string;
}
export const DeleteInstanceSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instanceSnapshotName: S.String }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/DeleteInstanceSnapshot",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteInstanceSnapshotRequest",
}) as any as S.Schema<DeleteInstanceSnapshotRequest>;
export interface DeleteInstanceSnapshotResult {
  operations?: Operation[];
}
export const DeleteInstanceSnapshotResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "DeleteInstanceSnapshotResult",
}) as any as S.Schema<DeleteInstanceSnapshotResult>;
export interface DeleteKeyPairRequest {
  keyPairName: string;
  expectedFingerprint?: string;
}
export const DeleteKeyPairRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    keyPairName: S.String,
    expectedFingerprint: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteKeyPair" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteKeyPairRequest",
}) as any as S.Schema<DeleteKeyPairRequest>;
export interface DeleteKeyPairResult {
  operation?: Operation;
}
export const DeleteKeyPairResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operation: S.optional(Operation) }),
).annotate({
  identifier: "DeleteKeyPairResult",
}) as any as S.Schema<DeleteKeyPairResult>;
export interface DeleteKnownHostKeysRequest {
  instanceName: string;
}
export const DeleteKnownHostKeysRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instanceName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteKnownHostKeys" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteKnownHostKeysRequest",
}) as any as S.Schema<DeleteKnownHostKeysRequest>;
export interface DeleteKnownHostKeysResult {
  operations?: Operation[];
}
export const DeleteKnownHostKeysResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "DeleteKnownHostKeysResult",
}) as any as S.Schema<DeleteKnownHostKeysResult>;
export interface DeleteLoadBalancerRequest {
  loadBalancerName: string;
}
export const DeleteLoadBalancerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ loadBalancerName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DeleteLoadBalancer" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLoadBalancerRequest",
}) as any as S.Schema<DeleteLoadBalancerRequest>;
export interface DeleteLoadBalancerResult {
  operations?: Operation[];
}
export const DeleteLoadBalancerResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "DeleteLoadBalancerResult",
}) as any as S.Schema<DeleteLoadBalancerResult>;
export interface DeleteLoadBalancerTlsCertificateRequest {
  loadBalancerName: string;
  certificateName: string;
  force?: boolean;
}
export const DeleteLoadBalancerTlsCertificateRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      loadBalancerName: S.String,
      certificateName: S.String,
      force: S.optional(S.Boolean),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/DeleteLoadBalancerTlsCertificate",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteLoadBalancerTlsCertificateRequest",
}) as any as S.Schema<DeleteLoadBalancerTlsCertificateRequest>;
export interface DeleteLoadBalancerTlsCertificateResult {
  operations?: Operation[];
}
export const DeleteLoadBalancerTlsCertificateResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "DeleteLoadBalancerTlsCertificateResult",
}) as any as S.Schema<DeleteLoadBalancerTlsCertificateResult>;
export interface DeleteRelationalDatabaseRequest {
  relationalDatabaseName: string;
  skipFinalSnapshot?: boolean;
  finalRelationalDatabaseSnapshotName?: string;
}
export const DeleteRelationalDatabaseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    relationalDatabaseName: S.String,
    skipFinalSnapshot: S.optional(S.Boolean),
    finalRelationalDatabaseSnapshotName: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/DeleteRelationalDatabase",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRelationalDatabaseRequest",
}) as any as S.Schema<DeleteRelationalDatabaseRequest>;
export interface DeleteRelationalDatabaseResult {
  operations?: Operation[];
}
export const DeleteRelationalDatabaseResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "DeleteRelationalDatabaseResult",
}) as any as S.Schema<DeleteRelationalDatabaseResult>;
export interface DeleteRelationalDatabaseSnapshotRequest {
  relationalDatabaseSnapshotName: string;
}
export const DeleteRelationalDatabaseSnapshotRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ relationalDatabaseSnapshotName: S.String }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/DeleteRelationalDatabaseSnapshot",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteRelationalDatabaseSnapshotRequest",
}) as any as S.Schema<DeleteRelationalDatabaseSnapshotRequest>;
export interface DeleteRelationalDatabaseSnapshotResult {
  operations?: Operation[];
}
export const DeleteRelationalDatabaseSnapshotResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "DeleteRelationalDatabaseSnapshotResult",
}) as any as S.Schema<DeleteRelationalDatabaseSnapshotResult>;
export interface DetachCertificateFromDistributionRequest {
  distributionName: string;
}
export const DetachCertificateFromDistributionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ distributionName: S.String }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/DetachCertificateFromDistribution",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DetachCertificateFromDistributionRequest",
}) as any as S.Schema<DetachCertificateFromDistributionRequest>;
export interface DetachCertificateFromDistributionResult {
  operation?: Operation;
}
export const DetachCertificateFromDistributionResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ operation: S.optional(Operation) }),
).annotate({
  identifier: "DetachCertificateFromDistributionResult",
}) as any as S.Schema<DetachCertificateFromDistributionResult>;
export interface DetachDiskRequest {
  diskName: string;
}
export const DetachDiskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ diskName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DetachDisk" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DetachDiskRequest",
}) as any as S.Schema<DetachDiskRequest>;
export interface DetachDiskResult {
  operations?: Operation[];
}
export const DetachDiskResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "DetachDiskResult",
}) as any as S.Schema<DetachDiskResult>;
export interface DetachInstancesFromLoadBalancerRequest {
  loadBalancerName: string;
  instanceNames: string[];
}
export const DetachInstancesFromLoadBalancerRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      loadBalancerName: S.String,
      instanceNames: ResourceNameList,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/DetachInstancesFromLoadBalancer",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DetachInstancesFromLoadBalancerRequest",
}) as any as S.Schema<DetachInstancesFromLoadBalancerRequest>;
export interface DetachInstancesFromLoadBalancerResult {
  operations?: Operation[];
}
export const DetachInstancesFromLoadBalancerResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "DetachInstancesFromLoadBalancerResult",
}) as any as S.Schema<DetachInstancesFromLoadBalancerResult>;
export interface DetachStaticIpRequest {
  staticIpName: string;
}
export const DetachStaticIpRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ staticIpName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DetachStaticIp" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DetachStaticIpRequest",
}) as any as S.Schema<DetachStaticIpRequest>;
export interface DetachStaticIpResult {
  operations?: Operation[];
}
export const DetachStaticIpResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "DetachStaticIpResult",
}) as any as S.Schema<DetachStaticIpResult>;
export interface DisableAddOnRequest {
  addOnType: AddOnType;
  resourceName: string;
}
export const DisableAddOnRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ addOnType: AddOnType, resourceName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/DisableAddOn" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisableAddOnRequest",
}) as any as S.Schema<DisableAddOnRequest>;
export interface DisableAddOnResult {
  operations?: Operation[];
}
export const DisableAddOnResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "DisableAddOnResult",
}) as any as S.Schema<DisableAddOnResult>;
export interface DownloadDefaultKeyPairRequest {}
export const DownloadDefaultKeyPairRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/DownloadDefaultKeyPair",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DownloadDefaultKeyPairRequest",
}) as any as S.Schema<DownloadDefaultKeyPairRequest>;
export interface DownloadDefaultKeyPairResult {
  publicKeyBase64?: string;
  privateKeyBase64?: string;
  createdAt?: Date;
}
export const DownloadDefaultKeyPairResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    publicKeyBase64: S.optional(S.String),
    privateKeyBase64: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DownloadDefaultKeyPairResult",
}) as any as S.Schema<DownloadDefaultKeyPairResult>;
export interface EnableAddOnRequest {
  resourceName: string;
  addOnRequest: AddOnRequest;
}
export const EnableAddOnRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceName: S.String, addOnRequest: AddOnRequest }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/EnableAddOn" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "EnableAddOnRequest",
}) as any as S.Schema<EnableAddOnRequest>;
export interface EnableAddOnResult {
  operations?: Operation[];
}
export const EnableAddOnResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "EnableAddOnResult",
}) as any as S.Schema<EnableAddOnResult>;
export interface ExportSnapshotRequest {
  sourceSnapshotName: string;
}
export const ExportSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceSnapshotName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/ExportSnapshot" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ExportSnapshotRequest",
}) as any as S.Schema<ExportSnapshotRequest>;
export interface ExportSnapshotResult {
  operations?: Operation[];
}
export const ExportSnapshotResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "ExportSnapshotResult",
}) as any as S.Schema<ExportSnapshotResult>;
export interface GetActiveNamesRequest {
  pageToken?: string;
}
export const GetActiveNamesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pageToken: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetActiveNames" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetActiveNamesRequest",
}) as any as S.Schema<GetActiveNamesRequest>;
export interface GetActiveNamesResult {
  activeNames?: string[];
  nextPageToken?: string;
}
export const GetActiveNamesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    activeNames: S.optional(StringList),
    nextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetActiveNamesResult",
}) as any as S.Schema<GetActiveNamesResult>;
export interface GetAlarmsRequest {
  alarmName?: string;
  pageToken?: string;
  monitoredResourceName?: string;
}
export const GetAlarmsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    alarmName: S.optional(S.String).pipe(T.HttpQuery("alarmName")),
    pageToken: S.optional(S.String).pipe(T.HttpQuery("pageToken")),
    monitoredResourceName: S.optional(S.String).pipe(
      T.HttpQuery("monitoredResourceName"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/ls/api/2016-11-28/GetAlarms" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAlarmsRequest",
}) as any as S.Schema<GetAlarmsRequest>;
export type ResourceArn = string;
export interface MonitoredResourceInfo {
  arn?: string;
  name?: string;
  resourceType?: ResourceType;
}
export const MonitoredResourceInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    resourceType: S.optional(ResourceType),
  }),
).annotate({
  identifier: "MonitoredResourceInfo",
}) as any as S.Schema<MonitoredResourceInfo>;
export type ComparisonOperator =
  | "GreaterThanOrEqualToThreshold"
  | "GreaterThanThreshold"
  | "LessThanThreshold"
  | "LessThanOrEqualToThreshold"
  | (string & {});
export const ComparisonOperator = /*@__PURE__*/ S.String;

export type MetricPeriod = number;
export type TreatMissingData =
  | "breaching"
  | "notBreaching"
  | "ignore"
  | "missing"
  | (string & {});
export const TreatMissingData = /*@__PURE__*/ S.String;

export type MetricStatistic =
  | "Minimum"
  | "Maximum"
  | "Sum"
  | "Average"
  | "SampleCount"
  | (string & {});
export const MetricStatistic = /*@__PURE__*/ S.String;

export type MetricName =
  | "CPUUtilization"
  | "NetworkIn"
  | "NetworkOut"
  | "StatusCheckFailed"
  | "StatusCheckFailed_Instance"
  | "StatusCheckFailed_System"
  | "ClientTLSNegotiationErrorCount"
  | "HealthyHostCount"
  | "UnhealthyHostCount"
  | "HTTPCode_LB_4XX_Count"
  | "HTTPCode_LB_5XX_Count"
  | "HTTPCode_Instance_2XX_Count"
  | "HTTPCode_Instance_3XX_Count"
  | "HTTPCode_Instance_4XX_Count"
  | "HTTPCode_Instance_5XX_Count"
  | "InstanceResponseTime"
  | "RejectedConnectionCount"
  | "RequestCount"
  | "DatabaseConnections"
  | "DiskQueueDepth"
  | "FreeStorageSpace"
  | "NetworkReceiveThroughput"
  | "NetworkTransmitThroughput"
  | "BurstCapacityTime"
  | "BurstCapacityPercentage"
  | (string & {});
export const MetricName = /*@__PURE__*/ S.String;

export type AlarmState = "OK" | "ALARM" | "INSUFFICIENT_DATA" | (string & {});
export const AlarmState = /*@__PURE__*/ S.String;

export type MetricUnit =
  | "Seconds"
  | "Microseconds"
  | "Milliseconds"
  | "Bytes"
  | "Kilobytes"
  | "Megabytes"
  | "Gigabytes"
  | "Terabytes"
  | "Bits"
  | "Kilobits"
  | "Megabits"
  | "Gigabits"
  | "Terabits"
  | "Percent"
  | "Count"
  | "Bytes/Second"
  | "Kilobytes/Second"
  | "Megabytes/Second"
  | "Gigabytes/Second"
  | "Terabytes/Second"
  | "Bits/Second"
  | "Kilobits/Second"
  | "Megabits/Second"
  | "Gigabits/Second"
  | "Terabits/Second"
  | "Count/Second"
  | "None"
  | (string & {});
export const MetricUnit = /*@__PURE__*/ S.String;

export type ContactProtocolsList = ContactProtocol[];
export const ContactProtocolsList = /*@__PURE__*/ S.Array(ContactProtocol);
export type NotificationTriggerList = AlarmState[];
export const NotificationTriggerList = /*@__PURE__*/ S.Array(AlarmState);
export interface Alarm {
  name?: string;
  arn?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  supportCode?: string;
  monitoredResourceInfo?: MonitoredResourceInfo;
  comparisonOperator?: ComparisonOperator;
  evaluationPeriods?: number;
  period?: number;
  threshold?: number;
  datapointsToAlarm?: number;
  treatMissingData?: TreatMissingData;
  statistic?: MetricStatistic;
  metricName?: MetricName;
  state?: AlarmState;
  unit?: MetricUnit;
  contactProtocols?: ContactProtocol[];
  notificationTriggers?: AlarmState[];
  notificationEnabled?: boolean;
  tags?: Tag[];
}
export const Alarm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    location: S.optional(ResourceLocation),
    resourceType: S.optional(ResourceType),
    supportCode: S.optional(S.String),
    monitoredResourceInfo: S.optional(MonitoredResourceInfo),
    comparisonOperator: S.optional(ComparisonOperator),
    evaluationPeriods: S.optional(S.Number),
    period: S.optional(S.Number),
    threshold: S.optional(S.Number),
    datapointsToAlarm: S.optional(S.Number),
    treatMissingData: S.optional(TreatMissingData),
    statistic: S.optional(MetricStatistic),
    metricName: S.optional(MetricName),
    state: S.optional(AlarmState),
    unit: S.optional(MetricUnit),
    contactProtocols: S.optional(ContactProtocolsList),
    notificationTriggers: S.optional(NotificationTriggerList),
    notificationEnabled: S.optional(S.Boolean),
    tags: S.optional(TagList),
  }),
).annotate({ identifier: "Alarm" }) as any as S.Schema<Alarm>;
export type AlarmsList = Alarm[];
export const AlarmsList = /*@__PURE__*/ S.Array(Alarm);
export interface GetAlarmsResult {
  alarms?: Alarm[];
  nextPageToken?: string;
}
export const GetAlarmsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    alarms: S.optional(AlarmsList),
    nextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetAlarmsResult",
}) as any as S.Schema<GetAlarmsResult>;
export interface GetAutoSnapshotsRequest {
  resourceName: string;
}
export const GetAutoSnapshotsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetAutoSnapshots" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAutoSnapshotsRequest",
}) as any as S.Schema<GetAutoSnapshotsRequest>;
export type AutoSnapshotStatus =
  | "Success"
  | "Failed"
  | "InProgress"
  | "NotFound"
  | (string & {});
export const AutoSnapshotStatus = /*@__PURE__*/ S.String;

export interface AttachedDisk {
  path?: string;
  sizeInGb?: number;
}
export const AttachedDisk = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ path: S.optional(S.String), sizeInGb: S.optional(S.Number) }),
).annotate({ identifier: "AttachedDisk" }) as any as S.Schema<AttachedDisk>;
export type AttachedDiskList = AttachedDisk[];
export const AttachedDiskList = /*@__PURE__*/ S.Array(AttachedDisk);
export interface AutoSnapshotDetails {
  date?: string;
  createdAt?: Date;
  status?: AutoSnapshotStatus;
  fromAttachedDisks?: AttachedDisk[];
}
export const AutoSnapshotDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    date: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    status: S.optional(AutoSnapshotStatus),
    fromAttachedDisks: S.optional(AttachedDiskList),
  }),
).annotate({
  identifier: "AutoSnapshotDetails",
}) as any as S.Schema<AutoSnapshotDetails>;
export type AutoSnapshotDetailsList = AutoSnapshotDetails[];
export const AutoSnapshotDetailsList =
  /*@__PURE__*/ S.Array(AutoSnapshotDetails);
export interface GetAutoSnapshotsResult {
  resourceName?: string;
  resourceType?: ResourceType;
  autoSnapshots?: AutoSnapshotDetails[];
}
export const GetAutoSnapshotsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceName: S.optional(S.String),
    resourceType: S.optional(ResourceType),
    autoSnapshots: S.optional(AutoSnapshotDetailsList),
  }),
).annotate({
  identifier: "GetAutoSnapshotsResult",
}) as any as S.Schema<GetAutoSnapshotsResult>;
export type AppCategory = "LfR" | (string & {});
export const AppCategory = /*@__PURE__*/ S.String;

export interface GetBlueprintsRequest {
  includeInactive?: boolean;
  pageToken?: string;
  appCategory?: AppCategory;
}
export const GetBlueprintsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    includeInactive: S.optional(S.Boolean),
    pageToken: S.optional(S.String),
    appCategory: S.optional(AppCategory),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetBlueprints" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBlueprintsRequest",
}) as any as S.Schema<GetBlueprintsRequest>;
export type BlueprintType = "os" | "app" | (string & {});
export const BlueprintType = /*@__PURE__*/ S.String;

export type InstancePlatform = "LINUX_UNIX" | "WINDOWS" | (string & {});
export const InstancePlatform = /*@__PURE__*/ S.String;

export interface Blueprint {
  blueprintId?: string;
  name?: string;
  group?: string;
  type?: BlueprintType;
  description?: string;
  isActive?: boolean;
  minPower?: number;
  version?: string;
  versionCode?: string;
  productUrl?: string;
  licenseUrl?: string;
  platform?: InstancePlatform;
  appCategory?: AppCategory;
}
export const Blueprint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    blueprintId: S.optional(S.String),
    name: S.optional(S.String),
    group: S.optional(S.String),
    type: S.optional(BlueprintType),
    description: S.optional(S.String),
    isActive: S.optional(S.Boolean),
    minPower: S.optional(S.Number),
    version: S.optional(S.String),
    versionCode: S.optional(S.String),
    productUrl: S.optional(S.String),
    licenseUrl: S.optional(S.String),
    platform: S.optional(InstancePlatform),
    appCategory: S.optional(AppCategory),
  }),
).annotate({ identifier: "Blueprint" }) as any as S.Schema<Blueprint>;
export type BlueprintList = Blueprint[];
export const BlueprintList = /*@__PURE__*/ S.Array(Blueprint);
export interface GetBlueprintsResult {
  blueprints?: Blueprint[];
  nextPageToken?: string;
}
export const GetBlueprintsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    blueprints: S.optional(BlueprintList),
    nextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetBlueprintsResult",
}) as any as S.Schema<GetBlueprintsResult>;
export interface GetBucketAccessKeysRequest {
  bucketName: string;
}
export const GetBucketAccessKeysRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucketName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetBucketAccessKeys" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBucketAccessKeysRequest",
}) as any as S.Schema<GetBucketAccessKeysRequest>;
export type AccessKeyList = AccessKey[];
export const AccessKeyList = /*@__PURE__*/ S.Array(AccessKey);
export interface GetBucketAccessKeysResult {
  accessKeys?: AccessKey[];
}
export const GetBucketAccessKeysResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accessKeys: S.optional(AccessKeyList) }),
).annotate({
  identifier: "GetBucketAccessKeysResult",
}) as any as S.Schema<GetBucketAccessKeysResult>;
export interface GetBucketBundlesRequest {
  includeInactive?: boolean;
}
export const GetBucketBundlesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ includeInactive: S.optional(S.Boolean) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetBucketBundles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBucketBundlesRequest",
}) as any as S.Schema<GetBucketBundlesRequest>;
export interface BucketBundle {
  bundleId?: string;
  name?: string;
  price?: number;
  storagePerMonthInGb?: number;
  transferPerMonthInGb?: number;
  isActive?: boolean;
}
export const BucketBundle = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bundleId: S.optional(S.String),
    name: S.optional(S.String),
    price: S.optional(S.Number),
    storagePerMonthInGb: S.optional(S.Number),
    transferPerMonthInGb: S.optional(S.Number),
    isActive: S.optional(S.Boolean),
  }),
).annotate({ identifier: "BucketBundle" }) as any as S.Schema<BucketBundle>;
export type BucketBundleList = BucketBundle[];
export const BucketBundleList = /*@__PURE__*/ S.Array(BucketBundle);
export interface GetBucketBundlesResult {
  bundles?: BucketBundle[];
}
export const GetBucketBundlesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bundles: S.optional(BucketBundleList) }),
).annotate({
  identifier: "GetBucketBundlesResult",
}) as any as S.Schema<GetBucketBundlesResult>;
export type BucketMetricName =
  | "BucketSizeBytes"
  | "NumberOfObjects"
  | (string & {});
export const BucketMetricName = /*@__PURE__*/ S.String;

export type MetricStatisticList = MetricStatistic[];
export const MetricStatisticList = /*@__PURE__*/ S.Array(MetricStatistic);
export interface GetBucketMetricDataRequest {
  bucketName: string;
  metricName: BucketMetricName;
  startTime: Date;
  endTime: Date;
  period: number;
  statistics: MetricStatistic[];
  unit: MetricUnit;
}
export const GetBucketMetricDataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucketName: S.String,
    metricName: BucketMetricName,
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    period: S.Number,
    statistics: MetricStatisticList,
    unit: MetricUnit,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetBucketMetricData" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBucketMetricDataRequest",
}) as any as S.Schema<GetBucketMetricDataRequest>;
export interface MetricDatapoint {
  average?: number;
  maximum?: number;
  minimum?: number;
  sampleCount?: number;
  sum?: number;
  timestamp?: Date;
  unit?: MetricUnit;
}
export const MetricDatapoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    average: S.optional(S.Number),
    maximum: S.optional(S.Number),
    minimum: S.optional(S.Number),
    sampleCount: S.optional(S.Number),
    sum: S.optional(S.Number),
    timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    unit: S.optional(MetricUnit),
  }),
).annotate({
  identifier: "MetricDatapoint",
}) as any as S.Schema<MetricDatapoint>;
export type MetricDatapointList = MetricDatapoint[];
export const MetricDatapointList = /*@__PURE__*/ S.Array(MetricDatapoint);
export interface GetBucketMetricDataResult {
  metricName?: BucketMetricName;
  metricData?: MetricDatapoint[];
}
export const GetBucketMetricDataResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricName: S.optional(BucketMetricName),
    metricData: S.optional(MetricDatapointList),
  }),
).annotate({
  identifier: "GetBucketMetricDataResult",
}) as any as S.Schema<GetBucketMetricDataResult>;
export interface GetBucketsRequest {
  bucketName?: string;
  pageToken?: string;
  includeConnectedResources?: boolean;
  includeCors?: boolean;
}
export const GetBucketsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucketName: S.optional(S.String),
    pageToken: S.optional(S.String),
    includeConnectedResources: S.optional(S.Boolean),
    includeCors: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetBuckets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBucketsRequest",
}) as any as S.Schema<GetBucketsRequest>;
export type BucketList = Bucket[];
export const BucketList = /*@__PURE__*/ S.Array(Bucket);
export type AccountLevelBpaSyncStatus =
  | "InSync"
  | "Failed"
  | "NeverSynced"
  | "Defaulted"
  | (string & {});
export const AccountLevelBpaSyncStatus = /*@__PURE__*/ S.String;

export type BPAStatusMessage =
  | "DEFAULTED_FOR_SLR_MISSING"
  | "SYNC_ON_HOLD"
  | "DEFAULTED_FOR_SLR_MISSING_ON_HOLD"
  | "Unknown"
  | (string & {});
export const BPAStatusMessage = /*@__PURE__*/ S.String;

export interface AccountLevelBpaSync {
  status?: AccountLevelBpaSyncStatus;
  lastSyncedAt?: Date;
  message?: BPAStatusMessage;
  bpaImpactsLightsail?: boolean;
}
export const AccountLevelBpaSync = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(AccountLevelBpaSyncStatus),
    lastSyncedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    message: S.optional(BPAStatusMessage),
    bpaImpactsLightsail: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AccountLevelBpaSync",
}) as any as S.Schema<AccountLevelBpaSync>;
export interface GetBucketsResult {
  buckets?: Bucket[];
  nextPageToken?: string;
  accountLevelBpaSync?: AccountLevelBpaSync;
}
export const GetBucketsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    buckets: S.optional(BucketList),
    nextPageToken: S.optional(S.String),
    accountLevelBpaSync: S.optional(AccountLevelBpaSync),
  }),
).annotate({
  identifier: "GetBucketsResult",
}) as any as S.Schema<GetBucketsResult>;
export interface GetBundlesRequest {
  includeInactive?: boolean;
  pageToken?: string;
  appCategory?: AppCategory;
}
export const GetBundlesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    includeInactive: S.optional(S.Boolean),
    pageToken: S.optional(S.String),
    appCategory: S.optional(AppCategory),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetBundles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBundlesRequest",
}) as any as S.Schema<GetBundlesRequest>;
export type InstancePlatformList = InstancePlatform[];
export const InstancePlatformList = /*@__PURE__*/ S.Array(InstancePlatform);
export type AppCategoryList = AppCategory[];
export const AppCategoryList = /*@__PURE__*/ S.Array(AppCategory);
export interface Bundle {
  price?: number;
  cpuCount?: number;
  diskSizeInGb?: number;
  bundleId?: string;
  instanceType?: string;
  isActive?: boolean;
  name?: string;
  power?: number;
  ramSizeInGb?: number;
  transferPerMonthInGb?: number;
  supportedPlatforms?: InstancePlatform[];
  supportedAppCategories?: AppCategory[];
  publicIpv4AddressCount?: number;
}
export const Bundle = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    price: S.optional(S.Number),
    cpuCount: S.optional(S.Number),
    diskSizeInGb: S.optional(S.Number),
    bundleId: S.optional(S.String),
    instanceType: S.optional(S.String),
    isActive: S.optional(S.Boolean),
    name: S.optional(S.String),
    power: S.optional(S.Number),
    ramSizeInGb: S.optional(S.Number),
    transferPerMonthInGb: S.optional(S.Number),
    supportedPlatforms: S.optional(InstancePlatformList),
    supportedAppCategories: S.optional(AppCategoryList),
    publicIpv4AddressCount: S.optional(S.Number),
  }),
).annotate({ identifier: "Bundle" }) as any as S.Schema<Bundle>;
export type BundleList = Bundle[];
export const BundleList = /*@__PURE__*/ S.Array(Bundle);
export interface GetBundlesResult {
  bundles?: Bundle[];
  nextPageToken?: string;
}
export const GetBundlesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bundles: S.optional(BundleList),
    nextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetBundlesResult",
}) as any as S.Schema<GetBundlesResult>;
export type CertificateStatusList = CertificateStatus[];
export const CertificateStatusList = /*@__PURE__*/ S.Array(CertificateStatus);
export type IncludeCertificateDetails = boolean;
export interface GetCertificatesRequest {
  certificateStatuses?: CertificateStatus[];
  includeCertificateDetails?: boolean;
  certificateName?: string;
  pageToken?: string;
}
export const GetCertificatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateStatuses: S.optional(CertificateStatusList),
    includeCertificateDetails: S.optional(S.Boolean),
    certificateName: S.optional(S.String),
    pageToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetCertificates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCertificatesRequest",
}) as any as S.Schema<GetCertificatesRequest>;
export type CertificateSummaryList = CertificateSummary[];
export const CertificateSummaryList = /*@__PURE__*/ S.Array(CertificateSummary);
export interface GetCertificatesResult {
  certificates?: CertificateSummary[];
  nextPageToken?: string;
}
export const GetCertificatesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificates: S.optional(CertificateSummaryList),
    nextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetCertificatesResult",
}) as any as S.Schema<GetCertificatesResult>;
export interface GetCloudFormationStackRecordsRequest {
  pageToken?: string;
}
export const GetCloudFormationStackRecordsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ pageToken: S.optional(S.String) }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/GetCloudFormationStackRecords",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetCloudFormationStackRecordsRequest",
}) as any as S.Schema<GetCloudFormationStackRecordsRequest>;
export type RecordState = "Started" | "Succeeded" | "Failed" | (string & {});
export const RecordState = /*@__PURE__*/ S.String;

export type CloudFormationStackRecordSourceType =
  | "ExportSnapshotRecord"
  | (string & {});
export const CloudFormationStackRecordSourceType = /*@__PURE__*/ S.String;

export interface CloudFormationStackRecordSourceInfo {
  resourceType?: CloudFormationStackRecordSourceType;
  name?: string;
  arn?: string;
}
export const CloudFormationStackRecordSourceInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceType: S.optional(CloudFormationStackRecordSourceType),
    name: S.optional(S.String),
    arn: S.optional(S.String),
  }),
).annotate({
  identifier: "CloudFormationStackRecordSourceInfo",
}) as any as S.Schema<CloudFormationStackRecordSourceInfo>;
export type CloudFormationStackRecordSourceInfoList =
  CloudFormationStackRecordSourceInfo[];
export const CloudFormationStackRecordSourceInfoList = /*@__PURE__*/ S.Array(
  CloudFormationStackRecordSourceInfo,
);
export interface DestinationInfo {
  id?: string;
  service?: string;
}
export const DestinationInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String), service: S.optional(S.String) }),
).annotate({
  identifier: "DestinationInfo",
}) as any as S.Schema<DestinationInfo>;
export interface CloudFormationStackRecord {
  name?: string;
  arn?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  state?: RecordState;
  sourceInfo?: CloudFormationStackRecordSourceInfo[];
  destinationInfo?: DestinationInfo;
}
export const CloudFormationStackRecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    location: S.optional(ResourceLocation),
    resourceType: S.optional(ResourceType),
    state: S.optional(RecordState),
    sourceInfo: S.optional(CloudFormationStackRecordSourceInfoList),
    destinationInfo: S.optional(DestinationInfo),
  }),
).annotate({
  identifier: "CloudFormationStackRecord",
}) as any as S.Schema<CloudFormationStackRecord>;
export type CloudFormationStackRecordList = CloudFormationStackRecord[];
export const CloudFormationStackRecordList = /*@__PURE__*/ S.Array(
  CloudFormationStackRecord,
);
export interface GetCloudFormationStackRecordsResult {
  cloudFormationStackRecords?: CloudFormationStackRecord[];
  nextPageToken?: string;
}
export const GetCloudFormationStackRecordsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cloudFormationStackRecords: S.optional(CloudFormationStackRecordList),
    nextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetCloudFormationStackRecordsResult",
}) as any as S.Schema<GetCloudFormationStackRecordsResult>;
export interface GetContactMethodsRequest {
  protocols?: ContactProtocol[];
}
export const GetContactMethodsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    protocols: S.optional(ContactProtocolsList).pipe(T.HttpQuery("protocols")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/ls/api/2016-11-28/GetContactMethods" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetContactMethodsRequest",
}) as any as S.Schema<GetContactMethodsRequest>;
export type ContactMethodStatus =
  | "PendingVerification"
  | "Valid"
  | "Invalid"
  | (string & {});
export const ContactMethodStatus = /*@__PURE__*/ S.String;

export interface ContactMethod {
  contactEndpoint?: string;
  status?: ContactMethodStatus;
  protocol?: ContactProtocol;
  name?: string;
  arn?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  supportCode?: string;
  tags?: Tag[];
}
export const ContactMethod = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contactEndpoint: S.optional(S.String),
    status: S.optional(ContactMethodStatus),
    protocol: S.optional(ContactProtocol),
    name: S.optional(S.String),
    arn: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    location: S.optional(ResourceLocation),
    resourceType: S.optional(ResourceType),
    supportCode: S.optional(S.String),
    tags: S.optional(TagList),
  }),
).annotate({ identifier: "ContactMethod" }) as any as S.Schema<ContactMethod>;
export type ContactMethodsList = ContactMethod[];
export const ContactMethodsList = /*@__PURE__*/ S.Array(ContactMethod);
export interface GetContactMethodsResult {
  contactMethods?: ContactMethod[];
}
export const GetContactMethodsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ contactMethods: S.optional(ContactMethodsList) }),
).annotate({
  identifier: "GetContactMethodsResult",
}) as any as S.Schema<GetContactMethodsResult>;
export interface GetContainerAPIMetadataRequest {}
export const GetContainerAPIMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/ls/api/2016-11-28/container-api-metadata",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetContainerAPIMetadataRequest",
}) as any as S.Schema<GetContainerAPIMetadataRequest>;
export type ContainerServiceMetadataEntry = {
  [key: string]: string | undefined;
};
export const ContainerServiceMetadataEntry = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ContainerServiceMetadataEntryList = {
  [key: string]: string | undefined;
}[];
export const ContainerServiceMetadataEntryList = /*@__PURE__*/ S.Array(
  ContainerServiceMetadataEntry,
);
export interface GetContainerAPIMetadataResult {
  metadata?: { [key: string]: string | undefined }[];
}
export const GetContainerAPIMetadataResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ metadata: S.optional(ContainerServiceMetadataEntryList) }),
).annotate({
  identifier: "GetContainerAPIMetadataResult",
}) as any as S.Schema<GetContainerAPIMetadataResult>;
export interface GetContainerImagesRequest {
  serviceName: string;
}
export const GetContainerImagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceName: S.String.pipe(T.HttpLabel("serviceName")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/ls/api/2016-11-28/container-services/{serviceName}/images",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetContainerImagesRequest",
}) as any as S.Schema<GetContainerImagesRequest>;
export interface ContainerImage {
  image?: string;
  digest?: string;
  createdAt?: Date;
}
export const ContainerImage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    image: S.optional(S.String),
    digest: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "ContainerImage" }) as any as S.Schema<ContainerImage>;
export type ContainerImageList = ContainerImage[];
export const ContainerImageList = /*@__PURE__*/ S.Array(ContainerImage);
export interface GetContainerImagesResult {
  containerImages?: ContainerImage[];
}
export const GetContainerImagesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ containerImages: S.optional(ContainerImageList) }),
).annotate({
  identifier: "GetContainerImagesResult",
}) as any as S.Schema<GetContainerImagesResult>;
export interface GetContainerLogRequest {
  serviceName: string;
  containerName: string;
  startTime?: Date;
  endTime?: Date;
  filterPattern?: string;
  pageToken?: string;
}
export const GetContainerLogRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceName: S.String.pipe(T.HttpLabel("serviceName")),
    containerName: S.String.pipe(T.HttpLabel("containerName")),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
      T.HttpQuery("startTime"),
    ),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
      T.HttpQuery("endTime"),
    ),
    filterPattern: S.optional(S.String).pipe(T.HttpQuery("filterPattern")),
    pageToken: S.optional(S.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/ls/api/2016-11-28/container-services/{serviceName}/containers/{containerName}/log",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetContainerLogRequest",
}) as any as S.Schema<GetContainerLogRequest>;
export interface ContainerServiceLogEvent {
  createdAt?: Date;
  message?: string;
}
export const ContainerServiceLogEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "ContainerServiceLogEvent",
}) as any as S.Schema<ContainerServiceLogEvent>;
export type ContainerServiceLogEventList = ContainerServiceLogEvent[];
export const ContainerServiceLogEventList = /*@__PURE__*/ S.Array(
  ContainerServiceLogEvent,
);
export interface GetContainerLogResult {
  logEvents?: ContainerServiceLogEvent[];
  nextPageToken?: string;
}
export const GetContainerLogResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    logEvents: S.optional(ContainerServiceLogEventList),
    nextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetContainerLogResult",
}) as any as S.Schema<GetContainerLogResult>;
export interface GetContainerServiceDeploymentsRequest {
  serviceName: string;
}
export const GetContainerServiceDeploymentsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ serviceName: S.String.pipe(T.HttpLabel("serviceName")) }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/ls/api/2016-11-28/container-services/{serviceName}/deployments",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetContainerServiceDeploymentsRequest",
}) as any as S.Schema<GetContainerServiceDeploymentsRequest>;
export type ContainerServiceDeploymentList = ContainerServiceDeployment[];
export const ContainerServiceDeploymentList = /*@__PURE__*/ S.Array(
  ContainerServiceDeployment,
);
export interface GetContainerServiceDeploymentsResult {
  deployments?: ContainerServiceDeployment[];
}
export const GetContainerServiceDeploymentsResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ deployments: S.optional(ContainerServiceDeploymentList) }),
).annotate({
  identifier: "GetContainerServiceDeploymentsResult",
}) as any as S.Schema<GetContainerServiceDeploymentsResult>;
export type ContainerServiceMetricName =
  | "CPUUtilization"
  | "MemoryUtilization"
  | (string & {});
export const ContainerServiceMetricName = /*@__PURE__*/ S.String;

export interface GetContainerServiceMetricDataRequest {
  serviceName: string;
  metricName: ContainerServiceMetricName;
  startTime: Date;
  endTime: Date;
  period: number;
  statistics: MetricStatistic[];
}
export const GetContainerServiceMetricDataRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      serviceName: S.String.pipe(T.HttpLabel("serviceName")),
      metricName: ContainerServiceMetricName.pipe(T.HttpQuery("metricName")),
      startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
        T.HttpQuery("startTime"),
      ),
      endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
        T.HttpQuery("endTime"),
      ),
      period: S.Number.pipe(T.HttpQuery("period")),
      statistics: MetricStatisticList.pipe(T.HttpQuery("statistics")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/ls/api/2016-11-28/container-services/{serviceName}/metrics",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetContainerServiceMetricDataRequest",
}) as any as S.Schema<GetContainerServiceMetricDataRequest>;
export interface GetContainerServiceMetricDataResult {
  metricName?: ContainerServiceMetricName;
  metricData?: MetricDatapoint[];
}
export const GetContainerServiceMetricDataResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricName: S.optional(ContainerServiceMetricName),
    metricData: S.optional(MetricDatapointList),
  }),
).annotate({
  identifier: "GetContainerServiceMetricDataResult",
}) as any as S.Schema<GetContainerServiceMetricDataResult>;
export interface GetContainerServicePowersRequest {}
export const GetContainerServicePowersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/ls/api/2016-11-28/container-service-powers",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetContainerServicePowersRequest",
}) as any as S.Schema<GetContainerServicePowersRequest>;
export interface ContainerServicePower {
  powerId?: string;
  price?: number;
  cpuCount?: number;
  ramSizeInGb?: number;
  name?: string;
  isActive?: boolean;
}
export const ContainerServicePower = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    powerId: S.optional(S.String),
    price: S.optional(S.Number),
    cpuCount: S.optional(S.Number),
    ramSizeInGb: S.optional(S.Number),
    name: S.optional(S.String),
    isActive: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ContainerServicePower",
}) as any as S.Schema<ContainerServicePower>;
export type ContainerServicePowerList = ContainerServicePower[];
export const ContainerServicePowerList = /*@__PURE__*/ S.Array(
  ContainerServicePower,
);
export interface GetContainerServicePowersResult {
  powers?: ContainerServicePower[];
}
export const GetContainerServicePowersResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ powers: S.optional(ContainerServicePowerList) }),
).annotate({
  identifier: "GetContainerServicePowersResult",
}) as any as S.Schema<GetContainerServicePowersResult>;
export interface GetContainerServicesRequest {
  serviceName?: string;
}
export const GetContainerServicesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceName: S.optional(S.String).pipe(T.HttpQuery("serviceName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/ls/api/2016-11-28/container-services" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetContainerServicesRequest",
}) as any as S.Schema<GetContainerServicesRequest>;
export type ContainerServiceList = ContainerService[];
export const ContainerServiceList = /*@__PURE__*/ S.Array(ContainerService);
export interface ContainerServicesListResult {
  containerServices?: ContainerService[];
}
export const ContainerServicesListResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ containerServices: S.optional(ContainerServiceList) }),
).annotate({
  identifier: "ContainerServicesListResult",
}) as any as S.Schema<ContainerServicesListResult>;
export interface GetCostEstimateRequest {
  resourceName: string;
  startTime: Date;
  endTime: Date;
}
export const GetCostEstimateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceName: S.String,
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/budgettracker/getCostEstimate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCostEstimateRequest",
}) as any as S.Schema<GetCostEstimateRequest>;
export type PricingUnit =
  | "GB"
  | "Hrs"
  | "GB-Mo"
  | "Bundles"
  | "Queries"
  | (string & {});
export const PricingUnit = /*@__PURE__*/ S.String;

export type Currency = "USD" | (string & {});
export const Currency = /*@__PURE__*/ S.String;

export interface TimePeriod {
  start?: Date;
  end?: Date;
}
export const TimePeriod = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    start: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    end: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "TimePeriod" }) as any as S.Schema<TimePeriod>;
export interface EstimateByTime {
  usageCost?: number;
  pricingUnit?: PricingUnit;
  unit?: number;
  currency?: Currency;
  timePeriod?: TimePeriod;
}
export const EstimateByTime = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    usageCost: S.optional(S.Number),
    pricingUnit: S.optional(PricingUnit),
    unit: S.optional(S.Number),
    currency: S.optional(Currency),
    timePeriod: S.optional(TimePeriod),
  }),
).annotate({ identifier: "EstimateByTime" }) as any as S.Schema<EstimateByTime>;
export type EstimatesByTime = EstimateByTime[];
export const EstimatesByTime = /*@__PURE__*/ S.Array(EstimateByTime);
export interface CostEstimate {
  usageType?: string;
  resultsByTime?: EstimateByTime[];
}
export const CostEstimate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    usageType: S.optional(S.String),
    resultsByTime: S.optional(EstimatesByTime),
  }),
).annotate({ identifier: "CostEstimate" }) as any as S.Schema<CostEstimate>;
export type CostEstimates = CostEstimate[];
export const CostEstimates = /*@__PURE__*/ S.Array(CostEstimate);
export interface ResourceBudgetEstimate {
  resourceName?: string;
  resourceType?: ResourceType;
  costEstimates?: CostEstimate[];
  startTime?: Date;
  endTime?: Date;
}
export const ResourceBudgetEstimate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceName: S.optional(S.String),
    resourceType: S.optional(ResourceType),
    costEstimates: S.optional(CostEstimates),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ResourceBudgetEstimate",
}) as any as S.Schema<ResourceBudgetEstimate>;
export type ResourcesBudgetEstimate = ResourceBudgetEstimate[];
export const ResourcesBudgetEstimate = /*@__PURE__*/ S.Array(
  ResourceBudgetEstimate,
);
export interface GetCostEstimateResult {
  resourcesBudgetEstimate?: ResourceBudgetEstimate[];
}
export const GetCostEstimateResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourcesBudgetEstimate: S.optional(ResourcesBudgetEstimate) }),
).annotate({
  identifier: "GetCostEstimateResult",
}) as any as S.Schema<GetCostEstimateResult>;
export interface GetDiskRequest {
  diskName: string;
}
export const GetDiskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ diskName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetDisk" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetDiskRequest" }) as any as S.Schema<GetDiskRequest>;
export interface AddOn {
  name?: string;
  status?: string;
  snapshotTimeOfDay?: string;
  nextSnapshotTimeOfDay?: string;
  threshold?: string;
  duration?: string;
}
export const AddOn = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    status: S.optional(S.String),
    snapshotTimeOfDay: S.optional(S.String),
    nextSnapshotTimeOfDay: S.optional(S.String),
    threshold: S.optional(S.String),
    duration: S.optional(S.String),
  }),
).annotate({ identifier: "AddOn" }) as any as S.Schema<AddOn>;
export type AddOnList = AddOn[];
export const AddOnList = /*@__PURE__*/ S.Array(AddOn);
export type DiskState =
  | "pending"
  | "error"
  | "available"
  | "in-use"
  | "unknown"
  | (string & {});
export const DiskState = /*@__PURE__*/ S.String;

export type AutoMountStatus =
  | "Failed"
  | "Pending"
  | "Mounted"
  | "NotMounted"
  | (string & {});
export const AutoMountStatus = /*@__PURE__*/ S.String;

export interface Disk {
  name?: string;
  arn?: string;
  supportCode?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  tags?: Tag[];
  addOns?: AddOn[];
  sizeInGb?: number;
  isSystemDisk?: boolean;
  iops?: number;
  path?: string;
  state?: DiskState;
  attachedTo?: string;
  isAttached?: boolean;
  attachmentState?: string;
  gbInUse?: number;
  autoMountStatus?: AutoMountStatus;
}
export const Disk = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    supportCode: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    location: S.optional(ResourceLocation),
    resourceType: S.optional(ResourceType),
    tags: S.optional(TagList),
    addOns: S.optional(AddOnList),
    sizeInGb: S.optional(S.Number),
    isSystemDisk: S.optional(S.Boolean),
    iops: S.optional(S.Number),
    path: S.optional(S.String),
    state: S.optional(DiskState),
    attachedTo: S.optional(S.String),
    isAttached: S.optional(S.Boolean),
    attachmentState: S.optional(S.String),
    gbInUse: S.optional(S.Number),
    autoMountStatus: S.optional(AutoMountStatus),
  }),
).annotate({ identifier: "Disk" }) as any as S.Schema<Disk>;
export interface GetDiskResult {
  disk?: Disk;
}
export const GetDiskResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ disk: S.optional(Disk) }),
).annotate({ identifier: "GetDiskResult" }) as any as S.Schema<GetDiskResult>;
export interface GetDisksRequest {
  pageToken?: string;
}
export const GetDisksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pageToken: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetDisks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDisksRequest",
}) as any as S.Schema<GetDisksRequest>;
export type DiskList = Disk[];
export const DiskList = /*@__PURE__*/ S.Array(Disk);
export interface GetDisksResult {
  disks?: Disk[];
  nextPageToken?: string;
}
export const GetDisksResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    disks: S.optional(DiskList),
    nextPageToken: S.optional(S.String),
  }),
).annotate({ identifier: "GetDisksResult" }) as any as S.Schema<GetDisksResult>;
export interface GetDiskSnapshotRequest {
  diskSnapshotName: string;
}
export const GetDiskSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ diskSnapshotName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetDiskSnapshot" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDiskSnapshotRequest",
}) as any as S.Schema<GetDiskSnapshotRequest>;
export type DiskSnapshotState =
  | "pending"
  | "completed"
  | "error"
  | "unknown"
  | (string & {});
export const DiskSnapshotState = /*@__PURE__*/ S.String;

export interface DiskSnapshot {
  name?: string;
  arn?: string;
  supportCode?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  tags?: Tag[];
  sizeInGb?: number;
  state?: DiskSnapshotState;
  progress?: string;
  fromDiskName?: string;
  fromDiskArn?: string;
  fromInstanceName?: string;
  fromInstanceArn?: string;
  isFromAutoSnapshot?: boolean;
}
export const DiskSnapshot = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    supportCode: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    location: S.optional(ResourceLocation),
    resourceType: S.optional(ResourceType),
    tags: S.optional(TagList),
    sizeInGb: S.optional(S.Number),
    state: S.optional(DiskSnapshotState),
    progress: S.optional(S.String),
    fromDiskName: S.optional(S.String),
    fromDiskArn: S.optional(S.String),
    fromInstanceName: S.optional(S.String),
    fromInstanceArn: S.optional(S.String),
    isFromAutoSnapshot: S.optional(S.Boolean),
  }),
).annotate({ identifier: "DiskSnapshot" }) as any as S.Schema<DiskSnapshot>;
export interface GetDiskSnapshotResult {
  diskSnapshot?: DiskSnapshot;
}
export const GetDiskSnapshotResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ diskSnapshot: S.optional(DiskSnapshot) }),
).annotate({
  identifier: "GetDiskSnapshotResult",
}) as any as S.Schema<GetDiskSnapshotResult>;
export interface GetDiskSnapshotsRequest {
  pageToken?: string;
}
export const GetDiskSnapshotsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pageToken: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetDiskSnapshots" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDiskSnapshotsRequest",
}) as any as S.Schema<GetDiskSnapshotsRequest>;
export type DiskSnapshotList = DiskSnapshot[];
export const DiskSnapshotList = /*@__PURE__*/ S.Array(DiskSnapshot);
export interface GetDiskSnapshotsResult {
  diskSnapshots?: DiskSnapshot[];
  nextPageToken?: string;
}
export const GetDiskSnapshotsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    diskSnapshots: S.optional(DiskSnapshotList),
    nextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetDiskSnapshotsResult",
}) as any as S.Schema<GetDiskSnapshotsResult>;
export interface GetDistributionBundlesRequest {}
export const GetDistributionBundlesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/GetDistributionBundles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDistributionBundlesRequest",
}) as any as S.Schema<GetDistributionBundlesRequest>;
export interface DistributionBundle {
  bundleId?: string;
  name?: string;
  price?: number;
  transferPerMonthInGb?: number;
  isActive?: boolean;
}
export const DistributionBundle = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bundleId: S.optional(S.String),
    name: S.optional(S.String),
    price: S.optional(S.Number),
    transferPerMonthInGb: S.optional(S.Number),
    isActive: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DistributionBundle",
}) as any as S.Schema<DistributionBundle>;
export type DistributionBundleList = DistributionBundle[];
export const DistributionBundleList = /*@__PURE__*/ S.Array(DistributionBundle);
export interface GetDistributionBundlesResult {
  bundles?: DistributionBundle[];
}
export const GetDistributionBundlesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bundles: S.optional(DistributionBundleList) }),
).annotate({
  identifier: "GetDistributionBundlesResult",
}) as any as S.Schema<GetDistributionBundlesResult>;
export interface GetDistributionLatestCacheResetRequest {
  distributionName?: string;
}
export const GetDistributionLatestCacheResetRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ distributionName: S.optional(S.String) }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/GetDistributionLatestCacheReset",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetDistributionLatestCacheResetRequest",
}) as any as S.Schema<GetDistributionLatestCacheResetRequest>;
export interface GetDistributionLatestCacheResetResult {
  status?: string;
  createTime?: Date;
}
export const GetDistributionLatestCacheResetResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      status: S.optional(S.String),
      createTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    }),
).annotate({
  identifier: "GetDistributionLatestCacheResetResult",
}) as any as S.Schema<GetDistributionLatestCacheResetResult>;
export type DistributionMetricName =
  | "Requests"
  | "BytesDownloaded"
  | "BytesUploaded"
  | "TotalErrorRate"
  | "Http4xxErrorRate"
  | "Http5xxErrorRate"
  | (string & {});
export const DistributionMetricName = /*@__PURE__*/ S.String;

export interface GetDistributionMetricDataRequest {
  distributionName: string;
  metricName: DistributionMetricName;
  startTime: Date;
  endTime: Date;
  period: number;
  unit: MetricUnit;
  statistics: MetricStatistic[];
}
export const GetDistributionMetricDataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    distributionName: S.String,
    metricName: DistributionMetricName,
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    period: S.Number,
    unit: MetricUnit,
    statistics: MetricStatisticList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/GetDistributionMetricData",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDistributionMetricDataRequest",
}) as any as S.Schema<GetDistributionMetricDataRequest>;
export interface GetDistributionMetricDataResult {
  metricName?: DistributionMetricName;
  metricData?: MetricDatapoint[];
}
export const GetDistributionMetricDataResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricName: S.optional(DistributionMetricName),
    metricData: S.optional(MetricDatapointList),
  }),
).annotate({
  identifier: "GetDistributionMetricDataResult",
}) as any as S.Schema<GetDistributionMetricDataResult>;
export interface GetDistributionsRequest {
  distributionName?: string;
  pageToken?: string;
}
export const GetDistributionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    distributionName: S.optional(S.String),
    pageToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetDistributions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDistributionsRequest",
}) as any as S.Schema<GetDistributionsRequest>;
export type DistributionList = LightsailDistribution[];
export const DistributionList = /*@__PURE__*/ S.Array(LightsailDistribution);
export interface GetDistributionsResult {
  distributions?: LightsailDistribution[];
  nextPageToken?: string;
}
export const GetDistributionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    distributions: S.optional(DistributionList),
    nextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetDistributionsResult",
}) as any as S.Schema<GetDistributionsResult>;
export interface GetDomainRequest {
  domainName: string;
}
export const GetDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetDomain" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDomainRequest",
}) as any as S.Schema<GetDomainRequest>;
export type DomainEntryList = DomainEntry[];
export const DomainEntryList = /*@__PURE__*/ S.Array(DomainEntry);
export type NameServersUpdateStateCode =
  | "SUCCEEDED"
  | "PENDING"
  | "FAILED"
  | "STARTED"
  | (string & {});
export const NameServersUpdateStateCode = /*@__PURE__*/ S.String;

export interface NameServersUpdateState {
  code?: NameServersUpdateStateCode;
  message?: string;
}
export const NameServersUpdateState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    code: S.optional(NameServersUpdateStateCode),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "NameServersUpdateState",
}) as any as S.Schema<NameServersUpdateState>;
export type R53HostedZoneDeletionStateCode =
  | "SUCCEEDED"
  | "PENDING"
  | "FAILED"
  | "STARTED"
  | (string & {});
export const R53HostedZoneDeletionStateCode = /*@__PURE__*/ S.String;

export interface R53HostedZoneDeletionState {
  code?: R53HostedZoneDeletionStateCode;
  message?: string;
}
export const R53HostedZoneDeletionState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    code: S.optional(R53HostedZoneDeletionStateCode),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "R53HostedZoneDeletionState",
}) as any as S.Schema<R53HostedZoneDeletionState>;
export interface RegisteredDomainDelegationInfo {
  nameServersUpdateState?: NameServersUpdateState;
  r53HostedZoneDeletionState?: R53HostedZoneDeletionState;
}
export const RegisteredDomainDelegationInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nameServersUpdateState: S.optional(NameServersUpdateState),
    r53HostedZoneDeletionState: S.optional(R53HostedZoneDeletionState),
  }),
).annotate({
  identifier: "RegisteredDomainDelegationInfo",
}) as any as S.Schema<RegisteredDomainDelegationInfo>;
export interface Domain {
  name?: string;
  arn?: string;
  supportCode?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  tags?: Tag[];
  domainEntries?: DomainEntry[];
  registeredDomainDelegationInfo?: RegisteredDomainDelegationInfo;
}
export const Domain = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    supportCode: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    location: S.optional(ResourceLocation),
    resourceType: S.optional(ResourceType),
    tags: S.optional(TagList),
    domainEntries: S.optional(DomainEntryList),
    registeredDomainDelegationInfo: S.optional(RegisteredDomainDelegationInfo),
  }),
).annotate({ identifier: "Domain" }) as any as S.Schema<Domain>;
export interface GetDomainResult {
  domain?: Domain;
}
export const GetDomainResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domain: S.optional(Domain) }),
).annotate({
  identifier: "GetDomainResult",
}) as any as S.Schema<GetDomainResult>;
export interface GetDomainsRequest {
  pageToken?: string;
}
export const GetDomainsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pageToken: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetDomains" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDomainsRequest",
}) as any as S.Schema<GetDomainsRequest>;
export type DomainList = Domain[];
export const DomainList = /*@__PURE__*/ S.Array(Domain);
export interface GetDomainsResult {
  domains?: Domain[];
  nextPageToken?: string;
}
export const GetDomainsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domains: S.optional(DomainList),
    nextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetDomainsResult",
}) as any as S.Schema<GetDomainsResult>;
export interface GetExportSnapshotRecordsRequest {
  pageToken?: string;
}
export const GetExportSnapshotRecordsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pageToken: S.optional(S.String) }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/GetExportSnapshotRecords",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetExportSnapshotRecordsRequest",
}) as any as S.Schema<GetExportSnapshotRecordsRequest>;
export type ExportSnapshotRecordSourceType =
  | "InstanceSnapshot"
  | "DiskSnapshot"
  | (string & {});
export const ExportSnapshotRecordSourceType = /*@__PURE__*/ S.String;

export interface DiskInfo {
  name?: string;
  path?: string;
  sizeInGb?: number;
  isSystemDisk?: boolean;
}
export const DiskInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    path: S.optional(S.String),
    sizeInGb: S.optional(S.Number),
    isSystemDisk: S.optional(S.Boolean),
  }),
).annotate({ identifier: "DiskInfo" }) as any as S.Schema<DiskInfo>;
export type DiskInfoList = DiskInfo[];
export const DiskInfoList = /*@__PURE__*/ S.Array(DiskInfo);
export interface InstanceSnapshotInfo {
  fromBundleId?: string;
  fromBlueprintId?: string;
  fromDiskInfo?: DiskInfo[];
}
export const InstanceSnapshotInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fromBundleId: S.optional(S.String),
    fromBlueprintId: S.optional(S.String),
    fromDiskInfo: S.optional(DiskInfoList),
  }),
).annotate({
  identifier: "InstanceSnapshotInfo",
}) as any as S.Schema<InstanceSnapshotInfo>;
export interface DiskSnapshotInfo {
  sizeInGb?: number;
}
export const DiskSnapshotInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sizeInGb: S.optional(S.Number) }),
).annotate({
  identifier: "DiskSnapshotInfo",
}) as any as S.Schema<DiskSnapshotInfo>;
export interface ExportSnapshotRecordSourceInfo {
  resourceType?: ExportSnapshotRecordSourceType;
  createdAt?: Date;
  name?: string;
  arn?: string;
  fromResourceName?: string;
  fromResourceArn?: string;
  instanceSnapshotInfo?: InstanceSnapshotInfo;
  diskSnapshotInfo?: DiskSnapshotInfo;
}
export const ExportSnapshotRecordSourceInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceType: S.optional(ExportSnapshotRecordSourceType),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    name: S.optional(S.String),
    arn: S.optional(S.String),
    fromResourceName: S.optional(S.String),
    fromResourceArn: S.optional(S.String),
    instanceSnapshotInfo: S.optional(InstanceSnapshotInfo),
    diskSnapshotInfo: S.optional(DiskSnapshotInfo),
  }),
).annotate({
  identifier: "ExportSnapshotRecordSourceInfo",
}) as any as S.Schema<ExportSnapshotRecordSourceInfo>;
export interface ExportSnapshotRecord {
  name?: string;
  arn?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  state?: RecordState;
  sourceInfo?: ExportSnapshotRecordSourceInfo;
  destinationInfo?: DestinationInfo;
}
export const ExportSnapshotRecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    location: S.optional(ResourceLocation),
    resourceType: S.optional(ResourceType),
    state: S.optional(RecordState),
    sourceInfo: S.optional(ExportSnapshotRecordSourceInfo),
    destinationInfo: S.optional(DestinationInfo),
  }),
).annotate({
  identifier: "ExportSnapshotRecord",
}) as any as S.Schema<ExportSnapshotRecord>;
export type ExportSnapshotRecordList = ExportSnapshotRecord[];
export const ExportSnapshotRecordList =
  /*@__PURE__*/ S.Array(ExportSnapshotRecord);
export interface GetExportSnapshotRecordsResult {
  exportSnapshotRecords?: ExportSnapshotRecord[];
  nextPageToken?: string;
}
export const GetExportSnapshotRecordsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exportSnapshotRecords: S.optional(ExportSnapshotRecordList),
    nextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetExportSnapshotRecordsResult",
}) as any as S.Schema<GetExportSnapshotRecordsResult>;
export interface GetInstanceRequest {
  instanceName: string;
}
export const GetInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instanceName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetInstance" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetInstanceRequest",
}) as any as S.Schema<GetInstanceRequest>;
export type IpAddress = string;
export type Ipv6Address = string;
export type Ipv6AddressList = string[];
export const Ipv6AddressList = /*@__PURE__*/ S.Array(S.String);
export interface InstanceHardware {
  cpuCount?: number;
  disks?: Disk[];
  ramSizeInGb?: number;
}
export const InstanceHardware = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cpuCount: S.optional(S.Number),
    disks: S.optional(DiskList),
    ramSizeInGb: S.optional(S.Number),
  }),
).annotate({
  identifier: "InstanceHardware",
}) as any as S.Schema<InstanceHardware>;
export interface MonthlyTransfer {
  gbPerMonthAllocated?: number;
}
export const MonthlyTransfer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ gbPerMonthAllocated: S.optional(S.Number) }),
).annotate({
  identifier: "MonthlyTransfer",
}) as any as S.Schema<MonthlyTransfer>;
export type PortAccessType = "Public" | "Private" | (string & {});
export const PortAccessType = /*@__PURE__*/ S.String;

export type AccessDirection = "inbound" | "outbound" | (string & {});
export const AccessDirection = /*@__PURE__*/ S.String;

export interface InstancePortInfo {
  fromPort?: number;
  toPort?: number;
  protocol?: NetworkProtocol;
  accessFrom?: string;
  accessType?: PortAccessType;
  commonName?: string;
  accessDirection?: AccessDirection;
  cidrs?: string[];
  ipv6Cidrs?: string[];
  cidrListAliases?: string[];
}
export const InstancePortInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fromPort: S.optional(S.Number),
    toPort: S.optional(S.Number),
    protocol: S.optional(NetworkProtocol),
    accessFrom: S.optional(S.String),
    accessType: S.optional(PortAccessType),
    commonName: S.optional(S.String),
    accessDirection: S.optional(AccessDirection),
    cidrs: S.optional(StringList),
    ipv6Cidrs: S.optional(StringList),
    cidrListAliases: S.optional(StringList),
  }),
).annotate({
  identifier: "InstancePortInfo",
}) as any as S.Schema<InstancePortInfo>;
export type InstancePortInfoList = InstancePortInfo[];
export const InstancePortInfoList = /*@__PURE__*/ S.Array(InstancePortInfo);
export interface InstanceNetworking {
  monthlyTransfer?: MonthlyTransfer;
  ports?: InstancePortInfo[];
}
export const InstanceNetworking = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    monthlyTransfer: S.optional(MonthlyTransfer),
    ports: S.optional(InstancePortInfoList),
  }),
).annotate({
  identifier: "InstanceNetworking",
}) as any as S.Schema<InstanceNetworking>;
export interface InstanceState {
  code?: number;
  name?: string;
}
export const InstanceState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ code: S.optional(S.Number), name: S.optional(S.String) }),
).annotate({ identifier: "InstanceState" }) as any as S.Schema<InstanceState>;
export type InstanceMetadataState = "pending" | "applied" | (string & {});
export const InstanceMetadataState = /*@__PURE__*/ S.String;

export type HttpTokens = "optional" | "required" | (string & {});
export const HttpTokens = /*@__PURE__*/ S.String;

export type HttpEndpoint = "disabled" | "enabled" | (string & {});
export const HttpEndpoint = /*@__PURE__*/ S.String;

export type HttpProtocolIpv6 = "disabled" | "enabled" | (string & {});
export const HttpProtocolIpv6 = /*@__PURE__*/ S.String;

export interface InstanceMetadataOptions {
  state?: InstanceMetadataState;
  httpTokens?: HttpTokens;
  httpEndpoint?: HttpEndpoint;
  httpPutResponseHopLimit?: number;
  httpProtocolIpv6?: HttpProtocolIpv6;
}
export const InstanceMetadataOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    state: S.optional(InstanceMetadataState),
    httpTokens: S.optional(HttpTokens),
    httpEndpoint: S.optional(HttpEndpoint),
    httpPutResponseHopLimit: S.optional(S.Number),
    httpProtocolIpv6: S.optional(HttpProtocolIpv6),
  }),
).annotate({
  identifier: "InstanceMetadataOptions",
}) as any as S.Schema<InstanceMetadataOptions>;
export interface Instance {
  name?: string;
  arn?: string;
  supportCode?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  tags?: Tag[];
  blueprintId?: string;
  blueprintName?: string;
  bundleId?: string;
  addOns?: AddOn[];
  isStaticIp?: boolean;
  privateIpAddress?: string;
  publicIpAddress?: string;
  ipv6Addresses?: string[];
  ipAddressType?: IpAddressType;
  hardware?: InstanceHardware;
  networking?: InstanceNetworking;
  state?: InstanceState;
  username?: string;
  sshKeyName?: string;
  metadataOptions?: InstanceMetadataOptions;
}
export const Instance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    supportCode: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    location: S.optional(ResourceLocation),
    resourceType: S.optional(ResourceType),
    tags: S.optional(TagList),
    blueprintId: S.optional(S.String),
    blueprintName: S.optional(S.String),
    bundleId: S.optional(S.String),
    addOns: S.optional(AddOnList),
    isStaticIp: S.optional(S.Boolean),
    privateIpAddress: S.optional(S.String),
    publicIpAddress: S.optional(S.String),
    ipv6Addresses: S.optional(Ipv6AddressList),
    ipAddressType: S.optional(IpAddressType),
    hardware: S.optional(InstanceHardware),
    networking: S.optional(InstanceNetworking),
    state: S.optional(InstanceState),
    username: S.optional(S.String),
    sshKeyName: S.optional(S.String),
    metadataOptions: S.optional(InstanceMetadataOptions),
  }),
).annotate({ identifier: "Instance" }) as any as S.Schema<Instance>;
export interface GetInstanceResult {
  instance?: Instance;
}
export const GetInstanceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instance: S.optional(Instance) }),
).annotate({
  identifier: "GetInstanceResult",
}) as any as S.Schema<GetInstanceResult>;
export type InstanceAccessProtocol = "ssh" | "rdp" | (string & {});
export const InstanceAccessProtocol = /*@__PURE__*/ S.String;

export interface GetInstanceAccessDetailsRequest {
  instanceName: string;
  protocol?: InstanceAccessProtocol;
}
export const GetInstanceAccessDetailsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceName: S.String,
    protocol: S.optional(InstanceAccessProtocol),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/GetInstanceAccessDetails",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetInstanceAccessDetailsRequest",
}) as any as S.Schema<GetInstanceAccessDetailsRequest>;
export interface PasswordData {
  ciphertext?: string;
  keyPairName?: string;
}
export const PasswordData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ciphertext: S.optional(S.String),
    keyPairName: S.optional(S.String),
  }),
).annotate({ identifier: "PasswordData" }) as any as S.Schema<PasswordData>;
export interface HostKeyAttributes {
  algorithm?: string;
  publicKey?: string;
  witnessedAt?: Date;
  fingerprintSHA1?: string;
  fingerprintSHA256?: string;
  notValidBefore?: Date;
  notValidAfter?: Date;
}
export const HostKeyAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    algorithm: S.optional(S.String),
    publicKey: S.optional(S.String),
    witnessedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    fingerprintSHA1: S.optional(S.String),
    fingerprintSHA256: S.optional(S.String),
    notValidBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    notValidAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "HostKeyAttributes",
}) as any as S.Schema<HostKeyAttributes>;
export type HostKeysList = HostKeyAttributes[];
export const HostKeysList = /*@__PURE__*/ S.Array(HostKeyAttributes);
export interface InstanceAccessDetails {
  certKey?: string;
  expiresAt?: Date;
  ipAddress?: string;
  ipv6Addresses?: string[];
  password?: string;
  passwordData?: PasswordData;
  privateKey?: string;
  protocol?: InstanceAccessProtocol;
  instanceName?: string;
  username?: string;
  hostKeys?: HostKeyAttributes[];
}
export const InstanceAccessDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certKey: S.optional(S.String),
    expiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ipAddress: S.optional(S.String),
    ipv6Addresses: S.optional(Ipv6AddressList),
    password: S.optional(S.String),
    passwordData: S.optional(PasswordData),
    privateKey: S.optional(S.String),
    protocol: S.optional(InstanceAccessProtocol),
    instanceName: S.optional(S.String),
    username: S.optional(S.String),
    hostKeys: S.optional(HostKeysList),
  }),
).annotate({
  identifier: "InstanceAccessDetails",
}) as any as S.Schema<InstanceAccessDetails>;
export interface GetInstanceAccessDetailsResult {
  accessDetails?: InstanceAccessDetails;
}
export const GetInstanceAccessDetailsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accessDetails: S.optional(InstanceAccessDetails) }),
).annotate({
  identifier: "GetInstanceAccessDetailsResult",
}) as any as S.Schema<GetInstanceAccessDetailsResult>;
export type InstanceMetricName =
  | "CPUUtilization"
  | "NetworkIn"
  | "NetworkOut"
  | "StatusCheckFailed"
  | "StatusCheckFailed_Instance"
  | "StatusCheckFailed_System"
  | "BurstCapacityTime"
  | "BurstCapacityPercentage"
  | "MetadataNoToken"
  | (string & {});
export const InstanceMetricName = /*@__PURE__*/ S.String;

export interface GetInstanceMetricDataRequest {
  instanceName: string;
  metricName: InstanceMetricName;
  period: number;
  startTime: Date;
  endTime: Date;
  unit: MetricUnit;
  statistics: MetricStatistic[];
}
export const GetInstanceMetricDataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceName: S.String,
    metricName: InstanceMetricName,
    period: S.Number,
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    unit: MetricUnit,
    statistics: MetricStatisticList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/GetInstanceMetricData",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetInstanceMetricDataRequest",
}) as any as S.Schema<GetInstanceMetricDataRequest>;
export interface GetInstanceMetricDataResult {
  metricName?: InstanceMetricName;
  metricData?: MetricDatapoint[];
}
export const GetInstanceMetricDataResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricName: S.optional(InstanceMetricName),
    metricData: S.optional(MetricDatapointList),
  }),
).annotate({
  identifier: "GetInstanceMetricDataResult",
}) as any as S.Schema<GetInstanceMetricDataResult>;
export interface GetInstancePortStatesRequest {
  instanceName: string;
}
export const GetInstancePortStatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instanceName: S.String }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/GetInstancePortStates",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetInstancePortStatesRequest",
}) as any as S.Schema<GetInstancePortStatesRequest>;
export type PortState = "open" | "closed" | (string & {});
export const PortState = /*@__PURE__*/ S.String;

export interface InstancePortState {
  fromPort?: number;
  toPort?: number;
  protocol?: NetworkProtocol;
  state?: PortState;
  cidrs?: string[];
  ipv6Cidrs?: string[];
  cidrListAliases?: string[];
}
export const InstancePortState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fromPort: S.optional(S.Number),
    toPort: S.optional(S.Number),
    protocol: S.optional(NetworkProtocol),
    state: S.optional(PortState),
    cidrs: S.optional(StringList),
    ipv6Cidrs: S.optional(StringList),
    cidrListAliases: S.optional(StringList),
  }),
).annotate({
  identifier: "InstancePortState",
}) as any as S.Schema<InstancePortState>;
export type InstancePortStateList = InstancePortState[];
export const InstancePortStateList = /*@__PURE__*/ S.Array(InstancePortState);
export interface GetInstancePortStatesResult {
  portStates?: InstancePortState[];
}
export const GetInstancePortStatesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ portStates: S.optional(InstancePortStateList) }),
).annotate({
  identifier: "GetInstancePortStatesResult",
}) as any as S.Schema<GetInstancePortStatesResult>;
export interface GetInstancesRequest {
  pageToken?: string;
}
export const GetInstancesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pageToken: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetInstances" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetInstancesRequest",
}) as any as S.Schema<GetInstancesRequest>;
export type InstanceList = Instance[];
export const InstanceList = /*@__PURE__*/ S.Array(Instance);
export interface GetInstancesResult {
  instances?: Instance[];
  nextPageToken?: string;
}
export const GetInstancesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instances: S.optional(InstanceList),
    nextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetInstancesResult",
}) as any as S.Schema<GetInstancesResult>;
export interface GetInstanceSnapshotRequest {
  instanceSnapshotName: string;
}
export const GetInstanceSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instanceSnapshotName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetInstanceSnapshot" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetInstanceSnapshotRequest",
}) as any as S.Schema<GetInstanceSnapshotRequest>;
export type InstanceSnapshotState =
  | "pending"
  | "error"
  | "available"
  | (string & {});
export const InstanceSnapshotState = /*@__PURE__*/ S.String;

export interface InstanceSnapshot {
  name?: string;
  arn?: string;
  supportCode?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  tags?: Tag[];
  state?: InstanceSnapshotState;
  progress?: string;
  fromAttachedDisks?: Disk[];
  fromInstanceName?: string;
  fromInstanceArn?: string;
  fromBlueprintId?: string;
  fromBundleId?: string;
  isFromAutoSnapshot?: boolean;
  sizeInGb?: number;
}
export const InstanceSnapshot = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    supportCode: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    location: S.optional(ResourceLocation),
    resourceType: S.optional(ResourceType),
    tags: S.optional(TagList),
    state: S.optional(InstanceSnapshotState),
    progress: S.optional(S.String),
    fromAttachedDisks: S.optional(DiskList),
    fromInstanceName: S.optional(S.String),
    fromInstanceArn: S.optional(S.String),
    fromBlueprintId: S.optional(S.String),
    fromBundleId: S.optional(S.String),
    isFromAutoSnapshot: S.optional(S.Boolean),
    sizeInGb: S.optional(S.Number),
  }),
).annotate({
  identifier: "InstanceSnapshot",
}) as any as S.Schema<InstanceSnapshot>;
export interface GetInstanceSnapshotResult {
  instanceSnapshot?: InstanceSnapshot;
}
export const GetInstanceSnapshotResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instanceSnapshot: S.optional(InstanceSnapshot) }),
).annotate({
  identifier: "GetInstanceSnapshotResult",
}) as any as S.Schema<GetInstanceSnapshotResult>;
export interface GetInstanceSnapshotsRequest {
  pageToken?: string;
}
export const GetInstanceSnapshotsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pageToken: S.optional(S.String) }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/GetInstanceSnapshots",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetInstanceSnapshotsRequest",
}) as any as S.Schema<GetInstanceSnapshotsRequest>;
export type InstanceSnapshotList = InstanceSnapshot[];
export const InstanceSnapshotList = /*@__PURE__*/ S.Array(InstanceSnapshot);
export interface GetInstanceSnapshotsResult {
  instanceSnapshots?: InstanceSnapshot[];
  nextPageToken?: string;
}
export const GetInstanceSnapshotsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceSnapshots: S.optional(InstanceSnapshotList),
    nextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetInstanceSnapshotsResult",
}) as any as S.Schema<GetInstanceSnapshotsResult>;
export interface GetInstanceStateRequest {
  instanceName: string;
}
export const GetInstanceStateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instanceName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetInstanceState" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetInstanceStateRequest",
}) as any as S.Schema<GetInstanceStateRequest>;
export interface GetInstanceStateResult {
  state?: InstanceState;
}
export const GetInstanceStateResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ state: S.optional(InstanceState) }),
).annotate({
  identifier: "GetInstanceStateResult",
}) as any as S.Schema<GetInstanceStateResult>;
export interface GetKeyPairRequest {
  keyPairName: string;
}
export const GetKeyPairRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ keyPairName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetKeyPair" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetKeyPairRequest",
}) as any as S.Schema<GetKeyPairRequest>;
export interface GetKeyPairResult {
  keyPair?: KeyPair;
}
export const GetKeyPairResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ keyPair: S.optional(KeyPair) }),
).annotate({
  identifier: "GetKeyPairResult",
}) as any as S.Schema<GetKeyPairResult>;
export interface GetKeyPairsRequest {
  pageToken?: string;
  includeDefaultKeyPair?: boolean;
}
export const GetKeyPairsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pageToken: S.optional(S.String),
    includeDefaultKeyPair: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetKeyPairs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetKeyPairsRequest",
}) as any as S.Schema<GetKeyPairsRequest>;
export type KeyPairList = KeyPair[];
export const KeyPairList = /*@__PURE__*/ S.Array(KeyPair);
export interface GetKeyPairsResult {
  keyPairs?: KeyPair[];
  nextPageToken?: string;
}
export const GetKeyPairsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    keyPairs: S.optional(KeyPairList),
    nextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetKeyPairsResult",
}) as any as S.Schema<GetKeyPairsResult>;
export interface GetLoadBalancerRequest {
  loadBalancerName: string;
}
export const GetLoadBalancerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ loadBalancerName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetLoadBalancer" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLoadBalancerRequest",
}) as any as S.Schema<GetLoadBalancerRequest>;
export type LoadBalancerState =
  | "active"
  | "provisioning"
  | "active_impaired"
  | "failed"
  | "unknown"
  | (string & {});
export const LoadBalancerState = /*@__PURE__*/ S.String;

export type LoadBalancerProtocol = "HTTP_HTTPS" | "HTTP" | (string & {});
export const LoadBalancerProtocol = /*@__PURE__*/ S.String;

export type PortList = number[];
export const PortList = /*@__PURE__*/ S.Array(S.Number);
export type InstanceHealthState =
  | "initial"
  | "healthy"
  | "unhealthy"
  | "unused"
  | "draining"
  | "unavailable"
  | (string & {});
export const InstanceHealthState = /*@__PURE__*/ S.String;

export type InstanceHealthReason =
  | "Lb.RegistrationInProgress"
  | "Lb.InitialHealthChecking"
  | "Lb.InternalError"
  | "Instance.ResponseCodeMismatch"
  | "Instance.Timeout"
  | "Instance.FailedHealthChecks"
  | "Instance.NotRegistered"
  | "Instance.NotInUse"
  | "Instance.DeregistrationInProgress"
  | "Instance.InvalidState"
  | "Instance.IpUnusable"
  | (string & {});
export const InstanceHealthReason = /*@__PURE__*/ S.String;

export interface InstanceHealthSummary {
  instanceName?: string;
  instanceHealth?: InstanceHealthState;
  instanceHealthReason?: InstanceHealthReason;
}
export const InstanceHealthSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceName: S.optional(S.String),
    instanceHealth: S.optional(InstanceHealthState),
    instanceHealthReason: S.optional(InstanceHealthReason),
  }),
).annotate({
  identifier: "InstanceHealthSummary",
}) as any as S.Schema<InstanceHealthSummary>;
export type InstanceHealthSummaryList = InstanceHealthSummary[];
export const InstanceHealthSummaryList = /*@__PURE__*/ S.Array(
  InstanceHealthSummary,
);
export interface LoadBalancerTlsCertificateSummary {
  name?: string;
  isAttached?: boolean;
}
export const LoadBalancerTlsCertificateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), isAttached: S.optional(S.Boolean) }),
).annotate({
  identifier: "LoadBalancerTlsCertificateSummary",
}) as any as S.Schema<LoadBalancerTlsCertificateSummary>;
export type LoadBalancerTlsCertificateSummaryList =
  LoadBalancerTlsCertificateSummary[];
export const LoadBalancerTlsCertificateSummaryList = /*@__PURE__*/ S.Array(
  LoadBalancerTlsCertificateSummary,
);
export type LoadBalancerAttributeName =
  | "HealthCheckPath"
  | "SessionStickinessEnabled"
  | "SessionStickiness_LB_CookieDurationSeconds"
  | "HttpsRedirectionEnabled"
  | "TlsPolicyName"
  | (string & {});
export const LoadBalancerAttributeName = /*@__PURE__*/ S.String;

export type LoadBalancerConfigurationOptions = {
  [key in LoadBalancerAttributeName]?: string;
};
export const LoadBalancerConfigurationOptions = /*@__PURE__*/ S.Record(
  LoadBalancerAttributeName,
  S.String.pipe(S.optional),
);
export interface LoadBalancer {
  name?: string;
  arn?: string;
  supportCode?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  tags?: Tag[];
  dnsName?: string;
  state?: LoadBalancerState;
  protocol?: LoadBalancerProtocol;
  publicPorts?: number[];
  healthCheckPath?: string;
  instancePort?: number;
  instanceHealthSummary?: InstanceHealthSummary[];
  tlsCertificateSummaries?: LoadBalancerTlsCertificateSummary[];
  configurationOptions?: { [key: string]: string | undefined };
  ipAddressType?: IpAddressType;
  httpsRedirectionEnabled?: boolean;
  tlsPolicyName?: string;
}
export const LoadBalancer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    supportCode: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    location: S.optional(ResourceLocation),
    resourceType: S.optional(ResourceType),
    tags: S.optional(TagList),
    dnsName: S.optional(S.String),
    state: S.optional(LoadBalancerState),
    protocol: S.optional(LoadBalancerProtocol),
    publicPorts: S.optional(PortList),
    healthCheckPath: S.optional(S.String),
    instancePort: S.optional(S.Number),
    instanceHealthSummary: S.optional(InstanceHealthSummaryList),
    tlsCertificateSummaries: S.optional(LoadBalancerTlsCertificateSummaryList),
    configurationOptions: S.optional(LoadBalancerConfigurationOptions),
    ipAddressType: S.optional(IpAddressType),
    httpsRedirectionEnabled: S.optional(S.Boolean),
    tlsPolicyName: S.optional(S.String),
  }),
).annotate({ identifier: "LoadBalancer" }) as any as S.Schema<LoadBalancer>;
export interface GetLoadBalancerResult {
  loadBalancer?: LoadBalancer;
}
export const GetLoadBalancerResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ loadBalancer: S.optional(LoadBalancer) }),
).annotate({
  identifier: "GetLoadBalancerResult",
}) as any as S.Schema<GetLoadBalancerResult>;
export type LoadBalancerMetricName =
  | "ClientTLSNegotiationErrorCount"
  | "HealthyHostCount"
  | "UnhealthyHostCount"
  | "HTTPCode_LB_4XX_Count"
  | "HTTPCode_LB_5XX_Count"
  | "HTTPCode_Instance_2XX_Count"
  | "HTTPCode_Instance_3XX_Count"
  | "HTTPCode_Instance_4XX_Count"
  | "HTTPCode_Instance_5XX_Count"
  | "InstanceResponseTime"
  | "RejectedConnectionCount"
  | "RequestCount"
  | (string & {});
export const LoadBalancerMetricName = /*@__PURE__*/ S.String;

export interface GetLoadBalancerMetricDataRequest {
  loadBalancerName: string;
  metricName: LoadBalancerMetricName;
  period: number;
  startTime: Date;
  endTime: Date;
  unit: MetricUnit;
  statistics: MetricStatistic[];
}
export const GetLoadBalancerMetricDataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    loadBalancerName: S.String,
    metricName: LoadBalancerMetricName,
    period: S.Number,
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    unit: MetricUnit,
    statistics: MetricStatisticList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/GetLoadBalancerMetricData",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLoadBalancerMetricDataRequest",
}) as any as S.Schema<GetLoadBalancerMetricDataRequest>;
export interface GetLoadBalancerMetricDataResult {
  metricName?: LoadBalancerMetricName;
  metricData?: MetricDatapoint[];
}
export const GetLoadBalancerMetricDataResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricName: S.optional(LoadBalancerMetricName),
    metricData: S.optional(MetricDatapointList),
  }),
).annotate({
  identifier: "GetLoadBalancerMetricDataResult",
}) as any as S.Schema<GetLoadBalancerMetricDataResult>;
export interface GetLoadBalancersRequest {
  pageToken?: string;
}
export const GetLoadBalancersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pageToken: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetLoadBalancers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLoadBalancersRequest",
}) as any as S.Schema<GetLoadBalancersRequest>;
export type LoadBalancerList = LoadBalancer[];
export const LoadBalancerList = /*@__PURE__*/ S.Array(LoadBalancer);
export interface GetLoadBalancersResult {
  loadBalancers?: LoadBalancer[];
  nextPageToken?: string;
}
export const GetLoadBalancersResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    loadBalancers: S.optional(LoadBalancerList),
    nextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetLoadBalancersResult",
}) as any as S.Schema<GetLoadBalancersResult>;
export interface GetLoadBalancerTlsCertificatesRequest {
  loadBalancerName: string;
}
export const GetLoadBalancerTlsCertificatesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ loadBalancerName: S.String }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/GetLoadBalancerTlsCertificates",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetLoadBalancerTlsCertificatesRequest",
}) as any as S.Schema<GetLoadBalancerTlsCertificatesRequest>;
export type LoadBalancerTlsCertificateStatus =
  | "PENDING_VALIDATION"
  | "ISSUED"
  | "INACTIVE"
  | "EXPIRED"
  | "VALIDATION_TIMED_OUT"
  | "REVOKED"
  | "FAILED"
  | "UNKNOWN"
  | (string & {});
export const LoadBalancerTlsCertificateStatus = /*@__PURE__*/ S.String;

export type LoadBalancerTlsCertificateDomainStatus =
  | "PENDING_VALIDATION"
  | "FAILED"
  | "SUCCESS"
  | (string & {});
export const LoadBalancerTlsCertificateDomainStatus = /*@__PURE__*/ S.String;

export type LoadBalancerTlsCertificateDnsRecordCreationStateCode =
  | "SUCCEEDED"
  | "STARTED"
  | "FAILED"
  | (string & {});
export const LoadBalancerTlsCertificateDnsRecordCreationStateCode =
  /*@__PURE__*/ S.String;

export interface LoadBalancerTlsCertificateDnsRecordCreationState {
  code?: LoadBalancerTlsCertificateDnsRecordCreationStateCode;
  message?: string;
}
export const LoadBalancerTlsCertificateDnsRecordCreationState =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      code: S.optional(LoadBalancerTlsCertificateDnsRecordCreationStateCode),
      message: S.optional(S.String),
    }),
  ).annotate({
    identifier: "LoadBalancerTlsCertificateDnsRecordCreationState",
  }) as any as S.Schema<LoadBalancerTlsCertificateDnsRecordCreationState>;
export interface LoadBalancerTlsCertificateDomainValidationRecord {
  name?: string;
  type?: string;
  value?: string;
  validationStatus?: LoadBalancerTlsCertificateDomainStatus;
  domainName?: string;
  dnsRecordCreationState?: LoadBalancerTlsCertificateDnsRecordCreationState;
}
export const LoadBalancerTlsCertificateDomainValidationRecord =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      name: S.optional(S.String),
      type: S.optional(S.String),
      value: S.optional(S.String),
      validationStatus: S.optional(LoadBalancerTlsCertificateDomainStatus),
      domainName: S.optional(S.String),
      dnsRecordCreationState: S.optional(
        LoadBalancerTlsCertificateDnsRecordCreationState,
      ),
    }),
  ).annotate({
    identifier: "LoadBalancerTlsCertificateDomainValidationRecord",
  }) as any as S.Schema<LoadBalancerTlsCertificateDomainValidationRecord>;
export type LoadBalancerTlsCertificateDomainValidationRecordList =
  LoadBalancerTlsCertificateDomainValidationRecord[];
export const LoadBalancerTlsCertificateDomainValidationRecordList =
  /*@__PURE__*/ S.Array(LoadBalancerTlsCertificateDomainValidationRecord);
export type LoadBalancerTlsCertificateFailureReason =
  | "NO_AVAILABLE_CONTACTS"
  | "ADDITIONAL_VERIFICATION_REQUIRED"
  | "DOMAIN_NOT_ALLOWED"
  | "INVALID_PUBLIC_DOMAIN"
  | "OTHER"
  | (string & {});
export const LoadBalancerTlsCertificateFailureReason = /*@__PURE__*/ S.String;

export type LoadBalancerTlsCertificateRenewalStatus =
  | "PENDING_AUTO_RENEWAL"
  | "PENDING_VALIDATION"
  | "SUCCESS"
  | "FAILED"
  | (string & {});
export const LoadBalancerTlsCertificateRenewalStatus = /*@__PURE__*/ S.String;

export interface LoadBalancerTlsCertificateDomainValidationOption {
  domainName?: string;
  validationStatus?: LoadBalancerTlsCertificateDomainStatus;
}
export const LoadBalancerTlsCertificateDomainValidationOption =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      domainName: S.optional(S.String),
      validationStatus: S.optional(LoadBalancerTlsCertificateDomainStatus),
    }),
  ).annotate({
    identifier: "LoadBalancerTlsCertificateDomainValidationOption",
  }) as any as S.Schema<LoadBalancerTlsCertificateDomainValidationOption>;
export type LoadBalancerTlsCertificateDomainValidationOptionList =
  LoadBalancerTlsCertificateDomainValidationOption[];
export const LoadBalancerTlsCertificateDomainValidationOptionList =
  /*@__PURE__*/ S.Array(LoadBalancerTlsCertificateDomainValidationOption);
export interface LoadBalancerTlsCertificateRenewalSummary {
  renewalStatus?: LoadBalancerTlsCertificateRenewalStatus;
  domainValidationOptions?: LoadBalancerTlsCertificateDomainValidationOption[];
}
export const LoadBalancerTlsCertificateRenewalSummary = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      renewalStatus: S.optional(LoadBalancerTlsCertificateRenewalStatus),
      domainValidationOptions: S.optional(
        LoadBalancerTlsCertificateDomainValidationOptionList,
      ),
    }),
).annotate({
  identifier: "LoadBalancerTlsCertificateRenewalSummary",
}) as any as S.Schema<LoadBalancerTlsCertificateRenewalSummary>;
export type LoadBalancerTlsCertificateRevocationReason =
  | "UNSPECIFIED"
  | "KEY_COMPROMISE"
  | "CA_COMPROMISE"
  | "AFFILIATION_CHANGED"
  | "SUPERCEDED"
  | "CESSATION_OF_OPERATION"
  | "CERTIFICATE_HOLD"
  | "REMOVE_FROM_CRL"
  | "PRIVILEGE_WITHDRAWN"
  | "A_A_COMPROMISE"
  | (string & {});
export const LoadBalancerTlsCertificateRevocationReason =
  /*@__PURE__*/ S.String;

export interface LoadBalancerTlsCertificate {
  name?: string;
  arn?: string;
  supportCode?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  tags?: Tag[];
  loadBalancerName?: string;
  isAttached?: boolean;
  status?: LoadBalancerTlsCertificateStatus;
  domainName?: string;
  domainValidationRecords?: LoadBalancerTlsCertificateDomainValidationRecord[];
  failureReason?: LoadBalancerTlsCertificateFailureReason;
  issuedAt?: Date;
  issuer?: string;
  keyAlgorithm?: string;
  notAfter?: Date;
  notBefore?: Date;
  renewalSummary?: LoadBalancerTlsCertificateRenewalSummary;
  revocationReason?: LoadBalancerTlsCertificateRevocationReason;
  revokedAt?: Date;
  serial?: string;
  signatureAlgorithm?: string;
  subject?: string;
  subjectAlternativeNames?: string[];
}
export const LoadBalancerTlsCertificate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    supportCode: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    location: S.optional(ResourceLocation),
    resourceType: S.optional(ResourceType),
    tags: S.optional(TagList),
    loadBalancerName: S.optional(S.String),
    isAttached: S.optional(S.Boolean),
    status: S.optional(LoadBalancerTlsCertificateStatus),
    domainName: S.optional(S.String),
    domainValidationRecords: S.optional(
      LoadBalancerTlsCertificateDomainValidationRecordList,
    ),
    failureReason: S.optional(LoadBalancerTlsCertificateFailureReason),
    issuedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    issuer: S.optional(S.String),
    keyAlgorithm: S.optional(S.String),
    notAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    notBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    renewalSummary: S.optional(LoadBalancerTlsCertificateRenewalSummary),
    revocationReason: S.optional(LoadBalancerTlsCertificateRevocationReason),
    revokedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    serial: S.optional(S.String),
    signatureAlgorithm: S.optional(S.String),
    subject: S.optional(S.String),
    subjectAlternativeNames: S.optional(StringList),
  }),
).annotate({
  identifier: "LoadBalancerTlsCertificate",
}) as any as S.Schema<LoadBalancerTlsCertificate>;
export type LoadBalancerTlsCertificateList = LoadBalancerTlsCertificate[];
export const LoadBalancerTlsCertificateList = /*@__PURE__*/ S.Array(
  LoadBalancerTlsCertificate,
);
export interface GetLoadBalancerTlsCertificatesResult {
  tlsCertificates?: LoadBalancerTlsCertificate[];
}
export const GetLoadBalancerTlsCertificatesResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ tlsCertificates: S.optional(LoadBalancerTlsCertificateList) }),
).annotate({
  identifier: "GetLoadBalancerTlsCertificatesResult",
}) as any as S.Schema<GetLoadBalancerTlsCertificatesResult>;
export interface GetLoadBalancerTlsPoliciesRequest {
  pageToken?: string;
}
export const GetLoadBalancerTlsPoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pageToken: S.optional(S.String) }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/GetLoadBalancerTlsPolicies",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLoadBalancerTlsPoliciesRequest",
}) as any as S.Schema<GetLoadBalancerTlsPoliciesRequest>;
export interface LoadBalancerTlsPolicy {
  name?: string;
  isDefault?: boolean;
  description?: string;
  protocols?: string[];
  ciphers?: string[];
}
export const LoadBalancerTlsPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    isDefault: S.optional(S.Boolean),
    description: S.optional(S.String),
    protocols: S.optional(StringList),
    ciphers: S.optional(StringList),
  }),
).annotate({
  identifier: "LoadBalancerTlsPolicy",
}) as any as S.Schema<LoadBalancerTlsPolicy>;
export type LoadBalancerTlsPolicyList = LoadBalancerTlsPolicy[];
export const LoadBalancerTlsPolicyList = /*@__PURE__*/ S.Array(
  LoadBalancerTlsPolicy,
);
export interface GetLoadBalancerTlsPoliciesResult {
  tlsPolicies?: LoadBalancerTlsPolicy[];
  nextPageToken?: string;
}
export const GetLoadBalancerTlsPoliciesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tlsPolicies: S.optional(LoadBalancerTlsPolicyList),
    nextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetLoadBalancerTlsPoliciesResult",
}) as any as S.Schema<GetLoadBalancerTlsPoliciesResult>;
export interface GetOperationRequest {
  operationId: string;
}
export const GetOperationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operationId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetOperation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOperationRequest",
}) as any as S.Schema<GetOperationRequest>;
export interface GetOperationResult {
  operation?: Operation;
}
export const GetOperationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operation: S.optional(Operation) }),
).annotate({
  identifier: "GetOperationResult",
}) as any as S.Schema<GetOperationResult>;
export interface GetOperationsRequest {
  pageToken?: string;
}
export const GetOperationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pageToken: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetOperations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOperationsRequest",
}) as any as S.Schema<GetOperationsRequest>;
export interface GetOperationsResult {
  operations?: Operation[];
  nextPageToken?: string;
}
export const GetOperationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    operations: S.optional(OperationList),
    nextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetOperationsResult",
}) as any as S.Schema<GetOperationsResult>;
export interface GetOperationsForResourceRequest {
  resourceName: string;
  pageToken?: string;
}
export const GetOperationsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceName: S.String, pageToken: S.optional(S.String) }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/GetOperationsForResource",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOperationsForResourceRequest",
}) as any as S.Schema<GetOperationsForResourceRequest>;
export interface GetOperationsForResourceResult {
  operations?: Operation[];
  nextPageCount?: string;
  nextPageToken?: string;
}
export const GetOperationsForResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    operations: S.optional(OperationList),
    nextPageCount: S.optional(S.String),
    nextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetOperationsForResourceResult",
}) as any as S.Schema<GetOperationsForResourceResult>;
export interface GetRegionsRequest {
  includeAvailabilityZones?: boolean;
  includeRelationalDatabaseAvailabilityZones?: boolean;
}
export const GetRegionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    includeAvailabilityZones: S.optional(S.Boolean),
    includeRelationalDatabaseAvailabilityZones: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetRegions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRegionsRequest",
}) as any as S.Schema<GetRegionsRequest>;
export interface AvailabilityZone {
  zoneName?: string;
  state?: string;
}
export const AvailabilityZone = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ zoneName: S.optional(S.String), state: S.optional(S.String) }),
).annotate({
  identifier: "AvailabilityZone",
}) as any as S.Schema<AvailabilityZone>;
export type AvailabilityZoneList = AvailabilityZone[];
export const AvailabilityZoneList = /*@__PURE__*/ S.Array(AvailabilityZone);
export interface Region {
  continentCode?: string;
  description?: string;
  displayName?: string;
  name?: RegionName;
  availabilityZones?: AvailabilityZone[];
  relationalDatabaseAvailabilityZones?: AvailabilityZone[];
}
export const Region = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    continentCode: S.optional(S.String),
    description: S.optional(S.String),
    displayName: S.optional(S.String),
    name: S.optional(RegionName),
    availabilityZones: S.optional(AvailabilityZoneList),
    relationalDatabaseAvailabilityZones: S.optional(AvailabilityZoneList),
  }),
).annotate({ identifier: "Region" }) as any as S.Schema<Region>;
export type RegionList = Region[];
export const RegionList = /*@__PURE__*/ S.Array(Region);
export interface GetRegionsResult {
  regions?: Region[];
}
export const GetRegionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ regions: S.optional(RegionList) }),
).annotate({
  identifier: "GetRegionsResult",
}) as any as S.Schema<GetRegionsResult>;
export interface GetRelationalDatabaseRequest {
  relationalDatabaseName: string;
}
export const GetRelationalDatabaseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ relationalDatabaseName: S.String }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/GetRelationalDatabase",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRelationalDatabaseRequest",
}) as any as S.Schema<GetRelationalDatabaseRequest>;
export interface RelationalDatabaseHardware {
  cpuCount?: number;
  diskSizeInGb?: number;
  ramSizeInGb?: number;
}
export const RelationalDatabaseHardware = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cpuCount: S.optional(S.Number),
    diskSizeInGb: S.optional(S.Number),
    ramSizeInGb: S.optional(S.Number),
  }),
).annotate({
  identifier: "RelationalDatabaseHardware",
}) as any as S.Schema<RelationalDatabaseHardware>;
export interface PendingModifiedRelationalDatabaseValues {
  masterUserPassword?: string;
  engineVersion?: string;
  backupRetentionEnabled?: boolean;
}
export const PendingModifiedRelationalDatabaseValues = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      masterUserPassword: S.optional(S.String),
      engineVersion: S.optional(S.String),
      backupRetentionEnabled: S.optional(S.Boolean),
    }),
).annotate({
  identifier: "PendingModifiedRelationalDatabaseValues",
}) as any as S.Schema<PendingModifiedRelationalDatabaseValues>;
export interface RelationalDatabaseEndpoint {
  port?: number;
  address?: string;
}
export const RelationalDatabaseEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ port: S.optional(S.Number), address: S.optional(S.String) }),
).annotate({
  identifier: "RelationalDatabaseEndpoint",
}) as any as S.Schema<RelationalDatabaseEndpoint>;
export interface PendingMaintenanceAction {
  action?: string;
  description?: string;
  currentApplyDate?: Date;
}
export const PendingMaintenanceAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: S.optional(S.String),
    description: S.optional(S.String),
    currentApplyDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "PendingMaintenanceAction",
}) as any as S.Schema<PendingMaintenanceAction>;
export type PendingMaintenanceActionList = PendingMaintenanceAction[];
export const PendingMaintenanceActionList = /*@__PURE__*/ S.Array(
  PendingMaintenanceAction,
);
export interface RelationalDatabase {
  name?: string;
  arn?: string;
  supportCode?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  tags?: Tag[];
  relationalDatabaseBlueprintId?: string;
  relationalDatabaseBundleId?: string;
  masterDatabaseName?: string;
  hardware?: RelationalDatabaseHardware;
  state?: string;
  secondaryAvailabilityZone?: string;
  backupRetentionEnabled?: boolean;
  pendingModifiedValues?: PendingModifiedRelationalDatabaseValues;
  engine?: string;
  engineVersion?: string;
  latestRestorableTime?: Date;
  masterUsername?: string;
  parameterApplyStatus?: string;
  preferredBackupWindow?: string;
  preferredMaintenanceWindow?: string;
  publiclyAccessible?: boolean;
  masterEndpoint?: RelationalDatabaseEndpoint;
  pendingMaintenanceActions?: PendingMaintenanceAction[];
  caCertificateIdentifier?: string;
}
export const RelationalDatabase = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    supportCode: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    location: S.optional(ResourceLocation),
    resourceType: S.optional(ResourceType),
    tags: S.optional(TagList),
    relationalDatabaseBlueprintId: S.optional(S.String),
    relationalDatabaseBundleId: S.optional(S.String),
    masterDatabaseName: S.optional(S.String),
    hardware: S.optional(RelationalDatabaseHardware),
    state: S.optional(S.String),
    secondaryAvailabilityZone: S.optional(S.String),
    backupRetentionEnabled: S.optional(S.Boolean),
    pendingModifiedValues: S.optional(PendingModifiedRelationalDatabaseValues),
    engine: S.optional(S.String),
    engineVersion: S.optional(S.String),
    latestRestorableTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    masterUsername: S.optional(S.String),
    parameterApplyStatus: S.optional(S.String),
    preferredBackupWindow: S.optional(S.String),
    preferredMaintenanceWindow: S.optional(S.String),
    publiclyAccessible: S.optional(S.Boolean),
    masterEndpoint: S.optional(RelationalDatabaseEndpoint),
    pendingMaintenanceActions: S.optional(PendingMaintenanceActionList),
    caCertificateIdentifier: S.optional(S.String),
  }),
).annotate({
  identifier: "RelationalDatabase",
}) as any as S.Schema<RelationalDatabase>;
export interface GetRelationalDatabaseResult {
  relationalDatabase?: RelationalDatabase;
}
export const GetRelationalDatabaseResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ relationalDatabase: S.optional(RelationalDatabase) }),
).annotate({
  identifier: "GetRelationalDatabaseResult",
}) as any as S.Schema<GetRelationalDatabaseResult>;
export interface GetRelationalDatabaseBlueprintsRequest {
  pageToken?: string;
}
export const GetRelationalDatabaseBlueprintsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ pageToken: S.optional(S.String) }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/GetRelationalDatabaseBlueprints",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetRelationalDatabaseBlueprintsRequest",
}) as any as S.Schema<GetRelationalDatabaseBlueprintsRequest>;
export type RelationalDatabaseEngine = "mysql" | (string & {});
export const RelationalDatabaseEngine = /*@__PURE__*/ S.String;

export interface RelationalDatabaseBlueprint {
  blueprintId?: string;
  engine?: RelationalDatabaseEngine;
  engineVersion?: string;
  engineDescription?: string;
  engineVersionDescription?: string;
  isEngineDefault?: boolean;
}
export const RelationalDatabaseBlueprint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    blueprintId: S.optional(S.String),
    engine: S.optional(RelationalDatabaseEngine),
    engineVersion: S.optional(S.String),
    engineDescription: S.optional(S.String),
    engineVersionDescription: S.optional(S.String),
    isEngineDefault: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "RelationalDatabaseBlueprint",
}) as any as S.Schema<RelationalDatabaseBlueprint>;
export type RelationalDatabaseBlueprintList = RelationalDatabaseBlueprint[];
export const RelationalDatabaseBlueprintList = /*@__PURE__*/ S.Array(
  RelationalDatabaseBlueprint,
);
export interface GetRelationalDatabaseBlueprintsResult {
  blueprints?: RelationalDatabaseBlueprint[];
  nextPageToken?: string;
}
export const GetRelationalDatabaseBlueprintsResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      blueprints: S.optional(RelationalDatabaseBlueprintList),
      nextPageToken: S.optional(S.String),
    }),
).annotate({
  identifier: "GetRelationalDatabaseBlueprintsResult",
}) as any as S.Schema<GetRelationalDatabaseBlueprintsResult>;
export interface GetRelationalDatabaseBundlesRequest {
  pageToken?: string;
  includeInactive?: boolean;
}
export const GetRelationalDatabaseBundlesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pageToken: S.optional(S.String),
    includeInactive: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/GetRelationalDatabaseBundles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRelationalDatabaseBundlesRequest",
}) as any as S.Schema<GetRelationalDatabaseBundlesRequest>;
export interface RelationalDatabaseBundle {
  bundleId?: string;
  name?: string;
  price?: number;
  ramSizeInGb?: number;
  diskSizeInGb?: number;
  transferPerMonthInGb?: number;
  cpuCount?: number;
  isEncrypted?: boolean;
  isActive?: boolean;
}
export const RelationalDatabaseBundle = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bundleId: S.optional(S.String),
    name: S.optional(S.String),
    price: S.optional(S.Number),
    ramSizeInGb: S.optional(S.Number),
    diskSizeInGb: S.optional(S.Number),
    transferPerMonthInGb: S.optional(S.Number),
    cpuCount: S.optional(S.Number),
    isEncrypted: S.optional(S.Boolean),
    isActive: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "RelationalDatabaseBundle",
}) as any as S.Schema<RelationalDatabaseBundle>;
export type RelationalDatabaseBundleList = RelationalDatabaseBundle[];
export const RelationalDatabaseBundleList = /*@__PURE__*/ S.Array(
  RelationalDatabaseBundle,
);
export interface GetRelationalDatabaseBundlesResult {
  bundles?: RelationalDatabaseBundle[];
  nextPageToken?: string;
}
export const GetRelationalDatabaseBundlesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bundles: S.optional(RelationalDatabaseBundleList),
    nextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetRelationalDatabaseBundlesResult",
}) as any as S.Schema<GetRelationalDatabaseBundlesResult>;
export interface GetRelationalDatabaseEventsRequest {
  relationalDatabaseName: string;
  durationInMinutes?: number;
  pageToken?: string;
}
export const GetRelationalDatabaseEventsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    relationalDatabaseName: S.String,
    durationInMinutes: S.optional(S.Number),
    pageToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/GetRelationalDatabaseEvents",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRelationalDatabaseEventsRequest",
}) as any as S.Schema<GetRelationalDatabaseEventsRequest>;
export interface RelationalDatabaseEvent {
  resource?: string;
  createdAt?: Date;
  message?: string;
  eventCategories?: string[];
}
export const RelationalDatabaseEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resource: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    message: S.optional(S.String),
    eventCategories: S.optional(StringList),
  }),
).annotate({
  identifier: "RelationalDatabaseEvent",
}) as any as S.Schema<RelationalDatabaseEvent>;
export type RelationalDatabaseEventList = RelationalDatabaseEvent[];
export const RelationalDatabaseEventList = /*@__PURE__*/ S.Array(
  RelationalDatabaseEvent,
);
export interface GetRelationalDatabaseEventsResult {
  relationalDatabaseEvents?: RelationalDatabaseEvent[];
  nextPageToken?: string;
}
export const GetRelationalDatabaseEventsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    relationalDatabaseEvents: S.optional(RelationalDatabaseEventList),
    nextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetRelationalDatabaseEventsResult",
}) as any as S.Schema<GetRelationalDatabaseEventsResult>;
export interface GetRelationalDatabaseLogEventsRequest {
  relationalDatabaseName: string;
  logStreamName: string;
  startTime?: Date;
  endTime?: Date;
  startFromHead?: boolean;
  pageToken?: string;
}
export const GetRelationalDatabaseLogEventsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      relationalDatabaseName: S.String,
      logStreamName: S.String,
      startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      startFromHead: S.optional(S.Boolean),
      pageToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/GetRelationalDatabaseLogEvents",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetRelationalDatabaseLogEventsRequest",
}) as any as S.Schema<GetRelationalDatabaseLogEventsRequest>;
export interface LogEvent {
  createdAt?: Date;
  message?: string;
}
export const LogEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    message: S.optional(S.String),
  }),
).annotate({ identifier: "LogEvent" }) as any as S.Schema<LogEvent>;
export type LogEventList = LogEvent[];
export const LogEventList = /*@__PURE__*/ S.Array(LogEvent);
export interface GetRelationalDatabaseLogEventsResult {
  resourceLogEvents?: LogEvent[];
  nextBackwardToken?: string;
  nextForwardToken?: string;
}
export const GetRelationalDatabaseLogEventsResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      resourceLogEvents: S.optional(LogEventList),
      nextBackwardToken: S.optional(S.String),
      nextForwardToken: S.optional(S.String),
    }),
).annotate({
  identifier: "GetRelationalDatabaseLogEventsResult",
}) as any as S.Schema<GetRelationalDatabaseLogEventsResult>;
export interface GetRelationalDatabaseLogStreamsRequest {
  relationalDatabaseName: string;
}
export const GetRelationalDatabaseLogStreamsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ relationalDatabaseName: S.String }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/GetRelationalDatabaseLogStreams",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetRelationalDatabaseLogStreamsRequest",
}) as any as S.Schema<GetRelationalDatabaseLogStreamsRequest>;
export interface GetRelationalDatabaseLogStreamsResult {
  logStreams?: string[];
}
export const GetRelationalDatabaseLogStreamsResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ logStreams: S.optional(StringList) }),
).annotate({
  identifier: "GetRelationalDatabaseLogStreamsResult",
}) as any as S.Schema<GetRelationalDatabaseLogStreamsResult>;
export type RelationalDatabasePasswordVersion =
  | "CURRENT"
  | "PREVIOUS"
  | "PENDING"
  | (string & {});
export const RelationalDatabasePasswordVersion = /*@__PURE__*/ S.String;

export interface GetRelationalDatabaseMasterUserPasswordRequest {
  relationalDatabaseName: string;
  passwordVersion?: RelationalDatabasePasswordVersion;
}
export const GetRelationalDatabaseMasterUserPasswordRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      relationalDatabaseName: S.String,
      passwordVersion: S.optional(RelationalDatabasePasswordVersion),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/GetRelationalDatabaseMasterUserPassword",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetRelationalDatabaseMasterUserPasswordRequest",
  }) as any as S.Schema<GetRelationalDatabaseMasterUserPasswordRequest>;
export interface GetRelationalDatabaseMasterUserPasswordResult {
  masterUserPassword?: string | redacted.Redacted<string>;
  createdAt?: Date;
}
export const GetRelationalDatabaseMasterUserPasswordResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      masterUserPassword: S.optional(SensitiveString),
      createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    }),
  ).annotate({
    identifier: "GetRelationalDatabaseMasterUserPasswordResult",
  }) as any as S.Schema<GetRelationalDatabaseMasterUserPasswordResult>;
export type RelationalDatabaseMetricName =
  | "CPUUtilization"
  | "DatabaseConnections"
  | "DiskQueueDepth"
  | "FreeStorageSpace"
  | "NetworkReceiveThroughput"
  | "NetworkTransmitThroughput"
  | (string & {});
export const RelationalDatabaseMetricName = /*@__PURE__*/ S.String;

export interface GetRelationalDatabaseMetricDataRequest {
  relationalDatabaseName: string;
  metricName: RelationalDatabaseMetricName;
  period: number;
  startTime: Date;
  endTime: Date;
  unit: MetricUnit;
  statistics: MetricStatistic[];
}
export const GetRelationalDatabaseMetricDataRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      relationalDatabaseName: S.String,
      metricName: RelationalDatabaseMetricName,
      period: S.Number,
      startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      unit: MetricUnit,
      statistics: MetricStatisticList,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/GetRelationalDatabaseMetricData",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetRelationalDatabaseMetricDataRequest",
}) as any as S.Schema<GetRelationalDatabaseMetricDataRequest>;
export interface GetRelationalDatabaseMetricDataResult {
  metricName?: RelationalDatabaseMetricName;
  metricData?: MetricDatapoint[];
}
export const GetRelationalDatabaseMetricDataResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      metricName: S.optional(RelationalDatabaseMetricName),
      metricData: S.optional(MetricDatapointList),
    }),
).annotate({
  identifier: "GetRelationalDatabaseMetricDataResult",
}) as any as S.Schema<GetRelationalDatabaseMetricDataResult>;
export interface GetRelationalDatabaseParametersRequest {
  relationalDatabaseName: string;
  pageToken?: string;
}
export const GetRelationalDatabaseParametersRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      relationalDatabaseName: S.String,
      pageToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/GetRelationalDatabaseParameters",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetRelationalDatabaseParametersRequest",
}) as any as S.Schema<GetRelationalDatabaseParametersRequest>;
export interface RelationalDatabaseParameter {
  allowedValues?: string;
  applyMethod?: string;
  applyType?: string;
  dataType?: string;
  description?: string;
  isModifiable?: boolean;
  parameterName?: string;
  parameterValue?: string;
}
export const RelationalDatabaseParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    allowedValues: S.optional(S.String),
    applyMethod: S.optional(S.String),
    applyType: S.optional(S.String),
    dataType: S.optional(S.String),
    description: S.optional(S.String),
    isModifiable: S.optional(S.Boolean),
    parameterName: S.optional(S.String),
    parameterValue: S.optional(S.String),
  }),
).annotate({
  identifier: "RelationalDatabaseParameter",
}) as any as S.Schema<RelationalDatabaseParameter>;
export type RelationalDatabaseParameterList = RelationalDatabaseParameter[];
export const RelationalDatabaseParameterList = /*@__PURE__*/ S.Array(
  RelationalDatabaseParameter,
);
export interface GetRelationalDatabaseParametersResult {
  parameters?: RelationalDatabaseParameter[];
  nextPageToken?: string;
}
export const GetRelationalDatabaseParametersResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      parameters: S.optional(RelationalDatabaseParameterList),
      nextPageToken: S.optional(S.String),
    }),
).annotate({
  identifier: "GetRelationalDatabaseParametersResult",
}) as any as S.Schema<GetRelationalDatabaseParametersResult>;
export interface GetRelationalDatabasesRequest {
  pageToken?: string;
}
export const GetRelationalDatabasesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pageToken: S.optional(S.String) }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/GetRelationalDatabases",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRelationalDatabasesRequest",
}) as any as S.Schema<GetRelationalDatabasesRequest>;
export type RelationalDatabaseList = RelationalDatabase[];
export const RelationalDatabaseList = /*@__PURE__*/ S.Array(RelationalDatabase);
export interface GetRelationalDatabasesResult {
  relationalDatabases?: RelationalDatabase[];
  nextPageToken?: string;
}
export const GetRelationalDatabasesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    relationalDatabases: S.optional(RelationalDatabaseList),
    nextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetRelationalDatabasesResult",
}) as any as S.Schema<GetRelationalDatabasesResult>;
export interface GetRelationalDatabaseSnapshotRequest {
  relationalDatabaseSnapshotName: string;
}
export const GetRelationalDatabaseSnapshotRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ relationalDatabaseSnapshotName: S.String }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/GetRelationalDatabaseSnapshot",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetRelationalDatabaseSnapshotRequest",
}) as any as S.Schema<GetRelationalDatabaseSnapshotRequest>;
export interface RelationalDatabaseSnapshot {
  name?: string;
  arn?: string;
  supportCode?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  tags?: Tag[];
  engine?: string;
  engineVersion?: string;
  sizeInGb?: number;
  state?: string;
  fromRelationalDatabaseName?: string;
  fromRelationalDatabaseArn?: string;
  fromRelationalDatabaseBundleId?: string;
  fromRelationalDatabaseBlueprintId?: string;
}
export const RelationalDatabaseSnapshot = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    supportCode: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    location: S.optional(ResourceLocation),
    resourceType: S.optional(ResourceType),
    tags: S.optional(TagList),
    engine: S.optional(S.String),
    engineVersion: S.optional(S.String),
    sizeInGb: S.optional(S.Number),
    state: S.optional(S.String),
    fromRelationalDatabaseName: S.optional(S.String),
    fromRelationalDatabaseArn: S.optional(S.String),
    fromRelationalDatabaseBundleId: S.optional(S.String),
    fromRelationalDatabaseBlueprintId: S.optional(S.String),
  }),
).annotate({
  identifier: "RelationalDatabaseSnapshot",
}) as any as S.Schema<RelationalDatabaseSnapshot>;
export interface GetRelationalDatabaseSnapshotResult {
  relationalDatabaseSnapshot?: RelationalDatabaseSnapshot;
}
export const GetRelationalDatabaseSnapshotResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    relationalDatabaseSnapshot: S.optional(RelationalDatabaseSnapshot),
  }),
).annotate({
  identifier: "GetRelationalDatabaseSnapshotResult",
}) as any as S.Schema<GetRelationalDatabaseSnapshotResult>;
export interface GetRelationalDatabaseSnapshotsRequest {
  pageToken?: string;
}
export const GetRelationalDatabaseSnapshotsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ pageToken: S.optional(S.String) }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/GetRelationalDatabaseSnapshots",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetRelationalDatabaseSnapshotsRequest",
}) as any as S.Schema<GetRelationalDatabaseSnapshotsRequest>;
export type RelationalDatabaseSnapshotList = RelationalDatabaseSnapshot[];
export const RelationalDatabaseSnapshotList = /*@__PURE__*/ S.Array(
  RelationalDatabaseSnapshot,
);
export interface GetRelationalDatabaseSnapshotsResult {
  relationalDatabaseSnapshots?: RelationalDatabaseSnapshot[];
  nextPageToken?: string;
}
export const GetRelationalDatabaseSnapshotsResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      relationalDatabaseSnapshots: S.optional(RelationalDatabaseSnapshotList),
      nextPageToken: S.optional(S.String),
    }),
).annotate({
  identifier: "GetRelationalDatabaseSnapshotsResult",
}) as any as S.Schema<GetRelationalDatabaseSnapshotsResult>;
export type SetupHistoryPageToken = string;
export interface GetSetupHistoryRequest {
  resourceName: string;
  pageToken?: string;
}
export const GetSetupHistoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceName: S.String, pageToken: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/get-setup-history" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSetupHistoryRequest",
}) as any as S.Schema<GetSetupHistoryRequest>;
export type SetupDomainName = string;
export type SetupDomainNameList = string[];
export const SetupDomainNameList = /*@__PURE__*/ S.Array(S.String);
export type CertificateProvider = "LetsEncrypt" | (string & {});
export const CertificateProvider = /*@__PURE__*/ S.String;

export interface SetupRequest {
  instanceName?: string;
  domainNames?: string[];
  certificateProvider?: CertificateProvider;
}
export const SetupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceName: S.optional(S.String),
    domainNames: S.optional(SetupDomainNameList),
    certificateProvider: S.optional(CertificateProvider),
  }),
).annotate({ identifier: "SetupRequest" }) as any as S.Schema<SetupRequest>;
export interface SetupHistoryResource {
  name?: string;
  arn?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
}
export const SetupHistoryResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    location: S.optional(ResourceLocation),
    resourceType: S.optional(ResourceType),
  }),
).annotate({
  identifier: "SetupHistoryResource",
}) as any as S.Schema<SetupHistoryResource>;
export type SetupStatus = "succeeded" | "failed" | "inProgress" | (string & {});
export const SetupStatus = /*@__PURE__*/ S.String;

export interface SetupExecutionDetails {
  command?: string;
  dateTime?: Date;
  name?: string;
  status?: SetupStatus;
  standardError?: string;
  standardOutput?: string;
  version?: string;
}
export const SetupExecutionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    command: S.optional(S.String),
    dateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    name: S.optional(S.String),
    status: S.optional(SetupStatus),
    standardError: S.optional(S.String),
    standardOutput: S.optional(S.String),
    version: S.optional(S.String),
  }),
).annotate({
  identifier: "SetupExecutionDetails",
}) as any as S.Schema<SetupExecutionDetails>;
export type SetupExecutionDetailsList = SetupExecutionDetails[];
export const SetupExecutionDetailsList = /*@__PURE__*/ S.Array(
  SetupExecutionDetails,
);
export interface SetupHistory {
  operationId?: string;
  request?: SetupRequest;
  resource?: SetupHistoryResource;
  executionDetails?: SetupExecutionDetails[];
  status?: SetupStatus;
}
export const SetupHistory = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    operationId: S.optional(S.String),
    request: S.optional(SetupRequest),
    resource: S.optional(SetupHistoryResource),
    executionDetails: S.optional(SetupExecutionDetailsList),
    status: S.optional(SetupStatus),
  }),
).annotate({ identifier: "SetupHistory" }) as any as S.Schema<SetupHistory>;
export type SetupHistoryList = SetupHistory[];
export const SetupHistoryList = /*@__PURE__*/ S.Array(SetupHistory);
export interface GetSetupHistoryResult {
  setupHistory?: SetupHistory[];
  nextPageToken?: string;
}
export const GetSetupHistoryResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    setupHistory: S.optional(SetupHistoryList),
    nextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetSetupHistoryResult",
}) as any as S.Schema<GetSetupHistoryResult>;
export interface GetStaticIpRequest {
  staticIpName: string;
}
export const GetStaticIpRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ staticIpName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetStaticIp" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetStaticIpRequest",
}) as any as S.Schema<GetStaticIpRequest>;
export interface StaticIp {
  name?: string;
  arn?: string;
  supportCode?: string;
  createdAt?: Date;
  location?: ResourceLocation;
  resourceType?: ResourceType;
  ipAddress?: string;
  attachedTo?: string;
  isAttached?: boolean;
}
export const StaticIp = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    supportCode: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    location: S.optional(ResourceLocation),
    resourceType: S.optional(ResourceType),
    ipAddress: S.optional(S.String),
    attachedTo: S.optional(S.String),
    isAttached: S.optional(S.Boolean),
  }),
).annotate({ identifier: "StaticIp" }) as any as S.Schema<StaticIp>;
export interface GetStaticIpResult {
  staticIp?: StaticIp;
}
export const GetStaticIpResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ staticIp: S.optional(StaticIp) }),
).annotate({
  identifier: "GetStaticIpResult",
}) as any as S.Schema<GetStaticIpResult>;
export interface GetStaticIpsRequest {
  pageToken?: string;
}
export const GetStaticIpsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pageToken: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/GetStaticIps" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetStaticIpsRequest",
}) as any as S.Schema<GetStaticIpsRequest>;
export type StaticIpList = StaticIp[];
export const StaticIpList = /*@__PURE__*/ S.Array(StaticIp);
export interface GetStaticIpsResult {
  staticIps?: StaticIp[];
  nextPageToken?: string;
}
export const GetStaticIpsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    staticIps: S.optional(StaticIpList),
    nextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetStaticIpsResult",
}) as any as S.Schema<GetStaticIpsResult>;
export interface ImportKeyPairRequest {
  keyPairName: string;
  publicKeyBase64: string;
}
export const ImportKeyPairRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ keyPairName: S.String, publicKeyBase64: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/ImportKeyPair" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ImportKeyPairRequest",
}) as any as S.Schema<ImportKeyPairRequest>;
export interface ImportKeyPairResult {
  operation?: Operation;
}
export const ImportKeyPairResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operation: S.optional(Operation) }),
).annotate({
  identifier: "ImportKeyPairResult",
}) as any as S.Schema<ImportKeyPairResult>;
export interface IsVpcPeeredRequest {}
export const IsVpcPeeredRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/IsVpcPeered" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "IsVpcPeeredRequest",
}) as any as S.Schema<IsVpcPeeredRequest>;
export interface IsVpcPeeredResult {
  isPeered?: boolean;
}
export const IsVpcPeeredResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ isPeered: S.optional(S.Boolean) }),
).annotate({
  identifier: "IsVpcPeeredResult",
}) as any as S.Schema<IsVpcPeeredResult>;
export interface OpenInstancePublicPortsRequest {
  portInfo: PortInfo;
  instanceName: string;
}
export const OpenInstancePublicPortsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ portInfo: PortInfo, instanceName: S.String }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/OpenInstancePublicPorts",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "OpenInstancePublicPortsRequest",
}) as any as S.Schema<OpenInstancePublicPortsRequest>;
export interface OpenInstancePublicPortsResult {
  operation?: Operation;
}
export const OpenInstancePublicPortsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operation: S.optional(Operation) }),
).annotate({
  identifier: "OpenInstancePublicPortsResult",
}) as any as S.Schema<OpenInstancePublicPortsResult>;
export interface PeerVpcRequest {}
export const PeerVpcRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/PeerVpc" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "PeerVpcRequest" }) as any as S.Schema<PeerVpcRequest>;
export interface PeerVpcResult {
  operation?: Operation;
}
export const PeerVpcResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operation: S.optional(Operation) }),
).annotate({ identifier: "PeerVpcResult" }) as any as S.Schema<PeerVpcResult>;
export interface PutAlarmRequest {
  alarmName: string;
  metricName: MetricName;
  monitoredResourceName: string;
  comparisonOperator: ComparisonOperator;
  threshold: number;
  evaluationPeriods: number;
  datapointsToAlarm?: number;
  treatMissingData?: TreatMissingData;
  contactProtocols?: ContactProtocol[];
  notificationTriggers?: AlarmState[];
  notificationEnabled?: boolean;
  tags?: Tag[];
}
export const PutAlarmRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    alarmName: S.String,
    metricName: MetricName,
    monitoredResourceName: S.String,
    comparisonOperator: ComparisonOperator,
    threshold: S.Number,
    evaluationPeriods: S.Number,
    datapointsToAlarm: S.optional(S.Number),
    treatMissingData: S.optional(TreatMissingData),
    contactProtocols: S.optional(ContactProtocolsList),
    notificationTriggers: S.optional(NotificationTriggerList),
    notificationEnabled: S.optional(S.Boolean),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/PutAlarm" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutAlarmRequest",
}) as any as S.Schema<PutAlarmRequest>;
export interface PutAlarmResult {
  operations?: Operation[];
}
export const PutAlarmResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({ identifier: "PutAlarmResult" }) as any as S.Schema<PutAlarmResult>;
export type PortInfoList = PortInfo[];
export const PortInfoList = /*@__PURE__*/ S.Array(PortInfo);
export interface PutInstancePublicPortsRequest {
  portInfos: PortInfo[];
  instanceName: string;
}
export const PutInstancePublicPortsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ portInfos: PortInfoList, instanceName: S.String }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/PutInstancePublicPorts",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutInstancePublicPortsRequest",
}) as any as S.Schema<PutInstancePublicPortsRequest>;
export interface PutInstancePublicPortsResult {
  operation?: Operation;
}
export const PutInstancePublicPortsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operation: S.optional(Operation) }),
).annotate({
  identifier: "PutInstancePublicPortsResult",
}) as any as S.Schema<PutInstancePublicPortsResult>;
export interface RebootInstanceRequest {
  instanceName: string;
}
export const RebootInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instanceName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/RebootInstance" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RebootInstanceRequest",
}) as any as S.Schema<RebootInstanceRequest>;
export interface RebootInstanceResult {
  operations?: Operation[];
}
export const RebootInstanceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "RebootInstanceResult",
}) as any as S.Schema<RebootInstanceResult>;
export interface RebootRelationalDatabaseRequest {
  relationalDatabaseName: string;
}
export const RebootRelationalDatabaseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ relationalDatabaseName: S.String }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/RebootRelationalDatabase",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RebootRelationalDatabaseRequest",
}) as any as S.Schema<RebootRelationalDatabaseRequest>;
export interface RebootRelationalDatabaseResult {
  operations?: Operation[];
}
export const RebootRelationalDatabaseResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "RebootRelationalDatabaseResult",
}) as any as S.Schema<RebootRelationalDatabaseResult>;
export type ContainerLabel = string;
export interface RegisterContainerImageRequest {
  serviceName: string;
  label: string;
  digest: string;
}
export const RegisterContainerImageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceName: S.String.pipe(T.HttpLabel("serviceName")),
    label: S.String,
    digest: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/container-services/{serviceName}/images",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterContainerImageRequest",
}) as any as S.Schema<RegisterContainerImageRequest>;
export interface RegisterContainerImageResult {
  containerImage?: ContainerImage;
}
export const RegisterContainerImageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ containerImage: S.optional(ContainerImage) }),
).annotate({
  identifier: "RegisterContainerImageResult",
}) as any as S.Schema<RegisterContainerImageResult>;
export interface ReleaseStaticIpRequest {
  staticIpName: string;
}
export const ReleaseStaticIpRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ staticIpName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/ReleaseStaticIp" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ReleaseStaticIpRequest",
}) as any as S.Schema<ReleaseStaticIpRequest>;
export interface ReleaseStaticIpResult {
  operations?: Operation[];
}
export const ReleaseStaticIpResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "ReleaseStaticIpResult",
}) as any as S.Schema<ReleaseStaticIpResult>;
export interface ResetDistributionCacheRequest {
  distributionName?: string;
}
export const ResetDistributionCacheRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ distributionName: S.optional(S.String) }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/ResetDistributionCache",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ResetDistributionCacheRequest",
}) as any as S.Schema<ResetDistributionCacheRequest>;
export interface ResetDistributionCacheResult {
  status?: string;
  createTime?: Date;
  operation?: Operation;
}
export const ResetDistributionCacheResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(S.String),
    createTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    operation: S.optional(Operation),
  }),
).annotate({
  identifier: "ResetDistributionCacheResult",
}) as any as S.Schema<ResetDistributionCacheResult>;
export type ContactMethodVerificationProtocol = "Email" | (string & {});
export const ContactMethodVerificationProtocol = /*@__PURE__*/ S.String;

export interface SendContactMethodVerificationRequest {
  protocol: ContactMethodVerificationProtocol;
}
export const SendContactMethodVerificationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ protocol: ContactMethodVerificationProtocol }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/SendContactMethodVerification",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "SendContactMethodVerificationRequest",
}) as any as S.Schema<SendContactMethodVerificationRequest>;
export interface SendContactMethodVerificationResult {
  operations?: Operation[];
}
export const SendContactMethodVerificationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "SendContactMethodVerificationResult",
}) as any as S.Schema<SendContactMethodVerificationResult>;
export interface SetIpAddressTypeRequest {
  resourceType: ResourceType;
  resourceName: string;
  ipAddressType: IpAddressType;
  acceptBundleUpdate?: boolean;
}
export const SetIpAddressTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceType: ResourceType,
    resourceName: S.String,
    ipAddressType: IpAddressType,
    acceptBundleUpdate: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/SetIpAddressType" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SetIpAddressTypeRequest",
}) as any as S.Schema<SetIpAddressTypeRequest>;
export interface SetIpAddressTypeResult {
  operations?: Operation[];
}
export const SetIpAddressTypeResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "SetIpAddressTypeResult",
}) as any as S.Schema<SetIpAddressTypeResult>;
export type ResourceBucketAccess = "allow" | "deny" | (string & {});
export const ResourceBucketAccess = /*@__PURE__*/ S.String;

export interface SetResourceAccessForBucketRequest {
  resourceName: string;
  bucketName: string;
  access: ResourceBucketAccess;
}
export const SetResourceAccessForBucketRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceName: S.String,
    bucketName: S.String,
    access: ResourceBucketAccess,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/SetResourceAccessForBucket",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SetResourceAccessForBucketRequest",
}) as any as S.Schema<SetResourceAccessForBucketRequest>;
export interface SetResourceAccessForBucketResult {
  operations?: Operation[];
}
export const SetResourceAccessForBucketResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "SetResourceAccessForBucketResult",
}) as any as S.Schema<SetResourceAccessForBucketResult>;
export type EmailAddress = string | redacted.Redacted<string>;
export interface SetupInstanceHttpsRequest {
  instanceName: string;
  emailAddress: string | redacted.Redacted<string>;
  domainNames: string[];
  certificateProvider: CertificateProvider;
}
export const SetupInstanceHttpsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceName: S.String,
    emailAddress: SensitiveString,
    domainNames: SetupDomainNameList,
    certificateProvider: CertificateProvider,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/setup-instance-https",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SetupInstanceHttpsRequest",
}) as any as S.Schema<SetupInstanceHttpsRequest>;
export interface SetupInstanceHttpsResult {
  operations?: Operation[];
}
export const SetupInstanceHttpsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "SetupInstanceHttpsResult",
}) as any as S.Schema<SetupInstanceHttpsResult>;
export interface StartGUISessionRequest {
  resourceName: string;
}
export const StartGUISessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/start-gui-session" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartGUISessionRequest",
}) as any as S.Schema<StartGUISessionRequest>;
export interface StartGUISessionResult {
  operations?: Operation[];
}
export const StartGUISessionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "StartGUISessionResult",
}) as any as S.Schema<StartGUISessionResult>;
export interface StartInstanceRequest {
  instanceName: string;
}
export const StartInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instanceName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/StartInstance" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartInstanceRequest",
}) as any as S.Schema<StartInstanceRequest>;
export interface StartInstanceResult {
  operations?: Operation[];
}
export const StartInstanceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "StartInstanceResult",
}) as any as S.Schema<StartInstanceResult>;
export interface StartRelationalDatabaseRequest {
  relationalDatabaseName: string;
}
export const StartRelationalDatabaseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ relationalDatabaseName: S.String }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/StartRelationalDatabase",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartRelationalDatabaseRequest",
}) as any as S.Schema<StartRelationalDatabaseRequest>;
export interface StartRelationalDatabaseResult {
  operations?: Operation[];
}
export const StartRelationalDatabaseResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "StartRelationalDatabaseResult",
}) as any as S.Schema<StartRelationalDatabaseResult>;
export interface StopGUISessionRequest {
  resourceName: string;
}
export const StopGUISessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/stop-gui-session" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopGUISessionRequest",
}) as any as S.Schema<StopGUISessionRequest>;
export interface StopGUISessionResult {
  operations?: Operation[];
}
export const StopGUISessionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "StopGUISessionResult",
}) as any as S.Schema<StopGUISessionResult>;
export interface StopInstanceRequest {
  instanceName: string;
  force?: boolean;
}
export const StopInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instanceName: S.String, force: S.optional(S.Boolean) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/StopInstance" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopInstanceRequest",
}) as any as S.Schema<StopInstanceRequest>;
export interface StopInstanceResult {
  operations?: Operation[];
}
export const StopInstanceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "StopInstanceResult",
}) as any as S.Schema<StopInstanceResult>;
export interface StopRelationalDatabaseRequest {
  relationalDatabaseName: string;
  relationalDatabaseSnapshotName?: string;
}
export const StopRelationalDatabaseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    relationalDatabaseName: S.String,
    relationalDatabaseSnapshotName: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/StopRelationalDatabase",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopRelationalDatabaseRequest",
}) as any as S.Schema<StopRelationalDatabaseRequest>;
export interface StopRelationalDatabaseResult {
  operations?: Operation[];
}
export const StopRelationalDatabaseResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "StopRelationalDatabaseResult",
}) as any as S.Schema<StopRelationalDatabaseResult>;
export interface TagResourceRequest {
  resourceName: string;
  resourceArn?: string;
  tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceName: S.String,
    resourceArn: S.optional(S.String),
    tags: TagList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/TagResource" }),
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
export interface TagResourceResult {
  operations?: Operation[];
}
export const TagResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "TagResourceResult",
}) as any as S.Schema<TagResourceResult>;
export interface TestAlarmRequest {
  alarmName: string;
  state: AlarmState;
}
export const TestAlarmRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    alarmName: S.String.pipe(T.HttpLabel("alarmName")),
    state: AlarmState.pipe(T.HttpQuery("state")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/ls/api/2016-11-28/TestAlarm/{alarmName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TestAlarmRequest",
}) as any as S.Schema<TestAlarmRequest>;
export interface TestAlarmResult {
  operations?: Operation[];
}
export const TestAlarmResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "TestAlarmResult",
}) as any as S.Schema<TestAlarmResult>;
export interface UnpeerVpcRequest {}
export const UnpeerVpcRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/UnpeerVpc" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UnpeerVpcRequest",
}) as any as S.Schema<UnpeerVpcRequest>;
export interface UnpeerVpcResult {
  operation?: Operation;
}
export const UnpeerVpcResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operation: S.optional(Operation) }),
).annotate({
  identifier: "UnpeerVpcResult",
}) as any as S.Schema<UnpeerVpcResult>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resourceName: string;
  resourceArn?: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceName: S.String,
    resourceArn: S.optional(S.String),
    tagKeys: TagKeyList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/UntagResource" }),
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
export interface UntagResourceResult {
  operations?: Operation[];
}
export const UntagResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "UntagResourceResult",
}) as any as S.Schema<UntagResourceResult>;
export interface UpdateBucketRequest {
  bucketName: string;
  accessRules?: AccessRules;
  versioning?: string;
  readonlyAccessAccounts?: string[];
  accessLogConfig?: BucketAccessLogConfig;
  cors?: BucketCorsConfig;
}
export const UpdateBucketRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucketName: S.String,
    accessRules: S.optional(AccessRules),
    versioning: S.optional(S.String),
    readonlyAccessAccounts: S.optional(PartnerIdList),
    accessLogConfig: S.optional(BucketAccessLogConfig),
    cors: S.optional(BucketCorsConfig),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/UpdateBucket" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateBucketRequest",
}) as any as S.Schema<UpdateBucketRequest>;
export interface UpdateBucketResult {
  bucket?: Bucket;
  operations?: Operation[];
}
export const UpdateBucketResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucket: S.optional(Bucket),
    operations: S.optional(OperationList),
  }),
).annotate({
  identifier: "UpdateBucketResult",
}) as any as S.Schema<UpdateBucketResult>;
export interface UpdateBucketBundleRequest {
  bucketName: string;
  bundleId: string;
}
export const UpdateBucketBundleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucketName: S.String, bundleId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/UpdateBucketBundle" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateBucketBundleRequest",
}) as any as S.Schema<UpdateBucketBundleRequest>;
export interface UpdateBucketBundleResult {
  operations?: Operation[];
}
export const UpdateBucketBundleResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "UpdateBucketBundleResult",
}) as any as S.Schema<UpdateBucketBundleResult>;
export interface UpdateContainerServiceRequest {
  serviceName: string;
  power?: ContainerServicePowerName;
  scale?: number;
  isDisabled?: boolean;
  publicDomainNames?: { [key: string]: string[] | undefined };
  privateRegistryAccess?: PrivateRegistryAccessRequest;
}
export const UpdateContainerServiceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceName: S.String.pipe(T.HttpLabel("serviceName")),
    power: S.optional(ContainerServicePowerName),
    scale: S.optional(S.Number),
    isDisabled: S.optional(S.Boolean),
    publicDomainNames: S.optional(ContainerServicePublicDomains),
    privateRegistryAccess: S.optional(PrivateRegistryAccessRequest),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/ls/api/2016-11-28/container-services/{serviceName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateContainerServiceRequest",
}) as any as S.Schema<UpdateContainerServiceRequest>;
export interface UpdateContainerServiceResult {
  containerService?: ContainerService;
}
export const UpdateContainerServiceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ containerService: S.optional(ContainerService) }),
).annotate({
  identifier: "UpdateContainerServiceResult",
}) as any as S.Schema<UpdateContainerServiceResult>;
export interface UpdateDistributionRequest {
  distributionName: string;
  origin?: InputOrigin;
  defaultCacheBehavior?: CacheBehavior;
  cacheBehaviorSettings?: CacheSettings;
  cacheBehaviors?: CacheBehaviorPerPath[];
  isEnabled?: boolean;
  viewerMinimumTlsProtocolVersion?: ViewerMinimumTlsProtocolVersionEnum;
  certificateName?: string;
  useDefaultCertificate?: boolean;
}
export const UpdateDistributionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    distributionName: S.String,
    origin: S.optional(InputOrigin),
    defaultCacheBehavior: S.optional(CacheBehavior),
    cacheBehaviorSettings: S.optional(CacheSettings),
    cacheBehaviors: S.optional(CacheBehaviorList),
    isEnabled: S.optional(S.Boolean),
    viewerMinimumTlsProtocolVersion: S.optional(
      ViewerMinimumTlsProtocolVersionEnum,
    ),
    certificateName: S.optional(S.String),
    useDefaultCertificate: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/UpdateDistribution" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDistributionRequest",
}) as any as S.Schema<UpdateDistributionRequest>;
export interface UpdateDistributionResult {
  operation?: Operation;
}
export const UpdateDistributionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operation: S.optional(Operation) }),
).annotate({
  identifier: "UpdateDistributionResult",
}) as any as S.Schema<UpdateDistributionResult>;
export interface UpdateDistributionBundleRequest {
  distributionName?: string;
  bundleId?: string;
}
export const UpdateDistributionBundleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    distributionName: S.optional(S.String),
    bundleId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/UpdateDistributionBundle",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDistributionBundleRequest",
}) as any as S.Schema<UpdateDistributionBundleRequest>;
export interface UpdateDistributionBundleResult {
  operation?: Operation;
}
export const UpdateDistributionBundleResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operation: S.optional(Operation) }),
).annotate({
  identifier: "UpdateDistributionBundleResult",
}) as any as S.Schema<UpdateDistributionBundleResult>;
export interface UpdateDomainEntryRequest {
  domainName: string;
  domainEntry: DomainEntry;
}
export const UpdateDomainEntryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainName: S.String, domainEntry: DomainEntry }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ls/api/2016-11-28/UpdateDomainEntry" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDomainEntryRequest",
}) as any as S.Schema<UpdateDomainEntryRequest>;
export interface UpdateDomainEntryResult {
  operations?: Operation[];
}
export const UpdateDomainEntryResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "UpdateDomainEntryResult",
}) as any as S.Schema<UpdateDomainEntryResult>;
export interface UpdateInstanceMetadataOptionsRequest {
  instanceName: string;
  httpTokens?: HttpTokens;
  httpEndpoint?: HttpEndpoint;
  httpPutResponseHopLimit?: number;
  httpProtocolIpv6?: HttpProtocolIpv6;
}
export const UpdateInstanceMetadataOptionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      instanceName: S.String,
      httpTokens: S.optional(HttpTokens),
      httpEndpoint: S.optional(HttpEndpoint),
      httpPutResponseHopLimit: S.optional(S.Number),
      httpProtocolIpv6: S.optional(HttpProtocolIpv6),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/UpdateInstanceMetadataOptions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateInstanceMetadataOptionsRequest",
}) as any as S.Schema<UpdateInstanceMetadataOptionsRequest>;
export interface UpdateInstanceMetadataOptionsResult {
  operation?: Operation;
}
export const UpdateInstanceMetadataOptionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operation: S.optional(Operation) }),
).annotate({
  identifier: "UpdateInstanceMetadataOptionsResult",
}) as any as S.Schema<UpdateInstanceMetadataOptionsResult>;
export interface UpdateLoadBalancerAttributeRequest {
  loadBalancerName: string;
  attributeName: LoadBalancerAttributeName;
  attributeValue: string;
}
export const UpdateLoadBalancerAttributeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    loadBalancerName: S.String,
    attributeName: LoadBalancerAttributeName,
    attributeValue: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/UpdateLoadBalancerAttribute",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateLoadBalancerAttributeRequest",
}) as any as S.Schema<UpdateLoadBalancerAttributeRequest>;
export interface UpdateLoadBalancerAttributeResult {
  operations?: Operation[];
}
export const UpdateLoadBalancerAttributeResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "UpdateLoadBalancerAttributeResult",
}) as any as S.Schema<UpdateLoadBalancerAttributeResult>;
export interface UpdateRelationalDatabaseRequest {
  relationalDatabaseName: string;
  masterUserPassword?: string | redacted.Redacted<string>;
  rotateMasterUserPassword?: boolean;
  preferredBackupWindow?: string;
  preferredMaintenanceWindow?: string;
  enableBackupRetention?: boolean;
  disableBackupRetention?: boolean;
  publiclyAccessible?: boolean;
  applyImmediately?: boolean;
  caCertificateIdentifier?: string;
  relationalDatabaseBlueprintId?: string;
}
export const UpdateRelationalDatabaseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    relationalDatabaseName: S.String,
    masterUserPassword: S.optional(SensitiveString),
    rotateMasterUserPassword: S.optional(S.Boolean),
    preferredBackupWindow: S.optional(S.String),
    preferredMaintenanceWindow: S.optional(S.String),
    enableBackupRetention: S.optional(S.Boolean),
    disableBackupRetention: S.optional(S.Boolean),
    publiclyAccessible: S.optional(S.Boolean),
    applyImmediately: S.optional(S.Boolean),
    caCertificateIdentifier: S.optional(S.String),
    relationalDatabaseBlueprintId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ls/api/2016-11-28/UpdateRelationalDatabase",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRelationalDatabaseRequest",
}) as any as S.Schema<UpdateRelationalDatabaseRequest>;
export interface UpdateRelationalDatabaseResult {
  operations?: Operation[];
}
export const UpdateRelationalDatabaseResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "UpdateRelationalDatabaseResult",
}) as any as S.Schema<UpdateRelationalDatabaseResult>;
export interface UpdateRelationalDatabaseParametersRequest {
  relationalDatabaseName: string;
  parameters: RelationalDatabaseParameter[];
}
export const UpdateRelationalDatabaseParametersRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      relationalDatabaseName: S.String,
      parameters: RelationalDatabaseParameterList,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ls/api/2016-11-28/UpdateRelationalDatabaseParameters",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateRelationalDatabaseParametersRequest",
  }) as any as S.Schema<UpdateRelationalDatabaseParametersRequest>;
export interface UpdateRelationalDatabaseParametersResult {
  operations?: Operation[];
}
export const UpdateRelationalDatabaseParametersResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ operations: S.optional(OperationList) }),
).annotate({
  identifier: "UpdateRelationalDatabaseParametersResult",
}) as any as S.Schema<UpdateRelationalDatabaseParametersResult>;
export type AllocateStaticIpError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Allocates a static IP address.
 */
export const allocateStaticIp: API.OperationMethod<
  AllocateStaticIpRequest,
  AllocateStaticIpResult,
  AllocateStaticIpError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AllocateStaticIpRequest,
  output: AllocateStaticIpResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AllocateStaticIp",
}));

export type AttachCertificateToDistributionError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Attaches an SSL/TLS certificate to your Amazon Lightsail content delivery network (CDN)
 * distribution.
 *
 * After the certificate is attached, your distribution accepts HTTPS traffic for all of the
 * domains that are associated with the certificate.
 *
 * Use the `CreateCertificate` action to create a certificate that you can attach
 * to your distribution.
 *
 * Only certificates created in the `us-east-1`
 * Amazon Web Services Region can be attached to Lightsail distributions. Lightsail
 * distributions are global resources that can reference an origin in any Amazon Web Services
 * Region, and distribute its content globally. However, all distributions are located in the
 * `us-east-1` Region.
 */
export const attachCertificateToDistribution: API.OperationMethod<
  AttachCertificateToDistributionRequest,
  AttachCertificateToDistributionResult,
  AttachCertificateToDistributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AttachCertificateToDistributionRequest,
  output: AttachCertificateToDistributionResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachCertificateToDistribution",
}));

export type AttachDiskError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Attaches a block storage disk to a running or stopped Lightsail instance and exposes it
 * to the instance with the specified disk name.
 *
 * The `attach disk` operation supports tag-based access control via resource tags
 * applied to the resource identified by `disk name`. For more information, see the
 * Amazon Lightsail Developer Guide.
 */
export const attachDisk: API.OperationMethod<
  AttachDiskRequest,
  AttachDiskResult,
  AttachDiskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AttachDiskRequest,
  output: AttachDiskResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachDisk",
}));

export type AttachInstancesToLoadBalancerError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Attaches one or more Lightsail instances to a load balancer.
 *
 * After some time, the instances are attached to the load balancer and the health check
 * status is available.
 *
 * The `attach instances to load balancer` operation supports tag-based access
 * control via resource tags applied to the resource identified by load balancer
 * name. For more information, see the Lightsail Developer Guide.
 */
export const attachInstancesToLoadBalancer: API.OperationMethod<
  AttachInstancesToLoadBalancerRequest,
  AttachInstancesToLoadBalancerResult,
  AttachInstancesToLoadBalancerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AttachInstancesToLoadBalancerRequest,
  output: AttachInstancesToLoadBalancerResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachInstancesToLoadBalancer",
}));

export type AttachLoadBalancerTlsCertificateError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Attaches a Transport Layer Security (TLS) certificate to your load balancer. TLS is just
 * an updated, more secure version of Secure Socket Layer (SSL).
 *
 * Once you create and validate your certificate, you can attach it to your load balancer.
 * You can also use this API to rotate the certificates on your account. Use the
 * `AttachLoadBalancerTlsCertificate` action with the non-attached certificate, and
 * it will replace the existing one and become the attached certificate.
 *
 * The `AttachLoadBalancerTlsCertificate` operation supports tag-based access
 * control via resource tags applied to the resource identified by load balancer
 * name. For more information, see the Amazon Lightsail Developer Guide.
 */
export const attachLoadBalancerTlsCertificate: API.OperationMethod<
  AttachLoadBalancerTlsCertificateRequest,
  AttachLoadBalancerTlsCertificateResult,
  AttachLoadBalancerTlsCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AttachLoadBalancerTlsCertificateRequest,
  output: AttachLoadBalancerTlsCertificateResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachLoadBalancerTlsCertificate",
}));

export type AttachStaticIpError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Attaches a static IP address to a specific Amazon Lightsail instance.
 */
export const attachStaticIp: API.OperationMethod<
  AttachStaticIpRequest,
  AttachStaticIpResult,
  AttachStaticIpError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AttachStaticIpRequest,
  output: AttachStaticIpResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachStaticIp",
}));

export type CloseInstancePublicPortsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Closes ports for a specific Amazon Lightsail instance.
 *
 * The `CloseInstancePublicPorts` action supports tag-based access control via
 * resource tags applied to the resource identified by `instanceName`. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const closeInstancePublicPorts: API.OperationMethod<
  CloseInstancePublicPortsRequest,
  CloseInstancePublicPortsResult,
  CloseInstancePublicPortsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CloseInstancePublicPortsRequest,
  output: CloseInstancePublicPortsResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CloseInstancePublicPorts",
}));

export type CopySnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Copies a manual snapshot of an instance or disk as another manual snapshot, or copies an
 * automatic snapshot of an instance or disk as a manual snapshot. This operation can also be
 * used to copy a manual or automatic snapshot of an instance or a disk from one Amazon Web Services Region to another in Amazon Lightsail.
 *
 * When copying a *manual snapshot*, be sure to define the source
 * region, `source snapshot name`, and `target snapshot name`
 * parameters.
 *
 * When copying an *automatic snapshot*, be sure to define the
 * `source region`, `source resource name`, target snapshot
 * name, and either the `restore date` or the use latest restorable
 * auto snapshot parameters.
 */
export const copySnapshot: API.OperationMethod<
  CopySnapshotRequest,
  CopySnapshotResult,
  CopySnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CopySnapshotRequest,
  output: CopySnapshotResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopySnapshot",
}));

export type CreateBucketError =
  | AccessDeniedException
  | InvalidInputException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates an Amazon Lightsail bucket.
 *
 * A bucket is a cloud storage resource available in the Lightsail object storage service.
 * Use buckets to store objects such as data and its descriptive metadata. For more information
 * about buckets, see Buckets in Amazon Lightsail in the Amazon Lightsail Developer
 * Guide.
 */
export const createBucket: API.OperationMethod<
  CreateBucketRequest,
  CreateBucketResult,
  CreateBucketError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBucketRequest,
  output: CreateBucketResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBucket",
}));

export type CreateBucketAccessKeyError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates a new access key for the specified Amazon Lightsail bucket. Access keys consist of
 * an access key ID and corresponding secret access key.
 *
 * Access keys grant full programmatic access to the specified bucket and its objects. You
 * can have a maximum of two access keys per bucket. Use the GetBucketAccessKeys action to get a list of current access keys for a specific bucket. For more
 * information about access keys, see Creating access keys for a bucket in Amazon Lightsail in the
 * *Amazon Lightsail Developer Guide*.
 *
 * The `secretAccessKey` value is returned only in response to the
 * `CreateBucketAccessKey` action. You can get a secret access key only when you
 * first create an access key; you cannot get the secret access key later. If you lose the
 * secret access key, you must create a new access key.
 */
export const createBucketAccessKey: API.OperationMethod<
  CreateBucketAccessKeyRequest,
  CreateBucketAccessKeyResult,
  CreateBucketAccessKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBucketAccessKeyRequest,
  output: CreateBucketAccessKeyResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBucketAccessKey",
}));

export type CreateCertificateError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates an SSL/TLS certificate for an Amazon Lightsail content delivery network (CDN)
 * distribution and a container service.
 *
 * After the certificate is valid, use the `AttachCertificateToDistribution`
 * action to use the certificate and its domains with your distribution. Or use the
 * `UpdateContainerService` action to use the certificate and its domains with your
 * container service.
 *
 * Only certificates created in the `us-east-1`
 * Amazon Web Services Region can be attached to Lightsail distributions. Lightsail
 * distributions are global resources that can reference an origin in any Amazon Web Services
 * Region, and distribute its content globally. However, all distributions are located in the
 * `us-east-1` Region.
 */
export const createCertificate: API.OperationMethod<
  CreateCertificateRequest,
  CreateCertificateResult,
  CreateCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCertificateRequest,
  output: CreateCertificateResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCertificate",
}));

export type CreateCloudFormationStackError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates an AWS CloudFormation stack, which creates a new Amazon EC2 instance from an exported
 * Amazon Lightsail snapshot. This operation results in a CloudFormation stack record that can be
 * used to track the AWS CloudFormation stack created. Use the get cloud formation stack
 * records operation to get a list of the CloudFormation stacks created.
 *
 * Wait until after your new Amazon EC2 instance is created before running the create
 * cloud formation stack operation again with the same export snapshot record.
 */
export const createCloudFormationStack: API.OperationMethod<
  CreateCloudFormationStackRequest,
  CreateCloudFormationStackResult,
  CreateCloudFormationStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCloudFormationStackRequest,
  output: CreateCloudFormationStackResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCloudFormationStack",
}));

export type CreateContactMethodError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates an email or SMS text message contact method.
 *
 * A contact method is used to send you notifications about your Amazon Lightsail resources.
 * You can add one email address and one mobile phone number contact method in each Amazon Web Services Region. However, SMS text messaging is not supported in some Amazon Web Services
 * Regions, and SMS text messages cannot be sent to some countries/regions. For more information,
 * see Notifications in Amazon Lightsail.
 *
 * The `create contact method` operation supports tag-based access control via request
 * tags. For more information, see the Lightsail Developer Guide.
 */
export const createContactMethod: API.OperationMethod<
  CreateContactMethodRequest,
  CreateContactMethodResult,
  CreateContactMethodError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateContactMethodRequest,
  output: CreateContactMethodResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContactMethod",
}));

export type CreateContainerServiceError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates an Amazon Lightsail container service.
 *
 * A Lightsail container service is a compute resource to which you can deploy containers.
 * For more information, see Container services in Amazon Lightsail in the Lightsail Dev
 * Guide.
 */
export const createContainerService: API.OperationMethod<
  CreateContainerServiceRequest,
  CreateContainerServiceResult,
  CreateContainerServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateContainerServiceRequest,
  output: CreateContainerServiceResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContainerService",
}));

export type CreateContainerServiceDeploymentError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates a deployment for your Amazon Lightsail container service.
 *
 * A deployment specifies the containers that will be launched on the container service and
 * their settings, such as the ports to open, the environment variables to apply, and the launch
 * command to run. It also specifies the container that will serve as the public endpoint of the
 * deployment and its settings, such as the HTTP or HTTPS port to use, and the health check
 * configuration.
 *
 * You can deploy containers to your container service using container images from a public
 * registry such as Amazon ECR Public, or from your local machine. For more information, see
 * Creating container images for your Amazon Lightsail container services in the
 * *Amazon Lightsail Developer Guide*.
 */
export const createContainerServiceDeployment: API.OperationMethod<
  CreateContainerServiceDeploymentRequest,
  CreateContainerServiceDeploymentResult,
  CreateContainerServiceDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateContainerServiceDeploymentRequest,
  output: CreateContainerServiceDeploymentResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContainerServiceDeployment",
}));

export type CreateContainerServiceRegistryLoginError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates a temporary set of log in credentials that you can use to log in to the Docker
 * process on your local machine. After you're logged in, you can use the native Docker commands
 * to push your local container images to the container image registry of your Amazon Lightsail
 * account so that you can use them with your Lightsail container service. The log in
 * credentials expire 12 hours after they are created, at which point you will need to create a
 * new set of log in credentials.
 *
 * You can only push container images to the container service registry of your Lightsail
 * account. You cannot pull container images or perform any other container image management
 * actions on the container service registry.
 *
 * After you push your container images to the container image registry of your Lightsail
 * account, use the `RegisterContainerImage` action to register the pushed images to a
 * specific Lightsail container service.
 *
 * This action is not required if you install and use the Lightsail Control
 * (lightsailctl) plugin to push container images to your Lightsail container service. For
 * more information, see Pushing and managing container images on your Amazon Lightsail container services
 * in the *Amazon Lightsail Developer Guide*.
 */
export const createContainerServiceRegistryLogin: API.OperationMethod<
  CreateContainerServiceRegistryLoginRequest,
  CreateContainerServiceRegistryLoginResult,
  CreateContainerServiceRegistryLoginError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateContainerServiceRegistryLoginRequest,
  output: CreateContainerServiceRegistryLoginResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContainerServiceRegistryLogin",
}));

export type CreateDiskError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates a block storage disk that can be attached to an Amazon Lightsail instance in the
 * same Availability Zone (`us-east-2a`).
 *
 * The `create disk` operation supports tag-based access control via request tags.
 * For more information, see the Amazon Lightsail Developer Guide.
 */
export const createDisk: API.OperationMethod<
  CreateDiskRequest,
  CreateDiskResult,
  CreateDiskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDiskRequest,
  output: CreateDiskResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDisk",
}));

export type CreateDiskFromSnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates a block storage disk from a manual or automatic snapshot of a disk. The resulting
 * disk can be attached to an Amazon Lightsail instance in the same Availability Zone
 * (`us-east-2a`).
 *
 * The `create disk from snapshot` operation supports tag-based access control via
 * request tags and resource tags applied to the resource identified by disk snapshot
 * name. For more information, see the Amazon Lightsail Developer Guide.
 */
export const createDiskFromSnapshot: API.OperationMethod<
  CreateDiskFromSnapshotRequest,
  CreateDiskFromSnapshotResult,
  CreateDiskFromSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDiskFromSnapshotRequest,
  output: CreateDiskFromSnapshotResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDiskFromSnapshot",
}));

export type CreateDiskSnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates a snapshot of a block storage disk. You can use snapshots for backups, to make
 * copies of disks, and to save data before shutting down a Lightsail instance.
 *
 * You can take a snapshot of an attached disk that is in use; however, snapshots only
 * capture data that has been written to your disk at the time the snapshot command is issued.
 * This may exclude any data that has been cached by any applications or the operating system. If
 * you can pause any file systems on the disk long enough to take a snapshot, your snapshot
 * should be complete. Nevertheless, if you cannot pause all file writes to the disk, you should
 * unmount the disk from within the Lightsail instance, issue the create disk snapshot command,
 * and then remount the disk to ensure a consistent and complete snapshot. You may remount and
 * use your disk while the snapshot status is pending.
 *
 * You can also use this operation to create a snapshot of an instance's system volume. You
 * might want to do this, for example, to recover data from the system volume of a botched
 * instance or to create a backup of the system volume like you would for a block storage disk.
 * To create a snapshot of a system volume, just define the `instance name` parameter
 * when issuing the snapshot command, and a snapshot of the defined instance's system volume will
 * be created. After the snapshot is available, you can create a block storage disk from the
 * snapshot and attach it to a running instance to access the data on the disk.
 *
 * The `create disk snapshot` operation supports tag-based access control via
 * request tags. For more information, see the Amazon Lightsail Developer Guide.
 */
export const createDiskSnapshot: API.OperationMethod<
  CreateDiskSnapshotRequest,
  CreateDiskSnapshotResult,
  CreateDiskSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDiskSnapshotRequest,
  output: CreateDiskSnapshotResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDiskSnapshot",
}));

export type CreateDistributionError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates an Amazon Lightsail content delivery network (CDN) distribution.
 *
 * A distribution is a globally distributed network of caching servers that improve the
 * performance of your website or web application hosted on a Lightsail instance. For more
 * information, see Content delivery networks in Amazon Lightsail.
 */
export const createDistribution: API.OperationMethod<
  CreateDistributionRequest,
  CreateDistributionResult,
  CreateDistributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDistributionRequest,
  output: CreateDistributionResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDistribution",
}));

export type CreateDomainError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates a domain resource for the specified domain (example.com).
 *
 * The `create domain` operation supports tag-based access control via request
 * tags. For more information, see the Amazon Lightsail Developer Guide.
 */
export const createDomain: API.OperationMethod<
  CreateDomainRequest,
  CreateDomainResult,
  CreateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDomainRequest,
  output: CreateDomainResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomain",
}));

export type CreateDomainEntryError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates one of the following domain name system (DNS) records in a domain DNS zone:
 * Address (A), canonical name (CNAME), mail exchanger (MX), name server (NS), start of authority
 * (SOA), service locator (SRV), or text (TXT).
 *
 * The `create domain entry` operation supports tag-based access control via
 * resource tags applied to the resource identified by `domain name`. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const createDomainEntry: API.OperationMethod<
  CreateDomainEntryRequest,
  CreateDomainEntryResult,
  CreateDomainEntryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDomainEntryRequest,
  output: CreateDomainEntryResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomainEntry",
}));

export type CreateGUISessionAccessDetailsError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates two URLs that are used to access a virtual computer’s graphical user interface
 * (GUI) session. The primary URL initiates a web-based Amazon DCV session to the virtual
 * computer's application. The secondary URL initiates a web-based Amazon DCV session to the
 * virtual computer's operating session.
 *
 * Use `StartGUISession` to open the session.
 */
export const createGUISessionAccessDetails: API.OperationMethod<
  CreateGUISessionAccessDetailsRequest,
  CreateGUISessionAccessDetailsResult,
  CreateGUISessionAccessDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGUISessionAccessDetailsRequest,
  output: CreateGUISessionAccessDetailsResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGUISessionAccessDetails",
}));

export type CreateInstancesError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates one or more Amazon Lightsail instances.
 *
 * The `create instances` operation supports tag-based access control via request
 * tags. For more information, see the Lightsail Developer Guide.
 */
export const createInstances: API.OperationMethod<
  CreateInstancesRequest,
  CreateInstancesResult,
  CreateInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateInstancesRequest,
  output: CreateInstancesResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInstances",
}));

export type CreateInstancesFromSnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates one or more new instances from a manual or automatic snapshot of an
 * instance.
 *
 * The `create instances from snapshot` operation supports tag-based access
 * control via request tags and resource tags applied to the resource identified by
 * `instance snapshot name`. For more information, see the Amazon Lightsail Developer Guide.
 */
export const createInstancesFromSnapshot: API.OperationMethod<
  CreateInstancesFromSnapshotRequest,
  CreateInstancesFromSnapshotResult,
  CreateInstancesFromSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateInstancesFromSnapshotRequest,
  output: CreateInstancesFromSnapshotResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInstancesFromSnapshot",
}));

export type CreateInstanceSnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates a snapshot of a specific virtual private server, or *instance*.
 * You can use a snapshot to create a new instance that is based on that snapshot.
 *
 * The `create instance snapshot` operation supports tag-based access control via
 * request tags. For more information, see the Amazon Lightsail Developer Guide.
 */
export const createInstanceSnapshot: API.OperationMethod<
  CreateInstanceSnapshotRequest,
  CreateInstanceSnapshotResult,
  CreateInstanceSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateInstanceSnapshotRequest,
  output: CreateInstanceSnapshotResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInstanceSnapshot",
}));

export type CreateKeyPairError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates a custom SSH key pair that you can use with an Amazon Lightsail
 * instance.
 *
 * Use the DownloadDefaultKeyPair action to create a Lightsail default key
 * pair in an Amazon Web Services Region where a default key pair does not currently
 * exist.
 *
 * The `create key pair` operation supports tag-based access control via request
 * tags. For more information, see the Amazon Lightsail Developer Guide.
 */
export const createKeyPair: API.OperationMethod<
  CreateKeyPairRequest,
  CreateKeyPairResult,
  CreateKeyPairError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateKeyPairRequest,
  output: CreateKeyPairResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateKeyPair",
}));

export type CreateLoadBalancerError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates a Lightsail load balancer. To learn more about deciding whether to load balance
 * your application, see Configure your Lightsail instances for load balancing. You can create up to 10
 * load balancers per AWS Region in your account.
 *
 * When you create a load balancer, you can specify a unique name and port settings. To
 * change additional load balancer settings, use the `UpdateLoadBalancerAttribute`
 * operation.
 *
 * The `create load balancer` operation supports tag-based access control via
 * request tags. For more information, see the Amazon Lightsail Developer Guide.
 */
export const createLoadBalancer: API.OperationMethod<
  CreateLoadBalancerRequest,
  CreateLoadBalancerResult,
  CreateLoadBalancerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLoadBalancerRequest,
  output: CreateLoadBalancerResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLoadBalancer",
}));

export type CreateLoadBalancerTlsCertificateError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates an SSL/TLS certificate for an Amazon Lightsail load balancer.
 *
 * TLS is just an updated, more secure version of Secure Socket Layer (SSL).
 *
 * The `CreateLoadBalancerTlsCertificate` operation supports tag-based access
 * control via resource tags applied to the resource identified by load balancer
 * name. For more information, see the Amazon Lightsail Developer Guide.
 */
export const createLoadBalancerTlsCertificate: API.OperationMethod<
  CreateLoadBalancerTlsCertificateRequest,
  CreateLoadBalancerTlsCertificateResult,
  CreateLoadBalancerTlsCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLoadBalancerTlsCertificateRequest,
  output: CreateLoadBalancerTlsCertificateResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLoadBalancerTlsCertificate",
}));

export type CreateRelationalDatabaseError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates a new database in Amazon Lightsail.
 *
 * The `create relational database` operation supports tag-based access control
 * via request tags. For more information, see the Amazon Lightsail Developer Guide.
 */
export const createRelationalDatabase: API.OperationMethod<
  CreateRelationalDatabaseRequest,
  CreateRelationalDatabaseResult,
  CreateRelationalDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRelationalDatabaseRequest,
  output: CreateRelationalDatabaseResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRelationalDatabase",
}));

export type CreateRelationalDatabaseFromSnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates a new database from an existing database snapshot in Amazon Lightsail.
 *
 * You can create a new database from a snapshot in if something goes wrong with your
 * original database, or to change it to a different plan, such as a high availability or
 * standard plan.
 *
 * The `create relational database from snapshot` operation supports tag-based
 * access control via request tags and resource tags applied to the resource identified by
 * relationalDatabaseSnapshotName. For more information, see the Amazon Lightsail Developer Guide.
 */
export const createRelationalDatabaseFromSnapshot: API.OperationMethod<
  CreateRelationalDatabaseFromSnapshotRequest,
  CreateRelationalDatabaseFromSnapshotResult,
  CreateRelationalDatabaseFromSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRelationalDatabaseFromSnapshotRequest,
  output: CreateRelationalDatabaseFromSnapshotResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRelationalDatabaseFromSnapshot",
}));

export type CreateRelationalDatabaseSnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates a snapshot of your database in Amazon Lightsail. You can use snapshots for backups,
 * to make copies of a database, and to save data before deleting a database.
 *
 * The `create relational database snapshot` operation supports tag-based access
 * control via request tags. For more information, see the Amazon Lightsail Developer Guide.
 */
export const createRelationalDatabaseSnapshot: API.OperationMethod<
  CreateRelationalDatabaseSnapshotRequest,
  CreateRelationalDatabaseSnapshotResult,
  CreateRelationalDatabaseSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRelationalDatabaseSnapshotRequest,
  output: CreateRelationalDatabaseSnapshotResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRelationalDatabaseSnapshot",
}));

export type DeleteAlarmError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes an alarm.
 *
 * An alarm is used to monitor a single metric for one of your resources. When a metric
 * condition is met, the alarm can notify you by email, SMS text message, and a banner displayed
 * on the Amazon Lightsail console. For more information, see Alarms
 * in Amazon Lightsail.
 */
export const deleteAlarm: API.OperationMethod<
  DeleteAlarmRequest,
  DeleteAlarmResult,
  DeleteAlarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAlarmRequest,
  output: DeleteAlarmResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAlarm",
}));

export type DeleteAutoSnapshotError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes an automatic snapshot of an instance or disk. For more information, see the Amazon Lightsail Developer Guide.
 */
export const deleteAutoSnapshot: API.OperationMethod<
  DeleteAutoSnapshotRequest,
  DeleteAutoSnapshotResult,
  DeleteAutoSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAutoSnapshotRequest,
  output: DeleteAutoSnapshotResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAutoSnapshot",
}));

export type DeleteBucketError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes a Amazon Lightsail bucket.
 *
 * When you delete your bucket, the bucket name is released and can be reused for a new
 * bucket in your account or another Amazon Web Services account.
 */
export const deleteBucket: API.OperationMethod<
  DeleteBucketRequest,
  DeleteBucketResult,
  DeleteBucketError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBucketRequest,
  output: DeleteBucketResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucket",
}));

export type DeleteBucketAccessKeyError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes an access key for the specified Amazon Lightsail bucket.
 *
 * We recommend that you delete an access key if the secret access key is compromised.
 *
 * For more information about access keys, see Creating access keys for a bucket in Amazon Lightsail in the
 * *Amazon Lightsail Developer Guide*.
 */
export const deleteBucketAccessKey: API.OperationMethod<
  DeleteBucketAccessKeyRequest,
  DeleteBucketAccessKeyResult,
  DeleteBucketAccessKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBucketAccessKeyRequest,
  output: DeleteBucketAccessKeyResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketAccessKey",
}));

export type DeleteCertificateError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes an SSL/TLS certificate for your Amazon Lightsail content delivery network (CDN)
 * distribution.
 *
 * Certificates that are currently attached to a distribution cannot be deleted. Use the
 * `DetachCertificateFromDistribution` action to detach a certificate from a
 * distribution.
 */
export const deleteCertificate: API.OperationMethod<
  DeleteCertificateRequest,
  DeleteCertificateResult,
  DeleteCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCertificateRequest,
  output: DeleteCertificateResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCertificate",
}));

export type DeleteContactMethodError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes a contact method.
 *
 * A contact method is used to send you notifications about your Amazon Lightsail resources.
 * You can add one email address and one mobile phone number contact method in each Amazon Web Services Region. However, SMS text messaging is not supported in some Amazon Web Services
 * Regions, and SMS text messages cannot be sent to some countries/regions. For more information,
 * see Notifications in Amazon Lightsail.
 */
export const deleteContactMethod: API.OperationMethod<
  DeleteContactMethodRequest,
  DeleteContactMethodResult,
  DeleteContactMethodError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteContactMethodRequest,
  output: DeleteContactMethodResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContactMethod",
}));

export type DeleteContainerImageError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes a container image that is registered to your Amazon Lightsail container
 * service.
 */
export const deleteContainerImage: API.OperationMethod<
  DeleteContainerImageRequest,
  DeleteContainerImageResult,
  DeleteContainerImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteContainerImageRequest,
  output: DeleteContainerImageResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContainerImage",
}));

export type DeleteContainerServiceError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes your Amazon Lightsail container service.
 */
export const deleteContainerService: API.OperationMethod<
  DeleteContainerServiceRequest,
  DeleteContainerServiceResult,
  DeleteContainerServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteContainerServiceRequest,
  output: DeleteContainerServiceResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContainerService",
}));

export type DeleteDiskError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes the specified block storage disk. The disk must be in the `available`
 * state (not attached to a Lightsail instance).
 *
 * The disk may remain in the `deleting` state for several minutes.
 *
 * The `delete disk` operation supports tag-based access control via resource tags
 * applied to the resource identified by `disk name`. For more information, see the
 * Amazon Lightsail Developer Guide.
 */
export const deleteDisk: API.OperationMethod<
  DeleteDiskRequest,
  DeleteDiskResult,
  DeleteDiskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDiskRequest,
  output: DeleteDiskResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDisk",
}));

export type DeleteDiskSnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes the specified disk snapshot.
 *
 * When you make periodic snapshots of a disk, the snapshots are incremental, and only the
 * blocks on the device that have changed since your last snapshot are saved in the new snapshot.
 * When you delete a snapshot, only the data not needed for any other snapshot is removed. So
 * regardless of which prior snapshots have been deleted, all active snapshots will have access
 * to all the information needed to restore the disk.
 *
 * The `delete disk snapshot` operation supports tag-based access control via
 * resource tags applied to the resource identified by `disk snapshot name`. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const deleteDiskSnapshot: API.OperationMethod<
  DeleteDiskSnapshotRequest,
  DeleteDiskSnapshotResult,
  DeleteDiskSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDiskSnapshotRequest,
  output: DeleteDiskSnapshotResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDiskSnapshot",
}));

export type DeleteDistributionError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes your Amazon Lightsail content delivery network (CDN) distribution.
 */
export const deleteDistribution: API.OperationMethod<
  DeleteDistributionRequest,
  DeleteDistributionResult,
  DeleteDistributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDistributionRequest,
  output: DeleteDistributionResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDistribution",
}));

export type DeleteDomainError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes the specified domain recordset and all of its domain records.
 *
 * The `delete domain` operation supports tag-based access control via resource
 * tags applied to the resource identified by `domain name`. For more information, see
 * the Amazon Lightsail Developer Guide.
 */
export const deleteDomain: API.OperationMethod<
  DeleteDomainRequest,
  DeleteDomainResult,
  DeleteDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDomainRequest,
  output: DeleteDomainResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomain",
}));

export type DeleteDomainEntryError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes a specific domain entry.
 *
 * The `delete domain entry` operation supports tag-based access control via
 * resource tags applied to the resource identified by `domain name`. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const deleteDomainEntry: API.OperationMethod<
  DeleteDomainEntryRequest,
  DeleteDomainEntryResult,
  DeleteDomainEntryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDomainEntryRequest,
  output: DeleteDomainEntryResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomainEntry",
}));

export type DeleteInstanceError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes an Amazon Lightsail instance.
 *
 * The `delete instance` operation supports tag-based access control via resource
 * tags applied to the resource identified by `instance name`. For more information,
 * see the Amazon Lightsail Developer Guide.
 */
export const deleteInstance: API.OperationMethod<
  DeleteInstanceRequest,
  DeleteInstanceResult,
  DeleteInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteInstanceRequest,
  output: DeleteInstanceResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInstance",
}));

export type DeleteInstanceSnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes a specific snapshot of a virtual private server (or
 * *instance*).
 *
 * The `delete instance snapshot` operation supports tag-based access control via
 * resource tags applied to the resource identified by `instance snapshot name`. For
 * more information, see the Amazon Lightsail Developer Guide.
 */
export const deleteInstanceSnapshot: API.OperationMethod<
  DeleteInstanceSnapshotRequest,
  DeleteInstanceSnapshotResult,
  DeleteInstanceSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteInstanceSnapshotRequest,
  output: DeleteInstanceSnapshotResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInstanceSnapshot",
}));

export type DeleteKeyPairError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes the specified key pair by removing the public key from Amazon Lightsail.
 *
 * You can delete key pairs that were created using the ImportKeyPair and
 * CreateKeyPair actions, as well as the Lightsail default key pair. A new default
 * key pair will not be created unless you launch an instance without specifying a custom key
 * pair, or you call the DownloadDefaultKeyPair API.
 *
 * The `delete key pair` operation supports tag-based access control via resource
 * tags applied to the resource identified by `key pair name`. For more information,
 * see the Amazon Lightsail Developer Guide.
 */
export const deleteKeyPair: API.OperationMethod<
  DeleteKeyPairRequest,
  DeleteKeyPairResult,
  DeleteKeyPairError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteKeyPairRequest,
  output: DeleteKeyPairResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteKeyPair",
}));

export type DeleteKnownHostKeysError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes the known host key or certificate used by the Amazon Lightsail browser-based SSH or
 * RDP clients to authenticate an instance. This operation enables the Lightsail browser-based
 * SSH or RDP clients to connect to the instance after a host key mismatch.
 *
 * Perform this operation only if you were expecting the host key or certificate mismatch
 * or if you are familiar with the new host key or certificate on the instance. For more
 * information, see Troubleshooting connection issues when using the Amazon Lightsail browser-based SSH or RDP
 * client.
 */
export const deleteKnownHostKeys: API.OperationMethod<
  DeleteKnownHostKeysRequest,
  DeleteKnownHostKeysResult,
  DeleteKnownHostKeysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteKnownHostKeysRequest,
  output: DeleteKnownHostKeysResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteKnownHostKeys",
}));

export type DeleteLoadBalancerError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes a Lightsail load balancer and all its associated SSL/TLS certificates. Once the
 * load balancer is deleted, you will need to create a new load balancer, create a new
 * certificate, and verify domain ownership again.
 *
 * The `delete load balancer` operation supports tag-based access control via
 * resource tags applied to the resource identified by `load balancer name`. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const deleteLoadBalancer: API.OperationMethod<
  DeleteLoadBalancerRequest,
  DeleteLoadBalancerResult,
  DeleteLoadBalancerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLoadBalancerRequest,
  output: DeleteLoadBalancerResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLoadBalancer",
}));

export type DeleteLoadBalancerTlsCertificateError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes an SSL/TLS certificate associated with a Lightsail load balancer.
 *
 * The `DeleteLoadBalancerTlsCertificate` operation supports tag-based access
 * control via resource tags applied to the resource identified by load balancer
 * name. For more information, see the Amazon Lightsail Developer Guide.
 */
export const deleteLoadBalancerTlsCertificate: API.OperationMethod<
  DeleteLoadBalancerTlsCertificateRequest,
  DeleteLoadBalancerTlsCertificateResult,
  DeleteLoadBalancerTlsCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLoadBalancerTlsCertificateRequest,
  output: DeleteLoadBalancerTlsCertificateResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLoadBalancerTlsCertificate",
}));

export type DeleteRelationalDatabaseError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes a database in Amazon Lightsail.
 *
 * The `delete relational database` operation supports tag-based access control
 * via resource tags applied to the resource identified by relationalDatabaseName. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const deleteRelationalDatabase: API.OperationMethod<
  DeleteRelationalDatabaseRequest,
  DeleteRelationalDatabaseResult,
  DeleteRelationalDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRelationalDatabaseRequest,
  output: DeleteRelationalDatabaseResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRelationalDatabase",
}));

export type DeleteRelationalDatabaseSnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes a database snapshot in Amazon Lightsail.
 *
 * The `delete relational database snapshot` operation supports tag-based access
 * control via resource tags applied to the resource identified by relationalDatabaseName. For
 * more information, see the Amazon Lightsail Developer Guide.
 */
export const deleteRelationalDatabaseSnapshot: API.OperationMethod<
  DeleteRelationalDatabaseSnapshotRequest,
  DeleteRelationalDatabaseSnapshotResult,
  DeleteRelationalDatabaseSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRelationalDatabaseSnapshotRequest,
  output: DeleteRelationalDatabaseSnapshotResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRelationalDatabaseSnapshot",
}));

export type DetachCertificateFromDistributionError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Detaches an SSL/TLS certificate from your Amazon Lightsail content delivery network (CDN)
 * distribution.
 *
 * After the certificate is detached, your distribution stops accepting traffic for all of
 * the domains that are associated with the certificate.
 */
export const detachCertificateFromDistribution: API.OperationMethod<
  DetachCertificateFromDistributionRequest,
  DetachCertificateFromDistributionResult,
  DetachCertificateFromDistributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DetachCertificateFromDistributionRequest,
  output: DetachCertificateFromDistributionResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachCertificateFromDistribution",
}));

export type DetachDiskError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Detaches a stopped block storage disk from a Lightsail instance. Make sure to unmount
 * any file systems on the device within your operating system before stopping the instance and
 * detaching the disk.
 *
 * The `detach disk` operation supports tag-based access control via resource tags
 * applied to the resource identified by `disk name`. For more information, see the
 * Amazon Lightsail Developer Guide.
 */
export const detachDisk: API.OperationMethod<
  DetachDiskRequest,
  DetachDiskResult,
  DetachDiskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DetachDiskRequest,
  output: DetachDiskResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachDisk",
}));

export type DetachInstancesFromLoadBalancerError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Detaches the specified instances from a Lightsail load balancer.
 *
 * This operation waits until the instances are no longer needed before they are detached
 * from the load balancer.
 *
 * The `detach instances from load balancer` operation supports tag-based access
 * control via resource tags applied to the resource identified by load balancer
 * name. For more information, see the Amazon Lightsail Developer Guide.
 */
export const detachInstancesFromLoadBalancer: API.OperationMethod<
  DetachInstancesFromLoadBalancerRequest,
  DetachInstancesFromLoadBalancerResult,
  DetachInstancesFromLoadBalancerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DetachInstancesFromLoadBalancerRequest,
  output: DetachInstancesFromLoadBalancerResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachInstancesFromLoadBalancer",
}));

export type DetachStaticIpError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Detaches a static IP from the Amazon Lightsail instance to which it is attached.
 */
export const detachStaticIp: API.OperationMethod<
  DetachStaticIpRequest,
  DetachStaticIpResult,
  DetachStaticIpError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DetachStaticIpRequest,
  output: DetachStaticIpResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachStaticIp",
}));

export type DisableAddOnError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Disables an add-on for an Amazon Lightsail resource. For more information, see the Amazon Lightsail Developer Guide.
 */
export const disableAddOn: API.OperationMethod<
  DisableAddOnRequest,
  DisableAddOnResult,
  DisableAddOnError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisableAddOnRequest,
  output: DisableAddOnResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableAddOn",
}));

export type DownloadDefaultKeyPairError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Downloads the regional Amazon Lightsail default key pair.
 *
 * This action also creates a Lightsail default key pair if a default key pair
 * does not currently exist in the Amazon Web Services Region.
 */
export const downloadDefaultKeyPair: API.OperationMethod<
  DownloadDefaultKeyPairRequest,
  DownloadDefaultKeyPairResult,
  DownloadDefaultKeyPairError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DownloadDefaultKeyPairRequest,
  output: DownloadDefaultKeyPairResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DownloadDefaultKeyPair",
}));

export type EnableAddOnError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Enables or modifies an add-on for an Amazon Lightsail resource. For more information, see
 * the Amazon Lightsail Developer Guide.
 */
export const enableAddOn: API.OperationMethod<
  EnableAddOnRequest,
  EnableAddOnResult,
  EnableAddOnError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableAddOnRequest,
  output: EnableAddOnResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableAddOn",
}));

export type ExportSnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Exports an Amazon Lightsail instance or block storage disk snapshot to Amazon Elastic Compute Cloud (Amazon EC2).
 * This operation results in an export snapshot record that can be used with the create
 * cloud formation stack operation to create new Amazon EC2 instances.
 *
 * Exported instance snapshots appear in Amazon EC2 as Amazon Machine Images (AMIs), and the
 * instance system disk appears as an Amazon Elastic Block Store (Amazon EBS) volume. Exported disk snapshots appear in
 * Amazon EC2 as Amazon EBS volumes. Snapshots are exported to the same Amazon Web Services Region in
 * Amazon EC2 as the source Lightsail snapshot.
 *
 * The `export snapshot` operation supports tag-based access control via resource
 * tags applied to the resource identified by `source snapshot name`. For more
 * information, see the Amazon Lightsail Developer Guide.
 *
 * Use the `get instance snapshots` or `get disk snapshots`
 * operations to get a list of snapshots that you can export to Amazon EC2.
 */
export const exportSnapshot: API.OperationMethod<
  ExportSnapshotRequest,
  ExportSnapshotResult,
  ExportSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExportSnapshotRequest,
  output: ExportSnapshotResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportSnapshot",
}));

export type GetActiveNamesError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the names of all active (not deleted) resources.
 */
export const getActiveNames: API.OperationMethod<
  GetActiveNamesRequest,
  GetActiveNamesResult,
  GetActiveNamesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetActiveNamesRequest,
  output: GetActiveNamesResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetActiveNames",
}));

export type GetAlarmsError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about the configured alarms. Specify an alarm name in your request to
 * return information about a specific alarm, or specify a monitored resource name to return
 * information about all alarms for a specific resource.
 *
 * An alarm is used to monitor a single metric for one of your resources. When a metric
 * condition is met, the alarm can notify you by email, SMS text message, and a banner displayed
 * on the Amazon Lightsail console. For more information, see Alarms
 * in Amazon Lightsail.
 */
export const getAlarms: API.OperationMethod<
  GetAlarmsRequest,
  GetAlarmsResult,
  GetAlarmsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAlarmsRequest,
  output: GetAlarmsResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAlarms",
}));

export type GetAutoSnapshotsError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the available automatic snapshots for an instance or disk. For more information,
 * see the Amazon Lightsail Developer Guide.
 */
export const getAutoSnapshots: API.OperationMethod<
  GetAutoSnapshotsRequest,
  GetAutoSnapshotsResult,
  GetAutoSnapshotsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAutoSnapshotsRequest,
  output: GetAutoSnapshotsResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutoSnapshots",
}));

export type GetBlueprintsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the list of available instance images, or *blueprints*. You can
 * use a blueprint to create a new instance already running a specific operating system, as well
 * as a preinstalled app or development stack. The software each instance is running depends on
 * the blueprint image you choose.
 *
 * Use active blueprints when creating new instances. Inactive blueprints are listed to
 * support customers with existing instances and are not necessarily available to create new
 * instances. Blueprints are marked inactive when they become outdated due to operating system
 * updates or new application releases.
 */
export const getBlueprints: API.OperationMethod<
  GetBlueprintsRequest,
  GetBlueprintsResult,
  GetBlueprintsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBlueprintsRequest,
  output: GetBlueprintsResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBlueprints",
}));

export type GetBucketAccessKeysError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the existing access key IDs for the specified Amazon Lightsail bucket.
 *
 * This action does not return the secret access key value of an access key. You can get a
 * secret access key only when you create it from the response of the CreateBucketAccessKey action. If you lose the secret access key, you must create
 * a new access key.
 */
export const getBucketAccessKeys: API.OperationMethod<
  GetBucketAccessKeysRequest,
  GetBucketAccessKeysResult,
  GetBucketAccessKeysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBucketAccessKeysRequest,
  output: GetBucketAccessKeysResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketAccessKeys",
}));

export type GetBucketBundlesError =
  | AccessDeniedException
  | InvalidInputException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the bundles that you can apply to a Amazon Lightsail bucket.
 *
 * The bucket bundle specifies the monthly cost, storage quota, and data transfer quota for a
 * bucket.
 *
 * Use the UpdateBucketBundle action to update the
 * bundle for a bucket.
 */
export const getBucketBundles: API.OperationMethod<
  GetBucketBundlesRequest,
  GetBucketBundlesResult,
  GetBucketBundlesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBucketBundlesRequest,
  output: GetBucketBundlesResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketBundles",
}));

export type GetBucketMetricDataError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the data points of a specific metric for an Amazon Lightsail bucket.
 *
 * Metrics report the utilization of a bucket. View and collect metric data regularly to
 * monitor the number of objects stored in a bucket (including object versions) and the storage
 * space used by those objects.
 */
export const getBucketMetricData: API.OperationMethod<
  GetBucketMetricDataRequest,
  GetBucketMetricDataResult,
  GetBucketMetricDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBucketMetricDataRequest,
  output: GetBucketMetricDataResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketMetricData",
}));

export type GetBucketsError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about one or more Amazon Lightsail buckets. The information returned
 * includes the synchronization status of the Amazon Simple Storage Service (Amazon S3)
 * account-level block public access feature for your Lightsail buckets.
 *
 * For more information about buckets, see Buckets in Amazon Lightsail in the Amazon Lightsail Developer
 * Guide.
 */
export const getBuckets: API.OperationMethod<
  GetBucketsRequest,
  GetBucketsResult,
  GetBucketsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBucketsRequest,
  output: GetBucketsResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBuckets",
}));

export type GetBundlesError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the bundles that you can apply to an Amazon Lightsail instance when you create
 * it.
 *
 * A bundle describes the specifications of an instance, such as the monthly cost, amount of
 * memory, the number of vCPUs, amount of storage space, and monthly network data transfer
 * quota.
 *
 * Bundles are referred to as *instance plans* in the Lightsail
 * console.
 */
export const getBundles: API.OperationMethod<
  GetBundlesRequest,
  GetBundlesResult,
  GetBundlesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBundlesRequest,
  output: GetBundlesResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBundles",
}));

export type GetCertificatesError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about one or more Amazon Lightsail SSL/TLS certificates.
 *
 * To get a summary of a certificate, omit `includeCertificateDetails` from your
 * request. The response will include only the certificate Amazon Resource Name (ARN),
 * certificate name, domain name, and tags.
 */
export const getCertificates: API.OperationMethod<
  GetCertificatesRequest,
  GetCertificatesResult,
  GetCertificatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCertificatesRequest,
  output: GetCertificatesResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCertificates",
}));

export type GetCloudFormationStackRecordsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the CloudFormation stack record created as a result of the create cloud
 * formation stack operation.
 *
 * An AWS CloudFormation stack is used to create a new Amazon EC2 instance from an exported Lightsail
 * snapshot.
 */
export const getCloudFormationStackRecords: API.OperationMethod<
  GetCloudFormationStackRecordsRequest,
  GetCloudFormationStackRecordsResult,
  GetCloudFormationStackRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCloudFormationStackRecordsRequest,
  output: GetCloudFormationStackRecordsResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCloudFormationStackRecords",
}));

export type GetContactMethodsError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about the configured contact methods. Specify a protocol in your
 * request to return information about a specific contact method.
 *
 * A contact method is used to send you notifications about your Amazon Lightsail resources.
 * You can add one email address and one mobile phone number contact method in each Amazon Web Services Region. However, SMS text messaging is not supported in some Amazon Web Services
 * Regions, and SMS text messages cannot be sent to some countries/regions. For more information,
 * see Notifications in Amazon Lightsail.
 */
export const getContactMethods: API.OperationMethod<
  GetContactMethodsRequest,
  GetContactMethodsResult,
  GetContactMethodsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetContactMethodsRequest,
  output: GetContactMethodsResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContactMethods",
}));

export type GetContainerAPIMetadataError =
  | AccessDeniedException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about Amazon Lightsail containers, such as the current version of the
 * Lightsail Control (lightsailctl) plugin.
 */
export const getContainerAPIMetadata: API.OperationMethod<
  GetContainerAPIMetadataRequest,
  GetContainerAPIMetadataResult,
  GetContainerAPIMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetContainerAPIMetadataRequest,
  output: GetContainerAPIMetadataResult,
  errors: [
    AccessDeniedException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContainerAPIMetadata",
}));

export type GetContainerImagesError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the container images that are registered to your Amazon Lightsail container
 * service.
 *
 * If you created a deployment on your Lightsail container service that uses container
 * images from a public registry like Docker Hub, those images are not returned as part of this
 * action. Those images are not registered to your Lightsail container service.
 */
export const getContainerImages: API.OperationMethod<
  GetContainerImagesRequest,
  GetContainerImagesResult,
  GetContainerImagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetContainerImagesRequest,
  output: GetContainerImagesResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContainerImages",
}));

export type GetContainerLogError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the log events of a container of your Amazon Lightsail container service.
 *
 * If your container service has more than one node (i.e., a scale greater than 1), then the
 * log events that are returned for the specified container are merged from all nodes on your
 * container service.
 *
 * Container logs are retained for a certain amount of time. For more information, see
 * Amazon Lightsail
 * endpoints and quotas in the Amazon Web Services General
 * Reference.
 */
export const getContainerLog: API.OperationMethod<
  GetContainerLogRequest,
  GetContainerLogResult,
  GetContainerLogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetContainerLogRequest,
  output: GetContainerLogResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContainerLog",
}));

export type GetContainerServiceDeploymentsError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the deployments for your Amazon Lightsail container service
 *
 * A deployment specifies the settings, such as the ports and launch command, of containers
 * that are deployed to your container service.
 *
 * The deployments are ordered by version in ascending order. The newest version is listed at
 * the top of the response.
 *
 * A set number of deployments are kept before the oldest one is replaced with the newest
 * one. For more information, see Amazon Lightsail
 * endpoints and quotas in the Amazon Web Services General
 * Reference.
 */
export const getContainerServiceDeployments: API.OperationMethod<
  GetContainerServiceDeploymentsRequest,
  GetContainerServiceDeploymentsResult,
  GetContainerServiceDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetContainerServiceDeploymentsRequest,
  output: GetContainerServiceDeploymentsResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContainerServiceDeployments",
}));

export type GetContainerServiceMetricDataError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the data points of a specific metric of your Amazon Lightsail container
 * service.
 *
 * Metrics report the utilization of your resources. Monitor and collect metric data
 * regularly to maintain the reliability, availability, and performance of your resources.
 */
export const getContainerServiceMetricData: API.OperationMethod<
  GetContainerServiceMetricDataRequest,
  GetContainerServiceMetricDataResult,
  GetContainerServiceMetricDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetContainerServiceMetricDataRequest,
  output: GetContainerServiceMetricDataResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContainerServiceMetricData",
}));

export type GetContainerServicePowersError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the list of powers that can be specified for your Amazon Lightsail container
 * services.
 *
 * The power specifies the amount of memory, the number of vCPUs, and the base price of the
 * container service.
 */
export const getContainerServicePowers: API.OperationMethod<
  GetContainerServicePowersRequest,
  GetContainerServicePowersResult,
  GetContainerServicePowersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetContainerServicePowersRequest,
  output: GetContainerServicePowersResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContainerServicePowers",
}));

export type GetContainerServicesError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about one or more of your Amazon Lightsail container services.
 */
export const getContainerServices: API.OperationMethod<
  GetContainerServicesRequest,
  ContainerServicesListResult,
  GetContainerServicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetContainerServicesRequest,
  output: ContainerServicesListResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContainerServices",
}));

export type GetCostEstimateError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Retrieves information about the cost estimate for a specified resource. A cost estimate
 * will not generate for a resource that has been deleted.
 */
export const getCostEstimate: API.OperationMethod<
  GetCostEstimateRequest,
  GetCostEstimateResult,
  GetCostEstimateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCostEstimateRequest,
  output: GetCostEstimateResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCostEstimate",
}));

export type GetDiskError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about a specific block storage disk.
 */
export const getDisk: API.OperationMethod<
  GetDiskRequest,
  GetDiskResult,
  GetDiskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDiskRequest,
  output: GetDiskResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDisk",
}));

export type GetDisksError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about all block storage disks in your AWS account and region.
 */
export const getDisks: API.OperationMethod<
  GetDisksRequest,
  GetDisksResult,
  GetDisksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDisksRequest,
  output: GetDisksResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDisks",
}));

export type GetDiskSnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about a specific block storage disk snapshot.
 */
export const getDiskSnapshot: API.OperationMethod<
  GetDiskSnapshotRequest,
  GetDiskSnapshotResult,
  GetDiskSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDiskSnapshotRequest,
  output: GetDiskSnapshotResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDiskSnapshot",
}));

export type GetDiskSnapshotsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about all block storage disk snapshots in your AWS account and
 * region.
 */
export const getDiskSnapshots: API.OperationMethod<
  GetDiskSnapshotsRequest,
  GetDiskSnapshotsResult,
  GetDiskSnapshotsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDiskSnapshotsRequest,
  output: GetDiskSnapshotsResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDiskSnapshots",
}));

export type GetDistributionBundlesError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the bundles that can be applied to your Amazon Lightsail content delivery network
 * (CDN) distributions.
 *
 * A distribution bundle specifies the monthly network transfer quota and monthly cost of
 * your distribution.
 */
export const getDistributionBundles: API.OperationMethod<
  GetDistributionBundlesRequest,
  GetDistributionBundlesResult,
  GetDistributionBundlesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDistributionBundlesRequest,
  output: GetDistributionBundlesResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDistributionBundles",
}));

export type GetDistributionLatestCacheResetError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the timestamp and status of the last cache reset of a specific Amazon Lightsail
 * content delivery network (CDN) distribution.
 */
export const getDistributionLatestCacheReset: API.OperationMethod<
  GetDistributionLatestCacheResetRequest,
  GetDistributionLatestCacheResetResult,
  GetDistributionLatestCacheResetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDistributionLatestCacheResetRequest,
  output: GetDistributionLatestCacheResetResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDistributionLatestCacheReset",
}));

export type GetDistributionMetricDataError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the data points of a specific metric for an Amazon Lightsail content delivery
 * network (CDN) distribution.
 *
 * Metrics report the utilization of your resources, and the error counts generated by them.
 * Monitor and collect metric data regularly to maintain the reliability, availability, and
 * performance of your resources.
 */
export const getDistributionMetricData: API.OperationMethod<
  GetDistributionMetricDataRequest,
  GetDistributionMetricDataResult,
  GetDistributionMetricDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDistributionMetricDataRequest,
  output: GetDistributionMetricDataResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDistributionMetricData",
}));

export type GetDistributionsError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about one or more of your Amazon Lightsail content delivery network
 * (CDN) distributions.
 */
export const getDistributions: API.OperationMethod<
  GetDistributionsRequest,
  GetDistributionsResult,
  GetDistributionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDistributionsRequest,
  output: GetDistributionsResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDistributions",
}));

export type GetDomainError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about a specific domain recordset.
 */
export const getDomain: API.OperationMethod<
  GetDomainRequest,
  GetDomainResult,
  GetDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDomainRequest,
  output: GetDomainResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomain",
}));

export type GetDomainsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns a list of all domains in the user's account.
 */
export const getDomains: API.OperationMethod<
  GetDomainsRequest,
  GetDomainsResult,
  GetDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDomainsRequest,
  output: GetDomainsResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomains",
}));

export type GetExportSnapshotRecordsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns all export snapshot records created as a result of the export
 * snapshot operation.
 *
 * An export snapshot record can be used to create a new Amazon EC2 instance and its related
 * resources with the CreateCloudFormationStack
 * action.
 */
export const getExportSnapshotRecords: API.OperationMethod<
  GetExportSnapshotRecordsRequest,
  GetExportSnapshotRecordsResult,
  GetExportSnapshotRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetExportSnapshotRecordsRequest,
  output: GetExportSnapshotRecordsResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExportSnapshotRecords",
}));

export type GetInstanceError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about a specific Amazon Lightsail instance, which is a virtual private
 * server.
 */
export const getInstance: API.OperationMethod<
  GetInstanceRequest,
  GetInstanceResult,
  GetInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInstanceRequest,
  output: GetInstanceResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstance",
}));

export type GetInstanceAccessDetailsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns temporary SSH keys you can use to connect to a specific virtual private server, or
 * *instance*.
 *
 * The `get instance access details` operation supports tag-based access control
 * via resource tags applied to the resource identified by `instance name`. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const getInstanceAccessDetails: API.OperationMethod<
  GetInstanceAccessDetailsRequest,
  GetInstanceAccessDetailsResult,
  GetInstanceAccessDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInstanceAccessDetailsRequest,
  output: GetInstanceAccessDetailsResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstanceAccessDetails",
}));

export type GetInstanceMetricDataError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the data points for the specified Amazon Lightsail instance metric, given an
 * instance name.
 *
 * Metrics report the utilization of your resources, and the error counts generated by them.
 * Monitor and collect metric data regularly to maintain the reliability, availability, and
 * performance of your resources.
 */
export const getInstanceMetricData: API.OperationMethod<
  GetInstanceMetricDataRequest,
  GetInstanceMetricDataResult,
  GetInstanceMetricDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInstanceMetricDataRequest,
  output: GetInstanceMetricDataResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstanceMetricData",
}));

export type GetInstancePortStatesError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the firewall port states for a specific Amazon Lightsail instance, the IP addresses
 * allowed to connect to the instance through the ports, and the protocol.
 */
export const getInstancePortStates: API.OperationMethod<
  GetInstancePortStatesRequest,
  GetInstancePortStatesResult,
  GetInstancePortStatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInstancePortStatesRequest,
  output: GetInstancePortStatesResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstancePortStates",
}));

export type GetInstancesError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about all Amazon Lightsail virtual private servers, or
 * *instances*.
 */
export const getInstances: API.OperationMethod<
  GetInstancesRequest,
  GetInstancesResult,
  GetInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInstancesRequest,
  output: GetInstancesResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstances",
}));

export type GetInstanceSnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about a specific instance snapshot.
 */
export const getInstanceSnapshot: API.OperationMethod<
  GetInstanceSnapshotRequest,
  GetInstanceSnapshotResult,
  GetInstanceSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInstanceSnapshotRequest,
  output: GetInstanceSnapshotResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstanceSnapshot",
}));

export type GetInstanceSnapshotsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns all instance snapshots for the user's account.
 */
export const getInstanceSnapshots: API.OperationMethod<
  GetInstanceSnapshotsRequest,
  GetInstanceSnapshotsResult,
  GetInstanceSnapshotsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInstanceSnapshotsRequest,
  output: GetInstanceSnapshotsResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstanceSnapshots",
}));

export type GetInstanceStateError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the state of a specific instance. Works on one instance at a time.
 */
export const getInstanceState: API.OperationMethod<
  GetInstanceStateRequest,
  GetInstanceStateResult,
  GetInstanceStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInstanceStateRequest,
  output: GetInstanceStateResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstanceState",
}));

export type GetKeyPairError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about a specific key pair.
 */
export const getKeyPair: API.OperationMethod<
  GetKeyPairRequest,
  GetKeyPairResult,
  GetKeyPairError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetKeyPairRequest,
  output: GetKeyPairResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKeyPair",
}));

export type GetKeyPairsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about all key pairs in the user's account.
 */
export const getKeyPairs: API.OperationMethod<
  GetKeyPairsRequest,
  GetKeyPairsResult,
  GetKeyPairsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetKeyPairsRequest,
  output: GetKeyPairsResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKeyPairs",
}));

export type GetLoadBalancerError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about the specified Lightsail load balancer.
 */
export const getLoadBalancer: API.OperationMethod<
  GetLoadBalancerRequest,
  GetLoadBalancerResult,
  GetLoadBalancerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLoadBalancerRequest,
  output: GetLoadBalancerResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoadBalancer",
}));

export type GetLoadBalancerMetricDataError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about health metrics for your Lightsail load balancer.
 *
 * Metrics report the utilization of your resources, and the error counts generated by them.
 * Monitor and collect metric data regularly to maintain the reliability, availability, and
 * performance of your resources.
 */
export const getLoadBalancerMetricData: API.OperationMethod<
  GetLoadBalancerMetricDataRequest,
  GetLoadBalancerMetricDataResult,
  GetLoadBalancerMetricDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLoadBalancerMetricDataRequest,
  output: GetLoadBalancerMetricDataResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoadBalancerMetricData",
}));

export type GetLoadBalancersError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about all load balancers in an account.
 */
export const getLoadBalancers: API.OperationMethod<
  GetLoadBalancersRequest,
  GetLoadBalancersResult,
  GetLoadBalancersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLoadBalancersRequest,
  output: GetLoadBalancersResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoadBalancers",
}));

export type GetLoadBalancerTlsCertificatesError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about the TLS certificates that are associated with the specified
 * Lightsail load balancer.
 *
 * TLS is just an updated, more secure version of Secure Socket Layer (SSL).
 *
 * You can have a maximum of 2 certificates associated with a Lightsail load balancer. One
 * is active and the other is inactive.
 */
export const getLoadBalancerTlsCertificates: API.OperationMethod<
  GetLoadBalancerTlsCertificatesRequest,
  GetLoadBalancerTlsCertificatesResult,
  GetLoadBalancerTlsCertificatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLoadBalancerTlsCertificatesRequest,
  output: GetLoadBalancerTlsCertificatesResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoadBalancerTlsCertificates",
}));

export type GetLoadBalancerTlsPoliciesError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns a list of TLS security policies that you can apply to Lightsail load
 * balancers.
 *
 * For more information about load balancer TLS security policies, see Configuring TLS security policies on your Amazon Lightsail load
 * balancers in the *Amazon Lightsail Developer Guide*.
 */
export const getLoadBalancerTlsPolicies: API.OperationMethod<
  GetLoadBalancerTlsPoliciesRequest,
  GetLoadBalancerTlsPoliciesResult,
  GetLoadBalancerTlsPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLoadBalancerTlsPoliciesRequest,
  output: GetLoadBalancerTlsPoliciesResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoadBalancerTlsPolicies",
}));

export type GetOperationError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about a specific operation. Operations include events such as when you
 * create an instance, allocate a static IP, attach a static IP, and so on.
 */
export const getOperation: API.OperationMethod<
  GetOperationRequest,
  GetOperationResult,
  GetOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOperationRequest,
  output: GetOperationResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOperation",
}));

export type GetOperationsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about all operations.
 *
 * Results are returned from oldest to newest, up to a maximum of 200. Results can be paged
 * by making each subsequent call to `GetOperations` use the maximum (last)
 * `statusChangedAt` value from the previous request.
 */
export const getOperations: API.OperationMethod<
  GetOperationsRequest,
  GetOperationsResult,
  GetOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOperationsRequest,
  output: GetOperationsResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOperations",
}));

export type GetOperationsForResourceError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Gets operations for a specific resource (an instance or a static IP).
 */
export const getOperationsForResource: API.OperationMethod<
  GetOperationsForResourceRequest,
  GetOperationsForResourceResult,
  GetOperationsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOperationsForResourceRequest,
  output: GetOperationsForResourceResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOperationsForResource",
}));

export type GetRegionsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns a list of all valid regions for Amazon Lightsail. Use the include
 * availability zones parameter to also return the Availability Zones in a
 * region.
 */
export const getRegions: API.OperationMethod<
  GetRegionsRequest,
  GetRegionsResult,
  GetRegionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRegionsRequest,
  output: GetRegionsResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegions",
}));

export type GetRelationalDatabaseError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about a specific database in Amazon Lightsail.
 */
export const getRelationalDatabase: API.OperationMethod<
  GetRelationalDatabaseRequest,
  GetRelationalDatabaseResult,
  GetRelationalDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRelationalDatabaseRequest,
  output: GetRelationalDatabaseResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelationalDatabase",
}));

export type GetRelationalDatabaseBlueprintsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns a list of available database blueprints in Amazon Lightsail. A blueprint describes
 * the major engine version of a database.
 *
 * You can use a blueprint ID to create a new database that runs a specific database
 * engine.
 */
export const getRelationalDatabaseBlueprints: API.OperationMethod<
  GetRelationalDatabaseBlueprintsRequest,
  GetRelationalDatabaseBlueprintsResult,
  GetRelationalDatabaseBlueprintsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRelationalDatabaseBlueprintsRequest,
  output: GetRelationalDatabaseBlueprintsResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelationalDatabaseBlueprints",
}));

export type GetRelationalDatabaseBundlesError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the list of bundles that are available in Amazon Lightsail. A bundle describes the
 * performance specifications for a database.
 *
 * You can use a bundle ID to create a new database with explicit performance
 * specifications.
 */
export const getRelationalDatabaseBundles: API.OperationMethod<
  GetRelationalDatabaseBundlesRequest,
  GetRelationalDatabaseBundlesResult,
  GetRelationalDatabaseBundlesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRelationalDatabaseBundlesRequest,
  output: GetRelationalDatabaseBundlesResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelationalDatabaseBundles",
}));

export type GetRelationalDatabaseEventsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns a list of events for a specific database in Amazon Lightsail.
 */
export const getRelationalDatabaseEvents: API.OperationMethod<
  GetRelationalDatabaseEventsRequest,
  GetRelationalDatabaseEventsResult,
  GetRelationalDatabaseEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRelationalDatabaseEventsRequest,
  output: GetRelationalDatabaseEventsResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelationalDatabaseEvents",
}));

export type GetRelationalDatabaseLogEventsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns a list of log events for a database in Amazon Lightsail.
 */
export const getRelationalDatabaseLogEvents: API.OperationMethod<
  GetRelationalDatabaseLogEventsRequest,
  GetRelationalDatabaseLogEventsResult,
  GetRelationalDatabaseLogEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRelationalDatabaseLogEventsRequest,
  output: GetRelationalDatabaseLogEventsResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelationalDatabaseLogEvents",
}));

export type GetRelationalDatabaseLogStreamsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns a list of available log streams for a specific database in Amazon Lightsail.
 */
export const getRelationalDatabaseLogStreams: API.OperationMethod<
  GetRelationalDatabaseLogStreamsRequest,
  GetRelationalDatabaseLogStreamsResult,
  GetRelationalDatabaseLogStreamsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRelationalDatabaseLogStreamsRequest,
  output: GetRelationalDatabaseLogStreamsResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelationalDatabaseLogStreams",
}));

export type GetRelationalDatabaseMasterUserPasswordError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the current, previous, or pending versions of the master user password for a
 * Lightsail database.
 *
 * The `GetRelationalDatabaseMasterUserPassword` operation supports tag-based
 * access control via resource tags applied to the resource identified by
 * relationalDatabaseName.
 */
export const getRelationalDatabaseMasterUserPassword: API.OperationMethod<
  GetRelationalDatabaseMasterUserPasswordRequest,
  GetRelationalDatabaseMasterUserPasswordResult,
  GetRelationalDatabaseMasterUserPasswordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRelationalDatabaseMasterUserPasswordRequest,
  output: GetRelationalDatabaseMasterUserPasswordResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelationalDatabaseMasterUserPassword",
}));

export type GetRelationalDatabaseMetricDataError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns the data points of the specified metric for a database in Amazon Lightsail.
 *
 * Metrics report the utilization of your resources, and the error counts generated by them.
 * Monitor and collect metric data regularly to maintain the reliability, availability, and
 * performance of your resources.
 */
export const getRelationalDatabaseMetricData: API.OperationMethod<
  GetRelationalDatabaseMetricDataRequest,
  GetRelationalDatabaseMetricDataResult,
  GetRelationalDatabaseMetricDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRelationalDatabaseMetricDataRequest,
  output: GetRelationalDatabaseMetricDataResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelationalDatabaseMetricData",
}));

export type GetRelationalDatabaseParametersError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns all of the runtime parameters offered by the underlying database software, or
 * engine, for a specific database in Amazon Lightsail.
 *
 * In addition to the parameter names and values, this operation returns other information
 * about each parameter. This information includes whether changes require a reboot, whether the
 * parameter is modifiable, the allowed values, and the data types.
 */
export const getRelationalDatabaseParameters: API.OperationMethod<
  GetRelationalDatabaseParametersRequest,
  GetRelationalDatabaseParametersResult,
  GetRelationalDatabaseParametersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRelationalDatabaseParametersRequest,
  output: GetRelationalDatabaseParametersResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelationalDatabaseParameters",
}));

export type GetRelationalDatabasesError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about all of your databases in Amazon Lightsail.
 */
export const getRelationalDatabases: API.OperationMethod<
  GetRelationalDatabasesRequest,
  GetRelationalDatabasesResult,
  GetRelationalDatabasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRelationalDatabasesRequest,
  output: GetRelationalDatabasesResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelationalDatabases",
}));

export type GetRelationalDatabaseSnapshotError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about a specific database snapshot in Amazon Lightsail.
 */
export const getRelationalDatabaseSnapshot: API.OperationMethod<
  GetRelationalDatabaseSnapshotRequest,
  GetRelationalDatabaseSnapshotResult,
  GetRelationalDatabaseSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRelationalDatabaseSnapshotRequest,
  output: GetRelationalDatabaseSnapshotResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelationalDatabaseSnapshot",
}));

export type GetRelationalDatabaseSnapshotsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about all of your database snapshots in Amazon Lightsail.
 */
export const getRelationalDatabaseSnapshots: API.OperationMethod<
  GetRelationalDatabaseSnapshotsRequest,
  GetRelationalDatabaseSnapshotsResult,
  GetRelationalDatabaseSnapshotsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRelationalDatabaseSnapshotsRequest,
  output: GetRelationalDatabaseSnapshotsResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelationalDatabaseSnapshots",
}));

export type GetSetupHistoryError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns detailed information for five of the most recent `SetupInstanceHttps`
 * requests that were ran on the target instance.
 */
export const getSetupHistory: API.OperationMethod<
  GetSetupHistoryRequest,
  GetSetupHistoryResult,
  GetSetupHistoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSetupHistoryRequest,
  output: GetSetupHistoryResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSetupHistory",
}));

export type GetStaticIpError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about an Amazon Lightsail static IP.
 */
export const getStaticIp: API.OperationMethod<
  GetStaticIpRequest,
  GetStaticIpResult,
  GetStaticIpError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetStaticIpRequest,
  output: GetStaticIpResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStaticIp",
}));

export type GetStaticIpsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns information about all static IPs in the user's account.
 */
export const getStaticIps: API.OperationMethod<
  GetStaticIpsRequest,
  GetStaticIpsResult,
  GetStaticIpsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetStaticIpsRequest,
  output: GetStaticIpsResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStaticIps",
}));

export type ImportKeyPairError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Imports a public SSH key from a specific key pair.
 */
export const importKeyPair: API.OperationMethod<
  ImportKeyPairRequest,
  ImportKeyPairResult,
  ImportKeyPairError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportKeyPairRequest,
  output: ImportKeyPairResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportKeyPair",
}));

export type IsVpcPeeredError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Returns a Boolean value indicating whether your Lightsail VPC is peered.
 */
export const isVpcPeered: API.OperationMethod<
  IsVpcPeeredRequest,
  IsVpcPeeredResult,
  IsVpcPeeredError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: IsVpcPeeredRequest,
  output: IsVpcPeeredResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IsVpcPeered",
}));

export type OpenInstancePublicPortsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Opens ports for a specific Amazon Lightsail instance, and specifies the IP addresses
 * allowed to connect to the instance through the ports, and the protocol.
 *
 * The `OpenInstancePublicPorts` action supports tag-based access control via
 * resource tags applied to the resource identified by `instanceName`. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const openInstancePublicPorts: API.OperationMethod<
  OpenInstancePublicPortsRequest,
  OpenInstancePublicPortsResult,
  OpenInstancePublicPortsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: OpenInstancePublicPortsRequest,
  output: OpenInstancePublicPortsResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "OpenInstancePublicPorts",
}));

export type PeerVpcError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Peers the Lightsail VPC with the user's default VPC.
 */
export const peerVpc: API.OperationMethod<
  PeerVpcRequest,
  PeerVpcResult,
  PeerVpcError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PeerVpcRequest,
  output: PeerVpcResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PeerVpc",
}));

export type PutAlarmError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates or updates an alarm, and associates it with the specified metric.
 *
 * An alarm is used to monitor a single metric for one of your resources. When a metric
 * condition is met, the alarm can notify you by email, SMS text message, and a banner displayed
 * on the Amazon Lightsail console. For more information, see Alarms
 * in Amazon Lightsail.
 *
 * When this action creates an alarm, the alarm state is immediately set to
 * `INSUFFICIENT_DATA`. The alarm is then evaluated and its state is set
 * appropriately. Any actions associated with the new state are then executed.
 *
 * When you update an existing alarm, its state is left unchanged, but the update completely
 * overwrites the previous configuration of the alarm. The alarm is then evaluated with the
 * updated configuration.
 *
 * The `put alarm` operation supports tag-based access control via request
 * tags. For more information, see the Lightsail Developer Guide.
 */
export const putAlarm: API.OperationMethod<
  PutAlarmRequest,
  PutAlarmResult,
  PutAlarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAlarmRequest,
  output: PutAlarmResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAlarm",
}));

export type PutInstancePublicPortsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Opens ports for a specific Amazon Lightsail instance, and specifies the IP addresses
 * allowed to connect to the instance through the ports, and the protocol. This action also
 * closes all currently open ports that are not included in the request. Include all of the ports
 * and the protocols you want to open in your `PutInstancePublicPorts`request. Or use
 * the `OpenInstancePublicPorts` action to open ports without closing currently open
 * ports.
 *
 * The `PutInstancePublicPorts` action supports tag-based access control via
 * resource tags applied to the resource identified by `instanceName`. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const putInstancePublicPorts: API.OperationMethod<
  PutInstancePublicPortsRequest,
  PutInstancePublicPortsResult,
  PutInstancePublicPortsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutInstancePublicPortsRequest,
  output: PutInstancePublicPortsResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutInstancePublicPorts",
}));

export type RebootInstanceError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Restarts a specific instance.
 *
 * The `reboot instance` operation supports tag-based access control via resource
 * tags applied to the resource identified by `instance name`. For more information,
 * see the Amazon Lightsail Developer Guide.
 */
export const rebootInstance: API.OperationMethod<
  RebootInstanceRequest,
  RebootInstanceResult,
  RebootInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RebootInstanceRequest,
  output: RebootInstanceResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootInstance",
}));

export type RebootRelationalDatabaseError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Restarts a specific database in Amazon Lightsail.
 *
 * The `reboot relational database` operation supports tag-based access control
 * via resource tags applied to the resource identified by relationalDatabaseName. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const rebootRelationalDatabase: API.OperationMethod<
  RebootRelationalDatabaseRequest,
  RebootRelationalDatabaseResult,
  RebootRelationalDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RebootRelationalDatabaseRequest,
  output: RebootRelationalDatabaseResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootRelationalDatabase",
}));

export type RegisterContainerImageError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Registers a container image to your Amazon Lightsail container service.
 *
 * This action is not required if you install and use the Lightsail Control
 * (lightsailctl) plugin to push container images to your Lightsail container service. For
 * more information, see Pushing and managing container images on your Amazon Lightsail container services
 * in the *Amazon Lightsail Developer Guide*.
 */
export const registerContainerImage: API.OperationMethod<
  RegisterContainerImageRequest,
  RegisterContainerImageResult,
  RegisterContainerImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterContainerImageRequest,
  output: RegisterContainerImageResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterContainerImage",
}));

export type ReleaseStaticIpError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes a specific static IP from your account.
 */
export const releaseStaticIp: API.OperationMethod<
  ReleaseStaticIpRequest,
  ReleaseStaticIpResult,
  ReleaseStaticIpError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ReleaseStaticIpRequest,
  output: ReleaseStaticIpResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReleaseStaticIp",
}));

export type ResetDistributionCacheError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes currently cached content from your Amazon Lightsail content delivery network (CDN)
 * distribution.
 *
 * After resetting the cache, the next time a content request is made, your distribution
 * pulls, serves, and caches it from the origin.
 */
export const resetDistributionCache: API.OperationMethod<
  ResetDistributionCacheRequest,
  ResetDistributionCacheResult,
  ResetDistributionCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResetDistributionCacheRequest,
  output: ResetDistributionCacheResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetDistributionCache",
}));

export type SendContactMethodVerificationError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Sends a verification request to an email contact method to ensure it's owned by the
 * requester. SMS contact methods don't need to be verified.
 *
 * A contact method is used to send you notifications about your Amazon Lightsail resources.
 * You can add one email address and one mobile phone number contact method in each Amazon Web Services Region. However, SMS text messaging is not supported in some Amazon Web Services
 * Regions, and SMS text messages cannot be sent to some countries/regions. For more information,
 * see Notifications in Amazon Lightsail.
 *
 * A verification request is sent to the contact method when you initially create it. Use
 * this action to send another verification request if a previous verification request was
 * deleted, or has expired.
 *
 * Notifications are not sent to an email contact method until after it is verified, and
 * confirmed as valid.
 */
export const sendContactMethodVerification: API.OperationMethod<
  SendContactMethodVerificationRequest,
  SendContactMethodVerificationResult,
  SendContactMethodVerificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendContactMethodVerificationRequest,
  output: SendContactMethodVerificationResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendContactMethodVerification",
}));

export type SetIpAddressTypeError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Sets the IP address type for an Amazon Lightsail resource.
 *
 * Use this action to enable dual-stack for a resource, which enables IPv4 and IPv6 for the
 * specified resource. Alternately, you can use this action to disable dual-stack, and enable
 * IPv4 only.
 */
export const setIpAddressType: API.OperationMethod<
  SetIpAddressTypeRequest,
  SetIpAddressTypeResult,
  SetIpAddressTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetIpAddressTypeRequest,
  output: SetIpAddressTypeResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetIpAddressType",
}));

export type SetResourceAccessForBucketError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Sets the Amazon Lightsail resources that can access the specified Lightsail
 * bucket.
 *
 * Lightsail buckets currently support setting access for Lightsail instances in the same
 * Amazon Web Services Region.
 */
export const setResourceAccessForBucket: API.OperationMethod<
  SetResourceAccessForBucketRequest,
  SetResourceAccessForBucketResult,
  SetResourceAccessForBucketError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetResourceAccessForBucketRequest,
  output: SetResourceAccessForBucketResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetResourceAccessForBucket",
}));

export type SetupInstanceHttpsError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Creates an SSL/TLS certificate that secures traffic for your website. After the
 * certificate is created, it is installed on the specified Lightsail instance.
 *
 * If you provide more than one domain name in the request, at least one name must be less
 * than or equal to 63 characters in length.
 */
export const setupInstanceHttps: API.OperationMethod<
  SetupInstanceHttpsRequest,
  SetupInstanceHttpsResult,
  SetupInstanceHttpsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetupInstanceHttpsRequest,
  output: SetupInstanceHttpsResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetupInstanceHttps",
}));

export type StartGUISessionError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Initiates a graphical user interface (GUI) session that’s used to access a virtual
 * computer’s operating system and application. The session will be active for 1 hour. Use this
 * action to resume the session after it expires.
 */
export const startGUISession: API.OperationMethod<
  StartGUISessionRequest,
  StartGUISessionResult,
  StartGUISessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartGUISessionRequest,
  output: StartGUISessionResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartGUISession",
}));

export type StartInstanceError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Starts a specific Amazon Lightsail instance from a stopped state. To restart an instance,
 * use the `reboot instance` operation.
 *
 * When you start a stopped instance, Lightsail assigns a new public IP address to the
 * instance. To use the same IP address after stopping and starting an instance, create a
 * static IP address and attach it to the instance. For more information, see the Amazon Lightsail Developer Guide.
 *
 * The `start instance` operation supports tag-based access control via resource
 * tags applied to the resource identified by `instance name`. For more information,
 * see the Amazon Lightsail Developer Guide.
 */
export const startInstance: API.OperationMethod<
  StartInstanceRequest,
  StartInstanceResult,
  StartInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartInstanceRequest,
  output: StartInstanceResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartInstance",
}));

export type StartRelationalDatabaseError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Starts a specific database from a stopped state in Amazon Lightsail. To restart a database,
 * use the `reboot relational database` operation.
 *
 * The `start relational database` operation supports tag-based access control via
 * resource tags applied to the resource identified by relationalDatabaseName. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const startRelationalDatabase: API.OperationMethod<
  StartRelationalDatabaseRequest,
  StartRelationalDatabaseResult,
  StartRelationalDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartRelationalDatabaseRequest,
  output: StartRelationalDatabaseResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRelationalDatabase",
}));

export type StopGUISessionError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Terminates a web-based Amazon DCV session that’s used to access a virtual computer’s
 * operating system or application. The session will close and any unsaved data will be
 * lost.
 */
export const stopGUISession: API.OperationMethod<
  StopGUISessionRequest,
  StopGUISessionResult,
  StopGUISessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopGUISessionRequest,
  output: StopGUISessionResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopGUISession",
}));

export type StopInstanceError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Stops a specific Amazon Lightsail instance that is currently running.
 *
 * When you start a stopped instance, Lightsail assigns a new public IP address to the
 * instance. To use the same IP address after stopping and starting an instance, create a
 * static IP address and attach it to the instance. For more information, see the Amazon Lightsail Developer Guide.
 *
 * The `stop instance` operation supports tag-based access control via resource
 * tags applied to the resource identified by `instance name`. For more information,
 * see the Amazon Lightsail Developer Guide.
 */
export const stopInstance: API.OperationMethod<
  StopInstanceRequest,
  StopInstanceResult,
  StopInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopInstanceRequest,
  output: StopInstanceResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopInstance",
}));

export type StopRelationalDatabaseError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Stops a specific database that is currently running in Amazon Lightsail.
 *
 * If you don't manually start your database instance after it has been stopped for seven
 * consecutive days, Amazon Lightsail automatically starts it for you. This action helps ensure
 * that your database instance doesn't fall behind on any required maintenance updates.
 *
 * The `stop relational database` operation supports tag-based access control via
 * resource tags applied to the resource identified by relationalDatabaseName. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const stopRelationalDatabase: API.OperationMethod<
  StopRelationalDatabaseRequest,
  StopRelationalDatabaseResult,
  StopRelationalDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopRelationalDatabaseRequest,
  output: StopRelationalDatabaseResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopRelationalDatabase",
}));

export type TagResourceError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Adds one or more tags to the specified Amazon Lightsail resource. Each resource can have a
 * maximum of 50 tags. Each tag consists of a key and an optional value. Tag keys must be unique
 * per resource. For more information about tags, see the Amazon Lightsail Developer Guide.
 *
 * The `tag resource` operation supports tag-based access control via request tags
 * and resource tags applied to the resource identified by `resource name`. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResult,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TestAlarmError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Tests an alarm by displaying a banner on the Amazon Lightsail console. If a notification
 * trigger is configured for the specified alarm, the test also sends a notification to the
 * notification protocol (`Email` and/or `SMS`) configured for the
 * alarm.
 *
 * An alarm is used to monitor a single metric for one of your resources. When a metric
 * condition is met, the alarm can notify you by email, SMS text message, and a banner displayed
 * on the Amazon Lightsail console. For more information, see Alarms
 * in Amazon Lightsail.
 */
export const testAlarm: API.OperationMethod<
  TestAlarmRequest,
  TestAlarmResult,
  TestAlarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TestAlarmRequest,
  output: TestAlarmResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestAlarm",
}));

export type UnpeerVpcError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Unpeers the Lightsail VPC from the user's default VPC.
 */
export const unpeerVpc: API.OperationMethod<
  UnpeerVpcRequest,
  UnpeerVpcResult,
  UnpeerVpcError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UnpeerVpcRequest,
  output: UnpeerVpcResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UnpeerVpc",
}));

export type UntagResourceError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Deletes the specified set of tag keys and their values from the specified Amazon Lightsail
 * resource.
 *
 * The `untag resource` operation supports tag-based access control via request
 * tags and resource tags applied to the resource identified by `resource name`. For
 * more information, see the Amazon Lightsail Developer Guide.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResult,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateBucketError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Updates an existing Amazon Lightsail bucket.
 *
 * Use this action to update the configuration of an existing bucket, such as versioning,
 * public accessibility, and the Amazon Web Services accounts that can access the bucket.
 */
export const updateBucket: API.OperationMethod<
  UpdateBucketRequest,
  UpdateBucketResult,
  UpdateBucketError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBucketRequest,
  output: UpdateBucketResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBucket",
}));

export type UpdateBucketBundleError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Updates the bundle, or storage plan, of an existing Amazon Lightsail bucket.
 *
 * A bucket bundle specifies the monthly cost, storage space, and data transfer quota for a
 * bucket. You can update a bucket's bundle only one time within a monthly Amazon Web Services
 * billing cycle. To determine if you can update a bucket's bundle, use the GetBuckets action. The
 * `ableToUpdateBundle` parameter in the response will indicate whether you can
 * currently update a bucket's bundle.
 *
 * Update a bucket's bundle if it's consistently going over its storage space or data
 * transfer quota, or if a bucket's usage is consistently in the lower range of its storage space
 * or data transfer quota. Due to the unpredictable usage fluctuations that a bucket might
 * experience, we strongly recommend that you update a bucket's bundle only as a long-term
 * strategy, instead of as a short-term, monthly cost-cutting measure. Choose a bucket bundle
 * that will provide the bucket with ample storage space and data transfer for a long time to
 * come.
 */
export const updateBucketBundle: API.OperationMethod<
  UpdateBucketBundleRequest,
  UpdateBucketBundleResult,
  UpdateBucketBundleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBucketBundleRequest,
  output: UpdateBucketBundleResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBucketBundle",
}));

export type UpdateContainerServiceError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Updates the configuration of your Amazon Lightsail container service, such as its power,
 * scale, and public domain names.
 */
export const updateContainerService: API.OperationMethod<
  UpdateContainerServiceRequest,
  UpdateContainerServiceResult,
  UpdateContainerServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateContainerServiceRequest,
  output: UpdateContainerServiceResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContainerService",
}));

export type UpdateDistributionError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Updates an existing Amazon Lightsail content delivery network (CDN) distribution.
 *
 * Use this action to update the configuration of your existing distribution.
 */
export const updateDistribution: API.OperationMethod<
  UpdateDistributionRequest,
  UpdateDistributionResult,
  UpdateDistributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDistributionRequest,
  output: UpdateDistributionResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDistribution",
}));

export type UpdateDistributionBundleError =
  | AccessDeniedException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Updates the bundle of your Amazon Lightsail content delivery network (CDN)
 * distribution.
 *
 * A distribution bundle specifies the monthly network transfer quota and monthly cost of
 * your distribution.
 *
 * Update your distribution's bundle if your distribution is going over its monthly network
 * transfer quota and is incurring an overage fee.
 *
 * You can update your distribution's bundle only one time within your monthly Amazon Web Services billing cycle. To determine if you can update your distribution's bundle, use the
 * `GetDistributions` action. The `ableToUpdateBundle` parameter in the
 * result will indicate whether you can currently update your distribution's bundle.
 */
export const updateDistributionBundle: API.OperationMethod<
  UpdateDistributionBundleRequest,
  UpdateDistributionBundleResult,
  UpdateDistributionBundleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDistributionBundleRequest,
  output: UpdateDistributionBundleResult,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDistributionBundle",
}));

export type UpdateDomainEntryError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Updates a domain recordset after it is created.
 *
 * The `update domain entry` operation supports tag-based access control via
 * resource tags applied to the resource identified by `domain name`. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const updateDomainEntry: API.OperationMethod<
  UpdateDomainEntryRequest,
  UpdateDomainEntryResult,
  UpdateDomainEntryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDomainEntryRequest,
  output: UpdateDomainEntryResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDomainEntry",
}));

export type UpdateInstanceMetadataOptionsError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Modifies the Amazon Lightsail instance metadata parameters on a running or stopped
 * instance. When you modify the parameters on a running instance, the `GetInstance`
 * or `GetInstances` API operation initially responds with a state of
 * `pending`. After the parameter modifications are successfully applied, the state
 * changes to `applied` in subsequent `GetInstance` or
 * `GetInstances` API calls. For more information, see Use IMDSv2 with an Amazon Lightsail instance in the *Amazon Lightsail Developer Guide*.
 */
export const updateInstanceMetadataOptions: API.OperationMethod<
  UpdateInstanceMetadataOptionsRequest,
  UpdateInstanceMetadataOptionsResult,
  UpdateInstanceMetadataOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateInstanceMetadataOptionsRequest,
  output: UpdateInstanceMetadataOptionsResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInstanceMetadataOptions",
}));

export type UpdateLoadBalancerAttributeError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Updates the specified attribute for a load balancer. You can only update one attribute at
 * a time.
 *
 * The `update load balancer attribute` operation supports tag-based access
 * control via resource tags applied to the resource identified by load balancer
 * name. For more information, see the Amazon Lightsail Developer Guide.
 */
export const updateLoadBalancerAttribute: API.OperationMethod<
  UpdateLoadBalancerAttributeRequest,
  UpdateLoadBalancerAttributeResult,
  UpdateLoadBalancerAttributeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLoadBalancerAttributeRequest,
  output: UpdateLoadBalancerAttributeResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLoadBalancerAttribute",
}));

export type UpdateRelationalDatabaseError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Allows the update of one or more attributes of a database in Amazon Lightsail.
 *
 * Updates are applied immediately, or in cases where the updates could result in an outage,
 * are applied during the database's predefined maintenance window.
 *
 * The `update relational database` operation supports tag-based access control
 * via resource tags applied to the resource identified by relationalDatabaseName. For more
 * information, see the Amazon Lightsail Developer Guide.
 */
export const updateRelationalDatabase: API.OperationMethod<
  UpdateRelationalDatabaseRequest,
  UpdateRelationalDatabaseResult,
  UpdateRelationalDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRelationalDatabaseRequest,
  output: UpdateRelationalDatabaseResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRelationalDatabase",
}));

export type UpdateRelationalDatabaseParametersError =
  | AccessDeniedException
  | AccountSetupInProgressException
  | InvalidInputException
  | NotFoundException
  | OperationFailureException
  | RegionSetupInProgressException
  | ServiceException
  | UnauthenticatedException
  | CommonErrors;
/**
 * Allows the update of one or more parameters of a database in Amazon Lightsail.
 *
 * Parameter updates don't cause outages; therefore, their application is not subject to the
 * preferred maintenance window. However, there are two ways in which parameter updates are
 * applied: `dynamic` or `pending-reboot`. Parameters marked with a
 * `dynamic` apply type are applied immediately. Parameters marked with a
 * `pending-reboot` apply type are applied only after the database is rebooted using
 * the `reboot relational database` operation.
 *
 * The `update relational database parameters` operation supports tag-based access
 * control via resource tags applied to the resource identified by relationalDatabaseName. For
 * more information, see the Amazon Lightsail Developer Guide.
 */
export const updateRelationalDatabaseParameters: API.OperationMethod<
  UpdateRelationalDatabaseParametersRequest,
  UpdateRelationalDatabaseParametersResult,
  UpdateRelationalDatabaseParametersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRelationalDatabaseParametersRequest,
  output: UpdateRelationalDatabaseParametersResult,
  errors: [
    AccessDeniedException,
    AccountSetupInProgressException,
    InvalidInputException,
    NotFoundException,
    OperationFailureException,
    RegionSetupInProgressException,
    ServiceException,
    UnauthenticatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRelationalDatabaseParameters",
}));
