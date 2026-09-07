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
  sdkId: "Agent Registry Control",
  serviceShapeName: "AgentRegistryControl",
});
const auth = T.AwsAuthSigv4({ name: "agent-registry" });
const ver = T.ServiceVersion("2025-12-01");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const { Region, Endpoint } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  if (Endpoint != null) {
    return e(Endpoint);
  }
  if (Region != null) {
    return e(`https://agent-registry-control.${Region}.api.aws`);
  }
  return err(
    "Unable to resolve an Agent Registry Control endpoint: Region was not set and no explicit Endpoint override was provided.",
  );
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
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
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
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
export type RegistryName = string;
export type Description = string | redacted.Redacted<string>;
export type DiscoveryUrl = string;
export type AllowedAudience = string;
export type AllowedAudienceList = string[];
export const AllowedAudienceList = /*@__PURE__*/ S.Array(S.String);
export type AllowedClient = string;
export type AllowedClientsList = string[];
export const AllowedClientsList = /*@__PURE__*/ S.Array(S.String);
export type AllowedScopeType = string;
export type AllowedScopesType = string[];
export const AllowedScopesType = /*@__PURE__*/ S.Array(S.String);
export type InboundTokenClaimNameType = string;
export type InboundTokenClaimValueType =
  | "STRING"
  | "STRING_ARRAY"
  | (string & {});
export const InboundTokenClaimValueType = S.String;

export type MatchValueString = string;
export type MatchValueStringList = string[];
export const MatchValueStringList = /*@__PURE__*/ S.Array(S.String);
export type ClaimMatchValueType =
  | { matchValueString: string; matchValueStringList?: never }
  | { matchValueString?: never; matchValueStringList: string[] };
export const ClaimMatchValueType = /*@__PURE__*/ S.Union([
  S.Struct({ matchValueString: S.String }),
  S.Struct({ matchValueStringList: MatchValueStringList }),
]);
export type ClaimMatchOperatorType =
  | "EQUALS"
  | "CONTAINS"
  | "CONTAINS_ANY"
  | (string & {});
export const ClaimMatchOperatorType = S.String;

export interface AuthorizingClaimMatchValueType {
  claimMatchValue: ClaimMatchValueType;
  claimMatchOperator: ClaimMatchOperatorType;
}
export const AuthorizingClaimMatchValueType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    claimMatchValue: ClaimMatchValueType,
    claimMatchOperator: ClaimMatchOperatorType,
  }),
).annotate({
  identifier: "AuthorizingClaimMatchValueType",
}) as any as S.Schema<AuthorizingClaimMatchValueType>;
export interface CustomClaimValidationType {
  inboundTokenClaimName: string;
  inboundTokenClaimValueType: InboundTokenClaimValueType;
  authorizingClaimMatchValue: AuthorizingClaimMatchValueType;
}
export const CustomClaimValidationType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inboundTokenClaimName: S.String,
    inboundTokenClaimValueType: InboundTokenClaimValueType,
    authorizingClaimMatchValue: AuthorizingClaimMatchValueType,
  }),
).annotate({
  identifier: "CustomClaimValidationType",
}) as any as S.Schema<CustomClaimValidationType>;
export type CustomClaimValidationsType = CustomClaimValidationType[];
export const CustomClaimValidationsType = /*@__PURE__*/ S.Array(
  CustomClaimValidationType,
);
export type ResourceConfigurationIdentifier = string;
export type SelfManagedLatticeResource = {
  resourceConfigurationIdentifier: string;
};
export const SelfManagedLatticeResource = /*@__PURE__*/ S.Union([
  S.Struct({ resourceConfigurationIdentifier: S.String }),
]);
export type VpcIdentifier = string;
export type SubnetId = string;
export type SubnetIds = string[];
export const SubnetIds = /*@__PURE__*/ S.Array(S.String);
export type EndpointIpAddressType = "IPV4" | "IPV6" | (string & {});
export const EndpointIpAddressType = S.String;

export type SecurityGroupIdentifier = string;
export type SecurityGroupIds = string[];
export const SecurityGroupIds = /*@__PURE__*/ S.Array(S.String);
export type TagKey = string;
export type TagValue = string;
export type TagsMap = { [key: string]: string | undefined };
export const TagsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type RoutingDomain = string;
export interface ManagedVpcResource {
  vpcIdentifier: string;
  subnetIds: string[];
  endpointIpAddressType: EndpointIpAddressType;
  securityGroupIds?: string[];
  tags?: { [key: string]: string | undefined };
  routingDomain?: string;
}
export const ManagedVpcResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vpcIdentifier: S.String,
    subnetIds: SubnetIds,
    endpointIpAddressType: EndpointIpAddressType,
    securityGroupIds: S.optional(SecurityGroupIds),
    tags: S.optional(TagsMap),
    routingDomain: S.optional(S.String),
  }),
).annotate({
  identifier: "ManagedVpcResource",
}) as any as S.Schema<ManagedVpcResource>;
export type PrivateEndpoint =
  | {
      selfManagedLatticeResource: SelfManagedLatticeResource;
      managedVpcResource?: never;
    }
  | {
      selfManagedLatticeResource?: never;
      managedVpcResource: ManagedVpcResource;
    };
export const PrivateEndpoint = /*@__PURE__*/ S.Union([
  S.Struct({ selfManagedLatticeResource: SelfManagedLatticeResource }),
  S.Struct({ managedVpcResource: ManagedVpcResource }),
]);
export type PrivateEndpointOverrideDomain = string;
export interface PrivateEndpointOverride {
  domain: string;
  privateEndpoint: PrivateEndpoint;
}
export const PrivateEndpointOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domain: S.String, privateEndpoint: PrivateEndpoint }),
).annotate({
  identifier: "PrivateEndpointOverride",
}) as any as S.Schema<PrivateEndpointOverride>;
export type PrivateEndpointOverrides = PrivateEndpointOverride[];
export const PrivateEndpointOverrides = /*@__PURE__*/ S.Array(
  PrivateEndpointOverride,
);
export interface CustomJWTAuthorizerConfiguration {
  discoveryUrl: string;
  allowedAudience?: string[];
  allowedClients?: string[];
  allowedScopes?: string[];
  customClaims?: CustomClaimValidationType[];
  privateEndpoint?: PrivateEndpoint;
  privateEndpointOverrides?: PrivateEndpointOverride[];
}
export const CustomJWTAuthorizerConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    discoveryUrl: S.String,
    allowedAudience: S.optional(AllowedAudienceList),
    allowedClients: S.optional(AllowedClientsList),
    allowedScopes: S.optional(AllowedScopesType),
    customClaims: S.optional(CustomClaimValidationsType),
    privateEndpoint: S.optional(PrivateEndpoint),
    privateEndpointOverrides: S.optional(PrivateEndpointOverrides),
  }),
).annotate({
  identifier: "CustomJWTAuthorizerConfiguration",
}) as any as S.Schema<CustomJWTAuthorizerConfiguration>;
export type AuthorizerConfiguration = {
  customJWTAuthorizer: CustomJWTAuthorizerConfiguration;
};
export const AuthorizerConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ customJWTAuthorizer: CustomJWTAuthorizerConfiguration }),
]);
export type RegistryAuthorizerType = "CUSTOM_JWT" | "AWS_IAM" | (string & {});
export const RegistryAuthorizerType = S.String;

export interface DiscoveryConfiguration {
  authorizerConfiguration?: AuthorizerConfiguration;
  authorizerType?: RegistryAuthorizerType;
}
export const DiscoveryConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authorizerConfiguration: S.optional(AuthorizerConfiguration),
    authorizerType: S.optional(RegistryAuthorizerType),
  }),
).annotate({
  identifier: "DiscoveryConfiguration",
}) as any as S.Schema<DiscoveryConfiguration>;
export type ClientToken = string;
export type AutoApprovalRule = "APPROVE_ALL" | (string & {});
export const AutoApprovalRule = S.String;

export type AutoApprovalRuleList = AutoApprovalRule[];
export const AutoApprovalRuleList = /*@__PURE__*/ S.Array(AutoApprovalRule);
export interface ApprovalConfiguration {
  autoApprovalRules?: AutoApprovalRule[];
}
export const ApprovalConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ autoApprovalRules: S.optional(AutoApprovalRuleList) }),
).annotate({
  identifier: "ApprovalConfiguration",
}) as any as S.Schema<ApprovalConfiguration>;
export interface CreateRegistryRequest {
  name: string;
  description?: string | redacted.Redacted<string>;
  discoveryConfiguration?: DiscoveryConfiguration;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
  approvalConfiguration?: ApprovalConfiguration;
}
export const CreateRegistryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(SensitiveString),
    discoveryConfiguration: S.optional(DiscoveryConfiguration),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagsMap),
    approvalConfiguration: S.optional(ApprovalConfiguration),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/registries" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRegistryRequest",
}) as any as S.Schema<CreateRegistryRequest>;
export type RegistryArn = string;
export interface CreateRegistryResponse {
  registryArn: string;
}
export const CreateRegistryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ registryArn: S.String }),
).annotate({
  identifier: "CreateRegistryResponse",
}) as any as S.Schema<CreateRegistryResponse>;
export type RegistryIdentifier = string;
export type RegistryRecordName = string;
export type RegistryRecordDisplayName = string;
export type RecordType = "MCP" | "AGENT" | "CUSTOM" | "SKILL" | (string & {});
export const RecordType = S.String;

export type DescriptorData = string | redacted.Redacted<string>;
export type DataSchemaVersion = string;
export interface McpToolsDescriptor {
  data?: string | redacted.Redacted<string>;
  dataSchemaVersion?: string;
}
export const McpToolsDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    data: S.optional(SensitiveString),
    dataSchemaVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "McpToolsDescriptor",
}) as any as S.Schema<McpToolsDescriptor>;
export interface McpServerAdditionalData {
  tools?: McpToolsDescriptor;
}
export const McpServerAdditionalData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tools: S.optional(McpToolsDescriptor) }),
).annotate({
  identifier: "McpServerAdditionalData",
}) as any as S.Schema<McpServerAdditionalData>;
export type DescriptorSourceUrl = string;
export type RegistryRecordCredentialProviderType =
  | "OAUTH"
  | "IAM"
  | (string & {});
export const RegistryRecordCredentialProviderType = S.String;

export type CredentialProviderArn = string;
export type RegistryRecordOAuthGrantType = "CLIENT_CREDENTIALS" | (string & {});
export const RegistryRecordOAuthGrantType = S.String;

export type ScopeList = string[];
export const ScopeList = /*@__PURE__*/ S.Array(S.String);
export type CustomParameterMap = { [key: string]: string | undefined };
export const CustomParameterMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface RegistryRecordOAuthCredentialProvider {
  providerArn: string;
  grantType?: RegistryRecordOAuthGrantType;
  scopes?: string[];
  customParameters?: { [key: string]: string | undefined };
}
export const RegistryRecordOAuthCredentialProvider = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      providerArn: S.String,
      grantType: S.optional(RegistryRecordOAuthGrantType),
      scopes: S.optional(ScopeList),
      customParameters: S.optional(CustomParameterMap),
    }),
).annotate({
  identifier: "RegistryRecordOAuthCredentialProvider",
}) as any as S.Schema<RegistryRecordOAuthCredentialProvider>;
export type IamRoleArn = string;
export type IamSigningServiceName = string;
export type IamSigningRegion = string;
export interface RegistryRecordIamCredentialProvider {
  roleArn?: string;
  service?: string;
  region?: string;
}
export const RegistryRecordIamCredentialProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleArn: S.optional(S.String),
    service: S.optional(S.String),
    region: S.optional(S.String),
  }),
).annotate({
  identifier: "RegistryRecordIamCredentialProvider",
}) as any as S.Schema<RegistryRecordIamCredentialProvider>;
export type RegistryRecordCredentialProviderUnion =
  | {
      oauthCredentialProvider: RegistryRecordOAuthCredentialProvider;
      iamCredentialProvider?: never;
    }
  | {
      oauthCredentialProvider?: never;
      iamCredentialProvider: RegistryRecordIamCredentialProvider;
    };
export const RegistryRecordCredentialProviderUnion = /*@__PURE__*/ S.Union([
  S.Struct({ oauthCredentialProvider: RegistryRecordOAuthCredentialProvider }),
  S.Struct({ iamCredentialProvider: RegistryRecordIamCredentialProvider }),
]);
export interface RegistryRecordCredentialProviderConfiguration {
  credentialProviderType: RegistryRecordCredentialProviderType;
  credentialProvider: RegistryRecordCredentialProviderUnion;
}
export const RegistryRecordCredentialProviderConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      credentialProviderType: RegistryRecordCredentialProviderType,
      credentialProvider: RegistryRecordCredentialProviderUnion,
    }),
  ).annotate({
    identifier: "RegistryRecordCredentialProviderConfiguration",
  }) as any as S.Schema<RegistryRecordCredentialProviderConfiguration>;
export type RegistryRecordCredentialProviderConfigurationList =
  RegistryRecordCredentialProviderConfiguration[];
export const RegistryRecordCredentialProviderConfigurationList =
  /*@__PURE__*/ S.Array(RegistryRecordCredentialProviderConfiguration);
export interface DescriptorSourceFromUrl {
  url: string;
  credentialProviderConfigurations?: RegistryRecordCredentialProviderConfiguration[];
}
export const DescriptorSourceFromUrl = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    url: S.String,
    credentialProviderConfigurations: S.optional(
      RegistryRecordCredentialProviderConfigurationList,
    ),
  }),
).annotate({
  identifier: "DescriptorSourceFromUrl",
}) as any as S.Schema<DescriptorSourceFromUrl>;
export interface DescriptorSource {
  fromUrl?: DescriptorSourceFromUrl;
}
export const DescriptorSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fromUrl: S.optional(DescriptorSourceFromUrl) }),
).annotate({
  identifier: "DescriptorSource",
}) as any as S.Schema<DescriptorSource>;
export interface McpServerDescriptor {
  data?: string | redacted.Redacted<string>;
  dataSchemaVersion?: string;
  additionalData?: McpServerAdditionalData;
  source?: DescriptorSource;
}
export const McpServerDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    data: S.optional(SensitiveString),
    dataSchemaVersion: S.optional(S.String),
    additionalData: S.optional(McpServerAdditionalData),
    source: S.optional(DescriptorSource),
  }),
).annotate({
  identifier: "McpServerDescriptor",
}) as any as S.Schema<McpServerDescriptor>;
export interface A2aAgentCardDescriptor {
  data?: string | redacted.Redacted<string>;
  dataSchemaVersion?: string;
  source?: DescriptorSource;
}
export const A2aAgentCardDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    data: S.optional(SensitiveString),
    dataSchemaVersion: S.optional(S.String),
    source: S.optional(DescriptorSource),
  }),
).annotate({
  identifier: "A2aAgentCardDescriptor",
}) as any as S.Schema<A2aAgentCardDescriptor>;
export interface AgentSkillsMdDescriptor {
  data?: string | redacted.Redacted<string>;
  dataSchemaVersion?: string;
  source?: DescriptorSource;
}
export const AgentSkillsMdDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    data: S.optional(SensitiveString),
    dataSchemaVersion: S.optional(S.String),
    source: S.optional(DescriptorSource),
  }),
).annotate({
  identifier: "AgentSkillsMdDescriptor",
}) as any as S.Schema<AgentSkillsMdDescriptor>;
export interface AgentSkillsAdditionalData {
  skillMd?: AgentSkillsMdDescriptor;
}
export const AgentSkillsAdditionalData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ skillMd: S.optional(AgentSkillsMdDescriptor) }),
).annotate({
  identifier: "AgentSkillsAdditionalData",
}) as any as S.Schema<AgentSkillsAdditionalData>;
export interface AgentSkillsDefinitionDescriptor {
  data?: string | redacted.Redacted<string>;
  dataSchemaVersion?: string;
  additionalData?: AgentSkillsAdditionalData;
}
export const AgentSkillsDefinitionDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    data: S.optional(SensitiveString),
    dataSchemaVersion: S.optional(S.String),
    additionalData: S.optional(AgentSkillsAdditionalData),
  }),
).annotate({
  identifier: "AgentSkillsDefinitionDescriptor",
}) as any as S.Schema<AgentSkillsDefinitionDescriptor>;
export interface CustomDescriptor {
  data?: string | redacted.Redacted<string>;
}
export const CustomDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ data: S.optional(SensitiveString) }),
).annotate({
  identifier: "CustomDescriptor",
}) as any as S.Schema<CustomDescriptor>;
export interface Descriptors {
  mcpServer?: McpServerDescriptor;
  a2aAgentCard?: A2aAgentCardDescriptor;
  agentSkillsDefinition?: AgentSkillsDefinitionDescriptor;
  custom?: CustomDescriptor;
}
export const Descriptors = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mcpServer: S.optional(McpServerDescriptor),
    a2aAgentCard: S.optional(A2aAgentCardDescriptor),
    agentSkillsDefinition: S.optional(AgentSkillsDefinitionDescriptor),
    custom: S.optional(CustomDescriptor),
  }),
).annotate({ identifier: "Descriptors" }) as any as S.Schema<Descriptors>;
export type RegistryRecordVersion = string;
export interface CreateRegistryRecordRequest {
  registryId: string;
  name: string;
  displayName?: string;
  description?: string | redacted.Redacted<string>;
  recordType: RecordType;
  descriptors: Descriptors;
  recordVersion?: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateRegistryRecordRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.String.pipe(T.HttpLabel("registryId")),
    name: S.String,
    displayName: S.optional(S.String),
    description: S.optional(SensitiveString),
    recordType: RecordType,
    descriptors: Descriptors,
    recordVersion: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/registries/{registryId}/records" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRegistryRecordRequest",
}) as any as S.Schema<CreateRegistryRecordRequest>;
export type RegistryRecordArn = string;
export type RegistryRecordStatus =
  | "DRAFT"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "DEPRECATED"
  | "CREATING"
  | "UPDATING"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | (string & {});
export const RegistryRecordStatus = S.String;

export interface CreateRegistryRecordResponse {
  recordArn: string;
  status: RegistryRecordStatus;
}
export const CreateRegistryRecordResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ recordArn: S.String, status: RegistryRecordStatus }),
).annotate({
  identifier: "CreateRegistryRecordResponse",
}) as any as S.Schema<CreateRegistryRecordResponse>;
export interface DeleteRegistryRequest {
  registryId: string;
}
export const DeleteRegistryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ registryId: S.String.pipe(T.HttpLabel("registryId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/registries/{registryId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRegistryRequest",
}) as any as S.Schema<DeleteRegistryRequest>;
export type RegistryStatus =
  | "CREATING"
  | "READY"
  | "UPDATING"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | "DELETING"
  | "DELETE_FAILED"
  | (string & {});
export const RegistryStatus = S.String;

export interface DeleteRegistryResponse {
  status: RegistryStatus;
}
export const DeleteRegistryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: RegistryStatus }),
).annotate({
  identifier: "DeleteRegistryResponse",
}) as any as S.Schema<DeleteRegistryResponse>;
export type RecordIdentifier = string;
export interface DeleteRegistryRecordRequest {
  registryId: string;
  recordId: string;
}
export const DeleteRegistryRecordRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.String.pipe(T.HttpLabel("registryId")),
    recordId: S.String.pipe(T.HttpLabel("recordId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/registries/{registryId}/records/{recordId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRegistryRecordRequest",
}) as any as S.Schema<DeleteRegistryRecordRequest>;
export interface DeleteRegistryRecordResponse {}
export const DeleteRegistryRecordResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRegistryRecordResponse",
}) as any as S.Schema<DeleteRegistryRecordResponse>;
export interface GetRegistryRequest {
  registryId: string;
}
export const GetRegistryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ registryId: S.String.pipe(T.HttpLabel("registryId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/registries/{registryId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRegistryRequest",
}) as any as S.Schema<GetRegistryRequest>;
export type RegistryId = string;
export interface GetRegistryResponse {
  name: string;
  description?: string | redacted.Redacted<string>;
  registryId: string;
  registryArn: string;
  discoveryConfiguration?: DiscoveryConfiguration;
  approvalConfiguration?: ApprovalConfiguration;
  status: RegistryStatus;
  statusReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
export const GetRegistryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(SensitiveString),
    registryId: S.String,
    registryArn: S.String,
    discoveryConfiguration: S.optional(DiscoveryConfiguration),
    approvalConfiguration: S.optional(ApprovalConfiguration),
    status: RegistryStatus,
    statusReason: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "GetRegistryResponse",
}) as any as S.Schema<GetRegistryResponse>;
export interface GetRegistryRecordRequest {
  registryId: string;
  recordId: string;
}
export const GetRegistryRecordRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.String.pipe(T.HttpLabel("registryId")),
    recordId: S.String.pipe(T.HttpLabel("recordId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/registries/{registryId}/records/{recordId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRegistryRecordRequest",
}) as any as S.Schema<GetRegistryRecordRequest>;
export type RegistryRecordId = string;
export interface GetRegistryRecordResponse {
  registryArn: string;
  recordArn: string;
  recordId: string;
  name: string;
  displayName?: string;
  description?: string | redacted.Redacted<string>;
  recordType: RecordType;
  descriptors?: Descriptors;
  recordVersion?: string;
  status: RegistryRecordStatus;
  createdAt: Date;
  updatedAt: Date;
  statusReason?: string;
}
export const GetRegistryRecordResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryArn: S.String,
    recordArn: S.String,
    recordId: S.String,
    name: S.String,
    displayName: S.optional(S.String),
    description: S.optional(SensitiveString),
    recordType: RecordType,
    descriptors: S.optional(Descriptors),
    recordVersion: S.optional(S.String),
    status: RegistryRecordStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "GetRegistryRecordResponse",
}) as any as S.Schema<GetRegistryRecordResponse>;
export type MaxResults = number;
export type NextToken = string;
export type RegistryFilterName =
  | "status"
  | "discoveryConfiguration.authorizerType"
  | (string & {});
export const RegistryFilterName = S.String;

export type FilterValue = string;
export type FilterValues = string[];
export const FilterValues = /*@__PURE__*/ S.Array(S.String);
export interface RegistryFilter {
  name: RegistryFilterName;
  values: string[];
}
export const RegistryFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: RegistryFilterName, values: FilterValues }),
).annotate({ identifier: "RegistryFilter" }) as any as S.Schema<RegistryFilter>;
export type RegistryFilterList = RegistryFilter[];
export const RegistryFilterList = /*@__PURE__*/ S.Array(RegistryFilter);
export interface ListRegistriesRequest {
  maxResults?: number;
  nextToken?: string;
  filters?: RegistryFilter[];
}
export const ListRegistriesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    filters: S.optional(RegistryFilterList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/registries-list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRegistriesRequest",
}) as any as S.Schema<ListRegistriesRequest>;
export interface RegistrySummary {
  name: string;
  description?: string | redacted.Redacted<string>;
  registryId: string;
  registryArn: string;
  discoveryConfiguration?: DiscoveryConfiguration;
  status: RegistryStatus;
  statusReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
export const RegistrySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(SensitiveString),
    registryId: S.String,
    registryArn: S.String,
    discoveryConfiguration: S.optional(DiscoveryConfiguration),
    status: RegistryStatus,
    statusReason: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "RegistrySummary",
}) as any as S.Schema<RegistrySummary>;
export type RegistrySummaryList = RegistrySummary[];
export const RegistrySummaryList = /*@__PURE__*/ S.Array(RegistrySummary);
export interface ListRegistriesResponse {
  registries: RegistrySummary[];
  nextToken?: string;
}
export const ListRegistriesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registries: RegistrySummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRegistriesResponse",
}) as any as S.Schema<ListRegistriesResponse>;
export type RegistryRecordFilterName =
  | "name"
  | "status"
  | "recordType"
  | (string & {});
export const RegistryRecordFilterName = S.String;

export interface RegistryRecordFilter {
  name: RegistryRecordFilterName;
  values: string[];
}
export const RegistryRecordFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: RegistryRecordFilterName, values: FilterValues }),
).annotate({
  identifier: "RegistryRecordFilter",
}) as any as S.Schema<RegistryRecordFilter>;
export type RegistryRecordFilterList = RegistryRecordFilter[];
export const RegistryRecordFilterList =
  /*@__PURE__*/ S.Array(RegistryRecordFilter);
export interface ListRegistryRecordsRequest {
  registryId: string;
  maxResults?: number;
  nextToken?: string;
  filters?: RegistryRecordFilter[];
}
export const ListRegistryRecordsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.String.pipe(T.HttpLabel("registryId")),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    filters: S.optional(RegistryRecordFilterList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/registries/{registryId}/records-list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRegistryRecordsRequest",
}) as any as S.Schema<ListRegistryRecordsRequest>;
export interface RegistryRecordSummary {
  registryArn: string;
  recordArn: string;
  recordId: string;
  name: string;
  displayName?: string;
  description?: string | redacted.Redacted<string>;
  recordType: RecordType;
  recordVersion: string;
  status: RegistryRecordStatus;
  createdAt: Date;
  updatedAt: Date;
}
export const RegistryRecordSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryArn: S.String,
    recordArn: S.String,
    recordId: S.String,
    name: S.String,
    displayName: S.optional(S.String),
    description: S.optional(SensitiveString),
    recordType: RecordType,
    recordVersion: S.String,
    status: RegistryRecordStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "RegistryRecordSummary",
}) as any as S.Schema<RegistryRecordSummary>;
export type RegistryRecordSummaryList = RegistryRecordSummary[];
export const RegistryRecordSummaryList = /*@__PURE__*/ S.Array(
  RegistryRecordSummary,
);
export interface ListRegistryRecordsResponse {
  registryRecords: RegistryRecordSummary[];
  nextToken?: string;
}
export const ListRegistryRecordsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryRecords: RegistryRecordSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRegistryRecordsResponse",
}) as any as S.Schema<ListRegistryRecordsResponse>;
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{resourceArn+}" }),
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
export type ResourceTagsMap = { [key: string]: string | undefined };
export const ResourceTagsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(ResourceTagsMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface SubmitRegistryRecordForApprovalRequest {
  registryId: string;
  recordId: string;
}
export const SubmitRegistryRecordForApprovalRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      registryId: S.String.pipe(T.HttpLabel("registryId")),
      recordId: S.String.pipe(T.HttpLabel("recordId")),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/registries/{registryId}/records/{recordId}/submit-for-approval",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "SubmitRegistryRecordForApprovalRequest",
}) as any as S.Schema<SubmitRegistryRecordForApprovalRequest>;
export interface SubmitRegistryRecordForApprovalResponse {
  registryArn: string;
  recordArn: string;
  recordId: string;
  status: RegistryRecordStatus;
  updatedAt: Date;
}
export const SubmitRegistryRecordForApprovalResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      registryArn: S.String,
      recordArn: S.String,
      recordId: S.String,
      status: RegistryRecordStatus,
      updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    }),
).annotate({
  identifier: "SubmitRegistryRecordForApprovalResponse",
}) as any as S.Schema<SubmitRegistryRecordForApprovalResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagsMap,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{resourceArn+}" }),
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
      T.Http({ method: "DELETE", uri: "/tags/{resourceArn+}" }),
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
export interface UpdatedDescription {
  optionalValue?: string | redacted.Redacted<string>;
}
export const UpdatedDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(SensitiveString) }),
).annotate({
  identifier: "UpdatedDescription",
}) as any as S.Schema<UpdatedDescription>;
export interface UpdatedAuthorizerConfiguration {
  optionalValue?: AuthorizerConfiguration;
}
export const UpdatedAuthorizerConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(AuthorizerConfiguration) }),
).annotate({
  identifier: "UpdatedAuthorizerConfiguration",
}) as any as S.Schema<UpdatedAuthorizerConfiguration>;
export interface UpdatedDiscoveryConfiguration {
  authorizerConfiguration?: UpdatedAuthorizerConfiguration;
}
export const UpdatedDiscoveryConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authorizerConfiguration: S.optional(UpdatedAuthorizerConfiguration),
  }),
).annotate({
  identifier: "UpdatedDiscoveryConfiguration",
}) as any as S.Schema<UpdatedDiscoveryConfiguration>;
export interface UpdatedApprovalConfiguration {
  optionalValue?: ApprovalConfiguration;
}
export const UpdatedApprovalConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(ApprovalConfiguration) }),
).annotate({
  identifier: "UpdatedApprovalConfiguration",
}) as any as S.Schema<UpdatedApprovalConfiguration>;
export interface UpdateRegistryRequest {
  registryId: string;
  name?: string;
  description?: UpdatedDescription;
  discoveryConfiguration?: UpdatedDiscoveryConfiguration;
  approvalConfiguration?: UpdatedApprovalConfiguration;
}
export const UpdateRegistryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.String.pipe(T.HttpLabel("registryId")),
    name: S.optional(S.String),
    description: S.optional(UpdatedDescription),
    discoveryConfiguration: S.optional(UpdatedDiscoveryConfiguration),
    approvalConfiguration: S.optional(UpdatedApprovalConfiguration),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/registries/{registryId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRegistryRequest",
}) as any as S.Schema<UpdateRegistryRequest>;
export interface UpdateRegistryResponse {
  name: string;
  description?: string | redacted.Redacted<string>;
  registryId: string;
  registryArn: string;
  discoveryConfiguration?: DiscoveryConfiguration;
  approvalConfiguration?: ApprovalConfiguration;
  status: RegistryStatus;
  statusReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
export const UpdateRegistryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(SensitiveString),
    registryId: S.String,
    registryArn: S.String,
    discoveryConfiguration: S.optional(DiscoveryConfiguration),
    approvalConfiguration: S.optional(ApprovalConfiguration),
    status: RegistryStatus,
    statusReason: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "UpdateRegistryResponse",
}) as any as S.Schema<UpdateRegistryResponse>;
export interface UpdatedDisplayName {
  optionalValue?: string;
}
export const UpdatedDisplayName = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(S.String) }),
).annotate({
  identifier: "UpdatedDisplayName",
}) as any as S.Schema<UpdatedDisplayName>;
export interface UpdatedDescriptorData {
  optionalValue?: string | redacted.Redacted<string>;
}
export const UpdatedDescriptorData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(SensitiveString) }),
).annotate({
  identifier: "UpdatedDescriptorData",
}) as any as S.Schema<UpdatedDescriptorData>;
export interface UpdatedDataSchemaVersion {
  optionalValue?: string;
}
export const UpdatedDataSchemaVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(S.String) }),
).annotate({
  identifier: "UpdatedDataSchemaVersion",
}) as any as S.Schema<UpdatedDataSchemaVersion>;
export interface UpdatedDescriptorSource {
  optionalValue?: DescriptorSource;
}
export const UpdatedDescriptorSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(DescriptorSource) }),
).annotate({
  identifier: "UpdatedDescriptorSource",
}) as any as S.Schema<UpdatedDescriptorSource>;
export interface UpdatedMcpToolsDescriptorFields {
  data?: UpdatedDescriptorData;
  dataSchemaVersion?: UpdatedDataSchemaVersion;
}
export const UpdatedMcpToolsDescriptorFields = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    data: S.optional(UpdatedDescriptorData),
    dataSchemaVersion: S.optional(UpdatedDataSchemaVersion),
  }),
).annotate({
  identifier: "UpdatedMcpToolsDescriptorFields",
}) as any as S.Schema<UpdatedMcpToolsDescriptorFields>;
export interface UpdatedMcpToolsDescriptor {
  optionalValue?: UpdatedMcpToolsDescriptorFields;
}
export const UpdatedMcpToolsDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(UpdatedMcpToolsDescriptorFields) }),
).annotate({
  identifier: "UpdatedMcpToolsDescriptor",
}) as any as S.Schema<UpdatedMcpToolsDescriptor>;
export interface UpdatedMcpServerAdditionalDataFields {
  tools?: UpdatedMcpToolsDescriptor;
}
export const UpdatedMcpServerAdditionalDataFields = /*@__PURE__*/ S.suspend(
  () => S.Struct({ tools: S.optional(UpdatedMcpToolsDescriptor) }),
).annotate({
  identifier: "UpdatedMcpServerAdditionalDataFields",
}) as any as S.Schema<UpdatedMcpServerAdditionalDataFields>;
export interface UpdatedMcpServerAdditionalData {
  optionalValue?: UpdatedMcpServerAdditionalDataFields;
}
export const UpdatedMcpServerAdditionalData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(UpdatedMcpServerAdditionalDataFields) }),
).annotate({
  identifier: "UpdatedMcpServerAdditionalData",
}) as any as S.Schema<UpdatedMcpServerAdditionalData>;
export interface UpdatedMcpServerDescriptorFields {
  data?: UpdatedDescriptorData;
  dataSchemaVersion?: UpdatedDataSchemaVersion;
  source?: UpdatedDescriptorSource;
  additionalData?: UpdatedMcpServerAdditionalData;
}
export const UpdatedMcpServerDescriptorFields = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    data: S.optional(UpdatedDescriptorData),
    dataSchemaVersion: S.optional(UpdatedDataSchemaVersion),
    source: S.optional(UpdatedDescriptorSource),
    additionalData: S.optional(UpdatedMcpServerAdditionalData),
  }),
).annotate({
  identifier: "UpdatedMcpServerDescriptorFields",
}) as any as S.Schema<UpdatedMcpServerDescriptorFields>;
export interface UpdatedMcpServerDescriptor {
  optionalValue?: UpdatedMcpServerDescriptorFields;
}
export const UpdatedMcpServerDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(UpdatedMcpServerDescriptorFields) }),
).annotate({
  identifier: "UpdatedMcpServerDescriptor",
}) as any as S.Schema<UpdatedMcpServerDescriptor>;
export interface UpdatedA2aAgentCardDescriptorFields {
  data?: UpdatedDescriptorData;
  dataSchemaVersion?: UpdatedDataSchemaVersion;
  source?: UpdatedDescriptorSource;
}
export const UpdatedA2aAgentCardDescriptorFields = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    data: S.optional(UpdatedDescriptorData),
    dataSchemaVersion: S.optional(UpdatedDataSchemaVersion),
    source: S.optional(UpdatedDescriptorSource),
  }),
).annotate({
  identifier: "UpdatedA2aAgentCardDescriptorFields",
}) as any as S.Schema<UpdatedA2aAgentCardDescriptorFields>;
export interface UpdatedA2aAgentCardDescriptor {
  optionalValue?: UpdatedA2aAgentCardDescriptorFields;
}
export const UpdatedA2aAgentCardDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(UpdatedA2aAgentCardDescriptorFields) }),
).annotate({
  identifier: "UpdatedA2aAgentCardDescriptor",
}) as any as S.Schema<UpdatedA2aAgentCardDescriptor>;
export interface UpdatedAgentSkillsMdDescriptorFields {
  data?: UpdatedDescriptorData;
  dataSchemaVersion?: UpdatedDataSchemaVersion;
  source?: UpdatedDescriptorSource;
}
export const UpdatedAgentSkillsMdDescriptorFields = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      data: S.optional(UpdatedDescriptorData),
      dataSchemaVersion: S.optional(UpdatedDataSchemaVersion),
      source: S.optional(UpdatedDescriptorSource),
    }),
).annotate({
  identifier: "UpdatedAgentSkillsMdDescriptorFields",
}) as any as S.Schema<UpdatedAgentSkillsMdDescriptorFields>;
export interface UpdatedAgentSkillsMdDescriptor {
  optionalValue?: UpdatedAgentSkillsMdDescriptorFields;
}
export const UpdatedAgentSkillsMdDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(UpdatedAgentSkillsMdDescriptorFields) }),
).annotate({
  identifier: "UpdatedAgentSkillsMdDescriptor",
}) as any as S.Schema<UpdatedAgentSkillsMdDescriptor>;
export interface UpdatedAgentSkillsAdditionalDataFields {
  skillMd?: UpdatedAgentSkillsMdDescriptor;
}
export const UpdatedAgentSkillsAdditionalDataFields = /*@__PURE__*/ S.suspend(
  () => S.Struct({ skillMd: S.optional(UpdatedAgentSkillsMdDescriptor) }),
).annotate({
  identifier: "UpdatedAgentSkillsAdditionalDataFields",
}) as any as S.Schema<UpdatedAgentSkillsAdditionalDataFields>;
export interface UpdatedAgentSkillsAdditionalData {
  optionalValue?: UpdatedAgentSkillsAdditionalDataFields;
}
export const UpdatedAgentSkillsAdditionalData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    optionalValue: S.optional(UpdatedAgentSkillsAdditionalDataFields),
  }),
).annotate({
  identifier: "UpdatedAgentSkillsAdditionalData",
}) as any as S.Schema<UpdatedAgentSkillsAdditionalData>;
export interface UpdatedAgentSkillsDefinitionDescriptorFields {
  data?: UpdatedDescriptorData;
  dataSchemaVersion?: UpdatedDataSchemaVersion;
  additionalData?: UpdatedAgentSkillsAdditionalData;
}
export const UpdatedAgentSkillsDefinitionDescriptorFields =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      data: S.optional(UpdatedDescriptorData),
      dataSchemaVersion: S.optional(UpdatedDataSchemaVersion),
      additionalData: S.optional(UpdatedAgentSkillsAdditionalData),
    }),
  ).annotate({
    identifier: "UpdatedAgentSkillsDefinitionDescriptorFields",
  }) as any as S.Schema<UpdatedAgentSkillsDefinitionDescriptorFields>;
export interface UpdatedAgentSkillsDefinitionDescriptor {
  optionalValue?: UpdatedAgentSkillsDefinitionDescriptorFields;
}
export const UpdatedAgentSkillsDefinitionDescriptor = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      optionalValue: S.optional(UpdatedAgentSkillsDefinitionDescriptorFields),
    }),
).annotate({
  identifier: "UpdatedAgentSkillsDefinitionDescriptor",
}) as any as S.Schema<UpdatedAgentSkillsDefinitionDescriptor>;
export interface UpdatedCustomDescriptorFields {
  data?: UpdatedDescriptorData;
}
export const UpdatedCustomDescriptorFields = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ data: S.optional(UpdatedDescriptorData) }),
).annotate({
  identifier: "UpdatedCustomDescriptorFields",
}) as any as S.Schema<UpdatedCustomDescriptorFields>;
export interface UpdatedCustomDescriptor {
  optionalValue?: UpdatedCustomDescriptorFields;
}
export const UpdatedCustomDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(UpdatedCustomDescriptorFields) }),
).annotate({
  identifier: "UpdatedCustomDescriptor",
}) as any as S.Schema<UpdatedCustomDescriptor>;
export interface UpdatedDescriptorsFields {
  mcpServer?: UpdatedMcpServerDescriptor;
  a2aAgentCard?: UpdatedA2aAgentCardDescriptor;
  agentSkillsDefinition?: UpdatedAgentSkillsDefinitionDescriptor;
  custom?: UpdatedCustomDescriptor;
}
export const UpdatedDescriptorsFields = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mcpServer: S.optional(UpdatedMcpServerDescriptor),
    a2aAgentCard: S.optional(UpdatedA2aAgentCardDescriptor),
    agentSkillsDefinition: S.optional(UpdatedAgentSkillsDefinitionDescriptor),
    custom: S.optional(UpdatedCustomDescriptor),
  }),
).annotate({
  identifier: "UpdatedDescriptorsFields",
}) as any as S.Schema<UpdatedDescriptorsFields>;
export interface UpdatedDescriptors {
  optionalValue?: UpdatedDescriptorsFields;
}
export const UpdatedDescriptors = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(UpdatedDescriptorsFields) }),
).annotate({
  identifier: "UpdatedDescriptors",
}) as any as S.Schema<UpdatedDescriptors>;
export interface UpdateRegistryRecordRequest {
  registryId: string;
  recordId: string;
  name?: string;
  displayName?: UpdatedDisplayName;
  description?: UpdatedDescription;
  recordType?: RecordType;
  descriptors?: UpdatedDescriptors;
  recordVersion?: string;
  triggerSynchronization?: boolean;
}
export const UpdateRegistryRecordRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.String.pipe(T.HttpLabel("registryId")),
    recordId: S.String.pipe(T.HttpLabel("recordId")),
    name: S.optional(S.String),
    displayName: S.optional(UpdatedDisplayName),
    description: S.optional(UpdatedDescription),
    recordType: S.optional(RecordType),
    descriptors: S.optional(UpdatedDescriptors),
    recordVersion: S.optional(S.String),
    triggerSynchronization: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/registries/{registryId}/records/{recordId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRegistryRecordRequest",
}) as any as S.Schema<UpdateRegistryRecordRequest>;
export interface UpdateRegistryRecordResponse {
  registryArn: string;
  recordArn: string;
  recordId: string;
  name: string;
  displayName?: string;
  description?: string | redacted.Redacted<string>;
  recordType: RecordType;
  descriptors?: Descriptors;
  recordVersion?: string;
  status: RegistryRecordStatus;
  createdAt: Date;
  updatedAt: Date;
  statusReason?: string;
}
export const UpdateRegistryRecordResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryArn: S.String,
    recordArn: S.String,
    recordId: S.String,
    name: S.String,
    displayName: S.optional(S.String),
    description: S.optional(SensitiveString),
    recordType: RecordType,
    descriptors: S.optional(Descriptors),
    recordVersion: S.optional(S.String),
    status: RegistryRecordStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateRegistryRecordResponse",
}) as any as S.Schema<UpdateRegistryRecordResponse>;
export interface UpdateRegistryRecordStatusRequest {
  registryId: string;
  recordId: string;
  status: RegistryRecordStatus;
  statusReason: string;
}
export const UpdateRegistryRecordStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.String.pipe(T.HttpLabel("registryId")),
    recordId: S.String.pipe(T.HttpLabel("recordId")),
    status: RegistryRecordStatus,
    statusReason: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/registries/{registryId}/records/{recordId}/status",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRegistryRecordStatusRequest",
}) as any as S.Schema<UpdateRegistryRecordStatusRequest>;
export interface UpdateRegistryRecordStatusResponse {
  registryArn: string;
  recordArn: string;
  recordId: string;
  status: RegistryRecordStatus;
  statusReason: string;
  updatedAt: Date;
}
export const UpdateRegistryRecordStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryArn: S.String,
    recordArn: S.String,
    recordId: S.String,
    status: RegistryRecordStatus,
    statusReason: S.String,
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "UpdateRegistryRecordStatusResponse",
}) as any as S.Schema<UpdateRegistryRecordStatusResponse>;
export type NonBlankString = string;
export type ValidationExceptionReason =
  | "CannotParse"
  | "FieldValidationFailed"
  | "IdempotentParameterMismatchException"
  | "EventInOtherSession"
  | "ResourceConflict"
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
export type CreateRegistryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new registry, a catalog that organizes registry records and defines their discovery authorization and record approval behavior. Creation is asynchronous: the registry begins in the CREATING status and becomes usable once it reaches READY.
 */
export const createRegistry: API.OperationMethod<
  CreateRegistryRequest,
  CreateRegistryResponse,
  CreateRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRegistryRequest,
  output: CreateRegistryResponse,
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
  operationName: "CreateRegistry",
}));

export type CreateRegistryRecordError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a registry record within a registry. A registry record describes a discoverable resource, such as an MCP server, an agent, an agent skill, or a custom resource. Creation is asynchronous: the record is returned with the CREATING status while it is processed.
 */
export const createRegistryRecord: API.OperationMethod<
  CreateRegistryRecordRequest,
  CreateRegistryRecordResponse,
  CreateRegistryRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRegistryRecordRequest,
  output: CreateRegistryRecordResponse,
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
  operationName: "CreateRegistryRecord",
}));

export type DeleteRegistryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a registry. Deletion is asynchronous: the registry transitions to the DELETING status and is removed along with its registry records.
 */
export const deleteRegistry: API.OperationMethod<
  DeleteRegistryRequest,
  DeleteRegistryResponse,
  DeleteRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRegistryRequest,
  output: DeleteRegistryResponse,
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
  operationName: "DeleteRegistry",
}));

export type DeleteRegistryRecordError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a registry record
 */
export const deleteRegistryRecord: API.OperationMethod<
  DeleteRegistryRecordRequest,
  DeleteRegistryRecordResponse,
  DeleteRegistryRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRegistryRecordRequest,
  output: DeleteRegistryRecordResponse,
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
  operationName: "DeleteRegistryRecord",
}));

export type GetRegistryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a registry by identifier (ARN or ID)
 */
export const getRegistry: API.OperationMethod<
  GetRegistryRequest,
  GetRegistryResponse,
  GetRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRegistryRequest,
  output: GetRegistryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegistry",
}));

export type GetRegistryRecordError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a registry record
 */
export const getRegistryRecord: API.OperationMethod<
  GetRegistryRecordRequest,
  GetRegistryRecordResponse,
  GetRegistryRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRegistryRecordRequest,
  output: GetRegistryRecordResponse,
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
  operationName: "GetRegistryRecord",
}));

export type ListRegistriesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the registries in the caller's account and Region, with optional filtering by status and discovery authorizer type
 */
export const listRegistries: API.PaginatedOperationMethod<
  ListRegistriesRequest,
  ListRegistriesResponse,
  ListRegistriesError,
  Credentials | HttpClient.HttpClient,
  RegistrySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRegistriesRequest,
  output: ListRegistriesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRegistries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "registries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRegistryRecordsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the registry records within a registry, with optional filtering by name, status, and record type
 */
export const listRegistryRecords: API.PaginatedOperationMethod<
  ListRegistryRecordsRequest,
  ListRegistryRecordsResponse,
  ListRegistryRecordsError,
  Credentials | HttpClient.HttpClient,
  RegistryRecordSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRegistryRecordsRequest,
  output: ListRegistryRecordsResponse,
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
  operationName: "ListRegistryRecords",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "registryRecords",
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
 * List the tags on a resource
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

export type SubmitRegistryRecordForApprovalError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Submits a DRAFT registry record for approval, moving it into the registry's approval workflow. Depending on the registry's approval configuration, the record is either auto-approved or set to PENDING_APPROVAL for a curator to approve or reject.
 */
export const submitRegistryRecordForApproval: API.OperationMethod<
  SubmitRegistryRecordForApprovalRequest,
  SubmitRegistryRecordForApprovalResponse,
  SubmitRegistryRecordForApprovalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SubmitRegistryRecordForApprovalRequest,
  output: SubmitRegistryRecordForApprovalResponse,
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
  operationName: "SubmitRegistryRecordForApproval",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Tag a resource with key-value pairs
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
    ServiceQuotaExceededException,
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
 * Remove tags from a resource by key
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

export type UpdateRegistryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing registry. This operation uses PATCH semantics: specify only the fields you want to change, and omit the rest to leave them unchanged. Updates are applied asynchronously and the registry transitions to the UPDATING status while they are processed.
 */
export const updateRegistry: API.OperationMethod<
  UpdateRegistryRequest,
  UpdateRegistryResponse,
  UpdateRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRegistryRequest,
  output: UpdateRegistryResponse,
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
  operationName: "UpdateRegistry",
}));

export type UpdateRegistryRecordError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a registry record. The update is asynchronous: the record is returned with the UPDATING status while it is processed. Fields that use update wrappers follow PATCH semantics: omit the field to leave it unchanged.
 */
export const updateRegistryRecord: API.OperationMethod<
  UpdateRegistryRecordRequest,
  UpdateRegistryRecordResponse,
  UpdateRegistryRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRegistryRecordRequest,
  output: UpdateRegistryRecordResponse,
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
  operationName: "UpdateRegistryRecord",
}));

export type UpdateRegistryRecordStatusError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the status of a registry record as part of the registry's curation workflow, for example to approve or reject a record that is pending approval, or to deprecate an approved record so that it is no longer discoverable
 */
export const updateRegistryRecordStatus: API.OperationMethod<
  UpdateRegistryRecordStatusRequest,
  UpdateRegistryRecordStatusResponse,
  UpdateRegistryRecordStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRegistryRecordStatusRequest,
  output: UpdateRegistryRecordStatusResponse,
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
  operationName: "UpdateRegistryRecordStatus",
}));
