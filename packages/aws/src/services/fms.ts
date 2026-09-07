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
  sdkId: "FMS",
  serviceShapeName: "AWSFMS_20180101",
});
const auth = T.AwsAuthSigv4({ name: "fms" });
const ver = T.ServiceVersion("2018-01-01");
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
              `https://fms-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://fms-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://fms.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://fms.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class InternalErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalErrorException>()(
    "InternalErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withServerError) {}
export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()(
    "InvalidInputException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidOperationException
  extends /*@__PURE__*/ S.TaggedError<InvalidOperationException>()(
    "InvalidOperationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidTypeException
  extends /*@__PURE__*/ S.TaggedError<InvalidTypeException>()(
    "InvalidTypeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type AWSAccountId = string;
export interface AssociateAdminAccountRequest {
  AdminAccount: string;
}
export const AssociateAdminAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AdminAccount: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateAdminAccountRequest",
}) as any as S.Schema<AssociateAdminAccountRequest>;
export interface AssociateAdminAccountResponse {}
export const AssociateAdminAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateAdminAccountResponse",
}) as any as S.Schema<AssociateAdminAccountResponse>;
export type ThirdPartyFirewall =
  | "PALO_ALTO_NETWORKS_CLOUD_NGFW"
  | "FORTIGATE_CLOUD_NATIVE_FIREWALL"
  | (string & {});
export const ThirdPartyFirewall = S.String;

export interface AssociateThirdPartyFirewallRequest {
  ThirdPartyFirewall: ThirdPartyFirewall;
}
export const AssociateThirdPartyFirewallRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ThirdPartyFirewall: ThirdPartyFirewall }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateThirdPartyFirewallRequest",
}) as any as S.Schema<AssociateThirdPartyFirewallRequest>;
export type ThirdPartyFirewallAssociationStatus =
  | "ONBOARDING"
  | "ONBOARD_COMPLETE"
  | "OFFBOARDING"
  | "OFFBOARD_COMPLETE"
  | "NOT_EXIST"
  | (string & {});
export const ThirdPartyFirewallAssociationStatus = S.String;

export interface AssociateThirdPartyFirewallResponse {
  ThirdPartyFirewallStatus?: ThirdPartyFirewallAssociationStatus;
}
export const AssociateThirdPartyFirewallResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ThirdPartyFirewallStatus: S.optional(ThirdPartyFirewallAssociationStatus),
  }),
).annotate({
  identifier: "AssociateThirdPartyFirewallResponse",
}) as any as S.Schema<AssociateThirdPartyFirewallResponse>;
export type Identifier = string;
export type IdentifierList = string[];
export const IdentifierList = /*@__PURE__*/ S.Array(S.String);
export interface BatchAssociateResourceRequest {
  ResourceSetIdentifier: string;
  Items: string[];
}
export const BatchAssociateResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceSetIdentifier: S.String, Items: IdentifierList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchAssociateResourceRequest",
}) as any as S.Schema<BatchAssociateResourceRequest>;
export type FailedItemReason =
  | "NOT_VALID_ARN"
  | "NOT_VALID_PARTITION"
  | "NOT_VALID_REGION"
  | "NOT_VALID_SERVICE"
  | "NOT_VALID_RESOURCE_TYPE"
  | "NOT_VALID_ACCOUNT_ID"
  | (string & {});
export const FailedItemReason = S.String;

export interface FailedItem {
  URI?: string;
  Reason?: FailedItemReason;
}
export const FailedItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ URI: S.optional(S.String), Reason: S.optional(FailedItemReason) }),
).annotate({ identifier: "FailedItem" }) as any as S.Schema<FailedItem>;
export type FailedItemList = FailedItem[];
export const FailedItemList = /*@__PURE__*/ S.Array(FailedItem);
export interface BatchAssociateResourceResponse {
  ResourceSetIdentifier: string;
  FailedItems: FailedItem[];
}
export const BatchAssociateResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceSetIdentifier: S.String, FailedItems: FailedItemList }),
).annotate({
  identifier: "BatchAssociateResourceResponse",
}) as any as S.Schema<BatchAssociateResourceResponse>;
export interface BatchDisassociateResourceRequest {
  ResourceSetIdentifier: string;
  Items: string[];
}
export const BatchDisassociateResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceSetIdentifier: S.String, Items: IdentifierList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchDisassociateResourceRequest",
}) as any as S.Schema<BatchDisassociateResourceRequest>;
export interface BatchDisassociateResourceResponse {
  ResourceSetIdentifier: string;
  FailedItems: FailedItem[];
}
export const BatchDisassociateResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceSetIdentifier: S.String, FailedItems: FailedItemList }),
).annotate({
  identifier: "BatchDisassociateResourceResponse",
}) as any as S.Schema<BatchDisassociateResourceResponse>;
export type ListId = string;
export interface DeleteAppsListRequest {
  ListId: string;
}
export const DeleteAppsListRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ListId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteAppsListRequest",
}) as any as S.Schema<DeleteAppsListRequest>;
export interface DeleteAppsListResponse {}
export const DeleteAppsListResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAppsListResponse",
}) as any as S.Schema<DeleteAppsListResponse>;
export interface DeleteNotificationChannelRequest {}
export const DeleteNotificationChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteNotificationChannelRequest",
}) as any as S.Schema<DeleteNotificationChannelRequest>;
export interface DeleteNotificationChannelResponse {}
export const DeleteNotificationChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteNotificationChannelResponse",
}) as any as S.Schema<DeleteNotificationChannelResponse>;
export type PolicyId = string;
export interface DeletePolicyRequest {
  PolicyId: string;
  DeleteAllPolicyResources?: boolean;
}
export const DeletePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyId: S.String,
    DeleteAllPolicyResources: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeletePolicyRequest",
}) as any as S.Schema<DeletePolicyRequest>;
export interface DeletePolicyResponse {}
export const DeletePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePolicyResponse",
}) as any as S.Schema<DeletePolicyResponse>;
export interface DeleteProtocolsListRequest {
  ListId: string;
}
export const DeleteProtocolsListRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ListId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteProtocolsListRequest",
}) as any as S.Schema<DeleteProtocolsListRequest>;
export interface DeleteProtocolsListResponse {}
export const DeleteProtocolsListResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteProtocolsListResponse",
}) as any as S.Schema<DeleteProtocolsListResponse>;
export type Base62Id = string;
export interface DeleteResourceSetRequest {
  Identifier: string;
}
export const DeleteResourceSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteResourceSetRequest",
}) as any as S.Schema<DeleteResourceSetRequest>;
export interface DeleteResourceSetResponse {}
export const DeleteResourceSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteResourceSetResponse",
}) as any as S.Schema<DeleteResourceSetResponse>;
export interface DisassociateAdminAccountRequest {}
export const DisassociateAdminAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DisassociateAdminAccountRequest",
}) as any as S.Schema<DisassociateAdminAccountRequest>;
export interface DisassociateAdminAccountResponse {}
export const DisassociateAdminAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateAdminAccountResponse",
}) as any as S.Schema<DisassociateAdminAccountResponse>;
export interface DisassociateThirdPartyFirewallRequest {
  ThirdPartyFirewall: ThirdPartyFirewall;
}
export const DisassociateThirdPartyFirewallRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ ThirdPartyFirewall: ThirdPartyFirewall }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DisassociateThirdPartyFirewallRequest",
}) as any as S.Schema<DisassociateThirdPartyFirewallRequest>;
export interface DisassociateThirdPartyFirewallResponse {
  ThirdPartyFirewallStatus?: ThirdPartyFirewallAssociationStatus;
}
export const DisassociateThirdPartyFirewallResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ThirdPartyFirewallStatus: S.optional(ThirdPartyFirewallAssociationStatus),
    }),
).annotate({
  identifier: "DisassociateThirdPartyFirewallResponse",
}) as any as S.Schema<DisassociateThirdPartyFirewallResponse>;
export interface GetAdminAccountRequest {}
export const GetAdminAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAdminAccountRequest",
}) as any as S.Schema<GetAdminAccountRequest>;
export type AccountRoleStatus =
  | "READY"
  | "CREATING"
  | "PENDING_DELETION"
  | "DELETING"
  | "DELETED"
  | (string & {});
export const AccountRoleStatus = S.String;

export interface GetAdminAccountResponse {
  AdminAccount?: string;
  RoleStatus?: AccountRoleStatus;
}
export const GetAdminAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdminAccount: S.optional(S.String),
    RoleStatus: S.optional(AccountRoleStatus),
  }),
).annotate({
  identifier: "GetAdminAccountResponse",
}) as any as S.Schema<GetAdminAccountResponse>;
export interface GetAdminScopeRequest {
  AdminAccount: string;
}
export const GetAdminScopeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AdminAccount: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAdminScopeRequest",
}) as any as S.Schema<GetAdminScopeRequest>;
export type AccountIdList = string[];
export const AccountIdList = /*@__PURE__*/ S.Array(S.String);
export interface AccountScope {
  Accounts?: string[];
  AllAccountsEnabled?: boolean;
  ExcludeSpecifiedAccounts?: boolean;
}
export const AccountScope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Accounts: S.optional(AccountIdList),
    AllAccountsEnabled: S.optional(S.Boolean),
    ExcludeSpecifiedAccounts: S.optional(S.Boolean),
  }),
).annotate({ identifier: "AccountScope" }) as any as S.Schema<AccountScope>;
export type OrganizationalUnitId = string;
export type OrganizationalUnitIdList = string[];
export const OrganizationalUnitIdList = /*@__PURE__*/ S.Array(S.String);
export interface OrganizationalUnitScope {
  OrganizationalUnits?: string[];
  AllOrganizationalUnitsEnabled?: boolean;
  ExcludeSpecifiedOrganizationalUnits?: boolean;
}
export const OrganizationalUnitScope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationalUnits: S.optional(OrganizationalUnitIdList),
    AllOrganizationalUnitsEnabled: S.optional(S.Boolean),
    ExcludeSpecifiedOrganizationalUnits: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "OrganizationalUnitScope",
}) as any as S.Schema<OrganizationalUnitScope>;
export type AWSRegion = string;
export type AWSRegionList = string[];
export const AWSRegionList = /*@__PURE__*/ S.Array(S.String);
export interface RegionScope {
  Regions?: string[];
  AllRegionsEnabled?: boolean;
}
export const RegionScope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Regions: S.optional(AWSRegionList),
    AllRegionsEnabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "RegionScope" }) as any as S.Schema<RegionScope>;
export type SecurityServiceType =
  | "WAF"
  | "WAFV2"
  | "SHIELD_ADVANCED"
  | "SECURITY_GROUPS_COMMON"
  | "SECURITY_GROUPS_CONTENT_AUDIT"
  | "SECURITY_GROUPS_USAGE_AUDIT"
  | "NETWORK_FIREWALL"
  | "DNS_FIREWALL"
  | "THIRD_PARTY_FIREWALL"
  | "IMPORT_NETWORK_FIREWALL"
  | "NETWORK_ACL_COMMON"
  | (string & {});
export const SecurityServiceType = S.String;

export type SecurityServiceTypeList = SecurityServiceType[];
export const SecurityServiceTypeList =
  /*@__PURE__*/ S.Array(SecurityServiceType);
export interface PolicyTypeScope {
  PolicyTypes?: SecurityServiceType[];
  AllPolicyTypesEnabled?: boolean;
}
export const PolicyTypeScope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyTypes: S.optional(SecurityServiceTypeList),
    AllPolicyTypesEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "PolicyTypeScope",
}) as any as S.Schema<PolicyTypeScope>;
export interface AdminScope {
  AccountScope?: AccountScope;
  OrganizationalUnitScope?: OrganizationalUnitScope;
  RegionScope?: RegionScope;
  PolicyTypeScope?: PolicyTypeScope;
}
export const AdminScope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountScope: S.optional(AccountScope),
    OrganizationalUnitScope: S.optional(OrganizationalUnitScope),
    RegionScope: S.optional(RegionScope),
    PolicyTypeScope: S.optional(PolicyTypeScope),
  }),
).annotate({ identifier: "AdminScope" }) as any as S.Schema<AdminScope>;
export type OrganizationStatus =
  | "ONBOARDING"
  | "ONBOARDING_COMPLETE"
  | "OFFBOARDING"
  | "OFFBOARDING_COMPLETE"
  | (string & {});
export const OrganizationStatus = S.String;

export interface GetAdminScopeResponse {
  AdminScope?: AdminScope;
  Status?: OrganizationStatus;
}
export const GetAdminScopeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdminScope: S.optional(AdminScope),
    Status: S.optional(OrganizationStatus),
  }),
).annotate({
  identifier: "GetAdminScopeResponse",
}) as any as S.Schema<GetAdminScopeResponse>;
export interface GetAppsListRequest {
  ListId: string;
  DefaultList?: boolean;
}
export const GetAppsListRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ListId: S.String, DefaultList: S.optional(S.Boolean) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAppsListRequest",
}) as any as S.Schema<GetAppsListRequest>;
export type ResourceName = string;
export type UpdateToken = string;
export type Protocol = string;
export type IPPortNumber = number;
export interface App {
  AppName: string;
  Protocol: string;
  Port: number;
}
export const App = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AppName: S.String, Protocol: S.String, Port: S.Number }),
).annotate({ identifier: "App" }) as any as S.Schema<App>;
export type AppsList = App[];
export const AppsList = /*@__PURE__*/ S.Array(App);
export type PreviousListVersion = string;
export type PreviousAppsList = { [key: string]: App[] | undefined };
export const PreviousAppsList = /*@__PURE__*/ S.Record(
  S.String,
  AppsList.pipe(S.optional),
);
export interface AppsListData {
  ListId?: string;
  ListName: string;
  ListUpdateToken?: string;
  CreateTime?: Date;
  LastUpdateTime?: Date;
  AppsList: App[];
  PreviousAppsList?: { [key: string]: App[] | undefined };
}
export const AppsListData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ListId: S.optional(S.String),
    ListName: S.String,
    ListUpdateToken: S.optional(S.String),
    CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    AppsList: AppsList,
    PreviousAppsList: S.optional(PreviousAppsList),
  }),
).annotate({ identifier: "AppsListData" }) as any as S.Schema<AppsListData>;
export type ResourceArn = string;
export interface GetAppsListResponse {
  AppsList?: AppsListData;
  AppsListArn?: string;
}
export const GetAppsListResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppsList: S.optional(AppsListData),
    AppsListArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetAppsListResponse",
}) as any as S.Schema<GetAppsListResponse>;
export interface GetComplianceDetailRequest {
  PolicyId: string;
  MemberAccount: string;
}
export const GetComplianceDetailRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PolicyId: S.String, MemberAccount: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetComplianceDetailRequest",
}) as any as S.Schema<GetComplianceDetailRequest>;
export type ResourceId = string;
export type ViolationReason =
  | "WEB_ACL_MISSING_RULE_GROUP"
  | "RESOURCE_MISSING_WEB_ACL"
  | "RESOURCE_INCORRECT_WEB_ACL"
  | "RESOURCE_MISSING_SHIELD_PROTECTION"
  | "RESOURCE_MISSING_WEB_ACL_OR_SHIELD_PROTECTION"
  | "RESOURCE_MISSING_SECURITY_GROUP"
  | "RESOURCE_VIOLATES_AUDIT_SECURITY_GROUP"
  | "SECURITY_GROUP_UNUSED"
  | "SECURITY_GROUP_REDUNDANT"
  | "FMS_CREATED_SECURITY_GROUP_EDITED"
  | "MISSING_FIREWALL"
  | "MISSING_FIREWALL_SUBNET_IN_AZ"
  | "MISSING_EXPECTED_ROUTE_TABLE"
  | "NETWORK_FIREWALL_POLICY_MODIFIED"
  | "FIREWALL_SUBNET_IS_OUT_OF_SCOPE"
  | "INTERNET_GATEWAY_MISSING_EXPECTED_ROUTE"
  | "FIREWALL_SUBNET_MISSING_EXPECTED_ROUTE"
  | "UNEXPECTED_FIREWALL_ROUTES"
  | "UNEXPECTED_TARGET_GATEWAY_ROUTES"
  | "TRAFFIC_INSPECTION_CROSSES_AZ_BOUNDARY"
  | "INVALID_ROUTE_CONFIGURATION"
  | "MISSING_TARGET_GATEWAY"
  | "INTERNET_TRAFFIC_NOT_INSPECTED"
  | "BLACK_HOLE_ROUTE_DETECTED"
  | "BLACK_HOLE_ROUTE_DETECTED_IN_FIREWALL_SUBNET"
  | "RESOURCE_MISSING_DNS_FIREWALL"
  | "ROUTE_HAS_OUT_OF_SCOPE_ENDPOINT"
  | "FIREWALL_SUBNET_MISSING_VPCE_ENDPOINT"
  | "INVALID_NETWORK_ACL_ENTRY"
  | "WEB_ACL_CONFIGURATION_OR_SCOPE_OF_USE"
  | (string & {});
export const ViolationReason = S.String;

export type ResourceType = string;
export type LengthBoundedString = string;
export type ComplianceViolatorMetadata = { [key: string]: string | undefined };
export const ComplianceViolatorMetadata = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ComplianceViolator {
  ResourceId?: string;
  ViolationReason?: ViolationReason;
  ResourceType?: string;
  Metadata?: { [key: string]: string | undefined };
}
export const ComplianceViolator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.optional(S.String),
    ViolationReason: S.optional(ViolationReason),
    ResourceType: S.optional(S.String),
    Metadata: S.optional(ComplianceViolatorMetadata),
  }),
).annotate({
  identifier: "ComplianceViolator",
}) as any as S.Schema<ComplianceViolator>;
export type ComplianceViolators = ComplianceViolator[];
export const ComplianceViolators = /*@__PURE__*/ S.Array(ComplianceViolator);
export type DependentServiceName =
  | "AWSCONFIG"
  | "AWSWAF"
  | "AWSSHIELD_ADVANCED"
  | "AWSVPC"
  | (string & {});
export const DependentServiceName = S.String;

export type DetailedInfo = string;
export type IssueInfoMap = { [key in DependentServiceName]?: string };
export const IssueInfoMap = /*@__PURE__*/ S.Record(
  DependentServiceName,
  S.String.pipe(S.optional),
);
export interface PolicyComplianceDetail {
  PolicyOwner?: string;
  PolicyId?: string;
  MemberAccount?: string;
  Violators?: ComplianceViolator[];
  EvaluationLimitExceeded?: boolean;
  ExpiredAt?: Date;
  IssueInfoMap?: { [key: string]: string | undefined };
}
export const PolicyComplianceDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyOwner: S.optional(S.String),
    PolicyId: S.optional(S.String),
    MemberAccount: S.optional(S.String),
    Violators: S.optional(ComplianceViolators),
    EvaluationLimitExceeded: S.optional(S.Boolean),
    ExpiredAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    IssueInfoMap: S.optional(IssueInfoMap),
  }),
).annotate({
  identifier: "PolicyComplianceDetail",
}) as any as S.Schema<PolicyComplianceDetail>;
export interface GetComplianceDetailResponse {
  PolicyComplianceDetail?: PolicyComplianceDetail;
}
export const GetComplianceDetailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PolicyComplianceDetail: S.optional(PolicyComplianceDetail) }),
).annotate({
  identifier: "GetComplianceDetailResponse",
}) as any as S.Schema<GetComplianceDetailResponse>;
export interface GetNotificationChannelRequest {}
export const GetNotificationChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetNotificationChannelRequest",
}) as any as S.Schema<GetNotificationChannelRequest>;
export interface GetNotificationChannelResponse {
  SnsTopicArn?: string;
  SnsRoleName?: string;
}
export const GetNotificationChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnsTopicArn: S.optional(S.String),
    SnsRoleName: S.optional(S.String),
  }),
).annotate({
  identifier: "GetNotificationChannelResponse",
}) as any as S.Schema<GetNotificationChannelResponse>;
export interface GetPolicyRequest {
  PolicyId: string;
}
export const GetPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PolicyId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetPolicyRequest",
}) as any as S.Schema<GetPolicyRequest>;
export type PolicyUpdateToken = string;
export type ManagedServiceData = string;
export type FirewallDeploymentModel =
  | "CENTRALIZED"
  | "DISTRIBUTED"
  | (string & {});
export const FirewallDeploymentModel = S.String;

export interface NetworkFirewallPolicy {
  FirewallDeploymentModel?: FirewallDeploymentModel;
}
export const NetworkFirewallPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FirewallDeploymentModel: S.optional(FirewallDeploymentModel) }),
).annotate({
  identifier: "NetworkFirewallPolicy",
}) as any as S.Schema<NetworkFirewallPolicy>;
export interface ThirdPartyFirewallPolicy {
  FirewallDeploymentModel?: FirewallDeploymentModel;
}
export const ThirdPartyFirewallPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FirewallDeploymentModel: S.optional(FirewallDeploymentModel) }),
).annotate({
  identifier: "ThirdPartyFirewallPolicy",
}) as any as S.Schema<ThirdPartyFirewallPolicy>;
export type IntegerObject = number;
export interface NetworkAclIcmpTypeCode {
  Code?: number;
  Type?: number;
}
export const NetworkAclIcmpTypeCode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Code: S.optional(S.Number), Type: S.optional(S.Number) }),
).annotate({
  identifier: "NetworkAclIcmpTypeCode",
}) as any as S.Schema<NetworkAclIcmpTypeCode>;
export type IPPortNumberInteger = number;
export interface NetworkAclPortRange {
  From?: number;
  To?: number;
}
export const NetworkAclPortRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ From: S.optional(S.Number), To: S.optional(S.Number) }),
).annotate({
  identifier: "NetworkAclPortRange",
}) as any as S.Schema<NetworkAclPortRange>;
export type LengthBoundedNonEmptyString = string;
export type NetworkAclRuleAction = "allow" | "deny" | (string & {});
export const NetworkAclRuleAction = S.String;

export interface NetworkAclEntry {
  IcmpTypeCode?: NetworkAclIcmpTypeCode;
  Protocol: string;
  PortRange?: NetworkAclPortRange;
  CidrBlock?: string;
  Ipv6CidrBlock?: string;
  RuleAction: NetworkAclRuleAction;
  Egress: boolean;
}
export const NetworkAclEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IcmpTypeCode: S.optional(NetworkAclIcmpTypeCode),
    Protocol: S.String,
    PortRange: S.optional(NetworkAclPortRange),
    CidrBlock: S.optional(S.String),
    Ipv6CidrBlock: S.optional(S.String),
    RuleAction: NetworkAclRuleAction,
    Egress: S.Boolean,
  }),
).annotate({
  identifier: "NetworkAclEntry",
}) as any as S.Schema<NetworkAclEntry>;
export type NetworkAclEntries = NetworkAclEntry[];
export const NetworkAclEntries = /*@__PURE__*/ S.Array(NetworkAclEntry);
export interface NetworkAclEntrySet {
  FirstEntries?: NetworkAclEntry[];
  ForceRemediateForFirstEntries: boolean;
  LastEntries?: NetworkAclEntry[];
  ForceRemediateForLastEntries: boolean;
}
export const NetworkAclEntrySet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirstEntries: S.optional(NetworkAclEntries),
    ForceRemediateForFirstEntries: S.Boolean,
    LastEntries: S.optional(NetworkAclEntries),
    ForceRemediateForLastEntries: S.Boolean,
  }),
).annotate({
  identifier: "NetworkAclEntrySet",
}) as any as S.Schema<NetworkAclEntrySet>;
export interface NetworkAclCommonPolicy {
  NetworkAclEntrySet: NetworkAclEntrySet;
}
export const NetworkAclCommonPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NetworkAclEntrySet: NetworkAclEntrySet }),
).annotate({
  identifier: "NetworkAclCommonPolicy",
}) as any as S.Schema<NetworkAclCommonPolicy>;
export interface PolicyOption {
  NetworkFirewallPolicy?: NetworkFirewallPolicy;
  ThirdPartyFirewallPolicy?: ThirdPartyFirewallPolicy;
  NetworkAclCommonPolicy?: NetworkAclCommonPolicy;
}
export const PolicyOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetworkFirewallPolicy: S.optional(NetworkFirewallPolicy),
    ThirdPartyFirewallPolicy: S.optional(ThirdPartyFirewallPolicy),
    NetworkAclCommonPolicy: S.optional(NetworkAclCommonPolicy),
  }),
).annotate({ identifier: "PolicyOption" }) as any as S.Schema<PolicyOption>;
export interface SecurityServicePolicyData {
  Type: SecurityServiceType;
  ManagedServiceData?: string;
  PolicyOption?: PolicyOption;
}
export const SecurityServicePolicyData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: SecurityServiceType,
    ManagedServiceData: S.optional(S.String),
    PolicyOption: S.optional(PolicyOption),
  }),
).annotate({
  identifier: "SecurityServicePolicyData",
}) as any as S.Schema<SecurityServicePolicyData>;
export type ResourceTypeList = string[];
export const ResourceTypeList = /*@__PURE__*/ S.Array(S.String);
export type ResourceTagKey = string;
export type ResourceTagValue = string;
export interface ResourceTag {
  Key: string;
  Value?: string;
}
export const ResourceTag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.optional(S.String) }),
).annotate({ identifier: "ResourceTag" }) as any as S.Schema<ResourceTag>;
export type ResourceTags = ResourceTag[];
export const ResourceTags = /*@__PURE__*/ S.Array(ResourceTag);
export type CustomerPolicyScopeIdType = "ACCOUNT" | "ORG_UNIT" | (string & {});
export const CustomerPolicyScopeIdType = S.String;

export type CustomerPolicyScopeId = string;
export type CustomerPolicyScopeIdList = string[];
export const CustomerPolicyScopeIdList = /*@__PURE__*/ S.Array(S.String);
export type CustomerPolicyScopeMap = {
  [key in CustomerPolicyScopeIdType]?: string[];
};
export const CustomerPolicyScopeMap = /*@__PURE__*/ S.Record(
  CustomerPolicyScopeIdType,
  CustomerPolicyScopeIdList.pipe(S.optional),
);
export type ResourceSetIds = string[];
export const ResourceSetIds = /*@__PURE__*/ S.Array(S.String);
export type ResourceDescription = string;
export type CustomerPolicyStatus =
  | "ACTIVE"
  | "OUT_OF_ADMIN_SCOPE"
  | (string & {});
export const CustomerPolicyStatus = S.String;

export type ResourceTagLogicalOperator = "AND" | "OR" | (string & {});
export const ResourceTagLogicalOperator = S.String;

export interface Policy {
  PolicyId?: string;
  PolicyName: string;
  PolicyUpdateToken?: string;
  SecurityServicePolicyData: SecurityServicePolicyData;
  ResourceType: string;
  ResourceTypeList?: string[];
  ResourceTags?: ResourceTag[];
  ExcludeResourceTags: boolean;
  RemediationEnabled: boolean;
  DeleteUnusedFMManagedResources?: boolean;
  IncludeMap?: { [key: string]: string[] | undefined };
  ExcludeMap?: { [key: string]: string[] | undefined };
  ResourceSetIds?: string[];
  PolicyDescription?: string;
  PolicyStatus?: CustomerPolicyStatus;
  ResourceTagLogicalOperator?: ResourceTagLogicalOperator;
}
export const Policy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyId: S.optional(S.String),
    PolicyName: S.String,
    PolicyUpdateToken: S.optional(S.String),
    SecurityServicePolicyData: SecurityServicePolicyData,
    ResourceType: S.String,
    ResourceTypeList: S.optional(ResourceTypeList),
    ResourceTags: S.optional(ResourceTags),
    ExcludeResourceTags: S.Boolean,
    RemediationEnabled: S.Boolean,
    DeleteUnusedFMManagedResources: S.optional(S.Boolean),
    IncludeMap: S.optional(CustomerPolicyScopeMap),
    ExcludeMap: S.optional(CustomerPolicyScopeMap),
    ResourceSetIds: S.optional(ResourceSetIds),
    PolicyDescription: S.optional(S.String),
    PolicyStatus: S.optional(CustomerPolicyStatus),
    ResourceTagLogicalOperator: S.optional(ResourceTagLogicalOperator),
  }),
).annotate({ identifier: "Policy" }) as any as S.Schema<Policy>;
export interface GetPolicyResponse {
  Policy?: Policy;
  PolicyArn?: string;
}
export const GetPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policy: S.optional(Policy), PolicyArn: S.optional(S.String) }),
).annotate({
  identifier: "GetPolicyResponse",
}) as any as S.Schema<GetPolicyResponse>;
export type PaginationToken = string;
export type PaginationMaxResults = number;
export interface GetProtectionStatusRequest {
  PolicyId: string;
  MemberAccountId?: string;
  StartTime?: Date;
  EndTime?: Date;
  NextToken?: string;
  MaxResults?: number;
}
export const GetProtectionStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyId: S.String,
    MemberAccountId: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetProtectionStatusRequest",
}) as any as S.Schema<GetProtectionStatusRequest>;
export type ProtectionData = string;
export interface GetProtectionStatusResponse {
  AdminAccountId?: string;
  ServiceType?: SecurityServiceType;
  Data?: string;
  NextToken?: string;
}
export const GetProtectionStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdminAccountId: S.optional(S.String),
    ServiceType: S.optional(SecurityServiceType),
    Data: S.optional(S.String),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetProtectionStatusResponse",
}) as any as S.Schema<GetProtectionStatusResponse>;
export interface GetProtocolsListRequest {
  ListId: string;
  DefaultList?: boolean;
}
export const GetProtocolsListRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ListId: S.String, DefaultList: S.optional(S.Boolean) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetProtocolsListRequest",
}) as any as S.Schema<GetProtocolsListRequest>;
export type ProtocolsList = string[];
export const ProtocolsList = /*@__PURE__*/ S.Array(S.String);
export type PreviousProtocolsList = { [key: string]: string[] | undefined };
export const PreviousProtocolsList = /*@__PURE__*/ S.Record(
  S.String,
  ProtocolsList.pipe(S.optional),
);
export interface ProtocolsListData {
  ListId?: string;
  ListName: string;
  ListUpdateToken?: string;
  CreateTime?: Date;
  LastUpdateTime?: Date;
  ProtocolsList: string[];
  PreviousProtocolsList?: { [key: string]: string[] | undefined };
}
export const ProtocolsListData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ListId: S.optional(S.String),
    ListName: S.String,
    ListUpdateToken: S.optional(S.String),
    CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ProtocolsList: ProtocolsList,
    PreviousProtocolsList: S.optional(PreviousProtocolsList),
  }),
).annotate({
  identifier: "ProtocolsListData",
}) as any as S.Schema<ProtocolsListData>;
export interface GetProtocolsListResponse {
  ProtocolsList?: ProtocolsListData;
  ProtocolsListArn?: string;
}
export const GetProtocolsListResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProtocolsList: S.optional(ProtocolsListData),
    ProtocolsListArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetProtocolsListResponse",
}) as any as S.Schema<GetProtocolsListResponse>;
export interface GetResourceSetRequest {
  Identifier: string;
}
export const GetResourceSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetResourceSetRequest",
}) as any as S.Schema<GetResourceSetRequest>;
export type Name = string;
export type Description = string;
export type ResourceSetStatus = "ACTIVE" | "OUT_OF_ADMIN_SCOPE" | (string & {});
export const ResourceSetStatus = S.String;

export interface ResourceSet {
  Id?: string;
  Name: string;
  Description?: string;
  UpdateToken?: string;
  ResourceTypeList: string[];
  LastUpdateTime?: Date;
  ResourceSetStatus?: ResourceSetStatus;
}
export const ResourceSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.String,
    Description: S.optional(S.String),
    UpdateToken: S.optional(S.String),
    ResourceTypeList: ResourceTypeList,
    LastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ResourceSetStatus: S.optional(ResourceSetStatus),
  }),
).annotate({ identifier: "ResourceSet" }) as any as S.Schema<ResourceSet>;
export interface GetResourceSetResponse {
  ResourceSet: ResourceSet;
  ResourceSetArn: string;
}
export const GetResourceSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceSet: ResourceSet, ResourceSetArn: S.String }),
).annotate({
  identifier: "GetResourceSetResponse",
}) as any as S.Schema<GetResourceSetResponse>;
export interface GetThirdPartyFirewallAssociationStatusRequest {
  ThirdPartyFirewall: ThirdPartyFirewall;
}
export const GetThirdPartyFirewallAssociationStatusRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ThirdPartyFirewall: ThirdPartyFirewall }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "GetThirdPartyFirewallAssociationStatusRequest",
  }) as any as S.Schema<GetThirdPartyFirewallAssociationStatusRequest>;
export type MarketplaceSubscriptionOnboardingStatus =
  | "NO_SUBSCRIPTION"
  | "NOT_COMPLETE"
  | "COMPLETE"
  | (string & {});
export const MarketplaceSubscriptionOnboardingStatus = S.String;

export interface GetThirdPartyFirewallAssociationStatusResponse {
  ThirdPartyFirewallStatus?: ThirdPartyFirewallAssociationStatus;
  MarketplaceOnboardingStatus?: MarketplaceSubscriptionOnboardingStatus;
}
export const GetThirdPartyFirewallAssociationStatusResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ThirdPartyFirewallStatus: S.optional(ThirdPartyFirewallAssociationStatus),
      MarketplaceOnboardingStatus: S.optional(
        MarketplaceSubscriptionOnboardingStatus,
      ),
    }),
  ).annotate({
    identifier: "GetThirdPartyFirewallAssociationStatusResponse",
  }) as any as S.Schema<GetThirdPartyFirewallAssociationStatusResponse>;
export interface GetViolationDetailsRequest {
  PolicyId: string;
  MemberAccount: string;
  ResourceId: string;
  ResourceType: string;
}
export const GetViolationDetailsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyId: S.String,
    MemberAccount: S.String,
    ResourceId: S.String,
    ResourceType: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetViolationDetailsRequest",
}) as any as S.Schema<GetViolationDetailsRequest>;
export type ViolationTarget = string;
export type ReferenceRule = string;
export type TargetViolationReason = string;
export type TargetViolationReasons = string[];
export const TargetViolationReasons = /*@__PURE__*/ S.Array(S.String);
export interface PartialMatch {
  Reference?: string;
  TargetViolationReasons?: string[];
}
export const PartialMatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Reference: S.optional(S.String),
    TargetViolationReasons: S.optional(TargetViolationReasons),
  }),
).annotate({ identifier: "PartialMatch" }) as any as S.Schema<PartialMatch>;
export type PartialMatches = PartialMatch[];
export const PartialMatches = /*@__PURE__*/ S.Array(PartialMatch);
export type RemediationActionType = "REMOVE" | "MODIFY" | (string & {});
export const RemediationActionType = S.String;

export type RemediationActionDescription = string;
export type CIDR = string;
export interface SecurityGroupRuleDescription {
  IPV4Range?: string;
  IPV6Range?: string;
  PrefixListId?: string;
  Protocol?: string;
  FromPort?: number;
  ToPort?: number;
}
export const SecurityGroupRuleDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IPV4Range: S.optional(S.String),
    IPV6Range: S.optional(S.String),
    PrefixListId: S.optional(S.String),
    Protocol: S.optional(S.String),
    FromPort: S.optional(S.Number),
    ToPort: S.optional(S.Number),
  }),
).annotate({
  identifier: "SecurityGroupRuleDescription",
}) as any as S.Schema<SecurityGroupRuleDescription>;
export interface SecurityGroupRemediationAction {
  RemediationActionType?: RemediationActionType;
  Description?: string;
  RemediationResult?: SecurityGroupRuleDescription;
  IsDefaultAction?: boolean;
}
export const SecurityGroupRemediationAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RemediationActionType: S.optional(RemediationActionType),
    Description: S.optional(S.String),
    RemediationResult: S.optional(SecurityGroupRuleDescription),
    IsDefaultAction: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "SecurityGroupRemediationAction",
}) as any as S.Schema<SecurityGroupRemediationAction>;
export type SecurityGroupRemediationActions = SecurityGroupRemediationAction[];
export const SecurityGroupRemediationActions = /*@__PURE__*/ S.Array(
  SecurityGroupRemediationAction,
);
export interface AwsVPCSecurityGroupViolation {
  ViolationTarget?: string;
  ViolationTargetDescription?: string;
  PartialMatches?: PartialMatch[];
  PossibleSecurityGroupRemediationActions?: SecurityGroupRemediationAction[];
}
export const AwsVPCSecurityGroupViolation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ViolationTarget: S.optional(S.String),
    ViolationTargetDescription: S.optional(S.String),
    PartialMatches: S.optional(PartialMatches),
    PossibleSecurityGroupRemediationActions: S.optional(
      SecurityGroupRemediationActions,
    ),
  }),
).annotate({
  identifier: "AwsVPCSecurityGroupViolation",
}) as any as S.Schema<AwsVPCSecurityGroupViolation>;
export type ResourceIdList = string[];
export const ResourceIdList = /*@__PURE__*/ S.Array(S.String);
export interface AwsEc2NetworkInterfaceViolation {
  ViolationTarget?: string;
  ViolatingSecurityGroups?: string[];
}
export const AwsEc2NetworkInterfaceViolation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ViolationTarget: S.optional(S.String),
    ViolatingSecurityGroups: S.optional(ResourceIdList),
  }),
).annotate({
  identifier: "AwsEc2NetworkInterfaceViolation",
}) as any as S.Schema<AwsEc2NetworkInterfaceViolation>;
export type AwsEc2NetworkInterfaceViolations =
  AwsEc2NetworkInterfaceViolation[];
export const AwsEc2NetworkInterfaceViolations = /*@__PURE__*/ S.Array(
  AwsEc2NetworkInterfaceViolation,
);
export interface AwsEc2InstanceViolation {
  ViolationTarget?: string;
  AwsEc2NetworkInterfaceViolations?: AwsEc2NetworkInterfaceViolation[];
}
export const AwsEc2InstanceViolation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ViolationTarget: S.optional(S.String),
    AwsEc2NetworkInterfaceViolations: S.optional(
      AwsEc2NetworkInterfaceViolations,
    ),
  }),
).annotate({
  identifier: "AwsEc2InstanceViolation",
}) as any as S.Schema<AwsEc2InstanceViolation>;
export interface NetworkFirewallMissingFirewallViolation {
  ViolationTarget?: string;
  VPC?: string;
  AvailabilityZone?: string;
  TargetViolationReason?: string;
}
export const NetworkFirewallMissingFirewallViolation = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ViolationTarget: S.optional(S.String),
      VPC: S.optional(S.String),
      AvailabilityZone: S.optional(S.String),
      TargetViolationReason: S.optional(S.String),
    }),
).annotate({
  identifier: "NetworkFirewallMissingFirewallViolation",
}) as any as S.Schema<NetworkFirewallMissingFirewallViolation>;
export interface NetworkFirewallMissingSubnetViolation {
  ViolationTarget?: string;
  VPC?: string;
  AvailabilityZone?: string;
  TargetViolationReason?: string;
}
export const NetworkFirewallMissingSubnetViolation = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ViolationTarget: S.optional(S.String),
      VPC: S.optional(S.String),
      AvailabilityZone: S.optional(S.String),
      TargetViolationReason: S.optional(S.String),
    }),
).annotate({
  identifier: "NetworkFirewallMissingSubnetViolation",
}) as any as S.Schema<NetworkFirewallMissingSubnetViolation>;
export interface NetworkFirewallMissingExpectedRTViolation {
  ViolationTarget?: string;
  VPC?: string;
  AvailabilityZone?: string;
  CurrentRouteTable?: string;
  ExpectedRouteTable?: string;
}
export const NetworkFirewallMissingExpectedRTViolation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ViolationTarget: S.optional(S.String),
      VPC: S.optional(S.String),
      AvailabilityZone: S.optional(S.String),
      CurrentRouteTable: S.optional(S.String),
      ExpectedRouteTable: S.optional(S.String),
    }),
  ).annotate({
    identifier: "NetworkFirewallMissingExpectedRTViolation",
  }) as any as S.Schema<NetworkFirewallMissingExpectedRTViolation>;
export type NetworkFirewallResourceName = string;
export type StatelessRuleGroupPriority = number;
export interface StatelessRuleGroup {
  RuleGroupName?: string;
  ResourceId?: string;
  Priority?: number;
}
export const StatelessRuleGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleGroupName: S.optional(S.String),
    ResourceId: S.optional(S.String),
    Priority: S.optional(S.Number),
  }),
).annotate({
  identifier: "StatelessRuleGroup",
}) as any as S.Schema<StatelessRuleGroup>;
export type StatelessRuleGroupList = StatelessRuleGroup[];
export const StatelessRuleGroupList = /*@__PURE__*/ S.Array(StatelessRuleGroup);
export type NetworkFirewallAction = string;
export type NetworkFirewallActionList = string[];
export const NetworkFirewallActionList = /*@__PURE__*/ S.Array(S.String);
export type PriorityNumber = number;
export type NetworkFirewallOverrideAction = "DROP_TO_ALERT" | (string & {});
export const NetworkFirewallOverrideAction = S.String;

export interface NetworkFirewallStatefulRuleGroupOverride {
  Action?: NetworkFirewallOverrideAction;
}
export const NetworkFirewallStatefulRuleGroupOverride = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Action: S.optional(NetworkFirewallOverrideAction) }),
).annotate({
  identifier: "NetworkFirewallStatefulRuleGroupOverride",
}) as any as S.Schema<NetworkFirewallStatefulRuleGroupOverride>;
export interface StatefulRuleGroup {
  RuleGroupName?: string;
  ResourceId?: string;
  Priority?: number;
  Override?: NetworkFirewallStatefulRuleGroupOverride;
}
export const StatefulRuleGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleGroupName: S.optional(S.String),
    ResourceId: S.optional(S.String),
    Priority: S.optional(S.Number),
    Override: S.optional(NetworkFirewallStatefulRuleGroupOverride),
  }),
).annotate({
  identifier: "StatefulRuleGroup",
}) as any as S.Schema<StatefulRuleGroup>;
export type StatefulRuleGroupList = StatefulRuleGroup[];
export const StatefulRuleGroupList = /*@__PURE__*/ S.Array(StatefulRuleGroup);
export type RuleOrder = "STRICT_ORDER" | "DEFAULT_ACTION_ORDER" | (string & {});
export const RuleOrder = S.String;

export type StreamExceptionPolicy =
  | "DROP"
  | "CONTINUE"
  | "REJECT"
  | "FMS_IGNORE"
  | (string & {});
export const StreamExceptionPolicy = S.String;

export interface StatefulEngineOptions {
  RuleOrder?: RuleOrder;
  StreamExceptionPolicy?: StreamExceptionPolicy;
}
export const StatefulEngineOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleOrder: S.optional(RuleOrder),
    StreamExceptionPolicy: S.optional(StreamExceptionPolicy),
  }),
).annotate({
  identifier: "StatefulEngineOptions",
}) as any as S.Schema<StatefulEngineOptions>;
export interface NetworkFirewallPolicyDescription {
  StatelessRuleGroups?: StatelessRuleGroup[];
  StatelessDefaultActions?: string[];
  StatelessFragmentDefaultActions?: string[];
  StatelessCustomActions?: string[];
  StatefulRuleGroups?: StatefulRuleGroup[];
  StatefulDefaultActions?: string[];
  StatefulEngineOptions?: StatefulEngineOptions;
}
export const NetworkFirewallPolicyDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StatelessRuleGroups: S.optional(StatelessRuleGroupList),
    StatelessDefaultActions: S.optional(NetworkFirewallActionList),
    StatelessFragmentDefaultActions: S.optional(NetworkFirewallActionList),
    StatelessCustomActions: S.optional(NetworkFirewallActionList),
    StatefulRuleGroups: S.optional(StatefulRuleGroupList),
    StatefulDefaultActions: S.optional(NetworkFirewallActionList),
    StatefulEngineOptions: S.optional(StatefulEngineOptions),
  }),
).annotate({
  identifier: "NetworkFirewallPolicyDescription",
}) as any as S.Schema<NetworkFirewallPolicyDescription>;
export interface NetworkFirewallPolicyModifiedViolation {
  ViolationTarget?: string;
  CurrentPolicyDescription?: NetworkFirewallPolicyDescription;
  ExpectedPolicyDescription?: NetworkFirewallPolicyDescription;
}
export const NetworkFirewallPolicyModifiedViolation = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ViolationTarget: S.optional(S.String),
      CurrentPolicyDescription: S.optional(NetworkFirewallPolicyDescription),
      ExpectedPolicyDescription: S.optional(NetworkFirewallPolicyDescription),
    }),
).annotate({
  identifier: "NetworkFirewallPolicyModifiedViolation",
}) as any as S.Schema<NetworkFirewallPolicyModifiedViolation>;
export type DestinationType = "IPV4" | "IPV6" | "PREFIX_LIST" | (string & {});
export const DestinationType = S.String;

export type TargetType =
  | "GATEWAY"
  | "CARRIER_GATEWAY"
  | "INSTANCE"
  | "LOCAL_GATEWAY"
  | "NAT_GATEWAY"
  | "NETWORK_INTERFACE"
  | "VPC_ENDPOINT"
  | "VPC_PEERING_CONNECTION"
  | "EGRESS_ONLY_INTERNET_GATEWAY"
  | "TRANSIT_GATEWAY"
  | (string & {});
export const TargetType = S.String;

export interface Route {
  DestinationType?: DestinationType;
  TargetType?: TargetType;
  Destination?: string;
  Target?: string;
}
export const Route = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DestinationType: S.optional(DestinationType),
    TargetType: S.optional(TargetType),
    Destination: S.optional(S.String),
    Target: S.optional(S.String),
  }),
).annotate({ identifier: "Route" }) as any as S.Schema<Route>;
export type Routes = Route[];
export const Routes = /*@__PURE__*/ S.Array(Route);
export type LengthBoundedStringList = string[];
export const LengthBoundedStringList = /*@__PURE__*/ S.Array(S.String);
export interface ExpectedRoute {
  IpV4Cidr?: string;
  PrefixListId?: string;
  IpV6Cidr?: string;
  ContributingSubnets?: string[];
  AllowedTargets?: string[];
  RouteTableId?: string;
}
export const ExpectedRoute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IpV4Cidr: S.optional(S.String),
    PrefixListId: S.optional(S.String),
    IpV6Cidr: S.optional(S.String),
    ContributingSubnets: S.optional(ResourceIdList),
    AllowedTargets: S.optional(LengthBoundedStringList),
    RouteTableId: S.optional(S.String),
  }),
).annotate({ identifier: "ExpectedRoute" }) as any as S.Schema<ExpectedRoute>;
export type ExpectedRoutes = ExpectedRoute[];
export const ExpectedRoutes = /*@__PURE__*/ S.Array(ExpectedRoute);
export interface NetworkFirewallInternetTrafficNotInspectedViolation {
  SubnetId?: string;
  SubnetAvailabilityZone?: string;
  RouteTableId?: string;
  ViolatingRoutes?: Route[];
  IsRouteTableUsedInDifferentAZ?: boolean;
  CurrentFirewallSubnetRouteTable?: string;
  ExpectedFirewallEndpoint?: string;
  FirewallSubnetId?: string;
  ExpectedFirewallSubnetRoutes?: ExpectedRoute[];
  ActualFirewallSubnetRoutes?: Route[];
  InternetGatewayId?: string;
  CurrentInternetGatewayRouteTable?: string;
  ExpectedInternetGatewayRoutes?: ExpectedRoute[];
  ActualInternetGatewayRoutes?: Route[];
  VpcId?: string;
}
export const NetworkFirewallInternetTrafficNotInspectedViolation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      SubnetId: S.optional(S.String),
      SubnetAvailabilityZone: S.optional(S.String),
      RouteTableId: S.optional(S.String),
      ViolatingRoutes: S.optional(Routes),
      IsRouteTableUsedInDifferentAZ: S.optional(S.Boolean),
      CurrentFirewallSubnetRouteTable: S.optional(S.String),
      ExpectedFirewallEndpoint: S.optional(S.String),
      FirewallSubnetId: S.optional(S.String),
      ExpectedFirewallSubnetRoutes: S.optional(ExpectedRoutes),
      ActualFirewallSubnetRoutes: S.optional(Routes),
      InternetGatewayId: S.optional(S.String),
      CurrentInternetGatewayRouteTable: S.optional(S.String),
      ExpectedInternetGatewayRoutes: S.optional(ExpectedRoutes),
      ActualInternetGatewayRoutes: S.optional(Routes),
      VpcId: S.optional(S.String),
    }),
  ).annotate({
    identifier: "NetworkFirewallInternetTrafficNotInspectedViolation",
  }) as any as S.Schema<NetworkFirewallInternetTrafficNotInspectedViolation>;
export interface NetworkFirewallInvalidRouteConfigurationViolation {
  AffectedSubnets?: string[];
  RouteTableId?: string;
  IsRouteTableUsedInDifferentAZ?: boolean;
  ViolatingRoute?: Route;
  CurrentFirewallSubnetRouteTable?: string;
  ExpectedFirewallEndpoint?: string;
  ActualFirewallEndpoint?: string;
  ExpectedFirewallSubnetId?: string;
  ActualFirewallSubnetId?: string;
  ExpectedFirewallSubnetRoutes?: ExpectedRoute[];
  ActualFirewallSubnetRoutes?: Route[];
  InternetGatewayId?: string;
  CurrentInternetGatewayRouteTable?: string;
  ExpectedInternetGatewayRoutes?: ExpectedRoute[];
  ActualInternetGatewayRoutes?: Route[];
  VpcId?: string;
}
export const NetworkFirewallInvalidRouteConfigurationViolation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AffectedSubnets: S.optional(ResourceIdList),
      RouteTableId: S.optional(S.String),
      IsRouteTableUsedInDifferentAZ: S.optional(S.Boolean),
      ViolatingRoute: S.optional(Route),
      CurrentFirewallSubnetRouteTable: S.optional(S.String),
      ExpectedFirewallEndpoint: S.optional(S.String),
      ActualFirewallEndpoint: S.optional(S.String),
      ExpectedFirewallSubnetId: S.optional(S.String),
      ActualFirewallSubnetId: S.optional(S.String),
      ExpectedFirewallSubnetRoutes: S.optional(ExpectedRoutes),
      ActualFirewallSubnetRoutes: S.optional(Routes),
      InternetGatewayId: S.optional(S.String),
      CurrentInternetGatewayRouteTable: S.optional(S.String),
      ExpectedInternetGatewayRoutes: S.optional(ExpectedRoutes),
      ActualInternetGatewayRoutes: S.optional(Routes),
      VpcId: S.optional(S.String),
    }),
  ).annotate({
    identifier: "NetworkFirewallInvalidRouteConfigurationViolation",
  }) as any as S.Schema<NetworkFirewallInvalidRouteConfigurationViolation>;
export interface NetworkFirewallBlackHoleRouteDetectedViolation {
  ViolationTarget?: string;
  RouteTableId?: string;
  VpcId?: string;
  ViolatingRoutes?: Route[];
}
export const NetworkFirewallBlackHoleRouteDetectedViolation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ViolationTarget: S.optional(S.String),
      RouteTableId: S.optional(S.String),
      VpcId: S.optional(S.String),
      ViolatingRoutes: S.optional(Routes),
    }),
  ).annotate({
    identifier: "NetworkFirewallBlackHoleRouteDetectedViolation",
  }) as any as S.Schema<NetworkFirewallBlackHoleRouteDetectedViolation>;
export interface NetworkFirewallUnexpectedFirewallRoutesViolation {
  FirewallSubnetId?: string;
  ViolatingRoutes?: Route[];
  RouteTableId?: string;
  FirewallEndpoint?: string;
  VpcId?: string;
}
export const NetworkFirewallUnexpectedFirewallRoutesViolation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      FirewallSubnetId: S.optional(S.String),
      ViolatingRoutes: S.optional(Routes),
      RouteTableId: S.optional(S.String),
      FirewallEndpoint: S.optional(S.String),
      VpcId: S.optional(S.String),
    }),
  ).annotate({
    identifier: "NetworkFirewallUnexpectedFirewallRoutesViolation",
  }) as any as S.Schema<NetworkFirewallUnexpectedFirewallRoutesViolation>;
export interface NetworkFirewallUnexpectedGatewayRoutesViolation {
  GatewayId?: string;
  ViolatingRoutes?: Route[];
  RouteTableId?: string;
  VpcId?: string;
}
export const NetworkFirewallUnexpectedGatewayRoutesViolation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      GatewayId: S.optional(S.String),
      ViolatingRoutes: S.optional(Routes),
      RouteTableId: S.optional(S.String),
      VpcId: S.optional(S.String),
    }),
  ).annotate({
    identifier: "NetworkFirewallUnexpectedGatewayRoutesViolation",
  }) as any as S.Schema<NetworkFirewallUnexpectedGatewayRoutesViolation>;
export interface NetworkFirewallMissingExpectedRoutesViolation {
  ViolationTarget?: string;
  ExpectedRoutes?: ExpectedRoute[];
  VpcId?: string;
}
export const NetworkFirewallMissingExpectedRoutesViolation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ViolationTarget: S.optional(S.String),
      ExpectedRoutes: S.optional(ExpectedRoutes),
      VpcId: S.optional(S.String),
    }),
  ).annotate({
    identifier: "NetworkFirewallMissingExpectedRoutesViolation",
  }) as any as S.Schema<NetworkFirewallMissingExpectedRoutesViolation>;
export type DnsRuleGroupPriority = number;
export type DnsRuleGroupPriorities = number[];
export const DnsRuleGroupPriorities = /*@__PURE__*/ S.Array(S.Number);
export interface DnsRuleGroupPriorityConflictViolation {
  ViolationTarget?: string;
  ViolationTargetDescription?: string;
  ConflictingPriority?: number;
  ConflictingPolicyId?: string;
  UnavailablePriorities?: number[];
}
export const DnsRuleGroupPriorityConflictViolation = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ViolationTarget: S.optional(S.String),
      ViolationTargetDescription: S.optional(S.String),
      ConflictingPriority: S.optional(S.Number),
      ConflictingPolicyId: S.optional(S.String),
      UnavailablePriorities: S.optional(DnsRuleGroupPriorities),
    }),
).annotate({
  identifier: "DnsRuleGroupPriorityConflictViolation",
}) as any as S.Schema<DnsRuleGroupPriorityConflictViolation>;
export interface DnsDuplicateRuleGroupViolation {
  ViolationTarget?: string;
  ViolationTargetDescription?: string;
}
export const DnsDuplicateRuleGroupViolation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ViolationTarget: S.optional(S.String),
    ViolationTargetDescription: S.optional(S.String),
  }),
).annotate({
  identifier: "DnsDuplicateRuleGroupViolation",
}) as any as S.Schema<DnsDuplicateRuleGroupViolation>;
export type BasicInteger = number;
export interface DnsRuleGroupLimitExceededViolation {
  ViolationTarget?: string;
  ViolationTargetDescription?: string;
  NumberOfRuleGroupsAlreadyAssociated?: number;
}
export const DnsRuleGroupLimitExceededViolation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ViolationTarget: S.optional(S.String),
    ViolationTargetDescription: S.optional(S.String),
    NumberOfRuleGroupsAlreadyAssociated: S.optional(S.Number),
  }),
).annotate({
  identifier: "DnsRuleGroupLimitExceededViolation",
}) as any as S.Schema<DnsRuleGroupLimitExceededViolation>;
export interface FirewallSubnetIsOutOfScopeViolation {
  FirewallSubnetId?: string;
  VpcId?: string;
  SubnetAvailabilityZone?: string;
  SubnetAvailabilityZoneId?: string;
  VpcEndpointId?: string;
}
export const FirewallSubnetIsOutOfScopeViolation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallSubnetId: S.optional(S.String),
    VpcId: S.optional(S.String),
    SubnetAvailabilityZone: S.optional(S.String),
    SubnetAvailabilityZoneId: S.optional(S.String),
    VpcEndpointId: S.optional(S.String),
  }),
).annotate({
  identifier: "FirewallSubnetIsOutOfScopeViolation",
}) as any as S.Schema<FirewallSubnetIsOutOfScopeViolation>;
export interface RouteHasOutOfScopeEndpointViolation {
  SubnetId?: string;
  VpcId?: string;
  RouteTableId?: string;
  ViolatingRoutes?: Route[];
  SubnetAvailabilityZone?: string;
  SubnetAvailabilityZoneId?: string;
  CurrentFirewallSubnetRouteTable?: string;
  FirewallSubnetId?: string;
  FirewallSubnetRoutes?: Route[];
  InternetGatewayId?: string;
  CurrentInternetGatewayRouteTable?: string;
  InternetGatewayRoutes?: Route[];
}
export const RouteHasOutOfScopeEndpointViolation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubnetId: S.optional(S.String),
    VpcId: S.optional(S.String),
    RouteTableId: S.optional(S.String),
    ViolatingRoutes: S.optional(Routes),
    SubnetAvailabilityZone: S.optional(S.String),
    SubnetAvailabilityZoneId: S.optional(S.String),
    CurrentFirewallSubnetRouteTable: S.optional(S.String),
    FirewallSubnetId: S.optional(S.String),
    FirewallSubnetRoutes: S.optional(Routes),
    InternetGatewayId: S.optional(S.String),
    CurrentInternetGatewayRouteTable: S.optional(S.String),
    InternetGatewayRoutes: S.optional(Routes),
  }),
).annotate({
  identifier: "RouteHasOutOfScopeEndpointViolation",
}) as any as S.Schema<RouteHasOutOfScopeEndpointViolation>;
export interface ThirdPartyFirewallMissingFirewallViolation {
  ViolationTarget?: string;
  VPC?: string;
  AvailabilityZone?: string;
  TargetViolationReason?: string;
}
export const ThirdPartyFirewallMissingFirewallViolation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ViolationTarget: S.optional(S.String),
      VPC: S.optional(S.String),
      AvailabilityZone: S.optional(S.String),
      TargetViolationReason: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ThirdPartyFirewallMissingFirewallViolation",
  }) as any as S.Schema<ThirdPartyFirewallMissingFirewallViolation>;
export interface ThirdPartyFirewallMissingSubnetViolation {
  ViolationTarget?: string;
  VPC?: string;
  AvailabilityZone?: string;
  TargetViolationReason?: string;
}
export const ThirdPartyFirewallMissingSubnetViolation = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ViolationTarget: S.optional(S.String),
      VPC: S.optional(S.String),
      AvailabilityZone: S.optional(S.String),
      TargetViolationReason: S.optional(S.String),
    }),
).annotate({
  identifier: "ThirdPartyFirewallMissingSubnetViolation",
}) as any as S.Schema<ThirdPartyFirewallMissingSubnetViolation>;
export interface ThirdPartyFirewallMissingExpectedRouteTableViolation {
  ViolationTarget?: string;
  VPC?: string;
  AvailabilityZone?: string;
  CurrentRouteTable?: string;
  ExpectedRouteTable?: string;
}
export const ThirdPartyFirewallMissingExpectedRouteTableViolation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ViolationTarget: S.optional(S.String),
      VPC: S.optional(S.String),
      AvailabilityZone: S.optional(S.String),
      CurrentRouteTable: S.optional(S.String),
      ExpectedRouteTable: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ThirdPartyFirewallMissingExpectedRouteTableViolation",
  }) as any as S.Schema<ThirdPartyFirewallMissingExpectedRouteTableViolation>;
export interface FirewallSubnetMissingVPCEndpointViolation {
  FirewallSubnetId?: string;
  VpcId?: string;
  SubnetAvailabilityZone?: string;
  SubnetAvailabilityZoneId?: string;
}
export const FirewallSubnetMissingVPCEndpointViolation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      FirewallSubnetId: S.optional(S.String),
      VpcId: S.optional(S.String),
      SubnetAvailabilityZone: S.optional(S.String),
      SubnetAvailabilityZoneId: S.optional(S.String),
    }),
  ).annotate({
    identifier: "FirewallSubnetMissingVPCEndpointViolation",
  }) as any as S.Schema<FirewallSubnetMissingVPCEndpointViolation>;
export type IntegerObjectMinimum0 = number;
export type EntryType =
  | "FMS_MANAGED_FIRST_ENTRY"
  | "FMS_MANAGED_LAST_ENTRY"
  | "CUSTOM_ENTRY"
  | (string & {});
export const EntryType = S.String;

export interface EntryDescription {
  EntryDetail?: NetworkAclEntry;
  EntryRuleNumber?: number;
  EntryType?: EntryType;
}
export const EntryDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EntryDetail: S.optional(NetworkAclEntry),
    EntryRuleNumber: S.optional(S.Number),
    EntryType: S.optional(EntryType),
  }),
).annotate({
  identifier: "EntryDescription",
}) as any as S.Schema<EntryDescription>;
export type EntriesWithConflicts = EntryDescription[];
export const EntriesWithConflicts = /*@__PURE__*/ S.Array(EntryDescription);
export type EntryViolationReason =
  | "MISSING_EXPECTED_ENTRY"
  | "INCORRECT_ENTRY_ORDER"
  | "ENTRY_CONFLICT"
  | (string & {});
export const EntryViolationReason = S.String;

export type EntryViolationReasons = EntryViolationReason[];
export const EntryViolationReasons =
  /*@__PURE__*/ S.Array(EntryViolationReason);
export interface EntryViolation {
  ExpectedEntry?: EntryDescription;
  ExpectedEvaluationOrder?: string;
  ActualEvaluationOrder?: string;
  EntryAtExpectedEvaluationOrder?: EntryDescription;
  EntriesWithConflicts?: EntryDescription[];
  EntryViolationReasons?: EntryViolationReason[];
}
export const EntryViolation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExpectedEntry: S.optional(EntryDescription),
    ExpectedEvaluationOrder: S.optional(S.String),
    ActualEvaluationOrder: S.optional(S.String),
    EntryAtExpectedEvaluationOrder: S.optional(EntryDescription),
    EntriesWithConflicts: S.optional(EntriesWithConflicts),
    EntryViolationReasons: S.optional(EntryViolationReasons),
  }),
).annotate({ identifier: "EntryViolation" }) as any as S.Schema<EntryViolation>;
export type EntryViolations = EntryViolation[];
export const EntryViolations = /*@__PURE__*/ S.Array(EntryViolation);
export interface InvalidNetworkAclEntriesViolation {
  Vpc?: string;
  Subnet?: string;
  SubnetAvailabilityZone?: string;
  CurrentAssociatedNetworkAcl?: string;
  EntryViolations?: EntryViolation[];
}
export const InvalidNetworkAclEntriesViolation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Vpc: S.optional(S.String),
    Subnet: S.optional(S.String),
    SubnetAvailabilityZone: S.optional(S.String),
    CurrentAssociatedNetworkAcl: S.optional(S.String),
    EntryViolations: S.optional(EntryViolations),
  }),
).annotate({
  identifier: "InvalidNetworkAclEntriesViolation",
}) as any as S.Schema<InvalidNetworkAclEntriesViolation>;
export interface ActionTarget {
  ResourceId?: string;
  Description?: string;
}
export const ActionTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.optional(S.String),
    Description: S.optional(S.String),
  }),
).annotate({ identifier: "ActionTarget" }) as any as S.Schema<ActionTarget>;
export interface EC2CreateRouteAction {
  Description?: string;
  DestinationCidrBlock?: string;
  DestinationPrefixListId?: string;
  DestinationIpv6CidrBlock?: string;
  VpcEndpointId?: ActionTarget;
  GatewayId?: ActionTarget;
  RouteTableId: ActionTarget;
}
export const EC2CreateRouteAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    DestinationCidrBlock: S.optional(S.String),
    DestinationPrefixListId: S.optional(S.String),
    DestinationIpv6CidrBlock: S.optional(S.String),
    VpcEndpointId: S.optional(ActionTarget),
    GatewayId: S.optional(ActionTarget),
    RouteTableId: ActionTarget,
  }),
).annotate({
  identifier: "EC2CreateRouteAction",
}) as any as S.Schema<EC2CreateRouteAction>;
export interface EC2ReplaceRouteAction {
  Description?: string;
  DestinationCidrBlock?: string;
  DestinationPrefixListId?: string;
  DestinationIpv6CidrBlock?: string;
  GatewayId?: ActionTarget;
  RouteTableId: ActionTarget;
}
export const EC2ReplaceRouteAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    DestinationCidrBlock: S.optional(S.String),
    DestinationPrefixListId: S.optional(S.String),
    DestinationIpv6CidrBlock: S.optional(S.String),
    GatewayId: S.optional(ActionTarget),
    RouteTableId: ActionTarget,
  }),
).annotate({
  identifier: "EC2ReplaceRouteAction",
}) as any as S.Schema<EC2ReplaceRouteAction>;
export interface EC2DeleteRouteAction {
  Description?: string;
  DestinationCidrBlock?: string;
  DestinationPrefixListId?: string;
  DestinationIpv6CidrBlock?: string;
  RouteTableId: ActionTarget;
}
export const EC2DeleteRouteAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    DestinationCidrBlock: S.optional(S.String),
    DestinationPrefixListId: S.optional(S.String),
    DestinationIpv6CidrBlock: S.optional(S.String),
    RouteTableId: ActionTarget,
  }),
).annotate({
  identifier: "EC2DeleteRouteAction",
}) as any as S.Schema<EC2DeleteRouteAction>;
export interface EC2CopyRouteTableAction {
  Description?: string;
  VpcId: ActionTarget;
  RouteTableId: ActionTarget;
}
export const EC2CopyRouteTableAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    VpcId: ActionTarget,
    RouteTableId: ActionTarget,
  }),
).annotate({
  identifier: "EC2CopyRouteTableAction",
}) as any as S.Schema<EC2CopyRouteTableAction>;
export interface EC2ReplaceRouteTableAssociationAction {
  Description?: string;
  AssociationId: ActionTarget;
  RouteTableId: ActionTarget;
}
export const EC2ReplaceRouteTableAssociationAction = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Description: S.optional(S.String),
      AssociationId: ActionTarget,
      RouteTableId: ActionTarget,
    }),
).annotate({
  identifier: "EC2ReplaceRouteTableAssociationAction",
}) as any as S.Schema<EC2ReplaceRouteTableAssociationAction>;
export interface EC2AssociateRouteTableAction {
  Description?: string;
  RouteTableId: ActionTarget;
  SubnetId?: ActionTarget;
  GatewayId?: ActionTarget;
}
export const EC2AssociateRouteTableAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    RouteTableId: ActionTarget,
    SubnetId: S.optional(ActionTarget),
    GatewayId: S.optional(ActionTarget),
  }),
).annotate({
  identifier: "EC2AssociateRouteTableAction",
}) as any as S.Schema<EC2AssociateRouteTableAction>;
export interface EC2CreateRouteTableAction {
  Description?: string;
  VpcId: ActionTarget;
}
export const EC2CreateRouteTableAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Description: S.optional(S.String), VpcId: ActionTarget }),
).annotate({
  identifier: "EC2CreateRouteTableAction",
}) as any as S.Schema<EC2CreateRouteTableAction>;
export interface FMSPolicyUpdateFirewallCreationConfigAction {
  Description?: string;
  FirewallCreationConfig?: string;
}
export const FMSPolicyUpdateFirewallCreationConfigAction =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Description: S.optional(S.String),
      FirewallCreationConfig: S.optional(S.String),
    }),
  ).annotate({
    identifier: "FMSPolicyUpdateFirewallCreationConfigAction",
  }) as any as S.Schema<FMSPolicyUpdateFirewallCreationConfigAction>;
export interface CreateNetworkAclAction {
  Description?: string;
  Vpc?: ActionTarget;
  FMSCanRemediate?: boolean;
}
export const CreateNetworkAclAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    Vpc: S.optional(ActionTarget),
    FMSCanRemediate: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "CreateNetworkAclAction",
}) as any as S.Schema<CreateNetworkAclAction>;
export interface ReplaceNetworkAclAssociationAction {
  Description?: string;
  AssociationId?: ActionTarget;
  NetworkAclId?: ActionTarget;
  FMSCanRemediate?: boolean;
}
export const ReplaceNetworkAclAssociationAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    AssociationId: S.optional(ActionTarget),
    NetworkAclId: S.optional(ActionTarget),
    FMSCanRemediate: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ReplaceNetworkAclAssociationAction",
}) as any as S.Schema<ReplaceNetworkAclAssociationAction>;
export type EntriesDescription = EntryDescription[];
export const EntriesDescription = /*@__PURE__*/ S.Array(EntryDescription);
export interface CreateNetworkAclEntriesAction {
  Description?: string;
  NetworkAclId?: ActionTarget;
  NetworkAclEntriesToBeCreated?: EntryDescription[];
  FMSCanRemediate?: boolean;
}
export const CreateNetworkAclEntriesAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    NetworkAclId: S.optional(ActionTarget),
    NetworkAclEntriesToBeCreated: S.optional(EntriesDescription),
    FMSCanRemediate: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "CreateNetworkAclEntriesAction",
}) as any as S.Schema<CreateNetworkAclEntriesAction>;
export interface DeleteNetworkAclEntriesAction {
  Description?: string;
  NetworkAclId?: ActionTarget;
  NetworkAclEntriesToBeDeleted?: EntryDescription[];
  FMSCanRemediate?: boolean;
}
export const DeleteNetworkAclEntriesAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    NetworkAclId: S.optional(ActionTarget),
    NetworkAclEntriesToBeDeleted: S.optional(EntriesDescription),
    FMSCanRemediate: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DeleteNetworkAclEntriesAction",
}) as any as S.Schema<DeleteNetworkAclEntriesAction>;
export interface RemediationAction {
  Description?: string;
  EC2CreateRouteAction?: EC2CreateRouteAction;
  EC2ReplaceRouteAction?: EC2ReplaceRouteAction;
  EC2DeleteRouteAction?: EC2DeleteRouteAction;
  EC2CopyRouteTableAction?: EC2CopyRouteTableAction;
  EC2ReplaceRouteTableAssociationAction?: EC2ReplaceRouteTableAssociationAction;
  EC2AssociateRouteTableAction?: EC2AssociateRouteTableAction;
  EC2CreateRouteTableAction?: EC2CreateRouteTableAction;
  FMSPolicyUpdateFirewallCreationConfigAction?: FMSPolicyUpdateFirewallCreationConfigAction;
  CreateNetworkAclAction?: CreateNetworkAclAction;
  ReplaceNetworkAclAssociationAction?: ReplaceNetworkAclAssociationAction;
  CreateNetworkAclEntriesAction?: CreateNetworkAclEntriesAction;
  DeleteNetworkAclEntriesAction?: DeleteNetworkAclEntriesAction;
}
export const RemediationAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    EC2CreateRouteAction: S.optional(EC2CreateRouteAction),
    EC2ReplaceRouteAction: S.optional(EC2ReplaceRouteAction),
    EC2DeleteRouteAction: S.optional(EC2DeleteRouteAction),
    EC2CopyRouteTableAction: S.optional(EC2CopyRouteTableAction),
    EC2ReplaceRouteTableAssociationAction: S.optional(
      EC2ReplaceRouteTableAssociationAction,
    ),
    EC2AssociateRouteTableAction: S.optional(EC2AssociateRouteTableAction),
    EC2CreateRouteTableAction: S.optional(EC2CreateRouteTableAction),
    FMSPolicyUpdateFirewallCreationConfigAction: S.optional(
      FMSPolicyUpdateFirewallCreationConfigAction,
    ),
    CreateNetworkAclAction: S.optional(CreateNetworkAclAction),
    ReplaceNetworkAclAssociationAction: S.optional(
      ReplaceNetworkAclAssociationAction,
    ),
    CreateNetworkAclEntriesAction: S.optional(CreateNetworkAclEntriesAction),
    DeleteNetworkAclEntriesAction: S.optional(DeleteNetworkAclEntriesAction),
  }),
).annotate({
  identifier: "RemediationAction",
}) as any as S.Schema<RemediationAction>;
export interface RemediationActionWithOrder {
  RemediationAction?: RemediationAction;
  Order?: number;
}
export const RemediationActionWithOrder = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RemediationAction: S.optional(RemediationAction),
    Order: S.optional(S.Number),
  }),
).annotate({
  identifier: "RemediationActionWithOrder",
}) as any as S.Schema<RemediationActionWithOrder>;
export type OrderedRemediationActions = RemediationActionWithOrder[];
export const OrderedRemediationActions = /*@__PURE__*/ S.Array(
  RemediationActionWithOrder,
);
export interface PossibleRemediationAction {
  Description?: string;
  OrderedRemediationActions: RemediationActionWithOrder[];
  IsDefaultAction?: boolean;
}
export const PossibleRemediationAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    OrderedRemediationActions: OrderedRemediationActions,
    IsDefaultAction: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "PossibleRemediationAction",
}) as any as S.Schema<PossibleRemediationAction>;
export type PossibleRemediationActionList = PossibleRemediationAction[];
export const PossibleRemediationActionList = /*@__PURE__*/ S.Array(
  PossibleRemediationAction,
);
export interface PossibleRemediationActions {
  Description?: string;
  Actions?: PossibleRemediationAction[];
}
export const PossibleRemediationActions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    Actions: S.optional(PossibleRemediationActionList),
  }),
).annotate({
  identifier: "PossibleRemediationActions",
}) as any as S.Schema<PossibleRemediationActions>;
export interface WebACLHasIncompatibleConfigurationViolation {
  WebACLArn?: string;
  Description?: string;
}
export const WebACLHasIncompatibleConfigurationViolation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      WebACLArn: S.optional(S.String),
      Description: S.optional(S.String),
    }),
  ).annotate({
    identifier: "WebACLHasIncompatibleConfigurationViolation",
  }) as any as S.Schema<WebACLHasIncompatibleConfigurationViolation>;
export type ResourceArnList = string[];
export const ResourceArnList = /*@__PURE__*/ S.Array(S.String);
export interface WebACLHasOutOfScopeResourcesViolation {
  WebACLArn?: string;
  OutOfScopeResourceList?: string[];
}
export const WebACLHasOutOfScopeResourcesViolation = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      WebACLArn: S.optional(S.String),
      OutOfScopeResourceList: S.optional(ResourceArnList),
    }),
).annotate({
  identifier: "WebACLHasOutOfScopeResourcesViolation",
}) as any as S.Schema<WebACLHasOutOfScopeResourcesViolation>;
export interface ResourceViolation {
  AwsVPCSecurityGroupViolation?: AwsVPCSecurityGroupViolation;
  AwsEc2NetworkInterfaceViolation?: AwsEc2NetworkInterfaceViolation;
  AwsEc2InstanceViolation?: AwsEc2InstanceViolation;
  NetworkFirewallMissingFirewallViolation?: NetworkFirewallMissingFirewallViolation;
  NetworkFirewallMissingSubnetViolation?: NetworkFirewallMissingSubnetViolation;
  NetworkFirewallMissingExpectedRTViolation?: NetworkFirewallMissingExpectedRTViolation;
  NetworkFirewallPolicyModifiedViolation?: NetworkFirewallPolicyModifiedViolation;
  NetworkFirewallInternetTrafficNotInspectedViolation?: NetworkFirewallInternetTrafficNotInspectedViolation;
  NetworkFirewallInvalidRouteConfigurationViolation?: NetworkFirewallInvalidRouteConfigurationViolation;
  NetworkFirewallBlackHoleRouteDetectedViolation?: NetworkFirewallBlackHoleRouteDetectedViolation;
  NetworkFirewallUnexpectedFirewallRoutesViolation?: NetworkFirewallUnexpectedFirewallRoutesViolation;
  NetworkFirewallUnexpectedGatewayRoutesViolation?: NetworkFirewallUnexpectedGatewayRoutesViolation;
  NetworkFirewallMissingExpectedRoutesViolation?: NetworkFirewallMissingExpectedRoutesViolation;
  DnsRuleGroupPriorityConflictViolation?: DnsRuleGroupPriorityConflictViolation;
  DnsDuplicateRuleGroupViolation?: DnsDuplicateRuleGroupViolation;
  DnsRuleGroupLimitExceededViolation?: DnsRuleGroupLimitExceededViolation;
  FirewallSubnetIsOutOfScopeViolation?: FirewallSubnetIsOutOfScopeViolation;
  RouteHasOutOfScopeEndpointViolation?: RouteHasOutOfScopeEndpointViolation;
  ThirdPartyFirewallMissingFirewallViolation?: ThirdPartyFirewallMissingFirewallViolation;
  ThirdPartyFirewallMissingSubnetViolation?: ThirdPartyFirewallMissingSubnetViolation;
  ThirdPartyFirewallMissingExpectedRouteTableViolation?: ThirdPartyFirewallMissingExpectedRouteTableViolation;
  FirewallSubnetMissingVPCEndpointViolation?: FirewallSubnetMissingVPCEndpointViolation;
  InvalidNetworkAclEntriesViolation?: InvalidNetworkAclEntriesViolation;
  PossibleRemediationActions?: PossibleRemediationActions;
  WebACLHasIncompatibleConfigurationViolation?: WebACLHasIncompatibleConfigurationViolation;
  WebACLHasOutOfScopeResourcesViolation?: WebACLHasOutOfScopeResourcesViolation;
}
export const ResourceViolation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AwsVPCSecurityGroupViolation: S.optional(AwsVPCSecurityGroupViolation),
    AwsEc2NetworkInterfaceViolation: S.optional(
      AwsEc2NetworkInterfaceViolation,
    ),
    AwsEc2InstanceViolation: S.optional(AwsEc2InstanceViolation),
    NetworkFirewallMissingFirewallViolation: S.optional(
      NetworkFirewallMissingFirewallViolation,
    ),
    NetworkFirewallMissingSubnetViolation: S.optional(
      NetworkFirewallMissingSubnetViolation,
    ),
    NetworkFirewallMissingExpectedRTViolation: S.optional(
      NetworkFirewallMissingExpectedRTViolation,
    ),
    NetworkFirewallPolicyModifiedViolation: S.optional(
      NetworkFirewallPolicyModifiedViolation,
    ),
    NetworkFirewallInternetTrafficNotInspectedViolation: S.optional(
      NetworkFirewallInternetTrafficNotInspectedViolation,
    ),
    NetworkFirewallInvalidRouteConfigurationViolation: S.optional(
      NetworkFirewallInvalidRouteConfigurationViolation,
    ),
    NetworkFirewallBlackHoleRouteDetectedViolation: S.optional(
      NetworkFirewallBlackHoleRouteDetectedViolation,
    ),
    NetworkFirewallUnexpectedFirewallRoutesViolation: S.optional(
      NetworkFirewallUnexpectedFirewallRoutesViolation,
    ),
    NetworkFirewallUnexpectedGatewayRoutesViolation: S.optional(
      NetworkFirewallUnexpectedGatewayRoutesViolation,
    ),
    NetworkFirewallMissingExpectedRoutesViolation: S.optional(
      NetworkFirewallMissingExpectedRoutesViolation,
    ),
    DnsRuleGroupPriorityConflictViolation: S.optional(
      DnsRuleGroupPriorityConflictViolation,
    ),
    DnsDuplicateRuleGroupViolation: S.optional(DnsDuplicateRuleGroupViolation),
    DnsRuleGroupLimitExceededViolation: S.optional(
      DnsRuleGroupLimitExceededViolation,
    ),
    FirewallSubnetIsOutOfScopeViolation: S.optional(
      FirewallSubnetIsOutOfScopeViolation,
    ),
    RouteHasOutOfScopeEndpointViolation: S.optional(
      RouteHasOutOfScopeEndpointViolation,
    ),
    ThirdPartyFirewallMissingFirewallViolation: S.optional(
      ThirdPartyFirewallMissingFirewallViolation,
    ),
    ThirdPartyFirewallMissingSubnetViolation: S.optional(
      ThirdPartyFirewallMissingSubnetViolation,
    ),
    ThirdPartyFirewallMissingExpectedRouteTableViolation: S.optional(
      ThirdPartyFirewallMissingExpectedRouteTableViolation,
    ),
    FirewallSubnetMissingVPCEndpointViolation: S.optional(
      FirewallSubnetMissingVPCEndpointViolation,
    ),
    InvalidNetworkAclEntriesViolation: S.optional(
      InvalidNetworkAclEntriesViolation,
    ),
    PossibleRemediationActions: S.optional(PossibleRemediationActions),
    WebACLHasIncompatibleConfigurationViolation: S.optional(
      WebACLHasIncompatibleConfigurationViolation,
    ),
    WebACLHasOutOfScopeResourcesViolation: S.optional(
      WebACLHasOutOfScopeResourcesViolation,
    ),
  }),
).annotate({
  identifier: "ResourceViolation",
}) as any as S.Schema<ResourceViolation>;
export type ResourceViolations = ResourceViolation[];
export const ResourceViolations = /*@__PURE__*/ S.Array(ResourceViolation);
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
export interface ViolationDetail {
  PolicyId: string;
  MemberAccount: string;
  ResourceId: string;
  ResourceType: string;
  ResourceViolations: ResourceViolation[];
  ResourceTags?: Tag[];
  ResourceDescription?: string;
}
export const ViolationDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyId: S.String,
    MemberAccount: S.String,
    ResourceId: S.String,
    ResourceType: S.String,
    ResourceViolations: ResourceViolations,
    ResourceTags: S.optional(TagList),
    ResourceDescription: S.optional(S.String),
  }),
).annotate({
  identifier: "ViolationDetail",
}) as any as S.Schema<ViolationDetail>;
export interface GetViolationDetailsResponse {
  ViolationDetail?: ViolationDetail;
}
export const GetViolationDetailsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ViolationDetail: S.optional(ViolationDetail) }),
).annotate({
  identifier: "GetViolationDetailsResponse",
}) as any as S.Schema<GetViolationDetailsResponse>;
export interface ListAdminAccountsForOrganizationRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListAdminAccountsForOrganizationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListAdminAccountsForOrganizationRequest",
}) as any as S.Schema<ListAdminAccountsForOrganizationRequest>;
export interface AdminAccountSummary {
  AdminAccount?: string;
  DefaultAdmin?: boolean;
  Status?: OrganizationStatus;
}
export const AdminAccountSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdminAccount: S.optional(S.String),
    DefaultAdmin: S.optional(S.Boolean),
    Status: S.optional(OrganizationStatus),
  }),
).annotate({
  identifier: "AdminAccountSummary",
}) as any as S.Schema<AdminAccountSummary>;
export type AdminAccountSummaryList = AdminAccountSummary[];
export const AdminAccountSummaryList =
  /*@__PURE__*/ S.Array(AdminAccountSummary);
export interface ListAdminAccountsForOrganizationResponse {
  AdminAccounts?: AdminAccountSummary[];
  NextToken?: string;
}
export const ListAdminAccountsForOrganizationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AdminAccounts: S.optional(AdminAccountSummaryList),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListAdminAccountsForOrganizationResponse",
}) as any as S.Schema<ListAdminAccountsForOrganizationResponse>;
export interface ListAdminsManagingAccountRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListAdminsManagingAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAdminsManagingAccountRequest",
}) as any as S.Schema<ListAdminsManagingAccountRequest>;
export interface ListAdminsManagingAccountResponse {
  AdminAccounts?: string[];
  NextToken?: string;
}
export const ListAdminsManagingAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdminAccounts: S.optional(AccountIdList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAdminsManagingAccountResponse",
}) as any as S.Schema<ListAdminsManagingAccountResponse>;
export interface ListAppsListsRequest {
  DefaultLists?: boolean;
  NextToken?: string;
  MaxResults: number;
}
export const ListAppsListsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultLists: S.optional(S.Boolean),
    NextToken: S.optional(S.String),
    MaxResults: S.Number,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAppsListsRequest",
}) as any as S.Schema<ListAppsListsRequest>;
export interface AppsListDataSummary {
  ListArn?: string;
  ListId?: string;
  ListName?: string;
  AppsList?: App[];
}
export const AppsListDataSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ListArn: S.optional(S.String),
    ListId: S.optional(S.String),
    ListName: S.optional(S.String),
    AppsList: S.optional(AppsList),
  }),
).annotate({
  identifier: "AppsListDataSummary",
}) as any as S.Schema<AppsListDataSummary>;
export type AppsListsData = AppsListDataSummary[];
export const AppsListsData = /*@__PURE__*/ S.Array(AppsListDataSummary);
export interface ListAppsListsResponse {
  AppsLists?: AppsListDataSummary[];
  NextToken?: string;
}
export const ListAppsListsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppsLists: S.optional(AppsListsData),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAppsListsResponse",
}) as any as S.Schema<ListAppsListsResponse>;
export interface ListComplianceStatusRequest {
  PolicyId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListComplianceStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListComplianceStatusRequest",
}) as any as S.Schema<ListComplianceStatusRequest>;
export type PolicyComplianceStatusType =
  | "COMPLIANT"
  | "NON_COMPLIANT"
  | (string & {});
export const PolicyComplianceStatusType = S.String;

export type ResourceCount = number;
export interface EvaluationResult {
  ComplianceStatus?: PolicyComplianceStatusType;
  ViolatorCount?: number;
  EvaluationLimitExceeded?: boolean;
}
export const EvaluationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ComplianceStatus: S.optional(PolicyComplianceStatusType),
    ViolatorCount: S.optional(S.Number),
    EvaluationLimitExceeded: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "EvaluationResult",
}) as any as S.Schema<EvaluationResult>;
export type EvaluationResults = EvaluationResult[];
export const EvaluationResults = /*@__PURE__*/ S.Array(EvaluationResult);
export interface PolicyComplianceStatus {
  PolicyOwner?: string;
  PolicyId?: string;
  PolicyName?: string;
  MemberAccount?: string;
  EvaluationResults?: EvaluationResult[];
  LastUpdated?: Date;
  IssueInfoMap?: { [key: string]: string | undefined };
}
export const PolicyComplianceStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyOwner: S.optional(S.String),
    PolicyId: S.optional(S.String),
    PolicyName: S.optional(S.String),
    MemberAccount: S.optional(S.String),
    EvaluationResults: S.optional(EvaluationResults),
    LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    IssueInfoMap: S.optional(IssueInfoMap),
  }),
).annotate({
  identifier: "PolicyComplianceStatus",
}) as any as S.Schema<PolicyComplianceStatus>;
export type PolicyComplianceStatusList = PolicyComplianceStatus[];
export const PolicyComplianceStatusList = /*@__PURE__*/ S.Array(
  PolicyComplianceStatus,
);
export interface ListComplianceStatusResponse {
  PolicyComplianceStatusList?: PolicyComplianceStatus[];
  NextToken?: string;
}
export const ListComplianceStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyComplianceStatusList: S.optional(PolicyComplianceStatusList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListComplianceStatusResponse",
}) as any as S.Schema<ListComplianceStatusResponse>;
export type AWSAccountIdList = string[];
export const AWSAccountIdList = /*@__PURE__*/ S.Array(S.String);
export interface ListDiscoveredResourcesRequest {
  MemberAccountIds: string[];
  ResourceType: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListDiscoveredResourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MemberAccountIds: AWSAccountIdList,
    ResourceType: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDiscoveredResourcesRequest",
}) as any as S.Schema<ListDiscoveredResourcesRequest>;
export interface DiscoveredResource {
  URI?: string;
  AccountId?: string;
  Type?: string;
  Name?: string;
}
export const DiscoveredResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    URI: S.optional(S.String),
    AccountId: S.optional(S.String),
    Type: S.optional(S.String),
    Name: S.optional(S.String),
  }),
).annotate({
  identifier: "DiscoveredResource",
}) as any as S.Schema<DiscoveredResource>;
export type DiscoveredResourceList = DiscoveredResource[];
export const DiscoveredResourceList = /*@__PURE__*/ S.Array(DiscoveredResource);
export interface ListDiscoveredResourcesResponse {
  Items?: DiscoveredResource[];
  NextToken?: string;
}
export const ListDiscoveredResourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(DiscoveredResourceList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDiscoveredResourcesResponse",
}) as any as S.Schema<ListDiscoveredResourcesResponse>;
export interface ListMemberAccountsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListMemberAccountsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListMemberAccountsRequest",
}) as any as S.Schema<ListMemberAccountsRequest>;
export type MemberAccounts = string[];
export const MemberAccounts = /*@__PURE__*/ S.Array(S.String);
export interface ListMemberAccountsResponse {
  MemberAccounts?: string[];
  NextToken?: string;
}
export const ListMemberAccountsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MemberAccounts: S.optional(MemberAccounts),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMemberAccountsResponse",
}) as any as S.Schema<ListMemberAccountsResponse>;
export interface ListPoliciesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListPoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPoliciesRequest",
}) as any as S.Schema<ListPoliciesRequest>;
export interface PolicySummary {
  PolicyArn?: string;
  PolicyId?: string;
  PolicyName?: string;
  ResourceType?: string;
  SecurityServiceType?: SecurityServiceType;
  RemediationEnabled?: boolean;
  DeleteUnusedFMManagedResources?: boolean;
  PolicyStatus?: CustomerPolicyStatus;
}
export const PolicySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyArn: S.optional(S.String),
    PolicyId: S.optional(S.String),
    PolicyName: S.optional(S.String),
    ResourceType: S.optional(S.String),
    SecurityServiceType: S.optional(SecurityServiceType),
    RemediationEnabled: S.optional(S.Boolean),
    DeleteUnusedFMManagedResources: S.optional(S.Boolean),
    PolicyStatus: S.optional(CustomerPolicyStatus),
  }),
).annotate({ identifier: "PolicySummary" }) as any as S.Schema<PolicySummary>;
export type PolicySummaryList = PolicySummary[];
export const PolicySummaryList = /*@__PURE__*/ S.Array(PolicySummary);
export interface ListPoliciesResponse {
  PolicyList?: PolicySummary[];
  NextToken?: string;
}
export const ListPoliciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyList: S.optional(PolicySummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPoliciesResponse",
}) as any as S.Schema<ListPoliciesResponse>;
export interface ListProtocolsListsRequest {
  DefaultLists?: boolean;
  NextToken?: string;
  MaxResults: number;
}
export const ListProtocolsListsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultLists: S.optional(S.Boolean),
    NextToken: S.optional(S.String),
    MaxResults: S.Number,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListProtocolsListsRequest",
}) as any as S.Schema<ListProtocolsListsRequest>;
export interface ProtocolsListDataSummary {
  ListArn?: string;
  ListId?: string;
  ListName?: string;
  ProtocolsList?: string[];
}
export const ProtocolsListDataSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ListArn: S.optional(S.String),
    ListId: S.optional(S.String),
    ListName: S.optional(S.String),
    ProtocolsList: S.optional(ProtocolsList),
  }),
).annotate({
  identifier: "ProtocolsListDataSummary",
}) as any as S.Schema<ProtocolsListDataSummary>;
export type ProtocolsListsData = ProtocolsListDataSummary[];
export const ProtocolsListsData = /*@__PURE__*/ S.Array(
  ProtocolsListDataSummary,
);
export interface ListProtocolsListsResponse {
  ProtocolsLists?: ProtocolsListDataSummary[];
  NextToken?: string;
}
export const ListProtocolsListsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProtocolsLists: S.optional(ProtocolsListsData),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProtocolsListsResponse",
}) as any as S.Schema<ListProtocolsListsResponse>;
export interface ListResourceSetResourcesRequest {
  Identifier: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListResourceSetResourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListResourceSetResourcesRequest",
}) as any as S.Schema<ListResourceSetResourcesRequest>;
export interface Resource {
  URI: string;
  AccountId?: string;
}
export const Resource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ URI: S.String, AccountId: S.optional(S.String) }),
).annotate({ identifier: "Resource" }) as any as S.Schema<Resource>;
export type ResourceList = Resource[];
export const ResourceList = /*@__PURE__*/ S.Array(Resource);
export interface ListResourceSetResourcesResponse {
  Items: Resource[];
  NextToken?: string;
}
export const ListResourceSetResourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Items: ResourceList, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListResourceSetResourcesResponse",
}) as any as S.Schema<ListResourceSetResourcesResponse>;
export interface ListResourceSetsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListResourceSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListResourceSetsRequest",
}) as any as S.Schema<ListResourceSetsRequest>;
export interface ResourceSetSummary {
  Id?: string;
  Name?: string;
  Description?: string;
  LastUpdateTime?: Date;
  ResourceSetStatus?: ResourceSetStatus;
}
export const ResourceSetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    LastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ResourceSetStatus: S.optional(ResourceSetStatus),
  }),
).annotate({
  identifier: "ResourceSetSummary",
}) as any as S.Schema<ResourceSetSummary>;
export type ResourceSetSummaryList = ResourceSetSummary[];
export const ResourceSetSummaryList = /*@__PURE__*/ S.Array(ResourceSetSummary);
export interface ListResourceSetsResponse {
  ResourceSets?: ResourceSetSummary[];
  NextToken?: string;
}
export const ListResourceSetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceSets: S.optional(ResourceSetSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListResourceSetsResponse",
}) as any as S.Schema<ListResourceSetsResponse>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  TagList?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TagList: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListThirdPartyFirewallFirewallPoliciesRequest {
  ThirdPartyFirewall: ThirdPartyFirewall;
  NextToken?: string;
  MaxResults: number;
}
export const ListThirdPartyFirewallFirewallPoliciesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ThirdPartyFirewall: ThirdPartyFirewall,
      NextToken: S.optional(S.String),
      MaxResults: S.Number,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "ListThirdPartyFirewallFirewallPoliciesRequest",
  }) as any as S.Schema<ListThirdPartyFirewallFirewallPoliciesRequest>;
export type FirewallPolicyId = string;
export type FirewallPolicyName = string;
export interface ThirdPartyFirewallFirewallPolicy {
  FirewallPolicyId?: string;
  FirewallPolicyName?: string;
}
export const ThirdPartyFirewallFirewallPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirewallPolicyId: S.optional(S.String),
    FirewallPolicyName: S.optional(S.String),
  }),
).annotate({
  identifier: "ThirdPartyFirewallFirewallPolicy",
}) as any as S.Schema<ThirdPartyFirewallFirewallPolicy>;
export type ThirdPartyFirewallFirewallPolicies =
  ThirdPartyFirewallFirewallPolicy[];
export const ThirdPartyFirewallFirewallPolicies = /*@__PURE__*/ S.Array(
  ThirdPartyFirewallFirewallPolicy,
);
export interface ListThirdPartyFirewallFirewallPoliciesResponse {
  ThirdPartyFirewallFirewallPolicies?: ThirdPartyFirewallFirewallPolicy[];
  NextToken?: string;
}
export const ListThirdPartyFirewallFirewallPoliciesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ThirdPartyFirewallFirewallPolicies: S.optional(
        ThirdPartyFirewallFirewallPolicies,
      ),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListThirdPartyFirewallFirewallPoliciesResponse",
  }) as any as S.Schema<ListThirdPartyFirewallFirewallPoliciesResponse>;
export interface PutAdminAccountRequest {
  AdminAccount: string;
  AdminScope?: AdminScope;
}
export const PutAdminAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AdminAccount: S.String, AdminScope: S.optional(AdminScope) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutAdminAccountRequest",
}) as any as S.Schema<PutAdminAccountRequest>;
export interface PutAdminAccountResponse {}
export const PutAdminAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutAdminAccountResponse",
}) as any as S.Schema<PutAdminAccountResponse>;
export interface PutAppsListRequest {
  AppsList: AppsListData;
  TagList?: Tag[];
}
export const PutAppsListRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AppsList: AppsListData, TagList: S.optional(TagList) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutAppsListRequest",
}) as any as S.Schema<PutAppsListRequest>;
export interface PutAppsListResponse {
  AppsList?: AppsListData;
  AppsListArn?: string;
}
export const PutAppsListResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppsList: S.optional(AppsListData),
    AppsListArn: S.optional(S.String),
  }),
).annotate({
  identifier: "PutAppsListResponse",
}) as any as S.Schema<PutAppsListResponse>;
export interface PutNotificationChannelRequest {
  SnsTopicArn: string;
  SnsRoleName: string;
}
export const PutNotificationChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SnsTopicArn: S.String, SnsRoleName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutNotificationChannelRequest",
}) as any as S.Schema<PutNotificationChannelRequest>;
export interface PutNotificationChannelResponse {}
export const PutNotificationChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutNotificationChannelResponse",
}) as any as S.Schema<PutNotificationChannelResponse>;
export interface PutPolicyRequest {
  Policy: Policy;
  TagList?: Tag[];
}
export const PutPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policy: Policy, TagList: S.optional(TagList) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutPolicyRequest",
}) as any as S.Schema<PutPolicyRequest>;
export interface PutPolicyResponse {
  Policy?: Policy;
  PolicyArn?: string;
}
export const PutPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policy: S.optional(Policy), PolicyArn: S.optional(S.String) }),
).annotate({
  identifier: "PutPolicyResponse",
}) as any as S.Schema<PutPolicyResponse>;
export interface PutProtocolsListRequest {
  ProtocolsList: ProtocolsListData;
  TagList?: Tag[];
}
export const PutProtocolsListRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProtocolsList: ProtocolsListData,
    TagList: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutProtocolsListRequest",
}) as any as S.Schema<PutProtocolsListRequest>;
export interface PutProtocolsListResponse {
  ProtocolsList?: ProtocolsListData;
  ProtocolsListArn?: string;
}
export const PutProtocolsListResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProtocolsList: S.optional(ProtocolsListData),
    ProtocolsListArn: S.optional(S.String),
  }),
).annotate({
  identifier: "PutProtocolsListResponse",
}) as any as S.Schema<PutProtocolsListResponse>;
export interface PutResourceSetRequest {
  ResourceSet: ResourceSet;
  TagList?: Tag[];
}
export const PutResourceSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceSet: ResourceSet, TagList: S.optional(TagList) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutResourceSetRequest",
}) as any as S.Schema<PutResourceSetRequest>;
export interface PutResourceSetResponse {
  ResourceSet: ResourceSet;
  ResourceSetArn: string;
}
export const PutResourceSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceSet: ResourceSet, ResourceSetArn: S.String }),
).annotate({
  identifier: "PutResourceSetResponse",
}) as any as S.Schema<PutResourceSetResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  TagList: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, TagList: TagList }).pipe(
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
export type ErrorMessage = string;
export type AssociateAdminAccountError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Sets a Firewall Manager default administrator account. The Firewall Manager default administrator account can manage third-party firewalls and has full administrative scope that allows administration of all policy types, accounts, organizational units, and Regions. This account must be a member account of the organization in Organizations whose resources you want to protect.
 *
 * For information about working with Firewall Manager administrator accounts, see Managing Firewall Manager administrators in the *Firewall Manager Developer Guide*.
 */
export const associateAdminAccount: API.OperationMethod<
  AssociateAdminAccountRequest,
  AssociateAdminAccountResponse,
  AssociateAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateAdminAccountRequest,
  output: AssociateAdminAccountResponse,
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateAdminAccount",
}));

export type AssociateThirdPartyFirewallError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Sets the Firewall Manager policy administrator as a tenant administrator of a third-party firewall service. A tenant is an instance of the third-party firewall service that's associated with your Amazon Web Services customer account.
 */
export const associateThirdPartyFirewall: API.OperationMethod<
  AssociateThirdPartyFirewallRequest,
  AssociateThirdPartyFirewallResponse,
  AssociateThirdPartyFirewallError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateThirdPartyFirewallRequest,
  output: AssociateThirdPartyFirewallResponse,
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateThirdPartyFirewall",
}));

export type BatchAssociateResourceError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associate resources to a Firewall Manager resource set.
 */
export const batchAssociateResource: API.OperationMethod<
  BatchAssociateResourceRequest,
  BatchAssociateResourceResponse,
  BatchAssociateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchAssociateResourceRequest,
  output: BatchAssociateResourceResponse,
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchAssociateResource",
}));

export type BatchDisassociateResourceError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates resources from a Firewall Manager resource set.
 */
export const batchDisassociateResource: API.OperationMethod<
  BatchDisassociateResourceRequest,
  BatchDisassociateResourceResponse,
  BatchDisassociateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDisassociateResourceRequest,
  output: BatchDisassociateResourceResponse,
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDisassociateResource",
}));

export type DeleteAppsListError =
  | InternalErrorException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Permanently deletes an Firewall Manager applications list.
 */
export const deleteAppsList: API.OperationMethod<
  DeleteAppsListRequest,
  DeleteAppsListResponse,
  DeleteAppsListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAppsListRequest,
  output: DeleteAppsListResponse,
  errors: [
    InternalErrorException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAppsList",
}));

export type DeleteNotificationChannelError =
  | InternalErrorException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an Firewall Manager association with the IAM role and the Amazon Simple
 * Notification Service (SNS) topic that is used to record Firewall Manager SNS logs.
 */
export const deleteNotificationChannel: API.OperationMethod<
  DeleteNotificationChannelRequest,
  DeleteNotificationChannelResponse,
  DeleteNotificationChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteNotificationChannelRequest,
  output: DeleteNotificationChannelResponse,
  errors: [
    InternalErrorException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNotificationChannel",
}));

export type DeletePolicyError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Permanently deletes an Firewall Manager policy.
 */
export const deletePolicy: API.OperationMethod<
  DeletePolicyRequest,
  DeletePolicyResponse,
  DeletePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePolicyRequest,
  output: DeletePolicyResponse,
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicy",
}));

export type DeleteProtocolsListError =
  | InternalErrorException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Permanently deletes an Firewall Manager protocols list.
 */
export const deleteProtocolsList: API.OperationMethod<
  DeleteProtocolsListRequest,
  DeleteProtocolsListResponse,
  DeleteProtocolsListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProtocolsListRequest,
  output: DeleteProtocolsListResponse,
  errors: [
    InternalErrorException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProtocolsList",
}));

export type DeleteResourceSetError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified ResourceSet.
 */
export const deleteResourceSet: API.OperationMethod<
  DeleteResourceSetRequest,
  DeleteResourceSetResponse,
  DeleteResourceSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourceSetRequest,
  output: DeleteResourceSetResponse,
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourceSet",
}));

export type DisassociateAdminAccountError =
  | InternalErrorException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates an Firewall Manager administrator account. To set a different account as an Firewall Manager administrator, submit a PutAdminAccount request. To set an account as a default administrator account, you must submit an AssociateAdminAccount request.
 *
 * Disassociation of the default administrator account follows the first in, last out principle. If you are the default administrator, all Firewall Manager administrators within the organization must first disassociate their accounts before you can disassociate your account.
 */
export const disassociateAdminAccount: API.OperationMethod<
  DisassociateAdminAccountRequest,
  DisassociateAdminAccountResponse,
  DisassociateAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateAdminAccountRequest,
  output: DisassociateAdminAccountResponse,
  errors: [
    InternalErrorException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateAdminAccount",
}));

export type DisassociateThirdPartyFirewallError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates a Firewall Manager policy administrator from a third-party firewall tenant. When you call `DisassociateThirdPartyFirewall`, the third-party firewall vendor deletes all of the firewalls that are associated with the account.
 */
export const disassociateThirdPartyFirewall: API.OperationMethod<
  DisassociateThirdPartyFirewallRequest,
  DisassociateThirdPartyFirewallResponse,
  DisassociateThirdPartyFirewallError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateThirdPartyFirewallRequest,
  output: DisassociateThirdPartyFirewallResponse,
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateThirdPartyFirewall",
}));

export type GetAdminAccountError =
  | InternalErrorException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the Organizations account that is associated with Firewall Manager
 * as the Firewall Manager default administrator.
 */
export const getAdminAccount: API.OperationMethod<
  GetAdminAccountRequest,
  GetAdminAccountResponse,
  GetAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAdminAccountRequest,
  output: GetAdminAccountResponse,
  errors: [
    InternalErrorException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAdminAccount",
}));

export type GetAdminScopeError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns information about the specified account's administrative scope. The administrative scope defines the resources that an Firewall Manager administrator can manage.
 */
export const getAdminScope: API.OperationMethod<
  GetAdminScopeRequest,
  GetAdminScopeResponse,
  GetAdminScopeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAdminScopeRequest,
  output: GetAdminScopeResponse,
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAdminScope",
}));

export type GetAppsListError =
  | InternalErrorException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns information about the specified Firewall Manager applications list.
 */
export const getAppsList: API.OperationMethod<
  GetAppsListRequest,
  GetAppsListResponse,
  GetAppsListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAppsListRequest,
  output: GetAppsListResponse,
  errors: [
    InternalErrorException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAppsList",
}));

export type GetComplianceDetailError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns detailed compliance information about the specified member account. Details
 * include resources that are in and out of compliance with the specified policy.
 *
 * The reasons for resources being considered compliant depend on the Firewall Manager policy type.
 */
export const getComplianceDetail: API.OperationMethod<
  GetComplianceDetailRequest,
  GetComplianceDetailResponse,
  GetComplianceDetailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetComplianceDetailRequest,
  output: GetComplianceDetailResponse,
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComplianceDetail",
}));

export type GetNotificationChannelError =
  | InternalErrorException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Information
 * about the Amazon Simple Notification Service (SNS) topic that is used to
 * record Firewall Manager SNS logs.
 */
export const getNotificationChannel: API.OperationMethod<
  GetNotificationChannelRequest,
  GetNotificationChannelResponse,
  GetNotificationChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetNotificationChannelRequest,
  output: GetNotificationChannelResponse,
  errors: [
    InternalErrorException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNotificationChannel",
}));

export type GetPolicyError =
  | InternalErrorException
  | InvalidOperationException
  | InvalidTypeException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns information about the specified Firewall Manager policy.
 */
export const getPolicy: API.OperationMethod<
  GetPolicyRequest,
  GetPolicyResponse,
  GetPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPolicyRequest,
  output: GetPolicyResponse,
  errors: [
    InternalErrorException,
    InvalidOperationException,
    InvalidTypeException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicy",
}));

export type GetProtectionStatusError =
  | InternalErrorException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * If you created a Shield Advanced policy, returns policy-level attack summary information
 * in the event of a potential DDoS attack. Other policy types are currently unsupported.
 */
export const getProtectionStatus: API.OperationMethod<
  GetProtectionStatusRequest,
  GetProtectionStatusResponse,
  GetProtectionStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProtectionStatusRequest,
  output: GetProtectionStatusResponse,
  errors: [
    InternalErrorException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProtectionStatus",
}));

export type GetProtocolsListError =
  | InternalErrorException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns information about the specified Firewall Manager protocols list.
 */
export const getProtocolsList: API.OperationMethod<
  GetProtocolsListRequest,
  GetProtocolsListResponse,
  GetProtocolsListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProtocolsListRequest,
  output: GetProtocolsListResponse,
  errors: [
    InternalErrorException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProtocolsList",
}));

export type GetResourceSetError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets information about a specific resource set.
 */
export const getResourceSet: API.OperationMethod<
  GetResourceSetRequest,
  GetResourceSetResponse,
  GetResourceSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourceSetRequest,
  output: GetResourceSetResponse,
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceSet",
}));

export type GetThirdPartyFirewallAssociationStatusError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * The onboarding status of a Firewall Manager admin account to third-party firewall vendor tenant.
 */
export const getThirdPartyFirewallAssociationStatus: API.OperationMethod<
  GetThirdPartyFirewallAssociationStatusRequest,
  GetThirdPartyFirewallAssociationStatusResponse,
  GetThirdPartyFirewallAssociationStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetThirdPartyFirewallAssociationStatusRequest,
  output: GetThirdPartyFirewallAssociationStatusResponse,
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetThirdPartyFirewallAssociationStatus",
}));

export type GetViolationDetailsError =
  | InternalErrorException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves violations for a resource based on the specified Firewall Manager policy and Amazon Web Services account.
 */
export const getViolationDetails: API.OperationMethod<
  GetViolationDetailsRequest,
  GetViolationDetailsResponse,
  GetViolationDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetViolationDetailsRequest,
  output: GetViolationDetailsResponse,
  errors: [
    InternalErrorException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetViolationDetails",
}));

export type ListAdminAccountsForOrganizationError =
  | InternalErrorException
  | InvalidOperationException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a `AdminAccounts` object that lists the Firewall Manager administrators within the organization that are onboarded to Firewall Manager by AssociateAdminAccount.
 *
 * This operation can be called only from the organization's management account.
 */
export const listAdminAccountsForOrganization: API.PaginatedOperationMethod<
  ListAdminAccountsForOrganizationRequest,
  ListAdminAccountsForOrganizationResponse,
  ListAdminAccountsForOrganizationError,
  Credentials | HttpClient.HttpClient,
  AdminAccountSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAdminAccountsForOrganizationRequest,
  output: ListAdminAccountsForOrganizationResponse,
  errors: [
    InternalErrorException,
    InvalidOperationException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAdminAccountsForOrganization",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AdminAccounts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAdminsManagingAccountError =
  | InternalErrorException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the accounts that are managing the specified Organizations member account. This is useful for any member account so that they can view the accounts who are managing their account. This operation only returns the managing administrators that have the requested account within their AdminScope.
 */
export const listAdminsManagingAccount: API.PaginatedOperationMethod<
  ListAdminsManagingAccountRequest,
  ListAdminsManagingAccountResponse,
  ListAdminsManagingAccountError,
  Credentials | HttpClient.HttpClient,
  AWSAccountId
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAdminsManagingAccountRequest,
  output: ListAdminsManagingAccountResponse,
  errors: [
    InternalErrorException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAdminsManagingAccount",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AdminAccounts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAppsListsError =
  | InternalErrorException
  | InvalidOperationException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns an array of `AppsListDataSummary` objects.
 */
export const listAppsLists: API.PaginatedOperationMethod<
  ListAppsListsRequest,
  ListAppsListsResponse,
  ListAppsListsError,
  Credentials | HttpClient.HttpClient,
  AppsListDataSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAppsListsRequest,
  output: ListAppsListsResponse,
  errors: [
    InternalErrorException,
    InvalidOperationException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAppsLists",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AppsLists",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListComplianceStatusError =
  | InternalErrorException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns an array of `PolicyComplianceStatus` objects. Use
 * `PolicyComplianceStatus` to get a summary of which member accounts are protected
 * by the specified policy.
 */
export const listComplianceStatus: API.PaginatedOperationMethod<
  ListComplianceStatusRequest,
  ListComplianceStatusResponse,
  ListComplianceStatusError,
  Credentials | HttpClient.HttpClient,
  PolicyComplianceStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListComplianceStatusRequest,
  output: ListComplianceStatusResponse,
  errors: [InternalErrorException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComplianceStatus",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PolicyComplianceStatusList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDiscoveredResourcesError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | CommonErrors;
/**
 * Returns an array of resources in the organization's accounts that are available to be associated with a resource set.
 */
export const listDiscoveredResources: API.OperationMethod<
  ListDiscoveredResourcesRequest,
  ListDiscoveredResourcesResponse,
  ListDiscoveredResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListDiscoveredResourcesRequest,
  output: ListDiscoveredResourcesResponse,
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDiscoveredResources",
}));

export type ListMemberAccountsError =
  | InternalErrorException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a `MemberAccounts` object that lists the member accounts in the
 * administrator's Amazon Web Services organization.
 *
 * Either an Firewall Manager administrator or the organization's management account can make this request.
 */
export const listMemberAccounts: API.PaginatedOperationMethod<
  ListMemberAccountsRequest,
  ListMemberAccountsResponse,
  ListMemberAccountsError,
  Credentials | HttpClient.HttpClient,
  AWSAccountId
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMemberAccountsRequest,
  output: ListMemberAccountsResponse,
  errors: [InternalErrorException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMemberAccounts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MemberAccounts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPoliciesError =
  | InternalErrorException
  | InvalidOperationException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns an array of `PolicySummary` objects.
 */
export const listPolicies: API.PaginatedOperationMethod<
  ListPoliciesRequest,
  ListPoliciesResponse,
  ListPoliciesError,
  Credentials | HttpClient.HttpClient,
  PolicySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPoliciesRequest,
  output: ListPoliciesResponse,
  errors: [
    InternalErrorException,
    InvalidOperationException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PolicyList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProtocolsListsError =
  | InternalErrorException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns an array of `ProtocolsListDataSummary` objects.
 */
export const listProtocolsLists: API.PaginatedOperationMethod<
  ListProtocolsListsRequest,
  ListProtocolsListsResponse,
  ListProtocolsListsError,
  Credentials | HttpClient.HttpClient,
  ProtocolsListDataSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProtocolsListsRequest,
  output: ListProtocolsListsResponse,
  errors: [
    InternalErrorException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProtocolsLists",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProtocolsLists",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourceSetResourcesError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns an array of resources that are currently associated to a resource set.
 */
export const listResourceSetResources: API.OperationMethod<
  ListResourceSetResourcesRequest,
  ListResourceSetResourcesResponse,
  ListResourceSetResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListResourceSetResourcesRequest,
  output: ListResourceSetResourcesResponse,
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceSetResources",
}));

export type ListResourceSetsError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | CommonErrors;
/**
 * Returns an array of `ResourceSetSummary` objects.
 */
export const listResourceSets: API.OperationMethod<
  ListResourceSetsRequest,
  ListResourceSetsResponse,
  ListResourceSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListResourceSetsRequest,
  output: ListResourceSetsResponse,
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceSets",
}));

export type ListTagsForResourceError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the list of tags for the specified Amazon Web Services resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListThirdPartyFirewallFirewallPoliciesError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list of all of the third-party firewall policies that are associated with the third-party firewall administrator's account.
 */
export const listThirdPartyFirewallFirewallPolicies: API.PaginatedOperationMethod<
  ListThirdPartyFirewallFirewallPoliciesRequest,
  ListThirdPartyFirewallFirewallPoliciesResponse,
  ListThirdPartyFirewallFirewallPoliciesError,
  Credentials | HttpClient.HttpClient,
  ThirdPartyFirewallFirewallPolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListThirdPartyFirewallFirewallPoliciesRequest,
  output: ListThirdPartyFirewallFirewallPoliciesResponse,
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThirdPartyFirewallFirewallPolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ThirdPartyFirewallFirewallPolicies",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutAdminAccountError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates or updates an Firewall Manager administrator account. The account must be a member of the organization that was onboarded to Firewall Manager by AssociateAdminAccount. Only the organization's management account can create an Firewall Manager administrator account. When you create an Firewall Manager administrator account, the service checks to see if the account is already a delegated administrator within Organizations. If the account isn't a delegated administrator, Firewall Manager calls Organizations to delegate the account within Organizations. For more information about administrator accounts within Organizations, see
 * Managing the Amazon Web Services Accounts in Your Organization.
 */
export const putAdminAccount: API.OperationMethod<
  PutAdminAccountRequest,
  PutAdminAccountResponse,
  PutAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAdminAccountRequest,
  output: PutAdminAccountResponse,
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAdminAccount",
}));

export type PutAppsListError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates an Firewall Manager applications list.
 */
export const putAppsList: API.OperationMethod<
  PutAppsListRequest,
  PutAppsListResponse,
  PutAppsListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAppsListRequest,
  output: PutAppsListResponse,
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAppsList",
}));

export type PutNotificationChannelError =
  | InternalErrorException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Designates the IAM role and Amazon Simple Notification Service (SNS) topic that
 * Firewall Manager uses to record SNS logs.
 *
 * To perform this action outside of the console, you must first configure the SNS topic's access policy to allow the `SnsRoleName` to publish SNS logs. If the `SnsRoleName` provided is a role other than the `AWSServiceRoleForFMS` service-linked role, this role must have a trust relationship configured to allow the Firewall Manager service principal `fms.amazonaws.com` to assume this role. For information about configuring an SNS access policy, see
 * Service roles for Firewall Manager in the *Firewall Manager Developer Guide*.
 */
export const putNotificationChannel: API.OperationMethod<
  PutNotificationChannelRequest,
  PutNotificationChannelResponse,
  PutNotificationChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutNotificationChannelRequest,
  output: PutNotificationChannelResponse,
  errors: [
    InternalErrorException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutNotificationChannel",
}));

export type PutPolicyError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates an Firewall Manager policy.
 *
 * A Firewall Manager policy is specific to the individual policy type. If you want to enforce multiple
 * policy types across accounts, you can create multiple policies. You can create more than one
 * policy for each type.
 *
 * If you add a new account to an organization that you created with Organizations, Firewall Manager
 * automatically applies the policy to the resources in that account that are within scope of
 * the policy.
 *
 * Firewall Manager provides the following types of policies:
 *
 * - **WAF policy** - This policy applies WAF web ACL
 * protections to specified accounts and resources.
 *
 * - **Shield Advanced policy** - This policy applies Shield Advanced
 * protection to specified accounts and resources.
 *
 * - **Security Groups policy** - This type of policy gives you
 * control over security groups that are in use throughout your organization in
 * Organizations and lets you enforce a baseline set of rules across your organization.
 *
 * - **Network ACL policy** - This type of policy gives you
 * control over the network ACLs that are in use throughout your organization in
 * Organizations and lets you enforce a baseline set of first and last network ACL rules across your organization.
 *
 * - **Network Firewall policy** - This policy applies
 * Network Firewall protection to your organization's VPCs.
 *
 * - **DNS Firewall policy** - This policy applies
 * Amazon Route 53 Resolver DNS Firewall protections to your organization's VPCs.
 *
 * - **Third-party firewall policy** - This policy applies third-party firewall protections. Third-party firewalls are available by subscription through the Amazon Web Services Marketplace console at Amazon Web Services Marketplace.
 *
 * - **Palo Alto Networks Cloud NGFW policy** - This policy applies Palo Alto Networks Cloud Next Generation Firewall (NGFW) protections and Palo Alto Networks Cloud NGFW rulestacks to your organization's VPCs.
 *
 * - **Fortigate CNF policy** - This policy applies
 * Fortigate Cloud Native Firewall (CNF) protections. Fortigate CNF is a cloud-centered solution that blocks Zero-Day threats and secures cloud infrastructures with industry-leading advanced threat prevention, smart web application firewalls (WAF), and API protection.
 */
export const putPolicy: API.OperationMethod<
  PutPolicyRequest,
  PutPolicyResponse,
  PutPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutPolicyRequest,
  output: PutPolicyResponse,
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPolicy",
}));

export type PutProtocolsListError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates an Firewall Manager protocols list.
 */
export const putProtocolsList: API.OperationMethod<
  PutProtocolsListRequest,
  PutProtocolsListResponse,
  PutProtocolsListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutProtocolsListRequest,
  output: PutProtocolsListResponse,
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutProtocolsList",
}));

export type PutResourceSetError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates the resource set.
 *
 * An Firewall Manager resource set defines the resources to import into an Firewall Manager policy from another Amazon Web Services service.
 */
export const putResourceSet: API.OperationMethod<
  PutResourceSetRequest,
  PutResourceSetResponse,
  PutResourceSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutResourceSetRequest,
  output: PutResourceSetResponse,
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourceSet",
}));

export type TagResourceError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds one or more tags to an Amazon Web Services resource.
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
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes one or more tags from an Amazon Web Services resource.
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
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));
