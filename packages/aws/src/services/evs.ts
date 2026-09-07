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
  sdkId: "evs",
  serviceShapeName: "AmazonElasticVMwareService",
});
const auth = T.AwsAuthSigv4({ name: "evs" });
const ver = T.ServiceVersion("2023-07-27");
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
              `https://evs-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://evs-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://evs.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://evs.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

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
export class TagPolicyException
  extends /*@__PURE__*/ S.TaggedError<TagPolicyException>()(
    "TagPolicyException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.all(T.HttpError(429), T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.suspend(() => ValidationExceptionReason).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ClientToken = string;
export type EnvironmentId = string;
export type AllocationId = string;
export interface AssociateEipToVlanRequest {
  clientToken?: string;
  environmentId: string;
  vlanName: string;
  allocationId: string;
}
export const AssociateEipToVlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    environmentId: S.String,
    vlanName: S.String,
    allocationId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateEipToVlanRequest",
}) as any as S.Schema<AssociateEipToVlanRequest>;
export type VlanId = number;
export type Cidr = string;
export type SubnetId = string;
export type VlanState =
  | "CREATING"
  | "CREATED"
  | "DELETING"
  | "DELETED"
  | "CREATE_FAILED"
  | (string & {});
export const VlanState = S.String;

export type StateDetails = string;
export type AssociationId = string;
export type IpAddress = string;
export interface EipAssociation {
  associationId?: string;
  allocationId?: string;
  ipAddress?: string;
}
export const EipAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    associationId: S.optional(S.String),
    allocationId: S.optional(S.String),
    ipAddress: S.optional(S.String),
  }),
).annotate({ identifier: "EipAssociation" }) as any as S.Schema<EipAssociation>;
export type EipAssociationList = EipAssociation[];
export const EipAssociationList = /*@__PURE__*/ S.Array(EipAssociation);
export type NetworkAclId = string;
export interface Vlan {
  vlanId?: number;
  cidr?: string;
  availabilityZone?: string;
  functionName?: string;
  subnetId?: string;
  createdAt?: Date;
  modifiedAt?: Date;
  vlanState?: VlanState;
  stateDetails?: string;
  eipAssociations?: EipAssociation[];
  isPublic?: boolean;
  networkAclId?: string;
}
export const Vlan = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vlanId: S.optional(S.Number),
    cidr: S.optional(S.String),
    availabilityZone: S.optional(S.String),
    functionName: S.optional(S.String),
    subnetId: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    vlanState: S.optional(VlanState),
    stateDetails: S.optional(S.String),
    eipAssociations: S.optional(EipAssociationList),
    isPublic: S.optional(S.Boolean),
    networkAclId: S.optional(S.String),
  }),
).annotate({ identifier: "Vlan" }) as any as S.Schema<Vlan>;
export interface AssociateEipToVlanResponse {
  vlan?: Vlan;
}
export const AssociateEipToVlanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vlan: S.optional(Vlan) }),
).annotate({
  identifier: "AssociateEipToVlanResponse",
}) as any as S.Schema<AssociateEipToVlanResponse>;
export type ConnectorId = string;
export type EntitlementType = "WINDOWS_SERVER" | (string & {});
export const EntitlementType = S.String;

export type VmId = string;
export type VmIdList = string[];
export const VmIdList = /*@__PURE__*/ S.Array(S.String);
export interface CreateEntitlementRequest {
  clientToken?: string;
  environmentId: string;
  connectorId: string;
  entitlementType: EntitlementType;
  vmIds: string[];
}
export const CreateEntitlementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    environmentId: S.String,
    connectorId: S.String,
    entitlementType: EntitlementType,
    vmIds: VmIdList,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateEntitlementRequest",
}) as any as S.Schema<CreateEntitlementRequest>;
export type VmName = string;
export type EntitlementStatus =
  | "CREATING"
  | "CREATED"
  | "DELETED"
  | "AT_RISK"
  | "ENTITLEMENT_REMOVED"
  | "CREATE_FAILED"
  | (string & {});
export const EntitlementStatus = S.String;

export interface ErrorDetail {
  errorCode: string;
  errorMessage: string;
}
export const ErrorDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ errorCode: S.String, errorMessage: S.String }),
).annotate({ identifier: "ErrorDetail" }) as any as S.Schema<ErrorDetail>;
export interface VmEntitlement {
  vmId?: string;
  environmentId?: string;
  connectorId?: string;
  vmName?: string;
  type?: EntitlementType;
  status?: EntitlementStatus;
  lastSyncedAt?: Date;
  startedAt?: Date;
  stoppedAt?: Date;
  errorDetail?: ErrorDetail;
}
export const VmEntitlement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vmId: S.optional(S.String),
    environmentId: S.optional(S.String),
    connectorId: S.optional(S.String),
    vmName: S.optional(S.String),
    type: S.optional(EntitlementType),
    status: S.optional(EntitlementStatus),
    lastSyncedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    stoppedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    errorDetail: S.optional(ErrorDetail),
  }),
).annotate({ identifier: "VmEntitlement" }) as any as S.Schema<VmEntitlement>;
export type VmEntitlementList = VmEntitlement[];
export const VmEntitlementList = /*@__PURE__*/ S.Array(VmEntitlement);
export interface CreateEntitlementResponse {
  entitlements?: VmEntitlement[];
}
export const CreateEntitlementResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ entitlements: S.optional(VmEntitlementList) }),
).annotate({
  identifier: "CreateEntitlementResponse",
}) as any as S.Schema<CreateEntitlementResponse>;
export type EnvironmentName = string;
export type TagKey = string;
export type TagValue = string;
export type RequestTagMap = { [key: string]: string | undefined };
export const RequestTagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type SecurityGroupId = string;
export type SecurityGroups = string[];
export const SecurityGroups = /*@__PURE__*/ S.Array(S.String);
export interface ServiceAccessSecurityGroups {
  securityGroups?: string[];
}
export const ServiceAccessSecurityGroups = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ securityGroups: S.optional(SecurityGroups) }),
).annotate({
  identifier: "ServiceAccessSecurityGroups",
}) as any as S.Schema<ServiceAccessSecurityGroups>;
export type VpcId = string;
export type VcfVersion =
  | "VCF-5.2.1"
  | "VCF-5.2.2"
  | "SELF_DEPLOYED"
  | (string & {});
export const VcfVersion = S.String;

export interface InitialVlanInfo {
  cidr: string;
}
export const InitialVlanInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cidr: S.String }),
).annotate({
  identifier: "InitialVlanInfo",
}) as any as S.Schema<InitialVlanInfo>;
export interface InitialVlans {
  vmkManagement: InitialVlanInfo;
  vmManagement: InitialVlanInfo;
  vMotion: InitialVlanInfo;
  vSan: InitialVlanInfo;
  vTep: InitialVlanInfo;
  edgeVTep: InitialVlanInfo;
  nsxUplink: InitialVlanInfo;
  hcx: InitialVlanInfo;
  expansionVlan1: InitialVlanInfo;
  expansionVlan2: InitialVlanInfo;
  isHcxPublic?: boolean;
  hcxNetworkAclId?: string;
}
export const InitialVlans = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vmkManagement: InitialVlanInfo,
    vmManagement: InitialVlanInfo,
    vMotion: InitialVlanInfo,
    vSan: InitialVlanInfo,
    vTep: InitialVlanInfo,
    edgeVTep: InitialVlanInfo,
    nsxUplink: InitialVlanInfo,
    hcx: InitialVlanInfo,
    expansionVlan1: InitialVlanInfo,
    expansionVlan2: InitialVlanInfo,
    isHcxPublic: S.optional(S.Boolean),
    hcxNetworkAclId: S.optional(S.String),
  }),
).annotate({ identifier: "InitialVlans" }) as any as S.Schema<InitialVlans>;
export type RouteServerPeering = string;
export type RouteServerPeeringList = string[];
export const RouteServerPeeringList = /*@__PURE__*/ S.Array(S.String);
export interface ConnectivityInfo {
  privateRouteServerPeerings: string[];
}
export const ConnectivityInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ privateRouteServerPeerings: RouteServerPeeringList }),
).annotate({
  identifier: "ConnectivityInfo",
}) as any as S.Schema<ConnectivityInfo>;
export type SolutionKey = string | redacted.Redacted<string>;
export type VSanLicenseKey = string | redacted.Redacted<string>;
export interface LicenseInfo {
  solutionKey: string | redacted.Redacted<string>;
  vsanKey: string | redacted.Redacted<string>;
}
export const LicenseInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ solutionKey: SensitiveString, vsanKey: SensitiveString }),
).annotate({ identifier: "LicenseInfo" }) as any as S.Schema<LicenseInfo>;
export type LicenseInfoList = LicenseInfo[];
export const LicenseInfoList = /*@__PURE__*/ S.Array(LicenseInfo);
export type HostName = string;
export type KeyName = string;
export type InstanceType =
  | "i4i.metal"
  | "i7i.metal-24xl"
  | "i7i.metal-48xl"
  | (string & {});
export const InstanceType = S.String;

export type PlacementGroupId = string;
export type DedicatedHostId = string;
export interface HostInfoForCreate {
  hostName: string;
  keyName: string;
  instanceType: InstanceType;
  placementGroupId?: string;
  dedicatedHostId?: string;
}
export const HostInfoForCreate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    hostName: S.String,
    keyName: S.String,
    instanceType: InstanceType,
    placementGroupId: S.optional(S.String),
    dedicatedHostId: S.optional(S.String),
  }),
).annotate({
  identifier: "HostInfoForCreate",
}) as any as S.Schema<HostInfoForCreate>;
export type HostInfoForCreateList = HostInfoForCreate[];
export const HostInfoForCreateList = /*@__PURE__*/ S.Array(HostInfoForCreate);
export interface VcfHostnames {
  vCenter: string;
  nsx: string;
  nsxManager1: string;
  nsxManager2: string;
  nsxManager3: string;
  nsxEdge1: string;
  nsxEdge2: string;
  sddcManager: string;
  cloudBuilder: string;
}
export const VcfHostnames = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vCenter: S.String,
    nsx: S.String,
    nsxManager1: S.String,
    nsxManager2: S.String,
    nsxManager3: S.String,
    nsxEdge1: S.String,
    nsxEdge2: S.String,
    sddcManager: S.String,
    cloudBuilder: S.String,
  }),
).annotate({ identifier: "VcfHostnames" }) as any as S.Schema<VcfHostnames>;
export interface CreateEnvironmentRequest {
  clientToken?: string;
  environmentName?: string;
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
  serviceAccessSecurityGroups?: ServiceAccessSecurityGroups;
  vpcId: string;
  serviceAccessSubnetId: string;
  vcfVersion: VcfVersion;
  termsAccepted: boolean;
  initialVlans: InitialVlans;
  connectivityInfo?: ConnectivityInfo;
  licenseInfo?: LicenseInfo[];
  hosts?: HostInfoForCreate[];
  vcfHostnames?: VcfHostnames;
  siteId?: string;
}
export const CreateEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    environmentName: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
    tags: S.optional(RequestTagMap),
    serviceAccessSecurityGroups: S.optional(ServiceAccessSecurityGroups),
    vpcId: S.String,
    serviceAccessSubnetId: S.String,
    vcfVersion: VcfVersion,
    termsAccepted: S.Boolean,
    initialVlans: InitialVlans,
    connectivityInfo: S.optional(ConnectivityInfo),
    licenseInfo: S.optional(LicenseInfoList),
    hosts: S.optional(HostInfoForCreateList),
    vcfHostnames: S.optional(VcfHostnames),
    siteId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateEnvironmentRequest",
}) as any as S.Schema<CreateEnvironmentRequest>;
export type EnvironmentState =
  | "CREATING"
  | "CREATED"
  | "DELETING"
  | "DELETED"
  | "CREATE_FAILED"
  | (string & {});
export const EnvironmentState = S.String;

export type Arn = string;
export type CheckResult = "PASSED" | "FAILED" | "UNKNOWN" | (string & {});
export const CheckResult = S.String;

export type CheckType =
  | "KEY_REUSE"
  | "KEY_COVERAGE"
  | "REACHABILITY"
  | "HOST_COUNT"
  | "VCENTER_REACHABILITY"
  | "VCENTER_VM_SYNC"
  | "VCENTER_VM_EVENT"
  | "OPERATIONS_MANAGER_REACHABILITY"
  | "SDDC_MANAGER_REACHABILITY"
  | "SDDC_MANAGER_HOST_COUNT"
  | "SDDC_MANAGER_KEY_COVERAGE"
  | "SDDC_MANAGER_KEY_REUSE"
  | "CONNECTOR_HEALTH"
  | (string & {});
export const CheckType = S.String;

export interface Check {
  type?: CheckType;
  id?: string;
  result?: CheckResult;
  impairedSince?: Date;
}
export const Check = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(CheckType),
    id: S.optional(S.String),
    result: S.optional(CheckResult),
    impairedSince: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Check" }) as any as S.Schema<Check>;
export type ChecksList = Check[];
export const ChecksList = /*@__PURE__*/ S.Array(Check);
export interface Secret {
  secretArn?: string;
}
export const Secret = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ secretArn: S.optional(S.String) }),
).annotate({ identifier: "Secret" }) as any as S.Schema<Secret>;
export type SecretList = Secret[];
export const SecretList = /*@__PURE__*/ S.Array(Secret);
export interface Environment {
  environmentId?: string;
  environmentState?: EnvironmentState;
  stateDetails?: string;
  createdAt?: Date;
  modifiedAt?: Date;
  environmentArn?: string;
  environmentName?: string;
  vpcId?: string;
  serviceAccessSubnetId?: string;
  vcfVersion?: VcfVersion;
  termsAccepted?: boolean;
  licenseInfo?: LicenseInfo[];
  siteId?: string;
  environmentStatus?: CheckResult;
  checks?: Check[];
  connectivityInfo?: ConnectivityInfo;
  vcfHostnames?: VcfHostnames;
  kmsKeyId?: string;
  serviceAccessSecurityGroups?: ServiceAccessSecurityGroups;
  credentials?: Secret[];
}
export const Environment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    environmentId: S.optional(S.String),
    environmentState: S.optional(EnvironmentState),
    stateDetails: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    environmentArn: S.optional(S.String),
    environmentName: S.optional(S.String),
    vpcId: S.optional(S.String),
    serviceAccessSubnetId: S.optional(S.String),
    vcfVersion: S.optional(VcfVersion),
    termsAccepted: S.optional(S.Boolean),
    licenseInfo: S.optional(LicenseInfoList),
    siteId: S.optional(S.String),
    environmentStatus: S.optional(CheckResult),
    checks: S.optional(ChecksList),
    connectivityInfo: S.optional(ConnectivityInfo),
    vcfHostnames: S.optional(VcfHostnames),
    kmsKeyId: S.optional(S.String),
    serviceAccessSecurityGroups: S.optional(ServiceAccessSecurityGroups),
    credentials: S.optional(SecretList),
  }),
).annotate({ identifier: "Environment" }) as any as S.Schema<Environment>;
export interface CreateEnvironmentResponse {
  environment?: Environment;
}
export const CreateEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ environment: S.optional(Environment) }),
).annotate({
  identifier: "CreateEnvironmentResponse",
}) as any as S.Schema<CreateEnvironmentResponse>;
export type ConnectorType =
  | "OPERATIONS_MANAGER"
  | "SDDC_MANAGER"
  | "VCENTER"
  | (string & {});
export const ConnectorType = S.String;

export type ApplianceFqdn = string;
export type SecretIdentifier = string;
export interface CreateEnvironmentConnectorRequest {
  clientToken?: string;
  environmentId: string;
  type: ConnectorType;
  applianceFqdn: string;
  secretIdentifier: string;
}
export const CreateEnvironmentConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    type: ConnectorType,
    applianceFqdn: S.String,
    secretIdentifier: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateEnvironmentConnectorRequest",
}) as any as S.Schema<CreateEnvironmentConnectorRequest>;
export type ConnectorState =
  | "CREATING"
  | "CREATE_FAILED"
  | "ACTIVE"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "DELETING"
  | "DELETED"
  | (string & {});
export const ConnectorState = S.String;

export interface ConnectorCheck {
  type?: CheckType;
  result?: CheckResult;
  lastCheckAttempt?: Date;
  impairedSince?: Date;
}
export const ConnectorCheck = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(CheckType),
    result: S.optional(CheckResult),
    lastCheckAttempt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    impairedSince: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "ConnectorCheck" }) as any as S.Schema<ConnectorCheck>;
export type ConnectorsChecksList = ConnectorCheck[];
export const ConnectorsChecksList = /*@__PURE__*/ S.Array(ConnectorCheck);
export interface Connector {
  environmentId?: string;
  connectorId?: string;
  type?: ConnectorType;
  applianceFqdn?: string;
  secretArn?: string;
  state?: ConnectorState;
  stateDetails?: string;
  status?: CheckResult;
  checks?: ConnectorCheck[];
  createdAt?: Date;
  modifiedAt?: Date;
}
export const Connector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    environmentId: S.optional(S.String),
    connectorId: S.optional(S.String),
    type: S.optional(ConnectorType),
    applianceFqdn: S.optional(S.String),
    secretArn: S.optional(S.String),
    state: S.optional(ConnectorState),
    stateDetails: S.optional(S.String),
    status: S.optional(CheckResult),
    checks: S.optional(ConnectorsChecksList),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Connector" }) as any as S.Schema<Connector>;
export interface CreateEnvironmentConnectorResponse {
  connector?: Connector;
}
export const CreateEnvironmentConnectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ connector: S.optional(Connector) }),
).annotate({
  identifier: "CreateEnvironmentConnectorResponse",
}) as any as S.Schema<CreateEnvironmentConnectorResponse>;
export type EsxVersion = string;
export interface CreateEnvironmentHostRequest {
  clientToken?: string;
  environmentId: string;
  host: HostInfoForCreate;
  esxVersion?: string;
}
export const CreateEnvironmentHostRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    environmentId: S.String,
    host: HostInfoForCreate,
    esxVersion: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateEnvironmentHostRequest",
}) as any as S.Schema<CreateEnvironmentHostRequest>;
export interface EnvironmentSummary {
  environmentId?: string;
  environmentName?: string;
  vcfVersion?: VcfVersion;
  environmentStatus?: CheckResult;
  environmentState?: EnvironmentState;
  createdAt?: Date;
  modifiedAt?: Date;
  environmentArn?: string;
}
export const EnvironmentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    environmentId: S.optional(S.String),
    environmentName: S.optional(S.String),
    vcfVersion: S.optional(VcfVersion),
    environmentStatus: S.optional(CheckResult),
    environmentState: S.optional(EnvironmentState),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    environmentArn: S.optional(S.String),
  }),
).annotate({
  identifier: "EnvironmentSummary",
}) as any as S.Schema<EnvironmentSummary>;
export type HostState =
  | "CREATING"
  | "CREATED"
  | "UPDATING"
  | "DELETING"
  | "DELETED"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | (string & {});
export const HostState = S.String;

export type NetworkInterfaceId = string;
export interface NetworkInterface {
  networkInterfaceId?: string;
}
export const NetworkInterface = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ networkInterfaceId: S.optional(S.String) }),
).annotate({
  identifier: "NetworkInterface",
}) as any as S.Schema<NetworkInterface>;
export type NetworkInterfaceList = NetworkInterface[];
export const NetworkInterfaceList = /*@__PURE__*/ S.Array(NetworkInterface);
export interface Host {
  hostName?: string;
  ipAddress?: string;
  keyName?: string;
  instanceType?: InstanceType;
  placementGroupId?: string;
  dedicatedHostId?: string;
  createdAt?: Date;
  modifiedAt?: Date;
  hostState?: HostState;
  stateDetails?: string;
  ec2InstanceId?: string;
  networkInterfaces?: NetworkInterface[];
}
export const Host = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    hostName: S.optional(S.String),
    ipAddress: S.optional(S.String),
    keyName: S.optional(S.String),
    instanceType: S.optional(InstanceType),
    placementGroupId: S.optional(S.String),
    dedicatedHostId: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    hostState: S.optional(HostState),
    stateDetails: S.optional(S.String),
    ec2InstanceId: S.optional(S.String),
    networkInterfaces: S.optional(NetworkInterfaceList),
  }),
).annotate({ identifier: "Host" }) as any as S.Schema<Host>;
export interface CreateEnvironmentHostResponse {
  environmentSummary?: EnvironmentSummary;
  host?: Host;
}
export const CreateEnvironmentHostResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    environmentSummary: S.optional(EnvironmentSummary),
    host: S.optional(Host),
  }),
).annotate({
  identifier: "CreateEnvironmentHostResponse",
}) as any as S.Schema<CreateEnvironmentHostResponse>;
export interface DeleteEntitlementRequest {
  clientToken?: string;
  environmentId: string;
  connectorId: string;
  entitlementType: EntitlementType;
  vmIds: string[];
}
export const DeleteEntitlementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    environmentId: S.String,
    connectorId: S.String,
    entitlementType: EntitlementType,
    vmIds: VmIdList,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteEntitlementRequest",
}) as any as S.Schema<DeleteEntitlementRequest>;
export interface DeleteEntitlementResponse {
  entitlements?: VmEntitlement[];
}
export const DeleteEntitlementResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ entitlements: S.optional(VmEntitlementList) }),
).annotate({
  identifier: "DeleteEntitlementResponse",
}) as any as S.Schema<DeleteEntitlementResponse>;
export interface DeleteEnvironmentRequest {
  clientToken?: string;
  environmentId: string;
}
export const DeleteEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteEnvironmentRequest",
}) as any as S.Schema<DeleteEnvironmentRequest>;
export interface DeleteEnvironmentResponse {
  environment?: Environment;
}
export const DeleteEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ environment: S.optional(Environment) }),
).annotate({
  identifier: "DeleteEnvironmentResponse",
}) as any as S.Schema<DeleteEnvironmentResponse>;
export interface DeleteEnvironmentConnectorRequest {
  clientToken?: string;
  environmentId: string;
  connectorId: string;
}
export const DeleteEnvironmentConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    connectorId: S.String.pipe(T.HttpLabel("connectorId")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteEnvironmentConnectorRequest",
}) as any as S.Schema<DeleteEnvironmentConnectorRequest>;
export interface DeleteEnvironmentConnectorResponse {
  connector?: Connector;
  environmentSummary?: EnvironmentSummary;
}
export const DeleteEnvironmentConnectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connector: S.optional(Connector),
    environmentSummary: S.optional(EnvironmentSummary),
  }),
).annotate({
  identifier: "DeleteEnvironmentConnectorResponse",
}) as any as S.Schema<DeleteEnvironmentConnectorResponse>;
export interface DeleteEnvironmentHostRequest {
  clientToken?: string;
  environmentId: string;
  hostName: string;
}
export const DeleteEnvironmentHostRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    environmentId: S.String,
    hostName: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteEnvironmentHostRequest",
}) as any as S.Schema<DeleteEnvironmentHostRequest>;
export interface DeleteEnvironmentHostResponse {
  environmentSummary?: EnvironmentSummary;
  host?: Host;
}
export const DeleteEnvironmentHostResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    environmentSummary: S.optional(EnvironmentSummary),
    host: S.optional(Host),
  }),
).annotate({
  identifier: "DeleteEnvironmentHostResponse",
}) as any as S.Schema<DeleteEnvironmentHostResponse>;
export interface DisassociateEipFromVlanRequest {
  clientToken?: string;
  environmentId: string;
  vlanName: string;
  associationId: string;
}
export const DisassociateEipFromVlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    environmentId: S.String,
    vlanName: S.String,
    associationId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DisassociateEipFromVlanRequest",
}) as any as S.Schema<DisassociateEipFromVlanRequest>;
export interface DisassociateEipFromVlanResponse {
  vlan?: Vlan;
}
export const DisassociateEipFromVlanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vlan: S.optional(Vlan) }),
).annotate({
  identifier: "DisassociateEipFromVlanResponse",
}) as any as S.Schema<DisassociateEipFromVlanResponse>;
export interface GetDepotUrlRequest {
  environmentId: string;
  rotate?: boolean;
}
export const GetDepotUrlRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    rotate: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetDepotUrlRequest",
}) as any as S.Schema<GetDepotUrlRequest>;
export interface GetDepotUrlResponse {
  depotUrl: string;
  token: string;
}
export const GetDepotUrlResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ depotUrl: S.String, token: S.String }),
).annotate({
  identifier: "GetDepotUrlResponse",
}) as any as S.Schema<GetDepotUrlResponse>;
export interface GetEnvironmentRequest {
  environmentId: string;
}
export const GetEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ environmentId: S.String.pipe(T.HttpLabel("environmentId")) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetEnvironmentRequest",
}) as any as S.Schema<GetEnvironmentRequest>;
export interface GetEnvironmentResponse {
  environment?: Environment;
}
export const GetEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ environment: S.optional(Environment) }),
).annotate({
  identifier: "GetEnvironmentResponse",
}) as any as S.Schema<GetEnvironmentResponse>;
export interface GetVersionsRequest {}
export const GetVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetVersionsRequest",
}) as any as S.Schema<GetVersionsRequest>;
export type InstanceTypeList = InstanceType[];
export const InstanceTypeList = /*@__PURE__*/ S.Array(InstanceType);
export interface VcfVersionInfo {
  vcfVersion: VcfVersion;
  status: string;
  defaultEsxVersion: string;
  instanceTypes: InstanceType[];
}
export const VcfVersionInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vcfVersion: VcfVersion,
    status: S.String,
    defaultEsxVersion: S.String,
    instanceTypes: InstanceTypeList,
  }),
).annotate({ identifier: "VcfVersionInfo" }) as any as S.Schema<VcfVersionInfo>;
export type VcfVersionList = VcfVersionInfo[];
export const VcfVersionList = /*@__PURE__*/ S.Array(VcfVersionInfo);
export type EsxVersionList = string[];
export const EsxVersionList = /*@__PURE__*/ S.Array(S.String);
export interface InstanceTypeEsxVersionsInfo {
  instanceType: InstanceType;
  esxVersions: string[];
}
export const InstanceTypeEsxVersionsInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instanceType: InstanceType, esxVersions: EsxVersionList }),
).annotate({
  identifier: "InstanceTypeEsxVersionsInfo",
}) as any as S.Schema<InstanceTypeEsxVersionsInfo>;
export type InstanceTypeEsxVersionsList = InstanceTypeEsxVersionsInfo[];
export const InstanceTypeEsxVersionsList = /*@__PURE__*/ S.Array(
  InstanceTypeEsxVersionsInfo,
);
export interface GetVersionsResponse {
  vcfVersions: VcfVersionInfo[];
  instanceTypeEsxVersions: InstanceTypeEsxVersionsInfo[];
}
export const GetVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vcfVersions: VcfVersionList,
    instanceTypeEsxVersions: InstanceTypeEsxVersionsList,
  }),
).annotate({
  identifier: "GetVersionsResponse",
}) as any as S.Schema<GetVersionsResponse>;
export type PaginationToken = string;
export type MaxResults = number;
export interface ListEnvironmentConnectorsRequest {
  nextToken?: string;
  maxResults?: number;
  environmentId: string;
}
export const ListEnvironmentConnectorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListEnvironmentConnectorsRequest",
}) as any as S.Schema<ListEnvironmentConnectorsRequest>;
export type ConnectorList = Connector[];
export const ConnectorList = /*@__PURE__*/ S.Array(Connector);
export interface ListEnvironmentConnectorsResponse {
  nextToken?: string;
  connectors?: Connector[];
}
export const ListEnvironmentConnectorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    connectors: S.optional(ConnectorList),
  }),
).annotate({
  identifier: "ListEnvironmentConnectorsResponse",
}) as any as S.Schema<ListEnvironmentConnectorsResponse>;
export interface ListEnvironmentHostsRequest {
  nextToken?: string;
  maxResults?: number;
  environmentId: string;
}
export const ListEnvironmentHostsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListEnvironmentHostsRequest",
}) as any as S.Schema<ListEnvironmentHostsRequest>;
export type HostList = Host[];
export const HostList = /*@__PURE__*/ S.Array(Host);
export interface ListEnvironmentHostsResponse {
  nextToken?: string;
  environmentHosts?: Host[];
}
export const ListEnvironmentHostsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    environmentHosts: S.optional(HostList),
  }),
).annotate({
  identifier: "ListEnvironmentHostsResponse",
}) as any as S.Schema<ListEnvironmentHostsResponse>;
export type EnvironmentStateList = EnvironmentState[];
export const EnvironmentStateList = /*@__PURE__*/ S.Array(EnvironmentState);
export interface ListEnvironmentsRequest {
  nextToken?: string;
  maxResults?: number;
  state?: EnvironmentState[];
}
export const ListEnvironmentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    state: S.optional(EnvironmentStateList).pipe(T.HttpQuery("state")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListEnvironmentsRequest",
}) as any as S.Schema<ListEnvironmentsRequest>;
export type EnvironmentSummaryList = EnvironmentSummary[];
export const EnvironmentSummaryList = /*@__PURE__*/ S.Array(EnvironmentSummary);
export interface ListEnvironmentsResponse {
  nextToken?: string;
  environmentSummaries?: EnvironmentSummary[];
}
export const ListEnvironmentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    environmentSummaries: S.optional(EnvironmentSummaryList),
  }),
).annotate({
  identifier: "ListEnvironmentsResponse",
}) as any as S.Schema<ListEnvironmentsResponse>;
export interface ListEnvironmentVlansRequest {
  nextToken?: string;
  maxResults?: number;
  environmentId: string;
}
export const ListEnvironmentVlansRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListEnvironmentVlansRequest",
}) as any as S.Schema<ListEnvironmentVlansRequest>;
export type VlanList = Vlan[];
export const VlanList = /*@__PURE__*/ S.Array(Vlan);
export interface ListEnvironmentVlansResponse {
  nextToken?: string;
  environmentVlans?: Vlan[];
}
export const ListEnvironmentVlansResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    environmentVlans: S.optional(VlanList),
  }),
).annotate({
  identifier: "ListEnvironmentVlansResponse",
}) as any as S.Schema<ListEnvironmentVlansResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export type ResponseTagMap = { [key: string]: string | undefined };
export const ResponseTagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(ResponseTagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListVmEntitlementsRequest {
  nextToken?: string;
  maxResults?: number;
  environmentId: string;
  connectorId: string;
  entitlementType: EntitlementType;
}
export const ListVmEntitlementsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    environmentId: S.String,
    connectorId: S.String,
    entitlementType: EntitlementType,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListVmEntitlementsRequest",
}) as any as S.Schema<ListVmEntitlementsRequest>;
export interface ListVmEntitlementsResponse {
  nextToken?: string;
  entitlements?: VmEntitlement[];
}
export const ListVmEntitlementsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    entitlements: S.optional(VmEntitlementList),
  }),
).annotate({
  identifier: "ListVmEntitlementsResponse",
}) as any as S.Schema<ListVmEntitlementsResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tags: RequestTagMap }).pipe(
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
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tagKeys: TagKeys }).pipe(
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
export interface UpdateEnvironmentConnectorRequest {
  clientToken?: string;
  environmentId: string;
  connectorId: string;
  applianceFqdn?: string;
  secretIdentifier?: string;
}
export const UpdateEnvironmentConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    connectorId: S.String.pipe(T.HttpLabel("connectorId")),
    applianceFqdn: S.optional(S.String),
    secretIdentifier: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateEnvironmentConnectorRequest",
}) as any as S.Schema<UpdateEnvironmentConnectorRequest>;
export interface UpdateEnvironmentConnectorResponse {
  connector?: Connector;
}
export const UpdateEnvironmentConnectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ connector: S.optional(Connector) }),
).annotate({
  identifier: "UpdateEnvironmentConnectorResponse",
}) as any as S.Schema<UpdateEnvironmentConnectorResponse>;
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "other"
  | (string & {});
export const ValidationExceptionReason = S.String;

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
export type AssociateEipToVlanError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates an Elastic IP address with a public HCX VLAN. This operation is only allowed for public HCX VLANs at this time.
 */
export const associateEipToVlan: API.OperationMethod<
  AssociateEipToVlanRequest,
  AssociateEipToVlanResponse,
  AssociateEipToVlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateEipToVlanRequest,
  output: AssociateEipToVlanResponse,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateEipToVlan",
}));

export type CreateEntitlementError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Windows Server License entitlement for virtual machines in an Amazon EVS environment using the provided vCenter Server connector. This is an asynchronous operation. Amazon EVS validates the specified virtual machines before starting usage tracking.
 */
export const createEntitlement: API.OperationMethod<
  CreateEntitlementRequest,
  CreateEntitlementResponse,
  CreateEntitlementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEntitlementRequest,
  output: CreateEntitlementResponse,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEntitlement",
}));

export type CreateEnvironmentError = ValidationException | CommonErrors;
/**
 * Creates an Amazon EVS environment that runs VCF software, such as SDDC Manager, NSX Manager, and vCenter Server.
 *
 * When you specify `SELF_DEPLOYED` for `vcfVersion`, Amazon EVS provisions only the VLAN subnets; no hosts are added and no VCF installation is performed. After the environment is created, you can add hosts with `CreateEnvironmentHost` and install VCF yourself. The `licenseInfo`, `hosts`, `vcfHostnames`, `siteId`, and `connectivityInfo` parameters are not supported in this mode.
 *
 * When you specify any other VCF version, Amazon EVS installs and configures VCF for you. For more information, see Self-deployed mode in the *Amazon EVS User Guide*.
 *
 * When Amazon EVS installs VCF, the default ESX version for the selected VCF version will be used. After a host is added with a specific ESX version, it can only be upgraded using vCenter Lifecycle Manager.
 *
 * You cannot use the `dedicatedHostId` and `placementGroupId` parameters together in the same `CreateEnvironment` action. This results in a `ValidationException` response.
 */
export const createEnvironment: API.OperationMethod<
  CreateEnvironmentRequest,
  CreateEnvironmentResponse,
  CreateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEnvironmentRequest,
  output: CreateEnvironmentResponse,
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironment",
}));

export type CreateEnvironmentConnectorError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a connector for an Amazon EVS environment. A connector allows the Amazon EVS control plane to interface with VCF appliances using a fully qualified domain name.
 *
 * You can create only one connector of each type per environment. For environments where Amazon EVS installs VCF, the `SDDC_MANAGER` connector is created automatically.
 *
 * Amazon EVS requires an active connector to SDDC Manager or VCF Operations Manager to monitor environment health and license compliance.
 */
export const createEnvironmentConnector: API.OperationMethod<
  CreateEnvironmentConnectorRequest,
  CreateEnvironmentConnectorResponse,
  CreateEnvironmentConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEnvironmentConnectorRequest,
  output: CreateEnvironmentConnectorResponse,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironmentConnector",
}));

export type CreateEnvironmentHostError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an ESX host and adds it to an Amazon EVS environment.
 *
 * This action can only be used after the Amazon EVS environment is deployed.
 *
 * You can use the `dedicatedHostId` parameter to specify an Amazon EC2 Dedicated Host for ESX host creation.
 *
 * You can use the `placementGroupId` parameter to specify a cluster or partition placement group to launch EC2 instances into.
 *
 * If you don't specify an ESX version when adding hosts using `CreateEnvironmentHost` action, Amazon EVS automatically uses the default ESX version for your environment's VCF version. To find the available ESX versions for a particular VCF version, use the `GetVersions` action.
 *
 * You cannot use the `dedicatedHostId` and `placementGroupId` parameters together in the same `CreateEnvironmentHost` action. This results in a `ValidationException` response.
 */
export const createEnvironmentHost: API.OperationMethod<
  CreateEnvironmentHostRequest,
  CreateEnvironmentHostResponse,
  CreateEnvironmentHostError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEnvironmentHostRequest,
  output: CreateEnvironmentHostResponse,
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironmentHost",
}));

export type DeleteEntitlementError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Windows Server License entitlement for virtual machines in an Amazon EVS environment. Deleting an entitlement stops usage tracking for the specified virtual machines.
 */
export const deleteEntitlement: API.OperationMethod<
  DeleteEntitlementRequest,
  DeleteEntitlementResponse,
  DeleteEntitlementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEntitlementRequest,
  output: DeleteEntitlementResponse,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEntitlement",
}));

export type DeleteEnvironmentError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon EVS environment.
 *
 * Amazon EVS environments will only be enabled for deletion once the hosts are deleted. You can delete hosts using the `DeleteEnvironmentHost` action.
 *
 * Environment deletion also deletes the associated Amazon EVS VLAN subnets and Amazon Web Services Secrets Manager secrets that Amazon EVS created. Amazon Web Services resources that you create are not deleted. These resources may continue to incur costs.
 */
export const deleteEnvironment: API.OperationMethod<
  DeleteEnvironmentRequest,
  DeleteEnvironmentResponse,
  DeleteEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEnvironmentRequest,
  output: DeleteEnvironmentResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironment",
}));

export type DeleteEnvironmentConnectorError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a connector from an Amazon EVS environment.
 *
 * Before deleting a connector, you must remove all entitlements that are associated with the same vCenter.
 */
export const deleteEnvironmentConnector: API.OperationMethod<
  DeleteEnvironmentConnectorRequest,
  DeleteEnvironmentConnectorResponse,
  DeleteEnvironmentConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEnvironmentConnectorRequest,
  output: DeleteEnvironmentConnectorResponse,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironmentConnector",
}));

export type DeleteEnvironmentHostError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a host from an Amazon EVS environment.
 *
 * Before deleting a host, you must unassign and decommission the host from within the SDDC Manager user interface. Not doing so could impact the availability of your virtual machines or result in data loss.
 */
export const deleteEnvironmentHost: API.OperationMethod<
  DeleteEnvironmentHostRequest,
  DeleteEnvironmentHostResponse,
  DeleteEnvironmentHostError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEnvironmentHostRequest,
  output: DeleteEnvironmentHostResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironmentHost",
}));

export type DisassociateEipFromVlanError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates an Elastic IP address from a public HCX VLAN. This operation is only allowed for public HCX VLANs at this time.
 */
export const disassociateEipFromVlan: API.OperationMethod<
  DisassociateEipFromVlanRequest,
  DisassociateEipFromVlanResponse,
  DisassociateEipFromVlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateEipFromVlanRequest,
  output: DisassociateEipFromVlanResponse,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateEipFromVlan",
}));

export type GetDepotUrlError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a URL and authentication token for accessing the Amazon EVS Custom Addon depot. Configure the depot URL as a download source in vSphere Lifecycle Manager (vLCM) to sync and install the Amazon EVS Custom Addon.
 *
 * The depot URL remains active until you rotate the authentication token by calling this action with `rotate` set to `true`.
 */
export const getDepotUrl: API.OperationMethod<
  GetDepotUrlRequest,
  GetDepotUrlResponse,
  GetDepotUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDepotUrlRequest,
  output: GetDepotUrlResponse,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDepotUrl",
}));

export type GetEnvironmentError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a description of the specified environment.
 */
export const getEnvironment: API.OperationMethod<
  GetEnvironmentRequest,
  GetEnvironmentResponse,
  GetEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEnvironmentRequest,
  output: GetEnvironmentResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironment",
}));

export type GetVersionsError =
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns information about VCF versions, ESX versions and EC2 instance types provided by Amazon EVS. For each VCF version, the response also includes the default ESX version and provided EC2 instance types.
 */
export const getVersions: API.OperationMethod<
  GetVersionsRequest,
  GetVersionsResponse,
  GetVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetVersionsRequest,
  output: GetVersionsResponse,
  errors: [InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVersions",
}));

export type ListEnvironmentConnectorsError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the connectors within an environment. Returns the status of each connector and its applicable checks, among other connector details.
 */
export const listEnvironmentConnectors: API.PaginatedOperationMethod<
  ListEnvironmentConnectorsRequest,
  ListEnvironmentConnectorsResponse,
  ListEnvironmentConnectorsError,
  Credentials | HttpClient.HttpClient,
  Connector
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEnvironmentConnectorsRequest,
  output: ListEnvironmentConnectorsResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironmentConnectors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "connectors",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentHostsError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * List the hosts within an environment.
 */
export const listEnvironmentHosts: API.PaginatedOperationMethod<
  ListEnvironmentHostsRequest,
  ListEnvironmentHostsResponse,
  ListEnvironmentHostsError,
  Credentials | HttpClient.HttpClient,
  Host
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEnvironmentHostsRequest,
  output: ListEnvironmentHostsResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironmentHosts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "environmentHosts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentsError = ValidationException | CommonErrors;
/**
 * Lists the Amazon EVS environments in your Amazon Web Services account in the specified Amazon Web Services Region.
 */
export const listEnvironments: API.PaginatedOperationMethod<
  ListEnvironmentsRequest,
  ListEnvironmentsResponse,
  ListEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEnvironmentsRequest,
  output: ListEnvironmentsResponse,
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "environmentSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentVlansError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists environment VLANs that are associated with the specified environment.
 */
export const listEnvironmentVlans: API.PaginatedOperationMethod<
  ListEnvironmentVlansRequest,
  ListEnvironmentVlansResponse,
  ListEnvironmentVlansError,
  Credentials | HttpClient.HttpClient,
  Vlan
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEnvironmentVlansRequest,
  output: ListEnvironmentVlansResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironmentVlans",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "environmentVlans",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Lists the tags for an Amazon EVS resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListVmEntitlementsError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Windows Server License entitlements for virtual machines in an Amazon EVS environment. Returns existing entitlements for virtual machines associated with the specified environment and connector.
 */
export const listVmEntitlements: API.PaginatedOperationMethod<
  ListVmEntitlementsRequest,
  ListVmEntitlementsResponse,
  ListVmEntitlementsError,
  Credentials | HttpClient.HttpClient,
  VmEntitlement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListVmEntitlementsRequest,
  output: ListVmEntitlementsResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVmEntitlements",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "entitlements",
    pageSize: "maxResults",
  } as const,
})) as any;

export type TagResourceError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | TagPolicyException
  | TooManyTagsException
  | CommonErrors;
/**
 * Associates the specified tags to an Amazon EVS resource with the specified `resourceArn`. If existing tags on a resource are not specified in the request parameters, they aren't changed. When a resource is deleted, the tags associated with that resource are also deleted. Tags that you create for Amazon EVS resources don't propagate to any other resources associated with the environment. For example, if you tag an environment with this operation, that tag doesn't automatically propagate to the VLAN subnets and hosts associated with the environment.
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
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TagPolicyException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | ResourceNotFoundException
  | TagPolicyException
  | CommonErrors;
/**
 * Deletes specified tags from an Amazon EVS resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [ResourceNotFoundException, TagPolicyException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateEnvironmentConnectorError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a connector for an Amazon EVS environment. You can update the Amazon Web Services Secrets Manager secret ARN or the appliance FQDN to reconfigure the connector metadata.
 *
 * You cannot update both the secret and the FQDN in the same request.
 */
export const updateEnvironmentConnector: API.OperationMethod<
  UpdateEnvironmentConnectorRequest,
  UpdateEnvironmentConnectorResponse,
  UpdateEnvironmentConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEnvironmentConnectorRequest,
  output: UpdateEnvironmentConnectorResponse,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnvironmentConnector",
}));
