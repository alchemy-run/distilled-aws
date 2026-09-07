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
  sdkId: "Bedrock AgentCore Control",
  serviceShapeName: "AmazonBedrockAgentCoreControl",
});
const auth = T.AwsAuthSigv4({ name: "bedrock-agentcore" });
const ver = T.ServiceVersion("2023-06-05");
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
              `https://bedrock-agentcore-control-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://bedrock-agentcore-control-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://bedrock-agentcore-control.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://bedrock-agentcore-control.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DecryptionFailure
  extends /*@__PURE__*/ S.TaggedError<DecryptionFailure>()(
    "DecryptionFailure",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class EncryptionFailure
  extends /*@__PURE__*/ S.TaggedError<EncryptionFailure>()(
    "EncryptionFailure",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceLimitExceededException>()(
    "ResourceLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class RetryableConflictException
  extends /*@__PURE__*/ S.TaggedError<RetryableConflictException>()(
    "RetryableConflictException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(409), T.Retryable()),
  ).pipe(C.withConflictError, C.withRetryableError) {}
export class ServiceException
  extends /*@__PURE__*/ S.TaggedError<ServiceException>()(
    "ServiceException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class SubscriptionRequiredException
  extends /*@__PURE__*/ S.TaggedError<SubscriptionRequiredException>()(
    "SubscriptionRequiredException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      subscriptionUrl: S.optional(S.String),
      productName: S.optional(S.String),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ThrottledException
  extends /*@__PURE__*/ S.TaggedError<ThrottledException>()(
    "ThrottledException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(429), T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
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
export type DatasetId = string;
export type ClientToken = string;
export type SensitiveJson = unknown;
export type DatasetExampleList = any[];
export const DatasetExampleList = /*@__PURE__*/ S.Array(S.Any);
export interface InlineExamplesSource {
  examples: any[];
}
export const InlineExamplesSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ examples: DatasetExampleList }),
).annotate({
  identifier: "InlineExamplesSource",
}) as any as S.Schema<InlineExamplesSource>;
export type S3Uri = string;
export interface S3Source {
  s3Uri: string;
}
export const S3Source = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Uri: S.String }),
).annotate({ identifier: "S3Source" }) as any as S.Schema<S3Source>;
export type DataSourceType =
  | { inlineExamples: InlineExamplesSource; s3Source?: never }
  | { inlineExamples?: never; s3Source: S3Source };
export const DataSourceType = /*@__PURE__*/ S.Union([
  S.Struct({ inlineExamples: InlineExamplesSource }),
  S.Struct({ s3Source: S3Source }),
]);
export interface AddDatasetExamplesRequest {
  datasetId: string;
  clientToken?: string;
  source: DataSourceType;
}
export const AddDatasetExamplesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetId: S.String.pipe(T.HttpLabel("datasetId")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    source: DataSourceType,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/datasets/{datasetId}/examples/add" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AddDatasetExamplesRequest",
}) as any as S.Schema<AddDatasetExamplesRequest>;
export type DatasetArn = string;
export type DatasetStatus =
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "ACTIVE"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | "DELETE_FAILED"
  | (string & {});
export const DatasetStatus = S.String;

export type ExampleId = string;
export type ExampleIdList = string[];
export const ExampleIdList = /*@__PURE__*/ S.Array(S.String);
export interface AddDatasetExamplesResponse {
  datasetArn: string;
  datasetId: string;
  status: DatasetStatus;
  addedCount: number;
  updatedAt: Date;
  exampleIds: string[];
}
export const AddDatasetExamplesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetArn: S.String,
    datasetId: S.String,
    status: DatasetStatus,
    addedCount: S.Number,
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    exampleIds: ExampleIdList,
  }),
).annotate({
  identifier: "AddDatasetExamplesResponse",
}) as any as S.Schema<AddDatasetExamplesResponse>;
export type GatewayIdentifier = string;
export type GatewayRateLimitId = string;
export type GatewayRateLimitDescription = string;
export type DimensionKey = string;
export type DimensionKeys = string[];
export const DimensionKeys = /*@__PURE__*/ S.Array(S.String);
export type DimensionValue = string;
export type Dimensions = { [key: string]: string | undefined };
export const Dimensions = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type Period = "second" | "minute" | (string & {});
export const Period = S.String;

export interface RateConfig {
  rate: number;
  period: Period;
}
export const RateConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ rate: S.Number, period: Period }),
).annotate({ identifier: "RateConfig" }) as any as S.Schema<RateConfig>;
export type RateConfigs = RateConfig[];
export const RateConfigs = /*@__PURE__*/ S.Array(RateConfig);
export interface LimitEntry {
  dimensions: { [key: string]: string | undefined };
  requests?: RateConfig[];
  tokens?: RateConfig[];
  connections?: RateConfig[];
}
export const LimitEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dimensions: Dimensions,
    requests: S.optional(RateConfigs),
    tokens: S.optional(RateConfigs),
    connections: S.optional(RateConfigs),
  }),
).annotate({ identifier: "LimitEntry" }) as any as S.Schema<LimitEntry>;
export type LimitEntries = LimitEntry[];
export const LimitEntries = /*@__PURE__*/ S.Array(LimitEntry);
export interface BatchPutLimitEntry {
  rateLimitId?: string;
  description?: string;
  dimensionKeys: string[];
  entries: LimitEntry[];
}
export const BatchPutLimitEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    rateLimitId: S.optional(S.String),
    description: S.optional(S.String),
    dimensionKeys: DimensionKeys,
    entries: LimitEntries,
  }),
).annotate({
  identifier: "BatchPutLimitEntry",
}) as any as S.Schema<BatchPutLimitEntry>;
export type BatchPutLimitEntries = BatchPutLimitEntry[];
export const BatchPutLimitEntries = /*@__PURE__*/ S.Array(BatchPutLimitEntry);
export interface BatchPutGatewayRateLimitsRequest {
  gatewayIdentifier: string;
  clientToken?: string;
  rateLimits: BatchPutLimitEntry[];
}
export const BatchPutGatewayRateLimitsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayIdentifier: S.String.pipe(T.HttpLabel("gatewayIdentifier")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    rateLimits: BatchPutLimitEntries,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/gateways/{gatewayIdentifier}/rate-limits/batch",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchPutGatewayRateLimitsRequest",
}) as any as S.Schema<BatchPutGatewayRateLimitsRequest>;
export type GatewayRateLimitStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | (string & {});
export const GatewayRateLimitStatus = S.String;

export interface GatewayRateLimitDetail {
  rateLimitId: string;
  gatewayIdentifier: string;
  description?: string;
  dimensionKeys: string[];
  entries: LimitEntry[];
  status: GatewayRateLimitStatus;
  createdAt: Date;
  updatedAt: Date;
}
export const GatewayRateLimitDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    rateLimitId: S.String,
    gatewayIdentifier: S.String,
    description: S.optional(S.String),
    dimensionKeys: DimensionKeys,
    entries: LimitEntries,
    status: GatewayRateLimitStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "GatewayRateLimitDetail",
}) as any as S.Schema<GatewayRateLimitDetail>;
export type GatewayRateLimits = GatewayRateLimitDetail[];
export const GatewayRateLimits = /*@__PURE__*/ S.Array(GatewayRateLimitDetail);
export interface BatchPutGatewayRateLimitsResponse {
  rateLimits: GatewayRateLimitDetail[];
}
export const BatchPutGatewayRateLimitsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ rateLimits: GatewayRateLimits }),
).annotate({
  identifier: "BatchPutGatewayRateLimitsResponse",
}) as any as S.Schema<BatchPutGatewayRateLimitsResponse>;
export type AgentRuntimeName = string;
export type RuntimeContainerUri = string;
export interface ContainerConfiguration {
  containerUri: string;
}
export const ContainerConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ containerUri: S.String }),
).annotate({
  identifier: "ContainerConfiguration",
}) as any as S.Schema<ContainerConfiguration>;
export interface S3Location {
  bucket: string;
  prefix: string;
  versionId?: string;
}
export const S3Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucket: S.String,
    prefix: S.String,
    versionId: S.optional(S.String),
  }),
).annotate({ identifier: "S3Location" }) as any as S.Schema<S3Location>;
export type Code = { s3: S3Location };
export const Code = /*@__PURE__*/ S.Union([S.Struct({ s3: S3Location })]);
export type AgentManagedRuntimeType =
  | "PYTHON_3_10"
  | "PYTHON_3_11"
  | "PYTHON_3_12"
  | "PYTHON_3_13"
  | "PYTHON_3_14"
  | "NODE_22"
  | (string & {});
export const AgentManagedRuntimeType = S.String;

export type EntryPoint = string;
export type EntryPoints = string[];
export const EntryPoints = /*@__PURE__*/ S.Array(S.String);
export interface CodeConfiguration {
  code: Code;
  runtime: AgentManagedRuntimeType;
  entryPoint: string[];
}
export const CodeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    code: Code,
    runtime: AgentManagedRuntimeType,
    entryPoint: EntryPoints,
  }),
).annotate({
  identifier: "CodeConfiguration",
}) as any as S.Schema<CodeConfiguration>;
export type AgentRuntimeArtifact =
  | {
      containerConfiguration: ContainerConfiguration;
      codeConfiguration?: never;
    }
  | { containerConfiguration?: never; codeConfiguration: CodeConfiguration };
export const AgentRuntimeArtifact = /*@__PURE__*/ S.Union([
  S.Struct({ containerConfiguration: ContainerConfiguration }),
  S.Struct({ codeConfiguration: CodeConfiguration }),
]);
export type RoleArn = string;
export type NetworkMode = "PUBLIC" | "VPC" | (string & {});
export const NetworkMode = S.String;

export type SecurityGroupId = string;
export type SecurityGroups = string[];
export const SecurityGroups = /*@__PURE__*/ S.Array(S.String);
export type SubnetId = string;
export type Subnets = string[];
export const Subnets = /*@__PURE__*/ S.Array(S.String);
export interface VpcConfig {
  securityGroups: string[];
  subnets: string[];
  requireServiceS3Endpoint?: boolean;
}
export const VpcConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    securityGroups: SecurityGroups,
    subnets: Subnets,
    requireServiceS3Endpoint: S.optional(S.Boolean),
  }),
).annotate({ identifier: "VpcConfig" }) as any as S.Schema<VpcConfig>;
export interface NetworkConfiguration {
  networkMode: NetworkMode;
  networkModeConfig?: VpcConfig;
}
export const NetworkConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkMode: NetworkMode,
    networkModeConfig: S.optional(VpcConfig),
  }),
).annotate({
  identifier: "NetworkConfiguration",
}) as any as S.Schema<NetworkConfiguration>;
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
export type AdvertisedScopeMappingType = { [key: string]: string | undefined };
export const AdvertisedScopeMappingType = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
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
export type BedrockAgentcoreResourceArn = string;
export interface HostingEnvironment {
  arn: string;
}
export const HostingEnvironment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }),
).annotate({
  identifier: "HostingEnvironment",
}) as any as S.Schema<HostingEnvironment>;
export type HostingEnvironmentListType = HostingEnvironment[];
export const HostingEnvironmentListType =
  /*@__PURE__*/ S.Array(HostingEnvironment);
export type WorkloadIdentityNameType = string;
export type WorkloadIdentityNameListType = string[];
export const WorkloadIdentityNameListType = /*@__PURE__*/ S.Array(S.String);
export interface AllowedWorkloadConfiguration {
  hostingEnvironments?: HostingEnvironment[];
  workloadIdentities?: string[];
}
export const AllowedWorkloadConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    hostingEnvironments: S.optional(HostingEnvironmentListType),
    workloadIdentities: S.optional(WorkloadIdentityNameListType),
  }),
).annotate({
  identifier: "AllowedWorkloadConfiguration",
}) as any as S.Schema<AllowedWorkloadConfiguration>;
export interface CustomJWTAuthorizerConfiguration {
  discoveryUrl: string;
  allowedAudience?: string[];
  allowedClients?: string[];
  allowedScopes?: string[];
  advertisedScopeMapping?: { [key: string]: string | undefined };
  customClaims?: CustomClaimValidationType[];
  privateEndpoint?: PrivateEndpoint;
  privateEndpointOverrides?: PrivateEndpointOverride[];
  allowedWorkloadConfiguration?: AllowedWorkloadConfiguration;
}
export const CustomJWTAuthorizerConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    discoveryUrl: S.String,
    allowedAudience: S.optional(AllowedAudienceList),
    allowedClients: S.optional(AllowedClientsList),
    allowedScopes: S.optional(AllowedScopesType),
    advertisedScopeMapping: S.optional(AdvertisedScopeMappingType),
    customClaims: S.optional(CustomClaimValidationsType),
    privateEndpoint: S.optional(PrivateEndpoint),
    privateEndpointOverrides: S.optional(PrivateEndpointOverrides),
    allowedWorkloadConfiguration: S.optional(AllowedWorkloadConfiguration),
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
export type HeaderName = string;
export type RequestHeaderAllowlist = string[];
export const RequestHeaderAllowlist = /*@__PURE__*/ S.Array(S.String);
export type RequestHeaderConfiguration = { requestHeaderAllowlist: string[] };
export const RequestHeaderConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ requestHeaderAllowlist: RequestHeaderAllowlist }),
]);
export type ServerProtocol = "MCP" | "HTTP" | "A2A" | "AGUI" | (string & {});
export const ServerProtocol = S.String;

export interface ProtocolConfiguration {
  serverProtocol: ServerProtocol;
}
export const ProtocolConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serverProtocol: ServerProtocol }),
).annotate({
  identifier: "ProtocolConfiguration",
}) as any as S.Schema<ProtocolConfiguration>;
export interface LifecycleConfiguration {
  idleRuntimeSessionTimeout?: number;
  maxLifetime?: number;
}
export const LifecycleConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    idleRuntimeSessionTimeout: S.optional(S.Number),
    maxLifetime: S.optional(S.Number),
  }),
).annotate({
  identifier: "LifecycleConfiguration",
}) as any as S.Schema<LifecycleConfiguration>;
export type EnvironmentVariableKey = string;
export type EnvironmentVariableValue = string;
export type EnvironmentVariablesMap = { [key: string]: string | undefined };
export const EnvironmentVariablesMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type MountPath = string;
export interface SessionStorageConfiguration {
  mountPath: string;
}
export const SessionStorageConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ mountPath: S.String }),
).annotate({
  identifier: "SessionStorageConfiguration",
}) as any as S.Schema<SessionStorageConfiguration>;
export type S3FilesAccessPointArn = string;
export interface S3FilesAccessPointConfiguration {
  accessPointArn: string;
  mountPath: string;
}
export const S3FilesAccessPointConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accessPointArn: S.String, mountPath: S.String }),
).annotate({
  identifier: "S3FilesAccessPointConfiguration",
}) as any as S.Schema<S3FilesAccessPointConfiguration>;
export type EfsAccessPointArn = string;
export interface EfsAccessPointConfiguration {
  accessPointArn: string;
  mountPath: string;
}
export const EfsAccessPointConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accessPointArn: S.String, mountPath: S.String }),
).annotate({
  identifier: "EfsAccessPointConfiguration",
}) as any as S.Schema<EfsAccessPointConfiguration>;
export type CapacityProviderVolumeName = string;
export interface CapacityProviderVolumeConfiguration {
  volumeName: string;
  mountPath: string;
}
export const CapacityProviderVolumeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ volumeName: S.String, mountPath: S.String }),
).annotate({
  identifier: "CapacityProviderVolumeConfiguration",
}) as any as S.Schema<CapacityProviderVolumeConfiguration>;
export type FilesystemConfiguration =
  | {
      sessionStorage: SessionStorageConfiguration;
      s3FilesAccessPoint?: never;
      efsAccessPoint?: never;
      capacityProviderVolume?: never;
    }
  | {
      sessionStorage?: never;
      s3FilesAccessPoint: S3FilesAccessPointConfiguration;
      efsAccessPoint?: never;
      capacityProviderVolume?: never;
    }
  | {
      sessionStorage?: never;
      s3FilesAccessPoint?: never;
      efsAccessPoint: EfsAccessPointConfiguration;
      capacityProviderVolume?: never;
    }
  | {
      sessionStorage?: never;
      s3FilesAccessPoint?: never;
      efsAccessPoint?: never;
      capacityProviderVolume: CapacityProviderVolumeConfiguration;
    };
export const FilesystemConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ sessionStorage: SessionStorageConfiguration }),
  S.Struct({ s3FilesAccessPoint: S3FilesAccessPointConfiguration }),
  S.Struct({ efsAccessPoint: EfsAccessPointConfiguration }),
  S.Struct({ capacityProviderVolume: CapacityProviderVolumeConfiguration }),
]);
export type FilesystemConfigurations = FilesystemConfiguration[];
export const FilesystemConfigurations = /*@__PURE__*/ S.Array(
  FilesystemConfiguration,
);
export type CapacityProviderArn = string;
export interface CapacityProviderConfiguration {
  capacityProviderArn?: string;
}
export const CapacityProviderConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ capacityProviderArn: S.optional(S.String) }),
).annotate({
  identifier: "CapacityProviderConfiguration",
}) as any as S.Schema<CapacityProviderConfiguration>;
export interface CreateAgentRuntimeRequest {
  agentRuntimeName: string;
  agentRuntimeArtifact: AgentRuntimeArtifact;
  roleArn: string;
  networkConfiguration?: NetworkConfiguration;
  clientToken?: string;
  description?: string | redacted.Redacted<string>;
  authorizerConfiguration?: AuthorizerConfiguration;
  requestHeaderConfiguration?: RequestHeaderConfiguration;
  protocolConfiguration?: ProtocolConfiguration;
  lifecycleConfiguration?: LifecycleConfiguration;
  environmentVariables?: { [key: string]: string | undefined };
  filesystemConfigurations?: FilesystemConfiguration[];
  capacityProviderConfiguration?: CapacityProviderConfiguration;
  tags?: { [key: string]: string | undefined };
}
export const CreateAgentRuntimeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentRuntimeName: S.String,
    agentRuntimeArtifact: AgentRuntimeArtifact,
    roleArn: S.String,
    networkConfiguration: S.optional(NetworkConfiguration),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    description: S.optional(SensitiveString),
    authorizerConfiguration: S.optional(AuthorizerConfiguration),
    requestHeaderConfiguration: S.optional(RequestHeaderConfiguration),
    protocolConfiguration: S.optional(ProtocolConfiguration),
    lifecycleConfiguration: S.optional(LifecycleConfiguration),
    environmentVariables: S.optional(EnvironmentVariablesMap),
    filesystemConfigurations: S.optional(FilesystemConfigurations),
    capacityProviderConfiguration: S.optional(CapacityProviderConfiguration),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/runtimes/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAgentRuntimeRequest",
}) as any as S.Schema<CreateAgentRuntimeRequest>;
export type AgentRuntimeArn = string;
export type WorkloadIdentityArn = string;
export interface WorkloadIdentityDetails {
  workloadIdentityArn?: string;
}
export const WorkloadIdentityDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workloadIdentityArn: S.optional(S.String) }),
).annotate({
  identifier: "WorkloadIdentityDetails",
}) as any as S.Schema<WorkloadIdentityDetails>;
export type AgentRuntimeId = string;
export type AgentRuntimeVersion = string;
export type AgentRuntimeStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "READY"
  | "DELETING"
  | (string & {});
export const AgentRuntimeStatus = S.String;

export interface CreateAgentRuntimeResponse {
  agentRuntimeArn: string;
  workloadIdentityDetails?: WorkloadIdentityDetails;
  agentRuntimeId: string;
  agentRuntimeVersion: string;
  createdAt: Date;
  status: AgentRuntimeStatus;
}
export const CreateAgentRuntimeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentRuntimeArn: S.String,
    workloadIdentityDetails: S.optional(WorkloadIdentityDetails),
    agentRuntimeId: S.String,
    agentRuntimeVersion: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: AgentRuntimeStatus,
  }),
).annotate({
  identifier: "CreateAgentRuntimeResponse",
}) as any as S.Schema<CreateAgentRuntimeResponse>;
export type EndpointName = string | redacted.Redacted<string>;
export type AgentEndpointDescription = string;
export interface CreateAgentRuntimeEndpointRequest {
  agentRuntimeId: string;
  name: string | redacted.Redacted<string>;
  agentRuntimeVersion?: string;
  description?: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateAgentRuntimeEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentRuntimeId: S.String.pipe(T.HttpLabel("agentRuntimeId")),
    name: SensitiveString,
    agentRuntimeVersion: S.optional(S.String),
    description: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/runtimes/{agentRuntimeId}/runtime-endpoints/",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAgentRuntimeEndpointRequest",
}) as any as S.Schema<CreateAgentRuntimeEndpointRequest>;
export type AgentRuntimeEndpointArn = string;
export type AgentRuntimeEndpointStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "READY"
  | "DELETING"
  | (string & {});
export const AgentRuntimeEndpointStatus = S.String;

export interface CreateAgentRuntimeEndpointResponse {
  targetVersion: string;
  agentRuntimeEndpointArn: string;
  agentRuntimeArn: string;
  agentRuntimeId?: string;
  endpointName?: string | redacted.Redacted<string>;
  status: AgentRuntimeEndpointStatus;
  createdAt: Date;
}
export const CreateAgentRuntimeEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetVersion: S.String,
    agentRuntimeEndpointArn: S.String,
    agentRuntimeArn: S.String,
    agentRuntimeId: S.optional(S.String),
    endpointName: S.optional(SensitiveString),
    status: AgentRuntimeEndpointStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreateAgentRuntimeEndpointResponse",
}) as any as S.Schema<CreateAgentRuntimeEndpointResponse>;
export type CredentialProviderName = string;
export type DefaultApiKeyType = string | redacted.Redacted<string>;
export type SecretIdType = string;
export type SecretJsonKeyType = string;
export interface SecretReference {
  secretId: string;
  jsonKey: string;
}
export const SecretReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ secretId: S.String, jsonKey: S.String }),
).annotate({
  identifier: "SecretReference",
}) as any as S.Schema<SecretReference>;
export type SecretSourceType = "MANAGED" | "EXTERNAL" | (string & {});
export const SecretSourceType = S.String;

export interface CreateApiKeyCredentialProviderRequest {
  name: string;
  apiKey?: string | redacted.Redacted<string>;
  apiKeySecretConfig?: SecretReference;
  apiKeySecretSource?: SecretSourceType;
  tags?: { [key: string]: string | undefined };
}
export const CreateApiKeyCredentialProviderRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      name: S.String,
      apiKey: S.optional(SensitiveString),
      apiKeySecretConfig: S.optional(SecretReference),
      apiKeySecretSource: S.optional(SecretSourceType),
      tags: S.optional(TagsMap),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/identities/CreateApiKeyCredentialProvider",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateApiKeyCredentialProviderRequest",
}) as any as S.Schema<CreateApiKeyCredentialProviderRequest>;
export type SecretArn = string;
export interface Secret {
  secretArn: string;
}
export const Secret = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ secretArn: S.String }),
).annotate({ identifier: "Secret" }) as any as S.Schema<Secret>;
export type ApiKeyCredentialProviderArnType = string;
export interface CreateApiKeyCredentialProviderResponse {
  apiKeySecretArn: Secret;
  apiKeySecretJsonKey?: string;
  apiKeySecretSource?: SecretSourceType;
  name: string;
  credentialProviderArn: string;
}
export const CreateApiKeyCredentialProviderResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      apiKeySecretArn: Secret,
      apiKeySecretJsonKey: S.optional(S.String),
      apiKeySecretSource: S.optional(SecretSourceType),
      name: S.String,
      credentialProviderArn: S.String,
    }),
).annotate({
  identifier: "CreateApiKeyCredentialProviderResponse",
}) as any as S.Schema<CreateApiKeyCredentialProviderResponse>;
export type SandboxName = string;
export type BrowserNetworkMode = "PUBLIC" | "VPC" | (string & {});
export const BrowserNetworkMode = S.String;

export interface BrowserNetworkConfiguration {
  networkMode: BrowserNetworkMode;
  vpcConfig?: VpcConfig;
}
export const BrowserNetworkConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkMode: BrowserNetworkMode,
    vpcConfig: S.optional(VpcConfig),
  }),
).annotate({
  identifier: "BrowserNetworkConfiguration",
}) as any as S.Schema<BrowserNetworkConfiguration>;
export interface RecordingConfig {
  enabled?: boolean;
  s3Location?: S3Location;
}
export const RecordingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.optional(S.Boolean),
    s3Location: S.optional(S3Location),
  }),
).annotate({
  identifier: "RecordingConfig",
}) as any as S.Schema<RecordingConfig>;
export interface BrowserSigningConfigInput {
  enabled: boolean;
}
export const BrowserSigningConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enabled: S.Boolean }),
).annotate({
  identifier: "BrowserSigningConfigInput",
}) as any as S.Schema<BrowserSigningConfigInput>;
export type ResourceLocation = { s3: S3Location };
export const ResourceLocation = /*@__PURE__*/ S.Union([
  S.Struct({ s3: S3Location }),
]);
export type BrowserEnterprisePolicyType =
  | "MANAGED"
  | "RECOMMENDED"
  | (string & {});
export const BrowserEnterprisePolicyType = S.String;

export interface BrowserEnterprisePolicy {
  location: ResourceLocation;
  type?: BrowserEnterprisePolicyType;
}
export const BrowserEnterprisePolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    location: ResourceLocation,
    type: S.optional(BrowserEnterprisePolicyType),
  }),
).annotate({
  identifier: "BrowserEnterprisePolicy",
}) as any as S.Schema<BrowserEnterprisePolicy>;
export type BrowserEnterprisePolicies = BrowserEnterprisePolicy[];
export const BrowserEnterprisePolicies = /*@__PURE__*/ S.Array(
  BrowserEnterprisePolicy,
);
export type ToolSecretArn = string;
export interface SecretsManagerLocation {
  secretArn: string;
}
export const SecretsManagerLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ secretArn: S.String }),
).annotate({
  identifier: "SecretsManagerLocation",
}) as any as S.Schema<SecretsManagerLocation>;
export type CertificateLocation = { secretsManager: SecretsManagerLocation };
export const CertificateLocation = /*@__PURE__*/ S.Union([
  S.Struct({ secretsManager: SecretsManagerLocation }),
]);
export interface Certificate {
  location: CertificateLocation;
}
export const Certificate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ location: CertificateLocation }),
).annotate({ identifier: "Certificate" }) as any as S.Schema<Certificate>;
export type Certificates = Certificate[];
export const Certificates = /*@__PURE__*/ S.Array(Certificate);
export type S3FilesFileSystemArn = string;
export interface S3FilesConfiguration {
  accessPointArn: string;
  mountPath: string;
  fileSystemArn: string;
}
export const S3FilesConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessPointArn: S.String,
    mountPath: S.String,
    fileSystemArn: S.String,
  }),
).annotate({
  identifier: "S3FilesConfiguration",
}) as any as S.Schema<S3FilesConfiguration>;
export type EfsFileSystemArn = string;
export interface EfsConfiguration {
  accessPointArn: string;
  mountPath: string;
  fileSystemArn: string;
}
export const EfsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessPointArn: S.String,
    mountPath: S.String,
    fileSystemArn: S.String,
  }),
).annotate({
  identifier: "EfsConfiguration",
}) as any as S.Schema<EfsConfiguration>;
export type ToolsFileSystemConfiguration =
  | { s3FilesConfiguration: S3FilesConfiguration; efsConfiguration?: never }
  | { s3FilesConfiguration?: never; efsConfiguration: EfsConfiguration };
export const ToolsFileSystemConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ s3FilesConfiguration: S3FilesConfiguration }),
  S.Struct({ efsConfiguration: EfsConfiguration }),
]);
export type ToolsFileSystemConfigurations = ToolsFileSystemConfiguration[];
export const ToolsFileSystemConfigurations = /*@__PURE__*/ S.Array(
  ToolsFileSystemConfiguration,
);
export interface CreateBrowserRequest {
  name: string;
  description?: string | redacted.Redacted<string>;
  executionRoleArn?: string;
  networkConfiguration: BrowserNetworkConfiguration;
  recording?: RecordingConfig;
  browserSigning?: BrowserSigningConfigInput;
  enterprisePolicies?: BrowserEnterprisePolicy[];
  certificates?: Certificate[];
  filesystemConfigurations?: ToolsFileSystemConfiguration[];
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateBrowserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(SensitiveString),
    executionRoleArn: S.optional(S.String),
    networkConfiguration: BrowserNetworkConfiguration,
    recording: S.optional(RecordingConfig),
    browserSigning: S.optional(BrowserSigningConfigInput),
    enterprisePolicies: S.optional(BrowserEnterprisePolicies),
    certificates: S.optional(Certificates),
    filesystemConfigurations: S.optional(ToolsFileSystemConfigurations),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/browsers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateBrowserRequest",
}) as any as S.Schema<CreateBrowserRequest>;
export type BrowserId = string;
export type BrowserArn = string;
export type BrowserStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "READY"
  | "DELETING"
  | "DELETE_FAILED"
  | "DELETED"
  | (string & {});
export const BrowserStatus = S.String;

export interface CreateBrowserResponse {
  browserId: string;
  browserArn: string;
  createdAt: Date;
  status: BrowserStatus;
}
export const CreateBrowserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    browserId: S.String,
    browserArn: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: BrowserStatus,
  }),
).annotate({
  identifier: "CreateBrowserResponse",
}) as any as S.Schema<CreateBrowserResponse>;
export type BrowserProfileName = string;
export interface CreateBrowserProfileRequest {
  name: string;
  description?: string | redacted.Redacted<string>;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateBrowserProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(SensitiveString),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/browser-profiles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateBrowserProfileRequest",
}) as any as S.Schema<CreateBrowserProfileRequest>;
export type BrowserProfileId = string;
export type BrowserProfileArn = string;
export type BrowserProfileStatus =
  | "READY"
  | "DELETING"
  | "DELETED"
  | "SAVING"
  | (string & {});
export const BrowserProfileStatus = S.String;

export interface CreateBrowserProfileResponse {
  profileId: string;
  profileArn: string;
  createdAt: Date;
  status: BrowserProfileStatus;
}
export const CreateBrowserProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileId: S.String,
    profileArn: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: BrowserProfileStatus,
  }),
).annotate({
  identifier: "CreateBrowserProfileResponse",
}) as any as S.Schema<CreateBrowserProfileResponse>;
export type CapacityProviderName = string;
export interface PermissionsConfiguration {
  capacityProviderOperatorRoleArn: string;
}
export const PermissionsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ capacityProviderOperatorRoleArn: S.String }),
).annotate({
  identifier: "PermissionsConfiguration",
}) as any as S.Schema<PermissionsConfiguration>;
export type OperatingSystem = "LINUX_X86_64" | "LINUX_ARM64" | (string & {});
export const OperatingSystem = S.String;

export type EC2InstanceType = string;
export type InstanceTypeList = string[];
export const InstanceTypeList = /*@__PURE__*/ S.Array(S.String);
export interface InstanceRequirements {
  allowedInstanceTypes: string[];
}
export const InstanceRequirements = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ allowedInstanceTypes: InstanceTypeList }),
).annotate({
  identifier: "InstanceRequirements",
}) as any as S.Schema<InstanceRequirements>;
export type DeviceName = string;
export type VirtualDeviceName = string;
export type EbsVolumeType =
  | "standard"
  | "io1"
  | "io2"
  | "gp2"
  | "sc1"
  | "st1"
  | "gp3"
  | (string & {});
export const EbsVolumeType = S.String;

export type VolumeIops = number;
export type VolumeThroughput = number;
export type KmsKeyId = string;
export type EbsSnapshotId = string;
export type VolumeSizeGiB = number;
export type EbsVolumeInitializationRate = number;
export type EbsCardIndex = number;
export interface EphemeralEBSVolumeConfiguration {
  volumeType?: EbsVolumeType;
  iops?: number;
  throughput?: number;
  encrypted?: boolean;
  kmsKeyId?: string;
  snapshotId?: string;
  volumeSize?: number;
  volumeInitializationRate?: number;
  ebsCardIndex?: number;
}
export const EphemeralEBSVolumeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    volumeType: S.optional(EbsVolumeType),
    iops: S.optional(S.Number),
    throughput: S.optional(S.Number),
    encrypted: S.optional(S.Boolean),
    kmsKeyId: S.optional(S.String),
    snapshotId: S.optional(S.String),
    volumeSize: S.optional(S.Number),
    volumeInitializationRate: S.optional(S.Number),
    ebsCardIndex: S.optional(S.Number),
  }),
).annotate({
  identifier: "EphemeralEBSVolumeConfiguration",
}) as any as S.Schema<EphemeralEBSVolumeConfiguration>;
export interface EphemeralBlockDeviceMapping {
  deviceName?: string;
  virtualName?: string;
  ebs?: EphemeralEBSVolumeConfiguration;
}
export const EphemeralBlockDeviceMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deviceName: S.optional(S.String),
    virtualName: S.optional(S.String),
    ebs: S.optional(EphemeralEBSVolumeConfiguration),
  }),
).annotate({
  identifier: "EphemeralBlockDeviceMapping",
}) as any as S.Schema<EphemeralBlockDeviceMapping>;
export type EphemeralBlockDeviceMappingList = EphemeralBlockDeviceMapping[];
export const EphemeralBlockDeviceMappingList = /*@__PURE__*/ S.Array(
  EphemeralBlockDeviceMapping,
);
export type Monitoring = "BASIC" | "DETAILED" | (string & {});
export const Monitoring = S.String;

export type LicenseConfigurationArn = string;
export interface LicenseSpecification {
  licenseConfigurationArn: string;
}
export const LicenseSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ licenseConfigurationArn: S.String }),
).annotate({
  identifier: "LicenseSpecification",
}) as any as S.Schema<LicenseSpecification>;
export type LicenseSpecificationList = LicenseSpecification[];
export const LicenseSpecificationList =
  /*@__PURE__*/ S.Array(LicenseSpecification);
export type CapacityReservationPreference =
  | "capacity-reservations-only"
  | "open"
  | "none"
  | (string & {});
export const CapacityReservationPreference = S.String;

export type CapacityReservationId = string;
export type CapacityReservationResourceGroupArn = string;
export interface CapacityReservationTarget {
  capacityReservationId?: string;
  capacityReservationResourceGroupArn?: string;
}
export const CapacityReservationTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacityReservationId: S.optional(S.String),
    capacityReservationResourceGroupArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CapacityReservationTarget",
}) as any as S.Schema<CapacityReservationTarget>;
export interface CapacityReservationSpecification {
  capacityReservationPreference?: CapacityReservationPreference;
  capacityReservationTarget?: CapacityReservationTarget;
}
export const CapacityReservationSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacityReservationPreference: S.optional(CapacityReservationPreference),
    capacityReservationTarget: S.optional(CapacityReservationTarget),
  }),
).annotate({
  identifier: "CapacityReservationSpecification",
}) as any as S.Schema<CapacityReservationSpecification>;
export type SSHKeyName = string;
export type InstanceProfileArn = string;
export interface LaunchParameters {
  operatingSystem: OperatingSystem;
  instanceRequirements: InstanceRequirements;
  ephemeralVolumes?: EphemeralBlockDeviceMapping[];
  monitoring?: Monitoring;
  licenseSpecifications?: LicenseSpecification[];
  capacityReservationSpecification?: CapacityReservationSpecification;
  sshKeyName?: string;
  instanceProfileArn?: string;
  propagatedTags?: { [key: string]: string | undefined };
}
export const LaunchParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    operatingSystem: OperatingSystem,
    instanceRequirements: InstanceRequirements,
    ephemeralVolumes: S.optional(EphemeralBlockDeviceMappingList),
    monitoring: S.optional(Monitoring),
    licenseSpecifications: S.optional(LicenseSpecificationList),
    capacityReservationSpecification: S.optional(
      CapacityReservationSpecification,
    ),
    sshKeyName: S.optional(S.String),
    instanceProfileArn: S.optional(S.String),
    propagatedTags: S.optional(TagsMap),
  }),
).annotate({
  identifier: "LaunchParameters",
}) as any as S.Schema<LaunchParameters>;
export type LaunchTemplateSource = { launchParameters: LaunchParameters };
export const LaunchTemplateSource = /*@__PURE__*/ S.Union([
  S.Struct({ launchParameters: LaunchParameters }),
]);
export type SubnetIdList = string[];
export const SubnetIdList = /*@__PURE__*/ S.Array(S.String);
export type SecurityGroupIdList = string[];
export const SecurityGroupIdList = /*@__PURE__*/ S.Array(S.String);
export interface VpcConfiguration {
  subnets: string[];
  securityGroups: string[];
}
export const VpcConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ subnets: SubnetIdList, securityGroups: SecurityGroupIdList }),
).annotate({
  identifier: "VpcConfiguration",
}) as any as S.Schema<VpcConfiguration>;
export type VolumeName = string;
export interface EbsVolumeConfiguration {
  name: string;
  sizeGiB: number;
  volumeType?: EbsVolumeType;
  iops?: number;
  throughput?: number;
  encrypted?: boolean;
  kmsKeyId?: string;
  snapshotId?: string;
}
export const EbsVolumeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    sizeGiB: S.Number,
    volumeType: S.optional(EbsVolumeType),
    iops: S.optional(S.Number),
    throughput: S.optional(S.Number),
    encrypted: S.optional(S.Boolean),
    kmsKeyId: S.optional(S.String),
    snapshotId: S.optional(S.String),
  }),
).annotate({
  identifier: "EbsVolumeConfiguration",
}) as any as S.Schema<EbsVolumeConfiguration>;
export type VolumeConfiguration = { ebsConfiguration: EbsVolumeConfiguration };
export const VolumeConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ ebsConfiguration: EbsVolumeConfiguration }),
]);
export type VolumeConfigurationList = VolumeConfiguration[];
export const VolumeConfigurationList =
  /*@__PURE__*/ S.Array(VolumeConfiguration);
export interface InstanceLifecycleConfiguration {
  idleInstanceTimeout?: number;
  maxLifetime?: number;
}
export const InstanceLifecycleConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    idleInstanceTimeout: S.optional(S.Number),
    maxLifetime: S.optional(S.Number),
  }),
).annotate({
  identifier: "InstanceLifecycleConfiguration",
}) as any as S.Schema<InstanceLifecycleConfiguration>;
export interface RootVolumeConfiguration {
  volumeType?: EbsVolumeType;
  iops?: number;
  throughput?: number;
  encrypted?: boolean;
  kmsKeyId?: string;
  freeSpaceGiB?: number;
}
export const RootVolumeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    volumeType: S.optional(EbsVolumeType),
    iops: S.optional(S.Number),
    throughput: S.optional(S.Number),
    encrypted: S.optional(S.Boolean),
    kmsKeyId: S.optional(S.String),
    freeSpaceGiB: S.optional(S.Number),
  }),
).annotate({
  identifier: "RootVolumeConfiguration",
}) as any as S.Schema<RootVolumeConfiguration>;
export interface Ec2Configuration {
  launchTemplateSource: LaunchTemplateSource;
  vpcConfiguration: VpcConfiguration;
  volumes?: VolumeConfiguration[];
  lifecycleConfiguration?: InstanceLifecycleConfiguration;
  rootVolume?: RootVolumeConfiguration;
}
export const Ec2Configuration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    launchTemplateSource: LaunchTemplateSource,
    vpcConfiguration: VpcConfiguration,
    volumes: S.optional(VolumeConfigurationList),
    lifecycleConfiguration: S.optional(InstanceLifecycleConfiguration),
    rootVolume: S.optional(RootVolumeConfiguration),
  }),
).annotate({
  identifier: "Ec2Configuration",
}) as any as S.Schema<Ec2Configuration>;
export type ComputeConfiguration = { ec2Configuration: Ec2Configuration };
export const ComputeConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ ec2Configuration: Ec2Configuration }),
]);
export interface CreateCapacityProviderInput {
  name: string;
  description?: string | redacted.Redacted<string>;
  permissionsConfiguration: PermissionsConfiguration;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
  computeConfiguration: ComputeConfiguration;
}
export const CreateCapacityProviderInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(SensitiveString),
    permissionsConfiguration: PermissionsConfiguration,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagsMap),
    computeConfiguration: ComputeConfiguration,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/capacity-providers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCapacityProviderInput",
}) as any as S.Schema<CreateCapacityProviderInput>;
export type CapacityProviderId = string;
export type CapacityProviderStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "READY"
  | "DELETING"
  | "DELETE_FAILED"
  | (string & {});
export const CapacityProviderStatus = S.String;

export interface CreateCapacityProviderOutput {
  capacityProviderId: string;
  capacityProviderArn: string;
  name: string;
  status: CapacityProviderStatus;
}
export const CreateCapacityProviderOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacityProviderId: S.String,
    capacityProviderArn: S.String,
    name: S.String,
    status: CapacityProviderStatus,
  }),
).annotate({
  identifier: "CreateCapacityProviderOutput",
}) as any as S.Schema<CreateCapacityProviderOutput>;
export type CodeInterpreterNetworkMode =
  | "PUBLIC"
  | "SANDBOX"
  | "VPC"
  | (string & {});
export const CodeInterpreterNetworkMode = S.String;

export interface CodeInterpreterNetworkConfiguration {
  networkMode: CodeInterpreterNetworkMode;
  vpcConfig?: VpcConfig;
}
export const CodeInterpreterNetworkConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkMode: CodeInterpreterNetworkMode,
    vpcConfig: S.optional(VpcConfig),
  }),
).annotate({
  identifier: "CodeInterpreterNetworkConfiguration",
}) as any as S.Schema<CodeInterpreterNetworkConfiguration>;
export interface CreateCodeInterpreterRequest {
  name: string;
  description?: string | redacted.Redacted<string>;
  executionRoleArn?: string;
  networkConfiguration: CodeInterpreterNetworkConfiguration;
  certificates?: Certificate[];
  filesystemConfigurations?: ToolsFileSystemConfiguration[];
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateCodeInterpreterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(SensitiveString),
    executionRoleArn: S.optional(S.String),
    networkConfiguration: CodeInterpreterNetworkConfiguration,
    certificates: S.optional(Certificates),
    filesystemConfigurations: S.optional(ToolsFileSystemConfigurations),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/code-interpreters" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCodeInterpreterRequest",
}) as any as S.Schema<CreateCodeInterpreterRequest>;
export type CodeInterpreterId = string;
export type CodeInterpreterArn = string;
export type CodeInterpreterStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "READY"
  | "DELETING"
  | "DELETE_FAILED"
  | "DELETED"
  | (string & {});
export const CodeInterpreterStatus = S.String;

export interface CreateCodeInterpreterResponse {
  codeInterpreterId: string;
  codeInterpreterArn: string;
  createdAt: Date;
  status: CodeInterpreterStatus;
}
export const CreateCodeInterpreterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeInterpreterId: S.String,
    codeInterpreterArn: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: CodeInterpreterStatus,
  }),
).annotate({
  identifier: "CreateCodeInterpreterResponse",
}) as any as S.Schema<CreateCodeInterpreterResponse>;
export type ConfigurationBundleName = string;
export type ConfigurationBundleDescription = string | redacted.Redacted<string>;
export type ComponentIdentifier = string;
export interface ComponentConfiguration {
  configuration: any;
}
export const ComponentConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ configuration: S.Any }),
).annotate({
  identifier: "ComponentConfiguration",
}) as any as S.Schema<ComponentConfiguration>;
export type ComponentConfigurationMap = {
  [key: string]: ComponentConfiguration | undefined;
};
export const ComponentConfigurationMap = /*@__PURE__*/ S.Record(
  S.String,
  ComponentConfiguration.pipe(S.optional),
);
export type BranchName = string;
export interface VersionCreatedBySource {
  name: string;
  arn?: string;
}
export const VersionCreatedBySource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, arn: S.optional(S.String) }),
).annotate({
  identifier: "VersionCreatedBySource",
}) as any as S.Schema<VersionCreatedBySource>;
export type KmsKeyArn = string;
export interface CreateConfigurationBundleRequest {
  clientToken?: string;
  bundleName: string;
  description?: string | redacted.Redacted<string>;
  components: { [key: string]: ComponentConfiguration | undefined };
  branchName?: string;
  commitMessage?: string;
  createdBy?: VersionCreatedBySource;
  kmsKeyArn?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateConfigurationBundleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    bundleName: S.String,
    description: S.optional(SensitiveString),
    components: ComponentConfigurationMap,
    branchName: S.optional(S.String),
    commitMessage: S.optional(S.String),
    createdBy: S.optional(VersionCreatedBySource),
    kmsKeyArn: S.optional(S.String),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/configuration-bundles/create" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateConfigurationBundleRequest",
}) as any as S.Schema<CreateConfigurationBundleRequest>;
export type ConfigurationBundleArn = string;
export type ConfigurationBundleId = string;
export type ConfigurationBundleVersion = string;
export interface CreateConfigurationBundleResponse {
  bundleArn: string;
  bundleId: string;
  versionId: string;
  createdAt: Date;
}
export const CreateConfigurationBundleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bundleArn: S.String,
    bundleId: S.String,
    versionId: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "CreateConfigurationBundleResponse",
}) as any as S.Schema<CreateConfigurationBundleResponse>;
export type DatasetName = string;
export type DatasetSchemaType =
  | "AGENTCORE_EVALUATION_PREDEFINED_V1"
  | "AGENTCORE_EVALUATION_SIMULATED_V1"
  | "THIRD_PARTY_EVALUATION_V1"
  | (string & {});
export const DatasetSchemaType = S.String;

export interface CreateDatasetRequest {
  clientToken?: string;
  datasetName: string;
  description?: string;
  source: DataSourceType;
  schemaType: DatasetSchemaType;
  kmsKeyArn?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    datasetName: S.String,
    description: S.optional(S.String),
    source: DataSourceType,
    schemaType: DatasetSchemaType,
    kmsKeyArn: S.optional(S.String),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/datasets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDatasetRequest",
}) as any as S.Schema<CreateDatasetRequest>;
export interface CreateDatasetResponse {
  datasetArn: string;
  datasetId: string;
  status: DatasetStatus;
  createdAt: Date;
}
export const CreateDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetArn: S.String,
    datasetId: S.String,
    status: DatasetStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "CreateDatasetResponse",
}) as any as S.Schema<CreateDatasetResponse>;
export interface CreateDatasetVersionRequest {
  datasetId: string;
  clientToken?: string;
}
export const CreateDatasetVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetId: S.String.pipe(T.HttpLabel("datasetId")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/datasets/{datasetId}/versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDatasetVersionRequest",
}) as any as S.Schema<CreateDatasetVersionRequest>;
export type DatasetVersion = string;
export interface CreateDatasetVersionResponse {
  datasetArn: string;
  datasetId: string;
  status: DatasetStatus;
  datasetVersion: string;
  createdAt: Date;
}
export const CreateDatasetVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetArn: S.String,
    datasetId: S.String,
    status: DatasetStatus,
    datasetVersion: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "CreateDatasetVersionResponse",
}) as any as S.Schema<CreateDatasetVersionResponse>;
export type CustomEvaluatorName = string;
export type EvaluatorDescription = string | redacted.Redacted<string>;
export type EvaluatorInstructions = string | redacted.Redacted<string>;
export interface NumericalScaleDefinition {
  definition: string;
  value: number;
  label: string;
}
export const NumericalScaleDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ definition: S.String, value: S.Number, label: S.String }),
).annotate({
  identifier: "NumericalScaleDefinition",
}) as any as S.Schema<NumericalScaleDefinition>;
export type NumericalScaleDefinitions = NumericalScaleDefinition[];
export const NumericalScaleDefinitions = /*@__PURE__*/ S.Array(
  NumericalScaleDefinition,
);
export interface CategoricalScaleDefinition {
  definition: string;
  label: string;
}
export const CategoricalScaleDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ definition: S.String, label: S.String }),
).annotate({
  identifier: "CategoricalScaleDefinition",
}) as any as S.Schema<CategoricalScaleDefinition>;
export type CategoricalScaleDefinitions = CategoricalScaleDefinition[];
export const CategoricalScaleDefinitions = /*@__PURE__*/ S.Array(
  CategoricalScaleDefinition,
);
export type RatingScale =
  | { numerical: NumericalScaleDefinition[]; categorical?: never }
  | { numerical?: never; categorical: CategoricalScaleDefinition[] };
export const RatingScale = /*@__PURE__*/ S.Union([
  S.Struct({ numerical: NumericalScaleDefinitions }),
  S.Struct({ categorical: CategoricalScaleDefinitions }),
]);
export type ModelId = string;
export type NonEmptyString = string;
export type NonEmptyStringList = string[];
export const NonEmptyStringList = /*@__PURE__*/ S.Array(S.String);
export interface InferenceConfiguration {
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  stopSequences?: string[];
}
export const InferenceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxTokens: S.optional(S.Number),
    temperature: S.optional(S.Number),
    topP: S.optional(S.Number),
    stopSequences: S.optional(NonEmptyStringList),
  }),
).annotate({
  identifier: "InferenceConfiguration",
}) as any as S.Schema<InferenceConfiguration>;
export type AdditionalModelRequestFields = unknown;
export interface BedrockEvaluatorModelConfig {
  modelId: string;
  inferenceConfig?: InferenceConfiguration;
  additionalModelRequestFields?: any;
}
export const BedrockEvaluatorModelConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.String,
    inferenceConfig: S.optional(InferenceConfiguration),
    additionalModelRequestFields: S.optional(S.Any),
  }),
).annotate({
  identifier: "BedrockEvaluatorModelConfig",
}) as any as S.Schema<BedrockEvaluatorModelConfig>;
export interface ReasoningConfiguration {
  effort?: string;
}
export const ReasoningConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ effort: S.optional(S.String) }),
).annotate({
  identifier: "ReasoningConfiguration",
}) as any as S.Schema<ReasoningConfiguration>;
export interface OpenResponsesEvaluatorModelConfig {
  modelId: string;
  maxOutputTokens?: number;
  temperature?: number;
  topP?: number;
  reasoning?: ReasoningConfiguration;
}
export const OpenResponsesEvaluatorModelConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.String,
    maxOutputTokens: S.optional(S.Number),
    temperature: S.optional(S.Number),
    topP: S.optional(S.Number),
    reasoning: S.optional(ReasoningConfiguration),
  }),
).annotate({
  identifier: "OpenResponsesEvaluatorModelConfig",
}) as any as S.Schema<OpenResponsesEvaluatorModelConfig>;
export type EvaluatorModelConfig =
  | {
      bedrockEvaluatorModelConfig: BedrockEvaluatorModelConfig;
      responsesEvaluatorModelConfig?: never;
    }
  | {
      bedrockEvaluatorModelConfig?: never;
      responsesEvaluatorModelConfig: OpenResponsesEvaluatorModelConfig;
    };
export const EvaluatorModelConfig = /*@__PURE__*/ S.Union([
  S.Struct({ bedrockEvaluatorModelConfig: BedrockEvaluatorModelConfig }),
  S.Struct({
    responsesEvaluatorModelConfig: OpenResponsesEvaluatorModelConfig,
  }),
]);
export interface LlmAsAJudgeEvaluatorConfig {
  instructions: string | redacted.Redacted<string>;
  ratingScale: RatingScale;
  modelConfig: EvaluatorModelConfig;
}
export const LlmAsAJudgeEvaluatorConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instructions: SensitiveString,
    ratingScale: RatingScale,
    modelConfig: EvaluatorModelConfig,
  }),
).annotate({
  identifier: "LlmAsAJudgeEvaluatorConfig",
}) as any as S.Schema<LlmAsAJudgeEvaluatorConfig>;
export type LambdaArn = string;
export interface LambdaEvaluatorConfig {
  lambdaArn: string;
  lambdaTimeoutInSeconds?: number;
}
export const LambdaEvaluatorConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    lambdaArn: S.String,
    lambdaTimeoutInSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "LambdaEvaluatorConfig",
}) as any as S.Schema<LambdaEvaluatorConfig>;
export type CodeBasedEvaluatorConfig = { lambdaConfig: LambdaEvaluatorConfig };
export const CodeBasedEvaluatorConfig = /*@__PURE__*/ S.Union([
  S.Struct({ lambdaConfig: LambdaEvaluatorConfig }),
]);
export type EvaluatorId = string;
export interface DerivedEvaluatorConfig {
  baseEvaluatorId: string;
  modelConfig: EvaluatorModelConfig;
}
export const DerivedEvaluatorConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ baseEvaluatorId: S.String, modelConfig: EvaluatorModelConfig }),
).annotate({
  identifier: "DerivedEvaluatorConfig",
}) as any as S.Schema<DerivedEvaluatorConfig>;
export type EvaluatorConfig =
  | {
      llmAsAJudge: LlmAsAJudgeEvaluatorConfig;
      codeBased?: never;
      derived?: never;
    }
  | {
      llmAsAJudge?: never;
      codeBased: CodeBasedEvaluatorConfig;
      derived?: never;
    }
  | { llmAsAJudge?: never; codeBased?: never; derived: DerivedEvaluatorConfig };
export const EvaluatorConfig = /*@__PURE__*/ S.Union([
  S.Struct({ llmAsAJudge: LlmAsAJudgeEvaluatorConfig }),
  S.Struct({ codeBased: CodeBasedEvaluatorConfig }),
  S.Struct({ derived: DerivedEvaluatorConfig }),
]);
export type EvaluatorLevel = "TOOL_CALL" | "TRACE" | "SESSION" | (string & {});
export const EvaluatorLevel = S.String;

export interface CreateEvaluatorRequest {
  clientToken?: string;
  evaluatorName: string;
  description?: string | redacted.Redacted<string>;
  evaluatorConfig: EvaluatorConfig;
  level: EvaluatorLevel;
  kmsKeyArn?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateEvaluatorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    evaluatorName: S.String,
    description: S.optional(SensitiveString),
    evaluatorConfig: EvaluatorConfig,
    level: EvaluatorLevel,
    kmsKeyArn: S.optional(S.String),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/evaluators/create" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEvaluatorRequest",
}) as any as S.Schema<CreateEvaluatorRequest>;
export type CustomEvaluatorArn = string;
export type EvaluatorStatus =
  | "ACTIVE"
  | "CREATING"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "DELETING"
  | (string & {});
export const EvaluatorStatus = S.String;

export interface CreateEvaluatorResponse {
  evaluatorArn: string;
  evaluatorId: string;
  createdAt: Date;
  status: EvaluatorStatus;
}
export const CreateEvaluatorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    evaluatorArn: S.String,
    evaluatorId: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: EvaluatorStatus,
  }),
).annotate({
  identifier: "CreateEvaluatorResponse",
}) as any as S.Schema<CreateEvaluatorResponse>;
export type GatewayName = string;
export type GatewayDescription = string | redacted.Redacted<string>;
export type GatewayProtocolType = "MCP" | (string & {});
export const GatewayProtocolType = S.String;

export type McpVersion = string;
export type McpSupportedVersions = string[];
export const McpSupportedVersions = /*@__PURE__*/ S.Array(S.String);
export type McpInstructions = string | redacted.Redacted<string>;
export type SearchType = "SEMANTIC" | (string & {});
export const SearchType = S.String;

export interface SessionConfiguration {
  sessionTimeoutInSeconds?: number;
}
export const SessionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sessionTimeoutInSeconds: S.optional(S.Number) }),
).annotate({
  identifier: "SessionConfiguration",
}) as any as S.Schema<SessionConfiguration>;
export interface StreamingConfiguration {
  enableResponseStreaming?: boolean;
}
export const StreamingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enableResponseStreaming: S.optional(S.Boolean) }),
).annotate({
  identifier: "StreamingConfiguration",
}) as any as S.Schema<StreamingConfiguration>;
export interface MCPGatewayConfiguration {
  supportedVersions?: string[];
  instructions?: string | redacted.Redacted<string>;
  searchType?: SearchType;
  sessionConfiguration?: SessionConfiguration;
  streamingConfiguration?: StreamingConfiguration;
}
export const MCPGatewayConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    supportedVersions: S.optional(McpSupportedVersions),
    instructions: S.optional(SensitiveString),
    searchType: S.optional(SearchType),
    sessionConfiguration: S.optional(SessionConfiguration),
    streamingConfiguration: S.optional(StreamingConfiguration),
  }),
).annotate({
  identifier: "MCPGatewayConfiguration",
}) as any as S.Schema<MCPGatewayConfiguration>;
export type GatewayProtocolConfiguration = { mcp: MCPGatewayConfiguration };
export const GatewayProtocolConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ mcp: MCPGatewayConfiguration }),
]);
export type AuthorizerType =
  | "CUSTOM_JWT"
  | "AWS_IAM"
  | "NONE"
  | "AUTHENTICATE_ONLY"
  | (string & {});
export const AuthorizerType = S.String;

export type LambdaFunctionArn = string;
export interface LambdaInterceptorConfiguration {
  arn: string;
}
export const LambdaInterceptorConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }),
).annotate({
  identifier: "LambdaInterceptorConfiguration",
}) as any as S.Schema<LambdaInterceptorConfiguration>;
export type InterceptorConfiguration = {
  lambda: LambdaInterceptorConfiguration;
};
export const InterceptorConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ lambda: LambdaInterceptorConfiguration }),
]);
export type GatewayInterceptionPoint = "REQUEST" | "RESPONSE" | (string & {});
export const GatewayInterceptionPoint = S.String;

export type GatewayInterceptionPoints = GatewayInterceptionPoint[];
export const GatewayInterceptionPoints = /*@__PURE__*/ S.Array(
  GatewayInterceptionPoint,
);
export type InterceptorPayloadExclusion = "RESPONSE_BODY" | (string & {});
export const InterceptorPayloadExclusion = S.String;

export type InterceptorPayloadExclusionSelector = {
  field: InterceptorPayloadExclusion;
};
export const InterceptorPayloadExclusionSelector = /*@__PURE__*/ S.Union([
  S.Struct({ field: InterceptorPayloadExclusion }),
]);
export type InterceptorPayloadExclusionSelectorList =
  InterceptorPayloadExclusionSelector[];
export const InterceptorPayloadExclusionSelectorList = /*@__PURE__*/ S.Array(
  InterceptorPayloadExclusionSelector,
);
export interface InterceptorPayloadFilter {
  exclude: InterceptorPayloadExclusionSelector[];
}
export const InterceptorPayloadFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ exclude: InterceptorPayloadExclusionSelectorList }),
).annotate({
  identifier: "InterceptorPayloadFilter",
}) as any as S.Schema<InterceptorPayloadFilter>;
export interface InterceptorInputConfiguration {
  passRequestHeaders: boolean;
  payloadFilter?: InterceptorPayloadFilter;
}
export const InterceptorInputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    passRequestHeaders: S.Boolean,
    payloadFilter: S.optional(InterceptorPayloadFilter),
  }),
).annotate({
  identifier: "InterceptorInputConfiguration",
}) as any as S.Schema<InterceptorInputConfiguration>;
export interface GatewayInterceptorConfiguration {
  interceptor: InterceptorConfiguration;
  interceptionPoints: GatewayInterceptionPoint[];
  inputConfiguration?: InterceptorInputConfiguration;
}
export const GatewayInterceptorConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    interceptor: InterceptorConfiguration,
    interceptionPoints: GatewayInterceptionPoints,
    inputConfiguration: S.optional(InterceptorInputConfiguration),
  }),
).annotate({
  identifier: "GatewayInterceptorConfiguration",
}) as any as S.Schema<GatewayInterceptorConfiguration>;
export type GatewayInterceptorConfigurations =
  GatewayInterceptorConfiguration[];
export const GatewayInterceptorConfigurations = /*@__PURE__*/ S.Array(
  GatewayInterceptorConfiguration,
);
export type GatewayPolicyEngineArn = string;
export type GatewayPolicyEngineMode = "LOG_ONLY" | "ENFORCE" | (string & {});
export const GatewayPolicyEngineMode = S.String;

export interface GatewayPolicyEngineConfiguration {
  arn: string;
  mode: GatewayPolicyEngineMode;
}
export const GatewayPolicyEngineConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, mode: GatewayPolicyEngineMode }),
).annotate({
  identifier: "GatewayPolicyEngineConfiguration",
}) as any as S.Schema<GatewayPolicyEngineConfiguration>;
export type ExceptionLevel = "DEBUG" | (string & {});
export const ExceptionLevel = S.String;

export interface CreateGatewayRequest {
  name: string;
  description?: string | redacted.Redacted<string>;
  clientToken?: string;
  roleArn: string;
  protocolType?: GatewayProtocolType;
  protocolConfiguration?: GatewayProtocolConfiguration;
  authorizerType: AuthorizerType;
  authorizerConfiguration?: AuthorizerConfiguration;
  kmsKeyArn?: string;
  interceptorConfigurations?: GatewayInterceptorConfiguration[];
  policyEngineConfiguration?: GatewayPolicyEngineConfiguration;
  exceptionLevel?: ExceptionLevel;
  tags?: { [key: string]: string | undefined };
}
export const CreateGatewayRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(SensitiveString),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    roleArn: S.String,
    protocolType: S.optional(GatewayProtocolType),
    protocolConfiguration: S.optional(GatewayProtocolConfiguration),
    authorizerType: AuthorizerType,
    authorizerConfiguration: S.optional(AuthorizerConfiguration),
    kmsKeyArn: S.optional(S.String),
    interceptorConfigurations: S.optional(GatewayInterceptorConfigurations),
    policyEngineConfiguration: S.optional(GatewayPolicyEngineConfiguration),
    exceptionLevel: S.optional(ExceptionLevel),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/gateways/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGatewayRequest",
}) as any as S.Schema<CreateGatewayRequest>;
export type GatewayArn = string;
export type GatewayId = string;
export type GatewayUrl = string;
export type GatewayStatus =
  | "CREATING"
  | "UPDATING"
  | "UPDATE_UNSUCCESSFUL"
  | "DELETING"
  | "READY"
  | "FAILED"
  | (string & {});
export const GatewayStatus = S.String;

export type StatusReason = string;
export type StatusReasons = string[];
export const StatusReasons = /*@__PURE__*/ S.Array(S.String);
export interface LambdaTransformConfiguration {
  arn?: string;
}
export const LambdaTransformConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.optional(S.String) }),
).annotate({
  identifier: "LambdaTransformConfiguration",
}) as any as S.Schema<LambdaTransformConfiguration>;
export interface CustomTransformConfiguration {
  lambda?: LambdaTransformConfiguration;
}
export const CustomTransformConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ lambda: S.optional(LambdaTransformConfiguration) }),
).annotate({
  identifier: "CustomTransformConfiguration",
}) as any as S.Schema<CustomTransformConfiguration>;
export type WebAclArn = string;
export type WafFailureMode = "FAIL_CLOSE" | "FAIL_OPEN" | (string & {});
export const WafFailureMode = S.String;

export interface WafConfiguration {
  failureMode?: WafFailureMode;
}
export const WafConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ failureMode: S.optional(WafFailureMode) }),
).annotate({
  identifier: "WafConfiguration",
}) as any as S.Schema<WafConfiguration>;
export interface CreateGatewayResponse {
  gatewayArn: string;
  gatewayId: string;
  gatewayUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  status: GatewayStatus;
  statusReasons?: string[];
  name: string;
  description?: string | redacted.Redacted<string>;
  roleArn?: string;
  protocolType?: GatewayProtocolType;
  protocolConfiguration?: GatewayProtocolConfiguration;
  authorizerType: AuthorizerType;
  authorizerConfiguration?: AuthorizerConfiguration;
  kmsKeyArn?: string;
  customTransformConfiguration?: CustomTransformConfiguration;
  interceptorConfigurations?: GatewayInterceptorConfiguration[];
  policyEngineConfiguration?: GatewayPolicyEngineConfiguration;
  workloadIdentityDetails?: WorkloadIdentityDetails;
  exceptionLevel?: ExceptionLevel;
  webAclArn?: string;
  wafConfiguration?: WafConfiguration;
}
export const CreateGatewayResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayArn: S.String,
    gatewayId: S.String,
    gatewayUrl: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: GatewayStatus,
    statusReasons: S.optional(StatusReasons),
    name: S.String,
    description: S.optional(SensitiveString),
    roleArn: S.optional(S.String),
    protocolType: S.optional(GatewayProtocolType),
    protocolConfiguration: S.optional(GatewayProtocolConfiguration),
    authorizerType: AuthorizerType,
    authorizerConfiguration: S.optional(AuthorizerConfiguration),
    kmsKeyArn: S.optional(S.String),
    customTransformConfiguration: S.optional(CustomTransformConfiguration),
    interceptorConfigurations: S.optional(GatewayInterceptorConfigurations),
    policyEngineConfiguration: S.optional(GatewayPolicyEngineConfiguration),
    workloadIdentityDetails: S.optional(WorkloadIdentityDetails),
    exceptionLevel: S.optional(ExceptionLevel),
    webAclArn: S.optional(S.String),
    wafConfiguration: S.optional(WafConfiguration),
  }),
).annotate({
  identifier: "CreateGatewayResponse",
}) as any as S.Schema<CreateGatewayResponse>;
export interface CreateGatewayRateLimitRequest {
  gatewayIdentifier: string;
  clientToken?: string;
  rateLimitId?: string;
  description?: string;
  dimensionKeys: string[];
  entries: LimitEntry[];
}
export const CreateGatewayRateLimitRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayIdentifier: S.String.pipe(T.HttpLabel("gatewayIdentifier")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    rateLimitId: S.optional(S.String),
    description: S.optional(S.String),
    dimensionKeys: DimensionKeys,
    entries: LimitEntries,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/gateways/{gatewayIdentifier}/rate-limits",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGatewayRateLimitRequest",
}) as any as S.Schema<CreateGatewayRateLimitRequest>;
export interface CreateGatewayRateLimitResponse {
  rateLimitId: string;
  gatewayIdentifier: string;
  description?: string;
  dimensionKeys: string[];
  entries: LimitEntry[];
  status: GatewayRateLimitStatus;
  createdAt: Date;
  updatedAt: Date;
}
export const CreateGatewayRateLimitResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    rateLimitId: S.String,
    gatewayIdentifier: S.String,
    description: S.optional(S.String),
    dimensionKeys: DimensionKeys,
    entries: LimitEntries,
    status: GatewayRateLimitStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreateGatewayRateLimitResponse",
}) as any as S.Schema<CreateGatewayRateLimitResponse>;
export type GatewayRulePriority = number;
export type IamPrincipalArn = string;
export type PrincipalMatchOperator =
  | "StringEquals"
  | "StringLike"
  | (string & {});
export const PrincipalMatchOperator = S.String;

export interface IamPrincipal {
  arn: string;
  operator?: PrincipalMatchOperator;
}
export const IamPrincipal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, operator: S.optional(PrincipalMatchOperator) }),
).annotate({ identifier: "IamPrincipal" }) as any as S.Schema<IamPrincipal>;
export type MatchPrincipalEntry = { iamPrincipal: IamPrincipal };
export const MatchPrincipalEntry = /*@__PURE__*/ S.Union([
  S.Struct({ iamPrincipal: IamPrincipal }),
]);
export type MatchPrincipalEntries = MatchPrincipalEntry[];
export const MatchPrincipalEntries = /*@__PURE__*/ S.Array(MatchPrincipalEntry);
export interface MatchPrincipals {
  anyOf: MatchPrincipalEntry[];
}
export const MatchPrincipals = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ anyOf: MatchPrincipalEntries }),
).annotate({
  identifier: "MatchPrincipals",
}) as any as S.Schema<MatchPrincipals>;
export type MatchPathPattern = string;
export type MatchPathPatterns = string[];
export const MatchPathPatterns = /*@__PURE__*/ S.Array(S.String);
export interface MatchPaths {
  anyOf: string[];
}
export const MatchPaths = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ anyOf: MatchPathPatterns }),
).annotate({ identifier: "MatchPaths" }) as any as S.Schema<MatchPaths>;
export type Condition =
  | { matchPrincipals: MatchPrincipals; matchPaths?: never }
  | { matchPrincipals?: never; matchPaths: MatchPaths };
export const Condition = /*@__PURE__*/ S.Union([
  S.Struct({ matchPrincipals: MatchPrincipals }),
  S.Struct({ matchPaths: MatchPaths }),
]);
export type Conditions = Condition[];
export const Conditions = /*@__PURE__*/ S.Array(Condition);
export type GatewayConfigurationBundleArn = string;
export interface StaticOverride {
  bundleArn: string;
  bundleVersion: string;
}
export const StaticOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bundleArn: S.String, bundleVersion: S.String }),
).annotate({ identifier: "StaticOverride" }) as any as S.Schema<StaticOverride>;
export interface ConfigurationBundleReference {
  bundleArn: string;
  bundleVersion: string;
}
export const ConfigurationBundleReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bundleArn: S.String, bundleVersion: S.String }),
).annotate({
  identifier: "ConfigurationBundleReference",
}) as any as S.Schema<ConfigurationBundleReference>;
export type TrafficSplitMetadataKey = string;
export type TrafficSplitMetadataValue = string;
export type TrafficSplitMetadataMap = { [key: string]: string | undefined };
export const TrafficSplitMetadataMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface TrafficSplitEntry {
  name: string;
  weight: number;
  configurationBundle: ConfigurationBundleReference;
  description?: string;
  metadata?: { [key: string]: string | undefined };
}
export const TrafficSplitEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    weight: S.Number,
    configurationBundle: ConfigurationBundleReference,
    description: S.optional(S.String),
    metadata: S.optional(TrafficSplitMetadataMap),
  }),
).annotate({
  identifier: "TrafficSplitEntry",
}) as any as S.Schema<TrafficSplitEntry>;
export type TrafficSplitEntries = TrafficSplitEntry[];
export const TrafficSplitEntries = /*@__PURE__*/ S.Array(TrafficSplitEntry);
export interface WeightedOverride {
  trafficSplit: TrafficSplitEntry[];
}
export const WeightedOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ trafficSplit: TrafficSplitEntries }),
).annotate({
  identifier: "WeightedOverride",
}) as any as S.Schema<WeightedOverride>;
export type ConfigurationBundleAction =
  | { staticOverride: StaticOverride; weightedOverride?: never }
  | { staticOverride?: never; weightedOverride: WeightedOverride };
export const ConfigurationBundleAction = /*@__PURE__*/ S.Union([
  S.Struct({ staticOverride: StaticOverride }),
  S.Struct({ weightedOverride: WeightedOverride }),
]);
export type TargetName = string | redacted.Redacted<string>;
export interface StaticRoute {
  targetName: string | redacted.Redacted<string>;
}
export const StaticRoute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ targetName: SensitiveString }),
).annotate({ identifier: "StaticRoute" }) as any as S.Schema<StaticRoute>;
export interface TargetTrafficSplitEntry {
  name: string;
  weight: number;
  targetName: string | redacted.Redacted<string>;
  description?: string;
  metadata?: { [key: string]: string | undefined };
}
export const TargetTrafficSplitEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    weight: S.Number,
    targetName: SensitiveString,
    description: S.optional(S.String),
    metadata: S.optional(TrafficSplitMetadataMap),
  }),
).annotate({
  identifier: "TargetTrafficSplitEntry",
}) as any as S.Schema<TargetTrafficSplitEntry>;
export type TargetTrafficSplitEntries = TargetTrafficSplitEntry[];
export const TargetTrafficSplitEntries = /*@__PURE__*/ S.Array(
  TargetTrafficSplitEntry,
);
export interface WeightedRoute {
  trafficSplit: TargetTrafficSplitEntry[];
}
export const WeightedRoute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ trafficSplit: TargetTrafficSplitEntries }),
).annotate({ identifier: "WeightedRoute" }) as any as S.Schema<WeightedRoute>;
export type RouteToTargetAction =
  | { staticRoute: StaticRoute; weightedRoute?: never }
  | { staticRoute?: never; weightedRoute: WeightedRoute };
export const RouteToTargetAction = /*@__PURE__*/ S.Union([
  S.Struct({ staticRoute: StaticRoute }),
  S.Struct({ weightedRoute: WeightedRoute }),
]);
export type Action =
  | { configurationBundle: ConfigurationBundleAction; routeToTarget?: never }
  | { configurationBundle?: never; routeToTarget: RouteToTargetAction };
export const Action = /*@__PURE__*/ S.Union([
  S.Struct({ configurationBundle: ConfigurationBundleAction }),
  S.Struct({ routeToTarget: RouteToTargetAction }),
]);
export type Actions = Action[];
export const Actions = /*@__PURE__*/ S.Array(Action);
export type GatewayRuleDescription = string;
export interface CreateGatewayRuleRequest {
  gatewayIdentifier: string;
  clientToken?: string;
  priority: number;
  conditions?: Condition[];
  actions: Action[];
  description?: string;
}
export const CreateGatewayRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayIdentifier: S.String.pipe(T.HttpLabel("gatewayIdentifier")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    priority: S.Number,
    conditions: S.optional(Conditions),
    actions: Actions,
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/gateways/{gatewayIdentifier}/rules" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGatewayRuleRequest",
}) as any as S.Schema<CreateGatewayRuleRequest>;
export type GatewayRuleId = string;
export type GatewayRuleStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | (string & {});
export const GatewayRuleStatus = S.String;

export interface SystemManagedBlock {
  managedBy: string;
}
export const SystemManagedBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ managedBy: S.String }),
).annotate({
  identifier: "SystemManagedBlock",
}) as any as S.Schema<SystemManagedBlock>;
export interface CreateGatewayRuleResponse {
  ruleId: string;
  gatewayArn: string;
  priority: number;
  conditions?: Condition[];
  actions: Action[];
  description?: string;
  createdAt: Date;
  status: GatewayRuleStatus;
  system?: SystemManagedBlock;
}
export const CreateGatewayRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleId: S.String,
    gatewayArn: S.String,
    priority: S.Number,
    conditions: S.optional(Conditions),
    actions: Actions,
    description: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: GatewayRuleStatus,
    system: S.optional(SystemManagedBlock),
  }),
).annotate({
  identifier: "CreateGatewayRuleResponse",
}) as any as S.Schema<CreateGatewayRuleResponse>;
export type TargetDescription = string | redacted.Redacted<string>;
export type S3BucketUri = string;
export type AwsAccountId = string;
export interface S3Configuration {
  uri?: string;
  bucketOwnerAccountId?: string;
}
export const S3Configuration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    uri: S.optional(S.String),
    bucketOwnerAccountId: S.optional(S.String),
  }),
).annotate({
  identifier: "S3Configuration",
}) as any as S.Schema<S3Configuration>;
export type InlinePayload = string | redacted.Redacted<string>;
export type ApiSchemaConfiguration =
  | { s3: S3Configuration; inlinePayload?: never }
  | { s3?: never; inlinePayload: string | redacted.Redacted<string> };
export const ApiSchemaConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ s3: S3Configuration }),
  S.Struct({ inlinePayload: SensitiveString }),
]);
export type SchemaType =
  | "string"
  | "number"
  | "object"
  | "array"
  | "boolean"
  | "integer"
  | (string & {});
export const SchemaType = S.String;

export type SchemaProperties = { [key: string]: SchemaDefinition | undefined };
export const SchemaProperties = /*@__PURE__*/ S.Record(
  S.String,
  S.suspend((): S.Schema<SchemaDefinition> => SchemaDefinition)
    .annotate({ identifier: "SchemaDefinition" })
    .pipe(S.optional),
) as any as S.Schema<SchemaProperties>;
export type RequiredProperties = string[];
export const RequiredProperties = /*@__PURE__*/ S.Array(S.String);
export interface SchemaDefinition {
  type: SchemaType;
  properties?: { [key: string]: SchemaDefinition | undefined };
  required?: string[];
  items?: SchemaDefinition;
  description?: string;
}
export const SchemaDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: SchemaType,
    properties: S.optional(
      S.suspend(() => SchemaProperties).annotate({
        identifier: "SchemaProperties",
      }),
    ),
    required: S.optional(RequiredProperties),
    items: S.optional(
      S.suspend((): S.Schema<SchemaDefinition> => SchemaDefinition).annotate({
        identifier: "SchemaDefinition",
      }),
    ),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "SchemaDefinition",
}) as any as S.Schema<SchemaDefinition>;
export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: SchemaDefinition;
  outputSchema?: SchemaDefinition;
}
export const ToolDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.String,
    inputSchema: SchemaDefinition,
    outputSchema: S.optional(SchemaDefinition),
  }),
).annotate({ identifier: "ToolDefinition" }) as any as S.Schema<ToolDefinition>;
export type ToolDefinitions = ToolDefinition[];
export const ToolDefinitions = /*@__PURE__*/ S.Array(ToolDefinition);
export type ToolSchema =
  | { s3: S3Configuration; inlinePayload?: never }
  | { s3?: never; inlinePayload: ToolDefinition[] };
export const ToolSchema = /*@__PURE__*/ S.Union([
  S.Struct({ s3: S3Configuration }),
  S.Struct({ inlinePayload: ToolDefinitions }),
]);
export interface McpLambdaTargetConfiguration {
  lambdaArn: string;
  toolSchema: ToolSchema;
}
export const McpLambdaTargetConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ lambdaArn: S.String, toolSchema: ToolSchema }),
).annotate({
  identifier: "McpLambdaTargetConfiguration",
}) as any as S.Schema<McpLambdaTargetConfiguration>;
export type McpToolSchemaConfiguration =
  | { s3: S3Configuration; inlinePayload?: never }
  | { s3?: never; inlinePayload: string | redacted.Redacted<string> };
export const McpToolSchemaConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ s3: S3Configuration }),
  S.Struct({ inlinePayload: SensitiveString }),
]);
export type ListingMode = "DEFAULT" | "DYNAMIC" | (string & {});
export const ListingMode = S.String;

export type TargetResourcePriority = number;
export interface McpServerTargetConfiguration {
  endpoint: string;
  mcpToolSchema?: McpToolSchemaConfiguration;
  listingMode?: ListingMode;
  resourcePriority?: number;
}
export const McpServerTargetConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    endpoint: S.String,
    mcpToolSchema: S.optional(McpToolSchemaConfiguration),
    listingMode: S.optional(ListingMode),
    resourcePriority: S.optional(S.Number),
  }),
).annotate({
  identifier: "McpServerTargetConfiguration",
}) as any as S.Schema<McpServerTargetConfiguration>;
export type RestApiMethod =
  | "GET"
  | "DELETE"
  | "HEAD"
  | "OPTIONS"
  | "PATCH"
  | "PUT"
  | "POST"
  | (string & {});
export const RestApiMethod = S.String;

export interface ApiGatewayToolOverride {
  name: string;
  description?: string;
  path: string;
  method: RestApiMethod;
}
export const ApiGatewayToolOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    path: S.String,
    method: RestApiMethod,
  }),
).annotate({
  identifier: "ApiGatewayToolOverride",
}) as any as S.Schema<ApiGatewayToolOverride>;
export type ApiGatewayToolOverrides = ApiGatewayToolOverride[];
export const ApiGatewayToolOverrides = /*@__PURE__*/ S.Array(
  ApiGatewayToolOverride,
);
export type RestApiMethods = RestApiMethod[];
export const RestApiMethods = /*@__PURE__*/ S.Array(RestApiMethod);
export interface ApiGatewayToolFilter {
  filterPath: string;
  methods: RestApiMethod[];
}
export const ApiGatewayToolFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ filterPath: S.String, methods: RestApiMethods }),
).annotate({
  identifier: "ApiGatewayToolFilter",
}) as any as S.Schema<ApiGatewayToolFilter>;
export type ApiGatewayToolFilters = ApiGatewayToolFilter[];
export const ApiGatewayToolFilters =
  /*@__PURE__*/ S.Array(ApiGatewayToolFilter);
export interface ApiGatewayToolConfiguration {
  toolOverrides?: ApiGatewayToolOverride[];
  toolFilters: ApiGatewayToolFilter[];
}
export const ApiGatewayToolConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    toolOverrides: S.optional(ApiGatewayToolOverrides),
    toolFilters: ApiGatewayToolFilters,
  }),
).annotate({
  identifier: "ApiGatewayToolConfiguration",
}) as any as S.Schema<ApiGatewayToolConfiguration>;
export interface ApiGatewayTargetConfiguration {
  restApiId: string;
  stage: string;
  apiGatewayToolConfiguration: ApiGatewayToolConfiguration;
}
export const ApiGatewayTargetConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String,
    stage: S.String,
    apiGatewayToolConfiguration: ApiGatewayToolConfiguration,
  }),
).annotate({
  identifier: "ApiGatewayTargetConfiguration",
}) as any as S.Schema<ApiGatewayTargetConfiguration>;
export type ConnectorId = string;
export type ConnectorVersion = string;
export interface ConnectorSource {
  connectorId: string;
  version?: string;
}
export const ConnectorSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ connectorId: S.String, version: S.optional(S.String) }),
).annotate({
  identifier: "ConnectorSource",
}) as any as S.Schema<ConnectorSource>;
export type EnabledConnectors = string[];
export const EnabledConnectors = /*@__PURE__*/ S.Array(S.String);
export interface ConnectorParameterOverride {
  path: string;
  description?: string;
  visible?: boolean;
}
export const ConnectorParameterOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    path: S.String,
    description: S.optional(S.String),
    visible: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ConnectorParameterOverride",
}) as any as S.Schema<ConnectorParameterOverride>;
export type ConnectorParameterOverrides = ConnectorParameterOverride[];
export const ConnectorParameterOverrides = /*@__PURE__*/ S.Array(
  ConnectorParameterOverride,
);
export interface ConnectorConfiguration {
  name: string;
  description?: string;
  parameterValues?: any;
  parameterOverrides?: ConnectorParameterOverride[];
}
export const ConnectorConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    parameterValues: S.optional(S.Any),
    parameterOverrides: S.optional(ConnectorParameterOverrides),
  }),
).annotate({
  identifier: "ConnectorConfiguration",
}) as any as S.Schema<ConnectorConfiguration>;
export type ConnectorConfigurations = ConnectorConfiguration[];
export const ConnectorConfigurations = /*@__PURE__*/ S.Array(
  ConnectorConfiguration,
);
export interface ConnectorTargetConfiguration {
  source: ConnectorSource;
  enabled?: string[];
  configurations?: ConnectorConfiguration[];
}
export const ConnectorTargetConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    source: ConnectorSource,
    enabled: S.optional(EnabledConnectors),
    configurations: S.optional(ConnectorConfigurations),
  }),
).annotate({
  identifier: "ConnectorTargetConfiguration",
}) as any as S.Schema<ConnectorTargetConfiguration>;
export type McpTargetConfiguration =
  | {
      openApiSchema: ApiSchemaConfiguration;
      smithyModel?: never;
      lambda?: never;
      mcpServer?: never;
      apiGateway?: never;
      connector?: never;
    }
  | {
      openApiSchema?: never;
      smithyModel: ApiSchemaConfiguration;
      lambda?: never;
      mcpServer?: never;
      apiGateway?: never;
      connector?: never;
    }
  | {
      openApiSchema?: never;
      smithyModel?: never;
      lambda: McpLambdaTargetConfiguration;
      mcpServer?: never;
      apiGateway?: never;
      connector?: never;
    }
  | {
      openApiSchema?: never;
      smithyModel?: never;
      lambda?: never;
      mcpServer: McpServerTargetConfiguration;
      apiGateway?: never;
      connector?: never;
    }
  | {
      openApiSchema?: never;
      smithyModel?: never;
      lambda?: never;
      mcpServer?: never;
      apiGateway: ApiGatewayTargetConfiguration;
      connector?: never;
    }
  | {
      openApiSchema?: never;
      smithyModel?: never;
      lambda?: never;
      mcpServer?: never;
      apiGateway?: never;
      connector: ConnectorTargetConfiguration;
    };
export const McpTargetConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ openApiSchema: ApiSchemaConfiguration }),
  S.Struct({ smithyModel: ApiSchemaConfiguration }),
  S.Struct({ lambda: McpLambdaTargetConfiguration }),
  S.Struct({ mcpServer: McpServerTargetConfiguration }),
  S.Struct({ apiGateway: ApiGatewayTargetConfiguration }),
  S.Struct({ connector: ConnectorTargetConfiguration }),
]);
export type RuntimeArn = string;
export type RuntimeQualifier = string;
export interface HttpApiSchemaConfiguration {
  source: ApiSchemaConfiguration;
}
export const HttpApiSchemaConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ source: ApiSchemaConfiguration }),
).annotate({
  identifier: "HttpApiSchemaConfiguration",
}) as any as S.Schema<HttpApiSchemaConfiguration>;
export interface RuntimeTargetConfiguration {
  arn: string;
  qualifier?: string;
  schema?: HttpApiSchemaConfiguration;
}
export const RuntimeTargetConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    qualifier: S.optional(S.String),
    schema: S.optional(HttpApiSchemaConfiguration),
  }),
).annotate({
  identifier: "RuntimeTargetConfiguration",
}) as any as S.Schema<RuntimeTargetConfiguration>;
export type PassthroughEndpoint = string;
export type PassthroughProtocolType =
  | "MCP"
  | "A2A"
  | "INFERENCE"
  | "CUSTOM"
  | (string & {});
export const PassthroughProtocolType = S.String;

export type StickinessTimeout = number;
export type CompositeIdentifierEntry = string;
export type CompositeIdentifierList = string[];
export const CompositeIdentifierList = /*@__PURE__*/ S.Array(S.String);
export interface StickinessConfiguration {
  identifier: string;
  timeout?: number;
  compositeIdentifier?: string[];
}
export const StickinessConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.String,
    timeout: S.optional(S.Number),
    compositeIdentifier: S.optional(CompositeIdentifierList),
  }),
).annotate({
  identifier: "StickinessConfiguration",
}) as any as S.Schema<StickinessConfiguration>;
export type StaticQueryParameterName = string;
export type StaticQueryParameterValue = string | redacted.Redacted<string>;
export type StaticQueryParameters = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export const StaticQueryParameters = /*@__PURE__*/ S.Record(
  S.String,
  SensitiveString.pipe(S.optional),
);
export type StaticQueryParameterConflictResolution =
  | "CLIENT_OVERRIDE"
  | "STATIC_OVERRIDE"
  | (string & {});
export const StaticQueryParameterConflictResolution = S.String;

export interface PassthroughTargetConfiguration {
  endpoint: string;
  protocolType: PassthroughProtocolType;
  schema?: HttpApiSchemaConfiguration;
  stickinessConfiguration?: StickinessConfiguration;
  staticQueryParameters?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  staticQueryParameterConflictResolution?: StaticQueryParameterConflictResolution;
}
export const PassthroughTargetConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    endpoint: S.String,
    protocolType: PassthroughProtocolType,
    schema: S.optional(HttpApiSchemaConfiguration),
    stickinessConfiguration: S.optional(StickinessConfiguration),
    staticQueryParameters: S.optional(StaticQueryParameters),
    staticQueryParameterConflictResolution: S.optional(
      StaticQueryParameterConflictResolution,
    ),
  }),
).annotate({
  identifier: "PassthroughTargetConfiguration",
}) as any as S.Schema<PassthroughTargetConfiguration>;
export interface HttpConnectorSource {
  connectorId: string;
}
export const HttpConnectorSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ connectorId: S.String }),
).annotate({
  identifier: "HttpConnectorSource",
}) as any as S.Schema<HttpConnectorSource>;
export type ConnectorParameterName = string;
export type ConnectorParameterValue = string;
export type HttpConnectorParameters = { [key: string]: string | undefined };
export const HttpConnectorParameters = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface HttpConnectorTargetConfiguration {
  source: HttpConnectorSource;
  parameters?: { [key: string]: string | undefined };
}
export const HttpConnectorTargetConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    source: HttpConnectorSource,
    parameters: S.optional(HttpConnectorParameters),
  }),
).annotate({
  identifier: "HttpConnectorTargetConfiguration",
}) as any as S.Schema<HttpConnectorTargetConfiguration>;
export type HttpTargetConfiguration =
  | {
      agentcoreRuntime: RuntimeTargetConfiguration;
      passthrough?: never;
      connector?: never;
    }
  | {
      agentcoreRuntime?: never;
      passthrough: PassthroughTargetConfiguration;
      connector?: never;
    }
  | {
      agentcoreRuntime?: never;
      passthrough?: never;
      connector: HttpConnectorTargetConfiguration;
    };
export const HttpTargetConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ agentcoreRuntime: RuntimeTargetConfiguration }),
  S.Struct({ passthrough: PassthroughTargetConfiguration }),
  S.Struct({ connector: HttpConnectorTargetConfiguration }),
]);
export type InferenceConnectorId = string;
export interface InferenceConnectorSource {
  connectorId: string;
}
export const InferenceConnectorSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ connectorId: S.String }),
).annotate({
  identifier: "InferenceConnectorSource",
}) as any as S.Schema<InferenceConnectorSource>;
export interface InferenceConnectorTargetConfiguration {
  source: InferenceConnectorSource;
}
export const InferenceConnectorTargetConfiguration = /*@__PURE__*/ S.suspend(
  () => S.Struct({ source: InferenceConnectorSource }),
).annotate({
  identifier: "InferenceConnectorTargetConfiguration",
}) as any as S.Schema<InferenceConnectorTargetConfiguration>;
export interface ProviderPrefix {
  strip?: boolean;
  separator?: string;
}
export const ProviderPrefix = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ strip: S.optional(S.Boolean), separator: S.optional(S.String) }),
).annotate({ identifier: "ProviderPrefix" }) as any as S.Schema<ProviderPrefix>;
export interface ModelMapping {
  providerPrefix?: ProviderPrefix;
}
export const ModelMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ providerPrefix: S.optional(ProviderPrefix) }),
).annotate({ identifier: "ModelMapping" }) as any as S.Schema<ModelMapping>;
export type InferenceOperationPath = string;
export type ModelPattern = string;
export interface ModelEntry {
  model: string;
}
export const ModelEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ model: S.String }),
).annotate({ identifier: "ModelEntry" }) as any as S.Schema<ModelEntry>;
export type ModelEntries = ModelEntry[];
export const ModelEntries = /*@__PURE__*/ S.Array(ModelEntry);
export interface InferenceOperationConfiguration {
  path: string;
  providerPath?: string;
  models?: ModelEntry[];
}
export const InferenceOperationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    path: S.String,
    providerPath: S.optional(S.String),
    models: S.optional(ModelEntries),
  }),
).annotate({
  identifier: "InferenceOperationConfiguration",
}) as any as S.Schema<InferenceOperationConfiguration>;
export type InferenceOperationConfigurations =
  InferenceOperationConfiguration[];
export const InferenceOperationConfigurations = /*@__PURE__*/ S.Array(
  InferenceOperationConfiguration,
);
export interface InferenceProviderTargetConfiguration {
  endpoint: string;
  modelMapping?: ModelMapping;
  operations?: InferenceOperationConfiguration[];
}
export const InferenceProviderTargetConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      endpoint: S.String,
      modelMapping: S.optional(ModelMapping),
      operations: S.optional(InferenceOperationConfigurations),
    }),
).annotate({
  identifier: "InferenceProviderTargetConfiguration",
}) as any as S.Schema<InferenceProviderTargetConfiguration>;
export type InferenceTargetConfiguration =
  | { connector: InferenceConnectorTargetConfiguration; provider?: never }
  | { connector?: never; provider: InferenceProviderTargetConfiguration };
export const InferenceTargetConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ connector: InferenceConnectorTargetConfiguration }),
  S.Struct({ provider: InferenceProviderTargetConfiguration }),
]);
export type TargetConfiguration =
  | { mcp: McpTargetConfiguration; http?: never; inference?: never }
  | { mcp?: never; http: HttpTargetConfiguration; inference?: never }
  | { mcp?: never; http?: never; inference: InferenceTargetConfiguration };
export const TargetConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ mcp: McpTargetConfiguration }),
  S.Struct({ http: HttpTargetConfiguration }),
  S.Struct({ inference: InferenceTargetConfiguration }),
]);
export type CredentialProviderType =
  | "GATEWAY_IAM_ROLE"
  | "OAUTH"
  | "API_KEY"
  | "CALLER_IAM_CREDENTIALS"
  | "JWT_PASSTHROUGH"
  | (string & {});
export const CredentialProviderType = S.String;

export type OAuthCredentialProviderArn = string;
export type OAuthScope = string;
export type OAuthScopes = string[];
export const OAuthScopes = /*@__PURE__*/ S.Array(S.String);
export type OAuthCustomParametersKey = string;
export type OAuthCustomParametersValue = string | redacted.Redacted<string>;
export type OAuthCustomParameters = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export const OAuthCustomParameters = /*@__PURE__*/ S.Record(
  S.String,
  SensitiveString.pipe(S.optional),
);
export type OAuthGrantType =
  | "CLIENT_CREDENTIALS"
  | "AUTHORIZATION_CODE"
  | "TOKEN_EXCHANGE"
  | (string & {});
export const OAuthGrantType = S.String;

export type OAuthDefaultReturnUrl = string;
export interface OAuthCredentialProvider {
  providerArn: string;
  scopes: string[];
  customParameters?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  grantType?: OAuthGrantType;
  defaultReturnUrl?: string;
}
export const OAuthCredentialProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    providerArn: S.String,
    scopes: OAuthScopes,
    customParameters: S.optional(OAuthCustomParameters),
    grantType: S.optional(OAuthGrantType),
    defaultReturnUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "OAuthCredentialProvider",
}) as any as S.Schema<OAuthCredentialProvider>;
export type ApiKeyCredentialProviderArn = string;
export type ApiKeyCredentialParameterName = string;
export type ApiKeyCredentialPrefix = string;
export type ApiKeyCredentialLocation =
  | "HEADER"
  | "QUERY_PARAMETER"
  | (string & {});
export const ApiKeyCredentialLocation = S.String;

export interface GatewayApiKeyCredentialProvider {
  providerArn: string;
  credentialParameterName?: string;
  credentialPrefix?: string;
  credentialLocation?: ApiKeyCredentialLocation;
}
export const GatewayApiKeyCredentialProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    providerArn: S.String,
    credentialParameterName: S.optional(S.String),
    credentialPrefix: S.optional(S.String),
    credentialLocation: S.optional(ApiKeyCredentialLocation),
  }),
).annotate({
  identifier: "GatewayApiKeyCredentialProvider",
}) as any as S.Schema<GatewayApiKeyCredentialProvider>;
export interface IamCredentialProvider {
  service: string;
  region?: string;
}
export const IamCredentialProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ service: S.String, region: S.optional(S.String) }),
).annotate({
  identifier: "IamCredentialProvider",
}) as any as S.Schema<IamCredentialProvider>;
export type CredentialProvider =
  | {
      oauthCredentialProvider: OAuthCredentialProvider;
      apiKeyCredentialProvider?: never;
      iamCredentialProvider?: never;
    }
  | {
      oauthCredentialProvider?: never;
      apiKeyCredentialProvider: GatewayApiKeyCredentialProvider;
      iamCredentialProvider?: never;
    }
  | {
      oauthCredentialProvider?: never;
      apiKeyCredentialProvider?: never;
      iamCredentialProvider: IamCredentialProvider;
    };
export const CredentialProvider = /*@__PURE__*/ S.Union([
  S.Struct({ oauthCredentialProvider: OAuthCredentialProvider }),
  S.Struct({ apiKeyCredentialProvider: GatewayApiKeyCredentialProvider }),
  S.Struct({ iamCredentialProvider: IamCredentialProvider }),
]);
export interface CredentialProviderConfiguration {
  credentialProviderType: CredentialProviderType;
  credentialProvider?: CredentialProvider;
}
export const CredentialProviderConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    credentialProviderType: CredentialProviderType,
    credentialProvider: S.optional(CredentialProvider),
  }),
).annotate({
  identifier: "CredentialProviderConfiguration",
}) as any as S.Schema<CredentialProviderConfiguration>;
export type CredentialProviderConfigurations =
  CredentialProviderConfiguration[];
export const CredentialProviderConfigurations = /*@__PURE__*/ S.Array(
  CredentialProviderConfiguration,
);
export type HttpHeaderName = string;
export type AllowedRequestHeaders = string[];
export const AllowedRequestHeaders = /*@__PURE__*/ S.Array(S.String);
export type HttpQueryParameterName = string;
export type AllowedQueryParameters = string[];
export const AllowedQueryParameters = /*@__PURE__*/ S.Array(S.String);
export type AllowedResponseHeaders = string[];
export const AllowedResponseHeaders = /*@__PURE__*/ S.Array(S.String);
export interface MetadataConfiguration {
  allowedRequestHeaders?: string[];
  allowedQueryParameters?: string[];
  allowedResponseHeaders?: string[];
}
export const MetadataConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    allowedRequestHeaders: S.optional(AllowedRequestHeaders),
    allowedQueryParameters: S.optional(AllowedQueryParameters),
    allowedResponseHeaders: S.optional(AllowedResponseHeaders),
  }),
).annotate({
  identifier: "MetadataConfiguration",
}) as any as S.Schema<MetadataConfiguration>;
export interface CreateGatewayTargetRequest {
  gatewayIdentifier: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  clientToken?: string;
  targetConfiguration: TargetConfiguration;
  credentialProviderConfigurations?: CredentialProviderConfiguration[];
  metadataConfiguration?: MetadataConfiguration;
  privateEndpoint?: PrivateEndpoint;
}
export const CreateGatewayTargetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayIdentifier: S.String.pipe(T.HttpLabel("gatewayIdentifier")),
    name: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    targetConfiguration: TargetConfiguration,
    credentialProviderConfigurations: S.optional(
      CredentialProviderConfigurations,
    ),
    metadataConfiguration: S.optional(MetadataConfiguration),
    privateEndpoint: S.optional(PrivateEndpoint),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/gateways/{gatewayIdentifier}/targets/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGatewayTargetRequest",
}) as any as S.Schema<CreateGatewayTargetRequest>;
export type TargetId = string;
export type TargetStatus =
  | "CREATING"
  | "UPDATING"
  | "UPDATE_UNSUCCESSFUL"
  | "DELETING"
  | "READY"
  | "FAILED"
  | "SYNCHRONIZING"
  | "SYNCHRONIZE_UNSUCCESSFUL"
  | "CREATE_PENDING_AUTH"
  | "UPDATE_PENDING_AUTH"
  | "SYNCHRONIZE_PENDING_AUTH"
  | (string & {});
export const TargetStatus = S.String;

export type DomainName = string;
export type ResourceGatewayArn = string;
export type ResourceAssociationArn = string;
export interface ManagedResourceDetails {
  domain?: string;
  resourceGatewayArn?: string;
  resourceAssociationArn?: string;
}
export const ManagedResourceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.optional(S.String),
    resourceGatewayArn: S.optional(S.String),
    resourceAssociationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ManagedResourceDetails",
}) as any as S.Schema<ManagedResourceDetails>;
export type PrivateEndpointManagedResources = ManagedResourceDetails[];
export const PrivateEndpointManagedResources = /*@__PURE__*/ S.Array(
  ManagedResourceDetails,
);
export interface OAuth2AuthorizationData {
  authorizationUrl: string;
  userId?: string;
}
export const OAuth2AuthorizationData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ authorizationUrl: S.String, userId: S.optional(S.String) }),
).annotate({
  identifier: "OAuth2AuthorizationData",
}) as any as S.Schema<OAuth2AuthorizationData>;
export type AuthorizationData = { oauth2: OAuth2AuthorizationData };
export const AuthorizationData = /*@__PURE__*/ S.Union([
  S.Struct({ oauth2: OAuth2AuthorizationData }),
]);
export type TargetProtocolType = "MCP" | "HTTP" | (string & {});
export const TargetProtocolType = S.String;

export interface CreateGatewayTargetResponse {
  gatewayArn: string;
  targetId: string;
  createdAt: Date;
  updatedAt: Date;
  status: TargetStatus;
  statusReasons?: string[];
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  targetConfiguration: TargetConfiguration;
  credentialProviderConfigurations: CredentialProviderConfiguration[];
  lastSynchronizedAt?: Date;
  metadataConfiguration?: MetadataConfiguration;
  privateEndpoint?: PrivateEndpoint;
  privateEndpointManagedResources?: ManagedResourceDetails[];
  authorizationData?: AuthorizationData;
  protocolType?: TargetProtocolType;
}
export const CreateGatewayTargetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayArn: S.String,
    targetId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: TargetStatus,
    statusReasons: S.optional(StatusReasons),
    name: SensitiveString,
    description: S.optional(SensitiveString),
    targetConfiguration: TargetConfiguration,
    credentialProviderConfigurations: CredentialProviderConfigurations,
    lastSynchronizedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    metadataConfiguration: S.optional(MetadataConfiguration),
    privateEndpoint: S.optional(PrivateEndpoint),
    privateEndpointManagedResources: S.optional(
      PrivateEndpointManagedResources,
    ),
    authorizationData: S.optional(AuthorizationData),
    protocolType: S.optional(TargetProtocolType),
  }),
).annotate({
  identifier: "CreateGatewayTargetResponse",
}) as any as S.Schema<CreateGatewayTargetResponse>;
export type HarnessName = string;
export interface HarnessAgentCoreRuntimeEnvironmentRequest {
  lifecycleConfiguration?: LifecycleConfiguration;
  networkConfiguration?: NetworkConfiguration;
  filesystemConfigurations?: FilesystemConfiguration[];
}
export const HarnessAgentCoreRuntimeEnvironmentRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      lifecycleConfiguration: S.optional(LifecycleConfiguration),
      networkConfiguration: S.optional(NetworkConfiguration),
      filesystemConfigurations: S.optional(FilesystemConfigurations),
    }),
  ).annotate({
    identifier: "HarnessAgentCoreRuntimeEnvironmentRequest",
  }) as any as S.Schema<HarnessAgentCoreRuntimeEnvironmentRequest>;
export type HarnessEnvironmentProviderRequest = {
  agentCoreRuntimeEnvironment: HarnessAgentCoreRuntimeEnvironmentRequest;
};
export const HarnessEnvironmentProviderRequest = /*@__PURE__*/ S.Union([
  S.Struct({
    agentCoreRuntimeEnvironment: HarnessAgentCoreRuntimeEnvironmentRequest,
  }),
]);
export type HarnessEnvironmentArtifact = {
  containerConfiguration: ContainerConfiguration;
};
export const HarnessEnvironmentArtifact = /*@__PURE__*/ S.Union([
  S.Struct({ containerConfiguration: ContainerConfiguration }),
]);
export type MaxTokens = number;
export type Temperature = number;
export type TopP = number;
export type HarnessBedrockApiFormat =
  | "converse_stream"
  | "responses"
  | "chat_completions"
  | (string & {});
export const HarnessBedrockApiFormat = S.String;

export interface HarnessBedrockModelConfig {
  modelId: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  apiFormat?: HarnessBedrockApiFormat;
  additionalParams?: any;
}
export const HarnessBedrockModelConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.String,
    maxTokens: S.optional(S.Number),
    temperature: S.optional(S.Number),
    topP: S.optional(S.Number),
    apiFormat: S.optional(HarnessBedrockApiFormat),
    additionalParams: S.optional(S.Any),
  }),
).annotate({
  identifier: "HarnessBedrockModelConfig",
}) as any as S.Schema<HarnessBedrockModelConfig>;
export type ApiKeyArn = string;
export type HarnessOpenAiApiFormat =
  | "chat_completions"
  | "responses"
  | (string & {});
export const HarnessOpenAiApiFormat = S.String;

export interface HarnessOpenAiModelConfig {
  modelId: string;
  apiKeyArn: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  apiFormat?: HarnessOpenAiApiFormat;
  additionalParams?: any;
}
export const HarnessOpenAiModelConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.String,
    apiKeyArn: S.String,
    maxTokens: S.optional(S.Number),
    temperature: S.optional(S.Number),
    topP: S.optional(S.Number),
    apiFormat: S.optional(HarnessOpenAiApiFormat),
    additionalParams: S.optional(S.Any),
  }),
).annotate({
  identifier: "HarnessOpenAiModelConfig",
}) as any as S.Schema<HarnessOpenAiModelConfig>;
export type TopK = number;
export interface HarnessGeminiModelConfig {
  modelId: string;
  apiKeyArn: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  topK?: number;
  additionalParams?: any;
}
export const HarnessGeminiModelConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.String,
    apiKeyArn: S.String,
    maxTokens: S.optional(S.Number),
    temperature: S.optional(S.Number),
    topP: S.optional(S.Number),
    topK: S.optional(S.Number),
    additionalParams: S.optional(S.Any),
  }),
).annotate({
  identifier: "HarnessGeminiModelConfig",
}) as any as S.Schema<HarnessGeminiModelConfig>;
export type HarnessLiteLlmApiBase = string | redacted.Redacted<string>;
export interface HarnessLiteLlmModelConfig {
  modelId: string;
  apiKeyArn?: string;
  apiBase?: string | redacted.Redacted<string>;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  additionalParams?: any;
}
export const HarnessLiteLlmModelConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.String,
    apiKeyArn: S.optional(S.String),
    apiBase: S.optional(SensitiveString),
    maxTokens: S.optional(S.Number),
    temperature: S.optional(S.Number),
    topP: S.optional(S.Number),
    additionalParams: S.optional(S.Any),
  }),
).annotate({
  identifier: "HarnessLiteLlmModelConfig",
}) as any as S.Schema<HarnessLiteLlmModelConfig>;
export type HarnessModelConfiguration =
  | {
      bedrockModelConfig: HarnessBedrockModelConfig;
      openAiModelConfig?: never;
      geminiModelConfig?: never;
      liteLlmModelConfig?: never;
    }
  | {
      bedrockModelConfig?: never;
      openAiModelConfig: HarnessOpenAiModelConfig;
      geminiModelConfig?: never;
      liteLlmModelConfig?: never;
    }
  | {
      bedrockModelConfig?: never;
      openAiModelConfig?: never;
      geminiModelConfig: HarnessGeminiModelConfig;
      liteLlmModelConfig?: never;
    }
  | {
      bedrockModelConfig?: never;
      openAiModelConfig?: never;
      geminiModelConfig?: never;
      liteLlmModelConfig: HarnessLiteLlmModelConfig;
    };
export const HarnessModelConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ bedrockModelConfig: HarnessBedrockModelConfig }),
  S.Struct({ openAiModelConfig: HarnessOpenAiModelConfig }),
  S.Struct({ geminiModelConfig: HarnessGeminiModelConfig }),
  S.Struct({ liteLlmModelConfig: HarnessLiteLlmModelConfig }),
]);
export type SensitiveText = string | redacted.Redacted<string>;
export type HarnessSystemContentBlock = {
  text: string | redacted.Redacted<string>;
};
export const HarnessSystemContentBlock = /*@__PURE__*/ S.Union([
  S.Struct({ text: SensitiveString }),
]);
export type HarnessSystemPrompt = HarnessSystemContentBlock[];
export const HarnessSystemPrompt = /*@__PURE__*/ S.Array(
  HarnessSystemContentBlock,
);
export type HarnessToolType =
  | "remote_mcp"
  | "agentcore_browser"
  | "agentcore_gateway"
  | "inline_function"
  | "agentcore_code_interpreter"
  | (string & {});
export const HarnessToolType = S.String;

export type HarnessToolName = string;
export type HarnessRemoteMcpUrl = string | redacted.Redacted<string>;
export type HttpHeaderKey = string;
export type HttpHeaderValue = string;
export type HttpHeadersMap = { [key: string]: string | undefined };
export const HttpHeadersMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface HarnessRemoteMcpConfig {
  url: string | redacted.Redacted<string>;
  headers?: { [key: string]: string | undefined };
}
export const HarnessRemoteMcpConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ url: SensitiveString, headers: S.optional(HttpHeadersMap) }),
).annotate({
  identifier: "HarnessRemoteMcpConfig",
}) as any as S.Schema<HarnessRemoteMcpConfig>;
export type HarnessBrowserArn = string;
export interface HarnessAgentCoreBrowserConfig {
  browserArn?: string;
}
export const HarnessAgentCoreBrowserConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ browserArn: S.optional(S.String) }),
).annotate({
  identifier: "HarnessAgentCoreBrowserConfig",
}) as any as S.Schema<HarnessAgentCoreBrowserConfig>;
export type HarnessGatewayOutboundAuth =
  | { awsIam: Record<string, never>; none?: never; oauth?: never }
  | { awsIam?: never; none: Record<string, never>; oauth?: never }
  | { awsIam?: never; none?: never; oauth: OAuthCredentialProvider };
export const HarnessGatewayOutboundAuth = /*@__PURE__*/ S.Union([
  S.Struct({ awsIam: S.Struct({}) }),
  S.Struct({ none: S.Struct({}) }),
  S.Struct({ oauth: OAuthCredentialProvider }),
]);
export interface HarnessAgentCoreGatewayConfig {
  gatewayArn: string;
  outboundAuth?: HarnessGatewayOutboundAuth;
}
export const HarnessAgentCoreGatewayConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayArn: S.String,
    outboundAuth: S.optional(HarnessGatewayOutboundAuth),
  }),
).annotate({
  identifier: "HarnessAgentCoreGatewayConfig",
}) as any as S.Schema<HarnessAgentCoreGatewayConfig>;
export type HarnessInlineFunctionDescription =
  | string
  | redacted.Redacted<string>;
export interface HarnessInlineFunctionConfig {
  description: string | redacted.Redacted<string>;
  inputSchema: any;
}
export const HarnessInlineFunctionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ description: SensitiveString, inputSchema: S.Any }),
).annotate({
  identifier: "HarnessInlineFunctionConfig",
}) as any as S.Schema<HarnessInlineFunctionConfig>;
export type HarnessCodeInterpreterArn = string;
export interface HarnessAgentCoreCodeInterpreterConfig {
  codeInterpreterArn?: string;
}
export const HarnessAgentCoreCodeInterpreterConfig = /*@__PURE__*/ S.suspend(
  () => S.Struct({ codeInterpreterArn: S.optional(S.String) }),
).annotate({
  identifier: "HarnessAgentCoreCodeInterpreterConfig",
}) as any as S.Schema<HarnessAgentCoreCodeInterpreterConfig>;
export type HarnessToolConfiguration =
  | {
      remoteMcp: HarnessRemoteMcpConfig;
      agentCoreBrowser?: never;
      agentCoreGateway?: never;
      inlineFunction?: never;
      agentCoreCodeInterpreter?: never;
    }
  | {
      remoteMcp?: never;
      agentCoreBrowser: HarnessAgentCoreBrowserConfig;
      agentCoreGateway?: never;
      inlineFunction?: never;
      agentCoreCodeInterpreter?: never;
    }
  | {
      remoteMcp?: never;
      agentCoreBrowser?: never;
      agentCoreGateway: HarnessAgentCoreGatewayConfig;
      inlineFunction?: never;
      agentCoreCodeInterpreter?: never;
    }
  | {
      remoteMcp?: never;
      agentCoreBrowser?: never;
      agentCoreGateway?: never;
      inlineFunction: HarnessInlineFunctionConfig;
      agentCoreCodeInterpreter?: never;
    }
  | {
      remoteMcp?: never;
      agentCoreBrowser?: never;
      agentCoreGateway?: never;
      inlineFunction?: never;
      agentCoreCodeInterpreter: HarnessAgentCoreCodeInterpreterConfig;
    };
export const HarnessToolConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ remoteMcp: HarnessRemoteMcpConfig }),
  S.Struct({ agentCoreBrowser: HarnessAgentCoreBrowserConfig }),
  S.Struct({ agentCoreGateway: HarnessAgentCoreGatewayConfig }),
  S.Struct({ inlineFunction: HarnessInlineFunctionConfig }),
  S.Struct({ agentCoreCodeInterpreter: HarnessAgentCoreCodeInterpreterConfig }),
]);
export interface HarnessTool {
  type: HarnessToolType;
  name?: string;
  config?: HarnessToolConfiguration;
}
export const HarnessTool = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: HarnessToolType,
    name: S.optional(S.String),
    config: S.optional(HarnessToolConfiguration),
  }),
).annotate({ identifier: "HarnessTool" }) as any as S.Schema<HarnessTool>;
export type HarnessTools = HarnessTool[];
export const HarnessTools = /*@__PURE__*/ S.Array(HarnessTool);
export type HarnessSkillPath = string;
export type HarnessSkillS3Uri = string;
export interface HarnessSkillS3Source {
  uri: string;
}
export const HarnessSkillS3Source = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ uri: S.String }),
).annotate({
  identifier: "HarnessSkillS3Source",
}) as any as S.Schema<HarnessSkillS3Source>;
export type HarnessSkillGitUrl = string;
export interface HarnessSkillGitAuth {
  credentialArn: string;
  username?: string;
}
export const HarnessSkillGitAuth = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ credentialArn: S.String, username: S.optional(S.String) }),
).annotate({
  identifier: "HarnessSkillGitAuth",
}) as any as S.Schema<HarnessSkillGitAuth>;
export interface HarnessSkillGitSource {
  url: string;
  path?: string;
  auth?: HarnessSkillGitAuth;
}
export const HarnessSkillGitSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    url: S.String,
    path: S.optional(S.String),
    auth: S.optional(HarnessSkillGitAuth),
  }),
).annotate({
  identifier: "HarnessSkillGitSource",
}) as any as S.Schema<HarnessSkillGitSource>;
export type HarnessAwsSkillPath = string;
export type HarnessAwsSkillPaths = string[];
export const HarnessAwsSkillPaths = /*@__PURE__*/ S.Array(S.String);
export interface HarnessSkillAwsSkillsSource {
  paths?: string[];
}
export const HarnessSkillAwsSkillsSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ paths: S.optional(HarnessAwsSkillPaths) }),
).annotate({
  identifier: "HarnessSkillAwsSkillsSource",
}) as any as S.Schema<HarnessSkillAwsSkillsSource>;
export type HarnessSkill =
  | { path: string; s3?: never; git?: never; awsSkills?: never }
  | { path?: never; s3: HarnessSkillS3Source; git?: never; awsSkills?: never }
  | { path?: never; s3?: never; git: HarnessSkillGitSource; awsSkills?: never }
  | {
      path?: never;
      s3?: never;
      git?: never;
      awsSkills: HarnessSkillAwsSkillsSource;
    };
export const HarnessSkill = /*@__PURE__*/ S.Union([
  S.Struct({ path: S.String }),
  S.Struct({ s3: HarnessSkillS3Source }),
  S.Struct({ git: HarnessSkillGitSource }),
  S.Struct({ awsSkills: HarnessSkillAwsSkillsSource }),
]);
export type HarnessSkills = HarnessSkill[];
export const HarnessSkills = /*@__PURE__*/ S.Array(HarnessSkill);
export type HarnessAllowedTool = string;
export type HarnessAllowedTools = string[];
export const HarnessAllowedTools = /*@__PURE__*/ S.Array(S.String);
export type MemoryArn = string;
export interface HarnessAgentCoreMemoryRetrievalConfig {
  topK?: number;
  relevanceScore?: number;
  strategyId?: string;
}
export const HarnessAgentCoreMemoryRetrievalConfig = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      topK: S.optional(S.Number),
      relevanceScore: S.optional(S.Number),
      strategyId: S.optional(S.String),
    }),
).annotate({
  identifier: "HarnessAgentCoreMemoryRetrievalConfig",
}) as any as S.Schema<HarnessAgentCoreMemoryRetrievalConfig>;
export type HarnessAgentCoreMemoryRetrievalConfigs = {
  [key: string]: HarnessAgentCoreMemoryRetrievalConfig | undefined;
};
export const HarnessAgentCoreMemoryRetrievalConfigs = /*@__PURE__*/ S.Record(
  S.String,
  HarnessAgentCoreMemoryRetrievalConfig.pipe(S.optional),
);
export interface HarnessAgentCoreMemoryConfiguration {
  arn: string;
  actorId?: string;
  messagesCount?: number;
  retrievalConfig?: {
    [key: string]: HarnessAgentCoreMemoryRetrievalConfig | undefined;
  };
}
export const HarnessAgentCoreMemoryConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    actorId: S.optional(S.String),
    messagesCount: S.optional(S.Number),
    retrievalConfig: S.optional(HarnessAgentCoreMemoryRetrievalConfigs),
  }),
).annotate({
  identifier: "HarnessAgentCoreMemoryConfiguration",
}) as any as S.Schema<HarnessAgentCoreMemoryConfiguration>;
export type HarnessManagedMemoryStrategyType =
  | "SEMANTIC"
  | "SUMMARIZATION"
  | "USER_PREFERENCE"
  | "EPISODIC"
  | (string & {});
export const HarnessManagedMemoryStrategyType = S.String;

export type HarnessManagedMemoryStrategyList =
  HarnessManagedMemoryStrategyType[];
export const HarnessManagedMemoryStrategyList = /*@__PURE__*/ S.Array(
  HarnessManagedMemoryStrategyType,
);
export interface HarnessManagedMemoryConfiguration {
  arn?: string;
  strategies?: HarnessManagedMemoryStrategyType[];
  eventExpiryDuration?: number;
  encryptionKeyArn?: string;
}
export const HarnessManagedMemoryConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    strategies: S.optional(HarnessManagedMemoryStrategyList),
    eventExpiryDuration: S.optional(S.Number),
    encryptionKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "HarnessManagedMemoryConfiguration",
}) as any as S.Schema<HarnessManagedMemoryConfiguration>;
export interface HarnessDisabledMemoryConfiguration {}
export const HarnessDisabledMemoryConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "HarnessDisabledMemoryConfiguration",
}) as any as S.Schema<HarnessDisabledMemoryConfiguration>;
export type HarnessMemoryConfiguration =
  | {
      agentCoreMemoryConfiguration: HarnessAgentCoreMemoryConfiguration;
      managedMemoryConfiguration?: never;
      disabled?: never;
    }
  | {
      agentCoreMemoryConfiguration?: never;
      managedMemoryConfiguration: HarnessManagedMemoryConfiguration;
      disabled?: never;
    }
  | {
      agentCoreMemoryConfiguration?: never;
      managedMemoryConfiguration?: never;
      disabled: HarnessDisabledMemoryConfiguration;
    };
export const HarnessMemoryConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({
    agentCoreMemoryConfiguration: HarnessAgentCoreMemoryConfiguration,
  }),
  S.Struct({ managedMemoryConfiguration: HarnessManagedMemoryConfiguration }),
  S.Struct({ disabled: HarnessDisabledMemoryConfiguration }),
]);
export type HarnessTruncationStrategy =
  | "sliding_window"
  | "summarization"
  | "none"
  | (string & {});
export const HarnessTruncationStrategy = S.String;

export interface HarnessSlidingWindowConfiguration {
  messagesCount?: number;
}
export const HarnessSlidingWindowConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ messagesCount: S.optional(S.Number) }),
).annotate({
  identifier: "HarnessSlidingWindowConfiguration",
}) as any as S.Schema<HarnessSlidingWindowConfiguration>;
export interface HarnessSummarizationConfiguration {
  summaryRatio?: number;
  preserveRecentMessages?: number;
  summarizationSystemPrompt?: string;
}
export const HarnessSummarizationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    summaryRatio: S.optional(S.Number),
    preserveRecentMessages: S.optional(S.Number),
    summarizationSystemPrompt: S.optional(S.String),
  }),
).annotate({
  identifier: "HarnessSummarizationConfiguration",
}) as any as S.Schema<HarnessSummarizationConfiguration>;
export type HarnessTruncationStrategyConfiguration =
  | { slidingWindow: HarnessSlidingWindowConfiguration; summarization?: never }
  | { slidingWindow?: never; summarization: HarnessSummarizationConfiguration };
export const HarnessTruncationStrategyConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ slidingWindow: HarnessSlidingWindowConfiguration }),
  S.Struct({ summarization: HarnessSummarizationConfiguration }),
]);
export interface HarnessTruncationConfiguration {
  strategy: HarnessTruncationStrategy;
  config?: HarnessTruncationStrategyConfiguration;
}
export const HarnessTruncationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    strategy: HarnessTruncationStrategy,
    config: S.optional(HarnessTruncationStrategyConfiguration),
  }),
).annotate({
  identifier: "HarnessTruncationConfiguration",
}) as any as S.Schema<HarnessTruncationConfiguration>;
export interface CreateHarnessRequest {
  harnessName: string;
  clientToken?: string;
  executionRoleArn: string;
  environment?: HarnessEnvironmentProviderRequest;
  environmentArtifact?: HarnessEnvironmentArtifact;
  environmentVariables?: { [key: string]: string | undefined };
  authorizerConfiguration?: AuthorizerConfiguration;
  model?: HarnessModelConfiguration;
  systemPrompt?: HarnessSystemContentBlock[];
  tools?: HarnessTool[];
  skills?: HarnessSkill[];
  allowedTools?: string[];
  memory?: HarnessMemoryConfiguration;
  truncation?: HarnessTruncationConfiguration;
  maxIterations?: number;
  maxTokens?: number;
  timeoutSeconds?: number;
  tags?: { [key: string]: string | undefined };
}
export const CreateHarnessRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    harnessName: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    executionRoleArn: S.String,
    environment: S.optional(HarnessEnvironmentProviderRequest),
    environmentArtifact: S.optional(HarnessEnvironmentArtifact),
    environmentVariables: S.optional(EnvironmentVariablesMap),
    authorizerConfiguration: S.optional(AuthorizerConfiguration),
    model: S.optional(HarnessModelConfiguration),
    systemPrompt: S.optional(HarnessSystemPrompt),
    tools: S.optional(HarnessTools),
    skills: S.optional(HarnessSkills),
    allowedTools: S.optional(HarnessAllowedTools),
    memory: S.optional(HarnessMemoryConfiguration),
    truncation: S.optional(HarnessTruncationConfiguration),
    maxIterations: S.optional(S.Number),
    maxTokens: S.optional(S.Number),
    timeoutSeconds: S.optional(S.Number),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/harnesses" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateHarnessRequest",
}) as any as S.Schema<CreateHarnessRequest>;
export type HarnessId = string;
export type HarnessArn = string;
export type HarnessStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "READY"
  | "DELETING"
  | "DELETE_FAILED"
  | (string & {});
export const HarnessStatus = S.String;

export type HarnessVersion = string;
export interface HarnessAgentCoreRuntimeEnvironment {
  agentRuntimeArn: string;
  agentRuntimeName: string;
  agentRuntimeId: string;
  lifecycleConfiguration: LifecycleConfiguration;
  networkConfiguration: NetworkConfiguration;
  filesystemConfigurations?: FilesystemConfiguration[];
}
export const HarnessAgentCoreRuntimeEnvironment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentRuntimeArn: S.String,
    agentRuntimeName: S.String,
    agentRuntimeId: S.String,
    lifecycleConfiguration: LifecycleConfiguration,
    networkConfiguration: NetworkConfiguration,
    filesystemConfigurations: S.optional(FilesystemConfigurations),
  }),
).annotate({
  identifier: "HarnessAgentCoreRuntimeEnvironment",
}) as any as S.Schema<HarnessAgentCoreRuntimeEnvironment>;
export type HarnessEnvironmentProvider = {
  agentCoreRuntimeEnvironment: HarnessAgentCoreRuntimeEnvironment;
};
export const HarnessEnvironmentProvider = /*@__PURE__*/ S.Union([
  S.Struct({ agentCoreRuntimeEnvironment: HarnessAgentCoreRuntimeEnvironment }),
]);
export interface Harness {
  harnessId: string;
  harnessName: string;
  arn: string;
  status: HarnessStatus;
  harnessVersion?: string;
  executionRoleArn: string;
  createdAt: Date;
  updatedAt: Date;
  model: HarnessModelConfiguration;
  systemPrompt: HarnessSystemContentBlock[];
  tools: HarnessTool[];
  skills: HarnessSkill[];
  allowedTools: string[];
  truncation: HarnessTruncationConfiguration;
  environment: HarnessEnvironmentProvider;
  environmentArtifact?: HarnessEnvironmentArtifact;
  environmentVariables?: { [key: string]: string | undefined };
  authorizerConfiguration?: AuthorizerConfiguration;
  memory?: HarnessMemoryConfiguration;
  maxIterations?: number;
  maxTokens?: number;
  timeoutSeconds?: number;
  failureReason?: string;
}
export const Harness = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    harnessId: S.String,
    harnessName: S.String,
    arn: S.String,
    status: HarnessStatus,
    harnessVersion: S.optional(S.String),
    executionRoleArn: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    model: HarnessModelConfiguration,
    systemPrompt: HarnessSystemPrompt,
    tools: HarnessTools,
    skills: HarnessSkills,
    allowedTools: HarnessAllowedTools,
    truncation: HarnessTruncationConfiguration,
    environment: HarnessEnvironmentProvider,
    environmentArtifact: S.optional(HarnessEnvironmentArtifact),
    environmentVariables: S.optional(EnvironmentVariablesMap),
    authorizerConfiguration: S.optional(AuthorizerConfiguration),
    memory: S.optional(HarnessMemoryConfiguration),
    maxIterations: S.optional(S.Number),
    maxTokens: S.optional(S.Number),
    timeoutSeconds: S.optional(S.Number),
    failureReason: S.optional(S.String),
  }),
).annotate({ identifier: "Harness" }) as any as S.Schema<Harness>;
export interface CreateHarnessResponse {
  harness: Harness;
}
export const CreateHarnessResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ harness: Harness }),
).annotate({
  identifier: "CreateHarnessResponse",
}) as any as S.Schema<CreateHarnessResponse>;
export type HarnessEndpointName = string;
export type HarnessEndpointDescription = string;
export interface CreateHarnessEndpointRequest {
  harnessId: string;
  endpointName: string;
  targetVersion?: string;
  description?: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateHarnessEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    harnessId: S.String.pipe(T.HttpLabel("harnessId")),
    endpointName: S.String,
    targetVersion: S.optional(S.String),
    description: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/harnesses/{harnessId}/endpoints" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateHarnessEndpointRequest",
}) as any as S.Schema<CreateHarnessEndpointRequest>;
export type HarnessEndpointArn = string;
export type HarnessEndpointStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "READY"
  | "DELETING"
  | "DELETE_FAILED"
  | (string & {});
export const HarnessEndpointStatus = S.String;

export interface HarnessEndpoint {
  harnessId: string;
  harnessName: string;
  endpointName: string;
  arn: string;
  status: HarnessEndpointStatus;
  createdAt: Date;
  updatedAt: Date;
  liveVersion?: string;
  targetVersion?: string;
  description?: string;
  failureReason?: string;
}
export const HarnessEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    harnessId: S.String,
    harnessName: S.String,
    endpointName: S.String,
    arn: S.String,
    status: HarnessEndpointStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    liveVersion: S.optional(S.String),
    targetVersion: S.optional(S.String),
    description: S.optional(S.String),
    failureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "HarnessEndpoint",
}) as any as S.Schema<HarnessEndpoint>;
export interface CreateHarnessEndpointResponse {
  endpoint: HarnessEndpoint;
}
export const CreateHarnessEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ endpoint: HarnessEndpoint }),
).annotate({
  identifier: "CreateHarnessEndpointResponse",
}) as any as S.Schema<CreateHarnessEndpointResponse>;
export type Name = string;
export type Arn = string;
export type Namespace = string;
export type NamespacesList = string[];
export const NamespacesList = /*@__PURE__*/ S.Array(S.String);
export type MetadataKey = string;
export type MetadataValueType =
  | "STRING"
  | "STRINGLIST"
  | "NUMBER"
  | (string & {});
export const MetadataValueType = S.String;

export type ExtractionType =
  | "LLM_INFERRED"
  | "STRICTLY_CONSISTENT"
  | (string & {});
export const ExtractionType = S.String;

export type LlmExtractionInstruction = string | redacted.Redacted<string>;
export type Definition = string | redacted.Redacted<string>;
export type AllowedStringValue = string;
export type AllowedStringValuesList = string[];
export const AllowedStringValuesList = /*@__PURE__*/ S.Array(S.String);
export interface StringValidation {
  allowedValues: string[];
}
export const StringValidation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ allowedValues: AllowedStringValuesList }),
).annotate({
  identifier: "StringValidation",
}) as any as S.Schema<StringValidation>;
export type AllowedStringListValue = string;
export type AllowedStringListValuesList = string[];
export const AllowedStringListValuesList = /*@__PURE__*/ S.Array(S.String);
export interface StringListValidation {
  allowedValues?: string[];
  maxItems?: number;
}
export const StringListValidation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    allowedValues: S.optional(AllowedStringListValuesList),
    maxItems: S.optional(S.Number),
  }),
).annotate({
  identifier: "StringListValidation",
}) as any as S.Schema<StringListValidation>;
export interface NumberValidation {
  minValue?: number;
  maxValue?: number;
}
export const NumberValidation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ minValue: S.optional(S.Number), maxValue: S.optional(S.Number) }),
).annotate({
  identifier: "NumberValidation",
}) as any as S.Schema<NumberValidation>;
export type Validation =
  | {
      stringValidation: StringValidation;
      stringListValidation?: never;
      numberValidation?: never;
    }
  | {
      stringValidation?: never;
      stringListValidation: StringListValidation;
      numberValidation?: never;
    }
  | {
      stringValidation?: never;
      stringListValidation?: never;
      numberValidation: NumberValidation;
    };
export const Validation = /*@__PURE__*/ S.Union([
  S.Struct({ stringValidation: StringValidation }),
  S.Struct({ stringListValidation: StringListValidation }),
  S.Struct({ numberValidation: NumberValidation }),
]);
export interface LlmExtractionConfig {
  llmExtractionInstruction?: string | redacted.Redacted<string>;
  definition: string | redacted.Redacted<string>;
  validation?: Validation;
}
export const LlmExtractionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    llmExtractionInstruction: S.optional(SensitiveString),
    definition: SensitiveString,
    validation: S.optional(Validation),
  }),
).annotate({
  identifier: "LlmExtractionConfig",
}) as any as S.Schema<LlmExtractionConfig>;
export type ExtractionConfig = { llmExtractionConfig: LlmExtractionConfig };
export const ExtractionConfig = /*@__PURE__*/ S.Union([
  S.Struct({ llmExtractionConfig: LlmExtractionConfig }),
]);
export interface MetadataSchemaEntry {
  key: string;
  type?: MetadataValueType;
  extractionType?: ExtractionType;
  extractionConfig?: ExtractionConfig;
}
export const MetadataSchemaEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    key: S.String,
    type: S.optional(MetadataValueType),
    extractionType: S.optional(ExtractionType),
    extractionConfig: S.optional(ExtractionConfig),
  }),
).annotate({
  identifier: "MetadataSchemaEntry",
}) as any as S.Schema<MetadataSchemaEntry>;
export type MetadataSchemaList = MetadataSchemaEntry[];
export const MetadataSchemaList = /*@__PURE__*/ S.Array(MetadataSchemaEntry);
export interface MemoryRecordSchema {
  metadataSchema?: MetadataSchemaEntry[];
}
export const MemoryRecordSchema = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ metadataSchema: S.optional(MetadataSchemaList) }),
).annotate({
  identifier: "MemoryRecordSchema",
}) as any as S.Schema<MemoryRecordSchema>;
export interface SemanticMemoryStrategyInput {
  name: string;
  description?: string | redacted.Redacted<string>;
  namespaces?: string[];
  namespaceTemplates?: string[];
  memoryRecordSchema?: MemoryRecordSchema;
}
export const SemanticMemoryStrategyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(SensitiveString),
    namespaces: S.optional(NamespacesList),
    namespaceTemplates: S.optional(NamespacesList),
    memoryRecordSchema: S.optional(MemoryRecordSchema),
  }),
).annotate({
  identifier: "SemanticMemoryStrategyInput",
}) as any as S.Schema<SemanticMemoryStrategyInput>;
export interface SummaryMemoryStrategyInput {
  name: string;
  description?: string | redacted.Redacted<string>;
  namespaces?: string[];
  namespaceTemplates?: string[];
  memoryRecordSchema?: MemoryRecordSchema;
}
export const SummaryMemoryStrategyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(SensitiveString),
    namespaces: S.optional(NamespacesList),
    namespaceTemplates: S.optional(NamespacesList),
    memoryRecordSchema: S.optional(MemoryRecordSchema),
  }),
).annotate({
  identifier: "SummaryMemoryStrategyInput",
}) as any as S.Schema<SummaryMemoryStrategyInput>;
export interface UserPreferenceMemoryStrategyInput {
  name: string;
  description?: string | redacted.Redacted<string>;
  namespaces?: string[];
  namespaceTemplates?: string[];
  memoryRecordSchema?: MemoryRecordSchema;
}
export const UserPreferenceMemoryStrategyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(SensitiveString),
    namespaces: S.optional(NamespacesList),
    namespaceTemplates: S.optional(NamespacesList),
    memoryRecordSchema: S.optional(MemoryRecordSchema),
  }),
).annotate({
  identifier: "UserPreferenceMemoryStrategyInput",
}) as any as S.Schema<UserPreferenceMemoryStrategyInput>;
export type Prompt = string | redacted.Redacted<string>;
export interface SemanticOverrideExtractionConfigurationInput {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export const SemanticOverrideExtractionConfigurationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ appendToPrompt: SensitiveString, modelId: S.String }),
  ).annotate({
    identifier: "SemanticOverrideExtractionConfigurationInput",
  }) as any as S.Schema<SemanticOverrideExtractionConfigurationInput>;
export interface SemanticOverrideConsolidationConfigurationInput {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export const SemanticOverrideConsolidationConfigurationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ appendToPrompt: SensitiveString, modelId: S.String }),
  ).annotate({
    identifier: "SemanticOverrideConsolidationConfigurationInput",
  }) as any as S.Schema<SemanticOverrideConsolidationConfigurationInput>;
export interface SemanticOverrideConfigurationInput {
  extraction?: SemanticOverrideExtractionConfigurationInput;
  consolidation?: SemanticOverrideConsolidationConfigurationInput;
}
export const SemanticOverrideConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    extraction: S.optional(SemanticOverrideExtractionConfigurationInput),
    consolidation: S.optional(SemanticOverrideConsolidationConfigurationInput),
  }),
).annotate({
  identifier: "SemanticOverrideConfigurationInput",
}) as any as S.Schema<SemanticOverrideConfigurationInput>;
export interface SummaryOverrideConsolidationConfigurationInput {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export const SummaryOverrideConsolidationConfigurationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ appendToPrompt: SensitiveString, modelId: S.String }),
  ).annotate({
    identifier: "SummaryOverrideConsolidationConfigurationInput",
  }) as any as S.Schema<SummaryOverrideConsolidationConfigurationInput>;
export interface SummaryOverrideConfigurationInput {
  consolidation?: SummaryOverrideConsolidationConfigurationInput;
}
export const SummaryOverrideConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    consolidation: S.optional(SummaryOverrideConsolidationConfigurationInput),
  }),
).annotate({
  identifier: "SummaryOverrideConfigurationInput",
}) as any as S.Schema<SummaryOverrideConfigurationInput>;
export interface UserPreferenceOverrideExtractionConfigurationInput {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export const UserPreferenceOverrideExtractionConfigurationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ appendToPrompt: SensitiveString, modelId: S.String }),
  ).annotate({
    identifier: "UserPreferenceOverrideExtractionConfigurationInput",
  }) as any as S.Schema<UserPreferenceOverrideExtractionConfigurationInput>;
export interface UserPreferenceOverrideConsolidationConfigurationInput {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export const UserPreferenceOverrideConsolidationConfigurationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ appendToPrompt: SensitiveString, modelId: S.String }),
  ).annotate({
    identifier: "UserPreferenceOverrideConsolidationConfigurationInput",
  }) as any as S.Schema<UserPreferenceOverrideConsolidationConfigurationInput>;
export interface UserPreferenceOverrideConfigurationInput {
  extraction?: UserPreferenceOverrideExtractionConfigurationInput;
  consolidation?: UserPreferenceOverrideConsolidationConfigurationInput;
}
export const UserPreferenceOverrideConfigurationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      extraction: S.optional(
        UserPreferenceOverrideExtractionConfigurationInput,
      ),
      consolidation: S.optional(
        UserPreferenceOverrideConsolidationConfigurationInput,
      ),
    }),
).annotate({
  identifier: "UserPreferenceOverrideConfigurationInput",
}) as any as S.Schema<UserPreferenceOverrideConfigurationInput>;
export interface EpisodicOverrideExtractionConfigurationInput {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export const EpisodicOverrideExtractionConfigurationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ appendToPrompt: SensitiveString, modelId: S.String }),
  ).annotate({
    identifier: "EpisodicOverrideExtractionConfigurationInput",
  }) as any as S.Schema<EpisodicOverrideExtractionConfigurationInput>;
export interface EpisodicOverrideConsolidationConfigurationInput {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export const EpisodicOverrideConsolidationConfigurationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ appendToPrompt: SensitiveString, modelId: S.String }),
  ).annotate({
    identifier: "EpisodicOverrideConsolidationConfigurationInput",
  }) as any as S.Schema<EpisodicOverrideConsolidationConfigurationInput>;
export interface EpisodicOverrideReflectionConfigurationInput {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
  namespaces?: string[];
  namespaceTemplates?: string[];
  memoryRecordSchema?: MemoryRecordSchema;
}
export const EpisodicOverrideReflectionConfigurationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      appendToPrompt: SensitiveString,
      modelId: S.String,
      namespaces: S.optional(NamespacesList),
      namespaceTemplates: S.optional(NamespacesList),
      memoryRecordSchema: S.optional(MemoryRecordSchema),
    }),
  ).annotate({
    identifier: "EpisodicOverrideReflectionConfigurationInput",
  }) as any as S.Schema<EpisodicOverrideReflectionConfigurationInput>;
export interface EpisodicOverrideConfigurationInput {
  extraction?: EpisodicOverrideExtractionConfigurationInput;
  consolidation?: EpisodicOverrideConsolidationConfigurationInput;
  reflection?: EpisodicOverrideReflectionConfigurationInput;
}
export const EpisodicOverrideConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    extraction: S.optional(EpisodicOverrideExtractionConfigurationInput),
    consolidation: S.optional(EpisodicOverrideConsolidationConfigurationInput),
    reflection: S.optional(EpisodicOverrideReflectionConfigurationInput),
  }),
).annotate({
  identifier: "EpisodicOverrideConfigurationInput",
}) as any as S.Schema<EpisodicOverrideConfigurationInput>;
export interface MessageBasedTriggerInput {
  messageCount?: number;
}
export const MessageBasedTriggerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ messageCount: S.optional(S.Number) }),
).annotate({
  identifier: "MessageBasedTriggerInput",
}) as any as S.Schema<MessageBasedTriggerInput>;
export interface TokenBasedTriggerInput {
  tokenCount?: number;
}
export const TokenBasedTriggerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tokenCount: S.optional(S.Number) }),
).annotate({
  identifier: "TokenBasedTriggerInput",
}) as any as S.Schema<TokenBasedTriggerInput>;
export interface TimeBasedTriggerInput {
  idleSessionTimeout?: number;
}
export const TimeBasedTriggerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ idleSessionTimeout: S.optional(S.Number) }),
).annotate({
  identifier: "TimeBasedTriggerInput",
}) as any as S.Schema<TimeBasedTriggerInput>;
export type TriggerConditionInput =
  | {
      messageBasedTrigger: MessageBasedTriggerInput;
      tokenBasedTrigger?: never;
      timeBasedTrigger?: never;
    }
  | {
      messageBasedTrigger?: never;
      tokenBasedTrigger: TokenBasedTriggerInput;
      timeBasedTrigger?: never;
    }
  | {
      messageBasedTrigger?: never;
      tokenBasedTrigger?: never;
      timeBasedTrigger: TimeBasedTriggerInput;
    };
export const TriggerConditionInput = /*@__PURE__*/ S.Union([
  S.Struct({ messageBasedTrigger: MessageBasedTriggerInput }),
  S.Struct({ tokenBasedTrigger: TokenBasedTriggerInput }),
  S.Struct({ timeBasedTrigger: TimeBasedTriggerInput }),
]);
export type TriggerConditionInputList = TriggerConditionInput[];
export const TriggerConditionInputList = /*@__PURE__*/ S.Array(
  TriggerConditionInput,
);
export interface InvocationConfigurationInput {
  topicArn: string;
  payloadDeliveryBucketName: string;
}
export const InvocationConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ topicArn: S.String, payloadDeliveryBucketName: S.String }),
).annotate({
  identifier: "InvocationConfigurationInput",
}) as any as S.Schema<InvocationConfigurationInput>;
export interface SelfManagedConfigurationInput {
  triggerConditions?: TriggerConditionInput[];
  invocationConfiguration: InvocationConfigurationInput;
  historicalContextWindowSize?: number;
}
export const SelfManagedConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    triggerConditions: S.optional(TriggerConditionInputList),
    invocationConfiguration: InvocationConfigurationInput,
    historicalContextWindowSize: S.optional(S.Number),
  }),
).annotate({
  identifier: "SelfManagedConfigurationInput",
}) as any as S.Schema<SelfManagedConfigurationInput>;
export type CustomConfigurationInput =
  | {
      semanticOverride: SemanticOverrideConfigurationInput;
      summaryOverride?: never;
      userPreferenceOverride?: never;
      episodicOverride?: never;
      selfManagedConfiguration?: never;
    }
  | {
      semanticOverride?: never;
      summaryOverride: SummaryOverrideConfigurationInput;
      userPreferenceOverride?: never;
      episodicOverride?: never;
      selfManagedConfiguration?: never;
    }
  | {
      semanticOverride?: never;
      summaryOverride?: never;
      userPreferenceOverride: UserPreferenceOverrideConfigurationInput;
      episodicOverride?: never;
      selfManagedConfiguration?: never;
    }
  | {
      semanticOverride?: never;
      summaryOverride?: never;
      userPreferenceOverride?: never;
      episodicOverride: EpisodicOverrideConfigurationInput;
      selfManagedConfiguration?: never;
    }
  | {
      semanticOverride?: never;
      summaryOverride?: never;
      userPreferenceOverride?: never;
      episodicOverride?: never;
      selfManagedConfiguration: SelfManagedConfigurationInput;
    };
export const CustomConfigurationInput = /*@__PURE__*/ S.Union([
  S.Struct({ semanticOverride: SemanticOverrideConfigurationInput }),
  S.Struct({ summaryOverride: SummaryOverrideConfigurationInput }),
  S.Struct({
    userPreferenceOverride: UserPreferenceOverrideConfigurationInput,
  }),
  S.Struct({ episodicOverride: EpisodicOverrideConfigurationInput }),
  S.Struct({ selfManagedConfiguration: SelfManagedConfigurationInput }),
]);
export interface CustomMemoryStrategyInput {
  name: string;
  description?: string | redacted.Redacted<string>;
  namespaces?: string[];
  namespaceTemplates?: string[];
  configuration?: CustomConfigurationInput;
  memoryRecordSchema?: MemoryRecordSchema;
}
export const CustomMemoryStrategyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(SensitiveString),
    namespaces: S.optional(NamespacesList),
    namespaceTemplates: S.optional(NamespacesList),
    configuration: S.optional(CustomConfigurationInput),
    memoryRecordSchema: S.optional(MemoryRecordSchema),
  }),
).annotate({
  identifier: "CustomMemoryStrategyInput",
}) as any as S.Schema<CustomMemoryStrategyInput>;
export interface EpisodicReflectionConfigurationInput {
  namespaces?: string[];
  namespaceTemplates?: string[];
  memoryRecordSchema?: MemoryRecordSchema;
}
export const EpisodicReflectionConfigurationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      namespaces: S.optional(NamespacesList),
      namespaceTemplates: S.optional(NamespacesList),
      memoryRecordSchema: S.optional(MemoryRecordSchema),
    }),
).annotate({
  identifier: "EpisodicReflectionConfigurationInput",
}) as any as S.Schema<EpisodicReflectionConfigurationInput>;
export interface EpisodicMemoryStrategyInput {
  name: string;
  description?: string | redacted.Redacted<string>;
  namespaces?: string[];
  namespaceTemplates?: string[];
  reflectionConfiguration?: EpisodicReflectionConfigurationInput;
  memoryRecordSchema?: MemoryRecordSchema;
}
export const EpisodicMemoryStrategyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(SensitiveString),
    namespaces: S.optional(NamespacesList),
    namespaceTemplates: S.optional(NamespacesList),
    reflectionConfiguration: S.optional(EpisodicReflectionConfigurationInput),
    memoryRecordSchema: S.optional(MemoryRecordSchema),
  }),
).annotate({
  identifier: "EpisodicMemoryStrategyInput",
}) as any as S.Schema<EpisodicMemoryStrategyInput>;
export type MemoryStrategyInput =
  | {
      semanticMemoryStrategy: SemanticMemoryStrategyInput;
      summaryMemoryStrategy?: never;
      userPreferenceMemoryStrategy?: never;
      customMemoryStrategy?: never;
      episodicMemoryStrategy?: never;
    }
  | {
      semanticMemoryStrategy?: never;
      summaryMemoryStrategy: SummaryMemoryStrategyInput;
      userPreferenceMemoryStrategy?: never;
      customMemoryStrategy?: never;
      episodicMemoryStrategy?: never;
    }
  | {
      semanticMemoryStrategy?: never;
      summaryMemoryStrategy?: never;
      userPreferenceMemoryStrategy: UserPreferenceMemoryStrategyInput;
      customMemoryStrategy?: never;
      episodicMemoryStrategy?: never;
    }
  | {
      semanticMemoryStrategy?: never;
      summaryMemoryStrategy?: never;
      userPreferenceMemoryStrategy?: never;
      customMemoryStrategy: CustomMemoryStrategyInput;
      episodicMemoryStrategy?: never;
    }
  | {
      semanticMemoryStrategy?: never;
      summaryMemoryStrategy?: never;
      userPreferenceMemoryStrategy?: never;
      customMemoryStrategy?: never;
      episodicMemoryStrategy: EpisodicMemoryStrategyInput;
    };
export const MemoryStrategyInput = /*@__PURE__*/ S.Union([
  S.Struct({ semanticMemoryStrategy: SemanticMemoryStrategyInput }),
  S.Struct({ summaryMemoryStrategy: SummaryMemoryStrategyInput }),
  S.Struct({ userPreferenceMemoryStrategy: UserPreferenceMemoryStrategyInput }),
  S.Struct({ customMemoryStrategy: CustomMemoryStrategyInput }),
  S.Struct({ episodicMemoryStrategy: EpisodicMemoryStrategyInput }),
]);
export type MemoryStrategyInputList = MemoryStrategyInput[];
export const MemoryStrategyInputList =
  /*@__PURE__*/ S.Array(MemoryStrategyInput);
export interface IndexedKey {
  key: string;
  type: MetadataValueType;
}
export const IndexedKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, type: MetadataValueType }),
).annotate({ identifier: "IndexedKey" }) as any as S.Schema<IndexedKey>;
export type IndexedKeysList = IndexedKey[];
export const IndexedKeysList = /*@__PURE__*/ S.Array(IndexedKey);
export type NamespaceVariableKey = string;
export type NamespaceAllowedValue = string;
export type NamespaceAllowedValuesList = string[];
export const NamespaceAllowedValuesList = /*@__PURE__*/ S.Array(S.String);
export type NamespaceRegexPattern = string;
export interface NamespaceKeyValidation {
  allowedValues?: string[];
  regexPattern?: string;
}
export const NamespaceKeyValidation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    allowedValues: S.optional(NamespaceAllowedValuesList),
    regexPattern: S.optional(S.String),
  }),
).annotate({
  identifier: "NamespaceKeyValidation",
}) as any as S.Schema<NamespaceKeyValidation>;
export interface NamespaceKeyEntry {
  key: string;
  validation?: NamespaceKeyValidation;
}
export const NamespaceKeyEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, validation: S.optional(NamespaceKeyValidation) }),
).annotate({
  identifier: "NamespaceKeyEntry",
}) as any as S.Schema<NamespaceKeyEntry>;
export type NamespaceKeysList = NamespaceKeyEntry[];
export const NamespaceKeysList = /*@__PURE__*/ S.Array(NamespaceKeyEntry);
export type ContentType = "MEMORY_RECORDS" | (string & {});
export const ContentType = S.String;

export type ContentLevel = "METADATA_ONLY" | "FULL_CONTENT" | (string & {});
export const ContentLevel = S.String;

export interface ContentConfiguration {
  type: ContentType;
  level?: ContentLevel;
}
export const ContentConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: ContentType, level: S.optional(ContentLevel) }),
).annotate({
  identifier: "ContentConfiguration",
}) as any as S.Schema<ContentConfiguration>;
export type ContentConfigurationList = ContentConfiguration[];
export const ContentConfigurationList =
  /*@__PURE__*/ S.Array(ContentConfiguration);
export interface KinesisResource {
  dataStreamArn: string;
  contentConfigurations: ContentConfiguration[];
}
export const KinesisResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataStreamArn: S.String,
    contentConfigurations: ContentConfigurationList,
  }),
).annotate({
  identifier: "KinesisResource",
}) as any as S.Schema<KinesisResource>;
export type StreamDeliveryResource = { kinesis: KinesisResource };
export const StreamDeliveryResource = /*@__PURE__*/ S.Union([
  S.Struct({ kinesis: KinesisResource }),
]);
export type StreamDeliveryResourcesList = StreamDeliveryResource[];
export const StreamDeliveryResourcesList = /*@__PURE__*/ S.Array(
  StreamDeliveryResource,
);
export interface StreamDeliveryResources {
  resources: StreamDeliveryResource[];
}
export const StreamDeliveryResources = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resources: StreamDeliveryResourcesList }),
).annotate({
  identifier: "StreamDeliveryResources",
}) as any as S.Schema<StreamDeliveryResources>;
export interface CreateMemoryInput {
  clientToken?: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  encryptionKeyArn?: string;
  memoryExecutionRoleArn?: string;
  eventExpiryDuration: number;
  memoryStrategies?: MemoryStrategyInput[];
  indexedKeys?: IndexedKey[];
  namespaceKeys?: NamespaceKeyEntry[];
  streamDeliveryResources?: StreamDeliveryResources;
  tags?: { [key: string]: string | undefined };
}
export const CreateMemoryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    name: S.String,
    description: S.optional(SensitiveString),
    encryptionKeyArn: S.optional(S.String),
    memoryExecutionRoleArn: S.optional(S.String),
    eventExpiryDuration: S.Number,
    memoryStrategies: S.optional(MemoryStrategyInputList),
    indexedKeys: S.optional(IndexedKeysList),
    namespaceKeys: S.optional(NamespaceKeysList),
    streamDeliveryResources: S.optional(StreamDeliveryResources),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/memories/create" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMemoryInput",
}) as any as S.Schema<CreateMemoryInput>;
export type MemoryId = string;
export type MemoryStatus =
  | "CREATING"
  | "ACTIVE"
  | "FAILED"
  | "DELETING"
  | "UPDATING"
  | (string & {});
export const MemoryStatus = S.String;

export type MemoryStrategyId = string;
export type OverrideType =
  | "SEMANTIC_OVERRIDE"
  | "SUMMARY_OVERRIDE"
  | "USER_PREFERENCE_OVERRIDE"
  | "SELF_MANAGED"
  | "EPISODIC_OVERRIDE"
  | (string & {});
export const OverrideType = S.String;

export interface SemanticExtractionOverride {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export const SemanticExtractionOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ appendToPrompt: SensitiveString, modelId: S.String }),
).annotate({
  identifier: "SemanticExtractionOverride",
}) as any as S.Schema<SemanticExtractionOverride>;
export interface UserPreferenceExtractionOverride {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export const UserPreferenceExtractionOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ appendToPrompt: SensitiveString, modelId: S.String }),
).annotate({
  identifier: "UserPreferenceExtractionOverride",
}) as any as S.Schema<UserPreferenceExtractionOverride>;
export interface EpisodicExtractionOverride {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export const EpisodicExtractionOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ appendToPrompt: SensitiveString, modelId: S.String }),
).annotate({
  identifier: "EpisodicExtractionOverride",
}) as any as S.Schema<EpisodicExtractionOverride>;
export type CustomExtractionConfiguration =
  | {
      semanticExtractionOverride: SemanticExtractionOverride;
      userPreferenceExtractionOverride?: never;
      episodicExtractionOverride?: never;
    }
  | {
      semanticExtractionOverride?: never;
      userPreferenceExtractionOverride: UserPreferenceExtractionOverride;
      episodicExtractionOverride?: never;
    }
  | {
      semanticExtractionOverride?: never;
      userPreferenceExtractionOverride?: never;
      episodicExtractionOverride: EpisodicExtractionOverride;
    };
export const CustomExtractionConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ semanticExtractionOverride: SemanticExtractionOverride }),
  S.Struct({
    userPreferenceExtractionOverride: UserPreferenceExtractionOverride,
  }),
  S.Struct({ episodicExtractionOverride: EpisodicExtractionOverride }),
]);
export type ExtractionConfiguration = {
  customExtractionConfiguration: CustomExtractionConfiguration;
};
export const ExtractionConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ customExtractionConfiguration: CustomExtractionConfiguration }),
]);
export interface SemanticConsolidationOverride {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export const SemanticConsolidationOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ appendToPrompt: SensitiveString, modelId: S.String }),
).annotate({
  identifier: "SemanticConsolidationOverride",
}) as any as S.Schema<SemanticConsolidationOverride>;
export interface SummaryConsolidationOverride {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export const SummaryConsolidationOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ appendToPrompt: SensitiveString, modelId: S.String }),
).annotate({
  identifier: "SummaryConsolidationOverride",
}) as any as S.Schema<SummaryConsolidationOverride>;
export interface UserPreferenceConsolidationOverride {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export const UserPreferenceConsolidationOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ appendToPrompt: SensitiveString, modelId: S.String }),
).annotate({
  identifier: "UserPreferenceConsolidationOverride",
}) as any as S.Schema<UserPreferenceConsolidationOverride>;
export interface EpisodicConsolidationOverride {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
}
export const EpisodicConsolidationOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ appendToPrompt: SensitiveString, modelId: S.String }),
).annotate({
  identifier: "EpisodicConsolidationOverride",
}) as any as S.Schema<EpisodicConsolidationOverride>;
export type CustomConsolidationConfiguration =
  | {
      semanticConsolidationOverride: SemanticConsolidationOverride;
      summaryConsolidationOverride?: never;
      userPreferenceConsolidationOverride?: never;
      episodicConsolidationOverride?: never;
    }
  | {
      semanticConsolidationOverride?: never;
      summaryConsolidationOverride: SummaryConsolidationOverride;
      userPreferenceConsolidationOverride?: never;
      episodicConsolidationOverride?: never;
    }
  | {
      semanticConsolidationOverride?: never;
      summaryConsolidationOverride?: never;
      userPreferenceConsolidationOverride: UserPreferenceConsolidationOverride;
      episodicConsolidationOverride?: never;
    }
  | {
      semanticConsolidationOverride?: never;
      summaryConsolidationOverride?: never;
      userPreferenceConsolidationOverride?: never;
      episodicConsolidationOverride: EpisodicConsolidationOverride;
    };
export const CustomConsolidationConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ semanticConsolidationOverride: SemanticConsolidationOverride }),
  S.Struct({ summaryConsolidationOverride: SummaryConsolidationOverride }),
  S.Struct({
    userPreferenceConsolidationOverride: UserPreferenceConsolidationOverride,
  }),
  S.Struct({ episodicConsolidationOverride: EpisodicConsolidationOverride }),
]);
export type ConsolidationConfiguration = {
  customConsolidationConfiguration: CustomConsolidationConfiguration;
};
export const ConsolidationConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({
    customConsolidationConfiguration: CustomConsolidationConfiguration,
  }),
]);
export interface EpisodicReflectionOverride {
  appendToPrompt: string | redacted.Redacted<string>;
  modelId: string;
  namespaces?: string[];
  namespaceTemplates?: string[];
  memoryRecordSchema?: MemoryRecordSchema;
}
export const EpisodicReflectionOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appendToPrompt: SensitiveString,
    modelId: S.String,
    namespaces: S.optional(NamespacesList),
    namespaceTemplates: S.optional(NamespacesList),
    memoryRecordSchema: S.optional(MemoryRecordSchema),
  }),
).annotate({
  identifier: "EpisodicReflectionOverride",
}) as any as S.Schema<EpisodicReflectionOverride>;
export type CustomReflectionConfiguration = {
  episodicReflectionOverride: EpisodicReflectionOverride;
};
export const CustomReflectionConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ episodicReflectionOverride: EpisodicReflectionOverride }),
]);
export interface EpisodicReflectionConfiguration {
  namespaces?: string[];
  namespaceTemplates?: string[];
  memoryRecordSchema?: MemoryRecordSchema;
}
export const EpisodicReflectionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    namespaces: S.optional(NamespacesList),
    namespaceTemplates: S.optional(NamespacesList),
    memoryRecordSchema: S.optional(MemoryRecordSchema),
  }),
).annotate({
  identifier: "EpisodicReflectionConfiguration",
}) as any as S.Schema<EpisodicReflectionConfiguration>;
export type ReflectionConfiguration =
  | {
      customReflectionConfiguration: CustomReflectionConfiguration;
      episodicReflectionConfiguration?: never;
    }
  | {
      customReflectionConfiguration?: never;
      episodicReflectionConfiguration: EpisodicReflectionConfiguration;
    };
export const ReflectionConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ customReflectionConfiguration: CustomReflectionConfiguration }),
  S.Struct({
    episodicReflectionConfiguration: EpisodicReflectionConfiguration,
  }),
]);
export interface MessageBasedTrigger {
  messageCount?: number;
}
export const MessageBasedTrigger = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ messageCount: S.optional(S.Number) }),
).annotate({
  identifier: "MessageBasedTrigger",
}) as any as S.Schema<MessageBasedTrigger>;
export interface TokenBasedTrigger {
  tokenCount?: number;
}
export const TokenBasedTrigger = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tokenCount: S.optional(S.Number) }),
).annotate({
  identifier: "TokenBasedTrigger",
}) as any as S.Schema<TokenBasedTrigger>;
export interface TimeBasedTrigger {
  idleSessionTimeout?: number;
}
export const TimeBasedTrigger = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ idleSessionTimeout: S.optional(S.Number) }),
).annotate({
  identifier: "TimeBasedTrigger",
}) as any as S.Schema<TimeBasedTrigger>;
export type TriggerCondition =
  | {
      messageBasedTrigger: MessageBasedTrigger;
      tokenBasedTrigger?: never;
      timeBasedTrigger?: never;
    }
  | {
      messageBasedTrigger?: never;
      tokenBasedTrigger: TokenBasedTrigger;
      timeBasedTrigger?: never;
    }
  | {
      messageBasedTrigger?: never;
      tokenBasedTrigger?: never;
      timeBasedTrigger: TimeBasedTrigger;
    };
export const TriggerCondition = /*@__PURE__*/ S.Union([
  S.Struct({ messageBasedTrigger: MessageBasedTrigger }),
  S.Struct({ tokenBasedTrigger: TokenBasedTrigger }),
  S.Struct({ timeBasedTrigger: TimeBasedTrigger }),
]);
export type TriggerConditionsList = TriggerCondition[];
export const TriggerConditionsList = /*@__PURE__*/ S.Array(TriggerCondition);
export interface InvocationConfiguration {
  topicArn: string;
  payloadDeliveryBucketName: string;
}
export const InvocationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ topicArn: S.String, payloadDeliveryBucketName: S.String }),
).annotate({
  identifier: "InvocationConfiguration",
}) as any as S.Schema<InvocationConfiguration>;
export interface SelfManagedConfiguration {
  triggerConditions: TriggerCondition[];
  invocationConfiguration: InvocationConfiguration;
  historicalContextWindowSize: number;
}
export const SelfManagedConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    triggerConditions: TriggerConditionsList,
    invocationConfiguration: InvocationConfiguration,
    historicalContextWindowSize: S.Number,
  }),
).annotate({
  identifier: "SelfManagedConfiguration",
}) as any as S.Schema<SelfManagedConfiguration>;
export interface StrategyConfiguration {
  type?: OverrideType;
  extraction?: ExtractionConfiguration;
  consolidation?: ConsolidationConfiguration;
  reflection?: ReflectionConfiguration;
  selfManagedConfiguration?: SelfManagedConfiguration;
}
export const StrategyConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(OverrideType),
    extraction: S.optional(ExtractionConfiguration),
    consolidation: S.optional(ConsolidationConfiguration),
    reflection: S.optional(ReflectionConfiguration),
    selfManagedConfiguration: S.optional(SelfManagedConfiguration),
  }),
).annotate({
  identifier: "StrategyConfiguration",
}) as any as S.Schema<StrategyConfiguration>;
export type MemoryStrategyType =
  | "SEMANTIC"
  | "SUMMARIZATION"
  | "USER_PREFERENCE"
  | "CUSTOM"
  | "EPISODIC"
  | (string & {});
export const MemoryStrategyType = S.String;

export type MemoryStrategyStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | (string & {});
export const MemoryStrategyStatus = S.String;

export interface MemoryStrategy {
  strategyId: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  configuration?: StrategyConfiguration;
  type: MemoryStrategyType;
  namespaces: string[];
  namespaceTemplates: string[];
  createdAt?: Date;
  updatedAt?: Date;
  status?: MemoryStrategyStatus;
  memoryRecordSchema?: MemoryRecordSchema;
}
export const MemoryStrategy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    strategyId: S.String,
    name: S.String,
    description: S.optional(SensitiveString),
    configuration: S.optional(StrategyConfiguration),
    type: MemoryStrategyType,
    namespaces: NamespacesList,
    namespaceTemplates: NamespacesList,
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    status: S.optional(MemoryStrategyStatus),
    memoryRecordSchema: S.optional(MemoryRecordSchema),
  }),
).annotate({ identifier: "MemoryStrategy" }) as any as S.Schema<MemoryStrategy>;
export type MemoryStrategyList = MemoryStrategy[];
export const MemoryStrategyList = /*@__PURE__*/ S.Array(MemoryStrategy);
export interface Memory {
  arn: string;
  id: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  encryptionKeyArn?: string;
  memoryExecutionRoleArn?: string;
  eventExpiryDuration: number;
  status: MemoryStatus;
  failureReason?: string;
  createdAt: Date;
  updatedAt: Date;
  strategies?: MemoryStrategy[];
  indexedKeys?: IndexedKey[];
  namespaceKeys?: NamespaceKeyEntry[];
  streamDeliveryResources?: StreamDeliveryResources;
  managedByResourceArn?: string;
}
export const Memory = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    id: S.String,
    name: S.String,
    description: S.optional(SensitiveString),
    encryptionKeyArn: S.optional(S.String),
    memoryExecutionRoleArn: S.optional(S.String),
    eventExpiryDuration: S.Number,
    status: MemoryStatus,
    failureReason: S.optional(S.String),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    strategies: S.optional(MemoryStrategyList),
    indexedKeys: S.optional(IndexedKeysList),
    namespaceKeys: S.optional(NamespaceKeysList),
    streamDeliveryResources: S.optional(StreamDeliveryResources),
    managedByResourceArn: S.optional(S.String),
  }),
).annotate({ identifier: "Memory" }) as any as S.Schema<Memory>;
export interface CreateMemoryOutput {
  memory?: Memory;
}
export const CreateMemoryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ memory: S.optional(Memory) }),
).annotate({
  identifier: "CreateMemoryOutput",
}) as any as S.Schema<CreateMemoryOutput>;
export type CredentialProviderVendorType =
  | "GoogleOauth2"
  | "GithubOauth2"
  | "SlackOauth2"
  | "SalesforceOauth2"
  | "MicrosoftOauth2"
  | "CustomOauth2"
  | "AtlassianOauth2"
  | "LinkedinOauth2"
  | "XOauth2"
  | "OktaOauth2"
  | "OneLoginOauth2"
  | "PingOneOauth2"
  | "FacebookOauth2"
  | "YandexOauth2"
  | "RedditOauth2"
  | "ZoomOauth2"
  | "TwitchOauth2"
  | "SpotifyOauth2"
  | "DropboxOauth2"
  | "NotionOauth2"
  | "HubspotOauth2"
  | "CyberArkOauth2"
  | "FusionAuthOauth2"
  | "Auth0Oauth2"
  | "CognitoOauth2"
  | (string & {});
export const CredentialProviderVendorType = S.String;

export type DiscoveryUrlType = string;
export type IssuerUrlType = string;
export type AuthorizationEndpointType = string;
export type TokenEndpointType = string;
export type ResponseType = string;
export type ResponseListType = string[];
export const ResponseListType = /*@__PURE__*/ S.Array(S.String);
export type TokenAuthMethod = string;
export type TokenEndpointAuthMethodsType = string[];
export const TokenEndpointAuthMethodsType = /*@__PURE__*/ S.Array(S.String);
export interface Oauth2AuthorizationServerMetadata {
  issuer: string;
  authorizationEndpoint: string;
  tokenEndpoint: string;
  responseTypes?: string[];
  tokenEndpointAuthMethods?: string[];
}
export const Oauth2AuthorizationServerMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    issuer: S.String,
    authorizationEndpoint: S.String,
    tokenEndpoint: S.String,
    responseTypes: S.optional(ResponseListType),
    tokenEndpointAuthMethods: S.optional(TokenEndpointAuthMethodsType),
  }),
).annotate({
  identifier: "Oauth2AuthorizationServerMetadata",
}) as any as S.Schema<Oauth2AuthorizationServerMetadata>;
export type Oauth2Discovery =
  | { discoveryUrl: string; authorizationServerMetadata?: never }
  | {
      discoveryUrl?: never;
      authorizationServerMetadata: Oauth2AuthorizationServerMetadata;
    };
export const Oauth2Discovery = /*@__PURE__*/ S.Union([
  S.Struct({ discoveryUrl: S.String }),
  S.Struct({ authorizationServerMetadata: Oauth2AuthorizationServerMetadata }),
]);
export type DefaultClientIdType = string;
export type DefaultClientSecretType = string | redacted.Redacted<string>;
export type OnBehalfOfTokenExchangeGrantTypeType =
  | "TOKEN_EXCHANGE"
  | "JWT_AUTHORIZATION_GRANT"
  | (string & {});
export const OnBehalfOfTokenExchangeGrantTypeType = S.String;

export type ActorTokenContentType =
  | "NONE"
  | "M2M"
  | "AWS_IAM_ID_TOKEN_JWT"
  | (string & {});
export const ActorTokenContentType = S.String;

export type ScopeType = string;
export type ScopesListType = string[];
export const ScopesListType = /*@__PURE__*/ S.Array(S.String);
export interface TokenExchangeGrantTypeConfigType {
  actorTokenContent: ActorTokenContentType;
  actorTokenScopes?: string[];
}
export const TokenExchangeGrantTypeConfigType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actorTokenContent: ActorTokenContentType,
    actorTokenScopes: S.optional(ScopesListType),
  }),
).annotate({
  identifier: "TokenExchangeGrantTypeConfigType",
}) as any as S.Schema<TokenExchangeGrantTypeConfigType>;
export interface OnBehalfOfTokenExchangeConfigType {
  grantType: OnBehalfOfTokenExchangeGrantTypeType;
  tokenExchangeGrantTypeConfig?: TokenExchangeGrantTypeConfigType;
}
export const OnBehalfOfTokenExchangeConfigType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    grantType: OnBehalfOfTokenExchangeGrantTypeType,
    tokenExchangeGrantTypeConfig: S.optional(TokenExchangeGrantTypeConfigType),
  }),
).annotate({
  identifier: "OnBehalfOfTokenExchangeConfigType",
}) as any as S.Schema<OnBehalfOfTokenExchangeConfigType>;
export type ClientAuthenticationMethodType =
  | "CLIENT_SECRET_BASIC"
  | "CLIENT_SECRET_POST"
  | "AWS_IAM_ID_TOKEN_JWT"
  | "PRIVATE_KEY_JWT"
  | (string & {});
export const ClientAuthenticationMethodType = S.String;

export interface KmsKeySourceType {
  kmsKeyArn: string;
}
export const KmsKeySourceType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ kmsKeyArn: S.String }),
).annotate({
  identifier: "KmsKeySourceType",
}) as any as S.Schema<KmsKeySourceType>;
export type PrivateKeySource = { kmsKeySource: KmsKeySourceType };
export const PrivateKeySource = /*@__PURE__*/ S.Union([
  S.Struct({ kmsKeySource: KmsKeySourceType }),
]);
export type SigningAlgorithm = "RS256" | "PS256" | "ES256" | (string & {});
export const SigningAlgorithm = S.String;

export type AdditionalClaimName = string;
export type AdditionalClaimValue = string | redacted.Redacted<string>;
export type AdditionalClaims = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export const AdditionalClaims = /*@__PURE__*/ S.Record(
  S.String,
  SensitiveString.pipe(S.optional),
);
export interface PrivateKeyJwtConfig {
  privateKeySource?: PrivateKeySource;
  signingAlgorithm?: SigningAlgorithm;
  additionalHeaderClaims?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  additionalPayloadClaims?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
}
export const PrivateKeyJwtConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    privateKeySource: S.optional(PrivateKeySource),
    signingAlgorithm: S.optional(SigningAlgorithm),
    additionalHeaderClaims: S.optional(AdditionalClaims),
    additionalPayloadClaims: S.optional(AdditionalClaims),
  }),
).annotate({
  identifier: "PrivateKeyJwtConfig",
}) as any as S.Schema<PrivateKeyJwtConfig>;
export interface CustomOauth2ProviderConfigInput {
  oauthDiscovery: Oauth2Discovery;
  clientId?: string;
  clientSecret?: string | redacted.Redacted<string>;
  clientSecretConfig?: SecretReference;
  clientSecretSource?: SecretSourceType;
  onBehalfOfTokenExchangeConfig?: OnBehalfOfTokenExchangeConfigType;
  clientAuthenticationMethod?: ClientAuthenticationMethodType;
  privateKeyJwtConfig?: PrivateKeyJwtConfig;
  privateEndpoint?: PrivateEndpoint;
  privateEndpointOverrides?: PrivateEndpointOverride[];
}
export const CustomOauth2ProviderConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    oauthDiscovery: Oauth2Discovery,
    clientId: S.optional(S.String),
    clientSecret: S.optional(SensitiveString),
    clientSecretConfig: S.optional(SecretReference),
    clientSecretSource: S.optional(SecretSourceType),
    onBehalfOfTokenExchangeConfig: S.optional(
      OnBehalfOfTokenExchangeConfigType,
    ),
    clientAuthenticationMethod: S.optional(ClientAuthenticationMethodType),
    privateKeyJwtConfig: S.optional(PrivateKeyJwtConfig),
    privateEndpoint: S.optional(PrivateEndpoint),
    privateEndpointOverrides: S.optional(PrivateEndpointOverrides),
  }),
).annotate({
  identifier: "CustomOauth2ProviderConfigInput",
}) as any as S.Schema<CustomOauth2ProviderConfigInput>;
export type ClientIdType = string;
export interface GoogleOauth2ProviderConfigInput {
  clientId: string;
  clientSecret?: string | redacted.Redacted<string>;
  clientSecretConfig?: SecretReference;
  clientSecretSource?: SecretSourceType;
}
export const GoogleOauth2ProviderConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientId: S.String,
    clientSecret: S.optional(SensitiveString),
    clientSecretConfig: S.optional(SecretReference),
    clientSecretSource: S.optional(SecretSourceType),
  }),
).annotate({
  identifier: "GoogleOauth2ProviderConfigInput",
}) as any as S.Schema<GoogleOauth2ProviderConfigInput>;
export interface GithubOauth2ProviderConfigInput {
  clientId: string;
  clientSecret?: string | redacted.Redacted<string>;
  clientSecretConfig?: SecretReference;
  clientSecretSource?: SecretSourceType;
}
export const GithubOauth2ProviderConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientId: S.String,
    clientSecret: S.optional(SensitiveString),
    clientSecretConfig: S.optional(SecretReference),
    clientSecretSource: S.optional(SecretSourceType),
  }),
).annotate({
  identifier: "GithubOauth2ProviderConfigInput",
}) as any as S.Schema<GithubOauth2ProviderConfigInput>;
export interface SlackOauth2ProviderConfigInput {
  clientId: string;
  clientSecret?: string | redacted.Redacted<string>;
  clientSecretConfig?: SecretReference;
  clientSecretSource?: SecretSourceType;
}
export const SlackOauth2ProviderConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientId: S.String,
    clientSecret: S.optional(SensitiveString),
    clientSecretConfig: S.optional(SecretReference),
    clientSecretSource: S.optional(SecretSourceType),
  }),
).annotate({
  identifier: "SlackOauth2ProviderConfigInput",
}) as any as S.Schema<SlackOauth2ProviderConfigInput>;
export interface SalesforceOauth2ProviderConfigInput {
  clientId: string;
  clientSecret?: string | redacted.Redacted<string>;
  clientSecretConfig?: SecretReference;
  clientSecretSource?: SecretSourceType;
}
export const SalesforceOauth2ProviderConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientId: S.String,
    clientSecret: S.optional(SensitiveString),
    clientSecretConfig: S.optional(SecretReference),
    clientSecretSource: S.optional(SecretSourceType),
  }),
).annotate({
  identifier: "SalesforceOauth2ProviderConfigInput",
}) as any as S.Schema<SalesforceOauth2ProviderConfigInput>;
export type TenantIdType = string;
export interface MicrosoftOauth2ProviderConfigInput {
  clientId: string;
  clientSecret?: string | redacted.Redacted<string>;
  clientSecretConfig?: SecretReference;
  clientSecretSource?: SecretSourceType;
  tenantId?: string;
}
export const MicrosoftOauth2ProviderConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientId: S.String,
    clientSecret: S.optional(SensitiveString),
    clientSecretConfig: S.optional(SecretReference),
    clientSecretSource: S.optional(SecretSourceType),
    tenantId: S.optional(S.String),
  }),
).annotate({
  identifier: "MicrosoftOauth2ProviderConfigInput",
}) as any as S.Schema<MicrosoftOauth2ProviderConfigInput>;
export interface AtlassianOauth2ProviderConfigInput {
  clientId: string;
  clientSecret?: string | redacted.Redacted<string>;
  clientSecretConfig?: SecretReference;
  clientSecretSource?: SecretSourceType;
}
export const AtlassianOauth2ProviderConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientId: S.String,
    clientSecret: S.optional(SensitiveString),
    clientSecretConfig: S.optional(SecretReference),
    clientSecretSource: S.optional(SecretSourceType),
  }),
).annotate({
  identifier: "AtlassianOauth2ProviderConfigInput",
}) as any as S.Schema<AtlassianOauth2ProviderConfigInput>;
export interface LinkedinOauth2ProviderConfigInput {
  clientId: string;
  clientSecret?: string | redacted.Redacted<string>;
  clientSecretConfig?: SecretReference;
  clientSecretSource?: SecretSourceType;
}
export const LinkedinOauth2ProviderConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientId: S.String,
    clientSecret: S.optional(SensitiveString),
    clientSecretConfig: S.optional(SecretReference),
    clientSecretSource: S.optional(SecretSourceType),
  }),
).annotate({
  identifier: "LinkedinOauth2ProviderConfigInput",
}) as any as S.Schema<LinkedinOauth2ProviderConfigInput>;
export interface IncludedOauth2ProviderConfigInput {
  clientId: string;
  clientSecret?: string | redacted.Redacted<string>;
  clientSecretConfig?: SecretReference;
  clientSecretSource?: SecretSourceType;
  issuer?: string;
  authorizationEndpoint?: string;
  tokenEndpoint?: string;
}
export const IncludedOauth2ProviderConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientId: S.String,
    clientSecret: S.optional(SensitiveString),
    clientSecretConfig: S.optional(SecretReference),
    clientSecretSource: S.optional(SecretSourceType),
    issuer: S.optional(S.String),
    authorizationEndpoint: S.optional(S.String),
    tokenEndpoint: S.optional(S.String),
  }),
).annotate({
  identifier: "IncludedOauth2ProviderConfigInput",
}) as any as S.Schema<IncludedOauth2ProviderConfigInput>;
export type Oauth2ProviderConfigInput =
  | {
      customOauth2ProviderConfig: CustomOauth2ProviderConfigInput;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig: GoogleOauth2ProviderConfigInput;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig: GithubOauth2ProviderConfigInput;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig: SlackOauth2ProviderConfigInput;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig: SalesforceOauth2ProviderConfigInput;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig: MicrosoftOauth2ProviderConfigInput;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig: AtlassianOauth2ProviderConfigInput;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig: LinkedinOauth2ProviderConfigInput;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig: IncludedOauth2ProviderConfigInput;
    };
export const Oauth2ProviderConfigInput = /*@__PURE__*/ S.Union([
  S.Struct({ customOauth2ProviderConfig: CustomOauth2ProviderConfigInput }),
  S.Struct({ googleOauth2ProviderConfig: GoogleOauth2ProviderConfigInput }),
  S.Struct({ githubOauth2ProviderConfig: GithubOauth2ProviderConfigInput }),
  S.Struct({ slackOauth2ProviderConfig: SlackOauth2ProviderConfigInput }),
  S.Struct({
    salesforceOauth2ProviderConfig: SalesforceOauth2ProviderConfigInput,
  }),
  S.Struct({
    microsoftOauth2ProviderConfig: MicrosoftOauth2ProviderConfigInput,
  }),
  S.Struct({
    atlassianOauth2ProviderConfig: AtlassianOauth2ProviderConfigInput,
  }),
  S.Struct({ linkedinOauth2ProviderConfig: LinkedinOauth2ProviderConfigInput }),
  S.Struct({ includedOauth2ProviderConfig: IncludedOauth2ProviderConfigInput }),
]);
export interface CreateOauth2CredentialProviderRequest {
  name: string;
  credentialProviderVendor: CredentialProviderVendorType;
  oauth2ProviderConfigInput: Oauth2ProviderConfigInput;
  tags?: { [key: string]: string | undefined };
}
export const CreateOauth2CredentialProviderRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      name: S.String,
      credentialProviderVendor: CredentialProviderVendorType,
      oauth2ProviderConfigInput: Oauth2ProviderConfigInput,
      tags: S.optional(TagsMap),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/identities/CreateOauth2CredentialProvider",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateOauth2CredentialProviderRequest",
}) as any as S.Schema<CreateOauth2CredentialProviderRequest>;
export type CredentialProviderArnType = string;
export interface CustomOauth2ProviderConfigOutput {
  oauthDiscovery: Oauth2Discovery;
  clientId?: string;
  onBehalfOfTokenExchangeConfig?: OnBehalfOfTokenExchangeConfigType;
  clientAuthenticationMethod?: ClientAuthenticationMethodType;
  privateEndpoint?: PrivateEndpoint;
  privateEndpointOverrides?: PrivateEndpointOverride[];
  privateKeyJwtConfig?: PrivateKeyJwtConfig;
}
export const CustomOauth2ProviderConfigOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    oauthDiscovery: Oauth2Discovery,
    clientId: S.optional(S.String),
    onBehalfOfTokenExchangeConfig: S.optional(
      OnBehalfOfTokenExchangeConfigType,
    ),
    clientAuthenticationMethod: S.optional(ClientAuthenticationMethodType),
    privateEndpoint: S.optional(PrivateEndpoint),
    privateEndpointOverrides: S.optional(PrivateEndpointOverrides),
    privateKeyJwtConfig: S.optional(PrivateKeyJwtConfig),
  }),
).annotate({
  identifier: "CustomOauth2ProviderConfigOutput",
}) as any as S.Schema<CustomOauth2ProviderConfigOutput>;
export interface GoogleOauth2ProviderConfigOutput {
  oauthDiscovery: Oauth2Discovery;
  clientId?: string;
}
export const GoogleOauth2ProviderConfigOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ oauthDiscovery: Oauth2Discovery, clientId: S.optional(S.String) }),
).annotate({
  identifier: "GoogleOauth2ProviderConfigOutput",
}) as any as S.Schema<GoogleOauth2ProviderConfigOutput>;
export interface GithubOauth2ProviderConfigOutput {
  oauthDiscovery: Oauth2Discovery;
  clientId?: string;
}
export const GithubOauth2ProviderConfigOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ oauthDiscovery: Oauth2Discovery, clientId: S.optional(S.String) }),
).annotate({
  identifier: "GithubOauth2ProviderConfigOutput",
}) as any as S.Schema<GithubOauth2ProviderConfigOutput>;
export interface SlackOauth2ProviderConfigOutput {
  oauthDiscovery: Oauth2Discovery;
  clientId?: string;
}
export const SlackOauth2ProviderConfigOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ oauthDiscovery: Oauth2Discovery, clientId: S.optional(S.String) }),
).annotate({
  identifier: "SlackOauth2ProviderConfigOutput",
}) as any as S.Schema<SlackOauth2ProviderConfigOutput>;
export interface SalesforceOauth2ProviderConfigOutput {
  oauthDiscovery: Oauth2Discovery;
  clientId?: string;
}
export const SalesforceOauth2ProviderConfigOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      oauthDiscovery: Oauth2Discovery,
      clientId: S.optional(S.String),
    }),
).annotate({
  identifier: "SalesforceOauth2ProviderConfigOutput",
}) as any as S.Schema<SalesforceOauth2ProviderConfigOutput>;
export interface MicrosoftOauth2ProviderConfigOutput {
  oauthDiscovery: Oauth2Discovery;
  clientId?: string;
}
export const MicrosoftOauth2ProviderConfigOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ oauthDiscovery: Oauth2Discovery, clientId: S.optional(S.String) }),
).annotate({
  identifier: "MicrosoftOauth2ProviderConfigOutput",
}) as any as S.Schema<MicrosoftOauth2ProviderConfigOutput>;
export interface AtlassianOauth2ProviderConfigOutput {
  oauthDiscovery: Oauth2Discovery;
  clientId?: string;
}
export const AtlassianOauth2ProviderConfigOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ oauthDiscovery: Oauth2Discovery, clientId: S.optional(S.String) }),
).annotate({
  identifier: "AtlassianOauth2ProviderConfigOutput",
}) as any as S.Schema<AtlassianOauth2ProviderConfigOutput>;
export interface LinkedinOauth2ProviderConfigOutput {
  oauthDiscovery: Oauth2Discovery;
  clientId?: string;
}
export const LinkedinOauth2ProviderConfigOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ oauthDiscovery: Oauth2Discovery, clientId: S.optional(S.String) }),
).annotate({
  identifier: "LinkedinOauth2ProviderConfigOutput",
}) as any as S.Schema<LinkedinOauth2ProviderConfigOutput>;
export interface IncludedOauth2ProviderConfigOutput {
  oauthDiscovery: Oauth2Discovery;
  clientId?: string;
}
export const IncludedOauth2ProviderConfigOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ oauthDiscovery: Oauth2Discovery, clientId: S.optional(S.String) }),
).annotate({
  identifier: "IncludedOauth2ProviderConfigOutput",
}) as any as S.Schema<IncludedOauth2ProviderConfigOutput>;
export type Oauth2ProviderConfigOutput =
  | {
      customOauth2ProviderConfig: CustomOauth2ProviderConfigOutput;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig: GoogleOauth2ProviderConfigOutput;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig: GithubOauth2ProviderConfigOutput;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig: SlackOauth2ProviderConfigOutput;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig: SalesforceOauth2ProviderConfigOutput;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig: MicrosoftOauth2ProviderConfigOutput;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig: AtlassianOauth2ProviderConfigOutput;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig: LinkedinOauth2ProviderConfigOutput;
      includedOauth2ProviderConfig?: never;
    }
  | {
      customOauth2ProviderConfig?: never;
      googleOauth2ProviderConfig?: never;
      githubOauth2ProviderConfig?: never;
      slackOauth2ProviderConfig?: never;
      salesforceOauth2ProviderConfig?: never;
      microsoftOauth2ProviderConfig?: never;
      atlassianOauth2ProviderConfig?: never;
      linkedinOauth2ProviderConfig?: never;
      includedOauth2ProviderConfig: IncludedOauth2ProviderConfigOutput;
    };
export const Oauth2ProviderConfigOutput = /*@__PURE__*/ S.Union([
  S.Struct({ customOauth2ProviderConfig: CustomOauth2ProviderConfigOutput }),
  S.Struct({ googleOauth2ProviderConfig: GoogleOauth2ProviderConfigOutput }),
  S.Struct({ githubOauth2ProviderConfig: GithubOauth2ProviderConfigOutput }),
  S.Struct({ slackOauth2ProviderConfig: SlackOauth2ProviderConfigOutput }),
  S.Struct({
    salesforceOauth2ProviderConfig: SalesforceOauth2ProviderConfigOutput,
  }),
  S.Struct({
    microsoftOauth2ProviderConfig: MicrosoftOauth2ProviderConfigOutput,
  }),
  S.Struct({
    atlassianOauth2ProviderConfig: AtlassianOauth2ProviderConfigOutput,
  }),
  S.Struct({
    linkedinOauth2ProviderConfig: LinkedinOauth2ProviderConfigOutput,
  }),
  S.Struct({
    includedOauth2ProviderConfig: IncludedOauth2ProviderConfigOutput,
  }),
]);
export type Status =
  | "CREATING"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "READY"
  | "DELETING"
  | "DELETE_FAILED"
  | (string & {});
export const Status = S.String;

export interface CreateOauth2CredentialProviderResponse {
  clientSecretArn: Secret;
  clientSecretJsonKey?: string;
  clientSecretSource?: SecretSourceType;
  name: string;
  credentialProviderArn: string;
  callbackUrl?: string;
  oauth2ProviderConfigOutput?: Oauth2ProviderConfigOutput;
  status?: Status;
}
export const CreateOauth2CredentialProviderResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      clientSecretArn: Secret,
      clientSecretJsonKey: S.optional(S.String),
      clientSecretSource: S.optional(SecretSourceType),
      name: S.String,
      credentialProviderArn: S.String,
      callbackUrl: S.optional(S.String),
      oauth2ProviderConfigOutput: S.optional(Oauth2ProviderConfigOutput),
      status: S.optional(Status),
    }),
).annotate({
  identifier: "CreateOauth2CredentialProviderResponse",
}) as any as S.Schema<CreateOauth2CredentialProviderResponse>;
export type EvaluationConfigName = string;
export type EvaluationConfigDescription = string | redacted.Redacted<string>;
export type SamplingPercentage = number;
export interface SamplingConfig {
  samplingPercentage: number;
}
export const SamplingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ samplingPercentage: S.Number }),
).annotate({ identifier: "SamplingConfig" }) as any as S.Schema<SamplingConfig>;
export type FilterOperator =
  | "Equals"
  | "NotEquals"
  | "GreaterThan"
  | "LessThan"
  | "GreaterThanOrEqual"
  | "LessThanOrEqual"
  | "Contains"
  | "NotContains"
  | (string & {});
export const FilterOperator = S.String;

export type FilterValue =
  | { stringValue: string; doubleValue?: never; booleanValue?: never }
  | { stringValue?: never; doubleValue: number; booleanValue?: never }
  | { stringValue?: never; doubleValue?: never; booleanValue: boolean };
export const FilterValue = /*@__PURE__*/ S.Union([
  S.Struct({ stringValue: S.String }),
  S.Struct({ doubleValue: S.Number }),
  S.Struct({ booleanValue: S.Boolean }),
]);
export interface Filter {
  key: string;
  operator: FilterOperator;
  value: FilterValue;
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, operator: FilterOperator, value: FilterValue }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type FilterList = Filter[];
export const FilterList = /*@__PURE__*/ S.Array(Filter);
export interface SessionConfig {
  sessionTimeoutMinutes: number;
}
export const SessionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sessionTimeoutMinutes: S.Number }),
).annotate({ identifier: "SessionConfig" }) as any as S.Schema<SessionConfig>;
export interface Rule {
  samplingConfig: SamplingConfig;
  filters?: Filter[];
  sessionConfig?: SessionConfig;
}
export const Rule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    samplingConfig: SamplingConfig,
    filters: S.optional(FilterList),
    sessionConfig: S.optional(SessionConfig),
  }),
).annotate({ identifier: "Rule" }) as any as S.Schema<Rule>;
export type LogGroupName = string;
export type LogGroupNamesList = string[];
export const LogGroupNamesList = /*@__PURE__*/ S.Array(S.String);
export type ServiceName = string;
export type ServiceNamesList = string[];
export const ServiceNamesList = /*@__PURE__*/ S.Array(S.String);
export interface CloudWatchLogsInputConfig {
  logGroupNames: string[];
  serviceNames: string[];
}
export const CloudWatchLogsInputConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    logGroupNames: LogGroupNamesList,
    serviceNames: ServiceNamesList,
  }),
).annotate({
  identifier: "CloudWatchLogsInputConfig",
}) as any as S.Schema<CloudWatchLogsInputConfig>;
export type DataSourceConfig = { cloudWatchLogs: CloudWatchLogsInputConfig };
export const DataSourceConfig = /*@__PURE__*/ S.Union([
  S.Struct({ cloudWatchLogs: CloudWatchLogsInputConfig }),
]);
export type EvaluatorReference = { evaluatorId: string };
export const EvaluatorReference = /*@__PURE__*/ S.Union([
  S.Struct({ evaluatorId: S.String }),
]);
export type EvaluatorList = EvaluatorReference[];
export const EvaluatorList = /*@__PURE__*/ S.Array(EvaluatorReference);
export type InsightId = string;
export interface Insight {
  insightId: string;
}
export const Insight = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ insightId: S.String }),
).annotate({ identifier: "Insight" }) as any as S.Schema<Insight>;
export type InsightList = Insight[];
export const InsightList = /*@__PURE__*/ S.Array(Insight);
export type ClusteringFrequency =
  | "DAILY"
  | "WEEKLY"
  | "MONTHLY"
  | (string & {});
export const ClusteringFrequency = S.String;

export type ClusteringFrequencyList = ClusteringFrequency[];
export const ClusteringFrequencyList =
  /*@__PURE__*/ S.Array(ClusteringFrequency);
export interface ClusteringConfig {
  frequencies: ClusteringFrequency[];
}
export const ClusteringConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ frequencies: ClusteringFrequencyList }),
).annotate({
  identifier: "ClusteringConfig",
}) as any as S.Schema<ClusteringConfig>;
export interface CreateOnlineEvaluationConfigRequest {
  clientToken?: string;
  onlineEvaluationConfigName: string;
  description?: string | redacted.Redacted<string>;
  rule: Rule;
  dataSourceConfig: DataSourceConfig;
  evaluators?: EvaluatorReference[];
  insights?: Insight[];
  clusteringConfig?: ClusteringConfig;
  evaluationExecutionRoleArn: string;
  enableOnCreate: boolean;
  tags?: { [key: string]: string | undefined };
}
export const CreateOnlineEvaluationConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    onlineEvaluationConfigName: S.String,
    description: S.optional(SensitiveString),
    rule: Rule,
    dataSourceConfig: DataSourceConfig,
    evaluators: S.optional(EvaluatorList),
    insights: S.optional(InsightList),
    clusteringConfig: S.optional(ClusteringConfig),
    evaluationExecutionRoleArn: S.String,
    enableOnCreate: S.Boolean,
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/online-evaluation-configs/create" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateOnlineEvaluationConfigRequest",
}) as any as S.Schema<CreateOnlineEvaluationConfigRequest>;
export type OnlineEvaluationConfigArn = string;
export type OnlineEvaluationConfigId = string;
export interface CloudWatchOutputConfig {
  logGroupName: string;
}
export const CloudWatchOutputConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ logGroupName: S.String }),
).annotate({
  identifier: "CloudWatchOutputConfig",
}) as any as S.Schema<CloudWatchOutputConfig>;
export interface OutputConfig {
  cloudWatchConfig: CloudWatchOutputConfig;
}
export const OutputConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cloudWatchConfig: CloudWatchOutputConfig }),
).annotate({ identifier: "OutputConfig" }) as any as S.Schema<OutputConfig>;
export type OnlineEvaluationConfigStatus =
  | "ACTIVE"
  | "CREATING"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "DELETING"
  | "ERROR"
  | (string & {});
export const OnlineEvaluationConfigStatus = S.String;

export type OnlineEvaluationExecutionStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const OnlineEvaluationExecutionStatus = S.String;

export interface CreateOnlineEvaluationConfigResponse {
  onlineEvaluationConfigArn: string;
  onlineEvaluationConfigId: string;
  createdAt: Date;
  outputConfig?: OutputConfig;
  status: OnlineEvaluationConfigStatus;
  executionStatus: OnlineEvaluationExecutionStatus;
  failureReason?: string;
}
export const CreateOnlineEvaluationConfigResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      onlineEvaluationConfigArn: S.String,
      onlineEvaluationConfigId: S.String,
      createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      outputConfig: S.optional(OutputConfig),
      status: OnlineEvaluationConfigStatus,
      executionStatus: OnlineEvaluationExecutionStatus,
      failureReason: S.optional(S.String),
    }),
).annotate({
  identifier: "CreateOnlineEvaluationConfigResponse",
}) as any as S.Schema<CreateOnlineEvaluationConfigResponse>;
export type PaymentManagerId = string;
export type PaymentConnectorName = string;
export type PaymentsDescription = string;
export type PaymentConnectorType =
  | "CoinbaseCDP"
  | "StripePrivy"
  | (string & {});
export const PaymentConnectorType = S.String;

export type PaymentCredentialProviderArn = string;
export interface PaymentCredentialProviderConfiguration {
  credentialProviderArn: string;
}
export const PaymentCredentialProviderConfiguration = /*@__PURE__*/ S.suspend(
  () => S.Struct({ credentialProviderArn: S.String }),
).annotate({
  identifier: "PaymentCredentialProviderConfiguration",
}) as any as S.Schema<PaymentCredentialProviderConfiguration>;
export type CredentialsProviderConfiguration =
  | { coinbaseCDP: PaymentCredentialProviderConfiguration; stripePrivy?: never }
  | {
      coinbaseCDP?: never;
      stripePrivy: PaymentCredentialProviderConfiguration;
    };
export const CredentialsProviderConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ coinbaseCDP: PaymentCredentialProviderConfiguration }),
  S.Struct({ stripePrivy: PaymentCredentialProviderConfiguration }),
]);
export type CredentialsProviderConfigurations =
  CredentialsProviderConfiguration[];
export const CredentialsProviderConfigurations = /*@__PURE__*/ S.Array(
  CredentialsProviderConfiguration,
);
export type PaymentConnectorProvisionMode =
  | "MANUAL"
  | "QUICK_CREATE"
  | (string & {});
export const PaymentConnectorProvisionMode = S.String;

export interface CreatePaymentConnectorRequest {
  paymentManagerId: string;
  name: string;
  description?: string;
  type: PaymentConnectorType;
  credentialProviderConfigurations: CredentialsProviderConfiguration[];
  provisionMode?: PaymentConnectorProvisionMode;
  clientToken?: string;
}
export const CreatePaymentConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentManagerId: S.String.pipe(T.HttpLabel("paymentManagerId")),
    name: S.String,
    description: S.optional(S.String),
    type: PaymentConnectorType,
    credentialProviderConfigurations: CredentialsProviderConfigurations,
    provisionMode: S.optional(PaymentConnectorProvisionMode),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/payments/managers/{paymentManagerId}/connectors",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePaymentConnectorRequest",
}) as any as S.Schema<CreatePaymentConnectorRequest>;
export type PaymentConnectorId = string;
export type PaymentConnectorStatus =
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "READY"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | "DELETE_FAILED"
  | "AWS_MARKETPLACE_SUBSCRIPTION_REQUIRED"
  | "PENDING_AUTHENTICATION"
  | "PROVISIONING"
  | "AUTHENTICATION_EXPIRED"
  | "AUTHENTICATION_FAILED"
  | (string & {});
export const PaymentConnectorStatus = S.String;

export type PaymentConnectorAuthorizationUrl = string;
export interface CreatePaymentConnectorResponse {
  paymentConnectorId: string;
  paymentManagerId: string;
  name: string;
  type: PaymentConnectorType;
  credentialProviderConfigurations: CredentialsProviderConfiguration[];
  createdAt: Date;
  status: PaymentConnectorStatus;
  authorizationUrl?: string;
}
export const CreatePaymentConnectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentConnectorId: S.String,
    paymentManagerId: S.String,
    name: S.String,
    type: PaymentConnectorType,
    credentialProviderConfigurations: CredentialsProviderConfigurations,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: PaymentConnectorStatus,
    authorizationUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "CreatePaymentConnectorResponse",
}) as any as S.Schema<CreatePaymentConnectorResponse>;
export type PaymentCredentialProviderVendorType =
  | "CoinbaseCDP"
  | "StripePrivy"
  | (string & {});
export const PaymentCredentialProviderVendorType = S.String;

export type CoinbaseCdpApiKeyIdType = string;
export type DefaultCoinbaseCdpApiKeySecretType =
  | string
  | redacted.Redacted<string>;
export type DefaultCoinbaseCdpWalletSecretType =
  | string
  | redacted.Redacted<string>;
export interface CoinbaseCdpConfigurationInput {
  apiKeyId: string;
  apiKeySecret?: string | redacted.Redacted<string>;
  apiKeySecretSource?: SecretSourceType;
  apiKeySecretConfig?: SecretReference;
  walletSecret?: string | redacted.Redacted<string>;
  walletSecretSource?: SecretSourceType;
  walletSecretConfig?: SecretReference;
}
export const CoinbaseCdpConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiKeyId: S.String,
    apiKeySecret: S.optional(SensitiveString),
    apiKeySecretSource: S.optional(SecretSourceType),
    apiKeySecretConfig: S.optional(SecretReference),
    walletSecret: S.optional(SensitiveString),
    walletSecretSource: S.optional(SecretSourceType),
    walletSecretConfig: S.optional(SecretReference),
  }),
).annotate({
  identifier: "CoinbaseCdpConfigurationInput",
}) as any as S.Schema<CoinbaseCdpConfigurationInput>;
export type StripePrivyAppIdType = string;
export type DefaultStripePrivyAppSecretType =
  | string
  | redacted.Redacted<string>;
export type DefaultStripePrivyAuthorizationPrivateKeyType =
  | string
  | redacted.Redacted<string>;
export type StripePrivyAuthorizationIdType = string;
export interface StripePrivyConfigurationInput {
  appId: string;
  appSecret?: string | redacted.Redacted<string>;
  appSecretSource?: SecretSourceType;
  appSecretConfig?: SecretReference;
  authorizationPrivateKey?: string | redacted.Redacted<string>;
  authorizationPrivateKeySource?: SecretSourceType;
  authorizationPrivateKeyConfig?: SecretReference;
  authorizationId: string;
}
export const StripePrivyConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String,
    appSecret: S.optional(SensitiveString),
    appSecretSource: S.optional(SecretSourceType),
    appSecretConfig: S.optional(SecretReference),
    authorizationPrivateKey: S.optional(SensitiveString),
    authorizationPrivateKeySource: S.optional(SecretSourceType),
    authorizationPrivateKeyConfig: S.optional(SecretReference),
    authorizationId: S.String,
  }),
).annotate({
  identifier: "StripePrivyConfigurationInput",
}) as any as S.Schema<StripePrivyConfigurationInput>;
export type PaymentProviderConfigurationInput =
  | {
      coinbaseCdpConfiguration: CoinbaseCdpConfigurationInput;
      stripePrivyConfiguration?: never;
    }
  | {
      coinbaseCdpConfiguration?: never;
      stripePrivyConfiguration: StripePrivyConfigurationInput;
    };
export const PaymentProviderConfigurationInput = /*@__PURE__*/ S.Union([
  S.Struct({ coinbaseCdpConfiguration: CoinbaseCdpConfigurationInput }),
  S.Struct({ stripePrivyConfiguration: StripePrivyConfigurationInput }),
]);
export interface CreatePaymentCredentialProviderRequest {
  name: string;
  credentialProviderVendor: PaymentCredentialProviderVendorType;
  providerConfigurationInput: PaymentProviderConfigurationInput;
  tags?: { [key: string]: string | undefined };
}
export const CreatePaymentCredentialProviderRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      name: S.String,
      credentialProviderVendor: PaymentCredentialProviderVendorType,
      providerConfigurationInput: PaymentProviderConfigurationInput,
      tags: S.optional(TagsMap),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/identities/CreatePaymentCredentialProvider",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreatePaymentCredentialProviderRequest",
}) as any as S.Schema<CreatePaymentCredentialProviderRequest>;
export type PaymentCredentialProviderArnType = string;
export interface CoinbaseCdpConfigurationOutput {
  apiKeyId: string;
  apiKeySecretArn: Secret;
  apiKeySecretJsonKey?: string;
  apiKeySecretSource?: SecretSourceType;
  walletSecretArn: Secret;
  walletSecretJsonKey?: string;
  walletSecretSource?: SecretSourceType;
}
export const CoinbaseCdpConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiKeyId: S.String,
    apiKeySecretArn: Secret,
    apiKeySecretJsonKey: S.optional(S.String),
    apiKeySecretSource: S.optional(SecretSourceType),
    walletSecretArn: Secret,
    walletSecretJsonKey: S.optional(S.String),
    walletSecretSource: S.optional(SecretSourceType),
  }),
).annotate({
  identifier: "CoinbaseCdpConfigurationOutput",
}) as any as S.Schema<CoinbaseCdpConfigurationOutput>;
export interface StripePrivyConfigurationOutput {
  appId: string;
  appSecretArn: Secret;
  appSecretJsonKey?: string;
  appSecretSource?: SecretSourceType;
  authorizationPrivateKeyArn: Secret;
  authorizationPrivateKeyJsonKey?: string;
  authorizationPrivateKeySource?: SecretSourceType;
  authorizationId: string;
}
export const StripePrivyConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String,
    appSecretArn: Secret,
    appSecretJsonKey: S.optional(S.String),
    appSecretSource: S.optional(SecretSourceType),
    authorizationPrivateKeyArn: Secret,
    authorizationPrivateKeyJsonKey: S.optional(S.String),
    authorizationPrivateKeySource: S.optional(SecretSourceType),
    authorizationId: S.String,
  }),
).annotate({
  identifier: "StripePrivyConfigurationOutput",
}) as any as S.Schema<StripePrivyConfigurationOutput>;
export type PaymentProviderConfigurationOutput =
  | {
      coinbaseCdpConfiguration: CoinbaseCdpConfigurationOutput;
      stripePrivyConfiguration?: never;
    }
  | {
      coinbaseCdpConfiguration?: never;
      stripePrivyConfiguration: StripePrivyConfigurationOutput;
    };
export const PaymentProviderConfigurationOutput = /*@__PURE__*/ S.Union([
  S.Struct({ coinbaseCdpConfiguration: CoinbaseCdpConfigurationOutput }),
  S.Struct({ stripePrivyConfiguration: StripePrivyConfigurationOutput }),
]);
export interface CreatePaymentCredentialProviderResponse {
  name: string;
  credentialProviderVendor: PaymentCredentialProviderVendorType;
  credentialProviderArn: string;
  providerConfigurationOutput: PaymentProviderConfigurationOutput;
}
export const CreatePaymentCredentialProviderResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      name: S.String,
      credentialProviderVendor: PaymentCredentialProviderVendorType,
      credentialProviderArn: S.String,
      providerConfigurationOutput: PaymentProviderConfigurationOutput,
    }),
).annotate({
  identifier: "CreatePaymentCredentialProviderResponse",
}) as any as S.Schema<CreatePaymentCredentialProviderResponse>;
export type PaymentManagerName = string;
export type PaymentsAuthorizerType = "CUSTOM_JWT" | "AWS_IAM" | (string & {});
export const PaymentsAuthorizerType = S.String;

export interface CreatePaymentManagerRequest {
  name: string;
  description?: string;
  authorizerType: PaymentsAuthorizerType;
  authorizerConfiguration?: AuthorizerConfiguration;
  roleArn: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
}
export const CreatePaymentManagerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    authorizerType: PaymentsAuthorizerType,
    authorizerConfiguration: S.optional(AuthorizerConfiguration),
    roleArn: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagsMap),
    kmsKeyArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/payments/managers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePaymentManagerRequest",
}) as any as S.Schema<CreatePaymentManagerRequest>;
export type PaymentManagerArn = string;
export type PaymentManagerStatus =
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "READY"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | "DELETE_FAILED"
  | (string & {});
export const PaymentManagerStatus = S.String;

export interface CreatePaymentManagerResponse {
  paymentManagerArn: string;
  paymentManagerId: string;
  name: string;
  authorizerType: PaymentsAuthorizerType;
  authorizerConfiguration?: AuthorizerConfiguration;
  roleArn: string;
  workloadIdentityDetails?: WorkloadIdentityDetails;
  createdAt: Date;
  status: PaymentManagerStatus;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
}
export const CreatePaymentManagerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentManagerArn: S.String,
    paymentManagerId: S.String,
    name: S.String,
    authorizerType: PaymentsAuthorizerType,
    authorizerConfiguration: S.optional(AuthorizerConfiguration),
    roleArn: S.String,
    workloadIdentityDetails: S.optional(WorkloadIdentityDetails),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: PaymentManagerStatus,
    tags: S.optional(TagsMap),
    kmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreatePaymentManagerResponse",
}) as any as S.Schema<CreatePaymentManagerResponse>;
export type PolicyName = string;
export type Statement = string;
export interface CedarPolicy {
  statement: string;
}
export const CedarPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ statement: S.String }),
).annotate({ identifier: "CedarPolicy" }) as any as S.Schema<CedarPolicy>;
export type ResourceId = string;
export interface PolicyGenerationDetails {
  policyGenerationId: string;
  policyGenerationAssetId: string;
}
export const PolicyGenerationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyGenerationId: S.String, policyGenerationAssetId: S.String }),
).annotate({
  identifier: "PolicyGenerationDetails",
}) as any as S.Schema<PolicyGenerationDetails>;
export interface PolicyStatement {
  statement: string;
}
export const PolicyStatement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ statement: S.String }),
).annotate({
  identifier: "PolicyStatement",
}) as any as S.Schema<PolicyStatement>;
export type PolicyDefinition =
  | { cedar: CedarPolicy; policyGeneration?: never; policy?: never }
  | { cedar?: never; policyGeneration: PolicyGenerationDetails; policy?: never }
  | { cedar?: never; policyGeneration?: never; policy: PolicyStatement };
export const PolicyDefinition = /*@__PURE__*/ S.Union([
  S.Struct({ cedar: CedarPolicy }),
  S.Struct({ policyGeneration: PolicyGenerationDetails }),
  S.Struct({ policy: PolicyStatement }),
]);
export type PolicyValidationMode =
  | "FAIL_ON_ANY_FINDINGS"
  | "IGNORE_ALL_FINDINGS"
  | (string & {});
export const PolicyValidationMode = S.String;

export type EnforcementMode = "ACTIVE" | "LOG_ONLY" | (string & {});
export const EnforcementMode = S.String;

export interface CreatePolicyRequest {
  name: string;
  definition: PolicyDefinition;
  description?: string | redacted.Redacted<string>;
  validationMode?: PolicyValidationMode;
  enforcementMode?: EnforcementMode;
  policyEngineId: string;
  clientToken?: string;
}
export const CreatePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    definition: PolicyDefinition,
    description: S.optional(SensitiveString),
    validationMode: S.optional(PolicyValidationMode),
    enforcementMode: S.optional(EnforcementMode),
    policyEngineId: S.String.pipe(T.HttpLabel("policyEngineId")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/policy-engines/{policyEngineId}/policies",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePolicyRequest",
}) as any as S.Schema<CreatePolicyRequest>;
export type PolicyArn = string;
export type PolicyStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | "DELETE_FAILED"
  | (string & {});
export const PolicyStatus = S.String;

export type PolicyStatusReasons = string[];
export const PolicyStatusReasons = /*@__PURE__*/ S.Array(S.String);
export interface CreatePolicyResponse {
  policyId: string;
  name: string;
  policyEngineId: string;
  createdAt: Date;
  updatedAt: Date;
  policyArn: string;
  status: PolicyStatus;
  enforcementMode?: EnforcementMode;
  definition: PolicyDefinition;
  description?: string | redacted.Redacted<string>;
  statusReasons: string[];
}
export const CreatePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyId: S.String,
    name: S.String,
    policyEngineId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    policyArn: S.String,
    status: PolicyStatus,
    enforcementMode: S.optional(EnforcementMode),
    definition: PolicyDefinition,
    description: S.optional(SensitiveString),
    statusReasons: PolicyStatusReasons,
  }),
).annotate({
  identifier: "CreatePolicyResponse",
}) as any as S.Schema<CreatePolicyResponse>;
export type PolicyEngineName = string;
export interface CreatePolicyEngineRequest {
  name: string;
  description?: string | redacted.Redacted<string>;
  clientToken?: string;
  encryptionKeyArn?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreatePolicyEngineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(SensitiveString),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    encryptionKeyArn: S.optional(S.String),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/policy-engines" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePolicyEngineRequest",
}) as any as S.Schema<CreatePolicyEngineRequest>;
export type PolicyEngineArn = string;
export type PolicyEngineStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | "DELETE_FAILED"
  | (string & {});
export const PolicyEngineStatus = S.String;

export interface CreatePolicyEngineResponse {
  policyEngineId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  policyEngineArn: string;
  status: PolicyEngineStatus;
  encryptionKeyArn?: string;
  description?: string | redacted.Redacted<string>;
  statusReasons: string[];
}
export const CreatePolicyEngineResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyEngineId: S.String,
    name: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    policyEngineArn: S.String,
    status: PolicyEngineStatus,
    encryptionKeyArn: S.optional(S.String),
    description: S.optional(SensitiveString),
    statusReasons: PolicyStatusReasons,
  }),
).annotate({
  identifier: "CreatePolicyEngineResponse",
}) as any as S.Schema<CreatePolicyEngineResponse>;
export type RegistryName = string;
export type RegistryAuthorizerType = "CUSTOM_JWT" | "AWS_IAM" | (string & {});
export const RegistryAuthorizerType = S.String;

export interface ApprovalConfiguration {
  autoApproval?: boolean;
}
export const ApprovalConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ autoApproval: S.optional(S.Boolean) }),
).annotate({
  identifier: "ApprovalConfiguration",
}) as any as S.Schema<ApprovalConfiguration>;
export interface CreateRegistryRequest {
  name: string;
  description?: string | redacted.Redacted<string>;
  authorizerType?: RegistryAuthorizerType;
  authorizerConfiguration?: AuthorizerConfiguration;
  clientToken?: string;
  approvalConfiguration?: ApprovalConfiguration;
}
export const CreateRegistryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(SensitiveString),
    authorizerType: S.optional(RegistryAuthorizerType),
    authorizerConfiguration: S.optional(AuthorizerConfiguration),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
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
export type DescriptorType =
  | "MCP"
  | "A2A"
  | "CUSTOM"
  | "AGENT_SKILLS"
  | (string & {});
export const DescriptorType = S.String;

export type SchemaVersion = string;
export type InlineContent = string;
export interface ServerDefinition {
  schemaVersion?: string;
  inlineContent?: string;
}
export const ServerDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    schemaVersion: S.optional(S.String),
    inlineContent: S.optional(S.String),
  }),
).annotate({
  identifier: "ServerDefinition",
}) as any as S.Schema<ServerDefinition>;
export interface ToolsDefinition {
  protocolVersion?: string;
  inlineContent?: string;
}
export const ToolsDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    protocolVersion: S.optional(S.String),
    inlineContent: S.optional(S.String),
  }),
).annotate({
  identifier: "ToolsDefinition",
}) as any as S.Schema<ToolsDefinition>;
export interface McpDescriptor {
  server?: ServerDefinition;
  tools?: ToolsDefinition;
}
export const McpDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    server: S.optional(ServerDefinition),
    tools: S.optional(ToolsDefinition),
  }),
).annotate({ identifier: "McpDescriptor" }) as any as S.Schema<McpDescriptor>;
export interface AgentCardDefinition {
  schemaVersion?: string;
  inlineContent?: string;
}
export const AgentCardDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    schemaVersion: S.optional(S.String),
    inlineContent: S.optional(S.String),
  }),
).annotate({
  identifier: "AgentCardDefinition",
}) as any as S.Schema<AgentCardDefinition>;
export interface A2aDescriptor {
  agentCard?: AgentCardDefinition;
}
export const A2aDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agentCard: S.optional(AgentCardDefinition) }),
).annotate({ identifier: "A2aDescriptor" }) as any as S.Schema<A2aDescriptor>;
export interface CustomDescriptor {
  inlineContent?: string;
}
export const CustomDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ inlineContent: S.optional(S.String) }),
).annotate({
  identifier: "CustomDescriptor",
}) as any as S.Schema<CustomDescriptor>;
export interface SkillMdDefinition {
  inlineContent?: string;
}
export const SkillMdDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ inlineContent: S.optional(S.String) }),
).annotate({
  identifier: "SkillMdDefinition",
}) as any as S.Schema<SkillMdDefinition>;
export interface SkillDefinition {
  schemaVersion?: string;
  inlineContent?: string;
}
export const SkillDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    schemaVersion: S.optional(S.String),
    inlineContent: S.optional(S.String),
  }),
).annotate({
  identifier: "SkillDefinition",
}) as any as S.Schema<SkillDefinition>;
export interface AgentSkillsDescriptor {
  skillMd?: SkillMdDefinition;
  skillDefinition?: SkillDefinition;
}
export const AgentSkillsDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    skillMd: S.optional(SkillMdDefinition),
    skillDefinition: S.optional(SkillDefinition),
  }),
).annotate({
  identifier: "AgentSkillsDescriptor",
}) as any as S.Schema<AgentSkillsDescriptor>;
export interface Descriptors {
  mcp?: McpDescriptor;
  a2a?: A2aDescriptor;
  custom?: CustomDescriptor;
  agentSkills?: AgentSkillsDescriptor;
}
export const Descriptors = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mcp: S.optional(McpDescriptor),
    a2a: S.optional(A2aDescriptor),
    custom: S.optional(CustomDescriptor),
    agentSkills: S.optional(AgentSkillsDescriptor),
  }),
).annotate({ identifier: "Descriptors" }) as any as S.Schema<Descriptors>;
export type RegistryRecordVersion = string;
export type SynchronizationType = "URL" | (string & {});
export const SynchronizationType = S.String;

export type McpServerUrl = string;
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
export interface FromUrlSynchronizationConfiguration {
  url: string;
  credentialProviderConfigurations?: RegistryRecordCredentialProviderConfiguration[];
}
export const FromUrlSynchronizationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    url: S.String,
    credentialProviderConfigurations: S.optional(
      RegistryRecordCredentialProviderConfigurationList,
    ),
  }),
).annotate({
  identifier: "FromUrlSynchronizationConfiguration",
}) as any as S.Schema<FromUrlSynchronizationConfiguration>;
export interface SynchronizationConfiguration {
  fromUrl?: FromUrlSynchronizationConfiguration;
}
export const SynchronizationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fromUrl: S.optional(FromUrlSynchronizationConfiguration) }),
).annotate({
  identifier: "SynchronizationConfiguration",
}) as any as S.Schema<SynchronizationConfiguration>;
export interface CreateRegistryRecordRequest {
  registryId: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  descriptorType: DescriptorType;
  descriptors?: Descriptors;
  recordVersion?: string;
  synchronizationType?: SynchronizationType;
  synchronizationConfiguration?: SynchronizationConfiguration;
  clientToken?: string;
}
export const CreateRegistryRecordRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.String.pipe(T.HttpLabel("registryId")),
    name: S.String,
    description: S.optional(SensitiveString),
    descriptorType: DescriptorType,
    descriptors: S.optional(Descriptors),
    recordVersion: S.optional(S.String),
    synchronizationType: S.optional(SynchronizationType),
    synchronizationConfiguration: S.optional(SynchronizationConfiguration),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
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
export type ResourceOauth2ReturnUrlType = string;
export type ResourceOauth2ReturnUrlListType = string[];
export const ResourceOauth2ReturnUrlListType = /*@__PURE__*/ S.Array(S.String);
export interface CreateWorkloadIdentityRequest {
  name: string;
  allowedResourceOauth2ReturnUrls?: string[];
  tags?: { [key: string]: string | undefined };
}
export const CreateWorkloadIdentityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    allowedResourceOauth2ReturnUrls: S.optional(
      ResourceOauth2ReturnUrlListType,
    ),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/identities/CreateWorkloadIdentity" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateWorkloadIdentityRequest",
}) as any as S.Schema<CreateWorkloadIdentityRequest>;
export type WorkloadIdentityArnType = string;
export interface CreateWorkloadIdentityResponse {
  name: string;
  workloadIdentityArn: string;
  allowedResourceOauth2ReturnUrls?: string[];
}
export const CreateWorkloadIdentityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    workloadIdentityArn: S.String,
    allowedResourceOauth2ReturnUrls: S.optional(
      ResourceOauth2ReturnUrlListType,
    ),
  }),
).annotate({
  identifier: "CreateWorkloadIdentityResponse",
}) as any as S.Schema<CreateWorkloadIdentityResponse>;
export interface DeleteAgentRuntimeRequest {
  agentRuntimeId: string;
  agentRuntimeVersion?: string;
  clientToken?: string;
}
export const DeleteAgentRuntimeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentRuntimeId: S.String.pipe(T.HttpLabel("agentRuntimeId")),
    agentRuntimeVersion: S.optional(S.String).pipe(T.HttpQuery("version")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/runtimes/{agentRuntimeId}/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAgentRuntimeRequest",
}) as any as S.Schema<DeleteAgentRuntimeRequest>;
export interface DeleteAgentRuntimeResponse {
  status: AgentRuntimeStatus;
  agentRuntimeId?: string;
  agentRuntimeVersion?: string;
}
export const DeleteAgentRuntimeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: AgentRuntimeStatus,
    agentRuntimeId: S.optional(S.String),
    agentRuntimeVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteAgentRuntimeResponse",
}) as any as S.Schema<DeleteAgentRuntimeResponse>;
export interface DeleteAgentRuntimeEndpointRequest {
  agentRuntimeId: string;
  endpointName: string | redacted.Redacted<string>;
  clientToken?: string;
}
export const DeleteAgentRuntimeEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentRuntimeId: S.String.pipe(T.HttpLabel("agentRuntimeId")),
    endpointName: SensitiveString.pipe(T.HttpLabel("endpointName")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/runtimes/{agentRuntimeId}/runtime-endpoints/{endpointName}/",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAgentRuntimeEndpointRequest",
}) as any as S.Schema<DeleteAgentRuntimeEndpointRequest>;
export interface DeleteAgentRuntimeEndpointResponse {
  status: AgentRuntimeEndpointStatus;
  agentRuntimeId?: string;
  endpointName?: string | redacted.Redacted<string>;
}
export const DeleteAgentRuntimeEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: AgentRuntimeEndpointStatus,
    agentRuntimeId: S.optional(S.String),
    endpointName: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "DeleteAgentRuntimeEndpointResponse",
}) as any as S.Schema<DeleteAgentRuntimeEndpointResponse>;
export interface DeleteApiKeyCredentialProviderRequest {
  name: string;
}
export const DeleteApiKeyCredentialProviderRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ name: S.String }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/identities/DeleteApiKeyCredentialProvider",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteApiKeyCredentialProviderRequest",
}) as any as S.Schema<DeleteApiKeyCredentialProviderRequest>;
export interface DeleteApiKeyCredentialProviderResponse {}
export const DeleteApiKeyCredentialProviderResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteApiKeyCredentialProviderResponse",
}) as any as S.Schema<DeleteApiKeyCredentialProviderResponse>;
export interface DeleteBrowserRequest {
  browserId: string;
  clientToken?: string;
}
export const DeleteBrowserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    browserId: S.String.pipe(T.HttpLabel("browserId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/browsers/{browserId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBrowserRequest",
}) as any as S.Schema<DeleteBrowserRequest>;
export interface DeleteBrowserResponse {
  browserId: string;
  status: BrowserStatus;
  lastUpdatedAt: Date;
}
export const DeleteBrowserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    browserId: S.String,
    status: BrowserStatus,
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "DeleteBrowserResponse",
}) as any as S.Schema<DeleteBrowserResponse>;
export interface DeleteBrowserProfileRequest {
  profileId: string;
  clientToken?: string;
}
export const DeleteBrowserProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileId: S.String.pipe(T.HttpLabel("profileId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/browser-profiles/{profileId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBrowserProfileRequest",
}) as any as S.Schema<DeleteBrowserProfileRequest>;
export interface DeleteBrowserProfileResponse {
  profileId: string;
  profileArn: string;
  status: BrowserProfileStatus;
  lastUpdatedAt: Date;
  lastSavedAt?: Date;
}
export const DeleteBrowserProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileId: S.String,
    profileArn: S.String,
    status: BrowserProfileStatus,
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastSavedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "DeleteBrowserProfileResponse",
}) as any as S.Schema<DeleteBrowserProfileResponse>;
export interface DeleteCapacityProviderInput {
  capacityProviderId: string;
  clientToken?: string;
}
export const DeleteCapacityProviderInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacityProviderId: S.String.pipe(T.HttpLabel("capacityProviderId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/capacity-providers/{capacityProviderId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCapacityProviderInput",
}) as any as S.Schema<DeleteCapacityProviderInput>;
export interface DeleteCapacityProviderOutput {
  capacityProviderId: string;
  status: CapacityProviderStatus;
}
export const DeleteCapacityProviderOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ capacityProviderId: S.String, status: CapacityProviderStatus }),
).annotate({
  identifier: "DeleteCapacityProviderOutput",
}) as any as S.Schema<DeleteCapacityProviderOutput>;
export interface DeleteCodeInterpreterRequest {
  codeInterpreterId: string;
  clientToken?: string;
}
export const DeleteCodeInterpreterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeInterpreterId: S.String.pipe(T.HttpLabel("codeInterpreterId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/code-interpreters/{codeInterpreterId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCodeInterpreterRequest",
}) as any as S.Schema<DeleteCodeInterpreterRequest>;
export interface DeleteCodeInterpreterResponse {
  codeInterpreterId: string;
  status: CodeInterpreterStatus;
  lastUpdatedAt: Date;
}
export const DeleteCodeInterpreterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeInterpreterId: S.String,
    status: CodeInterpreterStatus,
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "DeleteCodeInterpreterResponse",
}) as any as S.Schema<DeleteCodeInterpreterResponse>;
export interface DeleteConfigurationBundleRequest {
  bundleId: string;
}
export const DeleteConfigurationBundleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bundleId: S.String.pipe(T.HttpLabel("bundleId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/configuration-bundles/{bundleId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConfigurationBundleRequest",
}) as any as S.Schema<DeleteConfigurationBundleRequest>;
export type ConfigurationBundleStatus =
  | "ACTIVE"
  | "CREATING"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "DELETING"
  | "DELETE_FAILED"
  | (string & {});
export const ConfigurationBundleStatus = S.String;

export interface DeleteConfigurationBundleResponse {
  bundleId: string;
  status: ConfigurationBundleStatus;
}
export const DeleteConfigurationBundleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bundleId: S.String, status: ConfigurationBundleStatus }),
).annotate({
  identifier: "DeleteConfigurationBundleResponse",
}) as any as S.Schema<DeleteConfigurationBundleResponse>;
export interface DeleteDatasetRequest {
  datasetId: string;
  datasetVersion?: string;
}
export const DeleteDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetId: S.String.pipe(T.HttpLabel("datasetId")),
    datasetVersion: S.optional(S.String).pipe(T.HttpQuery("datasetVersion")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/datasets/{datasetId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDatasetRequest",
}) as any as S.Schema<DeleteDatasetRequest>;
export interface DeleteDatasetResponse {
  datasetArn: string;
  datasetId: string;
  status: DatasetStatus;
  datasetVersion: string;
  updatedAt: Date;
}
export const DeleteDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetArn: S.String,
    datasetId: S.String,
    status: DatasetStatus,
    datasetVersion: S.String,
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "DeleteDatasetResponse",
}) as any as S.Schema<DeleteDatasetResponse>;
export interface DeleteDatasetExamplesRequest {
  datasetId: string;
  clientToken?: string;
  exampleIds: string[];
}
export const DeleteDatasetExamplesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetId: S.String.pipe(T.HttpLabel("datasetId")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    exampleIds: ExampleIdList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/datasets/{datasetId}/examples/delete" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDatasetExamplesRequest",
}) as any as S.Schema<DeleteDatasetExamplesRequest>;
export interface DeleteDatasetExamplesResponse {
  datasetArn: string;
  datasetId: string;
  status: DatasetStatus;
  deletedCount: number;
  updatedAt: Date;
}
export const DeleteDatasetExamplesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetArn: S.String,
    datasetId: S.String,
    status: DatasetStatus,
    deletedCount: S.Number,
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "DeleteDatasetExamplesResponse",
}) as any as S.Schema<DeleteDatasetExamplesResponse>;
export interface DeleteEvaluatorRequest {
  evaluatorId: string;
}
export const DeleteEvaluatorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ evaluatorId: S.String.pipe(T.HttpLabel("evaluatorId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/evaluators/{evaluatorId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEvaluatorRequest",
}) as any as S.Schema<DeleteEvaluatorRequest>;
export type EvaluatorArn = string;
export interface DeleteEvaluatorResponse {
  evaluatorArn: string;
  evaluatorId: string;
  status: EvaluatorStatus;
}
export const DeleteEvaluatorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    evaluatorArn: S.String,
    evaluatorId: S.String,
    status: EvaluatorStatus,
  }),
).annotate({
  identifier: "DeleteEvaluatorResponse",
}) as any as S.Schema<DeleteEvaluatorResponse>;
export interface DeleteGatewayRequest {
  gatewayIdentifier: string;
}
export const DeleteGatewayRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayIdentifier: S.String.pipe(T.HttpLabel("gatewayIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/gateways/{gatewayIdentifier}/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGatewayRequest",
}) as any as S.Schema<DeleteGatewayRequest>;
export interface DeleteGatewayResponse {
  gatewayId: string;
  status: GatewayStatus;
  statusReasons?: string[];
}
export const DeleteGatewayResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String,
    status: GatewayStatus,
    statusReasons: S.optional(StatusReasons),
  }),
).annotate({
  identifier: "DeleteGatewayResponse",
}) as any as S.Schema<DeleteGatewayResponse>;
export interface DeleteGatewayRateLimitRequest {
  gatewayIdentifier: string;
  rateLimitId: string;
}
export const DeleteGatewayRateLimitRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayIdentifier: S.String.pipe(T.HttpLabel("gatewayIdentifier")),
    rateLimitId: S.String.pipe(T.HttpLabel("rateLimitId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/gateways/{gatewayIdentifier}/rate-limits/{rateLimitId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGatewayRateLimitRequest",
}) as any as S.Schema<DeleteGatewayRateLimitRequest>;
export interface DeleteGatewayRateLimitResponse {
  rateLimitId: string;
  status: GatewayRateLimitStatus;
}
export const DeleteGatewayRateLimitResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ rateLimitId: S.String, status: GatewayRateLimitStatus }),
).annotate({
  identifier: "DeleteGatewayRateLimitResponse",
}) as any as S.Schema<DeleteGatewayRateLimitResponse>;
export interface DeleteGatewayRuleRequest {
  gatewayIdentifier: string;
  ruleId: string;
}
export const DeleteGatewayRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayIdentifier: S.String.pipe(T.HttpLabel("gatewayIdentifier")),
    ruleId: S.String.pipe(T.HttpLabel("ruleId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/gateways/{gatewayIdentifier}/rules/{ruleId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGatewayRuleRequest",
}) as any as S.Schema<DeleteGatewayRuleRequest>;
export interface DeleteGatewayRuleResponse {
  ruleId: string;
  status: GatewayRuleStatus;
}
export const DeleteGatewayRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ruleId: S.String, status: GatewayRuleStatus }),
).annotate({
  identifier: "DeleteGatewayRuleResponse",
}) as any as S.Schema<DeleteGatewayRuleResponse>;
export interface DeleteGatewayTargetRequest {
  gatewayIdentifier: string;
  targetId: string;
}
export const DeleteGatewayTargetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayIdentifier: S.String.pipe(T.HttpLabel("gatewayIdentifier")),
    targetId: S.String.pipe(T.HttpLabel("targetId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/gateways/{gatewayIdentifier}/targets/{targetId}/",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGatewayTargetRequest",
}) as any as S.Schema<DeleteGatewayTargetRequest>;
export interface DeleteGatewayTargetResponse {
  gatewayArn: string;
  targetId: string;
  status: TargetStatus;
  statusReasons?: string[];
}
export const DeleteGatewayTargetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayArn: S.String,
    targetId: S.String,
    status: TargetStatus,
    statusReasons: S.optional(StatusReasons),
  }),
).annotate({
  identifier: "DeleteGatewayTargetResponse",
}) as any as S.Schema<DeleteGatewayTargetResponse>;
export interface DeleteHarnessRequest {
  harnessId: string;
  clientToken?: string;
  deleteManagedMemory?: boolean;
}
export const DeleteHarnessRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    harnessId: S.String.pipe(T.HttpLabel("harnessId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
    deleteManagedMemory: S.optional(S.Boolean).pipe(
      T.HttpQuery("deleteManagedMemory"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/harnesses/{harnessId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteHarnessRequest",
}) as any as S.Schema<DeleteHarnessRequest>;
export interface DeleteHarnessResponse {
  harness?: Harness;
}
export const DeleteHarnessResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ harness: S.optional(Harness) }),
).annotate({
  identifier: "DeleteHarnessResponse",
}) as any as S.Schema<DeleteHarnessResponse>;
export interface DeleteHarnessEndpointRequest {
  harnessId: string;
  endpointName: string;
  clientToken?: string;
}
export const DeleteHarnessEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    harnessId: S.String.pipe(T.HttpLabel("harnessId")),
    endpointName: S.String.pipe(T.HttpLabel("endpointName")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/harnesses/{harnessId}/endpoints/{endpointName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteHarnessEndpointRequest",
}) as any as S.Schema<DeleteHarnessEndpointRequest>;
export interface DeleteHarnessEndpointResponse {
  endpoint: HarnessEndpoint;
}
export const DeleteHarnessEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ endpoint: HarnessEndpoint }),
).annotate({
  identifier: "DeleteHarnessEndpointResponse",
}) as any as S.Schema<DeleteHarnessEndpointResponse>;
export interface DeleteMemoryInput {
  clientToken?: string;
  memoryId: string;
}
export const DeleteMemoryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
    memoryId: S.String.pipe(T.HttpLabel("memoryId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/memories/{memoryId}/delete" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMemoryInput",
}) as any as S.Schema<DeleteMemoryInput>;
export interface DeleteMemoryOutput {
  memoryId: string;
  status?: MemoryStatus;
}
export const DeleteMemoryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ memoryId: S.String, status: S.optional(MemoryStatus) }),
).annotate({
  identifier: "DeleteMemoryOutput",
}) as any as S.Schema<DeleteMemoryOutput>;
export interface DeleteOauth2CredentialProviderRequest {
  name: string;
}
export const DeleteOauth2CredentialProviderRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ name: S.String }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/identities/DeleteOauth2CredentialProvider",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteOauth2CredentialProviderRequest",
}) as any as S.Schema<DeleteOauth2CredentialProviderRequest>;
export interface DeleteOauth2CredentialProviderResponse {}
export const DeleteOauth2CredentialProviderResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteOauth2CredentialProviderResponse",
}) as any as S.Schema<DeleteOauth2CredentialProviderResponse>;
export interface DeleteOnlineEvaluationConfigRequest {
  onlineEvaluationConfigId: string;
}
export const DeleteOnlineEvaluationConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    onlineEvaluationConfigId: S.String.pipe(
      T.HttpLabel("onlineEvaluationConfigId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/online-evaluation-configs/{onlineEvaluationConfigId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteOnlineEvaluationConfigRequest",
}) as any as S.Schema<DeleteOnlineEvaluationConfigRequest>;
export interface DeleteOnlineEvaluationConfigResponse {
  onlineEvaluationConfigArn: string;
  onlineEvaluationConfigId: string;
  status: OnlineEvaluationConfigStatus;
}
export const DeleteOnlineEvaluationConfigResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      onlineEvaluationConfigArn: S.String,
      onlineEvaluationConfigId: S.String,
      status: OnlineEvaluationConfigStatus,
    }),
).annotate({
  identifier: "DeleteOnlineEvaluationConfigResponse",
}) as any as S.Schema<DeleteOnlineEvaluationConfigResponse>;
export interface DeletePaymentConnectorRequest {
  paymentManagerId: string;
  paymentConnectorId: string;
  clientToken?: string;
}
export const DeletePaymentConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentManagerId: S.String.pipe(T.HttpLabel("paymentManagerId")),
    paymentConnectorId: S.String.pipe(T.HttpLabel("paymentConnectorId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/payments/managers/{paymentManagerId}/connectors/{paymentConnectorId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePaymentConnectorRequest",
}) as any as S.Schema<DeletePaymentConnectorRequest>;
export interface DeletePaymentConnectorResponse {
  status: PaymentConnectorStatus;
  paymentConnectorId?: string;
}
export const DeletePaymentConnectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: PaymentConnectorStatus,
    paymentConnectorId: S.optional(S.String),
  }),
).annotate({
  identifier: "DeletePaymentConnectorResponse",
}) as any as S.Schema<DeletePaymentConnectorResponse>;
export interface DeletePaymentCredentialProviderRequest {
  name: string;
}
export const DeletePaymentCredentialProviderRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ name: S.String }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/identities/DeletePaymentCredentialProvider",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeletePaymentCredentialProviderRequest",
}) as any as S.Schema<DeletePaymentCredentialProviderRequest>;
export interface DeletePaymentCredentialProviderResponse {}
export const DeletePaymentCredentialProviderResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeletePaymentCredentialProviderResponse",
}) as any as S.Schema<DeletePaymentCredentialProviderResponse>;
export interface DeletePaymentManagerRequest {
  paymentManagerId: string;
  clientToken?: string;
}
export const DeletePaymentManagerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentManagerId: S.String.pipe(T.HttpLabel("paymentManagerId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/payments/managers/{paymentManagerId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePaymentManagerRequest",
}) as any as S.Schema<DeletePaymentManagerRequest>;
export interface DeletePaymentManagerResponse {
  status: PaymentManagerStatus;
  paymentManagerId?: string;
}
export const DeletePaymentManagerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: PaymentManagerStatus,
    paymentManagerId: S.optional(S.String),
  }),
).annotate({
  identifier: "DeletePaymentManagerResponse",
}) as any as S.Schema<DeletePaymentManagerResponse>;
export interface DeletePolicyRequest {
  policyEngineId: string;
  policyId: string;
}
export const DeletePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyEngineId: S.String.pipe(T.HttpLabel("policyEngineId")),
    policyId: S.String.pipe(T.HttpLabel("policyId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/policy-engines/{policyEngineId}/policies/{policyId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePolicyRequest",
}) as any as S.Schema<DeletePolicyRequest>;
export interface DeletePolicyResponse {
  policyId: string;
  name: string;
  policyEngineId: string;
  createdAt: Date;
  updatedAt: Date;
  policyArn: string;
  status: PolicyStatus;
  enforcementMode?: EnforcementMode;
  definition: PolicyDefinition;
  description?: string | redacted.Redacted<string>;
  statusReasons: string[];
}
export const DeletePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyId: S.String,
    name: S.String,
    policyEngineId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    policyArn: S.String,
    status: PolicyStatus,
    enforcementMode: S.optional(EnforcementMode),
    definition: PolicyDefinition,
    description: S.optional(SensitiveString),
    statusReasons: PolicyStatusReasons,
  }),
).annotate({
  identifier: "DeletePolicyResponse",
}) as any as S.Schema<DeletePolicyResponse>;
export interface DeletePolicyEngineRequest {
  policyEngineId: string;
}
export const DeletePolicyEngineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyEngineId: S.String.pipe(T.HttpLabel("policyEngineId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/policy-engines/{policyEngineId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePolicyEngineRequest",
}) as any as S.Schema<DeletePolicyEngineRequest>;
export interface DeletePolicyEngineResponse {
  policyEngineId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  policyEngineArn: string;
  status: PolicyEngineStatus;
  encryptionKeyArn?: string;
  description?: string | redacted.Redacted<string>;
  statusReasons: string[];
}
export const DeletePolicyEngineResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyEngineId: S.String,
    name: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    policyEngineArn: S.String,
    status: PolicyEngineStatus,
    encryptionKeyArn: S.optional(S.String),
    description: S.optional(SensitiveString),
    statusReasons: PolicyStatusReasons,
  }),
).annotate({
  identifier: "DeletePolicyEngineResponse",
}) as any as S.Schema<DeletePolicyEngineResponse>;
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
export interface DeleteResourcePolicyRequest {
  resourceArn: string;
}
export const DeleteResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/resourcepolicy/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
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
export interface DeleteWorkloadIdentityRequest {
  name: string;
}
export const DeleteWorkloadIdentityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/identities/DeleteWorkloadIdentity" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteWorkloadIdentityRequest",
}) as any as S.Schema<DeleteWorkloadIdentityRequest>;
export interface DeleteWorkloadIdentityResponse {}
export const DeleteWorkloadIdentityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteWorkloadIdentityResponse",
}) as any as S.Schema<DeleteWorkloadIdentityResponse>;
export interface GetAgentRuntimeRequest {
  agentRuntimeId: string;
  agentRuntimeVersion?: string;
}
export const GetAgentRuntimeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentRuntimeId: S.String.pipe(T.HttpLabel("agentRuntimeId")),
    agentRuntimeVersion: S.optional(S.String).pipe(T.HttpQuery("version")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/runtimes/{agentRuntimeId}/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAgentRuntimeRequest",
}) as any as S.Schema<GetAgentRuntimeRequest>;
export interface RuntimeMetadataConfiguration {
  requireMMDSV2: boolean;
}
export const RuntimeMetadataConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ requireMMDSV2: S.Boolean }),
).annotate({
  identifier: "RuntimeMetadataConfiguration",
}) as any as S.Schema<RuntimeMetadataConfiguration>;
export interface GetAgentRuntimeResponse {
  agentRuntimeArn: string;
  agentRuntimeName: string;
  agentRuntimeId: string;
  agentRuntimeVersion: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  roleArn: string;
  networkConfiguration?: NetworkConfiguration;
  status: AgentRuntimeStatus;
  lifecycleConfiguration: LifecycleConfiguration;
  failureReason?: string;
  description?: string | redacted.Redacted<string>;
  workloadIdentityDetails?: WorkloadIdentityDetails;
  agentRuntimeArtifact?: AgentRuntimeArtifact;
  protocolConfiguration?: ProtocolConfiguration;
  environmentVariables?: { [key: string]: string | undefined };
  authorizerConfiguration?: AuthorizerConfiguration;
  requestHeaderConfiguration?: RequestHeaderConfiguration;
  metadataConfiguration?: RuntimeMetadataConfiguration;
  filesystemConfigurations?: FilesystemConfiguration[];
  capacityProviderConfiguration?: CapacityProviderConfiguration & {
    capacityProviderArn: CapacityProviderArn;
  };
}
export const GetAgentRuntimeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentRuntimeArn: S.String,
    agentRuntimeName: S.String,
    agentRuntimeId: S.String,
    agentRuntimeVersion: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    roleArn: S.String,
    networkConfiguration: S.optional(NetworkConfiguration),
    status: AgentRuntimeStatus,
    lifecycleConfiguration: LifecycleConfiguration,
    failureReason: S.optional(S.String),
    description: S.optional(SensitiveString),
    workloadIdentityDetails: S.optional(WorkloadIdentityDetails),
    agentRuntimeArtifact: S.optional(AgentRuntimeArtifact),
    protocolConfiguration: S.optional(ProtocolConfiguration),
    environmentVariables: S.optional(EnvironmentVariablesMap),
    authorizerConfiguration: S.optional(AuthorizerConfiguration),
    requestHeaderConfiguration: S.optional(RequestHeaderConfiguration),
    metadataConfiguration: S.optional(RuntimeMetadataConfiguration),
    filesystemConfigurations: S.optional(FilesystemConfigurations),
    capacityProviderConfiguration: S.optional(CapacityProviderConfiguration),
  }),
).annotate({
  identifier: "GetAgentRuntimeResponse",
}) as any as S.Schema<GetAgentRuntimeResponse>;
export interface GetAgentRuntimeEndpointRequest {
  agentRuntimeId: string;
  endpointName: string | redacted.Redacted<string>;
}
export const GetAgentRuntimeEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentRuntimeId: S.String.pipe(T.HttpLabel("agentRuntimeId")),
    endpointName: SensitiveString.pipe(T.HttpLabel("endpointName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/runtimes/{agentRuntimeId}/runtime-endpoints/{endpointName}/",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAgentRuntimeEndpointRequest",
}) as any as S.Schema<GetAgentRuntimeEndpointRequest>;
export type AgentRuntimeEndpointId = string;
export interface GetAgentRuntimeEndpointResponse {
  liveVersion?: string;
  targetVersion?: string;
  agentRuntimeEndpointArn: string;
  agentRuntimeArn: string;
  description?: string;
  status: AgentRuntimeEndpointStatus;
  createdAt: Date;
  lastUpdatedAt: Date;
  failureReason?: string;
  name: string | redacted.Redacted<string>;
  id: string;
}
export const GetAgentRuntimeEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    liveVersion: S.optional(S.String),
    targetVersion: S.optional(S.String),
    agentRuntimeEndpointArn: S.String,
    agentRuntimeArn: S.String,
    description: S.optional(S.String),
    status: AgentRuntimeEndpointStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    failureReason: S.optional(S.String),
    name: SensitiveString,
    id: S.String,
  }),
).annotate({
  identifier: "GetAgentRuntimeEndpointResponse",
}) as any as S.Schema<GetAgentRuntimeEndpointResponse>;
export interface GetApiKeyCredentialProviderRequest {
  name: string;
}
export const GetApiKeyCredentialProviderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/identities/GetApiKeyCredentialProvider",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetApiKeyCredentialProviderRequest",
}) as any as S.Schema<GetApiKeyCredentialProviderRequest>;
export interface GetApiKeyCredentialProviderResponse {
  apiKeySecretArn: Secret;
  apiKeySecretJsonKey?: string;
  apiKeySecretSource?: SecretSourceType;
  name: string;
  credentialProviderArn: string;
  createdTime: Date;
  lastUpdatedTime: Date;
}
export const GetApiKeyCredentialProviderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiKeySecretArn: Secret,
    apiKeySecretJsonKey: S.optional(S.String),
    apiKeySecretSource: S.optional(SecretSourceType),
    name: S.String,
    credentialProviderArn: S.String,
    createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "GetApiKeyCredentialProviderResponse",
}) as any as S.Schema<GetApiKeyCredentialProviderResponse>;
export interface GetBrowserRequest {
  browserId: string;
}
export const GetBrowserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ browserId: S.String.pipe(T.HttpLabel("browserId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/browsers/{browserId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBrowserRequest",
}) as any as S.Schema<GetBrowserRequest>;
export interface BrowserSigningConfigOutput {
  enabled: boolean;
}
export const BrowserSigningConfigOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enabled: S.Boolean }),
).annotate({
  identifier: "BrowserSigningConfigOutput",
}) as any as S.Schema<BrowserSigningConfigOutput>;
export interface GetBrowserResponse {
  browserId: string;
  browserArn: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  executionRoleArn?: string;
  networkConfiguration: BrowserNetworkConfiguration;
  recording?: RecordingConfig;
  browserSigning?: BrowserSigningConfigOutput;
  enterprisePolicies?: BrowserEnterprisePolicy[];
  certificates?: Certificate[];
  filesystemConfigurations?: ToolsFileSystemConfiguration[];
  status: BrowserStatus;
  failureReason?: string;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export const GetBrowserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    browserId: S.String,
    browserArn: S.String,
    name: S.String,
    description: S.optional(SensitiveString),
    executionRoleArn: S.optional(S.String),
    networkConfiguration: BrowserNetworkConfiguration,
    recording: S.optional(RecordingConfig),
    browserSigning: S.optional(BrowserSigningConfigOutput),
    enterprisePolicies: S.optional(BrowserEnterprisePolicies),
    certificates: S.optional(Certificates),
    filesystemConfigurations: S.optional(ToolsFileSystemConfigurations),
    status: BrowserStatus,
    failureReason: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "GetBrowserResponse",
}) as any as S.Schema<GetBrowserResponse>;
export interface GetBrowserProfileRequest {
  profileId: string;
}
export const GetBrowserProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ profileId: S.String.pipe(T.HttpLabel("profileId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/browser-profiles/{profileId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBrowserProfileRequest",
}) as any as S.Schema<GetBrowserProfileRequest>;
export type BrowserSessionId = string;
export interface GetBrowserProfileResponse {
  profileId: string;
  profileArn: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  status: BrowserProfileStatus;
  createdAt: Date;
  lastUpdatedAt: Date;
  lastSavedAt?: Date;
  lastSavedBrowserSessionId?: string;
  lastSavedBrowserId?: string;
}
export const GetBrowserProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileId: S.String,
    profileArn: S.String,
    name: S.String,
    description: S.optional(SensitiveString),
    status: BrowserProfileStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastSavedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastSavedBrowserSessionId: S.optional(S.String),
    lastSavedBrowserId: S.optional(S.String),
  }),
).annotate({
  identifier: "GetBrowserProfileResponse",
}) as any as S.Schema<GetBrowserProfileResponse>;
export interface GetCapacityProviderInput {
  capacityProviderId: string;
}
export const GetCapacityProviderInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacityProviderId: S.String.pipe(T.HttpLabel("capacityProviderId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/capacity-providers/{capacityProviderId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCapacityProviderInput",
}) as any as S.Schema<GetCapacityProviderInput>;
export type CapacityProviderStatusCode =
  | "VALIDATION_ERROR"
  | "QUOTA_EXCEEDED"
  | "THROTTLED"
  | "INTERNAL_SERVER_EXCEPTION"
  | (string & {});
export const CapacityProviderStatusCode = S.String;

export interface GetCapacityProviderOutput {
  capacityProviderId: string;
  capacityProviderArn: string;
  name: string;
  status: CapacityProviderStatus;
  description?: string | redacted.Redacted<string>;
  statusCode?: CapacityProviderStatusCode;
  statusReason?: string;
  permissionsConfiguration: PermissionsConfiguration;
  computeConfiguration: ComputeConfiguration;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export const GetCapacityProviderOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacityProviderId: S.String,
    capacityProviderArn: S.String,
    name: S.String,
    status: CapacityProviderStatus,
    description: S.optional(SensitiveString),
    statusCode: S.optional(CapacityProviderStatusCode),
    statusReason: S.optional(S.String),
    permissionsConfiguration: PermissionsConfiguration,
    computeConfiguration: ComputeConfiguration,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "GetCapacityProviderOutput",
}) as any as S.Schema<GetCapacityProviderOutput>;
export interface GetCodeInterpreterRequest {
  codeInterpreterId: string;
}
export const GetCodeInterpreterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeInterpreterId: S.String.pipe(T.HttpLabel("codeInterpreterId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/code-interpreters/{codeInterpreterId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCodeInterpreterRequest",
}) as any as S.Schema<GetCodeInterpreterRequest>;
export interface GetCodeInterpreterResponse {
  codeInterpreterId: string;
  codeInterpreterArn: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  executionRoleArn?: string;
  networkConfiguration: CodeInterpreterNetworkConfiguration;
  status: CodeInterpreterStatus;
  certificates?: Certificate[];
  filesystemConfigurations?: ToolsFileSystemConfiguration[];
  failureReason?: string;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export const GetCodeInterpreterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeInterpreterId: S.String,
    codeInterpreterArn: S.String,
    name: S.String,
    description: S.optional(SensitiveString),
    executionRoleArn: S.optional(S.String),
    networkConfiguration: CodeInterpreterNetworkConfiguration,
    status: CodeInterpreterStatus,
    certificates: S.optional(Certificates),
    filesystemConfigurations: S.optional(ToolsFileSystemConfigurations),
    failureReason: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "GetCodeInterpreterResponse",
}) as any as S.Schema<GetCodeInterpreterResponse>;
export interface GetConfigurationBundleRequest {
  bundleId: string;
  branchName?: string;
}
export const GetConfigurationBundleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bundleId: S.String.pipe(T.HttpLabel("bundleId")),
    branchName: S.optional(S.String).pipe(T.HttpQuery("branchName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/configuration-bundles/{bundleId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConfigurationBundleRequest",
}) as any as S.Schema<GetConfigurationBundleRequest>;
export type ConfigurationBundleVersionList = string[];
export const ConfigurationBundleVersionList = /*@__PURE__*/ S.Array(S.String);
export interface VersionLineageMetadata {
  parentVersionIds?: string[];
  branchName?: string;
  createdBy?: VersionCreatedBySource;
  commitMessage?: string;
}
export const VersionLineageMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    parentVersionIds: S.optional(ConfigurationBundleVersionList),
    branchName: S.optional(S.String),
    createdBy: S.optional(VersionCreatedBySource),
    commitMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "VersionLineageMetadata",
}) as any as S.Schema<VersionLineageMetadata>;
export interface GetConfigurationBundleResponse {
  bundleArn: string;
  bundleId: string;
  bundleName: string;
  description?: string | redacted.Redacted<string>;
  versionId: string;
  components: { [key: string]: ComponentConfiguration | undefined };
  lineageMetadata?: VersionLineageMetadata;
  createdAt: Date;
  updatedAt: Date;
  kmsKeyArn?: string;
}
export const GetConfigurationBundleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bundleArn: S.String,
    bundleId: S.String,
    bundleName: S.String,
    description: S.optional(SensitiveString),
    versionId: S.String,
    components: ComponentConfigurationMap,
    lineageMetadata: S.optional(VersionLineageMetadata),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    kmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetConfigurationBundleResponse",
}) as any as S.Schema<GetConfigurationBundleResponse>;
export interface GetConfigurationBundleVersionRequest {
  bundleId: string;
  versionId: string;
}
export const GetConfigurationBundleVersionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      bundleId: S.String.pipe(T.HttpLabel("bundleId")),
      versionId: S.String.pipe(T.HttpLabel("versionId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/configuration-bundles/{bundleId}/versions/{versionId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetConfigurationBundleVersionRequest",
}) as any as S.Schema<GetConfigurationBundleVersionRequest>;
export interface GetConfigurationBundleVersionResponse {
  bundleArn: string;
  bundleId: string;
  bundleName: string;
  description?: string | redacted.Redacted<string>;
  versionId: string;
  components: { [key: string]: ComponentConfiguration | undefined };
  lineageMetadata?: VersionLineageMetadata;
  createdAt: Date;
  versionCreatedAt: Date;
  kmsKeyArn?: string;
}
export const GetConfigurationBundleVersionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      bundleArn: S.String,
      bundleId: S.String,
      bundleName: S.String,
      description: S.optional(SensitiveString),
      versionId: S.String,
      components: ComponentConfigurationMap,
      lineageMetadata: S.optional(VersionLineageMetadata),
      createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      versionCreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      kmsKeyArn: S.optional(S.String),
    }),
).annotate({
  identifier: "GetConfigurationBundleVersionResponse",
}) as any as S.Schema<GetConfigurationBundleVersionResponse>;
export interface GetDatasetRequest {
  datasetId: string;
  datasetVersion?: string;
}
export const GetDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetId: S.String.pipe(T.HttpLabel("datasetId")),
    datasetVersion: S.optional(S.String).pipe(T.HttpQuery("datasetVersion")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/datasets/{datasetId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDatasetRequest",
}) as any as S.Schema<GetDatasetRequest>;
export type DraftStatus = "MODIFIED" | "UNMODIFIED" | (string & {});
export const DraftStatus = S.String;

export type DownloadUrl = string | redacted.Redacted<string>;
export interface GetDatasetResponse {
  datasetArn: string;
  datasetId: string;
  datasetVersion: string;
  datasetName: string;
  description?: string;
  status: DatasetStatus;
  draftStatus?: DraftStatus;
  failureReason?: string;
  schemaType: DatasetSchemaType;
  kmsKeyArn?: string;
  exampleCount: number;
  downloadUrl?: string | redacted.Redacted<string>;
  downloadUrlExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  tags?: { [key: string]: string | undefined };
}
export const GetDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetArn: S.String,
    datasetId: S.String,
    datasetVersion: S.String,
    datasetName: S.String,
    description: S.optional(S.String),
    status: DatasetStatus,
    draftStatus: S.optional(DraftStatus),
    failureReason: S.optional(S.String),
    schemaType: DatasetSchemaType,
    kmsKeyArn: S.optional(S.String),
    exampleCount: S.Number,
    downloadUrl: S.optional(SensitiveString),
    downloadUrlExpiresAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    tags: S.optional(TagsMap),
  }),
).annotate({
  identifier: "GetDatasetResponse",
}) as any as S.Schema<GetDatasetResponse>;
export type IncludedData = "ALL_DATA" | "METADATA_ONLY" | (string & {});
export const IncludedData = S.String;

export interface GetEvaluatorRequest {
  evaluatorId: string;
  includedData?: IncludedData;
}
export const GetEvaluatorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    evaluatorId: S.String.pipe(T.HttpLabel("evaluatorId")),
    includedData: S.optional(IncludedData).pipe(T.HttpQuery("includedData")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/evaluators/{evaluatorId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEvaluatorRequest",
}) as any as S.Schema<GetEvaluatorRequest>;
export type EvaluatorName = string;
export type EvaluatorType =
  | "Builtin"
  | "ThirdParty"
  | "Custom"
  | "CustomCode"
  | "CustomDerived"
  | (string & {});
export const EvaluatorType = S.String;

export type Provider =
  | "AWS"
  | "DeepEval"
  | "AutoEval"
  | "Custom"
  | (string & {});
export const Provider = S.String;

export interface GetEvaluatorResponse {
  evaluatorArn: string;
  evaluatorId: string;
  evaluatorName: string;
  description?: string | redacted.Redacted<string>;
  evaluatorConfig: EvaluatorConfig;
  evaluatorType?: EvaluatorType;
  provider?: Provider;
  level: EvaluatorLevel;
  status: EvaluatorStatus;
  createdAt: Date;
  updatedAt: Date;
  lockedForModification?: boolean;
  kmsKeyArn?: string;
}
export const GetEvaluatorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    evaluatorArn: S.String,
    evaluatorId: S.String,
    evaluatorName: S.String,
    description: S.optional(SensitiveString),
    evaluatorConfig: EvaluatorConfig,
    evaluatorType: S.optional(EvaluatorType),
    provider: S.optional(Provider),
    level: EvaluatorLevel,
    status: EvaluatorStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lockedForModification: S.optional(S.Boolean),
    kmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetEvaluatorResponse",
}) as any as S.Schema<GetEvaluatorResponse>;
export interface GetGatewayRequest {
  gatewayIdentifier: string;
}
export const GetGatewayRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayIdentifier: S.String.pipe(T.HttpLabel("gatewayIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/gateways/{gatewayIdentifier}/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGatewayRequest",
}) as any as S.Schema<GetGatewayRequest>;
export interface GetGatewayResponse {
  gatewayArn: string;
  gatewayId: string;
  gatewayUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  status: GatewayStatus;
  statusReasons?: string[];
  name: string;
  description?: string | redacted.Redacted<string>;
  roleArn?: string;
  protocolType?: GatewayProtocolType;
  protocolConfiguration?: GatewayProtocolConfiguration;
  authorizerType: AuthorizerType;
  authorizerConfiguration?: AuthorizerConfiguration;
  kmsKeyArn?: string;
  customTransformConfiguration?: CustomTransformConfiguration;
  interceptorConfigurations?: GatewayInterceptorConfiguration[];
  policyEngineConfiguration?: GatewayPolicyEngineConfiguration;
  workloadIdentityDetails?: WorkloadIdentityDetails;
  exceptionLevel?: ExceptionLevel;
  webAclArn?: string;
  wafConfiguration?: WafConfiguration;
}
export const GetGatewayResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayArn: S.String,
    gatewayId: S.String,
    gatewayUrl: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: GatewayStatus,
    statusReasons: S.optional(StatusReasons),
    name: S.String,
    description: S.optional(SensitiveString),
    roleArn: S.optional(S.String),
    protocolType: S.optional(GatewayProtocolType),
    protocolConfiguration: S.optional(GatewayProtocolConfiguration),
    authorizerType: AuthorizerType,
    authorizerConfiguration: S.optional(AuthorizerConfiguration),
    kmsKeyArn: S.optional(S.String),
    customTransformConfiguration: S.optional(CustomTransformConfiguration),
    interceptorConfigurations: S.optional(GatewayInterceptorConfigurations),
    policyEngineConfiguration: S.optional(GatewayPolicyEngineConfiguration),
    workloadIdentityDetails: S.optional(WorkloadIdentityDetails),
    exceptionLevel: S.optional(ExceptionLevel),
    webAclArn: S.optional(S.String),
    wafConfiguration: S.optional(WafConfiguration),
  }),
).annotate({
  identifier: "GetGatewayResponse",
}) as any as S.Schema<GetGatewayResponse>;
export interface GetGatewayRateLimitRequest {
  gatewayIdentifier: string;
  rateLimitId: string;
}
export const GetGatewayRateLimitRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayIdentifier: S.String.pipe(T.HttpLabel("gatewayIdentifier")),
    rateLimitId: S.String.pipe(T.HttpLabel("rateLimitId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/gateways/{gatewayIdentifier}/rate-limits/{rateLimitId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGatewayRateLimitRequest",
}) as any as S.Schema<GetGatewayRateLimitRequest>;
export interface GetGatewayRateLimitResponse {
  rateLimitId: string;
  gatewayIdentifier: string;
  description?: string;
  dimensionKeys: string[];
  entries: LimitEntry[];
  status: GatewayRateLimitStatus;
  createdAt: Date;
  updatedAt: Date;
}
export const GetGatewayRateLimitResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    rateLimitId: S.String,
    gatewayIdentifier: S.String,
    description: S.optional(S.String),
    dimensionKeys: DimensionKeys,
    entries: LimitEntries,
    status: GatewayRateLimitStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "GetGatewayRateLimitResponse",
}) as any as S.Schema<GetGatewayRateLimitResponse>;
export interface GetGatewayRuleRequest {
  gatewayIdentifier: string;
  ruleId: string;
}
export const GetGatewayRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayIdentifier: S.String.pipe(T.HttpLabel("gatewayIdentifier")),
    ruleId: S.String.pipe(T.HttpLabel("ruleId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/gateways/{gatewayIdentifier}/rules/{ruleId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGatewayRuleRequest",
}) as any as S.Schema<GetGatewayRuleRequest>;
export interface GetGatewayRuleResponse {
  ruleId: string;
  gatewayArn: string;
  priority: number;
  conditions?: Condition[];
  actions: Action[];
  description?: string;
  createdAt: Date;
  status: GatewayRuleStatus;
  system?: SystemManagedBlock;
  updatedAt?: Date;
}
export const GetGatewayRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleId: S.String,
    gatewayArn: S.String,
    priority: S.Number,
    conditions: S.optional(Conditions),
    actions: Actions,
    description: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: GatewayRuleStatus,
    system: S.optional(SystemManagedBlock),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetGatewayRuleResponse",
}) as any as S.Schema<GetGatewayRuleResponse>;
export interface GetGatewayTargetRequest {
  gatewayIdentifier: string;
  targetId: string;
}
export const GetGatewayTargetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayIdentifier: S.String.pipe(T.HttpLabel("gatewayIdentifier")),
    targetId: S.String.pipe(T.HttpLabel("targetId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/gateways/{gatewayIdentifier}/targets/{targetId}/",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGatewayTargetRequest",
}) as any as S.Schema<GetGatewayTargetRequest>;
export interface GetGatewayTargetResponse {
  gatewayArn: string;
  targetId: string;
  createdAt: Date;
  updatedAt: Date;
  status: TargetStatus;
  statusReasons?: string[];
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  targetConfiguration: TargetConfiguration;
  credentialProviderConfigurations: CredentialProviderConfiguration[];
  lastSynchronizedAt?: Date;
  metadataConfiguration?: MetadataConfiguration;
  privateEndpoint?: PrivateEndpoint;
  privateEndpointManagedResources?: ManagedResourceDetails[];
  authorizationData?: AuthorizationData;
  protocolType?: TargetProtocolType;
}
export const GetGatewayTargetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayArn: S.String,
    targetId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: TargetStatus,
    statusReasons: S.optional(StatusReasons),
    name: SensitiveString,
    description: S.optional(SensitiveString),
    targetConfiguration: TargetConfiguration,
    credentialProviderConfigurations: CredentialProviderConfigurations,
    lastSynchronizedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    metadataConfiguration: S.optional(MetadataConfiguration),
    privateEndpoint: S.optional(PrivateEndpoint),
    privateEndpointManagedResources: S.optional(
      PrivateEndpointManagedResources,
    ),
    authorizationData: S.optional(AuthorizationData),
    protocolType: S.optional(TargetProtocolType),
  }),
).annotate({
  identifier: "GetGatewayTargetResponse",
}) as any as S.Schema<GetGatewayTargetResponse>;
export interface GetHarnessRequest {
  harnessId: string;
  harnessVersion?: string;
}
export const GetHarnessRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    harnessId: S.String.pipe(T.HttpLabel("harnessId")),
    harnessVersion: S.optional(S.String).pipe(T.HttpQuery("harnessVersion")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/harnesses/{harnessId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetHarnessRequest",
}) as any as S.Schema<GetHarnessRequest>;
export interface GetHarnessResponse {
  harness: Harness;
}
export const GetHarnessResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ harness: Harness }),
).annotate({
  identifier: "GetHarnessResponse",
}) as any as S.Schema<GetHarnessResponse>;
export interface GetHarnessEndpointRequest {
  harnessId: string;
  endpointName: string;
}
export const GetHarnessEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    harnessId: S.String.pipe(T.HttpLabel("harnessId")),
    endpointName: S.String.pipe(T.HttpLabel("endpointName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/harnesses/{harnessId}/endpoints/{endpointName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetHarnessEndpointRequest",
}) as any as S.Schema<GetHarnessEndpointRequest>;
export interface GetHarnessEndpointResponse {
  endpoint: HarnessEndpoint;
}
export const GetHarnessEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ endpoint: HarnessEndpoint }),
).annotate({
  identifier: "GetHarnessEndpointResponse",
}) as any as S.Schema<GetHarnessEndpointResponse>;
export type MemoryView = "full" | "without_decryption" | (string & {});
export const MemoryView = S.String;

export interface GetMemoryInput {
  memoryId: string;
  view?: MemoryView;
}
export const GetMemoryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memoryId: S.String.pipe(T.HttpLabel("memoryId")),
    view: S.optional(MemoryView).pipe(T.HttpQuery("view")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/memories/{memoryId}/details" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetMemoryInput" }) as any as S.Schema<GetMemoryInput>;
export interface GetMemoryOutput {
  memory: Memory;
}
export const GetMemoryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ memory: Memory }),
).annotate({
  identifier: "GetMemoryOutput",
}) as any as S.Schema<GetMemoryOutput>;
export interface GetOauth2CredentialProviderRequest {
  name: string;
}
export const GetOauth2CredentialProviderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/identities/GetOauth2CredentialProvider",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOauth2CredentialProviderRequest",
}) as any as S.Schema<GetOauth2CredentialProviderRequest>;
export interface GetOauth2CredentialProviderResponse {
  clientSecretArn: Secret;
  clientSecretJsonKey?: string;
  clientSecretSource?: SecretSourceType;
  name: string;
  credentialProviderArn: string;
  credentialProviderVendor: CredentialProviderVendorType;
  callbackUrl?: string;
  oauth2ProviderConfigOutput: Oauth2ProviderConfigOutput;
  createdTime: Date;
  lastUpdatedTime: Date;
  status?: Status;
  failureReason?: string;
}
export const GetOauth2CredentialProviderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientSecretArn: Secret,
    clientSecretJsonKey: S.optional(S.String),
    clientSecretSource: S.optional(SecretSourceType),
    name: S.String,
    credentialProviderArn: S.String,
    credentialProviderVendor: CredentialProviderVendorType,
    callbackUrl: S.optional(S.String),
    oauth2ProviderConfigOutput: Oauth2ProviderConfigOutput,
    createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: S.optional(Status),
    failureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "GetOauth2CredentialProviderResponse",
}) as any as S.Schema<GetOauth2CredentialProviderResponse>;
export interface GetOnlineEvaluationConfigRequest {
  onlineEvaluationConfigId: string;
}
export const GetOnlineEvaluationConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    onlineEvaluationConfigId: S.String.pipe(
      T.HttpLabel("onlineEvaluationConfigId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/online-evaluation-configs/{onlineEvaluationConfigId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOnlineEvaluationConfigRequest",
}) as any as S.Schema<GetOnlineEvaluationConfigRequest>;
export interface GetOnlineEvaluationConfigResponse {
  onlineEvaluationConfigArn: string;
  onlineEvaluationConfigId: string;
  onlineEvaluationConfigName: string;
  description?: string | redacted.Redacted<string>;
  rule: Rule;
  dataSourceConfig: DataSourceConfig;
  evaluators?: EvaluatorReference[];
  insights?: Insight[];
  clusteringConfig?: ClusteringConfig;
  outputConfig?: OutputConfig;
  evaluationExecutionRoleArn?: string;
  status: OnlineEvaluationConfigStatus;
  executionStatus: OnlineEvaluationExecutionStatus;
  createdAt: Date;
  updatedAt: Date;
  failureReason?: string;
}
export const GetOnlineEvaluationConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    onlineEvaluationConfigArn: S.String,
    onlineEvaluationConfigId: S.String,
    onlineEvaluationConfigName: S.String,
    description: S.optional(SensitiveString),
    rule: Rule,
    dataSourceConfig: DataSourceConfig,
    evaluators: S.optional(EvaluatorList),
    insights: S.optional(InsightList),
    clusteringConfig: S.optional(ClusteringConfig),
    outputConfig: S.optional(OutputConfig),
    evaluationExecutionRoleArn: S.optional(S.String),
    status: OnlineEvaluationConfigStatus,
    executionStatus: OnlineEvaluationExecutionStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    failureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "GetOnlineEvaluationConfigResponse",
}) as any as S.Schema<GetOnlineEvaluationConfigResponse>;
export interface GetPaymentConnectorRequest {
  paymentManagerId: string;
  paymentConnectorId: string;
}
export const GetPaymentConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentManagerId: S.String.pipe(T.HttpLabel("paymentManagerId")),
    paymentConnectorId: S.String.pipe(T.HttpLabel("paymentConnectorId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/payments/managers/{paymentManagerId}/connectors/{paymentConnectorId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPaymentConnectorRequest",
}) as any as S.Schema<GetPaymentConnectorRequest>;
export interface GetPaymentConnectorResponse {
  paymentConnectorId: string;
  name: string;
  description?: string;
  type: PaymentConnectorType;
  credentialProviderConfigurations: CredentialsProviderConfiguration[];
  createdAt: Date;
  lastUpdatedAt: Date;
  status: PaymentConnectorStatus;
  authorizationUrl?: string;
}
export const GetPaymentConnectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentConnectorId: S.String,
    name: S.String,
    description: S.optional(S.String),
    type: PaymentConnectorType,
    credentialProviderConfigurations: CredentialsProviderConfigurations,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: PaymentConnectorStatus,
    authorizationUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "GetPaymentConnectorResponse",
}) as any as S.Schema<GetPaymentConnectorResponse>;
export interface GetPaymentCredentialProviderRequest {
  name: string;
}
export const GetPaymentCredentialProviderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/identities/GetPaymentCredentialProvider",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPaymentCredentialProviderRequest",
}) as any as S.Schema<GetPaymentCredentialProviderRequest>;
export interface GetPaymentCredentialProviderResponse {
  name: string;
  credentialProviderArn: string;
  credentialProviderVendor: PaymentCredentialProviderVendorType;
  providerConfigurationOutput: PaymentProviderConfigurationOutput;
  createdTime: Date;
  lastUpdatedTime: Date;
  tags?: { [key: string]: string | undefined };
}
export const GetPaymentCredentialProviderResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      name: S.String,
      credentialProviderArn: S.String,
      credentialProviderVendor: PaymentCredentialProviderVendorType,
      providerConfigurationOutput: PaymentProviderConfigurationOutput,
      createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      lastUpdatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      tags: S.optional(TagsMap),
    }),
).annotate({
  identifier: "GetPaymentCredentialProviderResponse",
}) as any as S.Schema<GetPaymentCredentialProviderResponse>;
export interface GetPaymentManagerRequest {
  paymentManagerId: string;
}
export const GetPaymentManagerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentManagerId: S.String.pipe(T.HttpLabel("paymentManagerId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/payments/managers/{paymentManagerId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPaymentManagerRequest",
}) as any as S.Schema<GetPaymentManagerRequest>;
export interface GetPaymentManagerResponse {
  paymentManagerArn: string;
  paymentManagerId: string;
  name: string;
  description?: string;
  authorizerType: PaymentsAuthorizerType;
  authorizerConfiguration?: AuthorizerConfiguration;
  roleArn: string;
  workloadIdentityDetails?: WorkloadIdentityDetails;
  createdAt: Date;
  lastUpdatedAt: Date;
  status: PaymentManagerStatus;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
}
export const GetPaymentManagerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentManagerArn: S.String,
    paymentManagerId: S.String,
    name: S.String,
    description: S.optional(S.String),
    authorizerType: PaymentsAuthorizerType,
    authorizerConfiguration: S.optional(AuthorizerConfiguration),
    roleArn: S.String,
    workloadIdentityDetails: S.optional(WorkloadIdentityDetails),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: PaymentManagerStatus,
    tags: S.optional(TagsMap),
    kmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetPaymentManagerResponse",
}) as any as S.Schema<GetPaymentManagerResponse>;
export interface GetPolicyRequest {
  policyEngineId: string;
  policyId: string;
}
export const GetPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyEngineId: S.String.pipe(T.HttpLabel("policyEngineId")),
    policyId: S.String.pipe(T.HttpLabel("policyId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/policy-engines/{policyEngineId}/policies/{policyId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPolicyRequest",
}) as any as S.Schema<GetPolicyRequest>;
export interface GetPolicyResponse {
  policyId: string;
  name: string;
  policyEngineId: string;
  createdAt: Date;
  updatedAt: Date;
  policyArn: string;
  status: PolicyStatus;
  enforcementMode?: EnforcementMode;
  definition: PolicyDefinition;
  description?: string | redacted.Redacted<string>;
  statusReasons: string[];
}
export const GetPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyId: S.String,
    name: S.String,
    policyEngineId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    policyArn: S.String,
    status: PolicyStatus,
    enforcementMode: S.optional(EnforcementMode),
    definition: PolicyDefinition,
    description: S.optional(SensitiveString),
    statusReasons: PolicyStatusReasons,
  }),
).annotate({
  identifier: "GetPolicyResponse",
}) as any as S.Schema<GetPolicyResponse>;
export interface GetPolicyEngineRequest {
  policyEngineId: string;
}
export const GetPolicyEngineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyEngineId: S.String.pipe(T.HttpLabel("policyEngineId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/policy-engines/{policyEngineId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPolicyEngineRequest",
}) as any as S.Schema<GetPolicyEngineRequest>;
export interface GetPolicyEngineResponse {
  policyEngineId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  policyEngineArn: string;
  status: PolicyEngineStatus;
  encryptionKeyArn?: string;
  description?: string | redacted.Redacted<string>;
  statusReasons: string[];
}
export const GetPolicyEngineResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyEngineId: S.String,
    name: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    policyEngineArn: S.String,
    status: PolicyEngineStatus,
    encryptionKeyArn: S.optional(S.String),
    description: S.optional(SensitiveString),
    statusReasons: PolicyStatusReasons,
  }),
).annotate({
  identifier: "GetPolicyEngineResponse",
}) as any as S.Schema<GetPolicyEngineResponse>;
export interface GetPolicyEngineSummaryRequest {
  policyEngineId: string;
}
export const GetPolicyEngineSummaryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyEngineId: S.String.pipe(T.HttpLabel("policyEngineId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/policy-engine-summaries/{policyEngineId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPolicyEngineSummaryRequest",
}) as any as S.Schema<GetPolicyEngineSummaryRequest>;
export interface GetPolicyEngineSummaryResponse {
  policyEngineId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  policyEngineArn: string;
  status: PolicyEngineStatus;
  encryptionKeyArn?: string;
}
export const GetPolicyEngineSummaryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyEngineId: S.String,
    name: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    policyEngineArn: S.String,
    status: PolicyEngineStatus,
    encryptionKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetPolicyEngineSummaryResponse",
}) as any as S.Schema<GetPolicyEngineSummaryResponse>;
export interface GetPolicyGenerationRequest {
  policyGenerationId: string;
  policyEngineId: string;
}
export const GetPolicyGenerationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyGenerationId: S.String.pipe(T.HttpLabel("policyGenerationId")),
    policyEngineId: S.String.pipe(T.HttpLabel("policyEngineId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/policy-engines/{policyEngineId}/policy-generations/{policyGenerationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPolicyGenerationRequest",
}) as any as S.Schema<GetPolicyGenerationRequest>;
export type PolicyGenerationName = string;
export type PolicyGenerationArn = string;
export type Resource = { arn: string };
export const Resource = /*@__PURE__*/ S.Union([S.Struct({ arn: S.String })]);
export type PolicyGenerationStatus =
  | "GENERATING"
  | "GENERATED"
  | "GENERATE_FAILED"
  | "DELETE_FAILED"
  | (string & {});
export const PolicyGenerationStatus = S.String;

export interface GetPolicyGenerationResponse {
  policyEngineId: string;
  policyGenerationId: string;
  name: string;
  policyGenerationArn: string;
  resource: Resource;
  createdAt: Date;
  updatedAt: Date;
  status: PolicyGenerationStatus;
  findings?: string;
  statusReasons: string[];
}
export const GetPolicyGenerationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyEngineId: S.String,
    policyGenerationId: S.String,
    name: S.String,
    policyGenerationArn: S.String,
    resource: Resource,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: PolicyGenerationStatus,
    findings: S.optional(S.String),
    statusReasons: PolicyStatusReasons,
  }),
).annotate({
  identifier: "GetPolicyGenerationResponse",
}) as any as S.Schema<GetPolicyGenerationResponse>;
export interface GetPolicyGenerationSummaryRequest {
  policyGenerationId: string;
  policyEngineId: string;
}
export const GetPolicyGenerationSummaryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyGenerationId: S.String.pipe(T.HttpLabel("policyGenerationId")),
    policyEngineId: S.String.pipe(T.HttpLabel("policyEngineId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/policy-engines/{policyEngineId}/policy-generation-summaries/{policyGenerationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPolicyGenerationSummaryRequest",
}) as any as S.Schema<GetPolicyGenerationSummaryRequest>;
export interface GetPolicyGenerationSummaryResponse {
  policyEngineId: string;
  policyGenerationId: string;
  name: string;
  policyGenerationArn: string;
  resource: Resource;
  createdAt: Date;
  updatedAt: Date;
  status: PolicyGenerationStatus;
  findings?: string;
}
export const GetPolicyGenerationSummaryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyEngineId: S.String,
    policyGenerationId: S.String,
    name: S.String,
    policyGenerationArn: S.String,
    resource: Resource,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: PolicyGenerationStatus,
    findings: S.optional(S.String),
  }),
).annotate({
  identifier: "GetPolicyGenerationSummaryResponse",
}) as any as S.Schema<GetPolicyGenerationSummaryResponse>;
export interface GetPolicySummaryRequest {
  policyEngineId: string;
  policyId: string;
}
export const GetPolicySummaryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyEngineId: S.String.pipe(T.HttpLabel("policyEngineId")),
    policyId: S.String.pipe(T.HttpLabel("policyId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/policy-engines/{policyEngineId}/policy-summaries/{policyId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPolicySummaryRequest",
}) as any as S.Schema<GetPolicySummaryRequest>;
export interface GetPolicySummaryResponse {
  policyId: string;
  name: string;
  policyEngineId: string;
  createdAt: Date;
  updatedAt: Date;
  policyArn: string;
  status: PolicyStatus;
  enforcementMode?: EnforcementMode;
}
export const GetPolicySummaryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyId: S.String,
    name: S.String,
    policyEngineId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    policyArn: S.String,
    status: PolicyStatus,
    enforcementMode: S.optional(EnforcementMode),
  }),
).annotate({
  identifier: "GetPolicySummaryResponse",
}) as any as S.Schema<GetPolicySummaryResponse>;
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
  authorizerType?: RegistryAuthorizerType;
  authorizerConfiguration?: AuthorizerConfiguration;
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
    authorizerType: S.optional(RegistryAuthorizerType),
    authorizerConfiguration: S.optional(AuthorizerConfiguration),
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
  description?: string | redacted.Redacted<string>;
  descriptorType: DescriptorType;
  descriptors: Descriptors;
  recordVersion?: string;
  status: RegistryRecordStatus;
  createdAt: Date;
  updatedAt: Date;
  statusReason?: string;
  synchronizationType?: SynchronizationType;
  synchronizationConfiguration?: SynchronizationConfiguration;
}
export const GetRegistryRecordResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryArn: S.String,
    recordArn: S.String,
    recordId: S.String,
    name: S.String,
    description: S.optional(SensitiveString),
    descriptorType: DescriptorType,
    descriptors: Descriptors,
    recordVersion: S.optional(S.String),
    status: RegistryRecordStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    statusReason: S.optional(S.String),
    synchronizationType: S.optional(SynchronizationType),
    synchronizationConfiguration: S.optional(SynchronizationConfiguration),
  }),
).annotate({
  identifier: "GetRegistryRecordResponse",
}) as any as S.Schema<GetRegistryRecordResponse>;
export interface GetResourcePolicyRequest {
  resourceArn: string;
}
export const GetResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/resourcepolicy/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourcePolicyRequest",
}) as any as S.Schema<GetResourcePolicyRequest>;
export type ResourcePolicyBody = string;
export interface GetResourcePolicyResponse {
  policy?: string;
}
export const GetResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policy: S.optional(S.String) }),
).annotate({
  identifier: "GetResourcePolicyResponse",
}) as any as S.Schema<GetResourcePolicyResponse>;
export type TokenVaultIdType = string;
export interface GetTokenVaultRequest {
  tokenVaultId?: string;
}
export const GetTokenVaultRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tokenVaultId: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/identities/get-token-vault" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTokenVaultRequest",
}) as any as S.Schema<GetTokenVaultRequest>;
export type KeyType =
  | "CustomerManagedKey"
  | "ServiceManagedKey"
  | (string & {});
export const KeyType = S.String;

export interface KmsConfiguration {
  keyType: KeyType;
  kmsKeyArn?: string;
}
export const KmsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ keyType: KeyType, kmsKeyArn: S.optional(S.String) }),
).annotate({
  identifier: "KmsConfiguration",
}) as any as S.Schema<KmsConfiguration>;
export interface GetTokenVaultResponse {
  tokenVaultId: string;
  kmsConfiguration: KmsConfiguration;
  lastModifiedDate: Date;
}
export const GetTokenVaultResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tokenVaultId: S.String,
    kmsConfiguration: KmsConfiguration,
    lastModifiedDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "GetTokenVaultResponse",
}) as any as S.Schema<GetTokenVaultResponse>;
export interface GetWorkloadIdentityRequest {
  name: string;
}
export const GetWorkloadIdentityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/identities/GetWorkloadIdentity" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWorkloadIdentityRequest",
}) as any as S.Schema<GetWorkloadIdentityRequest>;
export interface GetWorkloadIdentityResponse {
  name: string;
  workloadIdentityArn: string;
  allowedResourceOauth2ReturnUrls?: string[];
  createdTime: Date;
  lastUpdatedTime: Date;
}
export const GetWorkloadIdentityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    workloadIdentityArn: S.String,
    allowedResourceOauth2ReturnUrls: S.optional(
      ResourceOauth2ReturnUrlListType,
    ),
    createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "GetWorkloadIdentityResponse",
}) as any as S.Schema<GetWorkloadIdentityResponse>;
export type MaxResults = number;
export type NextToken = string;
export interface ListAgentRuntimeEndpointsRequest {
  agentRuntimeId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListAgentRuntimeEndpointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentRuntimeId: S.String.pipe(T.HttpLabel("agentRuntimeId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/runtimes/{agentRuntimeId}/runtime-endpoints/",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAgentRuntimeEndpointsRequest",
}) as any as S.Schema<ListAgentRuntimeEndpointsRequest>;
export interface AgentRuntimeEndpoint {
  name: string | redacted.Redacted<string>;
  liveVersion?: string;
  targetVersion?: string;
  agentRuntimeEndpointArn: string;
  agentRuntimeArn: string;
  status: AgentRuntimeEndpointStatus;
  id: string;
  description?: string;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export const AgentRuntimeEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: SensitiveString,
    liveVersion: S.optional(S.String),
    targetVersion: S.optional(S.String),
    agentRuntimeEndpointArn: S.String,
    agentRuntimeArn: S.String,
    status: AgentRuntimeEndpointStatus,
    id: S.String,
    description: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "AgentRuntimeEndpoint",
}) as any as S.Schema<AgentRuntimeEndpoint>;
export type AgentRuntimeEndpoints = AgentRuntimeEndpoint[];
export const AgentRuntimeEndpoints =
  /*@__PURE__*/ S.Array(AgentRuntimeEndpoint);
export interface ListAgentRuntimeEndpointsResponse {
  runtimeEndpoints: AgentRuntimeEndpoint[];
  nextToken?: string;
}
export const ListAgentRuntimeEndpointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    runtimeEndpoints: AgentRuntimeEndpoints,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAgentRuntimeEndpointsResponse",
}) as any as S.Schema<ListAgentRuntimeEndpointsResponse>;
export interface ListAgentRuntimesRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListAgentRuntimesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/runtimes/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAgentRuntimesRequest",
}) as any as S.Schema<ListAgentRuntimesRequest>;
export interface AgentRuntime {
  agentRuntimeArn: string;
  agentRuntimeId: string;
  agentRuntimeVersion: string;
  agentRuntimeName: string;
  description: string | redacted.Redacted<string>;
  lastUpdatedAt: Date;
  status: AgentRuntimeStatus;
}
export const AgentRuntime = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentRuntimeArn: S.String,
    agentRuntimeId: S.String,
    agentRuntimeVersion: S.String,
    agentRuntimeName: S.String,
    description: SensitiveString,
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: AgentRuntimeStatus,
  }),
).annotate({ identifier: "AgentRuntime" }) as any as S.Schema<AgentRuntime>;
export type AgentRuntimes = AgentRuntime[];
export const AgentRuntimes = /*@__PURE__*/ S.Array(AgentRuntime);
export interface ListAgentRuntimesResponse {
  agentRuntimes: AgentRuntime[];
  nextToken?: string;
}
export const ListAgentRuntimesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agentRuntimes: AgentRuntimes, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListAgentRuntimesResponse",
}) as any as S.Schema<ListAgentRuntimesResponse>;
export interface ListAgentRuntimeVersionsRequest {
  agentRuntimeId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListAgentRuntimeVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentRuntimeId: S.String.pipe(T.HttpLabel("agentRuntimeId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/runtimes/{agentRuntimeId}/versions/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAgentRuntimeVersionsRequest",
}) as any as S.Schema<ListAgentRuntimeVersionsRequest>;
export interface ListAgentRuntimeVersionsResponse {
  agentRuntimes: AgentRuntime[];
  nextToken?: string;
}
export const ListAgentRuntimeVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agentRuntimes: AgentRuntimes, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListAgentRuntimeVersionsResponse",
}) as any as S.Schema<ListAgentRuntimeVersionsResponse>;
export interface ListAgentRuntimeVersionsByCapacityProviderInput {
  capacityProviderId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListAgentRuntimeVersionsByCapacityProviderInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      capacityProviderId: S.String.pipe(T.HttpLabel("capacityProviderId")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/capacity-providers/{capacityProviderId}/runtime-versions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListAgentRuntimeVersionsByCapacityProviderInput",
  }) as any as S.Schema<ListAgentRuntimeVersionsByCapacityProviderInput>;
export interface AgentRuntimeVersionSummary {
  agentRuntimeArn: string;
  agentRuntimeVersion: string;
  status: AgentRuntimeStatus;
}
export const AgentRuntimeVersionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentRuntimeArn: S.String,
    agentRuntimeVersion: S.String,
    status: AgentRuntimeStatus,
  }),
).annotate({
  identifier: "AgentRuntimeVersionSummary",
}) as any as S.Schema<AgentRuntimeVersionSummary>;
export type AgentRuntimeVersionSummaryList = AgentRuntimeVersionSummary[];
export const AgentRuntimeVersionSummaryList = /*@__PURE__*/ S.Array(
  AgentRuntimeVersionSummary,
);
export interface ListAgentRuntimeVersionsByCapacityProviderOutput {
  agentRuntimes: AgentRuntimeVersionSummary[];
  nextToken?: string;
}
export const ListAgentRuntimeVersionsByCapacityProviderOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      agentRuntimes: AgentRuntimeVersionSummaryList,
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListAgentRuntimeVersionsByCapacityProviderOutput",
  }) as any as S.Schema<ListAgentRuntimeVersionsByCapacityProviderOutput>;
export interface ListApiKeyCredentialProvidersRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListApiKeyCredentialProvidersRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      maxResults: S.optional(S.Number),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/identities/ListApiKeyCredentialProviders",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListApiKeyCredentialProvidersRequest",
}) as any as S.Schema<ListApiKeyCredentialProvidersRequest>;
export interface ApiKeyCredentialProviderItem {
  name: string;
  credentialProviderArn: string;
  createdTime: Date;
  lastUpdatedTime: Date;
}
export const ApiKeyCredentialProviderItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    credentialProviderArn: S.String,
    createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "ApiKeyCredentialProviderItem",
}) as any as S.Schema<ApiKeyCredentialProviderItem>;
export type ApiKeyCredentialProviders = ApiKeyCredentialProviderItem[];
export const ApiKeyCredentialProviders = /*@__PURE__*/ S.Array(
  ApiKeyCredentialProviderItem,
);
export interface ListApiKeyCredentialProvidersResponse {
  credentialProviders: ApiKeyCredentialProviderItem[];
  nextToken?: string;
}
export const ListApiKeyCredentialProvidersResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      credentialProviders: ApiKeyCredentialProviders,
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListApiKeyCredentialProvidersResponse",
}) as any as S.Schema<ListApiKeyCredentialProvidersResponse>;
export interface ListBrowserProfilesRequest {
  maxResults?: number;
  nextToken?: string;
  name?: string;
}
export const ListBrowserProfilesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    name: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/browser-profiles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBrowserProfilesRequest",
}) as any as S.Schema<ListBrowserProfilesRequest>;
export interface BrowserProfileSummary {
  profileId: string;
  profileArn: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  status: BrowserProfileStatus;
  createdAt: Date;
  lastUpdatedAt: Date;
  lastSavedAt?: Date;
  lastSavedBrowserSessionId?: string;
  lastSavedBrowserId?: string;
}
export const BrowserProfileSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileId: S.String,
    profileArn: S.String,
    name: S.String,
    description: S.optional(SensitiveString),
    status: BrowserProfileStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastSavedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastSavedBrowserSessionId: S.optional(S.String),
    lastSavedBrowserId: S.optional(S.String),
  }),
).annotate({
  identifier: "BrowserProfileSummary",
}) as any as S.Schema<BrowserProfileSummary>;
export type BrowserProfileSummaries = BrowserProfileSummary[];
export const BrowserProfileSummaries = /*@__PURE__*/ S.Array(
  BrowserProfileSummary,
);
export interface ListBrowserProfilesResponse {
  profileSummaries: BrowserProfileSummary[];
  nextToken?: string;
}
export const ListBrowserProfilesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileSummaries: BrowserProfileSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBrowserProfilesResponse",
}) as any as S.Schema<ListBrowserProfilesResponse>;
export type ResourceType = "SYSTEM" | "CUSTOM" | (string & {});
export const ResourceType = S.String;

export interface ListBrowsersRequest {
  maxResults?: number;
  nextToken?: string;
  type?: ResourceType;
}
export const ListBrowsersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    type: S.optional(ResourceType).pipe(T.HttpQuery("type")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/browsers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBrowsersRequest",
}) as any as S.Schema<ListBrowsersRequest>;
export interface BrowserSummary {
  browserId: string;
  browserArn: string;
  name?: string;
  description?: string | redacted.Redacted<string>;
  status: BrowserStatus;
  createdAt: Date;
  lastUpdatedAt?: Date;
}
export const BrowserSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    browserId: S.String,
    browserArn: S.String,
    name: S.optional(S.String),
    description: S.optional(SensitiveString),
    status: BrowserStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "BrowserSummary" }) as any as S.Schema<BrowserSummary>;
export type BrowserSummaries = BrowserSummary[];
export const BrowserSummaries = /*@__PURE__*/ S.Array(BrowserSummary);
export interface ListBrowsersResponse {
  browserSummaries: BrowserSummary[];
  nextToken?: string;
}
export const ListBrowsersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    browserSummaries: BrowserSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBrowsersResponse",
}) as any as S.Schema<ListBrowsersResponse>;
export interface ListCapacityProvidersInput {
  maxResults?: number;
  nextToken?: string;
}
export const ListCapacityProvidersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/capacity-providers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCapacityProvidersInput",
}) as any as S.Schema<ListCapacityProvidersInput>;
export interface CapacityProviderSummary {
  capacityProviderId: string;
  capacityProviderArn: string;
  name: string;
  status: CapacityProviderStatus;
  lastUpdatedAt: Date;
}
export const CapacityProviderSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacityProviderId: S.String,
    capacityProviderArn: S.String,
    name: S.String,
    status: CapacityProviderStatus,
    lastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "CapacityProviderSummary",
}) as any as S.Schema<CapacityProviderSummary>;
export type CapacityProviderList = CapacityProviderSummary[];
export const CapacityProviderList = /*@__PURE__*/ S.Array(
  CapacityProviderSummary,
);
export interface ListCapacityProvidersOutput {
  capacityProviders: CapacityProviderSummary[];
  nextToken?: string;
}
export const ListCapacityProvidersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacityProviders: CapacityProviderList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCapacityProvidersOutput",
}) as any as S.Schema<ListCapacityProvidersOutput>;
export interface ListCodeInterpretersRequest {
  maxResults?: number;
  nextToken?: string;
  type?: ResourceType;
}
export const ListCodeInterpretersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    type: S.optional(ResourceType).pipe(T.HttpQuery("type")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/code-interpreters" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCodeInterpretersRequest",
}) as any as S.Schema<ListCodeInterpretersRequest>;
export interface CodeInterpreterSummary {
  codeInterpreterId: string;
  codeInterpreterArn: string;
  name?: string;
  description?: string | redacted.Redacted<string>;
  status: CodeInterpreterStatus;
  createdAt: Date;
  lastUpdatedAt?: Date;
}
export const CodeInterpreterSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeInterpreterId: S.String,
    codeInterpreterArn: S.String,
    name: S.optional(S.String),
    description: S.optional(SensitiveString),
    status: CodeInterpreterStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CodeInterpreterSummary",
}) as any as S.Schema<CodeInterpreterSummary>;
export type CodeInterpreterSummaries = CodeInterpreterSummary[];
export const CodeInterpreterSummaries = /*@__PURE__*/ S.Array(
  CodeInterpreterSummary,
);
export interface ListCodeInterpretersResponse {
  codeInterpreterSummaries: CodeInterpreterSummary[];
  nextToken?: string;
}
export const ListCodeInterpretersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeInterpreterSummaries: CodeInterpreterSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCodeInterpretersResponse",
}) as any as S.Schema<ListCodeInterpretersResponse>;
export interface ListConfigurationBundlesRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListConfigurationBundlesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/configuration-bundles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConfigurationBundlesRequest",
}) as any as S.Schema<ListConfigurationBundlesRequest>;
export interface ConfigurationBundleSummary {
  bundleArn: string;
  bundleId: string;
  bundleName: string;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
}
export const ConfigurationBundleSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bundleArn: S.String,
    bundleId: S.String,
    bundleName: S.String,
    description: S.optional(SensitiveString),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ConfigurationBundleSummary",
}) as any as S.Schema<ConfigurationBundleSummary>;
export type ConfigurationBundleSummaryList = ConfigurationBundleSummary[];
export const ConfigurationBundleSummaryList = /*@__PURE__*/ S.Array(
  ConfigurationBundleSummary,
);
export interface ListConfigurationBundlesResponse {
  bundles: ConfigurationBundleSummary[];
  nextToken?: string;
}
export const ListConfigurationBundlesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bundles: ConfigurationBundleSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListConfigurationBundlesResponse",
}) as any as S.Schema<ListConfigurationBundlesResponse>;
export interface VersionFilter {
  branchName?: string;
  createdByName?: string;
  latestPerBranch?: boolean;
}
export const VersionFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    branchName: S.optional(S.String),
    createdByName: S.optional(S.String),
    latestPerBranch: S.optional(S.Boolean),
  }),
).annotate({ identifier: "VersionFilter" }) as any as S.Schema<VersionFilter>;
export interface ListConfigurationBundleVersionsRequest {
  bundleId: string;
  nextToken?: string;
  maxResults?: number;
  filter?: VersionFilter;
}
export const ListConfigurationBundleVersionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      bundleId: S.String.pipe(T.HttpLabel("bundleId")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      filter: S.optional(VersionFilter),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/configuration-bundles/{bundleId}/versions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListConfigurationBundleVersionsRequest",
}) as any as S.Schema<ListConfigurationBundleVersionsRequest>;
export interface ConfigurationBundleVersionSummary {
  bundleArn: string;
  bundleId: string;
  versionId: string;
  lineageMetadata?: VersionLineageMetadata;
  versionCreatedAt: Date;
}
export const ConfigurationBundleVersionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bundleArn: S.String,
    bundleId: S.String,
    versionId: S.String,
    lineageMetadata: S.optional(VersionLineageMetadata),
    versionCreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "ConfigurationBundleVersionSummary",
}) as any as S.Schema<ConfigurationBundleVersionSummary>;
export type ConfigurationBundleVersionSummaryList =
  ConfigurationBundleVersionSummary[];
export const ConfigurationBundleVersionSummaryList = /*@__PURE__*/ S.Array(
  ConfigurationBundleVersionSummary,
);
export interface ListConfigurationBundleVersionsResponse {
  versions: ConfigurationBundleVersionSummary[];
  nextToken?: string;
}
export const ListConfigurationBundleVersionsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      versions: ConfigurationBundleVersionSummaryList,
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListConfigurationBundleVersionsResponse",
}) as any as S.Schema<ListConfigurationBundleVersionsResponse>;
export interface ListDatasetExamplesRequest {
  datasetId: string;
  datasetVersion?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListDatasetExamplesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetId: S.String.pipe(T.HttpLabel("datasetId")),
    datasetVersion: S.optional(S.String).pipe(T.HttpQuery("datasetVersion")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/datasets/{datasetId}/examples" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDatasetExamplesRequest",
}) as any as S.Schema<ListDatasetExamplesRequest>;
export interface ListDatasetExamplesResponse {
  datasetArn: string;
  datasetId: string;
  datasetVersion: string;
  examples: any[];
  nextToken?: string;
}
export const ListDatasetExamplesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetArn: S.String,
    datasetId: S.String,
    datasetVersion: S.String,
    examples: DatasetExampleList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDatasetExamplesResponse",
}) as any as S.Schema<ListDatasetExamplesResponse>;
export interface ListDatasetsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListDatasetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/datasets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDatasetsRequest",
}) as any as S.Schema<ListDatasetsRequest>;
export interface DatasetSummary {
  datasetArn: string;
  datasetId: string;
  datasetName: string;
  description?: string;
  status: DatasetStatus;
  draftStatus?: DraftStatus;
  schemaType: DatasetSchemaType;
  exampleCount: number;
  createdAt: Date;
  updatedAt: Date;
}
export const DatasetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetArn: S.String,
    datasetId: S.String,
    datasetName: S.String,
    description: S.optional(S.String),
    status: DatasetStatus,
    draftStatus: S.optional(DraftStatus),
    schemaType: DatasetSchemaType,
    exampleCount: S.Number,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "DatasetSummary" }) as any as S.Schema<DatasetSummary>;
export type DatasetSummaryList = DatasetSummary[];
export const DatasetSummaryList = /*@__PURE__*/ S.Array(DatasetSummary);
export interface ListDatasetsResponse {
  datasets: DatasetSummary[];
  nextToken?: string;
}
export const ListDatasetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasets: DatasetSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListDatasetsResponse",
}) as any as S.Schema<ListDatasetsResponse>;
export interface ListDatasetVersionsRequest {
  datasetId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListDatasetVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetId: S.String.pipe(T.HttpLabel("datasetId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/datasets/{datasetId}/versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDatasetVersionsRequest",
}) as any as S.Schema<ListDatasetVersionsRequest>;
export interface DatasetVersionSummary {
  datasetVersion: string;
  exampleCount: number;
  createdAt: Date;
}
export const DatasetVersionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetVersion: S.String,
    exampleCount: S.Number,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "DatasetVersionSummary",
}) as any as S.Schema<DatasetVersionSummary>;
export type DatasetVersionSummaryList = DatasetVersionSummary[];
export const DatasetVersionSummaryList = /*@__PURE__*/ S.Array(
  DatasetVersionSummary,
);
export interface ListDatasetVersionsResponse {
  versions: DatasetVersionSummary[];
  nextToken?: string;
}
export const ListDatasetVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    versions: DatasetVersionSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDatasetVersionsResponse",
}) as any as S.Schema<ListDatasetVersionsResponse>;
export interface ListEvaluatorsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListEvaluatorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/evaluators" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEvaluatorsRequest",
}) as any as S.Schema<ListEvaluatorsRequest>;
export interface EvaluatorSummary {
  evaluatorArn: string;
  evaluatorId: string;
  evaluatorName: string;
  description?: string | redacted.Redacted<string>;
  evaluatorType: EvaluatorType;
  provider?: Provider;
  level?: EvaluatorLevel;
  status: EvaluatorStatus;
  createdAt: Date;
  updatedAt: Date;
  lockedForModification?: boolean;
  kmsKeyArn?: string;
}
export const EvaluatorSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    evaluatorArn: S.String,
    evaluatorId: S.String,
    evaluatorName: S.String,
    description: S.optional(SensitiveString),
    evaluatorType: EvaluatorType,
    provider: S.optional(Provider),
    level: S.optional(EvaluatorLevel),
    status: EvaluatorStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lockedForModification: S.optional(S.Boolean),
    kmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "EvaluatorSummary",
}) as any as S.Schema<EvaluatorSummary>;
export type EvaluatorSummaryList = EvaluatorSummary[];
export const EvaluatorSummaryList = /*@__PURE__*/ S.Array(EvaluatorSummary);
export interface ListEvaluatorsResponse {
  evaluators: EvaluatorSummary[];
  nextToken?: string;
}
export const ListEvaluatorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    evaluators: EvaluatorSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEvaluatorsResponse",
}) as any as S.Schema<ListEvaluatorsResponse>;
export type GatewayRateLimitMaxResults = number;
export type GatewayRateLimitNextToken = string;
export interface ListGatewayRateLimitsRequest {
  gatewayIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListGatewayRateLimitsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayIdentifier: S.String.pipe(T.HttpLabel("gatewayIdentifier")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/gateways/{gatewayIdentifier}/rate-limits",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGatewayRateLimitsRequest",
}) as any as S.Schema<ListGatewayRateLimitsRequest>;
export interface ListGatewayRateLimitsResponse {
  rateLimits: GatewayRateLimitDetail[];
  nextToken?: string;
}
export const ListGatewayRateLimitsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ rateLimits: GatewayRateLimits, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListGatewayRateLimitsResponse",
}) as any as S.Schema<ListGatewayRateLimitsResponse>;
export type GatewayRuleMaxResults = number;
export type GatewayRuleNextToken = string;
export interface ListGatewayRulesRequest {
  gatewayIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListGatewayRulesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayIdentifier: S.String.pipe(T.HttpLabel("gatewayIdentifier")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/gateways/{gatewayIdentifier}/rules" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGatewayRulesRequest",
}) as any as S.Schema<ListGatewayRulesRequest>;
export interface GatewayRuleDetail {
  ruleId: string;
  gatewayArn: string;
  priority: number;
  conditions?: Condition[];
  actions: Action[];
  description?: string;
  createdAt: Date;
  status: GatewayRuleStatus;
  system?: SystemManagedBlock;
  updatedAt?: Date;
}
export const GatewayRuleDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleId: S.String,
    gatewayArn: S.String,
    priority: S.Number,
    conditions: S.optional(Conditions),
    actions: Actions,
    description: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: GatewayRuleStatus,
    system: S.optional(SystemManagedBlock),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GatewayRuleDetail",
}) as any as S.Schema<GatewayRuleDetail>;
export type GatewayRules = GatewayRuleDetail[];
export const GatewayRules = /*@__PURE__*/ S.Array(GatewayRuleDetail);
export interface ListGatewayRulesResponse {
  gatewayRules: GatewayRuleDetail[];
  nextToken?: string;
}
export const ListGatewayRulesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ gatewayRules: GatewayRules, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListGatewayRulesResponse",
}) as any as S.Schema<ListGatewayRulesResponse>;
export type GatewayMaxResults = number;
export type GatewayNextToken = string;
export interface ListGatewaysRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListGatewaysRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/gateways/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGatewaysRequest",
}) as any as S.Schema<ListGatewaysRequest>;
export interface GatewaySummary {
  gatewayId: string;
  name: string;
  status: GatewayStatus;
  description?: string | redacted.Redacted<string>;
  createdAt: Date;
  updatedAt: Date;
  authorizerType: AuthorizerType;
  protocolType?: GatewayProtocolType;
}
export const GatewaySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String,
    name: S.String,
    status: GatewayStatus,
    description: S.optional(SensitiveString),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    authorizerType: AuthorizerType,
    protocolType: S.optional(GatewayProtocolType),
  }),
).annotate({ identifier: "GatewaySummary" }) as any as S.Schema<GatewaySummary>;
export type GatewaySummaries = GatewaySummary[];
export const GatewaySummaries = /*@__PURE__*/ S.Array(GatewaySummary);
export interface ListGatewaysResponse {
  items: GatewaySummary[];
  nextToken?: string;
}
export const ListGatewaysResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: GatewaySummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListGatewaysResponse",
}) as any as S.Schema<ListGatewaysResponse>;
export type TargetMaxResults = number;
export type TargetNextToken = string;
export interface ListGatewayTargetsRequest {
  gatewayIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListGatewayTargetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayIdentifier: S.String.pipe(T.HttpLabel("gatewayIdentifier")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/gateways/{gatewayIdentifier}/targets/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGatewayTargetsRequest",
}) as any as S.Schema<ListGatewayTargetsRequest>;
export type TargetType =
  | "OPEN_API_SCHEMA"
  | "SMITHY_MODEL"
  | "MCP_SERVER"
  | "LAMBDA"
  | "API_GATEWAY"
  | "CONNECTOR"
  | "AGENTCORE_RUNTIME"
  | "PASSTHROUGH"
  | "PROVIDER"
  | "HTTP_CONNECTOR"
  | (string & {});
export const TargetType = S.String;

export interface TargetSummary {
  targetId: string;
  name: string | redacted.Redacted<string>;
  status: TargetStatus;
  description?: string | redacted.Redacted<string>;
  createdAt: Date;
  updatedAt: Date;
  resourcePriority?: number;
  lastSynchronizedAt?: Date;
  authorizationData?: AuthorizationData;
  targetType?: TargetType;
  listingMode?: ListingMode;
}
export const TargetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetId: S.String,
    name: SensitiveString,
    status: TargetStatus,
    description: S.optional(SensitiveString),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    resourcePriority: S.optional(S.Number),
    lastSynchronizedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    authorizationData: S.optional(AuthorizationData),
    targetType: S.optional(TargetType),
    listingMode: S.optional(ListingMode),
  }),
).annotate({ identifier: "TargetSummary" }) as any as S.Schema<TargetSummary>;
export type TargetSummaries = TargetSummary[];
export const TargetSummaries = /*@__PURE__*/ S.Array(TargetSummary);
export interface ListGatewayTargetsResponse {
  items: TargetSummary[];
  nextToken?: string;
}
export const ListGatewayTargetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: TargetSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListGatewayTargetsResponse",
}) as any as S.Schema<ListGatewayTargetsResponse>;
export interface ListHarnessEndpointsRequest {
  harnessId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListHarnessEndpointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    harnessId: S.String.pipe(T.HttpLabel("harnessId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/harnesses/{harnessId}/endpoints" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListHarnessEndpointsRequest",
}) as any as S.Schema<ListHarnessEndpointsRequest>;
export type HarnessEndpoints = HarnessEndpoint[];
export const HarnessEndpoints = /*@__PURE__*/ S.Array(HarnessEndpoint);
export interface ListHarnessEndpointsResponse {
  endpoints: HarnessEndpoint[];
  nextToken?: string;
}
export const ListHarnessEndpointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ endpoints: HarnessEndpoints, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListHarnessEndpointsResponse",
}) as any as S.Schema<ListHarnessEndpointsResponse>;
export interface ListHarnessesRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListHarnessesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/harnesses" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListHarnessesRequest",
}) as any as S.Schema<ListHarnessesRequest>;
export interface HarnessSummary {
  harnessId: string;
  harnessName: string;
  arn: string;
  status: HarnessStatus;
  createdAt: Date;
  updatedAt: Date;
  harnessVersion?: string;
}
export const HarnessSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    harnessId: S.String,
    harnessName: S.String,
    arn: S.String,
    status: HarnessStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    harnessVersion: S.optional(S.String),
  }),
).annotate({ identifier: "HarnessSummary" }) as any as S.Schema<HarnessSummary>;
export type HarnessSummaries = HarnessSummary[];
export const HarnessSummaries = /*@__PURE__*/ S.Array(HarnessSummary);
export interface ListHarnessesResponse {
  harnesses: HarnessSummary[];
  nextToken?: string;
}
export const ListHarnessesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ harnesses: HarnessSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListHarnessesResponse",
}) as any as S.Schema<ListHarnessesResponse>;
export interface ListHarnessVersionsRequest {
  harnessId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListHarnessVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    harnessId: S.String.pipe(T.HttpLabel("harnessId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/harnesses/{harnessId}/versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListHarnessVersionsRequest",
}) as any as S.Schema<ListHarnessVersionsRequest>;
export interface HarnessVersionSummary {
  harnessId: string;
  harnessName: string;
  arn: string;
  harnessVersion: string;
  status: HarnessStatus;
  createdAt: Date;
  updatedAt: Date;
  failureReason?: string;
}
export const HarnessVersionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    harnessId: S.String,
    harnessName: S.String,
    arn: S.String,
    harnessVersion: S.String,
    status: HarnessStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    failureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "HarnessVersionSummary",
}) as any as S.Schema<HarnessVersionSummary>;
export type HarnessVersionSummaries = HarnessVersionSummary[];
export const HarnessVersionSummaries = /*@__PURE__*/ S.Array(
  HarnessVersionSummary,
);
export interface ListHarnessVersionsResponse {
  harnessVersions: HarnessVersionSummary[];
  nextToken?: string;
}
export const ListHarnessVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    harnessVersions: HarnessVersionSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListHarnessVersionsResponse",
}) as any as S.Schema<ListHarnessVersionsResponse>;
export interface ListMemoriesInput {
  maxResults?: number;
  nextToken?: string;
}
export const ListMemoriesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/memories/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMemoriesInput",
}) as any as S.Schema<ListMemoriesInput>;
export interface MemorySummary {
  arn?: string;
  id?: string;
  status?: MemoryStatus;
  createdAt: Date;
  updatedAt: Date;
  managedByResourceArn?: string;
}
export const MemorySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    status: S.optional(MemoryStatus),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    managedByResourceArn: S.optional(S.String),
  }),
).annotate({ identifier: "MemorySummary" }) as any as S.Schema<MemorySummary>;
export type MemorySummaryList = MemorySummary[];
export const MemorySummaryList = /*@__PURE__*/ S.Array(MemorySummary);
export interface ListMemoriesOutput {
  memories: MemorySummary[];
  nextToken?: string;
}
export const ListMemoriesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ memories: MemorySummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListMemoriesOutput",
}) as any as S.Schema<ListMemoriesOutput>;
export interface ListOauth2CredentialProvidersRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListOauth2CredentialProvidersRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      maxResults: S.optional(S.Number),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/identities/ListOauth2CredentialProviders",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListOauth2CredentialProvidersRequest",
}) as any as S.Schema<ListOauth2CredentialProvidersRequest>;
export interface Oauth2CredentialProviderItem {
  name: string;
  credentialProviderVendor: CredentialProviderVendorType;
  credentialProviderArn: string;
  createdTime: Date;
  lastUpdatedTime: Date;
}
export const Oauth2CredentialProviderItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    credentialProviderVendor: CredentialProviderVendorType,
    credentialProviderArn: S.String,
    createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "Oauth2CredentialProviderItem",
}) as any as S.Schema<Oauth2CredentialProviderItem>;
export type Oauth2CredentialProviders = Oauth2CredentialProviderItem[];
export const Oauth2CredentialProviders = /*@__PURE__*/ S.Array(
  Oauth2CredentialProviderItem,
);
export interface ListOauth2CredentialProvidersResponse {
  credentialProviders: Oauth2CredentialProviderItem[];
  nextToken?: string;
}
export const ListOauth2CredentialProvidersResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      credentialProviders: Oauth2CredentialProviders,
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListOauth2CredentialProvidersResponse",
}) as any as S.Schema<ListOauth2CredentialProvidersResponse>;
export interface ListOnlineEvaluationConfigsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListOnlineEvaluationConfigsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/online-evaluation-configs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListOnlineEvaluationConfigsRequest",
}) as any as S.Schema<ListOnlineEvaluationConfigsRequest>;
export interface OnlineEvaluationConfigSummary {
  onlineEvaluationConfigArn: string;
  onlineEvaluationConfigId: string;
  onlineEvaluationConfigName: string;
  description?: string | redacted.Redacted<string>;
  status: OnlineEvaluationConfigStatus;
  executionStatus: OnlineEvaluationExecutionStatus;
  createdAt: Date;
  updatedAt: Date;
  failureReason?: string;
  insights?: Insight[];
  clusteringConfig?: ClusteringConfig;
}
export const OnlineEvaluationConfigSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    onlineEvaluationConfigArn: S.String,
    onlineEvaluationConfigId: S.String,
    onlineEvaluationConfigName: S.String,
    description: S.optional(SensitiveString),
    status: OnlineEvaluationConfigStatus,
    executionStatus: OnlineEvaluationExecutionStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    failureReason: S.optional(S.String),
    insights: S.optional(InsightList),
    clusteringConfig: S.optional(ClusteringConfig),
  }),
).annotate({
  identifier: "OnlineEvaluationConfigSummary",
}) as any as S.Schema<OnlineEvaluationConfigSummary>;
export type OnlineEvaluationConfigSummaryList = OnlineEvaluationConfigSummary[];
export const OnlineEvaluationConfigSummaryList = /*@__PURE__*/ S.Array(
  OnlineEvaluationConfigSummary,
);
export interface ListOnlineEvaluationConfigsResponse {
  onlineEvaluationConfigs: OnlineEvaluationConfigSummary[];
  nextToken?: string;
}
export const ListOnlineEvaluationConfigsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    onlineEvaluationConfigs: OnlineEvaluationConfigSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListOnlineEvaluationConfigsResponse",
}) as any as S.Schema<ListOnlineEvaluationConfigsResponse>;
export interface ListPaymentConnectorsRequest {
  paymentManagerId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListPaymentConnectorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentManagerId: S.String.pipe(T.HttpLabel("paymentManagerId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/payments/managers/{paymentManagerId}/connectors-list",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPaymentConnectorsRequest",
}) as any as S.Schema<ListPaymentConnectorsRequest>;
export interface PaymentConnectorSummary {
  paymentConnectorId: string;
  name: string;
  type: PaymentConnectorType;
  status: PaymentConnectorStatus;
  lastUpdatedAt: Date;
}
export const PaymentConnectorSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentConnectorId: S.String,
    name: S.String,
    type: PaymentConnectorType,
    status: PaymentConnectorStatus,
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "PaymentConnectorSummary",
}) as any as S.Schema<PaymentConnectorSummary>;
export type PaymentConnectorSummaries = PaymentConnectorSummary[];
export const PaymentConnectorSummaries = /*@__PURE__*/ S.Array(
  PaymentConnectorSummary,
);
export interface ListPaymentConnectorsResponse {
  paymentConnectors: PaymentConnectorSummary[];
  nextToken?: string;
}
export const ListPaymentConnectorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentConnectors: PaymentConnectorSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPaymentConnectorsResponse",
}) as any as S.Schema<ListPaymentConnectorsResponse>;
export interface ListPaymentCredentialProvidersRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListPaymentCredentialProvidersRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      maxResults: S.optional(S.Number),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/identities/ListPaymentCredentialProviders",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListPaymentCredentialProvidersRequest",
}) as any as S.Schema<ListPaymentCredentialProvidersRequest>;
export interface PaymentCredentialProviderItem {
  name: string;
  credentialProviderVendor: PaymentCredentialProviderVendorType;
  credentialProviderArn: string;
  createdTime: Date;
  lastUpdatedTime: Date;
}
export const PaymentCredentialProviderItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    credentialProviderVendor: PaymentCredentialProviderVendorType,
    credentialProviderArn: S.String,
    createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "PaymentCredentialProviderItem",
}) as any as S.Schema<PaymentCredentialProviderItem>;
export type PaymentCredentialProviders = PaymentCredentialProviderItem[];
export const PaymentCredentialProviders = /*@__PURE__*/ S.Array(
  PaymentCredentialProviderItem,
);
export interface ListPaymentCredentialProvidersResponse {
  credentialProviders: PaymentCredentialProviderItem[];
  nextToken?: string;
}
export const ListPaymentCredentialProvidersResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      credentialProviders: PaymentCredentialProviders,
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListPaymentCredentialProvidersResponse",
}) as any as S.Schema<ListPaymentCredentialProvidersResponse>;
export interface ListPaymentManagersRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListPaymentManagersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/payments/managers-list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPaymentManagersRequest",
}) as any as S.Schema<ListPaymentManagersRequest>;
export interface PaymentManagerSummary {
  paymentManagerArn: string;
  paymentManagerId: string;
  name: string;
  description?: string;
  authorizerType: PaymentsAuthorizerType;
  roleArn: string;
  status: PaymentManagerStatus;
  createdAt?: Date;
  lastUpdatedAt: Date;
  kmsKeyArn?: string;
}
export const PaymentManagerSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentManagerArn: S.String,
    paymentManagerId: S.String,
    name: S.String,
    description: S.optional(S.String),
    authorizerType: PaymentsAuthorizerType,
    roleArn: S.String,
    status: PaymentManagerStatus,
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    kmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "PaymentManagerSummary",
}) as any as S.Schema<PaymentManagerSummary>;
export type PaymentManagerSummaries = PaymentManagerSummary[];
export const PaymentManagerSummaries = /*@__PURE__*/ S.Array(
  PaymentManagerSummary,
);
export interface ListPaymentManagersResponse {
  paymentManagers: PaymentManagerSummary[];
  nextToken?: string;
}
export const ListPaymentManagersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentManagers: PaymentManagerSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPaymentManagersResponse",
}) as any as S.Schema<ListPaymentManagersResponse>;
export interface ListPoliciesRequest {
  nextToken?: string;
  maxResults?: number;
  policyEngineId: string;
  targetResourceScope?: string;
}
export const ListPoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    policyEngineId: S.String.pipe(T.HttpLabel("policyEngineId")),
    targetResourceScope: S.optional(S.String).pipe(
      T.HttpQuery("targetResourceScope"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/policy-engines/{policyEngineId}/policies",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPoliciesRequest",
}) as any as S.Schema<ListPoliciesRequest>;
export interface Policy {
  policyId: string;
  name: string;
  policyEngineId: string;
  createdAt: Date;
  updatedAt: Date;
  policyArn: string;
  status: PolicyStatus;
  enforcementMode?: EnforcementMode;
  definition: PolicyDefinition;
  description?: string | redacted.Redacted<string>;
  statusReasons: string[];
}
export const Policy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyId: S.String,
    name: S.String,
    policyEngineId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    policyArn: S.String,
    status: PolicyStatus,
    enforcementMode: S.optional(EnforcementMode),
    definition: PolicyDefinition,
    description: S.optional(SensitiveString),
    statusReasons: PolicyStatusReasons,
  }),
).annotate({ identifier: "Policy" }) as any as S.Schema<Policy>;
export type Policies = Policy[];
export const Policies = /*@__PURE__*/ S.Array(Policy);
export interface ListPoliciesResponse {
  policies: Policy[];
  nextToken?: string;
}
export const ListPoliciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policies: Policies, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListPoliciesResponse",
}) as any as S.Schema<ListPoliciesResponse>;
export interface ListPolicyEnginesRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListPolicyEnginesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/policy-engines" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPolicyEnginesRequest",
}) as any as S.Schema<ListPolicyEnginesRequest>;
export interface PolicyEngine {
  policyEngineId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  policyEngineArn: string;
  status: PolicyEngineStatus;
  encryptionKeyArn?: string;
  description?: string | redacted.Redacted<string>;
  statusReasons: string[];
}
export const PolicyEngine = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyEngineId: S.String,
    name: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    policyEngineArn: S.String,
    status: PolicyEngineStatus,
    encryptionKeyArn: S.optional(S.String),
    description: S.optional(SensitiveString),
    statusReasons: PolicyStatusReasons,
  }),
).annotate({ identifier: "PolicyEngine" }) as any as S.Schema<PolicyEngine>;
export type PolicyEngines = PolicyEngine[];
export const PolicyEngines = /*@__PURE__*/ S.Array(PolicyEngine);
export interface ListPolicyEnginesResponse {
  policyEngines: PolicyEngine[];
  nextToken?: string;
}
export const ListPolicyEnginesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyEngines: PolicyEngines, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListPolicyEnginesResponse",
}) as any as S.Schema<ListPolicyEnginesResponse>;
export interface ListPolicyEngineSummariesRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListPolicyEngineSummariesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/policy-engine-summaries" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPolicyEngineSummariesRequest",
}) as any as S.Schema<ListPolicyEngineSummariesRequest>;
export interface PolicyEngineSummary {
  policyEngineId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  policyEngineArn: string;
  status: PolicyEngineStatus;
  encryptionKeyArn?: string;
}
export const PolicyEngineSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyEngineId: S.String,
    name: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    policyEngineArn: S.String,
    status: PolicyEngineStatus,
    encryptionKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "PolicyEngineSummary",
}) as any as S.Schema<PolicyEngineSummary>;
export type PolicyEngineSummaryList = PolicyEngineSummary[];
export const PolicyEngineSummaryList =
  /*@__PURE__*/ S.Array(PolicyEngineSummary);
export interface ListPolicyEngineSummariesResponse {
  policyEngines: PolicyEngineSummary[];
  nextToken?: string;
}
export const ListPolicyEngineSummariesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyEngines: PolicyEngineSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPolicyEngineSummariesResponse",
}) as any as S.Schema<ListPolicyEngineSummariesResponse>;
export interface ListPolicyGenerationAssetsRequest {
  policyGenerationId: string;
  policyEngineId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListPolicyGenerationAssetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyGenerationId: S.String.pipe(T.HttpLabel("policyGenerationId")),
    policyEngineId: S.String.pipe(T.HttpLabel("policyEngineId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/policy-engines/{policyEngineId}/policy-generations/{policyGenerationId}/assets",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPolicyGenerationAssetsRequest",
}) as any as S.Schema<ListPolicyGenerationAssetsRequest>;
export type NaturalLanguage = string;
export type FindingType =
  | "VALID"
  | "INVALID"
  | "NOT_TRANSLATABLE"
  | "ALLOW_ALL"
  | "ALLOW_NONE"
  | "DENY_ALL"
  | "DENY_NONE"
  | (string & {});
export const FindingType = S.String;

export interface Finding {
  type?: FindingType;
  description?: string;
}
export const Finding = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(FindingType),
    description: S.optional(S.String),
  }),
).annotate({ identifier: "Finding" }) as any as S.Schema<Finding>;
export type Findings = Finding[];
export const Findings = /*@__PURE__*/ S.Array(Finding);
export interface PolicyGenerationAsset {
  policyGenerationAssetId: string;
  definition?: PolicyDefinition;
  rawTextFragment: string;
  findings: Finding[];
}
export const PolicyGenerationAsset = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyGenerationAssetId: S.String,
    definition: S.optional(PolicyDefinition),
    rawTextFragment: S.String,
    findings: Findings,
  }),
).annotate({
  identifier: "PolicyGenerationAsset",
}) as any as S.Schema<PolicyGenerationAsset>;
export type PolicyGenerationAssets = PolicyGenerationAsset[];
export const PolicyGenerationAssets = /*@__PURE__*/ S.Array(
  PolicyGenerationAsset,
);
export interface ListPolicyGenerationAssetsResponse {
  policyGenerationAssets?: PolicyGenerationAsset[];
  nextToken?: string;
}
export const ListPolicyGenerationAssetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyGenerationAssets: S.optional(PolicyGenerationAssets),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPolicyGenerationAssetsResponse",
}) as any as S.Schema<ListPolicyGenerationAssetsResponse>;
export interface ListPolicyGenerationsRequest {
  nextToken?: string;
  maxResults?: number;
  policyEngineId: string;
}
export const ListPolicyGenerationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    policyEngineId: S.String.pipe(T.HttpLabel("policyEngineId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/policy-engines/{policyEngineId}/policy-generations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPolicyGenerationsRequest",
}) as any as S.Schema<ListPolicyGenerationsRequest>;
export interface PolicyGeneration {
  policyEngineId: string;
  policyGenerationId: string;
  name: string;
  policyGenerationArn: string;
  resource: Resource;
  createdAt: Date;
  updatedAt: Date;
  status: PolicyGenerationStatus;
  findings?: string;
  statusReasons: string[];
}
export const PolicyGeneration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyEngineId: S.String,
    policyGenerationId: S.String,
    name: S.String,
    policyGenerationArn: S.String,
    resource: Resource,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: PolicyGenerationStatus,
    findings: S.optional(S.String),
    statusReasons: PolicyStatusReasons,
  }),
).annotate({
  identifier: "PolicyGeneration",
}) as any as S.Schema<PolicyGeneration>;
export type PolicyGenerations = PolicyGeneration[];
export const PolicyGenerations = /*@__PURE__*/ S.Array(PolicyGeneration);
export interface ListPolicyGenerationsResponse {
  policyGenerations: PolicyGeneration[];
  nextToken?: string;
}
export const ListPolicyGenerationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyGenerations: PolicyGenerations,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPolicyGenerationsResponse",
}) as any as S.Schema<ListPolicyGenerationsResponse>;
export interface ListPolicyGenerationSummariesRequest {
  nextToken?: string;
  maxResults?: number;
  policyEngineId: string;
}
export const ListPolicyGenerationSummariesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      policyEngineId: S.String.pipe(T.HttpLabel("policyEngineId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/policy-engines/{policyEngineId}/policy-generation-summaries",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListPolicyGenerationSummariesRequest",
}) as any as S.Schema<ListPolicyGenerationSummariesRequest>;
export interface PolicyGenerationSummary {
  policyEngineId: string;
  policyGenerationId: string;
  name: string;
  policyGenerationArn: string;
  resource: Resource;
  createdAt: Date;
  updatedAt: Date;
  status: PolicyGenerationStatus;
  findings?: string;
}
export const PolicyGenerationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyEngineId: S.String,
    policyGenerationId: S.String,
    name: S.String,
    policyGenerationArn: S.String,
    resource: Resource,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: PolicyGenerationStatus,
    findings: S.optional(S.String),
  }),
).annotate({
  identifier: "PolicyGenerationSummary",
}) as any as S.Schema<PolicyGenerationSummary>;
export type PolicyGenerationSummaryList = PolicyGenerationSummary[];
export const PolicyGenerationSummaryList = /*@__PURE__*/ S.Array(
  PolicyGenerationSummary,
);
export interface ListPolicyGenerationSummariesResponse {
  policyGenerations: PolicyGenerationSummary[];
  nextToken?: string;
}
export const ListPolicyGenerationSummariesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      policyGenerations: PolicyGenerationSummaryList,
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListPolicyGenerationSummariesResponse",
}) as any as S.Schema<ListPolicyGenerationSummariesResponse>;
export interface ListPolicySummariesRequest {
  nextToken?: string;
  maxResults?: number;
  policyEngineId: string;
  targetResourceScope?: string;
}
export const ListPolicySummariesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    policyEngineId: S.String.pipe(T.HttpLabel("policyEngineId")),
    targetResourceScope: S.optional(S.String).pipe(
      T.HttpQuery("targetResourceScope"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/policy-engines/{policyEngineId}/policy-summaries",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPolicySummariesRequest",
}) as any as S.Schema<ListPolicySummariesRequest>;
export interface PolicySummary {
  policyId: string;
  name: string;
  policyEngineId: string;
  createdAt: Date;
  updatedAt: Date;
  policyArn: string;
  status: PolicyStatus;
  enforcementMode?: EnforcementMode;
}
export const PolicySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyId: S.String,
    name: S.String,
    policyEngineId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    policyArn: S.String,
    status: PolicyStatus,
    enforcementMode: S.optional(EnforcementMode),
  }),
).annotate({ identifier: "PolicySummary" }) as any as S.Schema<PolicySummary>;
export type PolicySummaryList = PolicySummary[];
export const PolicySummaryList = /*@__PURE__*/ S.Array(PolicySummary);
export interface ListPolicySummariesResponse {
  policies: PolicySummary[];
  nextToken?: string;
}
export const ListPolicySummariesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policies: PolicySummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListPolicySummariesResponse",
}) as any as S.Schema<ListPolicySummariesResponse>;
export interface ListRegistriesRequest {
  maxResults?: number;
  nextToken?: string;
  status?: RegistryStatus;
  authorizerType?: RegistryAuthorizerType;
}
export const ListRegistriesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    status: S.optional(RegistryStatus).pipe(T.HttpQuery("status")),
    authorizerType: S.optional(RegistryAuthorizerType).pipe(
      T.HttpQuery("authorizerType"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/registries" }),
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
  authorizerType?: RegistryAuthorizerType;
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
    authorizerType: S.optional(RegistryAuthorizerType),
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
export interface ListRegistryRecordsRequest {
  registryId: string;
  maxResults?: number;
  nextToken?: string;
  name?: string;
  status?: RegistryRecordStatus;
  descriptorType?: DescriptorType;
}
export const ListRegistryRecordsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.String.pipe(T.HttpLabel("registryId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    name: S.optional(S.String).pipe(T.HttpQuery("name")),
    status: S.optional(RegistryRecordStatus).pipe(T.HttpQuery("status")),
    descriptorType: S.optional(DescriptorType).pipe(
      T.HttpQuery("descriptorType"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/registries/{registryId}/records" }),
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
  description?: string | redacted.Redacted<string>;
  descriptorType: DescriptorType;
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
    description: S.optional(SensitiveString),
    descriptorType: DescriptorType,
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
export type TaggableResourcesArn = string;
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
  S.Struct({ tags: S.optional(TagsMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListWorkloadIdentitiesRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListWorkloadIdentitiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/identities/ListWorkloadIdentities" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWorkloadIdentitiesRequest",
}) as any as S.Schema<ListWorkloadIdentitiesRequest>;
export interface WorkloadIdentityType {
  name: string;
  workloadIdentityArn: string;
}
export const WorkloadIdentityType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, workloadIdentityArn: S.String }),
).annotate({
  identifier: "WorkloadIdentityType",
}) as any as S.Schema<WorkloadIdentityType>;
export type WorkloadIdentityList = WorkloadIdentityType[];
export const WorkloadIdentityList = /*@__PURE__*/ S.Array(WorkloadIdentityType);
export interface ListWorkloadIdentitiesResponse {
  workloadIdentities: WorkloadIdentityType[];
  nextToken?: string;
}
export const ListWorkloadIdentitiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workloadIdentities: WorkloadIdentityList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWorkloadIdentitiesResponse",
}) as any as S.Schema<ListWorkloadIdentitiesResponse>;
export interface PutResourcePolicyRequest {
  resourceArn: string;
  policy: string;
}
export const PutResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    policy: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/resourcepolicy/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutResourcePolicyRequest",
}) as any as S.Schema<PutResourcePolicyRequest>;
export interface PutResourcePolicyResponse {
  policy: string;
}
export const PutResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policy: S.String }),
).annotate({
  identifier: "PutResourcePolicyResponse",
}) as any as S.Schema<PutResourcePolicyResponse>;
export interface SetTokenVaultCMKRequest {
  tokenVaultId?: string;
  kmsConfiguration: KmsConfiguration;
}
export const SetTokenVaultCMKRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tokenVaultId: S.optional(S.String),
    kmsConfiguration: KmsConfiguration,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/identities/set-token-vault-cmk" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SetTokenVaultCMKRequest",
}) as any as S.Schema<SetTokenVaultCMKRequest>;
export interface SetTokenVaultCMKResponse {
  tokenVaultId: string;
  kmsConfiguration: KmsConfiguration;
  lastModifiedDate: Date;
}
export const SetTokenVaultCMKResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tokenVaultId: S.String,
    kmsConfiguration: KmsConfiguration,
    lastModifiedDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "SetTokenVaultCMKResponse",
}) as any as S.Schema<SetTokenVaultCMKResponse>;
export type Content = { rawText: string };
export const Content = /*@__PURE__*/ S.Union([S.Struct({ rawText: S.String })]);
export interface StartPolicyGenerationRequest {
  policyEngineId: string;
  resource: Resource;
  content: Content;
  name: string;
  clientToken?: string;
}
export const StartPolicyGenerationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyEngineId: S.String.pipe(T.HttpLabel("policyEngineId")),
    resource: Resource,
    content: Content,
    name: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/policy-engines/{policyEngineId}/policy-generations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartPolicyGenerationRequest",
}) as any as S.Schema<StartPolicyGenerationRequest>;
export interface StartPolicyGenerationResponse {
  policyEngineId: string;
  policyGenerationId: string;
  name: string;
  policyGenerationArn: string;
  resource: Resource;
  createdAt: Date;
  updatedAt: Date;
  status: PolicyGenerationStatus;
  findings?: string;
  statusReasons: string[];
}
export const StartPolicyGenerationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyEngineId: S.String,
    policyGenerationId: S.String,
    name: S.String,
    policyGenerationArn: S.String,
    resource: Resource,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: PolicyGenerationStatus,
    findings: S.optional(S.String),
    statusReasons: PolicyStatusReasons,
  }),
).annotate({
  identifier: "StartPolicyGenerationResponse",
}) as any as S.Schema<StartPolicyGenerationResponse>;
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
export type TargetIdList = string[];
export const TargetIdList = /*@__PURE__*/ S.Array(S.String);
export interface SynchronizeGatewayTargetsRequest {
  gatewayIdentifier: string;
  targetIdList: string[];
}
export const SynchronizeGatewayTargetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayIdentifier: S.String.pipe(T.HttpLabel("gatewayIdentifier")),
    targetIdList: TargetIdList,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/gateways/{gatewayIdentifier}/synchronizeTargets",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SynchronizeGatewayTargetsRequest",
}) as any as S.Schema<SynchronizeGatewayTargetsRequest>;
export interface GatewayTarget {
  gatewayArn: string;
  targetId: string;
  createdAt: Date;
  updatedAt: Date;
  status: TargetStatus;
  statusReasons?: string[];
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  targetConfiguration: TargetConfiguration;
  credentialProviderConfigurations: CredentialProviderConfiguration[];
  lastSynchronizedAt?: Date;
  metadataConfiguration?: MetadataConfiguration;
  privateEndpoint?: PrivateEndpoint;
  privateEndpointManagedResources?: ManagedResourceDetails[];
  authorizationData?: AuthorizationData;
  protocolType?: TargetProtocolType;
}
export const GatewayTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayArn: S.String,
    targetId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: TargetStatus,
    statusReasons: S.optional(StatusReasons),
    name: SensitiveString,
    description: S.optional(SensitiveString),
    targetConfiguration: TargetConfiguration,
    credentialProviderConfigurations: CredentialProviderConfigurations,
    lastSynchronizedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    metadataConfiguration: S.optional(MetadataConfiguration),
    privateEndpoint: S.optional(PrivateEndpoint),
    privateEndpointManagedResources: S.optional(
      PrivateEndpointManagedResources,
    ),
    authorizationData: S.optional(AuthorizationData),
    protocolType: S.optional(TargetProtocolType),
  }),
).annotate({ identifier: "GatewayTarget" }) as any as S.Schema<GatewayTarget>;
export type GatewayTargetList = GatewayTarget[];
export const GatewayTargetList = /*@__PURE__*/ S.Array(GatewayTarget);
export interface SynchronizeGatewayTargetsResponse {
  targets?: GatewayTarget[];
}
export const SynchronizeGatewayTargetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ targets: S.optional(GatewayTargetList) }),
).annotate({
  identifier: "SynchronizeGatewayTargetsResponse",
}) as any as S.Schema<SynchronizeGatewayTargetsResponse>;
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
export interface UpdateAgentRuntimeRequest {
  agentRuntimeId: string;
  agentRuntimeArtifact: AgentRuntimeArtifact;
  roleArn: string;
  networkConfiguration?: NetworkConfiguration;
  description?: string | redacted.Redacted<string>;
  authorizerConfiguration?: AuthorizerConfiguration;
  requestHeaderConfiguration?: RequestHeaderConfiguration;
  protocolConfiguration?: ProtocolConfiguration;
  lifecycleConfiguration?: LifecycleConfiguration;
  metadataConfiguration?: RuntimeMetadataConfiguration;
  environmentVariables?: { [key: string]: string | undefined };
  filesystemConfigurations?: FilesystemConfiguration[];
  capacityProviderConfiguration?: CapacityProviderConfiguration;
  clientToken?: string;
}
export const UpdateAgentRuntimeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentRuntimeId: S.String.pipe(T.HttpLabel("agentRuntimeId")),
    agentRuntimeArtifact: AgentRuntimeArtifact,
    roleArn: S.String,
    networkConfiguration: S.optional(NetworkConfiguration),
    description: S.optional(SensitiveString),
    authorizerConfiguration: S.optional(AuthorizerConfiguration),
    requestHeaderConfiguration: S.optional(RequestHeaderConfiguration),
    protocolConfiguration: S.optional(ProtocolConfiguration),
    lifecycleConfiguration: S.optional(LifecycleConfiguration),
    metadataConfiguration: S.optional(RuntimeMetadataConfiguration),
    environmentVariables: S.optional(EnvironmentVariablesMap),
    filesystemConfigurations: S.optional(FilesystemConfigurations),
    capacityProviderConfiguration: S.optional(CapacityProviderConfiguration),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/runtimes/{agentRuntimeId}/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAgentRuntimeRequest",
}) as any as S.Schema<UpdateAgentRuntimeRequest>;
export interface UpdateAgentRuntimeResponse {
  agentRuntimeArn: string;
  agentRuntimeId: string;
  workloadIdentityDetails?: WorkloadIdentityDetails;
  agentRuntimeVersion: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  status: AgentRuntimeStatus;
}
export const UpdateAgentRuntimeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentRuntimeArn: S.String,
    agentRuntimeId: S.String,
    workloadIdentityDetails: S.optional(WorkloadIdentityDetails),
    agentRuntimeVersion: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: AgentRuntimeStatus,
  }),
).annotate({
  identifier: "UpdateAgentRuntimeResponse",
}) as any as S.Schema<UpdateAgentRuntimeResponse>;
export interface UpdateAgentRuntimeEndpointRequest {
  agentRuntimeId: string;
  endpointName: string | redacted.Redacted<string>;
  agentRuntimeVersion?: string;
  description?: string;
  clientToken?: string;
}
export const UpdateAgentRuntimeEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentRuntimeId: S.String.pipe(T.HttpLabel("agentRuntimeId")),
    endpointName: SensitiveString.pipe(T.HttpLabel("endpointName")),
    agentRuntimeVersion: S.optional(S.String),
    description: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/runtimes/{agentRuntimeId}/runtime-endpoints/{endpointName}/",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAgentRuntimeEndpointRequest",
}) as any as S.Schema<UpdateAgentRuntimeEndpointRequest>;
export interface UpdateAgentRuntimeEndpointResponse {
  liveVersion?: string;
  targetVersion?: string;
  agentRuntimeEndpointArn: string;
  agentRuntimeArn: string;
  status: AgentRuntimeEndpointStatus;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export const UpdateAgentRuntimeEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    liveVersion: S.optional(S.String),
    targetVersion: S.optional(S.String),
    agentRuntimeEndpointArn: S.String,
    agentRuntimeArn: S.String,
    status: AgentRuntimeEndpointStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "UpdateAgentRuntimeEndpointResponse",
}) as any as S.Schema<UpdateAgentRuntimeEndpointResponse>;
export interface UpdateApiKeyCredentialProviderRequest {
  name: string;
  apiKey?: string | redacted.Redacted<string>;
  apiKeySecretConfig?: SecretReference;
  apiKeySecretSource?: SecretSourceType;
}
export const UpdateApiKeyCredentialProviderRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      name: S.String,
      apiKey: S.optional(SensitiveString),
      apiKeySecretConfig: S.optional(SecretReference),
      apiKeySecretSource: S.optional(SecretSourceType),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/identities/UpdateApiKeyCredentialProvider",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateApiKeyCredentialProviderRequest",
}) as any as S.Schema<UpdateApiKeyCredentialProviderRequest>;
export interface UpdateApiKeyCredentialProviderResponse {
  apiKeySecretArn: Secret;
  apiKeySecretJsonKey?: string;
  apiKeySecretSource?: SecretSourceType;
  name: string;
  credentialProviderArn: string;
  createdTime: Date;
  lastUpdatedTime: Date;
}
export const UpdateApiKeyCredentialProviderResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      apiKeySecretArn: Secret,
      apiKeySecretJsonKey: S.optional(S.String),
      apiKeySecretSource: S.optional(SecretSourceType),
      name: S.String,
      credentialProviderArn: S.String,
      createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      lastUpdatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    }),
).annotate({
  identifier: "UpdateApiKeyCredentialProviderResponse",
}) as any as S.Schema<UpdateApiKeyCredentialProviderResponse>;
export interface UpdatedDescription {
  optionalValue?: string | redacted.Redacted<string>;
}
export const UpdatedDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(SensitiveString) }),
).annotate({
  identifier: "UpdatedDescription",
}) as any as S.Schema<UpdatedDescription>;
export interface UpdateCapacityProviderInput {
  capacityProviderId: string;
  description?: UpdatedDescription;
  clientToken?: string;
}
export const UpdateCapacityProviderInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacityProviderId: S.String.pipe(T.HttpLabel("capacityProviderId")),
    description: S.optional(UpdatedDescription),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/capacity-providers/{capacityProviderId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCapacityProviderInput",
}) as any as S.Schema<UpdateCapacityProviderInput>;
export interface UpdateCapacityProviderOutput {
  capacityProviderId: string;
  capacityProviderArn: string;
  name: string;
  status: CapacityProviderStatus;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export const UpdateCapacityProviderOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacityProviderId: S.String,
    capacityProviderArn: S.String,
    name: S.String,
    status: CapacityProviderStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "UpdateCapacityProviderOutput",
}) as any as S.Schema<UpdateCapacityProviderOutput>;
export interface UpdateConfigurationBundleRequest {
  clientToken?: string;
  bundleId: string;
  bundleName?: string;
  description?: string | redacted.Redacted<string>;
  components?: { [key: string]: ComponentConfiguration | undefined };
  parentVersionIds?: string[];
  branchName?: string;
  commitMessage?: string;
  createdBy?: VersionCreatedBySource;
  kmsKeyArn?: string;
}
export const UpdateConfigurationBundleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    bundleId: S.String.pipe(T.HttpLabel("bundleId")),
    bundleName: S.optional(S.String),
    description: S.optional(SensitiveString),
    components: S.optional(ComponentConfigurationMap),
    parentVersionIds: S.optional(ConfigurationBundleVersionList),
    branchName: S.optional(S.String),
    commitMessage: S.optional(S.String),
    createdBy: S.optional(VersionCreatedBySource),
    kmsKeyArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/configuration-bundles/{bundleId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateConfigurationBundleRequest",
}) as any as S.Schema<UpdateConfigurationBundleRequest>;
export interface UpdateConfigurationBundleResponse {
  bundleArn: string;
  bundleId: string;
  versionId: string;
  updatedAt: Date;
}
export const UpdateConfigurationBundleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bundleArn: S.String,
    bundleId: S.String,
    versionId: S.String,
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "UpdateConfigurationBundleResponse",
}) as any as S.Schema<UpdateConfigurationBundleResponse>;
export interface UpdateDatasetRequest {
  datasetId: string;
  clientToken?: string;
  description?: string;
}
export const UpdateDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetId: S.String.pipe(T.HttpLabel("datasetId")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/datasets/{datasetId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDatasetRequest",
}) as any as S.Schema<UpdateDatasetRequest>;
export interface UpdateDatasetResponse {
  datasetArn: string;
  datasetId: string;
  updatedAt: Date;
}
export const UpdateDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetArn: S.String,
    datasetId: S.String,
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "UpdateDatasetResponse",
}) as any as S.Schema<UpdateDatasetResponse>;
export interface UpdateDatasetExamplesRequest {
  datasetId: string;
  clientToken?: string;
  examples: any[];
}
export const UpdateDatasetExamplesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetId: S.String.pipe(T.HttpLabel("datasetId")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    examples: DatasetExampleList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/datasets/{datasetId}/examples/update" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDatasetExamplesRequest",
}) as any as S.Schema<UpdateDatasetExamplesRequest>;
export interface UpdateDatasetExamplesResponse {
  datasetArn: string;
  datasetId: string;
  status: DatasetStatus;
  updatedCount: number;
  updatedAt: Date;
}
export const UpdateDatasetExamplesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetArn: S.String,
    datasetId: S.String,
    status: DatasetStatus,
    updatedCount: S.Number,
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "UpdateDatasetExamplesResponse",
}) as any as S.Schema<UpdateDatasetExamplesResponse>;
export interface UpdateEvaluatorRequest {
  clientToken?: string;
  evaluatorId: string;
  description?: string | redacted.Redacted<string>;
  evaluatorConfig?: EvaluatorConfig;
  level?: EvaluatorLevel;
  kmsKeyArn?: string;
}
export const UpdateEvaluatorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    evaluatorId: S.String.pipe(T.HttpLabel("evaluatorId")),
    description: S.optional(SensitiveString),
    evaluatorConfig: S.optional(EvaluatorConfig),
    level: S.optional(EvaluatorLevel),
    kmsKeyArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/evaluators/{evaluatorId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEvaluatorRequest",
}) as any as S.Schema<UpdateEvaluatorRequest>;
export interface UpdateEvaluatorResponse {
  evaluatorArn: string;
  evaluatorId: string;
  updatedAt: Date;
  status: EvaluatorStatus;
}
export const UpdateEvaluatorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    evaluatorArn: S.String,
    evaluatorId: S.String,
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: EvaluatorStatus,
  }),
).annotate({
  identifier: "UpdateEvaluatorResponse",
}) as any as S.Schema<UpdateEvaluatorResponse>;
export interface UpdateGatewayRequest {
  gatewayIdentifier: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  roleArn: string;
  protocolType?: GatewayProtocolType;
  protocolConfiguration?: GatewayProtocolConfiguration;
  authorizerType: AuthorizerType;
  authorizerConfiguration?: AuthorizerConfiguration;
  kmsKeyArn?: string;
  customTransformConfiguration?: CustomTransformConfiguration;
  interceptorConfigurations?: GatewayInterceptorConfiguration[];
  policyEngineConfiguration?: GatewayPolicyEngineConfiguration;
  exceptionLevel?: ExceptionLevel;
  wafConfiguration?: WafConfiguration;
}
export const UpdateGatewayRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayIdentifier: S.String.pipe(T.HttpLabel("gatewayIdentifier")),
    name: S.String,
    description: S.optional(SensitiveString),
    roleArn: S.String,
    protocolType: S.optional(GatewayProtocolType),
    protocolConfiguration: S.optional(GatewayProtocolConfiguration),
    authorizerType: AuthorizerType,
    authorizerConfiguration: S.optional(AuthorizerConfiguration),
    kmsKeyArn: S.optional(S.String),
    customTransformConfiguration: S.optional(CustomTransformConfiguration),
    interceptorConfigurations: S.optional(GatewayInterceptorConfigurations),
    policyEngineConfiguration: S.optional(GatewayPolicyEngineConfiguration),
    exceptionLevel: S.optional(ExceptionLevel),
    wafConfiguration: S.optional(WafConfiguration),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/gateways/{gatewayIdentifier}/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGatewayRequest",
}) as any as S.Schema<UpdateGatewayRequest>;
export interface UpdateGatewayResponse {
  gatewayArn: string;
  gatewayId: string;
  gatewayUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  status: GatewayStatus;
  statusReasons?: string[];
  name: string;
  description?: string | redacted.Redacted<string>;
  roleArn?: string;
  protocolType?: GatewayProtocolType;
  protocolConfiguration?: GatewayProtocolConfiguration;
  authorizerType: AuthorizerType;
  authorizerConfiguration?: AuthorizerConfiguration;
  kmsKeyArn?: string;
  customTransformConfiguration?: CustomTransformConfiguration;
  interceptorConfigurations?: GatewayInterceptorConfiguration[];
  policyEngineConfiguration?: GatewayPolicyEngineConfiguration;
  workloadIdentityDetails?: WorkloadIdentityDetails;
  exceptionLevel?: ExceptionLevel;
  webAclArn?: string;
  wafConfiguration?: WafConfiguration;
}
export const UpdateGatewayResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayArn: S.String,
    gatewayId: S.String,
    gatewayUrl: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: GatewayStatus,
    statusReasons: S.optional(StatusReasons),
    name: S.String,
    description: S.optional(SensitiveString),
    roleArn: S.optional(S.String),
    protocolType: S.optional(GatewayProtocolType),
    protocolConfiguration: S.optional(GatewayProtocolConfiguration),
    authorizerType: AuthorizerType,
    authorizerConfiguration: S.optional(AuthorizerConfiguration),
    kmsKeyArn: S.optional(S.String),
    customTransformConfiguration: S.optional(CustomTransformConfiguration),
    interceptorConfigurations: S.optional(GatewayInterceptorConfigurations),
    policyEngineConfiguration: S.optional(GatewayPolicyEngineConfiguration),
    workloadIdentityDetails: S.optional(WorkloadIdentityDetails),
    exceptionLevel: S.optional(ExceptionLevel),
    webAclArn: S.optional(S.String),
    wafConfiguration: S.optional(WafConfiguration),
  }),
).annotate({
  identifier: "UpdateGatewayResponse",
}) as any as S.Schema<UpdateGatewayResponse>;
export interface UpdateGatewayRateLimitRequest {
  gatewayIdentifier: string;
  rateLimitId: string;
  description?: string;
  entries: LimitEntry[];
}
export const UpdateGatewayRateLimitRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayIdentifier: S.String.pipe(T.HttpLabel("gatewayIdentifier")),
    rateLimitId: S.String.pipe(T.HttpLabel("rateLimitId")),
    description: S.optional(S.String),
    entries: LimitEntries,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/gateways/{gatewayIdentifier}/rate-limits/{rateLimitId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGatewayRateLimitRequest",
}) as any as S.Schema<UpdateGatewayRateLimitRequest>;
export interface UpdateGatewayRateLimitResponse {
  rateLimitId: string;
  gatewayIdentifier: string;
  description?: string;
  dimensionKeys: string[];
  entries: LimitEntry[];
  status: GatewayRateLimitStatus;
  createdAt: Date;
  updatedAt: Date;
}
export const UpdateGatewayRateLimitResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    rateLimitId: S.String,
    gatewayIdentifier: S.String,
    description: S.optional(S.String),
    dimensionKeys: DimensionKeys,
    entries: LimitEntries,
    status: GatewayRateLimitStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "UpdateGatewayRateLimitResponse",
}) as any as S.Schema<UpdateGatewayRateLimitResponse>;
export interface UpdateGatewayRuleRequest {
  gatewayIdentifier: string;
  ruleId: string;
  priority?: number;
  conditions?: Condition[];
  actions?: Action[];
  description?: string;
}
export const UpdateGatewayRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayIdentifier: S.String.pipe(T.HttpLabel("gatewayIdentifier")),
    ruleId: S.String.pipe(T.HttpLabel("ruleId")),
    priority: S.optional(S.Number),
    conditions: S.optional(Conditions),
    actions: S.optional(Actions),
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/gateways/{gatewayIdentifier}/rules/{ruleId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGatewayRuleRequest",
}) as any as S.Schema<UpdateGatewayRuleRequest>;
export interface UpdateGatewayRuleResponse {
  ruleId: string;
  gatewayArn: string;
  priority: number;
  conditions?: Condition[];
  actions: Action[];
  description?: string;
  createdAt: Date;
  status: GatewayRuleStatus;
  system?: SystemManagedBlock;
  updatedAt?: Date;
}
export const UpdateGatewayRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleId: S.String,
    gatewayArn: S.String,
    priority: S.Number,
    conditions: S.optional(Conditions),
    actions: Actions,
    description: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: GatewayRuleStatus,
    system: S.optional(SystemManagedBlock),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "UpdateGatewayRuleResponse",
}) as any as S.Schema<UpdateGatewayRuleResponse>;
export interface UpdateGatewayTargetRequest {
  gatewayIdentifier: string;
  targetId: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  targetConfiguration: TargetConfiguration;
  credentialProviderConfigurations?: CredentialProviderConfiguration[];
  metadataConfiguration?: MetadataConfiguration;
  privateEndpoint?: PrivateEndpoint;
}
export const UpdateGatewayTargetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayIdentifier: S.String.pipe(T.HttpLabel("gatewayIdentifier")),
    targetId: S.String.pipe(T.HttpLabel("targetId")),
    name: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    targetConfiguration: TargetConfiguration,
    credentialProviderConfigurations: S.optional(
      CredentialProviderConfigurations,
    ),
    metadataConfiguration: S.optional(MetadataConfiguration),
    privateEndpoint: S.optional(PrivateEndpoint),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/gateways/{gatewayIdentifier}/targets/{targetId}/",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGatewayTargetRequest",
}) as any as S.Schema<UpdateGatewayTargetRequest>;
export interface UpdateGatewayTargetResponse {
  gatewayArn: string;
  targetId: string;
  createdAt: Date;
  updatedAt: Date;
  status: TargetStatus;
  statusReasons?: string[];
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  targetConfiguration: TargetConfiguration;
  credentialProviderConfigurations: CredentialProviderConfiguration[];
  lastSynchronizedAt?: Date;
  metadataConfiguration?: MetadataConfiguration;
  privateEndpoint?: PrivateEndpoint;
  privateEndpointManagedResources?: ManagedResourceDetails[];
  authorizationData?: AuthorizationData;
  protocolType?: TargetProtocolType;
}
export const UpdateGatewayTargetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayArn: S.String,
    targetId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: TargetStatus,
    statusReasons: S.optional(StatusReasons),
    name: SensitiveString,
    description: S.optional(SensitiveString),
    targetConfiguration: TargetConfiguration,
    credentialProviderConfigurations: CredentialProviderConfigurations,
    lastSynchronizedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    metadataConfiguration: S.optional(MetadataConfiguration),
    privateEndpoint: S.optional(PrivateEndpoint),
    privateEndpointManagedResources: S.optional(
      PrivateEndpointManagedResources,
    ),
    authorizationData: S.optional(AuthorizationData),
    protocolType: S.optional(TargetProtocolType),
  }),
).annotate({
  identifier: "UpdateGatewayTargetResponse",
}) as any as S.Schema<UpdateGatewayTargetResponse>;
export interface UpdatedHarnessEnvironmentArtifact {
  optionalValue?: HarnessEnvironmentArtifact;
}
export const UpdatedHarnessEnvironmentArtifact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(HarnessEnvironmentArtifact) }),
).annotate({
  identifier: "UpdatedHarnessEnvironmentArtifact",
}) as any as S.Schema<UpdatedHarnessEnvironmentArtifact>;
export interface UpdatedAuthorizerConfiguration {
  optionalValue?: AuthorizerConfiguration;
}
export const UpdatedAuthorizerConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(AuthorizerConfiguration) }),
).annotate({
  identifier: "UpdatedAuthorizerConfiguration",
}) as any as S.Schema<UpdatedAuthorizerConfiguration>;
export interface UpdatedHarnessMemoryConfiguration {
  optionalValue?: HarnessMemoryConfiguration;
}
export const UpdatedHarnessMemoryConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(HarnessMemoryConfiguration) }),
).annotate({
  identifier: "UpdatedHarnessMemoryConfiguration",
}) as any as S.Schema<UpdatedHarnessMemoryConfiguration>;
export interface UpdateHarnessRequest {
  harnessId: string;
  clientToken?: string;
  executionRoleArn?: string;
  environment?: HarnessEnvironmentProviderRequest;
  environmentArtifact?: UpdatedHarnessEnvironmentArtifact;
  environmentVariables?: { [key: string]: string | undefined };
  authorizerConfiguration?: UpdatedAuthorizerConfiguration;
  model?: HarnessModelConfiguration;
  systemPrompt?: HarnessSystemContentBlock[];
  tools?: HarnessTool[];
  skills?: HarnessSkill[];
  allowedTools?: string[];
  memory?: UpdatedHarnessMemoryConfiguration;
  truncation?: HarnessTruncationConfiguration;
  maxIterations?: number;
  maxTokens?: number;
  timeoutSeconds?: number;
}
export const UpdateHarnessRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    harnessId: S.String.pipe(T.HttpLabel("harnessId")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    executionRoleArn: S.optional(S.String),
    environment: S.optional(HarnessEnvironmentProviderRequest),
    environmentArtifact: S.optional(UpdatedHarnessEnvironmentArtifact),
    environmentVariables: S.optional(EnvironmentVariablesMap),
    authorizerConfiguration: S.optional(UpdatedAuthorizerConfiguration),
    model: S.optional(HarnessModelConfiguration),
    systemPrompt: S.optional(HarnessSystemPrompt),
    tools: S.optional(HarnessTools),
    skills: S.optional(HarnessSkills),
    allowedTools: S.optional(HarnessAllowedTools),
    memory: S.optional(UpdatedHarnessMemoryConfiguration),
    truncation: S.optional(HarnessTruncationConfiguration),
    maxIterations: S.optional(S.Number),
    maxTokens: S.optional(S.Number),
    timeoutSeconds: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/harnesses/{harnessId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateHarnessRequest",
}) as any as S.Schema<UpdateHarnessRequest>;
export interface UpdateHarnessResponse {
  harness: Harness;
}
export const UpdateHarnessResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ harness: Harness }),
).annotate({
  identifier: "UpdateHarnessResponse",
}) as any as S.Schema<UpdateHarnessResponse>;
export interface UpdateHarnessEndpointRequest {
  harnessId: string;
  endpointName: string;
  targetVersion?: string;
  description?: string;
  clientToken?: string;
}
export const UpdateHarnessEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    harnessId: S.String.pipe(T.HttpLabel("harnessId")),
    endpointName: S.String.pipe(T.HttpLabel("endpointName")),
    targetVersion: S.optional(S.String),
    description: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/harnesses/{harnessId}/endpoints/{endpointName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateHarnessEndpointRequest",
}) as any as S.Schema<UpdateHarnessEndpointRequest>;
export interface UpdateHarnessEndpointResponse {
  endpoint: HarnessEndpoint;
}
export const UpdateHarnessEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ endpoint: HarnessEndpoint }),
).annotate({
  identifier: "UpdateHarnessEndpointResponse",
}) as any as S.Schema<UpdateHarnessEndpointResponse>;
export type CustomExtractionConfigurationInput =
  | {
      semanticExtractionOverride: SemanticOverrideExtractionConfigurationInput;
      userPreferenceExtractionOverride?: never;
      episodicExtractionOverride?: never;
    }
  | {
      semanticExtractionOverride?: never;
      userPreferenceExtractionOverride: UserPreferenceOverrideExtractionConfigurationInput;
      episodicExtractionOverride?: never;
    }
  | {
      semanticExtractionOverride?: never;
      userPreferenceExtractionOverride?: never;
      episodicExtractionOverride: EpisodicOverrideExtractionConfigurationInput;
    };
export const CustomExtractionConfigurationInput = /*@__PURE__*/ S.Union([
  S.Struct({
    semanticExtractionOverride: SemanticOverrideExtractionConfigurationInput,
  }),
  S.Struct({
    userPreferenceExtractionOverride:
      UserPreferenceOverrideExtractionConfigurationInput,
  }),
  S.Struct({
    episodicExtractionOverride: EpisodicOverrideExtractionConfigurationInput,
  }),
]);
export type ModifyExtractionConfiguration = {
  customExtractionConfiguration: CustomExtractionConfigurationInput;
};
export const ModifyExtractionConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({
    customExtractionConfiguration: CustomExtractionConfigurationInput,
  }),
]);
export type CustomConsolidationConfigurationInput =
  | {
      semanticConsolidationOverride: SemanticOverrideConsolidationConfigurationInput;
      summaryConsolidationOverride?: never;
      userPreferenceConsolidationOverride?: never;
      episodicConsolidationOverride?: never;
    }
  | {
      semanticConsolidationOverride?: never;
      summaryConsolidationOverride: SummaryOverrideConsolidationConfigurationInput;
      userPreferenceConsolidationOverride?: never;
      episodicConsolidationOverride?: never;
    }
  | {
      semanticConsolidationOverride?: never;
      summaryConsolidationOverride?: never;
      userPreferenceConsolidationOverride: UserPreferenceOverrideConsolidationConfigurationInput;
      episodicConsolidationOverride?: never;
    }
  | {
      semanticConsolidationOverride?: never;
      summaryConsolidationOverride?: never;
      userPreferenceConsolidationOverride?: never;
      episodicConsolidationOverride: EpisodicOverrideConsolidationConfigurationInput;
    };
export const CustomConsolidationConfigurationInput = /*@__PURE__*/ S.Union([
  S.Struct({
    semanticConsolidationOverride:
      SemanticOverrideConsolidationConfigurationInput,
  }),
  S.Struct({
    summaryConsolidationOverride:
      SummaryOverrideConsolidationConfigurationInput,
  }),
  S.Struct({
    userPreferenceConsolidationOverride:
      UserPreferenceOverrideConsolidationConfigurationInput,
  }),
  S.Struct({
    episodicConsolidationOverride:
      EpisodicOverrideConsolidationConfigurationInput,
  }),
]);
export type ModifyConsolidationConfiguration = {
  customConsolidationConfiguration: CustomConsolidationConfigurationInput;
};
export const ModifyConsolidationConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({
    customConsolidationConfiguration: CustomConsolidationConfigurationInput,
  }),
]);
export type CustomReflectionConfigurationInput = {
  episodicReflectionOverride: EpisodicOverrideReflectionConfigurationInput;
};
export const CustomReflectionConfigurationInput = /*@__PURE__*/ S.Union([
  S.Struct({
    episodicReflectionOverride: EpisodicOverrideReflectionConfigurationInput,
  }),
]);
export type ModifyReflectionConfiguration =
  | {
      episodicReflectionConfiguration: EpisodicReflectionConfigurationInput;
      customReflectionConfiguration?: never;
    }
  | {
      episodicReflectionConfiguration?: never;
      customReflectionConfiguration: CustomReflectionConfigurationInput;
    };
export const ModifyReflectionConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({
    episodicReflectionConfiguration: EpisodicReflectionConfigurationInput,
  }),
  S.Struct({
    customReflectionConfiguration: CustomReflectionConfigurationInput,
  }),
]);
export interface ModifyInvocationConfigurationInput {
  topicArn?: string;
  payloadDeliveryBucketName?: string;
}
export const ModifyInvocationConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    topicArn: S.optional(S.String),
    payloadDeliveryBucketName: S.optional(S.String),
  }),
).annotate({
  identifier: "ModifyInvocationConfigurationInput",
}) as any as S.Schema<ModifyInvocationConfigurationInput>;
export interface ModifySelfManagedConfiguration {
  triggerConditions?: TriggerConditionInput[];
  invocationConfiguration?: ModifyInvocationConfigurationInput;
  historicalContextWindowSize?: number;
}
export const ModifySelfManagedConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    triggerConditions: S.optional(TriggerConditionInputList),
    invocationConfiguration: S.optional(ModifyInvocationConfigurationInput),
    historicalContextWindowSize: S.optional(S.Number),
  }),
).annotate({
  identifier: "ModifySelfManagedConfiguration",
}) as any as S.Schema<ModifySelfManagedConfiguration>;
export interface ModifyStrategyConfiguration {
  extraction?: ModifyExtractionConfiguration;
  consolidation?: ModifyConsolidationConfiguration;
  reflection?: ModifyReflectionConfiguration;
  selfManagedConfiguration?: ModifySelfManagedConfiguration;
}
export const ModifyStrategyConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    extraction: S.optional(ModifyExtractionConfiguration),
    consolidation: S.optional(ModifyConsolidationConfiguration),
    reflection: S.optional(ModifyReflectionConfiguration),
    selfManagedConfiguration: S.optional(ModifySelfManagedConfiguration),
  }),
).annotate({
  identifier: "ModifyStrategyConfiguration",
}) as any as S.Schema<ModifyStrategyConfiguration>;
export interface ModifyMemoryStrategyInput {
  memoryStrategyId: string;
  description?: string | redacted.Redacted<string>;
  namespaces?: string[];
  namespaceTemplates?: string[];
  configuration?: ModifyStrategyConfiguration;
  memoryRecordSchema?: MemoryRecordSchema;
}
export const ModifyMemoryStrategyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memoryStrategyId: S.String,
    description: S.optional(SensitiveString),
    namespaces: S.optional(NamespacesList),
    namespaceTemplates: S.optional(NamespacesList),
    configuration: S.optional(ModifyStrategyConfiguration),
    memoryRecordSchema: S.optional(MemoryRecordSchema),
  }),
).annotate({
  identifier: "ModifyMemoryStrategyInput",
}) as any as S.Schema<ModifyMemoryStrategyInput>;
export type ModifyMemoryStrategiesList = ModifyMemoryStrategyInput[];
export const ModifyMemoryStrategiesList = /*@__PURE__*/ S.Array(
  ModifyMemoryStrategyInput,
);
export interface DeleteMemoryStrategyInput {
  memoryStrategyId: string;
}
export const DeleteMemoryStrategyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ memoryStrategyId: S.String }),
).annotate({
  identifier: "DeleteMemoryStrategyInput",
}) as any as S.Schema<DeleteMemoryStrategyInput>;
export type DeleteMemoryStrategiesList = DeleteMemoryStrategyInput[];
export const DeleteMemoryStrategiesList = /*@__PURE__*/ S.Array(
  DeleteMemoryStrategyInput,
);
export interface ModifyMemoryStrategies {
  addMemoryStrategies?: MemoryStrategyInput[];
  modifyMemoryStrategies?: ModifyMemoryStrategyInput[];
  deleteMemoryStrategies?: DeleteMemoryStrategyInput[];
}
export const ModifyMemoryStrategies = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    addMemoryStrategies: S.optional(MemoryStrategyInputList),
    modifyMemoryStrategies: S.optional(ModifyMemoryStrategiesList),
    deleteMemoryStrategies: S.optional(DeleteMemoryStrategiesList),
  }),
).annotate({
  identifier: "ModifyMemoryStrategies",
}) as any as S.Schema<ModifyMemoryStrategies>;
export interface UpdateMemoryInput {
  clientToken?: string;
  memoryId: string;
  description?: string | redacted.Redacted<string>;
  eventExpiryDuration?: number;
  memoryExecutionRoleArn?: string;
  memoryStrategies?: ModifyMemoryStrategies;
  addIndexedKeys?: IndexedKey[];
  namespaceKeys?: NamespaceKeyEntry[];
  streamDeliveryResources?: StreamDeliveryResources;
}
export const UpdateMemoryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    memoryId: S.String.pipe(T.HttpLabel("memoryId")),
    description: S.optional(SensitiveString),
    eventExpiryDuration: S.optional(S.Number),
    memoryExecutionRoleArn: S.optional(S.String),
    memoryStrategies: S.optional(ModifyMemoryStrategies),
    addIndexedKeys: S.optional(IndexedKeysList),
    namespaceKeys: S.optional(NamespaceKeysList),
    streamDeliveryResources: S.optional(StreamDeliveryResources),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/memories/{memoryId}/update" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMemoryInput",
}) as any as S.Schema<UpdateMemoryInput>;
export interface UpdateMemoryOutput {
  memory?: Memory;
}
export const UpdateMemoryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ memory: S.optional(Memory) }),
).annotate({
  identifier: "UpdateMemoryOutput",
}) as any as S.Schema<UpdateMemoryOutput>;
export interface UpdateOauth2CredentialProviderRequest {
  name: string;
  credentialProviderVendor: CredentialProviderVendorType;
  oauth2ProviderConfigInput: Oauth2ProviderConfigInput;
}
export const UpdateOauth2CredentialProviderRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      name: S.String,
      credentialProviderVendor: CredentialProviderVendorType,
      oauth2ProviderConfigInput: Oauth2ProviderConfigInput,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/identities/UpdateOauth2CredentialProvider",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateOauth2CredentialProviderRequest",
}) as any as S.Schema<UpdateOauth2CredentialProviderRequest>;
export interface UpdateOauth2CredentialProviderResponse {
  clientSecretArn: Secret;
  clientSecretJsonKey?: string;
  clientSecretSource?: SecretSourceType;
  name: string;
  credentialProviderVendor: CredentialProviderVendorType;
  credentialProviderArn: string;
  callbackUrl?: string;
  oauth2ProviderConfigOutput: Oauth2ProviderConfigOutput;
  createdTime: Date;
  lastUpdatedTime: Date;
  status?: Status;
}
export const UpdateOauth2CredentialProviderResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      clientSecretArn: Secret,
      clientSecretJsonKey: S.optional(S.String),
      clientSecretSource: S.optional(SecretSourceType),
      name: S.String,
      credentialProviderVendor: CredentialProviderVendorType,
      credentialProviderArn: S.String,
      callbackUrl: S.optional(S.String),
      oauth2ProviderConfigOutput: Oauth2ProviderConfigOutput,
      createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      lastUpdatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      status: S.optional(Status),
    }),
).annotate({
  identifier: "UpdateOauth2CredentialProviderResponse",
}) as any as S.Schema<UpdateOauth2CredentialProviderResponse>;
export interface UpdateOnlineEvaluationConfigRequest {
  clientToken?: string;
  onlineEvaluationConfigId: string;
  description?: string | redacted.Redacted<string>;
  rule?: Rule;
  dataSourceConfig?: DataSourceConfig;
  evaluators?: EvaluatorReference[];
  insights?: Insight[];
  clusteringConfig?: ClusteringConfig;
  evaluationExecutionRoleArn?: string;
  executionStatus?: OnlineEvaluationExecutionStatus;
}
export const UpdateOnlineEvaluationConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    onlineEvaluationConfigId: S.String.pipe(
      T.HttpLabel("onlineEvaluationConfigId"),
    ),
    description: S.optional(SensitiveString),
    rule: S.optional(Rule),
    dataSourceConfig: S.optional(DataSourceConfig),
    evaluators: S.optional(EvaluatorList),
    insights: S.optional(InsightList),
    clusteringConfig: S.optional(ClusteringConfig),
    evaluationExecutionRoleArn: S.optional(S.String),
    executionStatus: S.optional(OnlineEvaluationExecutionStatus),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/online-evaluation-configs/{onlineEvaluationConfigId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateOnlineEvaluationConfigRequest",
}) as any as S.Schema<UpdateOnlineEvaluationConfigRequest>;
export interface UpdateOnlineEvaluationConfigResponse {
  onlineEvaluationConfigArn: string;
  onlineEvaluationConfigId: string;
  updatedAt: Date;
  status: OnlineEvaluationConfigStatus;
  executionStatus: OnlineEvaluationExecutionStatus;
  failureReason?: string;
}
export const UpdateOnlineEvaluationConfigResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      onlineEvaluationConfigArn: S.String,
      onlineEvaluationConfigId: S.String,
      updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      status: OnlineEvaluationConfigStatus,
      executionStatus: OnlineEvaluationExecutionStatus,
      failureReason: S.optional(S.String),
    }),
).annotate({
  identifier: "UpdateOnlineEvaluationConfigResponse",
}) as any as S.Schema<UpdateOnlineEvaluationConfigResponse>;
export interface UpdatePaymentConnectorRequest {
  paymentManagerId: string;
  paymentConnectorId: string;
  description?: string;
  type?: PaymentConnectorType;
  credentialProviderConfigurations?: CredentialsProviderConfiguration[];
  clientToken?: string;
}
export const UpdatePaymentConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentManagerId: S.String.pipe(T.HttpLabel("paymentManagerId")),
    paymentConnectorId: S.String.pipe(T.HttpLabel("paymentConnectorId")),
    description: S.optional(S.String),
    type: S.optional(PaymentConnectorType),
    credentialProviderConfigurations: S.optional(
      CredentialsProviderConfigurations,
    ),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/payments/managers/{paymentManagerId}/connectors/{paymentConnectorId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePaymentConnectorRequest",
}) as any as S.Schema<UpdatePaymentConnectorRequest>;
export interface UpdatePaymentConnectorResponse {
  paymentConnectorId: string;
  paymentManagerId: string;
  name: string;
  type: PaymentConnectorType;
  credentialProviderConfigurations: CredentialsProviderConfiguration[];
  lastUpdatedAt: Date;
  status: PaymentConnectorStatus;
  authorizationUrl?: string;
}
export const UpdatePaymentConnectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentConnectorId: S.String,
    paymentManagerId: S.String,
    name: S.String,
    type: PaymentConnectorType,
    credentialProviderConfigurations: CredentialsProviderConfigurations,
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: PaymentConnectorStatus,
    authorizationUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdatePaymentConnectorResponse",
}) as any as S.Schema<UpdatePaymentConnectorResponse>;
export interface UpdatePaymentCredentialProviderRequest {
  name: string;
  credentialProviderVendor: PaymentCredentialProviderVendorType;
  providerConfigurationInput: PaymentProviderConfigurationInput;
}
export const UpdatePaymentCredentialProviderRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      name: S.String,
      credentialProviderVendor: PaymentCredentialProviderVendorType,
      providerConfigurationInput: PaymentProviderConfigurationInput,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/identities/UpdatePaymentCredentialProvider",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdatePaymentCredentialProviderRequest",
}) as any as S.Schema<UpdatePaymentCredentialProviderRequest>;
export interface UpdatePaymentCredentialProviderResponse {
  name: string;
  credentialProviderVendor: PaymentCredentialProviderVendorType;
  credentialProviderArn: string;
  providerConfigurationOutput: PaymentProviderConfigurationOutput;
  createdTime: Date;
  lastUpdatedTime: Date;
}
export const UpdatePaymentCredentialProviderResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      name: S.String,
      credentialProviderVendor: PaymentCredentialProviderVendorType,
      credentialProviderArn: S.String,
      providerConfigurationOutput: PaymentProviderConfigurationOutput,
      createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      lastUpdatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    }),
).annotate({
  identifier: "UpdatePaymentCredentialProviderResponse",
}) as any as S.Schema<UpdatePaymentCredentialProviderResponse>;
export interface UpdatePaymentManagerRequest {
  paymentManagerId: string;
  description?: string;
  authorizerType?: PaymentsAuthorizerType;
  authorizerConfiguration?: AuthorizerConfiguration;
  roleArn?: string;
  clientToken?: string;
  kmsKeyArn?: string;
}
export const UpdatePaymentManagerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentManagerId: S.String.pipe(T.HttpLabel("paymentManagerId")),
    description: S.optional(S.String),
    authorizerType: S.optional(PaymentsAuthorizerType),
    authorizerConfiguration: S.optional(AuthorizerConfiguration),
    roleArn: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    kmsKeyArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/payments/managers/{paymentManagerId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePaymentManagerRequest",
}) as any as S.Schema<UpdatePaymentManagerRequest>;
export interface UpdatePaymentManagerResponse {
  paymentManagerArn: string;
  paymentManagerId: string;
  name: string;
  authorizerType: PaymentsAuthorizerType;
  roleArn: string;
  workloadIdentityDetails?: WorkloadIdentityDetails;
  lastUpdatedAt: Date;
  status: PaymentManagerStatus;
  kmsKeyArn?: string;
}
export const UpdatePaymentManagerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentManagerArn: S.String,
    paymentManagerId: S.String,
    name: S.String,
    authorizerType: PaymentsAuthorizerType,
    roleArn: S.String,
    workloadIdentityDetails: S.optional(WorkloadIdentityDetails),
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: PaymentManagerStatus,
    kmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdatePaymentManagerResponse",
}) as any as S.Schema<UpdatePaymentManagerResponse>;
export interface UpdatePolicyRequest {
  policyEngineId: string;
  policyId: string;
  description?: UpdatedDescription;
  definition?: PolicyDefinition;
  validationMode?: PolicyValidationMode;
  enforcementMode?: EnforcementMode;
}
export const UpdatePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyEngineId: S.String.pipe(T.HttpLabel("policyEngineId")),
    policyId: S.String.pipe(T.HttpLabel("policyId")),
    description: S.optional(UpdatedDescription),
    definition: S.optional(PolicyDefinition),
    validationMode: S.optional(PolicyValidationMode),
    enforcementMode: S.optional(EnforcementMode),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/policy-engines/{policyEngineId}/policies/{policyId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePolicyRequest",
}) as any as S.Schema<UpdatePolicyRequest>;
export interface UpdatePolicyResponse {
  policyId: string;
  name: string;
  policyEngineId: string;
  createdAt: Date;
  updatedAt: Date;
  policyArn: string;
  status: PolicyStatus;
  enforcementMode?: EnforcementMode;
  definition: PolicyDefinition;
  description?: string | redacted.Redacted<string>;
  statusReasons: string[];
}
export const UpdatePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyId: S.String,
    name: S.String,
    policyEngineId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    policyArn: S.String,
    status: PolicyStatus,
    enforcementMode: S.optional(EnforcementMode),
    definition: PolicyDefinition,
    description: S.optional(SensitiveString),
    statusReasons: PolicyStatusReasons,
  }),
).annotate({
  identifier: "UpdatePolicyResponse",
}) as any as S.Schema<UpdatePolicyResponse>;
export interface UpdatePolicyEngineRequest {
  policyEngineId: string;
  description?: UpdatedDescription;
}
export const UpdatePolicyEngineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyEngineId: S.String.pipe(T.HttpLabel("policyEngineId")),
    description: S.optional(UpdatedDescription),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/policy-engines/{policyEngineId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePolicyEngineRequest",
}) as any as S.Schema<UpdatePolicyEngineRequest>;
export interface UpdatePolicyEngineResponse {
  policyEngineId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  policyEngineArn: string;
  status: PolicyEngineStatus;
  encryptionKeyArn?: string;
  description?: string | redacted.Redacted<string>;
  statusReasons: string[];
}
export const UpdatePolicyEngineResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyEngineId: S.String,
    name: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    policyEngineArn: S.String,
    status: PolicyEngineStatus,
    encryptionKeyArn: S.optional(S.String),
    description: S.optional(SensitiveString),
    statusReasons: PolicyStatusReasons,
  }),
).annotate({
  identifier: "UpdatePolicyEngineResponse",
}) as any as S.Schema<UpdatePolicyEngineResponse>;
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
  authorizerConfiguration?: UpdatedAuthorizerConfiguration;
  approvalConfiguration?: UpdatedApprovalConfiguration;
}
export const UpdateRegistryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.String.pipe(T.HttpLabel("registryId")),
    name: S.optional(S.String),
    description: S.optional(UpdatedDescription),
    authorizerConfiguration: S.optional(UpdatedAuthorizerConfiguration),
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
  authorizerType?: RegistryAuthorizerType;
  authorizerConfiguration?: AuthorizerConfiguration;
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
    authorizerType: S.optional(RegistryAuthorizerType),
    authorizerConfiguration: S.optional(AuthorizerConfiguration),
    approvalConfiguration: S.optional(ApprovalConfiguration),
    status: RegistryStatus,
    statusReason: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "UpdateRegistryResponse",
}) as any as S.Schema<UpdateRegistryResponse>;
export interface UpdatedServerDefinition {
  optionalValue?: ServerDefinition;
}
export const UpdatedServerDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(ServerDefinition) }),
).annotate({
  identifier: "UpdatedServerDefinition",
}) as any as S.Schema<UpdatedServerDefinition>;
export interface UpdatedToolsDefinition {
  optionalValue?: ToolsDefinition;
}
export const UpdatedToolsDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(ToolsDefinition) }),
).annotate({
  identifier: "UpdatedToolsDefinition",
}) as any as S.Schema<UpdatedToolsDefinition>;
export interface UpdatedMcpDescriptorFields {
  server?: UpdatedServerDefinition;
  tools?: UpdatedToolsDefinition;
}
export const UpdatedMcpDescriptorFields = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    server: S.optional(UpdatedServerDefinition),
    tools: S.optional(UpdatedToolsDefinition),
  }),
).annotate({
  identifier: "UpdatedMcpDescriptorFields",
}) as any as S.Schema<UpdatedMcpDescriptorFields>;
export interface UpdatedMcpDescriptor {
  optionalValue?: UpdatedMcpDescriptorFields;
}
export const UpdatedMcpDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(UpdatedMcpDescriptorFields) }),
).annotate({
  identifier: "UpdatedMcpDescriptor",
}) as any as S.Schema<UpdatedMcpDescriptor>;
export interface UpdatedA2aDescriptor {
  optionalValue?: A2aDescriptor;
}
export const UpdatedA2aDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(A2aDescriptor) }),
).annotate({
  identifier: "UpdatedA2aDescriptor",
}) as any as S.Schema<UpdatedA2aDescriptor>;
export interface UpdatedCustomDescriptor {
  optionalValue?: CustomDescriptor;
}
export const UpdatedCustomDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(CustomDescriptor) }),
).annotate({
  identifier: "UpdatedCustomDescriptor",
}) as any as S.Schema<UpdatedCustomDescriptor>;
export interface UpdatedSkillMdDefinition {
  optionalValue?: SkillMdDefinition;
}
export const UpdatedSkillMdDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(SkillMdDefinition) }),
).annotate({
  identifier: "UpdatedSkillMdDefinition",
}) as any as S.Schema<UpdatedSkillMdDefinition>;
export interface UpdatedSkillDefinition {
  optionalValue?: SkillDefinition;
}
export const UpdatedSkillDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(SkillDefinition) }),
).annotate({
  identifier: "UpdatedSkillDefinition",
}) as any as S.Schema<UpdatedSkillDefinition>;
export interface UpdatedAgentSkillsDescriptorFields {
  skillMd?: UpdatedSkillMdDefinition;
  skillDefinition?: UpdatedSkillDefinition;
}
export const UpdatedAgentSkillsDescriptorFields = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    skillMd: S.optional(UpdatedSkillMdDefinition),
    skillDefinition: S.optional(UpdatedSkillDefinition),
  }),
).annotate({
  identifier: "UpdatedAgentSkillsDescriptorFields",
}) as any as S.Schema<UpdatedAgentSkillsDescriptorFields>;
export interface UpdatedAgentSkillsDescriptor {
  optionalValue?: UpdatedAgentSkillsDescriptorFields;
}
export const UpdatedAgentSkillsDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(UpdatedAgentSkillsDescriptorFields) }),
).annotate({
  identifier: "UpdatedAgentSkillsDescriptor",
}) as any as S.Schema<UpdatedAgentSkillsDescriptor>;
export interface UpdatedDescriptorsUnion {
  mcp?: UpdatedMcpDescriptor;
  a2a?: UpdatedA2aDescriptor;
  custom?: UpdatedCustomDescriptor;
  agentSkills?: UpdatedAgentSkillsDescriptor;
}
export const UpdatedDescriptorsUnion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mcp: S.optional(UpdatedMcpDescriptor),
    a2a: S.optional(UpdatedA2aDescriptor),
    custom: S.optional(UpdatedCustomDescriptor),
    agentSkills: S.optional(UpdatedAgentSkillsDescriptor),
  }),
).annotate({
  identifier: "UpdatedDescriptorsUnion",
}) as any as S.Schema<UpdatedDescriptorsUnion>;
export interface UpdatedDescriptors {
  optionalValue?: UpdatedDescriptorsUnion;
}
export const UpdatedDescriptors = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(UpdatedDescriptorsUnion) }),
).annotate({
  identifier: "UpdatedDescriptors",
}) as any as S.Schema<UpdatedDescriptors>;
export interface UpdatedSynchronizationType {
  optionalValue?: SynchronizationType;
}
export const UpdatedSynchronizationType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(SynchronizationType) }),
).annotate({
  identifier: "UpdatedSynchronizationType",
}) as any as S.Schema<UpdatedSynchronizationType>;
export interface UpdatedSynchronizationConfiguration {
  optionalValue?: SynchronizationConfiguration;
}
export const UpdatedSynchronizationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionalValue: S.optional(SynchronizationConfiguration) }),
).annotate({
  identifier: "UpdatedSynchronizationConfiguration",
}) as any as S.Schema<UpdatedSynchronizationConfiguration>;
export interface UpdateRegistryRecordRequest {
  registryId: string;
  recordId: string;
  name?: string;
  description?: UpdatedDescription;
  descriptorType?: DescriptorType;
  descriptors?: UpdatedDescriptors;
  recordVersion?: string;
  synchronizationType?: UpdatedSynchronizationType;
  synchronizationConfiguration?: UpdatedSynchronizationConfiguration;
  triggerSynchronization?: boolean;
}
export const UpdateRegistryRecordRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.String.pipe(T.HttpLabel("registryId")),
    recordId: S.String.pipe(T.HttpLabel("recordId")),
    name: S.optional(S.String),
    description: S.optional(UpdatedDescription),
    descriptorType: S.optional(DescriptorType),
    descriptors: S.optional(UpdatedDescriptors),
    recordVersion: S.optional(S.String),
    synchronizationType: S.optional(UpdatedSynchronizationType),
    synchronizationConfiguration: S.optional(
      UpdatedSynchronizationConfiguration,
    ),
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
  description?: string | redacted.Redacted<string>;
  descriptorType: DescriptorType;
  descriptors: Descriptors;
  recordVersion?: string;
  status: RegistryRecordStatus;
  createdAt: Date;
  updatedAt: Date;
  statusReason?: string;
  synchronizationType?: SynchronizationType;
  synchronizationConfiguration?: SynchronizationConfiguration;
}
export const UpdateRegistryRecordResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryArn: S.String,
    recordArn: S.String,
    recordId: S.String,
    name: S.String,
    description: S.optional(SensitiveString),
    descriptorType: DescriptorType,
    descriptors: Descriptors,
    recordVersion: S.optional(S.String),
    status: RegistryRecordStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    statusReason: S.optional(S.String),
    synchronizationType: S.optional(SynchronizationType),
    synchronizationConfiguration: S.optional(SynchronizationConfiguration),
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
export interface UpdateWorkloadIdentityRequest {
  name: string;
  allowedResourceOauth2ReturnUrls?: string[];
}
export const UpdateWorkloadIdentityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    allowedResourceOauth2ReturnUrls: S.optional(
      ResourceOauth2ReturnUrlListType,
    ),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/identities/UpdateWorkloadIdentity" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateWorkloadIdentityRequest",
}) as any as S.Schema<UpdateWorkloadIdentityRequest>;
export interface UpdateWorkloadIdentityResponse {
  name: string;
  workloadIdentityArn: string;
  allowedResourceOauth2ReturnUrls?: string[];
  createdTime: Date;
  lastUpdatedTime: Date;
}
export const UpdateWorkloadIdentityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    workloadIdentityArn: S.String,
    allowedResourceOauth2ReturnUrls: S.optional(
      ResourceOauth2ReturnUrlListType,
    ),
    createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "UpdateWorkloadIdentityResponse",
}) as any as S.Schema<UpdateWorkloadIdentityResponse>;
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
export type AddDatasetExamplesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds examples to the dataset's DRAFT. All examples are validated against the dataset's schema type before any writes occur. If any example fails validation, the entire batch is rejected (all-or-nothing semantics).
 */
export const addDatasetExamples: API.OperationMethod<
  AddDatasetExamplesRequest,
  AddDatasetExamplesResponse,
  AddDatasetExamplesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddDatasetExamplesRequest,
  output: AddDatasetExamplesResponse,
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
  operationName: "AddDatasetExamples",
}));

export type BatchPutGatewayRateLimitsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Atomically creates or updates multiple rate limits for a gateway. The operation updates existing limits with matching keys and creates new limits for new keys. If the operation fails, the service applies no changes. Retry the request after resolving the issue.
 */
export const batchPutGatewayRateLimits: API.OperationMethod<
  BatchPutGatewayRateLimitsRequest,
  BatchPutGatewayRateLimitsResponse,
  BatchPutGatewayRateLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchPutGatewayRateLimitsRequest,
  output: BatchPutGatewayRateLimitsResponse,
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
  operationName: "BatchPutGatewayRateLimits",
}));

export type CreateAgentRuntimeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Bedrock AgentCore Runtime.
 */
export const createAgentRuntime: API.OperationMethod<
  CreateAgentRuntimeRequest,
  CreateAgentRuntimeResponse,
  CreateAgentRuntimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAgentRuntimeRequest,
  output: CreateAgentRuntimeResponse,
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
  operationName: "CreateAgentRuntime",
}));

export type CreateAgentRuntimeEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an AgentCore Runtime endpoint.
 */
export const createAgentRuntimeEndpoint: API.OperationMethod<
  CreateAgentRuntimeEndpointRequest,
  CreateAgentRuntimeEndpointResponse,
  CreateAgentRuntimeEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAgentRuntimeEndpointRequest,
  output: CreateAgentRuntimeEndpointResponse,
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
  operationName: "CreateAgentRuntimeEndpoint",
}));

export type CreateApiKeyCredentialProviderError =
  | AccessDeniedException
  | ConflictException
  | DecryptionFailure
  | EncryptionFailure
  | InternalServerException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new API key credential provider.
 */
export const createApiKeyCredentialProvider: API.OperationMethod<
  CreateApiKeyCredentialProviderRequest,
  CreateApiKeyCredentialProviderResponse,
  CreateApiKeyCredentialProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateApiKeyCredentialProviderRequest,
  output: CreateApiKeyCredentialProviderResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    DecryptionFailure,
    EncryptionFailure,
    InternalServerException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApiKeyCredentialProvider",
}));

export type CreateBrowserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a custom browser.
 */
export const createBrowser: API.OperationMethod<
  CreateBrowserRequest,
  CreateBrowserResponse,
  CreateBrowserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBrowserRequest,
  output: CreateBrowserResponse,
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
  operationName: "CreateBrowser",
}));

export type CreateBrowserProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a browser profile in Amazon Bedrock AgentCore. A browser profile stores persistent browser data such as cookies, local storage, session storage, and browsing history that can be saved from browser sessions and reused in subsequent sessions.
 */
export const createBrowserProfile: API.OperationMethod<
  CreateBrowserProfileRequest,
  CreateBrowserProfileResponse,
  CreateBrowserProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBrowserProfileRequest,
  output: CreateBrowserProfileResponse,
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
  operationName: "CreateBrowserProfile",
}));

export type CreateCapacityProviderError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | RetryableConflictException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a capacity provider. A capacity provider defines the Amazon EC2 infrastructure for AgentCore Runtime, including the operating system, allowed instance types, networking, and storage. It also specifies the IAM permissions that AgentCore uses to manage those instances.
 *
 * The capacity provider name must be unique within your account. After you create the capacity provider, it enters a `CREATING` state and transitions to `READY` when it is available for use.
 */
export const createCapacityProvider: API.OperationMethod<
  CreateCapacityProviderInput,
  CreateCapacityProviderOutput,
  CreateCapacityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCapacityProviderInput,
  output: CreateCapacityProviderOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    RetryableConflictException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCapacityProvider",
}));

export type CreateCodeInterpreterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a custom code interpreter.
 */
export const createCodeInterpreter: API.OperationMethod<
  CreateCodeInterpreterRequest,
  CreateCodeInterpreterResponse,
  CreateCodeInterpreterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCodeInterpreterRequest,
  output: CreateCodeInterpreterResponse,
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
  operationName: "CreateCodeInterpreter",
}));

export type CreateConfigurationBundleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new configuration bundle resource. A configuration bundle stores versioned component configurations for agent evaluation workflows.
 */
export const createConfigurationBundle: API.OperationMethod<
  CreateConfigurationBundleRequest,
  CreateConfigurationBundleResponse,
  CreateConfigurationBundleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConfigurationBundleRequest,
  output: CreateConfigurationBundleResponse,
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
  operationName: "CreateConfigurationBundle",
}));

export type CreateDatasetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new dataset resource asynchronously. Returns immediately with status CREATING. Poll `GetDataset` until status transitions to ACTIVE or CREATE_FAILED.
 */
export const createDataset: API.OperationMethod<
  CreateDatasetRequest,
  CreateDatasetResponse,
  CreateDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDatasetRequest,
  output: CreateDatasetResponse,
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
  operationName: "CreateDataset",
}));

export type CreateDatasetVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Publishes the current DRAFT as a new numbered version. The DRAFT is preserved and remains editable after publishing. Returns immediately with status UPDATING. Poll `GetDataset` until status transitions to ACTIVE or UPDATE_FAILED.
 */
export const createDatasetVersion: API.OperationMethod<
  CreateDatasetVersionRequest,
  CreateDatasetVersionResponse,
  CreateDatasetVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDatasetVersionRequest,
  output: CreateDatasetVersionResponse,
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
  operationName: "CreateDatasetVersion",
}));

export type CreateEvaluatorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a custom evaluator for agent quality assessment. Custom evaluators can use either LLM-as-a-Judge configurations with user-defined prompts, rating scales, and model settings, or code-based configurations with customer-managed Lambda functions to evaluate agent performance at tool call, trace, or session levels.
 */
export const createEvaluator: API.OperationMethod<
  CreateEvaluatorRequest,
  CreateEvaluatorResponse,
  CreateEvaluatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEvaluatorRequest,
  output: CreateEvaluatorResponse,
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
  operationName: "CreateEvaluator",
}));

export type CreateGatewayError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a gateway for Amazon Bedrock Agent. A gateway serves as an integration point between your agent and external services.
 *
 * If you specify `CUSTOM_JWT` as the `authorizerType`, you must provide an `authorizerConfiguration`.
 */
export const createGateway: API.OperationMethod<
  CreateGatewayRequest,
  CreateGatewayResponse,
  CreateGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGatewayRequest,
  output: CreateGatewayResponse,
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
  operationName: "CreateGateway",
}));

export type CreateGatewayRateLimitError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a rate limit for a gateway. Rate limits define throttling rules for each dimension that control request rates, token consumption rates, and concurrent connections through the gateway.
 */
export const createGatewayRateLimit: API.OperationMethod<
  CreateGatewayRateLimitRequest,
  CreateGatewayRateLimitResponse,
  CreateGatewayRateLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGatewayRateLimitRequest,
  output: CreateGatewayRateLimitResponse,
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
  operationName: "CreateGatewayRateLimit",
}));

export type CreateGatewayRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a rule for a gateway. Rules define conditions and actions that control how requests are routed and processed through the gateway, including principal-based access control and path-based routing.
 */
export const createGatewayRule: API.OperationMethod<
  CreateGatewayRuleRequest,
  CreateGatewayRuleResponse,
  CreateGatewayRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGatewayRuleRequest,
  output: CreateGatewayRuleResponse,
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
  operationName: "CreateGatewayRule",
}));

export type CreateGatewayTargetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a target for a gateway. A target defines an endpoint that the gateway can connect to.
 */
export const createGatewayTarget: API.OperationMethod<
  CreateGatewayTargetRequest,
  CreateGatewayTargetResponse,
  CreateGatewayTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGatewayTargetRequest,
  output: CreateGatewayTargetResponse,
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
  operationName: "CreateGatewayTarget",
}));

export type CreateHarnessError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Operation to create a harness.
 */
export const createHarness: API.OperationMethod<
  CreateHarnessRequest,
  CreateHarnessResponse,
  CreateHarnessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateHarnessRequest,
  output: CreateHarnessResponse,
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
  operationName: "CreateHarness",
}));

export type CreateHarnessEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Operation to create a harness endpoint.
 */
export const createHarnessEndpoint: API.OperationMethod<
  CreateHarnessEndpointRequest,
  CreateHarnessEndpointResponse,
  CreateHarnessEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateHarnessEndpointRequest,
  output: CreateHarnessEndpointResponse,
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
  operationName: "CreateHarnessEndpoint",
}));

export type CreateMemoryError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Amazon Bedrock AgentCore Memory resource.
 */
export const createMemory: API.OperationMethod<
  CreateMemoryInput,
  CreateMemoryOutput,
  CreateMemoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMemoryInput,
  output: CreateMemoryOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMemory",
}));

export type CreateOauth2CredentialProviderError =
  | AccessDeniedException
  | ConflictException
  | DecryptionFailure
  | EncryptionFailure
  | InternalServerException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new OAuth2 credential provider.
 */
export const createOauth2CredentialProvider: API.OperationMethod<
  CreateOauth2CredentialProviderRequest,
  CreateOauth2CredentialProviderResponse,
  CreateOauth2CredentialProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateOauth2CredentialProviderRequest,
  output: CreateOauth2CredentialProviderResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    DecryptionFailure,
    EncryptionFailure,
    InternalServerException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOauth2CredentialProvider",
}));

export type CreateOnlineEvaluationConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an online evaluation configuration for continuous monitoring of agent performance. Online evaluation automatically samples live traffic from CloudWatch logs at specified rates and applies evaluators to assess agent quality in production.
 */
export const createOnlineEvaluationConfig: API.OperationMethod<
  CreateOnlineEvaluationConfigRequest,
  CreateOnlineEvaluationConfigResponse,
  CreateOnlineEvaluationConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateOnlineEvaluationConfigRequest,
  output: CreateOnlineEvaluationConfigResponse,
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
  operationName: "CreateOnlineEvaluationConfig",
}));

export type CreatePaymentConnectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | SubscriptionRequiredException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new payment connector for a payment manager. A payment connector integrates with a supported payment provider to enable payment processing capabilities.
 */
export const createPaymentConnector: API.OperationMethod<
  CreatePaymentConnectorRequest,
  CreatePaymentConnectorResponse,
  CreatePaymentConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePaymentConnectorRequest,
  output: CreatePaymentConnectorResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    SubscriptionRequiredException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePaymentConnector",
}));

export type CreatePaymentCredentialProviderError =
  | AccessDeniedException
  | ConflictException
  | DecryptionFailure
  | EncryptionFailure
  | InternalServerException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new payment credential provider for storing authentication credentials used by payment connectors to communicate with external payment providers.
 */
export const createPaymentCredentialProvider: API.OperationMethod<
  CreatePaymentCredentialProviderRequest,
  CreatePaymentCredentialProviderResponse,
  CreatePaymentCredentialProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePaymentCredentialProviderRequest,
  output: CreatePaymentCredentialProviderResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    DecryptionFailure,
    EncryptionFailure,
    InternalServerException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePaymentCredentialProvider",
}));

export type CreatePaymentManagerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new payment manager in your Amazon Web Services account. A payment manager serves as the top-level resource for managing payment processing capabilities, including payment connectors that integrate with supported payment providers.
 *
 * If you specify `CUSTOM_JWT` as the `authorizerType`, you must provide an `authorizerConfiguration`.
 */
export const createPaymentManager: API.OperationMethod<
  CreatePaymentManagerRequest,
  CreatePaymentManagerResponse,
  CreatePaymentManagerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePaymentManagerRequest,
  output: CreatePaymentManagerResponse,
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
  operationName: "CreatePaymentManager",
}));

export type CreatePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a policy within the AgentCore Policy system. Policies provide real-time, deterministic control over agentic interactions with AgentCore Gateway. Using the Cedar policy language, you can define fine-grained policies that specify which interactions with Gateway tools are permitted based on input parameters and OAuth claims, ensuring agents operate within defined boundaries and business rules. The policy is validated during creation against the Cedar schema generated from the Gateway's tools' input schemas, which defines the available tools, their parameters, and expected data types. This is an asynchronous operation. Use the GetPolicy operation to poll the `status` field to track completion.
 *
 * If the new policy is a temporal policy, creating it invalidates the policy engine's active temporal sessions. For more information about temporal policy sessions, see session-based temporal policies. The policy engine returns an HTTP 409 `ConflictException` to in-flight sessions. To resume, you must start a new session with a new session ID.
 */
export const createPolicy: API.OperationMethod<
  CreatePolicyRequest,
  CreatePolicyResponse,
  CreatePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePolicyRequest,
  output: CreatePolicyResponse,
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
  operationName: "CreatePolicy",
}));

export type CreatePolicyEngineError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new policy engine within the AgentCore Policy system. A policy engine is a collection of policies that evaluates and authorizes agent tool calls. When associated with Gateways (each Gateway can be associated with at most one policy engine, but multiple Gateways can be associated with the same engine), the policy engine intercepts all agent requests and determines whether to allow or deny each action based on the defined policies. This is an asynchronous operation. Use the GetPolicyEngine operation to poll the `status` field to track completion.
 */
export const createPolicyEngine: API.OperationMethod<
  CreatePolicyEngineRequest,
  CreatePolicyEngineResponse,
  CreatePolicyEngineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePolicyEngineRequest,
  output: CreatePolicyEngineResponse,
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
  operationName: "CreatePolicyEngine",
}));

export type CreateRegistryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new registry in your Amazon Web Services account. A registry serves as a centralized catalog for organizing and managing registry records, including MCP servers, A2A agents, agent skills, and custom resource types.
 *
 * If you specify `CUSTOM_JWT` as the `authorizerType`, you must provide an `authorizerConfiguration`.
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
 * Creates a new registry record within the specified registry. A registry record represents an individual AI resource's metadata in the registry. This could be an MCP server (and associated tools), A2A agent, agent skill, or a custom resource with a custom schema.
 *
 * The record is processed asynchronously and returns HTTP 202 Accepted.
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

export type CreateWorkloadIdentityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new workload identity.
 */
export const createWorkloadIdentity: API.OperationMethod<
  CreateWorkloadIdentityRequest,
  CreateWorkloadIdentityResponse,
  CreateWorkloadIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWorkloadIdentityRequest,
  output: CreateWorkloadIdentityResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkloadIdentity",
}));

export type DeleteAgentRuntimeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an Amazon Bedrock AgentCore Runtime, or a single version of an AgentCore Runtime when you provide the version qualifier.
 */
export const deleteAgentRuntime: API.OperationMethod<
  DeleteAgentRuntimeRequest,
  DeleteAgentRuntimeResponse,
  DeleteAgentRuntimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAgentRuntimeRequest,
  output: DeleteAgentRuntimeResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAgentRuntime",
}));

export type DeleteAgentRuntimeEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an AgentCore Runtime endpoint.
 */
export const deleteAgentRuntimeEndpoint: API.OperationMethod<
  DeleteAgentRuntimeEndpointRequest,
  DeleteAgentRuntimeEndpointResponse,
  DeleteAgentRuntimeEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAgentRuntimeEndpointRequest,
  output: DeleteAgentRuntimeEndpointResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAgentRuntimeEndpoint",
}));

export type DeleteApiKeyCredentialProviderError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an API key credential provider.
 */
export const deleteApiKeyCredentialProvider: API.OperationMethod<
  DeleteApiKeyCredentialProviderRequest,
  DeleteApiKeyCredentialProviderResponse,
  DeleteApiKeyCredentialProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApiKeyCredentialProviderRequest,
  output: DeleteApiKeyCredentialProviderResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApiKeyCredentialProvider",
}));

export type DeleteBrowserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a custom browser.
 */
export const deleteBrowser: API.OperationMethod<
  DeleteBrowserRequest,
  DeleteBrowserResponse,
  DeleteBrowserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBrowserRequest,
  output: DeleteBrowserResponse,
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
  operationName: "DeleteBrowser",
}));

export type DeleteBrowserProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a browser profile.
 */
export const deleteBrowserProfile: API.OperationMethod<
  DeleteBrowserProfileRequest,
  DeleteBrowserProfileResponse,
  DeleteBrowserProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBrowserProfileRequest,
  output: DeleteBrowserProfileResponse,
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
  operationName: "DeleteBrowserProfile",
}));

export type DeleteCapacityProviderError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | RetryableConflictException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a capacity provider. Before you delete a capacity provider, disassociate all agent runtimes and runtime versions that reference it. If any references remain, the operation fails.
 */
export const deleteCapacityProvider: API.OperationMethod<
  DeleteCapacityProviderInput,
  DeleteCapacityProviderOutput,
  DeleteCapacityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCapacityProviderInput,
  output: DeleteCapacityProviderOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    RetryableConflictException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCapacityProvider",
}));

export type DeleteCodeInterpreterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a custom code interpreter.
 */
export const deleteCodeInterpreter: API.OperationMethod<
  DeleteCodeInterpreterRequest,
  DeleteCodeInterpreterResponse,
  DeleteCodeInterpreterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCodeInterpreterRequest,
  output: DeleteCodeInterpreterResponse,
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
  operationName: "DeleteCodeInterpreter",
}));

export type DeleteConfigurationBundleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a configuration bundle and all of its versions.
 */
export const deleteConfigurationBundle: API.OperationMethod<
  DeleteConfigurationBundleRequest,
  DeleteConfigurationBundleResponse,
  DeleteConfigurationBundleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfigurationBundleRequest,
  output: DeleteConfigurationBundleResponse,
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
  operationName: "DeleteConfigurationBundle",
}));

export type DeleteDatasetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a dataset version or an entire dataset asynchronously. If `datasetVersion` is absent, deletes all versions and the dataset record itself. If provided, deletes only that specific version.
 */
export const deleteDataset: API.OperationMethod<
  DeleteDatasetRequest,
  DeleteDatasetResponse,
  DeleteDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDatasetRequest,
  output: DeleteDatasetResponse,
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
  operationName: "DeleteDataset",
}));

export type DeleteDatasetExamplesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes specific examples by ID from DRAFT. All example IDs are validated before any deletes occur. If any ID does not exist in DRAFT, the entire batch is rejected (all-or-nothing semantics).
 */
export const deleteDatasetExamples: API.OperationMethod<
  DeleteDatasetExamplesRequest,
  DeleteDatasetExamplesResponse,
  DeleteDatasetExamplesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDatasetExamplesRequest,
  output: DeleteDatasetExamplesResponse,
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
  operationName: "DeleteDatasetExamples",
}));

export type DeleteEvaluatorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a custom evaluator. Builtin evaluators cannot be deleted. The evaluator must not be referenced by any active online evaluation configurations.
 */
export const deleteEvaluator: API.OperationMethod<
  DeleteEvaluatorRequest,
  DeleteEvaluatorResponse,
  DeleteEvaluatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEvaluatorRequest,
  output: DeleteEvaluatorResponse,
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
  operationName: "DeleteEvaluator",
}));

export type DeleteGatewayError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a gateway.
 */
export const deleteGateway: API.OperationMethod<
  DeleteGatewayRequest,
  DeleteGatewayResponse,
  DeleteGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGatewayRequest,
  output: DeleteGatewayResponse,
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
  operationName: "DeleteGateway",
}));

export type DeleteGatewayRateLimitError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a gateway rate limit.
 */
export const deleteGatewayRateLimit: API.OperationMethod<
  DeleteGatewayRateLimitRequest,
  DeleteGatewayRateLimitResponse,
  DeleteGatewayRateLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGatewayRateLimitRequest,
  output: DeleteGatewayRateLimitResponse,
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
  operationName: "DeleteGatewayRateLimit",
}));

export type DeleteGatewayRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a gateway rule.
 */
export const deleteGatewayRule: API.OperationMethod<
  DeleteGatewayRuleRequest,
  DeleteGatewayRuleResponse,
  DeleteGatewayRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGatewayRuleRequest,
  output: DeleteGatewayRuleResponse,
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
  operationName: "DeleteGatewayRule",
}));

export type DeleteGatewayTargetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a gateway target.
 *
 * You cannot delete a target that is in a pending authorization state (`CREATE_PENDING_AUTH`, `UPDATE_PENDING_AUTH`, or `SYNCHRONIZE_PENDING_AUTH`). Wait for the authorization to complete or fail before deleting the target.
 */
export const deleteGatewayTarget: API.OperationMethod<
  DeleteGatewayTargetRequest,
  DeleteGatewayTargetResponse,
  DeleteGatewayTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGatewayTargetRequest,
  output: DeleteGatewayTargetResponse,
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
  operationName: "DeleteGatewayTarget",
}));

export type DeleteHarnessError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Operation to delete a Harness.
 */
export const deleteHarness: API.OperationMethod<
  DeleteHarnessRequest,
  DeleteHarnessResponse,
  DeleteHarnessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteHarnessRequest,
  output: DeleteHarnessResponse,
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
  operationName: "DeleteHarness",
}));

export type DeleteHarnessEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Operation to delete a harness endpoint.
 */
export const deleteHarnessEndpoint: API.OperationMethod<
  DeleteHarnessEndpointRequest,
  DeleteHarnessEndpointResponse,
  DeleteHarnessEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteHarnessEndpointRequest,
  output: DeleteHarnessEndpointResponse,
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
  operationName: "DeleteHarnessEndpoint",
}));

export type DeleteMemoryError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Bedrock AgentCore Memory resource. When you delete a memory resource, it is permanently removed.
 */
export const deleteMemory: API.OperationMethod<
  DeleteMemoryInput,
  DeleteMemoryOutput,
  DeleteMemoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMemoryInput,
  output: DeleteMemoryOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMemory",
}));

export type DeleteOauth2CredentialProviderError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an OAuth2 credential provider.
 */
export const deleteOauth2CredentialProvider: API.OperationMethod<
  DeleteOauth2CredentialProviderRequest,
  DeleteOauth2CredentialProviderResponse,
  DeleteOauth2CredentialProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteOauth2CredentialProviderRequest,
  output: DeleteOauth2CredentialProviderResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOauth2CredentialProvider",
}));

export type DeleteOnlineEvaluationConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an online evaluation configuration and stops any ongoing evaluation processes associated with it.
 */
export const deleteOnlineEvaluationConfig: API.OperationMethod<
  DeleteOnlineEvaluationConfigRequest,
  DeleteOnlineEvaluationConfigResponse,
  DeleteOnlineEvaluationConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteOnlineEvaluationConfigRequest,
  output: DeleteOnlineEvaluationConfigResponse,
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
  operationName: "DeleteOnlineEvaluationConfig",
}));

export type DeletePaymentConnectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a payment connector.
 */
export const deletePaymentConnector: API.OperationMethod<
  DeletePaymentConnectorRequest,
  DeletePaymentConnectorResponse,
  DeletePaymentConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePaymentConnectorRequest,
  output: DeletePaymentConnectorResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePaymentConnector",
}));

export type DeletePaymentCredentialProviderError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a payment credential provider and its associated stored credentials.
 */
export const deletePaymentCredentialProvider: API.OperationMethod<
  DeletePaymentCredentialProviderRequest,
  DeletePaymentCredentialProviderResponse,
  DeletePaymentCredentialProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePaymentCredentialProviderRequest,
  output: DeletePaymentCredentialProviderResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePaymentCredentialProvider",
}));

export type DeletePaymentManagerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a payment manager. All payment connectors associated with the payment manager must be deleted before the payment manager can be deleted. This operation initiates the deletion process asynchronously.
 */
export const deletePaymentManager: API.OperationMethod<
  DeletePaymentManagerRequest,
  DeletePaymentManagerResponse,
  DeletePaymentManagerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePaymentManagerRequest,
  output: DeletePaymentManagerResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePaymentManager",
}));

export type DeletePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing policy from the AgentCore Policy system. Once deleted, the policy can no longer be used for agent behavior control and all references to it become invalid. This is an asynchronous operation. Use the `GetPolicy` operation to poll the `status` field to track completion.
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
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicy",
}));

export type DeletePolicyEngineError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing policy engine from the AgentCore Policy system. The policy engine must not have any associated policies before deletion. Once deleted, the policy engine and all its configurations become unavailable for policy management and evaluation. This is an asynchronous operation. Use the `GetPolicyEngine` operation to poll the `status` field to track completion.
 */
export const deletePolicyEngine: API.OperationMethod<
  DeletePolicyEngineRequest,
  DeletePolicyEngineResponse,
  DeletePolicyEngineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePolicyEngineRequest,
  output: DeletePolicyEngineResponse,
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
  operationName: "DeletePolicyEngine",
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
 * Deletes a registry. The registry must contain zero records before it can be deleted. This operation initiates the deletion process asynchronously.
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
 * Deletes a registry record. The record's status transitions to `DELETING` and the record is removed asynchronously.
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

export type DeleteResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the resource-based policy for a specified resource.
 *
 * This feature is currently available only for AgentCore Runtime and Gateway.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type DeleteWorkloadIdentityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a workload identity.
 */
export const deleteWorkloadIdentity: API.OperationMethod<
  DeleteWorkloadIdentityRequest,
  DeleteWorkloadIdentityResponse,
  DeleteWorkloadIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWorkloadIdentityRequest,
  output: DeleteWorkloadIdentityResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkloadIdentity",
}));

export type GetAgentRuntimeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an Amazon Bedrock AgentCore Runtime.
 */
export const getAgentRuntime: API.OperationMethod<
  GetAgentRuntimeRequest,
  GetAgentRuntimeResponse,
  GetAgentRuntimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAgentRuntimeRequest,
  output: GetAgentRuntimeResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgentRuntime",
}));

export type GetAgentRuntimeEndpointError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an Amazon Secure AgentEndpoint.
 */
export const getAgentRuntimeEndpoint: API.OperationMethod<
  GetAgentRuntimeEndpointRequest,
  GetAgentRuntimeEndpointResponse,
  GetAgentRuntimeEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAgentRuntimeEndpointRequest,
  output: GetAgentRuntimeEndpointResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgentRuntimeEndpoint",
}));

export type GetApiKeyCredentialProviderError =
  | AccessDeniedException
  | DecryptionFailure
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an API key credential provider.
 */
export const getApiKeyCredentialProvider: API.OperationMethod<
  GetApiKeyCredentialProviderRequest,
  GetApiKeyCredentialProviderResponse,
  GetApiKeyCredentialProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApiKeyCredentialProviderRequest,
  output: GetApiKeyCredentialProviderResponse,
  errors: [
    AccessDeniedException,
    DecryptionFailure,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApiKeyCredentialProvider",
}));

export type GetBrowserError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about a custom browser.
 */
export const getBrowser: API.OperationMethod<
  GetBrowserRequest,
  GetBrowserResponse,
  GetBrowserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBrowserRequest,
  output: GetBrowserResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBrowser",
}));

export type GetBrowserProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a browser profile.
 */
export const getBrowserProfile: API.OperationMethod<
  GetBrowserProfileRequest,
  GetBrowserProfileResponse,
  GetBrowserProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBrowserProfileRequest,
  output: GetBrowserProfileResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBrowserProfile",
}));

export type GetCapacityProviderError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a capacity provider, including its status, permissions configuration, and compute configuration.
 */
export const getCapacityProvider: API.OperationMethod<
  GetCapacityProviderInput,
  GetCapacityProviderOutput,
  GetCapacityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCapacityProviderInput,
  output: GetCapacityProviderOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCapacityProvider",
}));

export type GetCodeInterpreterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about a custom code interpreter.
 */
export const getCodeInterpreter: API.OperationMethod<
  GetCodeInterpreterRequest,
  GetCodeInterpreterResponse,
  GetCodeInterpreterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCodeInterpreterRequest,
  output: GetCodeInterpreterResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCodeInterpreter",
}));

export type GetConfigurationBundleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the latest version of a configuration bundle. By default, returns the latest version on the mainline branch. Use `GetConfigurationBundleVersion` to retrieve a specific historical version.
 */
export const getConfigurationBundle: API.OperationMethod<
  GetConfigurationBundleRequest,
  GetConfigurationBundleResponse,
  GetConfigurationBundleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConfigurationBundleRequest,
  output: GetConfigurationBundleResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfigurationBundle",
}));

export type GetConfigurationBundleVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a specific version of a configuration bundle by its version identifier.
 */
export const getConfigurationBundleVersion: API.OperationMethod<
  GetConfigurationBundleVersionRequest,
  GetConfigurationBundleVersionResponse,
  GetConfigurationBundleVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConfigurationBundleVersionRequest,
  output: GetConfigurationBundleVersionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfigurationBundleVersion",
}));

export type GetDatasetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves dataset metadata. Use the `datasetVersion` query parameter to retrieve a specific version's metadata. If absent, defaults to DRAFT. For paginated example content, use `ListDatasetExamples`.
 */
export const getDataset: API.OperationMethod<
  GetDatasetRequest,
  GetDatasetResponse,
  GetDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDatasetRequest,
  output: GetDatasetResponse,
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
  operationName: "GetDataset",
}));

export type GetEvaluatorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about an evaluator, including its configuration, status, and metadata. Works with both built-in and custom evaluators.
 */
export const getEvaluator: API.OperationMethod<
  GetEvaluatorRequest,
  GetEvaluatorResponse,
  GetEvaluatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEvaluatorRequest,
  output: GetEvaluatorResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEvaluator",
}));

export type GetGatewayError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specific Gateway.
 */
export const getGateway: API.OperationMethod<
  GetGatewayRequest,
  GetGatewayResponse,
  GetGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGatewayRequest,
  output: GetGatewayResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGateway",
}));

export type GetGatewayRateLimitError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a gateway rate limit.
 */
export const getGatewayRateLimit: API.OperationMethod<
  GetGatewayRateLimitRequest,
  GetGatewayRateLimitResponse,
  GetGatewayRateLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGatewayRateLimitRequest,
  output: GetGatewayRateLimitResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGatewayRateLimit",
}));

export type GetGatewayRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific gateway rule.
 */
export const getGatewayRule: API.OperationMethod<
  GetGatewayRuleRequest,
  GetGatewayRuleResponse,
  GetGatewayRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGatewayRuleRequest,
  output: GetGatewayRuleResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGatewayRule",
}));

export type GetGatewayTargetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specific gateway target.
 */
export const getGatewayTarget: API.OperationMethod<
  GetGatewayTargetRequest,
  GetGatewayTargetResponse,
  GetGatewayTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGatewayTargetRequest,
  output: GetGatewayTargetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGatewayTarget",
}));

export type GetHarnessError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Operation to get a single harness.
 */
export const getHarness: API.OperationMethod<
  GetHarnessRequest,
  GetHarnessResponse,
  GetHarnessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetHarnessRequest,
  output: GetHarnessResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHarness",
}));

export type GetHarnessEndpointError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Operation to get a single harness endpoint.
 */
export const getHarnessEndpoint: API.OperationMethod<
  GetHarnessEndpointRequest,
  GetHarnessEndpointResponse,
  GetHarnessEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetHarnessEndpointRequest,
  output: GetHarnessEndpointResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHarnessEndpoint",
}));

export type GetMemoryError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ServiceException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Retrieve an existing Amazon Bedrock AgentCore Memory resource.
 */
export const getMemory: API.OperationMethod<
  GetMemoryInput,
  GetMemoryOutput,
  GetMemoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMemoryInput,
  output: GetMemoryOutput,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ServiceException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMemory",
}));

export type GetOauth2CredentialProviderError =
  | AccessDeniedException
  | DecryptionFailure
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an OAuth2 credential provider.
 */
export const getOauth2CredentialProvider: API.OperationMethod<
  GetOauth2CredentialProviderRequest,
  GetOauth2CredentialProviderResponse,
  GetOauth2CredentialProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOauth2CredentialProviderRequest,
  output: GetOauth2CredentialProviderResponse,
  errors: [
    AccessDeniedException,
    DecryptionFailure,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOauth2CredentialProvider",
}));

export type GetOnlineEvaluationConfigError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about an online evaluation configuration, including its rules, data sources, evaluators, and execution status.
 */
export const getOnlineEvaluationConfig: API.OperationMethod<
  GetOnlineEvaluationConfigRequest,
  GetOnlineEvaluationConfigResponse,
  GetOnlineEvaluationConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOnlineEvaluationConfigRequest,
  output: GetOnlineEvaluationConfigResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOnlineEvaluationConfig",
}));

export type GetPaymentConnectorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specific payment connector.
 */
export const getPaymentConnector: API.OperationMethod<
  GetPaymentConnectorRequest,
  GetPaymentConnectorResponse,
  GetPaymentConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPaymentConnectorRequest,
  output: GetPaymentConnectorResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPaymentConnector",
}));

export type GetPaymentCredentialProviderError =
  | AccessDeniedException
  | DecryptionFailure
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specific payment credential provider.
 */
export const getPaymentCredentialProvider: API.OperationMethod<
  GetPaymentCredentialProviderRequest,
  GetPaymentCredentialProviderResponse,
  GetPaymentCredentialProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPaymentCredentialProviderRequest,
  output: GetPaymentCredentialProviderResponse,
  errors: [
    AccessDeniedException,
    DecryptionFailure,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPaymentCredentialProvider",
}));

export type GetPaymentManagerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specific payment manager.
 */
export const getPaymentManager: API.OperationMethod<
  GetPaymentManagerRequest,
  GetPaymentManagerResponse,
  GetPaymentManagerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPaymentManagerRequest,
  output: GetPaymentManagerResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPaymentManager",
}));

export type GetPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific policy within the AgentCore Policy system. This operation returns the complete policy definition, metadata, and current status, allowing administrators to review and manage policy configurations.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicy",
}));

export type GetPolicyEngineError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific policy engine within the AgentCore Policy system. This operation returns the complete policy engine configuration, metadata, and current status, allowing administrators to review and manage policy engine settings.
 */
export const getPolicyEngine: API.OperationMethod<
  GetPolicyEngineRequest,
  GetPolicyEngineResponse,
  GetPolicyEngineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPolicyEngineRequest,
  output: GetPolicyEngineResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicyEngine",
}));

export type GetPolicyEngineSummaryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a metadata-only summary of a specific policy engine without decrypting customer content. This lightweight read operation returns resource identifiers, status, timestamps, and the encryption key ARN, but does not include the description or status reasons. Because this operation does not require access to the customer's KMS key, it is suitable for resource discovery, inventory, and integration scenarios where only metadata is needed.
 */
export const getPolicyEngineSummary: API.OperationMethod<
  GetPolicyEngineSummaryRequest,
  GetPolicyEngineSummaryResponse,
  GetPolicyEngineSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPolicyEngineSummaryRequest,
  output: GetPolicyEngineSummaryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicyEngineSummary",
}));

export type GetPolicyGenerationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a policy generation request within the AgentCore Policy system. Policy generation converts natural language descriptions into Cedar policy statements using AI-powered translation, enabling non-technical users to create policies.
 */
export const getPolicyGeneration: API.OperationMethod<
  GetPolicyGenerationRequest,
  GetPolicyGenerationResponse,
  GetPolicyGenerationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPolicyGenerationRequest,
  output: GetPolicyGenerationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicyGeneration",
}));

export type GetPolicyGenerationSummaryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a metadata-only summary of a specific policy generation request without decrypting customer content. This lightweight read operation returns resource identifiers, status, timestamps, and findings, but does not include status reasons. Because this operation does not require access to the customer's KMS key, it is suitable for resource discovery, inventory, and integration scenarios where only metadata is needed.
 */
export const getPolicyGenerationSummary: API.OperationMethod<
  GetPolicyGenerationSummaryRequest,
  GetPolicyGenerationSummaryResponse,
  GetPolicyGenerationSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPolicyGenerationSummaryRequest,
  output: GetPolicyGenerationSummaryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicyGenerationSummary",
}));

export type GetPolicySummaryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a metadata-only summary of a specific policy without decrypting customer content. This lightweight read operation returns resource identifiers, status, and timestamps, but does not include the policy definition, description, or status reasons. Because this operation does not require access to the customer's KMS key, it is suitable for resource discovery, inventory, and integration scenarios where only metadata is needed.
 */
export const getPolicySummary: API.OperationMethod<
  GetPolicySummaryRequest,
  GetPolicySummaryResponse,
  GetPolicySummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPolicySummaryRequest,
  output: GetPolicySummaryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicySummary",
}));

export type GetRegistryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specific registry.
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
 * Retrieves information about a specific registry record.
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

export type GetResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the resource-based policy for a specified resource.
 *
 * This feature is currently available only for AgentCore Runtime and Gateway.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourcePolicyRequest,
  output: GetResourcePolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

export type GetTokenVaultError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a token vault.
 */
export const getTokenVault: API.OperationMethod<
  GetTokenVaultRequest,
  GetTokenVaultResponse,
  GetTokenVaultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTokenVaultRequest,
  output: GetTokenVaultResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTokenVault",
}));

export type GetWorkloadIdentityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a workload identity.
 */
export const getWorkloadIdentity: API.OperationMethod<
  GetWorkloadIdentityRequest,
  GetWorkloadIdentityResponse,
  GetWorkloadIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWorkloadIdentityRequest,
  output: GetWorkloadIdentityResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkloadIdentity",
}));

export type ListAgentRuntimeEndpointsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all endpoints for a specific Amazon Secure Agent.
 */
export const listAgentRuntimeEndpoints: API.PaginatedOperationMethod<
  ListAgentRuntimeEndpointsRequest,
  ListAgentRuntimeEndpointsResponse,
  ListAgentRuntimeEndpointsError,
  Credentials | HttpClient.HttpClient,
  AgentRuntimeEndpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAgentRuntimeEndpointsRequest,
  output: ListAgentRuntimeEndpointsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgentRuntimeEndpoints",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "runtimeEndpoints",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgentRuntimesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Amazon Secure Agents in your account.
 */
export const listAgentRuntimes: API.PaginatedOperationMethod<
  ListAgentRuntimesRequest,
  ListAgentRuntimesResponse,
  ListAgentRuntimesError,
  Credentials | HttpClient.HttpClient,
  AgentRuntime
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAgentRuntimesRequest,
  output: ListAgentRuntimesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgentRuntimes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "agentRuntimes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgentRuntimeVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all versions of a specific Amazon Secure Agent.
 */
export const listAgentRuntimeVersions: API.PaginatedOperationMethod<
  ListAgentRuntimeVersionsRequest,
  ListAgentRuntimeVersionsResponse,
  ListAgentRuntimeVersionsError,
  Credentials | HttpClient.HttpClient,
  AgentRuntime
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAgentRuntimeVersionsRequest,
  output: ListAgentRuntimeVersionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgentRuntimeVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "agentRuntimes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgentRuntimeVersionsByCapacityProviderError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the agent runtime versions that are associated with a capacity provider. Use this operation to identify the runtimes you must disassociate before you can delete the capacity provider. Results are paginated; use the `nextToken` parameter to retrieve additional results.
 */
export const listAgentRuntimeVersionsByCapacityProvider: API.PaginatedOperationMethod<
  ListAgentRuntimeVersionsByCapacityProviderInput,
  ListAgentRuntimeVersionsByCapacityProviderOutput,
  ListAgentRuntimeVersionsByCapacityProviderError,
  Credentials | HttpClient.HttpClient,
  AgentRuntimeVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAgentRuntimeVersionsByCapacityProviderInput,
  output: ListAgentRuntimeVersionsByCapacityProviderOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgentRuntimeVersionsByCapacityProvider",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "agentRuntimes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListApiKeyCredentialProvidersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all API key credential providers in your account.
 */
export const listApiKeyCredentialProviders: API.PaginatedOperationMethod<
  ListApiKeyCredentialProvidersRequest,
  ListApiKeyCredentialProvidersResponse,
  ListApiKeyCredentialProvidersError,
  Credentials | HttpClient.HttpClient,
  ApiKeyCredentialProviderItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApiKeyCredentialProvidersRequest,
  output: ListApiKeyCredentialProvidersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApiKeyCredentialProviders",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "credentialProviders",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBrowserProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all browser profiles in your account.
 */
export const listBrowserProfiles: API.PaginatedOperationMethod<
  ListBrowserProfilesRequest,
  ListBrowserProfilesResponse,
  ListBrowserProfilesError,
  Credentials | HttpClient.HttpClient,
  BrowserProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBrowserProfilesRequest,
  output: ListBrowserProfilesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBrowserProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "profileSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBrowsersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all custom browsers in your account.
 */
export const listBrowsers: API.PaginatedOperationMethod<
  ListBrowsersRequest,
  ListBrowsersResponse,
  ListBrowsersError,
  Credentials | HttpClient.HttpClient,
  BrowserSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBrowsersRequest,
  output: ListBrowsersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBrowsers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "browserSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCapacityProvidersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the capacity providers in your account and returns summary information for each one. To retrieve the full configuration for a specific capacity provider, use `GetCapacityProvider`. Results are paginated; use the `nextToken` parameter to retrieve additional results.
 */
export const listCapacityProviders: API.PaginatedOperationMethod<
  ListCapacityProvidersInput,
  ListCapacityProvidersOutput,
  ListCapacityProvidersError,
  Credentials | HttpClient.HttpClient,
  CapacityProviderSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCapacityProvidersInput,
  output: ListCapacityProvidersOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCapacityProviders",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "capacityProviders",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCodeInterpretersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all custom code interpreters in your account.
 */
export const listCodeInterpreters: API.PaginatedOperationMethod<
  ListCodeInterpretersRequest,
  ListCodeInterpretersResponse,
  ListCodeInterpretersError,
  Credentials | HttpClient.HttpClient,
  CodeInterpreterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCodeInterpretersRequest,
  output: ListCodeInterpretersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCodeInterpreters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "codeInterpreterSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConfigurationBundlesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all configuration bundles in the account.
 */
export const listConfigurationBundles: API.PaginatedOperationMethod<
  ListConfigurationBundlesRequest,
  ListConfigurationBundlesResponse,
  ListConfigurationBundlesError,
  Credentials | HttpClient.HttpClient,
  ConfigurationBundleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConfigurationBundlesRequest,
  output: ListConfigurationBundlesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationBundles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "bundles",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConfigurationBundleVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all versions of a configuration bundle, with optional filtering by branch name or creation source.
 */
export const listConfigurationBundleVersions: API.PaginatedOperationMethod<
  ListConfigurationBundleVersionsRequest,
  ListConfigurationBundleVersionsResponse,
  ListConfigurationBundleVersionsError,
  Credentials | HttpClient.HttpClient,
  ConfigurationBundleVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConfigurationBundleVersionsRequest,
  output: ListConfigurationBundleVersionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationBundleVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "versions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDatasetExamplesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns paginated examples from the dataset. The server embeds the resolved version in the pagination token. Once pagination begins, all subsequent pages are pinned to that version regardless of concurrent mutations.
 */
export const listDatasetExamples: API.PaginatedOperationMethod<
  ListDatasetExamplesRequest,
  ListDatasetExamplesResponse,
  ListDatasetExamplesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDatasetExamplesRequest,
  output: ListDatasetExamplesResponse,
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
  operationName: "ListDatasetExamples",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "examples",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDatasetsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all datasets in the caller's account, paginated.
 */
export const listDatasets: API.PaginatedOperationMethod<
  ListDatasetsRequest,
  ListDatasetsResponse,
  ListDatasetsError,
  Credentials | HttpClient.HttpClient,
  DatasetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDatasetsRequest,
  output: ListDatasetsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "datasets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDatasetVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all published versions of a dataset, sorted by version number descending (newest first). Does not include the DRAFT working copy.
 */
export const listDatasetVersions: API.PaginatedOperationMethod<
  ListDatasetVersionsRequest,
  ListDatasetVersionsResponse,
  ListDatasetVersionsError,
  Credentials | HttpClient.HttpClient,
  DatasetVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDatasetVersionsRequest,
  output: ListDatasetVersionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasetVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "versions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEvaluatorsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all available evaluators, including both builtin evaluators provided by the service and custom evaluators created by the user.
 */
export const listEvaluators: API.PaginatedOperationMethod<
  ListEvaluatorsRequest,
  ListEvaluatorsResponse,
  ListEvaluatorsError,
  Credentials | HttpClient.HttpClient,
  EvaluatorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEvaluatorsRequest,
  output: ListEvaluatorsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEvaluators",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "evaluators",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGatewayRateLimitsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all rate limits for a gateway. Results are paginated. Use the `nextToken` parameter to retrieve additional results.
 */
export const listGatewayRateLimits: API.PaginatedOperationMethod<
  ListGatewayRateLimitsRequest,
  ListGatewayRateLimitsResponse,
  ListGatewayRateLimitsError,
  Credentials | HttpClient.HttpClient,
  GatewayRateLimitDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGatewayRateLimitsRequest,
  output: ListGatewayRateLimitsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGatewayRateLimits",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "rateLimits",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGatewayRulesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all rules for a gateway.
 */
export const listGatewayRules: API.PaginatedOperationMethod<
  ListGatewayRulesRequest,
  ListGatewayRulesResponse,
  ListGatewayRulesError,
  Credentials | HttpClient.HttpClient,
  GatewayRuleDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGatewayRulesRequest,
  output: ListGatewayRulesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGatewayRules",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "gatewayRules",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGatewaysError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all gateways in the account.
 */
export const listGateways: API.PaginatedOperationMethod<
  ListGatewaysRequest,
  ListGatewaysResponse,
  ListGatewaysError,
  Credentials | HttpClient.HttpClient,
  GatewaySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGatewaysRequest,
  output: ListGatewaysResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGateways",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGatewayTargetsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all targets for a specific gateway.
 */
export const listGatewayTargets: API.PaginatedOperationMethod<
  ListGatewayTargetsRequest,
  ListGatewayTargetsResponse,
  ListGatewayTargetsError,
  Credentials | HttpClient.HttpClient,
  TargetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGatewayTargetsRequest,
  output: ListGatewayTargetsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGatewayTargets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListHarnessEndpointsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Operation to list the endpoints of a harness.
 */
export const listHarnessEndpoints: API.PaginatedOperationMethod<
  ListHarnessEndpointsRequest,
  ListHarnessEndpointsResponse,
  ListHarnessEndpointsError,
  Credentials | HttpClient.HttpClient,
  HarnessEndpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListHarnessEndpointsRequest,
  output: ListHarnessEndpointsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHarnessEndpoints",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "endpoints",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListHarnessesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Operation to list harnesses.
 */
export const listHarnesses: API.PaginatedOperationMethod<
  ListHarnessesRequest,
  ListHarnessesResponse,
  ListHarnessesError,
  Credentials | HttpClient.HttpClient,
  HarnessSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListHarnessesRequest,
  output: ListHarnessesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHarnesses",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "harnesses",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListHarnessVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Operation to list the versions of a Harness.
 */
export const listHarnessVersions: API.PaginatedOperationMethod<
  ListHarnessVersionsRequest,
  ListHarnessVersionsResponse,
  ListHarnessVersionsError,
  Credentials | HttpClient.HttpClient,
  HarnessVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListHarnessVersionsRequest,
  output: ListHarnessVersionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHarnessVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "harnessVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMemoriesError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ServiceException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Lists the available Amazon Bedrock AgentCore Memory resources in the current Amazon Web Services Region.
 */
export const listMemories: API.PaginatedOperationMethod<
  ListMemoriesInput,
  ListMemoriesOutput,
  ListMemoriesError,
  Credentials | HttpClient.HttpClient,
  MemorySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMemoriesInput,
  output: ListMemoriesOutput,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ServiceException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMemories",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "memories",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListOauth2CredentialProvidersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all OAuth2 credential providers in your account.
 */
export const listOauth2CredentialProviders: API.PaginatedOperationMethod<
  ListOauth2CredentialProvidersRequest,
  ListOauth2CredentialProvidersResponse,
  ListOauth2CredentialProvidersError,
  Credentials | HttpClient.HttpClient,
  Oauth2CredentialProviderItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOauth2CredentialProvidersRequest,
  output: ListOauth2CredentialProvidersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOauth2CredentialProviders",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "credentialProviders",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListOnlineEvaluationConfigsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all online evaluation configurations in the account, providing summary information about each configuration's status and settings.
 */
export const listOnlineEvaluationConfigs: API.PaginatedOperationMethod<
  ListOnlineEvaluationConfigsRequest,
  ListOnlineEvaluationConfigsResponse,
  ListOnlineEvaluationConfigsError,
  Credentials | HttpClient.HttpClient,
  OnlineEvaluationConfigSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOnlineEvaluationConfigsRequest,
  output: ListOnlineEvaluationConfigsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOnlineEvaluationConfigs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "onlineEvaluationConfigs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPaymentConnectorsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all payment connectors for a specified payment manager.
 */
export const listPaymentConnectors: API.PaginatedOperationMethod<
  ListPaymentConnectorsRequest,
  ListPaymentConnectorsResponse,
  ListPaymentConnectorsError,
  Credentials | HttpClient.HttpClient,
  PaymentConnectorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPaymentConnectorsRequest,
  output: ListPaymentConnectorsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPaymentConnectors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "paymentConnectors",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPaymentCredentialProvidersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all payment credential providers in the account.
 */
export const listPaymentCredentialProviders: API.PaginatedOperationMethod<
  ListPaymentCredentialProvidersRequest,
  ListPaymentCredentialProvidersResponse,
  ListPaymentCredentialProvidersError,
  Credentials | HttpClient.HttpClient,
  PaymentCredentialProviderItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPaymentCredentialProvidersRequest,
  output: ListPaymentCredentialProvidersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPaymentCredentialProviders",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "credentialProviders",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPaymentManagersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all payment managers in the account.
 */
export const listPaymentManagers: API.PaginatedOperationMethod<
  ListPaymentManagersRequest,
  ListPaymentManagersResponse,
  ListPaymentManagersError,
  Credentials | HttpClient.HttpClient,
  PaymentManagerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPaymentManagersRequest,
  output: ListPaymentManagersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPaymentManagers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "paymentManagers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPoliciesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of policies within the AgentCore Policy engine. This operation supports pagination and filtering to help administrators manage and discover policies across policy engines. Results can be filtered by policy engine or resource associations.
 */
export const listPolicies: API.PaginatedOperationMethod<
  ListPoliciesRequest,
  ListPoliciesResponse,
  ListPoliciesError,
  Credentials | HttpClient.HttpClient,
  Policy
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPoliciesRequest,
  output: ListPoliciesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "policies",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPolicyEnginesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of policy engines within the AgentCore Policy system. This operation supports pagination to help administrators discover and manage policy engines across their account. Each policy engine serves as a container for related policies.
 */
export const listPolicyEngines: API.PaginatedOperationMethod<
  ListPolicyEnginesRequest,
  ListPolicyEnginesResponse,
  ListPolicyEnginesError,
  Credentials | HttpClient.HttpClient,
  PolicyEngine
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPolicyEnginesRequest,
  output: ListPolicyEnginesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicyEngines",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "policyEngines",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPolicyEngineSummariesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of metadata-only policy engine summaries without decrypting customer content. This lightweight read operation returns resource identifiers, status, and timestamps for each policy engine, but does not include descriptions or status reasons. Because this operation does not require access to the customer's KMS key, it is suitable for resource discovery, inventory, and integration scenarios where only metadata is needed.
 */
export const listPolicyEngineSummaries: API.PaginatedOperationMethod<
  ListPolicyEngineSummariesRequest,
  ListPolicyEngineSummariesResponse,
  ListPolicyEngineSummariesError,
  Credentials | HttpClient.HttpClient,
  PolicyEngineSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPolicyEngineSummariesRequest,
  output: ListPolicyEngineSummariesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicyEngineSummaries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "policyEngines",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPolicyGenerationAssetsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of generated policy assets from a policy generation request within the AgentCore Policy system. This operation returns the actual Cedar policies and related artifacts produced by the AI-powered policy generation process, allowing users to review and select from multiple generated policy options.
 */
export const listPolicyGenerationAssets: API.PaginatedOperationMethod<
  ListPolicyGenerationAssetsRequest,
  ListPolicyGenerationAssetsResponse,
  ListPolicyGenerationAssetsError,
  Credentials | HttpClient.HttpClient,
  PolicyGenerationAsset
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPolicyGenerationAssetsRequest,
  output: ListPolicyGenerationAssetsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicyGenerationAssets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "policyGenerationAssets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPolicyGenerationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of policy generation requests within the AgentCore Policy system. This operation supports pagination and filtering to help track and manage AI-powered policy generation operations.
 */
export const listPolicyGenerations: API.PaginatedOperationMethod<
  ListPolicyGenerationsRequest,
  ListPolicyGenerationsResponse,
  ListPolicyGenerationsError,
  Credentials | HttpClient.HttpClient,
  PolicyGeneration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPolicyGenerationsRequest,
  output: ListPolicyGenerationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicyGenerations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "policyGenerations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPolicyGenerationSummariesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of metadata-only policy generation summaries within a policy engine without decrypting customer content. This lightweight read operation returns resource identifiers, status, timestamps, and findings for each policy generation, but does not include status reasons. Because this operation does not require access to the customer's KMS key, it is suitable for resource discovery, inventory, and integration scenarios where only metadata is needed.
 */
export const listPolicyGenerationSummaries: API.PaginatedOperationMethod<
  ListPolicyGenerationSummariesRequest,
  ListPolicyGenerationSummariesResponse,
  ListPolicyGenerationSummariesError,
  Credentials | HttpClient.HttpClient,
  PolicyGenerationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPolicyGenerationSummariesRequest,
  output: ListPolicyGenerationSummariesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicyGenerationSummaries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "policyGenerations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPolicySummariesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of metadata-only policy summaries within a policy engine without decrypting customer content. This lightweight read operation returns resource identifiers, status, and timestamps for each policy, but does not include policy definitions, descriptions, or status reasons. Because this operation does not require access to the customer's KMS key, it is suitable for resource discovery, inventory, and integration scenarios where only metadata is needed.
 */
export const listPolicySummaries: API.PaginatedOperationMethod<
  ListPolicySummariesRequest,
  ListPolicySummariesResponse,
  ListPolicySummariesError,
  Credentials | HttpClient.HttpClient,
  PolicySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPolicySummariesRequest,
  output: ListPolicySummariesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicySummaries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "policies",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRegistriesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all registries in the account. You can optionally filter results by status using the `status` parameter, or by authorizer type using the `authorizerType` parameter.
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
 * Lists registry records within a registry. You can optionally filter results using the `name`, `status`, and `descriptorType` parameters. When multiple filters are specified, they are combined using AND logic.
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
 * Lists the tags associated with the specified resource.
 *
 * This feature is currently available only for AgentCore Runtime, Browser, Browser Profile, Code Interpreter tool, and Gateway.
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

export type ListWorkloadIdentitiesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all workload identities in your account.
 */
export const listWorkloadIdentities: API.PaginatedOperationMethod<
  ListWorkloadIdentitiesRequest,
  ListWorkloadIdentitiesResponse,
  ListWorkloadIdentitiesError,
  Credentials | HttpClient.HttpClient,
  WorkloadIdentityType
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWorkloadIdentitiesRequest,
  output: ListWorkloadIdentitiesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkloadIdentities",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workloadIdentities",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates a resource-based policy for a resource with the specified resourceArn.
 *
 * This feature is currently available only for AgentCore Runtime and Gateway.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type SetTokenVaultCMKError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Sets the customer master key (CMK) for a token vault.
 */
export const setTokenVaultCMK: API.OperationMethod<
  SetTokenVaultCMKRequest,
  SetTokenVaultCMKResponse,
  SetTokenVaultCMKError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetTokenVaultCMKRequest,
  output: SetTokenVaultCMKResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetTokenVaultCMK",
}));

export type StartPolicyGenerationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates the AI-powered generation of Cedar policies from natural language descriptions within the AgentCore Policy system. This feature enables both technical and non-technical users to create policies by describing their authorization requirements in plain English, which is then automatically translated into formal Cedar policy statements. The generation process analyzes the natural language input along with the Gateway's tool context to produce validated policy options. Generated policy assets are automatically deleted after 7 days, so you should review and create policies from the generated assets within this timeframe. Once created, policies are permanent and not subject to this expiration. Generated policies should be reviewed and tested in log-only mode before deploying to production. Use this when you want to describe policy intent naturally rather than learning Cedar syntax, though generated policies may require refinement for complex scenarios.
 */
export const startPolicyGeneration: API.OperationMethod<
  StartPolicyGenerationRequest,
  StartPolicyGenerationResponse,
  StartPolicyGenerationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartPolicyGenerationRequest,
  output: StartPolicyGenerationResponse,
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
  operationName: "StartPolicyGeneration",
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
 * Submits a registry record for approval. This transitions the record from `DRAFT` status to `PENDING_APPROVAL` status. If the registry has auto-approval enabled, the record is automatically approved.
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

export type SynchronizeGatewayTargetsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Synchronizes the gateway targets by fetching the latest tool definitions from the target endpoints.
 *
 * You cannot synchronize a target that is in a pending authorization state (`CREATE_PENDING_AUTH`, `UPDATE_PENDING_AUTH`, or `SYNCHRONIZE_PENDING_AUTH`). Wait for the authorization to complete or fail before synchronizing.
 *
 * You cannot synchronize a target that has a static tool schema (`mcpToolSchema`) configured. Remove the static schema through an `UpdateGatewayTarget` call to enable dynamic tool synchronization.
 */
export const synchronizeGatewayTargets: API.OperationMethod<
  SynchronizeGatewayTargetsRequest,
  SynchronizeGatewayTargetsResponse,
  SynchronizeGatewayTargetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SynchronizeGatewayTargetsRequest,
  output: SynchronizeGatewayTargetsResponse,
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
  operationName: "SynchronizeGatewayTargets",
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
 * Associates the specified tags to a resource with the specified resourceArn. If existing tags on a resource are not specified in the request parameters, they are not changed. When a resource is deleted, the tags associated with that resource are also deleted.
 *
 * This feature is currently available only for AgentCore Runtime, Browser, Browser Profile, Code Interpreter tool, and Gateway.
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
 * Removes the specified tags from the specified resource.
 *
 * This feature is currently available only for AgentCore Runtime, Browser, Browser Profile, Code Interpreter tool, and Gateway.
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

export type UpdateAgentRuntimeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing Amazon Secure Agent.
 */
export const updateAgentRuntime: API.OperationMethod<
  UpdateAgentRuntimeRequest,
  UpdateAgentRuntimeResponse,
  UpdateAgentRuntimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAgentRuntimeRequest,
  output: UpdateAgentRuntimeResponse,
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
  operationName: "UpdateAgentRuntime",
}));

export type UpdateAgentRuntimeEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing Amazon Bedrock AgentCore Runtime endpoint.
 */
export const updateAgentRuntimeEndpoint: API.OperationMethod<
  UpdateAgentRuntimeEndpointRequest,
  UpdateAgentRuntimeEndpointResponse,
  UpdateAgentRuntimeEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAgentRuntimeEndpointRequest,
  output: UpdateAgentRuntimeEndpointResponse,
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
  operationName: "UpdateAgentRuntimeEndpoint",
}));

export type UpdateApiKeyCredentialProviderError =
  | AccessDeniedException
  | ConflictException
  | DecryptionFailure
  | EncryptionFailure
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing API key credential provider.
 */
export const updateApiKeyCredentialProvider: API.OperationMethod<
  UpdateApiKeyCredentialProviderRequest,
  UpdateApiKeyCredentialProviderResponse,
  UpdateApiKeyCredentialProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApiKeyCredentialProviderRequest,
  output: UpdateApiKeyCredentialProviderResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    DecryptionFailure,
    EncryptionFailure,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApiKeyCredentialProvider",
}));

export type UpdateCapacityProviderError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | RetryableConflictException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a capacity provider. Only the description can be changed. To change other configuration, such as instance types, networking, or storage, create a new capacity provider.
 */
export const updateCapacityProvider: API.OperationMethod<
  UpdateCapacityProviderInput,
  UpdateCapacityProviderOutput,
  UpdateCapacityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCapacityProviderInput,
  output: UpdateCapacityProviderOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    RetryableConflictException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCapacityProvider",
}));

export type UpdateConfigurationBundleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a configuration bundle by creating a new version with the specified changes. Each update creates a new version in the version history.
 */
export const updateConfigurationBundle: API.OperationMethod<
  UpdateConfigurationBundleRequest,
  UpdateConfigurationBundleResponse,
  UpdateConfigurationBundleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConfigurationBundleRequest,
  output: UpdateConfigurationBundleResponse,
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
  operationName: "UpdateConfigurationBundle",
}));

export type UpdateDatasetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a dataset's metadata. Synchronous operation. Only provided fields are updated; omitted fields remain unchanged. To modify dataset content, use `AddDatasetExamples`, `UpdateDatasetExamples`, or `DeleteDatasetExamples`.
 */
export const updateDataset: API.OperationMethod<
  UpdateDatasetRequest,
  UpdateDatasetResponse,
  UpdateDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDatasetRequest,
  output: UpdateDatasetResponse,
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
  operationName: "UpdateDataset",
}));

export type UpdateDatasetExamplesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates multiple existing examples in-place on DRAFT. All examples are validated against the dataset's schema type before any writes occur. If any example fails validation, the entire batch is rejected (all-or-nothing semantics).
 */
export const updateDatasetExamples: API.OperationMethod<
  UpdateDatasetExamplesRequest,
  UpdateDatasetExamplesResponse,
  UpdateDatasetExamplesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDatasetExamplesRequest,
  output: UpdateDatasetExamplesResponse,
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
  operationName: "UpdateDatasetExamples",
}));

export type UpdateEvaluatorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a custom evaluator's configuration, description, or evaluation level. Built-in evaluators cannot be updated. The evaluator must not be locked for modification.
 */
export const updateEvaluator: API.OperationMethod<
  UpdateEvaluatorRequest,
  UpdateEvaluatorResponse,
  UpdateEvaluatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEvaluatorRequest,
  output: UpdateEvaluatorResponse,
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
  operationName: "UpdateEvaluator",
}));

export type UpdateGatewayError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing gateway.
 */
export const updateGateway: API.OperationMethod<
  UpdateGatewayRequest,
  UpdateGatewayResponse,
  UpdateGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGatewayRequest,
  output: UpdateGatewayResponse,
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
  operationName: "UpdateGateway",
}));

export type UpdateGatewayRateLimitError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the entries of a gateway rate limit. The dimension keys are immutable after creation.
 */
export const updateGatewayRateLimit: API.OperationMethod<
  UpdateGatewayRateLimitRequest,
  UpdateGatewayRateLimitResponse,
  UpdateGatewayRateLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGatewayRateLimitRequest,
  output: UpdateGatewayRateLimitResponse,
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
  operationName: "UpdateGatewayRateLimit",
}));

export type UpdateGatewayRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a gateway rule's priority, conditions, actions, or description.
 */
export const updateGatewayRule: API.OperationMethod<
  UpdateGatewayRuleRequest,
  UpdateGatewayRuleResponse,
  UpdateGatewayRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGatewayRuleRequest,
  output: UpdateGatewayRuleResponse,
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
  operationName: "UpdateGatewayRule",
}));

export type UpdateGatewayTargetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing gateway target.
 *
 * You cannot update a target that is in a pending authorization state (`CREATE_PENDING_AUTH`, `UPDATE_PENDING_AUTH`, or `SYNCHRONIZE_PENDING_AUTH`). Wait for the authorization to complete or fail before updating the target.
 */
export const updateGatewayTarget: API.OperationMethod<
  UpdateGatewayTargetRequest,
  UpdateGatewayTargetResponse,
  UpdateGatewayTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGatewayTargetRequest,
  output: UpdateGatewayTargetResponse,
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
  operationName: "UpdateGatewayTarget",
}));

export type UpdateHarnessError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Operation to update a harness.
 */
export const updateHarness: API.OperationMethod<
  UpdateHarnessRequest,
  UpdateHarnessResponse,
  UpdateHarnessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateHarnessRequest,
  output: UpdateHarnessResponse,
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
  operationName: "UpdateHarness",
}));

export type UpdateHarnessEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Operation to update a harness endpoint.
 */
export const updateHarnessEndpoint: API.OperationMethod<
  UpdateHarnessEndpointRequest,
  UpdateHarnessEndpointResponse,
  UpdateHarnessEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateHarnessEndpointRequest,
  output: UpdateHarnessEndpointResponse,
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
  operationName: "UpdateHarnessEndpoint",
}));

export type UpdateMemoryError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Update an Amazon Bedrock AgentCore Memory resource memory.
 */
export const updateMemory: API.OperationMethod<
  UpdateMemoryInput,
  UpdateMemoryOutput,
  UpdateMemoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMemoryInput,
  output: UpdateMemoryOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMemory",
}));

export type UpdateOauth2CredentialProviderError =
  | AccessDeniedException
  | ConflictException
  | DecryptionFailure
  | EncryptionFailure
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing OAuth2 credential provider.
 */
export const updateOauth2CredentialProvider: API.OperationMethod<
  UpdateOauth2CredentialProviderRequest,
  UpdateOauth2CredentialProviderResponse,
  UpdateOauth2CredentialProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateOauth2CredentialProviderRequest,
  output: UpdateOauth2CredentialProviderResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    DecryptionFailure,
    EncryptionFailure,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOauth2CredentialProvider",
}));

export type UpdateOnlineEvaluationConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an online evaluation configuration's settings, including rules, data sources, evaluators, and execution status. Changes take effect immediately for ongoing evaluations.
 */
export const updateOnlineEvaluationConfig: API.OperationMethod<
  UpdateOnlineEvaluationConfigRequest,
  UpdateOnlineEvaluationConfigResponse,
  UpdateOnlineEvaluationConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateOnlineEvaluationConfigRequest,
  output: UpdateOnlineEvaluationConfigResponse,
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
  operationName: "UpdateOnlineEvaluationConfig",
}));

export type UpdatePaymentConnectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | SubscriptionRequiredException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing payment connector. This operation uses PATCH semantics, so you only need to specify the fields you want to change.
 */
export const updatePaymentConnector: API.OperationMethod<
  UpdatePaymentConnectorRequest,
  UpdatePaymentConnectorResponse,
  UpdatePaymentConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePaymentConnectorRequest,
  output: UpdatePaymentConnectorResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    SubscriptionRequiredException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePaymentConnector",
}));

export type UpdatePaymentCredentialProviderError =
  | AccessDeniedException
  | ConflictException
  | DecryptionFailure
  | EncryptionFailure
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing payment credential provider with new authentication credentials.
 */
export const updatePaymentCredentialProvider: API.OperationMethod<
  UpdatePaymentCredentialProviderRequest,
  UpdatePaymentCredentialProviderResponse,
  UpdatePaymentCredentialProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePaymentCredentialProviderRequest,
  output: UpdatePaymentCredentialProviderResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    DecryptionFailure,
    EncryptionFailure,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePaymentCredentialProvider",
}));

export type UpdatePaymentManagerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing payment manager. This operation uses PATCH semantics, so you only need to specify the fields you want to change.
 */
export const updatePaymentManager: API.OperationMethod<
  UpdatePaymentManagerRequest,
  UpdatePaymentManagerResponse,
  UpdatePaymentManagerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePaymentManagerRequest,
  output: UpdatePaymentManagerResponse,
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
  operationName: "UpdatePaymentManager",
}));

export type UpdatePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing policy within the AgentCore Policy system. This operation allows modification of the policy description and definition while maintaining the policy's identity. The updated policy is validated against the Cedar schema before being applied. This is an asynchronous operation. Use the `GetPolicy` operation to poll the `status` field to track completion.
 *
 * If the updated policy is a temporal policy, the policy engine invalidates all active temporal sessions. If the update adds or removes temporal operators, the policy engine also invalidates active temporal sessions. For more information about temporal policy sessions, see session-based temporal policies. The policy engine returns an HTTP 409 `ConflictException` to in-flight sessions. To resume, you must start a new session with a new session ID.
 */
export const updatePolicy: API.OperationMethod<
  UpdatePolicyRequest,
  UpdatePolicyResponse,
  UpdatePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePolicyRequest,
  output: UpdatePolicyResponse,
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
  operationName: "UpdatePolicy",
}));

export type UpdatePolicyEngineError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing policy engine within the AgentCore Policy system. This operation allows modification of the policy engine description while maintaining its identity. This is an asynchronous operation. Use the `GetPolicyEngine` operation to poll the `status` field to track completion.
 */
export const updatePolicyEngine: API.OperationMethod<
  UpdatePolicyEngineRequest,
  UpdatePolicyEngineResponse,
  UpdatePolicyEngineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePolicyEngineRequest,
  output: UpdatePolicyEngineResponse,
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
  operationName: "UpdatePolicyEngine",
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
 * Updates an existing registry. This operation uses PATCH semantics, so you only need to specify the fields you want to change.
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
 * Updates an existing registry record. This operation uses PATCH semantics, so you only need to specify the fields you want to change. The update is processed asynchronously and returns HTTP 202 Accepted.
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
 * Updates the status of a registry record. Use this operation to approve, reject, or deprecate a registry record.
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

export type UpdateWorkloadIdentityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing workload identity.
 */
export const updateWorkloadIdentity: API.OperationMethod<
  UpdateWorkloadIdentityRequest,
  UpdateWorkloadIdentityResponse,
  UpdateWorkloadIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWorkloadIdentityRequest,
  output: UpdateWorkloadIdentityResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkloadIdentity",
}));
