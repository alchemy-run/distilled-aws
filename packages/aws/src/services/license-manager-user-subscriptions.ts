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
  sdkId: "License Manager User Subscriptions",
  serviceShapeName: "LicenseManagerUserSubscriptions",
});
const auth = T.AwsAuthSigv4({ name: "license-manager-user-subscriptions" });
const ver = T.ServiceVersion("2018-05-10");
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
              `https://license-manager-user-subscriptions-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://license-manager-user-subscriptions-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://license-manager-user-subscriptions.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://license-manager-user-subscriptions.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type Directory = string;
export type IpV4 = string;
export type IpV4List = string[];
export const IpV4List = /*@__PURE__*/ S.Array(S.String);
export type IpV6 = string;
export type IpV6List = string[];
export const IpV6List = /*@__PURE__*/ S.Array(S.String);
export interface SecretsManagerCredentialsProvider {
  SecretId?: string;
}
export const SecretsManagerCredentialsProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SecretId: S.optional(S.String) }),
).annotate({
  identifier: "SecretsManagerCredentialsProvider",
}) as any as S.Schema<SecretsManagerCredentialsProvider>;
export type CredentialsProvider = {
  SecretsManagerCredentialsProvider: SecretsManagerCredentialsProvider;
};
export const CredentialsProvider = /*@__PURE__*/ S.Union([
  S.Struct({
    SecretsManagerCredentialsProvider: SecretsManagerCredentialsProvider,
  }),
]);
export type Subnet = string;
export type Subnets = string[];
export const Subnets = /*@__PURE__*/ S.Array(S.String);
export interface DomainNetworkSettings {
  Subnets: string[];
}
export const DomainNetworkSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Subnets: Subnets }),
).annotate({
  identifier: "DomainNetworkSettings",
}) as any as S.Schema<DomainNetworkSettings>;
export interface ActiveDirectorySettings {
  DomainName?: string;
  DomainIpv4List?: string[];
  DomainIpv6List?: string[];
  DomainCredentialsProvider?: CredentialsProvider;
  DomainNetworkSettings?: DomainNetworkSettings;
}
export const ActiveDirectorySettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.optional(S.String),
    DomainIpv4List: S.optional(IpV4List),
    DomainIpv6List: S.optional(IpV6List),
    DomainCredentialsProvider: S.optional(CredentialsProvider),
    DomainNetworkSettings: S.optional(DomainNetworkSettings),
  }),
).annotate({
  identifier: "ActiveDirectorySettings",
}) as any as S.Schema<ActiveDirectorySettings>;
export type ActiveDirectoryType = string;
export interface ActiveDirectoryIdentityProvider {
  DirectoryId?: string;
  ActiveDirectorySettings?: ActiveDirectorySettings;
  ActiveDirectoryType?: string;
  IsSharedActiveDirectory?: boolean;
}
export const ActiveDirectoryIdentityProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    ActiveDirectorySettings: S.optional(ActiveDirectorySettings),
    ActiveDirectoryType: S.optional(S.String),
    IsSharedActiveDirectory: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ActiveDirectoryIdentityProvider",
}) as any as S.Schema<ActiveDirectoryIdentityProvider>;
export type IdentityProvider = {
  ActiveDirectoryIdentityProvider: ActiveDirectoryIdentityProvider;
};
export const IdentityProvider = /*@__PURE__*/ S.Union([
  S.Struct({
    ActiveDirectoryIdentityProvider: ActiveDirectoryIdentityProvider,
  }),
]);
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export interface AssociateUserRequest {
  Username: string;
  InstanceId: string;
  IdentityProvider: IdentityProvider;
  Domain?: string;
  Tags?: { [key: string]: string | undefined };
}
export const AssociateUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Username: S.String,
    InstanceId: S.String,
    IdentityProvider: IdentityProvider,
    Domain: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/user/AssociateUser" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateUserRequest",
}) as any as S.Schema<AssociateUserRequest>;
export type Arn = string;
export interface InstanceUserSummary {
  Username: string;
  InstanceId: string;
  IdentityProvider: IdentityProvider;
  Status: string;
  InstanceUserArn?: string;
  StatusMessage?: string;
  Domain?: string;
  AssociationDate?: string;
  DisassociationDate?: string;
}
export const InstanceUserSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Username: S.String,
    InstanceId: S.String,
    IdentityProvider: IdentityProvider,
    Status: S.String,
    InstanceUserArn: S.optional(S.String),
    StatusMessage: S.optional(S.String),
    Domain: S.optional(S.String),
    AssociationDate: S.optional(S.String),
    DisassociationDate: S.optional(S.String),
  }),
).annotate({
  identifier: "InstanceUserSummary",
}) as any as S.Schema<InstanceUserSummary>;
export interface AssociateUserResponse {
  InstanceUserSummary: InstanceUserSummary;
}
export const AssociateUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InstanceUserSummary: InstanceUserSummary }),
).annotate({
  identifier: "AssociateUserResponse",
}) as any as S.Schema<AssociateUserResponse>;
export type ServerType = string;
export interface RdsSalSettings {
  RdsSalCredentialsProvider: CredentialsProvider;
}
export const RdsSalSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RdsSalCredentialsProvider: CredentialsProvider }),
).annotate({ identifier: "RdsSalSettings" }) as any as S.Schema<RdsSalSettings>;
export type ServerSettings = { RdsSalSettings: RdsSalSettings };
export const ServerSettings = /*@__PURE__*/ S.Union([
  S.Struct({ RdsSalSettings: RdsSalSettings }),
]);
export interface LicenseServerSettings {
  ServerType: string;
  ServerSettings: ServerSettings;
}
export const LicenseServerSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServerType: S.String, ServerSettings: ServerSettings }),
).annotate({
  identifier: "LicenseServerSettings",
}) as any as S.Schema<LicenseServerSettings>;
export interface CreateLicenseServerEndpointRequest {
  IdentityProviderArn: string;
  LicenseServerSettings: LicenseServerSettings;
  Tags?: { [key: string]: string | undefined };
}
export const CreateLicenseServerEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityProviderArn: S.String,
    LicenseServerSettings: LicenseServerSettings,
    Tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/license-server/CreateLicenseServerEndpoint",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateLicenseServerEndpointRequest",
}) as any as S.Schema<CreateLicenseServerEndpointRequest>;
export interface CreateLicenseServerEndpointResponse {
  IdentityProviderArn?: string;
  LicenseServerEndpointArn?: string;
}
export const CreateLicenseServerEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityProviderArn: S.optional(S.String),
    LicenseServerEndpointArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateLicenseServerEndpointResponse",
}) as any as S.Schema<CreateLicenseServerEndpointResponse>;
export interface DeleteLicenseServerEndpointRequest {
  LicenseServerEndpointArn: string;
  ServerType: string;
}
export const DeleteLicenseServerEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LicenseServerEndpointArn: S.String, ServerType: S.String }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/license-server/DeleteLicenseServerEndpoint",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLicenseServerEndpointRequest",
}) as any as S.Schema<DeleteLicenseServerEndpointRequest>;
export interface ServerEndpoint {
  Endpoint?: string;
}
export const ServerEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Endpoint: S.optional(S.String) }),
).annotate({ identifier: "ServerEndpoint" }) as any as S.Schema<ServerEndpoint>;
export type LicenseServerEndpointId = string;
export type LicenseServerEndpointProvisioningStatus = string;
export type LicenseServerHealthStatus = string;
export interface LicenseServer {
  ProvisioningStatus?: string;
  HealthStatus?: string;
  Ipv4Address?: string;
  Ipv6Address?: string;
}
export const LicenseServer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProvisioningStatus: S.optional(S.String),
    HealthStatus: S.optional(S.String),
    Ipv4Address: S.optional(S.String),
    Ipv6Address: S.optional(S.String),
  }),
).annotate({ identifier: "LicenseServer" }) as any as S.Schema<LicenseServer>;
export type LicenseServerList = LicenseServer[];
export const LicenseServerList = /*@__PURE__*/ S.Array(LicenseServer);
export interface LicenseServerEndpoint {
  IdentityProviderArn?: string;
  ServerType?: string;
  ServerEndpoint?: ServerEndpoint;
  StatusMessage?: string;
  LicenseServerEndpointId?: string;
  LicenseServerEndpointArn?: string;
  LicenseServerEndpointProvisioningStatus?: string;
  LicenseServers?: LicenseServer[];
  CreationTime?: Date;
}
export const LicenseServerEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityProviderArn: S.optional(S.String),
    ServerType: S.optional(S.String),
    ServerEndpoint: S.optional(ServerEndpoint),
    StatusMessage: S.optional(S.String),
    LicenseServerEndpointId: S.optional(S.String),
    LicenseServerEndpointArn: S.optional(S.String),
    LicenseServerEndpointProvisioningStatus: S.optional(S.String),
    LicenseServers: S.optional(LicenseServerList),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "LicenseServerEndpoint",
}) as any as S.Schema<LicenseServerEndpoint>;
export interface DeleteLicenseServerEndpointResponse {
  LicenseServerEndpoint?: LicenseServerEndpoint;
}
export const DeleteLicenseServerEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LicenseServerEndpoint: S.optional(LicenseServerEndpoint) }),
).annotate({
  identifier: "DeleteLicenseServerEndpointResponse",
}) as any as S.Schema<DeleteLicenseServerEndpointResponse>;
export interface DeregisterIdentityProviderRequest {
  IdentityProvider?: IdentityProvider;
  Product?: string;
  IdentityProviderArn?: string;
}
export const DeregisterIdentityProviderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityProvider: S.optional(IdentityProvider),
    Product: S.optional(S.String),
    IdentityProviderArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/identity-provider/DeregisterIdentityProvider",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeregisterIdentityProviderRequest",
}) as any as S.Schema<DeregisterIdentityProviderRequest>;
export type SecurityGroup = string;
export interface Settings {
  Subnets: string[];
  SecurityGroupId: string;
}
export const Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Subnets: Subnets, SecurityGroupId: S.String }),
).annotate({ identifier: "Settings" }) as any as S.Schema<Settings>;
export interface IdentityProviderSummary {
  IdentityProvider: IdentityProvider;
  Settings: Settings;
  Product: string;
  Status: string;
  IdentityProviderArn?: string;
  FailureMessage?: string;
  OwnerAccountId?: string;
}
export const IdentityProviderSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityProvider: IdentityProvider,
    Settings: Settings,
    Product: S.String,
    Status: S.String,
    IdentityProviderArn: S.optional(S.String),
    FailureMessage: S.optional(S.String),
    OwnerAccountId: S.optional(S.String),
  }),
).annotate({
  identifier: "IdentityProviderSummary",
}) as any as S.Schema<IdentityProviderSummary>;
export interface DeregisterIdentityProviderResponse {
  IdentityProviderSummary: IdentityProviderSummary;
}
export const DeregisterIdentityProviderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IdentityProviderSummary: IdentityProviderSummary }),
).annotate({
  identifier: "DeregisterIdentityProviderResponse",
}) as any as S.Schema<DeregisterIdentityProviderResponse>;
export interface DisassociateUserRequest {
  Username?: string;
  InstanceId?: string;
  IdentityProvider?: IdentityProvider;
  InstanceUserArn?: string;
  Domain?: string;
}
export const DisassociateUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Username: S.optional(S.String),
    InstanceId: S.optional(S.String),
    IdentityProvider: S.optional(IdentityProvider),
    InstanceUserArn: S.optional(S.String),
    Domain: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/user/DisassociateUser" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateUserRequest",
}) as any as S.Schema<DisassociateUserRequest>;
export interface DisassociateUserResponse {
  InstanceUserSummary: InstanceUserSummary;
}
export const DisassociateUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InstanceUserSummary: InstanceUserSummary }),
).annotate({
  identifier: "DisassociateUserResponse",
}) as any as S.Schema<DisassociateUserResponse>;
export type BoxInteger = number;
export interface Filter {
  Attribute?: string;
  Operation?: string;
  Value?: string;
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attribute: S.optional(S.String),
    Operation: S.optional(S.String),
    Value: S.optional(S.String),
  }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type FilterList = Filter[];
export const FilterList = /*@__PURE__*/ S.Array(Filter);
export interface ListIdentityProvidersRequest {
  MaxResults?: number;
  Filters?: Filter[];
  NextToken?: string;
}
export const ListIdentityProvidersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    Filters: S.optional(FilterList),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/identity-provider/ListIdentityProviders",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIdentityProvidersRequest",
}) as any as S.Schema<ListIdentityProvidersRequest>;
export type IdentityProviderSummaryList = IdentityProviderSummary[];
export const IdentityProviderSummaryList = /*@__PURE__*/ S.Array(
  IdentityProviderSummary,
);
export interface ListIdentityProvidersResponse {
  IdentityProviderSummaries: IdentityProviderSummary[];
  NextToken?: string;
}
export const ListIdentityProvidersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityProviderSummaries: IdentityProviderSummaryList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListIdentityProvidersResponse",
}) as any as S.Schema<ListIdentityProvidersResponse>;
export interface ListInstancesRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export const ListInstancesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(FilterList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/instance/ListInstances" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListInstancesRequest",
}) as any as S.Schema<ListInstancesRequest>;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface InstanceSummary {
  InstanceId: string;
  Status: string;
  Products: string[];
  LastStatusCheckDate?: string;
  StatusMessage?: string;
  OwnerAccountId?: string;
  IdentityProvider?: IdentityProvider;
}
export const InstanceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceId: S.String,
    Status: S.String,
    Products: StringList,
    LastStatusCheckDate: S.optional(S.String),
    StatusMessage: S.optional(S.String),
    OwnerAccountId: S.optional(S.String),
    IdentityProvider: S.optional(IdentityProvider),
  }),
).annotate({
  identifier: "InstanceSummary",
}) as any as S.Schema<InstanceSummary>;
export type InstanceSummaryList = InstanceSummary[];
export const InstanceSummaryList = /*@__PURE__*/ S.Array(InstanceSummary);
export interface ListInstancesResponse {
  InstanceSummaries?: InstanceSummary[];
  NextToken?: string;
}
export const ListInstancesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceSummaries: S.optional(InstanceSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListInstancesResponse",
}) as any as S.Schema<ListInstancesResponse>;
export interface ListLicenseServerEndpointsRequest {
  MaxResults?: number;
  Filters?: Filter[];
  NextToken?: string;
}
export const ListLicenseServerEndpointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    Filters: S.optional(FilterList),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/license-server/ListLicenseServerEndpoints",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLicenseServerEndpointsRequest",
}) as any as S.Schema<ListLicenseServerEndpointsRequest>;
export type LicenseServerEndpointList = LicenseServerEndpoint[];
export const LicenseServerEndpointList = /*@__PURE__*/ S.Array(
  LicenseServerEndpoint,
);
export interface ListLicenseServerEndpointsResponse {
  LicenseServerEndpoints?: LicenseServerEndpoint[];
  NextToken?: string;
}
export const ListLicenseServerEndpointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseServerEndpoints: S.optional(LicenseServerEndpointList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLicenseServerEndpointsResponse",
}) as any as S.Schema<ListLicenseServerEndpointsResponse>;
export interface ListProductSubscriptionsRequest {
  Product?: string;
  IdentityProvider: IdentityProvider;
  MaxResults?: number;
  Filters?: Filter[];
  NextToken?: string;
}
export const ListProductSubscriptionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Product: S.optional(S.String),
    IdentityProvider: IdentityProvider,
    MaxResults: S.optional(S.Number),
    Filters: S.optional(FilterList),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/user/ListProductSubscriptions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProductSubscriptionsRequest",
}) as any as S.Schema<ListProductSubscriptionsRequest>;
export interface ProductUserSummary {
  Username: string;
  Product: string;
  IdentityProvider: IdentityProvider;
  Status: string;
  ProductUserArn?: string;
  StatusMessage?: string;
  Domain?: string;
  SubscriptionStartDate?: string;
  SubscriptionEndDate?: string;
}
export const ProductUserSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Username: S.String,
    Product: S.String,
    IdentityProvider: IdentityProvider,
    Status: S.String,
    ProductUserArn: S.optional(S.String),
    StatusMessage: S.optional(S.String),
    Domain: S.optional(S.String),
    SubscriptionStartDate: S.optional(S.String),
    SubscriptionEndDate: S.optional(S.String),
  }),
).annotate({
  identifier: "ProductUserSummary",
}) as any as S.Schema<ProductUserSummary>;
export type ProductUserSummaryList = ProductUserSummary[];
export const ProductUserSummaryList = /*@__PURE__*/ S.Array(ProductUserSummary);
export interface ListProductSubscriptionsResponse {
  ProductUserSummaries?: ProductUserSummary[];
  NextToken?: string;
}
export const ListProductSubscriptionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductUserSummaries: S.optional(ProductUserSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProductSubscriptionsResponse",
}) as any as S.Schema<ListProductSubscriptionsResponse>;
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
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
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListUserAssociationsRequest {
  InstanceId: string;
  IdentityProvider: IdentityProvider;
  MaxResults?: number;
  Filters?: Filter[];
  NextToken?: string;
}
export const ListUserAssociationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceId: S.String,
    IdentityProvider: IdentityProvider,
    MaxResults: S.optional(S.Number),
    Filters: S.optional(FilterList),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/user/ListUserAssociations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListUserAssociationsRequest",
}) as any as S.Schema<ListUserAssociationsRequest>;
export type InstanceUserSummaryList = InstanceUserSummary[];
export const InstanceUserSummaryList =
  /*@__PURE__*/ S.Array(InstanceUserSummary);
export interface ListUserAssociationsResponse {
  InstanceUserSummaries?: InstanceUserSummary[];
  NextToken?: string;
}
export const ListUserAssociationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceUserSummaries: S.optional(InstanceUserSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListUserAssociationsResponse",
}) as any as S.Schema<ListUserAssociationsResponse>;
export interface RegisterIdentityProviderRequest {
  IdentityProvider: IdentityProvider;
  Product: string;
  Settings?: Settings;
  Tags?: { [key: string]: string | undefined };
}
export const RegisterIdentityProviderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityProvider: IdentityProvider,
    Product: S.String,
    Settings: S.optional(Settings),
    Tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/identity-provider/RegisterIdentityProvider",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterIdentityProviderRequest",
}) as any as S.Schema<RegisterIdentityProviderRequest>;
export interface RegisterIdentityProviderResponse {
  IdentityProviderSummary: IdentityProviderSummary;
}
export const RegisterIdentityProviderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IdentityProviderSummary: IdentityProviderSummary }),
).annotate({
  identifier: "RegisterIdentityProviderResponse",
}) as any as S.Schema<RegisterIdentityProviderResponse>;
export interface StartProductSubscriptionRequest {
  Username: string;
  IdentityProvider: IdentityProvider;
  Product: string;
  Domain?: string;
  Tags?: { [key: string]: string | undefined };
}
export const StartProductSubscriptionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Username: S.String,
    IdentityProvider: IdentityProvider,
    Product: S.String,
    Domain: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/user/StartProductSubscription" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartProductSubscriptionRequest",
}) as any as S.Schema<StartProductSubscriptionRequest>;
export interface StartProductSubscriptionResponse {
  ProductUserSummary: ProductUserSummary;
}
export const StartProductSubscriptionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProductUserSummary: ProductUserSummary }),
).annotate({
  identifier: "StartProductSubscriptionResponse",
}) as any as S.Schema<StartProductSubscriptionResponse>;
export interface StopProductSubscriptionRequest {
  Username?: string;
  IdentityProvider?: IdentityProvider;
  Product?: string;
  ProductUserArn?: string;
  Domain?: string;
}
export const StopProductSubscriptionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Username: S.optional(S.String),
    IdentityProvider: S.optional(IdentityProvider),
    Product: S.optional(S.String),
    ProductUserArn: S.optional(S.String),
    Domain: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/user/StopProductSubscription" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopProductSubscriptionRequest",
}) as any as S.Schema<StopProductSubscriptionRequest>;
export interface StopProductSubscriptionResponse {
  ProductUserSummary: ProductUserSummary;
}
export const StopProductSubscriptionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProductUserSummary: ProductUserSummary }),
).annotate({
  identifier: "StopProductSubscriptionResponse",
}) as any as S.Schema<StopProductSubscriptionResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: Tags,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/tags/{ResourceArn}" }),
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
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
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
export interface UpdateSettings {
  AddSubnets: string[];
  RemoveSubnets: string[];
  SecurityGroupId?: string;
}
export const UpdateSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AddSubnets: Subnets,
    RemoveSubnets: Subnets,
    SecurityGroupId: S.optional(S.String),
  }),
).annotate({ identifier: "UpdateSettings" }) as any as S.Schema<UpdateSettings>;
export interface UpdateIdentityProviderSettingsRequest {
  IdentityProvider?: IdentityProvider;
  Product?: string;
  IdentityProviderArn?: string;
  UpdateSettings: UpdateSettings;
}
export const UpdateIdentityProviderSettingsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      IdentityProvider: S.optional(IdentityProvider),
      Product: S.optional(S.String),
      IdentityProviderArn: S.optional(S.String),
      UpdateSettings: UpdateSettings,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/identity-provider/UpdateIdentityProviderSettings",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateIdentityProviderSettingsRequest",
}) as any as S.Schema<UpdateIdentityProviderSettingsRequest>;
export interface UpdateIdentityProviderSettingsResponse {
  IdentityProviderSummary: IdentityProviderSummary;
}
export const UpdateIdentityProviderSettingsResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ IdentityProviderSummary: IdentityProviderSummary }),
).annotate({
  identifier: "UpdateIdentityProviderSettingsResponse",
}) as any as S.Schema<UpdateIdentityProviderSettingsResponse>;
export type AssociateUserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates the user to an EC2 instance to utilize user-based subscriptions.
 *
 * Your estimated bill for charges on the number of users and related costs will take 48 hours to appear for billing periods that haven't closed (marked as **Pending** billing status) in Amazon Web Services Billing. For more information, see Viewing your monthly charges in the *Amazon Web Services Billing User Guide*.
 */
export const associateUser: API.OperationMethod<
  AssociateUserRequest,
  AssociateUserResponse,
  AssociateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateUserRequest,
  output: AssociateUserResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateUser",
}));

export type CreateLicenseServerEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a network endpoint for the Remote Desktop Services (RDS) license server.
 */
export const createLicenseServerEndpoint: API.OperationMethod<
  CreateLicenseServerEndpointRequest,
  CreateLicenseServerEndpointResponse,
  CreateLicenseServerEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLicenseServerEndpointRequest,
  output: CreateLicenseServerEndpointResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLicenseServerEndpoint",
}));

export type DeleteLicenseServerEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a `LicenseServerEndpoint` resource.
 */
export const deleteLicenseServerEndpoint: API.OperationMethod<
  DeleteLicenseServerEndpointRequest,
  DeleteLicenseServerEndpointResponse,
  DeleteLicenseServerEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLicenseServerEndpointRequest,
  output: DeleteLicenseServerEndpointResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLicenseServerEndpoint",
}));

export type DeregisterIdentityProviderError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deregisters the Active Directory identity provider from License Manager user-based subscriptions.
 */
export const deregisterIdentityProvider: API.OperationMethod<
  DeregisterIdentityProviderRequest,
  DeregisterIdentityProviderResponse,
  DeregisterIdentityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterIdentityProviderRequest,
  output: DeregisterIdentityProviderResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterIdentityProvider",
}));

export type DisassociateUserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates the user from an EC2 instance providing user-based subscriptions.
 */
export const disassociateUser: API.OperationMethod<
  DisassociateUserRequest,
  DisassociateUserResponse,
  DisassociateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateUserRequest,
  output: DisassociateUserResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateUser",
}));

export type ListIdentityProvidersError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Active Directory identity providers for user-based subscriptions.
 */
export const listIdentityProviders: API.PaginatedOperationMethod<
  ListIdentityProvidersRequest,
  ListIdentityProvidersResponse,
  ListIdentityProvidersError,
  Credentials | HttpClient.HttpClient,
  IdentityProviderSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIdentityProvidersRequest,
  output: ListIdentityProvidersResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdentityProviders",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "IdentityProviderSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInstancesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the EC2 instances providing user-based subscriptions.
 */
export const listInstances: API.PaginatedOperationMethod<
  ListInstancesRequest,
  ListInstancesResponse,
  ListInstancesError,
  Credentials | HttpClient.HttpClient,
  InstanceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInstancesRequest,
  output: ListInstancesResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InstanceSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLicenseServerEndpointsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the Remote Desktop Services (RDS) License Server endpoints
 */
export const listLicenseServerEndpoints: API.PaginatedOperationMethod<
  ListLicenseServerEndpointsRequest,
  ListLicenseServerEndpointsResponse,
  ListLicenseServerEndpointsError,
  Credentials | HttpClient.HttpClient,
  LicenseServerEndpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLicenseServerEndpointsRequest,
  output: ListLicenseServerEndpointsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLicenseServerEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "LicenseServerEndpoints",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProductSubscriptionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the user-based subscription products available from an identity provider.
 */
export const listProductSubscriptions: API.PaginatedOperationMethod<
  ListProductSubscriptionsRequest,
  ListProductSubscriptionsResponse,
  ListProductSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  ProductUserSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProductSubscriptionsRequest,
  output: ListProductSubscriptionsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProductSubscriptions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProductUserSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the list of tags for the specified resource.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListUserAssociationsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists user associations for an identity provider.
 */
export const listUserAssociations: API.PaginatedOperationMethod<
  ListUserAssociationsRequest,
  ListUserAssociationsResponse,
  ListUserAssociationsError,
  Credentials | HttpClient.HttpClient,
  InstanceUserSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListUserAssociationsRequest,
  output: ListUserAssociationsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUserAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InstanceUserSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type RegisterIdentityProviderError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Registers an identity provider for user-based subscriptions.
 */
export const registerIdentityProvider: API.OperationMethod<
  RegisterIdentityProviderRequest,
  RegisterIdentityProviderResponse,
  RegisterIdentityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterIdentityProviderRequest,
  output: RegisterIdentityProviderResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterIdentityProvider",
}));

export type StartProductSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a product subscription for a user with the specified identity provider.
 *
 * Your estimated bill for charges on the number of users and related costs will take 48 hours to appear for billing periods that haven't closed (marked as **Pending** billing status) in Amazon Web Services Billing. For more information, see Viewing your monthly charges in the *Amazon Web Services Billing User Guide*.
 */
export const startProductSubscription: API.OperationMethod<
  StartProductSubscriptionRequest,
  StartProductSubscriptionResponse,
  StartProductSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartProductSubscriptionRequest,
  output: StartProductSubscriptionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartProductSubscription",
}));

export type StopProductSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a product subscription for a user with the specified identity provider.
 */
export const stopProductSubscription: API.OperationMethod<
  StopProductSubscriptionRequest,
  StopProductSubscriptionResponse,
  StopProductSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopProductSubscriptionRequest,
  output: StopProductSubscriptionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopProductSubscription",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds tags to a resource.
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
  | CommonErrors;
/**
 * Removes tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateIdentityProviderSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates additional product configuration settings for the registered identity provider.
 */
export const updateIdentityProviderSettings: API.OperationMethod<
  UpdateIdentityProviderSettingsRequest,
  UpdateIdentityProviderSettingsResponse,
  UpdateIdentityProviderSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIdentityProviderSettingsRequest,
  output: UpdateIdentityProviderSettingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIdentityProviderSettings",
}));
