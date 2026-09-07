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
  sdkId: "EKS",
  serviceShapeName: "AWSWesleyFrontend",
});
const auth = T.AwsAuthSigv4({ name: "eks" });
const ver = T.ServiceVersion("2017-11-01");
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
              `https://eks-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws") {
              return e(`https://fips.eks.${Region}.amazonaws.com`);
            }
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://eks.${Region}.amazonaws.com`);
            }
            return e(
              `https://eks-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://eks.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://eks.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ClientException
  extends /*@__PURE__*/ S.TaggedError<ClientException>()(
    "ClientException",
    {
      clusterName: S.optional(S.String),
      nodegroupName: S.optional(S.String),
      addonName: S.optional(S.String),
      subscriptionId: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    {
      clusterName: S.optional(S.String),
      nodegroupName: S.optional(S.String),
      fargateProfileName: S.optional(S.String),
      addonName: S.optional(S.String),
      subscriptionId: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    {
      clusterName: S.optional(S.String),
      nodegroupName: S.optional(S.String),
      addonName: S.optional(S.String),
      subscriptionId: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidStateException>()(
    "InvalidStateException",
    {
      clusterName: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    {
      clusterName: S.optional(S.String),
      nodegroupName: S.optional(S.String),
      addonName: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceLimitExceededException>()(
    "ResourceLimitExceededException",
    {
      clusterName: S.optional(S.String),
      nodegroupName: S.optional(S.String),
      subscriptionId: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      clusterName: S.optional(S.String),
      nodegroupName: S.optional(S.String),
      fargateProfileName: S.optional(S.String),
      addonName: S.optional(S.String),
      subscriptionId: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourcePropagationDelayException
  extends /*@__PURE__*/ S.TaggedError<ResourcePropagationDelayException>()(
    "ResourcePropagationDelayException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(428),
  ) {}
export class ServerException
  extends /*@__PURE__*/ S.TaggedError<ServerException>()(
    "ServerException",
    {
      clusterName: S.optional(S.String),
      nodegroupName: S.optional(S.String),
      addonName: S.optional(S.String),
      subscriptionId: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      clusterName: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnsupportedAvailabilityZoneException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedAvailabilityZoneException>()(
    "UnsupportedAvailabilityZoneException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      clusterName: S.optional(S.String),
      nodegroupName: S.optional(S.String),
      validZones: S.optional(
        S.suspend(() => StringList).annotate({ identifier: "StringList" }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type AccessScopeType = "cluster" | "namespace" | (string & {});
export const AccessScopeType = /*@__PURE__*/ S.String;

export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface AccessScope {
  type?: AccessScopeType;
  namespaces?: string[];
}
export const AccessScope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(AccessScopeType),
    namespaces: S.optional(StringList),
  }),
).annotate({ identifier: "AccessScope" }) as any as S.Schema<AccessScope>;
export interface AssociateAccessPolicyRequest {
  clusterName: string;
  principalArn: string;
  policyArn: string;
  accessScope: AccessScope;
}
export const AssociateAccessPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    principalArn: S.String.pipe(T.HttpLabel("principalArn")),
    policyArn: S.String,
    accessScope: AccessScope,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/clusters/{clusterName}/access-entries/{principalArn}/access-policies",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateAccessPolicyRequest",
}) as any as S.Schema<AssociateAccessPolicyRequest>;
export interface AssociatedAccessPolicy {
  policyArn?: string;
  accessScope?: AccessScope;
  associatedAt?: Date;
  modifiedAt?: Date;
}
export const AssociatedAccessPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyArn: S.optional(S.String),
    accessScope: S.optional(AccessScope),
    associatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "AssociatedAccessPolicy",
}) as any as S.Schema<AssociatedAccessPolicy>;
export interface AssociateAccessPolicyResponse {
  clusterName?: string;
  principalArn?: string;
  associatedAccessPolicy?: AssociatedAccessPolicy;
}
export const AssociateAccessPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.optional(S.String),
    principalArn: S.optional(S.String),
    associatedAccessPolicy: S.optional(AssociatedAccessPolicy),
  }),
).annotate({
  identifier: "AssociateAccessPolicyResponse",
}) as any as S.Schema<AssociateAccessPolicyResponse>;
export interface Provider {
  keyArn?: string;
}
export const Provider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ keyArn: S.optional(S.String) }),
).annotate({ identifier: "Provider" }) as any as S.Schema<Provider>;
export interface EncryptionConfig {
  resources?: string[];
  provider?: Provider;
}
export const EncryptionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resources: S.optional(StringList),
    provider: S.optional(Provider),
  }),
).annotate({
  identifier: "EncryptionConfig",
}) as any as S.Schema<EncryptionConfig>;
export type EncryptionConfigList = EncryptionConfig[];
export const EncryptionConfigList = /*@__PURE__*/ S.Array(EncryptionConfig);
export interface AssociateEncryptionConfigRequest {
  clusterName: string;
  encryptionConfig: EncryptionConfig[];
  clientRequestToken?: string;
}
export const AssociateEncryptionConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    encryptionConfig: EncryptionConfigList,
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/clusters/{clusterName}/encryption-config/associate",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateEncryptionConfigRequest",
}) as any as S.Schema<AssociateEncryptionConfigRequest>;
export type UpdateStatus =
  | "InProgress"
  | "Failed"
  | "Cancelled"
  | "Successful"
  | (string & {});
export const UpdateStatus = /*@__PURE__*/ S.String;

export type UpdateType =
  | "VersionUpdate"
  | "EndpointAccessUpdate"
  | "LoggingUpdate"
  | "ConfigUpdate"
  | "AssociateIdentityProviderConfig"
  | "DisassociateIdentityProviderConfig"
  | "AssociateEncryptionConfig"
  | "AddonUpdate"
  | "VpcConfigUpdate"
  | "AccessConfigUpdate"
  | "UpgradePolicyUpdate"
  | "ZonalShiftConfigUpdate"
  | "AutoModeUpdate"
  | "RemoteNetworkConfigUpdate"
  | "DeletionProtectionUpdate"
  | "CapabilityUpdate"
  | "ControlPlaneScalingConfigUpdate"
  | "VendedLogsUpdate"
  | "ControlPlaneEgressUpdate"
  | (string & {});
export const UpdateType = /*@__PURE__*/ S.String;

export type UpdateParamType =
  | "Version"
  | "PlatformVersion"
  | "EndpointPrivateAccess"
  | "EndpointPublicAccess"
  | "ClusterLogging"
  | "DesiredSize"
  | "LabelsToAdd"
  | "LabelsToRemove"
  | "TaintsToAdd"
  | "TaintsToRemove"
  | "MaxSize"
  | "MinSize"
  | "ReleaseVersion"
  | "PublicAccessCidrs"
  | "LaunchTemplateName"
  | "LaunchTemplateVersion"
  | "IdentityProviderConfig"
  | "EncryptionConfig"
  | "AddonVersion"
  | "ServiceAccountRoleArn"
  | "ResolveConflicts"
  | "MaxUnavailable"
  | "MaxUnavailablePercentage"
  | "NodeRepairEnabled"
  | "UpdateStrategy"
  | "ConfigurationValues"
  | "SecurityGroups"
  | "Subnets"
  | "AuthenticationMode"
  | "PodIdentityAssociations"
  | "UpgradePolicy"
  | "ZonalShiftConfig"
  | "ComputeConfig"
  | "StorageConfig"
  | "KubernetesNetworkConfig"
  | "RemoteNetworkConfig"
  | "DeletionProtection"
  | "NodeRepairConfig"
  | "RoleArn"
  | "RoleMappingsToAddOrUpdate"
  | "RoleMappingsToRemove"
  | "NetworkAccess"
  | "VendedLogs"
  | "UpdatedTier"
  | "PreviousTier"
  | "WarmPoolEnabled"
  | "WarmPoolMaxGroupPreparedCapacity"
  | "WarmPoolMinSize"
  | "WarmPoolState"
  | "WarmPoolReuseOnScaleIn"
  | "ControlPlaneEgressMode"
  | (string & {});
export const UpdateParamType = /*@__PURE__*/ S.String;

export interface UpdateParam {
  type?: UpdateParamType;
  value?: string;
}
export const UpdateParam = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: S.optional(UpdateParamType), value: S.optional(S.String) }),
).annotate({ identifier: "UpdateParam" }) as any as S.Schema<UpdateParam>;
export type UpdateParams = UpdateParam[];
export const UpdateParams = /*@__PURE__*/ S.Array(UpdateParam);
export type ErrorCode =
  | "SubnetNotFound"
  | "SecurityGroupNotFound"
  | "EniLimitReached"
  | "IpNotAvailable"
  | "AccessDenied"
  | "OperationNotPermitted"
  | "VpcIdNotFound"
  | "Unknown"
  | "NodeCreationFailure"
  | "PodEvictionFailure"
  | "InsufficientFreeAddresses"
  | "ClusterUnreachable"
  | "InsufficientNumberOfReplicas"
  | "ConfigurationConflict"
  | "AdmissionRequestDenied"
  | "UnsupportedAddonModification"
  | "K8sResourceNotFound"
  | (string & {});
export const ErrorCode = /*@__PURE__*/ S.String;

export interface ErrorDetail {
  errorCode?: ErrorCode;
  errorMessage?: string;
  resourceIds?: string[];
}
export const ErrorDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    errorCode: S.optional(ErrorCode),
    errorMessage: S.optional(S.String),
    resourceIds: S.optional(StringList),
  }),
).annotate({ identifier: "ErrorDetail" }) as any as S.Schema<ErrorDetail>;
export type ErrorDetails = ErrorDetail[];
export const ErrorDetails = /*@__PURE__*/ S.Array(ErrorDetail);
export interface Update {
  id?: string;
  status?: UpdateStatus;
  type?: UpdateType;
  params?: UpdateParam[];
  createdAt?: Date;
  errors?: ErrorDetail[];
}
export const Update = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    status: S.optional(UpdateStatus),
    type: S.optional(UpdateType),
    params: S.optional(UpdateParams),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    errors: S.optional(ErrorDetails),
  }),
).annotate({ identifier: "Update" }) as any as S.Schema<Update>;
export interface AssociateEncryptionConfigResponse {
  update?: Update;
}
export const AssociateEncryptionConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ update: S.optional(Update) }),
).annotate({
  identifier: "AssociateEncryptionConfigResponse",
}) as any as S.Schema<AssociateEncryptionConfigResponse>;
export type RequiredClaimsKey = string;
export type RequiredClaimsValue = string;
export type RequiredClaimsMap = { [key: string]: string | undefined };
export const RequiredClaimsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface OidcIdentityProviderConfigRequest {
  identityProviderConfigName: string;
  issuerUrl: string;
  clientId: string;
  usernameClaim?: string;
  usernamePrefix?: string;
  groupsClaim?: string;
  groupsPrefix?: string;
  requiredClaims?: { [key: string]: string | undefined };
}
export const OidcIdentityProviderConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identityProviderConfigName: S.String,
    issuerUrl: S.String,
    clientId: S.String,
    usernameClaim: S.optional(S.String),
    usernamePrefix: S.optional(S.String),
    groupsClaim: S.optional(S.String),
    groupsPrefix: S.optional(S.String),
    requiredClaims: S.optional(RequiredClaimsMap),
  }),
).annotate({
  identifier: "OidcIdentityProviderConfigRequest",
}) as any as S.Schema<OidcIdentityProviderConfigRequest>;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface AssociateIdentityProviderConfigRequest {
  clusterName: string;
  oidc: OidcIdentityProviderConfigRequest;
  tags?: { [key: string]: string | undefined };
  clientRequestToken?: string;
}
export const AssociateIdentityProviderConfigRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      clusterName: S.String.pipe(T.HttpLabel("clusterName")),
      oidc: OidcIdentityProviderConfigRequest,
      tags: S.optional(TagMap),
      clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/clusters/{clusterName}/identity-provider-configs/associate",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AssociateIdentityProviderConfigRequest",
}) as any as S.Schema<AssociateIdentityProviderConfigRequest>;
export interface AssociateIdentityProviderConfigResponse {
  update?: Update;
  tags?: { [key: string]: string | undefined };
}
export const AssociateIdentityProviderConfigResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ update: S.optional(Update), tags: S.optional(TagMap) }),
).annotate({
  identifier: "AssociateIdentityProviderConfigResponse",
}) as any as S.Schema<AssociateIdentityProviderConfigResponse>;
export interface CreateAccessEntryRequest {
  clusterName: string;
  principalArn: string;
  kubernetesGroups?: string[];
  tags?: { [key: string]: string | undefined };
  clientRequestToken?: string;
  username?: string;
  type?: string;
}
export const CreateAccessEntryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    principalArn: S.String,
    kubernetesGroups: S.optional(StringList),
    tags: S.optional(TagMap),
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    username: S.optional(S.String),
    type: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/clusters/{clusterName}/access-entries" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAccessEntryRequest",
}) as any as S.Schema<CreateAccessEntryRequest>;
export interface AccessEntry {
  clusterName?: string;
  principalArn?: string;
  kubernetesGroups?: string[];
  accessEntryArn?: string;
  createdAt?: Date;
  modifiedAt?: Date;
  tags?: { [key: string]: string | undefined };
  username?: string;
  type?: string;
}
export const AccessEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.optional(S.String),
    principalArn: S.optional(S.String),
    kubernetesGroups: S.optional(StringList),
    accessEntryArn: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    tags: S.optional(TagMap),
    username: S.optional(S.String),
    type: S.optional(S.String),
  }),
).annotate({ identifier: "AccessEntry" }) as any as S.Schema<AccessEntry>;
export interface CreateAccessEntryResponse {
  accessEntry?: AccessEntry;
}
export const CreateAccessEntryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accessEntry: S.optional(AccessEntry) }),
).annotate({
  identifier: "CreateAccessEntryResponse",
}) as any as S.Schema<CreateAccessEntryResponse>;
export type ClusterName = string;
export type RoleArn = string;
export type ResolveConflicts =
  | "OVERWRITE"
  | "NONE"
  | "PRESERVE"
  | (string & {});
export const ResolveConflicts = /*@__PURE__*/ S.String;

export interface AddonPodIdentityAssociations {
  serviceAccount: string;
  roleArn: string;
}
export const AddonPodIdentityAssociations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceAccount: S.String, roleArn: S.String }),
).annotate({
  identifier: "AddonPodIdentityAssociations",
}) as any as S.Schema<AddonPodIdentityAssociations>;
export type AddonPodIdentityAssociationsList = AddonPodIdentityAssociations[];
export const AddonPodIdentityAssociationsList = /*@__PURE__*/ S.Array(
  AddonPodIdentityAssociations,
);
export type Namespace = string;
export interface AddonNamespaceConfigRequest {
  namespace?: string;
}
export const AddonNamespaceConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ namespace: S.optional(S.String) }),
).annotate({
  identifier: "AddonNamespaceConfigRequest",
}) as any as S.Schema<AddonNamespaceConfigRequest>;
export interface CreateAddonRequest {
  clusterName: string;
  addonName: string;
  addonVersion?: string;
  serviceAccountRoleArn?: string;
  resolveConflicts?: ResolveConflicts;
  clientRequestToken?: string;
  tags?: { [key: string]: string | undefined };
  configurationValues?: string;
  podIdentityAssociations?: AddonPodIdentityAssociations[];
  namespaceConfig?: AddonNamespaceConfigRequest;
}
export const CreateAddonRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    addonName: S.String,
    addonVersion: S.optional(S.String),
    serviceAccountRoleArn: S.optional(S.String),
    resolveConflicts: S.optional(ResolveConflicts),
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
    configurationValues: S.optional(S.String),
    podIdentityAssociations: S.optional(AddonPodIdentityAssociationsList),
    namespaceConfig: S.optional(AddonNamespaceConfigRequest),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/clusters/{clusterName}/addons" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAddonRequest",
}) as any as S.Schema<CreateAddonRequest>;
export type AddonStatus =
  | "CREATING"
  | "ACTIVE"
  | "CREATE_FAILED"
  | "UPDATING"
  | "DELETING"
  | "DELETE_FAILED"
  | "DEGRADED"
  | "UPDATE_FAILED"
  | (string & {});
export const AddonStatus = /*@__PURE__*/ S.String;

export type AddonIssueCode =
  | "AccessDenied"
  | "InternalFailure"
  | "ClusterUnreachable"
  | "InsufficientNumberOfReplicas"
  | "ConfigurationConflict"
  | "AdmissionRequestDenied"
  | "UnsupportedAddonModification"
  | "K8sResourceNotFound"
  | "AddonSubscriptionNeeded"
  | "AddonPermissionFailure"
  | (string & {});
export const AddonIssueCode = /*@__PURE__*/ S.String;

export interface AddonIssue {
  code?: AddonIssueCode;
  message?: string;
  resourceIds?: string[];
}
export const AddonIssue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    code: S.optional(AddonIssueCode),
    message: S.optional(S.String),
    resourceIds: S.optional(StringList),
  }),
).annotate({ identifier: "AddonIssue" }) as any as S.Schema<AddonIssue>;
export type AddonIssueList = AddonIssue[];
export const AddonIssueList = /*@__PURE__*/ S.Array(AddonIssue);
export interface AddonHealth {
  issues?: AddonIssue[];
}
export const AddonHealth = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ issues: S.optional(AddonIssueList) }),
).annotate({ identifier: "AddonHealth" }) as any as S.Schema<AddonHealth>;
export interface MarketplaceInformation {
  productId?: string;
  productUrl?: string;
}
export const MarketplaceInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    productId: S.optional(S.String),
    productUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "MarketplaceInformation",
}) as any as S.Schema<MarketplaceInformation>;
export interface AddonNamespaceConfigResponse {
  namespace?: string;
}
export const AddonNamespaceConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ namespace: S.optional(S.String) }),
).annotate({
  identifier: "AddonNamespaceConfigResponse",
}) as any as S.Schema<AddonNamespaceConfigResponse>;
export interface Addon {
  addonName?: string;
  clusterName?: string;
  status?: AddonStatus;
  addonVersion?: string;
  health?: AddonHealth;
  addonArn?: string;
  createdAt?: Date;
  modifiedAt?: Date;
  serviceAccountRoleArn?: string;
  tags?: { [key: string]: string | undefined };
  publisher?: string;
  owner?: string;
  marketplaceInformation?: MarketplaceInformation;
  configurationValues?: string;
  podIdentityAssociations?: string[];
  namespaceConfig?: AddonNamespaceConfigResponse;
}
export const Addon = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    addonName: S.optional(S.String),
    clusterName: S.optional(S.String),
    status: S.optional(AddonStatus),
    addonVersion: S.optional(S.String),
    health: S.optional(AddonHealth),
    addonArn: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    serviceAccountRoleArn: S.optional(S.String),
    tags: S.optional(TagMap),
    publisher: S.optional(S.String),
    owner: S.optional(S.String),
    marketplaceInformation: S.optional(MarketplaceInformation),
    configurationValues: S.optional(S.String),
    podIdentityAssociations: S.optional(StringList),
    namespaceConfig: S.optional(AddonNamespaceConfigResponse),
  }),
).annotate({ identifier: "Addon" }) as any as S.Schema<Addon>;
export interface CreateAddonResponse {
  addon?: Addon;
}
export const CreateAddonResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ addon: S.optional(Addon) }),
).annotate({
  identifier: "CreateAddonResponse",
}) as any as S.Schema<CreateAddonResponse>;
export type CapabilityType = "ACK" | "KRO" | "ARGOCD" | (string & {});
export const CapabilityType = /*@__PURE__*/ S.String;

export interface ArgoCdAwsIdcConfigRequest {
  idcInstanceArn: string;
  idcRegion?: string;
}
export const ArgoCdAwsIdcConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ idcInstanceArn: S.String, idcRegion: S.optional(S.String) }),
).annotate({
  identifier: "ArgoCdAwsIdcConfigRequest",
}) as any as S.Schema<ArgoCdAwsIdcConfigRequest>;
export type ArgoCdRole = "ADMIN" | "EDITOR" | "VIEWER" | (string & {});
export const ArgoCdRole = /*@__PURE__*/ S.String;

export type SsoIdentityType = "SSO_USER" | "SSO_GROUP" | (string & {});
export const SsoIdentityType = /*@__PURE__*/ S.String;

export interface SsoIdentity {
  id: string;
  type: SsoIdentityType;
}
export const SsoIdentity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String, type: SsoIdentityType }),
).annotate({ identifier: "SsoIdentity" }) as any as S.Schema<SsoIdentity>;
export type SsoIdentityList = SsoIdentity[];
export const SsoIdentityList = /*@__PURE__*/ S.Array(SsoIdentity);
export interface ArgoCdRoleMapping {
  role: ArgoCdRole;
  identities: SsoIdentity[];
}
export const ArgoCdRoleMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ role: ArgoCdRole, identities: SsoIdentityList }),
).annotate({
  identifier: "ArgoCdRoleMapping",
}) as any as S.Schema<ArgoCdRoleMapping>;
export type ArgoCdRoleMappingList = ArgoCdRoleMapping[];
export const ArgoCdRoleMappingList = /*@__PURE__*/ S.Array(ArgoCdRoleMapping);
export interface ArgoCdNetworkAccessConfigRequest {
  vpceIds?: string[];
}
export const ArgoCdNetworkAccessConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vpceIds: S.optional(StringList) }),
).annotate({
  identifier: "ArgoCdNetworkAccessConfigRequest",
}) as any as S.Schema<ArgoCdNetworkAccessConfigRequest>;
export interface ArgoCdConfigRequest {
  namespace?: string;
  awsIdc: ArgoCdAwsIdcConfigRequest;
  rbacRoleMappings?: ArgoCdRoleMapping[];
  networkAccess?: ArgoCdNetworkAccessConfigRequest;
}
export const ArgoCdConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    namespace: S.optional(S.String),
    awsIdc: ArgoCdAwsIdcConfigRequest,
    rbacRoleMappings: S.optional(ArgoCdRoleMappingList),
    networkAccess: S.optional(ArgoCdNetworkAccessConfigRequest),
  }),
).annotate({
  identifier: "ArgoCdConfigRequest",
}) as any as S.Schema<ArgoCdConfigRequest>;
export interface CapabilityConfigurationRequest {
  argoCd?: ArgoCdConfigRequest;
}
export const CapabilityConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ argoCd: S.optional(ArgoCdConfigRequest) }),
).annotate({
  identifier: "CapabilityConfigurationRequest",
}) as any as S.Schema<CapabilityConfigurationRequest>;
export type CapabilityDeletePropagationPolicy = "RETAIN" | (string & {});
export const CapabilityDeletePropagationPolicy = /*@__PURE__*/ S.String;

export interface CreateCapabilityRequest {
  capabilityName: string;
  clusterName: string;
  clientRequestToken?: string;
  type: CapabilityType;
  roleArn: string;
  configuration?: CapabilityConfigurationRequest;
  tags?: { [key: string]: string | undefined };
  deletePropagationPolicy: CapabilityDeletePropagationPolicy;
}
export const CreateCapabilityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capabilityName: S.String,
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    type: CapabilityType,
    roleArn: S.String,
    configuration: S.optional(CapabilityConfigurationRequest),
    tags: S.optional(TagMap),
    deletePropagationPolicy: CapabilityDeletePropagationPolicy,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/clusters/{clusterName}/capabilities" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCapabilityRequest",
}) as any as S.Schema<CreateCapabilityRequest>;
export type CapabilityStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "UPDATING"
  | "DELETING"
  | "DELETE_FAILED"
  | "ACTIVE"
  | "DEGRADED"
  | (string & {});
export const CapabilityStatus = /*@__PURE__*/ S.String;

export interface ArgoCdAwsIdcConfigResponse {
  idcInstanceArn?: string;
  idcRegion?: string;
  idcManagedApplicationArn?: string;
}
export const ArgoCdAwsIdcConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    idcInstanceArn: S.optional(S.String),
    idcRegion: S.optional(S.String),
    idcManagedApplicationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ArgoCdAwsIdcConfigResponse",
}) as any as S.Schema<ArgoCdAwsIdcConfigResponse>;
export interface ArgoCdNetworkAccessConfigResponse {
  vpceIds?: string[];
}
export const ArgoCdNetworkAccessConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vpceIds: S.optional(StringList) }),
).annotate({
  identifier: "ArgoCdNetworkAccessConfigResponse",
}) as any as S.Schema<ArgoCdNetworkAccessConfigResponse>;
export interface ArgoCdConfigResponse {
  namespace?: string;
  awsIdc?: ArgoCdAwsIdcConfigResponse;
  rbacRoleMappings?: ArgoCdRoleMapping[];
  networkAccess?: ArgoCdNetworkAccessConfigResponse;
  serverUrl?: string;
}
export const ArgoCdConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    namespace: S.optional(S.String),
    awsIdc: S.optional(ArgoCdAwsIdcConfigResponse),
    rbacRoleMappings: S.optional(ArgoCdRoleMappingList),
    networkAccess: S.optional(ArgoCdNetworkAccessConfigResponse),
    serverUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "ArgoCdConfigResponse",
}) as any as S.Schema<ArgoCdConfigResponse>;
export interface CapabilityConfigurationResponse {
  argoCd?: ArgoCdConfigResponse;
}
export const CapabilityConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ argoCd: S.optional(ArgoCdConfigResponse) }),
).annotate({
  identifier: "CapabilityConfigurationResponse",
}) as any as S.Schema<CapabilityConfigurationResponse>;
export type CapabilityIssueCode =
  | "AccessDenied"
  | "ClusterUnreachable"
  | (string & {});
export const CapabilityIssueCode = /*@__PURE__*/ S.String;

export interface CapabilityIssue {
  code?: CapabilityIssueCode;
  message?: string;
}
export const CapabilityIssue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    code: S.optional(CapabilityIssueCode),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "CapabilityIssue",
}) as any as S.Schema<CapabilityIssue>;
export type CapabilityIssueList = CapabilityIssue[];
export const CapabilityIssueList = /*@__PURE__*/ S.Array(CapabilityIssue);
export interface CapabilityHealth {
  issues?: CapabilityIssue[];
}
export const CapabilityHealth = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ issues: S.optional(CapabilityIssueList) }),
).annotate({
  identifier: "CapabilityHealth",
}) as any as S.Schema<CapabilityHealth>;
export interface Capability {
  capabilityName?: string;
  arn?: string;
  clusterName?: string;
  type?: CapabilityType;
  roleArn?: string;
  status?: CapabilityStatus;
  version?: string;
  configuration?: CapabilityConfigurationResponse;
  tags?: { [key: string]: string | undefined };
  health?: CapabilityHealth;
  createdAt?: Date;
  modifiedAt?: Date;
  deletePropagationPolicy?: CapabilityDeletePropagationPolicy;
}
export const Capability = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capabilityName: S.optional(S.String),
    arn: S.optional(S.String),
    clusterName: S.optional(S.String),
    type: S.optional(CapabilityType),
    roleArn: S.optional(S.String),
    status: S.optional(CapabilityStatus),
    version: S.optional(S.String),
    configuration: S.optional(CapabilityConfigurationResponse),
    tags: S.optional(TagMap),
    health: S.optional(CapabilityHealth),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    deletePropagationPolicy: S.optional(CapabilityDeletePropagationPolicy),
  }),
).annotate({ identifier: "Capability" }) as any as S.Schema<Capability>;
export interface CreateCapabilityResponse {
  capability?: Capability;
}
export const CreateCapabilityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ capability: S.optional(Capability) }),
).annotate({
  identifier: "CreateCapabilityResponse",
}) as any as S.Schema<CreateCapabilityResponse>;
export type BoxedBoolean = boolean;
export type ControlPlaneEgressModeType =
  | "AWS_MANAGED"
  | "CUSTOMER_ROUTED"
  | "CUSTOMER_ISOLATED"
  | (string & {});
export const ControlPlaneEgressModeType = /*@__PURE__*/ S.String;

export interface VpcConfigRequest {
  subnetIds?: string[];
  securityGroupIds?: string[];
  endpointPublicAccess?: boolean;
  endpointPrivateAccess?: boolean;
  publicAccessCidrs?: string[];
  controlPlaneEgressMode?: ControlPlaneEgressModeType;
}
export const VpcConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subnetIds: S.optional(StringList),
    securityGroupIds: S.optional(StringList),
    endpointPublicAccess: S.optional(S.Boolean),
    endpointPrivateAccess: S.optional(S.Boolean),
    publicAccessCidrs: S.optional(StringList),
    controlPlaneEgressMode: S.optional(ControlPlaneEgressModeType),
  }),
).annotate({
  identifier: "VpcConfigRequest",
}) as any as S.Schema<VpcConfigRequest>;
export type IpFamily = "ipv4" | "ipv6" | (string & {});
export const IpFamily = /*@__PURE__*/ S.String;

export interface ElasticLoadBalancing {
  enabled?: boolean;
}
export const ElasticLoadBalancing = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "ElasticLoadBalancing",
}) as any as S.Schema<ElasticLoadBalancing>;
export interface KubernetesNetworkConfigRequest {
  serviceIpv4Cidr?: string;
  ipFamily?: IpFamily;
  elasticLoadBalancing?: ElasticLoadBalancing;
}
export const KubernetesNetworkConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceIpv4Cidr: S.optional(S.String),
    ipFamily: S.optional(IpFamily),
    elasticLoadBalancing: S.optional(ElasticLoadBalancing),
  }),
).annotate({
  identifier: "KubernetesNetworkConfigRequest",
}) as any as S.Schema<KubernetesNetworkConfigRequest>;
export type LogType =
  | "api"
  | "audit"
  | "authenticator"
  | "controllerManager"
  | "scheduler"
  | (string & {});
export const LogType = /*@__PURE__*/ S.String;

export type LogTypes = LogType[];
export const LogTypes = /*@__PURE__*/ S.Array(LogType);
export interface LogSetup {
  types?: LogType[];
  enabled?: boolean;
}
export const LogSetup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ types: S.optional(LogTypes), enabled: S.optional(S.Boolean) }),
).annotate({ identifier: "LogSetup" }) as any as S.Schema<LogSetup>;
export type LogSetups = LogSetup[];
export const LogSetups = /*@__PURE__*/ S.Array(LogSetup);
export interface Logging {
  clusterLogging?: LogSetup[];
}
export const Logging = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ clusterLogging: S.optional(LogSetups) }),
).annotate({ identifier: "Logging" }) as any as S.Schema<Logging>;
export type SpreadLevel = "host" | "rack" | (string & {});
export const SpreadLevel = /*@__PURE__*/ S.String;

export interface ControlPlanePlacementRequest {
  groupName?: string;
  spreadLevel?: SpreadLevel;
}
export const ControlPlanePlacementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    groupName: S.optional(S.String),
    spreadLevel: S.optional(SpreadLevel),
  }),
).annotate({
  identifier: "ControlPlanePlacementRequest",
}) as any as S.Schema<ControlPlanePlacementRequest>;
export interface EtcdPlacementRequest {
  spreadLevel?: SpreadLevel;
}
export const EtcdPlacementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ spreadLevel: S.optional(SpreadLevel) }),
).annotate({
  identifier: "EtcdPlacementRequest",
}) as any as S.Schema<EtcdPlacementRequest>;
export interface OutpostConfigRequest {
  outpostArns: string[];
  controlPlaneInstanceType: string;
  controlPlanePlacement?: ControlPlanePlacementRequest;
  etcdInstanceType?: string;
  etcdPlacement?: EtcdPlacementRequest;
}
export const OutpostConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    outpostArns: StringList,
    controlPlaneInstanceType: S.String,
    controlPlanePlacement: S.optional(ControlPlanePlacementRequest),
    etcdInstanceType: S.optional(S.String),
    etcdPlacement: S.optional(EtcdPlacementRequest),
  }),
).annotate({
  identifier: "OutpostConfigRequest",
}) as any as S.Schema<OutpostConfigRequest>;
export type AuthenticationMode =
  | "API"
  | "API_AND_CONFIG_MAP"
  | "CONFIG_MAP"
  | (string & {});
export const AuthenticationMode = /*@__PURE__*/ S.String;

export interface CreateAccessConfigRequest {
  bootstrapClusterCreatorAdminPermissions?: boolean;
  authenticationMode?: AuthenticationMode;
}
export const CreateAccessConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bootstrapClusterCreatorAdminPermissions: S.optional(S.Boolean),
    authenticationMode: S.optional(AuthenticationMode),
  }),
).annotate({
  identifier: "CreateAccessConfigRequest",
}) as any as S.Schema<CreateAccessConfigRequest>;
export type SupportType = "STANDARD" | "EXTENDED" | (string & {});
export const SupportType = /*@__PURE__*/ S.String;

export interface UpgradePolicyRequest {
  supportType?: SupportType;
}
export const UpgradePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ supportType: S.optional(SupportType) }),
).annotate({
  identifier: "UpgradePolicyRequest",
}) as any as S.Schema<UpgradePolicyRequest>;
export interface ZonalShiftConfigRequest {
  enabled?: boolean;
}
export const ZonalShiftConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "ZonalShiftConfigRequest",
}) as any as S.Schema<ZonalShiftConfigRequest>;
export interface RemoteNodeNetwork {
  cidrs?: string[];
}
export const RemoteNodeNetwork = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cidrs: S.optional(StringList) }),
).annotate({
  identifier: "RemoteNodeNetwork",
}) as any as S.Schema<RemoteNodeNetwork>;
export type RemoteNodeNetworkList = RemoteNodeNetwork[];
export const RemoteNodeNetworkList = /*@__PURE__*/ S.Array(RemoteNodeNetwork);
export interface RemotePodNetwork {
  cidrs?: string[];
}
export const RemotePodNetwork = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cidrs: S.optional(StringList) }),
).annotate({
  identifier: "RemotePodNetwork",
}) as any as S.Schema<RemotePodNetwork>;
export type RemotePodNetworkList = RemotePodNetwork[];
export const RemotePodNetworkList = /*@__PURE__*/ S.Array(RemotePodNetwork);
export interface RemoteNetworkConfigRequest {
  remoteNodeNetworks?: RemoteNodeNetwork[];
  remotePodNetworks?: RemotePodNetwork[];
}
export const RemoteNetworkConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    remoteNodeNetworks: S.optional(RemoteNodeNetworkList),
    remotePodNetworks: S.optional(RemotePodNetworkList),
  }),
).annotate({
  identifier: "RemoteNetworkConfigRequest",
}) as any as S.Schema<RemoteNetworkConfigRequest>;
export interface ComputeConfigRequest {
  enabled?: boolean;
  nodePools?: string[];
  nodeRoleArn?: string;
}
export const ComputeConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.optional(S.Boolean),
    nodePools: S.optional(StringList),
    nodeRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ComputeConfigRequest",
}) as any as S.Schema<ComputeConfigRequest>;
export interface BlockStorage {
  enabled?: boolean;
}
export const BlockStorage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enabled: S.optional(S.Boolean) }),
).annotate({ identifier: "BlockStorage" }) as any as S.Schema<BlockStorage>;
export interface StorageConfigRequest {
  blockStorage?: BlockStorage;
}
export const StorageConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ blockStorage: S.optional(BlockStorage) }),
).annotate({
  identifier: "StorageConfigRequest",
}) as any as S.Schema<StorageConfigRequest>;
export type ProvisionedControlPlaneTier =
  | "standard"
  | "tier-xl"
  | "tier-2xl"
  | "tier-4xl"
  | "tier-8xl"
  | (string & {});
export const ProvisionedControlPlaneTier = /*@__PURE__*/ S.String;

export interface ControlPlaneScalingConfig {
  tier?: ProvisionedControlPlaneTier;
}
export const ControlPlaneScalingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tier: S.optional(ProvisionedControlPlaneTier) }),
).annotate({
  identifier: "ControlPlaneScalingConfig",
}) as any as S.Schema<ControlPlaneScalingConfig>;
export interface CreateClusterRequest {
  name: string;
  version?: string;
  roleArn: string;
  resourcesVpcConfig: VpcConfigRequest;
  kubernetesNetworkConfig?: KubernetesNetworkConfigRequest;
  logging?: Logging;
  clientRequestToken?: string;
  tags?: { [key: string]: string | undefined };
  encryptionConfig?: EncryptionConfig[];
  outpostConfig?: OutpostConfigRequest;
  accessConfig?: CreateAccessConfigRequest;
  bootstrapSelfManagedAddons?: boolean;
  upgradePolicy?: UpgradePolicyRequest;
  zonalShiftConfig?: ZonalShiftConfigRequest;
  remoteNetworkConfig?: RemoteNetworkConfigRequest;
  computeConfig?: ComputeConfigRequest;
  storageConfig?: StorageConfigRequest;
  deletionProtection?: boolean;
  controlPlaneScalingConfig?: ControlPlaneScalingConfig;
}
export const CreateClusterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    version: S.optional(S.String),
    roleArn: S.String,
    resourcesVpcConfig: VpcConfigRequest,
    kubernetesNetworkConfig: S.optional(KubernetesNetworkConfigRequest),
    logging: S.optional(Logging),
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
    encryptionConfig: S.optional(EncryptionConfigList),
    outpostConfig: S.optional(OutpostConfigRequest),
    accessConfig: S.optional(CreateAccessConfigRequest),
    bootstrapSelfManagedAddons: S.optional(S.Boolean),
    upgradePolicy: S.optional(UpgradePolicyRequest),
    zonalShiftConfig: S.optional(ZonalShiftConfigRequest),
    remoteNetworkConfig: S.optional(RemoteNetworkConfigRequest),
    computeConfig: S.optional(ComputeConfigRequest),
    storageConfig: S.optional(StorageConfigRequest),
    deletionProtection: S.optional(S.Boolean),
    controlPlaneScalingConfig: S.optional(ControlPlaneScalingConfig),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/clusters" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateClusterRequest",
}) as any as S.Schema<CreateClusterRequest>;
export interface VpcConfigResponse {
  subnetIds?: string[];
  securityGroupIds?: string[];
  clusterSecurityGroupId?: string;
  vpcId?: string;
  endpointPublicAccess?: boolean;
  endpointPrivateAccess?: boolean;
  publicAccessCidrs?: string[];
  controlPlaneEgressMode?: ControlPlaneEgressModeType;
}
export const VpcConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subnetIds: S.optional(StringList),
    securityGroupIds: S.optional(StringList),
    clusterSecurityGroupId: S.optional(S.String),
    vpcId: S.optional(S.String),
    endpointPublicAccess: S.optional(S.Boolean),
    endpointPrivateAccess: S.optional(S.Boolean),
    publicAccessCidrs: S.optional(StringList),
    controlPlaneEgressMode: S.optional(ControlPlaneEgressModeType),
  }),
).annotate({
  identifier: "VpcConfigResponse",
}) as any as S.Schema<VpcConfigResponse>;
export interface KubernetesNetworkConfigResponse {
  serviceIpv4Cidr?: string;
  serviceIpv6Cidr?: string;
  ipFamily?: IpFamily;
  elasticLoadBalancing?: ElasticLoadBalancing;
}
export const KubernetesNetworkConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceIpv4Cidr: S.optional(S.String),
    serviceIpv6Cidr: S.optional(S.String),
    ipFamily: S.optional(IpFamily),
    elasticLoadBalancing: S.optional(ElasticLoadBalancing),
  }),
).annotate({
  identifier: "KubernetesNetworkConfigResponse",
}) as any as S.Schema<KubernetesNetworkConfigResponse>;
export interface OIDC {
  issuer?: string;
}
export const OIDC = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ issuer: S.optional(S.String) }),
).annotate({ identifier: "OIDC" }) as any as S.Schema<OIDC>;
export interface Identity {
  oidc?: OIDC;
}
export const Identity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ oidc: S.optional(OIDC) }),
).annotate({ identifier: "Identity" }) as any as S.Schema<Identity>;
export type ClusterStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | "UPDATING"
  | "PENDING"
  | (string & {});
export const ClusterStatus = /*@__PURE__*/ S.String;

export interface Certificate {
  data?: string;
}
export const Certificate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ data: S.optional(S.String) }),
).annotate({ identifier: "Certificate" }) as any as S.Schema<Certificate>;
export interface ConnectorConfigResponse {
  activationId?: string;
  activationCode?: string;
  activationExpiry?: Date;
  provider?: string;
  roleArn?: string;
}
export const ConnectorConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    activationId: S.optional(S.String),
    activationCode: S.optional(S.String),
    activationExpiry: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    provider: S.optional(S.String),
    roleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ConnectorConfigResponse",
}) as any as S.Schema<ConnectorConfigResponse>;
export type ClusterIssueCode =
  | "AccessDenied"
  | "ClusterUnreachable"
  | "ConfigurationConflict"
  | "InternalFailure"
  | "ResourceLimitExceeded"
  | "ResourceNotFound"
  | "IamRoleNotFound"
  | "VpcNotFound"
  | "InsufficientFreeAddresses"
  | "Ec2ServiceNotSubscribed"
  | "Ec2SubnetNotFound"
  | "Ec2SecurityGroupNotFound"
  | "KmsGrantRevoked"
  | "KmsKeyNotFound"
  | "KmsKeyMarkedForDeletion"
  | "KmsKeyDisabled"
  | "StsRegionalEndpointDisabled"
  | "UnsupportedVersion"
  | "Other"
  | (string & {});
export const ClusterIssueCode = /*@__PURE__*/ S.String;

export interface ClusterIssue {
  code?: ClusterIssueCode;
  message?: string;
  resourceIds?: string[];
}
export const ClusterIssue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    code: S.optional(ClusterIssueCode),
    message: S.optional(S.String),
    resourceIds: S.optional(StringList),
  }),
).annotate({ identifier: "ClusterIssue" }) as any as S.Schema<ClusterIssue>;
export type ClusterIssueList = ClusterIssue[];
export const ClusterIssueList = /*@__PURE__*/ S.Array(ClusterIssue);
export interface ClusterHealth {
  issues?: ClusterIssue[];
}
export const ClusterHealth = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ issues: S.optional(ClusterIssueList) }),
).annotate({ identifier: "ClusterHealth" }) as any as S.Schema<ClusterHealth>;
export interface ControlPlanePlacementResponse {
  groupName?: string;
  spreadLevel?: SpreadLevel;
}
export const ControlPlanePlacementResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    groupName: S.optional(S.String),
    spreadLevel: S.optional(SpreadLevel),
  }),
).annotate({
  identifier: "ControlPlanePlacementResponse",
}) as any as S.Schema<ControlPlanePlacementResponse>;
export interface EtcdPlacementResponse {
  spreadLevel?: SpreadLevel;
}
export const EtcdPlacementResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ spreadLevel: S.optional(SpreadLevel) }),
).annotate({
  identifier: "EtcdPlacementResponse",
}) as any as S.Schema<EtcdPlacementResponse>;
export interface OutpostConfigResponse {
  outpostArns: string[];
  controlPlaneInstanceType: string;
  controlPlanePlacement?: ControlPlanePlacementResponse;
  etcdInstanceType?: string;
  etcdPlacement?: EtcdPlacementResponse;
}
export const OutpostConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    outpostArns: StringList,
    controlPlaneInstanceType: S.String,
    controlPlanePlacement: S.optional(ControlPlanePlacementResponse),
    etcdInstanceType: S.optional(S.String),
    etcdPlacement: S.optional(EtcdPlacementResponse),
  }),
).annotate({
  identifier: "OutpostConfigResponse",
}) as any as S.Schema<OutpostConfigResponse>;
export interface AccessConfigResponse {
  bootstrapClusterCreatorAdminPermissions?: boolean;
  authenticationMode?: AuthenticationMode;
}
export const AccessConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bootstrapClusterCreatorAdminPermissions: S.optional(S.Boolean),
    authenticationMode: S.optional(AuthenticationMode),
  }),
).annotate({
  identifier: "AccessConfigResponse",
}) as any as S.Schema<AccessConfigResponse>;
export interface UpgradePolicyResponse {
  supportType?: SupportType;
}
export const UpgradePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ supportType: S.optional(SupportType) }),
).annotate({
  identifier: "UpgradePolicyResponse",
}) as any as S.Schema<UpgradePolicyResponse>;
export interface ZonalShiftConfigResponse {
  enabled?: boolean;
}
export const ZonalShiftConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "ZonalShiftConfigResponse",
}) as any as S.Schema<ZonalShiftConfigResponse>;
export interface RemoteNetworkConfigResponse {
  remoteNodeNetworks?: RemoteNodeNetwork[];
  remotePodNetworks?: RemotePodNetwork[];
}
export const RemoteNetworkConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    remoteNodeNetworks: S.optional(RemoteNodeNetworkList),
    remotePodNetworks: S.optional(RemotePodNetworkList),
  }),
).annotate({
  identifier: "RemoteNetworkConfigResponse",
}) as any as S.Schema<RemoteNetworkConfigResponse>;
export interface ComputeConfigResponse {
  enabled?: boolean;
  nodePools?: string[];
  nodeRoleArn?: string;
}
export const ComputeConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.optional(S.Boolean),
    nodePools: S.optional(StringList),
    nodeRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ComputeConfigResponse",
}) as any as S.Schema<ComputeConfigResponse>;
export interface StorageConfigResponse {
  blockStorage?: BlockStorage;
}
export const StorageConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ blockStorage: S.optional(BlockStorage) }),
).annotate({
  identifier: "StorageConfigResponse",
}) as any as S.Schema<StorageConfigResponse>;
export interface Cluster {
  name?: string;
  arn?: string;
  createdAt?: Date;
  version?: string;
  endpoint?: string;
  roleArn?: string;
  resourcesVpcConfig?: VpcConfigResponse;
  kubernetesNetworkConfig?: KubernetesNetworkConfigResponse;
  logging?: Logging;
  identity?: Identity;
  status?: ClusterStatus;
  certificateAuthority?: Certificate;
  clientRequestToken?: string;
  platformVersion?: string;
  tags?: { [key: string]: string | undefined };
  encryptionConfig?: EncryptionConfig[];
  connectorConfig?: ConnectorConfigResponse;
  id?: string;
  health?: ClusterHealth;
  outpostConfig?: OutpostConfigResponse;
  accessConfig?: AccessConfigResponse;
  upgradePolicy?: UpgradePolicyResponse;
  zonalShiftConfig?: ZonalShiftConfigResponse;
  remoteNetworkConfig?: RemoteNetworkConfigResponse;
  computeConfig?: ComputeConfigResponse;
  storageConfig?: StorageConfigResponse;
  deletionProtection?: boolean;
  controlPlaneScalingConfig?: ControlPlaneScalingConfig;
}
export const Cluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    version: S.optional(S.String),
    endpoint: S.optional(S.String),
    roleArn: S.optional(S.String),
    resourcesVpcConfig: S.optional(VpcConfigResponse),
    kubernetesNetworkConfig: S.optional(KubernetesNetworkConfigResponse),
    logging: S.optional(Logging),
    identity: S.optional(Identity),
    status: S.optional(ClusterStatus),
    certificateAuthority: S.optional(Certificate),
    clientRequestToken: S.optional(S.String),
    platformVersion: S.optional(S.String),
    tags: S.optional(TagMap),
    encryptionConfig: S.optional(EncryptionConfigList),
    connectorConfig: S.optional(ConnectorConfigResponse),
    id: S.optional(S.String),
    health: S.optional(ClusterHealth),
    outpostConfig: S.optional(OutpostConfigResponse),
    accessConfig: S.optional(AccessConfigResponse),
    upgradePolicy: S.optional(UpgradePolicyResponse),
    zonalShiftConfig: S.optional(ZonalShiftConfigResponse),
    remoteNetworkConfig: S.optional(RemoteNetworkConfigResponse),
    computeConfig: S.optional(ComputeConfigResponse),
    storageConfig: S.optional(StorageConfigResponse),
    deletionProtection: S.optional(S.Boolean),
    controlPlaneScalingConfig: S.optional(ControlPlaneScalingConfig),
  }),
).annotate({ identifier: "Cluster" }) as any as S.Schema<Cluster>;
export interface CreateClusterResponse {
  cluster?: Cluster;
}
export const CreateClusterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cluster: S.optional(Cluster) }),
).annotate({
  identifier: "CreateClusterResponse",
}) as any as S.Schema<CreateClusterResponse>;
export type EksAnywhereSubscriptionName = string;
export type EksAnywhereSubscriptionTermUnit = "MONTHS" | (string & {});
export const EksAnywhereSubscriptionTermUnit = /*@__PURE__*/ S.String;

export interface EksAnywhereSubscriptionTerm {
  duration?: number;
  unit?: EksAnywhereSubscriptionTermUnit;
}
export const EksAnywhereSubscriptionTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    duration: S.optional(S.Number),
    unit: S.optional(EksAnywhereSubscriptionTermUnit),
  }),
).annotate({
  identifier: "EksAnywhereSubscriptionTerm",
}) as any as S.Schema<EksAnywhereSubscriptionTerm>;
export type EksAnywhereSubscriptionLicenseType = "Cluster" | (string & {});
export const EksAnywhereSubscriptionLicenseType = /*@__PURE__*/ S.String;

export interface CreateEksAnywhereSubscriptionRequest {
  name: string;
  term: EksAnywhereSubscriptionTerm;
  licenseQuantity?: number;
  licenseType?: EksAnywhereSubscriptionLicenseType;
  autoRenew?: boolean;
  clientRequestToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateEksAnywhereSubscriptionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      name: S.String,
      term: EksAnywhereSubscriptionTerm,
      licenseQuantity: S.optional(S.Number),
      licenseType: S.optional(EksAnywhereSubscriptionLicenseType),
      autoRenew: S.optional(S.Boolean),
      clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      tags: S.optional(TagMap),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/eks-anywhere-subscriptions" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateEksAnywhereSubscriptionRequest",
}) as any as S.Schema<CreateEksAnywhereSubscriptionRequest>;
export interface License {
  id?: string;
  token?: string;
}
export const License = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String), token: S.optional(S.String) }),
).annotate({ identifier: "License" }) as any as S.Schema<License>;
export type LicenseList = License[];
export const LicenseList = /*@__PURE__*/ S.Array(License);
export interface EksAnywhereSubscription {
  id?: string;
  arn?: string;
  createdAt?: Date;
  effectiveDate?: Date;
  expirationDate?: Date;
  licenseQuantity?: number;
  licenseType?: EksAnywhereSubscriptionLicenseType;
  term?: EksAnywhereSubscriptionTerm;
  status?: string;
  autoRenew?: boolean;
  licenseArns?: string[];
  licenses?: License[];
  tags?: { [key: string]: string | undefined };
}
export const EksAnywhereSubscription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    effectiveDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    expirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    licenseQuantity: S.optional(S.Number),
    licenseType: S.optional(EksAnywhereSubscriptionLicenseType),
    term: S.optional(EksAnywhereSubscriptionTerm),
    status: S.optional(S.String),
    autoRenew: S.optional(S.Boolean),
    licenseArns: S.optional(StringList),
    licenses: S.optional(LicenseList),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "EksAnywhereSubscription",
}) as any as S.Schema<EksAnywhereSubscription>;
export interface CreateEksAnywhereSubscriptionResponse {
  subscription?: EksAnywhereSubscription;
}
export const CreateEksAnywhereSubscriptionResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ subscription: S.optional(EksAnywhereSubscription) }),
).annotate({
  identifier: "CreateEksAnywhereSubscriptionResponse",
}) as any as S.Schema<CreateEksAnywhereSubscriptionResponse>;
export type FargateProfileLabel = { [key: string]: string | undefined };
export const FargateProfileLabel = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface FargateProfileSelector {
  namespace?: string;
  labels?: { [key: string]: string | undefined };
}
export const FargateProfileSelector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    namespace: S.optional(S.String),
    labels: S.optional(FargateProfileLabel),
  }),
).annotate({
  identifier: "FargateProfileSelector",
}) as any as S.Schema<FargateProfileSelector>;
export type FargateProfileSelectors = FargateProfileSelector[];
export const FargateProfileSelectors = /*@__PURE__*/ S.Array(
  FargateProfileSelector,
);
export interface CreateFargateProfileRequest {
  fargateProfileName: string;
  clusterName: string;
  podExecutionRoleArn: string;
  subnets?: string[];
  selectors?: FargateProfileSelector[];
  clientRequestToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateFargateProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fargateProfileName: S.String,
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    podExecutionRoleArn: S.String,
    subnets: S.optional(StringList),
    selectors: S.optional(FargateProfileSelectors),
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/clusters/{clusterName}/fargate-profiles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFargateProfileRequest",
}) as any as S.Schema<CreateFargateProfileRequest>;
export type FargateProfileStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "CREATE_FAILED"
  | "DELETE_FAILED"
  | (string & {});
export const FargateProfileStatus = /*@__PURE__*/ S.String;

export type FargateProfileIssueCode =
  | "PodExecutionRoleAlreadyInUse"
  | "AccessDenied"
  | "ClusterUnreachable"
  | "InternalFailure"
  | (string & {});
export const FargateProfileIssueCode = /*@__PURE__*/ S.String;

export interface FargateProfileIssue {
  code?: FargateProfileIssueCode;
  message?: string;
  resourceIds?: string[];
}
export const FargateProfileIssue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    code: S.optional(FargateProfileIssueCode),
    message: S.optional(S.String),
    resourceIds: S.optional(StringList),
  }),
).annotate({
  identifier: "FargateProfileIssue",
}) as any as S.Schema<FargateProfileIssue>;
export type FargateProfileIssueList = FargateProfileIssue[];
export const FargateProfileIssueList =
  /*@__PURE__*/ S.Array(FargateProfileIssue);
export interface FargateProfileHealth {
  issues?: FargateProfileIssue[];
}
export const FargateProfileHealth = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ issues: S.optional(FargateProfileIssueList) }),
).annotate({
  identifier: "FargateProfileHealth",
}) as any as S.Schema<FargateProfileHealth>;
export interface FargateProfile {
  fargateProfileName?: string;
  fargateProfileArn?: string;
  clusterName?: string;
  createdAt?: Date;
  podExecutionRoleArn?: string;
  subnets?: string[];
  selectors?: FargateProfileSelector[];
  status?: FargateProfileStatus;
  tags?: { [key: string]: string | undefined };
  health?: FargateProfileHealth;
}
export const FargateProfile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fargateProfileName: S.optional(S.String),
    fargateProfileArn: S.optional(S.String),
    clusterName: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    podExecutionRoleArn: S.optional(S.String),
    subnets: S.optional(StringList),
    selectors: S.optional(FargateProfileSelectors),
    status: S.optional(FargateProfileStatus),
    tags: S.optional(TagMap),
    health: S.optional(FargateProfileHealth),
  }),
).annotate({ identifier: "FargateProfile" }) as any as S.Schema<FargateProfile>;
export interface CreateFargateProfileResponse {
  fargateProfile?: FargateProfile;
}
export const CreateFargateProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fargateProfile: S.optional(FargateProfile) }),
).annotate({
  identifier: "CreateFargateProfileResponse",
}) as any as S.Schema<CreateFargateProfileResponse>;
export type ZeroCapacity = number;
export type Capacity = number;
export interface NodegroupScalingConfig {
  minSize?: number;
  maxSize?: number;
  desiredSize?: number;
}
export const NodegroupScalingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    minSize: S.optional(S.Number),
    maxSize: S.optional(S.Number),
    desiredSize: S.optional(S.Number),
  }),
).annotate({
  identifier: "NodegroupScalingConfig",
}) as any as S.Schema<NodegroupScalingConfig>;
export type BoxedInteger = number;
export type AMITypes =
  | "AL2_x86_64"
  | "AL2_x86_64_GPU"
  | "AL2_ARM_64"
  | "CUSTOM"
  | "BOTTLEROCKET_ARM_64"
  | "BOTTLEROCKET_x86_64"
  | "BOTTLEROCKET_ARM_64_FIPS"
  | "BOTTLEROCKET_x86_64_FIPS"
  | "BOTTLEROCKET_ARM_64_NVIDIA"
  | "BOTTLEROCKET_x86_64_NVIDIA"
  | "BOTTLEROCKET_ARM_64_NVIDIA_FIPS"
  | "BOTTLEROCKET_x86_64_NVIDIA_FIPS"
  | "WINDOWS_CORE_2019_x86_64"
  | "WINDOWS_FULL_2019_x86_64"
  | "WINDOWS_CORE_2022_x86_64"
  | "WINDOWS_FULL_2022_x86_64"
  | "WINDOWS_CORE_2025_x86_64"
  | "WINDOWS_FULL_2025_x86_64"
  | "AL2023_x86_64_STANDARD"
  | "AL2023_ARM_64_STANDARD"
  | "AL2023_x86_64_NEURON"
  | "AL2023_x86_64_NVIDIA"
  | "AL2023_ARM_64_NVIDIA"
  | (string & {});
export const AMITypes = /*@__PURE__*/ S.String;

export interface RemoteAccessConfig {
  ec2SshKey?: string;
  sourceSecurityGroups?: string[];
}
export const RemoteAccessConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ec2SshKey: S.optional(S.String),
    sourceSecurityGroups: S.optional(StringList),
  }),
).annotate({
  identifier: "RemoteAccessConfig",
}) as any as S.Schema<RemoteAccessConfig>;
export type LabelKey = string;
export type LabelValue = string;
export type LabelsMap = { [key: string]: string | undefined };
export const LabelsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type TaintKey = string;
export type TaintValue = string;
export type TaintEffect =
  | "NO_SCHEDULE"
  | "NO_EXECUTE"
  | "PREFER_NO_SCHEDULE"
  | (string & {});
export const TaintEffect = /*@__PURE__*/ S.String;

export interface Taint {
  key?: string;
  value?: string;
  effect?: TaintEffect;
}
export const Taint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    key: S.optional(S.String),
    value: S.optional(S.String),
    effect: S.optional(TaintEffect),
  }),
).annotate({ identifier: "Taint" }) as any as S.Schema<Taint>;
export type TaintsList = Taint[];
export const TaintsList = /*@__PURE__*/ S.Array(Taint);
export interface LaunchTemplateSpecification {
  name?: string;
  version?: string;
  id?: string;
}
export const LaunchTemplateSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    version: S.optional(S.String),
    id: S.optional(S.String),
  }),
).annotate({
  identifier: "LaunchTemplateSpecification",
}) as any as S.Schema<LaunchTemplateSpecification>;
export type NonZeroInteger = number;
export type PercentCapacity = number;
export type NodegroupUpdateStrategies = "DEFAULT" | "MINIMAL" | (string & {});
export const NodegroupUpdateStrategies = /*@__PURE__*/ S.String;

export interface NodegroupUpdateConfig {
  maxUnavailable?: number;
  maxUnavailablePercentage?: number;
  updateStrategy?: NodegroupUpdateStrategies;
}
export const NodegroupUpdateConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxUnavailable: S.optional(S.Number),
    maxUnavailablePercentage: S.optional(S.Number),
    updateStrategy: S.optional(NodegroupUpdateStrategies),
  }),
).annotate({
  identifier: "NodegroupUpdateConfig",
}) as any as S.Schema<NodegroupUpdateConfig>;
export type RepairAction = "Replace" | "Reboot" | "NoAction" | (string & {});
export const RepairAction = /*@__PURE__*/ S.String;

export interface NodeRepairConfigOverrides {
  nodeMonitoringCondition?: string;
  nodeUnhealthyReason?: string;
  minRepairWaitTimeMins?: number;
  repairAction?: RepairAction;
}
export const NodeRepairConfigOverrides = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodeMonitoringCondition: S.optional(S.String),
    nodeUnhealthyReason: S.optional(S.String),
    minRepairWaitTimeMins: S.optional(S.Number),
    repairAction: S.optional(RepairAction),
  }),
).annotate({
  identifier: "NodeRepairConfigOverrides",
}) as any as S.Schema<NodeRepairConfigOverrides>;
export type NodeRepairConfigOverridesList = NodeRepairConfigOverrides[];
export const NodeRepairConfigOverridesList = /*@__PURE__*/ S.Array(
  NodeRepairConfigOverrides,
);
export interface NodeRepairConfig {
  enabled?: boolean;
  maxUnhealthyNodeThresholdCount?: number;
  maxUnhealthyNodeThresholdPercentage?: number;
  maxParallelNodesRepairedCount?: number;
  maxParallelNodesRepairedPercentage?: number;
  nodeRepairConfigOverrides?: NodeRepairConfigOverrides[];
}
export const NodeRepairConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.optional(S.Boolean),
    maxUnhealthyNodeThresholdCount: S.optional(S.Number),
    maxUnhealthyNodeThresholdPercentage: S.optional(S.Number),
    maxParallelNodesRepairedCount: S.optional(S.Number),
    maxParallelNodesRepairedPercentage: S.optional(S.Number),
    nodeRepairConfigOverrides: S.optional(NodeRepairConfigOverridesList),
  }),
).annotate({
  identifier: "NodeRepairConfig",
}) as any as S.Schema<NodeRepairConfig>;
export type CapacityTypes =
  | "ON_DEMAND"
  | "SPOT"
  | "CAPACITY_BLOCK"
  | (string & {});
export const CapacityTypes = /*@__PURE__*/ S.String;

export type WarmPoolState =
  | "STOPPED"
  | "RUNNING"
  | "HIBERNATED"
  | (string & {});
export const WarmPoolState = /*@__PURE__*/ S.String;

export interface WarmPoolConfig {
  enabled?: boolean;
  minSize?: number;
  maxGroupPreparedCapacity?: number;
  poolState?: WarmPoolState;
  reuseOnScaleIn?: boolean;
}
export const WarmPoolConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.optional(S.Boolean),
    minSize: S.optional(S.Number),
    maxGroupPreparedCapacity: S.optional(S.Number),
    poolState: S.optional(WarmPoolState),
    reuseOnScaleIn: S.optional(S.Boolean),
  }),
).annotate({ identifier: "WarmPoolConfig" }) as any as S.Schema<WarmPoolConfig>;
export interface CreateNodegroupRequest {
  clusterName: string;
  nodegroupName: string;
  scalingConfig?: NodegroupScalingConfig;
  diskSize?: number;
  subnets: string[];
  instanceTypes?: string[];
  amiType?: AMITypes;
  remoteAccess?: RemoteAccessConfig;
  nodeRole: string;
  labels?: { [key: string]: string | undefined };
  taints?: Taint[];
  tags?: { [key: string]: string | undefined };
  clientRequestToken?: string;
  launchTemplate?: LaunchTemplateSpecification;
  updateConfig?: NodegroupUpdateConfig;
  nodeRepairConfig?: NodeRepairConfig;
  capacityType?: CapacityTypes;
  version?: string;
  releaseVersion?: string;
  warmPoolConfig?: WarmPoolConfig;
}
export const CreateNodegroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    nodegroupName: S.String,
    scalingConfig: S.optional(NodegroupScalingConfig),
    diskSize: S.optional(S.Number),
    subnets: StringList,
    instanceTypes: S.optional(StringList),
    amiType: S.optional(AMITypes),
    remoteAccess: S.optional(RemoteAccessConfig),
    nodeRole: S.String,
    labels: S.optional(LabelsMap),
    taints: S.optional(TaintsList),
    tags: S.optional(TagMap),
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    launchTemplate: S.optional(LaunchTemplateSpecification),
    updateConfig: S.optional(NodegroupUpdateConfig),
    nodeRepairConfig: S.optional(NodeRepairConfig),
    capacityType: S.optional(CapacityTypes),
    version: S.optional(S.String),
    releaseVersion: S.optional(S.String),
    warmPoolConfig: S.optional(WarmPoolConfig),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/clusters/{clusterName}/node-groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateNodegroupRequest",
}) as any as S.Schema<CreateNodegroupRequest>;
export type NodegroupStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "CREATE_FAILED"
  | "DELETE_FAILED"
  | "DEGRADED"
  | (string & {});
export const NodegroupStatus = /*@__PURE__*/ S.String;

export interface AutoScalingGroup {
  name?: string;
}
export const AutoScalingGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String) }),
).annotate({
  identifier: "AutoScalingGroup",
}) as any as S.Schema<AutoScalingGroup>;
export type AutoScalingGroupList = AutoScalingGroup[];
export const AutoScalingGroupList = /*@__PURE__*/ S.Array(AutoScalingGroup);
export interface NodegroupResources {
  autoScalingGroups?: AutoScalingGroup[];
  remoteAccessSecurityGroup?: string;
}
export const NodegroupResources = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autoScalingGroups: S.optional(AutoScalingGroupList),
    remoteAccessSecurityGroup: S.optional(S.String),
  }),
).annotate({
  identifier: "NodegroupResources",
}) as any as S.Schema<NodegroupResources>;
export type NodegroupIssueCode =
  | "AutoScalingGroupNotFound"
  | "AutoScalingGroupInvalidConfiguration"
  | "Ec2SecurityGroupNotFound"
  | "Ec2SecurityGroupDeletionFailure"
  | "Ec2LaunchTemplateNotFound"
  | "Ec2LaunchTemplateVersionMismatch"
  | "Ec2SubnetNotFound"
  | "Ec2SubnetInvalidConfiguration"
  | "IamInstanceProfileNotFound"
  | "Ec2SubnetMissingIpv6Assignment"
  | "IamLimitExceeded"
  | "IamNodeRoleNotFound"
  | "NodeCreationFailure"
  | "AsgInstanceLaunchFailures"
  | "InstanceLimitExceeded"
  | "InsufficientFreeAddresses"
  | "AccessDenied"
  | "InternalFailure"
  | "ClusterUnreachable"
  | "AmiIdNotFound"
  | "AutoScalingGroupOptInRequired"
  | "AutoScalingGroupRateLimitExceeded"
  | "Ec2LaunchTemplateDeletionFailure"
  | "Ec2LaunchTemplateInvalidConfiguration"
  | "Ec2LaunchTemplateMaxLimitExceeded"
  | "Ec2SubnetListTooLong"
  | "IamThrottling"
  | "NodeTerminationFailure"
  | "PodEvictionFailure"
  | "SourceEc2LaunchTemplateNotFound"
  | "LimitExceeded"
  | "Unknown"
  | "AutoScalingGroupInstanceRefreshActive"
  | "KubernetesLabelInvalid"
  | "Ec2LaunchTemplateVersionMaxLimitExceeded"
  | "Ec2InstanceTypeDoesNotExist"
  | (string & {});
export const NodegroupIssueCode = /*@__PURE__*/ S.String;

export interface Issue {
  code?: NodegroupIssueCode;
  message?: string;
  resourceIds?: string[];
}
export const Issue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    code: S.optional(NodegroupIssueCode),
    message: S.optional(S.String),
    resourceIds: S.optional(StringList),
  }),
).annotate({ identifier: "Issue" }) as any as S.Schema<Issue>;
export type IssueList = Issue[];
export const IssueList = /*@__PURE__*/ S.Array(Issue);
export interface NodegroupHealth {
  issues?: Issue[];
}
export const NodegroupHealth = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ issues: S.optional(IssueList) }),
).annotate({
  identifier: "NodegroupHealth",
}) as any as S.Schema<NodegroupHealth>;
export interface Nodegroup {
  nodegroupName?: string;
  nodegroupArn?: string;
  clusterName?: string;
  version?: string;
  releaseVersion?: string;
  createdAt?: Date;
  modifiedAt?: Date;
  status?: NodegroupStatus;
  capacityType?: CapacityTypes;
  scalingConfig?: NodegroupScalingConfig;
  instanceTypes?: string[];
  subnets?: string[];
  remoteAccess?: RemoteAccessConfig;
  amiType?: AMITypes;
  nodeRole?: string;
  labels?: { [key: string]: string | undefined };
  taints?: Taint[];
  resources?: NodegroupResources;
  diskSize?: number;
  health?: NodegroupHealth;
  updateConfig?: NodegroupUpdateConfig;
  nodeRepairConfig?: NodeRepairConfig;
  launchTemplate?: LaunchTemplateSpecification;
  tags?: { [key: string]: string | undefined };
  warmPoolConfig?: WarmPoolConfig;
}
export const Nodegroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodegroupName: S.optional(S.String),
    nodegroupArn: S.optional(S.String),
    clusterName: S.optional(S.String),
    version: S.optional(S.String),
    releaseVersion: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    status: S.optional(NodegroupStatus),
    capacityType: S.optional(CapacityTypes),
    scalingConfig: S.optional(NodegroupScalingConfig),
    instanceTypes: S.optional(StringList),
    subnets: S.optional(StringList),
    remoteAccess: S.optional(RemoteAccessConfig),
    amiType: S.optional(AMITypes),
    nodeRole: S.optional(S.String),
    labels: S.optional(LabelsMap),
    taints: S.optional(TaintsList),
    resources: S.optional(NodegroupResources),
    diskSize: S.optional(S.Number),
    health: S.optional(NodegroupHealth),
    updateConfig: S.optional(NodegroupUpdateConfig),
    nodeRepairConfig: S.optional(NodeRepairConfig),
    launchTemplate: S.optional(LaunchTemplateSpecification),
    tags: S.optional(TagMap),
    warmPoolConfig: S.optional(WarmPoolConfig),
  }),
).annotate({ identifier: "Nodegroup" }) as any as S.Schema<Nodegroup>;
export interface CreateNodegroupResponse {
  nodegroup?: Nodegroup;
}
export const CreateNodegroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nodegroup: S.optional(Nodegroup) }),
).annotate({
  identifier: "CreateNodegroupResponse",
}) as any as S.Schema<CreateNodegroupResponse>;
export interface CreatePodIdentityAssociationRequest {
  clusterName: string;
  namespace: string;
  serviceAccount: string;
  roleArn: string;
  clientRequestToken?: string;
  tags?: { [key: string]: string | undefined };
  disableSessionTags?: boolean;
  targetRoleArn?: string;
  policy?: string;
}
export const CreatePodIdentityAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    namespace: S.String,
    serviceAccount: S.String,
    roleArn: S.String,
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
    disableSessionTags: S.optional(S.Boolean),
    targetRoleArn: S.optional(S.String),
    policy: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/clusters/{clusterName}/pod-identity-associations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePodIdentityAssociationRequest",
}) as any as S.Schema<CreatePodIdentityAssociationRequest>;
export interface PodIdentityAssociation {
  clusterName?: string;
  namespace?: string;
  serviceAccount?: string;
  roleArn?: string;
  associationArn?: string;
  associationId?: string;
  tags?: { [key: string]: string | undefined };
  createdAt?: Date;
  modifiedAt?: Date;
  ownerArn?: string;
  disableSessionTags?: boolean;
  targetRoleArn?: string;
  externalId?: string;
  policy?: string;
}
export const PodIdentityAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.optional(S.String),
    namespace: S.optional(S.String),
    serviceAccount: S.optional(S.String),
    roleArn: S.optional(S.String),
    associationArn: S.optional(S.String),
    associationId: S.optional(S.String),
    tags: S.optional(TagMap),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ownerArn: S.optional(S.String),
    disableSessionTags: S.optional(S.Boolean),
    targetRoleArn: S.optional(S.String),
    externalId: S.optional(S.String),
    policy: S.optional(S.String),
  }),
).annotate({
  identifier: "PodIdentityAssociation",
}) as any as S.Schema<PodIdentityAssociation>;
export interface CreatePodIdentityAssociationResponse {
  association?: PodIdentityAssociation;
}
export const CreatePodIdentityAssociationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ association: S.optional(PodIdentityAssociation) }),
).annotate({
  identifier: "CreatePodIdentityAssociationResponse",
}) as any as S.Schema<CreatePodIdentityAssociationResponse>;
export interface DeleteAccessEntryRequest {
  clusterName: string;
  principalArn: string;
}
export const DeleteAccessEntryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    principalArn: S.String.pipe(T.HttpLabel("principalArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/clusters/{clusterName}/access-entries/{principalArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAccessEntryRequest",
}) as any as S.Schema<DeleteAccessEntryRequest>;
export interface DeleteAccessEntryResponse {}
export const DeleteAccessEntryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAccessEntryResponse",
}) as any as S.Schema<DeleteAccessEntryResponse>;
export interface DeleteAddonRequest {
  clusterName: string;
  addonName: string;
  preserve?: boolean;
}
export const DeleteAddonRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    addonName: S.String.pipe(T.HttpLabel("addonName")),
    preserve: S.optional(S.Boolean).pipe(T.HttpQuery("preserve")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/clusters/{clusterName}/addons/{addonName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAddonRequest",
}) as any as S.Schema<DeleteAddonRequest>;
export interface DeleteAddonResponse {
  addon?: Addon;
}
export const DeleteAddonResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ addon: S.optional(Addon) }),
).annotate({
  identifier: "DeleteAddonResponse",
}) as any as S.Schema<DeleteAddonResponse>;
export interface DeleteCapabilityRequest {
  clusterName: string;
  capabilityName: string;
}
export const DeleteCapabilityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    capabilityName: S.String.pipe(T.HttpLabel("capabilityName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/clusters/{clusterName}/capabilities/{capabilityName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCapabilityRequest",
}) as any as S.Schema<DeleteCapabilityRequest>;
export interface DeleteCapabilityResponse {
  capability?: Capability;
}
export const DeleteCapabilityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ capability: S.optional(Capability) }),
).annotate({
  identifier: "DeleteCapabilityResponse",
}) as any as S.Schema<DeleteCapabilityResponse>;
export interface DeleteClusterRequest {
  name: string;
}
export const DeleteClusterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/clusters/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteClusterRequest",
}) as any as S.Schema<DeleteClusterRequest>;
export interface DeleteClusterResponse {
  cluster?: Cluster;
}
export const DeleteClusterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cluster: S.optional(Cluster) }),
).annotate({
  identifier: "DeleteClusterResponse",
}) as any as S.Schema<DeleteClusterResponse>;
export interface DeleteEksAnywhereSubscriptionRequest {
  id: string;
}
export const DeleteEksAnywhereSubscriptionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
      T.all(
        T.Http({ method: "DELETE", uri: "/eks-anywhere-subscriptions/{id}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteEksAnywhereSubscriptionRequest",
}) as any as S.Schema<DeleteEksAnywhereSubscriptionRequest>;
export interface DeleteEksAnywhereSubscriptionResponse {
  subscription?: EksAnywhereSubscription;
}
export const DeleteEksAnywhereSubscriptionResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ subscription: S.optional(EksAnywhereSubscription) }),
).annotate({
  identifier: "DeleteEksAnywhereSubscriptionResponse",
}) as any as S.Schema<DeleteEksAnywhereSubscriptionResponse>;
export interface DeleteFargateProfileRequest {
  clusterName: string;
  fargateProfileName: string;
}
export const DeleteFargateProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    fargateProfileName: S.String.pipe(T.HttpLabel("fargateProfileName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/clusters/{clusterName}/fargate-profiles/{fargateProfileName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFargateProfileRequest",
}) as any as S.Schema<DeleteFargateProfileRequest>;
export interface DeleteFargateProfileResponse {
  fargateProfile?: FargateProfile;
}
export const DeleteFargateProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fargateProfile: S.optional(FargateProfile) }),
).annotate({
  identifier: "DeleteFargateProfileResponse",
}) as any as S.Schema<DeleteFargateProfileResponse>;
export interface DeleteNodegroupRequest {
  clusterName: string;
  nodegroupName: string;
}
export const DeleteNodegroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    nodegroupName: S.String.pipe(T.HttpLabel("nodegroupName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/clusters/{clusterName}/node-groups/{nodegroupName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteNodegroupRequest",
}) as any as S.Schema<DeleteNodegroupRequest>;
export interface DeleteNodegroupResponse {
  nodegroup?: Nodegroup;
}
export const DeleteNodegroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nodegroup: S.optional(Nodegroup) }),
).annotate({
  identifier: "DeleteNodegroupResponse",
}) as any as S.Schema<DeleteNodegroupResponse>;
export interface DeletePodIdentityAssociationRequest {
  clusterName: string;
  associationId: string;
}
export const DeletePodIdentityAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    associationId: S.String.pipe(T.HttpLabel("associationId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/clusters/{clusterName}/pod-identity-associations/{associationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePodIdentityAssociationRequest",
}) as any as S.Schema<DeletePodIdentityAssociationRequest>;
export interface DeletePodIdentityAssociationResponse {
  association?: PodIdentityAssociation;
}
export const DeletePodIdentityAssociationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ association: S.optional(PodIdentityAssociation) }),
).annotate({
  identifier: "DeletePodIdentityAssociationResponse",
}) as any as S.Schema<DeletePodIdentityAssociationResponse>;
export interface DeregisterClusterRequest {
  name: string;
}
export const DeregisterClusterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/cluster-registrations/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeregisterClusterRequest",
}) as any as S.Schema<DeregisterClusterRequest>;
export interface DeregisterClusterResponse {
  cluster?: Cluster;
}
export const DeregisterClusterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cluster: S.optional(Cluster) }),
).annotate({
  identifier: "DeregisterClusterResponse",
}) as any as S.Schema<DeregisterClusterResponse>;
export interface DescribeAccessEntryRequest {
  clusterName: string;
  principalArn: string;
}
export const DescribeAccessEntryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    principalArn: S.String.pipe(T.HttpLabel("principalArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/clusters/{clusterName}/access-entries/{principalArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAccessEntryRequest",
}) as any as S.Schema<DescribeAccessEntryRequest>;
export interface DescribeAccessEntryResponse {
  accessEntry?: AccessEntry;
}
export const DescribeAccessEntryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accessEntry: S.optional(AccessEntry) }),
).annotate({
  identifier: "DescribeAccessEntryResponse",
}) as any as S.Schema<DescribeAccessEntryResponse>;
export interface DescribeAddonRequest {
  clusterName: string;
  addonName: string;
}
export const DescribeAddonRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    addonName: S.String.pipe(T.HttpLabel("addonName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/clusters/{clusterName}/addons/{addonName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAddonRequest",
}) as any as S.Schema<DescribeAddonRequest>;
export interface DescribeAddonResponse {
  addon?: Addon;
}
export const DescribeAddonResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ addon: S.optional(Addon) }),
).annotate({
  identifier: "DescribeAddonResponse",
}) as any as S.Schema<DescribeAddonResponse>;
export interface DescribeAddonConfigurationRequest {
  addonName: string;
  addonVersion: string;
}
export const DescribeAddonConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    addonName: S.String.pipe(T.HttpQuery("addonName")),
    addonVersion: S.String.pipe(T.HttpQuery("addonVersion")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/addons/configuration-schemas" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAddonConfigurationRequest",
}) as any as S.Schema<DescribeAddonConfigurationRequest>;
export interface AddonPodIdentityConfiguration {
  serviceAccount?: string;
  recommendedManagedPolicies?: string[];
}
export const AddonPodIdentityConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceAccount: S.optional(S.String),
    recommendedManagedPolicies: S.optional(StringList),
  }),
).annotate({
  identifier: "AddonPodIdentityConfiguration",
}) as any as S.Schema<AddonPodIdentityConfiguration>;
export type AddonPodIdentityConfigurationList = AddonPodIdentityConfiguration[];
export const AddonPodIdentityConfigurationList = /*@__PURE__*/ S.Array(
  AddonPodIdentityConfiguration,
);
export interface DescribeAddonConfigurationResponse {
  addonName?: string;
  addonVersion?: string;
  configurationSchema?: string;
  podIdentityConfiguration?: AddonPodIdentityConfiguration[];
}
export const DescribeAddonConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    addonName: S.optional(S.String),
    addonVersion: S.optional(S.String),
    configurationSchema: S.optional(S.String),
    podIdentityConfiguration: S.optional(AddonPodIdentityConfigurationList),
  }),
).annotate({
  identifier: "DescribeAddonConfigurationResponse",
}) as any as S.Schema<DescribeAddonConfigurationResponse>;
export type DescribeAddonVersionsRequestMaxResults = number;
export interface DescribeAddonVersionsRequest {
  kubernetesVersion?: string;
  maxResults?: number;
  nextToken?: string;
  addonName?: string;
  types?: string[];
  publishers?: string[];
  owners?: string[];
}
export const DescribeAddonVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    kubernetesVersion: S.optional(S.String).pipe(
      T.HttpQuery("kubernetesVersion"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    addonName: S.optional(S.String).pipe(T.HttpQuery("addonName")),
    types: S.optional(StringList).pipe(T.HttpQuery("types")),
    publishers: S.optional(StringList).pipe(T.HttpQuery("publishers")),
    owners: S.optional(StringList).pipe(T.HttpQuery("owners")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/addons/supported-versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAddonVersionsRequest",
}) as any as S.Schema<DescribeAddonVersionsRequest>;
export interface Compatibility {
  clusterVersion?: string;
  platformVersions?: string[];
  defaultVersion?: boolean;
}
export const Compatibility = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterVersion: S.optional(S.String),
    platformVersions: S.optional(StringList),
    defaultVersion: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Compatibility" }) as any as S.Schema<Compatibility>;
export type Compatibilities = Compatibility[];
export const Compatibilities = /*@__PURE__*/ S.Array(Compatibility);
export interface AddonVersionInfo {
  addonVersion?: string;
  architecture?: string[];
  computeTypes?: string[];
  compatibilities?: Compatibility[];
  requiresConfiguration?: boolean;
  requiresIamPermissions?: boolean;
}
export const AddonVersionInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    addonVersion: S.optional(S.String),
    architecture: S.optional(StringList),
    computeTypes: S.optional(StringList),
    compatibilities: S.optional(Compatibilities),
    requiresConfiguration: S.optional(S.Boolean),
    requiresIamPermissions: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AddonVersionInfo",
}) as any as S.Schema<AddonVersionInfo>;
export type AddonVersionInfoList = AddonVersionInfo[];
export const AddonVersionInfoList = /*@__PURE__*/ S.Array(AddonVersionInfo);
export interface AddonInfo {
  addonName?: string;
  type?: string;
  addonVersions?: AddonVersionInfo[];
  publisher?: string;
  owner?: string;
  marketplaceInformation?: MarketplaceInformation;
  defaultNamespace?: string;
}
export const AddonInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    addonName: S.optional(S.String),
    type: S.optional(S.String),
    addonVersions: S.optional(AddonVersionInfoList),
    publisher: S.optional(S.String),
    owner: S.optional(S.String),
    marketplaceInformation: S.optional(MarketplaceInformation),
    defaultNamespace: S.optional(S.String),
  }),
).annotate({ identifier: "AddonInfo" }) as any as S.Schema<AddonInfo>;
export type Addons = AddonInfo[];
export const Addons = /*@__PURE__*/ S.Array(AddonInfo);
export interface DescribeAddonVersionsResponse {
  addons?: AddonInfo[];
  nextToken?: string;
}
export const DescribeAddonVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ addons: S.optional(Addons), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "DescribeAddonVersionsResponse",
}) as any as S.Schema<DescribeAddonVersionsResponse>;
export interface DescribeCapabilityRequest {
  clusterName: string;
  capabilityName: string;
}
export const DescribeCapabilityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    capabilityName: S.String.pipe(T.HttpLabel("capabilityName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/clusters/{clusterName}/capabilities/{capabilityName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeCapabilityRequest",
}) as any as S.Schema<DescribeCapabilityRequest>;
export interface DescribeCapabilityResponse {
  capability?: Capability;
}
export const DescribeCapabilityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ capability: S.optional(Capability) }),
).annotate({
  identifier: "DescribeCapabilityResponse",
}) as any as S.Schema<DescribeCapabilityResponse>;
export interface DescribeClusterRequest {
  name: string;
}
export const DescribeClusterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/clusters/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeClusterRequest",
}) as any as S.Schema<DescribeClusterRequest>;
export interface DescribeClusterResponse {
  cluster?: Cluster;
}
export const DescribeClusterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cluster: S.optional(Cluster) }),
).annotate({
  identifier: "DescribeClusterResponse",
}) as any as S.Schema<DescribeClusterResponse>;
export type DescribeClusterVersionMaxResults = number;
export type ClusterVersionStatus =
  | "unsupported"
  | "standard-support"
  | "extended-support"
  | (string & {});
export const ClusterVersionStatus = /*@__PURE__*/ S.String;

export type VersionStatus =
  | "UNSUPPORTED"
  | "STANDARD_SUPPORT"
  | "EXTENDED_SUPPORT"
  | (string & {});
export const VersionStatus = /*@__PURE__*/ S.String;

export interface DescribeClusterVersionsRequest {
  clusterType?: string;
  maxResults?: number;
  nextToken?: string;
  defaultOnly?: boolean;
  includeAll?: boolean;
  clusterVersions?: string[];
  status?: ClusterVersionStatus;
  versionStatus?: VersionStatus;
}
export const DescribeClusterVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterType: S.optional(S.String).pipe(T.HttpQuery("clusterType")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    defaultOnly: S.optional(S.Boolean).pipe(T.HttpQuery("defaultOnly")),
    includeAll: S.optional(S.Boolean).pipe(T.HttpQuery("includeAll")),
    clusterVersions: S.optional(StringList).pipe(
      T.HttpQuery("clusterVersions"),
    ),
    status: S.optional(ClusterVersionStatus).pipe(T.HttpQuery("status")),
    versionStatus: S.optional(VersionStatus).pipe(T.HttpQuery("versionStatus")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/cluster-versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeClusterVersionsRequest",
}) as any as S.Schema<DescribeClusterVersionsRequest>;
export interface ClusterVersionInformation {
  clusterVersion?: string;
  clusterType?: string;
  defaultPlatformVersion?: string;
  defaultVersion?: boolean;
  releaseDate?: Date;
  endOfStandardSupportDate?: Date;
  endOfExtendedSupportDate?: Date;
  status?: ClusterVersionStatus;
  versionStatus?: VersionStatus;
  kubernetesPatchVersion?: string;
}
export const ClusterVersionInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterVersion: S.optional(S.String),
    clusterType: S.optional(S.String),
    defaultPlatformVersion: S.optional(S.String),
    defaultVersion: S.optional(S.Boolean),
    releaseDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endOfStandardSupportDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    endOfExtendedSupportDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    status: S.optional(ClusterVersionStatus),
    versionStatus: S.optional(VersionStatus),
    kubernetesPatchVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "ClusterVersionInformation",
}) as any as S.Schema<ClusterVersionInformation>;
export type ClusterVersionList = ClusterVersionInformation[];
export const ClusterVersionList = /*@__PURE__*/ S.Array(
  ClusterVersionInformation,
);
export interface DescribeClusterVersionsResponse {
  nextToken?: string;
  clusterVersions?: ClusterVersionInformation[];
}
export const DescribeClusterVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    clusterVersions: S.optional(ClusterVersionList),
  }),
).annotate({
  identifier: "DescribeClusterVersionsResponse",
}) as any as S.Schema<DescribeClusterVersionsResponse>;
export interface DescribeEksAnywhereSubscriptionRequest {
  id: string;
}
export const DescribeEksAnywhereSubscriptionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/eks-anywhere-subscriptions/{id}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeEksAnywhereSubscriptionRequest",
}) as any as S.Schema<DescribeEksAnywhereSubscriptionRequest>;
export interface DescribeEksAnywhereSubscriptionResponse {
  subscription?: EksAnywhereSubscription;
}
export const DescribeEksAnywhereSubscriptionResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ subscription: S.optional(EksAnywhereSubscription) }),
).annotate({
  identifier: "DescribeEksAnywhereSubscriptionResponse",
}) as any as S.Schema<DescribeEksAnywhereSubscriptionResponse>;
export interface DescribeFargateProfileRequest {
  clusterName: string;
  fargateProfileName: string;
}
export const DescribeFargateProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    fargateProfileName: S.String.pipe(T.HttpLabel("fargateProfileName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/clusters/{clusterName}/fargate-profiles/{fargateProfileName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeFargateProfileRequest",
}) as any as S.Schema<DescribeFargateProfileRequest>;
export interface DescribeFargateProfileResponse {
  fargateProfile?: FargateProfile;
}
export const DescribeFargateProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fargateProfile: S.optional(FargateProfile) }),
).annotate({
  identifier: "DescribeFargateProfileResponse",
}) as any as S.Schema<DescribeFargateProfileResponse>;
export interface IdentityProviderConfig {
  type: string;
  name: string;
}
export const IdentityProviderConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: S.String, name: S.String }),
).annotate({
  identifier: "IdentityProviderConfig",
}) as any as S.Schema<IdentityProviderConfig>;
export interface DescribeIdentityProviderConfigRequest {
  clusterName: string;
  identityProviderConfig: IdentityProviderConfig;
}
export const DescribeIdentityProviderConfigRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      clusterName: S.String.pipe(T.HttpLabel("clusterName")),
      identityProviderConfig: IdentityProviderConfig,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/clusters/{clusterName}/identity-provider-configs/describe",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeIdentityProviderConfigRequest",
}) as any as S.Schema<DescribeIdentityProviderConfigRequest>;
export type ConfigStatus = "CREATING" | "DELETING" | "ACTIVE" | (string & {});
export const ConfigStatus = /*@__PURE__*/ S.String;

export interface OidcIdentityProviderConfig {
  identityProviderConfigName?: string;
  identityProviderConfigArn?: string;
  clusterName?: string;
  issuerUrl?: string;
  clientId?: string;
  usernameClaim?: string;
  usernamePrefix?: string;
  groupsClaim?: string;
  groupsPrefix?: string;
  requiredClaims?: { [key: string]: string | undefined };
  tags?: { [key: string]: string | undefined };
  status?: ConfigStatus;
}
export const OidcIdentityProviderConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identityProviderConfigName: S.optional(S.String),
    identityProviderConfigArn: S.optional(S.String),
    clusterName: S.optional(S.String),
    issuerUrl: S.optional(S.String),
    clientId: S.optional(S.String),
    usernameClaim: S.optional(S.String),
    usernamePrefix: S.optional(S.String),
    groupsClaim: S.optional(S.String),
    groupsPrefix: S.optional(S.String),
    requiredClaims: S.optional(RequiredClaimsMap),
    tags: S.optional(TagMap),
    status: S.optional(ConfigStatus),
  }),
).annotate({
  identifier: "OidcIdentityProviderConfig",
}) as any as S.Schema<OidcIdentityProviderConfig>;
export interface IdentityProviderConfigResponse {
  oidc?: OidcIdentityProviderConfig;
}
export const IdentityProviderConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ oidc: S.optional(OidcIdentityProviderConfig) }),
).annotate({
  identifier: "IdentityProviderConfigResponse",
}) as any as S.Schema<IdentityProviderConfigResponse>;
export interface DescribeIdentityProviderConfigResponse {
  identityProviderConfig?: IdentityProviderConfigResponse;
}
export const DescribeIdentityProviderConfigResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      identityProviderConfig: S.optional(IdentityProviderConfigResponse),
    }),
).annotate({
  identifier: "DescribeIdentityProviderConfigResponse",
}) as any as S.Schema<DescribeIdentityProviderConfigResponse>;
export interface DescribeInsightRequest {
  clusterName: string;
  id: string;
}
export const DescribeInsightRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    id: S.String.pipe(T.HttpLabel("id")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/clusters/{clusterName}/insights/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeInsightRequest",
}) as any as S.Schema<DescribeInsightRequest>;
export type Category = "UPGRADE_READINESS" | "MISCONFIGURATION" | (string & {});
export const Category = /*@__PURE__*/ S.String;

export type InsightStatusValue =
  | "PASSING"
  | "WARNING"
  | "ERROR"
  | "UNKNOWN"
  | (string & {});
export const InsightStatusValue = /*@__PURE__*/ S.String;

export interface InsightStatus {
  status?: InsightStatusValue;
  reason?: string;
}
export const InsightStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(InsightStatusValue),
    reason: S.optional(S.String),
  }),
).annotate({ identifier: "InsightStatus" }) as any as S.Schema<InsightStatus>;
export type AdditionalInfoMap = { [key: string]: string | undefined };
export const AdditionalInfoMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface InsightResourceDetail {
  insightStatus?: InsightStatus;
  kubernetesResourceUri?: string;
  arn?: string;
}
export const InsightResourceDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    insightStatus: S.optional(InsightStatus),
    kubernetesResourceUri: S.optional(S.String),
    arn: S.optional(S.String),
  }),
).annotate({
  identifier: "InsightResourceDetail",
}) as any as S.Schema<InsightResourceDetail>;
export type InsightResourceDetails = InsightResourceDetail[];
export const InsightResourceDetails = /*@__PURE__*/ S.Array(
  InsightResourceDetail,
);
export interface ClientStat {
  userAgent?: string;
  numberOfRequestsLast30Days?: number;
  lastRequestTime?: Date;
}
export const ClientStat = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userAgent: S.optional(S.String),
    numberOfRequestsLast30Days: S.optional(S.Number),
    lastRequestTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "ClientStat" }) as any as S.Schema<ClientStat>;
export type ClientStats = ClientStat[];
export const ClientStats = /*@__PURE__*/ S.Array(ClientStat);
export interface DeprecationDetail {
  usage?: string;
  replacedWith?: string;
  stopServingVersion?: string;
  startServingReplacementVersion?: string;
  clientStats?: ClientStat[];
}
export const DeprecationDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    usage: S.optional(S.String),
    replacedWith: S.optional(S.String),
    stopServingVersion: S.optional(S.String),
    startServingReplacementVersion: S.optional(S.String),
    clientStats: S.optional(ClientStats),
  }),
).annotate({
  identifier: "DeprecationDetail",
}) as any as S.Schema<DeprecationDetail>;
export type DeprecationDetails = DeprecationDetail[];
export const DeprecationDetails = /*@__PURE__*/ S.Array(DeprecationDetail);
export interface AddonCompatibilityDetail {
  name?: string;
  compatibleVersions?: string[];
}
export const AddonCompatibilityDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    compatibleVersions: S.optional(StringList),
  }),
).annotate({
  identifier: "AddonCompatibilityDetail",
}) as any as S.Schema<AddonCompatibilityDetail>;
export type AddonCompatibilityDetails = AddonCompatibilityDetail[];
export const AddonCompatibilityDetails = /*@__PURE__*/ S.Array(
  AddonCompatibilityDetail,
);
export interface InsightCategorySpecificSummary {
  deprecationDetails?: DeprecationDetail[];
  addonCompatibilityDetails?: AddonCompatibilityDetail[];
}
export const InsightCategorySpecificSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deprecationDetails: S.optional(DeprecationDetails),
    addonCompatibilityDetails: S.optional(AddonCompatibilityDetails),
  }),
).annotate({
  identifier: "InsightCategorySpecificSummary",
}) as any as S.Schema<InsightCategorySpecificSummary>;
export interface Insight {
  id?: string;
  name?: string;
  category?: Category;
  kubernetesVersion?: string;
  lastRefreshTime?: Date;
  lastTransitionTime?: Date;
  description?: string;
  insightStatus?: InsightStatus;
  recommendation?: string;
  additionalInfo?: { [key: string]: string | undefined };
  resources?: InsightResourceDetail[];
  categorySpecificSummary?: InsightCategorySpecificSummary;
}
export const Insight = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    category: S.optional(Category),
    kubernetesVersion: S.optional(S.String),
    lastRefreshTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastTransitionTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    description: S.optional(S.String),
    insightStatus: S.optional(InsightStatus),
    recommendation: S.optional(S.String),
    additionalInfo: S.optional(AdditionalInfoMap),
    resources: S.optional(InsightResourceDetails),
    categorySpecificSummary: S.optional(InsightCategorySpecificSummary),
  }),
).annotate({ identifier: "Insight" }) as any as S.Schema<Insight>;
export interface DescribeInsightResponse {
  insight?: Insight;
}
export const DescribeInsightResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ insight: S.optional(Insight) }),
).annotate({
  identifier: "DescribeInsightResponse",
}) as any as S.Schema<DescribeInsightResponse>;
export interface DescribeInsightsRefreshRequest {
  clusterName: string;
}
export const DescribeInsightsRefreshRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ clusterName: S.String.pipe(T.HttpLabel("clusterName")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/clusters/{clusterName}/insights-refresh",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeInsightsRefreshRequest",
}) as any as S.Schema<DescribeInsightsRefreshRequest>;
export type InsightsRefreshStatus =
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export const InsightsRefreshStatus = /*@__PURE__*/ S.String;

export interface DescribeInsightsRefreshResponse {
  message?: string;
  status?: InsightsRefreshStatus;
  startedAt?: Date;
  endedAt?: Date;
}
export const DescribeInsightsRefreshResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    message: S.optional(S.String),
    status: S.optional(InsightsRefreshStatus),
    startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DescribeInsightsRefreshResponse",
}) as any as S.Schema<DescribeInsightsRefreshResponse>;
export interface DescribeNodegroupRequest {
  clusterName: string;
  nodegroupName: string;
}
export const DescribeNodegroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    nodegroupName: S.String.pipe(T.HttpLabel("nodegroupName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/clusters/{clusterName}/node-groups/{nodegroupName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeNodegroupRequest",
}) as any as S.Schema<DescribeNodegroupRequest>;
export interface DescribeNodegroupResponse {
  nodegroup?: Nodegroup;
}
export const DescribeNodegroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nodegroup: S.optional(Nodegroup) }),
).annotate({
  identifier: "DescribeNodegroupResponse",
}) as any as S.Schema<DescribeNodegroupResponse>;
export interface DescribePodIdentityAssociationRequest {
  clusterName: string;
  associationId: string;
}
export const DescribePodIdentityAssociationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      clusterName: S.String.pipe(T.HttpLabel("clusterName")),
      associationId: S.String.pipe(T.HttpLabel("associationId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/clusters/{clusterName}/pod-identity-associations/{associationId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribePodIdentityAssociationRequest",
}) as any as S.Schema<DescribePodIdentityAssociationRequest>;
export interface DescribePodIdentityAssociationResponse {
  association?: PodIdentityAssociation;
}
export const DescribePodIdentityAssociationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ association: S.optional(PodIdentityAssociation) }),
).annotate({
  identifier: "DescribePodIdentityAssociationResponse",
}) as any as S.Schema<DescribePodIdentityAssociationResponse>;
export interface DescribeUpdateRequest {
  name: string;
  updateId: string;
  nodegroupName?: string;
  addonName?: string;
  capabilityName?: string;
}
export const DescribeUpdateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    updateId: S.String.pipe(T.HttpLabel("updateId")),
    nodegroupName: S.optional(S.String).pipe(T.HttpQuery("nodegroupName")),
    addonName: S.optional(S.String).pipe(T.HttpQuery("addonName")),
    capabilityName: S.optional(S.String).pipe(T.HttpQuery("capabilityName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/clusters/{name}/updates/{updateId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeUpdateRequest",
}) as any as S.Schema<DescribeUpdateRequest>;
export interface DescribeUpdateResponse {
  update?: Update;
}
export const DescribeUpdateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ update: S.optional(Update) }),
).annotate({
  identifier: "DescribeUpdateResponse",
}) as any as S.Schema<DescribeUpdateResponse>;
export interface DisassociateAccessPolicyRequest {
  clusterName: string;
  principalArn: string;
  policyArn: string;
}
export const DisassociateAccessPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    principalArn: S.String.pipe(T.HttpLabel("principalArn")),
    policyArn: S.String.pipe(T.HttpLabel("policyArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/clusters/{clusterName}/access-entries/{principalArn}/access-policies/{policyArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateAccessPolicyRequest",
}) as any as S.Schema<DisassociateAccessPolicyRequest>;
export interface DisassociateAccessPolicyResponse {}
export const DisassociateAccessPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateAccessPolicyResponse",
}) as any as S.Schema<DisassociateAccessPolicyResponse>;
export interface DisassociateIdentityProviderConfigRequest {
  clusterName: string;
  identityProviderConfig: IdentityProviderConfig;
  clientRequestToken?: string;
}
export const DisassociateIdentityProviderConfigRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      clusterName: S.String.pipe(T.HttpLabel("clusterName")),
      identityProviderConfig: IdentityProviderConfig,
      clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/clusters/{clusterName}/identity-provider-configs/disassociate",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DisassociateIdentityProviderConfigRequest",
  }) as any as S.Schema<DisassociateIdentityProviderConfigRequest>;
export interface DisassociateIdentityProviderConfigResponse {
  update?: Update;
}
export const DisassociateIdentityProviderConfigResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ update: S.optional(Update) }),
  ).annotate({
    identifier: "DisassociateIdentityProviderConfigResponse",
  }) as any as S.Schema<DisassociateIdentityProviderConfigResponse>;
export type ListAccessEntriesRequestMaxResults = number;
export interface ListAccessEntriesRequest {
  clusterName: string;
  associatedPolicyArn?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListAccessEntriesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    associatedPolicyArn: S.optional(S.String).pipe(
      T.HttpQuery("associatedPolicyArn"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/clusters/{clusterName}/access-entries" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAccessEntriesRequest",
}) as any as S.Schema<ListAccessEntriesRequest>;
export interface ListAccessEntriesResponse {
  accessEntries?: string[];
  nextToken?: string;
}
export const ListAccessEntriesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessEntries: S.optional(StringList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAccessEntriesResponse",
}) as any as S.Schema<ListAccessEntriesResponse>;
export type ListAccessPoliciesRequestMaxResults = number;
export interface ListAccessPoliciesRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListAccessPoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/access-policies" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAccessPoliciesRequest",
}) as any as S.Schema<ListAccessPoliciesRequest>;
export interface AccessPolicy {
  name?: string;
  arn?: string;
}
export const AccessPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), arn: S.optional(S.String) }),
).annotate({ identifier: "AccessPolicy" }) as any as S.Schema<AccessPolicy>;
export type AccessPoliciesList = AccessPolicy[];
export const AccessPoliciesList = /*@__PURE__*/ S.Array(AccessPolicy);
export interface ListAccessPoliciesResponse {
  accessPolicies?: AccessPolicy[];
  nextToken?: string;
}
export const ListAccessPoliciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessPolicies: S.optional(AccessPoliciesList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAccessPoliciesResponse",
}) as any as S.Schema<ListAccessPoliciesResponse>;
export type ListAddonsRequestMaxResults = number;
export interface ListAddonsRequest {
  clusterName: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListAddonsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/clusters/{clusterName}/addons" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAddonsRequest",
}) as any as S.Schema<ListAddonsRequest>;
export interface ListAddonsResponse {
  addons?: string[];
  nextToken?: string;
}
export const ListAddonsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ addons: S.optional(StringList), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListAddonsResponse",
}) as any as S.Schema<ListAddonsResponse>;
export type ListAssociatedAccessPoliciesRequestMaxResults = number;
export interface ListAssociatedAccessPoliciesRequest {
  clusterName: string;
  principalArn: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListAssociatedAccessPoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    principalArn: S.String.pipe(T.HttpLabel("principalArn")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/clusters/{clusterName}/access-entries/{principalArn}/access-policies",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssociatedAccessPoliciesRequest",
}) as any as S.Schema<ListAssociatedAccessPoliciesRequest>;
export type AssociatedAccessPoliciesList = AssociatedAccessPolicy[];
export const AssociatedAccessPoliciesList = /*@__PURE__*/ S.Array(
  AssociatedAccessPolicy,
);
export interface ListAssociatedAccessPoliciesResponse {
  clusterName?: string;
  principalArn?: string;
  nextToken?: string;
  associatedAccessPolicies?: AssociatedAccessPolicy[];
}
export const ListAssociatedAccessPoliciesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      clusterName: S.optional(S.String),
      principalArn: S.optional(S.String),
      nextToken: S.optional(S.String),
      associatedAccessPolicies: S.optional(AssociatedAccessPoliciesList),
    }),
).annotate({
  identifier: "ListAssociatedAccessPoliciesResponse",
}) as any as S.Schema<ListAssociatedAccessPoliciesResponse>;
export type ListCapabilitiesRequestMaxResults = number;
export interface ListCapabilitiesRequest {
  clusterName: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListCapabilitiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/clusters/{clusterName}/capabilities" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCapabilitiesRequest",
}) as any as S.Schema<ListCapabilitiesRequest>;
export interface CapabilitySummary {
  capabilityName?: string;
  arn?: string;
  type?: CapabilityType;
  status?: CapabilityStatus;
  version?: string;
  createdAt?: Date;
  modifiedAt?: Date;
}
export const CapabilitySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capabilityName: S.optional(S.String),
    arn: S.optional(S.String),
    type: S.optional(CapabilityType),
    status: S.optional(CapabilityStatus),
    version: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "CapabilitySummary",
}) as any as S.Schema<CapabilitySummary>;
export type CapabilitySummaryList = CapabilitySummary[];
export const CapabilitySummaryList = /*@__PURE__*/ S.Array(CapabilitySummary);
export interface ListCapabilitiesResponse {
  capabilities?: CapabilitySummary[];
  nextToken?: string;
}
export const ListCapabilitiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capabilities: S.optional(CapabilitySummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCapabilitiesResponse",
}) as any as S.Schema<ListCapabilitiesResponse>;
export type ListClustersRequestMaxResults = number;
export type IncludeClustersList = string[];
export const IncludeClustersList = /*@__PURE__*/ S.Array(S.String);
export interface ListClustersRequest {
  maxResults?: number;
  nextToken?: string;
  include?: string[];
}
export const ListClustersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    include: S.optional(IncludeClustersList).pipe(T.HttpQuery("include")),
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
  identifier: "ListClustersRequest",
}) as any as S.Schema<ListClustersRequest>;
export interface ListClustersResponse {
  clusters?: string[];
  nextToken?: string;
}
export const ListClustersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusters: S.optional(StringList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListClustersResponse",
}) as any as S.Schema<ListClustersResponse>;
export type ListEksAnywhereSubscriptionsRequestMaxResults = number;
export type EksAnywhereSubscriptionStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "EXPIRING"
  | "EXPIRED"
  | "DELETING"
  | (string & {});
export const EksAnywhereSubscriptionStatus = /*@__PURE__*/ S.String;

export type EksAnywhereSubscriptionStatusValues =
  EksAnywhereSubscriptionStatus[];
export const EksAnywhereSubscriptionStatusValues = /*@__PURE__*/ S.Array(
  EksAnywhereSubscriptionStatus,
);
export interface ListEksAnywhereSubscriptionsRequest {
  maxResults?: number;
  nextToken?: string;
  includeStatus?: EksAnywhereSubscriptionStatus[];
}
export const ListEksAnywhereSubscriptionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    includeStatus: S.optional(EksAnywhereSubscriptionStatusValues).pipe(
      T.HttpQuery("includeStatus"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/eks-anywhere-subscriptions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEksAnywhereSubscriptionsRequest",
}) as any as S.Schema<ListEksAnywhereSubscriptionsRequest>;
export type EksAnywhereSubscriptionList = EksAnywhereSubscription[];
export const EksAnywhereSubscriptionList = /*@__PURE__*/ S.Array(
  EksAnywhereSubscription,
);
export interface ListEksAnywhereSubscriptionsResponse {
  subscriptions?: EksAnywhereSubscription[];
  nextToken?: string;
}
export const ListEksAnywhereSubscriptionsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      subscriptions: S.optional(EksAnywhereSubscriptionList),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListEksAnywhereSubscriptionsResponse",
}) as any as S.Schema<ListEksAnywhereSubscriptionsResponse>;
export type FargateProfilesRequestMaxResults = number;
export interface ListFargateProfilesRequest {
  clusterName: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListFargateProfilesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/clusters/{clusterName}/fargate-profiles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFargateProfilesRequest",
}) as any as S.Schema<ListFargateProfilesRequest>;
export interface ListFargateProfilesResponse {
  fargateProfileNames?: string[];
  nextToken?: string;
}
export const ListFargateProfilesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fargateProfileNames: S.optional(StringList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFargateProfilesResponse",
}) as any as S.Schema<ListFargateProfilesResponse>;
export type ListIdentityProviderConfigsRequestMaxResults = number;
export interface ListIdentityProviderConfigsRequest {
  clusterName: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListIdentityProviderConfigsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/clusters/{clusterName}/identity-provider-configs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIdentityProviderConfigsRequest",
}) as any as S.Schema<ListIdentityProviderConfigsRequest>;
export type IdentityProviderConfigs = IdentityProviderConfig[];
export const IdentityProviderConfigs = /*@__PURE__*/ S.Array(
  IdentityProviderConfig,
);
export interface ListIdentityProviderConfigsResponse {
  identityProviderConfigs?: IdentityProviderConfig[];
  nextToken?: string;
}
export const ListIdentityProviderConfigsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identityProviderConfigs: S.optional(IdentityProviderConfigs),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListIdentityProviderConfigsResponse",
}) as any as S.Schema<ListIdentityProviderConfigsResponse>;
export type CategoryList = Category[];
export const CategoryList = /*@__PURE__*/ S.Array(Category);
export type InsightStatusValueList = InsightStatusValue[];
export const InsightStatusValueList = /*@__PURE__*/ S.Array(InsightStatusValue);
export interface InsightsFilter {
  categories?: Category[];
  kubernetesVersions?: string[];
  statuses?: InsightStatusValue[];
}
export const InsightsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    categories: S.optional(CategoryList),
    kubernetesVersions: S.optional(StringList),
    statuses: S.optional(InsightStatusValueList),
  }),
).annotate({ identifier: "InsightsFilter" }) as any as S.Schema<InsightsFilter>;
export type ListInsightsMaxResults = number;
export interface ListInsightsRequest {
  clusterName: string;
  filter?: InsightsFilter;
  maxResults?: number;
  nextToken?: string;
}
export const ListInsightsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    filter: S.optional(InsightsFilter),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/clusters/{clusterName}/insights" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListInsightsRequest",
}) as any as S.Schema<ListInsightsRequest>;
export interface InsightSummary {
  id?: string;
  name?: string;
  category?: Category;
  kubernetesVersion?: string;
  lastRefreshTime?: Date;
  lastTransitionTime?: Date;
  description?: string;
  insightStatus?: InsightStatus;
}
export const InsightSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    category: S.optional(Category),
    kubernetesVersion: S.optional(S.String),
    lastRefreshTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastTransitionTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    description: S.optional(S.String),
    insightStatus: S.optional(InsightStatus),
  }),
).annotate({ identifier: "InsightSummary" }) as any as S.Schema<InsightSummary>;
export type InsightSummaries = InsightSummary[];
export const InsightSummaries = /*@__PURE__*/ S.Array(InsightSummary);
export interface ListInsightsResponse {
  insights?: InsightSummary[];
  nextToken?: string;
}
export const ListInsightsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    insights: S.optional(InsightSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListInsightsResponse",
}) as any as S.Schema<ListInsightsResponse>;
export type ListNodegroupsRequestMaxResults = number;
export interface ListNodegroupsRequest {
  clusterName: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListNodegroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/clusters/{clusterName}/node-groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListNodegroupsRequest",
}) as any as S.Schema<ListNodegroupsRequest>;
export interface ListNodegroupsResponse {
  nodegroups?: string[];
  nextToken?: string;
}
export const ListNodegroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodegroups: S.optional(StringList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListNodegroupsResponse",
}) as any as S.Schema<ListNodegroupsResponse>;
export type ListPodIdentityAssociationsMaxResults = number;
export interface ListPodIdentityAssociationsRequest {
  clusterName: string;
  namespace?: string;
  serviceAccount?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListPodIdentityAssociationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
    serviceAccount: S.optional(S.String).pipe(T.HttpQuery("serviceAccount")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/clusters/{clusterName}/pod-identity-associations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPodIdentityAssociationsRequest",
}) as any as S.Schema<ListPodIdentityAssociationsRequest>;
export interface PodIdentityAssociationSummary {
  clusterName?: string;
  namespace?: string;
  serviceAccount?: string;
  associationArn?: string;
  associationId?: string;
  ownerArn?: string;
}
export const PodIdentityAssociationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.optional(S.String),
    namespace: S.optional(S.String),
    serviceAccount: S.optional(S.String),
    associationArn: S.optional(S.String),
    associationId: S.optional(S.String),
    ownerArn: S.optional(S.String),
  }),
).annotate({
  identifier: "PodIdentityAssociationSummary",
}) as any as S.Schema<PodIdentityAssociationSummary>;
export type PodIdentityAssociationSummaries = PodIdentityAssociationSummary[];
export const PodIdentityAssociationSummaries = /*@__PURE__*/ S.Array(
  PodIdentityAssociationSummary,
);
export interface ListPodIdentityAssociationsResponse {
  associations?: PodIdentityAssociationSummary[];
  nextToken?: string;
}
export const ListPodIdentityAssociationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    associations: S.optional(PodIdentityAssociationSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPodIdentityAssociationsResponse",
}) as any as S.Schema<ListPodIdentityAssociationsResponse>;
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
export type ListUpdatesRequestMaxResults = number;
export interface ListUpdatesRequest {
  name: string;
  nodegroupName?: string;
  addonName?: string;
  capabilityName?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListUpdatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    nodegroupName: S.optional(S.String).pipe(T.HttpQuery("nodegroupName")),
    addonName: S.optional(S.String).pipe(T.HttpQuery("addonName")),
    capabilityName: S.optional(S.String).pipe(T.HttpQuery("capabilityName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/clusters/{name}/updates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListUpdatesRequest",
}) as any as S.Schema<ListUpdatesRequest>;
export interface ListUpdatesResponse {
  updateIds?: string[];
  nextToken?: string;
}
export const ListUpdatesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    updateIds: S.optional(StringList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListUpdatesResponse",
}) as any as S.Schema<ListUpdatesResponse>;
export type ConnectorConfigProvider =
  | "EKS_ANYWHERE"
  | "ANTHOS"
  | "GKE"
  | "AKS"
  | "OPENSHIFT"
  | "TANZU"
  | "RANCHER"
  | "EC2"
  | "OTHER"
  | (string & {});
export const ConnectorConfigProvider = /*@__PURE__*/ S.String;

export interface ConnectorConfigRequest {
  roleArn: string;
  provider: ConnectorConfigProvider;
}
export const ConnectorConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ roleArn: S.String, provider: ConnectorConfigProvider }),
).annotate({
  identifier: "ConnectorConfigRequest",
}) as any as S.Schema<ConnectorConfigRequest>;
export interface RegisterClusterRequest {
  name: string;
  connectorConfig: ConnectorConfigRequest;
  clientRequestToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const RegisterClusterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    connectorConfig: ConnectorConfigRequest,
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/cluster-registrations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterClusterRequest",
}) as any as S.Schema<RegisterClusterRequest>;
export interface RegisterClusterResponse {
  cluster?: Cluster;
}
export const RegisterClusterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cluster: S.optional(Cluster) }),
).annotate({
  identifier: "RegisterClusterResponse",
}) as any as S.Schema<RegisterClusterResponse>;
export interface StartInsightsRefreshRequest {
  clusterName: string;
}
export const StartInsightsRefreshRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ clusterName: S.String.pipe(T.HttpLabel("clusterName")) }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/clusters/{clusterName}/insights-refresh",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartInsightsRefreshRequest",
}) as any as S.Schema<StartInsightsRefreshRequest>;
export interface StartInsightsRefreshResponse {
  message?: string;
  status?: InsightsRefreshStatus;
}
export const StartInsightsRefreshResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    message: S.optional(S.String),
    status: S.optional(InsightsRefreshStatus),
  }),
).annotate({
  identifier: "StartInsightsRefreshResponse",
}) as any as S.Schema<StartInsightsRefreshResponse>;
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
export interface UpdateAccessEntryRequest {
  clusterName: string;
  principalArn: string;
  kubernetesGroups?: string[];
  clientRequestToken?: string;
  username?: string;
}
export const UpdateAccessEntryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    principalArn: S.String.pipe(T.HttpLabel("principalArn")),
    kubernetesGroups: S.optional(StringList),
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    username: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/clusters/{clusterName}/access-entries/{principalArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAccessEntryRequest",
}) as any as S.Schema<UpdateAccessEntryRequest>;
export interface UpdateAccessEntryResponse {
  accessEntry?: AccessEntry;
}
export const UpdateAccessEntryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accessEntry: S.optional(AccessEntry) }),
).annotate({
  identifier: "UpdateAccessEntryResponse",
}) as any as S.Schema<UpdateAccessEntryResponse>;
export interface UpdateAddonRequest {
  clusterName: string;
  addonName: string;
  addonVersion?: string;
  serviceAccountRoleArn?: string;
  resolveConflicts?: ResolveConflicts;
  clientRequestToken?: string;
  configurationValues?: string;
  podIdentityAssociations?: AddonPodIdentityAssociations[];
}
export const UpdateAddonRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    addonName: S.String.pipe(T.HttpLabel("addonName")),
    addonVersion: S.optional(S.String),
    serviceAccountRoleArn: S.optional(S.String),
    resolveConflicts: S.optional(ResolveConflicts),
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    configurationValues: S.optional(S.String),
    podIdentityAssociations: S.optional(AddonPodIdentityAssociationsList),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/clusters/{clusterName}/addons/{addonName}/update",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAddonRequest",
}) as any as S.Schema<UpdateAddonRequest>;
export interface UpdateAddonResponse {
  update?: Update;
}
export const UpdateAddonResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ update: S.optional(Update) }),
).annotate({
  identifier: "UpdateAddonResponse",
}) as any as S.Schema<UpdateAddonResponse>;
export interface UpdateRoleMappings {
  addOrUpdateRoleMappings?: ArgoCdRoleMapping[];
  removeRoleMappings?: ArgoCdRoleMapping[];
}
export const UpdateRoleMappings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    addOrUpdateRoleMappings: S.optional(ArgoCdRoleMappingList),
    removeRoleMappings: S.optional(ArgoCdRoleMappingList),
  }),
).annotate({
  identifier: "UpdateRoleMappings",
}) as any as S.Schema<UpdateRoleMappings>;
export interface UpdateArgoCdConfig {
  rbacRoleMappings?: UpdateRoleMappings;
  networkAccess?: ArgoCdNetworkAccessConfigRequest;
}
export const UpdateArgoCdConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    rbacRoleMappings: S.optional(UpdateRoleMappings),
    networkAccess: S.optional(ArgoCdNetworkAccessConfigRequest),
  }),
).annotate({
  identifier: "UpdateArgoCdConfig",
}) as any as S.Schema<UpdateArgoCdConfig>;
export interface UpdateCapabilityConfiguration {
  argoCd?: UpdateArgoCdConfig;
}
export const UpdateCapabilityConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ argoCd: S.optional(UpdateArgoCdConfig) }),
).annotate({
  identifier: "UpdateCapabilityConfiguration",
}) as any as S.Schema<UpdateCapabilityConfiguration>;
export interface UpdateCapabilityRequest {
  clusterName: string;
  capabilityName: string;
  roleArn?: string;
  configuration?: UpdateCapabilityConfiguration;
  clientRequestToken?: string;
  deletePropagationPolicy?: CapabilityDeletePropagationPolicy;
}
export const UpdateCapabilityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    capabilityName: S.String.pipe(T.HttpLabel("capabilityName")),
    roleArn: S.optional(S.String),
    configuration: S.optional(UpdateCapabilityConfiguration),
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    deletePropagationPolicy: S.optional(CapabilityDeletePropagationPolicy),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/clusters/{clusterName}/capabilities/{capabilityName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCapabilityRequest",
}) as any as S.Schema<UpdateCapabilityRequest>;
export interface UpdateCapabilityResponse {
  update?: Update;
}
export const UpdateCapabilityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ update: S.optional(Update) }),
).annotate({
  identifier: "UpdateCapabilityResponse",
}) as any as S.Schema<UpdateCapabilityResponse>;
export interface UpdateAccessConfigRequest {
  authenticationMode?: AuthenticationMode;
}
export const UpdateAccessConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ authenticationMode: S.optional(AuthenticationMode) }),
).annotate({
  identifier: "UpdateAccessConfigRequest",
}) as any as S.Schema<UpdateAccessConfigRequest>;
export interface UpdateClusterConfigRequest {
  name: string;
  resourcesVpcConfig?: VpcConfigRequest;
  logging?: Logging;
  clientRequestToken?: string;
  accessConfig?: UpdateAccessConfigRequest;
  upgradePolicy?: UpgradePolicyRequest;
  zonalShiftConfig?: ZonalShiftConfigRequest;
  computeConfig?: ComputeConfigRequest;
  kubernetesNetworkConfig?: KubernetesNetworkConfigRequest;
  storageConfig?: StorageConfigRequest;
  remoteNetworkConfig?: RemoteNetworkConfigRequest;
  deletionProtection?: boolean;
  controlPlaneScalingConfig?: ControlPlaneScalingConfig;
}
export const UpdateClusterConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    resourcesVpcConfig: S.optional(VpcConfigRequest),
    logging: S.optional(Logging),
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    accessConfig: S.optional(UpdateAccessConfigRequest),
    upgradePolicy: S.optional(UpgradePolicyRequest),
    zonalShiftConfig: S.optional(ZonalShiftConfigRequest),
    computeConfig: S.optional(ComputeConfigRequest),
    kubernetesNetworkConfig: S.optional(KubernetesNetworkConfigRequest),
    storageConfig: S.optional(StorageConfigRequest),
    remoteNetworkConfig: S.optional(RemoteNetworkConfigRequest),
    deletionProtection: S.optional(S.Boolean),
    controlPlaneScalingConfig: S.optional(ControlPlaneScalingConfig),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/clusters/{name}/update-config" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateClusterConfigRequest",
}) as any as S.Schema<UpdateClusterConfigRequest>;
export interface UpdateClusterConfigResponse {
  update?: Update;
}
export const UpdateClusterConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ update: S.optional(Update) }),
).annotate({
  identifier: "UpdateClusterConfigResponse",
}) as any as S.Schema<UpdateClusterConfigResponse>;
export interface UpdateClusterVersionRequest {
  name: string;
  version: string;
  clientRequestToken?: string;
  force?: boolean;
}
export const UpdateClusterVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    version: S.String,
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    force: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/clusters/{name}/updates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateClusterVersionRequest",
}) as any as S.Schema<UpdateClusterVersionRequest>;
export interface UpdateClusterVersionResponse {
  update?: Update;
}
export const UpdateClusterVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ update: S.optional(Update) }),
).annotate({
  identifier: "UpdateClusterVersionResponse",
}) as any as S.Schema<UpdateClusterVersionResponse>;
export interface UpdateEksAnywhereSubscriptionRequest {
  id: string;
  autoRenew: boolean;
  clientRequestToken?: string;
}
export const UpdateEksAnywhereSubscriptionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      id: S.String.pipe(T.HttpLabel("id")),
      autoRenew: S.Boolean,
      clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/eks-anywhere-subscriptions/{id}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateEksAnywhereSubscriptionRequest",
}) as any as S.Schema<UpdateEksAnywhereSubscriptionRequest>;
export interface UpdateEksAnywhereSubscriptionResponse {
  subscription?: EksAnywhereSubscription;
}
export const UpdateEksAnywhereSubscriptionResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ subscription: S.optional(EksAnywhereSubscription) }),
).annotate({
  identifier: "UpdateEksAnywhereSubscriptionResponse",
}) as any as S.Schema<UpdateEksAnywhereSubscriptionResponse>;
export type LabelsKeyList = string[];
export const LabelsKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UpdateLabelsPayload {
  addOrUpdateLabels?: { [key: string]: string | undefined };
  removeLabels?: string[];
}
export const UpdateLabelsPayload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    addOrUpdateLabels: S.optional(LabelsMap),
    removeLabels: S.optional(LabelsKeyList),
  }),
).annotate({
  identifier: "UpdateLabelsPayload",
}) as any as S.Schema<UpdateLabelsPayload>;
export interface UpdateTaintsPayload {
  addOrUpdateTaints?: Taint[];
  removeTaints?: Taint[];
}
export const UpdateTaintsPayload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    addOrUpdateTaints: S.optional(TaintsList),
    removeTaints: S.optional(TaintsList),
  }),
).annotate({
  identifier: "UpdateTaintsPayload",
}) as any as S.Schema<UpdateTaintsPayload>;
export interface UpdateNodegroupConfigRequest {
  clusterName: string;
  nodegroupName: string;
  labels?: UpdateLabelsPayload;
  taints?: UpdateTaintsPayload;
  scalingConfig?: NodegroupScalingConfig;
  updateConfig?: NodegroupUpdateConfig;
  nodeRepairConfig?: NodeRepairConfig;
  warmPoolConfig?: WarmPoolConfig;
  clientRequestToken?: string;
}
export const UpdateNodegroupConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    nodegroupName: S.String.pipe(T.HttpLabel("nodegroupName")),
    labels: S.optional(UpdateLabelsPayload),
    taints: S.optional(UpdateTaintsPayload),
    scalingConfig: S.optional(NodegroupScalingConfig),
    updateConfig: S.optional(NodegroupUpdateConfig),
    nodeRepairConfig: S.optional(NodeRepairConfig),
    warmPoolConfig: S.optional(WarmPoolConfig),
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/clusters/{clusterName}/node-groups/{nodegroupName}/update-config",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateNodegroupConfigRequest",
}) as any as S.Schema<UpdateNodegroupConfigRequest>;
export interface UpdateNodegroupConfigResponse {
  update?: Update;
}
export const UpdateNodegroupConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ update: S.optional(Update) }),
).annotate({
  identifier: "UpdateNodegroupConfigResponse",
}) as any as S.Schema<UpdateNodegroupConfigResponse>;
export interface UpdateNodegroupVersionRequest {
  clusterName: string;
  nodegroupName: string;
  version?: string;
  releaseVersion?: string;
  launchTemplate?: LaunchTemplateSpecification;
  force?: boolean;
  clientRequestToken?: string;
}
export const UpdateNodegroupVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    nodegroupName: S.String.pipe(T.HttpLabel("nodegroupName")),
    version: S.optional(S.String),
    releaseVersion: S.optional(S.String),
    launchTemplate: S.optional(LaunchTemplateSpecification),
    force: S.optional(S.Boolean),
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/clusters/{clusterName}/node-groups/{nodegroupName}/update-version",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateNodegroupVersionRequest",
}) as any as S.Schema<UpdateNodegroupVersionRequest>;
export interface UpdateNodegroupVersionResponse {
  update?: Update;
}
export const UpdateNodegroupVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ update: S.optional(Update) }),
).annotate({
  identifier: "UpdateNodegroupVersionResponse",
}) as any as S.Schema<UpdateNodegroupVersionResponse>;
export interface UpdatePodIdentityAssociationRequest {
  clusterName: string;
  associationId: string;
  roleArn?: string;
  clientRequestToken?: string;
  disableSessionTags?: boolean;
  targetRoleArn?: string;
  policy?: string;
}
export const UpdatePodIdentityAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    associationId: S.String.pipe(T.HttpLabel("associationId")),
    roleArn: S.optional(S.String),
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    disableSessionTags: S.optional(S.Boolean),
    targetRoleArn: S.optional(S.String),
    policy: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/clusters/{clusterName}/pod-identity-associations/{associationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePodIdentityAssociationRequest",
}) as any as S.Schema<UpdatePodIdentityAssociationRequest>;
export interface UpdatePodIdentityAssociationResponse {
  association?: PodIdentityAssociation;
}
export const UpdatePodIdentityAssociationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ association: S.optional(PodIdentityAssociation) }),
).annotate({
  identifier: "UpdatePodIdentityAssociationResponse",
}) as any as S.Schema<UpdatePodIdentityAssociationResponse>;
export type AssociateAccessPolicyError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Associates an access policy and its scope to an access entry. For more information
 * about associating access policies, see Associating and disassociating
 * access policies to and from access entries in the *Amazon EKS User Guide*.
 */
export const associateAccessPolicy: API.OperationMethod<
  AssociateAccessPolicyRequest,
  AssociateAccessPolicyResponse,
  AssociateAccessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateAccessPolicyRequest,
  output: AssociateAccessPolicyResponse,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateAccessPolicy",
}));

export type AssociateEncryptionConfigError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates an encryption configuration to an existing cluster.
 *
 * Use this API to enable encryption on existing clusters that don't already have
 * encryption enabled. This allows you to implement a defense-in-depth security strategy
 * without migrating applications to new Amazon EKS clusters.
 */
export const associateEncryptionConfig: API.OperationMethod<
  AssociateEncryptionConfigRequest,
  AssociateEncryptionConfigResponse,
  AssociateEncryptionConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateEncryptionConfigRequest,
  output: AssociateEncryptionConfigResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateEncryptionConfig",
}));

export type AssociateIdentityProviderConfigError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates an identity provider configuration to a cluster.
 *
 * If you want to authenticate identities using an identity provider, you can create an
 * identity provider configuration and associate it to your cluster. After configuring
 * authentication to your cluster you can create Kubernetes `Role` and
 * `ClusterRole` objects, assign permissions to them, and then bind them to
 * the identities using Kubernetes `RoleBinding` and `ClusterRoleBinding`
 * objects. For more information see Using RBAC
 * Authorization in the Kubernetes documentation.
 */
export const associateIdentityProviderConfig: API.OperationMethod<
  AssociateIdentityProviderConfigRequest,
  AssociateIdentityProviderConfigResponse,
  AssociateIdentityProviderConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateIdentityProviderConfigRequest,
  output: AssociateIdentityProviderConfigResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateIdentityProviderConfig",
}));

export type CreateAccessEntryError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Creates an access entry.
 *
 * An access entry allows an IAM principal to access your cluster. Access
 * entries can replace the need to maintain entries in the `aws-auth`
 * `ConfigMap` for authentication. You have the following options for
 * authorizing an IAM principal to access Kubernetes objects on your cluster: Kubernetes
 * role-based access control (RBAC), Amazon EKS, or both. Kubernetes RBAC authorization requires you
 * to create and manage Kubernetes `Role`, `ClusterRole`,
 * `RoleBinding`, and `ClusterRoleBinding` objects, in addition
 * to managing access entries. If you use Amazon EKS authorization exclusively, you don't need
 * to create and manage Kubernetes `Role`, `ClusterRole`,
 * `RoleBinding`, and `ClusterRoleBinding` objects.
 *
 * For more information about access entries, see Access entries in the
 * *Amazon EKS User Guide*.
 */
export const createAccessEntry: API.OperationMethod<
  CreateAccessEntryRequest,
  CreateAccessEntryResponse,
  CreateAccessEntryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAccessEntryRequest,
  output: CreateAccessEntryResponse,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessEntry",
}));

export type CreateAddonError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Creates an Amazon EKS add-on.
 *
 * Amazon EKS add-ons help to automate the provisioning and lifecycle management of common
 * operational software for Amazon EKS clusters. For more information, see Amazon EKS
 * add-ons in the *Amazon EKS User Guide*.
 */
export const createAddon: API.OperationMethod<
  CreateAddonRequest,
  CreateAddonResponse,
  CreateAddonError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAddonRequest,
  output: CreateAddonResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAddon",
}));

export type CreateCapabilityError =
  | AccessDeniedException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceLimitExceededException
  | ServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a managed capability resource for an Amazon EKS cluster.
 *
 * Capabilities provide fully managed capabilities to build and scale with Kubernetes. When you create a capability, Amazon EKSprovisions and manages the infrastructure required to run the capability outside of your cluster. This approach reduces operational overhead and preserves cluster resources.
 *
 * You can only create one Capability of each type on a given Amazon EKS cluster. Valid types are Argo CD for declarative GitOps deployment, Amazon Web Services Controllers for Kubernetes (ACK) for resource management, and Kube Resource Orchestrator (KRO) for Kubernetes custom resource orchestration.
 *
 * For more information, see EKS Capabilities in the *Amazon EKS User Guide*.
 */
export const createCapability: API.OperationMethod<
  CreateCapabilityRequest,
  CreateCapabilityResponse,
  CreateCapabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCapabilityRequest,
  output: CreateCapabilityResponse,
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceLimitExceededException,
    ServerException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCapability",
}));

export type CreateClusterError =
  | ClientException
  | InvalidParameterException
  | ResourceInUseException
  | ResourceLimitExceededException
  | ServerException
  | ServiceUnavailableException
  | UnsupportedAvailabilityZoneException
  | CommonErrors;
/**
 * Creates an Amazon EKS control plane.
 *
 * The Amazon EKS control plane consists of control plane instances that run the Kubernetes
 * software, such as `etcd` and the API server. The control plane runs in an
 * account managed by Amazon Web Services, and the Kubernetes API is exposed by the Amazon EKS API server endpoint.
 * Each Amazon EKS cluster control plane is single tenant and unique. It runs on its own set of
 * Amazon EC2 instances.
 *
 * The cluster control plane is provisioned across multiple Availability Zones and fronted by an Elastic Load Balancing
 * Network Load Balancer. Amazon EKS also provisions elastic network interfaces in your VPC subnets to provide
 * connectivity from the control plane instances to the nodes (for example, to support
 * `kubectl exec`, `logs`, and `proxy` data
 * flows).
 *
 * Amazon EKS nodes run in your Amazon Web Services account and connect to your cluster's control plane over
 * the Kubernetes API server endpoint and a certificate file that is created for your
 * cluster.
 *
 * You can use the `endpointPublicAccess` and
 * `endpointPrivateAccess` parameters to enable or disable public and
 * private access to your cluster's Kubernetes API server endpoint. By default, public access is
 * enabled, and private access is disabled. The
 * endpoint domain name and IP address family depends on the value of the
 * `ipFamily` for the cluster. For more information, see Amazon EKS Cluster
 * Endpoint Access Control in the
 * *Amazon EKS User Guide*
 * .
 *
 * You can use the `logging` parameter to enable or disable exporting the
 * Kubernetes control plane logs for your cluster to CloudWatch Logs. By default, cluster control plane
 * logs aren't exported to CloudWatch Logs. For more information, see Amazon EKS
 * Cluster Control Plane Logs in the
 *
 * *Amazon EKS User Guide*
 * .
 *
 * CloudWatch Logs ingestion, archive storage, and data scanning rates apply to exported
 * control plane logs. For more information, see CloudWatch Pricing.
 *
 * In most cases, it takes several minutes to create a cluster. After you create an Amazon EKS
 * cluster, you must configure your Kubernetes tooling to communicate with the API server and
 * launch nodes into your cluster. For more information, see Allowing users to
 * access your cluster and Launching Amazon EKS
 * nodes in the *Amazon EKS User Guide*.
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
    ClientException,
    InvalidParameterException,
    ResourceInUseException,
    ResourceLimitExceededException,
    ServerException,
    ServiceUnavailableException,
    UnsupportedAvailabilityZoneException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCluster",
}));

export type CreateEksAnywhereSubscriptionError =
  | ClientException
  | InvalidParameterException
  | ResourceLimitExceededException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates an EKS Anywhere subscription. When a subscription is created, it is a contract
 * agreement for the length of the term specified in the request. Licenses that are used to
 * validate support are provisioned in Amazon Web Services License Manager and the caller account is
 * granted access to EKS Anywhere Curated Packages.
 */
export const createEksAnywhereSubscription: API.OperationMethod<
  CreateEksAnywhereSubscriptionRequest,
  CreateEksAnywhereSubscriptionResponse,
  CreateEksAnywhereSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEksAnywhereSubscriptionRequest,
  output: CreateEksAnywhereSubscriptionResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    ResourceLimitExceededException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEksAnywhereSubscription",
}));

export type CreateFargateProfileError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceLimitExceededException
  | ServerException
  | UnsupportedAvailabilityZoneException
  | ResourceInUseException
  | CommonErrors;
/**
 * Creates an Fargate profile for your Amazon EKS cluster. You must have at least one
 * Fargate profile in a cluster to be able to run pods on Fargate.
 *
 * The Fargate profile allows an administrator to declare which pods run on Fargate
 * and specify which pods run on which Fargate profile. This declaration is done through
 * the profile's selectors. Each profile can have up to five selectors that contain a
 * namespace and labels. A namespace is required for every selector. The label field
 * consists of multiple optional key-value pairs. Pods that match the selectors are
 * scheduled on Fargate. If a to-be-scheduled pod matches any of the selectors in the
 * Fargate profile, then that pod is run on Fargate.
 *
 * When you create a Fargate profile, you must specify a pod execution role to use with
 * the pods that are scheduled with the profile. This role is added to the cluster's Kubernetes
 * Role
 * Based Access Control (RBAC) for authorization so that the
 * `kubelet` that is running on the Fargate infrastructure can register
 * with your Amazon EKS cluster so that it can appear in your cluster as a node. The pod
 * execution role also provides IAM permissions to the Fargate infrastructure to allow
 * read access to Amazon ECR image repositories. For more information, see Pod
 * Execution Role in the *Amazon EKS User Guide*.
 *
 * Fargate profiles are immutable. However, you can create a new updated profile to
 * replace an existing profile and then delete the original after the updated profile has
 * finished creating.
 *
 * If any Fargate profiles in a cluster are in the `DELETING` status, you
 * must wait for that Fargate profile to finish deleting before you can create any other
 * profiles in that cluster.
 *
 * For more information, see Fargate profile in the *Amazon EKS User Guide*.
 */
export const createFargateProfile: API.OperationMethod<
  CreateFargateProfileRequest,
  CreateFargateProfileResponse,
  CreateFargateProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFargateProfileRequest,
  output: CreateFargateProfileResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceLimitExceededException,
    ServerException,
    UnsupportedAvailabilityZoneException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFargateProfile",
}));

export type CreateNodegroupError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceLimitExceededException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a managed node group for an Amazon EKS cluster.
 *
 * You can only create a node group for your cluster that is equal to the current Kubernetes
 * version for the cluster. All node groups are created with the latest AMI release version
 * for the respective minor Kubernetes version of the cluster, unless you deploy a custom AMI
 * using a launch template.
 *
 * For later updates, you will only be able to update a node group using a launch
 * template only if it was originally deployed with a launch template. Additionally, the
 * launch template ID or name must match what was used when the node group was created. You
 * can update the launch template version with necessary changes. For more information
 * about using launch templates, see Customizing managed nodes with
 * launch templates.
 *
 * An Amazon EKS managed node group is an Amazon EC2 Auto Scaling group and associated Amazon EC2 instances that
 * are managed by Amazon Web Services for an Amazon EKS cluster. For more information, see Managed
 * node groups in the *Amazon EKS User Guide*.
 *
 * Windows AMI types are only supported for commercial Amazon Web Services Regions that support
 * Windows on Amazon EKS.
 */
export const createNodegroup: API.OperationMethod<
  CreateNodegroupRequest,
  CreateNodegroupResponse,
  CreateNodegroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateNodegroupRequest,
  output: CreateNodegroupResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceLimitExceededException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNodegroup",
}));

export type CreatePodIdentityAssociationError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Creates an EKS Pod Identity association between a service account in an Amazon EKS cluster and an IAM role
 * with *EKS Pod Identity*. Use EKS Pod Identity to give temporary IAM credentials to
 * Pods and the credentials are rotated automatically.
 *
 * Amazon EKS Pod Identity associations provide the ability to manage credentials for your applications, similar to the way that Amazon EC2 instance profiles provide credentials to Amazon EC2 instances.
 *
 * If a Pod uses a service account that has an association, Amazon EKS sets environment variables
 * in the containers of the Pod. The environment variables configure the Amazon Web Services SDKs,
 * including the Command Line Interface, to use the EKS Pod Identity credentials.
 *
 * EKS Pod Identity is a simpler method than IAM roles for service
 * accounts, as this method doesn't use OIDC identity providers.
 * Additionally, you can configure a role for EKS Pod Identity once, and reuse it across
 * clusters.
 *
 * Similar to Amazon Web Services IAM behavior, EKS Pod Identity associations are eventually consistent,
 * and may take several seconds to be effective after the initial API call returns
 * successfully. You must design your applications to account for these potential delays.
 * We recommend that you don’t include association create/updates in the
 * critical, high-availability code paths of your application. Instead, make changes in a
 * separate initialization or setup routine that you run less frequently.
 *
 * You can set a *target IAM role* in the same or a different
 * account for advanced scenarios. With a target role, EKS Pod Identity automatically performs two
 * role assumptions in sequence: first assuming the role in the association that is in this
 * account, then using those credentials to assume the target IAM role. This process
 * provides your Pod with temporary credentials that have the permissions defined in the
 * target role, allowing secure access to resources in another Amazon Web Services account.
 */
export const createPodIdentityAssociation: API.OperationMethod<
  CreatePodIdentityAssociationRequest,
  CreatePodIdentityAssociationResponse,
  CreatePodIdentityAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePodIdentityAssociationRequest,
  output: CreatePodIdentityAssociationResponse,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePodIdentityAssociation",
}));

export type DeleteAccessEntryError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Deletes an access entry.
 *
 * Deleting an access entry of a type other than `Standard` can cause your
 * cluster to function improperly. If you delete an access entry in error, you can recreate
 * it.
 */
export const deleteAccessEntry: API.OperationMethod<
  DeleteAccessEntryRequest,
  DeleteAccessEntryResponse,
  DeleteAccessEntryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccessEntryRequest,
  output: DeleteAccessEntryResponse,
  errors: [InvalidRequestException, ResourceNotFoundException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessEntry",
}));

export type DeleteAddonError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Deletes an Amazon EKS add-on.
 *
 * When you remove an add-on, it's deleted from the cluster. You can always manually
 * start an add-on on the cluster using the Kubernetes API.
 */
export const deleteAddon: API.OperationMethod<
  DeleteAddonRequest,
  DeleteAddonResponse,
  DeleteAddonError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAddonRequest,
  output: DeleteAddonResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAddon",
}));

export type DeleteCapabilityError =
  | AccessDeniedException
  | InvalidParameterException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Deletes a managed capability from your Amazon EKS cluster. When you delete a capability, Amazon EKS removes the capability infrastructure but retains all resources that were managed by the capability.
 *
 * Before deleting a capability, you should delete all Kubernetes resources that were created by the capability. After the capability is deleted, these resources become difficult to manage because the controller that managed them is no longer available. To delete resources before removing the capability, use `kubectl delete` or remove them through your GitOps workflow.
 */
export const deleteCapability: API.OperationMethod<
  DeleteCapabilityRequest,
  DeleteCapabilityResponse,
  DeleteCapabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCapabilityRequest,
  output: DeleteCapabilityResponse,
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCapability",
}));

export type DeleteClusterError =
  | ClientException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes an Amazon EKS cluster control plane.
 *
 * If you have active services and ingress resources in your cluster that are associated with a load balancer,
 * you must delete those services before deleting the cluster so that the load balancers
 * are deleted properly. Otherwise, you can have orphaned resources in your VPC that
 * prevent you from being able to delete the VPC. For more information, see Deleting a
 * cluster in the *Amazon EKS User Guide*.
 *
 * If you have managed node groups or Fargate profiles attached to the cluster, you
 * must delete them first. For more information, see `DeleteNodgroup` and
 * `DeleteFargateProfile`.
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
    ClientException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCluster",
}));

export type DeleteEksAnywhereSubscriptionError =
  | ClientException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Deletes an expired or inactive subscription. Deleting inactive subscriptions removes
 * them from the Amazon Web Services Management Console view and from list/describe API responses. Subscriptions can
 * only be cancelled within 7 days of creation and are cancelled by creating a ticket in
 * the Amazon Web Services Support Center.
 */
export const deleteEksAnywhereSubscription: API.OperationMethod<
  DeleteEksAnywhereSubscriptionRequest,
  DeleteEksAnywhereSubscriptionResponse,
  DeleteEksAnywhereSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEksAnywhereSubscriptionRequest,
  output: DeleteEksAnywhereSubscriptionResponse,
  errors: [
    ClientException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEksAnywhereSubscription",
}));

export type DeleteFargateProfileError =
  | ClientException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes an Fargate profile.
 *
 * When you delete a Fargate profile, any `Pod` running on Fargate that
 * was created with the profile is deleted. If the `Pod` matches another
 * Fargate profile, then it is scheduled on Fargate with that profile. If it no longer
 * matches any Fargate profiles, then it's not scheduled on Fargate and may remain in a
 * pending state.
 *
 * Only one Fargate profile in a cluster can be in the `DELETING` status at
 * a time. You must wait for a Fargate profile to finish deleting before you can delete
 * any other profiles in that cluster.
 */
export const deleteFargateProfile: API.OperationMethod<
  DeleteFargateProfileRequest,
  DeleteFargateProfileResponse,
  DeleteFargateProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFargateProfileRequest,
  output: DeleteFargateProfileResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFargateProfile",
}));

export type DeleteNodegroupError =
  | ClientException
  | InvalidParameterException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes a managed node group.
 */
export const deleteNodegroup: API.OperationMethod<
  DeleteNodegroupRequest,
  DeleteNodegroupResponse,
  DeleteNodegroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteNodegroupRequest,
  output: DeleteNodegroupResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNodegroup",
}));

export type DeletePodIdentityAssociationError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Deletes a EKS Pod Identity association.
 *
 * The temporary Amazon Web Services credentials from the previous IAM role session might still be valid until the session expiry. If you need to immediately revoke the temporary session credentials, then go to the role in the IAM console.
 */
export const deletePodIdentityAssociation: API.OperationMethod<
  DeletePodIdentityAssociationRequest,
  DeletePodIdentityAssociationResponse,
  DeletePodIdentityAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePodIdentityAssociationRequest,
  output: DeletePodIdentityAssociationResponse,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePodIdentityAssociation",
}));

export type DeregisterClusterError =
  | AccessDeniedException
  | ClientException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deregisters a connected cluster to remove it from the Amazon EKS control plane.
 *
 * A connected cluster is a Kubernetes cluster that you've connected to your control plane
 * using the Amazon EKS Connector.
 */
export const deregisterCluster: API.OperationMethod<
  DeregisterClusterRequest,
  DeregisterClusterResponse,
  DeregisterClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterClusterRequest,
  output: DeregisterClusterResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterCluster",
}));

export type DescribeAccessEntryError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Describes an access entry.
 */
export const describeAccessEntry: API.OperationMethod<
  DescribeAccessEntryRequest,
  DescribeAccessEntryResponse,
  DescribeAccessEntryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAccessEntryRequest,
  output: DescribeAccessEntryResponse,
  errors: [InvalidRequestException, ResourceNotFoundException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccessEntry",
}));

export type DescribeAddonError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Describes an Amazon EKS add-on.
 */
export const describeAddon: API.OperationMethod<
  DescribeAddonRequest,
  DescribeAddonResponse,
  DescribeAddonError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAddonRequest,
  output: DescribeAddonResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAddon",
}));

export type DescribeAddonConfigurationError =
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Returns configuration options.
 */
export const describeAddonConfiguration: API.OperationMethod<
  DescribeAddonConfigurationRequest,
  DescribeAddonConfigurationResponse,
  DescribeAddonConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAddonConfigurationRequest,
  output: DescribeAddonConfigurationResponse,
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAddonConfiguration",
}));

export type DescribeAddonVersionsError =
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Describes the versions for an add-on.
 *
 * Information such as the Kubernetes versions that you can use the add-on with, the
 * `owner`, `publisher`, and the `type` of the add-on
 * are returned.
 */
export const describeAddonVersions: API.PaginatedOperationMethod<
  DescribeAddonVersionsRequest,
  DescribeAddonVersionsResponse,
  DescribeAddonVersionsError,
  Credentials | HttpClient.HttpClient,
  AddonInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeAddonVersionsRequest,
  output: DescribeAddonVersionsResponse,
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAddonVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "addons",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeCapabilityError =
  | AccessDeniedException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Returns detailed information about a specific managed capability in your Amazon EKS cluster, including its current status, configuration, health information, and any issues that may be affecting its operation.
 */
export const describeCapability: API.OperationMethod<
  DescribeCapabilityRequest,
  DescribeCapabilityResponse,
  DescribeCapabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeCapabilityRequest,
  output: DescribeCapabilityResponse,
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCapability",
}));

export type DescribeClusterError =
  | ClientException
  | ResourceNotFoundException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Describes an Amazon EKS cluster.
 *
 * The API server endpoint and certificate authority data returned by this operation are
 * required for `kubelet` and `kubectl` to communicate with your
 * Kubernetes API server. For more information, see Creating or
 * updating a `kubeconfig` file for an Amazon EKS cluster.
 *
 * The API server endpoint and certificate authority data aren't available until the
 * cluster reaches the `ACTIVE` state.
 */
export const describeCluster: API.OperationMethod<
  DescribeClusterRequest,
  DescribeClusterResponse,
  DescribeClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeClusterRequest,
  output: DescribeClusterResponse,
  errors: [
    ClientException,
    ResourceNotFoundException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCluster",
}));

export type DescribeClusterVersionsError =
  | InvalidParameterException
  | InvalidRequestException
  | ServerException
  | CommonErrors;
/**
 * Lists available Kubernetes versions for Amazon EKS clusters.
 */
export const describeClusterVersions: API.PaginatedOperationMethod<
  DescribeClusterVersionsRequest,
  DescribeClusterVersionsResponse,
  DescribeClusterVersionsError,
  Credentials | HttpClient.HttpClient,
  ClusterVersionInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeClusterVersionsRequest,
  output: DescribeClusterVersionsResponse,
  errors: [InvalidParameterException, InvalidRequestException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "clusterVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeEksAnywhereSubscriptionError =
  | ClientException
  | ResourceNotFoundException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns descriptive information about a subscription.
 */
export const describeEksAnywhereSubscription: API.OperationMethod<
  DescribeEksAnywhereSubscriptionRequest,
  DescribeEksAnywhereSubscriptionResponse,
  DescribeEksAnywhereSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeEksAnywhereSubscriptionRequest,
  output: DescribeEksAnywhereSubscriptionResponse,
  errors: [
    ClientException,
    ResourceNotFoundException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEksAnywhereSubscription",
}));

export type DescribeFargateProfileError =
  | ClientException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Describes an Fargate profile.
 */
export const describeFargateProfile: API.OperationMethod<
  DescribeFargateProfileRequest,
  DescribeFargateProfileResponse,
  DescribeFargateProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeFargateProfileRequest,
  output: DescribeFargateProfileResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFargateProfile",
}));

export type DescribeIdentityProviderConfigError =
  | ClientException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Describes an identity provider configuration.
 */
export const describeIdentityProviderConfig: API.OperationMethod<
  DescribeIdentityProviderConfigRequest,
  DescribeIdentityProviderConfigResponse,
  DescribeIdentityProviderConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeIdentityProviderConfigRequest,
  output: DescribeIdentityProviderConfigResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIdentityProviderConfig",
}));

export type DescribeInsightError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Returns details about an insight that you specify using its ID.
 */
export const describeInsight: API.OperationMethod<
  DescribeInsightRequest,
  DescribeInsightResponse,
  DescribeInsightError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeInsightRequest,
  output: DescribeInsightResponse,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInsight",
}));

export type DescribeInsightsRefreshError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Returns the status of the latest on-demand cluster insights refresh operation.
 */
export const describeInsightsRefresh: API.OperationMethod<
  DescribeInsightsRefreshRequest,
  DescribeInsightsRefreshResponse,
  DescribeInsightsRefreshError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeInsightsRefreshRequest,
  output: DescribeInsightsRefreshResponse,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInsightsRefresh",
}));

export type DescribeNodegroupError =
  | ClientException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Describes a managed node group.
 */
export const describeNodegroup: API.OperationMethod<
  DescribeNodegroupRequest,
  DescribeNodegroupResponse,
  DescribeNodegroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeNodegroupRequest,
  output: DescribeNodegroupResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNodegroup",
}));

export type DescribePodIdentityAssociationError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Returns descriptive information about an EKS Pod Identity association.
 *
 * This action requires the ID of the association. You can get the ID from the response to
 * the `CreatePodIdentityAssocation` for newly created associations. Or, you can
 * list the IDs for associations with `ListPodIdentityAssociations` and filter the
 * list by namespace or service account.
 */
export const describePodIdentityAssociation: API.OperationMethod<
  DescribePodIdentityAssociationRequest,
  DescribePodIdentityAssociationResponse,
  DescribePodIdentityAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribePodIdentityAssociationRequest,
  output: DescribePodIdentityAssociationResponse,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePodIdentityAssociation",
}));

export type DescribeUpdateError =
  | ClientException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Describes an update to an Amazon EKS resource.
 *
 * When the status of the update is `Successful`, the update is complete. If
 * an update fails, the status is `Failed`, and an error detail explains the
 * reason for the failure.
 */
export const describeUpdate: API.OperationMethod<
  DescribeUpdateRequest,
  DescribeUpdateResponse,
  DescribeUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeUpdateRequest,
  output: DescribeUpdateResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUpdate",
}));

export type DisassociateAccessPolicyError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Disassociates an access policy from an access entry.
 */
export const disassociateAccessPolicy: API.OperationMethod<
  DisassociateAccessPolicyRequest,
  DisassociateAccessPolicyResponse,
  DisassociateAccessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateAccessPolicyRequest,
  output: DisassociateAccessPolicyResponse,
  errors: [InvalidRequestException, ResourceNotFoundException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateAccessPolicy",
}));

export type DisassociateIdentityProviderConfigError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Disassociates an identity provider configuration from a cluster.
 *
 * If you disassociate an identity provider from your cluster, users included in the
 * provider can no longer access the cluster. However, you can still access the cluster
 * with IAM principals.
 */
export const disassociateIdentityProviderConfig: API.OperationMethod<
  DisassociateIdentityProviderConfigRequest,
  DisassociateIdentityProviderConfigResponse,
  DisassociateIdentityProviderConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateIdentityProviderConfigRequest,
  output: DisassociateIdentityProviderConfigResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateIdentityProviderConfig",
}));

export type ListAccessEntriesError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Lists the access entries for your cluster.
 */
export const listAccessEntries: API.PaginatedOperationMethod<
  ListAccessEntriesRequest,
  ListAccessEntriesResponse,
  ListAccessEntriesError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccessEntriesRequest,
  output: ListAccessEntriesResponse,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessEntries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accessEntries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAccessPoliciesError = ServerException | CommonErrors;
/**
 * Lists the available access policies.
 */
export const listAccessPolicies: API.PaginatedOperationMethod<
  ListAccessPoliciesRequest,
  ListAccessPoliciesResponse,
  ListAccessPoliciesError,
  Credentials | HttpClient.HttpClient,
  AccessPolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccessPoliciesRequest,
  output: ListAccessPoliciesResponse,
  errors: [ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessPolicies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accessPolicies",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAddonsError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Lists the installed add-ons.
 */
export const listAddons: API.PaginatedOperationMethod<
  ListAddonsRequest,
  ListAddonsResponse,
  ListAddonsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAddonsRequest,
  output: ListAddonsResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAddons",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "addons",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssociatedAccessPoliciesError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Lists the access policies associated with an access entry.
 */
export const listAssociatedAccessPolicies: API.PaginatedOperationMethod<
  ListAssociatedAccessPoliciesRequest,
  ListAssociatedAccessPoliciesResponse,
  ListAssociatedAccessPoliciesError,
  Credentials | HttpClient.HttpClient,
  AssociatedAccessPolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssociatedAccessPoliciesRequest,
  output: ListAssociatedAccessPoliciesResponse,
  errors: [InvalidRequestException, ResourceNotFoundException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociatedAccessPolicies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "associatedAccessPolicies",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCapabilitiesError =
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Lists all managed capabilities in your Amazon EKS cluster. You can use this operation to get an overview of all capabilities and their current status.
 */
export const listCapabilities: API.PaginatedOperationMethod<
  ListCapabilitiesRequest,
  ListCapabilitiesResponse,
  ListCapabilitiesError,
  Credentials | HttpClient.HttpClient,
  CapabilitySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCapabilitiesRequest,
  output: ListCapabilitiesResponse,
  errors: [InvalidParameterException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCapabilities",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "capabilities",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListClustersError =
  | ClientException
  | InvalidParameterException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the Amazon EKS clusters in your Amazon Web Services account in the specified Amazon Web Services Region.
 */
export const listClusters: API.PaginatedOperationMethod<
  ListClustersRequest,
  ListClustersResponse,
  ListClustersError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListClustersRequest,
  output: ListClustersResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    ServerException,
    ServiceUnavailableException,
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

export type ListEksAnywhereSubscriptionsError =
  | ClientException
  | InvalidParameterException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Displays the full description of the subscription.
 */
export const listEksAnywhereSubscriptions: API.PaginatedOperationMethod<
  ListEksAnywhereSubscriptionsRequest,
  ListEksAnywhereSubscriptionsResponse,
  ListEksAnywhereSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  EksAnywhereSubscription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEksAnywhereSubscriptionsRequest,
  output: ListEksAnywhereSubscriptionsResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEksAnywhereSubscriptions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "subscriptions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFargateProfilesError =
  | ClientException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Lists the Fargate profiles associated with the specified cluster in your Amazon Web Services
 * account in the specified Amazon Web Services Region.
 */
export const listFargateProfiles: API.PaginatedOperationMethod<
  ListFargateProfilesRequest,
  ListFargateProfilesResponse,
  ListFargateProfilesError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFargateProfilesRequest,
  output: ListFargateProfilesResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFargateProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "fargateProfileNames",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIdentityProviderConfigsError =
  | ClientException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the identity provider configurations for your cluster.
 */
export const listIdentityProviderConfigs: API.PaginatedOperationMethod<
  ListIdentityProviderConfigsRequest,
  ListIdentityProviderConfigsResponse,
  ListIdentityProviderConfigsError,
  Credentials | HttpClient.HttpClient,
  IdentityProviderConfig
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIdentityProviderConfigsRequest,
  output: ListIdentityProviderConfigsResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdentityProviderConfigs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "identityProviderConfigs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListInsightsError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Returns a list of all insights checked for against the specified cluster. You can
 * filter which insights are returned by category, associated Kubernetes version, and
 * status. The default filter lists all categories and every status.
 *
 * The following lists the available categories:
 *
 * - `UPGRADE_READINESS`: Amazon EKS identifies issues that could impact your
 * ability to upgrade to new versions of Kubernetes. These are called upgrade insights.
 *
 * - `MISCONFIGURATION`: Amazon EKS identifies misconfiguration in your EKS
 * Hybrid Nodes setup that could impair functionality of your cluster or
 * workloads. These are called configuration insights.
 */
export const listInsights: API.PaginatedOperationMethod<
  ListInsightsRequest,
  ListInsightsResponse,
  ListInsightsError,
  Credentials | HttpClient.HttpClient,
  InsightSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInsightsRequest,
  output: ListInsightsResponse,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInsights",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "insights",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNodegroupsError =
  | ClientException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the managed node groups associated with the specified cluster in your Amazon Web Services
 * account in the specified Amazon Web Services Region. Self-managed node groups aren't listed.
 */
export const listNodegroups: API.PaginatedOperationMethod<
  ListNodegroupsRequest,
  ListNodegroupsResponse,
  ListNodegroupsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNodegroupsRequest,
  output: ListNodegroupsResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNodegroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "nodegroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPodIdentityAssociationsError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * List the EKS Pod Identity associations in a cluster. You can filter the list by the namespace that the
 * association is in or the service account that the association uses.
 */
export const listPodIdentityAssociations: API.PaginatedOperationMethod<
  ListPodIdentityAssociationsRequest,
  ListPodIdentityAssociationsResponse,
  ListPodIdentityAssociationsError,
  Credentials | HttpClient.HttpClient,
  PodIdentityAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPodIdentityAssociationsRequest,
  output: ListPodIdentityAssociationsResponse,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPodIdentityAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "associations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | NotFoundException
  | CommonErrors;
/**
 * List the tags for an Amazon EKS resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [BadRequestException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListUpdatesError =
  | ClientException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Lists the updates associated with an Amazon EKS resource in your Amazon Web Services account, in the
 * specified Amazon Web Services Region.
 */
export const listUpdates: API.PaginatedOperationMethod<
  ListUpdatesRequest,
  ListUpdatesResponse,
  ListUpdatesError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListUpdatesRequest,
  output: ListUpdatesResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUpdates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "updateIds",
    pageSize: "maxResults",
  } as const,
})) as any;

export type RegisterClusterError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ResourceInUseException
  | ResourceLimitExceededException
  | ResourcePropagationDelayException
  | ServerException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Connects a Kubernetes cluster to the Amazon EKS control plane.
 *
 * Any Kubernetes cluster can be connected to the Amazon EKS control plane to view current
 * information about the cluster and its nodes.
 *
 * Cluster connection requires two steps. First, send a
 * `RegisterClusterRequest`
 * to add it to the Amazon EKS control
 * plane.
 *
 * Second, a Manifest containing the `activationID` and
 * `activationCode` must be applied to the Kubernetes cluster through it's native
 * provider to provide visibility.
 *
 * After the manifest is updated and applied, the connected cluster is visible to the
 * Amazon EKS control plane. If the manifest isn't applied within three days, the connected
 * cluster will no longer be visible and must be deregistered using
 * `DeregisterCluster`.
 */
export const registerCluster: API.OperationMethod<
  RegisterClusterRequest,
  RegisterClusterResponse,
  RegisterClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterClusterRequest,
  output: RegisterClusterResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ResourceInUseException,
    ResourceLimitExceededException,
    ResourcePropagationDelayException,
    ServerException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterCluster",
}));

export type StartInsightsRefreshError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Initiates an on-demand refresh operation for cluster insights, getting the latest analysis outside of the standard refresh schedule.
 */
export const startInsightsRefresh: API.OperationMethod<
  StartInsightsRefreshRequest,
  StartInsightsRefreshResponse,
  StartInsightsRefreshError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartInsightsRefreshRequest,
  output: StartInsightsRefreshResponse,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartInsightsRefresh",
}));

export type TagResourceError =
  | BadRequestException
  | NotFoundException
  | CommonErrors;
/**
 * Associates the specified tags to an Amazon EKS resource with the specified
 * `resourceArn`. If existing tags on a resource are not specified in the
 * request parameters, they aren't changed. When a resource is deleted, the tags associated
 * with that resource are also deleted. Tags that you create for Amazon EKS resources don't
 * propagate to any other resources associated with the cluster. For example, if you tag a
 * cluster with this operation, that tag doesn't automatically propagate to the subnets and
 * nodes associated with the cluster.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [BadRequestException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | BadRequestException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes specified tags from an Amazon EKS resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [BadRequestException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAccessEntryError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Updates an access entry.
 */
export const updateAccessEntry: API.OperationMethod<
  UpdateAccessEntryRequest,
  UpdateAccessEntryResponse,
  UpdateAccessEntryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAccessEntryRequest,
  output: UpdateAccessEntryResponse,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccessEntry",
}));

export type UpdateAddonError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Updates an Amazon EKS add-on.
 */
export const updateAddon: API.OperationMethod<
  UpdateAddonRequest,
  UpdateAddonResponse,
  UpdateAddonError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAddonRequest,
  output: UpdateAddonResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAddon",
}));

export type UpdateCapabilityError =
  | AccessDeniedException
  | InvalidParameterException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Updates the configuration of a managed capability in your Amazon EKS cluster. You can update the IAM role, configuration settings, and delete propagation policy for a capability.
 *
 * When you update a capability, Amazon EKS applies the changes and may restart capability components as needed. The capability remains available during the update process, but some operations may be temporarily unavailable.
 */
export const updateCapability: API.OperationMethod<
  UpdateCapabilityRequest,
  UpdateCapabilityResponse,
  UpdateCapabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCapabilityRequest,
  output: UpdateCapabilityResponse,
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCapability",
}));

export type UpdateClusterConfigError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an Amazon EKS cluster configuration. Your cluster continues to function during the
 * update. The response output includes an update ID that you can use to track the status
 * of your cluster update with `DescribeUpdate`.
 *
 * You can use this operation to do the following actions:
 *
 * - You can use this API operation to enable or disable exporting the Kubernetes
 * control plane logs for your cluster to CloudWatch Logs. By default, cluster control plane
 * logs aren't exported to CloudWatch Logs. For more information, see Amazon EKS Cluster control plane logs in the
 *
 * *Amazon EKS User Guide*
 * .
 *
 * CloudWatch Logs ingestion, archive storage, and data scanning rates apply to
 * exported control plane logs. For more information, see CloudWatch Pricing.
 *
 * - You can also use this API operation to enable or disable public and private
 * access to your cluster's Kubernetes API server endpoint. By default, public access is
 * enabled, and private access is disabled. For more information, see
 * Cluster API server endpoint in the
 *
 * *Amazon EKS User Guide*
 * .
 *
 * - You can also use this API operation to choose different subnets and security
 * groups for the cluster. You must specify at least two subnets that are in
 * different Availability Zones. You can't change which VPC the subnets are from, the subnets
 * must be in the same VPC as the subnets that the cluster was created with. For
 * more information about the VPC requirements, see https://docs.aws.amazon.com/eks/latest/userguide/network_reqs.html in the
 *
 * *Amazon EKS User Guide*
 * .
 *
 * - You can also use this API operation to enable or disable ARC zonal shift. If
 * zonal shift is enabled, Amazon Web Services configures zonal autoshift for the cluster.
 *
 * - You can also use this API operation to add, change, or remove the
 * configuration in the cluster for EKS Hybrid Nodes. To remove the configuration,
 * use the `remoteNetworkConfig` key with an object containing both
 * subkeys with empty arrays for each. Here is an inline example:
 * "remoteNetworkConfig": { "remoteNodeNetworks": [],
 * "remotePodNetworks": [] }.
 *
 * Cluster updates are asynchronous, and they should finish within a few minutes. During
 * an update, the cluster status moves to `UPDATING` (this status transition is
 * eventually consistent). When the update is complete (either `Failed` or
 * `Successful`), the cluster status moves to `Active`.
 */
export const updateClusterConfig: API.OperationMethod<
  UpdateClusterConfigRequest,
  UpdateClusterConfigResponse,
  UpdateClusterConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateClusterConfigRequest,
  output: UpdateClusterConfigResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateClusterConfig",
}));

export type UpdateClusterVersionError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | InvalidStateException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an Amazon EKS cluster to the specified Kubernetes version. Your cluster continues to
 * function during the update. The response output includes an update ID that you can use
 * to track the status of your cluster update with the
 * `DescribeUpdate`
 * API operation.
 *
 * Cluster updates are asynchronous, and they should finish within a few minutes. During
 * an update, the cluster status moves to `UPDATING` (this status transition is
 * eventually consistent). When the update is complete (either `Failed` or
 * `Successful`), the cluster status moves to `Active`.
 *
 * If your cluster has managed node groups attached to it, all of your node groups' Kubernetes
 * versions must match the cluster's Kubernetes version in order to update the cluster to a new
 * Kubernetes version.
 */
export const updateClusterVersion: API.OperationMethod<
  UpdateClusterVersionRequest,
  UpdateClusterVersionResponse,
  UpdateClusterVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateClusterVersionRequest,
  output: UpdateClusterVersionResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    InvalidStateException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateClusterVersion",
}));

export type UpdateEksAnywhereSubscriptionError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Update an EKS Anywhere Subscription. Only auto renewal and tags can be updated after
 * subscription creation.
 */
export const updateEksAnywhereSubscription: API.OperationMethod<
  UpdateEksAnywhereSubscriptionRequest,
  UpdateEksAnywhereSubscriptionResponse,
  UpdateEksAnywhereSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEksAnywhereSubscriptionRequest,
  output: UpdateEksAnywhereSubscriptionResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEksAnywhereSubscription",
}));

export type UpdateNodegroupConfigError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Updates an Amazon EKS managed node group configuration. Your node group continues to
 * function during the update. The response output includes an update ID that you can use
 * to track the status of your node group update with the
 * `DescribeUpdate`
 * API operation. You can update the Kubernetes labels
 * and taints for a node group and the scaling and version update configuration.
 */
export const updateNodegroupConfig: API.OperationMethod<
  UpdateNodegroupConfigRequest,
  UpdateNodegroupConfigResponse,
  UpdateNodegroupConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateNodegroupConfigRequest,
  output: UpdateNodegroupConfigResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNodegroupConfig",
}));

export type UpdateNodegroupVersionError =
  | ClientException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Updates the Kubernetes version or AMI version of an Amazon EKS managed node group.
 *
 * You can update a node group using a launch template only if the node group was
 * originally deployed with a launch template. Additionally, the launch template ID or name
 * must match what was used when the node group was created. You can update the launch
 * template version with necessary changes.
 *
 * If you need to update a custom AMI in a node group that was deployed with a launch
 * template, then update your custom AMI, specify the new ID in a new version of the launch
 * template, and then update the node group to the new version of the launch
 * template.
 *
 * If you update without a launch template, then you can update to the latest available
 * AMI version of a node group's current Kubernetes version by not specifying a Kubernetes version in
 * the request. You can update to the latest AMI version of your cluster's current Kubernetes
 * version by specifying your cluster's Kubernetes version in the request. For information about
 * Linux versions, see Amazon EKS optimized Amazon Linux AMI versions in the
 * *Amazon EKS User Guide*. For information about Windows versions, see Amazon EKS
 * optimized Windows AMI versions in the *Amazon EKS User Guide*.
 *
 * You cannot roll back a node group to an earlier Kubernetes version or AMI version.
 *
 * When a node in a managed node group is terminated due to a scaling action or update,
 * every `Pod` on that node is drained first. Amazon EKS attempts to drain the nodes
 * gracefully and will fail if it is unable to do so. You can `force` the update
 * if Amazon EKS is unable to drain the nodes as a result of a `Pod` disruption
 * budget issue.
 */
export const updateNodegroupVersion: API.OperationMethod<
  UpdateNodegroupVersionRequest,
  UpdateNodegroupVersionResponse,
  UpdateNodegroupVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateNodegroupVersionRequest,
  output: UpdateNodegroupVersionResponse,
  errors: [
    ClientException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNodegroupVersion",
}));

export type UpdatePodIdentityAssociationError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Updates a EKS Pod Identity association. In an update, you can change the IAM role, the target IAM role, or `disableSessionTags`.
 * You must change at least one of these in an update. An association can't be moved
 * between clusters, namespaces, or service accounts. If you need to edit the namespace
 * or service account, you need to delete the association and then create a new
 * association with your desired settings.
 *
 * Similar to Amazon Web Services IAM behavior, EKS Pod Identity associations are eventually consistent,
 * and may take several seconds to be effective after the initial API call returns
 * successfully. You must design your applications to account for these potential delays.
 * We recommend that you don’t include association create/updates in the
 * critical, high-availability code paths of your application. Instead, make changes in a
 * separate initialization or setup routine that you run less frequently.
 *
 * You can set a *target IAM role* in the same or a different
 * account for advanced scenarios. With a target role, EKS Pod Identity automatically performs two
 * role assumptions in sequence: first assuming the role in the association that is in this
 * account, then using those credentials to assume the target IAM role. This process
 * provides your Pod with temporary credentials that have the permissions defined in the
 * target role, allowing secure access to resources in another Amazon Web Services account.
 */
export const updatePodIdentityAssociation: API.OperationMethod<
  UpdatePodIdentityAssociationRequest,
  UpdatePodIdentityAssociationResponse,
  UpdatePodIdentityAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePodIdentityAssociationRequest,
  output: UpdatePodIdentityAssociationResponse,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePodIdentityAssociation",
}));
