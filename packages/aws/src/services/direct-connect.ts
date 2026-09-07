import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const ns = T.XmlNamespace("http://directconnect.amazonaws.com/doc/2012-10-25/");
const svc = T.AwsApiService({
  sdkId: "Direct Connect",
  serviceShapeName: "OvertureService",
});
const auth = T.AwsAuthSigv4({ name: "directconnect" });
const ver = T.ServiceVersion("2012-10-25");
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
              `https://directconnect-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://directconnect-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://directconnect.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://directconnect.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class DirectConnectClientException
  extends /*@__PURE__*/ S.TaggedError<DirectConnectClientException>()(
    "DirectConnectClientException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DirectConnectServerException
  extends /*@__PURE__*/ S.TaggedError<DirectConnectServerException>()(
    "DirectConnectServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class DuplicateTagKeysException
  extends /*@__PURE__*/ S.TaggedError<DuplicateTagKeysException>()(
    "DuplicateTagKeysException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type DirectConnectGatewayId = string;
export type DirectConnectGatewayAssociationProposalId = string;
export type OwnerAccount = string;
export type CIDR = string;
export interface RouteFilterPrefix {
  cidr?: string;
}
export const RouteFilterPrefix = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cidr: S.optional(S.String) }),
).annotate({
  identifier: "RouteFilterPrefix",
}) as any as S.Schema<RouteFilterPrefix>;
export type RouteFilterPrefixList = RouteFilterPrefix[];
export const RouteFilterPrefixList = /*@__PURE__*/ S.Array(RouteFilterPrefix);
export interface AcceptDirectConnectGatewayAssociationProposalRequest {
  directConnectGatewayId: string;
  proposalId: string;
  associatedGatewayOwnerAccount: string;
  overrideAllowedPrefixesToDirectConnectGateway?: RouteFilterPrefix[];
}
export const AcceptDirectConnectGatewayAssociationProposalRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      directConnectGatewayId: S.String,
      proposalId: S.String,
      associatedGatewayOwnerAccount: S.String,
      overrideAllowedPrefixesToDirectConnectGateway: S.optional(
        RouteFilterPrefixList,
      ),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "AcceptDirectConnectGatewayAssociationProposalRequest",
  }) as any as S.Schema<AcceptDirectConnectGatewayAssociationProposalRequest>;
export type DirectConnectGatewayAssociationState =
  | "associating"
  | "associated"
  | "disassociating"
  | "disassociated"
  | "updating"
  | (string & {});
export const DirectConnectGatewayAssociationState = S.String;

export type StateChangeError = string;
export type GatewayIdentifier = string;
export type GatewayType =
  | "virtualPrivateGateway"
  | "transitGateway"
  | (string & {});
export const GatewayType = S.String;

export type Region = string;
export interface AssociatedGateway {
  id?: string;
  type?: GatewayType;
  ownerAccount?: string;
  region?: string;
}
export const AssociatedGateway = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    type: S.optional(GatewayType),
    ownerAccount: S.optional(S.String),
    region: S.optional(S.String),
  }),
).annotate({
  identifier: "AssociatedGateway",
}) as any as S.Schema<AssociatedGateway>;
export type DirectConnectGatewayAssociationId = string;
export type CoreNetworkIdentifier = string;
export type CoreNetworkAttachmentId = string;
export interface AssociatedCoreNetwork {
  id?: string;
  ownerAccount?: string;
  attachmentId?: string;
}
export const AssociatedCoreNetwork = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    ownerAccount: S.optional(S.String),
    attachmentId: S.optional(S.String),
  }),
).annotate({
  identifier: "AssociatedCoreNetwork",
}) as any as S.Schema<AssociatedCoreNetwork>;
export type VirtualGatewayId = string;
export type VirtualGatewayRegion = string;
export interface DirectConnectGatewayAssociation {
  directConnectGatewayId?: string;
  directConnectGatewayOwnerAccount?: string;
  associationState?: DirectConnectGatewayAssociationState;
  stateChangeError?: string;
  associatedGateway?: AssociatedGateway;
  associationId?: string;
  allowedPrefixesToDirectConnectGateway?: RouteFilterPrefix[];
  associatedCoreNetwork?: AssociatedCoreNetwork;
  virtualGatewayId?: string;
  virtualGatewayRegion?: string;
  virtualGatewayOwnerAccount?: string;
}
export const DirectConnectGatewayAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    directConnectGatewayId: S.optional(S.String),
    directConnectGatewayOwnerAccount: S.optional(S.String),
    associationState: S.optional(DirectConnectGatewayAssociationState),
    stateChangeError: S.optional(S.String),
    associatedGateway: S.optional(AssociatedGateway),
    associationId: S.optional(S.String),
    allowedPrefixesToDirectConnectGateway: S.optional(RouteFilterPrefixList),
    associatedCoreNetwork: S.optional(AssociatedCoreNetwork),
    virtualGatewayId: S.optional(S.String),
    virtualGatewayRegion: S.optional(S.String),
    virtualGatewayOwnerAccount: S.optional(S.String),
  }),
).annotate({
  identifier: "DirectConnectGatewayAssociation",
}) as any as S.Schema<DirectConnectGatewayAssociation>;
export interface AcceptDirectConnectGatewayAssociationProposalResult {
  directConnectGatewayAssociation?: DirectConnectGatewayAssociation;
}
export const AcceptDirectConnectGatewayAssociationProposalResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      directConnectGatewayAssociation: S.optional(
        DirectConnectGatewayAssociation,
      ),
    }).pipe(ns),
  ).annotate({
    identifier: "AcceptDirectConnectGatewayAssociationProposalResult",
  }) as any as S.Schema<AcceptDirectConnectGatewayAssociationProposalResult>;
export type Bandwidth = string;
export type ConnectionName = string;
export type InterconnectId = string;
export type VLAN = number;
export interface AllocateConnectionOnInterconnectRequest {
  bandwidth: string;
  connectionName: string;
  ownerAccount: string;
  interconnectId: string;
  vlan: number;
}
export const AllocateConnectionOnInterconnectRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      bandwidth: S.String,
      connectionName: S.String,
      ownerAccount: S.String,
      interconnectId: S.String,
      vlan: S.Number,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AllocateConnectionOnInterconnectRequest",
}) as any as S.Schema<AllocateConnectionOnInterconnectRequest>;
export type ConnectionId = string;
export type ConnectionState =
  | "ordering"
  | "requested"
  | "pending"
  | "available"
  | "down"
  | "deleting"
  | "deleted"
  | "rejected"
  | "unknown"
  | (string & {});
export const ConnectionState = S.String;

export type LocationCode = string;
export type PartnerName = string;
export type LoaIssueTime = Date;
export type LagId = string;
export type AwsDevice = string;
export type JumboFrameCapable = boolean;
export type AwsDeviceV2 = string;
export type AwsLogicalDeviceId = string;
export type HasLogicalRedundancy = "unknown" | "yes" | "no" | (string & {});
export const HasLogicalRedundancy = S.String;

export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export type ProviderName = string;
export type MacSecCapable = boolean;
export type PortEncryptionStatus = string;
export type EncryptionMode = string;
export type SecretARN = string;
export type Ckn = string;
export type State = string;
export type StartOnDate = string;
export interface MacSecKey {
  secretARN?: string;
  ckn?: string;
  state?: string;
  startOn?: string;
}
export const MacSecKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    secretARN: S.optional(S.String),
    ckn: S.optional(S.String),
    state: S.optional(S.String),
    startOn: S.optional(S.String),
  }),
).annotate({ identifier: "MacSecKey" }) as any as S.Schema<MacSecKey>;
export type MacSecKeyList = MacSecKey[];
export const MacSecKeyList = /*@__PURE__*/ S.Array(MacSecKey);
export type Count = number;
export interface RateLimiterStatus {
  maxAllowed?: number;
  inUse?: number;
  remaining?: number;
  totalBandwidth?: string;
}
export const RateLimiterStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxAllowed: S.optional(S.Number),
    inUse: S.optional(S.Number),
    remaining: S.optional(S.Number),
    totalBandwidth: S.optional(S.String),
  }),
).annotate({
  identifier: "RateLimiterStatus",
}) as any as S.Schema<RateLimiterStatus>;
export type PartnerInterconnectMacSecCapable = boolean;
export type PrefixPoolSize = number;
export type PrefixPoolUnallocatedCount = number;
export interface Connection {
  ownerAccount?: string;
  connectionId?: string;
  connectionName?: string;
  connectionState?: ConnectionState;
  region?: string;
  location?: string;
  bandwidth?: string;
  vlan?: number;
  partnerName?: string;
  loaIssueTime?: Date;
  lagId?: string;
  awsDevice?: string;
  jumboFrameCapable?: boolean;
  awsDeviceV2?: string;
  awsLogicalDeviceId?: string;
  hasLogicalRedundancy?: HasLogicalRedundancy;
  tags?: Tag[];
  providerName?: string;
  macSecCapable?: boolean;
  portEncryptionStatus?: string;
  encryptionMode?: string;
  macSecKeys?: MacSecKey[];
  rateLimiterStatus?: RateLimiterStatus;
  partnerInterconnectMacSecCapable?: boolean;
  prefixPoolSizeIpv4?: number;
  prefixPoolSizeIpv6?: number;
  prefixPoolUnallocatedCountIpv4?: number;
  prefixPoolUnallocatedCountIpv6?: number;
}
export const Connection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ownerAccount: S.optional(S.String),
    connectionId: S.optional(S.String),
    connectionName: S.optional(S.String),
    connectionState: S.optional(ConnectionState),
    region: S.optional(S.String),
    location: S.optional(S.String),
    bandwidth: S.optional(S.String),
    vlan: S.optional(S.Number),
    partnerName: S.optional(S.String),
    loaIssueTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lagId: S.optional(S.String),
    awsDevice: S.optional(S.String),
    jumboFrameCapable: S.optional(S.Boolean),
    awsDeviceV2: S.optional(S.String),
    awsLogicalDeviceId: S.optional(S.String),
    hasLogicalRedundancy: S.optional(HasLogicalRedundancy),
    tags: S.optional(TagList),
    providerName: S.optional(S.String),
    macSecCapable: S.optional(S.Boolean),
    portEncryptionStatus: S.optional(S.String),
    encryptionMode: S.optional(S.String),
    macSecKeys: S.optional(MacSecKeyList),
    rateLimiterStatus: S.optional(RateLimiterStatus),
    partnerInterconnectMacSecCapable: S.optional(S.Boolean),
    prefixPoolSizeIpv4: S.optional(S.Number),
    prefixPoolSizeIpv6: S.optional(S.Number),
    prefixPoolUnallocatedCountIpv4: S.optional(S.Number),
    prefixPoolUnallocatedCountIpv6: S.optional(S.Number),
  }).pipe(ns),
).annotate({ identifier: "Connection" }) as any as S.Schema<Connection>;
export interface AllocateHostedConnectionRequest {
  connectionId: string;
  ownerAccount: string;
  bandwidth: string;
  connectionName: string;
  vlan: number;
  tags?: Tag[];
}
export const AllocateHostedConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectionId: S.String,
    ownerAccount: S.String,
    bandwidth: S.String,
    connectionName: S.String,
    vlan: S.Number,
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AllocateHostedConnectionRequest",
}) as any as S.Schema<AllocateHostedConnectionRequest>;
export type VirtualInterfaceName = string;
export type ASN = number;
export type LongAsn = number;
export type MTU = number;
export type BGPAuthKey = string;
export type AmazonAddress = string;
export type AddressFamily = "ipv4" | "ipv6" | (string & {});
export const AddressFamily = S.String;

export type CustomerAddress = string;
export type RateLimit = string;
export interface NewPrivateVirtualInterfaceAllocation {
  virtualInterfaceName: string;
  vlan: number;
  asn?: number;
  asnLong?: number;
  mtu?: number;
  authKey?: string;
  amazonAddress?: string;
  addressFamily?: AddressFamily;
  customerAddress?: string;
  tags?: Tag[];
  rateLimit?: string;
}
export const NewPrivateVirtualInterfaceAllocation = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      virtualInterfaceName: S.String,
      vlan: S.Number,
      asn: S.optional(S.Number),
      asnLong: S.optional(S.Number),
      mtu: S.optional(S.Number),
      authKey: S.optional(S.String),
      amazonAddress: S.optional(S.String),
      addressFamily: S.optional(AddressFamily),
      customerAddress: S.optional(S.String),
      tags: S.optional(TagList),
      rateLimit: S.optional(S.String),
    }),
).annotate({
  identifier: "NewPrivateVirtualInterfaceAllocation",
}) as any as S.Schema<NewPrivateVirtualInterfaceAllocation>;
export interface AllocatePrivateVirtualInterfaceRequest {
  connectionId: string;
  ownerAccount: string;
  newPrivateVirtualInterfaceAllocation: NewPrivateVirtualInterfaceAllocation;
}
export const AllocatePrivateVirtualInterfaceRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      connectionId: S.String,
      ownerAccount: S.String,
      newPrivateVirtualInterfaceAllocation:
        NewPrivateVirtualInterfaceAllocation,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AllocatePrivateVirtualInterfaceRequest",
}) as any as S.Schema<AllocatePrivateVirtualInterfaceRequest>;
export type VirtualInterfaceId = string;
export type VirtualInterfaceType = string;
export type VirtualInterfaceState =
  | "confirming"
  | "verifying"
  | "pending"
  | "available"
  | "down"
  | "testing"
  | "deleting"
  | "deleted"
  | "rejected"
  | "unknown"
  | (string & {});
export const VirtualInterfaceState = S.String;

export type RouterConfig = string;
export type BGPPeerId = string;
export type BGPPeerState =
  | "verifying"
  | "pending"
  | "available"
  | "deleting"
  | "deleted"
  | (string & {});
export const BGPPeerState = S.String;

export type BGPStatus = "up" | "down" | "unknown" | (string & {});
export const BGPStatus = S.String;

export interface BGPPeer {
  bgpPeerId?: string;
  asn?: number;
  asnLong?: number;
  authKey?: string;
  addressFamily?: AddressFamily;
  amazonAddress?: string;
  customerAddress?: string;
  bgpPeerState?: BGPPeerState;
  bgpStatus?: BGPStatus;
  awsDeviceV2?: string;
  awsLogicalDeviceId?: string;
}
export const BGPPeer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bgpPeerId: S.optional(S.String),
    asn: S.optional(S.Number),
    asnLong: S.optional(S.Number),
    authKey: S.optional(S.String),
    addressFamily: S.optional(AddressFamily),
    amazonAddress: S.optional(S.String),
    customerAddress: S.optional(S.String),
    bgpPeerState: S.optional(BGPPeerState),
    bgpStatus: S.optional(BGPStatus),
    awsDeviceV2: S.optional(S.String),
    awsLogicalDeviceId: S.optional(S.String),
  }),
).annotate({ identifier: "BGPPeer" }) as any as S.Schema<BGPPeer>;
export type BGPPeerList = BGPPeer[];
export const BGPPeerList = /*@__PURE__*/ S.Array(BGPPeer);
export type SiteLinkEnabled = boolean;
export type PrefixPoolAllocatedCount = number;
export interface VirtualInterface {
  ownerAccount?: string;
  virtualInterfaceId?: string;
  location?: string;
  connectionId?: string;
  virtualInterfaceType?: string;
  virtualInterfaceName?: string;
  vlan?: number;
  asn?: number;
  asnLong?: number;
  amazonSideAsn?: number;
  authKey?: string;
  amazonAddress?: string;
  customerAddress?: string;
  addressFamily?: AddressFamily;
  virtualInterfaceState?: VirtualInterfaceState;
  customerRouterConfig?: string;
  mtu?: number;
  jumboFrameCapable?: boolean;
  virtualGatewayId?: string;
  directConnectGatewayId?: string;
  routeFilterPrefixes?: RouteFilterPrefix[];
  bgpPeers?: BGPPeer[];
  region?: string;
  awsDeviceV2?: string;
  awsLogicalDeviceId?: string;
  tags?: Tag[];
  siteLinkEnabled?: boolean;
  prefixPoolAllocatedCountIpv4?: number;
  prefixPoolAllocatedCountIpv6?: number;
  rateLimit?: string;
}
export const VirtualInterface = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ownerAccount: S.optional(S.String),
    virtualInterfaceId: S.optional(S.String),
    location: S.optional(S.String),
    connectionId: S.optional(S.String),
    virtualInterfaceType: S.optional(S.String),
    virtualInterfaceName: S.optional(S.String),
    vlan: S.optional(S.Number),
    asn: S.optional(S.Number),
    asnLong: S.optional(S.Number),
    amazonSideAsn: S.optional(S.Number),
    authKey: S.optional(S.String),
    amazonAddress: S.optional(S.String),
    customerAddress: S.optional(S.String),
    addressFamily: S.optional(AddressFamily),
    virtualInterfaceState: S.optional(VirtualInterfaceState),
    customerRouterConfig: S.optional(S.String),
    mtu: S.optional(S.Number),
    jumboFrameCapable: S.optional(S.Boolean),
    virtualGatewayId: S.optional(S.String),
    directConnectGatewayId: S.optional(S.String),
    routeFilterPrefixes: S.optional(RouteFilterPrefixList),
    bgpPeers: S.optional(BGPPeerList),
    region: S.optional(S.String),
    awsDeviceV2: S.optional(S.String),
    awsLogicalDeviceId: S.optional(S.String),
    tags: S.optional(TagList),
    siteLinkEnabled: S.optional(S.Boolean),
    prefixPoolAllocatedCountIpv4: S.optional(S.Number),
    prefixPoolAllocatedCountIpv6: S.optional(S.Number),
    rateLimit: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "VirtualInterface",
}) as any as S.Schema<VirtualInterface>;
export interface NewPublicVirtualInterfaceAllocation {
  virtualInterfaceName: string;
  vlan: number;
  asn?: number;
  asnLong?: number;
  authKey?: string;
  amazonAddress?: string;
  customerAddress?: string;
  addressFamily?: AddressFamily;
  routeFilterPrefixes?: RouteFilterPrefix[];
  tags?: Tag[];
  rateLimit?: string;
}
export const NewPublicVirtualInterfaceAllocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualInterfaceName: S.String,
    vlan: S.Number,
    asn: S.optional(S.Number),
    asnLong: S.optional(S.Number),
    authKey: S.optional(S.String),
    amazonAddress: S.optional(S.String),
    customerAddress: S.optional(S.String),
    addressFamily: S.optional(AddressFamily),
    routeFilterPrefixes: S.optional(RouteFilterPrefixList),
    tags: S.optional(TagList),
    rateLimit: S.optional(S.String),
  }),
).annotate({
  identifier: "NewPublicVirtualInterfaceAllocation",
}) as any as S.Schema<NewPublicVirtualInterfaceAllocation>;
export interface AllocatePublicVirtualInterfaceRequest {
  connectionId: string;
  ownerAccount: string;
  newPublicVirtualInterfaceAllocation: NewPublicVirtualInterfaceAllocation;
}
export const AllocatePublicVirtualInterfaceRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      connectionId: S.String,
      ownerAccount: S.String,
      newPublicVirtualInterfaceAllocation: NewPublicVirtualInterfaceAllocation,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AllocatePublicVirtualInterfaceRequest",
}) as any as S.Schema<AllocatePublicVirtualInterfaceRequest>;
export interface NewTransitVirtualInterfaceAllocation {
  virtualInterfaceName?: string;
  vlan?: number;
  asn?: number;
  asnLong?: number;
  mtu?: number;
  authKey?: string;
  amazonAddress?: string;
  customerAddress?: string;
  addressFamily?: AddressFamily;
  tags?: Tag[];
  rateLimit?: string;
}
export const NewTransitVirtualInterfaceAllocation = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      virtualInterfaceName: S.optional(S.String),
      vlan: S.optional(S.Number),
      asn: S.optional(S.Number),
      asnLong: S.optional(S.Number),
      mtu: S.optional(S.Number),
      authKey: S.optional(S.String),
      amazonAddress: S.optional(S.String),
      customerAddress: S.optional(S.String),
      addressFamily: S.optional(AddressFamily),
      tags: S.optional(TagList),
      rateLimit: S.optional(S.String),
    }),
).annotate({
  identifier: "NewTransitVirtualInterfaceAllocation",
}) as any as S.Schema<NewTransitVirtualInterfaceAllocation>;
export interface AllocateTransitVirtualInterfaceRequest {
  connectionId: string;
  ownerAccount: string;
  newTransitVirtualInterfaceAllocation: NewTransitVirtualInterfaceAllocation;
}
export const AllocateTransitVirtualInterfaceRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      connectionId: S.String,
      ownerAccount: S.String,
      newTransitVirtualInterfaceAllocation:
        NewTransitVirtualInterfaceAllocation,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AllocateTransitVirtualInterfaceRequest",
}) as any as S.Schema<AllocateTransitVirtualInterfaceRequest>;
export interface AllocateTransitVirtualInterfaceResult {
  virtualInterface?: VirtualInterface;
}
export const AllocateTransitVirtualInterfaceResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ virtualInterface: S.optional(VirtualInterface) }).pipe(ns),
).annotate({
  identifier: "AllocateTransitVirtualInterfaceResult",
}) as any as S.Schema<AllocateTransitVirtualInterfaceResult>;
export interface AssociateConnectionWithLagRequest {
  connectionId: string;
  lagId: string;
}
export const AssociateConnectionWithLagRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ connectionId: S.String, lagId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateConnectionWithLagRequest",
}) as any as S.Schema<AssociateConnectionWithLagRequest>;
export interface AssociateHostedConnectionRequest {
  connectionId: string;
  parentConnectionId: string;
}
export const AssociateHostedConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ connectionId: S.String, parentConnectionId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateHostedConnectionRequest",
}) as any as S.Schema<AssociateHostedConnectionRequest>;
export type Cak = string;
export interface AssociateMacSecKeyRequest {
  connectionId: string;
  secretARN?: string;
  ckn?: string;
  cak?: string;
}
export const AssociateMacSecKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectionId: S.String,
    secretARN: S.optional(S.String),
    ckn: S.optional(S.String),
    cak: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateMacSecKeyRequest",
}) as any as S.Schema<AssociateMacSecKeyRequest>;
export interface AssociateMacSecKeyResponse {
  connectionId?: string;
  macSecKeys?: MacSecKey[];
}
export const AssociateMacSecKeyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectionId: S.optional(S.String),
    macSecKeys: S.optional(MacSecKeyList),
  }).pipe(ns),
).annotate({
  identifier: "AssociateMacSecKeyResponse",
}) as any as S.Schema<AssociateMacSecKeyResponse>;
export interface AssociateVirtualInterfaceRequest {
  virtualInterfaceId: string;
  connectionId: string;
}
export const AssociateVirtualInterfaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ virtualInterfaceId: S.String, connectionId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateVirtualInterfaceRequest",
}) as any as S.Schema<AssociateVirtualInterfaceRequest>;
export interface ConfirmConnectionRequest {
  connectionId: string;
}
export const ConfirmConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ connectionId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ConfirmConnectionRequest",
}) as any as S.Schema<ConfirmConnectionRequest>;
export interface ConfirmConnectionResponse {
  connectionState?: ConnectionState;
}
export const ConfirmConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ connectionState: S.optional(ConnectionState) }).pipe(ns),
).annotate({
  identifier: "ConfirmConnectionResponse",
}) as any as S.Schema<ConfirmConnectionResponse>;
export type AgreementName = string;
export interface ConfirmCustomerAgreementRequest {
  agreementName?: string;
}
export const ConfirmCustomerAgreementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agreementName: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ConfirmCustomerAgreementRequest",
}) as any as S.Schema<ConfirmCustomerAgreementRequest>;
export type Status = string;
export interface ConfirmCustomerAgreementResponse {
  status?: string;
}
export const ConfirmCustomerAgreementResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "ConfirmCustomerAgreementResponse",
}) as any as S.Schema<ConfirmCustomerAgreementResponse>;
export interface ConfirmPrivateVirtualInterfaceRequest {
  virtualInterfaceId: string;
  virtualGatewayId?: string;
  directConnectGatewayId?: string;
}
export const ConfirmPrivateVirtualInterfaceRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      virtualInterfaceId: S.String,
      virtualGatewayId: S.optional(S.String),
      directConnectGatewayId: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ConfirmPrivateVirtualInterfaceRequest",
}) as any as S.Schema<ConfirmPrivateVirtualInterfaceRequest>;
export interface ConfirmPrivateVirtualInterfaceResponse {
  virtualInterfaceState?: VirtualInterfaceState;
}
export const ConfirmPrivateVirtualInterfaceResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ virtualInterfaceState: S.optional(VirtualInterfaceState) }).pipe(
      ns,
    ),
).annotate({
  identifier: "ConfirmPrivateVirtualInterfaceResponse",
}) as any as S.Schema<ConfirmPrivateVirtualInterfaceResponse>;
export interface ConfirmPublicVirtualInterfaceRequest {
  virtualInterfaceId: string;
}
export const ConfirmPublicVirtualInterfaceRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ virtualInterfaceId: S.String }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ConfirmPublicVirtualInterfaceRequest",
}) as any as S.Schema<ConfirmPublicVirtualInterfaceRequest>;
export interface ConfirmPublicVirtualInterfaceResponse {
  virtualInterfaceState?: VirtualInterfaceState;
}
export const ConfirmPublicVirtualInterfaceResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ virtualInterfaceState: S.optional(VirtualInterfaceState) }).pipe(
      ns,
    ),
).annotate({
  identifier: "ConfirmPublicVirtualInterfaceResponse",
}) as any as S.Schema<ConfirmPublicVirtualInterfaceResponse>;
export interface ConfirmTransitVirtualInterfaceRequest {
  virtualInterfaceId: string;
  directConnectGatewayId: string;
}
export const ConfirmTransitVirtualInterfaceRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      virtualInterfaceId: S.String,
      directConnectGatewayId: S.String,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ConfirmTransitVirtualInterfaceRequest",
}) as any as S.Schema<ConfirmTransitVirtualInterfaceRequest>;
export interface ConfirmTransitVirtualInterfaceResponse {
  virtualInterfaceState?: VirtualInterfaceState;
}
export const ConfirmTransitVirtualInterfaceResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ virtualInterfaceState: S.optional(VirtualInterfaceState) }).pipe(
      ns,
    ),
).annotate({
  identifier: "ConfirmTransitVirtualInterfaceResponse",
}) as any as S.Schema<ConfirmTransitVirtualInterfaceResponse>;
export interface NewBGPPeer {
  asn?: number;
  asnLong?: number;
  authKey?: string;
  addressFamily?: AddressFamily;
  amazonAddress?: string;
  customerAddress?: string;
}
export const NewBGPPeer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    asn: S.optional(S.Number),
    asnLong: S.optional(S.Number),
    authKey: S.optional(S.String),
    addressFamily: S.optional(AddressFamily),
    amazonAddress: S.optional(S.String),
    customerAddress: S.optional(S.String),
  }),
).annotate({ identifier: "NewBGPPeer" }) as any as S.Schema<NewBGPPeer>;
export interface CreateBGPPeerRequest {
  virtualInterfaceId?: string;
  newBGPPeer?: NewBGPPeer;
}
export const CreateBGPPeerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualInterfaceId: S.optional(S.String),
    newBGPPeer: S.optional(NewBGPPeer),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateBGPPeerRequest",
}) as any as S.Schema<CreateBGPPeerRequest>;
export interface CreateBGPPeerResponse {
  virtualInterface?: VirtualInterface;
}
export const CreateBGPPeerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ virtualInterface: S.optional(VirtualInterface) }).pipe(ns),
).annotate({
  identifier: "CreateBGPPeerResponse",
}) as any as S.Schema<CreateBGPPeerResponse>;
export type RequestMACSec = boolean;
export interface CreateConnectionRequest {
  location: string;
  bandwidth: string;
  connectionName: string;
  lagId?: string;
  tags?: Tag[];
  providerName?: string;
  requestMACSec?: boolean;
}
export const CreateConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    location: S.String,
    bandwidth: S.String,
    connectionName: S.String,
    lagId: S.optional(S.String),
    tags: S.optional(TagList),
    providerName: S.optional(S.String),
    requestMACSec: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateConnectionRequest",
}) as any as S.Schema<CreateConnectionRequest>;
export type DirectConnectGatewayName = string;
export interface CreateDirectConnectGatewayRequest {
  directConnectGatewayName: string;
  tags?: Tag[];
  amazonSideAsn?: number;
}
export const CreateDirectConnectGatewayRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    directConnectGatewayName: S.String,
    tags: S.optional(TagList),
    amazonSideAsn: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDirectConnectGatewayRequest",
}) as any as S.Schema<CreateDirectConnectGatewayRequest>;
export type DirectConnectGatewayState =
  | "pending"
  | "available"
  | "deleting"
  | "deleted"
  | (string & {});
export const DirectConnectGatewayState = S.String;

export interface DirectConnectGateway {
  directConnectGatewayId?: string;
  directConnectGatewayName?: string;
  amazonSideAsn?: number;
  ownerAccount?: string;
  directConnectGatewayState?: DirectConnectGatewayState;
  stateChangeError?: string;
  totalPrefixPoolAllocations?: number;
  tags?: Tag[];
}
export const DirectConnectGateway = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    directConnectGatewayId: S.optional(S.String),
    directConnectGatewayName: S.optional(S.String),
    amazonSideAsn: S.optional(S.Number),
    ownerAccount: S.optional(S.String),
    directConnectGatewayState: S.optional(DirectConnectGatewayState),
    stateChangeError: S.optional(S.String),
    totalPrefixPoolAllocations: S.optional(S.Number),
    tags: S.optional(TagList),
  }),
).annotate({
  identifier: "DirectConnectGateway",
}) as any as S.Schema<DirectConnectGateway>;
export interface CreateDirectConnectGatewayResult {
  directConnectGateway?: DirectConnectGateway;
}
export const CreateDirectConnectGatewayResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ directConnectGateway: S.optional(DirectConnectGateway) }).pipe(ns),
).annotate({
  identifier: "CreateDirectConnectGatewayResult",
}) as any as S.Schema<CreateDirectConnectGatewayResult>;
export type GatewayIdToAssociate = string;
export interface CreateDirectConnectGatewayAssociationRequest {
  directConnectGatewayId: string;
  gatewayId?: string;
  addAllowedPrefixesToDirectConnectGateway?: RouteFilterPrefix[];
  virtualGatewayId?: string;
}
export const CreateDirectConnectGatewayAssociationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      directConnectGatewayId: S.String,
      gatewayId: S.optional(S.String),
      addAllowedPrefixesToDirectConnectGateway: S.optional(
        RouteFilterPrefixList,
      ),
      virtualGatewayId: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateDirectConnectGatewayAssociationRequest",
  }) as any as S.Schema<CreateDirectConnectGatewayAssociationRequest>;
export interface CreateDirectConnectGatewayAssociationResult {
  directConnectGatewayAssociation?: DirectConnectGatewayAssociation;
}
export const CreateDirectConnectGatewayAssociationResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      directConnectGatewayAssociation: S.optional(
        DirectConnectGatewayAssociation,
      ),
    }).pipe(ns),
  ).annotate({
    identifier: "CreateDirectConnectGatewayAssociationResult",
  }) as any as S.Schema<CreateDirectConnectGatewayAssociationResult>;
export interface CreateDirectConnectGatewayAssociationProposalRequest {
  directConnectGatewayId: string;
  directConnectGatewayOwnerAccount: string;
  gatewayId: string;
  addAllowedPrefixesToDirectConnectGateway?: RouteFilterPrefix[];
  removeAllowedPrefixesToDirectConnectGateway?: RouteFilterPrefix[];
}
export const CreateDirectConnectGatewayAssociationProposalRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      directConnectGatewayId: S.String,
      directConnectGatewayOwnerAccount: S.String,
      gatewayId: S.String,
      addAllowedPrefixesToDirectConnectGateway: S.optional(
        RouteFilterPrefixList,
      ),
      removeAllowedPrefixesToDirectConnectGateway: S.optional(
        RouteFilterPrefixList,
      ),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateDirectConnectGatewayAssociationProposalRequest",
  }) as any as S.Schema<CreateDirectConnectGatewayAssociationProposalRequest>;
export type DirectConnectGatewayAssociationProposalState =
  | "requested"
  | "accepted"
  | "deleted"
  | (string & {});
export const DirectConnectGatewayAssociationProposalState = S.String;

export interface DirectConnectGatewayAssociationProposal {
  proposalId?: string;
  directConnectGatewayId?: string;
  directConnectGatewayOwnerAccount?: string;
  proposalState?: DirectConnectGatewayAssociationProposalState;
  associatedGateway?: AssociatedGateway;
  existingAllowedPrefixesToDirectConnectGateway?: RouteFilterPrefix[];
  requestedAllowedPrefixesToDirectConnectGateway?: RouteFilterPrefix[];
}
export const DirectConnectGatewayAssociationProposal = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      proposalId: S.optional(S.String),
      directConnectGatewayId: S.optional(S.String),
      directConnectGatewayOwnerAccount: S.optional(S.String),
      proposalState: S.optional(DirectConnectGatewayAssociationProposalState),
      associatedGateway: S.optional(AssociatedGateway),
      existingAllowedPrefixesToDirectConnectGateway: S.optional(
        RouteFilterPrefixList,
      ),
      requestedAllowedPrefixesToDirectConnectGateway: S.optional(
        RouteFilterPrefixList,
      ),
    }),
).annotate({
  identifier: "DirectConnectGatewayAssociationProposal",
}) as any as S.Schema<DirectConnectGatewayAssociationProposal>;
export interface CreateDirectConnectGatewayAssociationProposalResult {
  directConnectGatewayAssociationProposal?: DirectConnectGatewayAssociationProposal;
}
export const CreateDirectConnectGatewayAssociationProposalResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      directConnectGatewayAssociationProposal: S.optional(
        DirectConnectGatewayAssociationProposal,
      ),
    }).pipe(ns),
  ).annotate({
    identifier: "CreateDirectConnectGatewayAssociationProposalResult",
  }) as any as S.Schema<CreateDirectConnectGatewayAssociationProposalResult>;
export type InterconnectName = string;
export interface CreateInterconnectRequest {
  interconnectName: string;
  bandwidth: string;
  location: string;
  lagId?: string;
  tags?: Tag[];
  providerName?: string;
  requestMACSec?: boolean;
}
export const CreateInterconnectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    interconnectName: S.String,
    bandwidth: S.String,
    location: S.String,
    lagId: S.optional(S.String),
    tags: S.optional(TagList),
    providerName: S.optional(S.String),
    requestMACSec: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateInterconnectRequest",
}) as any as S.Schema<CreateInterconnectRequest>;
export type InterconnectState =
  | "requested"
  | "pending"
  | "available"
  | "down"
  | "deleting"
  | "deleted"
  | "unknown"
  | (string & {});
export const InterconnectState = S.String;

export interface Interconnect {
  interconnectId?: string;
  interconnectName?: string;
  interconnectState?: InterconnectState;
  region?: string;
  location?: string;
  bandwidth?: string;
  loaIssueTime?: Date;
  lagId?: string;
  awsDevice?: string;
  jumboFrameCapable?: boolean;
  awsDeviceV2?: string;
  awsLogicalDeviceId?: string;
  hasLogicalRedundancy?: HasLogicalRedundancy;
  tags?: Tag[];
  providerName?: string;
  macSecCapable?: boolean;
  portEncryptionStatus?: string;
  encryptionMode?: string;
  macSecKeys?: MacSecKey[];
}
export const Interconnect = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    interconnectId: S.optional(S.String),
    interconnectName: S.optional(S.String),
    interconnectState: S.optional(InterconnectState),
    region: S.optional(S.String),
    location: S.optional(S.String),
    bandwidth: S.optional(S.String),
    loaIssueTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lagId: S.optional(S.String),
    awsDevice: S.optional(S.String),
    jumboFrameCapable: S.optional(S.Boolean),
    awsDeviceV2: S.optional(S.String),
    awsLogicalDeviceId: S.optional(S.String),
    hasLogicalRedundancy: S.optional(HasLogicalRedundancy),
    tags: S.optional(TagList),
    providerName: S.optional(S.String),
    macSecCapable: S.optional(S.Boolean),
    portEncryptionStatus: S.optional(S.String),
    encryptionMode: S.optional(S.String),
    macSecKeys: S.optional(MacSecKeyList),
  }).pipe(ns),
).annotate({ identifier: "Interconnect" }) as any as S.Schema<Interconnect>;
export type LagName = string;
export interface CreateLagRequest {
  numberOfConnections: number;
  location: string;
  connectionsBandwidth: string;
  lagName: string;
  connectionId?: string;
  tags?: Tag[];
  childConnectionTags?: Tag[];
  providerName?: string;
  requestMACSec?: boolean;
}
export const CreateLagRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    numberOfConnections: S.Number,
    location: S.String,
    connectionsBandwidth: S.String,
    lagName: S.String,
    connectionId: S.optional(S.String),
    tags: S.optional(TagList),
    childConnectionTags: S.optional(TagList),
    providerName: S.optional(S.String),
    requestMACSec: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateLagRequest",
}) as any as S.Schema<CreateLagRequest>;
export type LagState =
  | "requested"
  | "pending"
  | "available"
  | "down"
  | "deleting"
  | "deleted"
  | "unknown"
  | (string & {});
export const LagState = S.String;

export type ConnectionList = Connection[];
export const ConnectionList = /*@__PURE__*/ S.Array(Connection);
export type BooleanFlag = boolean;
export interface Lag {
  connectionsBandwidth?: string;
  numberOfConnections?: number;
  lagId?: string;
  ownerAccount?: string;
  lagName?: string;
  lagState?: LagState;
  location?: string;
  region?: string;
  minimumLinks?: number;
  awsDevice?: string;
  awsDeviceV2?: string;
  awsLogicalDeviceId?: string;
  connections?: Connection[];
  allowsHostedConnections?: boolean;
  jumboFrameCapable?: boolean;
  hasLogicalRedundancy?: HasLogicalRedundancy;
  tags?: Tag[];
  providerName?: string;
  macSecCapable?: boolean;
  encryptionMode?: string;
  macSecKeys?: MacSecKey[];
  prefixPoolSizeIpv4?: number;
  prefixPoolSizeIpv6?: number;
  prefixPoolUnallocatedCountIpv4?: number;
  prefixPoolUnallocatedCountIpv6?: number;
  rateLimiterStatus?: RateLimiterStatus;
}
export const Lag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectionsBandwidth: S.optional(S.String),
    numberOfConnections: S.optional(S.Number),
    lagId: S.optional(S.String),
    ownerAccount: S.optional(S.String),
    lagName: S.optional(S.String),
    lagState: S.optional(LagState),
    location: S.optional(S.String),
    region: S.optional(S.String),
    minimumLinks: S.optional(S.Number),
    awsDevice: S.optional(S.String),
    awsDeviceV2: S.optional(S.String),
    awsLogicalDeviceId: S.optional(S.String),
    connections: S.optional(ConnectionList),
    allowsHostedConnections: S.optional(S.Boolean),
    jumboFrameCapable: S.optional(S.Boolean),
    hasLogicalRedundancy: S.optional(HasLogicalRedundancy),
    tags: S.optional(TagList),
    providerName: S.optional(S.String),
    macSecCapable: S.optional(S.Boolean),
    encryptionMode: S.optional(S.String),
    macSecKeys: S.optional(MacSecKeyList),
    prefixPoolSizeIpv4: S.optional(S.Number),
    prefixPoolSizeIpv6: S.optional(S.Number),
    prefixPoolUnallocatedCountIpv4: S.optional(S.Number),
    prefixPoolUnallocatedCountIpv6: S.optional(S.Number),
    rateLimiterStatus: S.optional(RateLimiterStatus),
  }).pipe(ns),
).annotate({ identifier: "Lag" }) as any as S.Schema<Lag>;
export type EnableSiteLink = boolean;
export interface NewPrivateVirtualInterface {
  virtualInterfaceName: string;
  vlan: number;
  asn?: number;
  asnLong?: number;
  mtu?: number;
  authKey?: string;
  amazonAddress?: string;
  customerAddress?: string;
  addressFamily?: AddressFamily;
  virtualGatewayId?: string;
  directConnectGatewayId?: string;
  tags?: Tag[];
  enableSiteLink?: boolean;
  prefixPoolAllocatedCountIpv4?: number;
  prefixPoolAllocatedCountIpv6?: number;
  rateLimit?: string;
}
export const NewPrivateVirtualInterface = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualInterfaceName: S.String,
    vlan: S.Number,
    asn: S.optional(S.Number),
    asnLong: S.optional(S.Number),
    mtu: S.optional(S.Number),
    authKey: S.optional(S.String),
    amazonAddress: S.optional(S.String),
    customerAddress: S.optional(S.String),
    addressFamily: S.optional(AddressFamily),
    virtualGatewayId: S.optional(S.String),
    directConnectGatewayId: S.optional(S.String),
    tags: S.optional(TagList),
    enableSiteLink: S.optional(S.Boolean),
    prefixPoolAllocatedCountIpv4: S.optional(S.Number),
    prefixPoolAllocatedCountIpv6: S.optional(S.Number),
    rateLimit: S.optional(S.String),
  }),
).annotate({
  identifier: "NewPrivateVirtualInterface",
}) as any as S.Schema<NewPrivateVirtualInterface>;
export interface CreatePrivateVirtualInterfaceRequest {
  connectionId: string;
  newPrivateVirtualInterface: NewPrivateVirtualInterface;
}
export const CreatePrivateVirtualInterfaceRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      connectionId: S.String,
      newPrivateVirtualInterface: NewPrivateVirtualInterface,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreatePrivateVirtualInterfaceRequest",
}) as any as S.Schema<CreatePrivateVirtualInterfaceRequest>;
export interface NewPublicVirtualInterface {
  virtualInterfaceName: string;
  vlan: number;
  asn?: number;
  asnLong?: number;
  authKey?: string;
  amazonAddress?: string;
  customerAddress?: string;
  addressFamily?: AddressFamily;
  routeFilterPrefixes?: RouteFilterPrefix[];
  tags?: Tag[];
  rateLimit?: string;
}
export const NewPublicVirtualInterface = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualInterfaceName: S.String,
    vlan: S.Number,
    asn: S.optional(S.Number),
    asnLong: S.optional(S.Number),
    authKey: S.optional(S.String),
    amazonAddress: S.optional(S.String),
    customerAddress: S.optional(S.String),
    addressFamily: S.optional(AddressFamily),
    routeFilterPrefixes: S.optional(RouteFilterPrefixList),
    tags: S.optional(TagList),
    rateLimit: S.optional(S.String),
  }),
).annotate({
  identifier: "NewPublicVirtualInterface",
}) as any as S.Schema<NewPublicVirtualInterface>;
export interface CreatePublicVirtualInterfaceRequest {
  connectionId: string;
  newPublicVirtualInterface: NewPublicVirtualInterface;
}
export const CreatePublicVirtualInterfaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectionId: S.String,
    newPublicVirtualInterface: NewPublicVirtualInterface,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePublicVirtualInterfaceRequest",
}) as any as S.Schema<CreatePublicVirtualInterfaceRequest>;
export interface NewTransitVirtualInterface {
  virtualInterfaceName?: string;
  vlan?: number;
  asn?: number;
  asnLong?: number;
  mtu?: number;
  authKey?: string;
  amazonAddress?: string;
  customerAddress?: string;
  addressFamily?: AddressFamily;
  directConnectGatewayId?: string;
  tags?: Tag[];
  enableSiteLink?: boolean;
  prefixPoolAllocatedCountIpv4?: number;
  prefixPoolAllocatedCountIpv6?: number;
  rateLimit?: string;
}
export const NewTransitVirtualInterface = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualInterfaceName: S.optional(S.String),
    vlan: S.optional(S.Number),
    asn: S.optional(S.Number),
    asnLong: S.optional(S.Number),
    mtu: S.optional(S.Number),
    authKey: S.optional(S.String),
    amazonAddress: S.optional(S.String),
    customerAddress: S.optional(S.String),
    addressFamily: S.optional(AddressFamily),
    directConnectGatewayId: S.optional(S.String),
    tags: S.optional(TagList),
    enableSiteLink: S.optional(S.Boolean),
    prefixPoolAllocatedCountIpv4: S.optional(S.Number),
    prefixPoolAllocatedCountIpv6: S.optional(S.Number),
    rateLimit: S.optional(S.String),
  }),
).annotate({
  identifier: "NewTransitVirtualInterface",
}) as any as S.Schema<NewTransitVirtualInterface>;
export interface CreateTransitVirtualInterfaceRequest {
  connectionId: string;
  newTransitVirtualInterface: NewTransitVirtualInterface;
}
export const CreateTransitVirtualInterfaceRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      connectionId: S.String,
      newTransitVirtualInterface: NewTransitVirtualInterface,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateTransitVirtualInterfaceRequest",
}) as any as S.Schema<CreateTransitVirtualInterfaceRequest>;
export interface CreateTransitVirtualInterfaceResult {
  virtualInterface?: VirtualInterface;
}
export const CreateTransitVirtualInterfaceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ virtualInterface: S.optional(VirtualInterface) }).pipe(ns),
).annotate({
  identifier: "CreateTransitVirtualInterfaceResult",
}) as any as S.Schema<CreateTransitVirtualInterfaceResult>;
export interface DeleteBGPPeerRequest {
  virtualInterfaceId?: string;
  asn?: number;
  asnLong?: number;
  customerAddress?: string;
  bgpPeerId?: string;
}
export const DeleteBGPPeerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualInterfaceId: S.optional(S.String),
    asn: S.optional(S.Number),
    asnLong: S.optional(S.Number),
    customerAddress: S.optional(S.String),
    bgpPeerId: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBGPPeerRequest",
}) as any as S.Schema<DeleteBGPPeerRequest>;
export interface DeleteBGPPeerResponse {
  virtualInterface?: VirtualInterface;
}
export const DeleteBGPPeerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ virtualInterface: S.optional(VirtualInterface) }).pipe(ns),
).annotate({
  identifier: "DeleteBGPPeerResponse",
}) as any as S.Schema<DeleteBGPPeerResponse>;
export interface DeleteConnectionRequest {
  connectionId: string;
}
export const DeleteConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ connectionId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConnectionRequest",
}) as any as S.Schema<DeleteConnectionRequest>;
export interface DeleteDirectConnectGatewayRequest {
  directConnectGatewayId: string;
}
export const DeleteDirectConnectGatewayRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ directConnectGatewayId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDirectConnectGatewayRequest",
}) as any as S.Schema<DeleteDirectConnectGatewayRequest>;
export interface DeleteDirectConnectGatewayResult {
  directConnectGateway?: DirectConnectGateway;
}
export const DeleteDirectConnectGatewayResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ directConnectGateway: S.optional(DirectConnectGateway) }).pipe(ns),
).annotate({
  identifier: "DeleteDirectConnectGatewayResult",
}) as any as S.Schema<DeleteDirectConnectGatewayResult>;
export interface DeleteDirectConnectGatewayAssociationRequest {
  associationId?: string;
  directConnectGatewayId?: string;
  virtualGatewayId?: string;
}
export const DeleteDirectConnectGatewayAssociationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      associationId: S.optional(S.String),
      directConnectGatewayId: S.optional(S.String),
      virtualGatewayId: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteDirectConnectGatewayAssociationRequest",
  }) as any as S.Schema<DeleteDirectConnectGatewayAssociationRequest>;
export interface DeleteDirectConnectGatewayAssociationResult {
  directConnectGatewayAssociation?: DirectConnectGatewayAssociation;
}
export const DeleteDirectConnectGatewayAssociationResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      directConnectGatewayAssociation: S.optional(
        DirectConnectGatewayAssociation,
      ),
    }).pipe(ns),
  ).annotate({
    identifier: "DeleteDirectConnectGatewayAssociationResult",
  }) as any as S.Schema<DeleteDirectConnectGatewayAssociationResult>;
export interface DeleteDirectConnectGatewayAssociationProposalRequest {
  proposalId: string;
}
export const DeleteDirectConnectGatewayAssociationProposalRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ proposalId: S.String }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteDirectConnectGatewayAssociationProposalRequest",
  }) as any as S.Schema<DeleteDirectConnectGatewayAssociationProposalRequest>;
export interface DeleteDirectConnectGatewayAssociationProposalResult {
  directConnectGatewayAssociationProposal?: DirectConnectGatewayAssociationProposal;
}
export const DeleteDirectConnectGatewayAssociationProposalResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      directConnectGatewayAssociationProposal: S.optional(
        DirectConnectGatewayAssociationProposal,
      ),
    }).pipe(ns),
  ).annotate({
    identifier: "DeleteDirectConnectGatewayAssociationProposalResult",
  }) as any as S.Schema<DeleteDirectConnectGatewayAssociationProposalResult>;
export interface DeleteInterconnectRequest {
  interconnectId: string;
}
export const DeleteInterconnectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ interconnectId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteInterconnectRequest",
}) as any as S.Schema<DeleteInterconnectRequest>;
export interface DeleteInterconnectResponse {
  interconnectState?: InterconnectState;
}
export const DeleteInterconnectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ interconnectState: S.optional(InterconnectState) }).pipe(ns),
).annotate({
  identifier: "DeleteInterconnectResponse",
}) as any as S.Schema<DeleteInterconnectResponse>;
export interface DeleteLagRequest {
  lagId: string;
}
export const DeleteLagRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ lagId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLagRequest",
}) as any as S.Schema<DeleteLagRequest>;
export interface DeleteVirtualInterfaceRequest {
  virtualInterfaceId: string;
}
export const DeleteVirtualInterfaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ virtualInterfaceId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVirtualInterfaceRequest",
}) as any as S.Schema<DeleteVirtualInterfaceRequest>;
export interface DeleteVirtualInterfaceResponse {
  virtualInterfaceState?: VirtualInterfaceState;
}
export const DeleteVirtualInterfaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ virtualInterfaceState: S.optional(VirtualInterfaceState) }).pipe(
    ns,
  ),
).annotate({
  identifier: "DeleteVirtualInterfaceResponse",
}) as any as S.Schema<DeleteVirtualInterfaceResponse>;
export type LoaContentType = "application/pdf" | (string & {});
export const LoaContentType = S.String;

export interface DescribeConnectionLoaRequest {
  connectionId: string;
  providerName?: string;
  loaContentType?: LoaContentType;
}
export const DescribeConnectionLoaRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectionId: S.String,
    providerName: S.optional(S.String),
    loaContentType: S.optional(LoaContentType),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeConnectionLoaRequest",
}) as any as S.Schema<DescribeConnectionLoaRequest>;
export type LoaContent = Uint8Array;
export interface Loa {
  loaContent?: Uint8Array;
  loaContentType?: LoaContentType;
}
export const Loa = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    loaContent: S.optional(T.Blob),
    loaContentType: S.optional(LoaContentType),
  }).pipe(ns),
).annotate({ identifier: "Loa" }) as any as S.Schema<Loa>;
export interface DescribeConnectionLoaResponse {
  loa?: Loa;
}
export const DescribeConnectionLoaResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ loa: S.optional(Loa) }).pipe(ns),
).annotate({
  identifier: "DescribeConnectionLoaResponse",
}) as any as S.Schema<DescribeConnectionLoaResponse>;
export type MaxResultSetSize = number;
export type PaginationToken = string;
export interface DescribeConnectionsRequest {
  connectionId?: string;
  maxResults?: number;
  nextToken?: string;
}
export const DescribeConnectionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectionId: S.optional(S.String),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeConnectionsRequest",
}) as any as S.Schema<DescribeConnectionsRequest>;
export interface Connections {
  connections?: Connection[];
  nextToken?: string;
}
export const Connections = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connections: S.optional(ConnectionList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({ identifier: "Connections" }) as any as S.Schema<Connections>;
export interface DescribeConnectionsOnInterconnectRequest {
  interconnectId: string;
}
export const DescribeConnectionsOnInterconnectRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ interconnectId: S.String }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeConnectionsOnInterconnectRequest",
}) as any as S.Schema<DescribeConnectionsOnInterconnectRequest>;
export interface DescribeCustomerMetadataRequest {}
export const DescribeCustomerMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeCustomerMetadataRequest",
}) as any as S.Schema<DescribeCustomerMetadataRequest>;
export interface CustomerAgreement {
  agreementName?: string;
  status?: string;
}
export const CustomerAgreement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agreementName: S.optional(S.String),
    status: S.optional(S.String),
  }),
).annotate({
  identifier: "CustomerAgreement",
}) as any as S.Schema<CustomerAgreement>;
export type AgreementList = CustomerAgreement[];
export const AgreementList = /*@__PURE__*/ S.Array(CustomerAgreement);
export type NniPartnerType = "v1" | "v2" | "nonPartner" | (string & {});
export const NniPartnerType = S.String;

export interface DescribeCustomerMetadataResponse {
  agreements?: CustomerAgreement[];
  nniPartnerType?: NniPartnerType;
}
export const DescribeCustomerMetadataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agreements: S.optional(AgreementList),
    nniPartnerType: S.optional(NniPartnerType),
  }).pipe(ns),
).annotate({
  identifier: "DescribeCustomerMetadataResponse",
}) as any as S.Schema<DescribeCustomerMetadataResponse>;
export type AssociatedGatewayId = string;
export interface DescribeDirectConnectGatewayAssociationProposalsRequest {
  directConnectGatewayId?: string;
  proposalId?: string;
  associatedGatewayId?: string;
  maxResults?: number;
  nextToken?: string;
}
export const DescribeDirectConnectGatewayAssociationProposalsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      directConnectGatewayId: S.optional(S.String),
      proposalId: S.optional(S.String),
      associatedGatewayId: S.optional(S.String),
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeDirectConnectGatewayAssociationProposalsRequest",
  }) as any as S.Schema<DescribeDirectConnectGatewayAssociationProposalsRequest>;
export type DirectConnectGatewayAssociationProposalList =
  DirectConnectGatewayAssociationProposal[];
export const DirectConnectGatewayAssociationProposalList =
  /*@__PURE__*/ S.Array(DirectConnectGatewayAssociationProposal);
export interface DescribeDirectConnectGatewayAssociationProposalsResult {
  directConnectGatewayAssociationProposals?: DirectConnectGatewayAssociationProposal[];
  nextToken?: string;
}
export const DescribeDirectConnectGatewayAssociationProposalsResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      directConnectGatewayAssociationProposals: S.optional(
        DirectConnectGatewayAssociationProposalList,
      ),
      nextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeDirectConnectGatewayAssociationProposalsResult",
  }) as any as S.Schema<DescribeDirectConnectGatewayAssociationProposalsResult>;
export interface DescribeDirectConnectGatewayAssociationsRequest {
  associationId?: string;
  associatedGatewayId?: string;
  directConnectGatewayId?: string;
  maxResults?: number;
  nextToken?: string;
  virtualGatewayId?: string;
}
export const DescribeDirectConnectGatewayAssociationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      associationId: S.optional(S.String),
      associatedGatewayId: S.optional(S.String),
      directConnectGatewayId: S.optional(S.String),
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
      virtualGatewayId: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeDirectConnectGatewayAssociationsRequest",
  }) as any as S.Schema<DescribeDirectConnectGatewayAssociationsRequest>;
export type DirectConnectGatewayAssociationList =
  DirectConnectGatewayAssociation[];
export const DirectConnectGatewayAssociationList = /*@__PURE__*/ S.Array(
  DirectConnectGatewayAssociation,
);
export interface DescribeDirectConnectGatewayAssociationsResult {
  directConnectGatewayAssociations?: DirectConnectGatewayAssociation[];
  nextToken?: string;
}
export const DescribeDirectConnectGatewayAssociationsResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      directConnectGatewayAssociations: S.optional(
        DirectConnectGatewayAssociationList,
      ),
      nextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeDirectConnectGatewayAssociationsResult",
  }) as any as S.Schema<DescribeDirectConnectGatewayAssociationsResult>;
export interface DescribeDirectConnectGatewayAttachmentsRequest {
  directConnectGatewayId?: string;
  virtualInterfaceId?: string;
  maxResults?: number;
  nextToken?: string;
}
export const DescribeDirectConnectGatewayAttachmentsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      directConnectGatewayId: S.optional(S.String),
      virtualInterfaceId: S.optional(S.String),
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeDirectConnectGatewayAttachmentsRequest",
  }) as any as S.Schema<DescribeDirectConnectGatewayAttachmentsRequest>;
export type VirtualInterfaceRegion = string;
export type DirectConnectGatewayAttachmentState =
  | "attaching"
  | "attached"
  | "detaching"
  | "detached"
  | (string & {});
export const DirectConnectGatewayAttachmentState = S.String;

export type DirectConnectGatewayAttachmentType =
  | "TransitVirtualInterface"
  | "PrivateVirtualInterface"
  | (string & {});
export const DirectConnectGatewayAttachmentType = S.String;

export interface DirectConnectGatewayAttachment {
  directConnectGatewayId?: string;
  virtualInterfaceId?: string;
  virtualInterfaceRegion?: string;
  virtualInterfaceOwnerAccount?: string;
  attachmentState?: DirectConnectGatewayAttachmentState;
  attachmentType?: DirectConnectGatewayAttachmentType;
  stateChangeError?: string;
}
export const DirectConnectGatewayAttachment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    directConnectGatewayId: S.optional(S.String),
    virtualInterfaceId: S.optional(S.String),
    virtualInterfaceRegion: S.optional(S.String),
    virtualInterfaceOwnerAccount: S.optional(S.String),
    attachmentState: S.optional(DirectConnectGatewayAttachmentState),
    attachmentType: S.optional(DirectConnectGatewayAttachmentType),
    stateChangeError: S.optional(S.String),
  }),
).annotate({
  identifier: "DirectConnectGatewayAttachment",
}) as any as S.Schema<DirectConnectGatewayAttachment>;
export type DirectConnectGatewayAttachmentList =
  DirectConnectGatewayAttachment[];
export const DirectConnectGatewayAttachmentList = /*@__PURE__*/ S.Array(
  DirectConnectGatewayAttachment,
);
export interface DescribeDirectConnectGatewayAttachmentsResult {
  directConnectGatewayAttachments?: DirectConnectGatewayAttachment[];
  nextToken?: string;
}
export const DescribeDirectConnectGatewayAttachmentsResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      directConnectGatewayAttachments: S.optional(
        DirectConnectGatewayAttachmentList,
      ),
      nextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeDirectConnectGatewayAttachmentsResult",
  }) as any as S.Schema<DescribeDirectConnectGatewayAttachmentsResult>;
export interface DescribeDirectConnectGatewaysRequest {
  directConnectGatewayId?: string;
  maxResults?: number;
  nextToken?: string;
}
export const DescribeDirectConnectGatewaysRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      directConnectGatewayId: S.optional(S.String),
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeDirectConnectGatewaysRequest",
}) as any as S.Schema<DescribeDirectConnectGatewaysRequest>;
export type DirectConnectGatewayList = DirectConnectGateway[];
export const DirectConnectGatewayList =
  /*@__PURE__*/ S.Array(DirectConnectGateway);
export interface DescribeDirectConnectGatewaysResult {
  directConnectGateways?: DirectConnectGateway[];
  nextToken?: string;
}
export const DescribeDirectConnectGatewaysResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    directConnectGateways: S.optional(DirectConnectGatewayList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeDirectConnectGatewaysResult",
}) as any as S.Schema<DescribeDirectConnectGatewaysResult>;
export interface DescribeHostedConnectionsRequest {
  connectionId: string;
  maxResults?: number;
  nextToken?: string;
}
export const DescribeHostedConnectionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectionId: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeHostedConnectionsRequest",
}) as any as S.Schema<DescribeHostedConnectionsRequest>;
export interface DescribeInterconnectLoaRequest {
  interconnectId: string;
  providerName?: string;
  loaContentType?: LoaContentType;
}
export const DescribeInterconnectLoaRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    interconnectId: S.String,
    providerName: S.optional(S.String),
    loaContentType: S.optional(LoaContentType),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeInterconnectLoaRequest",
}) as any as S.Schema<DescribeInterconnectLoaRequest>;
export interface DescribeInterconnectLoaResponse {
  loa?: Loa;
}
export const DescribeInterconnectLoaResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ loa: S.optional(Loa) }).pipe(ns),
).annotate({
  identifier: "DescribeInterconnectLoaResponse",
}) as any as S.Schema<DescribeInterconnectLoaResponse>;
export interface DescribeInterconnectsRequest {
  interconnectId?: string;
  maxResults?: number;
  nextToken?: string;
}
export const DescribeInterconnectsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    interconnectId: S.optional(S.String),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeInterconnectsRequest",
}) as any as S.Schema<DescribeInterconnectsRequest>;
export type InterconnectList = Interconnect[];
export const InterconnectList = /*@__PURE__*/ S.Array(Interconnect);
export interface Interconnects {
  interconnects?: Interconnect[];
  nextToken?: string;
}
export const Interconnects = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    interconnects: S.optional(InterconnectList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({ identifier: "Interconnects" }) as any as S.Schema<Interconnects>;
export interface DescribeLagsRequest {
  lagId?: string;
  maxResults?: number;
  nextToken?: string;
}
export const DescribeLagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    lagId: S.optional(S.String),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeLagsRequest",
}) as any as S.Schema<DescribeLagsRequest>;
export type LagList = Lag[];
export const LagList = /*@__PURE__*/ S.Array(Lag);
export interface Lags {
  lags?: Lag[];
  nextToken?: string;
}
export const Lags = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ lags: S.optional(LagList), nextToken: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({ identifier: "Lags" }) as any as S.Schema<Lags>;
export interface DescribeLoaRequest {
  connectionId: string;
  providerName?: string;
  loaContentType?: LoaContentType;
}
export const DescribeLoaRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectionId: S.String,
    providerName: S.optional(S.String),
    loaContentType: S.optional(LoaContentType),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeLoaRequest",
}) as any as S.Schema<DescribeLoaRequest>;
export interface DescribeLocationsRequest {}
export const DescribeLocationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeLocationsRequest",
}) as any as S.Schema<DescribeLocationsRequest>;
export type LocationName = string;
export type PortSpeed = string;
export type AvailablePortSpeeds = string[];
export const AvailablePortSpeeds = /*@__PURE__*/ S.Array(S.String);
export type ProviderList = string[];
export const ProviderList = /*@__PURE__*/ S.Array(S.String);
export type AvailableMacSecPortSpeeds = string[];
export const AvailableMacSecPortSpeeds = /*@__PURE__*/ S.Array(S.String);
export interface Location {
  locationCode?: string;
  locationName?: string;
  region?: string;
  availablePortSpeeds?: string[];
  availableProviders?: string[];
  availableMacSecPortSpeeds?: string[];
}
export const Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    locationCode: S.optional(S.String),
    locationName: S.optional(S.String),
    region: S.optional(S.String),
    availablePortSpeeds: S.optional(AvailablePortSpeeds),
    availableProviders: S.optional(ProviderList),
    availableMacSecPortSpeeds: S.optional(AvailableMacSecPortSpeeds),
  }),
).annotate({ identifier: "Location" }) as any as S.Schema<Location>;
export type LocationList = Location[];
export const LocationList = /*@__PURE__*/ S.Array(Location);
export interface Locations {
  locations?: Location[];
}
export const Locations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ locations: S.optional(LocationList) }).pipe(ns),
).annotate({ identifier: "Locations" }) as any as S.Schema<Locations>;
export type RouterTypeIdentifier = string;
export interface DescribeRouterConfigurationRequest {
  virtualInterfaceId: string;
  routerTypeIdentifier?: string;
}
export const DescribeRouterConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualInterfaceId: S.String,
    routerTypeIdentifier: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeRouterConfigurationRequest",
}) as any as S.Schema<DescribeRouterConfigurationRequest>;
export type Vendor = string;
export type Platform = string;
export type Software = string;
export type XsltTemplateName = string;
export type XsltTemplateNameForMacSec = string;
export interface RouterType {
  vendor?: string;
  platform?: string;
  software?: string;
  xsltTemplateName?: string;
  xsltTemplateNameForMacSec?: string;
  routerTypeIdentifier?: string;
}
export const RouterType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vendor: S.optional(S.String),
    platform: S.optional(S.String),
    software: S.optional(S.String),
    xsltTemplateName: S.optional(S.String),
    xsltTemplateNameForMacSec: S.optional(S.String),
    routerTypeIdentifier: S.optional(S.String),
  }),
).annotate({ identifier: "RouterType" }) as any as S.Schema<RouterType>;
export interface DescribeRouterConfigurationResponse {
  customerRouterConfig?: string;
  router?: RouterType;
  virtualInterfaceId?: string;
  virtualInterfaceName?: string;
}
export const DescribeRouterConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    customerRouterConfig: S.optional(S.String),
    router: S.optional(RouterType),
    virtualInterfaceId: S.optional(S.String),
    virtualInterfaceName: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeRouterConfigurationResponse",
}) as any as S.Schema<DescribeRouterConfigurationResponse>;
export type ResourceArn = string;
export type ResourceArnList = string[];
export const ResourceArnList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeTagsRequest {
  resourceArns: string[];
}
export const DescribeTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArns: ResourceArnList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
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
export interface ResourceTag {
  resourceArn?: string;
  tags?: Tag[];
}
export const ResourceTag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.optional(S.String), tags: S.optional(TagList) }),
).annotate({ identifier: "ResourceTag" }) as any as S.Schema<ResourceTag>;
export type ResourceTagList = ResourceTag[];
export const ResourceTagList = /*@__PURE__*/ S.Array(ResourceTag);
export interface DescribeTagsResponse {
  resourceTags?: ResourceTag[];
}
export const DescribeTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceTags: S.optional(ResourceTagList) }).pipe(ns),
).annotate({
  identifier: "DescribeTagsResponse",
}) as any as S.Schema<DescribeTagsResponse>;
export interface DescribeVirtualGatewaysRequest {}
export const DescribeVirtualGatewaysRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeVirtualGatewaysRequest",
}) as any as S.Schema<DescribeVirtualGatewaysRequest>;
export type VirtualGatewayState = string;
export interface VirtualGateway {
  virtualGatewayId?: string;
  virtualGatewayState?: string;
}
export const VirtualGateway = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualGatewayId: S.optional(S.String),
    virtualGatewayState: S.optional(S.String),
  }),
).annotate({ identifier: "VirtualGateway" }) as any as S.Schema<VirtualGateway>;
export type VirtualGatewayList = VirtualGateway[];
export const VirtualGatewayList = /*@__PURE__*/ S.Array(VirtualGateway);
export interface VirtualGateways {
  virtualGateways?: VirtualGateway[];
}
export const VirtualGateways = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ virtualGateways: S.optional(VirtualGatewayList) }).pipe(ns),
).annotate({
  identifier: "VirtualGateways",
}) as any as S.Schema<VirtualGateways>;
export interface DescribeVirtualInterfacesRequest {
  connectionId?: string;
  virtualInterfaceId?: string;
  maxResults?: number;
  nextToken?: string;
}
export const DescribeVirtualInterfacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectionId: S.optional(S.String),
    virtualInterfaceId: S.optional(S.String),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeVirtualInterfacesRequest",
}) as any as S.Schema<DescribeVirtualInterfacesRequest>;
export type VirtualInterfaceList = VirtualInterface[];
export const VirtualInterfaceList = /*@__PURE__*/ S.Array(VirtualInterface);
export interface VirtualInterfaces {
  virtualInterfaces?: VirtualInterface[];
  nextToken?: string;
}
export const VirtualInterfaces = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualInterfaces: S.optional(VirtualInterfaceList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "VirtualInterfaces",
}) as any as S.Schema<VirtualInterfaces>;
export interface DisassociateConnectionFromLagRequest {
  connectionId: string;
  lagId: string;
}
export const DisassociateConnectionFromLagRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ connectionId: S.String, lagId: S.String }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DisassociateConnectionFromLagRequest",
}) as any as S.Schema<DisassociateConnectionFromLagRequest>;
export interface DisassociateMacSecKeyRequest {
  connectionId: string;
  secretARN: string;
}
export const DisassociateMacSecKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ connectionId: S.String, secretARN: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateMacSecKeyRequest",
}) as any as S.Schema<DisassociateMacSecKeyRequest>;
export interface DisassociateMacSecKeyResponse {
  connectionId?: string;
  macSecKeys?: MacSecKey[];
}
export const DisassociateMacSecKeyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectionId: S.optional(S.String),
    macSecKeys: S.optional(MacSecKeyList),
  }).pipe(ns),
).annotate({
  identifier: "DisassociateMacSecKeyResponse",
}) as any as S.Schema<DisassociateMacSecKeyResponse>;
export type RouteDirection = "accepted" | "advertised" | (string & {});
export const RouteDirection = S.String;

export type RouteFilterCidrString = string;
export type RouteFilterCidrStringList = string[];
export const RouteFilterCidrStringList = /*@__PURE__*/ S.Array(S.String);
export type AsPathList = number[];
export const AsPathList = /*@__PURE__*/ S.Array(S.Number);
export type CommunityEntry = string;
export type CommunityList = string[];
export const CommunityList = /*@__PURE__*/ S.Array(S.String);
export interface RouteFilters {
  routeDirection?: RouteDirection;
  addressFamily?: AddressFamily;
  cidrs?: string[];
  asPath?: number[];
  communities?: string[];
}
export const RouteFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    routeDirection: S.optional(RouteDirection),
    addressFamily: S.optional(AddressFamily),
    cidrs: S.optional(RouteFilterCidrStringList),
    asPath: S.optional(AsPathList),
    communities: S.optional(CommunityList),
  }),
).annotate({ identifier: "RouteFilters" }) as any as S.Schema<RouteFilters>;
export interface ListVirtualInterfaceRoutesRequest {
  virtualInterfaceId?: string;
  filters?: RouteFilters;
  maxResults?: number;
  nextToken?: string;
}
export const ListVirtualInterfaceRoutesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualInterfaceId: S.optional(S.String),
    filters: S.optional(RouteFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVirtualInterfaceRoutesRequest",
}) as any as S.Schema<ListVirtualInterfaceRoutesRequest>;
export type RouteCidr = string;
export type AsPathType = "seq" | "set" | (string & {});
export const AsPathType = S.String;

export interface AsPathSegment {
  pathType?: AsPathType;
  path?: number[];
}
export const AsPathSegment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pathType: S.optional(AsPathType), path: S.optional(AsPathList) }),
).annotate({ identifier: "AsPathSegment" }) as any as S.Schema<AsPathSegment>;
export type AsPathSegmentList = AsPathSegment[];
export const AsPathSegmentList = /*@__PURE__*/ S.Array(AsPathSegment);
export type RouteInstalledAt = Date;
export interface Route {
  cidr?: string;
  routeDirection?: RouteDirection;
  addressFamily?: AddressFamily;
  asPath?: AsPathSegment[];
  communities?: string[];
  awsLogicalDeviceId?: string;
  routeInstalledAt?: Date;
}
export const Route = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cidr: S.optional(S.String),
    routeDirection: S.optional(RouteDirection),
    addressFamily: S.optional(AddressFamily),
    asPath: S.optional(AsPathSegmentList),
    communities: S.optional(CommunityList),
    awsLogicalDeviceId: S.optional(S.String),
    routeInstalledAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "Route" }) as any as S.Schema<Route>;
export type RouteList = Route[];
export const RouteList = /*@__PURE__*/ S.Array(Route);
export interface ListVirtualInterfaceRoutesResponse {
  virtualInterfaceId?: string;
  routes?: Route[];
  nextToken?: string;
}
export const ListVirtualInterfaceRoutesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualInterfaceId: S.optional(S.String),
    routes: S.optional(RouteList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListVirtualInterfaceRoutesResponse",
}) as any as S.Schema<ListVirtualInterfaceRoutesResponse>;
export type TestId = string;
export type BGPPeerIdList = string[];
export const BGPPeerIdList = /*@__PURE__*/ S.Array(S.String);
export type FailureTestHistoryStatus = string;
export interface ListVirtualInterfaceTestHistoryRequest {
  testId?: string;
  virtualInterfaceId?: string;
  bgpPeers?: string[];
  status?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListVirtualInterfaceTestHistoryRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      testId: S.optional(S.String),
      virtualInterfaceId: S.optional(S.String),
      bgpPeers: S.optional(BGPPeerIdList),
      status: S.optional(S.String),
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListVirtualInterfaceTestHistoryRequest",
}) as any as S.Schema<ListVirtualInterfaceTestHistoryRequest>;
export type TestDuration = number;
export type StartTime = Date;
export type EndTime = Date;
export interface VirtualInterfaceTestHistory {
  testId?: string;
  virtualInterfaceId?: string;
  bgpPeers?: string[];
  status?: string;
  ownerAccount?: string;
  testDurationInMinutes?: number;
  startTime?: Date;
  endTime?: Date;
}
export const VirtualInterfaceTestHistory = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testId: S.optional(S.String),
    virtualInterfaceId: S.optional(S.String),
    bgpPeers: S.optional(BGPPeerIdList),
    status: S.optional(S.String),
    ownerAccount: S.optional(S.String),
    testDurationInMinutes: S.optional(S.Number),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "VirtualInterfaceTestHistory",
}) as any as S.Schema<VirtualInterfaceTestHistory>;
export type VirtualInterfaceTestHistoryList = VirtualInterfaceTestHistory[];
export const VirtualInterfaceTestHistoryList = /*@__PURE__*/ S.Array(
  VirtualInterfaceTestHistory,
);
export interface ListVirtualInterfaceTestHistoryResponse {
  virtualInterfaceTestHistory?: VirtualInterfaceTestHistory[];
  nextToken?: string;
}
export const ListVirtualInterfaceTestHistoryResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      virtualInterfaceTestHistory: S.optional(VirtualInterfaceTestHistoryList),
      nextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "ListVirtualInterfaceTestHistoryResponse",
}) as any as S.Schema<ListVirtualInterfaceTestHistoryResponse>;
export interface StartBgpFailoverTestRequest {
  virtualInterfaceId: string;
  bgpPeers?: string[];
  testDurationInMinutes?: number;
}
export const StartBgpFailoverTestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualInterfaceId: S.String,
    bgpPeers: S.optional(BGPPeerIdList),
    testDurationInMinutes: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartBgpFailoverTestRequest",
}) as any as S.Schema<StartBgpFailoverTestRequest>;
export interface StartBgpFailoverTestResponse {
  virtualInterfaceTest?: VirtualInterfaceTestHistory;
}
export const StartBgpFailoverTestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualInterfaceTest: S.optional(VirtualInterfaceTestHistory),
  }).pipe(ns),
).annotate({
  identifier: "StartBgpFailoverTestResponse",
}) as any as S.Schema<StartBgpFailoverTestResponse>;
export interface StopBgpFailoverTestRequest {
  virtualInterfaceId: string;
}
export const StopBgpFailoverTestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ virtualInterfaceId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopBgpFailoverTestRequest",
}) as any as S.Schema<StopBgpFailoverTestRequest>;
export interface StopBgpFailoverTestResponse {
  virtualInterfaceTest?: VirtualInterfaceTestHistory;
}
export const StopBgpFailoverTestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualInterfaceTest: S.optional(VirtualInterfaceTestHistory),
  }).pipe(ns),
).annotate({
  identifier: "StopBgpFailoverTestResponse",
}) as any as S.Schema<StopBgpFailoverTestResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tags: TagList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
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
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tagKeys: TagKeyList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
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
export interface UpdateConnectionRequest {
  connectionId: string;
  connectionName?: string;
  encryptionMode?: string;
}
export const UpdateConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectionId: S.String,
    connectionName: S.optional(S.String),
    encryptionMode: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateConnectionRequest",
}) as any as S.Schema<UpdateConnectionRequest>;
export interface UpdateDirectConnectGatewayRequest {
  directConnectGatewayId: string;
  newDirectConnectGatewayName: string;
}
export const UpdateDirectConnectGatewayRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    directConnectGatewayId: S.String,
    newDirectConnectGatewayName: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDirectConnectGatewayRequest",
}) as any as S.Schema<UpdateDirectConnectGatewayRequest>;
export interface UpdateDirectConnectGatewayResponse {
  directConnectGateway?: DirectConnectGateway;
}
export const UpdateDirectConnectGatewayResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ directConnectGateway: S.optional(DirectConnectGateway) }).pipe(ns),
).annotate({
  identifier: "UpdateDirectConnectGatewayResponse",
}) as any as S.Schema<UpdateDirectConnectGatewayResponse>;
export interface UpdateDirectConnectGatewayAssociationRequest {
  associationId?: string;
  addAllowedPrefixesToDirectConnectGateway?: RouteFilterPrefix[];
  removeAllowedPrefixesToDirectConnectGateway?: RouteFilterPrefix[];
}
export const UpdateDirectConnectGatewayAssociationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      associationId: S.optional(S.String),
      addAllowedPrefixesToDirectConnectGateway: S.optional(
        RouteFilterPrefixList,
      ),
      removeAllowedPrefixesToDirectConnectGateway: S.optional(
        RouteFilterPrefixList,
      ),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateDirectConnectGatewayAssociationRequest",
  }) as any as S.Schema<UpdateDirectConnectGatewayAssociationRequest>;
export interface UpdateDirectConnectGatewayAssociationResult {
  directConnectGatewayAssociation?: DirectConnectGatewayAssociation;
}
export const UpdateDirectConnectGatewayAssociationResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      directConnectGatewayAssociation: S.optional(
        DirectConnectGatewayAssociation,
      ),
    }).pipe(ns),
  ).annotate({
    identifier: "UpdateDirectConnectGatewayAssociationResult",
  }) as any as S.Schema<UpdateDirectConnectGatewayAssociationResult>;
export interface UpdateLagRequest {
  lagId: string;
  lagName?: string;
  minimumLinks?: number;
  encryptionMode?: string;
}
export const UpdateLagRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    lagId: S.String,
    lagName: S.optional(S.String),
    minimumLinks: S.optional(S.Number),
    encryptionMode: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateLagRequest",
}) as any as S.Schema<UpdateLagRequest>;
export interface UpdateVirtualInterfaceAttributesRequest {
  virtualInterfaceId: string;
  mtu?: number;
  enableSiteLink?: boolean;
  virtualInterfaceName?: string;
  prefixPoolAllocatedCountIpv4?: number;
  prefixPoolAllocatedCountIpv6?: number;
  rateLimit?: string;
}
export const UpdateVirtualInterfaceAttributesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      virtualInterfaceId: S.String,
      mtu: S.optional(S.Number),
      enableSiteLink: S.optional(S.Boolean),
      virtualInterfaceName: S.optional(S.String),
      prefixPoolAllocatedCountIpv4: S.optional(S.Number),
      prefixPoolAllocatedCountIpv6: S.optional(S.Number),
      rateLimit: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateVirtualInterfaceAttributesRequest",
}) as any as S.Schema<UpdateVirtualInterfaceAttributesRequest>;
export type ErrorMessage = string;
export type AcceptDirectConnectGatewayAssociationProposalError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Accepts a proposal request to attach a virtual private gateway or transit gateway to a Direct Connect gateway.
 */
export const acceptDirectConnectGatewayAssociationProposal: API.OperationMethod<
  AcceptDirectConnectGatewayAssociationProposalRequest,
  AcceptDirectConnectGatewayAssociationProposalResult,
  AcceptDirectConnectGatewayAssociationProposalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptDirectConnectGatewayAssociationProposalRequest,
  output: AcceptDirectConnectGatewayAssociationProposalResult,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptDirectConnectGatewayAssociationProposal",
}));

export type AllocateConnectionOnInterconnectError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deprecated. Use AllocateHostedConnection instead.
 *
 * Creates a hosted connection on an interconnect.
 *
 * Allocates a VLAN number and a specified amount of bandwidth for use by a hosted connection on the specified interconnect.
 *
 * Intended for use by Direct Connect Partners only.
 */
export const allocateConnectionOnInterconnect: API.OperationMethod<
  AllocateConnectionOnInterconnectRequest,
  Connection,
  AllocateConnectionOnInterconnectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AllocateConnectionOnInterconnectRequest,
  output: Connection,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AllocateConnectionOnInterconnect",
}));

export type AllocateHostedConnectionError =
  | DirectConnectClientException
  | DirectConnectServerException
  | DuplicateTagKeysException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a hosted connection on the specified interconnect or a link aggregation group (LAG) of interconnects.
 *
 * Allocates a VLAN number and a specified amount of capacity (bandwidth) for use by a hosted connection on the specified interconnect or LAG of interconnects.
 * Amazon Web Services polices the hosted connection for the specified capacity and the Direct Connect Partner must also police the hosted connection for the specified capacity.
 *
 * Intended for use by Direct Connect Partners only.
 */
export const allocateHostedConnection: API.OperationMethod<
  AllocateHostedConnectionRequest,
  Connection,
  AllocateHostedConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AllocateHostedConnectionRequest,
  output: Connection,
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AllocateHostedConnection",
}));

export type AllocatePrivateVirtualInterfaceError =
  | DirectConnectClientException
  | DirectConnectServerException
  | DuplicateTagKeysException
  | LimitExceededException
  | TooManyTagsException
  | CommonErrors;
/**
 * Provisions a private virtual interface to be owned by the specified Amazon Web Services account.
 *
 * Virtual interfaces created using this action must be confirmed by the owner using ConfirmPrivateVirtualInterface.
 * Until then, the virtual interface is in the `Confirming` state and is not available to handle traffic.
 */
export const allocatePrivateVirtualInterface: API.OperationMethod<
  AllocatePrivateVirtualInterfaceRequest,
  VirtualInterface,
  AllocatePrivateVirtualInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AllocatePrivateVirtualInterfaceRequest,
  output: VirtualInterface,
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    LimitExceededException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AllocatePrivateVirtualInterface",
}));

export type AllocatePublicVirtualInterfaceError =
  | DirectConnectClientException
  | DirectConnectServerException
  | DuplicateTagKeysException
  | LimitExceededException
  | TooManyTagsException
  | CommonErrors;
/**
 * Provisions a public virtual interface to be owned by the specified Amazon Web Services account.
 *
 * The owner of a connection calls this function to provision a public virtual interface to be owned by the specified Amazon Web Services account.
 *
 * Virtual interfaces created using this function must be confirmed by the owner using ConfirmPublicVirtualInterface.
 * Until this step has been completed, the virtual interface is in the `confirming` state and is not available to handle traffic.
 *
 * When creating an IPv6 public virtual interface, omit the Amazon address and customer address. IPv6 addresses are automatically assigned from
 * the Amazon pool of IPv6 addresses; you cannot specify custom IPv6 addresses.
 */
export const allocatePublicVirtualInterface: API.OperationMethod<
  AllocatePublicVirtualInterfaceRequest,
  VirtualInterface,
  AllocatePublicVirtualInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AllocatePublicVirtualInterfaceRequest,
  output: VirtualInterface,
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    LimitExceededException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AllocatePublicVirtualInterface",
}));

export type AllocateTransitVirtualInterfaceError =
  | DirectConnectClientException
  | DirectConnectServerException
  | DuplicateTagKeysException
  | LimitExceededException
  | TooManyTagsException
  | CommonErrors;
/**
 * Provisions a transit virtual interface to be owned by the specified Amazon Web Services account. Use this type of interface to connect a transit gateway to your Direct Connect gateway.
 *
 * The owner of a connection provisions a transit virtual interface to be owned by the specified Amazon Web Services account.
 *
 * After you create a transit virtual interface, it must be confirmed by the owner using ConfirmTransitVirtualInterface. Until this step has been completed, the transit virtual interface is in the `requested` state and is not available to handle traffic.
 */
export const allocateTransitVirtualInterface: API.OperationMethod<
  AllocateTransitVirtualInterfaceRequest,
  AllocateTransitVirtualInterfaceResult,
  AllocateTransitVirtualInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AllocateTransitVirtualInterfaceRequest,
  output: AllocateTransitVirtualInterfaceResult,
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    LimitExceededException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AllocateTransitVirtualInterface",
}));

export type AssociateConnectionWithLagError =
  | DirectConnectClientException
  | DirectConnectServerException
  | LimitExceededException
  | CommonErrors;
/**
 * Associates an existing connection with a link aggregation group (LAG). The connection
 * is interrupted and re-established as a member of the LAG (connectivity to Amazon Web Services is
 * interrupted). The connection must be hosted on the same Direct Connect endpoint as the LAG, and its
 * bandwidth must match the bandwidth for the LAG. You can re-associate a connection that's
 * currently associated with a different LAG; however, if removing the connection would cause
 * the original LAG to fall below its setting for minimum number of operational connections,
 * the request fails.
 *
 * Any virtual interfaces that are directly associated with the connection are
 * automatically re-associated with the LAG. If the connection was originally associated
 * with a different LAG, the virtual interfaces remain associated with the original
 * LAG.
 *
 * For interconnects, any hosted connections are automatically re-associated with the
 * LAG. If the interconnect was originally associated with a different LAG, the hosted
 * connections remain associated with the original LAG.
 */
export const associateConnectionWithLag: API.OperationMethod<
  AssociateConnectionWithLagRequest,
  Connection,
  AssociateConnectionWithLagError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateConnectionWithLagRequest,
  output: Connection,
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateConnectionWithLag",
}));

export type AssociateHostedConnectionError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Associates a hosted connection and its virtual interfaces with a link aggregation
 * group (LAG) or interconnect. If the target interconnect or LAG has an existing hosted
 * connection with a conflicting VLAN number or IP address, the operation fails. This
 * action temporarily interrupts the hosted connection's connectivity to Amazon Web Services
 * as it is being migrated.
 *
 * Intended for use by Direct Connect Partners only.
 */
export const associateHostedConnection: API.OperationMethod<
  AssociateHostedConnectionRequest,
  Connection,
  AssociateHostedConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateHostedConnectionRequest,
  output: Connection,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateHostedConnection",
}));

export type AssociateMacSecKeyError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Associates a MAC Security (MACsec) Connection Key Name (CKN)/ Connectivity Association Key (CAK) pair with a Direct Connect connection.
 *
 * You must supply either the `secretARN,` or the CKN/CAK (`ckn` and `cak`) pair in the request.
 *
 * For information about MAC Security (MACsec) key considerations, see MACsec pre-shared CKN/CAK key considerations in the *Direct Connect User Guide*.
 */
export const associateMacSecKey: API.OperationMethod<
  AssociateMacSecKeyRequest,
  AssociateMacSecKeyResponse,
  AssociateMacSecKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateMacSecKeyRequest,
  output: AssociateMacSecKeyResponse,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateMacSecKey",
}));

export type AssociateVirtualInterfaceError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Associates a virtual interface with a specified link aggregation group (LAG) or
 * connection. Connectivity to Amazon Web Services is temporarily interrupted as the virtual interface is
 * being migrated. If the target connection or LAG has an associated virtual interface with
 * a conflicting VLAN number or a conflicting IP address, the operation fails.
 *
 * Virtual interfaces associated with a hosted connection cannot be associated with a
 * LAG; hosted connections must be migrated along with their virtual interfaces using AssociateHostedConnection.
 *
 * To reassociate a virtual interface to a new connection or LAG, the requester
 * must own either the virtual interface itself or the connection to which the virtual
 * interface is currently associated. Additionally, the requester must own the connection
 * or LAG for the association.
 */
export const associateVirtualInterface: API.OperationMethod<
  AssociateVirtualInterfaceRequest,
  VirtualInterface,
  AssociateVirtualInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateVirtualInterfaceRequest,
  output: VirtualInterface,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateVirtualInterface",
}));

export type ConfirmConnectionError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Confirms the creation of the specified hosted connection on an interconnect.
 *
 * Upon creation, the hosted connection is initially in the `Ordering` state, and
 * remains in this state until the owner confirms creation of the hosted connection.
 */
export const confirmConnection: API.OperationMethod<
  ConfirmConnectionRequest,
  ConfirmConnectionResponse,
  ConfirmConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ConfirmConnectionRequest,
  output: ConfirmConnectionResponse,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfirmConnection",
}));

export type ConfirmCustomerAgreementError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * The confirmation of the terms of agreement when creating the connection/link aggregation group (LAG).
 */
export const confirmCustomerAgreement: API.OperationMethod<
  ConfirmCustomerAgreementRequest,
  ConfirmCustomerAgreementResponse,
  ConfirmCustomerAgreementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ConfirmCustomerAgreementRequest,
  output: ConfirmCustomerAgreementResponse,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfirmCustomerAgreement",
}));

export type ConfirmPrivateVirtualInterfaceError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Accepts ownership of a private virtual interface created by another Amazon Web Services account.
 *
 * After the virtual interface owner makes this call, the virtual interface is
 * created and attached to the specified virtual private gateway or Direct Connect gateway, and is
 * made available to handle traffic.
 */
export const confirmPrivateVirtualInterface: API.OperationMethod<
  ConfirmPrivateVirtualInterfaceRequest,
  ConfirmPrivateVirtualInterfaceResponse,
  ConfirmPrivateVirtualInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ConfirmPrivateVirtualInterfaceRequest,
  output: ConfirmPrivateVirtualInterfaceResponse,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfirmPrivateVirtualInterface",
}));

export type ConfirmPublicVirtualInterfaceError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Accepts ownership of a public virtual interface created by another Amazon Web Services account.
 *
 * After the virtual interface owner makes this call, the specified virtual interface is
 * created and made available to handle traffic.
 */
export const confirmPublicVirtualInterface: API.OperationMethod<
  ConfirmPublicVirtualInterfaceRequest,
  ConfirmPublicVirtualInterfaceResponse,
  ConfirmPublicVirtualInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ConfirmPublicVirtualInterfaceRequest,
  output: ConfirmPublicVirtualInterfaceResponse,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfirmPublicVirtualInterface",
}));

export type ConfirmTransitVirtualInterfaceError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Accepts ownership of a transit virtual interface created by another Amazon Web Services account.
 *
 * After the owner of the transit virtual interface makes this call, the specified transit virtual interface is created and made available to handle traffic.
 */
export const confirmTransitVirtualInterface: API.OperationMethod<
  ConfirmTransitVirtualInterfaceRequest,
  ConfirmTransitVirtualInterfaceResponse,
  ConfirmTransitVirtualInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ConfirmTransitVirtualInterfaceRequest,
  output: ConfirmTransitVirtualInterfaceResponse,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfirmTransitVirtualInterface",
}));

export type CreateBGPPeerError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Creates a BGP peer on the specified virtual interface.
 *
 * You must create a BGP peer for the corresponding address family (IPv4/IPv6) in order to
 * access Amazon Web Services resources that also use that address family.
 *
 * If logical redundancy is not supported by the connection, interconnect, or LAG, the BGP peer cannot
 * be in the same address family as an existing BGP peer on the virtual interface.
 *
 * When creating a IPv6 BGP peer, omit the Amazon address and customer address. IPv6 addresses are automatically assigned from
 * the Amazon pool of IPv6 addresses; you cannot specify custom IPv6 addresses.
 *
 * If you let Amazon Web Services auto-assign IPv4 addresses, a /30 CIDR will be allocated
 * from 169.254.0.0/16. Amazon Web Services does not recommend this option if you intend to use
 * the customer router peer IP address as the source and destination for traffic. Instead you
 * should use RFC 1918 or other addressing, and specify the address yourself. For more
 * information about RFC 1918 see
 * Address Allocation for Private Internets.
 *
 * For a public virtual interface, the Autonomous System Number (ASN) must be private or already on the allow list for the virtual interface.
 */
export const createBGPPeer: API.OperationMethod<
  CreateBGPPeerRequest,
  CreateBGPPeerResponse,
  CreateBGPPeerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBGPPeerRequest,
  output: CreateBGPPeerResponse,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBGPPeer",
}));

export type CreateConnectionError =
  | DirectConnectClientException
  | DirectConnectServerException
  | DuplicateTagKeysException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a connection between a customer network and a specific Direct Connect location.
 *
 * A connection links your internal network to an Direct Connect location over a standard Ethernet fiber-optic
 * cable. One end of the cable is connected to your router, the other to an Direct Connect router.
 *
 * To find the locations for your Region, use DescribeLocations.
 *
 * You can automatically add the new connection to a link aggregation group (LAG) by
 * specifying a LAG ID in the request. This ensures that the new connection is allocated on the
 * same Direct Connect endpoint that hosts the specified LAG. If there are no available ports on the endpoint,
 * the request fails and no connection is created.
 */
export const createConnection: API.OperationMethod<
  CreateConnectionRequest,
  Connection,
  CreateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConnectionRequest,
  output: Connection,
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnection",
}));

export type CreateDirectConnectGatewayError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Creates a Direct Connect gateway, which is an intermediate object that enables you to connect a set
 * of virtual interfaces and virtual private gateways. A Direct Connect gateway is global and visible in any
 * Amazon Web Services Region after it is created. The virtual interfaces and virtual private gateways that
 * are connected through a Direct Connect gateway can be in different Amazon Web Services Regions. This enables you to
 * connect to a VPC in any Region, regardless of the Region in which the virtual interfaces
 * are located, and pass traffic between them.
 */
export const createDirectConnectGateway: API.OperationMethod<
  CreateDirectConnectGatewayRequest,
  CreateDirectConnectGatewayResult,
  CreateDirectConnectGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDirectConnectGatewayRequest,
  output: CreateDirectConnectGatewayResult,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDirectConnectGateway",
}));

export type CreateDirectConnectGatewayAssociationError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Creates an association between a Direct Connect gateway and a virtual private gateway. The virtual
 * private gateway must be attached to a VPC and must not be associated with another Direct Connect gateway.
 */
export const createDirectConnectGatewayAssociation: API.OperationMethod<
  CreateDirectConnectGatewayAssociationRequest,
  CreateDirectConnectGatewayAssociationResult,
  CreateDirectConnectGatewayAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDirectConnectGatewayAssociationRequest,
  output: CreateDirectConnectGatewayAssociationResult,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDirectConnectGatewayAssociation",
}));

export type CreateDirectConnectGatewayAssociationProposalError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Creates a proposal to associate the specified virtual private gateway or transit gateway with the specified Direct Connect gateway.
 *
 * You can associate a Direct Connect gateway and virtual private gateway or transit gateway that is owned by any Amazon Web Services account.
 */
export const createDirectConnectGatewayAssociationProposal: API.OperationMethod<
  CreateDirectConnectGatewayAssociationProposalRequest,
  CreateDirectConnectGatewayAssociationProposalResult,
  CreateDirectConnectGatewayAssociationProposalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDirectConnectGatewayAssociationProposalRequest,
  output: CreateDirectConnectGatewayAssociationProposalResult,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDirectConnectGatewayAssociationProposal",
}));

export type CreateInterconnectError =
  | DirectConnectClientException
  | DirectConnectServerException
  | DuplicateTagKeysException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates an interconnect between an Direct Connect Partner's network and a specific Direct Connect location.
 *
 * An interconnect is a connection that is capable of hosting other connections. The
 * Direct Connect Partner can use an interconnect to provide Direct Connect hosted
 * connections to customers through their own network services. Like a standard connection, an
 * interconnect links the partner's network to an Direct Connect location over a standard Ethernet
 * fiber-optic cable. One end is connected to the partner's router, the other to an Direct Connect
 * router.
 *
 * You can automatically add the new interconnect to a link aggregation group (LAG) by
 * specifying a LAG ID in the request. This ensures that the new interconnect is allocated on
 * the same Direct Connect endpoint that hosts the specified LAG. If there are no available ports on the
 * endpoint, the request fails and no interconnect is created.
 *
 * For each end customer, the Direct Connect Partner provisions a connection on their interconnect by calling AllocateHostedConnection.
 * The end customer can then connect to Amazon Web Services resources by creating a virtual interface on their connection, using the VLAN assigned to them by the Direct Connect Partner.
 *
 * Intended for use by Direct Connect Partners only.
 */
export const createInterconnect: API.OperationMethod<
  CreateInterconnectRequest,
  Interconnect,
  CreateInterconnectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateInterconnectRequest,
  output: Interconnect,
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInterconnect",
}));

export type CreateLagError =
  | DirectConnectClientException
  | DirectConnectServerException
  | DuplicateTagKeysException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a link aggregation group (LAG) with the specified number of bundled
 * physical dedicated connections between the customer network and a specific Direct Connect location.
 * A LAG is a logical interface that uses the Link Aggregation Control Protocol
 * (LACP) to aggregate multiple interfaces, enabling you to treat them as a single
 * interface.
 *
 * All connections in a LAG must use the same bandwidth (either 1Gbps, 10Gbps, 100Gbps,
 * or 400Gbps) and must terminate at the same Direct Connect endpoint.
 *
 * You can have up to 10 dedicated connections per location. Regardless of this limit, if you
 * request more connections for the LAG than Direct Connect can allocate on a single endpoint, no LAG is
 * created..
 *
 * You can specify an existing physical dedicated connection or interconnect to include in
 * the LAG (which counts towards the total number of connections). Doing so interrupts the
 * current physical dedicated connection, and re-establishes them as a member of the LAG. The LAG
 * will be created on the same Direct Connect endpoint to which the dedicated connection terminates. Any
 * virtual interfaces associated with the dedicated connection are automatically disassociated
 * and re-associated with the LAG. The connection ID does not change.
 *
 * If the Amazon Web Services account used to create a LAG is a registered Direct Connect Partner, the LAG is
 * automatically enabled to host sub-connections. For a LAG owned by a partner, any associated virtual
 * interfaces cannot be directly configured.
 */
export const createLag: API.OperationMethod<
  CreateLagRequest,
  Lag,
  CreateLagError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLagRequest,
  output: Lag,
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLag",
}));

export type CreatePrivateVirtualInterfaceError =
  | DirectConnectClientException
  | DirectConnectServerException
  | DuplicateTagKeysException
  | LimitExceededException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a private virtual interface. A virtual interface is the VLAN that transports Direct Connect traffic.
 * A private virtual interface can be connected to either a Direct Connect gateway or a Virtual Private Gateway (VGW).
 * Connecting the private virtual interface to a Direct Connect gateway enables the possibility for connecting to multiple
 * VPCs, including VPCs in different Amazon Web Services Regions. Connecting the private virtual interface
 * to a VGW only provides access to a single VPC within the same Region.
 *
 * Setting the MTU of a virtual interface to 8500 (jumbo frames) can cause an update to
 * the underlying physical connection if it wasn't updated to support jumbo frames. Updating
 * the connection disrupts network connectivity for all virtual interfaces associated with
 * the connection for up to 30 seconds. To check whether your connection supports jumbo
 * frames, call DescribeConnections. To check whether your virtual
 * interface supports jumbo frames, call DescribeVirtualInterfaces.
 */
export const createPrivateVirtualInterface: API.OperationMethod<
  CreatePrivateVirtualInterfaceRequest,
  VirtualInterface,
  CreatePrivateVirtualInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePrivateVirtualInterfaceRequest,
  output: VirtualInterface,
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    LimitExceededException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePrivateVirtualInterface",
}));

export type CreatePublicVirtualInterfaceError =
  | DirectConnectClientException
  | DirectConnectServerException
  | DuplicateTagKeysException
  | LimitExceededException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a public virtual interface. A virtual interface is the VLAN that transports Direct Connect traffic.
 * A public virtual interface supports sending traffic to public services of Amazon Web Services such as Amazon S3.
 *
 * When creating an IPv6 public virtual interface (`addressFamily` is `ipv6`), leave the `customer`
 * and `amazon` address fields blank to use auto-assigned IPv6 space. Custom IPv6 addresses are not supported.
 */
export const createPublicVirtualInterface: API.OperationMethod<
  CreatePublicVirtualInterfaceRequest,
  VirtualInterface,
  CreatePublicVirtualInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePublicVirtualInterfaceRequest,
  output: VirtualInterface,
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    LimitExceededException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePublicVirtualInterface",
}));

export type CreateTransitVirtualInterfaceError =
  | DirectConnectClientException
  | DirectConnectServerException
  | DuplicateTagKeysException
  | LimitExceededException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a transit virtual interface. A transit virtual interface should be used to access one or more transit gateways associated with Direct Connect gateways. A transit virtual interface enables the connection of multiple VPCs attached to a transit gateway to a Direct Connect gateway.
 *
 * If you associate your transit gateway with one or more Direct Connect gateways, the Autonomous System Number (ASN) used by the transit gateway and the Direct Connect gateway must be different. For example, if you use the default ASN 64512 for both your the transit gateway and Direct Connect gateway, the association request fails.
 *
 * A jumbo MTU value must be either 1500 or 8500. No other values will be accepted. Setting
 * the MTU of a virtual interface to 8500 (jumbo frames) can cause an update to the underlying
 * physical connection if it wasn't updated to support jumbo frames. Updating the connection
 * disrupts network connectivity for all virtual interfaces associated with the connection for up
 * to 30 seconds. To check whether your connection supports jumbo frames, call DescribeConnections. To check whether your virtual interface supports jumbo
 * frames, call DescribeVirtualInterfaces.
 */
export const createTransitVirtualInterface: API.OperationMethod<
  CreateTransitVirtualInterfaceRequest,
  CreateTransitVirtualInterfaceResult,
  CreateTransitVirtualInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTransitVirtualInterfaceRequest,
  output: CreateTransitVirtualInterfaceResult,
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    LimitExceededException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTransitVirtualInterface",
}));

export type DeleteBGPPeerError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deletes the specified BGP peer on the specified virtual interface with the specified customer address and ASN.
 *
 * You cannot delete the last BGP peer from a virtual interface.
 */
export const deleteBGPPeer: API.OperationMethod<
  DeleteBGPPeerRequest,
  DeleteBGPPeerResponse,
  DeleteBGPPeerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBGPPeerRequest,
  output: DeleteBGPPeerResponse,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBGPPeer",
}));

export type DeleteConnectionError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deletes the specified connection.
 *
 * Deleting a connection only stops the Direct Connect port hour and data transfer charges.
 * If you are partnering with any third parties to connect with the Direct Connect location,
 * you must cancel your service with them separately.
 */
export const deleteConnection: API.OperationMethod<
  DeleteConnectionRequest,
  Connection,
  DeleteConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConnectionRequest,
  output: Connection,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnection",
}));

export type DeleteDirectConnectGatewayError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deletes the specified Direct Connect gateway. You must first delete all virtual interfaces that are
 * attached to the Direct Connect gateway and disassociate all virtual private gateways associated
 * with the Direct Connect gateway.
 */
export const deleteDirectConnectGateway: API.OperationMethod<
  DeleteDirectConnectGatewayRequest,
  DeleteDirectConnectGatewayResult,
  DeleteDirectConnectGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDirectConnectGatewayRequest,
  output: DeleteDirectConnectGatewayResult,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDirectConnectGateway",
}));

export type DeleteDirectConnectGatewayAssociationError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deletes the association between the specified Direct Connect gateway and virtual private gateway.
 *
 * We recommend that you specify the `associationID` to delete the association. Alternatively, if you own virtual gateway and a Direct Connect gateway association, you can specify the `virtualGatewayId` and `directConnectGatewayId` to delete an association.
 */
export const deleteDirectConnectGatewayAssociation: API.OperationMethod<
  DeleteDirectConnectGatewayAssociationRequest,
  DeleteDirectConnectGatewayAssociationResult,
  DeleteDirectConnectGatewayAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDirectConnectGatewayAssociationRequest,
  output: DeleteDirectConnectGatewayAssociationResult,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDirectConnectGatewayAssociation",
}));

export type DeleteDirectConnectGatewayAssociationProposalError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deletes the association proposal request between the specified Direct Connect gateway and virtual private gateway or transit gateway.
 */
export const deleteDirectConnectGatewayAssociationProposal: API.OperationMethod<
  DeleteDirectConnectGatewayAssociationProposalRequest,
  DeleteDirectConnectGatewayAssociationProposalResult,
  DeleteDirectConnectGatewayAssociationProposalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDirectConnectGatewayAssociationProposalRequest,
  output: DeleteDirectConnectGatewayAssociationProposalResult,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDirectConnectGatewayAssociationProposal",
}));

export type DeleteInterconnectError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deletes the specified interconnect.
 *
 * Intended for use
 * by Direct Connect Partners only.
 */
export const deleteInterconnect: API.OperationMethod<
  DeleteInterconnectRequest,
  DeleteInterconnectResponse,
  DeleteInterconnectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteInterconnectRequest,
  output: DeleteInterconnectResponse,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInterconnect",
}));

export type DeleteLagError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deletes the specified link aggregation group (LAG). You cannot delete a LAG if it has active
 * virtual interfaces or hosted connections.
 */
export const deleteLag: API.OperationMethod<
  DeleteLagRequest,
  Lag,
  DeleteLagError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLagRequest,
  output: Lag,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLag",
}));

export type DeleteVirtualInterfaceError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deletes a virtual interface.
 */
export const deleteVirtualInterface: API.OperationMethod<
  DeleteVirtualInterfaceRequest,
  DeleteVirtualInterfaceResponse,
  DeleteVirtualInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVirtualInterfaceRequest,
  output: DeleteVirtualInterfaceResponse,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVirtualInterface",
}));

export type DescribeConnectionLoaError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deprecated. Use DescribeLoa instead.
 *
 * Gets the LOA-CFA for a connection.
 *
 * The Letter of Authorization - Connecting Facility Assignment (LOA-CFA) is a document that your APN partner or
 * service provider uses when establishing your cross connect to Amazon Web Services at the colocation facility. For more information,
 * see Requesting Cross Connects
 * at Direct Connect Locations in the *Direct Connect User Guide*.
 */
export const describeConnectionLoa: API.OperationMethod<
  DescribeConnectionLoaRequest,
  DescribeConnectionLoaResponse,
  DescribeConnectionLoaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeConnectionLoaRequest,
  output: DescribeConnectionLoaResponse,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnectionLoa",
}));

export type DescribeConnectionsError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Displays the specified connection or all connections in this Region.
 */
export const describeConnections: API.OperationMethod<
  DescribeConnectionsRequest,
  Connections,
  DescribeConnectionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeConnectionsRequest,
  output: Connections,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnections",
}));

export type DescribeConnectionsOnInterconnectError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deprecated. Use DescribeHostedConnections instead.
 *
 * Lists the connections that have been provisioned on the specified interconnect.
 *
 * Intended for use by Direct Connect Partners only.
 */
export const describeConnectionsOnInterconnect: API.OperationMethod<
  DescribeConnectionsOnInterconnectRequest,
  Connections,
  DescribeConnectionsOnInterconnectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeConnectionsOnInterconnectRequest,
  output: Connections,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnectionsOnInterconnect",
}));

export type DescribeCustomerMetadataError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Get and view a list of customer agreements, along with their signed status and whether the customer is an NNIPartner, NNIPartnerV2, or a nonPartner.
 */
export const describeCustomerMetadata: API.OperationMethod<
  DescribeCustomerMetadataRequest,
  DescribeCustomerMetadataResponse,
  DescribeCustomerMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeCustomerMetadataRequest,
  output: DescribeCustomerMetadataResponse,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCustomerMetadata",
}));

export type DescribeDirectConnectGatewayAssociationProposalsError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Describes one or more association proposals for connection between a virtual private gateway or transit gateway and a Direct Connect gateway.
 */
export const describeDirectConnectGatewayAssociationProposals: API.OperationMethod<
  DescribeDirectConnectGatewayAssociationProposalsRequest,
  DescribeDirectConnectGatewayAssociationProposalsResult,
  DescribeDirectConnectGatewayAssociationProposalsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDirectConnectGatewayAssociationProposalsRequest,
  output: DescribeDirectConnectGatewayAssociationProposalsResult,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDirectConnectGatewayAssociationProposals",
}));

export type DescribeDirectConnectGatewayAssociationsError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Lists the associations between your Direct Connect gateways and virtual private gateways and transit gateways. You must specify one of the following:
 *
 * - A Direct Connect gateway
 *
 * The response contains all virtual private gateways and transit gateways associated with the Direct Connect gateway.
 *
 * - A virtual private gateway
 *
 * The response contains the Direct Connect gateway.
 *
 * - A transit gateway
 *
 * The response contains the Direct Connect gateway.
 *
 * - A Direct Connect gateway and a virtual private gateway
 *
 * The response contains the association between the Direct Connect gateway and virtual private gateway.
 *
 * - A Direct Connect gateway and a transit gateway
 *
 * The response contains the association between the Direct Connect gateway and transit gateway.
 *
 * - A Direct Connect gateway and a virtual private gateway
 *
 * The response contains the association between the Direct Connect gateway and virtual private gateway.
 *
 * - A Direct Connect gateway association to a Cloud WAN core network
 *
 * The response contains the Cloud WAN core network ID that the Direct Connect gateway is associated to.
 */
export const describeDirectConnectGatewayAssociations: API.OperationMethod<
  DescribeDirectConnectGatewayAssociationsRequest,
  DescribeDirectConnectGatewayAssociationsResult,
  DescribeDirectConnectGatewayAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDirectConnectGatewayAssociationsRequest,
  output: DescribeDirectConnectGatewayAssociationsResult,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDirectConnectGatewayAssociations",
}));

export type DescribeDirectConnectGatewayAttachmentsError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Lists the attachments between your Direct Connect gateways and virtual interfaces. You must specify
 * a Direct Connect gateway, a virtual interface, or both. If you specify a Direct Connect gateway, the response contains
 * all virtual interfaces attached to the Direct Connect gateway. If you specify a virtual interface, the
 * response contains all Direct Connect gateways attached to the virtual interface. If you specify both,
 * the response contains the attachment between the Direct Connect gateway and the virtual interface.
 */
export const describeDirectConnectGatewayAttachments: API.OperationMethod<
  DescribeDirectConnectGatewayAttachmentsRequest,
  DescribeDirectConnectGatewayAttachmentsResult,
  DescribeDirectConnectGatewayAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDirectConnectGatewayAttachmentsRequest,
  output: DescribeDirectConnectGatewayAttachmentsResult,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDirectConnectGatewayAttachments",
}));

export type DescribeDirectConnectGatewaysError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Lists all your Direct Connect gateways or only the specified Direct Connect gateway. Deleted Direct Connect gateways are not returned.
 */
export const describeDirectConnectGateways: API.OperationMethod<
  DescribeDirectConnectGatewaysRequest,
  DescribeDirectConnectGatewaysResult,
  DescribeDirectConnectGatewaysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDirectConnectGatewaysRequest,
  output: DescribeDirectConnectGatewaysResult,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDirectConnectGateways",
}));

export type DescribeHostedConnectionsError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Lists the hosted connections that have been provisioned on the specified
 * interconnect or link aggregation group (LAG).
 *
 * Intended for use by Direct Connect Partners only.
 */
export const describeHostedConnections: API.OperationMethod<
  DescribeHostedConnectionsRequest,
  Connections,
  DescribeHostedConnectionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeHostedConnectionsRequest,
  output: Connections,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHostedConnections",
}));

export type DescribeInterconnectLoaError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deprecated. Use DescribeLoa instead.
 *
 * Gets the LOA-CFA for the specified interconnect.
 *
 * The Letter of Authorization - Connecting Facility Assignment (LOA-CFA) is a document that is used when establishing your cross connect to Amazon Web Services at the colocation facility.
 * For more information, see Requesting Cross Connects at Direct Connect Locations
 * in the *Direct Connect User Guide*.
 */
export const describeInterconnectLoa: API.OperationMethod<
  DescribeInterconnectLoaRequest,
  DescribeInterconnectLoaResponse,
  DescribeInterconnectLoaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeInterconnectLoaRequest,
  output: DescribeInterconnectLoaResponse,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInterconnectLoa",
}));

export type DescribeInterconnectsError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Lists the interconnects owned by the Amazon Web Services account or only the specified interconnect.
 */
export const describeInterconnects: API.OperationMethod<
  DescribeInterconnectsRequest,
  Interconnects,
  DescribeInterconnectsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeInterconnectsRequest,
  output: Interconnects,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInterconnects",
}));

export type DescribeLagsError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Describes all your link aggregation groups (LAG) or the specified LAG.
 */
export const describeLags: API.OperationMethod<
  DescribeLagsRequest,
  Lags,
  DescribeLagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeLagsRequest,
  output: Lags,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLags",
}));

export type DescribeLoaError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Gets the LOA-CFA for a connection, interconnect, or link aggregation group (LAG).
 *
 * The Letter of Authorization - Connecting Facility Assignment (LOA-CFA) is a document that is used when establishing
 * your cross connect to Amazon Web Services at the colocation facility. For more information, see Requesting Cross Connects at Direct Connect Locations
 * in the *Direct Connect User Guide*.
 */
export const describeLoa: API.OperationMethod<
  DescribeLoaRequest,
  Loa,
  DescribeLoaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeLoaRequest,
  output: Loa,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoa",
}));

export type DescribeLocationsError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Lists the Direct Connect locations in the current Amazon Web Services Region. These are the locations that can be selected when calling
 * CreateConnection or CreateInterconnect.
 */
export const describeLocations: API.OperationMethod<
  DescribeLocationsRequest,
  Locations,
  DescribeLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeLocationsRequest,
  output: Locations,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocations",
}));

export type DescribeRouterConfigurationError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Details about the router.
 */
export const describeRouterConfiguration: API.OperationMethod<
  DescribeRouterConfigurationRequest,
  DescribeRouterConfigurationResponse,
  DescribeRouterConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeRouterConfigurationRequest,
  output: DescribeRouterConfigurationResponse,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRouterConfiguration",
}));

export type DescribeTagsError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Describes the tags associated with the specified Direct Connect resources.
 */
export const describeTags: API.OperationMethod<
  DescribeTagsRequest,
  DescribeTagsResponse,
  DescribeTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTagsRequest,
  output: DescribeTagsResponse,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTags",
}));

export type DescribeVirtualGatewaysError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deprecated. Use `DescribeVpnGateways` instead. See DescribeVPNGateways in the *Amazon Elastic Compute Cloud API Reference*.
 *
 * Lists the virtual private gateways owned by the Amazon Web Services account.
 *
 * You can create one or more Direct Connect private virtual interfaces linked to a virtual private gateway.
 */
export const describeVirtualGateways: API.OperationMethod<
  DescribeVirtualGatewaysRequest,
  VirtualGateways,
  DescribeVirtualGatewaysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeVirtualGatewaysRequest,
  output: VirtualGateways,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVirtualGateways",
}));

export type DescribeVirtualInterfacesError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Displays all virtual interfaces for an Amazon Web Services account. Virtual interfaces deleted fewer
 * than 15 minutes before you make the request are also returned. If you specify a
 * connection ID, only the virtual interfaces associated with the connection are returned.
 * If you specify a virtual interface ID, then only a single virtual interface is returned.
 *
 * A virtual interface (VLAN) transmits the traffic between the Direct Connect location and the customer network.
 *
 * - If you're using an `asn`, the response includes the ASN value in both the `asn` and `asnLong` fields.
 *
 * - If you're using `asnLong`, the response returns a value of `0` (zero) for the `asn` attribute because it exceeds the highest ASN value of 2,147,483,647 that it can support
 */
export const describeVirtualInterfaces: API.OperationMethod<
  DescribeVirtualInterfacesRequest,
  VirtualInterfaces,
  DescribeVirtualInterfacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeVirtualInterfacesRequest,
  output: VirtualInterfaces,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVirtualInterfaces",
}));

export type DisassociateConnectionFromLagError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Disassociates a connection from a link aggregation group (LAG). The connection is
 * interrupted and re-established as a standalone connection (the connection is not
 * deleted; to delete the connection, use the DeleteConnection request).
 * If the LAG has associated virtual interfaces or hosted connections, they remain
 * associated with the LAG. A disassociated connection owned by an Direct Connect Partner is
 * automatically converted to an interconnect.
 *
 * If disassociating the connection would cause the LAG to fall below its setting for
 * minimum number of operational connections, the request fails, except when it's the last
 * member of the LAG. If all connections are disassociated, the LAG continues to exist as
 * an empty LAG with no physical connections.
 */
export const disassociateConnectionFromLag: API.OperationMethod<
  DisassociateConnectionFromLagRequest,
  Connection,
  DisassociateConnectionFromLagError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateConnectionFromLagRequest,
  output: Connection,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateConnectionFromLag",
}));

export type DisassociateMacSecKeyError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Removes the association between a MAC Security (MACsec) security key and a Direct Connect connection.
 */
export const disassociateMacSecKey: API.OperationMethod<
  DisassociateMacSecKeyRequest,
  DisassociateMacSecKeyResponse,
  DisassociateMacSecKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateMacSecKeyRequest,
  output: DisassociateMacSecKeyResponse,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateMacSecKey",
}));

export type ListVirtualInterfaceRoutesError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Lists the routes for the specified virtual interface.
 *
 * Use the `routeDirection` filter to control which routes are returned:
 *
 * - `accepted`: routes received from the customer network over the virtual interface.
 *
 * - `advertised`: routes advertised to the customer network over the virtual interface.
 */
export const listVirtualInterfaceRoutes: API.OperationMethod<
  ListVirtualInterfaceRoutesRequest,
  ListVirtualInterfaceRoutesResponse,
  ListVirtualInterfaceRoutesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListVirtualInterfaceRoutesRequest,
  output: ListVirtualInterfaceRoutesResponse,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVirtualInterfaceRoutes",
}));

export type ListVirtualInterfaceTestHistoryError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Lists the virtual interface failover test history.
 */
export const listVirtualInterfaceTestHistory: API.OperationMethod<
  ListVirtualInterfaceTestHistoryRequest,
  ListVirtualInterfaceTestHistoryResponse,
  ListVirtualInterfaceTestHistoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListVirtualInterfaceTestHistoryRequest,
  output: ListVirtualInterfaceTestHistoryResponse,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVirtualInterfaceTestHistory",
}));

export type StartBgpFailoverTestError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Starts the virtual interface failover test that verifies your configuration meets your resiliency requirements by placing the BGP peering session in the DOWN state. You can then send traffic to verify that there are no outages.
 *
 * You can run the test on public, private, transit, and hosted virtual interfaces.
 *
 * You can use ListVirtualInterfaceTestHistory to view the virtual interface test history.
 *
 * If you need to stop the test before the test interval completes, use StopBgpFailoverTest.
 */
export const startBgpFailoverTest: API.OperationMethod<
  StartBgpFailoverTestRequest,
  StartBgpFailoverTestResponse,
  StartBgpFailoverTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartBgpFailoverTestRequest,
  output: StartBgpFailoverTestResponse,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartBgpFailoverTest",
}));

export type StopBgpFailoverTestError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Stops the virtual interface failover test.
 */
export const stopBgpFailoverTest: API.OperationMethod<
  StopBgpFailoverTestRequest,
  StopBgpFailoverTestResponse,
  StopBgpFailoverTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopBgpFailoverTestRequest,
  output: StopBgpFailoverTestResponse,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopBgpFailoverTest",
}));

export type TagResourceError =
  | DirectConnectClientException
  | DirectConnectServerException
  | DuplicateTagKeysException
  | TooManyTagsException
  | CommonErrors;
/**
 * Adds the specified tags to the specified Direct Connect resource. Each resource can have a maximum of 50 tags.
 *
 * Each tag consists of a key and an optional value. If a tag with the same key is already associated with the resource, this action updates its value.
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
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Removes one or more tags from the specified Direct Connect resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateConnectionError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Updates the Direct Connect connection configuration.
 *
 * You can update the following parameters for a connection:
 *
 * - The connection name
 *
 * - The connection's MAC Security (MACsec) encryption mode.
 */
export const updateConnection: API.OperationMethod<
  UpdateConnectionRequest,
  Connection,
  UpdateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConnectionRequest,
  output: Connection,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnection",
}));

export type UpdateDirectConnectGatewayError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Updates the name of a current Direct Connect gateway.
 */
export const updateDirectConnectGateway: API.OperationMethod<
  UpdateDirectConnectGatewayRequest,
  UpdateDirectConnectGatewayResponse,
  UpdateDirectConnectGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDirectConnectGatewayRequest,
  output: UpdateDirectConnectGatewayResponse,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDirectConnectGateway",
}));

export type UpdateDirectConnectGatewayAssociationError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Updates the specified attributes of the Direct Connect gateway association.
 *
 * Add or remove prefixes from the association.
 */
export const updateDirectConnectGatewayAssociation: API.OperationMethod<
  UpdateDirectConnectGatewayAssociationRequest,
  UpdateDirectConnectGatewayAssociationResult,
  UpdateDirectConnectGatewayAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDirectConnectGatewayAssociationRequest,
  output: UpdateDirectConnectGatewayAssociationResult,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDirectConnectGatewayAssociation",
}));

export type UpdateLagError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Updates the attributes of the specified link aggregation group (LAG).
 *
 * You can update the following LAG attributes:
 *
 * - The name of the LAG.
 *
 * - The value for the minimum number of connections that must be operational
 * for the LAG itself to be operational.
 *
 * - The LAG's MACsec encryption mode.
 *
 * Amazon Web Services assigns this value to each connection which is part of the LAG.
 *
 * - The tags
 *
 * If you adjust the threshold value for the minimum number of operational connections, ensure
 * that the new value does not cause the LAG to fall below the threshold and become
 * non-operational.
 */
export const updateLag: API.OperationMethod<
  UpdateLagRequest,
  Lag,
  UpdateLagError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLagRequest,
  output: Lag,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLag",
}));

export type UpdateVirtualInterfaceAttributesError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Updates the specified attributes of the specified virtual private interface.
 *
 * Setting the MTU of a virtual interface to 8500 (jumbo frames) can cause an update to
 * the underlying physical connection if it wasn't updated to support jumbo frames. Updating
 * the connection disrupts network connectivity for all virtual interfaces associated with
 * the connection for up to 30 seconds. To check whether your connection supports jumbo
 * frames, call DescribeConnections. To check whether your virtual
 * interface supports jumbo frames, call DescribeVirtualInterfaces.
 */
export const updateVirtualInterfaceAttributes: API.OperationMethod<
  UpdateVirtualInterfaceAttributesRequest,
  VirtualInterface,
  UpdateVirtualInterfaceAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateVirtualInterfaceAttributesRequest,
  output: VirtualInterface,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVirtualInterfaceAttributes",
}));
