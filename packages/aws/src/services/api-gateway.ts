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
  sdkId: "API Gateway",
  serviceShapeName: "BackplaneControlService",
});
const auth = T.AwsAuthSigv4({ name: "apigateway" });
const ver = T.ServiceVersion("2015-07-09");
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
              `https://apigateway-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://apigateway-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://apigateway.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://apigateway.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    {
      retryAfterSeconds: S.optional(S.String).pipe(T.HttpHeader("Retry-After")),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    {
      retryAfterSeconds: S.optional(S.String).pipe(T.HttpHeader("Retry-After")),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    {
      retryAfterSeconds: S.optional(S.String).pipe(T.HttpHeader("Retry-After")),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export interface StageKey {
  restApiId?: string;
  stageName?: string;
}
export const StageKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.optional(S.String),
    stageName: S.optional(S.String),
  }),
).annotate({ identifier: "StageKey" }) as any as S.Schema<StageKey>;
export type ListOfStageKeys = StageKey[];
export const ListOfStageKeys = /*@__PURE__*/ S.Array(StageKey);
export type MapOfStringToString = { [key: string]: string | undefined };
export const MapOfStringToString = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateApiKeyRequest {
  name?: string;
  description?: string;
  enabled?: boolean;
  generateDistinctId?: boolean;
  value?: string | redacted.Redacted<string>;
  stageKeys?: StageKey[];
  customerId?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateApiKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    enabled: S.optional(S.Boolean),
    generateDistinctId: S.optional(S.Boolean),
    value: S.optional(SensitiveString),
    stageKeys: S.optional(ListOfStageKeys),
    customerId: S.optional(S.String),
    tags: S.optional(MapOfStringToString),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/apikeys" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateApiKeyRequest",
}) as any as S.Schema<CreateApiKeyRequest>;
export type ListOfString = string[];
export const ListOfString = /*@__PURE__*/ S.Array(S.String);
export interface ApiKey {
  id?: string;
  value?: string | redacted.Redacted<string>;
  name?: string;
  customerId?: string;
  description?: string;
  enabled?: boolean;
  createdDate?: Date;
  lastUpdatedDate?: Date;
  stageKeys?: string[];
  tags?: { [key: string]: string | undefined };
}
export const ApiKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    value: S.optional(SensitiveString),
    name: S.optional(S.String),
    customerId: S.optional(S.String),
    description: S.optional(S.String),
    enabled: S.optional(S.Boolean),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    stageKeys: S.optional(ListOfString),
    tags: S.optional(MapOfStringToString),
  }),
).annotate({ identifier: "ApiKey" }) as any as S.Schema<ApiKey>;
export type AuthorizerType =
  | "TOKEN"
  | "REQUEST"
  | "COGNITO_USER_POOLS"
  | (string & {});
export const AuthorizerType = S.String;

export type ProviderARN = string;
export type ListOfARNs = string[];
export const ListOfARNs = /*@__PURE__*/ S.Array(S.String);
export interface CreateAuthorizerRequest {
  restApiId: string;
  name: string;
  type: AuthorizerType;
  providerARNs?: string[];
  authType?: string;
  authorizerUri?: string;
  authorizerCredentials?: string;
  identitySource?: string;
  identityValidationExpression?: string;
  authorizerResultTtlInSeconds?: number;
}
export const CreateAuthorizerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    name: S.String,
    type: AuthorizerType,
    providerARNs: S.optional(ListOfARNs),
    authType: S.optional(S.String),
    authorizerUri: S.optional(S.String),
    authorizerCredentials: S.optional(S.String),
    identitySource: S.optional(S.String),
    identityValidationExpression: S.optional(S.String),
    authorizerResultTtlInSeconds: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/restapis/{restApiId}/authorizers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAuthorizerRequest",
}) as any as S.Schema<CreateAuthorizerRequest>;
export interface Authorizer {
  id?: string;
  name?: string;
  type?: AuthorizerType;
  providerARNs?: string[];
  authType?: string;
  authorizerUri?: string;
  authorizerCredentials?: string;
  identitySource?: string;
  identityValidationExpression?: string;
  authorizerResultTtlInSeconds?: number;
}
export const Authorizer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    type: S.optional(AuthorizerType),
    providerARNs: S.optional(ListOfARNs),
    authType: S.optional(S.String),
    authorizerUri: S.optional(S.String),
    authorizerCredentials: S.optional(S.String),
    identitySource: S.optional(S.String),
    identityValidationExpression: S.optional(S.String),
    authorizerResultTtlInSeconds: S.optional(S.Number),
  }),
).annotate({ identifier: "Authorizer" }) as any as S.Schema<Authorizer>;
export interface CreateBasePathMappingRequest {
  domainName: string;
  domainNameId?: string;
  basePath?: string;
  restApiId: string;
  stage?: string;
}
export const CreateBasePathMappingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainName: S.String.pipe(T.HttpLabel("domainName")),
    domainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
    basePath: S.optional(S.String),
    restApiId: S.String,
    stage: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/domainnames/{domainName}/basepathmappings",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateBasePathMappingRequest",
}) as any as S.Schema<CreateBasePathMappingRequest>;
export interface BasePathMapping {
  basePath?: string;
  restApiId?: string;
  stage?: string;
}
export const BasePathMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    basePath: S.optional(S.String),
    restApiId: S.optional(S.String),
    stage: S.optional(S.String),
  }),
).annotate({
  identifier: "BasePathMapping",
}) as any as S.Schema<BasePathMapping>;
export type CacheClusterSize =
  | "0.5"
  | "1.6"
  | "6.1"
  | "13.5"
  | "28.4"
  | "58.2"
  | "118"
  | "237"
  | (string & {});
export const CacheClusterSize = S.String;

export interface DeploymentCanarySettings {
  percentTraffic?: number;
  stageVariableOverrides?: { [key: string]: string | undefined };
  useStageCache?: boolean;
}
export const DeploymentCanarySettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    percentTraffic: S.optional(S.Number),
    stageVariableOverrides: S.optional(MapOfStringToString),
    useStageCache: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DeploymentCanarySettings",
}) as any as S.Schema<DeploymentCanarySettings>;
export interface CreateDeploymentRequest {
  restApiId: string;
  stageName?: string;
  stageDescription?: string;
  description?: string;
  cacheClusterEnabled?: boolean;
  cacheClusterSize?: CacheClusterSize;
  variables?: { [key: string]: string | undefined };
  canarySettings?: DeploymentCanarySettings;
  tracingEnabled?: boolean;
}
export const CreateDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    stageName: S.optional(S.String),
    stageDescription: S.optional(S.String),
    description: S.optional(S.String),
    cacheClusterEnabled: S.optional(S.Boolean),
    cacheClusterSize: S.optional(CacheClusterSize),
    variables: S.optional(MapOfStringToString),
    canarySettings: S.optional(DeploymentCanarySettings),
    tracingEnabled: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/restapis/{restApiId}/deployments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDeploymentRequest",
}) as any as S.Schema<CreateDeploymentRequest>;
export interface MethodSnapshot {
  authorizationType?: string;
  apiKeyRequired?: boolean;
}
export const MethodSnapshot = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authorizationType: S.optional(S.String),
    apiKeyRequired: S.optional(S.Boolean),
  }),
).annotate({ identifier: "MethodSnapshot" }) as any as S.Schema<MethodSnapshot>;
export type MapOfMethodSnapshot = { [key: string]: MethodSnapshot | undefined };
export const MapOfMethodSnapshot = /*@__PURE__*/ S.Record(
  S.String,
  MethodSnapshot.pipe(S.optional),
);
export type PathToMapOfMethodSnapshot = {
  [key: string]: { [key: string]: MethodSnapshot | undefined } | undefined;
};
export const PathToMapOfMethodSnapshot = /*@__PURE__*/ S.Record(
  S.String,
  MapOfMethodSnapshot.pipe(S.optional),
);
export interface Deployment {
  id?: string;
  description?: string;
  createdDate?: Date;
  apiSummary?: {
    [key: string]: { [key: string]: MethodSnapshot | undefined } | undefined;
  };
}
export const Deployment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    description: S.optional(S.String),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    apiSummary: S.optional(PathToMapOfMethodSnapshot),
  }),
).annotate({ identifier: "Deployment" }) as any as S.Schema<Deployment>;
export type DocumentationPartType =
  | "API"
  | "AUTHORIZER"
  | "MODEL"
  | "RESOURCE"
  | "METHOD"
  | "PATH_PARAMETER"
  | "QUERY_PARAMETER"
  | "REQUEST_HEADER"
  | "REQUEST_BODY"
  | "RESPONSE"
  | "RESPONSE_HEADER"
  | "RESPONSE_BODY"
  | (string & {});
export const DocumentationPartType = S.String;

export type DocumentationPartLocationStatusCode = string;
export interface DocumentationPartLocation {
  type: DocumentationPartType;
  path?: string;
  method?: string;
  statusCode?: string;
  name?: string;
}
export const DocumentationPartLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: DocumentationPartType,
    path: S.optional(S.String),
    method: S.optional(S.String),
    statusCode: S.optional(S.String),
    name: S.optional(S.String),
  }),
).annotate({
  identifier: "DocumentationPartLocation",
}) as any as S.Schema<DocumentationPartLocation>;
export interface CreateDocumentationPartRequest {
  restApiId: string;
  location: DocumentationPartLocation;
  properties: string;
}
export const CreateDocumentationPartRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    location: DocumentationPartLocation,
    properties: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/restapis/{restApiId}/documentation/parts",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDocumentationPartRequest",
}) as any as S.Schema<CreateDocumentationPartRequest>;
export interface DocumentationPart {
  id?: string;
  location?: DocumentationPartLocation;
  properties?: string;
}
export const DocumentationPart = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    location: S.optional(DocumentationPartLocation),
    properties: S.optional(S.String),
  }),
).annotate({
  identifier: "DocumentationPart",
}) as any as S.Schema<DocumentationPart>;
export interface CreateDocumentationVersionRequest {
  restApiId: string;
  documentationVersion: string;
  stageName?: string;
  description?: string;
}
export const CreateDocumentationVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    documentationVersion: S.String,
    stageName: S.optional(S.String),
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/restapis/{restApiId}/documentation/versions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDocumentationVersionRequest",
}) as any as S.Schema<CreateDocumentationVersionRequest>;
export interface DocumentationVersion {
  version?: string;
  createdDate?: Date;
  description?: string;
}
export const DocumentationVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    version: S.optional(S.String),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "DocumentationVersion",
}) as any as S.Schema<DocumentationVersion>;
export type EndpointType = "REGIONAL" | "EDGE" | "PRIVATE" | (string & {});
export const EndpointType = S.String;

export type ListOfEndpointType = EndpointType[];
export const ListOfEndpointType = /*@__PURE__*/ S.Array(EndpointType);
export type IpAddressType = "ipv4" | "dualstack" | (string & {});
export const IpAddressType = S.String;

export interface EndpointConfiguration {
  types?: EndpointType[];
  ipAddressType?: IpAddressType;
  vpcEndpointIds?: string[];
}
export const EndpointConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    types: S.optional(ListOfEndpointType),
    ipAddressType: S.optional(IpAddressType),
    vpcEndpointIds: S.optional(ListOfString),
  }),
).annotate({
  identifier: "EndpointConfiguration",
}) as any as S.Schema<EndpointConfiguration>;
export type SecurityPolicy =
  | "TLS_1_0"
  | "TLS_1_2"
  | "SecurityPolicy_TLS13_1_3_2025_09"
  | "SecurityPolicy_TLS13_1_3_FIPS_2025_09"
  | "SecurityPolicy_TLS13_1_2_PFS_PQ_2025_09"
  | "SecurityPolicy_TLS13_1_2_FIPS_PQ_2025_09"
  | "SecurityPolicy_TLS13_1_2_FIPS_PFS_PQ_2025_09"
  | "SecurityPolicy_TLS13_1_2_PQ_2025_09"
  | "SecurityPolicy_TLS13_1_2_2021_06"
  | "SecurityPolicy_TLS13_2025_EDGE"
  | "SecurityPolicy_TLS12_PFS_2025_EDGE"
  | "SecurityPolicy_TLS12_2018_EDGE"
  | (string & {});
export const SecurityPolicy = S.String;

export type EndpointAccessMode = "BASIC" | "STRICT" | (string & {});
export const EndpointAccessMode = S.String;

export interface MutualTlsAuthenticationInput {
  truststoreUri?: string;
  truststoreVersion?: string;
}
export const MutualTlsAuthenticationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    truststoreUri: S.optional(S.String),
    truststoreVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "MutualTlsAuthenticationInput",
}) as any as S.Schema<MutualTlsAuthenticationInput>;
export type RoutingMode =
  | "BASE_PATH_MAPPING_ONLY"
  | "ROUTING_RULE_ONLY"
  | "ROUTING_RULE_THEN_BASE_PATH_MAPPING"
  | (string & {});
export const RoutingMode = S.String;

export interface CreateDomainNameRequest {
  domainName: string;
  certificateName?: string;
  certificateBody?: string;
  certificatePrivateKey?: string;
  certificateChain?: string;
  certificateArn?: string;
  regionalCertificateName?: string;
  regionalCertificateArn?: string;
  endpointConfiguration?: EndpointConfiguration;
  tags?: { [key: string]: string | undefined };
  securityPolicy?: SecurityPolicy;
  endpointAccessMode?: EndpointAccessMode;
  mutualTlsAuthentication?: MutualTlsAuthenticationInput;
  ownershipVerificationCertificateArn?: string;
  policy?: string;
  routingMode?: RoutingMode;
}
export const CreateDomainNameRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainName: S.String,
    certificateName: S.optional(S.String),
    certificateBody: S.optional(S.String),
    certificatePrivateKey: S.optional(S.String),
    certificateChain: S.optional(S.String),
    certificateArn: S.optional(S.String),
    regionalCertificateName: S.optional(S.String),
    regionalCertificateArn: S.optional(S.String),
    endpointConfiguration: S.optional(EndpointConfiguration),
    tags: S.optional(MapOfStringToString),
    securityPolicy: S.optional(SecurityPolicy),
    endpointAccessMode: S.optional(EndpointAccessMode),
    mutualTlsAuthentication: S.optional(MutualTlsAuthenticationInput),
    ownershipVerificationCertificateArn: S.optional(S.String),
    policy: S.optional(S.String),
    routingMode: S.optional(RoutingMode),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/domainnames" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDomainNameRequest",
}) as any as S.Schema<CreateDomainNameRequest>;
export type DomainNameStatus =
  | "AVAILABLE"
  | "UPDATING"
  | "PENDING"
  | "PENDING_CERTIFICATE_REIMPORT"
  | "PENDING_OWNERSHIP_VERIFICATION"
  | "FAILED"
  | (string & {});
export const DomainNameStatus = S.String;

export interface MutualTlsAuthentication {
  truststoreUri?: string;
  truststoreVersion?: string;
  truststoreWarnings?: string[];
}
export const MutualTlsAuthentication = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    truststoreUri: S.optional(S.String),
    truststoreVersion: S.optional(S.String),
    truststoreWarnings: S.optional(ListOfString),
  }),
).annotate({
  identifier: "MutualTlsAuthentication",
}) as any as S.Schema<MutualTlsAuthentication>;
export interface DomainName {
  domainName?: string;
  domainNameId?: string;
  domainNameArn?: string;
  certificateName?: string;
  certificateArn?: string;
  certificateUploadDate?: Date;
  regionalDomainName?: string;
  regionalHostedZoneId?: string;
  regionalCertificateName?: string;
  regionalCertificateArn?: string;
  distributionDomainName?: string;
  distributionHostedZoneId?: string;
  endpointConfiguration?: EndpointConfiguration;
  domainNameStatus?: DomainNameStatus;
  domainNameStatusMessage?: string;
  securityPolicy?: SecurityPolicy;
  endpointAccessMode?: EndpointAccessMode;
  tags?: { [key: string]: string | undefined };
  mutualTlsAuthentication?: MutualTlsAuthentication;
  ownershipVerificationCertificateArn?: string;
  managementPolicy?: string;
  policy?: string;
  routingMode?: RoutingMode;
}
export const DomainName = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainName: S.optional(S.String),
    domainNameId: S.optional(S.String),
    domainNameArn: S.optional(S.String),
    certificateName: S.optional(S.String),
    certificateArn: S.optional(S.String),
    certificateUploadDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    regionalDomainName: S.optional(S.String),
    regionalHostedZoneId: S.optional(S.String),
    regionalCertificateName: S.optional(S.String),
    regionalCertificateArn: S.optional(S.String),
    distributionDomainName: S.optional(S.String),
    distributionHostedZoneId: S.optional(S.String),
    endpointConfiguration: S.optional(EndpointConfiguration),
    domainNameStatus: S.optional(DomainNameStatus),
    domainNameStatusMessage: S.optional(S.String),
    securityPolicy: S.optional(SecurityPolicy),
    endpointAccessMode: S.optional(EndpointAccessMode),
    tags: S.optional(MapOfStringToString),
    mutualTlsAuthentication: S.optional(MutualTlsAuthentication),
    ownershipVerificationCertificateArn: S.optional(S.String),
    managementPolicy: S.optional(S.String),
    policy: S.optional(S.String),
    routingMode: S.optional(RoutingMode),
  }),
).annotate({ identifier: "DomainName" }) as any as S.Schema<DomainName>;
export type AccessAssociationSourceType = "VPCE" | (string & {});
export const AccessAssociationSourceType = S.String;

export interface CreateDomainNameAccessAssociationRequest {
  domainNameArn: string;
  accessAssociationSourceType: AccessAssociationSourceType;
  accessAssociationSource: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateDomainNameAccessAssociationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      domainNameArn: S.String,
      accessAssociationSourceType: AccessAssociationSourceType,
      accessAssociationSource: S.String,
      tags: S.optional(MapOfStringToString),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/domainnameaccessassociations" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateDomainNameAccessAssociationRequest",
}) as any as S.Schema<CreateDomainNameAccessAssociationRequest>;
export interface DomainNameAccessAssociation {
  domainNameAccessAssociationArn?: string;
  domainNameArn?: string;
  accessAssociationSourceType?: AccessAssociationSourceType;
  accessAssociationSource?: string;
  tags?: { [key: string]: string | undefined };
}
export const DomainNameAccessAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainNameAccessAssociationArn: S.optional(S.String),
    domainNameArn: S.optional(S.String),
    accessAssociationSourceType: S.optional(AccessAssociationSourceType),
    accessAssociationSource: S.optional(S.String),
    tags: S.optional(MapOfStringToString),
  }),
).annotate({
  identifier: "DomainNameAccessAssociation",
}) as any as S.Schema<DomainNameAccessAssociation>;
export interface CreateModelRequest {
  restApiId: string;
  name: string;
  description?: string;
  schema?: string;
  contentType: string;
}
export const CreateModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    name: S.String,
    description: S.optional(S.String),
    schema: S.optional(S.String),
    contentType: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/restapis/{restApiId}/models" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateModelRequest",
}) as any as S.Schema<CreateModelRequest>;
export interface Model {
  id?: string;
  name?: string;
  description?: string;
  schema?: string;
  contentType?: string;
}
export const Model = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    schema: S.optional(S.String),
    contentType: S.optional(S.String),
  }),
).annotate({ identifier: "Model" }) as any as S.Schema<Model>;
export interface CreateRequestValidatorRequest {
  restApiId: string;
  name?: string;
  validateRequestBody?: boolean;
  validateRequestParameters?: boolean;
}
export const CreateRequestValidatorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    name: S.optional(S.String),
    validateRequestBody: S.optional(S.Boolean),
    validateRequestParameters: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/restapis/{restApiId}/requestvalidators",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRequestValidatorRequest",
}) as any as S.Schema<CreateRequestValidatorRequest>;
export interface RequestValidator {
  id?: string;
  name?: string;
  validateRequestBody?: boolean;
  validateRequestParameters?: boolean;
}
export const RequestValidator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    validateRequestBody: S.optional(S.Boolean),
    validateRequestParameters: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "RequestValidator",
}) as any as S.Schema<RequestValidator>;
export interface CreateResourceRequest {
  restApiId: string;
  parentId: string;
  pathPart: string;
}
export const CreateResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    parentId: S.String.pipe(T.HttpLabel("parentId")),
    pathPart: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/restapis/{restApiId}/resources/{parentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateResourceRequest",
}) as any as S.Schema<CreateResourceRequest>;
export type MapOfStringToBoolean = { [key: string]: boolean | undefined };
export const MapOfStringToBoolean = /*@__PURE__*/ S.Record(
  S.String,
  S.Boolean.pipe(S.optional),
);
export type StatusCode = string;
export interface MethodResponse {
  statusCode?: string;
  responseParameters?: { [key: string]: boolean | undefined };
  responseModels?: { [key: string]: string | undefined };
}
export const MethodResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    statusCode: S.optional(S.String),
    responseParameters: S.optional(MapOfStringToBoolean),
    responseModels: S.optional(MapOfStringToString),
  }),
).annotate({ identifier: "MethodResponse" }) as any as S.Schema<MethodResponse>;
export type MapOfMethodResponse = { [key: string]: MethodResponse | undefined };
export const MapOfMethodResponse = /*@__PURE__*/ S.Record(
  S.String,
  MethodResponse.pipe(S.optional),
);
export type IntegrationType =
  | "HTTP"
  | "AWS"
  | "MOCK"
  | "HTTP_PROXY"
  | "AWS_PROXY"
  | (string & {});
export const IntegrationType = S.String;

export type ConnectionType = "INTERNET" | "VPC_LINK" | (string & {});
export const ConnectionType = S.String;

export type ContentHandlingStrategy =
  | "CONVERT_TO_BINARY"
  | "CONVERT_TO_TEXT"
  | (string & {});
export const ContentHandlingStrategy = S.String;

export interface IntegrationResponse {
  statusCode?: string;
  selectionPattern?: string;
  responseParameters?: { [key: string]: string | undefined };
  responseTemplates?: { [key: string]: string | undefined };
  contentHandling?: ContentHandlingStrategy;
}
export const IntegrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    statusCode: S.optional(S.String),
    selectionPattern: S.optional(S.String),
    responseParameters: S.optional(MapOfStringToString),
    responseTemplates: S.optional(MapOfStringToString),
    contentHandling: S.optional(ContentHandlingStrategy),
  }),
).annotate({
  identifier: "IntegrationResponse",
}) as any as S.Schema<IntegrationResponse>;
export type MapOfIntegrationResponse = {
  [key: string]: IntegrationResponse | undefined;
};
export const MapOfIntegrationResponse = /*@__PURE__*/ S.Record(
  S.String,
  IntegrationResponse.pipe(S.optional),
);
export interface TlsConfig {
  insecureSkipVerification?: boolean;
}
export const TlsConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ insecureSkipVerification: S.optional(S.Boolean) }),
).annotate({ identifier: "TlsConfig" }) as any as S.Schema<TlsConfig>;
export type ResponseTransferMode = "BUFFERED" | "STREAM" | (string & {});
export const ResponseTransferMode = S.String;

export interface Integration {
  type?: IntegrationType;
  httpMethod?: string;
  uri?: string;
  connectionType?: ConnectionType;
  connectionId?: string;
  credentials?: string;
  requestParameters?: { [key: string]: string | undefined };
  requestTemplates?: { [key: string]: string | undefined };
  passthroughBehavior?: string;
  contentHandling?: ContentHandlingStrategy;
  timeoutInMillis?: number;
  cacheNamespace?: string;
  cacheKeyParameters?: string[];
  integrationResponses?: { [key: string]: IntegrationResponse | undefined };
  tlsConfig?: TlsConfig;
  responseTransferMode?: ResponseTransferMode;
  integrationTarget?: string;
}
export const Integration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(IntegrationType),
    httpMethod: S.optional(S.String),
    uri: S.optional(S.String),
    connectionType: S.optional(ConnectionType),
    connectionId: S.optional(S.String),
    credentials: S.optional(S.String),
    requestParameters: S.optional(MapOfStringToString),
    requestTemplates: S.optional(MapOfStringToString),
    passthroughBehavior: S.optional(S.String),
    contentHandling: S.optional(ContentHandlingStrategy),
    timeoutInMillis: S.optional(S.Number),
    cacheNamespace: S.optional(S.String),
    cacheKeyParameters: S.optional(ListOfString),
    integrationResponses: S.optional(MapOfIntegrationResponse),
    tlsConfig: S.optional(TlsConfig),
    responseTransferMode: S.optional(ResponseTransferMode),
    integrationTarget: S.optional(S.String),
  }),
).annotate({ identifier: "Integration" }) as any as S.Schema<Integration>;
export interface Method {
  httpMethod?: string;
  authorizationType?: string;
  authorizerId?: string;
  apiKeyRequired?: boolean;
  requestValidatorId?: string;
  operationName?: string;
  requestParameters?: { [key: string]: boolean | undefined };
  requestModels?: { [key: string]: string | undefined };
  methodResponses?: { [key: string]: MethodResponse | undefined };
  methodIntegration?: Integration;
  authorizationScopes?: string[];
}
export const Method = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    httpMethod: S.optional(S.String),
    authorizationType: S.optional(S.String),
    authorizerId: S.optional(S.String),
    apiKeyRequired: S.optional(S.Boolean),
    requestValidatorId: S.optional(S.String),
    operationName: S.optional(S.String),
    requestParameters: S.optional(MapOfStringToBoolean),
    requestModels: S.optional(MapOfStringToString),
    methodResponses: S.optional(MapOfMethodResponse),
    methodIntegration: S.optional(Integration),
    authorizationScopes: S.optional(ListOfString),
  }),
).annotate({ identifier: "Method" }) as any as S.Schema<Method>;
export type MapOfMethod = { [key: string]: Method | undefined };
export const MapOfMethod = /*@__PURE__*/ S.Record(
  S.String,
  Method.pipe(S.optional),
);
export interface Resource {
  id?: string;
  parentId?: string;
  pathPart?: string;
  path?: string;
  resourceMethods?: { [key: string]: Method | undefined };
}
export const Resource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    parentId: S.optional(S.String),
    pathPart: S.optional(S.String),
    path: S.optional(S.String),
    resourceMethods: S.optional(MapOfMethod),
  }),
).annotate({ identifier: "Resource" }) as any as S.Schema<Resource>;
export type ApiKeySourceType = "HEADER" | "AUTHORIZER" | (string & {});
export const ApiKeySourceType = S.String;

export interface CreateRestApiRequest {
  name: string;
  description?: string;
  version?: string;
  cloneFrom?: string;
  binaryMediaTypes?: string[];
  minimumCompressionSize?: number;
  apiKeySource?: ApiKeySourceType;
  endpointConfiguration?: EndpointConfiguration;
  policy?: string;
  tags?: { [key: string]: string | undefined };
  disableExecuteApiEndpoint?: boolean;
  securityPolicy?: SecurityPolicy;
  endpointAccessMode?: EndpointAccessMode;
}
export const CreateRestApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    version: S.optional(S.String),
    cloneFrom: S.optional(S.String),
    binaryMediaTypes: S.optional(ListOfString),
    minimumCompressionSize: S.optional(S.Number),
    apiKeySource: S.optional(ApiKeySourceType),
    endpointConfiguration: S.optional(EndpointConfiguration),
    policy: S.optional(S.String),
    tags: S.optional(MapOfStringToString),
    disableExecuteApiEndpoint: S.optional(S.Boolean),
    securityPolicy: S.optional(SecurityPolicy),
    endpointAccessMode: S.optional(EndpointAccessMode),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/restapis" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRestApiRequest",
}) as any as S.Schema<CreateRestApiRequest>;
export type ApiStatus =
  | "UPDATING"
  | "AVAILABLE"
  | "PENDING"
  | "FAILED"
  | (string & {});
export const ApiStatus = S.String;

export interface RestApi {
  id?: string;
  name?: string;
  description?: string;
  createdDate?: Date;
  version?: string;
  warnings?: string[];
  binaryMediaTypes?: string[];
  minimumCompressionSize?: number;
  apiKeySource?: ApiKeySourceType;
  endpointConfiguration?: EndpointConfiguration;
  policy?: string;
  tags?: { [key: string]: string | undefined };
  disableExecuteApiEndpoint?: boolean;
  rootResourceId?: string;
  securityPolicy?: SecurityPolicy;
  endpointAccessMode?: EndpointAccessMode;
  apiStatus?: ApiStatus;
  apiStatusMessage?: string;
}
export const RestApi = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    version: S.optional(S.String),
    warnings: S.optional(ListOfString),
    binaryMediaTypes: S.optional(ListOfString),
    minimumCompressionSize: S.optional(S.Number),
    apiKeySource: S.optional(ApiKeySourceType),
    endpointConfiguration: S.optional(EndpointConfiguration),
    policy: S.optional(S.String),
    tags: S.optional(MapOfStringToString),
    disableExecuteApiEndpoint: S.optional(S.Boolean),
    rootResourceId: S.optional(S.String),
    securityPolicy: S.optional(SecurityPolicy),
    endpointAccessMode: S.optional(EndpointAccessMode),
    apiStatus: S.optional(ApiStatus),
    apiStatusMessage: S.optional(S.String),
  }),
).annotate({ identifier: "RestApi" }) as any as S.Schema<RestApi>;
export interface CanarySettings {
  percentTraffic?: number;
  deploymentId?: string;
  stageVariableOverrides?: { [key: string]: string | undefined };
  useStageCache?: boolean;
}
export const CanarySettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    percentTraffic: S.optional(S.Number),
    deploymentId: S.optional(S.String),
    stageVariableOverrides: S.optional(MapOfStringToString),
    useStageCache: S.optional(S.Boolean),
  }),
).annotate({ identifier: "CanarySettings" }) as any as S.Schema<CanarySettings>;
export interface CreateStageRequest {
  restApiId: string;
  stageName: string;
  deploymentId: string;
  description?: string;
  cacheClusterEnabled?: boolean;
  cacheClusterSize?: CacheClusterSize;
  variables?: { [key: string]: string | undefined };
  documentationVersion?: string;
  canarySettings?: CanarySettings;
  tracingEnabled?: boolean;
  tags?: { [key: string]: string | undefined };
}
export const CreateStageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    stageName: S.String,
    deploymentId: S.String,
    description: S.optional(S.String),
    cacheClusterEnabled: S.optional(S.Boolean),
    cacheClusterSize: S.optional(CacheClusterSize),
    variables: S.optional(MapOfStringToString),
    documentationVersion: S.optional(S.String),
    canarySettings: S.optional(CanarySettings),
    tracingEnabled: S.optional(S.Boolean),
    tags: S.optional(MapOfStringToString),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/restapis/{restApiId}/stages" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateStageRequest",
}) as any as S.Schema<CreateStageRequest>;
export type CacheClusterStatus =
  | "CREATE_IN_PROGRESS"
  | "AVAILABLE"
  | "DELETE_IN_PROGRESS"
  | "NOT_AVAILABLE"
  | "FLUSH_IN_PROGRESS"
  | (string & {});
export const CacheClusterStatus = S.String;

export type UnauthorizedCacheControlHeaderStrategy =
  | "FAIL_WITH_403"
  | "SUCCEED_WITH_RESPONSE_HEADER"
  | "SUCCEED_WITHOUT_RESPONSE_HEADER"
  | (string & {});
export const UnauthorizedCacheControlHeaderStrategy = S.String;

export interface MethodSetting {
  metricsEnabled?: boolean;
  loggingLevel?: string;
  dataTraceEnabled?: boolean;
  throttlingBurstLimit?: number;
  throttlingRateLimit?: number;
  cachingEnabled?: boolean;
  cacheTtlInSeconds?: number;
  cacheDataEncrypted?: boolean;
  requireAuthorizationForCacheControl?: boolean;
  unauthorizedCacheControlHeaderStrategy?: UnauthorizedCacheControlHeaderStrategy;
}
export const MethodSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricsEnabled: S.optional(S.Boolean),
    loggingLevel: S.optional(S.String),
    dataTraceEnabled: S.optional(S.Boolean),
    throttlingBurstLimit: S.optional(S.Number),
    throttlingRateLimit: S.optional(S.Number),
    cachingEnabled: S.optional(S.Boolean),
    cacheTtlInSeconds: S.optional(S.Number),
    cacheDataEncrypted: S.optional(S.Boolean),
    requireAuthorizationForCacheControl: S.optional(S.Boolean),
    unauthorizedCacheControlHeaderStrategy: S.optional(
      UnauthorizedCacheControlHeaderStrategy,
    ),
  }),
).annotate({ identifier: "MethodSetting" }) as any as S.Schema<MethodSetting>;
export type MapOfMethodSettings = { [key: string]: MethodSetting | undefined };
export const MapOfMethodSettings = /*@__PURE__*/ S.Record(
  S.String,
  MethodSetting.pipe(S.optional),
);
export interface AccessLogSettings {
  format?: string;
  destinationArn?: string;
}
export const AccessLogSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    format: S.optional(S.String),
    destinationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "AccessLogSettings",
}) as any as S.Schema<AccessLogSettings>;
export interface Stage {
  deploymentId?: string;
  clientCertificateId?: string;
  stageName?: string;
  description?: string;
  cacheClusterEnabled?: boolean;
  cacheClusterSize?: CacheClusterSize;
  cacheClusterStatus?: CacheClusterStatus;
  methodSettings?: { [key: string]: MethodSetting | undefined };
  variables?: { [key: string]: string | undefined };
  documentationVersion?: string;
  accessLogSettings?: AccessLogSettings;
  canarySettings?: CanarySettings;
  tracingEnabled?: boolean;
  webAclArn?: string;
  tags?: { [key: string]: string | undefined };
  createdDate?: Date;
  lastUpdatedDate?: Date;
}
export const Stage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentId: S.optional(S.String),
    clientCertificateId: S.optional(S.String),
    stageName: S.optional(S.String),
    description: S.optional(S.String),
    cacheClusterEnabled: S.optional(S.Boolean),
    cacheClusterSize: S.optional(CacheClusterSize),
    cacheClusterStatus: S.optional(CacheClusterStatus),
    methodSettings: S.optional(MapOfMethodSettings),
    variables: S.optional(MapOfStringToString),
    documentationVersion: S.optional(S.String),
    accessLogSettings: S.optional(AccessLogSettings),
    canarySettings: S.optional(CanarySettings),
    tracingEnabled: S.optional(S.Boolean),
    webAclArn: S.optional(S.String),
    tags: S.optional(MapOfStringToString),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "Stage" }) as any as S.Schema<Stage>;
export interface ThrottleSettings {
  burstLimit?: number;
  rateLimit?: number;
}
export const ThrottleSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    burstLimit: S.optional(S.Number),
    rateLimit: S.optional(S.Number),
  }),
).annotate({
  identifier: "ThrottleSettings",
}) as any as S.Schema<ThrottleSettings>;
export type MapOfApiStageThrottleSettings = {
  [key: string]: ThrottleSettings | undefined;
};
export const MapOfApiStageThrottleSettings = /*@__PURE__*/ S.Record(
  S.String,
  ThrottleSettings.pipe(S.optional),
);
export interface ApiStage {
  apiId?: string;
  stage?: string;
  throttle?: { [key: string]: ThrottleSettings | undefined };
}
export const ApiStage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.optional(S.String),
    stage: S.optional(S.String),
    throttle: S.optional(MapOfApiStageThrottleSettings),
  }),
).annotate({ identifier: "ApiStage" }) as any as S.Schema<ApiStage>;
export type ListOfApiStage = ApiStage[];
export const ListOfApiStage = /*@__PURE__*/ S.Array(ApiStage);
export type QuotaPeriodType = "DAY" | "WEEK" | "MONTH" | (string & {});
export const QuotaPeriodType = S.String;

export interface QuotaSettings {
  limit?: number;
  offset?: number;
  period?: QuotaPeriodType;
}
export const QuotaSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    limit: S.optional(S.Number),
    offset: S.optional(S.Number),
    period: S.optional(QuotaPeriodType),
  }),
).annotate({ identifier: "QuotaSettings" }) as any as S.Schema<QuotaSettings>;
export interface CreateUsagePlanRequest {
  name: string;
  description?: string;
  apiStages?: ApiStage[];
  throttle?: ThrottleSettings;
  quota?: QuotaSettings;
  tags?: { [key: string]: string | undefined };
}
export const CreateUsagePlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    apiStages: S.optional(ListOfApiStage),
    throttle: S.optional(ThrottleSettings),
    quota: S.optional(QuotaSettings),
    tags: S.optional(MapOfStringToString),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/usageplans" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateUsagePlanRequest",
}) as any as S.Schema<CreateUsagePlanRequest>;
export interface UsagePlan {
  id?: string;
  name?: string;
  description?: string;
  apiStages?: ApiStage[];
  throttle?: ThrottleSettings;
  quota?: QuotaSettings;
  productCode?: string;
  tags?: { [key: string]: string | undefined };
}
export const UsagePlan = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    apiStages: S.optional(ListOfApiStage),
    throttle: S.optional(ThrottleSettings),
    quota: S.optional(QuotaSettings),
    productCode: S.optional(S.String),
    tags: S.optional(MapOfStringToString),
  }),
).annotate({ identifier: "UsagePlan" }) as any as S.Schema<UsagePlan>;
export interface CreateUsagePlanKeyRequest {
  usagePlanId: string;
  keyId: string;
  keyType: string;
}
export const CreateUsagePlanKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    usagePlanId: S.String.pipe(T.HttpLabel("usagePlanId")),
    keyId: S.String,
    keyType: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/usageplans/{usagePlanId}/keys" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateUsagePlanKeyRequest",
}) as any as S.Schema<CreateUsagePlanKeyRequest>;
export interface UsagePlanKey {
  id?: string;
  type?: string;
  value?: string;
  name?: string;
}
export const UsagePlanKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    type: S.optional(S.String),
    value: S.optional(S.String),
    name: S.optional(S.String),
  }),
).annotate({ identifier: "UsagePlanKey" }) as any as S.Schema<UsagePlanKey>;
export interface CreateVpcLinkRequest {
  name: string;
  description?: string;
  targetArns: string[];
  tags?: { [key: string]: string | undefined };
}
export const CreateVpcLinkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    targetArns: ListOfString,
    tags: S.optional(MapOfStringToString),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/vpclinks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateVpcLinkRequest",
}) as any as S.Schema<CreateVpcLinkRequest>;
export type VpcLinkStatus =
  | "AVAILABLE"
  | "PENDING"
  | "DELETING"
  | "FAILED"
  | (string & {});
export const VpcLinkStatus = S.String;

export interface VpcLink {
  id?: string;
  name?: string;
  description?: string;
  targetArns?: string[];
  status?: VpcLinkStatus;
  statusMessage?: string;
  tags?: { [key: string]: string | undefined };
}
export const VpcLink = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    targetArns: S.optional(ListOfString),
    status: S.optional(VpcLinkStatus),
    statusMessage: S.optional(S.String),
    tags: S.optional(MapOfStringToString),
  }),
).annotate({ identifier: "VpcLink" }) as any as S.Schema<VpcLink>;
export interface DeleteApiKeyRequest {
  apiKey: string;
}
export const DeleteApiKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apiKey: S.String.pipe(T.HttpLabel("apiKey")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/apikeys/{apiKey}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteApiKeyRequest",
}) as any as S.Schema<DeleteApiKeyRequest>;
export interface DeleteApiKeyResponse {}
export const DeleteApiKeyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteApiKeyResponse",
}) as any as S.Schema<DeleteApiKeyResponse>;
export interface DeleteAuthorizerRequest {
  restApiId: string;
  authorizerId: string;
}
export const DeleteAuthorizerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    authorizerId: S.String.pipe(T.HttpLabel("authorizerId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/restapis/{restApiId}/authorizers/{authorizerId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAuthorizerRequest",
}) as any as S.Schema<DeleteAuthorizerRequest>;
export interface DeleteAuthorizerResponse {}
export const DeleteAuthorizerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAuthorizerResponse",
}) as any as S.Schema<DeleteAuthorizerResponse>;
export interface DeleteBasePathMappingRequest {
  domainName: string;
  domainNameId?: string;
  basePath: string;
}
export const DeleteBasePathMappingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainName: S.String.pipe(T.HttpLabel("domainName")),
    domainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
    basePath: S.String.pipe(T.HttpLabel("basePath")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/domainnames/{domainName}/basepathmappings/{basePath}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBasePathMappingRequest",
}) as any as S.Schema<DeleteBasePathMappingRequest>;
export interface DeleteBasePathMappingResponse {}
export const DeleteBasePathMappingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteBasePathMappingResponse",
}) as any as S.Schema<DeleteBasePathMappingResponse>;
export interface DeleteClientCertificateRequest {
  clientCertificateId: string;
}
export const DeleteClientCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientCertificateId: S.String.pipe(T.HttpLabel("clientCertificateId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/clientcertificates/{clientCertificateId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteClientCertificateRequest",
}) as any as S.Schema<DeleteClientCertificateRequest>;
export interface DeleteClientCertificateResponse {}
export const DeleteClientCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteClientCertificateResponse",
}) as any as S.Schema<DeleteClientCertificateResponse>;
export interface DeleteDeploymentRequest {
  restApiId: string;
  deploymentId: string;
}
export const DeleteDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    deploymentId: S.String.pipe(T.HttpLabel("deploymentId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/restapis/{restApiId}/deployments/{deploymentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDeploymentRequest",
}) as any as S.Schema<DeleteDeploymentRequest>;
export interface DeleteDeploymentResponse {}
export const DeleteDeploymentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDeploymentResponse",
}) as any as S.Schema<DeleteDeploymentResponse>;
export interface DeleteDocumentationPartRequest {
  restApiId: string;
  documentationPartId: string;
}
export const DeleteDocumentationPartRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    documentationPartId: S.String.pipe(T.HttpLabel("documentationPartId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/restapis/{restApiId}/documentation/parts/{documentationPartId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDocumentationPartRequest",
}) as any as S.Schema<DeleteDocumentationPartRequest>;
export interface DeleteDocumentationPartResponse {}
export const DeleteDocumentationPartResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDocumentationPartResponse",
}) as any as S.Schema<DeleteDocumentationPartResponse>;
export interface DeleteDocumentationVersionRequest {
  restApiId: string;
  documentationVersion: string;
}
export const DeleteDocumentationVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    documentationVersion: S.String.pipe(T.HttpLabel("documentationVersion")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/restapis/{restApiId}/documentation/versions/{documentationVersion}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDocumentationVersionRequest",
}) as any as S.Schema<DeleteDocumentationVersionRequest>;
export interface DeleteDocumentationVersionResponse {}
export const DeleteDocumentationVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDocumentationVersionResponse",
}) as any as S.Schema<DeleteDocumentationVersionResponse>;
export interface DeleteDomainNameRequest {
  domainName: string;
  domainNameId?: string;
}
export const DeleteDomainNameRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainName: S.String.pipe(T.HttpLabel("domainName")),
    domainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/domainnames/{domainName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDomainNameRequest",
}) as any as S.Schema<DeleteDomainNameRequest>;
export interface DeleteDomainNameResponse {}
export const DeleteDomainNameResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDomainNameResponse",
}) as any as S.Schema<DeleteDomainNameResponse>;
export interface DeleteDomainNameAccessAssociationRequest {
  domainNameAccessAssociationArn: string;
}
export const DeleteDomainNameAccessAssociationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      domainNameAccessAssociationArn: S.String.pipe(
        T.HttpLabel("domainNameAccessAssociationArn"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/domainnameaccessassociations/{domainNameAccessAssociationArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteDomainNameAccessAssociationRequest",
}) as any as S.Schema<DeleteDomainNameAccessAssociationRequest>;
export interface DeleteDomainNameAccessAssociationResponse {}
export const DeleteDomainNameAccessAssociationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteDomainNameAccessAssociationResponse",
  }) as any as S.Schema<DeleteDomainNameAccessAssociationResponse>;
export type GatewayResponseType =
  | "DEFAULT_4XX"
  | "DEFAULT_5XX"
  | "RESOURCE_NOT_FOUND"
  | "UNAUTHORIZED"
  | "INVALID_API_KEY"
  | "ACCESS_DENIED"
  | "AUTHORIZER_FAILURE"
  | "AUTHORIZER_CONFIGURATION_ERROR"
  | "INVALID_SIGNATURE"
  | "EXPIRED_TOKEN"
  | "MISSING_AUTHENTICATION_TOKEN"
  | "INTEGRATION_FAILURE"
  | "INTEGRATION_TIMEOUT"
  | "API_CONFIGURATION_ERROR"
  | "UNSUPPORTED_MEDIA_TYPE"
  | "BAD_REQUEST_PARAMETERS"
  | "BAD_REQUEST_BODY"
  | "REQUEST_TOO_LARGE"
  | "THROTTLED"
  | "QUOTA_EXCEEDED"
  | "WAF_FILTERED"
  | (string & {});
export const GatewayResponseType = S.String;

export interface DeleteGatewayResponseRequest {
  restApiId: string;
  responseType: GatewayResponseType;
}
export const DeleteGatewayResponseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    responseType: GatewayResponseType.pipe(T.HttpLabel("responseType")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/restapis/{restApiId}/gatewayresponses/{responseType}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGatewayResponseRequest",
}) as any as S.Schema<DeleteGatewayResponseRequest>;
export interface DeleteGatewayResponseResponse {}
export const DeleteGatewayResponseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteGatewayResponseResponse",
}) as any as S.Schema<DeleteGatewayResponseResponse>;
export interface DeleteIntegrationRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
}
export const DeleteIntegrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    resourceId: S.String.pipe(T.HttpLabel("resourceId")),
    httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/integration",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIntegrationRequest",
}) as any as S.Schema<DeleteIntegrationRequest>;
export interface DeleteIntegrationResponse {}
export const DeleteIntegrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteIntegrationResponse",
}) as any as S.Schema<DeleteIntegrationResponse>;
export interface DeleteIntegrationResponseRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
  statusCode: string;
}
export const DeleteIntegrationResponseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    resourceId: S.String.pipe(T.HttpLabel("resourceId")),
    httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
    statusCode: S.String.pipe(T.HttpLabel("statusCode")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/integration/responses/{statusCode}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIntegrationResponseRequest",
}) as any as S.Schema<DeleteIntegrationResponseRequest>;
export interface DeleteIntegrationResponseResponse {}
export const DeleteIntegrationResponseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteIntegrationResponseResponse",
}) as any as S.Schema<DeleteIntegrationResponseResponse>;
export interface DeleteMethodRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
}
export const DeleteMethodRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    resourceId: S.String.pipe(T.HttpLabel("resourceId")),
    httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMethodRequest",
}) as any as S.Schema<DeleteMethodRequest>;
export interface DeleteMethodResponse {}
export const DeleteMethodResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMethodResponse",
}) as any as S.Schema<DeleteMethodResponse>;
export interface DeleteMethodResponseRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
  statusCode: string;
}
export const DeleteMethodResponseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    resourceId: S.String.pipe(T.HttpLabel("resourceId")),
    httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
    statusCode: S.String.pipe(T.HttpLabel("statusCode")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/responses/{statusCode}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMethodResponseRequest",
}) as any as S.Schema<DeleteMethodResponseRequest>;
export interface DeleteMethodResponseResponse {}
export const DeleteMethodResponseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMethodResponseResponse",
}) as any as S.Schema<DeleteMethodResponseResponse>;
export interface DeleteModelRequest {
  restApiId: string;
  modelName: string;
}
export const DeleteModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    modelName: S.String.pipe(T.HttpLabel("modelName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/restapis/{restApiId}/models/{modelName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteModelRequest",
}) as any as S.Schema<DeleteModelRequest>;
export interface DeleteModelResponse {}
export const DeleteModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteModelResponse",
}) as any as S.Schema<DeleteModelResponse>;
export interface DeleteRequestValidatorRequest {
  restApiId: string;
  requestValidatorId: string;
}
export const DeleteRequestValidatorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    requestValidatorId: S.String.pipe(T.HttpLabel("requestValidatorId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/restapis/{restApiId}/requestvalidators/{requestValidatorId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRequestValidatorRequest",
}) as any as S.Schema<DeleteRequestValidatorRequest>;
export interface DeleteRequestValidatorResponse {}
export const DeleteRequestValidatorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRequestValidatorResponse",
}) as any as S.Schema<DeleteRequestValidatorResponse>;
export interface DeleteResourceRequest {
  restApiId: string;
  resourceId: string;
}
export const DeleteResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    resourceId: S.String.pipe(T.HttpLabel("resourceId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/restapis/{restApiId}/resources/{resourceId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteResourceRequest",
}) as any as S.Schema<DeleteResourceRequest>;
export interface DeleteResourceResponse {}
export const DeleteResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteResourceResponse",
}) as any as S.Schema<DeleteResourceResponse>;
export interface DeleteRestApiRequest {
  restApiId: string;
}
export const DeleteRestApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ restApiId: S.String.pipe(T.HttpLabel("restApiId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/restapis/{restApiId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRestApiRequest",
}) as any as S.Schema<DeleteRestApiRequest>;
export interface DeleteRestApiResponse {}
export const DeleteRestApiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRestApiResponse",
}) as any as S.Schema<DeleteRestApiResponse>;
export interface DeleteStageRequest {
  restApiId: string;
  stageName: string;
}
export const DeleteStageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    stageName: S.String.pipe(T.HttpLabel("stageName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/restapis/{restApiId}/stages/{stageName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteStageRequest",
}) as any as S.Schema<DeleteStageRequest>;
export interface DeleteStageResponse {}
export const DeleteStageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteStageResponse",
}) as any as S.Schema<DeleteStageResponse>;
export interface DeleteUsagePlanRequest {
  usagePlanId: string;
}
export const DeleteUsagePlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ usagePlanId: S.String.pipe(T.HttpLabel("usagePlanId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/usageplans/{usagePlanId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteUsagePlanRequest",
}) as any as S.Schema<DeleteUsagePlanRequest>;
export interface DeleteUsagePlanResponse {}
export const DeleteUsagePlanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteUsagePlanResponse",
}) as any as S.Schema<DeleteUsagePlanResponse>;
export interface DeleteUsagePlanKeyRequest {
  usagePlanId: string;
  keyId: string;
}
export const DeleteUsagePlanKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    usagePlanId: S.String.pipe(T.HttpLabel("usagePlanId")),
    keyId: S.String.pipe(T.HttpLabel("keyId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/usageplans/{usagePlanId}/keys/{keyId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteUsagePlanKeyRequest",
}) as any as S.Schema<DeleteUsagePlanKeyRequest>;
export interface DeleteUsagePlanKeyResponse {}
export const DeleteUsagePlanKeyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteUsagePlanKeyResponse",
}) as any as S.Schema<DeleteUsagePlanKeyResponse>;
export interface DeleteVpcLinkRequest {
  vpcLinkId: string;
}
export const DeleteVpcLinkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vpcLinkId: S.String.pipe(T.HttpLabel("vpcLinkId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/vpclinks/{vpcLinkId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVpcLinkRequest",
}) as any as S.Schema<DeleteVpcLinkRequest>;
export interface DeleteVpcLinkResponse {}
export const DeleteVpcLinkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteVpcLinkResponse",
}) as any as S.Schema<DeleteVpcLinkResponse>;
export interface FlushStageAuthorizersCacheRequest {
  restApiId: string;
  stageName: string;
}
export const FlushStageAuthorizersCacheRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    stageName: S.String.pipe(T.HttpLabel("stageName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/restapis/{restApiId}/stages/{stageName}/cache/authorizers",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "FlushStageAuthorizersCacheRequest",
}) as any as S.Schema<FlushStageAuthorizersCacheRequest>;
export interface FlushStageAuthorizersCacheResponse {}
export const FlushStageAuthorizersCacheResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "FlushStageAuthorizersCacheResponse",
}) as any as S.Schema<FlushStageAuthorizersCacheResponse>;
export interface FlushStageCacheRequest {
  restApiId: string;
  stageName: string;
}
export const FlushStageCacheRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    stageName: S.String.pipe(T.HttpLabel("stageName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/restapis/{restApiId}/stages/{stageName}/cache/data",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "FlushStageCacheRequest",
}) as any as S.Schema<FlushStageCacheRequest>;
export interface FlushStageCacheResponse {}
export const FlushStageCacheResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "FlushStageCacheResponse",
}) as any as S.Schema<FlushStageCacheResponse>;
export interface GenerateClientCertificateRequest {
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export const GenerateClientCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    tags: S.optional(MapOfStringToString),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/clientcertificates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GenerateClientCertificateRequest",
}) as any as S.Schema<GenerateClientCertificateRequest>;
export interface ClientCertificate {
  clientCertificateId?: string;
  description?: string;
  pemEncodedCertificate?: string;
  createdDate?: Date;
  expirationDate?: Date;
  tags?: { [key: string]: string | undefined };
}
export const ClientCertificate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientCertificateId: S.optional(S.String),
    description: S.optional(S.String),
    pemEncodedCertificate: S.optional(S.String),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    expirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    tags: S.optional(MapOfStringToString),
  }),
).annotate({
  identifier: "ClientCertificate",
}) as any as S.Schema<ClientCertificate>;
export interface GetAccountRequest {}
export const GetAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/account" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAccountRequest",
}) as any as S.Schema<GetAccountRequest>;
export interface Account {
  cloudwatchRoleArn?: string;
  throttleSettings?: ThrottleSettings;
  features?: string[];
  apiKeyVersion?: string;
}
export const Account = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cloudwatchRoleArn: S.optional(S.String),
    throttleSettings: S.optional(ThrottleSettings),
    features: S.optional(ListOfString),
    apiKeyVersion: S.optional(S.String),
  }),
).annotate({ identifier: "Account" }) as any as S.Schema<Account>;
export interface GetApiKeyRequest {
  apiKey: string;
  includeValue?: boolean;
}
export const GetApiKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiKey: S.String.pipe(T.HttpLabel("apiKey")),
    includeValue: S.optional(S.Boolean).pipe(T.HttpQuery("includeValue")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/apikeys/{apiKey}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetApiKeyRequest",
}) as any as S.Schema<GetApiKeyRequest>;
export interface GetApiKeysRequest {
  position?: string;
  limit?: number;
  nameQuery?: string;
  customerId?: string;
  includeValues?: boolean;
}
export const GetApiKeysRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    nameQuery: S.optional(S.String).pipe(T.HttpQuery("name")),
    customerId: S.optional(S.String).pipe(T.HttpQuery("customerId")),
    includeValues: S.optional(S.Boolean).pipe(T.HttpQuery("includeValues")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/apikeys" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetApiKeysRequest",
}) as any as S.Schema<GetApiKeysRequest>;
export type ListOfApiKey = ApiKey[];
export const ListOfApiKey = /*@__PURE__*/ S.Array(ApiKey);
export interface ApiKeys {
  warnings?: string[];
  items?: ApiKey[];
  position?: string;
}
export const ApiKeys = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    warnings: S.optional(ListOfString),
    items: S.optional(ListOfApiKey),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
  }).pipe(S.encodeKeys({ items: "item" })),
).annotate({ identifier: "ApiKeys" }) as any as S.Schema<ApiKeys>;
export interface GetAuthorizerRequest {
  restApiId: string;
  authorizerId: string;
}
export const GetAuthorizerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    authorizerId: S.String.pipe(T.HttpLabel("authorizerId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/restapis/{restApiId}/authorizers/{authorizerId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAuthorizerRequest",
}) as any as S.Schema<GetAuthorizerRequest>;
export interface GetAuthorizersRequest {
  restApiId: string;
  position?: string;
  limit?: number;
}
export const GetAuthorizersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/restapis/{restApiId}/authorizers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAuthorizersRequest",
}) as any as S.Schema<GetAuthorizersRequest>;
export type ListOfAuthorizer = Authorizer[];
export const ListOfAuthorizer = /*@__PURE__*/ S.Array(Authorizer);
export interface Authorizers {
  items?: Authorizer[];
  position?: string;
}
export const Authorizers = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ListOfAuthorizer),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
  }).pipe(S.encodeKeys({ items: "item" })),
).annotate({ identifier: "Authorizers" }) as any as S.Schema<Authorizers>;
export interface GetBasePathMappingRequest {
  domainName: string;
  domainNameId?: string;
  basePath: string;
}
export const GetBasePathMappingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainName: S.String.pipe(T.HttpLabel("domainName")),
    domainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
    basePath: S.String.pipe(T.HttpLabel("basePath")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/domainnames/{domainName}/basepathmappings/{basePath}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBasePathMappingRequest",
}) as any as S.Schema<GetBasePathMappingRequest>;
export interface GetBasePathMappingsRequest {
  domainName: string;
  domainNameId?: string;
  position?: string;
  limit?: number;
}
export const GetBasePathMappingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainName: S.String.pipe(T.HttpLabel("domainName")),
    domainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/domainnames/{domainName}/basepathmappings",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBasePathMappingsRequest",
}) as any as S.Schema<GetBasePathMappingsRequest>;
export type ListOfBasePathMapping = BasePathMapping[];
export const ListOfBasePathMapping = /*@__PURE__*/ S.Array(BasePathMapping);
export interface BasePathMappings {
  items?: BasePathMapping[];
  position?: string;
}
export const BasePathMappings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ListOfBasePathMapping),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
  }).pipe(S.encodeKeys({ items: "item" })),
).annotate({
  identifier: "BasePathMappings",
}) as any as S.Schema<BasePathMappings>;
export interface GetClientCertificateRequest {
  clientCertificateId: string;
}
export const GetClientCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientCertificateId: S.String.pipe(T.HttpLabel("clientCertificateId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/clientcertificates/{clientCertificateId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetClientCertificateRequest",
}) as any as S.Schema<GetClientCertificateRequest>;
export interface GetClientCertificatesRequest {
  position?: string;
  limit?: number;
}
export const GetClientCertificatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/clientcertificates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetClientCertificatesRequest",
}) as any as S.Schema<GetClientCertificatesRequest>;
export type ListOfClientCertificate = ClientCertificate[];
export const ListOfClientCertificate = /*@__PURE__*/ S.Array(ClientCertificate);
export interface ClientCertificates {
  items?: ClientCertificate[];
  position?: string;
}
export const ClientCertificates = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ListOfClientCertificate),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
  }).pipe(S.encodeKeys({ items: "item" })),
).annotate({
  identifier: "ClientCertificates",
}) as any as S.Schema<ClientCertificates>;
export interface GetDeploymentRequest {
  restApiId: string;
  deploymentId: string;
  embed?: string[];
}
export const GetDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    deploymentId: S.String.pipe(T.HttpLabel("deploymentId")),
    embed: S.optional(ListOfString).pipe(T.HttpQuery("embed")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/restapis/{restApiId}/deployments/{deploymentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDeploymentRequest",
}) as any as S.Schema<GetDeploymentRequest>;
export interface GetDeploymentsRequest {
  restApiId: string;
  position?: string;
  limit?: number;
}
export const GetDeploymentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/restapis/{restApiId}/deployments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDeploymentsRequest",
}) as any as S.Schema<GetDeploymentsRequest>;
export type ListOfDeployment = Deployment[];
export const ListOfDeployment = /*@__PURE__*/ S.Array(Deployment);
export interface Deployments {
  items?: Deployment[];
  position?: string;
}
export const Deployments = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ListOfDeployment),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
  }).pipe(S.encodeKeys({ items: "item" })),
).annotate({ identifier: "Deployments" }) as any as S.Schema<Deployments>;
export interface GetDocumentationPartRequest {
  restApiId: string;
  documentationPartId: string;
}
export const GetDocumentationPartRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    documentationPartId: S.String.pipe(T.HttpLabel("documentationPartId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/restapis/{restApiId}/documentation/parts/{documentationPartId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDocumentationPartRequest",
}) as any as S.Schema<GetDocumentationPartRequest>;
export type LocationStatusType = "DOCUMENTED" | "UNDOCUMENTED" | (string & {});
export const LocationStatusType = S.String;

export interface GetDocumentationPartsRequest {
  restApiId: string;
  type?: DocumentationPartType;
  nameQuery?: string;
  path?: string;
  position?: string;
  limit?: number;
  locationStatus?: LocationStatusType;
}
export const GetDocumentationPartsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    type: S.optional(DocumentationPartType).pipe(T.HttpQuery("type")),
    nameQuery: S.optional(S.String).pipe(T.HttpQuery("name")),
    path: S.optional(S.String).pipe(T.HttpQuery("path")),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    locationStatus: S.optional(LocationStatusType).pipe(
      T.HttpQuery("locationStatus"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/restapis/{restApiId}/documentation/parts",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDocumentationPartsRequest",
}) as any as S.Schema<GetDocumentationPartsRequest>;
export type ListOfDocumentationPart = DocumentationPart[];
export const ListOfDocumentationPart = /*@__PURE__*/ S.Array(DocumentationPart);
export interface DocumentationParts {
  items?: DocumentationPart[];
  position?: string;
}
export const DocumentationParts = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ListOfDocumentationPart),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
  }).pipe(S.encodeKeys({ items: "item" })),
).annotate({
  identifier: "DocumentationParts",
}) as any as S.Schema<DocumentationParts>;
export interface GetDocumentationVersionRequest {
  restApiId: string;
  documentationVersion: string;
}
export const GetDocumentationVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    documentationVersion: S.String.pipe(T.HttpLabel("documentationVersion")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/restapis/{restApiId}/documentation/versions/{documentationVersion}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDocumentationVersionRequest",
}) as any as S.Schema<GetDocumentationVersionRequest>;
export interface GetDocumentationVersionsRequest {
  restApiId: string;
  position?: string;
  limit?: number;
}
export const GetDocumentationVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/restapis/{restApiId}/documentation/versions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDocumentationVersionsRequest",
}) as any as S.Schema<GetDocumentationVersionsRequest>;
export type ListOfDocumentationVersion = DocumentationVersion[];
export const ListOfDocumentationVersion =
  /*@__PURE__*/ S.Array(DocumentationVersion);
export interface DocumentationVersions {
  items?: DocumentationVersion[];
  position?: string;
}
export const DocumentationVersions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ListOfDocumentationVersion),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
  }).pipe(S.encodeKeys({ items: "item" })),
).annotate({
  identifier: "DocumentationVersions",
}) as any as S.Schema<DocumentationVersions>;
export interface GetDomainNameRequest {
  domainName: string;
  domainNameId?: string;
}
export const GetDomainNameRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainName: S.String.pipe(T.HttpLabel("domainName")),
    domainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/domainnames/{domainName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDomainNameRequest",
}) as any as S.Schema<GetDomainNameRequest>;
export type ResourceOwner = "SELF" | "OTHER_ACCOUNTS" | (string & {});
export const ResourceOwner = S.String;

export interface GetDomainNameAccessAssociationsRequest {
  position?: string;
  limit?: number;
  resourceOwner?: ResourceOwner;
}
export const GetDomainNameAccessAssociationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      position: S.optional(S.String).pipe(T.HttpQuery("position")),
      limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
      resourceOwner: S.optional(ResourceOwner).pipe(
        T.HttpQuery("resourceOwner"),
      ),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/domainnameaccessassociations" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetDomainNameAccessAssociationsRequest",
}) as any as S.Schema<GetDomainNameAccessAssociationsRequest>;
export type ListOfDomainNameAccessAssociation = DomainNameAccessAssociation[];
export const ListOfDomainNameAccessAssociation = /*@__PURE__*/ S.Array(
  DomainNameAccessAssociation,
);
export interface DomainNameAccessAssociations {
  items?: DomainNameAccessAssociation[];
  position?: string;
}
export const DomainNameAccessAssociations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ListOfDomainNameAccessAssociation),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
  }).pipe(S.encodeKeys({ items: "item" })),
).annotate({
  identifier: "DomainNameAccessAssociations",
}) as any as S.Schema<DomainNameAccessAssociations>;
export interface GetDomainNamesRequest {
  position?: string;
  limit?: number;
  resourceOwner?: ResourceOwner;
}
export const GetDomainNamesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    resourceOwner: S.optional(ResourceOwner).pipe(T.HttpQuery("resourceOwner")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/domainnames" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDomainNamesRequest",
}) as any as S.Schema<GetDomainNamesRequest>;
export type ListOfDomainName = DomainName[];
export const ListOfDomainName = /*@__PURE__*/ S.Array(DomainName);
export interface DomainNames {
  items?: DomainName[];
  position?: string;
}
export const DomainNames = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ListOfDomainName),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
  }).pipe(S.encodeKeys({ items: "item" })),
).annotate({ identifier: "DomainNames" }) as any as S.Schema<DomainNames>;
export interface GetExportRequest {
  restApiId: string;
  stageName: string;
  exportType: string;
  parameters?: { [key: string]: string | undefined };
  accepts?: string;
}
export const GetExportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    stageName: S.String.pipe(T.HttpLabel("stageName")),
    exportType: S.String.pipe(T.HttpLabel("exportType")),
    parameters: S.optional(MapOfStringToString).pipe(T.HttpQueryParams()),
    accepts: S.optional(S.String).pipe(T.HttpHeader("Accept")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/restapis/{restApiId}/stages/{stageName}/exports/{exportType}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetExportRequest",
}) as any as S.Schema<GetExportRequest>;
export interface ExportResponse {
  contentType?: string;
  contentDisposition?: string;
  body?: T.StreamingOutputBody;
}
export const ExportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    contentDisposition: S.optional(S.String).pipe(
      T.HttpHeader("Content-Disposition"),
    ),
    body: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
  }),
).annotate({ identifier: "ExportResponse" }) as any as S.Schema<ExportResponse>;
export interface GetGatewayResponseRequest {
  restApiId: string;
  responseType: GatewayResponseType;
}
export const GetGatewayResponseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    responseType: GatewayResponseType.pipe(T.HttpLabel("responseType")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/restapis/{restApiId}/gatewayresponses/{responseType}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGatewayResponseRequest",
}) as any as S.Schema<GetGatewayResponseRequest>;
export interface GatewayResponse {
  responseType?: GatewayResponseType;
  statusCode?: string;
  responseParameters?: { [key: string]: string | undefined };
  responseTemplates?: { [key: string]: string | undefined };
  defaultResponse?: boolean;
}
export const GatewayResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    responseType: S.optional(GatewayResponseType),
    statusCode: S.optional(S.String),
    responseParameters: S.optional(MapOfStringToString),
    responseTemplates: S.optional(MapOfStringToString),
    defaultResponse: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GatewayResponse",
}) as any as S.Schema<GatewayResponse>;
export interface GetGatewayResponsesRequest {
  restApiId: string;
  position?: string;
  limit?: number;
}
export const GetGatewayResponsesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/restapis/{restApiId}/gatewayresponses" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGatewayResponsesRequest",
}) as any as S.Schema<GetGatewayResponsesRequest>;
export type ListOfGatewayResponse = GatewayResponse[];
export const ListOfGatewayResponse = /*@__PURE__*/ S.Array(GatewayResponse);
export interface GatewayResponses {
  items?: GatewayResponse[];
  position?: string;
}
export const GatewayResponses = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ListOfGatewayResponse),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
  }).pipe(S.encodeKeys({ items: "item" })),
).annotate({
  identifier: "GatewayResponses",
}) as any as S.Schema<GatewayResponses>;
export interface GetIntegrationRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
}
export const GetIntegrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    resourceId: S.String.pipe(T.HttpLabel("resourceId")),
    httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/integration",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIntegrationRequest",
}) as any as S.Schema<GetIntegrationRequest>;
export interface GetIntegrationResponseRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
  statusCode: string;
}
export const GetIntegrationResponseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    resourceId: S.String.pipe(T.HttpLabel("resourceId")),
    httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
    statusCode: S.String.pipe(T.HttpLabel("statusCode")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/integration/responses/{statusCode}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIntegrationResponseRequest",
}) as any as S.Schema<GetIntegrationResponseRequest>;
export interface GetMethodRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
}
export const GetMethodRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    resourceId: S.String.pipe(T.HttpLabel("resourceId")),
    httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMethodRequest",
}) as any as S.Schema<GetMethodRequest>;
export interface GetMethodResponseRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
  statusCode: string;
}
export const GetMethodResponseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    resourceId: S.String.pipe(T.HttpLabel("resourceId")),
    httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
    statusCode: S.String.pipe(T.HttpLabel("statusCode")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/responses/{statusCode}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMethodResponseRequest",
}) as any as S.Schema<GetMethodResponseRequest>;
export interface GetModelRequest {
  restApiId: string;
  modelName: string;
  flatten?: boolean;
}
export const GetModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    modelName: S.String.pipe(T.HttpLabel("modelName")),
    flatten: S.optional(S.Boolean).pipe(T.HttpQuery("flatten")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/restapis/{restApiId}/models/{modelName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetModelRequest",
}) as any as S.Schema<GetModelRequest>;
export interface GetModelsRequest {
  restApiId: string;
  position?: string;
  limit?: number;
}
export const GetModelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/restapis/{restApiId}/models" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetModelsRequest",
}) as any as S.Schema<GetModelsRequest>;
export type ListOfModel = Model[];
export const ListOfModel = /*@__PURE__*/ S.Array(Model);
export interface Models {
  items?: Model[];
  position?: string;
}
export const Models = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ListOfModel),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
  }).pipe(S.encodeKeys({ items: "item" })),
).annotate({ identifier: "Models" }) as any as S.Schema<Models>;
export interface GetModelTemplateRequest {
  restApiId: string;
  modelName: string;
}
export const GetModelTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    modelName: S.String.pipe(T.HttpLabel("modelName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/restapis/{restApiId}/models/{modelName}/default_template",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetModelTemplateRequest",
}) as any as S.Schema<GetModelTemplateRequest>;
export interface Template {
  value?: string;
}
export const Template = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: S.optional(S.String) }),
).annotate({ identifier: "Template" }) as any as S.Schema<Template>;
export interface GetRequestValidatorRequest {
  restApiId: string;
  requestValidatorId: string;
}
export const GetRequestValidatorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    requestValidatorId: S.String.pipe(T.HttpLabel("requestValidatorId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/restapis/{restApiId}/requestvalidators/{requestValidatorId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRequestValidatorRequest",
}) as any as S.Schema<GetRequestValidatorRequest>;
export interface GetRequestValidatorsRequest {
  restApiId: string;
  position?: string;
  limit?: number;
}
export const GetRequestValidatorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/restapis/{restApiId}/requestvalidators" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRequestValidatorsRequest",
}) as any as S.Schema<GetRequestValidatorsRequest>;
export type ListOfRequestValidator = RequestValidator[];
export const ListOfRequestValidator = /*@__PURE__*/ S.Array(RequestValidator);
export interface RequestValidators {
  items?: RequestValidator[];
  position?: string;
}
export const RequestValidators = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ListOfRequestValidator),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
  }).pipe(S.encodeKeys({ items: "item" })),
).annotate({
  identifier: "RequestValidators",
}) as any as S.Schema<RequestValidators>;
export interface GetResourceRequest {
  restApiId: string;
  resourceId: string;
  embed?: string[];
}
export const GetResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    resourceId: S.String.pipe(T.HttpLabel("resourceId")),
    embed: S.optional(ListOfString).pipe(T.HttpQuery("embed")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/restapis/{restApiId}/resources/{resourceId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourceRequest",
}) as any as S.Schema<GetResourceRequest>;
export interface GetResourcesRequest {
  restApiId: string;
  position?: string;
  limit?: number;
  embed?: string[];
}
export const GetResourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    embed: S.optional(ListOfString).pipe(T.HttpQuery("embed")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/restapis/{restApiId}/resources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourcesRequest",
}) as any as S.Schema<GetResourcesRequest>;
export type ListOfResource = Resource[];
export const ListOfResource = /*@__PURE__*/ S.Array(Resource);
export interface Resources {
  items?: Resource[];
  position?: string;
}
export const Resources = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ListOfResource),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
  }).pipe(S.encodeKeys({ items: "item" })),
).annotate({ identifier: "Resources" }) as any as S.Schema<Resources>;
export interface GetRestApiRequest {
  restApiId: string;
}
export const GetRestApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ restApiId: S.String.pipe(T.HttpLabel("restApiId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/restapis/{restApiId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRestApiRequest",
}) as any as S.Schema<GetRestApiRequest>;
export interface GetRestApisRequest {
  position?: string;
  limit?: number;
}
export const GetRestApisRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/restapis" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRestApisRequest",
}) as any as S.Schema<GetRestApisRequest>;
export type ListOfRestApi = RestApi[];
export const ListOfRestApi = /*@__PURE__*/ S.Array(RestApi);
export interface RestApis {
  items?: RestApi[];
  position?: string;
}
export const RestApis = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ListOfRestApi),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
  }).pipe(S.encodeKeys({ items: "item" })),
).annotate({ identifier: "RestApis" }) as any as S.Schema<RestApis>;
export interface GetSdkRequest {
  restApiId: string;
  stageName: string;
  sdkType: string;
  parameters?: { [key: string]: string | undefined };
}
export const GetSdkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    stageName: S.String.pipe(T.HttpLabel("stageName")),
    sdkType: S.String.pipe(T.HttpLabel("sdkType")),
    parameters: S.optional(MapOfStringToString).pipe(T.HttpQueryParams()),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/restapis/{restApiId}/stages/{stageName}/sdks/{sdkType}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetSdkRequest" }) as any as S.Schema<GetSdkRequest>;
export interface SdkResponse {
  contentType?: string;
  contentDisposition?: string;
  body?: T.StreamingOutputBody;
}
export const SdkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    contentDisposition: S.optional(S.String).pipe(
      T.HttpHeader("Content-Disposition"),
    ),
    body: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
  }),
).annotate({ identifier: "SdkResponse" }) as any as S.Schema<SdkResponse>;
export interface GetSdkTypeRequest {
  id: string;
}
export const GetSdkTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sdktypes/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSdkTypeRequest",
}) as any as S.Schema<GetSdkTypeRequest>;
export interface SdkConfigurationProperty {
  name?: string;
  friendlyName?: string;
  description?: string;
  required?: boolean;
  defaultValue?: string;
}
export const SdkConfigurationProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    friendlyName: S.optional(S.String),
    description: S.optional(S.String),
    required: S.optional(S.Boolean),
    defaultValue: S.optional(S.String),
  }),
).annotate({
  identifier: "SdkConfigurationProperty",
}) as any as S.Schema<SdkConfigurationProperty>;
export type ListOfSdkConfigurationProperty = SdkConfigurationProperty[];
export const ListOfSdkConfigurationProperty = /*@__PURE__*/ S.Array(
  SdkConfigurationProperty,
);
export interface SdkType {
  id?: string;
  friendlyName?: string;
  description?: string;
  configurationProperties?: SdkConfigurationProperty[];
}
export const SdkType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    friendlyName: S.optional(S.String),
    description: S.optional(S.String),
    configurationProperties: S.optional(ListOfSdkConfigurationProperty),
  }),
).annotate({ identifier: "SdkType" }) as any as S.Schema<SdkType>;
export interface GetSdkTypesRequest {
  position?: string;
  limit?: number;
}
export const GetSdkTypesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sdktypes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSdkTypesRequest",
}) as any as S.Schema<GetSdkTypesRequest>;
export type ListOfSdkType = SdkType[];
export const ListOfSdkType = /*@__PURE__*/ S.Array(SdkType);
export interface SdkTypes {
  items?: SdkType[];
}
export const SdkTypes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: S.optional(ListOfSdkType) }).pipe(
    S.encodeKeys({ items: "item" }),
  ),
).annotate({ identifier: "SdkTypes" }) as any as S.Schema<SdkTypes>;
export interface GetStageRequest {
  restApiId: string;
  stageName: string;
}
export const GetStageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    stageName: S.String.pipe(T.HttpLabel("stageName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/restapis/{restApiId}/stages/{stageName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetStageRequest",
}) as any as S.Schema<GetStageRequest>;
export interface GetStagesRequest {
  restApiId: string;
  deploymentId?: string;
}
export const GetStagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    deploymentId: S.optional(S.String).pipe(T.HttpQuery("deploymentId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/restapis/{restApiId}/stages" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetStagesRequest",
}) as any as S.Schema<GetStagesRequest>;
export type ListOfStage = Stage[];
export const ListOfStage = /*@__PURE__*/ S.Array(Stage);
export interface Stages {
  item?: Stage[];
}
export const Stages = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ item: S.optional(ListOfStage) }),
).annotate({ identifier: "Stages" }) as any as S.Schema<Stages>;
export interface GetTagsRequest {
  resourceArn: string;
  position?: string;
  limit?: number;
}
export const GetTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetTagsRequest" }) as any as S.Schema<GetTagsRequest>;
export interface Tags {
  tags?: { [key: string]: string | undefined };
}
export const Tags = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(MapOfStringToString) }),
).annotate({ identifier: "Tags" }) as any as S.Schema<Tags>;
export interface GetUsageRequest {
  usagePlanId: string;
  keyId?: string;
  startDate: string;
  endDate: string;
  position?: string;
  limit?: number;
}
export const GetUsageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    usagePlanId: S.String.pipe(T.HttpLabel("usagePlanId")),
    keyId: S.optional(S.String).pipe(T.HttpQuery("keyId")),
    startDate: S.String.pipe(T.HttpQuery("startDate")),
    endDate: S.String.pipe(T.HttpQuery("endDate")),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/usageplans/{usagePlanId}/usage" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetUsageRequest",
}) as any as S.Schema<GetUsageRequest>;
export type ListOfLong = number[];
export const ListOfLong = /*@__PURE__*/ S.Array(S.Number);
export type ListOfUsage = number[][];
export const ListOfUsage = /*@__PURE__*/ S.Array(ListOfLong);
export type MapOfKeyUsages = { [key: string]: number[][] | undefined };
export const MapOfKeyUsages = /*@__PURE__*/ S.Record(
  S.String,
  ListOfUsage.pipe(S.optional),
);
export interface Usage {
  usagePlanId?: string;
  startDate?: string;
  endDate?: string;
  items?: { [key: string]: number[][] | undefined };
  position?: string;
}
export const Usage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    usagePlanId: S.optional(S.String),
    startDate: S.optional(S.String),
    endDate: S.optional(S.String),
    items: S.optional(MapOfKeyUsages),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
  }).pipe(S.encodeKeys({ items: "values" })),
).annotate({ identifier: "Usage" }) as any as S.Schema<Usage>;
export interface GetUsagePlanRequest {
  usagePlanId: string;
}
export const GetUsagePlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ usagePlanId: S.String.pipe(T.HttpLabel("usagePlanId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/usageplans/{usagePlanId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetUsagePlanRequest",
}) as any as S.Schema<GetUsagePlanRequest>;
export interface GetUsagePlanKeyRequest {
  usagePlanId: string;
  keyId: string;
}
export const GetUsagePlanKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    usagePlanId: S.String.pipe(T.HttpLabel("usagePlanId")),
    keyId: S.String.pipe(T.HttpLabel("keyId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/usageplans/{usagePlanId}/keys/{keyId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetUsagePlanKeyRequest",
}) as any as S.Schema<GetUsagePlanKeyRequest>;
export interface GetUsagePlanKeysRequest {
  usagePlanId: string;
  position?: string;
  limit?: number;
  nameQuery?: string;
}
export const GetUsagePlanKeysRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    usagePlanId: S.String.pipe(T.HttpLabel("usagePlanId")),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    nameQuery: S.optional(S.String).pipe(T.HttpQuery("name")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/usageplans/{usagePlanId}/keys" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetUsagePlanKeysRequest",
}) as any as S.Schema<GetUsagePlanKeysRequest>;
export type ListOfUsagePlanKey = UsagePlanKey[];
export const ListOfUsagePlanKey = /*@__PURE__*/ S.Array(UsagePlanKey);
export interface UsagePlanKeys {
  items?: UsagePlanKey[];
  position?: string;
}
export const UsagePlanKeys = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ListOfUsagePlanKey),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
  }).pipe(S.encodeKeys({ items: "item" })),
).annotate({ identifier: "UsagePlanKeys" }) as any as S.Schema<UsagePlanKeys>;
export interface GetUsagePlansRequest {
  position?: string;
  keyId?: string;
  limit?: number;
}
export const GetUsagePlansRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
    keyId: S.optional(S.String).pipe(T.HttpQuery("keyId")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/usageplans" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetUsagePlansRequest",
}) as any as S.Schema<GetUsagePlansRequest>;
export type ListOfUsagePlan = UsagePlan[];
export const ListOfUsagePlan = /*@__PURE__*/ S.Array(UsagePlan);
export interface UsagePlans {
  items?: UsagePlan[];
  position?: string;
}
export const UsagePlans = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ListOfUsagePlan),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
  }).pipe(S.encodeKeys({ items: "item" })),
).annotate({ identifier: "UsagePlans" }) as any as S.Schema<UsagePlans>;
export interface GetVpcLinkRequest {
  vpcLinkId: string;
}
export const GetVpcLinkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vpcLinkId: S.String.pipe(T.HttpLabel("vpcLinkId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/vpclinks/{vpcLinkId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVpcLinkRequest",
}) as any as S.Schema<GetVpcLinkRequest>;
export interface GetVpcLinksRequest {
  position?: string;
  limit?: number;
}
export const GetVpcLinksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/vpclinks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVpcLinksRequest",
}) as any as S.Schema<GetVpcLinksRequest>;
export type ListOfVpcLink = VpcLink[];
export const ListOfVpcLink = /*@__PURE__*/ S.Array(VpcLink);
export interface VpcLinks {
  items?: VpcLink[];
  position?: string;
}
export const VpcLinks = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ListOfVpcLink),
    position: S.optional(S.String).pipe(T.HttpQuery("position")),
  }).pipe(S.encodeKeys({ items: "item" })),
).annotate({ identifier: "VpcLinks" }) as any as S.Schema<VpcLinks>;
export type ApiKeysFormat = "csv" | (string & {});
export const ApiKeysFormat = S.String;

export interface ImportApiKeysRequest {
  body: T.StreamingInputBody;
  format: ApiKeysFormat;
  failOnWarnings?: boolean;
}
export const ImportApiKeysRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    body: T.StreamingInput.pipe(T.HttpPayload()),
    format: ApiKeysFormat.pipe(T.HttpQuery("format")),
    failOnWarnings: S.optional(S.Boolean).pipe(T.HttpQuery("failonwarnings")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/apikeys?mode=import" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ImportApiKeysRequest",
}) as any as S.Schema<ImportApiKeysRequest>;
export interface ApiKeyIds {
  ids?: string[];
  warnings?: string[];
}
export const ApiKeyIds = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ids: S.optional(ListOfString),
    warnings: S.optional(ListOfString),
  }),
).annotate({ identifier: "ApiKeyIds" }) as any as S.Schema<ApiKeyIds>;
export type PutMode = "merge" | "overwrite" | (string & {});
export const PutMode = S.String;

export interface ImportDocumentationPartsRequest {
  restApiId: string;
  mode?: PutMode;
  failOnWarnings?: boolean;
  body: T.StreamingInputBody;
}
export const ImportDocumentationPartsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    mode: S.optional(PutMode).pipe(T.HttpQuery("mode")),
    failOnWarnings: S.optional(S.Boolean).pipe(T.HttpQuery("failonwarnings")),
    body: T.StreamingInput.pipe(T.HttpPayload()),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/restapis/{restApiId}/documentation/parts",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ImportDocumentationPartsRequest",
}) as any as S.Schema<ImportDocumentationPartsRequest>;
export interface DocumentationPartIds {
  ids?: string[];
  warnings?: string[];
}
export const DocumentationPartIds = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ids: S.optional(ListOfString),
    warnings: S.optional(ListOfString),
  }),
).annotate({
  identifier: "DocumentationPartIds",
}) as any as S.Schema<DocumentationPartIds>;
export interface ImportRestApiRequest {
  failOnWarnings?: boolean;
  parameters?: { [key: string]: string | undefined };
  body: T.StreamingInputBody;
}
export const ImportRestApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    failOnWarnings: S.optional(S.Boolean).pipe(T.HttpQuery("failonwarnings")),
    parameters: S.optional(MapOfStringToString).pipe(T.HttpQueryParams()),
    body: T.StreamingInput.pipe(T.HttpPayload()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/restapis?mode=import" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ImportRestApiRequest",
}) as any as S.Schema<ImportRestApiRequest>;
export interface PutGatewayResponseRequest {
  restApiId: string;
  responseType: GatewayResponseType;
  statusCode?: string;
  responseParameters?: { [key: string]: string | undefined };
  responseTemplates?: { [key: string]: string | undefined };
}
export const PutGatewayResponseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    responseType: GatewayResponseType.pipe(T.HttpLabel("responseType")),
    statusCode: S.optional(S.String),
    responseParameters: S.optional(MapOfStringToString),
    responseTemplates: S.optional(MapOfStringToString),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/restapis/{restApiId}/gatewayresponses/{responseType}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutGatewayResponseRequest",
}) as any as S.Schema<PutGatewayResponseRequest>;
export interface PutIntegrationRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
  type: IntegrationType;
  integrationHttpMethod?: string;
  uri?: string;
  connectionType?: ConnectionType;
  connectionId?: string;
  credentials?: string;
  requestParameters?: { [key: string]: string | undefined };
  requestTemplates?: { [key: string]: string | undefined };
  passthroughBehavior?: string;
  cacheNamespace?: string;
  cacheKeyParameters?: string[];
  contentHandling?: ContentHandlingStrategy;
  timeoutInMillis?: number;
  tlsConfig?: TlsConfig;
  responseTransferMode?: ResponseTransferMode;
  integrationTarget?: string;
}
export const PutIntegrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    resourceId: S.String.pipe(T.HttpLabel("resourceId")),
    httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
    type: IntegrationType,
    integrationHttpMethod: S.optional(S.String),
    uri: S.optional(S.String),
    connectionType: S.optional(ConnectionType),
    connectionId: S.optional(S.String),
    credentials: S.optional(S.String),
    requestParameters: S.optional(MapOfStringToString),
    requestTemplates: S.optional(MapOfStringToString),
    passthroughBehavior: S.optional(S.String),
    cacheNamespace: S.optional(S.String),
    cacheKeyParameters: S.optional(ListOfString),
    contentHandling: S.optional(ContentHandlingStrategy),
    timeoutInMillis: S.optional(S.Number),
    tlsConfig: S.optional(TlsConfig),
    responseTransferMode: S.optional(ResponseTransferMode),
    integrationTarget: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        httpMethod: "requestHttpMethod",
        integrationHttpMethod: "httpMethod",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/integration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutIntegrationRequest",
}) as any as S.Schema<PutIntegrationRequest>;
export interface PutIntegrationResponseRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
  statusCode: string;
  selectionPattern?: string;
  responseParameters?: { [key: string]: string | undefined };
  responseTemplates?: { [key: string]: string | undefined };
  contentHandling?: ContentHandlingStrategy;
}
export const PutIntegrationResponseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    resourceId: S.String.pipe(T.HttpLabel("resourceId")),
    httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
    statusCode: S.String.pipe(T.HttpLabel("statusCode")),
    selectionPattern: S.optional(S.String),
    responseParameters: S.optional(MapOfStringToString),
    responseTemplates: S.optional(MapOfStringToString),
    contentHandling: S.optional(ContentHandlingStrategy),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/integration/responses/{statusCode}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutIntegrationResponseRequest",
}) as any as S.Schema<PutIntegrationResponseRequest>;
export interface PutMethodRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
  authorizationType: string;
  authorizerId?: string;
  apiKeyRequired?: boolean;
  operationName?: string;
  requestParameters?: { [key: string]: boolean | undefined };
  requestModels?: { [key: string]: string | undefined };
  requestValidatorId?: string;
  authorizationScopes?: string[];
}
export const PutMethodRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    resourceId: S.String.pipe(T.HttpLabel("resourceId")),
    httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
    authorizationType: S.String,
    authorizerId: S.optional(S.String),
    apiKeyRequired: S.optional(S.Boolean),
    operationName: S.optional(S.String),
    requestParameters: S.optional(MapOfStringToBoolean),
    requestModels: S.optional(MapOfStringToString),
    requestValidatorId: S.optional(S.String),
    authorizationScopes: S.optional(ListOfString),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutMethodRequest",
}) as any as S.Schema<PutMethodRequest>;
export interface PutMethodResponseRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
  statusCode: string;
  responseParameters?: { [key: string]: boolean | undefined };
  responseModels?: { [key: string]: string | undefined };
}
export const PutMethodResponseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    resourceId: S.String.pipe(T.HttpLabel("resourceId")),
    httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
    statusCode: S.String.pipe(T.HttpLabel("statusCode")),
    responseParameters: S.optional(MapOfStringToBoolean),
    responseModels: S.optional(MapOfStringToString),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/responses/{statusCode}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutMethodResponseRequest",
}) as any as S.Schema<PutMethodResponseRequest>;
export interface PutRestApiRequest {
  restApiId: string;
  mode?: PutMode;
  failOnWarnings?: boolean;
  parameters?: { [key: string]: string | undefined };
  body: T.StreamingInputBody;
}
export const PutRestApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    mode: S.optional(PutMode).pipe(T.HttpQuery("mode")),
    failOnWarnings: S.optional(S.Boolean).pipe(T.HttpQuery("failonwarnings")),
    parameters: S.optional(MapOfStringToString).pipe(T.HttpQueryParams()),
    body: T.StreamingInput.pipe(T.HttpPayload()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/restapis/{restApiId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutRestApiRequest",
}) as any as S.Schema<PutRestApiRequest>;
export interface RejectDomainNameAccessAssociationRequest {
  domainNameAccessAssociationArn: string;
  domainNameArn: string;
}
export const RejectDomainNameAccessAssociationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      domainNameAccessAssociationArn: S.String.pipe(
        T.HttpQuery("domainNameAccessAssociationArn"),
      ),
      domainNameArn: S.String.pipe(T.HttpQuery("domainNameArn")),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/rejectdomainnameaccessassociations" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "RejectDomainNameAccessAssociationRequest",
}) as any as S.Schema<RejectDomainNameAccessAssociationRequest>;
export interface RejectDomainNameAccessAssociationResponse {}
export const RejectDomainNameAccessAssociationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "RejectDomainNameAccessAssociationResponse",
  }) as any as S.Schema<RejectDomainNameAccessAssociationResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: MapOfStringToString,
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
export type MapOfStringToList = { [key: string]: string[] | undefined };
export const MapOfStringToList = /*@__PURE__*/ S.Record(
  S.String,
  ListOfString.pipe(S.optional),
);
export interface TestInvokeAuthorizerRequest {
  restApiId: string;
  authorizerId: string;
  headers?: { [key: string]: string | undefined };
  multiValueHeaders?: { [key: string]: string[] | undefined };
  pathWithQueryString?: string;
  body?: string;
  stageVariables?: { [key: string]: string | undefined };
  additionalContext?: { [key: string]: string | undefined };
}
export const TestInvokeAuthorizerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    authorizerId: S.String.pipe(T.HttpLabel("authorizerId")),
    headers: S.optional(MapOfStringToString),
    multiValueHeaders: S.optional(MapOfStringToList),
    pathWithQueryString: S.optional(S.String),
    body: S.optional(S.String),
    stageVariables: S.optional(MapOfStringToString),
    additionalContext: S.optional(MapOfStringToString),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/restapis/{restApiId}/authorizers/{authorizerId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TestInvokeAuthorizerRequest",
}) as any as S.Schema<TestInvokeAuthorizerRequest>;
export interface TestInvokeAuthorizerResponse {
  clientStatus?: number;
  log?: string;
  latency?: number;
  principalId?: string;
  policy?: string;
  authorization?: { [key: string]: string[] | undefined };
  claims?: { [key: string]: string | undefined };
}
export const TestInvokeAuthorizerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientStatus: S.optional(S.Number),
    log: S.optional(S.String),
    latency: S.optional(S.Number),
    principalId: S.optional(S.String),
    policy: S.optional(S.String),
    authorization: S.optional(MapOfStringToList),
    claims: S.optional(MapOfStringToString),
  }),
).annotate({
  identifier: "TestInvokeAuthorizerResponse",
}) as any as S.Schema<TestInvokeAuthorizerResponse>;
export interface TestInvokeMethodRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
  pathWithQueryString?: string;
  body?: string;
  headers?: { [key: string]: string | undefined };
  multiValueHeaders?: { [key: string]: string[] | undefined };
  clientCertificateId?: string;
  stageVariables?: { [key: string]: string | undefined };
}
export const TestInvokeMethodRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    resourceId: S.String.pipe(T.HttpLabel("resourceId")),
    httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
    pathWithQueryString: S.optional(S.String),
    body: S.optional(S.String),
    headers: S.optional(MapOfStringToString),
    multiValueHeaders: S.optional(MapOfStringToList),
    clientCertificateId: S.optional(S.String),
    stageVariables: S.optional(MapOfStringToString),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TestInvokeMethodRequest",
}) as any as S.Schema<TestInvokeMethodRequest>;
export interface TestInvokeMethodResponse {
  status?: number;
  body?: string;
  headers?: { [key: string]: string | undefined };
  multiValueHeaders?: { [key: string]: string[] | undefined };
  log?: string;
  latency?: number;
}
export const TestInvokeMethodResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(S.Number),
    body: S.optional(S.String),
    headers: S.optional(MapOfStringToString),
    multiValueHeaders: S.optional(MapOfStringToList),
    log: S.optional(S.String),
    latency: S.optional(S.Number),
  }),
).annotate({
  identifier: "TestInvokeMethodResponse",
}) as any as S.Schema<TestInvokeMethodResponse>;
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: ListOfString.pipe(T.HttpQuery("tagKeys")),
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
export type Op =
  | "add"
  | "remove"
  | "replace"
  | "move"
  | "copy"
  | "test"
  | (string & {});
export const Op = S.String;

export interface PatchOperation {
  op?: Op;
  path?: string;
  value?: string;
  from?: string;
}
export const PatchOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    op: S.optional(Op),
    path: S.optional(S.String),
    value: S.optional(S.String),
    from: S.optional(S.String),
  }),
).annotate({ identifier: "PatchOperation" }) as any as S.Schema<PatchOperation>;
export type ListOfPatchOperation = PatchOperation[];
export const ListOfPatchOperation = /*@__PURE__*/ S.Array(PatchOperation);
export interface UpdateAccountRequest {
  patchOperations?: PatchOperation[];
}
export const UpdateAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ patchOperations: S.optional(ListOfPatchOperation) }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/account" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAccountRequest",
}) as any as S.Schema<UpdateAccountRequest>;
export interface UpdateApiKeyRequest {
  apiKey: string;
  patchOperations?: PatchOperation[];
}
export const UpdateApiKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiKey: S.String.pipe(T.HttpLabel("apiKey")),
    patchOperations: S.optional(ListOfPatchOperation),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/apikeys/{apiKey}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateApiKeyRequest",
}) as any as S.Schema<UpdateApiKeyRequest>;
export interface UpdateAuthorizerRequest {
  restApiId: string;
  authorizerId: string;
  patchOperations?: PatchOperation[];
}
export const UpdateAuthorizerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    authorizerId: S.String.pipe(T.HttpLabel("authorizerId")),
    patchOperations: S.optional(ListOfPatchOperation),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/restapis/{restApiId}/authorizers/{authorizerId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAuthorizerRequest",
}) as any as S.Schema<UpdateAuthorizerRequest>;
export interface UpdateBasePathMappingRequest {
  domainName: string;
  domainNameId?: string;
  basePath: string;
  patchOperations?: PatchOperation[];
}
export const UpdateBasePathMappingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainName: S.String.pipe(T.HttpLabel("domainName")),
    domainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
    basePath: S.String.pipe(T.HttpLabel("basePath")),
    patchOperations: S.optional(ListOfPatchOperation),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/domainnames/{domainName}/basepathmappings/{basePath}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateBasePathMappingRequest",
}) as any as S.Schema<UpdateBasePathMappingRequest>;
export interface UpdateClientCertificateRequest {
  clientCertificateId: string;
  patchOperations?: PatchOperation[];
}
export const UpdateClientCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientCertificateId: S.String.pipe(T.HttpLabel("clientCertificateId")),
    patchOperations: S.optional(ListOfPatchOperation),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/clientcertificates/{clientCertificateId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateClientCertificateRequest",
}) as any as S.Schema<UpdateClientCertificateRequest>;
export interface UpdateDeploymentRequest {
  restApiId: string;
  deploymentId: string;
  patchOperations?: PatchOperation[];
}
export const UpdateDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    deploymentId: S.String.pipe(T.HttpLabel("deploymentId")),
    patchOperations: S.optional(ListOfPatchOperation),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/restapis/{restApiId}/deployments/{deploymentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDeploymentRequest",
}) as any as S.Schema<UpdateDeploymentRequest>;
export interface UpdateDocumentationPartRequest {
  restApiId: string;
  documentationPartId: string;
  patchOperations?: PatchOperation[];
}
export const UpdateDocumentationPartRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    documentationPartId: S.String.pipe(T.HttpLabel("documentationPartId")),
    patchOperations: S.optional(ListOfPatchOperation),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/restapis/{restApiId}/documentation/parts/{documentationPartId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDocumentationPartRequest",
}) as any as S.Schema<UpdateDocumentationPartRequest>;
export interface UpdateDocumentationVersionRequest {
  restApiId: string;
  documentationVersion: string;
  patchOperations?: PatchOperation[];
}
export const UpdateDocumentationVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    documentationVersion: S.String.pipe(T.HttpLabel("documentationVersion")),
    patchOperations: S.optional(ListOfPatchOperation),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/restapis/{restApiId}/documentation/versions/{documentationVersion}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDocumentationVersionRequest",
}) as any as S.Schema<UpdateDocumentationVersionRequest>;
export interface UpdateDomainNameRequest {
  domainName: string;
  domainNameId?: string;
  patchOperations?: PatchOperation[];
}
export const UpdateDomainNameRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainName: S.String.pipe(T.HttpLabel("domainName")),
    domainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
    patchOperations: S.optional(ListOfPatchOperation),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/domainnames/{domainName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDomainNameRequest",
}) as any as S.Schema<UpdateDomainNameRequest>;
export interface UpdateGatewayResponseRequest {
  restApiId: string;
  responseType: GatewayResponseType;
  patchOperations?: PatchOperation[];
}
export const UpdateGatewayResponseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    responseType: GatewayResponseType.pipe(T.HttpLabel("responseType")),
    patchOperations: S.optional(ListOfPatchOperation),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/restapis/{restApiId}/gatewayresponses/{responseType}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGatewayResponseRequest",
}) as any as S.Schema<UpdateGatewayResponseRequest>;
export interface UpdateIntegrationRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
  patchOperations?: PatchOperation[];
}
export const UpdateIntegrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    resourceId: S.String.pipe(T.HttpLabel("resourceId")),
    httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
    patchOperations: S.optional(ListOfPatchOperation),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/integration",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateIntegrationRequest",
}) as any as S.Schema<UpdateIntegrationRequest>;
export interface UpdateIntegrationResponseRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
  statusCode: string;
  patchOperations?: PatchOperation[];
}
export const UpdateIntegrationResponseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    resourceId: S.String.pipe(T.HttpLabel("resourceId")),
    httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
    statusCode: S.String.pipe(T.HttpLabel("statusCode")),
    patchOperations: S.optional(ListOfPatchOperation),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/integration/responses/{statusCode}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateIntegrationResponseRequest",
}) as any as S.Schema<UpdateIntegrationResponseRequest>;
export interface UpdateMethodRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
  patchOperations?: PatchOperation[];
}
export const UpdateMethodRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    resourceId: S.String.pipe(T.HttpLabel("resourceId")),
    httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
    patchOperations: S.optional(ListOfPatchOperation),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMethodRequest",
}) as any as S.Schema<UpdateMethodRequest>;
export interface UpdateMethodResponseRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
  statusCode: string;
  patchOperations?: PatchOperation[];
}
export const UpdateMethodResponseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    resourceId: S.String.pipe(T.HttpLabel("resourceId")),
    httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
    statusCode: S.String.pipe(T.HttpLabel("statusCode")),
    patchOperations: S.optional(ListOfPatchOperation),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/responses/{statusCode}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMethodResponseRequest",
}) as any as S.Schema<UpdateMethodResponseRequest>;
export interface UpdateModelRequest {
  restApiId: string;
  modelName: string;
  patchOperations?: PatchOperation[];
}
export const UpdateModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    modelName: S.String.pipe(T.HttpLabel("modelName")),
    patchOperations: S.optional(ListOfPatchOperation),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/restapis/{restApiId}/models/{modelName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateModelRequest",
}) as any as S.Schema<UpdateModelRequest>;
export interface UpdateRequestValidatorRequest {
  restApiId: string;
  requestValidatorId: string;
  patchOperations?: PatchOperation[];
}
export const UpdateRequestValidatorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    requestValidatorId: S.String.pipe(T.HttpLabel("requestValidatorId")),
    patchOperations: S.optional(ListOfPatchOperation),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/restapis/{restApiId}/requestvalidators/{requestValidatorId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRequestValidatorRequest",
}) as any as S.Schema<UpdateRequestValidatorRequest>;
export interface UpdateResourceRequest {
  restApiId: string;
  resourceId: string;
  patchOperations?: PatchOperation[];
}
export const UpdateResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    resourceId: S.String.pipe(T.HttpLabel("resourceId")),
    patchOperations: S.optional(ListOfPatchOperation),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/restapis/{restApiId}/resources/{resourceId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateResourceRequest",
}) as any as S.Schema<UpdateResourceRequest>;
export interface UpdateRestApiRequest {
  restApiId: string;
  patchOperations?: PatchOperation[];
}
export const UpdateRestApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    patchOperations: S.optional(ListOfPatchOperation),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/restapis/{restApiId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRestApiRequest",
}) as any as S.Schema<UpdateRestApiRequest>;
export interface UpdateStageRequest {
  restApiId: string;
  stageName: string;
  patchOperations?: PatchOperation[];
}
export const UpdateStageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restApiId: S.String.pipe(T.HttpLabel("restApiId")),
    stageName: S.String.pipe(T.HttpLabel("stageName")),
    patchOperations: S.optional(ListOfPatchOperation),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/restapis/{restApiId}/stages/{stageName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateStageRequest",
}) as any as S.Schema<UpdateStageRequest>;
export interface UpdateUsageRequest {
  usagePlanId: string;
  keyId: string;
  patchOperations?: PatchOperation[];
}
export const UpdateUsageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    usagePlanId: S.String.pipe(T.HttpLabel("usagePlanId")),
    keyId: S.String.pipe(T.HttpLabel("keyId")),
    patchOperations: S.optional(ListOfPatchOperation),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/usageplans/{usagePlanId}/keys/{keyId}/usage",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateUsageRequest",
}) as any as S.Schema<UpdateUsageRequest>;
export interface UpdateUsagePlanRequest {
  usagePlanId: string;
  patchOperations?: PatchOperation[];
}
export const UpdateUsagePlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    usagePlanId: S.String.pipe(T.HttpLabel("usagePlanId")),
    patchOperations: S.optional(ListOfPatchOperation),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/usageplans/{usagePlanId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateUsagePlanRequest",
}) as any as S.Schema<UpdateUsagePlanRequest>;
export interface UpdateVpcLinkRequest {
  vpcLinkId: string;
  patchOperations?: PatchOperation[];
}
export const UpdateVpcLinkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vpcLinkId: S.String.pipe(T.HttpLabel("vpcLinkId")),
    patchOperations: S.optional(ListOfPatchOperation),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/vpclinks/{vpcLinkId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateVpcLinkRequest",
}) as any as S.Schema<UpdateVpcLinkRequest>;
export type CreateApiKeyError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Create an ApiKey resource.
 */
export const createApiKey: API.OperationMethod<
  CreateApiKeyRequest,
  ApiKey,
  CreateApiKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateApiKeyRequest,
  output: ApiKey,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApiKey",
}));

export type CreateAuthorizerError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Adds a new Authorizer resource to an existing RestApi resource.
 */
export const createAuthorizer: API.OperationMethod<
  CreateAuthorizerRequest,
  Authorizer,
  CreateAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAuthorizerRequest,
  output: Authorizer,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAuthorizer",
}));

export type CreateBasePathMappingError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a new BasePathMapping resource.
 */
export const createBasePathMapping: API.OperationMethod<
  CreateBasePathMappingRequest,
  BasePathMapping,
  CreateBasePathMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBasePathMappingRequest,
  output: BasePathMapping,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBasePathMapping",
}));

export type CreateDeploymentError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a Deployment resource, which makes a specified RestApi callable over the internet.
 */
export const createDeployment: API.OperationMethod<
  CreateDeploymentRequest,
  Deployment,
  CreateDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDeploymentRequest,
  output: Deployment,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeployment",
}));

export type CreateDocumentationPartError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a documentation part.
 */
export const createDocumentationPart: API.OperationMethod<
  CreateDocumentationPartRequest,
  DocumentationPart,
  CreateDocumentationPartError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDocumentationPartRequest,
  output: DocumentationPart,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDocumentationPart",
}));

export type CreateDocumentationVersionError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a documentation version
 */
export const createDocumentationVersion: API.OperationMethod<
  CreateDocumentationVersionRequest,
  DocumentationVersion,
  CreateDocumentationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDocumentationVersionRequest,
  output: DocumentationVersion,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDocumentationVersion",
}));

export type CreateDomainNameError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a new domain name.
 */
export const createDomainName: API.OperationMethod<
  CreateDomainNameRequest,
  DomainName,
  CreateDomainNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDomainNameRequest,
  output: DomainName,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomainName",
}));

export type CreateDomainNameAccessAssociationError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a domain name access association resource between an access association source and a private custom
 * domain name.
 */
export const createDomainNameAccessAssociation: API.OperationMethod<
  CreateDomainNameAccessAssociationRequest,
  DomainNameAccessAssociation,
  CreateDomainNameAccessAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDomainNameAccessAssociationRequest,
  output: DomainNameAccessAssociation,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomainNameAccessAssociation",
}));

export type CreateModelError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Adds a new Model resource to an existing RestApi resource.
 */
export const createModel: API.OperationMethod<
  CreateModelRequest,
  Model,
  CreateModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateModelRequest,
  output: Model,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModel",
}));

export type CreateRequestValidatorError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a RequestValidator of a given RestApi.
 */
export const createRequestValidator: API.OperationMethod<
  CreateRequestValidatorRequest,
  RequestValidator,
  CreateRequestValidatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRequestValidatorRequest,
  output: RequestValidator,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRequestValidator",
}));

export type CreateResourceError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a Resource resource.
 */
export const createResource: API.OperationMethod<
  CreateResourceRequest,
  Resource,
  CreateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateResourceRequest,
  output: Resource,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResource",
}));

export type CreateRestApiError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a new RestApi resource.
 */
export const createRestApi: API.OperationMethod<
  CreateRestApiRequest,
  RestApi,
  CreateRestApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRestApiRequest,
  output: RestApi,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRestApi",
}));

export type CreateStageError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a new Stage resource that references a pre-existing Deployment for the API.
 */
export const createStage: API.OperationMethod<
  CreateStageRequest,
  Stage,
  CreateStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateStageRequest,
  output: Stage,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStage",
}));

export type CreateUsagePlanError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a usage plan with the throttle and quota limits, as well as the associated API stages, specified in the payload.
 */
export const createUsagePlan: API.OperationMethod<
  CreateUsagePlanRequest,
  UsagePlan,
  CreateUsagePlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUsagePlanRequest,
  output: UsagePlan,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUsagePlan",
}));

export type CreateUsagePlanKeyError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a usage plan key for adding an existing API key to a usage plan.
 */
export const createUsagePlanKey: API.OperationMethod<
  CreateUsagePlanKeyRequest,
  UsagePlanKey,
  CreateUsagePlanKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUsagePlanKeyRequest,
  output: UsagePlanKey,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUsagePlanKey",
}));

export type CreateVpcLinkError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a VPC link, under the caller's account in a selected region, in an asynchronous operation that typically takes 2-4 minutes to complete and become operational. The caller must have permissions to create and update VPC Endpoint services.
 */
export const createVpcLink: API.OperationMethod<
  CreateVpcLinkRequest,
  VpcLink,
  CreateVpcLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateVpcLinkRequest,
  output: VpcLink,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVpcLink",
}));

export type DeleteApiKeyError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the ApiKey resource.
 */
export const deleteApiKey: API.OperationMethod<
  DeleteApiKeyRequest,
  DeleteApiKeyResponse,
  DeleteApiKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApiKeyRequest,
  output: DeleteApiKeyResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApiKey",
}));

export type DeleteAuthorizerError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes an existing Authorizer resource.
 */
export const deleteAuthorizer: API.OperationMethod<
  DeleteAuthorizerRequest,
  DeleteAuthorizerResponse,
  DeleteAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAuthorizerRequest,
  output: DeleteAuthorizerResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAuthorizer",
}));

export type DeleteBasePathMappingError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the BasePathMapping resource.
 */
export const deleteBasePathMapping: API.OperationMethod<
  DeleteBasePathMappingRequest,
  DeleteBasePathMappingResponse,
  DeleteBasePathMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBasePathMappingRequest,
  output: DeleteBasePathMappingResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBasePathMapping",
}));

export type DeleteClientCertificateError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the ClientCertificate resource.
 */
export const deleteClientCertificate: API.OperationMethod<
  DeleteClientCertificateRequest,
  DeleteClientCertificateResponse,
  DeleteClientCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteClientCertificateRequest,
  output: DeleteClientCertificateResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClientCertificate",
}));

export type DeleteDeploymentError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a Deployment resource. Deleting a deployment will only succeed if there are no Stage resources associated with it.
 */
export const deleteDeployment: API.OperationMethod<
  DeleteDeploymentRequest,
  DeleteDeploymentResponse,
  DeleteDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDeploymentRequest,
  output: DeleteDeploymentResponse,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeployment",
}));

export type DeleteDocumentationPartError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a documentation part
 */
export const deleteDocumentationPart: API.OperationMethod<
  DeleteDocumentationPartRequest,
  DeleteDocumentationPartResponse,
  DeleteDocumentationPartError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDocumentationPartRequest,
  output: DeleteDocumentationPartResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDocumentationPart",
}));

export type DeleteDocumentationVersionError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a documentation version.
 */
export const deleteDocumentationVersion: API.OperationMethod<
  DeleteDocumentationVersionRequest,
  DeleteDocumentationVersionResponse,
  DeleteDocumentationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDocumentationVersionRequest,
  output: DeleteDocumentationVersionResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDocumentationVersion",
}));

export type DeleteDomainNameError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the DomainName resource.
 */
export const deleteDomainName: API.OperationMethod<
  DeleteDomainNameRequest,
  DeleteDomainNameResponse,
  DeleteDomainNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDomainNameRequest,
  output: DeleteDomainNameResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomainName",
}));

export type DeleteDomainNameAccessAssociationError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the DomainNameAccessAssociation resource.
 *
 * Only the AWS account that created the DomainNameAccessAssociation resource can delete it. To stop an access association source in another AWS account from accessing your private custom domain name, use the RejectDomainNameAccessAssociation operation.
 */
export const deleteDomainNameAccessAssociation: API.OperationMethod<
  DeleteDomainNameAccessAssociationRequest,
  DeleteDomainNameAccessAssociationResponse,
  DeleteDomainNameAccessAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDomainNameAccessAssociationRequest,
  output: DeleteDomainNameAccessAssociationResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomainNameAccessAssociation",
}));

export type DeleteGatewayResponseError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Clears any customization of a GatewayResponse of a specified response type on the given RestApi and resets it with the default settings.
 */
export const deleteGatewayResponse: API.OperationMethod<
  DeleteGatewayResponseRequest,
  DeleteGatewayResponseResponse,
  DeleteGatewayResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGatewayResponseRequest,
  output: DeleteGatewayResponseResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGatewayResponse",
}));

export type DeleteIntegrationError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Represents a delete integration.
 */
export const deleteIntegration: API.OperationMethod<
  DeleteIntegrationRequest,
  DeleteIntegrationResponse,
  DeleteIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIntegrationRequest,
  output: DeleteIntegrationResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegration",
}));

export type DeleteIntegrationResponseError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Represents a delete integration response.
 */
export const deleteIntegrationResponse: API.OperationMethod<
  DeleteIntegrationResponseRequest,
  DeleteIntegrationResponseResponse,
  DeleteIntegrationResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIntegrationResponseRequest,
  output: DeleteIntegrationResponseResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegrationResponse",
}));

export type DeleteMethodError =
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes an existing Method resource.
 */
export const deleteMethod: API.OperationMethod<
  DeleteMethodRequest,
  DeleteMethodResponse,
  DeleteMethodError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMethodRequest,
  output: DeleteMethodResponse,
  errors: [
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMethod",
}));

export type DeleteMethodResponseError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes an existing MethodResponse resource.
 */
export const deleteMethodResponse: API.OperationMethod<
  DeleteMethodResponseRequest,
  DeleteMethodResponseResponse,
  DeleteMethodResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMethodResponseRequest,
  output: DeleteMethodResponseResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMethodResponse",
}));

export type DeleteModelError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a model.
 */
export const deleteModel: API.OperationMethod<
  DeleteModelRequest,
  DeleteModelResponse,
  DeleteModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteModelRequest,
  output: DeleteModelResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteModel",
}));

export type DeleteRequestValidatorError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a RequestValidator of a given RestApi.
 */
export const deleteRequestValidator: API.OperationMethod<
  DeleteRequestValidatorRequest,
  DeleteRequestValidatorResponse,
  DeleteRequestValidatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRequestValidatorRequest,
  output: DeleteRequestValidatorResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRequestValidator",
}));

export type DeleteResourceError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a Resource resource.
 */
export const deleteResource: API.OperationMethod<
  DeleteResourceRequest,
  DeleteResourceResponse,
  DeleteResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourceRequest,
  output: DeleteResourceResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResource",
}));

export type DeleteRestApiError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the specified API.
 */
export const deleteRestApi: API.OperationMethod<
  DeleteRestApiRequest,
  DeleteRestApiResponse,
  DeleteRestApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRestApiRequest,
  output: DeleteRestApiResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRestApi",
}));

export type DeleteStageError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a Stage resource.
 */
export const deleteStage: API.OperationMethod<
  DeleteStageRequest,
  DeleteStageResponse,
  DeleteStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteStageRequest,
  output: DeleteStageResponse,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStage",
}));

export type DeleteUsagePlanError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a usage plan of a given plan Id.
 */
export const deleteUsagePlan: API.OperationMethod<
  DeleteUsagePlanRequest,
  DeleteUsagePlanResponse,
  DeleteUsagePlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUsagePlanRequest,
  output: DeleteUsagePlanResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUsagePlan",
}));

export type DeleteUsagePlanKeyError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a usage plan key and remove the underlying API key from the associated usage plan.
 */
export const deleteUsagePlanKey: API.OperationMethod<
  DeleteUsagePlanKeyRequest,
  DeleteUsagePlanKeyResponse,
  DeleteUsagePlanKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUsagePlanKeyRequest,
  output: DeleteUsagePlanKeyResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUsagePlanKey",
}));

export type DeleteVpcLinkError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes an existing VpcLink of a specified identifier.
 */
export const deleteVpcLink: API.OperationMethod<
  DeleteVpcLinkRequest,
  DeleteVpcLinkResponse,
  DeleteVpcLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVpcLinkRequest,
  output: DeleteVpcLinkResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVpcLink",
}));

export type FlushStageAuthorizersCacheError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Flushes all authorizer cache entries on a stage.
 */
export const flushStageAuthorizersCache: API.OperationMethod<
  FlushStageAuthorizersCacheRequest,
  FlushStageAuthorizersCacheResponse,
  FlushStageAuthorizersCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: FlushStageAuthorizersCacheRequest,
  output: FlushStageAuthorizersCacheResponse,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "FlushStageAuthorizersCache",
}));

export type FlushStageCacheError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Flushes a stage's cache.
 */
export const flushStageCache: API.OperationMethod<
  FlushStageCacheRequest,
  FlushStageCacheResponse,
  FlushStageCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: FlushStageCacheRequest,
  output: FlushStageCacheResponse,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "FlushStageCache",
}));

export type GenerateClientCertificateError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Generates a ClientCertificate resource.
 */
export const generateClientCertificate: API.OperationMethod<
  GenerateClientCertificateRequest,
  ClientCertificate,
  GenerateClientCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GenerateClientCertificateRequest,
  output: ClientCertificate,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateClientCertificate",
}));

export type GetAccountError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about the current Account resource.
 */
export const getAccount: API.OperationMethod<
  GetAccountRequest,
  Account,
  GetAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccountRequest,
  output: Account,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccount",
}));

export type GetApiKeyError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about the current ApiKey resource.
 */
export const getApiKey: API.OperationMethod<
  GetApiKeyRequest,
  ApiKey,
  GetApiKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApiKeyRequest,
  output: ApiKey,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApiKey",
}));

export type GetApiKeysError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about the current ApiKeys resource.
 */
export const getApiKeys: API.PaginatedOperationMethod<
  GetApiKeysRequest,
  ApiKeys,
  GetApiKeysError,
  Credentials | HttpClient.HttpClient,
  ApiKey
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetApiKeysRequest,
  output: ApiKeys,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApiKeys",
  pagination: {
    inputToken: "position",
    outputToken: "position",
    items: "items",
    pageSize: "limit",
  } as const,
})) as any;

export type GetAuthorizerError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describe an existing Authorizer resource.
 */
export const getAuthorizer: API.OperationMethod<
  GetAuthorizerRequest,
  Authorizer,
  GetAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAuthorizerRequest,
  output: Authorizer,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAuthorizer",
}));

export type GetAuthorizersError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describe an existing Authorizers resource.
 */
export const getAuthorizers: API.OperationMethod<
  GetAuthorizersRequest,
  Authorizers,
  GetAuthorizersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAuthorizersRequest,
  output: Authorizers,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAuthorizers",
}));

export type GetBasePathMappingError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describe a BasePathMapping resource.
 */
export const getBasePathMapping: API.OperationMethod<
  GetBasePathMappingRequest,
  BasePathMapping,
  GetBasePathMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBasePathMappingRequest,
  output: BasePathMapping,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBasePathMapping",
}));

export type GetBasePathMappingsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Represents a collection of BasePathMapping resources.
 */
export const getBasePathMappings: API.PaginatedOperationMethod<
  GetBasePathMappingsRequest,
  BasePathMappings,
  GetBasePathMappingsError,
  Credentials | HttpClient.HttpClient,
  BasePathMapping
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetBasePathMappingsRequest,
  output: BasePathMappings,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBasePathMappings",
  pagination: {
    inputToken: "position",
    outputToken: "position",
    items: "items",
    pageSize: "limit",
  } as const,
})) as any;

export type GetClientCertificateError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about the current ClientCertificate resource.
 */
export const getClientCertificate: API.OperationMethod<
  GetClientCertificateRequest,
  ClientCertificate,
  GetClientCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetClientCertificateRequest,
  output: ClientCertificate,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClientCertificate",
}));

export type GetClientCertificatesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a collection of ClientCertificate resources.
 */
export const getClientCertificates: API.PaginatedOperationMethod<
  GetClientCertificatesRequest,
  ClientCertificates,
  GetClientCertificatesError,
  Credentials | HttpClient.HttpClient,
  ClientCertificate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetClientCertificatesRequest,
  output: ClientCertificates,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClientCertificates",
  pagination: {
    inputToken: "position",
    outputToken: "position",
    items: "items",
    pageSize: "limit",
  } as const,
})) as any;

export type GetDeploymentError =
  | BadRequestException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about a Deployment resource.
 */
export const getDeployment: API.OperationMethod<
  GetDeploymentRequest,
  Deployment,
  GetDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeploymentRequest,
  output: Deployment,
  errors: [
    BadRequestException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployment",
}));

export type GetDeploymentsError =
  | BadRequestException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about a Deployments collection.
 */
export const getDeployments: API.PaginatedOperationMethod<
  GetDeploymentsRequest,
  Deployments,
  GetDeploymentsError,
  Credentials | HttpClient.HttpClient,
  Deployment
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetDeploymentsRequest,
  output: Deployments,
  errors: [
    BadRequestException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployments",
  pagination: {
    inputToken: "position",
    outputToken: "position",
    items: "items",
    pageSize: "limit",
  } as const,
})) as any;

export type GetDocumentationPartError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a documentation part.
 */
export const getDocumentationPart: API.OperationMethod<
  GetDocumentationPartRequest,
  DocumentationPart,
  GetDocumentationPartError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDocumentationPartRequest,
  output: DocumentationPart,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocumentationPart",
}));

export type GetDocumentationPartsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets documentation parts.
 */
export const getDocumentationParts: API.OperationMethod<
  GetDocumentationPartsRequest,
  DocumentationParts,
  GetDocumentationPartsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDocumentationPartsRequest,
  output: DocumentationParts,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocumentationParts",
}));

export type GetDocumentationVersionError =
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a documentation version.
 */
export const getDocumentationVersion: API.OperationMethod<
  GetDocumentationVersionRequest,
  DocumentationVersion,
  GetDocumentationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDocumentationVersionRequest,
  output: DocumentationVersion,
  errors: [NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocumentationVersion",
}));

export type GetDocumentationVersionsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets documentation versions.
 */
export const getDocumentationVersions: API.OperationMethod<
  GetDocumentationVersionsRequest,
  DocumentationVersions,
  GetDocumentationVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDocumentationVersionsRequest,
  output: DocumentationVersions,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocumentationVersions",
}));

export type GetDomainNameError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Represents a domain name that is contained in a simpler, more intuitive URL that can be called.
 */
export const getDomainName: API.OperationMethod<
  GetDomainNameRequest,
  DomainName,
  GetDomainNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDomainNameRequest,
  output: DomainName,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainName",
}));

export type GetDomainNameAccessAssociationsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Represents a collection on DomainNameAccessAssociations resources.
 */
export const getDomainNameAccessAssociations: API.OperationMethod<
  GetDomainNameAccessAssociationsRequest,
  DomainNameAccessAssociations,
  GetDomainNameAccessAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDomainNameAccessAssociationsRequest,
  output: DomainNameAccessAssociations,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainNameAccessAssociations",
}));

export type GetDomainNamesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Represents a collection of DomainName resources.
 */
export const getDomainNames: API.PaginatedOperationMethod<
  GetDomainNamesRequest,
  DomainNames,
  GetDomainNamesError,
  Credentials | HttpClient.HttpClient,
  DomainName
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetDomainNamesRequest,
  output: DomainNames,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainNames",
  pagination: {
    inputToken: "position",
    outputToken: "position",
    items: "items",
    pageSize: "limit",
  } as const,
})) as any;

export type GetExportError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Exports a deployed version of a RestApi in a specified format.
 */
export const getExport: API.OperationMethod<
  GetExportRequest,
  ExportResponse,
  GetExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetExportRequest,
  output: ExportResponse,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExport",
}));

export type GetGatewayResponseError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a GatewayResponse of a specified response type on the given RestApi.
 */
export const getGatewayResponse: API.OperationMethod<
  GetGatewayResponseRequest,
  GatewayResponse,
  GetGatewayResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGatewayResponseRequest,
  output: GatewayResponse,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGatewayResponse",
}));

export type GetGatewayResponsesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the GatewayResponses collection on the given RestApi. If an API developer has not added any definitions for gateway responses, the result will be the API Gateway-generated default GatewayResponses collection for the supported response types.
 */
export const getGatewayResponses: API.OperationMethod<
  GetGatewayResponsesRequest,
  GatewayResponses,
  GetGatewayResponsesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGatewayResponsesRequest,
  output: GatewayResponses,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGatewayResponses",
}));

export type GetIntegrationError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Get the integration settings.
 */
export const getIntegration: API.OperationMethod<
  GetIntegrationRequest,
  Integration,
  GetIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIntegrationRequest,
  output: Integration,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegration",
}));

export type GetIntegrationResponseError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Represents a get integration response.
 */
export const getIntegrationResponse: API.OperationMethod<
  GetIntegrationResponseRequest,
  IntegrationResponse,
  GetIntegrationResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIntegrationResponseRequest,
  output: IntegrationResponse,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegrationResponse",
}));

export type GetMethodError =
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describe an existing Method resource.
 */
export const getMethod: API.OperationMethod<
  GetMethodRequest,
  Method,
  GetMethodError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMethodRequest,
  output: Method,
  errors: [NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMethod",
}));

export type GetMethodResponseError =
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describes a MethodResponse resource.
 */
export const getMethodResponse: API.OperationMethod<
  GetMethodResponseRequest,
  MethodResponse,
  GetMethodResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMethodResponseRequest,
  output: MethodResponse,
  errors: [NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMethodResponse",
}));

export type GetModelError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describes an existing model defined for a RestApi resource.
 */
export const getModel: API.OperationMethod<
  GetModelRequest,
  Model,
  GetModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetModelRequest,
  output: Model,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModel",
}));

export type GetModelsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describes existing Models defined for a RestApi resource.
 */
export const getModels: API.PaginatedOperationMethod<
  GetModelsRequest,
  Models,
  GetModelsError,
  Credentials | HttpClient.HttpClient,
  Model
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetModelsRequest,
  output: Models,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModels",
  pagination: {
    inputToken: "position",
    outputToken: "position",
    items: "items",
    pageSize: "limit",
  } as const,
})) as any;

export type GetModelTemplateError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Generates a sample mapping template that can be used to transform a payload into the structure of a model.
 */
export const getModelTemplate: API.OperationMethod<
  GetModelTemplateRequest,
  Template,
  GetModelTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetModelTemplateRequest,
  output: Template,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModelTemplate",
}));

export type GetRequestValidatorError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a RequestValidator of a given RestApi.
 */
export const getRequestValidator: API.OperationMethod<
  GetRequestValidatorRequest,
  RequestValidator,
  GetRequestValidatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRequestValidatorRequest,
  output: RequestValidator,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRequestValidator",
}));

export type GetRequestValidatorsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the RequestValidators collection of a given RestApi.
 */
export const getRequestValidators: API.OperationMethod<
  GetRequestValidatorsRequest,
  RequestValidators,
  GetRequestValidatorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRequestValidatorsRequest,
  output: RequestValidators,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRequestValidators",
}));

export type GetResourceError =
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists information about a resource.
 */
export const getResource: API.OperationMethod<
  GetResourceRequest,
  Resource,
  GetResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourceRequest,
  output: Resource,
  errors: [NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResource",
}));

export type GetResourcesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists information about a collection of Resource resources.
 */
export const getResources: API.PaginatedOperationMethod<
  GetResourcesRequest,
  Resources,
  GetResourcesError,
  Credentials | HttpClient.HttpClient,
  Resource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetResourcesRequest,
  output: Resources,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResources",
  pagination: {
    inputToken: "position",
    outputToken: "position",
    items: "items",
    pageSize: "limit",
  } as const,
})) as any;

export type GetRestApiError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the RestApi resource in the collection.
 */
export const getRestApi: API.OperationMethod<
  GetRestApiRequest,
  RestApi,
  GetRestApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRestApiRequest,
  output: RestApi,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRestApi",
}));

export type GetRestApisError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the RestApis resources for your collection.
 */
export const getRestApis: API.PaginatedOperationMethod<
  GetRestApisRequest,
  RestApis,
  GetRestApisError,
  Credentials | HttpClient.HttpClient,
  RestApi
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetRestApisRequest,
  output: RestApis,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRestApis",
  pagination: {
    inputToken: "position",
    outputToken: "position",
    items: "items",
    pageSize: "limit",
  } as const,
})) as any;

export type GetSdkError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Generates a client SDK for a RestApi and Stage.
 */
export const getSdk: API.OperationMethod<
  GetSdkRequest,
  SdkResponse,
  GetSdkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSdkRequest,
  output: SdkResponse,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSdk",
}));

export type GetSdkTypeError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets an SDK type.
 */
export const getSdkType: API.OperationMethod<
  GetSdkTypeRequest,
  SdkType,
  GetSdkTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSdkTypeRequest,
  output: SdkType,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSdkType",
}));

export type GetSdkTypesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets SDK types
 */
export const getSdkTypes: API.OperationMethod<
  GetSdkTypesRequest,
  SdkTypes,
  GetSdkTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSdkTypesRequest,
  output: SdkTypes,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSdkTypes",
}));

export type GetStageError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about a Stage resource.
 */
export const getStage: API.OperationMethod<
  GetStageRequest,
  Stage,
  GetStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetStageRequest,
  output: Stage,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStage",
}));

export type GetStagesError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about one or more Stage resources.
 */
export const getStages: API.OperationMethod<
  GetStagesRequest,
  Stages,
  GetStagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetStagesRequest,
  output: Stages,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStages",
}));

export type GetTagsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the Tags collection for a given resource.
 */
export const getTags: API.OperationMethod<
  GetTagsRequest,
  Tags,
  GetTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTagsRequest,
  output: Tags,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTags",
}));

export type GetUsageError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the usage data of a usage plan in a specified time interval.
 */
export const getUsage: API.PaginatedOperationMethod<
  GetUsageRequest,
  Usage,
  GetUsageError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetUsageRequest,
  output: Usage,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUsage",
  pagination: {
    inputToken: "position",
    outputToken: "position",
    items: "items",
    pageSize: "limit",
  } as const,
})) as any;

export type GetUsagePlanError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a usage plan of a given plan identifier.
 */
export const getUsagePlan: API.OperationMethod<
  GetUsagePlanRequest,
  UsagePlan,
  GetUsagePlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUsagePlanRequest,
  output: UsagePlan,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUsagePlan",
}));

export type GetUsagePlanKeyError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a usage plan key of a given key identifier.
 */
export const getUsagePlanKey: API.OperationMethod<
  GetUsagePlanKeyRequest,
  UsagePlanKey,
  GetUsagePlanKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUsagePlanKeyRequest,
  output: UsagePlanKey,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUsagePlanKey",
}));

export type GetUsagePlanKeysError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets all the usage plan keys representing the API keys added to a specified usage plan.
 */
export const getUsagePlanKeys: API.PaginatedOperationMethod<
  GetUsagePlanKeysRequest,
  UsagePlanKeys,
  GetUsagePlanKeysError,
  Credentials | HttpClient.HttpClient,
  UsagePlanKey
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetUsagePlanKeysRequest,
  output: UsagePlanKeys,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUsagePlanKeys",
  pagination: {
    inputToken: "position",
    outputToken: "position",
    items: "items",
    pageSize: "limit",
  } as const,
})) as any;

export type GetUsagePlansError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets all the usage plans of the caller's account.
 */
export const getUsagePlans: API.PaginatedOperationMethod<
  GetUsagePlansRequest,
  UsagePlans,
  GetUsagePlansError,
  Credentials | HttpClient.HttpClient,
  UsagePlan
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetUsagePlansRequest,
  output: UsagePlans,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUsagePlans",
  pagination: {
    inputToken: "position",
    outputToken: "position",
    items: "items",
    pageSize: "limit",
  } as const,
})) as any;

export type GetVpcLinkError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a specified VPC link under the caller's account in a region.
 */
export const getVpcLink: API.OperationMethod<
  GetVpcLinkRequest,
  VpcLink,
  GetVpcLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetVpcLinkRequest,
  output: VpcLink,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVpcLink",
}));

export type GetVpcLinksError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the VpcLinks collection under the caller's account in a selected region.
 */
export const getVpcLinks: API.PaginatedOperationMethod<
  GetVpcLinksRequest,
  VpcLinks,
  GetVpcLinksError,
  Credentials | HttpClient.HttpClient,
  VpcLink
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetVpcLinksRequest,
  output: VpcLinks,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVpcLinks",
  pagination: {
    inputToken: "position",
    outputToken: "position",
    items: "items",
    pageSize: "limit",
  } as const,
})) as any;

export type ImportApiKeysError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Import API keys from an external source, such as a CSV-formatted file.
 */
export const importApiKeys: API.OperationMethod<
  ImportApiKeysRequest,
  ApiKeyIds,
  ImportApiKeysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportApiKeysRequest,
  output: ApiKeyIds,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportApiKeys",
}));

export type ImportDocumentationPartsError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Imports documentation parts
 */
export const importDocumentationParts: API.OperationMethod<
  ImportDocumentationPartsRequest,
  DocumentationPartIds,
  ImportDocumentationPartsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportDocumentationPartsRequest,
  output: DocumentationPartIds,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportDocumentationParts",
}));

export type ImportRestApiError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * A feature of the API Gateway control service for creating a new API from an external API definition file.
 */
export const importRestApi: API.OperationMethod<
  ImportRestApiRequest,
  RestApi,
  ImportRestApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportRestApiRequest,
  output: RestApi,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportRestApi",
}));

export type PutGatewayResponseError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a customization of a GatewayResponse of a specified response type and status code on the given RestApi.
 */
export const putGatewayResponse: API.OperationMethod<
  PutGatewayResponseRequest,
  GatewayResponse,
  PutGatewayResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutGatewayResponseRequest,
  output: GatewayResponse,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutGatewayResponse",
}));

export type PutIntegrationError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Sets up a method's integration.
 */
export const putIntegration: API.OperationMethod<
  PutIntegrationRequest,
  Integration,
  PutIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutIntegrationRequest,
  output: Integration,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutIntegration",
}));

export type PutIntegrationResponseError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Represents a put integration.
 */
export const putIntegrationResponse: API.OperationMethod<
  PutIntegrationResponseRequest,
  IntegrationResponse,
  PutIntegrationResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutIntegrationResponseRequest,
  output: IntegrationResponse,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutIntegrationResponse",
}));

export type PutMethodError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Add a method to an existing Resource resource.
 */
export const putMethod: API.OperationMethod<
  PutMethodRequest,
  Method,
  PutMethodError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutMethodRequest,
  output: Method,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMethod",
}));

export type PutMethodResponseError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Adds a MethodResponse to an existing Method resource.
 */
export const putMethodResponse: API.OperationMethod<
  PutMethodResponseRequest,
  MethodResponse,
  PutMethodResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutMethodResponseRequest,
  output: MethodResponse,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMethodResponse",
}));

export type PutRestApiError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * A feature of the API Gateway control service for updating an existing API with an input of external API definitions.
 * The update can take the form of merging the supplied definition into the existing API or overwriting the existing API.
 */
export const putRestApi: API.OperationMethod<
  PutRestApiRequest,
  RestApi,
  PutRestApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutRestApiRequest,
  output: RestApi,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRestApi",
}));

export type RejectDomainNameAccessAssociationError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Rejects a domain name access association with a private custom domain name.
 *
 * To reject a domain name access association with an access association source in another AWS account, use this operation. To remove a domain name access association with an access association source in your own account, use the DeleteDomainNameAccessAssociation operation.
 */
export const rejectDomainNameAccessAssociation: API.OperationMethod<
  RejectDomainNameAccessAssociationRequest,
  RejectDomainNameAccessAssociationResponse,
  RejectDomainNameAccessAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RejectDomainNameAccessAssociationRequest,
  output: RejectDomainNameAccessAssociationResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectDomainNameAccessAssociation",
}));

export type TagResourceError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Adds or updates a tag on a given resource.
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
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TestInvokeAuthorizerError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Simulate the execution of an Authorizer in your RestApi with headers, parameters, and an incoming request body.
 */
export const testInvokeAuthorizer: API.OperationMethod<
  TestInvokeAuthorizerRequest,
  TestInvokeAuthorizerResponse,
  TestInvokeAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TestInvokeAuthorizerRequest,
  output: TestInvokeAuthorizerResponse,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestInvokeAuthorizer",
}));

export type TestInvokeMethodError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Simulate the invocation of a Method in your RestApi with headers, parameters, and an incoming request body.
 */
export const testInvokeMethod: API.OperationMethod<
  TestInvokeMethodRequest,
  TestInvokeMethodResponse,
  TestInvokeMethodError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TestInvokeMethodRequest,
  output: TestInvokeMethodResponse,
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestInvokeMethod",
}));

export type UntagResourceError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Removes a tag from a given resource.
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
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAccountError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Changes information about the current Account resource.
 */
export const updateAccount: API.OperationMethod<
  UpdateAccountRequest,
  Account,
  UpdateAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAccountRequest,
  output: Account,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccount",
}));

export type UpdateApiKeyError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Changes information about an ApiKey resource.
 */
export const updateApiKey: API.OperationMethod<
  UpdateApiKeyRequest,
  ApiKey,
  UpdateApiKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApiKeyRequest,
  output: ApiKey,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApiKey",
}));

export type UpdateAuthorizerError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates an existing Authorizer resource.
 */
export const updateAuthorizer: API.OperationMethod<
  UpdateAuthorizerRequest,
  Authorizer,
  UpdateAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAuthorizerRequest,
  output: Authorizer,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAuthorizer",
}));

export type UpdateBasePathMappingError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Changes information about the BasePathMapping resource.
 */
export const updateBasePathMapping: API.OperationMethod<
  UpdateBasePathMappingRequest,
  BasePathMapping,
  UpdateBasePathMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBasePathMappingRequest,
  output: BasePathMapping,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBasePathMapping",
}));

export type UpdateClientCertificateError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Changes information about an ClientCertificate resource.
 */
export const updateClientCertificate: API.OperationMethod<
  UpdateClientCertificateRequest,
  ClientCertificate,
  UpdateClientCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateClientCertificateRequest,
  output: ClientCertificate,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateClientCertificate",
}));

export type UpdateDeploymentError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Changes information about a Deployment resource.
 */
export const updateDeployment: API.OperationMethod<
  UpdateDeploymentRequest,
  Deployment,
  UpdateDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDeploymentRequest,
  output: Deployment,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDeployment",
}));

export type UpdateDocumentationPartError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a documentation part.
 */
export const updateDocumentationPart: API.OperationMethod<
  UpdateDocumentationPartRequest,
  DocumentationPart,
  UpdateDocumentationPartError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDocumentationPartRequest,
  output: DocumentationPart,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDocumentationPart",
}));

export type UpdateDocumentationVersionError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a documentation version.
 */
export const updateDocumentationVersion: API.OperationMethod<
  UpdateDocumentationVersionRequest,
  DocumentationVersion,
  UpdateDocumentationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDocumentationVersionRequest,
  output: DocumentationVersion,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDocumentationVersion",
}));

export type UpdateDomainNameError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Changes information about the DomainName resource.
 */
export const updateDomainName: API.OperationMethod<
  UpdateDomainNameRequest,
  DomainName,
  UpdateDomainNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDomainNameRequest,
  output: DomainName,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDomainName",
}));

export type UpdateGatewayResponseError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a GatewayResponse of a specified response type on the given RestApi.
 */
export const updateGatewayResponse: API.OperationMethod<
  UpdateGatewayResponseRequest,
  GatewayResponse,
  UpdateGatewayResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGatewayResponseRequest,
  output: GatewayResponse,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGatewayResponse",
}));

export type UpdateIntegrationError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Represents an update integration.
 */
export const updateIntegration: API.OperationMethod<
  UpdateIntegrationRequest,
  Integration,
  UpdateIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIntegrationRequest,
  output: Integration,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIntegration",
}));

export type UpdateIntegrationResponseError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Represents an update integration response.
 */
export const updateIntegrationResponse: API.OperationMethod<
  UpdateIntegrationResponseRequest,
  IntegrationResponse,
  UpdateIntegrationResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIntegrationResponseRequest,
  output: IntegrationResponse,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIntegrationResponse",
}));

export type UpdateMethodError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates an existing Method resource.
 */
export const updateMethod: API.OperationMethod<
  UpdateMethodRequest,
  Method,
  UpdateMethodError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMethodRequest,
  output: Method,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMethod",
}));

export type UpdateMethodResponseError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates an existing MethodResponse resource.
 */
export const updateMethodResponse: API.OperationMethod<
  UpdateMethodResponseRequest,
  MethodResponse,
  UpdateMethodResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMethodResponseRequest,
  output: MethodResponse,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMethodResponse",
}));

export type UpdateModelError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Changes information about a model. The maximum size of the model is 400 KB.
 */
export const updateModel: API.OperationMethod<
  UpdateModelRequest,
  Model,
  UpdateModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateModelRequest,
  output: Model,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateModel",
}));

export type UpdateRequestValidatorError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a RequestValidator of a given RestApi.
 */
export const updateRequestValidator: API.OperationMethod<
  UpdateRequestValidatorRequest,
  RequestValidator,
  UpdateRequestValidatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRequestValidatorRequest,
  output: RequestValidator,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRequestValidator",
}));

export type UpdateResourceError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Changes information about a Resource resource.
 */
export const updateResource: API.OperationMethod<
  UpdateResourceRequest,
  Resource,
  UpdateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateResourceRequest,
  output: Resource,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResource",
}));

export type UpdateRestApiError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Changes information about the specified API.
 */
export const updateRestApi: API.OperationMethod<
  UpdateRestApiRequest,
  RestApi,
  UpdateRestApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRestApiRequest,
  output: RestApi,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRestApi",
}));

export type UpdateStageError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Changes information about a Stage resource.
 */
export const updateStage: API.OperationMethod<
  UpdateStageRequest,
  Stage,
  UpdateStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateStageRequest,
  output: Stage,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStage",
}));

export type UpdateUsageError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Grants a temporary extension to the remaining quota of a usage plan associated with a specified API key.
 */
export const updateUsage: API.OperationMethod<
  UpdateUsageRequest,
  Usage,
  UpdateUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateUsageRequest,
  output: Usage,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUsage",
}));

export type UpdateUsagePlanError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a usage plan of a given plan Id.
 */
export const updateUsagePlan: API.OperationMethod<
  UpdateUsagePlanRequest,
  UsagePlan,
  UpdateUsagePlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateUsagePlanRequest,
  output: UsagePlan,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUsagePlan",
}));

export type UpdateVpcLinkError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates an existing VpcLink of a specified identifier.
 */
export const updateVpcLink: API.OperationMethod<
  UpdateVpcLinkRequest,
  VpcLink,
  UpdateVpcLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateVpcLinkRequest,
  output: VpcLink,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVpcLink",
}));
