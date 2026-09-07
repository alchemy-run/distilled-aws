import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc = T.AwsApiService({
  sdkId: "License Manager Linux Subscriptions",
  serviceShapeName: "LicenseManagerLinuxSubscriptions",
});
const auth = T.AwsAuthSigv4({ name: "license-manager-linux-subscriptions" });
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
              `https://license-manager-linux-subscriptions-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://license-manager-linux-subscriptions-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://license-manager-linux-subscriptions.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://license-manager-linux-subscriptions.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
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
export type SubscriptionProviderArn = string;
export interface DeregisterSubscriptionProviderRequest {
  SubscriptionProviderArn: string;
}
export const DeregisterSubscriptionProviderRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ SubscriptionProviderArn: S.String }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/subscription/DeregisterSubscriptionProvider",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeregisterSubscriptionProviderRequest",
}) as any as S.Schema<DeregisterSubscriptionProviderRequest>;
export interface DeregisterSubscriptionProviderResponse {}
export const DeregisterSubscriptionProviderResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeregisterSubscriptionProviderResponse",
}) as any as S.Schema<DeregisterSubscriptionProviderResponse>;
export interface GetRegisteredSubscriptionProviderRequest {
  SubscriptionProviderArn: string;
}
export const GetRegisteredSubscriptionProviderRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ SubscriptionProviderArn: S.String }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/subscription/GetRegisteredSubscriptionProvider",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetRegisteredSubscriptionProviderRequest",
}) as any as S.Schema<GetRegisteredSubscriptionProviderRequest>;
export type SubscriptionProviderSource = string;
export type SecretArn = string;
export type SubscriptionProviderStatus = string;
export interface GetRegisteredSubscriptionProviderResponse {
  SubscriptionProviderArn?: string;
  SubscriptionProviderSource?: string;
  SecretArn?: string;
  SubscriptionProviderStatus?: string;
  SubscriptionProviderStatusMessage?: string;
  LastSuccessfulDataRetrievalTime?: string;
}
export const GetRegisteredSubscriptionProviderResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      SubscriptionProviderArn: S.optional(S.String),
      SubscriptionProviderSource: S.optional(S.String),
      SecretArn: S.optional(S.String),
      SubscriptionProviderStatus: S.optional(S.String),
      SubscriptionProviderStatusMessage: S.optional(S.String),
      LastSuccessfulDataRetrievalTime: S.optional(S.String),
    }),
  ).annotate({
    identifier: "GetRegisteredSubscriptionProviderResponse",
  }) as any as S.Schema<GetRegisteredSubscriptionProviderResponse>;
export interface GetServiceSettingsRequest {}
export const GetServiceSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/subscription/GetServiceSettings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetServiceSettingsRequest",
}) as any as S.Schema<GetServiceSettingsRequest>;
export type LinuxSubscriptionsDiscovery = string;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export type OrganizationIntegration = string;
export interface LinuxSubscriptionsDiscoverySettings {
  SourceRegions: string[];
  OrganizationIntegration: string;
}
export const LinuxSubscriptionsDiscoverySettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SourceRegions: StringList, OrganizationIntegration: S.String }),
).annotate({
  identifier: "LinuxSubscriptionsDiscoverySettings",
}) as any as S.Schema<LinuxSubscriptionsDiscoverySettings>;
export type Status = string;
export type StringMap = { [key: string]: string | undefined };
export const StringMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface GetServiceSettingsResponse {
  LinuxSubscriptionsDiscovery?: string;
  LinuxSubscriptionsDiscoverySettings?: LinuxSubscriptionsDiscoverySettings;
  Status?: string;
  StatusMessage?: { [key: string]: string | undefined };
  HomeRegions?: string[];
}
export const GetServiceSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LinuxSubscriptionsDiscovery: S.optional(S.String),
    LinuxSubscriptionsDiscoverySettings: S.optional(
      LinuxSubscriptionsDiscoverySettings,
    ),
    Status: S.optional(S.String),
    StatusMessage: S.optional(StringMap),
    HomeRegions: S.optional(StringList),
  }),
).annotate({
  identifier: "GetServiceSettingsResponse",
}) as any as S.Schema<GetServiceSettingsResponse>;
export type Operator = string;
export interface Filter {
  Name?: string;
  Values?: string[];
  Operator?: string;
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Values: S.optional(StringList),
    Operator: S.optional(S.String),
  }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type FilterList = Filter[];
export const FilterList = /*@__PURE__*/ S.Array(Filter);
export type BoxInteger = number;
export interface ListLinuxSubscriptionInstancesRequest {
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export const ListLinuxSubscriptionInstancesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Filters: S.optional(FilterList),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/subscription/ListLinuxSubscriptionInstances",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListLinuxSubscriptionInstancesRequest",
}) as any as S.Schema<ListLinuxSubscriptionInstancesRequest>;
export type ProductCodeList = string[];
export const ProductCodeList = /*@__PURE__*/ S.Array(S.String);
export interface Instance {
  AmiId?: string;
  InstanceID?: string;
  InstanceType?: string;
  AccountID?: string;
  Status?: string;
  Region?: string;
  UsageOperation?: string;
  ProductCode?: string[];
  LastUpdatedTime?: string;
  SubscriptionName?: string;
  OsVersion?: string;
  SubscriptionProviderCreateTime?: string;
  SubscriptionProviderUpdateTime?: string;
  DualSubscription?: string;
  RegisteredWithSubscriptionProvider?: string;
}
export const Instance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AmiId: S.optional(S.String),
    InstanceID: S.optional(S.String),
    InstanceType: S.optional(S.String),
    AccountID: S.optional(S.String),
    Status: S.optional(S.String),
    Region: S.optional(S.String),
    UsageOperation: S.optional(S.String),
    ProductCode: S.optional(ProductCodeList),
    LastUpdatedTime: S.optional(S.String),
    SubscriptionName: S.optional(S.String),
    OsVersion: S.optional(S.String),
    SubscriptionProviderCreateTime: S.optional(S.String),
    SubscriptionProviderUpdateTime: S.optional(S.String),
    DualSubscription: S.optional(S.String),
    RegisteredWithSubscriptionProvider: S.optional(S.String),
  }),
).annotate({ identifier: "Instance" }) as any as S.Schema<Instance>;
export type InstanceList = Instance[];
export const InstanceList = /*@__PURE__*/ S.Array(Instance);
export interface ListLinuxSubscriptionInstancesResponse {
  Instances?: Instance[];
  NextToken?: string;
}
export const ListLinuxSubscriptionInstancesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Instances: S.optional(InstanceList),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListLinuxSubscriptionInstancesResponse",
}) as any as S.Schema<ListLinuxSubscriptionInstancesResponse>;
export interface ListLinuxSubscriptionsRequest {
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export const ListLinuxSubscriptionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(FilterList),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/subscription/ListLinuxSubscriptions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLinuxSubscriptionsRequest",
}) as any as S.Schema<ListLinuxSubscriptionsRequest>;
export type BoxLong = number;
export interface Subscription {
  Name?: string;
  Type?: string;
  InstanceCount?: number;
}
export const Subscription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Type: S.optional(S.String),
    InstanceCount: S.optional(S.Number),
  }),
).annotate({ identifier: "Subscription" }) as any as S.Schema<Subscription>;
export type SubscriptionList = Subscription[];
export const SubscriptionList = /*@__PURE__*/ S.Array(Subscription);
export interface ListLinuxSubscriptionsResponse {
  Subscriptions?: Subscription[];
  NextToken?: string;
}
export const ListLinuxSubscriptionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Subscriptions: S.optional(SubscriptionList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLinuxSubscriptionsResponse",
}) as any as S.Schema<ListLinuxSubscriptionsResponse>;
export type SubscriptionProviderSourceList = string[];
export const SubscriptionProviderSourceList = /*@__PURE__*/ S.Array(S.String);
export interface ListRegisteredSubscriptionProvidersRequest {
  SubscriptionProviderSources?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export const ListRegisteredSubscriptionProvidersRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      SubscriptionProviderSources: S.optional(SubscriptionProviderSourceList),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/subscription/ListRegisteredSubscriptionProviders",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListRegisteredSubscriptionProvidersRequest",
  }) as any as S.Schema<ListRegisteredSubscriptionProvidersRequest>;
export interface RegisteredSubscriptionProvider {
  SubscriptionProviderArn?: string;
  SubscriptionProviderSource?: string;
  SecretArn?: string;
  SubscriptionProviderStatus?: string;
  SubscriptionProviderStatusMessage?: string;
  LastSuccessfulDataRetrievalTime?: string;
}
export const RegisteredSubscriptionProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubscriptionProviderArn: S.optional(S.String),
    SubscriptionProviderSource: S.optional(S.String),
    SecretArn: S.optional(S.String),
    SubscriptionProviderStatus: S.optional(S.String),
    SubscriptionProviderStatusMessage: S.optional(S.String),
    LastSuccessfulDataRetrievalTime: S.optional(S.String),
  }),
).annotate({
  identifier: "RegisteredSubscriptionProvider",
}) as any as S.Schema<RegisteredSubscriptionProvider>;
export type RegisteredSubscriptionProviderList =
  RegisteredSubscriptionProvider[];
export const RegisteredSubscriptionProviderList = /*@__PURE__*/ S.Array(
  RegisteredSubscriptionProvider,
);
export interface ListRegisteredSubscriptionProvidersResponse {
  RegisteredSubscriptionProviders?: RegisteredSubscriptionProvider[];
  NextToken?: string;
}
export const ListRegisteredSubscriptionProvidersResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      RegisteredSubscriptionProviders: S.optional(
        RegisteredSubscriptionProviderList,
      ),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListRegisteredSubscriptionProvidersResponse",
  }) as any as S.Schema<ListRegisteredSubscriptionProvidersResponse>;
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
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface RegisterSubscriptionProviderRequest {
  SubscriptionProviderSource: string;
  SecretArn: string;
  Tags?: { [key: string]: string | undefined };
}
export const RegisterSubscriptionProviderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubscriptionProviderSource: S.String,
    SecretArn: S.String,
    Tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/subscription/RegisterSubscriptionProvider",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterSubscriptionProviderRequest",
}) as any as S.Schema<RegisterSubscriptionProviderRequest>;
export interface RegisterSubscriptionProviderResponse {
  SubscriptionProviderSource?: string;
  SubscriptionProviderArn?: string;
  SubscriptionProviderStatus?: string;
}
export const RegisterSubscriptionProviderResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SubscriptionProviderSource: S.optional(S.String),
      SubscriptionProviderArn: S.optional(S.String),
      SubscriptionProviderStatus: S.optional(S.String),
    }),
).annotate({
  identifier: "RegisterSubscriptionProviderResponse",
}) as any as S.Schema<RegisterSubscriptionProviderResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: Tags,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/tags/{resourceArn}" }),
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
export interface UpdateServiceSettingsRequest {
  LinuxSubscriptionsDiscovery: string;
  LinuxSubscriptionsDiscoverySettings: LinuxSubscriptionsDiscoverySettings;
  AllowUpdate?: boolean;
}
export const UpdateServiceSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LinuxSubscriptionsDiscovery: S.String,
    LinuxSubscriptionsDiscoverySettings: LinuxSubscriptionsDiscoverySettings,
    AllowUpdate: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/subscription/UpdateServiceSettings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateServiceSettingsRequest",
}) as any as S.Schema<UpdateServiceSettingsRequest>;
export interface UpdateServiceSettingsResponse {
  LinuxSubscriptionsDiscovery?: string;
  LinuxSubscriptionsDiscoverySettings?: LinuxSubscriptionsDiscoverySettings;
  Status?: string;
  StatusMessage?: { [key: string]: string | undefined };
  HomeRegions?: string[];
}
export const UpdateServiceSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LinuxSubscriptionsDiscovery: S.optional(S.String),
    LinuxSubscriptionsDiscoverySettings: S.optional(
      LinuxSubscriptionsDiscoverySettings,
    ),
    Status: S.optional(S.String),
    StatusMessage: S.optional(StringMap),
    HomeRegions: S.optional(StringList),
  }),
).annotate({
  identifier: "UpdateServiceSettingsResponse",
}) as any as S.Schema<UpdateServiceSettingsResponse>;
export type DeregisterSubscriptionProviderError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Remove a third-party subscription provider from the Bring Your Own License (BYOL) subscriptions
 * registered to your account.
 */
export const deregisterSubscriptionProvider: API.OperationMethod<
  DeregisterSubscriptionProviderRequest,
  DeregisterSubscriptionProviderResponse,
  DeregisterSubscriptionProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterSubscriptionProviderRequest,
  output: DeregisterSubscriptionProviderResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterSubscriptionProvider",
}));

export type GetRegisteredSubscriptionProviderError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get details for a Bring Your Own License (BYOL) subscription that's registered to your account.
 */
export const getRegisteredSubscriptionProvider: API.OperationMethod<
  GetRegisteredSubscriptionProviderRequest,
  GetRegisteredSubscriptionProviderResponse,
  GetRegisteredSubscriptionProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRegisteredSubscriptionProviderRequest,
  output: GetRegisteredSubscriptionProviderResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegisteredSubscriptionProvider",
}));

export type GetServiceSettingsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Linux subscriptions service settings for your account.
 */
export const getServiceSettings: API.OperationMethod<
  GetServiceSettingsRequest,
  GetServiceSettingsResponse,
  GetServiceSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetServiceSettingsRequest,
  output: GetServiceSettingsResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceSettings",
}));

export type ListLinuxSubscriptionInstancesError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the running Amazon EC2 instances that were discovered with commercial Linux
 * subscriptions.
 */
export const listLinuxSubscriptionInstances: API.PaginatedOperationMethod<
  ListLinuxSubscriptionInstancesRequest,
  ListLinuxSubscriptionInstancesResponse,
  ListLinuxSubscriptionInstancesError,
  Credentials | HttpClient.HttpClient,
  Instance
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLinuxSubscriptionInstancesRequest,
  output: ListLinuxSubscriptionInstancesResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLinuxSubscriptionInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Instances",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLinuxSubscriptionsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Linux subscriptions that have been discovered. If you have linked your
 * organization, the returned results will include data aggregated across your accounts in
 * Organizations.
 */
export const listLinuxSubscriptions: API.PaginatedOperationMethod<
  ListLinuxSubscriptionsRequest,
  ListLinuxSubscriptionsResponse,
  ListLinuxSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  Subscription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLinuxSubscriptionsRequest,
  output: ListLinuxSubscriptionsResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLinuxSubscriptions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Subscriptions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRegisteredSubscriptionProvidersError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List Bring Your Own License (BYOL) subscription registration resources for your account.
 */
export const listRegisteredSubscriptionProviders: API.PaginatedOperationMethod<
  ListRegisteredSubscriptionProvidersRequest,
  ListRegisteredSubscriptionProvidersResponse,
  ListRegisteredSubscriptionProvidersError,
  Credentials | HttpClient.HttpClient,
  RegisteredSubscriptionProvider
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRegisteredSubscriptionProvidersRequest,
  output: ListRegisteredSubscriptionProvidersResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRegisteredSubscriptionProviders",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RegisteredSubscriptionProviders",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * List the metadata tags that are assigned to the
 * specified Amazon Web Services resource.
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

export type RegisterSubscriptionProviderError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Register the supported third-party subscription provider for your Bring Your Own License (BYOL) subscription.
 */
export const registerSubscriptionProvider: API.OperationMethod<
  RegisterSubscriptionProviderRequest,
  RegisterSubscriptionProviderResponse,
  RegisterSubscriptionProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterSubscriptionProviderRequest,
  output: RegisterSubscriptionProviderResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterSubscriptionProvider",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Add metadata tags to the specified Amazon Web Services resource.
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
 * Remove one or more metadata tag from the specified Amazon Web Services resource.
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

export type UpdateServiceSettingsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the service settings for Linux subscriptions.
 */
export const updateServiceSettings: API.OperationMethod<
  UpdateServiceSettingsRequest,
  UpdateServiceSettingsResponse,
  UpdateServiceSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateServiceSettingsRequest,
  output: UpdateServiceSettingsResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceSettings",
}));
