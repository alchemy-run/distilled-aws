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
  sdkId: "grafana",
  serviceShapeName: "AWSGrafanaControlPlane",
});
const auth = T.AwsAuthSigv4({ name: "grafana" });
const ver = T.ServiceVersion("2020-08-18");
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
              `https://grafana-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://grafana-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://grafana.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://grafana.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
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
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
      serviceCode: S.String,
      quotaCode: S.String,
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      serviceCode: S.optional(S.String),
      quotaCode: S.optional(S.String),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.all(T.HttpError(429), T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.String,
      fieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type WorkspaceId = string;
export type LicenseType = string;
export type GrafanaToken = string;
export interface AssociateLicenseRequest {
  workspaceId: string;
  licenseType: string;
  grafanaToken?: string;
}
export const AssociateLicenseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    licenseType: S.String.pipe(T.HttpLabel("licenseType")),
    grafanaToken: S.optional(S.String).pipe(T.HttpHeader("Grafana-Token")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workspaces/{workspaceId}/licenses/{licenseType}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateLicenseRequest",
}) as any as S.Schema<AssociateLicenseRequest>;
export type AccountAccessType = string;
export type DataSourceType = string;
export type DataSourceTypesList = string[];
export const DataSourceTypesList = /*@__PURE__*/ S.Array(S.String);
export type Description = string | redacted.Redacted<string>;
export type Endpoint = string;
export type GrafanaVersion = string;
export type WorkspaceName = string | redacted.Redacted<string>;
export type OrganizationRoleName = string | redacted.Redacted<string>;
export type NotificationDestinationType = string;
export type NotificationDestinationsList = string[];
export const NotificationDestinationsList = /*@__PURE__*/ S.Array(S.String);
export type OrganizationalUnit = string;
export type OrganizationalUnitList = string[];
export const OrganizationalUnitList = /*@__PURE__*/ S.Array(S.String);
export type PermissionType = string;
export type StackSetName = string;
export type WorkspaceStatus = string;
export type IamRoleArn = string | redacted.Redacted<string>;
export type AuthenticationProviderTypes = string;
export type AuthenticationProviders = string[];
export const AuthenticationProviders = /*@__PURE__*/ S.Array(S.String);
export type SamlConfigurationStatus = string;
export interface AuthenticationSummary {
  providers: string[];
  samlConfigurationStatus?: string;
}
export const AuthenticationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    providers: AuthenticationProviders,
    samlConfigurationStatus: S.optional(S.String),
  }),
).annotate({
  identifier: "AuthenticationSummary",
}) as any as S.Schema<AuthenticationSummary>;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export const SecurityGroupIds = /*@__PURE__*/ S.Array(S.String);
export type SubnetId = string;
export type SubnetIds = string[];
export const SubnetIds = /*@__PURE__*/ S.Array(S.String);
export interface VpcConfiguration {
  securityGroupIds: string[];
  subnetIds: string[];
}
export const VpcConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ securityGroupIds: SecurityGroupIds, subnetIds: SubnetIds }),
).annotate({
  identifier: "VpcConfiguration",
}) as any as S.Schema<VpcConfiguration>;
export type PrefixListId = string;
export type PrefixListIds = string[];
export const PrefixListIds = /*@__PURE__*/ S.Array(S.String);
export type VpceId = string;
export type VpceIds = string[];
export const VpceIds = /*@__PURE__*/ S.Array(S.String);
export interface NetworkAccessConfiguration {
  prefixListIds: string[];
  vpceIds: string[];
}
export const NetworkAccessConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ prefixListIds: PrefixListIds, vpceIds: VpceIds }),
).annotate({
  identifier: "NetworkAccessConfiguration",
}) as any as S.Schema<NetworkAccessConfiguration>;
export type IPAddressType = string;
export type KmsKeyId = string;
export type DegradedWorkspaceReason = string;
export interface WorkspaceDescription {
  accountAccessType?: string;
  created: Date;
  dataSources: string[];
  description?: string | redacted.Redacted<string>;
  endpoint: string;
  grafanaVersion: string;
  id: string;
  modified: Date;
  name?: string | redacted.Redacted<string>;
  organizationRoleName?: string | redacted.Redacted<string>;
  notificationDestinations?: string[];
  organizationalUnits?: string[];
  permissionType?: string;
  stackSetName?: string;
  status: string;
  workspaceRoleArn?: string | redacted.Redacted<string>;
  licenseType?: string;
  freeTrialConsumed?: boolean;
  licenseExpiration?: Date;
  freeTrialExpiration?: Date;
  authentication: AuthenticationSummary;
  tags?: { [key: string]: string | undefined };
  vpcConfiguration?: VpcConfiguration;
  networkAccessControl?: NetworkAccessConfiguration;
  grafanaToken?: string;
  ipAddressType?: string;
  kmsKeyId?: string;
  degradedWorkspaceReason?: string;
}
export const WorkspaceDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountAccessType: S.optional(S.String),
    created: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    dataSources: DataSourceTypesList,
    description: S.optional(SensitiveString),
    endpoint: S.String,
    grafanaVersion: S.String,
    id: S.String,
    modified: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    name: S.optional(SensitiveString),
    organizationRoleName: S.optional(SensitiveString),
    notificationDestinations: S.optional(NotificationDestinationsList),
    organizationalUnits: S.optional(OrganizationalUnitList),
    permissionType: S.optional(S.String),
    stackSetName: S.optional(S.String),
    status: S.String,
    workspaceRoleArn: S.optional(SensitiveString),
    licenseType: S.optional(S.String),
    freeTrialConsumed: S.optional(S.Boolean),
    licenseExpiration: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    freeTrialExpiration: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    authentication: AuthenticationSummary,
    tags: S.optional(TagMap),
    vpcConfiguration: S.optional(VpcConfiguration),
    networkAccessControl: S.optional(NetworkAccessConfiguration),
    grafanaToken: S.optional(S.String),
    ipAddressType: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
    degradedWorkspaceReason: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkspaceDescription",
}) as any as S.Schema<WorkspaceDescription>;
export interface AssociateLicenseResponse {
  workspace: WorkspaceDescription;
}
export const AssociateLicenseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workspace: WorkspaceDescription }),
).annotate({
  identifier: "AssociateLicenseResponse",
}) as any as S.Schema<AssociateLicenseResponse>;
export type ClientToken = string;
export type OverridableConfigurationJson = string;
export interface CreateWorkspaceRequest {
  accountAccessType: string;
  clientToken?: string;
  organizationRoleName?: string | redacted.Redacted<string>;
  permissionType: string;
  stackSetName?: string;
  workspaceDataSources?: string[];
  workspaceDescription?: string | redacted.Redacted<string>;
  workspaceName?: string | redacted.Redacted<string>;
  workspaceNotificationDestinations?: string[];
  workspaceOrganizationalUnits?: string[];
  workspaceRoleArn?: string | redacted.Redacted<string>;
  authenticationProviders: string[];
  tags?: { [key: string]: string | undefined };
  vpcConfiguration?: VpcConfiguration;
  configuration?: string;
  networkAccessControl?: NetworkAccessConfiguration;
  grafanaVersion?: string;
  ipAddressType?: string;
  kmsKeyId?: string;
}
export const CreateWorkspaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountAccessType: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    organizationRoleName: S.optional(SensitiveString),
    permissionType: S.String,
    stackSetName: S.optional(S.String),
    workspaceDataSources: S.optional(DataSourceTypesList),
    workspaceDescription: S.optional(SensitiveString),
    workspaceName: S.optional(SensitiveString),
    workspaceNotificationDestinations: S.optional(NotificationDestinationsList),
    workspaceOrganizationalUnits: S.optional(OrganizationalUnitList),
    workspaceRoleArn: S.optional(SensitiveString),
    authenticationProviders: AuthenticationProviders,
    tags: S.optional(TagMap),
    vpcConfiguration: S.optional(VpcConfiguration),
    configuration: S.optional(S.String),
    networkAccessControl: S.optional(NetworkAccessConfiguration),
    grafanaVersion: S.optional(S.String),
    ipAddressType: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/workspaces" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateWorkspaceRequest",
}) as any as S.Schema<CreateWorkspaceRequest>;
export interface CreateWorkspaceResponse {
  workspace: WorkspaceDescription;
}
export const CreateWorkspaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workspace: WorkspaceDescription }),
).annotate({
  identifier: "CreateWorkspaceResponse",
}) as any as S.Schema<CreateWorkspaceResponse>;
export type ApiKeyName = string;
export interface CreateWorkspaceApiKeyRequest {
  keyName: string;
  keyRole: string;
  secondsToLive: number;
  workspaceId: string;
}
export const CreateWorkspaceApiKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    keyName: S.String,
    keyRole: S.String,
    secondsToLive: S.Number,
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/apikeys" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateWorkspaceApiKeyRequest",
}) as any as S.Schema<CreateWorkspaceApiKeyRequest>;
export type ApiKeyToken = string | redacted.Redacted<string>;
export interface CreateWorkspaceApiKeyResponse {
  keyName: string;
  key: string | redacted.Redacted<string>;
  workspaceId: string;
}
export const CreateWorkspaceApiKeyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ keyName: S.String, key: SensitiveString, workspaceId: S.String }),
).annotate({
  identifier: "CreateWorkspaceApiKeyResponse",
}) as any as S.Schema<CreateWorkspaceApiKeyResponse>;
export type ServiceAccountName = string;
export type Role = string;
export interface CreateWorkspaceServiceAccountRequest {
  name: string;
  grafanaRole: string;
  workspaceId: string;
}
export const CreateWorkspaceServiceAccountRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      name: S.String,
      grafanaRole: S.String,
      workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/workspaces/{workspaceId}/serviceaccounts",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateWorkspaceServiceAccountRequest",
}) as any as S.Schema<CreateWorkspaceServiceAccountRequest>;
export interface CreateWorkspaceServiceAccountResponse {
  id: string;
  name: string;
  grafanaRole: string;
  workspaceId: string;
}
export const CreateWorkspaceServiceAccountResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      id: S.String,
      name: S.String,
      grafanaRole: S.String,
      workspaceId: S.String,
    }),
).annotate({
  identifier: "CreateWorkspaceServiceAccountResponse",
}) as any as S.Schema<CreateWorkspaceServiceAccountResponse>;
export type ServiceAccountTokenName = string;
export interface CreateWorkspaceServiceAccountTokenRequest {
  name: string;
  secondsToLive: number;
  serviceAccountId: string;
  workspaceId: string;
}
export const CreateWorkspaceServiceAccountTokenRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      name: S.String,
      secondsToLive: S.Number,
      serviceAccountId: S.String.pipe(T.HttpLabel("serviceAccountId")),
      workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/workspaces/{workspaceId}/serviceaccounts/{serviceAccountId}/tokens",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateWorkspaceServiceAccountTokenRequest",
  }) as any as S.Schema<CreateWorkspaceServiceAccountTokenRequest>;
export type ServiceAccountTokenKey = string | redacted.Redacted<string>;
export interface ServiceAccountTokenSummaryWithKey {
  id: string;
  name: string;
  key: string | redacted.Redacted<string>;
}
export const ServiceAccountTokenSummaryWithKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String, name: S.String, key: SensitiveString }),
).annotate({
  identifier: "ServiceAccountTokenSummaryWithKey",
}) as any as S.Schema<ServiceAccountTokenSummaryWithKey>;
export interface CreateWorkspaceServiceAccountTokenResponse {
  serviceAccountToken: ServiceAccountTokenSummaryWithKey;
  serviceAccountId: string;
  workspaceId: string;
}
export const CreateWorkspaceServiceAccountTokenResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      serviceAccountToken: ServiceAccountTokenSummaryWithKey,
      serviceAccountId: S.String,
      workspaceId: S.String,
    }),
  ).annotate({
    identifier: "CreateWorkspaceServiceAccountTokenResponse",
  }) as any as S.Schema<CreateWorkspaceServiceAccountTokenResponse>;
export interface DeleteWorkspaceRequest {
  workspaceId: string;
}
export const DeleteWorkspaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workspaceId: S.String.pipe(T.HttpLabel("workspaceId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/workspaces/{workspaceId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteWorkspaceRequest",
}) as any as S.Schema<DeleteWorkspaceRequest>;
export interface DeleteWorkspaceResponse {
  workspace: WorkspaceDescription;
}
export const DeleteWorkspaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workspace: WorkspaceDescription }),
).annotate({
  identifier: "DeleteWorkspaceResponse",
}) as any as S.Schema<DeleteWorkspaceResponse>;
export interface DeleteWorkspaceApiKeyRequest {
  keyName: string;
  workspaceId: string;
}
export const DeleteWorkspaceApiKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    keyName: S.String.pipe(T.HttpLabel("keyName")),
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/workspaces/{workspaceId}/apikeys/{keyName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteWorkspaceApiKeyRequest",
}) as any as S.Schema<DeleteWorkspaceApiKeyRequest>;
export interface DeleteWorkspaceApiKeyResponse {
  keyName: string;
  workspaceId: string;
}
export const DeleteWorkspaceApiKeyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ keyName: S.String, workspaceId: S.String }),
).annotate({
  identifier: "DeleteWorkspaceApiKeyResponse",
}) as any as S.Schema<DeleteWorkspaceApiKeyResponse>;
export interface DeleteWorkspaceServiceAccountRequest {
  serviceAccountId: string;
  workspaceId: string;
}
export const DeleteWorkspaceServiceAccountRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      serviceAccountId: S.String.pipe(T.HttpLabel("serviceAccountId")),
      workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/workspaces/{workspaceId}/serviceaccounts/{serviceAccountId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteWorkspaceServiceAccountRequest",
}) as any as S.Schema<DeleteWorkspaceServiceAccountRequest>;
export interface DeleteWorkspaceServiceAccountResponse {
  serviceAccountId: string;
  workspaceId: string;
}
export const DeleteWorkspaceServiceAccountResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ serviceAccountId: S.String, workspaceId: S.String }),
).annotate({
  identifier: "DeleteWorkspaceServiceAccountResponse",
}) as any as S.Schema<DeleteWorkspaceServiceAccountResponse>;
export interface DeleteWorkspaceServiceAccountTokenRequest {
  tokenId: string;
  serviceAccountId: string;
  workspaceId: string;
}
export const DeleteWorkspaceServiceAccountTokenRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      tokenId: S.String.pipe(T.HttpLabel("tokenId")),
      serviceAccountId: S.String.pipe(T.HttpLabel("serviceAccountId")),
      workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/workspaces/{workspaceId}/serviceaccounts/{serviceAccountId}/tokens/{tokenId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteWorkspaceServiceAccountTokenRequest",
  }) as any as S.Schema<DeleteWorkspaceServiceAccountTokenRequest>;
export interface DeleteWorkspaceServiceAccountTokenResponse {
  tokenId: string;
  serviceAccountId: string;
  workspaceId: string;
}
export const DeleteWorkspaceServiceAccountTokenResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      tokenId: S.String,
      serviceAccountId: S.String,
      workspaceId: S.String,
    }),
  ).annotate({
    identifier: "DeleteWorkspaceServiceAccountTokenResponse",
  }) as any as S.Schema<DeleteWorkspaceServiceAccountTokenResponse>;
export interface DescribeWorkspaceRequest {
  workspaceId: string;
}
export const DescribeWorkspaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workspaceId: S.String.pipe(T.HttpLabel("workspaceId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/workspaces/{workspaceId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeWorkspaceRequest",
}) as any as S.Schema<DescribeWorkspaceRequest>;
export interface DescribeWorkspaceResponse {
  workspace: WorkspaceDescription;
}
export const DescribeWorkspaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workspace: WorkspaceDescription }),
).annotate({
  identifier: "DescribeWorkspaceResponse",
}) as any as S.Schema<DescribeWorkspaceResponse>;
export interface DescribeWorkspaceAuthenticationRequest {
  workspaceId: string;
}
export const DescribeWorkspaceAuthenticationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ workspaceId: S.String.pipe(T.HttpLabel("workspaceId")) }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/workspaces/{workspaceId}/authentication",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeWorkspaceAuthenticationRequest",
}) as any as S.Schema<DescribeWorkspaceAuthenticationRequest>;
export type IdpMetadataUrl = string;
export type IdpMetadata =
  | { url: string; xml?: never }
  | { url?: never; xml: string };
export const IdpMetadata = /*@__PURE__*/ S.Union([
  S.Struct({ url: S.String }),
  S.Struct({ xml: S.String }),
]);
export type AssertionAttribute = string;
export interface AssertionAttributes {
  name?: string;
  login?: string;
  email?: string;
  groups?: string;
  role?: string;
  org?: string;
}
export const AssertionAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    login: S.optional(S.String),
    email: S.optional(S.String),
    groups: S.optional(S.String),
    role: S.optional(S.String),
    org: S.optional(S.String),
  }),
).annotate({
  identifier: "AssertionAttributes",
}) as any as S.Schema<AssertionAttributes>;
export type RoleValue = string;
export type RoleValueList = string[];
export const RoleValueList = /*@__PURE__*/ S.Array(S.String);
export interface RoleValues {
  editor?: string[];
  admin?: string[];
}
export const RoleValues = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    editor: S.optional(RoleValueList),
    admin: S.optional(RoleValueList),
  }),
).annotate({ identifier: "RoleValues" }) as any as S.Schema<RoleValues>;
export type AllowedOrganization = string;
export type AllowedOrganizations = string[];
export const AllowedOrganizations = /*@__PURE__*/ S.Array(S.String);
export type LoginValidityDuration = number;
export interface SamlConfiguration {
  idpMetadata: IdpMetadata;
  assertionAttributes?: AssertionAttributes;
  roleValues?: RoleValues;
  allowedOrganizations?: string[];
  loginValidityDuration?: number;
}
export const SamlConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    idpMetadata: IdpMetadata,
    assertionAttributes: S.optional(AssertionAttributes),
    roleValues: S.optional(RoleValues),
    allowedOrganizations: S.optional(AllowedOrganizations),
    loginValidityDuration: S.optional(S.Number),
  }),
).annotate({
  identifier: "SamlConfiguration",
}) as any as S.Schema<SamlConfiguration>;
export interface SamlAuthentication {
  status: string;
  configuration?: SamlConfiguration;
}
export const SamlAuthentication = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.String, configuration: S.optional(SamlConfiguration) }),
).annotate({
  identifier: "SamlAuthentication",
}) as any as S.Schema<SamlAuthentication>;
export type SSOClientId = string;
export interface AwsSsoAuthentication {
  ssoClientId?: string;
}
export const AwsSsoAuthentication = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ssoClientId: S.optional(S.String) }),
).annotate({
  identifier: "AwsSsoAuthentication",
}) as any as S.Schema<AwsSsoAuthentication>;
export interface AuthenticationDescription {
  providers: string[];
  saml?: SamlAuthentication;
  awsSso?: AwsSsoAuthentication;
}
export const AuthenticationDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    providers: AuthenticationProviders,
    saml: S.optional(SamlAuthentication),
    awsSso: S.optional(AwsSsoAuthentication),
  }),
).annotate({
  identifier: "AuthenticationDescription",
}) as any as S.Schema<AuthenticationDescription>;
export interface DescribeWorkspaceAuthenticationResponse {
  authentication: AuthenticationDescription;
}
export const DescribeWorkspaceAuthenticationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ authentication: AuthenticationDescription }),
).annotate({
  identifier: "DescribeWorkspaceAuthenticationResponse",
}) as any as S.Schema<DescribeWorkspaceAuthenticationResponse>;
export interface DescribeWorkspaceConfigurationRequest {
  workspaceId: string;
}
export const DescribeWorkspaceConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ workspaceId: S.String.pipe(T.HttpLabel("workspaceId")) }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/workspaces/{workspaceId}/configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeWorkspaceConfigurationRequest",
}) as any as S.Schema<DescribeWorkspaceConfigurationRequest>;
export interface DescribeWorkspaceConfigurationResponse {
  configuration: string;
  grafanaVersion?: string;
}
export const DescribeWorkspaceConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ configuration: S.String, grafanaVersion: S.optional(S.String) }),
).annotate({
  identifier: "DescribeWorkspaceConfigurationResponse",
}) as any as S.Schema<DescribeWorkspaceConfigurationResponse>;
export interface DisassociateLicenseRequest {
  workspaceId: string;
  licenseType: string;
}
export const DisassociateLicenseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    licenseType: S.String.pipe(T.HttpLabel("licenseType")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/workspaces/{workspaceId}/licenses/{licenseType}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateLicenseRequest",
}) as any as S.Schema<DisassociateLicenseRequest>;
export interface DisassociateLicenseResponse {
  workspace: WorkspaceDescription;
}
export const DisassociateLicenseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workspace: WorkspaceDescription }),
).annotate({
  identifier: "DisassociateLicenseResponse",
}) as any as S.Schema<DisassociateLicenseResponse>;
export type PaginationToken = string;
export type UserType = string;
export type SsoId = string;
export interface ListPermissionsRequest {
  maxResults?: number;
  nextToken?: string;
  userType?: string;
  userId?: string;
  groupId?: string;
  workspaceId: string;
}
export const ListPermissionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    userType: S.optional(S.String).pipe(T.HttpQuery("userType")),
    userId: S.optional(S.String).pipe(T.HttpQuery("userId")),
    groupId: S.optional(S.String).pipe(T.HttpQuery("groupId")),
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/workspaces/{workspaceId}/permissions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPermissionsRequest",
}) as any as S.Schema<ListPermissionsRequest>;
export interface User {
  id: string;
  type: string;
}
export const User = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String, type: S.String }),
).annotate({ identifier: "User" }) as any as S.Schema<User>;
export interface PermissionEntry {
  user: User;
  role: string;
}
export const PermissionEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ user: User, role: S.String }),
).annotate({
  identifier: "PermissionEntry",
}) as any as S.Schema<PermissionEntry>;
export type PermissionEntryList = PermissionEntry[];
export const PermissionEntryList = /*@__PURE__*/ S.Array(PermissionEntry);
export interface ListPermissionsResponse {
  nextToken?: string;
  permissions: PermissionEntry[];
}
export const ListPermissionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    permissions: PermissionEntryList,
  }),
).annotate({
  identifier: "ListPermissionsResponse",
}) as any as S.Schema<ListPermissionsResponse>;
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
export interface ListVersionsRequest {
  maxResults?: number;
  nextToken?: string;
  workspaceId?: string;
}
export const ListVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    workspaceId: S.optional(S.String).pipe(T.HttpQuery("workspace-id")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVersionsRequest",
}) as any as S.Schema<ListVersionsRequest>;
export type GrafanaVersionList = string[];
export const GrafanaVersionList = /*@__PURE__*/ S.Array(S.String);
export interface ListVersionsResponse {
  nextToken?: string;
  grafanaVersions?: string[];
}
export const ListVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    grafanaVersions: S.optional(GrafanaVersionList),
  }),
).annotate({
  identifier: "ListVersionsResponse",
}) as any as S.Schema<ListVersionsResponse>;
export interface ListWorkspacesRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListWorkspacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/workspaces" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWorkspacesRequest",
}) as any as S.Schema<ListWorkspacesRequest>;
export interface WorkspaceSummary {
  created: Date;
  description?: string | redacted.Redacted<string>;
  endpoint: string;
  grafanaVersion: string;
  id: string;
  modified: Date;
  name?: string | redacted.Redacted<string>;
  notificationDestinations?: string[];
  status: string;
  authentication: AuthenticationSummary;
  tags?: { [key: string]: string | undefined };
  licenseType?: string;
  grafanaToken?: string;
}
export const WorkspaceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    created: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    description: S.optional(SensitiveString),
    endpoint: S.String,
    grafanaVersion: S.String,
    id: S.String,
    modified: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    name: S.optional(SensitiveString),
    notificationDestinations: S.optional(NotificationDestinationsList),
    status: S.String,
    authentication: AuthenticationSummary,
    tags: S.optional(TagMap),
    licenseType: S.optional(S.String),
    grafanaToken: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkspaceSummary",
}) as any as S.Schema<WorkspaceSummary>;
export type WorkspaceList = WorkspaceSummary[];
export const WorkspaceList = /*@__PURE__*/ S.Array(WorkspaceSummary);
export interface ListWorkspacesResponse {
  workspaces: WorkspaceSummary[];
  nextToken?: string;
}
export const ListWorkspacesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workspaces: WorkspaceList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListWorkspacesResponse",
}) as any as S.Schema<ListWorkspacesResponse>;
export interface ListWorkspaceServiceAccountsRequest {
  maxResults?: number;
  nextToken?: string;
  workspaceId: string;
}
export const ListWorkspaceServiceAccountsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/workspaces/{workspaceId}/serviceaccounts",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWorkspaceServiceAccountsRequest",
}) as any as S.Schema<ListWorkspaceServiceAccountsRequest>;
export interface ServiceAccountSummary {
  id: string;
  name: string;
  isDisabled: string;
  grafanaRole: string;
}
export const ServiceAccountSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    isDisabled: S.String,
    grafanaRole: S.String,
  }),
).annotate({
  identifier: "ServiceAccountSummary",
}) as any as S.Schema<ServiceAccountSummary>;
export type ServiceAccountList = ServiceAccountSummary[];
export const ServiceAccountList = /*@__PURE__*/ S.Array(ServiceAccountSummary);
export interface ListWorkspaceServiceAccountsResponse {
  nextToken?: string;
  serviceAccounts: ServiceAccountSummary[];
  workspaceId: string;
}
export const ListWorkspaceServiceAccountsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      serviceAccounts: ServiceAccountList,
      workspaceId: S.String,
    }),
).annotate({
  identifier: "ListWorkspaceServiceAccountsResponse",
}) as any as S.Schema<ListWorkspaceServiceAccountsResponse>;
export interface ListWorkspaceServiceAccountTokensRequest {
  maxResults?: number;
  nextToken?: string;
  serviceAccountId: string;
  workspaceId: string;
}
export const ListWorkspaceServiceAccountTokensRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      serviceAccountId: S.String.pipe(T.HttpLabel("serviceAccountId")),
      workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/workspaces/{workspaceId}/serviceaccounts/{serviceAccountId}/tokens",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListWorkspaceServiceAccountTokensRequest",
}) as any as S.Schema<ListWorkspaceServiceAccountTokensRequest>;
export interface ServiceAccountTokenSummary {
  id: string;
  name: string;
  createdAt: Date;
  expiresAt: Date;
  lastUsedAt?: Date;
}
export const ServiceAccountTokenSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    expiresAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUsedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ServiceAccountTokenSummary",
}) as any as S.Schema<ServiceAccountTokenSummary>;
export type ServiceAccountTokenList = ServiceAccountTokenSummary[];
export const ServiceAccountTokenList = /*@__PURE__*/ S.Array(
  ServiceAccountTokenSummary,
);
export interface ListWorkspaceServiceAccountTokensResponse {
  nextToken?: string;
  serviceAccountTokens: ServiceAccountTokenSummary[];
  serviceAccountId: string;
  workspaceId: string;
}
export const ListWorkspaceServiceAccountTokensResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      nextToken: S.optional(S.String),
      serviceAccountTokens: ServiceAccountTokenList,
      serviceAccountId: S.String,
      workspaceId: S.String,
    }),
  ).annotate({
    identifier: "ListWorkspaceServiceAccountTokensResponse",
  }) as any as S.Schema<ListWorkspaceServiceAccountTokensResponse>;
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
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeys.pipe(T.HttpQuery("tagKeys")),
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
export type UpdateAction = string;
export type UserList = User[];
export const UserList = /*@__PURE__*/ S.Array(User);
export interface UpdateInstruction {
  action: string;
  role: string;
  users: User[];
}
export const UpdateInstruction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ action: S.String, role: S.String, users: UserList }),
).annotate({
  identifier: "UpdateInstruction",
}) as any as S.Schema<UpdateInstruction>;
export type UpdateInstructionBatch = UpdateInstruction[];
export const UpdateInstructionBatch = /*@__PURE__*/ S.Array(UpdateInstruction);
export interface UpdatePermissionsRequest {
  updateInstructionBatch: UpdateInstruction[];
  workspaceId: string;
}
export const UpdatePermissionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    updateInstructionBatch: UpdateInstructionBatch,
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/workspaces/{workspaceId}/permissions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePermissionsRequest",
}) as any as S.Schema<UpdatePermissionsRequest>;
export interface UpdateError {
  code: number;
  message: string;
  causedBy: UpdateInstruction;
}
export const UpdateError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ code: S.Number, message: S.String, causedBy: UpdateInstruction }),
).annotate({ identifier: "UpdateError" }) as any as S.Schema<UpdateError>;
export type UpdateErrorList = UpdateError[];
export const UpdateErrorList = /*@__PURE__*/ S.Array(UpdateError);
export interface UpdatePermissionsResponse {
  errors: UpdateError[];
}
export const UpdatePermissionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ errors: UpdateErrorList }),
).annotate({
  identifier: "UpdatePermissionsResponse",
}) as any as S.Schema<UpdatePermissionsResponse>;
export interface UpdateWorkspaceRequest {
  accountAccessType?: string;
  organizationRoleName?: string | redacted.Redacted<string>;
  permissionType?: string;
  stackSetName?: string;
  workspaceDataSources?: string[];
  workspaceDescription?: string | redacted.Redacted<string>;
  workspaceId: string;
  workspaceName?: string | redacted.Redacted<string>;
  workspaceNotificationDestinations?: string[];
  workspaceOrganizationalUnits?: string[];
  workspaceRoleArn?: string | redacted.Redacted<string>;
  vpcConfiguration?: VpcConfiguration;
  removeVpcConfiguration?: boolean;
  networkAccessControl?: NetworkAccessConfiguration;
  removeNetworkAccessConfiguration?: boolean;
  ipAddressType?: string;
}
export const UpdateWorkspaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountAccessType: S.optional(S.String),
    organizationRoleName: S.optional(SensitiveString),
    permissionType: S.optional(S.String),
    stackSetName: S.optional(S.String),
    workspaceDataSources: S.optional(DataSourceTypesList),
    workspaceDescription: S.optional(SensitiveString),
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    workspaceName: S.optional(SensitiveString),
    workspaceNotificationDestinations: S.optional(NotificationDestinationsList),
    workspaceOrganizationalUnits: S.optional(OrganizationalUnitList),
    workspaceRoleArn: S.optional(SensitiveString),
    vpcConfiguration: S.optional(VpcConfiguration),
    removeVpcConfiguration: S.optional(S.Boolean),
    networkAccessControl: S.optional(NetworkAccessConfiguration),
    removeNetworkAccessConfiguration: S.optional(S.Boolean),
    ipAddressType: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/workspaces/{workspaceId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateWorkspaceRequest",
}) as any as S.Schema<UpdateWorkspaceRequest>;
export interface UpdateWorkspaceResponse {
  workspace: WorkspaceDescription;
}
export const UpdateWorkspaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workspace: WorkspaceDescription }),
).annotate({
  identifier: "UpdateWorkspaceResponse",
}) as any as S.Schema<UpdateWorkspaceResponse>;
export interface UpdateWorkspaceAuthenticationRequest {
  workspaceId: string;
  authenticationProviders: string[];
  samlConfiguration?: SamlConfiguration;
}
export const UpdateWorkspaceAuthenticationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
      authenticationProviders: AuthenticationProviders,
      samlConfiguration: S.optional(SamlConfiguration),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/workspaces/{workspaceId}/authentication",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateWorkspaceAuthenticationRequest",
}) as any as S.Schema<UpdateWorkspaceAuthenticationRequest>;
export interface UpdateWorkspaceAuthenticationResponse {
  authentication: AuthenticationDescription;
}
export const UpdateWorkspaceAuthenticationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ authentication: AuthenticationDescription }),
).annotate({
  identifier: "UpdateWorkspaceAuthenticationResponse",
}) as any as S.Schema<UpdateWorkspaceAuthenticationResponse>;
export interface UpdateWorkspaceConfigurationRequest {
  configuration: string;
  workspaceId: string;
  grafanaVersion?: string;
}
export const UpdateWorkspaceConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuration: S.String,
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    grafanaVersion: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/workspaces/{workspaceId}/configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateWorkspaceConfigurationRequest",
}) as any as S.Schema<UpdateWorkspaceConfigurationRequest>;
export interface UpdateWorkspaceConfigurationResponse {}
export const UpdateWorkspaceConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateWorkspaceConfigurationResponse",
}) as any as S.Schema<UpdateWorkspaceConfigurationResponse>;
export type ValidationExceptionReason = string;
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
export type AssociateLicenseError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns a Grafana Enterprise license to a workspace. To upgrade, you must use `ENTERPRISE` for the `licenseType`, and pass in a valid Grafana Labs token for the `grafanaToken`. Upgrading to Grafana Enterprise incurs additional fees. For more information, see Upgrade a workspace to Grafana Enterprise.
 */
export const associateLicense: API.OperationMethod<
  AssociateLicenseRequest,
  AssociateLicenseResponse,
  AssociateLicenseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateLicenseRequest,
  output: AssociateLicenseResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateLicense",
}));

export type CreateWorkspaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a *workspace*. In a workspace, you can create Grafana dashboards and visualizations to analyze your metrics, logs, and traces. You don't have to build, package, or deploy any hardware to run the Grafana server.
 *
 * Don't use `CreateWorkspace` to modify an existing workspace. Instead, use UpdateWorkspace.
 */
export const createWorkspace: API.OperationMethod<
  CreateWorkspaceRequest,
  CreateWorkspaceResponse,
  CreateWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWorkspaceRequest,
  output: CreateWorkspaceResponse,
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
  operationName: "CreateWorkspace",
}));

export type CreateWorkspaceApiKeyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Grafana API key for the workspace. This key can be used to authenticate requests sent to the workspace's HTTP API. See https://docs.aws.amazon.com/grafana/latest/userguide/Using-Grafana-APIs.html for available APIs and example requests.
 *
 * In workspaces compatible with Grafana version 9 or above, use workspace service accounts instead of API keys. API keys will be removed in a future release.
 */
export const createWorkspaceApiKey: API.OperationMethod<
  CreateWorkspaceApiKeyRequest,
  CreateWorkspaceApiKeyResponse,
  CreateWorkspaceApiKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWorkspaceApiKeyRequest,
  output: CreateWorkspaceApiKeyResponse,
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
  operationName: "CreateWorkspaceApiKey",
}));

export type CreateWorkspaceServiceAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a service account for the workspace. A service account can be used to call Grafana HTTP APIs, and run automated workloads. After creating the service account with the correct `GrafanaRole` for your use case, use `CreateWorkspaceServiceAccountToken` to create a token that can be used to authenticate and authorize Grafana HTTP API calls.
 *
 * You can only create service accounts for workspaces that are compatible with Grafana version 9 and above.
 *
 * For more information about service accounts, see Service accounts in the *Amazon Managed Grafana User Guide*.
 *
 * For more information about the Grafana HTTP APIs, see Using Grafana HTTP APIs in the *Amazon Managed Grafana User Guide*.
 */
export const createWorkspaceServiceAccount: API.OperationMethod<
  CreateWorkspaceServiceAccountRequest,
  CreateWorkspaceServiceAccountResponse,
  CreateWorkspaceServiceAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWorkspaceServiceAccountRequest,
  output: CreateWorkspaceServiceAccountResponse,
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
  operationName: "CreateWorkspaceServiceAccount",
}));

export type CreateWorkspaceServiceAccountTokenError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a token that can be used to authenticate and authorize Grafana HTTP API operations for the given workspace service account. The service account acts as a user for the API operations, and defines the permissions that are used by the API.
 *
 * When you create the service account token, you will receive a key that is used when calling Grafana APIs. Do not lose this key, as it will not be retrievable again.
 *
 * If you do lose the key, you can delete the token and recreate it to receive a new key. This will disable the initial key.
 *
 * Service accounts are only available for workspaces that are compatible with Grafana version 9 and above.
 */
export const createWorkspaceServiceAccountToken: API.OperationMethod<
  CreateWorkspaceServiceAccountTokenRequest,
  CreateWorkspaceServiceAccountTokenResponse,
  CreateWorkspaceServiceAccountTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWorkspaceServiceAccountTokenRequest,
  output: CreateWorkspaceServiceAccountTokenResponse,
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
  operationName: "CreateWorkspaceServiceAccountToken",
}));

export type DeleteWorkspaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Managed Grafana workspace.
 */
export const deleteWorkspace: API.OperationMethod<
  DeleteWorkspaceRequest,
  DeleteWorkspaceResponse,
  DeleteWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWorkspaceRequest,
  output: DeleteWorkspaceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkspace",
}));

export type DeleteWorkspaceApiKeyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Grafana API key for the workspace.
 *
 * In workspaces compatible with Grafana version 9 or above, use workspace service accounts instead of API keys. API keys will be removed in a future release.
 */
export const deleteWorkspaceApiKey: API.OperationMethod<
  DeleteWorkspaceApiKeyRequest,
  DeleteWorkspaceApiKeyResponse,
  DeleteWorkspaceApiKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWorkspaceApiKeyRequest,
  output: DeleteWorkspaceApiKeyResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkspaceApiKey",
}));

export type DeleteWorkspaceServiceAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a workspace service account from the workspace.
 *
 * This will delete any tokens created for the service account, as well. If the tokens are currently in use, the will fail to authenticate / authorize after they are deleted.
 *
 * Service accounts are only available for workspaces that are compatible with Grafana version 9 and above.
 */
export const deleteWorkspaceServiceAccount: API.OperationMethod<
  DeleteWorkspaceServiceAccountRequest,
  DeleteWorkspaceServiceAccountResponse,
  DeleteWorkspaceServiceAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWorkspaceServiceAccountRequest,
  output: DeleteWorkspaceServiceAccountResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkspaceServiceAccount",
}));

export type DeleteWorkspaceServiceAccountTokenError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a token for the workspace service account.
 *
 * This will disable the key associated with the token. If any automation is currently using the key, it will no longer be authenticated or authorized to perform actions with the Grafana HTTP APIs.
 *
 * Service accounts are only available for workspaces that are compatible with Grafana version 9 and above.
 */
export const deleteWorkspaceServiceAccountToken: API.OperationMethod<
  DeleteWorkspaceServiceAccountTokenRequest,
  DeleteWorkspaceServiceAccountTokenResponse,
  DeleteWorkspaceServiceAccountTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWorkspaceServiceAccountTokenRequest,
  output: DeleteWorkspaceServiceAccountTokenResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkspaceServiceAccountToken",
}));

export type DescribeWorkspaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Displays information about one Amazon Managed Grafana workspace.
 */
export const describeWorkspace: API.OperationMethod<
  DescribeWorkspaceRequest,
  DescribeWorkspaceResponse,
  DescribeWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeWorkspaceRequest,
  output: DescribeWorkspaceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspace",
}));

export type DescribeWorkspaceAuthenticationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Displays information about the authentication methods used in one Amazon Managed Grafana workspace.
 */
export const describeWorkspaceAuthentication: API.OperationMethod<
  DescribeWorkspaceAuthenticationRequest,
  DescribeWorkspaceAuthenticationResponse,
  DescribeWorkspaceAuthenticationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeWorkspaceAuthenticationRequest,
  output: DescribeWorkspaceAuthenticationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspaceAuthentication",
}));

export type DescribeWorkspaceConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the current configuration string for the given workspace.
 */
export const describeWorkspaceConfiguration: API.OperationMethod<
  DescribeWorkspaceConfigurationRequest,
  DescribeWorkspaceConfigurationResponse,
  DescribeWorkspaceConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeWorkspaceConfigurationRequest,
  output: DescribeWorkspaceConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspaceConfiguration",
}));

export type DisassociateLicenseError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the Grafana Enterprise license from a workspace.
 */
export const disassociateLicense: API.OperationMethod<
  DisassociateLicenseRequest,
  DisassociateLicenseResponse,
  DisassociateLicenseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateLicenseRequest,
  output: DisassociateLicenseResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateLicense",
}));

export type ListPermissionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the users and groups who have the Grafana `Admin` and `Editor` roles in this workspace. If you use this operation without specifying `userId` or `groupId`, the operation returns the roles of all users and groups. If you specify a `userId` or a `groupId`, only the roles for that user or group are returned. If you do this, you can specify only one `userId` or one `groupId`.
 */
export const listPermissions: API.PaginatedOperationMethod<
  ListPermissionsRequest,
  ListPermissionsResponse,
  ListPermissionsError,
  Credentials | HttpClient.HttpClient,
  PermissionEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPermissionsRequest,
  output: ListPermissionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPermissions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "permissions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The `ListTagsForResource` operation returns the tags that are associated with the Amazon Managed Service for Grafana resource specified by the `resourceArn`. Currently, the only resource that can be tagged is a workspace.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists available versions of Grafana. These are available when calling `CreateWorkspace`. Optionally, include a workspace to list the versions to which it can be upgraded.
 */
export const listVersions: API.PaginatedOperationMethod<
  ListVersionsRequest,
  ListVersionsResponse,
  ListVersionsError,
  Credentials | HttpClient.HttpClient,
  GrafanaVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListVersionsRequest,
  output: ListVersionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "grafanaVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkspacesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of Amazon Managed Grafana workspaces in the account, with some information about each workspace. For more complete information about one workspace, use DescribeWorkspace.
 */
export const listWorkspaces: API.PaginatedOperationMethod<
  ListWorkspacesRequest,
  ListWorkspacesResponse,
  ListWorkspacesError,
  Credentials | HttpClient.HttpClient,
  WorkspaceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWorkspacesRequest,
  output: ListWorkspacesResponse,
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkspaces",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workspaces",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkspaceServiceAccountsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of service accounts for a workspace.
 *
 * Service accounts are only available for workspaces that are compatible with Grafana version 9 and above.
 */
export const listWorkspaceServiceAccounts: API.PaginatedOperationMethod<
  ListWorkspaceServiceAccountsRequest,
  ListWorkspaceServiceAccountsResponse,
  ListWorkspaceServiceAccountsError,
  Credentials | HttpClient.HttpClient,
  ServiceAccountSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWorkspaceServiceAccountsRequest,
  output: ListWorkspaceServiceAccountsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkspaceServiceAccounts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "serviceAccounts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkspaceServiceAccountTokensError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of tokens for a workspace service account.
 *
 * This does not return the key for each token. You cannot access keys after they are created. To create a new key, delete the token and recreate it.
 *
 * Service accounts are only available for workspaces that are compatible with Grafana version 9 and above.
 */
export const listWorkspaceServiceAccountTokens: API.PaginatedOperationMethod<
  ListWorkspaceServiceAccountTokensRequest,
  ListWorkspaceServiceAccountTokensResponse,
  ListWorkspaceServiceAccountTokensError,
  Credentials | HttpClient.HttpClient,
  ServiceAccountTokenSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWorkspaceServiceAccountTokensRequest,
  output: ListWorkspaceServiceAccountTokensResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkspaceServiceAccountTokens",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "serviceAccountTokens",
    pageSize: "maxResults",
  } as const,
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The `TagResource` operation associates tags with an Amazon Managed Grafana resource. Currently, the only resource that can be tagged is workspaces.
 *
 * If you specify a new tag key for the resource, this tag is appended to the list of tags associated with the resource. If you specify a tag key that is already associated with the resource, the new tag value that you specify replaces the previous value for that tag.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The `UntagResource` operation removes the association of the tag with the Amazon Managed Grafana resource.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdatePermissionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates which users in a workspace have the Grafana `Admin` or `Editor` roles.
 */
export const updatePermissions: API.OperationMethod<
  UpdatePermissionsRequest,
  UpdatePermissionsResponse,
  UpdatePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePermissionsRequest,
  output: UpdatePermissionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePermissions",
}));

export type UpdateWorkspaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Modifies an existing Amazon Managed Grafana workspace. If you use this operation and omit any optional parameters, the existing values of those parameters are not changed.
 *
 * To modify the user authentication methods that the workspace uses, such as SAML or IAM Identity Center, use UpdateWorkspaceAuthentication.
 *
 * To modify which users in the workspace have the `Admin` and `Editor` Grafana roles, use UpdatePermissions.
 */
export const updateWorkspace: API.OperationMethod<
  UpdateWorkspaceRequest,
  UpdateWorkspaceResponse,
  UpdateWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWorkspaceRequest,
  output: UpdateWorkspaceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkspace",
}));

export type UpdateWorkspaceAuthenticationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to define the identity provider (IdP) that this workspace authenticates users from, using SAML. You can also map SAML assertion attributes to workspace user information and define which groups in the assertion attribute are to have the `Admin` and `Editor` roles in the workspace.
 *
 * Changes to the authentication method for a workspace may take a few minutes to take effect.
 */
export const updateWorkspaceAuthentication: API.OperationMethod<
  UpdateWorkspaceAuthenticationRequest,
  UpdateWorkspaceAuthenticationResponse,
  UpdateWorkspaceAuthenticationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWorkspaceAuthenticationRequest,
  output: UpdateWorkspaceAuthenticationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkspaceAuthentication",
}));

export type UpdateWorkspaceConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration string for the given workspace
 */
export const updateWorkspaceConfiguration: API.OperationMethod<
  UpdateWorkspaceConfigurationRequest,
  UpdateWorkspaceConfigurationResponse,
  UpdateWorkspaceConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWorkspaceConfigurationRequest,
  output: UpdateWorkspaceConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkspaceConfiguration",
}));
