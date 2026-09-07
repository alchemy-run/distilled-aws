import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc = T.AwsApiService({
  sdkId: "Network Firewall",
  serviceShapeName: "NetworkFirewall_20201112",
});
const auth = T.AwsAuthSigv4({ name: "network-firewall" });
const ver = T.ServiceVersion("2020-11-12");
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
              `https://network-firewall-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://network-firewall-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://network-firewall.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://network-firewall.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class InsufficientCapacityException
  extends /*@__PURE__*/ S.TaggedError<InsufficientCapacityException>()(
    "InsufficientCapacityException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InternalServerError
  extends /*@__PURE__*/ S.TaggedError<InternalServerError>()(
    "InternalServerError",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidOperationException
  extends /*@__PURE__*/ S.TaggedError<InvalidOperationException>()(
    "InvalidOperationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidResourcePolicyException
  extends /*@__PURE__*/ S.TaggedError<InvalidResourcePolicyException>()(
    "InvalidResourcePolicyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidTokenException>()(
    "InvalidTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class LogDestinationPermissionException
  extends /*@__PURE__*/ S.TaggedError<LogDestinationPermissionException>()(
    "LogDestinationPermissionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ResourceOwnerCheckException
  extends /*@__PURE__*/ S.TaggedError<ResourceOwnerCheckException>()(
    "ResourceOwnerCheckException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperationException>()(
    "UnsupportedOperationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type TransitGatewayAttachmentId = string;
export interface AcceptNetworkFirewallTransitGatewayAttachmentRequest {
  TransitGatewayAttachmentId: string;
}
export const AcceptNetworkFirewallTransitGatewayAttachmentRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ TransitGatewayAttachmentId: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "AcceptNetworkFirewallTransitGatewayAttachmentRequest",
  }) as any as S.Schema<AcceptNetworkFirewallTransitGatewayAttachmentRequest>;
export type TransitGatewayAttachmentStatus =
  | "CREATING"
  | "DELETING"
  | "DELETED"
  | "FAILED"
  | "ERROR"
  | "READY"
  | "PENDING_ACCEPTANCE"
  | "REJECTING"
  | "REJECTED"
  | (string & {});
export const TransitGatewayAttachmentStatus = S.String;

export interface AcceptNetworkFirewallTransitGatewayAttachmentResponse {
  TransitGatewayAttachmentId: string;
  TransitGatewayAttachmentStatus: TransitGatewayAttachmentStatus;
}
export const AcceptNetworkFirewallTransitGatewayAttachmentResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      TransitGatewayAttachmentId: S.String,
      TransitGatewayAttachmentStatus: TransitGatewayAttachmentStatus,
    }),
  ).annotate({
    identifier: "AcceptNetworkFirewallTransitGatewayAttachmentResponse",
  }) as any as S.Schema<AcceptNetworkFirewallTransitGatewayAttachmentResponse>;
export type UpdateToken = string;
export type ResourceArn = string;
export type ResourceName = string;
export type AvailabilityZoneMappingString = string;
export interface AvailabilityZoneMapping {
  AvailabilityZone: string;
}
export const AvailabilityZoneMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AvailabilityZone: S.String }),
).annotate({
  identifier: "AvailabilityZoneMapping",
}) as any as S.Schema<AvailabilityZoneMapping>;
export type AvailabilityZoneMappings = AvailabilityZoneMapping[];
export const AvailabilityZoneMappings = /*@__PURE__*/ S.Array(
  AvailabilityZoneMapping,
);
export interface AssociateAvailabilityZonesRequest {
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  AvailabilityZoneMappings: AvailabilityZoneMapping[];
}
export const AssociateAvailabilityZonesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpdateToken: S.optional(S.String),
    FirewallArn: S.optional(S.String),
    FirewallName: S.optional(S.String),
    AvailabilityZoneMappings: AvailabilityZoneMappings,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateAvailabilityZonesRequest",
}) as any as S.Schema<AssociateAvailabilityZonesRequest>;
export interface AssociateAvailabilityZonesResponse {
  FirewallArn?: string;
  FirewallName?: string;
  AvailabilityZoneMappings?: AvailabilityZoneMapping[];
  UpdateToken?: string;
}
export const AssociateAvailabilityZonesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallArn: S.optional(S.String),
    FirewallName: S.optional(S.String),
    AvailabilityZoneMappings: S.optional(AvailabilityZoneMappings),
    UpdateToken: S.optional(S.String),
  }),
).annotate({
  identifier: "AssociateAvailabilityZonesResponse",
}) as any as S.Schema<AssociateAvailabilityZonesResponse>;
export interface AssociateFirewallPolicyRequest {
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  FirewallPolicyArn: string;
}
export const AssociateFirewallPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpdateToken: S.optional(S.String),
    FirewallArn: S.optional(S.String),
    FirewallName: S.optional(S.String),
    FirewallPolicyArn: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateFirewallPolicyRequest",
}) as any as S.Schema<AssociateFirewallPolicyRequest>;
export interface AssociateFirewallPolicyResponse {
  FirewallArn?: string;
  FirewallName?: string;
  FirewallPolicyArn?: string;
  UpdateToken?: string;
}
export const AssociateFirewallPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallArn: S.optional(S.String),
    FirewallName: S.optional(S.String),
    FirewallPolicyArn: S.optional(S.String),
    UpdateToken: S.optional(S.String),
  }),
).annotate({
  identifier: "AssociateFirewallPolicyResponse",
}) as any as S.Schema<AssociateFirewallPolicyResponse>;
export type CollectionMember_String = string;
export type IPAddressType = "DUALSTACK" | "IPV4" | "IPV6" | (string & {});
export const IPAddressType = S.String;

export interface SubnetMapping {
  SubnetId: string;
  IPAddressType?: IPAddressType;
}
export const SubnetMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SubnetId: S.String, IPAddressType: S.optional(IPAddressType) }),
).annotate({ identifier: "SubnetMapping" }) as any as S.Schema<SubnetMapping>;
export type SubnetMappings = SubnetMapping[];
export const SubnetMappings = /*@__PURE__*/ S.Array(SubnetMapping);
export interface AssociateSubnetsRequest {
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  SubnetMappings: SubnetMapping[];
}
export const AssociateSubnetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpdateToken: S.optional(S.String),
    FirewallArn: S.optional(S.String),
    FirewallName: S.optional(S.String),
    SubnetMappings: SubnetMappings,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateSubnetsRequest",
}) as any as S.Schema<AssociateSubnetsRequest>;
export interface AssociateSubnetsResponse {
  FirewallArn?: string;
  FirewallName?: string;
  SubnetMappings?: SubnetMapping[];
  UpdateToken?: string;
}
export const AssociateSubnetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallArn: S.optional(S.String),
    FirewallName: S.optional(S.String),
    SubnetMappings: S.optional(SubnetMappings),
    UpdateToken: S.optional(S.String),
  }),
).annotate({
  identifier: "AssociateSubnetsResponse",
}) as any as S.Schema<AssociateSubnetsResponse>;
export type InsertPosition = number;
export interface ProxyRuleGroupAttachment {
  ProxyRuleGroupName?: string;
  InsertPosition?: number;
}
export const ProxyRuleGroupAttachment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyRuleGroupName: S.optional(S.String),
    InsertPosition: S.optional(S.Number),
  }),
).annotate({
  identifier: "ProxyRuleGroupAttachment",
}) as any as S.Schema<ProxyRuleGroupAttachment>;
export type ProxyRuleGroupAttachmentList = ProxyRuleGroupAttachment[];
export const ProxyRuleGroupAttachmentList = /*@__PURE__*/ S.Array(
  ProxyRuleGroupAttachment,
);
export interface AttachRuleGroupsToProxyConfigurationRequest {
  ProxyConfigurationName?: string;
  ProxyConfigurationArn?: string;
  RuleGroups: ProxyRuleGroupAttachment[];
  UpdateToken: string;
}
export const AttachRuleGroupsToProxyConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ProxyConfigurationName: S.optional(S.String),
      ProxyConfigurationArn: S.optional(S.String),
      RuleGroups: ProxyRuleGroupAttachmentList,
      UpdateToken: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "AttachRuleGroupsToProxyConfigurationRequest",
  }) as any as S.Schema<AttachRuleGroupsToProxyConfigurationRequest>;
export type Description = string;
export type CreateTime = Date;
export type DeleteTime = Date;
export type ProxyConfigRuleGroupType = string;
export type ProxyConfigRuleGroupPriority = number;
export interface ProxyConfigRuleGroup {
  ProxyRuleGroupName?: string;
  ProxyRuleGroupArn?: string;
  Type?: string;
  Priority?: number;
}
export const ProxyConfigRuleGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyRuleGroupName: S.optional(S.String),
    ProxyRuleGroupArn: S.optional(S.String),
    Type: S.optional(S.String),
    Priority: S.optional(S.Number),
  }),
).annotate({
  identifier: "ProxyConfigRuleGroup",
}) as any as S.Schema<ProxyConfigRuleGroup>;
export type ProxyConfigRuleGroupSet = ProxyConfigRuleGroup[];
export const ProxyConfigRuleGroupSet =
  /*@__PURE__*/ S.Array(ProxyConfigRuleGroup);
export type ProxyRulePhaseAction = "ALLOW" | "DENY" | "ALERT" | (string & {});
export const ProxyRulePhaseAction = S.String;

export interface ProxyConfigDefaultRulePhaseActionsRequest {
  PreDNS?: ProxyRulePhaseAction;
  PreREQUEST?: ProxyRulePhaseAction;
  PostRESPONSE?: ProxyRulePhaseAction;
}
export const ProxyConfigDefaultRulePhaseActionsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      PreDNS: S.optional(ProxyRulePhaseAction),
      PreREQUEST: S.optional(ProxyRulePhaseAction),
      PostRESPONSE: S.optional(ProxyRulePhaseAction),
    }),
  ).annotate({
    identifier: "ProxyConfigDefaultRulePhaseActionsRequest",
  }) as any as S.Schema<ProxyConfigDefaultRulePhaseActionsRequest>;
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
export interface ProxyConfiguration {
  ProxyConfigurationName?: string;
  ProxyConfigurationArn?: string;
  Description?: string;
  CreateTime?: Date;
  DeleteTime?: Date;
  RuleGroups?: ProxyConfigRuleGroup[];
  DefaultRulePhaseActions?: ProxyConfigDefaultRulePhaseActionsRequest;
  Tags?: Tag[];
}
export const ProxyConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyConfigurationName: S.optional(S.String),
    ProxyConfigurationArn: S.optional(S.String),
    Description: S.optional(S.String),
    CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DeleteTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RuleGroups: S.optional(ProxyConfigRuleGroupSet),
    DefaultRulePhaseActions: S.optional(
      ProxyConfigDefaultRulePhaseActionsRequest,
    ),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "ProxyConfiguration",
}) as any as S.Schema<ProxyConfiguration>;
export interface AttachRuleGroupsToProxyConfigurationResponse {
  ProxyConfiguration?: ProxyConfiguration;
  UpdateToken?: string;
}
export const AttachRuleGroupsToProxyConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ProxyConfiguration: S.optional(ProxyConfiguration),
      UpdateToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AttachRuleGroupsToProxyConfigurationResponse",
  }) as any as S.Schema<AttachRuleGroupsToProxyConfigurationResponse>;
export type ContainerMonitoringType = "ECS" | "EKS" | (string & {});
export const ContainerMonitoringType = S.String;

export type ContainerAttributeKey = string;
export type ContainerAttributeValue = string;
export interface ContainerAttribute {
  Key: string;
  Value: string;
}
export const ContainerAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({
  identifier: "ContainerAttribute",
}) as any as S.Schema<ContainerAttribute>;
export type ContainerAttributes = ContainerAttribute[];
export const ContainerAttributes = /*@__PURE__*/ S.Array(ContainerAttribute);
export interface ContainerMonitoringConfiguration {
  ClusterArn: string;
  AttributeFilters?: ContainerAttribute[];
}
export const ContainerMonitoringConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterArn: S.String,
    AttributeFilters: S.optional(ContainerAttributes),
  }),
).annotate({
  identifier: "ContainerMonitoringConfiguration",
}) as any as S.Schema<ContainerMonitoringConfiguration>;
export type ContainerMonitoringConfigurations =
  ContainerMonitoringConfiguration[];
export const ContainerMonitoringConfigurations = /*@__PURE__*/ S.Array(
  ContainerMonitoringConfiguration,
);
export interface CreateContainerAssociationRequest {
  ContainerAssociationName: string;
  Description?: string;
  Type: ContainerMonitoringType;
  ContainerMonitoringConfigurations: ContainerMonitoringConfiguration[];
  Tags?: Tag[];
}
export const CreateContainerAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerAssociationName: S.String,
    Description: S.optional(S.String),
    Type: ContainerMonitoringType,
    ContainerMonitoringConfigurations: ContainerMonitoringConfigurations,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateContainerAssociationRequest",
}) as any as S.Schema<CreateContainerAssociationRequest>;
export type ContainerAssociationStatus =
  | "ACTIVE"
  | "CREATING"
  | "DELETING"
  | "UPDATING"
  | (string & {});
export const ContainerAssociationStatus = S.String;

export interface CreateContainerAssociationResponse {
  ContainerAssociationName?: string;
  ContainerAssociationArn?: string;
  Description?: string;
  Type?: ContainerMonitoringType;
  ContainerMonitoringConfigurations?: ContainerMonitoringConfiguration[];
  Status?: ContainerAssociationStatus;
  Tags?: Tag[];
  UpdateToken?: string;
}
export const CreateContainerAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerAssociationName: S.optional(S.String),
    ContainerAssociationArn: S.optional(S.String),
    Description: S.optional(S.String),
    Type: S.optional(ContainerMonitoringType),
    ContainerMonitoringConfigurations: S.optional(
      ContainerMonitoringConfigurations,
    ),
    Status: S.optional(ContainerAssociationStatus),
    Tags: S.optional(TagList),
    UpdateToken: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateContainerAssociationResponse",
}) as any as S.Schema<CreateContainerAssociationResponse>;
export type VpcId = string;
export type KeyId = string;
export type EncryptionType =
  | "CUSTOMER_KMS"
  | "AWS_OWNED_KMS_KEY"
  | (string & {});
export const EncryptionType = S.String;

export interface EncryptionConfiguration {
  KeyId?: string;
  Type: EncryptionType;
}
export const EncryptionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ KeyId: S.optional(S.String), Type: EncryptionType }),
).annotate({
  identifier: "EncryptionConfiguration",
}) as any as S.Schema<EncryptionConfiguration>;
export type EnabledAnalysisType = "TLS_SNI" | "HTTP_HOST" | (string & {});
export const EnabledAnalysisType = S.String;

export type EnabledAnalysisTypes = EnabledAnalysisType[];
export const EnabledAnalysisTypes = /*@__PURE__*/ S.Array(EnabledAnalysisType);
export type TransitGatewayId = string;
export type NatGatewayId = string;
export interface NatGatewayMapping {
  NatGatewayId: string;
}
export const NatGatewayMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NatGatewayId: S.String }),
).annotate({
  identifier: "NatGatewayMapping",
}) as any as S.Schema<NatGatewayMapping>;
export type NatGatewayMappingsList = NatGatewayMapping[];
export const NatGatewayMappingsList = /*@__PURE__*/ S.Array(NatGatewayMapping);
export type NatGatewayPort = number;
export type ListenerPropertyType = "HTTP" | "HTTPS" | (string & {});
export const ListenerPropertyType = S.String;

export interface ListenerProperty {
  Port?: number;
  Type?: ListenerPropertyType;
}
export const ListenerProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Port: S.optional(S.Number),
    Type: S.optional(ListenerPropertyType),
  }),
).annotate({
  identifier: "ListenerProperty",
}) as any as S.Schema<ListenerProperty>;
export type ListenerProperties = ListenerProperty[];
export const ListenerProperties = /*@__PURE__*/ S.Array(ListenerProperty);
export interface ProxySettings {
  ListenerProperties: ListenerProperty[];
}
export const ProxySettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ListenerProperties: ListenerProperties }),
).annotate({ identifier: "ProxySettings" }) as any as S.Schema<ProxySettings>;
export interface VpcEndpoint {
  VpcId: string;
  SubnetMappings: SubnetMapping[];
}
export const VpcEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcId: S.String, SubnetMappings: SubnetMappings }),
).annotate({ identifier: "VpcEndpoint" }) as any as S.Schema<VpcEndpoint>;
export interface CreateFirewallRequest {
  FirewallName: string;
  FirewallPolicyArn: string;
  VpcId?: string;
  SubnetMappings?: SubnetMapping[];
  DeleteProtection?: boolean;
  SubnetChangeProtection?: boolean;
  FirewallPolicyChangeProtection?: boolean;
  Description?: string;
  Tags?: Tag[];
  EncryptionConfiguration?: EncryptionConfiguration;
  EnabledAnalysisTypes?: EnabledAnalysisType[];
  TransitGatewayId?: string;
  AvailabilityZoneMappings?: AvailabilityZoneMapping[];
  AvailabilityZoneChangeProtection?: boolean;
  NatGatewayMappings?: NatGatewayMapping[];
  ProxySettings?: ProxySettings;
  NoSourcePreservation?: boolean;
  VpcEndpoint?: VpcEndpoint;
}
export const CreateFirewallRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallName: S.String,
    FirewallPolicyArn: S.String,
    VpcId: S.optional(S.String),
    SubnetMappings: S.optional(SubnetMappings),
    DeleteProtection: S.optional(S.Boolean),
    SubnetChangeProtection: S.optional(S.Boolean),
    FirewallPolicyChangeProtection: S.optional(S.Boolean),
    Description: S.optional(S.String),
    Tags: S.optional(TagList),
    EncryptionConfiguration: S.optional(EncryptionConfiguration),
    EnabledAnalysisTypes: S.optional(EnabledAnalysisTypes),
    TransitGatewayId: S.optional(S.String),
    AvailabilityZoneMappings: S.optional(AvailabilityZoneMappings),
    AvailabilityZoneChangeProtection: S.optional(S.Boolean),
    NatGatewayMappings: S.optional(NatGatewayMappingsList),
    ProxySettings: S.optional(ProxySettings),
    NoSourcePreservation: S.optional(S.Boolean),
    VpcEndpoint: S.optional(VpcEndpoint),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateFirewallRequest",
}) as any as S.Schema<CreateFirewallRequest>;
export type ResourceId = string;
export type NumberOfAssociations = number;
export type AWSAccountId = string;
export interface Firewall {
  FirewallName?: string;
  FirewallArn?: string;
  FirewallPolicyArn: string;
  VpcId: string;
  SubnetMappings: SubnetMapping[];
  DeleteProtection?: boolean;
  SubnetChangeProtection?: boolean;
  FirewallPolicyChangeProtection?: boolean;
  Description?: string;
  FirewallId: string;
  Tags?: Tag[];
  EncryptionConfiguration?: EncryptionConfiguration;
  NumberOfAssociations?: number;
  EnabledAnalysisTypes?: EnabledAnalysisType[];
  TransitGatewayId?: string;
  TransitGatewayOwnerAccountId?: string;
  AvailabilityZoneMappings?: AvailabilityZoneMapping[];
  AvailabilityZoneChangeProtection?: boolean;
  NatGatewayMappings?: NatGatewayMapping[];
  ProxySettings?: ProxySettings;
  NoSourcePreservation?: boolean;
  VpcEndpoint?: VpcEndpoint;
}
export const Firewall = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallName: S.optional(S.String),
    FirewallArn: S.optional(S.String),
    FirewallPolicyArn: S.String,
    VpcId: S.String,
    SubnetMappings: SubnetMappings,
    DeleteProtection: S.optional(S.Boolean),
    SubnetChangeProtection: S.optional(S.Boolean),
    FirewallPolicyChangeProtection: S.optional(S.Boolean),
    Description: S.optional(S.String),
    FirewallId: S.String,
    Tags: S.optional(TagList),
    EncryptionConfiguration: S.optional(EncryptionConfiguration),
    NumberOfAssociations: S.optional(S.Number),
    EnabledAnalysisTypes: S.optional(EnabledAnalysisTypes),
    TransitGatewayId: S.optional(S.String),
    TransitGatewayOwnerAccountId: S.optional(S.String),
    AvailabilityZoneMappings: S.optional(AvailabilityZoneMappings),
    AvailabilityZoneChangeProtection: S.optional(S.Boolean),
    NatGatewayMappings: S.optional(NatGatewayMappingsList),
    ProxySettings: S.optional(ProxySettings),
    NoSourcePreservation: S.optional(S.Boolean),
    VpcEndpoint: S.optional(VpcEndpoint),
  }),
).annotate({ identifier: "Firewall" }) as any as S.Schema<Firewall>;
export type FirewallStatusValue =
  | "PROVISIONING"
  | "DELETING"
  | "READY"
  | "FAILED"
  | (string & {});
export const FirewallStatusValue = S.String;

export type ConfigurationSyncState =
  | "PENDING"
  | "IN_SYNC"
  | "CAPACITY_CONSTRAINED"
  | (string & {});
export const ConfigurationSyncState = S.String;

export type AvailabilityZone = string;
export type AzSubnet = string;
export type EndpointId = string;
export type AttachmentStatus =
  | "CREATING"
  | "DELETING"
  | "FAILED"
  | "ERROR"
  | "SCALING"
  | "READY"
  | (string & {});
export const AttachmentStatus = S.String;

export type StatusMessage = string;
export type DnsName = string;
export interface Attachment {
  SubnetId?: string;
  EndpointId?: string;
  Status?: AttachmentStatus;
  StatusMessage?: string;
  DnsName?: string;
}
export const Attachment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubnetId: S.optional(S.String),
    EndpointId: S.optional(S.String),
    Status: S.optional(AttachmentStatus),
    StatusMessage: S.optional(S.String),
    DnsName: S.optional(S.String),
  }),
).annotate({ identifier: "Attachment" }) as any as S.Schema<Attachment>;
export type PerObjectSyncStatus =
  | "PENDING"
  | "IN_SYNC"
  | "CAPACITY_CONSTRAINED"
  | "NOT_SUBSCRIBED"
  | "DEPRECATED"
  | (string & {});
export const PerObjectSyncStatus = S.String;

export interface PerObjectStatus {
  SyncStatus?: PerObjectSyncStatus;
  UpdateToken?: string;
}
export const PerObjectStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SyncStatus: S.optional(PerObjectSyncStatus),
    UpdateToken: S.optional(S.String),
  }),
).annotate({
  identifier: "PerObjectStatus",
}) as any as S.Schema<PerObjectStatus>;
export type SyncStateConfig = { [key: string]: PerObjectStatus | undefined };
export const SyncStateConfig = /*@__PURE__*/ S.Record(
  S.String,
  PerObjectStatus.pipe(S.optional),
);
export type NatGatewayAttachmentStatus =
  | "CREATING"
  | "READY"
  | "UPDATING"
  | "FAILED"
  | "DELETING"
  | (string & {});
export const NatGatewayAttachmentStatus = S.String;

export type StatusReason = string;
export interface NatGatewayAttachment {
  NatGatewayId: string;
  Status: NatGatewayAttachmentStatus;
  StatusMessage?: string;
  DnsName?: string;
}
export const NatGatewayAttachment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NatGatewayId: S.String,
    Status: NatGatewayAttachmentStatus,
    StatusMessage: S.optional(S.String),
    DnsName: S.optional(S.String),
  }),
).annotate({
  identifier: "NatGatewayAttachment",
}) as any as S.Schema<NatGatewayAttachment>;
export type NatGatewayAttachmentsList = NatGatewayAttachment[];
export const NatGatewayAttachmentsList =
  /*@__PURE__*/ S.Array(NatGatewayAttachment);
export interface SyncState {
  Attachment?: Attachment;
  Config?: { [key: string]: PerObjectStatus | undefined };
  NatGatewayAttachments?: NatGatewayAttachment[];
}
export const SyncState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attachment: S.optional(Attachment),
    Config: S.optional(SyncStateConfig),
    NatGatewayAttachments: S.optional(NatGatewayAttachmentsList),
  }),
).annotate({ identifier: "SyncState" }) as any as S.Schema<SyncState>;
export type SyncStates = { [key: string]: SyncState | undefined };
export const SyncStates = /*@__PURE__*/ S.Record(
  S.String,
  SyncState.pipe(S.optional),
);
export type CIDRCount = number;
export type IPSetArn = string;
export interface IPSetMetadata {
  ResolvedCIDRCount?: number;
}
export const IPSetMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResolvedCIDRCount: S.optional(S.Number) }),
).annotate({ identifier: "IPSetMetadata" }) as any as S.Schema<IPSetMetadata>;
export type IPSetMetadataMap = { [key: string]: IPSetMetadata | undefined };
export const IPSetMetadataMap = /*@__PURE__*/ S.Record(
  S.String,
  IPSetMetadata.pipe(S.optional),
);
export interface CIDRSummary {
  AvailableCIDRCount?: number;
  UtilizedCIDRCount?: number;
  IPSetReferences?: { [key: string]: IPSetMetadata | undefined };
}
export const CIDRSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailableCIDRCount: S.optional(S.Number),
    UtilizedCIDRCount: S.optional(S.Number),
    IPSetReferences: S.optional(IPSetMetadataMap),
  }),
).annotate({ identifier: "CIDRSummary" }) as any as S.Schema<CIDRSummary>;
export interface CapacityUsageSummary {
  CIDRs?: CIDRSummary;
}
export const CapacityUsageSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CIDRs: S.optional(CIDRSummary) }),
).annotate({
  identifier: "CapacityUsageSummary",
}) as any as S.Schema<CapacityUsageSummary>;
export type AttachmentId = string;
export type TransitGatewayAttachmentSyncStateMessage = string;
export interface TransitGatewayAttachmentSyncState {
  AttachmentId?: string;
  TransitGatewayAttachmentStatus?: TransitGatewayAttachmentStatus;
  StatusMessage?: string;
}
export const TransitGatewayAttachmentSyncState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttachmentId: S.optional(S.String),
    TransitGatewayAttachmentStatus: S.optional(TransitGatewayAttachmentStatus),
    StatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "TransitGatewayAttachmentSyncState",
}) as any as S.Schema<TransitGatewayAttachmentSyncState>;
export interface FirewallStatus {
  Status: FirewallStatusValue;
  ConfigurationSyncStateSummary: ConfigurationSyncState;
  SyncStates?: { [key: string]: SyncState | undefined };
  CapacityUsageSummary?: CapacityUsageSummary;
  TransitGatewayAttachmentSyncState?: TransitGatewayAttachmentSyncState;
}
export const FirewallStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: FirewallStatusValue,
    ConfigurationSyncStateSummary: ConfigurationSyncState,
    SyncStates: S.optional(SyncStates),
    CapacityUsageSummary: S.optional(CapacityUsageSummary),
    TransitGatewayAttachmentSyncState: S.optional(
      TransitGatewayAttachmentSyncState,
    ),
  }),
).annotate({ identifier: "FirewallStatus" }) as any as S.Schema<FirewallStatus>;
export interface CreateFirewallResponse {
  Firewall?: Firewall;
  FirewallStatus?: FirewallStatus;
}
export const CreateFirewallResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Firewall: S.optional(Firewall),
    FirewallStatus: S.optional(FirewallStatus),
  }),
).annotate({
  identifier: "CreateFirewallResponse",
}) as any as S.Schema<CreateFirewallResponse>;
export type Priority = number;
export interface StatelessRuleGroupReference {
  ResourceArn: string;
  Priority: number;
}
export const StatelessRuleGroupReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Priority: S.Number }),
).annotate({
  identifier: "StatelessRuleGroupReference",
}) as any as S.Schema<StatelessRuleGroupReference>;
export type StatelessRuleGroupReferences = StatelessRuleGroupReference[];
export const StatelessRuleGroupReferences = /*@__PURE__*/ S.Array(
  StatelessRuleGroupReference,
);
export type StatelessActions = string[];
export const StatelessActions = /*@__PURE__*/ S.Array(S.String);
export type ActionName = string;
export type DimensionValue = string;
export interface Dimension {
  Value: string;
}
export const Dimension = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.String }),
).annotate({ identifier: "Dimension" }) as any as S.Schema<Dimension>;
export type Dimensions = Dimension[];
export const Dimensions = /*@__PURE__*/ S.Array(Dimension);
export interface PublishMetricAction {
  Dimensions: Dimension[];
}
export const PublishMetricAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Dimensions: Dimensions }),
).annotate({
  identifier: "PublishMetricAction",
}) as any as S.Schema<PublishMetricAction>;
export interface ActionDefinition {
  PublishMetricAction?: PublishMetricAction;
}
export const ActionDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PublishMetricAction: S.optional(PublishMetricAction) }),
).annotate({
  identifier: "ActionDefinition",
}) as any as S.Schema<ActionDefinition>;
export interface CustomAction {
  ActionName: string;
  ActionDefinition: ActionDefinition;
}
export const CustomAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ActionName: S.String, ActionDefinition: ActionDefinition }),
).annotate({ identifier: "CustomAction" }) as any as S.Schema<CustomAction>;
export type CustomActions = CustomAction[];
export const CustomActions = /*@__PURE__*/ S.Array(CustomAction);
export type OverrideAction = "DROP_TO_ALERT" | (string & {});
export const OverrideAction = S.String;

export interface StatefulRuleGroupOverride {
  Action?: OverrideAction;
}
export const StatefulRuleGroupOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Action: S.optional(OverrideAction) }),
).annotate({
  identifier: "StatefulRuleGroupOverride",
}) as any as S.Schema<StatefulRuleGroupOverride>;
export type DeepThreatInspection = boolean;
export interface StatefulRuleGroupReference {
  ResourceArn: string;
  Priority?: number;
  Override?: StatefulRuleGroupOverride;
  DeepThreatInspection?: boolean;
}
export const StatefulRuleGroupReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String,
    Priority: S.optional(S.Number),
    Override: S.optional(StatefulRuleGroupOverride),
    DeepThreatInspection: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "StatefulRuleGroupReference",
}) as any as S.Schema<StatefulRuleGroupReference>;
export type StatefulRuleGroupReferences = StatefulRuleGroupReference[];
export const StatefulRuleGroupReferences = /*@__PURE__*/ S.Array(
  StatefulRuleGroupReference,
);
export type StatefulActions = string[];
export const StatefulActions = /*@__PURE__*/ S.Array(S.String);
export type RuleOrder = "DEFAULT_ACTION_ORDER" | "STRICT_ORDER" | (string & {});
export const RuleOrder = S.String;

export type StreamExceptionPolicy =
  | "DROP"
  | "CONTINUE"
  | "REJECT"
  | (string & {});
export const StreamExceptionPolicy = S.String;

export type TcpIdleTimeoutRangeBound = number;
export interface FlowTimeouts {
  TcpIdleTimeoutSeconds?: number;
}
export const FlowTimeouts = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TcpIdleTimeoutSeconds: S.optional(S.Number) }),
).annotate({ identifier: "FlowTimeouts" }) as any as S.Schema<FlowTimeouts>;
export interface StatefulEngineOptions {
  RuleOrder?: RuleOrder;
  StreamExceptionPolicy?: StreamExceptionPolicy;
  FlowTimeouts?: FlowTimeouts;
}
export const StatefulEngineOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleOrder: S.optional(RuleOrder),
    StreamExceptionPolicy: S.optional(StreamExceptionPolicy),
    FlowTimeouts: S.optional(FlowTimeouts),
  }),
).annotate({
  identifier: "StatefulEngineOptions",
}) as any as S.Schema<StatefulEngineOptions>;
export type RuleVariableName = string;
export type VariableDefinition = string;
export type VariableDefinitionList = string[];
export const VariableDefinitionList = /*@__PURE__*/ S.Array(S.String);
export interface IPSet {
  Definition: string[];
}
export const IPSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Definition: VariableDefinitionList }),
).annotate({ identifier: "IPSet" }) as any as S.Schema<IPSet>;
export type IPSets = { [key: string]: IPSet | undefined };
export const IPSets = /*@__PURE__*/ S.Record(S.String, IPSet.pipe(S.optional));
export interface PolicyVariables {
  RuleVariables?: { [key: string]: IPSet | undefined };
}
export const PolicyVariables = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleVariables: S.optional(IPSets) }),
).annotate({
  identifier: "PolicyVariables",
}) as any as S.Schema<PolicyVariables>;
export type EnableTLSSessionHolding = boolean;
export interface FirewallPolicy {
  StatelessRuleGroupReferences?: StatelessRuleGroupReference[];
  StatelessDefaultActions: string[];
  StatelessFragmentDefaultActions: string[];
  StatelessCustomActions?: CustomAction[];
  StatefulRuleGroupReferences?: StatefulRuleGroupReference[];
  StatefulDefaultActions?: string[];
  StatefulEngineOptions?: StatefulEngineOptions;
  TLSInspectionConfigurationArn?: string;
  PolicyVariables?: PolicyVariables;
  EnableTLSSessionHolding?: boolean;
}
export const FirewallPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StatelessRuleGroupReferences: S.optional(StatelessRuleGroupReferences),
    StatelessDefaultActions: StatelessActions,
    StatelessFragmentDefaultActions: StatelessActions,
    StatelessCustomActions: S.optional(CustomActions),
    StatefulRuleGroupReferences: S.optional(StatefulRuleGroupReferences),
    StatefulDefaultActions: S.optional(StatefulActions),
    StatefulEngineOptions: S.optional(StatefulEngineOptions),
    TLSInspectionConfigurationArn: S.optional(S.String),
    PolicyVariables: S.optional(PolicyVariables),
    EnableTLSSessionHolding: S.optional(S.Boolean),
  }),
).annotate({ identifier: "FirewallPolicy" }) as any as S.Schema<FirewallPolicy>;
export interface CreateFirewallPolicyRequest {
  FirewallPolicyName: string;
  FirewallPolicy: FirewallPolicy;
  Description?: string;
  Tags?: Tag[];
  DryRun?: boolean;
  EncryptionConfiguration?: EncryptionConfiguration;
}
export const CreateFirewallPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallPolicyName: S.String,
    FirewallPolicy: FirewallPolicy,
    Description: S.optional(S.String),
    Tags: S.optional(TagList),
    DryRun: S.optional(S.Boolean),
    EncryptionConfiguration: S.optional(EncryptionConfiguration),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateFirewallPolicyRequest",
}) as any as S.Schema<CreateFirewallPolicyRequest>;
export type ResourceStatus = "ACTIVE" | "DELETING" | "ERROR" | (string & {});
export const ResourceStatus = S.String;

export type RuleCapacity = number;
export type LastUpdateTime = Date;
export interface FirewallPolicyResponse {
  FirewallPolicyName: string;
  FirewallPolicyArn: string;
  FirewallPolicyId: string;
  Description?: string;
  FirewallPolicyStatus?: ResourceStatus;
  Tags?: Tag[];
  ConsumedStatelessRuleCapacity?: number;
  ConsumedStatefulRuleCapacity?: number;
  ConsumedStatefulDomainCapacity?: number;
  NumberOfAssociations?: number;
  EncryptionConfiguration?: EncryptionConfiguration;
  LastModifiedTime?: Date;
}
export const FirewallPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallPolicyName: S.String,
    FirewallPolicyArn: S.String,
    FirewallPolicyId: S.String,
    Description: S.optional(S.String),
    FirewallPolicyStatus: S.optional(ResourceStatus),
    Tags: S.optional(TagList),
    ConsumedStatelessRuleCapacity: S.optional(S.Number),
    ConsumedStatefulRuleCapacity: S.optional(S.Number),
    ConsumedStatefulDomainCapacity: S.optional(S.Number),
    NumberOfAssociations: S.optional(S.Number),
    EncryptionConfiguration: S.optional(EncryptionConfiguration),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "FirewallPolicyResponse",
}) as any as S.Schema<FirewallPolicyResponse>;
export interface CreateFirewallPolicyResponse {
  UpdateToken: string;
  FirewallPolicyResponse: FirewallPolicyResponse;
}
export const CreateFirewallPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpdateToken: S.String,
    FirewallPolicyResponse: FirewallPolicyResponse,
  }),
).annotate({
  identifier: "CreateFirewallPolicyResponse",
}) as any as S.Schema<CreateFirewallPolicyResponse>;
export interface ListenerPropertyRequest {
  Port: number;
  Type: ListenerPropertyType;
}
export const ListenerPropertyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Port: S.Number, Type: ListenerPropertyType }),
).annotate({
  identifier: "ListenerPropertyRequest",
}) as any as S.Schema<ListenerPropertyRequest>;
export type ListenerPropertiesRequest = ListenerPropertyRequest[];
export const ListenerPropertiesRequest = /*@__PURE__*/ S.Array(
  ListenerPropertyRequest,
);
export type TlsInterceptMode = "ENABLED" | "DISABLED" | (string & {});
export const TlsInterceptMode = S.String;

export interface TlsInterceptPropertiesRequest {
  PcaArn?: string;
  TlsInterceptMode?: TlsInterceptMode;
}
export const TlsInterceptPropertiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PcaArn: S.optional(S.String),
    TlsInterceptMode: S.optional(TlsInterceptMode),
  }),
).annotate({
  identifier: "TlsInterceptPropertiesRequest",
}) as any as S.Schema<TlsInterceptPropertiesRequest>;
export interface CreateProxyRequest {
  ProxyName: string;
  NatGatewayId: string;
  ProxyConfigurationName?: string;
  ProxyConfigurationArn?: string;
  ListenerProperties?: ListenerPropertyRequest[];
  TlsInterceptProperties: TlsInterceptPropertiesRequest;
  Tags?: Tag[];
}
export const CreateProxyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyName: S.String,
    NatGatewayId: S.String,
    ProxyConfigurationName: S.optional(S.String),
    ProxyConfigurationArn: S.optional(S.String),
    ListenerProperties: S.optional(ListenerPropertiesRequest),
    TlsInterceptProperties: TlsInterceptPropertiesRequest,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateProxyRequest",
}) as any as S.Schema<CreateProxyRequest>;
export type UpdateTime = Date;
export type FailureCode = string;
export type FailureMessage = string;
export type ProxyState =
  | "ATTACHING"
  | "ATTACHED"
  | "DETACHING"
  | "DETACHED"
  | "ATTACH_FAILED"
  | "DETACH_FAILED"
  | (string & {});
export const ProxyState = S.String;

export type ProxyModifyState =
  | "MODIFYING"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export const ProxyModifyState = S.String;

export interface TlsInterceptProperties {
  PcaArn?: string;
  TlsInterceptMode?: TlsInterceptMode;
}
export const TlsInterceptProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PcaArn: S.optional(S.String),
    TlsInterceptMode: S.optional(TlsInterceptMode),
  }),
).annotate({
  identifier: "TlsInterceptProperties",
}) as any as S.Schema<TlsInterceptProperties>;
export interface Proxy {
  CreateTime?: Date;
  DeleteTime?: Date;
  UpdateTime?: Date;
  FailureCode?: string;
  FailureMessage?: string;
  ProxyState?: ProxyState;
  ProxyModifyState?: ProxyModifyState;
  NatGatewayId?: string;
  ProxyConfigurationName?: string;
  ProxyConfigurationArn?: string;
  ProxyName?: string;
  ProxyArn?: string;
  ListenerProperties?: ListenerProperty[];
  TlsInterceptProperties?: TlsInterceptProperties;
  Tags?: Tag[];
}
export const Proxy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DeleteTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    FailureCode: S.optional(S.String),
    FailureMessage: S.optional(S.String),
    ProxyState: S.optional(ProxyState),
    ProxyModifyState: S.optional(ProxyModifyState),
    NatGatewayId: S.optional(S.String),
    ProxyConfigurationName: S.optional(S.String),
    ProxyConfigurationArn: S.optional(S.String),
    ProxyName: S.optional(S.String),
    ProxyArn: S.optional(S.String),
    ListenerProperties: S.optional(ListenerProperties),
    TlsInterceptProperties: S.optional(TlsInterceptProperties),
    Tags: S.optional(TagList),
  }),
).annotate({ identifier: "Proxy" }) as any as S.Schema<Proxy>;
export interface CreateProxyResponse {
  Proxy?: Proxy;
  UpdateToken?: string;
}
export const CreateProxyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Proxy: S.optional(Proxy), UpdateToken: S.optional(S.String) }),
).annotate({
  identifier: "CreateProxyResponse",
}) as any as S.Schema<CreateProxyResponse>;
export type ResourceNameList = string[];
export const ResourceNameList = /*@__PURE__*/ S.Array(S.String);
export type ResourceArnList = string[];
export const ResourceArnList = /*@__PURE__*/ S.Array(S.String);
export interface CreateProxyConfigurationRequest {
  ProxyConfigurationName: string;
  Description?: string;
  RuleGroupNames?: string[];
  RuleGroupArns?: string[];
  DefaultRulePhaseActions: ProxyConfigDefaultRulePhaseActionsRequest;
  Tags?: Tag[];
}
export const CreateProxyConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyConfigurationName: S.String,
    Description: S.optional(S.String),
    RuleGroupNames: S.optional(ResourceNameList),
    RuleGroupArns: S.optional(ResourceArnList),
    DefaultRulePhaseActions: ProxyConfigDefaultRulePhaseActionsRequest,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateProxyConfigurationRequest",
}) as any as S.Schema<CreateProxyConfigurationRequest>;
export interface CreateProxyConfigurationResponse {
  ProxyConfiguration?: ProxyConfiguration;
  UpdateToken?: string;
}
export const CreateProxyConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyConfiguration: S.optional(ProxyConfiguration),
    UpdateToken: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateProxyConfigurationResponse",
}) as any as S.Schema<CreateProxyConfigurationResponse>;
export type ConditionOperator = string;
export type ConditionKey = string;
export type ProxyConditionValue = string;
export type ProxyConditionValueList = string[];
export const ProxyConditionValueList = /*@__PURE__*/ S.Array(S.String);
export interface ProxyRuleCondition {
  ConditionOperator?: string;
  ConditionKey?: string;
  ConditionValues?: string[];
}
export const ProxyRuleCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConditionOperator: S.optional(S.String),
    ConditionKey: S.optional(S.String),
    ConditionValues: S.optional(ProxyConditionValueList),
  }),
).annotate({
  identifier: "ProxyRuleCondition",
}) as any as S.Schema<ProxyRuleCondition>;
export type ProxyRuleConditionList = ProxyRuleCondition[];
export const ProxyRuleConditionList = /*@__PURE__*/ S.Array(ProxyRuleCondition);
export interface ProxyRule {
  ProxyRuleName?: string;
  Description?: string;
  Action?: ProxyRulePhaseAction;
  Conditions?: ProxyRuleCondition[];
}
export const ProxyRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyRuleName: S.optional(S.String),
    Description: S.optional(S.String),
    Action: S.optional(ProxyRulePhaseAction),
    Conditions: S.optional(ProxyRuleConditionList),
  }),
).annotate({ identifier: "ProxyRule" }) as any as S.Schema<ProxyRule>;
export type ProxyRuleList = ProxyRule[];
export const ProxyRuleList = /*@__PURE__*/ S.Array(ProxyRule);
export interface ProxyRulesByRequestPhase {
  PreDNS?: ProxyRule[];
  PreREQUEST?: ProxyRule[];
  PostRESPONSE?: ProxyRule[];
}
export const ProxyRulesByRequestPhase = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PreDNS: S.optional(ProxyRuleList),
    PreREQUEST: S.optional(ProxyRuleList),
    PostRESPONSE: S.optional(ProxyRuleList),
  }),
).annotate({
  identifier: "ProxyRulesByRequestPhase",
}) as any as S.Schema<ProxyRulesByRequestPhase>;
export interface CreateProxyRuleGroupRequest {
  ProxyRuleGroupName: string;
  Description?: string;
  Rules?: ProxyRulesByRequestPhase;
  Tags?: Tag[];
}
export const CreateProxyRuleGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyRuleGroupName: S.String,
    Description: S.optional(S.String),
    Rules: S.optional(ProxyRulesByRequestPhase),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateProxyRuleGroupRequest",
}) as any as S.Schema<CreateProxyRuleGroupRequest>;
export interface ProxyRuleGroup {
  ProxyRuleGroupName?: string;
  ProxyRuleGroupArn?: string;
  CreateTime?: Date;
  DeleteTime?: Date;
  Rules?: ProxyRulesByRequestPhase;
  Description?: string;
  Tags?: Tag[];
}
export const ProxyRuleGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyRuleGroupName: S.optional(S.String),
    ProxyRuleGroupArn: S.optional(S.String),
    CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DeleteTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Rules: S.optional(ProxyRulesByRequestPhase),
    Description: S.optional(S.String),
    Tags: S.optional(TagList),
  }),
).annotate({ identifier: "ProxyRuleGroup" }) as any as S.Schema<ProxyRuleGroup>;
export interface CreateProxyRuleGroupResponse {
  ProxyRuleGroup?: ProxyRuleGroup;
  UpdateToken?: string;
}
export const CreateProxyRuleGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyRuleGroup: S.optional(ProxyRuleGroup),
    UpdateToken: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateProxyRuleGroupResponse",
}) as any as S.Schema<CreateProxyRuleGroupResponse>;
export interface CreateProxyRule {
  ProxyRuleName?: string;
  Description?: string;
  Action?: ProxyRulePhaseAction;
  Conditions?: ProxyRuleCondition[];
  InsertPosition?: number;
}
export const CreateProxyRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyRuleName: S.optional(S.String),
    Description: S.optional(S.String),
    Action: S.optional(ProxyRulePhaseAction),
    Conditions: S.optional(ProxyRuleConditionList),
    InsertPosition: S.optional(S.Number),
  }),
).annotate({
  identifier: "CreateProxyRule",
}) as any as S.Schema<CreateProxyRule>;
export type CreateProxyRuleList = CreateProxyRule[];
export const CreateProxyRuleList = /*@__PURE__*/ S.Array(CreateProxyRule);
export interface CreateProxyRulesByRequestPhase {
  PreDNS?: CreateProxyRule[];
  PreREQUEST?: CreateProxyRule[];
  PostRESPONSE?: CreateProxyRule[];
}
export const CreateProxyRulesByRequestPhase = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PreDNS: S.optional(CreateProxyRuleList),
    PreREQUEST: S.optional(CreateProxyRuleList),
    PostRESPONSE: S.optional(CreateProxyRuleList),
  }),
).annotate({
  identifier: "CreateProxyRulesByRequestPhase",
}) as any as S.Schema<CreateProxyRulesByRequestPhase>;
export interface CreateProxyRulesRequest {
  ProxyRuleGroupArn?: string;
  ProxyRuleGroupName?: string;
  Rules: CreateProxyRulesByRequestPhase;
}
export const CreateProxyRulesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyRuleGroupArn: S.optional(S.String),
    ProxyRuleGroupName: S.optional(S.String),
    Rules: CreateProxyRulesByRequestPhase,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateProxyRulesRequest",
}) as any as S.Schema<CreateProxyRulesRequest>;
export interface CreateProxyRulesResponse {
  ProxyRuleGroup?: ProxyRuleGroup;
  UpdateToken?: string;
}
export const CreateProxyRulesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyRuleGroup: S.optional(ProxyRuleGroup),
    UpdateToken: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateProxyRulesResponse",
}) as any as S.Schema<CreateProxyRulesResponse>;
export interface PortSet {
  Definition?: string[];
}
export const PortSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Definition: S.optional(VariableDefinitionList) }),
).annotate({ identifier: "PortSet" }) as any as S.Schema<PortSet>;
export type PortSets = { [key: string]: PortSet | undefined };
export const PortSets = /*@__PURE__*/ S.Record(
  S.String,
  PortSet.pipe(S.optional),
);
export interface RuleVariables {
  IPSets?: { [key: string]: IPSet | undefined };
  PortSets?: { [key: string]: PortSet | undefined };
}
export const RuleVariables = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IPSets: S.optional(IPSets), PortSets: S.optional(PortSets) }),
).annotate({ identifier: "RuleVariables" }) as any as S.Schema<RuleVariables>;
export type IPSetReferenceName = string;
export interface IPSetReference {
  ReferenceArn?: string;
}
export const IPSetReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReferenceArn: S.optional(S.String) }),
).annotate({ identifier: "IPSetReference" }) as any as S.Schema<IPSetReference>;
export type IPSetReferenceMap = { [key: string]: IPSetReference | undefined };
export const IPSetReferenceMap = /*@__PURE__*/ S.Record(
  S.String,
  IPSetReference.pipe(S.optional),
);
export interface ReferenceSets {
  IPSetReferences?: { [key: string]: IPSetReference | undefined };
}
export const ReferenceSets = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IPSetReferences: S.optional(IPSetReferenceMap) }),
).annotate({ identifier: "ReferenceSets" }) as any as S.Schema<ReferenceSets>;
export type RulesString = string;
export type RuleTargets = string[];
export const RuleTargets = /*@__PURE__*/ S.Array(S.String);
export type TargetType = "TLS_SNI" | "HTTP_HOST" | (string & {});
export const TargetType = S.String;

export type TargetTypes = TargetType[];
export const TargetTypes = /*@__PURE__*/ S.Array(TargetType);
export type GeneratedRulesType =
  | "ALLOWLIST"
  | "DENYLIST"
  | "REJECTLIST"
  | "ALERTLIST"
  | (string & {});
export const GeneratedRulesType = S.String;

export interface RulesSourceList {
  Targets: string[];
  TargetTypes: TargetType[];
  GeneratedRulesType: GeneratedRulesType;
}
export const RulesSourceList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Targets: RuleTargets,
    TargetTypes: TargetTypes,
    GeneratedRulesType: GeneratedRulesType,
  }),
).annotate({
  identifier: "RulesSourceList",
}) as any as S.Schema<RulesSourceList>;
export type StatefulAction =
  | "PASS"
  | "DROP"
  | "ALERT"
  | "REJECT"
  | (string & {});
export const StatefulAction = S.String;

export type StatefulRuleProtocol =
  | "IP"
  | "TCP"
  | "UDP"
  | "ICMP"
  | "HTTP"
  | "FTP"
  | "TLS"
  | "SMB"
  | "DNS"
  | "DCERPC"
  | "SSH"
  | "SMTP"
  | "IMAP"
  | "MSN"
  | "KRB5"
  | "IKEV2"
  | "TFTP"
  | "NTP"
  | "DHCP"
  | "HTTP2"
  | "QUIC"
  | (string & {});
export const StatefulRuleProtocol = S.String;

export type Source = string;
export type Port = string;
export type StatefulRuleDirection = "FORWARD" | "ANY" | (string & {});
export const StatefulRuleDirection = S.String;

export type Destination = string;
export interface Header {
  Protocol: StatefulRuleProtocol;
  Source: string;
  SourcePort: string;
  Direction: StatefulRuleDirection;
  Destination: string;
  DestinationPort: string;
}
export const Header = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Protocol: StatefulRuleProtocol,
    Source: S.String,
    SourcePort: S.String,
    Direction: StatefulRuleDirection,
    Destination: S.String,
    DestinationPort: S.String,
  }),
).annotate({ identifier: "Header" }) as any as S.Schema<Header>;
export type Keyword = string;
export type Setting = string;
export type Settings = string[];
export const Settings = /*@__PURE__*/ S.Array(S.String);
export interface RuleOption {
  Keyword: string;
  Settings?: string[];
}
export const RuleOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Keyword: S.String, Settings: S.optional(Settings) }),
).annotate({ identifier: "RuleOption" }) as any as S.Schema<RuleOption>;
export type RuleOptions = RuleOption[];
export const RuleOptions = /*@__PURE__*/ S.Array(RuleOption);
export interface StatefulRule {
  Action: StatefulAction;
  Header: Header;
  RuleOptions: RuleOption[];
}
export const StatefulRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: StatefulAction,
    Header: Header,
    RuleOptions: RuleOptions,
  }),
).annotate({ identifier: "StatefulRule" }) as any as S.Schema<StatefulRule>;
export type StatefulRules = StatefulRule[];
export const StatefulRules = /*@__PURE__*/ S.Array(StatefulRule);
export type AddressDefinition = string;
export interface Address {
  AddressDefinition: string;
}
export const Address = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AddressDefinition: S.String }),
).annotate({ identifier: "Address" }) as any as S.Schema<Address>;
export type Addresses = Address[];
export const Addresses = /*@__PURE__*/ S.Array(Address);
export type PortRangeBound = number;
export interface PortRange {
  FromPort: number;
  ToPort: number;
}
export const PortRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FromPort: S.Number, ToPort: S.Number }),
).annotate({ identifier: "PortRange" }) as any as S.Schema<PortRange>;
export type PortRanges = PortRange[];
export const PortRanges = /*@__PURE__*/ S.Array(PortRange);
export type ProtocolNumber = number;
export type ProtocolNumbers = number[];
export const ProtocolNumbers = /*@__PURE__*/ S.Array(S.Number);
export type TCPFlag =
  | "FIN"
  | "SYN"
  | "RST"
  | "PSH"
  | "ACK"
  | "URG"
  | "ECE"
  | "CWR"
  | (string & {});
export const TCPFlag = S.String;

export type Flags = TCPFlag[];
export const Flags = /*@__PURE__*/ S.Array(TCPFlag);
export interface TCPFlagField {
  Flags: TCPFlag[];
  Masks?: TCPFlag[];
}
export const TCPFlagField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Flags: Flags, Masks: S.optional(Flags) }),
).annotate({ identifier: "TCPFlagField" }) as any as S.Schema<TCPFlagField>;
export type TCPFlags = TCPFlagField[];
export const TCPFlags = /*@__PURE__*/ S.Array(TCPFlagField);
export interface MatchAttributes {
  Sources?: Address[];
  Destinations?: Address[];
  SourcePorts?: PortRange[];
  DestinationPorts?: PortRange[];
  Protocols?: number[];
  TCPFlags?: TCPFlagField[];
}
export const MatchAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Sources: S.optional(Addresses),
    Destinations: S.optional(Addresses),
    SourcePorts: S.optional(PortRanges),
    DestinationPorts: S.optional(PortRanges),
    Protocols: S.optional(ProtocolNumbers),
    TCPFlags: S.optional(TCPFlags),
  }),
).annotate({
  identifier: "MatchAttributes",
}) as any as S.Schema<MatchAttributes>;
export interface RuleDefinition {
  MatchAttributes: MatchAttributes;
  Actions: string[];
}
export const RuleDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MatchAttributes: MatchAttributes, Actions: StatelessActions }),
).annotate({ identifier: "RuleDefinition" }) as any as S.Schema<RuleDefinition>;
export interface StatelessRule {
  RuleDefinition: RuleDefinition;
  Priority: number;
}
export const StatelessRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleDefinition: RuleDefinition, Priority: S.Number }),
).annotate({ identifier: "StatelessRule" }) as any as S.Schema<StatelessRule>;
export type StatelessRules = StatelessRule[];
export const StatelessRules = /*@__PURE__*/ S.Array(StatelessRule);
export interface StatelessRulesAndCustomActions {
  StatelessRules: StatelessRule[];
  CustomActions?: CustomAction[];
}
export const StatelessRulesAndCustomActions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StatelessRules: StatelessRules,
    CustomActions: S.optional(CustomActions),
  }),
).annotate({
  identifier: "StatelessRulesAndCustomActions",
}) as any as S.Schema<StatelessRulesAndCustomActions>;
export interface RulesSource {
  RulesString?: string;
  RulesSourceList?: RulesSourceList;
  StatefulRules?: StatefulRule[];
  StatelessRulesAndCustomActions?: StatelessRulesAndCustomActions;
}
export const RulesSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RulesString: S.optional(S.String),
    RulesSourceList: S.optional(RulesSourceList),
    StatefulRules: S.optional(StatefulRules),
    StatelessRulesAndCustomActions: S.optional(StatelessRulesAndCustomActions),
  }),
).annotate({ identifier: "RulesSource" }) as any as S.Schema<RulesSource>;
export interface StatefulRuleOptions {
  RuleOrder?: RuleOrder;
}
export const StatefulRuleOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleOrder: S.optional(RuleOrder) }),
).annotate({
  identifier: "StatefulRuleOptions",
}) as any as S.Schema<StatefulRuleOptions>;
export interface RuleGroup {
  RuleVariables?: RuleVariables;
  ReferenceSets?: ReferenceSets;
  RulesSource: RulesSource;
  StatefulRuleOptions?: StatefulRuleOptions;
}
export const RuleGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleVariables: S.optional(RuleVariables),
    ReferenceSets: S.optional(ReferenceSets),
    RulesSource: RulesSource,
    StatefulRuleOptions: S.optional(StatefulRuleOptions),
  }),
).annotate({ identifier: "RuleGroup" }) as any as S.Schema<RuleGroup>;
export type RuleGroupType =
  | "STATELESS"
  | "STATEFUL"
  | "STATEFUL_DOMAIN"
  | (string & {});
export const RuleGroupType = S.String;

export interface SourceMetadata {
  SourceArn?: string;
  SourceUpdateToken?: string;
}
export const SourceMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceArn: S.optional(S.String),
    SourceUpdateToken: S.optional(S.String),
  }),
).annotate({ identifier: "SourceMetadata" }) as any as S.Schema<SourceMetadata>;
export type SummaryRuleOption = "SID" | "MSG" | "METADATA" | (string & {});
export const SummaryRuleOption = S.String;

export type SummaryRuleOptions = SummaryRuleOption[];
export const SummaryRuleOptions = /*@__PURE__*/ S.Array(SummaryRuleOption);
export interface SummaryConfiguration {
  RuleOptions?: SummaryRuleOption[];
}
export const SummaryConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleOptions: S.optional(SummaryRuleOptions) }),
).annotate({
  identifier: "SummaryConfiguration",
}) as any as S.Schema<SummaryConfiguration>;
export interface CreateRuleGroupRequest {
  RuleGroupName: string;
  RuleGroup?: RuleGroup;
  Rules?: string;
  Type: RuleGroupType;
  Description?: string;
  Capacity: number;
  Tags?: Tag[];
  DryRun?: boolean;
  EncryptionConfiguration?: EncryptionConfiguration;
  SourceMetadata?: SourceMetadata;
  AnalyzeRuleGroup?: boolean;
  SummaryConfiguration?: SummaryConfiguration;
}
export const CreateRuleGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleGroupName: S.String,
    RuleGroup: S.optional(RuleGroup),
    Rules: S.optional(S.String),
    Type: RuleGroupType,
    Description: S.optional(S.String),
    Capacity: S.Number,
    Tags: S.optional(TagList),
    DryRun: S.optional(S.Boolean),
    EncryptionConfiguration: S.optional(EncryptionConfiguration),
    SourceMetadata: S.optional(SourceMetadata),
    AnalyzeRuleGroup: S.optional(S.Boolean),
    SummaryConfiguration: S.optional(SummaryConfiguration),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateRuleGroupRequest",
}) as any as S.Schema<CreateRuleGroupRequest>;
export type RuleIdList = string[];
export const RuleIdList = /*@__PURE__*/ S.Array(S.String);
export type IdentifiedType =
  | "STATELESS_RULE_FORWARDING_ASYMMETRICALLY"
  | "STATELESS_RULE_CONTAINS_TCP_FLAGS"
  | (string & {});
export const IdentifiedType = S.String;

export interface AnalysisResult {
  IdentifiedRuleIds?: string[];
  IdentifiedType?: IdentifiedType;
  AnalysisDetail?: string;
}
export const AnalysisResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentifiedRuleIds: S.optional(RuleIdList),
    IdentifiedType: S.optional(IdentifiedType),
    AnalysisDetail: S.optional(S.String),
  }),
).annotate({ identifier: "AnalysisResult" }) as any as S.Schema<AnalysisResult>;
export type AnalysisResultList = AnalysisResult[];
export const AnalysisResultList = /*@__PURE__*/ S.Array(AnalysisResult);
export interface RuleGroupResponse {
  RuleGroupArn: string;
  RuleGroupName: string;
  RuleGroupId: string;
  Description?: string;
  Type?: RuleGroupType;
  Capacity?: number;
  RuleGroupStatus?: ResourceStatus;
  Tags?: Tag[];
  ConsumedCapacity?: number;
  NumberOfAssociations?: number;
  EncryptionConfiguration?: EncryptionConfiguration;
  SourceMetadata?: SourceMetadata;
  SnsTopic?: string;
  LastModifiedTime?: Date;
  AnalysisResults?: AnalysisResult[];
  SummaryConfiguration?: SummaryConfiguration;
}
export const RuleGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleGroupArn: S.String,
    RuleGroupName: S.String,
    RuleGroupId: S.String,
    Description: S.optional(S.String),
    Type: S.optional(RuleGroupType),
    Capacity: S.optional(S.Number),
    RuleGroupStatus: S.optional(ResourceStatus),
    Tags: S.optional(TagList),
    ConsumedCapacity: S.optional(S.Number),
    NumberOfAssociations: S.optional(S.Number),
    EncryptionConfiguration: S.optional(EncryptionConfiguration),
    SourceMetadata: S.optional(SourceMetadata),
    SnsTopic: S.optional(S.String),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AnalysisResults: S.optional(AnalysisResultList),
    SummaryConfiguration: S.optional(SummaryConfiguration),
  }),
).annotate({
  identifier: "RuleGroupResponse",
}) as any as S.Schema<RuleGroupResponse>;
export interface CreateRuleGroupResponse {
  UpdateToken: string;
  RuleGroupResponse: RuleGroupResponse;
}
export const CreateRuleGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UpdateToken: S.String, RuleGroupResponse: RuleGroupResponse }),
).annotate({
  identifier: "CreateRuleGroupResponse",
}) as any as S.Schema<CreateRuleGroupResponse>;
export interface ServerCertificate {
  ResourceArn?: string;
}
export const ServerCertificate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.optional(S.String) }),
).annotate({
  identifier: "ServerCertificate",
}) as any as S.Schema<ServerCertificate>;
export type ServerCertificates = ServerCertificate[];
export const ServerCertificates = /*@__PURE__*/ S.Array(ServerCertificate);
export interface ServerCertificateScope {
  Sources?: Address[];
  Destinations?: Address[];
  SourcePorts?: PortRange[];
  DestinationPorts?: PortRange[];
  Protocols?: number[];
}
export const ServerCertificateScope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Sources: S.optional(Addresses),
    Destinations: S.optional(Addresses),
    SourcePorts: S.optional(PortRanges),
    DestinationPorts: S.optional(PortRanges),
    Protocols: S.optional(ProtocolNumbers),
  }),
).annotate({
  identifier: "ServerCertificateScope",
}) as any as S.Schema<ServerCertificateScope>;
export type ServerCertificateScopes = ServerCertificateScope[];
export const ServerCertificateScopes = /*@__PURE__*/ S.Array(
  ServerCertificateScope,
);
export type RevocationCheckAction = "PASS" | "DROP" | "REJECT" | (string & {});
export const RevocationCheckAction = S.String;

export interface CheckCertificateRevocationStatusActions {
  RevokedStatusAction?: RevocationCheckAction;
  UnknownStatusAction?: RevocationCheckAction;
}
export const CheckCertificateRevocationStatusActions = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RevokedStatusAction: S.optional(RevocationCheckAction),
      UnknownStatusAction: S.optional(RevocationCheckAction),
    }),
).annotate({
  identifier: "CheckCertificateRevocationStatusActions",
}) as any as S.Schema<CheckCertificateRevocationStatusActions>;
export interface ServerCertificateConfiguration {
  ServerCertificates?: ServerCertificate[];
  Scopes?: ServerCertificateScope[];
  CertificateAuthorityArn?: string;
  CheckCertificateRevocationStatus?: CheckCertificateRevocationStatusActions;
}
export const ServerCertificateConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServerCertificates: S.optional(ServerCertificates),
    Scopes: S.optional(ServerCertificateScopes),
    CertificateAuthorityArn: S.optional(S.String),
    CheckCertificateRevocationStatus: S.optional(
      CheckCertificateRevocationStatusActions,
    ),
  }),
).annotate({
  identifier: "ServerCertificateConfiguration",
}) as any as S.Schema<ServerCertificateConfiguration>;
export type ServerCertificateConfigurations = ServerCertificateConfiguration[];
export const ServerCertificateConfigurations = /*@__PURE__*/ S.Array(
  ServerCertificateConfiguration,
);
export interface TLSInspectionConfiguration {
  ServerCertificateConfigurations?: ServerCertificateConfiguration[];
}
export const TLSInspectionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServerCertificateConfigurations: S.optional(
      ServerCertificateConfigurations,
    ),
  }),
).annotate({
  identifier: "TLSInspectionConfiguration",
}) as any as S.Schema<TLSInspectionConfiguration>;
export interface CreateTLSInspectionConfigurationRequest {
  TLSInspectionConfigurationName: string;
  TLSInspectionConfiguration: TLSInspectionConfiguration;
  Description?: string;
  Tags?: Tag[];
  EncryptionConfiguration?: EncryptionConfiguration;
}
export const CreateTLSInspectionConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TLSInspectionConfigurationName: S.String,
      TLSInspectionConfiguration: TLSInspectionConfiguration,
      Description: S.optional(S.String),
      Tags: S.optional(TagList),
      EncryptionConfiguration: S.optional(EncryptionConfiguration),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "CreateTLSInspectionConfigurationRequest",
}) as any as S.Schema<CreateTLSInspectionConfigurationRequest>;
export interface TlsCertificateData {
  CertificateArn?: string;
  CertificateSerial?: string;
  Status?: string;
  StatusMessage?: string;
}
export const TlsCertificateData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CertificateArn: S.optional(S.String),
    CertificateSerial: S.optional(S.String),
    Status: S.optional(S.String),
    StatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "TlsCertificateData",
}) as any as S.Schema<TlsCertificateData>;
export type Certificates = TlsCertificateData[];
export const Certificates = /*@__PURE__*/ S.Array(TlsCertificateData);
export interface TLSInspectionConfigurationResponse {
  TLSInspectionConfigurationArn: string;
  TLSInspectionConfigurationName: string;
  TLSInspectionConfigurationId: string;
  TLSInspectionConfigurationStatus?: ResourceStatus;
  Description?: string;
  Tags?: Tag[];
  LastModifiedTime?: Date;
  NumberOfAssociations?: number;
  EncryptionConfiguration?: EncryptionConfiguration;
  Certificates?: TlsCertificateData[];
  CertificateAuthority?: TlsCertificateData;
}
export const TLSInspectionConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TLSInspectionConfigurationArn: S.String,
    TLSInspectionConfigurationName: S.String,
    TLSInspectionConfigurationId: S.String,
    TLSInspectionConfigurationStatus: S.optional(ResourceStatus),
    Description: S.optional(S.String),
    Tags: S.optional(TagList),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    NumberOfAssociations: S.optional(S.Number),
    EncryptionConfiguration: S.optional(EncryptionConfiguration),
    Certificates: S.optional(Certificates),
    CertificateAuthority: S.optional(TlsCertificateData),
  }),
).annotate({
  identifier: "TLSInspectionConfigurationResponse",
}) as any as S.Schema<TLSInspectionConfigurationResponse>;
export interface CreateTLSInspectionConfigurationResponse {
  UpdateToken: string;
  TLSInspectionConfigurationResponse: TLSInspectionConfigurationResponse;
}
export const CreateTLSInspectionConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      UpdateToken: S.String,
      TLSInspectionConfigurationResponse: TLSInspectionConfigurationResponse,
    }),
).annotate({
  identifier: "CreateTLSInspectionConfigurationResponse",
}) as any as S.Schema<CreateTLSInspectionConfigurationResponse>;
export interface CreateVpcEndpointAssociationRequest {
  FirewallArn: string;
  VpcId: string;
  SubnetMapping: SubnetMapping;
  Description?: string;
  Tags?: Tag[];
}
export const CreateVpcEndpointAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallArn: S.String,
    VpcId: S.String,
    SubnetMapping: SubnetMapping,
    Description: S.optional(S.String),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateVpcEndpointAssociationRequest",
}) as any as S.Schema<CreateVpcEndpointAssociationRequest>;
export interface VpcEndpointAssociation {
  VpcEndpointAssociationId?: string;
  VpcEndpointAssociationArn: string;
  FirewallArn: string;
  VpcId: string;
  SubnetMapping: SubnetMapping;
  Description?: string;
  Tags?: Tag[];
}
export const VpcEndpointAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcEndpointAssociationId: S.optional(S.String),
    VpcEndpointAssociationArn: S.String,
    FirewallArn: S.String,
    VpcId: S.String,
    SubnetMapping: SubnetMapping,
    Description: S.optional(S.String),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "VpcEndpointAssociation",
}) as any as S.Schema<VpcEndpointAssociation>;
export interface AZSyncState {
  Attachment?: Attachment;
}
export const AZSyncState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Attachment: S.optional(Attachment) }),
).annotate({ identifier: "AZSyncState" }) as any as S.Schema<AZSyncState>;
export type AssociationSyncState = { [key: string]: AZSyncState | undefined };
export const AssociationSyncState = /*@__PURE__*/ S.Record(
  S.String,
  AZSyncState.pipe(S.optional),
);
export interface VpcEndpointAssociationStatus {
  Status: FirewallStatusValue;
  AssociationSyncState?: { [key: string]: AZSyncState | undefined };
}
export const VpcEndpointAssociationStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: FirewallStatusValue,
    AssociationSyncState: S.optional(AssociationSyncState),
  }),
).annotate({
  identifier: "VpcEndpointAssociationStatus",
}) as any as S.Schema<VpcEndpointAssociationStatus>;
export interface CreateVpcEndpointAssociationResponse {
  VpcEndpointAssociation?: VpcEndpointAssociation;
  VpcEndpointAssociationStatus?: VpcEndpointAssociationStatus;
}
export const CreateVpcEndpointAssociationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      VpcEndpointAssociation: S.optional(VpcEndpointAssociation),
      VpcEndpointAssociationStatus: S.optional(VpcEndpointAssociationStatus),
    }),
).annotate({
  identifier: "CreateVpcEndpointAssociationResponse",
}) as any as S.Schema<CreateVpcEndpointAssociationResponse>;
export interface DeleteContainerAssociationRequest {
  ContainerAssociationName?: string;
  ContainerAssociationArn?: string;
}
export const DeleteContainerAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerAssociationName: S.optional(S.String),
    ContainerAssociationArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteContainerAssociationRequest",
}) as any as S.Schema<DeleteContainerAssociationRequest>;
export interface DeleteContainerAssociationResponse {
  ContainerAssociationName?: string;
  ContainerAssociationArn?: string;
  Status?: ContainerAssociationStatus;
}
export const DeleteContainerAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerAssociationName: S.optional(S.String),
    ContainerAssociationArn: S.optional(S.String),
    Status: S.optional(ContainerAssociationStatus),
  }),
).annotate({
  identifier: "DeleteContainerAssociationResponse",
}) as any as S.Schema<DeleteContainerAssociationResponse>;
export interface DeleteFirewallRequest {
  FirewallName?: string;
  FirewallArn?: string;
}
export const DeleteFirewallRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallName: S.optional(S.String),
    FirewallArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteFirewallRequest",
}) as any as S.Schema<DeleteFirewallRequest>;
export interface DeleteFirewallResponse {
  Firewall?: Firewall;
  FirewallStatus?: FirewallStatus;
}
export const DeleteFirewallResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Firewall: S.optional(Firewall),
    FirewallStatus: S.optional(FirewallStatus),
  }),
).annotate({
  identifier: "DeleteFirewallResponse",
}) as any as S.Schema<DeleteFirewallResponse>;
export interface DeleteFirewallPolicyRequest {
  FirewallPolicyName?: string;
  FirewallPolicyArn?: string;
}
export const DeleteFirewallPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallPolicyName: S.optional(S.String),
    FirewallPolicyArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteFirewallPolicyRequest",
}) as any as S.Schema<DeleteFirewallPolicyRequest>;
export interface DeleteFirewallPolicyResponse {
  FirewallPolicyResponse: FirewallPolicyResponse;
}
export const DeleteFirewallPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FirewallPolicyResponse: FirewallPolicyResponse }),
).annotate({
  identifier: "DeleteFirewallPolicyResponse",
}) as any as S.Schema<DeleteFirewallPolicyResponse>;
export interface DeleteNetworkFirewallTransitGatewayAttachmentRequest {
  TransitGatewayAttachmentId: string;
}
export const DeleteNetworkFirewallTransitGatewayAttachmentRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ TransitGatewayAttachmentId: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DeleteNetworkFirewallTransitGatewayAttachmentRequest",
  }) as any as S.Schema<DeleteNetworkFirewallTransitGatewayAttachmentRequest>;
export interface DeleteNetworkFirewallTransitGatewayAttachmentResponse {
  TransitGatewayAttachmentId: string;
  TransitGatewayAttachmentStatus: TransitGatewayAttachmentStatus;
}
export const DeleteNetworkFirewallTransitGatewayAttachmentResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      TransitGatewayAttachmentId: S.String,
      TransitGatewayAttachmentStatus: TransitGatewayAttachmentStatus,
    }),
  ).annotate({
    identifier: "DeleteNetworkFirewallTransitGatewayAttachmentResponse",
  }) as any as S.Schema<DeleteNetworkFirewallTransitGatewayAttachmentResponse>;
export interface DeleteProxyRequest {
  NatGatewayId: string;
  ProxyName?: string;
  ProxyArn?: string;
}
export const DeleteProxyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NatGatewayId: S.String,
    ProxyName: S.optional(S.String),
    ProxyArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteProxyRequest",
}) as any as S.Schema<DeleteProxyRequest>;
export interface DeleteProxyResponse {
  NatGatewayId?: string;
  ProxyName?: string;
  ProxyArn?: string;
}
export const DeleteProxyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NatGatewayId: S.optional(S.String),
    ProxyName: S.optional(S.String),
    ProxyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteProxyResponse",
}) as any as S.Schema<DeleteProxyResponse>;
export interface DeleteProxyConfigurationRequest {
  ProxyConfigurationName?: string;
  ProxyConfigurationArn?: string;
}
export const DeleteProxyConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyConfigurationName: S.optional(S.String),
    ProxyConfigurationArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteProxyConfigurationRequest",
}) as any as S.Schema<DeleteProxyConfigurationRequest>;
export interface DeleteProxyConfigurationResponse {
  ProxyConfigurationName?: string;
  ProxyConfigurationArn?: string;
}
export const DeleteProxyConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyConfigurationName: S.optional(S.String),
    ProxyConfigurationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteProxyConfigurationResponse",
}) as any as S.Schema<DeleteProxyConfigurationResponse>;
export interface DeleteProxyRuleGroupRequest {
  ProxyRuleGroupName?: string;
  ProxyRuleGroupArn?: string;
}
export const DeleteProxyRuleGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyRuleGroupName: S.optional(S.String),
    ProxyRuleGroupArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteProxyRuleGroupRequest",
}) as any as S.Schema<DeleteProxyRuleGroupRequest>;
export interface DeleteProxyRuleGroupResponse {
  ProxyRuleGroupName?: string;
  ProxyRuleGroupArn?: string;
}
export const DeleteProxyRuleGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyRuleGroupName: S.optional(S.String),
    ProxyRuleGroupArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteProxyRuleGroupResponse",
}) as any as S.Schema<DeleteProxyRuleGroupResponse>;
export interface DeleteProxyRulesRequest {
  ProxyRuleGroupArn?: string;
  ProxyRuleGroupName?: string;
  Rules: string[];
}
export const DeleteProxyRulesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyRuleGroupArn: S.optional(S.String),
    ProxyRuleGroupName: S.optional(S.String),
    Rules: ResourceNameList,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteProxyRulesRequest",
}) as any as S.Schema<DeleteProxyRulesRequest>;
export interface DeleteProxyRulesResponse {
  ProxyRuleGroup?: ProxyRuleGroup;
}
export const DeleteProxyRulesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProxyRuleGroup: S.optional(ProxyRuleGroup) }),
).annotate({
  identifier: "DeleteProxyRulesResponse",
}) as any as S.Schema<DeleteProxyRulesResponse>;
export interface DeleteResourcePolicyRequest {
  ResourceArn: string;
}
export const DeleteResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteResourcePolicyRequest",
}) as any as S.Schema<DeleteResourcePolicyRequest>;
export interface DeleteResourcePolicyResponse {}
export const DeleteResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteResourcePolicyResponse",
}) as any as S.Schema<DeleteResourcePolicyResponse>;
export interface DeleteRuleGroupRequest {
  RuleGroupName?: string;
  RuleGroupArn?: string;
  Type?: RuleGroupType;
}
export const DeleteRuleGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleGroupName: S.optional(S.String),
    RuleGroupArn: S.optional(S.String),
    Type: S.optional(RuleGroupType),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteRuleGroupRequest",
}) as any as S.Schema<DeleteRuleGroupRequest>;
export interface DeleteRuleGroupResponse {
  RuleGroupResponse: RuleGroupResponse;
}
export const DeleteRuleGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleGroupResponse: RuleGroupResponse }),
).annotate({
  identifier: "DeleteRuleGroupResponse",
}) as any as S.Schema<DeleteRuleGroupResponse>;
export interface DeleteTLSInspectionConfigurationRequest {
  TLSInspectionConfigurationArn?: string;
  TLSInspectionConfigurationName?: string;
}
export const DeleteTLSInspectionConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TLSInspectionConfigurationArn: S.optional(S.String),
      TLSInspectionConfigurationName: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DeleteTLSInspectionConfigurationRequest",
}) as any as S.Schema<DeleteTLSInspectionConfigurationRequest>;
export interface DeleteTLSInspectionConfigurationResponse {
  TLSInspectionConfigurationResponse: TLSInspectionConfigurationResponse;
}
export const DeleteTLSInspectionConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TLSInspectionConfigurationResponse: TLSInspectionConfigurationResponse,
    }),
).annotate({
  identifier: "DeleteTLSInspectionConfigurationResponse",
}) as any as S.Schema<DeleteTLSInspectionConfigurationResponse>;
export interface DeleteVpcEndpointAssociationRequest {
  VpcEndpointAssociationArn: string;
}
export const DeleteVpcEndpointAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcEndpointAssociationArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteVpcEndpointAssociationRequest",
}) as any as S.Schema<DeleteVpcEndpointAssociationRequest>;
export interface DeleteVpcEndpointAssociationResponse {
  VpcEndpointAssociation?: VpcEndpointAssociation;
  VpcEndpointAssociationStatus?: VpcEndpointAssociationStatus;
}
export const DeleteVpcEndpointAssociationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      VpcEndpointAssociation: S.optional(VpcEndpointAssociation),
      VpcEndpointAssociationStatus: S.optional(VpcEndpointAssociationStatus),
    }),
).annotate({
  identifier: "DeleteVpcEndpointAssociationResponse",
}) as any as S.Schema<DeleteVpcEndpointAssociationResponse>;
export interface DescribeContainerAssociationRequest {
  ContainerAssociationName?: string;
  ContainerAssociationArn?: string;
}
export const DescribeContainerAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerAssociationName: S.optional(S.String),
    ContainerAssociationArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeContainerAssociationRequest",
}) as any as S.Schema<DescribeContainerAssociationRequest>;
export type ContainerAssociationLastUpdatedTime = Date;
export interface DescribeContainerAssociationResponse {
  ContainerAssociationName?: string;
  ContainerAssociationArn?: string;
  Description?: string;
  Type?: ContainerMonitoringType;
  ContainerMonitoringConfigurations?: ContainerMonitoringConfiguration[];
  Status?: ContainerAssociationStatus;
  ResolvedCidrCount?: number;
  LastUpdatedTime?: Date;
  Tags?: Tag[];
  UpdateToken?: string;
}
export const DescribeContainerAssociationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ContainerAssociationName: S.optional(S.String),
      ContainerAssociationArn: S.optional(S.String),
      Description: S.optional(S.String),
      Type: S.optional(ContainerMonitoringType),
      ContainerMonitoringConfigurations: S.optional(
        ContainerMonitoringConfigurations,
      ),
      Status: S.optional(ContainerAssociationStatus),
      ResolvedCidrCount: S.optional(S.Number),
      LastUpdatedTime: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      Tags: S.optional(TagList),
      UpdateToken: S.optional(S.String),
    }),
).annotate({
  identifier: "DescribeContainerAssociationResponse",
}) as any as S.Schema<DescribeContainerAssociationResponse>;
export interface DescribeFirewallRequest {
  FirewallName?: string;
  FirewallArn?: string;
}
export const DescribeFirewallRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallName: S.optional(S.String),
    FirewallArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeFirewallRequest",
}) as any as S.Schema<DescribeFirewallRequest>;
export interface DescribeFirewallResponse {
  UpdateToken?: string;
  Firewall?: Firewall;
  FirewallStatus?: FirewallStatus;
}
export const DescribeFirewallResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpdateToken: S.optional(S.String),
    Firewall: S.optional(Firewall),
    FirewallStatus: S.optional(FirewallStatus),
  }),
).annotate({
  identifier: "DescribeFirewallResponse",
}) as any as S.Schema<DescribeFirewallResponse>;
export interface DescribeFirewallMetadataRequest {
  FirewallArn?: string;
}
export const DescribeFirewallMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FirewallArn: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeFirewallMetadataRequest",
}) as any as S.Schema<DescribeFirewallMetadataRequest>;
export interface AvailabilityZoneMetadata {
  IPAddressType?: IPAddressType;
}
export const AvailabilityZoneMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IPAddressType: S.optional(IPAddressType) }),
).annotate({
  identifier: "AvailabilityZoneMetadata",
}) as any as S.Schema<AvailabilityZoneMetadata>;
export type SupportedAvailabilityZones = {
  [key: string]: AvailabilityZoneMetadata | undefined;
};
export const SupportedAvailabilityZones = /*@__PURE__*/ S.Record(
  S.String,
  AvailabilityZoneMetadata.pipe(S.optional),
);
export interface DescribeFirewallMetadataResponse {
  FirewallArn?: string;
  FirewallPolicyArn?: string;
  Description?: string;
  Status?: FirewallStatusValue;
  SupportedAvailabilityZones?: {
    [key: string]: AvailabilityZoneMetadata | undefined;
  };
  TransitGatewayAttachmentId?: string;
}
export const DescribeFirewallMetadataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallArn: S.optional(S.String),
    FirewallPolicyArn: S.optional(S.String),
    Description: S.optional(S.String),
    Status: S.optional(FirewallStatusValue),
    SupportedAvailabilityZones: S.optional(SupportedAvailabilityZones),
    TransitGatewayAttachmentId: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeFirewallMetadataResponse",
}) as any as S.Schema<DescribeFirewallMetadataResponse>;
export interface DescribeFirewallPolicyRequest {
  FirewallPolicyName?: string;
  FirewallPolicyArn?: string;
}
export const DescribeFirewallPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallPolicyName: S.optional(S.String),
    FirewallPolicyArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeFirewallPolicyRequest",
}) as any as S.Schema<DescribeFirewallPolicyRequest>;
export interface DescribeFirewallPolicyResponse {
  UpdateToken: string;
  FirewallPolicyResponse: FirewallPolicyResponse;
  FirewallPolicy?: FirewallPolicy;
}
export const DescribeFirewallPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpdateToken: S.String,
    FirewallPolicyResponse: FirewallPolicyResponse,
    FirewallPolicy: S.optional(FirewallPolicy),
  }),
).annotate({
  identifier: "DescribeFirewallPolicyResponse",
}) as any as S.Schema<DescribeFirewallPolicyResponse>;
export type VpcEndpointId = string;
export type FlowOperationId = string;
export interface DescribeFlowOperationRequest {
  FirewallArn: string;
  AvailabilityZone?: string;
  VpcEndpointAssociationArn?: string;
  VpcEndpointId?: string;
  FlowOperationId: string;
}
export const DescribeFlowOperationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallArn: S.String,
    AvailabilityZone: S.optional(S.String),
    VpcEndpointAssociationArn: S.optional(S.String),
    VpcEndpointId: S.optional(S.String),
    FlowOperationId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeFlowOperationRequest",
}) as any as S.Schema<DescribeFlowOperationRequest>;
export type FlowOperationType = "FLOW_FLUSH" | "FLOW_CAPTURE" | (string & {});
export const FlowOperationType = S.String;

export type FlowOperationStatus =
  | "COMPLETED"
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETED_WITH_ERRORS"
  | (string & {});
export const FlowOperationStatus = S.String;

export type FlowRequestTimestamp = Date;
export type Age = number;
export type ProtocolString = string;
export type ProtocolStrings = string[];
export const ProtocolStrings = /*@__PURE__*/ S.Array(S.String);
export interface FlowFilter {
  SourceAddress?: Address;
  DestinationAddress?: Address;
  SourcePort?: string;
  DestinationPort?: string;
  Protocols?: string[];
}
export const FlowFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceAddress: S.optional(Address),
    DestinationAddress: S.optional(Address),
    SourcePort: S.optional(S.String),
    DestinationPort: S.optional(S.String),
    Protocols: S.optional(ProtocolStrings),
  }),
).annotate({ identifier: "FlowFilter" }) as any as S.Schema<FlowFilter>;
export type FlowFilters = FlowFilter[];
export const FlowFilters = /*@__PURE__*/ S.Array(FlowFilter);
export interface FlowOperation {
  MinimumFlowAgeInSeconds?: number;
  FlowFilters?: FlowFilter[];
}
export const FlowOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MinimumFlowAgeInSeconds: S.optional(S.Number),
    FlowFilters: S.optional(FlowFilters),
  }),
).annotate({ identifier: "FlowOperation" }) as any as S.Schema<FlowOperation>;
export interface DescribeFlowOperationResponse {
  FirewallArn?: string;
  AvailabilityZone?: string;
  VpcEndpointAssociationArn?: string;
  VpcEndpointId?: string;
  FlowOperationId?: string;
  FlowOperationType?: FlowOperationType;
  FlowOperationStatus?: FlowOperationStatus;
  StatusMessage?: string;
  FlowRequestTimestamp?: Date;
  FlowOperation?: FlowOperation;
}
export const DescribeFlowOperationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallArn: S.optional(S.String),
    AvailabilityZone: S.optional(S.String),
    VpcEndpointAssociationArn: S.optional(S.String),
    VpcEndpointId: S.optional(S.String),
    FlowOperationId: S.optional(S.String),
    FlowOperationType: S.optional(FlowOperationType),
    FlowOperationStatus: S.optional(FlowOperationStatus),
    StatusMessage: S.optional(S.String),
    FlowRequestTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    FlowOperation: S.optional(FlowOperation),
  }),
).annotate({
  identifier: "DescribeFlowOperationResponse",
}) as any as S.Schema<DescribeFlowOperationResponse>;
export interface DescribeLoggingConfigurationRequest {
  FirewallArn?: string;
  FirewallName?: string;
}
export const DescribeLoggingConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallArn: S.optional(S.String),
    FirewallName: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeLoggingConfigurationRequest",
}) as any as S.Schema<DescribeLoggingConfigurationRequest>;
export type LogType = "ALERT" | "FLOW" | "TLS" | (string & {});
export const LogType = S.String;

export type LogDestinationType =
  | "S3"
  | "CloudWatchLogs"
  | "KinesisDataFirehose"
  | (string & {});
export const LogDestinationType = S.String;

export type HashMapKey = string;
export type HashMapValue = string;
export type LogDestinationMap = { [key: string]: string | undefined };
export const LogDestinationMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface LogDestinationConfig {
  LogType: LogType;
  LogDestinationType: LogDestinationType;
  LogDestination: { [key: string]: string | undefined };
}
export const LogDestinationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogType: LogType,
    LogDestinationType: LogDestinationType,
    LogDestination: LogDestinationMap,
  }),
).annotate({
  identifier: "LogDestinationConfig",
}) as any as S.Schema<LogDestinationConfig>;
export type LogDestinationConfigs = LogDestinationConfig[];
export const LogDestinationConfigs =
  /*@__PURE__*/ S.Array(LogDestinationConfig);
export interface LoggingConfiguration {
  LogDestinationConfigs: LogDestinationConfig[];
}
export const LoggingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LogDestinationConfigs: LogDestinationConfigs }),
).annotate({
  identifier: "LoggingConfiguration",
}) as any as S.Schema<LoggingConfiguration>;
export type EnableMonitoringDashboard = boolean;
export interface DescribeLoggingConfigurationResponse {
  FirewallArn?: string;
  LoggingConfiguration?: LoggingConfiguration;
  EnableMonitoringDashboard?: boolean;
}
export const DescribeLoggingConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FirewallArn: S.optional(S.String),
      LoggingConfiguration: S.optional(LoggingConfiguration),
      EnableMonitoringDashboard: S.optional(S.Boolean),
    }),
).annotate({
  identifier: "DescribeLoggingConfigurationResponse",
}) as any as S.Schema<DescribeLoggingConfigurationResponse>;
export interface DescribeProxyRequest {
  ProxyName?: string;
  ProxyArn?: string;
}
export const DescribeProxyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyName: S.optional(S.String),
    ProxyArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeProxyRequest",
}) as any as S.Schema<DescribeProxyRequest>;
export type VpcEndpointServiceName = string;
export type PrivateDNSName = string;
export interface DescribeProxyResource {
  ProxyName?: string;
  ProxyArn?: string;
  ProxyConfigurationName?: string;
  ProxyConfigurationArn?: string;
  NatGatewayId?: string;
  ProxyState?: ProxyState;
  ProxyModifyState?: ProxyModifyState;
  ListenerProperties?: ListenerProperty[];
  TlsInterceptProperties?: TlsInterceptProperties;
  VpcEndpointServiceName?: string;
  PrivateDNSName?: string;
  CreateTime?: Date;
  DeleteTime?: Date;
  UpdateTime?: Date;
  FailureCode?: string;
  FailureMessage?: string;
  Tags?: Tag[];
}
export const DescribeProxyResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyName: S.optional(S.String),
    ProxyArn: S.optional(S.String),
    ProxyConfigurationName: S.optional(S.String),
    ProxyConfigurationArn: S.optional(S.String),
    NatGatewayId: S.optional(S.String),
    ProxyState: S.optional(ProxyState),
    ProxyModifyState: S.optional(ProxyModifyState),
    ListenerProperties: S.optional(ListenerProperties),
    TlsInterceptProperties: S.optional(TlsInterceptProperties),
    VpcEndpointServiceName: S.optional(S.String),
    PrivateDNSName: S.optional(S.String),
    CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DeleteTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    FailureCode: S.optional(S.String),
    FailureMessage: S.optional(S.String),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "DescribeProxyResource",
}) as any as S.Schema<DescribeProxyResource>;
export interface DescribeProxyResponse {
  Proxy?: DescribeProxyResource;
  UpdateToken?: string;
}
export const DescribeProxyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Proxy: S.optional(DescribeProxyResource),
    UpdateToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeProxyResponse",
}) as any as S.Schema<DescribeProxyResponse>;
export interface DescribeProxyConfigurationRequest {
  ProxyConfigurationName?: string;
  ProxyConfigurationArn?: string;
}
export const DescribeProxyConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyConfigurationName: S.optional(S.String),
    ProxyConfigurationArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeProxyConfigurationRequest",
}) as any as S.Schema<DescribeProxyConfigurationRequest>;
export interface DescribeProxyConfigurationResponse {
  ProxyConfiguration?: ProxyConfiguration;
  UpdateToken?: string;
}
export const DescribeProxyConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyConfiguration: S.optional(ProxyConfiguration),
    UpdateToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeProxyConfigurationResponse",
}) as any as S.Schema<DescribeProxyConfigurationResponse>;
export interface DescribeProxyRuleRequest {
  ProxyRuleName: string;
  ProxyRuleGroupName?: string;
  ProxyRuleGroupArn?: string;
}
export const DescribeProxyRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyRuleName: S.String,
    ProxyRuleGroupName: S.optional(S.String),
    ProxyRuleGroupArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeProxyRuleRequest",
}) as any as S.Schema<DescribeProxyRuleRequest>;
export interface DescribeProxyRuleResponse {
  ProxyRule?: ProxyRule;
  UpdateToken?: string;
}
export const DescribeProxyRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyRule: S.optional(ProxyRule),
    UpdateToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeProxyRuleResponse",
}) as any as S.Schema<DescribeProxyRuleResponse>;
export interface DescribeProxyRuleGroupRequest {
  ProxyRuleGroupName?: string;
  ProxyRuleGroupArn?: string;
}
export const DescribeProxyRuleGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyRuleGroupName: S.optional(S.String),
    ProxyRuleGroupArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeProxyRuleGroupRequest",
}) as any as S.Schema<DescribeProxyRuleGroupRequest>;
export interface DescribeProxyRuleGroupResponse {
  ProxyRuleGroup?: ProxyRuleGroup;
  UpdateToken?: string;
}
export const DescribeProxyRuleGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyRuleGroup: S.optional(ProxyRuleGroup),
    UpdateToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeProxyRuleGroupResponse",
}) as any as S.Schema<DescribeProxyRuleGroupResponse>;
export interface DescribeResourcePolicyRequest {
  ResourceArn: string;
}
export const DescribeResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeResourcePolicyRequest",
}) as any as S.Schema<DescribeResourcePolicyRequest>;
export type PolicyString = string;
export interface DescribeResourcePolicyResponse {
  Policy?: string;
}
export const DescribeResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policy: S.optional(S.String) }),
).annotate({
  identifier: "DescribeResourcePolicyResponse",
}) as any as S.Schema<DescribeResourcePolicyResponse>;
export interface DescribeRuleGroupRequest {
  RuleGroupName?: string;
  RuleGroupArn?: string;
  Type?: RuleGroupType;
  AnalyzeRuleGroup?: boolean;
}
export const DescribeRuleGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleGroupName: S.optional(S.String),
    RuleGroupArn: S.optional(S.String),
    Type: S.optional(RuleGroupType),
    AnalyzeRuleGroup: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeRuleGroupRequest",
}) as any as S.Schema<DescribeRuleGroupRequest>;
export interface DescribeRuleGroupResponse {
  UpdateToken: string;
  RuleGroup?: RuleGroup;
  RuleGroupResponse: RuleGroupResponse;
}
export const DescribeRuleGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpdateToken: S.String,
    RuleGroup: S.optional(RuleGroup),
    RuleGroupResponse: RuleGroupResponse,
  }),
).annotate({
  identifier: "DescribeRuleGroupResponse",
}) as any as S.Schema<DescribeRuleGroupResponse>;
export interface DescribeRuleGroupMetadataRequest {
  RuleGroupName?: string;
  RuleGroupArn?: string;
  Type?: RuleGroupType;
}
export const DescribeRuleGroupMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleGroupName: S.optional(S.String),
    RuleGroupArn: S.optional(S.String),
    Type: S.optional(RuleGroupType),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeRuleGroupMetadataRequest",
}) as any as S.Schema<DescribeRuleGroupMetadataRequest>;
export type VendorName = string;
export type ProductId = string;
export type ListingName = string;
export interface DescribeRuleGroupMetadataResponse {
  RuleGroupArn: string;
  RuleGroupName: string;
  Description?: string;
  Type?: RuleGroupType;
  Capacity?: number;
  StatefulRuleOptions?: StatefulRuleOptions;
  LastModifiedTime?: Date;
  VendorName?: string;
  ProductId?: string;
  ListingName?: string;
}
export const DescribeRuleGroupMetadataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleGroupArn: S.String,
    RuleGroupName: S.String,
    Description: S.optional(S.String),
    Type: S.optional(RuleGroupType),
    Capacity: S.optional(S.Number),
    StatefulRuleOptions: S.optional(StatefulRuleOptions),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    VendorName: S.optional(S.String),
    ProductId: S.optional(S.String),
    ListingName: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeRuleGroupMetadataResponse",
}) as any as S.Schema<DescribeRuleGroupMetadataResponse>;
export interface DescribeRuleGroupSummaryRequest {
  RuleGroupName?: string;
  RuleGroupArn?: string;
  Type?: RuleGroupType;
}
export const DescribeRuleGroupSummaryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleGroupName: S.optional(S.String),
    RuleGroupArn: S.optional(S.String),
    Type: S.optional(RuleGroupType),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeRuleGroupSummaryRequest",
}) as any as S.Schema<DescribeRuleGroupSummaryRequest>;
export interface RuleSummary {
  SID?: string;
  Msg?: string;
  Metadata?: string;
}
export const RuleSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SID: S.optional(S.String),
    Msg: S.optional(S.String),
    Metadata: S.optional(S.String),
  }),
).annotate({ identifier: "RuleSummary" }) as any as S.Schema<RuleSummary>;
export type RuleSummaries = RuleSummary[];
export const RuleSummaries = /*@__PURE__*/ S.Array(RuleSummary);
export interface Summary {
  RuleSummaries?: RuleSummary[];
}
export const Summary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleSummaries: S.optional(RuleSummaries) }),
).annotate({ identifier: "Summary" }) as any as S.Schema<Summary>;
export interface DescribeRuleGroupSummaryResponse {
  RuleGroupName: string;
  Description?: string;
  Summary?: Summary;
}
export const DescribeRuleGroupSummaryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleGroupName: S.String,
    Description: S.optional(S.String),
    Summary: S.optional(Summary),
  }),
).annotate({
  identifier: "DescribeRuleGroupSummaryResponse",
}) as any as S.Schema<DescribeRuleGroupSummaryResponse>;
export interface DescribeTLSInspectionConfigurationRequest {
  TLSInspectionConfigurationArn?: string;
  TLSInspectionConfigurationName?: string;
}
export const DescribeTLSInspectionConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      TLSInspectionConfigurationArn: S.optional(S.String),
      TLSInspectionConfigurationName: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DescribeTLSInspectionConfigurationRequest",
  }) as any as S.Schema<DescribeTLSInspectionConfigurationRequest>;
export interface DescribeTLSInspectionConfigurationResponse {
  UpdateToken: string;
  TLSInspectionConfiguration?: TLSInspectionConfiguration;
  TLSInspectionConfigurationResponse: TLSInspectionConfigurationResponse;
}
export const DescribeTLSInspectionConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      UpdateToken: S.String,
      TLSInspectionConfiguration: S.optional(TLSInspectionConfiguration),
      TLSInspectionConfigurationResponse: TLSInspectionConfigurationResponse,
    }),
  ).annotate({
    identifier: "DescribeTLSInspectionConfigurationResponse",
  }) as any as S.Schema<DescribeTLSInspectionConfigurationResponse>;
export interface DescribeVpcEndpointAssociationRequest {
  VpcEndpointAssociationArn: string;
}
export const DescribeVpcEndpointAssociationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ VpcEndpointAssociationArn: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DescribeVpcEndpointAssociationRequest",
}) as any as S.Schema<DescribeVpcEndpointAssociationRequest>;
export interface DescribeVpcEndpointAssociationResponse {
  VpcEndpointAssociation?: VpcEndpointAssociation;
  VpcEndpointAssociationStatus?: VpcEndpointAssociationStatus;
}
export const DescribeVpcEndpointAssociationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      VpcEndpointAssociation: S.optional(VpcEndpointAssociation),
      VpcEndpointAssociationStatus: S.optional(VpcEndpointAssociationStatus),
    }),
).annotate({
  identifier: "DescribeVpcEndpointAssociationResponse",
}) as any as S.Schema<DescribeVpcEndpointAssociationResponse>;
export interface DetachRuleGroupsFromProxyConfigurationRequest {
  ProxyConfigurationName?: string;
  ProxyConfigurationArn?: string;
  RuleGroupNames?: string[];
  RuleGroupArns?: string[];
  UpdateToken: string;
}
export const DetachRuleGroupsFromProxyConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ProxyConfigurationName: S.optional(S.String),
      ProxyConfigurationArn: S.optional(S.String),
      RuleGroupNames: S.optional(ResourceNameList),
      RuleGroupArns: S.optional(ResourceArnList),
      UpdateToken: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DetachRuleGroupsFromProxyConfigurationRequest",
  }) as any as S.Schema<DetachRuleGroupsFromProxyConfigurationRequest>;
export interface DetachRuleGroupsFromProxyConfigurationResponse {
  ProxyConfiguration?: ProxyConfiguration;
  UpdateToken?: string;
}
export const DetachRuleGroupsFromProxyConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ProxyConfiguration: S.optional(ProxyConfiguration),
      UpdateToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "DetachRuleGroupsFromProxyConfigurationResponse",
  }) as any as S.Schema<DetachRuleGroupsFromProxyConfigurationResponse>;
export interface DisassociateAvailabilityZonesRequest {
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  AvailabilityZoneMappings: AvailabilityZoneMapping[];
}
export const DisassociateAvailabilityZonesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      UpdateToken: S.optional(S.String),
      FirewallArn: S.optional(S.String),
      FirewallName: S.optional(S.String),
      AvailabilityZoneMappings: AvailabilityZoneMappings,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DisassociateAvailabilityZonesRequest",
}) as any as S.Schema<DisassociateAvailabilityZonesRequest>;
export interface DisassociateAvailabilityZonesResponse {
  FirewallArn?: string;
  FirewallName?: string;
  AvailabilityZoneMappings?: AvailabilityZoneMapping[];
  UpdateToken?: string;
}
export const DisassociateAvailabilityZonesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FirewallArn: S.optional(S.String),
      FirewallName: S.optional(S.String),
      AvailabilityZoneMappings: S.optional(AvailabilityZoneMappings),
      UpdateToken: S.optional(S.String),
    }),
).annotate({
  identifier: "DisassociateAvailabilityZonesResponse",
}) as any as S.Schema<DisassociateAvailabilityZonesResponse>;
export type AzSubnets = string[];
export const AzSubnets = /*@__PURE__*/ S.Array(S.String);
export interface DisassociateSubnetsRequest {
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  SubnetIds: string[];
}
export const DisassociateSubnetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpdateToken: S.optional(S.String),
    FirewallArn: S.optional(S.String),
    FirewallName: S.optional(S.String),
    SubnetIds: AzSubnets,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DisassociateSubnetsRequest",
}) as any as S.Schema<DisassociateSubnetsRequest>;
export interface DisassociateSubnetsResponse {
  FirewallArn?: string;
  FirewallName?: string;
  SubnetMappings?: SubnetMapping[];
  UpdateToken?: string;
}
export const DisassociateSubnetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallArn: S.optional(S.String),
    FirewallName: S.optional(S.String),
    SubnetMappings: S.optional(SubnetMappings),
    UpdateToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DisassociateSubnetsResponse",
}) as any as S.Schema<DisassociateSubnetsResponse>;
export type AnalysisReportId = string;
export type AnalysisReportNextToken = string;
export type PaginationMaxResults = number;
export interface GetAnalysisReportResultsRequest {
  FirewallName?: string;
  AnalysisReportId: string;
  FirewallArn?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const GetAnalysisReportResultsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallName: S.optional(S.String),
    AnalysisReportId: S.String,
    FirewallArn: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAnalysisReportResultsRequest",
}) as any as S.Schema<GetAnalysisReportResultsRequest>;
export type Status = string;
export type StartTime = Date;
export type EndTime = Date;
export type ReportTime = Date;
export type FirstAccessed = Date;
export type LastAccessed = Date;
export type Domain = string;
export type Count = number;
export interface Hits {
  Count?: number;
}
export const Hits = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Count: S.optional(S.Number) }),
).annotate({ identifier: "Hits" }) as any as S.Schema<Hits>;
export interface UniqueSources {
  Count?: number;
}
export const UniqueSources = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Count: S.optional(S.Number) }),
).annotate({ identifier: "UniqueSources" }) as any as S.Schema<UniqueSources>;
export interface AnalysisTypeReportResult {
  Protocol?: string;
  FirstAccessed?: Date;
  LastAccessed?: Date;
  Domain?: string;
  Hits?: Hits;
  UniqueSources?: UniqueSources;
}
export const AnalysisTypeReportResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Protocol: S.optional(S.String),
    FirstAccessed: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastAccessed: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Domain: S.optional(S.String),
    Hits: S.optional(Hits),
    UniqueSources: S.optional(UniqueSources),
  }),
).annotate({
  identifier: "AnalysisTypeReportResult",
}) as any as S.Schema<AnalysisTypeReportResult>;
export type AnalysisReportResults = AnalysisTypeReportResult[];
export const AnalysisReportResults = /*@__PURE__*/ S.Array(
  AnalysisTypeReportResult,
);
export interface GetAnalysisReportResultsResponse {
  Status?: string;
  StartTime?: Date;
  EndTime?: Date;
  ReportTime?: Date;
  AnalysisType?: EnabledAnalysisType;
  NextToken?: string;
  AnalysisReportResults?: AnalysisTypeReportResult[];
}
export const GetAnalysisReportResultsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ReportTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    AnalysisType: S.optional(EnabledAnalysisType),
    NextToken: S.optional(S.String),
    AnalysisReportResults: S.optional(AnalysisReportResults),
  }),
).annotate({
  identifier: "GetAnalysisReportResultsResponse",
}) as any as S.Schema<GetAnalysisReportResultsResponse>;
export type PaginationToken = string;
export interface ListAnalysisReportsRequest {
  FirewallName?: string;
  FirewallArn?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListAnalysisReportsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallName: S.optional(S.String),
    FirewallArn: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAnalysisReportsRequest",
}) as any as S.Schema<ListAnalysisReportsRequest>;
export interface AnalysisReport {
  AnalysisReportId?: string;
  AnalysisType?: EnabledAnalysisType;
  ReportTime?: Date;
  Status?: string;
}
export const AnalysisReport = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AnalysisReportId: S.optional(S.String),
    AnalysisType: S.optional(EnabledAnalysisType),
    ReportTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(S.String),
  }),
).annotate({ identifier: "AnalysisReport" }) as any as S.Schema<AnalysisReport>;
export type AnalysisReports = AnalysisReport[];
export const AnalysisReports = /*@__PURE__*/ S.Array(AnalysisReport);
export interface ListAnalysisReportsResponse {
  AnalysisReports?: AnalysisReport[];
  NextToken?: string;
}
export const ListAnalysisReportsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AnalysisReports: S.optional(AnalysisReports),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAnalysisReportsResponse",
}) as any as S.Schema<ListAnalysisReportsResponse>;
export interface ListContainerAssociationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListContainerAssociationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListContainerAssociationsRequest",
}) as any as S.Schema<ListContainerAssociationsRequest>;
export interface ContainerAssociationSummary {
  Arn?: string;
  Name?: string;
}
export const ContainerAssociationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String), Name: S.optional(S.String) }),
).annotate({
  identifier: "ContainerAssociationSummary",
}) as any as S.Schema<ContainerAssociationSummary>;
export type ContainerAssociations = ContainerAssociationSummary[];
export const ContainerAssociations = /*@__PURE__*/ S.Array(
  ContainerAssociationSummary,
);
export interface ListContainerAssociationsResponse {
  ContainerAssociations?: ContainerAssociationSummary[];
  NextToken?: string;
}
export const ListContainerAssociationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerAssociations: S.optional(ContainerAssociations),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListContainerAssociationsResponse",
}) as any as S.Schema<ListContainerAssociationsResponse>;
export interface ListFirewallPoliciesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListFirewallPoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListFirewallPoliciesRequest",
}) as any as S.Schema<ListFirewallPoliciesRequest>;
export interface FirewallPolicyMetadata {
  Name?: string;
  Arn?: string;
}
export const FirewallPolicyMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Arn: S.optional(S.String) }),
).annotate({
  identifier: "FirewallPolicyMetadata",
}) as any as S.Schema<FirewallPolicyMetadata>;
export type FirewallPolicies = FirewallPolicyMetadata[];
export const FirewallPolicies = /*@__PURE__*/ S.Array(FirewallPolicyMetadata);
export interface ListFirewallPoliciesResponse {
  NextToken?: string;
  FirewallPolicies?: FirewallPolicyMetadata[];
}
export const ListFirewallPoliciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    FirewallPolicies: S.optional(FirewallPolicies),
  }),
).annotate({
  identifier: "ListFirewallPoliciesResponse",
}) as any as S.Schema<ListFirewallPoliciesResponse>;
export type VpcIds = string[];
export const VpcIds = /*@__PURE__*/ S.Array(S.String);
export interface ListFirewallsRequest {
  NextToken?: string;
  VpcIds?: string[];
  MaxResults?: number;
}
export const ListFirewallsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    VpcIds: S.optional(VpcIds),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListFirewallsRequest",
}) as any as S.Schema<ListFirewallsRequest>;
export interface FirewallMetadata {
  FirewallName?: string;
  FirewallArn?: string;
  TransitGatewayAttachmentId?: string;
}
export const FirewallMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallName: S.optional(S.String),
    FirewallArn: S.optional(S.String),
    TransitGatewayAttachmentId: S.optional(S.String),
  }),
).annotate({
  identifier: "FirewallMetadata",
}) as any as S.Schema<FirewallMetadata>;
export type Firewalls = FirewallMetadata[];
export const Firewalls = /*@__PURE__*/ S.Array(FirewallMetadata);
export interface ListFirewallsResponse {
  NextToken?: string;
  Firewalls?: FirewallMetadata[];
}
export const ListFirewallsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Firewalls: S.optional(Firewalls),
  }),
).annotate({
  identifier: "ListFirewallsResponse",
}) as any as S.Schema<ListFirewallsResponse>;
export interface ListFlowOperationResultsRequest {
  FirewallArn: string;
  FlowOperationId: string;
  NextToken?: string;
  MaxResults?: number;
  AvailabilityZone?: string;
  VpcEndpointId?: string;
  VpcEndpointAssociationArn?: string;
}
export const ListFlowOperationResultsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallArn: S.String,
    FlowOperationId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    AvailabilityZone: S.optional(S.String),
    VpcEndpointId: S.optional(S.String),
    VpcEndpointAssociationArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListFlowOperationResultsRequest",
}) as any as S.Schema<ListFlowOperationResultsRequest>;
export type PacketCount = number;
export type ByteCount = number;
export interface Flow {
  SourceAddress?: Address;
  DestinationAddress?: Address;
  SourcePort?: string;
  DestinationPort?: string;
  Protocol?: string;
  Age?: number;
  PacketCount?: number;
  ByteCount?: number;
}
export const Flow = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceAddress: S.optional(Address),
    DestinationAddress: S.optional(Address),
    SourcePort: S.optional(S.String),
    DestinationPort: S.optional(S.String),
    Protocol: S.optional(S.String),
    Age: S.optional(S.Number),
    PacketCount: S.optional(S.Number),
    ByteCount: S.optional(S.Number),
  }),
).annotate({ identifier: "Flow" }) as any as S.Schema<Flow>;
export type Flows = Flow[];
export const Flows = /*@__PURE__*/ S.Array(Flow);
export interface ListFlowOperationResultsResponse {
  FirewallArn?: string;
  AvailabilityZone?: string;
  VpcEndpointAssociationArn?: string;
  VpcEndpointId?: string;
  FlowOperationId?: string;
  FlowOperationStatus?: FlowOperationStatus;
  StatusMessage?: string;
  FlowRequestTimestamp?: Date;
  Flows?: Flow[];
  NextToken?: string;
}
export const ListFlowOperationResultsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallArn: S.optional(S.String),
    AvailabilityZone: S.optional(S.String),
    VpcEndpointAssociationArn: S.optional(S.String),
    VpcEndpointId: S.optional(S.String),
    FlowOperationId: S.optional(S.String),
    FlowOperationStatus: S.optional(FlowOperationStatus),
    StatusMessage: S.optional(S.String),
    FlowRequestTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Flows: S.optional(Flows),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFlowOperationResultsResponse",
}) as any as S.Schema<ListFlowOperationResultsResponse>;
export interface ListFlowOperationsRequest {
  FirewallArn: string;
  AvailabilityZone?: string;
  VpcEndpointAssociationArn?: string;
  VpcEndpointId?: string;
  FlowOperationType?: FlowOperationType;
  NextToken?: string;
  MaxResults?: number;
}
export const ListFlowOperationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallArn: S.String,
    AvailabilityZone: S.optional(S.String),
    VpcEndpointAssociationArn: S.optional(S.String),
    VpcEndpointId: S.optional(S.String),
    FlowOperationType: S.optional(FlowOperationType),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListFlowOperationsRequest",
}) as any as S.Schema<ListFlowOperationsRequest>;
export interface FlowOperationMetadata {
  FlowOperationId?: string;
  FlowOperationType?: FlowOperationType;
  FlowRequestTimestamp?: Date;
  FlowOperationStatus?: FlowOperationStatus;
}
export const FlowOperationMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowOperationId: S.optional(S.String),
    FlowOperationType: S.optional(FlowOperationType),
    FlowRequestTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    FlowOperationStatus: S.optional(FlowOperationStatus),
  }),
).annotate({
  identifier: "FlowOperationMetadata",
}) as any as S.Schema<FlowOperationMetadata>;
export type FlowOperations = FlowOperationMetadata[];
export const FlowOperations = /*@__PURE__*/ S.Array(FlowOperationMetadata);
export interface ListFlowOperationsResponse {
  FlowOperations?: FlowOperationMetadata[];
  NextToken?: string;
}
export const ListFlowOperationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowOperations: S.optional(FlowOperations),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFlowOperationsResponse",
}) as any as S.Schema<ListFlowOperationsResponse>;
export interface ListProxiesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListProxiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListProxiesRequest",
}) as any as S.Schema<ListProxiesRequest>;
export interface ProxyMetadata {
  Name?: string;
  Arn?: string;
}
export const ProxyMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Arn: S.optional(S.String) }),
).annotate({ identifier: "ProxyMetadata" }) as any as S.Schema<ProxyMetadata>;
export type Proxies = ProxyMetadata[];
export const Proxies = /*@__PURE__*/ S.Array(ProxyMetadata);
export interface ListProxiesResponse {
  Proxies?: ProxyMetadata[];
  NextToken?: string;
}
export const ListProxiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Proxies: S.optional(Proxies), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListProxiesResponse",
}) as any as S.Schema<ListProxiesResponse>;
export interface ListProxyConfigurationsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListProxyConfigurationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListProxyConfigurationsRequest",
}) as any as S.Schema<ListProxyConfigurationsRequest>;
export interface ProxyConfigurationMetadata {
  Name?: string;
  Arn?: string;
}
export const ProxyConfigurationMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Arn: S.optional(S.String) }),
).annotate({
  identifier: "ProxyConfigurationMetadata",
}) as any as S.Schema<ProxyConfigurationMetadata>;
export type ProxyConfigurations = ProxyConfigurationMetadata[];
export const ProxyConfigurations = /*@__PURE__*/ S.Array(
  ProxyConfigurationMetadata,
);
export interface ListProxyConfigurationsResponse {
  ProxyConfigurations?: ProxyConfigurationMetadata[];
  NextToken?: string;
}
export const ListProxyConfigurationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyConfigurations: S.optional(ProxyConfigurations),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProxyConfigurationsResponse",
}) as any as S.Schema<ListProxyConfigurationsResponse>;
export interface ListProxyRuleGroupsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListProxyRuleGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListProxyRuleGroupsRequest",
}) as any as S.Schema<ListProxyRuleGroupsRequest>;
export interface ProxyRuleGroupMetadata {
  Name?: string;
  Arn?: string;
}
export const ProxyRuleGroupMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Arn: S.optional(S.String) }),
).annotate({
  identifier: "ProxyRuleGroupMetadata",
}) as any as S.Schema<ProxyRuleGroupMetadata>;
export type ProxyRuleGroups = ProxyRuleGroupMetadata[];
export const ProxyRuleGroups = /*@__PURE__*/ S.Array(ProxyRuleGroupMetadata);
export interface ListProxyRuleGroupsResponse {
  ProxyRuleGroups?: ProxyRuleGroupMetadata[];
  NextToken?: string;
}
export const ListProxyRuleGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyRuleGroups: S.optional(ProxyRuleGroups),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProxyRuleGroupsResponse",
}) as any as S.Schema<ListProxyRuleGroupsResponse>;
export type ResourceManagedStatus = "MANAGED" | "ACCOUNT" | (string & {});
export const ResourceManagedStatus = S.String;

export type ResourceManagedType =
  | "AWS_MANAGED_THREAT_SIGNATURES"
  | "AWS_MANAGED_DOMAIN_LISTS"
  | "ACTIVE_THREAT_DEFENSE"
  | "PARTNER_MANAGED"
  | (string & {});
export const ResourceManagedType = S.String;

export type SubscriptionStatus =
  | "NOT_SUBSCRIBED"
  | "SUBSCRIBED"
  | (string & {});
export const SubscriptionStatus = S.String;

export interface ListRuleGroupsRequest {
  NextToken?: string;
  MaxResults?: number;
  Scope?: ResourceManagedStatus;
  ManagedType?: ResourceManagedType;
  SubscriptionStatus?: SubscriptionStatus;
  Type?: RuleGroupType;
}
export const ListRuleGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Scope: S.optional(ResourceManagedStatus),
    ManagedType: S.optional(ResourceManagedType),
    SubscriptionStatus: S.optional(SubscriptionStatus),
    Type: S.optional(RuleGroupType),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRuleGroupsRequest",
}) as any as S.Schema<ListRuleGroupsRequest>;
export interface RuleGroupMetadata {
  Name?: string;
  Arn?: string;
  VendorName?: string;
}
export const RuleGroupMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Arn: S.optional(S.String),
    VendorName: S.optional(S.String),
  }),
).annotate({
  identifier: "RuleGroupMetadata",
}) as any as S.Schema<RuleGroupMetadata>;
export type RuleGroups = RuleGroupMetadata[];
export const RuleGroups = /*@__PURE__*/ S.Array(RuleGroupMetadata);
export interface ListRuleGroupsResponse {
  NextToken?: string;
  RuleGroups?: RuleGroupMetadata[];
}
export const ListRuleGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    RuleGroups: S.optional(RuleGroups),
  }),
).annotate({
  identifier: "ListRuleGroupsResponse",
}) as any as S.Schema<ListRuleGroupsResponse>;
export type TagsPaginationMaxResults = number;
export interface ListTagsForResourceRequest {
  NextToken?: string;
  MaxResults?: number;
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    ResourceArn: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  NextToken?: string;
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NextToken: S.optional(S.String), Tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListTLSInspectionConfigurationsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListTLSInspectionConfigurationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListTLSInspectionConfigurationsRequest",
}) as any as S.Schema<ListTLSInspectionConfigurationsRequest>;
export interface TLSInspectionConfigurationMetadata {
  Name?: string;
  Arn?: string;
}
export const TLSInspectionConfigurationMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Arn: S.optional(S.String) }),
).annotate({
  identifier: "TLSInspectionConfigurationMetadata",
}) as any as S.Schema<TLSInspectionConfigurationMetadata>;
export type TLSInspectionConfigurations = TLSInspectionConfigurationMetadata[];
export const TLSInspectionConfigurations = /*@__PURE__*/ S.Array(
  TLSInspectionConfigurationMetadata,
);
export interface ListTLSInspectionConfigurationsResponse {
  NextToken?: string;
  TLSInspectionConfigurations?: TLSInspectionConfigurationMetadata[];
}
export const ListTLSInspectionConfigurationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextToken: S.optional(S.String),
      TLSInspectionConfigurations: S.optional(TLSInspectionConfigurations),
    }),
).annotate({
  identifier: "ListTLSInspectionConfigurationsResponse",
}) as any as S.Schema<ListTLSInspectionConfigurationsResponse>;
export interface ListVpcEndpointAssociationsRequest {
  NextToken?: string;
  MaxResults?: number;
  FirewallArn?: string;
}
export const ListVpcEndpointAssociationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    FirewallArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListVpcEndpointAssociationsRequest",
}) as any as S.Schema<ListVpcEndpointAssociationsRequest>;
export interface VpcEndpointAssociationMetadata {
  VpcEndpointAssociationArn?: string;
}
export const VpcEndpointAssociationMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcEndpointAssociationArn: S.optional(S.String) }),
).annotate({
  identifier: "VpcEndpointAssociationMetadata",
}) as any as S.Schema<VpcEndpointAssociationMetadata>;
export type VpcEndpointAssociations = VpcEndpointAssociationMetadata[];
export const VpcEndpointAssociations = /*@__PURE__*/ S.Array(
  VpcEndpointAssociationMetadata,
);
export interface ListVpcEndpointAssociationsResponse {
  NextToken?: string;
  VpcEndpointAssociations?: VpcEndpointAssociationMetadata[];
}
export const ListVpcEndpointAssociationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    VpcEndpointAssociations: S.optional(VpcEndpointAssociations),
  }),
).annotate({
  identifier: "ListVpcEndpointAssociationsResponse",
}) as any as S.Schema<ListVpcEndpointAssociationsResponse>;
export interface PutResourcePolicyRequest {
  ResourceArn: string;
  Policy: string;
}
export const PutResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Policy: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutResourcePolicyRequest",
}) as any as S.Schema<PutResourcePolicyRequest>;
export interface PutResourcePolicyResponse {}
export const PutResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutResourcePolicyResponse",
}) as any as S.Schema<PutResourcePolicyResponse>;
export interface RejectNetworkFirewallTransitGatewayAttachmentRequest {
  TransitGatewayAttachmentId: string;
}
export const RejectNetworkFirewallTransitGatewayAttachmentRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ TransitGatewayAttachmentId: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "RejectNetworkFirewallTransitGatewayAttachmentRequest",
  }) as any as S.Schema<RejectNetworkFirewallTransitGatewayAttachmentRequest>;
export interface RejectNetworkFirewallTransitGatewayAttachmentResponse {
  TransitGatewayAttachmentId: string;
  TransitGatewayAttachmentStatus: TransitGatewayAttachmentStatus;
}
export const RejectNetworkFirewallTransitGatewayAttachmentResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      TransitGatewayAttachmentId: S.String,
      TransitGatewayAttachmentStatus: TransitGatewayAttachmentStatus,
    }),
  ).annotate({
    identifier: "RejectNetworkFirewallTransitGatewayAttachmentResponse",
  }) as any as S.Schema<RejectNetworkFirewallTransitGatewayAttachmentResponse>;
export interface StartAnalysisReportRequest {
  FirewallName?: string;
  FirewallArn?: string;
  AnalysisType: EnabledAnalysisType;
}
export const StartAnalysisReportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallName: S.optional(S.String),
    FirewallArn: S.optional(S.String),
    AnalysisType: EnabledAnalysisType,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartAnalysisReportRequest",
}) as any as S.Schema<StartAnalysisReportRequest>;
export interface StartAnalysisReportResponse {
  AnalysisReportId: string;
}
export const StartAnalysisReportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AnalysisReportId: S.String }),
).annotate({
  identifier: "StartAnalysisReportResponse",
}) as any as S.Schema<StartAnalysisReportResponse>;
export interface StartFlowCaptureRequest {
  FirewallArn: string;
  AvailabilityZone?: string;
  VpcEndpointAssociationArn?: string;
  VpcEndpointId?: string;
  MinimumFlowAgeInSeconds?: number;
  FlowFilters: FlowFilter[];
}
export const StartFlowCaptureRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallArn: S.String,
    AvailabilityZone: S.optional(S.String),
    VpcEndpointAssociationArn: S.optional(S.String),
    VpcEndpointId: S.optional(S.String),
    MinimumFlowAgeInSeconds: S.optional(S.Number),
    FlowFilters: FlowFilters,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartFlowCaptureRequest",
}) as any as S.Schema<StartFlowCaptureRequest>;
export interface StartFlowCaptureResponse {
  FirewallArn?: string;
  FlowOperationId?: string;
  FlowOperationStatus?: FlowOperationStatus;
}
export const StartFlowCaptureResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallArn: S.optional(S.String),
    FlowOperationId: S.optional(S.String),
    FlowOperationStatus: S.optional(FlowOperationStatus),
  }),
).annotate({
  identifier: "StartFlowCaptureResponse",
}) as any as S.Schema<StartFlowCaptureResponse>;
export interface StartFlowFlushRequest {
  FirewallArn: string;
  AvailabilityZone?: string;
  VpcEndpointAssociationArn?: string;
  VpcEndpointId?: string;
  MinimumFlowAgeInSeconds?: number;
  FlowFilters: FlowFilter[];
}
export const StartFlowFlushRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallArn: S.String,
    AvailabilityZone: S.optional(S.String),
    VpcEndpointAssociationArn: S.optional(S.String),
    VpcEndpointId: S.optional(S.String),
    MinimumFlowAgeInSeconds: S.optional(S.Number),
    FlowFilters: FlowFilters,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartFlowFlushRequest",
}) as any as S.Schema<StartFlowFlushRequest>;
export interface StartFlowFlushResponse {
  FirewallArn?: string;
  FlowOperationId?: string;
  FlowOperationStatus?: FlowOperationStatus;
}
export const StartFlowFlushResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallArn: S.optional(S.String),
    FlowOperationId: S.optional(S.String),
    FlowOperationStatus: S.optional(FlowOperationStatus),
  }),
).annotate({
  identifier: "StartFlowFlushResponse",
}) as any as S.Schema<StartFlowFlushResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: TagList }).pipe(
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
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, TagKeys: TagKeyList }).pipe(
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
export interface UpdateAvailabilityZoneChangeProtectionRequest {
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  AvailabilityZoneChangeProtection: boolean;
}
export const UpdateAvailabilityZoneChangeProtectionRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      UpdateToken: S.optional(S.String),
      FirewallArn: S.optional(S.String),
      FirewallName: S.optional(S.String),
      AvailabilityZoneChangeProtection: S.Boolean,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "UpdateAvailabilityZoneChangeProtectionRequest",
  }) as any as S.Schema<UpdateAvailabilityZoneChangeProtectionRequest>;
export interface UpdateAvailabilityZoneChangeProtectionResponse {
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  AvailabilityZoneChangeProtection?: boolean;
}
export const UpdateAvailabilityZoneChangeProtectionResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      UpdateToken: S.optional(S.String),
      FirewallArn: S.optional(S.String),
      FirewallName: S.optional(S.String),
      AvailabilityZoneChangeProtection: S.optional(S.Boolean),
    }),
  ).annotate({
    identifier: "UpdateAvailabilityZoneChangeProtectionResponse",
  }) as any as S.Schema<UpdateAvailabilityZoneChangeProtectionResponse>;
export interface UpdateContainerAssociationRequest {
  ContainerAssociationName?: string;
  ContainerAssociationArn?: string;
  Description?: string;
  Type: ContainerMonitoringType;
  ContainerMonitoringConfigurations: ContainerMonitoringConfiguration[];
  Tags?: Tag[];
  UpdateToken: string;
}
export const UpdateContainerAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerAssociationName: S.optional(S.String),
    ContainerAssociationArn: S.optional(S.String),
    Description: S.optional(S.String),
    Type: ContainerMonitoringType,
    ContainerMonitoringConfigurations: ContainerMonitoringConfigurations,
    Tags: S.optional(TagList),
    UpdateToken: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateContainerAssociationRequest",
}) as any as S.Schema<UpdateContainerAssociationRequest>;
export interface UpdateContainerAssociationResponse {
  ContainerAssociationName?: string;
  ContainerAssociationArn?: string;
  Description?: string;
  Type?: ContainerMonitoringType;
  ContainerMonitoringConfigurations?: ContainerMonitoringConfiguration[];
  Status?: ContainerAssociationStatus;
  Tags?: Tag[];
  UpdateToken?: string;
}
export const UpdateContainerAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerAssociationName: S.optional(S.String),
    ContainerAssociationArn: S.optional(S.String),
    Description: S.optional(S.String),
    Type: S.optional(ContainerMonitoringType),
    ContainerMonitoringConfigurations: S.optional(
      ContainerMonitoringConfigurations,
    ),
    Status: S.optional(ContainerAssociationStatus),
    Tags: S.optional(TagList),
    UpdateToken: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateContainerAssociationResponse",
}) as any as S.Schema<UpdateContainerAssociationResponse>;
export interface UpdateFirewallAnalysisSettingsRequest {
  EnabledAnalysisTypes?: EnabledAnalysisType[];
  FirewallArn?: string;
  FirewallName?: string;
  UpdateToken?: string;
}
export const UpdateFirewallAnalysisSettingsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      EnabledAnalysisTypes: S.optional(EnabledAnalysisTypes),
      FirewallArn: S.optional(S.String),
      FirewallName: S.optional(S.String),
      UpdateToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "UpdateFirewallAnalysisSettingsRequest",
}) as any as S.Schema<UpdateFirewallAnalysisSettingsRequest>;
export interface UpdateFirewallAnalysisSettingsResponse {
  EnabledAnalysisTypes?: EnabledAnalysisType[];
  FirewallArn?: string;
  FirewallName?: string;
  UpdateToken?: string;
}
export const UpdateFirewallAnalysisSettingsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      EnabledAnalysisTypes: S.optional(EnabledAnalysisTypes),
      FirewallArn: S.optional(S.String),
      FirewallName: S.optional(S.String),
      UpdateToken: S.optional(S.String),
    }),
).annotate({
  identifier: "UpdateFirewallAnalysisSettingsResponse",
}) as any as S.Schema<UpdateFirewallAnalysisSettingsResponse>;
export interface UpdateFirewallDeleteProtectionRequest {
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  DeleteProtection: boolean;
}
export const UpdateFirewallDeleteProtectionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      UpdateToken: S.optional(S.String),
      FirewallArn: S.optional(S.String),
      FirewallName: S.optional(S.String),
      DeleteProtection: S.Boolean,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "UpdateFirewallDeleteProtectionRequest",
}) as any as S.Schema<UpdateFirewallDeleteProtectionRequest>;
export interface UpdateFirewallDeleteProtectionResponse {
  FirewallArn?: string;
  FirewallName?: string;
  DeleteProtection?: boolean;
  UpdateToken?: string;
}
export const UpdateFirewallDeleteProtectionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FirewallArn: S.optional(S.String),
      FirewallName: S.optional(S.String),
      DeleteProtection: S.optional(S.Boolean),
      UpdateToken: S.optional(S.String),
    }),
).annotate({
  identifier: "UpdateFirewallDeleteProtectionResponse",
}) as any as S.Schema<UpdateFirewallDeleteProtectionResponse>;
export interface UpdateFirewallDescriptionRequest {
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  Description?: string;
}
export const UpdateFirewallDescriptionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpdateToken: S.optional(S.String),
    FirewallArn: S.optional(S.String),
    FirewallName: S.optional(S.String),
    Description: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateFirewallDescriptionRequest",
}) as any as S.Schema<UpdateFirewallDescriptionRequest>;
export interface UpdateFirewallDescriptionResponse {
  FirewallArn?: string;
  FirewallName?: string;
  Description?: string;
  UpdateToken?: string;
}
export const UpdateFirewallDescriptionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallArn: S.optional(S.String),
    FirewallName: S.optional(S.String),
    Description: S.optional(S.String),
    UpdateToken: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateFirewallDescriptionResponse",
}) as any as S.Schema<UpdateFirewallDescriptionResponse>;
export interface UpdateFirewallEncryptionConfigurationRequest {
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  EncryptionConfiguration?: EncryptionConfiguration;
}
export const UpdateFirewallEncryptionConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      UpdateToken: S.optional(S.String),
      FirewallArn: S.optional(S.String),
      FirewallName: S.optional(S.String),
      EncryptionConfiguration: S.optional(EncryptionConfiguration),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "UpdateFirewallEncryptionConfigurationRequest",
  }) as any as S.Schema<UpdateFirewallEncryptionConfigurationRequest>;
export interface UpdateFirewallEncryptionConfigurationResponse {
  FirewallArn?: string;
  FirewallName?: string;
  UpdateToken?: string;
  EncryptionConfiguration?: EncryptionConfiguration;
}
export const UpdateFirewallEncryptionConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      FirewallArn: S.optional(S.String),
      FirewallName: S.optional(S.String),
      UpdateToken: S.optional(S.String),
      EncryptionConfiguration: S.optional(EncryptionConfiguration),
    }),
  ).annotate({
    identifier: "UpdateFirewallEncryptionConfigurationResponse",
  }) as any as S.Schema<UpdateFirewallEncryptionConfigurationResponse>;
export interface UpdateFirewallPolicyRequest {
  UpdateToken: string;
  FirewallPolicyArn?: string;
  FirewallPolicyName?: string;
  FirewallPolicy: FirewallPolicy;
  Description?: string;
  DryRun?: boolean;
  EncryptionConfiguration?: EncryptionConfiguration;
}
export const UpdateFirewallPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpdateToken: S.String,
    FirewallPolicyArn: S.optional(S.String),
    FirewallPolicyName: S.optional(S.String),
    FirewallPolicy: FirewallPolicy,
    Description: S.optional(S.String),
    DryRun: S.optional(S.Boolean),
    EncryptionConfiguration: S.optional(EncryptionConfiguration),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateFirewallPolicyRequest",
}) as any as S.Schema<UpdateFirewallPolicyRequest>;
export interface UpdateFirewallPolicyResponse {
  UpdateToken: string;
  FirewallPolicyResponse: FirewallPolicyResponse;
}
export const UpdateFirewallPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpdateToken: S.String,
    FirewallPolicyResponse: FirewallPolicyResponse,
  }),
).annotate({
  identifier: "UpdateFirewallPolicyResponse",
}) as any as S.Schema<UpdateFirewallPolicyResponse>;
export interface UpdateFirewallPolicyChangeProtectionRequest {
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  FirewallPolicyChangeProtection: boolean;
}
export const UpdateFirewallPolicyChangeProtectionRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      UpdateToken: S.optional(S.String),
      FirewallArn: S.optional(S.String),
      FirewallName: S.optional(S.String),
      FirewallPolicyChangeProtection: S.Boolean,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "UpdateFirewallPolicyChangeProtectionRequest",
  }) as any as S.Schema<UpdateFirewallPolicyChangeProtectionRequest>;
export interface UpdateFirewallPolicyChangeProtectionResponse {
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  FirewallPolicyChangeProtection?: boolean;
}
export const UpdateFirewallPolicyChangeProtectionResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      UpdateToken: S.optional(S.String),
      FirewallArn: S.optional(S.String),
      FirewallName: S.optional(S.String),
      FirewallPolicyChangeProtection: S.optional(S.Boolean),
    }),
  ).annotate({
    identifier: "UpdateFirewallPolicyChangeProtectionResponse",
  }) as any as S.Schema<UpdateFirewallPolicyChangeProtectionResponse>;
export interface UpdateLoggingConfigurationRequest {
  FirewallArn?: string;
  FirewallName?: string;
  LoggingConfiguration?: LoggingConfiguration;
  EnableMonitoringDashboard?: boolean;
}
export const UpdateLoggingConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallArn: S.optional(S.String),
    FirewallName: S.optional(S.String),
    LoggingConfiguration: S.optional(LoggingConfiguration),
    EnableMonitoringDashboard: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateLoggingConfigurationRequest",
}) as any as S.Schema<UpdateLoggingConfigurationRequest>;
export interface UpdateLoggingConfigurationResponse {
  FirewallArn?: string;
  FirewallName?: string;
  LoggingConfiguration?: LoggingConfiguration;
  EnableMonitoringDashboard?: boolean;
}
export const UpdateLoggingConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallArn: S.optional(S.String),
    FirewallName: S.optional(S.String),
    LoggingConfiguration: S.optional(LoggingConfiguration),
    EnableMonitoringDashboard: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "UpdateLoggingConfigurationResponse",
}) as any as S.Schema<UpdateLoggingConfigurationResponse>;
export interface UpdateProxyRequest {
  NatGatewayId: string;
  ProxyName?: string;
  ProxyArn?: string;
  ListenerPropertiesToAdd?: ListenerPropertyRequest[];
  ListenerPropertiesToRemove?: ListenerPropertyRequest[];
  TlsInterceptProperties?: TlsInterceptPropertiesRequest;
  UpdateToken: string;
}
export const UpdateProxyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NatGatewayId: S.String,
    ProxyName: S.optional(S.String),
    ProxyArn: S.optional(S.String),
    ListenerPropertiesToAdd: S.optional(ListenerPropertiesRequest),
    ListenerPropertiesToRemove: S.optional(ListenerPropertiesRequest),
    TlsInterceptProperties: S.optional(TlsInterceptPropertiesRequest),
    UpdateToken: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateProxyRequest",
}) as any as S.Schema<UpdateProxyRequest>;
export interface UpdateProxyResponse {
  Proxy?: Proxy;
  UpdateToken?: string;
}
export const UpdateProxyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Proxy: S.optional(Proxy), UpdateToken: S.optional(S.String) }),
).annotate({
  identifier: "UpdateProxyResponse",
}) as any as S.Schema<UpdateProxyResponse>;
export interface UpdateProxyConfigurationRequest {
  ProxyConfigurationName?: string;
  ProxyConfigurationArn?: string;
  DefaultRulePhaseActions: ProxyConfigDefaultRulePhaseActionsRequest;
  UpdateToken: string;
}
export const UpdateProxyConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyConfigurationName: S.optional(S.String),
    ProxyConfigurationArn: S.optional(S.String),
    DefaultRulePhaseActions: ProxyConfigDefaultRulePhaseActionsRequest,
    UpdateToken: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateProxyConfigurationRequest",
}) as any as S.Schema<UpdateProxyConfigurationRequest>;
export interface UpdateProxyConfigurationResponse {
  ProxyConfiguration?: ProxyConfiguration;
  UpdateToken?: string;
}
export const UpdateProxyConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyConfiguration: S.optional(ProxyConfiguration),
    UpdateToken: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateProxyConfigurationResponse",
}) as any as S.Schema<UpdateProxyConfigurationResponse>;
export interface UpdateProxyRuleRequest {
  ProxyRuleGroupName?: string;
  ProxyRuleGroupArn?: string;
  ProxyRuleName: string;
  Description?: string;
  Action?: ProxyRulePhaseAction;
  AddConditions?: ProxyRuleCondition[];
  RemoveConditions?: ProxyRuleCondition[];
  UpdateToken: string;
}
export const UpdateProxyRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyRuleGroupName: S.optional(S.String),
    ProxyRuleGroupArn: S.optional(S.String),
    ProxyRuleName: S.String,
    Description: S.optional(S.String),
    Action: S.optional(ProxyRulePhaseAction),
    AddConditions: S.optional(ProxyRuleConditionList),
    RemoveConditions: S.optional(ProxyRuleConditionList),
    UpdateToken: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateProxyRuleRequest",
}) as any as S.Schema<UpdateProxyRuleRequest>;
export interface UpdateProxyRuleResponse {
  ProxyRule?: ProxyRule;
  RemovedConditions?: ProxyRuleCondition[];
  UpdateToken?: string;
}
export const UpdateProxyRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyRule: S.optional(ProxyRule),
    RemovedConditions: S.optional(ProxyRuleConditionList),
    UpdateToken: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateProxyRuleResponse",
}) as any as S.Schema<UpdateProxyRuleResponse>;
export interface ProxyRuleGroupPriority {
  ProxyRuleGroupName?: string;
  NewPosition?: number;
}
export const ProxyRuleGroupPriority = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyRuleGroupName: S.optional(S.String),
    NewPosition: S.optional(S.Number),
  }),
).annotate({
  identifier: "ProxyRuleGroupPriority",
}) as any as S.Schema<ProxyRuleGroupPriority>;
export type ProxyRuleGroupPriorityList = ProxyRuleGroupPriority[];
export const ProxyRuleGroupPriorityList = /*@__PURE__*/ S.Array(
  ProxyRuleGroupPriority,
);
export interface UpdateProxyRuleGroupPrioritiesRequest {
  ProxyConfigurationName?: string;
  ProxyConfigurationArn?: string;
  RuleGroups: ProxyRuleGroupPriority[];
  UpdateToken: string;
}
export const UpdateProxyRuleGroupPrioritiesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProxyConfigurationName: S.optional(S.String),
      ProxyConfigurationArn: S.optional(S.String),
      RuleGroups: ProxyRuleGroupPriorityList,
      UpdateToken: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "UpdateProxyRuleGroupPrioritiesRequest",
}) as any as S.Schema<UpdateProxyRuleGroupPrioritiesRequest>;
export type ProxyRuleGroupPriorityResultPriority = number;
export interface ProxyRuleGroupPriorityResult {
  ProxyRuleGroupName?: string;
  Priority?: number;
}
export const ProxyRuleGroupPriorityResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyRuleGroupName: S.optional(S.String),
    Priority: S.optional(S.Number),
  }),
).annotate({
  identifier: "ProxyRuleGroupPriorityResult",
}) as any as S.Schema<ProxyRuleGroupPriorityResult>;
export type ProxyRuleGroupPriorityResultList = ProxyRuleGroupPriorityResult[];
export const ProxyRuleGroupPriorityResultList = /*@__PURE__*/ S.Array(
  ProxyRuleGroupPriorityResult,
);
export interface UpdateProxyRuleGroupPrioritiesResponse {
  ProxyRuleGroups?: ProxyRuleGroupPriorityResult[];
  UpdateToken?: string;
}
export const UpdateProxyRuleGroupPrioritiesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProxyRuleGroups: S.optional(ProxyRuleGroupPriorityResultList),
      UpdateToken: S.optional(S.String),
    }),
).annotate({
  identifier: "UpdateProxyRuleGroupPrioritiesResponse",
}) as any as S.Schema<UpdateProxyRuleGroupPrioritiesResponse>;
export type RuleGroupRequestPhase =
  | "PRE_DNS"
  | "PRE_REQ"
  | "POST_RES"
  | (string & {});
export const RuleGroupRequestPhase = S.String;

export interface ProxyRulePriority {
  ProxyRuleName?: string;
  NewPosition?: number;
}
export const ProxyRulePriority = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyRuleName: S.optional(S.String),
    NewPosition: S.optional(S.Number),
  }),
).annotate({
  identifier: "ProxyRulePriority",
}) as any as S.Schema<ProxyRulePriority>;
export type ProxyRulePriorityList = ProxyRulePriority[];
export const ProxyRulePriorityList = /*@__PURE__*/ S.Array(ProxyRulePriority);
export interface UpdateProxyRulePrioritiesRequest {
  ProxyRuleGroupName?: string;
  ProxyRuleGroupArn?: string;
  RuleGroupRequestPhase: RuleGroupRequestPhase;
  Rules: ProxyRulePriority[];
  UpdateToken: string;
}
export const UpdateProxyRulePrioritiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyRuleGroupName: S.optional(S.String),
    ProxyRuleGroupArn: S.optional(S.String),
    RuleGroupRequestPhase: RuleGroupRequestPhase,
    Rules: ProxyRulePriorityList,
    UpdateToken: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateProxyRulePrioritiesRequest",
}) as any as S.Schema<UpdateProxyRulePrioritiesRequest>;
export interface UpdateProxyRulePrioritiesResponse {
  ProxyRuleGroupName?: string;
  ProxyRuleGroupArn?: string;
  RuleGroupRequestPhase?: RuleGroupRequestPhase;
  Rules?: ProxyRulePriority[];
  UpdateToken?: string;
}
export const UpdateProxyRulePrioritiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProxyRuleGroupName: S.optional(S.String),
    ProxyRuleGroupArn: S.optional(S.String),
    RuleGroupRequestPhase: S.optional(RuleGroupRequestPhase),
    Rules: S.optional(ProxyRulePriorityList),
    UpdateToken: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateProxyRulePrioritiesResponse",
}) as any as S.Schema<UpdateProxyRulePrioritiesResponse>;
export interface UpdateProxySettingsRequest {
  FirewallArn?: string;
  FirewallName?: string;
  UpdateToken?: string;
  ProxySettings?: ProxySettings;
}
export const UpdateProxySettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallArn: S.optional(S.String),
    FirewallName: S.optional(S.String),
    UpdateToken: S.optional(S.String),
    ProxySettings: S.optional(ProxySettings),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateProxySettingsRequest",
}) as any as S.Schema<UpdateProxySettingsRequest>;
export interface UpdateProxySettingsResponse {
  FirewallArn?: string;
  FirewallName?: string;
  UpdateToken?: string;
  ProxySettings?: ProxySettings;
}
export const UpdateProxySettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallArn: S.optional(S.String),
    FirewallName: S.optional(S.String),
    UpdateToken: S.optional(S.String),
    ProxySettings: S.optional(ProxySettings),
  }),
).annotate({
  identifier: "UpdateProxySettingsResponse",
}) as any as S.Schema<UpdateProxySettingsResponse>;
export interface UpdateRuleGroupRequest {
  UpdateToken: string;
  RuleGroupArn?: string;
  RuleGroupName?: string;
  RuleGroup?: RuleGroup;
  Rules?: string;
  Type?: RuleGroupType;
  Description?: string;
  DryRun?: boolean;
  EncryptionConfiguration?: EncryptionConfiguration;
  SourceMetadata?: SourceMetadata;
  AnalyzeRuleGroup?: boolean;
  SummaryConfiguration?: SummaryConfiguration;
}
export const UpdateRuleGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpdateToken: S.String,
    RuleGroupArn: S.optional(S.String),
    RuleGroupName: S.optional(S.String),
    RuleGroup: S.optional(RuleGroup),
    Rules: S.optional(S.String),
    Type: S.optional(RuleGroupType),
    Description: S.optional(S.String),
    DryRun: S.optional(S.Boolean),
    EncryptionConfiguration: S.optional(EncryptionConfiguration),
    SourceMetadata: S.optional(SourceMetadata),
    AnalyzeRuleGroup: S.optional(S.Boolean),
    SummaryConfiguration: S.optional(SummaryConfiguration),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateRuleGroupRequest",
}) as any as S.Schema<UpdateRuleGroupRequest>;
export interface UpdateRuleGroupResponse {
  UpdateToken: string;
  RuleGroupResponse: RuleGroupResponse;
}
export const UpdateRuleGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UpdateToken: S.String, RuleGroupResponse: RuleGroupResponse }),
).annotate({
  identifier: "UpdateRuleGroupResponse",
}) as any as S.Schema<UpdateRuleGroupResponse>;
export interface UpdateSubnetChangeProtectionRequest {
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  SubnetChangeProtection: boolean;
}
export const UpdateSubnetChangeProtectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpdateToken: S.optional(S.String),
    FirewallArn: S.optional(S.String),
    FirewallName: S.optional(S.String),
    SubnetChangeProtection: S.Boolean,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateSubnetChangeProtectionRequest",
}) as any as S.Schema<UpdateSubnetChangeProtectionRequest>;
export interface UpdateSubnetChangeProtectionResponse {
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  SubnetChangeProtection?: boolean;
}
export const UpdateSubnetChangeProtectionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      UpdateToken: S.optional(S.String),
      FirewallArn: S.optional(S.String),
      FirewallName: S.optional(S.String),
      SubnetChangeProtection: S.optional(S.Boolean),
    }),
).annotate({
  identifier: "UpdateSubnetChangeProtectionResponse",
}) as any as S.Schema<UpdateSubnetChangeProtectionResponse>;
export interface UpdateTLSInspectionConfigurationRequest {
  TLSInspectionConfigurationArn?: string;
  TLSInspectionConfigurationName?: string;
  TLSInspectionConfiguration: TLSInspectionConfiguration;
  Description?: string;
  EncryptionConfiguration?: EncryptionConfiguration;
  UpdateToken: string;
}
export const UpdateTLSInspectionConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TLSInspectionConfigurationArn: S.optional(S.String),
      TLSInspectionConfigurationName: S.optional(S.String),
      TLSInspectionConfiguration: TLSInspectionConfiguration,
      Description: S.optional(S.String),
      EncryptionConfiguration: S.optional(EncryptionConfiguration),
      UpdateToken: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "UpdateTLSInspectionConfigurationRequest",
}) as any as S.Schema<UpdateTLSInspectionConfigurationRequest>;
export interface UpdateTLSInspectionConfigurationResponse {
  UpdateToken: string;
  TLSInspectionConfigurationResponse: TLSInspectionConfigurationResponse;
}
export const UpdateTLSInspectionConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      UpdateToken: S.String,
      TLSInspectionConfigurationResponse: TLSInspectionConfigurationResponse,
    }),
).annotate({
  identifier: "UpdateTLSInspectionConfigurationResponse",
}) as any as S.Schema<UpdateTLSInspectionConfigurationResponse>;
export type ErrorMessage = string;
export type AcceptNetworkFirewallTransitGatewayAttachmentError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Accepts a transit gateway attachment request for Network Firewall. When you accept the attachment request, Network Firewall creates the necessary routing components to enable traffic flow between the transit gateway and firewall endpoints.
 *
 * You must accept a transit gateway attachment to complete the creation of a transit gateway-attached firewall, unless auto-accept is enabled on the transit gateway. After acceptance, use DescribeFirewall to verify the firewall status.
 *
 * To reject an attachment instead of accepting it, use RejectNetworkFirewallTransitGatewayAttachment.
 *
 * It can take several minutes for the attachment acceptance to complete and the firewall to become available.
 */
export const acceptNetworkFirewallTransitGatewayAttachment: API.OperationMethod<
  AcceptNetworkFirewallTransitGatewayAttachmentRequest,
  AcceptNetworkFirewallTransitGatewayAttachmentResponse,
  AcceptNetworkFirewallTransitGatewayAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptNetworkFirewallTransitGatewayAttachmentRequest,
  output: AcceptNetworkFirewallTransitGatewayAttachmentResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptNetworkFirewallTransitGatewayAttachment",
}));

export type AssociateAvailabilityZonesError =
  | InsufficientCapacityException
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates the specified Availability Zones with a transit gateway-attached firewall. For each Availability Zone, Network Firewall creates a firewall endpoint to process traffic. You can specify one or more Availability Zones where you want to deploy the firewall.
 *
 * After adding Availability Zones, you must update your transit gateway route tables to direct traffic through the new firewall endpoints. Use DescribeFirewall to monitor the status of the new endpoints.
 */
export const associateAvailabilityZones: API.OperationMethod<
  AssociateAvailabilityZonesRequest,
  AssociateAvailabilityZonesResponse,
  AssociateAvailabilityZonesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateAvailabilityZonesRequest,
  output: AssociateAvailabilityZonesResponse,
  errors: [
    InsufficientCapacityException,
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateAvailabilityZones",
}));

export type AssociateFirewallPolicyError =
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates a FirewallPolicy to a Firewall.
 *
 * A firewall policy defines how to monitor and manage your VPC network traffic, using a
 * collection of inspection rule groups and other settings. Each firewall requires one
 * firewall policy association, and you can use the same firewall policy for multiple
 * firewalls.
 */
export const associateFirewallPolicy: API.OperationMethod<
  AssociateFirewallPolicyRequest,
  AssociateFirewallPolicyResponse,
  AssociateFirewallPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateFirewallPolicyRequest,
  output: AssociateFirewallPolicyResponse,
  errors: [
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateFirewallPolicy",
}));

export type AssociateSubnetsError =
  | InsufficientCapacityException
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates the specified subnets in the Amazon VPC to the firewall. You can specify one
 * subnet for each of the Availability Zones that the VPC spans.
 *
 * This request creates an Network Firewall firewall endpoint in each of the subnets. To
 * enable the firewall's protections, you must also modify the VPC's route tables for each
 * subnet's Availability Zone, to redirect the traffic that's coming into and going out of the
 * zone through the firewall endpoint.
 */
export const associateSubnets: API.OperationMethod<
  AssociateSubnetsRequest,
  AssociateSubnetsResponse,
  AssociateSubnetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateSubnetsRequest,
  output: AssociateSubnetsResponse,
  errors: [
    InsufficientCapacityException,
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateSubnets",
}));

export type AttachRuleGroupsToProxyConfigurationError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Attaches ProxyRuleGroup resources to a ProxyConfiguration
 *
 * A Proxy Configuration defines the monitoring and protection behavior for a Proxy. The details of the behavior are defined in the rule groups that you add to your configuration.
 */
export const attachRuleGroupsToProxyConfiguration: API.OperationMethod<
  AttachRuleGroupsToProxyConfigurationRequest,
  AttachRuleGroupsToProxyConfigurationResponse,
  AttachRuleGroupsToProxyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AttachRuleGroupsToProxyConfigurationRequest,
  output: AttachRuleGroupsToProxyConfigurationResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachRuleGroupsToProxyConfiguration",
}));

export type CreateContainerAssociationError =
  | InsufficientCapacityException
  | InternalServerError
  | InvalidRequestException
  | LimitExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a Network Firewall container association. The association monitors container lifecycle events in your
 * Amazon ECS or Amazon EKS clusters and resolves running container addresses for use in firewall rules.
 */
export const createContainerAssociation: API.OperationMethod<
  CreateContainerAssociationRequest,
  CreateContainerAssociationResponse,
  CreateContainerAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateContainerAssociationRequest,
  output: CreateContainerAssociationResponse,
  errors: [
    InsufficientCapacityException,
    InternalServerError,
    InvalidRequestException,
    LimitExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContainerAssociation",
}));

export type CreateFirewallError =
  | InsufficientCapacityException
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | LimitExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an Network Firewall Firewall and accompanying FirewallStatus for a VPC.
 *
 * The firewall defines the configuration settings for an Network Firewall firewall. The settings that you can define at creation include the firewall policy, the subnets in your VPC to use for the firewall endpoints, and any tags that are attached to the firewall Amazon Web Services resource.
 *
 * After you create a firewall, you can provide additional settings, like the logging configuration.
 *
 * To update the settings for a firewall, you use the operations that apply to the settings
 * themselves, for example UpdateLoggingConfiguration, AssociateSubnets, and UpdateFirewallDeleteProtection.
 *
 * To manage a firewall's tags, use the standard Amazon Web Services resource tagging operations, ListTagsForResource, TagResource, and UntagResource.
 *
 * To retrieve information about firewalls, use ListFirewalls and DescribeFirewall.
 *
 * To generate a report on the last 30 days of traffic monitored by a firewall, use StartAnalysisReport.
 */
export const createFirewall: API.OperationMethod<
  CreateFirewallRequest,
  CreateFirewallResponse,
  CreateFirewallError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFirewallRequest,
  output: CreateFirewallResponse,
  errors: [
    InsufficientCapacityException,
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    LimitExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFirewall",
}));

export type CreateFirewallPolicyError =
  | InsufficientCapacityException
  | InternalServerError
  | InvalidRequestException
  | LimitExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates the firewall policy for the firewall according to the specifications.
 *
 * An Network Firewall firewall policy defines the behavior of a firewall, in a collection of
 * stateless and stateful rule groups and other settings. You can use one firewall policy for
 * multiple firewalls.
 */
export const createFirewallPolicy: API.OperationMethod<
  CreateFirewallPolicyRequest,
  CreateFirewallPolicyResponse,
  CreateFirewallPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFirewallPolicyRequest,
  output: CreateFirewallPolicyResponse,
  errors: [
    InsufficientCapacityException,
    InternalServerError,
    InvalidRequestException,
    LimitExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFirewallPolicy",
}));

export type CreateProxyError =
  | InternalServerError
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates an Network Firewall Proxy
 *
 * Attaches a Proxy configuration to a NAT Gateway.
 *
 * To manage a proxy's tags, use the standard Amazon Web Services resource tagging operations, ListTagsForResource, TagResource, and UntagResource.
 *
 * To retrieve information about proxies, use ListProxies and DescribeProxy.
 */
export const createProxy: API.OperationMethod<
  CreateProxyRequest,
  CreateProxyResponse,
  CreateProxyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProxyRequest,
  output: CreateProxyResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProxy",
}));

export type CreateProxyConfigurationError =
  | InternalServerError
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an Network Firewall ProxyConfiguration
 *
 * A Proxy Configuration defines the monitoring and protection behavior for a Proxy. The details of the behavior are defined in the rule groups that you add to your configuration.
 *
 * To manage a proxy configuration's tags, use the standard Amazon Web Services resource tagging operations, ListTagsForResource, TagResource, and UntagResource.
 *
 * To retrieve information about proxies, use ListProxyConfigurations and DescribeProxyConfiguration.
 */
export const createProxyConfiguration: API.OperationMethod<
  CreateProxyConfigurationRequest,
  CreateProxyConfigurationResponse,
  CreateProxyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProxyConfigurationRequest,
  output: CreateProxyConfigurationResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProxyConfiguration",
}));

export type CreateProxyRuleGroupError =
  | InternalServerError
  | InvalidRequestException
  | LimitExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an Network Firewall ProxyRuleGroup
 *
 * Collections of related proxy filtering rules. Rule groups help you manage and reuse sets of rules across multiple proxy configurations.
 *
 * To manage a proxy rule group's tags, use the standard Amazon Web Services resource tagging operations, ListTagsForResource, TagResource, and UntagResource.
 *
 * To retrieve information about proxy rule groups, use ListProxyRuleGroups and DescribeProxyRuleGroup.
 *
 * To retrieve information about individual proxy rules, use DescribeProxyRuleGroup and DescribeProxyRule.
 */
export const createProxyRuleGroup: API.OperationMethod<
  CreateProxyRuleGroupRequest,
  CreateProxyRuleGroupResponse,
  CreateProxyRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProxyRuleGroupRequest,
  output: CreateProxyRuleGroupResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    LimitExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProxyRuleGroup",
}));

export type CreateProxyRulesError =
  | InternalServerError
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates Network Firewall ProxyRule resources.
 *
 * Attaches new proxy rule(s) to an existing proxy rule group.
 *
 * To retrieve information about individual proxy rules, use DescribeProxyRuleGroup and DescribeProxyRule.
 */
export const createProxyRules: API.OperationMethod<
  CreateProxyRulesRequest,
  CreateProxyRulesResponse,
  CreateProxyRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProxyRulesRequest,
  output: CreateProxyRulesResponse,
  errors: [InternalServerError, InvalidRequestException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProxyRules",
}));

export type CreateRuleGroupError =
  | InsufficientCapacityException
  | InternalServerError
  | InvalidRequestException
  | LimitExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates the specified stateless or stateful rule group, which includes the rules for
 * network traffic inspection, a capacity setting, and tags.
 *
 * You provide your rule group specification in your request using either
 * `RuleGroup` or `Rules`.
 */
export const createRuleGroup: API.OperationMethod<
  CreateRuleGroupRequest,
  CreateRuleGroupResponse,
  CreateRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRuleGroupRequest,
  output: CreateRuleGroupResponse,
  errors: [
    InsufficientCapacityException,
    InternalServerError,
    InvalidRequestException,
    LimitExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRuleGroup",
}));

export type CreateTLSInspectionConfigurationError =
  | InsufficientCapacityException
  | InternalServerError
  | InvalidRequestException
  | LimitExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an Network Firewall TLS inspection configuration. Network Firewall uses TLS inspection configurations to decrypt your firewall's inbound and outbound SSL/TLS traffic. After decryption, Network Firewall inspects the traffic according to your firewall policy's stateful rules, and then re-encrypts it before sending it to its destination. You can enable inspection of your firewall's inbound traffic, outbound traffic, or both. To use TLS inspection with your firewall, you must first import or provision certificates using ACM, create a TLS inspection configuration, add that configuration to a new firewall policy, and then associate that policy with your firewall.
 *
 * To update the settings for a TLS inspection configuration, use UpdateTLSInspectionConfiguration.
 *
 * To manage a TLS inspection configuration's tags, use the standard Amazon Web Services resource tagging operations, ListTagsForResource, TagResource, and UntagResource.
 *
 * To retrieve information about TLS inspection configurations, use ListTLSInspectionConfigurations and DescribeTLSInspectionConfiguration.
 *
 * For more information about TLS inspection configurations, see Inspecting SSL/TLS traffic with TLS
 * inspection configurations in the *Network Firewall Developer Guide*.
 */
export const createTLSInspectionConfiguration: API.OperationMethod<
  CreateTLSInspectionConfigurationRequest,
  CreateTLSInspectionConfigurationResponse,
  CreateTLSInspectionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTLSInspectionConfigurationRequest,
  output: CreateTLSInspectionConfigurationResponse,
  errors: [
    InsufficientCapacityException,
    InternalServerError,
    InvalidRequestException,
    LimitExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTLSInspectionConfiguration",
}));

export type CreateVpcEndpointAssociationError =
  | InsufficientCapacityException
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a firewall endpoint for an Network Firewall firewall. This type of firewall endpoint is independent of the firewall endpoints that you specify in the `Firewall` itself, and you define it in addition to those endpoints after the firewall has been created. You can define a VPC endpoint association using a different VPC than the one you used in the firewall specifications.
 */
export const createVpcEndpointAssociation: API.OperationMethod<
  CreateVpcEndpointAssociationRequest,
  CreateVpcEndpointAssociationResponse,
  CreateVpcEndpointAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateVpcEndpointAssociationRequest,
  output: CreateVpcEndpointAssociationResponse,
  errors: [
    InsufficientCapacityException,
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVpcEndpointAssociation",
}));

export type DeleteContainerAssociationError =
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a container association. The resource transitions to a `DELETING` state. Deletion is
 * asynchronous - Network Firewall returns immediately while cleanup proceeds in the background. You can't delete a
 * container association while a rule group references it.
 */
export const deleteContainerAssociation: API.OperationMethod<
  DeleteContainerAssociationRequest,
  DeleteContainerAssociationResponse,
  DeleteContainerAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteContainerAssociationRequest,
  output: DeleteContainerAssociationResponse,
  errors: [
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContainerAssociation",
}));

export type DeleteFirewallError =
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes the specified Firewall and its FirewallStatus.
 * This operation requires the firewall's `DeleteProtection` flag to be
 * `FALSE`. You can't revert this operation.
 *
 * You can check whether a firewall is
 * in use by reviewing the route tables for the Availability Zones where you have
 * firewall subnet mappings. Retrieve the subnet mappings by calling DescribeFirewall.
 * You define and update the route tables through Amazon VPC. As needed, update the route tables for the
 * zones to remove the firewall endpoints. When the route tables no longer use the firewall endpoints,
 * you can remove the firewall safely.
 *
 * To delete a firewall, remove the delete protection if you need to using UpdateFirewallDeleteProtection,
 * then delete the firewall by calling DeleteFirewall.
 */
export const deleteFirewall: API.OperationMethod<
  DeleteFirewallRequest,
  DeleteFirewallResponse,
  DeleteFirewallError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFirewallRequest,
  output: DeleteFirewallResponse,
  errors: [
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFirewall",
}));

export type DeleteFirewallPolicyError =
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes the specified FirewallPolicy.
 */
export const deleteFirewallPolicy: API.OperationMethod<
  DeleteFirewallPolicyRequest,
  DeleteFirewallPolicyResponse,
  DeleteFirewallPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFirewallPolicyRequest,
  output: DeleteFirewallPolicyResponse,
  errors: [
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFirewallPolicy",
}));

export type DeleteNetworkFirewallTransitGatewayAttachmentError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a transit gateway attachment from a Network Firewall. Either the firewall owner or the transit gateway owner can delete the attachment.
 *
 * After you delete a transit gateway attachment, traffic will no longer flow through the firewall endpoints.
 *
 * After you initiate the delete operation, use DescribeFirewall to monitor the deletion status.
 */
export const deleteNetworkFirewallTransitGatewayAttachment: API.OperationMethod<
  DeleteNetworkFirewallTransitGatewayAttachmentRequest,
  DeleteNetworkFirewallTransitGatewayAttachmentResponse,
  DeleteNetworkFirewallTransitGatewayAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteNetworkFirewallTransitGatewayAttachmentRequest,
  output: DeleteNetworkFirewallTransitGatewayAttachmentResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNetworkFirewallTransitGatewayAttachment",
}));

export type DeleteProxyError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes the specified Proxy.
 *
 * Detaches a Proxy configuration from a NAT Gateway.
 */
export const deleteProxy: API.OperationMethod<
  DeleteProxyRequest,
  DeleteProxyResponse,
  DeleteProxyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProxyRequest,
  output: DeleteProxyResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProxy",
}));

export type DeleteProxyConfigurationError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified ProxyConfiguration.
 */
export const deleteProxyConfiguration: API.OperationMethod<
  DeleteProxyConfigurationRequest,
  DeleteProxyConfigurationResponse,
  DeleteProxyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProxyConfigurationRequest,
  output: DeleteProxyConfigurationResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProxyConfiguration",
}));

export type DeleteProxyRuleGroupError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified ProxyRuleGroup.
 */
export const deleteProxyRuleGroup: API.OperationMethod<
  DeleteProxyRuleGroupRequest,
  DeleteProxyRuleGroupResponse,
  DeleteProxyRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProxyRuleGroupRequest,
  output: DeleteProxyRuleGroupResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProxyRuleGroup",
}));

export type DeleteProxyRulesError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified ProxyRule(s). currently attached to a ProxyRuleGroup
 */
export const deleteProxyRules: API.OperationMethod<
  DeleteProxyRulesRequest,
  DeleteProxyRulesResponse,
  DeleteProxyRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProxyRulesRequest,
  output: DeleteProxyRulesResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProxyRules",
}));

export type DeleteResourcePolicyError =
  | InternalServerError
  | InvalidRequestException
  | InvalidResourcePolicyException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a resource policy that you created in a PutResourcePolicy request.
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
    InternalServerError,
    InvalidRequestException,
    InvalidResourcePolicyException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type DeleteRuleGroupError =
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes the specified RuleGroup.
 */
export const deleteRuleGroup: API.OperationMethod<
  DeleteRuleGroupRequest,
  DeleteRuleGroupResponse,
  DeleteRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRuleGroupRequest,
  output: DeleteRuleGroupResponse,
  errors: [
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRuleGroup",
}));

export type DeleteTLSInspectionConfigurationError =
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified TLSInspectionConfiguration.
 */
export const deleteTLSInspectionConfiguration: API.OperationMethod<
  DeleteTLSInspectionConfigurationRequest,
  DeleteTLSInspectionConfigurationResponse,
  DeleteTLSInspectionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTLSInspectionConfigurationRequest,
  output: DeleteTLSInspectionConfigurationResponse,
  errors: [
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTLSInspectionConfiguration",
}));

export type DeleteVpcEndpointAssociationError =
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified VpcEndpointAssociation.
 *
 * You can check whether an endpoint association is
 * in use by reviewing the route tables for the Availability Zones where you have the endpoint subnet mapping.
 * You can retrieve the subnet mapping by calling DescribeVpcEndpointAssociation.
 * You define and update the route tables through Amazon VPC. As needed, update the route tables for the
 * Availability Zone to remove the firewall endpoint for the association. When the route tables no longer use the firewall endpoint,
 * you can remove the endpoint association safely.
 */
export const deleteVpcEndpointAssociation: API.OperationMethod<
  DeleteVpcEndpointAssociationRequest,
  DeleteVpcEndpointAssociationResponse,
  DeleteVpcEndpointAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVpcEndpointAssociationRequest,
  output: DeleteVpcEndpointAssociationResponse,
  errors: [
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVpcEndpointAssociation",
}));

export type DescribeContainerAssociationError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the configuration and status of a container association.
 */
export const describeContainerAssociation: API.OperationMethod<
  DescribeContainerAssociationRequest,
  DescribeContainerAssociationResponse,
  DescribeContainerAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeContainerAssociationRequest,
  output: DescribeContainerAssociationResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContainerAssociation",
}));

export type DescribeFirewallError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the data objects for the specified firewall.
 */
export const describeFirewall: API.OperationMethod<
  DescribeFirewallRequest,
  DescribeFirewallResponse,
  DescribeFirewallError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeFirewallRequest,
  output: DescribeFirewallResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFirewall",
}));

export type DescribeFirewallMetadataError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the high-level information about a firewall, including the Availability Zones where the Firewall is
 * currently in use.
 */
export const describeFirewallMetadata: API.OperationMethod<
  DescribeFirewallMetadataRequest,
  DescribeFirewallMetadataResponse,
  DescribeFirewallMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeFirewallMetadataRequest,
  output: DescribeFirewallMetadataResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFirewallMetadata",
}));

export type DescribeFirewallPolicyError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the data objects for the specified firewall policy.
 */
export const describeFirewallPolicy: API.OperationMethod<
  DescribeFirewallPolicyRequest,
  DescribeFirewallPolicyResponse,
  DescribeFirewallPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeFirewallPolicyRequest,
  output: DescribeFirewallPolicyResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFirewallPolicy",
}));

export type DescribeFlowOperationError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns key information about a specific flow operation.
 */
export const describeFlowOperation: API.OperationMethod<
  DescribeFlowOperationRequest,
  DescribeFlowOperationResponse,
  DescribeFlowOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeFlowOperationRequest,
  output: DescribeFlowOperationResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFlowOperation",
}));

export type DescribeLoggingConfigurationError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the logging configuration for the specified firewall.
 */
export const describeLoggingConfiguration: API.OperationMethod<
  DescribeLoggingConfigurationRequest,
  DescribeLoggingConfigurationResponse,
  DescribeLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeLoggingConfigurationRequest,
  output: DescribeLoggingConfigurationResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoggingConfiguration",
}));

export type DescribeProxyError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the data objects for the specified proxy.
 */
export const describeProxy: API.OperationMethod<
  DescribeProxyRequest,
  DescribeProxyResponse,
  DescribeProxyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeProxyRequest,
  output: DescribeProxyResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProxy",
}));

export type DescribeProxyConfigurationError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the data objects for the specified proxy configuration.
 */
export const describeProxyConfiguration: API.OperationMethod<
  DescribeProxyConfigurationRequest,
  DescribeProxyConfigurationResponse,
  DescribeProxyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeProxyConfigurationRequest,
  output: DescribeProxyConfigurationResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProxyConfiguration",
}));

export type DescribeProxyRuleError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the data objects for the specified proxy configuration for the specified proxy rule group.
 */
export const describeProxyRule: API.OperationMethod<
  DescribeProxyRuleRequest,
  DescribeProxyRuleResponse,
  DescribeProxyRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeProxyRuleRequest,
  output: DescribeProxyRuleResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProxyRule",
}));

export type DescribeProxyRuleGroupError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the data objects for the specified proxy rule group.
 */
export const describeProxyRuleGroup: API.OperationMethod<
  DescribeProxyRuleGroupRequest,
  DescribeProxyRuleGroupResponse,
  DescribeProxyRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeProxyRuleGroupRequest,
  output: DescribeProxyRuleGroupResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProxyRuleGroup",
}));

export type DescribeResourcePolicyError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a resource policy that you created in a PutResourcePolicy request.
 */
export const describeResourcePolicy: API.OperationMethod<
  DescribeResourcePolicyRequest,
  DescribeResourcePolicyResponse,
  DescribeResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeResourcePolicyRequest,
  output: DescribeResourcePolicyResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResourcePolicy",
}));

export type DescribeRuleGroupError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the data objects for the specified rule group.
 */
export const describeRuleGroup: API.OperationMethod<
  DescribeRuleGroupRequest,
  DescribeRuleGroupResponse,
  DescribeRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeRuleGroupRequest,
  output: DescribeRuleGroupResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRuleGroup",
}));

export type DescribeRuleGroupMetadataError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * High-level information about a rule group, returned by operations like create and describe.
 * You can use the information provided in the metadata to retrieve and manage a rule group.
 * You can retrieve all objects for a rule group by calling DescribeRuleGroup.
 */
export const describeRuleGroupMetadata: API.OperationMethod<
  DescribeRuleGroupMetadataRequest,
  DescribeRuleGroupMetadataResponse,
  DescribeRuleGroupMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeRuleGroupMetadataRequest,
  output: DescribeRuleGroupMetadataResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRuleGroupMetadata",
}));

export type DescribeRuleGroupSummaryError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns detailed information for a stateful rule group.
 *
 * For active threat defense Amazon Web Services managed rule groups, this operation provides insight into the protections enabled by the rule group, based on Suricata rule metadata fields. Summaries are available for rule groups you manage and for active threat defense Amazon Web Services managed rule groups.
 *
 * To modify how threat information appears in summaries, use the `SummaryConfiguration` parameter in UpdateRuleGroup.
 */
export const describeRuleGroupSummary: API.OperationMethod<
  DescribeRuleGroupSummaryRequest,
  DescribeRuleGroupSummaryResponse,
  DescribeRuleGroupSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeRuleGroupSummaryRequest,
  output: DescribeRuleGroupSummaryResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRuleGroupSummary",
}));

export type DescribeTLSInspectionConfigurationError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the data objects for the specified TLS inspection configuration.
 */
export const describeTLSInspectionConfiguration: API.OperationMethod<
  DescribeTLSInspectionConfigurationRequest,
  DescribeTLSInspectionConfigurationResponse,
  DescribeTLSInspectionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTLSInspectionConfigurationRequest,
  output: DescribeTLSInspectionConfigurationResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTLSInspectionConfiguration",
}));

export type DescribeVpcEndpointAssociationError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the data object for the specified VPC endpoint association.
 */
export const describeVpcEndpointAssociation: API.OperationMethod<
  DescribeVpcEndpointAssociationRequest,
  DescribeVpcEndpointAssociationResponse,
  DescribeVpcEndpointAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeVpcEndpointAssociationRequest,
  output: DescribeVpcEndpointAssociationResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVpcEndpointAssociation",
}));

export type DetachRuleGroupsFromProxyConfigurationError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Detaches ProxyRuleGroup resources from a ProxyConfiguration
 *
 * A Proxy Configuration defines the monitoring and protection behavior for a Proxy. The details of the behavior are defined in the rule groups that you add to your configuration.
 */
export const detachRuleGroupsFromProxyConfiguration: API.OperationMethod<
  DetachRuleGroupsFromProxyConfigurationRequest,
  DetachRuleGroupsFromProxyConfigurationResponse,
  DetachRuleGroupsFromProxyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DetachRuleGroupsFromProxyConfigurationRequest,
  output: DetachRuleGroupsFromProxyConfigurationResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachRuleGroupsFromProxyConfiguration",
}));

export type DisassociateAvailabilityZonesError =
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes the specified Availability Zone associations from a transit gateway-attached firewall. This removes the firewall endpoints from these Availability Zones and stops traffic filtering in those zones. Before removing an Availability Zone, ensure you've updated your transit gateway route tables to redirect traffic appropriately.
 *
 * If `AvailabilityZoneChangeProtection` is enabled, you must first disable it using UpdateAvailabilityZoneChangeProtection.
 *
 * To verify the status of your Availability Zone changes, use DescribeFirewall.
 */
export const disassociateAvailabilityZones: API.OperationMethod<
  DisassociateAvailabilityZonesRequest,
  DisassociateAvailabilityZonesResponse,
  DisassociateAvailabilityZonesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateAvailabilityZonesRequest,
  output: DisassociateAvailabilityZonesResponse,
  errors: [
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateAvailabilityZones",
}));

export type DisassociateSubnetsError =
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes the specified subnet associations from the firewall. This removes the
 * firewall endpoints from the subnets and removes any network filtering protections that the endpoints
 * were providing.
 */
export const disassociateSubnets: API.OperationMethod<
  DisassociateSubnetsRequest,
  DisassociateSubnetsResponse,
  DisassociateSubnetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateSubnetsRequest,
  output: DisassociateSubnetsResponse,
  errors: [
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateSubnets",
}));

export type GetAnalysisReportResultsError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The results of a `COMPLETED` analysis report generated with StartAnalysisReport.
 *
 * For more information, see AnalysisTypeReportResult.
 */
export const getAnalysisReportResults: API.PaginatedOperationMethod<
  GetAnalysisReportResultsRequest,
  GetAnalysisReportResultsResponse,
  GetAnalysisReportResultsError,
  Credentials | HttpClient.HttpClient,
  AnalysisTypeReportResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetAnalysisReportResultsRequest,
  output: GetAnalysisReportResultsResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAnalysisReportResults",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AnalysisReportResults",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAnalysisReportsError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of all traffic analysis reports generated within the last 30 days.
 */
export const listAnalysisReports: API.PaginatedOperationMethod<
  ListAnalysisReportsRequest,
  ListAnalysisReportsResponse,
  ListAnalysisReportsError,
  Credentials | HttpClient.HttpClient,
  AnalysisReport
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAnalysisReportsRequest,
  output: ListAnalysisReportsResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAnalysisReports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AnalysisReports",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListContainerAssociationsError =
  | InternalServerError
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the container associations in your account and Region. Use the `NextToken`
 * parameter in subsequent requests to retrieve additional results.
 */
export const listContainerAssociations: API.PaginatedOperationMethod<
  ListContainerAssociationsRequest,
  ListContainerAssociationsResponse,
  ListContainerAssociationsError,
  Credentials | HttpClient.HttpClient,
  ContainerAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListContainerAssociationsRequest,
  output: ListContainerAssociationsResponse,
  errors: [InternalServerError, InvalidRequestException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContainerAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ContainerAssociations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFirewallPoliciesError =
  | InternalServerError
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the metadata for the firewall policies that you have defined. Depending on
 * your setting for max results and the number of firewall policies, a single call might not
 * return the full list.
 */
export const listFirewallPolicies: API.PaginatedOperationMethod<
  ListFirewallPoliciesRequest,
  ListFirewallPoliciesResponse,
  ListFirewallPoliciesError,
  Credentials | HttpClient.HttpClient,
  FirewallPolicyMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFirewallPoliciesRequest,
  output: ListFirewallPoliciesResponse,
  errors: [InternalServerError, InvalidRequestException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFirewallPolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FirewallPolicies",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFirewallsError =
  | InternalServerError
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the metadata for the firewalls that you have defined. If you provide VPC
 * identifiers in your request, this returns only the firewalls for those VPCs.
 *
 * Depending on your setting for max results and the number of firewalls, a single call
 * might not return the full list.
 */
export const listFirewalls: API.PaginatedOperationMethod<
  ListFirewallsRequest,
  ListFirewallsResponse,
  ListFirewallsError,
  Credentials | HttpClient.HttpClient,
  FirewallMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFirewallsRequest,
  output: ListFirewallsResponse,
  errors: [InternalServerError, InvalidRequestException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFirewalls",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Firewalls",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFlowOperationResultsError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the results of a specific flow operation.
 *
 * Flow operations let you manage the flows tracked in the flow table, also known as the firewall table.
 *
 * A flow is network traffic that is monitored by a firewall, either by stateful or stateless rules.
 * For traffic to be considered part of a flow, it must share Destination, DestinationPort, Direction, Protocol, Source, and SourcePort.
 */
export const listFlowOperationResults: API.PaginatedOperationMethod<
  ListFlowOperationResultsRequest,
  ListFlowOperationResultsResponse,
  ListFlowOperationResultsError,
  Credentials | HttpClient.HttpClient,
  Flow
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFlowOperationResultsRequest,
  output: ListFlowOperationResultsResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFlowOperationResults",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Flows",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFlowOperationsError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of all flow operations ran in a specific firewall.
 * You can optionally narrow the request scope by specifying the operation type or Availability Zone associated with a firewall's flow operations.
 *
 * Flow operations let you manage the flows tracked in the flow table, also known as the firewall table.
 *
 * A flow is network traffic that is monitored by a firewall, either by stateful or stateless rules.
 * For traffic to be considered part of a flow, it must share Destination, DestinationPort, Direction, Protocol, Source, and SourcePort.
 */
export const listFlowOperations: API.PaginatedOperationMethod<
  ListFlowOperationsRequest,
  ListFlowOperationsResponse,
  ListFlowOperationsError,
  Credentials | HttpClient.HttpClient,
  FlowOperationMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFlowOperationsRequest,
  output: ListFlowOperationsResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFlowOperations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FlowOperations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProxiesError =
  | InternalServerError
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the metadata for the proxies that you have defined. Depending on
 * your setting for max results and the number of proxies, a single call might not
 * return the full list.
 */
export const listProxies: API.PaginatedOperationMethod<
  ListProxiesRequest,
  ListProxiesResponse,
  ListProxiesError,
  Credentials | HttpClient.HttpClient,
  ProxyMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProxiesRequest,
  output: ListProxiesResponse,
  errors: [InternalServerError, InvalidRequestException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProxies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Proxies",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProxyConfigurationsError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the metadata for the proxy configuration that you have defined. Depending on
 * your setting for max results and the number of proxy configurations, a single call might not
 * return the full list.
 */
export const listProxyConfigurations: API.PaginatedOperationMethod<
  ListProxyConfigurationsRequest,
  ListProxyConfigurationsResponse,
  ListProxyConfigurationsError,
  Credentials | HttpClient.HttpClient,
  ProxyConfigurationMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProxyConfigurationsRequest,
  output: ListProxyConfigurationsResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProxyConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProxyConfigurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProxyRuleGroupsError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the metadata for the proxy rule groups that you have defined. Depending on
 * your setting for max results and the number of proxy rule groups, a single call might not
 * return the full list.
 */
export const listProxyRuleGroups: API.PaginatedOperationMethod<
  ListProxyRuleGroupsRequest,
  ListProxyRuleGroupsResponse,
  ListProxyRuleGroupsError,
  Credentials | HttpClient.HttpClient,
  ProxyRuleGroupMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProxyRuleGroupsRequest,
  output: ListProxyRuleGroupsResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProxyRuleGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProxyRuleGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRuleGroupsError =
  | InternalServerError
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the metadata for the rule groups that you have defined. Depending on your
 * setting for max results and the number of rule groups, a single call might not return the
 * full list.
 */
export const listRuleGroups: API.PaginatedOperationMethod<
  ListRuleGroupsRequest,
  ListRuleGroupsResponse,
  ListRuleGroupsError,
  Credentials | HttpClient.HttpClient,
  RuleGroupMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRuleGroupsRequest,
  output: ListRuleGroupsResponse,
  errors: [InternalServerError, InvalidRequestException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRuleGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RuleGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the tags associated with the specified resource. Tags are key:value pairs that
 * you can use to categorize and manage your resources, for purposes like billing. For
 * example, you might set the tag key to "customer" and the value to the customer name or ID.
 * You can specify one or more tags to add to each Amazon Web Services resource, up to 50 tags for a
 * resource.
 *
 * You can tag the Amazon Web Services resources that you manage through Network Firewall: firewalls, firewall
 * policies, and rule groups.
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
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
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

export type ListTLSInspectionConfigurationsError =
  | InternalServerError
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the metadata for the TLS inspection configurations that you have defined. Depending on your setting for max results and the number of TLS inspection configurations, a single call might not return the full list.
 */
export const listTLSInspectionConfigurations: API.PaginatedOperationMethod<
  ListTLSInspectionConfigurationsRequest,
  ListTLSInspectionConfigurationsResponse,
  ListTLSInspectionConfigurationsError,
  Credentials | HttpClient.HttpClient,
  TLSInspectionConfigurationMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTLSInspectionConfigurationsRequest,
  output: ListTLSInspectionConfigurationsResponse,
  errors: [InternalServerError, InvalidRequestException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTLSInspectionConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TLSInspectionConfigurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListVpcEndpointAssociationsError =
  | InternalServerError
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the metadata for the VPC endpoint associations that you have defined. If you specify a fireawll,
 * this returns only the endpoint associations for that firewall.
 *
 * Depending on your setting for max results and the number of associations, a single call
 * might not return the full list.
 */
export const listVpcEndpointAssociations: API.PaginatedOperationMethod<
  ListVpcEndpointAssociationsRequest,
  ListVpcEndpointAssociationsResponse,
  ListVpcEndpointAssociationsError,
  Credentials | HttpClient.HttpClient,
  VpcEndpointAssociationMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListVpcEndpointAssociationsRequest,
  output: ListVpcEndpointAssociationsResponse,
  errors: [InternalServerError, InvalidRequestException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVpcEndpointAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "VpcEndpointAssociations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutResourcePolicyError =
  | InternalServerError
  | InvalidRequestException
  | InvalidResourcePolicyException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates or updates an IAM policy for your rule group, firewall policy, or firewall. Use this to share these resources between accounts. This operation works in conjunction with the Amazon Web Services Resource Access Manager (RAM) service to manage resource sharing for Network Firewall.
 *
 * For information about using sharing with Network Firewall resources, see
 * Sharing Network Firewall resources in the *Network Firewall Developer Guide*.
 *
 * Use this operation to create or update a resource policy for your Network Firewall rule group, firewall policy, or firewall. In the resource policy, you specify the accounts that you want to share the Network Firewall resource with and the operations that you want the accounts to be able to perform.
 *
 * When you add an account in the resource policy, you then run the following Resource Access Manager (RAM) operations to access and accept the shared resource.
 *
 * - GetResourceShareInvitations - Returns the Amazon Resource Names (ARNs) of the resource share invitations.
 *
 * - AcceptResourceShareInvitation - Accepts the share invitation for a specified resource share.
 *
 * For additional information about resource sharing using RAM, see Resource Access Manager User Guide.
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
    InternalServerError,
    InvalidRequestException,
    InvalidResourcePolicyException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type RejectNetworkFirewallTransitGatewayAttachmentError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Rejects a transit gateway attachment request for Network Firewall. When you reject the attachment request, Network Firewall cancels the creation of routing components between the transit gateway and firewall endpoints.
 *
 * Only the transit gateway owner can reject the attachment. After rejection, no traffic will flow through the firewall endpoints for this attachment.
 *
 * Use DescribeFirewall to monitor the rejection status. To accept the attachment instead of rejecting it, use AcceptNetworkFirewallTransitGatewayAttachment.
 *
 * Once rejected, you cannot reverse this action. To establish connectivity, you must create a new transit gateway-attached firewall.
 */
export const rejectNetworkFirewallTransitGatewayAttachment: API.OperationMethod<
  RejectNetworkFirewallTransitGatewayAttachmentRequest,
  RejectNetworkFirewallTransitGatewayAttachmentResponse,
  RejectNetworkFirewallTransitGatewayAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RejectNetworkFirewallTransitGatewayAttachmentRequest,
  output: RejectNetworkFirewallTransitGatewayAttachmentResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectNetworkFirewallTransitGatewayAttachment",
}));

export type StartAnalysisReportError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Generates a traffic analysis report for the timeframe and traffic type you specify.
 *
 * For information on the contents of a traffic analysis report, see AnalysisReport.
 */
export const startAnalysisReport: API.OperationMethod<
  StartAnalysisReportRequest,
  StartAnalysisReportResponse,
  StartAnalysisReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartAnalysisReportRequest,
  output: StartAnalysisReportResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAnalysisReport",
}));

export type StartFlowCaptureError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Begins capturing the flows in a firewall, according to the filters you define.
 * Captures are similar, but not identical to snapshots. Capture operations provide visibility into flows that are not closed and are tracked by a firewall's flow table.
 * Unlike snapshots, captures are a time-boxed view.
 *
 * A flow is network traffic that is monitored by a firewall, either by stateful or stateless rules.
 * For traffic to be considered part of a flow, it must share Destination, DestinationPort, Direction, Protocol, Source, and SourcePort.
 *
 * To avoid encountering operation limits, you should avoid starting captures with broad filters, like wide IP ranges.
 * Instead, we recommend you define more specific criteria with `FlowFilters`, like narrow IP ranges, ports, or protocols.
 */
export const startFlowCapture: API.OperationMethod<
  StartFlowCaptureRequest,
  StartFlowCaptureResponse,
  StartFlowCaptureError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartFlowCaptureRequest,
  output: StartFlowCaptureResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFlowCapture",
}));

export type StartFlowFlushError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Begins the flushing of traffic from the firewall, according to the filters you define.
 * When the operation starts, impacted flows are temporarily marked as timed out before the Suricata engine prunes,
 * or flushes, the flows from the firewall table.
 *
 * While the flush completes, impacted flows are processed as midstream traffic. This may result in a
 * temporary increase in midstream traffic metrics. We recommend that you double check your stream exception policy
 * before you perform a flush operation.
 */
export const startFlowFlush: API.OperationMethod<
  StartFlowFlushRequest,
  StartFlowFlushResponse,
  StartFlowFlushError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartFlowFlushRequest,
  output: StartFlowFlushResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFlowFlush",
}));

export type TagResourceError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds the specified tags to the specified resource. Tags are key:value pairs that you can
 * use to categorize and manage your resources, for purposes like billing. For example, you
 * might set the tag key to "customer" and the value to the customer name or ID. You can
 * specify one or more tags to add to each Amazon Web Services resource, up to 50 tags for a resource.
 *
 * You can tag the Amazon Web Services resources that you manage through Network Firewall: firewalls, firewall
 * policies, and rule groups.
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
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes the tags with the specified keys from the specified resource. Tags are key:value
 * pairs that you can use to categorize and manage your resources, for purposes like billing.
 * For example, you might set the tag key to "customer" and the value to the customer name or
 * ID. You can specify one or more tags to add to each Amazon Web Services resource, up to 50 tags for a
 * resource.
 *
 * You can manage tags for the Amazon Web Services resources that you manage through Network Firewall:
 * firewalls, firewall policies, and rule groups.
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
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAvailabilityZoneChangeProtectionError =
  | InternalServerError
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ResourceOwnerCheckException
  | ThrottlingException
  | CommonErrors;
/**
 * Modifies the `AvailabilityZoneChangeProtection` setting for a transit gateway-attached firewall. When enabled, this setting prevents accidental changes to the firewall's Availability Zone configuration. This helps protect against disrupting traffic flow in production environments.
 *
 * When enabled, you must disable this protection before using AssociateAvailabilityZones or DisassociateAvailabilityZones to modify the firewall's Availability Zone configuration.
 */
export const updateAvailabilityZoneChangeProtection: API.OperationMethod<
  UpdateAvailabilityZoneChangeProtectionRequest,
  UpdateAvailabilityZoneChangeProtectionResponse,
  UpdateAvailabilityZoneChangeProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAvailabilityZoneChangeProtectionRequest,
  output: UpdateAvailabilityZoneChangeProtectionResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ResourceOwnerCheckException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAvailabilityZoneChangeProtection",
}));

export type UpdateContainerAssociationError =
  | InternalServerError
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the monitoring configurations and description of a container association. You can't change the container
 * type after creation. Provide an update token to enable optimistic concurrency control.
 */
export const updateContainerAssociation: API.OperationMethod<
  UpdateContainerAssociationRequest,
  UpdateContainerAssociationResponse,
  UpdateContainerAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateContainerAssociationRequest,
  output: UpdateContainerAssociationResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContainerAssociation",
}));

export type UpdateFirewallAnalysisSettingsError =
  | InternalServerError
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Enables specific types of firewall analysis on a specific firewall you define.
 */
export const updateFirewallAnalysisSettings: API.OperationMethod<
  UpdateFirewallAnalysisSettingsRequest,
  UpdateFirewallAnalysisSettingsResponse,
  UpdateFirewallAnalysisSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFirewallAnalysisSettingsRequest,
  output: UpdateFirewallAnalysisSettingsResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFirewallAnalysisSettings",
}));

export type UpdateFirewallDeleteProtectionError =
  | InternalServerError
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ResourceOwnerCheckException
  | ThrottlingException
  | CommonErrors;
/**
 * Modifies the flag, `DeleteProtection`, which indicates whether it is possible
 * to delete the firewall. If the flag is set to `TRUE`, the firewall is protected
 * against deletion. This setting helps protect against accidentally deleting a firewall
 * that's in use.
 */
export const updateFirewallDeleteProtection: API.OperationMethod<
  UpdateFirewallDeleteProtectionRequest,
  UpdateFirewallDeleteProtectionResponse,
  UpdateFirewallDeleteProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFirewallDeleteProtectionRequest,
  output: UpdateFirewallDeleteProtectionResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ResourceOwnerCheckException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFirewallDeleteProtection",
}));

export type UpdateFirewallDescriptionError =
  | InternalServerError
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Modifies the description for the specified firewall. Use the description to help you
 * identify the firewall when you're working with it.
 */
export const updateFirewallDescription: API.OperationMethod<
  UpdateFirewallDescriptionRequest,
  UpdateFirewallDescriptionResponse,
  UpdateFirewallDescriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFirewallDescriptionRequest,
  output: UpdateFirewallDescriptionResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFirewallDescription",
}));

export type UpdateFirewallEncryptionConfigurationError =
  | InternalServerError
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ResourceOwnerCheckException
  | ThrottlingException
  | CommonErrors;
/**
 * A complex type that contains settings for encryption of your firewall resources.
 */
export const updateFirewallEncryptionConfiguration: API.OperationMethod<
  UpdateFirewallEncryptionConfigurationRequest,
  UpdateFirewallEncryptionConfigurationResponse,
  UpdateFirewallEncryptionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFirewallEncryptionConfigurationRequest,
  output: UpdateFirewallEncryptionConfigurationResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ResourceOwnerCheckException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFirewallEncryptionConfiguration",
}));

export type UpdateFirewallPolicyError =
  | InternalServerError
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the properties of the specified firewall policy.
 */
export const updateFirewallPolicy: API.OperationMethod<
  UpdateFirewallPolicyRequest,
  UpdateFirewallPolicyResponse,
  UpdateFirewallPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFirewallPolicyRequest,
  output: UpdateFirewallPolicyResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFirewallPolicy",
}));

export type UpdateFirewallPolicyChangeProtectionError =
  | InternalServerError
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ResourceOwnerCheckException
  | ThrottlingException
  | CommonErrors;
/**
 * Modifies the flag, `ChangeProtection`, which indicates whether it
 * is possible to change the firewall. If the flag is set to `TRUE`, the firewall is protected
 * from changes. This setting helps protect against accidentally changing a firewall that's in use.
 */
export const updateFirewallPolicyChangeProtection: API.OperationMethod<
  UpdateFirewallPolicyChangeProtectionRequest,
  UpdateFirewallPolicyChangeProtectionResponse,
  UpdateFirewallPolicyChangeProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFirewallPolicyChangeProtectionRequest,
  output: UpdateFirewallPolicyChangeProtectionResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ResourceOwnerCheckException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFirewallPolicyChangeProtection",
}));

export type UpdateLoggingConfigurationError =
  | InternalServerError
  | InvalidRequestException
  | InvalidTokenException
  | LogDestinationPermissionException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Sets the logging configuration for the specified firewall.
 *
 * To change the logging configuration, retrieve the LoggingConfiguration by calling DescribeLoggingConfiguration, then change it and provide
 * the modified object to this update call. You must change the logging configuration one
 * LogDestinationConfig at a time inside the retrieved LoggingConfiguration object.
 *
 * You can perform only one of the following actions in any call to
 * `UpdateLoggingConfiguration`:
 *
 * - Create a new log destination object by adding a single
 * `LogDestinationConfig` array element to
 * `LogDestinationConfigs`.
 *
 * - Delete a log destination object by removing a single
 * `LogDestinationConfig` array element from
 * `LogDestinationConfigs`.
 *
 * - Change the `LogDestination` setting in a single
 * `LogDestinationConfig` array element.
 *
 * You can't change the `LogDestinationType` or `LogType` in a
 * `LogDestinationConfig`. To change these settings, delete the existing
 * `LogDestinationConfig` object and create a new one, using two separate calls
 * to this update operation.
 */
export const updateLoggingConfiguration: API.OperationMethod<
  UpdateLoggingConfigurationRequest,
  UpdateLoggingConfigurationResponse,
  UpdateLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLoggingConfigurationRequest,
  output: UpdateLoggingConfigurationResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    InvalidTokenException,
    LogDestinationPermissionException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLoggingConfiguration",
}));

export type UpdateProxyError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates the properties of the specified proxy.
 */
export const updateProxy: API.OperationMethod<
  UpdateProxyRequest,
  UpdateProxyResponse,
  UpdateProxyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProxyRequest,
  output: UpdateProxyResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProxy",
}));

export type UpdateProxyConfigurationError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the properties of the specified proxy configuration.
 */
export const updateProxyConfiguration: API.OperationMethod<
  UpdateProxyConfigurationRequest,
  UpdateProxyConfigurationResponse,
  UpdateProxyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProxyConfigurationRequest,
  output: UpdateProxyConfigurationResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProxyConfiguration",
}));

export type UpdateProxyRuleError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the properties of the specified proxy rule.
 */
export const updateProxyRule: API.OperationMethod<
  UpdateProxyRuleRequest,
  UpdateProxyRuleResponse,
  UpdateProxyRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProxyRuleRequest,
  output: UpdateProxyRuleResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProxyRule",
}));

export type UpdateProxyRuleGroupPrioritiesError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates proxy rule group priorities within a proxy configuration.
 */
export const updateProxyRuleGroupPriorities: API.OperationMethod<
  UpdateProxyRuleGroupPrioritiesRequest,
  UpdateProxyRuleGroupPrioritiesResponse,
  UpdateProxyRuleGroupPrioritiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProxyRuleGroupPrioritiesRequest,
  output: UpdateProxyRuleGroupPrioritiesResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProxyRuleGroupPriorities",
}));

export type UpdateProxyRulePrioritiesError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates proxy rule priorities within a proxy rule group.
 */
export const updateProxyRulePriorities: API.OperationMethod<
  UpdateProxyRulePrioritiesRequest,
  UpdateProxyRulePrioritiesResponse,
  UpdateProxyRulePrioritiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProxyRulePrioritiesRequest,
  output: UpdateProxyRulePrioritiesResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProxyRulePriorities",
}));

export type UpdateProxySettingsError =
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ResourceOwnerCheckException
  | ThrottlingException
  | CommonErrors;
/**
 * Modifies the proxy listener configuration of a proxy mode firewall. Proxy mode firewalls are created with `NoSourcePreservation` set to `TRUE`. Use this operation to change the ports and protocols on which the firewall's proxy listens for traffic.
 */
export const updateProxySettings: API.OperationMethod<
  UpdateProxySettingsRequest,
  UpdateProxySettingsResponse,
  UpdateProxySettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProxySettingsRequest,
  output: UpdateProxySettingsResponse,
  errors: [
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ResourceOwnerCheckException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProxySettings",
}));

export type UpdateRuleGroupError =
  | InternalServerError
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the rule settings for the specified rule group. You use a rule group by
 * reference in one or more firewall policies. When you modify a rule group, you modify all
 * firewall policies that use the rule group.
 *
 * To update a rule group, first call DescribeRuleGroup to retrieve the
 * current RuleGroup object, update the object as needed, and then provide
 * the updated object to this call.
 */
export const updateRuleGroup: API.OperationMethod<
  UpdateRuleGroupRequest,
  UpdateRuleGroupResponse,
  UpdateRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRuleGroupRequest,
  output: UpdateRuleGroupResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRuleGroup",
}));

export type UpdateSubnetChangeProtectionError =
  | InternalServerError
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ResourceOwnerCheckException
  | ThrottlingException
  | CommonErrors;
/**
 *
 */
export const updateSubnetChangeProtection: API.OperationMethod<
  UpdateSubnetChangeProtectionRequest,
  UpdateSubnetChangeProtectionResponse,
  UpdateSubnetChangeProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSubnetChangeProtectionRequest,
  output: UpdateSubnetChangeProtectionResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ResourceOwnerCheckException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSubnetChangeProtection",
}));

export type UpdateTLSInspectionConfigurationError =
  | InternalServerError
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the TLS inspection configuration settings for the specified TLS inspection configuration. You use a TLS inspection configuration by
 * referencing it in one or more firewall policies. When you modify a TLS inspection configuration, you modify all
 * firewall policies that use the TLS inspection configuration.
 *
 * To update a TLS inspection configuration, first call DescribeTLSInspectionConfiguration to retrieve the
 * current TLSInspectionConfiguration object, update the object as needed, and then provide
 * the updated object to this call.
 */
export const updateTLSInspectionConfiguration: API.OperationMethod<
  UpdateTLSInspectionConfigurationRequest,
  UpdateTLSInspectionConfigurationResponse,
  UpdateTLSInspectionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTLSInspectionConfigurationRequest,
  output: UpdateTLSInspectionConfigurationResponse,
  errors: [
    InternalServerError,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTLSInspectionConfiguration",
}));
